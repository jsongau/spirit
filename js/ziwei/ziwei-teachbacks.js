/* ziwei-teachbacks.js: Level 8 capstone data for Purple Star Astrology (紫微斗數).
   Teach-back prompts with two-register model answers and a self-scoring rubric, the reader's
   uncertainty phrasebook, the consultation structure (labeled house method), and the 20-question
   Imperial exam. Synthesized from docs/zwds/02-05, PSA-CURRICULUM Level 8, and the web-research
   teach-back corpus in docs/purple-star-hub/research/teachbacks/ (triangle, transformations,
   brightness, timing, ethics-and-reading-order), rewritten to the site's non-deterministic voice.
   Model answers teach; they never police (honour-system self-score, per PSA-CURRICULUM Part 3).
   Plain browser JS. No modules. Attaches to window.ZiweiData. Idempotent. Traditional characters only. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.teachbacks) return;

  var RUBRIC = [
    "Accurate to the tradition as this hub teaches it",
    "No deterministic claim about health, death, wealth, marriage, or disaster",
    "Plain English a newcomer could follow",
    "Real vocabulary used with its ladder (characters, pinyin, meaning)"
  ];

  var TEACHBACKS = [
    {
      id: "what-is-a-chart",
      prompt: "Explain what a Purple Star chart is, in under a minute, to someone who has never heard of it.",
      beginner: "A Purple Star chart maps a life as twelve rooms, with symbolic stars placed by your birth date and hour. It is read like a schedule and a decision aid, not a sentence handed down. You never read one room alone, and the chart is meant to inform your choices, which always stay with you.",
      practitioner: "紫微斗數 Zǐwēi Dǒushù is a calculated natal system: twelve Earthly-Branch palaces, fourteen principal stars anchored by Zi Wei's position, and the Four Transformations that activate stars across the natal, decade, and annual layers. It is not observational astronomy and not fatalism; the corpus frames it as a life schedule. A responsible reading describes structure and tendency, returns agency to the person, and answers only what was asked.",
      rubric: RUBRIC,
      source: ["research/teachbacks/ethics-and-reading-order.md", "zwds/01", "zwds/04"]
    },
    {
      id: "teach-the-triangle",
      prompt: "Teach the Triangle rule (三方四正) to a beginner, using the wheel.",
      beginner: "In Purple Star Astrology you never read one palace by itself. You read it with three partners: the palace directly across, called the mirror or opposite palace, and the two palaces that form a triangle with it. The opposite palace pulls hardest after the room's own stars, and the two triangle rooms add supporting energy. Reading all four together turns a thin guess into a rounded picture.",
      practitioner: "三方四正 reads any palace with its opposite at 180 degrees and its two trines at 120 degrees, weighted same palace, then opposite, then trine. The opposite outranks the trines because it sits head-on as the room's complement, which is also why an empty palace borrows its stars from the opposite at reduced strength. The trines are the resource line that lifts a room or, through an unfavourable transformation, quietly weakens it. Set the tone from the four-cell group first, then layer brightness, transformations, and the timing charts before committing.",
      rubric: RUBRIC,
      source: ["research/teachbacks/triangle.md", "zwds/04#topic4", "purple-star-hub/PSA-TERMINOLOGY.md#1.5"]
    },
    {
      id: "explain-the-hook",
      prompt: "Explain the Hook (化忌 Huà Jì) to someone frightened by the word 'obstruction'.",
      beginner: "The Hook is not a curse. It is closer to hunger: the room in your chart that never quite feels full, so you keep working at it. That effort is where a lot of people build their real depth. None of the four transformations is simply good or bad; the Hook just shows where your attention keeps returning.",
      practitioner: "化忌 marks the chart's fixed pressure point and growth edge, the place a life keeps circling. Classical readings treat it as a felt lack that drives effort, not a doom sentence, and pair it with 化祿 the Flow through 祿隨忌走 to see where the effort flows back. I read it together with its star and palace, keep the register at tendency, and never let it become a claim about health, money, or marriage. The natal Hook is the most weighted of the four because it names the core attachment; the decade and annual Hooks are the timing overlay on top.",
      rubric: RUBRIC,
      source: ["research/teachbacks/transformations.md", "zwds/04#topic1", "zwds/03"]
    },
    {
      id: "explain-brightness",
      prompt: "Explain star brightness (廟旺利陷) without turning it into a good-or-bad grade.",
      beginner: "Brightness is a volume knob for each star, not a thumbs up or down. A bright star (廟 or 旺) speaks loudly and clearly, so its strengths show and its rough edges are easier to handle. A fallen star (陷) speaks quietly and off balance, so its harder side tends to lead. The star's basic personality stays the same either way; brightness only changes how loudly it comes through.",
      practitioner: "廟旺利陷 is an intensity-and-expression dial on top of a star's intrinsic nature, and the two are read together, never merged. At temple and thriving the star expresses its full character with the difficult side more governable; toward fallen the expression thins and a harsh star leads with its shadow. Because per-star, per-branch tables are contested across lineages, I treat any specific rating as school-tagged and lean on the concept of volume plus the wider chart rather than on a single label.",
      rubric: RUBRIC,
      source: ["research/teachbacks/brightness.md", "zwds/02", "purple-star-hub/PSA-TERMINOLOGY.md#1.5"]
    },
    {
      id: "read-timing",
      prompt: "Explain how timing works, keeping natal promise and temporal trigger distinct.",
      beginner: "Your birth chart is fixed terrain: twelve rooms whose contents do not change. The Five Element Bureau sets when your ten-year decades begin, the Decade Door lights one room at a time to set that stretch's theme, and the Year Wave is the weather passing over the whole map each year. The timing never changes your terrain; it decides which part gets its turn and asks you to engage it consciously.",
      practitioner: "Separate 命 from 運 first: the natal palaces, brightness, and natal 四化 hold the promise, while the Bureau sets the decade cadence and direction. Read by 疊宮, stacking 大限 and 流年 over the natal grid and noting where moving transformations land, and grade intensity by duration so a decade theme outweighs a single year. Where layers converge on one palace, name it a live activation of that domain, framed as pressure or support to engage, never a dated event.",
      rubric: RUBRIC,
      source: ["research/teachbacks/timing.md", "zwds/04#topic2", "zwds/05#topic3"]
    }
  ];

  /* The reader's phrasebook (research/teachbacks/ethics-and-reading-order.md). */
  var PHRASEBOOK = {
    maySay: [
      "The structure suggests, and this palace tends toward.",
      "This domain carries the recurring lesson, especially where the Hook lands.",
      "Different schools read this differently.",
      "This is a period that asks for extra care around, paired with ordinary suggestions.",
      "The chart cannot tell us that.",
      "This is one factor among many, and the choice stays with you."
    ],
    mayNeverSay: [
      "A fixed date or verdict of death, or any claim to read lifespan.",
      "A deterministic illness or disaster claim; a demanding period becomes lifestyle care and rest, not a diagnosis.",
      "A guaranteed wealth or poverty outcome; fortune is discussed as possibilities and conditions.",
      "A marriage-or-divorce instruction; describe what the palace shows and return the decision to the person.",
      "Anything the person did not ask about (不問不答, do not answer what was not asked)."
    ],
    throughLine: "A reading returns agency to the person. The chart informs a choice; it does not make one."
  };

  /* Consultation structure, explicitly labeled house method (not classical authority). */
  var CONSULTATION = {
    label: "This shape is our own responsible framing for the academy, house method, not a claim of classical authority.",
    steps: [
      { t: "Frame and consent", d: "Say plainly what the system is and is not, a life schedule and a decision aid. Ask what the person wants to look at, and confirm any off-limits topics up front." },
      { t: "Establish structure", d: "Read the Command Palace and its triangle to describe constitution and character before any prediction." },
      { t: "Locate the present", d: "Bring in the active Decade Door and Year Wave and the Hook of each layer to show where the current lesson and pressure sit." },
      { t: "Report signals honestly", d: "Give the strong reads, the counter-reads, and your confidence in each. Name tensions instead of smoothing them." },
      { t: "Hand back the choice", d: "Close with ordinary, actionable suggestions and a reminder that the decision belongs to the person. Answer only what was asked." }
    ]
  };

  /* The 20-question Imperial exam. Renderer shape matches the chart page renderQuiz / ziwei-practice:
     { q, opts, c (correct index), why }. Every "why" teaches structure, never a fortune.
     Authored fresh across the whole path (palaces, stars, transformations, triangle, brightness,
     timing, auxiliaries, ethics), grounded in docs 02-05 + the teach-back research. */
  var IMPERIAL_EXAM = [
    { q: "A chart is read as twelve what, placed by birth date and hour?", opts: ["Predictions", "Palaces (rooms of life)", "Elements", "Animals"], c: 1, why: "Correct. Twelve Earthly-Branch palaces are the fixed skeleton; the stars are placed onto them." },
    { q: "Which single companion palace weighs most when reading a room?", opts: ["A trine partner", "The opposite (mirror) palace", "The next room clockwise", "The Fortune palace"], c: 1, why: "Correct. After the room's own stars, the 對宮 opposite palace exerts the strongest single influence." },
    { q: "An empty palace borrows its stars from where, and at what strength?", opts: ["The next palace, full strength", "Its opposite palace, reduced strength", "The Life palace, full strength", "Nowhere; it is read as absent"], c: 1, why: "Correct. 借星: an empty room borrows the opposite palace's stars at a discounted strength." },
    { q: "The Four Transformations attach to what?", opts: ["Four palaces", "Four stars", "The birth animal", "The Life palace only"], c: 1, why: "Correct. A Heavenly Stem sends the four forces to four specific stars; each acts wherever its star sits." },
    { q: "The Hook (化忌) is best taught as which of these?", opts: ["A curse", "A fixed loss", "A recurring pressure point and growth edge", "A promise of poverty"], c: 2, why: "Correct. Classical readings frame the Hook as felt hunger that drives effort, never a doom sentence." },
    { q: "Which transformation is the mildest, polishing what already exists?", opts: ["化祿 the Flow", "化權 the Power", "化科 the Shine", "化忌 the Hook"], c: 2, why: "Correct. 化科 the Shine is the gentlest; it brings recognition rather than creating something new." },
    { q: "In the orthodox Northern table, does Zi Wei ever receive the Hook (化忌)?", opts: ["Yes, in most years", "No; it takes the Power and the Shine, never the Flow or Hook", "Only in Fire years", "It never transforms at all"], c: 1, why: "Correct (ruling C1). Zi Wei receives 化權 in Ren years and 化科 in Yi years, never Lù or Jì." },
    { q: "Star brightness (廟旺利陷) is best understood as what?", opts: ["A good-or-bad grade", "How loudly a star speaks, its volume", "The star's element", "A prediction of success"], c: 1, why: "Correct. Brightness is volume layered on the star's nature; a bright star is not automatically good." },
    { q: "A star at 陷 (fallen) means what?", opts: ["The domain is doomed", "The star's shadow side tends to lead", "The star disappears", "Guaranteed hardship"], c: 1, why: "Correct. Fallen means the harder side leads and expression thins, never doom. Phrase which traits lead." },
    { q: "Per-star, per-branch brightness tables should be treated how?", opts: ["As settled law", "As school-dependent and needs-source", "As irrelevant", "As personality tests"], c: 1, why: "Correct. Lineages disagree on specific ratings, so teach the concept of volume and tag any table by school." },
    { q: "The Five Element Bureau (五行局) sets what?", opts: ["Your personality grade", "The age your first decade begins, and the star-placement rhythm", "Your lucky number", "The year you marry"], c: 1, why: "Correct. The Bureau number is the first Decade Door's starting age and anchors Zi Wei's placement." },
    { q: "How do the Decade Door and the Year Wave relate?", opts: ["They are the same clock", "The door sets the decade's theme; the year knocks on one room", "The year rewrites the birth chart", "Only one exists at a time"], c: 1, why: "Correct. 大限 sets the ten-year theme; 流年 is the year's weather over the same fixed terrain." },
    { q: "What does a natal promise plus a temporal trigger mean for forecasting?", opts: ["The event is scheduled on a date", "Terrain shows what is possible; timing shows when to lean in or rest", "Nothing can be said", "Timing overrules the birth chart"], c: 1, why: "Correct. Natal terrain sets possibility; the moving layers decide whether and when a theme surfaces." },
    { q: "Reading Career (官祿宮), which palaces form its court?", opts: ["Career, Wealth, Life, Travel", "Career, Life, Wealth, Spouse", "Career alone", "Career and Parents"], c: 1, why: "Correct. Career's court is itself plus trines Life and Wealth plus its opposite, Spouse." },
    { q: "Auxiliary stars are best read how?", opts: ["Alone, as verdicts", "Never alone; with the main star, the opposite, day/night, and the cycles", "Only in the Life palace", "As the most important stars"], c: 1, why: "Correct. The conditioning layer is read in relation, never in isolation." },
    { q: "A malefic star (for example a Sha) in a surgeon's Career palace is?", opts: ["Always corrosive", "Potentially productive, depending on the room and chart", "Proof of disaster", "Meaningless"], c: 1, why: "Correct. Doc 05: auspicious is not always good and malefic is not always bad; read where it sits." },
    { q: "祿存 the Wealth Retainer always travels flanked by which two stars?", opts: ["Zuo Fu and You Bi", "Qing Yang and Tuo Luo", "Wen Chang and Wen Qu", "Huo Xing and Ling Xing"], c: 1, why: "Correct. Prosperity flanked by blades: 擎羊 on one side, 陀羅 on the other." },
    { q: "When natal, decade, and annual signals conflict, a responsible reader does what?", opts: ["Averages them into one vague line", "Names the contradiction and their confidence in each", "Ignores the weaker one silently", "Predicts the worst case"], c: 1, why: "Correct. Report both signals and the switch between them; do not smooth a real tension away." },
    { q: "Which of these may a reader NEVER say?", opts: ["The structure suggests", "This domain carries a recurring lesson", "A fixed date of death or divorce", "Different schools read this differently"], c: 2, why: "Correct. Dated death or break-up verdicts are outside the method and off-limits; return the choice to the person." },
    { q: "The principle 不問不答 means what?", opts: ["Answer everything you see", "Do not answer what was not asked", "Never speak to clients", "Charge before reading"], c: 1, why: "Correct. Dumping unrequested heavy news on an unprepared person is itself the harm; answer what was asked." }
  ];

  window.ZiweiData.teachbacks = TEACHBACKS;
  window.ZiweiData.teachbackById = (function () { var m = {}; TEACHBACKS.forEach(function (t) { m[t.id] = t; }); return m; })();
  window.ZiweiData.phrasebook = PHRASEBOOK;
  window.ZiweiData.consultation = CONSULTATION;
  window.ZiweiData.imperialExam = IMPERIAL_EXAM;
})();
