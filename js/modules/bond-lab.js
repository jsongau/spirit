/* Bond Lab — "Approach a friend." The closer's centerpiece.
   Year Wheel entry (the scrubber teaches the 12-year cycle as you use
   it), month grid, day field. One friend gives the pair reading with
   the Two Skies crest; a second friend gives the trio reading with a
   triangle crest and group verdict. Reset at any time.
   Engine mirrors the site's ENGINE (data.js/engine.js); verified
   against it across the lunar boundary table. */
import { WEST_ORDER, EAST_ORDER, GRID } from './zodi-map.js';
import { openShare } from './share-modal.js';
import { WEST_DATES, WEST_EL, GLYPH, HANZI, EAST_REL, TRINES, FIXED_EL, GENERATES, CONTROLS,
  EL_HANZI, EL_COLOR, EL_PALETTE, YEAR_EL_BY_DIGIT, CNY } from './zodi-relations.js';

const TRINE_NAMES = ['first trine, the doers', 'second trine, the steady ones', 'third trine, the free spirits', 'fourth trine, the peacemakers'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function computeAnimal(y, m, d) {
  let sign = 'Capricorn';
  for (const name of WEST_ORDER) {
    const [sm, sd, em, ed] = WEST_DATES[name];
    const hit = sm <= em
      ? ((m === sm && d >= sd) || (m === em && d <= ed) || (m > sm && m < em))
      : ((m === sm && d >= sd) || (m === em && d <= ed) || m > sm || m < em);
    if (hit) { sign = name; break; }
  }
  let eff = y;
  const b = CNY[y] || [2, 4];
  if (m < b[0] || (m === b[0] && d < b[1])) eff = y - 1;
  const animal = EAST_ORDER[((eff - 2020) % 12 + 12) % 12];
  const cell = GRID[sign][animal];
  return { sign, animal, name: cell.n, slug: cell.s, effYear: eff, approx: !CNY[y] };
}
const yearAnimal = y => EAST_ORDER[((y - 2020) % 12 + 12) % 12];
const an = w => (/^[AEIOU]/.test(w) ? 'an' : 'a');

/* ---- pairwise relations (tone: warm | open | work) ---- */
function eastBond(a, b) {
  if (a === b) return { key: 'same', label: 'Same year', tone: 'warm', score: 1,
    take: 'Same year. Same clock, same blind spots.',
    verdict: 'Two of the same year. You run on the same clock, love the same pace, and can miss the same blind spots at the same time.' };
  const r = EAST_REL[a];
  if (r.secret === b) return { key: 'secret', label: 'Secret friends', tone: 'warm', score: 2,
    take: 'Secret friends. It works without explanation.',
    verdict: `${a} and ${b} are secret friends, the quiet allied pair of the Chinese zodiac. This bond tends to work without either of you being able to explain why.` };
  if (r.trine.includes(b)) return { key: 'trine', label: 'Same trine', tone: 'warm', score: 2,
    take: 'Natural allies. Effort in this bond compounds.',
    verdict: `${a} and ${b} share a trine. Natural allies who want the same things by different roads, so effort in this bond compounds.` };
  if (r.clash === b) return { key: 'clash', label: 'Opposite years', tone: 'work', score: -2,
    take: 'The mirror bond. Magnetic, and it takes translation.',
    verdict: `${a} and ${b} sit opposite each other on the wheel. The mirror bond: magnetic, instructive, and it asks for real translation work.` };
  if (r.harm === b) return { key: 'harm', label: 'Friction pair', tone: 'work', score: -1,
    take: 'A friction pair. Small habits grate first.',
    verdict: `${a} and ${b} are a friction pair. Small habits grate before big values do. Named early, the friction becomes texture instead of damage.` };
  return { key: 'neutral', label: 'Open pairing', tone: 'open', score: 0,
    take: 'No fixed bond. It becomes what you build.',
    verdict: `${a} and ${b} carry no fixed bond on the wheel. An open pairing that becomes whatever the two of you build.` };
}
function wuXing(a, b) {
  const A = FIXED_EL[a], B = FIXED_EL[b];
  if (A === B) return { A, B, kind: 'same', tone: 'warm', score: 1, arrow: 'both',
    take: `Doubled ${A}. Deep recognition, shared blind spot.`,
    line: `Both years carry ${A} ${EL_HANZI[A]}, a doubled element. Deep mutual recognition, and a shared blind spot when ${A} runs to excess.` };
  if (GENERATES[A] === B) return { A, B, kind: 'feeds', tone: 'warm', score: 1, arrow: 'out',
    take: `Your ${A} feeds their ${B}. You are their fuel.`,
    line: `Your ${A} feeds their ${B} in the generating cycle. You are nourishment for them. Watch that the feeding runs both ways.` };
  if (GENERATES[B] === A) return { A, B, kind: 'fed', tone: 'warm', score: 1, arrow: 'in',
    take: `Their ${B} feeds your ${A}. They are fuel for you.`,
    line: `Their ${B} feeds your ${A} in the generating cycle. This person is fuel for you. What they bring, you grow on.` };
  if (CONTROLS[A] === B) return { A, B, kind: 'controls', tone: 'work', score: -1, arrow: 'out',
    take: `Your ${A} restrains their ${B}. Banks to their river.`,
    line: `Your ${A} restrains their ${B} in the controlling cycle. You are the banks to their river, steadying at best, damming at worst.` };
  return { A, B, kind: 'controlled', tone: 'work', score: -1, arrow: 'in',
    take: `Their ${B} restrains your ${A}. They temper you.`,
    line: `Their ${B} restrains your ${A} in the controlling cycle. They temper you, a check that protects when it is welcome and chafes when it is not.` };
}
function westBlend(a, b) {
  const A = WEST_EL[a], B = WEST_EL[b];
  if (A === B) return { tone: 'warm', score: 1, take: `Both ${A} signs. Instant fluency.`, line: `${a} and ${b} are both ${A} signs. Instant fluency, shared weather, and nobody holding the umbrella.` };
  const pair = [A, B].sort().join('+');
  if (pair === 'Air+Fire') return { tone: 'warm', score: 1, take: 'Air feeds flame. Point it at something.', line: `Air feeds flame. ${a} and ${b} accelerate each other. Thrilling, and worth pointing at something.` };
  if (pair === 'Earth+Water') return { tone: 'warm', score: 1, take: 'Water and earth. You make each other possible.', line: `Water shapes earth, and earth holds water. ${a} and ${b} make each other more possible.` };
  if (pair === 'Fire+Water') return { tone: 'work', score: 0, take: 'Steam when it works, standoff when it does not.', line: `Fire and Water run on opposite instincts. Steam when it works, standoff when it does not. Timing is everything here.` };
  if (pair === 'Earth+Fire') return { tone: 'open', score: 0, take: 'The hearth pairing. Slow to sync, hard to put out.', line: `Earth and Fire is the hearth pairing. One burns, one holds the burning. Slow to sync, hard to put out once synced.` };
  if (pair === 'Air+Earth') return { tone: 'open', score: 0, take: 'Idea meets ground. Better plans, some friction.', line: `Air and Earth: idea meets ground. ${a} and ${b} frustrate each other into better plans.` };
  return { tone: 'open', score: 0, take: 'Adjacent languages. Translation is the relationship.', line: `Air and Water: thought meets feeling. ${a} and ${b} speak adjacent languages, and translation is the relationship.` };
}
const RESONANCE = ['Opposing tides', 'Crosscurrents', 'Open water', 'Strong current', 'Deep current'];
const pairScore = (a, b) => Math.max(1, Math.min(5, 3 + eastBond(a.animal, b.animal).score + wuXing(a.animal, b.animal).score + westBlend(a.sign, b.sign).score));

/* ============================================================ */
export function initBondLab(ctx) {
  const lab = document.getElementById('bond-lab');
  if (!lab) return;
  const self = { ...ctx.data.self, who: 'You' };
  const form = lab.querySelector('form');
  const out = document.getElementById('bond-result');
  const err = document.getElementById('bond-error');
  const partyEl = document.getElementById('bond-party');
  let wantSecond = false; /* the third-animal surprise stays hidden until asked for */
  if (!form || !out) return;

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* One reading row: a scannable take-line that expands in place to the
     sublabel, teaching line, and full verdict. First row starts open. */
  let rowIx = 0;
  const row = (k, ks, tone, teach, body, take) => {
    const id = `bondrow-${++rowIx}`;
    const open = rowIx === 1;
    return `
    <div class="bond-row" data-tone="${tone}">
      <h4 class="bond-row__h">
        <button type="button" class="bond-row__btn" aria-expanded="${open}" aria-controls="${id}">
          <span class="dot" aria-hidden="true"></span>
          <span class="txt"><span class="k">${k}</span><span class="take">${esc(take)}</span></span>
          <svg class="chev" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </h4>
      <div class="bond-row__body" id="${id}" ${open ? '' : 'data-closed'}>
        <div class="bond-row__inner">
          <p class="ks">${esc(ks)}</p>
          ${teach ? `<p class="teach">${esc(teach)}</p>` : ''}
          <p class="verdict">${esc(body)}</p>
        </div>
      </div>
    </div>`;
  };
  const rowsHead = `
    <div class="bond-rows__head">
      <span class="bond-rows__legend"><span class="dot" data-tone="warm"></span> flows <span class="dot" data-tone="work"></span> takes work</span>
      <button type="button" class="bond-openall" data-openall>Open all</button>
    </div>`;

  /* accordion behavior, delegated once (result HTML is replaced per render) */
  out.addEventListener('click', e => {
    const openAll = e.target.closest('[data-openall]');
    if (openAll) {
      const btns = [...out.querySelectorAll('.bond-row__btn')];
      const anyClosed = btns.some(b => b.getAttribute('aria-expanded') === 'false');
      btns.forEach(b => setRow(b, anyClosed));
      openAll.textContent = anyClosed ? 'Close all' : 'Open all';
      return;
    }
    const btn = e.target.closest('.bond-row__btn');
    if (btn) setRow(btn, btn.getAttribute('aria-expanded') === 'false');
  });
  function setRow(btn, open) {
    btn.setAttribute('aria-expanded', String(open));
    const body = document.getElementById(btn.getAttribute('aria-controls'));
    if (body) { if (open) body.removeAttribute('data-closed'); else body.setAttribute('data-closed', ''); }
  }
  const TEACH = {
    wheel: 'The twelve year animals sit around one wheel, and the seats name the bond: allies in the same trine, secret friends, opposites, or an open pairing.',
    wuxing: 'Each year animal carries one of five elements, and the elements feed or restrain each other in a fixed cycle.',
    suns: 'Month and day set the Western sign, and every sign burns one of four elements: Fire, Earth, Air, or Water.'
  };
  const learnRow = `
    <p class="bond-learn">New to these systems? Read <a href="/chinese-zodiac/">the twelve year animals</a>, <a href="/elements/">the five elements</a>, and <a href="/western-zodiac/">the twelve Sun signs</a>.</p>`;

  /* ---- party state (persists) ---- */
  let friends = ctx.ls.getJSON('bond:party', []); /* [{who,y,m,d,...computed}] */

  /* ---- Year Wheel wiring ---- */
  const range = form.querySelector('#bw-range');
  const yearField = form.querySelector('#bw-yearfield');
  const hanziEl = form.querySelector('#bw-hanzi');
  const yearOut = form.querySelector('#bw-year');
  const animalOut = form.querySelector('#bw-animal');
  const minus = form.querySelector('#bw-minus');
  const plus = form.querySelector('#bw-plus');
  const monthBtns = [...form.querySelectorAll('.bw-month')];
  const dayEl = form.elements.bday_day;
  const westEcho = form.querySelector('#bw-west');
  let month = 0;

  function setYear(y, fromField) {
    y = Math.max(+range.min, Math.min(+range.max, y || +range.value));
    range.value = y;
    if (!fromField) yearField.value = y;
    const a = yearAnimal(y);
    yearOut.textContent = y;
    animalOut.textContent = a;
    hanziEl.textContent = HANZI[a];
    range.setAttribute('aria-valuetext', `${y}, Year of the ${a}`);
  }
  range.addEventListener('input', () => setYear(+range.value));
  minus.addEventListener('click', () => setYear(+range.value - 1));
  plus.addEventListener('click', () => setYear(+range.value + 1));
  yearField.addEventListener('input', () => {
    yearField.value = yearField.value.replace(/\D/g, '').slice(0, 4);
    if (yearField.value.length === 4) setYear(+yearField.value, true);
  });

  function updateWestEcho() {
    const d = +dayEl.value || 0;
    if (month && d >= 1 && d <= new Date(2000, month, 0).getDate()) {
      const w = computeAnimal(2000, month, d).sign;
      westEcho.textContent = `${MONTHS[month - 1]} ${d} makes them ${an(w)} ${w} ${GLYPH[w]}`;
    } else { westEcho.textContent = ''; }
  }
  monthBtns.forEach(b => b.addEventListener('click', () => {
    month = +b.dataset.m;
    monthBtns.forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    updateWestEcho();
    if (!dayEl.value) dayEl.focus();
  }));
  dayEl.addEventListener('input', () => { dayEl.value = dayEl.value.replace(/\D/g, '').slice(0, 2); updateWestEcho(); });
  setYear(+range.value);

  function resetEntry() {
    form.elements.who.value = '';
    dayEl.value = '';
    month = 0;
    monthBtns.forEach(x => x.setAttribute('aria-pressed', 'false'));
    westEcho.textContent = '';
    err.hidden = true;
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    err.hidden = true;
    const y = +range.value, d = +dayEl.value || 0;
    if (!month) { err.textContent = 'Pick the month they were born.'; err.hidden = false; return; }
    const dim = new Date(y, month, 0).getDate();
    if (d < 1 || d > dim) { err.textContent = `${MONTHS[month - 1]} ${y} has ${dim} days.`; err.hidden = false; return; }
    const f = { ...computeAnimal(y, month, d), who: form.elements.who.value.trim() || `Friend ${friends.length + 1}` };
    friends = [...friends, f].slice(-2);
    ctx.ls.setJSON('bond:party', friends);
    wantSecond = false;
    resetEntry();
    renderAll();
    out.scrollIntoView({ behavior: ctx.reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
  });

  /* ---- rendering ---- */
  function medallion(cx, cy, p, color, r = 42, node) {
    const isNode = node != null;
    return `<g${isNode ? ` class="tri-node" data-node="${node}"` : ''}>
      ${isNode ? `<circle cx="${cx}" cy="${cy}" r="${r + 11}" fill="transparent"/><circle class="node-ring" cx="${cx}" cy="${cy}" r="${r + 11}" fill="none" stroke="${color}" stroke-width="1.6"/>` : ''}
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="1.6"/>
      <circle cx="${cx}" cy="${cy}" r="${r + 6}" fill="none" stroke="${color}" stroke-opacity=".25" stroke-width="1"/>
      <text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="18" fill="#ece7d8">${GLYPH[p.sign]} ${HANZI[p.animal]}</text>
      <text x="${cx}" y="${cy + 18}" text-anchor="middle" font-family="Space Mono, monospace" font-size="8" letter-spacing="1.2" fill="${color}">${EL_HANZI[FIXED_EL[p.animal]]} ${FIXED_EL[p.animal].toUpperCase()}</text>
      <text x="${cx}" y="${cy + r + 20}" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-size="15" fill="#ece7d8">${esc(p.name)}</text>
      <text x="${cx}" y="${cy + r + 36}" text-anchor="middle" font-family="Space Mono, monospace" font-size="8.5" letter-spacing="1.2" fill="#adaec2">${esc(p.who.toUpperCase()).slice(0, 18)}</text>
    </g>`;
  }
  const colorOf = p => p.who === 'You'
    ? (getComputedStyle(document.body).getPropertyValue('--animal-primary').trim() || EL_COLOR[FIXED_EL[p.animal]])
    : EL_COLOR[FIXED_EL[p.animal]];

  function partyChips() {
    if (!friends.length) { partyEl.hidden = true; partyEl.innerHTML = ''; return; }
    partyEl.hidden = false;
    partyEl.innerHTML = `
      <span class="bond-chip bond-chip--self"><b>You</b> · ${esc(self.name)}</span>
      ${friends.map((f, i) => `<span class="bond-chip"><b>${esc(f.who)}</b> · ${esc(f.name)}
        <button type="button" class="bond-chip__x" data-remove="${i}" aria-label="Remove ${esc(f.who)} from the party">✕</button></span>`).join('')}
      <button type="button" class="bond-reset" id="bond-reset">Start over</button>`;
    partyEl.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => {
      friends.splice(+b.dataset.remove, 1);
      ctx.ls.setJSON('bond:party', friends);
      renderAll();
    }));
    const reset = partyEl.querySelector('#bond-reset');
    if (reset) reset.addEventListener('click', () => { friends = []; wantSecond = false; ctx.ls.setJSON('bond:party', friends); resetEntry(); renderAll(); });
  }

  function wireShare(btnId, title, text, url) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', () => openShare({ title, text, url }));
  }

  function renderAll() {
    partyChips();
    const stage = lab.querySelector('.bond-stage-label');
    if (stage) {
      stage.textContent = friends.length === 0 ? 'Your first friend'
        : friends.length === 1 ? 'One more friend' : 'The party of three';
      stage.hidden = friends.length === 1 && !wantSecond;
    }
    form.hidden = friends.length >= 2 || (friends.length === 1 && !wantSecond);
    if (friends.length === 0) { out.hidden = true; out.innerHTML = ''; return; }
    if (friends.length === 1) renderPair(friends[0]);
    else renderTrio(friends[0], friends[1]);
    out.hidden = false;
  }

  function renderPair(f) {
    const label = esc(f.who);
    const east = eastBond(self.animal, f.animal);
    const wx = wuXing(self.animal, f.animal);
    const west = westBlend(self.sign, f.sign);
    const selfColor = colorOf(self), friendColor = EL_COLOR[FIXED_EL[f.animal]];
    const score = pairScore(self, f);
    const url = `https://www.zodianimal.com/animals/${f.slug}/?with=${self.slug}`;
    const same = f.slug === self.slug;
    const shareText = same
      ? `We are both the ${f.name}. Same animal, same instincts. Find your Zodi Animal:`
      : `${label}, you are the ${f.name} (${f.sign} × ${f.animal}) and I am the ${self.name}. The wheel calls us ${east.label.toLowerCase()}. Read your Zodi Animal:`;
    const relText = wx.kind === 'same' ? `Both ${wx.A}` : wx.kind === 'feeds' ? `${wx.A} feeds ${wx.B}`
      : wx.kind === 'fed' ? `${wx.B} feeds ${wx.A}` : wx.kind === 'controls' ? `${wx.A} restrains ${wx.B}` : `${wx.B} restrains ${wx.A}`;
    const pulse = wx.arrow === 'both' ? '' :
      `<circle class="bc-pulse" r="4" fill="${wx.arrow === 'out' ? selfColor : friendColor}">
        <animateMotion dur="2.6s" repeatCount="indefinite" ${wx.arrow === 'in' ? 'keyPoints="1;0" keyTimes="0;1" calcMode="linear"' : ''} path="M90 74 Q 210 12 330 74"/>
      </circle>`;

    out.innerHTML = `
      <div class="bond-card" data-bond="${east.key}">
        <div class="bond-card__head">
          <p class="bond-card__kicker">The meeting</p>
          <p class="bond-card__name">${esc(self.name)} <span class="amp">&</span> ${esc(f.name)}</p>
          <p class="bond-card__cross">${label} is ${GLYPH[f.sign]} ${f.sign} × ${HANZI[f.animal]} ${f.animal}${f.approx ? ' · year boundary approximated' : ''}</p>
          <p class="bond-card__verdict-label">${esc(east.label)}</p>
        </div>
        <svg class="bond-crest" viewBox="0 0 420 172" role="img" aria-label="Two crossings meeting: ${esc(relText)}.">
          <defs><linearGradient id="bc-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="${selfColor}"/><stop offset="1" stop-color="${friendColor}"/>
          </linearGradient></defs>
          <path d="M90 74 Q 210 12 330 74" fill="none" stroke="url(#bc-grad)" stroke-width="1.5" stroke-dasharray="3 4"/>
          ${pulse}
          ${medallion(90, 74, self, selfColor)}
          ${medallion(330, 74, f, friendColor)}
          <text x="210" y="30" text-anchor="middle" font-family="Space Mono, monospace" font-size="8.5" letter-spacing="1.5" fill="#d6c18c">${esc(relText.toUpperCase())}</text>
        </svg>
        <div class="bond-weave" style="--self-c:${selfColor};--friend-c:${friendColor}" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
        <p class="bond-resonance" role="img" aria-label="Resonance ${score} of 5: ${RESONANCE[score - 1]}">
          ${[1, 2, 3, 4, 5].map(i => `<span class="dot${i <= score ? ' lit' : ''}"></span>`).join('')}
          <span class="word">${RESONANCE[score - 1]}</span>
        </p>
        ${rowsHead}
        <div class="bond-rows">
          ${(rowIx = 0, '')}${row('The wheel', `${self.animal} and ${f.animal}, seated on the 12-year cycle`, east.tone, TEACH.wheel, east.verdict, east.take)}
          ${row(`Wu Xing ${EL_HANZI[wx.A]}·${EL_HANZI[wx.B]}`, `the elements your years carry: ${wx.A} meets ${wx.B}`, wx.tone, TEACH.wuxing, wx.line, wx.take)}
          ${row('Two suns', `${self.sign} and ${f.sign}, your Western signs side by side`, west.tone, TEACH.suns, west.line, west.take)}
          ${row('A shared room', 'feng shui, from your two elements', 'open', '', `Feng shui turns the pair's elements into a palette: ground the room in ${EL_PALETTE[wx.A]}, with touches of ${EL_PALETTE[wx.B]} where you meet. Each element gets a corner that is fully its own.`, `${EL_PALETTE[wx.A][0].toUpperCase() + EL_PALETTE[wx.A].slice(1)}, with ${EL_PALETTE[wx.B]} where you meet.`)}
        </div>
        ${learnRow}
        <div class="bond-actions">
          <button type="button" class="btn" id="bond-share">Send this to ${label}</button>
          <a class="btn btn--ghost" href="/animals/${f.slug}/">Read the ${esc(f.name)}</a>
        </div>
        <div class="bond-surprise">
          <p class="bond-surprise__kicker">It turns out there is room for one more</p>
          <p class="bond-surprise__line">Two animals make a bond. Three make a triangle, and triangles tell more: the strongest edge, the working edge, and how the energy really moves around your group.</p>
          <button type="button" class="btn" id="bond-add">Bring in a second friend</button>
        </div>
        <p class="fineprint">The bond describes a pattern, not a verdict on two people. Year animal read against the lunar calendar.</p>
      </div>`;
    wireShare('bond-share', `The ${f.name} · Zodi Animal`, shareText, url);
    const add = document.getElementById('bond-add');
    if (add) add.addEventListener('click', () => {
      wantSecond = true;
      form.hidden = false;
      const stage = lab.querySelector('.bond-stage-label');
      if (stage) { stage.hidden = false; stage.textContent = 'One more friend'; }
      form.elements.who.focus();
      form.scrollIntoView({ behavior: ctx.reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  }

  function renderTrio(f1, f2) {
    const P = [self, f1, f2];
    const pairs = [[self, f1], [self, f2], [f1, f2]];
    const bonds = pairs.map(([a, b]) => eastBond(a.animal, b.animal));
    const scores = pairs.map(([a, b]) => pairScore(a, b));
    const groupScore = Math.round(scores.reduce((s, x) => s + x, 0) / 3);
    const colors = [colorOf(self), EL_COLOR[FIXED_EL[f1.animal]], EL_COLOR[FIXED_EL[f2.animal]]];

    /* completed trine check */
    const trineIx = TRINES.findIndex(t => P.every(p => t.includes(p.animal)));
    const els = P.map(p => FIXED_EL[p.animal]);
    let circuitLine;
    if (new Set(els).size === 1) {
      circuitLine = `Three ${els[0]} years in one room. Total mutual recognition, and nobody to break the pattern when ${els[0]} runs to excess. Invite difference on purpose.`;
    } else {
      const chain = [[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]].find(([a,b,c]) =>
        GENERATES[els[a]] === els[b] && GENERATES[els[b]] === els[c]);
      if (chain) {
        const namesOf = i => P[i].who === 'You' ? 'you' : P[i].who;
        circuitLine = `A generating chain: ${namesOf(chain[0])} (${els[chain[0]]}) feeds ${namesOf(chain[1])} (${els[chain[1]]}), who feeds ${namesOf(chain[2])} (${els[chain[2]]}). Energy moves one way around this group. Mind who is always the source and never the fed.`;
      } else {
        const rels = pairs.map(([a, b], i) => {
          const w = wuXing(a.animal, b.animal);
          const na = a.who === 'You' ? 'you' : a.who, nb = b.who === 'You' ? 'you' : b.who;
          return w.kind === 'same' ? `${na} and ${nb} share ${w.A}`
            : w.kind === 'feeds' ? `${na} feed${a.who === 'You' ? '' : 's'} ${nb}`
            : w.kind === 'fed' ? `${nb} feeds ${na}`
            : w.kind === 'controls' ? `${na} restrain${a.who === 'You' ? '' : 's'} ${nb}` : `${nb} restrains ${na}`;
        });
        circuitLine = `A mixed circuit: ${rels[0]}, ${rels[1]}, and ${rels[2]}. Feeding and restraint in one triangle. Healthy groups need both; just notice which seat you are in.`;
      }
    }
    const edgeName = (a, b) => `${a.name} & ${b.name}`;
    const edgeWho = (a, b) => `${a.who} & ${b.who}`;
    const strongest = scores.indexOf(Math.max(...scores));
    const trickiest = scores.indexOf(Math.min(...scores));
    const wheelLine = trineIx >= 0
      ? `The three of you complete the ${TRINE_NAMES[trineIx]}: ${TRINES[trineIx].join(', ')}. A full trine in one room is rare. This group moves as one animal when it decides to.`
      : `The strongest edge is ${edgeName(...pairs[strongest])} (${bonds[strongest].label.toLowerCase()}). The one that asks for work is ${edgeName(...pairs[trickiest])} (${bonds[trickiest].label.toLowerCase()}). Groups hold when the strong edge carries the working edge without keeping score.`;
    const palette3 = [...new Set(els)].map(e => EL_PALETTE[e]);
    const shareText = `Our three Zodi Animals: the ${self.name}, the ${f1.name}, and the ${f2.name}.${trineIx >= 0 ? ' We complete a full trine.' : ''} Find yours:`;
    const url = `https://www.zodianimal.com/animals/${self.slug}/`;
    /* three suns line */
    const wels = P.map(p => WEST_EL[p.sign]);
    const welCount = {};
    wels.forEach(e => { welCount[e] = (welCount[e] || 0) + 1; });
    const sunsIntro = `${self.sign}, ${f1.sign}, and ${f2.sign}: `;
    let sunsLine;
    if (new Set(wels).size === 1) sunsLine = sunsIntro + `three ${wels[0]} suns. The group shares one weather system, which is fluency and forecastability in equal measure. Import your differences from somewhere else.`;
    else if (new Set(wels).size === 3) sunsLine = sunsIntro + `three different suns (${wels.join(', ')}). Nobody shares weather here, so the group's range is wide and its default settings are few. Decisions take longer and land better.`;
    else {
      const majority = Object.keys(welCount).find(k => welCount[k] === 2);
      const minority = wels.find(e => e !== majority);
      sunsLine = sunsIntro + `two ${majority} suns and one ${minority}. The pair sets the room's temperature; the ${minority} sun is the group's counterweight. Protect the counterweight, it is doing quiet structural work.`;
    }

    out.innerHTML = `
      <div class="bond-card bond-card--trio" data-bond="${trineIx >= 0 ? 'trine' : 'trio'}">
        <div class="bond-card__head">
          <p class="bond-card__kicker">The party of three</p>
          <p class="bond-card__name">${esc(self.name)}, ${esc(f1.name)} <span class="amp">&</span> ${esc(f2.name)}</p>
          <p class="bond-card__cross">${esc(f1.who)}: ${f1.sign} × ${f1.animal} · ${esc(f2.who)}: ${f2.sign} × ${f2.animal}</p>
          <p class="bond-card__verdict-label">${trineIx >= 0 ? 'Completed trine' : 'Three crossings'}</p>
        </div>
        <svg class="bond-crest bond-crest--trio" viewBox="0 0 420 330" role="img" aria-label="Three crossings in one triangle: ${esc(self.name)}, ${esc(f1.name)} (${esc(f1.who)}), and ${esc(f2.name)} (${esc(f2.who)}).">
          <g stroke-dasharray="3 4" stroke-width="1.5" fill="none">
            <line class="tri-edge" data-edge="0" x1="210" y1="66" x2="100" y2="222" stroke="${colors[0]}" stroke-opacity=".55"/>
            <line class="tri-edge" data-edge="1" x1="210" y1="66" x2="320" y2="222" stroke="${colors[0]}" stroke-opacity=".55"/>
            <line class="tri-edge" data-edge="2" x1="100" y1="222" x2="320" y2="222" stroke="${colors[1]}" stroke-opacity=".55"/>
          </g>
          ${medallion(210, 66, self, colors[0], 38, 0)}
          ${medallion(100, 222, f1, colors[1], 38, 1)}
          ${medallion(320, 222, f2, colors[2], 38, 2)}
        </svg>
        <ul class="bond-edges">
          ${pairs.map(([a, b], i) => `<li data-tone="${bonds[i].tone}" data-edge="${i}" tabindex="0"><span class="e">${esc(edgeName(a, b))}<span class="w">${esc(edgeWho(a, b))}</span></span><span class="v">${esc(bonds[i].label)}</span><span class="s">${scores[i]}/5</span></li>`).join('')}
        </ul>
        <p class="bond-resonance" role="img" aria-label="Group resonance ${groupScore} of 5: ${RESONANCE[groupScore - 1]}">
          ${[1, 2, 3, 4, 5].map(i => `<span class="dot${i <= groupScore ? ' lit' : ''}"></span>`).join('')}
          <span class="word">Group: ${RESONANCE[groupScore - 1]}</span>
        </p>
        ${rowsHead}
        <div class="bond-rows">
          ${(rowIx = 0, '')}${row('The wheel', `${self.animal}, ${f1.animal}, and ${f2.animal} on the 12-year cycle`, trineIx >= 0 ? 'warm' : bonds[strongest].tone, TEACH.wheel, wheelLine, trineIx >= 0 ? 'A completed trine. The group moves as one animal.' : `Strongest edge: ${edgeName(...pairs[strongest])}.`)}
          ${row('Wu Xing circuit', `the elements your three years carry: ${els.join(', ')}`, 'open', TEACH.wuxing, circuitLine, new Set(els).size === 1 ? `Three ${els[0]} years. Total recognition.` : 'How the energy moves around your triangle.')}
          ${row('Three suns', `${self.sign}, ${f1.sign}, and ${f2.sign}, your Western signs together`, 'open', TEACH.suns, sunsLine, new Set(wels).size === 1 ? `Three ${wels[0]} suns. One weather system.` : new Set(wels).size === 3 ? 'Three skies. Wide range, slower decisions.' : 'Two shared suns and one counterweight.')}
          ${row('A shared room', 'feng shui, from your three elements', 'open', '', `Feng shui turns the group's elements into a palette: a room for the three of you grounds in ${palette3[0]}${palette3[1] ? `, opens with ${palette3[1]}` : ''}${palette3[2] ? `, and keeps one corner of ${palette3[2]}` : ''}. Three natures, one room, no throne.`, 'One room, three natures, no throne.')}
        </div>
        ${learnRow}
        <div class="bond-actions">
          <button type="button" class="btn" id="bond-share-trio">Send the trio reading</button>
          <a class="btn btn--ghost" href="/animals/${f1.slug}/">Read the ${esc(f1.name)}</a>
          <a class="btn btn--ghost" href="/animals/${f2.slug}/">Read the ${esc(f2.name)}</a>
        </div>
        <p class="fineprint">The bond describes a pattern, not a verdict on three people. Year animals read against the lunar calendar.</p>
      </div>`;
    wireShare('bond-share-trio', 'Our three Zodi Animals', shareText, url);

    /* Interactive triangle: hover a pairing row or a node to light the edge it
       belongs to and the two animals it joins. The edges also flow on their own. */
    const svg = out.querySelector('.bond-crest--trio');
    if (svg) {
      const edges = [...svg.querySelectorAll('.tri-edge')];
      const nodes = [...svg.querySelectorAll('.tri-node')];
      const rows = [...out.querySelectorAll('.bond-edges li')];
      const ENDS = [[0, 1], [0, 2], [1, 2]]; // which two nodes each edge joins
      const lit = (i, on) => {
        if (edges[i]) edges[i].classList.toggle('is-lit', on);
        if (rows[i]) rows[i].classList.toggle('is-lit', on);
        ENDS[i].forEach(n => nodes[n] && nodes[n].classList.toggle('is-lit', on));
      };
      rows.forEach((li, i) => {
        const on = () => lit(i, true), off = () => lit(i, false);
        li.addEventListener('pointerenter', on); li.addEventListener('pointerleave', off);
        li.addEventListener('focus', on); li.addEventListener('blur', off);
      });
      nodes.forEach((g, n) => {
        const touch = [0, 1, 2].filter(i => ENDS[i].includes(n));
        const on = () => touch.forEach(i => lit(i, true)), off = () => touch.forEach(i => lit(i, false));
        g.style.cursor = 'pointer';
        g.addEventListener('pointerenter', on); g.addEventListener('pointerleave', off);
      });
    }
  }

  renderAll();
}
