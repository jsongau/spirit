# ZWDS MASTER BUILD BLUEPRINT
## Zi Wei Dou Shu Hub — ZodiAnimal Implementation Guide

> **Read all 5 research docs (01–05) before building. This doc synthesizes them into page-by-page build instructions.**

---

## SYSTEM OVERVIEW

**What we're building:** The most comprehensive, Western-accessible Zi Wei Dou Shu educational hub on the English internet — more depth than our BaZi hub, with rich interactive UX layers that make the system learnable and shareable.

**Hub root URL:** `/elements/zi-wei/`

**Core premise for Western users:** ZWDS is the Emperor's Astrology — the system that Chinese imperial courts used for 1,000 years, kept secret from ordinary people. It maps your entire life as a 12-room cosmic palace, with 100+ stars stationed in each room at the moment of your birth. Every star is a character: advisors, warriors, diplomats, emperors. Every room governs a domain of your life. The system reveals not just *who you are* but *when* each part of your life activates.

**Coined vocabulary to use consistently across all pages:**

| Classical Term | Our Branded Term |
|----------------|-----------------|
| 命宫 Ming Gong | **The Command Palace** / **Destiny Seat** |
| 身宫 Shen Gong | **The Body Court** / **Action Seat** |
| 四化 Si Hua | **The Four Forces** / **The Four Transformations** |
| 化禄 Hua Lu | **The Flow** / **The Gift** |
| 化权 Hua Quan | **The Power** / **The Command** |
| 化科 Hua Ke | **The Shine** / **The Recognition** |
| 化忌 Hua Ji | **The Hook** / **The Lesson** |
| 三方四正 San Fang Si Zheng | **The Palace Triangle** / **The Life Court** |
| 大限 Da Xian | **The Decade Door** |
| 流年 Liu Nian | **The Year Wave** |
| 格局 Ge Ju | **The Pattern** |
| 杀破狼 Sha Po Lang | **The Vanguard Trio** |
| 机月同梁 Ji Yue Tong Liang | **The Four Pillars of Stability** |

---

## SITE ARCHITECTURE

```
/elements/zi-wei/                          ← Hub page (master gateway)
  ├── /history/                            ← Origin & philosophy deep-dive
  ├── /chart/                              ← How to read a ZWDS chart (interactive)
  ├── /palaces/                            ← The 12 Palaces hub
  │     ├── /ming-gong/                    ← Command Palace (Life)
  │     ├── /siblings/
  │     ├── /spouse/
  │     ├── /children/
  │     ├── /wealth/
  │     ├── /health/
  │     ├── /travel/
  │     ├── /network/
  │     ├── /career/
  │     ├── /property/
  │     ├── /soul/                         ← Fortune/Virtue palace
  │     └── /parents/
  ├── /stars/                              ← The 14 Major Stars hub
  │     ├── /zi-wei/                       ← Emperor Star
  │     ├── /tian-ji/                      ← Strategist Star
  │     ├── /tai-yang/                     ← Sun Star
  │     ├── /wu-qu/                        ← Finance General
  │     ├── /tian-tong/                    ← Harmony Star
  │     ├── /lian-zhen/                    ← Diplomat Star
  │     ├── /tian-fu/                      ← Treasury Star
  │     ├── /tai-yin/                      ← Moon Star
  │     ├── /tan-lang/                     ← Desire Star
  │     ├── /ju-men/                       ← Dark Gate
  │     ├── /tian-xiang/                   ← Prime Minister
  │     ├── /tian-liang/                   ← Elder Star
  │     ├── /qi-sha/                       ← Warrior Star
  │     └── /po-jun/                       ← Vanguard Star
  ├── /four-forces/                        ← Si Hua deep-dive (most interactive)
  ├── /timing/                             ← Da Xian + Liu Nian system
  ├── /patterns/                           ← 格局 pattern library
  └── /auxiliary-stars/                    ← 辅星 reference
```

**Total pages: ~30**. Build in waves (see Wave Plan below).

---

## DESIGN LANGUAGE

**All pages must use the ZodiAnimal design system. Never deviate.**

**Color token:** `--cc` (section accent) should be set per-section. For ZWDS:
- **Primary accent:** `oklch(0.70 0.20 310)` — deep imperial purple (Zi Wei's purple)
- **Secondary accent:** `oklch(0.72 0.22 45)` — gold/brass (imperial court gold)
- **Tertiary:** `oklch(0.58 0.18 265)` — midnight indigo (Northern Dipper energy)

**Section color assignments:**
- Hub page / History: Purple (`oklch(0.70 0.20 310)`)
- Palaces: Midnight indigo (`oklch(0.58 0.18 265)`)
- Stars: Use each star's unique color (see Star Color Table below)
- Four Forces: Dynamic — each force gets its own color:
  - Hua Lu (The Flow): Green-gold `oklch(0.65 0.20 140)`
  - Hua Quan (The Power): Red-amber `oklch(0.58 0.22 25)`
  - Hua Ke (The Shine): Silver-blue `oklch(0.72 0.14 220)`
  - Hua Ji (The Hook): Deep violet `oklch(0.45 0.20 310)`
- Timing: Indigo-dark `oklch(0.50 0.18 265)`
- Patterns: Brass `oklch(0.72 0.16 80)` (var(--brass))

**Typography:** Fraunces for display/star names (its cinematic quality fits the celestial theme). Geist for body and UI. Space Mono for star-calculation examples and numbers.

**Visual tone:** Celestial darkness. Deep dark backgrounds. Gold star highlights. Imperial court aesthetic — sophisticated, not mystical-kitsch. Think: a museum exhibition about the Forbidden City's astrology chamber, not a fortune teller's tent.

**ABSOLUTE RULES (from memory):**
- No underlined text links, no border-bottom fake underlines — color + weight only
- No visible paid tiers on any page — purely spiritual/educational content
- Free account as lead capture, off-site conversion

---

## STAR COLOR TABLE (for individual star pages)

| Star | Coined Name | Primary Color | Tone |
|------|-------------|---------------|------|
| 紫微 Zi Wei | The Emperor Star | `oklch(0.70 0.20 310)` | Imperial purple |
| 天机 Tian Ji | The Strategist | `oklch(0.65 0.18 185)` | Teal-green |
| 太阳 Tai Yang | The Sun Star | `oklch(0.78 0.22 60)` | Solar gold |
| 武曲 Wu Qu | The Finance General | `oklch(0.60 0.16 230)` | Steel blue |
| 天同 Tian Tong | The Harmony Star | `oklch(0.68 0.18 140)` | Soft green |
| 廉贞 Lian Zhen | The Diplomat | `oklch(0.62 0.22 15)` | Crimson |
| 天府 Tian Fu | The Treasury | `oklch(0.72 0.18 80)` | Amber-gold |
| 太阴 Tai Yin | The Moon Star | `oklch(0.72 0.14 240)` | Silver-blue |
| 贪狼 Tan Lang | The Desire Star | `oklch(0.62 0.24 340)` | Magenta-rose |
| 巨门 Ju Men | The Dark Gate | `oklch(0.48 0.16 280)` | Deep indigo |
| 天相 Tian Xiang | The Prime Minister | `oklch(0.66 0.16 195)` | Cyan-teal |
| 天梁 Tian Liang | The Elder Star | `oklch(0.65 0.16 100)` | Sage |
| 七杀 Qi Sha | The Warrior | `oklch(0.55 0.24 18)` | Blood red |
| 破军 Po Jun | The Vanguard | `oklch(0.58 0.22 270)` | Electric violet |

---

## PAGE BUILD SPECS — WAVE 1 (LAUNCH CORE)

### PAGE 1: `/elements/zi-wei/index.html` — The Hub

**Purpose:** Gateway and orientation. Should feel like entering the Forbidden City.

**Hero:**
```
Eyebrow: "The Emperor's Astrology"
H1: "Zi Wei Dou Shu"
Subhead: "The celestial system that Chinese imperial courts kept secret for 1,000 years — 
          your entire life mapped as a 12-room cosmic palace, with 100 stars stationed 
          at the moment of your birth."
```

**Sections to build:**
1. **HERO** — Dark, full-width. Animated star field (CSS, not heavy JS). Imperial purple accent. CTA: "Read your palace chart →" (links to account/reading)
2. **THE PREMISE** — 3-column explainer with icons:
   - "12 rooms. Each governs a domain of your life."
   - "100 stars. Each is a character with a role."
   - "4 forces. The engine that drives everything."
3. **ZWDS vs BAZI** — Comparison strip. Make it concrete: "BaZi tells you the weather; ZWDS gives you the map."
4. **EXPLORE THE SYSTEM** — Bridge cards to all major sections (Palaces, Stars, Four Forces, History, Timing)
5. **THE 12 PALACES** — Visual palace grid (interactive on hover — each box lights up, shows palace name + domain). Bridge to `/palaces/`
6. **THE 14 STARS** — Compact star grid (14 star cards, each with coined name, 3 keywords, colored glyph). Bridge to `/stars/`
7. **THE FOUR FORCES** — Teaser of Si Hua with seasonal metaphor. Bridge to `/four-forces/`
8. **READING SECTION** — Lead capture: "Get your Zi Wei chart read" → CTA to account

**Interactive layers:**
- Palace grid: hover each of 12 boxes to see palace name + 1-line domain description
- Star grid: hover each of 14 stars to see coined name + 3 keywords
- Animated star field in hero (pure CSS using `@keyframes` and positioned pseudo-elements, or subtle SVG)

---

### PAGE 2: `/elements/zi-wei/history/index.html` — Origin & Philosophy

**Purpose:** The deep backstory — makes ZWDS feel ancient, weighty, and legitimate.

**Sections:**
1. **HERO** — "Born in the Imperial Court" — Chen Tuan, Song Dynasty, the pole star
2. **THE NAME** — Etymology explainer (Purple = imperial, Wei = quiet governing, Dou = Big Dipper, Shu = calculation). Make this visually beautiful — each character with a visual breakdown.
3. **TIMELINE** — Visual timeline: Tang Dynasty seed → Song Dynasty codification → Ming rectangular chart → Imperial secrecy → Taiwan transmission → Global spread
4. **THE COSMIC COURT** — Interactive diagram: Polaris at center, 14 stars orbiting as court characters
5. **ZWDS vs BAZI** — Honest comparison table (from research doc #1)
6. **THE WESTERN PARALLELS** — Hellenistic houses comparison, Si Hua vs Jupiter/Saturn transits
7. **RESOURCES** — Key English-language teachers/books

---

### PAGE 3: `/elements/zi-wei/palaces/index.html` — The 12 Palaces Hub

**Purpose:** Entry point and visual grid for all 12 palaces.

**Sections:**
1. **HERO** — "Your Life Has 12 Rooms" metaphor. The house analogy: every domain of your life is a room, permanently furnished by your birth stars.
2. **WHAT MAKES A PALACE?** — Explain that no palace is read alone: introduce San Fang Si Zheng as "The Palace Triangle Rule" — every palace has 3 companion rooms that must be read together.
3. **THE COURT SYSTEM** — Interactive visual: the 12 palaces in their grid. Click any palace → sidebar shows: domain, opposite palace, court companions, Si Hua effects summary. **This is the key interactive module for this page.**
4. **PALACE CARDS** — 12 bridge cards in grid, each with:
   - Palace name (coined + classical)
   - Domain in 1 line
   - Emotional archetype / life question it answers
   - Arrow to palace sub-page
5. **THE FORTUNE PALACE CALLOUT** — Special box: "The Fortune Palace governs all 11 others — it's the meta-palace that colors every other domain's expression."
6. **THE COMMAND PALACE** — Extra prominence for Ming Gong. "This is where ZWDS begins — always."

**Interactive module — Palace Grid:**
```
A 3×4 CSS grid of 12 palace boxes.
Each box: palace number, coined name, 1-line domain
Hover/click: expands to show:
  - Full domain description
  - Opposite palace
  - Court companions (3 palaces)
  - Western astrological house equivalent
  - Most significant Si Hua placement (Hua Ji effect)
```

---

### PAGE 4: `/elements/zi-wei/stars/index.html` — The 14 Stars Hub

**Purpose:** Gallery and orientation for all 14 major stars.

**Sections:**
1. **HERO** — "Every Star Is a Character" — introduce the two families (Zi Wei group vs Tian Fu group)
2. **THE STAR FAMILIES** — Side-by-side: Northern Dipper (7 stars) vs Southern Dipper (7 stars). Each as a row with glyph, coined name, one defining keyword.
3. **THE GREAT TRIOS** — Special section for the three major groupings:
   - **The Vanguard Trio (Sha-Po-Lang):** Qi Sha + Po Jun + Tan Lang. "Life as an adventure novel — high stakes, unconventional paths."
   - **The Four of Stability (Ji-Yue-Tong-Liang):** Tian Ji + Tai Yin + Tian Tong + Tian Liang. "The institutional path — steady, respected, long-tenured."
   - **Sun and Moon:** Tai Yang + Tai Yin. "The cosmic balance of public and private."
4. **STAR GALLERY** — 14 cards, each with full info. Bridge to individual star pages.
5. **BRIGHTNESS LEVELS** — Explain 庙旺利陷 (Temple/Thriving/Favorable/Fallen) — the star's expression depends on which palace it lands in.

**Each star card should include:**
- Chinese character (large, beautiful)
- Coined Western name
- Elemental nature (yin/yang, element)
- 5 core keywords
- Western archetype (Jungian / mythological)
- Tarot equivalent
- Thumbnail color

---

### PAGE 5: `/elements/zi-wei/four-forces/index.html` — Si Hua (The Four Forces)

**Purpose:** The most interactive page. Si Hua is the dynamic engine — this is where the system comes alive.

**Sections:**
1. **HERO** — "The Four Forces That Drive Destiny" — the seasonal metaphor. Spring/Summer/Autumn/Winter. Each force is a season of life energy.
2. **THE FOUR FORCES** — 4-card visual with animations:
   - **THE FLOW (化禄 Hua Lu)** — spring green. "The channel opens. Resources arrive."
   - **THE POWER (化权 Hua Quan)** — summer red. "The hand tightens. Authority activates."
   - **THE SHINE (化科 Hua Ke)** — autumn gold. "The light catches you. Recognition arrives."
   - **THE HOOK (化忌 Hua Ji)** — winter violet. "The void calls. The lesson begins."
3. **THE YEAR STEM TABLE** — Interactive: user selects their birth year → shows their natal 4 forces (which 4 stars are transformed, in which direction)
4. **THE THREE LAYERS** — Animated diagram showing natal / decade / annual transformations stacking
5. **FLYING STARS (FEI HUA)** — Advanced concept: how transformations fly between palaces. Visual arrow diagram.
6. **WHAT YOUR HOOK (HUA JI) MEANS** — The most useful single section: "Find your natal Hua Ji and learn which palace it hits. That is where your life's deepest work lives."

**Interactive module — Si Hua Calculator:**
```
User inputs birth year (Gregorian)
System calculates birth year Heavenly Stem
Displays:
  - Which star receives The Flow (Hua Lu)
  - Which star receives The Power (Hua Quan)
  - Which star receives The Shine (Hua Ke)
  - Which star receives The Hook (Hua Ji)
Each result: brief explanation of what this means
```

**Implementation note:** The 10 stem table is complete in research doc #04. The Gregorian-to-stem conversion: last digit of year maps to stem (0=Geng, 1=Xin, 2=Ren, 3=Gui, 4=Jia, 5=Yi, 6=Bing, 7=Ding, 8=Wu, 9=Ji). But must adjust for pre-Lunar-New-Year births (approx Jan–mid Feb = prior year's stem). Build as a simple JS calculator embedded in the page.

---

## PAGE BUILD SPECS — WAVE 2 (INDIVIDUAL STAR PAGES × 14)

**Template for each star page. Every star page MUST follow this structure:**

```html
<!-- HERO -->
Eyebrow: Star family (Northern Dipper / Southern Dipper)
Large Chinese character (Fraunces, huge)
H1: [Coined Western Name] (e.g., "The Emperor Star")
Subhead: [Classical name in Chinese + pinyin]
3 keywords in a horizontal row

<!-- THE ESSENCE -->
2-column layout:
  Left: 3-paragraph narrative of the star's core archetype
  Right: Quick-reference card (Element, Polarity, Transformation, Brightness range)

<!-- IN THE COMMAND PALACE -->
What does this star mean when it's in your Ming Gong (Life Palace)?
Full paragraph + 3 key traits + the central tension

<!-- ACROSS THE PALACES -->
12-section grid: what this star means in each of the 12 palaces
(condensed — 2-3 sentences per palace)

<!-- STAR STRENGTH LEVELS -->
4-row table: Temple / Thriving / Favorable / Fallen expressions

<!-- KEY STAR RELATIONSHIPS -->
Which stars make this one stronger? Which create challenges?
The most important pairings.

<!-- WESTERN MIRRORS -->
Mythological equivalent + Jungian archetype + Tarot card
(Keep these as comparisons, not equivalences — "resonates with", not "is the same as")

<!-- KEYWORDS & PERSONALITY SNAPSHOT -->
5-7 keywords + a one-paragraph personality portrait

<!-- BRIDGE CARDS -->
Links: ← Back to Stars Hub | ← Back to Zi Wei Hub | Related: [related star pages]
```

**Star page color:** Each star page uses its unique `--cc` color from the Star Color Table above.

---

## PAGE BUILD SPECS — WAVE 3 (INDIVIDUAL PALACE PAGES × 12)

**Template for each palace page:**

```html
<!-- HERO -->
Eyebrow: "The 12 Palaces" (breadcrumb indicator)
H1: [Coined Name] (e.g., "The Celestial Treasury")
Chinese: 財帛宮 [Full name]
1-line domain description

<!-- THE DOMAIN -->
Full description of what this palace governs
The surface reading AND the deeper reading
What the classical texts say is most important about this palace

<!-- THE COURT -->
This palace's three companion palaces (San Fang Si Zheng)
Visual: 4-box diagram showing the palace and its court
Explanation of how the court reads together

<!-- STARS IN THIS PALACE -->
How to interpret the 14 major stars when they land here
(Most important 5-6 stars with brief interpretations)

<!-- THE FOUR FORCES HERE -->
What each Si Hua transformation means specifically in this palace
Especially: what Hua Ji in this palace means for a person

<!-- OPPOSITE PALACE -->
Which palace sits opposite and how to read them together

<!-- DECADE ACTIVATION -->
What happens when a Da Xian (Decade Door) activates this palace

<!-- WESTERN BRIDGE -->
Western astrological house equivalent + what's similar, what's different

<!-- BRIDGE CARDS -->
← Back to Palaces Hub | ← Back to Zi Wei Hub | Related palaces
```

---

## PAGE BUILD SPECS — WAVE 4 (TIMING, PATTERNS, AUXILIARY)

### `/elements/zi-wei/timing/` — The Decade Door & Year Wave

**Key sections:**
1. **THE MOVIE METAPHOR** — "The natal chart is the script. The decade is the chapter you're in. The year is the scene."
2. **THE BUREAU** — Which of 5 bureaus are you? Interactive calculator. Water 2 / Wood 3 / Metal 4 / Earth 5 / Fire 6.
3. **THE 12 LIFECYCLE PHASES** — Visual wheel showing 长生 through 养, with descriptions
4. **THE DECADE DOOR (大限)** — How the decade clock works, how to read your current decade
5. **THE YEAR WAVE (流年)** — Annual overlay, how it layers on the decade
6. **THREE-LAYER CONVERGENCE** — The most important concept: when natal + decade + annual all hit the same palace

### `/elements/zi-wei/patterns/` — The Pattern Library

**Key sections:**
1. **WHAT IS A PATTERN?** — How 格局 configurations override individual star meanings
2. **THE AUSPICIOUS 5** — Visual cards for each major positive pattern with conditions and meaning
3. **THE CHALLENGE PATTERNS** — Including Xing Qiu Jia Yin (刑囚夹印格) with full explanation
4. **HOW TO RECOGNIZE YOUR CHART'S QUALITY TIER** — High / Ordinary / Challenged — honest framing that doesn't demotivate

### `/elements/zi-wei/auxiliary-stars/` — The Supporting Cast

**Key sections:**
1. **THE SIX AUSPICIOUS** — Cards for Zuo Fu, You Bi, Tian Kui, Tian Yue, Wen Chang, Wen Qu
2. **THE SIX MALEFIC** — Cards for Qing Yang, Tuo Luo, Huo Xing, Ling Xing, Di Kong, Di Jie
3. **THE ROMANCE STARS** — Hong Luan, Tian Xi, Tian Yao
4. **THE HEAVENLY HORSE** — Tian Ma and its combinations

---

## INTERACTIVE UX LAYERS — GLOBAL SPEC

**Every page should have at minimum 2 interactive layers. The interactive modules must serve the learning experience, not just be decoration.**

### MODULE TYPE 1: Hover-Reveal Cards
- Any star card, palace card, or force card
- On hover: expand to show additional information without navigating away
- Use CSS transitions (no heavy JS libraries)
- Keyboard accessible (focus state mirrors hover state)

### MODULE TYPE 2: Inline Calculators
- Year Stem Calculator (on Four Forces page)
- Bureau Calculator (on Timing page)
- Both are simple modular JS with no external deps
- Display clearly: "This is for educational orientation only — a full reading requires your complete birth data"

### MODULE TYPE 3: Visual Diagrams
- Palace Grid (on Palaces hub and Hub page)
- Court System Diagram (San Fang Si Zheng visual — 12 palaces in grid with click to highlight court)
- Lifecycle Phase Wheel (on Timing page)
- Three-Layer Si Hua Stack diagram (on Four Forces page)
- Star relationship web (on Stars hub)

### MODULE TYPE 4: Comparison Tables
- ZWDS vs BaZi comparison (on Hub and History pages)
- Palace vs Western House comparison
- Si Hua vs Western transit comparison

### MODULE TYPE 5: Shareable Snippets
**Per project brief: "make it super interactive and addictive and fun to share with friends"**
Every star page should have:
- A "Share this star" section with a punchy 1-sentence description of the star in Western terms
- A personality archetype headline (e.g., "You have The Emperor Star — you lead best when others choose to follow")
- Visual: shareable card design (not actual sharing functionality needed, just content framed for sharing)

Every palace page should have a "What does this palace say about you?" hook framed for shareability.

---

## ZWDS LEARNING PATH (Cross-page navigation logic)

**Every page must include a "Where to next?" section with a clear learning path.**

```
BEGINNER PATH:
Hub → History → Palaces Hub → Command Palace (Ming Gong) → Stars Hub → Emperor Star

INTERMEDIATE PATH:
Stars Hub → Individual Stars → Four Forces → Patterns

ADVANCED PATH:
Four Forces → Flying Stars → Timing → Three-Layer Reading

READING PATH (conversion):
Any page → CTA to "Get your chart read" → account lead capture
```

**Breadcrumb structure:** Every page must have the ZodiAnimal pn-sub breadcrumb showing: Home > Elements > Zi Wei Dou Shu > [current page]

---

## NAV AND GLOBAL ELEMENTS

**The pn-bar mega nav must include Zi Wei Dou Shu under the appropriate section.** It belongs under Elements (alongside Chakras, BaZi, etc.). Do NOT add a new top-level nav item — route into the existing Elements section per the nav-budget-guard principle.

**Footer:** All pages must use the standard `<!--om-footer:start-->` / `<!--om-footer:end-->` build system markers. No manually written footers.

**`<a id="pn-main" tabindex="-1"></a>`** — This anchor must appear immediately before the first visible content section (after `<!--pn-sub:end-->` if a sub-nav is present, or after `<!--pn-static:end-->`). One per page, no duplicates.

---

## WAVE SHIPPING PLAN

**Wave 1 (Foundation — build first, deploy together):**
- Hub page: `/elements/zi-wei/index.html`
- History page: `/elements/zi-wei/history/index.html`
- Palaces Hub: `/elements/zi-wei/palaces/index.html`
- Stars Hub: `/elements/zi-wei/stars/index.html`
- Four Forces: `/elements/zi-wei/four-forces/index.html`

**Wave 2 (All 14 Star Pages — use parallel agents):**
- Deploy as a batch when all 14 are complete

**Wave 3 (All 12 Palace Pages — use parallel agents):**
- Deploy as a batch when all 12 are complete

**Wave 4 (Advanced pages):**
- Timing page
- Patterns page
- Auxiliary Stars page

**Build verification checklist for each page:**
- [ ] Uses ZodiAnimal design tokens (--ink, --panel, --cc, etc.)
- [ ] No underlined text links
- [ ] `pn-main` anchor present, one per page
- [ ] Footer uses `<!--om-footer:start-->` / `<!--om-footer:end-->` only
- [ ] `pn-has-bar` class on body
- [ ] Breadcrumb shows correct hierarchy
- [ ] All links are relative (not absolute) to site root
- [ ] At least 2 interactive UX modules present
- [ ] No mentions of paid tiers or pricing
- [ ] Bridge cards link to: ← parent hub, ← main ZWDS hub, → related pages

---

## SAMPLE PAGE CODE SKELETON

Every ZWDS page should use this skeleton structure:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[Page Title] — Zi Wei Dou Shu | ZodiAnimal</title>
  <meta name="description" content="[150-char description]">
  <!-- ZodiAnimal standard CSS stack -->
  <link rel="stylesheet" href="/css/tokens.css">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/nav-core.css">
  <link rel="stylesheet" href="/css/nav-mega.css">
  <link rel="stylesheet" href="/css/nav-drawer.css">
  <link rel="stylesheet" href="/css/nav-sub.css">
  <link rel="stylesheet" href="/css/bridges.css">
  <link rel="stylesheet" href="/css/foot.css">
</head>
<body class="pn-has-bar">

<!--pn-static:start--><!--pn-static:end-->

<!--pn-sub:start-->
<nav class="pn-sub" aria-label="Section navigation">
  <div class="pn-sub-inner">
    <ol class="pn-breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/" itemprop="item"><span itemprop="name">Home</span></a>
        <meta itemprop="position" content="1">
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/elements/" itemprop="item"><span itemprop="name">Elements</span></a>
        <meta itemprop="position" content="2">
      </li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/elements/zi-wei/" itemprop="item"><span itemprop="name">Zi Wei Dou Shu</span></a>
        <meta itemprop="position" content="3">
      </li>
      <!-- [page-specific breadcrumb items] -->
    </ol>
  </div>
</nav>
<!--pn-sub:end-->

<a id="pn-main" tabindex="-1"></a>

<!-- HERO SECTION -->
<section class="hero band" style="--cc: oklch(0.70 0.20 310);">
  <div class="wrap">
    <!-- hero content -->
  </div>
</section>

<!-- [page sections] -->

<!--om-footer:start--><!--om-footer:end-->

<script src="/js/nav.js"></script>
</body>
</html>
```

---

## JM'S CHART CONTEXT (for examples and illustrations)

Throughout the educational content, we can optionally use a real chart example to make concepts concrete. JM's birth data from the CeCe app (shown in screenshots):

- **Bureau:** Water 2局 (大限 starts at age 2)
- **Destiny Star (命主):** 贪狼 Tan Lang (The Desire Star)
- **Body Star (身主):** 天机 Tian Ji (The Strategist)
- **Pattern:** 芸芸众生格 (literally "All Living Beings Pattern" — a pattern associated with broad social connection and adaptability)
- **Birth:** 1989.6.27 11:00 Beijing time
- **Four Pillars:** 己庚戊戊 / 巳午午午 (Si hour)

If used as examples, frame as: "For example, in a chart with The Desire Star (Tan Lang) in the Command Palace..." — not explicitly as JM's chart unless instructed.

---

## CONTENT VOICE GUIDELINES

**Writing tone for all ZWDS pages:**
- Authoritative and poetic, not mystical or fortune-teller-y
- Western audiences — analogize to things they know (Greek mythology, Jungian archetypes, tarot) but always frame as "resonates with" not "is the same as"
- Respect the system's depth — don't oversimplify, but make it learnable
- Use coined Western vocabulary consistently (The Hook, The Flow, The Command Palace, etc.)
- First principles: always explain *why* a concept works before explaining *what* it means
- The tone of a well-written cultural museum exhibition combined with the clarity of a great explainer essay

**Section intros:** Every major section should open with a 1-2 sentence orientation that tells the reader what they're about to learn and why it matters.

**Examples:** Use concrete examples whenever possible. "What this star means in your Wealth Palace" is more useful than "This star has wealth-related properties."

**Seasonal metaphors:** Use the four seasons as shorthand for the Four Forces whenever possible. Western readers grasp them instantly.
