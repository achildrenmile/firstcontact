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

/**
 * Compass directions in degrees
 */
export const COMPASS_DIRECTIONS = {
    N:   { id: 'N',   degrees: 0,   name: 'North' },
    NE:  { id: 'NE',  degrees: 45,  name: 'Northeast' },
    E:   { id: 'E',   degrees: 90,  name: 'East' },
    SE:  { id: 'SE',  degrees: 135, name: 'Southeast' },
    S:   { id: 'S',   degrees: 180, name: 'South' },
    SW:  { id: 'SW',  degrees: 225, name: 'Southwest' },
    W:   { id: 'W',   degrees: 270, name: 'West' },
    NW:  { id: 'NW',  degrees: 315, name: 'Northwest' }
};

/**
 * Get all compass directions
 */
export function getAllDirections() {
    return Object.values(COMPASS_DIRECTIONS);
}

/**
 * Calculate bearing from source to target (in degrees, 0 = North)
 */
export function calculateBearing(sourceLat, sourceLon, targetLat, targetLon) {
    const lat1 = sourceLat * Math.PI / 180;
    const lat2 = targetLat * Math.PI / 180;
    const dLon = (targetLon - sourceLon) * Math.PI / 180;

    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360; // Normalize to 0-360

    return bearing;
}

/**
 * Calculate directional gain penalty for Yagi antenna
 * Based on typical 3-element Yagi radiation pattern:
 * - Front (0°): Full gain (0 dB penalty)
 * - -3dB beamwidth: ~60° (±30° from center)
 * - Side lobes (90°): -10 to -12 dB
 * - Back (180°): -15 to -20 dB (front-to-back ratio)
 *
 * @param {number} antennaDirection - Direction antenna is pointing (degrees)
 * @param {number} targetBearing - Bearing to target (degrees)
 * @returns {object} Direction penalty info
 */
export function calculateDirectionalPenalty(antennaDirection, targetBearing) {
    // Calculate angular difference (0-180)
    let diff = Math.abs(antennaDirection - targetBearing);
    if (diff > 180) diff = 360 - diff;

    let penaltyDb = 0;
    let description = '';
    let severity = 'none';

    if (diff <= 30) {
        // Within main beam (-3dB beamwidth)
        penaltyDb = (diff / 30) * 3; // 0 to -3 dB
        description = 'onTarget';
        severity = 'none';
    } else if (diff <= 60) {
        // First sidelobe region
        penaltyDb = 3 + ((diff - 30) / 30) * 5; // -3 to -8 dB
        description = 'slightlyOff';
        severity = 'minor';
    } else if (diff <= 90) {
        // Side region
        penaltyDb = 8 + ((diff - 60) / 30) * 4; // -8 to -12 dB
        description = 'sideOn';
        severity = 'moderate';
    } else if (diff <= 135) {
        // Rear quarter
        penaltyDb = 12 + ((diff - 90) / 45) * 5; // -12 to -17 dB
        description = 'rearQuarter';
        severity = 'severe';
    } else {
        // Back lobe
        penaltyDb = 17 + ((diff - 135) / 45) * 3; // -17 to -20 dB
        description = 'backwards';
        severity = 'extreme';
    }

    // Convert dB penalty to impact factor (for propagation engine)
    // Roughly -3 dB = -0.1 impact
    const impact = -penaltyDb / 30;

    return {
        angleDiff: diff,
        penaltyDb: Math.round(penaltyDb * 10) / 10,
        impact,
        description,
        severity,
        antennaDirection,
        targetBearing: Math.round(targetBearing)
    };
}
