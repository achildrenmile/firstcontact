/**
 * Ionosphere Model
 *
 * Educational simplification of the ionospheric layers that affect HF radio propagation.
 *
 * The ionosphere has three main layers relevant to HF radio:
 * - D Layer (60-90 km): The "absorber" - absorbs low-frequency signals during day
 * - E Layer (90-120 km): The "short-hop reflector" - enables regional contacts
 * - F Layer (150-400 km): The "long-distance reflector" - enables worldwide contacts
 *
 * EDUCATIONAL NOTE: In reality, the ionosphere is far more complex with F1/F2 sublayers,
 * sporadic E, and gradual transitions. We simplify to three distinct layers with clear
 * behaviors so learners can form mental models before encountering real-world complexity.
 */

/**
 * Layer definitions with educational descriptions
 */
export const LAYER_DEFINITIONS = {
    D: {
        id: 'D',
        name: 'D Layer',
        altitudeRange: { min: 60, max: 90 },
        color: '#ff6b6b',
        role: 'absorber',
        simpleDescription: 'The "signal sponge" - soaks up lower frequency signals during daylight',
        detailedDescription: `The D layer forms when the sun is up and acts like a sponge for radio waves.
            Lower frequencies (like 80m and 40m bands) get absorbed here during the day,
            which is why these bands work better at night when the D layer disappears.`,
        educationalAnalogy: 'Think of it like fog on a road - it blocks your headlights during the day but clears at night.'
    },
    E: {
        id: 'E',
        name: 'E Layer',
        altitudeRange: { min: 90, max: 120 },
        color: '#4ecdc4',
        role: 'reflector',
        simpleDescription: 'The "regional reflector" - bounces signals for medium-distance contacts',
        detailedDescription: `The E layer can reflect radio signals back to Earth, but at a lower altitude
            than the F layer. This means shorter "hops" - typically 500-2000 km per bounce.
            It's most useful during daylight hours.`,
        educationalAnalogy: 'Like bouncing a ball off a low ceiling - it comes back down quickly and nearby.'
    },
    F: {
        id: 'F',
        name: 'F Layer',
        altitudeRange: { min: 150, max: 400 },
        color: '#45b7d1',
        role: 'reflector',
        simpleDescription: 'The "long-distance reflector" - enables contacts around the world',
        detailedDescription: `The F layer is the highest and most important layer for long-distance
            communication. During the day, it splits into F1 and F2 sublayers (we simplify this).
            At night, it combines and rises higher, enabling very long signal hops.`,
        educationalAnalogy: 'Like bouncing a ball off a high gymnasium ceiling - it travels much farther before coming back down.'
    }
};

/**
 * Layer state represents the current condition of an ionospheric layer
 */
export class LayerState {
    constructor(layerId, ionization, absorptionFactor, reflectionQuality) {
        this.layerId = layerId;
        this.ionization = ionization;           // 0-1: how ionized the layer is
        this.absorptionFactor = absorptionFactor; // 0-1: how much it absorbs signals
        this.reflectionQuality = reflectionQuality; // 0-1: how well it reflects signals
    }

    /**
     * Get a human-readable description of this layer's current state
     */
    getStateDescription() {
        const layer = LAYER_DEFINITIONS[this.layerId];

        if (this.ionization < 0.2) {
            return `${layer.name} is mostly absent (nighttime conditions)`;
        } else if (this.ionization < 0.5) {
            return `${layer.name} is partially formed (twilight/weak sun)`;
        } else if (this.ionization < 0.8) {
            return `${layer.name} is moderately active`;
        } else {
            return `${layer.name} is fully developed (strong sunlight)`;
        }
    }
}

/**
 * Ionosphere class manages the complete state of all layers
 */
export class Ionosphere {
    constructor() {
        this.layers = {};
    }

    /**
     * Calculate layer states based on solar elevation angle
     *
     * @param {number} solarElevation - Sun's elevation in degrees (-90 to +90)
     * @param {boolean} isGreyLine - Whether the location is in the grey line zone
     * @returns {Object} Layer states for D, E, and F layers
     *
     * EDUCATIONAL SIMPLIFICATION:
     * - We use solar elevation as the primary driver (real ionosphere has more factors)
     * - Transitions are smoothed to avoid confusing sudden changes
     * - Grey line effects are modeled as a special "enhanced" state
     */
    calculateLayerStates(solarElevation, isGreyLine = false) {
        // Normalize solar elevation to useful ranges
        // Sun below -18° = full night, above +45° = full day
        const dayFactor = this.solarElevationToDayFactor(solarElevation);

        // D Layer: Only present during day, major absorber
        const dLayerState = this.calculateDLayerState(dayFactor, isGreyLine);

        // E Layer: Daytime layer, moderate reflector
        const eLayerState = this.calculateELayerState(dayFactor, isGreyLine);

        // F Layer: Always somewhat present, best reflector
        const fLayerState = this.calculateFLayerState(dayFactor, isGreyLine);

        this.layers = {
            D: dLayerState,
            E: eLayerState,
            F: fLayerState
        };

        return this.layers;
    }

    /**
     * Convert solar elevation to a 0-1 "day factor"
     * Uses smooth transitions for educational clarity
     */
    solarElevationToDayFactor(elevation) {
        if (elevation <= -18) return 0;      // Astronomical night
        if (elevation >= 45) return 1;       // Full day

        // Smooth transition using sine curve for natural feel
        const normalized = (elevation + 18) / 63; // Map -18..45 to 0..1
        return Math.sin(normalized * Math.PI / 2);
    }

    /**
     * D Layer: The absorber
     * - Present only during daylight
     * - Absorbs low frequencies strongly
     * - Disappears quickly after sunset (key learning point!)
     */
    calculateDLayerState(dayFactor, isGreyLine) {
        // D layer forms quickly with sunlight, disappears quickly without
        const ionization = Math.pow(dayFactor, 0.7);

        // Grey line: D layer is transitioning, creating a "window"
        const greyLineReduction = isGreyLine ? 0.4 : 1;

        return new LayerState(
            'D',
            ionization * greyLineReduction,
            ionization * greyLineReduction * 0.9,  // High absorption when present
            0.1  // D layer doesn't reflect usefully
        );
    }

    /**
     * E Layer: The regional reflector
     * - Strongest during day
     * - Can reflect higher frequencies than F layer at times
     * - Enables medium-distance contacts
     */
    calculateELayerState(dayFactor, isGreyLine) {
        const ionization = Math.pow(dayFactor, 0.8);

        // E layer reflection is good during day
        const reflection = ionization * 0.7;

        return new LayerState(
            'E',
            ionization,
            ionization * 0.3,  // Some absorption, less than D
            reflection
        );
    }

    /**
     * F Layer: The long-distance champion
     * - Present day and night (key learning point!)
     * - Higher during night, enabling longer hops
     * - Best for worldwide communication
     */
    calculateFLayerState(dayFactor, isGreyLine) {
        // F layer is always partially present - minimum 30% at night
        const ionization = 0.3 + (dayFactor * 0.7);

        // Grey line: F layer becomes more efficient (famous grey line enhancement)
        const greyLineBoost = isGreyLine ? 1.3 : 1;

        // Reflection quality is excellent
        const reflection = Math.min(1, ionization * 0.95 * greyLineBoost);

        return new LayerState(
            'F',
            ionization,
            0.1,  // Minimal absorption in F layer
            reflection
        );
    }

    /**
     * Get educational explanation for current ionospheric conditions
     */
    getConditionsSummary() {
        const summaries = [];

        if (this.layers.D && this.layers.D.ionization > 0.5) {
            summaries.push('The D layer is active and will absorb lower frequency signals.');
        }

        if (this.layers.F && this.layers.F.reflectionQuality > 0.7) {
            summaries.push('The F layer is providing good reflection for long-distance paths.');
        }

        if (this.layers.F && this.layers.F.reflectionQuality < 0.4) {
            summaries.push('The F layer is weak - long-distance propagation will be limited.');
        }

        return summaries.join(' ');
    }
}

/**
 * Educational helper: Get simple explanation of how layers affect a given frequency
 */
export function explainLayerEffectsForFrequency(frequencyMHz, layerStates) {
    const effects = [];

    // Lower frequencies are more affected by D layer absorption
    if (frequencyMHz < 10 && layerStates.D.ionization > 0.3) {
        effects.push({
            layer: 'D',
            effect: 'absorption',
            severity: layerStates.D.absorptionFactor,
            explanation: `At ${frequencyMHz} MHz, your signal passes through the D layer which absorbs much of its energy during daylight.`
        });
    }

    // Higher frequencies may pass through F layer without reflecting
    if (frequencyMHz > 20 && layerStates.F.ionization < 0.6) {
        effects.push({
            layer: 'F',
            effect: 'penetration',
            severity: 1 - layerStates.F.reflectionQuality,
            explanation: `At ${frequencyMHz} MHz, your signal may pass through the F layer into space if the ionization is too weak to reflect it back.`
        });
    }

    return effects;
}
