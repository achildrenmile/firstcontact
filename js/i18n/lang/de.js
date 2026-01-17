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
            targetConditions: 'Bedingungen am Ziel:'
        },
        language: 'Sprache',
        you: 'DU',
        buttons: {
            tutorial: 'Tutorial',
            tutorialTitle: 'Tutorial starten',
            help: 'Hilfe',
            helpTitle: 'Hilfe anzeigen'
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
        '10m': {
            name: '10 Meter',
            personality: 'Der spektakuläre Performer',
            tagline: 'Wenn es öffnet, geschieht Magie',
            simpleDescription: 'Braucht starke Ionisation. Entweder weit offen oder komplett tot.',
            detailedDescription: 'Das 10-Meter-Band liegt am Rand dessen, was die Ionosphäre reflektieren kann. Es braucht exzellente Bedingungen – typischerweise um das Sonnenmaximum herum – um für weite Strecken zu funktionieren. Aber wenn es öffnet, können Signale mit überraschend wenig Leistung um die Welt reisen. Es lehrt dich, dass die Ionosphäre Grenzen hat.',
            learningHint: 'Dieses Band zeigt dir, dass höhere Frequenzen stärkere Ionisation brauchen, um reflektiert zu werden.',
            bestTimeOfDay: 'mittags bei hoher Sonnenaktivität',
            typicalRange: 'weltweit oder gar nichts'
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
            notReadable: 'Nicht lesbar'
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

        // Factor names
        factors: {
            dLayerAbsorption: 'D-Schicht-Absorption',
            fLayerReflection: 'F-Schicht-Reflexion',
            greyLineEffect: 'Grauzoneneffekt',
            pathGeometry: 'Pfadgeometrie'
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
            longMultiHopPath: 'Dieser Pfad erfordert {count} Sprünge, was ziemlich lang ist. Jede ionosphärische Reflexion verliert Signalstärke, so dass Mehr-Sprung-Pfade schwach oder unzuverlässig sein können.'
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
        wasBetter: '{oldBand} hat besser funktioniert.',
        similar: 'Beide Bänder funktionieren ähnlich.',
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
                content: 'Dies ist deine Übersicht über die Welt. Du siehst die Tag-Nacht-Grenze und kannst Ziele für Funkverbindungen auswählen.'
            },
            your_location: {
                title: 'Dein Standort',
                content: 'Das blaue Symbol markiert deinen Standort. Von hier aus sendest du deine Funksignale in die Welt.'
            },
            day_night: {
                title: 'Tag und Nacht',
                content: 'Der dunkle Bereich zeigt die Nachtseite der Erde. Die Ionosphäre verhält sich bei Tag und Nacht sehr unterschiedlich – das beeinflusst, welche Bänder funktionieren!'
            },
            grey_line: {
                title: 'Die Grauzone',
                content: 'Der schmale Streifen zwischen Tag und Nacht ist die "Grauzone" (Grey Line). Hier herrschen besondere Bedingungen, die überraschende Weitverbindungen ermöglichen können!'
            },
            bands_intro: {
                title: 'Frequenzbänder',
                content: 'Hier wählst du das Frequenzband. Jedes Band hat seinen eigenen Charakter – manche funktionieren besser tagsüber, andere nachts.'
            },
            select_band: {
                title: 'Wähle ein Band',
                content: 'Klicke auf das 20-Meter-Band. Es ist ein guter Allrounder für Weitstreckenverbindungen.'
            },
            time_intro: {
                title: 'Zeitsteuerung',
                content: 'Mit diesem Schieberegler kannst du die Tageszeit ändern. Beobachte, wie sich Tag und Nacht über die Karte bewegen!'
            },
            try_time: {
                title: 'Probiere es aus!',
                content: 'Ziehe den Schieberegler und beobachte, wie sich die Tag-Nacht-Grenze verschiebt. Die Uhrzeit ist in UTC angegeben.'
            },
            first_contact: {
                title: 'Dein erster Kontakt',
                content: 'Klicke jetzt auf einen Ort auf der Karte, um eine Funkverbindung zu versuchen. Probiere einen Ort auf der Tagseite!'
            },
            results_intro: {
                title: 'Ergebnisse',
                content: 'Hier siehst du das Ergebnis deines Verbindungsversuchs. Grün bedeutet Erfolg, Rot bedeutet, dass das Signal nicht durchgekommen ist.'
            },
            factors_explained: {
                title: 'Einflussfaktoren',
                content: 'Diese Faktoren zeigen dir, was die Ausbreitung beeinflusst hat. Lerne aus ihnen, um bessere Verbindungen zu finden!'
            },
            experiment: {
                title: 'Experimentiere!',
                content: 'Der beste Weg zu lernen ist Ausprobieren! Ändere die Zeit, wechsle das Band, und versuche verschiedene Ziele. Beobachte die Muster!'
            },
            complete: {
                title: 'Tutorial abgeschlossen!',
                content: 'Du kennst jetzt die Grundlagen. Entdecke selbst, wie verschiedene Bänder zu verschiedenen Zeiten funktionieren. Viel Spaß beim Experimentieren!'
            }
        }
    },

    // Help
    help: {
        title: 'Hilfe - Kurzwellen-Ausbreitung',
        goal: {
            title: 'Ziel des Spiels',
            text: 'Lerne, wie Kurzwellenfunk funktioniert! Klicke auf Städte auf der Karte, um Funkverbindungen zu simulieren. Finde heraus, welche Bänder zu welchen Tageszeiten am besten funktionieren.'
        },
        map: {
            title: 'Die Weltkarte',
            text: 'Die Karte zeigt Tag und Nacht in Echtzeit. Die Ionosphäre verhält sich je nach Sonneneinstrahlung unterschiedlich.',
            you: 'Dein Standort (Wien, Österreich)',
            cities: 'Andere Städte - klicke zum Verbinden',
            sun: 'Aktuelle Sonnenposition'
        },
        bands: {
            title: 'Frequenzbänder',
            text: 'Jedes Band hat seinen eigenen "Charakter":',
            '160m': 'Nur nachts, tagsüber komplett absorbiert - "Top Band"',
            '80m': 'Nachts gut, tagsüber stark gedämpft',
            '40m': 'Vielseitig, funktioniert oft Tag und Nacht',
            '20m': 'Das "Arbeitspferd" - gut für weite Entfernungen tagsüber',
            '15m': 'Braucht gute Sonneneinstrahlung',
            '10m': 'Nur bei starker Ionosphäre offen'
        },
        time: {
            title: 'Zeit-Steuerung',
            text: 'Nutze den Zeitregler, um verschiedene Tageszeiten zu simulieren. Beobachte, wie sich die Ausbreitungsbedingungen ändern!'
        },
        tips: {
            title: 'Tipps',
            tip1: {
                title: 'Grey Line:',
                text: 'Die Dämmerungszone (Grenzlinie zwischen Tag und Nacht) bietet oft besonders gute Ausbreitungsbedingungen!'
            },
            tip2: {
                title: 'Experimentiere:',
                text: 'Probiere verschiedene Band/Zeit-Kombinationen aus. Es gibt keine Fehler - nur Lerngelegenheiten!'
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
