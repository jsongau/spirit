# Batch 6 writer brief (2026-11-08)

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
| asian-elephant | Queen Maya's dream of a six-tusked elephant (Met Museum, Gandhara relief) | steady, maternal, slow | The herd / What you carry home / Who you let into the herd (matches) | 曹沖稱象 (Cáo Chōng chēng xiàng): the boy who weighed an elephant by boat and waterline | steadiness |
| archerfish | 含沙射影 (hán shā shè yǐng): the water creature said to spit sand; today it means attacking by insinuation (the Virgo critic's shadow) | precise, measured | The shot / Reading the surface / Who shares your pool (matches) | early naturalists gave the shooting trick to the copperband butterflyfish | accuracy |
| wolverine | 虎頭蛇尾 (hǔ tóu shé wěi), a tiger's head and a snake's tail, and Aries starting ten jobs: one shared shadow, named kindly | blunt, gritty | The charge / Finishing / Who stays the distance (matches) | Innu Kuekuatsheu, the trickster who helps rebuild the world after the flood | stamina |
| weaverbird | females accept only nests still green, built in the last few days (Weaver Watch) | industrious, quick hands | The nest / Starting over / Who moves in (matches) | Indian folk belief: the baya weaver sets fireflies on mud inside its nest (the mud is real) | craft |
| vampire-squid | Flusser and Bec's fable of the vampire squid as humanity's counterpart | dark, gentle, inverted | Below the light / What drifts down / Who finds you in the dark (matches) | its glowing particles that last up to nine minutes (Robison 2003) | gentleness |
| tuatara | the Ngātiwai iwi as guardians, partners on the 2020 genome | ancient, very slow | The third eye / Slow time / Who guards with you (matches) | Te Ara (Bradford Haami): tuatara released near burial caves to guard the dead | guardianship |
| tibetan-blue-bear | the yeti: "teh" traced to Tibetan dred, bear; Hillary's 1960 "yeti fur" was blue bear pelt | mountain, mythic | The legend / The high cold / Who sees the real you (matches) | 藏馬熊 (zàng mǎxióng), "Tibetan horse bear"; the Horse is in the Dog's trine (our reading) | being seen |
| swift | the martlet: the footless heraldic bird for a younger son making his own way | fast, airborne | Never landing / Your own way / Who flies your sky (matches) | the Beijing swift, 600 years on 正陽門 (Zhèngyáng Mén), model for the 2008 mascot Nini | home in the air |
| superb-lyrebird | D'harawal: Wiritjiribin, the old woman who led children through bushfire and became the first lyrebird (Bodkin) | layered voices, mimicry | Every voice / Your own song / Who hears the real one (matches) | Yuin story (Uncle Warren Ngarrae Foster, Australian Museum): the lyrebird gets the voice for telling the truth | truth |
| sun-bear | sun bears copy each other's faces exactly though they live alone (Taylor 2019) | warm, small, mirroring | The mirror face / Sitting high / Who you mirror (matches) | basindo nan tenggil, "he who likes to sit high" | warmth |

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

## Extra rules for batch 6
- Read three existing readings first so you do not echo them.
- Run --check with EVERY slug that has a file in data/readings/*.json (ls them) plus yours, so you are checked against all of them. Other batches are being written at the same time; a final combined check will catch late overlaps.
- Avoid hard matches already used in data/readings (check their "hard" lists) unless the animal naming YOU as its hard match is a true clash for you.
- No closing line, tab label or story may repeat one already used.
- These pages just had a fact pass (data/research/FACTFIX-R6-A.md / -B.md). Use only corrected facts.
- Purple Star: never claim a star pairing is traditional. The sharing buttons render automatically.
