# Zodi Animal research brief (pilot, 2026-11-08)

You are researching ONE Zodi Animal. Nothing you write is published directly. Your dossier
feeds a slow, human-edited rewrite of that animal's page, 12 pages at a time.

## What the owner wants (read this twice)
Owner, 2026-11-08: less about what the animal is biologically, more about the spiritual side:
how the animal relates to the Western sign and the Chinese zodiac, its temperament,
compatibility, career, love. "Make it kind of like a fortune teller." The reader should feel
"this is me" and want to keep reading. Biology is only the bridge: one or two real behaviors
that anchor a trait, never a zoology lecture.

## The system (facts you can rely on)
- Each of 144 crossings (Western sun sign x Chinese year animal) maps to one real animal.
  The mapping is `site/js/modules/zodi-map.js` (GRID). Do not change it.
- Element: from the fixed element of the Chinese year animal (Rat/Pig Water, Tiger/Rabbit
  Wood, Snake/Horse Fire, Monkey/Rooster Metal, Ox/Dragon/Goat/Dog Earth). The Western sign
  adds its own element (Fire, Earth, Air, Water) and modality (cardinal, fixed, mutable).
- Chinese compatibility is traditional: the four trines (Rat Dragon Monkey; Ox Snake Rooster;
  Tiger Horse Dog; Rabbit Goat Pig), the six secret friends (Rat Ox, Tiger Pig, Rabbit Dog,
  Dragon Rooster, Snake Monkey, Horse Goat), the six clashes (Rat Horse, Ox Goat, Tiger
  Monkey, Rabbit Rooster, Dragon Dog, Snake Pig).
- Western compatibility: same element and complementary element pairs (Fire with Air, Earth
  with Water) and the classic oppositions.

## Research to do
1. Read the live page: `site/animals/<slug>/index.html` (what the page already says).
2. Western sign: traditional temperament, ruling planet, element, modality. Cite a source.
3. Chinese year animal: traditional temperament, yin/yang, fixed element, trine, secret
   friend, clash, traditional lucky colors and numbers if a source gives them. Cite.
4. The animal as a SYMBOL: folklore, myth, spirit-animal or totem meanings, proverbs, across
   cultures (Indigenous, Chinese, Celtic, African, etc. as they exist). 3 to 6 items, each with
   a source. Mark anything you cannot source as "unsourced, do not use".
5. The fusion: how the sign and the year animal combine in this animal. Temperament, gifts,
   shadow, love style, best matches, career fits, how it handles money and conflict.
6. Best matches: name 3 to 5 Zodi Animals (from GRID) that suit this one, each with the
   traditional reason (trine, secret friend, element harmony). Name 1 or 2 hard pairings
   (clash) and why. Use real GRID names and slugs.
7. Fact audit: for every "Animal fact" on the current page, check it against its cited source
   or a reliable one. Mark each OK, WRONG (with correction and source) or UNVERIFIABLE.

## Hard rules
- Do NOT copy primalastrology.com or any other zodiac site's wording or animal pairings. You
  may note that a tradition exists; you write the reading yourself.
- Every factual or traditional claim gets a source URL. Interpretation is labeled as ours.
- Candidate lines: second person, specific, a little uncanny, warm. No absolutes like "you
  always", "destiny guarantees". Do NOT open with "You tend to", "You often" or "There are times
  when" (round 1 overused them). Keep each line inside the animal's own world (its habitat and
  sourced behaviors), never "a room". Every line must contain something only this crossing has.
  Banned shapes: "you know first, everyone else catches up", "people mistake your quiet for",
  "nobody noticed", trivia as the hook ("your name comes from"), coaching tails, forced threes.
- Writing rules: no em dashes, no arrows, no "it's not X, it's Y" or "not just X but Y", no
  forced lists of three, plain words. Banned: seamless, unlock, elevate, journey, empower,
  embark, delve, tapestry, testament, realm, comprehensive, leverage, transform, discover.
- Chinese characters: if you include any, add pinyin with tone marks next to them.

## Lessons from the pilot (apply these)
- Lucky numbers and colors: sources disagreed for almost every year animal. Do not research
  or include them. Put "lucky": null.
- Check the Chinese header character on the live page (the hanzi in the hero or rail). Say
  whether it actually means this animal (the Arctic Tern page used 鷗, which means gull). Give
  the correct character with pinyin if it is wrong. Add it as a fact_audit entry.
- Check any Purple Star (Zi Wei Dou Shu) star claim on the page: charts come from the lunar
  birth date and hour, not the Western sign, so flag pairings with no traditional basis.
- Watch for facts borrowed from a similar species (raven facts that were really scrub jay or
  crow studies; slow loris facts that were really tarsier). Check the study's species.
- The January/February lunar New Year note only applies to Capricorn, Aquarius, Pisces.

## Access
- Project root on Jay's Mac via the `mcp__remote-devices__device_bash` tool (load it with
  ToolSearch "select:mcp__remote-devices__device_bash"): `$HOME/mnt/Projects--Primal Animal`.
- READ ONLY everywhere except `data/research/`. Never edit `site/`. Never run git.
- Web: WebSearch and WebFetch for sources.

## Deliverables (write both into `$HOME/mnt/Projects--Primal Animal/data/research/`)
1. `<slug>.json` with keys: slug, name, sign, year, element, sources (list of {id, title, url}),
   western {temperament, planet, element, modality, source_ids}, chinese {temperament,
   yinyang, element, trine, secret_friend, clash, lucky, source_ids}, symbolism (list of
   {culture, meaning, source_ids}), fusion {temperament, gifts, shadow, love, money, conflict},
   careers (list of {path, why}), best_matches (list of {name, slug, reason}),
   hard_matches (list of {name, slug, reason}), candidate_lines (6 strings),
   fact_audit (list of {fact, verdict, note, source_ids}).
   Write JSON with python json.dump so it is valid.
2. `<slug>.md`: the same content as a readable one-page dossier for the owner.

Return to the caller in 200 words or fewer: the 3 strongest new findings, any WRONG facts on
the live page, and anything you could not source.
