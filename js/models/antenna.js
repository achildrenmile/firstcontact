/**
 * Antenna Model
 *
 * Defines antenna types and their characteristics.
 * Antenna type affects:
 * - Gain (signal strength bonus)
 * - Takeoff angle (affects skip zone and DX vs NVIS capability)
 * - Radiation pattern (directional vs omnidirectional)
 */

/**
 * Antenna type definitions
 *
 * takeoffAngle: Typical radiation angle in degrees
 *   - Low (5-20°): Better for DX, larger effective skip zone
 *   - High (40-90°): Better for NVIS, can fill skip zone
 *
 * gainDb: Antenna gain relative to isotropic (dBi)
 * nvisCapability: 0-1 scale, how well it works for near-vertical propagation
 * dxCapability: 0-1 scale, how well it works for long-distance DX
 */
export const ANTENNA_TYPES = {
    dipole: {
        id: 'dipole',
        gainDb: 2.15,           // Dipole gain over isotropic
        takeoffAngle: 35,      // Medium angle - compromise
        nvisCapability: 0.7,   // Decent for NVIS
        dxCapability: 0.6,     // Moderate DX capability
        directional: false,
        icon: '📶',
        heightSensitive: true  // Performance varies with height
    },
    vertical: {
        id: 'vertical',
        gainDb: 0,             // Ground plane vertical ~0 dBi
        takeoffAngle: 20,      // Low angle radiation
        nvisCapability: 0.3,   // Poor for NVIS (radiates horizontally)
        dxCapability: 0.9,     // Excellent for DX
        directional: false,    // Omnidirectional
        icon: '📡',
        heightSensitive: false
    },
    yagi: {
        id: 'yagi',
        gainDb: 8,             // 3-element Yagi ~8 dBi
        takeoffAngle: 15,      // Low angle, optimized for DX
        nvisCapability: 0.2,   // Poor for NVIS
        dxCapability: 1.0,     // Best for DX
        directional: true,     // Must point at target
        icon: '🎯',
        heightSensitive: true
    }
};

/**
 * Get antenna type by ID
 */
export function getAntennaType(antennaId) {
    return ANTENNA_TYPES[antennaId] || ANTENNA_TYPES.dipole;
}

/**
 * Get all antenna types as array
 */
export function getAllAntennaTypes() {
    return Object.values(ANTENNA_TYPES);
}

/**
 * Calculate antenna factor for propagation
 *
 * @param {string} antennaId - Antenna type ID
 * @param {number} distance - Path distance in km
 * @param {object} pathConditions - Conditions along the path
 * @returns {object} Antenna factor with impact and description
 */
export function calculateAntennaFactor(antennaId, distance, pathConditions = {}) {
    const antenna = getAntennaType(antennaId);

    // Base impact from gain (normalized to ~0.1 per 3dB)
    let impact = antenna.gainDb / 30;

    // Determine if this is a NVIS-range contact (< 500 km) or DX (> 1500 km)
    const isNVIS = distance < 500;
    const isDX = distance > 1500;
    const isMedium = !isNVIS && !isDX;

    // Adjust based on distance vs antenna capability
    if (isNVIS) {
        // Short distance - NVIS capability matters
        // Low takeoff angle antennas struggle with NVIS
        impact += (antenna.nvisCapability - 0.5) * 0.3;
    } else if (isDX) {
        // Long distance - DX capability matters
        // High takeoff angle antennas struggle with DX
        impact += (antenna.dxCapability - 0.5) * 0.3;
    }
    // Medium distance: both work reasonably well

    // Skip zone interaction:
    // Low takeoff angle = effectively larger skip zone
    // High takeoff angle = can potentially fill skip zone via NVIS
    const skipZoneModifier = isNVIS ? (antenna.nvisCapability - 0.5) * 0.2 : 0;
    impact += skipZoneModifier;

    return {
        antennaId: antenna.id,
        gainDb: antenna.gainDb,
        takeoffAngle: antenna.takeoffAngle,
        impact: impact,
        isNVIS,
        isDX,
        directional: antenna.directional
    };
}

/**
 * Get effective skip zone modifier based on antenna
 * Returns a multiplier for the skip zone distance
 *
 * Low angle antennas: skip zone is closer to theoretical maximum
 * High angle antennas: can reduce effective skip zone via NVIS
 */
export function getSkipZoneModifier(antennaId) {
    const antenna = getAntennaType(antennaId);

    // NVIS-capable antennas can reduce effective skip zone
    // Factor of 0.7-1.0 based on NVIS capability
    return 1.0 - (antenna.nvisCapability * 0.3);
}
