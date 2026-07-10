/* Save & share — saving the animal, sharing the reading, and the
   stone choice. All persistence is local (zodi:<slug>:*); the free
   account layer can read zodi:*:saved to import later. */
import { openShare } from './share-modal.js';

/* ---- referral plumbing ----------------------------------------------------
   Every account is meant to carry a referral code so we can see who signed up
   under whom. Two roles:
   1) A visitor who arrives on a shared link (?ref=CODE) is the referred one.
      CODE is stashed as zodi:referredby and passed to every signup link, so the
      account that gets created records its referrer.
   2) A user who shares gets their own code appended to the shared URL, so the
      people they bring in are attributed to them. Until real auth exists we
      persist a stable per-browser code (zodi:myref) to stand in for it.
   Both keys are global (not slug-scoped) so they follow the reader across every
   animal page. ------------------------------------------------------------- */
const LS = { get: k => { try { return localStorage.getItem(k); } catch { return null; } },
             set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
function myRef() {
  let m = LS.get('zodi:myref');
  if (!m) { m = Math.random().toString(36).slice(2, 10); LS.set('zodi:myref', m); }
  return m;
}
function captureIncomingRef() {
  try {
    const u = new URL(location.href);
    const ref = u.searchParams.get('ref');
    if (ref) {
      LS.set('zodi:referredby', ref);
      u.searchParams.delete('ref');
      history.replaceState(null, '', u.pathname + (u.searchParams.toString() ? '?' + u.searchParams : '') + u.hash);
    }
  } catch {}
}
function withRef(url, code) {
  if (!code) return url;
  try { const u = new URL(url, location.href); u.searchParams.set('ref', code); return u.href; }
  catch { return url + (url.includes('?') ? '&' : '?') + 'ref=' + encodeURIComponent(code); }
}
function decorateAccountLinks() {
  const referredBy = LS.get('zodi:referredby');
  if (!referredBy) return;
  document.querySelectorAll('a[data-account-link]').forEach(a => {
    a.setAttribute('href', withRef(a.getAttribute('href'), referredBy));
  });
}

export function initSaveShare(ctx) {
  const name = ctx.data.name || 'this animal';
  captureIncomingRef();
  decorateAccountLinks();
  /* the shared URL carries the sharer's code so their referrals are tracked */
  const shareUrl = () => withRef(location.href.split(/[?#]/)[0], myRef());

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

  /* Share buttons — the crossing line, matching the front-page share sheet.
     A reader who has written their own mirror line shares that instead. */
  const shareText = () => (ctx.ls.get('mirror:line') || `My Zodi Animal is the ${name}. What's yours?`);
  [...document.querySelectorAll('[data-action="share"]')].forEach(b => {
    b.addEventListener('click', () => {
      openShare({ title: `My Zodi Animal is the ${name}`, text: shareText(), url: shareUrl() });
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
