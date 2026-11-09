# FACTFIX-R10-B change log

Date: 2026-11-08. Pages: roadrunner, ribbon-seal, moose, loggerhead-shrike, kissing-gourami.
Source of truth: `data/research/<slug>.json` fact_audit (and page_bugs) plus `<slug>.md`. Source ids refer to each dossier's `sources` list (the gourami dossier uses g-ids).
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that exist (v2 for all five; v1 also for moose and loggerhead-shrike) unless marked HTML only, JSON only, or with the files named. Where a string appears more than once in a file, every copy was changed (count shown). Strings inside the page's embedded `animal-data` JSON block count as HTML copies.
Backups of the original pages: `~/factfix-backup-r10b/<slug>.html`; original template JSON in `~/factfix-backup-r10b/tpl/v2/` and `tpl/v1/` (both outside the repo).
Header glyphs use traditional forms to match the pages, per the R2/R3/R4 precedent. The glyph swap covers rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. roadrunner 走鵑 and loggerhead-shrike 鵙 were kept; their pinyin already shows in rail__py and keepsake .py.

## roadrunner

1. **Source:** s2, s1, s4 (trait 1 fact; cut the meaningless flight sentence)
   - BEFORE: preferring to run — where it can reach speeds exceeding 30 km/h — over terrain it knows. Flight is slower on the ground it occupies.
   - AFTER: preferring to run over terrain it knows, at speeds of up to about 30 km/h.
2. **Source:** s1, s4, s2 (trait 2 fact)
   - BEFORE: Roadrunners regularly prey on <b>rattlesnakes and other venomous snakes</b>, stunning them by holding the head and slamming the body repeatedly against a rock before consuming them headfirst.
   - AFTER: Roadrunners take <b>small rattlesnakes</b>, dodging the strikes, then stabbing at the head and beating the snake against the ground or a rock before swallowing it.
3. **Source:** s1, s4 (Perception axis read)
   - BEFORE: It is perceptive enough to strike venomous prey reliably, but
   - AFTER: It is perceptive enough to take small rattlesnakes, but
4. **Source:** s1, s2 (trait 3 fact)
   - BEFORE: to raise their body temperature before activity — a behavioral thermoregulation that costs no calories.
   - AFTER: to raise their body temperature before activity, a way of warming up that saves energy.
5. **Source:** s1 (trait 4 fact (involuntary: unverifiable))
   - BEFORE: <b>rises automatically when the bird is alarmed, excited, or aroused</b> — an involuntary signal that announces its internal state before the bird has decided to communicate.
   - AFTER: <b>rises when the bird is threatened or displaying to a rival</b>, often with a patch of bare orange skin showing behind the eye.
6. **Source:** s1 (trait 4 title)
   - BEFORE: The involuntary crest
   - AFTER: The raised crest
7. **Source:** s1 (bonds row "What they may misunderstand")
   - BEFORE: The crest rises involuntarily when alarmed.
   - AFTER: The crest rises when the bird is threatened.
8. **Source:** s1, s2 (trait 6 fact)
   - BEFORE: of up to one square mile in arid scrubland and desert, announced by a distinctive low cooing call and scent marking, and defended
   - AFTER: up to about half a mile across in arid scrubland and desert, announced by a low cooing call from a perch, and defended
9. **Source:** s1, s2 (Rootedness axis read)
   - BEFORE: Roadrunners hold territories of up to a square mile in the same arid scrubland year-round.
   - AFTER: Roadrunners hold territories up to about half a mile across in the same arid scrubland year-round.
10. **Source:** s1 (reading built on the wrong area figure) (Mirror awakened paragraph)
   - BEFORE: It is scouting one adjacent square mile while still running the one you know.
   - AFTER: It is scouting one adjacent stretch of ground while still running the one you know.
11. **Source:** s1 (reading built on the wrong area figure) (Growth long-game paragraph)
   - BEFORE: The territory that began as one square mile becomes two
   - AFTER: The territory that began as one stretch of scrub becomes two

## ribbon-seal

1. **Source:** s14 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">紋</span>
   - AFTER: <span class="rail__han" aria-hidden="true">帶紋海豹</span>
2. **Source:** s14 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="紋" aria-label="Hear 紋, wén"
   - AFTER: data-say="帶紋海豹" aria-label="Hear 帶紋海豹, dàiwén hǎibào"
3. **Source:** s14 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">wén<
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">dàiwén hǎibào<
4. **Source:** s14 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">紋</span>
   - AFTER: <span class="serial-han">帶紋海豹</span>
5. **Source:** s14 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">紋</span><span class="py" lang="zh-Latn-pinyin">wén</span>
   - AFTER: <span class="h" lang="zh">帶紋海豹</span><span class="py" lang="zh-Latn-pinyin">dàiwén hǎibào</span>
6. **Source:** s14 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "紋"
   - AFTER: "animalHan": "帶紋海豹"
7. **Source:** s14 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "wén"
   - AFTER: "animalHanPy": "dàiwén hǎibào"
8. **Source:** s6, s7, s8 (trait 1 fact (pup colour; band placement))
   - BEFORE: <b>Adult male Ribbon Seals carry four bold white bands</b> — around the neck, around each flipper insertion, and across the torso — against a dark chocolate-brown body. No other pinniped has this banding. Females share the pattern in muted form. Pups are born grey and develop it over years.
   - AFTER: <b>Adult male Ribbon Seals carry four bold white bands</b>: one around the neck, one around each front flipper, and one around the hips, set against a dark chocolate-brown body. No other pinniped has this banding. Females share the pattern in muted form. Pups are born in a white woolly coat, shed it after three to five weeks for plain blue-black and silver, and grow the bands over about three years.
9. **Source:** s6, s9 (trait 2 fact (soften))
   - BEFORE: spending the non-breeding season entirely at open sea. It is one of the most ocean-associated seals in its range, rarely hauling out outside of the breeding and pupping season.
   - AFTER: spending much of the non-breeding season at open sea. It is one of the most ocean-associated seals in its range, using the pack ice mainly to pup, nurse and moult.
10. **Source:** s6, s7, s8 (trait 3 title)
   - BEFORE: Avoidance of contact
   - AFTER: Unwary on the ice
11. **Source:** s6, s7, s8 (trait 3 fact)
   - BEFORE: The Ribbon Seal <b>actively avoids human approach</b> and is among the most difficult pinniped species to observe or study in the wild. It typically submerges rather than investigates when researchers approach.
   - AFTER: Hauled out on the ice, the Ribbon Seal is <b>relatively unwary</b>, and people in boats can often get close before it moves. It is hard to study because it lives far offshore, out where few observers ever reach.
12. **Source:** s6, s7, s8 (page_bugs: reading built on the wrong fact, banned shape) (trait 3 reading)
   - BEFORE: You are not difficult to find. You are difficult to approach. These are not the same thing. <em>People sometimes mistake your avoidance of contact for absence of interest — the animal that submerges is still watching.</em>
   - AFTER: Most people never travel far enough out to meet you. The few who do find you calm and easy to sit beside. <em>Distance is where you live, and the welcome is waiting at the end of it.</em>
13. **Source:** s8, s7, s6 (trait 4 fact)
   - BEFORE: <b>approximately four weeks on sea ice</b>
   - AFTER: <b>about three to four weeks on sea ice</b>
14. **Source:** page_bugs (banned "not X, it is Y" shape) (trait 4 reading)
   - BEFORE: <em>This is not coldness — it is how you ensure that what you give holds.</em>
   - AFTER: <em>Stepping back on time is how you make sure what you gave holds.</em>
15. **Source:** s9, s8 (trait 5 title)
   - BEFORE: Among the least studied
   - AFTER: Poorly known
16. **Source:** s9, s8 (trait 5 fact (reword))
   - BEFORE: The Ribbon Seal is <b>one of the least-studied pinnipeds in its range</b>, with behavioral data remaining sparse compared to other North Pacific seals.
   - AFTER: The Ribbon Seal is <b>a poorly known species</b>, with relatively little on record about its numbers, movements and diet.
17. **Source:** s7, s6 (trait 6 title)
   - BEFORE: Ice-dependent, climate vulnerable
   - AFTER: Bound to the ice
18. **Source:** s7, s6 (trait 6 fact (soften; add Okhotsk))
   - BEFORE: Listed as Least Concern by the IUCN, the Ribbon Seal is nonetheless considered <b>highly vulnerable to sea ice loss</b> in the Bering Sea from climate change, as it depends on stable ice platforms for pupping and moulting.
   - AFTER: Listed as Least Concern by the IUCN, the Ribbon Seal <b>depends on sea ice</b> in the Bering Sea and the Sea of Okhotsk for pupping and moulting, and a 2013 NOAA review expects that ice to shrink as the climate warms.
19. **Source:** s6, s7, s8 (Stillness axis read)
   - BEFORE: surfacing rarely and approaching nothing. When approached by researchers, it typically submerges rather than investigates. This is not fear — it is a preference so deep it has become architecture.
   - AFTER: hauling out rarely and seeking out nothing. Even on the ice it lies quiet and unbothered, letting boats drift close before it stirs.
20. **Source:** s6, s7, s8 (Perception axis read)
   - BEFORE: An animal that avoids contact must read its environment with unusual accuracy — the decision to surface or submerge happens before the threat becomes clear.
   - AFTER: An animal that spends months alone in open water has to read its surroundings with no crowd to copy.
21. **Source:** s6, s7, s8 (Openness axis read)
   - BEFORE: The Ribbon Seal is among the most difficult pinnipeds to approach in the wild. It does not investigate. It withdraws. This is not a failure of openness — it is a high standard for what earns entry.
   - AFTER: The Ribbon Seal lets boats come close on the ice, yet spends most of its life where almost no one can follow. Its openness is real and rarely tested.
22. **Source:** s6, s7, s8 (creature frame)
   - BEFORE: its consistent avoidance of contact
   - AFTER: its calm on the ice
23. **Source:** s6, s7 (creature lead (Okhotsk; moult))
   - BEFORE: returning to Bering Sea ice each spring only long enough to pup before slipping back into dark water.
   - AFTER: returning to the pack ice of the Bering and Okhotsk seas each spring to pup and moult before slipping back into dark water.

## moose

1. **Source:** s19 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">鹿</span>
   - AFTER: <span class="rail__han" aria-hidden="true">駝鹿</span>
2. **Source:** s19 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="鹿" aria-label="Hear 鹿, lù"
   - AFTER: data-say="駝鹿" aria-label="Hear 駝鹿, tuólù"
3. **Source:** s19 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">lù<
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">tuólù<
4. **Source:** s19 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">鹿</span>
   - AFTER: <span class="serial-han">駝鹿</span>
5. **Source:** s19 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">鹿</span><span class="py" lang="zh-Latn-pinyin">lù</span>
   - AFTER: <span class="h" lang="zh">駝鹿</span><span class="py" lang="zh-Latn-pinyin">tuólù</span>
6. **Source:** s19 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "鹿"
   - AFTER: "animalHan": "駝鹿"
7. **Source:** s19 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "lù"
   - AFTER: "animalHanPy": "tuólù"
8. **Source:** s7, s8, s14 (trait 1 fact (sourced growth figure))
   - BEFORE: with growth documented at up to roughly 2 centimeters a day
   - AFTER: with growth documented at up to about 2.5 centimeters (an inch) a day
9. **Source:** s6, s11 (trait 3 fact (understated))
   - BEFORE: one of the few deer species known to feed this way.
   - AFTER: the only deer known to feed underwater.
10. **Source:** s13, s6 (trait 4 fact (snow depth))
   - BEFORE: Long legs and a tall shoulder height, among the greatest of any deer, let Moose wade through <b>snow up to roughly a meter deep and lake water well past their belly</b> that would stop most other deer species outright.
   - AFTER: Long legs and the tallest shoulder height of any deer carry Moose through <b>snow up to about 70 centimeters deep before it starts to slow them</b>, and let them wade deep into lakes for food.
11. **Source:** s11, s10 (trait 5 fact)
   - BEFORE: with large ears that <b>rotate independently to track sound from any direction</b>.
   - AFTER: with large ears that <b>each move independently</b> to track sound.
12. **Source:** s10 (Perception axis read)
   - BEFORE: its ears turn independently through most of a full circle
   - AFTER: its ears turn independently of each other
13. **Source:** s6, s10, s14 (trait 6 fact (soften))
   - BEFORE: outside of the mother-calf bond and the rut, holding wide individual ranges through most of the year.
   - AFTER: outside of the mother-calf bond and the rut, though several may gather near water or share a winter yard when food runs short.
14. **Source:** s6 (page_bugs) (creature frame)
   - BEFORE: forages alone by scent more than sight
   - AFTER: noses out food buried under snow
15. **Source:** s20 (Purple Star vault star read (own reading; 命宮 pinyin)) (HTML and template v2 only; not present in template v1)
   - BEFORE: Purple Star tends to seat the vault star close to the Life palace, 命宮, for a Taurus born in the Horse year, the star classical texts call
   - AFTER: Our reading seats the vault star close to the Life palace, 命宮 (mìnggōng), for a Taurus born in the Horse year: the star classical texts call
16. **Source:** s20 (Purple Star breaker star read (own reading)) (HTML and template v2 only; not present in template v1)
   - BEFORE: Close by, Purple Star tends to place the breaker star,
   - AFTER: Close by, our reading places the breaker star,
17. **Source:** s20 (Purple Star lead (own reading)) (HTML and template v2 only; not present in template v1)
   - BEFORE: and read for the Taurus Horse crossing it keeps landing on the same two.
   - AFTER: and our own reading for the Taurus Horse crossing lands on these two.
18. **Source:** s20 (Purple Star kicker (template now matches the live page)) (JSON only)
   - BEFORE: "What Purple Star already suspects about you"
   - AFTER: "Our Purple Star reading for this crossing"

## loggerhead-shrike

1. **Source:** s13, s14, s12 (trait 1 fact (soften))
   - BEFORE: which it uses to strike the back of a prey animal's neck and sever the spinal cord.
   - AFTER: which are thought to slip between the neck vertebrae of prey and cut the spinal cord. Shrikes also kill by shaking prey hard.
2. **Source:** s16, s11 (trait 3 fact (unverifiable details))
   - BEFORE: A well-stocked larder has been linked to greater breeding success in shrikes; in the closely related Southern Grey Shrike, females paired with better-provisioned males laid <b>more eggs and raised more young</b> than those paired with males storing less.
   - AFTER: A well-stocked larder has been linked to breeding success in shrikes. In a study of a desert population of grey shrikes, the size of a male's larder <b>shaped which males females chose and how well the pairs bred</b> (Yosef and Pinshow 1989).
3. **Source:** s12 (trait 5 fact (soften "single"))
   - BEFORE: hunts by day from a single exposed perch, a fence post
   - AFTER: hunts by day from an exposed perch, a fence post
4. **Source:** s12 (Stillness axis read)
   - BEFORE: hunts from a single exposed perch,
   - AFTER: hunts from an exposed perch,
5. **Source:** s15, s11, s13 (trait 6 fact (lubber grasshoppers, 1 to 2 days))
   - BEFORE: Loggerhead Shrikes have been observed impaling toxic prey, including monarch butterflies and toads whose skin secretes irritating compounds, and leaving them on the thorn for <b>up to several days</b> before returning to eat them, by which time the toxins have broken down.
   - AFTER: In Florida, Loggerhead Shrikes impale toxic eastern lubber grasshoppers and leave them on the thorn, and the birds could eat them once the grasshoppers had aged <b>1 to 2 days</b> (Yosef and Whitman 1992).
6. **Source:** s18 (Purple Star Seven Killings read (cut the frequency claim; own reading)) (HTML and template v2 only; not present in template v1)
   - BEFORE: Purple Star gives the confrontation stars to people who do not flinch when the moment finally arrives, and the Aries Snake crossing draws Seven Killings more often than chance would allow.
   - AFTER: In our reading, the confrontation stars suit people who do not flinch when the moment finally arrives, and we give the Aries Snake crossing Seven Killings (七殺 qīshā).
7. **Source:** s18 (Purple Star close (own reading)) (HTML and template v2 only; not present in template v1)
   - BEFORE: That is the outline the Aries Snake crossing tends to share.
   - AFTER: That is the outline we read for the Aries Snake crossing.
8. **Source:** s18 (Purple Star lead (own reading)) (HTML and template v2 only; not present in template v1)
   - BEFORE: and read for the Aries Snake crossing it keeps landing on the same two.
   - AFTER: and our own reading for the Aries Snake crossing lands on these two.
9. **Source:** s18 (Purple Star kicker (template now matches the live page)) (JSON only)
   - BEFORE: "What Purple Star already suspects about you"
   - AFTER: "Our Purple Star reading for this crossing"

## kissing-gourami

1. **Source:** g8 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">吻</span>
   - AFTER: <span class="rail__han" aria-hidden="true">接吻魚</span>
2. **Source:** g8 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="吻" aria-label="Hear 吻, wěn"
   - AFTER: data-say="接吻魚" aria-label="Hear 接吻魚, jiēwěnyú"
3. **Source:** g8 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">wěn<
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">jiēwěnyú<
4. **Source:** g8 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">吻</span>
   - AFTER: <span class="serial-han">接吻魚</span>
5. **Source:** g8 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">吻</span><span class="py" lang="zh-Latn-pinyin">wěn</span>
   - AFTER: <span class="h" lang="zh">接吻魚</span><span class="py" lang="zh-Latn-pinyin">jiēwěnyú</span>
6. **Source:** g8 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "吻"
   - AFTER: "animalHan": "接吻魚"
7. **Source:** g8 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "wěn"
   - AFTER: "animalHanPy": "jiēwěnyú"
8. **Source:** audit item 7 (no source) (hero tagline)
   - BEFORE: The fish that settles every question mouth to mouth, and never once breaks the skin.
   - AFTER: The fish that settles every question mouth to mouth.
9. **Source:** g6, g7 (hero lead)
   - BEFORE: known for a forceful, prolonged mouth-to-mouth press between rivals
   - AFTER: known for a brief, forceful mouth-to-mouth press between rivals
10. **Source:** g6, g7 (trait 1 fact (soften))
   - BEFORE: in a <b>prolonged, forceful lock</b>, most often between rivals of the same sex; this is widely understood as a ritualized test of strength rather than an affectionate gesture.
   - AFTER: in a <b>brief, forceful lock</b> lasting a few seconds; it turns up during feeding, courtship and fights, and is most often explained as ritualized aggression rather than an affectionate gesture.
11. **Source:** g6, g7 (trait 4 title)
   - BEFORE: A migration toward open water
   - AFTER: A migration to the shallows
12. **Source:** g6, g7 (trait 4 fact (drop the gloss))
   - BEFORE: <b>migrate from slower water into shallow, flooded rivers and lakes to spawn</b>, moving toward open, exposed conditions rather than staying in familiar cover.
   - AFTER: <b>move through rivers into shallow lakes, lagoons and flooded forest to spawn</b>.
13. **Source:** g6, g7 (reading built on the dropped gloss) (trait 4 reading)
   - BEFORE: You move toward the exposed, direct version of a relationship when it matters most, instead of staying in the comfortable water where nothing gets confirmed.
   - AFTER: When it matters most, you head for the shallows where things get settled, instead of staying in the comfortable water where nothing gets confirmed.
## Not applied

- roadrunner: the Adaptability axis still lists "rattlesnakes, scorpions, lizards, small birds, and insects" without "small"; the prey list is broadly right and was left. Bonds line "the roadrunner does not flinch at rattlesnakes" and the element line "knows where every rattlesnake lives" are imagery; left. The trait 4 reading ("something in you that announces itself before you authorize it to") is reading copy and was left after the fact lost "involuntary". The Pueblo X-track lore (s4, s5) suggested for the proverb tie was not added (an addition, not a correction). The many em dashes in untouched copy remain; replaced lines lost theirs.
- ribbon-seal: Mirror gate line "This is not avoidance. The ribbon seal returns, every spring, to the same ice" and the stones line about "unannounced withdrawal" are reading copy, not fact lines; left (the first still uses the "not X" shape; flag for a style pass). Subtitle "one of the least seen" left (ADF&G: rarely seen). The 2005 tagging "first live capture" detail from s9 was not added because its scope (worldwide or Russian waters) is unclear in the dossier.
- moose: "water past the belly" claim dropped rather than kept (plausible, unsourced). Axis line "its nose finds a browse line under a foot of snow" left (smell for food under snow is sourced in s6; the depth is imagery). Purple Star star readings after the first sentence ("the star classical texts call the keeper", "the one classical texts describe as tearing down") describe the stars' own classical character, not a pairing, and were left. The fine print already says the pairing is our own. Template v1 has no Purple Star block.
- loggerhead-shrike: trait 3 now rests only on what the Yosef and Pinshow 1989 title confirms (cache size shaped mate choice and breeding success); the dossier asks a human to check the PDF before any egg or chick numbers or a species name go back in. Stillness axis "the strike itself lasts under a second" is unsourced but was not flagged by the audit; left. Wu Qu read ("the star Purple Star gives to soldiers, surgeons...") describes the star's classical character, not a crossing pairing; left. Header 鵙 jú names shrikes in general (audit OK); no species name added, per the dossier. The Canada decline note (s12, s17) was not added.
- kissing-gourami: Mirror line about pressing "into a rival's mouth, close, forceful, and over quickly" already fits the brief-lock fact; left. Trait 1 reading left.
- No `<!--w4-reading-->` block on any of the five pages. Related Animals explore-card labels not touched.

## Structure check

Section counts match backups (roadrunner 31/31, ribbon-seal 31/31, moose 33/33, loggerhead-shrike 33/33, kissing-gourami 31/31). All JSON-LD and application/json blocks parse (4 per page). HTML start-tag skeleton identical to backup on all five. Every edited page parses with python html.parser. Template JSON (v2 for all five, v1 for moose and loggerhead-shrike) loads and keysets are unchanged. No CSS, JS or other page touched. No git run. No old header glyph (紋, 鹿, 吻 alone) remains in a header slot, and none of these strings remains in any edited file: "square mile", "involuntar", "monarch", "Southern Grey", "never once breaks", "avoids human", "least-studied", "Purple Star tends", "more often than chance", "a meter deep". New text was checked for em dashes, en dashes, arrows and the banned word list; every new hanzi carries pinyin (命宮 mìnggōng, 七殺 qīshā, header glyphs).

## Final header characters

| Page | Header hanzi | Pinyin |
|---|---|---|
| roadrunner | 走鵑 (unchanged) | zǒujuān |
| ribbon-seal | 帶紋海豹 | dàiwén hǎibào |
| moose | 駝鹿 | tuólù |
| loggerhead-shrike | 鵙 (unchanged) | jú |
| kissing-gourami | 接吻魚 | jiēwěnyú |
