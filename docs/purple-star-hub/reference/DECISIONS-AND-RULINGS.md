# Reference — decisions and rulings registry

Every binding decision in one place, with its rationale and status. When something seems surprising ("why is it done this way?"), the answer is almost always here. The planning decisions (D-series) are ruled in `PSA-MASTER-PLAN.md`; the corpus conflicts (C-series) are ruled in `PSA-TERMINOLOGY.md`; the build-time findings are recorded in `CHANGELOG.md`.

## Planning decisions (D-series)

| # | Decision | Ruling |
|---|---|---|
| D1 | Public name | Purple Star Astrology, subtitle 紫微斗數 · Zǐwēi Dǒushù everywhere; the traditional name is never erased. |
| D2 | Canonical URL | `/elements/purple-star-astrology/`; every `/elements/zi-wei/*` 301s to its twin. Child slugs unchanged (four-forces stays; the copy says Four Transformations). |
| D3 | Court geometry | Focal + two trines (±4) + opposite (+6). Life's court is 命財官遷. Doc 04's court table is corrected. |
| D4 | Network palace | 奴僕宮 Núpú Gōng is canonical; 交友宮 recorded as the modern-school variant. |
| D5 | 福德宮 | id `fortune`; standard "Fortune Palace"; editorial "The Soul Palace" (labeled). Aliases `soul`, `wellbeing`; teaser `life` → `ming-gong`. |
| D6 | Four Forces seasons | Keep-with-relabel: the season cards survive only on the four-forces page as a labeled teaching metaphor, never as structure. |
| D7 | Zi Wei transformations | 紫微 receives Huà Quán (壬) and Huà Kē (乙), never Lù or Jì (doc 04 table wins). |
| D8 | Ranks | Six ranks; the old 10-question exam becomes the Foundation Exam (9+ = Star Keeper); legacy rank holders grandfathered forever. |
| D9 | Storage | `zwdsSchool.v2` imports v1 once and mirrors hall flags back; comprehension events only. |
| D10 | Karma / Waking | No Waking rite; the Karma bridge ships only after `zwds_*` earn kinds exist in the server RPC. Until then, zero Karma copy. |
| D11 | Level homes | L5 lives on the hub (Read the Triangle); L6 gets the new `supporting-stars/` page. |
| D12 | Script | Traditional characters only on all new surfaces; `zh-CN` speech lang. |
| D13 | Doc 00 | A superseded build sketch; docs 01–05 are content truth. No copy from doc 00. |
| D14 | Content truth | Where docs 01–05 are silent, mark "needs source"; never fill from model memory. |

## Corpus conflicts (C-series)

| # | Conflict | Ruling |
|---|---|---|
| C1 | Does Zi Wei transform? | Yes: Power in 壬, Shine in 乙, never Flow or Hook. Tian Fu and Tian Xiang do not transform. The star page was corrected. |
| C2 | Court membership | Geometry wins; doc 04's court table is wrong in three of four lists. Palaces-page COURTS arrays 2/3/4 corrected. |
| C3 | Doc 03 Siblings/Career opposites | The table wins over the two contradicting prose lines. |
| C4 | "Four Forces" vs "Four Transformations" | Standard English = the Four Transformations; editorial = The Four Forces (labeled). |
| C5 | Tai Yang's family | Northern Dipper / Zi Wei group, with a schoolNote that some classifications treat the Sun and Moon as central luminaries. |
| C6 | Servants palace name | 奴僕宮 canonical; 交友宮 the modern-school variant. |
| C7 | Ming Gong editorial title | The Command Palace; the other candidates are retired. |
| C8 | Mirror pairs (found in Wave 1) | Doc 03's Wealth-Health and Fortune-Parents pairs are geometrically impossible; the geometric pairs are Wealth-Fortune (財福線) and Health-Parents (父疾線). |
| C9 | Brightness characters | 廟旺利陷 (traditional). |
| C10 | Season framing | See D6 / §5 ruling: keep-with-relabel. |
| C11 | Teaser "Network" label | Not a contradiction; the deep-link id maps `network` → 奴僕宮 so the hub shows the full ladder. |

## Build-time findings (recorded during the waves)

- **The Mei bureau finding (Wave 4).** The chart page narrates Mei as a Fire Bureau, but a strict cast of her 丙子 year with the Command Palace in 午 derives a Metal Bureau. Her star layout is reproduced exactly; the bureau is a teaching liberty, now flagged with a transparent note. Not silently patched. Full details in [`CASTING-ENGINE.md`](CASTING-ENGINE.md).
- **The Rui deltas (Wave 4).** The spec sketched "Hua Ji on 貪狼 in Spouse" and "an empty Wealth palace" for Rui; neither is possible for a real 戊辰 chart with 天府 in 命宮 (戊's Hua Ji is 天機; Wealth holds 紫微). The engine's true output is used; the steward-not-emperor contrast is preserved. The spec had said it fixes the pedagogical contrasts, not the arithmetic.
- **The Imperial exam deviation (Wave 5).** The curriculum sketched "the original 10 questions plus 10 new." The build authored a fresh, self-contained 20 covering the whole path instead, for higher coverage and to keep the exam in a data file. The chart-page Foundation 10 is unchanged.
- **Baked-nav characters (Wave 5).** The shared mega-nav and footer had their ZWDS terms converted to traditional in the shipped files, but the durable fix belongs in `components/` source so a rebuild does not revert it.
- **Casting from a birthday.** Deferred pending the Gregorian-to-lunar source (Needs-Source S9). The engine casts from lunar inputs today.

Anything not decided here follows the non-goals in `PSA-MASTER-PLAN.md` §6: no new Wu Xing phase pages, no Waking rite, no certification program, no paid locks or streaks or account gates, no global-nav changes, no monthly-cycle (流月) teaching.
