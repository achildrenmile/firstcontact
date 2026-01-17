/**
 * Sun Position System
 *
 * Calculates the sun's position, day/night status, and grey line zones.
 *
 * EDUCATIONAL DESIGN NOTES:
 * We use simplified solar position calculations that are accurate enough for the game's
 * educational purposes while being understandable and fast. Real astronomical calculations
 * involve many more corrections, but the additional precision doesn't improve learning.
 *
 * Key concepts players learn:
 * 1. The sun's position determines ionospheric ionization
 * 2. Day/night affects which bands work best
 * 3. The grey line (twilight zone) has special propagation properties
 * 4. As Earth rotates, propagation conditions change predictably
 */

/**
 * Calculate the sun's position for a given date/time
 * Returns the subsolar point (where the sun is directly overhead)
 *
 * @param {Date} dateTime - The date and time (UTC)
 * @returns {Object} { latitude, longitude, declination, hourAngle }
 */
export function calculateSunPosition(dateTime) {
    // Day of year (1-365)
    const startOfYear = new Date(dateTime.getFullYear(), 0, 0);
    const diff = dateTime - startOfYear;
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Solar declination: sun's latitude ranges from +23.45° to -23.45° over the year
    // This is why we have seasons and why propagation varies by season
    const declination = -23.45 * Math.cos((360 / 365) * (dayOfYear + 10) * Math.PI / 180);

    // Hour angle: where the sun is in its daily path
    // At solar noon (sun highest), hour angle = 0
    const hours = dateTime.getUTCHours() + dateTime.getUTCMinutes() / 60;
    const solarLongitude = ((12 - hours) * 15); // 15° per hour, noon = 0° longitude

    // Subsolar point: where the sun is directly overhead
    return {
        latitude: declination,
        longitude: ((solarLongitude + 180) % 360) - 180, // Normalize to -180..+180
        declination: declination,
        hourAngle: hours * 15 // Degrees from midnight
    };
}

/**
 * Calculate the solar elevation angle at a specific location
 * This is the key value for determining ionospheric conditions
 *
 * @param {number} latitude - Observer's latitude
 * @param {number} longitude - Observer's longitude
 * @param {Date} dateTime - The date and time (UTC)
 * @returns {number} Solar elevation in degrees (-90 to +90)
 *
 * EDUCATIONAL NOTE:
 * - Elevation > 0: Sun is above horizon (daytime)
 * - Elevation < 0: Sun is below horizon (nighttime)
 * - Elevation around 0: Twilight (grey line!)
 */
export function calculateSolarElevation(latitude, longitude, dateTime) {
    const sunPos = calculateSunPosition(dateTime);

    // Convert to radians for trig
    const latRad = latitude * Math.PI / 180;
    const lonRad = longitude * Math.PI / 180;
    const decRad = sunPos.declination * Math.PI / 180;
    const sunLonRad = sunPos.longitude * Math.PI / 180;

    // Hour angle at observer's location
    const hourAngle = lonRad - sunLonRad;

    // Solar elevation formula (simplified)
    const sinElevation =
        Math.sin(latRad) * Math.sin(decRad) +
        Math.cos(latRad) * Math.cos(decRad) * Math.cos(hourAngle);

    return Math.asin(sinElevation) * 180 / Math.PI;
}

/**
 * Determine the lighting condition at a location
 * Returns a qualitative state useful for game logic
 */
export function getLightingCondition(latitude, longitude, dateTime) {
    const elevation = calculateSolarElevation(latitude, longitude, dateTime);

    if (elevation > 6) {
        return {
            condition: 'day',
            description: 'Full daylight',
            elevation: elevation,
            dLayerActive: true,
            educational: 'The D layer is fully ionized and will absorb lower frequency signals.'
        };
    } else if (elevation > 0) {
        return {
            condition: 'day',
            description: 'Daytime (sun low)',
            elevation: elevation,
            dLayerActive: true,
            educational: 'The sun is low but the D layer is still somewhat active.'
        };
    } else if (elevation > -6) {
        return {
            condition: 'civil_twilight',
            description: 'Civil twilight (grey line)',
            elevation: elevation,
            dLayerActive: false,
            educational: 'The grey line! The D layer is fading but the F layer is still ionized - excellent propagation conditions!'
        };
    } else if (elevation > -12) {
        return {
            condition: 'nautical_twilight',
            description: 'Nautical twilight',
            elevation: elevation,
            dLayerActive: false,
            educational: 'The D layer has disappeared. Low frequency bands are coming alive.'
        };
    } else if (elevation > -18) {
        return {
            condition: 'astronomical_twilight',
            description: 'Astronomical twilight',
            elevation: elevation,
            dLayerActive: false,
            educational: 'Deep twilight - the ionosphere is transitioning to nighttime conditions.'
        };
    } else {
        return {
            condition: 'night',
            description: 'Night',
            elevation: elevation,
            dLayerActive: false,
            educational: 'Full night. The D layer is gone, but the F layer persists at reduced strength.'
        };
    }
}

/**
 * Check if a location is in the "grey line" zone
 * The grey line is the twilight band around Earth where special propagation occurs
 *
 * EDUCATIONAL NOTE:
 * The grey line is famous among amateur radio operators because:
 * 1. The D layer (absorber) has weakened or disappeared
 * 2. The F layer (reflector) is still somewhat ionized
 * 3. This creates a "window" for signals that combines the best of day and night
 * 4. Signals can travel along the grey line with unusually low loss
 *
 * @param {number} latitude
 * @param {number} longitude
 * @param {Date} dateTime
 * @returns {Object} Grey line status and educational explanation
 */
export function checkGreyLine(latitude, longitude, dateTime) {
    const elevation = calculateSolarElevation(latitude, longitude, dateTime);

    // Grey line zone: sun between -6° and +3° elevation
    // This is wider than strict civil twilight to make the effect more discoverable
    const isGreyLine = elevation >= -6 && elevation <= 3;

    // Calculate how "deep" in the grey line we are (0 = edge, 1 = center)
    let greyLineStrength = 0;
    if (isGreyLine) {
        // Center of grey line is around -1.5° elevation
        const centerElevation = -1.5;
        const distanceFromCenter = Math.abs(elevation - centerElevation);
        const maxDistance = 4.5; // Half the width of grey line zone
        greyLineStrength = 1 - (distanceFromCenter / maxDistance);
    }

    return {
        isGreyLine: isGreyLine,
        strength: greyLineStrength,
        elevation: elevation,
        description: isGreyLine
            ? 'In the grey line zone'
            : (elevation > 3 ? 'Daytime' : 'Nighttime'),
        educational: isGreyLine
            ? `You're in the grey line! The D layer is weak but the F layer is still ionized. This twilight zone is famous for enabling long-distance contacts that wouldn't work in full day or night.`
            : null
    };
}

/**
 * Generate the day/night terminator line for map visualization
 * Returns an array of {latitude, longitude} points
 *
 * @param {Date} dateTime
 * @param {number} numPoints - Resolution of the line
 * @returns {Array} Points along the terminator
 */
export function generateTerminatorLine(dateTime, numPoints = 72) {
    const sunPos = calculateSunPosition(dateTime);
    const points = [];

    for (let i = 0; i <= numPoints; i++) {
        const angle = (i / numPoints) * 360;
        const point = calculateTerminatorPoint(sunPos, angle);
        points.push(point);
    }

    return points;
}

/**
 * Calculate a single point on the terminator line
 */
function calculateTerminatorPoint(sunPos, angle) {
    const angleRad = angle * Math.PI / 180;
    const decRad = sunPos.declination * Math.PI / 180;

    // The terminator is the circle where solar elevation = 0
    const latitude = Math.asin(
        Math.cos(angleRad) * Math.cos(decRad)
    ) * 180 / Math.PI;

    let longitude = sunPos.longitude + 90 +
        Math.atan2(
            Math.sin(angleRad),
            -Math.tan(decRad) * Math.cos(angleRad)
        ) * 180 / Math.PI;

    // Normalize longitude to -180..+180
    while (longitude > 180) longitude -= 360;
    while (longitude < -180) longitude += 360;

    return { latitude, longitude };
}

/**
 * Generate grey line zones for map visualization
 * Returns both the sunrise and sunset grey line bands
 *
 * @param {Date} dateTime
 * @returns {Object} { sunrise: points[], sunset: points[] }
 */
export function generateGreyLineZones(dateTime, numPoints = 72) {
    const sunPos = calculateSunPosition(dateTime);

    // We'll generate two bands: one for sunrise side, one for sunset side
    // Each band is bounded by -6° and +3° solar elevation

    const generateBand = (elevationDegrees) => {
        const points = [];
        for (let i = 0; i <= numPoints; i++) {
            const angle = (i / numPoints) * 360;
            const point = calculateSolarElevationContour(sunPos, angle, elevationDegrees);
            if (point) points.push(point);
        }
        return points;
    };

    return {
        innerEdge: generateBand(3),    // Daytime edge
        outerEdge: generateBand(-6),   // Nighttime edge
        center: generateBand(-1.5)     // Grey line center
    };
}

/**
 * Calculate a point where solar elevation equals a specific value
 * Used for generating grey line zone boundaries
 */
function calculateSolarElevationContour(sunPos, angle, targetElevation) {
    const angleRad = angle * Math.PI / 180;
    const decRad = sunPos.declination * Math.PI / 180;
    const elevRad = targetElevation * Math.PI / 180;

    // Solve for latitude where elevation equals target
    // This is an approximation for educational visualization
    const cosHourAngle = Math.cos(angleRad);
    const sinHourAngle = Math.sin(angleRad);

    // Iterative solution (simplified)
    let latitude = Math.asin(
        Math.cos(angleRad + elevRad * Math.PI / 90) * Math.cos(decRad)
    ) * 180 / Math.PI;

    let longitude = sunPos.longitude + 90 +
        Math.atan2(sinHourAngle, -Math.tan(decRad) * cosHourAngle) * 180 / Math.PI;

    // Adjust for elevation offset
    longitude += (targetElevation / 15) * (Math.cos(latitude * Math.PI / 180));

    // Normalize
    while (longitude > 180) longitude -= 360;
    while (longitude < -180) longitude += 360;

    return { latitude, longitude };
}

/**
 * Educational helper: Explain why the sun's position matters for radio
 */
export function explainSolarEffect(elevation) {
    if (elevation > 45) {
        return {
            title: 'High Sun',
            explanation: 'The sun is high in the sky, providing maximum ionization. The D layer is very active, absorbing lower frequencies. Higher bands (15m, 10m) have the best chance of working.',
            recommendation: 'Try the higher frequency bands like 20m, 15m, or 10m.'
        };
    } else if (elevation > 15) {
        return {
            title: 'Moderate Sun',
            explanation: 'Good ionization for F layer reflection. The D layer is active but not at maximum. Most bands can work depending on the path.',
            recommendation: '20m is usually reliable. Check if 40m is too absorbed.'
        };
    } else if (elevation > 0) {
        return {
            title: 'Low Sun',
            explanation: 'The sun is low on the horizon. The D layer is weakening. Lower bands are starting to become more useful.',
            recommendation: '40m is becoming more reliable. 80m might start working soon.'
        };
    } else if (elevation > -6) {
        return {
            title: 'Grey Line',
            explanation: 'The magical grey line! The D layer is fading but the F layer still has ionization. This is prime time for unusual long-distance contacts.',
            recommendation: 'Experiment! Many bands can produce surprising results during the grey line.'
        };
    } else if (elevation > -18) {
        return {
            title: 'Twilight',
            explanation: 'Transitioning to night. The D layer is gone. Lower frequency bands are coming into their own.',
            recommendation: '80m and 40m are excellent. 20m may still work to areas with daylight.'
        };
    } else {
        return {
            title: 'Night',
            explanation: 'Full darkness. No D layer absorption! The F layer is weaker but still present. Lower bands can travel great distances.',
            recommendation: '80m and 40m are at their best. 20m needs daylight somewhere on the path.'
        };
    }
}

/**
 * Check if a signal path crosses the grey line
 * (Useful for explaining enhanced grey line propagation)
 */
export function doesPathCrossGreyLine(
    sourceLat, sourceLon,
    targetLat, targetLon,
    dateTime,
    numSamples = 10
) {
    let greyLinePoints = 0;

    for (let i = 0; i <= numSamples; i++) {
        const fraction = i / numSamples;

        // Linear interpolation (close enough for educational purposes)
        const lat = sourceLat + (targetLat - sourceLat) * fraction;
        const lon = sourceLon + (targetLon - sourceLon) * fraction;

        const greyLine = checkGreyLine(lat, lon, dateTime);
        if (greyLine.isGreyLine) {
            greyLinePoints++;
        }
    }

    const pathPercentInGreyLine = greyLinePoints / (numSamples + 1);

    return {
        crossesGreyLine: greyLinePoints > 0,
        percentInGreyLine: pathPercentInGreyLine,
        educational: pathPercentInGreyLine > 0.3
            ? 'A significant portion of your signal path travels through the grey line zone, which can enhance propagation!'
            : (greyLinePoints > 0
                ? 'Your signal path touches the grey line, which may provide some propagation enhancement.'
                : null)
    };
}
