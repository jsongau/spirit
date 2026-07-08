# Reference — the shared data files (`site/js/ziwei/`)

Thirteen plain-browser JavaScript files. All attach to `window.ZiweiData` (the progress store also attaches `window.ZiweiProgress`), use no modules, are idempotent, are file:// safe, and hold traditional characters only. They are generated from `PSA-TERMINOLOGY.md` and consumed by the hub, the models, and the child pages. Load order matters only where noted.

Every Chinese record follows the ladder: `hant` (traditional characters) → `pinyin` (tone-marked) → `rubyPinyin` (per-character array, same length as the characters) → `literal` → `standard` (English handle) → `editorial: { title, editorial: true }` (labeled, never a translation) → plain/practitioner text.

## The rendering helper

`ZiweiData.rubyHtml(hant, rubyPinyin)` returns `<ruby>` markup with per-character `<rt>` pinyin. Every Chinese string on every surface goes through it, so pinyin sits above the characters (never on a separate line). `rubyPinyin` arrays must match the character count one-to-one.

## `ziwei-palaces.js`
- `ZiweiData.palaces` — 12 palace records with `id`, `hant`, `pinyin`, `rubyPinyin`, `literal`, `standard`, `editorial`, `question` (core question), `domain`, `branchOrder` (0–11), `aliases`.
- `ZiweiData.palaceById` — id → record.
- `ZiweiData.resolvePalaceId(idOrAlias)` — normalizes aliases (e.g. `life` → `ming-gong`, `soul`/`wellbeing` → `fortune`, `network`/`friends`/`servants` → `nu-pu-gong`).

## `ziwei-relationships.js` (court geometry)
- `ZiweiData.relationships.court(id)` → `{ focal, trines: [a, b], opposite, members: [...] }`. Geometry only: trines are ±4, opposite is +6 on the branch wheel (ruling D3/C2). Life's court is 命財官遷.
- `.opposite(id)`, `.trine(id)`, `.mirrorPairs` (the six geometric pairs), `.order` (canonical branch order).

## `ziwei-principal-stars.js`
- `ZiweiData.principalStars` — 14 star records: `id`, `hant`, `pinyin`, `rubyPinyin`, `literal`, `standard`, `editorial`, `essence`, `element`, `dipper`, `series: { group, configuration, groupEditorial }`, `transforms` (which of lu/quan/ke/ji it can receive), optional `schoolNote`, and **`placements[palaceId] = { beginner, intermediate, practitioner, misread }`** for all 14×12.
- `ZiweiData.starById`, `ZiweiData.starGroups` (the two families + the two configurations).

## `ziwei-transformations.js` (the Four Transformations)
- `ZiweiData.transformations` — the four forces: `id` (lu/quan/ke/ji), `hant`, `pinyin`, `editorial`, `plain`, `practitioner`, `caution`, `linePattern` (solid/double/dashed/dotted, colorblind-safe), `thread`, `natalFrame`/`timingFrame`, `natalEffect`/`timingEffect` (templates with a `{star}` slot), `heTuElement`, `seasonMetaphor`.
- `ZiweiData.transformationById`, `ZiweiData.transformationsSet`.
- `ZiweiData.stemTable` — the 10 Heavenly Stems, each with `lu/quan/ke/ji` star ids (orthodox Northern table, doc 04), some with `schoolNote`.
- `ZiweiData.stemTableByStem`, `ZiweiData.stemTableAuxiliaries` (文昌 文曲 左輔 右弼 referenced by the table).

## `ziwei-sample-charts.js`
- `ZiweiData.sampleChartById.mei` and `.rui` — worked charts: `bureau`, `palaces[id] = { branch, branchPinyin, stars: [{id, brightness?}], borrowFrom? }`, `natalHua` (star id → force id), `source`.
- `ZiweiData.triangleLessons.mei` — the additive Read-the-Triangle fragments for Model 5.

## `ziwei-caster.js`
- `ZiweiData.caster.castChart(opts)` and the helper functions. See [`CASTING-ENGINE.md`](CASTING-ENGINE.md).

## `ziwei-practice.js`
- `ZiweiData.practice` — drills in the chart-page quiz shape `{ q, opts, c, why }`, each tagged `reading-order` / `transformations` / `synthesis`.
- `ZiweiData.practiceByTag(tag)`, `ZiweiData.sentences` (Model-4 seed answers).

## `ziwei-lessons.js`
- `ZiweiData.lessons` — 8 level objects: `id` (L1–L8), `num`, `name`, `rank`, `ability`, optional `coming`, `lessons: [{ id, title, href, hub?, level }]`. 67 lessons total.
- `ZiweiData.levelById`, `ZiweiData.lessonById`, `ZiweiData.levelOrder`, `ZiweiData.lessonCount`.

## `ziwei-progress.js`
- `window.ZiweiProgress` (also `ZiweiData.progress`) — the `zwdsSchool.v2` store. See [`PROGRESS-AND-RANKS.md`](PROGRESS-AND-RANKS.md).

## `ziwei-auxiliary-stars.js`
- `ZiweiData.auxiliaryStars` — 7 groups (assistants, nobles, scholars, four-sha, wealth-retainer, voids, movement-romance), each with `stars: [{ id, hant, pinyin, rubyPinyin, literal, standard, plain, productive, corrosive, group }]`.
- `ZiweiData.auxiliaryStarById`, `ZiweiData.auxiliaryPatterns` (格局 note). On load it also registers speak strings into the pronunciation map, so **load `ziwei-pronunciation.js` first** on any page that needs auxiliary pronounce buttons.

## `ziwei-teachbacks.js` (Level 8)
- `ZiweiData.teachbacks` — 5 prompts, each `{ id, prompt, beginner, practitioner, rubric[4], source }`.
- `ZiweiData.teachbackById`, `ZiweiData.phrasebook` (`maySay`, `mayNeverSay`, `throughLine`), `ZiweiData.consultation` (`label` = house method, `steps[5]`), `ZiweiData.imperialExam` (20 questions in the `{ q, opts, c, why }` shape).

## `ziwei-glossary.js`
- `ZiweiData.glossary` — core technical terms with the full ladder plus `plain`, optional `practitioner`, `sourceNote`.
- `ZiweiData.glossaryById`.

## `ziwei-pronunciation.js`
- `ZiweiData.pronunciation` — id → `{ text (traditional), pinyin, lang: "zh-CN" }`.
- `ZiweiData.speak(id)` — pronounces one term through the one shared Mandarin voice (the zaSpeak ranking: Tingting/Meijia > Google Mandarin > best zh, rate 0.78). Never autoplays; call only from a user gesture. Defers to `window.zaSpeak` when present.
