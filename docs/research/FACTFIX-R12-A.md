# FACTFIX-R12-A change log

Date: 2026-11-08. Pages: devils-flower-mantis, dumbo-octopus, emperor-penguin, flamingo, flying-fish.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data file that holds the same string. The bracket after the source says where: HTML, v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). None of the five pages has a v1 template file; all five have v2. Where a string occurred more than once in a file every occurrence was replaced (counts noted as x2, x4).
Backups of the original pages: `~/factfix-backup-r12a/<slug>.html`; original template JSON in `~/factfix-backup-r12a/tpl/v2/` (`tpl/v1/` exists and is empty; all outside the repo).
Glyphs use traditional forms to match the site. Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. The button item counts x2 (rail + keepsake).
Purple Star: none of the five pages carries a star assignment or a "traditional pairing" line (checked HTML and templates; dossiers agree); only the generic chart-cast copy, which is already honest. Nothing changed. Related Animals explore-card labels not touched.

## devils-flower-mantis

1. **Source:** s15 (header: 花 huā means flower; species name 魔花螳螂 móhuā tángláng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">花</span>
   - AFTER: <span class="rail__han" aria-hidden="true">魔花螳螂</span>
2. **Source:** s15 (header: 花 huā means flower; species name 魔花螳螂 móhuā tángláng) [HTML x2]
   - BEFORE: data-say="花" aria-label="Hear 花, huā"
   - AFTER: data-say="魔花螳螂" aria-label="Hear 魔花螳螂, móhuā tángláng"
3. **Source:** s15 (header: 花 huā means flower; species name 魔花螳螂 móhuā tángláng) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">huā</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">móhuā tángláng</span>
4. **Source:** s15 (header: 花 huā means flower; species name 魔花螳螂 móhuā tángláng) [HTML]
   - BEFORE: <span class="serial-han">花</span>
   - AFTER: <span class="serial-han">魔花螳螂</span>
5. **Source:** s15 (header: 花 huā means flower; species name 魔花螳螂 móhuā tángláng) [HTML]
   - BEFORE: <span class="h" lang="zh">花</span><span class="py" lang="zh-Latn-pinyin">huā</span>
   - AFTER: <span class="h" lang="zh">魔花螳螂</span><span class="py" lang="zh-Latn-pinyin">móhuā tángláng</span>
6. **Source:** s6, s7 (WRONG: savanna woodland, not rainforest; petal pattern is on the front legs) [HTML + v2]
   - BEFORE: native to East African rainforests, whose entire body mimics an orchid or tropical flower with such precision that pollinators approach it as they would a bloom.
   - AFTER: native to the woodland savannas of East Africa, whose petal-colored front legs pass for a flower so well that pollinators approach it as they would a bloom.
7. **Source:** s6, s8 (frame repeats corrected facts (forelegs, captive cannibalism)) [HTML + v2]
   - BEFORE: The body that is a flower. The wings that open into a threat display.
   - AFTER: The forelegs that pass for a flower. The same forelegs raised in a threat display.
8. **Source:** s6, s8 (frame, soften cannibalism) [HTML + v2]
   - BEFORE: The female that consumes the male.
   - AFTER: The female that may consume the male.
9. **Source:** s6, s7 (trait title, flower is on the forelegs) [HTML + v2]
   - BEFORE: The flower body
   - AFTER: The flower forelegs
10. **Source:** s6, s7 (WRONG: overstated; petal pattern on the raptorial forelegs; lure kept) [HTML + v2]
   - BEFORE: Idolomantis diabolica mimics the appearance of an orchid or tropical flower across its <b>entire body</b> — legs, thorax, and abdomen are shaped and colored to resemble petals and sepals, drawing pollinators within striking range.
   - AFTER: Idolomantis diabolica carries the look of a flower on its <b>front legs</b>, which are flattened and patterned in petal colors. It holds still and lets bees, butterflies, flies and moths come within striking range.
11. **Source:** s6 (WRONG: display is raised forelegs baring the body's undersides; wings shifted side to side; palette) [HTML + v2]
   - BEFORE: it spreads its wings abruptly to reveal sudden, vivid patterning — red, black, and white — that startles potential predators. The same gesture that made it look like a flower now makes it look like a threat.
   - AFTER: it raises its front legs to bare the patterned undersides of its body in red, white, blue, purple and black, and shifts its wings from side to side to startle predators. The same forelegs that made it look like a flower now make it look like a threat.
12. **Source:** s8, s9, s10 (safer wording: only insects proven to see in 3D; species line unsourced) [HTML + v2]
   - BEFORE: Praying mantises are the <b>only invertebrates known to have stereoscopic (3D) vision</b>, confirmed by Rossel (1983) through experiments showing depth perception across a wide binocular field. In the Devil's Flower Mantis, this visual system serves both the camouflage and the strike.
   - AFTER: Praying mantises are the <b>only insects proven to have stereoscopic (3D) vision</b>, confirmed by Rossel (1983) through experiments showing depth perception across a wide binocular field. Mantises use it to judge how far away prey is before they strike.
13. **Source:** s8, s9, s10 (axis read, same) [HTML + v2]
   - BEFORE: Praying mantises are the only invertebrates with confirmed stereoscopic vision; they perceive depth and distance with a precision no other insect achieves.
   - AFTER: Praying mantises are the only insects proven to see in stereo; they judge depth and distance in a way no other insect has been shown to.
14. **Source:** s11 (WRONG: 30 to 180 ms unsourced; measured 60 to 290 ms in another species; hours and no preparation unsourced) [HTML + v2]
   - BEFORE: Praying mantis forelegs strike at speeds of <b>30 to 180 milliseconds</b> — among the fastest predatory movements in the insect world — after periods of complete stillness that can last hours. The strike is preceded by no visible preparatory movement.
   - AFTER: A praying mantis strike lasts <b>a fraction of a second</b>. One high-speed study of another species timed it at about 60 to 290 milliseconds, quicker against quicker prey. The strike comes out of stillness, with the mantis holding its pose until prey is in reach.
15. **Source:** s6, s8 (WRONG: females larger, not dramatically; cannibalism documented in captivity; headless mating is from other mantids) [HTML + v2]
   - BEFORE: Female Devil's Flower Mantises are <b>dramatically larger than males</b> and frequently consume males during or after mating. The male's nervous system can continue the act even after decapitation — the body proceeds without the head.
   - AFTER: Female Devil's Flower Mantises are <b>larger than males</b>, about 13 cm against 10, and in captivity they often eat the male. In other mantis species a male can keep mating even after the female has bitten off his head.
16. **Source:** s6, s7 (among flowers not in a source; say vegetation) [HTML + v2]
   - BEFORE: it occupies a position among flowers, waits without moving,
   - AFTER: it takes a position on vegetation, waits without moving,
17. **Source:** s6, s7 (axis read: habitat is savanna woodland; specialist on fast-flying pollinators) [HTML + v2]
   - BEFORE: its mimicry works only in the specific floral environments of East African rainforest.
   - AFTER: it hunts fast-flying pollinators in the woodland savannas of East Africa and ignores slow or crawling prey.
18. **Source:** s7 (axis read: hours of stillness unsourced) [HTML + v2]
   - BEFORE: motionless on a stem for hours
   - AFTER: motionless on a stem for long stretches
19. **Source:** s6, s7 (mirror: forest canopy inherits the habitat error) [HTML + v2]
   - BEFORE: a forest canopy with sufficient cover, the right flowering species, enough light
   - AFTER: open savanna woodland with sufficient cover, enough fast-flying prey, enough light
20. **Source:** s6, s7 (palette lede: forest canopy) [HTML + v2]
   - BEFORE: The Devil's Flower Mantis occupies the most visually complex part of its forest — the canopy where orchids bloom and pollinators move.
   - AFTER: The Devil's Flower Mantis hunts in the woodland savannas of East Africa, perched where pollinators move.
21. **Source:** s6, s7 (palette name (also its aria-label)) [HTML x2 + v2]
   - BEFORE: Forest canopy dark
   - AFTER: Savanna dusk dark
22. **Source:** s6, s7 (palette note) [HTML + v2]
   - BEFORE: The deep purple-black of the canopy at dusk
   - AFTER: The deep purple-black of the savanna woodland at dusk
23. **Source:** audit (unverifiable sources) (Prete 1999 not opened; replaced with s6) [HTML]
   - BEFORE: <li><a href="https://jhupbooks.press.jhu.edu/title/praying-mantids" rel="noopener">Prete, F.R. et al. (1999) — The Praying Mantids, Johns Hopkins University Press</a></li>
   - AFTER: <li><a href="https://en.wikipedia.org/wiki/Idolomantis_diabolica" rel="noopener">Idolomantis diabolica, Wikipedia</a></li>
24. **Source:** audit (unverifiable sources) (IUCN item linked only to the homepage; replaced with s7) [HTML]
   - BEFORE: <li><a href="https://www.iucn.org" rel="noopener">IUCN Mantodea Specialist Group — Idolomantis diabolica species account</a></li>
   - AFTER: <li><a href="https://thesmallermajority.com/2013/08/25/empusids/" rel="noopener">Naskrecki, P. (2013) Empusids, The Smaller Majority</a></li>
25. **Source:** audit (unverifiable sources) (template source label) [v2]
   - BEFORE: Prete, F.R. et al. (1999) — The Praying Mantids, Johns Hopkins University Press
   - AFTER: Idolomantis diabolica, Wikipedia
26. **Source:** audit (unverifiable sources) (template source href) [v2]
   - BEFORE: https://jhupbooks.press.jhu.edu/title/praying-mantids
   - AFTER: https://en.wikipedia.org/wiki/Idolomantis_diabolica
27. **Source:** audit (unverifiable sources) (template source label) [v2]
   - BEFORE: IUCN Mantodea Specialist Group — Idolomantis diabolica species account
   - AFTER: Naskrecki, P. (2013) Empusids, The Smaller Majority
28. **Source:** audit (unverifiable sources) (template source href) [v2]
   - BEFORE: https://www.iucn.org
   - AFTER: https://thesmallermajority.com/2013/08/25/empusids/
29. **Source:** s14 (proverb: traditional form 笑裡藏刀 xiào lǐ cáng dāo to match the zh-Hant block) [HTML]
   - BEFORE: <ruby class="hz">里<rt>lǐ</rt></ruby>
   - AFTER: <ruby class="hz">裡<rt>lǐ</rt></ruby>
30. **Source:** s14 (proverb: traditional form 笑裡藏刀 xiào lǐ cáng dāo to match the zh-Hant block) [HTML]
   - BEFORE: data-say="里" aria-label="里, lǐ, inside, within.
   - AFTER: data-say="裡" aria-label="裡, lǐ, inside, within.
31. **Source:** s14 (proverb: traditional form 笑裡藏刀 xiào lǐ cáng dāo to match the zh-Hant block) [HTML]
   - BEFORE: <span class="c" aria-hidden="true">里</span>
   - AFTER: <span class="c" aria-hidden="true">裡</span>
32. **Source:** s14 (proverb: traditional form 笑裡藏刀 xiào lǐ cáng dāo to match the zh-Hant block) [v2 x2]
   - BEFORE: 里
   - AFTER: 裡
   - Template: animalHan to "魔花螳螂", animalHanPy to "móhuā tángláng" (v2).

## dumbo-octopus

1. **Source:** s6 (meta description, og, JSON-LD x2, template description: one depth presented as the home) [HTML x4 + v2]
   - BEFORE: the deep-sea cephalopod who flaps through total darkness at 13,000 feet.
   - AFTER: the deep-sea cephalopod who flaps through total darkness at 13,000 feet and deeper.
2. **Source:** s6 (test title, same) [HTML + v2]
   - BEFORE: perceives in total darkness at 13,000 feet?
   - AFTER: perceives in total darkness at 13,000 feet and deeper?
3. **Source:** s6 (hero, same) [HTML + v2]
   - BEFORE: It lives at 13,000 feet.
   - AFTER: It lives down to 13,000 feet and beyond.
4. **Source:** s6, s10 (WRONG: range mostly 1,000 m and deeper, to nearly 7,000; hadal zone dropped) [HTML + v2]
   - BEFORE: found at 3,000 to 4,000 meters depth, named for the ear-like fins it uses to drift through the water column of the hadal zone.
   - AFTER: found mostly 1,000 meters down and deeper, to nearly 7,000, named for the ear-like fins it uses to drift through the deep water column.
5. **Source:** s6 (template FAQ, same depth error) [v2]
   - BEFORE: living at 3,000 to 4,000 meters depth
   - AFTER: living mostly 1,000 meters down and deeper
6. **Source:** s6, s9 (WRONG: all finned (cirrate) octopuses swim with fins) [HTML + v2]
   - BEFORE: to maneuver through the water column — the only octopuses to use fins as primary locomotion rather than jet propulsion.
   - AFTER: to maneuver through the water column, and like other finned (cirrate) octopuses they swim mainly with fins rather than by jet propulsion.
7. **Source:** s7, s8, s6 (WRONG: confirmed record is 6,957 m (Java Trench, 2019)) [HTML + v2]
   - BEFORE: confirmed at depths exceeding 7,000 meters in some specimens — the extreme of any known cephalopod.
   - AFTER: filmed at 6,957 meters in the Java Trench in 2019, the deepest confirmed sighting of any cephalopod.
8. **Source:** s6, s9 (no ink sac OK; the reason is our inference, now labeled) [HTML + v2]
   - BEFORE: Dumbo octopuses lack the ink sac present in shallow-water octopuses — <b>the ink defense is absent</b> because bioluminescent darkness makes ink-based concealment functionally useless.
   - AFTER: Dumbo octopuses lack the ink sac present in shallow-water octopuses: <b>the ink defense is absent</b>. In water this dark a cloud of ink would hide little anyway, though that reason is our inference.
9. **Source:** s6 (continuous spawning confirmed mainly in related finned octopuses) [HTML + v2]
   - BEFORE: Female dumbo octopuses appear to <b>carry eggs at multiple stages of development simultaneously</b>, suggesting reproduction is continuous across the year rather than seasonal.
   - AFTER: Like related finned octopuses, female dumbo octopuses appear to <b>carry eggs at multiple stages of development simultaneously</b>, suggesting reproduction is continuous across the year rather than seasonal.
10. **Source:** s6, s13 (trait title: bioluminescent tuning unsourced) [HTML + v2]
   - BEFORE: Bioluminescent Perception
   - AFTER: Perception in the Dark
11. **Source:** s6, s13 (UNVERIFIABLE: tuned photoreceptors and calibrated nervous system unsourced; cut) [HTML + v2]
   - BEFORE: Adapted for <b>total darkness</b>, dumbo octopuses have modified photoreceptors tuned to bioluminescent wavelengths and a nervous system calibrated to detect pressure waves, chemical gradients, and light at the specific spectrum emitted by other deep-sea organisms.
   - AFTER: Dumbo octopuses live in <b>near-total darkness</b>, and little is known about how they sense it. One related dumbo, Cirrothauma murrayi, has eyes with no lens that cannot form images, which is why it is called the blind octopod.
12. **Source:** s6 (UNVERIFIABLE: no sighting count found; lifespan is estimated) [HTML + v2]
   - BEFORE: Science has encountered Grimpoteuthis species perhaps a few hundred times in total. <b>Almost nothing is known</b> about their lifespan, daily behavior, population size, or social patterns.
   - AFTER: Grimpoteuthis species are rarely seen alive, and <b>little is known</b> about them: no one has watched them mate or seen them feed directly. Their lifespan is estimated at only three to five years.
13. **Source:** s6, s10 (axis read: hadal zone and tuned photoreceptors) [HTML + v2]
   - BEFORE: to the extreme conditions of the hadal zone — no ink sac (useless in the dark), modified photoreceptors, pressure-resistant tissue.
   - AFTER: to the extreme conditions of the deep sea: no ink sac, fins for slow flight, a body that holds up under crushing pressure.
14. **Source:** s6, s13 (axis read: depth and photoreceptor claims) [HTML + v2]
   - BEFORE: At 3,000 to 4,000 meters, there is no visible light — only bioluminescence from other organisms. The dumbo octopus has photoreceptors tuned specifically to bioluminescent wavelengths, a modified nervous system that detects pressure changes and chemical gradients in the dark.
   - AFTER: A thousand meters down and deeper there is no sunlight, only bioluminescence from other organisms. How the dumbo octopus senses its world there is barely studied, yet it finds its way and its food in the dark.
15. **Source:** s7, s8 (guard text: deepest-living is the sourced superlative (x2 with proverb soul)) [HTML x2 + v2 x2]
   - BEFORE: the most adapted octopus on earth
   - AFTER: the deepest-living octopus on earth
16. **Source:** s6 (guard text: one depth as the home) [HTML + v2]
   - BEFORE: At 3,000 meters, the remote-operated vehicles are rare
   - AFTER: At depth, the remote-operated vehicles are rare
17. **Source:** s6, s13 (awakened text: depth and bioluminescent tuning) [HTML + v2]
   - BEFORE: The awakened dumbo octopus is still at 3,000 meters. It still reads bioluminescent frequencies.
   - AFTER: The awakened dumbo octopus is still in the deep. It still reads the dark.
18. **Source:** s6, s13 (gift text: tuned photoreceptor cut) [HTML + v2]
   - BEFORE: This is the bioluminescent photoreceptor running on its own calibration,
   - AFTER: This is the deep-sea sense running on its own calibration,
19. **Source:** s6, s13 (gift text: same) [HTML + v2]
   - BEFORE: like a pressure-adapted photoreceptor in full daylight
   - AFTER: like a deep-sea animal brought up into full daylight
20. **Source:** s6 (chakra text: no source that dumbos signal by bioluminescence) [HTML + v2]
   - BEFORE: The dumbo octopus in the dark water column, transmitting its bioluminescent signal in the only frequency that reaches its own kind, is the image here:
   - AFTER: The dumbo octopus, at home in the dark water column, is the image here:
21. **Source:** s6 (palette lede: depth) [HTML + v2]
   - BEFORE: The dumbo octopus inhabits 3,000 to 4,000 meters of water column
   - AFTER: The dumbo octopus lives a thousand meters down and deeper
22. **Source:** s10 (palette note: hadal zone) [HTML + v2]
   - BEFORE: The absolute dark of the hadal zone at depth
   - AFTER: The absolute dark of the deep sea
23. **Source:** s17 (WRONG: nuummite is not the oldest stone; parent rock about 2.8 billion years) [HTML + v2]
   - BEFORE: the oldest stone on earth, 3 billion years, formed under extreme pressure
   - AFTER: a Greenland stone whose parent rock formed about 2.8 billion years ago
24. **Source:** s16, s19 (UNVERIFIABLE: 靜水流深 jìng shuǐ liú shēn is a modern rendering of the English proverb, not a classical saying) [HTML]
   - BEFORE: A proverb we tie to the 
   - AFTER: A modern Chinese saying, rendered word for word from the English proverb 'still waters run deep', not a classical idiom. We tie it to the 
25. **Source:** s16, s19 (UNVERIFIABLE: 靜水流深 jìng shuǐ liú shēn is a modern rendering of the English proverb, not a classical saying) [v2]
   - BEFORE: A proverb we tie to the Year of the Monkey.
   - AFTER: A modern Chinese saying, rendered word for word from the English proverb 'still waters run deep', not a classical idiom. We tie it to the Year of the Monkey.
26. **Source:** s16, s19 (UNVERIFIABLE: 靜水流深 jìng shuǐ liú shēn is a modern rendering of the English proverb, not a classical saying) [HTML]
   - BEFORE: aria-label="The proverb of your year"
   - AFTER: aria-label="The saying of your year"
27. **Source:** s16, s19 (UNVERIFIABLE: 靜水流深 jìng shuǐ liú shēn is a modern rendering of the English proverb, not a classical saying) [HTML]
   - BEFORE: >The proverb of your year<
   - AFTER: >The saying of your year<
28. **Source:** s16, s19 (UNVERIFIABLE: 靜水流深 jìng shuǐ liú shēn is a modern rendering of the English proverb, not a classical saying) [HTML]
   - BEFORE: Hear the whole proverb read aloud
   - AFTER: Hear the whole saying read aloud
29. **Source:** s16, s19 (UNVERIFIABLE: 靜水流深 jìng shuǐ liú shēn is a modern rendering of the English proverb, not a classical saying) [HTML + v2]
   - BEFORE: this proverb as autobiography
   - AFTER: this saying as autobiography
30. **Source:** audit (unverifiable sources) (Villanueva 2002 is about shallow benthic octopuses; replaced with s6) [HTML]
   - BEFORE: <li><a href="https://www.tandfonline.com/doi/abs/10.1201/9780203180594.ch4" rel="noopener">Villanueva, R. et al. (2002) Biology of the Planktonic Stages of Benthic Octopuses · Oceanography and Marine Biology Annual Review</a></li>
   - AFTER: <li><a href="https://en.wikipedia.org/wiki/Grimpoteuthis" rel="noopener">Grimpoteuthis, Wikipedia</a></li>
31. **Source:** audit (unverifiable sources) (IUCN item linked only to the Red List homepage; replaced with s7) [HTML]
   - BEFORE: <li><a href="https://www.iucnredlist.org/" rel="noopener">IUCN Red List · Grimpoteuthis boylei</a></li>
   - AFTER: <li><a href="https://link.springer.com/article/10.1007/s00227-020-03701-1" rel="noopener">Jamieson, A.J. and Vecchione, M. (2020) First in situ observation of Cephalopoda at hadal depths · Marine Biology 167:82</a></li>
32. **Source:** audit (unverifiable sources) (template source label) [v2]
   - BEFORE: Villanueva, R. et al. (2002) Biology of the Planktonic Stages of Benthic Octopuses · Oceanography and Marine Biology Annual Review
   - AFTER: Grimpoteuthis, Wikipedia
33. **Source:** audit (unverifiable sources) (template source href) [v2]
   - BEFORE: https://www.tandfonline.com/doi/abs/10.1201/9780203180594.ch4
   - AFTER: https://en.wikipedia.org/wiki/Grimpoteuthis
34. **Source:** audit (unverifiable sources) (template source label) [v2]
   - BEFORE: IUCN Red List · Grimpoteuthis boylei
   - AFTER: Jamieson, A.J. and Vecchione, M. (2020) First in situ observation of Cephalopoda at hadal depths · Marine Biology 167:82
35. **Source:** audit (unverifiable sources) (template source href) [v2]
   - BEFORE: https://www.iucnredlist.org/
   - AFTER: https://link.springer.com/article/10.1007/s00227-020-03701-1

## emperor-penguin

1. **Source:** s15, s16 (header: 企 qǐ means stand on tiptoe, not penguin; species name 帝企鵝 dì qǐ'é) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">企</span>
   - AFTER: <span class="rail__han" aria-hidden="true">帝企鵝</span>
2. **Source:** s15, s16 (header: 企 qǐ means stand on tiptoe, not penguin; species name 帝企鵝 dì qǐ'é) [HTML x2]
   - BEFORE: data-say="企" aria-label="Hear 企, qǐ"
   - AFTER: data-say="帝企鵝" aria-label="Hear 帝企鵝, dì qǐ'é"
3. **Source:** s15, s16 (header: 企 qǐ means stand on tiptoe, not penguin; species name 帝企鵝 dì qǐ'é) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">qǐ</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">dì qǐ'é</span>
4. **Source:** s15, s16 (header: 企 qǐ means stand on tiptoe, not penguin; species name 帝企鵝 dì qǐ'é) [HTML]
   - BEFORE: <span class="serial-han">企</span>
   - AFTER: <span class="serial-han">帝企鵝</span>
5. **Source:** s15, s16 (header: 企 qǐ means stand on tiptoe, not penguin; species name 帝企鵝 dì qǐ'é) [HTML]
   - BEFORE: <span class="h" lang="zh">企</span><span class="py" lang="zh-Latn-pinyin">qǐ</span>
   - AFTER: <span class="h" lang="zh">帝企鵝</span><span class="py" lang="zh-Latn-pinyin">dì qǐ'é</span>
6. **Source:** s6, s7 (WRONG: incubation about 65 to 75 days; total fast about four months) [HTML + v2]
   - BEFORE: for roughly <b>64 to 66 days</b>, fasting the entire time on stored fat reserves.
   - AFTER: for about <b>65 to 75 days</b>, fasting the entire time on stored fat reserves. By the time the chick hatches, he has gone about four months without food.
7. **Source:** s6, s7 (trait title: incubation runs past two months) [HTML + v2]
   - BEFORE: Two months on his feet, without eating
   - AFTER: More than two months on his feet, without eating
8. **Source:** s7, s8 (intro understated the fast) [HTML + v2]
   - BEFORE: stands through roughly two months of fasting with a single egg balanced on its feet.
   - AFTER: stands through a fast of about four months, more than two of them with a single egg balanced on its feet.
9. **Source:** s6, s7 (axis read, incubation length) [HTML + v2]
   - BEFORE: stand nearly still for roughly two months straight
   - AFTER: stand nearly still for more than two months straight
10. **Source:** s6, s7 (axis read, incubation length) [HTML + v2]
   - BEFORE: holds its post for two months without abandoning it
   - AFTER: holds its post for more than two months without abandoning it
11. **Source:** s6, s7 (proverb soul, incubation length) [HTML + v2]
   - BEFORE: and two months of holding still
   - AFTER: and more than two months of holding still
12. **Source:** s10 (soften rotation: waves of small steps every 30 to 60 s; each bird gets time inside) [HTML + v2]
   - BEFORE: Huddling males cycle position continuously so no single bird holds the coldest, outermost edge for long;
   - AFTER: Huddling males shift in small waves of steps every 30 to 60 seconds, and over time the huddle reorganizes so each bird gets its turn inside;
13. **Source:** s10 (reading went beyond the evidence (never the same body twice)) [HTML + v2]
   - BEFORE: making sure the worst position never belongs to the same body twice
   - AFTER: making sure the worst position never belongs to the same body for long
14. **Source:** s13 (UNVERIFIABLE: nine-in-ten success rate not found; two-voice identity kept) [HTML + v2]
   - BEFORE: Each bird uses a distinctive two-frequency call to locate its own mate or chick inside a crowd of thousands, succeeding correctly in roughly <b>nine attempts out of ten</b>.
   - AFTER: Each bird uses a distinctive <b>two-frequency call</b> to locate its own mate or chick inside a crowd of thousands; the beat between its two voices carries who it is.
15. **Source:** s12 (nine per cm2 is the chest figure, not an overall average) [HTML + v2]
   - BEFORE: Body feather density averages roughly <b>nine feathers per square centimetre</b>, denser over the chest than the back,
   - AFTER: Contour feathers on the chest run to roughly <b>nine per square centimetre</b>, 30 to 50 percent denser than on the back,
16. **Source:** s9, s6 (-1.8 C water unsourced; deepest dive about 565 m) [HTML + v2]
   - BEFORE: deeper than any other bird, in water close to −1.8°C, on a single held breath.
   - AFTER: the deepest at about 565, deeper than any other bird, on a single held breath.
   - Template: animalHan to "帝企鵝", animalHanPy to "dì qǐ'é" (v2).

## flamingo

1. **Source:** s10, s15 (header: 烈 liè means ardent, not flamingo; species name 火烈鳥 huǒlièniǎo) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">烈</span>
   - AFTER: <span class="rail__han" aria-hidden="true">火烈鳥</span>
2. **Source:** s10, s15 (header: 烈 liè means ardent, not flamingo; species name 火烈鳥 huǒlièniǎo) [HTML x2]
   - BEFORE: data-say="烈" aria-label="Hear 烈, liè"
   - AFTER: data-say="火烈鳥" aria-label="Hear 火烈鳥, huǒlièniǎo"
3. **Source:** s10, s15 (header: 烈 liè means ardent, not flamingo; species name 火烈鳥 huǒlièniǎo) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">liè</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">huǒlièniǎo</span>
4. **Source:** s10, s15 (header: 烈 liè means ardent, not flamingo; species name 火烈鳥 huǒlièniǎo) [HTML]
   - BEFORE: <span class="serial-han">烈</span>
   - AFTER: <span class="serial-han">火烈鳥</span>
5. **Source:** s10, s15 (header: 烈 liè means ardent, not flamingo; species name 火烈鳥 huǒlièniǎo) [HTML]
   - BEFORE: <span class="h" lang="zh">烈</span><span class="py" lang="zh-Latn-pinyin">liè</span>
   - AFTER: <span class="h" lang="zh">火烈鳥</span><span class="py" lang="zh-Latn-pinyin">huǒlièniǎo</span>
6. **Source:** s6 (hot and cold climates clause unsourced; cut) [HTML + v2]
   - BEFORE: to hold</b>, in both hot and cold climates.
   - AFTER: to hold</b>.
7. **Source:** s11 (switching direction all at once not in the source; soften) [HTML + v2]
   - BEFORE: and tight marching formations that switch direction all at once, timed
   - AFTER: and tight group marching, timed
8. **Source:** s14, s6 (soften grey: chicks hatch with pale grey down) [HTML + v2]
   - BEFORE: chicks hatch grey,
   - AFTER: chicks hatch with pale grey down,
9. **Source:** s14 (soften: source says little competition from other species) [HTML + v2]
   - BEFORE: <b>lagoons and lakes too salty or alkaline for most other animals</b>, sharing the water with little besides the algae and brine shrimp they eat.
   - AFTER: <b>shallow salt or alkaline lakes and lagoons</b>, where they face little competition from other species.
10. **Source:** s14 (trait title, same) [HTML + v2]
   - BEFORE: Water too caustic for company
   - AFTER: Water with little competition
11. **Source:** s14 (intro, same) [HTML + v2]
   - BEFORE: salt lakes and lagoons too caustic for almost anything else,
   - AFTER: salt and alkaline lakes and lagoons where few other species compete,
12. **Source:** s14 (palette lede, same) [HTML + v2]
   - BEFORE: mineral-heavy water that keeps most other animals away,
   - AFTER: mineral-heavy water where it meets little competition,
13. **Source:** s11, s14 (overstated: the run is needed when the wind is not strong enough) [HTML + v2]
   - BEFORE: before its wings can carry it; it cannot simply rise from stillness.
   - AFTER: before its wings can carry it, unless a strong wind gives it the lift.
   - Template: animalHan to "火烈鳥", animalHanPy to "huǒlièniǎo" (v2).

## flying-fish

1. **Source:** s9, s12 (400 m is reached with updrafts or chained glides, not one glide; typical glide about 50 m) [HTML + v2]
   - BEFORE: covering distances of up to 400 meters in a single flight.
   - AFTER: usually about 50 meters a glide, and up to 400 meters when they ride updrafts or chain glides together.
2. **Source:** s10 (WRONG citation: Davenport 1994 is a review in Reviews in Fish Biology and Fisheries and gives no beat rate; numbers kept (s13, s12)) [HTML + v2]
   - BEFORE: building speed to approximately 60 km/h before breaking the surface — a behavior documented by Davenport (1994) in the Journal of Experimental Biology.
   - AFTER: building speed to approximately 60 km/h before breaking the surface.
3. **Source:** s10, s11, s9, s12 (WRONG: 45 s record filmed 2008 (NHK), not Davenport; typical glide about 50 m, 400 m only with updrafts or chained glides) [HTML + v2]
   - BEFORE: They can stay aloft for up to 45 seconds and cover distances of 50 to 400 meters in a single flight, according to measurements by Davenport (1994).
   - AFTER: A typical glide covers about 50 meters; riding updrafts and chaining glides, they can reach 400 meters, and one flight filmed in 2008 lasted 45 seconds.
4. **Source:** s10, s12 (predators are dolphinfish and squid, not dolphins; Shenker 1984 citation not found) [HTML + v2]
   - BEFORE: Dolphins, tuna, and other fast pelagic fish pursue them in the water; by leaving the water entirely, the flying fish exits the predator's medium. Documented by Shenker (1984) in Environmental Biology of Fishes.
   - AFTER: Dolphinfish (mahi-mahi), squid, and other fast hunters pursue them in the water; by leaving the water entirely, the flying fish exits the predator's medium. Davenport's 1994 review names escape from predators as the most likely reason they fly.
5. **Source:** s14 (trait title: camouflage claim cut) [HTML + v2]
   - BEFORE: The wing camouflage
   - AFTER: The fins that became wings
6. **Source:** s14 (UNVERIFIABLE: transparent or iridescent fins not sourced; E. volitans fins are greyish, many species dark or patterned) [HTML + v2]
   - BEFORE: The pectoral fins of flying fish are <b>often transparent or iridescent</b>, making them difficult to see in flight from above or below — a structural characteristic noted across the Exocoetidae family that contributes to survival during the glide phase.
   - AFTER: The pectoral fins of flying fish are <b>large enough to serve as wings</b>, and their look varies by species, from the greyish fins of Exocoetus volitans to the dark or patterned wings of many others.
7. **Source:** s14, s12 (UNVERIFIABLE: scatter effect not supported; soften to leaving the water together) [HTML + v2]
   - BEFORE: and multiple fish often take flight simultaneously when the school is threatened — creating a visual scatter effect that confuses predators. This social flight behavior is documented across the Exocoetidae family.
   - AFTER: and they often leave the water together; Exocoetus volitans is known for taking flight in shoals.
8. **Source:** s15 (Dragon Gate legend is about the carp, not any fish) [HTML + v2]
   - BEFORE: only a fish determined enough to leap it earns transformation. The Flying Fish does not wait
   - AFTER: only a carp determined enough to leap it earns transformation. The legend is told of the carp, but the Flying Fish does not wait
9. **Source:** s10, s12 (Shenker 1984 is a scombrid spawning paper; replaced with s12) [HTML]
   - BEFORE: <li><a href="https://doi.org/10.1007/BF00000857" rel="noopener">Shenker, J.M. (1984). Scombrid spawning in the Florida Current and its implications for larval recruitment. Environmental Biology of Fishes, 11(1), 21–39.</a></li>
   - AFTER: <li><a href="https://www.nationalgeographic.com/animals/fish/facts/flying-fish" rel="noopener">Flying fish. National Geographic.</a></li>
10. **Source:** s10, s12 (template source label) [v2]
   - BEFORE: Shenker, J.M. (1984). Scombrid spawning in the Florida Current and its implications for larval recruitment. Environmental Biology of Fishes, 11(1), 21–39.
   - AFTER: Flying fish. National Geographic.
11. **Source:** s10, s12 (template source href) [v2]
   - BEFORE: https://doi.org/10.1007/BF00000857
   - AFTER: https://www.nationalgeographic.com/animals/fish/facts/flying-fish

## Header check (kept glyphs)

- dumbo-octopus 小飛象章魚 xiǎofēixiàng zhāngyú: OK per dossier (popular name used by Greenpeace Taiwan); pinyin already in rail__py, keepsake .py and both button aria-labels. Unchanged.
- flying-fish 飛魚 fēiyú: OK per dossier. Unchanged.

## Not changed, and why

- devils-flower-mantis "Orchid stalk" palette name and "the warm gold of the orchid's center" palette note: palette imagery, not an audit item; the mantis mimics a flower generally, so an editor may want to drop "orchid" later.
- devils-flower-mantis Sexual cannibalism reading and "Rossel (1983)" source line kept (Rossel is a real, correct citation). chineseAnimal.hanzi "鸡" in the v2 template is simplified but is not the header; not touched.
- devils-flower-mantis proverb: tiles, ruby and template now use traditional 裡; the whole-proverb button speaks the English line, so there was no 笑里藏刀 string to change.
- dumbo-octopus rail labels "Your Proverb" (x2) kept as site-wide nav text; the section eyebrow, aria-label, hear button, note and soul now say "saying", and the note states it is a modern rendering of the English proverb, not a classical idiom. 深藏不露 shēn cáng bù lù (a native near-equivalent) not swapped in; owner choice.
- dumbo-octopus "3,000 meters" in the support palette note, the lesson text and "4,000 meters" in the proverb soul: inside the real depth range and no longer presented as the only home. Kept.
- dumbo-octopus "4 of five" / "5 of five" axis numerals and existing em dashes in reading copy: style items outside the corrected facts; no new text adds any.
- emperor-penguin "Feathers built for a fraction of a degree" trait title and 聞雞起舞 proverb: not flagged (proverb OK, s19). Han Ying's five virtues not added (new material, not a fix).
- flamingo 塞翁失馬 proverb: NOT AUDITED in the dossier (no primary source opened); left as is. "brine shrimp" simile in an axis read kept.
- flying-fish "multiple lengths of a ship" (chain glide) kept: harmless colour per dossier. Template palette "visually transparent" and "iridescent flash" stone notes are about crystals and the tail spark, not the fins; kept. Davenport 1994 source line is correct and kept. Wing reading "In transition, you are harder to track" kept as our-reading voice under the renamed trait.
- flying-fish existing em dashes in reading blocks and stale January 2026 moon dates (dossier style note): outside this fact pass; moon block is JS-rendered, no JS touched.

## Structure check

All five pages parse with python html.parser. Every JSON-LD and application/json block parses (4 per page). Section counts (31) and the full HTML tag sequence match the backups. All edited template JSON loads and nested keysets are unchanged (written with the same indent=2, ensure_ascii=False format and the same no-trailing-newline state they had). No old header glyph left in rail__han, serial-han, keepsake, data-say or aria-label on the three changed pages. No new em dash, en dash or arrow in any new text; no banned words; no escaped `<b>`; every new hanzi carries pinyin. No CSS or JS touched. Git not run. `tools/han-pinyin.json` updated for the three changed headers by a fresh read-modify-write touching only those keys.

## Final header characters

- devils-flower-mantis: 魔花螳螂 móhuā tángláng (was 花 huā)
- dumbo-octopus: 小飛象章魚 xiǎofēixiàng zhāngyú (unchanged)
- emperor-penguin: 帝企鵝 dì qǐ'é (was 企 qǐ)
- flamingo: 火烈鳥 huǒlièniǎo (was 烈 liè)
- flying-fish: 飛魚 fēiyú (unchanged)
