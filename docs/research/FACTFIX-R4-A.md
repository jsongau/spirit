# FACTFIX-R4-A change log

Date: 2026-11-08. Pages: lanner-falcon, galapagos-tortoise, three-wattled-bellbird, snowy-owl, pangolin.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). "x2" means the string occurred twice in that file. Lanner-falcon has v2 only; three-wattled-bellbird and snowy-owl have v1 only; galapagos-tortoise and pangolin have both.
Backups of the original pages: `~/factfix-backup-r4a/<slug>.html`; original template JSON in `~/factfix-backup-r4a/tpl/v1/` and `~/factfix-backup-r4a/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site (R2/R3 precedent: 錦雞, 風鳥, 鯨頭鸛). Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy.
Purple Star: the kicker and fine print on galapagos-tortoise and pangolin were already relabeled in HTML; the v2 data kicker still had the old text and now uses the R3 wording. Star copy that claimed Purple Star "keeps landing on", "tends to", "often seats" or "places" a star for the crossing was reworded as Zodi Animal's own reading, using the R3 sentences. Star labels aligned with the site hub where they conflicted (武曲 Wǔqū = The Finance General).

## lanner-falcon

1. **Source:** s8, s5 [HTML + v2]
   - BEFORE: operates across open, arid terrain as one of the very few raptors on earth documented to hunt cooperatively with a partner.
   - AFTER: operates across open country, from desert edge to grassland, as one of the falcons known to hunt in pairs.
2. **Source:** s5, s6 (stoop overstates the dive) [HTML + v2]
   - BEFORE: works out the angles of a coordinated stoop in real time
   - AFTER: works out the angles of a coordinated chase in real time
3. **Source:** s5, s6, s8, s13 [HTML + v2]
   - BEFORE: one bird drives prey toward the other, both coordinating stoops in real time — a behavior extremely rare among falcons.
   - AFTER: one bird drives prey toward the other, and the pair times the attack together.
4. **Source:** s5, s6, s7 (soften) [HTML + v2]
   - BEFORE: Lanner Falcons maintain <b>long-term pair bonds and return to the same nesting cliff sites for multiple years</b>, with elaborate aerial mutual displays reinforcing the bond.
   - AFTER: Lanner Falcon pairs <b>often keep the same nesting cliff for years</b>, and before breeding they soar and dive together in shared aerial displays.
5. **Source:** s5, s6 (stoop overstates the dive) [HTML + v2]
   - BEFORE: The Coordinated Stoop
   - AFTER: The Coordinated Chase
6. **Source:** s5, s6 [HTML + v2]
   - BEFORE: requiring real-time adjustment to the partner's line of flight.
   - AFTER: so each bird keeps adjusting to its partner's line of flight.
7. **Source:** s5, s6, s11 (unverifiable, replaced with horizontal pursuit) [HTML + v2]
   - BEFORE: Strategic Over Fast
   - AFTER: The Low Chase
8. **Source:** s5, s6, s11 (unverifiable, replaced with horizontal pursuit) [HTML + v2]
   - BEFORE: Falco biarmicus is historically noted by falconers as <b>more strategic than the Peregrine Falcon</b>, which relies primarily on speed; the Lanner is prized for tactical judgment over raw velocity.
   - AFTER: Where the Peregrine Falcon is famous for its dive from height, the Lanner <b>usually hunts by horizontal pursuit</b>, chasing prey low and fast across open ground or along a slope.
9. **Source:** s5, s6 (overstated) [HTML + v2]
   - BEFORE: Arid Terrain Specialist
   - AFTER: Open Country Hunter
10. **Source:** s5, s6 (overstated) [HTML + v2]
   - BEFORE: The Lanner Falcon specializes in <b>open, arid environments — desert edges, semi-arid scrub, savanna</b> — where visibility
   - AFTER: The Lanner Falcon hunts <b>open country, from desert edge to grassland and savanna, with a cliff nearby</b>, where visibility
11. **Source:** s5, s6 (overstated) [HTML + v2]
   - BEFORE: Falco biarmicus hunts across open, arid terrain where visibility
   - AFTER: Falco biarmicus hunts across open country, from desert edge to grassland, where visibility
12. **Source:** s7, s6, s5 (unverifiable) [HTML + v2]
   - BEFORE: In-flight Food Passes
   - AFTER: Food Brought Home
13. **Source:** s7, s6, s5 (unverifiable) [HTML + v2]
   - BEFORE: <b>Bonded Lanner pairs execute aerial food passes</b> — one bird transferring prey to the other mid-flight — a coordination that requires both birds to know the timing precisely.
   - AFTER: In a breeding pair, <b>the male brings food to the female at the nest</b> and keeps feeding her and the chicks, a handover both birds have to time.
14. **Source:** s5, s6 (axis read: stoop overstates the dive) [HTML + v2]
   - BEFORE: Lanner Falcon pairs are documented coordinating aerial stoops
   - AFTER: Lanner Falcon pairs are documented coordinating their attacks
15. **Source:** s5, s6, s7 (axis read, soften) [HTML + v2]
   - BEFORE: The Lanner is selective about its partner — pair bonds are long-term, established through mutual aerial display, and maintained over years.
   - AFTER: The Lanner is selective about its partner: pairs court with shared aerial displays and often keep the same cliff for years.

## galapagos-tortoise

1. **Source:** s12, s13 (proverb order: standard form is 天長地久 tiān cháng dì jiǔ) [HTML + v1 + v2]
   - BEFORE (HTML): ruby line 地 dì 久 jiǔ 天 tiān 長 cháng; pf-proverb__say data-say="地久天長"; character tiles in order 地 久 天 長
   - AFTER (HTML): ruby line 天 tiān 長 cháng 地 dì 久 jiǔ; pf-proverb__say data-say="天長地久"; character tiles reordered to 天 長 地 久 (each tile keeps its own data-say, pinyin, gloss and aria-label)
   - Template (v1, v2): proverb.say "地久天長" to "天長地久"; proverb.hanzi and proverb.chars arrays reordered to 天 長 地 久. The literal gloss is item below.
2. **Source:** s5 (add thought to be) [HTML + v1 + v2]
   - BEFORE: cut away and raised sharply at the front so the neck can stretch almost straight up to reach cactus pads
   - AFTER: cut away and raised sharply at the front, a shape thought to let the neck stretch almost straight up to reach cactus pads
3. **Source:** s5 (soften: water is stored in the bladder; stored fat not sourced) [HTML + v1 + v2]
   - BEFORE: drawing on stored body fat and a water-storage sac near the bladder;
   - AFTER: drawing on water stored in the bladder;
4. **Source:** s5 (axis read, stored fat not sourced) [HTML + v1 + v2]
   - BEFORE: burning stored fat and water at a metabolic rate slow enough
   - AFTER: living on stored water and a metabolic rate slow enough
5. **Source:** s5 (Purple Star text, stored fat not sourced) [HTML + v2]
   - BEFORE: can survive a full year on stored fat and water,
   - AFTER: can survive a full year without food or water,
6. **Source:** s5 (unverifiable clause cut) [HTML + v1 + v2]
   - BEFORE: with wild individuals commonly documented living <b>past 100 years</b> and some captive individuals estimated well beyond 150, a lifespan researchers link in part to an unusually slow, steady growth rate rather than any single organ or gene.
   - AFTER: with wild individuals thought to live <b>past 100 years</b> and some captive individuals estimated well beyond 150.
7. **Source:** s5 (soften) [HTML + v1 + v2]
   - BEFORE: In 1835, the acting vice-governor of the Galápagos told Charles Darwin that he could identify which island any tortoise had come from <b>by the shape of its shell alone</b>, an observation Darwin later cited among the evidence that shaped his early thinking on how isolated environments produce distinct forms.
   - AFTER: In 1835, the vice-governor of the Galápagos, Lawson, told Charles Darwin that he could tell <b>which island any tortoise came from</b>. Darwin had already mixed tortoises from two islands in his own collection, and only later grasped what the remark meant.
8. **Source:** s6, s5 (soften) [HTML + v1 + v2]
   - BEFORE: with tracking studies documenting individuals <b>returning to the same route year after year</b>, timed to the rains
   - AFTER: along <b>paths used for generations</b>, timed to the rains
9. **Source:** s6, s5 (axis read, soften) [HTML + v1 + v2]
   - BEFORE: Tracking studies on Galápagos tortoises show individuals walking the same route between feeding grounds year after year, decade after decade, on a schedule keyed to rainfall rather than a calendar.
   - AFTER: Galápagos tortoises walk between feeding grounds along paths their kind has used for generations, on a schedule keyed to rainfall rather than a calendar.
10. **Source:** s12, s13 (literal gloss follows the standard order) [HTML + v1 + v2]
   - BEFORE: the earth endures long, heaven lasts forever
   - AFTER: heaven lasts forever, the earth endures long
11. **Source:** s14 (Purple Star) [HTML + v2]
   - BEFORE: and read for the Taurus Dragon crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Taurus Dragon crossing through two of them.
12. **Source:** s14 (star label; hub names Wu Qu The Finance General) [HTML + v2]
   - BEFORE: the Martial star
   - AFTER: the Finance General star
13. **Source:** s14 (Purple Star) [HTML + v2]
   - BEFORE: and for a Taurus born in the Dragon year it tends to sit close to how you actually build anything.
   - AFTER: and in our reading of the Taurus Dragon it sits close to how you actually build anything.
14. **Source:** s14 (Purple Star) [HTML + v2]
   - BEFORE: Near the Life palace, 命宮, Purple Star often seats the steward,
   - AFTER: Near the Life palace, 命宮 mìnggōng, our reading seats the steward,
15. **Source:** s14 (Purple Star) [HTML + v2]
   - BEFORE: and that is a shape Purple Star tends to recognize in a Taurus Dragon before the chart has said another word.
   - AFTER: and that is the shape we read in a Taurus Dragon before the chart has said another word.
16. **Source:** s14 (Purple Star) [HTML + v2]
   - BEFORE: Your exact birth hour decides which palace they land in, and whether
   - AFTER: Only your real chart, cast from your lunar birth date and hour, shows which palace they land in, and whether
17. **Source:** s14 (kicker, v2 data; HTML already relabeled) [v2]
   - BEFORE: What Purple Star already suspects about you
   - AFTER: Our Purple Star reading for this crossing

## three-wattled-bellbird

1. **Source:** s17 (header glyph is not the species name; rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v1]
   - BEFORE (HTML): <span class="rail__han" aria-hidden="true">鈴</span> … data-say="鈴" aria-label="Hear 鈴, líng" … <span class="rail__py" lang="zh-Latn-pinyin">líng</span>
   - AFTER (HTML): <span class="rail__han" aria-hidden="true">肉垂鐘傘鳥</span> … data-say="肉垂鐘傘鳥" aria-label="Hear 肉垂鐘傘鳥, ròuchuízhōngsǎnniǎo" … <span class="rail__py" lang="zh-Latn-pinyin">ròuchuízhōngsǎnniǎo</span>
   - BEFORE (HTML): <span class="serial-han">鈴</span> and <span class="h" lang="zh">鈴</span><span class="py" lang="zh-Latn-pinyin">líng</span>
   - AFTER (HTML): <span class="serial-han">肉垂鐘傘鳥</span> and <span class="h" lang="zh">肉垂鐘傘鳥</span><span class="py" lang="zh-Latn-pinyin">ròuchuízhōngsǎnniǎo</span>
   - Template: animalHan "鈴" to "肉垂鐘傘鳥", animalHanPy "líng" to "ròuchuízhōngsǎnniǎo". Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.
2. **Source:** s12, s13, s14, s16 (superlative) [HTML + v1]
   - BEFORE: The male's call is likely the <b>loudest call made by any bird in the world</b>, carrying clearly
   - AFTER: The male's call is <b>among the loudest bird calls on Earth</b>, carrying clearly
3. **Source:** s13, s14 (axis read, superlative) [HTML + v1]
   - BEFORE: The male's call is, by most measures, the loudest sound made by any bird,
   - AFTER: The male's call is among the loudest sounds made by any bird,
4. **Source:** s9, s10, s11 (two parts wrong) [HTML + v1]
   - BEFORE: Young males take years to develop a finished call, and roughly half stay <b>fluent in two regional dialects at once</b> before settling, as adults, on a single song to sing for the rest of their lives.
   - AFTER: Young males take years to develop a finished call, and at Monteverde in Costa Rica many grow up <b>fluent in two regional dialects at once</b>. Even adults keep reworking their song over the years.
5. **Source:** s12, s15 (soften) [HTML + v1]
   - BEFORE: Feeding almost entirely on wild avocado and other Lauraceae fruit, the bellbird favors <b>broken branches as feeding perches</b> and disperses seeds so effectively into the sunlit gaps beneath them that it has been called the tree family's single most important disperser.
   - AFTER: Feeding mostly on wild avocado and other Lauraceae fruit, the bellbird sings from <b>broken branches above sunlit gaps</b> and drops seeds into the ground beneath them, where seedlings do better; the ecologist who measured it called it far and away the most effective disperser of Lauraceae seeds.

## snowy-owl

1. **Source:** s15 (header glyph is not the species name; rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v1]
   - BEFORE (HTML): <span class="rail__han" aria-hidden="true">鸮</span> … data-say="鸮" aria-label="Hear 鸮, xiāo" … <span class="rail__py" lang="zh-Latn-pinyin">xiāo</span>
   - AFTER (HTML): <span class="rail__han" aria-hidden="true">雪鴞</span> … data-say="雪鴞" aria-label="Hear 雪鴞, xuěxiāo" … <span class="rail__py" lang="zh-Latn-pinyin">xuěxiāo</span>
   - BEFORE (HTML): <span class="serial-han">鸮</span> and <span class="h" lang="zh">鸮</span><span class="py" lang="zh-Latn-pinyin">xiāo</span>
   - AFTER (HTML): <span class="serial-han">雪鴞</span> and <span class="h" lang="zh">雪鴞</span><span class="py" lang="zh-Latn-pinyin">xuěxiāo</span>
   - Template: animalHan "鸮" to "雪鴞", animalHanPy "xiāo" to "xuěxiāo". Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.
2. **Source:** s11, s13 (soften) [HTML + v1]
   - BEFORE: Unlike almost every other owl, the Snowy Owl is largely <b>diurnal, hunting by daylight</b> rather than at night, an adaptation to the near-continuous light of the Arctic summer.
   - AFTER: Unlike most owls, the Snowy Owl is largely <b>diurnal, hunting by daylight</b> rather than at night, a habit that fits the near-continuous light of the Arctic summer.
3. **Source:** s11 [HTML + v1]
   - BEFORE: and its clutch size swings from as few as 3 eggs to as many as 16 depending on
   - AFTER: and its clutch is usually 3 to 11 eggs, up to 16 in boom years, depending on
4. **Source:** s11, s12 (scope) [HTML + v1]
   - BEFORE: and after a documented collapse in lemming cycles, fledgling production across the species fell by roughly 98 percent.
   - AFTER: and in northeast Greenland, after the lemming cycle collapsed, fledgling production fell by roughly 98 percent.
5. **Source:** s11, s13 (cause) [HTML + v1]
   - BEFORE: a movement driven by scarcity on the tundra rather than by season or weather.
   - AFTER: a movement that tracking research ties to plenty: a lemming boom raises so many young owls that most of the birds heading south are juveniles.
6. **Source:** s11, s13 (reading under the corrected fact) [HTML + v1]
   - BEFORE: When a place stops giving you what you actually need, you leave it, sometimes farther than anyone watching expected.
   - AFTER: When a good season fills a place past what it can hold, you leave it, sometimes farther than anyone watching expected.
7. **Source:** s11, s13 (axis read, cause) [HTML + v1]
   - BEFORE: a poor season simply moves you hundreds of miles south to wherever the count is better.
   - AFTER: a crowded season can move you hundreds of miles south to wherever there is room.
8. **Source:** s14, s11 (borrowed from the Great Gray Owl) [HTML + v1]
   - BEFORE: Owls hunting through snow rely on directional hearing sensitive enough to <b>locate prey moving beneath a snow layer</b>, with low frequencies carrying furthest through it.
   - AFTER: Another owl of the far north, the Great Gray Owl, hunts through snow by ear, with hearing directional enough to <b>locate prey moving beneath a snow layer</b>; low frequencies carry furthest through it.
9. **Source:** s14, s11 (axis read, borrowed) [HTML + v1]
   - BEFORE: Between eyes built for daylight and a sense of hearing exact enough to find a body moving under snow,
   - AFTER: Between eyes built for daylight and long hours scanning from a perch,
10. **Source:** s12 (author) [HTML + v1]
   - BEFORE: Therrien et al. · Response of an arctic predator guild
   - AFTER: Schmidt et al. 2012 · Response of an arctic predator guild

## pangolin

1. **Source:** s14, s15, s16 (header glyph is not the species name; rail__han, rail__say, rail__py, serial-han, keepsake-han, template animalHan + animalHanPy) [HTML + v1 + v2]
   - BEFORE (HTML): <span class="rail__han" aria-hidden="true">甲</span> … data-say="甲" aria-label="Hear 甲, jiǎ" … <span class="rail__py" lang="zh-Latn-pinyin">jiǎ</span>
   - AFTER (HTML): <span class="rail__han" aria-hidden="true">穿山甲</span> … data-say="穿山甲" aria-label="Hear 穿山甲, chuānshānjiǎ" … <span class="rail__py" lang="zh-Latn-pinyin">chuānshānjiǎ</span>
   - BEFORE (HTML): <span class="serial-han">甲</span> and <span class="h" lang="zh">甲</span><span class="py" lang="zh-Latn-pinyin">jiǎ</span>
   - AFTER (HTML): <span class="serial-han">穿山甲</span> and <span class="h" lang="zh">穿山甲</span><span class="py" lang="zh-Latn-pinyin">chuānshānjiǎ</span>
   - Template: animalHan "甲" to "穿山甲", animalHanPy "jiǎ" to "chuānshānjiǎ". Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.
2. **Source:** s6, s7, s8 (frame repeats the corrected facts) [HTML + v1 + v2]
   - BEFORE: the only mammal wearing true keratin armor, a creature with no teeth at all that gets by on a tongue rooted near its own pelvis, and an animal whose single defense against lions, tigers, and leopards alike is simply becoming a shape nothing can open.
   - AFTER: a mammal wearing true keratin armor, a creature with no teeth at all that gets by on a tongue whose sheath runs back toward its own pelvis, and an animal whose main defense is simply becoming a shape most predators cannot open.
3. **Source:** s6, s7 (superlative unsourced) [HTML + v1 + v2]
   - BEFORE: the same structural protein that makes up human hair and fingernails; it is the only mammal group with this kind of armor.
   - AFTER: the same structural protein that makes up human hair and fingernails.
4. **Source:** s7, s8 (overstated) [HTML + v1 + v2]
   - BEFORE: a defense effective even against lions, tigers, and leopards.
   - AFTER: a ball most predators cannot open, though big cats still take some.
5. **Source:** s6, s8 (partly wrong) [HTML + v1 + v2]
   - BEFORE: anchored not near the jaw but deep in the body near the pelvis and last ribs.
   - AFTER: anchored not near the jaw but to a long extension of the breastbone that runs back toward the pelvis.
6. **Source:** s6, s7 (caveats) [HTML + v1 + v2]
   - BEFORE: With weak eyesight and hearing, the Pangolin instead navigates, forages, and <b>locates buried ant and termite nests almost entirely by smell</b>, digging its own burrows and living a largely solitary, nocturnal life.
   - AFTER: With weak eyesight, the Pangolin instead navigates, forages, and <b>locates buried ant and termite nests almost entirely by smell</b>; ground pangolins dig their own burrows, and most species live a largely solitary, nocturnal life.
7. **Source:** s6, s7 (axis read, hearing contested) [HTML + v1 + v2]
   - BEFORE: With weak eyesight and hearing, the Pangolin reads
   - AFTER: With weak eyesight, the Pangolin reads
8. **Source:** s18 (Purple Star) [HTML + v2]
   - BEFORE: and read for the Taurus Snake crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Taurus Snake crossing through two of them.
9. **Source:** s18 (Purple Star, no traditional basis) [HTML + v2]
   - BEFORE: Purple Star places the vault star, Tian Fu, near the Life Palace for people who share your crossing, and it names
   - AFTER: In our reading, the vault star, Tian Fu, sits near the Life Palace for your crossing, and it names
10. **Source:** s18 (kicker, v2 data; HTML already relabeled) [v2]
   - BEFORE: What Purple Star already suspects about you
   - AFTER: Our Purple Star reading for this crossing
11. **Source:** s18 (Purple Star) [HTML + v2]
   - BEFORE: Your exact birth hour is what moves both stars into your own twelve palaces and shows which one is actually running the door.
   - AFTER: Only your real chart, cast from your lunar birth date and hour, shows where these two stars fall in your twelve palaces and which one is actually running the door.
12. **Source:** s17 (proverb gloss: no lake in 知止而後有定) [HTML + v1 + v2]
   - BEFORE: The proverb's lake is your ball: the moment the body stops moving is not defeat, it is the shape finally finding its basin.
   - AFTER: The proverb's resting point is your ball: the moment the body stops moving is the shape finally finding where it rests.
13. **Source:** s17 (attribution) [HTML]
   - BEFORE: A proverb we tie to the <a href="/chinese-zodiac/snake/">Year of the Snake</a>.
   - AFTER: A line from the Great Learning, 大學 Dàxué, that we tie to the <a href="/chinese-zodiac/snake/">Year of the Snake</a>.
14. **Source:** s17 (attribution, template form) [v1 + v2]
   - BEFORE: A proverb we tie to the Year of the Snake.
   - AFTER: A line from the Great Learning, 大學 Dàxué, that we tie to the Year of the Snake.

## Not applied

- lanner-falcon header 隼 sǔn and galapagos-tortoise header 龟 guī: audit verdict OK, so unchanged. Note: 龟 is simplified while the galapagos proverb is traditional (dossier says pick one; 龜 guī would match the site). Left for an owner call because the task named only three headers.
- lanner-falcon stoop imagery: the trait title, fact, frame line and perception read now say chase or attack. The symbolic copy still leans on "the stoop" (meta description "coordinates the stoop", Fusion, Moon, Becoming, proverb soul, lesson). page_bugs asks for a rewrite toward the low chase; that is a section rewrite, not a fact fix.
- lanner-falcon Match II Swift (Gemini x Horse) and the suggested Shijing / I Ching falcon lines: page_bugs, not fact_audit items.
- galapagos-tortoise proverb soul "People mistake the stillness for an absence of ambition": banned shape flagged in page_bugs; writing fix, not a fact. Unchanged.
- galapagos-tortoise / pangolin 天府 label ("the Storehouse star", "the Vault star") vs hub "The Treasury", and pangolin 天同 "the Contentment star" vs hub "The Harmony Star": synonyms, not wrong; R3 kept "Storehouse" too. Unchanged.
- three-wattled-bellbird trait title "The two songs, and the one you keep" and reading lines about choosing one dialect ("You picked your one dialect", dial reads): the fact under them now says adults keep reworking their song. Headings and readings kept; owner may want new ones.
- three-wattled-bellbird header 肉垂鐘傘鳥 is five characters; rail and keepsake layout were not changed (no CSS touched). Worth a visual check.
- three-wattled-bellbird sources list lacks Kroodsma 2013 and Wenny and Levey 1998 (page_bugs). Nothing listed is wrong, so nothing added.
- snowy-owl trait title "The ear that finds what the eye can't": the fact now credits the Great Gray Owl. Title kept.
- snowy-owl sources list cites PMC4337749 and a snowmelt paper that no visible fact uses (page_bugs). Unchanged.
- pangolin 2020 Chinese Pharmacopoeia removal and CITES Appendix I: suggested additions in an OK item, not corrections. Not added.
- pangolin "2 em dash characters in source": both are in shared nav copy, not page facts. Unchanged.
- Renderer strings: the "The reading here is our outline for the <Sign Animal> crossing" hint is already honest on all five pages. Unchanged.

## Structure check

All five pages parse with python html.parser. Every JSON-LD and application/json block parses (4 per page). Section counts and the full HTML tag sequence match the backups. All edited template JSON loads and keysets are unchanged (files written with the same indent=2 format they had). No new em dash, en dash or arrow in any new text; lanner-falcon lost 6 old em dashes inside replaced sentences. No `<!--w4-reading-->` block on any of these pages. No CSS or JS touched. Git not run.

## Final header characters

- lanner-falcon: 隼 sǔn (unchanged)
- galapagos-tortoise: 龟 guī (unchanged)
- three-wattled-bellbird: 肉垂鐘傘鳥 ròuchuízhōngsǎnniǎo (was 鈴 líng)
- snowy-owl: 雪鴞 xuěxiāo (was 鸮 xiāo)
- pangolin: 穿山甲 chuānshānjiǎ (was 甲 jiǎ)
