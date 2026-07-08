# Purple Star Astrology hub — documentation index

The front door to everything written about the Purple Star Astrology (Zi Wei Dou Shu, 紫微斗數) hub at `/elements/purple-star-astrology/`. Start here, then jump to the doc that answers your question.

## If you want to know…

| Your question | Read |
|---|---|
| What is the whole thing, end to end? | [`PSA-MASTER-BUILD.md`](PSA-MASTER-BUILD.md) |
| What was the plan, and what are the binding decisions? | [`PSA-MASTER-PLAN.md`](PSA-MASTER-PLAN.md) |
| What shipped in each wave, and what deviated? | [`CHANGELOG.md`](CHANGELOG.md) |
| The lesson curriculum (8 levels, 67 lessons, ranks)? | [`PSA-CURRICULUM.md`](PSA-CURRICULUM.md) |
| The page structure, models, rails, widgets, sound? | [`PSA-HUB-EXPERIENCE.md`](PSA-HUB-EXPERIENCE.md) |
| Cross-site links and why each exists? | [`PSA-CONNECTION-MAP.md`](PSA-CONNECTION-MAP.md) |
| The canonical term ladders and trust corrections? | [`PSA-TERMINOLOGY.md`](PSA-TERMINOLOGY.md) |
| What each `ziwei-*.js` file exports and its API? | [`reference/DATA-FILES.md`](reference/DATA-FILES.md) |
| How the chart-casting engine works? | [`reference/CASTING-ENGINE.md`](reference/CASTING-ENGINE.md) |
| How the models, rails, widgets, sound, and a11y work? | [`reference/INTERACTIVE-LAYER.md`](reference/INTERACTIVE-LAYER.md) |
| The progress store, comprehension events, and ranks? | [`reference/PROGRESS-AND-RANKS.md`](reference/PROGRESS-AND-RANKS.md) |
| Why a given decision was made (D1–D14, C1–C11, wave findings)? | [`reference/DECISIONS-AND-RULINGS.md`](reference/DECISIONS-AND-RULINGS.md) |
| The voice rules, colorblind grammar, known issues, and deferrals? | [`reference/CONTENT-VOICE-AND-KNOWN-ISSUES.md`](reference/CONTENT-VOICE-AND-KNOWN-ISSUES.md) |
| How concepts are taught, with sourced model answers? | [`research/teachbacks/`](research/teachbacks/) (triangle, transformations, brightness, timing, ethics) |
| A quick answer to a common question? | [`FAQ.md`](FAQ.md) |

## The two source layers

- **Content truth** lives in `../zwds/01`–`05` (doc `00` is a superseded build sketch, ruling D13). The `ziwei-*.js` data files are generated from `PSA-TERMINOLOGY.md`, which reconciles the corpus.
- **Build record** lives here in `purple-star-hub/`. The plan is `PSA-MASTER-PLAN.md`; the account of what was built is `PSA-MASTER-BUILD.md` and `CHANGELOG.md`.

## The shape of the build

Five waves, executed 2026-07-07 from `OPUS-BUILD-PROMPT.md`, all on disk and uncommitted:

1. **Foundations and truth fixes** — URL move to `/elements/purple-star-astrology/`, the first six data files, the hub shell with the Twelve Palace Court, teaser deep links, live-error corrections.
2. **The living hub** — Models 2/3/5, both rails, five rolling widgets, the sound system, 14×12 star placements.
3. **The academy** — the `zwdsSchool.v2` store, the 8-level ladder, Model 4, the glossary page, the Foundation Exam rebrand.
4. **Casting and depth** — the casting engine, Rui's chart, Model 6 and the Three Clocks, the supporting-stars page.
5. **The Reader's Path and the sweep** — Level 8 (teach-backs, ethics, the 20-question Imperial exam), the web-research corpus, the full simplified-character and trust sweep, the production audit.

## Ground rules that apply everywhere

Traditional characters with tone-marked pinyin and a pronounce button; the term ladder never merged; plain-English non-deterministic voice with no hype and no em-dash separators; colorblind-safe states (shape plus text, never color alone); no underlined links, no external-link arrows; learning is never account-gated; systems (Zodi Animal, BaZi, Feng Shui, Purple Star) stay distinct. The full statement is in `reference/CONTENT-VOICE-AND-KNOWN-ISSUES.md`.
