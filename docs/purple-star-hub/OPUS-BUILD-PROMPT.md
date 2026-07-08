# OPUS 4.8 PROMPT — FINISH THE PURPLE STAR ASTROLOGY BUILD (WAVES 2-5)

Copy everything below this line into a Claude Opus 4.8 session running inside the Primal Animal repo.

---

# ROLE AND OBJECTIVE

You are the build engineer for the Purple Star Astrology hub in the local Primal Animal repository. Planning is complete and wave 1 has shipped. Your job is to execute the remaining waves of `docs/purple-star-hub/PSA-MASTER-PLAN.md` exactly as ruled, one wave per session, verifying each wave before moving on. Do not re-litigate any decision in the plan's Decisions Register; if you believe a ruling is wrong, log it in the changelog and follow the ruling anyway.

# READ FIRST, EVERY SESSION

1. `docs/purple-star-hub/PSA-MASTER-PLAN.md` — decisions D1-D14, architecture, waves.
2. `docs/purple-star-hub/CHANGELOG.md` — what has already shipped (wave 1 + 1.1 addendum). Pick the first wave not marked SHIPPED.
3. The spec doc for what you are building this wave: `PSA-HUB-EXPERIENCE.md` (models, rails, widgets, sound), `PSA-CURRICULUM.md` (lessons, ranks, storage, CTA ladder), `PSA-CONNECTION-MAP.md` (bridges + anchor copy), `PSA-TERMINOLOGY.md` (term ladders, corrections list, C-rulings including C8).
4. The shipped code you extend: `site/elements/purple-star-astrology/index.html` (the hub), `site/elements/purple-star-astrology/chart/index.html` (the Reader's School engine you reuse), `site/js/ziwei/*.js` (the data layer).

# CURRENT STATE (as of 2026-07-07, wave 1 + 1.1 shipped)

- Tree moved: everything lives at `site/elements/purple-star-astrology/`; 301s in `site/vercel.json`; zero internal references to the old path remain. NOT yet committed to git (sessions here may lack git access; if you have it, commit per wave).
- `site/js/ziwei/`: palaces (12, full ladders + geometry + aliases + rubyPinyin), principal-stars (14; only zi-wei has `placements`, the other 13 are `placements: null` — wave 2 fills them), transformations (+ stem table), relationships (opposite/trine/court, geometry per D3/C8), pronunciation (46 terms + speak() with the sitewide zaSpeak voice ranking), glossary (20 terms). All attach to `window.ZiweiData`.
- The hub page has: orientation header with teaser handoff, dedicated sticky subnav (Study/Reference groups; unshipped items are labeled "coming" states), Model 1 Twelve Palace Court (keyboard + aria-live + △ triangle / ◇ mirror shape+text markers), `?star=&palace=` deep links from the teaser, first contextual CTA, explore section, BaZi bridge section, hidden rail containers stubbed for wave 2.
- Live-error corrections shipped: trust copy, COURTS geometry, canonicals, 化権→化權.

# BINDING CONVENTIONS (violating any of these is a failed wave)

1. **Ruby pinyin everywhere.** Every Chinese string on any PSA surface renders per-character tone-marked pinyin above the characters via `ZiweiData.rubyHtml(hant, rubyPinyin)`. Never a separate pinyin line beside characters. New data entries must include `rubyPinyin` arrays matching the `pinyin` field syllable-for-syllable. Containers keep `lang="zh-Hant"`.
2. **Traditional characters only.** Self-check new content for simplified forms (数门阴阳禄权机贪杀 etc.).
3. **One Mandarin voice.** All pronunciation goes through `ZiweiData.speak(id)` (zaSpeak ranking: Tingting/Meijia > Google Mandarin, rate 0.78). No autoplay, ever.
4. **Relative asset paths** on PSA pages (`../../css/...`, `../../js/...`) so file:// works — the owner reviews pages from disk. Test every page you touch by its file:// behavior (no fetch(), no modules, no absolute asset links).
5. **No underlined text links, no border-bottom fake underlines, no ↗ icons, no em-dash separators, plain-English anti-AI voice, no hype words.**
6. **Colorblind-safe state grammar:** 印 seal = active, △ + "triangle" = trine, ◇ + "mirror" = opposite, ✓/✕ + words for scoring. Shape+text always; color never alone.
7. **Keyboard + screen reader:** every interactive model fully keyboard-operable, aria-live announcements, 44px targets, prefers-reduced-motion respected (motion off = everything still works), visible focus states.
8. **Term ladder integrity:** editorial titles always labeled ("Zodi Animal title"), never presented as literal translations. Content truth is `site/docs/zwds/01-05` (00 is superseded, D13); where the corpus is silent, write "needs source" in the changelog rather than inventing (D14).
9. **No deterministic fortune claims** (health, death, wealth, marriage, disaster). No account gates on learning. No streaks, urgency, or paid locks.
10. **Comprehension events only** in progress tracking, never raw clicks (D9: `zwdsSchool.v2`, imports v1 once, mirrors hall flags back).
11. **Sound is off by default,** one toggle, preference in `zodi_psa_sound`, Web Audio synthesized (no audio files), every sound has a text equivalent, wrong answers get silence.
12. **Karma stays dark** until `zwds_*` earn kinds exist in the server `zodi_award` RPC (D10). No Karma copy anywhere until then.

# HOW TO WORK

- One wave per session. Read the wave's spec sections IN FULL before writing code. Reuse the Reader's School engine patterns (GRID_ORDER wheel, renderQuiz, +4/−4/+6 court math) instead of inventing new ones; the `psa:select` CustomEvent bus keeps models, rails, and widgets in lockstep.
- Use subagents for parallelizable extraction work (e.g. wave 2's 13×12 placement readings) but reconcile and verify their output yourself: spot-check at least 10 entries against the source star pages, run every lint below.
- After building, run the wave's acceptance checks from PSA-MASTER-PLAN §5 plus the lint set below, fix failures, then append a dated entry to `docs/purple-star-hub/CHANGELOG.md` (what shipped, what deviated and why, what remains).
- If something in the plan cannot be built as specified, build the closest compliant version, and log the delta in the changelog. Never silently skip.

# LINT SET (run via bash after every wave, on touched files)

- `node --check` every touched .js file and every inline script extracted from touched .html (skip type="application/ld+json"; validate those with a JSON parse instead).
- grep: zero `elements/zi-wei` outside vercel.json redirect sources; zero "kept secret", "already written"; zero deterministic-claim spot checks on new copy; zero ↗; zero `text-decoration: underline` on links (a `none` value is fine); zero simplified characters in new strings; every new `<ruby>` block has matching `<rt>` count.
- python: balanced `<script>` tags; no duplicate `id=` values in content you added (the baked global nav has known pre-existing `moon-full-t/d` dupes — ignore those).
- Data integrity: load all `ziwei-*.js` in node with a stubbed `window`, assert relationships.court("ming-gong").members = ming/cai-bo/guan-lu/qian-yi and any new structures you added.
- 320px sanity: no fixed widths beyond the card grid; the only horizontal scrollers on the hub are the subnav row and star tray.

# THE WAVES (scope summary — the master plan §5 is authoritative)

## Wave 2 — The living hub
Fill the 13 missing `placements` in ziwei-principal-stars.js (beginner/intermediate/practitioner layers extracted from each star page's 12 palace sections + doc 02; every entry needs rubyPinyin untouched, sourceNote where the star page and doc 02 disagree). Build Models 2 (Move-a-star), 3 (Four Transformations lab), 5 (Read the Triangle); both sticky rails (left: Your Path; right: Living Court, IntersectionObserver with -40% rootMargin, one shared pause flag in `zodi_psa_motion`); the five rolling widgets (Court in Motion, Palace Orbit, Transformation Thread, Term of the Moment, Chart Pulse — input-driven only); the sound system + reinforcement copy set from PSA-HUB-EXPERIENCE §7. Mobile: rails collapse into the two-tab bottom sheet behind the sticky continue-lesson bar.
Checks: sound-off/reduced-motion/keyboard/colorblind pass on every model; right rail follows scroll; widgets pausable; 320px clean.

## Wave 3 — The academy
Curriculum UI for L1-L3 wired to existing pages (`ziwei-lessons.js` from PSA-CURRICULUM's lesson tables); `zwdsSchool.v2` storage with v1 import + mirror-back; six-rank ladder with legacy grandfathering (`legacyRank: true`); Foundation Exam rebrand on the chart page; full CTA ladder; glossary child page (`glossary/`, new, from ziwei-glossary.js + pronunciation, ruby everywhere); Model 4 (Build-a-chart-sentence).
Checks: v1 progress imports and mirrors back (test with a seeded v1 blob); legacy ranks honored; every lesson reachable without an account; "Save this path" appears only after first progress event.

## Wave 4 — Casting and depth
The casting engine per doc 04 (hour/day branch → Life Palace, 五行局 bureau → Zi Wei position → 14 placements → transformations by year stem) in a new `ziwei-caster.js`; MUST reproduce Mei's pre-cast chart exactly (assert in a node test) plus two hand-checked cases documented in the file. Annotated study chart on the chart page (learned concepts highlighted, nothing blurred/locked). Second sample chart "Rui, 1988". Model 6 Timing wheel (guided after foundation, never locked) + the Three Clocks block (almanac vs BaZi luck pillars vs ZWDS cycles — three systems, never conflated) with bridges B4/F2. L4-L7 lesson wiring. New `supporting-stars/` child page from doc 05 groups (L6 home, D11), then un-disable its subnav item.
Checks: caster reproduces Mei exactly; timing gated as guided-not-locked; three clocks copy keeps the systems distinct.

## Wave 5 — The Reader's Path and the sweep
L8: synthesis lessons, ethics, teach-backs with model answers, consultation structure labeled house method; 20-question Imperial exam (Imperial Astrologer requires it, D8). Remaining connection-map bridges with their exact anchor copy. Karma bridge ONLY if the server kinds exist (else leave dark, log it). Full simplified-character + trust sweep of all child pages per PSA-TERMINOLOGY §3 and §5 lists (this is when the star pages, palaces, stars index, four-forces get their character fixes + the four-forces season cards get the "teaching metaphor" relabel per D6, and the zi-wei star page gets the C1 transformation correction). Production audit: all internal links, duplicate ids, schema, overflow, the FABLE-PROMPT.md final checklist.
Checks: a keyboard-only, sound-off, reduced-motion, colorblind learner completes one full lesson loop and one practice drill end to end; zero simplified characters remain under `elements/purple-star-astrology/`.

# RETURN FORMAT PER SESSION

End with: the wave shipped, files touched, lint results, deviations logged, and the single next action for the following session.
