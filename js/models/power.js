/**
 * Power Levels Model
 *
 * Defines transmit power classes and their effect on propagation.
 * Power affects signal margin - ability to overcome absorption and path loss.
 */

/**
 * Power level definitions
 * dBRelative: dB relative to 100W reference (0 dB)
 * signalBonus: Impact on signal strength calculation (added to base 50)
 */
export const POWER_LEVELS = {
    qrp: {
        id: 'qrp',
        watts: 5,
        dBRelative: -13,  // 5W vs 100W = -13 dB
        signalBonus: -15, // Significant penalty
        icon: '🔋',
        challenge: true   // Educational: QRP is a challenge mode
    },
    standard: {
        id: 'standard',
        watts: 100,
        dBRelative: 0,    // Reference level
        signalBonus: 0,   // No bonus/penalty
        icon: '📻',
        challenge: false
    },
    high: {
        id: 'high',
        watts: 1000,
        dBRelative: 10,   // 1kW vs 100W = +10 dB
        signalBonus: 12,  // Significant boost
        icon: '📡',
        challenge: false
    }
};

/**
 * Get power level by ID
 */
export function getPowerLevel(powerId) {
    return POWER_LEVELS[powerId] || POWER_LEVELS.standard;
}

/**
 * Get all power levels as array
 */
export function getAllPowerLevels() {
    return Object.values(POWER_LEVELS);
}

/**
 * Calculate power factor for propagation
 * Returns a factor that modifies signal strength
 *
 * @param {string} powerId - Power level ID
 * @param {object} conditions - Path conditions (for context-dependent effects)
 * @returns {object} Power factor with impact and description
 */
export function calculatePowerFactor(powerId, conditions = {}) {
    const power = getPowerLevel(powerId);

    // Base impact from power difference
    let impact = power.signalBonus / 30; // Normalize to -0.5 to +0.4 range

    // QRP is extra challenging on absorbed bands
    if (power.id === 'qrp' && conditions.highAbsorption) {
        impact -= 0.1; // Additional penalty when fighting absorption
    }

    // High power helps overcome marginal conditions
    if (power.id === 'high' && conditions.marginalReflection) {
        impact += 0.05; // Slight extra benefit for marginal paths
    }

    return {
        powerId: power.id,
        watts: power.watts,
        dBRelative: power.dBRelative,
        impact: impact,
        signalBonus: power.signalBonus
    };
}

/**
 * Format power for display
 */
export function formatPower(powerId) {
    const power = getPowerLevel(powerId);
    if (power.watts >= 1000) {
        return `${power.watts / 1000} kW`;
    }
    return `${power.watts} W`;
}
