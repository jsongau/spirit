# FACTFIX-R6-B change log

Date: 2026-11-08. Pages: tuatara, tibetan-blue-bear, swift, superb-lyrebird, sun-bear.
Source of truth: `data/research/<slug>.json` fact_audit (and page_bugs where present) plus `<slug>.md`. Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that exist (all five have a v1 file; only sun-bear has a v2 file) unless marked HTML only or JSON only. Where a string appears more than once in a file, every copy was changed (count shown). Strings inside the page's embedded `animal-data` JSON block count as HTML copies.
Backups of the original pages: `~/factfix-backup-r6b/<slug>.html`; original template JSON in `~/factfix-backup-r6b/tpl/v1/` and `tpl/v2/` (both outside the repo).
Header glyphs use traditional forms to match the pages, per the R2 to R4 precedent. The glyph swap covers rail__han, the rail pronounce button (data-say, aria-label), rail__py, serial-han, the keepsake-han line (.h, .py, button data-say and aria-label) and template animalHan + animalHanPy.

## tuatara

1. **Source:** s14 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">蜥</span>
   - AFTER: <span class="rail__han" aria-hidden="true">喙頭蜥</span>

2. **Source:** s14 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="蜥" aria-label="Hear 蜥, xī"
   - AFTER: data-say="喙頭蜥" aria-label="Hear 喙頭蜥, huìtóuxī"

3. **Source:** s14 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">xī</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">huìtóuxī</span>

4. **Source:** s14 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">蜥</span>
   - AFTER: <span class="serial-han">喙頭蜥</span>

5. **Source:** s14 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">蜥</span><span class="py" lang="zh-Latn-pinyin">xī</span>
   - AFTER: <span class="h" lang="zh">喙頭蜥</span><span class="py" lang="zh-Latn-pinyin">huìtóuxī</span>

6. **Source:** s14 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "蜥"
   - AFTER: "animalHan": "喙頭蜥"

7. **Source:** s14 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "xī"
   - AFTER: "animalHanPy": "huìtóuxī"

8. **Source:** s9, s8 [copies: htmlx1, v1x1]
   - BEFORE: lizards and snakes roughly 200 million years ago</b>
   - AFTER: lizards and snakes roughly 250 million years ago</b>

9. **Source:** s7, s10, s6, s8 (size comparison cut; over-100 cases are captive) [copies: htmlx1, v1x1]
   - BEFORE: Its metabolism runs <b>far slower than that of other reptiles its size</b>, and wild individuals are known to <b>live well over 100 years</b>.
   - AFTER: Its metabolism runs <b>very slowly</b>, and tuatara commonly live 60 years or more. The few known to <b>live past 100 years</b> are captive animals, like Henry at the Southland Museum, who fathered young at about 111.

10. **Source:** s10, s8 [copies: htmlx1, v1x1]
   - BEFORE: Hatchlings carry a functional <b>parietal eye on top of the skull, with a lens and a light-sensing retina</b>, which becomes covered by scale and skin as the animal reaches adulthood.
   - AFTER: Hatchlings carry a <b>parietal eye on top of the skull, with a lens and a light-sensing retina</b>, which is covered by scales and pigment within four to six months. It senses light and is thought to track day and night, but it probably cannot form images.

11. **Source:** s10, s7, s8 (longest-incubation superlative unverifiable) [copies: htmlx1, v1x1]
   - BEFORE: , the longest incubation period of any living reptile.
   - AFTER: , part of one of the slowest reproductive cycles of any reptile.

12. **Source:** s4, s3 (Snake years as they fall for a Capricorn) (HTML only)
   - BEFORE: Recent Snake years: 2001, 2013, 2025.</p>
   - AFTER: Recent Snake years: 2001, 2013, 2025. For a Capricorn that means late December 2001, 2013 or 2025, or January 2002, 2014 or 2026.</p>

## tibetan-blue-bear

1. **Source:** s12, s6 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">熊</span>
   - AFTER: <span class="rail__han" aria-hidden="true">藏馬熊</span>

2. **Source:** s12, s6 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="熊" aria-label="Hear 熊, xióng"
   - AFTER: data-say="藏馬熊" aria-label="Hear 藏馬熊, zàngmǎxióng"

3. **Source:** s12, s6 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">xióng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">zàngmǎxióng</span>

4. **Source:** s12, s6 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">熊</span>
   - AFTER: <span class="serial-han">藏馬熊</span>

5. **Source:** s12, s6 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">熊</span><span class="py" lang="zh-Latn-pinyin">xióng</span>
   - AFTER: <span class="h" lang="zh">藏馬熊</span><span class="py" lang="zh-Latn-pinyin">zàngmǎxióng</span>

6. **Source:** s12, s6 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "熊"
   - AFTER: "animalHan": "藏馬熊"

7. **Source:** s12, s6 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "xióng"
   - AFTER: "animalHanPy": "zàngmǎxióng"

8. **Source:** s11, s12 [copies: htmlx1, v1x1]
   - BEFORE: dark blue-grey in coat with a pale patch at the throat,
   - AFTER: with a coat that runs from dark brown to creamy white and a pale yellowish collar across the shoulders and chest,

9. **Source:** s13, s6 [copies: htmlx1, v1x1]
   - BEFORE: A recent species-wide review of brown bear subspecies by the International Association for Bear Research and Management names the mainland grizzly, the Kodiak bear, and a tentative Gobi Desert population, but <b>does not list the Tibetan Plateau population by name at all</b>.
   - AFTER: The brown bear species profile from the International Association for Bear Research and Management names the mainland grizzly, the Kodiak bear, and a tentative Gobi Desert population, but <b>does not mention the Tibetan Plateau population at all</b>, even though it has carried a scientific name, Ursus arctos pruinosus, since 1854.

10. **Source:** s14, s13, s6 (Tibetan clause unsourced) [copies: htmlx1, v1x1]
   - BEFORE: across their range, the Tibetan Plateau included.
   - AFTER: across their range.

11. **Source:** s11 (collar, not throat patch) [copies: htmlx2, v1x1]
   - BEFORE: the pale mark at your own throat
   - AFTER: the pale collar across your chest

12. **Source:** s11 (collar, not throat patch) [copies: htmlx1, v1x1]
   - BEFORE: the soft mark at your own throat
   - AFTER: the soft collar across your own chest

13. **Source:** s11 (collar, not throat patch) (palette note) [copies: htmlx1, v1x1]
   - BEFORE: the exact shade of the pale patch at the throat
   - AFTER: the exact shade of the pale collar across the chest

14. **Source:** s11, s12 (coat is not blue-grey) (keeper stone) (JSON only)
   - BEFORE: close to the coat this bear is named for.
   - AFTER: close to the blue in this bear's old English name.

15. **Source:** s11 (collar, not throat patch) (keeper stone) (JSON only)
   - BEFORE: close to the collar patch at this bear's throat
   - AFTER: close to the pale collar across this bear's chest

## swift

1. **Source:** s8, s6 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">燕</span>
   - AFTER: <span class="rail__han" aria-hidden="true">雨燕</span>

2. **Source:** s8, s6 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="燕" aria-label="Hear 燕, yàn"
   - AFTER: data-say="雨燕" aria-label="Hear 雨燕, yǔyàn"

3. **Source:** s8, s6 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">yàn</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">yǔyàn</span>

4. **Source:** s8, s6 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">燕</span>
   - AFTER: <span class="serial-han">雨燕</span>

5. **Source:** s8, s6 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">燕</span><span class="py" lang="zh-Latn-pinyin">yàn</span>
   - AFTER: <span class="h" lang="zh">雨燕</span><span class="py" lang="zh-Latn-pinyin">yǔyàn</span>

6. **Source:** s8, s6 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "燕"
   - AFTER: "animalHan": "雨燕"

7. **Source:** s8, s6 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "yàn"
   - AFTER: "animalHanPy": "yǔyàn"

8. **Source:** s12, s14 [copies: htmlx1, v1x1]
   - BEFORE: Common Swifts are <b>unique among most birds in their ability to stay aloft for extended periods</b>; it is not uncommon for an individual to spend an entire day on the wing, touching down only to feed young or to roost at night.
   - AFTER: Outside the breeding season, Common Swifts <b>stay in the air for about ten months</b>: a 2016 study in <i>Current Biology</i> (Hedenström et al.) found they spent more than 99.5 percent of that time aloft, and some never landed at all. In summer they come down to the nest to feed young and to roost.

9. **Source:** s13 (stopovers recorded) (hero cost line and intro) [copies: htmlx1, v1x1]
   - BEFORE: cross a continent without resting
   - AFTER: cross a continent without landing

10. **Source:** s6, s14 (absolute softened) [copies: htmlx1, v1x1]
   - BEFORE: returns, without fail, to one crevice
   - AFTER: returns, year after year, to one crevice

11. **Source:** s6, s14 (absolute softened) (meta, og, JSON-LD descriptions) [copies: htmlx4, v1x1]
   - BEFORE: returns, without fail, to one ledge
   - AFTER: returns, year after year, to one ledge

12. **Source:** s6 (gland clause unverifiable for this species) [copies: htmlx1, v1x1]
   - BEFORE: Using saliva from <b>enlarged breeding-season salivary glands</b> as glue
   - AFTER: Using <b>their own saliva</b> as glue

13. **Source:** s14, s6 [copies: htmlx1, v1x1]
   - BEFORE: typically returning to the same crevice and partner year after year
   - AFTER: typically returning to the same crevice, and often the same partner, year after year

## superb-lyrebird

1. **Source:** s15 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">琴</span>
   - AFTER: <span class="rail__han" aria-hidden="true">琴鳥</span>

2. **Source:** s15 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="琴" aria-label="Hear 琴, qín"
   - AFTER: data-say="琴鳥" aria-label="Hear 琴鳥, qínniǎo"

3. **Source:** s15 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">qín</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">qínniǎo</span>

4. **Source:** s15 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">琴</span>
   - AFTER: <span class="serial-han">琴鳥</span>

5. **Source:** s15 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">琴</span><span class="py" lang="zh-Latn-pinyin">qín</span>
   - AFTER: <span class="h" lang="zh">琴鳥</span><span class="py" lang="zh-Latn-pinyin">qínniǎo</span>

6. **Source:** s15 (traditional form to match the site) (template animalHan) (JSON only)
   - BEFORE: "animalHan": "琴"
   - AFTER: "animalHan": "琴鳥"

7. **Source:** s15 (traditional form to match the site) (template animalHanPy) (JSON only)
   - BEFORE: "animalHanPy": "qín"
   - AFTER: "animalHanPy": "qínniǎo"

8. **Source:** s10 (intro frame) [copies: htmlx1, v1x1]
   - BEFORE: imitate the calls of dozens of other species with enough precision
   - AFTER: imitate the calls of more than twenty other species with enough precision

9. **Source:** s12, s10 [copies: htmlx1, v1x1]
   - BEFORE: mimicry, incorporating <b>accurate imitations of the calls of dozens of other bird species</b> into a single
   - AFTER: mimicry: <b>about 80 percent of it is borrowed from other birds</b>, woven into a single

10. **Source:** s13, s10 [copies: htmlx1, v1x1]
   - BEFORE: raking them free of litter and returning to the same handful of mounds within a territory for years.
   - AFTER: raking them free of litter. One territory can hold 10 to 15 mounds, and the male visits them in turn.

11. **Source:** s13 (rootedness axis read) [copies: htmlx1, v1x1]
   - BEFORE: the same handful of mounds, kept in order and returned to for years rather than
   - AFTER: the same scatter of mounds, kept in order and visited in turn rather than

12. **Source:** s13 (habitat lede) [copies: htmlx1, v1x1]
   - BEFORE: a scatter of raked, cleared mounds, returned to and kept in order for years,
   - AFTER: a scatter of raked, cleared mounds, visited in turn and kept in order,

13. **Source:** s10, s12, s13 (duration unverifiable) [copies: htmlx1, v1x1]
   - BEFORE: while singing, holding the display for long, uninterrupted stretches.
   - AFTER: while singing.

14. **Source:** s13 [copies: htmlx1, v1x1]
   - BEFORE: staying low in dense fern and litter and quick to fall silent or withdraw if it senses it is being watched.
   - AFTER: staying low in dense fern and litter. It is shy, and quick to run for the undergrowth when threatened.

15. **Source:** s13 (visibility axis read) [copies: htmlx1, v1x1]
   - BEFORE: staying low in fern and litter and falling silent at the first sign of being watched.
   - AFTER: staying low in fern and litter and running for the undergrowth at the first sign of a threat.

## sun-bear

1. **Source:** s16 (traditional form to match the site) (header glyph; rail__han) (HTML only)
   - BEFORE: <span class="rail__han" aria-hidden="true">熊</span>
   - AFTER: <span class="rail__han" aria-hidden="true">馬來熊</span>

2. **Source:** s16 (traditional form to match the site) (header glyph; rail and keepsake pronounce buttons: data-say, aria-label) (HTML only) [copies: htmlx2]
   - BEFORE: data-say="熊" aria-label="Hear 熊, xióng"
   - AFTER: data-say="馬來熊" aria-label="Hear 馬來熊, mǎláixióng"

3. **Source:** s16 (traditional form to match the site) (header glyph; rail__py pinyin) (HTML only)
   - BEFORE: <span class="rail__py" lang="zh-Latn-pinyin">xióng</span>
   - AFTER: <span class="rail__py" lang="zh-Latn-pinyin">mǎláixióng</span>

4. **Source:** s16 (traditional form to match the site) (header glyph; serial-han) (HTML only)
   - BEFORE: <span class="serial-han">熊</span>
   - AFTER: <span class="serial-han">馬來熊</span>

5. **Source:** s16 (traditional form to match the site) (header glyph; keepsake-han .h and .py) (HTML only)
   - BEFORE: <span class="h" lang="zh">熊</span><span class="py" lang="zh-Latn-pinyin">xióng</span>
   - AFTER: <span class="h" lang="zh">馬來熊</span><span class="py" lang="zh-Latn-pinyin">mǎláixióng</span>

6. **Source:** s16 (traditional form to match the site) (template animalHan) (JSON only) [copies: v1x1, v2x1]
   - BEFORE: "animalHan": "熊"
   - AFTER: "animalHan": "馬來熊"

7. **Source:** s16 (traditional form to match the site) (template animalHanPy) (JSON only) [copies: v1x1, v2x1]
   - BEFORE: "animalHanPy": "xióng"
   - AFTER: "animalHanPy": "mǎláixióng"

8. **Source:** s6, s9 (tiger accounts unverifiable) [copies: htmlx1, v1x1, v2x1]
   - BEFORE: even while pinned</b>, an unusual defense noted in several accounts of encounters with tigers.
   - AFTER: even while pinned</b>.

9. **Source:** s9, s12, s6 [copies: htmlx1, v1x1, v2x1]
   - BEFORE: with adult males around a quarter larger than females
   - AFTER: with adult males 10 to 20 percent larger than females

10. **Source:** s9, s12, s15 [copies: htmlx1, v1x1, v2x1]
   - BEFORE: the Sun Bear <b>bends and breaks branches into rough platform nests two to seven metres up</b>, where it feeds, sunbathes, and rests, largely alone.
   - AFTER: the Sun Bear <b>sleeps and sunbathes in trees, often two to seven metres up</b>, and has been filmed, on rare occasions, building a branch nest high in the canopy.

11. **Source:** s6, s9, s15 (rootedness axis read) [copies: htmlx1, v1x1, v2x1]
   - BEFORE: it builds a new bent-branch nest wherever the current reach is, following
   - AFTER: it sleeps wherever the current reach is, up in a tree or in a hollow log, following

12. **Source:** s9, s15 (motion axis read) [copies: htmlx1, v1x1, v2x1]
   - BEFORE: curled in a bent-branch nest built high in the trees
   - AFTER: curled high in the trees

13. **Source:** s9, s12, s15 (habitat lede) [copies: htmlx1, v1x1, v2x1]
   - BEFORE: then climbs to rest in a bent-branch nest built high in the canopy where
   - AFTER: then climbs to rest high in the trees where

14. **Source:** s9, s15 (dossier stat) [copies: htmlx1, v1x1, v2x1]
   - BEFORE: A high, private nest, rebuilt wherever needed
   - AFTER: A high, private perch, found wherever needed

## Not applied

- tuatara: the page and template carry no Māori material at all (no origin story, no Whiro or guardianship lines), so there was nothing to attribute or trim, and none was added. The "gone by around 60 million years ago" line was left (audit OK; the St Bathans Miocene caveat is an addition, not a correction). Body temperature line (45°F, 7°C) left (audit OK). Trait 4 title "The eye you closed on purpose" and the Reflection room card are readings; left. The Snake-years line is renderer output, so that fix is HTML only.
- tibetan-blue-bear: palette name "Scree blue-grey" is a paint colour, not a coat claim; left. Trait 1 title ("The subspecies without a seat at the table") and its reading still work with the corrected fact; left. The rest of the page already speaks of a "collar"; only the throat lines changed. Header pinyin written joined as zàngmǎxióng per the brief (dossier spells it zàng mǎxióng).
- swift: other "continent" lines (Adaptability read, Fire lead, love line "carries you across a continent") make no no-rest claim; left. The hero "ten months" line was already right (s12). Proverb 老馬識途 left without an origin note (dossier: none sourced).
- superb-lyrebird: page carries no D'harawal, Yuin or flute-legend material; nothing to attribute. Trait titles left.
- sun-bear: Keeper Stones crystal meanings are unsourced (page_bugs) but are reading copy, not a WRONG fact; left. Trait 6 title "The high nest" and its "canopy nest" reading left, since canopy nests are real if rarely seen (s15). Hero frame "reaches deeper into hidden places than any other bear" left (rests on the Guinness tongue record, s14). The Love Pairing chapter note in page_bugs is a rendering question, not a fact; not checked.
- Purple Star: all five dossiers rate the Purple Star content OK, and no page carries a "Purple Star tends to place" or 命宮 pairing line, so nothing needed rewording as our own reading.
- Related Animals explore-card labels: not touched.

## Structure check

Section counts match backups (tuatara 31/31, tibetan-blue-bear 31/31, swift 31/31, superb-lyrebird 31/31, sun-bear 33/33). All JSON-LD and application/json blocks parse (4 per page). HTML start-tag skeleton identical to backup on four pages; swift differs by exactly one added `<i>` (the journal name *Current Biology*). Every edited page parses with python html.parser. Template JSON (v1 for all five, v2 for sun-bear) loads and keysets are unchanged. `<!--w4-reading-->` is not present on any of the five pages. No CSS, JS or other page touched. No git run. No old single header glyph remains in any header slot; the swift page has no lone 燕 left. New copy checked for em and en dashes, arrows and the banned word list: none.

## Final header characters

| Page | Header hanzi | Pinyin |
|---|---|---|
| tuatara | 喙頭蜥 | huìtóuxī |
| tibetan-blue-bear | 藏馬熊 | zàngmǎxióng |
| swift | 雨燕 | yǔyàn |
| superb-lyrebird | 琴鳥 | qínniǎo |
| sun-bear | 馬來熊 | mǎláixióng |
