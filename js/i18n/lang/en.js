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
        location: {
            title: 'My Location',
            selectPreset: '-- Select a city --',
            name: 'Name',
            namePlaceholder: 'e.g. My QTH',
            latitude: 'Lat',
            longitude: 'Lon',
            set: 'Set',
            custom: 'Custom Location'
        },
        solarActivity: 'Solar Activity',
        mogelDellinger: {
            trigger: 'Simulate Solar Flare',
            active: 'Solar Flare Active!',
            hint: 'Triggers a Mögel-Dellinger radio blackout'
        },
        aurora: {
            trigger: 'Simulate Aurora',
            active: 'Aurora Active!',
            hint: 'Triggers aurora disturbance on polar paths'
        },
        sporadicE: {
            trigger: 'Sporadic E',
            active: 'Es Active!',
            hint: 'Magic Band! Best on 6m, also 10m/15m'
        },
        buttons: {
            tutorial: 'Tutorial',
            tutorialTitle: 'Start tutorial',
            help: 'Help',
            helpTitle: 'Show help'
        },
        power: {
            title: 'Transmit Power',
            challengeMode: 'QRP Challenge Mode!',
            levels: {
                qrp: {
                    name: 'QRP',
                    description: '5 Watts - The ultimate challenge! Can you make contacts with minimal power?'
                },
                standard: {
                    name: 'Standard',
                    description: '100 Watts - Typical amateur radio power level for reliable contacts.'
                },
                high: {
                    name: 'High Power',
                    description: '1000 Watts - Maximum legal power for tough conditions.'
                }
            }
        },
        season: {
            title: 'Season / Month',
            months: {
                0: 'January',
                1: 'February',
                2: 'March',
                3: 'April',
                4: 'May',
                5: 'June',
                6: 'July',
                7: 'August',
                8: 'September',
                9: 'October',
                10: 'November',
                11: 'December'
            },
            seasons: {
                winter: 'Winter',
                spring: 'Spring',
                summer: 'Summer',
                autumn: 'Autumn'
            }
        },
        antenna: {
            title: 'Antenna Type',
            gain: 'Gain',
            angle: 'Takeoff Angle',
            direction: 'Beam Direction',
            directions: {
                N: 'North',
                NE: 'Northeast',
                E: 'East',
                SE: 'Southeast',
                S: 'South',
                SW: 'Southwest',
                W: 'West',
                NW: 'Northwest'
            },
            types: {
                dipole: {
                    name: 'Dipole',
                    description: 'All-rounder with moderate gain (2.15 dBi). Good for NVIS and medium distances.'
                },
                vertical: {
                    name: 'Vertical',
                    description: 'Low angle radiation for DX. Omnidirectional - works in all directions.'
                },
                yagi: {
                    name: 'Yagi',
                    description: 'High gain (8 dBi) directional beam. Best for DX, must point at target.'
                }
            }
        }
    },

    // HF Bands
    bands: {
        '160m': {
            name: '160 Meters',
            personality: 'The Top Band Challenge',
            tagline: 'The ultimate night-time adventure',
            simpleDescription: 'Only works at night. Completely absorbed during day. A challenging but rewarding band.',
            detailedDescription: 'The 160 meter band, known as "Top Band", uses very long radio waves that are almost completely absorbed by the D layer during daylight. This band only comes alive after dark when the D layer disappears. It requires patience, good antennas, and often more power, but making contacts on 160m is especially rewarding.',
            learningHint: 'This band teaches you just how strong the D layer absorption is - try it during day vs night!',
            bestTimeOfDay: 'night only',
            typicalRange: 'regional to continental at night'
        },
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
        '60m': {
            name: '60 Meters',
            personality: 'The NVIS Specialist',
            tagline: 'Signals that go straight up and come back down',
            simpleDescription: 'Good for regional coverage. Signals bounce nearly straight up, filling in nearby areas.',
            detailedDescription: 'The 60 meter band is excellent for NVIS (Near Vertical Incidence Skywave) propagation. Signals can travel nearly straight up and reflect back down, providing reliable coverage within about 500km. This fills in the "skip zone" that other bands miss.',
            learningHint: 'This band shows how signals can go nearly straight up - great for nearby contacts!',
            bestTimeOfDay: 'day for NVIS, night for longer distance',
            typicalRange: 'regional (300-600 km)'
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
        '30m': {
            name: '30 Meters',
            personality: 'The Quiet Achiever',
            tagline: 'A narrow band with big potential',
            simpleDescription: 'A narrow WARC band. Good compromise between day and night performance.',
            detailedDescription: 'The 30 meter band is one of the WARC bands between 40m and 20m. It combines characteristics of both: less D-layer absorption than 40m during the day, and a lower frequency than 20m so it can still reflect when the MUF drops at night and 20m closes. Popular for digital modes and CW.',
            learningHint: 'Notice how this band still works at night when 20m has closed - lower frequency needs less ionization.',
            bestTimeOfDay: 'anytime - good day and night',
            typicalRange: 'continental to intercontinental'
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
        '17m': {
            name: '17 Meters',
            personality: 'The Hidden Gem',
            tagline: 'Opens after 20m when ionization increases',
            simpleDescription: 'A WARC band between 20m and 15m. Opens after 20m when ionization increases.',
            detailedDescription: 'The 17 meter band sits between 20m and 15m in frequency. It requires more ionization than 20m to open, so it typically opens later in the morning and closes earlier in the evening. As a WARC band with no contests, it tends to be quieter. When 20m is wide open but 15m needs more ionization, 17m often provides the bridge.',
            learningHint: 'When 20m is wide open, check 17m - it may also be open with less crowding!',
            bestTimeOfDay: 'day, when ionization is strong',
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
        '12m': {
            name: '12 Meters',
            personality: 'The Reliable Cousin',
            tagline: 'Like 10m, but more forgiving',
            simpleDescription: 'A WARC band that often works when 10m is marginal. Slightly easier conditions needed.',
            detailedDescription: 'The 12 meter band is the highest WARC band, sitting just below 10m. It needs slightly less ionization than 10m, so it often opens earlier and stays open longer. When 10m is marginal, check 12m!',
            learningHint: 'When 10m seems dead, try 12m - it needs slightly less ionization.',
            bestTimeOfDay: 'midday, needs good ionization',
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
        },
        '6m': {
            name: '6 Meters',
            personality: 'The Magic Band',
            tagline: 'Unpredictable, exciting, magical',
            simpleDescription: 'The "Magic Band"! Normally quiet, but can suddenly open via Sporadic E or during solar maximum.',
            detailedDescription: 'The 6 meter band lives at the boundary between HF and VHF. Most of the time it\'s quiet - signals simply pass through the ionosphere into space. But when Sporadic E clouds form or during high solar activity, this band can suddenly spring to life with strong signals over 1000-2000 km. It\'s called the "Magic Band" because openings are unpredictable and exciting!',
            learningHint: 'Check this band in summer - Sporadic E can create magical openings!',
            bestTimeOfDay: 'summer afternoons for Es, midday during solar maximum',
            typicalRange: 'nothing or 1000-2000 km via Es'
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

    // Solar Activity
    solarActivity: {
        quiet: {
            name: 'Quiet',
            simpleDescription: 'Low solar activity. Lower bands work better, higher bands may be closed.',
            learningHint: 'Notice how 10m and 15m are often "dead" during quiet sun conditions.'
        },
        normal: {
            name: 'Normal',
            simpleDescription: 'Average solar activity. Good conditions for most bands.',
            learningHint: 'This is the best condition for learning - propagation is predictable.'
        },
        active: {
            name: 'Active',
            simpleDescription: 'High solar activity. Higher bands come alive! But watch for disturbances.',
            learningHint: 'Try 10m and 15m now - they might be wide open for worldwide contacts!'
        },
        storm: {
            name: 'Storm',
            simpleDescription: 'Disturbed conditions. Propagation is unreliable or blocked.',
            learningHint: 'During storms, propagation can be completely unpredictable. Try again later!'
        }
    },

    // Mögel-Dellinger Effect
    mogelDellinger: {
        name: 'Mögel-Dellinger Effect',
        alternateNames: 'Also known as: Sudden Ionospheric Disturbance (SID), Radio Blackout',
        simpleDescription: 'A solar flare causes sudden radio blackout on the day side of Earth.',
        detailedDescription: 'When a solar flare erupts, X-rays reach Earth in 8 minutes and super-ionize the D layer. This turns the D layer into a complete radio absorber, blocking all HF signals on the sunlit side of Earth. Named after German scientists Hans Mögel and Josef Dellinger who discovered this in the 1930s.',
        symptoms: {
            title: 'How to recognize it:',
            list: [
                'Sudden complete fadeout of signals',
                'Only affects the day side of the path',
                'Lower frequencies affected more',
                'Gradual recovery over 15-120 minutes',
                'Night side paths still work'
            ]
        },
        learningHint: 'If HF suddenly goes dead during the day but works at night - it might be a Mögel-Dellinger event!'
    },

    // Aurora Effect
    aurora: {
        name: 'Aurora',
        alternateNames: 'Also known as: Northern Lights, Southern Lights, Aurora Borealis, Aurora Australis',
        simpleDescription: 'Aurora disrupts radio signals crossing polar regions with characteristic flutter and absorption.',
        detailedDescription: 'Aurora occurs when charged particles from the sun enter Earth\'s magnetic field at the poles. These particles create the beautiful Northern and Southern Lights, but also cause significant ionospheric disturbances. For HF radio, this means trouble on paths crossing high latitudes - signals become raspy (aurora flutter) or may be completely blocked.',
        symptoms: {
            title: 'How to recognize it:',
            list: [
                'Raspy, buzzing signal quality (aurora flutter)',
                'Signals fade and return rapidly',
                'Only affects polar or high-latitude paths',
                'Non-polar paths work normally',
                'Often during geomagnetic storm warnings'
            ]
        },
        learningHint: 'If signals to northern regions sound raspy or disappear - check for aurora activity!'
    },

    // Sporadic E Effect
    sporadicE: {
        name: 'Sporadic E',
        alternateNames: 'Also known as: Es, E-Skip, Short Skip',
        simpleDescription: 'Dense ionization patches in the E layer create surprise openings on higher bands.',
        detailedDescription: 'Sporadic E is one of the most exciting phenomena in amateur radio! Dense patches of ionization form in the E layer (about 110 km altitude), creating a reflective surface for higher frequencies that normally pass through. This enables contacts at distances of 500-2300 km - often filling in the "skip zone" that is normally unreachable.',
        symptoms: {
            title: 'How to recognize it:',
            list: [
                'Sudden strong signals on 10m or 15m',
                'Stations at medium distances (500-2000 km)',
                'Signals may appear and disappear quickly',
                'Most common in summer afternoons',
                'Higher bands open that are normally dead'
            ]
        },
        learningHint: 'If 10m suddenly opens to stations 1000-2000 km away in summer - you might be experiencing Sporadic E!'
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
            notReadable: 'Not readable',
            blackout: 'Radio Blackout!',
            auroraFlutter: 'Aurora Flutter!',
            skipZone: 'In Skip Zone!'
        },

        // Mögel-Dellinger messages
        mogelDellinger: {
            blackout: 'Radio Blackout! A solar flare has caused a Mögel-Dellinger effect. {band} signals are being absorbed on the day side.',
            severeBlackout: 'Complete HF radio blackout due to solar flare!',
            moderateBlackout: 'Strong D-layer absorption from solar flare affecting {band}',
            minorBlackout: 'Solar flare causing increased absorption on {band}',
            minorEffect: 'Minor solar flare effect on {band}'
        },

        // Solar Activity messages
        solarActivity: {
            quietHighBand: 'Quiet sun - {band} needs more ionization',
            activeHighBand: 'Active sun boosting {band} propagation!',
            activeLowBand: 'Active sun increasing D-layer absorption on {band}',
            storm: 'Geomagnetic storm disrupting ionosphere'
        },

        // Aurora messages
        aurora: {
            blocked: 'Polar path blocked by aurora activity!',
            severeFlutter: 'Severe aurora flutter affecting {band} on polar path',
            moderateFlutter: 'Moderate aurora disturbance on {band}',
            minorFlutter: 'Minor aurora flutter on {band}'
        },

        // Sporadic E messages
        sporadicE: {
            excellent: 'Excellent Sporadic E opening on {band}!',
            good: 'Good Sporadic E conditions for {band}',
            moderate: 'Moderate Es activity boosting {band}'
        },

        // Skip Zone messages
        skipZone: {
            groundWave: 'Ground wave contact at {distance} km',
            inSkipZone: '{band} signals cannot reach {distance} km - in the skip zone! Sky wave returns at {skipMin} km.',
            nearGroundWaveEdge: '{band} at {distance} km is just beyond ground wave range - weak signals possible',
            nearSkyWaveEdge: '{band} at {distance} km is near where sky wave returns ({skipMin} km) - marginal signals'
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

        // Short path vs long path
        pathType: {
            short: 'Short Path',
            long: 'Long Path'
        },

        // Path comparison messages
        pathComparison: {
            onlyShortWorks: 'Only the short path works under current conditions.',
            onlyLongWorks: 'The long path works while the short path is blocked!',
            neitherWorks: 'Neither short nor long path works under current conditions.',
            longPathBetter: 'Long path ({longStrength}%) is significantly better than short path ({shortStrength}%).',
            shortPathBetter: 'Short path ({shortStrength}%) is preferred over long path ({longStrength}%).'
        },

        // Long path descriptions
        longPath: {
            veryLongDistance: 'Very long path distance - signal weakening over extreme distance',
            longDistance: 'Long path distance - additional signal loss',
            moderateDistance: 'Long path adds extra distance but may avoid obstacles'
        },

        // Factor names
        factors: {
            dLayerAbsorption: 'D Layer Absorption',
            fLayerReflection: 'F Layer Reflection',
            greyLineEffect: 'Grey Line Effect',
            pathGeometry: 'Path Geometry',
            power: 'Transmit Power',
            antenna: 'Antenna',
            direction: 'Beam Direction'
        },

        // Antenna effect messages
        antenna: {
            dipoleNvis: 'Dipole antenna - good compromise for NVIS',
            dipoleMedium: 'Dipole antenna - balanced performance',
            dipoleDx: 'Dipole antenna - moderate DX capability',
            verticalNvis: 'Vertical antenna - poor for NVIS (low angle radiation)',
            verticalMedium: 'Vertical antenna - low angle radiation helps medium distances',
            verticalDx: 'Vertical antenna - excellent low angle for DX',
            yagiNvis: 'Yagi antenna - poor for NVIS (very low takeoff angle)',
            yagiMedium: 'Yagi antenna - high gain helps medium distances',
            yagiDx: 'Yagi antenna - best choice for DX (high gain, low angle)'
        },

        // Power effect messages
        power: {
            qrpImpact: '-13 dB',
            qrpDescription: 'QRP (5W) - Weak signal, challenging conditions',
            standardImpact: '0 dB',
            standardDescription: 'Standard power (100W) - Normal signal level',
            highImpact: '+10 dB',
            highDescription: 'High power (1kW) - Strong signal, better margin'
        },

        // Direction effect messages (for Yagi)
        direction: {
            onTarget: 'Yagi pointed at target (bearing {bearing}°) - full gain',
            slightlyOff: 'Yagi {diff}° off target - {penalty} dB loss',
            sideOn: 'Yagi nearly sideways to target ({diff}° off) - {penalty} dB loss',
            rearQuarter: 'Yagi rear quarter ({diff}° off target) - {penalty} dB loss',
            backwards: 'Yagi pointing away from target ({diff}° off) - {penalty} dB loss',
            unknown: 'Yagi direction unknown'
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
            longMultiHopPath: 'This path requires {count} hops, which is getting long. Each ionospheric reflection loses signal strength, so multi-hop paths can be weak or unreliable.',
            // Mögel-Dellinger educational
            mogelDellingerSevere: 'This is a Mögel-Dellinger effect! A solar flare has sent X-rays to Earth, super-ionizing the D layer. All HF signals on the sunlit side are being completely absorbed. This effect typically lasts 15-120 minutes. Try a path that goes through the night side!',
            mogelDellingerModerate: 'A solar flare is causing enhanced D-layer absorption. Lower frequency bands are most affected. The effect will gradually fade over the next hour or so.',
            mogelDellingerMinor: '{band} is experiencing some extra absorption from solar flare activity, but higher frequencies are less affected.',
            // Solar activity educational
            solarQuietHighBand: '{band} needs strong F-layer ionization to reflect signals. During quiet solar conditions, the ionosphere is weaker and higher frequencies often pass through into space instead of reflecting back.',
            solarActiveHighBand: 'Active solar conditions create strong F-layer ionization - perfect for {band}! The higher frequencies that normally struggle can now reflect efficiently for worldwide contacts.',
            solarActiveLowBand: 'With active solar conditions, the D-layer is also more ionized, which means more absorption of lower frequencies like {band} during the day.',
            solarStorm: 'Geomagnetic storms disrupt the orderly structure of the ionosphere. Propagation becomes unpredictable - signals may fade in and out, or the ionosphere may become completely unreliable. Wait for conditions to settle.',
            // Aurora educational
            auroraSevere: 'Severe aurora activity is blocking this polar path! Charged particles from the sun are creating intense ionospheric disturbances at high latitudes. Signals become extremely distorted or completely absorbed. Try a path that avoids the polar region.',
            auroraModerate: 'Moderate aurora activity is causing signal distortion on this polar path. The characteristic "aurora flutter" - a raspy, buzzing quality - makes signals hard to copy. {band} signals crossing high latitudes are especially affected.',
            auroraMinor: 'Minor aurora activity is detectable on this path. {band} signals crossing polar regions may have some flutter or fading. This is common during elevated geomagnetic activity.',
            // Sporadic E educational
            sporadicEExcellent: 'Excellent Sporadic E (Es) conditions! Dense patches of ionization in the E layer are creating a reflective surface for {band}. This {distance} km path is perfect for Es - expect strong signals! Es is most common in summer.',
            sporadicEGood: 'Good Sporadic E activity is enhancing {band} propagation. The E layer (at about 110 km altitude) has developed dense ionization patches that can reflect higher frequencies. This is the "summer magic" that amateur radio operators love!',
            sporadicEModerate: 'Some Sporadic E activity is present, giving {band} a boost. Es creates shorter-distance openings (500-2000 km) compared to F layer propagation, because the E layer is lower.',
            // Long path educational
            longPathVeryLong: 'This is an extremely long path, traveling over 30,000 km around the globe. Each additional hop weakens the signal considerably. Long path is worth trying when short path conditions are poor.',
            longPathLong: 'The long path travels over 25,000 km - more than half way around the world in the "wrong" direction. Despite the extra distance, this can work when short path crosses unfavorable conditions.',
            longPathModerate: 'Taking the long path adds significant distance, but it avoids whatever obstacles are blocking the short path. The different route may cross better ionospheric conditions.',
            // Skip zone educational
            groundWave: 'At very short distances, signals travel along the ground (ground wave). This works regardless of ionospheric conditions but is limited to about 50-100 km depending on frequency and terrain.',
            skipZoneDeep: 'You\'re in the "skip zone" or "dead zone"! {band} ground waves only reach about {groundMax} km, but the sky wave doesn\'t return to Earth until about {skipMin} km. Signals literally skip over this area - that\'s why it\'s called the skip zone!',
            skipZoneNearGround: 'You\'re just beyond ground wave range for {band}. Some weak signals might still reach via scatter or near-vertical incidence, but reliable communication requires either closer or farther distances.',
            skipZoneNearSky: 'You\'re near the edge of where {band} sky waves return to Earth. Signals are marginal - sometimes they get through, sometimes they don\'t. Move farther away for more reliable sky wave propagation.',
            // Power educational
            powerQrp: 'QRP (5 Watts) is the ultimate challenge in amateur radio! With 13 dB less signal than standard power, marginal paths become impossible. But QRP successes are incredibly rewarding - you\'re doing more with less!',
            powerStandard: 'Standard power (100 Watts) provides a good balance between signal strength and equipment requirements. This is the typical power level for most amateur radio contacts.',
            powerHigh: 'High power (1000 Watts) gives you a 10 dB advantage over standard power. This extra margin can make the difference on marginal paths or when fighting absorption. But remember: good antennas are often more effective than raw power!',
            // Antenna educational
            antennaDipoleNvis: 'The dipole antenna radiates at moderate angles (about 35°), making it a good all-rounder. For short distances under 500 km, its higher angle radiation works well for NVIS (signals bouncing nearly straight up and back down).',
            antennaDipoleMedium: 'At medium distances, the dipole antenna performs well as a compromise. Its moderate takeoff angle works for both regional and some DX contacts.',
            antennaDipoleDx: 'For DX (long distance), the dipole has moderate capability. While it has some gain (2.15 dBi), its higher takeoff angle means some energy goes at steeper angles than ideal for maximum distance.',
            antennaVerticalNvis: 'The vertical antenna radiates at very low angles (about 20°), which is poor for NVIS contacts. Signals go toward the horizon rather than straight up, making it hard to reach nearby stations.',
            antennaVerticalMedium: 'At medium distances, the vertical antenna\'s low angle radiation starts to become useful. It\'s omnidirectional, so you don\'t need to point it at your target.',
            antennaVerticalDx: 'The vertical antenna excels at DX! Its low takeoff angle (20°) sends most energy toward the horizon - perfect for long-distance skip. Omnidirectional means you can work all directions.',
            antennaYagiNvis: 'The Yagi antenna is poorly suited for NVIS. Its very low takeoff angle (15°) and directional pattern mean it sends energy toward the horizon, not straight up for nearby contacts.',
            antennaYagiMedium: 'At medium distances, the Yagi\'s high gain (8 dBi) helps, but remember it\'s directional - it must be pointed at the target station. The low angle may cause your signal to skip over closer stations.',
            antennaYagiDx: 'The Yagi is the king of DX antennas! High gain (8 dBi) focuses energy in one direction, and the very low takeoff angle (15°) is perfect for long-distance propagation. Point it at your target and enjoy the DX!',
            // Direction educational
            directionOnTarget: 'Your Yagi is pointed at the target - you get the full antenna gain! The narrow beam focuses your signal exactly where it needs to go.',
            directionSlightlyOff: 'Your Yagi is slightly off-target. You\'re losing some gain because the target isn\'t in the main beam. Try adjusting your beam heading.',
            directionSideOn: 'Your Yagi is nearly sideways to the target. Most of the gain is lost because directional antennas have very weak side lobes. Rotate your beam toward the target!',
            directionRearQuarter: 'Your Yagi is pointed mostly away from the target. You\'re receiving/transmitting through the back and side lobes, which are much weaker. Turn your antenna around!',
            directionBackwards: 'Your Yagi is pointed in the wrong direction! The antenna\'s front-to-back ratio means very little signal goes (or comes from) behind. Rotate your beam 180° toward the target.'
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
            },
            mogelDellinger: {
                name: 'Mögel-Dellinger Effect',
                insight: 'A solar flare has caused a sudden radio blackout! X-rays from the flare super-ionize the D layer, which then absorbs all HF signals on the sunlit side of Earth.',
                experiment: 'Try a path that goes through the night side - the Mögel-Dellinger effect only affects the day side!'
            },
            solarActivityQuiet: {
                name: 'Quiet Sun Conditions',
                insight: 'During quiet solar conditions, the ionosphere is less ionized. Higher frequency bands like {band} struggle because they need strong ionization to reflect.',
                experiment: 'Switch to a lower frequency band like 20m or 40m, which can reflect with weaker ionization.'
            },
            solarActivityActive: {
                name: 'Active Sun Conditions',
                insight: 'Active solar conditions supercharge the ionosphere! Higher frequency bands like {band} can now reach around the world.',
                experiment: 'Try even higher bands like 10m - they might be wide open during active conditions!'
            },
            solarStorm: {
                name: 'Geomagnetic Storm',
                insight: 'A geomagnetic storm is disrupting the ionosphere. Solar material hitting Earth\'s magnetic field creates chaotic conditions.',
                experiment: 'Wait for conditions to settle, or try very low bands at night which may still work.'
            },
            aurora: {
                name: 'Aurora Effect',
                insight: 'Aurora (Northern/Southern Lights) disrupts radio signals on polar paths! Charged particles entering Earth\'s magnetic field at high latitudes create ionospheric disturbances that cause the characteristic "aurora flutter" on HF signals.',
                experiment: 'Try a path that doesn\'t cross high latitudes - paths going east-west at lower latitudes avoid the auroral zone.'
            },
            sporadicE: {
                name: 'Sporadic E (Es)',
                insight: 'You\'re experiencing Sporadic E! Dense ionization patches form in the E layer, creating surprise openings on {band}. Es is most common in summer and enables contacts at 500-2000 km - distances that are normally in the "skip zone".',
                experiment: 'Try 10m or 15m during summer afternoons - you might catch an Es opening and work stations that are normally unreachable!'
            },
            longPath: {
                name: 'Long Path Propagation',
                insight: 'You discovered long path propagation! When the short path (direct route) is blocked by daylight absorption, polar aurora, or poor ionospheric conditions, signals can travel the "long way" around the globe. This path is longer but may cross more favorable conditions.',
                experiment: 'Try contacts to distant stations (Japan, Australia, New Zealand from Europe) - sometimes the long path works when short path fails. Compare both directions!'
            },
            shortVsLong: {
                name: 'Short vs Long Path',
                insight: 'Both short and long path work for this contact! The short path is the direct great-circle route, while the long path goes the other way around the Earth. DXers often compare both paths - sometimes one works much better than the other.',
                experiment: 'For very long contacts, try the same station at different times - you might find the preferred path changes during the day!'
            },
            skipZone: {
                name: 'Skip Zone (Dead Zone)',
                insight: 'You discovered the skip zone! This is the area between ground wave range (about 50-100 km) and where sky waves first return to Earth. Radio signals literally "skip" over this area - the ground wave fades out before the sky wave comes back down. The skip zone size depends on frequency: higher frequencies have larger skip zones.',
                experiment: 'Try a lower frequency band like 60m or 80m - these have shorter skip zones and can reach nearby stations via NVIS (Near Vertical Incidence Skywave).'
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
        muchWorse: '{oldBand} was working much better!',
        wasBetter: '{oldBand} was working better.',
        similar: 'Similar signal strength on both bands.',
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
                content: 'This is your overview of the world. You can see the day-night boundary, skip zones, and select targets for radio contacts. Zoom with mouse wheel, pan by dragging.'
            },
            your_location: {
                title: 'Your Location',
                content: 'The blue marker shows your location. You can change it using the location selector on the left - choose from presets or enter your own coordinates!'
            },
            location_selector: {
                title: 'Change Your Location',
                content: 'Here you can select your transmitting location. Choose from preset cities or enter custom coordinates with a name for your own QTH.'
            },
            day_night: {
                title: 'Day and Night',
                content: 'The dark area shows the night side of Earth. The ionosphere behaves very differently during day and night – this affects which bands work!'
            },
            grey_line: {
                title: 'The Grey Line',
                content: 'The narrow band between day and night is called the "grey line". Special conditions here can enable surprising long-distance contacts!'
            },
            skip_zone: {
                title: 'The Skip Zone',
                content: 'Notice the circle around your location? That\'s the skip zone - signals "jump over" this area! Higher bands have larger skip zones. The 60m band uses NVIS (straight up) to cover this gap.'
            },
            maidenhead_grid: {
                title: 'Maidenhead Grid',
                content: 'Use the Grid toggle to display the Maidenhead Locator System - a worldwide grid used by radio amateurs to describe locations. Each square (AA-RR) represents a specific area on Earth.'
            },
            bands_intro: {
                title: 'Frequency Bands',
                content: 'Here you select the frequency band. Each band has its own character – some work better during the day, others at night. Watch the skip zone change!'
            },
            select_band: {
                title: 'Select a Band',
                content: 'Click on the 20 meter band. It\'s a good all-rounder for long-distance contacts.'
            },
            power_intro: {
                title: 'Transmit Power',
                content: 'Select your power level: QRP (5W) for a challenge, Standard (100W) for normal operation, or High (1000W) for difficult paths. More power = longer range!'
            },
            antenna_intro: {
                title: 'Antenna Selection',
                content: 'Your antenna affects both gain and radiation angle. Dipole is versatile, Vertical has a low angle for DX, and Yagi offers high gain in one direction!'
            },
            antenna_yagi: {
                title: 'Yagi Direction',
                content: 'When using a Yagi antenna, you must point it toward your target! Select the beam direction using the compass buttons. Wrong direction = big signal loss!'
            },
            season_intro: {
                title: 'Season & Month',
                content: 'The month affects how much daylight your location gets! Winter means shorter days and longer nights. Summer means longer days. This affects propagation - the ionosphere changes with the seasons!'
            },
            time_intro: {
                title: 'Time Control',
                content: 'This slider lets you change the time of day. Watch how day and night move across the map!'
            },
            try_time: {
                title: 'Try It Out!',
                content: 'Drag the slider and observe how the day-night boundary shifts. The time is shown in UTC.'
            },
            solar_activity: {
                title: 'Solar Activity',
                content: 'The sun influences radio propagation. During high solar activity, higher bands (10m, 15m) work better. During quiet conditions, lower bands are more reliable.'
            },
            special_events: {
                title: 'Special Events',
                content: 'These buttons simulate special propagation events: Solar Flares cause radio blackouts, Aurora disrupts polar paths, and Sporadic E creates magic on higher bands!'
            },
            sporadic_e: {
                title: 'Sporadic E - The Magic!',
                content: 'Enable Sporadic E and try the 6m "Magic Band"! Es creates surprise openings to 1000-2000 km - distances normally unreachable. Most common in summer!'
            },
            first_contact: {
                title: 'Your First Contact',
                content: 'Now click on a location on the map to attempt a radio contact. Try somewhere on the day side! For very distant targets, the signal might take the long path around the Earth.'
            },
            results_intro: {
                title: 'Results',
                content: 'Here you can see the result of your contact attempt. Green means success, red means the signal didn\'t get through. Watch for short path vs long path!'
            },
            factors_explained: {
                title: 'Influencing Factors',
                content: 'These factors show you what affected the propagation: daylight, distance, power, antenna, skip zone, and more. Learn from them!'
            },
            experiment: {
                title: 'Experiment!',
                content: 'The best way to learn is by trying! Change power, switch antennas, try different bands and times. Can you reach the other side of the world with QRP?'
            },
            complete: {
                title: 'Tutorial Complete!',
                content: 'You now know the basics. Try the QRP challenge (5W), experiment with Yagi antennas, and discover the magic of grey line propagation. Have fun!'
            }
        }
    },

    // Help
    help: {
        title: 'Help - Shortwave Propagation',
        goal: {
            title: 'What is First Contact?',
            text: 'An interactive simulator showing how shortwave radio signals travel around the world. Learn by experimenting - click on cities to simulate radio contacts and discover what affects propagation!'
        },
        map: {
            title: 'The World Map',
            text: 'The map shows day and night in real-time. The ionosphere behaves differently depending on solar radiation. Use mouse wheel to zoom, drag to pan.',
            you: 'Your location (configurable)',
            cities: 'Other cities - click to connect',
            sun: 'Current sun position',
            greyline: 'Grey Line - twilight zone with special propagation',
            skipzone: 'Skip Zone - the circle around you where signals cannot reach',
            maidenhead: 'Maidenhead Grid - Toggle to show amateur radio grid locator squares (AA-RR). Used worldwide by radio amateurs to describe locations.'
        },
        location: {
            title: 'Your Location',
            text: 'You can change your transmitting location:',
            preset: 'Choose from 100+ preset cities worldwide',
            custom: 'Enter custom coordinates (latitude/longitude) with your own name',
            qth: 'Set up your real QTH (ham radio location) to simulate from home!'
        },
        bands: {
            title: 'Frequency Bands (11 Bands)',
            text: 'Each band has its own "personality":',
            '160m': 'Night only, completely absorbed during day - "Top Band"',
            '80m': 'Good at night, heavily absorbed during day',
            '60m': 'NVIS specialist - signals go straight up and back down (regional)',
            '40m': 'Versatile, often works day and night',
            '30m': 'WARC band - good compromise between 40m and 20m',
            '20m': 'The "workhorse" - good for long distances during day',
            '17m': 'WARC band - opens after 20m when ionization is strong',
            '15m': 'Needs good solar illumination',
            '12m': 'WARC band - like 10m but needs slightly less ionization',
            '10m': 'Only open with strong ionosphere',
            '6m': 'The "Magic Band" - comes alive with Sporadic E!'
        },
        power: {
            title: 'Transmit Power',
            text: 'Power affects your signal strength and range:',
            qrp: 'QRP (5W) - The ultimate challenge! Requires good conditions and patience. Real achievement when it works!',
            standard: 'Standard (100W) - Typical amateur radio power. Reliable for most contacts.',
            high: 'High (1000W) - Maximum legal power. Helps on difficult paths but won\'t overcome closed bands.'
        },
        antenna: {
            title: 'Antenna Selection',
            text: 'Your antenna dramatically affects performance:',
            dipole: 'Dipole - Balanced, versatile antenna. Good all-rounder with moderate gain. Works well for most situations.',
            vertical: 'Vertical - Low takeoff angle, excellent for DX (long distance). Less gain but reaches farther.',
            yagi: 'Yagi - High gain directional antenna. Must be pointed at target! Select beam direction with compass buttons. Wrong direction = major signal loss.',
            angle: 'Takeoff Angle - Lower angles reach farther (DX), higher angles for regional contacts (NVIS).'
        },
        skipZone: {
            title: 'Skip Zone',
            text: 'Radio waves bounce off the ionosphere at an angle. This creates a "skip zone" - an area around your location where signals cannot reach because they literally jump over it!',
            small: 'Lower bands (40m-160m) have small skip zones - good for regional contacts',
            large: 'Higher bands (10m-20m) have larger skip zones - better for distant contacts',
            nvis: '60m band uses NVIS (Near Vertical Incidence Skywave) - signals go straight up and back down, filling the skip zone!'
        },
        longPath: {
            title: 'Long Path Propagation',
            text: 'Signals can travel around the Earth in two directions:',
            short: 'Short Path - The direct, shorter route. Usually preferred.',
            long: 'Long Path - The longer way around the globe. Sometimes works when short path is blocked!',
            when: 'Try long path when: short path crosses the night side, or you want to avoid polar paths during aurora.'
        },
        solarActivity: {
            title: 'Solar Activity',
            text: 'The sun\'s activity dramatically affects radio propagation:',
            quiet: 'Quiet Sun - Lower bands work well, higher bands may be closed',
            normal: 'Normal - Typical conditions, good for learning',
            elevated: 'Elevated - Higher bands start opening more reliably',
            high: 'High - Excellent for 10m, 15m, even 6m via F-layer'
        },
        specialEvents: {
            title: 'Special Events',
            text: 'Simulate dramatic propagation events:',
            solarFlare: 'Solar Flare (Mögel-Dellinger) - X-rays cause sudden radio blackout on the sunlit side. Lower bands are affected first, severe flares black out all HF!',
            aurora: 'Aurora - Geomagnetic storms create the northern lights and disrupt radio paths crossing polar regions. Signals may flutter or disappear completely.',
            sporadicE: 'Sporadic E - Mysterious ionized clouds at ~100km altitude. Creates surprise openings on 6m (Magic Band!), 10m, and 15m over 1000-2000 km. Most common in summer!'
        },
        time: {
            title: 'Time Control',
            text: 'Use the time slider to simulate different times of day. Watch how propagation conditions change as day and night move across the Earth!'
        },
        season: {
            title: 'Season & Month',
            text: 'The month affects daylight hours and ionospheric conditions:',
            winter: 'Winter - Short days, long nights. Lower bands work better. Northern stations have very short daylight.',
            spring: 'Spring/Autumn - Transition periods. Day/night fairly balanced. Good for experimenting.',
            summer: 'Summer - Long days, short nights. Higher bands work better during extended daylight. Best time for Sporadic E!',
            hemisphere: 'Remember: When it\'s winter in the Northern Hemisphere, it\'s summer in the Southern Hemisphere!'
        },
        tips: {
            title: 'Pro Tips',
            tip1: {
                title: 'Grey Line Magic:',
                text: 'The twilight zone (boundary between day and night) often provides excellent propagation - signals can travel along this line with reduced absorption!'
            },
            tip2: {
                title: 'Sporadic E:',
                text: 'Enable Sporadic E and try the 6m "Magic Band" - it can suddenly open to 1000-2000 km distances. Real ham operators wait all year for these openings!'
            },
            tip3: {
                title: 'WARC Bands:',
                text: '30m, 17m and 12m are quieter bands without contests - often open when neighboring bands are marginal. Great for finding a path when main bands fail.'
            },
            tip4: {
                title: 'Follow the Sun:',
                text: 'Higher bands (10m-20m) follow the daylight. For DX to the other side of the world, there needs to be sunlight along the entire path!'
            },
            tip5: {
                title: 'Night Bands:',
                text: 'Lower bands (40m-160m) come alive after sunset. The D-layer disappears and signals can travel much farther with less absorption.'
            },
            tip6: {
                title: 'QRP Challenge:',
                text: 'Try making contacts with just 5 Watts! It requires patience and good conditions, but the satisfaction is immense. Start with 20m during good solar activity.'
            },
            tip7: {
                title: 'Yagi Advantage:',
                text: 'A Yagi antenna pointed at your target can make the difference between success and failure on difficult paths. But remember to turn it!'
            },
            tip8: {
                title: 'Long Path DX:',
                text: 'When the short path doesn\'t work, try the long path! It\'s especially useful for reaching stations on the opposite side of the Earth.'
            }
        }
    },

    // Footer
    footer: {
        imprint: 'Imprint',
        privacy: 'Privacy',
        github: 'GitHub'
    },

    // Imprint
    imprint: {
        title: 'Imprint',
        info: 'Information according to § 5 ECG and § 25 MedienG (Austrian law)',
        operator: 'Operator',
        operatorName: 'Michael Linder',
        operatorCallsign: 'OE8YML',
        operatorAddress: 'Nötsch 219, 9611 Nötsch',
        operatorCountry: 'Austria',
        contact: 'Contact',
        contactEmail: 'oe8yml@rednil.at',
        liability: {
            title: 'Liability for Content',
            text: 'The contents of this website have been created with the greatest care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. This website serves exclusively educational purposes and simulates shortwave propagation.'
        },
        copyright: {
            title: 'Copyright',
            text: 'The content and works created by the operator on this website are subject to Austrian copyright law. The source code is available under the MIT license on GitHub.'
        }
    },

    // Solar Weather Panel
    solarWeather: {
        panelTitle: 'Solar Weather & Radio Conditions',
        collapseHint: 'Click to collapse',
        expandHint: 'Click to expand',
        rating: {
            excellent: 'Excellent',
            good: 'Good',
            fair: 'Fair',
            poor: 'Poor',
            severe: 'Severe'
        },
        sunActivity: 'Sun Activity',
        sunPersonality: {
            quiet: 'The Sleepy Sun',
            normal: 'The Balanced Sun',
            active: 'The Energetic Sun',
            storm: 'The Angry Sun'
        },
        sunDescription: {
            quiet: 'Lower bands work better, higher bands may be closed',
            normal: 'Good conditions for most bands',
            active: 'Higher bands come alive! Great for DX',
            storm: 'Disturbed conditions, propagation unreliable'
        },
        recommendedBands: 'Recommended Bands',
        bandRating: {
            excellent: 'Excellent',
            good: 'Good',
            fair: 'Fair',
            poor: 'Poor',
            closed: 'Closed'
        },
        events: {
            solarFlare: 'Solar Flare',
            solarFlareEffect: 'HF blackout on day side',
            aurora: 'Aurora',
            auroraEffect: 'Polar paths disrupted',
            sporadicE: 'Sporadic E',
            sporadicEEffect: 'Magic Band openings!'
        },
        educationalNote: 'This panel shows how current solar conditions affect radio propagation. Higher solar activity opens higher bands but can also cause disturbances.'
    },

    // Privacy Policy
    privacy: {
        title: 'Privacy Policy',
        intro: 'The protection of your personal data is important to us. This privacy policy informs you about data processing on this website.',
        noData: {
            title: 'No Data Collection',
            text: 'This website is a pure client-side tool and does not collect, store, or process any personal data. There are:'
        },
        noDataList: {
            forms: 'No forms or user inputs',
            cookies: 'No cookies (except language preference in localStorage)',
            tracking: 'No tracking or analytics',
            server: 'No server-side data processing'
        },
        localStorage: {
            title: 'Local Storage',
            text: 'The only stored information is your language preference (German/English), which is saved locally in your browser. This data is not transmitted to servers and can be removed at any time by clearing browser data.'
        },
        cloudflare: {
            title: 'Cloudflare',
            text: 'This website is served via Cloudflare. Cloudflare may process technically necessary connection data. For more information, see Cloudflare\'s privacy policy.'
        },
        rights: {
            title: 'Your Rights',
            text: 'Since we do not collect personal data, the usual GDPR rights such as access, correction, or deletion do not apply. If you have questions, you can still contact us.'
        },
        contact: {
            title: 'Contact',
            text: 'For questions about data processing, contact:'
        }
    }
};
