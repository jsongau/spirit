# NEXT — connect the personal reading to the whole hub (cast-chart integration)

Parked spec for the "make it all connected" work on the Purple Star Astrology hub. Pick this up
next time. Everything below is scoped to be execution-ready.

## Where we are (already shipped / staged)
The cast-your-chart widget (`site/js/ziwei/ziwei-cast-ui.js` + `site/js/ziwei/ziwei-lunar.js`) is
live: hero birth form (date optional, time optional), verified Gregorian→lunar converter, a
personalized **reading** (Life Palace focus + your Four Transformations + room-by-room), an
**interactive board** (click a room → light its triangle + mirror + highlight its room card), a
**layout toggle** (Beginner Life-top-left ⟷ authentic branch-fixed), and a **left sticky rail** to
change the birth hour live. The teaching models below still run on the sample chart (Mei, 1996).

## The asks (from the 2026-07-08 session), in priority order

### 1. Move the sticky time control from the LEFT to the BOTTOM — desktop AND mobile
- Today it's `#pcast-siderail`, `position:fixed; left:14px`, hidden `<1320px`.
- Change to a bottom-docked bar: `position:fixed; left:0; right:0; bottom:0`, full-width, visible on
  all sizes (it's the mobile answer too). Keep it compact (one row: date · hour selector · edit).
- Respect `env(safe-area-inset-bottom)`. Don't overlap the page footer awkwardly — add matching
  bottom padding to the result section or body when the bar is present.

### 2. Default birth hour when unknown (the "master's default")
- Today, unknown hour → locked board + "hour missing" panel. Instead: cast with a **default hour**
  so a full reading always renders, clearly flagged as a placeholder.
- Default: **noon, 午時 (11:00–13:00)** — the common practitioner fallback when the hour is truly
  unknown. Flag it: "Using a default noon hour — set yours below to correct the chart."
- The bottom bar's hour selector lets them adjust through all 12 branches and watch it change.
- Keep an explicit "I don't know" that maps to this default (not to a locked board).

### 3. Show the timezone → Zi Wei hour (時辰) conversion
- In the bottom bar (and/or reading header), show how their clock time maps to the two-hour branch:
  e.g. `8:00 PM (Central Time) → 戌時 (19:00–21:00)`.
- This makes the timezone field meaningful and visible. `hourBranchIndex(hour)` already gives the
  branch; format `HOURS[idx]時 · HOUR_RANGE[idx]` (both arrays already in cast-ui.js).
- Optional stretch: offer true-solar-time correction later; for now just show the branch mapping.

### 4. Pre-fill the Four Transformations module from the cast (the real "connection")
This one is clean and correct — the module is **template-driven**, not Mei-prose.
- Controller: `buildTF()` in `site/elements/purple-star-astrology/index.html` (~line 2218).
  It has `var current = "丙";` (Mei's stem), a year input `#psa-tf-year-input` + `#psa-tf-year-set`,
  stem chips, and `render(stem)` which rebuilds from `ZD.stemTableByStem[stem]`.
- Plan: when the user casts, expose the chart globally and fire an event; `buildTF` listens and
  calls `render(userYearStem)` + fills the year input with their birth year.
  - In `ziwei-cast-ui.js` submit: set `window.ZiweiData.userChart = { year, yearStem, yearBranch,
    lunar, chart }` and `document.dispatchEvent(new CustomEvent("psa:cast", { detail: ... }))`.
  - In `buildTF`: on `psa:cast`, `render(detail.yearStem)` and set the year input; also on init,
    if `window.ZiweiData.userChart` already exists, prefill from it.
- Result: "why doesn't the forces module show MY year?" is solved — it defaults to their stem after
  casting, still freely explorable.

### 5. Make the interactive teaching modules relate to the reading (connective tissue)
User confusion: "now that I have my reading, how do I use these modules / how do they relate?"
- Add a one-line **"How this connects to your reading"** note at the top of each teaching model when
  a chart is cast (via the same `psa:cast` flag), e.g. on The Twelve Palace Court: "You just saw
  these twelve rooms on your own chart above — here, learn the geometry that every chart shares."
- **Court (Model 1, `#psa-wheel`)**: geometry, universal — safe to seat the user's stars into the
  cells when cast (optional nicety). The reading panel is palace-geometry, unchanged.
- **Move-a-star (`#the-stars`)**: teaching tool; add a note linking back to the star sitting in the
  user's Life Palace.
- **Read-the-Triangle (`#read-the-triangle`)**: driven by `ZD.triangleLessons.mei` — **hand-written
  prose about Mei's Career**. Do NOT blind-swap the chart (words would go wrong). Either leave as the
  crafted example (recommended) or build a real generator from `principalStars[*].placements[palace]`
  (rich per-star-per-palace data exists) — accept it reads more mechanical than the authored version.
- **Timing (`#timing`)**: runs on Mei's bureau/doors; personalizing needs the user's bureau +
  door direction (both are in the cast `chart` object: `bureau`, `doorDirection`, `doors`). Feasible
  later; medium effort.

### 6. Overall: a shared channel so everything can react
- Single source of truth: `window.ZiweiData.userChart` (set on cast, updated on hour change).
- Event: `psa:cast` (detail = the chart), plus reuse the existing `psa:select` bus.
- Modules opt in by listening; nothing breaks if no chart is cast (they stay on the sample).

## Data / code anchors (so you don't re-hunt)
- Cast chart shape (`ZiweiData.caster.castChart` → returns): `palaces{pid:{branch,branchIndex,stem,
  stars:[{id,hua?}],isBody}}`, `lifeBranch/lifeIndex`, `bureau{num,element,hant,standard}`,
  `ziWeiBranch`, `natalHua{starId:force}`, `doorDirection`, `doors[]`, `mingZhu`, `shenZhu`.
- Per-star-per-palace readings: `ZiweiData.principalStars[i].placements[palaceId].{beginner,
  intermediate,practitioner,misread}` (all 14 stars populated).
- Palace data: `ZiweiData.palaces[i]` → `{id,hant,pinyin,question,domain,editorial.title,
  oppositeId,trineIds,branchOrder}`.
- Year stem→transformations: `ZiweiData.stemTableByStem[stem]` (used by buildTF).
- Sample charts: `ZiweiData.sampleChartById.mei` / `.rui`; triangle lesson prose:
  `ZiweiData.triangleLessons.mei`.
- Teaching court layout: `GRID_ORDER=[0,1,2,3,7,11,15,14,13,12,8,4]`, palaces sorted by `branchOrder`.

## Verify before shipping
- Node stub smoke test (pattern used in this project): cast → assert reading + board render; toggle
  hour via the bar → re-render; `psa:cast` fires and buildTF re-renders to the user's stem.
- Regenerate `_preview-cast-chart.html` for a browser check (relative scripts don't load on Safari
  `file://`; the self-contained preview does).
- Deploy: stage only the touched files, commit, user runs `git push` from `~/Primal Animal/site`.

## Honest scope note to restate to the user
The reading up top already IS the teaching adapted to their birth (their rooms, triangle/mirror,
transformations, interactive). The deep worked-example lessons stay on Mei because their value is
authored prose, not swappable data — unless they explicitly want auto-generated (thinner) versions.
