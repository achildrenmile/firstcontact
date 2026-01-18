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
    anchorage: new Location(61.2181, -149.9003, 'Anchorage, Alaska', 'KL7'),
    miami: new Location(25.7617, -80.1918, 'Miami, USA', 'W4'),
    denver: new Location(39.7392, -104.9903, 'Denver, USA', 'W0'),
    seattle: new Location(47.6062, -122.3321, 'Seattle, USA', 'W7'),
    toronto: new Location(43.6532, -79.3832, 'Toronto, Canada', 'VE3'),
    vancouver: new Location(49.2827, -123.1207, 'Vancouver, Canada', 'VE7'),

    // Central America & Caribbean
    havana: new Location(23.1136, -82.3666, 'Havana, Cuba', 'CO'),
    mexicoCity: new Location(19.4326, -99.1332, 'Mexico City, Mexico', 'XE'),
    panamaCity: new Location(8.9824, -79.5199, 'Panama City, Panama', 'HP'),

    // Europe
    vienna: new Location(48.2082, 16.3738, 'Vienna, Austria', 'OE'),
    london: new Location(51.5074, -0.1278, 'London, UK', 'G'),
    berlin: new Location(52.5200, 13.4050, 'Berlin, Germany', 'DL'),
    moscow: new Location(55.7558, 37.6173, 'Moscow, Russia', 'UA'),
    rome: new Location(41.9028, 12.4964, 'Rome, Italy', 'I'),
    stockholm: new Location(59.3293, 18.0686, 'Stockholm, Sweden', 'SM'),
    athens: new Location(37.9838, 23.7275, 'Athens, Greece', 'SV'),
    lisbon: new Location(38.7223, -9.1393, 'Lisbon, Portugal', 'CT'),
    paris: new Location(48.8566, 2.3522, 'Paris, France', 'F'),
    madrid: new Location(40.4168, -3.7038, 'Madrid, Spain', 'EA'),
    warsaw: new Location(52.2297, 21.0122, 'Warsaw, Poland', 'SP'),
    helsinki: new Location(60.1699, 24.9384, 'Helsinki, Finland', 'OH'),
    prague: new Location(50.0755, 14.4378, 'Prague, Czech Republic', 'OK'),
    budapest: new Location(47.4979, 19.0402, 'Budapest, Hungary', 'HA'),
    bucharest: new Location(44.4268, 26.1025, 'Bucharest, Romania', 'YO'),
    kyiv: new Location(50.4501, 30.5234, 'Kyiv, Ukraine', 'UR'),
    dublin: new Location(53.3498, -6.2603, 'Dublin, Ireland', 'EI'),
    zurich: new Location(47.3769, 8.5417, 'Zürich, Switzerland', 'HB9'),
    amsterdam: new Location(52.3676, 4.9041, 'Amsterdam, Netherlands', 'PA'),
    brussels: new Location(50.8503, 4.3517, 'Brussels, Belgium', 'ON'),

    // Asia
    tokyo: new Location(35.6762, 139.6503, 'Tokyo, Japan', 'JA'),
    beijing: new Location(39.9042, 116.4074, 'Beijing, China', 'BY'),
    mumbai: new Location(19.0760, 72.8777, 'Mumbai, India', 'VU'),
    bangkok: new Location(13.7563, 100.5018, 'Bangkok, Thailand', 'HS'),
    dubai: new Location(25.2048, 55.2708, 'Dubai, UAE', 'A6'),
    singapore: new Location(1.3521, 103.8198, 'Singapore', '9V'),
    hongKong: new Location(22.3193, 114.1694, 'Hong Kong', 'VR2'),
    seoul: new Location(37.5665, 126.9780, 'Seoul, South Korea', 'HL'),
    taipei: new Location(25.0330, 121.5654, 'Taipei, Taiwan', 'BV'),
    manila: new Location(14.5995, 120.9842, 'Manila, Philippines', 'DU'),
    jakarta: new Location(-6.2088, 106.8456, 'Jakarta, Indonesia', 'YB'),
    newDelhi: new Location(28.6139, 77.2090, 'New Delhi, India', 'VU'),
    tehran: new Location(35.6892, 51.3890, 'Tehran, Iran', 'EP'),
    istanbul: new Location(41.0082, 28.9784, 'Istanbul, Turkey', 'TA'),
    vladivostok: new Location(43.1332, 131.9113, 'Vladivostok, Russia', 'UA0'),
    novosibirsk: new Location(55.0084, 82.9357, 'Novosibirsk, Russia', 'UA9'),

    // Oceania
    sydney: new Location(-33.8688, 151.2093, 'Sydney, Australia', 'VK2'),
    perth: new Location(-31.9505, 115.8605, 'Perth, Australia', 'VK6'),
    melbourne: new Location(-37.8136, 144.9631, 'Melbourne, Australia', 'VK3'),
    brisbane: new Location(-27.4698, 153.0251, 'Brisbane, Australia', 'VK4'),
    darwin: new Location(-12.4634, 130.8456, 'Darwin, Australia', 'VK8'),
    auckland: new Location(-36.8509, 174.7645, 'Auckland, New Zealand', 'ZL1'),
    wellington: new Location(-41.2866, 174.7756, 'Wellington, New Zealand', 'ZL2'),
    christchurch: new Location(-43.5321, 172.6362, 'Christchurch, New Zealand', 'ZL3'),
    chathamIslands: new Location(-43.9500, -176.5500, 'Chatham Islands, NZ', 'ZL7'),
    fiji: new Location(-18.1416, 178.4419, 'Suva, Fiji', '3D2'),
    tahiti: new Location(-17.5516, -149.5585, 'Papeete, Tahiti', 'FO'),
    guam: new Location(13.4443, 144.7937, 'Guam', 'KH2'),
    hawaii: new Location(21.3069, -157.8583, 'Honolulu, Hawaii', 'KH6'),
    papuaNewGuinea: new Location(-6.3150, 143.9555, 'Port Moresby, PNG', 'P29'),
    newCaledonia: new Location(-22.2758, 166.4580, 'Nouméa, New Caledonia', 'FK'),
    vanuatu: new Location(-17.7333, 168.3167, 'Port Vila, Vanuatu', 'YJ'),
    solomonIslands: new Location(-9.4438, 160.0000, 'Honiara, Solomon Is.', 'H44'),

    // South America
    saoPaulo: new Location(-23.5505, -46.6333, 'São Paulo, Brazil', 'PY'),
    buenosAires: new Location(-34.6037, -58.3816, 'Buenos Aires, Argentina', 'LU'),
    lima: new Location(-12.0464, -77.0428, 'Lima, Peru', 'OA'),
    santiago: new Location(-33.4489, -70.6693, 'Santiago, Chile', 'CE'),
    bogota: new Location(4.7110, -74.0721, 'Bogotá, Colombia', 'HK'),
    caracas: new Location(10.4806, -66.9036, 'Caracas, Venezuela', 'YV'),
    montevideo: new Location(-34.9011, -56.1645, 'Montevideo, Uruguay', 'CX'),
    quito: new Location(-0.1807, -78.4678, 'Quito, Ecuador', 'HC'),
    rioDeJaneiro: new Location(-22.9068, -43.1729, 'Rio de Janeiro, Brazil', 'PY1'),
    ushuaia: new Location(-54.8019, -68.3030, 'Ushuaia, Argentina', 'LU'),

    // Africa
    capeTown: new Location(-33.9249, 18.4241, 'Cape Town, South Africa', 'ZS'),
    cairo: new Location(30.0444, 31.2357, 'Cairo, Egypt', 'SU'),
    nairobi: new Location(-1.2921, 36.8219, 'Nairobi, Kenya', '5Z'),
    casablanca: new Location(33.5731, -7.5898, 'Casablanca, Morocco', 'CN'),
    johannesburg: new Location(-26.2041, 28.0473, 'Johannesburg, South Africa', 'ZS'),
    lagos: new Location(6.5244, 3.3792, 'Lagos, Nigeria', '5N'),
    addisAbaba: new Location(9.0320, 38.7469, 'Addis Ababa, Ethiopia', 'ET'),
    dakar: new Location(14.7167, -17.4677, 'Dakar, Senegal', '6W'),
    tunis: new Location(36.8065, 10.1815, 'Tunis, Tunisia', '3V'),
    algiers: new Location(36.7372, 3.0865, 'Algiers, Algeria', '7X'),
    accra: new Location(5.6037, -0.1870, 'Accra, Ghana', '9G'),
    luanda: new Location(-8.8390, 13.2894, 'Luanda, Angola', 'D2'),

    // Polar Regions
    reykjavik: new Location(64.1466, -21.9426, 'Reykjavik, Iceland', 'TF'),
    tromso: new Location(69.6492, 18.9553, 'Tromsø, Norway', 'LA'),
    svalbard: new Location(78.2232, 15.6267, 'Longyearbyen, Svalbard', 'JW'),

    // Antarctica
    mcmurdo: new Location(-77.8419, 166.6863, 'McMurdo Station, Antarctica', 'KC4'),
    vostok: new Location(-78.4645, 106.8340, 'Vostok Station, Antarctica', 'R1AN'),
    neumayer: new Location(-70.6500, -8.2640, 'Neumayer Station, Antarctica', 'DP0GVN'),
    scottBase: new Location(-77.8500, 166.7660, 'Scott Base, Antarctica', 'ZL5'),

    // Rare DX Islands - Atlantic
    tristanDaCunha: new Location(-37.1052, -12.2777, 'Tristan da Cunha', 'ZD9'),
    ascensionIsland: new Location(-7.9467, -14.3559, 'Ascension Island', 'ZD8'),
    stHelena: new Location(-15.9650, -5.7089, 'St. Helena', 'ZD7'),
    falklandIslands: new Location(-51.7963, -59.5236, 'Falkland Islands', 'VP8'),
    southGeorgia: new Location(-54.2833, -36.5000, 'South Georgia Island', 'VP8/G'),
    azores: new Location(37.7412, -25.6756, 'Azores, Portugal', 'CU'),
    canaryIslands: new Location(28.2916, -16.6291, 'Canary Islands, Spain', 'EA8'),
    madeiraIsland: new Location(32.6669, -16.9241, 'Madeira Island', 'CT3'),
    capeVerde: new Location(14.9330, -23.5133, 'Cape Verde', 'D4'),
    bermuda: new Location(32.3078, -64.7505, 'Bermuda', 'VP9'),

    // Rare DX Islands - Indian Ocean
    mauritius: new Location(-20.1609, 57.5012, 'Mauritius', '3B8'),
    reunion: new Location(-21.1151, 55.5364, 'Réunion Island', 'FR'),
    seychelles: new Location(-4.6796, 55.4920, 'Seychelles', 'S7'),
    maldives: new Location(4.1755, 73.5093, 'Maldives', '8Q'),
    rodrigues: new Location(-19.7245, 63.4169, 'Rodrigues Island', '3B9'),
    kerguelen: new Location(-49.3500, 70.2167, 'Kerguelen Islands', 'FT5X'),

    // Rare DX Islands - Pacific
    easterIsland: new Location(-27.1127, -109.3497, 'Easter Island', 'CE0Y'),
    pitcairnIsland: new Location(-25.0667, -130.1000, 'Pitcairn Island', 'VP6'),
    norfolkIsland: new Location(-29.0408, 167.9547, 'Norfolk Island', 'VK9N'),
    lordHoweIsland: new Location(-31.5553, 159.0821, 'Lord Howe Island', 'VK9L'),
    midwayAtoll: new Location(28.2072, -177.3735, 'Midway Atoll', 'KH4'),
    wakeIsland: new Location(19.2823, 166.6470, 'Wake Island', 'KH9'),
    samoa: new Location(-13.8333, -171.7500, 'American Samoa', 'KH8'),
    cookIslands: new Location(-21.2367, -159.7776, 'Cook Islands', 'E51'),
    tokelau: new Location(-9.2000, -171.8484, 'Tokelau', 'ZK3'),
    tuvalu: new Location(-8.5211, 179.1983, 'Tuvalu', 'T2'),
    kiribati: new Location(1.8709, -157.3626, 'Kiribati', 'T31'),
    nauru: new Location(-0.5228, 166.9315, 'Nauru', 'C2'),
    palau: new Location(7.5150, 134.5825, 'Palau', 'T8'),
    marshallIslands: new Location(7.1315, 171.1845, 'Marshall Islands', 'V73'),
    clipperton: new Location(10.2833, -109.2167, 'Clipperton Island', 'FO/C'),

    // Caribbean Islands
    aruba: new Location(12.5211, -69.9683, 'Aruba', 'P4'),
    curacao: new Location(12.1696, -68.9900, 'Curaçao', 'PJ2'),
    martinique: new Location(14.6415, -61.0242, 'Martinique', 'FM'),
    barbados: new Location(13.1939, -59.5432, 'Barbados', '8P'),
    stMartin: new Location(18.0425, -63.0548, 'St. Martin', 'FS')
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
 * Earth's circumference in kilometers
 */
const EARTH_CIRCUMFERENCE = 40075;

/**
 * Calculate long path distance (the other way around the globe)
 * @returns {number} Long path distance in kilometers
 */
export function calculateLongPathDistance(lat1, lon1, lat2, lon2) {
    const shortPath = calculateDistance(lat1, lon1, lat2, lon2);
    return EARTH_CIRCUMFERENCE - shortPath;
}

/**
 * Calculate both short and long path information
 * @returns {object} Object with shortPath and longPath distances and which is shorter
 */
export function calculateBothPaths(lat1, lon1, lat2, lon2) {
    const shortPath = calculateDistance(lat1, lon1, lat2, lon2);
    const longPath = EARTH_CIRCUMFERENCE - shortPath;

    return {
        shortPath: {
            distance: shortPath,
            bearing: calculateBearing(lat1, lon1, lat2, lon2)
        },
        longPath: {
            distance: longPath,
            bearing: (calculateBearing(lat1, lon1, lat2, lon2) + 180) % 360
        }
    };
}

/**
 * Generate points along a great circle path (for drawing signal paths)
 * @param {number} numPoints - Number of intermediate points
 * @param {boolean} longPath - If true, generate points for the long path
 */
export function generatePathPoints(lat1, lon1, lat2, lon2, numPoints = 20, longPath = false) {
    const points = [];

    if (!longPath) {
        // Short path - direct interpolation
        for (let i = 0; i <= numPoints; i++) {
            const fraction = i / numPoints;
            const point = interpolateGreatCircle(lat1, lon1, lat2, lon2, fraction);
            points.push(point);
        }
    } else {
        // Long path - go the other way around the globe
        // We use the antipodal approach: go from A in the opposite direction to reach B
        for (let i = 0; i <= numPoints; i++) {
            const fraction = i / numPoints;
            const point = interpolateLongPath(lat1, lon1, lat2, lon2, fraction);
            points.push(point);
        }
    }

    return points;
}

/**
 * Interpolate a point along the long path (the other way around the globe)
 * Uses the longer arc of the great circle connecting the two points.
 * @param {number} fraction - 0 to 1, where along the long path
 */
function interpolateLongPath(lat1, lon1, lat2, lon2, fraction) {
    // Long path = going the "other way" around the great circle
    // We achieve this by:
    // 1. Starting at the source
    // 2. Going in the OPPOSITE direction (bearing + 180°)
    // 3. Traveling for (long path distance * fraction)

    const shortPathBearing = calculateBearing(lat1, lon1, lat2, lon2);
    const longPathBearing = (shortPathBearing + 180) % 360;

    const shortDist = calculateDistance(lat1, lon1, lat2, lon2);
    const longDist = EARTH_CIRCUMFERENCE - shortDist;

    // Distance to travel along the long path
    const distanceToTravel = longDist * fraction;

    // Calculate destination point given start, bearing, and distance
    return destinationPoint(lat1, lon1, longPathBearing, distanceToTravel);
}

/**
 * Calculate destination point given start point, bearing, and distance
 * @param {number} lat - Starting latitude in degrees
 * @param {number} lon - Starting longitude in degrees
 * @param {number} bearing - Bearing in degrees (0-360)
 * @param {number} distance - Distance in kilometers
 * @returns {object} Destination point {latitude, longitude}
 */
function destinationPoint(lat, lon, bearing, distance) {
    const R = 6371; // Earth's radius in km
    const d = distance / R; // Angular distance in radians
    const brng = toRadians(bearing);
    const lat1 = toRadians(lat);
    const lon1 = toRadians(lon);

    const lat2 = Math.asin(
        Math.sin(lat1) * Math.cos(d) +
        Math.cos(lat1) * Math.sin(d) * Math.cos(brng)
    );

    const lon2 = lon1 + Math.atan2(
        Math.sin(brng) * Math.sin(d) * Math.cos(lat1),
        Math.cos(d) - Math.sin(lat1) * Math.sin(lat2)
    );

    // Normalize longitude to -180 to +180
    let lonDeg = toDegrees(lon2);
    while (lonDeg > 180) lonDeg -= 360;
    while (lonDeg < -180) lonDeg += 360;

    return {
        latitude: toDegrees(lat2),
        longitude: lonDeg
    };
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
