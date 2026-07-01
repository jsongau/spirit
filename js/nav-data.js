window.PNAV = window.PNAV || { features:{} };

PNAV.PRIMARY = [
  ["index.html","Find your animal"],
  ["menagerie.html","All 144"],
  ["daily.html","Today"],
  ["match.html","Match"],
  ["moon.html","The Moon"]
];

PNAV.MAP = [
  { h:"Discover", items:[
    ["index.html","Find your animal","Enter your date of birth and read it into one of 144 animals."],
    ["menagerie.html","All 144 animals","Browse every Sun sign and year animal in one grid."],
    ["daily.html","Today's reading","A short reading keyed to tonight's Moon phase."]
  ]},
  { h:"Connect", items:[
    ["match.html","Test a match","Score any two people across both zodiacs."]
  ]},
  { h:"Practice", items:[
    ["moon.html","The Moon","Phases, charging, and the lunar calendar."],
    ["stones.html","Your stones","Your keeper stones and the wider crystal library."],
    ["awakening.html","Awakening","The Third Eye path and its sacred practice."]
  ]},
  { h:"Understand", items:[
    ["learn.html","How it works","The two zodiacs, the Moon, and how the reading is built."]
  ]}
];

PNAV.FEATURED = {
  href:"daily.html",
  title:"Read today's sky",
  blurb:"Your animal and tonight's Moon, in one short reading."
};
