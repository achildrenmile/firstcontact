# First Contact - Kurzwellen-Ausbreitungssimulator

> Learn how shortwave radio propagation works through experimentation and visual feedback.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Deutsch

**First Contact** ist ein interaktiver Simulator, der zeigt, wie Kurzwellensignale um die Welt reisen. Lerne durch Experimentieren, nicht durch Formeln!

### Features

- **Interaktive Weltkarte** mit echten geografischen Daten (TopoJSON)
- **Tag/Nacht-Visualisierung** in Echtzeit
- **5 Amateurfunk-Bänder** (80m, 40m, 20m, 15m, 10m) mit realistischem Verhalten
- **Grey-Line-Darstellung** - die magische Dämmerungszone
- **Zeitsteuerung** - simuliere verschiedene Tageszeiten
- **Zweisprachig** - Deutsch und Englisch
- **Tutorial** - Schritt-für-Schritt Einführung
- **Hilfe-System** - jederzeit verfügbar

### Schnellstart

1. Starte einen lokalen Webserver:
   ```bash
   python3 -m http.server 8000
   ```

2. Öffne im Browser: `http://localhost:8000`

3. Klicke auf eine Stadt auf der Karte um eine Funkverbindung zu simulieren!

### Bedienung

| Element | Beschreibung |
|---------|--------------|
| 🗺️ Karte | Klicke auf Städte um Verbindungen zu versuchen |
| 📻 Band-Auswahl | Wähle zwischen 80m, 40m, 20m, 15m, 10m |
| ⏰ Zeit-Regler | Ändere die Tageszeit (UTC) |
| 📚 Tutorial | Starte das interaktive Tutorial |
| ❓ Hilfe | Zeige die Hilfe-Seite |
| 🌐 Sprache | Wechsle zwischen Deutsch/Englisch |

### Band-Charakteristiken

| Band | Charakter |
|------|-----------|
| **80m** | Nachts gut, tagsüber stark gedämpft |
| **40m** | Vielseitig, funktioniert oft Tag und Nacht |
| **20m** | Das "Arbeitspferd" - gut für weite Entfernungen tagsüber |
| **15m** | Braucht gute Sonneneinstrahlung |
| **10m** | Nur bei starker Ionosphäre offen |

---

## English

**First Contact** is an interactive simulator that shows how shortwave signals travel around the world. Learn by experimenting, not by formulas!

### Features

- **Interactive World Map** with real geographic data (TopoJSON)
- **Day/Night Visualization** in real-time
- **5 Amateur Radio Bands** (80m, 40m, 20m, 15m, 10m) with realistic behavior
- **Grey Line Display** - the magic twilight zone
- **Time Control** - simulate different times of day
- **Bilingual** - German and English
- **Tutorial** - step-by-step introduction
- **Help System** - available anytime

### Quick Start

1. Start a local web server:
   ```bash
   python3 -m http.server 8000
   ```

2. Open in browser: `http://localhost:8000`

3. Click on a city on the map to simulate a radio contact!

### Controls

| Element | Description |
|---------|-------------|
| 🗺️ Map | Click on cities to attempt contacts |
| 📻 Band Selection | Choose between 80m, 40m, 20m, 15m, 10m |
| ⏰ Time Slider | Change time of day (UTC) |
| 📚 Tutorial | Start the interactive tutorial |
| ❓ Help | Show the help page |
| 🌐 Language | Switch between German/English |

### Band Characteristics

| Band | Character |
|------|-----------|
| **80m** | Good at night, heavily absorbed during day |
| **40m** | Versatile, often works day and night |
| **20m** | The "workhorse" - good for long distances during day |
| **15m** | Needs good solar illumination |
| **10m** | Only open with strong ionosphere |

---

## Project Structure

```
firstcontact/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # All styles
├── js/
│   ├── app.js              # Main application
│   ├── models/
│   │   ├── location.js     # Location model & presets
│   │   ├── bands.js        # HF band definitions
│   │   └── ionosphere.js   # Ionosphere model
│   ├── systems/
│   │   ├── propagation-engine.js  # Signal propagation logic
│   │   ├── explanation-engine.js  # Human-readable explanations
│   │   └── sun-position.js        # Sun position calculations
│   ├── ui/
│   │   ├── world-map.js    # Interactive map (Canvas)
│   │   ├── controls-panel.js
│   │   ├── feedback-panel.js
│   │   └── tutorial.js     # Tutorial system
│   └── i18n/
│       ├── i18n.js         # Translation system
│       └── lang/
│           ├── de.js       # German translations
│           └── en.js       # English translations
├── world.json              # TopoJSON world map data
└── countries.json          # Country data
```

## Technical Details

- **Pure JavaScript** - no frameworks, no build step
- **ES Modules** - modern JavaScript imports
- **Canvas API** - smooth map rendering
- **TopoJSON** - efficient geographic data
- **LocalStorage** - saves language preference

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Development

No build process required! Just edit files and refresh.

```bash
# Start development server
python3 -m http.server 8000

# Or with Node.js
npx serve .
```

## License

MIT License - feel free to use and modify!

---

Made with ❤️ for amateur radio enthusiasts and anyone curious about how radio waves travel around the world.
