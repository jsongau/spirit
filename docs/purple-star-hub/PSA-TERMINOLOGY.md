# PSA-TERMINOLOGY.md
## Purple Star Astrology hub: canonical term table, script audit, trust audit

Agent D deliverable. Audited 2026-07-07 against:
- `site/docs/zwds/00–05` (content source of truth)
- Live pages: `site/elements/zi-wei/index.html`, `palaces/`, `stars/` (+ star pages `zi-wei/`, `tan-lang/`, `qi-sha/`, spot checks of `tian-liang/`, `tian-tong/`, `tian-fu/`), `four-forces/`, `history/`, `chart/`
- Teaser: `site/indexv6.html` ("Twelve palaces, fourteen stars" section + `#say-ziwei`)

**The ladder, per concept, layers never merged:**
traditional characters → tone-marked pinyin → literal translation → standard English term → Zodi Animal editorial title (always labeled editorial, never presented as the literal translation) → plain-English meaning → practitioner meaning.

Rule enforced throughout: an editorial title may never sit in the slot where a reader expects a translation. Every data file generated from this table keeps the layers in separate fields.

---

## 1. CANONICAL TERM TABLE

### 1.1 The system name

| Layer | Value |
|---|---|
| Traditional | 紫微斗數 |
| Pinyin | Zǐwēi Dǒushù |
| Literal | "Purple Subtlety Dipper Calculation" (紫 purple · 微 subtle · 斗 Dipper · 數 calculation). Note: there is no purple star; 紫微 names the region of the pole star, associated with the emperor (doc 01). |
| Standard English | Zi Wei Dou Shu; commonly rendered Purple Star Astrology |
| Editorial (labeled) | Purple Star Astrology (public page name); "The Emperor's Astrology" is an editorial epithet, never a translation |
| Plain English | A Chinese chart system that maps a life as twelve palaces with symbolic stars placed by birth date and hour |
| Practitioner | A calculated (non-observational) natal system: 12 Earthly Branch palaces, 14 principal stars anchored by Zi Wei's position, 100+ auxiliaries, activated over time by the Four Transformations across natal, decade, and annual layers |

Authoritative subtitle everywhere: `紫微斗數 · Zǐwēi Dǒushù`. The current hub h1 uses untoned "Zi Wei Dou Shu" in the `.zh` span; correct to the tone-marked form.

### 1.2 The 12 palaces

Editorial titles below are verbatim from the live hub and palaces pages (they agree with each other). Where `docs/zwds` offers different candidates, both are recorded and one wins.

| # | Traditional | Pinyin | Literal | Standard English | Editorial title (labeled editorial) | Plain-English meaning | Practitioner meaning |
|---|---|---|---|---|---|---|---|
| 1 | 命宮 | Mìng Gōng | Life/Destiny Palace | Life Palace | The Command Palace | The room of who you are and the overall shape of your life | Anchor palace, located from lunar birth month + birth hour; read first, always with its Triangle (Wealth, Career) and opposite (Travel); main-star brightness here weights the whole chart |
| 2 | 兄弟宮 | Xiōngdì Gōng | Brothers Palace | Siblings Palace | The Peer Circle | Siblings, peers, and equal-standing relationships | Horizontal bonds incl. close collaborators; classical protocol reads the Fortune Palace first for family cohesion; opposite: Servants/Network |
| 3 | 夫妻宮 | Fūqī Gōng | Husband-Wife Palace | Spouse Palace | The Mirror of Union | Marriage and long-term partnership | Describes the partner archetype and the union's dynamic, not a verdict; opposite: Career; classical protocol reads Life, Body, Fortune, Career, Servants first |
| 4 | 子女宮 | Zǐnǚ Gōng | Sons-and-Daughters Palace | Children Palace | The Legacy Garden | Children, and everything you create that outlasts you | Fertility and parent-child bond classically; modern reading extends to creative output, students, legacy; opposite: Property; Fortune Palace checked first |
| 5 | 財帛宮 | Cáibó Gōng | Wealth-and-Silk Palace | Wealth Palace | The Celestial Treasury | Money: how it arrives and how you handle it | Earning mode and resource flow (vs. Career = earning mechanism); opposite: Fortune (財福線); read after Life, Body, Fortune, Career, Travel |
| 6 | 疾厄宮 | Jí'è Gōng | Illness-and-Adversity Palace | Health Palace | The Constitution Map | The body's constitution and where to be vigilant | Constitutional tendencies and recovery pattern, never diagnosis; opposite: Parents (父疾線); amplified/mitigated by Life, Body, Fortune |
| 7 | 遷移宮 | Qiānyí Gōng | Migration Palace | Travel Palace | The World Stage | Life away from home and how the world receives you | Outer persona, relocation, fortune abroad; the direct mirror of the Life Palace; strongest single companion to palace 1 |
| 8 | 奴僕宮 | Núpú Gōng | Servants Palace | Servants Palace (modern schools: Friends Palace, 交友宮 Jiāoyǒu Gōng) | The Alliance Court | Your supporters, staff, and social base | Quality of help attracted, loyalty vs. betrayal risk; opposite: Siblings; read with Life Palace brightness per classical instruction |
| 9 | 官祿宮 | Guānlù Gōng | Official-Salary Palace | Career Palace | The Imperial Hall | Work, vocation, and public standing | Vocation type, authority relations, institutional standing; opposite: Spouse; member of the Life Court (命財官遷) |
| 10 | 田宅宮 | Tiánzhái Gōng | Fields-and-Dwelling Palace | Property Palace | The Ancestral Foundation | Home, real estate, and what the family passes down | Fixed assets, home environment quality, inherited foundation; opposite: Children (子田線) |
| 11 | 福德宮 | Fúdé Gōng | Fortune-and-Virtue Palace | Fortune Palace (also Fortune/Virtue Palace) | The Soul Palace | Inner life and the capacity for real contentment | Classical texts describe it as coloring all 11 other palaces; checked before Siblings and Children readings; opposite: Wealth (財福線) |
| 12 | 父母宮 | Fùmǔ Gōng | Father-and-Mother Palace | Parents Palace | The Origin Gate | Parents, elders, institutions, and your starting conditions | Family of origin, authority figures, documents and contracts; opposite: Health (父疾線); Sun/Moon positions anywhere in the chart also speak to parents |

**Rulings on palace-name disagreements:**
- 命宮 editorial: docs offer "Core Palace / Command Palace / Identity Court / Destiny Seat" (doc 01) and "Identity Court / Command Palace / Destiny Seat" (doc 03). Live pages use **The Command Palace** everywhere. Live wins: it is shipped, consistent, and keeps the court metaphor. "Destiny Seat" and "Identity Court" are retired aliases.
- 夫妻宮 editorial: doc 03 has "The Mirror of Intimate Union / The Karmic Partnership Chamber"; live uses **The Mirror of Union**. Live wins: shorter and avoids "karmic" hype.
- 奴僕宮 editorial: docs offer "Alliance Palace / Network Palace / The Social Ecosystem / The Network of Trust"; live uses **The Alliance Court**. Live wins. The character name stays 奴僕宮 (matches doc 03 and live); record 交友宮 "Friends Palace" as the modern-school variant in the data file's schoolNote, because doc 04 uses it.
- 福德宮 editorial: doc 01 offers "Soul Palace or Inner Life Palace"; live uses **The Soul Palace**. Live wins.
- 遷移宮 editorial: doc 01 offers "World Palace / Outer Stage"; live uses **The World Stage**. Live wins.
- The teaser (`indexv6.html`) uses the standard-English layer as its palace labels (Life, Siblings, Spouse, Children, Wealth, Health, Travel, Network, Career, Property, Fortune, Parents). That is correct for a compact teaser, with one mismatch: it says "Network" where the canonical standard term is Servants Palace and the editorial is Alliance Court. Keep "Network" in the teaser (friendlier at that size) but the `?palace=` deep-link ids must use the canonical slugs so the hub can translate the layer up.

### 1.3 The 14 principal stars

Editorial titles verbatim from the live hub star grid, stars index, and star pages (all three agree). "Standard English" is the common handle in English-language ZWDS literature per doc 01/02; the literal is from doc 02.

| # | Traditional | Pinyin | Literal | Standard English | Editorial title (labeled editorial) | Plain-English meaning | Practitioner meaning |
|---|---|---|---|---|---|---|---|
| 1 | 紫微 | Zǐwēi | Purple Subtlety / Purple Pole | Zi Wei; Purple Star (Polaris); classical title 帝星 Dìxīng "Emperor Star" | The Emperor Star | The organizer everyone ends up orbiting | Yin Earth, Northern Dipper anchor; needs supporting stars (尊而不孤); receives Huà Quán in 壬 years and Huà Kē in 乙 years, never Lù or Jì (see conflict C1) |
| 2 | 天機 | Tiānjī | Heavenly Mechanism | Tian Ji | The Strategist | The quick planner who rarely sits still | Yin Wood, Northern Dipper; Ji-Yue-Tong-Liang group; fallen: overthinking, chronic restlessness |
| 3 | 太陽 | Tàiyáng | The Great Yang / The Sun | Tai Yang; Sun Star | The Sun Star | Shines for others; public by nature | Yang Fire; brighter in day births; Career Lord (官祿主); listed in the Zi Wei group, with a school note that doc 02 also calls it "central, bridging both Dippers" (see C5) |
| 4 | 武曲 | Wǔqū | Military Song | Wu Qu | The Finance General | Earns through discipline and decisiveness | Yin Metal, Northern Dipper; 孤星 solitary tendency; Wu Qu + Huà Jì is a classically discussed hard configuration (money lessons, not doom) |
| 5 | 天同 | Tiāntóng | Heavenly Sameness | Tian Tong | The Harmony Star | Content, gentle, allergic to conflict | Yang Water, Northern Dipper; fortune star; risk is inertia; pairs well with Ju Men |
| 6 | 廉貞 | Liánzhēn | Chaste Purity / Upright Virtue | Lian Zhen | The Diplomat | Charming navigator of politics and gray zones | Yin Fire, Northern Dipper; second Peach Blossom; Lian Zhen + Huà Jì classically flagged for legal/ethical entanglement, phrase with care |
| 7 | 天府 | Tiānfǔ | Heavenly Treasury / Storehouse | Tian Fu | The Treasury Star | The steward who keeps and grows what exists | Yang Earth, head of Southern Dipper; always opposite Po Jun; does not undergo the Four Transformations |
| 8 | 太陰 | Tàiyīn | The Great Yin / The Moon | Tai Yin; Moon Star | The Moon Star | Quiet accumulator, deep feeler | Yin Water, Southern Dipper; brighter in night births; Estate Lord (田宅主); Ji-Yue-Tong-Liang group |
| 9 | 貪狼 | Tānláng | Greedy Wolf | Tan Lang | The Desire Star | Wants much, charms easily, does many things | Yang Wood, Southern Dipper; lead Peach Blossom and, paradoxically, a longevity star; Sha-Po-Lang trio |
| 10 | 巨門 | Jùmén | Great Gate / Giant Door | Ju Men | The Dark Gate | Sees what is hidden; lives by words | Yin Water, Southern Dipper; only non-luminous major star; 口舌 speech-dispute double edge; strongest paired with Tai Yang |
| 11 | 天相 | Tiānxiàng | Heavenly Minister / Seal | Tian Xiang | The Prime Minister | The trusted executor and mediator | Yang Water, Southern Dipper; 衣食之星 comfortable-livelihood star; the "Seal" in 刑囚夾印; always opposite Po Jun's counterpart logic (structural opposite of Po Jun); does not transform |
| 12 | 天梁 | Tiānliáng | Heavenly Roof Beam | Tian Liang | The Elder Star | The protector who has seen it all | Yang Earth, Southern Dipper; Parental/Medical star; shelter quality (化蔭), phrase as tendency, never guaranteed rescue |
| 13 | 七殺 | Qīshā | Seven Killings | Qi Sha | The Warrior | Confronts directly; thrives on pressure | Yang Metal, Southern Dipper; 雙重性格 double-character star; structural opposite always Tian Fu; Sha-Po-Lang trio |
| 14 | 破軍 | Pòjūn | Army Breaker | Po Jun | The Vanguard | Breaks the old formation so the new can exist | Yin Water, Southern Dipper; expenditure quality (化耗): every breakthrough costs something; structural opposite always Tian Xiang; Sha-Po-Lang trio |

**Star groupings (same ladder discipline):**

| Traditional | Pinyin | Literal | Standard English | Editorial | Notes |
|---|---|---|---|---|---|
| 紫微星系 | Zǐwēi xīngxì | Zi Wei star system | Zi Wei group / Northern Dipper group | The Emperor's Court | 6 stars per doc 02 |
| 天府星系 | Tiānfǔ xīngxì | Tian Fu star system | Tian Fu group / Southern Dipper group | The Treasury's Court | 8 stars per doc 02 |
| 殺破狼 | Shā Pò Láng | Kill-Break-Wolf | Sha-Po-Lang configuration | The Vanguard Trio | Qi Sha + Po Jun + Tan Lang |
| 機月同梁 | Jī Yuè Tóng Liáng | Mechanism-Moon-Sameness-Beam | Ji-Yue-Tong-Liang configuration | The Four of Stability | Tian Ji + Tai Yin + Tian Tong + Tian Liang |

### 1.4 The Four Transformations

Standard English term for the mechanism: **the Four Transformations** (四化 Sì Huà). "The Four Forces" is the Zodi editorial title for the set and must be labeled editorial wherever it appears alone.

| Traditional | Pinyin | Literal | Standard English | Editorial title (labeled) | Plain-English meaning | Practitioner meaning |
|---|---|---|---|---|---|---|
| 化祿 | Huà Lù | "transforms to salary/prosperity" | Prosperity Transformation (Hua Lu) | The Flow | The channel opens; things get easier in that room | Resource arrival and smooth circulation; also over-indulgence risk; He Tu element Metal (doc 04); seasonal teaching metaphor: spring |
| 化權 | Huà Quán | "transforms to power/authority" | Power Transformation (Hua Quan) | The Power | You get the lever, and the responsibility | Initiative, control, amplification; authoritarian tip-over when unsupported; He Tu Fire; metaphor: summer |
| 化科 | Huà Kē | "transforms to merit/examination rank" | Merit Transformation (Hua Ke) | The Shine | You get seen for what is already there | Recognition, reputation, documents; mildest force, polishes rather than creates; He Tu Wood; metaphor: autumn |
| 化忌 | Huà Jì | "transforms to taboo/obstruction" | Obstruction Transformation (Hua Ji) | The Hook | The room that never feels finished; where the work is | A void/deficiency that creates drive (吃力不討好 risk); the natal Jì is the chart's fixed pressure point and the most weighted of the four; He Tu Water; metaphor: winter |

Retired editorial aliases from the blueprint (do not reuse as titles): The Gift, The Opening, The Grip, The Command, The Recognition, The Signal, The Lesson, The Knot. They may appear once each in body copy as glosses, never as the label.

### 1.5 Core technical terms

| Traditional | Pinyin | Literal | Standard English | Editorial (labeled) | Plain-English meaning | Practitioner meaning |
|---|---|---|---|---|---|---|
| 三方四正 | Sān Fāng Sì Zhèng | Three Directions, Four Cardinals | the San Fang Si Zheng court | The Palace Triangle | No room is read alone: every palace is judged with three companions | Focal palace + two palaces four positions away (trine) + the opposite palace (對宮), which is the strongest single influence; applies at natal, decade, and annual layers |
| 對宮 | Duìgōng | facing palace | opposite palace | the mirror palace | The room directly across the chart | Exerts the strongest companion influence; the six fixed pairs (geometric, ruling C8): Life-Travel, Siblings-Servants, Spouse-Career, Children-Property, Wealth-Fortune (財福線), Health-Parents (父疾線) |
| 命宮 | Mìng Gōng | Life/Destiny Palace | Life Palace | The Command Palace | (see palace 1) | (see palace 1) |
| 身宮 | Shēn Gōng | Body Palace | Body Palace | The Action Seat (editorial, from blueprint; currently unused on any live page) | A second marker showing where life gets most hands-on | Not a 13th palace: it co-locates within one of the 12, calculated from birth month + hour; where destiny is enacted rather than latent. Currently absent from every live page; must enter the glossary and the Life-Palace lesson |
| 廟 | miào | temple | Temple (brightness) | none needed | The star at full strength | Peak expression, qualities reliably present (doc 02) |
| 旺 | wàng | flourishing | Thriving (brightness) | none | Strong, slightly off peak | Well supported, highly functional |
| 利 | lì | advantageous | Favorable (brightness) | none | Serviceable middle strength | Neither greatly helping nor hindering |
| 陷 | xiàn | sunken/trapped | Fallen (brightness) | none | The star's shadow side leads | Weakened or inverted expression; never phrase as doom, phrase as which traits lead |
| 廟旺利陷 | miào wàng lì xiàn | temple-flourishing-advantageous-sunken | the four brightness levels | Star brightness | How loudly a star speaks in a given palace | The brightness scale; per-star-per-branch tables exist on star pages but are NOT in the docs corpus: mark needs-source (see §7) |
| 五行局 | Wǔxíng Jú | Five-Phases Bureau | Five Element Bureau | The Bureau | Your chart's element class, which sets when your first decade starts | Water 2 / Wood 3 / Metal 4 / Earth 5 / Fire 6 (水二局 木三局 金四局 土五局 火六局); sets first 大限 starting age and anchors Zi Wei's placement (doc 04) |
| 大限 | Dà Xiàn | great limit | Decade Cycle (Da Xian) | The Decade Door | The ten-year chapter each palace hosts in turn | Each decade palace becomes the temporary Life Palace and its stem generates a decade set of Four Transformations |
| 流年 | Liú Nián | flowing year | Annual Cycle (Liu Nian) | The Year Wave | The palace under this year's spotlight | The year branch sets the annual Life Palace; the year stem generates the annual Four Transformations; convergence with natal/decade layers is where events concentrate |
| 天干 | Tiāngān | heavenly stems | Heavenly Stems | none | The ten-part cycle that drives the transformations | 甲乙丙丁戊己庚辛壬癸; each stem assigns Lù/Quán/Kē/Jì to four specific stars (doc 04 table); used at natal (birth year), decade (decade-palace stem), and annual layers, plus per-palace stems in Flying Star work |
| 地支 | Dìzhī | earthly branches | Earthly Branches | none | The twelve fixed positions of the chart | 子丑寅卯辰巳午未申酉戌亥; immovable palace skeleton, arranged counterclockwise; also the birth-hour system (時辰 shíchen, 12 two-hour periods) |
| 四化 | Sì Huà | four transformations | the Four Transformations | The Four Forces | (see §1.4) | (see §1.4) |
| 飛化 | Fēi Huà | flying transformations | Flying Stars technique (Fei Hua) | Flying Stars | Palaces sending transformation energy to each other | Each palace's own stem transforms stars elsewhere, linking sender and receiver palaces; signature of the northern Si Hua school (doc 04) |
| 格局 | Géjú | frame-arrangement | pattern / configuration | The Pattern | A special star combination that changes the whole reading | Valid only when its full conditions are met (doc 05) |
| 命主 / 身主 | Mìngzhǔ / Shēnzhǔ | Life Master / Body Master | Life Master Star / Body Master Star | none | Two secondary indicator stars | Ming Zhu from the Life Palace branch; Shen Zhu from the birth-year branch (doc 04) |

---

## 2. SCRIPT AUDIT (traditional vs. simplified)

**Verdict: the hub does NOT use traditional characters consistently.** Traditional is solid on the chart page, the zi-wei star page, the history page body, and the hub's palace grid. Simplified forms leak in through two shared components and through several whole page sections. Counts below are from a character-level sweep on 2026-07-07.

### 2.1 Shared components (fix once, propagates everywhere)

1. **Mega-nav "Sage Wisdom" panel** (every page incl. `indexv6.html`, hub line ~1238): `紫微斗数 Zǐwēi Dǒushù`, `十二宫 shí'èr gōng`, `命盘 mìngpán`. Should be 紫微斗數, 十二宮, 命盤.
2. **Zi-wei section subnav (`pn-sub`)** (every zi-wei page, e.g. four-forces line 1156): star dropdown uses simplified `天机, 太阳, 廉贞, 太阴, 贪狼, 巨门, 七杀, 破军` plus `十二宫`, `命盘`. Pinyin here is correctly tone-marked; only the script is wrong.
3. **`zwx-court` footer block** (every zi-wei page, hub lines 2026-2041): Northern/Southern court link lists use simplified star names (`天机, 太阳, 廉贞, 太阴, 巨门, 七杀, 破军, 贪狼`).

### 2.2 Page-content instances

| File | Location | Simplified found | Should be |
|---|---|---|---|
| `elements/zi-wei/index.html` | JSON-LD DefinedTermSet (lines 47-48) | 化禄, 化权 | 化祿, 化權 |
| same | 14-star grid (lines 1677-1857) | 天机, 太阳, 廉贞, 太阴, 贪狼, 巨门, 七杀, 破军 | 天機, 太陽, 廉貞, 太陰, 貪狼, 巨門, 七殺, 破軍 |
| same | Four Forces cards (lines 1887-1914) | 化禄, 化权 | 化祿, 化權 |
| same | Palace grid + palace back tips (1525, 1589) | 化禄, 化权 inside reading tips | 化祿, 化權 |
| `palaces/index.html` | Four Forces ladder (lines ~1865-1893) | 化禄, 化权 | 化祿, 化權 |
| `stars/index.html` | Brightness section header (line 976) | 庙旺利陷 and per-level 庙 | 廟旺利陷 / 廟 (旺, 利, 陷 are identical in both scripts) |
| same | Trio headers (925, 939) | 杀破狼, 机月同梁 | 殺破狼, 機月同梁 |
| same | All 14 star-card hanzi (1095-1503) | 天机, 太阳, 廉贞, 太阴, 贪狼, 巨门, 七杀, 破军 | traditional forms |
| `four-forces/index.html` | Hero glyphs + force cards (1183-1266) | 化禄, 化权 | 化祿, 化權 (note: this page's Hook table, lines 1477-1591, is correctly traditional: 太陽 太陰 廉貞 巨門 天機 文曲 天同 文昌 武曲 貪狼) |
| same | Bridge card glyph (line 1616) | 读 | 讀 |
| `stars/tan-lang/index.html` | Hero + throughout (13 occurrences of 贪) | 贪狼 | 貪狼 |
| `stars/qi-sha/index.html` | Hero + throughout (19 occurrences of 杀) | 七杀, 杀破狼 | 七殺, 殺破狼 |
| `indexv6.html` | Teaser itself is clean traditional (紫微斗數, 紫微); only the shared mega-nav leaks simplified | — | — |

### 2.3 Docs corpus (matters because data files are generated from it)

- `00-MASTER-BUILD-BLUEPRINT.md`: coined-vocabulary table and star color table are simplified throughout (命宫, 身宫, 化禄, 化权, 天机, 太阳, 廉贞, 太阴, 贪狼, 巨门, 七杀, 破军, 庙旺利陷).
- `01-overview-history-philosophy.md`: mixed. Simplified: 吕洞宾, 罗盘, 紫微斗数 (in table), 数, 杀破狼, 机月同梁, 飞化, 太岁. **Plus a real error: 化権 appears twice (glossary "Hua Quan (化権)"): 権 is the Japanese shinjitai form, wrong in both Chinese scripts. Doc 03 repeats it once (line 49 "化権 Hua Quan").** Must be 化權.
- `04-si-hua-bureau-chart-construction.md`: the entire Si Hua table and construction chapter are simplified (化禄/化权, all star names, 命宫, 身宫, palace names 财帛宫 etc.).
- `05-auxiliary-stars-patterns-timing.md`: simplified throughout (辅星, 左辅, 右弼, 天钺, 铃星, 红鸾, 天马, 禄马交驰, lifecycle phases 长生…养, 刑囚夹印格 uses 廉贞/擎羊).
- `02` and `03` are mostly traditional and are the script reference for the corpus.

**Rule for data files:** traditional is the storage form for every Chinese string. Simplified variants may be stored in a `simplified` field for search/SEO only, never rendered as the primary glyph.

---

## 3. TRUST AUDIT

Format: file → offending line (quoted) → replacement in "traditionally attributed / different schools teach / documentation is limited" style. Replacements follow site voice rules: plain English, no em-dash separators, no hype.

### 3.1 Unqualified historical claims (secrecy, "1,000 years", precise ages)

1. **`elements/zi-wei/index.html` line 17 (meta description), repeated at lines 21 (og), 38 (JSON-LD), 1302 (hero sub):**
   > "the celestial system Chinese imperial courts kept secret for 1,000 years"
   Replace: "the chart system of the Chinese imperial courts, traditionally said to have been guarded inside them for centuries." The precise "1,000 years" figure has no source in docs/zwds; doc 01 supports only "effectively forbidden outside the imperial court" for the Ming-Qing period.

2. **`elements/zi-wei/index.html` line 21 (og description):**
   > "The celestial system Chinese imperial courts kept secret for a millennium."
   Replace: "A chart of twelve palaces and a hundred stars, practiced in Chinese imperial courts and taught openly only in the modern era."

3. **`elements/zi-wei/index.html` line 1423 (History bridge card):**
   > "1,000 years of imperial astrology. How Zi Wei Dou Shu was born in the Song dynasty, refined by scholars, and kept within palace walls for centuries before reaching the world."
   Replace: "A thousand-year story. The system is traditionally attributed to the Song dynasty sage Chen Tuan, was refined by later scholars, and by most accounts stayed close to the imperial court before spreading in the twentieth century."

4. **`indexv6.html` line 857 (teaser body copy):**
   > "a chart imperial courts kept to themselves for a thousand years"
   Replace: "a chart the imperial courts once kept close." (Short, still evocative, no invented number.)

5. **`elements/zi-wei/history/index.html` lines 17, 19, 843, 958:**
   > "a millennium of refinement inside China's most guarded astronomical chambers"
   Replace: "a thousand years of refinement, much of it inside the imperial astronomy bureaus. Documentation from those centuries is limited, which is why the system's early history is told partly through tradition."

6. **`elements/zi-wei/history/index.html` line 19 (og description):**
   > "How a celestial art became the most sophisticated destiny system in East Asian history."
   Replace: "How a celestial art grew into one of the most detailed destiny systems in East Asia." (Superlative "the most sophisticated ... in history" is unsourced.)

7. **`elements/zi-wei/history/index.html` line 1046 (Song timeline entry):**
   > "Chen Tuan (陳摶), a Taoist hermit living in seclusion on Huashan Mountain, synthesized generations of existing knowledge into the structured system of ZWDS as we recognize it today."
   Replace: "Chen Tuan (陳摶), a Taoist hermit associated with Huashan Mountain, is traditionally credited with structuring ZWDS as we recognize it today. Scholars agree no single person completed the system; passages in Tang-era Taoist texts also credit Lu Dongbin with its seed." (Doc 01 explicitly calls the origin "genuinely contested.")

8. **`elements/zi-wei/history/index.html` Qing timeline entry:**
   > "ZWDS became closely guarded by the imperial court and its official astrologers. Texts were restricted; transmission was controlled through approved lineages."
   Keep the substance, add the qualifier: "By most accounts ZWDS was closely guarded by the imperial court... Documentation from this period is limited, and different lineages tell the secrecy story differently."

9. **`elements/zi-wei/history/index.html` etymology card for 紫:**
   > "the North Star — Polaris — emits a faint purple-violet glow that marks the axis of heaven"
   This is presented as an astronomical fact and is false (Polaris is a yellow-white supergiant). Replace: "In Chinese cosmology the pole star region was described as purple, the color reserved for the emperor." Doc 01: the name comes from imperial symbolism, "there is no purple star."

10. **`site/docs/zwds/00-MASTER-BUILD-BLUEPRINT.md` (source doc, "Core premise"):**
    > "the system that Chinese imperial courts used for 1,000 years, kept secret from ordinary people"
    Mark this paragraph superseded by this document. Any page generated from the blueprint must not inherit this sentence.

### 3.2 Deterministic statements (guaranteed outcomes)

1. **`elements/zi-wei/stars/qi-sha/index.html` line 1036 (Spouse Palace placement):**
   > "Late marriage strongly indicated. The partner must be independent and strong enough to match the warrior's intensity — a weak or dependent partner will be unconsciously [dominated...]"
   Replace: "Classical readings associate this placement with later marriage. Different schools teach that the partnership works best with an independent partner; a reading here describes a dynamic to manage, not a verdict on the marriage."

2. **`elements/zi-wei/stars/tian-liang/index.html` line 893:**
   > "the star that mitigates disaster, that ensures the native survives what would destroy others"
   Replace: "classically described as a sheltering star. The traditional teaching is that hardship tends to pass over or turn into opportunity; treat this as a described tendency, never a promise of protection."

3. **`elements/zi-wei/four-forces/index.html` line 1578 (Ren-stem Hook detail):**
   > "This is not a guarantee of poverty — it is a guarantee that financial matters require more careful engagement than for most people."
   Replace: "This is not a poverty sentence. Traditional readings treat it as a lifelong prompt to handle money decisions with extra care." (Never use "guarantee," even in the softened direction.)

4. **`elements/zi-wei/four-forces/index.html` line 1518 (Ding-stem Hook detail):**
   > "This person will experience an unusual number of situations where what they said — or didn't say — becomes the center of conflict."
   Replace: "Readings with this Hook tend to circle back to speech: what was said, or left unsaid, keeps turning up at the center of conflicts."

5. **`elements/zi-wei/four-forces/index.html` line 1503 (Bing-stem Hook row):**
   > "legal and hidden affairs require persistent caution throughout life."
   Replace: "traditional readings advise lasting care around legal matters and hidden dealings."

6. **`indexv6.html` line 1609 (teaser escalation line):**
   > "A real chart holds all fourteen stars at once, each fixed the hour you were born. Yours is already written."
   Replace: "A real chart holds all fourteen stars at once, each seated the hour you were born. Yours is already cast. What it means is the part you learn to read." ("Already written" claims a finished fate; doc 05 closes with "ZWDS is not fatalism.")

7. **`indexv6.html` teaser READ table, Parents entry:**
   > "You are born to people of standing, or you become the authority in the family line."
   Replace: "Classically read as standing in the family line: either elders of rank, or you growing into that role."

8. **`elements/zi-wei/index.html` line 1936 (reading CTA):**
   > "Your 12 palaces were furnished at the moment of your birth — every star already in position, every force already assigned. A full Zi Wei Dou Shu reading names what sits in each room and when it comes alive across your decades."
   Acceptable structurally (it describes the chart, not outcomes) but add the reflection framing used by the BaZi teaser: append "Read it as a map for reflection, not a script."

9. **Corpus guard (feeds data files): `docs/zwds/03-twelve-palaces.md` Hua Ji effects list** ("Spouse: Relationship karma; late marriage, difficult partnerships, multiple unions"; "Children: Fertility challenges"; "Network: Betrayal from friends or employees"). Every one of these strings must be rewritten with "classical readings associate..." framing plus an overinterpretation warning before entering `ziwei-transformations.js`. Same for doc 03's Life Palace claim that classical texts "determine longevity range": keep only with the attribution and a modern-use note, never as a site promise.

### 3.3 Editorial titles presented as if literal translations

1. **`elements/zi-wei/index.html` JSON-LD (lines 45-51):** DefinedTerms define 命宮 as "The Command Palace — core identity..." and 化祿 as "The Flow — ..." with no standard translation present. Fix each description to lead with the standard term: e.g. `"命宮 Ming Gong": "Life Palace (Zodi editorial title: the Command Palace). Core identity..."`.
2. **`elements/zi-wei/index.html` palace grid:** each card shows only editorial title + untoned pinyin (e.g. "財帛宮 / The Celestial Treasury / Cai Bo Gong"). The editorial title occupies the translation slot. Fix: add the standard English line ("Wealth Palace") and tone marks; the editorial title keeps its own visual slot.
3. **`elements/zi-wei/index.html` star grid:** cards show characters + editorial title only, no pinyin and no literal anywhere on the card ("紫微 / The Emperor Star"). Fix: add pinyin, and the tooltip should carry the literal.
4. **`elements/zi-wei/history/index.html` etymology card for 微:** `char-name` reads "Subtle Governing." The literal of 微 is "subtle / faint"; "governing" is interpretation. Fix: name "Subtle," meaning text may keep the quiet-governing reading as commentary.
5. **`elements/zi-wei/history/index.html` combined etymology:** "Combined: 'The Purple Star's Dipper Calculation'". Rendering 紫微 as "Purple Star" inside a combined literal contradicts doc 01 ("The system is not named after a purple star... there is no purple star"). Fix: "Combined, roughly: 'calculation by the Purple Subtlety and the Dipper'. Purple Star is the conventional English rendering, not the literal."
6. **`elements/zi-wei/stars/zi-wei/index.html` hero:** subtitle gives pinyin, folk phonetic, classical title 帝星, element, but no literal translation layer ("Purple Subtlety / Purple Pole" per doc 02), while qi-sha ("Literal: Seven Killings · Seven Kills") and tan-lang ("贪狼 · Tān Láng · Greedy Wolf") do include literals. Fix zi-wei (and audit the other 11 star pages) so every hero carries the literal explicitly labeled "Literal:". 帝星 "Emperor Star" is genuinely classical and may stay labeled "Classical title," which is the correct precedent.
7. **`elements/zi-wei/four-forces/index.html` JS `starCoined` map:** 'Wen Chang': 'Literary Talent', 'Wen Qu': 'Artistic Gift' read like translations inside result cards. Literal 文昌 is "Literary Flourishing," 文曲 "Literary Song." Fix the result-card template to label these as working names.
8. **`indexv6.html` teaser token:** "紫微 Emperor". Acceptable at teaser scale because 帝星 is classical, but the hub handoff must immediately show the full ladder so "Emperor" is not mistaken for the translation of 紫微.

---

## 4. CROSS-PAGE CONFLICT LIST

**C1. Does Zi Wei transform? (docs conflict, live pages conflict)**
- `stars/zi-wei/index.html` (info callout + quick ref): "Zi Wei does not undergo the transformations of Hua Lu, Hua Quan, Hua Ke, or Hua Ji." / "Four Forces: Does not transform."
- `four-forces/index.html` JS: `quanMeaning['Zi Wei'] = 'The Emperor activates — sovereign authority...'` and `keMeaning['Zi Wei'] = 'The Emperor's shine — imperial recognition...'`.
- `docs/zwds/02` line 386: "Zi Wei and Tian Xiang do not undergo transformations in the standard Northern school."
- `docs/zwds/04` stem table: 乙 Yi year Huà Kē = Zi Wei (紫微); 壬 Ren year Huà Quán = Zi Wei.
**Ruling: the doc 04 table wins.** Zi Wei receives Quán (壬) and Kē (乙) in the standard Qin Tian Pai table and never receives Lù or Jì; the doc 02 sentence and the zi-wei star page are wrong and must be corrected to "Zi Wei never receives the Flow or the Hook; it takes the Power in Ren years and the Shine in Yi years. Tian Fu and Tian Xiang undergo no transformation." One line of reasoning: the table is the operational source the calculator already ships on the four-forces page, and it matches the orthodox Northern school doc 04 names.

**C2. Court (三方四正) membership (doc 04 vs doc 03 vs palaces page vs chart page)**
- `docs/zwds/03`: "the Life-Career-Wealth-Travel quadrant (命財官遷) ... must always be assessed together"; opposite-pair table Life-Travel, Siblings-Servants, Spouse-Career, Children-Property, Wealth-Health, Fortune-Parents.
- `docs/zwds/04`: "Life Court: Life — Wealth — Career — Friends"; "Siblings Court: Siblings — Health — Property — Parents"; "Spouse Court: Spouse — Travel — Mental/Karma — Siblings"; "Children Court: Children — Friends — Parents — Wealth."
- `palaces/index.html` JS COURTS: Life Court `[1,5,9,7]` (correct: Life, Wealth, Career, Travel) but Siblings `[2,6,10,12]`, Spouse `[3,7,11,2]`, Children `[4,8,12,5]` (each replaces the true opposite with a wrong fourth member, matching doc 04's bad lists).
- `chart/index.html`: "For the Command Palace that always means Wealth, Career, and Travel" and the wheel computes triangle+opposite geometrically (correct).
**Ruling: geometry wins.** A court is the focal palace + the two palaces four positions away + the direct opposite. Correct sets: Life {Life, Wealth, Career, Travel}; Siblings {Siblings, Health, Property, Servants}; Spouse {Spouse, Travel, Fortune, Career}; Children {Children, Servants, Parents, Property}. Reasoning: doc 04 contradicts its own rule ("the 'opposite' palace directly across the chart, six positions away") in three of its four lists, and doc 03's pair table plus the chart-page wheel both implement the geometry. Fix the palaces-page COURTS arrays (courts 2, 3, 4 and their `desc` strings) and annotate doc 04 as corrected.

**C3. Doc 03 internal: Siblings/Career opposites**
- Doc 03 opposite-pair table: "Siblings (兄弟宮) | Servants/Network (奴僕宮)" and "Spouse (夫妻宮) | Career (官祿宮)".
- Doc 03 per-palace prose, Siblings: "Opposite palace: Career Palace (官祿宮)"; Career: "Opposite palace: Siblings Palace (兄弟宮)."
**Ruling: the table wins** (it matches the branch geometry and the live Six Mirror Pairs section). The two prose lines in doc 03 are errors; data files take opposites from the table only.

**C4. "Four Forces" vs "Four Transformations" naming**
- Live pages: "The Four Forces" everywhere; docs: "Four Transformations" as the translation, "Four Forces" listed as branded term (doc 00).
**Ruling: standard English = the Four Transformations; editorial = The Four Forces**, labeled editorial on first use per page. Reasoning: 四化 literally means four transformations; "forces" is interpretation.

**C5. Tai Yang's family**
- `docs/zwds/02` line 12 lists Tai Yang in the "Zi Wei Group (紫微系 / Northern Dipper)"; line 86 of the same doc says "Central (bridging Northern and Southern Dippers)."
- Live `stars/index.html` badges Tai Yang "Northern Dipper."
**Ruling: keep Northern Dipper / Zi Wei group** (matches the group listing and every live page), with a schoolNote in `ziwei-principal-stars.js`: "Some classifications treat the Sun and Moon as central luminaries rather than Dipper members."

**C6. Servants palace naming across docs**
- Doc 03: 奴僕宮 Servants Palace. Doc 04 court lists: 交友宫 "Friends Palace."
**Ruling: canonical characters 奴僕宮**, matching doc 03 and the live palaces page; 交友宮 (Jiāoyǒu Gōng, Friends Palace) recorded as the modern-school variant in schoolNote. Reasoning: the live hub already teaches 奴僕宮 and renaming now would orphan shipped content; the variant note preserves accuracy.

**C7. Ming Gong editorial title**
- Doc 01: "Core Palace / Command Palace / Identity Court / Destiny Seat." Doc 00 blueprint: "The Command Palace / Destiny Seat." Live: The Command Palace only.
**Ruling: The Command Palace.** One shipped title beats four candidates; aliases retired.

**C8. Pinyin quality varies by page (same terms, different fidelity)**
- Hub palace grid: untoned ("Ming Gong", "Xiong Di Gong"). Palaces page cards: tones on the name but not on 宮 ("Xiōng Dì Gong"). Chart page: fully toned ("Mìng Gōng"). Four-forces Hook table: fully toned but with two errors: "Wǔ Qǔ" and "Wén Qǔ" for 武曲/文曲, where 曲 in these names is qū (doc 02: Wǔ Qū).
**Ruling: chart-page standard wins: full tone marks on every syllable, 曲 = qū.** All pages converge on the §6 pronunciation column.

**C9. Brightness-level characters**
- Doc 02 and `stars/index.html` write 庙旺利陷 (simplified 庙); `chart/index.html` writes 廟/陷 and 入廟 (traditional).
**Ruling: 廟旺利陷** (traditional), per the hub-wide traditional default.

**C10. Season framing of the transformations: see §5 ruling.**

**C11. Teaser palace label "Network" vs hub "The Alliance Court" / standard "Servants Palace"**
Not a contradiction (different ladder layers) but the handoff must map `?palace=network` → 奴僕宮 canonical id so the hub can show the full ladder. Data files use one id per palace (slug list in §6).

---

## 5. RULING: THE SEASON FRAMING ON FOUR-FORCES

**Question.** The four-forces page frames the transformations as seasons (Spring/The Flow, Summer/The Power, Autumn/The Shine, Winter/The Hook: "Four Forces, Four Seasons", "The Cosmic Seasons", per-card season tags). Does docs/zwds/04 support this?

**Evidence.** Yes, explicitly. Doc 04: "The underlying metaphor is seasonal change: the same tree buds in spring, flourishes in summer, wilts in autumn, sheds in winter. A star is the tree; its Si Hua is the season imposed on it," and per-force: "The seasonal metaphor is Spring [Lu] / Summer [Quan] / Autumn [Ke] / Winter [Ji]." Doc 01 glossary repeats it ("Spring quality... Winter quality"). But doc 04 also gives the He Tu elemental assignments: Lu = Metal, Quan = Fire, Ke = Wood, Ji = Water. Those do NOT match the classical season-element correspondences (spring = Wood, autumn = Metal), so the seasons cannot be presented as an elemental doctrine without contradicting the corpus itself.

**Ruling: KEEP-WITH-RELABEL.**
- Keep the four season cards and the visual language; the corpus supports the metaphor directly.
- Relabel the framing from fact to teaching metaphor. Current lead "Each force maps to a season, a quality, a direction of energy" becomes "Classical teachers explain the four transformations through the seasons: the same tree, four times of year." Season tags get a one-line caption: "A teaching metaphor, not a correspondence table."
- Never derive elements from the seasons. If the page ever teaches the He Tu elements (Lu Metal, Quan Fire, Ke Wood, Ji Water), it must say plainly that the element table and the season metaphor are two separate teachings that do not line up, and that is fine.
- The editorial names (The Flow, The Power, The Shine, The Hook) stay, labeled editorial per §1.4.

---

## 6. PRONUNCIATION SPEC

**Lang tag.** The existing `#say-ziwei` pattern in `indexv6.html` (line ~1295) creates `SpeechSynthesisUtterance` with `u.lang="zh-CN"`, `rate 0.78`, voice-picked from available `zh` voices, and speaks the traditional string 紫微斗數 without issue. **Standardize on `zh-CN`** for every pronounce button (widest voice coverage on user devices; zh-TW voices still match the `zh` prefix in the existing voice-picker and remain an acceptable fallback). Speak strings are the traditional characters below; display strings are the tone-marked pinyin. No autoplay; preference remembered; captions always present.

### 6.1 Palaces (slug → speak string → pinyin display)

| slug | speak (zh) | pinyin |
|---|---|---|
| ming-gong | 命宮 | Mìng Gōng |
| xiong-di-gong | 兄弟宮 | Xiōngdì Gōng |
| fu-qi-gong | 夫妻宮 | Fūqī Gōng |
| zi-nu-gong | 子女宮 | Zǐnǚ Gōng |
| cai-bo-gong | 財帛宮 | Cáibó Gōng |
| ji-e-gong | 疾厄宮 | Jí'è Gōng |
| qian-yi-gong | 遷移宮 | Qiānyí Gōng |
| nu-pu-gong | 奴僕宮 | Núpú Gōng |
| guan-lu-gong | 官祿宮 | Guānlù Gōng |
| tian-zhai-gong | 田宅宮 | Tiánzhái Gōng |
| fu-de-gong | 福德宮 | Fúdé Gōng |
| fu-mu-gong | 父母宮 | Fùmǔ Gōng |

### 6.2 Principal stars

| slug | speak | pinyin |
|---|---|---|
| zi-wei | 紫微 | Zǐwēi |
| tian-ji | 天機 | Tiānjī |
| tai-yang | 太陽 | Tàiyáng |
| wu-qu | 武曲 | Wǔqū |
| tian-tong | 天同 | Tiāntóng |
| lian-zhen | 廉貞 | Liánzhēn |
| tian-fu | 天府 | Tiānfǔ |
| tai-yin | 太陰 | Tàiyīn |
| tan-lang | 貪狼 | Tānláng |
| ju-men | 巨門 | Jùmén |
| tian-xiang | 天相 | Tiānxiàng |
| tian-liang | 天梁 | Tiānliáng |
| qi-sha | 七殺 | Qīshā |
| po-jun | 破軍 | Pòjūn |

### 6.3 Transformations and technical terms

| slug | speak | pinyin |
|---|---|---|
| si-hua | 四化 | Sì Huà |
| hua-lu | 化祿 | Huà Lù |
| hua-quan | 化權 | Huà Quán |
| hua-ke | 化科 | Huà Kē |
| hua-ji | 化忌 | Huà Jì |
| san-fang-si-zheng | 三方四正 | Sān Fāng Sì Zhèng |
| dui-gong | 對宮 | Duìgōng |
| shen-gong | 身宮 | Shēn Gōng |
| miao | 廟 | miào |
| wang | 旺 | wàng |
| li | 利 | lì |
| xian | 陷 | xiàn |
| wu-xing-ju | 五行局 | Wǔxíng Jú |
| da-xian | 大限 | Dà Xiàn |
| liu-nian | 流年 | Liú Nián |
| liu-yue | 流月 | Liú Yuè |
| tian-gan | 天干 | Tiāngān |
| di-zhi | 地支 | Dìzhī |
| fei-hua | 飛化 | Fēi Huà |
| ge-ju | 格局 | Géjú |
| ming-zhu | 命主 | Mìngzhǔ |
| shen-zhu | 身主 | Shēnzhǔ |
| zi-wei-dou-shu | 紫微斗數 | Zǐwēi Dǒushù |

### 6.4 Heavenly Stems and Earthly Branches (for the calculator and chart engine)

Stems 天干: 甲 jiǎ · 乙 yǐ · 丙 bǐng · 丁 dīng · 戊 wù · 己 jǐ · 庚 gēng · 辛 xīn · 壬 rén · 癸 guǐ
Branches 地支: 子 zǐ · 丑 chǒu · 寅 yín · 卯 mǎo · 辰 chén · 巳 sì · 午 wǔ · 未 wèi · 申 shēn · 酉 yǒu · 戌 xū · 亥 hài
Bureaus: 水二局 Shuǐ Èr Jú · 木三局 Mù Sān Jú · 金四局 Jīn Sì Jú · 土五局 Tǔ Wǔ Jú · 火六局 Huǒ Liù Jú
Lifecycle phases (traditional forms for the timing page; doc 05 has them simplified): 長生 chángshēng · 沐浴 mùyù · 冠帶 guāndài · 臨官 línguān · 帝旺 dìwàng · 衰 shuāi · 病 bìng · 死 sǐ · 墓 mù · 絕 jué · 胎 tāi · 養 yǎng

**Folk phonetics** (like the zi-wei page's "dzuh-way"): allowed as a third, clearly separate hint line, never replacing pinyin. Generate them once in the glossary data so pages stop improvising.

---

## 7. SOURCE-NOTES RULES FOR THE SHARED `ziwei-*.js` DATA FILES

Every concept record carries these annotation fields. The build session generates data files from THIS document's tables; these rules are binding.

1. **Field separation is structural.** `hanzi` (traditional only), `pinyin` (tone-marked), `literal`, `standardEnglish`, `editorialTitle` (+ `editorialLabel: true` rendered wherever the title appears without its ladder), `plainMeaning`, `practitionerMeaning`. A renderer may never print `editorialTitle` in a slot named or styled as a translation.
2. **`schoolNote` (string, optional) is required on:**
   - The full Si Hua stem table: rows 戊 (Kē = 右弼 You Bi, an auxiliary), 壬 (Kē = 左輔 Zuo Fu, an auxiliary), 庚 (Lù = 太陽 Tai Yang; some schools assign 武曲 Wu Qu). Doc 04 flags all three as commonly confused; the note text is "Different schools vary here; this site follows the orthodox Northern (Qin Tian Pai) table."
   - Zi Wei / Tian Fu / Tian Xiang transformation participation (per ruling C1).
   - Tai Yang and Tai Yin family classification (per ruling C5).
   - 奴僕宮 vs 交友宮 naming (per ruling C6).
   - Any 格局 pattern whose qualifying conditions differ across schools.
3. **`needsSource` (boolean) marks every claim the corpus does not contain.** Known gaps as of this audit: per-star brightness-by-branch tables (star pages have them; docs 01-05 do not); the Life Palace location formula's exact counting direction edge cases; Body Palace calculation formula (doc 04 mentions it exists but does not give it); day/night division rules for Tian Kui/Tian Yue; the "Polaris purple glow" claim (false, do not carry over); any hour-branch DST/solar-time handling in the chart engine. Nothing with `needsSource: true` renders on a public page without a "different schools teach / traditionally described" wrapper.
4. **`overinterpretationWarning` (string) is mandatory on:** all four transformation records; every Hua-Ji-by-palace entry (rewritten per §3.2 item 9); Spouse Palace, Health Palace, and Children Palace records; 刑囚夾印 and every 凶格 pattern; the chart-quality tiers (High/Ordinary/Challenged) from doc 05, which must render with doc 05's own closing principle: "ZWDS is not fatalism. It is a life schedule."
5. **Banned strings in any data value:** "kept secret for", any bare year-count of secrecy, "guarantee", "will happen", "destined to", "cannot escape", "already written", diagnosis or death/divorce/disaster predictions. Lint the data files for these at build time.
6. **`historicalClaim` entries carry their qualifier inside the string** ("traditionally attributed to Chen Tuan", "by most accounts", "documentation is limited"), so no renderer can strip it.
7. **Script hygiene:** `hanzi` values are validated traditional (build-time check against the simplified list in §2: 数门阴阳禄权贞机杀军贪庙华辅钺铃鸾盘宫读 and the Japanese 権). `simplified` field optional, search-only.
8. **Sample charts:** Mei (born 1996, chart page) is fictional and stays the primary worked example. The "JM chart context" in the blueprint (real birth data 1989-06-27) must NOT enter any public data file or example; if a second practice chart is needed, invent one.
9. **Pronunciation config per record:** `speak` (traditional string), `speakLang: "zh-CN"`, `pinyinDisplay`, optional `folkPhonetic`. One shared audio module implements the `#say-ziwei` pattern (no autoplay, preference remembered).
10. **Provenance:** every record carries `source: ["zwds/02#zi-wei", ...]` pointers into docs/zwds so a later editor can trace any sentence. Where this document overrides the corpus (C1-C9, §3 rewrites), the pointer is `purple-star-hub/PSA-TERMINOLOGY.md#<section>`.

---

## 8. EXISTING-PAGE CORRECTION QUEUE (rollup)

Ordered by leverage; each item references the section above with the exact wording.

1. Shared mega-nav + zi-wei subnav + zwx-court footer: convert simplified to traditional (§2.1). One templating fix clears most of the site.
2. Hub `index.html`: meta/og/JSON-LD/hero secrecy claims (§3.1 items 1-3); JSON-LD ladder fix (§3.3 item 1); star grid and Four Forces cards to traditional + pinyin added (§2.2, §3.3 items 2-3); h1 subtitle to tone-marked Zǐwēi Dǒushù (§1.1).
3. `palaces/index.html`: COURTS arrays for courts 2/3/4 + desc strings (C2); 化禄/化权 → traditional.
4. `stars/index.html`: all 14 card hanzi, 庙旺利陷 header, trio headers → traditional (§2.2).
5. `four-forces/index.html`: hero/card glyphs → traditional; 读 → 讀; season relabel (§5); Wǔ Qū / Wén Qū pinyin fix (C8); Hook-row determinism rewrites (§3.2 items 3-5).
6. `stars/zi-wei/index.html`: transformation claim fix (C1); add literal to hero (§3.3 item 6).
7. `stars/tan-lang/index.html`, `stars/qi-sha/index.html`: script conversion; qi-sha spouse determinism (§3.2 item 1). Audit the remaining 11 star pages against §2/§3 with the same checklist.
8. `stars/tian-liang/index.html`: protection determinism (§3.2 item 2).
9. `history/index.html`: Chen Tuan attribution, Polaris glow, superlative og, Qing qualifier, 微 card label (§3.1 items 5-9, §3.3 items 4-5).
10. `indexv6.html` teaser: secrecy line, "already written", Parents reading (§3.1 item 4, §3.2 items 6-7). Keep `#say-ziwei` as-is; it is the pattern the whole hub adopts.
11. Docs corpus annotations: mark blueprint core-premise superseded; fix 化権 in docs 01/03; note doc 04 court-list and doc 02 Zi-Wei-transformation errors as corrected by this file (do not silently edit research docs; add a correction header pointing here).

---

## C8. Mirror pairs (correction, ruled 2026-07-07 during wave 1 build)

Doc 03's opposite-pair table lists Wealth-Health and Fortune-Parents. Both are geometrically impossible (those palaces are not six positions apart) and contradict the classical lines 財福線 (Wealth-Fortune) and 父疾線 (Parents-Health). Consistent with C2, geometry wins: the six pairs are Life-Travel, Siblings-Servants, Spouse-Career, Children-Property, Wealth-Fortune, Health-Parents. The §1 palace rows and the 對宮 glossary row above were corrected; `ziwei-palaces.js` and `ziwei-relationships.js` implement the geometric pairs with sourceNotes. Doc 03 carries a correction annotation.
