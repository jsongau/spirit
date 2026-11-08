# FACTFIX-R2-A change log

Date: 2026-11-08. Pages: honey-badger, aardwolf, sea-otter, golden-pheasant, red-panda.
Source of truth: `data/research/<slug>.json` fact_audit. Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that exist (v1 and v2 for the first four; red-panda has v2 only) unless marked HTML only or JSON only.
Backups of the original pages: `~/factfix-backup-r2/<slug>.html`; original template JSON in `~/factfix-backup-r2/tpl/` (both outside the repo).
Glyphs use traditional forms to match the pages (國, 見, 語, 豬 etc.) and the arctic-tern 燕鷗 precedent.

## honey-badger

1. **Source:** zhwiki-mihuan, chinasage (header glyph; rail__han, serial-han, template `animalHan`)
   - BEFORE: 獾
   - AFTER: 蜜獾
2. **Source:** bbcwild, lipress
   - BEFORE: Honey badgers have been documented <b>surviving bites from venomous snakes</b>, collapsing as though dead for a period before reviving; research
   - AFTER: Honey badgers have been documented <b>surviving bites from venomous snakes</b>, and one has been seen recovering within hours from a puff adder bite to the face; research
3. **Source:** adw, begg-thesis, reddata, sanbi, begg2003
   - BEFORE: very large home ranges, recorded up to roughly <b>500 square kilometres</b> in parts of the Kalahari, and an individual can cover <b>20 to 30 kilometres in a single day</b> moving between den sites.
   - AFTER: very large home ranges. A male's range averages more than <b>500 square kilometres</b> in parts of the Kalahari, and a male can cover <b>more than 25 kilometres in a single day</b> moving between den sites.
4. **Source:** sanbi, adw, begg2003
   - BEFORE: covering twenty to thirty kilometres in a single day between den sites.
   - AFTER: and a male can cover more than twenty-five kilometres in a single day between den sites.
5. **Source:** begg2003
   - BEFORE: more than sixty different prey species
   - AFTER: about sixty different prey species

## aardwolf

1. **Source:** s12, s6 (header glyph; rail__han, serial-han, template `animalHan`)
   - BEFORE: 狼
   - AFTER: 土狼
2. **Source:** (none; note's own rephrase)
   - BEFORE: and eats more than any of them.
   - AFTER: and eats more individual prey than any of them.
3. **Source:** s6, s7
   - BEFORE: feeding almost exclusively on harvester termites
   - AFTER: feeding mostly on harvester termites
4. **Source:** s6, s7
   - BEFORE: <b>pasting a black secretion onto grass stalks</b>
   - AFTER: <b>pasting a secretion onto grass stalks</b>
5. **Source:** s6, s7
   - BEFORE: sometimes over 200 times in a single night, especially along a territory's edges.
   - AFTER: sometimes over 200 times in a single night.
6. **Source:** s6
   - BEFORE: <b>by the sound of soldiers drumming inside the mound</b> and by scent,
   - AFTER: <b>by sound</b> and by the scent of soldier termites,
7. **Source:** s6
   - BEFORE: find a termite colony by the sound of soldiers drumming inside the mound and the smell of their alarm secretion,
   - AFTER: find termites by sound and by the scent their soldiers give off,
8. **Source:** s6, s7
   - BEFORE: holds the same one to four square kilometres for years,
   - AFTER: holds the same one to four square kilometres,
9. **Source:** s6, s7
   - BEFORE: holds a territory of one to four square kilometres for years,
   - AFTER: holds a territory of one to four square kilometres,

## sea-otter

1. **Source:** adw, wiki-otter
   - BEFORE: and animals resting side by side will link paws or wrap themselves in strands of kelp so the group
   - AFTER: and animals resting side by side wrap themselves in strands of kelp, and are sometimes seen holding paws, so the group
2. **Source:** adw, wiki-otter
   - BEFORE: with a favorite rock held against its chest.
   - AFTER: with a rock held against its chest.
3. **Source:** adw, wiki-otter
   - BEFORE: a tool-user that keeps one rock for years,
   - AFTER: a tool-user that keeps the same rock for many dives,
4. **Source:** adw, wiki-otter, natgeo-tools
   - BEFORE: Many sea otters keep a <b>single favorite rock in a loose pouch of skin under one forearm</b>, carrying it between dives and reusing it for years as a hammer or anvil to open shellfish.
   - AFTER: Many sea otters keep a <b>rock in a loose pouch of skin under one forearm</b>, carrying it between dives and reusing it for many dives as a hammer or anvil to open shellfish.
5. **Source:** adw
   - BEFORE: A tool kept for years, not one used once and dropped
   - AFTER: A tool kept for many dives, not one used once and dropped
6. **Source:** wiki-otter, mbay, adw
   - BEFORE: close to a million hairs per square inch
   - AFTER: up to about a million hairs per square inch
7. **Source:** adw, mbay, wiki-otter
   - BEFORE: <b>unchecked urchins can reduce a forest to bare rock within years</b>.
   - AFTER: <b>unchecked urchins can turn a forest into urchin barrens</b>.
8. **Source:** (none; attribution cut)
   - BEFORE: You find, the way the old proverb has it, that a hand held loosely
   - AFTER: You find that a hand held loosely
9. **Source:** brief (HTML only: renderer string, not in data JSON)
   - BEFORE: is one of the most detailed of the Chinese chart systems, and it maps the Sea Otter you are becoming, not only the one you are.
   - AFTER: is one of the most detailed of the Chinese chart systems. It is a separate chart, cast from your lunar birth date and hour, not from your sign or your animal.
10. **Source:** brief (HTML only: renderer string, not in data JSON)
   - BEFORE: The reading here is the outline your Cancer Rabbit shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## golden-pheasant

1. **Source:** s19, s20, s9 (header glyph; rail__han, serial-han, template `animalHan`)
   - BEFORE: 雉
   - AFTER: 錦雞
2. **Source:** s18 (HTML reference list)
   - BEFORE: <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7912351/" rel="noopener">Zhang et al. · Cape feather coloration and MHC genotype in male golden pheasants</a>
   - AFTER: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC7912351/" rel="noopener">Liu et al. · Cape feather coloration signals MHC genotype in male golden pheasants</a>
3. **Source:** s18 (JSON only)
   - BEFORE: Zhang et al. · Cape feather coloration and MHC genotype in male golden pheasants
   - AFTER: Liu et al. · Cape feather coloration signals MHC genotype in male golden pheasants
4. **Source:** s18 (JSON only)
   - BEFORE: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7912351/
   - AFTER: https://pmc.ncbi.nlm.nih.gov/articles/PMC7912351/
5. **Source:** s16, s15
   - BEFORE: fanning the tail and circling the hen.
   - AFTER: fanning the tail as he displays to the hen.
6. **Source:** s17, s15, s16, s18
   - BEFORE: <b>secretive to the point of near-invisibility</b>, keeping to dense undergrowth where it is rarely seen even where it is common.
   - AFTER: <b>shy and hard to find</b>, keeping to dense undergrowth.
7. **Source:** s15, s16
   - BEFORE: <b>climbs into the canopy to roost at night</b>, sleeping above everything that walks.
   - AFTER: <b>roosts in trees at night</b>.
8. **Source:** s15, s16
   - BEFORE: climbs to roost above everything at night.
   - AFTER: roosts in trees at night.
9. **Source:** s21
   - BEFORE: its guardian is a black antelope,
   - AFTER: its guardian is an antelope,

## red-panda

1. **Source:** s12, s11, s8 (header glyph; rail__han, serial-han, template `animalHan`)
   - BEFORE: 貍
   - AFTER: 小熊貓
2. **Source:** s9, s6, s10, s18
   - BEFORE: The red panda is the <b>only living species in its own taxonomic family</b>, Ailuridae, with no close living relatives among bears, raccoons, or true pandas.
   - AFTER: The red panda is the <b>only living member of its own family</b>, Ailuridae. Its nearest relatives are the weasel, raccoon and skunk families, not bears or the giant panda.
3. **Source:** s9, s8, s6
   - BEFORE: Red pandas mark out large, overlapping home ranges using <b>anal gland secretions and urine along regular routes</b>, defending the territory through signal rather than confrontation.
   - AFTER: Red pandas mark out their home ranges using <b>anal gland secretions and urine along regular routes</b>.
4. **Source:** s10, s8, s9
   - BEFORE: The banded tail, nearly as long as the body, is <b>wrapped around the animal while it sleeps</b>, insulating it through cold nights in the high-altitude forest.
   - AFTER: The banded tail runs about two thirds to three quarters the length of the body. Asleep, the animal <b>curls up with its tail over its face</b> against the cold of the high-altitude forest.
5. **Source:** s8, s10, s9
   - BEFORE: When alarmed, a red panda often <b>rears onto its hind legs with front paws raised</b> rather than fleeing immediately, a bluff display before it runs.
   - AFTER: When threatened, a red panda may <b>stand up on its hind legs and strike out with its sharp claws</b>. It can also climb a tree to escape.
6. **Source:** s4
   - BEFORE: Comfort with solitude, and a low tolerance for being managed
   - AFTER: An easy way of making friends, though seldom letting many in deeply
7. **Source:** brief (HTML only: renderer string, not in data JSON)
   - BEFORE: is one of the most detailed of the Chinese chart systems, and it maps the Red Panda you are becoming, not only the one you are.
   - AFTER: is one of the most detailed of the Chinese chart systems. It is a separate chart, cast from your lunar birth date and hour, not from your sign or your animal.
8. **Source:** brief (HTML only: renderer string, not in data JSON)
   - BEFORE: The reading here is the outline your Libra Rat shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## Not applied

- Purple Star star pairings (honey-badger 七殺/貪狼, aardwolf 天同/太陰), Bond Test 牛, Primal Zodiac wording, Jan/Feb lunar note: skipped per brief.
- honey-badger activity line (season also drives the day/night shift): an addition, not a correction. Left as is.
- aardwolf two-species nuance (eLife): optional addition. Not added.
- sea-otter glyph 獭: audit verdict OK. Unchanged.
- red-panda power moon Waning Crescent: unlabeled site framework shared by all 144 pages. Needs a template-level label, not a one-page edit.
- 'maps the <Animal> you are becoming' and 'The reading here is the outline your <Sign Animal> shares' appear on all 144 pages and come from the renderer. Fixed in HTML on sea-otter and red-panda only; the template string still needs the same fix.

## Structure check

Section counts match backups (33/33/31/31/31). All JSON-LD and application/json blocks parse (4 per page). HTML tag skeleton identical to backup except the golden-pheasant reference href. Template JSON keysets unchanged.
