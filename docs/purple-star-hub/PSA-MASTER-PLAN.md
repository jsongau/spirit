# PSA-MASTER-PLAN — Purple Star Astrology Hub

Ruled and reconciled 2026-07-07. This is the one document a build session executes. The four sibling docs carry the detail; this plan carries the decisions, the order, and the checks. Read all five before building anything.

- `PSA-CURRICULUM.md` — 8 levels, 67 lessons, ranks, progress data, CTA ladder
- `PSA-HUB-EXPERIENCE.md` — page structure, subnav, rails, widgets, 7 models, sound, visual spec
- `PSA-CONNECTION-MAP.md` — 25 cross-site bridges with anchor copy, 9 rejections, 8 gaps
- `PSA-TERMINOLOGY.md` — canonical term ladders, trust corrections, script audit, pronunciation spec

Conflicts between this plan and a sibling doc: this plan wins. Conflicts between sibling docs: the RECONCILED DECISIONS sections (already patched into each doc) win.

---

## 1. DECISIONS REGISTER (all final)

| # | Decision | Ruling |
|---|---|---|
| D1 | Public name | **Purple Star Astrology**, subtitle `紫微斗數 · Zǐwēi Dǒushù` everywhere. Traditional name never erased. |
| D2 | Canonical URL | `/elements/purple-star-astrology/`; all `/elements/zi-wei/*` URLs 301 to their new twins (map in §3). Child slugs are preserved unchanged (four-forces stays four-forces; the copy says Four Transformations). |
| D3 | Court geometry | Focal + two trines (+4/−4) + opposite. Life's court = 命財官遷. Doc 04's court table is corrected; palaces-page COURTS arrays 2/3/4 fixed (PSA-TERMINOLOGY C2). |
| D4 | Network palace | Canonical 奴僕宮 Núpú Gōng; 交友宮 recorded as modern-school variant in schoolNote (C6). |
| D5 | 福德宮 | id `fortune`; standard "Fortune Palace"; editorial "The Soul Palace" (labeled editorial). Aliases `soul`, teaser `life`→`ming-gong` handled in data. |
| D6 | Four Forces seasons | Keep-with-relabel: season cards survive only on the four-forces child page as a labeled teaching metaphor; never structure, never in hub widgets/models. |
| D7 | Zi Wei transformations | Doc 04's table wins: 紫微 receives Huà Quán (壬) and Huà Kē (乙), never Lù or Jì. Star page corrected (C1). |
| D8 | Ranks | Six: Court Novice 入門 → Palace Scribe 宮書 → Star Keeper 司星 → Warden of the Forces 司化 → Keeper of the Doors 司門 → Imperial Astrologer 欽天監. Old 10-question exam becomes the Foundation Exam (9+ = Star Keeper); legacy rank holders grandfathered forever (`legacyRank: true`). |
| D9 | Storage | New `zwdsSchool.v2` key; imports v1 once; mirrors hall flags back to v1 so the un-rebuilt chart page keeps working. Comprehension events only, never clicks. |
| D10 | Karma / Waking | No Waking rite ever. Karma bridge (`psa:progress` → `ZodiKarma.award()`) ships only after `zwds_*` earn kinds are added to the server `zodi_award` RPC allowlist; until then, zero Karma copy in the hub. |
| D11 | Level homes | L5 lives on the hub (Read the Triangle section). L6 gets NEW child page `supporting-stars/` (doc 05), wave 4; unlinked from subnav until it ships. |
| D12 | Script | Traditional characters only on all new surfaces; `zh-CN` speechSynthesis lang (matches shipped `#say-ziwei`). Simplified-character corrections to old pages ship with the wave that touches each page (PSA-TERMINOLOGY §3). |
| D13 | Doc 00 | Superseded build sketch. Docs 01–05 are content truth. No copy imported from doc 00. |
| D14 | Content truth | Where docs 01–05 are silent, mark "needs source" (14 items listed in PSA-CURRICULUM); never fill from model memory. |

---

## 2. PAGE ARCHITECTURE

New tree (moved from `/elements/zi-wei/`):

```
/elements/purple-star-astrology/                 hub (rebuilt per PSA-HUB-EXPERIENCE)
  chart/            Reader's School (kept, upgraded: casting engine wave 4)
  palaces/          kept + corrections (COURTS fix, script fixes)
  stars/            kept + corrections; index + 14 star pages
  four-forces/      kept + season relabel + script fixes
  history/          kept + trust corrections
  glossary/         NEW (wave 3): full ladders + pronunciation, from data files
  supporting-stars/ NEW (wave 4): doc 05 groups, L6 home
```

Hub metadata: title "Purple Star Astrology", h1 pairs name + 紫微斗數; JSON-LD uses `alternateName: "Zi Wei Dou Shu"`; canonical and og:url MUST use `https://www.zodianimal.com/...` (do not inherit the old vercel-domain canonical bug that exists sitewide). Zodi-redefinition rules apply to meta and the one exact-anchor internal link per page.

## 3. URL / REDIRECT MAP

No `vercel.json` exists. Wave 1 creates one at the repo root (verify the Vercel project's output directory is `site/` first; if the project builds from `site/`, place config accordingly and confirm redirects fire on the deployed domain before deleting nothing).

301s, old → new (`:slug` = chart, palaces, stars, four-forces, history, and the 14 star slugs zi-wei, tian-ji, tai-yang, wu-qu, tian-tong, lian-zhen, tian-fu, tai-yin, tan-lang, ju-men, tian-xiang, tian-liang, qi-sha, po-jun):

```
/elements/zi-wei/                    → /elements/purple-star-astrology/
/elements/zi-wei/:slug/              → /elements/purple-star-astrology/:slug/
/elements/zi-wei/stars/:star/        → /elements/purple-star-astrology/stars/:star/
```

Query strings (`?star=`, `?palace=`) must survive the redirect. Fallback if platform redirects prove impossible: keep files at old paths containing only meta-refresh + `rel=canonical` to the new URL. One canonical per page, no page at two paths. Every internal reference (teaser CTAs, meganav, sitemap, zwx-court footer, all child cross-links) is updated to the new paths in the same wave the redirect ships.

## 4. DATA ARCHITECTURE

`site/js/ziwei/` (new dir), generated from PSA-TERMINOLOGY's canonical tables — the tables are the source, the JS is the artifact:

- `ziwei-palaces.js` (12, full ladder + opposite + trine ids + core question + slugs/aliases per D5)
- `ziwei-principal-stars.js` (14: ladder, element, dipper, series/family for sound, per-palace beginner/intermediate/practitioner readings sourced from star pages + doc 02, brightness behavior, transformation eligibility per D7)
- `ziwei-transformations.js` (4 + stem assignment table from doc 04)
- `ziwei-relationships.js` (court math: +4/−4/opposite; the six mirror pairs)
- `ziwei-auxiliary-stars.js` (doc 05 groups; wave 4)
- `ziwei-lessons.js` (67 lessons: id, level, prereq, source page/section, exercise type, CTA state)
- `ziwei-glossary.js` + `ziwei-pronunciation.js` (~55 speak strings, zh-CN, from PSA-TERMINOLOGY §6)
- `ziwei-practice.js` (drills, mastery checks, model answers)
- `ziwei-sample-charts.js` (Mei 1996; Rui 1988 added wave 4)

Every record carries: id, traditional chars, pinyin, literal, standard, editorial (flagged `editorial: true`), beginner/intermediate/practitioner text, related ids, sourceNote, schoolNote, and overinterpretation warning where PSA-TERMINOLOGY specifies one.

Casting engine (wave 4): implement doc 04's method — hour/day branch → Life Palace, Five Element Bureau 五行局 → Zi Wei position → 14-star placement → four transformations by birth-year stem. Validate against Mei's pre-cast chart (must reproduce it exactly) plus two hand-checked cases documented in the engine file. Cast charts feed the annotated study map (concepts already learned get highlighted; nothing blurred or paid-locked).

Shared runtime: `psa:select` CustomEvent bus keeps models, rails, and Chart Pulse in lockstep; preference keys `zodi_psa_sound`, `zodi_psa_motion`; progress `zwdsSchool.v2` per D9.

## 5. BUILD WAVES

Each wave is one session: build, run its checks, verify live behavior, then stop. Keep a ledger line per wave in `docs/purple-star-hub/CHANGELOG.md`.

**Wave 1 — Foundations and truth fixes (highest leverage)**
1. Data files: palaces, principal stars, transformations, relationships, pronunciation, glossary data.
2. New hub shell at `/elements/purple-star-astrology/`: orientation header, dedicated subnav, Twelve Palace Court (Model 1) consuming `?star=`/`?palace=`, first contextual CTA.
3. Redirect layer + every internal link updated (teaser CTAs point to new path and pass params).
4. Live-error corrections that should not wait: "kept secret for 1,000 years" (hub ×4 + teaser), "Yours is already written" (teaser), qi-sha deterministic marriage lines, Polaris "purple glow" claim, palaces COURTS geometry fix, 化権 → 化權 in docs.
Checks: teaser drag → hub opens in same configuration; all old URLs 301 with params intact; no simplified characters on any new surface; hub keyboard-navigable; zero deterministic claims greppable on touched pages.

**Wave 2 — The living hub**
Models 2, 3, 5 (Move-a-star, Transformations lab, Read the Triangle); both rails + IntersectionObserver; five rolling widgets; sound system (Web Audio, off by default, captions); reinforcement copy set.
Checks: sound-off/reduced-motion/keyboard/colorblind pass on every model; right rail follows scroll context; widgets pausable; 320px clean.

**Wave 3 — The academy**
Curriculum UI for L1–L3 wired to existing pages; `zwdsSchool.v2` migration + rank ladder + Foundation Exam rebrand with grandfathering; full CTA ladder; glossary page + pronounce buttons; Build-a-chart-sentence (Model 4).
Checks: v1 progress imports and mirrors back; legacy ranks honored; every lesson reachable without an account; "Save this path" appears only after first progress.

**Wave 4 — Casting and depth**
Casting engine + annotated study chart; Rui sample chart; Timing wheel (Model 6) + Three Clocks block (B4/F2 bridges); L4–L7 wiring; `supporting-stars/` page (L6 into subnav).
Checks: engine reproduces Mei exactly; timing gated behind foundation progress as guided-not-locked; three clocks never conflated.

**Wave 5 — The Reader's Path and the sweep**
L8 (synthesis, ethics, teach-backs with model answers, consultation structure labeled house method); 20-question Imperial exam; remaining connection-map bridges; Karma bridge IF server kinds exist (else leave dark, log it); full simplified-character and trust sweep of all child pages (PSA-TERMINOLOGY §3 + §5 lists); production audit (links, duplicate IDs, schema, overflow).
Checks: FABLE-PROMPT final checklist, all boxes; a keyboard-only, sound-off, reduced-motion, colorblind learner completes one full lesson loop and one practice drill end to end.

**Server dependency (parallel, not a wave):** add `zwds_lesson`, `zwds_rank` (+ up to 3 more per PSA-CURRICULUM) to the `zodi_award` RPC allowlist with daily caps in the spirit of `proverb_read`. Owner: whoever holds the Supabase project. Blocks only the Karma copy, nothing else.

## 6. NON-GOALS

No rewrite of child-page prose beyond listed corrections. No new Wu Xing phase pages. No Waking rite. No certification program (Reader's Path only). No paid locks, streaks, urgency, or account gates. No global-nav changes. No monthly-cycle (流月) teaching (needs source). No doc 00 copy.

## 7. TEST MATRIX (every wave, on touched surfaces)

Navigation states, subnav sticky + expandables, rail behavior and mobile bottom sheet, URL params + browser back/forward, localStorage migration + preference keys, pronunciation fallback when speechSynthesis is missing, reduced motion, keyboard + focus order + SR announcements, 320px/tablet/desktop/ultrawide, no horizontal overflow, no duplicate IDs, no broken internal links, no lesson prerequisite dead ends, and the trust greps: no "kept secret", no deterministic health/death/wealth/marriage/disaster sentences, no editorial title labeled as literal, no simplified characters on new surfaces, no underlined links, no ↗ icons.
