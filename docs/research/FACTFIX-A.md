# FACTFIX-A change log

Date: 2026-11-08. Pages: raven, star-nosed-mole, koala, arctic-tern, slow-loris.
Source of truth: `data/research/<slug>.json` fact_audit. Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data file (`zodi-animal-template-v2/data/animals/<slug>.json`; koala also `zodi-animal-template-v1/data/animals/koala.json`) unless marked HTML only / JSON only.
Backups of the original pages: `~/factfix-backup/<slug>.html` (outside the repo).

## raven  (13 edits)

1. **Source:** s14 (replaces s19 scrub-jay finding)
   - BEFORE: Ravens cache food — storing surplus items in hidden locations for later retrieval — and have demonstrated <b>episodic-like memory</b> for cache location, content, and time elapsed since caching. They retrieve cached food based on what was cached and how long ago, adjusting for perishability. This is future-planning:
   - AFTER: Ravens cache food, storing surplus items in hidden places to retrieve later. They also <b>plan for a future need</b>. In lab tests, ravens chose a tool or a trading token and saved it for later use. This is future-planning:
2. **Source:** s17, s16 (drops s18 scrub-jay finding)
   - BEFORE: it will subsequently move the cache to a new location when the observer is absent. Ravens that have never stolen from another bird's cache are significantly less likely to re-cache — suggesting the behavior is driven by what the raven knows about its own intentions, projected onto the observer. This is theory of mind
   - AFTER: it changes its plan. It caches farther away, or waits until the rival has gone. Ravens also treat a rival that saw the cache being made differently from one that did not. This is theory of mind
3. **Source:** s13 (grief clause cut, no source)
   - BEFORE: including coordinated food defense, mutual preening, and observed behavioral changes after a partner's death consistent with grief responses documented in other highly social birds.
   - AFTER: including coordinated food defense and mutual preening.
4. **Source:** s22, s23, s13
   - BEFORE: the long-term pair bond with observed grief behavior; the individual recognition and grudge-holding across months of researcher interaction;
   - AFTER: the long-term pair bond; the individual recognition of a human who cheated them, still held a month later;
5. **Source:** s22, s23
   - BEFORE: Ravens have demonstrated <b>long-term individual recognition and negative bias toward specific humans</b> who had deceived or threatened them in research contexts — avoiding those individuals, alerting others to their presence, and displaying threat behavior months after the initial negative interaction.
   - AFTER: Ravens have demonstrated <b>individual recognition and negative bias toward specific humans</b> who cheated them. In one study, ravens traded with a fair human and an unfair one. A month later, they still chose the fair trader.
6. **Source:** s22, s23
   - BEFORE: The raven that was deceived by a researcher avoids that researcher for months.
   - AFTER: A raven cheated by a human trader still picks the fair trader over the cheat a month later.
7. **Source:** s24
   - BEFORE: <b>distinct behavioral repertoires and vocal dialects</b>
   - AFTER: <b>distinct vocal dialects</b>
8. **Source:** s24 (problem-solving clause cut, no source)
   - BEFORE: Individual ravens carry the specific culture of the group they were raised in, and that culture affects how they solve problems.
   - AFTER: Individual ravens carry the specific culture of the group they were raised in.
9. **Source:** s16
   - BEFORE: https://link.springer.com/article/10.1007/s10071-004-0239-6
   - AFTER: https://pmc.ncbi.nlm.nih.gov/articles/PMC1559847
10. **Source:** s16
   - BEFORE: Bugnyar & Heinrich (2005) — Raven theory of mind and cache protection, Animal Cognition
   - AFTER: Bugnyar & Heinrich (2005) — Ravens differentiate between knowledgeable and ignorant competitors, Proceedings of the Royal Society B
11. **Source:** s14, s15
   - BEFORE: https://link.springer.com/article/10.1007/s10071-008-0157-0
   - AFTER: https://lup.lub.lu.se/search/publication/f008a0f7-c3d5-4b99-9541-09863619803d
12. **Source:** s14, s15
   - BEFORE: Osvath & Osvath (2008) — Great ape and raven future planning, Animal Cognition
   - AFTER: Kabadayi & Osvath (2017) — Ravens parallel great apes in flexible planning for tool-use and bartering, Science
13. **Source:** s25
   - BEFORE: Allow Ravens to Behave Like Humans
   - AFTER: Allow Smart Birds to Behave Like Humans

## star-nosed-mole  (13 edits)

1. **Source:** S4, S3 (strap fix) (2 places in HTML)
   - BEFORE: I decide in 25 milliseconds.
   - AFTER: I decide in 120 milliseconds.
2. **Source:** S4, S3 (strap fix)
   - BEFORE: Decides in 25 milliseconds.
   - AFTER: Decides in 120 milliseconds.
3. **Source:** S4, S3 (HTML only)
   - BEFORE: class="band__name reveal d1">25 milliseconds</h3>
   - AFTER: class="band__name reveal d1">120 milliseconds</h3>
4. **Source:** S4, S3
   - BEFORE: can <b>identify and swallow prey in approximately 25 milliseconds</b>, making it the fastest eating behavior documented in any mammal,
   - AFTER: can <b>identify and swallow prey in as little as 120 milliseconds</b>, the fastest eating documented in any mammal,
5. **Source:** S4, S3
   - BEFORE: the 25-millisecond identification of prey,
   - AFTER: the prey identified and swallowed in as little as 120 milliseconds,
6. **Source:** S1, S2, S7
   - BEFORE: The visual cortex has been largely repurposed for processing tactile information from the star.
   - AFTER: More than half of its touch-processing cortex serves the nose. That touch system is organized much like a visual system.
7. **Source:** S2 (timing clause cut)
   - BEFORE:  This brief examination is where the 25-millisecond timing is measured.
   - AFTER: (sentence removed)
8. **Source:** S4, S3
   - BEFORE: At 25 milliseconds from contact to swallow,
   - AFTER: At as little as 120 milliseconds from contact to swallow,
9. **Source:** S4, S3
   - BEFORE: The 25 milliseconds never arrives.
   - AFTER: The 120 milliseconds never arrives.
10. **Source:** S4, S3
   - BEFORE: identifies prey in 25 milliseconds
   - AFTER: identifies and swallows prey in as little as 120 milliseconds
11. **Source:** S4, S3
   - BEFORE: The release is in the 25 milliseconds.
   - AFTER: The release is in the 120 milliseconds.
12. **Source:** S4
   - BEFORE: https://doi.org/10.1038/nature03818
   - AFTER: https://pubmed.ncbi.nlm.nih.gov/15690041
13. **Source:** S4, S3 (JSON only)
   - BEFORE: 25 milliseconds
   - AFTER: 120 milliseconds

## koala  (6 edits)

1. **Source:** s14, s15 ('only by taste and smell' cut)
   - BEFORE: koalas have been shown to <b>selectively visit trees with higher available nitrogen and lower concentrations of a toxic compound called sideroxylonal</b>, a difference invisible to the eye and detectable only by taste and smell.
   - AFTER: koalas have been shown to <b>feed less on trees richer in a toxic compound called sideroxylonal and to avoid nitrogen-poor trees</b>, a difference invisible to the eye.
2. **Source:** s12 (100-hour figure cut, unverifiable)
   - BEFORE: <b>two metres long, about four to five times its own body length</b>, proportionally the largest cecum of any mammal, and food can take up to 100 hours to pass through the full digestive system.
   - AFTER: <b>two metres long, about two and a half to three times its own body length</b>, proportionally the largest cecum of any mammal.
3. **Source:** s13
   - BEFORE: <b>eighteen to twenty-two hours a day</b>
   - AFTER: <b>eighteen to twenty hours a day</b>
4. **Source:** s16, s17
   - BEFORE: <b>fingerprint ridge patterns close enough to human fingerprints</b> that forensic examiners have reportedly had difficulty telling the two apart under a microscope, despite
   - AFTER: <b>fingerprint ridge patterns very close to human fingerprints</b>, despite
5. **Source:** s11, s18
   - BEFORE: Male koalas produce a low bellow using a <b>permanently descended larynx</b>, the first documented case in a marsupial, anchored deep enough in the throat to retract further into the chest; the resulting call has a fundamental frequency roughly twenty times lower than an eight-kilogram animal should be able to produce, more typical of an animal the size of an elephant.
   - AFTER: Male koalas make their low bellow with <b>velar vocal folds</b>, a separate organ above the larynx where the nose meets the mouth. The call's pitch is roughly twenty times lower than an eight-kilogram animal should be able to produce, more typical of an animal the size of an elephant. Koalas also have a permanently descended larynx, the first documented case in a marsupial. It lowers the resonances of the call, which signal body size.
6. **Source:** s13 (axes read, same claim)
   - BEFORE: eighteen to twenty-two hours out of the day
   - AFTER: eighteen to twenty hours out of the day

## arctic-tern  (14 edits)

1. **Source:** egevang-phys, egevang-nora (HTML only)
   - BEFORE: class="band__name reveal d1">The Figure-Eight Route</h3>
   - AFTER: class="band__name reveal d1">The S-Shaped Route</h3>
2. **Source:** egevang-phys, egevang-nora (JSON only)
   - BEFORE: The Figure-Eight Route
   - AFTER: The S-Shaped Route
3. **Source:** egevang-phys, egevang-nora
   - BEFORE: GPS tracking has confirmed that the Arctic Tern's migration does not follow a straight line between poles. The route <b>forms a global figure-eight</b>, curving with prevailing wind systems to minimize headwind and maximize speed across both hemispheres.
   - AFTER: Tracking with tiny geolocators has shown that the Arctic Tern's migration does not follow a straight line between poles. The route <b>bends into a giant S across the Atlantic</b>, riding the prevailing winds.
4. **Source:** egevang-phys, egevang-nora
   - BEFORE: GPS tracking has shown that the Arctic Tern's route does not follow a straight line — it bends with global wind systems, forming a figure-eight across both hemispheres.
   - AFTER: Tracking has shown that the Arctic Tern's route does not follow a straight line. It bends with global wind systems, forming a giant S across the Atlantic.
5. **Source:** egevang-phys, egevang-nora (audit note on distance entry)
   - BEFORE: according to GPS logger data.
   - AFTER: according to geolocator data.
6. **Source:** wiki-tern (HTML only)
   - BEFORE: class="band__name reveal d1">The Same Nest</h3>
   - AFTER: class="band__name reveal d1">The Same Colony</h3>
7. **Source:** wiki-tern (JSON only)
   - BEFORE: The Same Nest
   - AFTER: The Same Colony
8. **Source:** youdao (JSON only)
   - BEFORE: 鷗
   - AFTER: 燕鷗
9. **Source:** wiki-tern
   - BEFORE: <b>return to the same nesting colony and often the exact nest site</b> year after year, locating a shallow scrape of ground across a year-long crossing of the planet.
   - AFTER: <b>return to the same nesting colony</b> year after year, finding it again after a year-long crossing of the planet.
10. **Source:** wiki-tern
   - BEFORE: returns to the same nesting colony — often the exact same nest site — year after year
   - AFTER: returns to the same nesting colony year after year
11. **Source:** egevang-phys, egevang-nora, ncl-2016, aab-food
   - BEFORE: Arctic Terns do not pause the migration to feed. They <b>hover and plunge-dive for small fish mid-journey</b> across open ocean, sustaining the entire crossing without stopping at a fixed feeding ground.
   - AFTER: Arctic Terns <b>feed on the wing as they travel</b>, hovering and plunge-diving for small fish across open ocean. They refuel at a few open-ocean stopovers along the way.
12. **Source:** egevang-phys, egevang-nora, ncl-2016
   - BEFORE: The Arctic Tern never stops moving. Its annual route covers 70,000 to 90,000 kilometers without a single extended pause.
   - AFTER: The Arctic Tern is almost always moving. Its annual route covers 70,000 to 90,000 kilometers, with only a few stopovers to refuel.
13. **Source:** youdao (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">鷗</span>
   - AFTER: <span class="rail__han" aria-hidden="true">燕鷗</span>
14. **Source:** youdao (HTML only)
   - BEFORE: <span class="serial-han">鷗</span>
   - AFTER: <span class="serial-han">燕鷗</span>

## slow-loris  (15 edits)

1. **Source:** S5
   - BEFORE: capable of causing anaphylactic shock in humans — documented human fatalities have been recorded from bites, with cases described in Nekaris et al. (2013) in PLoS ONE.
   - AFTER: capable of causing anaphylactic shock in humans. That shock can be fatal.
2. **Source:** S5
   - BEFORE: https://doi.org/10.1371/journal.pone.0060793
   - AFTER: https://pmc.ncbi.nlm.nih.gov/articles/PMC3852360
3. **Source:** S5
   - BEFORE: Nekaris, K.A.I. et al. (2013) — Slow Lorises in a Biodiversity Hotspot. PLoS ONE 8(3)
   - AFTER: Nekaris, K.A.I., Moore, R.S., Rode, E.J. & Fry, B.G. (2013) — Mad, bad and dangerous to know: the biochemistry, ecology and evolution of slow loris venom. J Venom Anim Toxins incl Trop Dis 19:21
4. **Source:** none (claim cut, no source) (HTML only)
   - BEFORE: class="band__name reveal d1">Pupils that cannot rotate</h3>
   - AFTER: class="band__name reveal d1">Eyes built for the dark</h3>
5. **Source:** none (claim cut, no source) (JSON only)
   - BEFORE: Pupils that cannot rotate
   - AFTER: Eyes built for the dark
6. **Source:** none (claim cut, no source)
   - BEFORE: Like the tarsier, the Slow Loris has <b>eyes that are fixed in their sockets</b> and cannot rotate; to change its field of view, the animal rotates its entire head. The large round eyes are adapted for nocturnal environments where other animals cannot see at all.
   - AFTER: The Slow Loris has <b>large round eyes</b> adapted for nocturnal environments where other animals cannot see at all.
7. **Source:** none (claim cut, no source)
   - BEFORE: The Slow Loris cannot rotate its eyes — like the tarsier, it rotates its entire head to track. The large round eyes are built for nocturnal vision,
   - AFTER: The Slow Loris has large round eyes built for nocturnal vision,
8. **Source:** none (claim cut, no source)
   - BEFORE: the large eyes that cannot rotate in their sockets,
   - AFTER: the large eyes built for the dark,
9. **Source:** S11
   - BEFORE: Field studies have measured Slow Loris locomotion at speeds <b>among the lowest recorded for any primate relative to body size</b>; the animal moves through the canopy
   - AFTER: The Slow Loris <b>moves slowly and does not leap</b>. It travels through the canopy
10. **Source:** S11
   - BEFORE: The Slow Loris is one of the slowest primates relative to body size; its movement is so deliberate
   - AFTER: The Slow Loris moves slowly and does not leap. Its movement is so deliberate
11. **Source:** S11
   - BEFORE: and one of the slowest-moving mammals relative to its body size.
   - AFTER: and a slow climber that does not leap.
12. **Source:** S11
   - BEFORE: The only venomous primate: slowest movement,
   - AFTER: The only venomous primate: slow movement,
13. **Source:** S11, S10, S8
   - BEFORE: Slow Lorises are critically endangered; a primary driver is the <b>illegal pet trade</b>,
   - AFTER: All slow lorises are threatened and protected under CITES Appendix I. The Javan slow loris is Critically Endangered. A primary driver is the <b>illegal pet trade</b>,
14. **Source:** S11, S10, S8
   - BEFORE: The Slow Loris is critically endangered partly because
   - AFTER: The Slow Loris is threatened partly because
15. **Source:** S5
   - BEFORE: The brachial gland toxin is produced continuously and <b>replenished through regular grooming of the inner arms</b>; the Slow Loris maintains its chemical defense not through a single event but through a slow, ongoing process that requires no urgency and produces a defense that is always current.
   - AFTER: The Slow Loris <b>licks the brachial gland on its inner arm</b> to mix the secretion with its saliva, which is how the venom forms.


## Notes and open items

- Arctic tern: 燕鷗 now shows in the rail glyph and the keepsake glyph (sibling pages already use 2 to 5 characters in both slots). Pinyin yàn'ōu was NOT added. The page has no ruby or pinyin pattern for these glyphs, and the renderer (`zodi-animal-template-v2/template/render-animal.mjs`, lines ~928 and ~1234) emits them from `animalHan` with no pinyin slot, so any attribute added by hand would be lost on rebuild.
- Reference list separators ( — ) were kept as the existing list format; only the title text after them changed.
- Raven: the Gifts of the Crow link still points to the Simon & Schuster page (the audit did not flag the link).
- Koala: the bellow fact now credits velar vocal folds (Charlton et al. 2013, dossier s11), but the page's reference list cites only Charlton et al. 2011. No reference was added.
- Slow loris: trait 3 "Our reading" ("There is no glance in this system, only the full rotation") and the axes Perception read ("turning toward them fully") still lean on the cut head-rotation fact. They are interpretation, not fact claims, so they were left for the owner.
- Star-nosed mole: pre-existing bug left untouched: the shadow beat renders a literal `&lt;b&gt;` in the page text.
- Star-nosed mole: the Catania & Kaas (1995) DOI was not changed (audit verdict OK; DOI unresolved by the researcher).
