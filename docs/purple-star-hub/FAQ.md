# Purple Star Astrology hub — FAQ

Quick answers, each pointing to the doc with the full story. For the map of all docs, see [`README.md`](README.md).

## The system

**What is this hub?** A learning academy at `/elements/purple-star-astrology/` that teaches Zi Wei Dou Shu (紫微斗數, Purple Star Astrology) from "what is this" to being able to teach it and read responsibly. It casts charts, runs seven interactive models, tracks progress and ranks, and ends in a Level 8 capstone with a 20-question Imperial exam. Full record: [`PSA-MASTER-BUILD.md`](PSA-MASTER-BUILD.md).

**Where does the content come from?** The corpus in `../zwds/01`–`05` (doc `00` is superseded). The `ziwei-*.js` data files are generated from `PSA-TERMINOLOGY.md`, which reconciles the corpus. Level 8 also draws on the web-research teach-back corpus in `research/teachbacks/`.

**Is it finished?** Waves 1–5 are all built and on disk (uncommitted). The honest list of what is deferred is in [`reference/CONTENT-VOICE-AND-KNOWN-ISSUES.md`](reference/CONTENT-VOICE-AND-KNOWN-ISSUES.md).

## Casting and the engine

**Can it cast a chart from a birthday?** Not yet from a Gregorian date; the Gregorian-to-lunar conversion (Needs-Source S9) is out of scope. The engine casts from lunar inputs (month, day, hour branch, year stem and branch, gender). See [`reference/CASTING-ENGINE.md`](reference/CASTING-ENGINE.md).

**Is the engine correct?** It reproduces the worked chart (Mei) and the second chart (Rui) exactly, passes hand-checked Zi Wei cases, and holds every invariant across 4,320 stress-test casts. The algorithm is the standard orthodox construction; doc 04 gives the method but not the tables, so correctness is established by reproduction (ruling D14).

**Why does Mei's bureau look wrong?** The chart page narrates a Fire Bureau, but a strict cast of her 丙子 year with the Command Palace in 午 derives a Metal Bureau. Her star layout is exact; the bureau is a documented teaching choice, now flagged on the page. Details in the casting doc.

## The lessons and ranks

**How many lessons and levels?** Eight levels, 67 lessons. See [`PSA-CURRICULUM.md`](PSA-CURRICULUM.md).

**What are the ranks?** Court Novice 入門 → Palace Scribe 宮書 → Star Keeper 司星 → Warden of the Forces 司化 → Keeper of the Doors 司門 → Imperial Astrologer 欽天監, earned by level mastery. The old exam's ranks are grandfathered forever. See [`reference/PROGRESS-AND-RANKS.md`](reference/PROGRESS-AND-RANKS.md).

**Do I need an account?** No. Learning is never account-gated. "Save this path" only saves progress across browsers; it unlocks nothing.

**What is the difference between the Foundation Exam and the Imperial Exam?** The Foundation Exam is the chart page's ten questions (caps at Star Keeper). The Imperial Exam is the hub's Level 8 capstone, twenty questions; 18+ with all five teach-backs submitted seats you as Imperial Astrologer.

## The interactive layer

**What are the seven models?** Twelve Palace Court, Move-a-star, Four Transformations lab, Build-a-chart-sentence, Read the Triangle, the Timing wheel (with the Three Clocks block), and the sample-chart walkthrough (built as data, UI pending). See [`reference/INTERACTIVE-LAYER.md`](reference/INTERACTIVE-LAYER.md).

**How does the teach-back loop work?** The student writes an explanation, reveals the teacher's beginner and practitioner model answers, and self-scores against a four-point rubric. The model teaches; it does not grade. The taught failure is overclaiming, which is quoted back with the uncertainty rewrite.

**Is it accessible?** Yes: keyboard-operable, colorblind-safe (shape plus text, never color alone), 44px targets, `aria-live` announcements, reduced-motion safe, and it works with sound off. The grammar is in the interactive-layer and voice docs.

**Is there sound?** Off by default, one toggle, synthesized (no audio files), wrong answers silent, every sound with a written equivalent.

## Voice and trust

**Why no fortune-telling language?** No deterministic claims about health, death, wealth, marriage, or disaster, anywhere. The system is taught as a life schedule and a decision aid; the reader returns agency to the person (不問不答). The full voice rules and banned strings are in [`reference/CONTENT-VOICE-AND-KNOWN-ISSUES.md`](reference/CONTENT-VOICE-AND-KNOWN-ISSUES.md).

**Why traditional characters?** Traditional is the default for this hub (D12). Wave 5 converted 695 simplified ZWDS terms across the child pages; the sitewide simplified zodiac-animal glyphs were left untouched.

## Why was X decided this way?

The full registry of planning decisions (D1–D14), corpus conflicts (C1–C11), and build-time findings is [`reference/DECISIONS-AND-RULINGS.md`](reference/DECISIONS-AND-RULINGS.md). Common ones: courts are geometric (D3/C2), Zi Wei does transform (C1/D7), the network palace is 奴僕宮 (D4/C6), the season framing is a labeled metaphor (D6), and Karma stays dark until the server kinds exist (D10).

## Where do I look to change something?

- A star, palace, or transformation definition → the matching `ziwei-*.js` file ([`reference/DATA-FILES.md`](reference/DATA-FILES.md)).
- A lesson or its source page → `ziwei-lessons.js`.
- The casting math → `ziwei-caster.js` ([`reference/CASTING-ENGINE.md`](reference/CASTING-ENGINE.md)).
- A model, rail, widget, or sound → the matching wave's inline `<script>` in the hub `index.html` ([`reference/INTERACTIVE-LAYER.md`](reference/INTERACTIVE-LAYER.md)).
- A term ladder or trust correction → `PSA-TERMINOLOGY.md`, then regenerate the data.
