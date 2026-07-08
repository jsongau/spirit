/* ============================================================
   homepage-v2.js · indexv2.html (The Living Observatory)
   Everything computes in the browser. The birth date never
   leaves this page. localStorage is namespaced zodi:home-v2:*.
   ============================================================ */
(function () {
"use strict";
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
var NOW = new Date();
var NS = "zodi:home-v2:";
var LS = function (k, v) {
  try {
    if (arguments.length > 1) { localStorage.setItem(NS + k, v); return v; }
    return localStorage.getItem(NS + k);
  } catch (e) { return null; }
};
var LSdel = function (k) { try { localStorage.removeItem(NS + k); } catch (e) {} };

/* ============ DATA (mirrors site/js/data.js) ============ */
var WEST = [
  { n:"Aries", g:"♈", d:"Mar 21 to Apr 19" }, { n:"Taurus", g:"♉", d:"Apr 20 to May 20" },
  { n:"Gemini", g:"♊", d:"May 21 to Jun 20" }, { n:"Cancer", g:"♋", d:"Jun 21 to Jul 22" },
  { n:"Leo", g:"♌", d:"Jul 23 to Aug 22" }, { n:"Virgo", g:"♍", d:"Aug 23 to Sep 22" },
  { n:"Libra", g:"♎", d:"Sep 23 to Oct 22" }, { n:"Scorpio", g:"♏", d:"Oct 23 to Nov 21" },
  { n:"Sagittarius", g:"♐", d:"Nov 22 to Dec 21" }, { n:"Capricorn", g:"♑", d:"Dec 22 to Jan 19" },
  { n:"Aquarius", g:"♒", d:"Jan 20 to Feb 18" }, { n:"Pisces", g:"♓", d:"Feb 19 to Mar 20" }];
var EAST = [
  { n:"Rat", z:"鼠", p:"shǔ" }, { n:"Ox", z:"牛", p:"niú" },
  { n:"Tiger", z:"虎", p:"hǔ" }, { n:"Rabbit", z:"兔", p:"tù" },
  { n:"Dragon", z:"龙", p:"lóng" }, { n:"Snake", z:"蛇", p:"shé" },
  { n:"Horse", z:"马", p:"mǎ" }, { n:"Goat", z:"羊", p:"yáng" },
  { n:"Monkey", z:"猴", p:"hóu" }, { n:"Rooster", z:"鸡", p:"jī" },
  { n:"Dog", z:"狗", p:"gǒu" }, { n:"Pig", z:"猪", p:"zhū" }];
var BRANCH = ["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"];
var ELS = ["Metal","Metal","Water","Water","Wood","Wood","Fire","Fire","Earth","Earth"];
var ELEM_ZI = { Wood:"木", Fire:"火", Earth:"土", Metal:"金", Water:"水" };
var ELEM_PY = { Wood:"mù", Fire:"huǒ", Earth:"tǔ", Metal:"jīn", Water:"shuǐ" };
/* rows follow WEST order, cols follow EAST order: "Name|slug" */
var GRID = [["Fossa|fossa","Sun Bear|sun-bear","Wolverine|wolverine","Springbok|springbok","Secretary Bird|secretary-bird","Loggerhead Shrike|loggerhead-shrike","Pronghorn|pronghorn","Wallcreeper|wallcreeper","Kookaburra|kookaburra","Cassowary|cassowary","Giant Otter|giant-otter","Honey Badger|honey-badger"],
["Aardwolf|aardwolf","Giant Clam|giant-clam","Sable Antelope|sable-antelope","Koala|koala","Galápagos Tortoise|galapagos-tortoise","Pangolin|pangolin","Moose|moose","Snow Petrel|snow-petrel","Ringtail|ringtail","Superb Bird of Paradise|superb-bird-of-paradise","Banded Mongoose|banded-mongoose","Bongo|bongo"],
["Meerkat|meerkat","Three-wattled Bellbird|three-wattled-bellbird","Bat-eared Fox|bat-eared-fox","Fennec Fox|fennec-fox","Superb Lyrebird|superb-lyrebird","Cuttlefish|cuttlefish","Swift|swift","Rock Wren|rock-wren","Kea|kea","Fork-tailed Drongo|fork-tailed-drongo","African Grey Parrot|african-grey-parrot","Cacomistle|cacomistle"],
["Coconut Crab|coconut-crab","Asian Elephant|asian-elephant","Moon Bear|moon-bear","Sea Otter|sea-otter","Humpback Whale|humpback-whale","Chambered Nautilus|chambered-nautilus","Green Sea Turtle|green-sea-turtle","Glasswing Butterfly|glasswing-butterfly","Spotted Cuscus|spotted-cuscus","Emperor Penguin|emperor-penguin","Ribbon Seal|ribbon-seal","Capybara|capybara"],
["Golden Lion Tamarin|golden-lion-tamarin","Spotted Hyena|spotted-hyena","Harpy Eagle|harpy-eagle","Golden Pheasant|golden-pheasant","Rhinoceros Hornbill|rhinoceros-hornbill","Blue-ringed Octopus|blue-ringed-octopus","Paradise Riflebird|paradise-riflebird","Golden Brushtail Possum|golden-brushtail-possum","Regal Jumping Spider|regal-jumping-spider","Sunset Moth|sunset-moth","Sunbittern|sunbittern","Golden Snub-nosed Monkey|golden-snub-nosed-monkey"],
["Leafcutter Ant|leafcutter-ant","Beaver|beaver","Dragonfly|dragonfly","Penduline Tit|penduline-tit","Archerfish|archerfish","Trapdoor Spider|trapdoor-spider","Avocet|avocet","Clark's Nutcracker|clarks-nutcracker","New Caledonian Crow|new-caledonian-crow","Weaverbird|weaverbird","Cleaner Wrasse|cleaner-wrasse","Star-nosed Mole|star-nosed-mole"],
["Red Panda|red-panda","Swan|swan","Arabian Oryx|arabian-oryx","Crowned Crane|crowned-crane","Giant Manta Ray|giant-manta-ray","Paradise Tanager|paradise-tanager","Flamingo|flamingo","Luna Moth|luna-moth","Kissing Gourami|kissing-gourami","Satin Bowerbird|satin-bowerbird","Duetting Frog|duetting-frog","Roseate Spoonbill|roseate-spoonbill"],
["Tarsier|tarsier","Giant Salamander|giant-salamander","Giant Centipede|giant-centipede","Pallas's Cat|pallass-cat","Gila Monster|gila-monster","Slow Loris|slow-loris","Orca|orca","Snow Leopard|snow-leopard","Elephantnose Fish|elephantnose-fish","Devil's Flower Mantis|devils-flower-mantis","Tasmanian Devil|tasmanian-devil","Deep Sea Anglerfish|deep-sea-anglerfish"],
["Sandgrouse|sandgrouse","Arctic Tern|arctic-tern","Lanner Falcon|lanner-falcon","Flying Fish|flying-fish","Frigatebird|frigatebird","Sand Cat|sand-cat","Albatross|albatross","Bar-headed Goose|bar-headed-goose","Coati|coati","Roadrunner|roadrunner","Caracara|caracara","Tree Kangaroo|tree-kangaroo"],
["Marbled Polecat|marbled-polecat","Shoebill|shoebill","Steller's Sea Eagle|stellers-sea-eagle","Mountain Pygmy Possum|mountain-pygmy-possum","Bearded Vulture|bearded-vulture","Tuatara|tuatara","Siberian Crane|siberian-crane","Hercules Beetle|hercules-beetle","Snowy Owl|snowy-owl","Andean Condor|andean-condor","Tibetan Blue Bear|tibetan-blue-bear","Giant Armadillo|giant-armadillo"],
["Sonoran Desert Toad|sonoran-desert-toad","Vulturine Guineafowl|vulturine-guineafowl","Maned Wolf|maned-wolf","Axolotl|axolotl","Mantis Shrimp|mantis-shrimp","Portuguese Man o' War|portuguese-man-o-war","Sailfish|sailfish","Kakapo|kakapo","Raven|raven","Hoatzin|hoatzin","Vampire Bat|vampire-bat","Platypus|platypus"],
["Vampire Squid|vampire-squid","Narwhal|narwhal","Leopard Seal|leopard-seal","Moon Jellyfish|moon-jellyfish","Whale Shark|whale-shark","Glass Frog|glass-frog","Sea Angel|sea-angel","Ghost Pipefish|ghost-pipefish","Dumbo Octopus|dumbo-octopus","Mandarin Dragonet|mandarin-dragonet","Beluga|beluga","Blue Glaucus|blue-glaucus"]];
var CNY = {1940:[2,8],1941:[1,27],1942:[2,15],1943:[2,5],1944:[1,25],1945:[2,13],1946:[2,2],1947:[1,22],
1948:[2,10],1949:[1,29],1950:[2,17],1951:[2,6],1952:[1,27],1953:[2,14],1954:[2,3],1955:[1,24],
1956:[2,12],1957:[1,31],1958:[2,18],1959:[2,8],1960:[1,28],1961:[2,15],1962:[2,5],1963:[1,25],
1964:[2,13],1965:[2,2],1966:[1,21],1967:[2,9],1968:[1,30],1969:[2,17],1970:[2,6],1971:[1,27],
1972:[2,15],1973:[2,3],1974:[1,23],1975:[2,11],1976:[1,31],1977:[2,18],1978:[2,7],1979:[1,28],
1980:[2,16],1981:[2,5],1982:[1,25],1983:[2,13],1984:[2,2],1985:[2,20],1986:[2,9],1987:[1,29],
1988:[2,17],1989:[2,6],1990:[1,27],1991:[2,15],1992:[2,4],1993:[1,23],1994:[2,10],1995:[1,31],
1996:[2,19],1997:[2,7],1998:[1,28],1999:[2,16],2000:[2,5],2001:[1,24],2002:[2,12],2003:[2,1],
2004:[1,22],2005:[2,9],2006:[1,29],2007:[2,18],2008:[2,7],2009:[1,26],2010:[2,14],2011:[2,3],
2012:[1,23],2013:[2,10],2014:[1,31],2015:[2,19],2016:[2,8],2017:[1,28],2018:[2,16],2019:[2,5],
2020:[1,25],2021:[2,12],2022:[2,1],2023:[1,22],2024:[2,10],2025:[1,29],2026:[2,17],2027:[2,6],
2028:[1,26],2029:[2,13],2030:[2,3],2031:[1,23],2032:[2,11]};
var MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
var DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/* year-animal relations, derived from branch arithmetic:
   trines i+4 and i+8, secret friend (13-i) mod 12,
   clash i+6, harm (7-i) mod 12 */
function relationsOf(e) {
  return {
    trine: [EAST[(e + 4) % 12].n, EAST[(e + 8) % 12].n],
    secret: EAST[(13 - e) % 12].n,
    clash: EAST[(e + 6) % 12].n,
    harm: EAST[(7 - e + 12) % 12].n
  };
}

/* ============ LIVE ASTRONOMY (mirrors site/js/engine.js) ============ */
var SYNODIC = 29.530588853;
function moonNow(date) {
  var ref = Date.UTC(2000, 0, 6, 18, 14);
  var age = ((date.getTime() - ref) / 86400000) % SYNODIC; if (age < 0) age += SYNODIC;
  var frac = age / SYNODIC;
  var t = [[0.03,"New Moon","opening and planting a private intention"],
    [0.22,"Waxing Crescent","gathering what you need and saying one yes"],
    [0.28,"First Quarter","acting through the first resistance"],
    [0.47,"Waxing Gibbous","refining and staying the course"],
    [0.53,"Full Moon","being seen, then releasing what is finished"],
    [0.72,"Waning Gibbous","sharing, teaching, giving thanks"],
    [0.78,"Last Quarter","cutting a loss and forgiving"],
    [0.97,"Waning Crescent","resting without guilt"],
    [1.01,"New Moon","opening and planting a private intention"]];
  var name = "New Moon", advice = t[0][2];
  for (var i = 0; i < t.length; i++) { if (frac <= t[i][0]) { name = t[i][1]; advice = t[i][2]; break; } }
  var illum = (1 - Math.cos(2 * Math.PI * frac)) / 2;
  return { name:name, advice:advice, frac:frac, age:age, illum:illum, waxing:frac < 0.5 };
}
/* Julian day number; day branch B = (JDN + 1) mod 12, anchored to a verified Rat day */
function jdn(y, m, d) {
  var a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
}
function dayAnimal(dt) {
  var J = jdn(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
  var idx = (((J + 1) % 12) + 12) % 12;
  return { J:J, idx:idx, name:EAST[idx].n };
}
/* season element by solar-term windows (late summer counted to Earth) */
function seasonElement(dt) {
  var k = (dt.getMonth() + 1) * 100 + dt.getDate();
  if (k >= 204 && k <= 505) return { el:"Wood",  label:"Spring",       span:"February 4 to May 5" };
  if (k >= 506 && k <= 722) return { el:"Fire",  label:"High summer",  span:"May 6 to July 22" };
  if (k >= 723 && k <= 907) return { el:"Earth", label:"Late summer",  span:"July 23 to September 7" };
  if (k >= 908 && k <= 1106) return { el:"Metal",label:"Autumn",       span:"September 8 to November 6" };
  return { el:"Water", label:"Winter", span:"November 7 to February 3" };
}
function daysUntilAge(currentAge, targetAge) {
  var d = (targetAge - currentAge) % SYNODIC; if (d < 0) d += SYNODIC;
  return d;
}

/* ============ BIRTH-DATE ENGINE (true lunar New Year) ============ */
function westFrom(m, d) {
  var edges = [[1,20],[2,19],[3,21],[4,20],[5,21],[6,21],[7,23],[8,23],[9,23],[10,23],[11,22],[12,22]];
  var idxByMonthStart = [10,11,0,1,2,3,4,5,6,7,8,9];
  var startDay = edges[m - 1][1];
  if (d >= startDay) return idxByMonthStart[m - 1];
  return (idxByMonthStart[m - 1] + 11) % 12;
}
function eastFrom(y, m, d) {
  var eff = y, b = CNY[y];
  if (b) { if (m < b[0] || (m === b[0] && d < b[1])) eff = y - 1; }
  else { if (m < 2 || (m === 2 && d < 4)) eff = y - 1; }
  return { e: ((eff - 4) % 12 + 12) % 12, eff: eff };
}
function cellData(w, e) { var p = GRID[w][e].split("|"); return { name: p[0], slug: p[1] }; }
function crossingFrom(y, m, d) {
  var w = westFrom(m, d), ya = eastFrom(y, m, d);
  var c = cellData(w, ya.e);
  return { w:w, e:ya.e, eff:ya.eff, el:ELS[((ya.eff % 10) + 10) % 10], name:c.name, slug:c.slug };
}

/* ============ SAVED PROFILE (this device only) ============ */
function loadProfile() {
  var raw = LS("profile");
  if (!raw) return null;
  try {
    var p = JSON.parse(raw);
    if (typeof p.w === "number" && typeof p.e === "number" && p.name && p.slug) return p;
  } catch (e) {}
  return null;
}
var PROFILE = loadProfile();

/* ============ STARFIELD (living backdrop) ============ */
(function stars() {
  var cv = $("#sky"); if (!cv) return;
  var ctx = cv.getContext("2d");
  function size() { cv.width = innerWidth; cv.height = innerHeight; }
  size(); addEventListener("resize", size);
  var N = Math.min(140, Math.floor(innerWidth / 10));
  var st = [];
  for (var i = 0; i < N; i++) st.push({ x:Math.random(), y:Math.random(), r:Math.random()*1.3+0.2, a:Math.random()*6, s:Math.random()*0.015+0.003, dx:(Math.random()-0.5)*0.00003 });
  function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    for (var i = 0; i < st.length; i++) {
      var s = st[i];
      if (!reduceMotion) { s.a += s.s; s.x += s.dx; if (s.x > 1) s.x = 0; if (s.x < 0) s.x = 1; }
      var al = 0.3 + Math.abs(Math.sin(s.a)) * 0.5;
      ctx.beginPath(); ctx.arc(s.x*cv.width, s.y*cv.height, s.r, 0, 7);
      ctx.fillStyle = "rgba(245,236,210," + al + ")"; ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }
  draw();
})();

/* ============ MOON RENDER (terminator sweep, as on site/moon.html) ============ */
function drawMoon(cv, frac, waxing) {
  if (!cv) return;
  var ctx = cv.getContext("2d"), W = cv.width, H = cv.height;
  var R = W/2 - Math.max(2, W*0.03), cx = W/2, cy = H/2;
  ctx.clearRect(0, 0, W, H);
  if (W > 60) {
    var halo = ctx.createRadialGradient(cx, cy, R*0.6, cx, cy, R*1.16);
    halo.addColorStop(0, "rgba(245,236,210,0.16)"); halo.addColorStop(1, "rgba(245,236,210,0)");
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(cx, cy, R*1.16, 0, Math.PI*2); ctx.fill();
  }
  var lit = ctx.createRadialGradient(cx-R*0.32, cy-R*0.3, R*0.1, cx, cy, R);
  lit.addColorStop(0, "#fffaf0"); lit.addColorStop(0.55, "#e8dcb6"); lit.addColorStop(1, "#c2b487");
  ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.clip();
  ctx.fillStyle = lit; ctx.fillRect(0, 0, W, H);
  if (W > 60) {
    ctx.fillStyle = "rgba(120,108,80,0.16)";
    [[-0.28,-0.18,0.20],[0.22,0.08,0.16],[-0.06,0.34,0.13],[0.34,-0.34,0.10]].forEach(function (m) {
      ctx.beginPath(); ctx.arc(cx+m[0]*R, cy+m[1]*R, m[2]*R, 0, Math.PI*2); ctx.fill();
    });
  }
  var k = Math.cos(2*Math.PI*frac), steps = 90;
  ctx.fillStyle = "rgba(8,9,18,0.93)"; ctx.beginPath();
  for (var i = 0; i <= steps; i++) {
    var t = -Math.PI/2 + (i/steps)*Math.PI;
    var x = cx + (waxing ? -1 : 1) * R * Math.cos(t), y = cy + R * Math.sin(t);
    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  }
  for (var j = steps; j >= 0; j--) {
    var t2 = -Math.PI/2 + (j/steps)*Math.PI;
    ctx.lineTo(cx + (waxing ? -1 : 1) * R * k * Math.cos(t2), cy + R * Math.sin(t2));
  }
  ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.strokeStyle = "rgba(214,193,140,0.45)"; ctx.lineWidth = W > 60 ? 1.5 : 1;
  ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI*2); ctx.stroke();
}

/* ============ TODAY: compute once, paint everywhere ============ */
var moon = moonNow(NOW);
var day = dayAnimal(NOW);
var season = seasonElement(NOW);
var illumPct = Math.round(moon.illum * 100);
var moonAgeD = Math.round(moon.age);

$("#dl-date").textContent = DAYS[NOW.getDay()] + " · " + MONTHS[NOW.getMonth()] + " " + NOW.getDate() + ", " + NOW.getFullYear();
$("#dl-day").textContent = "a " + day.name + " day";
$("#dl-moon").textContent = moon.name + " " + illumPct + "%";

drawMoon($("#chipMoon"), moon.frac, moon.waxing);
$("#chipMoonT").textContent = moon.name + " · " + illumPct + "%";

$("#todayHead").textContent = MONTHS[NOW.getMonth()] + " " + NOW.getDate() + ", read as the craft reads it";
drawMoon($("#bigMoon"), moon.frac, moon.waxing);
$("#m-name").textContent = moon.name;
$("#m-favors").textContent = "This phase favours " + moon.advice + ".";
$("#m-math").innerHTML = "age <b>" + moonAgeD + (moonAgeD === 1 ? " day" : " days") + "</b> of 29.53 · lit <b>" + illumPct + "%</b> · " + (moon.waxing ? "waxing" : "waning");

$("#d-hanzi").innerHTML = "<ruby>" + EAST[day.idx].z + "<rt>" + EAST[day.idx].p + "</rt></ruby>";
$("#d-name").textContent = "A " + day.name + " day";
$("#d-math").innerHTML = "Julian day <b>" + day.J + "</b> · (JDN + 1) mod 12 = <b>" + day.idx + "</b> · branch <b>" + BRANCH[day.idx] + "</b>";
var sayDay = $("#say-day");
if (sayDay) sayDay.setAttribute("data-say", EAST[day.idx].z);

var sc = $("#seasonCard"); if (sc) sc.classList.add("elm-" + season.el);
$("#s-hanzi").innerHTML = "<ruby>" + ELEM_ZI[season.el] + "<rt>" + ELEM_PY[season.el] + "</rt></ruby>";
$("#s-name").textContent = season.el + " season";
$("#s-sub").textContent = season.label + ". The " + season.el + " movement keeps these weeks.";
$("#s-math").innerHTML = "window <b>" + season.span + "</b> · today qualifies";

/* Fire Horse year, counted from the lunar boundary */
var fhDay = 0;
(function fireHorse() {
  var start = new Date(2026, 1, 17), end = new Date(2027, 1, 5);
  var sub = $("#fh-sub"), math = $("#fh-math");
  if (!sub || !math) return;
  if (NOW < start) {
    var dTo = Math.ceil((start - NOW) / 86400000);
    sub.textContent = "The Fire Horse year begins at the new moon of February 17, 2026. " + dTo + (dTo === 1 ? " day" : " days") + " remain.";
    math.innerHTML = "丙午 · yang Fire over the Horse branch";
  } else if (NOW <= end) {
    fhDay = Math.floor((NOW - start) / 86400000) + 1;
    sub.textContent = "We are inside the Fire Horse year, the rarest temper in the sixty-year cycle. It runs until February 5, 2027.";
    math.innerHTML = "day <b>" + fhDay + "</b> of the Fire Horse year · began <b>Feb 17, 2026</b>";
  } else {
    sub.textContent = "The Fire Horse year has closed. The Goat year holds the calendar now.";
    math.innerHTML = "丙午 ended <b>Feb 5, 2027</b>";
  }
})();
var mgFire = $("#mgFire");
if (mgFire) mgFire.textContent = fhDay > 0
  ? "丙午 · Day " + fhDay + " of the Fire Horse year, a crossing that comes once in sixty years."
  : "丙午 · The Fire Horse arrives with 2026, a crossing that comes once in sixty years.";

/* daily oracle: deterministic, seeded by day of year, day animal, and moon;
   spoken to the kept animal when one is remembered on this device */
function relLine(eIdx, forOracle) {
  var R = relationsOf(eIdx), yn = EAST[eIdx].n;
  if (R.trine.indexOf(day.name) >= 0) return "a trine ally of the " + yn + " in you";
  if (day.name === R.secret) return "the " + yn + "'s secret friend";
  if (day.name === R.clash) return "the " + yn + "'s clash, so move gently";
  if (day.name === R.harm) return "a quiet harm to the " + yn + ", so read everything twice";
  if (day.name === yn) return "the " + yn + "'s own face in the calendar";
  return "even ground for the " + yn + " in you";
}
var COUNSEL = [
  "Hold the morning for the hardest thing and let the afternoon be soft",
  "Say less than you know and watch more than you say",
  "Finish one small thing before noon and let it stand for the day",
  "Keep the promise you made to yourself before keeping anyone else's",
  "Ask the question you have been saving for a braver hour",
  "Leave one hour unplanned and see what walks into it",
  "Trade one certainty for one honest doubt before dark"
];
(function dailyOracle() {
  var line = $("#doLine"), head = $("#doHead"), note = $("#doNote");
  if (!line) return;
  var start = new Date(NOW.getFullYear(), 0, 0);
  var doy = Math.floor((NOW - start) / 86400000);
  var counsel = COUNSEL[(doy + day.idx) % COUNSEL.length];
  if (PROFILE) {
    if (head) head.textContent = "Today for the " + PROFILE.name;
    line.textContent = "A " + day.name + " day under a " + moon.name.toLowerCase() + ", " + relLine(PROFILE.e) + ". " + counsel + ".";
    if (note) note.textContent = "The oracle recasts this line at every dawn from the day animal, the moon, and the season. Yesterday's line is gone, and tomorrow's does not exist yet.";
  } else {
    if (head) head.textContent = "Today at the observatory";
    line.textContent = "A " + day.name + " day under a " + moon.name.toLowerCase() + ". " + counsel + ".";
    if (note) note.textContent = "The oracle recasts this line at every dawn from the day animal, the moon, and the season. Name your animal at the instrument above and it reads for you alone.";
  }
})();

/* stones live line: charging window from real synodic distance to full */
(function stoneLive() {
  var el = $("#stone-live"); if (!el) return;
  var toFull = daysUntilAge(moon.age, SYNODIC / 2);
  if (moon.name === "Full Moon") el.textContent = "Tonight qualifies as a charging night. Set them on the sill.";
  else el.textContent = "Next full-moon charging window in about " + Math.round(toFull) + " nights.";
})();

/* ============ HERO STATES: instrument or sanctum ============ */
var stateFirst = $("#state-first"), stateReturn = $("#state-return");
function showInstrument() {
  if (stateFirst) stateFirst.hidden = false;
  if (stateReturn) stateReturn.hidden = true;
}
function showSanctum() {
  if (!PROFILE || !stateReturn) { showInstrument(); return; }
  var h = NOW.getHours();
  var g = h < 5 ? "Deep night" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  $("#sb-greet").textContent = g + " · your sanctum · " + DAYS[NOW.getDay()];
  $("#sb-title").textContent = "The " + PROFILE.name + " returns.";
  $("#sb-crossing").textContent = "Remembered on this device: the " + PROFILE.name + ", " +
    WEST[PROFILE.w].n + " crossed with the Year of the " + EAST[PROFILE.e].n +
    (PROFILE.year ? ", " + PROFILE.el + " by the lunar year " + PROFILE.year : "") + ".";
  var readLink = $("#sb-read");
  if (readLink) { readLink.href = "/animals/" + PROFILE.slug + "/"; readLink.textContent = "Read the " + PROFILE.name; }

  var R = relationsOf(PROFILE.e), yn = EAST[PROFILE.e].n, lineTxt;
  if (R.trine.indexOf(day.name) >= 0) lineTxt = "Today is a " + day.name + " day, a trine ally of the " + yn + " in you. Begin the thing you have been circling.";
  else if (day.name === R.secret) lineTxt = "Today is a " + day.name + " day, your secret friend. Ask quietly for the favor you have been postponing.";
  else if (day.name === R.clash) lineTxt = "Today is a " + day.name + " day, your clash. Move gently, and sign nothing in irritation.";
  else if (day.name === R.harm) lineTxt = "Today is a " + day.name + " day, a quiet harm. Reread the small print and rest early.";
  else if (day.name === yn) lineTxt = "Today is " + (yn === "Ox" ? "an " : "a ") + yn + " day, your own face in the calendar. Watch your habits from the outside for once.";
  else lineTxt = "Today is a " + day.name + " day, even ground for the " + yn + " in you. Tend the ordinary and it will tend you back.";
  $("#sb-reading").innerHTML = lineTxt.replace("Today is", "<b>Today is</b>");

  var toFull = daysUntilAge(moon.age, SYNODIC / 2);
  var chipT = $("#sb-powerchip-t"), ms = $("#sb-moonstate");
  if (moon.name === "Full Moon") {
    chipT.textContent = "Full Moon · tonight";
    ms.innerHTML = "<b>Tonight the moon is full</b>, the bright turn of the cycle. Whatever asks to be seen, let it be seen. Charge your stones on the sill.";
  } else if (moon.name === "New Moon") {
    chipT.textContent = "New Moon · tonight";
    ms.innerHTML = "<b>Tonight is the dark moon.</b> It asks nothing of the " + PROFILE.name + " except sleep and a seed.";
  } else {
    var n = Math.round(toFull);
    chipT.textContent = "Full moon in " + n + (n === 1 ? " night" : " nights");
    ms.innerHTML = "Tonight the moon is a <b>" + moon.name.toLowerCase() + "</b>, " + illumPct + "% lit. The full moon returns in about <b>" + n + (n === 1 ? " night" : " nights") + "</b>.";
  }
  stateFirst.hidden = true;
  stateReturn.hidden = false;
}
if (PROFILE) showSanctum(); else showInstrument();
var recast = $("#sb-recast");
if (recast) recast.addEventListener("click", function () {
  try {
    var ks = [];
    for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf(NS) === 0) ks.push(k); }
    ks.forEach(function (k) { localStorage.removeItem(k); });
  } catch (e) {}
  PROFILE = null;
  showInstrument();
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  var mmEl = $("#mm"); if (mmEl) { try { mmEl.focus(); } catch (e) {} }
});

/* ============ THE ASTROLABE ============ */
var SVGNS = "http://www.w3.org/2000/svg";
function el(tag, attrs, parent) { var n = document.createElementNS(SVGNS, tag); for (var k in attrs) n.setAttribute(k, attrs[k]); if (parent) parent.appendChild(n); return n; }
var C0 = 270, dial = $(".dial");
(function buildTicks() {
  var ticks = $("#ticks"); if (!ticks) return;
  for (var i = 0; i < 72; i++) {
    var a = i * 5 * Math.PI / 180, major = i % 6 === 0;
    var r1 = major ? 232 : 237, r2 = 244;
    el("line", { x1:C0+r1*Math.sin(a), y1:C0-r1*Math.cos(a), x2:C0+r2*Math.sin(a), y2:C0-r2*Math.cos(a),
      "class": major ? "tick" : "tick-minor", "stroke-width": major ? 1.2 : 0.7 }, ticks);
  }
  for (var j = 0; j < 36; j++) {
    var b = j * 10 * Math.PI / 180;
    el("line", { x1:C0+120*Math.sin(b), y1:C0-120*Math.cos(b), x2:C0+126*Math.sin(b), y2:C0-126*Math.cos(b), "class":"tick-minor", "stroke-width":0.7 }, ticks);
  }
})();
var ringWest = $("#ringWest"), ringEast = $("#ringEast");
(function buildRings() {
  if (!ringWest || !ringEast) return;
  for (var i = 0; i < 12; i++) {
    var gw = el("g", { transform:"rotate(" + (i*30) + " " + C0 + " " + C0 + ")" }, ringWest);
    var tw = el("text", { x:C0, y:C0-215, "class":"wglyph", "data-i":i }, gw); tw.textContent = WEST[i].g;
    var ge = el("g", { transform:"rotate(" + (i*30) + " " + C0 + " " + C0 + ")" }, ringEast);
    var te = el("text", { x:C0, y:C0-152, "class":"eglyph", "data-i":i }, ge); te.textContent = EAST[i].z;
  }
})();

var st = { w:3, e:5, year:1989 };
function pad(n) { return String(n).padStart(3, "0"); }
function paintRingW(w) {
  if (!ringWest) return;
  ringWest.style.transform = "rotate(" + (-30*w) + "deg)";
  $$(".wglyph", dial).forEach(function (t) { t.classList.toggle("lit", +t.dataset.i === w); });
}
function paintRingE(e) {
  if (!ringEast) return;
  ringEast.style.transform = "rotate(" + (-30*e) + "deg)";
  $$(".eglyph", dial).forEach(function (t) { t.classList.toggle("lit", +t.dataset.i === e); });
}
function setCrossing(w, e, opts) {
  opts = opts || {};
  st.w = w; st.e = e;
  if (opts.year !== undefined) st.year = opts.year; else if (!opts.keepYear) st.year = null;
  paintRingW(w); paintRingE(e);
  var c = cellData(w, e), plate = w*12 + e + 1;
  $("#dialPlate").textContent = "PLATE " + pad(plate) + " OF 144";
  $("#roWest").innerHTML = '<span class="g">' + WEST[w].g + "</span>" + WEST[w].n + " · " + WEST[w].d;
  $("#roEast").innerHTML = '<span class="g han">' + EAST[e].z + "</span>Year of the " + EAST[e].n;
  var elemRow = $("#roElem");
  if (st.year) { elemRow.textContent = ELS[((st.year % 10) + 10) % 10] + " · read from the lunar year " + st.year; }
  else { elemRow.textContent = "Set a date to fix the element"; }
  $("#roName").textContent = "The " + c.name;
  $("#roPlate").textContent = "Plate " + pad(plate) + " of 144";
  var read = $("#roRead");
  read.href = "/animals/" + c.slug + "/";
  read.textContent = "Read the " + c.name;
  var sr = $("#say-ring");
  if (sr) sr.setAttribute("data-say", EAST[e].z);
}

/* ============ SEGMENTED DATE ENTRY (as on index.html):
   MM / DD / YYYY typed fields, digits only, auto-advance when a
   field fills, backspace in an empty field steps back, and the
   rings answer live as the fields fill ============ */
(function dateEntry() {
  var form = $("#sightForm"); if (!form) return;
  var mI = $("#mm"), dI = $("#dd"), yI = $("#yy"), hint = $("#dfHint");
  var HINT0 = "Type it like 07 14 1992. The rings answer as you go.";
  function setHint(t, err) {
    if (!hint) return;
    hint.textContent = t;
    hint.classList.toggle("is-err", !!err);
  }
  function vals() { return { m:+mI.value, d:+dI.value, y:+yI.value, ml:mI.value.length, dl:dI.value.length, yl:yI.value.length }; }
  function complete(v) {
    return v.ml === 2 && v.dl >= 1 && v.yl === 4 && v.m >= 1 && v.m <= 12 && v.d >= 1 && v.d <= 31 && v.y >= 1940 && v.y <= 2032;
  }
  /* the rings answer live: the month swings the Ring of Suns,
     the year swings the Ring of Years, and a complete date settles both */
  function live() {
    var v = vals();
    if (complete(v)) {
      var c = crossingFrom(v.y, v.m, v.d);
      setCrossing(c.w, c.e, { year: c.eff });
      setHint(WEST[c.w].g + " " + WEST[c.w].n + " · Year of the " + EAST[c.e].n + ". The rings have settled.", false);
      return;
    }
    if (v.ml === 2 && (v.m < 1 || v.m > 12)) { setHint("No month wears that number. Try 01 to 12.", true); return; }
    if (v.ml === 2 && v.dl === 2 && (v.d < 1 || v.d > 31)) { setHint("That day is not on the wheel. Try 01 to 31.", true); return; }
    if (v.yl === 4 && (v.y < 1940 || v.y > 2032)) { setHint("The wheel reads years 1940 to 2032.", true); return; }
    var moved = false;
    if (v.ml === 2 && v.m >= 1 && v.m <= 12) {
      paintRingW(westFrom(v.m, (v.d >= 1 && v.d <= 31) ? v.d : 15));
      moved = true;
    }
    if (v.yl === 4 && v.y >= 1940 && v.y <= 2032) {
      paintRingE(eastFrom(v.y, (v.m >= 1 && v.m <= 12) ? v.m : 7, (v.d >= 1 && v.d <= 31) ? v.d : 1).e);
      moved = true;
    }
    setHint(moved ? "The rings are turning. Keep going." : HINT0, false);
  }
  function seg(input, max, next) {
    input.addEventListener("input", function () {
      input.value = input.value.replace(/[^0-9]/g, "").slice(0, max);
      live();
      if (input.value.length === max && next) { try { next.focus(); } catch (e) {} }
    });
  }
  function back(input, prev) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && input.value === "" && prev) { try { prev.focus(); } catch (er) {} }
    });
  }
  seg(mI, 2, dI); seg(dI, 2, yI); seg(yI, 4, null);
  back(dI, mI); back(yI, dI);

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var v = vals();
    if (!complete(v)) { setHint("The wheel needs the full date, month, day and year.", true); try { (v.ml < 2 ? mI : v.dl < 1 ? dI : yI).focus(); } catch (e) {} return; }
    var c = crossingFrom(v.y, v.m, v.d);
    setCrossing(c.w, c.e, { year: c.eff });
    PROFILE = { w:c.w, e:c.e, year:c.eff, el:c.el, name:c.name, slug:c.slug };
    LS("profile", JSON.stringify(PROFILE));
    /* let the nav dock (and any other listener) update without a reload */
    try { window.dispatchEvent(new CustomEvent("zodi:revealed", { detail: PROFILE })); } catch (e) {}
    setHint("Named. The " + c.name + " is kept on this device, and this page becomes its sanctum when you return.", false);
    var rite = $("#roRite");
    if (rite) rite.innerHTML = "Your first sighting is a rite the ledger remembers, worth <b>500 <a href=\"/karmic-board.html\">Zodi Karma</a></b>. Kept on this device only.";
    var readout = $("#roCard");
    if (readout && "scrollIntoView" in readout) readout.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  });
})();

/* ring-turn buttons stay as play for the curious hand */
$$(".turnbtn").forEach(function (b) {
  b.addEventListener("click", function () {
    var t = b.dataset.turn, delta = t.slice(1) === "+1" ? 1 : -1;
    if (t[0] === "w") setCrossing((st.w + delta + 12) % 12, st.e, { keepYear:false });
    else setCrossing(st.w, (st.e + delta + 12) % 12, { keepYear:false });
  });
});

/* ============ WU XING WHEEL, opened on the season's phase ============ */
var ELEMS = [
 { n:"Wood", zi:"木", pin:"mù", c:"#6fae74", dir:"East", sea:"Spring", gua:"Azure Dragon 青龍", vir:"Benevolence",
   line:"The push of green through frost, the phase of beginnings.", gen:"Wood feeds fire and is raised by water.", ctl:"Wood parts earth and is cut by metal." },
 { n:"Fire", zi:"火", pin:"huǒ", c:"#d98a86", dir:"South", sea:"Summer", gua:"Vermilion Bird 朱雀", vir:"Propriety",
   line:"Full flame at full noon, the phase of visibility.", gen:"Fire makes earth of its ash and is fed by wood.", ctl:"Fire melts metal and is quenched by water." },
 { n:"Earth", zi:"土", pin:"tǔ", c:"#c9a86a", dir:"Center", sea:"Late summer", gua:"Yellow Dragon 黃龍", vir:"Trustworthiness",
   line:"The still point the other four turn around.", gen:"Earth bears metal and is made by fire.", ctl:"Earth dams water and is parted by wood." },
 { n:"Metal", zi:"金", pin:"jīn", c:"#c3c8d0", dir:"West", sea:"Autumn", gua:"White Tiger 白虎", vir:"Righteousness",
   line:"The blade and the bell, the phase of refinement.", gen:"Metal carries water and is borne by earth.", ctl:"Metal cuts wood and is melted by fire." },
 { n:"Water", zi:"水", pin:"shuǐ", c:"#78b3c6", dir:"North", sea:"Winter", gua:"Black Tortoise 玄武", vir:"Wisdom",
   line:"The deep store beneath the ice, the phase of return.", gen:"Water raises wood and is carried by metal.", ctl:"Water quenches fire and is dammed by earth." }];
var GEN_CAP = "Wood feeds fire. Fire makes earth of its ash. Earth bears metal. Metal carries water. Water raises wood.";
var CTL_CAP = "Wood parts earth. Earth dams water. Water quenches fire. Fire melts metal. Metal cuts wood.";
var wx = $("#wuxing"), wxMode = "gen";
var wxSel = Math.max(0, ["Wood","Fire","Earth","Metal","Water"].indexOf(season.el));
var WC = 220, WR = 150, NODE_R = 42;
function npos(i) { var a = (-90 + i*72) * Math.PI / 180; return [WC + WR*Math.cos(a), WC + WR*Math.sin(a)]; }
(function buildWheel() {
  if (!wx) return;
  var defs = el("defs", {}, wx);
  ELEMS.forEach(function (e, i) {
    var m = el("marker", { id:"arr"+i, viewBox:"0 0 10 10", refX:"8", refY:"5", markerWidth:"7", markerHeight:"7", orient:"auto-start-reverse" }, defs);
    el("path", { d:"M0 0 L10 5 L0 10 z", fill:e.c }, m);
  });
  el("circle", { cx:WC, cy:WC, r:WR + NODE_R + 14, fill:"none", stroke:"rgba(214,193,140,.1)" }, wx);
  var arrows = el("g", { id:"wxArrows" }, wx);
  function chord(i, j, dashed) {
    var a = npos(i), b = npos(j);
    var dx = b[0]-a[0], dy = b[1]-a[1], len = Math.hypot(dx, dy);
    var ox = dx/len*(NODE_R+8), oy = dy/len*(NODE_R+8);
    return el("path", { d:"M"+(a[0]+ox)+" "+(a[1]+oy)+" L"+(b[0]-ox)+" "+(b[1]-oy),
      "class":"flow", "stroke":ELEMS[i].c, "marker-end":"url(#arr"+i+")",
      "stroke-dasharray": dashed ? "5 5" : "none", "data-mode": dashed ? "ctl" : "gen", "data-from":i }, arrows);
  }
  for (var i = 0; i < 5; i++) { chord(i, (i+1)%5, false); chord(i, (i+2)%5, true); }
  ELEMS.forEach(function (e, i) {
    var p = npos(i);
    var g = el("g", { "class":"node", "data-i":i, tabindex:"0", role:"button", "aria-label":e.n + ", read its plate", style:"color:" + e.c }, wx);
    el("circle", { cx:p[0], cy:p[1], r:NODE_R, stroke:e.c }, g);
    var zi = el("text", { x:p[0], y:p[1]-4, "class":"zi", fill:e.c }, g); zi.textContent = e.zi;
    var en = el("text", { x:p[0], y:p[1]+24, "class":"en" }, g); en.textContent = e.n;
    g.addEventListener("click", function () { selectElem(i); });
    g.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); selectElem(i); } });
  });
})();
function paintWheel() {
  if (!wx) return;
  $$(".flow", wx).forEach(function (p) { p.classList.toggle("dimmed", p.dataset.mode !== wxMode); });
  $$(".node", wx).forEach(function (n) { n.classList.toggle("sel", +n.dataset.i === wxSel); });
  $("#cyclecap").textContent = wxMode === "gen" ? GEN_CAP : CTL_CAP;
  var e = ELEMS[wxSel];
  $("#elemcard").style.setProperty("--ec", e.c);
  $("#ecZi").textContent = e.zi;
  $("#ecZi").style.color = e.c;
  $("#ecPin").textContent = e.pin + " · " + e.n.toLowerCase();
  $("#ecDir").textContent = e.dir;
  $("#ecSea").textContent = e.sea;
  $("#ecGua").textContent = e.gua;
  $("#ecVir").textContent = e.vir;
  $("#ecMotion").textContent = e.line + " " + (wxMode === "gen" ? e.gen : e.ctl);
}
function selectElem(i) { wxSel = i; paintWheel(); }
var modeGen = $("#modeGen"), modeCtl = $("#modeCtl");
if (modeGen) modeGen.addEventListener("click", function () { wxMode = "gen"; modeGen.setAttribute("aria-pressed","true"); modeCtl.setAttribute("aria-pressed","false"); paintWheel(); });
if (modeCtl) modeCtl.addEventListener("click", function () { wxMode = "ctl"; modeCtl.setAttribute("aria-pressed","true"); modeGen.setAttribute("aria-pressed","false"); paintWheel(); });
var esn = $("#elemSeasonNote");
if (esn) esn.textContent = "The wheel opens on " + season.el + ", keeper of this season, " + season.label.toLowerCase() + ". Computed from today's date.";

/* ============ FIVE GATES TABS (generic ARIA tabs engine) ============ */
$$("[role=tablist]").forEach(function (list) {
  var tabs = $$("[role=tab]", list);
  function select(tab) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      var p = document.getElementById(t.getAttribute("aria-controls"));
      if (p) { p.classList.toggle("is-active", on); p.hidden = !on; }
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () { select(t); });
    t.addEventListener("keydown", function (ev) {
      var j = null;
      if (ev.key === "ArrowRight" || ev.key === "ArrowDown") j = (i+1) % tabs.length;
      if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") j = (i-1+tabs.length) % tabs.length;
      if (ev.key === "Home") j = 0;
      if (ev.key === "End") j = tabs.length - 1;
      if (j !== null) { ev.preventDefault(); tabs[j].focus(); select(tabs[j]); }
    });
  });
});

/* ============ KEEPER STONE PICKER (persists on this device) ============ */
(function stonesPick() {
  var ECHO = {
    anchor:"Kept. The holding office is yours, on this device.",
    clarity:"Kept. The seeing office is yours, on this device.",
    courage:"Kept. The ember office is yours, on this device.",
    boundary:"Kept. The threshold office is yours, on this device."
  };
  var stoneBtns = $$(".stone-card");
  var echo = $("#stoneEcho");
  if (!stoneBtns.length) return;
  function paintStone(name) {
    stoneBtns.forEach(function (b) {
      var on = b.dataset.stone === name;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      var k = b.querySelector("[data-keep]");
      if (k) k.textContent = on ? "✦ Kept" : "Keep this office";
    });
    if (echo) echo.textContent = name ? ECHO[name] : "";
  }
  stoneBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      var name = b.getAttribute("aria-pressed") === "true" ? null : b.dataset.stone;
      if (name) LS("stone", name); else LSdel("stone");
      paintStone(name);
    });
  });
  var saved = LS("stone");
  if (saved && ECHO[saved]) paintStone(saved);
})();

/* ============ MOON SECTION ============ */
(function moonSection() {
  var big = $("#moonBig"); if (!big) return;
  drawMoon(big, moon.frac, moon.waxing);
  $("#moonPhaseName").textContent = moon.name;
  $("#moonStats").textContent = illumPct + "% lit · day " + moonAgeD + " of 29.5";
  var PHASES = [
    { n:"New Moon", v:"seed" }, { n:"Waxing Crescent", v:"gather" }, { n:"First Quarter", v:"decide" }, { n:"Waxing Gibbous", v:"refine" },
    { n:"Full Moon", v:"release" }, { n:"Waning Gibbous", v:"give thanks" }, { n:"Last Quarter", v:"forgive" }, { n:"Waning Crescent", v:"rest" }];
  var strip = $("#phasestrip");
  var pi = PHASES.map(function (p) { return p.n; }).indexOf(moon.name);
  if (pi < 0) pi = 0;
  PHASES.forEach(function (ph, i) {
    var d = document.createElement("div");
    d.className = "phasecell" + (i === pi ? " now" : "");
    d.setAttribute("role", "listitem");
    d.innerHTML = '<p class="pn">' + ph.n + '</p><p class="pv">' + ph.v + "</p>";
    strip.appendChild(d);
  });
  var dayMs = 86400000, nowMs = NOW.getTime();
  var toNew = daysUntilAge(moon.age, 0) * dayMs;
  var toFull = daysUntilAge(moon.age, SYNODIC / 2) * dayMs;
  var fmt = function (t) { return new Date(t).toLocaleDateString("en-US", { month:"short", day:"numeric" }); };
  $("#nextNew").textContent = fmt(nowMs + toNew);
  $("#nextFull").textContent = fmt(nowMs + toFull);
})();

/* ============ CHALLENGE A FRIEND ============ */
(function challenge() {
  var well = $("#shareWell"); if (!well) return;
  var bMake = $("#ch-make"), bCopy = $("#ch-copy"), bShare = $("#ch-share"), flash = $("#ch-flash");
  var text = "";
  function readChDate() {
    var m = parseInt($("#ch-m").value, 10), d = parseInt($("#ch-d").value, 10), y = parseInt($("#ch-y").value, 10);
    if (!m || !d || !y || m < 1 || m > 12 || d < 1 || d > 31 || y < 1940 || y > 2032) return null;
    return { y:y, m:m, d:d };
  }
  bMake.addEventListener("click", function () {
    var dt = readChDate();
    well.hidden = false;
    if (!dt) { well.textContent = "The challenge needs your full birth date, month, day and year."; return; }
    var c = crossingFrom(dt.y, dt.m, dt.d);
    var name = ($("#ch-n").value || "").trim();
    text = (name ? name + " here. " : "") +
      "Zodi challenge: I am the " + c.name + ", born where " + WEST[c.w].n + " crosses the Year of the " + EAST[c.e].n + ". " +
      "Find your own crossing at zodianimal.com, then tell me whether our animals get along.";
    well.textContent = text;
    bCopy.hidden = false;
    bShare.hidden = !navigator.share;
    flash.hidden = true;
  });
  bCopy.addEventListener("click", function () {
    if (!text || !navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(function () {
      flash.hidden = false; setTimeout(function () { flash.hidden = true; }, 1800);
    });
  });
  bShare.addEventListener("click", function () {
    if (text && navigator.share) navigator.share({ text: text }).catch(function () {});
  });
})();

/* ============ PROVERB OF THE DAY (deterministic by day of year) ============ */
(function proverb() {
  var zi = $("#pv-zi"); if (!zi) return;
  var P = [
    ["千里之行，始於足下","qiān lǐ zhī xíng, shǐ yú zú xià","A road of a thousand li begins under your own feet.","Whatever the season is asking of you, it begins with the step you can take tonight."],
    ["水滴石穿","shuǐ dī shí chuān","Dripping water bores through stone.","Small returns, repeated under the moon, outwear any single push."],
    ["塞翁失马","sài wēng shī mǎ","The old man at the frontier lost his horse.","What looks like loss may be the door. Withhold the verdict a while."],
    ["磨刀不误砍柴工","mó dāo bú wù kǎn chái gōng","Sharpening the axe does not delay the woodcutting.","Preparation is not procrastination. The wheel already knows this."],
    ["良药苦口","liáng yào kǔ kǒu","Good medicine tastes bitter.","The advice you flinched from this week is probably the true one."],
    ["画龙点睛","huà lóng diǎn jīng","Paint the dragon, then dot its eyes.","The work is nearly alive. One honest finishing touch, not ten more coats."]
  ];
  var start = new Date(NOW.getFullYear(), 0, 0);
  var doy = Math.floor((NOW - start) / 86400000);
  var p = P[doy % P.length];
  zi.innerHTML = "<ruby>" + p[0] + "<rt>" + p[1] + "</rt></ruby>";
  var sp = $("#say-proverb");
  if (sp) sp.setAttribute("data-say", p[0]);
  $("#pv-tr").textContent = p[2];
  $("#pv-gloss").textContent = p[3] + " Chosen by the day of the year, the same for every visitor tonight.";
})();

/* ============ GATE STRING: SCROLL SPY + DEPTH THREAD ============ */
(function gatestring() {
  var sigils = $$(".gs-sigil");
  if (!sigils.length) return;
  var sections = sigils.map(function (a) { return document.querySelector(a.getAttribute("href")); });
  if ("IntersectionObserver" in window) {
    var current = null;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) current = en.target.id; });
      sigils.forEach(function (a) {
        a.classList.toggle("is-here", a.getAttribute("href").slice(1) === current);
      });
      var idx = sections.findIndex(function (s) { return s && s.id === current; });
      sigils.forEach(function (a, i) { a.classList.toggle("is-passed", idx > -1 && i < idx); });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(function (s) { if (s) spy.observe(s); });
  }
  var thread = $("#gsThread");
  var depthEl = $("#gsDepth");
  var stageSpans = $$("[data-stage]");
  var STAGES = ["Sleeper","Stirring","Seeing","Awakened","All-Seeing"];
  var ticking = false;
  function depth() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var f = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
    if (thread) thread.style.setProperty("--depth", f.toFixed(4));
    var s = f < 0.15 ? 0 : f < 0.38 ? 1 : f < 0.62 ? 2 : f < 0.86 ? 3 : 4;
    if (depthEl && depthEl.textContent !== STAGES[s]) depthEl.textContent = STAGES[s];
    stageSpans.forEach(function (sp, i) { sp.classList.toggle("on", i <= s); });
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(depth); }
  }, { passive: true });
  depth();
})();

/* ============ PRONOUNCE (real Web Speech API, click only, never autoplays;
   the buttons stay hidden when no speech engine exists) ============ */
(function pronounce() {
  var btns = $$(".say-btn");
  if (!btns.length) return;
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;
  btns.forEach(function (b) { b.hidden = false; });
  var zhVoice = null;
  function pickVoice() {
    var vs = speechSynthesis.getVoices();
    for (var i = 0; i < vs.length; i++) {
      if (/^zh([-_]|$)/i.test(vs[i].lang)) {
        if (!zhVoice) zhVoice = vs[i];
        if (/CN|Hans/i.test(vs[i].lang)) { zhVoice = vs[i]; break; }
      }
    }
  }
  pickVoice();
  if (typeof speechSynthesis.onvoiceschanged !== "undefined") {
    speechSynthesis.addEventListener("voiceschanged", pickVoice);
  }
  btns.forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.getAttribute("data-say");
      if (!t) return;
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(t);
      u.lang = "zh-CN";
      if (zhVoice) u.voice = zhVoice;
      u.rate = 0.85;
      speechSynthesis.speak(u);
    });
  });
})();

/* ============ SCROLL REVEAL ============ */
(function reveals() {
  var els = $$(".rv");
  if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("is-in"); }); return; }
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("is-in"); obs.unobserve(e.target); } });
  }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });
  els.forEach(function (e) { obs.observe(e); });
})();

/* ============ BOOT ============ */
if (PROFILE) setCrossing(PROFILE.w, PROFILE.e, { year: PROFILE.year });
else setCrossing(3, 5, { year: 1989 });
paintWheel();
})();
