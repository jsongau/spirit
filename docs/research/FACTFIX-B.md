# Fact-fix wave B: change log

Date: 2026-11-08. Pages: pronghorn, capybara, harpy-eagle, luna-moth, kea.

Source of truth: each animal's `data/research/<slug>.json` `fact_audit` list. Only WRONG, UNVERIFIABLE, "with note", "partly UNVERIFIABLE" and "last clause" entries were applied. Entries marked plain OK were left alone.

Each change was applied to the live page `site/animals/<slug>/index.html` and to the template data file listed under the animal. Backups of the original pages are outside the repo in `~/factfix-backup/<slug>.html`.

Note: the template JSON files were rewritten with json load/dump (indent=2). Where a file had compact one-line objects (the proverb character arrays in v1 pronghorn and v1 kea) those are now expanded onto several lines. The data is identical.

## Pronghorn (`pronghorn`)

Template file(s) updated: `zodi-animal-template-v1/data/animals/pronghorn.json`, `zodi-animal-template-v2/data/animals/pronghorn.json`

1. Audit #0 (4 places on the page, incl. meta and JSON-LD descriptions)
   - BEFORE: built to outrun a threat that vanished ten thousand years ago.
   - AFTER: built to outrun a threat that vanished about 12,000 years ago.
   - Source: mt-naturalist, wiki-pronghorn

2. Audit #0 (1 place on the page)
   - BEFORE: a threat that disappeared ten thousand years ago
   - AFTER: a threat that disappeared about 12,000 years ago
   - Source: mt-naturalist, wiki-pronghorn

3. Audit #0 (1 place on the page)
   - BEFORE: still pacing itself for a predator gone ten thousand years.
   - AFTER: still pacing itself for a predator gone 12,000 years.
   - Source: mt-naturalist, wiki-pronghorn

4. Audit #0 (1 place on the page)
   - BEFORE: high desert of North America, built by a predator that has not existed for ten thousand years.
   - AFTER: high desert of North America. It outruns a cheetah that vanished about 12,000 years ago, and some scientists think the speed is older still.
   - Source: mt-naturalist, wiki-pronghorn

5. Audit #0 (1 place on the page)
   - BEFORE: scans constantly for ten thousand years
   - AFTER: scans constantly for 12,000 years
   - Source: mt-naturalist, wiki-pronghorn

6. Audit #0 (1 place on the page)
   - BEFORE: a predator that has been gone for ten thousand years.
   - AFTER: a predator that has been gone for about 12,000 years.
   - Source: mt-naturalist, wiki-pronghorn

7. Audit #0 (v1 template hero only, not on the live page)
   - BEFORE: even when nothing has hunted you in ten thousand years.
   - AFTER: even when nothing has hunted you in 12,000 years.
   - Source: mt-naturalist, wiki-pronghorn

8. Audit #2 (1 place on the page)
   - BEFORE: the Pronghorn can hold roughly 45 to 55 mph across several miles and sustain around 30 mph for distances up to twenty miles, a stamina
   - AFTER: the Pronghorn can reach 55 mph over about half a mile and hold around 35 mph for more than five miles, a stamina
   - Source: mt-naturalist, wiki-pronghorn

9. Audit #2 (1 place on the page)
   - BEFORE: would beat the Pronghorn over a hundred yards and lose to it over twenty miles,
   - AFTER: would beat the Pronghorn over a hundred yards and lose to it over five miles,
   - Source: mt-naturalist, wiki-pronghorn

10. Audit #2 (1 place on the page)
   - BEFORE: It was the tenth mile, and the fifteenth,
   - AFTER: It was the third mile, and the fifth,
   - Source: mt-naturalist, wiki-pronghorn

11. Audit #3 (1 place on the page)
   - BEFORE: The Pronghorn's heart is proportionally around three times larger than a similarly sized domestic animal's, and its lungs carry roughly five times the surface area of a same-sized goat's, feeding a wide trachea built to move oxygen at speed.
   - AFTER: The Pronghorn has a large heart, windpipe and lungs for its size. At full effort it uses about five times the oxygen of a goat its size.
   - Source: discover, lindstedt, wiki-pronghorn

12. Audit #5 (1 place on the page)
   - BEFORE: register a moving object roughly four miles away.
   - AFTER: register a moving object roughly three miles away.
   - Source: nps-thro

13. Audit #5 (1 place on the page)
   - BEFORE: register movement almost four miles off,
   - AFTER: register movement almost three miles off,
   - Source: nps-thro

14. Audit #6 (1 place on the page)
   - BEFORE: rump patch, doubling its size into a flash of white
   - AFTER: rump patch, doubling the size of the patch into a flash of white
   - Source: sdzg, azgfd

Not changed (owner decision): audit #8, the Purple Star chapter line saying an Aries born in a Horse year tends to have the Sun star (太陽 tàiyáng) bright. The audit marks it UNVERIFIABLE because Zi Wei Dou Shu charts are set from the lunar birth date and hour, not the Western sun sign.

## Capybara (`capybara`)

Template file(s) updated: `zodi-animal-template-v2/data/animals/capybara.json`

1. Audit #1 (1 place on the page)
   - BEFORE: The capybara is among the most socially open mammals observed. It tolerates birds landing on its back, monkeys riding alongside it, and even small predators resting near the herd without triggering alarm.
   - AFTER: It tolerates birds landing on its back, and even turtles climbing on, without triggering alarm.
   - Source: wiki-capybara, schunck2025, inat-wisnik

2. Audit #1 (1 place on the page)
   - BEFORE: regularly tolerate other species — including birds, monkeys, and small predators — resting on and around their bodies. They are described by biologists as among the most affiliative mammals observed in the wild.
   - AFTER: regularly let other species rest on their bodies, including birds and even turtles.
   - Source: wiki-capybara, schunck2025, inat-wisnik

3. Audit #1 (1 place on the page)
   - BEFORE: The most affiliative mammal
   - AFTER: The animal others rest on
   - Source: wiki-capybara, schunck2025, inat-wisnik

4. Audit #1 (1 place on the page)
   - BEFORE: groups of ten to a hundred individuals and is, by most measures, the most socially affiliative large mammal on the continent.
   - AFTER: groups of ten to a hundred individuals.
   - Source: wiki-capybara, schunck2025, inat-wisnik

5. Audit #4 (1 place on the page)
   - BEFORE: Male capybaras possess a morillo — a large, hairless sebaceous gland on the top of the nose — used to scent-mark vegetation and establish territorial presence without confrontation.
   - AFTER: Both sexes carry a morillo, a scent gland on the snout, much larger in dominant males. They rub it on plants to mark them.
   - Source: wiki-capybara, wlt, herrera1993

6. Audit #5 (1 place on the page)
   - BEFORE: reaching up to 65 kilograms and 1.3 metres in length. Its size is itself a social resource: other species shelter in its proximity, and predators are less likely to approach a group when the capybara is visible and calm.
   - AFTER: reaching up to 65 kilograms and 1.3 metres in length.
   - Source: wiki-capybara, pbs, wlt

Not changed: audit #2 and #3 are marked OK. Their notes suggest "frequent" for "near-continuous" and "eyes, ears and nostrils" for "nostrils only", but OK items were out of scope.

## Harpy Eagle (`harpy-eagle`)

Template file(s) updated: `zodi-animal-template-v1/data/animals/harpy-eagle.json`

1. Audit #0 (1 place on the page)
   - BEFORE: The largest eagle in the world, and the last thing
   - AFTER: The largest eagle in the Americas, and the last thing
   - Source: s1, s2, s3

2. Audit #0 (1 place on the page)
   - BEFORE: The largest eagle in the Americas, built to hunt inside
   - AFTER: Among the heaviest eagles alive, built to hunt inside
   - Source: s1, s2, s3

3. Audit #1 (1 place on the page)
   - BEFORE: an eagle too heavy and short-winged to soar the way its relatives do, built instead for total stillness
   - AFTER: an eagle with broad, relatively short wings suited to moving through the canopy, built for total stillness
   - Source: (audit note, no source)

4. Audit #2 (1 place on the page)
   - BEFORE: rises from the back of the crown when the bird is alert, a raised crest with a longer, two-pointed shape that is one of the field marks separating an adult Harpy Eagle from the similar Crested Eagle.
   - AFTER: rises from the back of the crown when the bird is threatened, a raised crest with a two-pointed shape.
   - Source: s1, s2

5. Audit #3 (1 place on the page)
   - BEFORE: among the largest of any living eagle, carried on legs powerful enough to subdue prey many times heavier than the bird's own reach would suggest.
   - AFTER: among the largest of any living eagle.
   - Source: s1, s2

6. Audit #5 (3 places on the page)
   - BEFORE: year after year
   - AFTER: season after season
   - Source: s1, s2

- Follow-on tidy (audit #5): removed the doubled "season" left by the change above.
  - BEFORE: season after season rather than rebuilt from scratch each season.
  - AFTER: season after season rather than rebuilt from scratch.
  - Source: s1, s2

7. Audit #7 (1 place on the page)
   - BEFORE: and mated pairs remain bonded for life,
   - AFTER: and mated pairs are believed to stay bonded for life,
   - Source: s2, s1

Not changed: audit #8, pinyin yīng for 鷹. The character only appears in the reading rail (`rail__han`, aria-hidden) and the keepsake (`serial-han`). No animal page uses a pinyin/ruby pattern in either spot, so there is no safe existing pattern to copy. Left for a design decision.

Not changed: `zodi-animal-template-v2/data/animals/harpy-eagle.json` is an unfinished scaffold (243 TODO markers). The v1 file was updated instead.

## Luna Moth (`luna-moth`)

Template file(s) updated: `zodi-animal-template-v2/data/animals/luna-moth.json`

1. Audit #3 (1 place on the page)
   - BEFORE: , after which egg-laying begins the same night and continues for several nights running.
   - AFTER: . Egg-laying starts the following evening and continues for several nights running.
   - Source: S1, S2

2. Audit #4 (1 place on the page)
   - BEFORE: A newly emerged moth spends two to three hours pumping fluid into its small, crumpled wings before they are hard enough to fly, and cannot search for anything until that process finishes.
   - AFTER: A newly emerged moth spends several hours pumping fluid into its small, crumpled wings. It emerges in the morning and makes its first flight that evening. It cannot search for anything until then.
   - Source: S1, S2

## Kea (`kea`)

Template file(s) updated: `zodi-animal-template-v1/data/animals/kea.json`

1. Audit #1 (1 place on the page)
   - BEFORE: The kea's long, strongly decurved upper bill is used to dig for roots and grubs, strip bark, and pry into whatever it is investigating, a tool built for opening things more than for defending itself.
   - AFTER: The kea has a long, strongly decurved upper bill, a tool built for opening things more than for defending itself. It investigates with that beak, its tongue and its claws.
   - Source: s4, s2

2. Audit #2 (1 place on the page)
   - BEFORE: ski equipment; researchers studying the species have framed this behaviour as opportunistic, curiosity-driven exploration rather than food-motivated foraging.
   - AFTER: ski equipment. Researchers describe this behaviour as opportunistic exploration, often with no food in sight.
   - Source: s4, s2

3. Audit #2 (1 place on the page)
   - BEFORE: an opportunist that investigates and dismantles the unfamiliar out of curiosity rather than hunger,
   - AFTER: an opportunist that investigates and dismantles the unfamiliar, often with no food in sight,
   - Source: s4, s2

4. Audit #6 (1 place on the page)
   - BEFORE: actually is: one of the most cognitively sophisticated birds studied in captivity, an opportunist
   - AFTER: actually is: an opportunist
   - Source: (audit note, no source; clause cut)

Flagged, not changed: the hero line "You take the ridge apart, bolt by bolt, and never once for hunger." repeats the curiosity-not-food contrast from audit #2 in poetic form. It is the page hook, so it is left for the owner.

