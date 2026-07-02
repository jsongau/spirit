/* ============================================================
   fengshui-office.js — the Office Feng Shui interactive cluster.
   One vanilla file, no dependencies, no localStorage. It hydrates,
   by element id, four tools that progressively enhance a
   server-rendered fallback in the manner of js/fengshui-room.js:

     #fso-diagnostic  Office Diagnostic. A desk on an integer room
       grid, scored 0-100 against the commanding position, 命位, on
       methods 1,2,3,4,6,7. REUSES the fengshui-room.js approach:
       same 12x10 CELL/PAD grid, same fixture helpers (centerOfSpan,
       inward, rectsOverlap, px), same honest integer geometry, same
       canSeeDoor half-plane test and headAgainstWall backing test
       (read here as the SEAT), same underBeam / mirror-cone
       penalties, keyboard nudges, prefers-reduced-motion guards.
       Adapted from the verified prototype
       docs/feng-shui/office/prototypes/office-diagnostic.html.
     #fso-peach   Animal -> 桃花位 from the San He triad. Lookup.
     #fso-colors  Element (or animal) -> phase palette + 玉帶纏腰 note.
     #fso-wealth  Object -> its traditional facing and why, attributed.

   It also hydrates every <div data-fso="quiz" data-method="N"> from
   window.FSO_LEARN, tracks progress in memory, and exposes
   window.FSO = { celebrate(kind) } — a self-contained canvas confetti
   tuned to the dark-glow palette, escalating by kind and honouring
   prefers-reduced-motion with a static flourish, not flying motes.

   Voice + claims: symbolic guidance, meaning not prediction; never a
   promise of wealth, love, or health; tradition attributed; Chinese
   in hanzi + pinyin. Every tool carries an honest line.
   ============================================================ */
(function () {
  "use strict";

  /* ============================================================
     0. SHARED UTILITIES
     ============================================================ */
  var NS = "http://www.w3.org/2000/svg";

  // reduced-motion, live-tracked
  var REDUCED = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  try {
    var _mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (_mq.addEventListener) _mq.addEventListener("change", function (e) { REDUCED = e.matches; });
  } catch (e) {}

  function svgEl(name, attrs) {
    var n = document.createElementNS(NS, name);
    if (attrs) for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
    return n;
  }
  function elh(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function textNode(x, y, str, cls) {
    var t = svgEl("text", { x: x, y: y, "class": cls, "text-anchor": "middle", "dominant-baseline": "middle" });
    t.textContent = str;
    return t;
  }
  function escHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // The account-gate copy, one shape across all four tools (invitation, not wall).
  var GATE_HTML =
    '<b>Saving this</b> would pin it to your profile beside a saved birth chart ' +
    'or Kua number, so your favorable directions can join the reading, and it ' +
    'opens the longer written office spoke. The tool and its guidance stay open to everyone.';

  /* ============================================================
     1. LOOKUP DATA  (the tradition, in tables)
     ============================================================ */

  // The twelve Chinese year animals, in order, with hanzi.
  var ANIMALS = [
    { key: "rat", en: "Rat", zh: "鼠" },
    { key: "ox", en: "Ox", zh: "牛" },
    { key: "tiger", en: "Tiger", zh: "虎" },
    { key: "rabbit", en: "Rabbit", zh: "兔" },
    { key: "dragon", en: "Dragon", zh: "龍" },
    { key: "snake", en: "Snake", zh: "蛇" },
    { key: "horse", en: "Horse", zh: "馬" },
    { key: "goat", en: "Goat", zh: "羊" },
    { key: "monkey", en: "Monkey", zh: "猴" },
    { key: "rooster", en: "Rooster", zh: "雞" },
    { key: "dog", en: "Dog", zh: "狗" },
    { key: "pig", en: "Pig", zh: "豬" }
  ];

  // 桃花位 by San He, 三合, triad. Four groups, four cardinal directions.
  var PEACH_TRIADS = [
    { animals: ["monkey", "rat", "dragon"], triadZh: "申子辰", dir: "W", dirZh: "西", dirPinyin: "xī", dirEn: "West" },
    { animals: ["tiger", "horse", "dog"], triadZh: "寅午戌", dir: "E", dirZh: "東", dirPinyin: "dōng", dirEn: "East" },
    { animals: ["pig", "rabbit", "goat"], triadZh: "亥卯未", dir: "N", dirZh: "北", dirPinyin: "běi", dirEn: "North" },
    { animals: ["snake", "rooster", "ox"], triadZh: "巳酉丑", dir: "S", dirZh: "南", dirPinyin: "nán", dirEn: "South" }
  ];
  function peachFor(animalKey) {
    for (var i = 0; i < PEACH_TRIADS.length; i++) {
      if (PEACH_TRIADS[i].animals.indexOf(animalKey) >= 0) return PEACH_TRIADS[i];
    }
    return null;
  }

  // The animal's fixed element (Wu Xing), for deriving a palette from an animal.
  var ANIMAL_ELEMENT = {
    rat: "water", ox: "earth", tiger: "wood", rabbit: "wood",
    dragon: "earth", snake: "fire", horse: "fire", goat: "earth",
    monkey: "metal", rooster: "metal", dog: "earth", pig: "water"
  };

  // Five-phase palettes. Swatch hexes are display tokens for the dark-glow UI,
  // not a claim; the phase and its color family carry the meaning.
  var ELEMENTS = {
    fire:  { en: "Fire", zh: "火", pinyin: "huǒ", colors: ["red", "purple"], swatches: ["#d2504a", "#8a5cd0"], feeds: "Wood feeds Fire", feeder: "Wood" },
    earth: { en: "Earth", zh: "土", pinyin: "tǔ", colors: ["yellow", "brown"], swatches: ["#d8b24a", "#8a6a44"], feeds: "Fire feeds Earth", feeder: "Fire" },
    metal: { en: "Metal", zh: "金", pinyin: "jīn", colors: ["white", "gold"], swatches: ["#eae6da", "#d6b25a"], feeds: "Earth feeds Metal", feeder: "Earth" },
    water: { en: "Water", zh: "水", pinyin: "shuǐ", colors: ["black", "blue", "gray"], swatches: ["#20222c", "#3f78c4", "#8a8ea0"], feeds: "Metal feeds Water", feeder: "Metal" },
    wood:  { en: "Wood", zh: "木", pinyin: "mù", colors: ["green", "cyan"], swatches: ["#5aa06a", "#4bc4c4"], feeds: "Water feeds Wood", feeder: "Water" }
  };
  var ELEMENT_ORDER = ["wood", "fire", "earth", "metal", "water"];

  // Wealth objects: facing + reason, attributed as tradition.
  var WEALTH = [
    {
      key: "pixiu", en: "Pixiu", zh: "貔貅", pinyin: "píxiū", facing: "out",
      face: "Faces a door or a window, looking outward",
      why: "The winged chimera is said to roam out and bring wealth home while, having no outlet of its own, letting none leave. It is turned toward the open world, never aimed at where a person sits or sleeps."
    },
    {
      key: "qilin", en: "Qilin", zh: "麒麟", pinyin: "qílín", facing: "out",
      face: "Faces a door or a window",
      why: "The gentle chimera of good fortune draws the flow coming in toward the space it watches, a mild auspicious presence, often set as a facing pair."
    },
    {
      key: "dragon-turtle", en: "Dragon-turtle", zh: "龍龜", pinyin: "lóng guī", facing: "out",
      face: "Faces a door or a window, set at the back or side of the work",
      why: "It joins the dragon's drive to the turtle's steady shell, a piece tied to backing that also protects. Its head turns toward the room's flow while its shell gives support behind."
    },
    {
      key: "money-toad", en: "Money-toad", zh: "金蟾", pinyin: "jīn chán", facing: "in",
      face: "Faces inward, into the room, set diagonally in from the door",
      why: "The three-legged toad with a coin in its mouth is turned inward so it spits its wealth into the room rather than out the entrance. Some tellings face it out by day and turn it in at night; the coin is kept in its mouth."
    }
  ];

  // eight-direction naming, for compass dials
  var DIRNAME = { N: "North", NE: "Northeast", E: "East", SE: "Southeast", S: "South", SW: "Southwest", W: "West", NW: "Northwest" };
  var DIR_DEG = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };

  /* ============================================================
     2. CONFETTI + FORTUNE  (window.FSO.celebrate)
     ------------------------------------------------------------
     Self-contained canvas confetti tuned to the dark-glow palette:
     brass + moon motes with a few jewel tones. Escalates by kind.
     Under reduced motion it shows a brief static glow + a fortune
     line and NO flying particles. On every celebration it surfaces a
     claims-safe fortune from window.FSO_LEARN.fortunes if present.
     ============================================================ */
  var Celebrate = (function () {
    // palette motes: brass/moon lead, jewel tones accent
    var COLORS = ["#efe2b4", "#d6c18c", "#f5ecd2", "#78c39c", "#aebfe0", "#e3a196"];
    // intensity + spread per kind
    var KINDS = {
      "correct":            { count: 46, power: 7.5, spread: 0.30, life: 1100 },
      "method-complete":    { count: 90, power: 9.0, spread: 0.42, life: 1500 },
      "diagnostic-solved":  { count: 120, power: 10.5, spread: 0.55, life: 1700 },
      "all-complete":       { count: 200, power: 12.0, spread: 0.80, life: 2100 }
    };

    var canvas = null, ctx = null, particles = [], raf = 0, running = false;
    var fortuneEl = null, fortuneTimer = 0, flourishEl = null, flourishTimer = 0;

    function ensureCanvas() {
      if (canvas) return;
      canvas = document.createElement("canvas");
      canvas.className = "fso-confetti-canvas";
      canvas.setAttribute("aria-hidden", "true");
      document.body.appendChild(canvas);
      ctx = canvas.getContext("2d");
      sizeCanvas();
      window.addEventListener("resize", sizeCanvas);
    }
    function sizeCanvas() {
      if (!canvas) return;
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // spawn a burst from a rising origin near the tool center-bottom
    function burst(cfg) {
      var w = window.innerWidth, h = window.innerHeight;
      var ox = w * 0.5, oy = h * 0.62;
      for (var i = 0; i < cfg.count; i++) {
        var ang = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * cfg.spread * 2;
        var v = cfg.power * (0.55 + Math.random() * 0.7);
        particles.push({
          x: ox + (Math.random() - 0.5) * w * 0.28,
          y: oy + (Math.random() - 0.5) * 30,
          vx: Math.cos(ang) * v,
          vy: Math.sin(ang) * v,
          g: 0.16 + Math.random() * 0.10,
          drag: 0.985,
          size: 3 + Math.random() * 4,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.3,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          life: cfg.life * (0.7 + Math.random() * 0.5),
          age: 0,
          shape: Math.random() < 0.4 ? "circle" : "rect"
        });
      }
      if (!running) { running = true; raf = requestAnimationFrame(tick); }
    }

    var lastT = 0;
    function tick(t) {
      if (!lastT) lastT = t;
      var dt = Math.min(40, t - lastT); lastT = t;
      var step = dt / 16.67;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var alive = 0;
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.age += dt;
        if (p.age >= p.life) continue;
        p.vx *= Math.pow(p.drag, step);
        p.vy = p.vy * Math.pow(p.drag, step) + p.g * step;
        p.x += p.vx * step;
        p.y += p.vy * step;
        p.rot += p.vr * step;
        var fade = 1 - p.age / p.life;
        ctx.globalAlpha = Math.max(0, Math.min(1, fade * 1.4));
        ctx.fillStyle = p.color;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        if (p.shape === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.6);
        }
        ctx.restore();
        alive++;
      }
      ctx.globalAlpha = 1;
      // keep only the living, cheaply
      if (alive === 0) {
        particles.length = 0;
        running = false; lastT = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      if (particles.length > 900) particles = particles.filter(function (p) { return p.age < p.life; });
      raf = requestAnimationFrame(tick);
    }

    // reduced-motion: a brief static glow, no motion
    function flourish() {
      if (!flourishEl) {
        flourishEl = document.createElement("div");
        flourishEl.className = "fso-flourish";
        flourishEl.setAttribute("aria-hidden", "true");
        document.body.appendChild(flourishEl);
      }
      flourishEl.classList.add("is-show");
      clearTimeout(flourishTimer);
      flourishTimer = setTimeout(function () { flourishEl.classList.remove("is-show"); }, 900);
    }

    // the claims-safe fortune toast
    function showFortune() {
      var line = pickFortune();
      if (!line) return;
      if (!fortuneEl) {
        fortuneEl = document.createElement("div");
        fortuneEl.className = "fso-fortune";
        fortuneEl.setAttribute("role", "status");
        document.body.appendChild(fortuneEl);
      }
      fortuneEl.innerHTML = '<span class="fso-fortune-mark">吉 a fortune</span>' + escHtml(line);
      // reflow so the transition runs
      void fortuneEl.offsetWidth;
      fortuneEl.classList.add("is-show");
      clearTimeout(fortuneTimer);
      fortuneTimer = setTimeout(function () { fortuneEl.classList.remove("is-show"); }, REDUCED ? 4200 : 3600);
    }
    function pickFortune() {
      var L = window.FSO_LEARN;
      var pool = (L && Array.isArray(L.fortunes) && L.fortunes.length) ? L.fortunes : DEFAULT_FORTUNES;
      return pool[(Math.random() * pool.length) | 0];
    }
    // a small honest fallback set if FSO_LEARN is absent; claims-safe, symbolic.
    var DEFAULT_FORTUNES = [
      "A door in view is a mind at ease.",
      "A wall at your back, an open road ahead.",
      "Tend the small things and the room grows kind.",
      "Order made once is a calm you keep.",
      "Where the light gathers, so does the will to begin."
    ];

    // the public entry point
    function celebrate(kind) {
      var cfg = KINDS[kind] || KINDS["correct"];
      if (REDUCED) {
        flourish();
      } else {
        ensureCanvas();
        burst(cfg);
        // the biggest kinds get a second, delayed pop for depth
        if (kind === "all-complete" || kind === "diagnostic-solved") {
          setTimeout(function () { burst({ count: Math.round(cfg.count * 0.5), power: cfg.power * 0.9, spread: cfg.spread, life: cfg.life }); }, 220);
        }
      }
      showFortune();
    }

    return { celebrate: celebrate };
  })();

  // expose the gamification surface
  window.FSO = window.FSO || {};
  window.FSO.celebrate = Celebrate.celebrate;

  /* ============================================================
     3. OFFICE DIAGNOSTIC  (#fso-diagnostic)
     ------------------------------------------------------------
     Adapted from the verified prototype. Same integer grid + fixture
     helpers as fengshui-room.js; the desk replaces the bed and the
     SEAT strip carries the meaning the headboard does in the room.
     Scores methods 1,2,3,4,6,7 with honest geometry; each flag names
     its traditional fix. Keyboard nudges + rotate; celebrates on solve.
     ============================================================ */
  function initDiagnostic(root) {
    root.classList.add("fso-ready");

    // grid geometry, integer cells (mirrors fengshui-room.js)
    var COLS = 12, ROWS = 10, CELL = 34, PAD = 30;
    var W = COLS * CELL + PAD * 2, H = ROWS * CELL + PAD * 2;
    var DESK_W = 4, DESK_H = 2;                 // desk: wide, shallow
    var TOP = "top", BOTTOM = "bottom", LEFT = "left", RIGHT = "right";

    function px(c) { return PAD + c * CELL; }
    function centerOfSpan(f) {
      var mid = f.start + f.len / 2;
      if (f.side === TOP) return { x: PAD + mid * CELL, y: PAD };
      if (f.side === BOTTOM) return { x: PAD + mid * CELL, y: PAD + ROWS * CELL };
      if (f.side === LEFT) return { x: PAD, y: PAD + mid * CELL };
      return { x: PAD + COLS * CELL, y: PAD + mid * CELL };
    }
    function inward(side) {
      if (side === TOP) return { x: 0, y: 1 };
      if (side === BOTTOM) return { x: 0, y: -1 };
      if (side === LEFT) return { x: 1, y: 0 };
      return { x: -1, y: 0 };
    }
    function rectsOverlap(a, c) {
      return a.col < c.col + c.w && a.col + a.w > c.col && a.row < c.row + c.h && a.row + a.h > c.row;
    }

    // desk model. orient = wall the SEAT backs onto (person's back).
    function deskFootprint(d) {
      var horiz = (d.orient === LEFT || d.orient === RIGHT);
      return { col: d.col, row: d.row, w: horiz ? DESK_H : DESK_W, h: horiz ? DESK_W : DESK_H };
    }
    function seatRect(d) {
      var fp = deskFootprint(d);
      if (d.orient === TOP) return { col: fp.col, row: fp.row, w: fp.w, h: 1 };
      if (d.orient === BOTTOM) return { col: fp.col, row: fp.row + fp.h - 1, w: fp.w, h: 1 };
      if (d.orient === LEFT) return { col: fp.col, row: fp.row, w: 1, h: fp.h };
      return { col: fp.col + fp.w - 1, row: fp.row, w: 1, h: fp.h };
    }
    function seatCenterPx(d) { var s = seatRect(d); return { x: px(s.col + s.w / 2), y: px(s.row + s.h / 2) }; }
    function faceDir(d) {
      if (d.orient === TOP) return { x: 0, y: 1 };
      if (d.orient === BOTTOM) return { x: 0, y: -1 };
      if (d.orient === LEFT) return { x: 1, y: 0 };
      return { x: -1, y: 0 };
    }
    function backDir(d) { var f = faceDir(d); return { x: -f.x, y: -f.y }; }
    function clampDesk(d) {
      var fp = deskFootprint(d);
      d.col = Math.max(0, Math.min(COLS - fp.w, d.col));
      d.row = Math.max(0, Math.min(ROWS - fp.h, d.row));
      return d;
    }

    /* ---- scoring: honest geometry, methods 1,2,3,4,6,7 ---- */
    // method 4 + 3: seat backing. Flush wall (good), over window (method 3), or floating.
    function seatBacking(state) {
      var d = state.desk, fp = deskFootprint(d), side, onWall = false;
      if (d.orient === TOP) { onWall = fp.row === 0; side = TOP; }
      if (d.orient === BOTTOM) { onWall = fp.row + fp.h === ROWS; side = BOTTOM; }
      if (d.orient === LEFT) { onWall = fp.col === 0; side = LEFT; }
      if (d.orient === RIGHT) { onWall = fp.col + fp.w === COLS; side = RIGHT; }
      var sr = seatRect(d), overWindow = false, overDoor = false;
      if (onWall && state.windowF && state.windowF.side === side) {
        var ws = state.windowF.start, we = ws + state.windowF.len;
        if (side === TOP || side === BOTTOM) overWindow = sr.col < we && sr.col + sr.w > ws;
        else overWindow = sr.row < we && sr.row + sr.h > ws;
      }
      if (onWall && state.doorF && state.doorF.side === side) {
        var ds = state.doorF.start, de = ds + state.doorF.len;
        if (side === TOP || side === BOTTOM) overDoor = sr.col < de && sr.col + sr.w > ds;
        else overDoor = sr.row < de && sr.row + sr.h > ds;
      }
      return { onWall: onWall, side: side, overWindow: overWindow, overDoor: overDoor, ok: onWall && !overWindow && !overDoor };
    }
    // method 1: can the seat see the door (not behind the back)? half-plane test.
    function canSeeDoor(state) {
      var doorC = centerOfSpan(state.doorF), sc = seatCenterPx(state.desk);
      var v = { x: doorC.x - sc.x, y: doorC.y - sc.y }, bd = backDir(state.desk);
      var dist = Math.hypot(v.x, v.y) || 1;
      var cos = (v.x * bd.x + v.y * bd.y) / dist;   // >0.5 means door well behind
      return { ok: cos <= 0.5, cos: cos, doorC: doorC, seatC: sc };
    }
    function doorAlignment(state) {
      var door = state.doorF, dc = centerOfSpan(door), sc = seatCenterPx(state.desk);
      var horizWall = (door.side === TOP || door.side === BOTTOM);
      var offsetPx = horizWall ? Math.abs(sc.x - dc.x) : Math.abs(sc.y - dc.y);
      var inw = inward(door.side);
      var depthCells = ((sc.x - dc.x) * inw.x + (sc.y - dc.y) * inw.y) / CELL;
      return { inLine: offsetPx / CELL < 1.5, offsetCells: offsetPx / CELL, depthCells: depthCells };
    }
    // office echo of the coffin: back squarely to an open door on its axis.
    function backToOpenDoor(state) {
      var bd = backDir(state.desk), inw = inward(state.doorF.side);
      var toward = (bd.x === -inw.x && bd.y === -inw.y);
      return toward && doorAlignment(state).inLine;
    }
    // method 2: a window or the door walkway immediately beside or behind the seat.
    function fixtureBand(f) {
      if (!f) return null;
      if (f.side === TOP) return { col: f.start, row: 0, w: f.len, h: 1 };
      if (f.side === BOTTOM) return { col: f.start, row: ROWS - 1, w: f.len, h: 1 };
      if (f.side === LEFT) return { col: 0, row: f.start, w: 1, h: f.len };
      return { col: COLS - 1, row: f.start, w: 1, h: f.len };
    }
    function flankedByMovement(state) {
      var sr = seatRect(state.desk), bd = backDir(state.desk), probes = [];
      probes.push({ col: sr.col - 1, row: sr.row, w: 1, h: sr.h });          // left
      probes.push({ col: sr.col + sr.w, row: sr.row, w: 1, h: sr.h });       // right
      probes.push({ col: sr.col + bd.x, row: sr.row + bd.y, w: sr.w, h: sr.h }); // behind
      var hit = false, win = fixtureBand(state.windowF), dr = fixtureBand(state.doorF);
      probes.forEach(function (p) {
        if (win && rectsOverlap(p, win)) hit = true;
        if (dr && rectsOverlap(p, dr)) hit = true;
      });
      return hit;
    }
    // bright hall: a close blank wall directly in front of the seat, too near.
    function brightHall(state) {
      var fp = deskFootprint(state.desk), f = faceDir(state.desk), gap;
      if (f.y > 0) gap = ROWS - (fp.row + fp.h);
      else if (f.y < 0) gap = fp.row;
      else if (f.x > 0) gap = COLS - (fp.col + fp.w);
      else gap = fp.col;
      var facing = (f.y > 0) ? BOTTOM : (f.y < 0) ? TOP : (f.x > 0) ? RIGHT : LEFT;
      var opening = (state.doorF && state.doorF.side === facing) || (state.windowF && state.windowF.side === facing);
      return { gap: gap, cramped: gap <= 1 && !opening, open: gap >= 3 || opening };
    }
    // method 7: overhead beam over desk or seat.
    function underBeam(state) { return state.beam ? rectsOverlap(deskFootprint(state.desk), state.beam.rect) : false; }
    // method 6: mirror facing the seat / working surface (cone test).
    function mirrorFacesDesk(state) {
      if (!state.mirror) return false;
      var m = state.mirror, mc = centerOfSpan(m), inw = inward(m.side), sc = seatCenterPx(state.desk);
      var v = { x: sc.x - mc.x, y: sc.y - mc.y }, dist = Math.hypot(v.x, v.y) || 1;
      return (v.x * inw.x + v.y * inw.y) / dist > 0.35;
    }

    function evaluate(state) {
      var back = seatBacking(state), see = canSeeDoor(state), align = doorAlignment(state);
      var coffin = backToOpenDoor(state), flank = flankedByMovement(state), hall = brightHall(state);
      var beam = underBeam(state), mirror = mirrorFacesDesk(state);
      var diagonal = align.depthCells > (ROWS * 0.42) && align.offsetCells > (COLS * 0.16);
      var score = 0;
      if (see.ok) { score += 22; if (!align.inLine) score += diagonal ? 8 : 5; } // 1: up to 30
      if (back.ok) score += 25;                                                   // 3/4: 25
      if (!flank) score += 18;                                                    // 2: 18
      if (!hall.cramped) score += hall.open ? 15 : 10;                            // bright hall: 15
      if (see.ok && back.ok && !flank) score += 5;                                // settle
      if (coffin) score -= 28;
      if (beam) score -= 18;
      if (mirror) score -= 15;
      score = Math.max(0, Math.min(100, Math.round(score)));
      return { score: score, back: back, see: see, align: align, diagonal: diagonal, coffin: coffin, flank: flank, hall: hall, beam: beam, mirror: mirror };
    }

    // kind, specific, second-person feedback with the traditional fix named.
    function feedback(ev) {
      var out = [];
      if (ev.see.ok && !ev.align.inLine) {
        out.push({ tone: "good", text: ev.diagonal
          ? "You sit at the far diagonal with the door in view. This is the seat tradition prizes, a wall at your back and the entrance in sight."
          : "You can see the door without sitting in its direct line. That clear sight is the heart of the desk in command." });
      } else if (ev.see.ok && ev.align.inLine) {
        out.push({ tone: "warn", text: "You can see the door, but the desk sits roughly in its line, in the path of what enters. Slide it sideways so you are off the door's axis." });
      } else {
        out.push({ tone: "bad", text: "The door sits behind you, out of sight. Turn or move the desk so the entrance is in view without facing straight down it, or set a small mirror to catch the doorway so no one reaches you unseen." });
      }
      if (ev.back.ok) {
        out.push({ tone: "good", text: "A solid wall stands behind the chair, the Black Tortoise, 玄武, the mountain that gives backing." });
      } else if (ev.back.overWindow) {
        out.push({ tone: "warn", text: "A window sits directly behind the seat. Glass at your back is asked to be a wall instead. Move the desk to a solid stretch of wall; where the window cannot be avoided, a high solid-backed chair and a closed blind stand in for the mountain." });
      } else if (ev.back.overDoor) {
        out.push({ tone: "warn", text: "The seat backs onto the doorway. Give the chair a solid wall so nothing opens behind you as you work." });
      } else if (!ev.back.onWall) {
        out.push({ tone: "warn", text: "The chair floats away from the wall. Bring the desk back so a solid wall sits behind you as backing; a high-backed chair stands in where a wall cannot." });
      }
      if (ev.flank) {
        out.push({ tone: "warn", text: "A window or the door's walking path runs right beside or behind your seat, a moving flank at your shoulder. Shift the desk so the movement stays in front of you and a wall takes your back." });
      }
      if (ev.hall.cramped) {
        out.push({ tone: "tip", text: "The desk faces a close blank wall with little room ahead, thought to feel like a block. Pull it back for an open bright hall, 明堂, in front, or hang art with depth where the layout forces the wall." });
      } else if (ev.hall.open) {
        out.push({ tone: "good", text: "Open space lies ahead of the desk, the bright hall, 明堂, where opportunity has room to gather before it reaches you." });
      }
      if (ev.coffin) {
        out.push({ tone: "bad", text: "Your back is squarely to an open door while the desk sits in its line, the office echo of the position tradition warns against most. Slide to the far diagonal so your back is to a wall and the door is in view." });
      }
      if (ev.beam) {
        out.push({ tone: "bad", text: "The desk sits under the exposed beam, 橫樑壓頂, said to press down. Move the desk clear of the beam; where it cannot move, drape or plane over it, with the classic pair of bamboo flutes on a red ribbon named as tradition." });
      }
      if (ev.mirror) {
        out.push({ tone: "warn", text: "A mirror looks onto your seat, read as too restless for focused work. Move it, angle it, or cover it so it no longer catches where you sit." });
      }
      return out;
    }

    /* ---- state ---- */
    function freshState() {
      return {
        doorF: { side: BOTTOM, start: 2, len: 2 },
        windowF: { side: RIGHT, start: 3, len: 3 },
        beam: null, mirror: null,
        desk: { col: 4, row: 4, orient: TOP },   // starts mid-room, floating, to be solved
        solved: false
      };
    }
    function beamBand(orient, at) {
      if (orient === "h") return { orient: "h", rect: { col: 0, row: at, w: COLS, h: 1 } };
      return { orient: "v", rect: { col: at, row: 0, w: 1, h: ROWS } };
    }
    var state = freshState();

    /* ---- shell ---- */
    root.innerHTML = "";
    root.appendChild(elh("p", "fso-eyebrow", "命位 at work"));
    root.appendChild(elh("h3", "fso-title", "The desk in command"));
    root.appendChild(elh("p", "fso-lede",
      "Lay out your workspace and read how the desk sits in the commanding position, 命位 (mìng wèi). The aim is to <b>see the door without sitting in its line</b>, keep a <b>solid wall behind the chair</b> as the Black Tortoise, 玄武, and leave the bright hall, 明堂, open ahead. Drag the desk, or use the nudge pad."));

    var stage = elh("div", "fso-stage");
    var boardWrap = elh("div", "fso-board-wrap");
    var svg = svgEl("svg", {
      "class": "fso-board", viewBox: "0 0 " + W + " " + H, role: "application", tabindex: "0",
      "aria-label": "Office layout on a grid. Use arrow keys to move the desk, press R to rotate it, then read the seat score. The desk can also be dragged."
    });
    boardWrap.appendChild(svg);
    var side = elh("div", "fso-side");
    stage.appendChild(boardWrap); stage.appendChild(side); root.appendChild(stage);

    // score meter
    var meter = elh("div", "fso-meter",
      '<div class="fso-meter-head"><span class="fso-meter-label">Seat score</span>' +
      '<span class="fso-score" id="fso-od-score">0<small>/100</small></span></div>' +
      '<div class="fso-bar" aria-hidden="true"><i id="fso-od-bar"></i></div>');
    side.appendChild(meter);
    var scoreEl = meter.querySelector("#fso-od-score"), barFill = meter.querySelector("#fso-od-bar");

    // readout
    var readout = elh("ul", "fso-readout");
    readout.setAttribute("aria-live", "polite"); readout.setAttribute("aria-atomic", "false");
    side.appendChild(readout);

    // controls
    var controls = elh("div", "fso-controls"); side.appendChild(controls);
    function mkBtn(label, cls) { var b = document.createElement("button"); b.type = "button"; b.className = cls; b.textContent = label; return b; }
    var btnCheck = mkBtn("Check my desk", "fso-btn fso-btn-primary");
    var btnRotate = mkBtn("Rotate desk", "fso-btn");
    var btnBeam = mkBtn("Add beam", "fso-btn");
    var btnMirror = mkBtn("Add mirror", "fso-btn");
    var btnReset = mkBtn("Reset room", "fso-btn");
    [btnCheck, btnRotate, btnBeam, btnMirror, btnReset].forEach(function (b) { controls.appendChild(b); });

    // keyboard nudge pad (drag alternative, accessible)
    var nudge = elh("div", "fso-nudge",
      '<p class="fso-nudge-head">Nudge the desk</p>' +
      '<div class="fso-pad">' +
        '<span class="fso-sp"></span><button type="button" class="fso-btn" data-nudge="up" aria-label="Move desk up">&#9650;</button><span class="fso-sp"></span>' +
        '<button type="button" class="fso-btn" data-nudge="left" aria-label="Move desk left">&#9664;</button>' +
        '<button type="button" class="fso-btn" data-nudge="rot" aria-label="Rotate desk">&#8635;</button>' +
        '<button type="button" class="fso-btn" data-nudge="right" aria-label="Move desk right">&#9654;</button>' +
        '<span class="fso-sp"></span><button type="button" class="fso-btn" data-nudge="down" aria-label="Move desk down">&#9660;</button><span class="fso-sp"></span>' +
      '</div>' +
      '<p class="fso-nudge-hint">Drag the desk with a pointer, or move it a cell at a time here. The board also takes arrow keys and R when focused.</p>');
    side.appendChild(nudge);

    // account gate, invitation not wall
    side.appendChild(elh("div", "fso-gate", GATE_HTML));

    // svg layers
    var gRoom = svgEl("g", { "class": "fso-g-room" });
    var gFix = svgEl("g", { "class": "fso-g-fix" });
    var gSight = svgEl("g", { "class": "fso-g-sight" });
    var gDesk = svgEl("g", { "class": "fso-g-desk", tabindex: "-1" });
    svg.appendChild(gRoom); svg.appendChild(gFix); svg.appendChild(gSight); svg.appendChild(gDesk);

    // reveal the rotate handle on desk hover / board focus
    gDesk.addEventListener("pointerenter", function () { gDesk.classList.add("is-desk-hover"); });
    gDesk.addEventListener("pointerleave", function () { if (!drag) gDesk.classList.remove("is-desk-hover"); });
    svg.addEventListener("focusin", function () { gDesk.classList.add("is-desk-hover"); });
    svg.addEventListener("focusout", function (e) { if (!svg.contains(e.relatedTarget)) gDesk.classList.remove("is-desk-hover"); });

    function draw() { drawRoom(); drawFixtures(); drawSight(); drawDesk(); }

    function drawRoom() {
      gRoom.innerHTML = "";
      gRoom.appendChild(svgEl("rect", { x: PAD, y: PAD, width: COLS * CELL, height: ROWS * CELL, "class": "fso-floor", rx: 6 }));
      for (var c = 1; c < COLS; c++) gRoom.appendChild(svgEl("line", { x1: px(c), y1: PAD, x2: px(c), y2: PAD + ROWS * CELL, "class": "fso-grid" }));
      for (var r = 1; r < ROWS; r++) gRoom.appendChild(svgEl("line", { x1: PAD, y1: px(r), x2: PAD + COLS * CELL, y2: px(r), "class": "fso-grid" }));
      gRoom.appendChild(svgEl("rect", { x: PAD, y: PAD, width: COLS * CELL, height: ROWS * CELL, "class": "fso-wall", rx: 6 }));
    }
    function fixtureLine(f, cls) {
      var a, b;
      if (f.side === TOP) { a = { x: px(f.start), y: PAD }; b = { x: px(f.start + f.len), y: PAD }; }
      else if (f.side === BOTTOM) { a = { x: px(f.start), y: PAD + ROWS * CELL }; b = { x: px(f.start + f.len), y: PAD + ROWS * CELL }; }
      else if (f.side === LEFT) { a = { x: PAD, y: px(f.start) }; b = { x: PAD, y: px(f.start + f.len) }; }
      else { a = { x: PAD + COLS * CELL, y: px(f.start) }; b = { x: PAD + COLS * CELL, y: px(f.start + f.len) }; }
      return svgEl("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, "class": cls });
    }
    function labelOutside(f, str, cls) {
      var c = centerOfSpan(f), off = 15, x = c.x, y = c.y;
      if (f.side === TOP) y = PAD - off;
      else if (f.side === BOTTOM) y = PAD + ROWS * CELL + off;
      else if (f.side === LEFT) x = PAD - off;
      else x = PAD + COLS * CELL + off;
      var t = textNode(x, y, str, cls);
      if (f.side === LEFT) t.setAttribute("text-anchor", "end");
      if (f.side === RIGHT) t.setAttribute("text-anchor", "start");
      return t;
    }
    function doorHinge(d) {
      if (d.side === TOP) return { x: px(d.start), y: PAD };
      if (d.side === BOTTOM) return { x: px(d.start), y: PAD + ROWS * CELL };
      if (d.side === LEFT) return { x: PAD, y: px(d.start) };
      return { x: PAD + COLS * CELL, y: px(d.start) };
    }
    function arcFlag(d) { if (d.side === TOP) return 1; if (d.side === BOTTOM) return 0; if (d.side === LEFT) return 0; return 1; }
    function drawFixtures() {
      gFix.innerHTML = "";
      if (state.beam) {
        var br = state.beam.rect;
        gFix.appendChild(svgEl("rect", { x: px(br.col), y: px(br.row), width: br.w * CELL, height: br.h * CELL, "class": "fso-beam", rx: 3 }));
        gFix.appendChild(textNode(px(br.col + br.w / 2), px(br.row + br.h / 2), "BEAM", "fso-fixlabel fso-beam-text"));
      }
      var d = state.doorF;
      gFix.appendChild(fixtureLine(d, "fso-door-gap"));
      gFix.appendChild(fixtureLine(d, "fso-door-line"));
      var inw = inward(d.side), hinge = doorHinge(d), len = d.len * CELL;
      var along = (d.side === TOP || d.side === BOTTOM) ? { x: 1, y: 0 } : { x: 0, y: 1 };
      var leafEnd = { x: hinge.x + inw.x * len, y: hinge.y + inw.y * len };
      var jamb = { x: hinge.x + along.x * len, y: hinge.y + along.y * len };
      gFix.appendChild(svgEl("path", { d: "M " + leafEnd.x + " " + leafEnd.y + " A " + len + " " + len + " 0 0 " + arcFlag(d) + " " + jamb.x + " " + jamb.y, "class": "fso-door-arc" }));
      gFix.appendChild(labelOutside(d, "DOOR", "fso-fixlabel fso-door-text"));
      if (state.windowF) {
        gFix.appendChild(fixtureLine(state.windowF, "fso-window"));
        gFix.appendChild(labelOutside(state.windowF, "WINDOW", "fso-fixlabel fso-window-text"));
      }
      if (state.mirror) {
        gFix.appendChild(fixtureLine(state.mirror, "fso-mirror"));
        gFix.appendChild(labelOutside(state.mirror, "MIRROR", "fso-fixlabel fso-mirror-text"));
      }
      // optional peach / wealth markers fed from the pickers (cross-tool link)
      drawExtraMarkers();
    }
    // draw peach sector + wealth marker if a picker set them on the shared bridge
    function drawExtraMarkers() {
      var b = window.FSO._bridge || {};
      if (b.peachDir) {
        var seg = wallSegForDir(b.peachDir);
        if (seg) {
          gFix.appendChild(svgEl("line", { x1: seg.a.x, y1: seg.a.y, x2: seg.b.x, y2: seg.b.y, "class": "fso-peach-marker" }));
          gFix.appendChild(textNode(seg.mid.x, seg.mid.y, "桃花 " + b.peachDir, "fso-fixlabel fso-peach-text"));
        }
      }
    }
    // a short marker segment on the wall nearest a cardinal direction (N=top wall)
    function wallSegForDir(dir) {
      var midC = COLS / 2, midR = ROWS / 2, s = 2;
      if (dir === "N") return seg(px(midC - s), PAD, px(midC + s), PAD);
      if (dir === "S") return seg(px(midC - s), PAD + ROWS * CELL, px(midC + s), PAD + ROWS * CELL);
      if (dir === "W") return seg(PAD, px(midR - s), PAD, px(midR + s));
      if (dir === "E") return seg(PAD + COLS * CELL, px(midR - s), PAD + COLS * CELL, px(midR + s));
      return null;
    }
    function seg(x1, y1, x2, y2) { return { a: { x: x1, y: y1 }, b: { x: x2, y: y2 }, mid: { x: (x1 + x2) / 2, y: (y1 + y2) / 2 + (y1 === y2 ? (y1 < H / 2 ? -12 : 12) : 0) } }; }

    function drawSight() {
      gSight.innerHTML = "";
      var ev = evaluate(state), sc = seatCenterPx(state.desk), dc = centerOfSpan(state.doorF);
      var line = svgEl("line", { x1: sc.x, y1: sc.y, x2: dc.x, y2: dc.y });
      line.setAttribute("class", "fso-sight " + (ev.see.ok ? "is-clear" : "is-blocked"));
      gSight.appendChild(line);
    }
    function drawDesk() {
      gDesk.innerHTML = "";
      var fp = deskFootprint(state.desk), x = px(fp.col), y = px(fp.row), w = fp.w * CELL, h = fp.h * CELL;
      gDesk.appendChild(svgEl("rect", { x: x + 3, y: y + 3, width: w - 6, height: h - 6, rx: 8, "class": "fso-desk-frame" }));
      gDesk.appendChild(svgEl("rect", { x: x + 7, y: y + 7, width: w - 14, height: h - 14, rx: 6, "class": "fso-desk-top" }));
      var sr = seatRect(state.desk), sx = px(sr.col), sy = px(sr.row), sw = sr.w * CELL, sh = sr.h * CELL;
      gDesk.appendChild(svgEl("rect", { x: sx + 3, y: sy + 3, width: sw - 6, height: sh - 6, rx: 6, "class": "fso-seat" }));
      var bd = backDir(state.desk), cbw = Math.min(sw, sh) * 0.5;
      var ccx = sx + sw / 2 + bd.x * sh * 0.28, ccy = sy + sh / 2 + bd.y * sw * 0.28;
      gDesk.appendChild(svgEl("rect", { x: ccx - cbw / 2, y: ccy - cbw / 2, width: cbw, height: cbw, rx: 5, "class": "fso-chairback" }));
      gDesk.appendChild(textNode(sx + sw / 2, sy + sh / 2, "SEAT", "fso-desk-label fso-label-seat"));
      var f = faceDir(state.desk);
      gDesk.appendChild(textNode(px(fp.col + fp.w / 2) + f.x * (w / 2 - 14), px(fp.row + fp.h / 2) + f.y * (h / 2 - 10), "DESK", "fso-desk-label fso-label-work"));
      var hit = svgEl("rect", { x: x, y: y, width: w, height: h, "class": "fso-desk-hit" });
      gDesk.appendChild(hit);
      hit.addEventListener("pointerdown", onPointerDown);
      gDesk.appendChild(rotateHandle(x, y, w, h));
    }
    // a rotate handle drawn on the desk, hidden until hover/focus
    function rotateHandle(x, y, w, h) {
      var cx = x + w - 4, cy = y + 4;
      cx = Math.max(PAD + 10, Math.min(PAD + COLS * CELL - 10, cx));
      cy = Math.max(PAD + 10, Math.min(PAD + ROWS * CELL - 10, cy));
      var g = svgEl("g", { "class": "fso-rotate", tabindex: "0", role: "button", "aria-label": "Rotate the desk" });
      g.appendChild(svgEl("circle", { cx: cx, cy: cy, r: 15, "class": "fso-rotate-hit" }));
      g.appendChild(svgEl("circle", { cx: cx, cy: cy, r: 9, "class": "fso-rotate-bg" }));
      var r = 5.4, a0 = -50 * Math.PI / 180, a1 = 210 * Math.PI / 180;
      var sx = cx + Math.cos(a0) * r, sy = cy + Math.sin(a0) * r, ex = cx + Math.cos(a1) * r, ey = cy + Math.sin(a1) * r;
      g.appendChild(svgEl("path", { d: "M " + sx.toFixed(2) + " " + sy.toFixed(2) + " A " + r + " " + r + " 0 1 1 " + ex.toFixed(2) + " " + ey.toFixed(2), "class": "fso-rotate-arc", fill: "none" }));
      g.appendChild(svgEl("path", { d: "M " + sx.toFixed(2) + " " + sy.toFixed(2) + " l 3.4 -1.2 l -1.0 3.6 z", "class": "fso-rotate-arrow" }));
      var fire = function (e) { e.preventDefault(); e.stopPropagation(); rotate(); };
      g.addEventListener("click", fire);
      g.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") { e.preventDefault(); e.stopPropagation(); rotate(); var again = gDesk.querySelector(".fso-rotate"); if (again) try { again.focus(); } catch (err) {} }
      });
      return g;
    }

    /* ---- update cycle ---- */
    function update() {
      var ev = evaluate(state);
      scoreEl.innerHTML = ev.score + "<small>/100</small>";
      barFill.style.width = ev.score + "%";
      barFill.className = ev.score >= 80 ? "is-high" : ev.score >= 50 ? "is-mid" : "is-low";
      var fb = feedback(ev);
      readout.innerHTML = "";
      fb.forEach(function (line) {
        var li = document.createElement("li");
        li.className = "fso-line fso-line-" + line.tone;
        li.textContent = line.text;
        readout.appendChild(li);
      });
      drawSight();
      // celebrate a genuine command seat, once
      var good = ev.score >= 85 && ev.see.ok && ev.back.ok && !ev.coffin && !ev.beam;
      if (good && !state.solved) { state.solved = true; window.FSO.celebrate("diagnostic-solved"); }
      else if (!good) { state.solved = false; }
      return ev;
    }

    /* ---- drag (pointer) ---- */
    var drag = null;
    function svgPoint(evt) {
      var pt = svg.createSVGPoint(); pt.x = evt.clientX; pt.y = evt.clientY;
      var ctm = svg.getScreenCTM(); if (!ctm) return { x: 0, y: 0 };
      var p = pt.matrixTransform(ctm.inverse()); return { x: p.x, y: p.y };
    }
    function onPointerDown(evt) {
      evt.preventDefault(); svg.focus();
      var p = svgPoint(evt), fp = deskFootprint(state.desk);
      drag = { dxCell: (p.x - PAD) / CELL - fp.col, dyCell: (p.y - PAD) / CELL - fp.row, id: evt.pointerId };
      if (evt.target.setPointerCapture) { try { evt.target.setPointerCapture(evt.pointerId); } catch (e) {} }
      gDesk.classList.add("is-dragging");
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
    }
    function onPointerMove(evt) {
      if (!drag) return;
      var p = svgPoint(evt);
      state.desk.col = Math.round((p.x - PAD) / CELL - drag.dxCell);
      state.desk.row = Math.round((p.y - PAD) / CELL - drag.dyCell);
      clampDesk(state.desk); drawDesk(); update();
    }
    function onPointerUp() {
      if (!drag) return; drag = null;
      gDesk.classList.remove("is-dragging");
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      update();
    }

    /* ---- keyboard ---- */
    svg.addEventListener("keydown", function (evt) {
      var k = evt.key, moved = false;
      if (k === "ArrowUp") { state.desk.row -= 1; moved = true; }
      else if (k === "ArrowDown") { state.desk.row += 1; moved = true; }
      else if (k === "ArrowLeft") { state.desk.col -= 1; moved = true; }
      else if (k === "ArrowRight") { state.desk.col += 1; moved = true; }
      else if (k === "r" || k === "R") { rotate(); evt.preventDefault(); return; }
      else if (k === "Enter" || k === " ") { update(); evt.preventDefault(); return; }
      if (moved) { evt.preventDefault(); clampDesk(state.desk); drawDesk(); update(); }
    });
    function rotate() {
      var order = [TOP, RIGHT, BOTTOM, LEFT], i = order.indexOf(state.desk.orient);
      state.desk.orient = order[(i + 1) % 4];
      clampDesk(state.desk); draw(); update();
    }

    /* ---- nudge pad + buttons ---- */
    nudge.addEventListener("click", function (evt) {
      var b = evt.target.closest("[data-nudge]"); if (!b) return;
      var dir = b.getAttribute("data-nudge");
      if (dir === "up") state.desk.row -= 1;
      else if (dir === "down") state.desk.row += 1;
      else if (dir === "left") state.desk.col -= 1;
      else if (dir === "right") state.desk.col += 1;
      else if (dir === "rot") { rotate(); return; }
      clampDesk(state.desk); drawDesk(); update();
    });
    function toggleBeam() {
      if (state.beam) { state.beam = null; btnBeam.textContent = "Add beam"; btnBeam.classList.remove("is-on"); }
      else { state.beam = beamBand("h", Math.round(ROWS / 2)); btnBeam.textContent = "Remove beam"; btnBeam.classList.add("is-on"); }
      draw(); update();
    }
    function toggleMirror() {
      if (state.mirror) { state.mirror = null; btnMirror.textContent = "Add mirror"; btnMirror.classList.remove("is-on"); }
      else {
        var opp = { top: BOTTOM, bottom: TOP, left: RIGHT, right: LEFT }[state.doorF.side];
        var len = 3, maxStart = (opp === TOP || opp === BOTTOM) ? COLS - len : ROWS - len;
        state.mirror = { side: opp, start: Math.max(0, Math.round(maxStart / 2)), len: len };
        btnMirror.textContent = "Remove mirror"; btnMirror.classList.add("is-on");
      }
      draw(); update();
    }
    btnBeam.addEventListener("click", toggleBeam);
    btnMirror.addEventListener("click", toggleMirror);
    btnRotate.addEventListener("click", rotate);
    btnCheck.addEventListener("click", function () { update(); svg.focus(); });
    btnReset.addEventListener("click", function () {
      state = freshState();
      btnBeam.textContent = "Add beam"; btnBeam.classList.remove("is-on");
      btnMirror.textContent = "Add mirror"; btnMirror.classList.remove("is-on");
      draw(); update();
    });

    // let a picker request a redraw of the shared markers
    window.FSO._redrawDiagnostic = function () { drawFixtures(); };

    /* ---- boot ---- */
    draw();
    update();
  }

  /* ============================================================
     4. PICKER SCAFFOLD  (shared by peach / colors / wealth)
     ------------------------------------------------------------
     A small chip row + a reveal card. Each picker supplies its
     chips, its lookup, and how to render the reveal. No geometry.
     ============================================================ */
  function buildPicker(root, opts) {
    root.classList.add("fso-ready");
    root.innerHTML = "";
    root.appendChild(elh("p", "fso-eyebrow", opts.eyebrow));
    root.appendChild(elh("h3", "fso-title", opts.title));
    root.appendChild(elh("p", "fso-lede", opts.lede));

    var picker = elh("div", "fso-picker");
    picker.appendChild(elh("p", "fso-picker-prompt", opts.prompt));
    var chips = elh("div", "fso-chips");
    chips.setAttribute("role", "group");
    chips.setAttribute("aria-label", opts.prompt);
    picker.appendChild(chips);
    root.appendChild(picker);

    var reveal = elh("div", "fso-reveal");
    reveal.hidden = true;
    reveal.setAttribute("role", "status");
    root.appendChild(reveal);

    root.appendChild(elh("div", "fso-gate", GATE_HTML));

    var buttons = [];
    opts.chips.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "fso-chip";
      b.setAttribute("aria-pressed", "false");
      b.dataset.key = c.key;
      b.innerHTML = c.html;
      b.addEventListener("click", function () { select(c.key, b); });
      chips.appendChild(b);
      buttons.push(b);
    });

    function select(key, btn) {
      buttons.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      reveal.innerHTML = opts.render(key);
      reveal.hidden = false;
      if (!REDUCED) { reveal.classList.remove("fso-rise"); void reveal.offsetWidth; reveal.classList.add("fso-rise"); }
      if (opts.onSelect) opts.onSelect(key);
      window.FSO.celebrate("correct");
      try { reveal.focus(); } catch (e) {}
    }

    return { select: select };
  }

  // a small SVG compass dial pointing a single cardinal direction
  function dialSVG(dir) {
    var size = 128, c = size / 2, R = c - 14;
    var deg = DIR_DEG[dir], rad = (deg - 90) * Math.PI / 180;
    var tx = c + Math.cos(rad) * R, ty = c + Math.sin(rad) * R;
    var s = '<svg class="fso-dial" viewBox="0 0 ' + size + ' ' + size + '" aria-hidden="true">';
    s += '<circle cx="' + c + '" cy="' + c + '" r="' + R + '" class="fso-ring"></circle>';
    ["N", "E", "S", "W"].forEach(function (d) {
      var dd = DIR_DEG[d], rr = (dd - 90) * Math.PI / 180;
      var lx = c + Math.cos(rr) * (R - 12), ly = c + Math.sin(rr) * (R - 12);
      s += '<text x="' + lx.toFixed(1) + '" y="' + ly.toFixed(1) + '" class="fso-compass-tick' + (d === dir ? ' is-fav' : '') + '" text-anchor="middle" dominant-baseline="middle">' + d + '</text>';
    });
    s += '<line x1="' + c + '" y1="' + c + '" x2="' + tx.toFixed(1) + '" y2="' + ty.toFixed(1) + '" stroke="var(--fso-brass-bright,#efe2b4)" stroke-width="2"></line>';
    s += '<circle cx="' + tx.toFixed(1) + '" cy="' + ty.toFixed(1) + '" r="4" class="fso-compass-dot is-fav"></circle>';
    s += '<circle cx="' + c + '" cy="' + c + '" r="3" fill="var(--fso-accent,#78c39c)"></circle>';
    s += '</svg>';
    return s;
  }

  /* ---- (b) Peach Blossom Direction Finder ---- */
  function initPeach(root) {
    buildPicker(root, {
      eyebrow: "桃花位",
      title: "Your peach blossom direction",
      lede: "桃花位 (táo huā wèi), the peach blossom position, is the sector old feng shui ties to charm, charisma, and 人緣 (rén yuán), the ease of getting on with people. It is read from your Chinese year animal's San He, 三合 (sān hé), triad. This is symbolic guidance toward warmth and social ease, not a promise about any person.",
      prompt: "Pick your Chinese year animal",
      chips: ANIMALS.map(function (a) { return { key: a.key, html: '<span class="fso-chip-zh">' + a.zh + '</span>' + a.en }; }),
      render: function (key) {
        var p = peachFor(key);
        var animal = ANIMALS.filter(function (a) { return a.key === key; })[0];
        return '' +
          '<p class="fso-reveal-eyebrow">桃花位, your peach blossom sector</p>' +
          '<p class="fso-reveal-headline">' + escHtml(animal.en) + ' faces <span class="fso-zh">' + p.dirEn + ', ' + p.dirZh + '</span> (' + p.dirPinyin + ')</p>' +
          '<p class="fso-reveal-sub">From the ' + p.triadZh + ' triad, 三合. Any animal in a triad points to the same direction.</p>' +
          dialSVG(p.dir) +
          '<p class="fso-reveal-body">In the <b>' + p.dirEn + '</b> sector of your room or your desk, tradition sets a clean vase of fresh water holding fresh flowers, peach branches when the season gives them, otherwise any living bloom.</p>' +
          '<p class="fso-reveal-ritual">The water and the opening flower stand for warmth drawn toward you. Keep the water clear and the stems living, and lift them out before they wilt, since flowers left to rot are said to sour the very quality they invite. One vase, well kept, is the whole of it.</p>' +
          '<p class="fso-reveal-note">Attributed as tradition. This is symbolic guidance for openness and social ease, not a prediction about any person, and no vase secures love or a relationship.</p>';
      },
      onSelect: function (key) {
        var p = peachFor(key);
        window.FSO._bridge = window.FSO._bridge || {};
        window.FSO._bridge.peachDir = p.dir;
        if (typeof window.FSO._redrawDiagnostic === "function") window.FSO._redrawDiagnostic();
      }
    });
  }

  /* ---- (c) Five-Element Desk-Color Picker ---- */
  function initColors(root) {
    // chips: the five elements directly, each with a swatch dot
    var elemChips = ELEMENT_ORDER.map(function (k) {
      var e = ELEMENTS[k];
      return { key: k, html: '<span class="fso-chip-swatch" style="background:' + e.swatches[0] + '"></span><span class="fso-chip-zh">' + e.zh + '</span>' + e.en };
    });
    buildPicker(root, {
      eyebrow: "五行",
      title: "Your desk color palette",
      lede: "In feng shui a desk is read through the five phases, 五行 (wǔ xíng). Each phase owns a family of colors, and the old advice is to choose the color of your favorable element so the desk agrees with the phase you carry. This is symbolic and aesthetic tradition, offered for reflection and taste, not medicine and not a promise of any outcome.",
      prompt: "Pick your element, or derive it from your animal below",
      chips: elemChips,
      render: function (key) {
        var e = ELEMENTS[key];
        var sw = "";
        for (var i = 0; i < e.colors.length; i++) {
          sw += '<div class="fso-swatch"><div class="fso-swatch-chip" style="background:' + e.swatches[i] + '"></div><span class="fso-swatch-name">' + escHtml(e.colors[i]) + '</span></div>';
        }
        return '' +
          '<p class="fso-reveal-eyebrow">五行, your desk phase</p>' +
          '<p class="fso-reveal-headline"><span class="fso-zh">' + e.en + ', ' + e.zh + '</span> (' + e.pinyin + ')</p>' +
          '<p class="fso-reveal-sub">The phase colors to lean the desk, its frame, or a mat and runner toward.</p>' +
          '<div class="fso-swatches">' + sw + '</div>' +
          '<p class="fso-reveal-body">Let the desk lean toward this family in the top, the frame, or a runner and a mat if the desk itself is fixed. On the generating cycle, ' + e.feeds + ', so a touch of ' + e.feeder + ' can support it, named lightly as the classic cycle.</p>' +
          '<p class="fso-reveal-ritual">For shape, tradition prizes a desk whose front curves inward to cradle the sitter, spoken of as 玉帶纏腰 (yù dài chán yāo), the jade belt around the waist, an embracing rather than a cutting edge. A desk whose sharp corner points at where you sit is the shape to soften, with rounded corners or a curved mat.</p>' +
          '<p class="fso-reveal-note">Attributed as tradition. Colors and shape are symbolic and aesthetic support, not a rule that changes outcomes, and no color treats or heals any condition.</p>';
      }
    });

    // a small "derive from your animal" row under the picker
    var deriveWrap = elh("div", "fso-picker");
    deriveWrap.style.marginTop = "0";
    deriveWrap.appendChild(elh("p", "fso-picker-prompt", "Or derive from your animal"));
    var dchips = elh("div", "fso-chips");
    dchips.setAttribute("role", "group");
    dchips.setAttribute("aria-label", "Derive your element from your Chinese animal");
    ANIMALS.forEach(function (a) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "fso-chip"; b.dataset.key = a.key;
      b.innerHTML = '<span class="fso-chip-zh">' + a.zh + '</span>' + a.en;
      b.addEventListener("click", function () {
        var elemKey = ANIMAL_ELEMENT[a.key];
        // press the matching element chip so both stay in sync
        var target = root.querySelector('.fso-chip[data-key="' + elemKey + '"]');
        if (target) target.click();
      });
      dchips.appendChild(b);
    });
    deriveWrap.appendChild(dchips);
    // place the derive row right before the gate
    var gate = root.querySelector(".fso-gate");
    root.insertBefore(deriveWrap, gate);
  }

  /* ---- (d) Wealth-Object Placement Guide ---- */
  function initWealth(root) {
    buildPicker(root, {
      eyebrow: "財位",
      title: "Which way your wealth object faces",
      lede: "財位 (cái wèi), the wealth position, is the spot feng shui treats as the seat of prosperity, and locating the genuine one is usually left to a practitioner. What a layperson may set out are the auspicious figures, each with a fixed traditional facing. None of these moves money; they are a symbol given a place, never a promise of wealth.",
      prompt: "Pick a wealth figure",
      chips: WEALTH.map(function (o) { return { key: o.key, html: '<span class="fso-chip-zh">' + o.zh + '</span>' + o.en }; }),
      render: function (key) {
        var o = WEALTH.filter(function (w) { return w.key === key; })[0];
        var facingLabel = o.facing === "out" ? "Faces out, toward the door or window" : "Faces in, into the room";
        return '' +
          '<p class="fso-reveal-eyebrow">財位, its traditional facing</p>' +
          '<p class="fso-reveal-headline"><span class="fso-zh">' + o.en + ', ' + o.zh + '</span> (' + o.pinyin + ')</p>' +
          '<p class="fso-reveal-sub">' + escHtml(facingLabel) + '.</p>' +
          '<p class="fso-reveal-body"><b>' + escHtml(o.face) + '.</b></p>' +
          '<p class="fso-reveal-ritual">' + escHtml(o.why) + '</p>' +
          '<p class="fso-reveal-note">Attributed as tradition. Keep the figure clean and the spot uncluttered, and hold it as a considered ritual corner, a wish given a place, not a shortcut and not a promise of what will come.</p>';
      }
    });
  }

  /* ============================================================
     5. QUIZ SYSTEM  (window.FSO_LEARN, by method)
     ------------------------------------------------------------
     Hydrate every <div data-fso="quiz" data-method="N">. Render the
     method-N quiz with options; on the correct answer show the
     explanation + a fortune, fire confetti, and track progress across
     methods in memory. Degrades to hidden if FSO_LEARN is absent.
     ============================================================ */
  var quizProgress = { total: 0, done: {} };   // done keyed by quiz id

  function initQuizzes() {
    var mounts = document.querySelectorAll('[data-fso="quiz"]');
    if (!mounts.length) return;
    var L = window.FSO_LEARN;
    var quizzes = (L && Array.isArray(L.quizzes)) ? L.quizzes : [];
    if (!quizzes.length) {
      // graceful degrade: no data, hide the mounts entirely
      mounts.forEach(function (m) { m.hidden = true; });
      return;
    }
    // count distinct methods that have both a mount and a quiz, for progress
    var served = [];
    mounts.forEach(function (m) {
      var method = parseInt(m.getAttribute("data-method"), 10);
      var quiz = firstQuizForMethod(quizzes, method);
      if (quiz) served.push(quiz.id);
    });
    quizProgress.total = served.length;

    mounts.forEach(function (m) {
      var method = parseInt(m.getAttribute("data-method"), 10);
      var quiz = firstQuizForMethod(quizzes, method);
      if (!quiz) { m.hidden = true; return; }
      renderQuiz(m, quiz);
    });
  }
  function firstQuizForMethod(quizzes, method) {
    for (var i = 0; i < quizzes.length; i++) if (quizzes[i].method === method) return quizzes[i];
    return null;
  }

  function renderQuiz(mount, quiz) {
    mount.classList.add("fso-quiz");
    mount.hidden = false;
    var keys = ["A", "B", "C", "D", "E", "F"];
    var opts = "";
    (quiz.options || []).forEach(function (opt, i) {
      opts += '<button type="button" class="fso-opt" data-i="' + i + '" data-key="' + (keys[i] || (i + 1)) + '">' + escHtml(opt) + '</button>';
    });
    mount.innerHTML =
      '<p class="fso-quiz-eyebrow">Check yourself <span class="fso-quiz-tag">Method ' + (quiz.method || "") + '</span></p>' +
      '<p class="fso-quiz-q">' + escHtml(quiz.question || "") + '</p>' +
      '<div class="fso-quiz-options" role="group" aria-label="Answer options">' + opts + '</div>' +
      '<p class="fso-quiz-explain" hidden></p>' +
      '<div class="fso-quiz-progress"><span class="fso-quiz-progress-track"><i class="fso-quiz-progress-fill"></i></span>' +
        '<span class="fso-quiz-progress-label"></span></div>';

    var optButtons = mount.querySelectorAll(".fso-opt");
    var explainEl = mount.querySelector(".fso-quiz-explain");
    var answered = false;

    function reveal(chosenIdx) {
      if (answered) return;
      answered = true;
      var correctIdx = quiz.answerIndex;
      optButtons.forEach(function (b, i) {
        b.disabled = true;
        if (i === correctIdx) b.classList.add("is-correct");
        else if (i === chosenIdx) b.classList.add("is-wrong");
      });
      var isRight = chosenIdx === correctIdx;
      var body = escHtml(quiz.explain || "");
      var fortune = quiz.fortune ? '<span class="fso-quiz-fortune">' + escHtml(quiz.fortune) + '</span>' : "";
      explainEl.innerHTML = (isRight ? "<b>Yes.</b> " : "<b>Not quite.</b> ") + body + fortune;
      explainEl.hidden = false;

      // mark progress + celebrate escalating by whether the set completed
      if (!quizProgress.done[quiz.id]) {
        quizProgress.done[quiz.id] = true;
        updateAllProgress();
      }
      if (isRight) {
        var doneCount = countDone();
        if (quizProgress.total && doneCount >= quizProgress.total) window.FSO.celebrate("all-complete");
        else window.FSO.celebrate("method-complete");
      } else {
        // wrong still teaches; a quiet correct-tier flourish, no over-reward
        window.FSO.celebrate("correct");
      }
    }

    optButtons.forEach(function (b) {
      b.addEventListener("click", function () { reveal(parseInt(b.getAttribute("data-i"), 10)); });
    });

    updateAllProgress();
  }
  function countDone() { var n = 0; for (var k in quizProgress.done) if (quizProgress.done.hasOwnProperty(k)) n++; return n; }
  function updateAllProgress() {
    var done = countDone(), total = quizProgress.total || 0;
    var pct = total ? Math.round((done / total) * 100) : 0;
    document.querySelectorAll(".fso-quiz-progress-fill").forEach(function (f) { f.style.width = pct + "%"; });
    document.querySelectorAll(".fso-quiz-progress-label").forEach(function (l) {
      l.textContent = total ? (done + " of " + total + " methods") : "";
    });
  }

  /* ============================================================
     6. BOOT  —  hydrate everything present; each is independent
     ============================================================ */
  window.FSO._bridge = window.FSO._bridge || {};
  function boot() {
    var diag = document.getElementById("fso-diagnostic");
    if (diag) { try { initDiagnostic(diag); } catch (e) {} }
    var peach = document.getElementById("fso-peach");
    if (peach) { try { initPeach(peach); } catch (e) {} }
    var colors = document.getElementById("fso-colors");
    if (colors) { try { initColors(colors); } catch (e) {} }
    var wealth = document.getElementById("fso-wealth");
    if (wealth) { try { initWealth(wealth); } catch (e) {} }
    try { initQuizzes(); } catch (e) {}
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
