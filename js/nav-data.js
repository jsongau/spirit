/* THE PRIMAL ORACLE — navigation site map (v2). Data only, on window.PNAV. */
window.PNAV = window.PNAV || { features: {} };

PNAV.MAP = [
  { h: "Discover", items: [
    ["/index.html", "Find your animal", "Read your date of birth into one of 144 animals"],
    ["/menagerie.html", "All 144 animals", "Browse every Sun sign and year animal"],
    ["/year.html", "Year finder", "Pick any year and look up friends by their birth year"]
  ]},
  { h: "Bonds", items: [
    ["/match.html", "Test a match", "Score any two people across both zodiacs"],
    ["/circle.html", "Circle of three", "Add three people and read the whole group together"],
    ["/vs.html", "Challenge a friend", "Reveal, match, and dare a friend to find their animal"]
  ]},
  { h: "Live with it", items: [
    ["/habitat/", "The Habitat", "Feng Shui and environment for your animal"],
    ["/feng-shui/", "Feng Shui", "The wind-water art of placement, tied to your animal"],
    ["/directions/", "The Directions", "The four celestial animals and the commanding position"],
    ["/cosmology/", "Cosmology", "The Yijing, the Luo Shu, stems and branches, the Four Pillars"],
    ["/stones.html", "Keeper stones", "Your stones and the wider crystal library"]
  ]},
  { h: "Sky", items: [
    ["/moon.html", "The Moon", "The current phase, charging, and the lunar calendar"],
    ["/best-days.html", "Best days", "The favorable and cautious days ahead for you"],
    ["/moon/phases/", "Moon phases", "What each of the eight phases favors"],
    ["/daily.html", "Today's reading", "A short reading keyed to tonight's Moon"]
  ]},
  { h: "Understand", items: [
    ["/learn.html", "How it works", "The two zodiacs, the Moon, and the reading"]
  ]}
];

PNAV.FEATURED = { href: "/circle.html", title: "Read your circle of three", blurb: "Compare two friends one to one, then read the whole group." };

/* Canonical origin for absolute URLs (breadcrumb JSON-LD, etc.).
   One constant here; Phase 6 unifies every origin across the build. */
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
