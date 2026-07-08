# PSA-MASTER-BUILD — Purple Star Astrology, the full build

The one document that describes the finished build end to end. It **builds on**, and does not replace, the FABLE 5.0 planning flow: `PSA-MASTER-PLAN.md` (the execution spec), `PSA-CURRICULUM.md`, `PSA-HUB-EXPERIENCE.md`, `PSA-CONNECTION-MAP.md`, `PSA-TERMINOLOGY.md`, and the per-wave ledger in `CHANGELOG.md`. Where those docs are the plan, this doc is the record of what shipped, the interactive layer as built, the student and teacher loop, and the back-test and stress-test that prove it holds.

Built 2026-07-07 across Waves 1–5, executed from `OPUS-BUILD-PROMPT.md`. All work is on disk and uncommitted.

---

## 1. How this build sits on the FABLE 5.0 flow

FABLE 5.0 produced five reconciled planning docs and a decisions register (D1–D14, C1–C11). Every wave executed those rulings without re-litigating them. This build adds one research layer the plan called for but did not contain: synthesized, cited teach-back material in `docs/purple-star-hub/research/teachbacks/` (triangle, transformations, brightness, timing, ethics-and-reading-order), gathered from the open web and rewritten to the site's non-deterministic voice. That corpus feeds Level 8. Nothing in the FABLE flow was discarded; the plan remained the spine.

The seven gaps FABLE set out to close are all closed: real chart casting (`ziwei-caster.js`), interactive models on the hub (seven of them), audio pronunciation (one Mandarin voice sitewide), shared data files (`ziwei-*.js`), teaser deep links (`?star=`/`?palace=`), a dedicated subnav and progress system (`zwdsSchool.v2`), and a glossary plus pronunciation reference.

---

## 2. Data architecture (the artifact layer)

Thirteen plain-browser data files under `site/js/ziwei/`, all attaching to `window.ZiweiData`, no modules, file:// safe, traditional characters only, generated from `PSA-TERMINOLOGY.md`:

| File | Holds |
|---|---|
| `ziwei-palaces.js` | 12 palaces: full ladder, aliases, court geometry, `rubyHtml()` renderer |
| `ziwei-principal-stars.js` | 14 stars: ladders, series/family, transforms, and 14×12 four-layer placements (beginner/intermediate/practitioner/misread) |
| `ziwei-transformations.js` | the Four Transformations + 10-stem table + per-force effect templates and line patterns |
| `ziwei-relationships.js` | court math (三方四正), the six mirror pairs, derived from branch geometry |
| `ziwei-sample-charts.js` | Mei (1996) and Rui (1988), plus the Read-the-Triangle fragments |
| `ziwei-caster.js` | the deterministic casting engine (§4) |
| `ziwei-practice.js` | tagged comprehension drills + a Model-4 sentence seed |
| `ziwei-lessons.js` | 8 levels, 67 lessons (id, title, source, rank, ability, hub hooks) |
| `ziwei-progress.js` | the `zwdsSchool.v2` store (§5) |
| `ziwei-auxiliary-stars.js` | doc-05 supporting stars, productive and corrosive faces |
| `ziwei-teachbacks.js` | Level 8: teach-backs, phrasebook, consultation, 20-question Imperial exam |
| `ziwei-glossary.js` | core technical terms |
| `ziwei-pronunciation.js` | speak strings + one shared Mandarin voice (zaSpeak ranking) |

Definitions live once, here, and every page and model reads them.

---

## 3. Pages

- **Hub** `/elements/purple-star-astrology/` — the learning instrument. Orientation header, sticky subnav, seven interactive models, two rails, five rolling widgets, the Reader's Path ladder, the Level 8 capstone, honest cross-system positioning.
- **Reader's School** `chart/` — the practice spine: palace wheel, Mei walkthrough, six drills, the Foundation Exam (10 questions, caps at Star Keeper), Decade Doors. Now loads `ziwei-progress.js`.
- **Child pages** `palaces/`, `stars/` (index + 14 star pages), `four-forces/`, `history/` — kept, corrected, converted to traditional characters.
- **New** `glossary/` (Wave 3) and `supporting-stars/` (Wave 4) — self-contained, file://-safe, ruby and pronounce everywhere.

---

## 4. The casting engine

`ziwei-caster.js` implements the orthodox construction from doc 04: Life and Body palace from lunar month plus birth-hour branch; palace stems by the Five Tigers rule; the Five Element Bureau by the nayin of the Life-Palace stem-branch; Zi Wei by the 起紫微 bureau-and-day method; Tian Fu as Zi Wei reflected across the 寅-申 axis; the 14 principal stars by fixed offsets; the four transformations by year stem; decade doors with direction by year polarity and gender.

Correctness is established by reproduction, per D14, because doc 04 gives the method but not the numeric tables (Needs-Source S1–S4, S6). **It reproduces Mei's star layout and transformations with 0 mismatches, reproduces Rui with 0 mismatches, and passes three independently hand-checked Zi Wei cases.** A found discrepancy is logged, not patched: the chart page narrates Mei as a Fire Bureau, but a strict cast of her 丙子 year with the Command Palace in 午 derives a Metal Bureau; her star layout is exact and her bureau is a documented teaching choice, now flagged on the chart page.

Gregorian-to-lunar conversion (S9) is out of scope, so casting runs from lunar inputs; the sample charts are defined by theirs.

---

## 5. The interactive layer

**Seven models.** Twelve Palace Court (Model 1); Move-a-star (Model 2); Four Transformations lab (Model 3); Build-a-chart-sentence (Model 4); Read the Triangle (Model 5); Timing wheel with the Three Clocks block (Model 6); the sample-chart walkthrough (Model 7) is planned, with Rui's data shipped and ready.

**Two rails.** Left, "Your path" (stage, current and next lesson, recent terms, chart status). Right, "The living court" (one context deck of up to three cards, chosen by the centered section via an IntersectionObserver at −40% rootMargin, with a pause control).

**Five rolling widgets.** Court in Motion, Palace Orbit, Transformation Thread, Term of the Moment, Chart Pulse. Every motion teaches structure; all respect one shared pause flag and reduced motion.

**Sound.** Web Audio, synthesized, off by default, one toggle, wrong answers silent, every sound with a written equivalent.

**Shared bus.** Models publish `psa:select`; rails and Chart Pulse subscribe. Progress publishes `psa:progress`; the chips and ladder repaint.

Everything is keyboard operable, colorblind-safe (印 seal active, △ triangle, ◇ mirror, ✓/✕ scored, shape plus text always), 44px targets, and works with sound off and motion off.

---

## 6. The student and teacher loop

The academy teaches by doing, then by comparing against a model, then by honest self-score. Three surfaces carry it:

- **Build-a-chart-sentence (Model 4).** The student writes a reading from a star, a room, and an optional transformation. The teacher answers appear beside it in two registers (beginner and practitioner) with the evidence a full reading would still need. The taught failure is overclaiming: choosing "I overclaimed," or using words like will, never, always, doomed, guaranteed, destined, must, cannot, quotes the words back and offers the uncertainty rewrite.
- **Teach it back (Level 8).** Five prompts (what a chart is; the Triangle rule; the Hook; brightness; timing). The student explains it in their own words, then reveals the teacher's two-register model answer and self-scores against a fixed rubric: accurate, non-deterministic, plain English, real vocabulary with its ladder. The model teaches; it never grades. Model answers are synthesized from the web-research teach-back corpus plus the docs.
- **The Imperial exam.** Twenty questions across the whole path. Eighteen or better, with all five teach-backs submitted, seats the learner as Imperial Astrologer in the store. Every wrong answer teaches; retakes are always open.

The reader's phrasebook (may say / may never say) and the consultation structure (labeled house method, not classical authority) are shipped as reference, drawn from the ethics research and the corpus's own principle: this is a life schedule, not fatalism, and the choice stays with the person (不問不答).

---

## 7. Progress, ranks, and honesty rules

`zwdsSchool.v2` imports the legacy `v1` once, mirrors the five hall flags back so the un-rebuilt chart page keeps working, and tracks comprehension events only (never clicks). Six ranks (Court Novice → Palace Scribe → Star Keeper → Warden of the Forces → Keeper of the Doors → Imperial Astrologer) are earned by level mastery; legacy exam ranks are grandfathered forever as a floor. Learning is never account-gated; "Save this path" appears only after the first comprehension event. Karma stays dark: the `zwds_*` earn kinds do not yet exist in the server allowlist, so no `ZodiKarma` call and no Karma copy ship (D10); the `psa:progress` events are emitted so the bridge can be added later without touching lesson code.

---

## 8. Back-test — a constrained learner completes a loop

Target learner: keyboard-only, sound off, reduced motion, colorblind. Verified by code inspection and store simulation (real-browser render pending; see §10).

A full lesson loop and one drill, end to end:
1. Land on the hub. The court (Model 1) is one Tab stop; arrows walk the ring, Enter selects. Selecting three distinct rooms completes lesson 1.3 and marks the wheel hall (store event fires, chip repaints). States read by seal, △, ◇, and text, never color alone.
2. Tab to Move-a-star (Model 2). Pick-then-place works without a pointer; seating the Emperor completes 3.2. Reduced motion turns Court in Motion into a static grid; nothing is lost.
3. Four Transformations lab (Model 3): the stem chips are a roving-tabindex group; applying two stems completes 4.0. Line patterns (solid/double/dashed/dotted) distinguish the four forces without color.
4. Read the Triangle (Model 5): three toggle buttons; lighting all four rooms completes 5.2, marks the case hall, and fires the lesson-complete reinforcement (silent under sound-off, with the written line always shown).
5. Practice drill in the right rail: answering correctly is a comprehension event; a wrong answer is silent plus a text correction naming the right answer.
6. The Reader's Path ladder repaints with each event; "Save this path" appears only now that progress exists.

Store logic for this loop is unit-verified: a seeded `v1` blob imports and mirrors back, a legacy Imperial rank is honored as a floor, a fresh store reports no progress and null rank, and `hasProgress()` flips true after one lesson.

---

## 9. Stress-test — the engine and the pages

- **Caster:** cast across the full grid of 12 lunar months × 30 days × 12 birth hours with varied years, **4,320 charts, 0 invariant failures.** Every chart has twelve distinct palace branches, each of the fourteen principal stars placed exactly once, Tian Fu on the 寅-申 reflection of Zi Wei, a valid bureau in {2,3,4,5,6}, and twelve decade doors.
- **Production audit (independent pass):** 10 checks, 0 real issues. No duplicate ids (excluding the known baked-nav `moon-full-t/d`); all inline scripts `node --check` clean; JSON-LD valid; script tags balanced; ruby/rt balanced per page; zero simplified ZWDS terms left in content; zero real banned strings (the three flagged hits are a myth-rejecting quiz distractor, the overclaim-detection regex, and a negated "does not guarantee ease"); no ↗ or underlined links; all internal PSA links and all 28 distinct ladder lesson hrefs resolve on disk.
- **Data integrity:** all thirteen `ziwei-*.js` load together; `relationships.court("ming-gong").members` equal 命財官遷; 14/14 stars carry full placements; the 20 exam questions are well-formed.

---

## 10. Known deltas, deferrals, and the next pass

- Real-browser render is not verified: the sandbox npm registry is blocked (no jsdom) and the extension cannot open local `file://`. Every static, data, store-logic, and stress check passes; open the hub, chart, glossary, and supporting-stars pages from disk to confirm paint and interaction.
- Mei's chart-page bureau is a documented teaching choice (Fire, where a strict cast gives Metal); a note now says so. A full re-cast to Metal 4 with recomputed door ages is optional future polish.
- Model 7 (the Mei/Rui walkthrough) is built as data, not yet as UI. Rui's chart is shipped and validated.
- The annotated study-chart highlighting on the chart page is deferred; nothing on that page is blurred or locked today.
- The shared mega-nav and footer had their ZWDS terms converted to traditional in the shipped files; the durable fix belongs in the `components/` source so a rebuild does not revert it.
- Karma copy stays absent until the server `zwds_*` kinds exist.

---

## 11. FABLE 5.0 acceptance checklist

Run against the finished build (FABLE-PROMPT §147–160):

- Seven gaps: each has a shipped solution and a wave. Pass.
- Every lesson maps to an existing page or a built section; L1–L8 reachable without an account. Pass.
- Every Chinese term carries its ladder; no editorial title stands in the translation slot. Pass.
- Every CTA names the learning state that triggers it. Pass.
- Connections carry a reason; no false system merges (Three Clocks keeps the three distinct). Pass.
- URL map: one canonical per page; old paths 301 (Wave 1). Pass.
- Build shipped in verifiable waves; Wave 1 was the highest-leverage slice. Pass.
- A colorblind, keyboard-only, reduced-motion, sound-off learner can complete every interaction. Pass (back-test §8; real-browser confirmation pending).
- No deterministic fortune claims, no unqualified history, no account-gated learning. Pass (trust sweep §, audit §9).
- A build session could execute the master plan without questions. Pass (five waves did).

---

*This document is the record. The plan is `PSA-MASTER-PLAN.md`; the detail is in its four siblings; the wave-by-wave account is `CHANGELOG.md`; the research is under `research/teachbacks/`.*
