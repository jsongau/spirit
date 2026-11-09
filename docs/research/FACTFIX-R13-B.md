# FACTFIX-R13-B change log

Date: 2026-11-08. Pages: bongo, bat-eared-fox, golden-lion-tamarin, dragonfly, penduline-tit.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). Where a string occurred more than once in a file every occurrence was replaced (counts noted). Bongo and golden-lion-tamarin have v1 and v2; bat-eared-fox has v1 only; dragonfly and penduline-tit have v2 only. The golden-lion-tamarin v2 file is an unfilled scaffold (animalHan reads "TODO: one hanzi for the creature", 243 TODO fields) and none of the audited strings occur in it; it was left untouched.
Backups of the original pages: `~/factfix-backup-r13b/<slug>.html`; original template JSON in `~/factfix-backup-r13b/tpl/v1/` and `~/factfix-backup-r13b/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site. Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. `tools/han-pinyin.json` updated for the four changed headers (fresh read-modify-write at the end, only these four keys touched).
Purple Star: only bongo assigned stars to its crossing ("read for the Taurus Pig crossing it keeps landing on the same two", "Purple Star tends to seat", "Purple Star often seats", "the outline the Taurus Pig tends to share"). Reworded as Zodi Animal's own reading with the sentences used in R12-B ("and Zodi Animal reads the <crossing> through two of them", "That is our outline for the <crossing>"). The honest fine print was already there; kept. Bat-eared-fox, golden-lion-tamarin, dragonfly and penduline-tit name no star (only the cast-your-chart line). Star labels not touched.

## bongo

1. **Source:** s13 (header: 羚 líng is the generic antelope element; the bongo is 紫羚 zǐlíng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">羚</span>
   - AFTER: <span class="rail__han" aria-hidden="true">紫羚</span>
2. **Source:** s13 (header (rail + keepsake buttons); count: HTML x2) [HTML]
   - BEFORE: data-say="羚" aria-label="Hear 羚, líng"
   - AFTER: data-say="紫羚" aria-label="Hear 紫羚, zǐlíng"
3. **Source:** s13 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">líng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">zǐlíng</span>
4. **Source:** s13 (header) [HTML]
   - BEFORE: <span class="serial-han">羚</span>
   - AFTER: <span class="serial-han">紫羚</span>
5. **Source:** s13 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">羚</span><span class="py" lang="zh-Latn-pinyin">líng</span>
   - AFTER: <span class="h" lang="zh">紫羚</span><span class="py" lang="zh-Latn-pinyin">zǐlíng</span>
6. **Source:** s4, s5, s6, s8 (WRONG: Gibbon et al. 2015 tested flank stripes and side profile only; facial markings and horns not tested) [HTML + v1 + v2]
   - BEFORE: researchers now use the flank pattern, alongside facial markings and horn shape, to identify single wild bongos from camera-trap photographs.
   - AFTER: researchers now use mainly the flank stripes to identify single wild bongos from camera-trap photographs.
7. **Source:** s4, s5 (soften: disruptive camouflage is interpretation; sources say the stripes help it blend in) [HTML + v1 + v2]
   - BEFORE: functions as disruptive camouflage</b> in the patchwork of light and shadow under a closed forest canopy, breaking up the outline
   - AFTER: is thought to work as camouflage</b> in the patchwork of light and shadow under a closed forest canopy, helping break up the outline
8. **Source:** s6 (UNVERIFIABLE: no source ties pale tips to age; horns are yellow-tipped) [HTML + v1 + v2]
   - BEFORE: As a Bongo matures, <b>the tips of its horns lose pigment and pale to an ivory color</b>, a visible mark of age carried on the one part of the body that shows above the brush.
   - AFTER: The Bongo's spiral horns <b>end in pale, yellowish tips</b>, carried on the one part of the body that shows above the brush.
9. **Source:** s6 (reading under the corrected fact (age claim removed)) [HTML + v1 + v2]
   - BEFORE: Whatever proof you have of your own history shows only at the very top
   - AFTER: What anyone sees of you shows only at the very top
10. **Source:** s14 (Purple Star lead: no traditional basis for a sign plus year star pairing) [HTML + v2]
   - BEFORE: and read for the Taurus Pig crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Taurus Pig crossing through two of them.
11. **Source:** s14, s4, s5 (Purple Star: tendency claim made our reading; bongo is mostly, not only, nocturnal) [HTML + v2]
   - BEFORE: For a Taurus born in the Pig year, Purple Star tends to seat the Moon star deep in the chart, and it is no accident that its brightest hour is night, the same hour the Bongo actually moves.
   - AFTER: In our reading for a Taurus born in the Pig year, the Moon star sits deep in the chart, and its brightest hour is night, the hour the Bongo mostly moves.
12. **Source:** s14 (Purple Star: placement claim made our reading) [HTML + v2]
   - BEFORE: Near the palace that reads temperament, Purple Star often seats the Contentment star for this exact crossing,
   - AFTER: Near the palace that reads temperament, our reading seats the Contentment star for this crossing,
13. **Source:** s14 (Purple Star close: tendency claim made our reading) [HTML + v2]
   - BEFORE: That is the outline the Taurus Pig tends to share:
   - AFTER: That is our outline for the Taurus Pig crossing:
   - Template: animalHan "羚" to "紫羚", animalHanPy "líng" to "zǐlíng" (v1 + v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## bat-eared-fox

1. **Source:** s11 (header: 狐 hú is generic fox; species name 大耳狐 dà'ěrhú) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">狐</span>
   - AFTER: <span class="rail__han" aria-hidden="true">大耳狐</span>
2. **Source:** s11 (header (rail + keepsake buttons); count: HTML x2) [HTML]
   - BEFORE: data-say="狐" aria-label="Hear 狐, hú"
   - AFTER: data-say="大耳狐" aria-label="Hear 大耳狐, dà'ěrhú"
3. **Source:** s11 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">hú</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">dà'ěrhú</span>
4. **Source:** s11 (header) [HTML]
   - BEFORE: <span class="serial-han">狐</span>
   - AFTER: <span class="serial-han">大耳狐</span>
5. **Source:** s11 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">狐</span><span class="py" lang="zh-Latn-pinyin">hú</span>
   - AFTER: <span class="h" lang="zh">大耳狐</span><span class="py" lang="zh-Latn-pinyin">dà'ěrhú</span>
6. **Source:** s6, s7 (UNVERIFIABLE comparative: say more than the mother) [HTML + v1]
   - BEFORE: than almost any other wild dog
   - AFTER: than the mother
7. **Source:** s6, s7 (UNVERIFIABLE: no source rotates each ear independently or to an exact source; it forages with ears tilted forward) [HTML + v1]
   - BEFORE: Each ear <b>rotates independently</b> to track a sound to its exact source, letting the fox aim its whole attention at one signal inside a field of noise.
   - AFTER: It forages with <b>its huge ears tilted forward</b> over the ground, aiming its whole attention at one signal inside a field of noise.
8. **Source:** s5, s6, s7 (WRONG: it forages nose close to the ground; mainly by hearing, helped by smell) [HTML + v1]
   - BEFORE: located by ear rather than by scent or sight.
   - AFTER: found mainly by ear, helped by its nose.
9. **Source:** s5, s6, s7 (drop unsourced ears-and-shoulders grooming detail) [HTML + v1]
   - BEFORE: grooming each other along the ears and shoulders through the night.
   - AFTER: grooming each other.
10. **Source:** s5, s6, s7 (axis read: same unsourced grooming detail) [HTML + v1]
   - BEFORE: and grooms her along the ears and shoulders at the end of a long night.
   - AFTER: and grooms her.
11. **Source:** s7, s8 (trait title: no fox breaks open mounds) [HTML + v1]
   - BEFORE: The mound raid
   - AFTER: The shared patch
12. **Source:** s7, s8 (WRONG: harvester termites are taken at the surface; families gather at rich patches, up to 15 animals) [HTML + v1]
   - BEFORE: When a family finds a termite mound, <b>one fox breaks it open and the whole group feeds together</b> on the insects that pour out before they can retreat underground.
   - AFTER: Where harvester termites are thick on the ground, <b>several families gather and feed side by side</b>, sometimes up to fifteen foxes at one rich patch.
   - Template: animalHan "狐" to "大耳狐", animalHanPy "hú" to "dà'ěrhú" (v1). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## golden-lion-tamarin

1. **Source:** s9, s10 (header: 猴 hóu is monkey and the Monkey zodiac glyph; Chinese name 金獅面狨 jīn shīmiànróng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">猴</span>
   - AFTER: <span class="rail__han" aria-hidden="true">金獅面狨</span>
2. **Source:** s9, s10 (header (rail + keepsake buttons); count: HTML x2) [HTML]
   - BEFORE: data-say="猴" aria-label="Hear 猴, hóu"
   - AFTER: data-say="金獅面狨" aria-label="Hear 金獅面狨, jīn shīmiànróng"
3. **Source:** s9, s10 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">hóu</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">jīn shīmiànróng</span>
4. **Source:** s9, s10 (header) [HTML]
   - BEFORE: <span class="serial-han">猴</span>
   - AFTER: <span class="serial-han">金獅面狨</span>
5. **Source:** s9, s10 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">猴</span><span class="py" lang="zh-Latn-pinyin">hóu</span>
   - AFTER: <span class="h" lang="zh">金獅面狨</span><span class="py" lang="zh-Latn-pinyin">jīn shīmiànróng</span>
6. **Source:** s5, s6, s12 (WRONG: groups use 40+ sleeping sites; tree holes about 64% of nights) [HTML + v1]
   - BEFORE: that sleeps in the same tree hollow every night of its life,
   - AFTER: that sleeps most nights in a tree hollow, one of dozens its group knows,
7. **Source:** s5, s6 (cut unsourced clause (does not dim in shade)) [HTML + v1]
   - BEFORE: <b>The mane gives the species its name</b> and does not dim in shade.
   - AFTER: <b>The mane gives the species its name</b>.
8. **Source:** s5, s6, s12 (tree holes on most nights, spread across many sites) [HTML + v1]
   - BEFORE: The species sleeps in <b>tree holes for warmth and protection</b> on a strict schedule
   - AFTER: The species sleeps mostly in <b>tree holes for warmth and protection</b>, spread across many sites, on a strict schedule
9. **Source:** s6, s12 (reading under corrected fact (not one same place)) [HTML + v1]
   - BEFORE: You need one place to end the day in, and it needs to be the same place.
   - AFTER: You need a safe place to end the day in, and you know exactly which ones qualify.
10. **Source:** s6, s12 (axis read: one hollow) [HTML + v1]
   - BEFORE: inside the one hollow you already know
   - AFTER: inside a hollow you already know
11. **Source:** s6, s12 (axis read: same hollow) [HTML + v1]
   - BEFORE: the same hours, the same hollow, the same handful of people
   - AFTER: the same hours, the same few hollows, the same handful of people
12. **Source:** s6, s12 (Element: same hollow every night) [HTML + v1]
   - BEFORE: the same hollow every night,
   - AFTER: a known hollow every night,
13. **Source:** s5, s6, s12 (Ideal Habitat lede: same tree hole every night; 10 to 30 m is range use, not sleeping height) [HTML + v1]
   - BEFORE: sleeps in the same tree hole every night, ten to thirty meters up, and defends
   - AFTER: sleeps most nights in a tree hole, one of the many sites its group uses, and defends
14. **Source:** s6, s12 (palette: the tree hole every night) [HTML + v1]
   - BEFORE: the color of the tree hole you return to every night.
   - AFTER: the color of the tree holes you return to at dusk.
15. **Source:** s5, s6, s12 (feng shui bedroom: one hole every night of its life) [HTML + v1]
   - BEFORE: This animal returns to one hole in the wood every night of its life; yours should be exactly that fixed.
   - AFTER: This animal turns in at dusk, most nights inside a hole in the wood; your hour should be just as fixed.
16. **Source:** s5, s6 (soften father clause (mother nurses and carries first four weeks)) [HTML + v1]
   - BEFORE: with the father usually doing the largest share.
   - AFTER: with the father and older siblings taking on much of the carrying.
   - Template: animalHan "猴" to "金獅面狨", animalHanPy "hóu" to "jīn shīmiànróng" (v1). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## dragonfly

1. **Source:** s14, s15 (header: 準 zhǔn means accurate; the animal is 蜻蜓 qīngtíng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">準</span>
   - AFTER: <span class="rail__han" aria-hidden="true">蜻蜓</span>
2. **Source:** s14, s15 (header (rail + keepsake buttons); count: HTML x2) [HTML]
   - BEFORE: data-say="準" aria-label="Hear 準, zhǔn"
   - AFTER: data-say="蜻蜓" aria-label="Hear 蜻蜓, qīngtíng"
3. **Source:** s14, s15 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">zhǔn</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">qīngtíng</span>
4. **Source:** s14, s15 (header) [HTML]
   - BEFORE: <span class="serial-han">準</span>
   - AFTER: <span class="serial-han">蜻蜓</span>
5. **Source:** s14, s15 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">準</span><span class="py" lang="zh-Latn-pinyin">zhǔn</span>
   - AFTER: <span class="h" lang="zh">蜻蜓</span><span class="py" lang="zh-Latn-pinyin">qīngtíng</span>
6. **Source:** s11, s6, s10 (meta, og, JSON-LD: 92.1% in lab trials; 95% overstated; count: HTML x4) [HTML + v2]
   - BEFORE: The Precision Striker: 95% hunting success, total stillness before the strike.
   - AFTER: The Precision Striker: more than 90% hunting success in lab trials, total stillness before the strike.
7. **Source:** s6, s11 (hero: 90% motionless unsourced; most accurate predator superlative unsourced) [HTML + v2]
   - BEFORE: Motionless ninety percent of the time, then the most accurate predator on the wing.
   - AFTER: Motionless on the perch, then one of the most accurate hunters on the wing.
8. **Source:** s6 (WRONG: 300+ million years are griffenflies; true dragonflies from the Early Jurassic) [HTML + v2]
   - BEFORE: dragonflies have been hunting at the edges of still water for more than three hundred million years, wing architecture essentially unchanged.
   - AFTER: true dragonflies have hunted at the edges of still water since the Early Jurassic, about 200 million years, and their griffenfly relatives flew 325 million years ago.
9. **Source:** s11, s10 (frame: 95% and highest of any predator unsourced) [HTML + v2]
   - BEFORE: The dragonfly achieves a ninety-five percent hunting success rate — the highest recorded for any predator.
   - AFTER: In lab trials the dragonfly catches its prey more than ninety percent of the time.
10. **Source:** s11, s6, s10 (soften: 92.1% over 3,000+ lab trials; superlative and shark and lion figures unsourced) [HTML + v2]
   - BEFORE: Dragonflies achieve a <b>hunting success rate of approximately ninety-five percent</b> — the highest of any studied predator. Sharks succeed roughly half the time; lions closer to one in four.
   - AFTER: In lab trials, dragonflies <b>catch their prey more than ninety percent of the time</b>, across thousands of recorded attacks.
11. **Source:** s6, s10 (UNVERIFIABLE 97% and swarm of thousands; about 24,000 lenses per eye and target-locking neurons) [HTML + v2]
   - BEFORE: Dragonfly compound eyes cover <b>roughly ninety-seven percent of the visual field</b>, enabling nearly complete panoramic vision. A single dragonfly can select and track one target within a swarm of thousands.
   - AFTER: Each dragonfly compound eye holds <b>about 24,000 lenses</b>, giving it nearly complete panoramic vision, and neurons in its brain lock onto a single target and ignore the rest.
12. **Source:** s6, s10 (axis read (signature): same eye claim) [HTML + v2]
   - BEFORE: Dragonfly compound eyes cover roughly ninety-seven percent of the visual field, and a single dragonfly can lock onto one target within a swarm of hundreds.
   - AFTER: Each dragonfly compound eye holds about 24,000 lenses, and neurons in its brain lock onto one target and ignore the rest.
13. **Source:** s6 (soften: independent wings not in the opened source; wing pairs beat out of phase) [HTML + v2]
   - BEFORE: <b>four wings that operate independently</b>, enabling
   - AFTER: <b>four wings, the front and rear pairs able to beat out of phase</b>, enabling
14. **Source:** s6 (axis read: same wing claim) [HTML + v2]
   - BEFORE: The dragonfly's four wings operate independently, allowing it
   - AFTER: The dragonfly's front and rear wings can beat out of phase, allowing it
15. **Source:** s6 (narrow: nymph two months to five years; most adults a few weeks) [HTML + v2]
   - BEFORE: lasts <b>one to five years underwater</b> before the adult emerges for an aerial phase that may last only weeks to months.
   - AFTER: lasts <b>from two months to five years underwater</b> before the adult emerges for an aerial phase that usually lasts only a few weeks.
16. **Source:** s6 (axis read: nymph range) [HTML + v2]
   - BEFORE: lives underwater for one to five years before emerging
   - AFTER: lives underwater for two months to five years before emerging
17. **Source:** s6 (UNVERIFIABLE 90% perched; darners hunt on the wing; perching is a skimmer habit) [HTML + v2]
   - BEFORE: Adult dragonflies <b>spend more than ninety percent of their time perched and motionless</b>, typically on a high point
   - AFTER: Many dragonflies, the skimmers above all, <b>hunt from a perch, waiting motionless</b>, typically on a high point
18. **Source:** s6 (axis read: same 90% claim) [HTML + v2]
   - BEFORE: The dragonfly spends more than ninety percent of its adult life motionless on a reed or twig, conserving energy for the hunt.
   - AFTER: Many dragonflies, the skimmers above all, wait motionless on a reed or twig between hunts, conserving energy.
19. **Source:** s6 (proverb soul: same 90% claim) [HTML + v2]
   - BEFORE: The dragonfly spends ninety percent of its life on the perch, unmoving, preparing.
   - AFTER: A skimmer dragonfly spends long stretches on the perch, unmoving, preparing.
20. **Source:** s11 (Mirror: 95% figure) [HTML + v2]
   - BEFORE: it is where ninety-five percent of your accuracy comes from
   - AFTER: it is where most of your accuracy comes from
21. **Source:** s6 (trait title: form was not unchanged) [HTML + v2]
   - BEFORE: The Unchanged Form
   - AFTER: The Ancient Line
22. **Source:** s6 (WRONG: 325-million-year fossils are griffenflies, distant relatives) [HTML + v2]
   - BEFORE: Dragonflies appear in the fossil record as far back as <b>three hundred twenty-five million years ago</b>, with wing architecture nearly identical to modern species.
   - AFTER: Dragonfly-like griffenflies, only distant relatives, flew <b>325 million years ago</b>; true dragonflies first appear in the Early Jurassic, roughly 200 million years ago.
23. **Source:** s12 (WRONG citation: no such PNAS paper; real Combes 2012 is J Exp Biol 215:903 (label)) [HTML + v2]
   - BEFORE: Combes, S. A. et al. (2012). Dragonflies predict prey trajectory — PNAS 109(18)
   - AFTER: Combes, S. A. et al. (2012). Linking biomechanics and ecology through predator-prey interactions: flight performance of dragonflies and their prey · Journal of Experimental Biology 215:903
24. **Source:** s12 (WRONG citation (link)) [HTML + v2]
   - BEFORE: https://www.pnas.org/doi/10.1073/pnas.1207491109
   - AFTER: https://ui.adsabs.harvard.edu/abs/2012JExpB.215..903C
25. **Source:** s6 (trait title: independent wings not in the opened source) [HTML + v2]
   - BEFORE: The Independent Wings
   - AFTER: The Four Wings
26. **Source:** s11, s6, s10 (template FAQ: 95% figure) [v2]
   - BEFORE: It is named for the dragonfly's ninety-five percent hunting success rate,
   - AFTER: It is named for the dragonfly's hunting success, more than ninety percent in lab trials,
   - Template: animalHan "準" to "蜻蜓", animalHanPy "zhǔn" to "qīngtíng" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## penduline-tit

1. **Source:** s7, s8, s16 (meta, og, JSON-LD: the hidden real entrance is the Cape penduline tit; count: HTML x4) [HTML + v2]
   - BEFORE: and the bird that hides its real entrance.
   - AFTER: and the decoy door its African cousin builds.
2. **Source:** s6, s7, s8, s16 (WRONG species: Eurasian nest has one entrance tube near the top; false entrance is the Cape penduline tit) [HTML + v2]
   - BEFORE: It contains an architectural deception: a false entrance below, where a predator will investigate, and a real entrance above, where the young are. Two to three weeks of construction. Two openings. Only one of them leads anywhere.
   - AFTER: It is a felted purse with a single entrance tube near the top, and its African cousin, the Cape penduline tit, adds an architectural deception: a false entrance below, where a predator will investigate, and a real entrance above, where the young are. Two to three weeks of construction. In the cousin's nest, two openings, and only one of them leads anywhere.
3. **Source:** s6, s7, s8, s16 (WRONG species (trait 01)) [HTML + v2]
   - BEFORE: The Penduline Tit's woven nest contains <b>a false entrance tube at the base and a functional entrance at the top</b>; predators investigate the false entry while the active nest chamber sits safely above it.
   - AFTER: The Penduline Tit's woven nest has <b>a single entrance tube near the top</b>. The decoy-door trick belongs to its African cousin, the Cape penduline tit, whose nest has <b>a false entrance at the base and a functional entrance at the top</b>; predators investigate the false entry while the chamber sits safely above it.
4. **Source:** s6, s15, s16 (axis read (signature): two-entrance nest, catkins, false entrance) [HTML + v2]
   - BEFORE: Selecting, weaving, and hanging a two-entrance nest over water requires reading dozens of micro-decisions correctly: which branch will hold the weight, which catkin material will interlock, how to construct the false entrance so it reads as real from below.
   - AFTER: Selecting, weaving, and hanging a closed purse nest over water requires reading dozens of micro-decisions correctly: which branch will hold the weight, which plant down will felt together, how to shape the entrance tube so it holds its form.
5. **Source:** s6, s13, s14, s15 (axis read: male starts the nest and advertises; both may build) [HTML + v2]
   - BEFORE: the male builds the outer structure and must display it, but the female decides whether to complete the nest by lining the interior.
   - AFTER: the male starts the nest and must advertise from it, but the female decides whether to stay and help finish it.
6. **Source:** s10, s11, s12 (axis read: desertion flipped; each parent tries to leave first) [HTML + v2]
   - BEFORE: Migratory; either parent may abandon the clutch if the other deserts first.
   - AFTER: Migratory; each parent tends to try to desert the clutch first, leaving the other to raise it.
7. **Source:** s15 (axis read: descending not confirmed; long, thin, high call) [HTML + v2]
   - BEFORE: produces a thin descending whistle while doing so
   - AFTER: produces a long, thin, high call while doing so
8. **Source:** s6, s13, s14, s15, s16 (WRONG (overstated): male starts and advertises; both build; bigger builders do better; females chose by mask, not nest size) [HTML + v2]
   - BEFORE: The male Penduline Tit <b>constructs the outer structural shell of the nest before the female arrives</b>; the female assesses nest quality before completing the interior lining — and the quality of the construction is the selection criterion.
   - AFTER: The male Penduline Tit <b>starts the nest on his own and calls from it to attract a female</b>; both birds may then help build, and males that build bigger nests tend to do better.
9. **Source:** s6, s15, s7 (WRONG in part: spider silk is the Cape penduline tit; thermal-selection clause unverifiable) [HTML + v2]
   - BEFORE: The nest is woven primarily from <b>willow and poplar catkins, plant fibers, and spider silk</b> over two to three weeks; the male selects materials for their structural and thermal properties, not for their appearance.
   - AFTER: The nest is felted from <b>plant down and seed fluff, plant fibres and animal hair</b> over about two to three weeks.
10. **Source:** s10, s11, s12 (WRONG (flipped): each parent tends to try to desert first; females hide eggs; about a third deserted by both) [HTML + v2]
   - BEFORE: Either parent may abandon the clutch if the other deserts first — a behavior studied as a <b>game-theory problem in avian parental investment</b>, where each parent waits to confirm the other's commitment before fully committing.
   - AFTER: Only one parent cares for each clutch, and each tends to try to desert first, a race studied as <b>sexual conflict over parental care</b>: females may hide their eggs so they can slip away first, and about a third of clutches are deserted by both.
11. **Source:** s6, s15, s16 (cut unverifiable comparative; one foot grips while the other pulls seed) [HTML + v2]
   - BEFORE: , accessing food sources unavailable to larger or less agile birds.
   - AFTER: , one foot gripping the stem while the other pulls seed from the head.
12. **Source:** s15 (trait title: descending not confirmed) [HTML + v2]
   - BEFORE: The Thin Descending Whistle
   - AFTER: The Thin High Call
13. **Source:** s15 (soften: a drawn-out, high, sharp tsiiiiih; descending and group use not confirmed) [HTML + v2]
   - BEFORE: <b>a thin, descending whistle</b> — quiet, precise, and used as a contact call within close range of others in its group.
   - AFTER: <b>a long, thin, high call</b>, a drawn-out tsiiiih that is easy to pick out.
14. **Source:** s8 (Ideal Habitat: thermally stable unsourced) [HTML + v2]
   - BEFORE: deliberately inaccessible from below, thermally stable, architecturally precise.
   - AFTER: hard to reach from below, architecturally precise.
15. **Source:** s6 (feng shui bedroom: site chosen for thermal properties unsourced) [HTML + v2]
   - BEFORE: Thermally stable and quiet — the Penduline Tit chooses its building site partly for thermal properties.
   - AFTER: Thermally stable and quiet, like the inside of a thick felted nest.
16. **Source:** s7 (feng shui entry: real entrance belongs to the Cape penduline tit) [HTML + v2]
   - BEFORE: The Penduline Tit's real entrance requires knowing where to look.
   - AFTER: In its African cousin's nest, the real entrance requires knowing where to look.
17. **Source:** s10 (UNVERIFIABLE citation removed (Barta and Székely 1997 not found); replaced with Pogány et al. 2008 (label)) [HTML + v2]
   - BEFORE: Barta Z, Székely T — 'The optimal escape path of a parent deserting its clutch' · Behavioral Ecology 1997
   - AFTER: Pogány Á, Szentirmai I, Komdeur J, Székely T · 'Sexual conflict and consistency of offspring desertion in Eurasian penduline tit' · BMC Evolutionary Biology 2008
18. **Source:** s10 (citation link) [HTML + v2]
   - BEFORE: https://doi.org/10.1093/beheco/8.6.599
   - AFTER: https://pmc.ncbi.nlm.nih.gov/articles/PMC2535784
## Header check

- bongo: 羚 líng (generic antelope element) to 紫羚 zǐlíng (s13).
- bat-eared-fox: 狐 hú (fox in general) to 大耳狐 dà'ěrhú (s11). The proverb 狐假虎威 hú jiǎ hǔ wēi and its per-character 狐 button are the proverb, not the header, and were left alone.
- golden-lion-tamarin: 猴 hóu (monkey, and the Monkey zodiac glyph) to 金獅面狨 jīn shīmiànróng (s9, s10). The 猴 in the nav and in the mate plate "Aries × 猴 Monkey" belong to the zodiac, not the header; left alone.
- dragonfly: 準 zhǔn (accurate) to 蜻蜓 qīngtíng (s14, s15).
- penduline-tit: 攀雀 pānquè confirmed correct against s17, s18, s19 (genus and family name; same in traditional and simplified). No change.

## Penduline tit: where the concept still leans on the false claim

Every factual sentence (Animal fact cards, overture frame, axis reads stated as fact, meta and JSON-LD descriptions, feng shui notes) now matches the dossier. The page's concept, title and reading voice were not redesigned, as instructed. These places still build on the decoy door, which the Eurasian penduline tit does not make (it belongs to the Cape penduline tit, its African cousin), or on the old "wait for mutual commitment" framing. All are reading voice, not stated as animal fact, and are left for the owner's rewrite decision:

- Overture title "Builds what it hides. Hides what it builds." (HTML h2, v2 subtitle).
- Hero essence "You build the entrance to what matters with a false one facing out" (HTML, v2 heroStatement) and "Under pressure: You put the decoy in place before you know you are doing it."
- Trait 01 title "The Double Entrance" and its reading "You build your real access point in a different location than where people expect it to be." The fact card under it now says the decoy door is the cousin's trick.
- Trait 04 reading "You do not commit until you have confirmation that the commitment is mutual." The fact now says each parent tries to desert first, so this reading runs against it. Title "The Game-Theory Clutch" kept (sexual conflict over care is modelled with game theory).
- Trait 02 reading "You are chosen, and you choose, based on what has already been built" leans on nest quality as the female's test; Pogány and Székely 2007 found females chose by mask width, not nest size.
- Share line, card sub and keepsake identity "builds with care, hides the entrance, chooses the material before the mate" (HTML x2 plus card sub, v2 shareLine and cardSub).
- Dial read "the real entrance is well-hidden"; fusion read "the relationship is given enough access to the real chamber ... The entrance is findable."
- Mirror: "The False Entrance Goes First", "The Chamber Above the Decoy", "The false entrance keeps the real one safe", "who gets the real entrance", "You show the real entrance earlier"; ritual prompt and template "I show the real entrance when..."; growth stat "Show the real entrance earlier".
- Ideal Habitat "with the real entrance findable only to the right observer"; workbench card "The false entrance has no function here."; feng shui entry card (now credits the African cousin).
- Moon phase note "the outer shell is formed, the real entrance has been located".
- Bonds support "who can tell the difference between the false entrance and the real one"; heading "The temperaments that find the real entrance"; closer "Now find out who else has noticed the false entrance." (v2 closerTail); v2 share prompt "wonder out loud whether they can find the real entrance"; v2 stone notes "opening the real entrance", "what goes only as far as the false entrance".
- A truthful way out, if the owner wants to keep the idea: frame the decoy door openly as the African cousin's trick that the Eurasian bird is named alongside, or rebuild the concept on the true facts (the male starts the nest and calls from it; each parent races to leave first).

## Not changed, and why

- bongo palette names "Worn horn ivory" and "the color of a horn tip that has finally caught real light": colour names and reading voice, not the age claim. Kept.
- bongo "Females return to the same traditional calving grounds year after year" (rootedness axis): not in the audit. Kept.
- bongo Purple Star lead writes 紫微斗数 zǐwēi dǒushù with simplified 数 (traditional 數); outside this audit's facts, left for a sitewide pass. Classical star lore lines ("Classically this is the star of...") are general lore, kept.
- bat-eared-fox Element rel-title "Metal cuts Wood, as the claw opens the mound", its body "the moment you actually break the mound open", palette "the color of a mound broken open", trait 06 reading "call the people you trust to the opening before it closes", and "as the termite mounds nearby empty and refill" (rootedness axis): reading voice built on the old mound-raid image. The fact card is fixed; these are flagged for a copy pass.
- bat-eared-fox trait 02 title "The turning ears" kept (the ears do turn as body language, s6). Moon note "working almost entirely by ear rather than by sight" kept (sight, not scent).
- golden-lion-tamarin "ten to thirty meters up" in the trait 04 fact kept (ADW range use; the sentence speaks of the canopy, not the sleeping height). The habitat lede copy of the figure was dropped with the same-hole claim.
- golden-lion-tamarin "roughly 17 distinct calls": audit OK (ADW), kept. 15 to 21 (Wikipedia) is an option.
- golden-lion-tamarin reference "Food-offering calls in wild golden lion tamarins", PMC6300579: UNVERIFIABLE (fetch blocked); no card depends on it. A person should open the link.
- golden-lion-tamarin hollow images in reading voice ("keep the hollow tight", "guard the hollow", "a hollow that could hold your whole life") are metaphors, not the same-site claim. Kept.
- dragonfly Olberg et al. 2000 reference: UNVERIFIABLE in the audit, probably real (vol. 186); left for a person to check. Mischiati et al. 2015 confirmed, kept.
- dragonfly trait 06 reading "You do not redesign a system that works ... Constancy" still leans a little on the old unchanged-form idea; the title is now "The Ancient Line" and the fact is correct.
- dragonfly habitat "returns to the same perch" and other perch images: perch return is a skimmer habit and reading voice; kept. Proverb and match notes audit OK.
- dragonfly descriptions and v2 FAQ keep their existing em dash before "The Precision Striker" / "one of 144 combinations"; it was the anchor, not new text.
- penduline-tit Schulze-Hagen et al. 1996 and BirdLife 2018 references: UNVERIFIABLE in the audit (not opened). Left for a person to confirm. "Remiz pendulinus is migratory" and the catkin images kept (not flagged).
- Existing em dashes and "not X, it is Y" lines in reading copy on these pages were left for a copy pass. No new text adds any.

## Structure check

All five pages parse with python html.parser. The HTML tag sequence matches the backups on four pages; on penduline-tit the only difference is one added <b></b> pair inside the rewritten trait 01 fact (intended). Every JSON-LD and application/json block parses (4 per page). All edited template JSON loads and nested keysets match the backups (raw text edits, same format and trailing-newline state). No leftover old header glyph in any header slot. No new em dash, en dash or arrow in new text; no banned words; every new hanzi carries pinyin; no escaped <b>. No CSS or JS touched. Git not run.

## Final header characters

- bongo: 紫羚 zǐlíng (was 羚 líng)
- bat-eared-fox: 大耳狐 dà'ěrhú (was 狐 hú)
- golden-lion-tamarin: 金獅面狨 jīn shīmiànróng (was 猴 hóu)
- dragonfly: 蜻蜓 qīngtíng (was 準 zhǔn)
- penduline-tit: 攀雀 pānquè (unchanged, confirmed)
