# First Contact - System Architecture

## Overview

First Contact uses a **layered, modular architecture** designed for clarity, maintainability, and educational transparency. Every module serves a specific purpose and can be understood in isolation.

```
┌─────────────────────────────────────────────────────────────────┐
│                         UI Layer                                │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │
│  │  WorldMap    │ │  Controls    │ │  FeedbackPanel           │ │
│  │  Renderer    │ │  Panel       │ │  (Explanations)          │ │
│  └──────────────┘ └──────────────┘ └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Systems Layer                              │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │
│  │  Propagation │ │  SunPosition │ │  ExplanationEngine       │ │
│  │  Engine      │ │  System      │ │  (Learning Feedback)     │ │
│  └──────────────┘ └──────────────┘ └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Models Layer                               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │
│  │  Ionosphere  │ │  HFBands     │ │  Location                │ │
│  │  Model       │ │  Model       │ │  Model                   │ │
│  └──────────────┘ └──────────────┘ └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Utils Layer                                │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────────┐ │
│  │  GeoUtils    │ │  TimeUtils   │ │  MathUtils               │ │
│  └──────────────┘ └──────────────┘ └──────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Module Responsibilities

### Models Layer (Data & State)

| Module | Responsibility |
|--------|----------------|
| `Ionosphere` | Defines D, E, F layer properties; computes layer state based on solar illumination |
| `HFBands` | Contains band characteristics (wavelength, typical behavior, educational descriptions) |
| `Location` | Represents geographic points with lat/lon and human-friendly names |

### Systems Layer (Logic & Computation)

| Module | Responsibility |
|--------|----------------|
| `SunPosition` | Calculates sun position, day/night status, and terminator line for any location/time |
| `PropagationEngine` | Evaluates if a signal can travel from A to B given band, time, and ionospheric conditions |
| `ExplanationEngine` | Generates human-readable explanations for why propagation succeeded or failed |

### UI Layer (Visualization & Interaction)

| Module | Responsibility |
|--------|----------------|
| `WorldMapRenderer` | Draws the map, day/night overlay, grey line, and signal paths |
| `ControlsPanel` | Handles band selection, time slider, and target selection |
| `FeedbackPanel` | Displays explanations, signal strength, and learning hints |

### Utils Layer (Shared Helpers)

| Module | Responsibility |
|--------|----------------|
| `GeoUtils` | Great circle distance, bearing, midpoint calculations |
| `TimeUtils` | UTC/local time conversions, hour angle calculations |
| `MathUtils` | Angle conversions, interpolation helpers |

## Data Flow

```
User Action (select band, change time, click target)
         │
         ▼
    ControlsPanel
         │
         ▼
    PropagationEngine.evaluate({
        source: Location,
        target: Location,
        band: HFBand,
        time: DateTime
    })
         │
         ├──► SunPosition.calculate(time)
         │         │
         │         ▼
         │    Ionosphere.getLayerStates(sunPosition)
         │
         ▼
    PropagationResult {
        success: boolean,
        signalStrength: 0-100,
        path: HopPath[],
        factors: PropagationFactor[]
    }
         │
         ├──► WorldMapRenderer.drawPath(path)
         │
         └──► ExplanationEngine.explain(result)
                    │
                    ▼
              FeedbackPanel.show(explanation)
```

## Educational Design Principles in Architecture

1. **Separation of "What" and "Why"**: The PropagationEngine computes results; the ExplanationEngine explains them. This keeps logic clean and explanations rich.

2. **No Hidden State**: All factors affecting propagation are explicit and inspectable. Players can understand cause and effect.

3. **Deterministic by Default**: Same inputs always produce same outputs. This lets players form and test hypotheses reliably.

4. **Progressive Complexity**: The architecture supports adding solar activity, antenna patterns, and other factors as separate modules without changing core logic.
