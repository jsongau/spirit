# FACTFIX-R3-B change log

Date: 2026-11-08. Pages: paradise-tanager, moon-bear, cacomistle, andean-condor, new-caledonian-crow.
Source of truth: `data/research/<slug>.json` fact_audit. Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that exist (paradise-tanager and new-caledonian-crow: v2 only; cacomistle and andean-condor: v1 only; moon-bear: v1 and v2) unless marked HTML only or JSON only. Where a string appears more than once in a file, every copy was changed (count shown).
Backups of the original pages: `~/factfix-backup-r3b/<slug>.html`; original template JSON in `~/factfix-backup-r3b/tpl/v1/` and `tpl/v2/` (both outside the repo).
Glyphs use traditional forms to match the pages, per the R2 precedent (鷲, not 鹫).

## paradise-tanager

1. **Source:** s1, s2
   - BEFORE: a rump that burns red or yellow</b> depending on subspecies
   - AFTER: a rump that burns red, or red and yellow,</b> depending on subspecies
2. **Source:** s4
   - BEFORE: Paradise tanagers are <b>rarely recorded foraging in isolation</b>, typically found as part of a moving group even when the birds around them are entirely different species.
   - AFTER: Paradise tanagers <b>forage in pairs or family groups</b>, often as part of a moving mixed flock even when the birds around them are entirely different species.
3. **Source:** (none; superlative softened per audit), s4
   - BEFORE: The most colorful bird in the canopy, and the one least likely to be found alone in it.
   - AFTER: One of the most colorful birds in the canopy, and one that is seldom found alone in it.
4. **Source:** s8
   - BEFORE: Mixed-flock species, tanagers included, are known to <b>call out food and predator alerts that the entire flock responds to</b>, regardless of species.
   - AFTER: In Amazon mixed flocks, <b>sentinel birds such as the white-winged shrike-tanager call the predator alarms</b> that the whole flock, tanagers included, responds to.
5. **Source:** s8
   - BEFORE: You warn the group before you protect your own exposure. <em>Generosity, for you, often arrives before self-interest does.</em>
   - AFTER: You listen for the group's warning and move with it. <em>Trust in the flock, for you, often arrives before your own caution does.</em>
6. **Source:** brief (renderer string, not in data JSON) (HTML only)
   - BEFORE: is one of the most detailed of the Chinese chart systems, and it maps the Paradise Tanager you are becoming, not only the one you are.
   - AFTER: is one of the most detailed of the Chinese chart systems. It is a separate chart, cast from your lunar birth date and hour, not from your sign or your animal.
7. **Source:** brief (renderer string, not in data JSON) (HTML only)
   - BEFORE: The reading here is the outline your Libra Snake shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## moon-bear

1. **Source:** s11
   - BEFORE: <b>bends and breaks branches into raised day-nests</b> where it feeds and rests,
   - AFTER: <b>bends and breaks branches into raised feeding platforms</b> that it also rests on,
2. **Source:** s12, s13
   - BEFORE: A ruff of long hair, sometimes 15 centimetres, frames the neck and shoulders in much of the range. When the bear stands and faces a threat, the mane <b>makes it read as larger than it is</b>.
   - AFTER: A ruff of long hair, <b>sometimes 15 centimetres long</b>, frames the neck and shoulders in much of the range.
3. **Source:** s10, s11
   - BEFORE: a listener that reads danger by sound.
   - AFTER: a bear with ears larger than most bears carry.
4. **Source:** s10, s11
   - BEFORE: They sit forward on a broad face built to take in sound.
   - AFTER: They sit forward on a broad face.
5. **Source:** s10, s11
   - BEFORE: Those large ears are built to hear a footstep before it becomes a threat.
   - AFTER: Those large ears sit wide on a broad face.
6. **Source:** brief (renderer string, not in data JSON) (HTML only)
   - BEFORE: is one of the most detailed of the Chinese chart systems, and it maps the Moon Bear you are becoming, not only the one you are.
   - AFTER: is one of the most detailed of the Chinese chart systems. It is a separate chart, cast from your lunar birth date and hour, not from your sign or your animal.
7. **Source:** brief (renderer string, not in data JSON) (HTML only)
   - BEFORE: The reading here is the outline your Cancer Tiger shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## cacomistle

1. **Source:** s12, s13 (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">狸</span>
   - AFTER: <span class="rail__han" aria-hidden="true">浣熊</span>
2. **Source:** s12, s13 (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">狸</span>
   - AFTER: <span class="serial-han">浣熊</span>
3. **Source:** s12, s13 (template animalHan) (JSON only)
   - BEFORE: "animalHan": "狸"
   - AFTER: "animalHan": "浣熊"
4. **Source:** s5, s6
   - BEFORE: The IUCN Red List classifies the cacomistle as <b>Least Concern, describing it as locally common across the northern part of its range</b>, yet field surveys of its own forest routinely record it as one of the least-detected mammals present, cryptic behavior rather than true scarcity.
   - AFTER: The IUCN Red List classifies the cacomistle as <b>Least Concern, yet it is rarely seen</b>: it is not common anywhere in its range, and even where it lives it is an uncommon sight.
5. **Source:** s5, s6
   - BEFORE: Even where the cacomistle is locally common, a recent survey of its own forest recorded it as one of the hardest mammals there to actually detect, cryptic rather than genuinely rare.
   - AFTER: The cacomistle is listed as Least Concern, yet it is nowhere common and seldom seen, even in its own forest.
6. **Source:** s5, s6
   - BEFORE: An animal common across two countries of forest, and still one of the hardest mammals in it to actually confirm.
   - AFTER: An animal listed as secure across its whole forest range, and still rarely seen in it.
7. **Source:** s5, s6
   - BEFORE: common across two countries of forest and still filed as a rumor
   - AFTER: secure across its whole range and still filed as a rumor
8. **Source:** s5, s6
   - BEFORE: a genuinely common animal that stays almost entirely unconfirmed, a climber built to reverse direction completely without losing its grip,
   - AFTER: a secure species that stays almost entirely unconfirmed, a climber that almost never touches the ground,
9. **Source:** s5, s6 [copies: htmlx2, v1x1]
   - BEFORE: common across the whole cloud forest, rarely confirmed
   - AFTER: at home across the whole cloud forest, rarely confirmed
10. **Source:** s5, s6
   - BEFORE: Common across the whole cloud-forest canopy, rarely confirmed
   - AFTER: At home across the whole cloud-forest canopy, rarely confirmed
11. **Source:** s5, s6 [copies: htmlx4, v1x1]
   - BEFORE: the Ringed Shadow, common across the canopy and rarely ever confirmed.
   - AFTER: the Ringed Shadow, at home across the canopy and rarely ever confirmed.
12. **Source:** s10, s5, s7, s6 (ringtail fact removed; band now states the shared name)
   - BEFORE: The reversible descent
   - AFTER: The shared name
13. **Source:** s10, s5, s7, s6
   - BEFORE: Climbers in the cacomistle's own genus can <b>rotate the hind foot nearly 180 degrees</b>, letting the pads and claws keep their grip while the whole body descends a trunk headfirst.
   - AFTER: The name cacomistle is <b>also used for its northern cousin, the ringtail</b>, a separate species. This page means Bassariscus sumichrasti, the cacomistle of southern Mexico and Central America.
14. **Source:** (reading rewritten to match the replaced fact)
   - BEFORE: You can reverse a direction completely without losing your hold on anything. Most creatures back down carefully from what they climbed; you simply <em>turn around and come down facing it</em>.
   - AFTER: People often mistake you for someone close to you. You let them, and <em>you always know which one you are</em>.
15. **Source:** s7, s8
   - BEFORE: tlacomiztli
   - AFTER: tlahcomiztli
16. **Source:** s5, s6
   - BEFORE: nearly as long as the 380 to 470 millimetre body</b>, and works as a counterweight and balance aid through fast, high branches.
   - AFTER: as long as or longer than the 380 to 470 millimetre body</b>.
17. **Source:** s5, s6
   - BEFORE: hold territories that can run past 130 hectares and
   - AFTER: hold territories of up to about 136 hectares and
18. **Source:** s5, s6
   - BEFORE: sometimes for hours at a stretch</b>, believed to mark the edges of that ground.
   - AFTER: sometimes for hours at a stretch</b>.
19. **Source:** brief (renderer string, not in data JSON) (HTML only)
   - BEFORE: is one of the most detailed of the Chinese chart systems, and it maps the Cacomistle you are becoming, not only the one you are.
   - AFTER: is one of the most detailed of the Chinese chart systems. It is a separate chart, cast from your lunar birth date and hour, not from your sign or your animal.
20. **Source:** brief (renderer string, not in data JSON) (HTML only)
   - BEFORE: The reading here is the outline your Gemini Pig shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## andean-condor

1. **Source:** s12 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">鹫</span>
   - AFTER: <span class="rail__han" aria-hidden="true">鷲</span>
2. **Source:** s12 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">鹫</span>
   - AFTER: <span class="serial-han">鷲</span>
3. **Source:** s12 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "鹫"
   - AFTER: "animalHan": "鷲"
4. **Source:** s7, s8
   - BEFORE: wingspan averages <b>3.2 meters (about 10.5 feet)</b>,
   - AFTER: wingspan reaches <b>up to about 3.3 meters (nearly 11 feet)</b>,
5. **Source:** s7, s8, s10
   - BEFORE: and can cover roughly 200 miles in a single day of searching.
   - AFTER: and can cover more than 200 kilometres in a single day of searching.
6. **Source:** s7, s8, s10
   - BEFORE: A condor can cover roughly two hundred miles in a single day
   - AFTER: A condor can cover more than two hundred kilometres in a single day
7. **Source:** brief (renderer string, not in data JSON) (HTML only)
   - BEFORE: is one of the most detailed of the Chinese chart systems, and it maps the Andean Condor you are becoming, not only the one you are.
   - AFTER: is one of the most detailed of the Chinese chart systems. It is a separate chart, cast from your lunar birth date and hour, not from your sign or your animal.
8. **Source:** brief (renderer string, not in data JSON) (HTML only)
   - BEFORE: The reading here is the outline your Capricorn Rooster shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## new-caledonian-crow

1. **Source:** s10, s11, s21
   - BEFORE: New Caledonian Crows manufacture <b>hooked tools by cutting and shaping strips of Pandanus leaves</b> — trimming the barbed edge to create a functional hook used to extract invertebrates from crevices and bark; this tool-making behavior was first documented by Hunt (1996) in Nature.
   - AFTER: New Caledonian Crows <b>carve hooks into twigs and tear barbed strips from Pandanus leaves</b>, and use both to pull invertebrates from crevices and bark. Hunt (1996) first documented this tool-making in Nature.
2. **Source:** s14, s15
   - BEFORE: Tools transported in advance
   - AFTER: Tools chosen in advance
3. **Source:** s13, s14, s15
   - BEFORE: New Caledonian Crows have been observed <b>carrying tools across sites</b> in advance of arriving at a foraging location — transporting a hook to a new area where it will be needed, rather than manufacturing one on arrival; documented by Rutz et al. (2010) in Science.
   - AFTER: New Caledonian Crows <b>plan for a specific future tool use</b>: in a trained task, crows picked the right tool for a problem they would meet 10 minutes later (Boeckle et al. 2020, Proceedings of the Royal Society B). Wild crows also keep a tool safe under a foot or in a hole between uses (Klump et al. 2015).
4. **Source:** s14
   - BEFORE: One of the most striking documented behaviors of New Caledonian Crows is transporting tools across sites — carrying a hook to a new foraging location in advance of need. The tool travels; the crow travels.
   - AFTER: New Caledonian Crows keep a good tool between uses, holding it under a foot or tucking it into a hole. The tool stays with the crow.
5. **Source:** s12, s15
   - BEFORE: carry existing tools to novel situations, and adjust technique mid-task when the first approach fails. Hunt and Gray (2003) documented that the crow's hooked tool design — a shaped barb cut from pandanus leaf — is not universal but varies by population, suggesting the design evolves in response to local conditions.
   - AFTER: pick the right tool ahead of a known task, and adjust technique mid-task when the first approach fails. Hunt and Gray (2003) documented that the crow's pandanus tool design is not universal but varies by region, and argued the designs changed step by step from one origin.
6. **Source:** s11, s12, s15
   - BEFORE: The shaped pandanus hook, the future planning of tool transport, the causal reasoning in controlled experiments, the culturally transmitted tool designs — these are what the archetype is built on.
   - AFTER: The carved twig hook and the barbed pandanus strip, the planning for a future tool use, the causal reasoning in controlled experiments, and the tool designs thought to pass on socially: these are what the archetype is built on.
7. **Source:** s16
   - BEFORE: to raise the water level and reach a reward — demonstrating understanding of physical displacement rather than associative learning; Jelbert et al. (2014) in PLOS ONE.
   - AFTER: to raise the water level and reach a reward, a sophisticated but incomplete grasp of displacement in the authors' words; Jelbert et al. (2014) in PLOS ONE.
8. **Source:** s16, s17
   - BEFORE: Taylor et al. (2009) confirmed that New Caledonian Crows demonstrate causal reasoning rather than associative learning: they understand that water rises when stones are added, inferring a physical mechanism rather than memorising a sequence. Jelbert et al. (2014) replicated the Aesop's Fable task and found the crows preferentially added sinking objects rather than floating ones — understanding displacement.
   - AFTER: Taylor et al. (2009) concluded that New Caledonian Crows reason both causally and analogically when they solve physical problems. Jelbert et al. (2014) gave crows the Aesop's Fable task and found they chose sinking objects over floating ones 88 percent of the time, a sophisticated but incomplete grasp of displacement.
9. **Source:** s17
   - BEFORE: Causal reasoning, not association
   - AFTER: Causal reasoning
10. **Source:** s17
   - BEFORE: Taylor et al. (2009) confirmed in PNAS that New Caledonian Crows <b>use causal reasoning rather than associative cues</b> when selecting tools: when the causal mechanism was masked, the crows' performance degraded in ways consistent with causal rather than statistical inference.
   - AFTER: In a trap-tube test, three of six New Caledonian Crows solved the problem, and Taylor et al. (2009, Proceedings of the Royal Society B) concluded that the crows <b>reason both causally and analogically</b>.
11. **Source:** s12, s21
   - BEFORE: Specific tool designs — including the shape of the pandanus hook and the angle of the cut — <b>differ reliably between populations</b> of New Caledonian Crows separated by geography; Hunt and Gray (2003) in Animal Cognition document this as evidence of cultural transmission through social observation.
   - AFTER: Pandanus tool designs, wide, narrow and stepped, <b>differ between regions</b> of New Caledonia. Hunt and Gray (2003), in Proceedings of the Royal Society B, studied about 5,550 tools from 21 sites; the designs are thought to pass on socially.
12. **Source:** s12 (reference DOI)
   - BEFORE: https://doi.org/10.1098/rspb.2003.2387
   - AFTER: https://doi.org/10.1098/rspb.2002.2302
13. **Source:** s18, s19
   - BEFORE: New Caledonian Crows have one of the <b>longest juvenile dependency periods</b> relative to body size among corvids — remaining with parents for up to two years while tool use is acquired through observation; this extended period is associated with the complexity of the skill being learned.
   - AFTER: New Caledonian Crows have one of the <b>longest known periods of parental feeding in birds</b>. Young can stay with their parents for up to three years, and learning to make tools takes about a year.
14. **Source:** s19
   - BEFORE: up to two years of tool-learning alongside parents
   - AFTER: up to three years alongside parents
15. **Source:** brief (renderer string, not in data JSON) (HTML only)
   - BEFORE: is one of the most detailed of the Chinese chart systems, and it maps the New Caledonian Crow you are becoming, not only the one you are.
   - AFTER: is one of the most detailed of the Chinese chart systems. It is a separate chart, cast from your lunar birth date and hour, not from your sign or your animal.
16. **Source:** brief (renderer string, not in data JSON) (HTML only)
   - BEFORE: The reading here is the outline your Virgo Monkey shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## Not applied

- Purple Star KICK_NEW / FINE_NEW: none of the five pages carries the old `pf-ziwei__kicker` / `pf-ziwei__fine` pairing block (no star assigned), so there was nothing to relabel. The only Purple Star claim on each page was the renderer pair ("maps the <Animal> you are becoming" and "The reading here is the outline your <Sign Animal> shares"), fixed in HTML with the R2 wording. The template string still needs the same fix for the other pages.
- moon-bear 熊 pinyin (xióng): the glyph only appears in `rail__han` (aria-hidden) and `serial-han`; neither has a pinyin slot nearby, so no pinyin was added. Same for the new cacomistle 浣熊 (huànxióng) and condor 鷲 (jiù). Needs a template-level pinyin slot under the header glyph.
- paradise-tanager glyph 雀: audit OK (generic). Unchanged. Hero 蛇 with no pinyin: style issue, not a fact; left.
- paradise-tanager plumage study (Price-Waldman et al. 2025, Science Advances): audit says add a citation. Not added (an addition, not a correction). Bonds lead line "the warning called out for the group" is reading copy echoing the old trait; left.
- moon-bear trait 2 reading ("You hear the shift before it arrives") and the axis reading line "You read a room by its sound" still lean on hearing. The fact lines no longer claim hearing; the readings were left as readings.
- cacomistle: trait 5 is still titled "The counterweight tail" and its reading uses the balance image; the unsourced counterweight claim was cut from the fact only. Trait 3 had to get a new fact once the ringtail foot rotation came out; it now states the ringtail name overlap (page bug in the dossier) and its reading was rewritten to fit. The ADW Bassariscus astutus source link was kept, since the band now names the ringtail. OG image text and other pages that quote "common across the canopy" were not checked or touched.
- cacomistle Water/Wood "warmth" match reasons, "a room" lines: page bugs, not fact_audit items. Left.
- andean-condor: 鹫 to 鷲 is a form fix only; the audit verdict was OK (generic). Ledge reuse and the 2,200-year nest fact (Duda et al. 2023): optional addition, not added. Proverb 金雞獨立 stance: not audited; label already says our reading.
- new-caledonian-crow glyph 烏: audit OK, traditional form already matches the site. Unchanged. Trait title "Culturally transmitted tool designs" left; the fact under it now says the designs are thought to pass on socially. The page still carries many em dashes in untouched copy (page bug); only the replaced sentences lost theirs (11 fewer). Mirror line "is not inefficiency. It is the time required" kept as is.
- 紫微斗数 in the Purple Star lead has no pinyin on all five pages (existing renderer text, not new words).

## Structure check

Section counts match backups (31/31 on all five). All JSON-LD and application/json blocks parse (4 per page). HTML tag skeleton identical to backup on all five. Every edited page parses with python html.parser. Template JSON loads and keysets are unchanged. `<!--w4-reading-->` is not present on any of the five pages. No CSS, JS or other page touched. No git run.
