# FACTFIX-R6-A change log

Date: 2026-11-08. Pages: asian-elephant, archerfish, wolverine, weaverbird, vampire-squid.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list (wolverine uses w ids, weaverbird v ids).
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). "x2" means the string occurred twice in that file. Asian-elephant has v1 and v2; the other four have v2 only.
Backups of the original pages: `~/factfix-backup-r6a/<slug>.html`; original template JSON in `~/factfix-backup-r6a/tpl/v1/` and `~/factfix-backup-r6a/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site (R2 to R4 precedent). Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. Asian-elephant keeps 象 xiàng (audit OK).
Purple Star: only asian-elephant claimed a traditional pairing. Its lead, star copy and close were reworded as Zodi Animal's own reading with the R4 sentences; the v2 data kicker now uses the R4 wording. Archerfish, wolverine, weaverbird and vampire-squid assign no star (audit OK), so unchanged.
Asian-elephant: everything borrowed from African elephants is gone (22-month return to a matriarch's bones, the Tarangire drought matriarch, matriarch-led herds); trait 1 now uses the Asian burial study (Kaswan and Roy 2024) and seeds go up to 5.8 km (Campos-Arceiz et al. 2008). Weaverbird: the Pacific range and the Theunissen and Shawe-Taylor 2009 citation (likely fabricated) are gone.

## asian-elephant

1. **Source:** s21, s20, s22 (trait name; bone visits are African) [HTML + v1 + v2]
   - BEFORE: The visit to the bones
   - AFTER: The ground they walk around
2. **Source:** s21, s19, s20, s22 (borrowed species; 22 months unverifiable; rewritten around the Asian burial study) [HTML + v1 + v2]
   - BEFORE: Elephants have been documented returning to the remains of dead herd members years after death, touching the skull and tusks with their trunks; one study recorded a family returning to a matriarch's skeleton after <b>twenty-two months</b>, standing in silence before moving on.
   - AFTER: In North Bengal, India, researchers watched Asian elephant herds <b>carry a dead calf and bury it</b>, then leave within 40 minutes. Afterward the herds avoided the spot, taking parallel routes around it.
3. **Source:** s21 (reading under the corrected fact; uses dossier candidate line 1) [HTML + v2]
   - BEFORE: A loss does not get processed once and filed away. You go back to it, on your own schedule, long after everyone else has decided it is <em>time to move on</em>.
   - AFTER: A loss does not get processed once and filed away. You carry it, you lay it down properly, and after that there is a patch of ground you <em>walk around without saying why</em>.
4. **Source:** s13, s11 (drop lower lip) [HTML + v1 + v2]
   - BEFORE: <b>one dorsal finger and a lower lip it uses to wrap rather than pinch</b>, an anatomical difference
   - AFTER: <b>a single dorsal finger, and it mostly wraps what it grasps rather than pinching it</b>, an anatomical difference
5. **Source:** s14 (mostly, not as low as) [HTML + v1 + v2]
   - BEFORE: infrasonic calls as low as <b>14 to 24 hertz</b>
   - AFTER: infrasonic calls mostly between <b>14 and 24 hertz</b>
6. **Source:** s14, s12 (axis read; seismic detection hedged to thought to) [HTML + v1 + v2]
   - BEFORE: It produces and detects infrasonic rumbles too low for human ears, picking up the ground-borne echo of a distant call through receptors in its feet and trunk.
   - AFTER: It produces and detects infrasonic rumbles too low for human ears, and is thought to pick up the ground-borne part of a distant call through its feet and trunk.
7. **Source:** s15, s16 (illness and crisis unverifiable; narrowed to late pregnancy and calving) [HTML + v1 + v2]
   - BEFORE: activating mainly during labor, illness, or genuine crisis, unlike African females, who secrete during ordinary excited reunions.
   - AFTER: activating mainly in late pregnancy and around calving, unlike African females, who secrete freely, even during excited family greetings.
8. **Source:** s15 (axis read, same narrowing) [HTML + v1 + v2]
   - BEFORE: activates mainly during labor, illness, or real crisis, never for a good reunion.
   - AFTER: activates mainly in late pregnancy and around calving, not for a good reunion.
9. **Source:** s12, s11 (trait name; 19 hours unverifiable) [HTML + v1 + v2]
   - BEFORE: The nineteen-hour day
   - AFTER: The day spent eating
10. **Source:** s12, s11, s17 (60 km wrong; 19 hours unverifiable; 150 kg kept as upper figure) [HTML + v1 + v2]
   - BEFORE: A wild adult may spend up to <b>nineteen hours a day feeding</b>, consuming around 150 kilograms of plant matter, and its dung disperses seeds that can travel <b>up to sixty kilometres</b> from where they were eaten.
   - AFTER: A wild adult spends about <b>three quarters of its day</b> eating or walking to food and water, taking in up to 150 kilograms of plants, and its dung carries seeds <b>more than a kilometre away, and up to 5.8 kilometres</b>, from where they were eaten.
11. **Source:** s12, s11, s19 (axis read; 19 hours and standing over bones unverifiable) [HTML + v1 + v2]
   - BEFORE: spends up to nineteen hours a day foraging and moving through a wide range, and it also stands motionless for long stretches over the bones of its dead.
   - AFTER: spends about three quarters of its day foraging and moving through a wide range, and it also stays close to dying and dead companions.
12. **Source:** s12, s18 (trait name; no matriarch in Asian elephants) [HTML + v1 + v2]
   - BEFORE: The matriarch's map
   - AFTER: No single matriarch
13. **Source:** s12, s19, s18 (drought matriarch study is African; rewritten) [HTML + v1 + v2]
   - BEFORE: Older female elephants carry a spatial memory of water sources and safe routes that can span <b>decades</b>, and during droughts, herds led by older matriarchs have been shown to find water that younger-led groups miss.
   - AFTER: Unlike African elephants, Asian elephant families <b>have no single matriarch</b>, though some females may be more dominant than others. Herds have still been seen gathering around dying and dead companions.
14. **Source:** s12 (reading under the corrected fact) [HTML + v1 + v2]
   - BEFORE: You are the one the family actually follows in a real crisis, not because you asked for the role but because you are the one who <em>still remembers where the water is</em>.
   - AFTER: Nobody crowned you. The family still turns to you in a real crisis, because you are the one who <em>stays close when it matters</em>.
15. **Source:** s12, s21, s18, s20 (axis read; African facts removed) [HTML + v1 + v2]
   - BEFORE: A matriarch can lead her family back to a water source she last visited years earlier, and herds have been documented returning to a dead companion's bones nearly two years on.
   - AFTER: Herds that bury a calf afterward avoid the spot, taking parallel routes around it.
16. **Source:** s21 (dial read leaned on bone visits) [HTML + v1 + v2]
   - BEFORE: but you may dwell at the bones longer than the herd can wait.
   - AFTER: but you may circle an old grief longer than the herd can wait.
17. **Source:** s12 (overture lead: no matriarch) [HTML + v1 + v2]
   - BEFORE: The largest land animal in Asia, matriarch-led and slow-growing,
   - AFTER: The largest land animal in Asia, family-bound and slow-growing,
18. **Source:** s12, s11 (frame: not around the clock) [HTML + v1 + v2]
   - BEFORE: a creature that labors nearly around the clock,
   - AFTER: a creature that labors for most of every day,
19. **Source:** s12 (decision read: no matriarch) [HTML + v1 + v2]
   - BEFORE: You decide the way a matriarch chooses a route:
   - AFTER: You decide the way an old elephant chooses a route:
20. **Source:** s23 (Purple Star lead) [HTML + v2]
   - BEFORE: and read for the Cancer Ox crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Cancer Ox crossing through two of them.
21. **Source:** s23 (Purple Star) [HTML + v2]
   - BEFORE: For a Cancer born in the Ox year, Purple Star tends to seat the Elder star close to where the family gathers.
   - AFTER: In our reading of the Cancer Ox, the Elder star sits close to where the family gathers.
22. **Source:** s18, s12 (drought matriarch echo in star copy) [HTML + v2]
   - BEFORE: the way a young herd looks for the oldest matriarch when the water runs low.
   - AFTER: the way a young herd turns to its eldest.
23. **Source:** s23 (Purple Star; pinyin added) [HTML + v2]
   - BEFORE: Near the Life Palace, 命宮, Purple Star tends to place the vault star for this crossing too,
   - AFTER: Near the Life Palace, 命宮 mìnggōng, our reading places the vault star for this crossing too,
24. **Source:** s23 (Purple Star) [HTML + v2]
   - BEFORE: The risk Purple Star flags here is
   - AFTER: The risk we read here is
25. **Source:** s23 (Purple Star close) [HTML + v2]
   - BEFORE: That is the outline the Cancer Ox tends to share:
   - AFTER: That is our outline for the Cancer Ox:
26. **Source:** s23 (Purple Star close) [HTML + v2]
   - BEFORE: Your exact birth hour is what moves these two into your own twelve palaces and shows whether
   - AFTER: Only your real chart, cast from your lunar birth date and hour, shows where these two fall in your twelve palaces and whether
27. **Source:** s21 (v1 holds a different wording of the trait 1 reading) [v1]
   - BEFORE: You do not process a loss once and file it away. You go back to it, on your own schedule, long after everyone else has decided it is <em>time to move on</em>.
   - AFTER: You do not process a loss once and file it away. You carry it, you lay it down properly, and after that there is a patch of ground you <em>walk around without saying why</em>.
28. **Source:** s23 (kicker, v2 data; HTML already relabeled) [v2]
   - BEFORE: What Purple Star already suspects about you
   - AFTER: Our Purple Star reading for this crossing

## archerfish

1. **Source:** s7 (header: 射 means shoot; species name 射水魚) (rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v2]
   - BEFORE: <span class="rail__han" aria-hidden="true">射</span>
   - AFTER: <span class="rail__han" aria-hidden="true">射水魚</span>
   - BEFORE: data-say="射" aria-label="Hear 射, shè"
   - AFTER: data-say="射水魚" aria-label="Hear 射水魚, shèshuǐyú"
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">shè</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">shèshuǐyú</span>
   - BEFORE: <span class="serial-han">射</span>
   - AFTER: <span class="serial-han">射水魚</span>
   - BEFORE: <span class="h" lang="zh">射</span><span class="py" lang="zh-Latn-pinyin">shè</span>
   - AFTER: <span class="h" lang="zh">射水魚</span><span class="py" lang="zh-Latn-pinyin">shèshuǐyú</span>
   - BEFORE: "animalHan": "射"
   - AFTER: "animalHan": "射水魚"
   - BEFORE: "animalHanPy": "shè"
   - AFTER: "animalHanPy": "shèshuǐyú"
   - Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1; template animalHan 1, animalHanPy 1.
2. **Source:** s10, s9, s16 (comparison unsourced) [HTML + v2]
   - BEFORE: as distinct from its apparent position — a perceptual correction most vertebrates cannot perform.
   - AFTER: as distinct from its apparent position.
3. **Source:** s10, s9, s16 (axis read, same comparison) [HTML + v2]
   - BEFORE: at the air-water interface — one of the only vertebrates known to perform this calculation in real time.
   - AFTER: at the air-water interface, and it does so in real time.
4. **Source:** s12, s9 (jet is not rotated; velocity modulation; force matched to prey per cited Schlegel 2006) [HTML + v2]
   - BEFORE: The water jet is <b>variable in volume and hydrodynamics</b>: the archerfish concentrates the jet's impact at the point of contact by rotating the stream as it leaves the mouth, adjusting for prey distance and size rather than firing at a fixed output.
   - AFTER: The water jet is <b>tuned shot by shot</b>: the archerfish speeds up the rear of the stream so the water gathers into one blob just before it hits, and it matches the force of the shot to the size of the prey.
5. **Source:** s13, s9 (moving targets, single session unverifiable) [HTML + v2]
   - BEFORE: Schuster et al. (2006) demonstrated that naive archerfish <b>rapidly acquire the correct shooting angle by observing experienced individuals</b> — correcting their aim within a single session of watching, not through individual trial and error.
   - AFTER: In work by Schuster et al. (2006), archerfish that had failed at moving targets <b>watched a skilled shooter and could then hit moving targets</b> when tested again.
6. **Source:** s14, s9, s11 (20 cm threshold unverifiable; jump up to about 2.5 body lengths) [HTML + v2]
   - BEFORE: When prey is within approximately <b>20 centimetres of the surface</b>, archerfish abandon the jet and leap directly — the spit is the long-range instrument; the body is the short-range one.
   - AFTER: When prey hangs <b>within reach of the surface</b>, archerfish jump for it instead of shooting, leaping up to about two and a half body lengths. The spit is the long-range instrument; the body is the short-range one.
7. **Source:** s10, s11 (overture lead range) [HTML + v2]
   - BEFORE: Southeast Asian and northern Australian estuaries and mangrove forests
   - AFTER: mangrove estuaries and rivers from India to northern Australia and the western Pacific
8. **Source:** s10, s11 (range; full marine softened) [HTML + v2]
   - BEFORE: across Southeast Asia and northern Australia, tolerating salinity ranges from pure fresh water to full marine conditions.
   - AFTER: from India east to the Philippines and south to northern Australia and the western Pacific islands, living in anything from fresh water to near-marine brackish water.
9. **Source:** s15, s9, s13 (trait name) [HTML + v2]
   - BEFORE: Priority of the first shot
   - AFTER: The race to the drop
10. **Source:** s15, s9, s13 (precedence wrong; race and theft) [HTML + v2]
   - BEFORE: When multiple archerfish observe the same prey, <b>the individual that first identifies and shoots takes precedence</b> — others in the school orient to the first shot's arc rather than independently re-targeting.
   - AFTER: When one archerfish knocks prey down, <b>the others race to where it will land</b>, and a rival often steals it. Archerfish even change how they shoot when others are in view, probably because of that theft risk.
11. **Source:** s15, s9 (reading under the corrected fact) [HTML + v2]
   - BEFORE: You notice who saw it first. Sequence and credit are not vanity for you — they are <em>a form of accuracy about how things actually happened</em>.
   - AFTER: You check who is watching before you take the shot, because you have seen a clean hit carried off by someone faster. <em>You plan for the catch as well as the shot.</em>
12. **Source:** dossier proverb note (em dash and is-not-X-it-is shape in gloss) [HTML + v2]
   - BEFORE: Excellence is not a destination — it is the ongoing correction of something already well-made.
   - AFTER: Excellence is the ongoing correction of something already well-made.

## wolverine

1. **Source:** w15, w16, w17 (header: 貂 is marten; wolverine is 貂熊) (rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v2]
   - BEFORE: <span class="rail__han" aria-hidden="true">貂</span>
   - AFTER: <span class="rail__han" aria-hidden="true">貂熊</span>
   - BEFORE: data-say="貂" aria-label="Hear 貂, diāo"
   - AFTER: data-say="貂熊" aria-label="Hear 貂熊, diāoxióng"
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">diāo</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">diāoxióng</span>
   - BEFORE: <span class="serial-han">貂</span>
   - AFTER: <span class="serial-han">貂熊</span>
   - BEFORE: <span class="h" lang="zh">貂</span><span class="py" lang="zh-Latn-pinyin">diāo</span>
   - AFTER: <span class="h" lang="zh">貂熊</span><span class="py" lang="zh-Latn-pinyin">diāoxióng</span>
   - BEFORE: "animalHan": "貂"
   - AFTER: "animalHan": "貂熊"
   - BEFORE: "animalHanPy": "diāo"
   - AFTER: "animalHanPy": "diāoxióng"
   - Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1; template animalHan 1, animalHanPy 1.
2. **Source:** w6, w5, w10 (soften: reported to) [HTML + v2]
   - BEFORE: the wolverine has been documented <b>driving bears, cougars, and entire wolf packs off their own kills</b> to take the carcass.
   - AFTER: the wolverine is reported to <b>take carcasses from bears, cougars, and even packs of wolves</b>.
3. **Source:** w6, w5 (axis read, soften) [HTML + v2]
   - BEFORE: Wolverines have driven bears, cougars, and wolf packs off carcasses many times their own size,
   - AFTER: Wolverines are reported to take carcasses from bears, cougars, and even wolf packs, animals many times their own size,
4. **Source:** w5, w7 (one rotated molar per side) [HTML + v2]
   - BEFORE: The wolverine's upper molars are <b>rotated roughly 90 degrees</b> in the jaw,
   - AFTER: The wolverine's rear upper molar is <b>rotated roughly 90 degrees</b> in the jaw,
5. **Source:** w9 (1 to 6 caches per source; bog not in paper) [HTML + v2]
   - BEFORE: Wolverines routinely split a single carcass into <b>multiple food caches</b>, hidden separately in snow, boulders, and bog,
   - AFTER: A wolverine often splits a single carcass into <b>as many as six food caches</b>, hidden separately in snow, among boulders, or in forest,
6. **Source:** w9 (axis read; bog removed) [HTML + v2]
   - BEFORE: caches perishable meat in snowbanks, boulders, and bogs
   - AFTER: caches perishable meat in snowbanks, boulder fields, and forest
7. **Source:** w9 (citation authors) [HTML + v2 (v2 "label" field)]
   - BEFORE: >Dyck et al. · Refrigeration
   - AFTER: >van der Veen, Mattisson, Zimmermann, Odden and Persson · Refrigeration
8. **Source:** w11, w12, w5, w13, w21 (585 miles unverifiable) [HTML + v2]
   - BEFORE: has been tracked crossing 585 miles alone,
   - AFTER: has been tracked crossing about 500 miles alone,
9. **Source:** w11, w12, w5 (axis read) [HTML + v2]
   - BEFORE: A single dispersing wolverine has been tracked covering 585 miles in a few months,
   - AFTER: A single dispersing wolverine has been tracked covering about 500 miles in two months,
10. **Source:** w11, w12, w5, w13, w21 (585 miles; rewritten to M56) [HTML + v2]
   - BEFORE: One dispersing juvenile male was tracked crossing <b>585 miles</b> of highways, mountain ranges, and state lines over a few months, one of the longest overland journeys ever recorded for the species.
   - AFTER: In 2009 a young male collared in Wyoming was tracked traveling <b>about 500 miles</b> into Colorado over two months, crossing Interstate 80, the first wolverine confirmed in the state since 1919.
11. **Source:** w6, w5, w14 (trait name repeated the wrong contrast) [HTML + v2]
   - BEFORE: Fur that sheds the frost instead of fighting it
   - AFTER: Fur the frost cannot hold
12. **Source:** w6, w5, w14 (framing wrong; single flick embellished) [HTML + v2]
   - BEFORE: Wolverine fur is prized for parka ruffs not because it resists frost forming, but because its structure lets rime <b>be brushed clean with a single flick</b>, rather than soaking through like other furs.
   - AFTER: Wolverine fur is prized for parka ruffs because it resists frost: ice from the wearer's breath <b>does not bind to it and brushes off</b> as loose powder.
13. **Source:** w6, w14 (reading under the corrected fact) [HTML + v2]
   - BEFORE: You weren't built to avoid hard conditions sticking to you. You were built to
   - AFTER: Hard conditions land on you like anyone else. You were built to

## weaverbird

1. **Source:** v7, v8, v6 (header: 雀 is sparrow; family name 織布鳥) (rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v2]
   - BEFORE: <span class="rail__han" aria-hidden="true">雀</span>
   - AFTER: <span class="rail__han" aria-hidden="true">織布鳥</span>
   - BEFORE: data-say="雀" aria-label="Hear 雀, què"
   - AFTER: data-say="織布鳥" aria-label="Hear 織布鳥, zhībùniǎo"
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">què</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">zhībùniǎo</span>
   - BEFORE: <span class="serial-han">雀</span>
   - AFTER: <span class="serial-han">織布鳥</span>
   - BEFORE: <span class="h" lang="zh">雀</span><span class="py" lang="zh-Latn-pinyin">què</span>
   - AFTER: <span class="h" lang="zh">織布鳥</span><span class="py" lang="zh-Latn-pinyin">zhībùniǎo</span>
   - BEFORE: "animalHan": "雀"
   - AFTER: "animalHan": "織布鳥"
   - BEFORE: "animalHanPy": "què"
   - AFTER: "animalHanPy": "zhībùniǎo"
   - Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1; template animalHan 1, animalHanPy 1.
2. **Source:** v5, v6 (no Pacific range) [HTML + v2]
   - BEFORE: found across Africa, Asia, and parts of the Pacific — best known for
   - AFTER: found mostly in Africa south of the Sahara, with a few species in tropical Asia, and best known for
3. **Source:** v5, v9, v11 (frame repeated the over-under and structural framing) [HTML + v2]
   - BEFORE: The over-under weaving technique, the female's structural inspection, the freshness test, the communal architecture of the Social Weaver, the nest as proposal — these are what the archetype is built on.
   - AFTER: The weaving and knotting, the female's inspection, the freshness test, the communal nest of the sociable weaver, the nest as proposal: these are what the archetype is built on.
4. **Source:** v9, v21 (trait name) [HTML + v2]
   - BEFORE: Over-under knotting technique
   - AFTER: Weave and knot
5. **Source:** v9, v21 (weave and knot) [HTML + v2]
   - BEFORE: Male weaverbirds construct nests using a specific <b>over-under weaving technique with grass strips</b> — pulling each strand through a loop or over a branch in a deliberate interlocking pattern rather than random bundling; this produces structural integrity that can support the weight of a breeding pair and a clutch of eggs.
   - AFTER: Male weaverbirds <b>cut, weave, and knot strips of grass</b>, often 20 to 60 centimetres long, and a baya weaver may make up to 500 trips to finish one nest; the result is strong enough to hold a breeding pair and a clutch of eggs.
6. **Source:** v9, v14 (trait name) [HTML + v2]
   - BEFORE: Female inspection and rejection
   - AFTER: Female inspection
7. **Source:** v9, v15, v14 (most species and up to half unverifiable) [HTML + v2]
   - BEFORE: In most Ploceidae species, the female <b>physically inspects the nest by pulling at the structure</b> and evaluating its integrity; if the construction is inadequate, she rejects it and the male must begin again; in some species, up to half of completed nests are rejected on initial inspection.
   - AFTER: In the baya weaver, the female <b>inspects the nest while it is still half-built</b>, at the helmet stage, and signals whether she accepts it; one observer watched a female tug at loose strands and hammer at a nest for 20 minutes. Height and site may matter to her as much as the weave.
8. **Source:** v9, v11, v15 (axis read) [HTML + v2]
   - BEFORE: The female weaverbird inspects the nest by pulling at it, testing structural integrity, and — in some species — assessing the freshness of the green materials used,
   - AFTER: The female weaverbird inspects the nest, sometimes tugging at it, and assesses the freshness of the green materials used,
9. **Source:** v17, v18 (common name sociable weaver) [HTML + v2]
   - BEFORE: Social Weaver communal architecture
   - AFTER: Sociable weaver communal architecture
10. **Source:** v16, v18, v17 (size, century of use, family placement) [HTML + v2]
   - BEFORE: The Social Weaver (Philetairus socius) constructs <b>permanent communal nests the size of haystacks</b> — up to five metres wide and three metres tall — housing more than a hundred nesting chambers maintained by the colony across multiple decades; documented as one of the largest structures built by any bird species.
   - AFTER: The sociable weaver (Philetairus socius), a weaver relative sometimes placed in the sparrow family, builds <b>permanent communal nests the size of haystacks</b>, up to about six metres wide and three metres tall, with a hundred or more chambers, some kept in use for more than a century; they are among the largest nests built by any bird.
11. **Source:** v16 (axis read) [HTML + v2]
   - BEFORE: Social Weavers live in permanent colonies whose nests — built collectively over decades — house more than a hundred breeding pairs.
   - AFTER: Sociable weavers live in permanent colonies whose nests, built together and reused for generations, hold a hundred or more chambers.
12. **Source:** v12, v13 (axis read; population traditions unverifiable) [HTML + v2]
   - BEFORE: to the 100-chamber communal structures of the Social Weaver (Philetairus socius). Each population has a recognisable architectural tradition. Individual birds adapt the design to available materials but do not abandon the structural template their tradition provides.
   - AFTER: to the 100-chamber communal structures of the sociable weaver (Philetairus socius). Individual males get better with practice, and each keeps a recognisable way of building.
13. **Source:** v11, v16 (axis read; demolition is about fading) [HTML + v2]
   - BEFORE: the permanent communal nests of the Social Weaver are maintained across generations. But within the colony, individual males construct new nests each breeding season, sometimes demolishing old ones to rebuild from scratch when inspection fails.
   - AFTER: the permanent communal nests of the sociable weaver are maintained across generations. But within a colony, individual males build new nests each breeding season, tearing down old ones once the green fades.
14. **Source:** v12, v13 (trait name) [HTML + v2]
   - BEFORE: Architectural traditions by population
   - AFTER: Every builder's own hand
15. **Source:** v12, v13 (population traditions unverifiable; replaced with individual consistency) [HTML + v2]
   - BEFORE: Different weaverbird populations produce <b>recognisably different nest designs</b> within the same species — including consistent differences in the entrance tunnel length, the degree of weave tightness, and the chamber shape; these designs are transmitted through social learning and differ between geographically separated groups.
   - AFTER: In southern masked weavers, researchers found that <b>each male builds in his own consistent way</b>, and that experienced males drop grass less often than beginners: the skill improves with practice.
16. **Source:** v12, v13 (reading under the corrected fact) [HTML + v2]
   - BEFORE: What you make carries the mark of where you were formed. <em>Your standard of craft is not arbitrary — it was inherited, refined, and is now recognisably yours.</em>
   - AFTER: What you make carries your mark. <em>Your standard of craft was practiced into you, refined over many attempts, and is now recognisably yours.</em>
17. **Source:** v11 (reason wrong: freshness, not structure) [HTML + v2]
   - BEFORE: When a nest is rejected, male weaverbirds frequently <b>dismantle the structure and rebuild from the foundation</b> — occasionally reusing some materials, but reconstructing the weave rather than patching it; this behavior has been observed in multiple Ploceus species and linked to female preference for structurally sound construction.
   - AFTER: Male weaverbirds <b>tear down nests that go unchosen</b>, taking 20 to 30 minutes for each, and build fresh ones; some build a new nest right beneath the old. The trigger is age: the green grass fades to brown within days, and females usually accept only green nests.
18. **Source:** v11 (reading under the corrected fact) [HTML + v2]
   - BEFORE: The rejection is not the end of the attempt. It is information about what the structure lacked. <em>You have rebuilt things from the start before — not from failure, but from the understanding that a patched structure is not a sound one.</em>
   - AFTER: A rejection ends one attempt and starts the next. <em>You have rebuilt things from the start before, because what you offer has to be fresh to be taken.</em>
19. **Source:** v11 (mirror Defense panel repeated the structural reason) [HTML + v2]
   - BEFORE: When a nest fails inspection, the male weaverbird does not patch it. He dismantles it and begins again. This is not self-punishment. It is structural integrity: a patched nest fails in different ways than a sound one, and the failure will be worse for the bird inside it.
   - AFTER: When a nest goes unchosen and starts to fade, the male weaverbird does not patch it. He tears it down and builds fresh. Females look for green, new work, and an old nest has already lost its chance.
20. **Source:** v14, v9 (lesson repeated up to half) [HTML + v2]
   - BEFORE: The female weaverbird inspects up to half of all nests and rejects them. The males who form bonds are the ones who rebuilt after rejection and presented again.
   - AFTER: The female weaverbird inspects the nests on offer and turns some down. The males who pair are the ones who keep building and presenting again.
21. **Source:** v12, v13, v11 (likely fabricated citation replaced with Walsh et al. 2011 summary and the Weaver Watch green-nest note) [HTML]
   - BEFORE: <li><a href="https://doi.org/10.1016/j.anbehav.2009.06.026" rel="noopener">Theunissen, B.I. &amp; Shawe-Taylor, L. (2009). Nest construction and female mate choice in southern masked weavers. Animal Behaviour 78.</a></li>
   - AFTER: <li><a href="https://weavers.adu.org.za/newstable.php?id=133" rel="noopener">Walsh, P.T., Hansell, M., Borello, W.D. &amp; Healy, S.D. (2011). Nest building in southern masked weavers, Behavioural Processes (summary by Weaver Watch, University of Cape Town)</a></li>
        <li><a href="https://weavers.adu.org.za/newstable.php?id=797" rel="noopener">Weaver Watch, FitzPatrick Institute, University of Cape Town · Green nests, acceptance and demolition</a></li>
22. **Source:** v12, v13, v11 (same, template form) [v2]
   - BEFORE: "label": "Theunissen, B.I. & Shawe-Taylor, L. (2009). Nest construction and female mate choice in southern masked weavers. Animal Behaviour 78.",
        "href": "https://doi.org/10.1016/j.anbehav.2009.06.026"
      },
   - AFTER: "label": "Walsh, P.T., Hansell, M., Borello, W.D. & Healy, S.D. (2011). Nest building in southern masked weavers, Behavioural Processes (summary by Weaver Watch, University of Cape Town)",
        "href": "https://weavers.adu.org.za/newstable.php?id=133"
      },
      {
        "label": "Weaver Watch, FitzPatrick Institute, University of Cape Town · Green nests, acceptance and demolition",
        "href": "https://weavers.adu.org.za/newstable.php?id=797"
      },
23. **Source:** v17 (IUCN label common name) [HTML + v2]
   - BEFORE: Philetairus socius (Social Weaver)
   - AFTER: Philetairus socius (Sociable Weaver)
24. **Source:** v11 (axis read tail) [HTML + v2]
   - BEFORE: the specific structure is rebuilt when it does not hold.
   - AFTER: the specific structure is rebuilt when it fades.

## vampire-squid

1. **Source:** s17 (header: 淵 is abyss; species name 吸血烏賊) (rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v2]
   - BEFORE: <span class="rail__han" aria-hidden="true">淵</span>
   - AFTER: <span class="rail__han" aria-hidden="true">吸血烏賊</span>
   - BEFORE: data-say="淵" aria-label="Hear 淵, yuān"
   - AFTER: data-say="吸血烏賊" aria-label="Hear 吸血烏賊, xīxuè wūzéi"
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">yuān</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">xīxuè wūzéi</span>
   - BEFORE: <span class="serial-han">淵</span>
   - AFTER: <span class="serial-han">吸血烏賊</span>
   - BEFORE: <span class="h" lang="zh">淵</span><span class="py" lang="zh-Latn-pinyin">yuān</span>
   - AFTER: <span class="h" lang="zh">吸血烏賊</span><span class="py" lang="zh-Latn-pinyin">xīxuè wūzéi</span>
   - BEFORE: "animalHan": "淵"
   - AFTER: "animalHan": "吸血烏賊"
   - BEFORE: "animalHanPy": "yuān"
   - AFTER: "animalHanPy": "xīxuè wūzéi"
   - Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1; template animalHan 1, animalHanPy 1.
2. **Source:** s7, s6, s10 (absolute 'does not hunt') [HTML + v2]
   - BEFORE: The only cephalopod that does not hunt — it descends below the oxygen of living things and receives what the dark brings down.
   - AFTER: The only cephalopod known to live mainly on falling debris instead of hunting. It descends below the oxygen of living things and receives what the dark brings down.
3. **Source:** s7, s9, s10, s6 (depth range; exclusivity overstated) [HTML + v2]
   - BEFORE: The Vampire Squid lives in the oxygen minimum zone, between six hundred and nine hundred meters down, in a layer of ocean so depleted of oxygen that almost nothing else can survive there — predator or prey.
   - AFTER: The Vampire Squid lives in the oxygen minimum zone, mostly between six hundred and twelve hundred meters down, in a layer of ocean where oxygen falls to about 0.4 milliliters per liter, and it thrives there.
4. **Source:** s7, s13 (trait name) [HTML + v2]
   - BEFORE: The zone nothing else can enter
   - AFTER: The low-oxygen zone
5. **Source:** s13, s7 (only cephalopod to thrive: narrowed to Wikipedia wording) [HTML + v2]
   - BEFORE: where dissolved oxygen levels are too low for most marine life. It is the only cephalopod known to thrive there, not by tolerating the condition but by being built specifically for it.
   - AFTER: where dissolved oxygen falls lower than many marine animals can bear. It is described as the only cephalopod able to live its entire life cycle there, with a body adapted to make use of the zone.
6. **Source:** s7, s10 (axis read, overstated) [HTML + v2]
   - BEFORE: The oxygen minimum zone is uninhabitable for most creatures — that is partly the point.
   - AFTER: The oxygen minimum zone is hard living for most creatures, and that is partly the point.
7. **Source:** s7, s6, s10 (exclusively and dissolved particles wrong) [HTML + v2]
   - BEFORE: feeding exclusively on marine snow: the slow fall of dead organic matter, bacteria, fecal pellets, and dissolved particles drifting down from the sunlit water above.
   - AFTER: feeding mainly on marine snow: the slow fall of dead organic matter drifting down from the sunlit water above. Its stomachs hold fecal pellets, bits of copepods, diatoms, and fish scales, bound in mucus, and it may also take small zooplankton.
8. **Source:** s7, s6 (axis read, absolute) [HTML + v2]
   - BEFORE: The vampire squid does not dart or hunt; it drifts at six hundred meters with no current of its own, and waits for what settles.
   - AFTER: The vampire squid lives mainly by drifting rather than hunting; it hangs six hundred meters down or deeper, and waits for what settles.
9. **Source:** s7, s6 (mirror Gift panel, absolute) [HTML + v2]
   - BEFORE: The vampire squid does not hunt. It drifts, extends its filaments,
   - AFTER: The vampire squid lives mainly without hunting. It drifts, extends its filaments,
10. **Source:** s6, s7, s10, s9 (spines are soft cirri) [HTML + v2]
   - BEFORE: forming a cloak of arm webbing covered in sharp spines that closes around it completely.
   - AFTER: forming a cloak of arm webbing lined with fleshy, spine-like cirri that closes around it.
11. **Source:** s6, s7 (reading under the corrected fact) [HTML + v2]
   - BEFORE: and the spines are not anger — they are the structure of a creature
   - AFTER: and those soft spines come from the structure of a creature
12. **Source:** s6, s11, s12, s13 (300 million years wrong) [HTML + v2]
   - BEFORE: Vampyroteuthis infernalis is the sole member of its order, Vampyromorphida, and its form <b>has not changed meaningfully in approximately three hundred million years</b>, making it one of the oldest body plans still in continuous operation.
   - AFTER: Vampyroteuthis infernalis is the last living member of its order, Vampyromorphida, and <b>its relatives were already swimming in the Jurassic</b>, about 164 million years ago.
13. **Source:** s11, s12 (axis read) [HTML + v2]
   - BEFORE: This body has not changed in three hundred million years, because its zone has not required change.
   - AFTER: Its kind has been around since the Jurassic, at least 164 million years.
14. **Source:** s11, s12 (axis read) [HTML + v2]
   - BEFORE: Three hundred million years in the same zone is not accident; it is a form of commitment the body does not explain.
   - AFTER: Some 164 million years of lineage is a form of commitment the body does not explain.
15. **Source:** s7, s6 (verified addition: eight times body length) [HTML + v2]
   - BEFORE: <b>two retractile filaments</b> that it extends slowly into the dark water
   - AFTER: <b>two retractile filaments</b> that it extends slowly into the dark water, up to eight times its body length,
16. **Source:** s8 (citation wrong title and journal) [HTML]
   - BEFORE: <a href="https://www.cambridge.org/core/journals/journal-of-the-marine-biological-association-of-the-united-kingdom" rel="noopener">Robison et al. (2003) · Behaviour of the vampire squid, Journal of the Marine Biological Association of the UK</a>
   - AFTER: <a href="https://doi.org/10.2307/1543231" rel="noopener">Robison, Reisenbichler, Hunt &amp; Haddock (2003) · Light production by the arm tips of the deep-sea cephalopod Vampyroteuthis infernalis, Biological Bulletin 205</a>
17. **Source:** s8 (citation, template form) [v2]
   - BEFORE: "label": "Robison et al. (2003) · Behaviour of the vampire squid, Journal of the Marine Biological Association of the UK",
        "href": "https://www.cambridge.org/core/journals/journal-of-the-marine-biological-association-of-the-united-kingdom"
   - AFTER: "label": "Robison, Reisenbichler, Hunt & Haddock (2003) · Light production by the arm tips of the deep-sea cephalopod Vampyroteuthis infernalis, Biological Bulletin 205",
        "href": "https://doi.org/10.2307/1543231"
18. **Source:** s7 (title is plural) [HTML + v2]
   - BEFORE: Vampire squid: detritivore in the oxygen minimum zone
   - AFTER: Vampire squid: detritivores in the oxygen minimum zone
## Not applied

- asian-elephant home lede (line "returns, reliably, to the same water sources and family ground across decades"): not in fact_audit and no source in the dossier either way. Unchanged; worth a later check.
- asian-elephant team read "they may not know where the water is": a metaphor, not a fact claim. Unchanged.
- asian-elephant star labels 天梁 "the Elder star" and 天府 "the Storehouse star": synonyms of the hub labels (R4 kept "Storehouse"). Unchanged. The Elder star copy "In Purple Star this star also carries a private cost" describes the star's meaning, not a pairing. Unchanged.
- archerfish ov-lead, ov-frame and dial reads still carry old em dashes outside the replaced sentences. Not touched (writing pass, not facts).
- archerfish single-glyph option (keep 射 labeled "shoot"): task named the full name 射水魚, so the full name was used.
- wolverine Olaus Magnus, Mi'kmaq Lox and Dene items: not present on the page (checked). Nothing to remove.
- wolverine Inman et al. 2017 source line: the paper exists (w21); kept.
- weaverbird trait 3 (freshness): audit OK; its old em dash is untouched.
- weaverbird mirror Gift panel ("She pulls at it. She tests the weave."): supported at blog level (v15); kept.
- weaverbird archetype intro "If the biology did not support the claim, the claim was cut" (page_bugs): kept, now true after the fixes.
- vampire-squid "eyes proportionally among the largest of any animal its size" (perception axis) and shareLine "make light without chasing anything": not in fact_audit. Unchanged.
- vampire-squid header: dossier preferred 幽靈蛸 yōulíng shāo as a short name; task specified 吸血烏賊 xīxuè wūzéi (the Chinese Wikipedia headword), which was used. Four characters plus a two-word pinyin; worth a visual check of rail and keepsake (no CSS touched).
- Related Animals explore-card labels: not touched (fixed sitewide).

## Structure check

All five pages parse with python html.parser. Every JSON-LD and application/json block parses (4 per page). Section counts match the backups. All edited template JSON loads and keysets are unchanged (raw string replacement, formatting preserved). Every BEFORE string is gone and every AFTER string is present in the target files (scripted check). No em dash, en dash or arrow and none of the banned words in any new text; old em dashes inside replaced sentences were dropped. No `<!--w4-reading-->` block on any of these pages. No CSS or JS touched. Git not run.
Tag sequence vs backup: my edits add one `<li><a>` on weaverbird (second source). Each page also shows one extra `<b>` pair that I did not write (on asian-elephant it is in the "What it costs" line): another process saved all five pages at about 04:06 to 04:08 UTC, after my edits. My changes were re-checked afterward and are all intact.

## Final header characters

- asian-elephant: 象 xiàng (unchanged)
- archerfish: 射水魚 shèshuǐyú (was 射 shè)
- wolverine: 貂熊 diāoxióng (was 貂 diāo)
- weaverbird: 織布鳥 zhībùniǎo (was 雀 què)
- vampire-squid: 吸血烏賊 xīxuè wūzéi (was 淵 yuān)
