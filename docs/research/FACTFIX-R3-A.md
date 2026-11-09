# FACTFIX-R3-A change log

Date: 2026-11-08. Pages: giant-otter, superb-bird-of-paradise, sunset-moth, shoebill, regal-jumping-spider.
Source of truth: `data/research/<slug>.json` fact_audit (plus `<slug>.md`). Source ids refer to each dossier's `sources` list.
Each change was applied to `site/animals/<slug>/index.html` and to the template data files that hold the same string. The bracket after the source says where: HTML, v1 (`zodi-animal-template-v1/data/animals/<slug>.json`), v2 (`zodi-animal-template-v2/data/animals/<slug>.json`). Shoebill has v1 only. The sunset-moth and regal-jumping-spider v2 files are TODO scaffolds that hold none of these strings, so they are unchanged.
Backups of the original pages: `~/factfix-backup-r3/<slug>.html`; original template JSON in `~/factfix-backup-r3/tpl/v1/` and `~/factfix-backup-r3/tpl/v2/` (all outside the repo).
Glyphs use traditional forms to match the site (R2 precedent: 錦雞, 小熊貓, 燕鷗).
Purple Star: the kicker and fine print on giant-otter and superb-bird-of-paradise were already relabeled in HTML by `tools/wave3c-structured-data.py` (KICK_NEW / FINE_NEW). The v2 data kicker still had the old text and now uses KICK_NEW. Star copy that claimed the crossing "lands on" or "tends to" get a star was reworded as Zodi Animal's own reading. Pages with no star block got the R2 wording for the renderer lines. Star labels now match the site hub (七殺 Qīshā = The Warrior, 武曲 Wǔqū = The Finance General).

## giant-otter

1. **Source:** s6, s11, s14 [HTML + v1 + v2]
   - BEFORE: <b>riverbank campsites and communal latrines</b>, some over 25 meters long, scent-marking them
   - AFTER: <b>riverbank campsites with communal latrines</b>, usually a few meters long and in rare reports up to 28 meters, scent-marking them
2. **Source:** s8 [HTML + v1 + v2]
   - BEFORE: head lifted above the surface</b>, both to look for danger over the reeds and to show its throat marking to other otters nearby.
   - AFTER: head lifted above the surface</b>, to look for danger over the reeds, and in that pose its pale throat patch is in plain view.
3. **Source:** s12, s13, s14 [HTML + v1 + v2]
   - BEFORE: but a family will <b>collectively attack and can kill a caiman several times the size of one otter</b> if it threatens a pup, working the animal in coordinated turns.
   - AFTER: but a family will <b>gang up on a caiman far bigger than any one otter and drive it off</b> if it threatens a pup, coming at it from more than one side.
4. **Source:** s8 (soften) [HTML + v1 + v2]
   - BEFORE: and studies have found each family's chorus carries an acoustic signature distinct enough to identify the group.
   - AFTER: and researchers could tell family groups apart by the sound of their chorus.
5. **Source:** s20 (Purple Star) [HTML + v2]
   - BEFORE: and read for the Aries Dog crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Aries Dog crossing through two of them.
6. **Source:** s20 (Purple Star) [HTML + v2]
   - BEFORE: and for the Aries Dog it tends to sit heavy over the chart: Tianliang
   - AFTER: and in our reading of the Aries Dog it sits heavy: Tianliang
7. **Source:** s20 (Purple Star; hub names Qisha The Warrior) [HTML + v2]
   - BEFORE: The second star Purple Star tends to hand this crossing is Qisha, the General,
   - AFTER: The second star we pair with this crossing is Qisha, the Warrior,
8. **Source:** s20 (star label; hub names Qisha The Warrior) [HTML + v2]
   - BEFORE (HTML): <span class="en">the General star</span>
   - AFTER (HTML): <span class="en">the Warrior star</span>
   - Same change in v2 (JSON form).
9. **Source:** s20 (Purple Star) [HTML + v2]
   - BEFORE: and the exact hour you were born decides which one leads first when the alarm actually sounds.
   - AFTER: and only your real chart, cast from your lunar birth date and hour, shows which stars lead when the alarm actually sounds.
10. **Source:** s20 (kicker, v2 data; HTML already relabeled by wave3c) [v2]
   - BEFORE: What Purple Star already suspects about you
   - AFTER: Our Purple Star reading for this crossing
11. **Source:** s20 (renderer string) [HTML]
   - BEFORE: The reading here is the outline your Aries Dog shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## superb-bird-of-paradise

1. **Source:** s17 (header glyph; rail__han, serial-han, template animalHan) [HTML + v1 + v2]
   - BEFORE (HTML): <span class="rail__han" aria-hidden="true">鳥</span>
   - AFTER (HTML): <span class="rail__han" aria-hidden="true">風鳥</span>
   - BEFORE (HTML): <span class="serial-han">鳥</span>
   - AFTER (HTML): <span class="serial-han">風鳥</span>
   - Same change in v1, v2 (JSON form).
2. **Source:** s8, s9 [HTML + v1 + v2]
   - BEFORE: reabsorb it rather than reflect it, absorbing as much as <b>99.95 percent</b> of light that strikes them,
   - AFTER: reabsorb it rather than reflect it, so they reflect as little as <b>0.05 percent</b> of the light hitting them head-on,
3. **Source:** s10, s11 [HTML + v1 + v2]
   - BEFORE: During peak display the male performs a <b>rapid, precise side-to-side hopping sequence</b> directly in front of the female while
   - AFTER: During peak display the male <b>bounces around the female in quick, shuffling hops</b> while
4. **Source:** s10, s12 [HTML + v1 + v2]
   - BEFORE: Males are solitary outside of breeding encounters, and each one maintains one or more <b>small display courts</b>, patches of forest floor actively cleared of leaf litter and debris and defended from rivals, returning to the same site across breeding seasons.
   - AFTER: Males court alone, and each one dances on <b>a fallen log in the understory</b>, tossing the leaves off it before he displays.
5. **Source:** s10, s12 [HTML + v1 + v2]
   - BEFORE: yet it returns to the same cleared display court year after year.
   - AFTER: yet its dance always happens on a log it has swept clear first.
6. **Source:** s10, s12 [HTML + v1 + v2]
   - BEFORE: Each male keeps one small patch of forest floor cleared and defended as his display court, returning to the exact same site across breeding seasons rather than starting fresh elsewhere.
   - AFTER: Each male sweeps the leaves off a fallen log and makes it his stage, one spot readied with care before anyone arrives.
7. **Source:** s10, s12 [HTML + v1 + v2]
   - BEFORE: and maintains one small, deliberately cleared patch of forest floor as its display court, returning to the same site across seasons.
   - AFTER: and dances on a fallen log it has swept clear of leaves.
8. **Source:** s10, s12 [HTML + v1 + v2]
   - BEFORE (HTML): was only formally split from its close relative, the Vogelkop lophorina, in a <b>2017 to 2018 taxonomic revision</b>, based specifically on measurable differences in the fanned display's shape, one reads as a "smiling" oval, the other a "frowning" crescent, and in its motor pattern, rather than on plumage or song alone.
   - AFTER (HTML): was split from its close relative, the Vogelkop lophorina, in a <b>2017 study of DNA and museum specimens</b> that divided the group into three species. A 2018 field study of courtship then confirmed it: one fanned display reads as a "smiling" oval, the other a "frowning" crescent, and their songs differ too.
   - Same change in v1, v2 (JSON form; v1 BEFORE used an en dash "2017–2018").
9. **Source:** s18 (Purple Star) [HTML + v2]
   - BEFORE: and read for the Taurus Rooster crossing it keeps landing on the same two.
   - AFTER: and Zodi Animal reads the Taurus Rooster crossing through two of them.
10. **Source:** s18 (star label; hub names Wuqu The Finance General) [HTML + v2]
   - BEFORE (HTML): <span class="en">the General star</span>
   - AFTER (HTML): <span class="en">the Finance General star</span>
   - Same change in v2 (JSON form).
11. **Source:** s18 (Purple Star) [HTML + v2]
   - BEFORE: For a Taurus born in the Rooster year, this tends to sit close to the Life palace, 命宮, and the trait is
   - AFTER: In our reading of the Taurus Rooster it sits close to the Life palace, 命宮 mìnggōng, and the trait is
12. **Source:** s18 (Purple Star) [HTML + v2]
   - BEFORE: Near the Life palace, Purple Star often places the Storehouse star inside a chart built around
   - AFTER: Beside it, our reading sets the Storehouse star, in a chart built around
13. **Source:** s18 (Purple Star) [HTML + v2]
   - BEFORE: your exact birth hour is what moves these two stars into your own twelve palaces and shows which one runs loudest,
   - AFTER: only your real chart, cast from your lunar birth date and hour, shows where these two stars fall in your twelve palaces and which one runs loudest,
14. **Source:** s18 (kicker, v2 data; HTML already relabeled by wave3c) [v2]
   - BEFORE: What Purple Star already suspects about you
   - AFTER: Our Purple Star reading for this crossing
15. **Source:** s18 (renderer string) [HTML]
   - BEFORE: The reading here is the outline your Taurus Rooster shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## sunset-moth

1. **Source:** s6 (soften) [HTML + v1]
   - BEFORE: which is the main reason it keeps being mistaken
   - AFTER: which is one reason it keeps being mistaken
2. **Source:** s5, s14, dossier best_matches (Rabbit clashes with Rooster) [HTML + v1]
   - NOTE: "Animals your instincts trust on sight" cluster only. Sea Otter (Cancer x Rabbit) swapped too: same Rabbit clash.
   - BEFORE (HTML): <a class="explore-card" href="/animals/golden-pheasant/"><span class="nm">Golden Pheasant</span><span class="sub">Leo · Year of the Rabbit</span></a> <a class="explore-card" href="/animals/sea-otter/"><span class="nm">Sea Otter</span><span class="sub">Cancer · Year of the Rabbit</span></a>
   - AFTER (HTML): <a class="explore-card" href="/animals/frigatebird/"><span class="nm">Frigatebird</span><span class="sub">Sagittarius · Year of the Dragon</span></a> <a class="explore-card" href="/animals/loggerhead-shrike/"><span class="nm">Loggerhead Shrike</span><span class="sub">Aries · Year of the Snake</span></a>
   - Same change in v1 (JSON form).
3. **Source:** s14 (renderer string) [HTML]
   - BEFORE: is one of the most detailed of the Chinese chart systems, and it maps the Sunset Moth you are becoming, not only the one you are.
   - AFTER: is one of the most detailed of the Chinese chart systems. It is a separate chart, cast from your lunar birth date and hour, not from your sign or your animal.
4. **Source:** s14 (renderer string) [HTML]
   - BEFORE: The reading here is the outline your Leo Rooster shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## shoebill

1. **Source:** s11 (header glyph; rail__han, serial-han, template animalHan) [HTML + v1]
   - BEFORE (HTML): <span class="rail__han" aria-hidden="true">鹳</span>
   - AFTER (HTML): <span class="rail__han" aria-hidden="true">鯨頭鸛</span>
   - BEFORE (HTML): <span class="serial-han">鹳</span>
   - AFTER (HTML): <span class="serial-han">鯨頭鸛</span>
   - Same change in v1 (JSON form).
2. **Source:** s8, s7 (overstated) [HTML + v1]
   - BEFORE: report the bird shows no threat display and does not retreat; instead, <b>it simply stares back</b>, unmoving, for as long as the approach continues.
   - AFTER: report the bird shows no threat display; instead, <b>it simply stares back</b>.
3. **Source:** s8, s7 (unsourced cause) [HTML + v1]
   - BEFORE: most often due to sibling competition, predation, or food scarcity.
   - AFTER: most often due to predation or food scarcity.
4. **Source:** s13 (renderer string) [HTML]
   - BEFORE: is one of the most detailed of the Chinese chart systems, and it maps the Shoebill you are becoming, not only the one you are.
   - AFTER: is one of the most detailed of the Chinese chart systems. It is a separate chart, cast from your lunar birth date and hour, not from your sign or your animal.
5. **Source:** s13 (renderer string) [HTML]
   - BEFORE: The reading here is the outline your Capricorn Ox shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## regal-jumping-spider

1. **Source:** s5 [HTML + v1]
   - BEFORE: The spider's principal eyes hold a four-layered retina;
   - AFTER: In a related species, Adanson's jumping spider (Hasarius adansoni), the principal eyes hold a four-layered retina;
2. **Source:** s18 [HTML + v1]
   - BEFORE: three chestnuts at dawn and four at dusk
   - AFTER: three acorns at dawn and four at dusk
3. **Source:** s1 (soften) [HTML + v1]
   - BEFORE: Before every leap, the spider anchors
   - AFTER: Before a leap, the spider anchors
4. **Source:** s1 (soften) [HTML + v1]
   - BEFORE: <b>serrated claws built to grip that silk safety line in mid-air</b>
   - AFTER: <b>claws that can cling to that silk safety line in mid-air</b>
5. **Source:** s3 (minor fix) [HTML + v1]
   - BEFORE: High-speed filming of a regal jumping spider across fifteen jump distances found it
   - AFTER: High-speed filming of a regal jumping spider over fifteen jumping tasks, across gaps of different lengths and heights, found it
6. **Source:** s2 [HTML + v1]
   - BEFORE: among the largest jumping spiders on the continent,
   - AFTER: among the largest jumping spiders in eastern North America,
7. **Source:** s1 (unverifiable part) [HTML + v1]
   - BEFORE: the female <b>stays still and lets him close the distance, or attacks him</b>, and the outcome
   - AFTER: the female <b>holds still while he closes the distance</b>, and the outcome
8. **Source:** s19 (renderer string) [HTML]
   - BEFORE: is one of the most detailed of the Chinese chart systems, and it maps the Regal Jumping Spider you are becoming, not only the one you are.
   - AFTER: is one of the most detailed of the Chinese chart systems. It is a separate chart, cast from your lunar birth date and hour, not from your sign or your animal.
9. **Source:** s19 (renderer string) [HTML]
   - BEFORE: The reading here is the outline your Leo Monkey shares. Your own chart shows which palace runs loudest.
   - AFTER: Your Purple Star chart is separate from this reading. It shows which palace runs loudest for you.

## Not applied

- giant-otter header glyph 獭 tǎ: audit verdict OK. Unchanged (same as sea-otter in R2).
- regal-jumping-spider header glyph 蛛 zhū: audit verdict OK (generic). The dossier suggests 蠅虎 yínghǔ ("fly tiger") as a stronger choice. Not a correction, so left for an owner call.
- superb-bird-of-paradise trait title "The species named by its dance": the fact under it now says DNA split the species and courtship confirmed it. The title was kept (a heading, not a claim), but the owner may want a new one.
- superb-bird-of-paradise body text still calls 武曲 "the General star" in two sentences; only the label was aligned with the hub.
- sunset-moth "A color with no pigment": the audit suggests saying "the iridescent parts" because the black is pigment. The fact already speaks only of the wing's shifting colour, so no change.
- shoebill Match II Emperor Penguin (Cancer x Rooster): valid by the Chinese rule, audit OK. Unchanged.
- regal-jumping-spider page_bugs (Match II "Your Metal feeds their Water: you are the warmth in it"; Match III "Fire nature" as a plus): reading logic, not fact_audit items. Not changed.
- Renderer strings: the fine-print line under the star block is generated by the renderer, not by the v2 data, so the old "generalized reading" fine text will come back if v2 is re-rendered. The 'maps the <Animal> you are becoming' and 'The reading here is the outline your <Sign Animal> shares' lines are also renderer strings on all 144 pages. Fixed in HTML only on these five; the template strings still need the same fix.
- v2 animalHan "TODO" on sunset-moth and regal-jumping-spider: scaffold placeholders, not page facts. Not filled.

## Structure check

All five pages parse with python html.parser. Every JSON-LD and application/json block parses (4 per page). Section counts and the full HTML tag sequence match the backups. All edited template JSON loads and keysets are unchanged. No `<!--w4-reading-->` block on any of these pages. No CSS or JS touched. Git not run.
