# FACTFIX-R8-B change log

Date: 2026-11-08. Pages: golden-brushtail-possum, glass-frog, giant-clam, frigatebird, fork-tailed-drongo.
Source of truth: `data/research/<slug>.json` fact_audit (and other_issues, symbolism "do not use" notes) plus `<slug>.md`. Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that exist, unless marked HTML only or JSON only. Template files present: golden-brushtail-possum v1 (v2 is an unfilled stub, `"animalHan": "TODO: one hanzi for the creature"`, with no matching text, so nothing in it changed); glass-frog v2; giant-clam v1 and v2; frigatebird v2; fork-tailed-drongo v1. Where a string appears more than once in a file, every copy was changed (count shown). Strings inside the page's embedded `animal-data` JSON block count as HTML copies.
Backups of the original pages: `~/factfix-backup-r8b/<slug>.html`; original template JSON in `~/factfix-backup-r8b/tpl/v1/` and `tpl/v2/` (both outside the repo).
Header glyphs use traditional forms to match the pages, per the R2 to R4 precedent. The glyph swap covers rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. glass-frog (玻璃蛙) and frigatebird (軍艦鳥) keep their glyphs; both already carried pinyin on the rail and keepsake.
Source links: as in R4, the corrected glass frog camouflage citation links to the dossier's verified University of Bristol summary (s7) rather than an unverified DOI.

## golden-brushtail-possum

1. **Source:** s10, s11 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">貂</span>
   - AFTER: <span class="rail__han" aria-hidden="true">袋貂</span>
2. **Source:** s10, s11 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="貂" aria-label="Hear 貂, diāo"
   - AFTER: data-say="袋貂" aria-label="Hear 袋貂, dàidiāo"
3. **Source:** s10, s11 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">diāo</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">dàidiāo</span>
4. **Source:** s10, s11 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">貂</span>
   - AFTER: <span class="serial-han">袋貂</span>
5. **Source:** s10, s11 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">貂</span><span class="py" lang="zh-Latn-pinyin">diāo</span>
   - AFTER: <span class="h" lang="zh">袋貂</span><span class="py" lang="zh-Latn-pinyin">dàidiāo</span>
6. **Source:** s10, s11 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "貂"
   - AFTER: "animalHan": "袋貂"
7. **Source:** s10, s11 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "diāo"
   - AFTER: "animalHanPy": "dàidiāo"
8. **Source:** s6, s8 (staining is not limited to breeding males)
   - BEFORE: ; in breeding males the gland's secretion often <b>stains the fur around it a visible reddish-brown</b>.
   - AFTER: ; the gland's secretion <b>stains the fur around it a visible reddish-brown</b>.
9. **Source:** s6, s8
   - BEFORE: The common brushtail possum has <b>the widest distribution of any Australian mammal</b>, thriving from wet eucalypt forest to mangrove to a suburban ceiling cavity, and eating a range that includes garden fruit and eucalyptus leaves too toxic for most other mammals.
   - AFTER: The common brushtail possum is <b>one of Australia's most widespread marsupials</b>, thriving from wet eucalypt forest to a suburban ceiling cavity, and eating a range that includes garden fruit, eucalyptus leaves and even highly toxic flowers and leaves.
10. **Source:** s9, s7
   - BEFORE: The species' base coat colours, grey and black, trace to variation at a single gene; rarer individuals in isolated populations carry <b>an additional pale gold variant</b>, a genuine but uncommon colour morph within the same species, not a separate one.
   - AFTER: Whether a possum is grey or black traces to variation at a single gene, ASIP. Golden possums are <b>a rare colour form of the same species</b>, not a separate one, found mostly in small pockets around Tasmania, where a mutation that lowers melanin pales the fur.
11. **Source:** s6, s8 (axis read; toxicity superlative unsourced)
   - BEFORE: feeding on leaves too toxic for most mammals and on whatever a garden leaves out overnight.
   - AFTER: feeding on eucalyptus leaves and on whatever a garden leaves out overnight.
12. **Source:** s6 (four colour forms; brown was missing)
   - BEFORE: gray or black through most of its range and, in a few rare populations, gilded gold instead.
   - AFTER: gray, brown or black through most of its range and, in a few rare populations, gilded gold instead.
13. **Source:** s9 (source list: exact title, which covers grey and black only)
   - BEFORE: Bond et al. · Genetic variants at the ASIP locus determine coat colour of the brushtail possum, PMC
   - AFTER: Bond et al. (2024) · Coat colour in marsupials: genetic variants at the ASIP locus determine grey and black fur of the brushtail possum, Royal Society Open Science (PMC)

## glass-frog

1. **Source:** s5, s6
   - BEFORE: Glass frogs (family Centrolenidae) are a family of over 150 species of arboreal amphibians found in the cloud forests of Central and South America, named for their translucent ventral skin through which internal organs — including the beating heart — are visible.
   - AFTER: Glass frogs (family Centrolenidae) are a family of about 156 species of arboreal amphibians found mostly in the cloud forests of Central and South America, from southern Mexico to Bolivia, named for their translucent ventral skin, through which internal organs, including the beating heart, are visible.
2. **Source:** s5, s6, s10
   - BEFORE: the paternal care behavior (males guarding egg clutches against predators for weeks)
   - AFTER: the paternal care behavior (in some species, fathers guarding egg clutches for days or weeks)
3. **Source:** s5, s7
   - BEFORE: and the clinging position on the underside of leaves above moving water.
   - AFTER: and the habit of resting on leaves above moving water, sometimes on the underside.
4. **Source:** s5, s6, s7 (liver colour, fat bodies and opaque back unverifiable)
   - BEFORE: In most glass frog species, the <b>ventral skin is translucent</b>, making internal organs visible — the green liver, the white fat bodies, and in many species the beating heart. The dorsal skin is opaque and green, providing cover from above.
   - AFTER: In most glass frog species, the <b>ventral skin is translucent</b>, making internal organs visible: the liver, the gut and the heart, which in many species can be seen beating. The back is green and less see-through than the belly.
5. **Source:** s7 (mirror copy; opaque back unverifiable)
   - BEFORE: The opacity of the dorsal skin matches the green of the leaf exactly.
   - AFTER: The green of the back blends into the leaf.
6. **Source:** s7 (bonds copy; opaque back unverifiable)
   - BEFORE: The dorsal surface is still opaque.
   - AFTER: The back is still green and harder to see through.
7. **Source:** s7
   - BEFORE: Research has shown that glass frogs' transparency functions as <b>background matching camouflage</b> — by allowing light to pass through their bodies and match the transmitted light of the leaf they cling to, they reduce the contrast of their edges and become harder to detect against the leaf surface.
   - AFTER: Research (Barnett et al. 2020, <i>PNAS</i>) found that glass frogs' transparency works as camouflage in two ways: their overall brightness shifts toward that of the leaf behind them, a form of <b>background matching camouflage</b>, and their translucent legs soften the outline of the body, which the researchers called edge diffusion.
8. **Source:** s5, s6, s10 (care is not family-wide; multiple attacks per night unverifiable)
   - BEFORE: Male glass frogs provide <b>extensive paternal care</b> — guarding egg clutches on leaves above streams for up to three weeks, actively defending them against wasp predators, remoistening them with water from their own bodies during dry periods, and sometimes fighting off multiple predator attacks in a single night.
   - AFTER: In some glass frog species, fathers provide <b>extensive paternal care</b>. Males of at least 24 of the roughly 156 species guard their eggs on leaves above streams, in one well-studied species for about 3 to 19 days, sitting on the clutch to keep it moist. In other species the mother guards, or no one does.
9. **Source:** s5, s6
   - BEFORE: Glass frog eggs are laid on leaves <b>directly above streams</b>.
   - AFTER: Glass frog eggs are usually laid on leaves <b>directly above streams</b>.
10. **Source:** s5, s7 (underside is not a rule)
   - BEFORE: Glass frogs cling to the <b>underside of leaves</b> with adhesive toe pads, positioning themselves below the visible surface of the canopy. They live in the concealed face of the thing that everyone else sees from above.
   - AFTER: Glass frogs often rest on leaves, gripping with expanded toe tips, and a calling male may perch on the <b>underside of leaves</b> or on top. From below, a frog on a leaf is seen against the light coming through it.
11. **Source:** s11 (weak source, kept to one claim); grappling, mud wasps, injuries and multiple attacks per night unverifiable
   - BEFORE: Male glass frogs are noted for <b>aggressive defensive behavior toward egg predators</b> — documented fighting off multiple wasp attacks in a single night, physically grappling with and ejecting mud wasps from the leaf, sustaining injuries in defense of the clutch. The most transparent animal is also one of the most combative parents.
   - AFTER: Guarding glass frog fathers show <b>defensive behavior toward egg predators</b>: one male was filmed kicking wasps off his clutch. The most transparent animal can also be a fierce parent.
12. **Source:** s11, s10 (brood length is not constant combat)
   - BEFORE: belongs to the animal that will fight a wasp for three weeks running.
   - AFTER: belongs to the animal that will kick a wasp off its eggs.
13. **Source:** s7 (cited paper does not exist; replaced with the real camouflage paper) (HTML only)
   - BEFORE: <a href="https://www.pnas.org/doi/10.1073/pnas.2202738119" rel="noopener">Delia, J.R.J., et al. (2022). Glass frog camouflage: background matching via transparency in Centrolenidae. PNAS.</a>
   - AFTER: <a href="https://bristol.ac.uk/news/2020/may/glass-frogs.html" rel="noopener">Barnett, J.B., et al. (2020). Imperfect transparency and camouflage in glass frogs. PNAS (University of Bristol summary).</a>
14. **Source:** s7 (source list label) (JSON only)
   - BEFORE: "label": "Delia, J.R.J., et al. (2022). Glass frog camouflage: background matching via transparency in Centrolenidae. PNAS."
   - AFTER: "label": "Barnett, J.B., et al. (2020). Imperfect transparency and camouflage in glass frogs. PNAS (University of Bristol summary)."
15. **Source:** s7 (source list link) (JSON only)
   - BEFORE: "href": "https://www.pnas.org/doi/10.1073/pnas.2202738119"
   - AFTER: "href": "https://bristol.ac.uk/news/2020/may/glass-frogs.html"
16. **Source:** unverifiable as a proverb; relabeled as our own line (HTML only)
   - BEFORE: aria-label="The proverb of your year"
   - AFTER: aria-label="A line of our own for your year"
17. **Source:** unverifiable as a proverb (HTML only)
   - BEFORE: <p class="eyebrow">The proverb of your year</p>
   - AFTER: <p class="eyebrow">A line of our own for your year</p>
18. **Source:** unverifiable as a proverb (HTML only)
   - BEFORE: aria-label="Hear the whole proverb read aloud"
   - AFTER: aria-label="Hear the whole line read aloud"
19. **Source:** unverifiable as a proverb (HTML only)
   - BEFORE: aria-label="The proverb character by character, with pinyin"
   - AFTER: aria-label="The line character by character, with pinyin"
20. **Source:** unverifiable as a proverb
   - BEFORE: This proverb names the armor the transparency provides
   - AFTER: This line names the armor the transparency provides
21. **Source:** unverifiable as a proverb (心地透明，無懼人言 xīndì tòumíng, wú jù rén yán)
   - BEFORE: A proverb we tie to the 
   - AFTER: A line we wrote for this page, not a traditional proverb. We tie it to the 

## giant-clam

1. **Source:** s10, s11, s12 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">蛤</span>
   - AFTER: <span class="rail__han" aria-hidden="true">硨磲</span>
2. **Source:** s10, s11, s12 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="蛤" aria-label="Hear 蛤, gé"
   - AFTER: data-say="硨磲" aria-label="Hear 硨磲, chēqú"
3. **Source:** s10, s11, s12 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">gé</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">chēqú</span>
4. **Source:** s10, s11, s12 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">蛤</span>
   - AFTER: <span class="serial-han">硨磲</span>
5. **Source:** s10, s11, s12 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">蛤</span><span class="py" lang="zh-Latn-pinyin">gé</span>
   - AFTER: <span class="h" lang="zh">硨磲</span><span class="py" lang="zh-Latn-pinyin">chēqú</span>
6. **Source:** s10, s11, s12 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "蛤"
   - AFTER: "animalHan": "硨磲"
7. **Source:** s10, s11, s12 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "gé"
   - AFTER: "animalHanPy": "chēqú"
8. **Source:** s7, s4 (giant clams do not cement or fuse)
   - BEFORE: A Giant Clam begins life as a swimming larva and drifts for one to two weeks before it settles onto a reef, cements itself in place, and <b>fuses to that exact spot for the rest of its life</b>, a life that can run past a century.
   - AFTER: A Giant Clam begins life as a swimming larva and drifts for one to two weeks before it settles onto a reef. Young clams hold on with byssal threads and may shift spots in their first weeks; a grown clam lies loose on the reef, <b>held in that exact spot by nothing but its own weight</b>, for a life that can run past a century.
9. **Source:** s7, s4
   - BEFORE: fused to one patch of Indo-Pacific reef
   - AFTER: settled on one patch of Indo-Pacific reef
10. **Source:** s7, s4 (axis read)
   - BEFORE: Once a drifting larva finds its patch of reef, it fuses there and stays
   - AFTER: Once a drifting larva finds its patch of reef, it settles there and stays
11. **Source:** s7, s4 (element copy)
   - BEFORE: but fuses permanently to one exact place
   - AFTER: but settles for good in one exact place
12. **Source:** s7, s4 (element copy)
   - BEFORE: fuses itself to that spot and is never moved by anything again
   - AFTER: grows too heavy to be moved from that spot and stays there
13. **Source:** s7 (chakra copy)
   - BEFORE: its image for you is a shell fused to the reef
   - AFTER: its image for you is a shell held to the reef by its own weight
14. **Source:** s7 (proverb gloss)
   - BEFORE: This one spends a lifetime fused to a single patch of reef
   - AFTER: This one spends a lifetime settled on a single patch of reef
15. **Source:** s7, s4 (Purple Star copy)
   - BEFORE: A drifting larva does not deliberate for months before it fuses to a reef.
   - AFTER: A drifting larva does not deliberate for months before it settles on a reef.
16. **Source:** s6, s9 (per-clam uniqueness unverifiable)
   - BEFORE: Iridescent cells called iridocytes scatter light across the mantle's surface in a color pattern that is <b>unique to each individual clam</b>, no two alike, closer to a fingerprint than a uniform.
   - AFTER: Iridescent cells called iridocytes scatter light across the mantle's surface, which can be <b>golden brown, yellow or green, dotted with iridescent spots</b>, the larger ones often solid blue or purple.
17. **Source:** s4, s6 (eyes see more than light and shadow; adults cannot fully close)
   - BEFORE: Hundreds of simple, pinhole eyes line the rim of the mantle, sensitive only to light and shadow; when something passes overhead, the clam can <b>retract its mantle and draw its valves shut within seconds</b>.
   - AFTER: Hundreds to thousands of simple, pinhole eyes line the rim of the mantle, tuned to changes in light, ultraviolet included; when something passes overhead, the clam can <b>retract its mantle and draw its valves partly closed within seconds</b>.
18. **Source:** s4 (axis read)
   - BEFORE: Hundreds of simple eyes line the rim of the mantle, tuned to nothing but light and shadow,
   - AFTER: Hundreds of simple eyes line the rim of the mantle, tuned to changes in light,
19. **Source:** s4, s6 (axis read; closing takes several seconds and adults cannot fully close)
   - BEFORE: it can slam shut in under a second if a shadow passes overhead.
   - AFTER: it can pull in its mantle and partly close within seconds if a shadow passes overhead.
20. **Source:** s8, s4 (stored reserves unverifiable)
   - BEFORE: it survives on stored reserves until, and unless, the water recovers.
   - AFTER: it waits, weakened, until, and unless, the water recovers.
21. **Source:** Purple Star (no traditional basis; made our own reading)
   - BEFORE: and read for the Taurus Ox crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Taurus Ox crossing through two of them.
22. **Source:** Purple Star (no traditional basis)
   - BEFORE: For a Taurus born in the Ox year, it tends to sit close to the Life palace, 命宮, and it explains something about you
   - AFTER: In our reading of the Taurus Ox, it explains something about you
23. **Source:** Purple Star (no traditional basis)
   - BEFORE: For the Taurus Ox crossing it often lands near the Wealth or Life palace, and it reads uncannily like the animal itself:
   - AFTER: We pair it with the Taurus Ox because it reads uncannily like the animal itself:
24. **Source:** Purple Star (no traditional basis)
   - BEFORE: Your exact birth hour is what moves these two stars into your own twelve palaces and shows whether the decisiveness or the storehouse runs loudest.
   - AFTER: That is our outline for the Taurus Ox. Only your real chart, cast from your lunar birth date and hour, shows where these stars fall in your twelve palaces and whether the decisiveness or the storehouse runs loudest.
25. **Source:** Purple Star (button implied the outline predicts the chart)
   - BEFORE: Cast your Purple Star chart and see how close it lands
   - AFTER: Cast your Purple Star chart and see where they land
26. **Source:** s7, s4 (template element note) (JSON only)
   - BEFORE: fitting an animal that fuses permanently to a single patch of reef.
   - AFTER: fitting an animal that settles for good on a single patch of reef.

## frigatebird

1. **Source:** s5, s10, s9 (record is wing area to mass; weight muddled)
   - BEFORE: with the longest wingspan-to-body-weight ratio of any bird — up to 2.3 meters of wingspan on a 1.5-kilogram body — that allows them to remain airborne for weeks at a time.
   - AFTER: with the largest wing area for their body weight of any bird, up to 2.3 meters of wingspan on a magnificent frigatebird's body of about 1.4 to 1.8 kilograms, which lets them stay airborne for weeks at a time.
2. **Source:** s5, s9, s10 ("for weeks without flapping" overstated)
   - BEFORE: Frigatebirds have <b>the highest wingspan-to-body-weight ratio of any bird</b> — up to 2.3-meter wingspan on a body weighing as little as 1.5 kilograms. This ratio means they need almost no energy to stay aloft, as documented by Weimerskirch et al. (2016) in Science, who tracked frigatebirds riding thermals for weeks without flapping.
   - AFTER: Frigatebirds have <b>the largest wing area for their body weight of any bird</b>: in the magnificent frigatebird, up to a 2.3-meter wingspan on a body of about 1.4 to 1.8 kilograms. That lets them stay aloft cheaply. Weimerskirch et al. (2016) in Science tracked frigatebirds climbing in the updrafts under clouds and gliding down, keeping wingbeats to a minimum, and found that young birds stayed in the air for over two months.
3. **Source:** s5 ("will drown" stronger than the source)
   - BEFORE: If a frigatebird lands on water, it cannot take off again and will drown. This structural constraint — a bird that hunts over the ocean but cannot touch it — is documented across all five Fregata species.
   - AFTER: Frigatebirds do not settle on the sea: their plumage would soak, they cannot swim, and they cannot easily take off from water. This constraint, a bird that hunts over the ocean but avoids touching it, holds across all five Fregata species.
4. **Source:** s5, s13 (theft is not a primary strategy; the cited Osorno paper is about offspring desertion and is not in Animal Behaviour)
   - BEFORE: This is not an emergency behavior; it is a primary feeding strategy, documented by Osorno (1999) in Animal Behaviour.
   - AFTER: Most of their food they still catch themselves: great frigatebirds robbing masked boobies got about 5 percent of their food this way on average, and at most about 40 percent.
5. **Source:** s5, s10 ("for hours" has no source)
   - BEFORE: Male frigatebirds inflate a <b>bright red gular pouch</b> — an expandable throat sac — for hours during breeding season,
   - AFTER: Male frigatebirds inflate a <b>bright red gular pouch</b>, an expandable throat sac, during the breeding season,
6. **Source:** s14 (publication year)
   - BEFORE: by Nelson (1975) in Seabirds: Their Biology and Ecology.
   - AFTER: by Nelson (1980) in Seabirds: Their Biology and Ecology.
7. **Source:** s9, s5 (no millimeter precision claim in any source)
   - BEFORE: GPS tracking studies by Weimerskirch et al. (2016) showed frigatebirds <b>navigating thermal columns rising from the ocean surface with millimeter-level precision</b>, riding individual thermals for hours and switching between them without flapping — conserving energy across migrations of thousands of kilometers.
   - AFTER: GPS tracking by Weimerskirch et al. (2016) showed frigatebirds <b>riding the updrafts under cumulus clouds</b>, climbing to cloud base at about 600 to 700 meters, sometimes inside the clouds to 3,000 or 4,000 meters, then gliding down with few wingbeats, on flights of thousands of kilometers along the edge of the doldrums.
8. **Source:** s5, s10 (nest-tree and display-site fidelity unverifiable; "annually" wrong for females)
   - BEFORE: frigatebirds return to <b>the same colonial nesting sites annually</b>, sometimes to the same individual nest tree or shrub. Males return to the same display site each season. This fidelity to place within the context of extreme range is documented across the Fregata genus.
   - AFTER: genetic evidence suggests frigatebirds tend to <b>return to breed in the colonies where they hatched</b>. Females usually breed only about every other year, and birds rarely keep the same mate.
9. **Source:** s5, s9, s10 (axis read)
   - BEFORE: It returns to the same colonial nesting sites annually, navigates to the same thermal patterns, maintains the same territories in the sky with a precision that GPS tracking has now documented across thousands of kilometers.
   - AFTER: It tends to come back to breed where it hatched, and GPS tracking has followed it across thousands of kilometers of open ocean.

## fork-tailed-drongo

1. **Source:** s8, s14 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">鸟</span>
   - AFTER: <span class="rail__han" aria-hidden="true">叉尾卷尾</span>
2. **Source:** s8, s14 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="鸟" aria-label="Hear 鸟, niǎo"
   - AFTER: data-say="叉尾卷尾" aria-label="Hear 叉尾卷尾, chāwěi juǎnwěi"
3. **Source:** s8, s14 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">niǎo</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">chāwěi juǎnwěi</span>
4. **Source:** s8, s14 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">鸟</span>
   - AFTER: <span class="serial-han">叉尾卷尾</span>
5. **Source:** s8, s14 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">鸟</span><span class="py" lang="zh-Latn-pinyin">niǎo</span>
   - AFTER: <span class="h" lang="zh">叉尾卷尾</span><span class="py" lang="zh-Latn-pinyin">chāwěi juǎnwěi</span>
6. **Source:** s8, s14 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "鸟"
   - AFTER: "animalHan": "叉尾卷尾"
7. **Source:** s8, s14 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "niǎo"
   - AFTER: "animalHanPy": "chāwěi juǎnwěi"
8. **Source:** s7, s8, s15 (no source names warthogs)
   - BEFORE: small enough to perch on a warthog's back
   - AFTER: small enough to perch on a buffalo's back
9. **Source:** s9, s10 (the study counts thefts, not attempts)
   - BEFORE: including meerkats and pied babblers, in roughly half of their kleptoparasitic attempts by giving a false alarm call from a perch while the target handled food,
   - AFTER: including meerkats and pied babblers, and about half of their thefts used a false alarm call, given from a perch while the target handled food,
10. **Source:** s9, s10, s7, s8 ("indistinguishable" compared false and true drongo alarms, not mimics and models)
   - BEFORE: Drongos frequently <b>mimic the specific alarm calls of the very species they are targeting</b>, calls that studies found structurally indistinguishable from the real thing, and able to deceive both meerkats and pied babblers in playback experiments.
   - AFTER: Drongos often <b>mimic the alarm calls of other species</b>, including glossy starlings, crowned plovers and the pied babblers they rob, and later work added meerkat alarms; one study counted 51 alarm types, 45 of them borrowed. The false alarms sounded the same as the drongo's own true alarms, and in playback experiments they made both meerkats and pied babblers abandon food.
11. **Source:** s10 ("rarer" not in the source)
   - BEFORE: deploying a different or rarer mimicked alarm to restore the deception's effect.
   - AFTER: deploying a different mimicked alarm to restore the deception's effect.
12. **Source:** s8 (weight is 34 to 48 g)
   - BEFORE: Fork-tailed drongos, weighing around fifty grams,
   - AFTER: Fork-tailed drongos, weighing under fifty grams,
13. **Source:** unverifiable; no fact on the page cites it (source list) (HTML only)
   - BEFORE: <li><a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9811629/" rel="noopener">NCBI · Aggressive hosts are undeterred by a cuckoo's hawk mimicry, but probably make good foster parents</a></li>
   - AFTER: (removed)
14. **Source:** unverifiable; no fact on the page cites it (source list) (JSON only)
   - BEFORE (JSON): {"label": "NCBI · Aggressive hosts are undeterred by a cuckoo's hawk mimicry, but probably make good foster parents", "href": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9811629/"}
   - AFTER (JSON): (removed)

## Not applied

- golden-brushtail-possum: Australian Geographic (s7) now backs the golden-form sentence but was not added to the source list (an addition, not a correction). The Purple Star block names no star, so nothing to relabel. Proverb 亡羊補牢 (wáng yáng bǔ láo) is a real chengyu; left. The intro's "few rare populations" left as is (audit OK minor; only "brown" was added).
- glass-frog: the line 心地透明，無懼人言 (xīndì tòumíng, wú jù rén yán) was kept and relabeled as our own line, not removed, so its hanzi, ruby pinyin, per-character tiles and data-say stay; the section structure is unchanged. The rail chapter label "Your Proverb" is a sitewide nav string; left. Its "Meaning" line keeps an old em dash (untouched copy). Taboada and Delia et al. 2022 (Science, s8) was not added to the source list because no fact on the page uses it; the blood-hiding bonus fact was not added. Readings that lean on the underside image (axis read "spends hours motionless on the underside of a leaf", habitat lede, mirror "The leaf's underside", share line, card sub) were left as readings; only the fact line and the overture frame were softened. Trait 3 reading "guard it when the wasps arrive" left as reading. Axis read "elevations from sea level to 3,000 meters" was not audited; left. 玻璃 pinyin left as bōlí (Taiwan reading; audit says either is defensible).
- giant-clam: trait title "The pattern no one else wears" and the element title "The Fused Ground" left as reading labels; the fact lines under them were corrected. Palette line "the ground you've fused to", the dial's "surviving on stored reserves" and the shadow line "living off its own reserves" are readings about the reader; left. The Frontiers iridocyte source (audit OK) left in the list. Wu Qu and Tian Fu star meanings left; only the claims that the stars sit in a palace for this crossing were made our own reading. The fine print already said the pairing is ours.
- frigatebird: the Osorno (1999) Journal of Avian Biology entry stays in the source list. It is a real-looking record about offspring desertion that the dossier could not open; the false in-text claim that it documents piracy in Animal Behaviour was removed, so nothing on the page now cites it. Flag for a source-list pass. Trait 1 title "The wingspan ratio" left. Kleptoparasitism stays the theme of readings, the mirror shadow "It steals to eat" and the ov-frame; only the fact line was corrected to about 5 percent. Bonds line "they are still at sea level, drowning" is reading copy; left. Many em dashes remain in untouched copy.
- fork-tailed-drongo: "a hawk twice its size" in the intro left (mobbing larger raptors is sourced). The zodiac-strip proverb 雄鸡一唱天下白 is in simplified script; style flag, not in scope. Weight and alarm-count figures now in text are from s8 and s10.

## Structure check

Section counts match backups (golden-brushtail-possum 31/31, glass-frog 31/31, giant-clam 33/33, frigatebird 31/31, fork-tailed-drongo 31/31). All JSON-LD and application/json blocks parse (4 per page). HTML start-tag counts identical to backup except the intended changes: glass-frog gains one `<i>` (PNAS in the camouflage fact); fork-tailed-drongo loses one `<li>` and one `<a>` (removed cuckoo source). Every edited page parses with python html.parser. All template JSON files load and their keysets are unchanged. `<!--w4-reading-->` is not present on any of the five pages. No CSS, JS or other page touched. No git run. No old header glyph (貂 alone, 蛤, 鸟) remains in the header slots; no "Delia", "millimeter", "Osorno (1999) in Animal Behaviour", "Nelson (1975)", "cements" or "no two alike" remains. New text was checked for em/en dashes, arrows and the banned word list: none.

## Final header characters

| Page | Header hanzi | Pinyin |
|---|---|---|
| golden-brushtail-possum | 袋貂 | dàidiāo |
| glass-frog | 玻璃蛙 (unchanged) | bōlí wā |
| giant-clam | 硨磲 | chēqú |
| frigatebird | 軍艦鳥 (unchanged) | jūnjiàn niǎo |
| fork-tailed-drongo | 叉尾卷尾 | chāwěi juǎnwěi |
