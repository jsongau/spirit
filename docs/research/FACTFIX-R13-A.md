# FACTFIX-R13-A change log

Date: 2026-11-08. Pages: springbok, kookaburra, sable-antelope, snow-petrel, ringtail.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`, which matches it). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). Where a string occurred more than once in a file every occurrence was replaced (counts noted). All five pages have v1 and v2.
Backups of the original pages: `~/factfix-backup-r13a/<slug>.html`; original template JSON in `~/factfix-backup-r13a/tpl/v1/` and `~/factfix-backup-r13a/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site. Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. `tools/han-pinyin.json` updated for the five changed headers (fresh read-modify-write at the end, only these five keys touched).
Purple Star: all five pages carried the "read for the <crossing> it keeps landing on the same two" lead plus "tends to" star lines. Reworded as Zodi Animal's own reading with the sentences used in R12-B ("and Zodi Animal reads the <crossing> through two of them", "In our reading ...", "That is our outline for the <crossing>"). All five already had the honest fine print; kept. Star labels not touched. Where a reworded star line showed 命宮 with no pinyin, (mìng gōng) was added.

## springbok

1. **Source:** zhwiki-tiaoling (header: 羚 líng replaced by the Chinese name 跳羚 tiàolíng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">羚</span>
   - AFTER: <span class="rail__han" aria-hidden="true">跳羚</span>
2. **Source:** zhwiki-tiaoling (header: 羚 líng replaced by the Chinese name 跳羚 tiàolíng; count: HTML x2) [HTML]
   - BEFORE: data-say="羚" aria-label="Hear 羚, líng"
   - AFTER: data-say="跳羚" aria-label="Hear 跳羚, tiàolíng"
3. **Source:** zhwiki-tiaoling (header: 羚 líng replaced by the Chinese name 跳羚 tiàolíng) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">líng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">tiàolíng</span>
4. **Source:** zhwiki-tiaoling (header: 羚 líng replaced by the Chinese name 跳羚 tiàolíng) [HTML]
   - BEFORE: <span class="serial-han">羚</span>
   - AFTER: <span class="serial-han">跳羚</span>
5. **Source:** zhwiki-tiaoling (header: 羚 líng replaced by the Chinese name 跳羚 tiàolíng) [HTML]
   - BEFORE: <span class="h" lang="zh">羚</span><span class="py" lang="zh-Latn-pinyin">líng</span>
   - AFTER: <span class="h" lang="zh">跳羚</span><span class="py" lang="zh-Latn-pinyin">tiàolíng</span>
6. **Source:** wiki-springbok (OK verdict, but 'head down' is not in the source; cut) [HTML + v1 + v2]
   - BEFORE: off the ground at once, head down, back arched,
   - AFTER: off the ground at once, back arched,
7. **Source:** wiki-springbok, wiki-antelope (PARTLY UNVERIFIABLE: 50 km/h over about 6 km unsourced, cut; fast-twitch fibres sourced) [HTML + v1 + v2]
   - BEFORE: in a short sprint and hold near 50 kilometers per hour over about six kilometers, speed drawn from fast-burning muscle fuel rather than long endurance.
   - AFTER: in a short sprint, on muscle rich in fast-twitch fibers, built for speed rather than long endurance.
8. **Source:** wiki-springbok, fw-trek (UNVERIFIABLE 'days to pass a single point' (eyewitness says about an hour); treks drought-driven, ended in the 1890s by hunting, rinderpest, fencing and sheep farms) [HTML + v1 + v2]
   - BEFORE: Before fencing and farmland reshaped the region in the late 1800s, springbok formed <b>trekbokken</b>, seasonal mass migrations that could number in the millions and take days to pass a single point,
   - AFTER: Until hunting, the rinderpest of 1896 and 1897, and fenced sheep farms ended them in the 1890s, springbok formed <b>trekbokken</b>, drought-driven mass migrations that could number in the millions and stretch hundreds of kilometers,
9. **Source:** fw-trek (axis read (rootedness): treks ended by hunting, disease and fencing, not fencing alone) [HTML + v1 + v2]
   - BEFORE: Before fencing changed the land, springbok herds followed the rain
   - AFTER: Before hunting, disease and fencing ended the great treks, springbok herds followed the rain
10. **Source:** wiki-springbok, wiki-antelope (WRONG: in most antelope species both sexes carry horns; comparison cut) [HTML + v1 + v2]
   - BEFORE: long, unusual among African antelope, where horns are more often carried by males alone.
   - AFTER: long.
11. **Source:** brief (Purple Star lead: no traditional basis for a sign plus year star pairing) [HTML + v2]
   - BEFORE: and read for the Aries Rabbit crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Aries Rabbit crossing through two of them.
12. **Source:** brief (Purple Star: tendency claim made our reading) [HTML + v2]
   - BEFORE: For an Aries born in the Rabbit year, the Sun star tends to sit high and bright in the chart.
   - AFTER: In our reading for an Aries born in the Rabbit year, the Sun star sits high and bright.
13. **Source:** brief (Purple Star: tendency claim made our reading; pinyin added to 命宮) [HTML + v2]
   - BEFORE: Near the Life palace, 命宮, a chart built like this one tends to carry the general star,
   - AFTER: In our reading, the Life palace, 命宮 (mìng gōng), sits near the general star,
14. **Source:** brief (Purple Star close: tendency claim made our reading) [HTML + v2]
   - BEFORE: That is the outline the Aries Rabbit tends to share.
   - AFTER: That is our outline for the Aries Rabbit crossing.
   - Template: animalHan "羚" to "跳羚", animalHanPy "líng" to "tiàolíng" (v1 + v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## kookaburra

1. **Source:** zhwiki-xcn (header: 翠 cuì replaced by the Chinese name 笑翠鳥 xiàocuìniǎo) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">翠</span>
   - AFTER: <span class="rail__han" aria-hidden="true">笑翠鳥</span>
2. **Source:** zhwiki-xcn (header: 翠 cuì replaced by the Chinese name 笑翠鳥 xiàocuìniǎo; count: HTML x2) [HTML]
   - BEFORE: data-say="翠" aria-label="Hear 翠, cuì"
   - AFTER: data-say="笑翠鳥" aria-label="Hear 笑翠鳥, xiàocuìniǎo"
3. **Source:** zhwiki-xcn (header: 翠 cuì replaced by the Chinese name 笑翠鳥 xiàocuìniǎo) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">cuì</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">xiàocuìniǎo</span>
4. **Source:** zhwiki-xcn (header: 翠 cuì replaced by the Chinese name 笑翠鳥 xiàocuìniǎo) [HTML]
   - BEFORE: <span class="serial-han">翠</span>
   - AFTER: <span class="serial-han">笑翠鳥</span>
5. **Source:** zhwiki-xcn (header: 翠 cuì replaced by the Chinese name 笑翠鳥 xiàocuìniǎo) [HTML]
   - BEFORE: <span class="h" lang="zh">翠</span><span class="py" lang="zh-Latn-pinyin">cuì</span>
   - AFTER: <span class="h" lang="zh">笑翠鳥</span><span class="py" lang="zh-Latn-pinyin">xiàocuìniǎo</span>
6. **Source:** wiki-lk, wiki-kook, ausmus (loose: 'almost none of its life near water'; sources say it rarely hunts in water or eats fish) [HTML + v1 + v2]
   - BEFORE: that spends almost none of its life anywhere near water.
   - AFTER: that rarely hunts in water.
7. **Source:** wiki-lk, ausmus (UNVERIFIABLE 'taught by the breeding pair'; Wikipedia says the song is learned) [HTML + v1 + v2]
   - BEFORE: and is a <b>learned behavior taught to young birds by the breeding pair</b> rather than an instinctive sound.
   - AFTER: and is a <b>learned song that young birds pick up</b> rather than a wholly instinctive sound.
8. **Source:** wiki-lk, ausmus (UNVERIFIABLE 'over a metre'; Wikipedia: venomous snakes much longer than its body) [HTML + v1 + v2]
   - BEFORE: including snakes over a metre long, some of them venomous.
   - AFTER: including snakes much longer than its own body, some of them venomous.
9. **Source:** wiki-lk (axis read (adaptability): 'over a metre' unsourced) [HTML + v1 + v2]
   - BEFORE: and snakes over a metre long,
   - AFTER: and snakes much longer than its own body,
10. **Source:** ausmus, wiki-kook (UNVERIFIABLE skull ridge and 'headfirst'; only larger prey is bashed, small prey swallowed whole) [HTML + v1 + v2]
   - BEFORE: A kookaburra kills or subdues prey by <b>gripping it in its beak and repeatedly striking it against a branch or the ground</b>, aided by a bony ridge at the back of the skull and strong neck muscles built for the impact, before swallowing it whole, headfirst.
   - AFTER: A kookaburra kills or subdues larger prey by <b>gripping it in its beak and repeatedly striking it against a branch or the ground</b>, then swallows it whole; small prey goes down whole without the beating.
11. **Source:** sciencenews-legge, wiki-lk (trait title: adult bill-sparring unsourced; rank is settled among nestlings) [HTML]
   - BEFORE: >The sparring match<
   - AFTER: >The pecking order<
12. **Source:** sciencenews-legge, wiki-lk (template trait name, same retitle) [v1 + v2]
   - BEFORE: "name": "The sparring match"
   - AFTER: "name": "The pecking order"
13. **Source:** sciencenews-legge, wiki-lk (UNVERIFIABLE adult bill-gripping sparring, and 'rarely escalates' runs against the record; replaced with Legge (2000) siblicide finding) [HTML + v1 + v2]
   - BEFORE: Within a family group, kookaburras establish a <b>dominance order through ritualized sparring</b>, gripping bills and twisting until one bird yields the perch or flies off, a contest that rarely escalates beyond the display.
   - AFTER: In a kookaburra family, <b>rank is settled early, in the nest</b>: older chicks attack the youngest with the hook on the bill, and in one study the youngest died in about a third of nests.
14. **Source:** sciencenews-legge (reading under corrected fact (rank settled early, not by adult display)) [HTML + v1 + v2]
   - BEFORE: You settle rank the way your family does: briefly, physically, in full view, and then it's over.
   - AFTER: You settle rank the way your family does: early, in full view, and then it's over.
15. **Source:** wiki-lk, ausmus (WRONG: tree nests are natural hollows, not excavated; only termite-mound nests are dug) [HTML + v1 + v2]
   - BEFORE: nesting in an unlined hollow they excavate into a living or dead tree, or bore directly into an aerial termite mound using the beak alone.
   - AFTER: nesting in a bare natural hollow in a living or dead tree, or in a chamber they bore into an aerial termite mound.
16. **Source:** wiki-lk, ausmus (reading built on the tree-boring claim; rebuilt on the year-round territory) [HTML + v2]
   - BEFORE: the way a kookaburra bores its nest straight into the tree it has already picked instead of hunting for an easier trunk.
   - AFTER: the way a kookaburra pair keeps the same territory all year instead of hunting for easier ground.
17. **Source:** brief (Purple Star lead: no traditional basis for a sign plus year star pairing) [HTML + v2]
   - BEFORE: and read for the Aries Monkey crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Aries Monkey crossing through two of them.
18. **Source:** brief (Purple Star: tendency claim made our reading) [HTML + v2]
   - BEFORE: For an Aries born in the Monkey year, Purple Star tends to seat the Sun star bright and close to the center of the chart.
   - AFTER: In our reading for an Aries born in the Monkey year, the Sun star sits bright and close to the center of the chart.
19. **Source:** brief (Purple Star: chart claim made our reading) [HTML + v2]
   - BEFORE: What the chart tends to confirm is what you already suspected:
   - AFTER: What our reading points to is what you already suspected:
20. **Source:** brief (Purple Star: tendency claim made our reading) [HTML + v2]
   - BEFORE: Close beside it, Purple Star tends to place the Gate star,
   - AFTER: Close beside it, our reading places the Gate star,
21. **Source:** brief (Purple Star: chart claim made our reading) [HTML + v2]
   - BEFORE: What the chart tends to confirm is the shape of the whole reading:
   - AFTER: What our reading points to is the shape of the whole reading:
22. **Source:** brief (Purple Star close: placement claim made our reading) [HTML + v2]
   - BEFORE: A Sun this bright and a Gate this talkative sit easily in the same chart,
   - AFTER: In our reading, a Sun this bright and a Gate this talkative sit easily in the same chart,
   - Template: animalHan "翠" to "笑翠鳥", animalHanPy "cuì" to "xiàocuìniǎo" (v1 + v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## sable-antelope

1. **Source:** s11 (header: 羚 líng replaced by the Chinese name 黑馬羚 hēimǎlíng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">羚</span>
   - AFTER: <span class="rail__han" aria-hidden="true">黑馬羚</span>
2. **Source:** s11 (header: 羚 líng replaced by the Chinese name 黑馬羚 hēimǎlíng; count: HTML x2) [HTML]
   - BEFORE: data-say="羚" aria-label="Hear 羚, líng"
   - AFTER: data-say="黑馬羚" aria-label="Hear 黑馬羚, hēimǎlíng"
3. **Source:** s11 (header: 羚 líng replaced by the Chinese name 黑馬羚 hēimǎlíng) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">líng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">hēimǎlíng</span>
4. **Source:** s11 (header: 羚 líng replaced by the Chinese name 黑馬羚 hēimǎlíng) [HTML]
   - BEFORE: <span class="serial-han">羚</span>
   - AFTER: <span class="serial-han">黑馬羚</span>
5. **Source:** s11 (header: 羚 líng replaced by the Chinese name 黑馬羚 hēimǎlíng) [HTML]
   - BEFORE: <span class="h" lang="zh">羚</span><span class="py" lang="zh-Latn-pinyin">líng</span>
   - AFTER: <span class="h" lang="zh">黑馬羚</span><span class="py" lang="zh-Latn-pinyin">hēimǎlíng</span>
6. **Source:** s5, s6, s7 (WRONG bull range (sources give about 80 to 165 cm); 'most antelope reserve horns for males' unsourced, softened to 'unlike many antelope') [HTML + v1 + v2]
   - BEFORE: <b>most antelope species reserve horns for males alone, but the sable arms both sexes</b>. A mature bull's horns run 130 to 165 centimetres;
   - AFTER: <b>unlike many antelope, the sable arms both sexes</b>. A mature bull's horns run about 80 to 165 centimetres;
7. **Source:** s5, s6, s7, s9 (WRONG context: sable kneel only in male horn-wrestling fights; predator defense is lowered horns, feints and stabs, turning to fight) [HTML + v1 + v2]
   - BEFORE: When a serious threat closes the distance, a sable antelope drops onto its carpal joints, its functional 'knees', and sweeps its horns low and sideways rather than staying upright and running; <b>the same low, horns-forward posture appears in male dominance fights and in genuine predator defense</b>.
   - AFTER: When two bulls fight, each drops onto its carpal joints, its functional 'knees', and the rivals wrestle with their horns held low; <b>against a predator the sable stays on its feet, lowering its horns to feint and stab, and turns to fight rather than flee</b>.
8. **Source:** s5, s6, s9 (trait title: 'a lion learns to skip' unsourced; ADW says lions seldom attack adults) [HTML]
   - BEFORE: >The stand a lion learns to skip<
   - AFTER: >The stand lions seldom test<
9. **Source:** s5, s6, s9 (template trait name, same retitle) [v1 + v2]
   - BEFORE: "name": "The stand a lion learns to skip"
   - AFTER: "name": "The stand lions seldom test"
10. **Source:** s5, s6, s9 (UNVERIFIABLE: no documented sable-kills-lion case; Wikipedia says some predators have died in fights) [HTML + v1 + v2]
   - BEFORE: and there are documented cases of a cornered sable wounding or killing an attacking lion outright.
   - AFTER: and some predators have died in fights with them.
11. **Source:** s5, s6 (axis read (rootedness, signature): 'the few that try often meet horns' unsourced; ADW lions seldom attack adults; turns to fight (s5)) [HTML + v1 + v2]
   - BEFORE: Lions rarely press an attack on a healthy adult sable, and the few that try often meet horns instead of an easy chase, because the antelope holds instead of running.
   - AFTER: Lions seldom attack a healthy adult sable, which tends to turn and fight instead of running.
12. **Source:** s5, s6 (small fix: calves under two months are light tan) [HTML + v1 + v2]
   - BEFORE: Sable calves and young adults of both sexes share a similar chestnut-brown coat;
   - AFTER: Sable calves are born light tan, and young animals of both sexes then share a chestnut-brown coat;
13. **Source:** s5, s6, s7 (UNVERIFIABLE 'low-intensity displays' and 'bull does not run the order' (Wikipedia and Ultimate Ungulate say herds are led by a male); rank follows seniority (ADW)) [HTML + v1 + v2]
   - BEFORE: keep a rank order maintained mostly through small, low-intensity displays; <b>the single territorial bull defends the herd's ground, but does not run the herd's actual order</b>.
   - AFTER: live with one dominant bull, and <b>rank among the females follows seniority</b>.
14. **Source:** s6 (axis read (perception): 'low-intensity displays' unsourced) [HTML + v1 + v2]
   - BEFORE: Female sable keep a hierarchy maintained mostly through small, low-intensity displays, correctly read and rarely escalated.
   - AFTER: Female sable keep a rank order that follows seniority.
15. **Source:** s6 (ADW's two-mile line softened) [HTML + v1 + v2]
   - BEFORE: staying within roughly two miles of water.
   - AFTER: usually staying within about two miles of water.
16. **Source:** s5, s6, s7 (reading copy states a false fact (kneeling to face a lion); kneeling is for rivals) [HTML + v1 + v2]
   - BEFORE: the way a sable meets a lion by dropping onto its knees and turning to face it rather than running.
   - AFTER: the way a sable bull drops onto its knees to meet a rival head on rather than running.
17. **Source:** s5, s6, s9 (overview frame states the false kneel-to-predator fact; predator defense is lowered horns, turning to fight) [HTML + v1 + v2]
   - BEFORE: that meets a real threat by dropping low and turning its horns into a wall rather than turning its back.
   - AFTER: that meets a real threat by lowering its horns and turning to fight rather than turning its back.
18. **Source:** s12 (Purple Star lead: no traditional basis for a sign plus year star pairing) [HTML + v2]
   - BEFORE: and read for the Taurus Tiger crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Taurus Tiger crossing through two of them.
19. **Source:** s12 (Purple Star: tendency claim made our reading) [HTML + v2]
   - BEFORE: For a Taurus born in the Tiger year, this star tends to sit close to the Life palace,
   - AFTER: In our reading for a Taurus born in the Tiger year, this star sits close to the Life palace,
20. **Source:** s6 (Purple Star body: 'narrow band' in ADW is grazing height, not one stretch of ground; 'same stretch day after day' unsourced) [HTML + v2]
   - BEFORE: It works a narrow band of young growth near the tree line, the same stretch, day after day, because
   - AFTER: It keeps to young grass near the woodland edge, taking only the leaf, because
21. **Source:** s6, s9 (Purple Star body: kneeling against predators false; 'rarely tested twice' unsourced) [HTML + v2]
   - BEFORE: the drop low and the horns swung sideways, a response so complete that a healthy adult is rarely tested twice.
   - AFTER: the horns lowered to feint and stab, one reason lions seldom attack a healthy adult.
22. **Source:** s12 (Purple Star close: chart claim made our reading) [HTML + v2]
   - BEFORE: sitting close together in the Taurus Tiger chart.
   - AFTER: sitting close together in our reading of the Taurus Tiger crossing.
   - Template: animalHan "羚" to "黑馬羚", animalHanPy "líng" to "hēimǎlíng" (v1 + v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## snow-petrel

1. **Source:** s12 (header: 雪 xuě replaced by the Chinese name 雪鸌 xuěhù) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">雪</span>
   - AFTER: <span class="rail__han" aria-hidden="true">雪鸌</span>
2. **Source:** s12 (header: 雪 xuě replaced by the Chinese name 雪鸌 xuěhù; count: HTML x2) [HTML]
   - BEFORE: data-say="雪" aria-label="Hear 雪, xuě"
   - AFTER: data-say="雪鸌" aria-label="Hear 雪鸌, xuěhù"
3. **Source:** s12 (header: 雪 xuě replaced by the Chinese name 雪鸌 xuěhù) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">xuě</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">xuěhù</span>
4. **Source:** s12 (header: 雪 xuě replaced by the Chinese name 雪鸌 xuěhù) [HTML]
   - BEFORE: <span class="serial-han">雪</span>
   - AFTER: <span class="serial-han">雪鸌</span>
5. **Source:** s12 (header: 雪 xuě replaced by the Chinese name 雪鸌 xuěhù) [HTML]
   - BEFORE: <span class="h" lang="zh">雪</span><span class="py" lang="zh-Latn-pinyin">xuě</span>
   - AFTER: <span class="h" lang="zh">雪鸌</span><span class="py" lang="zh-Latn-pinyin">xuěhù</span>
6. **Source:** s5, s6 (Prince Charles Mountains attribution rests on one Wikipedia reference; NZ Birds names the Theron Mountains, up to 440 km inland) [HTML + v1 + v2]
   - BEFORE: <b>more than 400 kilometers inland from the open sea</b>, in the southern Prince Charles Mountains.
   - AFTER: <b>more than 400 kilometers inland from the open sea</b>, in the Theron Mountains as far as 440 kilometers.
7. **Source:** s6 (OK (inference), but both parents share chick care) [HTML + v1 + v2]
   - BEFORE: return with a meal for a single waiting chick.
   - AFTER: return with a meal for a single waiting chick, a job both parents share.
8. **Source:** s5, s6 (soften number: Wikipedia gives faithful for life, around 20 years) [HTML + v1 + v2]
   - BEFORE: a bond that can span two decades or more,
   - AFTER: a bond that can last around 20 years,
9. **Source:** s7, s8 (WRONG: individual nests used up to about 6,000 years; oldest deposit about 34,000 years; most sites Holocene; not continuous for tens of thousands of years) [HTML + v1 + v2]
   - BEFORE: have been used <b>continuously for tens of thousands of years</b>, one generation returning to the last generation's exact crevice.
   - AFTER: have been used <b>for more than 6,000 years</b>, and the oldest deposit is about 34,000 years old.
10. **Source:** s7, s8 (axis read (adaptability): 'continuous use for tens of thousands of years' wrong) [HTML + v1 + v2]
   - BEFORE: some documented in continuous use for tens of thousands of years.
   - AFTER: some in use for more than 6,000 years.
11. **Source:** s7, s8 (axis read (rootedness, signature): 'same nunataks for tens of thousands of years' wrong) [HTML + v1 + v2]
   - BEFORE: and their colonies have occupied the same nunataks for tens of thousands of years.
   - AFTER: and some of their nest sites have been in use for more than 6,000 years.
12. **Source:** s5, s6 (UNVERIFIABLE superlative 'one of the purest-white birds recorded'; cut) [HTML + v1 + v2]
   - BEFORE: <b>near-total camouflage against snow and ice</b>, making it one of the purest-white birds recorded.
   - AFTER: <b>near-total camouflage against snow and ice</b>.
13. **Source:** s14 (Purple Star lead: no traditional basis for a sign plus year star pairing) [HTML + v2]
   - BEFORE: and read for the Taurus Goat crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Taurus Goat crossing through two of them.
14. **Source:** s14 (Purple Star: tendency claim made our reading; pinyin added to 命宮) [HTML + v2]
   - BEFORE: For a Taurus born in the Goat year, the Storehouse star tends to sit close to the Life palace, 命宮.
   - AFTER: In our reading for a Taurus born in the Goat year, the Storehouse star sits close to the Life palace, 命宮 (mìng gōng).
15. **Source:** s14 (Purple Star: claim made our reading) [HTML + v2]
   - BEFORE: What Purple Star already suspects about you is
   - AFTER: What our reading suspects about you is
16. **Source:** s14 (Purple Star: tendency claim made our reading) [HTML + v2]
   - BEFORE: Near the palace that governs how you meet friction, Purple Star tends to place the gentle star,
   - AFTER: Near the palace that governs how you meet friction, our reading places the gentle star,
17. **Source:** s14 (Purple Star close: tendency claim made our reading) [HTML + v2]
   - BEFORE: That is the outline the Taurus Goat tends to share.
   - AFTER: That is our outline for the Taurus Goat crossing.
   - Template: animalHan "雪" to "雪鸌", animalHanPy "xuě" to "xuěhù" (v1 + v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## ringtail

1. **Source:** s14, s15 (header: 貍 lí replaced by the Chinese name 蓬尾浣熊 péngwěi huànxióng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">貍</span>
   - AFTER: <span class="rail__han" aria-hidden="true">蓬尾浣熊</span>
2. **Source:** s14, s15 (header: 貍 lí replaced by the Chinese name 蓬尾浣熊 péngwěi huànxióng; count: HTML x2) [HTML]
   - BEFORE: data-say="貍" aria-label="Hear 貍, lí"
   - AFTER: data-say="蓬尾浣熊" aria-label="Hear 蓬尾浣熊, péngwěi huànxióng"
3. **Source:** s14, s15 (header: 貍 lí replaced by the Chinese name 蓬尾浣熊 péngwěi huànxióng) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">lí</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">péngwěi huànxióng</span>
4. **Source:** s14, s15 (header: 貍 lí replaced by the Chinese name 蓬尾浣熊 péngwěi huànxióng) [HTML]
   - BEFORE: <span class="serial-han">貍</span>
   - AFTER: <span class="serial-han">蓬尾浣熊</span>
5. **Source:** s14, s15 (header: 貍 lí replaced by the Chinese name 蓬尾浣熊 péngwěi huànxióng) [HTML]
   - BEFORE: <span class="h" lang="zh">貍</span><span class="py" lang="zh-Latn-pinyin">lí</span>
   - AFTER: <span class="h" lang="zh">蓬尾浣熊</span><span class="py" lang="zh-Latn-pinyin">péngwěi huànxióng</span>
6. **Source:** s4, s6, s7, s8, s11 (WRONG: ADW, Desert Museum, UA Extension and Texas Monthly give 180 degrees; only Wikipedia says 'over') [HTML + v1 + v2]
   - BEFORE: The Ringtail's hind ankle can rotate <b>more than 180 degrees</b>,
   - AFTER: The Ringtail can turn its hind feet <b>around 180 degrees</b>,
7. **Source:** s4, s6, s7 (axis read (perception): 'more than 180 degrees' overstated) [HTML + v1 + v2]
   - BEFORE: a hind ankle that rotates more than 180 degrees means
   - AFTER: hind feet that turn around 180 degrees mean
8. **Source:** s5 (cartwheel turn appears only in Wikipedia; kept soft) [HTML + v1 + v2]
   - BEFORE: and the Ringtail can reverse direction on a slim foothold by cartwheeling around it.
   - AFTER: and the Ringtail is reported to reverse direction on a slim foothold by cartwheeling around it.
9. **Source:** s6, s5, s4 (WRONG mechanism: chimney stemming is all four feet on one wall and the back on the other; ricocheting correct) [HTML + v1 + v2]
   - BEFORE: <b>stem</b>, pressing their feet against opposite walls, or ricochet between them in wider gaps,
   - AFTER: <b>stem</b>, pressing all four feet against one wall and the back against the other, or ricochet between the walls in wider gaps,
10. **Source:** s4, s8, s6 (UNVERIFIABLE warm box by the stove (cut); sources say settlers and prospectors kept them as mousers) [HTML + v1 + v2]
   - BEFORE: Ringtails moved into cabins and mine shafts to hunt the rodents drawn by stored food, and miners sometimes left them a warm box near the stove, giving rise to the name
   - AFTER: settlers and prospectors kept Ringtails in their cabins and camps to hunt the rodents drawn by stored food, giving rise to the name
11. **Source:** s7, s5 (trait title rested on the unverified concentrated-urine claim) [HTML]
   - BEFORE: >The concentrated water<
   - AFTER: >The water in the fruit<
12. **Source:** s7, s5 (template trait name, same retitle) [v1 + v2]
   - BEFORE: "name": "The concentrated water"
   - AFTER: "name": "The water in the fruit"
13. **Source:** s5, s7 (UNVERIFIABLE: concentrated-urine superlative only in Wikipedia, no primary study opened; UA Extension says fruit may reduce its need for water) [HTML + v1 + v2]
   - BEFORE: can survive largely on <b>water obtained from their food alone</b>, aided by urine more concentrated than that of almost any other mammal studied, an adaptation that lets them go long stretches without a standing water source.
   - AFTER: get much of their water from what they eat, and <b>prickly pear and other fruit may reduce their need to drink</b>.
14. **Source:** s4, s13 (WRONG 'strictly': mostly at night, occasionally at dusk) [HTML + v1 + v2]
   - BEFORE: <b>strictly nocturnal and largely solitary</b>
   - AFTER: <b>mostly nocturnal and largely solitary</b>
15. **Source:** s12 ('shared' latrines not stated; Barja and List 2006 say reused) [HTML + v1 + v2]
   - BEFORE: scent marks left at shared latrine sites
   - AFTER: scent marks left at latrine sites they reuse
16. **Source:** s16 (Purple Star lead: no traditional basis for a sign plus year star pairing) [HTML + v2]
   - BEFORE: and read for the Taurus Monkey crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Taurus Monkey crossing through two of them.
17. **Source:** s16 (Purple Star: Life palace placement made our reading; pinyin added to 命宮) [HTML + v2]
   - BEFORE: Sitting in the Life palace, 命宮, it tends to describe someone
   - AFTER: In our reading it sits in the Life palace, 命宮 (mìng gōng), and describes someone
18. **Source:** s16 (Purple Star close: chart claim made our reading) [HTML + v2]
   - BEFORE: Taken together, the storehouse and the navigator describe a chart built
   - AFTER: Taken together in our reading, the storehouse and the navigator describe a chart built
   - Template: animalHan "貍" to "蓬尾浣熊", animalHanPy "lí" to "péngwěi huànxióng" (v1 + v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## Header check

- springbok: 羚 líng (antelope or gazelle in general) to 跳羚 tiàolíng, "leaping antelope" (zhwiki-tiaoling).
- kookaburra: 翠 cuì (kingfisher green) to 笑翠鳥 xiàocuìniǎo, "laughing kingfisher" (zhwiki-xcn; dossier spaces it xiào cuì niǎo, written here as one word like R12-B's xuánbìquè).
- sable-antelope: 羚 líng to 黑馬羚 hēimǎlíng, "black horse antelope" (s11; dossier spaces it hēi mǎ líng).
- snow-petrel: 雪 xuě (snow) to 雪鸌 xuěhù (s12; dossier spaces it xuě hù; 鸌 hù is the shearwater and fulmar petrel character).
- ringtail: 貍 lí (fox, raccoon dog) to 蓬尾浣熊 péngwěi huànxióng, "bushy-tailed raccoon" (s14, s15).

## Sable antelope: where the archetype still leans on the false kneel-to-predators claim

Every factual sentence now says kneeling happens in bull fights and that predator defense is lowered horns, feints and stabs (trait 2 fact, overview frame, Mirror line 577, axis rootedness read, Qi Sha star line). The concept and title were left for the owner. These places still lean on dropping or kneeling as the answer to a threat:

- Archetype name "The Kneeling Sovereign": meta description, og:description, both JSON-LD descriptions ("turns a cornering into a stand nothing else survives"; the "nothing else survives" part is also unsourced hyperbole), share card hero and Archetype stat, keepsake eyebrow, "Practices for the Kneeling Sovereign" heading, methodology note. Same in v1 and v2 (archetype, cardSub, seo description, practices title).
- Hero essence: "You drop, plant your feet, and hold a fight nothing else can survive, even after the herd has already run."
- Recognition "Under pressure" line and the Mirror take: "The moment a real threat closes the distance, you are already dropping".
- Trait 2 title "The drop to the knees" (true for rival fights only) and its reading "go low, get close to the ground".
- Mirror shadow line: "Dropping low and facing the threat is expensive".
- Share card sub "kneels when it must"; shareLine and keepsake identity "kneel when it matters".
- Dial Tiger-led read "a life spent kneeling for fights nobody else remembers starting" (this one fits rival fights).
- v1 only: heroStatement "You kneel into a fight nothing else can survive", testTitle "Do you kneel into the fight the way the Sable Antelope does?", dial "calls for the knees", "The nerve that drops to the knees and faces the threat", "The willingness to kneel and fight", "save the knees", ritual chip "some things aren't worth the knees".
- Trait 5 reading ("Standing guard and being in charge were never the same job") rested on the dropped claim that the bull does not run the herd's order; the fact now says one dominant bull plus seniority among females. Reading left as reading voice.

## Not changed, and why

- springbok "head down" was OK in the audit but not in the source; cut as the audit allowed. The horn reading ("defenses ... plain and in the open") still fits a both-sexes fact. Hero, mirror and readings about the pronk are true to the sourced display.
- kookaburra "The largest member of the kingfisher family" kept (Wikipedia; Australian Museum says only "one of the larger"). The rank trait now carries the Legge (2000) nest siblicide finding, as the audit offered; the owner may prefer to cut the trait instead, since the fact is darker than the old sparring line. The Purple Star Sun star is keyed to Aries on several pages (audit note); left for a star pass.
- sable-antelope hero overview "known for facing predators down rather than outrunning them": OK with nuance in the audit (turns to fight, s5). Kept. Metaphor lines "a horn built for a lion", "is this actually the lion" are reading voice. Kept.
- snow-petrel trait title "The crevice held for millennia" kept: 6,000 years is millennia. "for decades" in the overview frame and rootedness read kept (around 20 years). South Pole line OK in the audit.
- ringtail stove and box imagery in reading copy ("welcomed at the stove", "the box left by the stove" in the stone cell, "stove-warmed cabin" in the Lian Zhen line, "their stoves" in the openness read, the Shadow cost line) leans on the cut "warm box near the stove" detail; reading voice, left for the owner. The rootedness signature read ("same den ... winter after winter") is not in the audit and has no source in the dossier; flagged, not changed. The cacomistle page may use the same 貍 glyph (audit note); out of scope.
- 紫微斗数 in the Purple Star lead on all five pages uses simplified 数 (traditional 數). Shared section text, not a fact; left for a sitewide pass. 天府 and 廉貞 in ringtail star text and other existing hanzi without inline pinyin were not touched beyond the star lines reworded here.
- Existing em dashes and "not X, it is Y" lines in reading copy were left for a copy pass. No new text adds any.

## Structure check

All five pages parse with python html.parser, and the full HTML tag sequence matches the backups. Every JSON-LD and application/json block parses (4 per page). All edited template JSON loads and nested keysets are unchanged from the backups (raw text edits, same format). No leftover old header glyph in any header slot (rail__han, serial-han, keepsake .h, every data-say beside a Hear label), and template animalHan changed in v1 and v2. No new em dash, en dash or arrow in new text; no banned words; every new hanzi carries pinyin; no escaped <b>. No CSS or JS touched. Git not run.

## Final header characters

- springbok: 跳羚 tiàolíng (was 羚 líng)
- kookaburra: 笑翠鳥 xiàocuìniǎo (was 翠 cuì)
- sable-antelope: 黑馬羚 hēimǎlíng (was 羚 líng)
- snow-petrel: 雪鸌 xuěhù (was 雪 xuě)
- ringtail: 蓬尾浣熊 péngwěi huànxióng (was 貍 lí)
