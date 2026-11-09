# Batch 2 writer brief (2026-11-08)

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
| slug | opening image | rhythm | tab labels (3 or 4, one is the matches tab) | story | kind of ending |
|---|---|---|---|---|---|
| honey-badger | 獾 (huān, badger) sounds like 欢 (huān, joy); a pair of badgers means a happy marriage | blunt, punchy, funny | Fearless / Your joy / Who stands with you | the venom shield it shares with the pig (sourced biology) or its nickname 平头哥 (píngtóugē) | a grin |
| aardwolf | "earth wolf" in two languages: Afrikaans and 土狼 (tǔláng) | gentle, nocturnal, understated | Night work / The misread one / Who sees you | farmers who blamed it for what jackals did | quiet vindication |
| sea-otter | the Alutiiq legend of the man caught by the tide (NO moon opener; the Koala already uses the Moon and the Jade Rabbit) | tidal, rocking, gentle repetition | Holding on / Your raft / Who floats beside you | Alutiiq hunters returning the bones so the otters come back | a holding |
| red-panda | Bhutan: the red panda as a reborn monk, a sighting as a good omen | balanced pairs, symmetric sentences | The balance / Your branch / Who shares your branch | its other names: 火狐 (huǒhú, fire fox) and the nine-ringed tail | a blessing |
| sand-cat | Ra as a great tomcat slaying the chaos serpent | dry, spare, desert wanderer | The wanderer / What you hunt / Who crosses the dunes with you | 猫 (māo) sounds like 耄 (mào), old age: the cat as a long-life wish | the horizon |
| bearded-vulture | the Persian Huma, whose shadow was said to crown kings | monumental, slow | The long climb / What you break open / Who you build with | nests used for centuries | legacy |
| maned-wolf | guará, the Tupi word for red | offbeat, long-legged, a little odd | The odd one / Two of you, apart / Your ground | Brazilian luck charms and the R$200 note; the idiom 一山不容二虎 (yī shān bù róng èr hǔ) | belonging on your own terms |
| whale-shark | the carp that leaps the Dragon Gate, 鯉魚跳龍門 (lǐyú tiào lóngmén) | oceanic, vast, slow | Your size / What you take in / Who swims near you | the Ebisu shark of Japanese fishermen, or the Kenyan coins on its back | generosity |

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
