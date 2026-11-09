# FACTFIX-R11-B change log

Date: 2026-11-08. Pages: caracara, cassowary, chambered-nautilus, coati, cuttlefish.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). Where a string occurred more than once in a file every occurrence was replaced (counts noted). Caracara and coati have v2 only; cuttlefish has v1 only; cassowary and chambered-nautilus have both (chambered-nautilus v1 is an unfilled stub: only its animalHan placeholder was filled).
Backups of the original pages: `~/factfix-backup-r11b/<slug>.html`; original template JSON in `~/factfix-backup-r11b/tpl/v1/` and `~/factfix-backup-r11b/tpl/v2/`; original `tools/han-pinyin.json` in `~/factfix-backup-r11b/han-pinyin.json` (all outside the repo).
Glyphs use traditional forms to match the site. Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy.
Purple Star: cassowary and chambered-nautilus stated star placements as what Purple Star "often places" or "tends to" do for a Western sign plus year. Zi Wei Dou Shu charts ignore the Western sign, so both are relabeled as our own reading (items below), and the v2 kicker "What Purple Star already suspects about you" now matches the live label "Our Purple Star reading for this crossing". Caracara, coati and cuttlefish carry no star assignment; their Purple Star copy already says a chart is cast from lunar birth date and hour. Nothing changed there. No "traditional pairing" line found on any of the five pages beyond the existing "our own reading, not tradition" notes. Related Animals explore-card labels not touched.

## caracara

1. **Source:** s10, s11, s5 (WRONG: it is a falcon built like a hawk; title) [HTML + v2]
   - BEFORE: A falcon-shaped hawk that hunts on foot,
   - AFTER: A falcon built like a long-legged hawk that hunts on foot,
2. **Source:** s10, s11, s5 (WRONG: backwards; unlike any other cut) [HTML + v2]
   - BEFORE: is a large, falcon-shaped hawk of the Americas — technically a falcon but ecologically unlike any other,
   - AFTER: is a large falcon of the Americas, built like a long-legged hawk and unlike most of its family in how it lives,
3. **Source:** s11, s12, s13, s14, s5 (frame repeats corrected facts; tool use cut) [HTML + v2]
   - BEFORE: the expressive face that flushes when engaged, the tool use in some populations, the loose groupings that form and dissolve around resources.
   - AFTER: the expressive face that changes color with mood, the harsh head-thrown call, the pairs that hold ground yet tolerate a crowd at carrion.
4. **Source:** s11, s5, s7 (lifetime comparison unsourced) [HTML + v2]
   - BEFORE: and chase prey — spending more time on foot than most falcons spend in a lifetime.
   - AFTER: and chase prey; one raptor guide says it walks as much as it flies.
5. **Source:** s10, s5 (superlative unverifiable) [HTML + v2]
   - BEFORE: — one of the most generalist diets in the falcon family, obtained
   - AFTER: , a broad diet obtained
6. **Source:** s10, s5 (UNVERIFIABLE superlative, gift text) [HTML + v2]
   - BEFORE: No other raptor maintains this range simultaneously. 
   - AFTER: (removed)
7. **Source:** s5, s7, s13 (mechanism unverifiable; reworded to sourced behavior) [HTML + v2]
   - BEFORE: and can displace them — using the vulture's detection ability to locate food, then arriving on foot to take what was found.
   - AFTER: and often drive them off, sometimes waiting for the vultures to open a carcass before moving in.
8. **Source:** s5, s7, s13 (reading under corrected fact) [HTML + v2]
   - BEFORE: You use other systems' detection capabilities without apology.
   - AFTER: You let other systems do the groundwork without apology.
9. **Source:** s5, s7, s13 (guard text, same mechanism) [HTML + v2]
   - BEFORE: Caracaras follow vultures to carcasses and displace them if needed. They use other animals' detection systems
   - AFTER: Caracaras feed beside vultures at carcasses and drive them off if needed. They often let the vultures open the carcass first
10. **Source:** s5, s7, s13 (mirror state, same mechanism) [HTML + v2]
   - BEFORE: tend to use other systems' detection before initiating your own pursuit.
   - AFTER: tend to let others do the groundwork before initiating your own pursuit.
11. **Source:** s11, s13, s5, s12 (WRONG direction: face goes toward yellow when excited) [HTML + v2]
   - BEFORE: <b>flushes deeper red during arousal, excitement, or alarm</b> — an involuntary chromatic signal that announces the bird's internal state.
   - AFTER: <b>shifts color with mood</b>, from orange-red toward yellow when the bird is excited, by most accounts, an involuntary signal of its internal state.
12. **Source:** s14, s7, s5 (UNVERIFIABLE stick tool use, likely borrowed from another species; trait swapped to the sourced call) [HTML + v2]
   - BEFORE: The stick
   - AFTER: The head-thrown call
13. **Source:** s14, s7, s5 (trait swapped: Darwin's account of the call; name is onomatopoeic) [HTML + v2]
   - BEFORE: Some caracara populations have been <b>observed using sticks and other objects</b> to dig out prey or move obstacles — documented under specific conditions requiring novel solutions.
   - AFTER: When it calls, the caracara <b>throws its head back until the crown almost touches its back</b>, as Darwin described in 1839. The harsh rattle is where the name comes from: karakará in Old Tupi.
14. **Source:** s7 (reading under the swapped trait) [HTML + v2]
   - BEFORE: Your capacity for unusual solutions is real. <em>It activates in the right circumstances — not constantly, but there when the situation requires what the standard kit does not contain.</em>
   - AFTER: When you finally believe in something, you say it at full volume. <em>Nobody on the open ground can claim they missed it.</em>
15. **Source:** s14, s10 (axis read: sticks and no-other-raptor cut) [HTML + v2]
   - BEFORE: , and has been observed using sticks to dig out prey. No other raptor maintains this range of strategies simultaneously.
   - AFTER: . Few raptors keep this many strategies in use at once.
16. **Source:** s11, s5, s12 (two to ten unsourced; trait title) [HTML]
   - BEFORE: The loose coalition</h3>
   - AFTER: The pair and the crowd</h3>
17. **Source:** s11, s5, s12 (UNVERIFIABLE group size; territorial pairs that tolerate gatherings at carrion) [HTML + v2]
   - BEFORE: Crested Caracaras form <b>loose, flexible groups of two to ten birds</b> that aggregate around food sources and disperse when resources are exhausted — not a permanent flock, not solitary, but situationally social.
   - AFTER: Crested Caracaras usually live as <b>pairs that hold a territory year-round</b>, often for years, yet several birds will gather at a large carcass and go their own ways once it is spent.
18. **Source:** s11, s5, s12 (axis read, same) [HTML + v2]
   - BEFORE: Caracaras form loose, flexible groupings that aggregate around resources and dissolve when they are spent.
   - AFTER: Caracara pairs keep one territory for years, yet tolerate gatherings at a big carcass that dissolve once it is spent.
19. **Source:** s5, s15 (taxonomy dated: now one species with subspecies cheriway) [HTML + v2]
   - BEFORE: Crested Caracara (Caracara cheriway)
   - AFTER: Crested Caracara (Caracara cheriway, now Caracara plancus cheriway)
20. **Source:** s5, s15 (taxonomy dated) [HTML + v2]
   - BEFORE: Caracara plancus (Southern Crested Caracara)
   - AFTER: Caracara plancus (Crested Caracara)
21. **Source:** s11, s5, s12 (v2 trait name is a whole-value string; the phrase also appears in reading copy, which was kept) [v2]
   - BEFORE: "name": "The loose coalition"
   - AFTER: "name": "The pair and the crowd"
   - Header: 卡拉卡拉鷹 kǎlākǎlā yīng kept. Dossier verdict is OK (imprecise): genus name, acceptable. The more precise species name 鳳頭巨隼 fèngtóu jùsǔn is available if wanted.

## cassowary

1. **Source:** s14, s15, s16 (header: 鴕 tuó is ostrich; cassowary is 鶴鴕 hètuó) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">鴕</span>
   - AFTER: <span class="rail__han" aria-hidden="true">鶴鴕</span>
2. **Source:** s14, s15, s16 (header) [HTML] (HTML x2)
   - BEFORE: data-say="鴕" aria-label="Hear 鴕, tuó"
   - AFTER: data-say="鶴鴕" aria-label="Hear 鶴鴕, hètuó"
3. **Source:** s14, s15, s16 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">tuó</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">hètuó</span>
4. **Source:** s14, s15, s16 (header) [HTML]
   - BEFORE: <span class="serial-han">鴕</span>
   - AFTER: <span class="serial-han">鶴鴕</span>
5. **Source:** s14, s15, s16 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">鴕</span><span class="py" lang="zh-Latn-pinyin">tuó</span>
   - AFTER: <span class="h" lang="zh">鶴鴕</span><span class="py" lang="zh-Latn-pinyin">hètuó</span>
6. **Source:** s6 (WRONG: 50 km/h is about 30 mph; title contradicted body) [HTML + v1 + v2]
   - BEFORE: The forty-mile run
   - AFTER: The thirty-mile run
7. **Source:** s6 (near-vertical unverifiable; jump up to 1.5 m sourced) [HTML + v1 + v2]
   - BEFORE: clear obstacles with a near-vertical jump,
   - AFTER: jump as high as about 1.5 metres to clear obstacles,
8. **Source:** s6, s9, s10 (WRONG: gut passage boosts germination, not required; only-disperser scoped to Australia) [HTML + v1 + v2]
   - BEFORE: it is the only long-distance disperser for a number of large-seeded rainforest plants, some of which depend on passing through a cassowary to germinate at all.
   - AFTER: it is the only long-distance disperser for a number of large-seeded Australian rainforest plants, and some seeds germinate far better after passing through a cassowary.
9. **Source:** no source (superlative unverifiable; overture title) [HTML + v1 + v2]
   - BEFORE: One of the most feared claws alive, spent almost
   - AFTER: A claw people rightly fear, spent almost
10. **Source:** s6, s7 (superlative unverifiable; claw used almost only in defence) [HTML + v1 + v2]
   - BEFORE: a bird carrying one of the most feared claws in the animal kingdom that it almost never uses,
   - AFTER: a bird carrying a dagger of a claw that it uses almost only in defence,
11. **Source:** s17 (WRONG: ZWDS ignores the Western sign; relabeled as our pairing) [HTML + v2]
   - BEFORE: For an Aries born in the Rooster year, Purple Star often places the steward star near the Life Palace, 命宮, the one classical texts call the keeper of stores.
   - AFTER: For an Aries born in the Rooster year, our own reading pairs this crossing with the steward star, the one classical texts call the keeper of stores. Where it lands in a real chart, near the Life Palace 命宮 mìng gōng or not, depends on your lunar birth date and hour.
12. **Source:** s17 (WRONG: same; relabeled) [HTML + v2]
   - BEFORE: The warrior star rarely sits quietly in a chart, and where Purple Star finds it near an Aries Rooster crossing, it tends to sit close to how a person actually meets a real threat:
   - AFTER: The warrior star rarely sits quietly in a chart, and in our own reading for the Aries Rooster crossing it speaks to how a person actually meets a real threat:
13. **Source:** no source (superlative unverifiable) [HTML + v2]
   - BEFORE: the one weapon in the animal kingdom most feared and least used,
   - AFTER: a weapon feared far more often than it is used,
14. **Source:** s17 (template kicker implied tradition; matched to the live page label) [v2]
   - BEFORE: What Purple Star already suspects about you
   - AFTER: Our Purple Star reading for this crossing
   - Template: animalHan "鴕" to "鶴鴕", animalHanPy "tuó" to "hètuó" (v1 + v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## chambered-nautilus

1. **Source:** s12, s13 (header: 螺 luó is any spiral shell; the nautilus is 鸚鵡螺 yīngwǔluó) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">螺</span>
   - AFTER: <span class="rail__han" aria-hidden="true">鸚鵡螺</span>
2. **Source:** s12, s13 (header) [HTML] (HTML x2)
   - BEFORE: data-say="螺" aria-label="Hear 螺, luó"
   - AFTER: data-say="鸚鵡螺" aria-label="Hear 鸚鵡螺, yīngwǔluó"
3. **Source:** s12, s13 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">luó</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">yīngwǔluó</span>
4. **Source:** s12, s13 (header) [HTML]
   - BEFORE: <span class="serial-han">螺</span>
   - AFTER: <span class="serial-han">鸚鵡螺</span>
5. **Source:** s12, s13 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">螺</span><span class="py" lang="zh-Latn-pinyin">luó</span>
   - AFTER: <span class="h" lang="zh">鸚鵡螺</span><span class="py" lang="zh-Latn-pinyin">yīngwǔluó</span>
6. **Source:** s6, s7, s8 (trait title: buoyancy is not a lift system) [HTML + v2]
   - BEFORE: Depth held by pressure
   - AFTER: Depth held level
7. **Source:** s6, s7, s8 (WRONG: buoyancy changes are slow osmotic adjustments; it rises and sinks by jet through the hyponome) [HTML + v2]
   - BEFORE: It controls how deep it sits by adjusting that gas by tiny amounts, and <b>rises and sinks by managing pressure rather than by swimming</b> hard against the water.
   - AFTER: It keeps itself close to weightless in the water, adjusting the gas and liquid in its chambers only slowly, and <b>rises and sinks by jet</b>, pushing water out through a funnel.
8. **Source:** s6, s7 (reading under corrected fact: it does swim) [HTML + v2]
   - BEFORE: a slow adjustment that carries you a long way without a visible stroke.
   - AFTER: a slow adjustment that keeps you level, so the few strokes you do make carry you a long way.
9. **Source:** s7, s6 (WRONG: old textbook model; tracking shows night movement between about 130 and 700 m, daytime resting and foraging deep) [HTML + v2]
   - BEFORE: Each night it rises toward shallower reef water to feed, and <b>sinks back down into the dark before daylight</b>, spending the bright hours deep and unseen.
   - AFTER: Through the night it moves up and down the reef wall, from about 130 meters down to 700, and <b>spends the bright hours deep</b>, resting or foraging out of sight.
10. **Source:** s6, s5 (WRONG: tentacles lack suckers but adhere strongly; count up to about ninety) [HTML + v2]
   - BEFORE: It explores with around ninety small tentacles that grip nothing tightly,
   - AFTER: It explores with up to about ninety small tentacles that have no suckers yet cling hard with a sticky secretion,
11. **Source:** s5, s6 (UNVERIFIABLE: only K-Pg survival confirmed) [HTML]
   - BEFORE: The nautilus line has outlasted five mass extinctions by reading the water,
   - AFTER: The nautilus line came through the extinction that ended the dinosaurs by reading the water,
12. **Source:** s5, s6 (500 million years applies to nautiloids as a group) [HTML]
   - BEFORE: the way your animal's line has waited five hundred million years.
   - AFTER: the way its nautiloid ancestors have waited about five hundred million years.
13. **Source:** s6, s7 (feng shui lede repeated the pressure-control claim) [HTML + v2]
   - BEFORE: It controls its depth, its light, and its pressure from the inside.
   - AFTER: It keeps its own buoyancy steady from the inside and seals each room behind it.
14. **Source:** s7, s6 (bedroom card repeated the night-rise model) [HTML + v2]
   - BEFORE: suit a creature that spends the bright hours deep and only rises in the dark.
   - AFTER: suit a creature that spends the bright hours deep and does most of its moving in the dark.
15. **Source:** s7, s6 (moon text repeated the night-rise model) [HTML + v2]
   - BEFORE: The Chambered Nautilus rises to feed in the darkest water,
   - AFTER: The Chambered Nautilus does much of its moving up the reef wall in the dark,
16. **Source:** s14 (WRONG: ZWDS ignores the Western sign; relabeled as our pairing) [HTML + v2]
   - BEFORE: For a Cancer born in the Snake year, the Moon star tends to sit bright in the chart.
   - AFTER: For a Cancer born in the Snake year, our own reading pairs this crossing with the Moon star.
17. **Source:** s14 (WRONG: same; relabeled) [HTML + v2]
   - BEFORE: Near the Life palace, 命宮, Purple Star tends to place the vault star, the keeper of stores.
   - AFTER: Our reading also pairs it with the vault star, the keeper of stores.
18. **Source:** s14 (close implied a shared chart pattern) [HTML + v2]
   - BEFORE: That is the outline the Cancer Snake tends to share.
   - AFTER: That is our outline for the Cancer Snake crossing.
19. **Source:** s14 (template kicker implied tradition; matched to the live page label) [v2]
   - BEFORE: What Purple Star already suspects about you
   - AFTER: Our Purple Star reading for this crossing
   - Template: animalHan "螺" to "鸚鵡螺", animalHanPy "luó" to "yīngwǔluó" (v2); v1 animalHan placeholder "TODO: one hanzi for the creature" to "鸚鵡螺" (v1 has no animalHanPy key, none added). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.

## coati

1. **Source:** k19, k18, k17 (header: 長鼻浣熊 is the mountain coati on zh Wikipedia; Nasua nasua is 南美浣熊 nánměi huànxióng) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">長鼻浣熊</span>
   - AFTER: <span class="rail__han" aria-hidden="true">南美浣熊</span>
2. **Source:** k19, k18, k17 (header) [HTML] (HTML x2)
   - BEFORE: data-say="長鼻浣熊" aria-label="Hear 長鼻浣熊, chángbí huànxióng"
   - AFTER: data-say="南美浣熊" aria-label="Hear 南美浣熊, nánměi huànxióng"
3. **Source:** k19, k18, k17 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">chángbí huànxióng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">nánměi huànxióng</span>
4. **Source:** k19, k18, k17 (header) [HTML]
   - BEFORE: <span class="serial-han">長鼻浣熊</span>
   - AFTER: <span class="serial-han">南美浣熊</span>
5. **Source:** k19, k18, k17 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">長鼻浣熊</span><span class="py" lang="zh-Latn-pinyin">chángbí huànxióng</span>
   - AFTER: <span class="h" lang="zh">南美浣熊</span><span class="py" lang="zh-Latn-pinyin">nánměi huànxióng</span>
6. **Source:** k12, k11, k13 (WRONG: Nasua nasua is South American only; Arizona coatis are Nasua narica) [HTML + v2]
   - BEFORE: inhabits tropical and subtropical forests from Arizona to Argentina
   - AFTER: lives in the tropical and subtropical forests of South America, from Colombia and Venezuela to Argentina and Uruguay
7. **Source:** k15, k13, k12 (60-degree rotation unverifiable; trait title) [HTML + v2]
   - BEFORE: The Rotating Snout
   - AFTER: The Flexible Snout
8. **Source:** k15, k13, k12 (60-degree rotation unverifiable) [HTML + v2]
   - BEFORE: The coati's elongated snout is highly mobile — it can <b>rotate up to 60 degrees in any direction</b>, allowing it
   - AFTER: The coati's long snout is <b>very flexible</b>, allowing it
9. **Source:** k15, k13, k12 (axis read, same) [HTML + v2]
   - BEFORE: snout can rotate 60 degrees and probe
   - AFTER: snout can bend and probe
10. **Source:** k15, k13, k12 (gift text, same) [HTML + v2]
   - BEFORE: the coati's nose that can rotate 60 degrees into a crevice
   - AFTER: the coati's nose that can bend into a crevice
11. **Source:** k15, k13, k12 (bonds lead, same) [HTML + v2]
   - BEFORE: with the rotating snout of the precision instrument
   - AFTER: with the flexible snout of the precision instrument
12. **Source:** k12, k11, k16 (soften band size) [HTML + v2]
   - BEFORE: bands of 10 to 30 individuals
   - AFTER: bands of up to about 30 individuals
13. **Source:** k12 (exhaustive working of a site unverifiable; replaced with sourced foraging) [HTML + v2]
   - BEFORE: <b>it works the site exhaustively</b>, overturning every stone, probing every crevice, before moving on. The investigation is not superficial; the site is fully exploited before abandonment.
   - AFTER: it works the site closely, <b>digging food out of rotting logs with its claws</b> and searching the leaf litter with its snout before moving on.
14. **Source:** k13, k12 (tail signal is secondary; soften) [HTML + v2]
   - BEFORE: functioning as a visual signal that keeps
   - AFTER: which is thought to work as a visual signal that keeps
15. **Source:** k14 (midday heat and recovery mechanism unsourced; trait title) [HTML + v2]
   - BEFORE: The Midday Nap
   - AFTER: The Daytime Rest
16. **Source:** k14 (rest pattern documented for the white-nosed coati only; recovery mechanism invented) [HTML + v2]
   - BEFORE: After intensive morning foraging, coatis typically <b>rest during the midday heat for several hours</b> before resuming foraging in the afternoon. The rest is not incidental — it is built into the foraging cycle as the system's recovery mechanism.
   - AFTER: Coatis <b>may rest for up to several hours during the day</b> between bouts of foraging. That pattern is recorded for the closely related white-nosed coati.
17. **Source:** k13, k14 (map territory overstated) [HTML + v2]
   - BEFORE: to <b>map territory and communicate social information</b>
   - AFTER: to <b>leave scent on objects in their home range and pass on social information</b>
18. **Source:** no source (proverb is a modern sentence, not a traditional saying; relabeled) [HTML + v2]
   - BEFORE: A proverb we tie to the
   - AFTER: A modern saying, not a traditional proverb or chengyu 成語 chéngyǔ. We tie it to the
19. **Source:** no source (eyebrow implied tradition; HTML only, the eyebrow is template-wide) [HTML]
   - BEFORE: <p class="eyebrow">The proverb of your year</p>
   - AFTER: <p class="eyebrow">A saying for your year</p>
20. **Source:** no source (section aria-label, same) [HTML]
   - BEFORE: aria-label="The proverb of your year"
   - AFTER: aria-label="A saying for your year"
21. **Source:** style (template text leaked into the sources block) [HTML + v2]
   - BEFORE: BirdLife International is not applicable; see: Emmons
   - AFTER: Emmons
   - Template: animalHan "長鼻浣熊" to "南美浣熊", animalHanPy "chángbí huànxióng" to "nánměi huànxióng" (v2). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.
   - Proverb note: the eyebrow and section aria-label are template-wide strings (template/, not the animal JSON), so items 19 and 20 live in the HTML only. A rebuild from the v2 template would bring back "The proverb of your year" as the eyebrow; the note (item 18) now says plainly that the sentence is a modern saying.

## cuttlefish

1. **Source:** c9 (header: 墨 mò is ink; the animal is 烏賊 wūzéi) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">墨</span>
   - AFTER: <span class="rail__han" aria-hidden="true">烏賊</span>
2. **Source:** c9 (header) [HTML] (HTML x2)
   - BEFORE: data-say="墨" aria-label="Hear 墨, mò"
   - AFTER: data-say="烏賊" aria-label="Hear 烏賊, wūzéi"
3. **Source:** c9 (header) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">mò</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">wūzéi</span>
4. **Source:** c9 (header) [HTML]
   - BEFORE: <span class="serial-han">墨</span>
   - AFTER: <span class="serial-han">烏賊</span>
5. **Source:** c9 (header) [HTML]
   - BEFORE: <span class="h" lang="zh">墨</span><span class="py" lang="zh-Latn-pinyin">mò</span>
   - AFTER: <span class="h" lang="zh">烏賊</span><span class="py" lang="zh-Latn-pinyin">wūzéi</span>
6. **Source:** c12 (unsourced outcome cut; real limits added) [HTML + v1]
   - BEFORE: , letting him court without provoking a fight he would likely lose.
   - AFTER: , letting him court without provoking the rival. It was seen only when a single rival male was present, in about 39% of those encounters.
7. **Source:** c13, c14 (WRONG: Adamo 2006 does not show prey freezing; closest real finding is Santon et al. 2025 in the broadclub cuttlefish) [HTML + v1]
   - BEFORE: Before striking, cuttlefish can produce a <b>'Passing Cloud' display, a wave of dark bands rippling across the body</b>, shown to coincide with prey freezing in place just before the strike.
   - AFTER: While hunting, cuttlefish can produce a <b>'Passing Cloud' display, a wave of dark bands rippling across the body</b>. In the broadclub cuttlefish, a downward-moving stripe display made crabs less likely to react to the approaching hunter.
8. **Source:** c8, c15, c16 (novelty claim corrected to what the researchers said) [HTML + v1]
   - BEFORE: a form of self-control not previously documented outside vertebrates.
   - AFTER: and the researchers called it the first link between self-control and learning ability found in a non-primate.
9. **Source:** c13 (WRONG citation: no paper with that title) [HTML + v1]
   - BEFORE: NCBI PubMed · Passing Cloud displays during hunting in Sepia officinalis (Adamo et al., 2006)
   - AFTER: NCBI PubMed · Signaling to the enemy? Body pattern expression and its response to external cues during hunting in the cuttlefish Sepia officinalis (Adamo et al., 2006)
10. **Source:** c10 (proverb glyph: page is zh-Hant; traditional of 惊 jīng is 驚 jīng) [HTML + v1] (HTML x5, v1 x3)
   - BEFORE: 惊
   - AFTER: 驚
11. **Source:** c14 (source list: added the paper item 7 now cites) [HTML + v1]
   - BEFORE: (no entry)
   - AFTER: Science Advances · Stealth and deception: adaptive motion camouflage in hunting broadclub cuttlefish (Santon et al., 2025), linked to https://www.science.org/doi/10.1126/sciadv.adr3686 (inserted after the Adamo entry; same label/href keys in v1)
   - Template: animalHan "墨" to "烏賊", animalHanPy "mò" to "wūzéi" (v1). Occurrences replaced in HTML: rail__han 1, button data-say/aria-label 2 (rail + keepsake), rail__py 1, serial-han 1, keepsake .h/.py 1.
   - Count note: item 10 replaced 惊 with 驚 5 times in HTML (ruby, whole-verse data-say, tile data-say, tile aria-label, tile glyph) and 3 times in v1.

## tools/han-pinyin.json

Fresh read-modify-write at the end of the pass, touching only these keys (format kept: indent 0, ensure_ascii off, no trailing newline):
- cassowary: 鴕 tuó to 鶴鴕 hètuó
- chambered-nautilus: 螺 luó to 鸚鵡螺 yīngwǔluó
- coati: 長鼻浣熊 chángbí huànxióng to 南美浣熊 nánměi huànxióng
- cuttlefish: 墨 mò to 烏賊 wūzéi
- caracara: unchanged (卡拉卡拉鷹 kǎlākǎlā yīng)

## Not changed, and why

- caracara header kept (verdict OK, imprecise). Darwin's Carrancha and the Rioplatense carancho sayings not added; only the call trait draws on Darwin.
- caracara "follows army ants to catch fleeing insects" (axis read): not in the audit, no source opened this pass. Kept; worth a check.
- caracara "flush of engagement" (shadow copy) and the loose-coalition lines in readings (feng shui, friends tab, keepsake gift): reading voice, kept. Only the fact, its title and the axis read were changed.
- caracara page and v2 still carry many existing em dashes and some "not X, it is Y" lines in reading copy; none added. The rewritten facts (items 2, 4, 5, 7, 11, 13, 17) no longer carry dashes.
- cassowary hero crossing glyph 鸡 (simplified, no pinyin): the same glyph is used in the shared nav chips across the site. Left for a site-wide pass.
- cassowary casque "hollow" (verdict OK; dossier suggests "keratin-sheathed, spongy inside"), "defends an individual home range" (OK, slight simplification), 32 Hz call (OK, single recording): kept.
- cassowary Keeper Stones have no traditional basis (other_notes); the page already frames them as our own pairing elsewhere. Not touched.
- cassowary "Cast your Purple Star chart and see how close it lands" button label kept (template-wide pattern).
- chambered-nautilus trait title "The night rise" kept: the animal does move up the reef wall at night; the fact under it now gives the tracked depths.
- chambered-nautilus reading copy keeps "rise in the dark" imagery (moon ritual, love tab, matches): reading voice.
- chambered-nautilus other_notes not acted on: New Moon power phase vs waning gibbous lucky window contradiction, the "about three weeks" cold-reading line, and a missing conservation line (IUCN Vulnerable, CITES Appendix II 2016, US ESA threatened 2018). Owner call.
- chambered-nautilus header crossing glyph 蛇 without pinyin (style flag): shared hero pattern, not touched.
- coati "rotating" nose lines in reading copy (Stillness axis, shadow, awakened text): no degree figure, reading voice. Kept.
- coati "every crevice" in meta description, og, JSON-LD, shareLine and keepsake line: reading voice, kept.
- coati em dashes across fact and reading copy (style flag): only the ones inside rewritten facts were removed. Gompper and Decker 1998 reference not opened.
- cuttlefish proverb 打草驚蛇 dǎ cǎo jīng shé: real idiom, honestly labeled; only the 惊 glyph moved to its traditional form.

## Structure check

All five pages parse with python html.parser. Every JSON-LD and application/json block parses (4 per page). Section counts and the full HTML tag sequence match the backups on caracara, cassowary, chambered-nautilus and coati; cuttlefish has two more tags (the added source li and its a), nothing else. All edited template JSON loads and nested keysets are unchanged (files written with the same indent=2, ensure_ascii=False format and the same trailing-newline state they had; cuttlefish v1 sources list gained one entry with the existing keys). No leftover old header glyph on any page (鴕 only inside 鶴鴕, 螺 only inside 鸚鵡螺, 長鼻浣熊 and standalone 墨 gone). No escaped &lt;b&gt; text. No new em dash, en dash or arrow in any new text; no banned words; every new hanzi carries pinyin. No CSS or JS touched. Git not run.

## Final header characters

- caracara: 卡拉卡拉鷹 kǎlākǎlā yīng (unchanged)
- cassowary: 鶴鴕 hètuó (was 鴕 tuó, ostrich)
- chambered-nautilus: 鸚鵡螺 yīngwǔluó (was 螺 luó, any spiral shell)
- coati: 南美浣熊 nánměi huànxióng (was 長鼻浣熊 chángbí huànxióng, the mountain coati)
- cuttlefish: 烏賊 wūzéi (was 墨 mò, ink)
