/* Sign balance — the West↔East weigh dial. Five stops, each with a
   genuinely different reading (from the data island). The JS-off
   baseline shows the balanced reading already in the markup. */
export function initSignBalance(ctx) {
  const range = document.getElementById('fusion');
  if (!range) return;
  const d = ctx.data.dial || {};
  const READS = d.reads || [];
  const STATES = d.states || [];
  const APCT = [85, 67, 50, 33, 15];

  const wrap = range.closest('.cross-weigh');
  const read = document.getElementById('fusionRead');
  const stateEl = document.getElementById('cwState');
  const aPct = document.getElementById('cwWestPct');
  const oPct = document.getElementById('cwEastPct');
  const halfA = document.querySelector('.pf-half[data-side="west"]');
  const halfO = document.querySelector('.pf-half[data-side="east"]');

  function apply() {
    const s = +range.value;
    if (READS[s] && read) read.textContent = READS[s];
    if (STATES[s] && stateEl) stateEl.textContent = STATES[s];
    if (aPct) aPct.textContent = APCT[s];
    if (oPct) oPct.textContent = 100 - APCT[s];
    if (wrap) wrap.style.setProperty('--pos', s / 4);
    range.setAttribute('aria-valuetext', STATES[s] || String(s));
    if (halfA && halfO) {
      halfA.classList.toggle('is-lit', s < 2); halfA.classList.toggle('is-dim', s > 2);
      halfO.classList.toggle('is-lit', s > 2); halfO.classList.toggle('is-dim', s < 2);
      if (s === 2) { halfA.classList.remove('is-lit', 'is-dim'); halfO.classList.remove('is-lit', 'is-dim'); }
    }
  }
  range.addEventListener('input', apply);
  apply();
}
