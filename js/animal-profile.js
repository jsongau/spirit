/* ============================================================
   ANIMAL PROFILE — entry module for all 144 Zodi Animal pages.
   Self-contained (no module imports required).
   Progressive enhancement: HTML is fully readable without JS.
   Contract: <body class="pf-page" data-animal="<slug>">
   JSON island: <script type="application/json" id="animal-data">
   ============================================================ */

(function () {
  'use strict';

  const body = document.body;
  const slug = body.dataset.animal || 'animal';
  const LS_PREFIX = `zodi:${slug}:`;

  function ls(k, v) {
    try {
      if (v === undefined) return localStorage.getItem(LS_PREFIX + k);
      localStorage.setItem(LS_PREFIX + k, v);
    } catch (_) {}
  }

  function readData() {
    const el = document.getElementById('animal-data');
    if (!el) return {};
    try { return JSON.parse(el.textContent); } catch { return {}; }
  }

  const DATA = readData();
  body.classList.add('js-on');

  /* ---- Reading progress bar (mobile) ---- */
  const progressBar = document.getElementById('read-progress');
  if (progressBar) {
    function updateProgress() {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.setProperty('--read', docH > 0 ? (window.scrollY / docH).toFixed(3) : 0);
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---- Rail chapter tracking ---- */
  const railChapters = document.querySelectorAll('.rail-chapter[data-target]');
  const railProgress = document.getElementById('rail-progress');
  let visitedCount = 0;

  if (railChapters.length) {
    const targets = Array.from(railChapters).map(ch => {
      const id = ch.dataset.target;
      return { ch, el: document.getElementById(id) };
    }).filter(x => x.el);

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const found = targets.find(t => t.el === e.target);
        if (!found) return;
        const { ch } = found;
        if (e.isIntersecting) {
          railChapters.forEach(c => c.removeAttribute('aria-current'));
          ch.setAttribute('aria-current', 'true');
          if (!ch.classList.contains('is-visited')) {
            ch.classList.add('is-visited');
            visitedCount++;
            if (railProgress) {
              railProgress.innerHTML = `<b>${visitedCount}</b> of ${railChapters.length} chapters`;
            }
          }
        }
      });
    }, { rootMargin: '-10% 0px -60% 0px' });

    targets.forEach(({ el }) => obs.observe(el));
  }

  /* ---- Mobile chapter drawer ---- */
  const chapToggle = document.getElementById('rail-chapters-toggle');
  const chapList = document.getElementById('rail-mobile-list');
  if (chapToggle && chapList) {
    chapToggle.addEventListener('click', () => {
      const open = chapToggle.getAttribute('aria-expanded') === 'true';
      chapToggle.setAttribute('aria-expanded', String(!open));
      chapList.hidden = open;
    });
  }

  /* ---- Generic tab group handler ---- */
  function initTabGroup(container) {
    const tabs = container.querySelectorAll('[role="tab"]');
    const panels = container.querySelectorAll('[role="tabpanel"]');
    if (!tabs.length) return;

    function activate(tab) {
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.tabIndex = -1;
      });
      panels.forEach(p => p.classList.remove('is-active'));
      tab.setAttribute('aria-selected', 'true');
      tab.tabIndex = 0;
      const panelId = tab.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      if (panel) panel.classList.add('is-active');
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(tab));
      tab.addEventListener('keydown', e => {
        let next = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (next) { e.preventDefault(); activate(next); next.focus(); }
      });
    });
  }

  // Init all tab groups except the mirror (handled separately)
  document.querySelectorAll('[role="tablist"]').forEach(tl => {
    if (!tl.closest('.mirror-track-wrap') && !tl.classList.contains('pf-bonds__tabs')) initTabGroup(tl);
  });

  /* ---- Palette bar tab sync ---- */
  const paletteBar = document.querySelector('.palette-bar');
  const paletteTabs = document.querySelectorAll('.palette-tabs [role="tab"]');
  const palettePanels = document.querySelectorAll('.palette-panel');
  if (paletteBar) {
    function activatePalette(role) {
      paletteTabs.forEach(t => {
        const active = t.dataset.role === role;
        t.setAttribute('aria-selected', String(active));
        t.tabIndex = active ? 0 : -1;
      });
      palettePanels.forEach(p => p.classList.toggle('is-active', p.dataset.role === role));
      paletteBar.querySelectorAll('.palette-bar__seg').forEach(seg => {
        seg.classList.toggle('is-active', seg.dataset.role === role);
      });
    }
    paletteBar.querySelectorAll('.palette-bar__seg').forEach(seg => {
      seg.addEventListener('click', () => activatePalette(seg.dataset.role));
    });
    paletteTabs.forEach(tab => {
      tab.addEventListener('click', () => activatePalette(tab.dataset.role));
    });
  }

  /* ---- Primal Mirror ---- */
  const mirrorPanels = document.querySelectorAll('[data-mirror]');
  const mirrorTabs = document.querySelectorAll('.mstation[data-mirror]');
  const mtrackFill = document.getElementById('mtrack-fill');
  const MIRROR_ORDER = ['instinct', 'gift', 'guard', 'shadow', 'awakened'];

  function activateMirror(key) {
    const idx = MIRROR_ORDER.indexOf(key);
    mirrorTabs.forEach(tab => {
      const active = tab.dataset.mirror === key;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    if (mtrackFill && idx >= 0) {
      mtrackFill.style.width = `${(idx / (MIRROR_ORDER.length - 1)) * 100}%`;
    }
    mirrorPanels.forEach(p => {
      p.classList.toggle('is-active', p.dataset.mirror === key);
    });
    ls('mirror', key);
  }

  mirrorTabs.forEach(tab => {
    tab.addEventListener('click', () => activateMirror(tab.dataset.mirror));
  });

  document.querySelectorAll('.mnext[data-mgoto], .mprev[data-mgoto]').forEach(btn => {
    btn.addEventListener('click', () => activateMirror(btn.dataset.mgoto));
  });

  const savedMirror = ls('mirror');
  if (savedMirror && MIRROR_ORDER.includes(savedMirror)) activateMirror(savedMirror);
  else activateMirror('instinct');

  /* ---- Ritual chips ---- */
  document.querySelectorAll('.ritual-chip').forEach(chip => {
    chip.addEventListener('click', function () {
      const pressed = this.getAttribute('aria-pressed') === 'true';
      document.querySelectorAll('.ritual-chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
      if (!pressed) {
        this.setAttribute('aria-pressed', 'true');
        const line = document.getElementById('formLine');
        const customInput = document.getElementById('formCustom');
        if (line) {
          const template = (DATA.ritualTemplate || 'I {end}.').replace('{end}', this.textContent);
          line.textContent = template;
          line.hidden = false;
          if (customInput) customInput.value = '';
        }
      }
    });
  });

  const formCustom = document.getElementById('formCustom');
  if (formCustom) {
    formCustom.addEventListener('input', function () {
      const line = document.getElementById('formLine');
      if (line && this.value) {
        line.textContent = (DATA.ritualTemplate || 'I {end}.').replace('{end}', this.value);
        line.hidden = false;
        document.querySelectorAll('.ritual-chip').forEach(c => c.setAttribute('aria-pressed', 'false'));
      }
    });
  }

  /* ---- Cross-weigh slider ---- */
  const fusion = document.getElementById('fusion');
  if (fusion && DATA.dial) {
    const readEl = document.getElementById('fusionRead');
    const stateEl = document.getElementById('cwState');
    const westPct = document.getElementById('cwWestPct');
    const eastPct = document.getElementById('cwEastPct');
    const pcts = [80, 65, 50, 35, 20];

    function updateFusion(val) {
      const idx = Math.min(parseInt(val, 10), (DATA.dial.reads || []).length - 1);
      if (readEl && DATA.dial.reads) readEl.textContent = DATA.dial.reads[idx] || '';
      if (stateEl && DATA.dial.states) stateEl.textContent = DATA.dial.states[idx] || '';
      const wp = pcts[idx] || 50;
      if (westPct) westPct.textContent = wp;
      if (eastPct) eastPct.textContent = 100 - wp;
    }

    fusion.addEventListener('input', e => updateFusion(e.target.value));
    updateFusion(fusion.value);
  }

  /* ---- Radar chart ---- */
  const radarSvg = document.querySelector('.radar');
  const axNodes = document.getElementById('ax-nodes');
  const axShape = document.getElementById('ax-shape');
  const axRings = document.getElementById('ax-rings');
  const axSpokes = document.getElementById('ax-spokes');
  const axBtns = document.getElementById('ax-axisBtns');
  const axRead = document.getElementById('ax-axisRead');

  if (radarSvg && DATA.axes) {
    const axes = DATA.axes;
    const N = axes.length;
    const CX = 110, CY = 110, R = 82;

    function getPoint(i, val) {
      const angle = (Math.PI * 2 * i / N) - Math.PI / 2;
      const r = R * (val / 5);
      return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
    }

    let ringsHTML = '';
    for (let ring = 1; ring <= 5; ring++) {
      const pts = axes.map((_, i) => getPoint(i, ring).map(v => v.toFixed(1)).join(','));
      ringsHTML += `<polygon points="${pts.join(' ')}" fill="none" stroke="rgba(214,193,140,${ring === 5 ? '.18' : '.08'})" stroke-width="1"/>`;
    }
    if (axRings) axRings.innerHTML = ringsHTML;

    let spokesHTML = '';
    axes.forEach((ax, i) => {
      const [x, y] = getPoint(i, 5);
      spokesHTML += `<line x1="${CX}" y1="${CY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="rgba(214,193,140,.12)" stroke-width="1"/>`;
      const [lx, ly] = getPoint(i, 5.9);
      spokesHTML += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-family="Geist,system-ui,sans-serif" font-size="8" fill="#adaec2">${ax.label}</text>`;
    });
    if (axSpokes) axSpokes.innerHTML = spokesHTML;

    const pts = axes.map((ax, i) => getPoint(i, ax.value).map(v => v.toFixed(1)).join(','));
    if (axShape) axShape.setAttribute('points', pts.join(' '));

    let nodesHTML = '';
    axes.forEach((ax, i) => {
      const [x, y] = getPoint(i, ax.value);
      nodesHTML += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${ax.signature ? 5 : 3.5}" fill="${ax.signature ? '#d6c18c' : '#5a5b70'}" stroke="var(--a-night,#0d0e18)" stroke-width="1.5" data-ax="${ax.key}"/>`;
    });
    if (axNodes) axNodes.innerHTML = nodesHTML;

    if (axBtns) {
      axBtns.innerHTML = axes.map(ax =>
        `<li><button type="button" class="axis-btn${ax.signature ? ' is-sig' : ''}" data-ax="${ax.key}">${ax.label} <b>${ax.value}/5</b></button></li>`
      ).join('');
      axBtns.querySelectorAll('.axis-btn').forEach(btn => {
        btn.addEventListener('click', function () {
          axBtns.querySelectorAll('.axis-btn').forEach(b => b.classList.remove('is-active'));
          this.classList.add('is-active');
          const ax = axes.find(a => a.key === this.dataset.ax);
          if (ax && axRead) axRead.innerHTML = `<span class="who">${DATA.name || ''}</span> ${ax.read}`;
        });
      });
    }
  }

  /* ---- Stone chooser ---- */
  document.querySelectorAll('.choose[data-stone]').forEach(btn => {
    btn.addEventListener('click', function () {
      const stone = this.dataset.stone;
      document.querySelectorAll('.choose[data-stone]').forEach(b => {
        const active = b.dataset.stone === stone;
        b.setAttribute('aria-pressed', String(active));
        b.textContent = active ? '✓ Your stone' : 'Choose this stone';
      });
      ls('stone', stone);
    });
  });

  const savedStone = ls('stone');
  if (savedStone) {
    const stoneBtn = document.querySelector(`.choose[data-stone="${savedStone}"]`);
    if (stoneBtn) {
      stoneBtn.setAttribute('aria-pressed', 'true');
      stoneBtn.textContent = '✓ Your stone';
      const tabBtn = document.getElementById(`stab-${savedStone}`);
      if (tabBtn) tabBtn.click();
    }
  }

  /* ---- Moon calendar ---- */
  const moonCal = document.getElementById('moonAddCal');
  if (moonCal) {
    moonCal.addEventListener('click', function () {
      const title = encodeURIComponent(this.dataset.title || 'Power Moon');
      const date = this.dataset.date || '';
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}/${date}&details=${encodeURIComponent(this.dataset.desc || '')}`;
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---- Bond lab year slider ---- */
  const bwRange = document.getElementById('bw-range');
  const bwHanzi = document.getElementById('bw-hanzi');
  const bwYear = document.getElementById('bw-year');
  const bwAnimal = document.getElementById('bw-animal');
  const CHINESE_YEARS = ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Goat','Monkey','Rooster','Dog','Pig'];
  const CHINESE_GLYPHS = ['鼠','牛','虎','兔','龍','蛇','馬','羊','猴','雞','狗','豬'];

  function yearToZodiac(yr) {
    const idx = ((yr - 2020) % 12 + 12) % 12;
    return { name: CHINESE_YEARS[idx], glyph: CHINESE_GLYPHS[idx] };
  }

  function updateBondYear(yr) {
    yr = Math.max(1940, Math.min(2026, parseInt(yr, 10) || 1990));
    const z = yearToZodiac(yr);
    if (bwHanzi) bwHanzi.textContent = z.glyph;
    if (bwYear) bwYear.textContent = yr;
    if (bwAnimal) bwAnimal.textContent = z.name;
    if (bwRange) bwRange.value = yr;
    const bwYearField = document.getElementById('bw-yearfield');
    if (bwYearField) bwYearField.value = yr;
  }

  if (bwRange) {
    bwRange.addEventListener('input', e => updateBondYear(e.target.value));
    updateBondYear(bwRange.value);
  }

  const bwMinus = document.getElementById('bw-minus');
  const bwPlus = document.getElementById('bw-plus');
  if (bwMinus) bwMinus.addEventListener('click', () => updateBondYear((parseInt(bwRange?.value || '1990') - 1)));
  if (bwPlus) bwPlus.addEventListener('click', () => updateBondYear((parseInt(bwRange?.value || '1990') + 1)));

  const bwYearField2 = document.getElementById('bw-yearfield');
  if (bwYearField2) bwYearField2.addEventListener('input', e => updateBondYear(e.target.value));

  document.querySelectorAll('.bw-month').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.bw-month').forEach(b => b.setAttribute('aria-pressed', 'false'));
      this.setAttribute('aria-pressed', 'true');
    });
  });

  /* ---- Relationship bonds tabs ---- */
  const bondsTabs = document.querySelectorAll('.pf-bonds__tabs [role="tab"][data-rel]');
  const bondsPanels = document.querySelectorAll('.rel-panel[data-rel]');
  bondsTabs.forEach((tab, i) => {
    tab.addEventListener('click', function () {
      bondsTabs.forEach(t => { t.setAttribute('aria-selected', 'false'); t.tabIndex = -1; });
      bondsPanels.forEach(p => p.classList.remove('is-active'));
      this.setAttribute('aria-selected', 'true');
      this.tabIndex = 0;
      bondsPanels.forEach(p => { if (p.dataset.rel === this.dataset.rel) p.classList.add('is-active'); });
    });
    tab.addEventListener('keydown', e => {
      let next = null;
      if (e.key === 'ArrowRight') next = bondsTabs[(i + 1) % bondsTabs.length];
      if (e.key === 'ArrowLeft') next = bondsTabs[(i - 1 + bondsTabs.length) % bondsTabs.length];
      if (next) { e.preventDefault(); next.click(); next.focus(); }
    });
  });

  /* ---- Save / Share ---- */
  function handleShare() {
    const line = DATA.shareLine || `I am the ${DATA.name}.`;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: `The ${DATA.name}`, text: line, url }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${line}\n${url}`)
        .then(() => alert('Copied to clipboard!'))
        .catch(() => prompt('Copy this:', `${line}\n${url}`));
    }
  }

  document.querySelectorAll('[data-action="share"]').forEach(btn => btn.addEventListener('click', handleShare));
  document.querySelectorAll('[data-action="save"]').forEach(btn => {
    btn.addEventListener('click', () => { ls('saved', 'true'); btn.textContent = '✓ Saved'; });
  });

  /* ---- Reveal on scroll ---- */
  if (window.IntersectionObserver) {
    const revObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); revObs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
  }

  /* ---- Proverb TTS ---- */
  const proverbSay = document.querySelector('.pf-proverb__say');
  if (proverbSay && window.speechSynthesis) {
    proverbSay.addEventListener('click', function () {
      const text = this.dataset.say;
      if (!text) return;
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = 'zh-TW';
      speechSynthesis.cancel();
      speechSynthesis.speak(utt);
    });
  }

})();
