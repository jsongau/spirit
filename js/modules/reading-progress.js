/* Reading progress — rail current-chapter tracking, visited marks,
   chapter count, mobile bottom sheet, and the top progress strip. */
export function initReadingProgress(ctx) {
  const chapters = [...document.querySelectorAll('.rail-chapter[data-target]')];
  if (!chapters.length) return;
  const byTarget = t => chapters.filter(c => c.dataset.target === t); // desktop + mobile copies
  const sections = [...new Set(chapters.map(c => c.dataset.target))]
    .map(id => document.getElementById(id)).filter(Boolean);
  const progressEl = document.getElementById('rail-progress');
  const meterFill = document.getElementById('rail-meter-fill');
  /* the chapters that actually exist on THIS page (the layout changes between
     versions, so stored ids may point at sections that are gone) */
  const validTargets = new Set(chapters.map(c => c.dataset.target));
  const total = validTargets.size;
  /* drop any stored ids that no longer exist so the count can never exceed total */
  const visited = new Set(ctx.ls.getJSON('visited', []).filter(id => validTargets.has(id)));
  ctx.ls.setJSON('visited', [...visited]);
  const readCount = () => Math.min(total, [...visited].filter(id => validTargets.has(id)).length);

  function paint(currentId) {
    chapters.forEach(c => {
      const cur = c.dataset.target === currentId;
      if (cur) c.setAttribute('aria-current', 'true'); else c.removeAttribute('aria-current');
      c.classList.toggle('is-visited', visited.has(c.dataset.target) && !cur);
    });
    const n = readCount();
    if (progressEl) progressEl.innerHTML = `<b>${n}</b> of ${total} chapters read`;
    if (meterFill) meterFill.style.width = total ? `${Math.min(100, (n / total) * 100)}%` : '0%';
  }

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        visited.add(e.target.id);
        ctx.ls.setJSON('visited', [...visited]);
        paint(e.target.id);
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(s => io.observe(s));
  }
  paint(sections[0] && sections[0].id);

  /* top progress strip (mobile) */
  const strip = document.getElementById('read-progress');
  if (strip) {
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - innerHeight;
        strip.style.setProperty('--read', max > 0 ? Math.min(1, h.scrollTop / max) : 0);
        ticking = false;
      });
    }, { passive: true });
  }

  /* mobile bottom sheet */
  const toggle = document.getElementById('rail-chapters-toggle');
  const list = document.getElementById('rail-mobile-list');
  if (toggle && list) {
    const close = () => { list.hidden = true; toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const open = list.hidden;
      list.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
      if (open) { const first = list.querySelector('a'); if (first) first.focus(); }
    });
    list.addEventListener('click', e => { if (e.target.closest('a')) close(); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && !list.hidden) { close(); toggle.focus(); } });
  }
}
