/* Primal Mirror — the transformation track. One mechanism in five
   states: station tabs on a filling line, curiosity-gap next buttons,
   the identity-line ritual, a specimen-record completion moment, and
   re-entry that remembers where the reader stopped.
   Tab switching itself is the shared tabs engine; this module reacts.
   Everything stays local; nothing is sent anywhere. */
export function initMirror(ctx) {
  const mirror = document.getElementById('nature');
  if (!mirror) return;

  const tabs = [...mirror.querySelectorAll('.mirror-gates [role="tab"]')];
  const keys = tabs.map(t => t.dataset.mirror);
  const fill = document.getElementById('mtrack-fill');
  const note = document.getElementById('mirror-note');
  const visited = new Set(ctx.ls.getJSON('mirror:visited', []));

  const idx = k => keys.indexOf(k);
  const furthest = () => Math.max(-1, ...[...visited].map(idx));

  function paint(activeKey) {
    mirror.setAttribute('data-mirror-active', activeKey);
    tabs.forEach(t => t.toggleAttribute('data-visited', visited.has(t.dataset.mirror)));
    if (fill) {
      const i = idx(activeKey);
      fill.style.width = tabs.length > 1 ? `${(i / (tabs.length - 1)) * 100}%` : '0%';
    }
  }

  mirror.addEventListener('tabchange', e => {
    const key = e.detail.tab.dataset.mirror;
    if (!key) return;
    visited.add(key);
    ctx.ls.setJSON('mirror:visited', [...visited]);
    ctx.ls.set('mirror:station', key);
    paint(key);
  });

  /* next / back buttons drive the same tabs */
  mirror.addEventListener('click', e => {
    const go = e.target.closest('[data-mgoto]');
    if (!go) return;
    const tab = tabs.find(t => t.dataset.mirror === go.dataset.mgoto);
    if (tab) {
      tab.click();
      const stage = mirror.querySelector('.mirror-track-wrap');
      if (stage) stage.scrollIntoView({ behavior: ctx.reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }
  });

  /* ---- identity-line ritual + specimen record ---- */
  const ritual = document.getElementById('formRitual');
  const lineEl = document.getElementById('formLine');
  const customEl = document.getElementById('formCustom');
  const record = document.getElementById('mirror-record');
  const template = (ctx.data.ritualTemplate || 'I remain strong even when I {end}.');
  const chips = ritual ? [...ritual.querySelectorAll('.ritual-chip')] : [];

  const ending = () => {
    if (customEl && customEl.value.trim()) return customEl.value.trim();
    const sel = chips.find(c => c.getAttribute('aria-pressed') === 'true');
    return sel ? sel.textContent.trim() : '';
  };

  function showRecord() {
    if (!record) return;
    const when = ctx.ls.get('mirror:completed');
    if (!when) { record.hidden = true; return; }
    const date = new Date(when);
    const nice = isNaN(date) ? '' : date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    record.innerHTML = `
      <p class="mrec__head">Mirror read in full · five of five states</p>
      <p class="mrec__meta">Specimen ${ctx.data.serial || ''} of ${ctx.data.serialOf || '144'} · the ${ctx.data.name}${nice ? ` · recorded ${nice}` : ''}</p>`;
    record.hidden = false;
  }

  function update() {
    if (!lineEl) return;
    const end = ending();
    if (!end) { lineEl.hidden = true; lineEl.textContent = ''; return; }
    lineEl.textContent = template.replace('{end}', end);
    lineEl.hidden = false;
    ctx.ls.set('mirror:line', lineEl.textContent);
    if (!ctx.ls.get('mirror:completed')) {
      keys.forEach(k => visited.add(k));
      ctx.ls.setJSON('mirror:visited', [...visited]);
      ctx.ls.set('mirror:completed', new Date().toISOString());
    }
    const active = tabs.find(t => t.getAttribute('aria-selected') === 'true');
    paint(active ? active.dataset.mirror : keys[keys.length - 1]);
    showRecord();
  }

  chips.forEach(chip => chip.addEventListener('click', () => {
    const on = chip.getAttribute('aria-pressed') === 'true';
    chips.forEach(c => c.setAttribute('aria-pressed', 'false'));
    chip.setAttribute('aria-pressed', on ? 'false' : 'true');
    update();
  }));

  if (customEl) {
    const saved = ctx.ls.get('mirror:custom');
    if (saved != null) customEl.value = saved;
    customEl.addEventListener('input', () => { ctx.ls.set('mirror:custom', customEl.value); update(); });
  }

  const saveBtn = document.getElementById('formSave');
  const copyBtn = document.getElementById('formCopy');
  const flash = (btn, text, orig) => { btn.textContent = text; setTimeout(() => { btn.textContent = orig; }, 1700); };
  if (saveBtn) saveBtn.addEventListener('click', () => {
    if (lineEl.hidden) return;
    const text = lineEl.textContent;
    if (navigator.share) navigator.share({ text }).catch(() => {});
    else if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => flash(saveBtn, 'Copied. Paste into Notes', 'Save to Notes'));
  });
  if (copyBtn) copyBtn.addEventListener('click', () => {
    if (!lineEl.hidden && navigator.clipboard) navigator.clipboard.writeText(lineEl.textContent).then(() => flash(copyBtn, 'Copied', 'Copy this line'));
  });

  /* ---- re-entry ---- */
  const savedLine = ctx.ls.get('mirror:line');
  const completed = ctx.ls.get('mirror:completed');
  const lastStation = ctx.ls.get('mirror:station');

  if (completed && savedLine) {
    /* completed reader: open at Awakened, acknowledge, offer a fresh walk */
    const last = tabs[tabs.length - 1];
    if (last) last.click();
    if (lineEl) { lineEl.textContent = savedLine; lineEl.hidden = false; }
    if (note) {
      note.innerHTML = `You have read this mirror in full. Your line, kept from last time, waits at the final state. ` +
        `<button type="button" class="mnote-link" data-mgoto="${keys[0]}">Read again from the first state</button>`;
      note.hidden = false;
    }
    showRecord();
  } else if (lastStation && lastStation === keys[3] && !completed) {
    /* stopped at the shadow: reopen there, promise the answer */
    const shadowTab = tabs[3];
    if (shadowTab) shadowTab.click();
    if (note) {
      note.textContent = 'You stopped at the shadow last time. The next state answers it.';
      note.hidden = false;
    }
  } else if (lastStation && idx(lastStation) > 0) {
    const t = tabs[idx(lastStation)];
    if (t) t.click();
  }

  update();
  const active = tabs.find(t => t.getAttribute('aria-selected') === 'true');
  paint(active ? active.dataset.mirror : keys[0]);
}
