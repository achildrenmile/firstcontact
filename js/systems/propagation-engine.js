/**
 * Propagation Engine
 *
 * The core system that evaluates whether a radio signal can travel from
 * source to target given the selected band, time, and resulting ionospheric conditions.
 *
 * Includes:
 * - Basic ionospheric propagation modeling
 * - Solar activity effects (quiet sun to geomagnetic storm)
 * - Mögel-Dellinger effect (sudden ionospheric disturbance / radio blackout)
 *
 * Uses i18n for all user-facing text.
 */

import { Ionosphere } from '../models/ionosphere.js';
import { HF_BANDS } from '../models/bands.js';
import { calculateDistance, calculateLongPathDistance, calculateBothPaths, generatePathPoints } from '../models/location.js';
import {
    calculateSolarElevation,
    checkGreyLine,
    doesPathCrossGreyLine
} from './sun-position.js';
import { t, formatDistance } from '../i18n/i18n.js';
import { SolarConditions, MOGEL_DELLINGER_EVENT, AURORA_EVENT, SPORADIC_E_EVENT } from '../models/solar-activity.js';

// Global solar conditions instance
let globalSolarConditions = new SolarConditions();

/**
 * Set the global solar conditions
 */
export function setSolarConditions(conditions) {
    globalSolarConditions = conditions;
}

/**
 * Get the global solar conditions
 */
export function getSolarConditions() {
    return globalSolarConditions;
}

/**
 * Propagation result contains everything needed for visualization and explanation
 */
export class PropagationResult {
    constructor() {
        this.success = false;
        this.signalStrength = 0;
        this.qualityDescription = '';
        this.path = null;
        this.factors = [];
        this.summary = '';
        this.learningPoints = [];
        // Long path support
        this.pathMode = 'short'; // 'short' or 'long'
        this.shortPathResult = null; // Result for short path (for comparison)
        this.longPathResult = null;  // Result for long path (for comparison)
        this.pathComparison = null;  // Why this path was chosen
    }
}

/**
 * A factor that affected propagation (positive or negative)
 */
export class PropagationFactor {
    constructor(name, impact, description, educational) {
        this.name = name;
        this.impact = impact;
        this.description = description;
        this.educational = educational;
    }
}

/**
 * Signal path with hop information
 */
export class SignalPath {
    constructor() {
        this.points = [];
        this.hops = [];
        this.totalDistance = 0;
        this.pathType = 'unknown';
        this.pathMode = 'short'; // 'short' or 'long'
    }
}

/**
 * Information about a single hop in the signal path
 */
export class HopInfo {
    constructor(startPoint, endPoint, reflectionLayer, distance) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.reflectionLayer = reflectionLayer;
        this.distance = distance;
        this.reflectionAltitude = reflectionLayer === 'F' ? 300 : 110;
    }
}

/**
 * Main propagation evaluation function
 * Now evaluates both short path and long path, choosing the better one
 */
export function evaluatePropagation({ source, target, bandId, dateTime }) {
    const band = HF_BANDS[bandId];

    if (!band) {
        const result = new PropagationResult();
        result.summary = t('errors.unknownBand');
        return result;
    }

    // Calculate both path distances
    const pathInfo = calculateBothPaths(
        source.latitude, source.longitude,
        target.latitude, target.longitude
    );

    const shortPathDistance = pathInfo.shortPath.distance;
    const longPathDistance = pathInfo.longPath.distance;

    // Always evaluate short path
    const shortPathResult = evaluateSinglePath({
        source, target, bandId, dateTime, band,
        distance: shortPathDistance,
        isLongPath: false
    });

    // For significant distances (> 3000 km), also evaluate long path
    // Long path only makes sense for DX contacts
    const LONG_PATH_THRESHOLD = 3000;
    let longPathResult = null;
    let useLongPath = false;
    let pathComparison = null;

    if (shortPathDistance > LONG_PATH_THRESHOLD) {
        longPathResult = evaluateSinglePath({
            source, target, bandId, dateTime, band,
            distance: longPathDistance,
            isLongPath: true
        });

        // Compare the two paths and choose the better one
        const comparison = comparePaths(shortPathResult, longPathResult, shortPathDistance, longPathDistance);
        useLongPath = comparison.useLongPath;
        pathComparison = comparison.reason;
    }

    // Return the better result
    const result = useLongPath ? longPathResult : shortPathResult;
    result.pathMode = useLongPath ? 'long' : 'short';
    result.shortPathResult = shortPathResult;
    result.longPathResult = longPathResult;
    result.pathComparison = pathComparison;

    // Add long path learning point if applicable
    if (longPathResult && useLongPath) {
        result.learningPoints.push({
            concept: t('learning.concepts.longPath.name'),
            insight: t('learning.concepts.longPath.insight'),
            experiment: t('learning.concepts.longPath.experiment')
        });
    } else if (longPathResult && !useLongPath && longPathResult.success) {
        // Both paths work but short is better
        result.learningPoints.push({
            concept: t('learning.concepts.shortVsLong.name'),
            insight: t('learning.concepts.shortVsLong.insight'),
            experiment: t('learning.concepts.shortVsLong.experiment')
        });
    }

    return result;
}

/**
 * Compare short and long path results to determine which is better
 */
function comparePaths(shortResult, longResult, shortDistance, longDistance) {
    // If only one path works, use that one
    if (shortResult.success && !longResult.success) {
        return { useLongPath: false, reason: t('propagation.pathComparison.onlyShortWorks') };
    }
    if (!shortResult.success && longResult.success) {
        return { useLongPath: true, reason: t('propagation.pathComparison.onlyLongWorks') };
    }
    if (!shortResult.success && !longResult.success) {
        // Neither works, prefer short path (shorter distance = less loss)
        return { useLongPath: false, reason: t('propagation.pathComparison.neitherWorks') };
    }

    // Both paths work - compare signal strength
    const strengthDiff = longResult.signalStrength - shortResult.signalStrength;

    // Long path needs to be significantly better (at least 15 points) to be preferred
    // because it's inherently longer and more complex
    if (strengthDiff > 15) {
        return {
            useLongPath: true,
            reason: t('propagation.pathComparison.longPathBetter', {
                longStrength: longResult.signalStrength,
                shortStrength: shortResult.signalStrength
            })
        };
    }

    // Short path is preferred when similar or better
    return {
        useLongPath: false,
        reason: t('propagation.pathComparison.shortPathBetter', {
            shortStrength: shortResult.signalStrength,
            longStrength: longResult.signalStrength
        })
    };
}

/**
 * Evaluate propagation for a single path (short or long)
 */
function evaluateSinglePath({ source, target, bandId, dateTime, band, distance, isLongPath }) {
    const result = new PropagationResult();
    const bandName = t(`bands.${bandId}.name`);

    // Get ionospheric conditions along the path (includes solar activity effects)
    const pathConditions = analyzePathConditions(source, target, dateTime, isLongPath);

    // Calculate how many hops are needed
    const hopAnalysis = calculateRequiredHops(distance, band);

    // Check for Mögel-Dellinger effect FIRST (it can override everything)
    const mogelDellingerFactor = evaluateMogelDellinger(bandId, pathConditions);
    if (mogelDellingerFactor) {
        result.factors.push(mogelDellingerFactor);

        // If severe Mögel-Dellinger, it dominates the result
        if (mogelDellingerFactor.impact < -0.8) {
            result.signalStrength = 0;
            result.success = false;
            result.qualityDescription = t('propagation.quality.blackout');
            result.summary = t('propagation.mogelDellinger.blackout', { band: bandName });
            result.path = buildSignalPath(source, target, hopAnalysis, false, isLongPath);
            result.path.pathMode = isLongPath ? 'long' : 'short';
            result.learningPoints = [{
                concept: t('learning.concepts.mogelDellinger.name'),
                insight: t('learning.concepts.mogelDellinger.insight'),
                experiment: t('learning.concepts.mogelDellinger.experiment')
            }];
            return result;
        }
    }

    // Evaluate solar activity effect on this band
    const solarActivityFactor = evaluateSolarActivity(bandId, pathConditions);
    if (solarActivityFactor) {
        result.factors.push(solarActivityFactor);
    }

    // Evaluate Aurora effect (affects polar paths)
    const auroraFactor = evaluateAurora(bandId, pathConditions);
    if (auroraFactor) {
        result.factors.push(auroraFactor);

        // If severe aurora on polar path, it can dominate
        if (auroraFactor.impact < -0.7) {
            result.signalStrength = Math.max(0, 20 + auroraFactor.impact * 30);
            result.success = result.signalStrength >= 20;
            result.qualityDescription = t('propagation.quality.auroraFlutter');
            result.summary = t('propagation.aurora.blocked');
            result.path = buildSignalPath(source, target, hopAnalysis, result.success, isLongPath);
            result.path.pathMode = isLongPath ? 'long' : 'short';
            result.learningPoints = [{
                concept: t('learning.concepts.aurora.name'),
                insight: t('learning.concepts.aurora.insight'),
                experiment: t('learning.concepts.aurora.experiment')
            }];
            return result;
        }
    }

    // Evaluate Sporadic E effect (enhances higher bands at medium distances)
    const sporadicEFactor = evaluateSporadicE(bandId, pathConditions);
    if (sporadicEFactor) {
        result.factors.push(sporadicEFactor);
    }

    // Evaluate D layer absorption
    const absorptionFactor = evaluateAbsorption(band, bandId, pathConditions);
    result.factors.push(absorptionFactor);

    // Evaluate F layer reflection capability
    const reflectionFactor = evaluateReflection(band, bandId, pathConditions, distance);
    result.factors.push(reflectionFactor);

    // Check for grey line effects
    const greyLineFactor = evaluateGreyLine(source, target, dateTime, isLongPath);
    if (greyLineFactor) {
        result.factors.push(greyLineFactor);
    }

    // Check if path geometry is feasible
    const geometryFactor = evaluateGeometry(hopAnalysis, band, bandId);
    result.factors.push(geometryFactor);

    // Add long path distance penalty (more hops = more loss)
    if (isLongPath) {
        const longPathPenalty = evaluateLongPathPenalty(distance);
        result.factors.push(longPathPenalty);
    }

    // Calculate overall signal strength from factors
    result.signalStrength = calculateSignalStrength(result.factors);

    // Determine success/failure
    result.success = result.signalStrength >= 20;

    // Build the signal path for visualization
    result.path = buildSignalPath(source, target, hopAnalysis, result.success, isLongPath);
    result.path.pathMode = isLongPath ? 'long' : 'short';

    // Generate quality description
    result.qualityDescription = getQualityDescription(result.signalStrength);

    // Generate summary and learning points
    result.summary = generateSummary(result, band, bandId, distance, isLongPath);
    result.learningPoints = extractLearningPoints(result, band, bandId, pathConditions);

    return result;
}

/**
 * Evaluate penalty for long path (additional signal loss due to distance)
 */
function evaluateLongPathPenalty(distance) {
    // Long path has inherent additional loss
    // The longer the path, the more loss
    let impact, description, educational;

    if (distance > 30000) {
        impact = -0.4;
        description = t('propagation.longPath.veryLongDistance');
        educational = t('propagation.educational.longPathVeryLong');
    } else if (distance > 25000) {
        impact = -0.3;
        description = t('propagation.longPath.longDistance');
        educational = t('propagation.educational.longPathLong');
    } else {
        impact = -0.2;
        description = t('propagation.longPath.moderateDistance');
        educational = t('propagation.educational.longPathModerate');
    }

    return new PropagationFactor('Long Path', impact, description, educational);
}

/**
 * Analyze ionospheric conditions along the signal path
 */
function analyzePathConditions(source, target, dateTime, isLongPath = false) {
    const ionosphere = new Ionosphere();

    // Apply solar activity effects to ionosphere
    const solarEffects = globalSolarConditions.getIonosphereEffects();
    ionosphere.setSolarEffects(solarEffects);

    const pathPoints = generatePathPoints(
        source.latitude, source.longitude,
        target.latitude, target.longitude,
        10,
        isLongPath
    );

    // Calculate what percent of path is in daylight (for Mögel-Dellinger)
    // Also track polar zone exposure for Aurora
    let dayCount = 0;
    let polarCount = 0;
    let maxAbsLatitude = 0;
    const POLAR_THRESHOLD = 55; // Degrees latitude considered "polar" for Aurora

    const samples = pathPoints.map(point => {
        const elevation = calculateSolarElevation(point.latitude, point.longitude, dateTime);
        const greyLine = checkGreyLine(point.latitude, point.longitude, dateTime);

        // Check if this point is in daylight (sun above horizon)
        if (elevation > 0) dayCount++;

        // Track polar zone exposure (both north and south)
        const absLatitude = Math.abs(point.latitude);
        if (absLatitude > POLAR_THRESHOLD) polarCount++;
        if (absLatitude > maxAbsLatitude) maxAbsLatitude = absLatitude;

        const layers = ionosphere.calculateLayerStates(elevation, greyLine.isGreyLine);

        return {
            point,
            elevation,
            greyLine,
            layers,
            absLatitude
        };
    });

    const pathDayPercent = dayCount / samples.length;
    const percentInPolarZone = polarCount / samples.length;

    // Check Mögel-Dellinger effect
    const mogelDellingerEffect = globalSolarConditions.getMogelDellingerEffect(pathDayPercent);

    // If Mögel-Dellinger is active, recalculate with massive D-layer absorption
    if (mogelDellingerEffect.affected) {
        ionosphere.setMogelDellinger(true, mogelDellingerEffect.absorptionMultiplier);

        // Recalculate with Mögel-Dellinger effect
        samples.forEach(sample => {
            sample.layers = ionosphere.calculateLayerStates(
                sample.elevation,
                sample.greyLine.isGreyLine
            );
        });
    }

    // Check Aurora effect
    const auroraEffect = globalSolarConditions.getAuroraEffect(maxAbsLatitude, percentInPolarZone);

    // Calculate distance for Sporadic E evaluation
    const totalDistance = calculateDistance(
        source.latitude, source.longitude,
        target.latitude, target.longitude
    );

    const avgDLayerIonization = average(samples.map(s => s.layers.D.ionization));
    const avgFLayerIonization = average(samples.map(s => s.layers.F.ionization));
    const avgFLayerReflection = average(samples.map(s => s.layers.F.reflectionQuality));
    const maxAbsorption = Math.max(...samples.map(s => s.layers.D.absorptionFactor));
    const greyLineCount = samples.filter(s => s.greyLine.isGreyLine).length;

    return {
        samples,
        avgDLayerIonization,
        avgFLayerIonization,
        avgFLayerReflection,
        maxAbsorption,
        percentInGreyLine: greyLineCount / samples.length,
        hasGreyLine: greyLineCount > 0,
        mostlyDay: avgDLayerIonization > 0.5,
        mostlyNight: avgDLayerIonization < 0.2,
        // Solar activity info
        solarActivity: globalSolarConditions.activityLevel,
        solarEffects,
        // Mögel-Dellinger info
        mogelDellingerEffect,
        pathDayPercent,
        // Aurora info
        auroraEffect,
        maxAbsLatitude,
        percentInPolarZone,
        // Distance for Sporadic E
        totalDistance
    };
}

/**
 * Calculate how many ionospheric hops are needed for the distance
 */
function calculateRequiredHops(distanceKm, band) {
    const typicalHopDistance = band.characteristics.typicalHopDistance;
    const maxHops = band.characteristics.maxHops;

    const idealHops = Math.ceil(distanceKm / typicalHopDistance);
    const actualHops = Math.min(idealHops, maxHops);
    const isFeasible = idealHops <= maxHops;

    return {
        distance: distanceKm,
        typicalHopDistance,
        idealHops,
        actualHops,
        isFeasible
    };
}

/**
 * Evaluate D layer absorption effect
 */
function evaluateAbsorption(band, bandId, pathConditions) {
    const bandAbsorptionSensitivity = band.characteristics.dayAbsorption;
    const pathAbsorption = pathConditions.maxAbsorption;
    const bandName = t(`bands.${bandId}.name`);

    const absorption = bandAbsorptionSensitivity * pathAbsorption;

    let impact, description, educational;

    if (absorption > 0.7) {
        impact = -0.8;
        description = t('propagation.factorDescriptions.heavyAbsorption', { band: bandName });
        educational = t('propagation.educational.absorptionHigh', { band: bandName });
    } else if (absorption > 0.4) {
        impact = -0.4;
        description = t('propagation.factorDescriptions.moderateAbsorption');
        educational = t('propagation.educational.absorptionModerate');
    } else if (absorption > 0.1) {
        impact = -0.1;
        description = t('propagation.factorDescriptions.minorAbsorption');
        educational = t('propagation.educational.absorptionLow', { band: bandName });
    } else {
        impact = 0.2;
        description = t('propagation.factorDescriptions.minimalAbsorption');
        educational = pathConditions.mostlyNight
            ? t('propagation.educational.absorptionMinimalNight')
            : t('propagation.educational.absorptionMinimalFreq', { band: bandName });
    }

    return new PropagationFactor('D Layer Absorption', impact, description, educational);
}

/**
 * Evaluate F layer reflection capability
 */
function evaluateReflection(band, bandId, pathConditions, distance) {
    const freq = band.centerFrequency;
    const fLayerStrength = pathConditions.avgFLayerReflection;
    const bandName = t(`bands.${bandId}.name`);

    const frequencyDifficulty = Math.max(0, (freq - 10) / 20);
    const canReflect = fLayerStrength > frequencyDifficulty;

    let impact, description, educational;

    if (!canReflect) {
        impact = -1.0;
        description = t('propagation.factorDescriptions.cannotReflect', { band: bandName });
        educational = t('propagation.educational.cannotReflect', {
            freq: freq.toFixed(1),
            band: bandName
        });
    } else if (fLayerStrength > 0.8) {
        impact = 0.5;
        description = t('propagation.factorDescriptions.excellentReflection');
        educational = t('propagation.educational.excellentReflection', { band: bandName });
    } else if (fLayerStrength > 0.5) {
        impact = 0.2;
        description = t('propagation.factorDescriptions.adequateReflection');
        educational = t('propagation.educational.adequateReflection', { band: bandName });
    } else {
        impact = -0.2;
        description = t('propagation.factorDescriptions.weakReflection');
        educational = t('propagation.educational.weakReflection', { band: bandName });
    }

    return new PropagationFactor('F Layer Reflection', impact, description, educational);
}

/**
 * Evaluate grey line enhancement
 */
function evaluateGreyLine(source, target, dateTime, isLongPath = false) {
    const greyLineAnalysis = doesPathCrossGreyLine(
        source.latitude, source.longitude,
        target.latitude, target.longitude,
        dateTime,
        10,
        isLongPath
    );

    if (!greyLineAnalysis.crossesGreyLine) {
        return null;
    }

    const percent = greyLineAnalysis.percentInGreyLine;
    let impact, description, educational;

    if (percent > 0.5) {
        impact = 0.6;
        description = t('propagation.factorDescriptions.strongGreyLine');
        educational = t('propagation.educational.greyLineStrong');
    } else if (percent > 0.2) {
        impact = 0.3;
        description = t('propagation.factorDescriptions.greyLineEnhancement');
        educational = t('propagation.educational.greyLineModerate');
    } else {
        impact = 0.1;
        description = t('propagation.factorDescriptions.touchesGreyLine');
        educational = t('propagation.educational.greyLineLight');
    }

    return new PropagationFactor('Grey Line Effect', impact, description, educational);
}

/**
 * Evaluate path geometry feasibility
 */
function evaluateGeometry(hopAnalysis, band, bandId) {
    const bandName = t(`bands.${bandId}.name`);
    let impact, description, educational;

    if (!hopAnalysis.isFeasible) {
        impact = -0.8;
        description = t('propagation.factorDescriptions.distanceTooFar', { band: bandName });
        educational = t('propagation.educational.distanceTooFar', {
            distance: Math.round(hopAnalysis.distance),
            idealHops: hopAnalysis.idealHops,
            band: bandName,
            maxHops: band.characteristics.maxHops
        });
    } else if (hopAnalysis.actualHops === 1) {
        impact = 0.3;
        description = t('propagation.factorDescriptions.singleHopPath');
        educational = t('propagation.educational.singleHopPath');
    } else if (hopAnalysis.actualHops <= 2) {
        impact = 0.1;
        description = t('propagation.factorDescriptions.multiHopPath', { count: hopAnalysis.actualHops });
        educational = t('propagation.educational.multiHopPath', { count: hopAnalysis.actualHops });
    } else {
        impact = -0.2;
        description = t('propagation.pathTypes.longMultiHop', { count: hopAnalysis.actualHops });
        educational = t('propagation.educational.longMultiHopPath', { count: hopAnalysis.actualHops });
    }

    return new PropagationFactor('Path Geometry', impact, description, educational);
}

/**
 * Evaluate Mögel-Dellinger effect (Sudden Ionospheric Disturbance)
 * This is a dramatic solar flare effect that causes HF radio blackout on the sunlit side
 */
function evaluateMogelDellinger(bandId, pathConditions) {
    const effect = pathConditions.mogelDellingerEffect;

    if (!effect || !effect.affected) {
        return null;
    }

    const bandName = t(`bands.${bandId}.name`);

    // Check if this band is in the affected list
    const isAffected = effect.affectedBands.includes(bandId);

    if (!isAffected) {
        // Higher bands less affected
        return new PropagationFactor(
            'Mögel-Dellinger Effect',
            -0.2,
            t('propagation.mogelDellinger.minorEffect', { band: bandName }),
            t('propagation.educational.mogelDellingerMinor', { band: bandName })
        );
    }

    // Severity determines impact
    let impact, description, educational;

    if (effect.severity === 'severe') {
        impact = -1.0;  // Complete blackout
        description = t('propagation.mogelDellinger.severeBlackout');
        educational = t('propagation.educational.mogelDellingerSevere');
    } else if (effect.severity === 'moderate') {
        impact = -0.8;
        description = t('propagation.mogelDellinger.moderateBlackout', { band: bandName });
        educational = t('propagation.educational.mogelDellingerModerate');
    } else {
        impact = -0.5;
        description = t('propagation.mogelDellinger.minorBlackout', { band: bandName });
        educational = t('propagation.educational.mogelDellingerMinor', { band: bandName });
    }

    // Scale by how much path is in daylight
    impact = impact * pathConditions.pathDayPercent;

    return new PropagationFactor('Mögel-Dellinger Effect', impact, description, educational);
}

/**
 * Evaluate solar activity effect on the band
 * Different bands respond differently to solar activity levels
 */
function evaluateSolarActivity(bandId, pathConditions) {
    const activityLevel = pathConditions.solarActivity;
    const bandName = t(`bands.${bandId}.name`);

    // Get band frequency to determine sensitivity
    const bandFreqs = {
        '160m': 1.9, '80m': 3.75, '60m': 5.35, '40m': 7.15, '30m': 10.125,
        '20m': 14.175, '17m': 18.118, '15m': 21.225, '12m': 24.94, '10m': 28.85, '6m': 50.15
    };
    const freq = bandFreqs[bandId] || 14;
    const isHighBand = freq > 15;
    const isLowBand = freq < 8;

    let impact = 0;
    let description = '';
    let educational = '';

    if (activityLevel === 'quiet') {
        if (isHighBand) {
            // High bands suffer in quiet conditions
            impact = -0.4;
            description = t('propagation.solarActivity.quietHighBand', { band: bandName });
            educational = t('propagation.educational.solarQuietHighBand', { band: bandName });
        } else {
            // Low/mid bands are fine
            return null;
        }
    } else if (activityLevel === 'active') {
        if (isHighBand) {
            // High bands thrive!
            impact = 0.3;
            description = t('propagation.solarActivity.activeHighBand', { band: bandName });
            educational = t('propagation.educational.solarActiveHighBand', { band: bandName });
        } else if (isLowBand) {
            // Low bands get more absorption
            impact = -0.2;
            description = t('propagation.solarActivity.activeLowBand', { band: bandName });
            educational = t('propagation.educational.solarActiveLowBand', { band: bandName });
        } else {
            return null;
        }
    } else if (activityLevel === 'storm') {
        // Storms are bad for everyone
        impact = -0.5;
        description = t('propagation.solarActivity.storm');
        educational = t('propagation.educational.solarStorm');
    } else {
        // Normal conditions - no special factor
        return null;
    }

    return new PropagationFactor('Solar Activity', impact, description, educational);
}

/**
 * Evaluate Aurora effect on polar paths
 * Aurora causes signal distortion and absorption on paths crossing high latitudes
 */
function evaluateAurora(bandId, pathConditions) {
    const effect = pathConditions.auroraEffect;

    if (!effect || !effect.affected) {
        return null;
    }

    const bandName = t(`bands.${bandId}.name`);

    // Get band frequency - higher frequencies are more affected by aurora
    const bandFreqs = {
        '160m': 1.9, '80m': 3.75, '60m': 5.35, '40m': 7.15, '30m': 10.125,
        '20m': 14.175, '17m': 18.118, '15m': 21.225, '12m': 24.94, '10m': 28.85, '6m': 50.15
    };
    const freq = bandFreqs[bandId] || 14;

    // Higher frequencies are more severely affected by aurora
    const freqMultiplier = freq > 15 ? 1.2 : freq > 7 ? 1.0 : 0.8;

    let impact, description, educational;

    const baseDegradation = effect.degradation * freqMultiplier;

    if (effect.severity === 'severe') {
        impact = -0.9 * baseDegradation;
        description = t('propagation.aurora.severeFlutter', { band: bandName });
        educational = t('propagation.educational.auroraSevere');
    } else if (effect.severity === 'moderate') {
        impact = -0.6 * baseDegradation;
        description = t('propagation.aurora.moderateFlutter', { band: bandName });
        educational = t('propagation.educational.auroraModerate', { band: bandName });
    } else {
        impact = -0.3 * baseDegradation;
        description = t('propagation.aurora.minorFlutter', { band: bandName });
        educational = t('propagation.educational.auroraMinor', { band: bandName });
    }

    // Scale by polar zone exposure
    impact = impact * Math.max(0.5, pathConditions.percentInPolarZone * 2);

    return new PropagationFactor('Aurora', impact, description, educational);
}

/**
 * Evaluate Sporadic E effect
 * Sporadic E creates dense ionization patches in the E layer that can
 * reflect higher frequencies, especially 10m and 15m, at medium distances
 */
function evaluateSporadicE(bandId, pathConditions) {
    const effect = globalSolarConditions.getSporadicEEffect(bandId, pathConditions.totalDistance);

    if (!effect || !effect.affected) {
        return null;
    }

    const bandName = t(`bands.${bandId}.name`);
    const distance = Math.round(pathConditions.totalDistance);

    let impact, description, educational;

    if (effect.boost > 0.7) {
        // Strong boost - excellent Es conditions for this band
        impact = 0.6;
        description = t('propagation.sporadicE.excellent', { band: bandName });
        educational = t('propagation.educational.sporadicEExcellent', { band: bandName, distance });
    } else if (effect.boost > 0.4) {
        // Good boost
        impact = 0.4;
        description = t('propagation.sporadicE.good', { band: bandName });
        educational = t('propagation.educational.sporadicEGood', { band: bandName });
    } else {
        // Moderate boost
        impact = 0.2;
        description = t('propagation.sporadicE.moderate', { band: bandName });
        educational = t('propagation.educational.sporadicEModerate', { band: bandName });
    }

    return new PropagationFactor('Sporadic E', impact, description, educational);
}

/**
 * Calculate overall signal strength from factors
 */
function calculateSignalStrength(factors) {
    let strength = 50;

    for (const factor of factors) {
        strength += factor.impact * 30;
    }

    return Math.max(0, Math.min(100, Math.round(strength)));
}

/**
 * Build signal path for visualization
 */
function buildSignalPath(source, target, hopAnalysis, success, isLongPath = false) {
    const path = new SignalPath();
    path.totalDistance = hopAnalysis.distance;
    path.pathMode = isLongPath ? 'long' : 'short';

    if (!success) {
        path.pathType = 'failed';
        path.points = generatePathPoints(
            source.latitude, source.longitude,
            target.latitude, target.longitude,
            20,
            isLongPath
        );
        return path;
    }

    path.pathType = hopAnalysis.actualHops === 1 ? 'single-hop' : 'multi-hop';

    const numHops = hopAnalysis.actualHops;
    const groundPoints = generatePathPoints(
        source.latitude, source.longitude,
        target.latitude, target.longitude,
        numHops,
        isLongPath
    );

    for (let i = 0; i < numHops; i++) {
        const startGround = groundPoints[i];
        const endGround = groundPoints[i + 1];
        const reflectionAlt = 300;

        const hopPoints = generateHopArc(startGround, endGround, reflectionAlt, 10);
        path.points.push(...hopPoints);

        path.hops.push(new HopInfo(
            startGround,
            endGround,
            'F',
            hopAnalysis.typicalHopDistance
        ));
    }

    return path;
}

/**
 * Generate arc points for a single hop
 */
function generateHopArc(start, end, maxAltitude, numPoints) {
    const points = [];

    for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;

        const lat = start.latitude + (end.latitude - start.latitude) * t;
        const lon = start.longitude + (end.longitude - start.longitude) * t;

        const altFactor = 4 * t * (1 - t);
        const altitude = maxAltitude * altFactor;

        points.push({ latitude: lat, longitude: lon, altitude });
    }

    return points;
}

/**
 * Convert signal strength to quality description
 */
function getQualityDescription(strength) {
    if (strength >= 80) return t('propagation.quality.excellent');
    if (strength >= 60) return t('propagation.quality.good');
    if (strength >= 40) return t('propagation.quality.fair');
    if (strength >= 20) return t('propagation.quality.weak');
    return t('propagation.quality.notReadable');
}

/**
 * Generate a human-readable summary
 */
function generateSummary(result, band, bandId, distance, isLongPath = false) {
    const bandName = t(`bands.${bandId}.name`);
    const distanceStr = formatDistance(distance);
    const pathType = isLongPath ? t('propagation.pathType.long') : t('propagation.pathType.short');

    if (result.success) {
        const baseMessage = t('propagation.headlines.reached', { target: distanceStr }) +
               ` (${bandName}, ${result.qualityDescription})`;
        // Only mention path type for long path (short path is the default)
        return isLongPath ? `${baseMessage} - ${pathType}` : baseMessage;
    } else {
        const worstFactor = result.factors.reduce(
            (worst, f) => f.impact < worst.impact ? f : worst,
            result.factors[0]
        );
        return t('propagation.headlines.notReachable', { target: distanceStr }) +
               `. ${worstFactor.description}`;
    }
}

/**
 * Extract key learning points from the result
 */
function extractLearningPoints(result, band, bandId, pathConditions) {
    const points = [];
    const bandName = t(`bands.${bandId}.name`);
    const bandPersonality = t(`bands.${bandId}.personality`);

    // Check for D layer absorption lesson
    const absorptionFactor = result.factors.find(f => f.name === 'D Layer Absorption');
    if (absorptionFactor && absorptionFactor.impact < -0.3) {
        points.push({
            concept: t('learning.concepts.dLayerAbsorption.name'),
            insight: t('learning.concepts.dLayerAbsorption.insight', {
                band: bandName,
                personality: bandPersonality
            }),
            experiment: t('learning.concepts.dLayerAbsorption.experiment')
        });
    }

    // Check for F layer reflection lesson
    const reflectionFactor = result.factors.find(f => f.name === 'F Layer Reflection');
    if (reflectionFactor && reflectionFactor.impact < -0.5) {
        points.push({
            concept: t('learning.concepts.ionosphericReflection.name'),
            insight: t('learning.concepts.ionosphericReflection.insight', { band: bandName }),
            experiment: t('learning.concepts.ionosphericReflection.experiment')
        });
    }

    // Check for grey line lesson
    const greyLineFactor = result.factors.find(f => f.name === 'Grey Line Effect');
    if (greyLineFactor && greyLineFactor.impact > 0.2) {
        points.push({
            concept: t('learning.concepts.greyLinePropagation.name'),
            insight: t('learning.concepts.greyLinePropagation.insight'),
            experiment: t('learning.concepts.greyLinePropagation.experiment')
        });
    }

    // Check for daytime propagation success
    if (pathConditions.mostlyDay && result.success && band.characteristics.dayAbsorption < 0.3) {
        points.push({
            concept: t('learning.concepts.daytimePropagation.name'),
            insight: t('learning.concepts.daytimePropagation.insight', { band: bandName }),
            experiment: t('learning.concepts.daytimePropagation.experiment')
        });
    }

    // Check for solar activity lesson
    const solarActivityFactor = result.factors.find(f => f.name === 'Solar Activity');
    if (solarActivityFactor) {
        if (pathConditions.solarActivity === 'quiet' && solarActivityFactor.impact < -0.2) {
            points.push({
                concept: t('learning.concepts.solarActivityQuiet.name'),
                insight: t('learning.concepts.solarActivityQuiet.insight', { band: bandName }),
                experiment: t('learning.concepts.solarActivityQuiet.experiment')
            });
        } else if (pathConditions.solarActivity === 'active' && solarActivityFactor.impact > 0.2) {
            points.push({
                concept: t('learning.concepts.solarActivityActive.name'),
                insight: t('learning.concepts.solarActivityActive.insight', { band: bandName }),
                experiment: t('learning.concepts.solarActivityActive.experiment')
            });
        } else if (pathConditions.solarActivity === 'storm') {
            points.push({
                concept: t('learning.concepts.solarStorm.name'),
                insight: t('learning.concepts.solarStorm.insight'),
                experiment: t('learning.concepts.solarStorm.experiment')
            });
        }
    }

    // Check for Aurora lesson
    const auroraFactor = result.factors.find(f => f.name === 'Aurora');
    if (auroraFactor && auroraFactor.impact < -0.2) {
        points.push({
            concept: t('learning.concepts.aurora.name'),
            insight: t('learning.concepts.aurora.insight'),
            experiment: t('learning.concepts.aurora.experiment')
        });
    }

    // Check for Sporadic E lesson
    const sporadicEFactor = result.factors.find(f => f.name === 'Sporadic E');
    if (sporadicEFactor && sporadicEFactor.impact > 0.2) {
        points.push({
            concept: t('learning.concepts.sporadicE.name'),
            insight: t('learning.concepts.sporadicE.insight', { band: bandName }),
            experiment: t('learning.concepts.sporadicE.experiment')
        });
    }

    return points;
}

function average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}
