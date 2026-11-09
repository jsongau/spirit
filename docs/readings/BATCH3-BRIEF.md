# Batch 3 writer brief (2026-11-08)

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
| giant-otter | the Shuowen defines 獭 (tǎ) as "like a small dog": the Dog year was in the name all along (no moon) | loud, warm, family noise | The watch / Your pack (matches) / Who you would fight for | Irish names for the otter, madra uisce and dobharchú, "water dog" and "water hound" (credit: otters in general) | loyalty |
| superb-bird-of-paradise | the super-black feathers that make the colour beside them look brighter (McCoy 2018) | theatrical, a performance in beats | Your stage / The dark around you / Who you dance for (matches) | plumes as bride-price and funeral wealth among the Gimi and Wahgi (birds of paradise in general, say so) | applause |
| sunset-moth | in Malagasy, lolo means both butterfly and ghost | luminous, a little eerie | First light / What draws you / Who you glow for (matches) | the heavenly rooster 天雞 (tiān jī) that crows when first sun strikes the Taodu tree | dawn |
| shoebill | abu markub, "father of the shoe" | deadpan, very still, long pauses | Stillness / The long wait / Who shares your marsh (matches) | Yu the Great's iron oxen set by the water as flood guardians | patience rewarded |
| regal-jumping-spider | 蠅虎 (yínghǔ), "fly tiger": the Leo cat hiding in a small body | quick, precise, measured jumps | The leap / What you measure / Who catches your eye (matches) | 喜子 (xǐzi): a spider dropping on its thread means joy falling from the sky | a jump |
| paradise-tanager | siete colores, "seven colours" | bright, social, chattering | Seven colours / Your crowd / Who you shine beside (matches) | its feathers set into pre-Columbian Peruvian crowns of the high-ranked (The Met) | belonging |
| moon-bear | Japanese hunters: the crescent was left by the mountain god's amulet (Knight 2008) (moon disc allowed) | quiet, sacred, slow | The crescent / The cave / Who you let in (matches) | Korea's Tangun myth: the bear stays in the cave, the tiger walks out (Britannica says "bear" only) | endurance |
| cacomistle | tlahcomiztli, Nahuatl for "half-puma" | nocturnal, talkative, wry | Half puma / Night talk / Who answers you (matches) | NO myth exists (say plainly the old stories left it out); use its hours-long calls between neighbours | an answer in the dark |
| andean-condor | Andean myth: the condor of the sun, ruler of the upper world | slow, high, patient (NOT monumental; Bearded Vulture used that) | The high air / What you share / Who flies level with you (matches) | the rooster's five virtues: it calls the others when it finds food (Han Shi Wai Zhuan) | generosity |
| new-caledonian-crow | Aesop's crow and the pitcher, tested on this exact species (Jelbert 2014) | puzzle-like, step by step | How you think / What you were taught / Who you make things with (matches) | 烏鳥私情 (wū niǎo sīqíng): the crow that feeds its old parent | gratitude |

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

## Extra rules for batch 3
- 20 readings already exist (batch 1 and 2). Read three of them first so you do not echo them.
- The --check command must include ALL existing slugs plus yours:
  python3 tools/build-readings.py "$HOME/mnt/Projects--Primal Animal" koala raven star-nosed-mole arctic-tern luna-moth slow-loris pronghorn kea capybara harpy-eagle snow-leopard golden-pheasant honey-badger aardwolf sea-otter red-panda sand-cat bearded-vulture maned-wolf whale-shark <slug> --check
- Hard matches already used (avoid unless the tradition clearly demands it): african-grey-parrot, andean-condor, cacomistle, coconut-crab, devils-flower-mantis, giant-clam, giant-otter, glass-frog, golden-snub-nosed-monkey, green-sea-turtle, harpy-eagle, hoatzin, lanner-falcon, orca, paradise-tanager, raven, regal-jumping-spider, rock-wren, shoebill, tuatara.
- No closing line, tab label or story may repeat one already used. The Bearded Vulture already used "nests used for centuries"; do not use the condor's 2,200-year nest as the story.
- These pages just had a fact pass (data/research/FACTFIX-R3-A.md / -B.md). Use the corrected facts, never the old ones.
- Purple Star: never claim a star pairing is traditional.
- The sharing buttons render automatically; do not write share copy.
