/* proverbs-hub.js - pond, filters, Mandarin TTS, daily draw, deeper reading, share. */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- runtime style (ink-brush reveal, deeper reading, share) ---------- */
  (function injectStyle() {
    if (document.getElementById("pv-hub-style")) return;
    var css =
      ".pv-reveal-zh ruby,.pv-reveal-zh .cx-punct{display:inline-block}" +
      ".pv-ink ruby,.pv-ink .cx-punct{opacity:0;transform:translateY(.14em) scale(.82);filter:blur(6px);" +
        "animation:pv-bloom .62s cubic-bezier(.2,.8,.24,1) both;animation-delay:var(--pv-d,0ms)}" +
      "@keyframes pv-bloom{0%{opacity:0;transform:translateY(.14em) scale(.82);filter:blur(6px)}" +
        "55%{opacity:1;filter:blur(.6px)}100%{opacity:1;transform:none;filter:blur(0)}}" +
      ".pv-deeper{margin:14px auto 0;max-width:52ch;text-align:left;border-top:1px solid rgba(214,193,140,.14);padding-top:14px}" +
      ".pv-deeper-h{font-family:\"Space Mono\",ui-monospace,monospace;text-transform:uppercase;letter-spacing:.16em;" +
        "font-size:.6rem;color:var(--brass-bright,#efe2b4);margin:0 0 5px;opacity:.9}" +
      ".pv-deeper-story{color:var(--body,#c8c9de);line-height:1.6;margin:0 0 12px;font-size:.98rem}" +
      ".pv-deeper-apply{color:var(--moon,#f5ecd2);font-family:var(--font-display,\"Fraunces\",serif);font-style:italic;" +
        "line-height:1.5;margin:0 0 12px;font-size:1.06rem}" +
      ".pv-deeper-related{display:flex;flex-wrap:wrap;gap:8px;align-items:center}" +
      ".pv-rel-chip{font-family:\"Ma Shan Zheng\",\"Noto Serif SC\",serif;font-size:1.02rem;letter-spacing:.03em;" +
        "color:var(--brass-bright,#efe2b4);background:rgba(214,193,140,.08);border:1px solid rgba(214,193,140,.3);" +
        "border-radius:999px;padding:6px 14px;cursor:pointer;transition:background .2s,border-color .2s,transform .2s;" +
        "-webkit-tap-highlight-color:transparent}" +
      ".pv-rel-chip:hover{background:rgba(214,193,140,.2);border-color:var(--brass,#d6c18c);transform:translateY(-1px)}" +
      ".pv-share{font-family:\"Space Mono\",ui-monospace,monospace;text-transform:uppercase;letter-spacing:.12em;" +
        "font-size:.66rem;color:var(--brass-bright,#efe2b4);background:rgba(214,193,140,.08);" +
        "border:1px solid rgba(214,193,140,.4);border-radius:999px;padding:8px 14px;cursor:pointer;" +
        "transition:background .2s;display:inline-flex;align-items:center;gap:.4em}" +
      ".pv-share:hover{background:rgba(214,193,140,.18)}" +
      ".pv-share[aria-busy=true]{opacity:.6;cursor:progress}" +
      "@media (prefers-reduced-motion:reduce){.pv-ink ruby,.pv-ink .cx-punct{opacity:1;transform:none;filter:none;animation:none}" +
        ".pv-rel-chip{transition:none}}";
    var el = document.createElement("style");
    el.id = "pv-hub-style";
    el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
  })();

  /* ---------- data ---------- */
  var DATA = [];
  try { DATA = JSON.parse(document.getElementById("pv-data").textContent); } catch (e) { DATA = []; }
  var byId = {};
  DATA.forEach(function (p) { byId[p.id] = p; });

  /* ---------- daily streak (shared key with the collection page) ---------- */
  try {
    var _sk = "za_proverbs_streak";
    var _today = new Date().toISOString().slice(0, 10);
    var _s = JSON.parse(localStorage.getItem(_sk) || "null") || { last: "", count: 0 };
    if (_s.last !== _today) {
      var _y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      _s.count = (_s.last === _y) ? (_s.count + 1) : 1;
      _s.last = _today;
      localStorage.setItem(_sk, JSON.stringify(_s));
    }
  } catch (e) {}
  var ANIMAL_HANZI = {Rat:"鼠",Ox:"牛",Tiger:"虎",Rabbit:"兔",Dragon:"龍",Snake:"蛇",Horse:"馬",Goat:"羊",Monkey:"猴",Rooster:"雞",Dog:"狗",Pig:"豬"};

  /* optional deeper-reading blob, keyed by proverb id */
  var DEEPER = {};
  try {
    var deepEl = document.getElementById("pv-deeper");
    if (deepEl) DEEPER = JSON.parse(deepEl.textContent) || {};
  } catch (e) { DEEPER = {}; }

  /* ---------- Mandarin speech ---------- */
  var zhVoice = null;
  function pickVoice() {
    if (!window.speechSynthesis) return;
    var vs = speechSynthesis.getVoices() || [];
    var best = null, bs = -1;
    for (var i = 0; i < vs.length; i++) {
      var v = vs[i], nm = (v.name || "").toLowerCase(), lg = (v.lang || "").toLowerCase();
      if (!(/^zh\b|zh[-_]/.test(lg) || /chinese|中文|普通话|国语|國語|mandarin/i.test(v.name || ""))) continue;
      var sc = 0;
      if (/tingting|ting-ting|meijia|mei-jia|sinji|li-mu|yu-shu|han-?yu/.test(nm)) sc += 100; // Apple premium (Safari/macOS)
      if (/google/.test(nm)) sc += 60;                                                        // Google network voice (Chrome)
      if (/普通话|mandarin|zh-cn|zh_cn|cmn/.test(nm + lg)) sc += 25;                            // Mandarin over Cantonese/Taiwan
      if (v.localService === false) sc += 12;                                                 // network voices are usually clearer
      if (/female|woman/.test(nm)) sc += 4;
      if (sc > bs) { bs = sc; best = v; }
    }
    zhVoice = best;
  }
  if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text, btn) {
    if (!window.speechSynthesis || !text) return;
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "zh-CN"; u.rate = 0.78; u.pitch = 1;
      if (zhVoice) u.voice = zhVoice;
      if (btn) { btn.classList.add("is-saying"); u.onend = u.onerror = function () { btn.classList.remove("is-saying"); }; }
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  /* delegated: any element with data-say speaks */
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-say]");
    if (!b) return;
    var t = b.getAttribute("data-say");
    if (t) speak(t, b);
  });

  /* ---------- reveal panel ---------- */
  var reveal = document.getElementById("pvReveal");
  var elZh = document.getElementById("pvRevealZh"), elPy = document.getElementById("pvRevealPinyin"),
      elLit = document.getElementById("pvRevealLit"), elMean = document.getElementById("pvRevealMean"),
      elSoul = document.getElementById("pvRevealSoul"), elTag = document.getElementById("pvRevealTag"),
      elAnimal = document.getElementById("pvRevealAnimal"), elSrc = document.getElementById("pvRevealSrc"),
      elSay = document.getElementById("pvRevealSay"), elKeep = document.getElementById("pvKeep");
  var current = null;

  /* one deeper-reading block, inserted after the soul line and refreshed per proverb */
  var deeperBox = null;
  if (elSoul && elSoul.parentNode) {
    deeperBox = document.createElement("div");
    deeperBox.className = "pv-deeper";
    deeperBox.hidden = true;
    elSoul.parentNode.insertBefore(deeperBox, elSoul.nextSibling);
  }

  function rubyHTML(p) {
    return p.chars.map(function (c) {
      return c[1] ? "<ruby>" + c[0] + "<rt>" + c[1] + "</rt></ruby>" : '<span class="cx-punct">' + c[0] + "</span>";
    }).join("");
  }

  /* stagger each calligraphy glyph in with a soft ink bloom */
  function inkReveal() {
    if (!elZh) return;
    if (reduce) { elZh.classList.remove("pv-ink"); return; }
    var kids = elZh.children, i;
    for (i = 0; i < kids.length; i++) kids[i].style.setProperty("--pv-d", (i * 72) + "ms");
    elZh.classList.remove("pv-ink");
    void elZh.offsetWidth; // restart the animation cleanly
    elZh.classList.add("pv-ink");
  }

  /* build the deeper-reading block for a proverb, if data exists */
  function renderDeeper(p) {
    if (!deeperBox) return;
    var d = p && DEEPER[p.id];
    if (!d || (!d.story && !d.apply && !(d.related && d.related.length))) {
      deeperBox.hidden = true;
      deeperBox.textContent = "";
      return;
    }
    deeperBox.textContent = "";
    if (d.story) {
      var h1 = document.createElement("p"); h1.className = "pv-deeper-h"; h1.textContent = "The story";
      var s = document.createElement("p"); s.className = "pv-deeper-story"; s.textContent = d.story;
      deeperBox.appendChild(h1); deeperBox.appendChild(s);
    }
    if (d.apply) {
      var h2 = document.createElement("p"); h2.className = "pv-deeper-h"; h2.textContent = "Try this";
      var a = document.createElement("p"); a.className = "pv-deeper-apply"; a.textContent = d.apply;
      deeperBox.appendChild(h2); deeperBox.appendChild(a);
    }
    var rel = (d.related || []).map(function (id) { return byId[id]; }).filter(Boolean).slice(0, 3);
    if (rel.length) {
      var h3 = document.createElement("p"); h3.className = "pv-deeper-h"; h3.textContent = "Sits beside";
      deeperBox.appendChild(h3);
      var wrap = document.createElement("div"); wrap.className = "pv-deeper-related";
      rel.forEach(function (rp) {
        var chip = document.createElement("button");
        chip.type = "button";
        chip.className = "pv-rel-chip";
        chip.textContent = rp.trad;
        chip.setAttribute("title", rp.pinyin);
        chip.addEventListener("click", function () {
          render(rp, "A related line");
          if (reveal && reveal.scrollIntoView) reveal.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
        });
        wrap.appendChild(chip);
      });
      deeperBox.appendChild(wrap);
    }
    deeperBox.hidden = false;
  }

  function render(p, tag) {
    if (!p) return;
    current = p;
    elTag.textContent = tag || "From the pond";
    elZh.innerHTML = rubyHTML(p);
    elPy.textContent = p.pinyin;
    elLit.textContent = "“" + p.literal + "”";
    elMean.textContent = p.meaning;
    elSoul.textContent = p.soul;
    var a = String(p.animal);
    elAnimal.textContent = (ANIMAL_HANZI[a] || "") + " Year of the " + a;
    elAnimal.setAttribute("href", "/chinese-zodiac/" + a.toLowerCase() + "/");
    elSrc.textContent = p.source ? "Source: " + p.source : "";
    elSay.setAttribute("data-say", p.trad);
    renderDeeper(p);
    syncKeep();
    reveal.classList.remove("is-in");
    // reflow then fade in
    void reveal.offsetWidth;
    reveal.classList.add("is-in");
    inkReveal();
  }

  /* ---------- keep (light collectible in localStorage) ---------- */
  var KEY = "za_proverbs_kept";
  function kept() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; } }
  function syncKeep() {
    if (!current) return;
    var on = kept().indexOf(current.id) !== -1;
    elKeep.setAttribute("aria-pressed", on ? "true" : "false");
    elKeep.firstChild.nodeValue = on ? "Kept " : "Keep ";
  }
  if (elKeep) elKeep.addEventListener("click", function () {
    if (!current) return;
    var list = kept(), i = list.indexOf(current.id);
    if (i === -1) list.push(current.id); else list.splice(i, 1);
    try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
    syncKeep();
  });

  /* ---------- share card (offscreen canvas rendered to a PNG download) ---------- */
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
  function shareCard(p) {
    if (!p) return;
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
    for (var s = 0; s < 70; s++) {
      var sx = ((s * 131 + 37) % WPT), sy = ((s * 197 + 61) % (HPT * 0.55));
      cx.beginPath(); cx.arc(sx, sy, ((s % 3) * 0.5 + 0.5), 0, 7);
      cx.fillStyle = "rgba(245,236,210," + (0.08 + (s % 5) * 0.03) + ")"; cx.fill();
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
    var chars = p.trad || "";
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
    var pyLines = wrapText(cx, p.pinyin || "", WPT - 200);
    var py = 520;
    for (var i = 0; i < pyLines.length; i++) { cx.fillText(pyLines[i], WPT / 2, py); py += 38; }

    // divider
    cx.strokeStyle = "rgba(214,193,140,0.28)"; cx.lineWidth = 1;
    cx.beginPath(); cx.moveTo(WPT * 0.32, py + 18); cx.lineTo(WPT * 0.68, py + 18); cx.stroke();

    // english meaning
    cx.fillStyle = "#c8c9de";
    cx.font = '30px Georgia, "Times New Roman", serif';
    var mLines = wrapText(cx, p.meaning || "", WPT - 220);
    var my = py + 78;
    for (var j = 0; j < mLines.length && j < 5; j++) { cx.fillText(mLines[j], WPT / 2, my); my += 44; }

    // wordmark
    cx.fillStyle = "rgba(214,193,140,0.8)";
    cx.font = '600 24px "Space Mono", ui-monospace, monospace';
    cx.fillText("zodianimal", WPT / 2, HPT - 96);

    // download
    var name = "proverb-" + (p.id || "card") + ".png";
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

  /* Share button, added into the reveal actions next to Keep */
  var shareBtn = null;
  if (elKeep && elKeep.parentNode) {
    shareBtn = document.createElement("button");
    shareBtn.type = "button";
    shareBtn.className = "pv-share";
    shareBtn.setAttribute("aria-label", "Save this proverb as an image");
    shareBtn.setAttribute("title", "Save as an image");
    shareBtn.appendChild(document.createTextNode("Share "));
    var ic = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    ic.setAttribute("viewBox", "0 0 24 24"); ic.setAttribute("width", "15"); ic.setAttribute("height", "15");
    ic.setAttribute("aria-hidden", "true");
    var pth = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pth.setAttribute("d", "M12 3v10m0 0 3.5-3.5M12 13 8.5 9.5M5 15v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3");
    pth.setAttribute("fill", "none"); pth.setAttribute("stroke", "currentColor");
    pth.setAttribute("stroke-width", "1.7"); pth.setAttribute("stroke-linecap", "round"); pth.setAttribute("stroke-linejoin", "round");
    ic.appendChild(pth); shareBtn.appendChild(ic);
    elKeep.parentNode.insertBefore(shareBtn, elKeep.nextSibling);
    shareBtn.addEventListener("click", function () {
      if (!current) return;
      shareBtn.setAttribute("aria-busy", "true");
      var run = function () {
        try { shareCard(current); } catch (e) {}
        setTimeout(function () { shareBtn.removeAttribute("aria-busy"); }, 400);
      };
      if (document.fonts && document.fonts.ready && document.fonts.ready.then) {
        var done = false;
        var go = function () { if (done) return; done = true; run(); };
        document.fonts.ready.then(go);
        setTimeout(go, 800); // never block on the font
      } else run();
    });
  }

  /* ---------- daily proverb (deterministic by date) ---------- */
  function daySeed() {
    var d = new Date();
    return (d.getFullYear() * 1000 + (d.getMonth() + 1) * 50 + d.getDate());
  }
  function draw(random) {
    if (!DATA.length) return;
    var idx = random ? Math.floor(Math.random() * DATA.length) : (daySeed() % DATA.length);
    if (random && current) { // avoid repeating the same one twice in a row
      var guard = 0;
      while (DATA[idx].id === current.id && guard++ < 6) idx = Math.floor(Math.random() * DATA.length);
    }
    render(DATA[idx], random ? "From the pond" : "Proverb of the day");
  }

  /* ---------- the pond (canvas koi) ---------- */
  var pond = document.getElementById("pvPond");
  var canvas = document.getElementById("pvCanvas");
  var hint = document.getElementById("pvHint");
  var drawBtn = document.getElementById("pvDraw");
  var ctx = canvas && canvas.getContext ? canvas.getContext("2d") : null;
  var W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  var koi = [], lotus = [], ripples = [], stars = [], raf = 0, t = 0;
  /* [body base, body edge, fin/tail tint] as rgb triplets */
  var KOI_SKINS = [
    { body: "239,226,180", edge: "255,244,206", fin: "245,236,210" },
    { body: "214,193,140", edge: "236,214,160", fin: "239,226,180" },
    { body: "232,178,120", edge: "247,201,150", fin: "236,196,150" },
    { body: "222,150,120", edge: "240,182,150", fin: "236,178,150" },
    { body: "245,236,210", edge: "255,250,235", fin: "245,236,210" }
  ];

  function size() {
    if (!canvas) return;
    var r = pond.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function seed() {
    var n = reduce ? 5 : 8; // capped either way
    koi = [];
    for (var i = 0; i < n; i++) {
      koi.push({
        x: Math.random() * W, y: 60 + Math.random() * (H - 120),
        a: Math.random() * Math.PI * 2, sp: 0.15 + Math.random() * 0.35,
        len: 30 + Math.random() * 22, skin: KOI_SKINS[i % KOI_SKINS.length],
        wob: Math.random() * Math.PI * 2, glow: 0.5 + Math.random() * 0.5
      });
    }
    lotus = [];
    for (var j = 0; j < 5; j++) lotus.push({ x: Math.random() * W, y: 40 + Math.random() * (H - 80), r: 14 + Math.random() * 16, a: Math.random() });
    stars = [];
    for (var k = 0; k < 40; k++) stars.push({ x: Math.random() * W, y: Math.random() * H * 0.5, r: Math.random() * 1.2 + 0.2, p: Math.random() });
  }
  function drawKoi(k) {
    var wob = reduce ? 0 : Math.sin(t * 0.06 + k.wob) * 0.4;
    var ang = k.a + wob;
    var L = k.len, sk = k.skin;
    ctx.save();
    ctx.translate(k.x, k.y);
    ctx.rotate(ang);

    // soft reflection on the water beneath the fish
    var glow = ctx.createRadialGradient(0, 0, 2, 0, 0, L * 0.95);
    glow.addColorStop(0, "rgba(" + sk.body + "," + (0.16 * k.glow) + ")");
    glow.addColorStop(1, "rgba(" + sk.body + ",0)");
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(0, 0, L * 0.95, 0, 7); ctx.fill();

    // flowing double-lobed tail (behind the body)
    var sw = reduce ? 0 : Math.sin(t * 0.12 + k.wob) * 0.6;
    ctx.fillStyle = "rgba(" + sk.fin + ",0.24)";
    ctx.beginPath();
    ctx.moveTo(-L * 0.42, 0);
    ctx.quadraticCurveTo(-L * 0.72, -L * 0.10 + sw * 6, -L * 0.98, -L * 0.30 + sw * 12);
    ctx.quadraticCurveTo(-L * 0.66, -L * 0.06 + sw * 5, -L * 0.60, 0);
    ctx.quadraticCurveTo(-L * 0.66, L * 0.06 + sw * 5, -L * 0.98, L * 0.30 + sw * 12);
    ctx.quadraticCurveTo(-L * 0.72, L * 0.10 + sw * 6, -L * 0.42, 0);
    ctx.closePath();
    ctx.fill();

    // pelvic/side fins that flutter as it swims
    var fin = reduce ? 0 : Math.sin(t * 0.16 + k.wob) * 0.5;
    ctx.fillStyle = "rgba(" + sk.fin + ",0.20)";
    ctx.beginPath();
    ctx.moveTo(-L * 0.02, L * 0.16);
    ctx.quadraticCurveTo(-L * 0.24, L * 0.40 + fin * 6, -L * 0.34, L * 0.20);
    ctx.quadraticCurveTo(-L * 0.20, L * 0.16, -L * 0.02, L * 0.16);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-L * 0.02, -L * 0.16);
    ctx.quadraticCurveTo(-L * 0.24, -L * 0.40 - fin * 6, -L * 0.34, -L * 0.20);
    ctx.quadraticCurveTo(-L * 0.20, -L * 0.16, -L * 0.02, -L * 0.16);
    ctx.fill();

    // body: a rounder teardrop with a bright core and soft edge
    var g = ctx.createLinearGradient(-L * 0.45, 0, L * 0.55, 0);
    g.addColorStop(0, "rgba(" + sk.body + ",0)");
    g.addColorStop(0.35, "rgba(" + sk.body + ",0.85)");
    g.addColorStop(0.72, "rgba(" + sk.edge + ",0.95)");
    g.addColorStop(1, "rgba(" + sk.edge + ",0.7)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(L * 0.55, 0);
    ctx.quadraticCurveTo(L * 0.32, -L * 0.30, -L * 0.06, -L * 0.26);
    ctx.quadraticCurveTo(-L * 0.42, -L * 0.20, -L * 0.46, 0);
    ctx.quadraticCurveTo(-L * 0.42, L * 0.20, -L * 0.06, L * 0.26);
    ctx.quadraticCurveTo(L * 0.32, L * 0.30, L * 0.55, 0);
    ctx.closePath();
    ctx.fill();

    // dorsal fin along the top ridge
    ctx.fillStyle = "rgba(" + sk.fin + ",0.28)";
    ctx.beginPath();
    ctx.moveTo(L * 0.16, -L * 0.24);
    ctx.quadraticCurveTo(L * 0.02, -L * 0.44 - fin * 4, -L * 0.14, -L * 0.24);
    ctx.quadraticCurveTo(0, -L * 0.22, L * 0.16, -L * 0.24);
    ctx.fill();

    // a faint eye for a little life
    ctx.fillStyle = "rgba(20,26,40,0.5)";
    ctx.beginPath(); ctx.arc(L * 0.34, -L * 0.06, L * 0.035, 0, 7); ctx.fill();

    ctx.restore();
  }
  function step() {
    if (!ctx) return;
    t++;
    ctx.clearRect(0, 0, W, H);
    // faint stars on the water's dark sky
    for (var s = 0; s < stars.length; s++) {
      var st = stars[s]; if (!reduce) st.p += 0.01;
      ctx.beginPath(); ctx.arc(st.x, st.y, st.r, 0, 7);
      ctx.fillStyle = "rgba(245,236,210," + (0.15 + Math.abs(Math.sin(st.p)) * 0.3) + ")"; ctx.fill();
    }
    // moon glow reflection
    var mg = ctx.createRadialGradient(W * 0.5, -40, 10, W * 0.5, -40, H * 0.9);
    mg.addColorStop(0, "rgba(245,236,210,0.10)"); mg.addColorStop(1, "rgba(245,236,210,0)");
    ctx.fillStyle = mg; ctx.fillRect(0, 0, W, H);
    // lotus pads
    for (var l = 0; l < lotus.length; l++) {
      var lp = lotus[l];
      ctx.beginPath(); ctx.arc(lp.x, lp.y, lp.r, 0.3, Math.PI * 2);
      ctx.fillStyle = "rgba(60,110,90,0.18)"; ctx.fill();
    }
    // ripples
    for (var r = ripples.length - 1; r >= 0; r--) {
      var rp = ripples[r]; rp.rad += 2.2; rp.life -= 0.02;
      if (rp.life <= 0) { ripples.splice(r, 1); continue; }
      ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.rad, 0, 7);
      ctx.strokeStyle = "rgba(239,226,180," + (rp.life * 0.5) + ")"; ctx.lineWidth = 1.2; ctx.stroke();
    }
    // koi
    for (var i = 0; i < koi.length; i++) {
      var k = koi[i];
      if (!reduce) {
        k.x += Math.cos(k.a) * k.sp; k.y += Math.sin(k.a) * k.sp;
        k.a += (Math.random() - 0.5) * 0.03;
        if (k.x < -40) k.x = W + 40; if (k.x > W + 40) k.x = -40;
        if (k.y < 40) k.a = Math.abs(k.a); if (k.y > H - 40) k.a = -Math.abs(k.a);
      }
      drawKoi(k);
    }
    if (!document.hidden && !reduce) raf = requestAnimationFrame(step);
  }
  function ripple(x, y) { ripples.push({ x: x, y: y, rad: 2, life: 1 }); }
  /* after a draw, bring the full-width reveal into view (it sits below the
     pond in the new layout, so on a stacked/mobile view it can be off screen) */
  function revealIntoView() {
    if (!reveal || !reveal.scrollIntoView) return;
    var r = reveal.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < 0 || r.bottom > vh) {
      try { reveal.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }); } catch (e) {}
    }
  }
  function nudgeKoiToward(x, y) {
    // send the nearest koi darting toward the touch, then draw
    var best = null, bd = 1e9;
    for (var i = 0; i < koi.length; i++) {
      var dx = koi[i].x - x, dy = koi[i].y - y, d = dx * dx + dy * dy;
      if (d < bd) { bd = d; best = koi[i]; }
    }
    if (best) best.a = Math.atan2(y - best.y, x - best.x);
  }

  if (ctx) {
    size(); seed();
    if (!reduce) raf = requestAnimationFrame(step); else step();
    window.addEventListener("resize", function () { cancelAnimationFrame(raf); size(); seed(); if (!reduce) raf = requestAnimationFrame(step); else step(); });
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduce) raf = requestAnimationFrame(step);
    });
    // pause the koi loop while the pond is scrolled out of view (big win on the long hub)
    if (!reduce && "IntersectionObserver" in window) {
      var pondVis = true;
      new IntersectionObserver(function (es) {
        var vis = es[0].isIntersecting;
        if (vis && !pondVis) { cancelAnimationFrame(raf); raf = requestAnimationFrame(step); }
        else if (!vis && pondVis) { cancelAnimationFrame(raf); }
        pondVis = vis;
      }, { threshold: 0 }).observe(pond);
    }
    pond.addEventListener("click", function (e) {
      if (e.target.closest(".pv-draw")) return; // button handles its own
      var r = pond.getBoundingClientRect();
      var x = e.clientX - r.left, y = e.clientY - r.top;
      ripple(x, y); nudgeKoiToward(x, y);
      pond.classList.add("is-drawn");
      draw(true);
      revealIntoView();
    });
  }
  if (drawBtn) drawBtn.addEventListener("click", function () {
    pond.classList.add("is-drawn");
    if (ctx) ripple(W * (0.3 + Math.random() * 0.4), H * (0.3 + Math.random() * 0.4));
    draw(true);
    revealIntoView();
  });

  /* seed the reveal with today's proverb so it is never empty */
  draw(false);

  /* ---------- filtering ---------- */
  var grid = document.getElementById("pvGrid");
  var cards = grid ? Array.prototype.slice.call(grid.querySelectorAll(".pv-card")) : [];
  var countEl = document.getElementById("pvCount");
  var emptyEl = document.getElementById("pvEmpty");
  var clearEl = document.getElementById("pvClear");
  var searchEl = document.getElementById("pvSearch");
  var state = { theme: "", cat: "", orient: "", animal: "", el: "", q: "" };
  var ATTR = { theme: "theme", cat: "cat", orient: "orient", animal: "animal", el: "el" };

  function apply() {
    var shown = 0;
    var q = state.q.trim();
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i], ok = true, g;
      for (g in ATTR) {
        if (state[g] && c.getAttribute("data-" + ATTR[g]) !== state[g]) { ok = false; break; }
      }
      if (ok && q && c.getAttribute("data-q").indexOf(q) === -1) ok = false;
      c.hidden = !ok;
      if (ok) shown++;
    }
    if (countEl) countEl.textContent = shown === cards.length ? (cards.length + " proverbs") : (shown + " of " + cards.length);
    if (emptyEl) emptyEl.hidden = shown !== 0;
    var any = state.theme || state.cat || state.orient || state.animal || state.el || state.q;
    if (clearEl) clearEl.hidden = !any;
  }
  document.addEventListener("click", function (e) {
    var chip = e.target.closest(".pv-chip");
    if (!chip) return;
    var g = chip.getAttribute("data-group"), v = chip.getAttribute("data-val");
    state[g] = v;
    var sibs = chip.parentNode.querySelectorAll(".pv-chip");
    for (var i = 0; i < sibs.length; i++) sibs[i].classList.toggle("is-on", sibs[i] === chip);
    apply();
  });
  if (searchEl) searchEl.addEventListener("input", function () {
    state.q = searchEl.value.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    apply();
  });
  if (clearEl) clearEl.addEventListener("click", function () {
    state = { theme: "", cat: "", orient: "", animal: "", el: "", q: "" };
    if (searchEl) searchEl.value = "";
    var groups = document.querySelectorAll(".pv-chips");
    for (var i = 0; i < groups.length; i++) {
      var cs = groups[i].querySelectorAll(".pv-chip");
      for (var j = 0; j < cs.length; j++) cs[j].classList.toggle("is-on", cs[j].getAttribute("data-val") === "");
    }
    apply();
  });

  /* ---------- background starfield behind the whole page ---------- */
  (function () {
    var cv = document.getElementById("sky"); if (!cv || !cv.getContext) return;
    var x = cv.getContext("2d");
    function sz() { cv.width = innerWidth; cv.height = innerHeight; }
    sz(); addEventListener("resize", sz);
    var n = reduce ? 28 : 56;
    var st = Array.from({ length: n }, function () { return { x: Math.random() * cv.width, y: Math.random() * cv.height, r: Math.random() * 1.2 + 0.2, a: Math.random(), s: Math.random() * 0.02 + 0.004 }; });
    (function f() {
      x.clearRect(0, 0, cv.width, cv.height);
      for (var i = 0; i < st.length; i++) { var s = st[i]; if (!reduce) s.a += s.s; var al = 0.25 + Math.abs(Math.sin(s.a)) * 0.5; x.beginPath(); x.arc(s.x, s.y, s.r, 0, 7); x.fillStyle = "rgba(245,236,210," + al + ")"; x.fill(); }
      if (!document.hidden && !reduce) requestAnimationFrame(f);
    })();
  })();
})();
