/* ============================================================
   ANIMAL PROFILE — entry module for all 144 Zodi Animal pages.
   Progressive enhancement only: the HTML is complete without JS.
   Contract: <body class="pf-page" data-animal="<slug>"> plus a
   JSON island <script type="application/json" id="animal-data">.
   localStorage prefix: zodi:<slug>:
   ============================================================ */
import { initTabGroups } from './modules/tabs.js';
import { initMirror } from './modules/primal-mirror.js';
import { initSignBalance } from './modules/sign-balance.js';
import { initReadingProgress } from './modules/reading-progress.js';
import { initSaveShare } from './modules/save-share.js';
import { initExploration } from './modules/exploration.js';
import { initAmbience } from './modules/ambience.js';
import { initBondLab } from './modules/bond-lab.js';
import { initShareModal } from './modules/share-modal.js';
import { initPersonality } from './modules/personality.js';

const body = document.body;
const slug = body.dataset.animal || 'animal';

/* Shared context passed to every module. */
const ctx = {
  slug,
  data: readData(),
  reduceMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
  ls: {
    get(k) { try { return localStorage.getItem(`zodi:${slug}:${k}`); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(`zodi:${slug}:${k}`, v); } catch {} },
    getJSON(k, fb) { const r = this.get(k); if (r == null) return fb; try { return JSON.parse(r); } catch { return fb; } },
    setJSON(k, v) { this.set(k, JSON.stringify(v)); }
  }
};

function readData() {
  const el = document.getElementById('animal-data');
  if (!el) return {};
  try { return JSON.parse(el.textContent); } catch { return {}; }
}

/* Run each module in isolation — a throw is logged, never propagated. */
function run(name, fn) {
  try { fn(ctx); } catch (e) { console.warn(`[animal-profile] module "${name}" failed:`, e); }
}

body.classList.add('js-on');
run('share-modal', initShareModal);
run('tabs', initTabGroups);
run('mirror', initMirror);
run('sign-balance', initSignBalance);
run('reading-progress', initReadingProgress);
run('save-share', initSaveShare);
run('exploration', initExploration);
run('ambience', initAmbience);
run('bond-lab', initBondLab);
run('personality', initPersonality);
