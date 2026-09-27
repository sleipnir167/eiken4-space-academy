// 文法レッスン：4級の文法14項目の解説と、その文法の問題（大問1・並べかえ）への入口
import { GRAMMAR } from '../../data/grammar.js';
import { PART1, ORDER } from '../bank.js';
import { esc, actions } from '../ui.js';
import { go } from '../app.js';
import { sfx } from '../sound.js';
import { say } from '../speech.js';
import { statsOf, pct } from './drill.js';

export function renderGrammar(root, params) {
  const key = params.key || GRAMMAR[0].key;
  const g = GRAMMAR.find((x) => x.key === key) || GRAMMAR[0];
  const qs = PART1.filter((q) => q.g === g.key);
  const os = ORDER.filter((o) => o.g === g.key);
  const st = statsOf(qs), so = statsOf(os);
  root.innerHTML = `
    <header class="page-head">
      <button class="icon-btn back" data-action="back" aria-label="もどる">‹</button>
      <h1>${g.icon} ${esc(g.title)} <small>${g.level}</small></h1>
    </header>
    <nav class="gram-nav">${GRAMMAR.map((x) => `<button class="chip ${x.key === g.key ? 'on' : ''}" data-key="${x.key}">${x.icon} ${esc(x.title)}</button>`).join('')}</nav>
    <section class="card lesson">
      <p class="lesson-summary">${esc(g.summary)}</p>
      ${g.points.map((pt) => `
        <div class="lesson-point">
          <h3>${esc(pt.h)}</h3>
          <p>${esc(pt.t)}</p>
          <ul class="lesson-ex">${pt.ex.map(([en, ja]) => `<li><button class="ex-en" data-say="${esc(en)}">${esc(en)} <span>🔊</span></button><span class="ex-ja">${esc(ja)}</span></li>`).join('')}</ul>
        </div>`).join('')}
      ${g.tips?.length ? `<div class="lesson-tips"><h3>💡 ここに注意</h3><ul>${g.tips.map((t) => `<li>${esc(t)}</li>`).join('')}</ul></div>` : ''}
    </section>
    <section class="card lesson-practice">
      <div><h2>この文法の問題</h2>
        <p class="small muted">${qs.length ? `4択（大問1）${qs.length}問・正答率 ${pct(st.acc)}` : ''}${qs.length && os.length ? '　' : ''}${os.length ? `並べかえ ${os.length}問・正答率 ${pct(so.acc)}` : ''}${!qs.length && !os.length ? 'この項目の問題は、筆記ドリルの中に少しずつ出てきます' : ''}</p></div>
      <div class="row-btns">
        ${qs.length ? '<button class="btn primary big" data-action="practice">✅ 4択で練習</button>' : ''}
        ${os.length ? '<button class="btn ok big" data-action="order">🧩 並べかえで練習</button>' : ''}
      </div>
    </section>`;
  root.querySelectorAll('.gram-nav [data-key]').forEach((b) => b.addEventListener('click', () => { sfx.select(); go('grammar', { key: b.dataset.key }); }));
  root.querySelectorAll('[data-say]').forEach((b) => b.addEventListener('click', () => say(b.dataset.say)));
  actions(root, {
    back: () => go('drill'),
    practice: () => { sfx.launch(); go('quiz', { part: 'r1', g: g.key }); },
    order: () => { sfx.launch(); go('orderplay', { mode: 'tile', g: g.key }); },
  });
}
