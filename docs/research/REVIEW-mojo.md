# MOJO review: ten research dossiers, and what the rewrite must look like to search and AI answers

Reviewer: MOJO (search and citation). Date: 2026-11-08. Read only; no site files changed, no git.
Measured from the 10 dossiers in this folder, the 10 live pages under `site/animals/<slug>/`,
all 144 animal pages, and `site/js/modules/zodi-map.js`.

## 0. Three things to fix before any rewrite (sitewide, mechanical, not content)

1. **"Primal Zodiac" is still on all 144 animal pages.** It sits in JSON-LD `alternateName`
   ("Primal Zodiac Animal"), in `keywords`, and in every FAQPage question and answer
   ("What is the Koala in the Primal Zodiac?"). 4 to 6 hits per page. This breaks the
   2026-11-08 owner ruling and is another site's trademark. Grep: `grep -l "Primal Zodiac" site/animals/*/index.html` returns 144.
2. **The FAQPage JSON-LD is not visible on the page.** On koala, the question text exists only
   inside the script block. Marking up content users cannot see is a Google guideline breach,
   and FAQ rich results have shown nothing since 2026-05-07. Delete the FAQPage block on all 144.
3. **29 pages carry "What Purple Star already suspects about you"**, assigning a Zi Wei Dou Shu
   star from the Western sun sign plus year animal (pronghorn: Tàiyáng, the Sun star). ZWDS is
   cast from lunar birth date and hour; there is no traditional basis for the pairing. Either
   relabel it plainly as our own reading or cut it. As written it is a false claim about a real tradition.

## 1. Fact-audit roll-up (live pages, from the dossier audits)

| Animal | Checked | OK | WRONG | Unverifiable | The wrong ones |
|---|---|---|---|---|---|
| Koala | 6 | 3 | 3 | 0 | cecum is 2.5 to 3x body length, not 4 to 5x; forensic fingerprint confusion is a myth (Snopes, Henneberg); the elephant-low bellow comes from velar vocal folds, not the descended larynx (Charlton 2013) |
| Harpy Eagle | 9 | 6 | 1 | 1 (+1 style) | "largest eagle in the world" is contested (Philippine, Steller's sea eagle); 鷹 shown with no pinyin |
| Pronghorn | 9 | 3 | 3 | 3 | "5x" is oxygen use, not lung area; sees motion at 3 miles, not 4; flash doubles the rump patch, not the animal; Purple Star claim has no basis |
| Slow Loris | 7 | 2 | 2 | 3 | wrong paper cited for fatalities (Nekaris 2013 is "Tickled to Death", about YouTube); only some species are Critically Endangered; fixed-eye claim looks copied from the Tarsier page |
| Arctic Tern | 8 | 4 | 3 | 1 | geolocators, not GPS; S-shaped, not figure-eight; terns do stop over to feed (central Atlantic, about a month); 鷗 means gull, tern is 燕鷗 yàn'ōu |
| Luna Moth | 6 | 4 | 1 | 1 | egg-laying starts the evening after mating, not the same night |
| Raven | 10 | 2 | 5 | 3 | what-where-when cache memory is scrub jays (Clayton & Dickinson 1998); re-caching by thieves is scrub jays (Emery & Clayton 2001); grudges and alerting others are Marzluff's crows; Osvath 2008 studied apes; book subtitle wrong |
| Kea | 8 | 5 | 0 | 3 | none wrong; the cognition superlative and bill uses need a citation |
| Star-nosed Mole | 6 | 3 | 2 | 1 | fastest eating is 120 ms (Catania & Remple 2005; Guinness), not 25 ms; 25 ms is a neural estimate and is not measured at the fovea |
| Capybara | 6 | 3 | 1 | 2 | both sexes have a morillo; "monkeys and small predators rest on them" unsourced |
| **Total** | **75** | **35 (47%)** | **21 (28%)** | **18 (24%)** | plus 1 style flag |

**Error rate: 21 of 75 checked claims wrong (28%); 39 of 75 wrong or unverifiable (52%).**
Rough 95% interval on the wrong rate is 18% to 38%, and it is wider than that in truth because the
10 animals were not drawn at random and claims cluster by page. 9 of 10 pages had at least one wrong
claim; kea is the only clean one.

The errors have a pattern, which is what makes this a sitewide risk and not bad luck:
- **Inflated numbers**: 25 ms for 120 ms, 4 miles for 3, 4 to 5x for 2.5 to 3x, 10,000 years for about 12,000.
- **Borrowed findings**: scrub jay and crow studies credited to ravens; a tarsier trait given to the loris.
- **Wrong citations that look right**: real authors, real journals, wrong paper or wrong DOI (raven, slow loris).

These are the signatures of generated text, and a page that cites a paper which does not say what it
claims is the single worst thing an AI answer engine can find on a site trying to recover from a spam action.

Spot-check of the auditors: the dossiers were themselves written by agents. I confirmed four verdicts
from known literature (scrub jays 1998; the koala fingerprint myth; 120 ms star-nosed mole; the contested
"largest eagle" title). I did not re-verify the rest. A human should open the source for every WRONG before it is edited.

**Recommendation: yes, audit the "Animal fact" blocks on all 144 before any rewrite, and do it as a
correction pass, not a rewrite.** About 144 x 7 = roughly 1,000 claims; at the observed rate expect
something like 200 to 380 wrong. Fix by deleting or narrowing the claim, never by generating new prose.
Deleting a wrong sentence is not a mass AI rewrite. Order the queue by pages with impressions in Search
Console first.

## 2. What is citable, what is filler

**Citable (non-commodity, sourced, nobody else has it on a zodiac page):**
- Classical Chinese with a primary text: Zhuangzi ch. 1, 偃鼠飲河，不過滿腹 (yǎn shǔ yǐn hé, bùguò mǎn fù), via ctext.org (star-nosed mole); Shijing 碩人 Shuò Rén, 螓首蛾眉 (qín shǒu é méi), moth brows as beauty (luna moth).
- Named-nation stories from a First Nations-led source: Gumbaynggirr Dunggirr Gagu, the koala brothers' gut bridge; Koobor; Yarriabini (Common Ground). The gut-as-lifeline echoes the real cecum, which is a rare honest bridge from biology to symbol.
- Academic ethnography: Arapaho antelope-horn amulets for quick-walking children (CU Arapaho Language Project); Great Basin antelope shamans (Arkush 1986, Journal of Ethnobiology); Path of the Pronghorn, 6,000 years, first US federal migration corridor in 2008.
- Ethnoprimatology: Bornean belief in slow lorises as gatekeepers of the heavens, malu malu "the shy one" (Nekaris et al. 2010, PubMed; PMC3852360).
- Te Ara on kea: Waitaha held kea as kaitiaki; hut lore; about 150,000 shot under bounty before 1986 protection.
- Corrected science with the right paper: ravens planning ahead (Kabadayi & Osvath 2017, Science); koala bellow from velar vocal folds (Charlton 2013); Inuit honor name Imiqutailaq for Fritz Koerner; Scots tirrick/tarrock (Dictionary of the Scots Language).

**Filler to drop:**
- Lucky colors and numbers. Sources disagree in at least 6 of 10 dossiers. A number we pick from three conflicting lists is unsourced by definition.
- Western sign and Chinese year temperament boilerplate. Identical for 12 pages each, on every zodiac site already.
- Year-animal folklore (Jade Rabbit, Sun Wukong, the Pig in the Great Race). True, but the same text would land on 12 animal pages. It belongs on the year hub.
- Stamps, memes, "sea swallow", national-bird trivia (Panama), the Lent "capybara is fish" story (the letter has never been traced).
- Weak items the dossiers already flagged: Yanomami capybara double, Aztec harpy and Quetzalcoatl, Appalachian and Hawaiian moth lore (other species, one blog), Hixkaryana via a personal blog, Shakespeare's mole with no text link.
- Conflations: Du Fu's sand gull and the Liezi seabirds are gull lore (鷗), not tern lore. Sun crows are crows. Use only with the species named honestly, or not at all.

**Rank by new citable value:**
1. Koala (three sourced Aboriginal stories plus a corrected, quotable acoustics finding)
2. Pronghorn (two academic ethnographies, a federal-record fact)
3. Slow Loris (peer-reviewed ethnoprimatology, unique; needs careful framing)
4. Star-nosed Mole (Zhuangzi primary text, Zuni fetish, bestiary)
5. Kea (Te Ara, government-grade source, a real shadow story)
6. Luna Moth (one strong Shijing line; the rest is weak)
7. Arctic Tern (Inuit honor name and Scots names are good; the Chinese items are about gulls)
8. Raven (best sourced, least new: Odin, Haida, Morrigan and the Tower are on every raven page; its value is the corrected science)
9. Harpy Eagle (Greek naming; the Indigenous item rests on a blog)
10. Capybara (Tupi etymology and the 1982 Izu onsen story; little else)

## 3. How the rewrite carries this without becoming a template again

**Measured starting point.** Main content runs 6,400 to 8,100 words per page, about 1.01 million words
over 144 pages, published in a six-day window (datePublished 2026-07-06 to 2026-07-11). 20.5% of all
body words sit in sentences that repeat, name-swapped, on 10 or more pages. The structure (15 chapters,
five Mirror gates, four element-cycle cards, chakra card) repeats on all 144. Every rewrite should make
the page shorter and more different, never longer.

**Replace, do not add.** Replace "Meet the Animal" (six facts, the zone with the 52% problem) with one
section: **"The <Animal> in story and in fact."** Three or four sourced symbol items, each naming the
culture, the source and, where there is one, the text; then two or three verified biology bridges, each
tied to one trait in the reading. Visible sources list at the end of the section. Cut the other 3 to 4 facts.

**Answer capsule** directly under the H1, 40 to 60 words, written to be lifted whole:
"The Koala is the Zodi Animal for a Taurus born in a Rabbit year (1999, 2011, 2023). Zodi Animal reads
it as the withheld voice: slow to commit, then all in. In Gumbaynggirr story the koala brothers made a
bridge of their own long gut to carry their people home." Rules: say "Zodi Animal reads" for our
interpretation; state the sourced item as a plain dated or attributed fact; one fact per sentence;
no hedged superlatives.

**Fact sentences that can be quoted**: subject, verb, number, source in the same sentence.
"Catania and Remple (2005, Nature) timed the star-nosed mole's prey handling at as little as 120 milliseconds."
Not "scientists have found it is the fastest eater in the world."

**best_matches as internal links.** All 70 match and clash slugs in the dossiers resolve to real GRID
animals with live pages, and every hard match is a true clash. Use them, but replace the current link
sprawl: koala's body already links to about 30 different animal pages. Ship a "Your people" block with
3 best and 1 hard, anchor text = animal plus crossing ("Clark's Nutcracker, the Virgo Goat"), and a
reason written for that pair, not "Rabbit and Goat share a trine" pasted 48 times. Two watch-outs:
harpy eagle's Moon Bear is a same-year pick with no element harmony (Leo Fire, Cancer Water), the weakest
of the 70; and reciprocity matters (koala lists capybara and capybara lists koala, good; check the rest).

**Title and description.**
- Title: `<Animal>, the <Sign> <Year> Zodi Animal: love, work, shadow` (about 50 to 60 characters). Vary the tail by what the page is actually strongest on; do not lock the last three words for 144 pages.
- Description, hand-written, under 155 characters: crossing plus years, then the page's one sourced hook. "Taurus born in 1999, 2011 or 2023? Your Zodi Animal is the Koala, the quiet one Gumbaynggirr story says carried its people home." If two descriptions in a batch share a sentence frame, rewrite one.

**Schema, justified only:** BreadcrumbList (keep). Article with `author` = Organization "The Zodi Animal team", honest `dateModified` on the rewrite day, never backdated. `about` the animal with `sameAs` to its Wikipedia URL. Remove FAQPage, remove every "Primal Zodiac" string, add nothing else: no Quotation, ClaimReview, HowTo, Review, Person.

**What would look like scaled content:**
- The dossiers already show it. Of 60 candidate lines, 17 open "You tend to" and 13 "There are times" (the brief's own stems). Koala and Luna Moth have near-identical opening lines ("know within seconds/a minute whether... then spend weeks") and both put tasting, perfume or sommelier work first in careers. Ship those and two pages in one batch read as one page.
- A fixed "folklore x3, fact x3, matches x5" slot pattern on every page. Let the number of items follow the evidence: koala gets four stories, capybara may get one.
- The same capsule frame on all 12 in a batch.

## 4. Quality gate (every page, before it joins a 12-page batch)

- [ ] Every "Animal fact" was opened at its source by a person; WRONG removed, unverifiable cut or softened.
- [ ] Every cited paper is the right paper: title, year, journal and DOI checked against the link.
- [ ] At least two symbol items from named, non-blog sources, culture and text named in the sentence. None borrowed from another species.
- [ ] Zero lucky numbers or colors unless one source is cited and the text says it is one tradition.
- [ ] Every Chinese character carries pinyin with tone marks; glyph means this animal (no 鷗 for tern).
- [ ] No "Primal Zodiac" anywhere, markup included. "Zodi Animal" in title and H1 area.
- [ ] Answer capsule 40 to 60 words, interpretation labeled as Zodi Animal's.
- [ ] Main content shorter than before the rewrite.
- [ ] No sentence in the page appears, name-swapped, on another page in the batch (run the shared-sentence script).
- [ ] Opening line, career lead and capsule frame differ from every other page in the batch.
- [ ] "Your people" block: 3 plus 1 links, slugs resolve, pair-specific reasons.
- [ ] Indigenous material: nation named, storyteller or source named, no "you" reading laid over it.
- [ ] No ZWDS, BaZi or other tradition claim the tradition does not make.
- [ ] Banned words and em dashes absent (the dossiers contain "discover" x3 in pronghorn and "journey" in kea and raven; keep them out of copy).
- [ ] JSON-LD parses; nothing in markup that is not on the page.

## 5. Risks

- **Copying other zodiac sites.** No copy was found in the dossiers, but the year-animal temperament and lucky lists are where sites converge. Drop them and the risk mostly goes with them. Never use another site's animal pairings.
- **Unsourced lucky numbers.** The three common sources disagree; any printed set is ours wearing a tradition's clothes.
- **Chinese characters**: koala's hero glyph 树 has no pinyin (shù); harpy's 鷹 has none (yīng); arctic tern's 鷗 is the wrong bird. Audit all 144 hero glyphs with the facts pass.
- **Indigenous traditions.** The Hopi Snake-Antelope ceremony is restricted to outsiders; state the one Britannica fact or leave it out. Waitaha kaitiaki and the Aboriginal stories should be told as theirs, attributed, linked to Common Ground and Te Ara, and kept separate from the "this is you" voice. Do not invent spirit-animal meanings for any nation; the dossiers correctly flagged every such blog item as unusable.
- **Slow loris folk practices** (blood on blades, buried lorises, loris medicine) describe harm to a CITES Appendix I animal. Present them as recorded belief, with the conservation status beside them, never as luck you can use.
- **Purple Star overreach** on 29 pages, above.
- **Velocity.** 144 pages dated within six days is visible in markup. The 12-a-week rewrite pace is the right answer; keep dateModified truthful so the slow pace is visible too.
- **Auditors are agents.** Their WRONG verdicts were mostly convincing and four I confirmed, but the dossier itself can repeat the same failure it caught. Human eyes on every source link.
