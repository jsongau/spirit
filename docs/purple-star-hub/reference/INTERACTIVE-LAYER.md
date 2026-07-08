# Reference — the interactive layer (hub `index.html`)

How the hub's models, rails, widgets, sound, and accessibility work as built. The hub loads the thirteen data files, then five inline `<script>` blocks (one per wave), each a self-contained IIFE reading `window.ZiweiData`. All of it is file:// safe (relative asset paths, no modules, no fetch).

## The shared bus

Models publish `document` CustomEvents `psa:select` with `{ type: "palace" | "star" | "hua", id, source }`. The rails, the Palace Orbit, and Chart Pulse subscribe, so a selection in one place updates the others. A second event, `psa:progress`, is dispatched by the progress store on every comprehension event; the header chip, subnav chip, left rail, and the ladder repaint from it. Wave 2 exposes `window.PSA = { correct, lessonComplete, reinforce }` so later scripts can trigger the sound and reinforcement.

## The seven models

1. **Twelve Palace Court** (`#the-court`) — the wheel is one Tab stop; arrows walk the ring, Home/End jump, Enter selects. Consumes the teaser's `?star=`/`?palace=` params. Selecting three distinct rooms completes lesson 1.3.
2. **Move-a-star** (`#the-stars`) — a 14-seal tray (grouped by series) over a focus court. Drag, or pick-then-place with the keyboard. Four disclosure layers (beginner/intermediate/practitioner/"commonly misread"). Seating the Emperor completes lesson 3.2.
3. **Four Transformations lab** (`#four-transformations`) — a birth-year field or ten stem chips; four force cards show the star each stem transforms with natal and timing effect lines and the colorblind line patterns. Two distinct stems complete lesson 4.0.
4. **Build-a-chart-sentence** (`#chart-sentence`) — pick star + room + optional transformation, write a reading, compare against beginner and practitioner model answers plus the missing evidence, then self-check. Overclaiming (will/never/always/…) is quoted back with the uncertainty rewrite.
5. **Read the Triangle** (`#read-the-triangle`) — Mei's Career room with three toggles; the verdict grows more qualified with each room added. All four rooms complete lesson 5.2.
6. **Timing wheel + Three Clocks** (`#timing`) — collapsed by default, never locked; an age opens its decade door (門 glyph + ages), the Year Wave marks the current-year palace (☀ + text). The Three Clocks block keeps the almanac, BaZi luck pillars, and ZWDS cycles distinct (bridges B4/F2). Opening a door completes lesson 7.2.
7. **Level 8 capstone** (`#readers-path`) — the teach-back model (student writes → reveal the two-register model answer → self-score → submit), the phrasebook and consultation reference, and the 20-question Imperial exam. Model 7 (the Mei/Rui walkthrough) is built as data, not yet as UI.

## The two rails (≥1200px)

- **Left, "Your path"** — a stage card with an 8-segment discrete track, current and next lesson, chart status, and a "Save this path" line that appears only after progress exists. Repaints from `psa:progress`.
- **Right, "The living court"** — one deck of up to three cards chosen by which section is centered, via an IntersectionObserver at `rootMargin: -40% 0px -40%`, with an `aria-live` deck announcement and a pause control that persists to `zodi_psa_motion`.

Below 1200px both rails collapse into a bottom sheet (two real tabs, focus-trapped dialog, Escape to close), opened from a sticky continue-lesson bar.

## The five rolling widgets

Court in Motion (14 seals drifting by series; static grid when paused/reduced-motion), Palace Orbit (SVG ring, dashed mirror / solid triangle chords, keyboard-navigable), Transformation Thread (auto-advancing four-force threads; all drawn when paused), Term of the Moment (glossary rotation, click to freeze), Chart Pulse (read-only 4×4 that changes only on `psa:select`). Every motion respects the shared `psaMotion` flag and `prefers-reduced-motion`; every widget is readable frozen.

## Sound

Web Audio, synthesized (no audio files), off by default, one toggle in the subnav (mirrored in the bottom sheet), preference in `zodi_psa_sound`. Events: correct note on a right answer, two-note resolution on lesson complete, a per-family tone on star placement. **Wrong answers are silent** plus a text correction. Master gain is capped low; the AudioContext is created lazily on first sound-on. Pronunciation is exempt (pressing a say button is consent) and always available. Reinforcement copy (twelve in-world lines) fires only on comprehension events, at most one per two minutes, no repeats per session.

## Accessibility and the colorblind grammar

Every state reads through shape and text, never color alone: 印 seal = active, △ + "triangle" = trine, ◇ + "mirror" = opposite, ✓/"Correct." and ✕/"Not quite," for scoring, line patterns (solid/double/dashed/dotted) for the four forces. Every interactive element is keyboard-operable with visible focus, composite widgets are single Tab stops with arrow-key movement, targets are 44px, and each model has a visually hidden `aria-live` region announcing state in full sentences. Reduced motion replaces travel and draw animations with instant end states; nothing depends on motion to function. No links are underlined and none carry an external-link arrow.

## Mobile (320px floor)

Single column, one learning action visible at a time, a sticky continue-lesson bar, and the bottom-sheet rails and definitions. The only sideways scrollers are the subnav row and the star tray, both fade-masked; there is no horizontal overflow at 320px.
