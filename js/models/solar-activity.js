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
            affectedBands: ['160m', '80m', '40m'],
            description: 'Minor disturbance - lower bands affected'
        },
        moderate: {
            id: 'moderate',
            flareClass: 'M5+',
            absorptionMultiplier: 5,
            affectedBands: ['160m', '80m', '40m', '20m'],
            description: 'Moderate blackout - most bands affected on day side'
        },
        severe: {
            id: 'severe',
            flareClass: 'X',
            absorptionMultiplier: 10,
            affectedBands: ['160m', '80m', '40m', '20m', '15m', '10m'],
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
        '160m': 1.9, '80m': 3.75, '40m': 7.15,
        '20m': 14.175, '15m': 21.225, '10m': 28.85
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
