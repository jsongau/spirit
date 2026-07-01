/* ============================================================
   THE PRIMAL ORACLE — shared engine (pure, no DOM)
   Every page reuses these functions. Depends on data.js (ORACLE).
   Exposes window.ENGINE.
   ============================================================ */

window.ENGINE = (function () {
  "use strict";
  const O = ORACLE;

  function sunSign(month, day) {
    for (const name of O.WEST_ORDER) {
      const [sm, sd, em, ed] = O.WEST[name].dates;
      if (sm <= em) { if ((month===sm && day>=sd) || (month===em && day<=ed) || (month>sm && month<em)) return name; }
      else { if ((month===sm && day>=sd) || (month===em && day<=ed) || (month>sm) || (month<em)) return name; }
    }
    return "Capricorn";
  }

  function yearAnimal(year, month, day) {
    let eff = year;
    const b = O.CNY[year];
    if (b && (month < b[0] || (month === b[0] && day < b[1]))) eff = year - 1;
    const idx = ((eff - 2020) % 12 + 12) % 12;
    return { animal: O.CHINESE_ORDER[idx], effYear: eff };
  }

  function element(effYear) { return O.ELEMENT_BY_DIGIT[((effYear % 10)+10)%10]; }
  function primalOf(sign, animal) { return O.GRID[sign][O.CHINESE_ORDER.indexOf(animal)]; }

  function compute(dateStr) {
    const d = new Date(dateStr + "T12:00:00");
    if (isNaN(d)) return null;
    const m = d.getMonth()+1, day = d.getDate(), y = d.getFullYear();
    const sign = sunSign(m, day);
    const { animal, effYear } = yearAnimal(y, m, day);
    const el = element(effYear);
    const primal = primalOf(sign, animal);
    return { sign, animal, element: el, primal, effYear, date: d,
             glyph: O.GLYPH_WEST[sign], cn: O.CN_EAST[animal] };
  }

  // Compute directly from a sign + animal (for browsing animal pages without a date)
  function fromSignAnimal(sign, animal) {
    return { sign, animal, element:"Water", primal: primalOf(sign, animal),
             glyph:O.GLYPH_WEST[sign], cn:O.CN_EAST[animal], noElement:true };
  }

  // Reverse lookup: given a primal animal name, return its sign + animal
  function locate(primal) {
    for (const s of O.WEST_ORDER) {
      const i = O.GRID[s].indexOf(primal);
      if (i >= 0) return { sign:s, animal:O.CHINESE_ORDER[i] };
    }
    return null;
  }

  function essence(sign, animal, primal) {
    if (O.DEEP[primal]) return O.DEEP[primal].essence;
    const w = O.WEST[sign], e = O.EAST[animal];
    return `${w.keyword} of the daylight, carrying the instinct to ${e.instinct}`;
  }

  function reading(c) {
    const w = O.WEST[c.sign], e = O.EAST[c.animal], el = O.ELEMENTS[c.element || "Water"];
    const deep = O.DEEP[c.primal];
    if (deep) {
      return { essence: deep.essence, stones: deep.stones, gates:[
        { t:"Where you stand now",   b: deep.stand },
        { t:"What you need soon",     b: deep.need },
        { t:"How to plan the season", b: deep.plan },
        { t:"What to be aware of",    b: deep.beware },
        { t:"Your highest form",      b: deep.godly + " " + deep.keystone }
      ]};
    }
    const stones = [O.SUN_STONE[c.sign], el.stone, "Moonstone"].filter((v,i,a)=>a.indexOf(v)===i);
    return {
      essence: essence(c.sign, c.animal, c.primal),
      stones,
      gates: [
        { t:"Where you stand now",
          b:`${w.stand} As a ${c.animal}-natured soul, your first move under pressure is to ${e.instinct}, and the ${c.element||"Water"} in you makes that ${el.note.split(",")[0]}. The ${c.primal} is the shape these forces settle into when they stop fighting each other.` },
        { t:"What you need soon",
          b:`The season is asking you ${w.need}. Your gift is ${w.light} crossed with ${e.light}; the craving that stands in for the real need is usually more control or more proof. Feed the need, not the craving.` },
        { t:"How to plan the season",
          b:`Make one small private move this dark-to-new moon, one visible step this lunar cycle, and one larger commitment this season. Tie them to the Moon. Your ${c.element||"Water"} engine rewards ${el.quality}, so let the plan move at that speed rather than forcing another's.` },
        { t:"What to be aware of",
          b:`Your shadow is ${e.shadow}, sharpened by ${w.shadow}. It rarely arrives as an enemy. It arrives wearing the face of good sense, the reasonable sentence that lets you avoid the move you already know you need to make.` },
        { t:"Your highest form",
          b:`The ${c.primal} awake keeps every gift and stops being driven by the one fear underneath it. ${w.light.charAt(0).toUpperCase()+w.light.slice(1)} becomes leadership rather than performance. The single practice: each new moon, do one small thing the fear would talk you out of, and notice that you survive it.` }
      ]
    };
  }

  function moonPhase(date=new Date()) {
    const synodic = 29.530588853;
    const ref = Date.UTC(2000,0,6,18,14);
    let age = ((date.getTime() - ref) / 86400000) % synodic; if (age < 0) age += synodic;
    const frac = age / synodic;
    const t = [
      [0.03,"New Moon","open and plant a private intention"],
      [0.22,"Waxing Crescent","gather what you need and say one yes"],
      [0.28,"First Quarter","act through the first resistance"],
      [0.47,"Waxing Gibbous","refine and stay the course"],
      [0.53,"Full Moon","let yourself be seen, then release what is finished"],
      [0.72,"Waning Gibbous","share, teach, give thanks"],
      [0.78,"Last Quarter","cut a loss and forgive"],
      [0.97,"Waning Crescent","rest without guilt and prepare the next seed"],
      [1.01,"New Moon","open and plant a private intention"]
    ];
    for (const [lim,name,advice] of t) if (frac <= lim) return { name, advice, frac, age:Math.round(age) };
    return { name:"New Moon", advice:"open and plant a private intention", frac, age:Math.round(age) };
  }

  const MODE = { Aries:"C",Cancer:"C",Libra:"C",Capricorn:"C", Taurus:"F",Leo:"F",Scorpio:"F",Aquarius:"F", Gemini:"M",Virgo:"M",Sagittarius:"M",Pisces:"M" };
  function elementBond(a,b){
    if (a===b) return 3;
    if ((a==="Fire"&&b==="Air")||(a==="Air"&&b==="Fire")||(a==="Earth"&&b==="Water")||(a==="Water"&&b==="Earth")) return 2;
    if ((a==="Fire"&&b==="Water")||(a==="Water"&&b==="Fire")||(a==="Earth"&&b==="Air")||(a==="Air"&&b==="Earth")) return -2;
    return 0;
  }
  function compatibility(cA, cB) {
    let score = 10; const notes = [];
    const eA = O.EAST[cA.animal];
    if (cA.animal === cB.animal) { score += 1; notes.push("Same Year-animal: an instinctive familiarity"); }
    if (eA.trine.includes(cB.animal)) { score += 3; notes.push("Trine allies (San He): the strongest natural bond"); }
    if (eA.secret === cB.animal) { score += 3; notes.push("Secret friends (Liu He): an easy, balancing fit"); }
    if (eA.clash === cB.animal) { score -= 3; notes.push("A clash (Liu Chong): opposed energies, handle with care"); }
    if (eA.harm === cB.animal) { score -= 2; notes.push("A quiet harm (Liu Hai): watch for slow corrosion"); }
    const elb = elementBond(O.WEST[cA.sign].element, O.WEST[cB.sign].element); score += elb;
    if (elb === 3) notes.push("Same Sun-element: you feel the world the same way");
    else if (elb === 2) notes.push("Complementary Sun-elements: you balance each other");
    else if (elb === -2) notes.push("Friction Sun-elements: different operating temperatures");
    const md = MODE[cA.sign] !== MODE[cB.sign] ? 1 : -1; score += md;
    notes.push(md===1 ? "Different modes: one starts, one sustains" : "Same mode: two of a kind, watch for gridlock");
    let tier = score>=16?"Twin Flame":score>=13?"Strong":score>=10?"Workable":score>=7?"Friction":"Karmic Lesson";
    return { score, tier, notes };
  }

  return { compute, fromSignAnimal, locate, reading, essence, moonPhase, compatibility, sunSign, yearAnimal, element, primalOf };
})();
