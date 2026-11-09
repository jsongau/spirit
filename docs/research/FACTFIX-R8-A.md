# FACTFIX-R8-A change log

Date: 2026-11-08. Pages: mandarin-dragonet, kakapo, hoatzin, hercules-beetle, golden-snub-nosed-monkey.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). "x2" means the string occurred twice in that file. Template coverage: mandarin-dragonet: v2 only; kakapo: v2 only; hoatzin: v2 only; hercules-beetle: v1 only; golden-snub-nosed-monkey: v1 and v2 (v2 is an unfilled TODO scaffold; none of the strings occur in it, left untouched).
Backups of the original pages: `~/factfix-backup-r8a/<slug>.html`; original template JSON in `~/factfix-backup-r8a/tpl/v1/` and `~/factfix-backup-r8a/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site (R2 to R4 precedent). Header changes cover rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy. Single-character headers (甲, 猴) were replaced by exact markup match, never by a bare-character replace, so the nav glyphs (猴 Monkey chip) were untouched.
Purple Star: none of the five pages assigns a star from the sign pair or claims a traditional pairing (all five audits OK); nothing to reword.

## mandarin-dragonet

1. **Source:** m8, m18 (header glyph is not the species name) [HTML x7 + v2]
   - BEFORE: 鴛鴦鰧
   - AFTER: 花斑連鰭䲗
2. **Source:** m8, m18 (header pinyin) [HTML x4 + v2]
   - BEFORE: yuānyāngténg
   - AFTER: huābān liánqí xián
3. **Source:** m7, m10, m9 (orange claim cut; name the second species) [HTML + v2]
   - BEFORE: There is no red pigment in its skin. The color comes from cyanophores — cells that produce pigment through a mechanism found in almost no other vertebrate. It made its own blue. The orange is structural. Nothing here came from a standard toolkit.
   - AFTER: Its blue comes from cyanophores, pigment cells known in only one other vertebrate, its close cousin the psychedelic mandarin. It made its own blue. Nothing here came from a standard toolkit.
4. **Source:** m7 (superlative unsourced) [HTML + v2]
   - BEFORE: The most vivid display on the reef, protected by a scent that keeps the world at a distance.
   - AFTER: A blaze of color on the reef, protected by a scent that keeps the world at a distance.
5. **Source:** m7, m11, m12 (range; superlative unsourced) [HTML + v2]
   - BEFORE: A reef fish of the tropical Indo-Pacific, small enough to fit in a closed hand, wearing the most vivid coloration of any vertebrate alive — color it made itself, through a mechanism almost no other vertebrate possesses.
   - AFTER: A reef fish of the western Pacific's sheltered lagoons, small enough to fit in a closed hand, wearing a blue it made itself, from a pigment cell only one other vertebrate is known to have.
6. **Source:** m7, m10, m11, m13 (orange claim cut; mucus reported; rise about a meter) [HTML + v2]
   - BEFORE: a fish with no red pigment whose orange comes from structural interference, whose blue comes from cyanophore cells found in almost no other vertebrate, whose protection is a toxic mucus rather than scales, and whose courtship is a synchronized vertical rise in open water at the moment the light shifts.
   - AFTER: a fish whose blue comes from cyanophore cells known in only one other vertebrate, whose protection is a reportedly toxic mucus rather than scales, and whose courtship is a short paired rise of about a meter at sunset.
7. **Source:** m7, m10, m9 (cyanophores are pigment cells; name the second species) [HTML + v2]
   - BEFORE: The mandarin dragonet's blue comes not from pigment but from <b>cyanophores — specialized cells that produce color through a mechanism found in almost no other vertebrate</b>. Most animals borrow blue through structural coloration; this fish makes it biologically.
   - AFTER: The mandarin dragonet's blue comes from <b>cyanophores, pigment cells known in only one other vertebrate, its close relative the psychedelic mandarin</b>. Nearly every other animal blue is structural, made by light scattering off tiny crystals; this fish makes its blue as a pigment.
8. **Source:** m7, m9, m12 (orange claim, stone) [v2]
   - BEFORE: The structural orange — the unexpected secondary color that completes the signal.
   - AFTER: The sunset orange, the unexpected secondary color that completes the signal.
9. **Source:** m7, m9, m12 (unverifiable trait replaced with the sourced name fact, m7, m8) [HTML]
   - BEFORE: The structural orange</h3>
   - AFTER: The official's robe</h3>
10. **Source:** m7, m8 (trait title, template) [v2]
   - BEFORE: The structural orange
   - AFTER: The official's robe
11. **Source:** m7, m9, m12 (unverifiable; replaced with m7, m8 name fact) [HTML + v2]
   - BEFORE: <b>No red or orange pigment exists in the fish's skin</b>. The orange coloration is structural — it is produced by the interference of light through microstructures in the skin, not by any chemical pigment at all.
   - AFTER: The name mandarinfish comes from its colors, said to recall the robes of an imperial Chinese official, and one Chinese name says it outright: <b>官服魚 guānfú yú, the official-robe fish</b>.
12. **Source:** m7, m12, m13 (soften to reported) [HTML + v2]
   - BEFORE: Instead of scales, it is covered in a thick, foul-smelling mucus that contains toxins and deters parasites and predators.
   - AFTER: Instead of scales, it wears a thick mucus coat, reported to smell foul and taste bitter, and its skin has cells that secrete toxins thought to keep predators away.
13. **Source:** m7, m11 (feeds by day; dusk is spawning time) [HTML]
   - BEFORE: The crepuscular hour</h3>
   - AFTER: The sunset hour</h3>
14. **Source:** m7, m11 (trait title, template) [v2]
   - BEFORE: The crepuscular hour
   - AFTER: The sunset hour
15. **Source:** m7, m11 [HTML + v2]
   - BEFORE: The mandarin dragonet is most active at <b>dusk, timed precisely to the quality of light that shows its colors best</b>. It moves through the coral's upper reaches in the last thirty minutes of light.
   - AFTER: The mandarin dragonet feeds all day, pecking tiny prey off the coral. Its fixed hour is sunset: in a field study in Palau, <b>all 198 timed spawns fell between 16 minutes before and 18 minutes after sunset</b>.
16. **Source:** m11, m12, m14 (say about a meter) [HTML + v2]
   - BEFORE: At dusk, <b>a male and female rise together in a vertical water column</b>, releasing gametes simultaneously before descending. The courtship is precisely synchronized and takes place in open water above the reef.
   - AFTER: At sunset, <b>a male and female rise together about a meter</b>, slowly, over 7 to 12 seconds, release eggs and sperm at the same moment, and drop back. Pairs spawn at the same sites night after night.
17. **Source:** m7, m11, m12, m9 (habitat) [HTML]
   - BEFORE: The coral dependency</h3>
   - AFTER: The sheltered reef</h3>
18. **Source:** m7, m12 (trait title, template) [v2]
   - BEFORE: The coral dependency
   - AFTER: The sheltered reef
19. **Source:** m7, m11, m12, m9 [HTML + v2]
   - BEFORE: The mandarin dragonet lives <b>only in tropical Indo-Pacific coral reefs</b>. It cannot survive outside this specific habitat and will not thrive in degraded reef environments.
   - AFTER: The mandarin dragonet lives in <b>sheltered lagoons and inshore reefs of the western Pacific</b>, under leafy and dead coral, down to about 18 meters. It can live in home aquariums but is hard to feed there and lives only 2 to 4 years.
20. **Source:** m7, m11 (axis read: feeds by day) [HTML + v2]
   - BEFORE: moves constantly through the coral at dusk, hovering, shifting, never settling for long.
   - AFTER: moves constantly through the coral all day, picking, shifting, never settling for long.
21. **Source:** m7, m9, m12 (orange claim cut, reading) [HTML + v2]
   - BEFORE: The blue is not borrowed. The orange is structural. Everything here is yours.
   - AFTER: The blue is not borrowed. Everything here is yours.
22. **Source:** m7 (superlative, reading) [HTML + v2]
   - BEFORE: <b>the most vivid color in the reef and no one can hold you</b>
   - AFTER: <b>a color the whole reef can see, and no one can hold you</b>
23. **Source:** m7, m10 (cyanophores are pigment cells) [HTML + v2]
   - BEFORE: The mandarin dragonet's blue does not come from standard pigment at all — it comes from cyanophores, a mechanism almost no other vertebrate has.
   - AFTER: The mandarin dragonet's blue does not come from scattered light, the way most animal blues do. It comes from cyanophores, a pigment cell known in only one other vertebrate.
24. **Source:** m7, m9, m12 (orange claim, palette) [HTML]
   - BEFORE: Spark, Structural orange,
   - AFTER: Spark, Sunset orange,
25. **Source:** m7, m9, m12 (orange claim, palette) [HTML]
   - BEFORE: <h4 class="pp__name">Structural orange</h4>
   - AFTER: <h4 class="pp__name">Sunset orange</h4>
26. **Source:** m7, m9, m12 (orange claim, palette) [HTML + v2]
   - BEFORE: One note of the fish's structural orange — the color that cost no pigment and is entirely its own.
   - AFTER: One note of the fish's sunset orange, the warm color that sets off its blue.
27. **Source:** m7, m9, m12 (orange claim, ritual) [HTML + v2]
   - BEFORE: in the structural orange tone somewhere in your workspace — the color that costs no pigment and is entirely its own.
   - AFTER: in the sunset orange tone somewhere in your workspace, the warm note that sets off the blue.
28. **Source:** m7, m11 (feeds by day; sunset is spawning) [HTML + v2]
   - BEFORE: A space for the crepuscular hour —
   - AFTER: A space for the sunset hour:
29. **Source:** m7, m9, m12 (orange claim, palette name, template) [v2]
   - BEFORE: Structural orange
   - AFTER: Sunset orange

## kakapo

1. **Source:** k14 (60 million unsourced; same hillside invented; meta, og, JSON-LD) [HTML x4 + v2]
   - BEFORE: Kakapo: Aquarius × Goat — the flightless parrot who has called from the same hillside for 60 million years.
   - AFTER: Kakapo: Aquarius × Goat, the flightless parrot whose line goes back tens of millions of years.
2. **Source:** k10, k6, k11, k14, k7 (axis read: 90-year lifespan not documented; 60 million unsourced) [HTML + v2]
   - BEFORE: Individual birds have been documented returning to the same site across their 90-year lifespans. In 60 million years of lineage, the fundamental strategy has not changed.
   - AFTER: Males keep up their bowls between seasons, and a kakapo is thought to live 60 years or more. Across a lineage tens of millions of years old, the basic strategy has held.
3. **Source:** k6, k14 (soften longest-lived) [HTML + v2]
   - BEFORE: The longest-lived.
   - AFTER: Possibly the longest-lived bird.
4. **Source:** k14 (60 million unsourced) [HTML + v2]
   - BEFORE: And it has done this for 60 million years.
   - AFTER: And its line has done this for tens of millions of years.
5. **Source:** k14 (60 million unsourced; same hillside invented) [HTML + v2]
   - BEFORE: The flightless parrot who has called from the same hillside for 60 million years and is still waiting for the response.
   - AFTER: The flightless parrot whose line has called into the dark for tens of millions of years and is still waiting for the response.
6. **Source:** k6, k14, k9, k15 (population out of date; mainland sanctuary) [HTML + v2]
   - BEFORE: critically endangered with a wild population of approximately 250 individuals living exclusively on predator-free island sanctuaries, where it has been intensively managed since the 1980s.
   - AFTER: critically endangered, with 325 birds alive according to New Zealand's Department of Conservation. They live on predator-free offshore islands and, since 2023, in a fenced mainland sanctuary at Maungatautari, all closely managed.
7. **Source:** k10, k6, k11, k14 (lifespan) [HTML + v2]
   - BEFORE: the lifespan of up to 90 years;
   - AFTER: a lifespan thought to run 60 years or more;
8. **Source:** k7, k11, k14 (bowls are earth, not rock; 5 km only in the right conditions) [HTML + v2]
   - BEFORE: Male kakapo excavate specific bowls in the soil or rock at the top of ridgelines, shaped to <b>amplify and project the boom call for distances up to five kilometers</b>.
   - AFTER: Male kakapo dig bowls in the soil on ridgelines, often against a rock face or bank, shaped to <b>amplify the boom call so it can carry up to five kilometers in the right conditions</b>.
9. **Source:** k6, k7, k11 (every-male line unsourced; only lekking parrot) [HTML + v2]
   - BEFORE: The system only functions if every male shows up and calls.
   - AFTER: It is the only parrot known to breed this way.
10. **Source:** k10, k7, k14, k13 (pre-human predators named; mammals hunt by scent) [HTML + v2]
   - BEFORE: This was an effective strategy against the raptors (hawks) that were their primary predators for millions of years. After the introduction of rats, stoats, and cats by Polynesian and European settlers, the freeze became lethal — mammalian predators locate prey by smell and movement-cessation, not visual search.
   - AFTER: This worked against the birds that hunted them by sight: the New Zealand falcon, Haast's eagle and Eyles' harrier by day, and the laughing owl by night. Mammals hunt by scent, and stillness does nothing against a nose. The dogs (kurī) that Polynesian settlers brought already tracked kakapo this way, and the stoats, cats and rats that came later made the freeze lethal.
11. **Source:** k10, k6, k11, k14 (lifespan not documented) [HTML + v2]
   - BEFORE: Kakapo are among the world's longest-lived birds, with <b>documented lifespans of 90 years or more</b>.
   - AFTER: Kakapo may be among the world's longest-lived birds, <b>thought to live 60 years or more</b>, possibly as long as 90.
12. **Source:** k8, k6 (dates; population 325) [HTML + v2]
   - BEFORE: The entire wild kakapo population was <b>translocated to predator-free offshore islands</b> between 1980 and 1997 — without that intervention, the species would have been functionally extinct. Approximately 250 birds now exist because someone else changed the conditions. The kakapo did not adapt to the mainland; the mainland was removed.
   - AFTER: Every known wild kakapo was <b>moved to predator-free offshore islands</b>. Transfers began in 1974 and 1975, 62 birds were moved after 1980, and the last known bird on Rakiura (Stewart Island) went to Whenua Hou in 1997. Without that work the species would likely be gone. The Department of Conservation now counts 325 birds because someone else changed the conditions. The kakapo did not adapt to the mainland. It was moved, and only in 2023 did a few birds return to a fenced sanctuary there.
13. **Source:** k7, k11, k14 (5 km only in the right conditions) [HTML + v2]
   - BEFORE: the kakapo's boom carries five kilometers in every direction.
   - AFTER: the kakapo's boom can carry up to five kilometers in the right conditions.
14. **Source:** k9, k11, k14 (known low 51 in 1995; never-inhabited claim cut) [HTML + v2]
   - BEFORE: the reduction of its wild population to fewer than 50 individuals, and the relocation of its entire species to islands it had never inhabited.
   - AFTER: a low of 51 known birds in 1995, and the move of every known bird to offshore islands.
15. **Source:** k14, k7 (60 million unsourced; males keep bowls between seasons) [HTML + v2]
   - BEFORE: Calls from the same bowl for 60 million years.
   - AFTER: Calls from the same bowl, season after season.
16. **Source:** k14, k7 (identity and share line) [HTML x2 + v2]
   - BEFORE: I have called from the same bowl for 60 million years, and I am not done yet.
   - AFTER: I call from the same bowl season after season, and I am not done yet.
17. **Source:** k14 (60 million unsourced, reading) [HTML + v2]
   - BEFORE: Staying still worked for 60 million years and then didn't.
   - AFTER: Staying still worked for millions of years and then didn't.
18. **Source:** k14 (60 million unsourced, reading) [HTML + v2]
   - BEFORE: the camouflage that worked for 60 million years
   - AFTER: the camouflage that worked for millions of years
19. **Source:** k14 (60 million unsourced, lesson) [HTML + v2]
   - BEFORE: The 60-million-year lineage is real.
   - AFTER: The ancient lineage is real.

## hoatzin

1. **Source:** h6, h14 (range: Amazon and Orinoco; calling distance unsourced) [HTML + v2]
   - BEFORE: The hoatzin lives only on the banks of slow Amazonian rivers, clinging to overhanging branches above the water with a colony of the same species within calling distance.
   - AFTER: The hoatzin lives in the swamps, river forests and mangroves of the Amazon and Orinoco basins, clinging to branches over the water and nesting in small colonies.
2. **Source:** h9, h6, h7 (inedible to predators is wrong) [HTML + v2]
   - BEFORE: and the fermentation produces an odor that makes the bird essentially inedible to predators.
   - AFTER: and the bird carries a strong smell, like fresh cow manure, that earned it the name stinkbird.
3. **Source:** h7, h9, h10, h6 (lost by adulthood; wing claws not unique) [HTML + v2]
   - BEFORE: The claws are reabsorbed during development and absent in adults.
   - AFTER: The claws are lost by adulthood. Other birds, chickens among them, have wing claws too; what sets the hoatzin chick apart is climbing with them.
4. **Source:** h9, h6, h8, h7 (VFA cause unverifiable; predators wrong; hunting conflicting, cut) [HTML + v2]
   - BEFORE: The fermentation process produces volatile fatty acids that give the hoatzin a <b>strong manure-like odor</b>, earning it the local name "stinkbird." Most predators avoid it; it is rarely hunted.
   - AFTER: The hoatzin has a <b>strong smell, like fresh cow manure</b>, which earned it the name "stinkbird." The odor is credited to aromatic compounds in its leaves and the fermentation in its crop. It still has predators: hawks, monkeys and snakes all go after hoatzins.
5. **Source:** h7, h6 (reading under the corrected fact) [HTML + v2]
   - BEFORE: The smell that keeps you off the menu is not a flaw in your design.
   - AFTER: The smell that keeps the curious at a distance is part of your design.
6. **Source:** h6, h14 (contested date; placement unresolved) [HTML + v2]
   - BEFORE: Hoatzins represent a lineage that diverged from all other modern birds approximately <b>64 million years ago</b>. They have no close living relatives — they are a genuinely isolated branch of the bird family tree.
   - AFTER: Hoatzins are an ancient lineage with no close living relatives. One 2015 genetic study puts their split from other birds at about <b>64 million years ago</b>, and a 2024 study suggests nearer 70 million; where they sit on the bird family tree is still unresolved.
7. **Source:** h6, h9 (diet about four fifths leaves) [HTML + v2]
   - BEFORE: Leaves make up nearly 100% of the hoatzin's diet,
   - AFTER: Leaves make up about four fifths of the hoatzin's diet (82 percent in one Venezuelan study, with flowers and fruit making up the rest),
8. **Source:** h6, h9 (follows the diet fix) [HTML + v2]
   - BEFORE: The fermentation system is what makes this impossible diet workable.
   - AFTER: The fermentation system is what makes this hard diet workable.
9. **Source:** h17 (Air to Metal is our framework; label it) [HTML + v2]
   - BEFORE: Air is not one of the five phases — it is a Western addition that sits nearest to Metal in quality:
   - AFTER: Air is not one of the five phases. In our reading it sits nearest to Metal in quality:
10. **Source:** h7, h9 (lost, not reabsorbed; reading) [HTML + v2]
   - BEFORE: When the claws are reabsorbed and the adult emerges
   - AFTER: When the claws are lost and the adult emerges
11. **Source:** h7, h9 (lost, not reabsorbed; reading) [HTML + v2]
   - BEFORE: The claw gets reabsorbed before the chick can swim.
   - AFTER: The claw is lost before the chick can swim.
12. **Source:** h7, h6 (predators wrong; mirror take) [HTML + v2]
   - BEFORE: The smell that keeps you off the menu is not a flaw — it is the fermentation doing its job.
   - AFTER: The smell that keeps the curious away is part of the design, the fermentation doing its job.
13. **Source:** h7, h6, h10 (predators wrong; chicks drop into water and climb back) [HTML + v2]
   - BEFORE: The hoatzin does not hide from predators. It does not camouflage or flee. It becomes something that predators learn not to bother with. The fermentation gut that allows it to eat leaves no one else can process also makes it essentially inedible. The adaptation that gives it access to an unusual niche also protects it from being consumed.
   - AFTER: The hoatzin does not try to blend in. It smells like a cow barn and makes no secret of it. Hawks, monkeys and snakes still come for it, so the chicks drop into the water below the nest and climb back with their wing claws once the danger passes. The odd design that gives it an unusual niche also gives it a way out.
14. **Source:** h7, h6 (predators wrong; proverb soul) [HTML + v2]
   - BEFORE: the stinking bird that predators have learned to leave alone.
   - AFTER: the stinking bird whose chicks can climb back out of the river.
15. **Source:** h16 (say what the saying is) [HTML]
   - BEFORE: A proverb we tie to the <a href="/chinese-zodiac/rooster/">Year of the Rooster</a>. The pairing is our own reading, not tradition.
   - AFTER: A modern saying from the Chinese reception of Darwin, after Yan Fu's 天演論 Tiānyǎn lùn (1896 to 1898) named natural selection 天擇 tiān zé. We tie it to the <a href="/chinese-zodiac/rooster/">Year of the Rooster</a>; the pairing is our own reading, not tradition.
16. **Source:** h16 (say what the saying is, template form) [v2]
   - BEFORE: A proverb we tie to the Year of the Rooster. The pairing is our own reading, not tradition.
   - AFTER: A modern saying from the Chinese reception of Darwin, after Yan Fu's 天演論 Tiānyǎn lùn (1896 to 1898) named natural selection 天擇 tiān zé. We tie it to the Year of the Rooster; the pairing is our own reading, not tradition.

## hercules-beetle

1. **Source:** b14, b12, b13 (header glyph: rail__han) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">甲</span>
   - AFTER: <span class="rail__han" aria-hidden="true">長戟大兜蟲</span>
2. **Source:** b14, b12, b13 (header glyph: rail + keepsake buttons) [HTML x2]
   - BEFORE: data-say="甲" aria-label="Hear 甲, jiǎ"
   - AFTER: data-say="長戟大兜蟲" aria-label="Hear 長戟大兜蟲, chángjǐ dàdōuchóng"
3. **Source:** b14, b12, b13 (header pinyin: rail__py) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">jiǎ</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">chángjǐ dàdōuchóng</span>
4. **Source:** b14, b12, b13 (header glyph: serial-han) [HTML]
   - BEFORE: <span class="serial-han">甲</span>
   - AFTER: <span class="serial-han">長戟大兜蟲</span>
5. **Source:** b14, b12, b13 (header glyph: keepsake-han) [HTML]
   - BEFORE: <span class="h" lang="zh">甲</span><span class="py" lang="zh-Latn-pinyin">jiǎ</span>
   - AFTER: <span class="h" lang="zh">長戟大兜蟲</span><span class="py" lang="zh-Latn-pinyin">chángjǐ dàdōuchóng</span>
6. **Source:** b6, b8, b7 (never-wound unsourced; meta, og, JSON-LD) [HTML x4 + v1]
   - BEFORE: built strong in the dark, used to lift, never wound.
   - AFTER: built strong in the dark, made to grip, lift and throw.
7. **Source:** b11, b6 (strongest unsourced; longest is sourced) [HTML + v1]
   - BEFORE: The strongest beetle alive settles every fight by lifting, never by wounding.
   - AFTER: The longest beetle alive settles its fights by grabbing, lifting and throwing.
8. **Source:** b6, b8, b7 (rather-than-kill is inference) [HTML + v1]
   - BEFORE: whose signature weapon exists to move a rival off a branch, not to wound one.
   - AFTER: whose signature weapon is used to grab a rival, lift him and throw him off a branch.
9. **Source:** b7, b6, b8, b10 (larval range; nutrition study is on another species) [HTML + v1]
   - BEFORE: a larval stage that lasts <b>12 to 18 months inside decaying wood</b>; in horned beetles generally, how well-fed that larva was directly shapes the horn it grows into as an adult.
   - AFTER: a larval stage that lasts <b>one to two years or more inside decaying wood</b>; in another horned beetle, the dung beetle Euoniticellus intermedius, how well fed the larva was shapes the horn it grows as an adult.
10. **Source:** b6, b8, b7 (drop rather-than-kill) [HTML + v1]
   - BEFORE: which males use to clasp a rival and lift him off the branch or log they're competing over, rather than to pierce or kill him.
   - AFTER: which males use to grab a rival, pin him, lift him off the branch or log they're competing over and throw him.
11. **Source:** b7 (body weight clause unsourced, cut) [HTML + v1]
   - BEFORE: </b>, from an insect that itself weighs a few dozen grams at most.
   - AFTER: </b>.
12. **Source:** b7 (no events at all; explanation unsourced) [HTML + v1]
   - BEFORE: No predation event on an adult Hercules beetle has ever been documented; researchers attribute this to the combination of <b>its armor, its horns, and its sheer mass</b>.
   - AFTER: No predation event on a Hercules beetle has been <b>observed and documented</b>, though birds, bats and rats may take the larvae.
13. **Source:** b7, b6 (contested durations as a range) [HTML + v1]
   - BEFORE: After 12 to 18 months as a larva and a pupal stage of 2 to 3 months, the adult beetle lives only <b>8 to 12 months</b> before its life is over.
   - AFTER: After a year or more as a larva and a pupal stage of about one to three months, the adult beetle lives only <b>a few months to a year</b>, going by captive records.
14. **Source:** b6, b8, b7 (stat card) [HTML + v1]
   - BEFORE: Lift and remove, never wound
   - AFTER: Grip, lift and throw
15. **Source:** b1, b3 (January Capricorns belong to the previous year) [HTML]
   - BEFORE: Recent Goat years: 1991, 2003, 2015.</p>
   - AFTER: Recent Goat years: 1991, 2003, 2015; for a Capricorn that means late December of those years or January of the next.</p>
16. **Source:** b1, b3 (Lunar New Year note) [HTML]
   - BEFORE: <h3>Born in January or early February?</h3>
   - AFTER: <h3>Born in January?</h3>
17. **Source:** b1, b3 (Lunar New Year note) [HTML]
   - BEFORE: The Chinese year turns at the lunar New Year, between late January and mid February, so a birthday in those weeks can belong to the Horse.
   - AFTER: Capricorn ends around January 20, and the lunar New Year never comes before about January 21, so every January Capricorn belongs to the year before. A Capricorn born in January 2015 is a Horse; a Goat-year Capricorn is born in December 2015 or January 2016.
18. **Source:** b15 (Fayan: it sees a 豺 chái and trembles) [HTML + v1]
   - BEFORE: a goat wearing a tiger's skin still bolts at the sound of a wolf,
   - AFTER: a goat wearing a tiger's skin still sees a 豺 chái, a wild dog, and trembles,
19. **Source:** b15 (source named) [HTML]
   - BEFORE: A proverb we tie to the <a href="/chinese-zodiac/goat/">Year of the Goat</a>.
   - AFTER: A saying from Yang Xiong's 法言 Fǎyán that we tie to the <a href="/chinese-zodiac/goat/">Year of the Goat</a>.
20. **Source:** b15 (source named, template form) [v1]
   - BEFORE: A proverb we tie to the Year of the Goat.
   - AFTER: A saying from Yang Xiong's 法言 Fǎyán that we tie to the Year of the Goat.
21. **Source:** b14, b12, b13 (template header) [v1]
   - BEFORE: animalHan "甲", animalHanPy "jiǎ"
   - AFTER: animalHan "長戟大兜蟲", animalHanPy "chángjǐ dàdōuchóng"

## golden-snub-nosed-monkey

1. **Source:** s7, s8 (header glyph generic; species name: rail__han) [HTML]
   - BEFORE: <span class="rail__han" aria-hidden="true">猴</span>
   - AFTER: <span class="rail__han" aria-hidden="true">金絲猴</span>
2. **Source:** s7, s8 (rail + keepsake buttons) [HTML x2]
   - BEFORE: data-say="猴" aria-label="Hear 猴, hóu"
   - AFTER: data-say="金絲猴" aria-label="Hear 金絲猴, jīnsīhóu"
3. **Source:** s7, s8 (rail__py) [HTML]
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">hóu</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">jīnsīhóu</span>
4. **Source:** s7, s8 (serial-han) [HTML]
   - BEFORE: <span class="serial-han">猴</span>
   - AFTER: <span class="serial-han">金絲猴</span>
5. **Source:** s7, s8 (keepsake-han) [HTML]
   - BEFORE: <span class="h" lang="zh">猴</span><span class="py" lang="zh-Latn-pinyin">hóu</span>
   - AFTER: <span class="h" lang="zh">金絲猴</span><span class="py" lang="zh-Latn-pinyin">jīnsīhóu</span>
6. **Source:** s10, s13 (superlative: mandrill hordes are larger) [HTML + v1]
   - BEFORE: living in one of the largest social groups any primate keeps outside our own species.
   - AFTER: living in one of the largest groups any primate forms.
7. **Source:** s10, s8 (soften coat: golden belly, neck, forehead; golden guard hairs on males) [HTML + v1]
   - BEFORE: The golden-orange coat, thickest through the shoulders and back, covers a primate
   - AFTER: The coat, gold on the belly, neck and forehead, with long golden guard hairs over the shoulders and back of adult males, covers a primate
8. **Source:** s10, s13 (superlative wrong) [HTML + v1]
   - BEFORE: 600 individuals, an extraordinary size for any primate except humans</b>
   - AFTER: 600 individuals, one of the largest groups any primate forms</b>
9. **Source:** s11 (Wei et al. 2012: 29.7% of all bouts; male reciprocation falls with unit size) [HTML + v1]
   - BEFORE: only about <b>three in ten grooming exchanges between males and females were reciprocated</b> in kind; the rest were traded for other things entirely, more grooming offered as a one-male unit grew larger, more access earned by whoever groomed the most.
   - AFTER: only about <b>30 percent of grooming bouts were returned in kind</b>. Females groomed the male more than he groomed them, and the more females a male had, the less he groomed back; a female who groomed him more mated with him more often and met less aggression over food.
10. **Source:** s11 (trait title follows the corrected fact) [HTML + v1]
   - BEFORE: Grooming, kept in balance
   - AFTER: Grooming as currency
11. **Source:** s10, s8 (conifer needles not in either source) [HTML + v1]
   - BEFORE: broadleaf leaves, conifer needles, buds, and fruit
   - AFTER: broadleaf leaves, buds, and fruit
12. **Source:** s7, s8 (template header) [v1]
   - BEFORE: animalHan "猴", animalHanPy "hóu"
   - AFTER: animalHan "金絲猴", animalHanPy "jīnsīhóu"

## Not applied

- mandarin-dragonet: trait 2 ("The structural orange") was UNVERIFIABLE with "cut it". Cutting the band would break the six-band layout, so its fact and title now carry the sourced 官服魚 guānfú yú name (m7, m8); its reading was kept. The palette swatch keeps its colour value and is renamed "Sunset orange".
- mandarin-dragonet: reading lines that call the fish "crepuscular" (growth practice, love misunderstand row) and the share line "I arrive at dusk" were kept: dusk is when it spawns, so they still read true.
- mandarin-dragonet meta description "a color that does not exist in standard nature": poetic, not a fact item. Unchanged.
- kakapo: the page has no Māori material, so nothing to attribute. The dossier's Ngāi Tahu, Tūhoe and kahu kākāpō items are additions, not corrections, and were not added. The "Hold, do not use yet" saying and legend are absent from the page.
- kakapo hawk-versus-stoat readings (moon, shadow, lesson, ritual) kept as metaphor; the fact now names the real predators (NZ falcon, Haast's eagle, Eyles' harrier, laughing owl).
- kakapo trait titles "The freeze" and "The lifespan" unchanged; the facts under them were corrected.
- hoatzin header 麝雉 shèzhì: pinyin already showed in rail__py and the keepsake .py (and the template). Unchanged.
- hoatzin mirror heading "The guard: becoming indigestible" and the "Becoming indigestible is not arrogance" reading line kept as metaphor; the paragraph above them no longer claims predators avoid the bird.
- hercules-beetle: the new 豺 chái in the proverb soul has inline pinyin but no pronounce button; adding one would change page markup inside a plain paragraph. The proverb tiles and data-say (羊質虎皮) were already correct.
- hercules-beetle readings "using it to remove, not to wound" and "move weight, not to wound" kept as reading; the facts and meta no longer claim it never wounds. Trait 5 title "No one has ever seen it get eaten" matches ADW; its reading "too much trouble to bother with" kept.
- hercules-beetle 140 N force: OK per ADW, primary measurement untraced; kept.
- golden-snub-nosed-monkey: the hero 猪 (simplified) vs traditional 豬 zhū is a sitewide script call, not in this task. Unchanged.
- golden-snub-nosed-monkey trait 4 reading ("who has actually put in the hours") still fits the corrected fact. Kept.
- golden-snub-nosed-monkey v2 template is an unfilled scaffold (animalHan is a TODO placeholder); not edited.

## Structure check

All five pages parse with python html.parser. Every JSON-LD and application/json block parses (4 per page). The HTML tag sequence matches the backups on all five pages (mandarin-dragonet differs only in changed data-say/aria-label attribute values). No `<!--w4-reading-->` block on any of these pages. Inline CSS and JS identical to the backups. All edited template JSON loads, keysets unchanged, written with the same indent=2 format and trailing-newline state. No em dash, en dash or arrow and none of the banned words in any new text; several old em dashes left with the replaced sentences. Git not run.

## Final header characters

- mandarin-dragonet: 花斑連鰭䲗 huābān liánqí xián (was 鴛鴦鰧 yuānyāngténg)
- kakapo: 鴞鸚鵡 xiāo yīngwǔ (unchanged)
- hoatzin: 麝雉 shèzhì (unchanged; pinyin shows)
- hercules-beetle: 長戟大兜蟲 chángjǐ dàdōuchóng (was 甲 jiǎ)
- golden-snub-nosed-monkey: 金絲猴 jīnsīhóu (was 猴 hóu)
