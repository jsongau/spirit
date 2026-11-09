# FACTFIX-R9-B change log

Date: 2026-11-08. Pages: vulturine-guineafowl, secretary-bird, moon-jellyfish, fennec-fox, clarks-nutcracker.
Source of truth: `data/research/<slug>.json` fact_audit (and `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that exist (v2 for all five; v1 also for secretary-bird and fennec-fox) unless marked HTML only or JSON only. Where a string appears more than once in a file, every copy was changed (count shown; "v1x1, v2x1" means one copy in each template file). Strings inside the page's embedded `animal-data` JSON block count as HTML copies.
Backups of the original pages: `~/factfix-backup-r9b/<slug>.html`; original template JSON in `~/factfix-backup-r9b/tpl/v2/` and `tpl/v1/` (both outside the repo).
Header glyphs use traditional forms to match the pages, per the R2/R3/R4 precedent. The glyph swap covers rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy.
Source links: doi.org could not be checked from this session, so replacement citations link to pages the dossiers verified (ScienceDaily summary, Wikipedia reference list, Frontiers full text) rather than to unverified DOIs.

## vulturine-guineafowl

1. **Source:** v10 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">珠</span>
   - AFTER: <span class="rail__han" aria-hidden="true">鷲珠雞</span>
2. **Source:** v10 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="珠" aria-label="Hear 珠, zhū"
   - AFTER: data-say="鷲珠雞" aria-label="Hear 鷲珠雞, jiùzhūjī"
3. **Source:** v10 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">zhū</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">jiùzhūjī</span>
4. **Source:** v10 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">珠</span>
   - AFTER: <span class="serial-han">鷲珠雞</span>
5. **Source:** v10 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">珠</span><span class="py" lang="zh-Latn-pinyin">zhū</span>
   - AFTER: <span class="h" lang="zh">鷲珠雞</span><span class="py" lang="zh-Latn-pinyin">jiùzhūjī</span>
6. **Source:** v10 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "珠"
   - AFTER: "animalHan": "鷲珠雞"
7. **Source:** v10 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "zhū"
   - AFTER: "animalHanPy": "jiùzhūjī"
8. **Source:** v6, v7
   - BEFORE: Research published in 2021 found Acryllium vulturinum <b>maintains stable social groups that persist even when temporarily merged with other groups</b> — the first non-primate species documented with this type of multilevel social structure.
   - AFTER: A 2019 study in <i>Current Biology</i> found Acryllium vulturinum <b>maintains stable social groups that persist even when temporarily merged with other groups</b>, the first multilevel society described in a bird.
9. **Source:** v5 (hackles are blue and white; red eye and identification function unsourced)
   - BEFORE: The Vulturine Guineafowl's combination of bare blue-grey head, red eye, black-and-white hackle feathers, and <b>cobalt-blue breast makes individuals visually distinguishable within their supergroup</b>, functioning as identification rather than pure competitive display.
   - AFTER: The Vulturine Guineafowl wears a bare blue-grey face, long glossy blue-and-white hackle feathers and a <b>cobalt-blue breast</b>.
10. **Source:** v5, v8, v9 (trait title; km figure unverifiable)
   - BEFORE: Twenty to Forty Kilometers Daily
   - AFTER: The Daily Walk
11. **Source:** v5, v8, v9 (km figure unverifiable)
   - BEFORE: Vulturine Guineafowl are strong walkers that <b>cover 20 to 40 kilometers per day</b> through arid East African scrub, maintaining the entire supergroup in coordinated motion across that distance.
   - AFTER: Vulturine Guineafowl are <b>strong walkers that would rather run than fly</b>, and each day their groups move through arid East African scrub together, tracked by GPS in the Kenyan studies.
12. **Source:** v8, v9 (km figure unverifiable)
   - BEFORE: moving through the landscape in coordinated groups that maintain their internal structure across tens of kilometers each day.
   - AFTER: moving through the landscape on foot in coordinated groups that keep their internal structure day after day.
13. **Source:** v6, v7 (trait title)
   - BEFORE: Three Levels of Structure
   - AFTER: Groups Within Crowds
14. **Source:** v6, v7, v5
   - BEFORE: The species maintains a documented three-tier hierarchy: <b>supergroups of 20 to 60 birds contain stable subgroups of 10 to 15</b>, and birds preferentially associate within these tiers regardless of immediate context.
   - AFTER: Researchers in Kenya tracked over 400 birds living in <b>18 stable groups of 13 to 65 birds</b>. Groups meet and move together in crowds that can reach into the hundreds, then split back into the same groups.
15. **Source:** v5 (repertoire and functions unverifiable)
   - BEFORE: Vulturine Guineafowl produce a <b>loud, multi-call vocal repertoire</b> used to coordinate group movement, signal alarm, and maintain contact across the savanna between members of the same supergroup.
   - AFTER: Vulturine Guineafowl are <b>loud birds</b>, known for a repeated chink-chink-chink call that carries across the savanna.
16. **Source:** v5, v8, v9 (Stillness axis read; km figure unverifiable)
   - BEFORE: walks 20 to 40 kilometers through arid East African scrub each day — but never alone
   - AFTER: walks through arid East African scrub every day, but never alone
17. **Source:** v5 (Perception axis read)
   - BEFORE: has a loud and complex vocal repertoire used to coordinate group movement, signal alarm, and maintain contact across the savanna.
   - AFTER: is a loud bird, its chinking calls carrying across the savanna.
18. **Source:** v6, v7, v5 (Openness axis read)
   - BEFORE: it maintains stable subgroups of 10 to 15 birds within supergroups of 20 to 60, and these structures persist even when temporarily merged into a larger flock. Its elaborate cobalt plumage makes each bird identifiable across the group — openness is not just a trait here, it is the mechanism by which coordination is possible. Without visible individual identity, the architecture collapses.
   - AFTER: it lives in stable groups of 13 to 65 birds that keep their membership even when they merge into crowds of hundreds. Openness is how the whole system runs: groups mix freely and still come apart cleanly.
19. **Source:** v8, v9 (Rootedness axis read)
   - BEFORE: that hold across many kilometers of daily movement.
   - AFTER: that hold through each day's walk.
20. **Source:** v8, v9 (km figure unverifiable)
   - BEFORE: walks through 20 to 40 kilometers of East African savanna daily in coordinated group motion
   - AFTER: walks East African savanna daily in coordinated group motion
21. **Source:** v6, v7, v5
   - BEFORE: the color that makes identification possible in a supergroup of sixty.
   - AFTER: the color that marks the bird in a crowd of hundreds.
22. **Source:** v5 (palette note; identification function unsourced) (JSON only)
   - BEFORE: the identification signal that makes coordination possible
   - AFTER: the brightest patch on the bird
23. **Source:** v5, v6 (proverb panel; identification function unsourced)
   - BEFORE: The Vulturine Guineafowl's cobalt plumage is not decoration; it is identification. Each bird finds its subgroup not through decision but through recognition — the cobalt calls to the cobalt.
   - AFTER: The Vulturine Guineafowl's groups can fold into a crowd of hundreds and still split back into the same groups, every bird beside its own.
24. **Source:** v6 (source list: year, journal and link; old Science Advances link did not open)
   - BEFORE (HTML): <li><a href="https://www.science.org/doi/10.1126/sciadv.abf8803" rel="noopener">Papageorgiou et al. (2021) Multilevel societies of a non-primate species · Science Advances</a></li>
   - AFTER (HTML): <li><a href="https://www.sciencedaily.com/releases/2019/11/191104112811.htm" rel="noopener">Papageorgiou, D. et al. (2019), The multilevel society of a small-brained bird, Current Biology (ScienceDaily summary)</a></li>
   - BEFORE (JSON): "label": "Papageorgiou et al. (2021) Multilevel societies of a non-primate species · Science Advances",
        "href": "https://www.science.org/doi/10.1126/sciadv.abf8803"
   - AFTER (JSON): "label": "Papageorgiou, D. et al. (2019), The multilevel society of a small-brained bird, Current Biology (ScienceDaily summary)",
        "href": "https://www.sciencedaily.com/releases/2019/11/191104112811.htm"

## secretary-bird

1. **Source:** s14 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">鹫</span>
   - AFTER: <span class="rail__han" aria-hidden="true">蛇鷲</span>
2. **Source:** s14 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="鹫" aria-label="Hear 鹫, jiù"
   - AFTER: data-say="蛇鷲" aria-label="Hear 蛇鷲, shéjiù"
3. **Source:** s14 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">jiù</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">shéjiù</span>
4. **Source:** s14 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">鹫</span>
   - AFTER: <span class="serial-han">蛇鷲</span>
5. **Source:** s14 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">鹫</span><span class="py" lang="zh-Latn-pinyin">jiù</span>
   - AFTER: <span class="h" lang="zh">蛇鷲</span><span class="py" lang="zh-Latn-pinyin">shéjiù</span>
6. **Source:** s14 (traditional form to match the site) (template animalHan) (JSON only) [copies: v1x1, v2x1]
   - BEFORE: "animalHan": "鹫"
   - AFTER: "animalHan": "蛇鷲"
7. **Source:** s14 (traditional form to match the site) (template animalHanPy) (JSON only) [copies: v1x1, v2x1]
   - BEFORE: "animalHanPy": "jiù"
   - AFTER: "animalHanPy": "shéjiù"
8. **Source:** s9, s5 (measurement came from one trained captive bird and a rubber snake) [copies: v1x1, v2x1]
   - BEFORE: with rapid downward kicks measured at roughly <b>195 newtons of force, about five times the bird's own body weight</b>, delivered in a contact time of around fifteen milliseconds, fast enough that researchers needed a force plate and high-speed cameras to study the strike properly.
   - AFTER: with rapid downward kicks. Filmed with high-speed cameras as he struck a rubber snake on a force plate, one trained male hit with roughly <b>195 newtons of force, about five times his own body weight</b>, in a contact time of around fifteen milliseconds (Portugal et al. 2016).
9. **Source:** s10 ("one of only two" count unverifiable) [copies: v1x1, v2x1]
   - BEFORE: , one of only two raptor species that hunts mainly by walking rather than from the air.
   - AFTER: , a raptor that hunts almost strictly on the ground rather than from the air.
10. **Source:** s5, s14 (name origin contested) [copies: v1x1, v2x1]
   - BEFORE: and it is the likely source of the bird's common name.
   - AFTER: and it is often said to be the source of the bird's common name.
11. **Source:** s13, s8 (rictal bristles sit at the beak base; shielding function unsourced) [copies: v1x1, v2x1]
   - BEFORE: Stiff, thickened feathers resembling eyelashes, known as rictal bristles, ring the Secretary Bird's eyes and are thought to shield them from dust and struggling prey during the kick, protecting the one part of the bird most exposed in the instant it is doing the most damage.
   - AFTER: Small, stiff feathers without barbs form long eyelashes around the Secretary Bird's eyes. Some writers guess they help shield the eyes from dust and struggling prey during the kick, though no study we found has tested it.
12. **Source:** s10, s11, s5 (nest weight unsourced; size up to about 2.4 m) [copies: v1x1, v2x1]
   - BEFORE: until a long-held nest can measure roughly 2.5 metres across and weigh close to a metric ton.
   - AFTER: until a long-held nest can measure up to about 2.4 metres across.
13. **Source:** s10, s11, s5 (Rootedness axis read; nest weight unsourced) [copies: v1x1, v2x1]
   - BEFORE: adding to it until the structure can weigh close to a metric ton,
   - AFTER: adding to it until the structure can reach about 2.4 metres across,
14. **Source:** s10, s12, s5 (not the same nest every night) [copies: v1x1, v2x1]
   - BEFORE: Secretary birds fly up to roost in the same treetop nest every night at dusk, trading the open grass for a fixed, elevated perch until first light.
   - AFTER: Secretary birds fly up to roost in a flat-topped tree in the late afternoon or at dusk, sometimes in their own nest, trading the open grass for a raised perch until first light.
15. **Source:** s16 (Purple Star) [copies: v2x1]
   - BEFORE: and read for the Aries Dragon crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Aries Dragon crossing through two of them.
16. **Source:** s16 (Purple Star) [copies: v2x1]
   - BEFORE: Purple Star tends to seat Wu Qu exactly where a Secretary Bird would stand in a chart: not first to speak,
   - AFTER: In our reading, Wu Qu stands where a Secretary Bird would: not first to speak,
17. **Source:** s16 (Purple Star) [copies: v2x1]
   - BEFORE: The Killings star is Purple Star's own name for the strike that ends a standoff in one motion,
   - AFTER: The Killings star, as we read it, is the strike that ends a standoff in one motion,
18. **Source:** s16 (Purple Star) [copies: v2x1]
   - BEFORE: Charts that carry Qi Sha near the Life palace describe people who do not thrive
   - AFTER: We read Qi Sha here as the mark of people who do not thrive
19. **Source:** s16 (Purple Star) [copies: v2x1]
   - BEFORE: That is the outline the Aries Dragon tends to share: discipline that earns, and a strike that only lands under real pressure. Your exact birth hour moves both stars into your own twelve palaces and shows which one runs loudest,
   - AFTER: That is our outline for the Aries Dragon: discipline that earns, and a strike that only lands under real pressure. Only your real chart, cast from your lunar birth date and hour, shows where these stars fall in your twelve palaces and which one runs loudest,

## moon-jellyfish

1. **Source:** s9 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">月水母</span>
   - AFTER: <span class="rail__han" aria-hidden="true">海月水母</span>
2. **Source:** s9 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="月水母" aria-label="Hear 月水母, yuè shuǐmǔ"
   - AFTER: data-say="海月水母" aria-label="Hear 海月水母, hǎiyuè shuǐmǔ"
3. **Source:** s9 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">yuè shuǐmǔ</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">hǎiyuè shuǐmǔ</span>
4. **Source:** s9 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">月水母</span>
   - AFTER: <span class="serial-han">海月水母</span>
5. **Source:** s9 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">月水母</span><span class="py" lang="zh-Latn-pinyin">yuè shuǐmǔ</span>
   - AFTER: <span class="h" lang="zh">海月水母</span><span class="py" lang="zh-Latn-pinyin">hǎiyuè shuǐmǔ</span>
6. **Source:** s9 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "月水母"
   - AFTER: "animalHan": "海月水母"
7. **Source:** s9 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "yuè shuǐmǔ"
   - AFTER: "animalHanPy": "hǎiyuè shuǐmǔ"
8. **Source:** s18 (meta, og and JSON-LD descriptions; 500 million years is jellyfish in general) [copies: htmlx4]
   - BEFORE: the centerless pulsing animal who has drifted for 500 million years without a brain.
   - AFTER: the centerless pulsing animal whose kind has drifted for more than 500 million years without a brain.
9. **Source:** s12, s14, s18 (hero; it has simple eyespots; age is for jellyfish in general)
   - BEFORE: It has no brain. No heart. No eyes. It still pulses toward light and drifts with the current and has been doing this for 500 million years.
   - AFTER: It has no brain. No heart. No eyes like ours, only simple eyespots. It still pulses toward light and drifts with the current, and jellyfish have been doing this for more than 500 million years.
10. **Source:** s10 (A. aurita in the strict sense is not worldwide)
   - BEFORE: is a species of scyphozoan jellyfish found in oceans worldwide, notable for
   - AFTER: is a scyphozoan jellyfish whose genus, Aurelia, lives in coastal seas worldwide. It is notable for
11. **Source:** s16 ("billions" unsourced)
   - BEFORE: and the capacity to bloom in billions under the right conditions.
   - AFTER: and the capacity to bloom in vast numbers under the right conditions.
12. **Source:** s18 ("before fish" unsupported)
   - BEFORE: It has been doing this since before fish existed.
   - AFTER: Jellyfish have been doing this for more than 500 million years.
13. **Source:** s11 (pulses start at pacemakers in the eight rhopalia)
   - BEFORE: Sensory input is processed locally and distributed; there is no single site where decisions are made.
   - AFTER: Each swimming pulse starts at one of eight small pacemaker organs around the bell rim; there is no single site where decisions are made.
14. **Source:** s13
   - BEFORE: The pulse rate is approximately one contraction per second and is the organism's fundamental locomotion and its fundamental act.
   - AFTER: Swimming freely, it pulses slowly, about once every four seconds, and that pulse is the organism's fundamental locomotion and its fundamental act.
15. **Source:** s12 (Perception axis read)
   - BEFORE: The moon jellyfish has no eyes and no centralized nervous system. It detects light through photoreceptors distributed across its body
   - AFTER: The moon jellyfish has no eyes like ours and no centralized nervous system. It detects light through simple eyespots in the eight small sense organs around its bell rim
16. **Source:** s15 (trait title)
   - BEFORE: The immortality loop
   - AFTER: The way back
17. **Source:** s15 (Turritopsis is a hydrozoan, not a close relative; Aurelia medusae revert to polyps, not cysts)
   - BEFORE: A close relative, Turritopsis dohrnii, can revert to its polyp stage after reaching sexual maturity — a process of transdifferentiation that is <b>theoretically cyclical without limit</b>. The moon jellyfish itself can reabsorb into a cyst-like form under stress and restart development.
   - AFTER: In a 2015 study, moon jellyfish medusae (Aurelia sp.1), even sexually mature ones, <b>turned back into polyps</b> after starvation, low oxygen or injury, the first time this was recorded for a scyphozoan medusa (He et al. 2015).
18. **Source:** s16 ("billions" unsourced)
   - BEFORE: moon jellyfish form <b>blooms of millions to billions of individuals</b>.
   - AFTER: moon jellyfish form <b>huge blooms</b>; in 2013 one was big enough to shut down a reactor at Sweden's Oskarshamn nuclear plant.
19. **Source:** s16 (mirror copy; "billions" unsourced)
   - BEFORE: is billions of individual organisms each doing
   - AFTER: is a vast number of individual organisms each doing
20. **Source:** s17, s11 ("selective membrane" not a described feature; it catches prey rather than filtering)
   - BEFORE: the moon jellyfish maintains <b>a permeable but selective membrane</b> — it is not simply continuous with the water. The mesoglea holds form under pressure, and the oral arms filter particles from the water rather than absorbing everything indiscriminately.
   - AFTER: the moon jellyfish <b>picks what it takes in</b>. The mesoglea holds the bell in shape, and the jelly catches plankton with stinging cells and mucus on its tentacles and oral arms, then passes it along grooves to the mouth.
21. **Source:** s17 (Openness axis read; "selective membrane" not a described feature)
   - BEFORE: The membrane is real — it is selective about what passes through — but it is permeable rather than armored.
   - AFTER: Its boundary is real but soft, permeable rather than armored.
22. **Source:** s17 (mirror copy; feeding is by stinging cells and mucus)
   - BEFORE: And the oral arms filter rather than absorb indiscriminately.
   - AFTER: And the oral arms catch food with stinging cells and mucus rather than taking in whatever drifts by.
23. **Source:** s18 (card line; age is for jellyfish in general)
   - BEFORE: has been here for half a billion years.
   - AFTER: comes from a line half a billion years old.
24. **Source:** s18 (share and identity line; age is for jellyfish in general) [copies: htmlx2]
   - BEFORE: drifting without a plan, here for half a billion years.
   - AFTER: drifting without a plan, from a line half a billion years old.

## fennec-fox

1. **Source:** s9 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">狐</span>
   - AFTER: <span class="rail__han" aria-hidden="true">耳廓狐</span>
2. **Source:** s9 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="狐" aria-label="Hear 狐, hú"
   - AFTER: data-say="耳廓狐" aria-label="Hear 耳廓狐, ěrkuòhú"
3. **Source:** s9 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">hú</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">ěrkuòhú</span>
4. **Source:** s9 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">狐</span>
   - AFTER: <span class="serial-han">耳廓狐</span>
5. **Source:** s9 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">狐</span><span class="py" lang="zh-Latn-pinyin">hú</span>
   - AFTER: <span class="h" lang="zh">耳廓狐</span><span class="py" lang="zh-Latn-pinyin">ěrkuòhú</span>
6. **Source:** s9 (traditional form to match the site) (template animalHan) (JSON only) [copies: v1x1, v2x1]
   - BEFORE: "animalHan": "狐"
   - AFTER: "animalHan": "耳廓狐"
7. **Source:** s9 (traditional form to match the site) (template animalHanPy) (JSON only) [copies: v1x1, v2x1]
   - BEFORE: "animalHanPy": "hú"
   - AFTER: "animalHanPy": "ěrkuòhú"

## clarks-nutcracker

1. **Source:** s13 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">鴉</span>
   - AFTER: <span class="rail__han" aria-hidden="true">北美星鴉</span>
2. **Source:** s13 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="鴉" aria-label="Hear 鴉, yā"
   - AFTER: data-say="北美星鴉" aria-label="Hear 北美星鴉, běiměi xīngyā"
3. **Source:** s13 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">yā</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">běiměi xīngyā</span>
4. **Source:** s13 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">鴉</span>
   - AFTER: <span class="serial-han">北美星鴉</span>
5. **Source:** s13 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">鴉</span><span class="py" lang="zh-Latn-pinyin">yā</span>
   - AFTER: <span class="h" lang="zh">北美星鴉</span><span class="py" lang="zh-Latn-pinyin">běiměi xīngyā</span>
6. **Source:** s13 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "鴉"
   - AFTER: "animalHan": "北美星鴉"
7. **Source:** s13 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "yā"
   - AFTER: "animalHanPy": "běiměi xīngyā"
8. **Source:** s5, s6 (95 is for pinyon pine seeds; 22 km is Vander Wall and Balda, not Tomback; Tomback 1978 was not in The Condor)
   - BEFORE: holds up to 95 whitebark pine seeds in a single trip — allowing it to cache across distances of up to 22 kilometres from the seed source; documented by Tomback (1978) in The Condor.
   - AFTER: holds roughly 50 to 150 seeds in a single trip, depending on seed size (up to about 95 of the larger pinyon pine seeds), and nutcrackers carrying pinyon seed have cached up to 22 kilometres from the source (Vander Wall and Balda 1977).
9. **Source:** s6 (Stillness axis read; caches hold several seeds and no "three landmarks" rule)
   - BEFORE: Three times, per seed, per site.
   - AFTER: Over and over, site by site.
10. **Source:** s6, s7, s5 (trait title; 98,000 is seeds, not caches)
   - BEFORE: 98,000 individual caches
   - AFTER: 98,000 seeds, thousands of caches
11. **Source:** s6, s7, s5 (1 to 14 seeds per cache; figures are Vander Wall and Balda 1977 and Hutchins and Lanner 1982)
   - BEFORE: A single Clark's Nutcracker caches an estimated <b>22,000 to 98,000 individual seeds per year</b>, each in a separate location; Tomback and Linhart (1990) document the upper range in multi-year field studies of caching behavior in subalpine habitat.
   - AFTER: A single Clark's Nutcracker caches an estimated <b>22,000 to 98,000 seeds a season</b>, buried 1 to 14 at a time in thousands of separate caches; the low figure comes from Vander Wall and Balda (1977), the high one from Hutchins and Lanner (1982) for whitebark pine.
12. **Source:** s6, s8, s5 (overture frame)
   - BEFORE: The sub-lingual pouch, the 98,000 caches, the landmark-based coordinate system, the false cache performed under observation,
   - AFTER: The sub-lingual pouch, the 98,000 seeds, the landmark-based coordinate system, the caching that slows when someone is watching,
13. **Source:** s5, s6 (proverb panel; seeds go in a few at a time)
   - BEFORE: It caches 98,000 small ones, one at a time, in one season.
   - AFTER: It caches up to 98,000 small ones, a few at a time, in one season.
14. **Source:** s5 ("six months" of winter unsourced)
   - BEFORE: where winter lasts six months,
   - AFTER: where winter runs long,
15. **Source:** s6, s7 (trait title)
   - BEFORE: 70 percent recovery under snow
   - AFTER: Recovery under snow
16. **Source:** s6, s7, s5 (wrong attribution and journal; snow depth unsourced)
   - BEFORE: Nutcrackers recover approximately <b>70 percent of their individual caches</b> months later, often through a metre or more of snow with no visible surface markers; Vander Wall and Balda (1981) established this through displacement and tracking studies in Animal Behaviour.
   - AFTER: Nutcrackers <b>recover most of their caches</b>, up to nine months later, often through snow with no visible surface markers; field workers report finds at about 80 percent of the holes the birds dig (Tomback 1980), and estimates run from 50 to 80 percent of seeds.
17. **Source:** s7, s6 (lesson line)
   - BEFORE: Clark's Nutcracker recovers 70 percent of its caches. The other 30 percent stay in the ground — and those are the seeds that become trees.
   - AFTER: Clark's Nutcracker recovers most of its caches, but not all. The seeds it leaves in the ground are the ones that become trees.
18. **Source:** s6 (trait title; no "minimum of three" rule)
   - BEFORE: Three-landmark coordinate system
   - AFTER: Landmark coordinate system
19. **Source:** s6 (no "minimum of three" rule; Balda and Kamil 1992 is Animal Behaviour and about long-term memory)
   - BEFORE: it memorizes the <b>spatial relationship between the site and a minimum of three independent landmarks</b>; Balda and Kamil (1992) confirmed this mechanism in Nature through cache-displacement experiments.
   - AFTER: it memorizes the <b>spatial relationship between the site and nearby landmarks</b>; when Vander Wall (1982) moved the landmarks, the birds moved their search to match, and in Kamil and Jones (1997, <i>Nature</i>) they learned to find a spot halfway between two landmarks.
20. **Source:** s6 (Rootedness axis read)
   - BEFORE: it memorizes the spatial relationship between each cache site and a minimum of three independent landmarks. Move the landmarks, and the cache is functionally lost.
   - AFTER: it memorizes the spatial relationship between each cache site and the landmarks around it. Move the landmarks, and the bird searches in the wrong place.
21. **Source:** s6 (Perception axis read; what Balda and Kamil 1992 showed)
   - BEFORE: Balda and Kamil (1992) confirmed it outperforms other corvids on cache-site recall tasks in controlled conditions.
   - AFTER: Balda and Kamil (1992, Animal Behaviour) found captive birds still recalled cache sites up to 285 days later.
22. **Source:** s6 (Earth element line)
   - BEFORE: folded into the spatial relationship between a seed and three landmarks.
   - AFTER: folded into the spatial relationship between a seed and the landmarks around it.
23. **Source:** s9, s7 (USFWS wording)
   - BEFORE: <b>sole effective seed disperser of whitebark pine</b>
   - AFTER: <b>almost the only seed disperser of whitebark pine</b>
24. **Source:** s8 (trait title; false caching unsourced, cache suppression documented)
   - BEFORE: False caches under observation
   - AFTER: Caching less when watched
25. **Source:** s8 (false caching unsourced; cache suppression documented)
   - BEFORE: Nutcrackers perform <b>deceptive or 'false' caches</b> when observed by competitors — going through the complete motions of burial, including the final beak-press, without depositing a seed; this behavior was studied by Vander Wall and Balda (1981) and linked to resource protection.
   - AFTER: Nutcrackers <b>cache less when watched</b>: with a potential thief looking on, they make fewer caches; Clary and Kelly (2011, <i>Animal Cognition</i>) tied this to protecting their stores.
26. **Source:** s8 (Openness axis read)
   - BEFORE: has been documented performing false cache attempts — going through the full motions of burial without depositing anything — when observed by competitors.
   - AFTER: has been documented making fewer caches when a competitor is watching.
27. **Source:** s8 (mirror copy)
   - BEFORE: The false cache is one of the nutcracker's documented behaviors: going through the complete motions of burial without actually depositing a seed. This happens when another bird is watching.
   - AFTER: Caching less when watched is one of the nutcracker's documented behaviors: when another bird is looking on, it makes fewer caches.
28. **Source:** s5, s15 (source list: journal is Living Bird; DOI pointed to a 1983 Mississippi Kite paper, so it now links to the Wikipedia reference list that cites the paper)
   - BEFORE (HTML): <li><a href="https://doi.org/10.2307/1367256" rel="noopener">Tomback, D.F. (1978). Foraging strategies of Clark's nutcracker. The Condor 80(4).</a></li>
   - AFTER (HTML): <li><a href="https://en.wikipedia.org/wiki/Clark%27s_nutcracker" rel="noopener">Tomback, D.F. (1978). Foraging strategies of Clark's nutcracker. Living Bird 16: 123-161 (cited in Wikipedia).</a></li>
   - BEFORE (JSON): "label": "Tomback, D.F. (1978). Foraging strategies of Clark's nutcracker. The Condor 80(4).",
        "href": "https://doi.org/10.2307/1367256"
   - AFTER (JSON): "label": "Tomback, D.F. (1978). Foraging strategies of Clark's nutcracker. Living Bird 16: 123-161 (cited in Wikipedia).",
        "href": "https://en.wikipedia.org/wiki/Clark%27s_nutcracker"
29. **Source:** s16 (removed: DOI pointed to a 1981 field cricket paper, and the page text no longer cites it), s8 (added in its place for cache suppression)
   - BEFORE (HTML): <li><a href="https://doi.org/10.1111/j.1439-0310.1981.tb01278.x" rel="noopener">Vander Wall, S.B. &amp; Balda, R.P. (1981). Ecology and evolution of food-storage behavior in conifer-seed-caching corvids. Zeitschrift für Tierpsychologie 56.</a></li>
   - AFTER (HTML): <li><a href="https://www.frontiersin.org/articles/10.3389/fpsyg.2016.01643/full" rel="noopener">Clary, D. &amp; Kelly, D.M. (2016). Clark's nutcrackers flexibly adapt caching behavior to a cooperative context. Frontiers in Psychology 7.</a></li>
   - BEFORE (JSON): "label": "Vander Wall, S.B. & Balda, R.P. (1981). Ecology and evolution of food-storage behavior in conifer-seed-caching corvids. Zeitschrift für Tierpsychologie 56.",
        "href": "https://doi.org/10.1111/j.1439-0310.1981.tb01278.x"
   - AFTER (JSON): "label": "Clary, D. & Kelly, D.M. (2016). Clark's nutcrackers flexibly adapt caching behavior to a cooperative context. Frontiers in Psychology 7.",
        "href": "https://www.frontiersin.org/articles/10.3389/fpsyg.2016.01643/full"

## Not applied

- vulturine-guineafowl: trait titles "The Plumage as Signal" and "The Coordinating Call" and readings that lean on plumage as an ID badge or the call as a coordinator (moon-why "all members identifiable", awakened and mirror lines using "supergroup") were left as readings; only fact lines, axis reads, the room lede and the proverb panel were corrected. No km figure was printed anywhere (dossier: unverifiable until someone reads Papageorgiou and Farine 2020). Dozens of em dashes remain in untouched copy (style flag in the audit).
- secretary-bird: trait 4 title "The lashes at the strike" and its reading kept; the fact now presents the shielding as a guess. Page still mixes simplified 龙 in the zodiac strip (style flag). Purple Star kicker already said "Our Purple Star reading"; the CTA "see how close it lands" kept.
- moon-jellyfish: trait 6 title "The membrane" and the membrane readings (band reading, mirror take, bonds support) kept as metaphor; the fact, axis read and the mirror's feeding sentence were corrected. Header pinyin kept as two words (hǎiyuè shuǐmǔ) as instructed. Hero and overture close now both carry the 500 million year line.
- fennec-fox: every audit item was OK; only the header glyph changed. Soft notes left as is: "up to 15 cm" ears (ADW gives 15 cm), "cold enough at night" for the foot fur, "highly vocal" comparison, kidney clause cited to ADW (PBS is the source).
- clarks-nutcracker: hero "caches up to 98,000 individual seeds per year" kept (audit OK). Third DOI (Balda and Kamil 1992, Animal Behaviour) kept: it could not be opened (UNVERIFIABLE), and only the two DOIs that resolve to unrelated papers were in scope. Stillness axis "up to 20 kilometres in a single foraging bout" kept (close to the 22 km cache distance). Hippocampus claim in the Perception axis was not audited; left. The 2022 USFWS threatened listing for whitebark pine (audit suggestion) not added, since it is an addition, not a correction. Trait 6 reading "Not always to deceive" kept as reading.
- No page had a `<!--w4-reading-->` block. Related Animals explore-card labels untouched.

## Structure check

Section counts match backups (vulturine-guineafowl 31/31, secretary-bird 33/33, moon-jellyfish 31/31, fennec-fox 32/32, clarks-nutcracker 31/31). All JSON-LD and application/json blocks parse (4 per page). HTML start-tag skeleton identical to backup on all five, apart from the added `<i>` journal tags (vulturine-guineafowl +1, clarks-nutcracker +2). Every edited page parses with python html.parser. Template JSON (v2 for all five, v1 for secretary-bird and fennec-fox) loads and keysets are unchanged. New text checked for em and en dashes, arrows and the banned word list. No git commands were run.

## Final header characters

| Page | Header hanzi | Pinyin |
|---|---|---|
| vulturine-guineafowl | 鷲珠雞 | jiùzhūjī |
| secretary-bird | 蛇鷲 | shéjiù |
| moon-jellyfish | 海月水母 | hǎiyuè shuǐmǔ |
| fennec-fox | 耳廓狐 | ěrkuòhú |
| clarks-nutcracker | 北美星鴉 | běiměi xīngyā |
