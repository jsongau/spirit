/* THE PRIMAL ORACLE — navigation site map (v2). Data only, on window.PNAV. */
window.PNAV = window.PNAV || { features: {} };

/* Canvas mega-nav v3 (canvas-template-v2 port): the bar reads
   Find yours | Explore | Menagerie | Bonds | Moon, plus the moon
   chip, theme toggle, and the "Reveal my animal" CTA in .pn-tools.
   Each group:
     key      stable id (also the panel data-group anchor family)
     h        bar label (also the panel aria-label)
     cls      optional extra class on a single-link group's anchor
     accent   per-domain accent ramp: jade | silver | amethyst | rose | teal | brass
     eyebrow  optional lede sentence at the top of the panel
     foot     optional [href, label] closing link line
     layout   "explore" | "wings" | "cards" | "moon" | "list" — a CSS class only
     cols     optional array of {title?, mark?, items:[...]} for multi-column
              panels; `mark` is a small aria-hidden glyph before the title.
              When absent, `items` is treated as one implicit column.
     chips    optional strip OR ARRAY of strips { label, items: [[href, glyph,
              title], ...] } — round chip rows under the columns (the canvas
              "wing" strips: ♈…♓, 鼠…猪)
     items    item = [href, name, sub?, glyph?, dyn?]
                href   real destination (always a literal <a href> in served HTML)
                name   serif row name
                sub    optional muted sub-label (date band, year band, note)
                glyph  optional key into PNAV.GLYPHS (data/glyphs-inline.json)
                dyn    optional live-label key rendered as data-dyn on the sub;
                       apply-nav.mjs bakes a fresh value at build time and
                       nav.js re-computes it client-side so static pages never
                       go stale. Keys: "date-today" | "moon-phase" | "cn-years-<i>"
   Copy rule: no arrows, no dashes; date bands read "Mar 21 to Apr 19". */

/* Live sub-label computers. Runs identically at build time (apply-nav.mjs
   evaluates this file in Node before pre-rendering) and in the browser
   (nav.js refreshes every [data-dyn] sub after hydration). Data-adjacent,
   dependency-free, no DOM access. */
PNAV.DYN = (function () {
  var DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function todayLabel() {
    var d = new Date();
    return DOW[d.getDay()] + ", " + MON[d.getMonth()] + " " + d.getDate();
  }
  var PHASES = ["New Moon", "Waxing Crescent", "First Quarter", "Waxing Gibbous",
                "Full Moon", "Waning Gibbous", "Last Quarter", "Waning Crescent"];
  function moonPhaseName() {
    /* same synodic math as js/home-v4.js moonNow() */
    var synodic = 29.530588853;
    var ref = Date.UTC(2000, 0, 6, 18, 14);
    var days = (Date.now() - ref) / 864e5;
    var phase = ((days % synodic) + synodic) % synodic / synodic;
    return PHASES[Math.round(phase * 8) % 8];
  }
  function yearBand(i) {
    /* the 3 most recent years for Chinese animal index i (Rat = 0).
       2020 was a Rat year; the cycle repeats every 12. */
    var y = new Date().getFullYear();
    var latest = y - ((((y - (2020 + i)) % 12) + 12) % 12);
    return (latest - 24) + " · " + (latest - 12) + " · " + latest;
  }
  /* the full moon readout for the bar chip + popover (canvas moon()).
     Same math as moonPhaseName; the copy is the canvas PHASE_MEANING
     set (also carried by js/home-v4.js for the rail card). */
  var GLYPHS = ["🌑", "🌒", "🌓", "🌔",
                "🌕", "🌖", "🌗", "🌘"];
  var MEANINGS = [
    "The sky is dark and open. The month begins here, so name the one thing you want from it.",
    "The first sliver of light. Whatever you started at the new moon wants its first small step now.",
    "Half lit, half dark. This is the phase of the first real obstacle. Push through it or drop the plan on purpose.",
    "Almost full. Refine what you are making before it peaks. Small corrections now save the whole thing.",
    "Fully lit. See things as they are, celebrate what landed, and set your stones out to charge.",
    "The light is receding after the peak. Share what you learned, thank who helped, and finish what is still open.",
    "Half dark and dimming. Cut one thing that no longer serves the month you set.",
    "The last sliver. Rest and empty out. The next turn of the wheel is days away."
  ];
  var FAVORS = [
    "intentions, quiet starts", "first steps, small commitments", "decisions, effort",
    "editing, adjustment", "clarity, charging stones", "gratitude, teaching, finishing",
    "release, letting go", "rest, reflection"
  ];
  function moonInfo() {
    var synodic = 29.530588853;
    var ref = Date.UTC(2000, 0, 6, 18, 14);
    var days = (Date.now() - ref) / 864e5;
    var phase = ((days % synodic) + synodic) % synodic / synodic;
    var idx = Math.round(phase * 8) % 8;
    var illum = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);
    return { glyph: GLYPHS[idx], name: PHASES[idx], pct: illum + "%",
             meaning: MEANINGS[idx], favor: FAVORS[idx] };
  }
  /* the Zodiac Day: the day pillar's earthly branch, counted from the
     VERIFIED anchor the Saju engine uses (2024-01-01 civil date = 甲子,
     see js/saju/saju-engine.js ANCHOR_JDN). Local civil date, midnight
     boundary; 19723 = Date.UTC(2024,0,1)/864e5. */
  var BRANCHES = [
    ["子", "zǐ", "Rat"], ["丑", "chǒu", "Ox"], ["寅", "yín", "Tiger"],
    ["卯", "mǎo", "Rabbit"], ["辰", "chén", "Dragon"], ["巳", "sì", "Snake"],
    ["午", "wǔ", "Horse"], ["未", "wèi", "Goat"], ["申", "shēn", "Monkey"],
    ["酉", "yǒu", "Rooster"], ["戌", "xū", "Dog"], ["亥", "hài", "Pig"]
  ];
  function dayInfo() {
    var d = new Date();
    var days = Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 864e5) - 19723;
    var b = BRANCHES[((days % 12) + 12) % 12];
    return { zh: b[0], py: b[1], en: b[2] };
  }
  function dayTitle()  { var b = dayInfo(); return "Today the " + b.en + "s climb"; }
  function dayBranch() { var b = dayInfo(); return b.zh + " " + b.py + " · the day pillar carries the " + b.en; }
  function dayClimb()  { var b = dayInfo(); return "today the " + b.en + "s climb"; }
  return { todayLabel: todayLabel, moonPhaseName: moonPhaseName,
           yearBand: yearBand, moonInfo: moonInfo,
           dayInfo: dayInfo, dayTitle: dayTitle, dayBranch: dayBranch, dayClimb: dayClimb };
})();
/* Item tuple: [href, name, sub?, glyph?, dyn?, cal?, opts?]
     cal   optional Chinese calligraphy character (6th slot). apply-nav
           renders it as <span class="pn-glyph pn-cal"> (the row's glyph
           box carries the character, serif, accent-tinted).
     opts  optional object on the 7th slot: { sign, featured }.
             sign      value baked as data-sign on the row (Western signs)
                       so nav.js can light today's sun sign.
             featured  true bakes the is-featured class on the row.
   Groups may also carry a `feature` object (a .pn-feature aside beside a
   pn-split list) and/or a `cta` object (the free e-book card), rendered
   generically by apply-nav.mjs panelHTML. See that file for the shapes. */
PNAV.MAP = [
  /* v3 (Jul 2026, owner sign-off): Home deleted; six groups:
     Explore · Destiny · Zodiac · Horoscope · Feng Shui & Moon · Bonds.
     Destiny replaces Sage Wisdom (readings + elements + the daily seat),
     Feng Shui & Moon merges the old feng shui column with the Moon group,
     Bonds carries the Climb (Zodi Karma). Every demoted link lives on in
     PNAV.CRAWL_EXTRA, so the crawl mirror loses nothing. */
  { key: "explore", h: "Explore", accent: "teal",
    eyebrow: "New here? Start with your animal — the rest of the wheel opens from there",
    foot: ["/menagerie.html", "See all 144 animals"],
    layout: "explore",
    cols: [
      { title: "Start here", mark: "✦", items: [
        ["/index.html", "Find your animal", "your birth date, one animal"],
        ["/learn.html", "What your animal means", "how to read yours"],
        ["/daily.html", "Today's reading", PNAV.DYN.todayLabel(), null, "date-today"]
      ]},
      { title: "The menagerie", mark: "◆", items: [
        ["/menagerie.html",  "All 144 animals"],
        ["/western-zodiac/", "Western wing", "by your sun sign"],
        ["/chinese-zodiac/", "Eastern wing", "by your birth year"],
        ["/zodiac/",         "Zodiac crossings", "East meets West"]
      ]},
      { title: "The five elements", mark: "五行",
        phases: [
          ["/elements/phases/metal/", "金", "jīn",  "Metal"],
          ["/elements/phases/wood/",  "木", "mù",   "Wood"],
          ["/elements/phases/water/", "水", "shuǐ", "Water"],
          ["/elements/phases/fire/",  "火", "huǒ",  "Fire"],
          ["/elements/phases/earth/", "土", "tǔ",   "Earth"]
        ],
        items: [
        ["/elements/",         "The five elements", "cycles and a quiz"],
        ["/elements/chakras/", "The 7 chakras", "a yoga practice each"],
        ["/elements/zodiac/",  "Elements & your animal"]
      ]},
      { title: "Live with it", mark: "⌂", items: [
        ["/feng-shui/",  "Feng shui"],
        ["/proverbs/",   "The Proverb Pond", "all 87"],
        ["/habitat/",    "The Habitat"],
        ["/stones.html", "Keeper stones"],
        ["/traditions/", "Traditions", "moon, stones, heritage"]
      ]}
    ],
    chips: [
      { label: "Western wing", items: [
        ["/western-zodiac/aries/",       "♈", "Aries"],
        ["/western-zodiac/taurus/",      "♉", "Taurus"],
        ["/western-zodiac/gemini/",      "♊", "Gemini"],
        ["/western-zodiac/cancer/",      "♋", "Cancer"],
        ["/western-zodiac/leo/",         "♌", "Leo"],
        ["/western-zodiac/virgo/",       "♍", "Virgo"],
        ["/western-zodiac/libra/",       "♎", "Libra"],
        ["/western-zodiac/scorpio/",     "♏", "Scorpio"],
        ["/western-zodiac/sagittarius/", "♐", "Sagittarius"],
        ["/western-zodiac/capricorn/",   "♑", "Capricorn"],
        ["/western-zodiac/aquarius/",    "♒", "Aquarius"],
        ["/western-zodiac/pisces/",      "♓", "Pisces"]
      ]},
      { label: "Eastern wing", items: [
        ["/chinese-zodiac/rat/",     "鼠", "Rat"],
        ["/chinese-zodiac/ox/",      "牛", "Ox"],
        ["/chinese-zodiac/tiger/",   "虎", "Tiger"],
        ["/chinese-zodiac/rabbit/",  "兔", "Rabbit"],
        ["/chinese-zodiac/dragon/",  "龙", "Dragon"],
        ["/chinese-zodiac/snake/",   "蛇", "Snake"],
        ["/chinese-zodiac/horse/",   "马", "Horse"],
        ["/chinese-zodiac/goat/",    "羊", "Goat"],
        ["/chinese-zodiac/monkey/",  "猴", "Monkey"],
        ["/chinese-zodiac/rooster/", "鸡", "Rooster"],
        ["/chinese-zodiac/dog/",     "狗", "Dog"],
        ["/chinese-zodiac/pig/",     "猪", "Pig"]
      ]}
    ]
  },
  { key: "zodiac", h: "Zodiac", accent: "brass",
    eyebrow: "The Eastern wheel, your birth year's animal",
    foot: ["/chinese-zodiac/", "See the Eastern wheel"],
    layout: "east",
    /* v3: the tall Fire Horse feature gave its seat to Zodiac Day (the day
       pillar's animal + the Karmic Board pull); the year keeps a quiet
       fhmini row under the card. */
    zday: { href: "/karmic-board.html", link: "See the Karmic Board",
      body: "Every date carries one of the twelve in its day pillar. On its day an animal climbs: see who holds the top of the board." },
    fhmini: { href: "/chinese-zodiac/fire-horse-2026/", zi: "馬",
      title: "Year of the Fire Horse", sub: "2026, once in sixty years", link: "Read the year" },
    cols: [
      { items: [
        ["/chinese-zodiac/horse/",   "Horse",   "2026 · Fire Horse",   "horse",   null,          "马", { featured: true }],
        ["/chinese-zodiac/rat/",     "Rat",     PNAV.DYN.yearBand(0),  "rat",     "cn-years-0",  "鼠"],
        ["/chinese-zodiac/ox/",      "Ox",      PNAV.DYN.yearBand(1),  "ox",      "cn-years-1",  "牛"],
        ["/chinese-zodiac/tiger/",   "Tiger",   PNAV.DYN.yearBand(2),  "tiger",   "cn-years-2",  "虎"],
        ["/chinese-zodiac/rabbit/",  "Rabbit",  PNAV.DYN.yearBand(3),  "rabbit",  "cn-years-3",  "兔"],
        ["/chinese-zodiac/dragon/",  "Dragon",  PNAV.DYN.yearBand(4),  "dragon",  "cn-years-4",  "龙"],
        ["/chinese-zodiac/snake/",   "Snake",   PNAV.DYN.yearBand(5),  "snake",   "cn-years-5",  "蛇"],
        ["/chinese-zodiac/goat/",    "Goat",    PNAV.DYN.yearBand(7),  "goat",    "cn-years-7",  "羊"],
        ["/chinese-zodiac/monkey/",  "Monkey",  PNAV.DYN.yearBand(8),  "monkey",  "cn-years-8",  "猴"],
        ["/chinese-zodiac/rooster/", "Rooster", PNAV.DYN.yearBand(9),  "rooster", "cn-years-9",  "鸡"],
        ["/chinese-zodiac/dog/",     "Dog",     PNAV.DYN.yearBand(10), "dog",     "cn-years-10", "狗"],
        ["/chinese-zodiac/pig/",     "Pig",     PNAV.DYN.yearBand(11), "pig",     "cn-years-11", "猪"]
      ]}
    ],
    chips: [
      { label: "Eastern wing", cal: true, items: [
        ["/chinese-zodiac/rat/",     "鼠", "Rat"],
        ["/chinese-zodiac/ox/",      "牛", "Ox"],
        ["/chinese-zodiac/tiger/",   "虎", "Tiger"],
        ["/chinese-zodiac/rabbit/",  "兔", "Rabbit"],
        ["/chinese-zodiac/dragon/",  "龙", "Dragon"],
        ["/chinese-zodiac/snake/",   "蛇", "Snake"],
        ["/chinese-zodiac/horse/",   "马", "Horse"],
        ["/chinese-zodiac/goat/",    "羊", "Goat"],
        ["/chinese-zodiac/monkey/",  "猴", "Monkey"],
        ["/chinese-zodiac/rooster/", "鸡", "Rooster"],
        ["/chinese-zodiac/dog/",     "狗", "Dog"],
        ["/chinese-zodiac/pig/",     "猪", "Pig"]
      ]}
    ]
  },
  { key: "horoscope", h: "Horoscope", accent: "amethyst",
    eyebrow: "The Western wheel, the sky on your birthday",
    foot: ["/horoscopes/", "All horoscopes, sign by sign"],
    layout: "west",
    feature: { eyebrow: "", title: "", body: "", href: "/daily.html",
      link: "Read today's horoscope", today: true,
      archive: ["/horoscopes/daily/", "Every reading stays on the shelf: the daily archive"] },
    cols: [
      { items: [
        ["/western-zodiac/aries/",       "Aries",       "Mar 21 to Apr 19", "aries",       null, null, { sign: "aries" }],
        ["/western-zodiac/taurus/",      "Taurus",      "Apr 20 to May 20", "taurus",      null, null, { sign: "taurus" }],
        ["/western-zodiac/gemini/",      "Gemini",      "May 21 to Jun 20", "gemini",      null, null, { sign: "gemini" }],
        ["/western-zodiac/cancer/",      "Cancer",      "Jun 21 to Jul 22", "cancer",      null, null, { sign: "cancer" }],
        ["/western-zodiac/leo/",         "Leo",         "Jul 23 to Aug 22", "leo",         null, null, { sign: "leo" }],
        ["/western-zodiac/virgo/",       "Virgo",       "Aug 23 to Sep 22", "virgo",       null, null, { sign: "virgo" }],
        ["/western-zodiac/libra/",       "Libra",       "Sep 23 to Oct 22", "libra",       null, null, { sign: "libra" }],
        ["/western-zodiac/scorpio/",     "Scorpio",     "Oct 23 to Nov 21", "scorpio",     null, null, { sign: "scorpio" }],
        ["/western-zodiac/sagittarius/", "Sagittarius", "Nov 22 to Dec 21", "sagittarius", null, null, { sign: "sagittarius" }],
        ["/western-zodiac/capricorn/",   "Capricorn",   "Dec 22 to Jan 19", "capricorn",   null, null, { sign: "capricorn" }],
        ["/western-zodiac/aquarius/",    "Aquarius",    "Jan 20 to Feb 18", "aquarius",    null, null, { sign: "aquarius" }],
        ["/western-zodiac/pisces/",      "Pisces",      "Feb 19 to Mar 20", "pisces",      null, null, { sign: "pisces" }]
      ]}
    ],
    chips: [
      { label: "The twelve signs", items: [
        ["/western-zodiac/aries/",       "♈", "Aries"],
        ["/western-zodiac/taurus/",      "♉", "Taurus"],
        ["/western-zodiac/gemini/",      "♊", "Gemini"],
        ["/western-zodiac/cancer/",      "♋", "Cancer"],
        ["/western-zodiac/leo/",         "♌", "Leo"],
        ["/western-zodiac/virgo/",       "♍", "Virgo"],
        ["/western-zodiac/libra/",       "♎", "Libra"],
        ["/western-zodiac/scorpio/",     "♏", "Scorpio"],
        ["/western-zodiac/sagittarius/", "♐", "Sagittarius"],
        ["/western-zodiac/capricorn/",   "♑", "Capricorn"],
        ["/western-zodiac/aquarius/",    "♒", "Aquarius"],
        ["/western-zodiac/pisces/",      "♓", "Pisces"]
      ]}
    ]
  },
  { key: "destiny", h: "Destiny", accent: "jade",
    eyebrow: "Your birth-hour chart, read across the great Eastern systems",
    foot: ["/destiny/zi-wei-dou-shu/", "Explore Purple Star in full"],
    layout: "destiny",
    /* Saju is the featured launch card (left). Purple Star anchors the right as
       the awaken-your-animal card + the daily-reading hook. Deep pages live in
       the hubs + PNAV.CRAWL_EXTRA -- owner call Jul 2026. */
    launch: { eyebrow: "New this Fire Horse year", title: "Saju Palja",
      kicker: "사주팔자 · the Korean reading",
      body: "The same eight characters, heard in a Korean voice. The newest reading on the wheel, cast from your birth hour.",
      href: "/destiny/korean-saju/", link: "Read Saju Palja", watermark: "사주" },
    cols: [
      { title: "The three systems", mark: "命", items: [
        ["/destiny/zi-wei-dou-shu/",    "Zi Wei Dou Shu", "紫微斗数 · Purple Star"],
        ["/destiny/bazi-four-pillars/", "BaZi", "八字 · the four pillars"],
        ["/destiny/korean-saju/",       "Saju Palja", "사주팔자 · the Korean reading"]
      ]},
      { title: "Cast a chart", mark: "盤", items: [
        ["/destiny/bazi-four-pillars/chart/", "Cast your chart", "free, from your birth hour"],
        ["/destiny/zi-wei-dou-shu/chart/",    "Read a Purple Star chart", "命盘 mìngpán"],
        ["/destiny/bazi-four-pillars/",       "Learn how it works", "and more →"]
      ]}
    ],
    anchor: { eyebrow: "紫微 · your deeper form", title: "Awaken your animal",
      kicker: "Purple Star is the mirror it wakes into",
      body: "Read your Purple Star chart once to meet the Awakened animal — then let the daily reading wake it, day by day.",
      href: "/destiny/zi-wei-dou-shu/", link: "Read Purple Star", watermark: "紫微" },
    anchorLink: { href: "/daily.html", title: "Today's reading", sub: "wake it, day by day", link: "Read it" }
  },
  { key: "fengshui", h: "Feng Shui", accent: "teal",
    eyebrow: "風水 · the art of placing yourself well, room by room",
    foot: ["/feng-shui/", "Explore feng shui in full"],
    layout: "fengmoon",
    almanac: { eyebrow: "The calendar", title: "The Feng Shui calendar",
      kicker: "黄历 huánglì · today's almanac",
      body: "The lunar date, the day's officer, what today favors and what it punishes. New every midnight.",
      href: "/almanac/", link: "Open today's calendar" },
    cols: [
      { title: "The bagua", mark: "八卦", items: [
        ["/feng-shui/bagua/",            "The bagua map", "八卦 bāguà"],
        ["/feng-shui/eight-directions/", "Eight directions"],
        ["/feng-shui/compass/",          "The compass"],
        ["/feng-shui/flying-stars/",     "Flying stars"],
        ["/feng-shui/yin-yang/",         "Yin and yang", "阴阳 yīnyáng"]
      ]},
      { title: "In the home", mark: "家", items: [
        ["/feng-shui/commanding-position/", "Commanding position", "live tool"],
        ["/feng-shui/bedroom/",       "The bedroom"],
        ["/feng-shui/front-door/",    "The front door"],
        ["/feng-shui/office-desk/",   "Office and desk"],
        ["/feng-shui/wealth-corner/", "The wealth corner"],
        ["/feng-shui/colors/",        "Colors"]
      ]},
      { title: "Your chart", mark: "命", items: [
        ["/feng-shui/kua-number/",    "Your Kua number", "命卦 mìngguà"],
        ["/feng-shui/your-animal/",   "Feng shui for your animal"],
        ["/feng-shui/five-elements/", "The five phases", "五行 wǔxíng"]
      ]}
    ]
  },
  { key: "moon", h: "Moon", accent: "silver",
    eyebrow: "☾ · the sky's clock — when to begin, when to rest",
    foot: ["/moon.html", "Read tonight's moon"],
    layout: "fengmoon",
    moonmini: { href: "/moon.html", title: "The Moon tonight", link: "Read it" },
    cols: [
      { title: "Tonight & the phases", mark: "☾", items: [
        ["/moon.html",          "The Moon tonight", PNAV.DYN.moonPhaseName(), null, "moon-phase"],
        ["/moon/phases/",       "The eight phases"],
        ["/moon/in-your-sign/", "Moon in your sign"]
      ]},
      { title: "Time it right", mark: "時", items: [
        ["/best-days.html", "Best days", "to begin and to rest"],
        ["/awakening.html", "The Awakening", "from fear to strength"],
        ["/chinese-zodiac/fire-horse-2026/", "Fire Horse 2026", "begins Feb 17"]
      ]},
      { title: "Moonlit stones", mark: "石", items: [
        ["/stones.html",                          "Keeper stones"],
        ["/traditions/birthstones-and-moonstone/", "Birthstones & moonstone"],
        ["/traditions/stones-for-your-animal/",    "Stones for your animal"]
      ]}
    ],
    chips: { label: "The eight phases", items: [
      ["/moon/phases/new-moon/",        "🌑", "New Moon"],
      ["/moon/phases/waxing-crescent/", "🌒", "Waxing Crescent"],
      ["/moon/phases/first-quarter/",   "🌓", "First Quarter"],
      ["/moon/phases/waxing-gibbous/",  "🌔", "Waxing Gibbous"],
      ["/moon/phases/full-moon/",       "🌕", "Full Moon"],
      ["/moon/phases/waning-gibbous/",  "🌖", "Waning Gibbous"],
      ["/moon/phases/last-quarter/",    "🌗", "Last Quarter"],
      ["/moon/phases/waning-crescent/", "🌘", "Waning Crescent"]
    ]}
  },
  { key: "bonds", h: "Bonds", accent: "rose",
    eyebrow: "Two skies read together, and the climb you share",
    foot: ["/year.html", "Find a friend's animal by birth year"],
    layout: "cards",
    items: [
      ["/match.html",  "Test a match",
        "Two birth dates go in. The bond comes back scored across the trines, the clashes, and the elements."],
      ["/vs.html",     "Challenge a friend",
        "Send your animal to someone and wonder out loud whether you match."],
      ["/circle.html", "Circle of three",
        "Compare two friends one to one, then read the whole group as a circle."]
    ],
    /* the Climb: the whole game in the nav. Tier names + thresholds are
       the TIERS ladder in js/zodi-auth.js; keep them in lockstep. Earn
       sources in the intro match the earn map in js/zodi-karma.js. No
       exchange language anywhere: this is merit, not currency. */
    climb: { label: "The Climb · Zodi Karma",
      intro: "Zodi Karma is the merit your animal gathers: the daily visit, the proverbs studied, the moons checked, the matches tested. It buys nothing. It only lifts you, station by station, from Wanderer to Blessed.",
      note: "Six stations in all — the full ladder lives on the Karmic Board.",
      ladder: [  /* nav teaser: three of the six stations; full ladder = TIERS in js/zodi-auth.js */
        ["✦", "Blessed by the Gods of Zodi", "100,000"],
        ["◉", "Awakened",    "10,000"],
        ["·", "Wanderer",    "0"]
      ],
      links: [
        ["/karmic-board.html", "The Karmic Board", "every soul ranked, overall and by zodiac year", "zodiac-day"],
        ["/account.html",      "Your Book of Karma", "every deed remembered, every point accounted"],
        ["/awakened.html",     "The Primal Mirror",  "the Awakened State, your animal's deeper form, kept for account holders"]
      ] }
  }
];

/* GEO guard: destinations the seven-group nav used to carry that the
   canvas panels no longer surface. They stay in the hidden pn-crawl
   static mirror (apply-nav.mjs appends them after the panel rows) so
   every page still links every hub for crawlers and AI fetchers. */
PNAV.CRAWL_EXTRA = [
  /* v3 demotions: Home's bar seat, the Moon group's eight phase rows, the
     stones row, Directions' Explore seat, and the old sage hero's yoga pill
     all left the visible panels; they stay here so every page still links
     them for crawlers and AI fetchers. */
  ["/",                              "Home"],
  ["/moon/phases/new-moon/",         "New Moon"],
  ["/moon/phases/waxing-crescent/",  "Waxing Crescent Moon"],
  ["/moon/phases/first-quarter/",    "First Quarter Moon"],
  ["/moon/phases/waxing-gibbous/",   "Waxing Gibbous Moon"],
  ["/moon/phases/full-moon/",        "Full Moon"],
  ["/moon/phases/waning-gibbous/",   "Waning Gibbous Moon"],
  ["/moon/phases/last-quarter/",     "Last Quarter Moon"],
  ["/moon/phases/waning-crescent/",  "Waning Crescent Moon"],
  ["/traditions/stones-for-your-animal/", "Stones for your animal"],
  ["/directions/",                   "The Directions"],
  ["/elements/chakras/yoga/",        "Chakra yoga"],
  ["/feng-shui/schools/",            "Feng shui schools"],
  ["/horoscopes/",                   "All horoscopes, sign by sign"],
  ["/feng-shui/five-elements/",      "The five phases"],
  ["/feng-shui/bagua/",              "The bagua"],
  ["/feng-shui/kua-number/",         "Your Kua number"],
  ["/feng-shui/your-animal/",        "Feng shui for your animal"],
  ["/directions/celestial-animals/", "The four celestial animals"],
  ["/cosmology/",                    "Cosmology"],
  ["/cosmology/four-pillars/",       "The Four Pillars"],
  ["/elements/",                     "The five phases (Elements hub)"],
  ["/destiny/bazi-four-pillars/",                         "BaZi, the Four Pillars of Destiny"],
  /* demoted from the Sage Wisdom "Four Pillars" column when Saju took its
     seat; still reachable via the bazi hub's "Read your own" dropdown. */
  ["/destiny/bazi-four-pillars/compatibility/",           "BaZi compatibility (合婚)"],
  ["/destiny/zi-wei-dou-shu/",              "Purple Star Astrology (Zi Wei Dou Shu)"],
  ["/destiny/zi-wei-dou-shu/chart/",        "Learn to read a Purple Star chart"],
  ["/destiny/zi-wei-dou-shu/stars/",        "The 14 major stars"],
  ["/destiny/zi-wei-dou-shu/palaces/",      "The 12 palaces"],
  ["/destiny/zi-wei-dou-shu/four-forces/",  "The Four Forces (Si Hua)"],
  ["/destiny/zi-wei-dou-shu/history/",      "Purple Star history & origins"],
  /* dropped when the standalone Menagerie group folded into Explore +
     Zodiac; keep it linked so no crawlable destination is lost. */
  ["/destiny/bazi-four-pillars/day-master/", "Your Day Master (日主)"],
  ["/destiny/bazi-four-pillars/ten-gods/",   "The Ten Gods (十神)"],
  ["/proverbs/study/",                       "Study the proverbs"],
  ["/learn.html",                    "How it works"]
];

PNAV.FEATURED = { href: "/circle.html", title: "Read your circle of three", blurb: "Compare two friends one to one, then read the whole group." };

/* Canonical origin for absolute URLs (breadcrumb JSON-LD, etc.).
   Client-side JS, so this stays a literal (it cannot import build/config.mjs).
   It must hold the SAME value as DOMAIN in build/config.mjs. PHASE 8 CUTOVER:
   flip this literal to https://www.zodianimal.com in lockstep with DOMAIN and the
   llms.txt URLs. The stale-origin gate in build/audit-links.mjs fails the
   build if this and DOMAIN ever disagree at ship time. */
PNAV.ORIGIN = "https://www.zodianimal.com";

/* Per-hub sub-navigation + breadcrumb source of truth.
   Keyed by the section's first path segment. Each hub:
     label  human breadcrumb text for the hub root crumb
     root   the hub landing URL (crumb 2 links here)
     items  sibling links for the sub-nav row, in display order.
            Each item is EITHER
              [href, label]            a plain sub-nav link, OR
              [href, label, children]  a sub-nav link that ALSO opens a
                                       dropdown of child links, where
                                       `children` is an array of [href, label].
            The parent [href] stays a real anchor (crawlable, no-JS still
            navigates to it); the children render as real anchors inside a
            .pn-subdrop. apply-nav.mjs marks aria-current="page" on whichever
            anchor (parent OR a child) matches the current page, and tags the
            parent <li> with class pn-has-current when a child is the match so
            CSS can light the trail. The item whose href equals the hub root
            ("Overview") is DROPPED from the visible sub-nav row (the breadcrumb
            + JSON-LD still link hub.root). An empty items[] suppresses the
            sub-nav row entirely and emits only the breadcrumb.
   The build (apply-nav.mjs) reads this to inject the pn-sub bar and the
   BreadcrumbList JSON-LD, so the visible trail and the schema never drift.
   Copy rule: no arrows, no dashes in any label. */
PNAV.HUBS = {
  "western-zodiac": {
    label: "Western Zodiac", root: "/western-zodiac/",
    items: [
      ["/western-zodiac/", "Overview"],
      ["/western-zodiac/aries/", "Aries"],
      ["/western-zodiac/taurus/", "Taurus"],
      ["/western-zodiac/gemini/", "Gemini"],
      ["/western-zodiac/cancer/", "Cancer"],
      ["/western-zodiac/leo/", "Leo"],
      ["/western-zodiac/virgo/", "Virgo"],
      ["/western-zodiac/libra/", "Libra"],
      ["/western-zodiac/scorpio/", "Scorpio"],
      ["/western-zodiac/sagittarius/", "Sagittarius"],
      ["/western-zodiac/capricorn/", "Capricorn"],
      ["/western-zodiac/aquarius/", "Aquarius"],
      ["/western-zodiac/pisces/", "Pisces"]
    ]
  },
  "chinese-zodiac": {
    label: "Chinese Zodiac", root: "/chinese-zodiac/",
    items: [
      ["/chinese-zodiac/", "Overview"],
      ["/chinese-zodiac/rat/", "Rat"],
      ["/chinese-zodiac/ox/", "Ox"],
      ["/chinese-zodiac/tiger/", "Tiger"],
      ["/chinese-zodiac/rabbit/", "Rabbit"],
      ["/chinese-zodiac/dragon/", "Dragon"],
      ["/chinese-zodiac/snake/", "Snake"],
      ["/chinese-zodiac/horse/", "Horse"],
      ["/chinese-zodiac/goat/", "Goat"],
      ["/chinese-zodiac/monkey/", "Monkey"],
      ["/chinese-zodiac/rooster/", "Rooster"],
      ["/chinese-zodiac/dog/", "Dog"],
      ["/chinese-zodiac/pig/", "Pig"]
    ]
  },
  "zodiac": {
    label: "Zodiac crossings", root: "/zodiac/",
    items: [
      ["/zodiac/", "The 144 grid"],
      ["/zodiac/what-is-my-primal-zodiac-animal/", "How the crossing works"],
      ["/year.html", "Year finder"]
    ]
  },
  "horoscopes": {
    label: "Horoscopes", root: "/horoscopes/",
    items: [
      ["/horoscopes/", "Overview"],
      ["/daily.html", "Today"],
      ["/horoscopes/daily/", "Daily readings"],
      ["/best-days.html", "Best days"],
      ["/moon.html", "The Moon"]
    ]
  },
  "proverbs": {
    /* Sibling sub-nav for the twelve ponds, ordered to mirror the mega-nav
       panel: the whole collection first, then the Self, People, and World
       ponds in the same run, then Study. Labels are the plain keywords so
       the anchor text wins the plain search. */
    label: "Chinese Proverbs", root: "/proverbs/",
    items: [
      /* Overview (/proverbs/ root) is dropped from the visible row by apply-nav;
         the breadcrumb still links it. The twelve ponds are grouped into Self /
         People / World dropdowns so the whole collection is reachable without a
         long flat scroller (parent href = the group's first pond). */
      ["/proverbs/", "All 87"],
      ["/proverbs/study/", "Study"],
      ["/proverbs/the-way-of-water/", "Self", [
        ["/proverbs/the-way-of-water/", "The Tao"],
        ["/proverbs/timing-and-fortune/", "Fate"],
        ["/proverbs/perseverance/", "Perseverance"],
        ["/proverbs/courage/", "Courage"]
      ]],
      ["/proverbs/home-and-family/", "People", [
        ["/proverbs/home-and-family/", "Family"],
        ["/proverbs/friendship-and-trust/", "Friendship"],
        ["/proverbs/wisdom-and-learning/", "Wisdom"],
        ["/proverbs/humility-and-self-mastery/", "Humility"]
      ]],
      ["/proverbs/wealth-and-work/", "World", [
        ["/proverbs/wealth-and-work/", "Money"],
        ["/proverbs/nature-and-seasons/", "Health"],
        ["/proverbs/harmony-and-virtue/", "Harmony"],
        ["/proverbs/adversity-and-resilience/", "Adversity"]
      ]]
    ]
  },
  "feng-shui": {
    label: "Feng Shui", root: "/feng-shui/",
    items: [
      /* Overview (the /feng-shui/ root) is dropped from the visible row by
         apply-nav; the breadcrumb still links it. The flat 16 spokes are
         regrouped into parent items with dropdowns of their child links. */
      ["/feng-shui/", "Overview"],
      ["/feng-shui/bagua/", "The bagua", [
        ["/feng-shui/bagua/", "Bagua map"],
        ["/feng-shui/eight-directions/", "Eight directions"],
        ["/feng-shui/compass/", "Compass"],
        ["/feng-shui/flying-stars/", "Flying stars"]
      ]],
      ["/feng-shui/five-elements/", "Five phases", [
        ["/feng-shui/five-elements/", "Five phases"],
        ["/feng-shui/yin-yang/", "Yin and yang"]
      ]],
      ["/feng-shui/kua-number/", "Your Kua", [
        ["/feng-shui/kua-number/", "Kua number"],
        ["/feng-shui/your-animal/", "Your animal"]
      ]],
      ["/feng-shui/bedroom/", "In the home", [
        ["/feng-shui/bedroom/", "Bedroom"],
        ["/feng-shui/commanding-position/", "Commanding position"],
        ["/feng-shui/front-door/", "Front door"],
        ["/feng-shui/office-desk/", "Office and desk"],
        ["/feng-shui/wealth-corner/", "Wealth corner"],
        ["/feng-shui/colors/", "Colors"]
      ]],
      ["/feng-shui/schools/", "Lineage", [
        ["/feng-shui/schools/", "Schools"],
        ["/feng-shui/lineage/", "Lineage"]
      ]]
    ]
  },
  "directions": {
    label: "The Directions", root: "/directions/",
    items: [
      ["/directions/", "Overview"],
      ["/directions/celestial-animals/", "Celestial animals"],
      ["/directions/commanding-position/", "Commanding position"]
    ]
  },
  "cosmology": {
    label: "Cosmology", root: "/cosmology/",
    items: [
      ["/cosmology/", "Overview"],
      ["/cosmology/yijing/", "Yijing"],
      ["/cosmology/stems-and-branches/", "Stems and branches"],
      ["/cosmology/four-pillars/", "Four Pillars"],
      ["/cosmology/luoshu/", "Luo Shu"]
    ]
  },
  "destiny/bazi-four-pillars": {
    label: "BaZi", root: "/destiny/bazi-four-pillars/",
    items: [
      ["/destiny/bazi-four-pillars/", "What is BaZi"],
      ["/destiny/bazi-four-pillars/four-pillars/", "Learn the pieces", [
        ["/destiny/bazi-four-pillars/four-pillars/", "1 · The four pillars"],
        ["/destiny/bazi-four-pillars/heavenly-stems/", "2 · The ten stems"],
        ["/destiny/bazi-four-pillars/earthly-branches/", "3 · The twelve branches"],
        ["/destiny/bazi-four-pillars/hidden-stems/", "4 · Hidden stems"]
      ]],
      ["/destiny/bazi-four-pillars/day-master/", "Learn to read", [
        ["/destiny/bazi-four-pillars/day-master/", "5 · Your Day Master"],
        ["/destiny/bazi-four-pillars/ten-gods/", "6 · The Ten Gods"],
        ["/destiny/bazi-four-pillars/interactions/", "7 · Combinations & clashes"],
        ["/destiny/bazi-four-pillars/luck-pillars/", "8 · Luck & timing"]
      ]],
      ["/destiny/bazi-four-pillars/chart/", "Read your own", [
        ["/destiny/bazi-four-pillars/chart/", "Cast your chart"],
        ["/destiny/bazi-four-pillars/compatibility/", "You & them (合婚)"],
        ["/destiny/bazi-four-pillars/#example", "A worked example"]
      ]]
    ]
  },
  "elements": {
    label: "The Elements", root: "/elements/",
    items: [
      ["/elements/", "The five phases"],
      ["/elements/phases/wood/", "Wood 木", [
        { group: "The phase", items: [
          ["/elements/phases/wood/", "Wood overview"],
          ["/elements/phases/wood/big-small/", "Big & small wood 甲乙"]
        ]},
        { group: "In chart & body", items: [
          ["/elements/phases/wood/bazi/", "Wood in BaZi"],
          ["/elements/phases/wood/body/", "Wood in the body"],
          ["/elements/phases/wood/space/", "Wood in your space"]
        ]},
        { group: "How it moves", items: [
          ["/elements/phases/wood/cycles/", "Wood's two cycles"],
          ["/elements/phases/wood/animals/", "The Wood animals"]
        ]},
        { group: "Myth & lore", items: [
          ["/elements/phases/wood/culture/", "Wood in myth"],
          ["/elements/phases/wood/traditions/", "Wood across traditions"]
        ]}
      ]],
      ["/elements/phases/fire/", "Fire 火", [
        { group: "The phase", items: [
          ["/elements/phases/fire/", "Fire overview"],
          ["/elements/phases/fire/big-small/", "Big & small fire 丙丁"]
        ]},
        { group: "In chart & body", items: [
          ["/elements/phases/fire/bazi/", "Fire in BaZi"],
          ["/elements/phases/fire/body/", "Fire in the body"],
          ["/elements/phases/fire/space/", "Fire in your space"]
        ]},
        { group: "How it moves", items: [
          ["/elements/phases/fire/cycles/", "Fire's two cycles"],
          ["/elements/phases/fire/animals/", "The Fire animals"]
        ]},
        { group: "Myth & lore", items: [
          ["/elements/phases/fire/culture/", "Fire in myth"],
          ["/elements/phases/fire/traditions/", "Fire across traditions"]
        ]}
      ]],
      ["/elements/phases/earth/", "Earth 土", [
        { group: "The phase", items: [
          ["/elements/phases/earth/", "Earth overview"],
          ["/elements/phases/earth/big-small/", "Big & small earth 戊己"]
        ]},
        { group: "In chart & body", items: [
          ["/elements/phases/earth/bazi/", "Earth in BaZi"],
          ["/elements/phases/earth/body/", "Earth in the body"],
          ["/elements/phases/earth/space/", "Earth in your space"]
        ]},
        { group: "How it moves", items: [
          ["/elements/phases/earth/cycles/", "Earth's two cycles"],
          ["/elements/phases/earth/animals/", "The Earth animals"]
        ]},
        { group: "Myth & lore", items: [
          ["/elements/phases/earth/culture/", "Earth in myth"],
          ["/elements/phases/earth/traditions/", "Earth across traditions"]
        ]}
      ]],
      ["/elements/phases/metal/", "Metal 金", [
        { group: "The phase", items: [
          ["/elements/phases/metal/", "Metal overview"],
          ["/elements/phases/metal/big-small/", "Big & small metal 庚辛"]
        ]},
        { group: "In chart & body", items: [
          ["/elements/phases/metal/bazi/", "Metal in BaZi"],
          ["/elements/phases/metal/body/", "Metal in the body"],
          ["/elements/phases/metal/space/", "Metal in your space"]
        ]},
        { group: "How it moves", items: [
          ["/elements/phases/metal/cycles/", "Metal's two cycles"],
          ["/elements/phases/metal/animals/", "The Metal animals"]
        ]},
        { group: "Myth & lore", items: [
          ["/elements/phases/metal/culture/", "Metal in myth"],
          ["/elements/phases/metal/traditions/", "Metal across traditions"]
        ]}
      ]],
      ["/elements/phases/water/", "Water 水", [
        { group: "The phase", items: [
          ["/elements/phases/water/", "Water overview"],
          ["/elements/phases/water/big-small/", "Big & small water 壬癸"]
        ]},
        { group: "In chart & body", items: [
          ["/elements/phases/water/bazi/", "Water in BaZi"],
          ["/elements/phases/water/body/", "Water in the body"],
          ["/elements/phases/water/space/", "Water in your space"]
        ]},
        { group: "How it moves", items: [
          ["/elements/phases/water/cycles/", "Water's two cycles"],
          ["/elements/phases/water/animals/", "The Water animals"]
        ]},
        { group: "Myth & lore", items: [
          ["/elements/phases/water/culture/", "Water in myth"],
          ["/elements/phases/water/traditions/", "Water across traditions"]
        ]}
      ]],
      ["/elements/#cycles", "The two cycles"],
      ["/elements/#quiz", "What's your element?"],
      ["/elements/zodiac/", "Elements & your animal"]
    ]
  },
  // Nested hub: Zi Wei Dou Shu (Purple Star Astrology) pages resolve here
  // (not to "elements") via the longest-prefix match in resolveHub. The hub
  // root is auto-dropped as a tab but still carries the crumb.
  "destiny/zi-wei-dou-shu": {
    label: "Purple Star (Zi Wei Dou Shu)", root: "/destiny/zi-wei-dou-shu/",
    items: [
      ["/destiny/zi-wei-dou-shu/", "Overview"],
      ["/destiny/zi-wei-dou-shu/background/", "The tradition (background)"],
      ["/destiny/zi-wei-dou-shu/history/", "History & origins 源流 Yuánliú"],
      ["/destiny/zi-wei-dou-shu/palaces/", "The 12 Palaces 十二宫 Shí'èr Gōng"],
      ["/destiny/zi-wei-dou-shu/stars/", "The 14 Stars 主星 Zhǔxīng", [
        ["/destiny/zi-wei-dou-shu/stars/", "All 14 major stars 十四主星"],
        ["/destiny/zi-wei-dou-shu/stars/zi-wei/", "紫微 Zǐwēi · The Emperor"],
        ["/destiny/zi-wei-dou-shu/stars/tian-ji/", "天机 Tiānjī · The Strategist"],
        ["/destiny/zi-wei-dou-shu/stars/tai-yang/", "太阳 Tàiyáng · The Sun"],
        ["/destiny/zi-wei-dou-shu/stars/wu-qu/", "武曲 Wǔqū · The Finance General"],
        ["/destiny/zi-wei-dou-shu/stars/tian-tong/", "天同 Tiāntóng · The Harmony Star"],
        ["/destiny/zi-wei-dou-shu/stars/lian-zhen/", "廉贞 Liánzhēn · The Diplomat"],
        ["/destiny/zi-wei-dou-shu/stars/tian-fu/", "天府 Tiānfǔ · The Treasury"],
        ["/destiny/zi-wei-dou-shu/stars/tai-yin/", "太阴 Tàiyīn · The Moon Star"],
        ["/destiny/zi-wei-dou-shu/stars/tan-lang/", "贪狼 Tānláng · The Desire Star"],
        ["/destiny/zi-wei-dou-shu/stars/ju-men/", "巨门 Jùmén · The Dark Gate"],
        ["/destiny/zi-wei-dou-shu/stars/tian-xiang/", "天相 Tiānxiàng · The Prime Minister"],
        ["/destiny/zi-wei-dou-shu/stars/tian-liang/", "天梁 Tiānliáng · The Elder"],
        ["/destiny/zi-wei-dou-shu/stars/qi-sha/", "七杀 Qīshā · The Warrior"],
        ["/destiny/zi-wei-dou-shu/stars/po-jun/", "破军 Pòjūn · The Vanguard"]
      ]],
      ["/destiny/zi-wei-dou-shu/four-forces/", "The Four Forces 四化 Sìhuà"],
      ["/destiny/zi-wei-dou-shu/chart/", "Read a chart 命盘 Mìngpán"]
    ]
  },
  // Nested hub: chakra + yoga pages resolve here (not to "elements") via the
  // longest-prefix match in resolveHub. Seven chakra tabs, each a small
  // Overview · Yoga dropdown, led by the Chakra-yoga entry. The hub root
  // ("All 7 chakras") is auto-dropped as a tab but still carries the crumb.
  "elements/chakras": {
    label: "Chakras", root: "/elements/chakras/",
    items: [
      ["/elements/chakras/", "All 7 chakras"],
      ["/elements/chakras/yoga/", "Chakra yoga"],
      ["/elements/chakras/muladhara/", "Muladhara", [
        ["/elements/chakras/muladhara/", "Overview"],
        ["/elements/chakras/muladhara/yoga/", "Yoga"]
      ]],
      ["/elements/chakras/svadhisthana/", "Svadhisthana", [
        ["/elements/chakras/svadhisthana/", "Overview"],
        ["/elements/chakras/svadhisthana/yoga/", "Yoga"]
      ]],
      ["/elements/chakras/manipura/", "Manipura", [
        ["/elements/chakras/manipura/", "Overview"],
        ["/elements/chakras/manipura/yoga/", "Yoga"]
      ]],
      ["/elements/chakras/anahata/", "Anahata", [
        ["/elements/chakras/anahata/", "Overview"],
        ["/elements/chakras/anahata/yoga/", "Yoga"]
      ]],
      ["/elements/chakras/vishuddha/", "Vishuddha", [
        ["/elements/chakras/vishuddha/", "Overview"],
        ["/elements/chakras/vishuddha/yoga/", "Yoga"]
      ]],
      ["/elements/chakras/ajna/", "Ajna", [
        ["/elements/chakras/ajna/", "Overview"],
        ["/elements/chakras/ajna/yoga/", "Yoga"]
      ]],
      ["/elements/chakras/sahasrara/", "Sahasrara", [
        ["/elements/chakras/sahasrara/", "Overview"],
        ["/elements/chakras/sahasrara/yoga/", "Yoga"]
      ]]
    ]
  },
  // Nested hub: Korean Saju Palja resolves here (not to "elements") via the
  // longest-prefix match in resolveHub, so the Saju page keeps its OWN
  // breadcrumb + BreadcrumbList instead of inheriting the Elements
  // (Wood/Fire/Earth…) sub-nav it currently falls through to. Framing per
  // docs/saju/BAZI-SAJU-RELATIONSHIP-AND-FRAMING.md: Saju is a sibling
  // tradition of BaZi, not "the Korean version," so it earns its own crumb.
  //
  // items:[] TODAY: only /destiny/korean-saju/ exists on disk — one rich single
  // page. A grouped bazi-shape sub-nav cannot render yet: apply-nav's
  // Overview filter drops any /destiny/korean-saju/#anchor top-level item (norm()
  // strips the hash, so every anchor equals the hub root), and the
  // docs/saju-v2 spokes (chart/, four-pillars/, ten-gods/, korean-words/…)
  // are NOT built — listing them would 404 audit-links. When a real spoke
  // ships, upgrade to the grouped shape, e.g.:
  //   items: [
  //     ["/destiny/korean-saju/chart/", "Cast your Saju", [
  //       ["/destiny/korean-saju/chart/", "Cast your chart"],
  //       ["/destiny/korean-saju/#report", "A worked example"]
  //     ]],
  //     ["/destiny/korean-saju/four-pillars/", "Learn the pieces", [ ... ]]
  //   ]
  // For now the empty items[] emits only the breadcrumb + JSON-LD (enough to
  // un-orphan the page in the hierarchy); the human entry point is the Sage
  // Wisdom "Four Pillars" column row.
  "elements/saju": {
    label: "Saju Palja", root: "/destiny/korean-saju/",
    items: []
  },
  "moon": {
    label: "The Moon", root: "/moon.html",
    items: [
      ["/moon.html", "Tonight"],
      ["/moon/phases/", "The eight phases", [
        ["/moon/phases/new-moon/", "New"],
        ["/moon/phases/waxing-crescent/", "Waxing crescent"],
        ["/moon/phases/first-quarter/", "First quarter"],
        ["/moon/phases/waxing-gibbous/", "Waxing gibbous"],
        ["/moon/phases/full-moon/", "Full"],
        ["/moon/phases/waning-gibbous/", "Waning gibbous"],
        ["/moon/phases/last-quarter/", "Last quarter"],
        ["/moon/phases/waning-crescent/", "Waning crescent"]
      ]],
      ["/moon/in-your-sign/", "Moon in your sign"],
      ["/best-days.html", "Best days"]
    ]
  },
  "traditions": {
    label: "Traditions", root: "/traditions/",
    items: [
      ["/traditions/", "Overview"],
      ["/traditions/levantine-moon/", "Moon lore", [
        ["/traditions/levantine-moon/", "Levantine moon"],
        ["/traditions/moon-cycles/", "Moon cycles"],
        ["/traditions/moonlight-charging/", "Moonlight charging"],
        ["/traditions/moon-body/", "The moon body"]
      ]],
      ["/traditions/birthstones-and-moonstone/", "Stones and earth", [
        ["/traditions/birthstones-and-moonstone/", "Birthstones and moonstone"],
        ["/traditions/fossils-sacred-earth/", "Fossils and sacred earth"],
        ["/traditions/stones-for-your-animal/", "Stones for your animal"]
      ]],
      ["/traditions/psychic-practices/", "Psychic practices"]
    ]
  }
};
