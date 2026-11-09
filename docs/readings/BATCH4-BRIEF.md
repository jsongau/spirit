# Batch 4 writer brief (2026-11-08)

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
| lanner-falcon | I Ching hexagram 40, top line: a prince shoots a falcon on a high wall; archer and falcon in one line (no moon) | swift, aimed, short | The aim / Open country / Who hunts beside you (matches) | Shijing 采芑 (Cǎi Qǐ): the falcon soars to heaven, then settles back in its place | a landing |
| galapagos-tortoise | Liji 麟鳳龜龍 (lín fèng guī lóng): tortoise and dragon named together among the four sacred creatures | slow, ancient, unhurried | The long view / What you carry / Who walks with you (matches) | Bixi 贔屭 (bìxì), the dragon's son in tortoise form who carries stone steles | permanence |
| three-wattled-bellbird | in Honduras the "coffee bird": its call tells farmers the harvest is near (Bonta 2003) | ringing, call and answer | Your call / The song that changes / Who hears you (matches) | Costa Rica named a 1992 corridor and its Bicentennial reserve after it | an echo |
| snowy-owl | the Shang owl cult: Fu Hao's bronze owl vessels, about 1200 BC (owls in general, say so) | white, cold, precise | The white field / The boom years / Who keeps watch with you (matches) | Ookpik, Jeannie Snowball's sealskin owl that stood for Canada in 1963 (species not stated) | stillness after snow |
| pangolin | the Lele pangolin cult, the village's most senior; the pangolin as go-between (Mary Douglas) | shy, armoured, gentle | The armour / The go-between / Who you uncurl for (matches) | Jindwi (Zimbabwe): the steps a released pangolin takes count the finder's good years (Mongabay) | good luck |
| orca | 虎鯨 (hǔjīng), "tiger whale"; the Tiger sits in the Horse's own trine (that link is our reading) | powerful, family, rolling | The pod / What the elders know / Who swims in your wake (matches) | Ainu Repun Kamuy, the offshore sea god as an orca, who throws whales ashore as gifts | a gift |
| green-sea-turtle | 海歸 (hǎiguī), "returned from overseas", a pun on 海龜 (hǎiguī), sea turtle | tidal, homecoming | The way home / The lost years / Who you come back to (matches) | Urashima Tarō: a turtle carries a fisherman to the Dragon Palace; he returns 300 years later | homecoming (NOT "a return", used) |
| giant-manta-ray | Hawaiian hāhālua, "two breaths"; the deep divers of the Kumulipo | gliding, wide, calm | Two breaths / The deep / Who glides with you (matches) | its Chinese names: 蝠鱝 (fúfèn) "bat ray", 鬼蝠魟 (guǐfúhóng) "ghost bat ray" | grace |
| beluga | NOC, the beluga that spoke without training (Ridgway 2012) | chatty, musical | Your voice / The slow whitening / Who sings back (matches) | Inuvialuit legend: the stepmother thrown into the sea who became the beluga; her complaining gave it the name qilalukkat (credit the Canadian Museum of Nature) | a song |
| bar-headed-goose | Su Wu herding sheep 19 years; the goose that carried his letter, 雁足傳書 (yàn zú chuán shū) | high, enduring, steady wingbeats | The high pass / The letter / Who flies in your line (matches) | the hamsa (Salim Ali, 1979): Saraswati's mount, which separates milk from water | faithfulness |

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

## Extra rules for batch 4
- 30 readings already exist. Read three first so you do not echo them.
- The --check command must include ALL existing slugs plus yours:
  python3 tools/build-readings.py "$HOME/mnt/Projects--Primal Animal" koala raven star-nosed-mole arctic-tern luna-moth slow-loris pronghorn kea capybara harpy-eagle snow-leopard golden-pheasant honey-badger aardwolf sea-otter red-panda sand-cat bearded-vulture maned-wolf whale-shark giant-otter superb-bird-of-paradise sunset-moth shoebill regal-jumping-spider paradise-tanager moon-bear cacomistle andean-condor new-caledonian-crow <slug> --check
- Avoid hard matches already used: african-grey-parrot, andean-condor, axolotl, cacomistle, coconut-crab, devils-flower-mantis, giant-clam, giant-manta-ray, giant-otter, glass-frog, glasswing-butterfly, golden-snub-nosed-monkey, green-sea-turtle, harpy-eagle, hoatzin, honey-badger, lanner-falcon, leopard-seal, maned-wolf, orca, pallass-cat, paradise-tanager, raven, regal-jumping-spider, rock-wren, sand-cat, sea-otter, shoebill, snowy-owl, tuatara. Exception: if the animal that names YOU as its hard match is a true clash for you, naming it back is fine.
- No closing line, tab label or story may repeat one already used.
- These pages just had a fact pass (data/research/FACTFIX-R4-A.md / -B.md). Use only corrected facts. Bar-headed goose: never "over Everest" or 29,000 ft.
- Pangolin: never present medicinal claims as true.
- Purple Star: never claim a star pairing is traditional. The sharing buttons render automatically.
