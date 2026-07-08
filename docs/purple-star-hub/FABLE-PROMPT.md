# FABLE 5.0 PROMPT — PURPLE STAR ASTROLOGY HUB: PLANNING STAGE

Copy everything below this line into a fresh Claude session running inside the Primal Animal repo.

---

# ROLE AND OBJECTIVE

You are the lead architect for Zodi Animal, working inside the local Primal Animal repository. Your single outcome: produce the complete, reconciled planning documentation for reinventing the Zi Wei Dou Shu hub as **Purple Star Astrology**, a learning academy that takes a Western beginner from "what is this" to capable of teaching the system and giving responsible readings as a Purple Star fortune teller.

This session is PLANNING ONLY. You produce `.md` files, not pages. Do not touch any `.html` file. The build happens in a later session against your master plan.

The plan must be executable by a different Claude session with no follow-up questions. Every open decision must be decided in the docs, not deferred.

# GROUND TRUTH — WHAT ALREADY EXISTS (verified 2026-07-07)

Do not re-derive this from scratch. Verify it still holds with quick spot checks, then build on it.

- `site/docs/zwds/` contains the full research corpus: `00-MASTER-BUILD-BLUEPRINT.md` (28K), `01-overview-history-philosophy.md`, `02-fourteen-major-stars.md`, `03-twelve-palaces.md`, `04-si-hua-bureau-chart-construction.md`, `05-auxiliary-stars-patterns-timing.md`. This is the content source of truth. The curriculum, terminology, and historical framing come from here, not from your general knowledge.
- `site/elements/zi-wei/index.html` (2,109 lines) is the current hub: a static editorial article. Hero, pillars, BaZi comparison, hardcoded 12-palace flip cards, 14-star section, Four Forces season cards, link-list "learning path." Only scripts: gtag + `/js/nav.js`. No data arrays, no localStorage, no interactivity beyond hover.
- `site/elements/zi-wei/chart/index.html` (1,185 lines) is the Reader's School and the best asset in the section: interactive palace wheel with Triangle/opposite highlighting, pre-cast worked example (Mei, born 1996), 6 scored practice drills, 10-question Reader's Exam with ranks (Court Novice → Imperial Astrologer), Decade Doors timing, progress persisted in `localStorage["zwdsSchool.v1"]`. No real chart casting — everything is the Mei demo.
- Child pages are deep and good: `palaces/` (2,336 lines), `stars/` index + 14 individual star pages (~2,250 lines each, all 12 palace placements + brightness levels), `four-forces/`, `history/`. All static, all content inlined per page (no shared data files — definitions can drift).
- The homepage teaser lives in `site/indexv6.html` ("Twelve palaces, fourteen stars" section): drag-the-Emperor-into-a-palace mini-game, per-palace reading panel, hidden `#say-ziwei` Mandarin audio button, CTAs "Enter the star court" → `/elements/zi-wei/` and "Cast your own chart" → `/elements/zi-wei/chart/`. No URL params are consumed anywhere (`?star=`, `?palace=` do nothing).
- Site-wide systems exist but zi-wei pages do not load them: `zodi-awaken.js` (Waking), `zodi-karma.js` (Karma board), `nav-progress.js`, `stage-bar.js`.
- `site/data/` holds only `zodi-animals.csv`. No ziwei data files exist.

## The seven real gaps (your plan closes these, nothing more)

1. Real chart casting from birth date/time (the biggest one; blueprint doc 04 covers the construction method).
2. Interactive models on the hub itself: today it is an article that links out.
3. Audio pronunciation on zi-wei pages (teaser has one button; hub pages have none).
4. Shared data files (`ziwei-*.js`) so stars/palaces/transformations are defined once.
5. Teaser → hub deep links (`?star=zi-wei&palace=wealth` carries the visitor's state in).
6. A dedicated subnav + progress system worthy of the system's depth, connected to site-wide Karma/Waking.
7. A glossary/pronunciation reference.

# READ FIRST, IN THIS ORDER

1. All six files in `site/docs/zwds/` — in full, no skimming.
2. `site/elements/zi-wei/index.html` and `chart/index.html` — the current hub and the Reader's School (understand the existing drill/exam/rank/localStorage patterns; you will reuse them).
3. One star page (`site/elements/zi-wei/stars/zi-wei/index.html`) and `palaces/index.html` — to learn the established content structure and voice.
4. The teaser section of `site/indexv6.html` (search "Twelve palaces") including its drag mini-game JS and `#say-ziwei` audio pattern.
5. `site/js/zodi-awaken.js` and `site/js/zodi-karma.js` — the progress systems the hub must plug into.
6. Skim `site/elements/bazi/` (or wherever BaZi lives), Five Elements pages, `site/almanac/`, proverbs pages, bonds/match pages — enough to plan honest connections.

# NON-NEGOTIABLE SITE RULES

These override anything else in this prompt.

- Public page name: **Purple Star Astrology**. Authoritative subtitle everywhere: `紫微斗數 · Zǐwēi Dǒushù`. Never erase or downgrade the traditional name. Never claim "Purple Star Astrology" is the only accepted translation.
- Chinese characters always pair with tone-marked pinyin and a Mandarin pronounce button (reuse the `#say-ziwei` speechSynthesis pattern; no autoplay, preference remembered).
- Term ladder per concept, layers never merged: characters → pinyin → literal translation → standard English term → Zodi Animal editorial title (labeled as editorial, never presented as the literal translation) → plain-English meaning → practitioner meaning.
- Traditional characters are the default for this hub. Do not mix simplified in accidentally.
- Voice: plain English, no hype words, no em-dash separators, anti-AI pass on all copy. No underlined text links (no border-bottom fakes either); links use color + weight. No external-link arrow icons (↗) ever.
- The owner is colorblind: every state must read through shape, text, icon, pattern, or position in addition to color.
- Systems stay distinct. Zodi Animal, BaZi, Feng Shui, and Zi Wei Dou Shu support each other but are never blended into one fake unified ancient system. Never imply the Zodi Animal is calculated by ZWDS.
- Historical claims: "traditionally attributed," "different schools teach," "documentation is limited." No "kept secret for exactly 1,000 years," no deterministic predictions about health, death, wealth, marriage, or disaster.
- Learning is never account-gated. Accounts save progress ("Save this path"), they do not unlock it. No dark patterns, no fake urgency, no streak pressure.
- Follow the zodi-redefinition rules for any page-level naming, meta, and schema decisions (term ladder: primal animal → Primal Zodiac Animal → Zodi Animal; alternateName schema; one exact-anchor internal link per page).

# URL STRATEGY (decide it in the plan, this is the default)

New canonical hub: `/elements/purple-star-astrology/`. Child pages (`palaces/`, `stars/*`, `four-forces/`, `history/`, `chart/`) move under it. `/elements/zi-wei/` and every old child URL 301s (or meta-refresh + canonical, per what the host supports — check `vercel.json` or equivalent) to the new paths. No page may exist at two paths without one canonical. Document the full old → new map in the master plan. If you find a hard technical blocker to redirects, the fallback is: keep `/elements/zi-wei/` as canonical and title it Purple Star Astrology — but document why.

# PHASE 1 — FOUR PARALLEL AGENTS

Launch these four agents concurrently. Each returns findings; you reconcile them. Do not let one agent decide everything.

## Agent A — Curriculum architect
Reads `site/docs/zwds/` in full plus the chart page's existing drills and exam. Produces the beginner → fortune teller curriculum: levels, lesson sequence, prerequisites, what mastery means at each level, and how each lesson maps to EXISTING pages/sections vs. what must be newly written. Must reuse the Reader's School rank ladder (Court Novice → Imperial Astrologer) rather than inventing a competing one, extending it if more levels are needed. Ends with the teach-it-back standard: at the top rank, a learner can explain the system to someone else and perform a structured, responsible reading. Output: full draft of `PSA-CURRICULUM.md`.

## Agent B — Hub experience designer
Reads the teaser, current hub, chart page, and the site's design tokens/CSS. Designs: the teaser → hub handoff, the dedicated subnav, both sticky rails, the rolling widgets, all interactive models, and the sound/reinforcement system (specs in the EXPERIENCE REQUIREMENTS section below). Every animation must teach structure; kill anything ornamental. Output: full draft of `PSA-HUB-EXPERIENCE.md`.

## Agent C — Connections cartographer
Sweeps the whole site: BaZi, Five Elements, Feng Shui almanac, Proverbs Pond, Bonds/match, Moon, animal pages, Menagerie, Karma/Waking/account. For every connection, writes the exact bridge: which lesson or model links where, the one-line reason a learner would care, and the anchor copy. Rejects "related links" without a reason. Flags false merges (e.g., almanac timing is not ZWDS timing — related tools, different calculations; Spouse Palace links to Bonds without reducing compatibility to one palace). Output: full draft of `PSA-CONNECTION-MAP.md`.

## Agent D — Terminology and trust auditor
Audits `docs/zwds/` corpus AND the live zi-wei pages for: conflicting definitions across pages, editorial titles masquerading as literal translations, simplified/traditional mixing, unqualified historical claims, deterministic statements, missing pinyin. Produces the canonical term table (full ladder for all 12 palaces, 14 stars, 4 transformations, and core technical terms like 三方四正, 命宮, 身宮) that the shared data files will be generated from. Output: full draft of `PSA-TERMINOLOGY.md`.

# PHASE 2 — YOU RECONCILE AND WRITE THE DOCS

Write these five files to `docs/purple-star-hub/`. Where agents disagree, you decide and record the decision with one line of reasoning. No "option A or option B" left in final docs.

1. `PSA-CURRICULUM.md` — reconciled curriculum (see standard below).
2. `PSA-HUB-EXPERIENCE.md` — reconciled page/interaction/sound/visual spec.
3. `PSA-CONNECTION-MAP.md` — reconciled cross-site map. For every lesson: prerequisite, next lesson, primary child page, relevant BaZi/element/proverb/almanac/Bonds/animal link with reasons, glossary entries, practice exercise.
4. `PSA-TERMINOLOGY.md` — canonical term table + trust rules + list of every existing-page correction needed.
5. `PSA-MASTER-PLAN.md` — the one doc a build session executes: final page structure, subnav spec, data architecture, URL/redirect map, build order in shippable waves, per-wave acceptance checks, and explicit non-goals.

# CURRICULUM STANDARD (Agent A + final doc must meet this)

Eight levels, each with completion ability, mapped to existing assets first:

1. **Orientation** — what the chart reads, court metaphor, palaces/stars overview, natal vs timing, why one placement is never the reading, cast-your-study-chart. Mostly exists on hub + teaser; needs sequencing, not rewriting.
2. **Twelve Palaces** — one lesson per palace (source: `palaces/` page + doc 03). Each: full term ladder, core question, opposite palace, Triangle, example placement, common mistake, recall exercise, pronunciation.
3. **Fourteen Principal Stars** — one lesson per star (source: the 14 star pages + doc 02). Archetype, strengths, tensions, behavior across palaces, common misreading, chart sentence, recall.
4. **Four Transformations** — 化祿 Huà Lù, 化權 Huà Quán, 化科 Huà Kē, 化忌 Huà Jì (source: `four-forces/` + doc 04). Heavenly Stem assignment, star-specific effects, natal vs timing, interactive lab. Do NOT map transformations to seasons unless the corpus explicitly supports it — the current Four Forces page uses season cards; Agent D rules on whether that framing survives.
5. **Palace Relationships** — 三方四正 taught visually, borrowing/reflecting, synthesis.
6. **Supporting Stars and Structure** — auxiliary stars in meaningful groups (source: doc 05), never a flat list of a hundred symbols.
7. **Timing** — decade cycles, annual cycles, palace activation, natal promise vs temporal trigger, responsible forecasting. Builds on chart page's Decade Doors.
8. **Synthesis and the Reader's Path** — reading order, evidence hierarchy, conflicting signals, uncertainty language, ethics, what not to claim, consultation structure, teach-it-back prompts with model answers, practice charts beyond Mei. Final outcome: can teach foundations and perform structured readings responsibly. Call it the Reader's Path or Practitioner Path; no certification claims.

Every lesson: at least one meaningful action (identify, match, place, compare, rewrite a deterministic claim, assemble a chart sentence, explain in plain English). Mastery checks per level: recall, interpretation, synthesis, teach-it-back vs model answer. Progress tracks comprehension events, never raw clicks. Extend `zwdsSchool.v1` localStorage; define exactly how PSA ranks feed Karma/Waking without merging the two systems.

# EXPERIENCE REQUIREMENTS (Agent B + final doc must meet this)

**Teaser handoff.** The hub opens where the teaser left off: "You moved one star through one room. A real chart asks how the entire court responds." Consume `?star=` and `?palace=` params from the teaser so the hub opens with that exact configuration highlighted in the full court. Compact orientation header (name, 紫微斗數, one-sentence promise, current stage, continue-learning + cast-study-chart actions). No second oversized hero repeating "twelve palaces, fourteen stars."

**Subnav.** Dedicated sticky Purple Star subnav (replaces the generic Systems of the Craft row once inside the hub). Primary visible: Start Here, Chart, Palaces, Stars, Practice. Expandable Study group: Transformations, Relationships, Auxiliary Stars, Timing, Synthesis. Expandable Reference group: Glossary, Pronunciation, History, Schools and Methods, Calculation. Inline progress indicator ("Foundation · 3 of 8" or current lesson). Progressive hierarchy — not ten equally loud items, not a flat icon row.

**Left rail — Your path.** Current stage, current lesson, next lesson, recently learned terms, glossary access, chart status. Collapses to a bottom sheet/progress drawer on mobile.

**Right rail — The living court.** Rotating contextual widgets that respond to the centered section: star of the moment, palace in focus with its opposite + Triangle, pronunciation term, one relationship rule, one common beginner mistake, one practice question. Pausable. Never random generic fortune content.

**Rolling widgets** (restrained, every movement teaches structure): The Court in Motion (slow 14-star rotation; select to pause and open learning card), Palace Orbit (12-palace ring highlighting current/opposite/Triangle), Transformation Thread (how the four Hua change a selected star), Term of the Moment, Chart Pulse (changes only on user input).

**Interactive models**, reusing chart-page code patterns, all keyboard-accessible, 44px targets, reduced-motion safe, screen-reader announced:
1. Twelve Palace Court (full term ladder + core question + Triangle taught visually, not in a paragraph)
2. Move-a-star (any of 14 stars × 12 palaces; layered readings: beginner sentence / intermediate / practitioner note / common misreading; makes clear one placement ≠ a reading)
3. Four Transformations lab
4. Build-a-chart-sentence (star + palace + transformation → learner writes, then sees beginner and practitioner model answers + what evidence was missing)
5. Read the Triangle (toggle connected palaces, watch interpretation shift)
6. Timing wheel (only after foundation lessons)
7. Sample chart walkthrough (Mei stays; plan at least one more fictional chart for practice variety)

**Sound.** Off by default, one clear toggle, preference remembered, captions/text equivalents, respects reduced motion. Events: Mandarin pronunciation on demand; soft single note on correct interaction; two-note resolution on lesson complete; sub-second restrained bell on rank up; per-star-family tonal shift on placement. No casino sounds, no ambience by default. Reinforcement copy in-world and earned, never childish: "The court is becoming legible." "You found the opposing room." "You are reading structure, not guessing." Reward comprehension and synthesis, never clicks.

**CTAs.** No isolated blocks of clickable cards. Every CTA is a contextual transition from what was just learned: after the palace model, "You can now recognize the twelve rooms. Next, meet the figures who occupy them. → Meet the principal stars." After first star lesson, "→ Move the Emperor." After three lessons, "→ Cast my chart" framed as "cast your chart and use it as your study map," never "get your fortune now." Account CTA only after visible progress exists: "Save this path." The cast chart, once cast, becomes the annotated study map — concepts already learned get highlighted; nothing is blurred as a paid lock.

**Visual direction.** Evolve the teaser's language: dark celestial field, gold + restrained cyan, serif editorial headlines, imperial observatory / annotated star atlas / living manuscript, parchment panels, cinnabar seals. Banned: generic course dashboard, SaaS card grid, neon horoscope glow, walls of equal-weight blocks, tiny all-caps everywhere, desktop rails squeezed into mobile columns. Mobile: one clear learning action at a time, sticky continue-lesson bar, swipeable palace model with overview/focus/single-palace modes, bottom-sheet definitions, no horizontal overflow at 320px.

# DATA ARCHITECTURE (master plan must specify)

Shared data files generated from Agent D's canonical table, consumed by hub, models, and eventually child pages: `ziwei-palaces.js`, `ziwei-principal-stars.js`, `ziwei-transformations.js`, `ziwei-relationships.js`, `ziwei-auxiliary-stars.js`, `ziwei-lessons.js`, `ziwei-glossary.js`, `ziwei-practice.js`, `ziwei-sample-charts.js`. Each concept: id, traditional characters, pinyin, literal translation, standard English, editorial title, beginner/intermediate/practitioner explanations, related ids, prerequisites, audio config, source notes, school-variation notes, overinterpretation warnings. Also spec the real chart-casting engine per doc 04 (Five Element Bureaus, star placement from birth date/hour): inputs, algorithm reference, validation cases, and how cast charts feed the annotated study map.

# CONSTRAINTS AND NON-GOALS

- Planning only. No `.html` edits, no new pages, no deletions this session.
- Do not rewrite the child pages' content; map them into the curriculum and list only targeted corrections (from Agent D).
- Do not invent Zi Wei content that contradicts `docs/zwds/`; where the corpus is silent, mark the claim "needs source" rather than filling the gap from memory.
- Do not create a second progress system competing with the Reader's School ranks or with Karma/Waking; extend and connect.
- Do not plan account gates, paid locks, streaks, or urgency mechanics.
- Do not plan a certification program; it is the Reader's/Practitioner Path.
- Keep the global site nav untouched; the new subnav lives inside the hub.

# ACCEPTANCE CHECKLIST — RUN BEFORE RETURNING

Draft all five docs, then audit them against this list, fix the weakest doc, and only then finish:

- [ ] Every one of the seven gaps has a named solution, owner doc, and build wave.
- [ ] Every lesson maps to an existing page/section or is explicitly flagged NEW with its content source in `docs/zwds/`.
- [ ] Every Chinese term in the docs carries the full ladder; no editorial title is labeled as a literal translation.
- [ ] Every CTA in the plan names the learning state that triggers it.
- [ ] Every connection in the map has a reason a learner would care, and no false system merges.
- [ ] The URL/redirect map covers every existing zi-wei URL with exactly one new canonical each.
- [ ] Build order is broken into waves a single session can ship and verify; wave 1 is the highest-leverage slice (shared data files + hub interactive court + teaser deep links is the expected shape — override with reasoning if you find better).
- [ ] A colorblind, keyboard-only, reduced-motion, sound-off learner can complete every planned interaction.
- [ ] No deterministic fortune claims, no unqualified history, no account-gated learning anywhere in the plan.
- [ ] A build session could execute `PSA-MASTER-PLAN.md` without asking a single question.

If any box fails, diagnose which doc caused it, revise that doc, and re-run the list. Do not return with unchecked boxes.

# RETURN FORMAT

Finish with: the five file paths written, a ten-line summary of the master plan, the wave-1 build slice, and the three highest-risk decisions you made with your reasoning.
