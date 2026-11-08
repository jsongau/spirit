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
