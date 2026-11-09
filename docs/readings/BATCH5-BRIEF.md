# Batch 5 writer brief (2026-11-08)

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
| albatross | Coleridge's Rime: the bird hailed "as if it had been a Christian soul" (Project Gutenberg text) | long gliding sentences | The open ocean / What hangs on you / Who rides the wind with you (matches) | Parihaka: in one Taranaki Whanui account an albatross dropped the feather that became the Raukura, emblem of peaceful resistance (name the source) | peace |
| tasmanian-devil | the Lake Nitchie burial: a man about 6,820 years ago wore a necklace of 178 devil teeth | raw, loud, short | The scream / What you will not let go / Who can take your bite (matches) | its palawa kani name, purinina; settlers heard hellhounds in its night screams | fierceness honoured |
| satin-bowerbird | Darwin's "best evidence" that birds have a taste for beauty (Descent of Man) | curated, precise, collector's eye | Your bower / Blue / Who you build for (matches) | Australian slang "bower-bird": a collector of trifles (Green's Dictionary of Slang) | taste |
| paradise-riflebird | named for the Rifle Brigade's dark uniform | martial, flashy, crisp | Your uniform / The display / Who you open your wings for (matches) | the female rims her nest with shed snake skins | protection |
| pallass-cat | 兔猻 (tùsūn): the Rabbit is in its own Chinese name (origin disputed; say so) | cold, still, wry | The cold face / Patience / Who gets close (matches) | the Vietnamese zodiac puts the Cat in the Rabbit's place | quiet pride |
| meerkat | "selfish sentinels": they take the lookout once they have eaten their fill (Clutton-Brock 1999) | busy, communal, quick | The lookout / Lessons / Who has your back (matches) | helpers teach pups with de-stung scorpions first (Thornton and McAuliffe 2006) | community |
| leopard-seal | males sing for hours, songs about as predictable as nursery rhymes (2025 study) | slow, low, sonorous | Your song / Under the ice / Who you surface for (matches) | Owha, named by Ngati Whatua ki Orakei in 2016, "treasured gift from our ancestors" | being named |
| glasswing-butterfly | espejitos, "little mirrors" (its Spanish name) | transparent, light | Clear wings / What you let through / Who sees through you (matches) | Zhuangzi's butterfly dream, 物化 (wù huà) | transparency |
| deep-sea-anglerfish | for years scientists caught only females; in 1922 the attached males were taken for her young | dark, intimate, slow reveal | The lure / In the dark / Who you hold for life (matches) | the light comes from seawater bacteria she gathers as she matures (Baker 2019) | devotion |
| axolotl | Xolotl refused sacrifice and fled as maize, maguey, then axolotl (Florentine Codex) | playful, strange | Staying young / What grows back / Who keeps you as you are (matches) | the axolotl 50-peso note, Bank Note of the Year 2022 | renewal |

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

## Extra rules for batch 5
- 40 readings already exist. Read three first so you do not echo them.
- The --check command must include ALL existing slugs plus yours:
  python3 tools/build-readings.py "$HOME/mnt/Projects--Primal Animal" aardwolf andean-condor arctic-tern bar-headed-goose bearded-vulture beluga cacomistle capybara galapagos-tortoise giant-manta-ray giant-otter golden-pheasant green-sea-turtle harpy-eagle honey-badger kea koala lanner-falcon luna-moth maned-wolf moon-bear new-caledonian-crow orca pangolin paradise-tanager pronghorn raven red-panda regal-jumping-spider sand-cat sea-otter shoebill slow-loris snow-leopard snowy-owl star-nosed-mole sunset-moth superb-bird-of-paradise three-wattled-bellbird whale-shark <slug> --check
- Hard matches already used (avoid unless the animal that names YOU as its hard match is a true clash for you): aardwolf, african-grey-parrot, andean-condor, archerfish, axolotl, bar-headed-goose, cacomistle, coconut-crab, deep-sea-anglerfish, devils-flower-mantis, duetting-frog, giant-clam, giant-manta-ray, giant-otter, glass-frog, glasswing-butterfly, golden-snub-nosed-monkey, green-sea-turtle, harpy-eagle, hoatzin, honey-badger, kea, lanner-falcon, leopard-seal, maned-wolf, marbled-polecat, moon-bear, orca, pallass-cat, paradise-tanager, raven, regal-jumping-spider, rock-wren, sand-cat, sea-otter, shoebill, snowy-owl, tasmanian-devil, three-wattled-bellbird, tuatara.
- No closing line, tab label or story may repeat one already used.
- These pages just had a fact pass (data/research/FACTFIX-R5-A.md / -B.md). Use only corrected facts.
- Leopard seal: 猛虎藏爪 is not a real idiom; never use it.
- Purple Star: never claim a star pairing is traditional. The sharing buttons render automatically.
