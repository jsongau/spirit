# FACTFIX-R14-B change log

Date: 2026-11-08. Pages: trapdoor-spider, cleaner-wrasse, spotted-hyena, leafcutter-ant.
Method copied from FACTFIX-R12-B. Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). Where a string occurred more than once in a file every occurrence was replaced (counts noted). Trapdoor-spider, cleaner-wrasse and leafcutter-ant have v2 only. Spotted-hyena has v1 and v2, but its v2 file is an unfilled stub (animalHan is "TODO: one hanzi for the creature", no fact strings), so its edits landed in HTML and v1 only.
Backups of the original pages: `~/factfix-backup-r14b/<slug>.html`; original template JSON in `~/factfix-backup-r14b/tpl/v1/` and `~/factfix-backup-r14b/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site. Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. `tools/han-pinyin.json` updated for the four changed headers (fresh read-modify-write at the end, only these four slug keys touched, file format unchanged).
Purple Star: none of the four pages assigns a star or makes a crossing claim; each awaken section already says charts are cast from the lunar birth date and hour. Nothing to change. The one "traditional" claim found was the hyena lucky-window line ("Traditionally the first quarter is the moon of momentum"), rewritten as our reading (spotted-hyena item 18).

## trapdoor-spider

1. **Source:** s12, s13, s14 (header: 門 mén means door; classical Chinese name 螲蟷 diédāng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">門</span>
   - AFTER: <span class="rail__han" aria-hidden="true">螲蟷</span>
2. **Source:** s12, s13, s14 (header: 門 mén means door; classical Chinese name 螲蟷 diédāng); count: HTML x2 [HTML]
   - BEFORE: data-say="門" aria-label="Hear 門, mén"
   - AFTER: data-say="螲蟷" aria-label="Hear 螲蟷, diédāng"
3. **Source:** s12, s13, s14 (header: 門 mén means door; classical Chinese name 螲蟷 diédāng) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">mén</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">diédāng</span>
4. **Source:** s12, s13, s14 (header: 門 mén means door; classical Chinese name 螲蟷 diédāng) [HTML]
   - BEFORE: <span class="serial-han">門</span>
   - AFTER: <span class="serial-han">螲蟷</span>
5. **Source:** s12, s13, s14 (header: 門 mén means door; classical Chinese name 螲蟷 diédāng) [HTML]
   - BEFORE: <span class="h" lang="zh">門</span><span class="py" lang="zh-Latn-pinyin">mén</span>
   - AFTER: <span class="h" lang="zh">螲蟷</span><span class="py" lang="zh-Latn-pinyin">diédāng</span>
6. **Source:** s5, s6 (WRONG: Ctenizidae is now 2 genera in Europe and Turkey; "trapdoor spider" spans about a dozen families) [HTML + v2]
   - BEFORE: The trapdoor spider is a burrowing spider of the family Ctenizidae found across warm regions worldwide, known for
   - AFTER: Trapdoor spiders are burrowing spiders from several families found across warm regions of the world, known for
7. **Source:** s9 (OK but strong: trained observers learn to spot the lid) [HTML + v2]
   - BEFORE: camouflaged accurately enough that the closed door is invisible to most observers even at close range.
   - AFTER: camouflaged so well that the closed door is hard to spot even at close range.
8. **Source:** s9, s10 (trip-lines true for some species, e.g. Gaius villosus, not all; narrowed to many species) [HTML + v2]
   - BEFORE: The spider radiates <b>silk trip-lines outward from the closed door</b>
   - AFTER: Many species radiate <b>silk trip-lines outward from the closed door</b>
9. **Source:** s10, s11 (UNVERIFIABLE: no measured strike time; sub-millisecond strikes belong to trap-jaw spiders) [HTML + v2]
   - BEFORE: opens the hinged door from inside in under a millisecond</b> and seizes the prey — the entire strike-and-return sequence completing before most observers register that the door moved.
   - AFTER: throws open the hinged door from inside</b> and seizes the prey, then drags it back down and lets the door fall shut.
10. **Source:** s7, s8, s10 (UNVERIFIABLE 20 to 30 years; replaced with the sourced record, Number 16, about 43 years) [HTML + v2]
   - BEFORE: Female trapdoor spiders have been documented living <b>20 to 30 years</b> — among the longest lifespans of any spider — returning to the same burrow entrance throughout their entire adult lives.
   - AFTER: Female trapdoor spiders can live <b>for decades</b> and keep the same burrow their whole adult lives. The record is Number 16, a Gaius villosus female in Western Australia who lived about 43 years in one burrow, the oldest spider on record.
11. **Source:** s9 (trait title: one-metre radius unsourced) [HTML + v2]
   - BEFORE: Life within one metre
   - AFTER: Life in one burrow
12. **Source:** s9 (UNVERIFIABLE: no source gives a radius; sources say females keep one burrow and spiderlings burrow nearby) [HTML + v2]
   - BEFORE: The adult trapdoor spider's entire territory may extend <b>less than one metre from the burrow entrance</b> — all hunting, all territory defense, and all life functions occur within this radius.
   - AFTER: The adult female trapdoor spider <b>stays in one burrow for life</b> and hunts from its door, and when her spiderlings leave they dig their own burrows close by.
13. **Source:** s9 (frame: one-metre radius unsourced) [HTML + v2]
   - BEFORE: the longevity, the life within a metre
   - AFTER: the longevity, the life in one burrow
14. **Source:** s7, s9 (axis read: 20 to 30 years and one metre unsourced) [HTML + v2]
   - BEFORE: may spend her entire twenty-to-thirty-year life within a metre of the burrow she was born beside
   - AFTER: may spend her whole life, decades of it, in one burrow dug close to where she hatched
15. **Source:** s7 (UNVERIFIABLE study claim; replaced with the sourced Number 16 wasp death) [HTML + v2]
   - BEFORE: The door's construction quality — the thickness of the silk hinge, the accuracy of the camouflage, the precision of the seal — <b>directly determines hunting success and predator avoidance</b>; a poorly constructed door is a survival failure, not an aesthetic one.
   - AFTER: The door is the spider's shield as well as its trap. Number 16 lived about 43 years behind hers and died only when <b>a parasitic wasp pierced the silk plug</b> sealing her burrow.
16. **Source:** s11 (chakra line echoed the borrowed millisecond) [HTML + v2]
   - BEFORE: convert into the millisecond of absolute motion
   - AFTER: convert into the instant of absolute motion
17. **Source:** s5, s6 (reference list: IUCN search labelled Ctenizidae as "Trapdoor Spiders", the wrong framing; swapped for a source opened in the dossier) [HTML]
   - BEFORE: <li><a href="https://www.iucnredlist.org/search?query=ctenizidae" rel="noopener">IUCN Red List · Ctenizidae (Trapdoor Spiders)</a></li>
   - AFTER: <li><a href="https://www.wanaturalists.org.au/barbara-york-main-and-trapdoor-spiders/" rel="noopener">WA Naturalists' Club · Barbara York Main and Trapdoor Spiders</a></li>
18. **Source:** s17, s8 (reference list: Aganippe is Idiopidae, not Ctenizidae; replaced with the Number 16 paper) [HTML]
   - BEFORE: <li><a href="https://doi.org/10.1111/j.1096-3642.1957.tb01562.x" rel="noopener">Main BY (1957) — Trapdoor spiders of the genus Aganippe, Journal of the Linnean Society</a></li>
   - AFTER: <li><a href="https://doi.org/10.1071/PC18015" rel="noopener">Mason, L. D., Wardell-Johnson, G. and Main, B. Y. (2018). The longest-lived spider: mygalomorphs dig deep, and persevere · Pacific Conservation Biology</a></li>
19. **Source:** s5, s6 (template reference, IUCN Ctenizidae replaced) [v2]
   - BEFORE: "label": "IUCN Red List · Ctenizidae (Trapdoor Spiders)",\n        "href": "https://www.iucnredlist.org/search?query=ctenizidae"
   - AFTER: "label": "WA Naturalists' Club · Barbara York Main and Trapdoor Spiders",\n        "href": "https://www.wanaturalists.org.au/barbara-york-main-and-trapdoor-spiders/"
20. **Source:** s17, s8 (template reference, Main 1957 replaced) [v2]
   - BEFORE: "label": "Main BY (1957) — Trapdoor spiders of the genus Aganippe, Journal of the Linnean Society",\n        "href": "https://doi.org/10.1111/j.1096-3642.1957.tb01562.x"
   - AFTER: "label": "Mason, L. D., Wardell-Johnson, G. and Main, B. Y. (2018). The longest-lived spider: mygalomorphs dig deep, and persevere · Pacific Conservation Biology",\n        "href": "https://doi.org/10.1071/PC18015"
   - Template: animalHan "門" to "螲蟷", animalHanPy "mén" to "diédāng" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## cleaner-wrasse

1. **Source:** s6 (header: 站 zhàn means station; Chinese name 裂唇魚 lièchúnyú, split-lip fish) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">站</span>
   - AFTER: <span class="rail__han" aria-hidden="true">裂唇魚</span>
2. **Source:** s6 (header: 站 zhàn means station; Chinese name 裂唇魚 lièchúnyú, split-lip fish); count: HTML x2 [HTML]
   - BEFORE: data-say="站" aria-label="Hear 站, zhàn"
   - AFTER: data-say="裂唇魚" aria-label="Hear 裂唇魚, lièchúnyú"
3. **Source:** s6 (header: 站 zhàn means station; Chinese name 裂唇魚 lièchúnyú, split-lip fish) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">zhàn</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">lièchúnyú</span>
4. **Source:** s6 (header: 站 zhàn means station; Chinese name 裂唇魚 lièchúnyú, split-lip fish) [HTML]
   - BEFORE: <span class="serial-han">站</span>
   - AFTER: <span class="serial-han">裂唇魚</span>
5. **Source:** s6 (header: 站 zhàn means station; Chinese name 裂唇魚 lièchúnyú, split-lip fish) [HTML]
   - BEFORE: <span class="h" lang="zh">站</span><span class="py" lang="zh-Latn-pinyin">zhàn</span>
   - AFTER: <span class="h" lang="zh">裂唇魚</span><span class="py" lang="zh-Latn-pinyin">lièchúnyú</span>
6. **Source:** s14, s15, s16, s17 (UNVERIFIABLE: the count is from Grutter's field work, not Bshary 2001; more than 2,000 a day) [HTML + v2]
   - BEFORE: , in arrangements that Bshary (2001) documented involving up to 2,300 client visits per day.
   - AFTER: , and Grutter's field studies count more than 2,000 client visits a day.
7. **Source:** s12, s5 (narrowed: first fish reported to pass, result disputed; among corvids only the Eurasian magpie) [HTML + v2]
   - BEFORE: — making them one of very few fish species to show this capacity, alongside primates, elephants, and corvids.
   - AFTER: , the first fish reported to pass it. Some researchers dispute what the result means; outside fish, passes are reported in some primates, elephants and one corvid, the Eurasian magpie.
8. **Source:** s12 (lesson line: "one of the very few fish" made the narrower first-fish claim) [HTML + v2]
   - BEFORE: The cleaner wrasse can recognize itself in a mirror — one of the very few fish that can.
   - AFTER: The cleaner wrasse was the first fish reported to recognize itself in a mirror.
9. **Source:** s11 (WRONG: clients do not give service; bystanders avoid cleaners seen cheating and cleaners behave better when watched) [HTML + v2]
   - BEFORE: Bshary & Grutter (2006) showed that bystander fish observed these events and subsequently gave cheating wrasses lower service.
   - AFTER: Bshary and Grutter (2006) showed that bystander fish watch these events and avoid cleaners they have seen cheat, and that cleaners cheat less when they are being watched.
10. **Source:** s7, s8, s5 (behavioural switch within hours, full change takes longer; "across the Labridae family" overreaches) [HTML + v2]
   - BEFORE: the highest-ranking female changes sex to male within hours, a process called sequential hermaphroditism documented across the Labridae family.
   - AFTER: the highest-ranking female begins acting as the male within hours and goes on to change sex, a process called sequential hermaphroditism that is common among wrasses.
   - Template: animalHan "站" to "裂唇魚", animalHanPy "zhàn" to "lièchúnyú" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## spotted-hyena

1. **Source:** s15 (header: 鬣 liè alone means mane or bristles; spotted hyena is 斑鬣狗 bān liègǒu) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">鬣</span>
   - AFTER: <span class="rail__han" aria-hidden="true">斑鬣狗</span>
2. **Source:** s15 (header: 鬣 liè alone means mane or bristles; spotted hyena is 斑鬣狗 bān liègǒu); count: HTML x2 [HTML]
   - BEFORE: data-say="鬣" aria-label="Hear 鬣, liè"
   - AFTER: data-say="斑鬣狗" aria-label="Hear 斑鬣狗, bān liègǒu"
3. **Source:** s15 (header: 鬣 liè alone means mane or bristles; spotted hyena is 斑鬣狗 bān liègǒu) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">liè</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">bān liègǒu</span>
4. **Source:** s15 (header: 鬣 liè alone means mane or bristles; spotted hyena is 斑鬣狗 bān liègǒu) [HTML]
   - BEFORE: <span class="serial-han">鬣</span>
   - AFTER: <span class="serial-han">斑鬣狗</span>
5. **Source:** s15 (header: 鬣 liè alone means mane or bristles; spotted hyena is 斑鬣狗 bān liègǒu) [HTML]
   - BEFORE: <span class="h" lang="zh">鬣</span><span class="py" lang="zh-Latn-pinyin">liè</span>
   - AFTER: <span class="h" lang="zh">斑鬣狗</span><span class="py" lang="zh-Latn-pinyin">bān liègǒu</span>
6. **Source:** s14, s12 (WRONG: bite force quotient 124 is below lion, wolf, tiger and Tasmanian devil; bone cracking is right) [HTML + v1]
   - BEFORE: jaws and teeth are proportionally <b>among the strongest of any living mammal</b>, built for cracking open the bones
   - AFTER: skull, jaws and teeth are <b>built to crack bone</b>, opening up the bones
7. **Source:** s8 (WRONG: Mathevon et al. 2010 found age and individual identity, rank only indirectly, no reliable sex signal) [HTML + v1]
   - BEFORE: encodes the caller's <b>age, sex, and dominance rank</b>, not amusement.
   - AFTER: carries the caller's <b>age and individual identity</b>, with hints of social rank, not amusement.
8. **Source:** s11, s9 (OK, narrowed: the commuting system is the Serengeti's, and individuals commute, not whole clans) [HTML + v1]
   - BEFORE: When local prey thins, a clan will travel well outside its own territory
   - AFTER: In the Serengeti, when local prey thins, hyenas travel well outside their own territory
9. **Source:** s13 (OK, narrowed to coalitions: Engh et al. 2004) [HTML + v1]
   - BEFORE: Spotted Hyenas track individual clan members and can recognize <b>third-party
   - AFTER: Spotted Hyenas track individual clan members and, when choosing sides in a fight, can recognize <b>third-party
10. **Source:** s8 (reference list: the giggle paper is Mathevon et al. 2010, not East and Turner) [HTML]
   - BEFORE: East &amp; Turner et al. · What the hyena
   - AFTER: Mathevon, N., Koralek, A., Weldele, M., Glickman, S. E. and Theunissen, F. E. (2010) · What the hyena
11. **Source:** s8 (template reference, author line fixed) [v1]
   - BEFORE: "label": "East & Turner et al. · What the hyena
   - AFTER: "label": "Mathevon, N., Koralek, A., Weldele, M., Glickman, S. E. and Theunissen, F. E. (2010) · What the hyena
12. **Source:** s9 (reference list: generic IUCN listing not tied to a claim; replaced with a source opened in the dossier) [HTML]
   - BEFORE: <li><a href="https://www.iucnredlist.org/species/5674/45194782" rel="noopener">IUCN Red List · Crocuta crocuta</a></li>
   - AFTER: <li><a href="https://ielc.libguides.com/sdzg/factsheets/spottedhyena/behavior-ecology" rel="noopener">San Diego Zoo Wildlife Alliance Library · Spotted hyena fact sheet</a></li>
13. **Source:** s11 (reference list: generic ADW listing replaced with the Hyaenidae Specialist Group page) [HTML]
   - BEFORE: <li><a href="https://animaldiversity.org/accounts/Crocuta_crocuta/" rel="noopener">Animal Diversity Web · Crocuta crocuta</a></li>
   - AFTER: <li><a href="https://www.hyaenidae.org/the-hyaenidae/spotted-hyena-crocuta-crocuta/crocuta-diet-and-foraging/" rel="noopener">IUCN SSC Hyaenidae Specialist Group · Spotted hyena diet and foraging</a></li>
14. **Source:** s9 (template reference, IUCN replaced) [v1]
   - BEFORE: "label": "IUCN Red List · Crocuta crocuta",\n        "href": "https://www.iucnredlist.org/species/5674/45194782"
   - AFTER: "label": "San Diego Zoo Wildlife Alliance Library · Spotted hyena fact sheet",\n        "href": "https://ielc.libguides.com/sdzg/factsheets/spottedhyena/behavior-ecology"
15. **Source:** s11 (template reference, ADW replaced) [v1]
   - BEFORE: "label": "Animal Diversity Web · Crocuta crocuta",\n        "href": "https://animaldiversity.org/accounts/Crocuta_crocuta/"
   - AFTER: "label": "IUCN SSC Hyaenidae Specialist Group · Spotted hyena diet and foraging",\n        "href": "https://www.hyaenidae.org/the-hyaenidae/spotted-hyena-crocuta-crocuta/crocuta-diet-and-foraging/"
16. **Source:** s10 (WRONG: rank is learned through maternal support over the juvenile years, not in the first week) [HTML]
   - BEFORE: Rank in a hyena clan passes from mother to cub before the cub is a week old. A cub born into a high line outranks adults three times its size from its first morning in the world, and it spends
   - AFTER: Rank in a hyena clan passes from mother to cub, learned through her backing over the cub's young years. A cub born into a high line comes to outrank adults far bigger than itself before it is grown, and it spends
17. **Source:** s11, s12 (OK, rephrased: up to 95 percent of what it eats is food, not prey) [HTML]
   - BEFORE: kills between sixty and ninety-five percent of its own prey.
   - AFTER: kills up to ninety-five percent of what it eats.
18. **Source:** internal (UNVERIFIABLE: lucky window said first quarter while the profile and moon section say Full Moon, and "Traditionally" claimed a tradition; aligned to Full Moon, made our reading) [HTML]
   - BEFORE: The first quarter belongs to you, that half-lit moon with one clean edge showing, half shadow and half exposed. The hyena hunts at night, not because it hides but because the dark is neutral ground, free of the audience that has been misreading it all day. Traditionally the first quarter is the moon of momentum, of moving on what you decided when the light was still new. It is also the phase a clan navigates most honestly: enough light to read the social ground, not so much that everything has to perform. Look for the rising half and move before it fills.
   - AFTER: The full moon belongs to you, the whole face lit with nothing held back. The hyena hunts at night, not because it hides but because the dark is neutral ground, free of the audience that has been misreading it all day. In our reading the full moon is the moon of standing in plain view, of claiming what you decided when the light was still new, and the night when a clan's social ground is easiest to read. Look for the full face and move while it lasts.
19. **Source:** internal (bond line aligned to the Full Moon power phase) [HTML]
   - BEFORE: Near the first quarter, let it out at full size.
   - AFTER: Near the full moon, let it out at full size.
   - Template: animalHan "鬣" to "斑鬣狗", animalHanPy "liè" to "bān liègǒu" (v1). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## leafcutter-ant

1. **Source:** s15, s8 (header: 蟻 yǐ is ant in general; the leafcutter's own name is 切葉蟻 qiēyèyǐ) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">蟻</span>
   - AFTER: <span class="rail__han" aria-hidden="true">切葉蟻</span>
2. **Source:** s15, s8 (header: 蟻 yǐ is ant in general; the leafcutter's own name is 切葉蟻 qiēyèyǐ); count: HTML x2 [HTML]
   - BEFORE: data-say="蟻" aria-label="Hear 蟻, yǐ"
   - AFTER: data-say="切葉蟻" aria-label="Hear 切葉蟻, qiēyèyǐ"
3. **Source:** s15, s8 (header: 蟻 yǐ is ant in general; the leafcutter's own name is 切葉蟻 qiēyèyǐ) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">yǐ</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">qiēyèyǐ</span>
4. **Source:** s15, s8 (header: 蟻 yǐ is ant in general; the leafcutter's own name is 切葉蟻 qiēyèyǐ) [HTML]
   - BEFORE: <span class="serial-han">蟻</span>
   - AFTER: <span class="serial-han">切葉蟻</span>
5. **Source:** s15, s8 (header: 蟻 yǐ is ant in general; the leafcutter's own name is 切葉蟻 qiēyèyǐ) [HTML]
   - BEFORE: <span class="h" lang="zh">蟻</span><span class="py" lang="zh-Latn-pinyin">yǐ</span>
   - AFTER: <span class="h" lang="zh">切葉蟻</span><span class="py" lang="zh-Latn-pinyin">qiēyèyǐ</span>
6. **Source:** s9, s11 (WRONG: adults feed on fluid from the fungal swellings and larvae eat the fungus; eight million not confirmed, SDZWA gives more than 5 million) [HTML + v2]
   - BEFORE: colonies of up to eight million workers, farming a fungus that no member of the colony has ever eaten directly.
   - AFTER: colonies of millions of workers, farming a fungus that feeds the whole colony: the larvae eat it, and the adults drink from its swellings.
7. **Source:** s12, s11 (frame: the foreleg test is unsupported; rejection is learned after the garden reacts) [HTML + v2]
   - BEFORE: the chemical testing of leaves before cutting,
   - AFTER: the colony learning to refuse leaves that harm its garden,
8. **Source:** s12 (trait title: rejection is learned, not a test before cutting) [HTML + v2]
   - BEFORE: Leaf testing
   - AFTER: Learning the leaf
9. **Source:** s12, s11 (WRONG: workers accept the leaf, then stop collecting it about 10 hours after it reaches the garden; avoidance lasts at least 9 weeks; foreleg-press test unsupported) [HTML + v2]
   - BEFORE: Before cutting, a leafcutter worker presses its forelegs against the leaf surface. <b>Chemical receptors on the antennae sample for secondary plant compounds</b> that would inhibit or kill the fungus garden. A leaf that fails the test is abandoned; the ant moves to the next one.
   - AFTER: Leafcutter workers <b>learn which leaves harm their fungus garden</b>. They carry a new plant in, and about 10 hours after it reaches the garden and the fungus reacts badly, they stop collecting it, an avoidance that lasts at least nine weeks.
10. **Source:** s12, s16 (reading rebuilt on the corrected fact; old line also broke the house style with a dash and a "not X, it is Y" shape) [HTML + v2]
   - BEFORE: You check before you commit, every time. <em>This is not hesitation — it is the test that keeps the garden alive.</em>
   - AFTER: You learn what harms the garden and you do not forget it. <em>The check you run now was paid for by an old mistake.</em>
11. **Source:** s12 (axis read: foreleg test replaced with learned rejection) [HTML + v2]
   - BEFORE: Workers test leaves before cutting by pressing forelegs against the surface; chemical receptors sample the leaf for compounds that would harm the fungus garden. A leaf that fails the test is rejected and the ant moves on.
   - AFTER: Workers learn which plants harm the fungus garden: about ten hours after a bad leaf reaches the garden they stop cutting that plant, and they keep away from it for weeks.
12. **Source:** s12 (mirror line: the ant does not check the leaf before cutting); count: HTML x2 [HTML + v2]
   - BEFORE: Before the cut, the ant checks the leaf — and so do you.
   - AFTER: The colony remembers which leaves hurt the garden, and so do you.
13. **Source:** s12 (mirror text: antennae test replaced with learned rejection) [HTML + v2]
   - BEFORE: The Leafcutter Ant holds a leaf fragment up before it cuts. Chemical receptors on its antennae sample the leaf for compounds that would harm the colony's garden. The ant takes seconds to check and moves on.
   - AFTER: When a leaf turns out to harm the colony's garden, leafcutter workers stop cutting that plant within about ten hours and stay clear of it for weeks.
14. **Source:** s10 (UNVERIFIABLE intent claim: rotation to prevent over-harvesting; SDZWA says trails stay in use for months or years) [HTML + v2]
   - BEFORE: that others follow, cutting vegetation from a rotating set of trees to prevent over-harvesting any single source.
   - AFTER: that others follow, and some trails stay in use for months or years.
15. **Source:** s13, s11 (WRONG: 50 times is a popular figure; the measured maximum in Atta cephalotes is 8.78 times body mass, JEB 2019) [HTML + v2]
   - BEFORE: carry <b>fragments weighing up to 50 times their own body weight</b>.
   - AFTER: carry <b>leaf fragments several times their own body weight</b>, and the heaviest load measured in one study was 8.78 times the carrier's mass.
16. **Source:** s14, s10, s11 (WRONG: waste workers stay out, no groom-and-return; vented and within hours unsourced) [HTML + v2]
   - BEFORE: , often vented to the outside. Workers who handle waste are separated from garden tenders until they have groomed themselves. Contaminated material is removed within hours.
   - AFTER: . The workers who handle waste stay in the dump and hardly ever leave it, and nestmates turn on a contaminated worker that strays back toward the garden.
17. **Source:** s14 (mirror text: vented chambers and grooming return unsourced) [HTML + v2]
   - BEFORE: Infected leaf material is moved to dedicated waste chambers vented away from the fungus garden. Workers who handle waste do not return to tend the garden without intermediate grooming.
   - AFTER: Spent and infected material goes to dedicated waste chambers away from the fungus garden. Workers who handle waste stay there and do not go back to tend the garden.
18. **Source:** s9 (WRONG: leafcutter ants are not assessed by IUCN; citation replaced with SDZWA, which says so) [HTML]
   - BEFORE: <li><a href="https://www.iucnredlist.org/species/157584/738380" rel="noopener">IUCN Red List · Atta cephalotes</a></li>
   - AFTER: <li><a href="https://ielc.libguides.com/sdzg/factsheets/leafcutter-ant/summary" rel="noopener">San Diego Zoo Wildlife Alliance Library · Leafcutter ant fact sheet</a></li>
19. **Source:** s9 (template reference, IUCN replaced) [v2]
   - BEFORE: "label": "IUCN Red List · Atta cephalotes",\n        "href": "https://www.iucnredlist.org/species/157584/738380"
   - AFTER: "label": "San Diego Zoo Wildlife Alliance Library · Leafcutter ant fact sheet",\n        "href": "https://ielc.libguides.com/sdzg/factsheets/leafcutter-ant/summary"
   - Template: animalHan "蟻" to "切葉蟻", animalHanPy "yǐ" to "qiēyèyǐ" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## Header check

- trapdoor-spider: 門 mén (door) to 螲蟷 diédāng, the classical name (Bencao Shiyi). Dossier also gives the modern descriptive 活板門蛛 huóbǎnmén zhū.
- cleaner-wrasse: 站 zhàn (station, the archetype word) to 裂唇魚 lièchúnyú (split-lip fish). Dossier spaces it lièchún yú; joined form used to match the brief and earlier rounds.
- spotted-hyena: 鬣 liè (mane, bristles) to 斑鬣狗 bān liègǒu. Dossier would also accept the shorter 鬣狗 liègǒu; the full species name was used.
- leafcutter-ant: 蟻 yǐ (ant, correct but generic, audit OK) to 切葉蟻 qiēyèyǐ, the leafcutter's own name.

## Not changed, and why

- trapdoor-spider "built to last decades" in the lead: Number 16 kept one burrow about 43 years. Kept.
- trapdoor-spider Foelix (2011) Biology of Spiders reference: real textbook, not flagged. Kept. The IUCN search link (labelled "Ctenizidae (Trapdoor Spiders)") and Main (1957) Aganippe were swapped for two sources opened in the dossier (s9, s8). "Last reviewed 2026-07-11" left as is.
- trapdoor-spider proverb 厚積薄發 hòu jī bó fā: audit OK; a Su Shi credit could be added in a copy pass.
- cleaner-wrasse fact 06 "witnessed cheating events affect subsequent client queuing behavior": audit OK (Bshary and Grutter 2006). Kept.
- cleaner-wrasse IUCN Red List Labroides dimidiatus reference: valid species, no claim rests on it. Kept.
- cleaner-wrasse proverb 守望相助 shǒu wàng xiāng zhù: audit OK; a Mencius credit could be added.
- spotted-hyena stillness axis "territory can run past a thousand square kilometres": not in the audit. Kept, worth a check.
- spotted-hyena "a cub born into a high line comes to outrank adults far bigger than itself": the old "three times its size" was cut with the first-week claim; outranking larger immigrant males is sourced (s9, s10).
- spotted-hyena v2 template: unfilled stub, nothing to edit. Owner may want it filled with the corrected v1 content.
- spotted-hyena lucky window: the paragraph keeps its existing sentence "not because it hides but because the dark is neutral ground"; that shape predates this pass.
- leafcutter-ant shareLine and keepsake "including what I have not eaten yet": about the reader, not the ant. Kept.
- leafcutter-ant trait 01 "do not eat the leaves": audit OK. Kept.
- leafcutter-ant em dashes and "not X, it is Y" lines in other Our reading copy (audit style note): only the leaf-testing reading was rewritten, since its fact changed. The rest is left for the copy pass, as in earlier rounds.
- All four pages: the shared awaken section shows 紫微斗数 with simplified 数; it is site-wide template copy, not a page fact, and was left for a sitewide pass.

## Structure check

All four pages parse with python html.parser, and the full HTML tag sequence matches the backups. Every JSON-LD and application/json block parses (4 per page). All edited template JSON loads and nested keysets are unchanged (raw text edits, same format). No leftover old header glyph in any header slot (rail__han, serial-han, keepsake .h, data-say). No new em dash, en dash or arrow in new text; no banned words; every new hanzi carries pinyin; no escaped <b>. No CSS or JS touched. Git not run.

## Final header characters

- trapdoor-spider: 螲蟷 diédāng (was 門 mén)
- cleaner-wrasse: 裂唇魚 lièchúnyú (was 站 zhàn)
- spotted-hyena: 斑鬣狗 bān liègǒu (was 鬣 liè)
- leafcutter-ant: 切葉蟻 qiēyèyǐ (was 蟻 yǐ)
