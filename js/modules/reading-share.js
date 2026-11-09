/* Reading share hooks (2026-11-08).
   1. "Send to a <match>" on every match card: opens the share sheet with a
      challenge link to /vs.html?with=<this animal>, so a friend lands on
      "Someone is the Koala. What are you?" and reveals their own animal.
   2. "Share this reading" in the coda: the page link plus the closing line.
   3. "Save as a story image": a 1080x1920 card drawn in the browser,
      shared as a file where the device allows it, downloaded otherwise.
   Links carry the sharer's referral code (same key as save-share.js) and
   UTM tags so landings show in analytics. No birth data, ever. */
import { openShare } from '/js/modules/share-modal.js';

const sec = document.getElementById('meaning');
if (sec && sec.dataset.slug) init(sec);

function myRef() {
  try { return localStorage.getItem('zodi:myref:real') === '1' ? (localStorage.getItem('zodi:myref') || '') : ''; }
  catch { return ''; }
}
function tagged(path, campaign, slug) {
  const u = new URL(path, 'https://www.zodianimal.com');
  const ref = myRef();
  if (ref) u.searchParams.set('ref', ref);
  u.searchParams.set('utm_source', 'reading');
  u.searchParams.set('utm_medium', 'share');
  u.searchParams.set('utm_campaign', campaign);
  u.searchParams.set('utm_content', slug);
  return u.href;
}
function track(method, slug, kind) {
  try { if (typeof window.gtag === 'function') window.gtag('event', 'share', { method, content_type: kind, item_id: slug }); } catch {}
}
const art = w => (/^[AEIOU]/i.test(w) ? 'an ' : 'a ') + w;

function init(sec) {
  const d = sec.dataset;
  sec.addEventListener('click', e => {
    const send = e.target.closest('[data-kr-send]');
    if (send) {
      const other = send.dataset.krSend;
      const hard = send.dataset.krHard === '1';
      const text = hard
        ? `I'm the ${d.name}. The wheel says ${art(other)} would be my hardest match. Think you're one? Come check.`
        : `I'm the ${d.name}. The old pairings say ${art(other)} is good for me. Are you my ${other}?`;
      openShare({ heading: hard ? 'Dare a friend' : 'Ask a friend', title: `Are you my ${other}?`, text,
                  url: tagged(`/vs.html?with=${d.slug}`, hard ? 'match_hard' : 'match', d.slug) });
      track(hard ? 'send_hard_match' : 'send_match', d.slug, 'reading_match');
      return;
    }
    if (e.target.closest('[data-kr-share]')) {
      openShare({ heading: 'Share your reading', title: `What the ${d.name} means`, text: `I'm the ${d.name}. "${d.close}"`, url: tagged(`/animals/${d.slug}/`, 'reading', d.slug) });
      track('share_reading', d.slug, 'reading');
      return;
    }
    const cardBtn = e.target.closest('[data-kr-card]');
    if (cardBtn) { storyCard(d, cardBtn); track('story_image', d.slug, 'reading_card'); }
  });
}

/* ---- story card ---- */
function loadImg(src) {
  return new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
}
function wrap(x, text, maxW) {
  const words = text.split(/\s+/), lines = [];
  let line = '';
  for (const w of words) {
    const t = line ? line + ' ' + w : w;
    if (x.measureText(t).width > maxW && line) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  return lines;
}
async function storyCard(d, btn, noArt) {
  const W = 1080, H = 1920;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const x = cv.getContext('2d');
  try { await document.fonts.ready; } catch {}
  const cs = getComputedStyle(document.documentElement);
  const serif = (cs.getPropertyValue('--serif') || 'Georgia, serif').trim();
  const sans = (cs.getPropertyValue('--sans') || 'system-ui, sans-serif').trim();
  const gold = '#d6c18c', snow = '#f2ede0', mist = '#a9aabd';
  const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0a0b14'); g.addColorStop(1, '#1a1c33');
  x.fillStyle = g; x.fillRect(0, 0, W, H);
  let seed = 0; for (const c of d.slug) seed = (seed * 31 + c.charCodeAt(0)) >>> 0;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < 170; i++) { x.globalAlpha = 0.15 + rnd() * 0.6; x.beginPath(); x.arc(rnd() * W, rnd() * H, 0.4 + rnd() * 1.8, 0, 7); x.fillStyle = snow; x.fill(); }
  x.globalAlpha = 1;
  x.strokeStyle = 'rgba(214,193,140,.5)'; x.lineWidth = 2; x.strokeRect(56, 56, W - 112, H - 112);
  const art = d.art && !noArt ? await loadImg(d.art) : null;
  x.textAlign = 'center';
  x.fillStyle = gold; x.font = `600 30px ${sans}`;
  x.fillText('ZODI ANIMAL', W / 2, 330);
  if (art) {
    const glow = x.createRadialGradient(540, 690, 40, 540, 690, 330); glow.addColorStop(0, 'rgba(214,193,140,.28)'); glow.addColorStop(1, 'rgba(214,193,140,0)');
    x.fillStyle = glow; x.fillRect(180, 330, 720, 720);
    x.drawImage(art, 290, 440, 500, 500);
  } else {
    const mg = x.createRadialGradient(500, 660, 20, 540, 690, 150); mg.addColorStop(0, snow); mg.addColorStop(1, gold);
    x.beginPath(); x.arc(540, 690, 130, 0, 7); x.fillStyle = mg; x.shadowColor = 'rgba(214,193,140,.55)'; x.shadowBlur = 80; x.fill(); x.shadowBlur = 0;
    x.beginPath(); x.arc(585, 670, 112, 0, 7); x.fillStyle = '#0d0e1a'; x.fill();
  }
  x.fillStyle = mist; x.font = `500 36px ${sans}`;
  x.fillText(d.cross, W / 2, 1020);
  x.fillStyle = snow; x.font = `600 ${d.name.length > 16 ? 96 : 124}px ${serif}`;
  x.fillText(d.name, W / 2, 1150);
  x.fillStyle = gold; x.font = `600 28px ${sans}`;
  x.fillText('IS THIS YOU?', W / 2, 1245);
  x.fillStyle = snow; x.font = `italic 400 50px ${serif}`;
  wrap(x, d.line, 820).slice(0, 4).forEach((l, i) => x.fillText(l, W / 2, 1325 + i * 66));
  x.fillStyle = mist; x.font = `500 32px ${sans}`;
  x.fillText('Find your animal at zodianimal.com', W / 2, 1600);
  const blob = await new Promise(r => { try { cv.toBlob(r, 'image/png'); } catch { r(null); } });
  if (!blob) { if (art) return storyCard(d, btn, true); return; }
  const name = `zodi-animal-${d.slug}.png`;
  try {
    const file = new File([blob], name, { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], text: `I'm the ${d.name}. Find yours at zodianimal.com` });
      return;
    }
  } catch (err) { if (err && err.name === 'AbortError') return; }
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1500);
  const old = btn.textContent; btn.textContent = 'Saved to your downloads'; setTimeout(() => { btn.textContent = old; }, 2400);
}
