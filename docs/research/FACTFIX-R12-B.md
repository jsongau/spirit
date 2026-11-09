# FACTFIX-R12-B change log

Date: 2026-11-08. Pages: fossa, giant-salamander, gila-monster, tree-kangaroo, wallcreeper.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). Where a string occurred more than once in a file every occurrence was replaced (counts noted). Fossa and wallcreeper have v1 and v2; giant-salamander, gila-monster and tree-kangaroo have v2 only.
Backups of the original pages: `~/factfix-backup-r12b/<slug>.html`; original template JSON in `~/factfix-backup-r12b/tpl/v1/` and `~/factfix-backup-r12b/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site. Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. `tools/han-pinyin.json` updated for the four changed headers and the tree-kangaroo pinyin spacing (fresh read-modify-write at the end, only these five keys touched).
Purple Star: fossa and wallcreeper carried the "read for the <crossing> it keeps landing on the same two" lead plus "tends to" star lines. Reworded as Zodi Animal's own reading with the sentences used in earlier rounds ("and Zodi Animal reads the <crossing> through two of them", "That is our outline for the <crossing>"). Both pages already had the honest fine print; kept. Giant-salamander, gila-monster and tree-kangaroo name no star (only the cast-your-chart line). Star labels not touched.

## fossa

1. **Source:** s7 (header: 獴 měng is mongoose in general; Chinese name 馬島獴 mǎdǎo měng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">獴</span>
   - AFTER: <span class="rail__han" aria-hidden="true">馬島獴</span>
2. **Source:** s7 (header: 獴 měng is mongoose in general; Chinese name 馬島獴 mǎdǎo měng; count: HTML x2) [HTML]
   - BEFORE: data-say="獴" aria-label="Hear 獴, měng"
   - AFTER: data-say="馬島獴" aria-label="Hear 馬島獴, mǎdǎo měng"
3. **Source:** s7 (header: 獴 měng is mongoose in general; Chinese name 馬島獴 mǎdǎo měng) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">měng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">mǎdǎo měng</span>
4. **Source:** s7 (header: 獴 měng is mongoose in general; Chinese name 馬島獴 mǎdǎo měng) [HTML]
   - BEFORE: <span class="serial-han">獴</span>
   - AFTER: <span class="serial-han">馬島獴</span>
5. **Source:** s7 (header: 獴 měng is mongoose in general; Chinese name 馬島獴 mǎdǎo měng) [HTML]
   - BEFORE: <span class="h" lang="zh">獴</span><span class="py" lang="zh-Latn-pinyin">měng</span>
   - AFTER: <span class="h" lang="zh">馬島獴</span><span class="py" lang="zh-Latn-pinyin">mǎdǎo měng</span>
6. **Source:** s5 (WRONG: Eupleridae contains Madagascar's mongooses; closest relatives are the mongooses of Africa and Asia) [HTML + v1 + v2]
   - BEFORE: <b>Eupleridae, the family most closely related to Madagascar's mongooses</b>
   - AFTER: <b>Eupleridae, the family of Madagascar's carnivores, whose closest relatives are the mongooses of Africa and Asia</b>
7. **Source:** s5 (WRONG: 26 vs 13 km2 is twice; home ranges, not defended territories; glands in the anal region and on the chest) [HTML + v1 + v2]
   - BEFORE: Male Fossas hold territories of <b>up to 26 square kilometres</b>, over twice the size a female defends, and scent-mark rocks, trunks, and open ground year-round from glands near the tail and chest
   - AFTER: Male Fossas range over <b>up to 26 square kilometres</b>, twice the size of a female's home range, and scent-mark rocks, trunks, and open ground year-round from glands under the tail and on the chest
8. **Source:** s8 (Purple Star lead: no traditional basis for a sign plus year star pairing) [HTML + v2]
   - BEFORE: and read for the Aries Rat crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Aries Rat crossing through two of them.
9. **Source:** s8 (Purple Star: tendency claim made our reading) [HTML + v2]
   - BEFORE: For an Aries Rat, Wu Qu tends to show up as the discipline behind the nerve
   - AFTER: In our reading for an Aries Rat, Wu Qu shows up as the discipline behind the nerve
10. **Source:** s8 (Purple Star close: tendency claim made our reading) [HTML + v2]
   - BEFORE: That is the outline the Aries Rat tends to share.
   - AFTER: That is our outline for the Aries Rat crossing.
   - Template: animalHan "獴" to "馬島獴", animalHanPy "měng" to "mǎdǎo měng" (v1 + v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## giant-salamander

1. **Source:** s6, s7 (header: 守 shǒu is a theme word (guard), not the animal; Chinese name 大鯢 dàní) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">守</span>
   - AFTER: <span class="rail__han" aria-hidden="true">大鯢</span>
2. **Source:** s6, s7 (header; count: HTML x2) [HTML]
   - BEFORE: data-say="守" aria-label="Hear 守, shǒu"
   - AFTER: data-say="大鯢" aria-label="Hear 大鯢, dàní"
3. **Source:** s6, s7 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">shǒu</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">dàní</span>
4. **Source:** s6, s7 (header) [HTML]
   - BEFORE: <span class="serial-han">守</span>
   - AFTER: <span class="serial-han">大鯢</span>
5. **Source:** s6, s7 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">守</span><span class="py" lang="zh-Latn-pinyin">shǒu</span>
   - AFTER: <span class="h" lang="zh">大鯢</span><span class="py" lang="zh-Latn-pinyin">dàní</span>
6. **Source:** s6, s9, s10, s11 (UNVERIFIABLE: no source for den fidelity over decades; meta, og, JSON-LD descriptions; count: HTML x4) [HTML + v2]
   - BEFORE: holds territory for decades
   - AFTER: guards its den
7. **Source:** s6, s9, s10, s11 (UNVERIFIABLE den for decades; shareLine, share card, keepsake identity; count: HTML x2) [HTML + v2]
   - BEFORE: holds the den for decades
   - AFTER: guards the den
8. **Source:** s6, s8, s10 (hero: sixty-year den unsourced; captives have passed sixty) [HTML + v2]
   - BEFORE: yet the world's largest amphibian has held the same den for sixty years.
   - AFTER: the largest amphibian alive can live past sixty, guarding its den through each breeding season.
9. **Source:** s6, s8, s9, s10 (frame: eighty unsourced, decades den unsourced, skin-only breathing wrong) [HTML + v2]
   - BEFORE: The world's largest amphibian can live sixty to eighty years and return to the same den for decades. It breathes entirely through its skin,
   - AFTER: The largest amphibian alive has lived at least sixty years in captivity, and large males guard a nest den through the breeding season. It breathes through its folded skin as well as its lungs,
10. **Source:** s6, s9, s10, s11 (UNVERIFIABLE: rewritten as nest-den guarding) [HTML + v2]
   - BEFORE: Male giant salamanders <b>return to and defend the same den site for decades</b>, with documented territorial fidelity spanning the length of a human working life.
   - AFTER: Large male giant salamanders <b>become den masters, guarding a nest den</b> and the eggs inside it through the breeding season, and both sexes hold territories along the stream.
11. **Source:** s8, s9 (WRONG: adults have lungs and surface to breathe) [HTML + v2]
   - BEFORE: The giant salamander <b>breathes entirely through its skin</b>, absorbing dissolved oxygen directly from fast-flowing, cold mountain water. It has no functional lungs as an adult.
   - AFTER: The giant salamander <b>breathes through its folded skin as well as its lungs</b>, taking in dissolved oxygen from fast-flowing, cold mountain water through skin folds rich in blood vessels, and surfacing now and then to breathe air.
12. **Source:** s6, s8 (WRONG: species split; South China giant salamander slightly larger; margin unsourced) [HTML + v2]
   - BEFORE: making it the world's largest living amphibian by significant margin.
   - AFTER: and with the South China giant salamander it ranks as the largest amphibian alive.
13. **Source:** s6, s7 (WRONG: no mass extinction in last 30 million years; family about 170 million years old) [HTML + v2]
   - BEFORE: Fossil records place giant salamanders in <b>essentially identical form for over thirty million years</b>, having survived multiple mass extinction events without fundamental reorganization.
   - AFTER: Fossils trace the giant salamander family back <b>about 170 million years</b>, to the age of the dinosaurs, and its line came through the mass extinction that ended them.
14. **Source:** s6, s7 (axis read: thirty-million-year niche unsourced) [HTML + v2]
   - BEFORE: The giant salamander has occupied essentially the same ecological niche for thirty million years.
   - AFTER: The giant salamander belongs to a family whose fossils go back about 170 million years.
15. **Source:** s6, s9, s10, s11 (axis read: decades den) [HTML + v2]
   - BEFORE: is solitary, territorial, and returns to the same den for decades.
   - AFTER: is solitary, territorial, and guards its den hard in the breeding season.
16. **Source:** s6, s9, s10, s11 (axis read (signature): decades den) [HTML + v2]
   - BEFORE: Male giant salamanders have been documented returning to and defending the same den site for decades.
   - AFTER: Large male giant salamanders become den masters, guarding one nest den and its eggs through the breeding season.
17. **Source:** s8 (scent-masking secretion and decades den not in any opened source; kept to sheltering under rocks) [HTML + v2]
   - BEFORE: The giant salamander's skin secretes compounds that mask its scent in the current — one of the reasons it can occupy a den for decades without being easily located.
   - AFTER: The giant salamander shelters under boulders in the current, out of sight, which is one reason it can hold a den without being easily found.
18. **Source:** s16 (靜水流深 is the Chinese form of the English proverb still waters run deep, a modern saying, not traditional) [HTML]
   - BEFORE: A proverb we tie to the <a href="/chinese-zodiac/ox/">Year of the Ox</a>. The pairing is our own reading, not tradition.
   - AFTER: A modern Chinese saying, the Chinese form of the English proverb still waters run deep. We tie it to the <a href="/chinese-zodiac/ox/">Year of the Ox</a>; the pairing is our own reading, not tradition.
19. **Source:** s16 (template proverb note, same relabel) [v2]
   - BEFORE: A proverb we tie to the Year of the Ox. The pairing is our own reading, not tradition.
   - AFTER: A modern Chinese saying, the Chinese form of the English proverb still waters run deep. We tie it to the Year of the Ox; the pairing is our own reading, not tradition.
20. **Source:** s8 (replaces unverified ref; DOI pointed to a different journal) (reference list: Browne et al. 2014 unverified) [HTML]
   - BEFORE: <li><a href="https://doi.org/10.1016/j.biocon.2013.12.023" rel="noopener">Browne, R. K. et al. (2014). Andrias davidianus — Giant Salamander conservation — Amphibian &amp; Reptile Conservation</a></li>
   - AFTER: <li><a href="https://ielc.libguides.com/sdzg/factsheets/chinesegiantsalamanders/characteristics" rel="noopener">San Diego Zoo Wildlife Alliance Library · Chinese giant salamander fact sheet</a></li>
21. **Source:** s9 (replaces unverified ref; link was the journal home page) (reference list: Zhang et al. 2016 unverified) [HTML]
   - BEFORE: <li><a href="https://www.cambridge.org/core/journals/oryx" rel="noopener">Zhang, Y. et al. (2016). Chinese Giant Salamander in situ ecology — Oryx</a></li>
   - AFTER: <li><a href="https://animaldiversity.org/accounts/Cryptobranchidae/" rel="noopener">Animal Diversity Web, University of Michigan · Cryptobranchidae</a></li>
22. **Source:** s8 (template reference, Browne replaced) [v2]
   - BEFORE: "label": "Browne, R. K. et al. (2014). Andrias davidianus — Giant Salamander conservation — Amphibian & Reptile Conservation",\n        "href": "https://doi.org/10.1016/j.biocon.2013.12.023"
   - AFTER: "label": "San Diego Zoo Wildlife Alliance Library · Chinese giant salamander fact sheet",\n        "href": "https://ielc.libguides.com/sdzg/factsheets/chinesegiantsalamanders/characteristics"
23. **Source:** s9 (template reference, Zhang replaced) [v2]
   - BEFORE: "label": "Zhang, Y. et al. (2016). Chinese Giant Salamander in situ ecology — Oryx",\n        "href": "https://www.cambridge.org/core/journals/oryx"
   - AFTER: "label": "Animal Diversity Web, University of Michigan · Cryptobranchidae",\n        "href": "https://animaldiversity.org/accounts/Cryptobranchidae/"
24. **Source:** s6, s9, s10, s11 (share card sub (capitalised form): decades den) [HTML + v2]
   - BEFORE: Holds the den for decades,
   - AFTER: Guards the den,
25. **Source:** s6, s10 (template FAQ: eighty unsourced, decades den unsourced) [v2]
   - BEFORE: the world's largest amphibian, which can live sixty to eighty years and return to the same den for decades.
   - AFTER: the largest amphibian alive, which has lived at least sixty years in captivity and guards its den through the breeding season.
   - Template: animalHan "守" to "大鯢", animalHanPy "shǒu" to "dàní" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.
   - Count note: "holds territory for decades" replaced 4 times in HTML (meta description, og:description, two JSON-LD descriptions) and once in v2; "holds the den for decades" 2 times in HTML (animal-data shareLine, keepsake identity) and once in v2.

## gila-monster

1. **Source:** s13 (header: 毒 dú means poison, not the animal; Chinese name 美國毒蜥 Měiguó dúxī) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">毒</span>
   - AFTER: <span class="rail__han" aria-hidden="true">美國毒蜥</span>
2. **Source:** s13 (header; count: HTML x2) [HTML]
   - BEFORE: data-say="毒" aria-label="Hear 毒, dú"
   - AFTER: data-say="美國毒蜥" aria-label="Hear 美國毒蜥, Měiguó dúxī"
3. **Source:** s13 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">dú</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">Měiguó dúxī</span>
4. **Source:** s13 (header) [HTML]
   - BEFORE: <span class="serial-han">毒</span>
   - AFTER: <span class="serial-han">美國毒蜥</span>
5. **Source:** s13 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">毒</span><span class="py" lang="zh-Latn-pinyin">dú</span>
   - AFTER: <span class="h" lang="zh">美國毒蜥</span><span class="py" lang="zh-Latn-pinyin">Měiguó dúxī</span>
6. **Source:** s6, s7 (WRONG: coyotes, badgers and raptors take adults) [HTML + v2]
   - BEFORE: A venomous lizard with no natural predators, no urgency,
   - AFTER: A venomous lizard with few natural predators, no urgency,
7. **Source:** s6, s7, s8 (WRONG: five Heloderma species now; only venomous lizard native to the US; few predators) [HTML + v2]
   - BEFORE: one of only two venomous lizards in North America, and an animal with no known natural predators in adulthood.
   - AFTER: the only venomous lizard native to the United States, and an animal with few natural predators in adulthood.
8. **Source:** s6, s7, s8, s10 (frame: months of reserves, still tongue and five months underground not sourced) [HTML + v2]
   - BEFORE: The tail that stores months of reserves, the tongue that reads the air continuously without moving the body,
   - AFTER: The tail that stores a season of reserves, the tongue that reads the air as it forages,
9. **Source:** s6, s8 (UNVERIFIABLE five months; sources give 90 to 95 percent of life underground) [HTML + v2]
   - BEFORE: the five months underground — these are
   - AFTER: the 90 to 95 percent of its life spent underground — these are
10. **Source:** s6, s8, s10 (UNVERIFIABLE: three to four months looks like three to four meals; thinning and refilling unsourced) [HTML + v2]
   - BEFORE: </b> that are sufficient to sustain the animal through three to four months without feeding; the tail visibly thins after a period of activity and fills again during foraging season.
   - AFTER: </b>, and it draws on that store between meals, so that three or four large meals can carry it through a whole season.
11. **Source:** s6, s7 (trait title) [HTML + v2]
   - BEFORE: No known adult predators
   - AFTER: Few adult predators
12. **Source:** s6, s7 (WRONG: coyotes, badgers and raptors prey on adults) [HTML + v2]
   - BEFORE: Adult Gila Monsters have <b>no documented natural predators</b>; the combination of potent venom, armored osteoderms embedded in the skin, and a bite that requires sustained effort to release makes them effectively invulnerable once they reach full size.
   - AFTER: Adult Gila Monsters have <b>few natural predators</b>, though coyotes, badgers and birds of prey take some; potent venom, armored osteoderms embedded in the skin, and a bite that takes sustained effort to release protect them once they reach full size, and people are now their main threat.
13. **Source:** s6, s8, s10 (trait title) [HTML + v2]
   - BEFORE: Active only a few months a year
   - AFTER: Above ground a few weeks a year
14. **Source:** s6, s8, s10 (WRONG: active season about 90 days but surface time is only weeks; 90 to 95 percent of life underground) [HTML + v2]
   - BEFORE: Gila Monsters are surface-active for <b>approximately two to four months per year</b>, spending the rest underground in rock shelters or burrows;
   - AFTER: Gila Monsters spend <b>only a few weeks a year on the surface</b>, and about 90 to 95 percent of their lives underground in rock shelters or burrows;
15. **Source:** s6 (drop framing: the lizard tongue-flicks while foraging) [HTML + v2]
   - BEFORE: <b>forked tongue samples airborne chemical particles continuously</b>, delivering them to the Jacobson's organ in the roof of the mouth; this chemosensory system tracks prey, conspecifics, and environmental changes without the animal needing to move from its position.
   - AFTER: <b>forked tongue samples airborne chemical particles as it forages</b>, delivering them to the Jacobson's organ in the roof of the mouth; with a keen sense of smell, this lets it track prey by day or by night.
16. **Source:** s6, s8, s10 (UNVERIFIABLE seven-month fast; replaced with the sourced meals-per-year figure) [HTML + v2]
   - BEFORE: Field studies of Heloderma suspectum document animals surviving <b>complete dry seasons — up to seven months — without surface activity or food intake</b>, emerging in spring at viable body weight due to fat reserves accumulated the previous year.
   - AFTER: A wild Gila Monster may eat <b>only four or five times a year</b>, living between meals on the fat it stored when food was easy to find.
17. **Source:** s6, s8, s10 (axis read (signature): three to four months) [HTML + v2]
   - BEFORE: stores fat reserves in its thick tail sufficient to survive three to four months without eating.
   - AFTER: stores fat reserves in its thick tail, enough that three or four large meals can carry it through a season.
18. **Source:** s6, s7 (template card line: few natural predators) [v2]
   - BEFORE: and has no natural predator to hurry it.
   - AFTER: and has few natural predators to hurry it.
   - Template: animalHan "毒" to "美國毒蜥", animalHanPy "dú" to "Měiguó dúxī" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.
   - Dash note: item 9 keeps the existing em dash after the new words ("underground — these are"); it was the anchor, not new text.

## tree-kangaroo

1. **Source:** s15 (header pinyin spacing: shù dàishǔ (glyphs 樹袋鼠 correct, kept); count: HTML x2) [HTML]
   - BEFORE: aria-label="Hear 樹袋鼠, shùdàishǔ"
   - AFTER: aria-label="Hear 樹袋鼠, shù dàishǔ"
2. **Source:** s15 (header pinyin spacing) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">shùdàishǔ</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">shù dàishǔ</span>
3. **Source:** s15 (header pinyin spacing) [HTML]
   - BEFORE: <span class="py" lang="zh-Latn-pinyin">shùdàishǔ</span>
   - AFTER: <span class="py" lang="zh-Latn-pinyin">shù dàishǔ</span>
4. **Source:** s5, s6, s7 (UNVERIFIABLE rotating ankles; sourced trait is independent hindlimb movement) [HTML + v2]
   - BEFORE: developing grip pads, longer forelegs, and rotating ankles.
   - AFTER: developing grip pads, longer forelegs, and hind legs that can move one at a time, which ground kangaroos cannot do.
5. **Source:** s5, s6, s7 (WRONG: hind feet are longer and broader with long curved claws; hind legs smaller, forelimbs stronger) [HTML + v2]
   - BEFORE: <b>re-evolved shorter hind feet, longer forelegs, and padded soles</b> for gripping bark
   - AFTER: <b>evolved broad hind feet with long curved claws, smaller hind legs, stronger forelimbs and spongy soles</b> for gripping bark
6. **Source:** s6, s14, s5 (tail-in-descent clause and developed-alongside claim unsourced; 18 m drop attributed to AWS) [HTML + v2]
   - BEFORE: without apparent injury</b>, using their tail for balance during descent — a capacity that developed alongside the return to trees.
   - AFTER: without apparent injury</b>, the Australian Wildlife Society reports, and Bennett's tree-kangaroo can leap nine metres down to another branch.
7. **Source:** s5, s6, s7 (understated: pouch life about nine months to a year) [HTML + v2]
   - BEFORE: complete development inside the pouch</b> over several months
   - AFTER: complete development inside the pouch</b> over about nine months to a year
8. **Source:** s7, s8, s9 (trait title: female ranges do not overlap) [HTML + v2]
   - BEFORE: The overlapping range
   - AFTER: A range of her own
9. **Source:** s7, s8, s9 (WRONG (reversed): female ranges are exclusive; male ranges overlap; Matschie's defend borders) [HTML + v2]
   - BEFORE: Tree kangaroos have <b>large home ranges that overlap significantly</b> between individuals, particularly among females — they are not territorial in the fighting sense, coexisting with shared ground.
   - AFTER: In Lumholtz's tree-kangaroo <b>each female keeps a small range that no other female shares</b>, while a male's range overlaps several females and other males; Matschie's tree-kangaroos mark and defend their borders.
10. **Source:** s7, s8, s9 (reading rebuilt on the corrected fact) [HTML + v2]
   - BEFORE: You may operate with overlapping claims without needing to establish exclusive ownership. <em>The range is real; the fence is not.</em>
   - AFTER: You keep a piece of ground that is yours alone, even while other paths cross near it. <em>The edges are shared. The centre is yours.</em>
11. **Source:** s7, s8 (frame: overlapping home ranges) [HTML + v2]
   - BEFORE: the overlapping home ranges,
   - AFTER: the home ranges it keeps and shares,
12. **Source:** s7, s8 (axis read: overlap reversed) [HTML + v2]
   - BEFORE: Tree kangaroos have large home ranges that overlap significantly between individuals — they are not territorial in the fighting sense. They coexist with overlapping claims.
   - AFTER: A male tree kangaroo's range overlaps several females and other males, though each female keeps her own patch. They coexist with overlapping claims.
13. **Source:** s7, s8 (guard text: overlap reversed) [HTML + v2]
   - BEFORE: Tree kangaroos have large home ranges that overlap significantly between individuals. They coexist with shared ground.
   - AFTER: A male Lumholtz's tree-kangaroo ranges across the patches of several females and crosses paths with other males, even though each female keeps her own patch to herself.
14. **Source:** s7, s8 (feng shui living area: overlap) [HTML + v2]
   - BEFORE: The tree kangaroo's overlapping home range is shared without territorial fighting.
   - AFTER: A male tree kangaroo's range overlaps those of several neighbours.
15. **Source:** s9, s7 (species-specific: Matschie's sleep and rest 14 to 15 hours) [HTML + v2]
   - BEFORE: Tree kangaroos <b>sleep up to fifteen hours a day</b> in the canopy
   - AFTER: Matschie's tree-kangaroos <b>sleep and rest fourteen to fifteen hours a day</b> in the canopy
16. **Source:** s9 (feng shui bedroom: sleep and rest) [HTML + v2]
   - BEFORE: The tree kangaroo sleeps up to fifteen hours in the canopy.
   - AFTER: The tree kangaroo can sleep and rest up to fifteen hours a day in the canopy.
   - Template: animalHanPy "shùdàishǔ" to "shù dàishǔ" (v2); animalHan 樹袋鼠 unchanged.

## wallcreeper

1. **Source:** s9, s10, s14 (header: 雀 què alone means sparrow or any small bird; short form of 紅翅旋壁雀 is 旋壁雀 xuánbìquè) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">雀</span>
   - AFTER: <span class="rail__han" aria-hidden="true">旋壁雀</span>
2. **Source:** s9, s10, s14 (header; count: HTML x2) [HTML]
   - BEFORE: data-say="雀" aria-label="Hear 雀, què"
   - AFTER: data-say="旋壁雀" aria-label="Hear 旋壁雀, xuánbìquè"
3. **Source:** s9, s10, s14 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">què</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">xuánbìquè</span>
4. **Source:** s9, s10, s14 (header) [HTML]
   - BEFORE: <span class="serial-han">雀</span>
   - AFTER: <span class="serial-han">旋壁雀</span>
5. **Source:** s9, s10, s14 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">雀</span><span class="py" lang="zh-Latn-pinyin">què</span>
   - AFTER: <span class="h" lang="zh">旋壁雀</span><span class="py" lang="zh-Latn-pinyin">xuánbìquè</span>
6. **Source:** s6, s7, s12 (otherwise hidden overstates (some red shows on the closed wing); 'butterfly of the crags' not found, sourced form is butterfly of the cliffs) [HTML + v1 + v2]
   - BEFORE: briefly exposing crimson-and-black patches otherwise hidden against its grey plumage, a habit that has earned it the nickname "the butterfly of the crags."
   - AFTER: briefly opening up crimson-and-black patches that barely show on the folded wing against its grey plumage, a habit that has earned it the nickname "butterfly of the cliffs."
7. **Source:** s5, s6 (cut 'almost no other bird can reach' (unverifiable); family placement softened) [HTML + v1 + v2]
   - BEFORE: for insects and spiders, a food source almost no other bird in its range is built to reach; it is the only living member of its own family, Tichodromidae.
   - AFTER: for insects and spiders; it is usually placed alone in its own family, Tichodromidae, though some authorities file it with the nuthatches.
8. **Source:** s5, s6, s7 (WRONG winter floor (birds winter on lowland cathedrals and quarries); breeding range is European only) [HTML + v1 + v2]
   - BEFORE: The Wallcreeper breeds at elevations between roughly <b>1,000 and 3,000 metres</b>, on cliffs and gorges that sit at or above the treeline, and descends no further than about 400 to 800 metres even in winter.
   - AFTER: In Europe the Wallcreeper breeds between roughly <b>1,000 and 3,000 metres</b>, and in the Himalaya as high as 5,100, on cliffs and gorges at or above the treeline; in winter many move down to the foothills, and a few turn up on lowland cathedrals and quarries.
9. **Source:** s5, s6 (reading under corrected fact: it does come down in winter) [HTML + v2]
   - BEFORE: Ground that offers no cover and very little comfort is where you stay, in every season, because the exposure
   - AFTER: Ground that offers no cover and very little comfort is where you go back to every spring, because the exposure
10. **Source:** s5, s6 (reading under corrected fact (v1 wording)) [v1]
   - BEFORE: You keep to ground that offers no cover and very little comfort, in every season, because the exposure
   - AFTER: You go back every spring to ground that offers no cover and very little comfort, because the exposure
11. **Source:** s15 (Purple Star lead: stars come from lunar birth date and hour, not sign plus year) [HTML + v2]
   - BEFORE: and read for the Aries Goat crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Aries Goat crossing through two of them.
12. **Source:** s15 (Purple Star: tendency claim made our reading) [HTML + v2]
   - BEFORE: For an Aries born in the Goat year, it tends to sit close to how you actually take ground:
   - AFTER: In our reading for an Aries born in the Goat year, it sits close to how you actually take ground:
13. **Source:** s15 (Purple Star: tendency claim made our reading) [HTML + v2]
   - BEFORE: Crossed into the Solitary Flare, it tends to land near how you actually produce
   - AFTER: Crossed into the Solitary Flare in our reading, it lands near how you actually produce
14. **Source:** s15 (Purple Star: placement claim; only a cast chart can say) [HTML + v2]
   - BEFORE: this star has likely been sitting close to your Life palace for a while.
   - AFTER: this star may well sit close to your Life palace, and only your own cast chart can say.
15. **Source:** s15 (Purple Star close: tendency claim made our reading) [HTML + v2]
   - BEFORE: That is the outline the Aries Goat crossing tends to share:
   - AFTER: That is our outline for the Aries Goat crossing:
16. **Source:** s5 (unit added to the Himalaya figure in item 10) [HTML + v1 + v2]
   - BEFORE: in the Himalaya as high as 5,100, on cliffs
   - AFTER: in the Himalaya as high as 5,100 metres, on cliffs
   - Template: animalHan "雀" to "旋壁雀", animalHanPy "què" to "xuánbìquè" (v1 + v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.
## Header check

- fossa: 獴 měng (mongoose in general) to 馬島獴 mǎdǎo měng.
- giant-salamander: 守 shǒu (guard) to 大鯢 dàní. The shared footer proverb 守得雲開見月明 shǒu dé yún kāi jiàn yuè míng still shows 守; it is the site-wide footer, not the header, and was left alone.
- gila-monster: 毒 dú (poison) to 美國毒蜥 Měiguó dúxī.
- tree-kangaroo: 樹袋鼠 kept (correct); pinyin respaced from shùdàishǔ to shù dàishǔ.
- wallcreeper: 雀 què (sparrow, small bird) to 旋壁雀 xuánbìquè.

## Not changed, and why

- fossa ov-lead "closer kin to a mongoose than to any cat" and the mirror line placing it "among Madagascar's mongooses": both true (its family holds Madagascar's mongooses, and its nearest relatives outside are mongooses). Kept.
- fossa "so the border can be read without a confrontation" after the home-range fact: reading of scent marking, kept. "Territory" in readings is reading voice, kept.
- fossa star label "the Military star" for 武曲 Wǔ Qū: earlier rounds aligned labels with the hub (The Finance General); not in this audit, left for a label pass.
- giant-salamander fact 04 "several months without food": OK in the dossier (Wikipedia says years, needs the study opened). Kept.
- giant-salamander reading lines "hold it for decades" and "held in their lateral line for decades" are about the reader, not the animal. Kept.
- giant-salamander Thorn (1968) reference kept: a real monograph; the Browne 2014 entry (its DOI points to a Biological Conservation paper) and the Zhang 2016 entry (link was only the Oryx home page) were swapped for two sources opened in the dossier. "Last reviewed 2026-07-10" date left as is.
- giant-salamander proverb eyebrow and section label "The proverb of your year" are the shared section name; the note under the proverb now says it is a modern saying. Not called ancient or traditional anywhere on the page.
- giant-salamander "The water room" line "breathes through its skin": true as far as it goes. Kept.
- gila-monster Bogert and Martín del Campo (1956) citation: the monograph exists, text not read; kept as a general reference, as the audit allows.
- gila-monster rootedness read "mapped every burrow ... in the same square kilometre for years": not in the audit; reading-voice framing, kept.
- gila-monster Archerfish match rests only on shared Earth (audit note): Related Animals not touched.
- tree-kangaroo hero and mate-plate year glyph 猪 is simplified while the header is traditional. The same 猪 sits on 11 of the 12 Pig pages, so it is a site-wide template choice, not a page fact; left for a sitewide pass.
- tree-kangaroo "longer forelegs" in fact 01 kept (audit OK; forelimbs proportionally larger).
- wallcreeper mirror frame "flashes a hidden crimson only while it works": reading voice; the fact now says the red barely shows on the folded wing. Kept.
- wallcreeper Purple Star "Purple Star reads this star as reckless in the wrong chart" and "treats this placement as good for": general star lore, not a claim about the crossing. Kept.
- Existing em dashes and "not X, it is Y" lines in reading copy on these pages were left for a copy pass. No new text adds any.

## Structure check

All five pages parse with python html.parser, and the full HTML tag sequence matches the backups. Every JSON-LD and application/json block parses (4 per page); section counts match the backups. All edited template JSON loads and nested keysets are unchanged (raw text edits, same format and trailing-newline state). No leftover old header glyph in any header slot. No new em dash, en dash or arrow in new text; no banned words; every new hanzi carries pinyin; no escaped <b>. No CSS or JS touched. Git not run.

## Final header characters

- fossa: 馬島獴 mǎdǎo měng (was 獴 měng)
- giant-salamander: 大鯢 dàní (was 守 shǒu)
- gila-monster: 美國毒蜥 Měiguó dúxī (was 毒 dú)
- tree-kangaroo: 樹袋鼠 shù dàishǔ (glyphs unchanged; pinyin was shùdàishǔ)
- wallcreeper: 旋壁雀 xuánbìquè (was 雀 què)
