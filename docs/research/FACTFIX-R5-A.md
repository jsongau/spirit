# FACTFIX-R5-A change log

Date: 2026-11-08. Pages: albatross, tasmanian-devil, satin-bowerbird, paradise-riflebird, pallass-cat.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). "x2" means the string occurred twice in that file. Albatross, tasmanian-devil, satin-bowerbird and pallass-cat have v2 only; paradise-riflebird has v1 (full) and v2 (a sparse file that holds only the header placeholder of these strings).
Backups of the original pages: `~/factfix-backup-r5a/<slug>.html`; original template JSON in `~/factfix-backup-r5a/tpl/v1/` and `~/factfix-backup-r5a/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site (R2 to R4 precedent). Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy.
Paradise riflebird header: the dossier flagged 大掩鼻风鸟 as unconfirmed (possible mix-up with the Magnificent Riflebird). Confirmed this round on GBIF (species 2494898, Ptiloris paradiseus, Chinese names 大掩鼻风鸟 and 大裙天堂鳥; species 2494897, Ptiloris magnificus, is 丽色掩鼻风鸟), so no mix-up. Traditional form 大掩鼻風鳥 dà yǎnbí fēngniǎo applied. Source tag GBIF below means https://www.gbif.org/species/2494898.
Purple Star: all five dossiers mark the Purple Star block OK (no star assigned from the sign pair, chart described as cast from lunar birth date and hour). Nothing to reword this round.

## albatross

1. **Source:** wiki-wand, nature1990 [HTML + v2]
   - BEFORE: GPS tracking confirms individuals complete a circumnavigation of the Southern Ocean roughly every two weeks.
   - AFTER: Satellite tracking shows some birds circle the whole Southern Ocean three times in a single year.
2. **Source:** wiki-alb, wiki-wand (unsourced clause replaced with a sourced one) [HTML + v2]
   - BEFORE: Contact between partners during their ocean crossings is essentially zero.
   - AFTER: Divorce is rare, and usually follows repeated breeding failure.
3. **Source:** ucd1995, nevitt2008 (title: smell finds prey, not navigation) [HTML + v2]
   - BEFORE: Olfactory Navigation
   - AFTER: Hunting by Scent
4. **Source:** ucd1995, nevitt2008 [HTML + v2]
   - BEFORE: Albatrosses navigate partly by smell — they <b>detect dimethyl sulfide</b>, a compound released by phytoplankton, across hundreds of kilometers of open ocean, using it to locate productive feeding areas that are invisible from the surface.
   - AFTER: Wandering Albatrosses <b>hunt partly by smell</b>. In one tracking study, birds turned to follow a scent before nearly half of their approaches to prey, finding food they could not yet see.
5. **Source:** ucd1995, nevitt2008 (axis read) [HTML + v2]
   - BEFORE: The albatross reads the sea's surface and smell — it detects dimethyl sulfide released by phytoplankton blooms to locate food across hundreds of kilometers.
   - AFTER: The albatross reads the sea's surface and smell, and often follows a scent toward prey before it can see it.
6. **Source:** wiki-alb, weim2000 [HTML + v2]
   - BEFORE: In calm air, the albatross must flap continuously and burns energy at an unsustainable rate. <b>In the doldrums — the equatorial belt of low winds — it is effectively grounded.</b> It lands on the water and waits for conditions to return.
   - AFTER: Flapping flight is costly for the albatross, and take-off and landing cost it most of all. <b>It avoids the windless tropics altogether</b>, and on calm days it sits on the sea and waits for the wind to return.
7. **Source:** wiki-alb, weim2000 (mirror take, same claim) [HTML + v2]
   - BEFORE: The albatross cannot fly in calm air. If the right conditions
   - AFTER: The albatross rarely flies in calm air. If the right conditions

## tasmanian-devil

1. **Source:** zhwiki-td (header: rail__han) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">骨</span>
   - AFTER: <span class="rail__han" aria-hidden="true">袋獾</span>
2. **Source:** zhwiki-td (header: rail + keepsake button data-say/aria-label) [HTML x2]
   - BEFORE: data-say="骨" aria-label="Hear 骨, gǔ"
   - AFTER: data-say="袋獾" aria-label="Hear 袋獾, dàihuān"
3. **Source:** zhwiki-td (header: rail__py) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">gǔ</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">dàihuān</span>
4. **Source:** zhwiki-td (header: serial-han) [HTML]
   - BEFORE: <span class="serial-han">骨</span>
   - AFTER: <span class="serial-han">袋獾</span>
5. **Source:** zhwiki-td (header: keepsake .h/.py) [HTML]
   - BEFORE: <span class="h" lang="zh">骨</span><span class="py" lang="zh-Latn-pinyin">gǔ</span>
   - AFTER: <span class="h" lang="zh">袋獾</span><span class="py" lang="zh-Latn-pinyin">dàihuān</span>
6. **Source:** zhwiki-td (template animalHan) [v2]
   - BEFORE: "animalHan": "骨"
   - AFTER: "animalHan": "袋獾"
7. **Source:** zhwiki-td (template animalHanPy) [v2]
   - BEFORE: "animalHanPy": "gǔ"
   - AFTER: "animalHanPy": "dàihuān"
8. **Source:** wiki-td, nre-faq (intro: range since 2020; name from night calls) [HTML + v2]
   - BEFORE: found only on the island of Tasmania, with jaws among the strongest relative to body size of any living mammal and a communal feeding behavior so loud and aggressive that the first European settlers gave it its name.
   - AFTER: found in the wild almost only on the island of Tasmania, with jaws among the strongest relative to body size of any living mammal and night screams, coughs and growls so unsettling that the first European settlers gave it its name.
9. **Source:** wiki-td, nre-about (limit to smaller carcasses) [HTML + v2]
   - BEFORE: It leaves nothing of a carcass.
   - AFTER: Of a smaller carcass it can leave nothing at all.
10. **Source:** nre-faq, wiki-td (naming) [HTML]
   - BEFORE: This screaming behavior was the basis for the species being named "devil" by early European settlers.
   - AFTER: Its screams, coughs and growls in the night earned it the name "devil" from early European settlers.
11. **Source:** nre-faq, wiki-td (naming, JSON-escaped form) [v2]
   - BEFORE: This screaming behavior was the basis for the species being named \"devil\" by early European settlers.
   - AFTER: Its screams, coughs and growls in the night earned it the name \"devil\" from early European settlers.
12. **Source:** wiki-dftd, wiki-td (first seen 1996; Pearse and Swift showed allograft) [HTML + v2]
   - BEFORE:  — first documented by Pearse and Swift (2006).
   - AFTER: . It was first seen in 1996 in north-east Tasmania; in 2006 Pearse and Swift showed that the tumour cells themselves pass from devil to devil.
13. **Source:** nre-faq, nre-about, wiki-td (frame repeats corrected fact) [HTML + v2]
   - BEFORE: The forty embryos, four survivors.
   - AFTER: The forty newborns, four teats.
14. **Source:** nre-faq, nre-about, wiki-td (title) [HTML + v2]
   - BEFORE: Forty embryos, four survivors
   - AFTER: Forty newborns, four teats
15. **Source:** nre-faq, nre-about, wiki-td (live young, not embryos) [HTML + v2]
   - BEFORE: give birth to <b>up to forty embryos simultaneously</b>, but only four nipples are available in the pouch. The first four to arrive survive; the rest do not.
   - AFTER: give birth to <b>as many as forty tiny young</b> after about three weeks' gestation, but the pouch holds only four teats. Only young that reach a teat can survive, and usually two or three leave the pouch.
16. **Source:** wiki-td, nre-faq, nre-about (cause unknown; 2020 mainland return) [HTML + v2]
   - BEFORE: have been absent from the Australian mainland for approximately 3,000 years, likely driven out by competition and predation. They have not dispersed; their entire population and all its consequences are contained on a single island.
   - AFTER: vanished from the Australian mainland roughly 3,000 years ago, for reasons still debated: dingoes, people and a drying climate have all been proposed. Almost the whole population still lives on a single island, though a small group was returned to a sanctuary in New South Wales in 2020.
17. **Source:** wiki-td, nre-faq (axis read) [HTML + v2]
   - BEFORE: The Tasmanian devil exists nowhere else on earth. Its entire range is a single island; it was eliminated from the Australian mainland roughly 3,000 years ago and has never returned.
   - AFTER: The Tasmanian devil lives wild almost nowhere else on earth. Its range is a single island; it vanished from the Australian mainland roughly 3,000 years ago, and only in 2020 did a small group return, to a fenced sanctuary.
18. **Source:** csiro (2003 edited volume; unconfirmed chapter dropped) [HTML + v2]
   - BEFORE: Jones, M.E. et al. (2004) — Ecology of the Tasmanian Devil, in Predators with Pouches (CSIRO Publishing)
   - AFTER: Jones, M.E., Dickman, C.R. &amp; Archer, M., eds (2003), Predators with Pouches: The Biology of Carnivorous Marsupials (CSIRO Publishing)
19. **Source:** csiro (link to the book page the dossier lists) [HTML + v2]
   - BEFORE: publish.csiro.au/book/3429
   - AFTER: publish.csiro.au/book/2550

## satin-bowerbird

1. **Source:** s17, s18 (header: rail__han) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">鸟</span>
   - AFTER: <span class="rail__han" aria-hidden="true">緞藍園丁鳥</span>
2. **Source:** s17, s18 (header: buttons) [HTML x2]
   - BEFORE: data-say="鸟" aria-label="Hear 鸟, niǎo"
   - AFTER: data-say="緞藍園丁鳥" aria-label="Hear 緞藍園丁鳥, duànlán yuándīngniǎo"
3. **Source:** s17, s18 (header: rail__py) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">niǎo</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">duànlán yuándīngniǎo</span>
4. **Source:** s17, s18 (header: serial-han) [HTML]
   - BEFORE: <span class="serial-han">鸟</span>
   - AFTER: <span class="serial-han">緞藍園丁鳥</span>
5. **Source:** s17, s18 (header: keepsake .h/.py) [HTML]
   - BEFORE: <span class="h" lang="zh">鸟</span><span class="py" lang="zh-Latn-pinyin">niǎo</span>
   - AFTER: <span class="h" lang="zh">緞藍園丁鳥</span><span class="py" lang="zh-Latn-pinyin">duànlán yuándīngniǎo</span>
6. **Source:** s17, s18 (template animalHan) [v2]
   - BEFORE: "animalHan": "鸟"
   - AFTER: "animalHan": "緞藍園丁鳥"
7. **Source:** s17, s18 (template animalHanPy) [v2]
   - BEFORE: "animalHanPy": "niǎo"
   - AFTER: "animalHanPy": "duànlán yuándīngniǎo"
8. **Source:** s5, s6, s7 (hero drops "entirely") [HTML + v2]
   - BEFORE: You build your bower entirely in blue, then wait
   - AFTER: You build your bower mostly in blue, then wait
9. **Source:** s5, s6, s7 (title) [HTML + v2]
   - BEFORE: Blue, and only blue
   - AFTER: Blue above all
10. **Source:** s5, s6, s7 [HTML + v2]
   - BEFORE: Males decorate the bower almost exclusively with <b>blue objects</b>, feathers, flowers, berries, and increasingly plastic and glass, gathered from a wide area and arranged with evident selectivity.
   - AFTER: Males favor <b>blue objects</b>, feathers, flowers, berries, and increasingly plastic and glass, gathered from a wide area and arranged with evident selectivity. Mature males use the most blue, but yellow and shiny things and snail shells turn up too.
11. **Source:** s6, s8, s9, s10, s11 (bark tool unverifiable, cut; "some males" undersold) [HTML + v2]
   - BEFORE: Some males <b>chew plant material into a paste</b>, mixed with saliva and sometimes charcoal, and apply it to the interior bower walls using a piece of bark held in the bill like a tool.
   - AFTER: Males <b>chew plant material into a paste</b>, mixed with saliva and sometimes charcoal, and paint it onto the inner walls of the bower. The paint matters: when researchers removed it, females came back to the bower less often.
12. **Source:** s5, s6, s12 ("for years" unsourced) [HTML + v2]
   - BEFORE: and a male typically maintains and defends only his own single bower for years.
   - AFTER: and a male keeps his own bower up all year round.
13. **Source:** s19, s20 (modern sense added) [HTML + v2]
   - BEFORE: True mastery no longer needs to perform.
   - AFTER: True mastery no longer needs to perform. In everyday Chinese today the idiom usually means dumbstruck, frozen like a wooden rooster; we read it in the old Zhuangzi sense.
14. **Source:** s12, s21 (real title of Borgia 1985 Anim Behav 33:266-271) [HTML + v2]
   - BEFORE: Borgia, G. (1985) · Bower quality, decorations and mate choice in the satin bowerbird · Animal Behaviour
   - AFTER: Borgia, G. (1985) · Bowers as markers of male quality. Test of a hypothesis · Animal Behaviour 33
15. **Source:** s12 (link was the journal home page; now the Borgia Lab publication list) [HTML + v2]
   - BEFORE: https://www.sciencedirect.com/journal/animal-behaviour
   - AFTER: https://science.umd.edu/biology/borgialab/index.html

## paradise-riflebird

1. **Source:** s14, s15, GBIF (header: rail__han) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">鸟</span>
   - AFTER: <span class="rail__han" aria-hidden="true">大掩鼻風鳥</span>
2. **Source:** s14, s15, GBIF (header: buttons) [HTML x2]
   - BEFORE: data-say="鸟" aria-label="Hear 鸟, niǎo"
   - AFTER: data-say="大掩鼻風鳥" aria-label="Hear 大掩鼻風鳥, dà yǎnbí fēngniǎo"
3. **Source:** s14, s15, GBIF (header: rail__py) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">niǎo</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">dà yǎnbí fēngniǎo</span>
4. **Source:** s14, s15, GBIF (header: serial-han) [HTML]
   - BEFORE: <span class="serial-han">鸟</span>
   - AFTER: <span class="serial-han">大掩鼻風鳥</span>
5. **Source:** s14, s15, GBIF (header: keepsake .h/.py) [HTML]
   - BEFORE: <span class="h" lang="zh">鸟</span><span class="py" lang="zh-Latn-pinyin">niǎo</span>
   - AFTER: <span class="h" lang="zh">大掩鼻風鳥</span><span class="py" lang="zh-Latn-pinyin">dà yǎnbí fēngniǎo</span>
6. **Source:** s14, s15, GBIF (template v1 animalHan) [v1]
   - BEFORE: "animalHan": "鸟"
   - AFTER: "animalHan": "大掩鼻風鳥"
7. **Source:** s14, s15, GBIF (template v1 animalHanPy) [v1]
   - BEFORE: "animalHanPy": "niǎo"
   - AFTER: "animalHanPy": "dà yǎnbí fēngniǎo"
8. **Source:** s14, s15, GBIF (template v2 placeholder filled; animalHanPy key added) [v2]
   - BEFORE: "animalHan": "TODO: one hanzi for the creature"
   - AFTER: "animalHan": "大掩鼻風鳥",
  "animalHanPy": "dà yǎnbí fēngniǎo"
9. **Source:** s6, s7, s8, s9 (lead: angle claim unverifiable, replaced with sourced super-black) [HTML + v1]
   - BEFORE: A bird-of-paradise of the rainforest canopy in eastern Australia, black from every angle except the one it chooses.
   - AFTER: A bird-of-paradise of the rainforest canopy in eastern Australia, dressed in a black so deep it soaks up almost all light, until the sheen catches the sun.
10. **Source:** s6, s7, s8 ("single" and "stump" unsourced) [HTML + v1]
   - BEFORE: from <b>a single exposed branch or stump</b>, where he holds
   - AFTER: from <b>a traditional display perch, usually a thick exposed branch high in the canopy</b>, where he holds
11. **Source:** s6, s7, s8 (element reading repeats the perch fact) [HTML + v1]
   - BEFORE: the display perch itself, a single branch or stump, is what gives
   - AFTER: the display perch itself, a thick branch high in the canopy, is what gives
12. **Source:** s10, s11 (title: among known birds) [HTML + v1]
   - BEFORE: The hinge no other bird has
   - AFTER: The hinge no other known bird has
13. **Source:** s10, s11 [HTML + v1]
   - BEFORE: requires <b>hyperextending the wrist joint further than any other bird on record</b>, a mechanical adaptation that exists for this display alone.
   - AFTER: requires <b>bending the wrist back far beyond any other known bird</b>, a mechanical adaptation that seems to exist for this display alone.
14. **Source:** s6, s7, s8 (narrow-angle claim unverifiable) [HTML + v1]
   - BEFORE: that exists only as structural color, reading as ordinary black plumage from any angle outside the narrow one that catches it.
   - AFTER: that exists only as structural color, shimmering green, blue or purple in sunlight as the angle changes.
15. **Source:** s6, s5, s8, s11 ("otherwise silent" wrong) [HTML + v1]
   - BEFORE: its clearest documented call, in a species that otherwise moves through the canopy without much sound at all.
   - AFTER: its clearest documented call, though the male's wings also rustle loudly in flight and in display.
16. **Source:** s5, s7 (Lophorina is the wrong genus) [HTML + v1]
   - BEFORE: IUCN Red List · Lophorina paradisea (Ptiloris paradiseus)
   - AFTER: IUCN Red List · Ptiloris paradiseus (Paradise Riflebird)

## pallass-cat

1. **Source:** p3, p4 (header: rail__han) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">岩</span>
   - AFTER: <span class="rail__han" aria-hidden="true">兔猻</span>
2. **Source:** p3, p4 (header: buttons) [HTML x2]
   - BEFORE: data-say="岩" aria-label="Hear 岩, yán"
   - AFTER: data-say="兔猻" aria-label="Hear 兔猻, tùsūn"
3. **Source:** p3, p4 (header: rail__py) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">yán</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">tùsūn</span>
4. **Source:** p3, p4 (header: serial-han) [HTML]
   - BEFORE: <span class="serial-han">岩</span>
   - AFTER: <span class="serial-han">兔猻</span>
5. **Source:** p3, p4 (header: keepsake .h/.py) [HTML]
   - BEFORE: <span class="h" lang="zh">岩</span><span class="py" lang="zh-Latn-pinyin">yán</span>
   - AFTER: <span class="h" lang="zh">兔猻</span><span class="py" lang="zh-Latn-pinyin">tùsūn</span>
6. **Source:** p3, p4 (template animalHan) [v2]
   - BEFORE: "animalHan": "岩"
   - AFTER: "animalHan": "兔猻"
7. **Source:** p3, p4 (template animalHanPy) [v2]
   - BEFORE: "animalHanPy": "yán"
   - AFTER: "animalHanPy": "tùsūn"
8. **Source:** p1 (title: skull is rounded, not flat) [HTML + v2]
   - BEFORE: The flat skull
   - AFTER: The low-set ears
9. **Source:** p1 (soften "flat" to broad, rounded) [HTML + v2]
   - BEFORE: has an unusually wide, flat skull with ears set
   - AFTER: has a broad, rounded head with ears set
10. **Source:** p1 (axis read: "flat" and unsourced 2 cm figure) [HTML + v2]
   - BEFORE: The low-set ears and flat skull are designed so it can peer above a rock while exposing less than two centimetres of its own profile.
   - AFTER: The low-set ears let it peer above a rock while showing very little of its own head.
11. **Source:** p1, p2 (pupils stay round, they do not dilate) [HTML + v2]
   - BEFORE: has <b>round pupils that dilate to full circles</b> — an adaptation that may improve visual acuity across the varied lighting of rocky steppe, talus, and open grassland.
   - AFTER: has <b>round pupils that stay round</b>, closing to small circles in bright sun. They may help it spot and track prey across the varied lighting of rocky steppe, talus, and open grassland.
12. **Source:** p1, p2 (axis read) [HTML + v2]
   - BEFORE: has round pupils that dilate to full circles rather than vertical slits — an adaptation for varying light levels across rocky steppe and talus.
   - AFTER: has round pupils that stay round in bright light rather than closing to vertical slits, which may help it track prey across rocky steppe and talus.
13. **Source:** p3 (superlative unverifiable, cut) [HTML + v2]
   - BEFORE: ; population density estimates carry the widest uncertainty margins in the Cat Specialist Group’s assessments because confirmed sightings in known habitat remain consistently low.
   - AFTER: ; its status across much of its range is still largely unknown, because confirmed sightings in known habitat remain consistently low.
14. **Source:** p1 (title, "twice" unsourced) [HTML + v2]
   - BEFORE: Appears twice its actual size
   - AFTER: Looks bigger than it is
15. **Source:** p1 (2.5 to 4.5 kg; guard hairs up to 69 mm; misidentification claim unverifiable, cut) [HTML + v2]
   - BEFORE: Pallas’s cats weigh 3.5 to 4.5 kilograms — similar to a large domestic cat — but their <b>exceptionally dense winter fur, reaching 7 to 8 centimetres in length</b>, makes the animal appear considerably larger, a source of misidentification documented in early mammal surveys of Central Asia.
   - AFTER: Pallas’s cats weigh 2.5 to 4.5 kilograms, about the size of a domestic cat, but their <b>exceptionally dense fur, with guard hairs up to about 7 centimetres long</b>, makes the animal appear considerably larger.
16. **Source:** p1 (title: ranges overlap, "almost no contact" overstated) [HTML + v2]
   - BEFORE: Home range, almost no contact
   - AFTER: A wide range, lived alone
17. **Source:** p1 (males up to 207, females 125.2; overlap one to four females; "entirely scent" unverifiable) [HTML + v2]
   - BEFORE: Radio-telemetry studies in Mongolia have recorded Pallas’s cat home ranges <b>of up to 207 square kilometres</b>, yet direct encounters between individuals are extremely rare; the territory is managed entirely through scent-marking and the near-complete absence of visible movement.
   - AFTER: Radio-telemetry in central Mongolia recorded male Pallas’s cat home ranges <b>of up to 207 square kilometres</b>, and female ranges up to about 125. A male’s range overlaps those of one to four females, yet each cat lives alone outside the mating season.
18. **Source:** p1, p2 (axis read: same-ridgelines claim unverifiable; dens from p2) [HTML + v2]
   - BEFORE: up to 207 square kilometres in Mongolian steppe surveys — but each territory is known intimately and managed from the same ridgelines and den sites year after year.
   - AFTER: males up to 207 square kilometres in Mongolian tracking studies, but each range is known closely, down to the borrowed burrows and rock crevices the cat sleeps in.
19. **Source:** p1, p2 (bone-structure anatomy study unverifiable) [HTML + v2]
   - BEFORE: The flat facial structure, round eyes, and low-set ears of Otocolobus manul produce a face that registers in photographs as contemptuous or unimpressed — <b>an expression produced entirely by bone structure</b>, documented in wildlife photography collections and comparative felid anatomy studies, not by any change in the animal’s affect.
   - AFTER: The low-set ears and round eyes of Otocolobus manul give it <b>a famously grumpy look</b> that registers in photographs as contemptuous or unimpressed, though it comes from the shape of the face, not from any change in the animal’s mood.
20. **Source:** p1, p2 (habitat lede: crepuscular and diurnal, not "most of its night") [HTML + v2]
   - BEFORE: sleeps in rock crevices and burrows on high ground, rises to the ridge at dusk, and spends most of its night watching from positions that show almost nothing of itself.
   - AFTER: sleeps in rock crevices and borrowed burrows on high ground, hunts mostly at dawn and dusk and often by day, and watches from positions that show almost nothing of itself.
21. **Source:** none found (same ridge, same hour: unverifiable, cut) [HTML + v2]
   - BEFORE: The Pallas’s cat returns to the same ridge at the same hour every evening — this is yours.
   - AFTER: The Pallas’s cat keeps watch from cover it knows well. This is yours.
22. **Source:** p1 (moon rhythm: lunar claim unverifiable, now labeled our pairing) [HTML + v2]
   - BEFORE: The Pallas’s cat hunts most actively during the new moon, when the steppe offers no reflected light and prey cannot see the low profile moving through the grass. The darkest night is the one this animal was designed for:
   - AFTER: We pair the Pallas’s cat with the new moon, when the steppe offers no reflected light and nothing can see a low profile moving through the grass. In our reading, the darkest night is the one this animal was designed for:

## Not applied

- Related Animals explore-card labels (albatross: Chambered Nautilus; tasmanian-devil: all five "Same year" labels): flagged WRONG in the dossiers but left alone per brief, since the labels were fixed sitewide. No fact text inside those cards needed a change.
- albatross header 信天翁 xìntiānwēng: audit OK, unchanged. The optional upgrade to 漂泊信天翁 piāobó xìntiānwēng (Wandering Albatross) was not applied.
- albatross "five million miles, ten round trips to the Moon": audit OK (an estimate; the page already says "may fly"). Unchanged. Readings that say the albatross "cannot soar in calm air" are true and kept.
- tasmanian-devil symbolic copy that leans on "the island with no exit" (frame line, Earth reading, mirror take, axis reads): readings, not facts, and the corrected facts still say almost the whole population lives on one island. Kept. The adaptability axis line about surviving the other mainland marsupial carnivores was not audited; unchanged.
- tasmanian-devil Predators with Pouches: the dossier could not confirm a chapter titled "Ecology of the Tasmanian Devil", so the source now cites the 2003 edited volume only. A person should check the contents before citing a chapter.
- satin-bowerbird Animal Diversity Web source: audit OK (link resolves), though the page it opens supports none of the facts. The dossier suggests swapping it for the Australian Museum page; not a correction, so unchanged.
- satin-bowerbird Borgia 1985: no DOI in the dossier, so the source now links the Borgia Lab publication list (s12), which lists the paper under its real title.
- satin-bowerbird header 緞藍園丁鳥 and paradise-riflebird header 大掩鼻風鳥 are five characters each; rail and keepsake layout were not changed (no CSS touched). Worth a visual check, as with the R4 bellbird. Pinyin keeps the two-word split given in the brief (duànlán yuándīngniǎo; dà yǎnbí fēngniǎo).
- paradise-riflebird "black from every angle but one" in the subtitle, overture title, card sub, share line and keepsake identity line: the dossier says the narrow-angle idea is a reading, not a fact. The factual overture lead was rewritten; the identity lines are the animal's signature reading and were kept. Owner may want them reworded.
- paradise-riflebird IUCN link (species 22706196): label fixed to Ptiloris paradiseus, but the dossier could not confirm the ID; not checked this round.
- paradise-riflebird v2 template only had the placeholder "TODO: one hanzi for the creature"; it now holds the header, and an animalHanPy key was added beside it (the only keyset change this round).
- pallass-cat Moon section: the "Power phase: New Moon" stat, ritual and calendar copy are our pairing and were kept; only the moon-why sentence that claimed a biological new-moon peak was relabeled as our reading.
- pallass-cat 猻: the dossier (p5) notes a sūn / xùn dispute; the brief and the Jyut Dictionary (p4) give tùsūn, used here.
- pallass-cat lines not in the audit ("watches from rocky cover for hours without shifting position") were left unchanged.

## Structure check

All five pages parse with python html.parser, and the full HTML start-tag sequence matches each backup. Every JSON-LD and application/json block parses (4 per page). All edited template JSON loads; keysets unchanged except paradise-riflebird v2 (animalHanPy added). Template files were edited as text, so their formatting is untouched. No new em dash, en dash or arrow in any new text (one old em dash inside a replaced pallass-cat axis sentence was dropped), and none of the banned words. No `<!--w4-reading-->` block on any of these pages. No CSS or JS touched. Git not run.

## Final header characters

- albatross: 信天翁 xìntiānwēng (unchanged)
- tasmanian-devil: 袋獾 dàihuān (was 骨 gǔ)
- satin-bowerbird: 緞藍園丁鳥 duànlán yuándīngniǎo (was 鸟 niǎo)
- paradise-riflebird: 大掩鼻風鳥 dà yǎnbí fēngniǎo (was 鸟 niǎo)
- pallass-cat: 兔猻 tùsūn (was 岩 yán)
