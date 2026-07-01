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
