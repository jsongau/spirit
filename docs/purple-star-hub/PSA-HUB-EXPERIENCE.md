# PSA-HUB-EXPERIENCE.md
## Purple Star Astrology hub, experience and interaction spec
### Agent B draft · 2026-07-07 · planning only, no HTML in this session

This is the build spec for the new hub page at `/elements/purple-star-astrology/`. It replaces the static article at `site/elements/zi-wei/index.html`. A build session should be able to implement from this document without asking questions. Where this doc names a data file (`ziwei-*.js`), the shape is defined in PSA-MASTER-PLAN.md and the content comes from PSA-TERMINOLOGY.md's canonical table.

Source pages verified this session:

- `site/indexv6.html` lines 822-862 (teaser markup) and 1568-1625 (drag-the-Emperor JS), 1276-1302 (`zfSpeak` Mandarin voice ranking)
- `site/elements/zi-wei/index.html` (current hub, its OKLCH tokens at lines 62-104, its `pn-sub` subnav at 1255-1259)
- `site/elements/zi-wei/chart/index.html` (Reader's School: PALACES array, GRID_ORDER wheel, triangle math, `renderQuiz`, `zwdsSchool.v1` store, RANKS)
- `site/docs/zwds/00-MASTER-BUILD-BLUEPRINT.md` (design language, star color table, module types)

Non-negotiable rules that govern every spec below: no underlined links and no border-bottom fakes (color + weight only), no external-link arrow icons, every state readable without color (shape, text, icon, pattern, position), traditional characters with tone-marked pinyin and a pronounce button, sound off by default, plain-English anti-AI voice, no account gates, no fake urgency.

---

## 1. TEASER → HUB HANDOFF

### 1.1 What the teaser already does

The `indexv6.html` "Twelve palaces, fourteen stars" section lets the visitor drag the 紫微 Emperor token into any of 12 palace cells (`data-palace="Life" … "Parents"`), shows a per-palace reading from its inline `READ` map, names the opposite room from its `SHADOW` map, and counts explored palaces. Its two CTAs currently link bare: "Enter the star court" → `/elements/zi-wei/` and "Cast your own chart" → `/elements/zi-wei/chart/`. No params are passed anywhere today (gap 5).

### 1.2 URL param contract

The hub consumes two optional query params. Both are read once on load, never written back to the URL by the hub (no history pollution).

**`?star=`** one of the 14 canonical star ids, matching the existing star-page directory slugs:

```
zi-wei, tian-ji, tai-yang, wu-qu, tian-tong, lian-zhen, tian-fu,
tai-yin, tan-lang, ju-men, tian-xiang, tian-liang, qi-sha, po-jun
```

**`?palace=`** one of the 12 canonical palace ids:

```
ming-gong, siblings, spouse, children, wealth, health,
travel, network, career, property, fortune, parents
```

Accepted aliases, normalized on read (case-insensitive):

| Alias | Canonical | Why |
|---|---|---|
| `life` | `ming-gong` | teaser's `data-palace="Life"` |
| `soul` | `fortune` | chart page's current slug for 福德宮 |
| `wellbeing` | `fortune` | possible future copy |

DECISION: the canonical palace id for 福德宮 is `fortune`. The teaser calls the room "Fortune" and the chart page calls it "soul". One id, two aliases, and PSA-TERMINOLOGY.md ratifies the display name. The `ziwei-palaces.js` entry carries `aliases: []` so the normalizer is data-driven, not hardcoded.

Parsing rules:

- Unknown or malformed values are ignored silently. Never show an error for a bad param.
- `?star=` without `?palace=` seats the star in `ming-gong` (its most instructive default) and says so in the handoff line.
- `?palace=` without `?star=` highlights the palace with no star seated.
- Params only affect initial state. Nothing is stored from them except a session flag `psa.cameFromTeaser` (sessionStorage, value `"1"`) used to pick the handoff copy variant.

Teaser-side change (listed here as a build dependency, executed in the indexv6 wave, not this hub's wave): the teaser's `show(p)` function records the last-seated palace, and both CTAs append params on click. "Enter the star court" becomes `/elements/purple-star-astrology/?star=zi-wei&palace=<canonical id of last explored palace>`. If the visitor never dragged, no params are appended. The teaser's palace-name → canonical-id map is 11 identity lowercases plus `Life → ming-gong` and `Fortune → fortune`.

### 1.3 Opening state

With params: the page loads scrolled to top as normal, but the Twelve Palace Court model (section 3 of the page) initializes pre-selected. The named palace is active, its triangle and mirror are lit with their text tags, and the named star token sits in it with the beginner-layer reading open. The orientation header's first line becomes the handoff sentence.

Handoff copy (param variant):

> You moved one star through one room. A real chart asks how the entire court responds. Your Emperor is waiting where you left him, in the {palace editorial name}.

Handoff copy (no params, `psa.cameFromTeaser` absent):

> One birth moment, twelve rooms, fourteen principal stars. This page teaches you to read the whole court, in order.

No autoscroll to the model. The header's "Pick up where you left off" action scrolls to the pre-configured court (smooth scroll, instant under reduced motion).

### 1.4 Compact orientation header

This replaces the current oversized hero (star field, giant sigil, "kept secret for 1,000 years" claim, which Agent D strikes anyway). It is one compact band, roughly 220px tall on desktop, no full-viewport hero, no repetition of "twelve palaces, fourteen stars" as a headline since the teaser already said it.

Contents, in order:

1. Breadcrumb line (existing `pn-sub` breadcrumb conventions): Home / Elements / Purple Star Astrology.
2. `h1`: **Purple Star Astrology** with the authoritative subtitle directly beneath in the established ruby pattern: `<ruby>紫微斗數<rt>zǐ wēi dǒu shù</rt></ruby>` plus the `say-btn` pronounce button (`data-say="紫微斗數"`, same SVG speaker icon and `is-saying` class as `#say-ziwei`). One short clause after the pinyin: "one of several English names for the system; the traditional name comes first."
3. One-sentence promise (anti-AI pass applied): "Learn to read a Chinese star chart the way the old court offices did: room by room, star by star, with your own chart as the study map."
4. The handoff line from 1.3.
5. Stage chip: current rank and level from the store, e.g. `Court Novice 入門 · Foundation 1 of 8`. Rendered as a bordered pill with a seal glyph 印 prefix so it reads as a stamp, not a gamer badge. If the store is empty: `New to the court · start below`.
6. Two actions, side by side, 44px min height:
   - Primary (filled pill, brass on ink): **Continue learning** (label becomes **Start with the palaces** when no progress exists). Scrolls to the current lesson anchor.
   - Secondary (text weight + color, no underline): **Cast your study chart**, linking to the chart page. Always framed as study, never fortune.

No star-field animation in the header. A single static SVG constellation line (the Big Dipper, 7 dots and 6 strokes, `--faint` color) sits behind the title at 10% opacity, `aria-hidden`. It costs nothing and teaches nothing false.

---

## 2. PAGE STRUCTURE, TOP TO BOTTOM

The hub is a learning instrument, not an index. Section order follows the curriculum's first four levels so scrolling the page IS the orientation lesson. Every section is `section.psa-section` with the established `.section-eyebrow` mono eyebrow, `h2` serif title, and one lead paragraph.

| # | Section id | Purpose | Approximate content |
|---|---|---|---|
| 0 | header | Orientation header (spec above) | name, promise, stage, two actions |
| 1 | `#the-court` | Model 1: Twelve Palace Court | The full interactive court. Opens in param state. Eyebrow "The structure". One lead sentence: a chart is twelve rooms read together. |
| 2 | `#the-stars` | Model 2: Move-a-star, plus Court in Motion widget | Meet the fourteen principal stars as characters. The teaser mini-game, grown up: any star, any room, layered readings. |
| 3 | `#four-transformations` | Model 3: Four Transformations lab, plus Transformation Thread widget | 化祿 Huà Lù, 化權 Huà Quán, 化科 Huà Kē, 化忌 Huà Jì. How a birth-year stem re-colors four stars. No season framing unless PSA-TERMINOLOGY.md ratifies it. |
| 4 | `#read-the-triangle` | Model 5: Read the Triangle | 三方四正 Sān Fāng Sì Zhèng taught by toggling, not by paragraph. |
| 5 | `#chart-sentence` | Model 4: Build-a-chart-sentence | The learner writes a one-sentence reading from star + palace + transformation, then compares to beginner and practitioner model answers. |
| 6 | `#timing` | Model 6: Timing wheel | Decade Doors and the Year Wave, hub edition. Renders collapsed with a plain note: "This model assumes you know the palaces and the triangle. Start there if you have not." Never locked; the note is guidance, the expand control always works. |
| 7 | `#walkthrough` | Model 7: Sample chart walkthrough | Mei (born 1996, existing) plus one new fictional chart (spec in 6.7). Step-through reading in the five-step method order. |
| 8 | `#your-path` | The curriculum ladder | The 8 levels from PSA-CURRICULUM.md as a vertical list: level name, completion ability in one sentence, done/current/ahead state, link to first lesson of the level. This is the page's only list-of-links block and it is progress-aware, not a card grid. |
| 9 | `#among-the-systems` | Honest positioning | Short. BaZi weather / Purple Star map comparison kept from the current hub but tightened to ~120 words, plus one line each for Zodi Animal and feng shui with the explicit "separate systems, never blended" statement. Links per PSA-CONNECTION-MAP.md. |
| 10 | `#reference` | Quiet reference row | Glossary, Pronunciation guide, History, Schools and Methods, Calculation. One line each, text links, no cards. Term of the Moment widget lives beside this row on desktop. |
| 11 | footer | Standard `<!--om-footer:start-->` build-system footer | untouched pattern |

`<a id="pn-main" tabindex="-1"></a>` sits immediately before section 0's content, one per page.

Between every pair of sections sits one contextual CTA component (section 8 of this doc), never a card block.

---

## 3. DEDICATED STICKY SUBNAV

### 3.1 What it is

A hub-scoped subnav in the `<!--pn-sub:start-->` slot, replacing the current zi-wei `pn-sub` content on hub pages. The global `pn-bar` mega nav is not touched in any way (nav-budget-guard). The subnav is new markup, class-prefixed `psa-nav`, borrowing `pn-sub`'s layout CSS patterns (`position: sticky`, drop groups) but with its own stylesheet block so changes never leak into other sections' subnavs.

Sticky behavior: `position: sticky; top: var(--pn-bar-h, 56px)` so it docks under the global nav. `z-index` one below the global nav drawer so the mega menu always wins. Background `--ink-2` at 98% opacity with a `--line-soft` bottom rule.

### 3.2 Items and grouping

Primary row, always visible, in this order:

| Item | Target | Notes |
|---|---|---|
| **Start Here** | `#the-court` on the hub | current-section aware |
| **Chart** | `/elements/purple-star-astrology/chart/` | the Reader's School |
| **Palaces** | `…/palaces/` | drop group listing all 12 with 宮 characters + pinyin |
| **Stars** | `…/stars/` | drop group listing all 14, same pattern as today's `pn-subdrop` |
| **Practice** | `…/chart/#drills` | drills + exam anchors |
| **Study** ▸ | expandable group | Transformations, Relationships, Auxiliary Stars, Timing, Synthesis |
| **Reference** ▸ | expandable group | Glossary, Pronunciation, History, Schools and Methods, Calculation |
| progress chip | non-link | right-aligned, see 3.3 |
| sound toggle | button | see section 7.3 |

Progressive hierarchy: the five primary items render at full weight (`--moon`, 500). Study and Reference render one step quieter (`--muted`, 400) with a caret glyph (existing `pn-sub-caret`). Expanded groups reuse the `pn-subdrop` panel pattern: `aria-haspopup="true"`, `aria-expanded` toggled, panel opens on click or Enter/Space, closes on Escape and focus-out. Every group item carries characters + pinyin exactly like today's drop (`紫微 Zǐwēi · The Emperor`), corrected to traditional characters per PSA-TERMINOLOGY.md.

### 3.3 Progress indicator

A non-interactive chip at the right end of the row: `Foundation · 3 of 8` (level name + levels completed of 8, from the extended `zwdsSchool.v1` store as defined in PSA-CURRICULUM.md). When a lesson is mid-flight it shows the lesson short-name instead: `Lesson: The Mirror Rule`. Empty store: `Begin the path`. On click it scrolls to `#your-path`. It is a real element with `role="status"` semantics only on change (no live spam).

### 3.4 States

Colorblind-safe, per rule. Each nav item state signals with position and text, never color alone:

- **Current section** (scrollspy via IntersectionObserver on the section headings): item gains a 2px top-edge marker bar AND weight 600. Not an underline, not a border-bottom under the text; the marker sits at the very top edge of the sticky bar, physically separated from the label so it cannot read as an underlined link.
- **Visited/complete area** (all lessons in that group done): a small ✓ prefix before the label.
- **Hover/focus**: `--moon` color + `background: --panel` rounded pill behind the label. Focus additionally gets the standard 2px `outline` in `--brass` (never removed).

### 3.5 Mobile behavior

Below 720px the subnav becomes a single-line horizontal scroller of the five primary items plus a **More** item that opens Study + Reference + progress + sound in the bottom sheet (section 4.4). Scroll affordance is a fade mask plus the partially visible sixth item; no arrows. Item height 44px minimum. The progress chip moves into the sticky continue-lesson bar (section 9.4). No horizontal page overflow at 320px: the scroller is the only thing that scrolls sideways.

---

## 4. THE TWO RAILS

Both rails render only at ≥1200px viewport. The center column keeps `--maxw: 1120px` minus rails; grid template `280px minmax(0,1fr) 300px` with 32px gaps. Rails are `position: sticky; top: calc(var(--pn-bar-h) + var(--psa-nav-h) + 24px)`, independently scrollable if taller than the viewport (they should not be; each rail caps at 3 visible widgets).

### 4.1 Left rail: "Your path"

Header: mono eyebrow `YOUR PATH` with the seal glyph. Widgets, top to bottom:

1. **Stage card.** Rank name with characters (`Court Novice 入門`), current level (`Foundation`), and a 8-segment progress track. Segments are discrete blocks, filled with a ✓ glyph when done, a ◐ half-glyph on the current one; never a smooth colored bar alone. Data: `zwdsSchool.v1` extended store.
2. **Current lesson.** Lesson title, one-line "what you will be able to do", and a Continue button (44px). Data: `ziwei-lessons.js` + store cursor.
3. **Next lesson.** Title only, quieter, prefixed `Next`.
4. **Recently learned terms.** The last 5 term ids the store marked learned, each rendered as characters + pinyin + English with an inline `say-btn`. Clicking a term opens the glossary bottom-sheet definition (same component as mobile definitions). Data: `ziwei-glossary.js` + store `termsLearned[]`.
5. **Glossary access.** One text link: "Open the full glossary".
6. **Chart status.** Either "No study chart yet · Cast one to annotate your path" with the cast action, or "Your chart · cast {date}" linking to the chart page in annotated study-map mode. Data: store `chart` key (shape defined in master plan).

The rail never advertises accounts until the store shows at least one completed lesson; then a single quiet line appears at the bottom: "Save this path" linking to the account page. That is the only account CTA on the hub.

### 4.2 Right rail: "The living court"

Header: mono eyebrow `THE LIVING COURT` plus the pause control (4.3). The rail shows exactly one contextual widget stack (max 3 cards) chosen by which page section is centered. Never random content, never generic fortunes.

Section → widget mapping:

| Centered section | Card 1 | Card 2 | Card 3 |
|---|---|---|---|
| `#the-court` | Palace Orbit (5.2) | Pronunciation term: active palace | One relationship rule ("Every room is read with its mirror") |
| `#the-stars` | Court in Motion (5.1) | Star of the moment: the selected star's one-line archetype | Common beginner mistake for that star (from `ziwei-principal-stars.js .misread`) |
| `#four-transformations` | Transformation Thread (5.3) | Pronunciation term: the active Hua | One practice question (from `ziwei-practice.js`, tagged `transformations`) |
| `#read-the-triangle` | Palace Orbit locked to the model's selection | Relationship rule of the moment | Common mistake ("Judging a palace alone") |
| `#chart-sentence` | Term of the Moment (5.4) | Evidence checklist (star, brightness, palace, transformation, triangle) | One practice question, tagged `synthesis` |
| `#timing` | Chart Pulse (5.5) | Pronunciation term: 大限 Dà Xiàn | Rule: "Natal promise first, temporal trigger second" |
| `#walkthrough` | Chart Pulse mirroring the walkthrough step | Star of the moment from the current step | Practice question tagged `reading-order` |
| `#your-path` and below | Term of the Moment | Practice question (any due) | nothing |

**IntersectionObserver plan.** One observer on all `section.psa-section` elements, `rootMargin: "-40% 0px -40% 0px"`, threshold 0. The section intersecting that centered band wins; ties resolve to the later section in DOM order. On change, the rail swaps decks with a 180ms opacity crossfade (`--dur-fast`), no movement, and updates a visually hidden `aria-live="polite"` region with "Court rail: now showing {deck name}" at most once per 5 seconds (debounced so scrolling does not chatter). Under reduced motion the swap is instant.

Widget data comes from the same interaction bus the models publish to: models dispatch `document` CustomEvents (`psa:select` with `{type:'palace'|'star'|'hua', id}`) and the rail listens, so "star of the moment" is always the learner's star, falling back to a curriculum-ordered default when nothing is selected.

### 4.3 Pause control

A single button in the rail header: `⏸ Pause the court` / `▶ Resume`. Text label always visible (not icon-only). Pausing freezes all rolling widgets everywhere (they share one `psaMotion` flag), stops deck auto-swaps (the rail then only changes on explicit model interaction), and persists to `localStorage["zodi_psa_motion"] = "paused"`. `prefers-reduced-motion: reduce` forces the paused state and hides the resume affordance's animation claims (widgets render their static fallbacks, control still says Resume so the user can opt in).

### 4.4 Mobile bottom-sheet conversion

Below 1200px both rails disappear from the grid and their content moves into one bottom sheet component, opened from the sticky continue-lesson bar (9.4) or the subnav's More item. The sheet has two tabs, rendered as real `role="tablist"` tabs with text labels: **Your path** and **Living court**.

- Your path tab: widgets 1, 2, 3, 6 from the left rail (terms + glossary collapse into a "Terms" link).
- Living court tab: the current deck's cards, static (no rolling motion inside the sheet), plus the pause control.

Sheet mechanics: slides from bottom to 70vh max, drag handle + visible Close button (44px), `role="dialog"` `aria-modal="true"`, focus trapped, Escape closes, background scroll locked. Under reduced motion it appears without the slide. The sheet is also the mobile home of glossary definitions: any term tap opens it to a definition card with characters, pinyin, `say-btn`, literal translation, and the plain-English meaning (full term ladder collapsed under a "Full ladder" disclosure).

---

## 5. ROLLING WIDGETS

Global rules: every widget is a learning instrument; if its motion stops teaching structure it gets cut. All motion respects the shared `psaMotion` flag (4.3) and `prefers-reduced-motion`. No widget ever autoplays sound. Every widget is fully operable with a keyboard and readable when frozen.

### 5.1 The Court in Motion

- **Behavior.** A horizontal band showing the 14 principal stars as small seals (character + pinyin beneath) drifting slowly leftward on a loop, one full cycle ≈ 90 seconds. Stars are ordered by the two classical series (紫微 series then 天府 series), and a faint series label travels with each group, so even the ordering teaches the system's two families.
- **Interaction.** Hover or focus pauses the band (the whole band, so nothing escapes a screen magnifier). Click/Enter on a star stops the loop and opens its learning card in place: characters, pinyin + `say-btn`, literal translation, editorial title labeled "our title", one-sentence archetype, link to the star page. A visible "Resume the court" button restarts it.
- **What it teaches.** The 14 names, their two families, and the habit of hearing each name pronounced.
- **Reduced motion / paused.** Renders as a static two-row grid, one row per series, same cards on click. Nothing is lost except drift.
- **Data.** `ziwei-principal-stars.js` (id, hanzi, pinyin, literal, editorial, archetype line, series, audio).

### 5.2 Palace Orbit

- **Behavior.** A 12-position ring (SVG, ~260px) with palace branch characters at the positions. The current palace (from the interaction bus, else 命宮) is marked with a filled seat glyph, its mirror with a ◇ and the text tag `mirror`, its two triangle partners with △ and the text tag `triangle`; connecting chords are drawn as one dashed line (mirror) and two solid lines (triangle). When the selection changes, the marks travel around the ring over 400ms so the eye learns that the relationships are positional, always +4, +6, +8 around the wheel.
- **Interaction.** Each position is a 44px button; selecting one publishes `psa:select` so the main model and the orbit stay in lockstep. Arrow keys move selection around the ring (Left/Down = counterclockwise, Right/Up = clockwise), Home returns to 命宮.
- **What it teaches.** 三方四正 as geometry: the pattern never changes, only the seat.
- **Reduced motion / paused.** Marks jump instantly, chords still render. Fully functional.
- **Data.** `ziwei-palaces.js` + `ziwei-relationships.js` (the +4/+6/+8 rule constants live in relationships so the math is defined once).

### 5.3 Transformation Thread

- **Behavior.** A compact card showing the currently selected star with the four Hua as four labeled threads (祿 Lù, 權 Quán, 科 Kē, 忌 Jì). One thread at a time draws itself from the star to a one-line effect ("with 化祿 Huà Lù: resources flow through what this star governs"), holds 6 seconds, then the next thread draws. Each thread has a distinct line pattern in addition to its blueprint color: Lù solid, Quán double, Kē dashed, Jì dotted, so the four forces are distinguishable without color.
- **Interaction.** Four 44px chips under the card select a thread directly and stop the auto-advance until blurred. Chips show the character + pinyin, and the active chip gets a filled seal background + `aria-pressed="true"`.
- **What it teaches.** That transformations attach to stars, not palaces, and that each force rewrites the same star differently.
- **Reduced motion / paused.** All four threads render at once, fully drawn, with the four effect lines stacked. Auto-advance off.
- **Data.** `ziwei-transformations.js` (per-star effect lines) + `ziwei-principal-stars.js`.
- **Explicitly excluded.** No season framing (spring/summer/autumn/winter cards from the current Four Forces page) unless PSA-TERMINOLOGY.md rules the corpus supports it. The thread metaphor replaces it.

### 5.4 Term of the Moment

- **Behavior.** One glossary term at a time: characters large, pinyin, literal translation, plain-English line. Rotates every 25 seconds through a queue weighted toward terms attached to the centered section, then recently learned terms, then unlearned Foundation terms. Crossfade only, no movement.
- **Interaction.** The whole card is a button that freezes rotation and expands the full term ladder plus `say-btn`. A quiet "Next term" text button advances manually.
- **What it teaches.** Vocabulary retention through spaced re-exposure, in context.
- **Reduced motion / paused.** No rotation; shows the top-weighted term with the Next button. Nothing else changes.
- **Data.** `ziwei-glossary.js` + store `termsLearned[]`.

### 5.5 Chart Pulse

- **Behavior.** A miniature 4×4 chart grid (same GRID_ORDER perimeter layout as the Reader's School wheel) mirroring whatever the learner last did: seat a star, it appears; select a decade door in the timing model, that palace gets the door glyph 門; complete a walkthrough step, the step's palace gains a ✓. It changes ONLY on user input, per spec. No idle animation at all.
- **Interaction.** Read-only display; clicking it scrolls to the model that last wrote to it (the click target is one 44px button covering the widget, labeled "Open in the court").
- **What it teaches.** That every exercise is writing onto one persistent structure, the same 12 rooms every time.
- **Reduced motion.** Already static; state changes appear without transition.
- **Data.** The `psa:select` event bus plus store; renders from `ziwei-palaces.js` ordering.

---

## 6. THE SEVEN INTERACTIVE MODELS

Shared engineering rules for all seven, taken from the Reader's School code and upgraded:

- **Code base.** Reuse the chart page's patterns: `GRID_ORDER = [0,1,2,3,7,11,15,14,13,12,8,4]` perimeter grid with a 2×2 center block, `selectPalace`'s relationship math (`opp=(i+6)%12`, `tri=(i+4)%12` and `(i+8)%12`), `renderQuiz(mount, questions, {onProgress})` for anything scored, and the `markHall`/`paintPath` store pattern generalized to lesson events. Data moves out of inline arrays into the `ziwei-*.js` files; the hub loads them as plain scripts defining `window.ZIWEI = {...}` namespaces (no modules, matching the site's script style).
- **Targets.** Every interactive element ≥44×44px including the mini-grid cells at 320px (single-palace mode exists for this, 9.3).
- **Keyboard.** Everything reachable by Tab in DOM order; composite widgets (grids, rings) are single Tab stops using roving tabindex with arrow-key movement, per the maps below. No keyboard traps; Escape always closes transient panels.
- **Screen reader.** Each model is a labeled `role="group"`. One visually hidden `aria-live="polite"` region per model announces state changes in full sentences (exact strings below). Buttons use `aria-pressed`; nothing conveys state by class only.
- **Colorblind-safe states** (used consistently in every model):
  - active/selected: filled corner seal glyph 印 + 2px solid border + `aria-pressed="true"`
  - triangle partner: △ prefix + text tag `triangle` + dashed border
  - mirror/opposite: ◇ prefix + text tag `mirror` + dotted border
  - correct: ✓ + the word "Correct." leading the feedback line (chart page already does this)
  - incorrect: ✕ + "Not quite," + the right answer named in text
  - done/complete: ✓ prefix on the label
  Color (`--cc`, `--brass`, force colors) rides on top of these, never instead of them.
- **Reduced motion.** All transitions ≤180ms opacity-only under `prefers-reduced-motion`; travel/draw animations replaced by instant end states.
- **No gating.** Guidance notes recommend order; nothing is locked.

### 6.1 Model 1: Twelve Palace Court (`#the-court`)

The heart of the hub and the landing point of the teaser handoff.

- **Layout.** Desktop: the 4×4 wheel (center block shows 紫微斗數 + the current palace's core question) on the left, a reading panel on the right (the chart page's `#palace-panel` pattern). The panel shows the full term ladder as a labeled stack: characters + pinyin + `say-btn` / literal translation / standard English / "our title" (editorial, labeled) / plain meaning / practitioner meaning (last two under a "Reader's note" disclosure). Below the ladder: the core question, then Triangle and Mirror lines naming the partner rooms exactly as the chart page's `dl` does.
- **States.** One palace active at all times (default 命宮 or the `?palace=` param). Active/triangle/mirror per the shared state table. If `?star=` is present its token renders in the active cell with the beginner reading line attached.
- **Data.** `ziwei-palaces.js` (ladder, question, domain), `ziwei-relationships.js` (math + one-line rules).
- **Keyboard.** Wheel is one Tab stop. Arrows move roving focus clockwise/counterclockwise (Right/Down clockwise, Left/Up counter), Home = 命宮, End = 父母宮, Enter/Space selects. Tab exits to the panel; the panel's disclosure and say button are plain buttons.
- **Screen reader announcements.** On select: "{Editorial name}, {pinyin}. {Core question} Read together with {tri1} and {tri2}. Its mirror is {opposite}." On param load, prepend: "Opened from the homepage game."
- **What must NOT happen.** No hover-only information (the current hub's flip cards fail keyboard users; this model replaces them).

### 6.2 Model 2: Move-a-star (`#the-stars`)

- **Layout.** A star tray of 14 seals (scrollable row on mobile, two rows desktop, grouped by series) above a compact 12-cell court (the same wheel component in "focus" density). Below, the layered reading panel with four labeled layers: **Beginner sentence** (always open), **Intermediate**, **Reader's note** (practitioner), **Commonly misread as** (each a disclosure, chevron + text label).
- **Interaction.** Drag with pointer (teaser's pointer-capture pattern reused) OR pick-then-place: select a star (aria-pressed), then select a cell. Both paths are equal citizens; the hint line says "Drag the star, or tap a star and then a room."
- **States.** Seated star shows in the cell with its seal; the cell takes active state; triangle/mirror light per shared rules so the learner immediately sees that a star's meaning is read across three rooms plus the mirror. A persistent line under the panel: "One placement is never the reading. The court answers together." After 4 distinct placements it strengthens: "You have seated {star} in {n} rooms. In a real chart it sits in one, set at birth."
- **Data.** `ziwei-principal-stars.js .placements[palaceId] = {beginner, intermediate, practitioner, misread}` (14×12, sourced from the star pages per PSA-TERMINOLOGY.md), `ziwei-palaces.js`.
- **Keyboard.** Tray: roving tabindex, arrows move, Enter picks up ("{Star} lifted. Choose a room."), Escape cancels. Court: arrows move, Enter seats. All announced.
- **Screen reader.** On seat: "{Star pinyin}, {editorial title}, seated in {palace}. Beginner reading: {sentence}. Three more layers available below."
- **Sound hook.** Seating a star plays that star's family tone (7.4) if sound is on.

### 6.3 Model 3: Four Transformations lab (`#four-transformations`)

- **Layout.** Top: a birth-year input (number field + "Set the year" button, the chart page's `#age-input` pattern) OR a stem picker of ten 44px chips (天干 characters + pinyin), whichever the learner touches. Below: the four forces as four columns/rows, each showing which star that stem transforms, with the star seal, the force's character 祿/權/科/忌, line pattern (5.3's patterns reused), and a two-line effect: natal meaning and timing meaning, explicitly labeled "In a birth chart" / "In a year".
- **States.** Default stem = 丙 (Mei's 1996 chart, continuity with the school). Changing the stem re-deals the four assignments with a 300ms thread redraw (instant under reduced motion). The Hook 化忌 column always carries the standing line: "The Hook obstructs and teaches. It is never a doom sentence."
- **Data.** `ziwei-transformations.js .byStem['丙'] = {lu: starId, quan: …, ke: …, ji: …}` plus per-star effect lines; `ziwei-principal-stars.js` for seals.
- **Keyboard.** Stem chips: roving tabindex + arrows; year field: standard input, Enter applies.
- **Screen reader.** On apply: "Stem {pinyin}. Huà Lù flows to {star}. Huà Quán empowers {star}. Huà Kē distinguishes {star}. Huà Jì tests {star}."
- **Educational disclaimer** (blueprint module 2 rule, kept): "For study orientation. A full chart needs complete birth data."

### 6.4 Model 4: Build-a-chart-sentence (`#chart-sentence`)

- **Layout.** Three ingredient slots across the top (Star, Palace, Transformation optional), each a 44px picker button opening a compact chooser list. Below: a textarea labeled "Write the reading in one or two sentences." Then a "Compare" button. After comparing, three stacked panels: **A beginner would say**, **A practitioner would add**, **Evidence you did not have** (naming what a real reading would still need: brightness, the triangle, the mirror, timing).
- **States.** Compare is disabled (with visible text "Pick a star and a palace first", not just a grey button) until the two required slots are filled and the textarea has ≥20 characters. The learner's text is never scored by machine; the model answers appear beside it for self-comparison, and a self-check row of three buttons ("I had the core idea" / "I missed the palace's question" / "I overclaimed") writes a comprehension event to the store. Overclaiming is the taught failure: the third button's feedback quotes their own deterministic phrasing back if it contains flagged words (will, never, always, doomed) and shows the uncertainty-language rewrite.
- **Data.** `ziwei-practice.js .sentences[starId][palaceId] = {beginner, practitioner, missingEvidence[]}` (subset: the 14 stars × 命宮/wealth/spouse/career at minimum for wave 1, marked in the data file; other cells fall back to placement text from Model 2's data).
- **Keyboard.** All pickers are listboxes opened by button, arrows + Enter, Escape closes. Standard textarea.
- **Screen reader.** On compare: "Model answers shown below your sentence. Yours is unchanged." Self-check buttons announce their stored result.
- **Sound hook.** The self-check (any choice) counts as the meaningful action; two-note resolution only when the lesson wrapper completes.

### 6.5 Model 5: Read the Triangle (`#read-the-triangle`)

- **Layout.** The wheel component with exactly one scenario loaded (from Mei's chart): the Career palace with its stars. Beside it, an interpretation panel that rewrites itself as palaces toggle. Three labeled toggle switches (real buttons with `aria-pressed`, text labels, 44px): **+ Mirror (夫妻宮)**, **+ Triangle: 命宮**, **+ Triangle: 財帛宮**.
- **Interaction.** With all off, the panel shows the naive one-room reading and a caution line: "This is one room out of context." Each toggle adds that palace's evidence and the panel's verdict paragraph visibly grows more qualified and more accurate; the final state with all three on is the chart page's five-step verdict in miniature. Toggling is the lesson: the learner watches interpretation shift with structure.
- **States.** Toggled palaces light on the wheel with their shared tri/mirror marks. A progress line: "Reading with {n} of 4 rooms."
- **Data.** `ziwei-sample-charts.js` (Mei) + `ziwei-relationships.js` interpretation fragments: `.triangleLesson = {base, withMirror, withTri1, withTri2, full}` composed additively.
- **Keyboard.** Three toggles are plain buttons in tab order; the wheel remains browsable but read-only in this model.
- **Screen reader.** On toggle: "{Palace} added. The reading now weighs {n} rooms. {New verdict sentence}."

### 6.6 Model 6: Timing wheel (`#timing`)

- **Layout.** Collapsed by default behind a summary row ("Decade Doors and the Year Wave · assumes you know the palaces and the triangle · Open the model"). Expanded: the wheel with decade-door ages written into each cell (Mei's Fire Bureau sequence from the chart page's DOORS math), an age input + "Open the door" button, and a Year Wave row that highlights the palace whose branch matches the current year (2026 = 午 Wu), reusing the chart page's drill logic.
- **States.** The opened door cell gets a 門 glyph + solid border + "ages {from} to {to}" text; the Year Wave palace gets a ☀ glyph + text tag `this year`. Both can be active at once; the panel explains natal promise vs temporal trigger with both named: "The door sets the decade's theme. The year knocks on one room. Neither rewrites the birth chart."
- **Data.** `ziwei-sample-charts.js` (bureau, first-door age, direction), `ziwei-palaces.js` branches. The real casting engine is out of hub scope (chart page wave); this model runs entirely on sample-chart data.
- **Keyboard.** Summary row is a disclosure button. Inside: input + button, Enter applies (chart page pattern), wheel browsable.
- **Screen reader.** "Door open: ages {from} to {to}, lived in {palace}. This year's wave touches {palace}."

### 6.7 Model 7: Sample chart walkthrough (`#walkthrough`)

- **Layout.** A chart picker (two 44px tabs: **Mei · born 1996** and **Rui · born 1988**), then the five-step method as a vertical stepper (the chart page's `#case-steps` reveal pattern): 1 Find the Command Palace, 2 Read its stars and brightness, 3 Read the triangle and mirror, 4 Apply the year's transformations, 5 Speak the verdict with uncertainty language. Each step: a Reveal button, the reasoning paragraph, and the wheel snapshot for that step (Chart Pulse mirrors it).
- **The second chart.** Rui, born 1988 (戊辰 stem-branch year, Earth Bureau), designed in `ziwei-sample-charts.js` to contrast Mei on every axis the curriculum teaches: 命宮 holding 天府 (steward, not emperor), an empty Wealth palace that must borrow (teaching 借星 from the other side), Huà Jì on 貪狼 landing in the Spouse palace (a relationship lesson instead of Mei's career lesson), and a first decade door at a different age. Exact placements are fixed in the data file by the build session using doc 04's method and validated against it; this spec fixes the pedagogical contrasts, not the arithmetic.
- **States.** Steps reveal in order; revealing out of order is allowed but the step notes "You skipped step {n}; the verdict below assumes it." Completing step 5 on either chart writes the comprehension event `walkthrough:{chartId}`.
- **Keyboard.** Tabs are a `tablist`; steps are plain buttons.
- **Screen reader.** Each reveal announces the step title + first sentence.

---

## 7. SOUND SYSTEM

### 7.1 Principles

Off by default, everywhere, always. One toggle controls everything. Every sound has a text equivalent that renders whether or not sound is on, so sound is reinforcement, never information. No ambience, no loops, no casino payout sounds. All non-speech audio is synthesized with the Web Audio API at interaction time; no audio files exist in the repo (verified: none under `site/`), and none are needed.

### 7.2 Event list

| Event | Trigger | Sound (Web Audio) | Text equivalent (always shown) |
|---|---|---|---|
| Pronounce | `say-btn` press | speechSynthesis, the existing ranked-voice `zfSpeak`/`zaSpeak` pattern (Tingting/Meijia/Google preference, `lang="zh-CN"`, rate 0.78, `is-saying` class). Exempt from the sound toggle: pressing a pronounce button IS consent. | the pinyin is already visible; button gets `is-saying` state |
| Correct interaction | a scored answer right, a drill step done | single soft note, triangle wave, 220ms, pentatonic degree tied to context | "✓ Correct." feedback line (existing pattern) |
| Lesson complete | store lesson event fires | two-note resolution, fifth falling to root, 500ms total | reinforcement line from 7.5 in the model's live region and inline |
| Rank up | rank threshold crossed | one restrained bell strike (sine + short noise burst envelope), ≤900ms | the rank scroll card (existing exam pattern) |
| Star placement | Model 2 seat, Court in Motion select | the star's family tone, 260ms | the seal + reading panel update |
| Incorrect | wrong answer | NO SOUND. Silence plus the text correction. Wrong answers are information, not punishment. | "✕ Not quite," + correct answer |

Master gain capped low (≈ -18 dBFS equivalent); all envelopes have ≥60ms release so nothing clicks. The AudioContext is created lazily on the first sound-on interaction (autoplay-policy safe).

### 7.3 Toggle UI and persistence

One control, two placements pointing at the same state: the subnav's right end (desktop) and the bottom sheet's Living court tab (mobile). Rendered as a button with icon + text, never icon alone: `♪ Sound off` / `♪ Sound on` with `aria-pressed`. Key: `localStorage["zodi_psa_sound"]`, values `"on"` / `"off"`, absent = off. Toggling on plays the single correct-note once as confirmation; toggling off is silent. The preference is read by every zi-wei/PSA page, not just the hub.

### 7.4 Per-star-family tones

Three families, matching the structure the corpus teaches (series membership ships in `ziwei-principal-stars.js .series` and `.family`):

| Family | Stars | Tone recipe |
|---|---|---|
| Throne (紫微 series leaders: 紫微, 天府) | 2 | low register root (A2/D3), sine, slow 120ms attack: weight |
| Court (civil stars: 天機, 太陽, 天同, 天相, 天梁, 太陰, 巨門, 武曲, 廉貞, 貪狼 per corpus grouping) | 10 | mid register (A3 area) pentatonic degrees, triangle wave, 40ms attack |
| Vanguard (action trio: 七殺, 破軍, plus 貪狼 when the corpus groups it there; final membership per PSA-TERMINOLOGY.md) | 2-3 | higher register, sawtooth briefly lowpassed, 15ms attack: edge |

Each star gets a fixed scale degree within its family so repeated study builds an association. The map lives in `ziwei-principal-stars.js .audio = {family, degree}`. If Agent D's corpus reading places 貪狼 differently, only the data file changes.

### 7.5 Reinforcement copy

In-world, earned, never childish. Shown as the text equivalent on lesson/mastery events, drawn in order without repetition per session:

1. "The court is becoming legible."
2. "You found the opposing room."
3. "You are reading structure, not guessing."
4. "Three rooms, one verdict. That is how the court reads."
5. "The Emperor answers to the room he sits in. You saw it."
6. "You named the borrowed light."
7. "One placement is never the reading. You just proved you know that."
8. "The Hook teaches. You let it."
9. "The registry would take your hand for that entry."
10. "The doors open in order. So does your reading."
11. "You weighed the mirror before you spoke. That is the discipline."
12. "A chart holds still. A reader moves through it. You are moving."

Rules: these fire only on comprehension events (lesson complete, mastery check passed, self-check honest answer), never on raw clicks; max one per two minutes; they never stack with the rank-up scroll (rank copy wins).

---

## 8. CONTEXTUAL CTA COMPONENTS

### 8.1 The component

`psa-next`: one transition sentence + one button, full stop. No card, no grid, no image. Markup shape:

```
<div class="psa-next">
  <p>{transition sentence naming what was just learned}</p>
  <a class="psa-next-btn" href="…">{verb-first label}</a>
</div>
```

Style: the sentence in body text; the button a filled brass-on-ink pill, 44px min height, weight 600; an optional second action as a plain text link (color + weight, no underline). Max width matches the reading column, left-aligned. Exactly one `psa-next` between consecutive sections; none inside models.

### 8.2 Placement and state rules

Every CTA names the learning state that triggers its copy. The default copy assumes no interaction; the upgraded copy replaces it the moment the state is true (store or event bus):

| After section | Default copy | State | Upgraded copy + button |
|---|---|---|---|
| `#the-court` | "Twelve rooms, one geometry. The figures who live in them come next." → **Meet the principal stars** (scrolls to #the-stars) | any palace selected | "You can now recognize the twelve rooms. Next, meet the figures who occupy them." → **Meet the principal stars** |
| `#the-stars` | "Every star bends to its room." → **Move the Emperor** (focuses Model 2 with zi-wei picked) | first star seated | "You seated {star} in {palace}. Now watch a birth year re-color it." → **Open the Four Transformations** |
| `#four-transformations` | "Forces attach to stars. Structure attaches to rooms." → **Read the Triangle** | stem applied | "You flew the four forces for {stem}. Now read rooms together instead of alone." → **Read the Triangle** |
| `#read-the-triangle` | "A verdict needs more than one room." → **Write a chart sentence** | all 4 rooms toggled | "You watched the reading change three times. Try writing one yourself." → **Write a chart sentence** |
| `#chart-sentence` | "Sentences become readings when time enters." → **Open the timing model** | 3+ lessons complete anywhere | "Three lessons in. Your own chart would make this concrete: cast it and use it as your study map." → **Cast my chart** (never "get your fortune") |
| `#timing` | "Method beats memory. Watch a full reading in order." → **Walk through Mei's chart** | door opened | "You opened a door. See how a whole reading walks through them." → **Walk through Mei's chart** |
| `#walkthrough` | "The path from here is laid out level by level." → **See the Reader's Path** | walkthrough step 5 done | "You just followed a five-step reading end to end. The Reader's School drills it until it is yours." → **Enter the Reader's School** |
| `#your-path` | none by default | ≥1 lesson complete | "Save this path." → account page. The only account CTA on the page, and it never appears before visible progress exists. |

The cast chart, once cast, becomes the annotated study map: concepts already learned get highlighted on it, and nothing on it is ever blurred or presented as a paid lock.

---

## 9. VISUAL DIRECTION

### 9.1 Tokens and fonts to reuse (exact, from the current zi-wei hub inline styles)

Copy the `:root` block from `site/elements/zi-wei/index.html` lines 62-104 verbatim, including the `@supports not (color: oklch…)` hex fallbacks:

- Surfaces: `--ink oklch(0.16 0.03 275)`, `--ink-2`, `--panel oklch(0.25 0.04 273)`, `--panel-2`; rules `--line`, `--line-soft`
- Text: `--moon oklch(0.96 0.02 90)`, `--ivory`, `--body-text oklch(0.84 0.02 280)`, `--muted`, `--faint`
- Gold: `--brass oklch(0.78 0.11 85)`, `--brass-dim`, `--brass-bright`
- Accent: `--cc oklch(0.70 0.20 310)` imperial purple with `--cc-dim/-bright/-soft/-glow`
- Fonts: `--serif "Fraunces"` (display), `--sans "Geist","Inter"` (body/UI), `--mono "Space Mono"` (eyebrows, numbers, calculations)
- Layout: `--maxw 1120px` (center column), radii `--r-1 8px / --r-2 14px / --r-3 22px / --r-pill`, motion `--ease-out cubic-bezier(0.16,1,0.3,1)`, `--dur 320ms`, `--dur-fast 180ms`

Per-star accent colors: the 14-row star color table in `00-MASTER-BUILD-BLUEPRINT.md` (e.g. 紫微 `oklch(0.70 0.20 310)`, 貪狼 `oklch(0.62 0.24 340)`), applied as each seal's `--accent`. Four Forces colors from the same doc (Lù green-gold `oklch(0.65 0.20 140)`, Quán red-amber, Kē silver-blue, Jì deep violet), always paired with the line patterns from 5.3.

The restrained cyan named in the experience brief maps to the existing `--teal` used by the teaser (`--accent2:var(--teal)`); use it only for pronunciation/language affordances so it acquires a single meaning.

Component patterns to reuse: `.wrap`, `.section-eyebrow` (mono, 0.28em tracking, uppercase), section title scale, `.say-btn` (speaker SVG + `is-saying`), `ruby/rt` for all characters + pinyin, the `pn-sub` drop-panel mechanics, the chart page's `.zws-cell` wheel cells and `.zws-q/.opt[data-state]` quiz styling, parchment reading panels (`--panel` with `--line` rule and `--r-2`), and cinnabar seal accents: seals are the one place a saturated red `oklch(0.55 0.2 25)` appears, as small stamped squares, never as text color.

### 9.2 Banned

Generic course-dashboard chrome, SaaS card grids, neon horoscope glow, walls of equal-weight blocks, tiny all-caps body text (mono caps stay at eyebrow scale only), desktop rails squeezed into mobile columns, underlines of any construction, external-link arrows, hover-only reveals, autoplaying sound, smooth progress bars without discrete markers, countdown or streak mechanics, simplified characters, "kept secret for exactly 1,000 years" and every deterministic claim.

### 9.3 Mobile layout plan (320px floor)

- Single column, one clear learning action visible at a time. Section lead + one model + one `psa-next`; rails gone (bottom sheet per 4.4).
- **Chart display modes** (apply to every wheel instance: Models 1, 2, 5, 6 and Palace Orbit):
  - **Overview**: all 12 cells, branch character + 2-letter abbreviation only, cells ~72px, read-only tap targets that switch to focus mode.
  - **Focus**: active palace large at top, its triangle pair and mirror as three labeled cards beneath (△ △ ◇ tags), everything else collapsed to a 12-dot strip that returns to overview.
  - **Single-palace**: one full card (complete term ladder + question + reading) with Previous/Next room buttons (44px) and position indicator "Room 5 of 12". This is the mode where 44px targets are guaranteed at 320px.
  - Mode switch is three labeled segments (`Overview / Focus / One room`), persisted per session. Swiping left/right in single-palace mode moves rooms; swipe is additive to the buttons, never the only path.
- **Sticky continue-lesson bar**: bottom-fixed, 56px, three zones: current lesson title (truncated), **Continue** button, and the Path button that opens the bottom sheet. Hides while the bottom sheet or a model chooser is open. Safe-area padded. It is the mobile home of the progress chip.
- No horizontal overflow at 320px: the only sideways scrollers are the subnav row and the star tray, both fade-masked. Test gate in the master plan's acceptance checks.

### 9.4 Motion budget

Only the five rolling widgets and the models' state transitions move. Nothing in headers, CTAs, or backgrounds animates (the old hero's twinkling star field does not return). Every animation is listed in this doc with its teaching purpose; anything else found in build review gets cut.

---

## 10. RECONCILED DECISIONS (final, ruled 2026-07-07 by the coordinating session)

1. **福德宮 naming: RESOLVED.** Canonical id `fortune` (aliases `soul` and teaser `life`→`ming-gong` mapping stand as specified in §2). Ladder per PSA-TERMINOLOGY.md: 福德宮 · Fúdé Gōng · literal "Fortune-and-Virtue Palace" · standard English "Fortune Palace" · editorial "The Soul Palace" (labeled editorial). UI shows the standard term at teaser scale and the full ladder inside the hub.
2. **Progress vocabulary: RESOLVED.** Agent A extended the ladder to six ranks (Court Novice 入門, Palace Scribe 宮書, Star Keeper 司星, Warden of the Forces 司化, Keeper of the Doors 司門, Imperial Astrologer 欽天監). The subnav chip shows `"{Rank} · Level {n} of 8"`; the stage card shows rank + current lesson. Only the rank string source changes; all layouts in this doc stand.
3. **Four Forces season cards: RESOLVED — keep-with-relabel** (PSA-TERMINOLOGY.md ruling). The season framing survives only on the four-forces child page as a labeled teaching metaphor. It stays out of every hub widget and model exactly as specified in this doc.
4. **貪狼 sound family: RESOLVED — Vanguard.** Tan Lang belongs to 殺破狼 Shā Pò Láng (the Vanguard Trio) per Agent D's series table; data-file assignment only, no spec change.
5. **Simplified `pn-sub` characters: RESOLVED.** The new subnav and all new PSA surfaces ship traditional characters only. The full simplified-character correction list for existing pages is PSA-TERMINOLOGY.md §3; those fixes ship in the same wave that touches each page.
