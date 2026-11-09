# FACTFIX-R4-B change log

Date: 2026-11-08. Pages: orca, green-sea-turtle, giant-manta-ray, beluga, bar-headed-goose.
Source of truth: `data/research/<slug>.json` fact_audit (and page_bugs). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that exist (all five: v2 only; green-sea-turtle also has a v1 file, but it is an unfilled stub with no matching text, so nothing in it changed) unless marked HTML only or JSON only. Where a string appears more than once in a file, every copy was changed (count shown). Strings inside the page's embedded `animal-data` JSON block count as HTML copies.
Backups of the original pages: `~/factfix-backup-r4b/<slug>.html`; original template JSON in `~/factfix-backup-r4b/tpl/v2/` and `tpl/v1/` (both outside the repo).
Header glyphs use traditional forms to match the pages, per the R2/R3 precedent (虎鯨, not 虎鲸). The glyph swap covers rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy.
Source links: doi.org could not be reached from this session, so the corrected and added orca citations link to the dossier's verified ScienceDaily summaries (s8, s9) rather than to unverified DOIs.

## orca

1. **Source:** s19 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">鲸</span>
   - AFTER: <span class="rail__han" aria-hidden="true">虎鯨</span>
2. **Source:** s19 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="鲸" aria-label="Hear 鲸, jīng"
   - AFTER: data-say="虎鯨" aria-label="Hear 虎鯨, hǔjīng"
3. **Source:** s19 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">jīng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">hǔjīng</span>
4. **Source:** s19 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">鲸</span>
   - AFTER: <span class="serial-han">虎鯨</span>
5. **Source:** s19 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">鲸</span><span class="py" lang="zh-Latn-pinyin">jīng</span>
   - AFTER: <span class="h" lang="zh">虎鯨</span><span class="py" lang="zh-Latn-pinyin">hǔjīng</span>
6. **Source:** s19 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "鲸"
   - AFTER: "animalHan": "虎鯨"
7. **Source:** s19 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "jīng"
   - AFTER: "animalHanPy": "hǔjīng"
8. **Source:** s8, s9
   - BEFORE: Orca females undergo menopause and can live for forty or more years after their last calf. A 2019 study in <i>Current Biology</i> found that <b>grandmother presence significantly increases grandchild survival rates</b> — specifically in years when salmon were scarce. The mechanism is knowledge: the grandmother knows where food was during previous scarcities.
   - AFTER: Orca females undergo menopause and can live for decades after their last calf. A 2019 study in <i>PNAS</i> found that <b>grandmother presence significantly increases grandchild survival rates</b>, most of all in years when salmon were scarce. Researchers think knowledge is part of the reason: the grandmother knows where food was during previous scarcities.
9. **Source:** s8, s9
   - BEFORE: The female orca's post-reproductive lifespan — forty or more years after her last calf — exists, researchers now believe, specifically to carry that map for longer.
   - AFTER: The female orca's post-reproductive lifespan, which can run for decades after her last calf, may exist, some researchers think, partly to carry that map for longer.
10. **Source:** s8, s9
   - BEFORE: The grandmother orca maps the water for forty years after her last calf.
   - AFTER: The grandmother orca maps the water for decades after her last calf.
11. **Source:** s7, s11
   - BEFORE: offshore pods take sharks and other large fish. <b>These ecotypes do not interbreed</b>, despite sharing the same water, and their behavioral differences are cultural rather than genetic.
   - AFTER: offshore pods are thought to take sharks and other large fish. <b>These ecotypes do not interbreed</b>, despite sharing the same water, and a 2024 genetic study found that residents and transients split 200,000 to 300,000 years ago and proposed naming them as separate species.
12. **Source:** s7 (offshore diet unverifiable as written)
   - BEFORE: offshore pods take sharks.
   - AFTER: offshore pods are thought to take sharks.
13. **Source:** s13, s7
   - BEFORE: guided through beaching technique over many months before the behavior is integrated.
   - AFTER: guided through beaching technique over years before the behavior is integrated.
14. **Source:** (unsourced superlative cut), s7, s14
   - BEFORE:  The orca is the only animal that has earned this position in every marine environment on Earth.
   - AFTER: (removed)
15. **Source:** s9 (source list: year and link)
   - BEFORE (HTML): <li><a href="https://doi.org/10.1016/j.cub.2019.01.015" rel="noopener">Brent, L.J.N. et al. (2019) — Ecological knowledge, leadership, and the evolution of menopause in killer whales, Current Biology</a></li>
   - AFTER (HTML): <li><a href="https://www.sciencedaily.com/releases/2015/03/150305125359.htm" rel="noopener">Brent, L.J.N. et al. (2015), Ecological knowledge, leadership, and the evolution of menopause in killer whales, Current Biology (ScienceDaily summary)</a></li>
   - BEFORE (JSON): "label": "Brent, L.J.N. et al. (2019) — Ecological knowledge, leadership, and the evolution of menopause in killer whales, Current Biology",\n        "href": "https://doi.org/10.1016/j.cub.2019.01.015"
   - AFTER (JSON): "label": "Brent, L.J.N. et al. (2015), Ecological knowledge, leadership, and the evolution of menopause in killer whales, Current Biology (ScienceDaily summary)",\n        "href": "https://www.sciencedaily.com/releases/2015/03/150305125359.htm"
16. **Source:** s15 (removed, dolphin study), s8 (added in its place) (source list)
   - BEFORE (HTML): <li><a href="https://doi.org/10.1098/rsbl.2004.0225" rel="noopener">Lusseau, D. &amp; Newman, M.E.J. (2004) — Identifying the role that animals play in their social networks, Proceedings of the Royal Society B</a></li>
   - AFTER (HTML): <li><a href="https://www.sciencedaily.com/releases/2019/12/191209161339.htm" rel="noopener">Nattrass, S. et al. (2019), Postreproductive killer whale grandmothers improve the survival of their grandoffspring, PNAS (ScienceDaily summary)</a></li>
   - BEFORE (JSON): "label": "Lusseau, D. & Newman, M.E.J. (2004) — Identifying the role that animals play in their social networks, Proceedings of the Royal Society B",\n        "href": "https://doi.org/10.1098/rsbl.2004.0225"
   - AFTER (JSON): "label": "Nattrass, S. et al. (2019), Postreproductive killer whale grandmothers improve the survival of their grandoffspring, PNAS (ScienceDaily summary)",\n        "href": "https://www.sciencedaily.com/releases/2019/12/191209161339.htm"
17. **Source:** page_bugs (moon agreement; page data uses Full Moon throughout) (HTML only)
   - BEFORE: Your window is the dark of the new moon, when the surface goes black and hunting belongs to those who navigate by sound instead of sight. The Orca is never more itself than in water no one else can read. On the lightless nights, the honest conversations land, the ones about who your pod actually is now and who it was ten years ago. Decisions made in the dark, when you cannot see the wall you built and must feel your way past it, tend to open something.
   - AFTER: Your window is the full moon, when the surface lights up and what has been moving in the deep can be seen from above. The Orca is never more itself than when the map it carries finally shows. On the bright nights, the honest conversations land, the ones about who your pod actually is now and who it was ten years ago. Decisions made in full light, when you can finally see the wall you built and walk around it, tend to open something.
18. **Source:** page_bugs (moon agreement) (HTML only)
   - BEFORE: Come back on the new moon, and bring the name of the one you finally let closer.
   - AFTER: Come back on the full moon, and bring the name of the one you finally let closer.

## green-sea-turtle

1. **Source:** t12, t13, t14 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">龜</span>
   - AFTER: <span class="rail__han" aria-hidden="true">海龜</span>
2. **Source:** t12, t13, t14 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="龜" aria-label="Hear 龜, guī"
   - AFTER: data-say="海龜" aria-label="Hear 海龜, hǎiguī"
3. **Source:** t12, t13, t14 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">guī</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">hǎiguī</span>
4. **Source:** t12, t13, t14 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">龜</span>
   - AFTER: <span class="serial-han">海龜</span>
5. **Source:** t12, t13, t14 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">龜</span><span class="py" lang="zh-Latn-pinyin">guī</span>
   - AFTER: <span class="h" lang="zh">海龜</span><span class="py" lang="zh-Latn-pinyin">hǎiguī</span>
6. **Source:** t12, t13, t14 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "龜"
   - AFTER: "animalHan": "海龜"
7. **Source:** t12, t13, t14 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "guī"
   - AFTER: "animalHanPy": "hǎiguī"
8. **Source:** t7, t8
   - BEFORE: Green turtles are believed to use <b>geomagnetic imprinting</b>, learning the unique magnetic signature of their natal beach as hatchlings, to navigate back to that same shore to nest, sometimes decades on.
   - AFTER: Green turtles often return to nest on the beach where they hatched, sometimes decades on. Studies of loggerheads suggest sea turtles find it by <b>geomagnetic imprinting</b>, learning the magnetic signature of that beach as hatchlings.
9. **Source:** t7, t8
   - BEFORE: A magnetic signature gets imprinted at birth and read again, unconsciously, years and thousands of miles later.
   - AFTER: A magnetic signature, researchers think, gets imprinted at birth and read again, unconsciously, years and thousands of miles later.
10. **Source:** t7 (source label: the study used loggerhead data)
   - BEFORE: Evidence for Geomagnetic Imprinting and Magnetic Navigation in the Natal Homing of Sea Turtles (2015)
   - AFTER: Evidence for Geomagnetic Imprinting and Magnetic Navigation in the Natal Homing of Sea Turtles (2015, loggerhead data)
11. **Source:** t5, t8 (unverifiable superlative cut)
   - BEFORE: <b>shift almost entirely to seagrass and algae as adults</b>, one of very few reptiles to make that switch.
   - AFTER: <b>shift almost entirely to seagrass and algae as adults</b>.
12. **Source:** t5, t6
   - BEFORE: often five to ten years, before returning to coastal waters to feed.
   - AFTER: often three to five years, before returning to coastal waters to feed.
13. **Source:** t9
   - BEFORE: An estimated <b>one in a thousand hatchlings</b> survives
   - AFTER: By a common estimate, roughly <b>one in a thousand hatchlings</b> survives
14. **Source:** t22 (Purple Star)
   - BEFORE: and read for the Cancer Horse crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Cancer Horse crossing through two of them.
15. **Source:** t22 (Purple Star)
   - BEFORE: For a Cancer born in the Horse year, the Strategist star tends to sit adaptable and quietly clever in the chart.
   - AFTER: In our reading of the Cancer Horse, the Strategist star sits adaptable and quietly clever.
16. **Source:** t22 (Purple Star)
   - BEFORE: Near the Life palace, 命宮, Purple Star tends to place the beam star,
   - AFTER: Beside it, our reading sets the beam star,
17. **Source:** t22 (Purple Star)
   - BEFORE: That is the outline the Cancer Horse tends to share. Your exact birth hour is what moves these stars into your own twelve palaces and shows which one runs loudest:
   - AFTER: That is our outline for the Cancer Horse. Only your real chart, cast from your lunar birth date and hour, shows where these stars fall in your twelve palaces and which one runs loudest:
18. **Source:** t22 (kicker, v2 data; HTML already relabeled) (JSON only)
   - BEFORE: What Purple Star already suspects about you
   - AFTER: Our Purple Star reading for this crossing

## giant-manta-ray

1. **Source:** m11, m12, m13 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">鰩</span>
   - AFTER: <span class="rail__han" aria-hidden="true">蝠鱝</span>
2. **Source:** m11, m12, m13 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="鰩" aria-label="Hear 鰩, yáo"
   - AFTER: data-say="蝠鱝" aria-label="Hear 蝠鱝, fúfèn"
3. **Source:** m11, m12, m13 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">yáo</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">fúfèn</span>
4. **Source:** m11, m12, m13 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">鰩</span>
   - AFTER: <span class="serial-han">蝠鱝</span>
5. **Source:** m11, m12, m13 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">鰩</span><span class="py" lang="zh-Latn-pinyin">yáo</span>
   - AFTER: <span class="h" lang="zh">蝠鱝</span><span class="py" lang="zh-Latn-pinyin">fúfèn</span>
6. **Source:** m11, m12, m13 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "鰩"
   - AFTER: "animalHan": "蝠鱝"
7. **Source:** m11, m12, m13 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "yáo"
   - AFTER: "animalHanPy": "fúfèn"
8. **Source:** m8, m9
   - BEFORE: that appears to recognize its own reflection,
   - AFTER: that in one small study may have recognized its own reflection,
9. **Source:** m6, m7
   - BEFORE: A 2016 study found that a majority of this species' diet, roughly <b>73 percent, comes from deep mesopelagic water</b>
   - AFTER: A 2016 study of one population off Ecuador (Burgess et al., Royal Society Open Science) estimated that a majority of this species' diet, roughly <b>73 percent, comes from deep mesopelagic water</b>
10. **Source:** m5, m8, m9
   - BEFORE: and is among the very few animals that may show self-recognition when presented with a mirror.
   - AFTER: and may show self-recognition in front of a mirror: one 2016 study of two captive mantas (Ari and D'Agostino) suggested it, and other researchers read the same behavior as ordinary social display.

## beluga

1. **Source:** s10, s13
   - BEFORE: It has learned to imitate outboard motors, human speech, and the calls of other cetaceans.
   - AFTER: It has learned to imitate human speech and computer sounds.
2. **Source:** s8, s9, s11, s12
   - BEFORE: born grey-brown and whitening slowly with age, living in matrilineal pods that follow the freeze and thaw of sea ice — and the only cetacean documented to mimic sounds outside its own species by choice.
   - AFTER: born dark grey and whitening slowly with age, living in shifting groups that follow the freeze and thaw of sea ice, and one of the few whales documented copying human speech.
3. **Source:** s10, s13
   - BEFORE: that have imitated outboard motors and, in one recorded case,
   - AFTER: that have imitated computer sounds on cue and, in one recorded case,
4. **Source:** s10 (whale name is NOC) [copies: htmlx3, v2x3]
   - BEFORE: NOCS whale
   - AFTER: NOC whale
5. **Source:** s8
   - BEFORE: a <b>flexible acoustic organ that focuses sonar and changes shape during vocalization</b>.
   - AFTER: a <b>flexible organ that focuses and modulates its vocalizations</b>.
6. **Source:** s8, s9
   - BEFORE: Belugas are born grey-brown. They whiten progressively through adolescence, <b>reaching their distinctive white coloration only in their fifth to seventh year</b>.
   - AFTER: Belugas are born dark grey. They whiten progressively with age, <b>usually reaching their distinctive white by about 8 to 10 years</b>.
7. **Source:** s12, s8, s9 (trait title)
   - BEFORE: The matrilineal pod
   - AFTER: The shifting pod
8. **Source:** s12, s8, s9
   - BEFORE: Belugas live in <b>matrilineal groups</b> — pods organized around female lineage — and the social architecture
   - AFTER: Belugas live in <b>shifting groups</b>, from a mother and calf to herds of hundreds, and the social architecture
9. **Source:** s12
   - BEFORE: Belugas live in matrilineal pods — the social architecture
   - AFTER: Belugas live in close but shifting pods — the social architecture
10. **Source:** s12
   - BEFORE: the way the beluga returns to the matrilineal group across hundreds of miles of ice.
   - AFTER: the way the beluga returns to its group across hundreds of miles of ice.
11. **Source:** s12
   - BEFORE: but it returns to the matrilineal pod.
   - AFTER: but it returns to the pod.

## bar-headed-goose

1. **Source:** s14, s13, s12
   - BEFORE: The Bar-headed Goose possesses a unique alpha-hemoglobin subunit with a single amino acid substitution that <b>increases oxygen affinity at low partial pressures</b>. At 29,000 feet — near the summit of Everest — where oxygen concentration is roughly a third of sea-level values, its blood continues to oxygenate tissue effectively.
   - AFTER: The Bar-headed Goose carries a handful of hemoglobin changes, led by one at position 119 of the alpha chain, that <b>increase oxygen affinity at low partial pressures</b>. Its blood keeps loading oxygen in thin mountain air; one tracked bird reached 7,290 meters (about 23,900 feet) on a single brief flight (Bishop et al. 2015).
2. **Source:** s14
   - BEFORE: the single amino acid change in the hemoglobin that allows the binding of oxygen at a third of normal pressure.
   - AFTER: the handful of changes in the hemoglobin that let it bind oxygen in thin mountain air.
3. **Source:** s10, s15, s18
   - BEFORE: GPS tracking has confirmed that Bar-headed Geese complete the Himalayan crossing — including ascents to altitudes above 21,000 feet — in <b>a single non-stop flight lasting seven to eight hours</b>, rather than staging at altitude. The mountain is treated as an obstacle to transit, not a terrain to rest in.
   - AFTER: Satellite tracking (Hawkes et al. 2011) showed most tagged Bar-headed Geese crossing the Himalayas northbound, with climbs of up to about 21,000 feet, in <b>a single non-stop flight of about seven to eight hours</b>. Many rest for weeks at lakes on either side; the mountain itself is a push to get through.
4. **Source:** s10 (rotation not measured in this species)
   - BEFORE: Bar-headed Geese fly in V formations that provide <b>aerodynamic uplift to each bird following the one ahead</b>. The lead position rotates — each bird takes its turn at the front, where the aerodynamic advantage does not exist, then drops back to draft. The cost of the crossing is distributed.
   - AFTER: Like many geese, Bar-headed Geese may fly in V formations, where <b>each bird can gain lift from the one ahead</b>. In other birds that fly this way, the lead has been seen to rotate, so the cost of the front is shared.
5. **Source:** s15
   - BEFORE: <b>two parallel dark bars across a white head</b> — markings visible from a substantial distance. Among migrating flocks at altitude, the individual can be distinguished from far away.
   - AFTER: <b>two parallel dark bars across a white head</b>, and it looks paler than other grey geese.
6. **Source:** s15, s18
   - BEFORE: Bar-headed Geese demonstrate strong site fidelity, <b>returning to the same breeding lakes in Central Asia</b> every spring after wintering on the Indian plains. The same route, over the same mountains, to the same specific location.
   - AFTER: Bar-headed Geese <b>return to breeding lakes in Central Asia</b> every spring after wintering on the Indian plains, and some birds come back to the same wintering sites year after year.
7. **Source:** s15, s18
   - BEFORE: The Bar-headed Goose returns to the same breeding lakes in Central Asia every year
   - AFTER: The Bar-headed Goose returns to breeding lakes in Central Asia every year
8. **Source:** s15, s18
   - BEFORE: the bar-headed goose returns to the same breeding grounds every year, following the same high-altitude route.
   - AFTER: the bar-headed goose returns to its breeding grounds every year, over the same high mountains.
9. **Source:** s11, s12
   - BEFORE: Radar tracking has recorded Bar-headed Geese at altitudes <b>exceeding 23,000 feet</b> during the Himalayan crossing — higher than most commercial aircraft fly in turbulence avoidance protocols. The ceiling others cannot approach is the route this animal uses routinely.
   - AFTER: A body-worn data logger recorded one Bar-headed Goose at <b>7,290 meters, about 23,900 feet</b>, on a single brief flight (Bishop et al. 2015). Most flights hug the terrain at about 4,500 to 5,500 meters, climbing and dropping with the ground below.
10. **Source:** s11, s12
   - BEFORE: It still covers 23,000 feet in a single push.
   - AFTER: It still crosses the mountains in a single push.
11. **Source:** s11, s12, s15 (dossier strapline)
   - BEFORE: 29,000 feet of altitude, one crossing, exactly where it was going.
   - AFTER: The highest mountains on Earth, one crossing, exactly where it was going.
12. **Source:** s11, s12, s15 (share line and identity line) [copies: htmlx2, v2x1]
   - BEFORE: 29,000 feet over Everest, one meadow,
   - AFTER: over the Himalayas in one push, one meadow,
13. **Source:** s11, s12, s15 (chakra card)
   - BEFORE: which crosses 29,000 feet and still knows
   - AFTER: which crosses the Himalayas and still knows
14. **Source:** s11, s12, s15 (proverb gloss)
   - BEFORE: At 29,000 feet, it is above most clouds — which means the view is clear in proportion to the altitude. The floating clouds that block others' view are beneath you.
   - AFTER: It flies close over the ridges, climbing and dropping with the ground, and holds its line toward the far side while the clouds come and go.
15. **Source:** s11, s12, s15
   - BEFORE: The Bar-headed Goose does not fly over Everest to prove it can. It flies over Everest because the breeding grounds are on one side and the wintering grounds are on the other, and Everest happens to be in between.
   - AFTER: The Bar-headed Goose does not fly over the Himalayas to prove it can. It flies over them because the breeding grounds are on one side and the wintering grounds are on the other, and the mountains happen to be in between.
16. **Source:** s11, s12, s15
   - BEFORE: It takes the passage over Everest with
   - AFTER: It takes the passage over the Himalayas with
17. **Source:** s11, s12, s15
   - BEFORE: waiting for safe conditions at Everest means never leaving.
   - AFTER: waiting for safe conditions in the Himalayas means never leaving.
18. **Source:** s15, s12
   - BEFORE: Anser indicus breeds on high-altitude lakes in Central Asia — Tibet, Mongolia, Kazakhstan — and migrates twice yearly across the Himalayas to winter on the Indian subcontinent, crossing the highest mountain range on Earth in a single non-stop flight.
   - AFTER: Anser indicus breeds on high-altitude lakes in Central Asia, mostly on the Tibetan Plateau and north into Mongolia, and many populations migrate twice yearly across the Himalayas to winter on the Indian subcontinent, often crossing the highest mountain range on Earth in a single non-stop flight.
19. **Source:** s17 (label: a line of poetry, not a proverb) (HTML only)
   - BEFORE: aria-label="The proverb of your year"
   - AFTER: aria-label="A line of poetry for your year"
20. **Source:** s17 (HTML only)
   - BEFORE: <p class="eyebrow">The proverb of your year</p>
   - AFTER: <p class="eyebrow">A line of poetry for your year</p>
21. **Source:** s17 (HTML only)
   - BEFORE: aria-label="Hear the whole proverb read aloud"
   - AFTER: aria-label="Hear the whole line read aloud"
22. **Source:** s17 (HTML only)
   - BEFORE: aria-label="The proverb character by character, with pinyin"
   - AFTER: aria-label="The line character by character, with pinyin"
23. **Source:** s17
   - BEFORE (HTML): A proverb we tie to the <a href="/chinese-zodiac/goat/">Year of the Goat</a>.
   - AFTER (HTML): A line by the Song poet Wang Anshi (王安石 Wáng Ānshí), from his poem 登飛來峰 (Dēng Fēiláifēng, Climbing Flying Peak), that we tie to the <a href="/chinese-zodiac/goat/">Year of the Goat</a>.
   - BEFORE (JSON): A proverb we tie to the Year of the Goat.
   - AFTER (JSON): A line by the Song poet Wang Anshi (王安石 Wáng Ānshí), from his poem 登飛來峰 (Dēng Fēiláifēng, Climbing Flying Peak), that we tie to the Year of the Goat.
## Not applied

- orca: hero lead still says pods "stay together for the entirety of each member's life" (page_bugs: true of residents only; audit item 2 verdict OK). Left. Mirror copy "two forms of the same animal" (reading, not a fact line) left even though a 2024 study proposes two species. Tahlequah example (audit: understated, OK) not added. Great white size figure (audit: low but not false) left. The account-modal line "renewed with each new moon" is site-wide renderer copy about reading refreshes, not the power phase; left.
- orca moon: the page's own data (Dossier stat "Power phase: Full Moon", moon dial, ritual, calendar button, practice lines) uses Full Moon throughout, and the template has no new-moon string. Only the Psychic Reading's two new-moon lines (HTML only) were changed to the full moon, with the lucky-window paragraph reworded to fit light instead of dark.
- orca: about 82 em dashes remain in untouched copy (page bug); the replaced lines lost theirs.
- green-sea-turtle: v1 template file is a stub (`"animalHan": "TODO: one hanzi for the creature"`); left as is. Trait 1 title and readings that lean on the magnetic return were left as readings. 天機 and 天梁 star readings otherwise unchanged; the fine print already says the pairing is our own.
- giant-manta-ray: audit verdict on the source list was "Weak" (only Wikipedia and IUCN). The studies are now named in the text (Burgess et al. 2016; Ari and D'Agostino 2016 and the dispute), but no new entries were added to the source list (an addition, not a correction). Mirror image in the strengths list ("settled self-recognition") is reading copy; left. Cassowary match note: not a fact error; left.
- beluga: melon softened in the fact only; the Perception axis read still says the melon "changes shape during vocalization" (OK-soften item, reading context). Header 白鯨 báijīng audit OK; unchanged. Script mix (traditional rail, simplified 狗 in the zodiac strip) is a style flag; left.
- bar-headed-goose: the V formation and "rotation at the front" image runs through readings, careers, rituals, the dial and bonds copy (lines like "take the front of the V on rotation"). Only the fact line was corrected; the readings were left as readings, as in R3. Trait titles ("Return Fidelity", "Altitude Ceiling", "Single-Day Crossing") left. Trait 6 reading "You regularly operate at altitudes others consider exceptional" left as reading.
- bar-headed-goose header 斑頭雁: audit OK; unchanged. Its pinyin on the page and in the template is written "bāntóu yàn" (not joined as one word). Not changed in this pass since the glyph was not in scope; flag for a style pass ("bāntóuyàn").
- bar-headed-goose: the proverb section's visible button text already said "Hear the whole verse"; kept. The template v2 `proverb` object holds only the note string that names it; the eyebrow and aria labels are renderer strings, fixed in HTML only. The template renderer still prints "The proverb of your year" for other pages.
- 紫微斗数 in the Purple Star lead (renderer text) already carries pinyin on these pages.

## Structure check

Section counts match backups (orca 32/32, green-sea-turtle 31/31, giant-manta-ray 32/32, beluga 31/31, bar-headed-goose 31/31). All JSON-LD and application/json blocks parse (4 per page). HTML start-tag skeleton identical to backup on all five. Every edited page parses with python html.parser. Template JSON (v2 for all five, v1 for green-sea-turtle) loads and keysets are unchanged. `<!--w4-reading-->` is not present on any of the five pages. No CSS, JS or other page touched. No git run. No old header glyph (鲸, 龜 alone, 鰩) remains on the three re-glyphed pages; no "29,000", "Everest" or "radar" claim remains on the goose page.

## Final header characters

| Page | Header hanzi | Pinyin |
|---|---|---|
| orca | 虎鯨 | hǔjīng |
| green-sea-turtle | 海龜 | hǎiguī |
| giant-manta-ray | 蝠鱝 | fúfèn |
| beluga | 白鯨 (unchanged) | báijīng |
| bar-headed-goose | 斑頭雁 (unchanged) | bāntóu yàn (as on page; joined form would be bāntóuyàn) |
