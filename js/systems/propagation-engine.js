/**
 * Propagation Engine
 *
 * The core system that evaluates whether a radio signal can travel from
 * source to target given the selected band, time, and resulting ionospheric conditions.
 *
 * Uses i18n for all user-facing text.
 */

import { Ionosphere } from '../models/ionosphere.js';
import { HF_BANDS } from '../models/bands.js';
import { calculateDistance, generatePathPoints } from '../models/location.js';
import {
    calculateSolarElevation,
    checkGreyLine,
    doesPathCrossGreyLine
} from './sun-position.js';
import { t, formatDistance } from '../i18n/i18n.js';

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
 */
export function evaluatePropagation({ source, target, bandId, dateTime }) {
    const result = new PropagationResult();
    const band = HF_BANDS[bandId];

    if (!band) {
        result.summary = t('errors.unknownBand');
        return result;
    }

    const bandName = t(`bands.${bandId}.name`);

    // Calculate basic geometry
    const distance = calculateDistance(
        source.latitude, source.longitude,
        target.latitude, target.longitude
    );

    // Get ionospheric conditions along the path
    const pathConditions = analyzePathConditions(source, target, dateTime);

    // Calculate how many hops are needed
    const hopAnalysis = calculateRequiredHops(distance, band);

    // Evaluate D layer absorption
    const absorptionFactor = evaluateAbsorption(band, bandId, pathConditions);
    result.factors.push(absorptionFactor);

    // Evaluate F layer reflection capability
    const reflectionFactor = evaluateReflection(band, bandId, pathConditions, distance);
    result.factors.push(reflectionFactor);

    // Check for grey line effects
    const greyLineFactor = evaluateGreyLine(source, target, dateTime);
    if (greyLineFactor) {
        result.factors.push(greyLineFactor);
    }

    // Check if path geometry is feasible
    const geometryFactor = evaluateGeometry(hopAnalysis, band, bandId);
    result.factors.push(geometryFactor);

    // Calculate overall signal strength from factors
    result.signalStrength = calculateSignalStrength(result.factors);

    // Determine success/failure
    result.success = result.signalStrength >= 20;

    // Build the signal path for visualization
    result.path = buildSignalPath(source, target, hopAnalysis, result.success);

    // Generate quality description
    result.qualityDescription = getQualityDescription(result.signalStrength);

    // Generate summary and learning points
    result.summary = generateSummary(result, band, bandId, distance);
    result.learningPoints = extractLearningPoints(result, band, bandId, pathConditions);

    return result;
}

/**
 * Analyze ionospheric conditions along the signal path
 */
function analyzePathConditions(source, target, dateTime) {
    const ionosphere = new Ionosphere();
    const pathPoints = generatePathPoints(
        source.latitude, source.longitude,
        target.latitude, target.longitude,
        10
    );

    const samples = pathPoints.map(point => {
        const elevation = calculateSolarElevation(point.latitude, point.longitude, dateTime);
        const greyLine = checkGreyLine(point.latitude, point.longitude, dateTime);
        const layers = ionosphere.calculateLayerStates(elevation, greyLine.isGreyLine);

        return {
            point,
            elevation,
            greyLine,
            layers
        };
    });

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
        mostlyNight: avgDLayerIonization < 0.2
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
function evaluateGreyLine(source, target, dateTime) {
    const greyLineAnalysis = doesPathCrossGreyLine(
        source.latitude, source.longitude,
        target.latitude, target.longitude,
        dateTime
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
function buildSignalPath(source, target, hopAnalysis, success) {
    const path = new SignalPath();
    path.totalDistance = hopAnalysis.distance;

    if (!success) {
        path.pathType = 'failed';
        path.points = generatePathPoints(
            source.latitude, source.longitude,
            target.latitude, target.longitude,
            20
        );
        return path;
    }

    path.pathType = hopAnalysis.actualHops === 1 ? 'single-hop' : 'multi-hop';

    const numHops = hopAnalysis.actualHops;
    const groundPoints = generatePathPoints(
        source.latitude, source.longitude,
        target.latitude, target.longitude,
        numHops
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
function generateSummary(result, band, bandId, distance) {
    const bandName = t(`bands.${bandId}.name`);
    const distanceStr = formatDistance(distance);

    if (result.success) {
        return t('propagation.headlines.reached', { target: distanceStr }) +
               ` (${bandName}, ${result.qualityDescription})`;
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

    return points;
}

function average(arr) {
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}
