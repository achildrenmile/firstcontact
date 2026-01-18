/**
 * Explanation Engine
 *
 * Transforms propagation results into clear, educational explanations.
 * This is the "teacher" of the game - it helps players understand
 * cause and effect without overwhelming them with technical details.
 *
 * Uses the i18n system for all user-facing text.
 */

import { HF_BANDS } from '../models/bands.js';
import { t, formatDistance } from '../i18n/i18n.js';

/**
 * Generate a complete explanation for a propagation result
 *
 * @param {PropagationResult} result - The result to explain
 * @param {Object} context - Additional context (band, source, target, time)
 * @returns {Object} Structured explanation
 */
export function generateExplanation(result, context) {
    const { bandId, source, target, dateTime } = context;
    const band = HF_BANDS[bandId];

    return {
        // The headline - what happened
        headline: generateHeadline(result, band, target),

        // Short version for quick understanding
        shortExplanation: result.summary,

        // Detailed explanation with educational content
        detailedExplanation: generateDetailedExplanation(result, band),

        // Visual indicator data
        signalMeter: {
            value: result.signalStrength,
            quality: getQualityLabel(result.signalStrength),
            color: getSignalColor(result.signalStrength)
        },

        // Factor breakdown for curious players
        factors: result.factors.map(f => formatFactor(f)),

        // Learning points
        learningPoints: result.learningPoints,

        // Suggested next experiments
        suggestions: generateSuggestions(result, band, dateTime),

        // Encouraging message
        encouragement: generateEncouragement(result, band),

        // Path mode information (short/long path)
        pathMode: result.pathMode || 'short',
        pathComparison: result.pathComparison,
        hasLongPathOption: result.longPathResult !== null
    };
}

/**
 * Generate the main headline
 */
function generateHeadline(result, band, target) {
    const targetName = target.name;

    if (result.success) {
        if (result.signalStrength >= 70) {
            return t('propagation.headlines.strongConnection', { target: targetName });
        } else if (result.signalStrength >= 40) {
            return t('propagation.headlines.reached', { target: targetName });
        } else {
            return t('propagation.headlines.weakSuccess', { target: targetName });
        }
    } else {
        return t('propagation.headlines.notReachable', { target: targetName });
    }
}

/**
 * Get translated quality label
 */
function getQualityLabel(strength) {
    if (strength >= 80) return t('propagation.quality.excellent');
    if (strength >= 60) return t('propagation.quality.good');
    if (strength >= 40) return t('propagation.quality.fair');
    if (strength >= 20) return t('propagation.quality.weak');
    return t('propagation.quality.notReadable');
}

/**
 * Generate detailed educational explanation
 */
function generateDetailedExplanation(result, band) {
    const parts = [];
    const bandName = t(`bands.${band.id}.name`);

    // Start with the overall situation
    if (result.success) {
        parts.push(`${bandName} ✓`);
    } else {
        parts.push(`${bandName} ✗`);
    }

    // Add explanation for each significant factor
    const significantFactors = result.factors.filter(f => Math.abs(f.impact) > 0.2);

    for (const factor of significantFactors) {
        if (factor.impact > 0) {
            parts.push(`✓ ${factor.educational}`);
        } else {
            parts.push(`✗ ${factor.educational}`);
        }
    }

    return parts.join('\n\n');
}

/**
 * Format a single factor for display
 */
function formatFactor(factor) {
    const impactIcon = factor.impact > 0.2 ? '↑' :
        factor.impact < -0.2 ? '↓' : '→';

    const impactColor = factor.impact > 0.2 ? '#4ade80' :
        factor.impact < -0.2 ? '#f87171' : '#fbbf24';

    // Translate factor name
    let translatedName = factor.name;
    if (factor.name === 'D Layer Absorption') {
        translatedName = t('propagation.factors.dLayerAbsorption');
    } else if (factor.name === 'F Layer Reflection') {
        translatedName = t('propagation.factors.fLayerReflection');
    } else if (factor.name === 'Grey Line Effect') {
        translatedName = t('propagation.factors.greyLineEffect');
    } else if (factor.name === 'Path Geometry') {
        translatedName = t('propagation.factors.pathGeometry');
    }

    // Translate impact text
    let impactText;
    if (factor.impact > 0.2) {
        impactText = t('propagation.impacts.helps');
    } else if (factor.impact < -0.2) {
        impactText = t('propagation.impacts.hinders');
    } else {
        impactText = t('propagation.impacts.neutral');
    }

    return {
        name: translatedName,
        description: factor.description,
        educational: factor.educational,
        impact: factor.impact,
        impactIcon,
        impactColor,
        impactText
    };
}

/**
 * Get color for signal strength meter
 */
function getSignalColor(strength) {
    if (strength >= 70) return '#22c55e'; // Green
    if (strength >= 40) return '#eab308'; // Yellow
    if (strength >= 20) return '#f97316'; // Orange
    return '#ef4444'; // Red
}

/**
 * Generate suggestions for what to try next
 */
function generateSuggestions(result, band, dateTime) {
    const suggestions = [];

    // Find the most impactful negative factor
    const worstFactor = result.factors.reduce(
        (worst, f) => f.impact < worst.impact ? f : worst,
        { impact: 0 }
    );

    if (worstFactor.name === 'D Layer Absorption' && worstFactor.impact < -0.3) {
        suggestions.push({
            action: t('suggestions.items.waitForSunset.action'),
            reason: t('suggestions.items.waitForSunset.reason'),
            icon: '🌅'
        });
        suggestions.push({
            action: t('suggestions.items.tryHigherBand.action'),
            reason: t('suggestions.items.tryHigherBand.reason'),
            icon: '📶'
        });
    }

    if (worstFactor.name === 'F Layer Reflection' && worstFactor.impact < -0.3) {
        suggestions.push({
            action: t('suggestions.items.tryLowerBand.action'),
            reason: t('suggestions.items.tryLowerBand.reason'),
            icon: '📉'
        });
        suggestions.push({
            action: t('suggestions.items.waitForSunlight.action'),
            reason: t('suggestions.items.waitForSunlight.reason'),
            icon: '☀️'
        });
    }

    if (worstFactor.name === 'Path Geometry' && worstFactor.impact < -0.3) {
        suggestions.push({
            action: t('suggestions.items.tryHigherBand.action'),
            reason: t('suggestions.items.tryHigherBand.reason'),
            icon: '🎯'
        });
        suggestions.push({
            action: t('suggestions.items.tryShorterPath.action'),
            reason: t('suggestions.items.tryShorterPath.reason'),
            icon: '🗺️'
        });
    }

    // Positive suggestions when things are working
    if (result.success && result.signalStrength > 50) {
        suggestions.push({
            action: t('suggestions.items.tryFartherLocations.action'),
            reason: t('suggestions.items.tryFartherLocations.reason'),
            icon: '🌍'
        });
    }

    // Grey line specific suggestions
    const greyLineFactor = result.factors.find(f => f.name === 'Grey Line Effect');
    if (greyLineFactor && greyLineFactor.impact > 0) {
        suggestions.push({
            action: t('suggestions.items.experimentGreyLine.action'),
            reason: t('suggestions.items.experimentGreyLine.reason'),
            icon: '✨'
        });
    }

    return suggestions;
}

/**
 * Generate encouraging message based on result
 */
function generateEncouragement(result, band) {
    const bandName = t(`bands.${band.id}.name`);

    if (result.success) {
        if (result.signalStrength >= 70) {
            return {
                message: t('encouragement.excellent.message'),
                detail: t('encouragement.excellent.detail', { band: bandName })
            };
        } else if (result.signalStrength >= 40) {
            return {
                message: t('encouragement.good.message'),
                detail: t('encouragement.good.detail')
            };
        } else {
            return {
                message: t('encouragement.weak.message'),
                detail: t('encouragement.weak.detail')
            };
        }
    } else {
        // Even failures teach something
        const learningMessage = result.learningPoints.length > 0
            ? result.learningPoints[0].insight
            : t('encouragement.failed.detail');

        return {
            message: t('encouragement.failed.message'),
            detail: learningMessage
        };
    }
}

/**
 * Generate a comparison explanation when player changes bands
 */
export function explainBandChange(oldBandId, newBandId, result1, result2) {
    const oldBand = HF_BANDS[oldBandId];
    const newBand = HF_BANDS[newBandId];
    const oldBandName = t(`bands.${oldBandId}.name`);
    const newBandName = t(`bands.${newBandId}.name`);

    const comparison = {
        bands: [oldBandName, newBandName],
        strengthChange: result2.signalStrength - result1.signalStrength,
        explanation: '',
        keyDifference: ''
    };

    if (comparison.strengthChange > 20) {
        comparison.explanation = t('comparison.muchBetter', { band: newBandName });
    } else if (comparison.strengthChange > 5) {
        comparison.explanation = t('comparison.slightlyBetter', { band: newBandName });
    } else if (comparison.strengthChange < -20) {
        comparison.explanation = t('comparison.muchWorse', { oldBand: oldBandName });
    } else if (comparison.strengthChange < -5) {
        comparison.explanation = t('comparison.wasBetter', { oldBand: oldBandName });
    } else {
        // -5 to +5: truly similar
        comparison.explanation = t('comparison.similar');
    }

    // Find the key difference - only if there IS a significant difference
    if (Math.abs(comparison.strengthChange) > 5) {
        if (oldBand.centerFrequency < newBand.centerFrequency) {
            // New band is higher frequency
            if (comparison.strengthChange > 0) {
                comparison.keyDifference = t('comparison.higherLessAbsorbed', { band: newBandName });
            } else {
                comparison.keyDifference = t('comparison.lowerReflectsBetter', { band: oldBandName });
            }
        } else {
            // New band is lower frequency
            if (comparison.strengthChange > 0) {
                comparison.keyDifference = t('comparison.lowerWorksBetter', { band: newBandName });
            } else {
                comparison.keyDifference = t('comparison.higherAvoidsAbsorption', { band: oldBandName });
            }
        }
    }
    // If similar (-5 to +5), keyDifference stays empty - no misleading explanation

    return comparison;
}

/**
 * Generate time-based explanation when player changes time
 */
export function explainTimeChange(oldTime, newTime, result1, result2, location) {
    const oldHour = oldTime.getUTCHours();
    const newHour = newTime.getUTCHours();

    const explanation = {
        timeChange: `${formatHour(oldHour)} → ${formatHour(newHour)}`,
        strengthChange: result2.signalStrength - result1.signalStrength,
        explanation: '',
        insight: ''
    };

    // Determine if we crossed day/night boundary
    const wasDay = oldHour >= 6 && oldHour < 18;
    const isDay = newHour >= 6 && newHour < 18;

    if (wasDay && !isDay) {
        explanation.insight = t('lighting.night.educational');
    } else if (!wasDay && isDay) {
        explanation.insight = t('lighting.day.educational');
    } else if (result2.signalStrength > result1.signalStrength) {
        explanation.insight = t('propagation.quality.good');
    } else if (result2.signalStrength < result1.signalStrength) {
        explanation.insight = t('propagation.quality.fair');
    } else {
        explanation.insight = t('comparison.similar');
    }

    return explanation;
}

function formatHour(hour) {
    if (hour === 0) return '00:00';
    if (hour === 12) return '12:00';
    return `${hour.toString().padStart(2, '0')}:00`;
}

/**
 * Generate tutorial-style hints for new players
 */
export function getTutorialHint(gameState) {
    const hints = [];

    if (gameState.contactAttempts === 0) {
        hints.push({
            title: t('ui.welcome.gettingStarted'),
            content: t('ui.welcome.step3'),
            priority: 1
        });
    }

    if (gameState.contactAttempts > 0 && gameState.successfulContacts === 0) {
        hints.push({
            title: t('encouragement.failed.message'),
            content: t('encouragement.good.detail'),
            priority: 1
        });
    }

    return hints.sort((a, b) => a.priority - b.priority)[0] || null;
}

/**
 * Generate "aha moment" detection
 * Identifies when a player has discovered a key concept through experimentation
 */
export function detectDiscovery(gameState, latestResult) {
    const discoveries = [];

    // Discovery: D layer absorption
    if (gameState.dayFailedNightSucceeded && !gameState.discoveries.dLayerAbsorption) {
        discoveries.push({
            concept: t('discoveries.dLayerAbsorption.concept'),
            message: t('discoveries.dLayerAbsorption.message'),
            celebrationType: 'lightbulb'
        });
    }

    // Discovery: Grey line propagation
    if (latestResult.factors.some(f => f.name === 'Grey Line Effect' && f.impact > 0.3)) {
        if (!gameState.discoveries.greyLine) {
            discoveries.push({
                concept: t('discoveries.greyLine.concept'),
                message: t('discoveries.greyLine.message'),
                celebrationType: 'star'
            });
        }
    }

    // Discovery: Frequency-distance relationship
    if (gameState.higherBandFartherSuccess && !gameState.discoveries.frequencyDistance) {
        discoveries.push({
            concept: t('discoveries.frequencyDistance.concept'),
            message: t('discoveries.frequencyDistance.message'),
            celebrationType: 'globe'
        });
    }

    return discoveries;
}
