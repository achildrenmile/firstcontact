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
            maxHops: 2               // Practical limit for this band
        },

        // Guidance for player experimentation
        bestTimeOfDay: 'night',
        typicalRange: 'regional to continental',
        learningHint: 'Try this band after sunset - notice how it suddenly works better!',

        // Visual representation
        color: '#e74c3c',
        icon: '🌙'
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
            maxHops: 3
        },

        bestTimeOfDay: 'anytime',
        typicalRange: 'regional by day, continental by night',
        learningHint: 'Compare daytime vs nighttime range - the difference teaches you about the D layer!',

        color: '#e67e22',
        icon: '🔄'
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
            maxHops: 4
        },

        bestTimeOfDay: 'day',
        typicalRange: 'continental to worldwide',
        learningHint: 'This band shows you how signals can follow the daylight around the Earth.',

        color: '#f39c12',
        icon: '🌍'
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
            maxHops: 4
        },

        bestTimeOfDay: 'midday',
        typicalRange: 'worldwide when open',
        learningHint: 'Compare to 20m - notice how this band needs stronger conditions.',

        color: '#27ae60',
        icon: '⭐'
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
            maxHops: 5
        },

        bestTimeOfDay: 'midday during high solar activity',
        typicalRange: 'worldwide or nothing',
        learningHint: 'This band teaches you that higher frequencies need stronger ionization to reflect.',

        color: '#9b59b6',
        icon: '✨'
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
        if (distanceKm < 2000) {
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
