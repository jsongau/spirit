# Session 2026-11-08: SEO recovery waves 0-2b

Plan and agent audits: `../docs/2026-11-08-seo-recovery-audit-and-waves.md` and `../docs/audits/2026-11-08/` (project folder, outside this repo).

## What changed and why
Google's August 2026 spam update (scaled, templated content) cut impressions about 99%. The Aug 31 fix was committed but never pushed, so the September spam update passed with the penalized site still live.

| Commit | Wave | Change |
|---|---|---|
| a8cddd064 | Aug fix | noindex on 1,404 thin /proverbs/say/ pages |
| 21078cc4f | 0 | Hidden `pn-crawl` link nav removed from 2,008 pages (hidden links break spam policy). `.vercelignore` stops serving CLAUDE.md, docs/, *.md, *.bak, .zodi-frag-*, eye-preview. star-nosed-mole redirect bug fixed. Absolute sitemap URL in robots.txt. llms.txt brand. |
| 5a02eaf4a | 1a | 144 /zodiac/{sign}-{animal}/ crossings folded into animal pages (answer block in #crossing) and 301'd. |
| b6560568f | 1b | 215 redirect-shadowed files deleted, 33 redirects, 67 thin pages noindexed (phase leaves, sign pages, app screens), 100 canonicals, 2,379 links pointed at final URLs, sitemap rebuilt: 327 URLs. |
| 4bec91b17 | 2a | Animal first screen: search-echo hero + "Is this you?" from each page's own lines; Share/Save moved below; placeholder art hidden on 65; moon dates roll forward in the browser. |
| bb148f27a | 2b | 13 Psychic Readings restored; accent-colour text contrast fixed (all 144 at least 4.98:1); duplicate Google Fonts request dropped. |

All scripts are in `../tools/` (wave1-fold-crossings.py, wave1b-prune.py, wave2a-first-screen.py, wave2a-moon.py, wave2b-psychic.py). Each is dry-run by default and idempotent.

## Decisions made and rejected
- Element-phase leaves: noindex, NOT redirect. They are thin, not duplicates, and form a 4,170-link learning path.
- Crossing pages: fold and redirect, NOT deepen.
- Rebuilding animal pages from the template: REJECTED. The live pages carry post-build passes (apply-nav, apply-assets) the template does not reproduce. Waves edit live HTML with marked, idempotent scripts AND patch `render-animal.mjs` (v1 and v2) to match; verified by building a page fresh and diffing.
- awakening.css on animal pages: KEPT. It styles the nav progress orb drawn by meter.js for returning visitors; a fresh-visitor pixel diff could not see it.
- No new AI-written copy in any wave. Everything moved or restored was already written.

## Traps discovered
- `build/build-all.mjs` would regenerate the 144 animal pages from the OLD generate-pages.mjs and recreate crossings plus the 249-URL sitemap. Nine generators now exit unless `ZODI_ALLOW_LEGACY_BUILD=1`. build/ is outside this repo, so that guard is unversioned.
- 11 Leo animals have TODO-scaffold JSON in zodi-animal-template-v2/data; their pages cannot be rebuilt from the template.
- Animal data is split across zodi-animal-template-v1/data (23) and v2/data (121).
- Git lock files: this session got delete permission, so git cleans up its own locks; `gc.autoDetach=false` set in this repo.
- "Primal Astrology" is a trademark of primalastrology.com (different animal list). "primal zodiac" demand is largely theirs.

## Next steps
1. PUSH. Nothing above is live until `git push origin main`.
2. After push: verify live (CLAUDE.md 404, say pages noindex, /zodiac/virgo-pig/ redirects, new first screen), then resubmit sitemap.xml in Search Console.
3. Jay checks GSC Manual actions and Security issues.
4. Wave 2c: move repeated method boilerplate (about 1,100 words per page) to one /method/ page; add the Psychic Reading to the chapter rail.
5. Wave 3 (needs Jay): author identity for about page and bylines; brand direction on "primal zodiac"; legal read on the trademark.
6. Wave 4: human-edited rewrites, batches of 12 or fewer, 10+ days apart. 12 Chinese sign pages first, before Chinese New Year (Feb 6, 2027).

## Later the same day: waves 3 and the reading pipeline
| Commit | Change |
|---|---|
| 91181c433 | /about/ and /method/ (byline: the Zodi Animal team), footer links, Article author/dates, 22 head terms rebranded to Zodi Animal |
| c7ca4f81b, 268d92b6e | Research-driven fact passes on 20 animal pages (about 160 corrections: wrong figures, misattributed studies, wrong citations, wrong header hanzi) |
| c7ca4f81b | All 144: hidden FAQPage removed, Primal Zodiac scrubbed from structured data, Purple Star teaser labeled as our own reading, "oldest chart system" fixed, footer eyebrow |
| 8107eed74, 0e7ec83a6 | Lunar boundary note only on Capricorn and Aquarius; Bond Test glyph 豬 |
| ceba2d765 | docs/research: 20 dossiers, brief, Mojo and Igor reviews, fact-fix logs |
| 3f72d6f9a | Batch 1: tabbed readings on 12 animal pages |

### Reading pipeline (how to run the next batch)
1. Research: agents follow data/research/BRIEF.md, one dossier per animal (json + md). Research is never published directly.
2. Fact pass: apply each dossier's fact_audit to the live page and the template JSON, with backups and a BEFORE/AFTER log.
3. Variety ledger + writer brief (data/readings/BATCH1-BRIEF.md): each animal gets its own opening image, rhythm, tabs, story, ending.
4. Writers produce data/readings/<slug>.json. `python3 tools/build-readings.py ROOT <slugs> --check` is the quality gate (banned words, dashes, pinyin, unknown or missing sources, raw brackets, sentences shared across the batch). `--preview` writes tools/_preview/<slug>-reading-v1.html. Owner approves. `--apply` writes the page, the CSS and data/readings/<slug>.section.html.
5. The template renderer (render-animal.mjs v1+v2) reads data/readings, so rebuilds keep the readings.
Batch size 12 or fewer, roughly 10 days apart, owner approves every page.

### Open decisions and next steps
- Push (7 commits as of 3f72d6f9a).
- Kea hero line "never once for hunger" (soften?), pronghorn Purple Star line (cut or keep labeled).
- Template: add a pinyin slot for header/rail hanzi on all 144; renderer Purple Star wording.
- Research and fact-pass the remaining 124 animals; batch 2 readings from the 8 researched animals not yet rewritten.
- Search Console: confirm Manual actions and Security issues are empty; resubmit sitemap after push; GSC API report waiting on googleapis.com allowlist + service account.

## Evening: sharing, referral credit, batches 2 and 3

**Shipped to git (not yet pushed):**
- Reading share hooks on the 12 batch 1 pages (331768028). Each match card has "Ask a friend if they are your X" (hard: "Dare a friend") that opens the share sheet with a challenge link to /vs.html?with=<slug>. The coda has "Share this reading" and "Save as a story image" (1080x1920 canvas, with hero art for the 79 animals that have real art, moon otherwise). Mary and Ross reviewed v2; their fixes are in v3.
- Wave 5a, referral credit (c4f8d7408). zodi-referrals.js caches the signed-in user's real code as zodi:myref with zodi:myref:real=1. Share links only carry a real code. Animal pages and vs.html put an incoming ?ref into zodi_pending_ref, which signup reads.
- Fact pass round 3 on 10 pages, 102 fixes (6176effd3). Logs: docs/research/FACTFIX-R3-A.md and -B.md.
- Wave 5c, Purple Star wording on all 144 pages plus pinyin for 紫微斗数 (3c279cb40). The renderers are patched too.
- Batch 2 (8) and batch 3 (10) reading data saved in docs/readings (36e2c4c26). Not on pages yet.

**Schedule (owner rule: 12 or fewer pages per batch, about 10 days apart):** batch 1 goes live with the push. Batch 2 apply around Nov 18, batch 3 around Nov 28. Apply with: python3 tools/build-readings.py ROOT <slugs> --apply, then commit.

**Traps:**
- Animal pages have no GA4, only vs.html does. Share presses are not counted; landings are, via UTM tags. Adding GA4 is an owner decision because metrics.js promises nothing is sent by default.
- Preview HTML uses <base href> to the live site, so canvas art drawn from a file:// preview taints the canvas. The story card retries without art. On the live site this is same-origin and works.
- --preview overwrites <slug>-reading-v1.html. Rename share previews to -vN.
- The shoebill opener ("abu markub") rests on one blog. Find a better source before batch 3 applies.
- 65 animals have placeholder hero art, so their story cards fall back to the moon.

**Next:**
1. Jay pushes (13 commits). Verify live, test sharing on the real site, resubmit the sitemap.
2. Pair image on vs.html (Ross #2), after plan approval.
3. Template pinyin slot for header and rail hanzi.
4. Research batch 4 (next 10 by inbound match links).

## Late evening: fan-out to batch 8

**Pipeline per batch:** research dossiers (5 agents, 2 animals each), then fact pass (2 agents, 5 pages each, backups in ~/factfix-backup-rN*), then writers (4 agents) from data/readings/BATCHn-BRIEF.md, then one combined check over every reading plus the match-rule check, then previews.

**State (all committed, not pushed; origin still 3e8cd5e23):**
- Readings written and checked: 70 (batches 1 to 7). Batch 1 is applied to pages; batches 2 to 7 are data in data/readings (copies in docs/readings), ready for --apply at the 10-day pace.
- Pages fact-checked: 90 of 144 (rounds 1 to 8). Batch 8 has research and fact fixes but no readings (owner can ask).
- Sitewide fixes: 6c Related Animals cards from GRID (86 labels, 58 misplaced cards; template data too), 6d unescaped "<b>" on 142 pages, 5c Purple Star wording, 6b pinyin and pronounce on every page's own character (tools/han-pinyin.json is the map; keep it in sync when a header changes).
- Checker (tools/build-readings.py): writing rules apply to prose only (not source titles, buttons or the howto line); shared-sentence check now down to 4 words.

**Traps:**
- Parallel writers cannot see each other; always run the combined check after a batch.
- Short stock lines slip past a 6-word check ("The old pairings name three." was in 17 readings).
- When a header changes, update rail__han, serial-han, keepsake-han (.h, .py, data-say), rail__py, the rail button, template animalHan/animalHanPy and tools/han-pinyin.json.
- Mountain pygmy possum still shows 鼠 shǔ; no sourced Chinese name exists.

**Next:**
1. Owner pushes (23+ commits).
2. Fact-pass-only rounds for the remaining 54 pages.
3. Pair image on vs.html is built but uncommitted, waiting on owner approval.
4. Hero art for the 65 animals with placeholder SVGs (share cards fall back to the moon).
