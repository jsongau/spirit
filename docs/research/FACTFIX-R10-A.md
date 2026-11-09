# FACTFIX-R10-A change log

Date: 2026-11-08. Pages: beaver, vampire-bat, sunbittern, stellers-sea-eagle, sonoran-desert-toad.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). Where a string occurred more than once in a file every occurrence was replaced (counts noted). Beaver has v1 only; vampire-bat and sonoran-desert-toad have v2 only; sunbittern and stellers-sea-eagle have both (sunbittern v2 is an unfilled stub: only its animalHan placeholder was filled).
Backups of the original pages: `~/factfix-backup-r10a/<slug>.html`; original template JSON in `~/factfix-backup-r10a/tpl/v1/` and `~/factfix-backup-r10a/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site. Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy.
Purple Star: none of the five pages carries a star assignment or a "traditional pairing" line (checked HTML and templates); only the generic "our outline for the <Sign Animal> crossing" copy, which is already honest. Nothing changed. Related Animals explore-card labels not touched.

## beaver

1. **Source:** s10 (near-sighted unverifiable, nocturnal OK) [HTML + v1]
   - BEFORE: A stocky, near-sighted rodent that redraws
   - AFTER: A stocky, night-working rodent that redraws
2. **Source:** s16, s10, s11 (frame repeats corrected facts) [HTML + v1]
   - BEFORE: engineers a dam to the exact speed of the current fighting it, builds a lodge meant to last generations,
   - AFTER: picks its dam site by the run of the stream and braces each stick against the current, builds a lodge it keeps repairing for years,
3. **Source:** s12, s13 (pigmented enamel is on the front face) [HTML + v1]
   - BEFORE: four front incisors are coated in <b>iron-fortified, orange enamel</b> and grow
   - AFTER: four front incisors are faced with <b>iron-fortified, orange enamel</b> and grow
4. **Source:** s14, s15, s16 (straight/curved rule unverifiable; replaced with site choice and tilted sticks) [HTML + v1]
   - BEFORE: Beavers build dams <b>straight in slow water and curved against fast water</b>, adjusting the structure's shape to the exact force of the current it has to hold back.
   - AFTER: Beavers choose a dam site by the slope and flow of the stream, and they <b>wedge their sticks tilted upstream</b>, braced against the current the dam has to hold back.
5. **Source:** s16 (axis read, same) [HTML + v1]
   - BEFORE: shaping the dam straight in slow water and curved in fast water to match the current it's fighting.
   - AFTER: choosing the site by the stream's flow and bracing each stick against the current it's fighting.
6. **Source:** s10, s11 (soften generations) [HTML + v1]
   - BEFORE: , and a colony will keep expanding the same lodge across several generations.
   - AFTER: , and a family keeps repairing and enlarging the same lodge for years, often with three generations living inside.
7. **Source:** s10, s11 (axis read, soften) [HTML + v1]
   - BEFORE: A beaver's lodge can stand and be added onto for generations,
   - AFTER: A beaver's lodge can stand and be added onto for years, often with three generations inside,
8. **Source:** s8, s9, s10 (drop paddle) [HTML + v1]
   - BEFORE: serves as a rudder and paddle in the water,
   - AFTER: serves as a rudder in the water,
9. **Source:** s8, s9, s10 (trait title, drop paddle) [HTML + v1]
   - BEFORE: The paddle tail's second job
   - AFTER: The flat tail's second job
10. **Source:** s17 (怨 yuàn is blame aimed at you; tile aria-label) [HTML]
   - BEFORE: aria-label="怨, yuàn, complaint, resentment. Tap to hear this character."
   - AFTER: aria-label="怨, yuàn, blame, resentment. Tap to hear this character."
11. **Source:** s17 (tile gloss) [HTML]
   - BEFORE: <span class="g" aria-hidden="true">complaint, resentment</span>
   - AFTER: <span class="g" aria-hidden="true">blame, resentment</span>
12. **Source:** s17 (template chars gloss) [HTML + v1]
   - BEFORE: complaint, resentment
   - AFTER: blame, resentment
13. **Source:** s17 (literal gloss) [HTML + v1]
   - BEFORE: bear labor, bear complaint
   - AFTER: bear the toil, bear the blame
14. **Source:** s17 (meaning; ox link dropped, no source) [HTML + v1]
   - BEFORE: To work hard and endure hardship without complaint, an idiom traditionally said of the ox and of anyone who takes on labor uncomplainingly.
   - AFTER: To take on the work and take the blame: to shoulder hard labor without shrinking from it, and without minding the resentment others aim at you for it.
15. **Source:** s17 (reading inverted the idiom; rebuilt on bearing the blame) [HTML + v1]
   - BEFORE: The saying is about labor, but you read it as a description of what gets left unsaid. You take on the hardship easily. It's the complaint you actually withhold, long after anyone would have forgiven you for voicing it. The dam holds because you keep quiet about what it costs to hold it. Bearing the work was never the hard part. Bearing it without a word was.
   - AFTER: The saying is about labor, and about what comes with it. You take on the hardship easily. What lands on you next is the grumbling of the people downstream, aimed at you for the very structure that keeps them dry, and you take that too. The dam holds because you keep holding it while others complain about the pond. The work you carry gladly. The blame is the heavier load, and you carry it anyway.

## vampire-bat

1. **Source:** s10, s11 (overstated) [HTML + v2]
   - BEFORE: It refuses to share with those who didn't.
   - AFTER: It shares most with those who shared back.
2. **Source:** s11, s13, s15 (soften) [HTML + v2]
   - BEFORE: bats who miss two consecutive meals die;
   - AFTER: a bat that goes two or three nights without a meal can starve;
3. **Source:** s10, s11, s12 (kin and non-kin) [HTML + v2]
   - BEFORE: <b>previously shared with them</b>, a documented case of non-kin reciprocal altruism in mammals.
   - AFTER: <b>previously shared with them</b>, and they share with kin and non-kin alike, a documented case of reciprocal help in mammals.
4. **Source:** s11, s13, s15 (soften) [HTML + v2]
   - BEFORE: A vampire bat that <b>misses two consecutive nights of feeding</b> will starve to death.
   - AFTER: A vampire bat that <b>goes two or three nights without feeding</b> can starve to death.
5. **Source:** s11, s13, s15 (60-hour figure has no primary source) [HTML + v2]
   - BEFORE: The 60-hour window
   - AFTER: The two-night window
6. **Source:** s14 (unverifiable, overstated) [HTML + v2]
   - BEFORE: Vampire bats <b>recognize individual roostmates by voice</b> and track sharing histories over periods of months. The social memory is specific and long.
   - AFTER: Each vampire bat's contact call <b>differs from its roostmates' calls</b>, with enough detail to tell one caller from another, and females keep the same roosting companions for years, some for up to twelve. The social memory is specific and long.
7. **Source:** s14 (axis read) [HTML + v2]
   - BEFORE: Vampire bats navigate by echolocation and identify individual roostmates by voice.
   - AFTER: Vampire bats navigate by echolocation and make contact calls distinct enough to tell one bat from another.
8. **Source:** s9, s13 (soften typically) [HTML + v2]
   - BEFORE: Blood sharing in vampire bats is typically <b>preceded by social grooming</b>. The physical bonding
   - AFTER: Vampire bats groom one another, and over time <b>grooming can lead to blood sharing</b>, even between bats that started as strangers. The physical bonding
9. **Source:** s9 (WRONG: colonies usually 20 to 100) [HTML + v2]
   - BEFORE: Vampire bats typically roost in groups of <b>hundreds of individuals</b>, often in tight physical contact.
   - AFTER: Vampire bats usually roost in colonies of <b>twenty to a hundred</b>, sometimes far more, often in tight physical contact.
10. **Source:** s3 (profile intro; Metal-over-Earth cut) [HTML + v2]
   - BEFORE: Five axes measure how this Metal-over-Earth nature plays out
   - AFTER: Five axes measure how this sharpened Earth nature plays out
11. **Source:** s3 (no traditional basis; relabeled as our reading) [HTML + v2]
   - BEFORE: In the five-phase system, Air is not one of the five phases — it is a Western quality that here operates as a Metal-adjacent sharpening of the Earth's warmth. The result is a Metal-over-Earth nature: precision running through nourishment, accounting running through care.
   - AFTER: Air is not one of the five phases, and no traditional rule maps it to Metal. Our own reading treats it as a sharpening of the Earth's warmth, close in feel to Metal: precision running through nourishment, accounting running through care.
12. **Source:** s11, s13, s15 (gift text, 60-hour) [HTML + v2]
   - BEFORE: to survive a 60-hour vulnerability window.
   - AFTER: to survive a vulnerability window of two or three nights.
13. **Source:** s10, s11 (overstated, guard text) [HTML + v2]
   - BEFORE: The vampire bat does not continue sharing with individuals who have never shared back. This is documented.
   - AFTER: Vampire bats give most to the roostmates who have given to them, and past sharing predicts future sharing. This is documented.
14. **Source:** s11, s13, s15 (love row, 60-hour) [HTML + v2]
   - BEFORE: when the 60-hour window is real.
   - AFTER: when the two-night window is real.
15. **Source:** s11, s13, s15 (axis read, 60-hour) [HTML + v2]
   - BEFORE: by the 60-hour survival window
   - AFTER: by the two-to-three-night survival window
16. **Source:** s11, s13, s15 (guard heading, 60-hour) [HTML + v2]
   - BEFORE: The guard: the 60-hour rule
   - AFTER: The guard: the two-night rule

## sunbittern

1. **Source:** s10, s11 (header: 鳽 jiān alone is a generic small heron; species name 日鳽 rìjiān) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">鳽</span>
   - AFTER: <span class="rail__han" aria-hidden="true">日鳽</span>
2. **Source:** s10, s11 (header: 鳽 jiān alone is a generic small heron; species name 日鳽 rìjiān) [HTML]
   - BEFORE: data-say="鳽" aria-label="Hear 鳽, jiān"
   - AFTER: data-say="日鳽" aria-label="Hear 日鳽, rìjiān"
3. **Source:** s10, s11 (header: 鳽 jiān alone is a generic small heron; species name 日鳽 rìjiān) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">jiān</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">rìjiān</span>
4. **Source:** s10, s11 (header: 鳽 jiān alone is a generic small heron; species name 日鳽 rìjiān) [HTML]
   - BEFORE: <span class="serial-han">鳽</span>
   - AFTER: <span class="serial-han">日鳽</span>
5. **Source:** s10, s11 (header: 鳽 jiān alone is a generic small heron; species name 日鳽 rìjiān) [HTML]
   - BEFORE: <span class="h" lang="zh">鳽</span><span class="py" lang="zh-Latn-pinyin">jiān</span>
   - AFTER: <span class="h" lang="zh">日鳽</span><span class="py" lang="zh-Latn-pinyin">rìjiān</span>
6. **Source:** s6, s7 (overlooked unverifiable) [HTML + v1]
   - BEFORE: At rest the Sunbittern is a close, fine barring of black, brown, and grey, and the bird is <b>often overlooked even where it is common</b>, standing quietly along a stream or swamp edge.
   - AFTER: At rest the Sunbittern is a close, fine barring of black, brown, and grey that <b>blends into the dappled light</b> of the stream or swamp edge where it stands quietly.
7. **Source:** s6 (insects are an important part of diet) [HTML + v1]
   - BEFORE: to take fish, amphibians, crustaceans, and insects.
   - AFTER: to take insects, crustaceans, fish, and amphibians.
8. **Source:** s7, s8 (holding a stretch not sourced) [HTML + v1]
   - BEFORE: Sunbitterns are typically found <b>singly or in pairs</b>, holding a stretch of stream or forest water rather than gathering in flocks.
   - AFTER: Sunbitterns are typically found <b>singly or in pairs</b> along streams and forest pools, rather than gathering in flocks.
9. **Source:** s7, s8 (cut often and flying off unharmed) [HTML + v1]
   - BEFORE: a parent Sunbittern will often perform a <b>broken-wing display</b>, feigning injury to draw a predator away from the chicks before flying off unharmed.
   - AFTER: a parent Sunbittern may perform a <b>broken-wing display</b>, dragging a wing to draw a predator away from the chicks.
10. **Source:** s6, s7, s10 (kagu is nearly flightless) [HTML + v1]
   - BEFORE: the kagu, a flightless bird found only in New Caledonia
   - AFTER: the kagu, a nearly flightless bird found only in New Caledonia
11. **Source:** s7, s8 (feng shui lead, holding a stretch) [HTML + v1]
   - BEFORE: The Sunbittern holds a stretch of stream, walks it slowly,
   - AFTER: The Sunbittern keeps to a stream, walks it slowly,
   - Template: animalHan "鳽" to "日鳽", animalHanPy "jiān" to "rìjiān" (v1); v2 animalHan placeholder "TODO: one hanzi for the creature" to "日鳽" (v2 has no animalHanPy key, none added). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## stellers-sea-eagle

1. **Source:** s6, s12 (header: 鵰 diāo is generic; species name 虎頭海鵰 hǔtóu hǎidiāo) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">鵰</span>
   - AFTER: <span class="rail__han" aria-hidden="true">虎頭海鵰</span>
2. **Source:** s6, s12 (header: 鵰 diāo is generic; species name 虎頭海鵰 hǔtóu hǎidiāo) [HTML]
   - BEFORE: data-say="鵰" aria-label="Hear 鵰, diāo"
   - AFTER: data-say="虎頭海鵰" aria-label="Hear 虎頭海鵰, hǔtóu hǎidiāo"
3. **Source:** s6, s12 (header: 鵰 diāo is generic; species name 虎頭海鵰 hǔtóu hǎidiāo) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">diāo</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">hǔtóu hǎidiāo</span>
4. **Source:** s6, s12 (header: 鵰 diāo is generic; species name 虎頭海鵰 hǔtóu hǎidiāo) [HTML]
   - BEFORE: <span class="serial-han">鵰</span>
   - AFTER: <span class="serial-han">虎頭海鵰</span>
5. **Source:** s6, s12 (header: 鵰 diāo is generic; species name 虎頭海鵰 hǔtóu hǎidiāo) [HTML]
   - BEFORE: <span class="h" lang="zh">鵰</span><span class="py" lang="zh-Latn-pinyin">diāo</span>
   - AFTER: <span class="h" lang="zh">虎頭海鵰</span><span class="py" lang="zh-Latn-pinyin">hǔtóu hǎidiāo</span>
6. **Source:** s6, s7 (soften superlative; Harpy Eagle page says among the heaviest) [HTML + v1 + v2]
   - BEFORE: The heaviest eagle alive, built along
   - AFTER: Usually ranked the heaviest eagle alive, built along
7. **Source:** s6, s7 (soften superlative) [HTML + v1 + v2]
   - BEFORE: the largest eagle by mass in the world,
   - AFTER: usually ranked the heaviest eagle in the world,
8. **Source:** s6, s7 (soften superlative) [HTML + v1 + v2]
   - BEFORE: roughly 9 kilograms in females, the heaviest of any eagle species.
   - AFTER: roughly 9 kilograms in females, enough that it is usually ranked the heaviest eagle species.
9. **Source:** s6, s7 (from other birds not confirmed) [HTML + v1 + v2]
   - BEFORE: <b>stealing catches from each other and from other birds</b>
   - AFTER: <b>stealing catches from each other</b>
10. **Source:** s6, s8 (add context: Hokkaido lead rules) [HTML + v1 + v2]
   - BEFORE: that the eagles then feed on.
   - AFTER: that the eagles then feed on; Hokkaido has restricted lead rifle bullets since 2000 and lead slugs since 2001.
   - Template: animalHan "鵰" to "虎頭海鵰", animalHanPy "diāo" to "hǔtóu hǎidiāo" (v1 + v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## sonoran-desert-toad

1. **Source:** s2, s3 (meta description, og, JSON-LD x2, shareLine, keepsake identity: dormancy is about seven to eight months) [HTML + v2]
   - BEFORE: dormant nine months, at full force for the rest
   - AFTER: underground most of the year, at full force for the rest
2. **Source:** s1, s2, s4 (largest native toad false; nine months wrong) [HTML + v2]
   - BEFORE: The largest native toad in North America, dormant nine months of the year, and at full force for the rest.
   - AFTER: One of the largest toads native to North America, underground most of the year, and at full force for the rest.
3. **Source:** s1, s2 (surface season late May to September; range update) [HTML + v2]
   - BEFORE:  — present from southeastern California and southern Arizona into northwestern Mexico — appearing at the surface only during the brief monsoon window of July and August.
   - AFTER: , from southern Arizona, the far southwestern corner of New Mexico and southeastern California into northwestern Mexico. It is active at the surface from late May to September and breeds when the summer monsoon rains arrive.
4. **Source:** s1, s2, s3 (frame repeats corrected facts; homing and chemistry framing cut) [HTML + v2]
   - BEFORE: Every symbolic claim in this reading rests on five documented behaviors: the nine-to-ten-month estivation cycle, the explosive six-week monsoon emergence, the size record for native North American toads, the parotoid gland chemistry, and the precise homing fidelity to specific breeding pools.
   - AFTER: Every symbolic claim in this reading rests on documented traits: the long months spent underground, the burst of breeding when the monsoon rains arrive, its size among North American toads, and the toxin in the glands behind its eyes.
5. **Source:** s1, s2, s4 (superlative) [HTML + v2]
   - BEFORE: The toad is the largest native toad on this continent. It carries more than the surface reveals.
   - AFTER: It is one of the largest toads native to this continent. It carries more than the surface reveals.
6. **Source:** s2, s3 (trait title) [HTML + v2]
   - BEFORE: Nine months underground
   - AFTER: Most of the year underground
7. **Source:** s2, s3 (WRONG: active late May to September; no cocoon documented; rodent burrows) [HTML + v2]
   - BEFORE: The Sonoran Desert Toad spends <b>nine to ten months each year in estivation</b> — a dormant state beneath the desert soil, metabolism slowed, body sealed in a cocoon of shed skin and mucus, waiting for the monsoon.
   - AFTER: The Sonoran Desert Toad is <b>active only from late May to September</b>. It spends the rest of the year underground, often in an old rodent burrow, waiting out the dry months.
8. **Source:** s2, s3 (axis read) [HTML + v2]
   - BEFORE: The Sonoran Desert Toad is dormant for nine to ten months of every year — its stillness is not a preference but a biological condition. It does not move during the dry season; it seals itself underground and waits.
   - AFTER: The Sonoran Desert Toad spends seven or eight months of every year underground, and that stillness is a biological condition. It does not move during the dry season; it stays underground and waits.
9. **Source:** s1, s2 (trait title) [HTML + v2]
   - BEFORE: All of it, in six weeks
   - AFTER: All of it, after the rain
10. **Source:** s1, s2 (WRONG: within hours unsourced; eggs 1 to 3 days after rain; tadpoles alone take 6 to 10 weeks) [HTML + v2]
   - BEFORE: When monsoon rains arrive, Sonoran Desert Toads emerge <b>within hours of the first heavy rainfall</b> and compress all mating, egg-laying, and tadpole development into a window of approximately six weeks — the entire breeding cycle in one concentrated burst.
   - AFTER: When the monsoon rains arrive in July, Sonoran Desert Toads gather to breed, and <b>females lay their eggs one to three days after a rain</b>, up to about 8,000 at a time. The breeding run is one concentrated burst.
11. **Source:** s1, s4, s2 (trait title, superlative) [HTML + v2]
   - BEFORE: The largest toad in North America
   - AFTER: One of North America's largest toads
12. **Source:** s1, s3, s4, s2 (750 g unsourced; cane toad is larger and native) [HTML + v2]
   - BEFORE: Incilius alvarius reaches <b>up to 190 mm in length and 750 g in mass</b>, making it the largest native toad on the North American continent — significantly larger than any superficially similar species in its range.
   - AFTER: Incilius alvarius reaches <b>up to about 190 mm in length</b>, making it one of the largest toads native to North America. In the United States only the cane toad grows bigger.
13. **Source:** s1, s2 (trait title) [HTML + v2]
   - BEFORE: A chemistry no other animal carries
   - AFTER: A poison at close range
14. **Source:** s1, s2 (drug-effect framing cut entirely; other mammals error; toxin can kill dogs) [HTML + v2]
   - BEFORE: The parotoid glands of Incilius alvarius produce secretions containing <b>5-MeO-DMT and bufotenin</b> — compounds that in other mammals produce intense, short-duration altered states; the toad uses them as predator deterrents.
   - AFTER: The glands behind its eyes make <b>a toxin strong enough to kill a dog that mouths it</b>. The toad uses it as a defense against predators.
15. **Source:** s2 (trait title) [HTML + v2]
   - BEFORE: The same wash, every year
   - AFTER: The same door, five summers
16. **Source:** s2 (homing unverifiable; anecdote told as anecdote) [HTML + v2]
   - BEFORE: Sonoran Desert Toads return to <b>the same breeding pool in the same desert wash</b> year after year, navigating back to exact locations after months underground — a homing fidelity documented across the life of individual animals.
   - AFTER: No study has tracked whether these toads return to one breeding pool, but the Arizona-Sonora Desert Museum tells of <b>one household's toad that came back through the dog door for five summers</b> in a row.
17. **Source:** s2 (axis read, homing) [HTML + v2]
   - BEFORE: The Sonoran Desert Toad returns to the exact desert wash, the exact breeding pool, every monsoon season of its life. Homing fidelity has been documented across the full lifespan of individual animals. This is the signature trait: not loyalty as a value but orientation so precise it does not require a decision.
   - AFTER: The Arizona-Sonora Desert Museum tells of one toad that came back to the same house through the same dog door for five summers. One story, not a study, and we read the signature trait from it: an orientation so steady it does not require a decision.
18. **Source:** s2 (axis read, its pool) [HTML + v2]
   - BEFORE: The Sonoran Desert Toad is highly specific in its requirements — it does not breed in any pool, only in its pool, and only in its monsoon.
   - AFTER: The Sonoran Desert Toad is highly specific in its requirements: it breeds only when the summer rains come.
19. **Source:** s2, s3 (trait title) [HTML + v2]
   - BEFORE: From egg to toad in three weeks
   - AFTER: From egg to toad in one wet season
20. **Source:** s2, s3 (WRONG: 6 to 10 weeks; 18 to 24 days was a spadefoot fact) [HTML + v2]
   - BEFORE: Tadpoles of Incilius alvarius complete metamorphosis in <b>as few as 18–24 days</b> — among the fastest development rates of any toad in North America — matching the compressed monsoon window precisely.
   - AFTER: Tadpoles of Incilius alvarius take <b>about six to ten weeks</b> to turn into toadlets, in pools left by the summer rains.
21. **Source:** s2, s3 (reading under corrected fact) [HTML + v2]
   - BEFORE: When you move, you move fast and completely. There is no gradual version of the thing you decided to do. <em>The window is short; you use all of it.</em>
   - AFTER: What you start in the wet season you see all the way through, even when it takes longer than the rain lasts. <em>The window is short; you use all of it.</em>
22. **Source:** s2, s3 (dossier card) [HTML + v2]
   - BEFORE: Dormant nine months; at full force for the rest;
   - AFTER: Underground most of the year; at full force for the rest;
23. **Source:** s6 (MISLEADING: Aquarius is fixed Air; Air to Metal labeled our reading) [HTML + v2]
   - BEFORE: Your Western sign adds a second note: Aquarius, in Western tradition, is the Water Bearer — the sign that carries and pours. In Wu Xing, the closest correspondence to Aquarius's quality is Metal, which generates Water. What you get is a double pressure toward depth:
   - AFTER: Your Western sign adds a second note: Aquarius is an Air sign, fixed in modality, even though its picture is the Water Bearer pouring from a jar. Air is not one of the five phases, so in our own reading Aquarius's cool, clear quality sits closest to Metal, which generates Water. What you get is pressure toward depth from both sides:
24. **Source:** s2, s3 (chakra text) [HTML + v2]
   - BEFORE: what is held in the body during the nine months,
   - AFTER: what is held in the body during the long months underground,
25. **Source:** s2, s3 (mirror reflex) [HTML + v2]
   - BEFORE: through nine months of stillness.
   - AFTER: through months of stillness.
26. **Source:** s2, s3 (mirror reflex) [HTML + v2]
   - BEFORE: It was made nine months ago and spent the winter becoming certain.
   - AFTER: It was made months ago and spent the winter becoming certain.
27. **Source:** s1, s2 (gift text) [HTML + v2]
   - BEFORE: The Sonoran Desert Toad's six-week breeding season contains the full output of a year.
   - AFTER: The Sonoran Desert Toad's short breeding run after the summer rains contains the full output of a year.
28. **Source:** s2, s3 (guard text: no cocoon; homing and chemistry cut) [HTML + v2]
   - BEFORE: The toad's estivation cocoon seals it against the desert heat and drought. Everything the animal carries — its chemistry, its memory of the exact location of the breeding pool, its accumulated readiness — is preserved underground.
   - AFTER: The toad's burrow shelters it from the desert heat and drought. Everything the animal carries, its toxin and its readiness to breed, is kept safe underground.
29. **Source:** s2, s3 (palette) [HTML + v2]
   - BEFORE: that holds the toad for nine months.
   - AFTER: that holds the toad through the dry months.
30. **Source:** s2, s3 (proverb soul) [HTML + v2]
   - BEFORE: underground for nine months.
   - AFTER: underground through the dry months.
31. **Source:** style item (tiles stop before 而不爭; literal now says so, with pinyin) [HTML + v2]
   - BEFORE: Water is good at benefiting ten thousand things without contending.
   - AFTER: Water is good at benefiting the ten thousand things. The line goes on 而不爭 ér bù zhēng, without contending.
32. **Source:** s6 (template FAQ, same Air sign error) [v2]
   - BEFORE: Aquarius adds a second quality: in Western tradition it is the Water Bearer, and in Wu Xing its closest correspondence is Metal, which generates Water in the five-phase cycle. The result is a double pressure toward depth:
   - AFTER: Aquarius is an Air sign, despite its Water Bearer picture. Air is not one of the five phases; in our own reading its closest match is Metal, which generates Water in the five-phase cycle. The result is pressure toward depth from both sides:
   - Count note: item 1 replaced 6 times in HTML (meta description, og:description, two JSON-LD descriptions, animal-data shareLine, keepsake identity line) and 2 times in v2.

## Header check (kept glyphs)

- beaver 河狸 hélí, vampire-bat 吸血蝠 xīxuè fú, sonoran-desert-toad 蟾 chán: already correct per dossiers; pinyin present in rail__py, keepsake .py and both button aria-labels. Unchanged.

## Not changed, and why

- beaver incisor "wearing at an angle that keeps them permanently sharp": OK in the dossier (s13 credits enamel microstructure too). Kept.
- beaver Haida, Blackfoot and bestiary lore: not on the page; nothing to fix.
- vampire-bat hero and readings still use several existing em dashes and "is not X, it is Y" lines (page_bugs). They sit in reading copy outside the corrected facts; left for a copy pass. No new text adds any.
- vampire-bat "Withdrawing from non-reciprocators" (profile stat) and mirror guard reading: interpretive, kept; the fact under the guard now says sharing tracks past sharing.
- vampire-bat "The bat grooms before it shares blood" (career facet): consistent with the softened grooming fact as a general pattern. Kept.
- vampire-bat "the most deliberate openness in the animal kingdom" (axis read): reading-voice superlative, not in the audit. Kept.
- sunbittern and stellers-sea-eagle moon sections print a fixed July 2026 date (page_bugs): JS-rendered block, not a fact item; not touched (no JS/CSS edits).
- sunbittern "holding the same stretch of ground" lines in readings: our-reading voice, kept; only the fact and the feng shui lead were softened.
- stellers-sea-eagle "breeds almost entirely along sea coasts and large rivers": OK (rivers included). Kept.
- sonoran-desert-toad: "monsoon" imagery in readings kept; breeding does follow the monsoon rains. California population possibly extirpated (s1): not added. Axis value for Rootedness still 5 signature; its read now rests on an anecdote labeled as one. Owner may want a new signature trait.
- sonoran-desert-toad proverb tiles still show five of seven characters (no markup added); the literal now names 而不爭 ér bù zhēng as the rest of the line. Daodejing ch. 8 source not opened this session.
- sonoran-desert-toad header 蟾 chán kept per brief; species name 科羅拉多河蟾蜍 kēluólāduō hé chánchú available if wanted.

## Structure check

All five pages parse with python html.parser. Every JSON-LD and application/json block parses (4 per page). Section counts (31) and the full HTML tag sequence match the backups. All edited template JSON loads and nested keysets are unchanged (files written with the same indent=2, ensure_ascii=False format and the same trailing-newline state they had). No new em dash, en dash or arrow in any new text; no banned words; every new hanzi carries pinyin. No `<!--w4-reading-->` block on any of these pages. No CSS or JS touched. Git not run.

## Final header characters

- beaver: 河狸 hélí (unchanged)
- vampire-bat: 吸血蝠 xīxuè fú (unchanged)
- sunbittern: 日鳽 rìjiān (was 鳽 jiān)
- stellers-sea-eagle: 虎頭海鵰 hǔtóu hǎidiāo (was 鵰 diāo)
- sonoran-desert-toad: 蟾 chán (unchanged)
