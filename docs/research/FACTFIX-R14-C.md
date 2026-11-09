# FACTFIX-R14-C change log

Date: 2026-11-08. Pages: tarsier, giant-centipede, swan, arabian-oryx.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). Where a string occurred more than once in a file every occurrence was replaced (counts noted). All four pages have v2 template data only; none has a v1 file.
Order: tarsier and giant-centipede first. The swan and arabian-oryx dossiers were still being written; swan.json and swan.md appeared at 05:43 UTC and arabian-oryx at about 05:49 UTC (about 9 minutes of waiting in all), both json files loaded, and both pages were then done.
Backups of the original pages: `~/factfix-backup-r14c/<slug>.html`; original template JSON in `~/factfix-backup-r14c/tpl/v2/` (`tpl/v1/` created, empty, since no v1 files exist). All outside the repo.
Glyphs use traditional forms to match the site. Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. `tools/han-pinyin.json` updated for the three changed headers (tarsier, giant-centipede, arabian-oryx; fresh read-modify-write at the end, only these three keys touched, file format kept).
Purple Star: none of the four pages carries a star-to-crossing claim (all four audits: OK, none present). The Purple Star blocks only say a chart is cast from lunar birth date and hour. Nothing to make honest; nothing changed.

## tarsier

1. **Source:** t16 (header: 眼 yǎn means eye; Chinese name 眼鏡猴 yǎnjìnghóu) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">眼</span>
   - AFTER: <span class="rail__han" aria-hidden="true">眼鏡猴</span>
2. **Source:** t16 (header; count: HTML x2) [HTML]
   - BEFORE: data-say="眼" aria-label="Hear 眼, yǎn"
   - AFTER: data-say="眼鏡猴" aria-label="Hear 眼鏡猴, yǎnjìnghóu"
3. **Source:** t16 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">yǎn</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">yǎnjìnghóu</span>
4. **Source:** t16 (header) [HTML]
   - BEFORE: <span class="serial-han">眼</span>
   - AFTER: <span class="serial-han">眼鏡猴</span>
5. **Source:** t16 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">眼</span><span class="py" lang="zh-Latn-pinyin">yǎn</span>
   - AFTER: <span class="h" lang="zh">眼鏡猴</span><span class="py" lang="zh-Latn-pinyin">yǎnjìnghóu</span>
6. **Source:** t7, t12 (WRONG: one captive lived 13.5 years; supported: breeding colonies never succeeded) [HTML + v2]
   - BEFORE: and cannot be kept alive in captivity for any sustained period.
   - AFTER: and fares badly in captivity, where no breeding colony has ever succeeded.
7. **Source:** t7, t8, t12 (frame: the head turns 180 degrees, not the eye; forty body lengths unverifiable, Philippine tarsier leaps at least 3 m) [HTML + v2]
   - BEFORE: The eye that cannot move but can rotate a hundred and eighty degrees, the leap that crosses forty body-lengths,
   - AFTER: The fixed eyes in a head that turns a hundred and eighty degrees each way, the leap that clears three metres,
8. **Source:** t7, t8, t11 (WRONG superlative: the record is eye-to-body weight, not eye-to-brain) [HTML + v2]
   - BEFORE: giving tarsiers the highest eye-to-brain-volume ratio among all mammals.
   - AFTER: and relative to body weight its eyes are the largest of any mammal.
9. **Source:** t9, t10 (sharpened: Ramsier et al. 2012 recorded pure ultrasound near 70 kHz from wild tarsiers; not all calls are ultrasonic) [HTML + v2]
   - BEFORE: Tarsiers produce vocalizations <b>above 20 kHz</b>, into the ultrasonic range inaudible to humans; the call was first recorded in Philippine tarsiers in a 2012 study by Ramsier et al. published in Biology Letters.
   - AFTER: Philippine tarsiers can call in pure ultrasound <b>near 70 kHz</b>, far above the range humans can hear; Ramsier et al. recorded these calls from wild tarsiers in a 2012 study published in Biology Letters.
10. **Source:** t8, t12 (trait title: forty body lengths unverifiable) [HTML + v2]
   - BEFORE: The forty-body-length leap
   - AFTER: The three-metre leap
11. **Source:** t8, t12, t13 (UNVERIFIABLE 40x and mid-air rotation; sourced 3 m leap) [HTML + v2]
   - BEFORE: The tarsier can leap distances of <b>up to forty times its own body length</b>, using elongated tarsus bones — the ankle bones that give the genus its name — as a spring mechanism, rotating mid-air to land feet-first.
   - AFTER: The Philippine tarsier can leap <b>three metres or more</b>, many times its own body length, using elongated tarsus bones — the ankle bones that give the genus its name — as a spring mechanism.
12. **Source:** t12 (trait title: captive survival is recorded) [HTML + v2]
   - BEFORE: Cannot survive the wrong environment
   - AFTER: Struggles in the wrong environment
13. **Source:** t7, t8, t12, t13 (WRONG overstated captivity deaths; Niemitz 1984 claim unverifiable; stress head-banging from Wikipedia) [HTML + v2]
   - BEFORE: Tarsiers in captivity frequently die within days or weeks; Niemitz (1984) documented stress-induced death linked to the <b>loss of appropriate roosting structure and free movement in darkness</b> — conditions the animal cannot compensate for.
   - AFTER: Captivity shortens a tarsier's life and no breeding colony has ever succeeded, though one captive animal lived 13.5 years. Stress from handling or camera flash can drive a tarsier to fatal head-banging, so it fares worst <b>without dark, quiet cover and room to move</b>.
14. **Source:** t7, t12 (mirror line: "early captivity studies" unsourced; reworded to the supported stress point) [HTML + v2]
   - BEFORE: The tarsiers that died in early captivity studies died in environments that were too loud, too lit, too watched. The body could not maintain itself in conditions that did not allow for darkness and free movement.
   - AFTER: Captive tarsiers fare worst in places that are too loud, too lit, too watched. The body struggles to hold up where there is no darkness and no room to move.
   - Template: animalHan "眼" to "眼鏡猴", animalHanPy "yǎn" to "yǎnjìnghóu" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## giant-centipede

1. **Source:** c20, c15 (header: 蜈 is only the first syllable; centipede is 蜈蚣 wúgōng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">蜈</span>
   - AFTER: <span class="rail__han" aria-hidden="true">蜈蚣</span>
2. **Source:** c20, c15 (header; count: HTML x2) [HTML]
   - BEFORE: data-say="蜈" aria-label="Hear 蜈, wú"
   - AFTER: data-say="蜈蚣" aria-label="Hear 蜈蚣, wúgōng"
3. **Source:** c20, c15 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">wú</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">wúgōng</span>
4. **Source:** c20, c15 (header) [HTML]
   - BEFORE: <span class="serial-han">蜈</span>
   - AFTER: <span class="serial-han">蜈蚣</span>
5. **Source:** c20, c15 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">蜈</span><span class="py" lang="zh-Latn-pinyin">wú</span>
   - AFTER: <span class="h" lang="zh">蜈蚣</span><span class="py" lang="zh-Latn-pinyin">wúgōng</span>
6. **Source:** c8, c7 (WRONG narrowed range: northern South America and southern Caribbean, rainforest and dry forest; one cave record) [HTML + v2]
   - BEFORE: moves through Venezuelan cave systems and rain forest floors as the apex invertebrate predator of its zone.
   - AFTER: hunts the rainforest and dry forest of northern South America and the southern Caribbean, and at least one Venezuelan cave, as the apex invertebrate predator of its zone.
7. **Source:** c7, c8, c9, c12 (frame: mid-air bat catching only proposed; vibration detection unsourced; brain is involved in walking) [HTML + v2]
   - BEFORE: a creature that catches bats in mid-air by hanging from cave ceilings, detects prey through substrate vibration before its eyes register anything, and coordinates forty-two legs without conscious deliberation.
   - AFTER: a creature seen hanging from a cave ceiling by its back legs while it eats a bat, that hunts with weak eyes, and that keeps forty-two legs moving in step.
8. **Source:** c7 (template-only card line: mid-air catch never observed) [v2]
   - BEFORE: and catches the bat in mid-air.
   - AFTER: and takes the bat within reach.
9. **Source:** c9 (trait title: vibration claim unverifiable) [HTML + v2]
   - BEFORE: The Vibration Read
   - AFTER: The Read Without Sight
10. **Source:** c9 (UNVERIFIABLE leg mechanoreceptors; 21 pairs OK; four ocelli per side, weak vision) [HTML + v2]
   - BEFORE: Scolopendra gigantea detects approaching prey through <b>substrate vibration via mechanoreceptors distributed across all 21 pairs of legs</b> — often before visual confirmation is possible.
   - AFTER: Scolopendra gigantea has <b>21 pairs of legs and weak eyes</b>, just four simple eyes on each side of its head, so it finds its prey in the dark with little help from sight.
11. **Source:** c9 (axis read: vibration claim made our reading) [HTML + v2]
   - BEFORE: Scolopendra gigantea detects prey through substrate vibration before its eyes confirm anything. Forty-two legs become a distributed sensing network
   - AFTER: Scolopendra gigantea sees poorly and hunts in the dark, close to the ground. In our reading its forty-two legs become a distributed sensing network
12. **Source:** c7, c8 (WRONG: seen feeding on bats on the ceiling, mid-air capture only a hypothesis; "unique" cut) [HTML + v2]
   - BEFORE: Scolopendra gigantea has been documented <b>anchoring its rear legs to cave ceilings</b> to intercept bats in mid-flight — a hunting method unique among centipede species.
   - AFTER: Scolopendra gigantea has been seen <b>anchored to a cave ceiling by its rear legs</b>, holding a bat in its front legs as it fed. Molinari et al. (2005) suggested it might catch bats in flight, but no one has seen that happen.
13. **Source:** c9, c12 (WRONG: 42 legs, not 42 to 46; "no central processing" false, brain sends the walking command; study species is S. subspinipes mutilans) [HTML + v2]
   - BEFORE: The centipede's <b>42 to 46 legs coordinate through a distributed motor system</b> without requiring central processing — each segment semi-autonomous.
   - AFTER: The centipede's <b>42 legs move through a distributed motor system</b>: in a related giant centipede, researchers found the brain sends the walking command down networks along the body, and each leg's own sensors can adjust it locally.
14. **Source:** c7 (UNVERIFIABLE "maximum sensory processing"; waiting motionless is one proposed method) [HTML + v2]
   - BEFORE: Before striking, Scolopendra gigantea <b>enters a period of complete apparent immobility</b> — a phase of maximum sensory processing before commitment to movement.
   - AFTER: Scolopendra gigantea may <b>wait motionless</b> for prey to come within reach, one of the hunting methods Molinari et al. (2005) proposed for the cave centipedes.
15. **Source:** c7 (UNVERIFIABLE weeks without food, keeper forums only; replaced with Molinari prey mass) [HTML + v2]
   - BEFORE: Scolopendra gigantea can <b>survive for weeks without feeding</b> and typically strikes only when the predatory sequence will succeed — a pattern of maximal efficiency over maximal frequency.
   - AFTER: Scolopendra gigantea can <b>overpower prey close to twice its own weight</b>: in two of the cave kills Molinari et al. recorded, the bat nearly doubled the centipede's mass.
16. **Source:** c7 (axis read: "for hours" unsourced) [HTML + v2]
   - BEFORE: The Giant Centipede can remain motionless for hours — not because it is passive,
   - AFTER: The Giant Centipede can wait motionless for its prey — not because it is passive,
17. **Source:** c7 (mirror line implied mid-flight capture) [HTML + v2]
   - BEFORE: The centipede does not strike at every bat that passes. It reads the interval, the trajectory, the angle between ceiling and flight path, and it moves when the geometry is right.
   - AFTER: The centipede does not strike at every bat within reach. It holds its anchor on the ceiling and moves when the position is right.
18. **Source:** c7 (mirror line implied mid-flight capture) [HTML + v2]
   - BEFORE: The centipede that catches bats does not wait for the bat to stop flying.
   - AFTER: The centipede that takes bats on a cave ceiling does not wait for a perfect opening.
19. **Source:** c7 (proverb soul: "for hours" unsourced) [HTML + v2]
   - BEFORE: The centipede hangs from the ceiling for hours.
   - AFTER: The centipede hangs from the ceiling and waits.
20. **Source:** c12 (reference: IUCN entry unverifiable, no assessment found; swapped for the Tohoku source) [HTML]
   - BEFORE: <li><a href="https://www.iucnredlist.org/species/197471/2489078" rel="noopener">IUCN Red List · Scolopendra gigantea</a></li>
   - AFTER: <li><a href="https://www.tohoku.ac.jp/en/press/navigating_land_and_water.html" rel="noopener">Tohoku University · How centipedes control walking and swimming (press release)</a></li>
21. **Source:** c12 (template reference, IUCN replaced) [v2]
   - BEFORE: "label": "IUCN Red List · Scolopendra gigantea",\n        "href": "https://www.iucnredlist.org/species/197471/2489078"
   - AFTER: "label": "Tohoku University · How centipedes control walking and swimming (press release)",\n        "href": "https://www.tohoku.ac.jp/en/press/navigating_land_and_water.html"
22. **Source:** c7 (Molinari 2005 link pointed to a Journal of Mammalogy DOI; now the Academia.edu record of the paper) [HTML + v2]
   - BEFORE: https://doi.org/10.1093/jmammal/gyx001
   - AFTER: https://www.academia.edu/32674121
23. **Source:** c10, c11 (Edgecombe and Giribet 2007 DOI corrected to .091326) [HTML + v2]
   - BEFORE: annurev.ento.52.110405.091134
   - AFTER: annurev.ento.52.110405.091326
   - Template: animalHan "蜈" to "蜈蚣", animalHanPy "wú" to "wúgōng" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## swan

1. **Source:** s6, s7, s10 (hero: "legs never stop" is the duck proverb; resting swans lift a foot) [HTML + v2]
   - BEFORE: You glide because your legs never stop moving, even when the water gets credit for the calm.
   - AFTER: You glide because your feet work where no one can see them, even when the water gets credit for the calm.
2. **Source:** s6 (UNVERIFIABLE subjective outline claim in the lead) [HTML + v2]
   - BEFORE: recognizable at any distance by its unbroken white line.
   - AFTER: known at a glance by its white plumage and long curved neck.
3. **Source:** s7, s8, s9 (WRONG: female incubates; male guards; lifelong pairing kept) [HTML + v2]
   - BEFORE: , with both parents sharing incubation and cygnet care.
   - AFTER: ; the female incubates the eggs while the male guards the nest, and both parents raise the cygnets.
4. **Source:** s6, s7, s10 (WRONG: paddling not continuous; resting swans float with one foot on the back) [HTML + v2]
   - BEFORE: A swan's smooth glide across the surface is powered by <b>continuous paddling of its legs below the waterline</b>, entirely hidden from anyone watching from the bank.
   - AFTER: A swan's smooth glide across the surface is powered by <b>strokes of its webbed feet below the waterline</b>, hidden from anyone watching from the bank, though a resting swan often floats with one foot tucked up on its back.
5. **Source:** s6, s7 (audit: males are the aggressive ones; wings half-raised) [HTML + v2]
   - BEFORE: When a nest or cygnets are threatened, a mute swan will <b>arch its wings over its back and charge</b>,
   - AFTER: When a nest or cygnets are threatened, the male mute swan will <b>half-raise its arched wings and charge</b>,
6. **Source:** s6, s7 (reason unverifiable; tired cygnets ride on the back) [HTML + v2]
   - BEFORE: , especially in cold water or when predators are near.
   - AFTER: , often when they are tired.
7. **Source:** s6 (UNVERIFIABLE superlative; replaced with S-curved neck used to reach submerged plants) [HTML + v2]
   - BEFORE: The species' long neck and level flight posture give the mute swan a <b>near-silhouette of a single unbroken curve</b> on open water, among the most recognizable outlines in wetland birds.
   - AFTER: The mute swan holds its long neck in a <b>single unbroken S-curve</b>, and uses that reach to pull up plants from the bottom of shallow water.
8. **Source:** s6, s7 (exception: colonies where food is rich, as at Abbotsbury) [HTML + v2]
   - BEFORE: , often the same site year after year, tolerating few other swans within it.
   - AFTER: , often the same site year after year, tolerating few other swans within it, though where food is plentiful some nest in colonies.

## arabian-oryx

1. **Source:** s14 (header: 羚 líng is generic antelope; oryx name 劍羚 jiànlíng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">羚</span>
   - AFTER: <span class="rail__han" aria-hidden="true">劍羚</span>
2. **Source:** s14 (header; count: HTML x2) [HTML]
   - BEFORE: data-say="羚" aria-label="Hear 羚, líng"
   - AFTER: data-say="劍羚" aria-label="Hear 劍羚, jiànlíng"
3. **Source:** s14 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">líng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">jiànlíng</span>
4. **Source:** s14 (header) [HTML]
   - BEFORE: <span class="serial-han">羚</span>
   - AFTER: <span class="serial-han">劍羚</span>
5. **Source:** s14 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">羚</span><span class="py" lang="zh-Latn-pinyin">líng</span>
   - AFTER: <span class="h" lang="zh">劍羚</span><span class="py" lang="zh-Latn-pinyin">jiànlíng</span>
6. **Source:** s7, s8, s9 (soften "declared": last wild animal shot 1972; first release Oman 1982; 2011 IUCN downlisting added) [HTML + v2]
   - BEFORE: The Arabian oryx was <b>declared extinct in the wild in 1972</b>, surviving only in captive and private herds, before reintroduction programs returned it to protected desert reserves beginning in the 1980s.
   - AFTER: The last wild Arabian oryx is believed to have been <b>shot in 1972</b>, leaving the species alive only in captive and private herds, before reintroduction programs returned it to protected desert reserves from 1982. In 2011 it became the first animal moved from extinct in the wild back to vulnerable on the IUCN Red List.
7. **Source:** s6 (WRONG attribution: unicorn link is Aristotle and Pliny, not desert cultures; "may" not "likely") [HTML + v2]
   - BEFORE: <b>appear to merge into a single spike</b>, a likely source of the unicorn legend in desert cultures.
   - AFTER: <b>can appear to merge into a single spike</b>, and the unicorn legend may trace back to oryxes seen this way; Aristotle and Pliny the Elder treated the oryx as the model for the unicorn.
8. **Source:** s6, s11 (trait title under the replaced fact) [HTML + v2]
   - BEFORE: The upright stand
   - AFTER: The scrape in the shade
9. **Source:** s6, s11 (WRONG: posture unsourced; it rests in shallow scrapes in shade in the heat) [HTML + v2]
   - BEFORE: The species stands with a <b>notably straight back and level head carriage</b>, a posture maintained even during long periods of rest in open, exposed terrain.
   - AFTER: In the hottest part of the day the oryx <b>digs a shallow scrape under a shrub or tree</b> and lies there in the shade until the heat eases.
10. **Source:** s6, s11 (reading rebuilt on the corrected fact) [HTML + v2]
   - BEFORE: You hold your shape whether or not anyone is around to see it held. It was never a performance. It's how <em>you stay standing</em>.
   - AFTER: You know when to stop and wait out the worst of the heat, and you dig your own shade to do it. Rest, for you, is part of <em>how you stay standing</em>.
   - Template: animalHan "羚" to "劍羚", animalHanPy "líng" to "jiànlíng" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.
## Header check

- tarsier: 眼 yǎn (eye) to 眼鏡猴 yǎnjìnghóu.
- giant-centipede: 蜈 wú (first syllable only) to 蜈蚣 wúgōng.
- swan: 鵠 hú kept. The audit says it is correct (classical word for swan, the 鵠 of 鴻鵠 hónghú); modern word 天鵝 tiān'é not added.
- arabian-oryx: 羚 líng (antelope in general) to 劍羚 jiànlíng, the dossier's recommended oryx name.

## Not changed, and why

- tarsier axis read "In captivity it can die of the stress alone": supported (stress can lead to fatal head-banging). Kept.
- tarsier title "Eyes larger than the brain": sources say as large as or in some cases larger than the brain. Kept.
- tarsier Niemitz (1984) reference: a real book; only the specific claim on the page was unverifiable, and that claim is gone. Kept as a general reference, as in R12-B.
- tarsier moon section says tarsiers are most active at the new moon and that bright full moons cut foraging. Not in the audit, so not touched here, but field work on spectral tarsiers (Gursky) is usually cited for the opposite, more activity on moonlit nights. Flag for the owner: check before the next pass.
- tarsier lesson line "the most accurate night vision of any primate": not in the audit; unsourced superlative. Left for the owner.
- giant-centipede rootedness read "occupies specific cave systems and territories. It knows its ceiling. It returns.": not in the audit; reading voice. Kept.
- giant-centipede bat and ceiling imagery in readings (hero, proverb soul, shadow "The bat has already crossed the ceiling"): reading voice; lines that implied a mid-flight catch as fact were reworded (items 17, 18).
- giant-centipede "apex invertebrate predator of its zone": not in the audit. Kept.
- swan header 鵠 is traditional while its proverb tiles 任劳任怨 rèn láo rèn yuàn are simplified (traditional 任勞任怨); the same holds for the oryx proverb 虎落平阳 hǔ luò píngyáng (traditional 虎落平陽). The proverb tiles are fed by the shared proverb data, not this page alone, so left for a sitewide pass.
- swan proverb: the audit suggests the Shiji line 燕雀安知鴻鵠之志 yàn què ān zhī hónghú zhī zhì, which names the swan, as a stronger option. Owner's call; not added.
- swan "tucked into the feathers near the nape" and the axis read "The few who see the legs working": not flagged, reading voice. Kept.
- arabian-oryx hero "You still hold the desert's posture" and the reading "standing exactly as upright as it was": reading voice, no animal claim. Kept.
- arabian-oryx water fact (fact 04): audit OK; the dossier offers a stronger fact (it lets body temperature rise to cut water loss by at least half). Not added.
- Existing em dashes in anchor text were kept where they were not part of the fixed claim (tarsier item 11 keeps the "— the ankle bones ... —" aside). No new text adds any.
- "Last reviewed" dates in the source lists left as they are.

## Structure check

All four pages parse with python html.parser, and the full HTML tag sequence matches the backups. Every JSON-LD and application/json block parses (4 per page). All edited template JSON loads and the nested keysets are unchanged (raw text edits, same format and trailing-newline state). `tools/han-pinyin.json` loads, 144 keys. No leftover old header glyph in any header slot. No new em dash, en dash or arrow in new text; no banned words; every new hanzi carries pinyin; no escaped <b>. No CSS or JS touched. Git not run.

## Final header characters

- tarsier: 眼鏡猴 yǎnjìnghóu (was 眼 yǎn)
- giant-centipede: 蜈蚣 wúgōng (was 蜈 wú)
- swan: 鵠 hú (unchanged)
- arabian-oryx: 劍羚 jiànlíng (was 羚 líng)
