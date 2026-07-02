/* proverbs-share.js - self-contained share modal for proverb cards and the pond reveal.
   Finds every [data-share] trigger (data-trad, data-pinyin, data-literal, data-meaning,
   data-url), wires it to one shared modal, injected once. Vanilla, no libraries. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- runtime style (one injection) ---------- */
  function injectStyle() {
    if (document.getElementById("pv-share-style")) return;
    var css =
      ".pv-sh-scrim{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;" +
        "padding:20px;background:rgba(6,10,20,.72);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);" +
        "opacity:0;transition:opacity .22s ease}" +
      ".pv-sh-scrim.is-open{opacity:1}" +
      ".pv-sh-modal{position:relative;width:100%;max-width:460px;max-height:calc(100vh - 40px);overflow:auto;" +
        "background:linear-gradient(180deg,#10203a 0%,#0a1526 52%,#070d18 100%);" +
        "border:1px solid rgba(214,193,140,.32);border-radius:18px;box-shadow:0 24px 70px rgba(0,0,0,.6);" +
        "padding:26px 24px 22px;transform:translateY(8px);transition:transform .22s ease}" +
      ".pv-sh-scrim.is-open .pv-sh-modal{transform:none}" +
      ".pv-sh-close{position:absolute;top:12px;right:12px;width:34px;height:34px;border-radius:999px;cursor:pointer;" +
        "background:rgba(214,193,140,.08);border:1px solid rgba(214,193,140,.34);color:var(--brass-bright,#efe2b4);" +
        "display:flex;align-items:center;justify-content:center;line-height:1;transition:background .2s;" +
        "-webkit-tap-highlight-color:transparent}" +
      ".pv-sh-close:hover{background:rgba(214,193,140,.2)}" +
      ".pv-sh-card{text-align:center;padding:6px 6px 4px}" +
      ".pv-sh-eyebrow{font-family:\"Space Mono\",ui-monospace,monospace;text-transform:uppercase;letter-spacing:.16em;" +
        "font-size:.58rem;color:var(--brass-bright,#efe2b4);opacity:.9;margin:0 0 14px}" +
      ".pv-sh-zh{font-family:\"Ma Shan Zheng\",\"Noto Serif SC\",serif;color:#f5ecd2;line-height:1.12;" +
        "font-size:clamp(2.6rem,10vw,3.6rem);letter-spacing:.04em;margin:0;text-shadow:0 0 26px rgba(214,193,140,.24)}" +
      ".pv-sh-py{font-family:\"Space Mono\",ui-monospace,monospace;color:rgba(239,226,180,.92);font-size:.86rem;" +
        "letter-spacing:.04em;margin:12px 0 0}" +
      ".pv-sh-rule{width:64px;height:1px;background:rgba(214,193,140,.32);margin:16px auto}" +
      ".pv-sh-lit{color:var(--moon,#f5ecd2);font-family:var(--font-display,\"Fraunces\",serif);font-style:italic;" +
        "line-height:1.5;font-size:1.02rem;margin:0}" +
      ".pv-sh-mean{color:var(--body,#c8c9de);line-height:1.6;font-size:.96rem;margin:10px auto 0;max-width:34ch}" +
      ".pv-sh-row{display:flex;flex-wrap:wrap;justify-content:center;gap:12px;margin:22px 0 4px}" +
      ".pv-sh-btn{width:52px;height:52px;border-radius:999px;cursor:pointer;font-size:1.28rem;line-height:1;" +
        "background:rgba(214,193,140,.08);border:1px solid rgba(214,193,140,.3);color:var(--brass-bright,#efe2b4);" +
        "display:flex;align-items:center;justify-content:center;text-decoration:none;" +
        "transition:background .2s,border-color .2s,transform .2s;-webkit-tap-highlight-color:transparent}" +
      ".pv-sh-btn:hover{background:rgba(214,193,140,.2);border-color:var(--brass,#d6c18c);transform:translateY(-2px)}" +
      ".pv-sh-btn:focus-visible{outline:2px solid var(--brass-bright,#efe2b4);outline-offset:2px}" +
      ".pv-sh-btn svg{width:22px;height:22px}" +
      ".pv-sh-native{display:none;width:100%;margin:18px 0 2px;padding:13px 16px;border-radius:999px;cursor:pointer;" +
        "font-family:\"Space Mono\",ui-monospace,monospace;text-transform:uppercase;letter-spacing:.12em;font-size:.7rem;" +
        "background:rgba(214,193,140,.14);border:1px solid rgba(214,193,140,.45);color:var(--brass-bright,#efe2b4);" +
        "align-items:center;justify-content:center;gap:.5em;transition:background .2s;-webkit-tap-highlight-color:transparent}" +
      ".pv-sh-native:hover{background:rgba(214,193,140,.24)}" +
      ".pv-sh-native.is-on{display:flex}" +
      ".pv-sh-toast{position:absolute;left:50%;bottom:14px;transform:translateX(-50%) translateY(6px);" +
        "font-family:\"Space Mono\",ui-monospace,monospace;text-transform:uppercase;letter-spacing:.12em;font-size:.6rem;" +
        "color:#0a1526;background:var(--brass-bright,#efe2b4);border-radius:999px;padding:7px 14px;" +
        "opacity:0;pointer-events:none;transition:opacity .2s,transform .2s}" +
      ".pv-sh-toast.is-on{opacity:1;transform:translateX(-50%)}" +
      "@media (prefers-reduced-motion:reduce){.pv-sh-scrim,.pv-sh-modal,.pv-sh-btn,.pv-sh-close,.pv-sh-toast{transition:opacity .12s ease}" +
        ".pv-sh-modal{transform:none}.pv-sh-btn:hover{transform:none}}";
    var el = document.createElement("style");
    el.id = "pv-share-style";
    el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
  }

  /* ---------- small helpers ---------- */
  function enc(v) { return encodeURIComponent(v == null ? "" : String(v)); }
  function svgNS(name, attrs) {
    var e = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) e.setAttribute(k, attrs[k]);
    return e;
  }

  /* the shared message, voice-clean (no em dash, no exclamation) */
  function buildMessage(d) {
    return "Check out this Chinese proverb I just learned at Zodi Animals. " +
      d.trad + " (" + d.pinyin + "): " + String(d.meaning || "").replace(/\s*\.\s*$/, "") + ".";
  }
  /* Reddit title: trad (pinyin): literal */
  function buildRedditTitle(d) {
    return d.trad + " (" + d.pinyin + "): " + d.literal;
  }
  /* body carries the message, then the full url on its own line */
  function buildBody(d) {
    return buildMessage(d) + "\n" + d.url;
  }

  /* ---------- share targets ---------- */
  var TARGETS = [
    { key: "sms", label: "Share by text message", emoji: "💬", href: function (d) {
        return "sms:?&body=" + enc(buildBody(d)); } },
    { key: "email", label: "Share by email", emoji: "✉️", href: function (d) {
        return "mailto:?subject=" + enc("A Chinese proverb from Zodi Animals") + "&body=" + enc(buildBody(d)); } },
    { key: "x", label: "Share on X", emoji: null, href: function (d) {
        return "https://twitter.com/intent/tweet?text=" + enc(buildMessage(d)) + "&url=" + enc(d.url); } },
    { key: "facebook", label: "Share on Facebook", emoji: "📘", href: function (d) {
        return "https://www.facebook.com/sharer/sharer.php?u=" + enc(d.url) + "&quote=" + enc(buildMessage(d)); } },
    { key: "reddit", label: "Share on Reddit", emoji: "👽", href: function (d) {
        return "https://www.reddit.com/submit?url=" + enc(d.url) + "&title=" + enc(buildRedditTitle(d)); } },
    { key: "whatsapp", label: "Share on WhatsApp", emoji: null, href: function (d) {
        return "https://wa.me/?text=" + enc(buildMessage(d) + "\n" + d.url); } }
  ];

  /* inline glyphs for the two marks with no clean emoji */
  function targetGlyph(key) {
    if (key === "x") {
      var sx = svgNS("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" });
      var px = svgNS("path", {
        d: "M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.4-5.8L6.2 21H3.2l7.1-8L2.5 3h6.2l4 5.3L17.5 3Zm-1.1 16h1.6L8 4.6H6.3L16.4 19Z",
        fill: "currentColor" });
      sx.appendChild(px);
      return sx;
    }
    if (key === "whatsapp") {
      var sw = svgNS("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" });
      var pw = svgNS("path", {
        d: "M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.4-.5.3-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.3 5.3 5.3 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c.6.3 1.1.4 1.5.6a3.6 3.6 0 0 0 1.6.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z",
        fill: "currentColor" });
      sw.appendChild(pw);
      return sw;
    }
    return null;
  }

  /* icon actions (copy link, save image) as small svg buttons */
  function copyGlyph() {
    var s = svgNS("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" });
    var p = svgNS("path", {
      d: "M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1",
      fill: "none", stroke: "currentColor", "stroke-width": "1.7", "stroke-linecap": "round", "stroke-linejoin": "round" });
    s.appendChild(p);
    return s;
  }
  function saveGlyph() {
    var s = svgNS("svg", { viewBox: "0 0 24 24", "aria-hidden": "true" });
    var p = svgNS("path", {
      d: "M12 3v11m0 0 4-4m-4 4-4-4M5 17v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2",
      fill: "none", stroke: "currentColor", "stroke-width": "1.7", "stroke-linecap": "round", "stroke-linejoin": "round" });
    s.appendChild(p);
    return s;
  }

  /* ---------- share card (offscreen canvas -> PNG), mirrors proverbs-hub.js ---------- */
  var CALLIG_FONT = '"Ma Shan Zheng", "Noto Serif SC", serif';
  function callig(size) {
    var loaded = true;
    try { loaded = document.fonts ? document.fonts.check(size + "px " + CALLIG_FONT) : true; } catch (e) { loaded = true; }
    return (loaded ? CALLIG_FONT : 'Georgia, "Times New Roman", serif');
  }
  function wrapText(cx, text, maxW) {
    var words = String(text).split(/\s+/), lines = [], line = "";
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + " " + words[i] : words[i];
      if (cx.measureText(test).width > maxW && line) { lines.push(line); line = words[i]; }
      else line = test;
    }
    if (line) lines.push(line);
    return lines;
  }
  function shareCard(d) {
    if (!d) return;
    var scale = 2, WPT = 1080, HPT = 1080;
    var cv = document.createElement("canvas");
    cv.width = WPT * scale; cv.height = HPT * scale;
    var cx = cv.getContext("2d");
    if (!cx) return;
    cx.scale(scale, scale);

    // dark celestial ground
    var bg = cx.createLinearGradient(0, 0, 0, HPT);
    bg.addColorStop(0, "#10203a"); bg.addColorStop(0.5, "#0a1526"); bg.addColorStop(1, "#070d18");
    cx.fillStyle = bg; cx.fillRect(0, 0, WPT, HPT);
    // soft moon glow at the top
    var mg = cx.createRadialGradient(WPT * 0.5, -60, 20, WPT * 0.5, -60, HPT * 0.95);
    mg.addColorStop(0, "rgba(245,236,210,0.12)"); mg.addColorStop(1, "rgba(245,236,210,0)");
    cx.fillStyle = mg; cx.fillRect(0, 0, WPT, HPT);
    // a scatter of quiet stars
    for (var st = 0; st < 70; st++) {
      var sx = ((st * 131 + 37) % WPT), sy = ((st * 197 + 61) % (HPT * 0.55));
      cx.beginPath(); cx.arc(sx, sy, ((st % 3) * 0.5 + 0.5), 0, 7);
      cx.fillStyle = "rgba(245,236,210," + (0.08 + (st % 5) * 0.03) + ")"; cx.fill();
    }
    // brass hairline frame
    cx.strokeStyle = "rgba(214,193,140,0.35)"; cx.lineWidth = 2;
    cx.strokeRect(40, 40, WPT - 80, HPT - 80);

    cx.textAlign = "center";
    cx.textBaseline = "middle";

    // eyebrow
    cx.fillStyle = "rgba(239,226,180,0.85)";
    cx.font = '600 22px "Space Mono", ui-monospace, monospace';
    cx.fillText("諺語 · THE PROVERB POND", WPT / 2, 150);

    // calligraphy characters (auto-fit to width)
    var chars = d.trad || "";
    var fsize = chars.length > 8 ? 128 : (chars.length > 6 ? 150 : 180);
    cx.fillStyle = "#f5ecd2";
    cx.font = fsize + "px " + callig(fsize);
    while (cx.measureText(chars).width > WPT - 180 && fsize > 60) {
      fsize -= 8; cx.font = fsize + "px " + callig(fsize);
    }
    cx.shadowColor = "rgba(214,193,140,0.25)"; cx.shadowBlur = 26;
    cx.fillText(chars, WPT / 2, 380);
    cx.shadowBlur = 0;

    // pinyin
    cx.fillStyle = "rgba(239,226,180,0.92)";
    cx.font = '26px "Space Mono", ui-monospace, monospace';
    var pyLines = wrapText(cx, d.pinyin || "", WPT - 200);
    var py = 520;
    for (var i = 0; i < pyLines.length; i++) { cx.fillText(pyLines[i], WPT / 2, py); py += 38; }

    // divider
    cx.strokeStyle = "rgba(214,193,140,0.28)"; cx.lineWidth = 1;
    cx.beginPath(); cx.moveTo(WPT * 0.32, py + 18); cx.lineTo(WPT * 0.68, py + 18); cx.stroke();

    // literal line, quoted and italic-feeling
    cx.fillStyle = "rgba(245,236,210,0.95)";
    cx.font = 'italic 27px Georgia, "Times New Roman", serif';
    var litLines = wrapText(cx, "“" + (d.literal || "") + "”", WPT - 240);
    var ly = py + 74;
    for (var k = 0; k < litLines.length && k < 3; k++) { cx.fillText(litLines[k], WPT / 2, ly); ly += 40; }

    // explained meaning
    cx.fillStyle = "#c8c9de";
    cx.font = '30px Georgia, "Times New Roman", serif';
    var mLines = wrapText(cx, d.meaning || "", WPT - 220);
    var my = ly + 44;
    for (var j = 0; j < mLines.length && j < 5; j++) { cx.fillText(mLines[j], WPT / 2, my); my += 44; }

    // wordmark
    cx.fillStyle = "rgba(214,193,140,0.8)";
    cx.font = '600 24px "Space Mono", ui-monospace, monospace';
    cx.fillText("zodianimal", WPT / 2, HPT - 96);

    // download
    var name = "proverb-" + (d.slug || "card") + ".png";
    function fallbackOpen() {
      try { var u = cv.toDataURL("image/png"); var w = window.open(); if (w) w.document.write('<img src="' + u + '" alt="proverb card">'); } catch (e) {}
    }
    try {
      if (cv.toBlob) {
        cv.toBlob(function (blob) {
          if (!blob) { fallbackOpen(); return; }
          var url = URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url; a.download = name;
          document.body.appendChild(a); a.click(); document.body.removeChild(a);
          setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
        }, "image/png");
      } else {
        var a2 = document.createElement("a");
        a2.href = cv.toDataURL("image/png"); a2.download = name;
        document.body.appendChild(a2); a2.click(); document.body.removeChild(a2);
      }
    } catch (e) { fallbackOpen(); }
  }

  /* ---------- one modal, built once ---------- */
  var scrim = null, modal = null, closeBtn = null;
  var elEyebrow, elZh, elPy, elLit, elMean, elToast, nativeBtn;
  var lastTrigger = null, currentData = null, toastTimer = 0;

  function focusable() {
    return Array.prototype.slice.call(
      modal.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')
    ).filter(function (n) { return n.offsetParent !== null || n === modal; });
  }

  function onKey(e) {
    if (e.key === "Escape" || e.keyCode === 27) { e.preventDefault(); close(); return; }
    if (e.key === "Tab" || e.keyCode === 9) {
      var f = focusable();
      if (!f.length) { e.preventDefault(); return; }
      var first = f[0], last = f[f.length - 1], a = document.activeElement;
      if (e.shiftKey && (a === first || a === modal)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
    }
  }

  function toast(text) {
    if (!elToast) return;
    elToast.textContent = text;
    elToast.classList.add("is-on");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { elToast.classList.remove("is-on"); }, 1800);
  }

  function copyLink() {
    var url = currentData ? currentData.url : "";
    function ok() { toast("Link copied"); }
    function legacy() {
      try {
        var ta = document.createElement("textarea");
        ta.value = url; ta.setAttribute("readonly", "");
        ta.style.position = "fixed"; ta.style.opacity = "0"; ta.style.top = "0";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
        ok();
      } catch (e) { toast("Copy failed"); }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(ok, legacy);
    } else legacy();
  }

  function build() {
    injectStyle();
    if (scrim) return;

    scrim = document.createElement("div");
    scrim.className = "pv-sh-scrim";
    scrim.hidden = true;

    modal = document.createElement("div");
    modal.className = "pv-sh-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-labelledby", "pv-sh-zh");

    closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "pv-sh-close";
    closeBtn.setAttribute("aria-label", "Close");
    closeBtn.appendChild(document.createTextNode("✕"));

    var card = document.createElement("div");
    card.className = "pv-sh-card";

    elEyebrow = document.createElement("p");
    elEyebrow.className = "pv-sh-eyebrow";
    elEyebrow.textContent = "諺語 · The proverb pond";

    elZh = document.createElement("p");
    elZh.className = "pv-sh-zh";
    elZh.id = "pv-sh-zh";

    elPy = document.createElement("p");
    elPy.className = "pv-sh-py";

    var rule = document.createElement("div");
    rule.className = "pv-sh-rule";

    elLit = document.createElement("p");
    elLit.className = "pv-sh-lit";

    elMean = document.createElement("p");
    elMean.className = "pv-sh-mean";

    card.appendChild(elEyebrow);
    card.appendChild(elZh);
    card.appendChild(elPy);
    card.appendChild(rule);
    card.appendChild(elLit);
    card.appendChild(elMean);

    /* native share (mobile, when available) */
    nativeBtn = document.createElement("button");
    nativeBtn.type = "button";
    nativeBtn.className = "pv-sh-native";
    nativeBtn.appendChild(document.createTextNode("Share"));
    if (navigator.share) nativeBtn.classList.add("is-on");
    nativeBtn.addEventListener("click", function () {
      if (!currentData || !navigator.share) return;
      try {
        navigator.share({
          title: currentData.trad + " (" + currentData.pinyin + ")",
          text: buildMessage(currentData),
          url: currentData.url
        });
      } catch (e) {}
    });

    /* the row of round buttons */
    var row = document.createElement("div");
    row.className = "pv-sh-row";

    TARGETS.forEach(function (tg) {
      var a = document.createElement("a");
      a.className = "pv-sh-btn";
      a.setAttribute("rel", "noopener noreferrer");
      a.setAttribute("aria-label", tg.label);
      a.setAttribute("title", tg.label);
      var g = tg.emoji ? null : targetGlyph(tg.key);
      if (g) a.appendChild(g); else a.appendChild(document.createTextNode(tg.emoji));
      /* mail/sms open in same context; web intents in a new tab */
      if (tg.key !== "sms" && tg.key !== "email") a.setAttribute("target", "_blank");
      a.addEventListener("click", function () {
        if (!currentData) return;
        a.setAttribute("href", tg.href(currentData));
      });
      row.appendChild(a);
    });

    /* copy link */
    var copyBtn = document.createElement("button");
    copyBtn.type = "button";
    copyBtn.className = "pv-sh-btn";
    copyBtn.setAttribute("aria-label", "Copy link");
    copyBtn.setAttribute("title", "Copy link");
    copyBtn.appendChild(copyGlyph());
    copyBtn.addEventListener("click", copyLink);
    row.appendChild(copyBtn);

    /* save image */
    var saveBtn = document.createElement("button");
    saveBtn.type = "button";
    saveBtn.className = "pv-sh-btn";
    saveBtn.setAttribute("aria-label", "Save as image");
    saveBtn.setAttribute("title", "Save as image");
    saveBtn.appendChild(saveGlyph());
    saveBtn.addEventListener("click", function () {
      if (!currentData) return;
      var run = function () { try { shareCard(currentData); } catch (e) {} };
      if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
        var done = false;
        var go = function () { if (done) return; done = true; run(); };
        document.fonts.ready.then(go);
        setTimeout(go, 800); // never block on the font
      } else run();
    });
    row.appendChild(saveBtn);

    elToast = document.createElement("div");
    elToast.className = "pv-sh-toast";
    elToast.setAttribute("aria-live", "polite");

    modal.appendChild(closeBtn);
    modal.appendChild(card);
    modal.appendChild(nativeBtn);
    modal.appendChild(row);
    modal.appendChild(elToast);
    scrim.appendChild(modal);
    document.body.appendChild(scrim);

    closeBtn.addEventListener("click", close);
    scrim.addEventListener("click", function (e) { if (e.target === scrim) close(); });
  }

  function open(trigger) {
    build();
    var d = {
      trad: trigger.getAttribute("data-trad") || "",
      pinyin: trigger.getAttribute("data-pinyin") || "",
      literal: trigger.getAttribute("data-literal") || "",
      meaning: trigger.getAttribute("data-meaning") || "",
      url: trigger.getAttribute("data-url") || (location.origin + location.pathname),
      slug: trigger.getAttribute("data-slug") || ""
    };
    currentData = d;
    lastTrigger = trigger;

    elZh.textContent = d.trad;
    elPy.textContent = d.pinyin;
    elLit.textContent = d.literal ? "“" + d.literal + "”" : "";
    elMean.textContent = d.meaning;
    nativeBtn.classList.toggle("is-on", !!navigator.share);
    if (elToast) elToast.classList.remove("is-on");

    scrim.hidden = false;
    /* reflow then fade in */
    void scrim.offsetWidth;
    scrim.classList.add("is-open");
    document.addEventListener("keydown", onKey, true);
    var prevOverflow = document.body.style.overflow;
    scrim.setAttribute("data-prev-overflow", prevOverflow);
    document.body.style.overflow = "hidden";
    /* move focus into the dialog */
    setTimeout(function () { (closeBtn || modal).focus(); }, reduce ? 0 : 40);
  }

  function close() {
    if (!scrim || scrim.hidden) return;
    scrim.classList.remove("is-open");
    document.removeEventListener("keydown", onKey, true);
    document.body.style.overflow = scrim.getAttribute("data-prev-overflow") || "";
    var t = lastTrigger;
    var finish = function () {
      scrim.hidden = true;
      if (t && t.focus) { try { t.focus(); } catch (e) {} }
    };
    if (reduce) finish();
    else setTimeout(finish, 220);
  }

  /* ---------- self-mount ---------- */
  function mount() {
    /* delegated so it also covers any triggers added after load */
    document.addEventListener("click", function (e) {
      var trigger = e.target.closest("[data-share]");
      if (!trigger) return;
      /* if the trigger is a link, do not follow it */
      e.preventDefault();
      open(trigger);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
