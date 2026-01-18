/**
 * HF Bands Model
 *
 * Defines the amateur radio HF bands used in the game with educational
 * descriptions and propagation characteristics.
 *
 * EDUCATIONAL DESIGN NOTES:
 * - Each band has a distinct "personality" to help learners remember its behavior
 * - We use typical/average conditions rather than edge cases
 * - Descriptions avoid jargon and use relatable analogies
 * - The "bestTimeOfDay" hints guide experimentation without being prescriptive
 */

/**
 * Band definitions with educational metadata
 */
export const HF_BANDS = {
    '160m': {
        id: '160m',
        name: '160 Meters',
        frequencyRange: { min: 1.8, max: 2.0 },
        centerFrequency: 1.9,
        wavelengthMeters: 160,

        // Personality helps learners remember band behavior
        personality: 'The Top Band Challenge',
        tagline: 'The ultimate night-time adventure',

        // Educational descriptions at different detail levels
        simpleDescription: 'Only works at night. Completely absorbed during day. A challenging but rewarding band.',
        detailedDescription: `The 160 meter band, known as "Top Band", uses very long radio waves that are
            almost completely absorbed by the D layer during daylight. This band only comes alive
            after dark when the D layer disappears. It requires patience, good antennas, and often
            more power, but making contacts on 160m is especially rewarding.`,

        // Behavioral characteristics (0-1 scale for easy comparison)
        characteristics: {
            dayAbsorption: 0.98,     // Almost completely absorbed during day
            nightAbsorption: 0.3,    // Some absorption even at night
            fLayerReflection: 0.8,   // Reflects well when it gets there
            typicalHopDistance: 500, // km per hop (shorter due to lower angle)
            maxHops: 2,              // Practical limit - signals weaken quickly
            // Skip zone: area between ground wave and first sky wave return
            groundWaveMax: 100,      // km - ground wave effective range
            skipZoneDay: 150,        // km - minimum sky wave distance (day)
            skipZoneNight: 100       // km - minimum sky wave distance (night, lower F layer)
        },

        // Guidance for player experimentation
        bestTimeOfDay: 'night only',
        typicalRange: 'regional to continental at night',
        learningHint: 'This band teaches you just how strong the D layer absorption is - try it during day vs night!',

        // Visual representation
        color: '#8e44ad',
        icon: 'band160m'
    },

    '80m': {
        id: '80m',
        name: '80 Meters',
        frequencyRange: { min: 3.5, max: 4.0 },
        centerFrequency: 3.75,
        wavelengthMeters: 80,

        // Personality helps learners remember band behavior
        personality: 'The Night Owl',
        tagline: 'Comes alive after dark',

        // Educational descriptions at different detail levels
        simpleDescription: 'Best at night, absorbed during day. Great for regional contacts.',
        detailedDescription: `The 80 meter band uses relatively long radio waves that the daytime
            D layer absorbs like a sponge. But when the sun sets and the D layer fades,
            this band springs to life! It's excellent for contacts within your continent,
            and on good nights, can reach much farther.`,

        // Behavioral characteristics (0-1 scale for easy comparison)
        characteristics: {
            dayAbsorption: 0.9,      // Heavily absorbed during day
            nightAbsorption: 0.2,    // Low absorption at night
            fLayerReflection: 0.85,  // Reflects well from F layer when it gets there
            typicalHopDistance: 800, // km per hop (approximate)
            maxHops: 2,              // Practical limit for this band
            groundWaveMax: 80,
            skipZoneDay: 200,
            skipZoneNight: 150
        },

        // Guidance for player experimentation
        bestTimeOfDay: 'night',
        typicalRange: 'regional to continental',
        learningHint: 'Try this band after sunset - notice how it suddenly works better!',

        // Visual representation
        color: '#e74c3c',
        icon: 'band80m'
    },

    '60m': {
        id: '60m',
        name: '60 Meters',
        frequencyRange: { min: 5.25, max: 5.45 },
        centerFrequency: 5.35,
        wavelengthMeters: 60,

        personality: 'The NVIS Specialist',
        tagline: 'Signals that go straight up and come back down',

        simpleDescription: 'Good for regional coverage. Signals bounce nearly straight up, filling in nearby areas.',
        detailedDescription: `The 60 meter band is excellent for NVIS (Near Vertical Incidence Skywave)
            propagation. Signals can travel nearly straight up and reflect back down, providing reliable
            coverage within about 500km. This fills in the "skip zone" that other bands miss.
            It's a shared band with limited frequencies in most countries.`,

        characteristics: {
            dayAbsorption: 0.7,
            nightAbsorption: 0.2,
            fLayerReflection: 0.85,
            typicalHopDistance: 400,
            maxHops: 2,
            groundWaveMax: 60,
            skipZoneDay: 100,        // NVIS band - very short skip zone
            skipZoneNight: 80
        },

        bestTimeOfDay: 'day for NVIS, night for longer distance',
        typicalRange: 'regional (300-600 km)',
        learningHint: 'This band shows how signals can go nearly straight up - great for nearby contacts!',

        color: '#c0392b',
        icon: 'band60m'
    },

    '40m': {
        id: '40m',
        name: '40 Meters',
        frequencyRange: { min: 7.0, max: 7.3 },
        centerFrequency: 7.15,
        wavelengthMeters: 40,

        personality: 'The Reliable Worker',
        tagline: 'Useful day and night',

        simpleDescription: 'Works day AND night. The versatile all-rounder band.',
        detailedDescription: `The 40 meter band is the workhorse of HF radio. During the day,
            it provides solid regional coverage. At night, the reduced D layer absorption
            lets signals travel much farther. Many operators consider this the best band
            for learning because it almost always offers something.`,

        characteristics: {
            dayAbsorption: 0.5,
            nightAbsorption: 0.15,
            fLayerReflection: 0.9,
            typicalHopDistance: 1500,
            maxHops: 3,
            groundWaveMax: 60,
            skipZoneDay: 300,
            skipZoneNight: 200
        },

        bestTimeOfDay: 'anytime',
        typicalRange: 'regional by day, continental by night',
        learningHint: 'Compare daytime vs nighttime range - the difference teaches you about the D layer!',

        color: '#e67e22',
        icon: 'band40m'
    },

    '30m': {
        id: '30m',
        name: '30 Meters',
        frequencyRange: { min: 10.1, max: 10.15 },
        centerFrequency: 10.125,
        wavelengthMeters: 30,

        personality: 'The Quiet Achiever',
        tagline: 'A narrow band with big potential',

        simpleDescription: 'A narrow WARC band. Good compromise between day and night performance.',
        detailedDescription: `The 30 meter band is one of the WARC bands - a narrow allocation
            between 40m and 20m. It combines characteristics of both: less D-layer absorption
            than 40m during the day, and a lower frequency than 20m, so it can still reflect
            when the MUF drops at night and 20m closes. Popular for digital modes and CW.`,

        characteristics: {
            dayAbsorption: 0.35,
            nightAbsorption: 0.12,
            fLayerReflection: 0.9,
            typicalHopDistance: 2000,
            maxHops: 3,
            groundWaveMax: 50,
            skipZoneDay: 500,
            skipZoneNight: 350
        },

        bestTimeOfDay: 'anytime - good day and night',
        typicalRange: 'continental to intercontinental',
        learningHint: 'Notice how this band works when 40m is too absorbed and 20m needs more ionization.',

        color: '#d35400',
        icon: 'band30m'
    },

    '20m': {
        id: '20m',
        name: '20 Meters',
        frequencyRange: { min: 14.0, max: 14.35 },
        centerFrequency: 14.175,
        wavelengthMeters: 20,

        personality: 'The World Traveler',
        tagline: 'Your passport to worldwide contacts',

        simpleDescription: 'The classic long-distance band. Works when the sun is up somewhere along the path.',
        detailedDescription: `The 20 meter band is legendary for long-distance communication.
            It needs good F layer ionization to work, which means daylight somewhere on your
            signal path. When conditions align, you can talk around the world! It's less
            affected by D layer absorption than lower bands.`,

        characteristics: {
            dayAbsorption: 0.2,
            nightAbsorption: 0.1,
            fLayerReflection: 0.95,
            typicalHopDistance: 2500,
            maxHops: 4,
            groundWaveMax: 40,
            skipZoneDay: 800,
            skipZoneNight: 500
        },

        bestTimeOfDay: 'day',
        typicalRange: 'continental to worldwide',
        learningHint: 'This band shows you how signals can follow the daylight around the Earth.',

        color: '#f39c12',
        icon: 'band20m'
    },

    '17m': {
        id: '17m',
        name: '17 Meters',
        frequencyRange: { min: 18.068, max: 18.168 },
        centerFrequency: 18.118,
        wavelengthMeters: 17,

        personality: 'The Hidden Gem',
        tagline: 'Often open when others are closed',

        simpleDescription: 'A WARC band between 20m and 15m. Opens after 20m when ionization increases.',
        detailedDescription: `The 17 meter band sits between 20m and 15m in frequency. It requires
            more ionization than 20m to open, so it typically opens later in the morning and
            closes earlier in the evening. It's a WARC band with no contests, making it quieter.
            When 20m is well open but 15m needs more ionization, 17m often provides the bridge.`,

        characteristics: {
            dayAbsorption: 0.15,
            nightAbsorption: 0.08,
            fLayerReflection: 0.88,
            typicalHopDistance: 2800,
            maxHops: 4,
            groundWaveMax: 35,
            skipZoneDay: 1000,
            skipZoneNight: 700
        },

        bestTimeOfDay: 'day, when ionization is strong',
        typicalRange: 'continental to worldwide',
        learningHint: 'When 20m is wide open, check 17m - it may also be open with less crowding!',

        color: '#16a085',
        icon: 'band17m'
    },

    '15m': {
        id: '15m',
        name: '15 Meters',
        frequencyRange: { min: 21.0, max: 21.45 },
        centerFrequency: 21.225,
        wavelengthMeters: 15,

        personality: 'The Fair Weather Friend',
        tagline: 'Amazing when conditions are right',

        simpleDescription: 'Needs stronger ionization. Excellent in good conditions, quiet otherwise.',
        detailedDescription: `The 15 meter band needs a well-ionized F layer to work. During
            solar maximum years, it can be spectacular. In quieter times, it may only open
            for a few hours around midday. When it works, it offers excellent long-distance
            paths with relatively low noise.`,

        characteristics: {
            dayAbsorption: 0.1,
            nightAbsorption: 0.05,
            fLayerReflection: 0.8, // Needs good ionization
            typicalHopDistance: 3000,
            maxHops: 4,
            groundWaveMax: 30,
            skipZoneDay: 1200,
            skipZoneNight: 900
        },

        bestTimeOfDay: 'midday',
        typicalRange: 'worldwide when open',
        learningHint: 'Compare to 20m - notice how this band needs stronger conditions.',

        color: '#27ae60',
        icon: 'band15m'
    },

    '12m': {
        id: '12m',
        name: '12 Meters',
        frequencyRange: { min: 24.89, max: 24.99 },
        centerFrequency: 24.94,
        wavelengthMeters: 12,

        personality: 'The Reliable Cousin',
        tagline: 'Like 10m, but more forgiving',

        simpleDescription: 'A WARC band that often works when 10m is marginal. Slightly easier conditions needed.',
        detailedDescription: `The 12 meter band is the highest WARC band, sitting just below 10m.
            It needs slightly less ionization than 10m, so it often opens earlier and stays
            open longer. When 10m is marginal, check 12m - it might be wide open!
            Like all WARC bands, it's contest-free and often less crowded.`,

        characteristics: {
            dayAbsorption: 0.08,
            nightAbsorption: 0.03,
            fLayerReflection: 0.7,
            typicalHopDistance: 3200,
            maxHops: 4,
            groundWaveMax: 25,
            skipZoneDay: 1500,
            skipZoneNight: 1100
        },

        bestTimeOfDay: 'midday, needs good ionization',
        typicalRange: 'worldwide when open',
        learningHint: 'When 10m seems dead, try 12m - it needs slightly less ionization.',

        color: '#8e44ad',
        icon: 'band12m'
    },

    '10m': {
        id: '10m',
        name: '10 Meters',
        frequencyRange: { min: 28.0, max: 29.7 },
        centerFrequency: 28.85,
        wavelengthMeters: 10,

        personality: 'The Spectacular Performer',
        tagline: 'When it opens, magic happens',

        simpleDescription: 'Needs strong ionization. Either wide open or completely dead.',
        detailedDescription: `The 10 meter band is at the edge of what the ionosphere can reflect.
            It needs excellent conditions - typically around solar maximum - to work for
            long distances. But when it opens, signals can travel worldwide with surprisingly
            little power. It teaches you that the ionosphere has limits.`,

        characteristics: {
            dayAbsorption: 0.05,
            nightAbsorption: 0.02,
            fLayerReflection: 0.6, // Often passes through
            typicalHopDistance: 3500,
            maxHops: 5,
            groundWaveMax: 20,
            skipZoneDay: 1800,
            skipZoneNight: 1400
        },

        bestTimeOfDay: 'midday during high solar activity',
        typicalRange: 'worldwide or nothing',
        learningHint: 'This band teaches you that higher frequencies need stronger ionization to reflect.',

        color: '#9b59b6',
        icon: 'band10m'
    },

    '6m': {
        id: '6m',
        name: '6 Meters',
        frequencyRange: { min: 50.0, max: 54.0 },
        centerFrequency: 50.15,
        wavelengthMeters: 6,

        personality: 'The Magic Band',
        tagline: 'Unpredictable, exciting, magical',

        simpleDescription: 'The "Magic Band"! Normally quiet, but can suddenly open via Sporadic E or during solar maximum.',
        detailedDescription: `The 6 meter band is called the "Magic Band" because of its unpredictable
            and exciting propagation. Most of the time, it's limited to local contacts. But when
            Sporadic E occurs (especially in summer), it can suddenly open to stations 500-2300 km
            away. During solar maximum, even F2 layer propagation becomes possible for worldwide contacts.
            It's the transition point between HF and VHF.`,

        characteristics: {
            dayAbsorption: 0.02,
            nightAbsorption: 0.01,
            fLayerReflection: 0.3,  // Usually passes through - needs Es or high solar activity
            typicalHopDistance: 1500,  // Via Sporadic E
            maxHops: 2,
            groundWaveMax: 50,       // VHF-ish, better ground wave
            skipZoneDay: 500,        // Via Sporadic E
            skipZoneNight: 500
        },

        bestTimeOfDay: 'summer afternoons for Sporadic E, solar maximum for F2',
        typicalRange: 'local normally, 500-2300 km via Sporadic E, worldwide during solar max',
        learningHint: 'Enable Sporadic E and watch this band come alive! This is THE band for Es propagation.',

        color: '#e91e63',
        icon: 'band6m'
    }
};

/**
 * Get band by ID
 */
export function getBand(bandId) {
    return HF_BANDS[bandId] || null;
}

/**
 * Get all bands as array (sorted by frequency)
 */
export function getAllBands() {
    return Object.values(HF_BANDS).sort(
        (a, b) => a.centerFrequency - b.centerFrequency
    );
}

/**
 * Educational: Compare two bands and explain the differences
 */
export function compareBands(bandId1, bandId2) {
    const band1 = HF_BANDS[bandId1];
    const band2 = HF_BANDS[bandId2];

    if (!band1 || !band2) return null;

    const comparison = {
        bands: [band1.name, band2.name],
        differences: []
    };

    // Compare day absorption
    if (Math.abs(band1.characteristics.dayAbsorption - band2.characteristics.dayAbsorption) > 0.2) {
        const moreAbsorbed = band1.characteristics.dayAbsorption > band2.characteristics.dayAbsorption ? band1 : band2;
        const lessAbsorbed = moreAbsorbed === band1 ? band2 : band1;
        comparison.differences.push(
            `${moreAbsorbed.name} is absorbed more during the day than ${lessAbsorbed.name}`
        );
    }

    // Compare typical range
    if (band1.characteristics.typicalHopDistance !== band2.characteristics.typicalHopDistance) {
        const longerHop = band1.characteristics.typicalHopDistance > band2.characteristics.typicalHopDistance ? band1 : band2;
        const shorterHop = longerHop === band1 ? band2 : band1;
        comparison.differences.push(
            `${longerHop.name} typically travels farther per hop than ${shorterHop.name}`
        );
    }

    return comparison;
}

/**
 * Educational: Get band recommendation based on time and desired distance
 */
export function suggestBand(isDay, distanceKm) {
    const suggestions = [];

    if (isDay) {
        if (distanceKm < 1000) {
            suggestions.push({
                bandId: '40m',
                reason: 'For daytime regional contacts, 40m is reliable'
            });
        } else if (distanceKm < 5000) {
            suggestions.push({
                bandId: '20m',
                reason: '20m excels at continental distances during daylight'
            });
        } else {
            suggestions.push({
                bandId: '20m',
                reason: '20m is the go-to band for daytime long-distance'
            });
            suggestions.push({
                bandId: '15m',
                reason: '15m might work if ionization is strong enough'
            });
        }
    } else {
        if (distanceKm < 1000) {
            suggestions.push({
                bandId: '160m',
                reason: '160m (Top Band) works at night for regional contacts - challenging but rewarding!'
            });
            suggestions.push({
                bandId: '80m',
                reason: '80m comes alive at night for regional contacts'
            });
        } else if (distanceKm < 2000) {
            suggestions.push({
                bandId: '80m',
                reason: '80m comes alive at night for regional contacts'
            });
            suggestions.push({
                bandId: '40m',
                reason: '40m is excellent at night for medium distances'
            });
        } else {
            suggestions.push({
                bandId: '40m',
                reason: '40m reaches far at night with the D layer gone'
            });
            suggestions.push({
                bandId: '20m',
                reason: '20m may still work if there\'s daylight along the path'
            });
        }
    }

    return suggestions;
}

/**
 * Calculate the Maximum Usable Frequency (MUF) approximation
 * Used internally - NOT exposed to players as a number
 *
 * EDUCATIONAL NOTE: We don't show MUF values to players because:
 * 1. Numbers without context don't build intuition
 * 2. Players learn better by experimenting with bands directly
 * 3. The concept of "will this band work?" is more useful than a frequency number
 */
export function calculateApproximateMUF(fLayerIonization, distance) {
    // Simplified MUF model for educational purposes
    // Real MUF depends on many more factors

    const baseMUF = 5; // MHz - absolute minimum
    const maxMUF = 35; // MHz - maximum under ideal conditions

    // MUF increases with ionization and path geometry
    const ionizationContribution = fLayerIonization * 25;

    // Longer paths can support higher frequencies (oblique incidence)
    const distanceFactor = Math.min(1.5, 1 + (distance / 10000));

    return Math.min(maxMUF, (baseMUF + ionizationContribution) * distanceFactor);
}

/**
 * Check if a band can propagate given ionospheric conditions
 * Returns a qualitative assessment, not just true/false
 */
export function assessBandViability(bandId, layerStates, distanceKm) {
    const band = HF_BANDS[bandId];
    if (!band) return null;

    const freq = band.centerFrequency;
    const approxMUF = calculateApproximateMUF(layerStates.F.ionization, distanceKm);

    // Check if frequency is below MUF (can reflect)
    const canReflect = freq < approxMUF;

    // Check D layer absorption for this frequency
    const absorptionLoss = layerStates.D.absorptionFactor * band.characteristics.dayAbsorption;

    // Calculate overall viability
    let viability = 'impossible';
    let explanation = '';

    if (!canReflect) {
        viability = 'impossible';
        explanation = `The ionosphere isn't strong enough to reflect ${band.name} signals - they pass into space.`;
    } else if (absorptionLoss > 0.7) {
        viability = 'poor';
        explanation = `${band.name} signals are being heavily absorbed by the D layer during daylight.`;
    } else if (absorptionLoss > 0.4) {
        viability = 'marginal';
        explanation = `${band.name} will work but signals are somewhat weakened by D layer absorption.`;
    } else {
        viability = 'good';
        explanation = `${band.name} should propagate well under current conditions.`;
    }

    return {
        viability,
        canReflect,
        absorptionLoss,
        explanation
    };
}
