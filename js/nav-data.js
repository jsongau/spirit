/* THE PRIMAL ORACLE — navigation site map (v2). Data only, on window.PNAV. */
window.PNAV = window.PNAV || { features: {} };

/* Seven-group card-free glyph mega-nav (doc 03 section 2).
   Each group:
     key      stable id (also the panel data-group anchor family)
     h        bar label (also the panel aria-label)
     accent   per-domain accent ramp: jade | silver | amethyst | rose | teal | brass
     eyebrow  optional lede sentence at the top of the panel
     foot     optional [href, label] closing link line
     layout   "list" | "two-col" | "three-col" — a CSS class only, no logic
     cols     optional array of {title?, items:[...]} for multi-column panels;
              when absent, `items` is treated as one implicit column.
     items    item = [href, name, sub?, glyph?]
                href   real destination (always a literal <a href> in served HTML)
                name   serif row name
                sub    optional muted sub-label (date band, trait word, note)
                glyph  optional key into PNAV.GLYPHS (data/glyphs-inline.json)
   Copy rule: no arrows, no dashes; date bands read "Mar 21 to Apr 19". */
PNAV.MAP = [
  { key: "oracle", h: "The Oracle", accent: "brass",
    eyebrow: "Read your birthday into one of 144 animals.",
    layout: "two-col",
    cols: [
      { title: "Begin", items: [
        ["/index.html", "Find your animal"],
        ["/menagerie.html", "All 144 animals"],
        ["/year.html", "Year finder"],
        ["/learn.html", "What is a Primal Animal"]
      ]},
      { title: "Together", items: [
        ["/circle.html", "Circle of three"],
        ["/match.html", "Test a match"],
        ["/vs.html", "Challenge a friend"]
      ]}
    ]
  },
  { key: "western", h: "Western Signs", accent: "amethyst",
    eyebrow: "Your Sun sign, the outer half of your animal.",
    foot: ["/western-zodiac/", "The whole Western wheel"],
    layout: "two-col",
    items: [
      ["/western-zodiac/aries/",       "Aries",       "Mar 21 to Apr 19", "aries"],
      ["/western-zodiac/taurus/",      "Taurus",      "Apr 20 to May 20", "taurus"],
      ["/western-zodiac/gemini/",      "Gemini",      "May 21 to Jun 20", "gemini"],
      ["/western-zodiac/cancer/",      "Cancer",      "Jun 21 to Jul 22", "cancer"],
      ["/western-zodiac/leo/",         "Leo",         "Jul 23 to Aug 22", "leo"],
      ["/western-zodiac/virgo/",       "Virgo",       "Aug 23 to Sep 22", "virgo"],
      ["/western-zodiac/libra/",       "Libra",       "Sep 23 to Oct 22", "libra"],
      ["/western-zodiac/scorpio/",     "Scorpio",     "Oct 23 to Nov 21", "scorpio"],
      ["/western-zodiac/sagittarius/", "Sagittarius", "Nov 22 to Dec 21", "sagittarius"],
      ["/western-zodiac/capricorn/",   "Capricorn",   "Dec 22 to Jan 19", "capricorn"],
      ["/western-zodiac/aquarius/",    "Aquarius",    "Jan 20 to Feb 18", "aquarius"],
      ["/western-zodiac/pisces/",      "Pisces",      "Feb 19 to Mar 20", "pisces"]
    ]
  },
  { key: "chinese", h: "Chinese Years", accent: "jade",
    eyebrow: "Your birth year, the inner half of your animal.",
    foot: ["/chinese-zodiac/", "The whole Chinese cycle"],
    layout: "two-col",
    items: [
      ["/chinese-zodiac/rat/",     "Rat",     "quick",  "rat"],
      ["/chinese-zodiac/ox/",      "Ox",      "steady", "ox"],
      ["/chinese-zodiac/tiger/",   "Tiger",   "bold",   "tiger"],
      ["/chinese-zodiac/rabbit/",  "Rabbit",  "gentle", "rabbit"],
      ["/chinese-zodiac/dragon/",  "Dragon",  "vast",   "dragon"],
      ["/chinese-zodiac/snake/",   "Snake",   "subtle", "snake"],
      ["/chinese-zodiac/horse/",   "Horse",   "free",   "horse"],
      ["/chinese-zodiac/goat/",    "Goat",    "tender", "goat"],
      ["/chinese-zodiac/monkey/",  "Monkey",  "clever", "monkey"],
      ["/chinese-zodiac/rooster/", "Rooster", "exact",  "rooster"],
      ["/chinese-zodiac/dog/",     "Dog",     "loyal",  "dog"],
      ["/chinese-zodiac/pig/",     "Pig",     "open",   "pig"]
    ]
  },
  { key: "horoscopes", h: "Horoscopes", accent: "silver",
    eyebrow: "Readings that move with the sky, not fixed forecasts.",
    layout: "list",
    items: [
      ["/daily.html",     "Today's reading",      "keyed to tonight's Moon",        "moon-full"],
      ["/best-days.html", "Best days ahead",      "the favorable days for you"],
      ["/moon.html",      "The Moon tonight",     "the current phase",              "moon-waxing-crescent"],
      ["/horoscopes/",    "Your sign this season", "pick your sign"],
      ["/horoscopes/",    "We read the sky as reflection, not prediction."]
    ]
  },
  { key: "living-arts", h: "The Living Arts", accent: "rose",
    eyebrow: "Arrange the world around your animal.",
    layout: "three-col",
    cols: [
      { title: "Feng Shui", items: [
        ["/feng-shui/",               "The Feng Shui hub"],
        ["/feng-shui/five-elements/", "The five phases"],
        ["/feng-shui/bagua/",         "The bagua"],
        ["/feng-shui/kua-number/",    "Your Kua number"]
      ]},
      { title: "Directions and Cosmos", items: [
        ["/directions/",                    "The Directions"],
        ["/directions/celestial-animals/", "The four celestial animals"],
        ["/cosmology/",                     "Cosmology"],
        ["/cosmology/four-pillars/",        "The Four Pillars"]
      ]},
      { title: "Home and Stones", items: [
        ["/habitat/",        "The Habitat"],
        ["/stones.html",     "Keeper stones"],
        ["/elements/fire/",  "The five elements"]
      ]}
    ]
  },
  { key: "sky", h: "The Sky", accent: "teal",
    eyebrow: "The Moon and the calendar of favorable days.",
    layout: "list",
    items: [
      ["/moon.html",      "The Moon tonight", "the current phase",   "moon-full"],
      ["/moon/phases/",   "The eight phases", "what each one favors", "moon-first-quarter"],
      ["/best-days.html", "Best days",        "the days ahead for you"],
      ["/daily.html",     "Today's reading",  "keyed to tonight's Moon"]
    ]
  },
  { key: "learn", h: "How it works", accent: "brass",
    layout: "list",
    items: [
      ["/learn.html", "How it works", "The two zodiacs, the Moon, and the reading"]
    ]
  }
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
    label: "Proverbs", root: "/proverbs/",
    items: [
      ["/proverbs/", "Overview"]
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
  }
};
