// 模擬試験（一次試験）：リーディング（時間制限つき・マークシート）→ リスニング（自動で進行）→ 採点
import * as store from '../store.js';
import { PART2, ORDER, PART4, L1, L2, L3, part1Pool, shuffleChoices, passageById, orderById } from '../bank.js';
import { review, pick, shuffle } from '../srs.js';
import { gainXP, checkBadges } from '../game.js';
import { actions, esc, toast, confirmDialog, fmtTime, wait } from '../ui.js';
import { go } from '../app.js';
import { sfx } from '../sound.js';
import { mascot } from '../mascot.js';
import { stemHTML, passageHTML, feedbackHTML, bindFeedback, playListening, stopAudio, listenPicHTML, partOf, PART_LABEL, PART_SHORT } from '../question.js';
import { OrderTiles, comboChoices, CIRCLED } from '../tiles.js';
import { cse, PASS1, SKILL_MAX, SKILL_LINE } from '../predict.js';
import { rain, burst } from '../fx.js';

const byId = () => new Map([...part1Pool(store.get().custom), ...PART2, ...ORDER, ...PART4.flatMap((p) => p.qs), ...L1, ...L2, ...L3].map((q) => [q.id, q]));

const KINDS = {
  full: { name: '本番サイズ模試', icon: '🚀', desc: '筆記35問（35分）→ リスニング30問（約30分）', min: 35, r: [15, 5, 5], r4: ['A', 'B', 'C'], l: [10, 10, 10] },
  reading: { name: '筆記だけ', icon: '📖', desc: '大問1〜4の35問・35分。リスニングはなし', min: 35, r: [15, 5, 5], r4: ['A', 'B', 'C'], l: [0, 0, 0] },
  listen: { name: 'リスニングだけ', icon: '🎧', desc: '30問・約30分。本番どおり2回ずつ放送', min: 0, r: [0, 0, 0], r4: [], l: [10, 10, 10] },
  mini: { name: 'ミニ模試', icon: '⚡', desc: '筆記12問（12分）→ リスニング9問', min: 12, r: [6, 2, 2], r4: ['A'], l: [3, 3, 3] },
};

function build(kind) {
  const k = KINDS[kind];
  const s = store.get();
  const opt = { newRatio: 0.5 };
  const r1 = k.r[0] ? pick(part1Pool(s.custom), s.items, k.r[0], opt) : [];
  const r2 = k.r[1] ? pick(PART2, s.items, k.r[1], opt) : [];
  const r3 = k.r[2] ? pick(ORDER, s.items, k.r[2], opt) : [];
  const passages = k.r4.map((t) => shuffle(PART4.filter((p) => p.type === t))[0]);
  const r4 = passages.flatMap((p) => p.qs);
  const l = [L1, L2, L3].flatMap((pool, i) => (k.l[i] ? pick(pool, s.items, k.l[i], opt) : []));
  const sh = {};
  for (const q of [...r1, ...r2, ...r4, ...l]) sh[q.id] = shuffleChoices(q);
  for (const o of r3) {
    const tiles = shuffle(o.chunks.map((text, idx) => ({ idx, text }))).map((t, n) => ({ ...t, num: n + 1 }));
    const cc = comboChoices(o, tiles);
    sh[o.id] = { c: cc.c, a: cc.a, tiles };
  }
  const read = [...r1, ...r2, ...r3, ...r4];
  return {
    kind, started: Date.now(), phase: read.length ? 'r' : 'l',
    remain: k.min * 60, read: read.map((q) => q.id), listen: l.map((q) => q.id), passages: passages.map((p) => p.id),
    sh, ans: {}, lIdx: 0,
  };
}

export function renderExam(root, params) {
  if (params.run) return runExam(root, store.loadExamDraft());
  const s = store.get();
  const draft = store.loadExamDraft();
  const hist = [...s.exams].reverse().slice(0, 10);
  root.innerHTML = `
    <header class="play-head">
      <button class="icon-btn close" data-action="home" aria-label="閉じる">✕</button>
      <div class="play-title"><b>📝 模擬試験</b><small>本番の形式で実力をチェック</small></div>
    </header>
    <div class="stage exam-menu">
      ${draft ? `<section class="card resume-card"><h2>⏸ 中断した模試があります</h2><p class="small">${KINDS[draft.kind]?.name}（${new Date(draft.started).toLocaleString('ja-JP')}）</p><div class="row-btns"><button class="btn primary" data-action="resume">続きから</button><button class="btn ghost" data-action="discard">破棄する</button></div></section>` : ''}
      <section class="exam-kinds">
        ${Object.entries(KINDS).map(([id, k]) => `<button class="card exam-kind ek-${id}" data-action="start" data-k="${id}"><span class="ek-icon">${k.icon}</span><b>${k.name}</b><small>${k.desc}</small></button>`).join('')}
      </section>
      <section class="card">
        <h2>英検4級 一次試験の構成</h2>
        <table class="exam-table">
          <tr><th>技能</th><th>内容</th><th>CSE</th></tr>
          <tr><td>リーディング<br><small>35分</small></td><td>大問1 語句15問・大問2 会話文5問・大問3 並べかえ5問・大問4 長文10問（掲示2・Eメール3・説明文5）</td><td>500</td></tr>
          <tr><td>リスニング<br><small>約30分</small></td><td>第1部 会話の応答（3択・イラスト）・第2部 会話の内容・第3部 文の内容 各10問（2回放送）</td><td>500</td></tr>
          <tr class="sum"><td colspan="2">合格基準スコア</td><td>${PASS1} / 1000</td></tr>
        </table>
        <p class="tiny muted">スピーキングテストは一次試験とは別に、コンピューターで受けます（スピーキングのページで練習できます）。この模試の CSE は正答率からの換算による目安です。</p>
      </section>
      ${hist.length ? `<section class="card"><h2>これまでの模試</h2><ul class="exam-hist">${hist.map((e) => `<li class="${e.pass ? 'pass' : ''}"><span>${new Date(e.t).toLocaleDateString('ja-JP')}</span><b>${KINDS[e.kind]?.name || ''}</b><span>R ${e.r ? `${e.r.c}/${e.r.n}` : '-'}・L ${e.l ? `${e.l.c}/${e.l.n}` : '-'}</span><b class="ecse">${e.cse?.total ?? '--'}</b></li>`).join('')}</ul></section>` : ''}
    </div>`;
  actions(root, {
    home: () => go('home'),
    start: async (el) => {
      if (draft && !(await confirmDialog('中断中の模試は破棄されます。新しく始めますか？', { ok: '始める' }))) return;
      const d = build(el.dataset.k);
      store.saveExamDraft(d);
      sfx.chime();
      go('exam', { run: 1, t: Date.now() });
    },
    resume: () => go('exam', { run: 1, t: Date.now() }),
    discard: async () => { if (await confirmDialog('中断した模試を破棄しますか？', { ok: '破棄', danger: true })) { store.clearExamDraft(); go('exam', { t: Date.now() }); } },
  });
}

function runExam(root, d) {
  if (!d) { go('exam'); return; }
  const Q = byId();
  let finished = false;
  const save = () => { if (!finished) store.saveExamDraft(d); };
  let timer = null;
  let aborted = false;
  const tileObjs = [];

  // ---------------- リーディング ----------------
  function readingPhase() {
    const read = d.read.map((id) => Q.get(id)).filter(Boolean);
    const groups = { r1: [], r2: [], r3: [] };
    read.forEach((q) => { const p = partOf(q); if (groups[p]) groups[p].push(q); });
    let n = 0;
    const qBlock = (q) => {
      n++;
      const sh = d.sh[q.id];
      const a = d.ans[q.id];
      const p = partOf(q);
      return `<div class="exq ${p}" id="q-${n}" data-id="${esc(q.id)}"><span class="exq-n">(${n})</span>
        ${p === 'r3' ? `<div class="tiles-host" data-oid="${esc(q.id)}"></div>` : stemHTML(q)}
        <div class="choices compact ${p === 'r3' ? 'combo-choices' : ''}">${sh.c.map((c, i) => `<button class="choice ${a === i ? 'sel' : ''}" data-action="ans" data-id="${esc(q.id)}" data-i="${i}"><span class="num">${i + 1}</span><span class="ctext">${p === 'r3' ? c : esc(c)}</span></button>`).join('')}</div></div>`;
    };
    const passages = d.passages.map((pid) => passageById.get(pid)).filter(Boolean);
    let html = '';
    if (groups.r1.length) html += `<section class="card exam-sec"><h2><span class="sec-n">1</span>短文の語句空所補充</h2><p class="small muted">(　)に入れるのに最も適切なものを1つ選びなさい。</p>${groups.r1.map(qBlock).join('')}</section>`;
    if (groups.r2.length) html += `<section class="card exam-sec"><h2><span class="sec-n">2</span>会話文の文空所補充</h2><p class="small muted">(　)に入れるのに最も適切なものを1つ選びなさい。</p>${groups.r2.map(qBlock).join('')}</section>`;
    if (groups.r3.length) html += `<section class="card exam-sec"><h2><span class="sec-n">3</span>日本文つき短文の語句整序</h2><p class="small muted">日本文の意味を表すように①から⑤までを並べかえて(　)の中に入れなさい。そして、2番目と4番目にくるものの最も適切な組合せを1つ選びなさい。※(　)の中では、文のはじめにくる語も小文字になっています。<br>タイルはメモ用に動かせます。</p>${groups.r3.map(qBlock).join('')}</section>`;
    for (const p of passages) html += `<section class="card exam-sec"><h2><span class="sec-n">4${p.type}</span>${p.type === 'A' ? '掲示・お知らせ' : p.type === 'B' ? 'Eメール・手紙' : '説明文・物語'}</h2>${passageHTML(p.id)}${p.qs.map(qBlock).join('')}</section>`;
    const total = n;
    root.innerHTML = `
      <header class="play-head exam-head">
        <button class="icon-btn close" data-action="pause" aria-label="中断">⏸</button>
        <div class="play-title"><b>${KINDS[d.kind].name}</b><small>リーディング</small></div>
        <span class="exam-timer"><b>${fmtTime(d.remain)}</b></span>
        <button class="btn primary small" data-action="to-next">${d.listen.length ? 'リスニングへ ▶' : '提出する'}</button>
      </header>
      <div class="exam-layout">
        <nav class="exam-nav" aria-label="解答用紙">
          <p class="en-title">解答用紙</p>
          ${Array.from({ length: total }, (_, i) => `<a href="#q-${i + 1}" class="en-q" data-n="${i + 1}"><span>${i + 1}</span><i></i><i></i><i></i><i></i></a>`).join('')}
        </nav>
        <main class="exam-main">${html}</main>
      </div>`;
    // 大問3 のタイル（メモ用）
    root.querySelectorAll('.tiles-host').forEach((host) => {
      const o = orderById.get(host.dataset.oid);
      const t = new OrderTiles(o, { tiles: d.sh[o.id].tiles });
      tileObjs.push(t);
      host.appendChild(t.el);
    });
    const updNav = () => {
      root.querySelectorAll('.exq').forEach((el, i) => {
        const a = d.ans[el.dataset.id];
        const nav = root.querySelector(`.en-q[data-n="${i + 1}"]`);
        nav?.classList.toggle('done', a != null);
        nav?.querySelectorAll('i').forEach((b, k) => b.classList.toggle('on', a === k));
      });
    };
    updNav();
    root.querySelectorAll('.en-q').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); root.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }));
    clearInterval(timer);
    timer = setInterval(() => {
      d.remain = Math.max(0, d.remain - 1);
      const el = root.querySelector('.exam-timer b');
      if (el) { el.textContent = fmtTime(d.remain); el.parentElement.classList.toggle('low', d.remain < 300); }
      if (d.remain % 10 === 0) save();
      if (d.remain === 300) toast('残り5分です', { icon: '⏰' });
      if (d.remain <= 0) { clearInterval(timer); toast('時間になりました', { icon: '⏰' }); sfx.chime(); nextPhase(true); }
    }, 1000);
    actions(root, {
      ans: (el) => {
        d.ans[el.dataset.id] = +el.dataset.i;
        el.parentElement.querySelectorAll('.choice').forEach((b) => b.classList.toggle('sel', b === el));
        sfx.tap(); save(); updNav();
      },
      'to-next': () => nextPhase(false),
      pause: async () => { save(); if (await confirmDialog('模試を中断しますか？<br><small>あとで続きから再開できます</small>', { ok: '中断する' })) { aborted = true; go('exam'); } },
    });
  }

  async function nextPhase(force) {
    const unanswered = d.read.filter((id) => d.ans[id] == null).length;
    if (!force && unanswered && !(await confirmDialog(`まだ答えていない問題が ${unanswered} 問あります。${d.listen.length ? 'リスニングに進みますか？' : '提出しますか？'}<br><small>リーディングには戻れません</small>`, { ok: '進む' }))) return;
    clearInterval(timer);
    tileObjs.forEach((t) => t.destroy());
    if (d.listen.length) { d.phase = 'l'; save(); listenPhase(); } else submit();
  }

  // ---------------- リスニング ----------------
  function listenPhase() {
    const list = d.listen.map((id) => Q.get(id)).filter(Boolean);
    let paused = false;
    root.innerHTML = `
      <header class="play-head exam-head">
        <button class="icon-btn close" data-action="pause" aria-label="中断">⏸</button>
        <div class="play-title"><b>${KINDS[d.kind].name}</b><small>リスニング</small></div>
        <div class="play-prog"><i></i></div>
        <span class="play-count"></span>
      </header>
      <div class="stage exam-listen">
        <div class="card el-card">
          <p class="el-part"></p>
          <div class="listen-box big"><div class="el-visual"></div><span class="eq"><i></i><i></i><i></i><i></i><i></i></span></div>
          <p class="el-status">準備中…</p>
          <div class="choices el-choices"></div>
          <div class="row-btns center"><button class="mini-btn" data-action="hold">⏯ 一時停止</button><button class="mini-btn" data-action="skip">次の問題へ ▶</button></div>
        </div>
      </div>`;
    const status = root.querySelector('.el-status');
    const box = root.querySelector('.listen-box');
    let skipper = null;
    async function playOne(i) {
      if (aborted) return;
      if (i >= list.length) return submit();
      d.lIdx = i; save();
      const q = list[i];
      const p = partOf(q);
      const sh = d.sh[q.id];
      const partStart = list.findIndex((x) => partOf(x) === p);
      root.querySelector('.el-part').textContent = `${PART_LABEL[p]}　No.${i - partStart + 1}`;
      root.querySelector('.play-prog i').style.width = `${(i / list.length) * 100}%`;
      root.querySelector('.play-count').textContent = `${i + 1} / ${list.length}`;
      root.querySelector('.el-visual').innerHTML = p === 'l1' ? listenPicHTML(q) : '<span class="lb-emoji">🎧</span>';
      const ch = root.querySelector('.el-choices');
      ch.classList.toggle('l1-choices', p === 'l1');
      ch.innerHTML = sh.c.map((c, k) => `<button class="choice ${d.ans[q.id] === k ? 'sel' : ''}" data-action="lans" data-id="${esc(q.id)}" data-i="${k}"><span class="num">${k + 1}</span><span class="ctext">${p === 'l1' ? '' : esc(c)}</span></button>`).join('');
      await wait(900);
      status.textContent = '🔊 放送中…（2回流れます）';
      box.classList.add('playing');
      let skipped = false;
      skipper = () => { skipped = true; stopAudio(); };
      await playListening(q, sh, { times: 2 });
      box.classList.remove('playing');
      if (aborted) return;
      if (!skipped) {
        for (let t = 10; t > 0; t--) {
          if (aborted || skipped) break;
          while (paused && !aborted) await wait(300);
          status.textContent = `✏️ 解答時間 ${t} 秒`;
          await wait(1000);
        }
      }
      skipper = null;
      playOne(i + 1);
    }
    actions(root, {
      lans: (el) => { d.ans[el.dataset.id] = +el.dataset.i; el.parentElement.querySelectorAll('.choice').forEach((b) => b.classList.toggle('sel', b === el)); sfx.tap(); save(); },
      hold: (el) => { paused = !paused; el.textContent = paused ? '▶ 再開' : '⏯ 一時停止'; if (paused) status.textContent = '⏸ 一時停止中（解答時間を止めています）'; },
      skip: () => skipper?.(),
      pause: async () => { save(); if (await confirmDialog('模試を中断しますか？<br><small>リスニングは今の問題から再開できます</small>', { ok: '中断する' })) { aborted = true; stopAudio(); go('exam'); } },
    });
    playOne(d.lIdx || 0);
  }

  // ---------------- 採点 ----------------
  function submit() {
    if (finished) return;
    finished = true;
    clearInterval(timer);
    stopAudio();
    const readQs = d.read.map((id) => Q.get(id)).filter(Boolean);
    const lisQs = d.listen.map((id) => Q.get(id)).filter(Boolean);
    const okOf = (q) => d.ans[q.id] === d.sh[q.id].a;
    // 忘却曲線にも反映
    store.update((st) => { for (const q of [...readQs, ...lisQs]) if (d.ans[q.id] != null) st.items[q.id] = review(st.items[q.id], okOf(q)); });
    for (const q of [...readQs, ...lisQs]) if (d.ans[q.id] != null) store.logAnswer(partOf(q), okOf(q), 0);
    const r = readQs.length ? { c: readQs.filter(okOf).length, n: readQs.length } : null;
    const l = lisQs.length ? { c: lisQs.filter(okOf).length, n: lisQs.length } : null;
    const cs = { r: r ? cse(r.c / r.n) : null, l: l ? cse(l.c / l.n) : null };
    const full = cs.r != null && cs.l != null;
    cs.total = (cs.r || 0) + (cs.l || 0);
    const pass = full ? cs.total >= PASS1 : [cs.r, cs.l].filter((x) => x != null).every((x) => x >= SKILL_LINE);
    const byPart = {};
    for (const q of [...readQs, ...lisQs]) { const p = partOf(q); byPart[p] = byPart[p] || { c: 0, n: 0 }; byPart[p].n++; if (okOf(q)) byPart[p].c++; }
    store.update((st) => { st.exams.push({ t: Date.now(), kind: d.kind, r, l, cse: cs, pass, full, parts: byPart }); });
    store.clearExamDraft();
    const xp = 60 + ((r?.c || 0) + (l?.c || 0)) * 2;
    gainXP(xp);
    checkBadges({});
    if (pass) { sfx.pass(); rain(120); } else sfx.finish();
    showResult({ readQs, lisQs, r, l, cs, pass, full, xp, okOf, byPart });
  }

  function orderReview(q) {
    const sh = d.sh[q.id];
    const num = (i) => sh.tiles.find((t) => t.idx === i).num;
    const mine = d.ans[q.id];
    return `<div class="feedback ${mine === sh.a ? 'ok' : 'ng'}">
      <p class="order-ja">${esc(q.ja)}</p>
      <p class="fb-sentence en">${esc(q.sentence)}</p>
      <p class="small">語句：${sh.tiles.map((t) => `${CIRCLED[t.num - 1]} ${esc(t.text)}`).join('　')}</p>
      <p class="fb-key small">2番目＝<b>${CIRCLED[num(1) - 1]} ${esc(q.chunks[1])}</b>、4番目＝<b>${CIRCLED[num(3) - 1]} ${esc(q.chunks[3])}</b> → 正解「${sh.c[sh.a]}」${mine != null ? `／あなたの答え「${sh.c[mine]}」` : ''}</p>
      ${q.x ? `<p class="fb-x">💡 ${esc(q.x)}</p>` : ''}
    </div>`;
  }

  function showResult({ readQs, lisQs, r, l, cs, pass, full, xp, okOf, byPart }) {
    const bar = (label, v, raw) => `<div class="skill ${v == null ? 'none' : ''}"><div class="skill-head"><b>${label}</b><span>${v ?? '--'}<small>/${SKILL_MAX}</small></span></div><div class="skill-bar"><i style="width:${((v || 0) / SKILL_MAX) * 100}%" class="${v >= SKILL_LINE ? 'ok' : ''}"></i><em style="left:${(SKILL_LINE / SKILL_MAX) * 100}%"></em></div><small class="muted">${raw}</small></div>`;
    const all = [...readQs, ...lisQs];
    const wrong = all.filter((q) => !okOf(q));
    const wrongQuiz = wrong.filter((q) => partOf(q) !== 'r3').map((q) => q.id);
    const wrongOrder = wrong.filter((q) => partOf(q) === 'r3').map((q) => q.id);
    const snippet = (q) => (q.q || q.ja || q.lines?.map((x) => x[1]).join(' ') || '').slice(0, 60);
    root.innerHTML = `
      <header class="play-head"><button class="icon-btn close" data-action="close" aria-label="閉じる">✕</button><div class="play-title"><b>模試の結果</b><small>${KINDS[d.kind].name}</small></div></header>
      <div class="stage exam-result">
        <section class="card result ${pass ? 'pass' : ''}">
          <div class="result-top">
            ${mascot(pass ? 'cheer' : 'normal', 'float')}
            <div>
              <p class="eyebrow">${full ? '一次試験 CSE スコア（目安）' : '技能別 CSE スコア（目安）'}</p>
              <p class="result-score"><b>${cs.total}</b>${full ? ' / 1000' : ''}</p>
              <p class="result-sub">${pass ? '🌸 合格ラインをこえています！' : full ? `合格ライン ${PASS1} まであと ${PASS1 - cs.total}` : '技能ごとの合格ラインの目安と比べてみよう'}・+${xp} XP</p>
            </div>
          </div>
          <div class="skills">
            ${r ? bar('Reading', cs.r, `${r.c} / ${r.n} 問正解`) : ''}
            ${l ? bar('Listening', cs.l, `${l.c} / ${l.n} 問正解`) : ''}
          </div>
          <div class="part-scores">${Object.entries(byPart).map(([p, x]) => `<div class="${x.c / x.n >= 0.6 ? 'good' : 'bad'}"><small>${PART_SHORT[p]}</small><b>${x.c}<span>/${x.n}</span></b></div>`).join('')}</div>
        </section>
        <section class="card">
          <h2>見直し <small>タップで解説</small></h2>
          <ul class="review-list">
            ${all.map((q) => `<li class="${okOf(q) ? 'ok' : 'ng'}"><button data-action="rev" data-id="${esc(q.id)}"><span class="mark">${okOf(q) ? '○' : '×'}</span><small>${PART_SHORT[partOf(q)]}</small><span>${esc(snippet(q))}</span><span class="ra">${d.ans[q.id] != null ? d.ans[q.id] + 1 : '-'} → ${d.sh[q.id].a + 1}</span></button><div class="rev-body" hidden></div></li>`).join('')}
          </ul>
        </section>
        <div class="result-actions">
          ${wrongQuiz.length ? `<button class="btn ghost" data-action="retry-wrong">まちがえた${wrongQuiz.length}問を練習</button>` : ''}
          ${wrongOrder.length ? `<button class="btn ghost" data-action="retry-order">並べかえ${wrongOrder.length}問を練習</button>` : ''}
          <button class="btn primary" data-action="close">模試メニューへ</button>
        </div>
      </div>`;
    actions(root, {
      close: () => go('exam', { t: Date.now() }),
      'retry-wrong': () => go('quiz', { part: 'ids', ids: wrongQuiz.join(',') }),
      'retry-order': () => go('orderplay', { mode: 'exam', ids: wrongOrder.join(',') }),
      rev: (el) => {
        const body = el.nextElementSibling;
        if (!body.hidden) { body.hidden = true; return; }
        const q = Q.get(el.dataset.id);
        const p = partOf(q);
        if (p === 'r3') body.innerHTML = orderReview(q);
        else {
          body.innerHTML = `${q.pid && p === 'r4' ? '' : stemHTML(q, { fill: d.sh[q.id].c[d.sh[q.id].a] })}${feedbackHTML(q, d.sh[q.id], d.ans[q.id] ?? null)}`;
          bindFeedback(body, q, d.sh[q.id], d.ans[q.id] ?? null);
        }
        body.hidden = false;
      },
    });
    if (pass) burst({ count: 80, kind: 'star' });
  }

  if (d.phase === 'l') listenPhase(); else readingPhase();
  return () => { aborted = true; clearInterval(timer); stopAudio(); tileObjs.forEach((t) => t.destroy()); save(); };
}
