/**
 * Location Model
 *
 * Represents geographic locations for the game.
 * Includes predefined interesting locations for educational scenarios.
 */

export class Location {
    /**
     * Create a location
     * @param {number} latitude - Degrees (-90 to +90)
     * @param {number} longitude - Degrees (-180 to +180)
     * @param {string} name - Human-readable name
     * @param {string} code - Short code (like call sign prefix area)
     */
    constructor(latitude, longitude, name, code = '') {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.code = code;
    }

    /**
     * Create a copy of this location
     */
    clone() {
        return new Location(this.latitude, this.longitude, this.name, this.code);
    }

    /**
     * Get a short display string
     */
    toString() {
        return this.name || `${this.latitude.toFixed(1)}°, ${this.longitude.toFixed(1)}°`;
    }
}

/**
 * Predefined locations chosen for educational value:
 * - Spread across different time zones for day/night demonstrations
 * - Include classic amateur radio locations
 * - Enable demonstration of grey line propagation
 */
export const PRESET_LOCATIONS = {
    // North America
    newYork: new Location(40.7128, -74.0060, 'New York, USA', 'W2'),
    losAngeles: new Location(34.0522, -118.2437, 'Los Angeles, USA', 'W6'),
    chicago: new Location(41.8781, -87.6298, 'Chicago, USA', 'W9'),

    // Europe
    vienna: new Location(48.2082, 16.3738, 'Vienna, Austria', 'OE'),
    london: new Location(51.5074, -0.1278, 'London, UK', 'G'),
    berlin: new Location(52.5200, 13.4050, 'Berlin, Germany', 'DL'),
    moscow: new Location(55.7558, 37.6173, 'Moscow, Russia', 'UA'),
    rome: new Location(41.9028, 12.4964, 'Rome, Italy', 'I'),

    // Asia
    tokyo: new Location(35.6762, 139.6503, 'Tokyo, Japan', 'JA'),
    beijing: new Location(39.9042, 116.4074, 'Beijing, China', 'BY'),
    mumbai: new Location(19.0760, 72.8777, 'Mumbai, India', 'VU'),

    // Oceania
    sydney: new Location(-33.8688, 151.2093, 'Sydney, Australia', 'VK2'),

    // South America
    saoPaulo: new Location(-23.5505, -46.6333, 'São Paulo, Brazil', 'PY'),
    buenosAires: new Location(-34.6037, -58.3816, 'Buenos Aires, Argentina', 'LU'),

    // Africa
    capeTown: new Location(-33.9249, 18.4241, 'Cape Town, South Africa', 'ZS'),
    cairo: new Location(30.0444, 31.2357, 'Cairo, Egypt', 'SU'),

    // Special/Polar
    reykjavik: new Location(64.1466, -21.9426, 'Reykjavik, Iceland', 'TF'),
    mcmurdo: new Location(-77.8419, 166.6863, 'McMurdo Station, Antarctica', 'KC4')
};

/**
 * Get all preset locations as an array
 */
export function getAllPresetLocations() {
    return Object.values(PRESET_LOCATIONS);
}

/**
 * Find locations within a certain distance of a point
 */
export function findNearbyLocations(centerLat, centerLon, radiusKm) {
    return getAllPresetLocations().filter(loc => {
        const dist = calculateDistance(
            centerLat, centerLon,
            loc.latitude, loc.longitude
        );
        return dist <= radiusKm;
    });
}

/**
 * Calculate great circle distance between two points (Haversine formula)
 * @returns {number} Distance in kilometers
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

/**
 * Calculate initial bearing from point 1 to point 2
 * @returns {number} Bearing in degrees (0-360)
 */
export function calculateBearing(lat1, lon1, lat2, lon2) {
    const dLon = toRadians(lon2 - lon1);
    const lat1Rad = toRadians(lat1);
    const lat2Rad = toRadians(lat2);

    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
        Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);

    let bearing = toDegrees(Math.atan2(y, x));
    return (bearing + 360) % 360;
}

/**
 * Calculate midpoint between two locations (for path visualization)
 */
export function calculateMidpoint(lat1, lon1, lat2, lon2) {
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    const dLon = lon2Rad - lon1Rad;

    const Bx = Math.cos(lat2Rad) * Math.cos(dLon);
    const By = Math.cos(lat2Rad) * Math.sin(dLon);

    const lat3 = Math.atan2(
        Math.sin(lat1Rad) + Math.sin(lat2Rad),
        Math.sqrt((Math.cos(lat1Rad) + Bx) * (Math.cos(lat1Rad) + Bx) + By * By)
    );
    const lon3 = lon1Rad + Math.atan2(By, Math.cos(lat1Rad) + Bx);

    return {
        latitude: toDegrees(lat3),
        longitude: toDegrees(lon3)
    };
}

/**
 * Generate points along a great circle path (for drawing signal paths)
 * @param {number} numPoints - Number of intermediate points
 */
export function generatePathPoints(lat1, lon1, lat2, lon2, numPoints = 20) {
    const points = [];

    for (let i = 0; i <= numPoints; i++) {
        const fraction = i / numPoints;
        const point = interpolateGreatCircle(lat1, lon1, lat2, lon2, fraction);
        points.push(point);
    }

    return points;
}

/**
 * Interpolate a point along a great circle path
 * @param {number} fraction - 0 to 1, where along the path
 */
function interpolateGreatCircle(lat1, lon1, lat2, lon2, fraction) {
    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    const d = 2 * Math.asin(Math.sqrt(
        Math.pow(Math.sin((lat1Rad - lat2Rad) / 2), 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.pow(Math.sin((lon1Rad - lon2Rad) / 2), 2)
    ));

    if (d === 0) {
        return { latitude: lat1, longitude: lon1 };
    }

    const A = Math.sin((1 - fraction) * d) / Math.sin(d);
    const B = Math.sin(fraction * d) / Math.sin(d);

    const x = A * Math.cos(lat1Rad) * Math.cos(lon1Rad) +
        B * Math.cos(lat2Rad) * Math.cos(lon2Rad);
    const y = A * Math.cos(lat1Rad) * Math.sin(lon1Rad) +
        B * Math.cos(lat2Rad) * Math.sin(lon2Rad);
    const z = A * Math.sin(lat1Rad) + B * Math.sin(lat2Rad);

    const lat = Math.atan2(z, Math.sqrt(x * x + y * y));
    const lon = Math.atan2(y, x);

    return {
        latitude: toDegrees(lat),
        longitude: toDegrees(lon)
    };
}

// Utility functions
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}
