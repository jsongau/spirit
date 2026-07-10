/* Ambience — the small stuff, one module: scroll reveals, the dossier
   radar, feng shui palette tints, add-to-calendar, and proverb speech.
   Every feature degrades to nothing; content never depends on it. */
export function initAmbience(ctx) {
  reveals(ctx); radar(ctx); palette(); calendar(ctx); speech(); equalizeProverbTiles();
}

/* Keep the proverb character tiles a uniform size even when a gloss needs more
   than one word (e.g. "great vessel"). Every tile is grown to the width of the
   widest, and the gloss is allowed to wrap, so the row never looks ragged. */
function equalizeProverbTiles() {
  const tiles = [...document.querySelectorAll('.pf-proverb__char')];
  if (tiles.length < 2) return;
  const apply = () => {
    tiles.forEach(t => { t.style.width = ''; });
    let w = 0;
    tiles.forEach(t => { w = Math.max(w, t.offsetWidth); });
    tiles.forEach(t => { t.style.width = w + 'px'; });
  };
  apply();
  let raf;
  addEventListener('resize', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(apply); }, { passive: true });
}

/* ---- reveal on scroll ---- */
function reveals(ctx) {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (ctx.reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-in')); return;
  }
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }), { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
  items.forEach(el => io.observe(el));
}

/* ---- dossier radar + axis readings ---- */
function radar(ctx) {
  const AXES = ctx.data.axes || [];
  const rings = document.getElementById('ax-rings');
  const spokesG = document.getElementById('ax-spokes');
  const nodesG = document.getElementById('ax-nodes');
  const shape = document.getElementById('ax-shape');
  const btnList = document.getElementById('ax-axisBtns');
  const readEl = document.getElementById('ax-axisRead');
  if (!AXES.length || !rings || !btnList || !readEl) return;

  const NS = 'http://www.w3.org/2000/svg';
  const CX = 110, CY = 110, R = 84, N = AXES.length, MAX = 5;
  const pt = (i, r) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI / N);
    return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
  };
  for (let ring = 1; ring <= MAX; ring++) {
    const poly = document.createElementNS(NS, 'polygon');
    poly.setAttribute('class', 'grid-ring');
    poly.setAttribute('points', AXES.map((_, i) => { const p = pt(i, R * ring / MAX); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(' '));
    rings.appendChild(poly);
  }
  const spokes = [], vlines = [], nodes = [], btns = [], shapePts = [];
  AXES.forEach((ax, i) => {
    const edge = pt(i, R);
    const sp = document.createElementNS(NS, 'line');
    sp.setAttribute('class', 'spoke');
    sp.setAttribute('x1', CX); sp.setAttribute('y1', CY);
    sp.setAttribute('x2', edge.x.toFixed(1)); sp.setAttribute('y2', edge.y.toFixed(1));
    spokesG.appendChild(sp); spokes.push(sp);
    const vp = pt(i, R * ax.value / MAX);
    /* highlight line runs center to the value dot only */
    const vl = document.createElementNS(NS, 'line');
    vl.setAttribute('class', 'vspoke');
    vl.setAttribute('x1', CX); vl.setAttribute('y1', CY);
    vl.setAttribute('x2', vp.x.toFixed(1)); vl.setAttribute('y2', vp.y.toFixed(1));
    spokesG.appendChild(vl); vlines.push(vl);
    shapePts.push(`${vp.x.toFixed(1)},${vp.y.toFixed(1)}`);
    const node = document.createElementNS(NS, 'circle');
    node.setAttribute('class', 'node' + (ax.signature ? ' sig' : ''));
    node.setAttribute('cx', vp.x.toFixed(1)); node.setAttribute('cy', vp.y.toFixed(1)); node.setAttribute('r', '4');
    nodesG.appendChild(node); nodes.push(node);
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'axis-btn' + (ax.signature ? ' is-signature' : '');
    b.setAttribute('aria-pressed', 'false');
    b.dataset.index = i;
    b.innerHTML = `${ax.label} <span class="v" aria-hidden="true">${ax.value}/5</span>` +
      (ax.signature ? ' <span class="sig-badge" aria-hidden="true">Signature</span>' : '');
    let lbl = `${ax.label}, ${ax.value} of 5, leaning toward ${ax.value >= 3 ? ax.label : ax.opposite}; the other side of this trait is ${ax.opposite}`;
    if (ax.signature) lbl += ', its defining trait';
    b.setAttribute('aria-label', lbl);
    li.appendChild(b); btnList.appendChild(li); btns.push(b);
  });
  shape.setAttribute('points', shapePts.join(' '));

  const DEFAULT = readEl.innerHTML;
  let active = -1;
  const clear = () => { vlines.forEach(s => s.classList.remove('lit')); nodes.forEach(n => n.classList.remove('lit')); btns.forEach(b => b.setAttribute('aria-pressed', 'false')); };
  btns.forEach(b => b.addEventListener('click', () => {
    const i = +b.dataset.index;
    if (i === active) { clear(); active = -1; readEl.innerHTML = DEFAULT; return; }
    clear(); active = i;
    vlines[i].classList.add('lit'); nodes[i].classList.add('lit'); b.setAttribute('aria-pressed', 'true');
    const ax = AXES[i];
    const mark = (ax.value / 5 * 100).toFixed(0);
    readEl.innerHTML =
      `<span class="who">${ax.label}</span>` +
      `<span class="poles" aria-hidden="true"><span class="${ax.value < 3 ? 'pole-here' : ''}">${ax.opposite}</span>` +
      `<span class="pole-line" style="--mark:${mark}%"></span>` +
      `<span class="${ax.value >= 3 ? 'pole-here' : ''}">${ax.label}</span></span>` +
      ax.read +
      (ax.signature ? `<span class="sig-note">This animal’s defining trait</span>` : '');
  }));
}

/* ---- feng shui palette ---- */
function palette() {
  const pal = document.querySelector('.pf-palette');
  if (!pal) return;
  const h2r = h => { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.substr(i, 2), 16)); };
  const r2h = a => '#' + a.map(v => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('').toUpperCase();
  const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
  const IVORY = [236, 231, 216], INK = [13, 14, 24];

  pal.querySelectorAll('.palette-panel').forEach(p => {
    const base = h2r(p.dataset.base);
    const hexes = { base: p.dataset.base.toUpperCase(), light: r2h(mix(base, IVORY, .42)), dark: r2h(mix(base, INK, .40)) };
    p.querySelectorAll('.tint').forEach(btn => {
      const k = btn.dataset.tint, hex = hexes[k];
      const label = k[0].toUpperCase() + k.slice(1) + ' ' + hex;
      btn.textContent = label;
      btn.addEventListener('click', () => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(hex).then(() => {
          btn.classList.add('is-copied'); btn.textContent = 'Copied';
          setTimeout(() => { btn.classList.remove('is-copied'); btn.textContent = label; }, 1100);
        });
      });
    });
  });
  /* bar segments mirror the role tabs (tabs engine handles the tabs) */
  const segs = [...pal.querySelectorAll('.palette-bar__seg')];
  const tabs = [...pal.querySelectorAll('.palette-tabs [role="tab"]')];
  const sync = role => segs.forEach(s => s.classList.toggle('is-active', s.dataset.role === role));
  segs.forEach(s => s.addEventListener('click', () => {
    const tab = tabs.find(t => t.dataset.role === s.dataset.role);
    if (tab) tab.click();
  }));
  pal.addEventListener('tabchange', e => sync(e.detail.tab.dataset.role));
  sync('ground');
}

/* ---- add to calendar (.ics) ---- */
function calendar(ctx) {
  const btn = document.getElementById('moonAddCal');
  if (!btn) return;
  const labelEl = btn.querySelector('span') || btn;
  const label = labelEl.textContent;
  /* live "N days from today" countdown to the power moon */
  const cd = document.querySelector('[data-moon-countdown]');
  if (cd && btn.dataset.date) {
    const d = btn.dataset.date;
    const target = new Date(+d.slice(0, 4), +d.slice(4, 6) - 1, +d.slice(6, 8));
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const days = Math.round((target - today) / 86400000);
    cd.innerHTML = days > 1 ? `<b>${days} days</b> from today.`
      : days === 1 ? `<b>Tomorrow.</b>`
      : days === 0 ? `<b>Tonight.</b>`
      : `It has passed for this cycle.`;
  }
  const esc = s => String(s).replace(/([,;\\])/g, '\\$1').replace(/\n/g, '\\n');
  const nextDay = ymd => {
    const d = new Date(+ymd.slice(0, 4), +ymd.slice(4, 6) - 1, +ymd.slice(6, 8) + 1);
    const p = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
  };
  btn.addEventListener('click', () => {
    const { date, title, url, desc } = btn.dataset;
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Zodi Animal//Power Moon//EN', 'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT', `UID:${ctx.slug}-powermoon-${date}@zodianimal.com`, `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${date}`, `DTEND;VALUE=DATE:${nextDay(date)}`,
      `SUMMARY:${esc(title)}`, `DESCRIPTION:${esc(desc + ' ' + url)}`, `URL:${url}`,
      'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    a.download = `${ctx.slug}-power-moon.ics`;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
    btn.classList.add('is-added'); labelEl.textContent = 'Added to calendar';
    setTimeout(() => { btn.classList.remove('is-added'); labelEl.textContent = label; }, 2200);
  });
}

/* ---- proverb pronunciation ----
   One whole-verse button (.pf-proverb__say) reads the full proverb; the
   character tiles (.pf-proverb__char) read one hanzi each. Pinyin is shown
   once, on the tiles — never doubled on the ruby above the verse.
   Voice pick prefers a proper, natural Mandarin voice over the OS default:
   Google 普通话 and Microsoft Neural (Xiaoxiao/Yunxi/Xiaoyi) first, then
   Apple's Ting-Ting/Meijia, then any zh/cmn voice. getVoices() populates
   asynchronously, so we resolve the voice at click time and also listen
   for voiceschanged. */
function speech() {
  const main = [...document.querySelectorAll('.pf-proverb__say, .pf-ziwei__say')];
  const chars = [...document.querySelectorAll('.pf-proverb__char[data-say]')];
  const btns = [...main, ...chars];
  if (!btns.length) return;
  const hint = document.querySelector('.pf-proverb__hint');
  if (!('speechSynthesis' in window)) {
    /* no TTS: hide the pronounce buttons, but keep the pinyin, which is still
       useful to read. */
    main.forEach(b => { b.hidden = true; });
    if (hint) hint.hidden = true;
    return;
  }

  /* preference-ranked Mandarin voice, highest quality first */
  const RANK = [
    v => /google/i.test(v.name) && /^(zh|cmn)/i.test(v.lang),          // Google 普通话 (Chrome)
    v => /(xiaoxiao|yunxi|xiaoyi|yunyang|neural).*?/i.test(v.name) && /^zh/i.test(v.lang), // MS Neural
    v => /(ting-?ting|tingting|meijia|sinji|li-?mu|yu-?shu)/i.test(v.name), // Apple
    v => /^zh-CN|^cmn/i.test(v.lang),                                   // any Mandarin, mainland
    v => /^zh/i.test(v.lang)                                            // any Chinese
  ];
  let cached = null;
  const pickVoice = () => {
    const voices = speechSynthesis.getVoices() || [];
    if (!voices.length) return null;
    for (const test of RANK) { const hit = voices.find(test); if (hit) return hit; }
    return null;
  };
  const refresh = () => { cached = pickVoice() || cached; };
  refresh();
  if (typeof speechSynthesis.addEventListener === 'function') {
    speechSynthesis.addEventListener('voiceschanged', refresh);
  }

  btns.forEach(b => b.addEventListener('click', () => {
    const u = new SpeechSynthesisUtterance(b.dataset.say);
    const v = cached || pickVoice();
    if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = 'zh-CN'; }
    /* slower for a single character or a star name than for the flowing verse */
    u.rate = (b.classList.contains('pf-proverb__char') || b.classList.contains('pf-ziwei__say')) ? 0.64 : 0.78;
    u.pitch = 1;
    u.onstart = () => b.classList.add('is-speaking');
    u.onend = u.onerror = () => b.classList.remove('is-speaking');
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  }));
}
