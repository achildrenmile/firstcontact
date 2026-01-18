/**
 * Solar Activity Model
 *
 * Models solar activity effects on HF radio propagation including:
 * - Solar Flux Index (SFI) levels affecting ionospheric ionization
 * - Mögel-Dellinger Effect (Sudden Ionospheric Disturbance / SID)
 *
 * EDUCATIONAL DESIGN NOTES:
 * - Solar activity is simplified to 4 levels for easy understanding
 * - Mögel-Dellinger is modeled as a dramatic "radio blackout" event
 * - Real-world complexity (K-index, A-index, etc.) is abstracted
 * - Focus is on cause-effect relationships learners can observe
 */

/**
 * Solar Activity Levels
 *
 * Each level represents typical conditions that affect propagation differently.
 * Levels are based on Solar Flux Index (SFI) ranges but simplified for education.
 */
export const SOLAR_ACTIVITY_LEVELS = {
    quiet: {
        id: 'quiet',
        name: 'Quiet Sun',
        sfiRange: { min: 65, max: 80 },

        // How this affects the ionosphere
        effects: {
            fLayerBoost: 0.7,      // F layer is weaker
            mufMultiplier: 0.8,     // Lower Maximum Usable Frequency
            absorptionFactor: 0.9   // Slightly less D-layer absorption
        },

        // Educational content
        personality: 'The Sleepy Sun',
        simpleDescription: 'Low solar activity. Lower bands work better, higher bands may be closed.',
        detailedDescription: `During quiet solar conditions, the sun produces less ultraviolet radiation,
            which means the ionosphere is less ionized. The F layer is weaker, so higher frequencies
            (15m, 10m) often can't be reflected back to Earth - they pass through into space.
            However, lower bands (40m, 80m) work well, especially at night.`,
        learningHint: 'Notice how 10m and 15m are often "dead" during quiet sun conditions.',

        // Visual representation
        color: '#3498db',
        icon: '☀️'
    },

    normal: {
        id: 'normal',
        name: 'Normal',
        sfiRange: { min: 80, max: 120 },

        effects: {
            fLayerBoost: 1.0,
            mufMultiplier: 1.0,
            absorptionFactor: 1.0
        },

        personality: 'The Balanced Sun',
        simpleDescription: 'Average solar activity. Good conditions for most bands.',
        detailedDescription: `Normal solar activity provides a well-ionized F layer that can
            reflect signals on most HF bands. This is the "baseline" condition where the
            propagation patterns you learn apply most predictably. 20m typically works well
            during daylight, and lower bands perform at night.`,
        learningHint: 'This is the best condition for learning - propagation is predictable.',

        color: '#27ae60',
        icon: '🌤️'
    },

    active: {
        id: 'active',
        name: 'Active Sun',
        sfiRange: { min: 120, max: 180 },

        effects: {
            fLayerBoost: 1.3,
            mufMultiplier: 1.2,
            absorptionFactor: 1.1
        },

        personality: 'The Energetic Sun',
        simpleDescription: 'High solar activity. Higher bands come alive! But watch for disturbances.',
        detailedDescription: `Active solar conditions mean strong ionization of the F layer.
            This is great news for higher bands like 15m and 10m - they can now reflect
            signals that would normally pass into space. You might make contacts that
            seem impossible during quiet conditions. However, active sun also means
            more chance of solar flares causing sudden blackouts.`,
        learningHint: 'Try 10m and 15m now - they might be wide open for worldwide contacts!',

        color: '#e67e22',
        icon: '🔆'
    },

    storm: {
        id: 'storm',
        name: 'Geomagnetic Storm',
        sfiRange: { min: 150, max: 250 },

        effects: {
            fLayerBoost: 0.5,       // Storm disrupts the F layer
            mufMultiplier: 0.6,
            absorptionFactor: 1.5   // Increased absorption
        },

        personality: 'The Angry Sun',
        simpleDescription: 'Disturbed conditions. Propagation is unreliable or blocked.',
        detailedDescription: `Geomagnetic storms occur when solar material hits Earth's magnetic field.
            This disrupts the ionosphere, making it unstable and unpredictable. The F layer
            becomes turbulent, causing signal flutter and fading. Polar paths are especially
            affected. Sometimes propagation is completely blocked for hours or days.
            Patience is key - conditions will recover.`,
        learningHint: 'During storms, propagation can be completely unpredictable. Try again later!',

        color: '#c0392b',
        icon: '🌩️'
    }
};

/**
 * Mögel-Dellinger Effect (Sudden Ionospheric Disturbance)
 *
 * Named after German physicists Hans Mögel and Josef Dellinger who independently
 * discovered this phenomenon in the 1930s.
 *
 * Occurs when a solar flare sends X-rays to Earth, causing sudden intense ionization
 * of the D layer, which then absorbs ALL HF signals on the sunlit side of Earth.
 */
export const MOGEL_DELLINGER_EVENT = {
    id: 'mogelDellinger',
    name: 'Mögel-Dellinger Effect',
    alternateNames: ['Sudden Ionospheric Disturbance', 'SID', 'Radio Blackout', 'Short Wave Fadeout'],

    // Event characteristics
    typicalDuration: { min: 15, max: 120 },  // minutes

    // Effect severity levels based on X-ray flare class
    severityLevels: {
        minor: {
            id: 'minor',
            flareClass: 'M',
            absorptionMultiplier: 3,
            affectedBands: ['160m', '80m', '60m', '40m'],
            description: 'Minor disturbance - lower bands affected'
        },
        moderate: {
            id: 'moderate',
            flareClass: 'M5+',
            absorptionMultiplier: 5,
            affectedBands: ['160m', '80m', '60m', '40m', '30m', '20m'],
            description: 'Moderate blackout - most bands affected on day side'
        },
        severe: {
            id: 'severe',
            flareClass: 'X',
            absorptionMultiplier: 10,
            affectedBands: ['160m', '80m', '60m', '40m', '30m', '20m', '17m', '15m', '12m', '10m', '6m'],
            description: 'Complete HF blackout on the sunlit side of Earth'
        }
    },

    // Educational content
    personality: 'The Solar Surprise',
    simpleDescription: 'A solar flare causes sudden radio blackout on the day side of Earth.',
    detailedDescription: `The Mögel-Dellinger effect is one of the most dramatic events in radio propagation.
        When a solar flare erupts, it sends a burst of X-rays that reach Earth in just 8 minutes.
        These X-rays super-ionize the D layer, turning it into a complete radio absorber.

        Key points for operators:
        • Only affects the sunlit side of Earth (day side)
        • Night side paths remain unaffected
        • Lower frequencies (80m, 40m) are hit hardest
        • Recovery takes 15 minutes to 2 hours
        • Named after German scientists Mögel and Dellinger (1930s)`,

    learningHint: 'If HF suddenly goes dead during the day but works at night - it might be a Mögel-Dellinger event!',

    // How to recognize it
    symptoms: [
        'Sudden complete fadeout of signals',
        'Affects only the day side of the path',
        'Lower frequencies affected more',
        'Gradual recovery over 15-120 minutes',
        'Night side paths still work'
    ],

    // Visual representation
    color: '#e74c3c',
    icon: '⚡'
};

/**
 * Aurora Effect on HF Propagation
 *
 * Aurora (Northern/Southern Lights) occurs when charged particles from the sun
 * interact with Earth's magnetic field at high latitudes. This creates spectacular
 * light displays but also disrupts HF radio propagation on polar paths.
 *
 * EDUCATIONAL DESIGN NOTES:
 * - Aurora primarily affects paths crossing high latitudes (> ~55°)
 * - Causes characteristic "aurora flutter" - raspy, distorted signals
 * - Can completely block polar paths during intense events
 * - Sometimes enables unusual VHF "aurora scatter" (not modeled here)
 */
export const AURORA_EVENT = {
    id: 'aurora',
    name: 'Aurora',
    alternateNames: ['Northern Lights', 'Southern Lights', 'Aurora Borealis', 'Aurora Australis', 'Polar Aurora'],

    // Geographic thresholds
    auroralZone: {
        normalLatitude: 65,      // Auroral oval typically at 65-70°
        activeLatitude: 55,      // Expands during active conditions
        stormLatitude: 45        // Can reach mid-latitudes during severe storms
    },

    // Effect severity levels based on Kp index
    severityLevels: {
        minor: {
            id: 'minor',
            kpIndex: '4-5',
            affectedLatitude: 60,
            signalDegradation: 0.3,
            flutterIntensity: 'light',
            description: 'Minor aurora - some polar path disturbance'
        },
        moderate: {
            id: 'moderate',
            kpIndex: '6-7',
            affectedLatitude: 55,
            signalDegradation: 0.6,
            flutterIntensity: 'moderate',
            description: 'Moderate aurora - polar paths significantly affected'
        },
        severe: {
            id: 'severe',
            kpIndex: '8-9',
            affectedLatitude: 45,
            signalDegradation: 0.9,
            flutterIntensity: 'severe',
            description: 'Major geomagnetic storm - aurora visible at mid-latitudes, polar paths blocked'
        }
    },

    // Educational content
    personality: 'The Polar Light Show',
    simpleDescription: 'Aurora disrupts radio signals crossing polar regions with characteristic flutter and absorption.',
    detailedDescription: `Aurora occurs when solar wind particles enter Earth's magnetic field at the poles.
        These charged particles collide with atmospheric gases, creating the beautiful light displays
        known as Northern Lights (Aurora Borealis) and Southern Lights (Aurora Australis).

        For HF radio operators, aurora means trouble on polar paths:
        • Signals become raspy and distorted ("aurora flutter")
        • Polar paths may be completely blocked
        • The auroral zone expands during geomagnetic storms
        • Non-polar paths remain unaffected
        • Higher frequency bands are affected more than lower bands`,

    learningHint: 'If your signal to northern Europe or across the North Pole sounds raspy or disappears - check for aurora activity!',

    // How to recognize it
    symptoms: [
        'Raspy, buzzing signal quality (aurora flutter)',
        'Signals fade and return rapidly',
        'Only affects polar or high-latitude paths',
        'Non-polar paths work normally',
        'Often accompanied by geomagnetic storm warnings'
    ],

    // Visual representation
    color: '#2ecc71',
    icon: '🌌'
};

/**
 * Sporadic E (Es) Propagation
 *
 * Sporadic E is a mysterious and exciting phenomenon where dense patches of
 * ionization form in the E layer, enabling unusual propagation on higher HF
 * bands (especially 10m, 15m) and even VHF.
 *
 * EDUCATIONAL DESIGN NOTES:
 * - Most common in summer months (May-August in Northern Hemisphere)
 * - Enables single-hop distances of 500-2300 km
 * - Unpredictable but creates exciting openings
 * - E layer is lower (100-120 km) than F layer (250-400 km)
 * - Higher frequencies benefit most (10m, 15m, even 6m/2m)
 */
export const SPORADIC_E_EVENT = {
    id: 'sporadicE',
    name: 'Sporadic E',
    alternateNames: ['Es', 'E-Skip', 'Short Skip'],

    // Geographic and temporal characteristics
    characteristics: {
        typicalDistance: { min: 500, max: 2300 },  // km per hop
        reflectionAltitude: 110,  // km (E layer)
        peakMonths: [5, 6, 7, 8],  // May-August
        peakHours: [10, 18]  // 10:00-18:00 local time
    },

    // Effect on different bands
    bandEffects: {
        '6m': { boost: 1.0, description: 'THE Magic Band for Es!' },
        '10m': { boost: 0.9, description: 'Excellent Es conditions' },
        '12m': { boost: 0.85, description: 'Very good Es conditions' },
        '15m': { boost: 0.7, description: 'Good Es conditions' },
        '17m': { boost: 0.5, description: 'Moderate Es conditions' },
        '20m': { boost: 0.3, description: 'Occasional Es boost' },
        '30m': { boost: 0.15, description: 'Rare Es effect' },
        '40m': { boost: 0.1, description: 'Very rare Es effect' },
        '60m': { boost: 0, description: 'No Es effect' },
        '80m': { boost: 0, description: 'No Es effect' },
        '160m': { boost: 0, description: 'No Es effect' }
    },

    // Intensity levels
    intensityLevels: {
        weak: {
            id: 'weak',
            mufBoost: 1.2,
            maxDistance: 1200,
            affectedBands: ['6m', '10m'],
            description: 'Weak Es - 6m/10m openings'
        },
        moderate: {
            id: 'moderate',
            mufBoost: 1.5,
            maxDistance: 1800,
            affectedBands: ['6m', '10m', '12m', '15m'],
            description: 'Moderate Es - good openings on 6m through 15m'
        },
        strong: {
            id: 'strong',
            mufBoost: 2.0,
            maxDistance: 2300,
            affectedBands: ['6m', '10m', '12m', '15m', '17m', '20m'],
            description: 'Strong Es - widespread openings down to 20m'
        }
    },

    // Educational content
    personality: 'The Summer Surprise',
    simpleDescription: 'Dense ionization patches in the E layer create surprise openings on higher bands, especially in summer.',
    detailedDescription: `Sporadic E is one of the most exciting phenomena in amateur radio!
        Dense patches of ionization form in the E layer (about 110 km altitude),
        creating a reflective surface for higher frequencies that normally pass right through.

        Key characteristics:
        • Most common May-August (Northern Hemisphere)
        • Enables single-hop distances of 500-2300 km
        • Favors higher bands: 10m, 15m, sometimes even 6m/2m
        • Openings can last minutes to hours
        • Often appears suddenly and unexpectedly
        • E layer is lower than F layer, so skip distances are shorter`,

    learningHint: 'If 10m suddenly opens to stations 1000-2000 km away in summer - you might be experiencing Sporadic E!',

    // How to recognize it
    symptoms: [
        'Sudden strong signals on 10m or 15m',
        'Stations at medium distances (500-2000 km)',
        'Signals may appear and disappear quickly',
        'Most common in summer afternoons',
        'Higher bands open that are normally dead'
    ],

    // Visual representation
    color: '#9b59b6',
    icon: '✨'
};

/**
 * Current solar conditions state
 */
export class SolarConditions {
    constructor() {
        this.activityLevel = 'normal';
        this.mogelDellingerActive = false;
        this.mogelDellingerSeverity = null;
        this.mogelDellingerStartTime = null;
        this.auroraActive = false;
        this.auroraSeverity = null;
        this.sporadicEActive = false;
        this.sporadicEIntensity = null;
    }

    /**
     * Set solar activity level
     */
    setActivityLevel(level) {
        if (SOLAR_ACTIVITY_LEVELS[level]) {
            this.activityLevel = level;
        }
    }

    /**
     * Get current solar activity configuration
     */
    getActivityConfig() {
        return SOLAR_ACTIVITY_LEVELS[this.activityLevel];
    }

    /**
     * Trigger a Mögel-Dellinger event
     */
    triggerMogelDellinger(severity = 'moderate') {
        this.mogelDellingerActive = true;
        this.mogelDellingerSeverity = severity;
        this.mogelDellingerStartTime = new Date();
    }

    /**
     * Clear Mögel-Dellinger event
     */
    clearMogelDellinger() {
        this.mogelDellingerActive = false;
        this.mogelDellingerSeverity = null;
        this.mogelDellingerStartTime = null;
    }

    /**
     * Check if Mögel-Dellinger affects a given path
     * Only affects the sunlit (day) portion of the path
     */
    getMogelDellingerEffect(pathDayPercent) {
        if (!this.mogelDellingerActive) {
            return { affected: false, absorptionMultiplier: 1 };
        }

        const severityConfig = MOGEL_DELLINGER_EVENT.severityLevels[this.mogelDellingerSeverity];

        // Effect scales with how much of the path is in daylight
        const effectStrength = pathDayPercent;

        return {
            affected: effectStrength > 0.1,
            absorptionMultiplier: 1 + (severityConfig.absorptionMultiplier - 1) * effectStrength,
            severity: this.mogelDellingerSeverity,
            affectedBands: severityConfig.affectedBands
        };
    }

    /**
     * Trigger an Aurora event
     */
    triggerAurora(severity = 'moderate') {
        this.auroraActive = true;
        this.auroraSeverity = severity;
    }

    /**
     * Clear Aurora event
     */
    clearAurora() {
        this.auroraActive = false;
        this.auroraSeverity = null;
    }

    /**
     * Check if Aurora affects a given path based on latitude
     * Aurora primarily affects high-latitude (polar) paths
     * @param {number} maxPathLatitude - Maximum absolute latitude along the path
     * @param {number} percentInPolarZone - Percentage of path in polar region
     */
    getAuroraEffect(maxPathLatitude, percentInPolarZone) {
        if (!this.auroraActive) {
            return { affected: false, degradation: 0, flutterIntensity: null };
        }

        const severityConfig = AURORA_EVENT.severityLevels[this.auroraSeverity];
        const affectedLatitude = severityConfig.affectedLatitude;

        // Check if path crosses into the affected zone
        if (maxPathLatitude < affectedLatitude) {
            return { affected: false, degradation: 0, flutterIntensity: null };
        }

        // Calculate effect strength based on how deep into auroral zone
        const latitudeExcess = maxPathLatitude - affectedLatitude;
        const latitudeScale = Math.min(1, latitudeExcess / 20); // Full effect at 20° above threshold

        // Effect also depends on how much of the path is in polar regions
        const polarScale = Math.min(1, percentInPolarZone * 2); // Full effect if 50%+ in polar zone

        const effectStrength = Math.max(latitudeScale, polarScale);

        return {
            affected: true,
            degradation: severityConfig.signalDegradation * effectStrength,
            flutterIntensity: severityConfig.flutterIntensity,
            severity: this.auroraSeverity,
            affectedLatitude
        };
    }

    /**
     * Trigger a Sporadic E event
     */
    triggerSporadicE(intensity = 'moderate') {
        this.sporadicEActive = true;
        this.sporadicEIntensity = intensity;
    }

    /**
     * Clear Sporadic E event
     */
    clearSporadicE() {
        this.sporadicEActive = false;
        this.sporadicEIntensity = null;
    }

    /**
     * Check if Sporadic E affects a given band and distance
     * Sporadic E favors higher frequencies and medium distances (500-2300 km)
     * @param {string} bandId - The band being evaluated
     * @param {number} distance - Distance in km
     */
    getSporadicEEffect(bandId, distance) {
        if (!this.sporadicEActive) {
            return { affected: false, boost: 0 };
        }

        const intensityConfig = SPORADIC_E_EVENT.intensityLevels[this.sporadicEIntensity];
        const bandEffect = SPORADIC_E_EVENT.bandEffects[bandId];

        // Check if this band is affected
        if (!bandEffect || bandEffect.boost === 0) {
            return { affected: false, boost: 0 };
        }

        // Check if this band is in the affected list for this intensity
        if (!intensityConfig.affectedBands.includes(bandId)) {
            return { affected: false, boost: 0 };
        }

        // Sporadic E works best at medium distances (500-2300 km)
        const minDist = SPORADIC_E_EVENT.characteristics.typicalDistance.min;
        const maxDist = intensityConfig.maxDistance;

        let distanceScale = 1.0;
        if (distance < minDist) {
            // Too close - Es skip zone
            distanceScale = distance / minDist;
        } else if (distance > maxDist) {
            // Too far for single-hop Es
            distanceScale = Math.max(0, 1 - (distance - maxDist) / 1000);
        }

        const effectiveBoost = bandEffect.boost * distanceScale;

        return {
            affected: effectiveBoost > 0.1,
            boost: effectiveBoost,
            intensity: this.sporadicEIntensity,
            maxDistance: maxDist,
            optimalRange: `${minDist}-${maxDist} km`
        };
    }

    /**
     * Get effects for ionosphere calculations
     */
    getIonosphereEffects() {
        const config = this.getActivityConfig();
        return {
            fLayerBoost: config.effects.fLayerBoost,
            mufMultiplier: config.effects.mufMultiplier,
            absorptionFactor: config.effects.absorptionFactor
        };
    }
}

/**
 * Get all solar activity levels as array
 */
export function getAllActivityLevels() {
    return Object.values(SOLAR_ACTIVITY_LEVELS);
}

/**
 * Get solar activity level by ID
 */
export function getActivityLevel(levelId) {
    return SOLAR_ACTIVITY_LEVELS[levelId] || SOLAR_ACTIVITY_LEVELS.normal;
}

/**
 * Educational: Explain how solar activity affects a specific band
 */
export function explainSolarEffectOnBand(activityLevel, bandId) {
    const activity = SOLAR_ACTIVITY_LEVELS[activityLevel];
    const freq = {
        '160m': 1.9, '80m': 3.75, '60m': 5.35, '40m': 7.15, '30m': 10.125,
        '20m': 14.175, '17m': 18.118, '15m': 21.225, '12m': 24.94, '10m': 28.85, '6m': 50.15
    }[bandId] || 14;

    const isHighBand = freq > 15;
    const isLowBand = freq < 8;

    if (activityLevel === 'quiet') {
        if (isHighBand) {
            return {
                effect: 'negative',
                explanation: `${bandId} needs strong ionization to work. Quiet sun conditions mean the F layer may be too weak to reflect these higher frequencies.`
            };
        } else {
            return {
                effect: 'neutral',
                explanation: `${bandId} works well even with quiet sun conditions, especially at night when D layer absorption is minimal.`
            };
        }
    } else if (activityLevel === 'active') {
        if (isHighBand) {
            return {
                effect: 'positive',
                explanation: `${bandId} thrives during active sun! The strongly ionized F layer can now reflect these higher frequencies for worldwide contacts.`
            };
        } else if (isLowBand) {
            return {
                effect: 'mixed',
                explanation: `${bandId} may experience more D layer absorption during the day with active sun, but night conditions remain excellent.`
            };
        }
    } else if (activityLevel === 'storm') {
        return {
            effect: 'negative',
            explanation: `During geomagnetic storms, all bands can be affected by irregular ionospheric behavior. ${bandId} may experience fading, flutter, or complete blackouts.`
        };
    }

    return {
        effect: 'neutral',
        explanation: `${bandId} performs normally under current solar conditions.`
    };
}
