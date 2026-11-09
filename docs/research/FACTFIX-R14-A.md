# FACTFIX-R14-A change log

Date: 2026-11-08. Pages: giant-armadillo, portuguese-man-o-war, sailfish, sea-angel, elephantnose-fish, siberian-crane.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list. Method and format follow FACTFIX-R12-B.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). Where a string occurred more than once in a file every occurrence was replaced (counts noted). Giant-armadillo and siberian-crane have v1 only; the other four have v2 only.
Backups of the original pages: `~/factfix-backup-r14a/<slug>.html`; original template JSON in `~/factfix-backup-r14a/tpl/v1/` and `~/factfix-backup-r14a/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site. Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. `tools/han-pinyin.json` updated for the three changed headers and the sea-angel pinyin spacing (fresh read-modify-write at the end, only these four keys touched).
Purple Star: all six dossiers mark the Purple Star sections OK. None of the six pages names a star for its crossing; each says a chart is cast from lunar birth date and hour, and the door text already reads "our outline". Nothing to reword.
Citation checks: one web search each for Szabo et al. 2004 ("The mormyrid cerebellum", J Comp Physiol A) and Amey-Özel et al. 2015 ("More neurons but not larger brains", Frontiers in Neuroanatomy). Neither turned up; both removed and replaced with sources opened in the dossier (see elephantnose-fish).

## giant-armadillo

1. **Source:** s13, s14 (header: 犰 qiú has no meaning alone; species is 大犰狳 dà qiúyú) (header rail__han) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">犰</span>
   - AFTER: <span class="rail__han" aria-hidden="true">大犰狳</span>
2. **Source:** s13, s14 (header: 犰 qiú has no meaning alone; species is 大犰狳 dà qiúyú) (header pronounce buttons) (count: HTML x2) [HTML]
   - BEFORE: data-say="犰" aria-label="Hear 犰, qiú"
   - AFTER: data-say="大犰狳" aria-label="Hear 大犰狳, dà qiúyú"
3. **Source:** s13, s14 (header: 犰 qiú has no meaning alone; species is 大犰狳 dà qiúyú) (header rail__py) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">qiú</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">dà qiúyú</span>
4. **Source:** s13, s14 (header: 犰 qiú has no meaning alone; species is 大犰狳 dà qiúyú) (header serial-han) [HTML]
   - BEFORE: <span class="serial-han">犰</span>
   - AFTER: <span class="serial-han">大犰狳</span>
5. **Source:** s13, s14 (header: 犰 qiú has no meaning alone; species is 大犰狳 dà qiúyú) (header keepsake .h/.py) [HTML]
   - BEFORE: <span class="h" lang="zh">犰</span><span class="py" lang="zh-Latn-pinyin">qiú</span>
   - AFTER: <span class="h" lang="zh">大犰狳</span><span class="py" lang="zh-Latn-pinyin">dà qiúyú</span>
6. **Source:** s13, s14 (header: 犰 qiú has no meaning alone; species is 大犰狳 dà qiúyú) (template animalHan) [v1]
   - BEFORE: "animalHan": "犰"
   - AFTER: "animalHan": "大犰狳"
7. **Source:** s13, s14 (header: 犰 qiú has no meaning alone; species is 大犰狳 dà qiúyú) (template animalHanPy) [v1]
   - BEFORE: "animalHanPy": "qiú"
   - AFTER: "animalHanPy": "dà qiúyú"
8. **Source:** s9, s10, s6 (WRONG, backwards: most armadillos cannot roll up; only the three-banded armadillos can) [HTML + v1]
   - BEFORE: Unlike most other armadillo species, the giant armadillo <b>cannot fully enclose its body within its own carapace</b> when threatened; its real defenses
   - AFTER: Like most armadillos, the giant armadillo <b>cannot roll up inside its own carapace</b> when threatened, a trick only the three-banded armadillos manage; its real defenses
9. **Source:** s5, s8 (OK, soften: ADW says "somewhat of a keystone species"; the burrow study calls it an ecosystem engineer, with over two dozen species using its burrows) [HTML + v1]
   - BEFORE: researchers describe the species as a <b>keystone species</b> for exactly this reason.
   - AFTER: researchers who found more than two dozen species using its burrows call it an <b>ecosystem engineer</b> for exactly this reason.
10. **Source:** s5 (UNVERIFIABLE half: no source on giant armadillo eyesight; smell is the strongest armadillo sense) [HTML + v1]
   - BEFORE: Giant armadillo eyesight is poor; the <b>strongest sense available to the species is smell</b>, which does
   - AFTER: In armadillos the <b>strongest sense is smell</b>, which does
11. **Source:** s5 (axis read: eyesight claim unsourced, kept to smell) [HTML + v1]
   - BEFORE: Her eyesight is poor enough that scent does most of the real work, by a wide margin the strongest sense she has.
   - AFTER: Scent does most of the real work for her, the strongest sense an armadillo has.
12. **Source:** s5, s6, s7 (WRONG: gestation four to five months; nursing 6 to 8 months, weaning 11 to 12 months, on the mother's burrows to about 18 months) [HTML + v1]
   - BEFORE: after roughly a four-month gestation, and the young stay only with the mother, reaching independence at around six months old.
   - AFTER: after a gestation of four to five months, and the young stay only with the mother, weaned at around 11 to 12 months and still using her burrows until about 18 months old.
13. **Source:** s8 (UNVERIFIABLE absolute "never the same shelter twice"; sourced: a new burrow every other night on average) [HTML + v1]
   - BEFORE: a home range it may keep for years without ever building the same shelter in it twice.
   - AFTER: a home range it may keep for years, digging a new burrow every other night on average.
14. **Source:** s8 (reference added for the ecosystem engineer finding) [HTML]
   - BEFORE: <li><a href="https://animaldiversity.org/accounts/Priodontes_maximus/" rel="noopener">Animal Diversity Web · Priodontes maximus</a></li>
   - AFTER: <li><a href="https://animaldiversity.org/accounts/Priodontes_maximus/" rel="noopener">Animal Diversity Web · Priodontes maximus</a></li>\n        <li><a href="https://news.mongabay.com/2013/10/armored-giant-turns-out-to-be-vital-ecosystem-engineer/" rel="noopener">Mongabay (2013) · Armored giant turns out to be vital ecosystem engineer, on Desbiez and Kluyber, Biotropica</a></li>
15. **Source:** s8 (template reference added) [v1]
   - BEFORE: "href": "https://animaldiversity.org/accounts/Priodontes_maximus/"\n      }
   - AFTER: "href": "https://animaldiversity.org/accounts/Priodontes_maximus/"\n      },\n      {\n        "label": "Mongabay (2013) · Armored giant turns out to be vital ecosystem engineer, on Desbiez and Kluyber, Biotropica",\n        "href": "https://news.mongabay.com/2013/10/armored-giant-turns-out-to-be-vital-ecosystem-engineer/"\n      }
   - Template: animalHan "犰" to "大犰狳", animalHanPy "qiú" to "dà qiúyú" (v1). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## portuguese-man-o-war

1. **Source:** s5, s6 (WRONG length: NOAA says tentacles average 10 m, about 30 ft, and may reach 30 m, about 100 ft; 165 ft is an old figure) meta, og, JSON-LD descriptions (count: HTML x4) [HTML + v2]
   - BEFORE: four organisms, one entity, 165-foot reach.
   - AFTER: four organisms, one entity, 100-foot reach.
2. **Source:** s5, s6 (WRONG length: NOAA says tentacles average 10 m, about 30 ft, and may reach 30 m, about 100 ft; 165 ft is an old figure) shareLine and keepsake identity (count: HTML x2) [HTML + v2]
   - BEFORE: and reaching 165 feet further than you can see.
   - AFTER: and reaching up to 100 feet further than you can see.
3. **Source:** s5, s6 (WRONG length: NOAA says tentacles average 10 m, about 30 ft, and may reach 30 m, about 100 ft; 165 ft is an old figure); s5, s6 frame: storm aggregation unsourced, NOAA legions of 1,000 or more; sail angle fixed [HTML + v2]
   - BEFORE: the passive drift with slight sail-angle adjustment, the 165-foot tentacle radius, the post-death sting persistence, and the aggregation pattern after storm-driven upwellings.
   - AFTER: the passive drift at a fixed sail angle, the tentacles that can reach 100 feet, the post-death sting persistence, and the legions of a thousand or more that the wind gathers.
4. **Source:** s5, s6 (WRONG length: NOAA says tentacles average 10 m, about 30 ft, and may reach 30 m, about 100 ft; 165 ft is an old figure) fact card; s6 cut absolute "regardless of what they touch" [HTML + v2]
   - BEFORE: can <b>extend up to 165 feet</b> below the surface. They fire nematocysts — stinging cells — on contact, regardless of what they touch.
   - AFTER: average about 30 feet and can <b>extend up to 100 feet</b> below the surface. They fire nematocysts — stinging cells — on contact with almost anything they touch.
5. **Source:** s5, s6 (WRONG length: NOAA says tentacles average 10 m, about 30 ft, and may reach 30 m, about 100 ft; 165 ft is an old figure) profile card sub [HTML + v2]
   - BEFORE: drifts by wind; stings at 165 feet.
   - AFTER: drifts by wind; stings at up to 100 feet.
6. **Source:** s5, s6 (WRONG length: NOAA says tentacles average 10 m, about 30 ft, and may reach 30 m, about 100 ft; 165 ft is an old figure) mirror take [HTML + v2]
   - BEFORE: extends 165 feet below the surface.
   - AFTER: extends up to 100 feet below the surface.
7. **Source:** s5, s6 (WRONG length: NOAA says tentacles average 10 m, about 30 ft, and may reach 30 m, about 100 ft; 165 ft is an old figure) mirror body [HTML + v2]
   - BEFORE: are the tentacles — 165 feet of them —
   - AFTER: are the tentacles — up to 100 feet of them —
8. **Source:** s5, s6 (WRONG length: NOAA says tentacles average 10 m, about 30 ft, and may reach 30 m, about 100 ft; 165 ft is an old figure) work failure panel [HTML + v2]
   - BEFORE: with 165 feet of tentacle deployed
   - AFTER: with 100 feet of tentacle deployed
9. **Source:** s6 (WRONG mechanism: handedness sets a sailing angle about 45 degrees left or right of the wind; shore or sea depends on coast and wind, so only part of a population is pushed ashore) [HTML + v2]
   - BEFORE: This determines whether a given animal drifts toward shore or away from it under equivalent wind conditions — a structural
   - AFTER: This sets each animal sailing about 45 degrees to the left or right of the wind, so the same wind pushes only part of a population ashore — a structural
10. **Source:** s6 (axis read: the sail angle is about 45 degrees, not a few degrees) [HTML + v2]
   - BEFORE: gives it a slight ability to angle relative to the wind — perhaps a few degrees of self-determination within the drift. This is not full adaptability; it is micro-adjustment.
   - AFTER: sets it sailing at an angle to the wind, about 45 degrees to one side, a fixed lean within the drift. That is a long way short of full adaptability.
11. **Source:** s6 (WRONG overstated: the man-of-war fish lives among the tentacles and avoids the sting; absolute cut) [HTML + v2]
   - BEFORE: The nematocysts fire on contact regardless of species, size, or context — <b>they cannot distinguish prey from predator from neutral bystander</b>. The mechanism is contact chemistry, not evaluation. A tentacle that encounters a human swimmer fires the same as one that encounters a fish.
   - AFTER: The nematocysts fire on contact with prey, predator and <b>neutral bystander alike</b>, a human swimmer as readily as a fish. The mechanism is contact chemistry, not evaluation. One known exception is the man-of-war fish, which lives among the tentacles and mostly avoids their sting.
12. **Source:** s5, s6 (WRONG half: NOAA says they sometimes float in legions of 1,000 or more; "after storms" unsourced, winds drive them ashore) [HTML + v2]
   - BEFORE: Large concentrations of man o' war appear after storms — <b>changed currents and upwellings concentrate them</b> in conditions they would not normally occupy. Individual colonies drift alone; the aggregation is circumstantial, produced by the same force that moves all of them.
   - AFTER: Man o' war sometimes float in <b>legions of a thousand or more</b>, and onshore winds drive them into bays and onto beaches in great numbers. The gathering is produced by the same force that moves all of them.
13. **Source:** s5, s6 (UNVERIFIABLE: 2025 study split the genus into five lineages; NOAA says mostly tropical and subtropical seas) [HTML + v2]
   - BEFORE: found in the open waters of the Atlantic, Indian, and Pacific oceans,
   - AFTER: found in the open waters of warm seas around the world,
14. **Source:** s5, s6 (OK nuance: four is the common simplification; seven zooid types described) [HTML + v2]
   - BEFORE: composed of <b>four functionally distinct zooid types</b>:
   - AFTER: composed of <b>four main kinds of zooid</b>:

## sailfish

1. **Source:** s11, s12 (WRONG: 110 km/h comes from 1940s stopwatch timings of hooked fish; measured top speed about 36 km/h, Svendsen et al. 2016) meta, og, JSON-LD descriptions: record claim dropped (count: HTML x4) [HTML + v2]
   - BEFORE: the fastest fish who collapses its sail to accelerate.
   - AFTER: a famously fast fish that collapses its sail to accelerate.
2. **Source:** s11, s12 (WRONG: 110 km/h comes from 1940s stopwatch timings of hooked fish; measured top speed about 36 km/h, Svendsen et al. 2016) overture title [HTML + v2]
   - BEFORE: The fastest fish alive collapses its most visible feature to go faster.
   - AFTER: One of the ocean's fastest fish collapses its most visible feature to go faster.
3. **Source:** s11, s12 (WRONG: 110 km/h comes from 1940s stopwatch timings of hooked fish; measured top speed about 36 km/h, Svendsen et al. 2016); s13, s12 (lede: color change is on the body, sail timing unsourced) [HTML + v2]
   - BEFORE: reaching speeds of up to 110 km/h and capable of changing its sail coloring in under a second during cooperative hunts.
   - AFTER: reaching burst speeds of about 36 km/h when measured with modern tags, and able to darken its body and light up blue bars along its flanks during cooperative hunts.
4. **Source:** s13, s16 (frame: color signalling not shown in sailfish) [HTML + v2]
   - BEFORE: the cooperative group hunting strategy using turn-taking and color communication;
   - AFTER: the cooperative group hunting strategy using turn-taking and fast color change;
5. **Source:** s11, s12 (WRONG: 110 km/h comes from 1940s stopwatch timings of hooked fish; measured top speed about 36 km/h, Svendsen et al. 2016) frame [HTML + v2]
   - BEFORE: the speed record as fastest fish;
   - AFTER: the burst speed behind its fastest-fish reputation;
6. **Source:** s12, s13, s18 (OK soften: sail height and "under a second" unsourced; kept folded to cut drag, raised during attacks) [HTML + v2]
   - BEFORE: can be raised to form a sail nearly as tall as the fish's body or <b>folded flat into a groove along the back</b> in under a second. The sail increases hydrodynamic drag significantly when raised; the fish must lower it to reach maximum speed.
   - AFTER: can be raised to form a tall sail or <b>folded flat into a groove along the back</b>. The fish keeps it folded while swimming to cut drag, and raises it during attacks to corral prey.
7. **Source:** s13, s15 (WRONG group size: up to 40 around one school, groups of up to 70 studied) [HTML + v2]
   - BEFORE: in loose groups of two to twenty individuals.
   - AFTER: in loose groups, up to 40 around a single school, and researchers have followed groups of as many as 70.
8. **Source:** s15, s18 (WRONG reason: turn-taking may avoid bill injuries; later attackers gain from prey already injured) [HTML + v2]
   - BEFORE: a rotating structure that keeps the school compressed and individual fish from exhausting themselves.
   - AFTER: a rotating structure that may keep the hunters from wounding each other with their bills, while every slash leaves injured prey easier for the next attacker.
9. **Source:** s13, s14 (UNVERIFIABLE: "adds drag and reduces maneuverability" unsourced; Domenici 2014: the bill enters schools without triggering escape) [HTML + v2]
   - BEFORE:  The bill adds drag and reduces maneuverability — it is expensive to carry.
   - AFTER:  The bill can slip into a school without setting off the fish's escape response.
10. **Source:** s13, s16, s12 (WRONG borrowed species: documented change is on the body; the attack-signal study was on striped marlin) [HTML + v2]
   - BEFORE: During active hunting, sailfish <b>rapidly change the coloration of the sail through chromatophore activity</b> — flashing from dark to light in patterns that appear to coordinate the group's attack sequence. The color signals communicate something about who takes the next charge. Outside of hunting, sail coloration changes with stress and arousal.
   - AFTER: During active hunting, sailfish <b>rapidly change the coloration of the body</b>, turning from silvery to nearly black, with orange spots and electric blue bars along the flanks. Whether the flashes coordinate the attack is still open: a 2024 study found that pattern in striped marlin, and even there it is read as a possible sign of which fish is ready to strike.
11. **Source:** s13 (trait title: the color change is on the body) [HTML]
   - BEFORE: >The sail colors</h3>
   - AFTER: >The hunting colors</h3>
12. **Source:** s13 (template trait title) [v2]
   - BEFORE: "name": "The sail colors"
   - AFTER: "name": "The hunting colors"
13. **Source:** s13, s16 (axis read: color communication unproven) [HTML + v2]
   - BEFORE: communicating partly through sail color changes.
   - AFTER: flashing its colors as it hunts.
14. **Source:** s11, s12 (WRONG: 110 km/h comes from 1940s stopwatch timings of hooked fish; measured top speed about 36 km/h, Svendsen et al. 2016); s17 (WRONG: a heater organ built from an eye muscle warms brain and eyes, not body heat from swimming) [HTML + v2]
   - BEFORE: The sailfish holds the <b>recorded speed record for fish at approximately 110 km/h (68 mph)</b> in short bursts. This speed is physiologically expensive: the fish generates body heat through its locomotion and maintains a body temperature above the surrounding water through a specialised counter-current heat exchanger near the eye and brain, sustaining visual acuity during high-speed pursuit.
   - AFTER: The sailfish is often listed as the fastest fish at 110 km/h (68 mph), a figure from 1940s stopwatch timings of hooked fish; high-speed video and tags put its <b>top burst at about 36 km/h (22 mph)</b>. Those bursts are short. A heater organ built from an eye muscle warms its brain and eyes up to about 14 °C above the water, which keeps its vision sharp during the chase.
15. **Source:** s11, s12 (WRONG: 110 km/h comes from 1940s stopwatch timings of hooked fish; measured top speed about 36 km/h, Svendsen et al. 2016) reading line [HTML + v2]
   - BEFORE: Even the fastest fish in the ocean cannot hold the record pace.
   - AFTER: Even a fish famed for speed cannot hold its top pace.
16. **Source:** s17 (axis read: no whole-body heat from movement) [HTML + v2]
   - BEFORE: built for continuous forward motion — its body generates heat through constant movement, and slowing too much costs it thermoregulatory efficiency. At rest
   - AFTER: built for continuous forward motion. At rest
17. **Source:** s18, s19 (WRONG part: NOAA tagging recaptured a sailfish at the same wreck a year later; thousands of km within months unsourced) [HTML + v2]
   - BEFORE: following prey concentrations across thousands of kilometers of open ocean. They do not return to a home range. Tagged individuals have been recovered thousands of kilometers from their tagging site within months. Their location at any given time is determined entirely by where the prey is.
   - AFTER: following prey across great stretches of open ocean. Yet some come back: NOAA's tagging program recaptured one sailfish at the same Florida wreck where it was tagged a year earlier, and another less than 40 miles away after two years. Where they are at any given time mostly follows the prey.
18. **Source:** s19 (axis read: some return to the same site) [HTML + v2]
   - BEFORE: It does not return to a home range.
   - AFTER: Some turn up again where they were tagged, but it holds no fixed ground.
19. **Source:** s11, s12 (WRONG: 110 km/h comes from 1940s stopwatch timings of hooked fish; measured top speed about 36 km/h, Svendsen et al. 2016) mirror gift [HTML + v2]
   - BEFORE: the sailfish is the fastest fish alive with the most visible signal in the water
   - AFTER: the sailfish is a famously fast fish with the most visible fin in the water
20. **Source:** s11, s12 (WRONG: 110 km/h comes from 1940s stopwatch timings of hooked fish; measured top speed about 36 km/h, Svendsen et al. 2016) proverb soul [HTML + v2]
   - BEFORE: The sailfish is already the fastest fish in the ocean.
   - AFTER: The sailfish is already one of the fastest fish in the ocean.
21. **Source:** s14 (WRONG citation: Domenici et al. 2014 is in Proceedings of the Royal Society B, titled How sailfish use their bills to capture schooling prey) [HTML]
   - BEFORE: <li><a href="https://royalsocietypublishing.org/doi/10.1098/rsbl.2014.0444" rel="noopener">Domenici et al. (2014) — Sailfish cooperative hunting behavior, Biology Letters</a></li>
   - AFTER: <li><a href="https://researchportal.plymouth.ac.uk/en/publications/how-sailfish-use-their-bills-to-capture-schooling-prey/" rel="noopener">Domenici et al. (2014) · How sailfish use their bills to capture schooling prey, Proceedings of the Royal Society B</a></li>
22. **Source:** s11 (WRONG: "Marlin et al." is not a real citation; replaced with the source for the measured speed) [HTML]
   - BEFORE: <li><a href="https://www.marlinmag.com/species/atlantic-sailfish/" rel="noopener">Marlin et al. — Billfish speed and thermoregulation studies</a></li>
   - AFTER: <li><a href="https://atlasofscience.org/sailfish-the-fastest-fish-in-the-world/" rel="noopener">Atlas of Science · Sailfish: the fastest fish in the world? (on Svendsen, Domenici et al. 2016)</a></li>

## sea-angel

1. **Source:** s10 (header glyphs 海天使 correct, kept; pinyin respaced to hǎi tiānshǐ) (header pronounce buttons) (count: HTML x2) [HTML]
   - BEFORE: data-say="海天使" aria-label="Hear 海天使, hǎitiānshǐ"
   - AFTER: data-say="海天使" aria-label="Hear 海天使, hǎi tiānshǐ"
2. **Source:** s10 (header glyphs 海天使 correct, kept; pinyin respaced to hǎi tiānshǐ) (header rail__py) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">hǎitiānshǐ</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">hǎi tiānshǐ</span>
3. **Source:** s10 (header glyphs 海天使 correct, kept; pinyin respaced to hǎi tiānshǐ) (header keepsake .h/.py) [HTML]
   - BEFORE: <span class="h" lang="zh">海天使</span><span class="py" lang="zh-Latn-pinyin">hǎitiānshǐ</span>
   - AFTER: <span class="h" lang="zh">海天使</span><span class="py" lang="zh-Latn-pinyin">hǎi tiānshǐ</span>
4. **Source:** s10 (header glyphs 海天使 correct, kept; pinyin respaced to hǎi tiānshǐ) (template animalHanPy) [v2]
   - BEFORE: "animalHanPy": "hǎitiānshǐ"
   - AFTER: "animalHanPy": "hǎi tiānshǐ"
5. **Source:** s6, s7 (WRONG: C. limacina lives in the Arctic Ocean and North Atlantic; Antarctic sea angels are C. antarctica) [HTML + v2]
   - BEFORE: swims through Arctic and Antarctic waters
   - AFTER: swims through the Arctic Ocean and the cold North Atlantic
6. **Source:** s6, s7, s9 (WRONG detail: six adhesive buccal cones grip the shell; separate chitinous hooks pull the body out) [HTML + v2]
   - BEFORE: six hook-bearing tentacle-like structures that evert from the head only during active predation and are otherwise completely retracted inside the body.
   - AFTER: six sticky tentacle-like structures that evert from the head only during active predation to grip the prey's shell, while separate chitinous hooks pull the snail out; otherwise all of it stays retracted inside the body.
7. **Source:** s6, s7 (OK soften: when Limacina is scarce, amphipods and copepods turn up in stomachs) [HTML + v2]
   - BEFORE: one hunting only the other.
   - AFTER: one hunting almost only the other.
8. **Source:** s6, s9, s12 (UNVERIFIABLE, likely wrong: no source finds Clione limacina bioluminescent; the "glow" is the red-orange gut seen through the clear body) trait title [HTML]
   - BEFORE: >Bioluminescence</h3>
   - AFTER: >The Glow Inside</h3>
9. **Source:** s6, s9, s12 (UNVERIFIABLE, likely wrong: no source finds Clione limacina bioluminescent; the "glow" is the red-orange gut seen through the clear body) template trait title [v2]
   - BEFORE: "name": "Bioluminescence"
   - AFTER: "name": "The Glow Inside"
10. **Source:** s6, s9, s12 (UNVERIFIABLE, likely wrong: no source finds Clione limacina bioluminescent; the "glow" is the red-orange gut seen through the clear body) fact replaced with the sourced explanation [HTML + v2]
   - BEFORE: Sea angels produce <b>bioluminescent light</b> in the dark water column, visible as a faint blue-violet glow in the depths where they hunt.
   - AFTER: Sea angels make no light of their own. What looks like a glow is the <b>red-orange gut showing through a clear body</b>, bright against the dark water where they hunt.
11. **Source:** s6, s9, s12 (UNVERIFIABLE, likely wrong: no source finds Clione limacina bioluminescent; the "glow" is the red-orange gut seen through the clear body) reading rebuilt on the corrected fact [HTML + v2]
   - BEFORE: You are visible in the darkness you choose to live in. <em>The light is not a warning to prey — it is simply what you do.</em> You cannot be invisible even when you try.
   - AFTER: You are visible in the darkness you choose to live in. <em>What shows is simply what is already inside you.</em> You cannot be invisible even when you try.
12. **Source:** s6, s9, s12 (UNVERIFIABLE, likely wrong: no source finds Clione limacina bioluminescent; the "glow" is the red-orange gut seen through the clear body) element derivation [HTML + v2]
   - BEFORE: not the open bonfire but the bioluminescent glow in the dark column.
   - AFTER: not the open bonfire but a red-orange core glowing through a clear body in the dark column.
13. **Source:** s6, s9, s12 (UNVERIFIABLE, likely wrong: no source finds Clione limacina bioluminescent; the "glow" is the red-orange gut seen through the clear body) chakra bridge [HTML + v2]
   - BEFORE: the sea angel's bioluminescent glow in the dark water column is the image here:
   - AFTER: the sea angel's red-orange gut, showing through its clear body in the dark water column, is the image here:
14. **Source:** s6, s9, s12 (UNVERIFIABLE, likely wrong: no source finds Clione limacina bioluminescent; the "glow" is the red-orange gut seen through the clear body) palette [HTML + v2]
   - BEFORE: translucent body in bioluminescent light
   - AFTER: translucent body in deep water light
15. **Source:** s6, s9, s12 (UNVERIFIABLE, likely wrong: no source finds Clione limacina bioluminescent; the "glow" is the red-orange gut seen through the clear body) room card [HTML + v2]
   - BEFORE: The sea angel's bioluminescence lights the target without illuminating the whole column.
   - AFTER: The sea angel's bright core shows through its body without lighting the whole column.
16. **Source:** s6, s9, s12 (UNVERIFIABLE, likely wrong: no source finds Clione limacina bioluminescent; the "glow" is the red-orange gut seen through the clear body) keeper stone (template only; not rendered in the page) [v2]
   - BEFORE: the color of the sea angel's body in bioluminescent light
   - AFTER: the color of the sea angel's body in deep blue water
17. **Source:** s8, s9 (WRONG detail: the larval shell is discarded a few days after hatching, not absorbed) [HTML + v2]
   - BEFORE: the shell absorbed as the animal develops.
   - AFTER: the larval shell shed a few days after hatching, when the larva changes form.
18. **Source:** s15, s14 (UNVERIFIABLE overstated: shell dissolution is real, a measured decline is not sourced; C. limacina survived 356 days unfed in the lab) [HTML + v2]
   - BEFORE: As ocean temperatures rise, <b>Limacina populations are declining</b> due to ocean acidification dissolving their shells. Sea angels, entirely dependent on a single prey species, face direct starvation risk.
   - AFTER: As the ocean takes up more carbon dioxide, <b>the shells of live sea butterflies are dissolving</b> in the most acidic waters. Sea angels lean almost entirely on that one prey, so losing it would hit them hard, even though one lab study kept a sea angel alive for 356 days without food.
19. **Source:** s9 (UNVERIFIABLE: no IUCN category for Clione limacina; replaced with SeaLifeBase) [HTML]
   - BEFORE: <li><a href="https://www.iucnredlist.org/" rel="noopener">IUCN Red List · Clione limacina</a></li>
   - AFTER: <li><a href="https://www.sealifebase.ca/summary/Clione-limacina" rel="noopener">SeaLifeBase · Clione limacina, Common Clione</a></li>
20. **Source:** s9 (template reference replaced) [v2]
   - BEFORE: "label": "IUCN Red List · Clione limacina",\n        "href": "https://www.iucnredlist.org/"
   - AFTER: "label": "SeaLifeBase · Clione limacina, Common Clione",\n        "href": "https://www.sealifebase.ca/summary/Clione-limacina"
   - Template: animalHanPy "hǎitiānshǐ" to "hǎi tiānshǐ" (v2); animalHan 海天使 unchanged.

## elephantnose-fish

1. **Source:** s13 (header: 电 diàn is simplified "electricity", not the animal; everyday traditional name 象鼻魚 xiàngbíyú) (header rail__han) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">电</span>
   - AFTER: <span class="rail__han" aria-hidden="true">象鼻魚</span>
2. **Source:** s13 (header: 电 diàn is simplified "electricity", not the animal; everyday traditional name 象鼻魚 xiàngbíyú) (header pronounce buttons) (count: HTML x2) [HTML]
   - BEFORE: data-say="电" aria-label="Hear 电, diàn"
   - AFTER: data-say="象鼻魚" aria-label="Hear 象鼻魚, xiàngbíyú"
3. **Source:** s13 (header: 电 diàn is simplified "electricity", not the animal; everyday traditional name 象鼻魚 xiàngbíyú) (header rail__py) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">diàn</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">xiàngbíyú</span>
4. **Source:** s13 (header: 电 diàn is simplified "electricity", not the animal; everyday traditional name 象鼻魚 xiàngbíyú) (header serial-han) [HTML]
   - BEFORE: <span class="serial-han">电</span>
   - AFTER: <span class="serial-han">象鼻魚</span>
5. **Source:** s13 (header: 电 diàn is simplified "electricity", not the animal; everyday traditional name 象鼻魚 xiàngbíyú) (header keepsake .h/.py) [HTML]
   - BEFORE: <span class="h" lang="zh">电</span><span class="py" lang="zh-Latn-pinyin">diàn</span>
   - AFTER: <span class="h" lang="zh">象鼻魚</span><span class="py" lang="zh-Latn-pinyin">xiàngbíyú</span>
6. **Source:** s13 (header: 电 diàn is simplified "electricity", not the animal; everyday traditional name 象鼻魚 xiàngbíyú) (template animalHan) [v2]
   - BEFORE: "animalHan": "电"
   - AFTER: "animalHan": "象鼻魚"
7. **Source:** s13 (header: 电 diàn is simplified "electricity", not the animal; everyday traditional name 象鼻魚 xiàngbíyú) (template animalHanPy) [v2]
   - BEFORE: "animalHanPy": "diàn"
   - AFTER: "animalHanPy": "xiàngbíyú"
8. **Source:** s5, s10 (overture title: sight is not useless; navigation not entirely electric) [HTML + v2]
   - BEFORE: that navigates entirely by electric field in waters where eyes are useless.
   - AFTER: that navigates mostly by electric field in waters too murky to see far.
9. **Source:** s5 (WRONG: the electric organ is in the tail; the chin is the receptor; range is West and Central Africa) [HTML + v2]
   - BEFORE: inhabits the murky rivers and lakes of West Africa, where visibility can drop to centimeters, and navigates entirely by generating and reading weak electric fields through an organ in the elongated lower jaw that is often mistaken for a nose.
   - AFTER: inhabits the murky rivers and lakes of West and Central Africa, where visibility can drop to centimeters, and finds its way mostly by making weak electric fields with an organ in its tail and reading them through the elongated chin that is often mistaken for a nose.
10. **Source:** s5, s10 (WRONG one word: the fish also sees, with a retina built for turbid water) [HTML + v2]
   - BEFORE: communicates entirely through this medium.
   - AFTER: communicates mainly through this medium.
11. **Source:** s6, s7 (WRONG superlative: tree shrews and small birds have higher brain-to-body ratios; the record is the brain using over half the body's oxygen); cerebellum "almost entirely" electric unverifiable [HTML + v2]
   - BEFORE: The elephantnose fish has <b>the highest brain-to-body-weight ratio of any non-human vertebrate</b>: approximately 3.1%, compared to approximately 2% in humans. The disproportionate cerebellum is dedicated almost entirely to processing electric signals.
   - AFTER: The elephantnose fish has a brain of about 3.1% of its body weight, more than the roughly 2% in humans, and holds the record for the <b>most energy-hungry animal brain</b>: it uses over half of all the oxygen the fish takes in. Much of that brain is an enlarged cerebellum.
12. **Source:** s6, s7 (WRONG superlative: tree shrews and small birds have higher brain-to-body ratios; the record is the brain using over half the body's oxygen) axis read [HTML + v2]
   - BEFORE: The elephantnose fish has the highest brain-to-body-weight ratio of any non-human vertebrate — approximately 3.1%, compared to approximately 2% in humans — and that architecture is directed almost entirely toward processing electric signals.
   - AFTER: The elephantnose fish carries a brain of about 3.1% of its body weight, more than the roughly 2% in humans, and that brain uses over half the oxygen the fish takes in.
13. **Source:** s8 (WRONG: all four mormyrid species tested tell resistive from capacitive objects; axis read) [HTML + v2]
   - BEFORE: a dual-channel integration no other known animal performs in the same form.
   - AFTER: a skill it shares with other mormyrid fish.
14. **Source:** s8 (WRONG: all four mormyrid species tested could do it; fact card) [HTML + v2]
   - BEFORE: a dual-channel integration that no other known animal performs in the same form.
   - AFTER: a skill found in every one of the four mormyrid species tested, its close relatives.
15. **Source:** s9 (OK soften: mormyrid range under 1 Hz to over 100 Hz; rate rises with novelty) [HTML + v2]
   - BEFORE: from as low as 1 per second to more than <b>80 per second depending on the complexity of what it is processing</b>. When a situation becomes more ambiguous or the field more dense with information, it fires faster.
   - AFTER: from under 1 per second to more than <b>80 per second depending on what it is sensing</b>, and its relatives can pass 100. When something new appears in the field, it fires faster.
16. **Source:** s5 (trait title: aggressively territorial toward its own species) [HTML]
   - BEFORE: >Non-aggressive</h3>
   - AFTER: >Fierce with its own kind</h3>
17. **Source:** s5 (template trait title) [v2]
   - BEFORE: "name": "Non-aggressive"
   - AFTER: "name": "Fierce with its own kind"
18. **Source:** s5 (WRONG: aggressively territorial toward its own species; harmless to other species) [HTML + v2]
   - BEFORE: Despite the sophistication of its sensory apparatus, Gnathonemus petersii is <b>non-aggressive</b>. Its cognitive architecture is directed toward navigation and detection, not combat. It uses its electric organ for communication and spatial mapping, not weaponry.
   - AFTER: Gnathonemus petersii is no danger to other species, but it is <b>aggressively territorial toward its own kind</b>, so keepers are told to house just one unless the tank is very large. It uses its electric organ for communication and spatial mapping, not weaponry.
19. **Source:** s5 (reading rebuilt on the corrected fact) [HTML + v2]
   - BEFORE: The most sophisticated reader in any room is not necessarily the most combative one.
   - AFTER: You are easy company for most people and fierce about the one patch that is yours.
20. **Source:** s5 (axis read: territorial toward its own kind) [HTML + v2]
   - BEFORE: it occupies a defined personal field that it reads and defends through signal rather than aggression.
   - AFTER: it holds a personal field and defends it hard against its own kind.
21. **Source:** s10 (WRONG last clause: Kreysing et al. 2012 found a retina built for turbid water) [HTML + v2]
   - BEFORE: The entire sensory architecture evolved for an environment where sight is effectively useless.
   - AFTER: Its senses are tuned to that murk, down to a retina with tiny light-collecting cups that help it see in cloudy water.
22. **Source:** s5 (mirror: organ in the tail, chin is the receptor) [HTML + v2]
   - BEFORE: The electric organ of Gnathonemus petersii is in its chin extension. The receptors for reading the field are distributed across its skin.
   - AFTER: The electric organ of Gnathonemus petersii is in its tail. The receptors for reading the field are spread across its skin and packed into its chin extension.
23. **Source:** s6, s7 (WRONG superlative: tree shrews and small birds have higher brain-to-body ratios; the record is the brain using over half the body's oxygen) mirror [HTML + v2]
   - BEFORE: the fish has more brain per gram than any non-human vertebrate, and that architecture exists almost entirely for processing signals
   - AFTER: the fish's brain burns more than half of the oxygen it takes in, and much of it is given to processing signals
24. **Source:** s5 (range: West and Central Africa; axis read) [HTML + v2]
   - BEFORE: murky West African rivers and lakes
   - AFTER: murky West and Central African rivers and lakes
25. **Source:** s14 (OK relabel: 心有靈犀一點通 is a line of Li Shangyin's Tang poem 無題, not a folk proverb) [HTML]
   - BEFORE: <p class="pf-proverb__note">A proverb we tie to the <a href="/chinese-zodiac/monkey/">Year of the Monkey</a>. The pairing is our own reading, not tradition.</p>
   - AFTER: <p class="pf-proverb__note">A line from the Tang poet Li Shangyin (李商隱, Lǐ Shāngyǐn), from his poem 無題 (Wútí, Untitled), not a folk proverb. We tie it to the <a href="/chinese-zodiac/monkey/">Year of the Monkey</a>; the pairing is our own reading, not tradition.</p>
26. **Source:** s14 (template proverb note, same relabel) [v2]
   - BEFORE: "note": "A proverb we tie to the Year of the Monkey. The pairing is our own reading, not tradition.",
   - AFTER: "note": "A line from the Tang poet Li Shangyin (李商隱, Lǐ Shāngyǐn), from his poem 無題 (Wútí, Untitled), not a folk proverb. We tie it to the Year of the Monkey; the pairing is our own reading, not tradition.",
27. **Source:** s6 (Szabo et al. 2004: no such paper found in the dossier or in a fresh web search; removed, replaced with the Guinness record source) [HTML]
   - BEFORE: <li><a href="https://doi.org/10.1007/s00359-003-0481-0" rel="noopener">Szabo, T. et al. (2004) — The mormyrid cerebellum: Functional anatomy and electrosensory processing, Journal of Comparative Physiology A</a></li>
   - AFTER: <li><a href="https://www.guinnessworldrecords.com/world-records/83113-most-energetic-animal-brain" rel="noopener">Guinness World Records · Most energetic animal brain (Nilsson 1996)</a></li>
28. **Source:** s10 (Amey-Özel et al. 2015: title not found in the dossier or in a fresh web search; removed, replaced with Kreysing et al. 2012) [HTML]
   - BEFORE: <li><a href="https://doi.org/10.3389/fnana.2015.00051" rel="noopener">Amey-Özel, M. et al. (2015) — More neurons but not larger brains: Functional similarities and differences between the elephant-nosed fish and other vertebrates, Frontiers in Neuroanatomy</a></li>
   - AFTER: <li><a href="https://cris.fau.de/publications/241422042" rel="noopener">Kreysing, M. et al. (2012) · Photonic crystal light collectors in fish retina improve vision in turbid water, Science</a></li>
29. **Source:** s6 (template reference, Szabo replaced) [v2]
   - BEFORE: "label": "Szabo, T. et al. (2004) — The mormyrid cerebellum: Functional anatomy and electrosensory processing, Journal of Comparative Physiology A",\n        "href": "https://doi.org/10.1007/s00359-003-0481-0"
   - AFTER: "label": "Guinness World Records · Most energetic animal brain (Nilsson 1996)",\n        "href": "https://www.guinnessworldrecords.com/world-records/83113-most-energetic-animal-brain"
30. **Source:** s10 (template reference, Amey-Özel replaced) [v2]
   - BEFORE: "label": "Amey-Özel, M. et al. (2015) — More neurons but not larger brains: Functional similarities and differences between the elephant-nosed fish and other vertebrates, Frontiers in Neuroanatomy",\n        "href": "https://doi.org/10.3389/fnana.2015.00051"
   - AFTER: "label": "Kreysing, M. et al. (2012) · Photonic crystal light collectors in fish retina improve vision in turbid water, Science",\n        "href": "https://cris.fau.de/publications/241422042"
31. **Source:** s8 (mirror: the shape plus conductivity skill is shared with other mormyrids) [HTML + v2]
   - BEFORE: No other known animal does this with the same precision in a single sensory act. The result is a spatial understanding of the environment that is more complete than what other fish in the same river are producing.
   - AFTER: Its mormyrid relatives share the skill. The result is a spatial understanding of the environment that is more complete than what most other fish in the same river are producing.
   - Template: animalHan "电" to "象鼻魚", animalHanPy "diàn" to "xiàngbíyú" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## siberian-crane

1. **Source:** s11 (header: 鹤 hè is crane in general and simplified; this bird is 白鶴 báihè) (header rail__han) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">鹤</span>
   - AFTER: <span class="rail__han" aria-hidden="true">白鶴</span>
2. **Source:** s11 (header: 鹤 hè is crane in general and simplified; this bird is 白鶴 báihè) (header pronounce buttons) (count: HTML x2) [HTML]
   - BEFORE: data-say="鹤" aria-label="Hear 鹤, hè"
   - AFTER: data-say="白鶴" aria-label="Hear 白鶴, báihè"
3. **Source:** s11 (header: 鹤 hè is crane in general and simplified; this bird is 白鶴 báihè) (header rail__py) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">hè</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">báihè</span>
4. **Source:** s11 (header: 鹤 hè is crane in general and simplified; this bird is 白鶴 báihè) (header serial-han) [HTML]
   - BEFORE: <span class="serial-han">鹤</span>
   - AFTER: <span class="serial-han">白鶴</span>
5. **Source:** s11 (header: 鹤 hè is crane in general and simplified; this bird is 白鶴 báihè) (header keepsake .h/.py) [HTML]
   - BEFORE: <span class="h" lang="zh">鹤</span><span class="py" lang="zh-Latn-pinyin">hè</span>
   - AFTER: <span class="h" lang="zh">白鶴</span><span class="py" lang="zh-Latn-pinyin">báihè</span>
6. **Source:** s11 (header: 鹤 hè is crane in general and simplified; this bird is 白鶴 báihè) (template animalHan) [v1]
   - BEFORE: "animalHan": "鹤"
   - AFTER: "animalHan": "白鶴"
7. **Source:** s11 (header: 鹤 hè is crane in general and simplified; this bird is 白鶴 báihè) (template animalHanPy) [v1]
   - BEFORE: "animalHanPy": "hè"
   - AFTER: "animalHanPy": "báihè"
8. **Source:** s5 (OK soften: ADW says males lift the wings over the back) [HTML + v1]
   - BEFORE: the male raises both wings fully overhead as he calls
   - AFTER: the male lifts his wings up over his back as he calls
9. **Source:** s5, s6 (UNVERIFIABLE: 625 km2 appears only in ADW and is implausible as a defended territory; "unusual among cranes" and "roosts apart" in no source) [HTML + v1]
   - BEFORE: Siberian Cranes are territorial <b>during both the breeding season and the winter</b>, an unusual pattern among cranes, holding an average territory of roughly <b>625 square kilometers</b> and roosting apart from other crane species sharing the same wetland.
   - AFTER: Siberian Cranes are territorial <b>during both the breeding season and the winter</b>, holding feeding territories on their wintering grounds, though some winter in small, loose flocks.
10. **Source:** s5, s6 (UNVERIFIABLE: 625 km2 appears only in ADW and is implausible as a defended territory; "unusual among cranes" and "roosts apart" in no source) trait title [HTML + v1]
   - BEFORE: Territory kept in a season no one else defends it
   - AFTER: Territory kept in winter too
11. **Source:** s5, s6 (UNVERIFIABLE: 625 km2 appears only in ADW and is implausible as a defended territory; "unusual among cranes" and "roosts apart" in no source) reading line [HTML + v1]
   - BEFORE: Most of your relatives relax the line once the busy season ends.
   - AFTER: Plenty of birds relax the line once the busy season ends.
12. **Source:** s5, s6 (UNVERIFIABLE: 625 km2 appears only in ADW and is implausible as a defended territory; "unusual among cranes" and "roosts apart" in no source) axis read [HTML + v1]
   - BEFORE: You keep a defended territory of roughly six hundred square kilometers, and you keep it in winter as fiercely as you keep it in the season you're raising young, which almost none of your relatives bother to do. Other cranes roost in loose crowds. You roost close enough
   - AFTER: You keep a defended territory, and you keep it in winter as fiercely as you keep it in the season you're raising young. You stay close enough
13. **Source:** s5, s6 (UNVERIFIABLE: 625 km2 appears only in ADW and is implausible as a defended territory; "unusual among cranes" and "roosts apart" in no source) dial read [HTML + v1]
   - BEFORE: defending the same six hundred square kilometers in every season
   - AFTER: defending the same ground in every season
14. **Source:** s7 (OK soften number: ICF gives the East Asian flyway as nearly 6,000 km) [HTML + v1]
   - BEFORE: roughly <b>5,000 kilometers</b>
   - AFTER: roughly <b>5,000 to 6,000 kilometers</b>
15. **Source:** s6, s7, s13 (OK soften: Wikipedia gives about 93 and 98 percent; ICF says virtually all) [HTML + v1]
   - BEFORE: More than <b>95 percent of the entire wild population</b>
   - AFTER: Nearly <b>the whole wild population</b>
16. **Source:** s5, s6 (UNVERIFIABLE: "for life" and "the same wetland" each year not in any opened source) [HTML + v1]
   - BEFORE: defends the same wetland in two different countries and two different seasons, and pairs with one mate for life.
   - AFTER: defends its ground in two different countries and two different seasons, and pairs and duets with one mate.
   - Template: animalHan "鹤" to "白鶴", animalHanPy "hè" to "báihè" (v1). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.
## Header check

- giant-armadillo: 犰 qiú (no meaning alone; only part of 犰狳 qiúyú) to 大犰狳 dà qiúyú.
- portuguese-man-o-war: 僧帽水母 sēngmào shuǐmǔ confirmed against the dossier (s8). Unchanged.
- sailfish: 旗魚 qíyú confirmed against the dossier (s6, s7). Unchanged.
- sea-angel: 海天使 kept (s10: used in Chinese for this animal); pinyin respaced from hǎitiānshǐ to hǎi tiānshǐ. The species name 裸海蝶 luǒ hǎi dié (naked sea butterfly) was not added; owner's call.
- elephantnose-fish: 电 diàn (simplified "electricity") to 象鼻魚 xiàngbíyú.
- siberian-crane: 鹤 hè (crane in general, and simplified) to 白鶴 báihè.

## Not changed, and why

- giant-armadillo rootedness read "keeps to one home range for years, sometimes for a whole life": reading voice about range fidelity; the dossier only flags the "never the same shelter twice" absolute, which is fixed. Kept.
- giant-armadillo trait title "The armor that does not close" and its reading: still true (it cannot roll up). Kept.
- giant-armadillo proverb 猪往前拱，鸡往后刨 is in simplified characters on a traditional page; not in this audit, left for a sitewide glyph pass.
- portuguese-man-o-war "four organisms, one entity" and the "four zooid types" title: the dossier calls four the common simplification (OK nuance); the fact card now says "four main kinds of zooid". Readings built on four kept.
- portuguese-man-o-war aggregation reading "The gathering is produced by the storm": storm is now a figure of speech in the reading, not a stated fact. Kept.
- portuguese-man-o-war NOAA reference links to oceanservice.noaa.gov/facts/man-o-war.html while the dossier opened /facts/portuguese-man-o-war.html. Link not touched; owner may want to check it resolves.
- portuguese-man-o-war live copy carries many em dashes (dossier STYLE note). Left for a copy pass; no new text adds any.
- sailfish adaptability read and recognition list still call the sail "a communication tool": general framing, and the sail is raised to corral prey. Kept.
- sailfish reading "Your primary tool has costs. Using it wrong bleeds speed.": reading voice; the drag claim was cut from the fact. Kept.
- sailfish IUCN reference kept.
- sea-angel Arctic framing in hero, habitat, palette and FAQ kept: C. limacina is an Arctic and North Atlantic animal; only "Antarctic" was wrong.
- sea-angel "Horse year" glyph 马 (simplified) beside 馬 in the proverb: template-wide year glyph, left for a sitewide pass.
- sea-angel Lalli and Gilmer (1989) reference kept (real book).
- sea-angel keeper stone line was template-only (not rendered on the page); fixed in v2 only.
- elephantnose-fish proverb tiles and ruby are in simplified characters (心有灵犀一点通) inside a lang="zh-Hant" block, and the "Hear the whole verse" button has an English data-say ("When two minds share understanding...") instead of the hanzi. The note now credits Li Shangyin; the character conversion and the data-say bug touch the proverb widget, left for the owner.
- elephantnose-fish section label "The proverb of your year" is the shared section name; the note under it now says it is a poem line, not a folk proverb.
- elephantnose-fish overture title "a higher brain-to-body ratio than humans": true (3.1% vs about 2%). Kept. The ov-frame "brain-to-body ratio that exceeds humans" kept for the same reason.
- elephantnose-fish von der Emde and Fetz (2007) reference kept: the DOI is a J Exp Biol 2007 paper on object recognition in electric fish; the dossier could not open it, so the owner may want to confirm the exact title.
- siberian-crane meta/og/JSON-LD line "a migrant that always lands on the same wetland": nearly the whole population winters at Poyang Lake, so kept. The intro's "defends the same wetland" was softened.
- siberian-crane proverb 老马识途 is simplified on a traditional page (the dossier source is 老馬識途); left for a sitewide glyph pass.
- siberian-crane element and reading lines about "the same wetland, held and returned to" are reading voice. Kept.
- Existing em dashes and "not X, it is Y" lines in reading copy on these pages were left for a copy pass. No new text adds any.

## Structure check

All six pages parse with python html.parser. The HTML tag sequence matches the backups on four pages; giant-armadillo gains one reference `<li><a>` (Mongabay, ecosystem engineer), and siberian-crane loses one `<b>` pair (the cut 625 km2 figure). Every JSON-LD and application/json block parses (4 per page); section counts match the backups (31). All edited template JSON loads and nested keysets are unchanged (raw text edits, same format and trailing-newline state). No old header glyph left anywhere in the edited pages or template files (犰 alone, 电, 鹤 all at zero). No new em dash, en dash or arrow in new text; no banned words; every new hanzi carries pinyin; no escaped <b>. No CSS or JS touched. Git not run.

## Final header characters

- giant-armadillo: 大犰狳 dà qiúyú (was 犰 qiú)
- portuguese-man-o-war: 僧帽水母 sēngmào shuǐmǔ (unchanged)
- sailfish: 旗魚 qíyú (unchanged)
- sea-angel: 海天使 hǎi tiānshǐ (glyphs unchanged; pinyin was hǎitiānshǐ)
- elephantnose-fish: 象鼻魚 xiàngbíyú (was 电 diàn)
- siberian-crane: 白鶴 báihè (was 鹤 hè)
