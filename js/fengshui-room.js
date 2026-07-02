/* ============================================================
   fengshui-room.js — the Commanding Position room, an interactive
   model + puzzle for feng shui bed placement (命位).

   Vanilla, no deps, no localStorage required. Progressive
   enhancement: the page already carries the rules and a static
   labeled diagram; this hydrates #fsr-root into a draggable model.

   Teaches the three real conditions of the commanding position and
   the classic penalties, scores a puzzle out of 100, and offers an
   optional Eight Mansions (Kua) compass layer that REUSES the exact
   computation from js/fengshui-kua.js (replicated verbatim below so
   accuracy never drifts; see KUA section).

   Symbolic cultural guidance, meaning not prediction. Never a promise.
   Hook: <div id="fsr-root" ...> (server-rendered fallback inside).
   ============================================================ */
(function () {
  "use strict";

  var root = document.getElementById("fsr-root");
  if (!root) return;

  var REDUCED = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  try {
    var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.addEventListener) mq.addEventListener("change", function (e) { REDUCED = e.matches; });
  } catch (e) {}

  /* ---------- room geometry, in grid units ---------- */
  // The room is a GRID of cells. Walls sit on the border. Everything
  // (door, window, beam, mirror, bed) is expressed in grid coordinates
  // so the scoring is honest integer geometry, not pixel guessing.
  var COLS = 12, ROWS = 10;      // interior playfield in cells
  var CELL = 34;                 // px per cell at base; SVG scales via viewBox
  var PAD = 30;                  // px border for walls + labels
  var W = COLS * CELL + PAD * 2;
  var H = ROWS * CELL + PAD * 2;
  // Extra horizontal room in the viewBox ONLY, so the outside wall labels
  // (DOOR/WINDOW/MIRROR on the LEFT/RIGHT walls) fit instead of clipping.
  // The room, drag math and compass keep using PAD/W/H (room-centred); only
  // the viewBox is widened symmetrically so the room stays centred.
  var LBL = 52;                  // label gutter each side of the viewBox
  var VB_MIN_X = -LBL;
  var VB_W = W + LBL * 2;

  var BED_W = 3, BED_H = 4;      // bed footprint in cells (double bed, head end)

  // wall sides
  var TOP = "top", BOTTOM = "bottom", LEFT = "left", RIGHT = "right";

  /* ---------- KUA (Eight Mansions) — replicated from fengshui-kua.js ----------
     Kept byte-for-byte faithful to site/js/fengshui-kua.js so the number,
     the group split, and the four favorable directions never diverge from
     the site's canonical calculator. FAV order: Sheng Qi, Tian Yi, Yan Nian, Fu Wei. */
  var FAV = {
    1: ["SE", "E", "S", "N"],
    2: ["NE", "W", "NW", "SW"],
    3: ["S", "N", "SE", "E"],
    4: ["N", "S", "E", "SE"],
    6: ["W", "NE", "SW", "NW"],
    7: ["NW", "SW", "NE", "W"],
    8: ["SW", "NW", "W", "NE"],
    9: ["E", "SE", "N", "S"]
  };
  var FAV_LABEL = [
    ["Sheng Qi, 生氣", "the strongest, for vitality and momentum"],
    ["Tian Yi, 天醫", "the heavenly doctor, a category name, for rest and health"],
    ["Yan Nian, 延年", "for steadiness and relationships"],
    ["Fu Wei, 伏位", "for a settled foundation"]
  ];
  var DIRNAME = { N: "North", NE: "Northeast", E: "East", SE: "Southeast", S: "South", SW: "Southwest", W: "West", NW: "Northwest" };
  var EAST = { 1: 1, 3: 1, 4: 1, 9: 1 };
  var DIR_DEG = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SW: 225, W: 270, NW: 315 };

  function reduceDigit(n) { while (n > 9) { n = String(n).split("").reduce(function (a, d) { return a + (+d); }, 0); } return n; }
  function kuaFrom(dateStr, sex) {
    var d = new Date(dateStr + "T12:00:00");
    if (isNaN(d)) return null;
    var y = d.getFullYear(), m = d.getMonth() + 1, day = d.getDate();
    if (m < 2 || (m === 2 && day < 4)) y -= 1;           // 立春 boundary, ~Feb 4
    var last2 = y % 100;
    var digit = reduceDigit(last2 < 10 ? last2 : (Math.floor(last2 / 10) + (last2 % 10)));
    digit = reduceDigit(digit);
    var k;
    if (y < 2000) k = (sex === "female") ? reduceDigit(5 + digit) : reduceDigit(10 - digit);
    else k = (sex === "female") ? reduceDigit(6 + digit) : reduceDigit(9 - digit);
    if (k === 0) k = 9;
    if (k === 5) k = (sex === "female") ? 8 : 2;
    return { kua: k, effYear: y };
  }

  /* ---------- svg helpers ---------- */
  var NS = "http://www.w3.org/2000/svg";
  function el(name, attrs) {
    var n = document.createElementNS(NS, name);
    if (attrs) for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
    return n;
  }
  function px(c) { return PAD + c * CELL; }               // grid col/row -> px

  /* ---------- fixture geometry helpers ---------- */
  // A door/window occupies a span of cells along one wall. We store its
  // start cell and length, plus the wall side.
  function centerOfSpan(f) {
    var mid = f.start + f.len / 2;
    if (f.side === TOP)    return { x: PAD + mid * CELL, y: PAD };
    if (f.side === BOTTOM) return { x: PAD + mid * CELL, y: PAD + ROWS * CELL };
    if (f.side === LEFT)   return { x: PAD, y: PAD + mid * CELL };
    return { x: PAD + COLS * CELL, y: PAD + mid * CELL };  // RIGHT
  }
  // inward normal (unit) of a wall
  function inward(side) {
    if (side === TOP)    return { x: 0, y: 1 };
    if (side === BOTTOM) return { x: 0, y: -1 };
    if (side === LEFT)   return { x: 1, y: 0 };
    return { x: -1, y: 0 };
  }

  /* ---------- bed model ----------
     bed.col/row = top-left cell of footprint.
     bed.orient = which side the HEAD sits on: 'top'|'bottom'|'left'|'right'.
     Footprint width/height depends on orientation. */
  function bedFootprint(b) {
    var horiz = (b.orient === LEFT || b.orient === RIGHT);
    var w = horiz ? BED_H : BED_W;
    var h = horiz ? BED_W : BED_H;
    return { col: b.col, row: b.row, w: w, h: h };
  }
  // the head strip (one cell deep) in grid coords
  function headRect(b) {
    var fp = bedFootprint(b);
    if (b.orient === TOP)    return { col: fp.col, row: fp.row, w: fp.w, h: 1 };
    if (b.orient === BOTTOM) return { col: fp.col, row: fp.row + fp.h - 1, w: fp.w, h: 1 };
    if (b.orient === LEFT)   return { col: fp.col, row: fp.row, w: 1, h: fp.h };
    return { col: fp.col + fp.w - 1, row: fp.row, w: 1, h: fp.h };  // RIGHT
  }
  // center point of bed footprint in px
  function bedCenterPx(b) {
    var fp = bedFootprint(b);
    return { x: px(fp.col + fp.w / 2), y: px(fp.row + fp.h / 2) };
  }
  // the point at the FOOT edge center (px) and the outward foot direction
  function footInfo(b) {
    var fp = bedFootprint(b);
    var cx = fp.col + fp.w / 2, cy = fp.row + fp.h / 2;
    if (b.orient === TOP)    return { x: px(cx), y: px(fp.row + fp.h), dir: { x: 0, y: 1 } };
    if (b.orient === BOTTOM) return { x: px(cx), y: px(fp.row),        dir: { x: 0, y: -1 } };
    if (b.orient === LEFT)   return { x: px(fp.col + fp.w), y: px(cy),  dir: { x: 1, y: 0 } };
    return { x: px(fp.col), y: px(cy), dir: { x: -1, y: 0 } };        // RIGHT
  }
  // which compass direction the HEAD points TOWARD (feng shui reads the
  // crown of the head aiming outward past the headboard).
  // orient=top means head is at the top wall, so head points N (up).
  function headCompass(b, doorSideForNorth) {
    // We fix North to the wall OPPOSITE the door for a stable compass, a
    // common teaching convention; the compass layer states its own frame.
    return headDirRaw(b);
  }
  // head aims: top->up, bottom->down, left->left, right->right (screen space)
  function headDirRaw(b) {
    if (b.orient === TOP)    return { x: 0, y: -1 };
    if (b.orient === BOTTOM) return { x: 0, y: 1 };
    if (b.orient === LEFT)   return { x: -1, y: 0 };
    return { x: 1, y: 0 };
  }

  /* ---------- rect / clamp helpers ---------- */
  function clampBed(b) {
    var fp = bedFootprint(b);
    b.col = Math.max(0, Math.min(COLS - fp.w, b.col));
    b.row = Math.max(0, Math.min(ROWS - fp.h, b.row));
    return b;
  }
  function rectsOverlap(a, c) {
    return a.col < c.col + c.w && a.col + a.w > c.col &&
           a.row < c.row + c.h && a.row + a.h > c.row;
  }

  /* ============================================================
     SCORING — the honest geometry. Returns a structured result the
     UI turns into both a /100 score and specific spoken feedback.
     ============================================================ */

  // Is the head strip flush against a solid wall (not a doorway/window)?
  function headAgainstWall(state) {
    var b = state.bed, fp = bedFootprint(b);
    var side, onWall = false;
    if (b.orient === TOP)    { onWall = fp.row === 0;            side = TOP; }
    if (b.orient === BOTTOM) { onWall = fp.row + fp.h === ROWS;  side = BOTTOM; }
    if (b.orient === LEFT)   { onWall = fp.col === 0;            side = LEFT; }
    if (b.orient === RIGHT)  { onWall = fp.col + fp.w === COLS;  side = RIGHT; }
    if (!onWall) return { ok: false, side: side, onWall: false, overWindow: false };
    // is the head strip overlapping the window opening on that same wall?
    var hr = headRect(b), overWindow = false;
    if (state.windowF && state.windowF.side === side) {
      var ws = state.windowF.start, we = state.windowF.start + state.windowF.len;
      if (side === TOP || side === BOTTOM) {
        overWindow = hr.col < we && hr.col + hr.w > ws;
      } else {
        overWindow = hr.row < we && hr.row + hr.h > ws;
      }
    }
    // also flag if head is directly over the door opening (rare but bad)
    var overDoor = false;
    if (state.doorF && state.doorF.side === side) {
      var ds = state.doorF.start, de = state.doorF.start + state.doorF.len;
      if (side === TOP || side === BOTTOM) overDoor = hr.col < de && hr.col + hr.w > ds;
      else overDoor = hr.row < de && hr.row + hr.h > ds;
    }
    return { ok: !overWindow && !overDoor, side: side, onWall: true, overWindow: overWindow, overDoor: overDoor };
  }

  // Line of sight from bed to the door center. We sample the door center
  // and ask: is the straight segment from the bed-center to the door
  // blocked by the bed itself only trivially? In an empty room the door is
  // always visible unless the bed's own body sits between the sleeper's
  // eyes and the door in a way that the headboard blocks. For teaching, we
  // model "can you see the door lying down" as: the door is NOT behind the
  // headboard wall. If the head is on the same wall as the door and faces
  // away, you cannot see it.
  function canSeeDoor(state) {
    var b = state.bed;
    var doorC = centerOfSpan(state.doorF);
    var bc = bedCenterPx(b);
    // vector from bed to door
    var v = { x: doorC.x - bc.x, y: doorC.y - bc.y };
    // the head points headDirRaw; the sleeper faces the FOOT direction.
    // You can see roughly everything except what is directly behind the
    // headboard. Treat "behind head" as the half-plane on the head side.
    var hd = headDirRaw(b);
    var dot = v.x * hd.x + v.y * hd.y;    // >0 means door is on head side (behind you)
    // Normalize by distance to be lenient near the sides.
    var dist = Math.hypot(v.x, v.y) || 1;
    var cos = dot / dist;
    // door is "behind the head" and unseen only if it is well behind (cos > ~0.5)
    var behind = cos > 0.5;
    return { ok: !behind, cos: cos, doorC: doorC, bedC: bc };
  }

  // In-line with the door: is the bed centered on the door's axis (bad),
  // or offset to the side (good), ideally at the far diagonal?
  function doorAlignment(state) {
    var door = state.doorF;
    var dc = centerOfSpan(door);
    var bc = bedCenterPx(state.bed);
    var horizWall = (door.side === TOP || door.side === BOTTOM);
    // offset perpendicular to the door's inward axis
    var offsetPx = horizWall ? Math.abs(bc.x - dc.x) : Math.abs(bc.y - dc.y);
    var offsetCells = offsetPx / CELL;
    // depth away from the door wall
    var inw = inward(door.side);
    var depthPx = ((bc.x - dc.x) * inw.x + (bc.y - dc.y) * inw.y);
    var depthCells = depthPx / CELL;
    var inLine = offsetCells < 1.5;                 // roughly on the door's axis
    return { inLine: inLine, offsetCells: offsetCells, depthCells: depthCells, doorC: dc };
  }

  // The dreaded coffin: feet point straight out the door AND roughly in line.
  function coffinPosition(state) {
    var fi = footInfo(state.bed);
    var door = state.doorF;
    var inw = inward(door.side);           // points INTO the room
    // foot dir points OUT of the room toward that wall if fi.dir == -inw
    var toward = (fi.dir.x === -inw.x && fi.dir.y === -inw.y);
    var align = doorAlignment(state);
    return toward && align.inLine;
  }

  // Under an overhead beam: does the bed footprint overlap the beam band?
  function underBeam(state) {
    if (!state.beam) return false;
    var fp = bedFootprint(state.bed);
    return rectsOverlap(fp, state.beam.rect);
  }

  // A mirror FACING the bed: mirror sits on a wall, its inward normal
  // points toward the bed center within a cone, and there is line of sight.
  function mirrorFacesBed(state) {
    if (!state.mirror) return false;
    var m = state.mirror;
    var mc = centerOfSpan(m);
    var inw = inward(m.side);
    var bc = bedCenterPx(state.bed);
    var v = { x: bc.x - mc.x, y: bc.y - mc.y };
    var dist = Math.hypot(v.x, v.y) || 1;
    var cos = (v.x * inw.x + v.y * inw.y) / dist;
    return cos > 0.35;   // bed lies broadly in front of the mirror
  }

  // Does the mirror reflect the DOOR? (the classic cure when the bed
  // cannot see the door). Mirror inward normal points toward the door center.
  function mirrorReflectsDoor(state) {
    if (!state.mirror || !state.doorF) return false;
    var m = state.mirror;
    if (m.side === state.doorF.side) return false;   // same wall can't reflect it usefully
    var mc = centerOfSpan(m);
    var dc = centerOfSpan(state.doorF);
    var inw = inward(m.side);
    var v = { x: dc.x - mc.x, y: dc.y - mc.y };
    var dist = Math.hypot(v.x, v.y) || 1;
    var cos = (v.x * inw.x + v.y * inw.y) / dist;
    return cos > 0.35;
  }

  // Full evaluation.
  function evaluate(state) {
    var head = headAgainstWall(state);
    var see = canSeeDoor(state);
    var align = doorAlignment(state);
    var coffin = coffinPosition(state);
    var beam = underBeam(state);
    var mirBed = mirrorFacesBed(state);
    var mirDoor = mirrorReflectsDoor(state);

    // Diagonal bonus: far from the door wall AND offset to a side.
    var diagonal = align.depthCells > (ROWS * 0.45) && align.offsetCells > (COLS * 0.18);

    // ----- score /100 -----
    // Core three conditions carry the weight (75), penalties subtract,
    // small bonuses reward the ideal far-diagonal placement.
    var score = 0, parts = [];
    // 1) see the door (0 or 25)
    if (see.ok) { score += 25; }
    // 2) offset from the door axis (0 / 12 / 25)
    if (!align.inLine) { score += diagonal ? 25 : 18; }
    else { score += 0; }
    // 3) solid wall + headboard behind (0 / 25)
    if (head.ok) { score += 25; }
    else if (head.onWall && !head.overWindow && !head.overDoor) { score += 25; }
    // support without being on a wall at all: partial if any back cell touches a wall
    // (handled by head.ok already for the strict case)

    // bonus: reachable both sides / floor clear is implicit; give up to 5 for
    // not being jammed into a corner that blocks a side path when NOT diagonal-ideal.

    // penalties
    if (coffin) { score -= 30; }
    if (beam) { score -= 18; }
    if (mirBed) { score -= 15; }
    if (!see.ok && !mirDoor) { /* already lost the 25; extra nudge handled in copy */ }

    score = Math.max(0, Math.min(100, Math.round(score)));

    return {
      score: score,
      head: head, see: see, align: align, diagonal: diagonal,
      coffin: coffin, beam: beam, mirrorFacesBed: mirBed, mirrorReflectsDoor: mirDoor
    };
  }

  /* ============================================================
     FEEDBACK — kind, specific, second person, meaning-not-prediction.
     Returns an ordered list of {tone, text}. tone: good|warn|bad|tip.
     ============================================================ */
  function feedback(ev, state) {
    var out = [];

    // 1. line of sight
    if (ev.see.ok) {
      out.push({ tone: "good", text: "Lying down you can see the door. That clear sight line is the heart of the commanding position." });
    } else {
      if (ev.mirrorReflectsDoor && !ev.mirrorFacesBed) {
        out.push({ tone: "tip", text: "The door sits behind your head, so you cannot see it directly, but a mirror is placed to catch the doorway in its reflection. That is the classic cure, and here the mirror does not face the bed, which is right." });
      } else if (ev.mirrorReflectsDoor && ev.mirrorFacesBed) {
        out.push({ tone: "warn", text: "The door is behind your head. A mirror reflects it, which is the traditional cure, but that same mirror also faces the bed. Angle it so it catches the door without watching you as you rest." });
      } else {
        out.push({ tone: "bad", text: "You cannot see the door from here. Turn the bed or move it so the entrance is in view, or place a mirror to reflect the doorway back to you." });
      }
    }

    // 2. offset / diagonal
    if (!ev.align.inLine) {
      if (ev.diagonal) {
        out.push({ tone: "good", text: "The bed rests in the far corner, diagonal from the door. This is the position tradition prizes most, close to the wall, far from the rush of the entrance." });
      } else {
        out.push({ tone: "good", text: "The bed sits off to the side of the door rather than in its direct path. Sliding it toward the far diagonal corner would make it stronger still." });
      }
    } else {
      out.push({ tone: "warn", text: "The bed is roughly in line with the door, in the path of the energy that enters. Slide it sideways so it no longer sits on the door's axis." });
    }

    // 3. headboard / wall
    if (ev.head.ok) {
      out.push({ tone: "good", text: "The head is against a solid wall with a firm headboard behind it, the mountain, 山, that gives you backing." });
    } else if (ev.head.overWindow) {
      out.push({ tone: "warn", text: "The head is set against a window rather than a solid wall. Support behind the head is asked to feel like a mountain, not open glass. Shift the bed so a full wall sits behind you." });
    } else if (!ev.head.onWall) {
      out.push({ tone: "warn", text: "The head of the bed floats away from the wall. Bring it back so a solid wall and headboard stand behind you for support." });
    } else if (ev.head.overDoor) {
      out.push({ tone: "warn", text: "The head is set over the doorway. Move it to a solid stretch of wall so nothing opens behind your head as you sleep." });
    }

    // penalties
    if (ev.coffin) {
      out.push({ tone: "bad", text: "The feet point straight out the open door while the bed sits in its line. Tradition calls this the coffin, or dead man's, position, the placement it warns against most. Slide the bed to the far diagonal so the feet no longer aim through the doorway." });
    }
    if (ev.beam) {
      out.push({ tone: "bad", text: "The bed sits directly under the exposed beam, 橫樑壓頂, said to press down on rest. Move the bed clear of the beam, or drape it. A traditional cure hangs two bamboo flutes on a red ribbon." });
    }
    if (ev.mirrorFacesBed) {
      out.push({ tone: "warn", text: "A mirror faces the bed. Mirrors are read as too active for a place of rest, said to disturb sleep. Move it, cover it at night, or turn it so it no longer looks upon the bed." });
    }

    return out;
  }

  /* ============================================================
     LAYOUTS — the puzzle rooms. Each starts mis-arranged; the player
     drags to command. Door and window are fixed; bed (and sometimes a
     beam/mirror) start "wrong". Solvable to a high score.
     ============================================================ */
  function makeLayout(spec) {
    return {
      name: spec.name,
      note: spec.note,
      doorF: spec.door,
      windowF: spec.window,
      beam: spec.beam || null,
      mirror: spec.mirror || null,
      bed: { col: spec.bed.col, row: spec.bed.row, orient: spec.bed.orient }
    };
  }

  function beamBand(orient, at) {
    // a beam spans the room; orient 'h' = a horizontal band at row `at`,
    // orient 'v' = vertical band at col `at`, one cell thick, full length.
    if (orient === "h") return { orient: "h", rect: { col: 0, row: at, w: COLS, h: 1 } };
    return { orient: "v", rect: { col: at, row: 0, w: 1, h: ROWS } };
  }

  var LAYOUTS = [
    makeLayout({
      name: "The rushing door",
      note: "This bed sits square in the door's path with its feet aimed out the doorway, the coffin line. Bring it to command.",
      door: { side: TOP, start: 5, len: 2 },
      window: { side: RIGHT, start: 3, len: 3 },
      bed: { col: 5, row: 0, orient: TOP }        // in line, head... near door, coffin-ish
    }),
    makeLayout({
      name: "The glass headboard",
      note: "The sleeper's head rests against a window while the door stays out of sight behind them. Give the head a wall and win back the door.",
      door: { side: LEFT, start: 6, len: 2 },
      window: { side: TOP, start: 4, len: 4 },
      bed: { col: 4, row: 0, orient: TOP }        // head against window (top), door on left behind
    }),
    makeLayout({
      name: "The pressing beam",
      note: "A beam runs across the ceiling and the bed lies right beneath it, near the door as well. Slide clear of the beam and into command.",
      door: { side: BOTTOM, start: 2, len: 2 },
      window: { side: RIGHT, start: 4, len: 3 },
      beam: beamBand("h", 5),
      bed: { col: 4, row: 4, orient: TOP }        // under beam, floating
    }),
    makeLayout({
      name: "The watching mirror",
      note: "A mirror on the wall stares straight at the bed, and the bed drifts off its wall. Find the backing wall and settle the mirror.",
      door: { side: RIGHT, start: 6, len: 2 },
      window: { side: LEFT, start: 5, len: 3 },
      mirror: { side: TOP, start: 4, len: 3 },
      bed: { col: 5, row: 3, orient: BOTTOM }     // mirror on top faces bed below, head down
    })
  ];

  function freshModelState() {
    // Open sandbox room for the live model: neutral start, everything movable.
    return {
      mode: "model",
      doorF: { side: TOP, start: 5, len: 2 },
      windowF: { side: RIGHT, start: 3, len: 3 },
      beam: null,
      mirror: null,
      bed: { col: 4, row: 3, orient: TOP },
      solved: false
    };
  }
  function cloneLayout(L) {
    return {
      mode: "puzzle",
      name: L.name, note: L.note,
      doorF: { side: L.doorF.side, start: L.doorF.start, len: L.doorF.len },
      windowF: { side: L.windowF.side, start: L.windowF.start, len: L.windowF.len },
      beam: L.beam ? { orient: L.beam.orient, rect: { col: L.beam.rect.col, row: L.beam.rect.row, w: L.beam.rect.w, h: L.beam.rect.h } } : null,
      mirror: L.mirror ? { side: L.mirror.side, start: L.mirror.start, len: L.mirror.len } : null,
      bed: { col: L.bed.col, row: L.bed.row, orient: L.bed.orient },
      solved: false
    };
  }

  /* ============================================================
     STATE + BUILD SHELL — STUDIO LAYOUT + STATUS-HEADER REFINEMENT
     ------------------------------------------------------------
     Two columns. The LEFT (hero) column reads top to bottom:
       1. a STATUS HEADER directly above the board holding, in order,
          the mode tabs, the mode note, the puzzle brief, and the
          Commanding position score meter, so that while dragging the
          bed/beam/mirror the note, brief and live score stay in view;
       2. the board (the hero);
       3. a slim toolbar with the action pills and a demoted Reset.
     The RIGHT rail holds the reading that sits beside the board: the
     feedback critiques, the Kua pro layer, and the solved/share card.
     On narrow widths it all stacks: header, board, toolbar, critiques.
     ============================================================ */
  var state = freshModelState();
  var kuaState = { on: false, kua: null, dirs: null, effYear: null };
  var puzzleIndex = 0;

  // build the shell
  root.innerHTML = "";
  root.classList.add("fsr-ready");

  var stage = document.createElement("div");
  stage.className = "fsr-stage";

  /* --- HERO column: status header, board, toolbar --- */
  var hero = document.createElement("div");
  hero.className = "fsr-hero";

  /* --- STATUS HEADER above the board (tabs + note + brief + meter) --- */
  var header = document.createElement("div");
  header.className = "fsr-header";

  // mode tabs
  var tabs = document.createElement("div");
  tabs.className = "fsr-tabs";
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Room mode");
  var tabModel = mkTab("Free room", "model");
  var tabPuzzle = mkTab("Puzzle", "puzzle");
  tabs.appendChild(tabModel);
  tabs.appendChild(tabPuzzle);
  header.appendChild(tabs);

  // short per-mode explainer, right after the tabs
  var modeNote = document.createElement("p");
  modeNote.className = "fsr-mode-note";
  header.appendChild(modeNote);
  var MODE_NOTE = {
    model: "Free room. Drag the bed, beam, and mirror to feel how the room scores. Add a beam or mirror to test the hard cases.",
    puzzle: "Puzzle. Each room starts arranged wrong. Drag the bed into the commanding position to score it, then try the next room."
  };
  function setModeNote(mode) { modeNote.textContent = MODE_NOTE[mode] || ""; }

  function mkTab(label, mode) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "fsr-tab";
    b.textContent = label;
    b.setAttribute("role", "tab");
    b.dataset.mode = mode;
    b.addEventListener("click", function () { switchMode(mode); });
    return b;
  }

  // puzzle brief (name + note), shown in puzzle mode
  var brief = document.createElement("div");
  brief.className = "fsr-brief";
  header.appendChild(brief);

  // score meter — stays above the board so the live score reads while dragging
  var meterWrap = document.createElement("div");
  meterWrap.className = "fsr-meter";
  meterWrap.innerHTML =
    '<div class="fsr-meter-head"><span class="fsr-meter-label">Commanding position</span>' +
    '<span class="fsr-score" id="fsr-score">0<small>/100</small></span></div>' +
    '<div class="fsr-bar" aria-hidden="true"><i id="fsr-bar-fill"></i></div>';
  header.appendChild(meterWrap);
  var scoreEl = meterWrap.querySelector("#fsr-score");
  var barFill = meterWrap.querySelector("#fsr-bar-fill");

  // --- board (svg) ---
  var boardWrap = document.createElement("div");
  boardWrap.className = "fsr-board-wrap";
  var svg = el("svg", {
    "class": "fsr-board",
    viewBox: VB_MIN_X + " 0 " + VB_W + " " + H,
    role: "application",
    tabindex: "0",
    "aria-label": "Bedroom layout. Hover or focus the bed to reveal its rotate control. Use arrow keys to move the bed, press R to rotate it, then press Check my placement. The beam and mirror can be dragged."
  });
  boardWrap.appendChild(svg);

  /* --- the slim toolbar directly under the board: action pills on the
         left, Reset demoted to a quiet ghost link set apart on the right --- */
  var toolbar = document.createElement("div");
  toolbar.className = "fsr-toolbar";
  toolbar.setAttribute("role", "toolbar");
  toolbar.setAttribute("aria-label", "Room controls");

  var toolbarActions = document.createElement("div");
  toolbarActions.className = "fsr-toolbar-actions";
  var toolbarReset = document.createElement("div");
  toolbarReset.className = "fsr-toolbar-reset";
  toolbar.appendChild(toolbarActions);
  toolbar.appendChild(toolbarReset);

  hero.appendChild(header);
  hero.appendChild(boardWrap);
  hero.appendChild(toolbar);

  /* --- RIGHT rail: critiques, Kua pro layer, share card --- */
  var rail = document.createElement("div");
  rail.className = "fsr-rail";

  stage.appendChild(hero);
  stage.appendChild(rail);
  root.appendChild(stage);

  // readout list (live region) — the feedback critiques, beside the board
  var readout = document.createElement("ul");
  readout.className = "fsr-readout";
  readout.setAttribute("aria-live", "polite");
  readout.setAttribute("aria-atomic", "false");
  rail.appendChild(readout);

  // action pills into the toolbar; Reset is a small ghost link set apart
  var btnCheck = mkBtn("Check my placement", "fsr-btn fsr-btn-primary");
  var btnBeam = mkBtn("Add beam", "fsr-btn fsr-toggle");
  var btnMirror = mkBtn("Add mirror", "fsr-btn fsr-toggle");
  toolbarActions.appendChild(btnCheck);
  toolbarActions.appendChild(btnBeam);
  toolbarActions.appendChild(btnMirror);

  // Reset — demoted to a small ghost/text control, structurally distinct
  var btnNew = document.createElement("button");
  btnNew.type = "button";
  btnNew.className = "fsr-btn-reset";
  btnNew.innerHTML = resetGlyph() + '<span class="fsr-reset-label">Reset room</span>';
  toolbarReset.appendChild(btnNew);
  var btnNewLabel = btnNew.querySelector(".fsr-reset-label");

  function mkBtn(label, cls) {
    var b = document.createElement("button");
    b.type = "button"; b.className = cls; b.textContent = label;
    return b;
  }
  // a small counter-clockwise reset glyph for the ghost link (distinct from
  // the bed's clockwise rotate handle so the two never read as the same)
  function resetGlyph() {
    return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M4 12a8 8 0 1 0 2.4-5.7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M3 4v4h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '</svg>';
  }

  // --- KUA compass panel ---
  var kuaPanel = document.createElement("div");
  kuaPanel.className = "fsr-kua";
  kuaPanel.innerHTML =
    '<details class="fsr-kua-details">' +
      '<summary>Pro layer: your favorable directions</summary>' +
      '<p class="fsr-kua-intro">Eight Mansions, 八宅, turns a birth year into a Kua number and four favorable directions. It is one classical school, and schools differ on what facing a direction means. This runs in your browser and is offered for reflection, not a promise.</p>' +
      '<form class="fsr-kua-form" id="fsr-kua-form">' +
        '<label class="fsr-field"><span>Date of birth</span>' +
          '<input type="date" id="fsr-kua-date" min="1900-01-01" max="2039-12-31" required></label>' +
        '<span class="fsr-kua-sex" role="radiogroup" aria-label="Recorded as">' +
          '<label><input type="radio" name="fsr-kua-sex" value="male" checked> male</label>' +
          '<label><input type="radio" name="fsr-kua-sex" value="female"> female</label>' +
        '</span>' +
        '<button type="submit" class="fsr-btn">Show my directions</button>' +
      '</form>' +
      '<div id="fsr-kua-out" class="fsr-kua-out" aria-live="polite"></div>' +
    '</details>';
  rail.appendChild(kuaPanel);

  // share card (hidden until solved)
  var share = document.createElement("div");
  share.className = "fsr-share";
  share.hidden = true;
  rail.appendChild(share);

  /* ---------- svg layers ---------- */
  var gCompass = el("g", { "class": "fsr-g-compass" });    // beneath, ring
  var gRoom = el("g", { "class": "fsr-g-room" });
  var gFix = el("g", { "class": "fsr-g-fix" });            // door/window/beam/mirror
  var gSight = el("g", { "class": "fsr-g-sight" });        // line of sight
  var gBed = el("g", { "class": "fsr-g-bed", tabindex: "-1" });
  svg.appendChild(gCompass);
  svg.appendChild(gRoom);
  svg.appendChild(gFix);
  svg.appendChild(gSight);
  svg.appendChild(gBed);

  // Expose a CSS-targetable state so the rotate handle can be revealed on
  // hover of the bed group (item 1). The CSS agent reveals .fsr-rotate on
  // `.fsr-g-bed.is-bed-hover` and on `svg:focus .fsr-rotate`.
  gBed.addEventListener("pointerenter", function () { gBed.classList.add("is-bed-hover"); });
  gBed.addEventListener("pointerleave", function () { if (!drag) gBed.classList.remove("is-bed-hover"); });
  // Keyboard: focusing the board (or the rotate handle) reveals the handle too.
  svg.addEventListener("focusin", function () { gBed.classList.add("is-bed-hover"); });
  svg.addEventListener("focusout", function (e) {
    // keep it revealed if focus is still inside the svg
    if (!svg.contains(e.relatedTarget)) gBed.classList.remove("is-bed-hover");
  });

  /* ---------- draw ---------- */
  function draw() {
    drawCompass();
    drawRoom();
    drawFixtures();
    drawSight();
    drawBed();
  }

  function drawRoom() {
    gRoom.innerHTML = "";
    // floor
    gRoom.appendChild(el("rect", {
      x: PAD, y: PAD, width: COLS * CELL, height: ROWS * CELL,
      "class": "fsr-floor", rx: 6
    }));
    // subtle grid
    for (var c = 1; c < COLS; c++) {
      gRoom.appendChild(el("line", { x1: px(c), y1: PAD, x2: px(c), y2: PAD + ROWS * CELL, "class": "fsr-grid" }));
    }
    for (var r = 1; r < ROWS; r++) {
      gRoom.appendChild(el("line", { x1: PAD, y1: px(r), x2: PAD + COLS * CELL, y2: px(r), "class": "fsr-grid" }));
    }
    // walls (thick border)
    gRoom.appendChild(el("rect", {
      x: PAD, y: PAD, width: COLS * CELL, height: ROWS * CELL,
      "class": "fsr-wall", rx: 6
    }));
  }

  function fixtureLine(f, cls) {
    var a, b;
    if (f.side === TOP)    { a = { x: px(f.start), y: PAD }; b = { x: px(f.start + f.len), y: PAD }; }
    else if (f.side === BOTTOM) { a = { x: px(f.start), y: PAD + ROWS * CELL }; b = { x: px(f.start + f.len), y: PAD + ROWS * CELL }; }
    else if (f.side === LEFT)   { a = { x: PAD, y: px(f.start) }; b = { x: PAD, y: px(f.start + f.len) }; }
    else { a = { x: PAD + COLS * CELL, y: px(f.start) }; b = { x: PAD + COLS * CELL, y: px(f.start + f.len) }; }
    return el("line", { x1: a.x, y1: a.y, x2: b.x, y2: b.y, "class": cls });
  }

  function drawFixtures() {
    gFix.innerHTML = "";
    // beam (behind door/window visually but drawn first)
    if (state.beam) {
      var br = state.beam.rect;
      var beamRect = el("rect", {
        x: px(br.col), y: px(br.row), width: br.w * CELL, height: br.h * CELL,
        "class": "fsr-beam is-draggable", rx: 3,
        tabindex: "0", role: "button",
        "aria-label": "Overhead beam. Drag to slide it, or use arrow keys."
      });
      gFix.appendChild(beamRect);
      beamRect.addEventListener("pointerdown", onBeamPointerDown);
      beamRect.addEventListener("keydown", onBeamKey);
      var bc = { x: px(br.col + br.w / 2), y: px(br.row + br.h / 2) };
      // small grip glyph the CSS agent can style; also a drag hint
      var grip = el("g", { "class": "fsr-grip fsr-beam-grip", "aria-hidden": "true" });
      grip.appendChild(el("circle", { cx: bc.x, cy: bc.y, r: 9, "class": "fsr-grip-dot" }));
      grip.appendChild(el("line", { x1: bc.x - 4, y1: bc.y - 3, x2: bc.x + 4, y2: bc.y - 3, "class": "fsr-grip-bar" }));
      grip.appendChild(el("line", { x1: bc.x - 4, y1: bc.y, x2: bc.x + 4, y2: bc.y, "class": "fsr-grip-bar" }));
      grip.appendChild(el("line", { x1: bc.x - 4, y1: bc.y + 3, x2: bc.x + 4, y2: bc.y + 3, "class": "fsr-grip-bar" }));
      gFix.appendChild(grip);
      gFix.appendChild(text(bc.x, bc.y - 16, "BEAM", "fsr-fix-label"));
    }
    // door: gap in wall + swing arc + label
    var d = state.doorF, dc = centerOfSpan(d);
    gFix.appendChild(fixtureLine(d, "fsr-door-gap"));
    gFix.appendChild(fixtureLine(d, "fsr-door-line"));
    // door leaf swing arc
    var inw = inward(d.side);
    var hinge = doorHinge(d);
    var arc = doorArc(d, hinge, inw);
    gFix.appendChild(arc.leaf);
    gFix.appendChild(arc.sweep);
    gFix.appendChild(labelOutside(d, "DOOR", "fsr-door-text"));

    // window
    if (state.windowF) {
      var wf = state.windowF;
      gFix.appendChild(fixtureLine(wf, "fsr-window"));
      gFix.appendChild(labelOutside(wf, "WINDOW", "fsr-window-text"));
    }

    // mirror
    if (state.mirror) {
      var m = state.mirror;
      var mirrorLine = fixtureLine(m, "fsr-mirror is-draggable");
      mirrorLine.setAttribute("tabindex", "0");
      mirrorLine.setAttribute("role", "button");
      mirrorLine.setAttribute("aria-label", "Mirror on the wall. Drag to slide it along the wall, or use arrow keys.");
      gFix.appendChild(mirrorLine);
      mirrorLine.addEventListener("pointerdown", onMirrorPointerDown);
      mirrorLine.addEventListener("keydown", onMirrorKey);
      // grip glyph at the mirror's midpoint so it reads as grabbable
      var mmc = centerOfSpan(m);
      var mgrip = el("g", { "class": "fsr-grip fsr-mirror-grip", "aria-hidden": "true" });
      mgrip.appendChild(el("circle", { cx: mmc.x, cy: mmc.y, r: 8, "class": "fsr-grip-dot" }));
      gFix.appendChild(mgrip);
      gFix.appendChild(labelOutside(m, "MIRROR", "fsr-mirror-text"));
    }
  }

  function doorHinge(d) {
    // hinge at the start end of the span
    if (d.side === TOP)    return { x: px(d.start), y: PAD };
    if (d.side === BOTTOM) return { x: px(d.start), y: PAD + ROWS * CELL };
    if (d.side === LEFT)   return { x: PAD, y: px(d.start) };
    return { x: PAD + COLS * CELL, y: px(d.start) };
  }
  function doorArc(d, hinge, inw) {
    var len = d.len * CELL;
    // leaf opens inward, 90 degrees. compute end point.
    var along; // direction along wall from hinge toward span end
    if (d.side === TOP || d.side === BOTTOM) along = { x: 1, y: 0 };
    else along = { x: 0, y: 1 };
    // leaf line: from hinge into the room (inward) by len
    var leafEnd = { x: hinge.x + inw.x * len, y: hinge.y + inw.y * len };
    var leaf = el("line", { x1: hinge.x, y1: hinge.y, x2: leafEnd.x, y2: leafEnd.y, "class": "fsr-door-leaf" });
    // sweep arc from open leaf end to the far jamb along the wall
    var jamb = { x: hinge.x + along.x * len, y: hinge.y + along.y * len };
    var sweep = el("path", {
      d: "M " + leafEnd.x + " " + leafEnd.y + " A " + len + " " + len + " 0 0 " +
         (arcSweepFlag(d) ) + " " + jamb.x + " " + jamb.y,
      "class": "fsr-door-arc"
    });
    return { leaf: leaf, sweep: sweep };
  }
  function arcSweepFlag(d) {
    // choose sweep direction so the arc bulges into the room
    if (d.side === TOP) return 1;
    if (d.side === BOTTOM) return 0;
    if (d.side === LEFT) return 0;
    return 1;
  }

  function text(x, y, str, cls) {
    var t = el("text", { x: x, y: y, "class": cls, "text-anchor": "middle", "dominant-baseline": "middle" });
    t.textContent = str;
    return t;
  }
  function labelOutside(f, str, cls) {
    var c = centerOfSpan(f);
    var off = 15;
    var x = c.x, y = c.y;
    if (f.side === TOP) y = PAD - off;
    else if (f.side === BOTTOM) y = PAD + ROWS * CELL + off;
    else if (f.side === LEFT) { x = PAD - off; }
    else { x = PAD + COLS * CELL + off; }
    var t = text(x, y, str, cls);
    if (f.side === LEFT) { t.setAttribute("text-anchor", "end"); }
    if (f.side === RIGHT) { t.setAttribute("text-anchor", "start"); }
    return t;
  }

  function drawSight() {
    gSight.innerHTML = "";
    var ev = evaluate(state);
    var bc = bedCenterPx(state.bed);
    var dc = centerOfSpan(state.doorF);
    var line = el("line", { x1: bc.x, y1: bc.y, x2: dc.x, y2: dc.y });
    line.setAttribute("class", "fsr-sight " + (ev.see.ok ? "is-clear" : "is-blocked"));
    gSight.appendChild(line);
    // small eye marker at the head, indicating gaze toward foot
    // (kept minimal to avoid clutter)
  }

  /* ============================================================
     THE BED — premium top-down render
     A heavier headboard with a lit edge + tufting, a linen mattress
     with a turned-down duvet fold, two soft pillows, a soft cast
     shadow, head/foot legible. Everything scales with the footprint
     so it reads cleanly small and at every orientation.
     ============================================================ */
  function drawBed() {
    gBed.innerHTML = "";
    var fp = bedFootprint(state.bed);
    var x = px(fp.col), y = px(fp.row), w = fp.w * CELL, h = fp.h * CELL;
    var orient = state.bed.orient;
    var horiz = (orient === LEFT || orient === RIGHT);

    // soft cast shadow, offset toward lower-right for depth
    gBed.appendChild(el("rect", { x: x + 4, y: y + 5, width: w - 4, height: h - 4, rx: 10, "class": "fsr-bed-shadow" }));

    // walnut frame
    gBed.appendChild(el("rect", { x: x + 2, y: y + 2, width: w - 4, height: h - 4, rx: 9, "class": "fsr-bed-frame" }));
    // linen mattress inset within the frame
    var mIn = 5;
    gBed.appendChild(el("rect", { x: x + mIn, y: y + mIn, width: w - mIn * 2, height: h - mIn * 2, rx: 6, "class": "fsr-bed-mattress" }));

    var hr = headRect(state.bed);
    var hx = px(hr.col), hy = px(hr.row), hw = hr.w * CELL, hh = hr.h * CELL;

    // ----- headboard: clearly heavier, warm oak, lit top edge + tufting -----
    var head = el("rect", { x: hx + 2, y: hy + 2, width: hw - 4, height: hh - 4, rx: 6, "class": "fsr-bed-head" });
    gBed.appendChild(head);
    // lit edge along the outer face of the headboard (the side against the wall)
    if (orient === TOP)    gBed.appendChild(el("rect", { x: hx + 4, y: hy + 3, width: hw - 8, height: 3, rx: 1.5, "class": "fsr-bed-head-hi" }));
    if (orient === BOTTOM) gBed.appendChild(el("rect", { x: hx + 4, y: hy + hh - 6, width: hw - 8, height: 3, rx: 1.5, "class": "fsr-bed-head-hi" }));
    if (orient === LEFT)   gBed.appendChild(el("rect", { x: hx + 3, y: hy + 4, width: 3, height: hh - 8, rx: 1.5, "class": "fsr-bed-head-hi" }));
    if (orient === RIGHT)  gBed.appendChild(el("rect", { x: hx + hw - 6, y: hy + 4, width: 3, height: hh - 8, rx: 1.5, "class": "fsr-bed-head-hi" }));
    // tufting lines dividing the headboard into panels
    if (horiz) {
      gBed.appendChild(el("line", { x1: hx + hw * 0.5, y1: hy + 5, x2: hx + hw * 0.5, y2: hy + hh - 5, "class": "fsr-bed-head-line" }));
    } else {
      gBed.appendChild(el("line", { x1: hx + 5, y1: hy + hh * 0.5, x2: hx + hw - 5, y2: hy + hh * 0.5, "class": "fsr-bed-head-line" }));
    }

    // ----- duvet: covers the mattress from just past the pillows to the foot,
    //       with a turned-down fold (a lighter band + a crisp fold line) -----
    drawDuvet(x, y, w, h, hr, orient, horiz);

    // ----- pillows near the head -----
    var pill = pillowSpecs(state.bed, hr, orient, horiz);
    pill.forEach(function (p) {
      gBed.appendChild(el("rect", p.rect));
      if (p.crease) gBed.appendChild(el("line", p.crease));
    });

    // ----- HEAD / FOOT labels -----
    var hc = { x: hx + hw / 2, y: hy + hh / 2 };
    gBed.appendChild(text(hc.x, hc.y, "HEAD", "fsr-bed-label fsr-bed-label-head"));
    var fi = footInfo(state.bed);
    gBed.appendChild(text(fi.x - fi.dir.x * 15, fi.y - fi.dir.y * 15, "FOOT", "fsr-bed-label fsr-bed-label-foot"));

    // hit target for pointer drag
    var hit = el("rect", { x: x, y: y, width: w, height: h, "class": "fsr-bed-hit" });
    gBed.appendChild(hit);
    hit.addEventListener("pointerdown", onPointerDown);

    // rotate affordance ON THE BED, appended last so it sits above the hit
    gBed.appendChild(rotateHandle(x, y, w, h));
  }

  // The duvet body + a turned-down fold near the head.
  function drawDuvet(x, y, w, h, hr, orient, horiz) {
    var pad = 7;                   // inset from mattress edges
    var pillowZone = CELL * 1.15;  // reserve the head end for pillows
    var foldDepth = CELL * 0.5;    // depth of the turned-down band
    var dx, dy, dw, dh, foldRect, foldLine, seam;

    if (orient === TOP) {
      dx = x + pad; dy = y + pillowZone; dw = w - pad * 2; dh = (y + h - pad) - dy;
      gBed.appendChild(el("rect", { x: dx, y: dy + foldDepth, width: dw, height: dh - foldDepth, rx: 5, "class": "fsr-bed-duvet" }));
      foldRect = { x: dx, y: dy, width: dw, height: foldDepth + 3, rx: 4, "class": "fsr-bed-fold" };
      foldLine = { x1: dx, y1: dy + foldDepth + 3, x2: dx + dw, y2: dy + foldDepth + 3, "class": "fsr-bed-fold-line" };
      seam = { x1: dx + dw / 2, y1: dy + foldDepth + 5, x2: dx + dw / 2, y2: dy + dh - 2, "class": "fsr-bed-seam" };
    } else if (orient === BOTTOM) {
      dx = x + pad; dy = y + pad; dw = w - pad * 2; dh = (y + h - pillowZone) - dy;
      gBed.appendChild(el("rect", { x: dx, y: dy, width: dw, height: dh - foldDepth, rx: 5, "class": "fsr-bed-duvet" }));
      foldRect = { x: dx, y: dy + dh - foldDepth - 3, width: dw, height: foldDepth + 3, rx: 4, "class": "fsr-bed-fold" };
      foldLine = { x1: dx, y1: dy + dh - foldDepth - 3, x2: dx + dw, y2: dy + dh - foldDepth - 3, "class": "fsr-bed-fold-line" };
      seam = { x1: dx + dw / 2, y1: dy + 2, x2: dx + dw / 2, y2: dy + dh - foldDepth - 5, "class": "fsr-bed-seam" };
    } else if (orient === LEFT) {
      dx = x + pillowZone; dy = y + pad; dw = (x + w - pad) - dx; dh = h - pad * 2;
      gBed.appendChild(el("rect", { x: dx + foldDepth, y: dy, width: dw - foldDepth, height: dh, rx: 5, "class": "fsr-bed-duvet" }));
      foldRect = { x: dx, y: dy, width: foldDepth + 3, height: dh, rx: 4, "class": "fsr-bed-fold" };
      foldLine = { x1: dx + foldDepth + 3, y1: dy, x2: dx + foldDepth + 3, y2: dy + dh, "class": "fsr-bed-fold-line" };
      seam = { x1: dx + foldDepth + 5, y1: dy + dh / 2, x2: dx + dw - 2, y2: dy + dh / 2, "class": "fsr-bed-seam" };
    } else { // RIGHT
      dx = x + pad; dy = y + pad; dw = (x + w - pillowZone) - dx; dh = h - pad * 2;
      gBed.appendChild(el("rect", { x: dx, y: dy, width: dw - foldDepth, height: dh, rx: 5, "class": "fsr-bed-duvet" }));
      foldRect = { x: dx + dw - foldDepth - 3, y: dy, width: foldDepth + 3, height: dh, rx: 4, "class": "fsr-bed-fold" };
      foldLine = { x1: dx + dw - foldDepth - 3, y1: dy, x2: dx + dw - foldDepth - 3, y2: dy + dh, "class": "fsr-bed-fold-line" };
      seam = { x1: dx + 2, y1: dy + dh / 2, x2: dx + dw - foldDepth - 5, y2: dy + dh / 2, "class": "fsr-bed-seam" };
    }
    gBed.appendChild(el("rect", foldRect));
    gBed.appendChild(el("line", foldLine));
    gBed.appendChild(el("line", seam));
  }

  // Two soft pillows against the head, each with a faint center crease.
  function pillowSpecs(b, hr, orient, horiz) {
    var out = [];
    var hx = px(hr.col), hy = px(hr.row), hw = hr.w * CELL, hh = hr.h * CELL;
    // pillows sit just off the headboard, on the mattress
    if (horiz) {
      // head strip is vertical (LEFT/RIGHT) — pillows stack vertically
      var pw = CELL * 0.72, ph = hh * 0.36;
      var pxo = (orient === LEFT) ? hx + hw + 2 : hx - pw - 2;
      var y1 = hy + hh * 0.12, y2 = hy + hh * 0.52;
      out.push(pill(pxo, y1, pw, ph, false));
      out.push(pill(pxo, y2, pw, ph, false));
    } else {
      // head strip is horizontal (TOP/BOTTOM) — pillows sit side by side
      var pw2 = hw * 0.40, ph2 = CELL * 0.66;
      var pyo = (orient === TOP) ? hy + hh + 2 : hy - ph2 - 2;
      var x1 = hx + hw * 0.08, x2 = hx + hw * 0.52;
      out.push(pill(x1, pyo, pw2, ph2, true));
      out.push(pill(x2, pyo, pw2, ph2, true));
    }
    return out;
  }
  function pill(px0, py0, pw, ph, horizPillow) {
    var rect = { x: px0, y: py0, width: pw, height: ph, rx: Math.min(pw, ph) * 0.42, "class": "fsr-bed-pillow" };
    var crease = horizPillow
      ? { x1: px0 + pw / 2, y1: py0 + ph * 0.22, x2: px0 + pw / 2, y2: py0 + ph * 0.78, "class": "fsr-bed-pillow-crease" }
      : { x1: px0 + pw * 0.22, y1: py0 + ph / 2, x2: px0 + pw * 0.78, y2: py0 + ph / 2, "class": "fsr-bed-pillow-crease" };
    return { rect: rect, crease: crease };
  }

  /* ---------- rotate handle: a clean CLOCKWISE circular arrow ----------
     A near-full circle (a standard rotate glyph) with one clear
     directional arrowhead at the top, hinting clockwise rotation.
     Revealed on bed hover/focus; click / Enter / Space / R rotate. */
  function rotateHandle(x, y, w, h) {
    var cx = x + w - 4, cy = y + 4;
    cx = Math.max(PAD + 12, Math.min(PAD + COLS * CELL - 12, cx));
    cy = Math.max(PAD + 12, Math.min(PAD + ROWS * CELL - 12, cy));
    var g = el("g", { "class": "fsr-rotate", tabindex: "0", role: "button", "aria-label": "Rotate the bed clockwise" });

    // generous transparent hit-circle
    g.appendChild(el("circle", { cx: cx, cy: cy, r: 15, "class": "fsr-rotate-hit" }));
    // dark disc backing
    g.appendChild(el("circle", { cx: cx, cy: cy, r: 9.5, "class": "fsr-rotate-bg" }));

    // circular arrow: an arc sweeping clockwise ~270deg, leaving a gap at the
    // top where the arrowhead sits.
    var r = 5.6;
    var startDeg = -70;    // just left of top
    var endDeg   = 200;    // three-quarters clockwise
    var a0 = startDeg * Math.PI / 180, a1 = endDeg * Math.PI / 180;
    var sx = cx + Math.cos(a0) * r, sy = cy + Math.sin(a0) * r;
    var ex = cx + Math.cos(a1) * r, ey = cy + Math.sin(a1) * r;
    // large-arc = 1 (we sweep > 180deg), sweep-flag = 1 (clockwise)
    g.appendChild(el("path", {
      d: "M " + sx.toFixed(2) + " " + sy.toFixed(2) +
         " A " + r + " " + r + " 0 1 1 " + ex.toFixed(2) + " " + ey.toFixed(2),
      "class": "fsr-rotate-arc"
    }));
    // arrowhead at the arc START (top), a clean triangle pointing along the
    // clockwise tangent (to the right), the unambiguous "rotate this way" cue.
    var tan = { x: -Math.sin(a0), y: Math.cos(a0) };   // clockwise tangent
    var norm = { x: Math.cos(a0), y: Math.sin(a0) };   // outward radial
    var tip = { x: sx + tan.x * 3.6, y: sy + tan.y * 3.6 };
    var bA  = { x: sx + norm.x * 2.6, y: sy + norm.y * 2.6 };
    var bB  = { x: sx - norm.x * 2.6, y: sy - norm.y * 2.6 };
    g.appendChild(el("path", {
      d: "M " + tip.x.toFixed(2) + " " + tip.y.toFixed(2) +
         " L " + bA.x.toFixed(2) + " " + bA.y.toFixed(2) +
         " L " + bB.x.toFixed(2) + " " + bB.y.toFixed(2) + " Z",
      "class": "fsr-rotate-arrow"
    }));

    var fire = function (e) { e.preventDefault(); e.stopPropagation(); rotate(); };
    g.addEventListener("click", fire);
    g.addEventListener("pointerdown", function (e) { e.stopPropagation(); });
    g.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault(); e.stopPropagation(); rotate();
        var again = gBed.querySelector(".fsr-rotate");
        if (again) try { again.focus(); } catch (err) {}
      }
    });
    return g;
  }

  /* ---------- compass ring (kua) ---------- */
  function drawCompass() {
    gCompass.innerHTML = "";
    if (!kuaState.on) return;
    var cx = W / 2, cy = H / 2;
    var R = Math.min(W, H) / 2 - 6;
    // ring
    gCompass.appendChild(el("circle", { cx: cx, cy: cy, r: R, "class": "fsr-ring" }));
    var favSet = {};
    if (kuaState.dirs) kuaState.dirs.forEach(function (d, i) { favSet[d] = i; });
    Object.keys(DIR_DEG).forEach(function (dir) {
      var deg = DIR_DEG[dir];
      var rad = (deg - 90) * Math.PI / 180;   // 0deg=N at top
      var tx = cx + Math.cos(rad) * (R - 14);
      var ty = cy + Math.sin(rad) * (R - 14);
      var fav = favSet.hasOwnProperty(dir);
      var t = text(tx, ty, dir, "fsr-compass-tick" + (fav ? " is-fav" : ""));
      gCompass.appendChild(t);
      if (fav) {
        // small dot on the ring
        var dx = cx + Math.cos(rad) * R, dy = cy + Math.sin(rad) * R;
        gCompass.appendChild(el("circle", { cx: dx, cy: dy, r: 3.2, "class": "fsr-compass-dot is-fav" }));
      }
    });
  }

  /* ============================================================
     UPDATE CYCLE
     ============================================================ */
  var lastSpoken = "";
  function update(announce) {
    var ev = evaluate(state);
    // score meter
    scoreEl.innerHTML = ev.score + "<small>/100</small>";
    barFill.style.width = ev.score + "%";
    barFill.className = ev.score >= 80 ? "is-high" : ev.score >= 50 ? "is-mid" : "is-low";

    // readout
    var fb = feedback(ev, state);
    readout.innerHTML = "";
    fb.forEach(function (line) {
      var li = document.createElement("li");
      li.className = "fsr-line fsr-line-" + line.tone;
      li.textContent = line.text;
      readout.appendChild(li);
    });

    // kua recommendation appended if on
    if (kuaState.on && kuaState.dirs) {
      appendKuaHint(ev);
    }

    drawSight();

    // puzzle solved?
    if (state.mode === "puzzle" && ev.score >= 90 && !ev.coffin && !ev.beam) {
      onSolved(ev);
    } else if (state.mode === "puzzle") {
      state.solved = false;
      share.hidden = true;
    }

    // live announcement (throttled to meaningful changes)
    if (announce) {
      var top = fb.length ? fb[0].text : "";
      var msg = "Score " + ev.score + " out of 100. " + top;
      if (msg !== lastSpoken) { lastSpoken = msg; }
    }
    return ev;
  }

  function appendKuaHint(ev) {
    var headDir = screenDirToCompass(headDirRaw(state.bed));
    var favIdx = kuaState.dirs.indexOf(headDir);
    var li = document.createElement("li");
    if (favIdx >= 0) {
      li.className = "fsr-line fsr-line-good";
      li.textContent = "Compass layer: the head points " + DIRNAME[headDir] + ", one of your favorable directions, " + FAV_LABEL[favIdx][0] + ". " + capitalize(FAV_LABEL[favIdx][1]) + ".";
    } else {
      li.className = "fsr-line fsr-line-tip";
      var tianyi = kuaState.dirs[1];
      li.textContent = "Compass layer: the head points " + DIRNAME[headDir] + ", which is not among your four favorable directions. For rest, tradition often points the head toward " + DIRNAME[tianyi] + ", your Tian Yi, 天醫. Remember schools differ on what facing means.";
    }
    readout.appendChild(li);
  }

  // Map a screen-space head direction to a compass label. We anchor
  // North to the TOP wall of the room as the tool's stated frame.
  function screenDirToCompass(v) {
    if (v.y < 0) return "N";
    if (v.y > 0) return "S";
    if (v.x < 0) return "W";
    return "E";
  }
  function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ============================================================
     SOLVED / SHARE
     ============================================================ */
  function onSolved(ev) {
    if (state.solved) return;      // already celebrated
    state.solved = true;
    share.hidden = false;
    var name = state.name || "this room";
    share.innerHTML =
      '<div class="fsr-share-card" role="status">' +
        '<p class="fsr-share-eyebrow">命位</p>' +
        '<p class="fsr-share-title">Commanding position: solved</p>' +
        '<p class="fsr-share-sub">You settled the bed in ' + escHtml(name) + ' and scored ' + ev.score + ' out of 100. The door is in view, the head has a wall, and nothing presses on your rest.</p>' +
        '<div class="fsr-share-actions">' +
          '<button type="button" class="fsr-btn fsr-btn-primary" id="fsr-share-btn">Share this</button>' +
          '<button type="button" class="fsr-btn" id="fsr-next-btn">Next room</button>' +
        '</div>' +
        '<p class="fsr-share-copied" id="fsr-share-copied" hidden>Copied to your clipboard.</p>' +
      '</div>';
    if (!REDUCED) share.querySelector(".fsr-share-card").classList.add("fsr-rise");
    share.querySelector("#fsr-share-btn").addEventListener("click", doShare);
    share.querySelector("#fsr-next-btn").addEventListener("click", function () { nextPuzzle(); });
    // move focus to the result for screen readers
    var card = share.querySelector(".fsr-share-card");
    card.setAttribute("tabindex", "-1");
    try { card.focus(); } catch (e) {}
  }

  function shareText() {
    return "I solved the feng shui commanding position puzzle on Zodi Animals: bed in view of the door, a wall behind the head, no beam or mirror pressing on sleep.";
  }
  function doShare() {
    var text = shareText();
    var url = (location && location.href) ? location.href : "";
    var payload = { title: "Commanding position: solved", text: text, url: url };
    if (navigator.share) {
      navigator.share(payload).catch(function () { copyShare(text + " " + url); });
    } else {
      copyShare(text + " " + url);
    }
  }
  function copyShare(str) {
    var done = function () {
      var c = share.querySelector("#fsr-share-copied");
      if (c) { c.hidden = false; setTimeout(function () { c.hidden = true; }, 2600); }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str).then(done, function () { legacyCopy(str, done); });
    } else { legacyCopy(str, done); }
  }
  function legacyCopy(str, done) {
    try {
      var ta = document.createElement("textarea");
      ta.value = str; ta.setAttribute("readonly", "");
      ta.style.position = "absolute"; ta.style.left = "-9999px";
      document.body.appendChild(ta); ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      done();
    } catch (e) {}
  }
  function escHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  /* ============================================================
     DRAG (pointer) + KEYBOARD
     ============================================================ */
  var drag = null;
  function svgPoint(evt) {
    var pt = svg.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    var ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    var p = pt.matrixTransform(ctm.inverse());
    return { x: p.x, y: p.y };
  }
  function onPointerDown(evt) {
    evt.preventDefault();
    svg.focus();
    var p = svgPoint(evt);
    var fp = bedFootprint(state.bed);
    drag = {
      dxCell: (p.x - PAD) / CELL - fp.col,
      dyCell: (p.y - PAD) / CELL - fp.row,
      id: evt.pointerId
    };
    if (evt.target.setPointerCapture) { try { evt.target.setPointerCapture(evt.pointerId); } catch (e) {} }
    gBed.classList.add("is-dragging");
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  }
  function onPointerMove(evt) {
    if (!drag) return;
    var p = svgPoint(evt);
    var colF = (p.x - PAD) / CELL - drag.dxCell;
    var rowF = (p.y - PAD) / CELL - drag.dyCell;
    state.bed.col = Math.round(colF);
    state.bed.row = Math.round(rowF);
    clampBed(state.bed);
    drawBed();
    drawSight();
    update(false);
  }
  function onPointerUp() {
    if (!drag) return;
    drag = null;
    gBed.classList.remove("is-dragging");
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    window.removeEventListener("pointercancel", onPointerUp);
    update(true);
  }

  /* ---------- beam drag (slide along its cross-axis) ---------- */
  var beamDrag = null;
  function moveBeamTo(colF, rowF) {
    if (!state.beam) return;
    var br = state.beam.rect;
    if (state.beam.orient === "h") {
      br.row = Math.max(0, Math.min(ROWS - 1, Math.round(rowF)));
    } else {
      br.col = Math.max(0, Math.min(COLS - 1, Math.round(colF)));
    }
  }
  function onBeamPointerDown(evt) {
    if (!state.beam) return;
    evt.preventDefault();
    evt.stopPropagation();
    beamDrag = { id: evt.pointerId };
    if (evt.target.setPointerCapture) { try { evt.target.setPointerCapture(evt.pointerId); } catch (e) {} }
    gFix.classList.add("is-dragging-fix");
    window.addEventListener("pointermove", onBeamPointerMove);
    window.addEventListener("pointerup", onBeamPointerUp);
    window.addEventListener("pointercancel", onBeamPointerUp);
  }
  function onBeamPointerMove(evt) {
    if (!beamDrag) return;
    var p = svgPoint(evt);
    moveBeamTo((p.x - PAD) / CELL - 0.5, (p.y - PAD) / CELL - 0.5);
    drawFixtures();
    drawSight();
    update(false);
  }
  function onBeamPointerUp() {
    if (!beamDrag) return;
    beamDrag = null;
    gFix.classList.remove("is-dragging-fix");
    window.removeEventListener("pointermove", onBeamPointerMove);
    window.removeEventListener("pointerup", onBeamPointerUp);
    window.removeEventListener("pointercancel", onBeamPointerUp);
    update(true);
  }
  function onBeamKey(evt) {
    if (!state.beam) return;
    var br = state.beam.rect, moved = false;
    var k = evt.key;
    if (state.beam.orient === "h") {
      if (k === "ArrowUp") { br.row = Math.max(0, br.row - 1); moved = true; }
      else if (k === "ArrowDown") { br.row = Math.min(ROWS - 1, br.row + 1); moved = true; }
    } else {
      if (k === "ArrowLeft") { br.col = Math.max(0, br.col - 1); moved = true; }
      else if (k === "ArrowRight") { br.col = Math.min(COLS - 1, br.col + 1); moved = true; }
    }
    if (moved) {
      evt.preventDefault();
      drawFixtures(); drawSight(); update(true);
      var again = gFix.querySelector(".fsr-beam");
      if (again) try { again.focus(); } catch (e) {}
    }
  }

  /* ---------- mirror drag (slide along its wall; snap to adjacent wall
     near a corner) ---------- */
  var mirrorDrag = null;
  function mirrorMaxStart(side) {
    return ((side === TOP || side === BOTTOM) ? COLS : ROWS) - state.mirror.len;
  }
  function clampMirror() {
    var m = state.mirror;
    m.start = Math.max(0, Math.min(mirrorMaxStart(m.side), m.start));
  }
  // Given a pointer in svg px, slide the mirror along its wall, and if the
  // pointer moves off the wall end toward a neighbouring wall, hop to it.
  function moveMirrorTo(p) {
    var m = state.mirror;
    var len = m.len;
    var horiz = (m.side === TOP || m.side === BOTTOM);
    // position along the current wall in cells (of the mirror's leading edge)
    var along = horiz ? (p.x - PAD) / CELL : (p.y - PAD) / CELL;
    // corner snap: if we run off an end AND the cross-axis says we've reached
    // the perpendicular wall, switch sides at the shared corner.
    var crossPx = horiz ? p.y : p.x;
    var nearStartWall = crossPx < PAD + CELL * 0.9;                 // near TOP (for L/R) or LEFT (for T/B)
    var nearEndWall = horiz ? (crossPx > PAD + ROWS * CELL - CELL * 0.9)
                            : (crossPx > PAD + COLS * CELL - CELL * 0.9);
    if (horiz) {
      if (along < 0.4 && nearStartWall)      { m.side = LEFT;  m.start = 0; clampMirror(); return; }
      if (along < 0.4 && nearEndWall)        { m.side = LEFT;  m.start = mirrorMaxStart(LEFT); clampMirror(); return; }
      if (along > COLS - 0.4 && nearStartWall){ m.side = RIGHT; m.start = 0; clampMirror(); return; }
      if (along > COLS - 0.4 && nearEndWall) { m.side = RIGHT; m.start = mirrorMaxStart(RIGHT); clampMirror(); return; }
    } else {
      if (along < 0.4 && nearStartWall)      { m.side = TOP;    m.start = 0; clampMirror(); return; }
      if (along < 0.4 && nearEndWall)        { m.side = BOTTOM; m.start = 0; clampMirror(); return; }
      if (along > ROWS - 0.4 && nearStartWall){ m.side = TOP;    m.start = mirrorMaxStart(TOP); clampMirror(); return; }
      if (along > ROWS - 0.4 && nearEndWall) { m.side = BOTTOM; m.start = mirrorMaxStart(BOTTOM); clampMirror(); return; }
    }
    // otherwise just slide: centre the mirror span on the pointer
    m.start = Math.round(along - len / 2);
    clampMirror();
  }
  function onMirrorPointerDown(evt) {
    if (!state.mirror) return;
    evt.preventDefault();
    evt.stopPropagation();
    mirrorDrag = { id: evt.pointerId };
    if (evt.target.setPointerCapture) { try { evt.target.setPointerCapture(evt.pointerId); } catch (e) {} }
    gFix.classList.add("is-dragging-fix");
    window.addEventListener("pointermove", onMirrorPointerMove);
    window.addEventListener("pointerup", onMirrorPointerUp);
    window.addEventListener("pointercancel", onMirrorPointerUp);
  }
  function onMirrorPointerMove(evt) {
    if (!mirrorDrag) return;
    moveMirrorTo(svgPoint(evt));
    drawFixtures();
    drawSight();
    update(false);
  }
  function onMirrorPointerUp() {
    if (!mirrorDrag) return;
    mirrorDrag = null;
    gFix.classList.remove("is-dragging-fix");
    window.removeEventListener("pointermove", onMirrorPointerMove);
    window.removeEventListener("pointerup", onMirrorPointerUp);
    window.removeEventListener("pointercancel", onMirrorPointerUp);
    update(true);
  }
  function onMirrorKey(evt) {
    if (!state.mirror) return;
    var m = state.mirror, moved = false;
    var horiz = (m.side === TOP || m.side === BOTTOM);
    var k = evt.key;
    if (horiz) {
      if (k === "ArrowLeft") { m.start -= 1; moved = true; }
      else if (k === "ArrowRight") { m.start += 1; moved = true; }
    } else {
      if (k === "ArrowUp") { m.start -= 1; moved = true; }
      else if (k === "ArrowDown") { m.start += 1; moved = true; }
    }
    if (moved) {
      evt.preventDefault();
      clampMirror();
      drawFixtures(); drawSight(); update(true);
      var again = gFix.querySelector(".fsr-mirror");
      if (again) try { again.focus(); } catch (e) {}
    }
  }

  // keyboard on the svg
  svg.addEventListener("keydown", function (evt) {
    var k = evt.key;
    var moved = false;
    if (k === "ArrowUp") { state.bed.row -= 1; moved = true; }
    else if (k === "ArrowDown") { state.bed.row += 1; moved = true; }
    else if (k === "ArrowLeft") { state.bed.col -= 1; moved = true; }
    else if (k === "ArrowRight") { state.bed.col += 1; moved = true; }
    else if (k === "r" || k === "R") { rotate(); evt.preventDefault(); return; }
    else if (k === "Enter" || k === " ") { update(true); evt.preventDefault(); return; }
    if (moved) {
      evt.preventDefault();
      clampBed(state.bed);
      drawBed();
      drawSight();
      update(true);
    }
  });

  function rotate() {
    var order = [TOP, RIGHT, BOTTOM, LEFT];
    var i = order.indexOf(state.bed.orient);
    state.bed.orient = order[(i + 1) % 4];
    clampBed(state.bed);
    draw();
    update(true);
  }

  /* ============================================================
     BEAM / MIRROR toggles (placed sensibly, then draggable-ish via re-toggle)
     ============================================================ */
  function toggleBeam() {
    if (state.beam) { state.beam = null; btnBeam.textContent = "Add beam"; btnBeam.classList.remove("is-on"); }
    else { state.beam = beamBand("h", Math.round(ROWS / 2)); btnBeam.textContent = "Remove beam"; btnBeam.classList.add("is-on"); }
    draw(); update(true);
  }
  function toggleMirror() {
    if (state.mirror) { state.mirror = null; btnMirror.textContent = "Add mirror"; btnMirror.classList.remove("is-on"); }
    else {
      // place mirror on the wall opposite the door by default (so it can face the bed = teachable)
      var opp = { top: BOTTOM, bottom: TOP, left: RIGHT, right: LEFT }[state.doorF.side];
      var len = 3;
      var maxStart = (opp === TOP || opp === BOTTOM) ? COLS - len : ROWS - len;
      state.mirror = { side: opp, start: Math.max(0, Math.round(maxStart / 2)), len: len };
      btnMirror.textContent = "Remove mirror"; btnMirror.classList.add("is-on");
    }
    draw(); update(true);
  }
  btnBeam.addEventListener("click", toggleBeam);
  btnMirror.addEventListener("click", toggleMirror);
  btnCheck.addEventListener("click", function () { update(true); svg.focus(); });
  btnNew.addEventListener("click", function () {
    if (state.mode === "puzzle") nextPuzzle();
    else { state = freshModelState(); syncToggleLabels(); draw(); update(true); }
  });

  /* ============================================================
     MODE + PUZZLE ROTATION
     ============================================================ */
  function switchMode(mode) {
    if (mode === "model") {
      state = freshModelState();
      tabModel.classList.add("is-active"); tabModel.setAttribute("aria-selected", "true");
      tabPuzzle.classList.remove("is-active"); tabPuzzle.setAttribute("aria-selected", "false");
      brief.hidden = true;
      btnBeam.hidden = false; btnMirror.hidden = false;
      btnNewLabel.textContent = "Reset room";
    } else {
      loadPuzzle(puzzleIndex);
      tabPuzzle.classList.add("is-active"); tabPuzzle.setAttribute("aria-selected", "true");
      tabModel.classList.remove("is-active"); tabModel.setAttribute("aria-selected", "false");
      brief.hidden = false;
      // in puzzle mode the beam/mirror are part of the puzzle, not player toggles
      btnBeam.hidden = true; btnMirror.hidden = true;
      btnNewLabel.textContent = "New room";
    }
    setModeNote(mode);
    syncToggleLabels();
    share.hidden = true;
    draw();
    update(true);
  }

  function loadPuzzle(i) {
    var L = LAYOUTS[((i % LAYOUTS.length) + LAYOUTS.length) % LAYOUTS.length];
    state = cloneLayout(L);
    brief.innerHTML =
      '<p class="fsr-brief-name">' + escHtml(L.name) + '</p>' +
      '<p class="fsr-brief-note">' + escHtml(L.note) + '</p>';
  }
  function nextPuzzle() {
    puzzleIndex = (puzzleIndex + 1) % LAYOUTS.length;
    loadPuzzle(puzzleIndex);
    share.hidden = true;
    draw();
    update(true);
    svg.focus();
  }

  function syncToggleLabels() {
    if (state.beam) { btnBeam.textContent = "Remove beam"; btnBeam.classList.add("is-on"); }
    else { btnBeam.textContent = "Add beam"; btnBeam.classList.remove("is-on"); }
    if (state.mirror) { btnMirror.textContent = "Remove mirror"; btnMirror.classList.add("is-on"); }
    else { btnMirror.textContent = "Add mirror"; btnMirror.classList.remove("is-on"); }
  }

  /* ============================================================
     KUA form wiring
     ============================================================ */
  var kuaForm = kuaPanel.querySelector("#fsr-kua-form");
  var kuaOut = kuaPanel.querySelector("#fsr-kua-out");
  kuaForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var date = kuaPanel.querySelector("#fsr-kua-date").value;
    var sexEl = kuaPanel.querySelector('input[name="fsr-kua-sex"]:checked');
    var sex = sexEl ? sexEl.value : "male";
    var res = kuaFrom(date, sex);
    if (!res) {
      kuaOut.innerHTML = '<p class="pf-note">Enter a full date of birth to find your Kua number.</p>';
      kuaState.on = false; drawCompass(); return;
    }
    kuaState.on = true;
    kuaState.kua = res.kua;
    kuaState.effYear = res.effYear;
    kuaState.dirs = FAV[res.kua].slice();
    var group = EAST[res.kua] ? "East group, 東四命" : "West group, 西四命";
    var rows = kuaState.dirs.map(function (dir, i) {
      return '<li><strong>' + DIRNAME[dir] + ' (' + dir + ').</strong> ' + FAV_LABEL[i][0] + ', ' + FAV_LABEL[i][1] + '.</li>';
    }).join("");
    kuaOut.innerHTML =
      '<p class="fsr-kua-num">Kua ' + res.kua + ' &middot; ' + group + '</p>' +
      '<ul class="fsr-kua-list">' + rows + '</ul>' +
      '<p class="pf-note">The compass ring now marks your four favorable directions around the room, with North fixed to the top wall. For rest, tradition often points the head toward ' + DIRNAME[kuaState.dirs[1]] + ' (Tian Yi, 天醫). The solar year begins at 立春, so a birthday before early February counts as ' + res.effYear + '. One school among several, for reflection.</p>';
    draw();
    update(true);
  });

  /* ---------- boot ---------- */
  switchMode("model");   // start in the free model
})();
