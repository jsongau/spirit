# FACTFIX-R9-A change log

Date: 2026-11-08. Pages: humpback-whale, ghost-pipefish, duetting-frog, crowned-crane, coconut-crab.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). "x2" means the string occurred twice in that file. Humpback-whale and coconut-crab have v1 and v2; ghost-pipefish, duetting-frog and crowned-crane have v2 only.
Backups of the original pages: `~/factfix-backup-r9a/<slug>.html`; original template JSON in `~/factfix-backup-r9a/tpl/v1/` and `~/factfix-backup-r9a/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site. Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy.
Purple Star: only coconut-crab carries a star block. Its HTML kicker was already relabeled; the v2 data kicker still had the old text and now uses the R3 wording. Lines claiming Purple Star "keeps landing on" or "tends to" give the crossing a star were reworded as Zodi Animal's own reading, with the R3/R4 sentences. 武曲 Wǔqū label aligned with the hub (The Finance General).

## humpback-whale

1. **Source:** s20 (header glyph is not the species name; rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v1 + v2]
   - BEFORE (HTML): <span class="rail__han" aria-hidden="true">鲸</span> … data-say="鲸" aria-label="Hear 鲸, jīng" … <span class="rail__py" lang="zh-Latn-pinyin">jīng</span>
   - AFTER (HTML): <span class="rail__han" aria-hidden="true">大翅鯨</span> … data-say="大翅鯨" aria-label="Hear 大翅鯨, dàchìjīng" … <span class="rail__py" lang="zh-Latn-pinyin">dàchìjīng</span>
   - BEFORE (HTML): <span class="serial-han">鲸</span> and <span class="h" lang="zh">鲸</span><span class="py" lang="zh-Latn-pinyin">jīng</span>
   - AFTER (HTML): <span class="serial-han">大翅鯨</span> and <span class="h" lang="zh">大翅鯨</span><span class="py" lang="zh-Latn-pinyin">dàchìjīng</span>
   - Template: animalHan "鲸" to "大翅鯨", animalHanPy "jīng" to "dàchìjīng". Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

2. **Source:** s11, s12 (soften: yearly change) [HTML + v1 + v2]
   - BEFORE: composing a song that evolves across an entire population within a single season.
   - AFTER: composing a song that changes from year to year as it passes from whale to whale.

3. **Source:** s11, s12 (soften: yearly change) [HTML + v1 + v2]
   - BEFORE: that <b>changes within a single breeding season</b>, as new phrases spread from whale to whale and sometimes replace an entire population's song within a few years.
   - AFTER: that <b>changes from year to year</b>, as new phrases spread from whale to whale; new songs have swept east across the South Pacific, replacing the old one population by population.

4. **Source:** s13, s14 (forty tons is the maximum) [HTML + v1 + v2]
   - BEFORE: A humpback can throw its entire body, up to forty tons, clear of the water in a breach;
   - AFTER: A humpback, a whale that can weigh up to forty tons, can throw its entire body clear of the water in a breach;

5. **Source:** s13, s14, s15 (proportion, not absolute; five meters unverifiable) [HTML + v1 + v2]
   - BEFORE: The humpback's pectoral fins are the <b>longest of any whale, up to a third of its body length</b>, close to five meters, which is also
   - AFTER: The humpback's pectoral fins are <b>proportionally the longest of any whale, nearly a third of its body length</b>, which is also

6. **Source:** s16 (inflated: 115 interactions in total, Pitman et al. 2017) [HTML + v1 + v2]
   - BEFORE: Humpbacks have been documented on more than a hundred occasions <b>placing themselves between orcas and other species being hunted</b>, including seals and other whales' calves, with no clear benefit to themselves.
   - AFTER: In a 2017 review of 115 encounters between humpbacks and orcas, Pitman and colleagues found humpbacks <b>often mobbing hunting orcas even when the prey was another species</b>, including seals and other whales' calves, with no clear benefit to themselves.

7. **Source:** s13, s17, s18 (record was photo matches, beaten in 2024) [HTML + v1 + v2]
   - BEFORE: , with one tracked individual logging over 9,800 kilometers in a single journey.
   - AFTER: ; in 2024, photo matches put one male off Colombia and later off Zanzibar, at least 13,046 kilometers apart, a new distance record.

8. **Source:** s13, s19 (learned-not-instinctive unverifiable; credit lobtail feeding) [HTML + v1 + v2]
   - BEFORE: , a cooperative technique learned and passed from whale to whale rather than instinctive.
   - AFTER: . Feeding styles can also spread socially: a variant called lobtail feeding passed through the Gulf of Maine population until nearly 40 percent of its whales used it.

## ghost-pipefish

1. **Source:** s11, s12 (header glyph is not the species name; rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v2]
   - BEFORE (HTML): <span class="rail__han" aria-hidden="true">鬼龍鰧</span> … data-say="鬼龍鰧" aria-label="Hear 鬼龍鰧, guǐlóngténg" … <span class="rail__py" lang="zh-Latn-pinyin">guǐlóngténg</span>
   - AFTER (HTML): <span class="rail__han" aria-hidden="true">剃刀魚</span> … data-say="剃刀魚" aria-label="Hear 剃刀魚, tìdāoyú" … <span class="rail__py" lang="zh-Latn-pinyin">tìdāoyú</span>
   - BEFORE (HTML): <span class="serial-han">鬼龍鰧</span> and <span class="h" lang="zh">鬼龍鰧</span><span class="py" lang="zh-Latn-pinyin">guǐlóngténg</span>
   - AFTER (HTML): <span class="serial-han">剃刀魚</span> and <span class="h" lang="zh">剃刀魚</span><span class="py" lang="zh-Latn-pinyin">tìdāoyú</span>
   - Template: animalHan "鬼龍鰧" to "剃刀魚", animalHanPy "guǐlóngténg" to "tìdāoyú". Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

2. **Source:** s6, s8, s9 (mechanism reversed: adults choose matching hosts) [HTML + v2]
   - BEFORE: Ghost pipefish body coloration, pattern, and texture match their host organism with <b>individual-level specificity</b> — a fish on a purple crinoid is purple; on green seagrass, green. The match adjusts as the fish settles onto a new host.
   - AFTER: Ghost pipefish color, pattern, and texture vary widely, and adults <b>choose hosts that match their own coloring</b>, a dark fish settling on a dark host, a pale one on a pale host.

3. **Source:** s6, s9 (reading under the corrected fact) [HTML + v2]
   - BEFORE: The belonging is not performed — it is achieved. <em>You do not try to fit; you become what the place needs you to be.</em>
   - AFTER: The belonging is chosen, then lived. <em>You look for the place that already matches you and settle in so fully you disappear.</em>

4. **Source:** s7, s9 (in-sync drift unverifiable; sources say motionless) [HTML + v2]
   - BEFORE: Ghost pipefish hang <b>head-down, drifting their body in sync with the motion of crinoid arms</b> in the current. The movement is not locomotion — it is behavioral mimicry of the host's passive motion.
   - AFTER: Ghost pipefish <b>hover head-down among crinoid arms and gorgonian branches</b>, often motionless, so the body reads as one more part of the host.

5. **Source:** s7, s9 (axis read, same) [HTML + v2]
   - BEFORE: drifting with the current only to mimic the motion of the crinoid fronds.
   - AFTER: often motionless, so the body reads as one more part of the host.

6. **Source:** s5, s7, s8 (second sentence unverifiable, cut) [HTML + v2]
   - BEFORE: <b>brood pouch formed by modified pelvic fins</b>. The male is more visible; the actual reproductive work is the female's, done quietly and out of immediate sight.
   - AFTER: <b>brood pouch formed by modified pelvic fins</b>, the reverse of seahorses and other pipefishes, where the male broods.

7. **Source:** s5, s6, s7, s8 (soften: often in pairs) [HTML + v2]
   - BEFORE: Ghost pipefish are often found <b>in male-female pairs on the same host organism</b>, both matched to the same background, both present on the same crinoid.
   - AFTER: Ghost pipefish are <b>often seen in pairs</b>, the two sharing one host.

8. **Source:** s5, s6, s8 (narrow host lists; coral rubble not found) [HTML + v2]
   - BEFORE: Solenostomus paradoxus favors crinoids; S. cyanopterus favors seagrass and coral rubble.
   - AFTER: Solenostomus paradoxus favors gorgonians and crinoids; S. cyanopterus favors seagrass and algae.

9. **Source:** s5, s7, s8 (absolutes wrong; range and depth) [HTML + v2]
   - BEFORE: Ghost pipefish are found across the <b>Indo-Pacific coral reef system</b>, from East Africa to the central Pacific. The distribution is wide but the habitat within it is specific: always shallow, always reef-associated.
   - AFTER: Ghost pipefish are found across the <b>Indo-Pacific</b>, from the Red Sea and East Africa to Fiji and Tonga. Within that range they live on coral reefs, in seagrass bays, and over sandy or muddy bottoms, down to about 95 meters.

## duetting-frog

1. **Source:** s13 (header glyph is not the species name; rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v2]
   - BEFORE (HTML): <span class="rail__han" aria-hidden="true">蛙</span> … data-say="蛙" aria-label="Hear 蛙, wā" … <span class="rail__py" lang="zh-Latn-pinyin">wā</span>
   - AFTER (HTML): <span class="rail__han" aria-hidden="true">爪蟾</span> … data-say="爪蟾" aria-label="Hear 爪蟾, zhǎochán" … <span class="rail__py" lang="zh-Latn-pinyin">zhǎochán</span>
   - BEFORE (HTML): <span class="serial-han">蛙</span> and <span class="h" lang="zh">蛙</span><span class="py" lang="zh-Latn-pinyin">wā</span>
   - AFTER (HTML): <span class="serial-han">爪蟾</span> and <span class="h" lang="zh">爪蟾</span><span class="py" lang="zh-Latn-pinyin">zhǎochán</span>
   - Template: animalHan "蛙" to "爪蟾", animalHanPy "wā" to "zhǎochán". Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

2. **Source:** s5, s6, s8 (name the species the facts describe) [HTML]
   - BEFORE: and the exchange itself becomes the bond.</p>
   - AFTER: and the exchange itself becomes the bond. The facts on this page are about the African clawed frog, Xenopus laevis.</p>

3. **Source:** s5, s6, s8 (same, template form) [v2]
   - BEFORE: and the exchange itself becomes the bond.
   - AFTER: and the exchange itself becomes the bond. The facts on this page are about the African clawed frog, Xenopus laevis.

4. **Source:** s9, s5 (males call underwater) [HTML + v2]
   - BEFORE: In species with this behavior, the male produces a distinct <b>advertisement call</b> that is genuinely audible across open water, sent without knowing whether a female is close enough to hear it.
   - AFTER: The male makes his <b>advertisement call underwater</b>, at night, alternating fast and slow trills for hours, without knowing whether a female is close enough to hear it.

5. **Source:** s9, s6 (calls underwater, in murky ponds) [HTML + v2]
   - BEFORE: The duetting frog calls across open water it cannot see through,
   - AFTER: The duetting frog calls underwater, in murky ponds it cannot see through,

6. **Source:** s9 (reading echo of the airborne call) [HTML + v2]
   - BEFORE: the first note out across open water.
   - AFTER: the first note sent out into dark water.

7. **Source:** s6, s8 (timing not confirmed; intensity is) [HTML + v2]
   - BEFORE: measurably <b>alters the structure and timing</b> of the male's next call
   - AFTER: measurably <b>alters the structure and loudness</b> of the male's next call

8. **Source:** s9, s6 (unverifiable; replaced with the ticking call) [HTML + v2]
   - BEFORE: When a call goes unanswered, the calling frog does not persist indefinitely; many individuals will <b>stop calling and go still</b> for a period rather than continue broadcasting into silence.
   - AFTER: A female who is not ready answers differently, with a <b>slow ticking call</b>, and that ticking is what silences a calling male.

9. **Source:** s6 (reading under the corrected fact) [HTML + v2]
   - BEFORE: You do not keep performing into an empty pond. You read the silence, correctly, as a reason to
   - AFTER: You do not keep performing once the answer is no. You hear the slow reply, correctly, as a reason to

10. **Source:** s6 (axis prompt echo of the cut fact) [HTML + v2]
   - BEFORE: whether you go quiet after one unanswered call the way the Duetting Frog does,
   - AFTER: whether you go quiet at the first sign of a no, the way the Duetting Frog does,

11. **Source:** s6, s8 (unverifiable; soften to the pair duets) [HTML + v2]
   - BEFORE: Once a genuine exchange is established, the calling pair can <b>sustain the matched back-and-forth</b> over repeated rounds, each call shaped by the one before it.
   - AFTER: Once a receptive female answers, <b>the pair duets</b>, and frogs that duet are more likely to go on to mate.

## crowned-crane

1. **Source:** s13, s12 (header glyph is not the species name; rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v2]
   - BEFORE (HTML): <span class="rail__han" aria-hidden="true">鶴</span> … data-say="鶴" aria-label="Hear 鶴, hè" … <span class="rail__py" lang="zh-Latn-pinyin">hè</span>
   - AFTER (HTML): <span class="rail__han" aria-hidden="true">冠鶴</span> … data-say="冠鶴" aria-label="Hear 冠鶴, guànhè" … <span class="rail__py" lang="zh-Latn-pinyin">guànhè</span>
   - BEFORE (HTML): <span class="serial-han">鶴</span> and <span class="h" lang="zh">鶴</span><span class="py" lang="zh-Latn-pinyin">hè</span>
   - AFTER (HTML): <span class="serial-han">冠鶴</span> and <span class="h" lang="zh">冠鶴</span><span class="py" lang="zh-Latn-pinyin">guànhè</span>
   - Template: animalHan "鶴" to "冠鶴", animalHanPy "hè" to "guànhè". Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

2. **Source:** s5, s6 (distance clause unsourced, cut) [HTML + v2]
   - BEFORE: unique to the crane genus <i>Balearica</i> and <b>visible across open grassland long before the bird is close enough to identify any other way</b>.
   - AFTER: <b>a crown found only in the genus <i>Balearica</i></b> and on no other crane.

3. **Source:** s5, s12 (wording: grey and black crowned cranes) [HTML + v2]
   - BEFORE: Crowned cranes are, along with the black crowned crane, <b>the only cranes able to roost in trees</b>
   - AFTER: Grey crowned cranes, along with black crowned cranes, are <b>the only cranes able to roost in trees</b>

4. **Source:** s6, s7 (for years not confirmed) [HTML + v2]
   - BEFORE: Crowned cranes typically form <b>monogamous pair bonds that hold for years</b>,
   - AFTER: Crowned cranes form <b>monogamous pairs</b>,

5. **Source:** s6, s7 (trait title, lifelong not confirmed) [HTML + v2]
   - BEFORE: The lifelong pair
   - AFTER: The faithful pair

6. **Source:** s6, s7 (frame, for years not confirmed) [HTML + v2]
   - BEFORE: a bird that chooses one partner and keeps it for years.
   - AFTER: a bird that chooses one partner and stays with it.

7. **Source:** s6, s7 (axis read, for years not confirmed) [HTML + v2]
   - BEFORE: a bird that keeps the same partner across years,
   - AFTER: a bird that keeps to one partner,

8. **Source:** s5 (recognition and mood function unverifiable, cut) [HTML + v2]
   - BEFORE: Bare white and red facial patches, individual in exact pattern, let cranes <b>identify one another and read mood at a distance</b> before any sound is made.
   - AFTER: The face carries <b>a bare white cheek patch and a patch of red bare skin</b>, and the two subspecies differ in how much red they show.

## coconut-crab

1. **Source:** c15 (header glyph is not the species name; rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v1 + v2]
   - BEFORE (HTML): <span class="rail__han" aria-hidden="true">蟹</span> … data-say="蟹" aria-label="Hear 蟹, xiè" … <span class="rail__py" lang="zh-Latn-pinyin">xiè</span>
   - AFTER (HTML): <span class="rail__han" aria-hidden="true">椰子蟹</span> … data-say="椰子蟹" aria-label="Hear 椰子蟹, yēzixiè" … <span class="rail__py" lang="zh-Latn-pinyin">yēzixiè</span>
   - BEFORE (HTML): <span class="serial-han">蟹</span> and <span class="h" lang="zh">蟹</span><span class="py" lang="zh-Latn-pinyin">xiè</span>
   - AFTER (HTML): <span class="serial-han">椰子蟹</span> and <span class="h" lang="zh">椰子蟹</span><span class="py" lang="zh-Latn-pinyin">yēzixiè</span>
   - Template: animalHan "蟹" to "椰子蟹", animalHanPy "xiè" to "yēzixiè". Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

2. **Source:** c5, c7 (burrow for decades unverifiable) [HTML + v1 + v2]
   - BEFORE: dug into a burrow on a tropical island it will defend for decades.
   - AFTER: sheltering in a burrow it digs for itself on a tropical island.

3. **Source:** c5, c7, c8 (age wrong) [HTML + v1 + v2]
   - BEFORE: At two to three years old, still under two centimetres long, it
   - AFTER: At about a year old, around a centimetre long, it

4. **Source:** c6 (3,300 N is an estimate) [HTML + v1 + v2]
   - BEFORE: <b>1,765 newtons and projected past 3,300 newtons in the largest individuals</b>
   - AFTER: <b>1,765 newtons and estimated at about 3,300 newtons for the largest individuals</b>

5. **Source:** c5, c8 (one-hour figure weak; lung is modified gill tissue) [HTML + v1 + v2]
   - BEFORE: a gill-and-lung hybrid that pulls oxygen from air rather than water, and they <b>drown if kept submerged for more than about an hour</b>.
   - AFTER: built from modified gill-chamber tissue, that pulls oxygen from air rather than water, and they <b>can drown if held under water</b>.

6. **Source:** c7, c9, c10, c5 (term and organ wrong) [HTML + v1 + v2]
   - BEFORE: The crab's antennae carry insect-like sensory structures called aesthetes,
   - AFTER: The crab's first antennae, the antennules, carry insect-like smell sensors called aesthetascs,

7. **Source:** c5, c7, c8 (maturity at about five; superlative unsourced) [HTML + v1 + v2]
   - BEFORE: until <b>forty to sixty years old</b>, one of the longest maturation periods of any invertebrate.
   - AFTER: until <b>forty to sixty years old</b>, though it can breed from about five.

8. **Source:** c5, c7 (larvae, not eggs, are released) [HTML + v1 + v2]
   - BEFORE: <b>females return to the shoreline to release their eggs into the surf</b>, and the hatched larvae drift
   - AFTER: <b>females return to the shoreline to release their larvae into the surf</b> as the eggs hatch, and the larvae drift

9. **Source:** c5, c7 (axis read, burrow for decades unverifiable) [HTML + v1 + v2]
   - BEFORE: Once it sheds the wandering hermit-crab years, the Coconut Crab digs and defends one burrow it returns to for decades,
   - AFTER: Once it sheds the wandering hermit-crab stage, the Coconut Crab digs its own burrow and lives alone in it,

10. **Source:** c5, c7 (habitat lede, same) [HTML + v1 + v2]
   - BEFORE: The Coconut Crab digs and defends a burrow it returns to for decades, and forages widely
   - AFTER: The Coconut Crab digs its own burrow, lives alone in it, and forages widely

11. **Source:** c17 (Purple Star) [HTML + v2]
   - BEFORE: and read for the Cancer Rat crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Cancer Rat crossing through two of them.

12. **Source:** c8 (age wrong, Purple Star text) [HTML + v2]
   - BEFORE: The juvenile crab spends two or three years wearing a shell it did not build,
   - AFTER: The juvenile crab spends about its first year wearing a shell it did not build,

13. **Source:** c17 (Purple Star) [HTML + v2]
   - BEFORE: Tian Fu near your Life palace tends to work the same way:
   - AFTER: In our reading, Tian Fu near your Life palace works the same way:

14. **Source:** c17 (star label; hub names Wu Qu The Finance General) [HTML]
   - BEFORE: <span class="en">the General star</span>
   - AFTER: <span class="en">the Finance General star</span>

15. **Source:** c17 (Purple Star) [HTML + v2]
   - BEFORE: Wu Qu working through a Cancer Rat chart tends to look the same way in a life:
   - AFTER: In our reading of the Cancer Rat, Wu Qu looks the same way in a life:

16. **Source:** c17 (Purple Star) [HTML + v2]
   - BEFORE: Those two together are the outline the Cancer Rat tends to share:
   - AFTER: Those two together are our outline for the Cancer Rat:

17. **Source:** c17 (Purple Star) [HTML + v2]
   - BEFORE: Your exact birth hour is what moves these stars into your own twelve palaces and shows which one runs loudest,
   - AFTER: Only your real chart, cast from your lunar birth date and hour, shows where these stars fall in your twelve palaces and which one runs loudest,

18. **Source:** c17 (template-only forms) [v2]
   - BEFORE: "name": "the General star" / "kicker": "What Purple Star already suspects about you"
   - AFTER: "name": "the Finance General star" / "kicker": "Our Purple Star reading for this crossing"

## Not applied

- humpback-whale overture frame "an animal documented placing itself between orcas and creatures it has no relation to": consistent with the corrected Pitman fact (humpbacks do interfere), so kept.
- humpback-whale reading lines that call the protection "instinctive" (band reading, stat label "Protective instinct", gifts list): symbolic copy, not fact claims. Unchanged.
- ghost-pipefish trait 03 reading "The visible partnership is often the supporting role": it leaned on the cut claim that the male is more visible. Reading kept; owner may want a new one.
- ghost-pipefish trait 02 reading and axis "rootedness" read still speak of moving with the host and the current; symbolic, kept. The trait 02 fact and the stillness axis read now say motionless.
- ghost-pipefish ov-lead "matches its host organism ... with such fidelity" and meta "the reef fish": broadly true (color usually matches surroundings; reefs are one habitat), kept. Many old em dashes remain in ghost-pipefish body copy (dossier style note); writing fix, out of scope. Two em dashes went away inside replaced sentences.
- ghost-pipefish Lunar New Year cusp note for Pisces: dossier says legitimate to add; an addition, not a correction. Not added.
- duetting-frog: page name, URL and title kept as "Duetting Frog" per instruction. Meta description does not misname the species ("calls out across still water" fits an underwater call), so unchanged. The Xenopus laevis sentence sits at the end of the ov-lead (HTML and v2 creature.lead).
- duetting-frog shadow and work copy about "stop calling" / "go still" (lines in Mirror shadow, work stall, axis read "One unanswered season"): human readings, not fact claims. The trait 05 title "One call, then quiet" kept; the fact under it is now the female's slow ticking call.
- duetting-frog Pronghorn is Aries, Libra's opposite sign (dossier note): not a fact error. Unchanged.
- crowned-crane: no Chinese 鶴 hè long-life symbolism found anywhere on the page or template, so nothing to remove. Trait 03 "Our reading" is empty (template bug, not a fact); IUCN Endangered status line suggested by dossier is an addition. Neither done.
- crowned-crane trait 06 reading "You are legible long before you speak ... reading your face": symbolic, kept; the fact under it no longer claims recognition or mood reading.
- coconut-crab proverb 天下之至柔，馳騁天下之至堅 tiān xià zhī zhì róu, chí chěng tiān xià zhī zhì jiān: dossier could not confirm the Daodejing ch. 43 attribution this session; the page already labels it a proverb with our own pairing. Unchanged.
- coconut-crab 天府 Tiān Fǔ label "the Steward star" vs hub "The Treasury": synonym, kept (R4 precedent).
- coconut-crab "decades" lines about growing armor (axis openness read, trait 05 reading, Wu Qu text, work long game): consistent with 40 to 60 years to full size. Kept.

## Structure check

All five pages parse with python html.parser. Every JSON-LD and application/json block parses (4 per page). Full HTML tag sequence matches the backups on four pages; on crowned-crane the only difference is trait 01, where <b> now wraps <i>Balearica</i> (well formed, same tags). All edited template JSON loads, keysets are unchanged, files keep indent=2. New text checked for em dash, en dash, arrow and the banned word list: none. No `<!--w4-reading-->` block on any of these pages. Related Animals explore-card labels, CSS and JS untouched. Git not run.

## Final header characters

- humpback-whale: 大翅鯨 dàchìjīng (was 鲸 jīng)
- ghost-pipefish: 剃刀魚 tìdāoyú (was 鬼龍鰧 guǐlóngténg)
- duetting-frog: 爪蟾 zhǎochán (was 蛙 wā)
- crowned-crane: 冠鶴 guànhè (was 鶴 hè)
- coconut-crab: 椰子蟹 yēzixiè (was 蟹 xiè)
