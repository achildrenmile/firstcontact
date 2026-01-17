# First Contact - Educational Design Notes

## Core Educational Philosophy

First Contact is built on the principle that **understanding emerges from experimentation**, not instruction. Every design decision supports the player's ability to:

1. Form hypotheses ("I think lower bands work better at night")
2. Test them immediately (change time, observe result)
3. Receive clear feedback (visual + explanation)
4. Build mental models through pattern recognition

We deliberately avoid:
- Formulas and equations
- Technical jargon without context
- Punishing failures
- Information overload

---

## Why Each Game Mechanic Helps Learning

### 1. Band Selection (The Five Bands)

**Educational Purpose:** Bands are the player's primary "variable" to manipulate.

**Why Five Bands:**
- Enough variety to discover patterns
- Few enough to remember and compare
- Each has a distinct "personality" for memorable associations

**Band Personalities:**
| Band | Personality | What It Teaches |
|------|-------------|-----------------|
| 80m | "Night Owl" | D-layer absorption concept |
| 40m | "Reliable Worker" | Versatility, day/night transition |
| 20m | "World Traveler" | Long-distance propagation |
| 15m | "Fair Weather Friend" | Ionization strength dependence |
| 10m | "Spectacular Performer" | Frequency/ionization limits |

**Learning Pathway:**
1. Player starts with 20m (most forgiving)
2. Tries night contact, it works
3. Tries 80m during day, it fails
4. Explanation reveals D-layer absorption
5. Player tries 80m at night → success!
6. **"Aha!" moment**: Time of day matters differently for each band

### 2. Time Control

**Educational Purpose:** Time is the second "variable" players manipulate, and it's the key to understanding why propagation changes.

**Why a Slider:**
- Continuous control reveals gradual transitions
- Players can watch the grey line move
- Encourages "what happens if I just move it a little more?"

**Why Preset Buttons (Dawn/Noon/Dusk/Midnight):**
- Quick access to key transition times
- Labels reinforce temporal vocabulary
- Reduces friction for hypothesis testing

**Learning Pathway:**
1. Player notices contact works at noon but not midnight
2. Uses slider to find exactly when it stops working
3. Sees the day/night terminator cross the path
4. **"Aha!" moment**: The ionosphere changes with sunlight

### 3. Interactive World Map

**Educational Purpose:** Visual, spatial learning is more intuitive than abstract descriptions.

**Why Show Day/Night Overlay:**
- Makes invisible (ionosphere) somewhat visible
- Direct correlation: where it's dark on map = different propagation
- Players can predict before clicking

**Why Show the Grey Line:**
- Most operators never understand grey line propagation
- Visual representation makes it discoverable
- The "glowing twilight band" invites curiosity

**Why Signal Path Visualization:**
- Abstract "radio waves bouncing" becomes concrete
- Multi-hop paths explain distance limitations
- Failed paths show "where it went wrong"

**Learning Pathway:**
1. Player sees their signal path cross day and night zones
2. Notices grey line passing through
3. Signal strength is unusually good
4. Explanation mentions "grey line enhancement"
5. **"Aha!" moment**: The twilight zone is special!

### 4. Feedback System (Explanations)

**Educational Purpose:** Bridge the gap between observation and understanding.

**Why "Factors" Breakdown:**
- Shows propagation isn't magic or random
- Each factor is a learnable concept
- Players see which factors helped vs. hurt

**Why "Learn More" Expandable Sections:**
- Curious players can go deeper
- Keeps interface clean for casual players
- Respects different learning speeds

**Why Suggestions for Next Experiments:**
- Prevents "stuck" moments
- Guides without prescribing
- Models scientific thinking

**Why Never Show Numbers (MUF, etc.):**
- Numbers without intuition are meaningless
- "The ionosphere is too weak" > "MUF is 12 MHz"
- Qualitative understanding first, quantitative later (in advanced modes)

### 5. Discovery Celebrations

**Educational Purpose:** Reinforce key learning moments and make the player feel accomplished.

**Why Detect Specific Discoveries:**
- Marks genuine conceptual breakthroughs
- Creates memorable "I figured it out!" moments
- Provides natural progression markers

**Key Discoveries Tracked:**
1. **D-Layer Absorption**: First time a band fails by day but works at night
2. **Grey Line Magic**: First strong grey line enhancement
3. **Frequency-Distance**: First time higher band reaches farther

---

## Simplifications and Their Rationale

### What We Simplified

| Real Phenomenon | Game Simplification | Why |
|-----------------|---------------------|-----|
| F1/F2 layer split | Single F layer | Two-layer model is confusing without adding learning value |
| Sporadic E propagation | Not included (v1) | Random/unpredictable; conflicts with determinism goal |
| Exact MUF calculation | Qualitative "can reflect / can't reflect" | Numbers don't build intuition |
| Antenna patterns | Omnidirectional assumed | Save for expansion; too many variables for beginners |
| Solar flux index | Fixed "average" conditions | Remove variable; focus on time/band relationship first |
| Ground wave propagation | Not modeled | Short-range; distracts from ionospheric focus |

### Why Determinism Matters

Real HF propagation is probabilistic. We made it deterministic because:

1. **Hypothesis Testing**: Same setup = same result means players can isolate variables
2. **No "Bad Luck" Frustration**: Failures always have an explanation
3. **Reproducible "Aha!" Moments**: If a friend says "try X at Y time," it works

Later versions could add "solar disturbance" events that introduce controlled randomness once the player has mastered basics.

---

## Learning Objectives by Play Session

### Session 1 (First 15 Minutes)
**Objectives:**
- Understand that band + time + path = propagation result
- Discover that not all bands work at all times
- Successfully make a contact

**How Game Supports This:**
- Welcoming tutorial prompt
- 20m selected by default (most forgiving)
- Noon selected by default (good conditions)
- First few targets are moderate distance

### Session 2 (15-30 Minutes)
**Objectives:**
- Understand day vs. night propagation differences
- Discover D-layer absorption
- Form mental model: "low bands = night, high bands = day"

**How Game Supports This:**
- Band hints mention best time of day
- Time slider encourages experimentation
- D-layer absorption explanation appears when relevant

### Session 3 (30-60 Minutes)
**Objectives:**
- Discover grey line propagation
- Understand multi-hop limitations
- Begin predicting outcomes before clicking

**How Game Supports This:**
- Grey line visually prominent
- Path visualization shows hop count
- "Factors" panel reveals prediction logic

### Session 4+ (Advanced Play)
**Objectives:**
- Understand seasonal variation (via date)
- Master long-distance paths
- Develop intuition for unusual conditions

**How Game Supports This:**
- Date selection (future expansion)
- Achievement system for challenging contacts
- Leaderboard for distance records

---

## Avoiding Common Educational Pitfalls

### Pitfall 1: Information Dump
**How We Avoid It:**
- Short descriptions by default
- "Learn more" for curious players
- Explanations appear *after* action, not before

### Pitfall 2: Punishment for Failure
**How We Avoid It:**
- Failed contacts are "learning opportunities"
- Clear explanation of *why* it failed
- Suggestions for what to try next
- No score penalty for failures

### Pitfall 3: Overwhelming Options
**How We Avoid It:**
- Only 5 bands (not all amateur bands)
- One location (player's) is fixed
- Time is the main variable, band is secondary
- Future features gated behind understanding

### Pitfall 4: Jargon Barrier
**How We Avoid It:**
- "The absorber layer" not "D-layer ionization"
- "Long-distance reflector" not "F2 peak height"
- Technical terms introduced in context, after concept

### Pitfall 5: Disconnected Theory
**How We Avoid It:**
- Every concept tied to player action
- "This is why your 80m signal failed"
- Not "D-layer absorption occurs at 60-90km"

---

## Accessibility Considerations

### Color-Blind Safe Design
- Signal success/failure uses green/red + icons + labels
- Grey line uses orange/yellow (visible to most color blindness types)
- Critical information never color-alone

### Reading Level
- Explanations written at approximately 8th-grade reading level
- Short sentences, active voice
- Technical terms always explained in context

### Cognitive Load
- Maximum 4-5 pieces of information at once
- Progressive disclosure (details on demand)
- Consistent layout (controls left, map center, feedback right)

---

## Measuring Educational Success

In a future analytics-enabled version, we would track:

1. **Concept Discovery Rate**: % of players who trigger each discovery
2. **Prediction Accuracy**: Do players start predicting correctly before clicking?
3. **Exploration Depth**: How many band/time combinations do players try?
4. **Return Rate**: Do players come back to try more scenarios?
5. **"Aha!" Proxies**: Time between related failed and successful attempts

Success metrics:
- >80% discover D-layer absorption within 20 minutes
- >50% discover grey line propagation within 45 minutes
- >90% can correctly predict 3+ outcomes after 30 minutes of play

---

## Connection to Real Amateur Radio

This game is a stepping stone, not an endpoint. We want players to:

1. **Build Correct Mental Models**: What they learn here should be *true* (simplified, but true)
2. **Develop Curiosity**: "I wonder if this works in real life?"
3. **Lower Barrier to Entry**: Ham radio becomes approachable, not intimidating
4. **Enable Deeper Learning**: Players who graduate to real radios already understand fundamentals

The game should never:
- Teach something that must be "unlearned" later
- Suggest that real propagation is always predictable
- Replace the need for actual licensing study
