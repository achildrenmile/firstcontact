/**
 * German (Deutsch) Translations
 */
export default {
    // Application
    app: {
        title: 'First Contact',
        subtitle: 'Deine Reise in die Welt der Kurzwelle',
        version: 'v0.1.0'
    },

    // Units
    units: {
        km: 'km',
        thousandKm: 'Tsd. km',
        meters: 'm',
        mhz: 'MHz'
    },

    // UI Labels
    ui: {
        selectBand: 'Band wählen',
        timeOfDay: 'Tageszeit (UTC)',
        currentConditions: 'Aktuelle Bedingungen',
        welcome: {
            title: 'Willkommen bei First Contact!',
            subtitle: 'Klicke auf einen Ort auf der Karte, um eine Funkverbindung zu versuchen.',
            gettingStarted: 'Erste Schritte',
            step1: 'Wähle ein Band aus den Steuerungen links',
            step2: 'Stelle die Tageszeit mit dem Schieberegler ein',
            step3: 'Klicke auf ein Ziel auf der Karte',
            step4: 'Schau, ob dein Signal durchkommt!'
        },
        timePresets: {
            dawn: 'Morgen',
            noon: 'Mittag',
            dusk: 'Abend',
            midnight: 'Mitternacht'
        },
        timePeriods: {
            dawn: '(Morgendämmerung)',
            morning: '(Vormittag)',
            midday: '(Mittag)',
            afternoon: '(Nachmittag)',
            dusk: '(Abenddämmerung)',
            evening: '(Abend)',
            night: '(Nacht)'
        },
        conditions: {
            yourLocation: 'Dein Standort:',
            localConditions: 'Lokale Bedingungen:',
            target: 'Ziel:',
            distance: 'Entfernung:',
            targetConditions: 'Bedingungen am Ziel:',
            solarIndicators: 'Sonnenindikatoren',
            solarFlux: 'Sonnenfluss:',
            sunspots: 'Sonnenflecken:',
            xrayActivity: 'Röntgen:',
            sfiLevels: {
                veryLow: '~70 (Sehr niedrig)',
                low: '~90 (Niedrig)',
                moderate: '~130 (Mäßig)',
                high: '~180 (Hoch)'
            },
            sunspotLevels: {
                minimal: 'Minimal',
                low: 'Niedrig',
                moderate: 'Mäßig',
                high: 'Hoch'
            },
            xrayLevels: {
                quiet: 'Ruhig',
                elevated: 'Erhöht',
                active: 'Aktiv',
                flaring: 'Eruption!'
            }
        },
        language: 'Sprache',
        you: 'DU',
        location: {
            title: 'Mein Standort',
            selectPreset: '-- Stadt wählen --',
            name: 'Name',
            namePlaceholder: 'z.B. Mein QTH',
            latitude: 'Breite',
            longitude: 'Länge',
            set: 'Setzen',
            custom: 'Eigener Standort'
        },
        solarActivity: 'Sonnenaktivität',
        mogelDellinger: {
            trigger: 'Sonneneruption simulieren',
            active: 'Sonneneruption aktiv!',
            hint: 'Löst einen Mögel-Dellinger Funkausfall aus'
        },
        aurora: {
            trigger: 'Aurora simulieren',
            active: 'Aurora aktiv!',
            hint: 'Löst Aurora-Störung auf Polarpfaden aus'
        },
        sporadicE: {
            trigger: 'Sporadic E',
            active: 'Es aktiv!',
            hint: 'Magic Band! Besonders 6m, auch 10m/15m'
        },
        buttons: {
            tutorial: 'Tutorial',
            tutorialTitle: 'Tutorial starten',
            help: 'Hilfe',
            helpTitle: 'Hilfe anzeigen'
        },
        power: {
            title: 'Sendeleistung',
            challengeMode: 'QRP Herausforderungsmodus!',
            levels: {
                qrp: {
                    name: 'QRP',
                    description: '5 Watt - Die ultimative Herausforderung! Schaffst du Verbindungen mit minimaler Leistung?'
                },
                standard: {
                    name: 'Standard',
                    description: '100 Watt - Typische Amateurfunk-Leistung für zuverlässige Verbindungen.'
                },
                high: {
                    name: 'High Power',
                    description: '1000 Watt - Maximale legale Leistung für schwierige Bedingungen.'
                }
            }
        },
        season: {
            title: 'Jahreszeit / Monat',
            months: {
                0: 'Januar',
                1: 'Februar',
                2: 'März',
                3: 'April',
                4: 'Mai',
                5: 'Juni',
                6: 'Juli',
                7: 'August',
                8: 'September',
                9: 'Oktober',
                10: 'November',
                11: 'Dezember'
            },
            seasons: {
                winter: 'Winter',
                spring: 'Frühling',
                summer: 'Sommer',
                autumn: 'Herbst'
            }
        },
        antenna: {
            title: 'Antennentyp',
            gain: 'Gewinn',
            angle: 'Abstrahlwinkel',
            direction: 'Strahlrichtung',
            directions: {
                N: 'Nord',
                NE: 'Nordost',
                E: 'Ost',
                SE: 'Südost',
                S: 'Süd',
                SW: 'Südwest',
                W: 'West',
                NW: 'Nordwest'
            },
            types: {
                dipole: {
                    name: 'Dipol',
                    description: 'Allrounder mit mittlerem Gewinn (2,15 dBi). Gut für NVIS und mittlere Entfernungen.'
                },
                vertical: {
                    name: 'Vertikal',
                    description: 'Flacher Abstrahlwinkel für DX. Omnidirektional - funktioniert in alle Richtungen.'
                },
                yagi: {
                    name: 'Yagi',
                    description: 'Hoher Gewinn (8 dBi), gerichtete Antenne. Ideal für DX, muss aufs Ziel ausgerichtet sein.'
                }
            }
        }
    },

    // HF Bands
    bands: {
        '160m': {
            name: '160 Meter',
            personality: 'Die Top-Band Herausforderung',
            tagline: 'Das ultimative Nacht-Abenteuer',
            simpleDescription: 'Funktioniert nur nachts. Tagsüber komplett absorbiert. Ein anspruchsvolles aber lohnendes Band.',
            detailedDescription: 'Das 160-Meter-Band, bekannt als "Top Band", nutzt sehr lange Radiowellen, die von der D-Schicht tagsüber fast vollständig absorbiert werden. Dieses Band erwacht erst nach Einbruch der Dunkelheit zum Leben, wenn die D-Schicht verschwindet. Es erfordert Geduld, gute Antennen und oft mehr Leistung, aber Verbindungen auf 160m sind besonders lohnend.',
            learningHint: 'Dieses Band zeigt dir, wie stark die D-Schicht-Absorption wirklich ist - probiere es bei Tag und Nacht!',
            bestTimeOfDay: 'nur nachts',
            typicalRange: 'regional bis kontinental nachts'
        },
        '80m': {
            name: '80 Meter',
            personality: 'Die Nachteule',
            tagline: 'Erwacht nach Einbruch der Dunkelheit',
            simpleDescription: 'Funktioniert am besten nachts, wird tagsüber absorbiert. Ideal für regionale Verbindungen.',
            detailedDescription: 'Das 80-Meter-Band nutzt relativ lange Radiowellen, die von der D-Schicht tagsüber wie ein Schwamm absorbiert werden. Aber wenn die Sonne untergeht und die D-Schicht verschwindet, erwacht dieses Band zum Leben! Es eignet sich hervorragend für Verbindungen innerhalb deines Kontinents, und in guten Nächten kann es noch viel weiter reichen.',
            learningHint: 'Probiere dieses Band nach Sonnenuntergang aus – beachte, wie es plötzlich besser funktioniert!',
            bestTimeOfDay: 'nachts',
            typicalRange: 'regional bis kontinental'
        },
        '60m': {
            name: '60 Meter',
            personality: 'Der NVIS-Spezialist',
            tagline: 'Signale, die geradeaus hochgehen und zurückkommen',
            simpleDescription: 'Gut für regionale Abdeckung. Signale springen fast senkrecht hoch und füllen nahegelegene Bereiche.',
            detailedDescription: 'Das 60-Meter-Band ist ausgezeichnet für NVIS (Near Vertical Incidence Skywave) Ausbreitung. Signale können fast senkrecht nach oben reisen und zurückreflektiert werden, was zuverlässige Abdeckung innerhalb von etwa 500 km ermöglicht. Dies füllt die "Skip-Zone", die andere Bänder verfehlen.',
            learningHint: 'Dieses Band zeigt, wie Signale fast senkrecht nach oben gehen können – ideal für nahegelegene Kontakte!',
            bestTimeOfDay: 'tagsüber für NVIS, nachts für weitere Entfernungen',
            typicalRange: 'regional (300-600 km)'
        },
        '40m': {
            name: '40 Meter',
            personality: 'Der zuverlässige Arbeiter',
            tagline: 'Nützlich bei Tag und Nacht',
            simpleDescription: 'Funktioniert tagsüber UND nachts. Das vielseitige Allround-Band.',
            detailedDescription: 'Das 40-Meter-Band ist das Arbeitspferd des Kurzwellenfunks. Tagsüber bietet es solide regionale Reichweite. Nachts, wenn die D-Schicht-Absorption abnimmt, können Signale viel weiter reisen. Viele Funker betrachten dies als das beste Band zum Lernen, weil es fast immer etwas zu bieten hat.',
            learningHint: 'Vergleiche die Reichweite bei Tag und Nacht – der Unterschied zeigt dir, wie die D-Schicht funktioniert!',
            bestTimeOfDay: 'jederzeit',
            typicalRange: 'regional am Tag, kontinental bei Nacht'
        },
        '30m': {
            name: '30 Meter',
            personality: 'Der stille Erfolgsbringer',
            tagline: 'Ein schmales Band mit großem Potenzial',
            simpleDescription: 'Ein schmales WARC-Band. Guter Kompromiss zwischen Tag- und Nachtleistung.',
            detailedDescription: 'Das 30-Meter-Band ist eines der WARC-Bänder zwischen 40m und 20m. Es kombiniert Eigenschaften beider: weniger D-Schicht-Absorption als 40m tagsüber, und eine niedrigere Frequenz als 20m – daher kann es nachts noch reflektieren, wenn die MUF fällt und 20m schließt. Beliebt für digitale Betriebsarten und CW.',
            learningHint: 'Beachte, wie dieses Band nachts noch funktioniert, wenn 20m bereits geschlossen ist – die niedrigere Frequenz braucht weniger Ionisation.',
            bestTimeOfDay: 'jederzeit – gut bei Tag und Nacht',
            typicalRange: 'kontinental bis interkontinental'
        },
        '20m': {
            name: '20 Meter',
            personality: 'Der Weltreisende',
            tagline: 'Dein Pass zu weltweiten Verbindungen',
            simpleDescription: 'Das klassische Weitstreckenband. Funktioniert, wenn irgendwo auf dem Pfad die Sonne scheint.',
            detailedDescription: 'Das 20-Meter-Band ist legendär für Weitstreckenverbindungen. Es braucht gute F-Schicht-Ionisation, was bedeutet, dass irgendwo auf deinem Signalpfad Tageslicht sein muss. Wenn die Bedingungen stimmen, kannst du um die Welt funken! Es wird weniger von der D-Schicht-Absorption beeinflusst als niedrigere Bänder.',
            learningHint: 'Dieses Band zeigt dir, wie Signale dem Tageslicht um die Erde folgen können.',
            bestTimeOfDay: 'tagsüber',
            typicalRange: 'kontinental bis weltweit'
        },
        '17m': {
            name: '17 Meter',
            personality: 'Das versteckte Juwel',
            tagline: 'Öffnet nach 20m bei stärkerer Ionisation',
            simpleDescription: 'Ein WARC-Band zwischen 20m und 15m. Öffnet nach 20m, wenn die Ionisation zunimmt.',
            detailedDescription: 'Das 17-Meter-Band liegt frequenzmäßig zwischen 20m und 15m. Es benötigt mehr Ionisation als 20m, öffnet daher morgens später und schließt abends früher. Als WARC-Band ohne Conteste ist es ruhiger. Wenn 20m gut offen ist, aber 15m noch mehr Ionisation braucht, bietet 17m oft die Brücke.',
            learningHint: 'Wenn 20m weit offen ist, prüfe 17m – es könnte auch offen sein, mit weniger Betrieb!',
            bestTimeOfDay: 'tagsüber bei guter Ionisation',
            typicalRange: 'kontinental bis weltweit'
        },
        '15m': {
            name: '15 Meter',
            personality: 'Der Schönwetter-Freund',
            tagline: 'Erstaunlich bei guten Bedingungen',
            simpleDescription: 'Braucht stärkere Ionisation. Exzellent bei guten Bedingungen, sonst still.',
            detailedDescription: 'Das 15-Meter-Band braucht eine gut ionisierte F-Schicht. Während der Jahre des Sonnenmaximums kann es spektakulär sein. In ruhigeren Zeiten öffnet es vielleicht nur für ein paar Stunden um die Mittagszeit. Wenn es funktioniert, bietet es ausgezeichnete Weitstrecken-Pfade mit relativ geringem Rauschen.',
            learningHint: 'Vergleiche mit 20m – beachte, wie dieses Band stärkere Bedingungen braucht.',
            bestTimeOfDay: 'mittags',
            typicalRange: 'weltweit, wenn offen'
        },
        '12m': {
            name: '12 Meter',
            personality: 'Der zuverlässige Cousin',
            tagline: 'Wie 10m, aber nachsichtiger',
            simpleDescription: 'Ein WARC-Band, das oft funktioniert, wenn 10m marginal ist. Braucht etwas weniger Ionisation.',
            detailedDescription: 'Das 12-Meter-Band ist das höchste WARC-Band, direkt unter 10m. Es braucht etwas weniger Ionisation als 10m, daher öffnet es oft früher und bleibt länger offen. Wenn 10m marginal ist, probiere 12m!',
            learningHint: 'Wenn 10m tot scheint, probiere 12m – es braucht etwas weniger Ionisation.',
            bestTimeOfDay: 'mittags, braucht gute Ionisation',
            typicalRange: 'weltweit, wenn offen'
        },
        '10m': {
            name: '10 Meter',
            personality: 'Der spektakuläre Performer',
            tagline: 'Wenn es öffnet, geschieht Magie',
            simpleDescription: 'Braucht starke Ionisation. Entweder weit offen oder komplett tot.',
            detailedDescription: 'Das 10-Meter-Band liegt am Rand dessen, was die Ionosphäre reflektieren kann. Es braucht exzellente Bedingungen – typischerweise um das Sonnenmaximum herum – um für weite Strecken zu funktionieren. Aber wenn es öffnet, können Signale mit überraschend wenig Leistung um die Welt reisen. Es lehrt dich, dass die Ionosphäre Grenzen hat.',
            learningHint: 'Dieses Band zeigt dir, dass höhere Frequenzen stärkere Ionisation brauchen, um reflektiert zu werden.',
            bestTimeOfDay: 'mittags bei hoher Sonnenaktivität',
            typicalRange: 'weltweit oder gar nichts'
        },
        '6m': {
            name: '6 Meter',
            personality: 'Das Magic Band',
            tagline: 'Unvorhersehbar, aufregend, magisch',
            simpleDescription: 'Das "Magic Band"! Normalerweise ruhig, kann aber plötzlich via Sporadic E oder bei Sonnenmaximum öffnen.',
            detailedDescription: 'Das 6-Meter-Band lebt an der Grenze zwischen KW und UKW. Meistens ist es ruhig – Signale durchdringen einfach die Ionosphäre ins All. Aber wenn Sporadic-E-Wolken sich bilden oder bei hoher Sonnenaktivität, kann dieses Band plötzlich mit starken Signalen über 1000-2000 km zum Leben erwachen. Es heißt "Magic Band", weil Öffnungen unvorhersehbar und aufregend sind!',
            learningHint: 'Prüfe dieses Band im Sommer – Sporadic E kann magische Öffnungen erzeugen!',
            bestTimeOfDay: 'Sommernachmittage für Es, mittags bei Sonnenmaximum',
            typicalRange: 'nichts oder 1000-2000 km via Es'
        }
    },

    // Ionospheric Layers
    layers: {
        D: {
            name: 'D-Schicht',
            role: 'Absorber',
            simpleDescription: 'Der "Signal-Schwamm" – saugt niedrigere Frequenzen tagsüber auf',
            educationalAnalogy: 'Denke daran wie Nebel auf einer Straße – er blockiert deine Scheinwerfer tagsüber, aber er lichtet sich nachts.'
        },
        E: {
            name: 'E-Schicht',
            role: 'Reflektor',
            simpleDescription: 'Der "regionale Reflektor" – reflektiert Signale für mittlere Entfernungen',
            educationalAnalogy: 'Wie einen Ball von einer niedrigen Decke abprallen – er kommt schnell und in der Nähe zurück.'
        },
        F: {
            name: 'F-Schicht',
            role: 'Reflektor',
            simpleDescription: 'Der "Weitstrecken-Reflektor" – ermöglicht Verbindungen um die Welt',
            educationalAnalogy: 'Wie einen Ball von einer hohen Turnhallendecke abprallen – er legt viel mehr Strecke zurück, bevor er zurückkommt.'
        }
    },

    // Solar Activity
    solarActivity: {
        quiet: {
            name: 'Ruhig',
            simpleDescription: 'Niedrige Sonnenaktivität. Niedrigere Bänder funktionieren besser, höhere Bänder können geschlossen sein.',
            learningHint: 'Beachte, wie 10m und 15m bei ruhiger Sonne oft "tot" sind.'
        },
        normal: {
            name: 'Normal',
            simpleDescription: 'Durchschnittliche Sonnenaktivität. Gute Bedingungen für die meisten Bänder.',
            learningHint: 'Dies ist die beste Kondition zum Lernen – die Ausbreitung ist vorhersagbar.'
        },
        active: {
            name: 'Aktiv',
            simpleDescription: 'Hohe Sonnenaktivität. Höhere Bänder erwachen zum Leben! Aber achte auf Störungen.',
            learningHint: 'Probiere jetzt 10m und 15m – sie könnten für weltweite Verbindungen weit offen sein!'
        },
        storm: {
            name: 'Sturm',
            simpleDescription: 'Gestörte Bedingungen. Ausbreitung ist unzuverlässig oder blockiert.',
            learningHint: 'Bei Stürmen kann die Ausbreitung komplett unvorhersagbar sein. Versuche es später noch einmal!'
        }
    },

    // Mögel-Dellinger Effect
    mogelDellinger: {
        name: 'Mögel-Dellinger-Effekt',
        alternateNames: 'Auch bekannt als: Plötzliche ionosphärische Störung (SID), Funkausfall',
        simpleDescription: 'Eine Sonneneruption verursacht plötzlichen Funkausfall auf der Tagseite der Erde.',
        detailedDescription: 'Wenn eine Sonneneruption ausbricht, erreichen Röntgenstrahlen die Erde in 8 Minuten und überionisieren die D-Schicht. Dies verwandelt die D-Schicht in einen vollständigen Funkabsorber und blockiert alle KW-Signale auf der sonnenbeschienenen Seite der Erde. Benannt nach den deutschen Wissenschaftlern Hans Mögel und Josef Dellinger, die dies in den 1930er Jahren entdeckten.',
        symptoms: {
            title: 'Woran erkennst du ihn:',
            list: [
                'Plötzliches komplettes Ausbleiben von Signalen',
                'Betrifft nur die Tagseite des Pfades',
                'Niedrigere Frequenzen stärker betroffen',
                'Allmähliche Erholung über 15-120 Minuten',
                'Nachtseiten-Pfade funktionieren weiterhin'
            ]
        },
        learningHint: 'Wenn KW tagsüber plötzlich ausfällt, aber nachts funktioniert – könnte es ein Mögel-Dellinger-Ereignis sein!'
    },

    // Aurora Effect
    aurora: {
        name: 'Aurora',
        alternateNames: 'Auch bekannt als: Nordlicht, Südlicht, Aurora Borealis, Aurora Australis, Polarlicht',
        simpleDescription: 'Aurora stört Funksignale, die Polarregionen kreuzen, mit charakteristischem Flattern und Absorption.',
        detailedDescription: 'Aurora entsteht, wenn geladene Teilchen von der Sonne in das Erdmagnetfeld an den Polen eindringen. Diese Teilchen erzeugen die wunderschönen Nord- und Südlichter, aber auch erhebliche ionosphärische Störungen. Für den KW-Funk bedeutet dies Probleme bei Pfaden über hohe Breiten – Signale werden rau (Aurora-Flattern) oder können komplett blockiert werden.',
        symptoms: {
            title: 'Woran erkennst du sie:',
            list: [
                'Raue, brummende Signalqualität (Aurora-Flattern)',
                'Signale schwinden und kehren schnell zurück',
                'Betrifft nur polare oder hochbreitige Pfade',
                'Nicht-polare Pfade funktionieren normal',
                'Oft bei geomagnetischen Sturmwarnungen'
            ]
        },
        learningHint: 'Wenn Signale zu nördlichen Regionen rau klingen oder verschwinden – prüfe die Aurora-Aktivität!'
    },

    // Sporadic E Effect
    sporadicE: {
        name: 'Sporadic E',
        alternateNames: 'Auch bekannt als: Es, E-Skip, Short Skip, Überreichweiten',
        simpleDescription: 'Dichte Ionisationsflecken in der E-Schicht erzeugen überraschende Öffnungen auf höheren Bändern.',
        detailedDescription: 'Sporadic E ist eines der aufregendsten Phänomene im Amateurfunk! Dichte Ionisationsflecken bilden sich in der E-Schicht (ca. 110 km Höhe) und erzeugen eine reflektierende Fläche für höhere Frequenzen, die normalerweise durchdringen würden. Dies ermöglicht Kontakte über 500-2300 km – oft in der "Skip-Zone", die normalerweise unerreichbar ist.',
        symptoms: {
            title: 'Woran erkennst du es:',
            list: [
                'Plötzlich starke Signale auf 10m oder 15m',
                'Stationen in mittlerer Entfernung (500-2000 km)',
                'Signale können schnell erscheinen und verschwinden',
                'Am häufigsten an Sommernachmittagen',
                'Höhere Bänder öffnen, die normalerweise tot sind'
            ]
        },
        learningHint: 'Wenn 10m plötzlich zu Stationen in 1000-2000 km Entfernung im Sommer öffnet – du erlebst vielleicht Sporadic E!'
    },

    // Layer States
    layerStates: {
        dLayerAbsent: '{layer} ist größtenteils abwesend (Nachtbedingungen)',
        dLayerPartial: '{layer} ist teilweise gebildet (Dämmerung/schwache Sonne)',
        dLayerModerate: '{layer} ist mäßig aktiv',
        dLayerFull: '{layer} ist voll entwickelt (starkes Sonnenlicht)'
    },

    // Lighting Conditions
    lighting: {
        day: {
            description: 'Volles Tageslicht',
            educational: 'Die D-Schicht ist voll ionisiert und wird niedrigere Frequenzsignale absorbieren.'
        },
        dayLow: {
            description: 'Tagsüber (Sonne tief)',
            educational: 'Die Sonne steht tief, aber die D-Schicht ist noch etwas aktiv.'
        },
        civilTwilight: {
            description: 'Bürgerliche Dämmerung (Grauzone)',
            educational: 'Die Grauzone! Die D-Schicht verblasst, aber die F-Schicht ist noch ionisiert – ausgezeichnete Ausbreitungsbedingungen!'
        },
        nauticalTwilight: {
            description: 'Nautische Dämmerung',
            educational: 'Die D-Schicht ist verschwunden. Niedrige Frequenzbänder erwachen zum Leben.'
        },
        astronomicalTwilight: {
            description: 'Astronomische Dämmerung',
            educational: 'Tiefe Dämmerung – die Ionosphäre wechselt zu Nachtbedingungen.'
        },
        night: {
            description: 'Nacht',
            educational: 'Volle Nacht. Die D-Schicht ist weg, aber die F-Schicht bleibt mit reduzierter Stärke bestehen.'
        }
    },

    // Grey Line
    greyLine: {
        inZone: 'In der Grauzone',
        daytime: 'Tagszeit',
        nighttime: 'Nachtzeit',
        educational: 'Du bist in der Grauzone! Die D-Schicht ist schwach, aber die F-Schicht ist noch ionisiert. Diese Dämmerungszone ist berühmt dafür, Weitstrecken-Verbindungen zu ermöglichen, die bei vollem Tag oder voller Nacht nicht funktionieren würden.'
    },

    // Propagation Results
    propagation: {
        // Headlines
        headlines: {
            strongConnection: 'Starke Verbindung zu {target}!',
            reached: 'Du hast {target} erreicht',
            weakSuccess: 'Schwache aber erfolgreiche Verbindung mit {target}',
            notReachable: '{target} ist im Moment nicht erreichbar'
        },

        // Signal Quality
        quality: {
            excellent: 'Ausgezeichnet',
            good: 'Gut',
            fair: 'Ausreichend',
            weak: 'Schwach aber lesbar',
            notReadable: 'Nicht lesbar',
            blackout: 'Funkausfall!',
            auroraFlutter: 'Aurora-Flattern!',
            skipZone: 'In der Totzone!'
        },

        // Mögel-Dellinger messages
        mogelDellinger: {
            blackout: 'Funkausfall! Eine Sonneneruption hat einen Mögel-Dellinger-Effekt verursacht. {band}-Signale werden auf der Tagseite absorbiert.',
            severeBlackout: 'Kompletter KW-Funkausfall durch Sonneneruption!',
            moderateBlackout: 'Starke D-Schicht-Absorption durch Sonneneruption betrifft {band}',
            minorBlackout: 'Sonneneruption verursacht erhöhte Absorption auf {band}',
            minorEffect: 'Geringer Sonneneruptionseffekt auf {band}'
        },

        // Solar Activity messages
        solarActivity: {
            quietHighBand: 'Ruhige Sonne – {band} braucht mehr Ionisation',
            activeHighBand: 'Aktive Sonne verstärkt {band}-Ausbreitung!',
            activeLowBand: 'Aktive Sonne erhöht D-Schicht-Absorption auf {band}',
            storm: 'Geomagnetischer Sturm stört Ionosphäre'
        },

        // Aurora messages
        aurora: {
            blocked: 'Polarpfad durch Aurora-Aktivität blockiert!',
            severeFlutter: 'Starkes Aurora-Flattern beeinträchtigt {band} auf Polarpfad',
            moderateFlutter: 'Moderate Aurora-Störung auf {band}',
            minorFlutter: 'Leichtes Aurora-Flattern auf {band}'
        },

        // Sporadic E messages
        sporadicE: {
            excellent: 'Ausgezeichnete Sporadic-E-Öffnung auf {band}!',
            good: 'Gute Sporadic-E-Bedingungen für {band}',
            moderate: 'Moderate Es-Aktivität verstärkt {band}'
        },

        // Skip Zone messages
        skipZone: {
            groundWave: 'Bodenwellen-Verbindung bei {distance} km',
            inSkipZone: '{band}-Signale erreichen {distance} km nicht - in der Totzone! Raumwelle kehrt erst bei {skipMin} km zurück.',
            nearGroundWaveEdge: '{band} bei {distance} km ist knapp außerhalb der Bodenwellen-Reichweite - schwache Signale möglich',
            nearSkyWaveEdge: '{band} bei {distance} km ist nahe am Raumwellen-Rückkehrpunkt ({skipMin} km) - marginale Signale'
        },

        // Signal meter
        signalLabel: 'Signal: {quality} ({value}%)',

        // Path types
        pathTypes: {
            singleHop: 'Einfach-Sprung-Pfad',
            multiHop: '{count}-Sprung-Pfad',
            longMultiHop: 'Langer {count}-Sprung-Pfad',
            failed: 'Fehlgeschlagener Pfad'
        },

        // Short path vs long path
        pathType: {
            short: 'Short Path',
            long: 'Long Path'
        },

        // Path comparison messages
        pathComparison: {
            onlyShortWorks: 'Nur der Short Path funktioniert unter aktuellen Bedingungen.',
            onlyLongWorks: 'Der Long Path funktioniert, während der Short Path blockiert ist!',
            neitherWorks: 'Weder Short noch Long Path funktionieren unter aktuellen Bedingungen.',
            longPathBetter: 'Long Path ({longStrength}%) ist deutlich besser als Short Path ({shortStrength}%).',
            shortPathBetter: 'Short Path ({shortStrength}%) ist besser als Long Path ({longStrength}%).'
        },

        // Long path descriptions
        longPath: {
            veryLongDistance: 'Sehr lange Pfaddistanz - Signalabschwächung über extreme Entfernung',
            longDistance: 'Lange Pfaddistanz - zusätzliche Signaldämpfung',
            moderateDistance: 'Long Path fügt Distanz hinzu, kann aber Hindernisse umgehen'
        },

        // Factor names
        factors: {
            dLayerAbsorption: 'D-Schicht-Absorption',
            fLayerReflection: 'F-Schicht-Reflexion',
            greyLineEffect: 'Grauzoneneffekt',
            pathGeometry: 'Pfadgeometrie',
            power: 'Sendeleistung',
            antenna: 'Antenne',
            direction: 'Strahlrichtung'
        },

        // Antenna effect messages
        antenna: {
            dipoleNvis: 'Dipolantenne - guter Kompromiss für NVIS',
            dipoleMedium: 'Dipolantenne - ausgewogene Leistung',
            dipoleDx: 'Dipolantenne - moderate DX-Fähigkeit',
            verticalNvis: 'Vertikalantenne - schlecht für NVIS (flacher Abstrahlwinkel)',
            verticalMedium: 'Vertikalantenne - flacher Winkel hilft bei mittleren Entfernungen',
            verticalDx: 'Vertikalantenne - exzellenter flacher Winkel für DX',
            yagiNvis: 'Yagi-Antenne - schlecht für NVIS (sehr flacher Abstrahlwinkel)',
            yagiMedium: 'Yagi-Antenne - hoher Gewinn hilft bei mittleren Entfernungen',
            yagiDx: 'Yagi-Antenne - beste Wahl für DX (hoher Gewinn, flacher Winkel)'
        },

        // Power effect messages
        power: {
            qrpImpact: '-13 dB',
            qrpDescription: 'QRP (5W) - Schwaches Signal, anspruchsvolle Bedingungen',
            standardImpact: '0 dB',
            standardDescription: 'Standardleistung (100W) - Normaler Signalpegel',
            highImpact: '+10 dB',
            highDescription: 'High Power (1kW) - Starkes Signal, bessere Reserve'
        },

        // Direction effect messages (for Yagi)
        direction: {
            onTarget: 'Yagi aufs Ziel ausgerichtet (Peilung {bearing}°) - voller Gewinn',
            slightlyOff: 'Yagi {diff}° neben dem Ziel - {penalty} dB Verlust',
            sideOn: 'Yagi fast seitlich zum Ziel ({diff}° daneben) - {penalty} dB Verlust',
            rearQuarter: 'Yagi Rückseite ({diff}° vom Ziel) - {penalty} dB Verlust',
            backwards: 'Yagi zeigt weg vom Ziel ({diff}° daneben) - {penalty} dB Verlust',
            unknown: 'Yagi-Richtung unbekannt'
        },

        // Factor impacts
        impacts: {
            helps: 'Hilft',
            hinders: 'Hindert',
            neutral: 'Neutral'
        },

        // Factor descriptions
        factorDescriptions: {
            heavyAbsorption: 'Starke D-Schicht-Absorption blockiert {band}-Signale',
            moderateAbsorption: 'Mäßige D-Schicht-Absorption schwächt Signale',
            minorAbsorption: 'Geringe D-Schicht-Absorption',
            minimalAbsorption: 'Minimale Absorption – D-Schicht ist schwach oder abwesend',
            cannotReflect: 'F-Schicht zu schwach, um {band}-Signale zu reflektieren',
            excellentReflection: 'Ausgezeichnete F-Schicht-Reflexion',
            adequateReflection: 'Ausreichende F-Schicht-Reflexion',
            weakReflection: 'Schwache F-Schicht-Reflexion',
            strongGreyLine: 'Starke Grauzonenverstärkung!',
            greyLineEnhancement: 'Grauzonenverstärkung',
            touchesGreyLine: 'Berührt Grauzone',
            distanceTooFar: 'Entfernung zu weit für {band}',
            singleHopPath: 'Einfach-Sprung-Pfad',
            multiHopPath: '{count}-Sprung-Pfad'
        },

        // Educational explanations
        educational: {
            absorptionHigh: '{band} verwendet niedrigere Frequenzen, die von der tageszeitlichen D-Schicht stark absorbiert werden. Probiere dieses Band nach Sonnenuntergang, wenn die D-Schicht verschwindet!',
            absorptionModerate: 'Die D-Schicht absorbiert einen Teil deiner Signalenergie. Niedrigere Frequenzbänder sind stärker betroffen als höhere.',
            absorptionLow: 'Es gibt etwas D-Schicht-Absorption, aber {band} hat eine hohe genug Frequenz, um sie größtenteils zu vermeiden.',
            absorptionMinimalNight: 'Es ist Nacht entlang des größten Teils des Pfades, also ist die D-Schicht verschwunden. Niedrige Frequenzbänder können jetzt frei reisen!',
            absorptionMinimalFreq: '{band} wird bei dieser Frequenz größtenteils nicht von der D-Schicht-Absorption beeinflusst.',
            cannotReflect: 'Bei {freq} MHz braucht {band} stärkere Ionisation als derzeit vorhanden. Das Signal durchdringt die Ionosphäre ins All, anstatt zur Erde zurückreflektiert zu werden. Probiere ein niedrigeres Frequenzband oder warte auf mehr Sonnenlicht auf dem Pfad.',
            excellentReflection: 'Die F-Schicht ist gut ionisiert und reflektiert {band}-Signale effizient. Gute Ionisation wie diese tritt auf, wenn die Sonne die Ionosphäre beleuchtet.',
            adequateReflection: 'Die F-Schicht hat genug Ionisation, um {band}-Signale zu reflektieren, wenn auch nicht mit Spitzeneffizienz.',
            weakReflection: 'Die F-Schicht-Ionisation ist marginal für {band}. Signale werden möglicherweise schwach oder intermittierend reflektiert.',
            greyLineStrong: 'Mehr als die Hälfte deines Signalpfades verläuft durch die Grauzone! Dieser Dämmerungsstreifen hat einzigartige Eigenschaften: Die D-Schicht ist verblasst (reduzierte Absorption), während die F-Schicht noch etwas Ionisation behält (ermöglicht Reflexion). Diese Kombination kann bemerkenswerte Weitstrecken-Verbindungen ermöglichen.',
            greyLineModerate: 'Dein Signalpfad durchquert die Grauzone, was die Ausbreitung verbessern kann. Die Grauzone ist die Grenze zwischen Tag und Nacht, wo besondere Bedingungen herrschen.',
            greyLineLight: 'Ein Teil deines Pfades berührt die Grauzone, was eine gewisse Verstärkung bieten kann.',
            distanceTooFar: 'Dieser {distance} km Pfad würde {idealHops} Sprünge erfordern, aber {band}-Signale können typischerweise nur {maxHops} Sprünge aufrechterhalten, bevor sie zu schwach werden. Höhere Frequenzbänder können weiter pro Sprung reisen, weil sie in steileren Winkeln reflektieren.',
            singleHopPath: 'Dies ist ein Einfach-Sprung-Pfad – das Signal springt einmal von der Ionosphäre ab. Einfach-Sprung-Pfade sind im Allgemeinen die zuverlässigsten.',
            multiHopPath: 'Dieser Pfad erfordert {count} Sprünge von der Ionosphäre. Jeder Sprung verliert etwas Signalstärke, aber dies ist ein vernünftiger Pfad.',
            longMultiHopPath: 'Dieser Pfad erfordert {count} Sprünge, was ziemlich lang ist. Jede ionosphärische Reflexion verliert Signalstärke, so dass Mehr-Sprung-Pfade schwach oder unzuverlässig sein können.',
            // Mögel-Dellinger educational
            mogelDellingerSevere: 'Dies ist ein Mögel-Dellinger-Effekt! Eine Sonneneruption hat Röntgenstrahlen zur Erde gesendet, die die D-Schicht überionisieren. Alle KW-Signale auf der sonnenbeschienenen Seite werden vollständig absorbiert. Dieser Effekt dauert typischerweise 15-120 Minuten. Probiere einen Pfad durch die Nachtseite!',
            mogelDellingerModerate: 'Eine Sonneneruption verursacht verstärkte D-Schicht-Absorption. Niedrigere Frequenzbänder sind am stärksten betroffen. Der Effekt wird in der nächsten Stunde allmählich nachlassen.',
            mogelDellingerMinor: '{band} erfährt etwas zusätzliche Absorption durch Sonneneruptionsaktivität, aber höhere Frequenzen sind weniger betroffen.',
            // Solar activity educational
            solarQuietHighBand: '{band} braucht starke F-Schicht-Ionisation, um Signale zu reflektieren. Bei ruhigen Sonnenbedingungen ist die Ionosphäre schwächer und höhere Frequenzen durchdringen oft ins All, anstatt zurückreflektiert zu werden.',
            solarActiveHighBand: 'Aktive Sonnenbedingungen erzeugen starke F-Schicht-Ionisation – perfekt für {band}! Die höheren Frequenzen, die normalerweise kämpfen, können jetzt effizient für weltweite Verbindungen reflektieren.',
            solarActiveLowBand: 'Bei aktiven Sonnenbedingungen ist auch die D-Schicht stärker ionisiert, was mehr Absorption von niedrigeren Frequenzen wie {band} tagsüber bedeutet.',
            solarStorm: 'Geomagnetische Stürme stören die geordnete Struktur der Ionosphäre. Die Ausbreitung wird unvorhersagbar – Signale können ein- und ausfaden, oder die Ionosphäre kann völlig unzuverlässig werden. Warte, bis sich die Bedingungen beruhigen.',
            // Aurora educational
            auroraSevere: 'Starke Aurora-Aktivität blockiert diesen Polarpfad! Geladene Teilchen von der Sonne erzeugen intensive ionosphärische Störungen in hohen Breiten. Signale werden extrem verzerrt oder komplett absorbiert. Versuche einen Pfad, der die Polarregion vermeidet.',
            auroraModerate: 'Moderate Aurora-Aktivität verursacht Signalverzerrung auf diesem Polarpfad. Das charakteristische "Aurora-Flattern" – ein raues, brummendes Signal – macht die Signale schwer lesbar. {band}-Signale über hohe Breiten sind besonders betroffen.',
            auroraMinor: 'Leichte Aurora-Aktivität ist auf diesem Pfad erkennbar. {band}-Signale, die Polarregionen kreuzen, können etwas Flattern oder Schwund aufweisen. Dies ist bei erhöhter geomagnetischer Aktivität normal.',
            // Sporadic E educational
            sporadicEExcellent: 'Ausgezeichnete Sporadic-E-Bedingungen! Dichte Ionisationsflecken in der E-Schicht erzeugen eine reflektierende Oberfläche für {band}. Dieser {distance} km Pfad ist perfekt für Es – erwarte starke Signale! Es ist am häufigsten im Sommer.',
            sporadicEGood: 'Gute Sporadic-E-Aktivität verstärkt die {band}-Ausbreitung. Die E-Schicht (etwa 110 km Höhe) hat dichte Ionisationsflecken entwickelt, die höhere Frequenzen reflektieren können. Das ist die "Sommermagie", die Funkamateure lieben!',
            sporadicEModerate: 'Etwas Sporadic-E-Aktivität ist vorhanden und gibt {band} einen Schub. Es erzeugt kürzere Öffnungen (500-2000 km) im Vergleich zur F-Schicht-Ausbreitung, weil die E-Schicht niedriger liegt.',
            // Long path educational
            longPathVeryLong: 'Dies ist ein extrem langer Pfad mit über 30.000 km rund um den Globus. Jeder zusätzliche Sprung schwächt das Signal erheblich. Long Path ist einen Versuch wert, wenn die Short Path Bedingungen schlecht sind.',
            longPathLong: 'Der Long Path legt über 25.000 km zurück – mehr als die halbe Erde in die "falsche" Richtung. Trotz der zusätzlichen Distanz kann dies funktionieren, wenn der Short Path ungünstige Bedingungen kreuzt.',
            longPathModerate: 'Der Long Path fügt erhebliche Distanz hinzu, umgeht aber die Hindernisse, die den Short Path blockieren. Die andere Route kann bessere ionosphärische Bedingungen kreuzen.',
            // Skip zone educational
            groundWave: 'Bei sehr kurzen Entfernungen breiten sich Signale entlang des Bodens aus (Bodenwelle). Dies funktioniert unabhängig von ionosphärischen Bedingungen, ist aber auf etwa 50-100 km beschränkt, abhängig von Frequenz und Gelände.',
            skipZoneDeep: 'Du bist in der "Totzone" (Skip Zone)! Die Bodenwelle von {band} reicht nur etwa {groundMax} km, aber die Raumwelle kehrt erst bei etwa {skipMin} km zur Erde zurück. Signale überspringen diesen Bereich buchstäblich – daher der Name "Skip Zone"!',
            skipZoneNearGround: 'Du bist knapp außerhalb der Bodenwellen-Reichweite für {band}. Einige schwache Signale könnten über Streuung oder NVIS noch ankommen, aber zuverlässige Kommunikation erfordert entweder nähere oder weitere Entfernungen.',
            skipZoneNearSky: 'Du bist nahe am Punkt, wo {band}-Raumwellen zur Erde zurückkehren. Signale sind marginal – manchmal kommen sie durch, manchmal nicht. Gehe weiter weg für zuverlässigere Raumwellen-Ausbreitung.',
            // Power educational
            powerQrp: 'QRP (5 Watt) ist die ultimative Herausforderung im Amateurfunk! Mit 13 dB weniger Signal als Standardleistung werden marginale Pfade unmöglich. Aber QRP-Erfolge sind unglaublich lohnend – du erreichst mehr mit weniger!',
            powerStandard: 'Standardleistung (100 Watt) bietet eine gute Balance zwischen Signalstärke und Geräteanforderungen. Dies ist der typische Leistungspegel für die meisten Amateurfunkverbindungen.',
            powerHigh: 'High Power (1000 Watt) gibt dir einen 10 dB Vorteil gegenüber Standardleistung. Diese zusätzliche Reserve kann den Unterschied auf marginalen Pfaden oder beim Kampf gegen Absorption ausmachen. Aber denk daran: Gute Antennen sind oft effektiver als rohe Leistung!',
            // Antenna educational
            antennaDipoleNvis: 'Die Dipolantenne strahlt in moderaten Winkeln ab (ca. 35°), was sie zu einem guten Allrounder macht. Bei kurzen Entfernungen unter 500 km funktioniert ihr höherer Abstrahlwinkel gut für NVIS (Signale, die fast senkrecht nach oben und zurück reflektieren).',
            antennaDipoleMedium: 'Bei mittleren Entfernungen leistet die Dipolantenne als Kompromiss gute Arbeit. Ihr moderater Abstrahlwinkel funktioniert sowohl für regionale als auch für einige DX-Verbindungen.',
            antennaDipoleDx: 'Für DX (Weitstrecke) hat der Dipol moderate Fähigkeiten. Obwohl er etwas Gewinn hat (2,15 dBi), bedeutet sein höherer Abstrahlwinkel, dass etwas Energie in steileren Winkeln abgestrahlt wird als ideal für maximale Entfernung.',
            antennaVerticalNvis: 'Die Vertikalantenne strahlt in sehr flachen Winkeln ab (ca. 20°), was schlecht für NVIS-Verbindungen ist. Signale gehen zum Horizont statt nach oben, was es schwer macht, nahegelegene Stationen zu erreichen.',
            antennaVerticalMedium: 'Bei mittleren Entfernungen beginnt der flache Abstrahlwinkel der Vertikalantenne nützlich zu werden. Sie ist omnidirektional, du musst sie also nicht auf dein Ziel ausrichten.',
            antennaVerticalDx: 'Die Vertikalantenne glänzt bei DX! Ihr flacher Abstrahlwinkel (20°) sendet die meiste Energie zum Horizont – perfekt für Weitstrecken-Skip. Omnidirektional bedeutet, du kannst in alle Richtungen arbeiten.',
            antennaYagiNvis: 'Die Yagi-Antenne ist schlecht für NVIS geeignet. Ihr sehr flacher Abstrahlwinkel (15°) und das Richtdiagramm bedeuten, dass Energie zum Horizont gesendet wird, nicht nach oben für nahegelegene Kontakte.',
            antennaYagiMedium: 'Bei mittleren Entfernungen hilft der hohe Gewinn der Yagi (8 dBi), aber denk daran, sie ist direktional – sie muss auf die Zielstation ausgerichtet sein. Der flache Winkel kann dazu führen, dass dein Signal über nähere Stationen hinwegspringt.',
            antennaYagiDx: 'Die Yagi ist der König der DX-Antennen! Hoher Gewinn (8 dBi) bündelt Energie in eine Richtung, und der sehr flache Abstrahlwinkel (15°) ist perfekt für Weitstrecken-Ausbreitung. Richte sie auf dein Ziel und genieße das DX!',
            // Direction educational
            directionOnTarget: 'Deine Yagi zeigt aufs Ziel - du erhältst den vollen Antennengewinn! Der schmale Strahl bündelt dein Signal genau dorthin, wo es gebraucht wird.',
            directionSlightlyOff: 'Deine Yagi ist leicht neben dem Ziel. Du verlierst etwas Gewinn, weil das Ziel nicht in der Hauptkeule liegt. Versuche deine Strahlrichtung anzupassen.',
            directionSideOn: 'Deine Yagi steht fast seitlich zum Ziel. Der meiste Gewinn geht verloren, weil Richtantennen sehr schwache Seitenkeulen haben. Drehe den Strahl zum Ziel!',
            directionRearQuarter: 'Deine Yagi zeigt größtenteils weg vom Ziel. Du sendest/empfängst durch die Rück- und Seitenkeulen, die viel schwächer sind. Dreh die Antenne um!',
            directionBackwards: 'Deine Yagi zeigt in die falsche Richtung! Das Vor-Rück-Verhältnis der Antenne bedeutet, dass sehr wenig Signal nach hinten geht (oder von dort kommt). Drehe den Strahl um 180° zum Ziel.'
        }
    },

    // Learning Points
    learning: {
        sectionTitle: 'Was du entdeckt hast',
        tryThis: 'Probiere das:',
        concepts: {
            dLayerAbsorption: {
                name: 'D-Schicht-Absorption',
                insight: '{band} ({personality}) wird von der tageszeitlichen D-Schicht-Absorption beeinflusst. Niedrigere Frequenzbänder werden stärker absorbiert als höhere.',
                experiment: 'Versuche dieselbe Verbindung nach Sonnenuntergang oder wechsle zu einem höheren Frequenzband.'
            },
            ionosphericReflection: {
                name: 'Ionosphärische Reflexion',
                insight: 'Höhere Frequenzen wie {band} brauchen stärkere Ionisation zum Reflektieren. Wenn die Ionisation zu schwach ist, durchdringen Signale ins All.',
                experiment: 'Probiere ein niedrigeres Frequenzband oder versuche es erneut, wenn mehr Sonnenlicht auf dem Pfad ist.'
            },
            greyLinePropagation: {
                name: 'Grauzonenausbreitung',
                insight: 'Die Dämmerungszone (Grauzone) bietet einzigartige Ausbreitungsbedingungen – reduzierte Absorption bei erhaltener Reflexion.',
                experiment: 'Beobachte, wie sich die Ausbreitung ändert, wenn sich die Grauzone über deinen Pfad bewegt.'
            },
            daytimePropagation: {
                name: 'Tageslichtausbreitung',
                insight: '{band} funktioniert tagsüber gut, weil es nicht stark von der D-Schicht absorbiert wird.',
                experiment: 'Vergleiche mit 80m oder 40m auf demselben Pfad, um zu sehen, wie niedrigere Frequenzen absorbiert werden.'
            },
            mogelDellinger: {
                name: 'Mögel-Dellinger-Effekt',
                insight: 'Eine Sonneneruption hat einen plötzlichen Funkausfall verursacht! Röntgenstrahlen von der Eruption überionisieren die D-Schicht, die dann alle KW-Signale auf der sonnenbeschienenen Seite der Erde absorbiert.',
                experiment: 'Probiere einen Pfad durch die Nachtseite – der Mögel-Dellinger-Effekt betrifft nur die Tagseite!'
            },
            solarActivityQuiet: {
                name: 'Ruhige Sonnenbedingungen',
                insight: 'Bei ruhigen Sonnenbedingungen ist die Ionosphäre weniger ionisiert. Höhere Frequenzbänder wie {band} kämpfen, weil sie starke Ionisation zum Reflektieren brauchen.',
                experiment: 'Wechsle zu einem niedrigeren Frequenzband wie 20m oder 40m, das mit schwächerer Ionisation reflektieren kann.'
            },
            solarActivityActive: {
                name: 'Aktive Sonnenbedingungen',
                insight: 'Aktive Sonnenbedingungen laden die Ionosphäre auf! Höhere Frequenzbänder wie {band} können jetzt um die Welt reichen.',
                experiment: 'Probiere noch höhere Bänder wie 10m – sie könnten bei aktiven Bedingungen weit offen sein!'
            },
            solarStorm: {
                name: 'Geomagnetischer Sturm',
                insight: 'Ein geomagnetischer Sturm stört die Ionosphäre. Sonnenmaterial, das auf das Erdmagnetfeld trifft, erzeugt chaotische Bedingungen.',
                experiment: 'Warte, bis sich die Bedingungen beruhigen, oder probiere sehr niedrige Bänder nachts, die noch funktionieren könnten.'
            },
            aurora: {
                name: 'Aurora-Effekt',
                insight: 'Aurora (Nord-/Südlichter) stört Funksignale auf Polarpfaden! Geladene Teilchen, die in das Erdmagnetfeld bei hohen Breiten eindringen, erzeugen ionosphärische Störungen, die das charakteristische "Aurora-Flattern" auf KW-Signalen verursachen.',
                experiment: 'Probiere einen Pfad, der keine hohen Breiten kreuzt – Ost-West-Pfade bei niedrigeren Breiten vermeiden die Aurorazone.'
            },
            sporadicE: {
                name: 'Sporadic E (Es)',
                insight: 'Du erlebst Sporadic E! Dichte Ionisationsflecken bilden sich in der E-Schicht und erzeugen überraschende Öffnungen auf {band}. Es ist am häufigsten im Sommer und ermöglicht Kontakte über 500-2000 km – Entfernungen, die normalerweise in der "Skip-Zone" liegen.',
                experiment: 'Probiere 10m oder 15m an Sommernachmittagen – du könntest eine Es-Öffnung erwischen und Stationen erreichen, die normalerweise unerreichbar sind!'
            },
            longPath: {
                name: 'Long Path Ausbreitung',
                insight: 'Du hast Long Path Ausbreitung entdeckt! Wenn der Short Path (direkte Route) durch Tageslicht-Absorption, polare Aurora oder schlechte ionosphärische Bedingungen blockiert ist, können Signale den "langen Weg" um den Globus nehmen. Dieser Pfad ist länger, kann aber günstigere Bedingungen kreuzen.',
                experiment: 'Versuche Kontakte zu entfernten Stationen (Japan, Australien, Neuseeland von Europa aus) – manchmal funktioniert der Long Path, wenn der Short Path versagt. Vergleiche beide Richtungen!'
            },
            shortVsLong: {
                name: 'Short vs Long Path',
                insight: 'Sowohl Short als auch Long Path funktionieren für diese Verbindung! Der Short Path ist die direkte Großkreis-Route, während der Long Path den anderen Weg um die Erde nimmt. DXer vergleichen oft beide Pfade – manchmal funktioniert einer viel besser als der andere.',
                experiment: 'Bei sehr weiten Verbindungen probiere dieselbe Station zu verschiedenen Zeiten – du wirst feststellen, dass sich der bevorzugte Pfad im Laufe des Tages ändert!'
            },
            skipZone: {
                name: 'Totzone (Skip Zone)',
                insight: 'Du hast die Totzone entdeckt! Dies ist der Bereich zwischen der Bodenwellen-Reichweite (etwa 50-100 km) und dem Punkt, wo Raumwellen zur Erde zurückkehren. Funksignale "überspringen" diesen Bereich buchstäblich – die Bodenwelle klingt ab, bevor die Raumwelle zurückkommt. Die Größe der Totzone hängt von der Frequenz ab: höhere Frequenzen haben größere Totzonen.',
                experiment: 'Probiere ein niedrigeres Frequenzband wie 60m oder 80m – diese haben kürzere Totzonen und können nahegelegene Stationen via NVIS (Near Vertical Incidence Skywave) erreichen.'
            }
        }
    },

    // Suggestions
    suggestions: {
        sectionTitle: 'Als nächstes probieren',
        items: {
            waitForSunset: {
                action: 'Warte auf Sonnenuntergang',
                reason: 'Die D-Schicht verschwindet nach Einbruch der Dunkelheit und lässt niedrigere Frequenzen durch'
            },
            tryHigherBand: {
                action: 'Probiere ein höheres Band',
                reason: 'Höhere Frequenzen werden weniger von der D-Schicht-Absorption beeinflusst'
            },
            tryLowerBand: {
                action: 'Probiere ein niedrigeres Band',
                reason: 'Niedrigere Frequenzen können mit schwächerer Ionisation reflektieren'
            },
            waitForSunlight: {
                action: 'Warte auf mehr Sonnenlicht auf dem Pfad',
                reason: 'Sonnenlicht ionisiert die F-Schicht und ermöglicht Reflexion'
            },
            tryFartherLocations: {
                action: 'Probiere dasselbe Band zu weiter entfernten Orten',
                reason: 'Gute Bedingungen könnten Verbindungen ermöglichen, die du noch nicht versucht hast'
            },
            experimentGreyLine: {
                action: 'Experimentiere mit verschiedenen Bändern in der Grauzone',
                reason: 'Die Grauzone kann ungewöhnliche Kombinationen zum Funktionieren bringen'
            },
            tryShorterPath: {
                action: 'Probiere zuerst einen kürzeren Pfad',
                reason: 'Meistere kürzere Entfernungen, bevor du sehr lange Pfade versuchst'
            }
        }
    },

    // Encouragement messages
    encouragement: {
        excellent: {
            message: 'Ausgezeichnete Ausbreitung!',
            detail: 'Du hast einen starken Pfad auf {band} gefunden.'
        },
        good: {
            message: 'Gut gemacht!',
            detail: 'Du hast eine Verbindung hergestellt. Probiere verschiedene Zeiten oder Bänder, um noch bessere Bedingungen zu finden.'
        },
        weak: {
            message: 'Verbindung hergestellt!',
            detail: 'Selbst schwache Verbindungen zählen. Radiowellen haben einen Weg durch schwierige Bedingungen gefunden.'
        },
        failed: {
            message: 'Weiter experimentieren!',
            detail: 'Zu verstehen, warum Ausbreitung fehlschlägt, ist genauso wertvoll wie Verbindungen herzustellen.'
        }
    },

    // Discoveries
    discoveries: {
        title: 'Entdeckung!',
        gotIt: 'Verstanden!',
        dLayerAbsorption: {
            concept: 'D-Schicht-Absorption',
            message: 'Du hast entdeckt, dass manche Bänder nachts besser funktionieren! Die D-Schicht absorbiert niedrigere Frequenzen tagsüber.'
        },
        greyLine: {
            concept: 'Grauzonenmagie',
            message: 'Du hast die Grauzone gefunden! Diese Dämmerungszone hat besondere Ausbreitungsbedingungen, die Verbindungen ermöglichen können, die zu anderen Zeiten unmöglich sind.'
        },
        frequencyDistance: {
            concept: 'Frequenz und Entfernung',
            message: 'Du hast bemerkt, dass höhere Frequenzbänder weiter reichen können! Sie prallen in steileren Winkeln ab und legen mehr Strecke pro Sprung zurück.'
        }
    },

    // Band comparison
    comparison: {
        title: 'Bandvergleich',
        muchBetter: '{band} funktioniert viel besser!',
        slightlyBetter: '{band} ist etwas besser.',
        muchWorse: '{oldBand} hat deutlich besser funktioniert!',
        wasBetter: '{oldBand} hat etwas besser funktioniert.',
        similar: 'Ähnliche Signalstärke bei beiden Bändern.',
        higherLessAbsorbed: 'Die höhere Frequenz von {band} wird weniger von der D-Schicht-Absorption beeinflusst und kann weiter pro Sprung reisen.',
        lowerReflectsBetter: 'Die niedrigere Frequenz von {band} reflektiert zuverlässiger von der Ionosphäre, selbst bei schwächerer Ionisation.',
        lowerWorksBetter: 'Die niedrigere Frequenz von {band} funktioniert besser, weil sie von der Ionosphäre auch unter den aktuellen Bedingungen reflektieren kann.',
        higherAvoidsAbsorption: 'Die höhere Frequenz von {band} vermeidet die D-Schicht-Absorption besser.'
    },

    // Solar effects
    solar: {
        highSun: {
            title: 'Hohe Sonne',
            explanation: 'Die Sonne steht hoch am Himmel und sorgt für maximale Ionisation. Die D-Schicht ist sehr aktiv und absorbiert niedrigere Frequenzen. Höhere Bänder (15m, 10m) haben die beste Chance zu funktionieren.',
            recommendation: 'Probiere die höheren Frequenzbänder wie 20m, 15m oder 10m.'
        },
        moderateSun: {
            title: 'Mäßige Sonne',
            explanation: 'Gute Ionisation für F-Schicht-Reflexion. Die D-Schicht ist aktiv, aber nicht maximal. Die meisten Bänder können je nach Pfad funktionieren.',
            recommendation: '20m ist normalerweise zuverlässig. Prüfe, ob 40m zu stark absorbiert wird.'
        },
        lowSun: {
            title: 'Tiefe Sonne',
            explanation: 'Die Sonne steht tief am Horizont. Die D-Schicht wird schwächer. Niedrigere Bänder werden nützlicher.',
            recommendation: '40m wird zuverlässiger. 80m könnte bald funktionieren.'
        },
        greyLine: {
            title: 'Grauzone',
            explanation: 'Die magische Grauzone! Die D-Schicht verblasst, aber die F-Schicht hat noch Ionisation. Dies ist die beste Zeit für ungewöhnliche Weitstrecken-Verbindungen.',
            recommendation: 'Experimentiere! Viele Bänder können während der Grauzone überraschende Ergebnisse liefern.'
        },
        twilight: {
            title: 'Dämmerung',
            explanation: 'Übergang zur Nacht. Die D-Schicht ist weg. Niedrigere Frequenzbänder kommen zur Geltung.',
            recommendation: '80m und 40m sind ausgezeichnet. 20m kann noch zu Gebieten mit Tageslicht funktionieren.'
        },
        night: {
            title: 'Nacht',
            explanation: 'Volle Dunkelheit. Keine D-Schicht-Absorption! Die F-Schicht ist schwächer, aber noch vorhanden. Niedrigere Bänder können große Entfernungen überbrücken.',
            recommendation: '80m und 40m sind am besten. 20m braucht Tageslicht irgendwo auf dem Pfad.'
        }
    },

    // Locations
    locations: {
        newYork: 'New York, USA',
        losAngeles: 'Los Angeles, USA',
        chicago: 'Chicago, USA',
        london: 'London, UK',
        berlin: 'Berlin, Deutschland',
        moscow: 'Moskau, Russland',
        rome: 'Rom, Italien',
        tokyo: 'Tokio, Japan',
        beijing: 'Peking, China',
        mumbai: 'Mumbai, Indien',
        sydney: 'Sydney, Australien',
        saoPaulo: 'São Paulo, Brasilien',
        buenosAires: 'Buenos Aires, Argentinien',
        capeTown: 'Kapstadt, Südafrika',
        cairo: 'Kairo, Ägypten',
        reykjavik: 'Reykjavik, Island',
        mcmurdo: 'McMurdo-Station, Antarktis'
    },

    // Loading
    loading: {
        transmitting: 'Übertrage...'
    },

    // Errors
    errors: {
        unknownBand: 'Unbekanntes Band gewählt.'
    },

    // Tutorial
    tutorial: {
        // Navigation
        skip: 'Überspringen',
        back: 'Zurück',
        next: 'Weiter',
        finish: 'Fertig',

        // Hints
        hints: {
            clickToContinue: 'Klicke zum Fortfahren',
            dragSlider: 'Ziehe den Schieberegler',
            clickMap: 'Klicke auf die Karte'
        },

        // Initial prompt
        prompt: {
            title: 'Willkommen bei First Contact!',
            description: 'Möchtest du eine kurze Einführung in die faszinierende Welt der Kurzwellenausbreitung?',
            start: 'Tutorial starten',
            skip: 'Überspringen'
        },

        // Tutorial steps
        steps: {
            welcome: {
                title: 'Willkommen!',
                content: 'First Contact ist ein interaktiver Simulator, der dir zeigt, wie Kurzwellensignale um die Welt reisen. Lass uns gemeinsam die Grundlagen entdecken!'
            },
            map_intro: {
                title: 'Die Weltkarte',
                content: 'Dies ist deine Übersicht über die Welt. Du siehst die Tag-Nacht-Grenze, Skip-Zonen und kannst Ziele für Funkverbindungen auswählen. Zoome mit dem Mausrad, verschiebe durch Ziehen.'
            },
            your_location: {
                title: 'Dein Standort',
                content: 'Das blaue Symbol markiert deinen Standort. Du kannst ihn über die Standortauswahl links ändern - wähle aus Presets oder gib eigene Koordinaten ein!'
            },
            location_selector: {
                title: 'Standort ändern',
                content: 'Hier kannst du deinen Sendestandort wählen. Wähle aus vordefinierten Städten oder gib eigene Koordinaten mit einem Namen für dein QTH ein.'
            },
            day_night: {
                title: 'Tag und Nacht',
                content: 'Der dunkle Bereich zeigt die Nachtseite der Erde. Die Ionosphäre verhält sich bei Tag und Nacht sehr unterschiedlich – das beeinflusst, welche Bänder funktionieren!'
            },
            grey_line: {
                title: 'Die Grauzone',
                content: 'Der schmale Streifen zwischen Tag und Nacht ist die "Grauzone" (Grey Line). Hier herrschen besondere Bedingungen, die überraschende Weitverbindungen ermöglichen können!'
            },
            skip_zone: {
                title: 'Die Skip-Zone',
                content: 'Siehst du den Kreis um deinen Standort? Das ist die Skip-Zone - Signale "springen" über diesen Bereich hinweg! Höhere Bänder haben größere Skip-Zonen. Das 60m-Band nutzt NVIS (steil nach oben), um diese Lücke zu füllen.'
            },
            maidenhead_grid: {
                title: 'Maidenhead-Gitter',
                content: 'Mit dem Grid-Schalter kannst du das Maidenhead-Locator-System einblenden - ein weltweites Gittersystem, das Funkamateure zur Standortbeschreibung verwenden. Jedes Feld (AA-RR) steht für einen bestimmten Bereich auf der Erde.'
            },
            bands_intro: {
                title: 'Frequenzbänder',
                content: 'Hier wählst du das Frequenzband. Jedes Band hat seinen eigenen Charakter – manche funktionieren besser tagsüber, andere nachts. Beobachte wie sich die Skip-Zone ändert!'
            },
            select_band: {
                title: 'Wähle ein Band',
                content: 'Klicke auf das 20-Meter-Band. Es ist ein guter Allrounder für Weitstreckenverbindungen.'
            },
            power_intro: {
                title: 'Sendeleistung',
                content: 'Wähle deine Sendeleistung: QRP (5W) für die Herausforderung, Standard (100W) für Normalbetrieb, oder High (1000W) für schwierige Pfade. Mehr Leistung = mehr Reichweite!'
            },
            antenna_intro: {
                title: 'Antennenauswahl',
                content: 'Deine Antenne beeinflusst Gewinn und Abstrahlwinkel. Dipol ist vielseitig, Vertikal hat flachen Winkel für DX, und Yagi bietet hohen Gewinn in eine Richtung!'
            },
            antenna_yagi: {
                title: 'Yagi-Richtung',
                content: 'Bei einer Yagi-Antenne musst du sie auf dein Ziel ausrichten! Wähle die Strahlrichtung mit den Kompass-Buttons. Falsche Richtung = großer Signalverlust!'
            },
            season_intro: {
                title: 'Jahreszeit & Monat',
                content: 'Der Monat beeinflusst, wie viel Tageslicht dein Standort bekommt! Winter bedeutet kürzere Tage und längere Nächte. Sommer bedeutet längere Tage. Das beeinflusst die Ausbreitung - die Ionosphäre ändert sich mit den Jahreszeiten!'
            },
            time_intro: {
                title: 'Zeitsteuerung',
                content: 'Mit diesem Schieberegler kannst du die Tageszeit ändern. Beobachte, wie sich Tag und Nacht über die Karte bewegen!'
            },
            try_time: {
                title: 'Probiere es aus!',
                content: 'Ziehe den Schieberegler und beobachte, wie sich die Tag-Nacht-Grenze verschiebt. Die Uhrzeit ist in UTC angegeben.'
            },
            solar_activity: {
                title: 'Sonnenaktivität',
                content: 'Die Sonne beeinflusst die Funkausbreitung. Bei hoher Sonnenaktivität funktionieren höhere Bänder (10m, 15m) besser. Bei ruhigen Bedingungen sind niedrigere Bänder zuverlässiger.'
            },
            special_events: {
                title: 'Spezielle Ereignisse',
                content: 'Diese Buttons simulieren besondere Ausbreitungsereignisse: Sonneneruptionen verursachen Funkausfälle, Aurora stört Polarpfade, und Sporadic E erzeugt Magie auf höheren Bändern!'
            },
            sporadic_e: {
                title: 'Sporadic E - Die Magie!',
                content: 'Aktiviere Sporadic E und probiere das 6m "Magic Band"! Es erzeugt überraschende Öffnungen über 1000-2000 km - Entfernungen, die normalerweise unerreichbar sind. Besonders häufig im Sommer!'
            },
            first_contact: {
                title: 'Dein erster Kontakt',
                content: 'Klicke jetzt auf einen Ort auf der Karte, um eine Funkverbindung zu versuchen. Probiere einen Ort auf der Tagseite! Bei sehr entfernten Zielen kann das Signal den Langweg um die Erde nehmen.'
            },
            results_intro: {
                title: 'Ergebnisse',
                content: 'Hier siehst du das Ergebnis deines Verbindungsversuchs. Grün bedeutet Erfolg, Rot bedeutet, dass das Signal nicht durchgekommen ist. Achte auf Kurzweg vs. Langweg!'
            },
            factors_explained: {
                title: 'Einflussfaktoren',
                content: 'Diese Faktoren zeigen dir, was die Ausbreitung beeinflusst hat: Tageslicht, Entfernung, Leistung, Antenne, Skip-Zone und mehr. Lerne daraus!'
            },
            experiment: {
                title: 'Experimentiere!',
                content: 'Der beste Weg zu lernen ist Ausprobieren! Ändere die Leistung, wechsle die Antenne, probiere verschiedene Bänder und Zeiten. Schaffst du es mit QRP auf die andere Seite der Welt?'
            },
            complete: {
                title: 'Tutorial abgeschlossen!',
                content: 'Du kennst jetzt die Grundlagen. Probiere die QRP-Herausforderung (5W), experimentiere mit Yagi-Antennen und entdecke die Magie der Grey Line Ausbreitung. Viel Spaß!'
            }
        }
    },

    // Help
    help: {
        title: 'Hilfe - Kurzwellen-Ausbreitung',
        goal: {
            title: 'Was ist First Contact?',
            text: 'Ein interaktiver Simulator, der zeigt wie Kurzwellensignale um die Welt reisen. Lerne durch Experimentieren - klicke auf Städte um Funkverbindungen zu simulieren und entdecke was die Ausbreitung beeinflusst!'
        },
        map: {
            title: 'Die Weltkarte',
            text: 'Die Karte zeigt Tag und Nacht in Echtzeit. Die Ionosphäre verhält sich je nach Sonneneinstrahlung unterschiedlich. Mausrad zum Zoomen, Ziehen zum Verschieben.',
            you: 'Dein Standort (konfigurierbar)',
            cities: 'Andere Städte - klicke zum Verbinden',
            sun: 'Aktuelle Sonnenposition',
            greyline: 'Grey Line - Dämmerungszone mit spezieller Ausbreitung',
            skipzone: 'Skip-Zone - der Kreis um dich herum, den Signale nicht erreichen können',
            maidenhead: 'Maidenhead-Gitter - Schalter zum Anzeigen der Amateurfunk-Gitterfelder (AA-RR). Wird weltweit von Funkamateuren zur Standortbeschreibung verwendet.'
        },
        location: {
            title: 'Dein Standort',
            text: 'Du kannst deinen Sendestandort ändern:',
            preset: 'Wähle aus über 100 vordefinierten Städten weltweit',
            custom: 'Gib eigene Koordinaten (Breite/Länge) mit eigenem Namen ein',
            qth: 'Richte dein echtes QTH (Amateurfunk-Standort) ein, um von zuhause zu simulieren!'
        },
        bands: {
            title: 'Frequenzbänder (11 Bänder)',
            text: 'Jedes Band hat seinen eigenen "Charakter":',
            '160m': 'Nur nachts, tagsüber komplett absorbiert - "Top Band"',
            '80m': 'Nachts gut, tagsüber stark gedämpft',
            '60m': 'NVIS-Spezialist - Signale gehen steil hoch und zurück (regional)',
            '40m': 'Vielseitig, funktioniert oft Tag und Nacht',
            '30m': 'WARC-Band - guter Kompromiss zwischen 40m und 20m',
            '20m': 'Das "Arbeitspferd" - gut für weite Entfernungen tagsüber',
            '17m': 'WARC-Band - öffnet nach 20m bei starker Ionisation',
            '15m': 'Braucht gute Sonneneinstrahlung',
            '12m': 'WARC-Band - wie 10m aber braucht etwas weniger Ionisation',
            '10m': 'Nur bei starker Ionosphäre offen',
            '6m': 'Das "Magic Band" - erwacht mit Sporadic E zum Leben!'
        },
        power: {
            title: 'Sendeleistung',
            text: 'Leistung beeinflusst Signalstärke und Reichweite:',
            qrp: 'QRP (5W) - Die ultimative Herausforderung! Erfordert gute Bedingungen und Geduld. Echte Erfolgserlebnisse wenn es klappt!',
            standard: 'Standard (100W) - Typische Amateurfunk-Leistung. Zuverlässig für die meisten Verbindungen.',
            high: 'High (1000W) - Maximale legale Leistung. Hilft auf schwierigen Pfaden, überwindet aber keine geschlossenen Bänder.'
        },
        antenna: {
            title: 'Antennenauswahl',
            text: 'Deine Antenne beeinflusst die Performance dramatisch:',
            dipole: 'Dipol - Ausgeglichene, vielseitige Antenne. Guter Allrounder mit moderatem Gewinn. Funktioniert gut in den meisten Situationen.',
            vertical: 'Vertikal - Flacher Abstrahlwinkel, exzellent für DX (Weitverbindungen). Weniger Gewinn aber größere Reichweite.',
            yagi: 'Yagi - Hochgewinn-Richtantenne. Muss aufs Ziel ausgerichtet werden! Wähle Strahlrichtung mit Kompass-Buttons. Falsche Richtung = großer Signalverlust.',
            angle: 'Abstrahlwinkel - Flachere Winkel erreichen weiter (DX), steilere Winkel für regionale Kontakte (NVIS).'
        },
        skipZone: {
            title: 'Skip-Zone',
            text: 'Funkwellen werden in einem Winkel an der Ionosphäre reflektiert. Das erzeugt eine "Skip-Zone" - einen Bereich um deinen Standort, den Signale nicht erreichen können, weil sie buchstäblich darüber springen!',
            small: 'Niedrigere Bänder (40m-160m) haben kleine Skip-Zonen - gut für regionale Kontakte',
            large: 'Höhere Bänder (10m-20m) haben größere Skip-Zonen - besser für entfernte Kontakte',
            nvis: '60m-Band nutzt NVIS (Near Vertical Incidence Skywave) - Signale gehen steil hoch und zurück, füllen die Skip-Zone!'
        },
        longPath: {
            title: 'Langweg-Ausbreitung',
            text: 'Signale können in zwei Richtungen um die Erde reisen:',
            short: 'Kurzweg - Die direkte, kürzere Route. Normalerweise bevorzugt.',
            long: 'Langweg - Der längere Weg um den Globus. Funktioniert manchmal wenn der Kurzweg blockiert ist!',
            when: 'Probiere Langweg wenn: Kurzweg über die Nachtseite führt, oder du Polarpfade bei Aurora vermeiden willst.'
        },
        solarActivity: {
            title: 'Sonnenaktivität',
            text: 'Die Sonnenaktivität beeinflusst die Funkausbreitung dramatisch:',
            quiet: 'Ruhige Sonne - Niedrige Bänder funktionieren gut, höhere können geschlossen sein',
            normal: 'Normal - Typische Bedingungen, gut zum Lernen',
            elevated: 'Erhöht - Höhere Bänder öffnen zuverlässiger',
            high: 'Hoch - Exzellent für 10m, 15m, sogar 6m via F-Schicht'
        },
        specialEvents: {
            title: 'Spezielle Ereignisse',
            text: 'Simuliere dramatische Ausbreitungsereignisse:',
            solarFlare: 'Sonneneruption (Mögel-Dellinger) - Röntgenstrahlen verursachen plötzlichen Funkausfall auf der Tagseite. Niedrige Bänder sind zuerst betroffen, schwere Eruptionen legen alle KW lahm!',
            aurora: 'Aurora - Geomagnetische Stürme erzeugen Polarlichter und stören Funkpfade über Polargebiete. Signale können flattern oder komplett verschwinden.',
            sporadicE: 'Sporadic E - Mysteriöse ionisierte Wolken in ~100km Höhe. Erzeugt überraschende Öffnungen auf 6m (Magic Band!), 10m und 15m über 1000-2000 km. Besonders häufig im Sommer!'
        },
        time: {
            title: 'Zeit-Steuerung',
            text: 'Nutze den Zeitregler, um verschiedene Tageszeiten zu simulieren. Beobachte, wie sich die Ausbreitungsbedingungen ändern wenn Tag und Nacht über die Erde wandern!'
        },
        season: {
            title: 'Jahreszeit & Monat',
            text: 'Der Monat beeinflusst die Tageslichtdauer und ionosphärischen Bedingungen:',
            winter: 'Winter - Kurze Tage, lange Nächte. Niedrige Bänder funktionieren besser. Nördliche Stationen haben sehr kurzes Tageslicht.',
            spring: 'Frühling/Herbst - Übergangszeiten. Tag/Nacht relativ ausgeglichen. Gut zum Experimentieren.',
            summer: 'Sommer - Lange Tage, kurze Nächte. Höhere Bänder funktionieren besser bei verlängertem Tageslicht. Beste Zeit für Sporadic E!',
            hemisphere: 'Denk daran: Wenn auf der Nordhalbkugel Winter ist, ist auf der Südhalbkugel Sommer!'
        },
        tips: {
            title: 'Profi-Tipps',
            tip1: {
                title: 'Grey Line Magie:',
                text: 'Die Dämmerungszone (Grenzlinie zwischen Tag und Nacht) bietet oft exzellente Ausbreitung - Signale können dieser Linie mit reduzierter Absorption folgen!'
            },
            tip2: {
                title: 'Sporadic E:',
                text: 'Aktiviere Sporadic E und probiere das 6m "Magic Band" - es kann plötzlich über 1000-2000 km öffnen. Echte Funkamateure warten das ganze Jahr auf diese Öffnungen!'
            },
            tip3: {
                title: 'WARC-Bänder:',
                text: '30m, 17m und 12m sind ruhigere Bänder ohne Conteste - oft offen wenn Nachbarbänder marginal sind. Ideal um einen Pfad zu finden wenn Hauptbänder versagen.'
            },
            tip4: {
                title: 'Folge der Sonne:',
                text: 'Höhere Bänder (10m-20m) folgen dem Tageslicht. Für DX zur anderen Seite der Welt muss Sonnenlicht entlang des gesamten Pfades sein!'
            },
            tip5: {
                title: 'Nacht-Bänder:',
                text: 'Niedrigere Bänder (40m-160m) erwachen nach Sonnenuntergang zum Leben. Die D-Schicht verschwindet und Signale können viel weiter mit weniger Absorption reisen.'
            },
            tip6: {
                title: 'QRP-Herausforderung:',
                text: 'Versuche Verbindungen mit nur 5 Watt! Es erfordert Geduld und gute Bedingungen, aber die Befriedigung ist immens. Starte mit 20m bei guter Sonnenaktivität.'
            },
            tip7: {
                title: 'Yagi-Vorteil:',
                text: 'Eine Yagi-Antenne auf dein Ziel ausgerichtet kann den Unterschied zwischen Erfolg und Misserfolg auf schwierigen Pfaden machen. Aber vergiss nicht sie zu drehen!'
            },
            tip8: {
                title: 'Langweg-DX:',
                text: 'Wenn der Kurzweg nicht funktioniert, probiere den Langweg! Besonders nützlich um Stationen auf der anderen Seite der Erde zu erreichen.'
            }
        }
    },

    // Footer
    footer: {
        imprint: 'Impressum',
        privacy: 'Datenschutz',
        github: 'GitHub'
    },

    // Imprint (Impressum)
    imprint: {
        title: 'Impressum',
        info: 'Angaben gemäß § 5 ECG und § 25 MedienG',
        operator: 'Betreiber',
        operatorName: 'Michael Linder',
        operatorCallsign: 'OE8YML',
        operatorAddress: 'Nötsch 219, 9611 Nötsch',
        operatorCountry: 'Österreich',
        contact: 'Kontakt',
        contactEmail: 'oe8yml@rednil.at',
        liability: {
            title: 'Haftung für Inhalte',
            text: 'Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr. Diese Website dient ausschließlich Bildungszwecken und simuliert die Kurzwellenausbreitung.'
        },
        copyright: {
            title: 'Urheberrecht',
            text: 'Die durch den Betreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem österreichischen Urheberrecht. Der Quellcode ist unter der MIT-Lizenz auf GitHub verfügbar.'
        }
    },

    // Solar Weather Panel
    solarWeather: {
        panelTitle: 'Sonnenwetter & Funkbedingungen',
        collapseHint: 'Klicken zum Einklappen',
        expandHint: 'Klicken zum Ausklappen',
        rating: {
            excellent: 'Ausgezeichnet',
            good: 'Gut',
            fair: 'Mäßig',
            poor: 'Schlecht',
            severe: 'Kritisch'
        },
        sunActivity: 'Sonnenaktivität',
        sunPersonality: {
            quiet: 'Die schläfrige Sonne',
            normal: 'Die ausgeglichene Sonne',
            active: 'Die energische Sonne',
            storm: 'Die zornige Sonne'
        },
        sunDescription: {
            quiet: 'Niedrige Bänder funktionieren besser, höhere können geschlossen sein',
            normal: 'Gute Bedingungen für die meisten Bänder',
            active: 'Höhere Bänder erwachen! Super für DX',
            storm: 'Gestörte Bedingungen, Ausbreitung unzuverlässig'
        },
        recommendedBands: 'Empfohlene Bänder',
        bandRating: {
            excellent: 'Ausgezeichnet',
            good: 'Gut',
            fair: 'Mäßig',
            poor: 'Schlecht',
            closed: 'Geschlossen'
        },
        events: {
            solarFlare: 'Sonneneruption',
            solarFlareEffect: 'KW-Ausfall auf der Tagseite',
            aurora: 'Polarlicht',
            auroraEffect: 'Polarpfade gestört',
            sporadicE: 'Sporadic E',
            sporadicEEffect: 'Magic-Band-Öffnungen!'
        },
        educationalNote: 'Dieses Panel zeigt, wie aktuelle Sonnenbedingungen die Funkausbreitung beeinflussen. Höhere Sonnenaktivität öffnet höhere Bänder, kann aber auch Störungen verursachen.'
    },

    // Privacy Policy (Datenschutz)
    privacy: {
        title: 'Datenschutzerklärung',
        intro: 'Der Schutz Ihrer persönlichen Daten ist uns wichtig. Diese Datenschutzerklärung informiert Sie über die Datenverarbeitung auf dieser Website.',
        noData: {
            title: 'Keine Datenerhebung',
            text: 'Diese Website ist ein reines Client-Side-Tool und erhebt, speichert oder verarbeitet keine personenbezogenen Daten. Es gibt:'
        },
        noDataList: {
            forms: 'Keine Formulare oder Benutzereingaben',
            cookies: 'Keine Cookies (außer der Spracheinstellung im localStorage)',
            tracking: 'Kein Tracking oder Analytics',
            server: 'Keine serverseitige Datenverarbeitung'
        },
        localStorage: {
            title: 'Lokale Speicherung',
            text: 'Die einzige gespeicherte Information ist Ihre Sprachpräferenz (Deutsch/Englisch), die lokal in Ihrem Browser gespeichert wird. Diese Daten werden nicht an Server übertragen und können jederzeit durch Löschen der Browser-Daten entfernt werden.'
        },
        cloudflare: {
            title: 'Cloudflare',
            text: 'Diese Website wird über Cloudflare bereitgestellt. Cloudflare kann technisch notwendige Verbindungsdaten verarbeiten. Weitere Informationen finden Sie in der Datenschutzerklärung von Cloudflare.'
        },
        rights: {
            title: 'Ihre Rechte',
            text: 'Da wir keine personenbezogenen Daten erheben, entfallen die üblichen DSGVO-Rechte wie Auskunft, Berichtigung oder Löschung. Bei Fragen können Sie uns dennoch kontaktieren.'
        },
        contact: {
            title: 'Kontakt',
            text: 'Bei Fragen zur Datenverarbeitung wenden Sie sich an:'
        }
    }
};
