/* ============================================================
   THE PRIMAL ORACLE — home.js  (Phase 4, homepage enhancements)
   Progressive enhancement only. The homepage is fully usable
   with JS off; this file wires the sticky identity rail, the
   identity share call, the Chinese-zodiac proverb rotation, and
   a light menagerie-preview enhancement.

   Reads the same storage the reveal writes:
     - "primal_oracle_v1" : { birth, recent:[{primal,slug}], ... }
     - "po_game"          : { seen:[{slug,name,at}], ... }
   Never writes birth data anywhere. Never sends birth data out.
   Every storage access is wrapped in try/catch with an in-memory
   fallback so it degrades to a session-only experience when
   localStorage is blocked (sandboxed preview iframes).

   Depends softly on window.ENGINE (engine.js) to recompute the
   animal from a stored birth date, but no-ops if ENGINE is absent.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- reduced motion ---------- */
  var REDUCE = false;
  try {
    REDUCE = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) { REDUCE = false; }

  /* ---------- tiny helpers ---------- */
  function $(sel, root) {
    try { return (root || document).querySelector(sel); }
    catch (e) { return null; }
  }
  function $all(sel, root) {
    try { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
    catch (e) { return []; }
  }
  function on(el, ev, fn) { if (el && el.addEventListener) el.addEventListener(ev, fn); }

  function slugify(s) {
    return String(s == null ? "" : s)
      .normalize ? String(s).normalize("NFD").replace(/[̀-ͯ]/g, "")
        .toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      : String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function escHTML(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Matches the server esc() in build/proverbs.mjs (only & < >), so the
  // client-rendered proverb card is byte-identical to the server markup.
  function escProverb(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---------- safe storage with in-memory fallback ---------- */
  var ORACLE_KEY = "primal_oracle_v1";
  var GAME_KEY = "po_game";
  var mem = {}; // in-memory fallback when storage is unavailable

  function readJSON(key) {
    try {
      var raw = window.localStorage.getItem(key);
      if (raw) return JSON.parse(raw) || {};
    } catch (e) {}
    return mem[key] || {};
  }

  /* ---------- resolve the visitor's animal ---------- */
  // Returns { primal, sign, animal, element, glyph, slug } or null.
  // Order of preference: recompute from stored birth date via ENGINE
  // (freshest), then the last recent animal, then the po_game seen list.
  function resolveAnimal() {
    var oracle = readJSON(ORACLE_KEY);

    // 1) recompute from birth date (ENGINE gives us sign/element/glyph too)
    if (oracle && typeof oracle.birth === "string" && oracle.birth &&
        window.ENGINE && typeof window.ENGINE.compute === "function") {
      try {
        var c = window.ENGINE.compute(oracle.birth);
        if (c && c.primal) {
          return {
            primal: c.primal, sign: c.sign, animal: c.animal,
            element: c.element, glyph: c.glyph, slug: slugify(c.primal)
          };
        }
      } catch (e) {}
    }

    // 2) last recent animal recorded by the reveal
    if (oracle && Array.isArray(oracle.recent) && oracle.recent.length) {
      var r = oracle.recent[0];
      if (r && r.primal) {
        var loc = null;
        if (window.ENGINE && typeof window.ENGINE.locate === "function") {
          try { loc = window.ENGINE.locate(r.primal); } catch (e) { loc = null; }
        }
        var glyph = "";
        try {
          if (loc && window.ORACLE && window.ORACLE.GLYPH_WEST) glyph = window.ORACLE.GLYPH_WEST[loc.sign] || "";
        } catch (e) {}
        return {
          primal: r.primal,
          sign: loc ? loc.sign : "",
          animal: loc ? loc.animal : "",
          element: "",
          glyph: glyph,
          slug: r.slug || slugify(r.primal)
        };
      }
    }

    // 3) most recent from the collection layer (name only)
    var game = readJSON(GAME_KEY);
    if (game && Array.isArray(game.seen) && game.seen.length) {
      var s = game.seen[0];
      if (s && (s.name || s.slug)) {
        return {
          primal: s.name || s.slug, sign: "", animal: "",
          element: "", glyph: "", slug: s.slug || slugify(s.name)
        };
      }
    }

    return null;
  }

  /* ============================================================
     1. IDENTITY RAIL
     ============================================================ */

  var railState = { animal: null };

  function pairingLine(a) {
    if (!a) return "";
    if (a.sign && a.animal) {
      return a.element ? (a.sign + " and the " + a.element + " " + a.animal)
                       : (a.sign + " and the " + a.animal);
    }
    return "";
  }

  // Inline the sigil so its CSS vars (--accent, --glow, --accent-soft)
  // resolve against page tokens. Falls back to <img> then glyph text.
  function paintSigil(slot, a) {
    if (!slot || !a) return;
    slot.setAttribute("data-slug", a.slug || "");
    // ensure the sigil's custom props have a home even if tokens are thin
    try {
      if (!slot.style.getPropertyValue("--accent")) slot.style.setProperty("--accent", "var(--brass, #d6c18c)");
      if (!slot.style.getPropertyValue("--accent-soft")) slot.style.setProperty("--accent-soft", "var(--brass-bright, #efe2b4)");
      if (!slot.style.getPropertyValue("--glow")) slot.style.setProperty("--glow", "var(--violet, #6b5cc4)");
    } catch (e) {}

    var url = "/img/sigils/" + encodeURIComponent(a.slug) + ".svg";

    // Prefer fetching and inlining so the vars cascade.
    var canFetch = typeof window.fetch === "function" && location.protocol.indexOf("http") === 0;
    if (canFetch) {
      window.fetch(url).then(function (res) {
        if (!res || !res.ok) throw new Error("sigil fetch failed");
        return res.text();
      }).then(function (svg) {
        if (svg && svg.indexOf("<svg") !== -1) {
          slot.innerHTML = svg;
          var el = slot.querySelector("svg");
          if (el) {
            el.setAttribute("aria-hidden", "true");
            el.removeAttribute("aria-labelledby");
            el.style.width = "100%";
            el.style.height = "100%";
          }
        } else {
          fallbackSigil(slot, a, url);
        }
      }).catch(function () {
        fallbackSigil(slot, a, url);
      });
    } else {
      fallbackSigil(slot, a, url);
    }
  }

  function fallbackSigil(slot, a, url) {
    // an <img> still shows the shape (strokes may fall back to currentColor
    // where the sigil author used it); if even that is unwanted, we keep the
    // glyph as a last resort so the slot is never empty.
    try {
      var img = document.createElement("img");
      img.src = url;
      img.alt = "";
      img.setAttribute("aria-hidden", "true");
      img.width = 96; img.height = 96;
      img.style.width = "100%"; img.style.height = "auto";
      img.onerror = function () {
        slot.textContent = (a && a.glyph) ? a.glyph : "";
      };
      slot.innerHTML = "";
      slot.appendChild(img);
    } catch (e) {
      slot.textContent = (a && a.glyph) ? a.glyph : "";
    }
  }

  function renderRail(a) {
    var rail = $("#identity-rail");
    var card = $("#identity-card");
    if (!rail && !card) return; // no rail on this page, no-op

    railState.animal = a || null;

    var nameEl = $("#identity-name");
    var sigil = $("#identity-sigil");
    var share = $("#identity-share");
    var host = card || rail;

    if (a && a.primal) {
      // ---- post-reveal (identity) state ----
      if (host) {
        host.setAttribute("data-state", "revealed");
        host.classList.add("is-revealed");
        host.classList.remove("is-invitation");
      }
      if (nameEl) {
        nameEl.innerHTML = 'You are the <span class="id-animal">' + escHTML(a.primal) + "</span>";
        var pair = pairingLine(a);
        if (pair) {
          var sub = nameEl.querySelector(".id-pairing") || document.createElement("span");
          sub.className = "id-pairing";
          sub.textContent = pair;
          if (!sub.parentNode) nameEl.appendChild(sub);
        }
      }
      if (sigil) paintSigil(sigil, a);
      if (share) {
        share.hidden = false;
        share.removeAttribute("aria-hidden");
        if (!share.getAttribute("data-share-wired")) wireShare(share);
      }
    } else {
      // ---- pre-reveal (invitation) state ----
      if (host) {
        host.setAttribute("data-state", "invitation");
        host.classList.add("is-invitation");
        host.classList.remove("is-revealed");
      }
      if (nameEl && !nameEl.getAttribute("data-server-copy")) {
        // only fill if Agent A left it empty; never overwrite server copy
        if (!nameEl.textContent.trim()) nameEl.textContent = "You are ...";
      }
      // Leave the share button as-is in invitation state (it may scroll to reader).
    }
  }

  /* ============================================================
     2. IDENTITY SHARE
     ============================================================ */

  function shareText(a) {
    if (!a || !a.primal) return "";
    var pair = pairingLine(a);
    var t = "I am the " + a.primal;
    if (pair) t += " (" + pair + ")";
    t += ". A Primal Animal is a meaning, not a prediction. Find yours at the Primal Oracle.";
    return t;
  }

  function shareURL(a) {
    // link to the public, crawlable animal page (no birth data, ever)
    var base = "";
    try { base = location.origin || ""; } catch (e) { base = ""; }
    var path = "/animals/" + (a && a.slug ? a.slug : "") + "/";
    return base ? (base + path) : path;
  }

  function toast(msg) {
    // reuse the collection layer toast if present, else a minimal inline notice
    try {
      if (window.GAME && typeof window.GAME.toast === "function") {
        window.GAME.toast(msg);
        return;
      }
    } catch (e) {}
    var live = $("#identity-share-status");
    if (!live) {
      live = document.createElement("span");
      live.id = "identity-share-status";
      live.setAttribute("role", "status");
      live.setAttribute("aria-live", "polite");
      live.style.position = "absolute";
      live.style.left = "-9999px";
      (document.body || document.documentElement).appendChild(live);
    }
    live.textContent = msg;
  }

  function wireShare(btn) {
    btn.setAttribute("data-share-wired", "1");
    on(btn, "click", function (e) {
      if (e && e.preventDefault) e.preventDefault();
      var a = railState.animal || resolveAnimal();
      if (!a || !a.primal) {
        // no animal yet: send them to the reader instead of sharing nothing
        var reader = $("#birthDate") || $("#birthForm");
        if (reader && reader.scrollIntoView) reader.scrollIntoView({ behavior: REDUCE ? "auto" : "smooth", block: "center" });
        if (reader && reader.focus) { try { reader.focus(); } catch (er) {} }
        return;
      }
      var text = shareText(a);
      var url = shareURL(a);

      // Web Share API where available (never carries birth data)
      if (navigator && typeof navigator.share === "function") {
        navigator.share({ title: "The Primal Oracle", text: text, url: url })
          .then(function () { markShared(); })
          .catch(function () { /* user cancelled: no error surfaced */ });
        return;
      }

      // Fallback: copy the identity line plus the animal-page link
      var payload = text + " " + url;
      if (navigator && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(payload).then(function () {
          toast("Copied. Share the " + a.primal + " with a friend.");
          markShared();
        }).catch(function () {
          legacyCopy(payload, a);
        });
      } else {
        legacyCopy(payload, a);
      }
    });
  }

  function legacyCopy(payload, a) {
    var ok = false;
    try {
      var ta = document.createElement("textarea");
      ta.value = payload;
      ta.setAttribute("readonly", "");
      ta.style.position = "absolute";
      ta.style.left = "-9999px";
      (document.body || document.documentElement).appendChild(ta);
      ta.select();
      ok = document.execCommand && document.execCommand("copy");
      ta.parentNode.removeChild(ta);
    } catch (e) { ok = false; }
    if (ok) {
      toast("Copied. Share the " + (a ? a.primal : "animal") + " with a friend.");
      markShared();
    } else {
      toast("Copy this to share: " + payload);
    }
  }

  // Sharing is a rite in app.js (primal_oracle_v1). home.js does not own
  // that storage, so we only signal via the shared event so any listener
  // (Phase 5 meter, app.js) can record it. We never write birth data.
  function markShared() {
    try { window.dispatchEvent(new CustomEvent("po:shared")); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent("po:awaken")); } catch (e) {}
  }

  /* ============================================================
     3. PROVERB ROTATION
     Data transcribed verbatim from build/proverbs.mjs (15 proverbs).
     ============================================================ */

  var PROVERB_IDS = [
    "tianshi", "water", "saiweng", "ziran", "jiahe", "qianli", "houde",
    "shuidao", "ningjing", "yinshui", "luoye", "shouzhu", "jishao", "wuji", "wenzhi"
  ];

  var PROVERBS = {
    tianshi: {
      chars: [["天", "tiān"], ["時", "shí"], ["地", "dì"], ["利", "lì"], ["人", "rén"], ["和", "hé"]],
      literal: "heaven's timing, earth's advantage, human harmony",
      meaning: "The three conditions of success align: the right timing, a favorable place, and united people.",
      soul: "Nothing great stands on timing alone, or place alone, or people alone. It stands where the three lean together, and place is the one you can arrange with your own hands.",
      animal: "Dragon"
    },
    water: {
      chars: [["上", "shàng"], ["善", "shàn"], ["若", "ruò"], ["水", "shuǐ"]],
      literal: "the highest good is like water",
      meaning: "The finest virtue is like water, which benefits all things and flows to the low places without contending.",
      soul: "Water asks for nothing and shapes everything. It sinks to the low room others avoid and turns even that into a home. To be strong like water is to stop contending and still reach everywhere.",
      animal: "Rat"
    },
    saiweng: {
      chars: [["塞", "sài"], ["翁", "wēng"], ["失", "shī"], ["馬", "mǎ"]],
      literal: "the frontier old man loses his horse",
      meaning: "A blessing can wear the face of loss; fortune and misfortune cannot be judged in the moment.",
      soul: "You cannot read a morning by noon. The loss that empties you today may be the door you walk through next spring, so hold both grief and hope loosely.",
      animal: "Horse"
    },
    ziran: {
      chars: [["順", "shùn"], ["其", "qí"], ["自", "zì"], ["然", "rán"]],
      literal: "follow its self-so",
      meaning: "Let nature take its course; work with a thing rather than force it.",
      soul: "A room has its own light and its own flow, and so do you. The art is not to force either into a shape, but to move with what is already there until the two agree.",
      animal: "Monkey"
    },
    jiahe: {
      chars: [["家", "jiā"], ["和", "hé"], ["萬", "wàn"], ["事", "shì"], ["興", "xīng"]],
      literal: "family harmonious, ten thousand affairs flourish",
      meaning: "When the household is at peace, everything else succeeds.",
      soul: "Fix the house and the world grows quieter. When the people under one roof are at peace, the ten thousand small troubles outside lose their teeth.",
      animal: "Rabbit"
    },
    qianli: {
      chars: [["千", "qiān"], ["里", "lǐ"], ["之", "zhī"], ["行", "xíng"], ["，", ""], ["始", "shǐ"], ["於", "yú"], ["足", "zú"], ["下", "xià"]],
      literal: "a thousand-li road begins beneath the feet",
      meaning: "Every great undertaking starts with a single step.",
      soul: "The far place frightens only from a distance. Stand at your own threshold, take the single step in front of you, and the thousand miles begin to belong to you.",
      animal: "Snake"
    },
    houde: {
      chars: [["厚", "hòu"], ["德", "dé"], ["載", "zài"], ["物", "wù"]],
      literal: "thick virtue carries things",
      meaning: "As the earth bears everything, deep virtue supports all around it.",
      soul: "The earth never refuses a thing set upon it. To carry others the way the ground carries you is not weakness; it is the deepest strength a person can hold.",
      animal: "Ox"
    },
    shuidao: {
      chars: [["水", "shuǐ"], ["到", "dào"], ["渠", "qú"], ["成", "chéng"]],
      literal: "the water arrives, the channel forms",
      meaning: "When conditions are ripe, results follow without forcing.",
      soul: "Stop digging the channel and tend the water instead. When the flow is full enough, the path it needs appears on its own, and what you wanted arrives without a fight.",
      animal: "Ox"
    },
    ningjing: {
      chars: [["寧", "níng"], ["靜", "jìng"], ["致", "zhì"], ["遠", "yuǎn"]],
      literal: "through tranquility, reach the far",
      meaning: "Only a calm, undistracted mind accomplishes far-reaching aims.",
      soul: "You cannot see far from a shaking place. Quiet the room and quiet the mind, and the horizon you were straining toward comes into view on its own.",
      animal: "Snake"
    },
    yinshui: {
      chars: [["飲", "yǐn"], ["水", "shuǐ"], ["思", "sī"], ["源", "yuán"]],
      literal: "drink water, think of its source",
      meaning: "Remember your roots and honor those who made your good fortune possible.",
      soul: "Every cup you drink was carried to you by someone. To remember the spring is to keep the water sweet, and to keep yourself whole.",
      animal: "Pig"
    },
    luoye: {
      chars: [["落", "luò"], ["葉", "yè"], ["歸", "guī"], ["根", "gēn"]],
      literal: "fallen leaves return to the roots",
      meaning: "All things are drawn back toward their origin and their home.",
      soul: "However far the wind takes a leaf, the root is where it is going. There is no shame in the turn toward home; it is the shape the whole year was making.",
      animal: "Goat"
    },
    shouzhu: {
      chars: [["守", "shǒu"], ["株", "zhū"], ["待", "dài"], ["兔", "tù"]],
      literal: "guard the stump, wait for the rabbit",
      meaning: "A caution against idle hope where effort is needed; arrange your space to act, not to wait.",
      soul: "Luck that came once will not return to the same still hand. Arrange your life to move toward what you want, not to sit by the stump waiting for it to fall again.",
      animal: "Rabbit"
    },
    jishao: {
      chars: [["積", "jī"], ["少", "shǎo"], ["成", "chéng"], ["多", "duō"]],
      literal: "accumulate few, become many",
      meaning: "Many small things gathered steadily become much; abundance is built grain by grain.",
      soul: "No one gathers a harvest in a day. Abundance is patient arithmetic, a little added and a little kept, until the small becomes a weight you can lean on.",
      animal: "Ox"
    },
    wuji: {
      chars: [["物", "wù"], ["極", "jí"], ["必", "bì"], ["反", "fǎn"]],
      literal: "when a thing reaches its extreme, it reverses",
      meaning: "Anything pushed to its limit turns into its opposite.",
      soul: "Push anything far enough and it turns into its opposite. The height that will not stop climbing is already leaning toward the fall, so learn when full is full.",
      animal: "Monkey"
    },
    wenzhi: {
      chars: [["溫", "wēn"], ["故", "gù"], ["知", "zhī"], ["新", "xīn"]],
      literal: "warm the old, know the new",
      meaning: "Reviewing what you have learned yields fresh understanding.",
      soul: "The old ground still has new things in it. Turn over what you already know with fresh attention and it yields a harvest you missed the first time.",
      animal: "Ox"
    }
  };

  // Render a proverb card matching the server markup structure
  // (from renderProverb in build/proverbs.mjs). Class names identical
  // so PROVERB_CSS styles it without change.
  function renderProverb(id) {
    var p = PROVERBS[id];
    if (!p) return "";
    var ruby = p.chars.map(function (pair) {
      var c = pair[0], py = pair[1];
      return py
        ? "<ruby>" + c + "<rt>" + py + "</rt></ruby>"
        : '<span class="cx-punct">' + c + "</span>";
    }).join("");
    var animalSlug = p.animal.toLowerCase();
    return '<aside class="pf-proverb" aria-label="Chinese proverb">' +
      '<p class="pf-proverb-zh" lang="zh-Hant">' + ruby + "</p>" +
      '<p class="pf-proverb-lit"><span class="k">Literally</span> ' + escProverb(p.literal) + "</p>" +
      '<p class="pf-proverb-mean"><span class="k">Meaning</span> ' + escProverb(p.meaning) + "</p>" +
      '<p class="pf-proverb-soul">' + escProverb(p.soul) + "</p>" +
      '<p class="pf-proverb-note">A proverb we tie to the ' +
        '<a href="/chinese-zodiac/' + animalSlug + '/">Year of the ' + p.animal + "</a>." +
        " The pairing is our own reading, not tradition.</p>" +
      "</aside>";
  }

  var proverbState = { id: null, dailyId: null };

  function dailyProverbId() {
    // deterministic: same for all visitors on the same calendar day
    var dayNumber = Math.floor(Date.now() / 86400000);
    return PROVERB_IDS[((dayNumber % PROVERB_IDS.length) + PROVERB_IDS.length) % PROVERB_IDS.length];
  }

  function hashProverbId() {
    try {
      var m = (location.hash || "").match(/^#proverb-([a-z]+)$/i);
      if (m && PROVERBS[m[1]]) return m[1];
    } catch (e) {}
    return null;
  }

  function swapProverb(id, updateHash) {
    var slot = $("#proverb-slot");
    if (!slot || !PROVERBS[id]) return;
    proverbState.id = id;

    var doSwap = function () {
      slot.innerHTML = renderProverb(id);
      slot.setAttribute("data-proverb-id", id);
    };

    if (!REDUCE) {
      // gentle fade on change
      slot.style.transition = "opacity .32s ease";
      slot.style.opacity = "0";
      window.setTimeout(function () {
        doSwap();
        // reflow then fade back in
        void slot.offsetWidth;
        slot.style.opacity = "1";
      }, 180);
    } else {
      doSwap();
      slot.style.opacity = "1";
    }

    if (updateHash) {
      try { history.replaceState(null, "", "#proverb-" + id); } catch (e) {}
    }

    // toggle a "back to today" affordance if we drifted off the daily one
    updateTodayLink(id);
  }

  function updateTodayLink(id) {
    var link = $("#proverb-today");
    if (!link) return;
    var offDaily = (id !== proverbState.dailyId);
    link.hidden = !offDaily;
    if (offDaily) link.removeAttribute("aria-hidden");
    else link.setAttribute("aria-hidden", "true");
  }

  function initProverb() {
    var slot = $("#proverb-slot");
    var another = $("#proverb-another");
    if (!slot && !another) return; // proverb band absent, no-op

    proverbState.dailyId = dailyProverbId();

    // establish the current id: server-rendered default, or the hash target
    var serverId = slot ? (slot.getAttribute("data-proverb-id") || "") : "";
    var hashId = hashProverbId();
    var startId = hashId || (PROVERBS[serverId] ? serverId : proverbState.dailyId);
    proverbState.id = startId;

    // if the hash targets a different proverb than the server-rendered one,
    // render it now so a shared link opens on the right card
    if (slot && hashId && hashId !== serverId) {
      swapProverb(hashId, false);
    } else if (slot && !serverId) {
      // server left it empty: render the daily default client-side
      swapProverb(startId, false);
    } else {
      updateTodayLink(startId);
    }

    on(another, "click", function (e) {
      if (e && e.preventDefault) e.preventDefault();
      var idx = PROVERB_IDS.indexOf(proverbState.id);
      var next = PROVERB_IDS[(idx + 1 + PROVERB_IDS.length) % PROVERB_IDS.length];
      swapProverb(next, true);
    });

    var todayLink = $("#proverb-today");
    on(todayLink, "click", function (e) {
      if (e && e.preventDefault) e.preventDefault();
      swapProverb(proverbState.dailyId, true);
    });

    // respond to hash changes (e.g. a shared link opened in the same tab)
    on(window, "hashchange", function () {
      var hid = hashProverbId();
      if (hid && hid !== proverbState.id) swapProverb(hid, false);
    });
  }

  /* ============================================================
     4. INTERACTIVE MENAGERIE PREVIEW (light enhancement)
     Code defensively: no-ops if the region is absent.
     ============================================================ */

  function initMenagerie() {
    var region = $("#menagerie-preview");
    if (!region) return; // not on the page, no-op

    // Candidate cells: anything that looks like an animal cell/card.
    var cells = $all("[data-slug]", region);
    if (!cells.length) cells = $all(".peekCard, .menagerie-cell, a", region);

    // Keyboard focusability + hover lift class (motion guarded via CSS-friendly
    // class toggles; the actual transform lives in home-interactive.css and is
    // itself wrapped in a reduced-motion media query).
    cells.forEach(function (cell) {
      if (!cell) return;
      if (!cell.hasAttribute("tabindex") && cell.tagName !== "A" && cell.tagName !== "BUTTON") {
        cell.setAttribute("tabindex", "0");
      }
      var lift = function () { cell.classList.add("is-lifted"); };
      var drop = function () { cell.classList.remove("is-lifted"); };
      on(cell, "mouseenter", lift);
      on(cell, "mouseleave", drop);
      on(cell, "focus", lift);
      on(cell, "blur", drop);
    });

    // Highlight the visitor's own cell if present.
    if (railState.animal && railState.animal.slug) {
      var own = null;
      try { own = region.querySelector('[data-slug="' + railState.animal.slug + '"]'); }
      catch (e) { own = null; }
      if (own) {
        own.classList.add("is-yours");
        own.setAttribute("aria-current", "true");
      }
    }

    // Optional shuffle control: "meet a random animal". Opens a random cell.
    var shuffle = $("#menagerie-shuffle", region) || $("#menagerie-shuffle");
    on(shuffle, "click", function (e) {
      var links = cells.filter(function (c) { return c && (c.href || c.querySelector && c.querySelector("a")); });
      if (!links.length) return;
      if (e && e.preventDefault) e.preventDefault();
      var pick = links[(Math.random() * links.length) | 0];
      var href = pick.href || (pick.querySelector("a") && pick.querySelector("a").href);
      if (href) window.location.href = href;
    });
  }

  /* ============================================================
     BOOT + live reveal wiring
     ============================================================ */

  function refreshIdentity() {
    var a = resolveAnimal();
    renderRail(a);
    // re-highlight the menagerie "yours" cell when identity changes
    if (a && a.slug) {
      var region = $("#menagerie-preview");
      if (region) {
        try {
          var own = region.querySelector('[data-slug="' + a.slug + '"]');
          if (own) { own.classList.add("is-yours"); own.setAttribute("aria-current", "true"); }
        } catch (e) {}
      }
    }
  }

  function boot() {
    try { refreshIdentity(); } catch (e) {}
    try { initProverb(); } catch (e) {}
    try { initMenagerie(); } catch (e) {}

    // Update the rail the moment the user reveals their animal, no reload.
    // We listen for a range of possible reveal events dispatched by the
    // engine / app / game layer, and also poll storage briefly as a safety
    // net in case the reveal writes storage without dispatching an event.
    ["po:reveal", "po:awaken", "po:awakened", "po:revealed", "po:discovered", "storage"]
      .forEach(function (name) {
        try { window.addEventListener(name, function () { refreshIdentity(); }); } catch (e) {}
      });

    // lightweight storage poll: catches a reveal that neither dispatches an
    // event nor a same-tab storage event. Stops once an animal is found or
    // after a short window, so it never runs indefinitely.
    var lastSig = signature();
    var polls = 0;
    var timer = window.setInterval(function () {
      polls++;
      var sig = signature();
      if (sig !== lastSig) {
        lastSig = sig;
        refreshIdentity();
      }
      // stop polling once we have an identity, or after ~60s
      if ((railState.animal && railState.animal.primal) || polls > 120) {
        window.clearInterval(timer);
      }
    }, 500);
  }

  function signature() {
    // cheap change-detector over the two storage blobs we read
    try {
      var o = window.localStorage.getItem(ORACLE_KEY) || "";
      var g = window.localStorage.getItem(GAME_KEY) || "";
      return o.length + ":" + g.length + ":" + o.slice(-24) + g.slice(-16);
    } catch (e) {
      return "mem:" + JSON.stringify(mem);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  // expose a tiny surface for other homepage scripts / debugging
  window.HOME = {
    refreshIdentity: refreshIdentity,
    resolveAnimal: resolveAnimal,
    showProverb: function (id) { swapProverb(id, true); }
  };
})();
