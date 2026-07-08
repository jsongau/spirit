# PSA-CURRICULUM.md
## Purple Star Astrology 紫微斗數 · Zǐwēi Dǒushù — The Reader's Path Curriculum

Draft by Agent A (curriculum architect), 2026-07-07. Planning doc only. No HTML is touched by this file.

**Scope.** The complete lesson sequence that takes a Western beginner from "what is this" to a learner who can teach the foundations and perform a structured, responsible reading. Eight levels, 67 lessons, one extended rank ladder built on the existing Reader's School, mastery checks, a progress data spec, and the CTA ladder. Content authority: `site/docs/zwds/00–05`. Where the corpus is silent, the lesson is flagged in the Needs Source list at the end; nothing is filled from general knowledge.

**Paths.** Lessons below cite pages at their current `/elements/zi-wei/...` URLs because that is where the content lives today. The master plan owns the rename to `/elements/purple-star-astrology/` and the redirect map; every citation here survives that move unchanged.

**Term ladder convention.** Every Chinese concept appears at first use with its full ladder: traditional characters → tone-marked pinyin → literal translation → standard English term → Zodi Animal editorial title, always labeled *(editorial)*. Editorial titles are never presented as translations. The canonical term table is Agent D's `PSA-TERMINOLOGY.md`; this doc defers to it wherever the two disagree.

**Two rules that shape everything below.**
1. Learning is never account-gated. Accounts save progress; they never unlock it.
2. No lesson, check, or CTA makes a deterministic claim about health, death, wealth, marriage, or disaster. The system is taught as a structured symbolic map, in the corpus's own words: "not fatalism... a life schedule" (doc 05).

---

# PART 1 — THE EIGHT LEVELS

Format per lesson: **(a)** content source — an exact existing page/section, or NEW plus the `docs/zwds` file that supplies the material; **(b)** prerequisite; **(c)** the one meaningful action; and a **completion ability** per level. Sequential prerequisite is the default (each lesson requires the previous one in its level); only exceptions are called out.

---

## LEVEL 1 — ORIENTATION
*"You can name the machine's four moving parts."*

Mostly exists on the hub and teaser. This level is sequencing, not rewriting.

| # | Lesson | (a) Source | (b) Prereq | (c) Action |
|---|--------|-----------|------------|------------|
| 1.1 | **What a chart reads** — a map of twelve simultaneous life domains, not a prophecy. The stars are calculated symbolic positions, not observed bodies. | `elements/zi-wei/index.html` § "The architecture of a life" (`#zwds-pillars-h`) + doc 01 §2 (Philosophy: spatial/relational logic, symbolic stars) | none (entry point; also the landing lesson for teaser arrivals) | Sort six statements into "this system claims it" vs "this system never claims it" (e.g. "maps where pressure gathers" vs "predicts the year you marry"). |
| 1.2 | **The court metaphor and the name** — 紫微斗數 · Zǐwēi Dǒushù · lit. "purple subtlety dipper calculation" · standard English: Purple Star Astrology · *The Emperor's Astrology (editorial)*. Polaris as emperor, stars as court roles. History with "traditionally attributed" framing (Chen Tuan / Lu Dongbin debate, Song codification, Ming grid, Taiwan transmission). | `elements/zi-wei/history/index.html` + doc 01 §1–2. Note: doc 00's "kept secret for 1,000 years" framing does NOT survive; use doc 01's qualified account ("effectively forbidden outside the imperial court" for the Ming–Qing period, origins "genuinely contested"). | 1.1 | Match the four characters 紫 / 微 / 斗 / 數 to their literal meanings, then pronounce the full name (audio button). |
| 1.3 | **Palaces and stars at a glance** — 12 rooms, 14 principal figures, two star families, four forces. A fly-over, not the lessons themselves. | `elements/zi-wei/index.html` § "The 12 Palaces" (`#zwds-palaces-h`) + § "The 14 Principal Stars" (`#zwds-stars-h`) | 1.2 | In the interactive court (Twelve Palace Court model), find and select three named palaces by their core question alone. |
| 1.4 | **Natal vs timing — the chart is a movie** — the natal chart is permanent terrain; Decade Doors 大限 · Dà Xiàn · lit. "great limit" · standard English: decade cycle / major limit · *The Decade Door (editorial)* and Year Waves 流年 · Liú Nián · lit. "flowing year" · annual cycle · *The Year Wave (editorial)* are the overlay. Overview only; full treatment is Level 7. | `elements/zi-wei/chart/index.html` § "Decade Doors & the Year Wave" intro prose (`#timing-h`) + doc 05 Topic 3 intro ("The Chart Is a Movie, Not a Photograph") | 1.3 | Given four statements about a sample life, mark each as "natal (permanent terrain)" or "timing (this chapter)". |
| 1.5 | **Why one placement is never the reading** — the beginner's one predictable failure; the triangle rule previewed; the corpus's warning that a strong-looking palace can be undermined by its companions. | `elements/zi-wei/chart/index.html` § "The five-step method" prose (`#method-h`) + doc 03 Foundational Context ("no palace is read alone") | 1.4 | Rewrite one deterministic one-liner ("Qi Sha in Spouse means divorce") into a structural sentence, then compare against the model rewrite (drawn from the chart page's existing Qi Sha drill answer). |
| 1.6 | **Cast your study chart** — enter birth date + two-hour period, receive a chart used as a study map for the rest of the path. Framed exactly as: "your study map," never "your fortune." Until the casting engine ships (master plan, data architecture), this lesson runs on Mei's pre-cast chart with the copy "Mei is your loaner chart." | NEW — engine per doc 04 Topic 2–3 (Bureau, Life Palace formula, star placement sequence). Interim: `chart/index.html` Mei worked example. | 1.5 | Cast (or adopt Mei's) chart and locate your Command Palace 命宮 · Mìng Gōng · lit. "life palace" · standard English: Life Palace · *The Command Palace (editorial)* on the wheel. |

**Level 1 completion ability:** can explain in two plain-English sentences what a Purple Star chart is and is not, and name the four moving parts — palaces, stars, forces, timing — without notes.

---

## LEVEL 2 — TWELVE PALACES
*"You can walk every room and say what it asks."*

One lesson per palace plus an opening lesson. Source for all: `elements/zi-wei/palaces/index.html` (sections "How Palaces Work" `#how-h2`, "The 12 Palaces" cards `#cards-h2`) + doc 03 palace entries. No individual palace subpages exist; the palace page's per-palace card/section is the source unit. Editorial palace titles below are the ones live on the chart page's PALACES data array (they are the shipped set; Agent D confirms or corrects in PSA-TERMINOLOGY.md).

| # | Lesson | (a) Source | (b) Prereq | (c) Action |
|---|--------|-----------|------------|------------|
| 2.0 | **How palaces work** — twelve fixed positions on the Earthly Branches 地支 · Dìzhī · lit. "earthly branches" · standard English: Earthly Branches; the wheel layout; every palace has an opposite and two triangle partners (preview, taught fully in Level 5). | `palaces/index.html` § "How Palaces Work" + `chart/index.html` Palace Wheel Explorer (`#wheel`) + doc 03 Foundational Context | Level 1 complete | Select any palace on the wheel and correctly predict which cell is its opposite before the highlight appears. |
| 2.1–2.12 | **One lesson per palace** (order below). Each lesson carries: full term ladder, the core question, the opposite palace, its Triangle preview, one example placement (from Mei's chart or doc 03's "Reading stars here"), one common mistake, a recall exercise, a pronounce button. | Per-palace card/section on `palaces/index.html` + the palace's doc 03 entry + Mei's cast on `chart/index.html` | 2.0; then sequential | See per-palace actions in the table below. |

**The twelve palace lessons** (each row: characters · pinyin · literal · standard English · editorial title · the common mistake taught):

| # | Palace | Ladder | Common mistake (from corpus) | Recall action |
|---|--------|--------|------------------------------|---------------|
| 2.1 | 命宮 | Mìng Gōng · "life palace" · Life Palace · *The Command Palace (ed.)* | Reading it alone; it is judged with Wealth, Career, Travel (doc 03) | Place the "Who am I built to be?" card on the right wheel cell |
| 2.2 | 兄弟宮 | Xiōngdì Gōng · "elder-younger-brother palace" · Siblings Palace · *The Peer Circle (ed.)* | Limiting it to blood siblings; it covers equal-standing partners (doc 03) | Match palace ↔ core question from a shuffled set |
| 2.3 | 夫妻宮 | Fūqī Gōng · "husband-wife palace" · Spouse Palace · *The Mirror of Union (ed.)* | Reading it as a verdict on marriage rather than a mirror of what one seeks/projects (doc 03) | Rewrite "this palace says who you'll marry" responsibly |
| 2.4 | 子女宮 | Zǐnǚ Gōng · "sons-daughters palace" · Children Palace · *The Legacy Garden (ed.)* | Forgetting it covers creative output, students, legacy — not only biological children (doc 03) | Sort six life items into Children vs Career palace |
| 2.5 | 財帛宮 | Cáibó Gōng · "wealth-silk palace" · Wealth Palace · *The Celestial Treasury (ed.)* | Judging wealth from this palace alone; a dim Wealth Palace with strong foundations still feeds a life (doc 03) | Identify which palaces must be assessed first (doc 03 protocol) |
| 2.6 | 疾厄宮 | Jí'è Gōng · "illness-adversity palace" · Health Palace · *The Constitution Map (ed.)* | Deterministic health claims; the palace maps constitution and vulnerability patterns, never diagnoses (site rule + doc 03) | Rewrite a deterministic health claim into pattern language |
| 2.7 | 遷移宮 | Qiānyí Gōng · "migration palace" · Travel/Migration Palace · *The World Stage (ed.)* | Reading it as vacations; it is the outer persona and life away from home territory (doc 03) | Name its opposite (Life) and say why the pair reads together |
| 2.8 | 交友宮 (chart page) / 奴僕宮 (docs) | Jiāoyǒu Gōng "friends palace" / Núpú Gōng "servants palace" · Servants/Friends Palace · *The Alliance Court (ed.)* — **character-set conflict flagged for Agent D** (see Open Conflicts) | Assuming a bright palace here means you can use the help; doc 03 requires checking Life Palace brightness alongside it | Match palace ↔ domain from a shuffled set |
| 2.9 | 官祿宮 | Guānlù Gōng · "official-salary palace" · Career Palace · *The Imperial Hall (ed.)* | Treating it as only "what job"; it is rank, authority, public perception of the work (doc 03) | Predict its opposite (Spouse) and its two triangle partners |
| 2.10 | 田宅宮 | Tiánzhái Gōng · "fields-dwelling palace" · Property Palace · *The Ancestral Foundation (ed.)* | Missing the home-environment reading under the real-estate reading (doc 03) | Match palace ↔ core question |
| 2.11 | 福德宮 | Fúdé Gōng · "fortune-virtue palace" · Fortune/Virtue Palace · *The Soul Palace (ed.)* | Underrating it; classical texts say it colors all 11 others (doc 03) | Answer: which palace must be checked before Siblings and Children? |
| 2.12 | 父母宮 | Fùmǔ Gōng · "father-mother palace" · Parents Palace · *The Origin Gate (ed.)* | Missing its documents-and-contracts domain (doc 03) | Complete the axis: Parents ↔ ? (Fortune/Virtue), and say what the axis carries |

**Level 2 completion ability:** shown any unlabeled palace on the wheel, can give its standard English name, its core question, and its opposite palace; and can state the rule that no palace is read alone.

---

## LEVEL 3 — FOURTEEN PRINCIPAL STARS
*"You can meet any of the fourteen and describe both its gift and its shadow."*

One lesson per star plus two openers. Sources: the 14 star pages under `elements/zi-wei/stars/` (each page's Essence / Command Palace / Across the Palaces / Strength Levels / Key Relationships sections) + doc 02 entries. Each star lesson carries: archetype, strengths, tensions, behavior across palaces (three contrasting placements, not all twelve), the common misreading, one chart sentence, a recall exercise, pronunciation.

| # | Lesson | (a) Source | (b) Prereq | (c) Action |
|---|--------|-----------|------------|------------|
| 3.0 | **The two star families** — 紫微系 Zǐwēi group (Northern Dipper) and 天府系 Tiānfǔ group (Southern Dipper); the great groupings: 殺破狼 · Shā Pò Láng · lit. "kill, break, wolf" · standard English: Qi Sha–Po Jun–Tan Lang triad · *The Vanguard Trio (ed.)*; 機月同梁 · Jī Yuè Tóng Liáng · lit. "mechanism, moon, together, beam" · the Tian Ji–Tai Yin–Tian Tong–Tian Liang grouping · *The Four Pillars of Stability (ed.)*; the Sun–Moon pair. | `stars/index.html` (families + trios sections) + doc 02 System Overview | Level 2 complete | Sort the 14 star cards into their two families; then pull the three Vanguard Trio members out of the deck. |
| 3.1 | **Brightness levels** — 廟旺利陷 · miào wàng lì xiàn · lit. "temple, thriving, favorable, fallen" · standard English: brightness/strength levels. Brightness is volume: the same star at Temple and at Fallen is one character at full authority vs. led by its shadow. | `stars/index.html` brightness section + doc 02 Strength Assessment + chart page exam Q8 | 3.0 | Given two readings of the same star, identify which describes Temple and which Fallen. |
| 3.2–3.15 | **One lesson per star**, in the teaching order below. | Each star's page (e.g. `stars/zi-wei/index.html`) + its doc 02 entry | 3.1; then sequential | Per-star: (i) recall — match star ↔ archetype keyword; (ii) build one chart sentence: "[Star] in [palace] suggests [structural reading], and its shadow there is [tension]" against the layered model answers. |

**Teaching order and the one thing each lesson must land** (ladder: characters · pinyin · literal · standard English name is the pinyin name itself · editorial title):

| # | Star | Ladder | The must-land point (doc 02) |
|---|------|--------|------------------------------|
| 3.2 | 紫微 | Zǐwēi · "purple subtlety" · Zi Wei · *The Emperor Star (ed.)* | 尊而不孤 — needs a court; alone it reads as dignified aloofness. Does not undergo the Four Transformations. |
| 3.3 | 天府 | Tiānfǔ · "heavenly treasury" · Tian Fu · *The Treasury Star (ed.)* | The southern counterpart: tangible resources vs Zi Wei's prestige; always opposite Po Jun. |
| 3.4 | 天機 | Tiānjī · "heavenly mechanism" · Tian Ji · *The Strategist Star (ed.)* | Brilliance and restlessness are the same trait at two volumes. |
| 3.5 | 太陽 | Tàiyáng · "great yang / the sun" · Tai Yang · *The Sun Star (ed.)* | Day-birth brightness quality; influence through visible contribution, not title. |
| 3.6 | 太陰 | Tàiyīn · "great yin / the moon" · Tai Yin · *The Moon Star (ed.)* | Night-birth brightness quality; quiet accumulation; the Sun–Moon public/private axis. |
| 3.7 | 武曲 | Wǔqū · "military melody" · Wu Qu · *The Finance General (ed.)* | The solitary star 孤星: focus that underdevelops the emotional dimension; Wu Qu + Huà Jì is a classic hard configuration. |
| 3.8 | 天同 | Tiāntóng · "heavenly sameness" · Tian Tong · *The Harmony Star (ed.)* | Contentment's shadow is inertia; hardship-dissolving at peak. |
| 3.9 | 廉貞 | Liánzhēn · "chaste purity" · Lian Zhen · *The Diplomat Star (ed.)* | The virtue-vice double nature; second Peach Blossom; Lian Zhen + Huà Jì is the classic entanglement flag. |
| 3.10 | 天相 | Tiānxiàng · "heavenly minister" · Tian Xiang · *The Prime Minister Star (ed.)* | Credibility as currency; opposite Po Jun — order balancing innovation. No direct transformation. |
| 3.11 | 天梁 | Tiānliáng · "heavenly roof beam" · Tian Liang · *The Elder Star (ed.)* | Shelter that can curdle into paternalism. |
| 3.12 | 巨門 | Jùmén · "great gate" · Ju Men · *The Dark Gate (ed.)* | The only non-luminous major star; speech is the gift and the liability; pairs at peak with Tai Yang. |
| 3.13 | 貪狼 | Tānláng · "greedy wolf" · Tan Lang · *The Desire Star (ed.)* | Desire named without moral judgment; lead Peach Blossom AND crisis-resolution star. |
| 3.14 | 七殺 | Qīshā · "seven killings" · Qi Sha · *The Warrior Star (ed.)* | Precision elimination of obstacles, not random violence; always opposite Tian Fu. |
| 3.15 | 破軍 | Pòjūn · "broken army" · Po Jun · *The Vanguard Star (ed.)* | Every breakthrough costs something (化耗); strongest comeback star; opposite Tian Xiang. |

Order rationale: the two anchors first (Zi Wei, Tian Fu — the two family heads, doc 02), then the Zi Wei group, then the Tian Fu group, ending on the Vanguard Trio so the trio lesson content is fresh for Level 5's structural work.

**Level 3 completion ability:** given any star name in any format (characters, pinyin, or editorial title), can state its archetype, one strength, one tension, and one palace where its expression changes meaningfully — and can assemble a chart sentence that includes a shadow clause.

---

## LEVEL 4 — FOUR TRANSFORMATIONS
*"You can find the four marked stars in any chart and say what each mark does."*

Source: `elements/zi-wei/four-forces/index.html` + doc 04 Topic 1. Umbrella term: 四化 · Sì Huà · lit. "four transformations" · standard English: Four Transformations · *The Four Forces (ed.)*.

**On the seasons framing:** doc 04 explicitly teaches the seasonal metaphor ("A star is the tree; its Si Hua is the season imposed on it") and assigns Spring/Summer/Autumn/Winter to Lù/Quán/Kē/Jì. The corpus therefore supports seasons as a labeled metaphor. The current Four Forces page's season cards can survive **if** always labeled "a teaching metaphor," never as the mechanism (the mechanism is the Heavenly Stem table). Final ruling belongs to Agent D; this curriculum assumes the metaphor survives with that label.

| # | Lesson | (a) Source | (b) Prereq | (c) Action |
|---|--------|-----------|------------|------------|
| 4.0 | **What a transformation is** — the birth-year Heavenly Stem 天干 · Tiāngān · lit. "heavenly stems" · standard English: Heavenly Stems marks exactly four stars; the mark changes how the star behaves; same star + same palace + different mark = different reading. Natal marks are permanent; decade/annual marks exist and are taught in Level 7. | `four-forces/index.html` intro + doc 04 Topic 1 origin section | Level 3 complete | In the Transformations lab, apply two different year stems to the same chart and list which stars changed state. |
| 4.1 | **化祿 · Huà Lù** — lit. "transform to prosperity" · standard English: Prosperity/Flow transformation · *The Flow (ed.)*. Resources arrive, channels open; shadow: over-indulgence, outward leak. | `four-forces/index.html` Flow card + doc 04 | 4.0 | Pick the best reading of Huà Lù in the Wealth palace from three options (correct answer includes the shadow clause). |
| 4.2 | **化權 · Huà Quán** — lit. "transform to authority" · Power/Authority transformation · *The Power (ed.)*. Initiative, control, amplification; shadow: authoritarian excess, loneliness at the top. | `four-forces/index.html` Power card + doc 04 | 4.1 | Interpret Huà Quán in Career vs in Life palace — choose which of two readings belongs to which. |
| 4.3 | **化科 · Huà Kē** — lit. "transform to merit/exams" · Fame/Recognition transformation · *The Shine (ed.)*. Mildest of the four: it polishes what is there. | `four-forces/index.html` Shine card + doc 04 | 4.2 | Rank the four forces by raw force (doc 04: Kē is mildest) and justify in one sentence. |
| 4.4 | **化忌 · Huà Jì** — lit. "transform to taboo/avoidance" · Obstruction transformation · *The Hook (ed.)*. The most important of the four: a permanent pressure point, framed by the classics as hunger, not curse — "a void demands filling"; 吃力不討好, hard work with little visible result. Where the deepest conscious work lives. | `four-forces/index.html` Hook section + doc 04 (natal Huà Jì primacy) + doc 03 Huà Jì-by-palace table | 4.3 | Given Mei's chart (Huà Jì on Lian Zhen in Career), write one sentence on what her recurring exam is, then compare to the chart page's model ("The Hook teaches; it doesn't curse"). |
| 4.5 | **The Stem Table lab — find your natal four** — the ten-stem table (Qin Tian orthodox school, per doc 04, including its three commonly confused assignments: Geng→Tai Yang Lù, Wu→You Bi Kē, Ren→Zuo Fu Kē); last-digit stem shortcut with the Lunar New Year caveat; "different schools vary — confirm the lineage" taught as a trust habit. | `four-forces/index.html` Year Stem Calculator + doc 04 complete table | 4.4 | Run your own birth year through the lab; record your four marked stars on your study chart; verify one row against the printed table by hand. |

**Level 4 completion ability:** given any birth-year stem, can look up the four transformed stars, name what each transformation does in plain English, and explain why the natal Huà Jì matters most — without claiming it dooms anything.

---

## LEVEL 5 — PALACE RELATIONSHIPS
*"You see triangles instead of rooms."*

Core term: 三方四正 · Sān Fāng Sì Zhèng · lit. "three directions, four cardinals" · standard English: the three-directions-four-alignments reading frame · *The Palace Triangle (ed.)*. Taught visually with the wheel, never in a paragraph alone.

| # | Lesson | (a) Source | (b) Prereq | (c) Action |
|---|--------|-----------|------------|------------|
| 5.1 | **The mirror** — opposite palace pairs 對宮 · duì gōng · lit. "facing palace" · standard English: opposite palace · *the mirror (ed.)*; the opposite exerts the strongest single influence (doc 04: stronger than the two laterals). All six axes. | `palaces/index.html` § "The Six Mirror Pairs" (`#mirrors-h2`) + doc 03 opposite-pairs table | Level 4 complete | On the wheel, for each of four random palaces, tap its mirror before the highlight shows; streak of 4 required. |
| 5.2 | **The Triangle, visually** — focal palace + two trine partners (four positions away each way) + the mirror; a court of four read together. | `chart/index.html` Palace Wheel Explorer (Triangle/mirror highlighting is already built) + doc 04 Topic 4 | 5.1 | Read the Triangle model: toggle each companion palace of Career on and off and watch the interpretation panel shift; then answer which coalition Career always sits in. |
| 5.3 | **The Primary Court 命財官遷** — Life, Wealth, Career, Travel read as one unit for overall trajectory. **Corpus conflict:** doc 03 defines the primary court as Life–Wealth–Career–Travel (命財官遷); doc 04's court table lists Life–Wealth–Career–Friends. Geometry and the chart page side with doc 03 (Travel is Life's opposite; Wealth and Career are its trines). Curriculum teaches doc 03's version; conflict logged for Agent D. | doc 03 § "The Primary Court" + `chart/index.html` five-step method step 3 | 5.2 | Assemble Mei's Command Triangle from the star deck (紫府武相 coalition) and state the one-line verdict already modeled on the chart page. |
| 5.4 | **Borrowing across the wheel** — 借星 · jiè xīng · lit. "borrow star" · standard English: borrowed stars (empty palace reads its opposite's stars at reduced strength). **Needs corpus source:** the live chart page teaches this rule (drill 4, exam Q10, Mei's Property/Parents palaces) but docs 00–05 never define it. Flagged; the lesson ships only after a source is added to the corpus or Agent D validates the live copy. | `chart/index.html` drill 4 + Mei case step 2 + NEW (needs source) | 5.3 | Mei's Property palace is empty: perform the borrow, name which stars arrive and at what strength. |
| 5.5 | **Read-together protocols and synthesis** — the classical prerequisites: before Wealth read Life/Body/Fortune/Career/Travel; before Spouse read Life/Body/Fortune/Career/Servants; Fortune first for Children and Siblings; Life/Body/Fortune before Health. The Fortune Palace as the palace that colors all others. | doc 03 § "Reading Integration: Key Cross-Palace Dependencies" + `palaces/index.html` § "The Soul Palace Governs All Others" (`#soul-h2`) | 5.4 | Synthesis exercise: given a mock question ("How is her money?"), list in order the palaces you would check before answering, against the doc 03 protocol. |

**Level 5 completion ability:** for any palace, can name its full court of four without the highlight, explain why the mirror outweighs the laterals, and demonstrate the discipline of checking companion palaces before pronouncing on any single one.

---

## LEVEL 6 — SUPPORTING STARS AND STRUCTURE
*"You can read the conditioning layer without drowning in it."*

Source: doc 05 Topics 1–2. All lessons in this level are **NEW pages/sections** (no auxiliary-stars page exists yet); doc 05 supplies every claim. Taught in meaningful groups, never as a flat list. Umbrella terms: 六吉星 · liù jí xīng · lit. "six auspicious stars" and 六煞星 · liù shà xīng · lit. "six malefic stars."

| # | Lesson | (a) Source | (b) Prereq | (c) Action |
|---|--------|-----------|------------|------------|
| 6.0 | **The conditioning layer** — auxiliaries are class monitors to the main stars' head teachers; the five-point rule for never reading one alone; "auspicious ≠ always good, malefic ≠ always bad" (the surgeon's Qing Yang). | NEW — doc 05 Topic 1 intro | Level 5 complete | Judge three scenarios: is this malefic placement productive or corrosive here? (One is the surgeon case from doc 05.) |
| 6.1 | **The Assistants** — 左輔 · Zuǒ Fǔ · lit. "left assistant" and 右弼 · Yòu Bì · lit. "right assistant"; direct vs subtle support; the high-grade pairing with Zi Wei. | NEW — doc 05 | 6.0 | Match each assistant to its help style (visible-from-above vs behind-the-scenes), then to the star family it best steadies. |
| 6.2 | **The Nobles** — 天魁 · Tiān Kuí · lit. "heavenly chief" (day noble) and 天鉞 · Tiān Yuè · lit. "heavenly halberd" (night noble); symptom-help vs root-help (the car-loan illustration from doc 05); day/night chart affinity. | NEW — doc 05 | 6.1 | Given "lends you the cash" vs "negotiates the discount," assign the right noble. |
| 6.3 | **The Scholars** — 文昌 · Wén Chāng · lit. "literary flourishing" (orthodox path) and 文曲 · Wén Qū · lit. "literary melody" (alternative/artistic path); the together-pattern; the Wén Chāng + Huà Jì document-trouble configuration. | NEW — doc 05 | 6.2 | Interpretation check: Wen Chang carries Huà Jì this year — which two practical cautions follow? (documents/contracts, examinations) |
| 6.4 | **The Four Sha** — 四煞 · sì shà · lit. "four malefics": 擎羊 · Qíng Yáng · lit. "raised ram / yang blade", 陀羅 · Tuó Luó · lit. "spinning top", 火星 · Huǒ Xīng · lit. "fire star", 鈴星 · Líng Xīng · lit. "bell star". Too fast / too stuck / burns hot / calculates cold. Where each is productive. The Lù Cún rule: 祿存 · Lù Cún · lit. "salary stored" · standard English: Wealth Retainer star, always flanked by Qing Yang and Tuo Luo — "prosperity flanked by blades." | NEW — doc 05 | 6.3 | Sort eight one-line behaviors under the right Sha star; then explain the flanking rule in one sentence. |
| 6.5 | **The Voids** — 地空 · Dì Kōng · lit. "earth void" (thought-level: interrupted projects, hollow wealth, real philosophical gifts) and 地劫 · Dì Jié · lit. "earth calamity" (material-level: sudden gain-loss cycles); doc 05's practical guidance (short stages, visible checkpoints). | NEW — doc 05 | 6.4 | Given two case blurbs, assign Kong vs Jie and pick the doc 05 coping strategy that fits. |
| 6.6 | **Movement and romance stars** — 天馬 · Tiān Mǎ · lit. "heavenly horse" (movement; 祿馬交馳 wealth-through-movement with Lù Cún; the ungrounded 天馬+地空 combination); 紅鸞 · Hóng Luán · lit. "red phoenix" (committed romantic turning points, 12-year cycle), 天喜 · Tiān Xǐ · lit. "heavenly joy" (celebrations), 天姚 · Tiān Yáo · lit. "heavenly charm" (playful magnetism). Romance stars taught with timing-activation framing, zero destiny claims. | NEW — doc 05 | 6.5 | Distinguish Hong Luan energy from Tian Yao energy in two scenario cards. |
| 6.7 | **Patterns 格局** — gé jú · lit. "structure-frame" · standard English: chart patterns/configurations · *The Pattern (ed.)*. Conditions must be fully met or the pattern loses force. The auspicious set from doc 05 (紫府同宮, 明珠出海, 石中隱玉, 雄宿朝元, 日月同宮/並明) and the challenge set (刑囚夾印 with its modern law/medicine/military reframe). Chart quality tiers taught with doc 05's honest, non-demotivating framing. | NEW — doc 05 Topic 2 | 6.6 | Pattern check: given a chart snippet, verify whether 紫府同宮 conditions are actually met (branch requirement: Yin or Shen), or only partially. |

**Level 6 completion ability:** never reads an auxiliary star in isolation; can place any of the twelve named auxiliaries in its group, state its productive and corrosive faces, and check a pattern's conditions before granting it.

---

## LEVEL 7 — TIMING
*"You can say which chapter a chart is in, and refuse to say more than the method allows."*

Builds directly on the chart page's Decade Doors hall. Source: `chart/index.html` § timing + doc 04 Topic 2 + doc 05 Topic 3.

| # | Lesson | (a) Source | (b) Prereq | (c) Action |
|---|--------|-----------|------------|------------|
| 7.1 | **The Bureau and the decade clock** — 五行局 · Wǔxíng Jú · lit. "five-element bureau" · standard English: Five Element Bureau. Water 2 / Wood 3 / Metal 4 / Earth 5 / Fire 6; the number is the starting age; the Bureau also seats Zi Wei (why two same-day births differ by hour). | doc 04 Topic 2 + `chart/index.html` timing prose | Level 6 complete | Given a Bureau, state the age the first Decade Door opens; given Mei (Fire 6), verify the chart page's "first door at 6." |
| 7.2 | **Decade Doors 大限** — each palace hosts ten years as the temporary Life Palace; natal stars never move, the lens does; door direction depends on year polarity and gender. **Direction rule needs source:** the chart page applies it for Mei ("yang-year woman, counterclockwise") but docs 00–05 never state the rule. Flagged. | `chart/index.html` § "Walk Mei's doors" + doc 05 Topic 3 | 7.1 | Use the door calculator: find which door Mei lives in at three given ages, and name the palace whose stars set each chapter's theme. |
| 7.3 | **The Year Wave 流年** — the year's branch animates one palace of *your* wheel; the decade sets the chapter, the year turns the page. 太歲 · Tài Suì · lit. "great year" · standard English: Year Deity/annual branch marker taught as vocabulary. | `chart/index.html` timing prose + drill 6 + doc 05 | 7.2 | For 2026 (Fire Horse, 午 branch), locate the spotlit palace in Mei's chart and in your study chart. |
| 7.4 | **The twelve lifecycle phases** — 長生 Chángshēng, 沐浴 Mùyù, 冠帶 Guàndài, 臨官 Línguān, 帝旺 Dìwàng, 衰 Shuāi, 病 Bìng, 死 Sǐ, 墓 Mù, 絕 Jué, 胎 Tāi, 養 Yǎng — with doc 05's practical guidance and its five decade types (building, harvest, transition, root, gestation). 死 "death" and 病 "illness" are explicitly taught as cycle-phase names, not predictions. **Assignment method needs source** (doc 05 lists the phases but not how they map to a specific chart's decades). | NEW — doc 05 lifecycle table | 7.3 | Sort the twelve phases into the five decade types; rewrite "a 死 decade means someone dies" into what the corpus actually says ("a role or identity completes"). |
| 7.5 | **Three layers and convergence** — natal / decade / annual Sì Huà stack; annual activates decade, decade activates natal; convergence (triple Huà Jì or triple Huà Lù on one palace) marks maximum intensity — the year's caution zone or opportunity, never a verdict. | NEW lab — doc 04 § Three Layers + doc 05 § Three Layers + Synthesizing method steps 1–5 | 7.4 | In the layered lab, stack three given stems over Mei's chart and find the convergence palace. |
| 7.6 | **Responsible forecasting** — natal promise vs temporal trigger; the corpus's own frame: "not fatalism... a life schedule," push seasons vs consolidate seasons, the farmer metaphor. What a timing reading may say ("this domain is under pressure this year; engage it consciously") and may never say (dates of death, divorce, windfall). | NEW — doc 05 closing principle + site trust rules | 7.5 | Rewrite two deterministic forecasts into schedule language; compare against model answers. |

**Level 7 completion ability:** given a chart, a Bureau, and a current age/year, can name the active Decade Door and Year Wave palace, stack the three transformation layers, identify a convergence, and phrase the finding in schedule language without a single deterministic claim.

---

## LEVEL 8 — SYNTHESIS AND THE READER'S PATH
*"You can teach the foundations and give a structured, responsible reading."*

The capstone. No certification claims anywhere: this is the Reader's Path, and its summit is a rank in the school's own fiction, not a credential.

| # | Lesson | (a) Source | (b) Prereq | (c) Action |
|---|--------|-----------|------------|------------|
| 8.1 | **The full reading order** — the five-step method expanded with everything since: anchor → cast → brightness → triangle/court protocols → auxiliaries as conditioners → patterns → forces → timing layers. One printable/annotatable protocol. | `chart/index.html` § five-step method, expanded with doc 03 protocols + doc 05 synthesis steps | Level 7 complete | Re-read Mei end-to-end using the full protocol and check off each step actually performed. |
| 8.2 | **Evidence hierarchy and conflicting signals** — what outranks what (main star brightness and Life Palace structure before auxiliaries; natal before timing; convergence before single signals); doc 05: reinforcement = clearer manifestation, conflict = confusion or delay — and the honest reading says so. | NEW — doc 05 § "The overall quality of a chart is judged by" + Synthesizing steps | 8.1 | Given two contradicting signals in one mock chart, write the honest sentence ("the signals conflict; here is what each would need to dominate"), vs the model answer. |
| 8.3 | **Uncertainty language and what not to claim** — the reader's phrasebook: "the structure suggests," "this domain carries the recurring lesson," "different schools read this differently," "the chart cannot tell us that." Historical claims stay qualified. No health/death/wealth/marriage/disaster determinism, ever. | NEW — grounded in doc 05's anti-fatalism principle + doc 04's school-variation warnings + site trust rules (partially editorial; flagged as such) | 8.2 | The rewrite gauntlet: five deterministic claims to convert; each has a model conversion. |
| 8.4 | **The consultation structure** — how a responsible reading session runs: set the question, state what the system can and cannot address, read in protocol order, lead with structure not verdicts, end with the sitter's agency ("when to push, when to consolidate"). | NEW — assembled from doc 05's method + site rules (structure is editorial; flagged) | 8.3 | Order the eight consultation steps from a shuffled deck; one wrong order (leading with the Hook as doom) is the trap option. |
| 8.5 | **Practice chart two** — a second pre-cast fictional chart with a deliberately different structure (a Shā Pò Láng chart to contrast Mei's 紫府武相 executive chart, so learners cannot pattern-match Mei's answers). | NEW — must be constructed with the doc 04 method and validated (see Needs Source); star meanings from doc 02, palace meanings doc 03 | 8.4 | Perform the five-step read on the new chart; each step self-checks against a written model verdict. |
| 8.6 | **Teach-it-back** — the top-rank standard: explain the system to someone who knows nothing. Three prompts: (i) explain what a Purple Star chart is in under a minute; (ii) teach the Triangle rule with the wheel; (iii) explain the Hook to someone frightened by the word "obstruction." Free-text answers, then a model answer + a self-scoring rubric (accuracy, no determinism, plain English, full term ladder honored). | NEW — model answers drawn from chart page copy (e.g. "The Hook teaches; it doesn't curse") + docs 01–05 | 8.5 | Submit all three teach-backs and self-score against the rubrics. Honor system by design; the rubric is the teacher. |
| 8.7 | **The Reader's Exam, second sitting** — the existing 10-question exam extended to 20: the original 10 (kept verbatim) + 10 new covering transformations detail, auxiliaries, patterns, timing layers, and responsible phrasing. Rank scroll awarded per the extended ladder (Part 2). Shareable scroll retained. | `chart/index.html` § "The Reader's Exam" (`#exam`) extended; new questions sourced from docs 04–05 | 8.6 | Sit the 20-question exam. 18+ with all teach-backs submitted = Imperial Astrologer. Retakes always open, no cooldown, no pressure copy. |

**Level 8 completion ability (the Path's summit):** can teach the foundations of Purple Star Astrology to a newcomer in plain English with the real vocabulary, and can perform a structured reading of an unfamiliar chart that follows the protocol, ranks its evidence, names its uncertainty, and makes no deterministic claims.

---

# PART 2 — THE EXTENDED RANK LADDER

## What exists (verbatim from `chart/index.html`, the RANKS array)

| Score (of 10) | Rank name in code | Scroll line (verbatim) |
|---|---|---|
| 9–10 | **Imperial Astrologer 欽天監** | "The court would seat you tonight. You read triangles, forces, and doors like a native — go cast for your friends and cite your sources." |
| 7–8 | **Star Keeper 司星** | "You keep the star registry with honor. One more pass through the Four Forces and the throne room is yours." |
| 4–6 | **Palace Scribe 宮書** | "You know the rooms and half the court. Re-walk the worked example — the triangle rule is your next breakthrough." |
| 0–3 | **Court Novice 入門** | "Every astrologer began exactly here. Start with the 12 Palaces, meet three stars, and retake the exam — the doors aren't going anywhere." |

Also existing: the "halls" progress strip (wheel, case, drills, timing, exam — "X of 5 halls entered").

## The extended ladder

Keep all four names verbatim. Add two ranks in the same voice (the 司X "keeper/warden of" pattern the code already uses), because eight levels need more than four rungs but not eight — a rank should feel earned, not dispensed per level. Ranks are now earned by **level mastery** (all lessons + the level's mastery check), not by exam score alone.

| Rank | Earned by | Voice note |
|------|-----------|------------|
| **Court Novice 入門** | Completing Level 1 (Orientation) | Existing name. "You have entered." |
| **Palace Scribe 宮書** | Completing Level 2 (Twelve Palaces) | Existing name. The scribe knows the rooms. |
| **Star Keeper 司星** | Completing Level 3 (Fourteen Stars) | Existing name. The keeper of the star registry. |
| **Warden of the Forces 司化** | Completing Levels 4 AND 5 (Transformations + Relationships) | NEW, same 司 pattern. The dynamic-reading rank: forces plus triangles. |
| **Keeper of the Doors 司門** | Completing Levels 6 AND 7 (Supporting Stars + Timing) | NEW, same 司 pattern. Named for the Decade Doors. |
| **Imperial Astrologer 欽天監** | Completing Level 8: the 20-question exam at 18+ AND all three teach-backs submitted | Existing name, stays the summit. 欽天監 is the historical Imperial Board of Astronomy — the fiction holds. |

**Backward compatibility rule (decision, see Open Conflicts):** anyone whose stored `examScore` already earned a rank under the old 10-question exam keeps that rank permanently — a granted scroll is never revoked. Going forward, the 10-question exam becomes the Level 1–3 checkpoint ("the Foundation Exam"): a 9+ score now confers Star Keeper, and Imperial Astrologer requires the full Level 8 sitting. Migration marks legacy holders `legacyRank: true` so copy can honor them ("of the first graduating class") without gating anything.

Rank-up moments use the restrained bell + in-world line per the experience spec (Agent B). No streaks, no urgency, no decay: ranks never expire.

---

# PART 3 — MASTERY CHECKS PER LEVEL

Every level ends with a four-part mastery check. Passing = level complete = comprehension event (Part 4). All checks retakeable forever, no cooldown, no account required.

| Check type | Form | Pass bar |
|------------|------|----------|
| **Recall** | Term-ladder matching (characters ↔ pinyin ↔ standard English ↔ editorial title) + fact items from the level, 6–10 items | 80% |
| **Interpretation** | Given a placement/configuration, choose the best reading from three options; distractors are always the two classic errors: the deterministic overclaim and the isolated-palace read | 80% |
| **Synthesis** | One multi-part scenario requiring at least two of the level's concepts combined (e.g. Level 5: palace + its court; Level 7: door + wave + convergence) | Full completion, self-verified against a written model walkthrough |
| **Teach-it-back** | One free-text prompt: "explain [level's core idea] to someone who has never heard of this system." Learner writes, then reveals the model answer and self-scores against a fixed rubric: (1) accurate to the corpus, (2) no deterministic claims, (3) plain English, (4) real vocabulary used with its ladder | Self-score all four rubric points; the submission itself is the event — model answers teach, they do not police |

Model-answer approach: every teach-it-back model answer is written from corpus + existing page copy (the chart page's drill "why" texts are the house style: answer first, mechanism second, shadow clause third). Model answers show two registers — a beginner sentence and a practitioner note — mirroring the layered-readings pattern in the experience spec.

Levels 2 and 3 additionally reuse the existing drill engine (`renderQuiz`) for their recall items; the six existing chart-page drills are absorbed unchanged into Level 5 (drills 1, 4) and Level 4/7 (drills 2, 3, 5, 6) as interpretation items.

---

# PART 4 — PROGRESS DATA SPEC

## What counts as a comprehension event (and what never does)

**Tracked (comprehension only):**

| Event | Fired when |
|-------|-----------|
| `lesson_completed` | The lesson's one meaningful action is performed correctly (not on scroll, not on visit) |
| `check_passed` | A mastery-check section (recall / interpretation / synthesis) meets its pass bar |
| `teachback_submitted` | A teach-it-back is written and self-scored (all four rubric points marked) |
| `exam_passed` | Foundation Exam (10q) or Reader's Exam (20q) completed, with score |
| `level_completed` | All lessons + all four check parts of a level done |
| `rank_earned` | A ladder rung is granted |
| `chart_cast` | A study chart is cast from birth data (once per distinct chart) |

**Never tracked as progress:** page views, scroll depth, hover, audio plays, wheel taps without a correct prediction, time on page. Clicks are not comprehension.

## localStorage schema — `zwdsSchool.v2`

The existing key `zwdsSchool.v1` (flat: `{wheel,case,drills,timing,exam: true, examScore: n}`) is **never deleted and never restructured** — the live chart page reads it. V2 is a new key that imports v1 once and mirrors the five legacy hall flags back into v1 on change, so the un-rebuilt chart page keeps painting its progress strip correctly during the transition.

```json
{
  "v": 2,
  "migratedFromV1": true,
  "legacy": { "wheel": true, "case": true, "drills": true, "timing": true, "exam": true, "examScore": 9, "legacyRank": "Imperial Astrologer 欽天監" },
  "lessons": { "L1.1": { "done": true, "ts": 1751900000000 }, "L2.05": { "done": true, "ts": 0 } },
  "checks":  { "L2": { "recall": 0.9, "interpret": 0.8, "synthesis": true, "teachback": true, "ts": 0 } },
  "levels":  { "L1": true, "L2": true },
  "rank":    { "current": "Palace Scribe 宮書", "history": [ { "rank": "Court Novice 入門", "ts": 0 } ] },
  "exams":   { "foundation": { "best": 9, "sittings": 2 }, "readers": { "best": 18, "sittings": 1 } },
  "charts":  { "study": { "cast": true, "isMei": false, "ts": 0 } },
  "prefs":   { "sound": false, "voice": "remembered-voice-id" }
}
```

Rules: version field first; unknown fields are preserved on read-modify-write (forward compatibility); all writes wrapped in try/catch exactly as the chart page does; no PII beyond what the learner enters for casting (birth data lives in the chart object only if the learner casts; casting works without saving).

## Feeding Karma and Waking without merging systems

**Karma (`site/js/zodi-karma.js`).** Public API is `window.ZodiKarma.award(kind, meta) -> Promise<{awarded, balance, streak}>`; logged-out earns accrue to `localStorage("zodi_wandering")` (cap 2000, auto-claimed at first login); every successful earn fires `document` CustomEvent `"zodi:karma"`. PSA calls it through one thin bridge so lesson code never knows Karma exists:

```js
/* psa-progress.js — the only file that touches ZodiKarma */
function psaEmit(type, detail) {
  document.dispatchEvent(new CustomEvent("psa:progress", { detail: Object.assign({ type: type }, detail) }));
}
document.addEventListener("psa:progress", function (e) {
  if (!window.ZodiKarma) return;                      // Karma absent: PSA fully functional without it
  var map = {
    lesson_completed: "zwds_lesson",                  // proposed 60, cap 3/day
    level_completed:  "zwds_level",                   // proposed 250, cap 1/day
    exam_passed:      "zwds_exam",                    // proposed 300, once per exam id
    rank_earned:      "zwds_rank",                    // proposed 400, once per rank
    chart_cast:       "zwds_chart_cast"               // proposed 150, once
  };
  var kind = map[e.detail.type];
  if (kind) window.ZodiKarma.award(kind, { id: e.detail.id }).catch(function () {});
});
```

Required server change (build wave item, not a curriculum item): the five `zwds_*` kinds must be added to the `zodi_award` RPC allowlist with the caps above — caps are server-enforced there, per the header comment in zodi-karma.js. Until the RPC knows the kinds, awards fail silently and learning is unaffected: Karma is a bonus layer, never a dependency.

**Waking (`site/js/zodi-awaken.js`).** Decision: PSA adds **no new rite.** The six rites are the Zodi Animal awakening path (`revealed, read, stones, match, shared, returned`, weights fixed in code), read from `primal_oracle_v1` — a different system's spine. Adding a ZWDS rite would blend the Zodi Animal path with Purple Star study, which the site rules forbid. The correct coupling already exists indirectly: the Waking card renders a karma line via `window.ZodiKarma`, so karma earned from `zwds_*` awards surfaces there without either system knowing about the other. PSA pages simply load the site-wide scripts (closing gap 6) and, where a page needs stillness, may opt out with the existing `data-zodi-no-awaken` attribute.

---

# PART 5 — THE CTA LADDER

Per the experience rules: every CTA is a contextual transition from what was just learned; no isolated card blocks; account CTA only after visible progress; cast-chart CTAs framed as study, never fortune. Each row names its triggering learning state.

| Learning state (trigger) | CTA copy (transition sentence + action) | Destination |
|---|---|---|
| Arrived from teaser with `?star=`/`?palace=` | "You moved one star through one room. A real chart asks how the entire court responds. Begin at the beginning." → **Start the Reader's Path** | Lesson 1.1 |
| Lesson 1.3 done (palace model touched) | "You can now recognize the twelve rooms. Next, meet the figures who occupy them." → **Meet the principal stars** *(preview link; the path itself continues to 1.4)* | Stars hub |
| Any 3 lessons completed | "Your chart can hold what you're learning. Cast it and use it as your study map." → **Cast my study chart** | Lesson 1.6 / casting tool |
| Level 1 complete (first visible progress) | "Your path so far lives only in this browser." → **Save this path** *(account saves progress; it unlocks nothing — say so in the sub-line: "Free. Saving, not unlocking.")* | Account |
| Lesson 3.2 (Zi Wei) done | "You've met the Emperor. Now move him through the rooms and watch the reading change." → **Move the Emperor** | Move-a-star model |
| Level 3 complete (Star Keeper earned) | "You know the rooms and the court. The Four Forces are what set them in motion." → **Enter the Four Forces** | Level 4 |
| Lesson 4.5 done (natal four found) | "You found your four marked stars. The Hook among them is where the deepest work lives — read what that means, without fear." → **Read the Hook in its palace** | Huà Jì-by-palace reference (doc 03 table content) |
| Level 5 complete | "You see triangles instead of rooms. Time to meet the supporting cast." → **The conditioning layer** | Level 6 |
| Level 7 complete (Keeper of the Doors) | "You can tell which chapter a chart is in. One hall remains: reading for another person, responsibly." → **Begin the Reader's Path capstone** | Level 8 |
| Reader's Exam passed at 18+ with teach-backs | "The court would seat you tonight. Pass it on: teach one person the Triangle rule this week." → **Share your scroll** (existing share pattern) + **Teach-it-back prompts** | Share + 8.6 |
| Exam passed below bar | Existing rank-line voice (kept): each rank's scroll line already names the next study target — reuse verbatim | The named level |

Banned on every surface: "get your fortune now," countdowns, "only X left," blurred locked content, streak nags.

---

# PART 6 — NEEDS SOURCE

Lesson content the `docs/zwds` corpus does not cover. Rule applied: nothing below is written from general knowledge; each item either gets a sourced addition to the corpus or the dependent lesson ships in reduced form.

| # | Gap | Blocks | Notes |
|---|-----|--------|-------|
| S1 | **Zi Wei placement table** (bureau number + lunar day → branch) | 1.6 casting engine | Doc 04 describes the formula's existence, not the table. |
| S2 | **Tian Fu placement rule and the 14-star relative sequences** | 1.6 casting engine | Doc 04: "fixed positions relative to Zi Wei and Tian Fu" — sequences not enumerated. |
| S3 | **Body Palace 身宮 formula** | 1.6, 5.5 (Body Palace appears in read-together protocols) | Doc 04 says "a related formula," unstated. |
| S4 | **Mìng Zhǔ / Shēn Zhǔ branch→star tables** | Optional enrichment only (JM context in doc 00 uses them) | Mapping tables absent. |
| S5 | **Brightness (廟旺利陷) per star per branch tables** | 3.1 and every star lesson's brightness row | Live star pages carry per-palace brightness content, but the corpus docs never provide the tables to verify them against. Agent D to validate or source. |
| S6 | **Decade direction rule** (yang/yin year + gender → clockwise/counterclockwise) | 7.2 | Chart page applies it for Mei; corpus silent. |
| S7 | **Borrowing rule 借星** | 5.4 | Taught on the live chart page (drills, exam, Mei's empty palaces); corpus never defines it. |
| S8 | **Lifecycle-phase assignment method** (how the 12 phases attach to a specific chart's decades) | 7.4 (the sort exercise works from doc 05 alone; chart-specific application does not) | Doc 05 lists phases and decade types only. |
| S9 | **Gregorian→lunar conversion** (data or algorithm) | 1.6, 4.5 (the "before Lunar New Year" caveat needs real boundaries per year) | Doc 04 flags the caveat, gives no table. |
| S10 | **Auxiliary star placement formulas** (which birth datum places each of the twelve + Lù Cún, Tiān Mǎ, romance stars) | Casting engine completeness; Level 6 interpretation lessons are unblocked (meanings are fully sourced) | Doc 04: "some from year stem/branch, some from month, some from hour" — no formulas. |
| S11 | **Annual Life Palace / Tài Suì method in working detail** | 7.3 beyond the branch-spotlight basics | Doc 01 glossary gives one line. |
| S12 | **Second practice chart** (8.5) | 8.5 | Must be constructed via the doc 04 method once S1–S3 are sourced, then validated against an external calculator; until then 8.5 substitutes a hand-authored partial chart clearly labeled "constructed for practice." |
| S13 | **Monthly cycles 流月** | Nothing — deliberately excluded from the curriculum (one paragraph in doc 05 is too thin to teach) | Listed so no one re-adds it without a source. |
| S14 | **Consultation-session structure** (8.4) and parts of the ethics phrasebook (8.3) | 8.3, 8.4 ship as clearly editorial content | Grounded in doc 05's anti-fatalism principle and site rules, but the session structure itself is house method, not corpus — it must be labeled house method, and never attributed to classical sources. |

---

# RECONCILED DECISIONS (final, ruled 2026-07-07 by the coordinating session with PSA-TERMINOLOGY.md)

1. **Primary court membership: RESOLVED — geometry wins.** The court is the focal palace, its two trine palaces (four positions away), and its direct opposite. Life's court is 命財官遷 Life–Wealth–Career–Travel, as doc 03 and the chart page implement. Doc 04's court table is wrong in three of four lists (contradicts its own opposite-palace rule); it gets annotated as corrected, and the palaces-page COURTS arrays for courts 2/3/4 get fixed per PSA-TERMINOLOGY.md ruling C2. This curriculum teaches the geometric version everywhere.
2. **Network palace characters: RESOLVED — 奴僕宮 Núpú Gōng is canonical** (matches doc 03 and the live palaces page); 交友宮 Jiāoyǒu Gōng "Friends Palace" is recorded as the modern-school variant in the data file's schoolNote (PSA-TERMINOLOGY.md ruling C6). Lesson 2.8 conforms to this ruling; the chart page's 交友宮 label is on the correction list.
3. **Legacy Imperial Astrologer: APPROVED as recorded.** Legacy exam ranks are grandfathered forever (`legacyRank: true`), the 10-question exam becomes the Foundation Exam (9+ grants Star Keeper), and new Imperial Astrologer requires the Level 8 sitting.
4. **Seasons framing: RESOLVED — keep-with-relabel** (PSA-TERMINOLOGY.md ruling). Doc 04 explicitly supports the metaphor, so the four-forces page keeps its season cards relabeled as a teaching metaphor. It never appears as structure in hub widgets, models, or lesson logic; L4 lessons may reference it only with the metaphor label.
5. **Editorial titles: RESOLVED — live shipped titles win** (Agent D's canonical table). Where doc 00/01 variants differ, the canonical table in PSA-TERMINOLOGY.md §1–2 is the single source; this curriculum conforms and the ziwei-*.js data files are generated from that table.
6. **Doc 00 is a superseded build sketch: CONFIRMED.** Docs 01–05 are content truth. No builder imports copy from doc 00 ("kept secret for 1,000 years," sample chart data, "addictive" framing all fail the trust rules).
