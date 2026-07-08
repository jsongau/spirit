/* ---- personality test ----
   The Dossier CTA opens an in-page test: ten questions, two per
   trait, scored 1..5 toward each axis. The reader's five-trait shape is
   matched against this animal's canonical shape (read from the data
   island). Close on every axis => a true <Animal>; one or more traits
   carried differently => a rare <Animal>, naming the axis that diverges.
   Progressive enhancement: JS off, the CTA still links to the route. */
export function initPersonality(ctx) {
  const dlg = document.getElementById('pt-modal');
  const open = document.getElementById('pt-open');
  if (!dlg || !open || typeof dlg.showModal !== 'function') return;

  const AXES = (ctx.data.axes || []).slice(0, 5);
  if (AXES.length < 5) return;
  const name = (ctx.data.self && ctx.data.self.name) || ctx.data.name || 'animal';
  const slug = ctx.slug;
  const byKey = {}; AXES.forEach(a => { byKey[a.key] = a; });

  /* Two questions per axis. Options score the axis 1 (its opposite) to
     5 (the trait itself). Order shuffled so it doesn't read as blocks. */
  const BANK = {
    stillness: [
      { q: "There is a goal across the room. Your first instinct is to—", opts: [
        { t: "Go. I am already moving toward it.", s: 1 },
        { t: "Size it up for a beat, then move.", s: 3 },
        { t: "Wait. The right moment comes to those who sit still.", s: 5 } ] },
      { q: "A quiet afternoon with nothing you have to do—", opts: [
        { t: "makes me restless; I will invent a mission.", s: 1 },
        { t: "is good in small doses.", s: 3 },
        { t: "is my favourite thing. I can just be.", s: 5 } ] } ],
    adaptability: [
      { q: "Halfway up, the route you planned is blocked. You—", opts: [
        { t: "find a new line without breaking stride.", s: 5 },
        { t: "adjust, a little grudgingly.", s: 3 },
        { t: "hold the original plan; I do not abandon a route.", s: 1 } ] },
      { q: "Your ideal week—", opts: [
        { t: "changes shape daily; I love a pivot.", s: 5 },
        { t: "has a frame with room to flex.", s: 3 },
        { t: "runs the same way every time, on purpose.", s: 1 } ] } ],
    perception: [
      { q: "You make your best calls by—", opts: [
        { t: "reading every signal first; I want the whole picture.", s: 5 },
        { t: "a mix of reading and gut.", s: 3 },
        { t: "trusting instinct; my claws know before my head does.", s: 1 } ] },
      { q: "Before a hard decision you—", opts: [
        { t: "study it from every side.", s: 5 },
        { t: "look once, then leap.", s: 3 },
        { t: "already know; I just move.", s: 1 } ] } ],
    openness: [
      { q: "New people get—", opts: [
        { t: "the real me quickly; I am an open door.", s: 5 },
        { t: "a warm but measured version.", s: 3 },
        { t: "very little at first; the door stays shut until they earn it.", s: 1 } ] },
      { q: "Your inner world is—", opts: [
        { t: "shared freely; I think out loud.", s: 5 },
        { t: "shared with a chosen few.", s: 3 },
        { t: "kept private, shown only to the ones who have earned it.", s: 1 } ] } ],
    rootedness: [
      { q: "Once you commit to something hard, you—", opts: [
        { t: "hold on long past the point most people quit.", s: 5 },
        { t: "stay, unless it truly stops making sense.", s: 3 },
        { t: "keep it loose; I can always drift to the next thing.", s: 1 } ] },
      { q: "People describe your follow-through as—", opts: [
        { t: "relentless; I do not come down halfway.", s: 5 },
        { t: "solid, most of the time.", s: 3 },
        { t: "spontaneous; I follow the current.", s: 1 } ] } ]
  };

  /* Build the ordered question list: interleave axes so no two adjacent
     questions test the same trait. */
  const ORDER = AXES.map(a => a.key).filter(k => BANK[k]);
  const QUESTIONS = [];
  [0, 1].forEach(round => ORDER.forEach(k => {
    const set = BANK[k]; if (set && set[round]) QUESTIONS.push({ axis: k, ...set[round] });
  }));
  const TOTAL = QUESTIONS.length;

  /* Rare-result reads, worded relative to this animal's own value. */
  const READS = {
    stillness: { hi: `Where the ${name} moves toward the target, you can sit with it. You wait better than the ${name} does, and sometimes the waiting is the whole wisdom.`,
                 lo: `You run even hotter than the ${name}: pure motion, where the ${name} at least picks one tree before it climbs.` },
    adaptability: { hi: `You bend where the ${name} grips. You will change routes the ${name} would have held to the very end.`,
                    lo: `You hold your line harder than the ${name}. One route, no detours, come what may.` },
    perception: { hi: `You read the climb more than the ${name} does; you want the whole map before the first move.`,
                  lo: `You run on instinct where the ${name} pauses to look. Claws first, questions later.` },
    openness: { hi: `You are a far more open door than the ${name}. You let people in where the ${name} keeps the mark private.`,
                lo: `You guard the door even tighter than the ${name}, and that is a genuinely rare kind of private.` },
    rootedness: { hi: `You grip even harder than the ${name}, and that is saying something.`,
                  lo: `Here is the twist. The ${name}'s defining trait is Rootedness, and yours runs the other way. Where the ${name} never comes down halfway, you keep your grip loose and drift to the next climb. Same four traits, but the spine of the animal reversed. That is a truly rare ${name}.` }
  };

  const el = sel => dlg.querySelector(sel);
  const screens = {
    intro: el('[data-pt-screen="intro"]'),
    quiz: el('[data-pt-screen="quiz"]'),
    result: el('[data-pt-screen="result"]')
  };
  const fillEl = el('[data-pt-fill]'), countEl = el('[data-pt-count]'),
        qEl = el('[data-pt-question]'), optsEl = el('[data-pt-options]'), backEl = el('[data-pt-back]');

  let idx = 0;
  const answers = new Array(TOTAL).fill(null); // score per question

  function show(which) {
    Object.values(screens).forEach(s => s.classList.remove('is-active'));
    screens[which].classList.add('is-active');
    try { screens[which].focus({ preventScroll: true }); } catch {}
  }

  function renderQuestion() {
    const item = QUESTIONS[idx];
    fillEl.style.width = ((idx) / TOTAL * 100) + '%';
    countEl.textContent = `Question ${idx + 1} of ${TOTAL} · ${byKey[item.axis].label}`;
    qEl.textContent = item.q;
    optsEl.innerHTML = item.opts.map((o, i) =>
      `<li><button type="button" class="pt-opt${answers[idx] === o.s ? ' is-chosen' : ''}" data-score="${o.s}" data-i="${i}">${o.t}</button></li>`
    ).join('');
    backEl.hidden = idx === 0;
  }

  optsEl.addEventListener('click', e => {
    const btn = e.target.closest('.pt-opt'); if (!btn) return;
    answers[idx] = +btn.dataset.score;
    optsEl.querySelectorAll('.pt-opt').forEach(b => b.classList.remove('is-chosen'));
    btn.classList.add('is-chosen');
    fillEl.style.width = ((idx + 1) / TOTAL * 100) + '%';
    setTimeout(() => {
      if (idx < TOTAL - 1) { idx++; renderQuestion(); }
      else finish();
    }, 220);
  });

  backEl.addEventListener('click', () => { if (idx > 0) { idx--; renderQuestion(); } });

  /* Radar: this animal's canonical shape plus the reader's shape. */
  function drawRadar(userVals) {
    const svg = el('[data-pt-radar]');
    const NS = 'http://www.w3.org/2000/svg';
    const CX = 80, CY = 80, R = 54, N = AXES.length, MAX = 5;
    const pt = (i, r) => { const a = -Math.PI / 2 + i * 2 * Math.PI / N; return [CX + r * Math.cos(a), CY + r * Math.sin(a)]; };
    let out = '';
    // rings
    for (let ring = 1; ring <= MAX; ring++) {
      const p = AXES.map((_, i) => pt(i, R * ring / MAX).map(n => n.toFixed(1)).join(',')).join(' ');
      out += `<polygon class="ring" points="${p}"/>`;
    }
    // spokes + labels
    AXES.forEach((ax, i) => {
      const [ex, ey] = pt(i, R);
      out += `<line class="spoke" x1="${CX}" y1="${CY}" x2="${ex.toFixed(1)}" y2="${ey.toFixed(1)}"/>`;
      const [lx, ly] = pt(i, R + 11);
      const anchor = Math.abs(lx - CX) < 6 ? 'middle' : (lx < CX ? 'end' : 'start');
      out += `<text class="lbl" x="${lx.toFixed(1)}" y="${(ly + 2).toFixed(1)}" text-anchor="${anchor}">${ax.label.slice(0, 4)}</text>`;
    });
    const poly = vals => AXES.map((_, i) => pt(i, R * vals[i] / MAX).map(n => n.toFixed(1)).join(',')).join(' ');
    out += `<polygon class="bear" points="${poly(AXES.map(a => a.value))}"/>`;
    out += `<polygon class="you" points="${poly(userVals)}"/>`;
    AXES.forEach((_, i) => { const [x, y] = pt(i, R * userVals[i] / MAX); out += `<circle class="you-node" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6"/>`; });
    svg.innerHTML = out;
  }

  function finish() {
    fillEl.style.width = '100%';
    // average the two answers per axis
    const userVals = AXES.map(ax => {
      const scores = QUESTIONS.map((q, i) => q.axis === ax.key ? answers[i] : null).filter(v => v != null);
      const avg = scores.reduce((a, b) => a + b, 0) / (scores.length || 1);
      return Math.max(1, Math.min(5, Math.round(avg)));
    });
    const diffs = AXES.map((ax, i) => Math.abs(userVals[i] - ax.value));
    // most divergent axis (tie -> prefer signature, then declared order)
    let worst = 0;
    for (let i = 1; i < AXES.length; i++) {
      if (diffs[i] > diffs[worst] ||
         (diffs[i] === diffs[worst] && AXES[i].signature && !AXES[worst].signature)) worst = i;
    }
    const maxDiff = Math.max(...diffs);
    const isTrue = maxDiff <= 1.5;

    el('[data-pt-verdict]').textContent = isTrue ? 'The verdict' : 'The verdict · rare';
    el('[data-pt-title]').textContent = isTrue ? `You are a true ${name}.` : `You are a rare ${name}.`;

    // axis chips
    el('[data-pt-axes]').innerHTML = AXES.map((ax, i) => {
      const d = diffs[i], cls = d <= 1 ? 'match' : (d >= 2 ? 'diff' : '');
      return `<span class="pt-axis-chip ${cls}" title="${ax.label}: you ${userVals[i]} of 5, ${name} ${ax.value} of 5">${ax.label} <b>${userVals[i]}·${ax.value}</b></span>`;
    }).join('');

    // read
    let read;
    if (isTrue) {
      const sig = AXES.find(a => a.signature) || AXES[4];
      read = `Every one of your five traits landed where the ${name} carries it: the motion, the grip, the guarded door, and above all the <b>${sig.label}</b> that refuses to come down halfway. You climb the way the ${name} climbs.`;
    } else {
      const ax = AXES[worst], higher = userVals[worst] > ax.value;
      const dir = (READS[ax.key] || {})[higher ? 'hi' : 'lo'] ||
        `Your <b>${ax.label}</b> sits ${higher ? 'above' : 'below'} the ${name}'s.`;
      read = `Four of the ${name}'s five traits are yours. But your <b>${ax.label}</b> is carried differently. ${dir}`;
    }
    el('[data-pt-read]').innerHTML = read;

    drawRadar(userVals);

    // share payload
    const url = `https://www.zodianimal.com/animals/${slug}/`;
    const worstLabel = AXES[worst].label.toLowerCase();
    const text = isTrue
      ? `I took the ${name} test and I'm a true ${name}. First up the tree, built to finish. What are you?`
      : `I took the ${name} test, and it turns out I'm a rare ${name}: my ${worstLabel} runs the other way. What are you?`;
    dlg._ptShare = { title: `My ${name} result`, text, url };

    show('result');
  }

  function reset() { idx = 0; answers.fill(null); fillEl.style.width = '0%'; }

  open.addEventListener('click', e => {
    e.preventDefault();
    reset(); renderQuestion(); show('intro'); dlg.showModal();
  });
  el('[data-pt-start]').addEventListener('click', () => { reset(); renderQuestion(); show('quiz'); });
  el('[data-pt-retake]').addEventListener('click', () => { reset(); renderQuestion(); show('quiz'); });
  el('[data-pt-share]').addEventListener('click', () => { if (dlg._ptShare && typeof openShare === 'function') openShare(dlg._ptShare); });
  el('[data-pt-close]').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
}

