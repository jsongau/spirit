/* Exploration — personalizes the primary "best next reading" card
   from local signals, with the editorial default as fallback.
   Signals (cheap, private, local-only):
   - saved a keeper stone  → stones hub variant
   - visited #bonds        → compatibility variant
   Otherwise the server-rendered editorial recommendation stands. */
export function initExploration(ctx) {
  const card = document.querySelector('.explore-primary[data-personalize]');
  if (!card) return;
  const variants = ctx.data.exploreVariants || {};
  const visited = new Set(ctx.ls.getJSON('visited', []));

  let pick = null;
  if (ctx.ls.get('stone')) pick = variants.stone;
  else if (visited.has('bonds')) pick = variants.bonds;
  if (!pick) return; // editorial default already rendered

  const title = card.querySelector('h3');
  const why = card.querySelector('p');
  const link = card.querySelector('a.btn, a.cta-pill, a[data-primary-link]');
  if (title && pick.title) title.textContent = pick.title;
  if (why && pick.why) why.textContent = pick.why;
  if (link && pick.href) { link.href = pick.href; link.textContent = pick.label || link.textContent; }
}
