# FACTFIX-R7-B change log

Date: 2026-11-08. Pages: sandgrouse, narwhal, mountain-pygmy-possum, roseate-spoonbill, rock-wren.
Source of truth: `data/research/<slug>.json` fact_audit (and page_bugs) plus `<slug>.md`. Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that exist (sandgrouse, narwhal, roseate-spoonbill: v2 only; mountain-pygmy-possum, rock-wren: v1 only) unless marked HTML only or JSON only. Where a string appears more than once in a file, every copy was changed (count shown). Strings inside the page's embedded `animal-data` JSON block count as HTML copies.
Backups of the original pages: `~/factfix-backup-r7b/<slug>.html`; original template JSON in `~/factfix-backup-r7b/tpl/v2/` and `tpl/v1/` (both outside the repo).
Header glyphs use traditional forms, per the R2 to R4 precedent. The glyph swap covers rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy.

## sandgrouse

1. **Source:** s17, s18 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">飛</span>
   - AFTER: <span class="rail__han" aria-hidden="true">沙雞</span>
2. **Source:** s17, s18 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="飛" aria-label="Hear 飛, fēi"
   - AFTER: data-say="沙雞" aria-label="Hear 沙雞, shājī"
3. **Source:** s17, s18 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">fēi</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">shājī</span>
4. **Source:** s17, s18 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">飛</span>
   - AFTER: <span class="serial-han">沙雞</span>
5. **Source:** s17, s18 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">飛</span><span class="py" lang="zh-Latn-pinyin">fēi</span>
   - AFTER: <span class="h" lang="zh">沙雞</span><span class="py" lang="zh-Latn-pinyin">shājī</span>
6. **Source:** s17, s18 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "飛"
   - AFTER: "animalHan": "沙雞"
7. **Source:** s17, s18 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "fēi"
   - AFTER: "animalHanPy": "shājī"
8. **Source:** s5, s7
   - BEFORE: The only bird in its family that carries water for its young in its own feathers, across distances most animals would not attempt.
   - AFTER: A desert bird that carries water to its young in its own belly feathers, something no bird outside its family is known to do.
9. **Source:** s6, s9 (40-degree swing unsourced; 160 km belongs to another species)
   - BEFORE: lives in the arid and semi-arid scrublands of sub-Saharan Africa, where surface water is scarce, temperatures swing by forty degrees between dawn and noon, and the round trip to the nearest waterhole can cover a hundred and sixty kilometres.
   - AFTER: lives in the dry scrub and gravel plains of south-western Africa, from the Kalahari to the Karoo, where surface water is scarce and a nest can sit as much as thirty kilometres from the nearest waterhole.
10. **Source:** s7, s8, s10
   - BEFORE: absorbs and retains up to 20 mL of water</b>; the female’s feathers lack this adaptation entirely, making water-transport an exclusively male behavior.
   - AFTER: absorbs and holds about 25 mL of water</b>, roughly 15 percent of his body weight. Females have the same kind of feather over a smaller patch, and it is the male that carries water to the chicks.
11. **Source:** s7, s9 (trait title)
   - BEFORE: Eighty kilometres for a drink
   - AFTER: Thirty kilometres for a drink
12. **Source:** s7, s9, s15
   - BEFORE: Breeding males have been tracked flying <b>up to 80 km each way</b> to reach a waterhole, drinking, soaking their breast feathers, and returning — a round trip of 160 km performed daily during the chick-rearing period.
   - AFTER: Breeding males may fly <b>20 to 30 km each way</b> to reach a waterhole, drinking, soaking their breast feathers and flying home, a run they repeat through the chick-rearing period. About half the water can evaporate on the way.
13. **Source:** s5, s15 (predator effect softened)
   - BEFORE: — a behavior that overwhelms predators at the water’s edge by sheer simultaneous density.
   - AFTER: , a habit that probably helps them against predators at the water’s edge.
14. **Source:** s6 (two-metre figure and superlative unsourced)
   - BEFORE: Sandgrouse plumage is <b>among the most precisely camouflaged of any bird</b> in its habitat: the pattern matches local gravel and sand so closely that a roosting bird is routinely invisible at two metres.
   - AFTER: Sandgrouse plumage is <b>patterned to match the local gravel and sand</b>, and the female and young blend in even better than the male.
15. **Source:** s5, s6, s15, s18
   - BEFORE: The Namaqua sandgrouse (Pterocles namaqua) ranges across the arid and semi-arid zones of sub-Saharan Africa; related species extend the sandgrouse range <b>from the Canary Islands to the Indian subcontinent</b>.
   - AFTER: The Namaqua sandgrouse (Pterocles namaqua) lives in the dry south-west of Africa, from Angola and Namibia to South Africa; related species extend the sandgrouse range <b>from the Canary Islands across Africa and the Middle East to central Asia</b>, as far as north-west China.
16. **Source:** s5, s15
   - BEFORE: Sandgrouse species range from the Canary Islands to India, through sub-Saharan Africa,
   - AFTER: Sandgrouse species range from the Canary Islands across Africa and the Middle East to central Asia,
17. **Source:** s7, s9 (trait title)
   - BEFORE: The only bird that feeds its young with its body
   - AFTER: The bird that brings water home in its feathers
18. **Source:** s7, s9
   - BEFORE: milking water from the specialized plumage with their bills — a feeding behavior unique among birds.
   - AFTER: milking water from the specialized plumage with their bills. No other birds are known to carry water this way.
19. **Source:** s7, s9
   - BEFORE: fly eighty kilometres and find the waterhole
   - AFTER: fly thirty kilometres and find the waterhole
20. **Source:** s7, s9
   - BEFORE: the sandgrouse can fly eighty kilometres if there is a waterhole at the end
   - AFTER: the sandgrouse can fly thirty kilometres if there is a waterhole at the end
21. **Source:** s7, s9 (about 30 km each way)
   - BEFORE: You are running a hundred and sixty kilometres a day for water your chicks no longer drink.
   - AFTER: You are flying sixty kilometres a day for water your chicks no longer drink.
22. **Source:** s7, s9
   - BEFORE: crossed a hundred and sixty kilometres for nothing.
   - AFTER: crossed thirty kilometres of desert for nothing.
23. **Source:** s9, s19 (thirty seconds unsourced)
   - BEFORE: The male sandgrouse crosses 160 kilometres for water his chicks will drink in thirty seconds.
   - AFTER: The male sandgrouse flies up to thirty kilometres home with water his chicks drink straight from his feathers.

## narwhal

1. **Source:** s13 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">独角鲸</span>
   - AFTER: <span class="rail__han" aria-hidden="true">獨角鯨</span>
2. **Source:** s13 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="独角鲸" aria-label="Hear 独角鲸, dújiǎojīng"
   - AFTER: data-say="獨角鯨" aria-label="Hear 獨角鯨, dújiǎojīng"
3. **Source:** s13 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">dújiǎojīng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">dújiǎojīng</span>
4. **Source:** s13 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">独角鲸</span>
   - AFTER: <span class="serial-han">獨角鯨</span>
5. **Source:** s13 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">独角鲸</span><span class="py" lang="zh-Latn-pinyin">dújiǎojīng</span>
   - AFTER: <span class="h" lang="zh">獨角鯨</span><span class="py" lang="zh-Latn-pinyin">dújiǎojīng</span>
6. **Source:** s13 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "独角鲸"
   - AFTER: "animalHan": "獨角鯨"
7. **Source:** s13 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "dújiǎojīng"
   - AFTER: "animalHanPy": "dújiǎojīng"
8. **Source:** s5, s8 (meta, og and JSON-LD descriptions) [copies: htmlx4, v2x1]
   - BEFORE: the tusk's ten million nerve endings
   - AFTER: the tusk's millions of nerve connections
9. **Source:** s5, s7, s8
   - BEFORE: The narwhal's tusk contains approximately ten million nerve endings — one of the densest sensory arrays in the animal kingdom. It reads pressure, temperature, salinity, and particle gradients in surrounding water.
   - AFTER: The narwhal's tusk carries millions of nerve connections, and in a 2014 field test it responded to changes in how salty the water was.
10. **Source:** s7 (only salinity tested)
   - BEFORE: while its tusk reads pressure gradients and temperature shifts in the surrounding water.
   - AFTER: while its tusk, researchers think, takes in changes in the surrounding water.
11. **Source:** s5, s6, s9
   - BEFORE: Narwhals form close pods and spend years beside the same individuals — but
   - AFTER: Narwhals travel in small pods, but
12. **Source:** s5, s6 (multi-year bonds unsourced)
   - BEFORE: and maintain long-term social bonds within their pods.
   - AFTER: and travel in small pods.
13. **Source:** s5, s9 (no source for 1,800 m)
   - BEFORE: before diving to depths of 1,800 meters.
   - AFTER: before diving to 1,500 meters and deeper.
14. **Source:** s5, s6, s7, s8
   - BEFORE: a <b>modified left upper canine tooth containing approximately ten million nerve endings</b>, making it one of the most densely innervated structures in the animal kingdom; it detects pressure, temperature, and salinity gradients in surrounding water.
   - AFTER: a <b>modified left upper canine tooth with millions of nerve connections</b>. In a 2014 field test, a narwhal's heart rate changed when salt water of different strength washed over the tusk; whether it also senses temperature or pressure is still an open question.
15. **Source:** s5, s6, s9
   - BEFORE: Narwhals are capable of diving to <b>depths of approximately 1,800 meters</b> and can remain
   - AFTER: Narwhals routinely dive past 800 meters, with <b>many winter dives reaching about 1,500 meters</b>, and can remain
16. **Source:** s5
   - BEFORE: a slow deliberate behavior observed to serve both social and sensory functions rather than direct combat.
   - AFTER: often slow and gentle; it may help clean the tusk or settle social standing, though some biologists think tusks are also used in fights.
17. **Source:** s5, s6
   - BEFORE: Narwhals live in <b>tight social groups of five to ten animals</b> that maintain long-term bonds, traveling and surfacing together across Arctic migration routes over many years.
   - AFTER: Narwhals usually travel in <b>small pods of about two to ten animals</b>, and in summer gather by the hundreds or thousands along their Arctic migration routes.
18. **Source:** s5, s6 (surface-area and sensory claim unsourced)
   - BEFORE: — up to three meters — a structural feature that increases surface area and may amplify the tusk's sensory resolution.
   - AFTER: , which can reach three meters; the twist may help the tusk grow straight.
19. **Source:** s5, s7, s8 (HTML only)
   - BEFORE: Ten million nerve endings run the length of that tooth, open to the sea, reading salinity and temperature and pressure, and you have
   - AFTER: Millions of nerve connections run the length of that tooth, open to the sea, and you have
20. **Source:** page data: Dossier stat, moon dial, ritual and calendar all say Waxing Gibbous (HTML only)
   - BEFORE: The waning crescent belongs to you, that last thin paring of light in the nights just before the moon goes dark. Peak brightness floods a water nature and asks it to perform, and the narwhal was built instead for the black of the deep. As the light thins, your reading comes back private and honest. Traditionally these are the nights for the quiet, loyal choices, the return to one person, the position held without argument. Look for the sliver before you decide anything out loud.
   - AFTER: The waxing gibbous belongs to you, the bright nights just before the moon is full, when the light is still building. Full brightness floods a water nature and asks it to perform; the gibbous gives you most of the light and holds the last of it back, the way the narwhal takes its reading before it surfaces. These are your nights for the quiet, loyal choices, the return to one person, the position held without argument. Look for the swelling moon before you decide anything out loud.

## mountain-pygmy-possum

1. **Source:** s6, s7, s8, s9, s14
   - BEFORE: The smallest possum alive sleeps longer than almost any mammal its size, and wakes only when the snow says so.
   - AFTER: A possum that weighs about 45 grams sleeps up to seven months under the snow, and wakes only when the snow says so.
2. **Source:** s13
   - BEFORE: and the only marsupial that hibernates at all.
   - AFTER: and one of the few marsupials known to hibernate.
3. **Source:** s6
   - BEFORE: the only Australian mammal confined entirely to alpine boulderfields,
   - AFTER: the only Australian mammal restricted to alpine and subalpine habitat,
4. **Source:** s10 (also uses plum-pine heath where boulderfields are absent)
   - BEFORE: Mountain pygmy possums live only in <b>boulderfield habitat
   - AFTER: Mountain pygmy possums live mainly in <b>boulderfield habitat
5. **Source:** s8, s9
   - BEFORE: for roughly <b>six months, from February into winter's end</b>; during torpor their body temperature drops to near 2°C while the surrounding den holds at 4 to 7°C.
   - AFTER: for <b>five to seven months, from about April until the snow melts</b>; during torpor their body temperature drops to near 2°C, and in midwinter the den itself usually sits at about 1.5 to 2.5°C.
6. **Source:** s8 (motive not stated in the paper)
   - BEFORE: in search of a more exact microclimate, especially early in the season.
   - AFTER: , most of all early in the season.
7. **Source:** s7 (single source; attributed)
   - BEFORE: It is the <b>only marsupial known to cache non-perishable food</b>,
   - AFTER: According to Menkhorst (1995), it is the <b>only marsupial known to cache non-perishable food</b>,
8. **Source:** s6, s9 (federal listing is Endangered)
   - BEFORE: The species is listed <b>Critically Endangered</b>, with
   - AFTER: The species is listed <b>Critically Endangered</b> by the IUCN, with
9. **Source:** unverifiable; made our reading
   - BEFORE: and that relation is close to literal here: the alpine shrub roots that are your Wood quite physically bind the boulder-field scree that is Capricorn's Earth,
   - AFTER: and we read that relation into the mountain itself: picture the alpine shrub roots that are your Wood binding the boulder-field scree that is Capricorn's Earth,
10. **Source:** unverifiable; made our reading
   - BEFORE: exactly the way a real alpine shrub keeps a scree field from sliding apart around it.
   - AFTER: the way we picture an alpine shrub holding a scree field together around it.
11. **Source:** s17 (Lunar New Year note incomplete) (HTML only)
   - BEFORE: so a birthday in those weeks can belong to the Tiger.
   - AFTER: so a birthday in those weeks can belong to the Tiger. The reverse also holds: a Capricorn born in early January 2000, 2012 or 2024 arrived before that year’s lunar New Year and is still a Rabbit.

## roseate-spoonbill

1. **Source:** s14, s15, s16 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">鹮</span>
   - AFTER: <span class="rail__han" aria-hidden="true">粉紅琵鷺</span>
2. **Source:** s14, s15, s16 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="鹮" aria-label="Hear 鹮, huán"
   - AFTER: data-say="粉紅琵鷺" aria-label="Hear 粉紅琵鷺, fěnhóng pílù"
3. **Source:** s14, s15, s16 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">huán</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">fěnhóng pílù</span>
4. **Source:** s14, s15, s16 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">鹮</span>
   - AFTER: <span class="serial-han">粉紅琵鷺</span>
5. **Source:** s14, s15, s16 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">鹮</span><span class="py" lang="zh-Latn-pinyin">huán</span>
   - AFTER: <span class="h" lang="zh">粉紅琵鷺</span><span class="py" lang="zh-Latn-pinyin">fěnhóng pílù</span>
6. **Source:** s14, s15, s16 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "鹮"
   - AFTER: "animalHan": "粉紅琵鷺"
7. **Source:** s14, s15, s16 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "huán"
   - AFTER: "animalHanPy": "fěnhóng pílù"
8. **Source:** s5, s10
   - BEFORE: turns pink or fades to pale white depending entirely on its diet,
   - AFTER: takes its pink from the food it eats,
9. **Source:** s5, s9, s10, s8 (poor-diet paling unsourced)
   - BEFORE: in the crustaceans it eats; birds on a poor diet grow paler, and the color fades without the right food.
   - AFTER: in the crustaceans and other prey it eats; how deep the pink runs varies with age, breeding condition and region.
10. **Source:** s6, s9
   - BEFORE: to filter prey by touch rather than sight.
   - AFTER: catching prey mostly by touch and snapping the bill shut when something brushes it.
11. **Source:** s5, s7, s10 (comparison unsourced)
   - BEFORE: as they mature, a trait shared with several long-lived wading birds and unusual among more heavily feathered relatives.
   - AFTER: as they mature; young birds keep a feathered white head.

## rock-wren

1. **Source:** s12, s14, s15 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">鹪</span>
   - AFTER: <span class="rail__han" aria-hidden="true">岩鷦鷯</span>
2. **Source:** s12, s14, s15 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="鹪" aria-label="Hear 鹪, jiāo"
   - AFTER: data-say="岩鷦鷯" aria-label="Hear 岩鷦鷯, yán jiāoliáo"
3. **Source:** s12, s14, s15 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">jiāo</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">yán jiāoliáo</span>
4. **Source:** s12, s14, s15 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">鹪</span>
   - AFTER: <span class="serial-han">岩鷦鷯</span>
5. **Source:** s12, s14, s15 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">鹪</span><span class="py" lang="zh-Latn-pinyin">jiāo</span>
   - AFTER: <span class="h" lang="zh">岩鷦鷯</span><span class="py" lang="zh-Latn-pinyin">yán jiāoliáo</span>
6. **Source:** s12, s14, s15 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "鹪"
   - AFTER: "animalHan": "岩鷦鷯"
7. **Source:** s12, s14, s15 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "jiāo"
   - AFTER: "animalHanPy": "yán jiāoliáo"
8. **Source:** s5 (camouflage function and heard-first claim unsourced)
   - BEFORE: more often heard across a canyon than seen against the stone it matches almost exactly.
   - AFTER: with a ringing voice and plumage close to the color of the stone.
9. **Source:** s6, s7, s5
   - BEFORE: forages by testing crevices it cannot see into,
   - AFTER: forages by probing crevices among the rocks,
10. **Source:** s5, s6, s7
   - BEFORE: a construction behavior that is highly unusual among birds and can involve dozens of individually placed stones.
   - AFTER: and one study found nests averaging about 230 stones, each one about a fifth of the bird's own weight.
11. **Source:** s5
   - BEFORE: , and it blends closely into the rock it lives on, so the bird is usually noticed first by its loud, ringing song rather than by sight.
   - AFTER: , close in tone to the rock it lives on, and its song is loud and ringing.
12. **Source:** s5, s6, s7 (ranking unsourced)
   - BEFORE: The Rock Wren is among the passerine species <b>most tightly associated with cliff and rock habitat</b>, nesting almost exclusively on canyon walls, boulder fields, talus slopes, and other exposed rocky ground that few other songbirds use.
   - AFTER: The Rock Wren is a bird of <b>rocky, thinly vegetated ground</b>, from below sea level to the alpine zone, nesting in canyon walls, boulder fields and talus slopes, and also in rock piles, quarries and old mines.
13. **Source:** s6, s7, s5
   - BEFORE: for insects and spiders it cannot see into before it commits its bill to the gap.
   - AFTER: for insects and the occasional spider.
14. **Source:** s7, s5
   - BEFORE: Rock Wrens breeding at high elevation or in the northern part of the range <b>largely withdraw to lower or more southern ground for winter</b>, while populations on milder terrain stay put year-round, so the species is neither a true migrant nor a true resident.
   - AFTER: Rock Wrens from the northern part of the range <b>migrate south for the winter</b>, often to low rocky ground, while southern populations stay all year, which makes the species a partial migrant.
15. **Source:** s5
   - BEFORE: Male Rock Wrens sing an unusually large and varied repertoire, cycling through <b>many distinct song phrases rather than repeating just one</b> before switching, often for extended bouts from an exposed perch.
   - AFTER: Male Rock Wrens carry a large repertoire of <b>69 to 119 song syllables</b>, usually singing each one a few times before moving on to the next, often for extended bouts from an exposed perch.

## Not applied

- mountain-pygmy-possum header glyph 鼠 shǔ: audit verdict WRONG (鼠 means rat or mouse, the zodiac Rat glyph, on a Rabbit-year page), but the dossier found no sourced Chinese name for Burramys parvus; 山侏儒袋貂 is flagged as unverified. Kept 鼠 shǔ on instruction; needs a Chinese-reading editor with a zoological dictionary.
- mountain-pygmy-possum: Sea Otter match (audit WEAK, Cancer opposes Capricorn) is a match choice, not a fact; left. Trait titles ("The six-month sleep", "The re-measured den", "The ten-kilometre world") left as readings. The Rabbit/Tiger Lunar New Year note lives in renderer copy, so the added sentence is HTML only.
- narwhal: Lunar New Year note (audit MISSING, minor) not added. Calf colour (sources differ) left as "grey-brown" per the audit's OK. Trait title "Pod Loyalty" and reading lines about a close, selective pod left as readings. Account modal "renewed with each new moon" is site-wide renderer copy, not the power phase; left.
- narwhal moon: the page's own data (Dossier stat "Power phase: Waxing Gibbous", moon dial, ritual, calendar button, power dates, moon route) uses Waxing Gibbous throughout. Only the Psychic Reading's lucky-window paragraph said waning crescent; it was rewritten to the waxing gibbous (HTML only; the template has no such string), and its "Traditionally" claim became our own reading.
- sandgrouse: trait 3 title "Thousands, arriving at exactly the same time" and the openness axis (flocks in the thousands) are supported (Ward 1972 via s5, s15); left. The "distance" theme in readings now rests on about 30 km each way. Adaptability axis "scorching days and freezing nights" left (not audited as wrong). Proverb 千里送鵝毛 qiān lǐ sòng é máo is real (s19); unchanged.
- roseate-spoonbill: the "colour fades on a thin diet" image runs through readings, careers, the palette and the bonds copy; only the fact line and the overture frame were corrected; readings left as readings. Plume-hunting recovery line (audit OK, nuance) left. Template v2 and page HTML were modified at 03:54 to 03:55, shortly before this pass; edits were applied on top of that version.
- rock-wren: overture title "the singer stays pressed flat against the rock, unseen" and the perception axis line about cracks "it cannot see into" left as reading imagery. Trait titles ("The cliff-bound range", "The unseen crevice") left.
- Purple Star: audit OK on all five pages; no traditional-pairing claim found, so nothing changed.
- Remaining em dashes in untouched copy are a page bug outside this pass; the replaced lines carry none.

## Structure check

Section counts match backups (sandgrouse 31/31, narwhal 32/32, mountain-pygmy-possum 31/31, roseate-spoonbill 31/31, rock-wren 31/31). All JSON-LD and application/json blocks parse (4 per page). HTML start-tag skeleton identical to backup on all five. Every edited page parses with python html.parser. Template JSON (v2 for sandgrouse, narwhal, roseate-spoonbill; v1 for mountain-pygmy-possum, rock-wren) loads and keysets are unchanged. `<!--w4-reading-->` is not present on any of the five pages. No CSS, JS or other page touched. "Related Animals" explore cards untouched. No git run. No old header glyph (飛, 独角鲸, 鹮, 鹪) remains on the four re-glyphed pages; no "waning crescent" remains on the narwhal page.

## Final header characters

| Page | Header hanzi | Pinyin |
|---|---|---|
| sandgrouse | 沙雞 | shājī |
| narwhal | 獨角鯨 | dújiǎojīng |
| mountain-pygmy-possum | 鼠 (unchanged, no sourced species name) | shǔ |
| roseate-spoonbill | 粉紅琵鷺 | fěnhóng pílù |
| rock-wren | 岩鷦鷯 | yán jiāoliáo |
