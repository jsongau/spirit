/* ============================================================
   THE PRIMAL ORACLE — learn-page interactive widgets (Phase 7)
   ------------------------------------------------------------
   Two small, native-first learning widgets that REUSE the shared
   engine. They never reimplement the 144 mapping: every crossing
   is computed by ENGINE.fromSignAnimal + ENGINE.essence, using the
   orders and grid published on window.ORACLE.

     1. "Cross two skies"  (mount id: cross-skies-widget)
        Two <select>s (a Western sign + a Chinese year animal).
        On change it reveals the resulting Primal Animal: name,
        its sigil, a one-line teaser, and a link to /animals/<slug>/.

     2. "Spin the wheel"   (mount id: spin-wheel-widget)
        A real <button> that picks a random crossing and reveals
        the same result card, announced to an aria-live region.

   Progressive enhancement: every mount already carries a static,
   meaningful no-JS fallback in the HTML. This script only runs when
   ENGINE + ORACLE + the mount are present; otherwise it no-ops and
   the static fallback stands. Motion lives in CSS behind a
   prefers-reduced-motion gate, so nothing here forces animation.
   ============================================================ */

(function () {
  "use strict";

  // ---- Defensive guards: no-op cleanly if the engine or data is absent.
  var ENGINE = window.ENGINE;
  var ORACLE = window.ORACLE;
  if (!ENGINE || !ORACLE) return;
  if (typeof ENGINE.fromSignAnimal !== "function") return;

  var WEST = ORACLE.WEST_ORDER;
  var EAST = ORACLE.CHINESE_ORDER;
  if (!Array.isArray(WEST) || !Array.isArray(EAST) || !WEST.length || !EAST.length) return;

  // Slug helper, identical to app.js / card.js so links resolve to the
  // real /animals/<slug>/ pages the build emits.
  function slug(s) {
    return String(s)
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/['\u2019]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function teaser(sign, animal) {
    var c = ENGINE.fromSignAnimal(sign, animal);
    var line = "";
    try { line = ENGINE.essence(sign, animal, c.primal); } catch (e) { line = ""; }
    return { primal: c.primal, essence: line, slug: slug(c.primal) };
  }

  // ---- Build the shared result card body for a given sign + animal.
  // Writes into the widget's [data-lw-result] region. Returns the primal name.
  function paintResult(region, sign, animal) {
    if (!region) return "";
    var t = teaser(sign, animal);
    var href = "/animals/" + t.slug + "/";
    var sigil = "/img/sigils/" + t.slug + ".svg";

    // Rebuild the card. Text nodes are set via textContent to avoid any
    // markup injection from the (already trusted) data.
    region.innerHTML = "";

    var card = document.createElement("a");
    card.className = "lw-card";
    card.href = href;
    card.setAttribute("data-lw-card", "");

    var fig = document.createElement("span");
    fig.className = "lw-sigil";
    var img = document.createElement("img");
    img.src = sigil;
    img.alt = "The sigil of the " + t.primal;
    img.width = 96; img.height = 96;
    img.loading = "lazy"; img.decoding = "async";
    fig.appendChild(img);

    var body = document.createElement("span");
    body.className = "lw-card-body";

    var cross = document.createElement("span");
    cross.className = "lw-cross";
    var s1 = document.createElement("b"); s1.textContent = sign;
    var plus = document.createElement("i"); plus.className = "lw-plus"; plus.textContent = "and";
    var s2 = document.createElement("b"); s2.textContent = animal;
    cross.appendChild(s1); cross.appendChild(plus); cross.appendChild(s2);

    var name = document.createElement("span");
    name.className = "lw-name";
    name.textContent = t.primal;

    var ess = document.createElement("span");
    ess.className = "lw-essence";
    ess.textContent = t.essence;

    var cta = document.createElement("span");
    cta.className = "lw-cta";
    cta.textContent = "Read the " + t.primal;

    body.appendChild(cross);
    body.appendChild(name);
    if (t.essence) body.appendChild(ess);
    body.appendChild(cta);

    card.appendChild(fig);
    card.appendChild(body);
    region.appendChild(card);

    return t.primal;
  }

  // ---- Populate a <select> with an options list, preserving the label.
  function fillSelect(sel, list) {
    if (!sel) return;
    sel.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
      var o = document.createElement("option");
      o.value = list[i];
      o.textContent = list[i];
      sel.appendChild(o);
    }
  }

  // ============================================================
  // 1. Cross two skies
  // ============================================================
  function mountCrossSkies() {
    var root = document.getElementById("cross-skies-widget");
    if (!root) return;

    var signSel = root.querySelector("[data-lw-sign]");
    var animalSel = root.querySelector("[data-lw-animal]");
    var region = root.querySelector("[data-lw-result]");
    if (!signSel || !animalSel || !region) return;

    fillSelect(signSel, WEST);
    fillSelect(animalSel, EAST);

    function update() {
      paintResult(region, signSel.value, animalSel.value);
    }
    signSel.addEventListener("change", update);
    animalSel.addEventListener("change", update);

    // Reveal is enhancement: replace the static fallback with a live card.
    signSel.value = WEST[3] || WEST[0];      // Cancer, a friendly default
    animalSel.value = EAST[5] || EAST[0];     // Snake, gives the Nautilus
    root.setAttribute("data-lw-ready", "");
    update();
  }

  // ============================================================
  // 2. Spin the wheel
  // ============================================================
  function mountSpinWheel() {
    var root = document.getElementById("spin-wheel-widget");
    if (!root) return;

    var btn = root.querySelector("[data-lw-spin]");
    var region = root.querySelector("[data-lw-result]");
    var live = root.querySelector("[data-lw-live]");
    if (!btn || !region) return;

    function pick() {
      var sign = WEST[Math.floor(Math.random() * WEST.length)];
      var animal = EAST[Math.floor(Math.random() * EAST.length)];
      var primal = paintResult(region, sign, animal);
      root.setAttribute("data-lw-ready", "");
      if (live && primal) {
        live.textContent = sign + " crossed with " + animal + " is the " + primal + ".";
      }
    }

    btn.addEventListener("click", pick);
    // Do not auto-spin on load: keep the static fallback visible until the
    // user chooses to discover, so there is no surprise motion or CLS.
  }

  function init() {
    mountCrossSkies();
    mountSpinWheel();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
