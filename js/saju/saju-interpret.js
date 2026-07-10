/* ============================================================
   saju-interpret.js, traceable interpretation layer
   ------------------------------------------------------------
   Turns computed chart FACTS into a reading, where every sentence
   is a traceable CLAIM: id, statement, evidence, rules, version,
   confidence, counter-evidence, lineage, safe level, glossary, lesson.

   Deterministic and templated. It NEVER invents chart rules, it only
   fills approved templates from evidence the engine already computed,
   and every emitted statement must pass safeWordingLint().

   Structure follows the safer-fortune frame (ethics file 17):
   Pattern to Activation to Range to Choice to Reflection to Escalation.

   Depends on saju-engine.js. UMD (browser window.SajuInterpret + Node).
   ============================================================ */
(function (root, factory) {
  var Engine = (typeof require !== "undefined") ? require("./saju-engine.js") : root.SajuEngine;
  var api = factory(Engine);
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.SajuInterpret = api;
})(typeof self !== "undefined" ? self : this, function (Engine) {
  "use strict";

  var VERSION = "saju-interpret/1.0.0";
  var SOURCES = ["SAJU_SOURCE_LEDGER_V2.md"];

  // ---- ranged template vocabulary (a RANGE of expressions, never a fixed label) ----
  var DM_RANGE = {
    Wood:  ["steady, principled, quietly growing", "rigid or unbending when pushed"],
    Fire:  ["warm and quick to connect", "burning hot and then running out"],
    Earth: ["grounded and dependable", "weighed down when it carries too much"],
    Metal: ["clear and discerning", "sharp or over-cutting under pressure"],
    Water: ["deep and adaptable", "withdrawn or hard to read"]
  };

  // ---- self-identity: a warm, hedged recognition of who the Day Master is at core.
  // Synthesized from a panel of reader voices, then passed through safeWordingLint like
  // every other statement. Named as a tendency to recognize, never a fixed verdict. ----
  var IDENTITY = {
    Wood:  "At your core you tend to reach upward, wanting your growth to mean something and to branch in your own direction. People can feel that quiet spine in you, and it often reads as principle more than stubbornness.",
    Fire:  "You read as someone who warms a room without trying, drawn to say the thing others feel but cannot name. That brightness is a real gift, not too much, and people often gather near it.",
    Earth: "At heart you tend to be the steady ground others stand on, the one who holds things together while people lean in close. Your care runs quiet and deep, and it is often felt more than it is spoken.",
    Metal: "You tend to see straight to what matters and name it cleanly, setting the noise aside. That clarity is a form of honesty, and people often trust your read even when it stings a little.",
    Water: "At your core you tend to move like water, finding the way around what blocks you rather than forcing through it. You often understand far more than you say, and that reads as depth, not overthinking."
  };

  // ---- carry-forward: a gentle, future-facing line to take away. Hedged, never a command,
  // never an imperative opener; frames preparation as an invitation, not a verdict. ----
  var CARRY = {
    Wood:  "A season ahead may ask where you most want to grow, and it can be worth naming that early. Letting a little flex into your branches often keeps you standing where staying stiff would not.",
    Fire:  "It can help to tend your own flame as gently as you tend everyone else's, since a fire fed well tends to last. A theme ahead may be learning where to spend your warmth and where to bank it.",
    Earth: "There is worth in remembering that ground needs its own rest to stay fertile. A season ahead may invite you to let others hold you for a change, which can feel strange and still be good.",
    Metal: "It may help to let your edge rest in its sheath at times, since not everything asks to be cut. A theme ahead can be choosing which truths to speak now and which to let ripen a while longer.",
    Water: "There can be value in letting a few trusted people down into your depths, and in letting a little of what you notice reach the surface. A season ahead may reward trusting where your own current is heading."
  };
  var CLIMATE_RANGE = {
    cold: ["slow to warm up", "calm and deliberate once moving"],
    hot: ["quick and expressive", "prone to running hot"],
    temperate: ["fairly even-keeled", "without a strong seasonal pull"]
  };
  var TG_THEME = {
    "비겁": ["self-direction, peers, and independence", "rivalry or stubborn self-reliance"],
    "식상": ["expression, ideas, and output", "restlessness or spreading energy too wide"],
    "재성": ["resourcefulness and a feel for worth", "over-reaching or scattering focus"],
    "관성": ["structure, responsibility, and standards", "pressure or rigidity"],
    "인성": ["learning, support, and absorption", "leaning on others or slow starts"]
  };
  var TG_EN = { "비겁": "Companion", "인성": "Resource", "식상": "Output", "재성": "Wealth", "관성": "Officer" };
  var EL_QUALITY = { Wood: "growth", Fire: "warmth", Earth: "grounding", Metal: "clarity", Water: "flow" };
  var W = Engine.WUXING;

  // hangul + English in prose (the chart and the wheel carry the hanja already)
  function elName(el) { return W.ko[el] + " " + el; }
  function aan(w) { return /^[aeiou]/i.test(w) ? "an" : "a"; }

  // ---- safe-wording linter (deterministic guard; every statement must pass) ----
  var REJECT = [
    /\b(will|going to|destined to|fated to|guaranteed to)\s+die\b/i,
    /\b(die|death)\s+(young|early|by|before|in)\b/i,
    /\byour death\b/i, /\b(fatal|terminal|deadly)\b/i, /\b(short|shortened)\s+(life|lifespan)\b/i,
    /\byou (will|are going to|'?ll)\s+(get|develop|have)\s+(cancer|a stroke|a tumou?r|diabetes|heart)/i,
    /\b(diagnosed with|suffering from)\b/i,
    /\byou (will|won'?t|can'?t|cannot)\s+(get pregnant|conceive|have (a )?(child|children|baby|kids))\b/i,
    /\b(infertile|barren|sterile)\b/i,
    /\byou will (get|be|become) (rich|wealthy)\b/i, /\bguaranteed (wealth|money|profit|returns?|riches)\b/i,
    /\b(win the lottery|strike it rich|make a fortune)\b/i, /\b(certain|sure|guaranteed) (gain|profit|windfall)\b/i,
    /\byou will (win|lose) (the|your|a) (lawsuit|case|trial|court)\b/i, /\byou will be (arrested|charged|sued|imprisoned|convicted)\b/i,
    /\byou will (marry|divorce|be betrayed|be cheated on|be left)\b/i, /\b(destined|fated) to (marry|divorce|be alone|never marry)\b/i,
    /\b(he|she|they) will (leave|betray|cheat on) you\b/i, /\byou will never (marry|find love)\b/i,
    /\b(stop|quit|skip|come off) (taking )?(your )?(medication|meds|medicine|treatment|pills)\b/i,
    /\b(don'?t|do not|avoid) (see|seeing) (a )?(doctor|physician|hospital)\b/i,
    /\b(cure|heal|treat) (your|the) (illness|disease|condition)\b/i,
    // prescriptive life advice + fixed-fate + guarantee language
    /\byou should\b/i,
    /\bguarantees?\b/i,
    /\bis fixed\b/i,
    /\bfate\b[^.]*\bfixed\b/i,
    /^\s*(avoid|take|quit|stop|buy|sell|invest|marry|move|sign|wear)\b/i,
    /\bavoid (signing|all|any|business|contracts|the)\b/i
  ];
  var FEAR = /\b(doom|doomed|curse|cursed|jinxed|disaster|disastrous|catastrophe|catastrophic|ruined|ruin|calamity|hex)\b/i;
  var FIXED = /\b(you will|you'?re going to|you'?ll|is destined to|is fated to|guaranteed to|definitely|certainly)\b/i;
  var HEDGE = /\b(can|may|might|could|tends? to|often|one way|a theme|invites?|asks for|worth|toward|through to|point(s)? to|read as|leans?)\b/i;

  function safeWordingLint(text) {
    var issues = [];
    var t = String(text || "");
    REJECT.forEach(function (re) { if (re.test(t)) issues.push("banned deterministic claim: " + re.source.slice(0, 40)); });
    if (FEAR.test(t)) issues.push("fear word (soften to pressure/attention)");
    if (FIXED.test(t) && !HEDGE.test(t)) issues.push("fixed-outcome assertion without a hedge");
    return { ok: issues.length === 0, issues: issues };
  }

  // ---- claim factory ----
  function claim(o) {
    return {
      id: o.id, section: o.section, statement: o.statement,
      evidence: o.evidence || [], rules: o.rules || [], rule_version: VERSION,
      confidence: o.confidence || "tentative",
      counter: o.counter || "", lineage: o.lineage || "practitioner",
      safe_level: "reflective",
      glossary: o.glossary || [], lesson: o.lesson || null, sources: SOURCES
    };
  }

  // dominant Ten God category from the element balance (weighted), relative to the Day Master
  function dominantTenGod(dmEl, balance) {
    var cats = {};
    ["Wood", "Fire", "Earth", "Metal", "Water"].forEach(function (el) {
      var w = balance[el] || 0; if (!w) return;
      var tg = Engine.tenGodByElement(dmEl, el);
      if (tg) cats[tg.ko] = (cats[tg.ko] || 0) + w;
    });
    var best = null, bestW = -1;
    Object.keys(cats).forEach(function (k) { if (cats[k] > bestW) { bestW = cats[k]; best = k; } });
    return best;
  }

  // ---------------------------------------------------------------------
  function interpret(chart, options) {
    options = options || {};
    if (!chart || !chart.pillars) return { error: "no chart" };
    var dm = chart.day_master, s = chart.strength, cl = chart.climate, y = chart.yongsin, bal = chart.element_balance;
    var yin = dm.yin;
    var sections = { Pattern: [], Activation: [], Range: [], Choice: [], Carry: [], Reflection: [], Escalation: [] };

    // --- Pattern: lead synthesis ---
    sections.Pattern.push(claim({
      id: "lead-synthesis", section: "Pattern",
      statement: "Your chart centers on a " + (yin ? "yin" : "yang") + " " + dm.element + " Day Master (" + dm.ko + " " + (dm.rom || "") + "), born in the " + cl.season.name + " season, and by the 억부 method it reads " + s.verdict.en + ".",
      evidence: ["Day stem " + dm.char + " (" + dm.element + ", " + (yin ? "yin" : "yang") + ")", "Month branch season: " + cl.season.name, "Strength index " + s.index + "/100, " + s.verdict.ko + " " + s.verdict.han],
      rules: ["DM-identity", "EOKBU-strength"], confidence: "well-supported", lineage: "shared",
      counter: "This is the shape of the chart, not a fortune; strength thresholds vary between readers.",
      glossary: ["일간", "신강", "신약"], lesson: { href: "#four-pillars", label: "The four pillars" }
    }));

    // --- Pattern: Day Master temperament (ranged) ---
    var dr = DM_RANGE[dm.element];
    sections.Pattern.push(claim({
      id: "day-master", section: "Pattern",
      statement: "The tradition treats your Day stem as your core operating style, not your luck. A " + (yin ? "yin" : "yang") + " " + dm.element + " self can run anywhere from " + dr[0] + " to " + dr[1] + ", where you sit on that range is something you can steer.",
      evidence: ["Day stem " + dm.char + " = " + (yin ? "yin" : "yang") + " " + dm.element],
      rules: ["DM-temperament"], confidence: "likely", lineage: "shared",
      counter: "One stem is a starting point; the whole chart and the current season shade it.",
      glossary: ["일간"], lesson: { href: "#four-pillars", label: "The four pillars" }
    }));

    // --- Pattern: who you are (self-identity, warm and hedged) ---
    if (IDENTITY[dm.element]) {
      sections.Pattern.push(claim({
        id: "self-identity", section: "Pattern",
        statement: IDENTITY[dm.element],
        evidence: ["Day stem " + dm.char + " = " + (yin ? "yin" : "yang") + " " + dm.element + " Day Master"],
        rules: ["DM-identity", "DM-temperament"], confidence: "likely", lineage: "practitioner",
        counter: "This is a tendency to recognize yourself in, not a verdict; the whole chart and the season shade it.",
        glossary: ["일간"], lesson: { href: "#four-pillars", label: "The four pillars" }
      }));
    }

    // --- Pattern: climate lean ---
    var tkey = cl.temp.en === "cold" ? "cold" : (cl.temp.en === "hot" ? "hot" : "temperate");
    var crg = CLIMATE_RANGE[tkey];
    sections.Pattern.push(claim({
      id: "climate", section: "Pattern",
      statement: "Born in a " + cl.season.name + " month, the chart leans " + cl.temp.en + (cl.damp.en !== "balanced" ? " and " + cl.damp.en : "") + " (조후). That can read as " + crg[0] + " through to " + crg[1] + (cl.primary ? ". The balancing element here is " + elName(cl.primary) + ", worth favoring in how you pace things." : "."),
      evidence: ["Month branch " + cl.season.branch, "heat " + cl.heat + ", moisture " + cl.moisture, "climate 용신: " + (cl.primary || "none")],
      rules: ["JOHU-climate"], confidence: "tentative", lineage: "practitioner",
      counter: "조후 here is a codeable simplification of a qualitative tradition; other methods can lead.",
      glossary: ["조후", "한난", "조습"], lesson: { href: "#distinct", label: "Why Saju differs" }
    }));

    // --- Activation: dominant Ten God theme ---
    var domKo = dominantTenGod(dm.element, bal);
    if (domKo && TG_THEME[domKo]) {
      var th = TG_THEME[domKo];
      sections.Activation.push(claim({
        id: "dominant-ten-god", section: "Activation",
        statement: "Across your chart, the loudest relational force reads as " + TG_EN[domKo] + " (" + domKo + "). This can range from " + th[0] + " to " + th[1] + ". The choice is where to point it, not whether you have it.",
        evidence: ["Element balance " + JSON.stringify(bal), "dominant Ten-God category vs Day Master: " + domKo],
        rules: ["TENGOD-dominant"], confidence: "likely", lineage: "practitioner",
        counter: "This weighs surface elements; hidden stems and combinations can shift which force truly leads.",
        glossary: ["십신", domKo], lesson: { href: "#eight", label: "Ten stems, twelve branches" }
      }));
    }

    // --- Range: strength + useful element ---
    var leadEl = y.leadElement;
    var xtext = y.mode === "agree" ? "The 조후 climate check agrees, which reinforces it." :
      (y.mode === "tension" ? (y.lead === "조후" ? "The 조후 climate check leans elsewhere, and in this climatic extreme it takes the lead." : "The 조후 climate check points to a different element, so both are worth holding.") : "Climate is temperate, so the strength read stands on its own.");
    sections.Range.push(claim({
      id: "strength-yongsin", section: "Range",
      statement: "By 억부 your Day Master reads " + s.verdict.en + " (" + s.support_weight + " supporting against " + s.weakening_weight + " weakening across the chart). Leaning toward " + elName(leadEl) + " tends to steady it. " + xtext,
      evidence: ["Strength index " + s.index + "/100", "억부 favorable: " + s.favorable.primary, "조후 favorable: " + (cl.primary || "none"), "cross-check: " + y.mode],
      rules: ["EOKBU-strength", "YONGSIN-crosscheck"], confidence: "likely", lineage: "practitioner",
      counter: s.caveat,
      glossary: ["용신", "억부", "조후"], lesson: { href: "#distinct", label: "Why Saju differs" }
    }));

    // --- Choice: current Daeun season ---
    var d = options.daeun || chart.daeun || (chart.daeun_both ? chart.daeun_both.male : null);
    if (d && d.periods) {
      var cur = null;
      for (var i = 0; i < d.periods.length; i++) if (d.periods[i].current) { cur = d.periods[i]; break; }
      if (cur) {
        var toneText = cur.tone === "supportive" ? "a supportive climate, a tailwind for steady effort"
          : cur.tone === "challenging" ? "a season that asks more of you, an invitation to pace yourself and build resilience, not a verdict"
          : "a mixed climate carrying both support and friction";
        sections.Choice.push(claim({
          id: "current-daeun", section: "Choice",
          statement: "Right now you are in a " + cur.stem.element + "/" + cur.branch.element + " Daeun (ages " + cur.age_start + "–" + cur.age_end + "), " + aan(cur.ten_god.en) + " " + cur.ten_god.en + " season. It tends to bring " + toneText + ". A climate to work with, one year at a time.",
          evidence: ["Current Daeun " + cur.stem.char + cur.branch.char + " (" + cur.age_start + "–" + cur.age_end + ")", "direction " + d.direction, "tone " + cur.tone],
          rules: ["DAEUN-season"], confidence: "tentative", lineage: "practitioner",
          counter: "A luck pillar is symbolic climate, not events; the annual 세운 shades each year within it.",
          glossary: ["대운", "세운"], lesson: { href: "#birth-gate", label: "River of Time" }
        }));
      }
    }

    // --- Carry: a gentle thing to take forward (self-worth + preparation) ---
    if (CARRY[dm.element]) {
      sections.Carry.push(claim({
        id: "carry-forward", section: "Carry",
        statement: CARRY[dm.element],
        evidence: ["Day Master element " + dm.element, "useful element (cross-check lead): " + leadEl],
        rules: ["CARRY-forward"], confidence: "tentative", lineage: "product",
        counter: "A gentle suggestion to sit with, not instruction; take what fits and leave the rest.",
        glossary: ["용신"], lesson: null
      }));
    }

    // --- Reflection ---
    sections.Reflection.push(claim({
      id: "reflection", section: "Reflection",
      statement: "A question to sit with: where in your life could a little more " + EL_QUALITY[leadEl] + " come in, and what would you do with the steadiness it brings?",
      evidence: ["Useful element (cross-check lead): " + leadEl],
      rules: ["REFLECTION"], confidence: "n/a", lineage: "product",
      counter: "", glossary: ["용신"], lesson: null
    }));

    // --- Escalation guard ---
    sections.Escalation.push(claim({
      id: "escalation", section: "Escalation",
      statement: "This reading speaks to temperament and timing only. It does not diagnose health, predict relationships, wealth, or life events, and it is not medical, legal, or financial advice. If anything here touches a real worry, bring it to someone you trust or a qualified professional.",
      evidence: ["Ethics policy: gated topics (health, fertility, relationships) are not generated"],
      rules: ["SAFETY-escalation"], confidence: "well-supported", lineage: "product",
      counter: "", glossary: [], lesson: null
    }));

    // assemble in reading order; lint every statement (drop any that fail, never show unsafe copy)
    var order = [
      { key: "Pattern", title: "The shape of it" },
      { key: "Activation", title: "What's loud in the chart" },
      { key: "Range", title: "Where it leans, and what steadies it" },
      { key: "Choice", title: "The season you're in" },
      { key: "Carry", title: "To carry forward" },
      { key: "Reflection", title: "To sit with" },
      { key: "Escalation", title: "A note on limits" }
    ];
    var out = [], dropped = [];
    order.forEach(function (o) {
      var kept = (sections[o.key] || []).filter(function (c) {
        var lint = safeWordingLint(c.statement);
        if (!lint.ok) { dropped.push({ id: c.id, issues: lint.issues }); return false; }
        return true;
      });
      if (kept.length) out.push({ key: o.key, title: o.title, claims: kept });
    });

    return { version: VERSION, sections: out, dropped: dropped, claim_count: out.reduce(function (n, s) { return n + s.claims.length; }, 0) };
  }

  // Small reusable accessors so other surfaces (e.g. the share card) can reuse the exact
  // vetted language without re-running a full interpret(). Both strings already pass the linter.
  function identityFor(element) { return IDENTITY[element] || ""; }
  function carryFor(element) { return CARRY[element] || ""; }

  return { VERSION: VERSION, interpret: interpret, safeWordingLint: safeWordingLint, identityFor: identityFor, carryFor: carryFor };
});
