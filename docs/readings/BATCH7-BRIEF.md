# Batch 7 writer brief (2026-11-08)

You write ONE OR MORE Zodi Animal readings as data files. The owner approved the Koala as the
model: read `data/readings/koala.json` (the data) and `tools/_preview/koala-reading-v1.html`
(how it renders). You match its quality and structure, never its words, images or rhythm.

## What a reading is
A fortune-teller reading for one crossing (Western sign x Chinese year animal): temperament,
love, matches, work, the animal's symbolism. Second person, specific, warm, a little uncanny.
"This sounds like me." Biology only as a short bridge, and only facts the dossier marks OK.

## Inputs (read all, READ ONLY)
- `data/research/<slug>.json` and `<slug>.md`: the dossier. Use ONLY its facts and traditions.
  Every factual or traditional sentence ends with its source marker, e.g. [s3] or [s3] [s7],
  using the dossier's exact source ids (they may look like s3, S3 or a word such as wiki-capybara). Interpretation needs no marker. Never cite an id the dossier
  does not have. Never use anything the dossier marks WRONG, UNVERIFIABLE or "do not use".
- `data/research/REVIEW-igor.md`: the voice review. Obey section C (the three rules) and the
  banned tics in section A.
- `data/research/REVIEW-mojo.md`: what is citable vs filler. Drop lucky numbers and generic
  sign/year temperament filler that would repeat on 12 pages.
- The live page `site/animals/<slug>/index.html`, to avoid repeating what it already says.

## Hard writing rules
No em or en dashes. No arrows. No "it's not X, it's Y" / "not just X but Y". No forced threes.
One idea per sentence. Plain words. Banned words: seamless, unlock, elevate, journey, empower,
embark, delve, tapestry, testament, realm, comprehensive, leverage, transform, discover.
Do NOT open lines with "You tend to", "You often", "There are times when". No "a room" settings.
Chinese characters: only with pinyin right after in parentheses, e.g. 守株待兔 (shǒu zhū dài tù).
Indigenous traditions: name the nation and source, keep to one or two sentences, never put them
in the reader's voice. No claims a tradition does not make. Never copy primalastrology.com.

## The variety ledger (assigned, follow it)
| slug | opening image | rhythm | tab labels (one is the matches tab) | story | kind of ending |
|---|---|---|---|---|---|
| marbled-polecat | 虎鼬 (hǔyòu), "tiger weasel" | bold, a warning coat | The warning coat / Up close / Who gets close anyway (matches) | the Five Great Immortals: the weasel and the rat both among them (the weasel family, not this species; say so) | boldness |
| mantis-shrimp | 蝦兵蟹將 (xiā bīng xiè jiàng): the Dragon King's shrimp soldiers (shrimp in general) | punchy, precise | The strike / Colours no one sees / Who sees your colours (matches) | monogamous species keep one partner up to 20 years | loyalty |
| rhinoceros-hornbill | Iban Gawai Kenyalang: the carved hornbill raised on a pole to carry messages (Met Museum) | ceremonial, loud | The messenger / Walled in / Who brings you food (matches) | the carved figure sent off to fly away carrying misfortune (Penn Museum) | blessing |
| platypus | upper Darling River story: the platypus refuses to join any single totem group, "an act of diplomacy" (WWF-Australia; nation not named, say so) | odd, diplomatic | Not one thing / Under the water / Who takes you as you are (matches) | 1799: scientists suspected a duck's bill sewn onto a beaver-like body | belonging to yourself |
| spotted-cuscus | people sometimes mistake it for a monkey (an honest link to the Monkey year) | slow, gentle | Slow / Mistaken / Who sees your spots (matches) | Austronesian boats probably carried it to Selayar (Heinsohn 2002) | travel |
| sandgrouse | chicks drink from the male's soaked breast feathers; reported 1896, disbelieved until 1967 | dry, devoted | The carry / The long flight / Who you bring water to (matches) | the Jazan saying: "If you see a sandgrouse, water is near" (Arab News) | provision |
| narwhal | Inuit story: the cruel mother dragged under on a harpoon line, her hair twisted into the tusk (Smithsonian) | cold, mythic | The tusk / The ice / Who surfaces with you (matches) | the Danish coronation chair, sold as unicorn horn | a crown |
| mountain-pygmy-possum | known only as a fossil until skiers found one alive in a Mt Hotham hut in 1966 | small, surprising | Back from stone / The long sleep / Who crosses the road for you (matches) | the road "tunnel of love" that lets males reach females; 狡兔三窟 (jiǎo tù sān kū) and its dozen winter dens (Rabbit) | rediscovery |
| roseate-spoonbill | tlauhquechol: in Molina's 1571 dictionary also "rich vermilion feather" | sweeping, pink | The sweep / Colour / Who wades with you (matches) | about two dozen Gulf Coast pairs left around 1920, and the comeback (NWF) | recovery |
| rock-wren | Hopi story (Voth 1905): Wren beats Coyote with a stone dressed in its own skin ("wren", say so) | small, stony, quick | Stones / One branch / Who shares your ledge (matches) | nests paved with about 230 stones | smallness as strength |

Tab ids: short lowercase words, unique within the page. The matches tab gets "matches": true and
a "love_lead". Do not use the labels "In love", "As a friend", "In family", "At work" (the page's
bonds tabs already use them).

## Matches
3 easy matches and 0 or 1 hard match (more or fewer only if the evidence says so), chosen from
the dossier's best_matches / hard_matches. Each needs a traditional reason (trine, secret friend,
clash, element harmony, opposite sign) with a source marker. Use real slugs from GRID
(`site/js/modules/zodi-map.js`). "chips": two short tags. "why": one sentence with the animal's
name in <b>.

## Output
Write `data/readings/<slug>.json` with exactly the keys koala.json uses (title, is_this_you
{pressure, love, cost}, opener {moon, text}, howto, tabs, matches {easy, hard}, story {k, text},
closing). "is_this_you": three NEW lines, 40 to 60 words total. Title: "What the <Animal> means"
or a variant that fits (e.g. "What the Raven knows"). Total reading 450 to 650 words; let the
evidence decide length.

Batch 1 is live-ready (12 readings in data/readings/). Read two of them so you do not echo their images or lines. Then run, and fix until "issues: none" (this checks your page against all 12 batch-1 readings too):
  python3 tools/build-readings.py "$HOME/mnt/Projects--Primal Animal" koala raven star-nosed-mole arctic-tern luna-moth slow-loris pronghorn kea capybara harpy-eagle snow-leopard golden-pheasant <slug> --check
Then:
  python3 tools/build-readings.py "$HOME/mnt/Projects--Primal Animal" <slug> --preview

## Access
Jay's Mac via `mcp__remote-devices__device_bash` (load with ToolSearch
"select:mcp__remote-devices__device_bash"). Root `$HOME/mnt/Projects--Primal Animal`.
Write ONLY `data/readings/<slug>.json` and the preview the builder makes. Never edit site/.
Never run git.

Return (200 words or fewer per animal): word count, the three is_this_you lines, the
gate result, and anything you could not source.

## Extra rule for batch 2
No hard match may repeat an animal already used as a hard match in batch 1 unless the tradition clearly calls for it. Do not reuse batch 1 closing lines or tab labels.

## Extra rules for batch 7
- Read three existing readings first so you do not echo them.
- Run --check with EVERY slug that has a file in data/readings/*.json (ls them) plus yours, so you are checked against all of them. Other batches are being written at the same time; a final combined check will catch late overlaps.
- Avoid hard matches already used in data/readings (check their "hard" lists) unless the animal naming YOU as its hard match is a true clash for you.
- No closing line, tab label or story may repeat one already used.
- These pages just had a fact pass (data/research/FACTFIX-R7-A.md / -B.md). Use only corrected facts.
- Purple Star: never claim a star pairing is traditional. The sharing buttons render automatically.
