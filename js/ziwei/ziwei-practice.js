/* ziwei-practice.js: short comprehension drills for the Purple Star Astrology hub.
   Used by the right rail's "one practice question" card (PSA-HUB-EXPERIENCE §4.2), tagged by
   section so the Living Court rail shows a question relevant to the centered model.
   Question shape matches the Reader's School renderQuiz: { q, opts, c (correct index), why }.
   Every "why" teaches structure, never a fortune. No deterministic claims.
   Model 4's full sentence-comparison data ships in wave 3; a small seed lives here.
   Plain browser JS. No modules. Attaches to window.ZiweiData. Idempotent. Traditional characters only. */
(function () {
  "use strict";
  window.ZiweiData = window.ZiweiData || {};
  if (window.ZiweiData.practice) return;

  var QUESTIONS = [
    /* ---- reading-order: the court is read together ---- */
    {
      id: "order-triangle",
      tag: "reading-order",
      q: "You want to judge one palace. What must you read with it before speaking?",
      opts: ["The palace alone is enough", "Its two triangle partners and its mirror", "Only the mirror across the chart", "The next palace clockwise"],
      c: 1,
      why: "Correct. No room is read alone. The San Fang Si Zheng court is the focal palace plus its two trine partners plus the opposite mirror, judged together."
    },
    {
      id: "order-mirror",
      tag: "reading-order",
      q: "Which single companion palace usually carries the most weight?",
      opts: ["A triangle partner", "The opposite palace (the mirror)", "The palace before it", "The Fortune palace"],
      c: 1,
      why: "Correct. The opposite palace, the 對宮 mirror six rooms across, exerts the strongest single companion influence on the focal room."
    },
    /* ---- transformations: forces attach to stars ---- */
    {
      id: "tf-attaches-star",
      tag: "transformations",
      q: "A birth year's Four Transformations attach to what?",
      opts: ["Four palaces", "Four stars", "The Life palace only", "The year's animal"],
      c: 1,
      why: "Correct. Each stem sends the four forces to four specific stars, and each force then acts wherever that star is stationed. Forces ride stars, not rooms."
    },
    {
      id: "tf-hook",
      tag: "transformations",
      q: "The Hook, 化忌, is best read as what?",
      opts: ["A doom sentence", "A fixed loss", "The chart's recurring pressure point and where the work is", "A promise of poverty"],
      c: 2,
      why: "Correct. The Hook marks the room a life keeps working on. Classical readings treat it as a pressure point that teaches, never a verdict on health, money, or marriage."
    },
    {
      id: "tf-mei-hook",
      tag: "transformations",
      q: "In Mei's 1996 chart the Hook flies to Lian Zhen, sitting in her Career palace. What does that describe?",
      opts: ["A ruined career", "Workplace politics as her recurring exam", "Guaranteed promotion", "That she will change jobs"],
      c: 1,
      why: "Correct. Lian Zhen is the court politician, and the Hook bites wherever its star sits. In Career, it reads as office politics being the thing that keeps coming back until it is faced."
    },
    /* ---- synthesis: build the whole reading ---- */
    {
      id: "syn-evidence",
      tag: "synthesis",
      q: "Before you speak a verdict, which of these is NOT part of the evidence you gather?",
      opts: ["The star and its brightness", "The palace and its question", "The triangle and the mirror", "The reader's mood that day"],
      c: 3,
      why: "Correct. A reading rests on structure: the star, its brightness, the palace, the transformation, and the triangle. Everything else is noise."
    },
    {
      id: "syn-uncertainty",
      tag: "synthesis",
      q: "How should a beginner phrase a finished reading?",
      opts: ["As a fixed prediction", "With uncertainty language, as tendencies to work with", "As a warning", "As a promise if the chart is strong"],
      c: 1,
      why: "Correct. A chart is a map for reflection, not a script. The discipline is to name tendencies and leave room, because the person still moves through the chart."
    },
    {
      id: "syn-one-placement",
      tag: "synthesis",
      q: "A single star in a single palace tells you what?",
      opts: ["The whole reading", "One thread that only means something read with its court", "Nothing at all", "The person's fate"],
      c: 1,
      why: "Correct. One placement is never the reading. It is one thread, and the court answers together."
    }
  ];

  /* Seed for Model 4 (Build-a-chart-sentence), expanded in wave 3. A few star + palace
     model answers so the right rail can preview one. Non-deterministic by construction. */
  var SENTENCES = {
    "zi-wei": {
      "guan-lu-gong": {
        beginner: "The Emperor in the Career room reads as someone built to lead inside an organisation.",
        practitioner: "A practitioner would add: check the Spouse mirror for the private cost of that public seat, and read the Life triangle for whether the authority is supported.",
        missingEvidence: ["brightness of Zi Wei here", "the triangle partners", "the year's transformations"]
      }
    },
    "qi-sha": {
      "fu-qi-gong": {
        beginner: "The Warrior in the Spouse room points to a partnership between two strong, independent people.",
        practitioner: "A practitioner would add: this describes a dynamic to manage, read with the Career mirror, and never a verdict on whether the marriage lasts.",
        missingEvidence: ["brightness of Qi Sha here", "the mirror palace", "the year's transformations"]
      }
    }
  };

  window.ZiweiData.practice = QUESTIONS;
  window.ZiweiData.practiceByTag = function (tag) {
    return QUESTIONS.filter(function (q) { return q.tag === tag; });
  };
  window.ZiweiData.sentences = SENTENCES;
})();
