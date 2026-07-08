/* Save & share — saving the animal, sharing the reading, and the
   stone choice. All persistence is local (zodi:<slug>:*); the free
   account layer can read zodi:*:saved to import later. */
import { openShare } from './share-modal.js';

export function initSaveShare(ctx) {
  const name = ctx.data.name || 'this animal';

  /* Save buttons */
  const saveBtns = [...document.querySelectorAll('[data-action="save"]')];
  const paintSaved = saved => saveBtns.forEach(b => {
    b.setAttribute('aria-pressed', String(saved));
    b.textContent = saved ? `Saved · your Zodi Animal` : `Save the ${name}`;
  });
  paintSaved(ctx.ls.get('saved') === '1');
  saveBtns.forEach(b => b.addEventListener('click', () => {
    const now = ctx.ls.get('saved') !== '1';
    ctx.ls.set('saved', now ? '1' : '0');
    paintSaved(now);
    if (now) openAccountModal(ctx, `The ${name} is saved on this device.`);
  }));

  /* Account modal — the free-account capture moment. */
  const modal = document.getElementById('account-modal');
  function openAccountModal(ctx, leadLine) {
    if (!modal || typeof modal.showModal !== 'function') return;
    if (ctx.ls.get('account:dismissed') === '1' && !leadLine) return;
    const lead = modal.querySelector('[data-modal-lead]');
    if (lead && leadLine) lead.textContent = leadLine;
    if (!modal.open) modal.showModal();
  }
  [...document.querySelectorAll('[data-action="account"]')].forEach(b =>
    b.addEventListener('click', () => openAccountModal(ctx, '')));
  if (modal) {
    modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
    const later = modal.querySelector('[data-modal-later]');
    if (later) later.addEventListener('click', () => { ctx.ls.set('account:dismissed', '1'); modal.close(); });
  }

  /* Share buttons — prefer the reader's own ritual line when present */
  const shareText = () => (ctx.ls.get('mirror:line') || ctx.data.shareLine || document.title);
  [...document.querySelectorAll('[data-action="share"]')].forEach(b => {
    b.addEventListener('click', () => {
      openShare({ title: document.title, text: shareText(), url: location.href.split('#')[0] });
    });
  });

  /* Stone choice (single) */
  const stoneBtns = [...document.querySelectorAll('.stone-card .choose')];
  const paintStone = key => stoneBtns.forEach(b => {
    const on = b.dataset.stone === key;
    b.setAttribute('aria-pressed', String(on));
    b.textContent = on ? 'Your keeper stone' : 'Choose this stone';
  });
  paintStone(ctx.ls.get('stone'));
  stoneBtns.forEach(b => b.addEventListener('click', () => {
    const cur = ctx.ls.get('stone');
    const next = cur === b.dataset.stone ? '' : b.dataset.stone;
    ctx.ls.set('stone', next);
    paintStone(next);
  }));
}
