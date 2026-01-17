/**
 * English Translations
 */
export default {
    // Application
    app: {
        title: 'First Contact',
        subtitle: 'Your Journey into Shortwave Radio',
        version: 'v0.1.0'
    },

    // Units
    units: {
        km: 'km',
        thousandKm: 'k km',
        meters: 'm',
        mhz: 'MHz'
    },

    // UI Labels
    ui: {
        selectBand: 'Select Band',
        timeOfDay: 'Time of Day (UTC)',
        currentConditions: 'Current Conditions',
        welcome: {
            title: 'Welcome to First Contact!',
            subtitle: 'Click on any location on the map to try making a radio contact.',
            gettingStarted: 'Getting Started',
            step1: 'Select a band from the controls on the left',
            step2: 'Adjust the time of day using the slider',
            step3: 'Click a destination on the map',
            step4: 'See if your signal gets through!'
        },
        timePresets: {
            dawn: 'Dawn',
            noon: 'Noon',
            dusk: 'Dusk',
            midnight: 'Midnight'
        },
        timePeriods: {
            dawn: '(Dawn)',
            morning: '(Morning)',
            midday: '(Midday)',
            afternoon: '(Afternoon)',
            dusk: '(Dusk)',
            evening: '(Evening)',
            night: '(Night)'
        },
        conditions: {
            yourLocation: 'Your location:',
            localConditions: 'Local conditions:',
            target: 'Target:',
            distance: 'Distance:',
            targetConditions: 'Target conditions:'
        },
        language: 'Language',
        you: 'YOU',
        buttons: {
            tutorial: 'Tutorial',
            tutorialTitle: 'Start tutorial',
            help: 'Help',
            helpTitle: 'Show help'
        }
    },

    // HF Bands
    bands: {
        '80m': {
            name: '80 Meters',
            personality: 'The Night Owl',
            tagline: 'Comes alive after dark',
            simpleDescription: 'Best at night, absorbed during day. Great for regional contacts.',
            detailedDescription: 'The 80 meter band uses relatively long radio waves that the daytime D layer absorbs like a sponge. But when the sun sets and the D layer fades, this band springs to life! It\'s excellent for contacts within your continent, and on good nights, can reach much farther.',
            learningHint: 'Try this band after sunset - notice how it suddenly works better!',
            bestTimeOfDay: 'night',
            typicalRange: 'regional to continental'
        },
        '40m': {
            name: '40 Meters',
            personality: 'The Reliable Worker',
            tagline: 'Useful day and night',
            simpleDescription: 'Works day AND night. The versatile all-rounder band.',
            detailedDescription: 'The 40 meter band is the workhorse of HF radio. During the day, it provides solid regional coverage. At night, the reduced D layer absorption lets signals travel much farther. Many operators consider this the best band for learning because it almost always offers something.',
            learningHint: 'Compare daytime vs nighttime range - the difference teaches you about the D layer!',
            bestTimeOfDay: 'anytime',
            typicalRange: 'regional by day, continental by night'
        },
        '20m': {
            name: '20 Meters',
            personality: 'The World Traveler',
            tagline: 'Your passport to worldwide contacts',
            simpleDescription: 'The classic long-distance band. Works when the sun is up somewhere along the path.',
            detailedDescription: 'The 20 meter band is legendary for long-distance communication. It needs good F layer ionization to work, which means daylight somewhere on your signal path. When conditions align, you can talk around the world! It\'s less affected by D layer absorption than lower bands.',
            learningHint: 'This band shows you how signals can follow the daylight around the Earth.',
            bestTimeOfDay: 'day',
            typicalRange: 'continental to worldwide'
        },
        '15m': {
            name: '15 Meters',
            personality: 'The Fair Weather Friend',
            tagline: 'Amazing when conditions are right',
            simpleDescription: 'Needs stronger ionization. Excellent in good conditions, quiet otherwise.',
            detailedDescription: 'The 15 meter band needs a well-ionized F layer to work. During solar maximum years, it can be spectacular. In quieter times, it may only open for a few hours around midday. When it works, it offers excellent long-distance paths with relatively low noise.',
            learningHint: 'Compare to 20m - notice how this band needs stronger conditions.',
            bestTimeOfDay: 'midday',
            typicalRange: 'worldwide when open'
        },
        '10m': {
            name: '10 Meters',
            personality: 'The Spectacular Performer',
            tagline: 'When it opens, magic happens',
            simpleDescription: 'Needs strong ionization. Either wide open or completely dead.',
            detailedDescription: 'The 10 meter band is at the edge of what the ionosphere can reflect. It needs excellent conditions - typically around solar maximum - to work for long distances. But when it opens, signals can travel worldwide with surprisingly little power. It teaches you that the ionosphere has limits.',
            learningHint: 'This band teaches you that higher frequencies need stronger ionization to reflect.',
            bestTimeOfDay: 'midday during high solar activity',
            typicalRange: 'worldwide or nothing'
        }
    },

    // Ionospheric Layers
    layers: {
        D: {
            name: 'D Layer',
            role: 'absorber',
            simpleDescription: 'The "signal sponge" - soaks up lower frequency signals during daylight',
            educationalAnalogy: 'Think of it like fog on a road - it blocks your headlights during the day but clears at night.'
        },
        E: {
            name: 'E Layer',
            role: 'reflector',
            simpleDescription: 'The "regional reflector" - bounces signals for medium-distance contacts',
            educationalAnalogy: 'Like bouncing a ball off a low ceiling - it comes back down quickly and nearby.'
        },
        F: {
            name: 'F Layer',
            role: 'reflector',
            simpleDescription: 'The "long-distance reflector" - enables contacts around the world',
            educationalAnalogy: 'Like bouncing a ball off a high gymnasium ceiling - it travels much farther before coming back down.'
        }
    },

    // Layer States
    layerStates: {
        dLayerAbsent: '{layer} is mostly absent (nighttime conditions)',
        dLayerPartial: '{layer} is partially formed (twilight/weak sun)',
        dLayerModerate: '{layer} is moderately active',
        dLayerFull: '{layer} is fully developed (strong sunlight)'
    },

    // Lighting Conditions
    lighting: {
        day: {
            description: 'Full daylight',
            educational: 'The D layer is fully ionized and will absorb lower frequency signals.'
        },
        dayLow: {
            description: 'Daytime (sun low)',
            educational: 'The sun is low but the D layer is still somewhat active.'
        },
        civilTwilight: {
            description: 'Civil twilight (grey line)',
            educational: 'The grey line! The D layer is fading but the F layer is still ionized - excellent propagation conditions!'
        },
        nauticalTwilight: {
            description: 'Nautical twilight',
            educational: 'The D layer has disappeared. Low frequency bands are coming alive.'
        },
        astronomicalTwilight: {
            description: 'Astronomical twilight',
            educational: 'Deep twilight - the ionosphere is transitioning to nighttime conditions.'
        },
        night: {
            description: 'Night',
            educational: 'Full night. The D layer is gone, but the F layer persists at reduced strength.'
        }
    },

    // Grey Line
    greyLine: {
        inZone: 'In the grey line zone',
        daytime: 'Daytime',
        nighttime: 'Nighttime',
        educational: 'You\'re in the grey line! The D layer is weak but the F layer is still ionized. This twilight zone is famous for enabling long-distance contacts that wouldn\'t work in full day or night.'
    },

    // Propagation Results
    propagation: {
        // Headlines
        headlines: {
            strongConnection: 'Strong connection to {target}!',
            reached: 'You reached {target}',
            weakSuccess: 'Weak but successful contact with {target}',
            notReachable: '{target} is not reachable right now'
        },

        // Signal Quality
        quality: {
            excellent: 'Excellent',
            good: 'Good',
            fair: 'Fair',
            weak: 'Weak but readable',
            notReadable: 'Not readable'
        },

        // Signal meter
        signalLabel: 'Signal: {quality} ({value}%)',

        // Path types
        pathTypes: {
            singleHop: 'Single hop path',
            multiHop: '{count}-hop path',
            longMultiHop: 'Long {count}-hop path',
            failed: 'Failed path'
        },

        // Factor names
        factors: {
            dLayerAbsorption: 'D Layer Absorption',
            fLayerReflection: 'F Layer Reflection',
            greyLineEffect: 'Grey Line Effect',
            pathGeometry: 'Path Geometry'
        },

        // Factor impacts
        impacts: {
            helps: 'Helps',
            hinders: 'Hinders',
            neutral: 'Neutral'
        },

        // Factor descriptions
        factorDescriptions: {
            heavyAbsorption: 'Heavy D layer absorption is blocking {band} signals',
            moderateAbsorption: 'Moderate D layer absorption is weakening signals',
            minorAbsorption: 'Minor D layer absorption',
            minimalAbsorption: 'Minimal absorption - D layer is weak or absent',
            cannotReflect: 'F layer too weak to reflect {band} signals',
            excellentReflection: 'Excellent F layer reflection',
            adequateReflection: 'Adequate F layer reflection',
            weakReflection: 'Weak F layer reflection',
            strongGreyLine: 'Strong grey line enhancement!',
            greyLineEnhancement: 'Grey line enhancement',
            touchesGreyLine: 'Touches grey line',
            distanceTooFar: 'Distance too far for {band}',
            singleHopPath: 'Single hop path',
            multiHopPath: '{count}-hop path'
        },

        // Educational explanations
        educational: {
            absorptionHigh: '{band} uses lower frequencies that the daytime D layer absorbs strongly. Try this band after sunset when the D layer disappears!',
            absorptionModerate: 'The D layer is absorbing some of your signal energy. Lower frequency bands are more affected than higher ones.',
            absorptionLow: 'There\'s some D layer absorption, but {band} is high enough in frequency to mostly avoid it.',
            absorptionMinimalNight: 'It\'s nighttime along most of the path, so the D layer has disappeared. Low frequency bands can now travel freely!',
            absorptionMinimalFreq: '{band} is largely unaffected by D layer absorption at this frequency.',
            cannotReflect: 'At {freq} MHz, {band} needs stronger ionization than currently exists. The signal is passing through the ionosphere into space instead of reflecting back to Earth. Try a lower frequency band, or wait for more sunlight on the path.',
            excellentReflection: 'The F layer is well-ionized and reflecting {band} signals efficiently. Good ionization like this happens when the sun is illuminating the ionosphere.',
            adequateReflection: 'The F layer has enough ionization to reflect {band} signals, though not at peak efficiency.',
            weakReflection: 'The F layer ionization is marginal for {band}. Signals may be reflected weakly or intermittently.',
            greyLineStrong: 'More than half your signal path travels through the grey line zone! This twilight band has unique properties: the D layer has faded (reducing absorption) while the F layer retains some ionization (enabling reflection). This combination can produce remarkable long-distance contacts.',
            greyLineModerate: 'Your signal path passes through the grey line zone, which can enhance propagation. The grey line is the boundary between day and night where special conditions exist.',
            greyLineLight: 'Part of your path touches the grey line zone, which may provide some enhancement.',
            distanceTooFar: 'This {distance} km path would require {idealHops} hops, but {band} signals typically can only sustain {maxHops} hops before becoming too weak. Higher frequency bands can travel farther per hop because they reflect at steeper angles.',
            singleHopPath: 'This is a single-hop path - the signal bounces once off the ionosphere. Single-hop paths are generally the most reliable.',
            multiHopPath: 'This path requires {count} hops off the ionosphere. Each hop loses some signal strength, but this is a reasonable path.',
            longMultiHopPath: 'This path requires {count} hops, which is getting long. Each ionospheric reflection loses signal strength, so multi-hop paths can be weak or unreliable.'
        }
    },

    // Learning Points
    learning: {
        sectionTitle: 'What you discovered',
        tryThis: 'Try this:',
        concepts: {
            dLayerAbsorption: {
                name: 'D Layer Absorption',
                insight: '{band} ({personality}) is affected by daytime D layer absorption. Lower frequency bands are absorbed more than higher ones.',
                experiment: 'Try the same contact after sunset, or switch to a higher frequency band.'
            },
            ionosphericReflection: {
                name: 'Ionospheric Reflection',
                insight: 'Higher frequencies like {band} need stronger ionization to reflect. When ionization is too weak, signals pass through to space.',
                experiment: 'Try a lower frequency band, or try again when there\'s more sunlight on the path.'
            },
            greyLinePropagation: {
                name: 'Grey Line Propagation',
                insight: 'The twilight zone (grey line) offers unique propagation conditions - reduced absorption with maintained reflection.',
                experiment: 'Watch how propagation changes as the grey line moves across your path.'
            },
            daytimePropagation: {
                name: 'Daytime Propagation',
                insight: '{band} works well during the day because it\'s not strongly absorbed by the D layer.',
                experiment: 'Compare to 80m or 40m on the same path to see how lower frequencies are absorbed.'
            }
        }
    },

    // Suggestions
    suggestions: {
        sectionTitle: 'Try next',
        items: {
            waitForSunset: {
                action: 'Wait for sunset',
                reason: 'The D layer disappears after dark, allowing lower frequencies through'
            },
            tryHigherBand: {
                action: 'Try a higher band',
                reason: 'Higher frequencies are less affected by D layer absorption'
            },
            tryLowerBand: {
                action: 'Try a lower band',
                reason: 'Lower frequencies can reflect with weaker ionization'
            },
            waitForSunlight: {
                action: 'Wait for more sunlight on the path',
                reason: 'Sunlight ionizes the F layer, enabling reflection'
            },
            tryFartherLocations: {
                action: 'Try the same band to farther locations',
                reason: 'Good conditions might enable contacts you haven\'t tried'
            },
            experimentGreyLine: {
                action: 'Experiment with different bands in the grey line',
                reason: 'The grey line can make unusual combinations work'
            },
            tryShorterPath: {
                action: 'Try a shorter path first',
                reason: 'Master shorter distances before attempting very long paths'
            }
        }
    },

    // Encouragement messages
    encouragement: {
        excellent: {
            message: 'Excellent propagation!',
            detail: 'You\'ve found a strong path on {band}.'
        },
        good: {
            message: 'Nice work!',
            detail: 'You made contact. Try different times or bands to find even better conditions.'
        },
        weak: {
            message: 'Contact made!',
            detail: 'Even weak contacts count. Radio waves found a way through challenging conditions.'
        },
        failed: {
            message: 'Keep experimenting!',
            detail: 'Understanding why propagation fails is just as valuable as making contacts.'
        }
    },

    // Discoveries
    discoveries: {
        title: 'Discovery!',
        gotIt: 'Got it!',
        dLayerAbsorption: {
            concept: 'D Layer Absorption',
            message: 'You discovered that some bands work better at night! The D layer absorbs lower frequencies during the day.'
        },
        greyLine: {
            concept: 'Grey Line Magic',
            message: 'You found the grey line! This twilight zone has special propagation conditions that can enable contacts impossible at other times.'
        },
        frequencyDistance: {
            concept: 'Frequency and Distance',
            message: 'You noticed that higher frequency bands can reach farther! They bounce at steeper angles and travel more distance per hop.'
        }
    },

    // Band comparison
    comparison: {
        title: 'Band Comparison',
        muchBetter: '{band} works much better!',
        slightlyBetter: '{band} is slightly better.',
        wasBetter: '{oldBand} was working better.',
        similar: 'Both bands are performing similarly.',
        higherLessAbsorbed: 'The higher frequency of {band} is less affected by D layer absorption and can travel farther per hop.',
        lowerReflectsBetter: 'The lower frequency of {band} reflects more reliably from the ionosphere, even with weaker ionization.',
        lowerWorksBetter: 'The lower frequency of {band} works better because it can reflect from the ionosphere even with current conditions.',
        higherAvoidsAbsorption: 'The higher frequency of {band} is avoiding D layer absorption better.'
    },

    // Solar effects
    solar: {
        highSun: {
            title: 'High Sun',
            explanation: 'The sun is high in the sky, providing maximum ionization. The D layer is very active, absorbing lower frequencies. Higher bands (15m, 10m) have the best chance of working.',
            recommendation: 'Try the higher frequency bands like 20m, 15m, or 10m.'
        },
        moderateSun: {
            title: 'Moderate Sun',
            explanation: 'Good ionization for F layer reflection. The D layer is active but not at maximum. Most bands can work depending on the path.',
            recommendation: '20m is usually reliable. Check if 40m is too absorbed.'
        },
        lowSun: {
            title: 'Low Sun',
            explanation: 'The sun is low on the horizon. The D layer is weakening. Lower bands are starting to become more useful.',
            recommendation: '40m is becoming more reliable. 80m might start working soon.'
        },
        greyLine: {
            title: 'Grey Line',
            explanation: 'The magical grey line! The D layer is fading but the F layer still has ionization. This is prime time for unusual long-distance contacts.',
            recommendation: 'Experiment! Many bands can produce surprising results during the grey line.'
        },
        twilight: {
            title: 'Twilight',
            explanation: 'Transitioning to night. The D layer is gone. Lower frequency bands are coming into their own.',
            recommendation: '80m and 40m are excellent. 20m may still work to areas with daylight.'
        },
        night: {
            title: 'Night',
            explanation: 'Full darkness. No D layer absorption! The F layer is weaker but still present. Lower bands can travel great distances.',
            recommendation: '80m and 40m are at their best. 20m needs daylight somewhere on the path.'
        }
    },

    // Locations
    locations: {
        newYork: 'New York, USA',
        losAngeles: 'Los Angeles, USA',
        chicago: 'Chicago, USA',
        london: 'London, UK',
        berlin: 'Berlin, Germany',
        moscow: 'Moscow, Russia',
        rome: 'Rome, Italy',
        tokyo: 'Tokyo, Japan',
        beijing: 'Beijing, China',
        mumbai: 'Mumbai, India',
        sydney: 'Sydney, Australia',
        saoPaulo: 'São Paulo, Brazil',
        buenosAires: 'Buenos Aires, Argentina',
        capeTown: 'Cape Town, South Africa',
        cairo: 'Cairo, Egypt',
        reykjavik: 'Reykjavik, Iceland',
        mcmurdo: 'McMurdo Station, Antarctica'
    },

    // Loading
    loading: {
        transmitting: 'Transmitting...'
    },

    // Errors
    errors: {
        unknownBand: 'Unknown band selected.'
    },

    // Tutorial
    tutorial: {
        // Navigation
        skip: 'Skip',
        back: 'Back',
        next: 'Next',
        finish: 'Finish',

        // Hints
        hints: {
            clickToContinue: 'Click to continue',
            dragSlider: 'Drag the slider',
            clickMap: 'Click on the map'
        },

        // Initial prompt
        prompt: {
            title: 'Welcome to First Contact!',
            description: 'Would you like a quick introduction to the fascinating world of shortwave propagation?',
            start: 'Start Tutorial',
            skip: 'Skip'
        },

        // Tutorial steps
        steps: {
            welcome: {
                title: 'Welcome!',
                content: 'First Contact is an interactive simulator that shows you how shortwave signals travel around the world. Let\'s discover the basics together!'
            },
            map_intro: {
                title: 'The World Map',
                content: 'This is your overview of the world. You can see the day-night boundary and select targets for radio contacts.'
            },
            your_location: {
                title: 'Your Location',
                content: 'The blue marker shows your location. This is where you\'ll transmit your radio signals from.'
            },
            day_night: {
                title: 'Day and Night',
                content: 'The dark area shows the night side of Earth. The ionosphere behaves very differently during day and night – this affects which bands work!'
            },
            grey_line: {
                title: 'The Grey Line',
                content: 'The narrow band between day and night is called the "grey line". Special conditions here can enable surprising long-distance contacts!'
            },
            bands_intro: {
                title: 'Frequency Bands',
                content: 'Here you select the frequency band. Each band has its own character – some work better during the day, others at night.'
            },
            select_band: {
                title: 'Select a Band',
                content: 'Click on the 20 meter band. It\'s a good all-rounder for long-distance contacts.'
            },
            time_intro: {
                title: 'Time Control',
                content: 'This slider lets you change the time of day. Watch how day and night move across the map!'
            },
            try_time: {
                title: 'Try It Out!',
                content: 'Drag the slider and observe how the day-night boundary shifts. The time is shown in UTC.'
            },
            first_contact: {
                title: 'Your First Contact',
                content: 'Now click on a location on the map to attempt a radio contact. Try somewhere on the day side!'
            },
            results_intro: {
                title: 'Results',
                content: 'Here you can see the result of your contact attempt. Green means success, red means the signal didn\'t get through.'
            },
            factors_explained: {
                title: 'Influencing Factors',
                content: 'These factors show you what affected the propagation. Learn from them to find better connections!'
            },
            experiment: {
                title: 'Experiment!',
                content: 'The best way to learn is by trying! Change the time, switch bands, and try different targets. Watch for patterns!'
            },
            complete: {
                title: 'Tutorial Complete!',
                content: 'You now know the basics. Discover for yourself how different bands work at different times. Have fun experimenting!'
            }
        }
    },

    // Help
    help: {
        title: 'Help - Shortwave Propagation',
        goal: {
            title: 'Game Objective',
            text: 'Learn how shortwave radio works! Click on cities on the map to simulate radio contacts. Discover which bands work best at different times of day.'
        },
        map: {
            title: 'The World Map',
            text: 'The map shows day and night in real-time. The ionosphere behaves differently depending on solar radiation.',
            you: 'Your location (Vienna, Austria)',
            cities: 'Other cities - click to connect',
            sun: 'Current sun position'
        },
        bands: {
            title: 'Frequency Bands',
            text: 'Each band has its own "personality":',
            '80m': 'Good at night, heavily absorbed during day',
            '40m': 'Versatile, often works day and night',
            '20m': 'The "workhorse" - good for long distances during day',
            '15m': 'Needs good solar illumination',
            '10m': 'Only open with strong ionosphere'
        },
        time: {
            title: 'Time Control',
            text: 'Use the time slider to simulate different times of day. Watch how propagation conditions change!'
        },
        tips: {
            title: 'Tips',
            tip1: {
                title: 'Grey Line:',
                text: 'The twilight zone (boundary between day and night) often provides excellent propagation conditions!'
            },
            tip2: {
                title: 'Experiment:',
                text: 'Try different band/time combinations. There are no mistakes - only learning opportunities!'
            }
        }
    }
};
