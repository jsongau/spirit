# PSA-CONNECTION-MAP — Purple Star Astrology cross-site bridges

Deliverable of Agent C (connections cartographer), planning stage, 2026-07-07.
Scope: every honest bridge between the Purple Star Astrology hub and the rest of the site, plus the internal hub-to-child map. Systems stay distinct. Zodi Animal, BaZi, the Feng Shui almanac, and Zi Wei Dou Shu support each other and are never blended into one system. The Zodi Animal is never implied to be calculated by ZWDS.

## Conventions used in this file

- **Lesson levels** refer to the eight curriculum levels in PSA-CURRICULUM.md: L1 Orientation, L2 Twelve Palaces, L3 Fourteen Principal Stars, L4 Four Transformations, L5 Palace Relationships, L6 Supporting Stars and Structure, L7 Timing, L8 Synthesis and the Reader's Path.
- **Internal PSA URLs** are written at the planned canonical `/elements/purple-star-astrology/...`. Until the redirect wave ships, the live paths are the `/elements/zi-wei/...` equivalents. The old-to-new map is owned by PSA-MASTER-PLAN.md.
- **External URLs** are current live paths, verified to exist in `site/` on 2026-07-07 unless marked GAP.
- Anchor copy is draft, in-world plain English. No underlines, no external-link arrows, no hype. Button labels are direct.
- Every bridge carries an honesty flag: the claim the page must NOT make.

---

## 1. BaZi (八字, Four Pillars) — `/bazi/`

The closest sibling system. The corpus (doc 01, section 3) gives the sanctioned comparison: BaZi is the weather pattern of a life, ZWDS is the map of the territory. Both are read from the same birth moment with entirely different mathematics. The current zi-wei hub already carries a BaZi vs ZWDS comparison section; the new hub keeps that comparison inside L1 rather than as a standalone block.

| # | Attaches to | Destination | Verified | Why a learner cares | Anchor copy (sentence + button) |
|---|---|---|---|---|---|
| B1 | L1 Orientation, "what this chart reads" lesson (the existing hub comparison section) | `/bazi/` | Yes | Western beginners meet two Chinese birth-chart systems on this site and need the difference stated once, plainly, before either makes sense. | "BaZi reads your birth as the weather of a life; Purple Star reads it as a map of rooms. Same moment, different instrument." Button: **Compare with BaZi** |
| B2 | L2, Life Palace (命宮) lesson | `/bazi/day-master/` | Yes | Both systems anchor the self somewhere. Seeing BaZi anchor it in one character makes the Life Palace's job as a room click faster. | "In BaZi the self is a single character, the Day Master. Here the self is a room the whole court answers to." Button: **Meet the Day Master** |
| B3 | L4, Heavenly Stem assignment lesson (which stem picks the year's four transformations) | `/bazi/heavenly-stems/` | Yes | The Four Transformations are keyed to the ten Heavenly Stems, the same Han-era layer BaZi is written in. The stems are already taught in depth on the BaZi page; PSA should not re-teach them. | "The four transformations are chosen by a Heavenly Stem, the same ten characters BaZi is spelled in." Button: **Learn the ten stems** |
| B4 | L7, decade cycles lesson (Decade Doors / 大限 Dà Xiàn) | `/bazi/luck-pillars/` | Yes | Both traditions read life in ten-year turns. Comparing them is the fastest way to teach that the two decade systems are calculated differently and must never be swapped. | "BaZi also walks life in ten-year turns, counted from the month pillar instead of the Bureau. Two clocks that happen to share a tick." Button: **See BaZi's luck pillars** |
| B5 | L8 Synthesis, "how a dual reader works" section | `/bazi/ten-gods/` | Yes | Doc 01 notes dual practitioners hold both systems. Ten Gods name relationships to the self; principal stars name figures in rooms. A finishing learner should see the parallel without merging it. | "A dual reader holds both books: BaZi names the roles in a life, Purple Star names the figures in its rooms." Button: **Read the Ten Gods** |
| B6 | L8 and the cast-chart flow: after a study chart is cast | `/bazi/chart/` | Yes | A learner with birth data already entered will want the second instrument. The BaZi caster exists and works today. | "Same birth, second instrument. Cast your eight characters and keep the two charts side by side, each read by its own rules." Button: **Cast your BaZi chart** |
| B7 | L2 Spouse Palace lesson, secondary link after the Bonds bridge (see section 5) | `/bazi/compatibility/` | Yes | The Spouse Palace raises the two-people question; BaZi has the site's other serious answer to it. | "BaZi weighs two whole charts against each other, elements first. Another lens on the same question." Button: **See how BaZi pairs** |

**Honesty flags for all BaZi bridges**
- Never present BaZi and ZWDS results as one combined reading. The sanctioned metaphor is weather and map; the sanctioned sentence is "different calculations from the same birth moment."
- B4: Dà Xiàn start age comes from the Five-Element Bureau; BaZi's Dà Yùn comes from the month pillar. The decades usually do not line up. Say so.
- B3: shared vocabulary (stems, branches, Wu Xing) is a shared Han-era foundation layer, not evidence the systems are one. Doc 01 line 21 is the source for this framing.
- B5: Ten Gods and principal stars are not translations of each other. No correspondence table, ever.
- Cross-reference with no destination (GAP): doc 05 says the auxiliary star Qing Yang is rooted in BaZi's 羊刃 (Lamb Blade). No BaZi page covers the Lamb Blade, so L6 keeps this as an unlinked source note, not a bridge.

---

## 2. Five Elements / Wu Xing (五行) — `/elements/`

Important structural finding: the `/elements/` hub itself teaches the five phases (generating and controlling cycles, interactive), but its per-element child pages are the WESTERN four: `/elements/fire/`, `/elements/water/`, `/elements/earth/`, `/elements/air/`. There are no Wood or Metal pages. The other five-phase page on the site is `/feng-shui/five-elements/` (Wood, Fire, Earth, Metal, Water). All Wu Xing bridges therefore point at the `/elements/` hub or `/feng-shui/five-elements/`, never at the four Western element child pages.

| # | Attaches to | Destination | Verified | Why a learner cares | Anchor copy |
|---|---|---|---|---|---|
| E1 | L1 Orientation, foundations sidebar ("what was already old when this system was young") | `/elements/` | Yes | Doc 01: the Wu Xing vocabulary predates ZWDS by a thousand years and is the shared floor under BaZi, feng shui, and medicine. One link stops the hub from re-teaching it. | "The five phases were already old when this system was written down. If they are new to you, walk them once before the stars." Button: **Walk the five phases** |
| E2 | L3, star lessons where a star's Five-Element attribute is taught (each principal star page lists one) | `/elements/` | Yes | A learner who knows how the phases behave reads a star's temper faster: a Yang Fire star burns and fizzles, a Yin Water star seeps. | "Every principal star carries one of the five phases as its temper. The phases page shows how each one moves." Button: **Review the phases** |
| E3 | L7, Five-Element Bureau (五行局) lesson, the step that sets the first decade's starting age | `/feng-shui/five-elements/` | Yes | The Bureau names (Water 2, Wood 3, Metal 4, Earth 5, Fire 6) borrow phase names. Without one plain link, a beginner reads "Water 2" as a water personality. | "Your Bureau borrows a phase name to set a starting age, and that is all it does. The phases themselves live here." Button: **The five phases, plainly** |

**Honesty flags**
- Never link star element attributes to `/elements/fire/`, `/elements/water/`, `/elements/earth/`, or `/elements/air/`. Those pages are the Western four-element wheel. Air is not a Wu Xing phase, and mapping ZWDS onto that wheel is a false merge.
- E3: the Bureau determines decade timing math only. It is not an element reading of the person. State this on the lesson, not just here.
- GAP: there are no per-phase Wu Xing pages (no Wood, no Metal). If the site ever builds them, E2 and E3 upgrade to phase-specific links. Do not plan the hub as if they exist.

---

## 3. Feng Shui almanac and Feng Shui hub — `/almanac/`, `/feng-shui/`

The almanac computes today's lunar date, day pillar, solar term, moon phase, Twelve Day Officers, and personal clash/harmony days. None of that is ZWDS. The honest bridges are calendar literacy and history, plus one deliberate disambiguation.

| # | Attaches to | Destination | Verified | Why a learner cares | Anchor copy |
|---|---|---|---|---|---|
| F1 | L1 and the chart-casting flow: the "your birth date must become a lunar date" step (doc 04, chart construction) | `/almanac/` | Yes | ZWDS charts are cast from the lunar calendar. The almanac is the one place on the site that already shows lunar dates, solar terms, and how they are reckoned astronomically. | "Purple Star charts are cast from the lunar calendar. The almanac shows today's lunar date and how the sky produces it." Button: **Open the almanac** |
| F2 | L7, "responsible forecasting" lesson: the Three Clocks disambiguation block (NEW content block, see gaps) | `/almanac/` | Yes | Learners will meet three timing systems on this site (almanac day officers, BaZi luck pillars, ZWDS decade and annual cycles) and will conflate them unless told not to, once, clearly. | "The almanac rates the day for everyone. Your decade doors belong to your chart alone. Two clocks, two calculations, no mixing." Button: **See today's almanac** |
| F3 | Reference group, History page (章 origins section) | `/feng-shui/compass/` | Yes | Doc 01: the circular chart format of early ZWDS mirrored the Luo Pan, the feng shui compass. A real, sourced historical thread. | "The earliest round charts echoed the Luo Pan, the compass feng shui still turns. The family resemblance is not an accident." Button: **See the compass** |
| F4 | L3, Stars index page, one reference note near the top | `/feng-shui/flying-stars/` | Yes | Search traffic and site nav both surface "Flying Stars." Those are the nine Luo Shu numbers moved across a floor plan, nothing to do with these fourteen. A one-line disambiguation saves real confusion. | "Feng shui's Flying Stars are nine numbers walked across a floor plan. Different stars, different art." Button: **Meet the Flying Stars** |

**Honesty flags**
- F1/F2: almanac day quality (favor and avoid lists, Day Officers, clash days) is inherited calendar lore, a different system with different math. Never present an almanac verdict as ZWDS output, and never suggest checking the almanac to "activate" a palace.
- F2: the almanac's personal clash/harmony layer is keyed to the visitor's Chinese year animal, which is yet another system. The Three Clocks block may name it, but no ZWDS lesson treats it as chart timing.
- F3: use "mirrored" and "echoed," per the corpus. No claim that ZWDS descends from feng shui or vice versa.

---

## 4. Proverbs (The Proverb Pond) — `/proverbs/`

The proverbs are the tradition's own voice for humility, timing, and long study. They bridge on ethos, never on doctrine.

| # | Attaches to | Destination | Verified | Why a learner cares | Anchor copy |
|---|---|---|---|---|---|
| P1 | L7, "natal promise vs temporal trigger" lesson close | `/proverbs/timing-and-fortune/` | Yes | Forty proverbs about fate, luck, and timing carry the humility the timing lessons teach, in fewer words and in the tradition's own voice. | "The tradition kept its own humility about fortune. Forty proverbs on timing say it shorter than any lesson can." Button: **Wade into the timing pond** |
| P2 | L8, uncertainty language and ethics lesson | `/proverbs/humility-and-self-mastery/` | Yes | A reader who claims too much has failed the final level. The humility pond is the cultural backstop for the exact voice we ask readers to use. | "Before you read for anyone, sit with the proverbs on knowing less than you think." Button: **The humility pond** |
| P3 | Rank-up moments (Reader's School ladder) and the Start Here page footer | `/proverbs/study/` | Yes | The Path of Mastery page is the site's existing long-study frame. An eight-level academy and an 87-proverb study path are the same promise in two rooms. | "An iron rod, ground slowly, becomes a needle. The proverbs hold the study ethic this path runs on." Button: **Study the proverbs** |

**Honesty flags**
- Proverbs are cultural companions, not ZWDS sources. No proverb is presented as a ZWDS teaching, a star motto, or a palace caption.
- Do not pipe proverbs into the right-rail rotating widgets. The rail is scoped to ZWDS structure only (per the experience spec: never generic fortune content). Proverb links live at lesson closes and rank-ups.

---

## 5. Bonds and compatibility — `/match.html`

Bonds is the site's compatibility feature: two birth dates in, a scored bond across trines, clashes, and elements of two Zodi Animals. It shares zero calculation with ZWDS.

| # | Attaches to | Destination | Verified | Why a learner cares | Anchor copy |
|---|---|---|---|---|---|
| M1 | L2, Spouse Palace (夫妻宮) lesson close | `/match.html` | Yes | The Spouse Palace lesson is where the relationship question gets loud. Bonds is the site's working two-person tool, and sending the learner there beats letting one palace carry the whole question. | "The Spouse Palace is one room of twelve, never the whole answer. For a full two-person reading, the Bonds test weighs two animals against each other." Button: **Test a bond** |
| M2 | Same lesson, secondary line under M1 | `/bazi/compatibility/` | Yes | Listed in section 1 as B7. One lesson, two honest exits, clearly labeled as different systems. | See B7. |

**Honesty flags**
- Never reduce compatibility to the Spouse Palace, and never imply Bonds reads palaces. Bonds scores Zodi Animals (Western sign crossed with Chinese year animal); the Spouse Palace describes one domain inside one person's chart.
- The anchor copy above deliberately performs the flag ("one room of twelve, never the whole answer"). Keep that clause in any rewrite.
- No "check your Spouse Palace against your partner's" feature is planned or implied. Two-chart ZWDS synastry is not in the corpus and not on this site.

---

## 6. The Moon — `/moon.html`, `/moon/phases/`

| # | Attaches to | Destination | Verified | Why a learner cares | Anchor copy |
|---|---|---|---|---|---|
| L1a | L3, Tai Yin (太陰, the Moon Star) lesson close | `/moon.html` | Yes | Tai Yin is named for the moon and carries its symbolism (reflection, the hidden illuminator). Moon lovers are a real audience segment on this site; this is their affinity door in and out. | "Tai Yin borrows the moon's name and its patience. The sky's actual moon, tonight's phase and all, is next door." Button: **See tonight's moon** |
| L1b | Same lesson, optional deeper link for phase symbolism | `/moon/phases/` | Yes | The phases page teaches what each phase favors, useful contrast: symbolic moon in a fixed chart vs cycling moon in the sky. | "Eight phases, each with its own temper, none of them written into your chart." Button: **The eight phases** |

**Honesty flags**
- Tai Yin is a symbolic star fixed in a natal palace. Tonight's astronomical moon phase does not change a natal chart, and no lesson may imply a full moon "strengthens Tai Yin." Brightness levels in ZWDS are chart-derived, not sky-derived.
- No Tai Yang bridge: the site has no Sun page. Do not point Tai Yang at moon or horoscope content as a substitute (GAP, low priority).

---

## 7. Zodi Animals, Chinese zodiac, Menagerie

The hardest boundary on the site. The Zodi Animal comes from a Western sun sign crossed with a Chinese year animal. ZWDS never touches that calculation, and the hub must say so once, early, in plain sight.

| # | Attaches to | Destination | Verified | Why a learner cares | Anchor copy |
|---|---|---|---|---|---|
| Z1 | L1 Orientation, first lesson ("what this chart reads"), the where-this-sits paragraph | `/what-is-a-zodi-animal.html` | Yes | Every visitor arrives with an animal. One sentence placing Purple Star beside it, not under it, prevents the single worst confusion this hub can create. | "Your Zodi Animal comes from two calendars meeting. Purple Star is a third instrument, older and stranger, and it never names the animal." Button: **What a Zodi Animal is** |
| Z2 | L2, the palace-branch lesson (each palace sits on one of the twelve Earthly Branches) and L5 orbit model captions | `/chinese-zodiac/` (hub; per-animal pages such as `/chinese-zodiac/rat/` exist) | Yes | The twelve branches under the palaces carry the calendar animals as ancient labels. Learners will notice the Rat and Tiger glyphs and deserve the real story rather than a guess. | "The twelve branches beneath the palaces wear the calendar animals as old labels. Their own stories live in the Eastern wing." Button: **Visit the Eastern wing** |

**Honesty flags**
- Z1 is a required disclosure, not decoration. The exact rule: never imply the Zodi Animal is calculated by ZWDS, and never imply ZWDS "goes deeper into" the Zodi Animal. They are parallel instruments.
- Z2: branch animals are calendar mnemonics on the palace wheel, labeled as labels. They are not star content, not palace meanings, and not the visitor's Zodi Animal. If the palace model shows branch glyphs, the caption carries this flag verbatim in shorter form.
- The Menagerie (`/menagerie.html`) stays in the global nav only. No lesson links to it (see rejected R7).
- Any animal-flavored mnemonic the hub invents for the 14 stars must be labeled an editorial memory aid per the term ladder, never ZWDS doctrine. Current curriculum plans no such mnemonics; if one is added later, this flag governs it.

---

## 8. Karma, Waking, account — `/account.html`, `/karmic-board.html`, `/awakening.html`

These are site-wide progress surfaces, not divination systems, so the risk here is mechanical merging rather than doctrinal merging. Findings from `site/js/zodi-karma.js` and `site/js/zodi-awaken.js`:

- Zodi Karma has a fixed, server-enforced earn map (`zodi_award` RPC): daily_visit, reveal_animal, proverb_read, moon_check, match_test, share, profile_complete, account_created. Nothing ZWDS-shaped exists yet.
- Waking (the Path of Awakening) is six fixed rites weighted toward the animal oracle path (name animal, read gates, stones, bond, share, return). It reads `primal_oracle_v1` and is about the Zodi Animal journey.

| # | Attaches to | Destination | Verified | Why a learner cares | Anchor copy |
|---|---|---|---|---|---|
| K1 | First visible progress moment (e.g. first lesson complete or first drill passed), left rail and lesson close | `/account.html` | Yes | Site rule: accounts save progress, never unlock it. The CTA appears only after progress exists. | "Your path is yours with or without an account. Sign in only if you want the court to remember your place." Button: **Save this path** |
| K2 | Rank-up screens (Reader's School ladder), one quiet line | `/karmic-board.html` | Yes | Karma is the site's behavior currency; showing that study earns standing connects the hub to the site's loop without gating anything. | "Study earns Zodi Karma the same way returning does. The board keeps the ledger." Button: **See the board** |

**Honesty and mechanics flags**
- PSA ranks and Zodi Karma stay two systems. Ranks measure comprehension inside the hub (extend `zwdsSchool.v1`); Karma is site-wide behavior currency. The connection is one-directional: comprehension events fire `ZodiKarma.award(...)`. Ranks are never purchasable with Karma and Karma never advances a rank.
- GAP (server): new earn kinds (suggested: `ziwei_lesson`, `ziwei_rank`, modest values with daily caps in the spirit of `proverb_read`) require additions to the server-side `zodi_award` RPC. The master plan must schedule this; until then the hub awards nothing and shows no Karma copy.
- Recommendation to the reconciler: do NOT add a Purple Star rite to the Waking RITES array. Waking narrates the Zodi Animal oracle journey; splicing ZWDS study into it is exactly the mechanical merge the rules forbid. The hub can still mount the standard rail slot like other pages.
- `/awakening.html` (Third Eye levels, the seven clairs) gets no lesson link (see rejected R5). Chart reading is taught as a studied craft, not clairvoyance.

### Related trust surface: `/horoscopes/`

| # | Attaches to | Destination | Verified | Why a learner cares | Anchor copy |
|---|---|---|---|---|---|
| H1 | L8, ethics and "what not to claim" lesson | `/horoscopes/` | Yes | The horoscopes page already states the house rule, "Reflection, not prediction." Citing it shows the Reader's Path ethics are the whole site's ethics, not a disclaimer bolted onto one hub. | "The house rule holds everywhere on this site: reflection, not prediction. The Reader's Path is that rule with a method." Button: **Read the house rule** |

Flag: Western horoscopes are yet another distinct system; the link is to the ethos statement, not the sign content.

---

## 9. Internal map: hub and child pages

Planned canonical paths, with current live equivalents under `/elements/zi-wei/`.

| Child page | New canonical | Curriculum role | Hub links TO it from | It links BACK to hub at |
|---|---|---|---|---|
| Palaces | `/elements/purple-star-astrology/palaces/` | L2 primary source (all twelve, court-group structure, opposites); L5 borrows its court cards | L2 lesson list; palace court model "read the full room" per palace | Its own court cards link the hub's L2 lessons and the Triangle model (L5) |
| Stars index | `/elements/purple-star-astrology/stars/` | L3 index | L3 lesson list; move-a-star model "open this star's page" | Star index links hub L3 and the Flying Stars disambiguation note (F4) |
| 14 star pages | `/elements/purple-star-astrology/stars/{zi-wei, tian-ji, tai-yang, wu-qu, tian-tong, lian-zhen, tian-fu, tai-yin, tan-lang, ju-men, tian-xiang, tian-liang, qi-sha, po-jun}/` | L3, one lesson per star; palace-placement sections feed the move-a-star model copy | Each L3 lesson; each placement row in the model | Each star page links its palace placements to `palaces/`, its transformation lines to `four-forces/`, and "practice this star" to `chart/` drills |
| Four Forces | `/elements/purple-star-astrology/four-forces/` | L4 primary source (season cards kept as a labeled teaching metaphor per the final ruling in §13 and PSA-TERMINOLOGY) | L4 lessons; Transformation Thread widget "learn the four in full" | Links hub L4 lab and `/bazi/heavenly-stems/` (B3) |
| Chart (Reader's School) | `/elements/purple-star-astrology/chart/` | Practice spine for every level; drills, exam, ranks, Decade Doors (L7), Mei walkthrough (L8) | Every practice CTA; "cast your study chart" from L1 on | School links each drill to its source lesson on the hub; Decade Doors links L7 |
| History | `/elements/purple-star-astrology/history/` | Reference group | Reference subnav; L1 "where this comes from" sidebar | Links `feng-shui/compass/` (F3) and back to Start Here |
| Glossary + pronunciation | `/elements/purple-star-astrology/glossary/` | Reference group; left-rail glossary access | Every term ladder "full glossary" link; subnav | GAP: page does not exist yet (gap 7 in the master prompt). Flagged NEW. |
| L5 and L6 lesson homes | hub sections (L5 may extend `palaces/`; L6 sources doc 05) | L5 Palace Relationships, L6 Supporting Stars | Subnav Study group | GAP: no dedicated child pages exist. Curriculum doc decides hub-section vs new page; this map only records that today's bridges for L5/L6 land on hub sections. |

Teaser handoff (external in-site): `site/indexv6.html` "Twelve palaces, fourteen stars" section links the hub with `?star=` and `?palace=` params; the hub consumes them and opens the full court in that configuration. Owned by PSA-HUB-EXPERIENCE.md; recorded here because it is the highest-traffic inbound bridge.

---

## 10. Rejected connections

Considered and rejected because no honest reason exists. Do not resurrect these as "related links."

| # | Candidate | Why rejected |
|---|---|---|
| R1 | `/feng-shui/kua-number/` from any lesson | Both derive a number from birth data, and that is the entire overlap. Kua belongs to Eight Mansions feng shui; a link teaches nothing about ZWDS and actively invites system blending. |
| R2 | `/moon/in-your-sign/` from the Tai Yin lesson | Western moon-sign tracking shares only the word "moon" with Tai Yin. Linking implies the natal Moon Star responds to today's sky, which is false in both directions. |
| R3 | `/elements/chakras/` and chakra yoga from the elements bridge | Indian subtle-body system with no ZWDS relation. This is the textbook fake-unified-ancient-system merge the site rules exist to prevent. |
| R4 | `/stones.html` (keeper stones) from palace or star lessons | The ZWDS corpus contains no stone lore. "Stones for your Life Palace" would be invented doctrine sold as tradition. |
| R5 | `/awakening.html` from L8 (Reader's Path ethics) | The Reader's Path is a studied craft with an exam; the Awakening is a psychic-practice progression. Linking them implies chart reading is clairvoyance, which undercuts the entire trust posture of the hub. Account-surface coexistence only. |
| R6 | `/best-days.html` from L7 timing lessons | Clash and harmony days are keyed to the visitor's Chinese year animal, a calendar system. Inside a Dà Xiàn lesson the link would read as ZWDS output. It may be named (not featured) inside the Three Clocks disambiguation block only. |
| R7 | `/menagerie.html` from star pages ("the 14 stars are like animals") | Tempting archetype-to-archetype hop with zero source in the corpus. Star archetypes are court figures. Global nav already carries the Menagerie. |
| R8 | `/western-zodiac/` sign pages from star or palace lessons | The current hub's meganav links all twelve signs, which is fine as nav. As lesson bridges they would imply sign-to-star correspondences that no school teaches and the corpus never states. |
| R9 | `/elements/fire/`, `/elements/water/`, `/elements/earth/`, `/elements/air/` from star element attributes | Those child pages are the Western four-element wheel (Air is not a phase). Wu Xing links go to `/elements/` hub level or `/feng-shui/five-elements/` only. |

---

## 11. Gaps: pages or work needed before a bridge can ship

Marked as gaps, not planned as done.

1. **PSA glossary and pronunciation page** (`/elements/purple-star-astrology/glossary/`), required by the internal map, the left rail, and the Reference subnav. Master prompt gap 7. Owner: master plan build wave.
2. **Server-side Karma earn kinds** (`ziwei_lesson`, `ziwei_rank` or equivalent) in the `zodi_award` RPC before K2 or any Karma copy appears in the hub. Until shipped, the hub is silent about Karma.
3. **Three Clocks disambiguation block** (new content block inside L7, not a page): almanac day officers vs BaZi luck pillars vs ZWDS decade/annual cycles. Bridges F2 and B4 both hang off it.
4. **No Wu Xing per-phase pages** (Wood and Metal missing sitewide; existing element child pages are Western). E2/E3 stay hub-level links until such pages exist, if ever.
5. **No BaZi Lamb Blade (羊刃) coverage** for the doc 05 Qing Yang cross-reference. L6 keeps an unlinked source note.
6. **No Sun page** for a Tai Yang affinity bridge. Accepted, low priority; no substitute link.
7. **Redirect wave** for `/elements/zi-wei/*` to `/elements/purple-star-astrology/*`: every external bridge INTO the hub (teaser, meganav, BaZi hub backlinks if added) must target the new canonicals in the same wave. Owned by PSA-MASTER-PLAN.md.
8. **Reciprocal links from external hubs** (optional, later): `/bazi/luck-pillars/` could return the B4 comparison and `/match.html` could name the Spouse Palace lesson. Not required for the hub to ship; listed so the build session does not add them unplanned.

---

## 12. Per-lesson index: external links by curriculum level

Only bridges defined above; internal child links are in section 9. "None" is a deliberate answer.

| Level | External links (bridge #) | Placement |
|---|---|---|
| L1 Orientation | `/bazi/` (B1), `/what-is-a-zodi-animal.html` (Z1), `/elements/` (E1), `/almanac/` (F1) | B1 inside the comparison lesson; Z1 in the first lesson's positioning paragraph; E1 foundations sidebar; F1 in the casting-prep step |
| L2 Twelve Palaces | `/bazi/day-master/` (B2), `/match.html` (M1), `/bazi/compatibility/` (B7/M2), `/chinese-zodiac/` (Z2) | B2 in the Life Palace lesson; M1 and M2 at the Spouse Palace lesson close; Z2 in the palace-branch lesson caption |
| L3 Fourteen Stars | `/elements/` (E2), `/moon.html` (L1a), `/moon/phases/` (L1b), `/feng-shui/flying-stars/` (F4) | E2 wherever a star's element attribute is taught; L1a/L1b at the Tai Yin lesson close; F4 as one reference note on the stars index |
| L4 Four Transformations | `/bazi/heavenly-stems/` (B3) | In the stem-assignment lesson |
| L5 Palace Relationships | None | The Triangle is taught entirely in-system; outbound links here would only dilute the one visual idea the level exists to land |
| L6 Supporting Stars | None (unlinked 羊刃 source note only, gap 5) | Doc 05 groups carry the level alone |
| L7 Timing | `/bazi/luck-pillars/` (B4), `/almanac/` (F2), `/feng-shui/five-elements/` (E3), `/proverbs/timing-and-fortune/` (P1) | B4 and F2 inside the Three Clocks block; E3 in the Bureau lesson; P1 at the natal-promise lesson close |
| L8 Synthesis / Reader's Path | `/bazi/ten-gods/` (B5), `/bazi/chart/` (B6), `/proverbs/humility-and-self-mastery/` (P2), `/horoscopes/` (H1) | B5 in the dual-reader section; B6 after the learner's study chart exists; P2 and H1 in the ethics lesson |
| Cross-level surfaces | `/account.html` (K1), `/karmic-board.html` (K2), `/proverbs/study/` (P3), `/feng-shui/compass/` (F3) | K1 at first visible progress; K2 and P3 on rank-up screens; F3 on the History reference page |

Totals: BaZi 7, Five Elements 3, Feng Shui and almanac 4, Proverbs 3, Bonds 2 (one shared with BaZi), Moon 2, Zodi Animals and zodiac 2, Karma/account 2, trust surface 1. Twenty-five accepted bridges (24 unique destinations), 9 rejected, 8 gaps.

---

## 13. RECONCILED DECISIONS (final, ruled 2026-07-07 by the coordinating session)

1. **No Waking rite: APPROVED.** PSA never joins the Waking RITES array. Waking stays the Zodi Animal oracle journey; the hub mounts the standard rail slot like any other page.
2. **Karma bridge: APPROVED, gated on server work.** The `psa:progress` → `ZodiKarma.award()` bridge (PSA-CURRICULUM.md progress spec) ships only after the new `zwds_*` earn kinds are added to the `zodi_award` RPC allowlist. Until then the hub shows zero Karma copy, and K2 stays dark. Scheduled in PSA-MASTER-PLAN.md.
3. **Level homes: RESOLVED.** L5 (Palace Relationships) lives on the hub itself, carried by the Read the Triangle model and its section; no child page. L6 (Supporting Stars) gets a new child page `/elements/purple-star-astrology/supporting-stars/` sourced from doc 05's groups, scheduled in the master plan; until that wave ships, L6 lessons are not linked from the subnav.
4. **Wu Xing links: CONFIRMED hub-level only.** `/elements/` and `/feng-shui/five-elements/` are the only element destinations. Commissioning per-phase Wu Xing pages is out of scope for this project (recorded as gap 4, not planned work).
