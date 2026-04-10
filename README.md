# First Contact - Kurzwellen-Ausbreitungssimulator

[![Featured on oeradio.at](https://img.shields.io/badge/Featured_on-oeradio.at-2563eb?style=flat-square)](https://oeradio.at/werkzeuge/) [![Live Demo](https://img.shields.io/badge/Live_Demo-firstcontact.oeradio.at-16a34a?style=flat-square)](https://firstcontact.oeradio.at) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

> 🎙️ **Part of the [oeradio.at](https://oeradio.at/werkzeuge/) open source ham radio tool collection.**
> Browse all tools → [**oeradio.at/werkzeuge**](https://oeradio.at/werkzeuge/)

> Learn how shortwave radio propagation works through experimentation and visual feedback.

![Version](https://img.shields.io/badge/version-0.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**Live Demo:** [https://firstcontact.oeradio.at](https://firstcontact.oeradio.at)

---

## Deutsch

**First Contact** ist ein interaktiver Simulator, der zeigt, wie Kurzwellensignale um die Welt reisen. Lerne durch Experimentieren, nicht durch Formeln!

### Features

- **Interaktive Weltkarte** mit echten geografischen Daten (TopoJSON)
- **Tag/Nacht-Visualisierung** in Echtzeit
- **11 Amateurfunk-Bänder** - von 160m bis 6m (inkl. WARC-Bänder)
- **Grey-Line-Darstellung** - die magische Dämmerungszone
- **Sonnenaktivität** - simuliere ruhige bis hohe Sonnenaktivität
- **Spezielle Ereignisse:**
  - ⚡ **Sonneneruption** (Mögel-Dellinger) - Funkausfall auf der Tagseite
  - 🌌 **Aurora** - Störungen auf Polarpfaden
  - ✨ **Sporadic E** - Magische Öffnungen auf 6m/10m/15m
- **Zeitsteuerung** - simuliere verschiedene Tageszeiten
- **Zweisprachig** - Deutsch und Englisch
- **Interaktives Tutorial** - 17-Schritte Einführung
- **Hilfe-System** - umfassende Dokumentation
- **Mobile-Support** - Touch-Zoom und responsive Design

### Schnellstart

1. Öffne [https://firstcontact.oeradio.at](https://firstcontact.oeradio.at)
2. Starte das Tutorial oder erkunde selbst
3. Klicke auf eine Stadt auf der Karte um eine Funkverbindung zu simulieren!

### Bedienung

| Element | Beschreibung |
|---------|--------------|
| 🗺️ Karte | Klicke auf Städte um Verbindungen zu versuchen |
| 📻 Band-Auswahl | Wähle zwischen 11 Bändern (160m-6m) |
| ☀️ Sonnenaktivität | Ruhig, Normal, Erhöht, Hoch |
| ⚡ Spezial-Events | Sonneneruption, Aurora, Sporadic E |
| ⏰ Zeit-Regler | Ändere die Tageszeit (UTC) |
| 📚 Tutorial | Starte das interaktive Tutorial |
| ❓ Hilfe | Zeige die Hilfe-Seite |
| 🌐 Sprache | Wechsle zwischen Deutsch/Englisch |

### Band-Charakteristiken

| Band | Charakter | Beste Zeit |
|------|-----------|------------|
| **160m** | Top Band - nur nachts | Nacht |
| **80m** | Die Nachteule | Nacht |
| **60m** | NVIS-Spezialist (regional) | Tag/Nacht |
| **40m** | Das Arbeitspferd | Jederzeit |
| **30m** | Der stille Erfolgsbringer (WARC) | Jederzeit |
| **20m** | Der Weltreisende | Tag |
| **17m** | Das versteckte Juwel (WARC) | Tag |
| **15m** | Der Schönwetter-Freund | Mittag |
| **12m** | Der zuverlässige Cousin (WARC) | Mittag |
| **10m** | Der spektakuläre Performer | Mittag + hohe Aktivität |
| **6m** | Das Magic Band! | Sporadic E (Sommer) |

---

## English

**First Contact** is an interactive simulator that shows how shortwave signals travel around the world. Learn by experimenting, not by formulas!

### Features

- **Interactive World Map** with real geographic data (TopoJSON)
- **Day/Night Visualization** in real-time
- **11 Amateur Radio Bands** - from 160m to 6m (including WARC bands)
- **Grey Line Display** - the magic twilight zone
- **Solar Activity** - simulate quiet to high solar activity
- **Special Events:**
  - ⚡ **Solar Flare** (Mögel-Dellinger) - radio blackout on the sunlit side
  - 🌌 **Aurora** - disruption on polar paths
  - ✨ **Sporadic E** - magical openings on 6m/10m/15m
- **Time Control** - simulate different times of day
- **Bilingual** - German and English
- **Interactive Tutorial** - 17-step introduction
- **Help System** - comprehensive documentation
- **Mobile Support** - touch zoom and responsive design

### Quick Start

1. Open [https://firstcontact.oeradio.at](https://firstcontact.oeradio.at)
2. Start the tutorial or explore on your own
3. Click on a city on the map to simulate a radio contact!

### Controls

| Element | Description |
|---------|-------------|
| 🗺️ Map | Click on cities to attempt contacts |
| 📻 Band Selection | Choose between 11 bands (160m-6m) |
| ☀️ Solar Activity | Quiet, Normal, Elevated, High |
| ⚡ Special Events | Solar Flare, Aurora, Sporadic E |
| ⏰ Time Slider | Change time of day (UTC) |
| 📚 Tutorial | Start the interactive tutorial |
| ❓ Help | Show the help page |
| 🌐 Language | Switch between German/English |

### Band Characteristics

| Band | Character | Best Time |
|------|-----------|-----------|
| **160m** | Top Band - night only | Night |
| **80m** | The Night Owl | Night |
| **60m** | NVIS Specialist (regional) | Day/Night |
| **40m** | The Reliable Worker | Anytime |
| **30m** | The Quiet Achiever (WARC) | Anytime |
| **20m** | The World Traveler | Day |
| **17m** | The Hidden Gem (WARC) | Day |
| **15m** | The Fair Weather Friend | Midday |
| **12m** | The Reliable Cousin (WARC) | Midday |
| **10m** | The Spectacular Performer | Midday + high activity |
| **6m** | The Magic Band! | Sporadic E (summer) |

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
│   │   ├── bands.js        # 11 HF band definitions
│   │   ├── ionosphere.js   # Ionosphere model
│   │   └── solar-activity.js # Solar activity & special events
│   ├── systems/
│   │   ├── propagation-engine.js  # Signal propagation logic
│   │   ├── explanation-engine.js  # Human-readable explanations
│   │   └── sun-position.js        # Sun position calculations
│   ├── ui/
│   │   ├── world-map.js    # Interactive map (Canvas)
│   │   ├── controls-panel.js
│   │   ├── feedback-panel.js
│   │   └── tutorial.js     # 17-step tutorial system
│   └── i18n/
│       ├── i18n.js         # Translation system
│       └── lang/
│           ├── de.js       # German translations
│           └── en.js       # English translations
└── world.json              # TopoJSON world map data
```

## Technical Details

- **Pure JavaScript** - no frameworks, no build step for development
- **ES Modules** - modern JavaScript imports
- **Canvas API** - smooth map rendering with touch support
- **TopoJSON** - efficient geographic data
- **LocalStorage** - saves language preference
- **esbuild** - fast production bundling

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Android)

## Docker (Production)

```bash
# Build and run with Docker
docker build -t firstcontact .
docker run -p 8080:80 firstcontact

# Or with Docker Compose
docker-compose up -d
```

Open `http://localhost:8080` in your browser.

The Docker build:
- Bundles all JavaScript into a single minified file (~180KB)
- Uses nginx:alpine for minimal image size (~25MB)
- Enables gzip compression and caching
- Cache-busting with content hashes

## Development

For development, use ES modules directly (no build required):

```bash
# Start development server
python3 -m http.server 8000

# Or with Node.js
npx serve .
```

Open `http://localhost:8000` - uses `index.html` with ES modules.

## Build

To create a production bundle locally:

```bash
# Install dependencies
npm install

# Build minified bundle
npm run build

# Build with sourcemaps (for debugging)
npm run build:dev

# Watch mode (auto-rebuild on changes)
npm run watch
```

Output: `dist/app.bundle.js`

## Deployment

```bash
# Deploy to production (Synology NAS)
./deploy-production.sh
```

## License

MIT License - feel free to use and modify!

---

Made with ❤️ by OE8YML for amateur radio enthusiasts and anyone curious about how radio waves travel around the world.
