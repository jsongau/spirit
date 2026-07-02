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
  return { todayLabel: todayLabel, moonPhaseName: moonPhaseName,
           yearBand: yearBand, moonInfo: moonInfo };
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
  { key: "find", h: "Find yours", cls: "pn-find", accent: "brass",
    layout: "list",
    items: [
      ["/index.html#read", "Find yours"]
    ]
  },
  { key: "explore", h: "Explore", accent: "teal",
    eyebrow: "Everything the wheel opens, one animal at the center",
    foot: ["/menagerie.html", "See all 144 animals"],
    layout: "explore",
    cols: [
      { title: "Begin", mark: "✦", items: [
        ["/index.html",   "Find your animal"],
        ["/daily.html",   "Today's reading", PNAV.DYN.todayLabel(), null, "date-today"],
        ["/year.html",    "Year finder"],
        ["/account.html", "Your account", "opening soon"]
      ]},
      { title: "Menagerie", mark: "◆", items: [
        ["/menagerie.html",  "All 144 animals"],
        ["/western-zodiac/", "Western wing"],
        ["/chinese-zodiac/", "Eastern wing"],
        ["/zodiac/",         "Zodiac crossings"],
        ["/menagerie.html",  "Rare crossings"]
      ]},
      { title: "The Moon", mark: "☾", items: [
        ["/moon.html",        "The Moon tonight", PNAV.DYN.moonPhaseName(), null, "moon-phase"],
        ["/moon/phases/",     "The eight phases"],
        ["/moon/in-your-sign/", "Moon in your sign"],
        ["/best-days.html",   "Best days"],
        ["/chinese-zodiac/fire-horse-2026/", "Fire Horse 2026", "begins Feb 17"]
      ]},
      { title: "Live with it", mark: "⌂", items: [
        ["/feng-shui/",   "Feng shui"],
        ["/habitat/",     "The Habitat"],
        ["/stones.html",  "Keeper stones"],
        ["/directions/",  "Directions"],
        ["/traditions/",  "Traditions", "moon, stones, heritage"]
        /* "The Soft Habitat" book: no page exists yet and apply-nav has
           no `soon` slot, so it is omitted until the page ships. */
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
    feature: { eyebrow: "The year turns", title: "Year of the Fire Horse",
      body: "2026. Once in sixty years the Horse catches fire, a year that rewards the bold and scorches the hesitant. If the Horse is yours, this is your decade's hinge.",
      href: "/chinese-zodiac/fire-horse-2026/", link: "Read the Fire Horse", watermark: "馬" },
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
      link: "Read today's horoscope", today: true },
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
  { key: "sage", h: "Sage Wisdom", accent: "jade",
    eyebrow: "The craft, what you do with your animal",
    foot: ["/feng-shui/", "All of feng shui"],
    layout: "sage",
    cta: { tag: "Free · Feng Shui e-book", title: "Your animal's placement guide",
      body: "Where to sleep, work, and rest, mapped to your animal. Free when you create a Zodi account.",
      href: "/account.html", link: "Create free account", note: "opening soon" },
    cols: [
      { title: "Stones", mark: "◆", items: [
        ["/stones.html",                             "Keeper stones"],
        ["/traditions/birthstones-and-moonstone/",   "Birthstones and moonstone"],
        ["/traditions/stones-for-your-animal/",      "Stones for your animal"]
      ]},
      { title: "Feng shui", mark: "卦", items: [
        ["/feng-shui/bagua/",       "The bagua"],
        ["/feng-shui/five-elements/", "Five phases"],
        ["/feng-shui/kua-number/",  "Your Kua number"],
        ["/directions/",            "Directions"]
      ]},
      { title: "Proverbs and lore", mark: "❦", items: [
        ["/proverbs/",    "The Proverb Pond", "Chinese proverbs, pronounced"],
        ["/traditions/",  "Traditions"],
        ["/habitat/",     "The Habitat"]
      ]},
      { title: "The Proverb Pond, by theme", mark: "❦", items: [
        ["/proverbs/wealth-and-work/",            "Money and work"],
        ["/proverbs/home-and-family/",            "Family and roots"],
        ["/proverbs/nature-and-seasons/",         "Health and nature"],
        ["/proverbs/friendship-and-trust/",       "Friendship and trust"],
        ["/proverbs/the-way-of-water/",           "The way of water"],
        ["/proverbs/timing-and-fortune/",         "Fate and fortune"],
        ["/proverbs/perseverance/",               "Perseverance"],
        ["/proverbs/courage/",                    "Courage"],
        ["/proverbs/wisdom-and-learning/",        "Wisdom and learning"],
        ["/proverbs/harmony-and-virtue/",         "Harmony and virtue"],
        ["/proverbs/humility-and-self-mastery/",  "Humility"],
        ["/proverbs/adversity-and-resilience/",   "Adversity"]
      ]}
    ]
  },
  { key: "bonds", h: "Bonds", accent: "rose",
    eyebrow: "Two skies, read together",
    foot: ["/year.html", "Find a friend's animal by birth year"],
    layout: "cards",
    items: [
      ["/match.html",  "Test a match",
        "Two birth dates go in. The bond comes back scored across the trines, the clashes, and the elements."],
      ["/vs.html",     "Challenge a friend",
        "Send your animal to someone and wonder out loud whether you match."],
      ["/circle.html", "Circle of three",
        "Compare two friends one to one, then read the whole group as a circle."]
    ]
  },
  { key: "moon", h: "Moon", accent: "silver",
    eyebrow: "The Moon overhead, its phases, and the path they light.",
    foot: ["/moon.html", "Read the Moon tonight in full"],
    layout: "moon",
    cols: [
      { title: "Tonight", mark: "☾", items: [
        ["/moon.html",      "The Moon tonight", PNAV.DYN.moonPhaseName(), "moon-full", "moon-phase"],
        ["/best-days.html", "Best days ahead",  "the favorable days for you"],
        ["/awakening.html", "The Awakening",    "the path from fear to strength"]
      ]},
      { title: "The eight phases", mark: "◐", items: [
        ["/moon/phases/new-moon/",        "New Moon",        null, "moon-new"],
        ["/moon/phases/waxing-crescent/", "Waxing Crescent", null, "moon-waxing-crescent"],
        ["/moon/phases/first-quarter/",   "First Quarter",   null, "moon-first-quarter"],
        ["/moon/phases/waxing-gibbous/",  "Waxing Gibbous",  null, "moon-waxing-gibbous"],
        ["/moon/phases/full-moon/",       "Full Moon",       null, "moon-full"],
        ["/moon/phases/waning-gibbous/",  "Waning Gibbous",  null, "moon-waning-gibbous"],
        ["/moon/phases/last-quarter/",    "Last Quarter",    null, "moon-last-quarter"],
        ["/moon/phases/waning-crescent/", "Waning Crescent", null, "moon-waning-crescent"]
      ]}
    ]
  }
];

/* GEO guard: destinations the seven-group nav used to carry that the
   canvas panels no longer surface. They stay in the hidden pn-crawl
   static mirror (apply-nav.mjs appends them after the panel rows) so
   every page still links every hub for crawlers and AI fetchers. */
PNAV.CRAWL_EXTRA = [
  ["/horoscopes/",                   "All horoscopes, sign by sign"],
  ["/feng-shui/five-elements/",      "The five phases"],
  ["/feng-shui/bagua/",              "The bagua"],
  ["/feng-shui/kua-number/",         "Your Kua number"],
  ["/feng-shui/your-animal/",        "Feng shui for your animal"],
  ["/directions/celestial-animals/", "The four celestial animals"],
  ["/cosmology/",                    "Cosmology"],
  ["/cosmology/four-pillars/",       "The Four Pillars"],
  ["/elements/fire/",                "The five elements"],
  /* dropped when the standalone Menagerie group folded into Explore +
     Zodiac; keep it linked so no crawlable destination is lost. */
  ["/learn.html",                    "How it works"]
];

PNAV.FEATURED = { href: "/circle.html", title: "Read your circle of three", blurb: "Compare two friends one to one, then read the whole group." };

/* Canonical origin for absolute URLs (breadcrumb JSON-LD, etc.).
   Client-side JS, so this stays a literal (it cannot import build/config.mjs).
   It must hold the SAME value as DOMAIN in build/config.mjs. PHASE 8 CUTOVER:
   flip this literal to https://zodianimal.com in lockstep with DOMAIN and the
   llms.txt URLs. The stale-origin gate in build/audit-links.mjs fails the
   build if this and DOMAIN ever disagree at ship time. */
PNAV.ORIGIN = "https://spirit-omega.vercel.app";

/* Per-hub sub-navigation + breadcrumb source of truth.
   Keyed by the section's first path segment. Each hub:
     label  human breadcrumb text for the hub root crumb
     root   the hub landing URL (crumb 2 links here)
     items  sibling links for the sub-nav row, in display order.
            The item whose href matches the current page is marked
            aria-current="page". An empty items[] suppresses the sub-nav
            row and emits only the breadcrumb.
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
      ["/best-days.html", "Best days"],
      ["/moon.html", "The Moon"]
    ]
  },
  "proverbs": {
    label: "Chinese Proverbs", root: "/proverbs/",
    items: [
      ["/proverbs/", "All 87"],
      ["/proverbs/wealth-and-work/", "Money"],
      ["/proverbs/home-and-family/", "Family"],
      ["/proverbs/nature-and-seasons/", "Health"],
      ["/proverbs/friendship-and-trust/", "Friendship"],
      ["/proverbs/the-way-of-water/", "The Tao"],
      ["/proverbs/timing-and-fortune/", "Fate"],
      ["/proverbs/perseverance/", "Perseverance"],
      ["/proverbs/courage/", "Courage"],
      ["/proverbs/wisdom-and-learning/", "Wisdom"],
      ["/proverbs/harmony-and-virtue/", "Harmony"],
      ["/proverbs/humility-and-self-mastery/", "Humility"],
      ["/proverbs/adversity-and-resilience/", "Adversity"],
      ["/proverbs/study/", "Study"]
    ]
  },
  "feng-shui": {
    label: "Feng Shui", root: "/feng-shui/",
    items: [
      ["/feng-shui/", "Overview"],
      ["/feng-shui/five-elements/", "Five phases"],
      ["/feng-shui/yin-yang/", "Yin and yang"],
      ["/feng-shui/bagua/", "Bagua"],
      ["/feng-shui/eight-directions/", "Eight directions"],
      ["/feng-shui/compass/", "Compass"],
      ["/feng-shui/schools/", "Schools"],
      ["/feng-shui/flying-stars/", "Flying stars"],
      ["/feng-shui/kua-number/", "Kua number"],
      ["/feng-shui/lineage/", "Lineage"],
      ["/feng-shui/your-animal/", "Your animal"],
      ["/feng-shui/bedroom/", "Bedroom"],
      ["/feng-shui/front-door/", "Front door"],
      ["/feng-shui/colors/", "Colors"],
      ["/feng-shui/office-desk/", "Office and desk"],
      ["/feng-shui/wealth-corner/", "Wealth corner"]
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
  "elements": {
    label: "The Elements", root: "/elements/fire/",
    items: [
      ["/elements/fire/", "Fire"],
      ["/elements/earth/", "Earth"],
      ["/elements/air/", "Air"],
      ["/elements/water/", "Water"]
    ]
  },
  "moon": {
    label: "The Moon", root: "/moon.html",
    items: [
      ["/moon.html", "Tonight"],
      ["/moon/phases/", "The eight phases"],
      ["/moon/in-your-sign/", "Moon in your sign"],
      ["/moon/phases/new-moon/", "New"],
      ["/moon/phases/waxing-crescent/", "Waxing crescent"],
      ["/moon/phases/first-quarter/", "First quarter"],
      ["/moon/phases/waxing-gibbous/", "Waxing gibbous"],
      ["/moon/phases/full-moon/", "Full"],
      ["/moon/phases/waning-gibbous/", "Waning gibbous"],
      ["/moon/phases/last-quarter/", "Last quarter"],
      ["/moon/phases/waning-crescent/", "Waning crescent"],
      ["/best-days.html", "Best days"]
    ]
  },
  "traditions": {
    label: "Traditions", root: "/traditions/",
    items: [
      ["/traditions/", "Overview"],
      ["/traditions/levantine-moon/", "Levantine moon"],
      ["/traditions/moon-cycles/", "Moon cycles"],
      ["/traditions/moonlight-charging/", "Moonlight charging"],
      ["/traditions/birthstones-and-moonstone/", "Birthstones and moonstone"],
      ["/traditions/fossils-sacred-earth/", "Fossils and sacred earth"],
      ["/traditions/psychic-practices/", "Psychic practices"],
      ["/traditions/moon-body/", "The moon body"],
      ["/traditions/stones-for-your-animal/", "Stones for your animal"]
    ]
  }
};
