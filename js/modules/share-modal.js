/* Share modal — one dialog, every platform. Any share button on the
   page calls openShare({title, text, url}); the modal offers Facebook,
   X, WhatsApp, Telegram, Reddit, LinkedIn, and email as icon tiles,
   plus a visible copy-link row and the device's own share sheet when
   available. Monochrome inline SVG marks, plain URL intents, no SDKs. */
let modal, payload = { title: '', text: '', url: '' };

const enc = encodeURIComponent;

/* Minimal monochrome brand marks, drawn in currentColor. */
const I = {
  facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.2 0-1-.1-1.9-.1-1.9 0-3.3 1.2-3.3 3.4V11H8.5v3h2.7v7h2.3z"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.5 4h2.6l-5.7 6.5L21 20h-5.2l-4.1-5.4L7 20H4.4l6.1-7L4 4h5.3l3.7 4.9L17.5 4zm-.9 14.4h1.4L8.5 5.5H7L16.6 18.4z"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.5A8.5 8.5 0 0 0 4.6 16.2L3.5 20.5l4.4-1.1A8.5 8.5 0 1 0 12 3.5zm0 1.6a6.9 6.9 0 1 1-3.5 12.8l-.4-.2-2.6.7.7-2.5-.3-.4A6.9 6.9 0 0 1 12 5.1zm-2.4 3c-.2 0-.4 0-.6.3-.2.2-.8.7-.8 1.8s.8 2.1.9 2.3c.1.2 1.6 2.5 3.9 3.4 1.9.8 2.3.6 2.7.6.4 0 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.7.9c-.1.2-.3.2-.5.1a5.7 5.7 0 0 1-2.8-2.4c-.1-.2 0-.4.1-.5l.5-.6c.1-.2.2-.3.1-.5l-.8-1.8c-.2-.4-.4-.4-.8-.4z"/></svg>',
  telegram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.4 4.3 3.9 10.7c-.9.4-.9 1.1-.1 1.3l4.2 1.3 1.6 4.9c.2.6.4.8.8.8.4 0 .6-.2 1-.5l2-2 4.2 3.1c.8.4 1.3.2 1.5-.7l2.8-13.1c.3-1.1-.4-1.7-1.5-1.5zm-10 8.7 8.5-5.4c.4-.2.8-.1.5.2l-7.2 6.5-.3 3-1.5-4.3z"/></svg>',
  reddit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.5 4.5c.3-1 1.3-1.6 2.3-1.4 1 .2 1.7 1.1 1.5 2.1-.2 1-1.1 1.7-2.1 1.5-.5-.1-.9-.4-1.2-.8l-2.2.5.6 2.7c1.7.1 3.3.6 4.5 1.4.4-.3.8-.5 1.3-.5 1.1 0 2 .9 2 2 0 .8-.4 1.4-1.1 1.8v.4c0 3-3.2 5.3-7.1 5.3S6 17.2 6 14.2v-.4A2 2 0 0 1 4.9 12c0-1.1.9-2 2-2 .5 0 1 .2 1.3.5 1.2-.8 2.9-1.3 4.7-1.4l-.8-3.5 2.4-.5.0-.6zM9.3 13.2c-.6 0-1.1.5-1.1 1.1 0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1zm5.4 0c-.6 0-1.1.5-1.1 1.1 0 .6.5 1.1 1.1 1.1.6 0 1.1-.5 1.1-1.1 0-.6-.5-1.1-1.1-1.1zm-5.2 3.9c1.7 1.3 3.9 1.3 5.6 0 .2-.2.5-.1.6.1.1.2.1.4-.1.6-2 1.5-4.6 1.5-6.6 0-.2-.2-.2-.4-.1-.6.1-.2.4-.3.6-.1z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.8 8.5H3.9V20h2.9V8.5zM5.3 7.2c1 0 1.7-.7 1.7-1.6-.1-.9-.8-1.6-1.7-1.6s-1.7.7-1.7 1.6c0 .9.7 1.6 1.7 1.6zM20.1 20h-2.9v-5.8c0-1.5-.6-2.4-1.8-2.4-1 0-1.5.7-1.8 1.3-.1.2-.1.6-.1.9V20h-2.9V8.5h2.9v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.9 1.3 3.9 4.2V20z"/></svg>',
  email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M4 6.5h16v11H4z"/><path fill="none" stroke="currentColor" stroke-width="1.6" d="m4.5 7.5 7.5 6 7.5-6"/></svg>',
  native: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="1.7" fill="currentColor"/><circle cx="12" cy="12" r="1.7" fill="currentColor"/><circle cx="18" cy="12" r="1.7" fill="currentColor"/></svg>',
  sms: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 4C6.9 4 3 7.2 3 11.2c0 1.9.9 3.6 2.4 4.9-.1 1-.5 2.1-1.3 3 0 .2.1.3.3.3 1.5-.2 2.8-.8 3.8-1.5 1.2.4 2.5.6 3.8.6 5.1 0 9-3.2 9-7.4C21 7.2 17.1 4 12 4zm-3.6 8.3a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm3.6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zm3.6 0a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4z"/></svg>',
  discord: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.3 5.6A16 16 0 0 0 15.3 4.3l-.2.4a14.9 14.9 0 0 1 3.6 1.5 11 11 0 0 0-9.4 0c-.6-.4-1.8-1-3.6-1.5l-.2-.4A16 16 0 0 0 4.7 5.6C2.3 9 1.7 12.4 2 15.7a16.5 16.5 0 0 0 4.9 2.5l.6-1c-.5-.2-1-.4-1.5-.8l.4-.3a10.6 10.6 0 0 0 9.2 0l.4.3c-.5.4-1 .6-1.5.8l.6 1a16.4 16.4 0 0 0 4.9-2.5c.4-3.9-.6-7.3-2.7-10.1zM9.3 13.6c-.9 0-1.7-.8-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9zm5.4 0c-.9 0-1.7-.8-1.7-1.9s.8-1.9 1.7-1.9 1.7.9 1.7 1.9-.8 1.9-1.7 1.9z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="3.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="16.5" cy="7.5" r="1.05" fill="currentColor"/></svg>',
  threads: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M12.5 20.5C7.9 20.5 5 17.4 5 12S7.9 3.5 12.5 3.5c3.4 0 5.7 1.7 6.6 4.3M12.3 15.7c2 0 3.4-1.1 3.4-2.7 0-1.8-1.7-2.6-3.5-2.4-1.7.2-2.6 1.1-2.5 2.3.1 1.4 1.5 2 2.8 1.6 1.7-.5 2.4-2.3 2.4-4.6"/></svg>',
  snapchat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3.4c2 0 3.5 1.6 3.6 3.6 0 .5 0 1 .1 1.4.2.3.7.3 1.1.1.5-.2 1 .4.6.9-.3.4-1.3.6-1.5 1.1-.1.4.4 1 .9 1.5.6.6 1.3 1 2 1.2.3.1.3.5 0 .7-.5.4-1.5.5-1.9.9-.2.3.1.8-.3 1-.4.2-1-.2-1.8-.1-.7.1-1.1.8-2 1-.7.2-1.5-.5-2.4-.5s-1.7.7-2.4.5c-.9-.2-1.3-.9-2-1-.8-.1-1.4.3-1.8.1-.4-.2-.1-.7-.3-1-.4-.4-1.4-.5-1.9-.9-.3-.2-.3-.6 0-.7.7-.2 1.4-.6 2-1.2.5-.5 1-1.1.9-1.5-.2-.5-1.2-.7-1.5-1.1-.4-.5.1-1.1.6-.9.4.2.9.2 1.1-.1.1-.4.1-.9.1-1.4C8.5 5 10 3.4 12 3.4z"/></svg>',
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5.5 15.5A1.8 1.8 0 0 1 4 13.7V6a2 2 0 0 1 2-2h7.7c.8 0 1.5.6 1.7 1.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>'
};

/* href: real web share-intent. open: no public intent (copy the line, then open the app to paste). */
const PLATFORMS = [
  { key: 'instagram', label: 'Instagram', open: 'https://www.instagram.com/' },
  { key: 'threads', label: 'Threads', href: p => `https://www.threads.net/intent/post?text=${enc(p.text + ' ' + p.url)}` },
  { key: 'snapchat', label: 'Snapchat', open: 'https://www.snapchat.com/' },
  { key: 'x', label: 'X', href: p => `https://twitter.com/intent/tweet?text=${enc(p.text)}&url=${enc(p.url)}` },
  { key: 'facebook', label: 'Facebook', href: p => `https://www.facebook.com/sharer/sharer.php?u=${enc(p.url)}&quote=${enc(p.text)}` },
  { key: 'whatsapp', label: 'WhatsApp', href: p => `https://wa.me/?text=${enc(p.text + ' ' + p.url)}` },
  { key: 'telegram', label: 'Telegram', href: p => `https://t.me/share/url?url=${enc(p.url)}&text=${enc(p.text)}` },
  { key: 'reddit', label: 'Reddit', href: p => `https://www.reddit.com/submit?url=${enc(p.url)}&title=${enc(p.text)}` },
  { key: 'linkedin', label: 'LinkedIn', href: p => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(p.url)}` },
  { key: 'sms', label: 'SMS', href: p => `sms:?&body=${enc(p.text + ' ' + p.url)}` },
  { key: 'email', label: 'Email', href: p => `mailto:?subject=${enc(p.title)}&body=${enc(p.text + '\n\n' + p.url)}` },
  { key: 'discord', label: 'Discord', open: 'https://discord.com/channels/@me' }
];

export function openShare(next) {
  payload = { ...payload, ...next };
  if (!modal || typeof modal.showModal !== 'function') {
    if (navigator.share) { navigator.share(payload).catch(() => {}); return; }
    if (navigator.clipboard) navigator.clipboard.writeText(`${payload.text} ${payload.url}`);
    return;
  }
  const preview = modal.querySelector('[data-share-preview]');
  if (preview) preview.textContent = payload.text;
  const urlEl = modal.querySelector('[data-share-url]');
  if (urlEl) urlEl.textContent = payload.url.replace(/^https:\/\/(www\.)?/, '');
  if (!modal.open) modal.showModal();
}

export function initShareModal() {
  modal = document.getElementById('share-modal');
  if (!modal) return;
  const list = modal.querySelector('[data-share-list]');
  if (list) {
    list.innerHTML = PLATFORMS.map(p =>
      `<button type="button" class="share-tile" data-share="${p.key}"${p.open ? ` title="Copies your line, then opens ${p.label} to paste"` : ''}>
        <span class="share-tile__mark">${I[p.key]}</span>
        <span class="share-tile__label">${p.label}</span>
      </button>`).join('');
    list.addEventListener('click', async e => {
      const btn = e.target.closest('[data-share]');
      if (!btn) return;
      const platform = PLATFORMS.find(p => p.key === btn.dataset.share);
      if (!platform) return;
      if (platform.open) {
        /* No public web share-intent (Instagram, Snapchat, Discord): copy the line, then open the app to paste. */
        if (navigator.clipboard) { try { await navigator.clipboard.writeText(`${payload.text} ${payload.url}`); } catch {} }
        const w = window.open(platform.open, '_blank', 'noopener,noreferrer');
        if (w) w.opener = null;
        return;
      }
      const href = platform.href(payload);
      if (/^(sms|mailto|tel):/.test(href)) { window.location.href = href; }
      else { const w = window.open(href, '_blank', 'noopener,noreferrer,width=640,height=560'); if (w) w.opener = null; }
    });
  }
  const copyBtn = modal.querySelector('[data-share-copy]');
  if (copyBtn) {
    copyBtn.innerHTML = `${I.copy}<span>Copy</span>`;
    copyBtn.addEventListener('click', async () => {
      if (!navigator.clipboard) return;
      await navigator.clipboard.writeText(`${payload.text} ${payload.url}`);
      copyBtn.classList.add('is-copied');
      copyBtn.innerHTML = `${I.copy}<span>Copied</span>`;
      setTimeout(() => { copyBtn.classList.remove('is-copied'); copyBtn.innerHTML = `${I.copy}<span>Copy</span>`; }, 1700);
    });
  }
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });
  const close = modal.querySelector('[data-share-close]');
  if (close) close.addEventListener('click', () => modal.close());
}
