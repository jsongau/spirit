# Fact-fix round 2, wave B: change log

Date: 2026-11-08. Pages: snow-leopard, sand-cat, bearded-vulture, maned-wolf, whale-shark.

Source of truth: each animal's `data/research/<slug>.json` `fact_audit` list. WRONG and UNVERIFIABLE entries were applied, plus OK entries whose note asks for a softening. Source ids below are the dossier's own `sources` ids.

Each change went to the live page `site/animals/<slug>/index.html` and to the template data file listed. Backups of the original pages: `~/factfix-backup-r2/<slug>.html` (outside the repo). Template JSON was rewritten with json load/dump, indent=2, ensure_ascii=False.

Skipped by instruction: Primal Zodiac wording, FAQ markup, Purple Star star pairings, the January/February lunar notes, the Bond Test glyph, Zi Wei Dou Shu 'oldest' wording.

## Snow Leopard (`snow-leopard`)

Template file: `zodi-animal-template-v2/data/animals/snow-leopard.json`

1. Hanzi 豹 to 雪豹 (rail) (page only; page hits 1, template hits 0)
   - BEFORE: <span class="rail__han" aria-hidden="true">豹</span>
   - AFTER: <span class="rail__han" aria-hidden="true">雪豹</span>
   - Source: s17

2. Hanzi 豹 to 雪豹 (keepsake) (page only; page hits 1, template hits 0)
   - BEFORE: <span class="serial-han">豹</span>
   - AFTER: <span class="serial-han">雪豹</span>
   - Source: s17

3. Hanzi 豹 to 雪豹 (animalHan) (template only; page hits 0, template hits 1)
   - BEFORE: 豹
   - AFTER: 雪豹
   - Source: s17

4. Camera traps / field of view (trait 01) (page and template; page hits 1, template hits 1)
   - BEFORE: Camera trap studies in known snow leopard territory consistently yield far fewer images than population density models would predict. Researchers have described finding fresh tracks in areas where camera traps showed no activity — the animal moved <b>above the camera's field of view</b>, or during the brief intervals between shots.
   - AFTER: Snow leopards are hard to count, even for the teams who study them. A camera-trap study led by Örjan Johansson found that these surveys can <b>overestimate snow leopard numbers by about 35 percent</b>, because one cat is easily counted as two.
   - Source: s12

5. Camera traps / field of view (gate read) (page and template; page hits 1, template hits 1)
   - BEFORE: Snow leopard presence in a research zone is confirmed not by sightings but by tracks. Camera traps set at standard elevations return empty; weeks later, footprints appear on ridges above the original sightings. The animal was there. It was simply higher than the camera could reach, and it had not moved in a way that announced itself.
   - AFTER: Snow leopard presence in a research zone is confirmed more often by tracks than by sightings. The animal was there. It had not moved in a way that announced itself.
   - Source: s12, s6

6. Camera traps / field of view (proverb soul) (page and template; page hits 1, template hits 1)
   - BEFORE: verified by tracks and camera images taken at ridges no researcher thought to check.
   - AFTER: verified by tracks and camera images, and rarely by sight.
   - Source: s12

7. Cannot roar: anatomy refinement (page and template; page hits 1, template hits 1)
   - BEFORE: Snow leopards cannot roar — they lack the anatomical structure required.
   - AFTER: Snow leopards cannot roar. Their vocal folds are only about 9 millimeters long, too short to make one.
   - Source: s6

8. Shared kills (trait 05 name, page) (page only; page hits 1, template hits 0)
   - BEFORE: reveal d1">Shared kills</h3>
   - AFTER: reveal d1">Shared hunts</h3>
   - Source: s6, s11

9. Shared kills (trait 05 name, template) (template only; page hits 0, template hits 1)
   - BEFORE: Shared kills
   - AFTER: Shared hunts
   - Source: s6, s11

10. Shared kills (trait 05 fact) (page and template; page hits 1, template hits 1)
   - BEFORE: Snow leopards have been <b>documented sharing kills with mates</b> — a behavior highly unusual in solitary large cats, which typically defend food resources from all other individuals including reproductive partners. The documentation of this behavior required extended camera trap observation in territories of known breeding pairs.
   - AFTER: Snow leopards live alone, yet <b>mating pairs have been recorded hunting together</b>. A pair may travel together for one to eight days. Some pairs do not hunt at all in that time.
   - Source: s6, s11

11. Shared kills (trait 05 reading) (page and template; page hits 1, template hits 1)
   - BEFORE: The decision to share the kill is not made lightly.
   - AFTER: The decision to share the hunt is not made lightly.
   - Source: s6, s11

12. Shared kills (overview frame) (page and template; page hits 1, template hits 1)
   - BEFORE: The kills shared with mates in behavior unusual for any solitary large cat.
   - AFTER: The hunts shared with a mate by a cat that otherwise lives alone.
   - Source: s6, s11

13. Shared kills (Mirror gate 03) (page and template; page hits 1, template hits 1)
   - BEFORE: Snow leopards have been documented sharing kills with mates — behavior unusual for solitary large cats, which typically guard food resources from all others.
   - AFTER: Snow leopards live alone, yet mating pairs have been recorded hunting together.
   - Source: s6, s11

14. Shared kills (integration reading) (page and template; page hits 1, template hits 1)
   - BEFORE: The shared kill that says: I did not need to keep this.
   - AFTER: The shared hunt that says: I did not need to do this alone.
   - Source: s6, s11

15. Only large predator at this altitude (trait 06) (page and template; page hits 1, template hits 1)
   - BEFORE: Panthera uncia has been <b>confirmed at elevations above 5,500 meters</b>, making it the only large cat to successfully occupy the high-altitude terrain of the Himalayas and Central Asian ranges. No other large predator consistently occupies this zone.
   - AFTER: Panthera uncia has been <b>recorded as high as 6,000 meters</b> in summer, and its core range sits between 3,000 and 4,500 meters. It does not hold that height alone. Himalayan wolves share about three-quarters of its prey in the same high valleys. Common leopards are moving into its range too.
   - Source: s6, s14

16. Moonlight activity (moon rhythm) (page and template; page hits 1, template hits 1)
   - BEFORE: The snow leopard is most active at dawn and dusk, and research suggests increased activity on nights with less moonlight — when the terrain is darker and the cat's advantage over prey is greatest.
   - AFTER: The snow leopard is most active at dawn and dusk.
   - Source: s6

17. Proverb: add Daodejing attribution (page and template; page hits 1, template hits 1)
   - BEFORE: The pairing is our own reading, not tradition.
   - AFTER: The line comes from the Daodejing, chapter 41. The pairing is our own reading, not tradition.
   - Source: s18

18. Ref: Johansson 2016 PLOS ONE (human chromosome DOI) (page and template; page hits 1, template hits 1)
   - BEFORE: https://doi.org/10.1371/journal.pone.0151963
   - AFTER: https://snowleopard.org/the-secret-love-lives-of-wild-snow-leopards/
   - Source: s16 to s11

19. Ref label: Johansson 2016 (page and template; page hits 1, template hits 1)
   - BEFORE: Johansson, O. et al. (2016) — Densities and social dynamics of snow leopards in the Mongolian Mountains, PLOS ONE
   - AFTER: Snow Leopard Trust (2026), The Secret Love Lives of Wild Snow Leopards, interviews with Johansson and Samelius
   - Source: s11

20. Ref: Janecka 2008 (Amur leopard) (page and template; page hits 1, template hits 1)
   - BEFORE: https://doi.org/10.1111/j.1365-294X.2008.03710.x
   - AFTER: https://news.mongabay.com/2026/06/how-snow-leopards-wolves-and-leopards-share-the-same-himalayan-valley-study/
   - Source: s14

21. Ref label: Janecka 2008 (page and template; page hits 1, template hits 1)
   - BEFORE: Janecka, J.E. et al. (2008) — Molecular and genomic tools identify the ghost of Amur leopards in the Russian Far East, Molecular Ecology
   - AFTER: Mongabay (2026), How snow leopards, wolves and leopards share the same Himalayan valley
   - Source: s14

22. Ref: Johansson 2018 (cuckoo DOI) (page and template; page hits 1, template hits 1)
   - BEFORE: https://doi.org/10.1016/j.anbehav.2018.10.008
   - AFTER: https://snowleopard.org/are-camera-trap-studies-overestimating-populations/
   - Source: s15 to s12

23. Ref label: Johansson 2018 (page and template; page hits 1, template hits 1)
   - BEFORE: Johansson, O. et al. (2018) — Behavioral responses of snow leopards to camera traps, Animal Behaviour
   - AFTER: Snow Leopard Trust, Camera trap studies may systematically overestimate populations of elusive animals (on Johansson et al. 2020, Scientific Reports)
   - Source: s12

24. Shared kills (overture title) (page and template; page hits 1, template hits 1)
   - BEFORE: A predator that does not roar, shares kills with its mate, and
   - AFTER: A predator that does not roar, hunts with its mate, and
   - Source: s6, s11

## Sand Cat (`sand-cat`)

Template file: `zodi-animal-template-v2/data/animals/sand-cat.json`

1. Desert's smallest cat (overture title / subtitle) (page and template; page hits 1, template hits 1)
   - BEFORE: The desert's smallest cat, built to need almost nothing
   - AFTER: The only cat that lives only in deserts, built to need almost nothing
   - Source: nzoo, adw, wiki-bfcat

2. Hearing and smell, not sight (softening) (page and template; page hits 1, template hits 1)
   - BEFORE: Hearing and smell are its sharpest senses, not sight.
   - AFTER: Hearing and smell lead its senses.
   - Source: adw, wiki-sandcat

3. Timing the strike (embellishment in Animal fact) (page and template; page hits 1, template hits 1)
   - BEFORE: <b>takes snakes as well, including venomous vipers</b>, timing the strike so the danger never lands.
   - AFTER: <b>takes snakes as well, including venomous vipers</b>.
   - Source: adw, wiki-sandcat

## Bearded Vulture (`bearded-vulture`)

Template file: `zodi-animal-template-v1/data/animals/bearded-vulture.json (no v2 file exists)`

1. Born bone-white (overture title / subtitle) (page and template; page hits 1, template hits 1)
   - BEFORE: Born bone-white, and rust by its own choosing.
   - AFTER: Born dark, grows pale, and turns rust by its own choosing.
   - Source: s1, s2

2. Range + albatross wingspan (overture lead) (page and template; page hits 1, template hits 1)
   - BEFORE: A vulture of Eurasia's and East Africa's highest mountains, gliding on a wingspan built more like an albatross's than a typical raptor's,
   - AFTER: A vulture of the mountains of Europe, Asia and Africa, gliding on long, narrow wings that span nearly three metres,
   - Source: s1, s2

3. Albatross wingspan (gate read) (page and template; page hits 1, template hits 1)
   - BEFORE: gliding along ridgetops on a wingspan built more like an albatross's than a typical raptor's.
   - AFTER: gliding along ridgetops on long, narrow wings that span nearly three metres.
   - Source: s1, s2

4. Breeding ages are captive figures (trait 05) (page and template; page hits 1, template hits 1)
   - BEFORE: reach breeding age slowly, at an average of <b>8.9 years old for males and 7.7 for females</b>, and
   - AFTER: reach breeding age slowly, <b>first breeding at about eight years old in the wild</b>, and
   - Source: s3, s2

5. Same rocky ossuary for years (habitat) (page and template; page hits 1, template hits 1)
   - BEFORE: and returns to the same rocky ossuary for years to break down what it carries.
   - AFTER: and nests on cliff ledges that can stay in use for centuries, across many generations.
   - Source: s1

6. Almost exclusively (softening) (page and template; page hits 1, template hits 1)
   - BEFORE: an adult that eats bone and marrow almost exclusively,
   - AFTER: an adult that eats mostly bone and marrow,
   - Source: s1, s2

7. Proverb tied to Dragon trait (reword to Capricorn) (page only; page hits 1, template hits 0)
   - BEFORE: A proverb we tie to the <a href="/chinese-zodiac/dragon/">Year of the Dragon</a>'s reputation for turning slow, total effort into something exact.
   - AFTER: A proverb we tie to Capricorn's Saturn patience, set beside your <a href="/chinese-zodiac/dragon/">Year of the Dragon</a>.
   - Source: s5, s8, s13, s14

8. Proverb tied to Dragon trait (template) (template only; page hits 0, template hits 1)
   - BEFORE: A proverb we tie to the Year of the Dragon's reputation for turning slow, total effort into something exact.
   - AFTER: A proverb we tie to Capricorn's Saturn patience, set beside your Year of the Dragon.
   - Source: s5, s8, s13, s14

9. Stretch list: Marbled Polecat (trine) to Giant Otter (Dog clash) (page only; page hits 1, template hits 0)
   - BEFORE: <a class="explore-card" href="/animals/superb-lyrebird/"><span class="nm">Superb Lyrebird</span><span class="sub">Gemini · Year of the Dragon</span></a>     <a class="explore-card" href="/animals/marbled-polecat/"><span class="nm">Marbled Polecat</span><span class="sub">Capricorn · Year of the Rat</span></a>
   - AFTER: <a class="explore-card" href="/animals/superb-lyrebird/"><span class="nm">Superb Lyrebird</span><span class="sub">Gemini · Year of the Dragon</span></a>     <a class="explore-card" href="/animals/giant-otter/"><span class="nm">Giant Otter</span><span class="sub">Aries · Year of the Dog</span></a>
   - Source: s6, s16

10. Stretch list card in template ('The temperaments that stretch yours' cluster only; the 'Same sky, other years' Marbled Polecat card is correct and was kept)
   - BEFORE: {name: Marbled Polecat, sub: Capricorn · Year of the Rat, href: /animals/marbled-polecat/}
   - AFTER: {name: Giant Otter, sub: Aries · Year of the Dog, href: /animals/giant-otter/}
   - Source: s6, s16 (GRID Aries x Dog = Giant Otter, giant-otter; dossier hard_matches)

## Maned Wolf (`maned-wolf`)

Template file: `zodi-animal-template-v2/data/animals/maned-wolf.json`

1. Hanzi 狼 to 鬃狼 (rail) (page only; page hits 1, template hits 0)
   - BEFORE: <span class="rail__han" aria-hidden="true">狼</span>
   - AFTER: <span class="rail__han" aria-hidden="true">鬃狼</span>
   - Source: s8, s19

2. Hanzi 狼 to 鬃狼 (keepsake) (page only; page hits 1, template hits 0)
   - BEFORE: <span class="serial-han">狼</span>
   - AFTER: <span class="serial-han">鬃狼</span>
   - Source: s8, s19

3. Hanzi 狼 to 鬃狼 (animalHan) (template only; page hits 0, template hits 1)
   - BEFORE: 狼
   - AFTER: 鬃狼
   - Source: s8, s19

4. Longest legs of any canid (trait 01 name, page) (page only; page hits 1, template hits 0)
   - BEFORE: reveal d1">The Longest Legs</h3>
   - AFTER: reveal d1">The Long Legs</h3>
   - Source: s2, s3

5. Longest legs of any canid (trait 01 name, template) (template only; page hits 0, template hits 1)
   - BEFORE: The Longest Legs
   - AFTER: The Long Legs
   - Source: s2, s3

6. Longest legs of any canid (trait 01 fact) (page and template; page hits 1, template hits 1)
   - BEFORE: The maned wolf has <b>the longest legs relative to body size of any canid</b> — an adaptation for visibility over the tall cerrado grass, not for pursuit speed.
   - AFTER: The maned wolf has <b>exceptionally long legs</b> and is the tallest of the wild canids. The legs may help it see over the tall cerrado grass.
   - Source: s2, s3

7. Longest legs / not for speed (overview frame) (page and template; page hits 1, template hits 1)
   - BEFORE: The long legs are not for speed; they are for visibility over tall grass.
   - AFTER: The long legs may help it see over tall grass.
   - Source: s2, s3

8. No broader canid group (trait 03) (page and template; page hits 1, template hits 1)
   - BEFORE: <b>sole living species in the genus Chrysocyon</b>, belonging to no broader canid group within its subfamily.
   - AFTER: <b>sole living species in the genus Chrysocyon</b>. Its nearest living kin is the bush dog.
   - Source: s1, s2

9. Lives alone / no canid group (overview lead) (page and template; page hits 1, template hits 1)
   - BEFORE: The maned wolf lives alone in the cerrado, the vast Brazilian grassland savanna, and has never belonged to any canid group that adequately contains it.
   - AFTER: The maned wolf spends most of its year walking alone through the cerrado, the vast Brazilian grassland savanna, and no other living canid shares its genus.
   - Source: s1, s2, s3

10. Strictly solitary / overlapping ranges (trait 04) (page and template; page hits 1, template hits 1)
   - BEFORE: Maned wolves are strictly solitary; adults maintain <b>overlapping home ranges of 25–30 square kilometers</b> but actively avoid contact with conspecifics outside of a brief breeding period.
   - AFTER: Mated pairs <b>share a territory of roughly 25 to 45 square kilometers</b>, yet spend most of the year walking it separately. Mates hunt, travel and rest apart, and rarely meet outside the breeding season.
   - Source: s3, s1, s4

11. Roar-bark distance and pitch (trait 05) (page and template; page hits 1, template hits 1)
   - BEFORE: is a deep, resonant <b>roar-bark</b>, audible several kilometers away — lower and more powerful than the calls of related canids.
   - AFTER: is a deep <b>roar-bark</b>, one of its only long-range calls. It uses the call to find its mate and keep other wolves away.
   - Source: s1, s6, s7

12. Roar-bark distance (overview frame) (page and template; page hits 1, template hits 1)
   - BEFORE: announces its presence with a deep roar-bark audible for kilometers.
   - AFTER: announces its presence with a deep roar-bark, one of its only long-range calls.
   - Source: s1, s6

13. Roar-bark distance (chakra bridge) (page and template; page hits 1, template hits 1)
   - BEFORE: the roar-bark that carries across kilometers, reaching something it cannot see.
   - AFTER: the roar-bark that carries far, reaching something it cannot see.
   - Source: s1, s6

14. Lobeira relies on no other disperser (trait 06) (page and template; page hits 1, template hits 1)
   - BEFORE: making them <b>key dispersal agents for plants that rely on no other animal</b> for this function.
   - AFTER: making them <b>one of the lobeira's main seed dispersers</b>.
   - Source: s5, s2

15. Air maps to Metal (label as our reading) (page and template; page hits 1, template hits 1)
   - BEFORE: Your Western sign adds a second note: Aquarius carries Air, which in Wu Xing maps to Metal.
   - AFTER: Your Western sign adds a second note. Aquarius carries Air. Wu Xing has no Air, so our own reading maps it to Metal.
   - Source: none (house convention)

16. Proverb 虎行千山 not found as traditional (label) (page and template; page hits 1, template hits 1)
   - BEFORE: The pairing is our own reading, not tradition.
   - AFTER: We could not trace this line to a traditional source. The line and the pairing are our own reading.
   - Source: s9, s10

## Whale Shark (`whale-shark`)

Template file: `zodi-animal-template-v2/data/animals/whale-shark.json`

1. Size: 12 m understates record (overview lead) (page and template; page hits 1, template hits 1)
   - BEFORE: is the largest living fish, reaching up to 12 meters in length,
   - AFTER: is the largest living fish, commonly reaching 12 meters and recorded to about 18 meters in length,
   - Source: wiki-ws

2. Filtration 3,000 L/h (trait 01) (page and template; page hits 1, template hits 1)
   - BEFORE: The whale shark processes approximately <b>3,000 liters of water per hour</b> through its gill rakers,
   - AFTER: A 6-meter whale shark feeding at the surface can push <b>about 600,000 liters of water an hour</b> through its filter pads,
   - Source: motta2010, sharksorg, wiki-ws

3. Filtration 3,000 L/h (Mirror gate 02 Capacity) (page and template; page hits 1, template hits 1)
   - BEFORE: 3,000 liters of water per hour, and the gill rakers keep what is useful
   - AFTER: About 600,000 liters of water an hour, and the filter pads keep what is useful
   - Source: motta2010, sharksorg, wiki-ws

4. Filtration 3,000 L/h (Stillness gate read) (page and template; page hits 1, template hits 1)
   - BEFORE: To process 3,000 liters of water per hour, the animal must move at the speed that allows the plankton-laden water to pass through its gill rakers with optimal efficiency.
   - AFTER: To filter about 600,000 liters of water an hour, the animal must move at a speed that lets plankton-laden water pass through its filter pads.
   - Source: motta2010, sharksorg, wiki-ws

5. Gill rakers to filter pads (Openness gate read) (page and template; page hits 1, template hits 1)
   - BEFORE: water pours in, and the gill rakers filter what stays.
   - AFTER: water pours in, and the filter pads catch what stays.
   - Source: motta2010, wiki-ws

6. Hundred million years (Distortion gate) (page and template; page hits 1, template hits 1)
   - BEFORE: the strategy that has worked for a hundred million years
   - AFTER: the strategy that has worked for over twenty million years
   - Source: wiki-ws

7. Hundred million years (proverb soul) (page and template; page hits 1, template hits 1)
   - BEFORE: the whale shark has been running for a hundred million years:
   - AFTER: the whale shark has been running for over twenty million years:
   - Source: wiki-ws

8. Lifespan 70 to 150 (overview frame) (page and template; page hits 1, template hits 1)
   - BEFORE: the estimated lifespan of 70–150 years.
   - AFTER: the estimated lifespan of 80 to 130 years.
   - Source: wiki-ws, ong2020

9. Lifespan 70 to 150 / maturity (trait 05) (page and template; page hits 1, template hits 1)
   - BEFORE: Whale sharks are estimated to live <b>70–150 years</b>, based on growth band counts in vertebrae. They reach sexual maturity at approximately 25–30 years.
   - AFTER: Whale sharks are estimated to live <b>80 to 130 years</b>. Growth bands in their vertebrae have confirmed individuals of 50. Males mature at about 25 years. Females mature later, and their age at maturity is less certain.
   - Source: wiki-ws, ong2020

10. 150-year fish line (work section) (page and template; page hits 1, template hits 1)
   - BEFORE: The 150-year fish knows things the 5-year fish cannot.
   - AFTER: The old fish knows things the young fish cannot.
   - Source: wiki-ws, ong2020

11. Chemical gradient reflex (Mirror gate 01, mark as reading) (page and template; page hits 1, template hits 1)
   - BEFORE: When the chemical gradient in the water indicates a concentration of plankton, the mouth opens. The animal does not deliberate.
   - AFTER: Whale sharks are thought to find food by smell. In our reading, when the water carries the scent of plankton, the mouth opens. The animal does not deliberate.
   - Source: wiki-ws

12. Chemical gradient (Perception gate read) (page and template; page hits 1, template hits 1)
   - BEFORE: It detects chemical gradients in the water and follows the concentration of plankton upward.
   - AFTER: It is thought to find food by smell.
   - Source: wiki-ws

## Not applied

- snow-leopard: Purple Star copy ('maps the Snow Leopard you are becoming'; 'the outline your Scorpio Goat shares'). Treated as part of the Purple Star block, left for an owner call.
- snow-leopard: prusten as a 'greeting between familiar individuals'. The note asks for a cite and the dossier has none. The wording was kept; only the anatomy clause was corrected.
- snow-leopard: the page's application/json block has no `animalHan` field. The glyph lives in the rail and keepsake spans on the page and in the template's `animalHan`; all three were changed. Same for maned-wolf.
- sand-cat: 猫 left as is (the dossier calls its 沙猫 source weak).
- maned-wolf: proverb 虎行千山. The dossier suggests replacing it with 一山不容二虎. That swap means new characters, audio, literal, meaning and reading text, so it was not done here. The note now says the line could not be traced to a traditional source. Owner call on a full swap.
- maned-wolf: the v2 template FAQ answer still says 'belongs to no existing canid group, lives alone ... the longest legs of any canid on Earth'. FAQ markup was out of scope; it is not on the live page.
- maned-wolf, whale-shark, bearded-vulture: lunar New Year notes (skipped by instruction).
- bearded-vulture: 骨 header glyph is marked OK (symbolic), left.
- whale-shark: pinyin for 鯨鯊 (separate template task). 1,900 m dive depth is marked OK, left.

## Structure checks

- `<section>` count matches the backup on all five pages (31, 32, 31, 31, 31).
- All 4 JSON-LD / application/json blocks on each page parse.
- Opening-tag sequence is identical to the backup except the intended href swaps (3 snow-leopard reference links, 1 bearded-vulture explore card).
- All five template JSON files load.
- No em dashes added in replacement text.
