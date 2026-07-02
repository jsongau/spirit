/* ============================================================
   THE PRIMAL ORACLE — menagerie v2
   Adopts the 144 server-rendered .beast anchors and layers on:
   filters (sign / year / search), sort, grid & list views,
   compare mode with a quick side-by-side panel, the starfield,
   and the cross-page view-transition sigil stamp.

   Progressive by contract: without this file the page is still
   a complete gallery of 144 real <a> links. Nothing here turns
   a card into a button; compare mode only preventDefault()s on
   plain primary clicks while it is active.
   ============================================================ */
(function () {
  "use strict";
  if (typeof ORACLE === "undefined") return;
  var O = ORACLE;
  var $ = function (s) { return document.querySelector(s); };
  var VIEW_KEY = "zn_menagerie_view";

  /* ---------- simplified starfield (carried over from v1) ---------- */
  (function runStars() {
    var cv = $("#sky"); if (!cv) return;
    var ctx = cv.getContext("2d");
    function size() { cv.width = innerWidth; cv.height = Math.max(innerHeight, document.body.scrollHeight); }
    size(); addEventListener("resize", size);
    var N = Math.min(160, Math.floor(innerWidth / 9));
    var stars = [];
    for (var i = 0; i < N; i++) {
      stars.push({ x: Math.random() * cv.width, y: Math.random() * cv.height,
        r: Math.random() * 1.4 + 0.2, a: Math.random(), s: Math.random() * 0.02 + 0.004 });
    }
    (function frame() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (var j = 0; j < stars.length; j++) {
        var st = stars[j];
        st.a += st.s; var al = 0.35 + Math.abs(Math.sin(st.a)) * 0.55;
        ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 7);
        ctx.fillStyle = "rgba(245,236,210," + al + ")"; ctx.fill();
      }
      requestAnimationFrame(frame);
    })();
  })();

  var grid = $("#grid");
  if (!grid) return;

  /* ---------- shared helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function slugify(name) { return name.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
  function briefFor(sign, animal) { return sign + " " + O.WEST[sign].element.toLowerCase() + " meets the " + animal + "’s instinct to " + O.EAST[animal].instinct + "."; }

  /* ---------- adopt the server-rendered cards (build only if absent) ---------- */
  function buildCards() {
    var frag = document.createDocumentFragment();
    O.WEST_ORDER.forEach(function (sign) {
      O.CHINESE_ORDER.forEach(function (animal, ci) {
        var name = O.GRID[sign][ci], slug = slugify(name);
        var a = document.createElement("a");
        a.className = "beast";
        a.href = "/animals/" + slug + "/";
        a.dataset.slug = slug; a.dataset.sign = sign; a.dataset.animal = animal; a.dataset.name = name;
        a.innerHTML =
          '<div class="glyphRow"><span class="west">' + O.GLYPH_WEST[sign] + '</span><span class="dot"></span><span class="cn">' + O.CN_EAST[animal] + '</span>' +
          '<img class="beastSigil" src="/img/sigils/' + slug + '.svg" alt="" aria-hidden="true" loading="lazy" decoding="async" width="26" height="26"></div>' +
          '<h2 class="pname">' + esc(name) + '</h2>' +
          '<p class="brief">' + esc(briefFor(sign, animal)) + '</p>' +
          '<p class="pair"><span>' + esc(sign) + '</span> and the Year of the <span>' + esc(animal) + '</span></p>' +
          '<span class="open">Read<span class="openMore"> the ' + esc(name) + '</span><span class="openArr" aria-hidden="true"> →</span></span>';
        frag.appendChild(a);
      });
    });
    grid.appendChild(frag);
  }

  var cards = Array.prototype.slice.call(grid.querySelectorAll("a.beast"));
  if (!cards.length) { buildCards(); cards = Array.prototype.slice.call(grid.querySelectorAll("a.beast")); }

  var cells = cards.map(function (el, i) {
    var name = el.dataset.name || (el.querySelector(".pname") || { textContent: "" }).textContent;
    return {
      el: el, name: name,
      sign: el.dataset.sign || "", animal: el.dataset.animal || "",
      slug: el.dataset.slug || slugify(name),
      hay: name.toLowerCase(),
      wheel: i,
      si: O.WEST_ORDER.indexOf(el.dataset.sign),
      ai: O.CHINESE_ORDER.indexOf(el.dataset.animal)
    };
  });
  function byEl(el) { for (var i = 0; i < cells.length; i++) if (cells[i].el === el) return cells[i]; return null; }

  /* ---------- cross-page view transition: stamp the clicked card ----------
     The animal page's hero sigil carries view-transition-name: sigil-<slug>.
     Stamp only the clicked card's sigil so names stay unique per render.
     Pure enhancement; modified and middle clicks are left untouched. */
  var vtOK = ("startViewTransition" in document);
  function stamp(card) {
    if (!vtOK || !card) return;
    var slug = card.dataset && card.dataset.slug; if (!slug) return;
    var mark = card.querySelector(".beastSigil") || card;
    mark.style.viewTransitionName = "sigil-" + slug;
  }
  addEventListener("pageshow", function () {
    var marked = grid.querySelector('.beastSigil[style*="view-transition-name"]');
    if (marked) marked.style.viewTransitionName = "";
  });

  /* ---------- filter selects ---------- */
  var fSign = $("#fSign"), fAnimal = $("#fAnimal"), fSearch = $("#fSearch");
  function opt(value, text) { var o = document.createElement("option"); o.value = value; o.textContent = text; return o; }
  fSign.appendChild(opt("", "All Sun signs"));
  O.WEST_ORDER.forEach(function (s) { fSign.appendChild(opt(s, O.GLYPH_WEST[s] + "  " + s)); });
  fAnimal.appendChild(opt("", "All year animals"));
  O.CHINESE_ORDER.forEach(function (a) { fAnimal.appendChild(opt(a, O.CN_EAST[a] + "  " + a)); });

  /* ---------- filtering + live count ---------- */
  var countEl = $("#count"), emptyEl = $("#empty");
  var TOTAL = cells.length;
  function apply() {
    var sign = fSign.value, animal = fAnimal.value, q = fSearch.value.trim().toLowerCase();
    var shown = 0;
    for (var i = 0; i < cells.length; i++) {
      var c = cells[i];
      var ok = (!sign || c.sign === sign) && (!animal || c.animal === animal) && (!q || c.hay.indexOf(q) !== -1);
      c.el.hidden = !ok;
      if (ok) shown++;
    }
    countEl.innerHTML = "Showing <b>" + shown + "</b> of " + TOTAL;
    emptyEl.hidden = shown !== 0;
  }
  fSign.addEventListener("change", apply);
  fAnimal.addEventListener("change", apply);
  fSearch.addEventListener("input", apply);
  $("#clearBtn").addEventListener("click", function () {
    fSign.value = ""; fAnimal.value = ""; fSearch.value = "";
    apply();
  });

  /* ---------- toolbar: sort ---------- */
  var toolRow = $("#toolRow"), fSort = $("#fSort");
  function sortCards() {
    var mode = fSort.value;
    var arr = cells.slice().sort(function (a, b) {
      if (mode === "name") return a.name.localeCompare(b.name) || a.wheel - b.wheel;
      if (mode === "west") return (a.si - b.si) || a.name.localeCompare(b.name) || (a.wheel - b.wheel);
      if (mode === "east") return (a.ai - b.ai) || a.name.localeCompare(b.name) || (a.wheel - b.wheel);
      return a.wheel - b.wheel; /* wheel order: the served WEST x CHINESE walk */
    });
    var frag = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) frag.appendChild(arr[i].el);
    grid.appendChild(frag);
  }
  fSort.addEventListener("change", sortCards);

  /* ---------- toolbar: grid / list view, persisted ---------- */
  var viewGrid = $("#viewGrid"), viewList = $("#viewList");
  function setView(v, save) {
    var view = v === "list" ? "list" : "grid";
    grid.classList.toggle("isList", view === "list");
    viewGrid.setAttribute("aria-pressed", String(view === "grid"));
    viewList.setAttribute("aria-pressed", String(view === "list"));
    if (save) { try { localStorage.setItem(VIEW_KEY, view); } catch (e) {} }
  }
  viewGrid.addEventListener("click", function () { setView("grid", true); });
  viewList.addEventListener("click", function () { setView("list", true); });
  var savedView = null;
  try { savedView = localStorage.getItem(VIEW_KEY); } catch (e) {}
  setView(savedView === "list" ? "list" : "grid", false);

  /* ---------- compare mode ---------- */
  var cmpToggle = $("#cmpToggle"), cmpBar = $("#cmpBar"), cmpBarText = $("#cmpBarText");
  var cmpGo = $("#cmpGo"), cmpExit = $("#cmpExit");
  var cmpPanel = $("#cmpPanel"), cmpCards = $("#cmpCards"), cmpLink = $("#cmpLink"), cmpClose = $("#cmpClose");
  var cmpOn = false, picks = [];

  function updateBar() {
    var n = picks.length;
    cmpBarText.hidden = n === 2;
    cmpGo.hidden = n !== 2;
    if (n === 0) cmpBarText.textContent = "Pick two animals to compare.";
    else if (n === 1) cmpBarText.textContent = picks[0].name + " picked. Pick one more.";
    else cmpGo.textContent = "Compare " + picks[0].name + " vs " + picks[1].name;
  }
  function setSel(cell, on) { cell.el.classList.toggle("isSel", on); }
  function clearPicks() { for (var i = 0; i < picks.length; i++) setSel(picks[i], false); picks = []; }
  function pick(cell) {
    if (!cell) return;
    var at = picks.indexOf(cell);
    if (at !== -1) { setSel(cell, false); picks.splice(at, 1); }
    else {
      if (picks.length === 2) setSel(picks.shift(), false); /* replace the older pick */
      picks.push(cell); setSel(cell, true);
    }
    if (!cmpPanel.hidden) cmpPanel.hidden = true;
    updateBar();
  }
  function enterCompare() {
    cmpOn = true;
    grid.classList.add("cmpOn");
    cmpToggle.setAttribute("aria-pressed", "true");
    cmpToggle.textContent = "Comparing — exit";
    cmpBar.hidden = false;
    updateBar();
  }
  function exitCompare(refocus) {
    cmpOn = false;
    clearPicks();
    grid.classList.remove("cmpOn");
    cmpToggle.setAttribute("aria-pressed", "false");
    cmpToggle.textContent = "Pick two to compare";
    cmpBar.hidden = true;
    cmpPanel.hidden = true;
    if (refocus) cmpToggle.focus();
  }
  cmpToggle.addEventListener("click", function () { cmpOn ? exitCompare(false) : enterCompare(); });
  cmpExit.addEventListener("click", function () { exitCompare(true); });

  function miniFor(cell) {
    var west = O.WEST[cell.sign] || {}, east = O.EAST[cell.animal] || {};
    return '<article class="cmpMini">' +
      '<p class="cmpMiniGlyphs" aria-hidden="true">' + (O.GLYPH_WEST[cell.sign] || "") + ' · ' + (O.CN_EAST[cell.animal] || "") + '</p>' +
      '<h3 class="cmpMiniName">' + esc(cell.name) + '</h3>' +
      '<dl class="cmpRows">' +
      '<div><dt>Sign</dt><dd>' + esc(cell.sign) + '</dd></div>' +
      '<div><dt>Year</dt><dd>' + esc(cell.animal) + '</dd></div>' +
      '<div><dt>Element</dt><dd>' + esc((west.element || "") + " · " + (east.polarity || "")) + '</dd></div>' +
      '</dl></article>';
  }
  cmpGo.addEventListener("click", function () {
    if (picks.length !== 2) return;
    cmpCards.innerHTML = miniFor(picks[0]) + miniFor(picks[1]);
    /* match.html reads birth dates only, so the outbound link seeds the
       challenge page with the first pick via its ?with=<slug> param. */
    cmpLink.href = "/vs.html?with=" + encodeURIComponent(picks[0].slug);
    cmpLink.textContent = "Open the full challenge with " + picks[0].name;
    cmpPanel.hidden = false;
    cmpPanel.focus();
  });
  cmpClose.addEventListener("click", function () { cmpPanel.hidden = true; cmpGo.focus(); });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!cmpPanel.hidden) { cmpPanel.hidden = true; cmpGo.focus(); return; }
    if (cmpOn) exitCompare(true);
  });

  /* ---------- one click handler: compare intercept, else VT stamp ---------- */
  grid.addEventListener("click", function (e) {
    var card = e.target.closest ? e.target.closest("a.beast") : null;
    if (!card || card.hidden) return;
    /* Respect new-tab / new-window / download intents in every mode. */
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (cmpOn) { e.preventDefault(); pick(byEl(card)); return; }
    if (e.defaultPrevented) return;
    stamp(card);
  });

  /* ---------- wake the JS-only toolbar, first count ---------- */
  toolRow.hidden = false;
  apply();
})();
