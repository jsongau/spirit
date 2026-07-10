/* Share modal — matches the front-page "Share your crossing" sheet.
   A quote card, a 4-up grid of platform tiles with a More/Less expander,
   and a copy-link row. Any share button on the page calls
   openShare({title, text, url}). The url already carries the sharer's
   referral code (added in save-share.js) so signups can be attributed.
   Monochrome inline marks, plain URL intents, no SDKs. */
let modal, payload = { title: '', text: '', url: '' };
const enc = encodeURIComponent;

const I = {
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.2 0-1-.1-1.9-.1-1.9 0-3.3 1.2-3.3 3.4V11H8.5v3h2.7v7h2.3z"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 4h2.6l-5.7 6.5L21 20h-5.2l-4.1-5.4L7 20H4.4l6.1-7L4 4h5.3l3.7 4.9L17.5 4zm-.9 14.4h1.4L8.5 5.5H7L16.6 18.4z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.5A8.5 8.5 0 0 0 4.6 16.2L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5zm0 1.6a6.9 6.9 0 1 1-3.5 12.8l-.4-.2-2.6.7.7-2.5-.3-.4A6.9 6.9 0 0 1 12 5.1zm-2.4 3c-.2 0-.4 0-.6.3-.2.2-.8.7-.8 1.8s.8 2.1.9 2.3c.1.2 1.6 2.5 3.9 3.4 1.9.8 2.3.6 2.7.6.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1a5.7 5.7 0 0 1-2.8-2.4c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.2-.3.1-.5l-.8-1.8c-.2-.4-.4-.4-.8-.4z"/></svg>',
  telegram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.4 4.3 3.9 10.7c-.9.4-.9 1.1-.1 1.3l4.2 1.3 1.6 4.9c.2.6.4.8.8.8.4 0 .6-.2 1-.5l2-2 4.2 3.1c.8.4 1.3.2 1.5-.7l2.8-13.1c.3-1.1-.4-1.7-1.5-1.5zm-10 8.7 8.5-5.4c.4-.2.8-.1.5.2l-7.2 6.5-.3 3-1.5-4.3z"/></svg>',
  reddit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.5 4.5c.3-1 1.3-1.6 2.3-1.4 1 .2 1.7 1.1 1.5 2.1-.2 1-1.1 1.7-2.1 1.5-.5-.1-.9-.4-1.2-.8l-2.2.5.6 2.7c1.7.1 3.3.6 4.5 1.4.4-.3.8-.5 1.3-.5 1.1 0 2 .9 2 2 0 .8-.4 1.4-1.1 1.8v.4c0 3-3.2 5.3-7.1 5.3S6 17.2 6 14.2v-.4A2 2 0 0 1 4.9 12c0-1.1.9-2 2-2 .5 0 1 .2 1.3.5 1.2-.8 2.9-1.3 4.7-1.4l-.8-3.5 2.4-.5zM9.3 13.2c-.6 0-1.1.5-1.1 1.1 0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1zm5.4 0c-.6 0-1.1.5-1.1 1.1 0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1zm-5.2 3.9c1.7 1.3 3.9 1.3 5.6 0 .2-.2.5-.1.6.1.1.2.1.4-.1.6-2 1.5-4.6 1.5-6.6 0-.2-.2-.2-.4-.1-.6.1-.2.4-.3.6-.1z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.8 8.5H3.9V20h2.9V8.5zM5.3 7.2c1 0 1.7-.7 1.7-1.6-.1-.9-.8-1.6-1.7-1.6s-1.7.7-1.7 1.6c0 .9.7 1.6 1.7 1.6zM20.1 20h-2.9v-5.8c0-1.5-.6-2.4-1.8-2.4-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V20h-2.9V8.5h2.9v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.9 1.3 3.9 4.2V20z"/></svg>',
  email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M4 6.5h16v11H4z"/><path fill="none" stroke="currentColor" stroke-width="1.6" d="m4.5 7.5 7.5 6 7.5-6"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="16.5" cy="7.5" r="1.05" fill="currentColor"/></svg>',
  snapchat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.4c2 0 3.5 1.6 3.6 3.6 0 .5 0 1 .1 1.4.2.3.7.3 1.1.1.5-.2 1 .4.6.9-.3.4-1.3.6-1.5 1.1-.1.4.4 1 .9 1.5.6.6 1.3 1 2 1.2.3.1.3.5 0 .7-.5.4-1.5.5-1.9.9-.2.3.1.8-.3 1-.4.2-1-.2-1.8-.1-.7.1-1.1.8-2 1-.7.2-1.5-.5-2.4-.5s-1.7.7-2.4.5c-.9-.2-1.3-.9-2-1-.8-.1-1.4.3-1.8.1-.4-.2-.1-.7-.3-1-.4-.4-1.4-.5-1.9-.9-.3-.2-.3-.6 0-.7.7-.2 1.4-.6 2-1.2.5-.5 1-1.1.9-1.5-.2-.5-1.2-.7-1.5-1.1-.4-.5.1-1.1.6-.9.4.2.9.2 1.1-.1.1-.4.1-.9.1-1.4C8.5 5 10 3.4 12 3.4z"/></svg>',
  discord: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.3 5.6A16 16 0 0 0 15.3 4.3l-.2.4a14.9 14.9 0 0 1 3.6 1.5 11 11 0 0 0-9.4 0c-.6-.4-1.8-1-3.6-1.5l-.2-.4A16 16 0 0 0 4.7 5.6C2.3 9 1.7 12.4 2 15.7a16.5 16.5 0 0 0 4.9 2.5l.6-1c-.5-.2-1-.4-1.5-.8l.4-.3a10.6 10.6 0 0 0 9.2 0l.4.3c-.5.4-1 .6-1.5.8l.6 1a16.4 16.4 0 0 0 4.9-2.5c.4-3.9-.6-7.3-2.7-10.1zM9.3 13.6c-.9 0-1.7-.8-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9zm5.4 0c-.9 0-1.7-.8-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9z"/></svg>',
  threads: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M12.5 20.5C7.9 20.5 5 17.4 5 12S7.9 3.5 12.5 3.5c3.4 0 5.7 1.7 6.6 4.3M12.3 15.7c2 0 3.4-1.1 3.4-2.7 0-1.8-1.7-2.6-3.5-2.4-1.7.2-2.6 1.1-2.5 2.3.1 1.4 1.5 2 2.8 1.6 1.7-.5 2.4-2.3 2.4-4.6"/></svg>',
  sms: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 4C6.9 4 3 7.2 3 11.2c0 1.9.9 3.6 2.4 4.9-.1 1-.5 2.1-1.3 3 0 .2.1.3.3.3 1.5-.2 2.8-.8 3.8-1.5 1.2.4 2.5.6 3.8.6 5.1 0 9-3.2 9-7.4C21 7.2 17.1 4 12 4zm-3.6 8.3a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm3.6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm3.6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z"/></svg>',
  wechat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M9 4.2c-3.6 0-6.5 2.4-6.5 5.4 0 1.7.9 3.2 2.4 4.2l-.6 1.8 2.1-1.1c.7.2 1.5.4 2.3.4h.5a4.4 4.4 0 0 1-.2-1.3c0-2.8 2.7-5 6-5h.5C15.4 6 12.5 4.2 9 4.2zM6.8 8.4a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8zm4.5 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8zm10.2 5.1c0-2.5-2.4-4.5-5.4-4.5s-5.4 2-5.4 4.5 2.4 4.5 5.4 4.5c.6 0 1.3-.1 1.9-.3l1.7.9-.5-1.5c1.1-.8 1.8-2 1.8-3.4zm-7-.8a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm3.2 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"/></svg>',
  pinterest: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.5a8.5 8.5 0 0 0-3.1 16.4c-.1-.7-.1-1.7 0-2.4l1-4.2s-.3-.5-.3-1.3c0-1.2.7-2.1 1.6-2.1.7 0 1.1.5 1.1 1.2 0 .8-.5 1.9-.7 2.9-.2.9.4 1.6 1.3 1.6 1.5 0 2.6-1.6 2.6-3.9 0-2-1.5-3.5-3.6-3.5-2.4 0-3.9 1.8-3.9 3.7 0 .7.3 1.5.6 1.9.1.1.1.2.1.3l-.2.9c0 .2-.1.2-.3.1-1.1-.5-1.7-2-1.7-3.3 0-2.6 1.9-5.1 5.6-5.1 2.9 0 5.2 2.1 5.2 4.9 0 2.9-1.8 5.3-4.4 5.3-.9 0-1.7-.5-1.9-1l-.5 2c-.2.7-.7 1.6-1 2.1a8.5 8.5 0 1 0 2.9-16.4z"/></svg>',
  line: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.6c-4.8 0-8.7 3.1-8.7 7 0 3.5 3.1 6.4 7.3 6.9.3 0 .7.2.8.4.1.2 0 .6 0 .8l-.1.8c0 .2-.2.9.8.5s5.3-3.1 7.2-5.3c1.3-1.4 1.9-2.9 1.9-4.4 0-3.9-3.9-7-8.5-7zM8.4 13.4H6.6c-.2 0-.4-.2-.4-.4V9.9c0-.2.2-.4.4-.4s.4.2.4.4v2.7h1.4c.2 0 .4.2.4.4s-.2.4-.4.4zm2-.4c0 .2-.2.4-.4.4s-.4-.2-.4-.4V9.9c0-.2.2-.4.4-.4s.4.2.4.4v3.1zm4.1 0c0 .2-.1.3-.3.4h-.1c-.1 0-.3-.1-.3-.2l-1.4-2v1.8c0 .2-.2.4-.4.4s-.4-.2-.4-.4V9.9c0-.2.1-.3.3-.4.1 0 .3 0 .4.2l1.4 2V9.9c0-.2.2-.4.4-.4s.4.2.4.4v3.1zm2.6-1.9c.2 0 .4.2.4.4s-.2.4-.4.4h-1v.7h1c.2 0 .4.2.4.4s-.2.4-.4.4h-1.4c-.2 0-.4-.2-.4-.4V9.9c0-.2.2-.4.4-.4h1.4c.2 0 .4.2.4.4s-.2.4-.4.4h-1v.7h1z"/></svg>',
  tumblr: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 3.5h-2.4c-.2 1.8-1 3.3-2.9 3.9v2.2h1.9v5.1c0 2.3 1.6 3.8 4 3.8 1.1 0 2.2-.4 2.7-.8l-.6-2c-.4.2-.9.4-1.4.4-.9 0-1.4-.5-1.4-1.6V9.6h2.6V7.4h-2.6V3.5z"/></svg>',
  bluesky: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 10.8C10.7 8.4 7.6 5.6 5.5 5c-1.6-.5-2.5.3-2.5 1.9 0 1.7.6 5 1 5.7.5.9 1.6 1.2 2.9 1-1.9.3-2.4 1.4-1.4 2.6.9 1.1 2.6 2.6 3.5 1.3.6-.8 1-1.9 1.3-2.8l.2-.6c.1.2.1.4.2.6.3.9.7 2 1.3 2.8.9 1.3 2.6-.2 3.5-1.3 1-1.2.5-2.3-1.4-2.6 1.3.2 2.4-.1 2.9-1 .4-.7 1-4 1-5.7 0-1.6-.9-2.4-2.5-1.9-2.1.6-5.2 3.4-6.5 5.8z"/></svg>',
  device: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M12 3v11m0-11 3.2 3.2M12 3 8.8 6.2M5 13v5.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V13"/></svg>',
  more: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" d="M12 6v12M6 12h12"/></svg>',
  less: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/></svg>',
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 15.5A1.8 1.8 0 0 1 4 13.7V6a2 2 0 0 1 2-2h7.7c.8 0 1.5.6 1.7 1.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'
};

/* href: real web share-intent. open: no public intent (copy the line, then open the app to paste).
   copyOnly: no web share presence (copy + toast). native: the device share sheet. */
const PRIMARY = [
  { key: 'facebook', label: 'Facebook', href: p => `https://www.facebook.com/sharer/sharer.php?u=${enc(p.url)}&quote=${enc(p.text)}` },
  { key: 'x', label: 'X', href: p => `https://twitter.com/intent/tweet?text=${enc(p.text)}&url=${enc(p.url)}` },
  { key: 'whatsapp', label: 'WhatsApp', href: p => `https://wa.me/?text=${enc(p.text + ' ' + p.url)}` },
  { key: 'telegram', label: 'Telegram', href: p => `https://t.me/share/url?url=${enc(p.url)}&text=${enc(p.text)}` },
  { key: 'reddit', label: 'Reddit', href: p => `https://www.reddit.com/submit?url=${enc(p.url)}&title=${enc(p.text)}` },
  { key: 'linkedin', label: 'LinkedIn', href: p => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(p.url)}` },
  { key: 'email', label: 'Email', href: p => `mailto:?subject=${enc(p.title)}&body=${enc(p.text + '\n\n' + p.url)}` }
];
const SECONDARY = [
  { key: 'instagram', label: 'Instagram', open: 'https://www.instagram.com/' },
  { key: 'snapchat', label: 'Snapchat', open: 'https://www.snapchat.com/' },
  { key: 'discord', label: 'Discord', open: 'https://discord.com/channels/@me' },
  { key: 'threads', label: 'Threads', href: p => `https://www.threads.net/intent/post?text=${enc(p.text + ' ' + p.url)}` },
  { key: 'sms', label: 'SMS', href: p => `sms:?&body=${enc(p.text + ' ' + p.url)}` },
  { key: 'wechat', label: 'WeChat', copyOnly: true },
  { key: 'pinterest', label: 'Pinterest', href: p => `https://pinterest.com/pin/create/button/?url=${enc(p.url)}&description=${enc(p.text)}` },
  { key: 'line', label: 'LINE', href: p => `https://social-plugins.line.me/lineit/share?url=${enc(p.url)}&text=${enc(p.text)}` },
  { key: 'tumblr', label: 'Tumblr', href: p => `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${enc(p.url)}&caption=${enc(p.text)}` },
  { key: 'bluesky', label: 'Bluesky', href: p => `https://bsky.app/intent/compose?text=${enc(p.text + ' ' + p.url)}` },
  { key: 'device', label: 'Device', native: true }
];

const tile = p => `<button type="button" class="share-tile" data-share="${p.key}"${p.open ? ` title="Copies your line, then opens ${p.label} to paste"` : ''}>
    <span class="share-tile__mark">${I[p.key] || ''}</span>
    <span class="share-tile__label">${p.label}</span>
  </button>`;

async function copyLine() {
  if (!navigator.clipboard) return false;
  try { await navigator.clipboard.writeText(`${payload.text} ${payload.url}`); return true; } catch { return false; }
}
function flashLabel(btn, text) {
  const el = btn.querySelector('.share-tile__label'); if (!el) return;
  const orig = el.textContent; el.textContent = text; btn.classList.add('is-flash');
  setTimeout(() => { el.textContent = orig; btn.classList.remove('is-flash'); }, 1500);
}
async function runPlatform(p, btn) {
  if (p.native) { if (navigator.share) { try { await navigator.share(payload); } catch {} } else { await copyLine(); flashLabel(btn, 'Copied'); } return; }
  if (p.copyOnly) { await copyLine(); flashLabel(btn, 'Link copied'); return; }
  if (p.open) { await copyLine(); const w = window.open(p.open, '_blank', 'noopener,noreferrer'); if (w) w.opener = null; return; }
  const href = p.href(payload);
  if (/^(sms|mailto|tel):/.test(href)) window.location.href = href;
  else { const w = window.open(href, '_blank', 'noopener,noreferrer,width=640,height=600'); if (w) w.opener = null; }
}

export function openShare(next) {
  payload = { ...payload, ...next };
  if (!modal || typeof modal.showModal !== 'function') {
    if (navigator.share) { navigator.share(payload).catch(() => {}); return; }
    copyLine();
    return;
  }
  const preview = modal.querySelector('[data-share-preview]');
  if (preview) preview.textContent = payload.text;
  const urlEl = modal.querySelector('[data-share-url]');
  if (urlEl) urlEl.textContent = payload.url.replace(/^https:\/\/(www\.)?/, '').replace(/\?.*$/, '');
  if (!modal.open) modal.showModal();
}

export function initShareModal() {
  modal = document.getElementById('share-modal');
  if (!modal) return;
  const grid = modal.querySelector('[data-share-list]');
  if (grid) {
    grid.innerHTML =
      PRIMARY.map(tile).join('') +
      `<button type="button" class="share-tile share-tile--toggle" data-share-toggle aria-expanded="false">
        <span class="share-tile__mark" data-toggle-mark>${I.more}</span>
        <span class="share-tile__label" data-toggle-label>More</span>
      </button>` +
      `<div class="share-more" data-share-more hidden>${SECONDARY.map(tile).join('')}</div>`;

    grid.addEventListener('click', e => {
      const toggle = e.target.closest('[data-share-toggle]');
      if (toggle) {
        const more = grid.querySelector('[data-share-more]');
        const open = more.hasAttribute('hidden');
        if (open) more.removeAttribute('hidden'); else more.setAttribute('hidden', '');
        toggle.setAttribute('aria-expanded', String(open));
        toggle.querySelector('[data-toggle-mark]').innerHTML = open ? I.less : I.more;
        toggle.querySelector('[data-toggle-label]').textContent = open ? 'Less' : 'More';
        return;
      }
      const btn = e.target.closest('[data-share]');
      if (!btn) return;
      const p = [...PRIMARY, ...SECONDARY].find(x => x.key === btn.dataset.share);
      if (p) runPlatform(p, btn);
    });
  }
  const copyBtn = modal.querySelector('[data-share-copy]');
  if (copyBtn) {
    copyBtn.innerHTML = `${I.copy}<span>Copy</span>`;
    copyBtn.addEventListener('click', async () => {
      if (!(await copyLine())) return;
      copyBtn.classList.add('is-copied');
      copyBtn.innerHTML = `${I.copy}<span>Copied</span>`;
      setTimeout(() => { copyBtn.classList.remove('is-copied'); copyBtn.innerHTML = `${I.copy}<span>Copy</span>`; }, 1700);
    });
  }
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  const close = modal.querySelector('[data-share-close]');
  if (close) close.addEventListener('click', () => modal.close());
}
