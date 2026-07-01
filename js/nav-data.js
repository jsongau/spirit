/* THE PRIMAL ORACLE — navigation site map (v2). Data only, on window.PNAV. */
window.PNAV = window.PNAV || { features: {} };

PNAV.MAP = [
  { h: "Discover", items: [
    ["index.html", "Find your animal", "Read your date of birth into one of 144 animals"],
    ["menagerie.html", "All 144 animals", "Browse every Sun sign and year animal"],
    ["year.html", "Year finder", "Pick any year and look up friends by their birth year"],
    ["daily.html", "Today's reading", "A short reading keyed to tonight's Moon"]
  ]},
  { h: "Bonds", items: [
    ["match.html", "Test a match", "Score any two people across both zodiacs"]
  ]},
  { h: "Live with it", items: [
    ["habitat/", "The Habitat", "Feng Shui and environment for your animal"],
    ["stones.html", "Keeper stones", "Your stones and the wider crystal library"]
  ]},
  { h: "Sky", items: [
    ["moon.html", "The Moon", "Phases, charging, and the lunar calendar"]
  ]},
  { h: "Understand", items: [
    ["learn.html", "How it works", "The two zodiacs, the Moon, and the reading"]
  ]}
];

PNAV.FEATURED = { href: "year.html", title: "Find your friends' animals", blurb: "Pick a year and see all twelve crossings in one view." };
