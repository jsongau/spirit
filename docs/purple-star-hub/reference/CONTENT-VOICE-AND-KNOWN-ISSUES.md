# Reference — content, voice, colorblind grammar, and known issues

The rules every string and every state on the hub follows, and the honest list of what is not finished. If you are writing copy or reviewing a page, this is the checklist.

## The term ladder (never merged)

Every Chinese concept appears with its layers kept in separate fields and separate visual slots:

traditional characters → tone-marked pinyin → per-character ruby pinyin → literal translation → standard English term → **Zodi Animal editorial title (always labeled editorial, never in the translation slot)** → plain-English meaning → practitioner meaning.

An editorial title such as "The Command Palace" or "The Hook" may never sit where a reader expects the literal translation. Characters always carry ruby pinyin above them (via `rubyHtml`) and a pronounce button.

## Voice (the anti-AI, non-deterministic pass)

- Plain English, warm but precise. No hype words (secret, unlock, powerful, profound, cosmic destiny, guaranteed).
- **No em-dash used as a sentence separator.** Use commas, periods, or "and." Hyphens inside words are fine.
- **No deterministic claims** about health, death, wealth, marriage, or disaster. Rewrite any determinism as "classical readings associate," "tends to," "different schools teach." This matters most in the Spouse, Health, and Children readings, and for the Hook (化忌), which is framed as a recurring pressure point and place of growth, never a doom sentence.
- Historical claims stay qualified ("traditionally attributed," "documentation is limited"). No "kept secret for 1,000 years."
- Banned substrings, linted at build time: "kept secret", any bare year-count of secrecy, "guarantee", "guaranteed", "will happen", "destined to", "cannot escape", "already written", "ensures", and diagnosis or death/divorce/disaster predictions. (The two live exceptions are a myth-rejecting quiz distractor and the overclaim-detection regex, both of which name the banned idea in order to reject it.)

## Colorblind-safe state grammar

The owner is colorblind, so every state reads through shape, text, icon, pattern, or position in addition to color:

- 印 seal (cinnabar square) = active/selected, with `aria-pressed`.
- △ + the word "triangle" = a trine partner.
- ◇ + the word "mirror" = the opposite palace.
- ✓ + "Correct." and ✕ + "Not quite," for scoring.
- Line patterns solid / double / dashed / dotted for the four transformations (Lù / Quán / Kē / Jì).
- 門 + "door open, ages …" and ☀ + "this year" in the timing wheel.

Color rides on top of these, never instead of them.

## Links, pronunciation, and file:// discipline

No underlined text links and no border-bottom fakes (color plus weight only). No external-link arrow icons. One shared Mandarin voice everywhere through `ZiweiData.speak`, `zh-CN`, rate 0.78, no autoplay, preference remembered. PSA pages use relative asset paths (`../../css/…`) so the owner can review them from disk; new pages are self-contained where the baked nav would otherwise be required.

## Systems stay distinct

Zodi Animal, BaZi, the Feng Shui almanac, and Zi Wei Dou Shu support each other and are never blended into one fake unified system. The Zodi Animal is never implied to be calculated by ZWDS. The Three Clocks block on the hub is the canonical example: the almanac's day quality, BaZi luck pillars, and ZWDS decade and annual cycles are three separate calculations that are never mixed.

## Known issues and deferrals (honest list)

- **Real-browser render is unverified.** The build sandbox blocks the npm registry (no jsdom) and cannot open local `file://`, so every check is static, data-level, store-logic, or stress-test. Open the pages from disk to confirm paint and interaction.
- **Mei's bureau** is a documented teaching choice (Fire, where a strict cast gives Metal); a note says so. A full re-cast to Metal 4 with recomputed door ages is optional polish. See [`CASTING-ENGINE.md`](CASTING-ENGINE.md).
- **Model 7** (the Mei/Rui walkthrough) is built as data, not yet as UI. Rui's chart is shipped and validated.
- **Annotated study-chart highlighting** on the chart page is deferred; nothing there is blurred or locked today.
- **The baked mega-nav and footer** had their ZWDS terms converted in the shipped files; the durable fix belongs in `components/` source.
- **Karma copy** stays absent until the server `zwds_*` earn kinds exist.
- **Casting from a birthday** awaits the Gregorian-to-lunar source (S9); the engine casts from lunar inputs.

## Needs-source list (corpus is silent; not filled from memory, per D14)

Per-star per-branch brightness tables (S5), the Zi Wei placement and star-sequence tables (S1/S2, implemented as the standard algorithm and validated by reproduction), the Body Palace and Ming/Shen Zhu source tables (S3/S4), the decade-direction rule (S6), the borrowing rule 借星 as a corpus definition (S7), the lifecycle-phase assignment method (S8), Gregorian-to-lunar conversion (S9), auxiliary placement formulas (S10), and monthly cycles 流月 (S13, deliberately excluded). Anything with a needs-source flag renders on a public page only inside a "different schools teach / traditionally described" wrapper.
