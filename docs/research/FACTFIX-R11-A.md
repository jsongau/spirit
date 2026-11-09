# FACTFIX-R11-A change log

Date: 2026-11-08. Pages: african-grey-parrot, avocet, banded-mongoose, blue-glaucus, blue-ringed-octopus.
Method copied from FACTFIX-R10-A. Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). Where a string occurred more than once in a file every occurrence was replaced (counts noted). african-grey-parrot has v1 only; avocet and blue-glaucus have v2 only; banded-mongoose and blue-ringed-octopus have both (blue-ringed-octopus v2 is an unfilled stub: only its animalHan placeholder was filled).
Backups of the original pages: `~/factfix-backup-r11a/<slug>.html`; original template JSON in `~/factfix-backup-r11a/tpl/v1/` and `~/factfix-backup-r11a/tpl/v2/`; original `tools/han-pinyin.json` at `~/factfix-backup-r11a/han-pinyin.json` (all outside the repo).
Glyphs use traditional forms to match the site. Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. `tools/han-pinyin.json` updated for every changed header.
Purple Star: only banded-mongoose carried a star assignment (天府 Tiān Fǔ, 天同 Tiān Tóng placed in palaces for the Taurus Dog crossing). Its lead, both star reads and the close were made honest (see items). The other four pages carry only Purple Star links that already say charts come from lunar birth date and hour. Nothing changed there. Proverb pairings on all five pages are already labeled as our own reading. Related Animals explore-card labels not touched.

## african-grey-parrot

1. **Source:** s12, s15 (header: 鹦 yīng is the simplified first half of 鸚鵡 yīngwǔ and a bound syllable on its own; traditional 鸚鵡 yīngwǔ, parrot) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">鹦</span>
   - AFTER: <span class="rail__han" aria-hidden="true">鸚鵡</span>
2. **Source:** s12, s15 (header: 鹦 yīng is the simplified first half of 鸚鵡 yīngwǔ and a bound syllable on its own; traditional 鸚鵡 yīngwǔ, parrot) [HTML]
   - BEFORE: data-say="鹦" aria-label="Hear 鹦, yīng"
   - AFTER: data-say="鸚鵡" aria-label="Hear 鸚鵡, yīngwǔ"
3. **Source:** s12, s15 (header: 鹦 yīng is the simplified first half of 鸚鵡 yīngwǔ and a bound syllable on its own; traditional 鸚鵡 yīngwǔ, parrot) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">yīng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">yīngwǔ</span>
4. **Source:** s12, s15 (header: 鹦 yīng is the simplified first half of 鸚鵡 yīngwǔ and a bound syllable on its own; traditional 鸚鵡 yīngwǔ, parrot) [HTML]
   - BEFORE: <span class="serial-han">鹦</span>
   - AFTER: <span class="serial-han">鸚鵡</span>
5. **Source:** s12, s15 (header: 鹦 yīng is the simplified first half of 鸚鵡 yīngwǔ and a bound syllable on its own; traditional 鸚鵡 yīngwǔ, parrot) [HTML]
   - BEFORE: <span class="h" lang="zh">鹦</span><span class="py" lang="zh-Latn-pinyin">yīng</span>
   - AFTER: <span class="h" lang="zh">鸚鵡</span><span class="py" lang="zh-Latn-pinyin">yīngwǔ</span>
6. **Source:** s9, s6 (Alex study ran about thirty years, to his death in 2007) [HTML + v1]
   - BEFORE: One African grey parrot named Alex, studied for more than two decades,
   - AFTER: One African grey parrot named Alex, studied for about thirty years,
7. **Source:** s6 (soften: ADW says "said to prefer" river islands and the flock is "usually" quiet after calling at dusk) [HTML + v1]
   - BEFORE: often preferring islands in rivers, breaking into smaller groups
   - AFTER: said to favor islands in rivers, breaking into smaller groups
8. **Source:** s6 (soften, same item) [HTML + v1]
   - BEFORE: with the flock falling silent from sunset until the next dawn chorus.
   - AFTER: with the flock calling as it settles and then usually quiet from sunset until the next dawn chorus.
9. **Source:** s6, s7 (WRONG detail: courtship feeding is male to female, calls are soft repeated notes, not duets) [HTML + v1]
   - BEFORE: with courtship that includes mutual feeding and soft duetted calls before
   - AFTER: with courtship in which the male feeds his mate and both sing soft, repeated notes before
10. **Source:** s6, s7, s8 (WRONG: bill is black and the bare face white, so the tail is not the only non-grey part) [HTML + v1]
   - BEFORE: a <b>scarlet-red tail</b>, the only part of the bird that is not some shade of grey.
   - AFTER: a <b>scarlet-red tail</b>, set against grey feathers, a black bill and a bare white face.
   - Template: animalHan "鹦" to "鸚鵡", animalHanPy "yīng" to "yīngwǔ" (v1). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## avocet

1. **Source:** s10 (header: WRONG: 弧 hú means arc, not the bird; species name 反嘴鷸 fǎnzuǐyù, reversed-beak sandpiper) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">弧</span>
   - AFTER: <span class="rail__han" aria-hidden="true">反嘴鷸</span>
2. **Source:** s10 (header: WRONG: 弧 hú means arc, not the bird; species name 反嘴鷸 fǎnzuǐyù, reversed-beak sandpiper) [HTML]
   - BEFORE: data-say="弧" aria-label="Hear 弧, hú"
   - AFTER: data-say="反嘴鷸" aria-label="Hear 反嘴鷸, fǎnzuǐyù"
3. **Source:** s10 (header: WRONG: 弧 hú means arc, not the bird; species name 反嘴鷸 fǎnzuǐyù, reversed-beak sandpiper) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">hú</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">fǎnzuǐyù</span>
4. **Source:** s10 (header: WRONG: 弧 hú means arc, not the bird; species name 反嘴鷸 fǎnzuǐyù, reversed-beak sandpiper) [HTML]
   - BEFORE: <span class="serial-han">弧</span>
   - AFTER: <span class="serial-han">反嘴鷸</span>
5. **Source:** s10 (header: WRONG: 弧 hú means arc, not the bird; species name 反嘴鷸 fǎnzuǐyù, reversed-beak sandpiper) [HTML]
   - BEFORE: <span class="h" lang="zh">弧</span><span class="py" lang="zh-Latn-pinyin">hú</span>
   - AFTER: <span class="h" lang="zh">反嘴鷸</span><span class="py" lang="zh-Latn-pinyin">fǎnzuǐyù</span>
6. **Source:** s6 (uniqueness and visibility claims unverifiable; touch is one method, it also pecks and hunts by sight) [HTML + v2]
   - BEFORE: detecting aquatic invertebrates by touch — a method unique among European shorebirds, independent of visibility conditions in the water.
   - AFTER: detecting aquatic invertebrates by touch, though it also pecks at the mud and takes prey it can see.
7. **Source:** s12, s6 (UNVERIFIABLE bill receptors cut; replaced with what is documented (direct touch; no pits found in the related stilt)) [HTML + v2]
   - BEFORE: The avocet's bill contains <b>sensory receptors that detect prey through tactile pressure</b> in the water column, allowing it to find invertebrates in turbid or low-visibility conditions where visual hunting would fail.
   - AFTER: The avocet's sweeping bill <b>finds prey by direct touch</b>, snapping shut on what it brushes. In its close relative the black-winged stilt, researchers looking for the touch-sensing pits of sandpipers and kiwi found none; avocet bills have not yet been checked.
8. **Source:** s6 (soften: philopatric, about 90% adult return; many southern birds are resident) [HTML + v2]
   - BEFORE: returning to the same nesting locations in consecutive breeding seasons — a colonial wader that ranges widely in winter and comes back precisely each spring.
   - AFTER: returning to the same nesting locations in consecutive breeding seasons, and ringing shows birds nesting where they hatched. Northern birds travel south for winter, while many Mediterranean and African birds stay put all year.
9. **Source:** s11, s6 (narrowed to recorded mobbing (crows, buzzards) and the broken-wing display) [HTML + v2]
   - BEFORE: recorded mobbing humans, dogs, foxes, and large raptors — alarm-calling, feigning injury, and diving at intruders until they leave the colony perimeter.
   - AFTER: recorded at one Welsh reserve mobbing carrion crows and common buzzards, often several birds at once, and parents feign a broken wing to lead intruders away from the nest.
10. **Source:** s6, s12 (axis read: touch is one method; "where sight is useless" unsourced) [HTML + v2]
   - BEFORE: The avocet locates prey entirely through tactile sensation — the upturned bill sweeping side-to-side through the water column, registering invertebrates by touch rather than sight. It finds by feel in conditions where sight is useless.
   - AFTER: The avocet locates much of its prey by touch, the upturned bill sweeping side to side through the shallows and closing on invertebrates it cannot see. It finds by feel where sight would struggle.
11. **Source:** s6 (axis read: many populations are resident) [HTML + v2]
   - BEFORE: The avocet is migratory — it ranges widely — but returns with precision to the same nesting sites year after year.
   - AFTER: Many avocets migrate and range widely, yet return to the same nesting sites year after year.
12. **Source:** s11, s6 (axis read: mobbing of humans and dogs not sourced) [HTML + v2]
   - BEFORE: it will mob humans, dogs, and large predators without hesitation.
   - AFTER: it will mob crows and buzzards without hesitation.
13. **Source:** s6 (range also includes Africa) [HTML + v2]
   - BEFORE: is a striking wader of European and Asian estuaries and shallow wetlands:
   - AFTER: is a striking wader of estuaries and shallow wetlands across Europe, Asia and Africa:
14. **Source:** s6 (lead: touch is one method, not the only one) [HTML + v2]
   - BEFORE: to find prey by touch rather than by sight.
   - AFTER: to find much of its prey by touch.
15. **Source:** s1, s3 (STYLE FLAG: Virgo Earth is a Western element, not a Wu Xing phase; labeled as our image) [HTML + v2]
   - BEFORE: Your Western sign adds a second note: Virgo carries Earth. Fire generates Earth in the five-phase cycle — the Horse's restless, ground-covering energy feeds and activates Virgo's systematic method.
   - AFTER: Your Western sign adds a second note: Virgo is an Earth sign. That Earth belongs to Western astrology and has no place among the five phases, so the link here is our own image: in the five-phase cycle Fire generates Earth, and the Horse's restless, ground-covering energy feeds Virgo's systematic method.
16. **Source:** dossier item 'Cited books' (UNVERIFIABLE: real books, never opened, so they cannot be shown to back any claim) [HTML + v2]
   - BEFORE: source list entries 'Cramp S, Simmons KEL, eds (1983), Handbook of the Birds of Europe, the Middle East and North Africa, Vol. 3' and 'Piersma T, van Gils JA (2011), The Flexible Phenotype'
   - AFTER: both entries removed (HTML `<li>` x2; v2 sources list objects x2)
   - Template: animalHan "弧" to "反嘴鷸", animalHanPy "hú" to "fǎnzuǐyù" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## banded-mongoose

1. **Source:** s6, s7 (tighten: 64% in Hodge et al. 2011) [HTML + v1 + v2]
   - BEFORE: In roughly two-thirds of breeding attempts,
   - AFTER: In about 64% of breeding attempts,
2. **Source:** s10, s11 (WRONG: "often unrelated" unsupported (escorts do not choose by kinship); "frequently male" unverifiable; the pup keeps the bond) [HTML + v1 + v2]
   - BEFORE: Certain adults, often unrelated to a given pup and frequently male, form a <b>one-to-one bond with a single pup that is not their own</b>, carrying, feeding, grooming, and defending that one pup for roughly two months until it can forage for itself.
   - AFTER: Certain adults form a <b>one-to-one bond with a single pup that is not their own</b>, carrying, feeding, grooming, and defending that one pup for roughly two months until it can forage for itself. Escorts do not pick by kinship, and the pup keeps the pair together by following its adult.
3. **Source:** s15, s14 (charge, screeching and size of predators unverifiable; rewritten on National Zoo and ADW wording) [HTML + v1 + v2]
   - BEFORE: will <b>bunch into a single writhing mass and charge together</b>, screeching and heaving as one body, a display coordinated enough to drive off predators many times the size of one mongoose.
   - AFTER: will <b>bunch into a single moving mass</b>, young in the middle, so the group looks like one large animal, with the mongooses at the front lunging at the threat.
4. **Source:** s13, s15, s14 (soften: every few days to a week, often back to favorite dens) [HTML + v1 + v2]
   - BEFORE: and relocates to a new one every two to three days rather than defending one fixed burrow indefinitely.
   - AFTER: and moves to a new one every few days, often returning to favorite dens, rather than defending one fixed burrow.
5. **Source:** s13, s15, s14 (axis read, same) [HTML + v1 + v2]
   - BEFORE: The pack changes its den every two or three nights,
   - AFTER: The pack changes its den every few nights,
6. **Source:** s5 (NOT TRADITIONAL: labeled as our reading) [HTML + v1 + v2]
   - BEFORE: A fair-minded loyalty that refuses to protect one person more than another
   - AFTER: Loyalty and a protective streak toward its own, which we read here as refusing to protect one person more than another
7. **Source:** s22 (Purple Star: a sun sign and year animal place no stars; lead made honest) [HTML + v2]
   - BEFORE: twelve palaces of a life, and read for the Taurus Dog crossing it keeps landing on the same two.
   - AFTER: twelve palaces of a life. Which stars lead in a chart depends on the birth hour, so for the Taurus Dog crossing we chose two that fit the archetype, as our own reading.
8. **Source:** s22 (Purple Star: palace placement claim removed (命宮 had no pinyin)) [HTML + v2]
   - BEFORE: For a Taurus born in the Dog year it tends to sit close to the Life Palace, 命宮, and it names a habit
   - AFTER: We pair it with this crossing as our own reading, and it names a habit
9. **Source:** s22 (Purple Star: palace placement claim made conditional; pinyin added) [HTML + v2]
   - BEFORE: On the Dog side of this crossing it tends to land near the palace of siblings and friends, 兄弟宮, the palace of the wider circle, and it reads as a plain fact about you:
   - AFTER: In a chart where it sits in the palace of siblings and friends, 兄弟宮 xiōngdì gōng, the palace of the wider circle, it describes something we see in this crossing:
10. **Source:** s22 (Purple Star: close no longer implies both stars sit in every Taurus Dog chart) [HTML + v2]
   - BEFORE: Those two rarely arrive alone. Your exact birth hour is what moves them into your own twelve palaces and shows whether the storehouse or the harmony runs loudest, and which one has quietly been guarding the favorite you have not named yet.
   - AFTER: Your own chart may lead with neither of these two. Your exact birth hour is what places the stars in your twelve palaces and shows which of them has quietly been guarding the favorite you have not named yet.

## blue-glaucus

1. **Source:** s13, s14, s15 (header: WRONG: 藍龍海蛞蝓 is a coined blend; 藍龍 lánlóng, blue dragon, is a listed alias) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">藍龍海蛞蝓</span>
   - AFTER: <span class="rail__han" aria-hidden="true">藍龍</span>
2. **Source:** s13, s14, s15 (header: WRONG: 藍龍海蛞蝓 is a coined blend; 藍龍 lánlóng, blue dragon, is a listed alias) [HTML]
   - BEFORE: data-say="藍龍海蛞蝓" aria-label="Hear 藍龍海蛞蝓, lánlóng hǎikuòyú"
   - AFTER: data-say="藍龍" aria-label="Hear 藍龍, lánlóng"
3. **Source:** s13, s14, s15 (header: WRONG: 藍龍海蛞蝓 is a coined blend; 藍龍 lánlóng, blue dragon, is a listed alias) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">lánlóng hǎikuòyú</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">lánlóng</span>
4. **Source:** s13, s14, s15 (header: WRONG: 藍龍海蛞蝓 is a coined blend; 藍龍 lánlóng, blue dragon, is a listed alias) [HTML]
   - BEFORE: <span class="serial-han">藍龍海蛞蝓</span>
   - AFTER: <span class="serial-han">藍龍</span>
5. **Source:** s13, s14, s15 (header: WRONG: 藍龍海蛞蝓 is a coined blend; 藍龍 lánlóng, blue dragon, is a listed alias) [HTML]
   - BEFORE: <span class="h" lang="zh">藍龍海蛞蝓</span><span class="py" lang="zh-Latn-pinyin">lánlóng hǎikuòyú</span>
   - AFTER: <span class="h" lang="zh">藍龍</span><span class="py" lang="zh-Latn-pinyin">lánlóng</span>
6. **Source:** s7, s6 (WRONG: anatomy reversed; the upturned blue side is the true underside (foot), the silvery downward side the true back) [HTML + v2]
   - BEFORE: the blue dorsal surface (facing up) blends with the ocean's color when seen from above by birds; the silver ventral surface (facing down) blends with the bright sky when seen from below by fish.
   - AFTER: the blue underside, turned up to the sky, blends with the ocean's color when seen from above by birds; the silvery back, turned down, blends with the bright surface when seen from below by fish.
7. **Source:** s7, s6 (palette text, same anatomy fix) [HTML + v2]
   - BEFORE: The counter-blue of the dorsal surface — the color that makes the animal invisible from above.
   - AFTER: The counter-blue of the upturned underside, the color that makes the animal hard to see from above.
8. **Source:** s7, s6 (palette text, same anatomy fix) [HTML + v2]
   - BEFORE: The silver of the ventral surface — the camouflage for the view from below — brings
   - AFTER: The silver of the back, turned down as camouflage for the view from below, brings
9. **Source:** s7, s6, s10 (soften: Rudman says it "appears" to select; sting can be harder than the man o' war) [HTML + v2]
   - BEFORE: It selects and concentrates the most potent nematocysts, delivering a sting more dangerous than the Man o' War itself.
   - AFTER: It appears to keep the most venomous ones, and with them packed together it can sting harder than a Man o' War.
10. **Source:** s6, s8 (WRONG: it can swim slowly with its cerata, though it rarely does) [HTML + v2]
   - BEFORE: The Blue Glaucus has <b>no means of self-propulsion</b>. It is entirely dependent on wind and ocean current for movement, traveling wherever
   - AFTER: The Blue Glaucus <b>mostly drifts with wind and current</b>, swimming only slowly with its cerata when it must, and travels wherever
11. **Source:** s6, s8 (axis read, same) [HTML + v2]
   - BEFORE: The Blue Glaucus does not propel itself. It is carried.
   - AFTER: The Blue Glaucus rarely propels itself. It is carried.
12. **Source:** s6, s8 (axis read, same) [HTML + v2]
   - BEFORE: Wind-driven migration with no self-propulsion.
   - AFTER: Wind-driven travel with almost no swimming.
13. **Source:** s6, s9, s7, s8 (WRONG: three centimeters is typical, not the maximum) [HTML + v2]
   - BEFORE: An adult Blue Glaucus reaches a maximum of <b>three centimeters</b> in length
   - AFTER: An adult Blue Glaucus is usually about <b>three centimeters</b> long
14. **Source:** s11, s7 ("has no gills" and "camouflage through pattern" unverifiable; cut) [HTML + v2]
   - BEFORE: serve multiple functions: gas exchange (the animal has no gills), camouflage through pattern, and nematocyst storage. Each structure is adaptation performing several tasks at once.
   - AFTER: serve more than one function: they help the animal breathe, and their tips store the stolen nematocysts. Each structure is adaptation doing more than one job at once.
   - Template: animalHan "藍龍海蛞蝓" to "藍龍", animalHanPy "lánlóng hǎikuòyú" to "lánlóng" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## blue-ringed-octopus

1. **Source:** s11, s12, s13 (header: WRONG reading: 蛸 means octopus only as shāo, xiāo is the mantis egg case; 藍環章魚 lánhuán zhāngyú, blue-ring octopus) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">蛸</span>
   - AFTER: <span class="rail__han" aria-hidden="true">藍環章魚</span>
2. **Source:** s11, s12, s13 (header: WRONG reading: 蛸 means octopus only as shāo, xiāo is the mantis egg case; 藍環章魚 lánhuán zhāngyú, blue-ring octopus) [HTML]
   - BEFORE: data-say="蛸" aria-label="Hear 蛸, xiāo"
   - AFTER: data-say="藍環章魚" aria-label="Hear 藍環章魚, lánhuán zhāngyú"
3. **Source:** s11, s12, s13 (header: WRONG reading: 蛸 means octopus only as shāo, xiāo is the mantis egg case; 藍環章魚 lánhuán zhāngyú, blue-ring octopus) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">xiāo</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">lánhuán zhāngyú</span>
4. **Source:** s11, s12, s13 (header: WRONG reading: 蛸 means octopus only as shāo, xiāo is the mantis egg case; 藍環章魚 lánhuán zhāngyú, blue-ring octopus) [HTML]
   - BEFORE: <span class="serial-han">蛸</span>
   - AFTER: <span class="serial-han">藍環章魚</span>
5. **Source:** s11, s12, s13 (header: WRONG reading: 蛸 means octopus only as shāo, xiāo is the mantis egg case; 藍環章魚 lánhuán zhāngyú, blue-ring octopus) [HTML]
   - BEFORE: <span class="h" lang="zh">蛸</span><span class="py" lang="zh-Latn-pinyin">xiāo</span>
   - AFTER: <span class="h" lang="zh">藍環章魚</span><span class="py" lang="zh-Latn-pinyin">lánhuán zhāngyú</span>
6. **Source:** s6, s5, s7 (WRONG size: about 12 to 20 cm across the arms; "as little as" removed) [HTML + v1]
   - BEFORE: can weigh as little as <b>10 to 100 grams and measure roughly 10 centimetres</b>,
   - AFTER: weighs about <b>10 to 100 grams and spans about 12 to 20 centimetres across the arms</b>,
7. **Source:** s6, s5 (single soft source; species-labelled and hedged) [HTML + v1]
   - BEFORE: A female lays a single clutch of <b>60 to 100 eggs, broods them for around 50 days without eating,
   - AFTER: A female greater blue-ringed octopus lays a single clutch of <b>about 60 to 100 eggs, broods them for about 50 days without eating,
8. **Source:** s6 (UNVERIFIABLE single home crevice; softened) [HTML + v1]
   - BEFORE: and keeps a single crevice as a base to return to between hunts.
   - AFTER: and hides in crevices and empty shells.
   - Template: animalHan "蛸" to "藍環章魚", animalHanPy "xiāo" to "lánhuán zhāngyú" (v1); v2 animalHan placeholder "TODO: one hanzi for the creature" to "藍環章魚" (v2 has no animalHanPy key, none added). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## Header check (kept glyphs)

- banded-mongoose 獴 měng: dossier verdict OK (generic; names the mongoose family). Species name 縞獴 gǎoměng offered as an optional upgrade only, so the header was kept. Pinyin present in rail__py, keepsake .py and both button aria-labels. Unchanged.

## Not changed, and why

- african-grey-parrot vigilant-descent fact: OK in the dossier, though worded close to ADW. Left as is; a copy pass can rephrase it.
- african-grey-parrot range "West and Central Africa": OK (note split). The 2007 Timneh split was not added. Conservation status is not stated on the page; nothing to fix (do not copy ADW's out-of-date Near Threatened if one is added: IUCN 2016 Endangered, CITES Appendix I).
- african-grey-parrot hero glyph 狗 and avocet hero glyph 马 (simplified) show no pinyin (dossier: sitewide issue). Not a header item; left for a sitewide pass.
- avocet readings still lean on the touch-in-turbid-water image ("the water is simply too turbid for eyes to work", "a turbid column", "Tactile intelligence" trait title, "Finding through systematic touch"). Reading voice; the facts under them are now honest. Owner may want the Instinct signature (5 of 5) re-based.
- avocet page keeps many existing em dashes and "is not X, it is Y" lines in untouched reading copy. No new text adds any.
- banded-mongoose infanticide fact: OK; the dossier asks to cite Cant et al. 2013 PNAS beside the Biology Letters paper. The source list was not extended this pass (needs a template sources entry); the wording was already fine.
- banded-mongoose "one writhing mass" in the Openness axis read and the "The mobbing wall" trait title: reading voice, kept; the fact underneath was rewritten.
- banded-mongoose "The Dog's fair-minded loyalty worn under eleven other suns" (explore line): interpretive, kept.
- blue-glaucus readings and hero copy still say the stolen sting is "more potent than its source" in many places. The dossier marks the venom item OK (soften); the fact now says it appears to keep the most venomous cells and can sting harder. Reading echoes kept.
- blue-glaucus "three centimeters" in the overture title, lead and readings: typical size, kept; only the "maximum" claim was wrong.
- blue-glaucus Lunar New Year note (MISSING): would be new content, not a fact fix. Not added.
- blue-glaucus header: the standard name is 大西洋海神海蛞蝓 Dàxīyáng hǎishén hǎikuòyú (eight characters, too long for the rail); the listed alias 藍龍 lánlóng was used per the dossier's short-glyph option.
- blue-ringed-octopus IUCN Red List source (Hapalochlaena lunulata): UNVERIFIABLE only because IUCN blocks automated fetch. Kept; a person should confirm the listing.
- blue-ringed-octopus "keeps a crevice" lines in readings, room card and axis reads: our-reading voice, kept; only the habitat fact was softened.
- blue-ringed-octopus header: dossier notes its dictionary source is unreviewed; a Chinese reader should confirm 藍環章魚 lánhuán zhāngyú (it is the name the National Museum of Natural Science, Taiwan uses).

## Structure check

All five pages parse with python html.parser. Every JSON-LD and application/json block parses (4 per page). Section counts match the backups. The HTML tag sequence matches the backups on four pages; avocet has 4 fewer tags (the two removed source `<li><a>` entries). All edited template JSON and `tools/han-pinyin.json` load; template text edits were made in place, and the avocet v2 source removal was written with the same indent=2, ensure_ascii=False format and no trailing newline, which round-trips the original byte for byte. No leftover old header glyph or old header pinyin on any changed page or template. No new em dash, en dash or arrow in any new text; no banned words; every new hanzi carries pinyin; no escaped `<b>`. No CSS or JS touched. Git not run.

## Final header characters

- african-grey-parrot: 鸚鵡 yīngwǔ (was 鹦 yīng)
- avocet: 反嘴鷸 fǎnzuǐyù (was 弧 hú)
- banded-mongoose: 獴 měng (unchanged)
- blue-glaucus: 藍龍 lánlóng (was 藍龍海蛞蝓 lánlóng hǎikuòyú)
- blue-ringed-octopus: 藍環章魚 lánhuán zhāngyú (was 蛸 xiāo)
