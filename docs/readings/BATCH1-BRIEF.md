# Batch 1 writer brief (2026-11-08)

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
  using the dossier's source ids. Interpretation needs no marker. Never cite an id the dossier
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
| slug | opening image | rhythm | tab labels (3 or 4, one is the matches tab) | story | kind of ending |
|---|---|---|---|---|---|
| raven | Odin's two ravens, Thought and Memory (no moon disc) | clipped, fragments allowed | Thought / Memory / Who you trust / Where your mind earns | Apollo's raven turned black | a turn |
| star-nosed-mole | Zhuangzi's mole that drinks only a bellyful | precise, short declaratives, textures | How you read the dark / What enough means / Who you let close | Zuni mole fetish (credited) | a stillness |
| arctic-tern | Du Fu's one gull between heaven and earth | long travelling sentences | The long way round / Where you land / Who waits for you | Liezi's seabirds that land near the guileless | a return |
| luna-moth | the moth-antennae brow of the Book of Songs (beauty) | lyrical, night images | How you shine / The flame / Who you choose by moonlight | the moth that throws itself into the flame (idiom) | a warning turned blessing |
| slow-loris | Borneo belief: lorises guard the gate of heaven | slow, suspenseful | The quiet one / What you keep in reserve / Who gets past the gate / Your craft | malu malu, "shy one" | protective |
| pronghorn | Mars is the Fire Star in Chinese; 2026 is a Fire Horse year | fast, kinetic, short bursts | Speed / Who can keep pace / Where to run | Arapaho antelope-horn charms for speed | forward motion |
| kea | the kea as guardian, named for its own call | playful, wry | Curiosity / Your flock / Trouble worth making | blamed and bountied, then Bird of the Year | wry |
| capybara | the name that means water lover; the warm onsen | warm, unhurried | Your calm / Your table / Who sits beside you | the onsen capybaras of 1982 | an invitation |
| harpy-eagle | named for the Greek wind spirits | grand, regal, few long paragraphs | Your height / Your throne tree / Who rules beside you | eagle and bear: the picture pun for hero | a command |
| snow-leopard | Milarepa shown as a snow leopard | sparse, mountain silence, white space | Above the line / The hunt you share / Who finds you | the Ladakhi snow leopard that left a kill at a yogi's cave | silence |
| golden-pheasant | the court rank badge of the Ming and Qing | ornate but crisp, courtly | Your colours / Your court / Who you dress for | Emperor Huizong's painting and its five virtues | dignity |

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

Then run, and fix until "issues: none":
  python3 tools/build-readings.py "$HOME/mnt/Projects--Primal Animal" <slug> --check
Then:
  python3 tools/build-readings.py "$HOME/mnt/Projects--Primal Animal" <slug> --preview

## Access
Jay's Mac via `mcp__remote-devices__device_bash` (load with ToolSearch
"select:mcp__remote-devices__device_bash"). Root `$HOME/mnt/Projects--Primal Animal`.
Write ONLY `data/readings/<slug>.json` and the preview the builder makes. Never edit site/.
Never run git.

Return (200 words or fewer per animal): word count, the three is_this_you lines, the
gate result, and anything you could not source.
