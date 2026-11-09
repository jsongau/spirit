# FACTFIX-R5-B change log

Date: 2026-11-08. Pages: meerkat, leopard-seal, glasswing-butterfly, deep-sea-anglerfish, axolotl.
Source of truth: `data/research/<slug>.json` fact_audit and sources, and `<slug>.md`. Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that exist (meerkat: v1 only; the other four: v2 only) unless marked HTML only or JSON only. Where a string appears more than once in a file, every copy was changed (count shown). Strings inside the page's embedded `animal-data` JSON block count as HTML copies.
Backups of the original pages: `~/factfix-backup-r5b/<slug>.html`; original template JSON in `~/factfix-backup-r5b/tpl/v1/` and `tpl/v2/` (both outside the repo).
Header glyphs use the species name in traditional forms to match the pages, per the R2 to R4 precedent. The glyph swap covers rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. Axolotl 美西螈 měixīyuán was audited OK and kept.

## meerkat

1. **Source:** m9, m10 (獴 alone means mongoose; species name 狐獴; traditional form; header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">獴</span>
   - AFTER: <span class="rail__han" aria-hidden="true">狐獴</span>
2. **Source:** m9, m10 (獴 alone means mongoose; species name 狐獴; traditional form; header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="獴" aria-label="Hear 獴, měng"
   - AFTER: data-say="狐獴" aria-label="Hear 狐獴, húměng"
3. **Source:** m9, m10 (獴 alone means mongoose; species name 狐獴; traditional form; header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">měng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">húměng</span>
4. **Source:** m9, m10 (獴 alone means mongoose; species name 狐獴; traditional form; header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">獴</span>
   - AFTER: <span class="serial-han">狐獴</span>
5. **Source:** m9, m10 (獴 alone means mongoose; species name 狐獴; traditional form; header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">獴</span><span class="py" lang="zh-Latn-pinyin">měng</span>
   - AFTER: <span class="h" lang="zh">狐獴</span><span class="py" lang="zh-Latn-pinyin">húměng</span>
6. **Source:** m9, m10 (獴 alone means mongoose; species name 狐獴; traditional form; template animalHan) (JSON only)
   - BEFORE: "animalHan": "獴"
   - AFTER: "animalHan": "狐獴"
7. **Source:** m9, m10 (獴 alone means mongoose; species name 狐獴; traditional form; template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "měng"
   - AFTER: "animalHanPy": "húměng"
8. **Source:** m2, m4 (older subordinate male: unverifiable, cut)
   - BEFORE: one meerkat, often an older subordinate male, breaks off
   - AFTER: one meerkat breaks off
9. **Source:** m1, m3 (snakes get a separate recruitment call)
   - BEFORE: a different one warns of a jackal or snake on the ground,
   - AFTER: a different one warns of a jackal on the ground, a third rallies the group against a snake,
10. **Source:** m2, m1 (gap is about 15 C (27 F), not thirty degrees)
   - BEFORE: its underground chambers run roughly thirty degrees cooler than the desert air above
   - AFTER: its chambers about a metre down run roughly 15°C (27°F) cooler than the surface above
11. **Source:** m3, m2 (cone retina and pupil shape unverifiable; replaced with sourced eye facts)
   - BEFORE: A meerkat's retina is made almost entirely of cone cells, giving it sharp color vision and a long, horizontally elongated pupil built for scanning open ground, but it comes at a cost: <b>meerkats see poorly after dark</b> and lose most of their advantage once the sun goes down.
   - AFTER: Meerkats forage by day and go underground at night. Dark rings around the eyes cut the glare of the desert sun, and a clear membrane shields each eye while it digs: <b>an eye built for the bright hours</b>.
12. **Source:** m3 (Perception axis read; pupil claim unverifiable)
   - BEFORE: A meerkat's eyes are built almost entirely for daylight, with a wide, flattened pupil that takes in a long horizon rather than a single point, and its alarm calls
   - AFTER: A meerkat's eyes are built for bright daylight, ringed in dark fur that cuts the glare, and its alarm calls
13. **Source:** m6, m3, m1, m7 (anti-predator posture and group-size threshold unverifiable; puffed fur is sourced for intergroup war dances)
   - BEFORE: Facing a ground predator, a meerkat's fur rises, its back arches, and its legs straighten until its whole small body reads as larger than it is; and when the mob numbers more than about four, it will <b>turn and mob the threat together rather than scatter</b>.
   - AFTER: When a snake or other threat comes close, the mob will often <b>turn and mob it together rather than scatter</b>, and when facing a rival mob, meerkats puff up their fur and raise their tails in a war dance until each small body reads as larger than it is.
## leopard-seal

1. **Source:** s16 (豹 alone means the big cat; species name 豹海豹; traditional form; header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">豹</span>
   - AFTER: <span class="rail__han" aria-hidden="true">豹海豹</span>
2. **Source:** s16 (豹 alone means the big cat; species name 豹海豹; traditional form; header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="豹" aria-label="Hear 豹, bào"
   - AFTER: data-say="豹海豹" aria-label="Hear 豹海豹, bàohǎibào"
3. **Source:** s16 (豹 alone means the big cat; species name 豹海豹; traditional form; header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">bào</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">bàohǎibào</span>
4. **Source:** s16 (豹 alone means the big cat; species name 豹海豹; traditional form; header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">豹</span>
   - AFTER: <span class="serial-han">豹海豹</span>
5. **Source:** s16 (豹 alone means the big cat; species name 豹海豹; traditional form; header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">豹</span><span class="py" lang="zh-Latn-pinyin">bào</span>
   - AFTER: <span class="h" lang="zh">豹海豹</span><span class="py" lang="zh-Latn-pinyin">bàohǎibào</span>
6. **Source:** s16 (豹 alone means the big cat; species name 豹海豹; traditional form; template animalHan) (JSON only)
   - BEFORE: "animalHan": "豹"
   - AFTER: "animalHan": "豹海豹"
7. **Source:** s16 (豹 alone means the big cat; species name 豹海豹; traditional form; template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "bào"
   - AFTER: "animalHanPy": "bàohǎibào"
8. **Source:** s5 (scientific name means thin-clawed; only the English name refers to the spots; gape unverifiable)
   - BEFORE: Hydrurga leptonyx is named for its spotted coat and its remarkably wide gape — both traits it shares with the big cat, and both are accurate.
   - AFTER: The leopard seal takes its English name from its spotted coat, the trait it shares with the big cat.
9. **Source:** s7, s8 (overview; krill filtering inferred in the wild)
   - BEFORE: capable of filtering krill through interlocking teeth the way a baleen whale does
   - AFTER: equipped to filter krill through interlocking teeth much as a baleen whale does
10. **Source:** s10, s5 (overview; songs are long but simple)
   - BEFORE: of producing hour-long melodic underwater vocalizations of extraordinary complexity
   - AFTER: of singing underwater for hours at a stretch
11. **Source:** s9 (overview; one documented encounter)
   - BEFORE: and of approaching human divers to offer them penguins.
   - AFTER: and, in one famous encounter, of bringing penguins to a human diver.
12. **Source:** s7, s8 (trait 1; equipped to, not shown to)
   - BEFORE: allowing it to filter krill from seawater
   - AFTER: equipping it to filter krill from seawater
13. **Source:** s9, s5 (one seal, one photographer; the interpretation is his)
   - BEFORE: Individual leopard seals have repeatedly approached scuba divers and attempted to offer penguins — live and dead — in what researchers describe as <b>an attempt to provision a perceived inferior predator</b>.
   - AFTER: Over four days in Antarctica, one female leopard seal kept bringing penguins, live and then dead, to National Geographic photographer Paul Nicklen, in what <b>he took as an attempt to feed a predator too hopeless to hunt for itself</b>.
14. **Source:** s9 (Openness axis read)
   - BEFORE: Leopard seals have approached underwater photographers with offerings — live penguins, dead penguins — in what researchers interpret as an attempt to feed a perceived inferior predator.
   - AFTER: One leopard seal brought an underwater photographer offerings, live penguins and then dead ones, in what he took as an attempt to feed a predator it thought could not hunt.
15. **Source:** s6 (AAD: females 3.0 m and 370 kg, males slightly smaller; reversal claim unverifiable, cut)
   - BEFORE: Female leopard seals are significantly larger than males, <b>averaging 3 meters and 260 kilograms</b> — an unusual reversal of the typical pinniped pattern.
   - AFTER: Female leopard seals are slightly larger than males, <b>averaging about 3 meters and 370 kilograms</b>, and large females can pass 3.5 meters and 500 kilograms.
16. **Source:** s10, s5 (duration OK; complexity wrong (Chambers, Buck and Rogers 2025))
   - BEFORE: Leopard seals produce underwater vocalizations described as among the most acoustically complex of any pinniped, with <b>repeated harmonic sequences lasting several hours</b>.
   - AFTER: In the breeding season, male leopard seals sing underwater for hours, sometimes 13 hours straight, <b>repeating a small set of calls in sequence</b>; a 2025 study found the songs about as predictable as nursery rhymes.
17. **Source:** s10 (Perception axis read)
   - BEFORE: Leopard seals produce long, complex underwater vocalizations — hour-long harmonic sequences that researchers have only partially decoded.
   - AFTER: Male leopard seals sing long underwater songs, simple calls repeated in sequence for hours at a time.
18. **Source:** s6, s5 (widest-diet ranking unverifiable)
   - BEFORE: Leopard seals prey on krill, fish, squid, penguins, and other seal species, representing <b>one of the widest dietary ranges of any Antarctic apex predator</b>.
   - AFTER: Leopard seals eat almost anything: krill, fish, squid, penguins, and the pups of other seal species, <b>a range that runs from krill to warm-blooded prey</b>.
19. **Source:** s10, s9 (FAQ answer) (JSON only)
   - BEFORE: that produces some of the most complex vocalizations in the ocean, and that approaches humans with offerings.
   - AFTER: that sings underwater for hours, and that once brought a diver penguins.
20. **Source:** s9 (bonds lead)
   - BEFORE: The Leopard Seal approaches humans with penguins.
   - AFTER: One leopard seal brought penguins to a human diver.
21. **Source:** s17 (proverb: 猛虎藏爪 is not an attested idiom; replaced with the attested Tiger idiom 臥虎藏龍 wò hǔ cáng lóng the dossier names) (HTML only)
   - BEFORE: <ruby class="hz">猛<rt>měng</rt></ruby><ruby class="hz">虎<rt>hǔ</rt></ruby><ruby class="hz">藏<rt>cáng</rt></ruby><ruby class="hz">爪<rt>zhǎo</rt></ruby>
   - AFTER: <ruby class="hz">臥<rt>wò</rt></ruby><ruby class="hz">虎<rt>hǔ</rt></ruby><ruby class="hz">藏<rt>cáng</rt></ruby><ruby class="hz">龍<rt>lóng</rt></ruby>
22. **Source:** s17 (proverb whole-phrase audio (data-say / template say))
   - BEFORE: 猛虎藏爪，靜水流深
   - AFTER: 臥虎藏龍
23. **Source:** s17 (proverb tile 1) (HTML only)
   - BEFORE: data-say="猛" aria-label="猛, měng, fierce / powerful. Tap to hear this character."><span class="p" aria-hidden="true">měng</span><span class="c" aria-hidden="true">猛</span><span class="g" aria-hidden="true">fierce / powerful</span>
   - AFTER: data-say="臥" aria-label="臥, wò, crouch / lie low. Tap to hear this character."><span class="p" aria-hidden="true">wò</span><span class="c" aria-hidden="true">臥</span><span class="g" aria-hidden="true">crouch / lie low</span>
24. **Source:** s17 (proverb tile 4) (HTML only)
   - BEFORE: data-say="爪" aria-label="爪, zhǎo, claws. Tap to hear this character."><span class="p" aria-hidden="true">zhǎo</span><span class="c" aria-hidden="true">爪</span><span class="g" aria-hidden="true">claws</span>
   - AFTER: data-say="龍" aria-label="龍, lóng, dragon. Tap to hear this character."><span class="p" aria-hidden="true">lóng</span><span class="c" aria-hidden="true">龍</span><span class="g" aria-hidden="true">dragon</span>
25. **Source:** s17 (template proverb hanzi 1) (JSON only)
   - BEFORE: "z": "猛",\n        "p": "měng"
   - AFTER: "z": "臥",\n        "p": "wò"
26. **Source:** s17 (template proverb hanzi 4) (JSON only)
   - BEFORE: "z": "爪",\n        "p": "zhǎo"
   - AFTER: "z": "龍",\n        "p": "lóng"
27. **Source:** s17 (proverb literal)
   - BEFORE: The fierce tiger hides its claws; still water runs deep.
   - AFTER: A crouching tiger, a hidden dragon.
28. **Source:** s17 (proverb meaning)
   - BEFORE: What is most powerful is often least visible. The quiet surface does not indicate an absence of force — it indicates force that does not need to be performed.
   - AFTER: Talent lies hidden where you least expect it, and people are often more than they first seem.
29. **Source:** s17 (proverb note)
   - BEFORE: A proverb we tie to the
   - AFTER: A four-character idiom we tie to the
## glasswing-butterfly

1. **Source:** s9 (蝶 is generic butterfly; species name 玻璃翼蝶; traditional form; header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">蝶</span>
   - AFTER: <span class="rail__han" aria-hidden="true">玻璃翼蝶</span>
2. **Source:** s9 (蝶 is generic butterfly; species name 玻璃翼蝶; traditional form; header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="蝶" aria-label="Hear 蝶, dié"
   - AFTER: data-say="玻璃翼蝶" aria-label="Hear 玻璃翼蝶, bōlíyìdié"
3. **Source:** s9 (蝶 is generic butterfly; species name 玻璃翼蝶; traditional form; header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">dié</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">bōlíyìdié</span>
4. **Source:** s9 (蝶 is generic butterfly; species name 玻璃翼蝶; traditional form; header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">蝶</span>
   - AFTER: <span class="serial-han">玻璃翼蝶</span>
5. **Source:** s9 (蝶 is generic butterfly; species name 玻璃翼蝶; traditional form; header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">蝶</span><span class="py" lang="zh-Latn-pinyin">dié</span>
   - AFTER: <span class="h" lang="zh">玻璃翼蝶</span><span class="py" lang="zh-Latn-pinyin">bōlíyìdié</span>
6. **Source:** s9 (蝶 is generic butterfly; species name 玻璃翼蝶; traditional form; template animalHan) (JSON only)
   - BEFORE: "animalHan": "蝶"
   - AFTER: "animalHan": "玻璃翼蝶"
7. **Source:** s9 (蝶 is generic butterfly; species name 玻璃翼蝶; traditional form; template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "dié"
   - AFTER: "animalHanPy": "bōlíyìdié"
8. **Source:** s5 (range is Central America and northern South America)
   - BEFORE: In the shaded understory of Central American rainforest, from Mexico down through Panama, Greta oto
   - AFTER: In the shaded understory of rainforest from Central America south into South America, Greta oto
9. **Source:** s6 (pillar height typically 400 to 600 nm (Siddique et al. 2015))
   - BEFORE: <b>nanopillars 150 to 250 nanometres tall</b>
   - AFTER: <b>nanopillars, typically 400 to 600 nanometres tall,</b>
10. **Source:** s7 (Arias et al. tested related clearwings, not Greta oto, and did not compare toxicity)
   - BEFORE: Despite carrying toxins that make it unpalatable, the Glasswing is <b>attacked less often than opaque, equally toxic relatives</b>. Transparency itself measurably lowers detection by predators.
   - AFTER: The Glasswing carries toxins that make it unpalatable, and its clear wings may add a second guard: <b>in tests with related clearwing butterflies, the more transparent species were spotted later and less often</b> (Arias et al. 2019).
11. **Source:** s5 (citation: Dyer 1995 is the wrong paper for the host-plant claim; now the verified source that cites Hall 1996 and Henderson 2002)
   - BEFORE: Dyer · Tasty generalists and nasty specialists: antipredator mechanisms in tropical lepidopteran larvae, Ecology 76(5) (1995)
   - AFTER: Greta oto, Wikipedia (citing Hall 1996 on larval host plants and Henderson 2002 on egg-laying on Cestrum)
12. **Source:** s5 (citation link)
   - BEFORE: https://doi.org/10.2307/1938150
   - AFTER: https://en.wikipedia.org/wiki/Greta_oto
13. **Source:** s5, s8 (predator's pull unverifiable, cut)
   - BEFORE: <b>an attachment strong enough to survive wind and a predator's pull</b>, without breaking.
   - AFTER: <b>an attachment strong enough to hold through strong wind</b> without breaking.
14. **Source:** s5 (display-not-chase clause unverifiable, cut)
   - BEFORE: Males gather in shaded leks and convert plant-derived pyrrolizidine alkaloids into a courtship pheromone through a multi-step chemical process; <b>females choose based on the display, not a chase</b>.
   - AFTER: Males gather in shaded leks and <b>turn plant-derived pyrrolizidine alkaloids into a courtship pheromone</b> through a multi-step chemical process.
15. **Source:** s5 (between elevations not found; 40x attributed as reported)
   - BEFORE: while migrating between elevations, and despite its papery look, can carry roughly <b>forty times its own body weight</b>.
   - AFTER: on migration, and despite its papery look, it is reported to carry up to <b>forty times its own body weight</b>.
16. **Source:** s0 (Purple Star; pairing is our own reading)
   - BEFORE: and read for the Cancer Goat crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Cancer Goat crossing through two of them.
17. **Source:** s0 (Purple Star)
   - BEFORE: For a Cancer born in the Goat year, the Minister star tends to sit steady and quietly protective in the chart.
   - AFTER: In our reading of the Cancer Goat, the Minister star sits steady and quietly protective.
18. **Source:** s0 (Purple Star)
   - BEFORE: Near the Life palace, 命宮, Purple Star tends to place the wealth star for this crossing,
   - AFTER: Beside it, our reading sets the wealth star for this crossing,
19. **Source:** s0 (Purple Star)
   - BEFORE: That is the outline the Cancer Goat tends to share. Your exact birth hour is what moves these stars into your own twelve palaces and shows which one runs loudest:
   - AFTER: That is our outline for the Cancer Goat. Only your real chart, cast from your lunar birth date and hour, shows where these stars fall in your twelve palaces and which one runs loudest:
20. **Source:** s0 (kicker, v2 data; HTML already relabeled) (JSON only)
   - BEFORE: What Purple Star already suspects about you
   - AFTER: Our Purple Star reading for this crossing
## deep-sea-anglerfish

1. **Source:** s17 (光 means light; species name 深海鮟鱇; traditional form; header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">光</span>
   - AFTER: <span class="rail__han" aria-hidden="true">深海鮟鱇</span>
2. **Source:** s17 (光 means light; species name 深海鮟鱇; traditional form; header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="光" aria-label="Hear 光, guāng"
   - AFTER: data-say="深海鮟鱇" aria-label="Hear 深海鮟鱇, shēnhǎi ānkāng"
3. **Source:** s17 (光 means light; species name 深海鮟鱇; traditional form; header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">guāng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">shēnhǎi ānkāng</span>
4. **Source:** s17 (光 means light; species name 深海鮟鱇; traditional form; header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">光</span>
   - AFTER: <span class="serial-han">深海鮟鱇</span>
5. **Source:** s17 (光 means light; species name 深海鮟鱇; traditional form; header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">光</span><span class="py" lang="zh-Latn-pinyin">guāng</span>
   - AFTER: <span class="h" lang="zh">深海鮟鱇</span><span class="py" lang="zh-Latn-pinyin">shēnhǎi ānkāng</span>
6. **Source:** s17 (光 means light; species name 深海鮟鱇; traditional form; template animalHan) (JSON only)
   - BEFORE: "animalHan": "光"
   - AFTER: "animalHan": "深海鮟鱇"
7. **Source:** s17 (光 means light; species name 深海鮟鱇; traditional form; template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "guāng"
   - AFTER: "animalHanPy": "shēnhǎi ānkāng"
8. **Source:** s14 (deep-sea group is suborder Ceratioidei; depth range approximate)
   - BEFORE: The deep sea anglerfish (order Lophiiformes) is a bathypelagic predator that hunts in near-total darkness at depths from 200 to 2,000 meters,
   - AFTER: The deep sea anglerfish (suborder Ceratioidei) is a deep-water predator that hunts in near-total darkness, mostly at depths of about 200 to 2,000 meters,
9. **Source:** s6 (symbiont is Ca. Enterovibrio escacola, acquired from seawater (Baker et al. 2019))
   - BEFORE: <b>symbiotic bioluminescent bacteria</b> — primarily Photobacterium mandapamensis — that live inside the tip
   - AFTER: <b>symbiotic bioluminescent bacteria</b>, mostly a species named Candidatus Enterovibrio escacola that the fish picks up from the seawater, which live inside the tip
10. **Source:** s13, s14 (passive drag mechanism and Pietsch 2009 page not found; stillness kept)
   - BEFORE: using the passive drag of its body to maintain depth while the lure dangles and pulses above its mouth. Documented in Pietsch (2009), this passive hunting strategy is enabled by the extreme stability of the deep-sea environment.
   - AFTER: drifting while the lure dangles and pulses above its mouth. This ambush strategy suits the stillness of the deep sea.
11. **Source:** s13, s14 (Stillness axis read; drag mechanism not sourced)
   - BEFORE: using the drag of its body to hold position while the lure does all the work
   - AFTER: drifting in place while the lure does all the work
12. **Source:** s8, s9, s10, s14 (permanent attachment in only 23 of 160 species; mass figure unsourced)
   - BEFORE: In ceratioid anglerfishes, the male is dramatically smaller (roughly <b>6–7% of the female's body mass</b>); upon contact, he bites into the female's skin and their circulatory systems fuse. Over time, the male's body degenerates except for the testes. The pair becomes one organism. Documented in detail by Pietsch (2005).
   - AFTER: In some ceratioid anglerfishes the male is dramatically smaller (in one species <b>about 6 millimetres long against a 46-millimetre female</b>). He bites into the female's skin, and in the species where the bond is permanent, their circulatory systems fuse and he becomes largely a sperm source fed by her blood. Pietsch (2005) found permanent attachment in only 23 of about 160 species; many others never fuse.
13. **Source:** s14 (depth range wider; temperature not sourced, softened)
   - BEFORE: Anglerfish inhabit the <b>mesopelagic and bathypelagic zones</b> (200–2,000 m), where sunlight does not penetrate. At these depths, pressure reaches 20–200 atmospheres; temperatures hover near 2–4°C.
   - AFTER: Anglerfish inhabit the <b>mesopelagic and bathypelagic zones</b>, mostly 200 to 2,000 m down and some deeper still, where sunlight does not penetrate. At these depths, pressure reaches 20 to 200 atmospheres or more, and the water is cold.
14. **Source:** s7, s9, s11 (organ loss overstated; only-gonads unsupported; no rejection is supported (Swann et al. 2020))
   - BEFORE: After fusion, the male anglerfish <b>loses his eyes, digestive system, and most internal organs</b>; only the gonads remain. The female's immune system does not reject him. Two circulatory systems run as one. The fish become biologically indistinguishable as separate organisms.
   - AFTER: In the species where the male fuses for good, his eyes, fins and some internal organs <b>are reported to wither</b>, and he lives on as little more than a sperm source fed by her blood. The female's immune system does not reject him: these species have lost key immune genes. Two circulatory systems run as one.
15. **Source:** s8 (overview frame; fusion only in some species)
   - BEFORE: The males that fuse permanently to the female,
   - AFTER: The males that, in some species, fuse permanently to the female,
16. **Source:** s6 (proverb soul; years-long accumulation unsourced)
   - BEFORE: The bacteria accumulate for years in the esca.
   - AFTER: The bacteria gather in the esca as the fish matures.
## axolotl

1. **Source:** s6 (native to Lakes Xochimilco and Chalco)
   - BEFORE: native to the lake complex beneath Mexico City
   - AFTER: native to Lakes Xochimilco and Chalco in and around Mexico City
2. **Source:** s6 (axolotls have lungs and gulp air)
   - BEFORE: never replacing them with lungs as typical salamander metamorphosis would require. These gills are fully functional, not vestigial — the animal breathes through them for its entire lifespan.
   - AFTER: where typical salamander metamorphosis would absorb them. These gills are fully functional, not vestigial, and the animal breathes through them for its entire life, alongside lungs it fills by gulping air at the surface.
3. **Source:** s6 (defense copy implied no lungs)
   - BEFORE: Internal lungs would provide more protection
   - AFTER: Lungs alone would provide more protection
4. **Source:** s6, s13 (regeneration declines with age and after metamorphosis)
   - BEFORE: This capacity does not diminish with age and has made the species
   - AFTER: The capacity declines with age, and drops sharply after metamorphosis, but never fully disappears; it has made the species
5. **Source:** s6 (organ failure and shortened lifespan unsourced)
   - BEFORE: In most individuals, metamorphosis is damaging when forced: organ stress, shortened lifespan, and in some cases organ failure.
   - AFTER: Forced metamorphosis is often fatal in amateur hands, and the hormone also blocks regeneration.
6. **Source:** s6 (millions unsourced; founder fact)
   - BEFORE: Captive populations number in the millions worldwide.
   - AFTER: A large captive population lives on worldwide, most of it descended from fewer than 36 animals.
7. **Source:** s14 (overstatement; some aquatic adult amphibians keep a lateral line)
   - BEFORE: which is typically only present in fish and larval amphibians
   - AFTER: unlike most adult salamanders
## Not applied

- meerkat: proverb 胆小如鼠 is printed in simplified 胆 while the headers are traditional (膽小如鼠 dǎn xiǎo rú shǔ); audit OK, style flag only; left. Trait 5 title "The daylight eye" and its reading ("some hours are simply not yours to see by") kept; they still fit a day-active animal. Trait 6 reading ("Alone, you make yourself look larger") left as reading. The sentinel shift "rotates through the group" (audit OK with nuance: no fixed rota) left. The "sun angels" legend is not on the page.
- leopard-seal: proverb 猛虎藏爪 (with the glued-on "still water runs deep") replaced by the attested Tiger idiom the dossier names, 臥虎藏龍 wò hǔ cáng lóng (s17); characters, pinyin, tile glosses, whole-phrase audio, literal, meaning and note changed. The proverb soul paragraph (reading copy about the still approach) kept; it fits the new idiom. It also prints a literal `&lt;b&gt;` tag on the page (pre-existing escape bug, not touched). Eyebrow "The proverb of your year" and button "Hear the whole verse" are renderer strings; left. Reading copy that leans on "penguin gifts" and "approach to human divers" (defense, bonds rows, rituals) left as reading; only the fact lines, overview, axis reads, bonds lead and FAQ were corrected. Trait titles "The Female Advantage" and "The Longest Song" left (still true in the softened form). Rogers and Bryden 1995 citation was not opened by the audit; left in the source list. Hydrurga "water worker" gloss not printed (Wikipedia flags it).
- glasswing-butterfly: the audit said no Purple Star claim, but the page and v2 data carry the 天相 / 武曲 "tends to" block; relabeled as our own reading using the R4 pattern (source id s0, the internal GRID brief). 天相 and 武曲 already carry pinyin. Trait 2 title "Invisible, and still poisonous" and trait 5 reading ("You were never built for pursuit") left as reading. "Toxic" for Cestrum was not checked by the audit; kept.
- deep-sea-anglerfish: trait 3 title "Permanent sexual parasitism" kept (it names the phenomenon; the fact now says only some species). Readings built on fusion and merging (crash card, rituals, crystals) left as reading. Adaptability axis "between 200 and 2,000 meters" left (audit OK). Pietsch 2009 stays in the source list, but the page no longer cites it for a specific claim. The proverb 厚积薄发 is printed in simplified forms; left (style only).
- axolotl: the audit's metamorphosis line keeps "often fatal in amateur hands" and adds the sourced point that the hormone blocks regeneration. Readings about "gills fully exposed" and "never closes off" left as reading. The 返璞歸真 note about its use in mourning couplets (MOE) was not added (an addition, not a correction).
- Purple Star on meerkat, leopard-seal, deep-sea-anglerfish and axolotl: no star claim present; nothing to change.

## Structure check

Section counts match backups (meerkat 31/31, leopard-seal 31/31, glasswing-butterfly 31/31, deep-sea-anglerfish 31/31, axolotl 32/32). All JSON-LD and application/json blocks parse (4 per page). HTML start-tag skeleton identical to backup on all five. Every edited page parses with python html.parser. Template JSON (v1 for meerkat, v2 for the other four) loads and keysets are unchanged. `<!--w4-reading-->` is not present on any of the five pages. No CSS, JS or other page touched. Related Animals explore cards untouched. No git run. No old header glyph (獴 alone, 豹 alone, 蝶 alone, 光) remains in a header slot; no "猛虎藏爪", "260 kilograms", "mandapamensis", "millions" or "does not diminish" remains. New copy checked for em/en dashes, arrows and the banned word list.

## Final header characters

| Page | Header hanzi | Pinyin |
|---|---|---|
| meerkat | 狐獴 | húměng |
| leopard-seal | 豹海豹 | bàohǎibào |
| glasswing-butterfly | 玻璃翼蝶 | bōlíyìdié |
| deep-sea-anglerfish | 深海鮟鱇 | shēnhǎi ānkāng |
| axolotl | 美西螈 (unchanged) | měixīyuán |
