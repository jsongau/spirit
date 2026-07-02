/* ============================================================
   nav.js  —  Zodianimal.com mega-nav HYDRATOR (Phase 3)
   One include per page: <script src="/js/nav.js" defer></script>
   ------------------------------------------------------------
   Everything routes with JS OFF: the panels are pre-rendered real
   anchors and the hidden nav.pn-crawl mirror lists every URL. This
   script is pure progressive enhancement. It:

     - hydrates the seven pre-rendered .pn-panel drop sheets (open on
       click or hover-intent, one at a time, [hidden] toggled, .open
       added, aria-expanded synced),
     - closes on click-outside and Escape (Escape returns focus to
       the trigger),
     - runs a roving keyboard model inside the open panel: Up/Down
       between rows, Left/Right jump columns, Home/End first/last,
       Left/Right at a bar trigger move between triggers (doc 03 s6),
     - builds a mobile accordion drawer FROM the pre-rendered panels,
       with a focus trap, body-scroll lock, Escape + burger close,
       and focus returned to the burger.

   All motion is guarded behind prefers-reduced-motion. If the static
   bar is absent (legacy page) it degrades quietly and just loads the
   feature modules; it never rebuilds panels from data.
   ============================================================ */

window.PNAV = window.PNAV || { features: {} };

(function () {
  "use strict";
  const PNAV = window.PNAV;
  const doc = document;

  const CSS = ["/css/nav-core.css", "/css/nav-mega.css", "/css/nav-drawer.css"];
  const JS  = ["/js/nav-data.js", "/js/nav-search.js", "/js/nav-moon.js",
               "/js/nav-me.js", "/js/nav-progress.js", "/js/nav-a11y.js"];

  const reduceMotion = () =>
    window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function norm(s) {
    s = (s || "").toLowerCase().replace(/[#?].*$/, "");
    if (!s.startsWith("/")) s = "/" + s;
    if (s.endsWith("/")) s += "index.html";
    return s;
  }
  const here = norm(location.pathname);
  PNAV.here = here;
  PNAV.isActive = (href) => norm(href) === here;

  function loadCss(href) {
    return new Promise((res) => {
      if (doc.querySelector(`link[data-pn="${href}"]`)) return res();
      const l = doc.createElement("link");
      l.rel = "stylesheet"; l.href = href; l.setAttribute("data-pn", href);
      l.onload = () => res(); l.onerror = () => res();
      doc.head.appendChild(l);
    });
  }
  function loadJs(src) {
    return new Promise((res) => {
      if (doc.querySelector(`script[data-pn="${src}"]`)) return res();
      const s = doc.createElement("script");
      s.src = src; s.async = false; s.setAttribute("data-pn", src);
      s.onload = () => res(); s.onerror = () => res();
      doc.body.appendChild(s);
    });
  }

  /* =========================================================
     DESKTOP PANELS: hydrate the pre-rendered drop sheets.
     ========================================================= */
  function wirePanels(bar) {
    const navEl   = bar.querySelector(".pn-nav");
    if (!navEl) return { openGroup: () => {}, closeAll: () => {} };

    const triggers = () => Array.from(navEl.querySelectorAll(".pn-trigger"));
    const panelFor = (g) => bar.querySelector(`.pn-panel[data-group="${g}"]`)
                         || doc.querySelector(`.pn-panel[data-group="${g}"]`);
    const rowsIn   = (panel) => Array.from(panel.querySelectorAll(".pn-row"));

    let openIdx = -1;
    let closeTimer = null;

    function markTrigger(i, on) {
      const t = triggers().find((b) => +b.dataset.group === i);
      if (t) t.setAttribute("aria-expanded", on ? "true" : "false");
    }

    function closeAll(returnFocus) {
      if (openIdx === -1) return;
      const panel = panelFor(openIdx);
      const prev = openIdx;
      openIdx = -1;
      if (panel) {
        panel.classList.remove("open");
        panel.setAttribute("hidden", "");
      }
      markTrigger(prev, false);
      if (returnFocus) {
        const t = triggers().find((b) => +b.dataset.group === prev);
        if (t) t.focus();
      }
    }

    function openGroup(i, focusFirstRow) {
      clearTimeout(closeTimer);
      if (openIdx === i) {
        if (focusFirstRow) {
          const rows = rowsIn(panelFor(i));
          if (rows[0]) rows[0].focus();
        }
        return;
      }
      if (openIdx !== -1) closeAll(false);
      const panel = panelFor(i);
      if (!panel) return;
      openIdx = i;
      panel.removeAttribute("hidden");
      panel.classList.add("open");
      markTrigger(i, true);
      if (focusFirstRow) {
        const rows = rowsIn(panel);
        if (rows[0]) rows[0].focus();
      }
    }

    function softClose() {
      clearTimeout(closeTimer);
      closeTimer = setTimeout(() => closeAll(false), 160);
    }

    /* ---- pointer: hover-intent open, soft close on leave ---- */
    navEl.addEventListener("mouseover", (e) => {
      const t = e.target.closest(".pn-trigger");
      if (t) openGroup(+t.dataset.group, false);
      else if (e.target.closest(".pn-link")) softClose();
    });
    navEl.addEventListener("mouseleave", softClose);

    /* keep open while pointer is inside a panel */
    triggers().forEach((t) => {
      const panel = panelFor(+t.dataset.group);
      if (!panel) return;
      panel.addEventListener("mouseenter", () => clearTimeout(closeTimer));
      panel.addEventListener("mouseleave", softClose);
    });

    /* ---- click: toggle (works with keyboard Enter/Space too) ---- */
    navEl.addEventListener("click", (e) => {
      const t = e.target.closest(".pn-trigger");
      if (!t) return;
      e.preventDefault();
      const g = +t.dataset.group;
      if (openIdx === g) closeAll(true);
      else openGroup(g, false);
    });

    /* ---- outside click + Escape ---- */
    doc.addEventListener("click", (e) => {
      if (!bar.contains(e.target)) closeAll(false);
    });
    doc.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && openIdx !== -1) { e.preventDefault(); closeAll(true); }
    });

    /* ---- roving keyboard model, doc 03 section 6 ---- */
    navEl.addEventListener("keydown", (e) => {
      const t = e.target.closest(".pn-trigger");
      if (!t) return;
      const list = triggers();
      const idx  = list.indexOf(t);
      const g    = +t.dataset.group;
      switch (e.key) {
        case "ArrowDown":
        case "Enter":
        case " ":
          e.preventDefault();
          openGroup(g, true);           // open and dive to first row
          break;
        case "ArrowRight":
          e.preventDefault();
          (list[idx + 1] || list[0]).focus();
          break;
        case "ArrowLeft":
          e.preventDefault();
          (list[idx - 1] || list[list.length - 1]).focus();
          break;
        case "ArrowUp":
        case "Escape":
          closeAll(false);
          break;
      }
    });

    /* keyboard within an open panel: rows + columns */
    bar.addEventListener("keydown", (e) => {
      const row = e.target.closest(".pn-row");
      if (!row) return;
      const panel = row.closest(".pn-panel");
      if (!panel || !panel.classList.contains("open")) return;
      const g = +panel.dataset.group;
      const cols = Array.from(panel.querySelectorAll(".pn-col"));
      const rows = rowsIn(panel);
      const flatIdx = rows.indexOf(row);

      const focusRow = (r) => { if (r) r.focus(); };
      const colOf = (r) => cols.findIndex((c) => c.contains(r));
      const rowsOfCol = (ci) => (cols[ci] ? Array.from(cols[ci].querySelectorAll(".pn-row")) : rows);

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault(); focusRow(rows[Math.min(flatIdx + 1, rows.length - 1)]); break;
        case "ArrowUp":
          e.preventDefault();
          if (flatIdx <= 0) {
            const t = triggers().find((b) => +b.dataset.group === g);
            closeAll(false); if (t) t.focus();
          } else focusRow(rows[flatIdx - 1]);
          break;
        case "ArrowRight": {
          e.preventDefault();
          const ci = colOf(row);
          if (ci < 0 || cols.length < 2) break;
          const within = rowsOfCol(ci).indexOf(row);
          const next = rowsOfCol(Math.min(ci + 1, cols.length - 1));
          focusRow(next[Math.min(within, next.length - 1)] || next[0]);
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const ci = colOf(row);
          if (ci < 0 || cols.length < 2) break;
          const within = rowsOfCol(ci).indexOf(row);
          const prev = rowsOfCol(Math.max(ci - 1, 0));
          focusRow(prev[Math.min(within, prev.length - 1)] || prev[0]);
          break;
        }
        case "Home":
          e.preventDefault(); focusRow(rows[0]); break;
        case "End":
          e.preventDefault(); focusRow(rows[rows.length - 1]); break;
        case "Escape": {
          e.preventDefault();
          const t = triggers().find((b) => +b.dataset.group === g);
          closeAll(false); if (t) t.focus();
          break;
        }
      }
    });

    return { openGroup, closeAll };
  }

  /* =========================================================
     MOBILE DRAWER: accordion built from the pre-rendered panels.
     ========================================================= */
  function buildDrawer(bar) {
    const burger = bar.querySelector(".pn-burger");
    if (!burger) return { open: () => {}, close: () => {} };

    const panels = Array.from(bar.querySelectorAll(".pn-panel"));
    const brand  = bar.querySelector(".pn-brand");

    const drawer = doc.createElement("div");
    drawer.className = "pn-drawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-label", "Menu");

    const sheet = doc.createElement("div");
    sheet.className = "pn-drawer-sheet";
    drawer.appendChild(sheet);

    /* top: brand + close */
    const top = doc.createElement("div");
    top.className = "pn-drawer-top";
    const brandLink = doc.createElement("a");
    brandLink.className = "pn-drawer-brand";
    brandLink.href = "/index.html";
    brandLink.innerHTML = brand ? brand.innerHTML : "Zodi <b>Animal</b>";
    const closeBtn = doc.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "pn-drawer-close";
    closeBtn.textContent = "Close";
    top.append(brandLink, closeBtn);
    sheet.appendChild(top);

    /* tool chips strip: the bar's identity chip, moon chip, and
       awakening ring land here so the responsive collapse ladder
       (<1280px ring, <1100px identity, <900px whole bar) loses
       nothing. Rebuilt on every open so the clones always match the
       live bar state (styled by nav-core.css, .pn-drawer-chips). */
    const chipStrip = doc.createElement("div");
    chipStrip.className = "pn-drawer-chips";
    sheet.appendChild(chipStrip);

    function syncChips() {
      chipStrip.textContent = "";
      const id = bar.querySelector("[data-id-chip]");
      if (id && !id.hidden && id.firstChild) {
        const c = id.cloneNode(true);
        c.hidden = false;
        chipStrip.appendChild(c);
      }
      const mc = bar.querySelector("[data-moon-chip]");
      if (mc && !mc.hidden && mc.firstChild) {
        const a = doc.createElement("a");
        a.className = "pn-moon";
        a.href = "/moon.html";
        a.title = mc.title || "The Moon tonight";
        a.innerHTML = mc.innerHTML;
        chipStrip.appendChild(a);
      }
      const ring = bar.querySelector("[data-ring-slot]");
      if (ring && !ring.hidden && ring.firstChild) {
        const c = ring.cloneNode(true);
        c.hidden = false;
        chipStrip.appendChild(c);
      }
    }

    /* accordion: one group per pre-rendered panel */
    const acc = doc.createElement("div");
    acc.className = "pn-acc";
    sheet.appendChild(acc);

    // walk the bar nav in DOM order: .pn-item (panel trigger) or .pn-link
    // (single-destination group, rendered as a plain anchor by the build).
    const navEl = bar.querySelector(".pn-nav");
    const barKids = navEl ? Array.from(navEl.children) : [];

    barKids.forEach((kid) => {
      // single-destination group: a plain link becomes a plain accordion link
      const plainLink = kid.matches && kid.matches("a.pn-link") ? kid
                      : (kid.querySelector && kid.querySelector(":scope > a.pn-link"));
      if (plainLink && !kid.querySelector(".pn-trigger")) {
        const a = doc.createElement("a");
        a.className = "pn-acc-link";
        a.href = plainLink.getAttribute("href") || "#";
        a.textContent = (plainLink.textContent || "").trim();
        acc.appendChild(a);
        return;
      }

      const trig = kid.querySelector && kid.querySelector(".pn-trigger");
      if (!trig) return;
      const g = trig.dataset.group;
      const label = (trig.textContent || "").trim();
      const panel = panels.find((p) => p.dataset.group === g);
      if (!panel) {
        // trigger without a panel (shouldn't happen): render as a link if it has href
        const href = trig.getAttribute("data-href") || trig.getAttribute("href");
        if (href) {
          const a = doc.createElement("a");
          a.className = "pn-acc-link";
          a.href = href;
          a.textContent = label;
          acc.appendChild(a);
        }
        return;
      }
      const group = doc.createElement("div");
      group.className = "pn-acc-group";
      if (panel.dataset.accent) group.setAttribute("data-accent", panel.dataset.accent);

      const bodyId = "pn-acc-" + g;
      const head = doc.createElement("button");
      head.type = "button";
      head.className = "pn-acc-head";
      head.setAttribute("aria-expanded", "false");
      head.setAttribute("aria-controls", bodyId);
      head.innerHTML = `<span>${label}</span><span class="pn-acc-chev" aria-hidden="true"></span>`;

      const body = doc.createElement("div");
      body.className = "pn-acc-body";
      body.id = bodyId;

      const eyebrow = panel.querySelector(".pn-panel-eyebrow");
      if (eyebrow) {
        const p = doc.createElement("p");
        p.className = "pn-eyebrow-sub";
        p.textContent = eyebrow.textContent;
        body.appendChild(p);
      }
      // clone the real anchors so routing is identical to desktop
      panel.querySelectorAll(".pn-row").forEach((row) => {
        body.appendChild(row.cloneNode(true));
      });
      // the feature aside (Fire Horse / Today's horoscope) and the e-book
      // CTA carry real destinations too; clone them so the drawer routes
      // everywhere the desktop panel does (the today spans are filled by
      // initHoroscope, which runs across the whole document after this).
      const feature = panel.querySelector(".pn-feature");
      if (feature) body.appendChild(feature.cloneNode(true));
      const cta = panel.querySelector(".pn-panel-cta");
      if (cta) body.appendChild(cta.cloneNode(true));
      panel.querySelectorAll(".pn-chips").forEach((chips) => {
        body.appendChild(chips.cloneNode(true));
      });
      const foot = panel.querySelector(".pn-panel-foot");
      if (foot) body.appendChild(foot.cloneNode(true));

      head.addEventListener("click", () => {
        const open = group.classList.toggle("open");
        head.setAttribute("aria-expanded", open ? "true" : "false");
      });

      group.append(head, body);
      acc.appendChild(group);
    });

    doc.body.appendChild(drawer);

    /* ---- focus trap ---- */
    const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    function focusables() {
      return Array.from(sheet.querySelectorAll(FOCUSABLE))
        .filter((el) => el.offsetParent !== null || el === doc.activeElement);
    }
    let lastFocus = null;

    function open() {
      lastFocus = doc.activeElement;
      syncChips();
      drawer.classList.add("open");
      burger.setAttribute("aria-expanded", "true");
      doc.body.style.overflow = "hidden";
      const f = focusables();
      (f[0] || closeBtn).focus();
      doc.dispatchEvent(new CustomEvent("pn:drawer-open"));
    }
    function close(returnFocus) {
      drawer.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
      doc.body.style.overflow = "";
      if (returnFocus !== false) (lastFocus || burger).focus();
      doc.dispatchEvent(new CustomEvent("pn:drawer-close"));
    }

    burger.addEventListener("click", open);
    closeBtn.addEventListener("click", () => close());
    drawer.addEventListener("click", (e) => { if (e.target === drawer) close(); });

    drawer.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && doc.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    return { open, close, drawer };
  }

  /* =========================================================
     LIVE SUB-LABELS: the build bakes fresh values into every
     [data-dyn] sub (today's date, tonight's phase, year bands);
     recompute them here so a statically served page never goes
     stale. PNAV.DYN comes from nav-data.js (loaded before wire).
     ========================================================= */
  function refreshDyn() {
    const dyn = PNAV.DYN;
    if (!dyn) return;
    Array.from(doc.querySelectorAll(".pn-row-sub[data-dyn]")).forEach((el) => {
      try {
        const key = el.getAttribute("data-dyn") || "";
        if (key === "date-today" && dyn.todayLabel) el.textContent = dyn.todayLabel();
        else if (key === "moon-phase" && dyn.moonPhaseName) el.textContent = dyn.moonPhaseName();
        else if (key.indexOf("cn-years-") === 0 && dyn.yearBand) {
          const i = parseInt(key.slice(9), 10);
          if (i >= 0 && i < 12) el.textContent = dyn.yearBand(i);
        }
      } catch (e) {}
    });
  }

  /* =========================================================
     HOROSCOPE — date-aware. Compute today's Western sun sign from
     new Date(), light up its row in the horoscope panel, and fill
     the Today feature aside (eyebrow/sign/blurb). Ported from
     concept-1-astral-weld.html. Guarded: no-op if the panel or its
     fill targets are absent (belt and braces; the panel is in the
     bar on every page).
     ========================================================= */
  function initHoroscope() {
    // [sign, startMonth(1-12), startDay] — a date belongs to a sign from
    // its start until the day before the NEXT sign's start.
    var SIGNS = [
      ["capricorn",12,22],["aquarius",1,20],["pisces",2,19],["aries",3,21],
      ["taurus",4,20],["gemini",5,21],["cancer",6,21],["leo",7,23],
      ["virgo",8,23],["libra",9,23],["scorpio",10,23],["sagittarius",11,22]
    ];
    var NAMES = { aries:"Aries", taurus:"Taurus", gemini:"Gemini", cancer:"Cancer",
      leo:"Leo", virgo:"Virgo", libra:"Libra", scorpio:"Scorpio",
      sagittarius:"Sagittarius", capricorn:"Capricorn", aquarius:"Aquarius", pisces:"Pisces" };
    var BLURB = {
      aries:"Move first. The day yields to whoever commits.",
      taurus:"Hold your ground; comfort is a strategy today.",
      gemini:"Say the thing. Two ideas want to meet.",
      cancer:"Tend what's yours. The tide is with you.",
      leo:"Be seen. The room is already turning your way.",
      virgo:"Fix one small thing and the rest follows.",
      libra:"Choose. The scale tips the moment you lean.",
      scorpio:"Go deep. Surfaces bore you for a reason today.",
      sagittarius:"Aim far. The horizon is closer than it looks.",
      capricorn:"Climb. One steady step outpaces the clever ones.",
      aquarius:"Break the pattern. The odd idea is the right one.",
      pisces:"Follow the pull. Your instinct is reading the room."
    };
    function signForDate(d) {
      var m = d.getMonth() + 1, day = d.getDate();
      var current = "capricorn"; // default; covers Jan 1-19 and Dec 22-31
      for (var i = 0; i < SIGNS.length; i++) {
        var s = SIGNS[i][0], sm = SIGNS[i][1], sd = SIGNS[i][2];
        if (sm === 12) continue; // Capricorn's Dec-22 edge is the default
        if (m > sm || (m === sm && day >= sd)) current = s;
      }
      if (m === 12 && day >= 22) current = "capricorn";
      return current;
    }
    var WD = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var MO = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var now = new Date();
    var sign = signForDate(now);

    // light today's row wherever the horoscope list appears (desktop panel
    // + the mobile drawer clone), so the featured state survives the clone.
    Array.from(doc.querySelectorAll('.pn-row[data-sign="' + sign + '"]'))
      .forEach(function (row) { row.classList.add("is-featured"); });

    // fill every Today feature (again, panel + any clone)
    var fill = function (sel, text) {
      Array.from(doc.querySelectorAll(sel)).forEach(function (el) { el.textContent = text; });
    };
    fill("[data-hz-date]", "Today · " + WD[now.getDay()] + ", " + MO[now.getMonth()] + " " + now.getDate());
    fill("[data-hz-sign]", NAMES[sign] || "");
    fill("[data-hz-blurb]", BLURB[sign] || "");
  }

  /* =========================================================
     THE WELD BIND — toggle html.pn-bound past a small scroll, so
     the sub-bar lights its igniting brass seam and the join tightens
     (styles in nav-sub.css / nav-core.css). A throttled rAF scroll
     listener keeps it 60fps. A one-shot spark sweeps the seam once on
     each fresh bind (html.pn-sealing), suppressed under reduced motion.
     The spark element is injected here so the served HTML stays clean.
     ========================================================= */
  function initWeld() {
    var sub = doc.querySelector(".pn-sub");
    var root = doc.documentElement;
    var THRESHOLD = 24;
    var bound = false;
    var sealTimer = null;

    // inject the travelling spark once (decoration only; JS-driven)
    if (sub && !sub.querySelector(".pn-seam-spark")) {
      var spark = doc.createElement("span");
      spark.className = "pn-seam-spark";
      spark.setAttribute("aria-hidden", "true");
      sub.appendChild(spark);
    }
    // clear the one-shot seal class when its sweep ends (retrigger-safe)
    if (sub) {
      sub.addEventListener("animationend", function (e) {
        if (e.animationName === "pnSeamSpark") root.classList.remove("pn-sealing");
      });
    }

    function setBound(next) {
      if (next === bound) return;
      bound = next;
      root.classList.toggle("pn-bound", bound);
      if (bound && !reduceMotion()) {
        // fresh bind: sweep the seam once
        root.classList.remove("pn-sealing");
        // reflow so the animation restarts even on a rapid re-bind
        if (sub) { void sub.offsetWidth; }
        root.classList.add("pn-sealing");
        clearTimeout(sealTimer);
        sealTimer = setTimeout(function () { root.classList.remove("pn-sealing"); }, 900);
      } else if (!bound) {
        root.classList.remove("pn-sealing");
      }
    }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        setBound((window.pageYOffset || doc.documentElement.scrollTop || 0) > THRESHOLD);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial state (e.g. reloads mid-page)
  }

  /* =========================================================
     MOON CHIP + POPOVER (canvas bar). The build pre-renders a
     hidden chip + popover skeleton in .pn-tools; we fill both
     from PNAV.DYN.moonInfo() (nav-data.js, dependency-free) and
     un-hide the chip, so JS-off never shows a stale phase.
     ========================================================= */
  function initMoonChip(bar, panels) {
    const chip = bar.querySelector("[data-moon-chip]");
    const pop  = bar.querySelector("[data-moon-pop]");
    if (!chip || !pop || !PNAV.DYN || typeof PNAV.DYN.moonInfo !== "function") return;
    let m;
    try { m = PNAV.DYN.moonInfo(); } catch (e) { return; }
    if (!m) return;

    chip.textContent = "";
    const g = doc.createElement("span");
    g.className = "g"; g.setAttribute("aria-hidden", "true"); g.textContent = m.glyph;
    const v = doc.createElement("span");
    v.className = "v"; v.textContent = m.pct;
    chip.append(g, v);
    chip.title = m.name;
    chip.setAttribute("aria-label",
      "Moon phase tonight: " + m.name + ", " + m.pct + " illuminated");

    const set = (sel, text) => {
      const el = pop.querySelector(sel);
      if (el) el.textContent = text;
    };
    set(".pnm-glyph", m.glyph);
    set(".pnm-name", m.name);
    set(".pnm-pct", m.pct + " illuminated tonight");
    set(".pnm-meaning", m.meaning);
    set(".pnm-favors", "Favors " + m.favor);

    chip.hidden = false;

    function closePop(refocus) {
      if (pop.hidden) return;
      pop.hidden = true;
      chip.setAttribute("aria-expanded", "false");
      if (refocus) { try { chip.focus(); } catch (e) {} }
    }
    chip.addEventListener("click", () => {
      const open = !pop.hidden;
      if (open) { closePop(false); return; }
      if (panels && panels.closeAll) panels.closeAll(false);
      pop.hidden = false;
      chip.setAttribute("aria-expanded", "true");
    });
    doc.addEventListener("click", (e) => {
      if (pop.hidden) return;
      if (chip.contains(e.target) || pop.contains(e.target)) return;
      closePop(false);
    });
    doc.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closePop(true);
    });
  }

  /* =========================================================
     BAR HEIGHT KNOB — measure the real rendered .pn-bar and keep
     :root --pn-bar-h (declared in nav-sub.css with a CSS-derived
     fallback) in sync. Every sticky offset under the bar (pn-sub,
     the homepage .omv4-sub + rail, scroll-padding) reads this one
     custom property, so the two-line wordmark, font swaps, and
     responsive folds can never strand a stale hardcoded height.
     ========================================================= */
  function syncBarHeight(bar) {
    let raf = 0;
    const apply = () => {
      raf = 0;
      try {
        const h = bar.getBoundingClientRect().height;
        if (h > 0) doc.documentElement.style.setProperty("--pn-bar-h", h + "px");
      } catch (e) {}
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(apply); };
    apply();
    window.addEventListener("resize", queue);
    // web fonts change the wordmark's line box; re-measure when they land
    try { if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(queue); } catch (e) {}
  }

  /* =========================================================
     WIRE + FEATURE MODULES
     ========================================================= */
  function wire(bar) {
    doc.body.classList.add("pn-has-bar");
    syncBarHeight(bar);
    const panels = wirePanels(bar);
    const drawer = buildDrawer(bar);
    initMoonChip(bar, panels);
    refreshDyn();     // after the drawer clone so both copies update
    initHoroscope();  // after the clone too: light today's sign in both
    initWeld();       // scroll-bound seam ignite

    // Escape also closes the drawer if it happens to be open (belt + braces)
    doc.addEventListener("keydown", (e) => {
      if (e.key === "Escape") panels.closeAll(false);
    });

    const ctx = {
      bar,
      inner: bar.querySelector(".pn-inner"),
      nav: bar.querySelector(".pn-nav"),
      tools: bar.querySelector(".pn-tools"),
      burger: bar.querySelector(".pn-burger"),
      drawer: drawer.drawer,
      openDrawer: drawer.open,
      closeDrawer: drawer.close,
      openGroup: panels.openGroup,
      closeAll: panels.closeAll,
      here,
      reduceMotion: reduceMotion(),
      ENGINE: window.ENGINE,
    };
    PNAV.ctx = ctx;

    ["me", "moon", "progress", "search", "a11y"].forEach((name) => {
      const fn = PNAV.features && PNAV.features[name];
      if (typeof fn === "function") { try { fn(ctx); } catch (e) {} }
    });
  }

  async function boot() {
    const staticBar = doc.querySelector("header.pn-bar");
    await Promise.all(CSS.map(loadCss));
    for (const s of JS) { await loadJs(s); }
    if (!staticBar) return;      // no static bar: routing already works via crawl; nothing to hydrate
    wire(staticBar);
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
