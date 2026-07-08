/* One ARIA tabs engine for every tablist on the page
   (Primal Mirror, work facets, relationship modes, palette roles).
   Markup contract: [role=tablist] with [role=tab][aria-controls];
   panels are [role=tabpanel]. Panels show/hide via .is-active —
   CSS only hides inactive panels under body.js-on, so JS-off
   renders everything stacked. */
export function initTabGroups() {
  document.querySelectorAll('[role="tablist"]').forEach(list => {
    const tabs = [...list.querySelectorAll('[role="tab"]')];
    if (!tabs.length) return;
    const panelOf = t => document.getElementById(t.getAttribute('aria-controls'));

    function activate(tab, focus) {
      tabs.forEach(t => {
        const sel = t === tab;
        t.setAttribute('aria-selected', sel ? 'true' : 'false');
        t.tabIndex = sel ? 0 : -1;
        const p = panelOf(t);
        if (p) p.classList.toggle('is-active', sel);
      });
      if (focus) tab.focus();
      list.dispatchEvent(new CustomEvent('tabchange', { detail: { tab }, bubbles: true }));
    }

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => activate(tab, false));
      tab.addEventListener('keydown', e => {
        const horiz = list.getAttribute('aria-orientation') !== 'vertical';
        const next = horiz ? 'ArrowRight' : 'ArrowDown';
        const prev = horiz ? 'ArrowLeft' : 'ArrowUp';
        let n = null;
        if (e.key === next || e.key === 'ArrowDown') n = (i + 1) % tabs.length;
        else if (e.key === prev || e.key === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); activate(tabs[n], true); }
      });
    });

    const current = tabs.find(t => t.getAttribute('aria-selected') === 'true') || tabs[0];
    activate(current, false);
  });
}
