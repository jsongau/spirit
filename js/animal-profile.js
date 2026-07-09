/* ============================================================
   ANIMAL PROFILE — ES module entry point for all v2 Zodi Animal pages.
   Imports from ./modules/ and wires non-modular page-level behaviour
   (TTS, moon calendar, ritual chips, palette bar sync).
   Contract:
     <body class="pf-page" data-animal="<slug>">
     <script type="application/json" id="animal-data">…</script>
     <script type="module" src="/js/animal-profile.js"></script>
   ============================================================ */

import { initTabGroups }      from './modules/tabs.js';
import { initMirror }         from './modules/primal-mirror.js';
import { initSignBalance }    from './modules/sign-balance.js';
import { initReadingProgress } from './modules/reading-progress.js';
import { initSaveShare }      from './modules/save-share.js';
import { initBondLab }        from './modules/bond-lab.js';
import { initPersonality }    from './modules/personality.js';
import { initExploration }    from './modules/exploration.js';

/* ── Shared context ─────────────────────────────────────────── */
const body   = document.body;
const slug   = body.dataset.animal || 'animal';
const PREFIX = `zodi:${slug}:`;

const ls = {
  get:     k     => { try { return localStorage.getItem(PREFIX + k); }           catch { return null; } },
  set:     (k,v) => { try { localStorage.setItem(PREFIX + k, v); }               catch {} },
  getJSON: (k,d) => { try { const r = localStorage.getItem(PREFIX + k); return r ? JSON.parse(r) : d; } catch { return d; } },
  setJSON: (k,v) => { try { localStorage.setItem(PREFIX + k, JSON.stringify(v)); } catch {} },
};

const dataEl = document.getElementById('animal-data');
const data   = dataEl ? (() => { try { return JSON.parse(dataEl.textContent); } catch { return {}; } })() : {};

const ctx = { slug, ls, data };

body.classList.add('js-on');

/* ── Module init ────────────────────────────────────────────── */
initTabGroups();          // tabs: every [role=tablist] on the page incl. mirror, stones, work, palette, bonds
initMirror(ctx);          // mirror: track fill + visited state, reacts to tab events from initTabGroups
initSignBalance(ctx);     // cross-weigh slider + half-highlight
initReadingProgress(ctx); // rail chapter tracking + top strip
initSaveShare(ctx);       // save/share buttons + account modal
initBondLab(ctx);         // bond test form (year wheel, month, day → animal reveal)
initPersonality(ctx);     // in-page personality test (gracefully skips if modal absent)
initExploration(ctx);     // personalise "best next" card from local signals

/* ── Palette bar ↔ tabs sync ───────────────────────────────── */
/* initTabGroups wires the .palette-tabs tablist. The .palette-bar__seg
   click-highlight is a visual extra not covered by the tabs engine. */
const paletteBar = document.querySelector('.palette-bar');
if (paletteBar) {
  const segs = paletteBar.querySelectorAll('.palette-bar__seg');
  const palTabs = document.querySelectorAll('.palette-tabs [role="tab"]');

  function syncPalette(role) {
    segs.forEach(s => s.classList.toggle('is-active', s.dataset.role === role));
    palTabs.forEach(t => {
      if (t.dataset.role === role && t.getAttribute('aria-selected') !== 'true') t.click();
    });
  }

  segs.forEach(seg => seg.addEventListener('click', () => syncPalette(seg.dataset.role)));

  // Mirror tab clicks back to bar highlight
  document.querySelector('.palette-tabs')?.addEventListener('tabchange', e => {
    const role = e.detail?.tab?.dataset?.role;
    if (role) segs.forEach(s => s.classList.toggle('is-active', s.dataset.role === role));
  });
}

/* ── Ritual chips (Mirror / Awakened gate) ──────────────────── */
const chips = document.querySelectorAll('.ritual-chip');
const formLine   = document.getElementById('formLine');
const formCustom = document.getElementById('formCustom');
const formCopy   = document.getElementById('formCopy');
const ritualTpl  = data.ritualTemplate || 'I {end}.';

chips.forEach(chip => {
  chip.addEventListener('click', function () {
    const wasPressed = this.getAttribute('aria-pressed') === 'true';
    chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
    if (!wasPressed) {
      this.setAttribute('aria-pressed', 'true');
      if (formLine) {
        formLine.textContent = ritualTpl.replace('{end}', this.textContent);
        formLine.hidden = false;
      }
      if (formCustom) formCustom.value = '';
    }
  });
});

if (formCustom) {
  formCustom.addEventListener('input', function () {
    if (!this.value) return;
    chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
    if (formLine) {
      formLine.textContent = ritualTpl.replace('{end}', this.value);
      formLine.hidden = false;
    }
  });
}

if (formCopy && formLine) {
  formCopy.addEventListener('click', () => {
    if (!formLine.textContent) return;
    navigator.clipboard?.writeText(formLine.textContent)
      .then(() => { const old = formCopy.textContent; formCopy.textContent = 'Copied!'; setTimeout(() => { formCopy.textContent = old; }, 1800); })
      .catch(() => prompt('Copy this:', formLine.textContent));
  });
}

/* ── Stone "Choose this stone" buttons ──────────────────────── */
/* (stone cabinet tab switching is handled by initTabGroups;
   the choose/persist action is separate UI) */
const stoneChooseBtns = document.querySelectorAll('.choose[data-stone]');
stoneChooseBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    const stone = this.dataset.stone;
    stoneChooseBtns.forEach(b => {
      const active = b.dataset.stone === stone;
      b.setAttribute('aria-pressed', String(active));
      b.textContent = active ? '✓ Your stone' : 'Choose this stone';
    });
    ls.set('stone', stone);
  });
});

const savedStone = ls.get('stone');
if (savedStone) {
  const stoneBtn = document.querySelector(`.choose[data-stone="${CSS.escape(savedStone)}"]`);
  if (stoneBtn) { stoneBtn.setAttribute('aria-pressed', 'true'); stoneBtn.textContent = '✓ Your stone'; }
  // also activate the tab
  const stoneTab = document.getElementById(`stab-${savedStone}`);
  if (stoneTab && stoneTab.getAttribute('aria-selected') !== 'true') stoneTab.click();
}

/* ── Moon "Add to calendar" ─────────────────────────────────── */
const moonCal = document.getElementById('moonAddCal');
if (moonCal) {
  moonCal.addEventListener('click', function () {
    const title   = encodeURIComponent(this.dataset.title || 'Power Moon');
    const date    = this.dataset.date || '';
    const details = encodeURIComponent(this.dataset.desc || '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${date}/${date}&details=${details}`;
    window.open(url, '_blank', 'noopener');
  });
}

/* ── Proverb TTS ─────────────────────────────────────────────── */
const proverbSay = document.querySelector('.pf-proverb__say');
if (proverbSay && 'speechSynthesis' in window) {
  proverbSay.addEventListener('click', function () {
    const text = this.dataset.say;
    if (!text) return;
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'zh-TW';
    speechSynthesis.cancel();
    speechSynthesis.speak(utt);
  });
}

/* ── Mobile chapter drawer ──────────────────────────────────── */
const chapToggle = document.getElementById('rail-chapters-toggle');
const chapList   = document.getElementById('rail-mobile-list');
if (chapToggle && chapList) {
  chapToggle.addEventListener('click', () => {
    const open = chapToggle.getAttribute('aria-expanded') === 'true';
    chapToggle.setAttribute('aria-expanded', String(!open));
    chapList.hidden = open;
  });
  // close drawer on link click
  chapList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    chapToggle.setAttribute('aria-expanded', 'false');
    chapList.hidden = true;
  }));
}
