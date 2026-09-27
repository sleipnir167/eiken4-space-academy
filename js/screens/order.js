// 並べかえ（大問3）
//  tile：タイルを並べる ／ exam：本番形式（2番目と4番目の組み合わせを選ぶ）／ write：英文を書こう（手書き・キーボード）
import * as store from '../store.js';
import { ORDER, orderById } from '../bank.js';
import { review, pick, shuffle, status } from '../srs.js';
import { recordAnswer, xpForAnswer, checkBadges, award } from '../game.js';
import { actions, esc, toast, confirmDialog } from '../ui.js';
import { go } from '../app.js';
import { sfx } from '../sound.js';
import { say, stop as stopSpeech, alignReading } from '../speech.js';
import { burst, floatText, shake, judgeMark, rain } from '../fx.js';
import { mascot } from '../mascot.js';
import { OrderTiles, comboChoices, CIRCLED } from '../tiles.js';
import { starButton, bindStar, bindAIBox } from '../question.js';
import { explainOrderPrompt, checkSentencePrompt } from '../prompts.js';
import { chatJSON, aiReady } from '../ai.js';
import { Pad } from '../pad.js';
import { recognizeLines } from '../recognizer.js';
import { GRAMMAR } from '../../data/grammar.js';
import { statsOf, pct } from './drill.js';

const MODES = {
  tile: { icon: '🧩', name: 'タイルで並べる', desc: 'タップ（またはドラッグ）で語句を並べて英文を完成させる。まずはここから' },
  exam: { icon: '📝', name: '本番形式', desc: '並べたときの「2番目と4番目」の組み合わせを4つから選ぶ。本番と同じ答え方' },
  write: { icon: '✍️', name: '英文を書こう', desc: '日本文を見て英文をまるごと書く（手書き・キーボード）。上級チャレンジ！' },
};
const gTitle = (k) => (k === 'idiom' ? '熟語' : GRAMMAR.find((g) => g.key === k)?.title || k);
const writeKey = (o) => `rw:${o.id.slice(3)}`;

export function renderOrder(root) {
  const s = store.get();
  const st = statsOf(ORDER);
  const wst = statsOf(ORDER.map((o) => ({ id: writeKey(o) })));
  const keys = [...new Set(ORDER.map((o) => o.g))];
  const weak = ORDER.filter((o) => status(s.items[o.id]) === 'weak' || s.stars[`q:${o.id}`]).length;
  let src = localStorage.getItem('e4-order-src') || 'auto';
  const sample = ORDER[5];

  const draw = () => {
    root.innerHTML = `
    <header class="page-head"><h1>並べかえ <small>大問3・日本文つき短文の語句整序（本番 5問）</small></h1></header>
    <section class="card order-intro">
      <div class="oi-text">
        <h2>🧩 語順パズルで、英語の「順番」を体で覚えよう</h2>
        <p class="small">本番では（ ）の中の5つの語句を並べかえて、<b>2番目と4番目</b>にくるものの組み合わせを選びます。</p>
        <ul class="tips small">
          <li>まず日本文の<b>「だれが」「どうする」</b>をさがす → 英語は「主語 → 動詞 → 何を → どこで → いつ」の順</li>
          <li>疑問文は <b>疑問詞 → do / does / did / be → 主語</b> の順</li>
          <li>熟語（be good at / in front of など）はかたまりで考える</li>
        </ul>
      </div>
      <div class="oi-demo" aria-hidden="true">
        <p class="small muted">${esc(sample.ja)}</p>
        <p class="demo-line">${esc(sample.pre)} ${sample.chunks.map((c, i) => `<span class="demo-tile ${i === 1 || i === 3 ? 'key' : ''}" style="--d:${i}">${esc(c)}</span>`).join(' ')} ${esc(sample.post)}</p>
      </div>
    </section>

    <section class="card">
      <h2>モードを選ぶ</h2>
      <div class="mode-grid three">
        ${Object.entries(MODES).map(([id, m]) => `<button class="mode" data-action="start" data-m="${id}"><span class="mode-icon">${m.icon}</span><b>${m.name}</b><small>${m.desc}</small></button>`).join('')}
      </div>
      <h3 class="sub-h">範囲</h3>
      <div class="chips">
        <button class="chip ${src === 'auto' ? 'on' : ''}" data-action="src" data-v="auto">🌀 おまかせ（忘却曲線）</button>
        ${weak ? `<button class="chip ${src === 'weak' ? 'on' : ''}" data-action="src" data-v="weak">🎯 苦手 ${weak}</button>` : ''}
        ${keys.map((k) => `<button class="chip ${src === `g:${k}` ? 'on' : ''}" data-action="src" data-v="g:${k}">${esc(gTitle(k))}<small>${ORDER.filter((o) => o.g === k).length}</small></button>`).join('')}
      </div>
      <div class="order-stats">
        <div><b>${st.seen}</b><small>/ ${st.total} 問 解いた</small></div>
        <div><b>${pct(st.acc)}</b><small>正答率（タイル・本番）</small></div>
        <div><b>${wst.seen}</b><small>英文を書いた</small></div>
      </div>
    </section>`;
  };
  actions(root, {
    src: (el) => { src = el.dataset.v; localStorage.setItem('e4-order-src', src); sfx.select(); draw(); },
    start: (el) => {
      sfx.launch();
      const p = { mode: el.dataset.m };
      if (src === 'weak') p.weak = 1; else if (src.startsWith('g:')) p.g = src.slice(2);
      go('orderplay', p);
    },
  });
  draw();
}

// ---------- 英文の比較 ----------
const CONTR = { "i'm": 'i am', "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "can't": 'cannot', "won't": 'will not', "it's": 'it is', "let's": 'let us', "i'll": 'i will', "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not', "weren't": 'were not', "you're": 'you are', "he's": 'he is', "she's": 'she is', "that's": 'that is', "what's": 'what is', "we're": 'we are', "they're": 'they are', "i'd": 'i would', "there's": 'there is' };
export const normSentence = (s) => String(s || '').toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-z0-9' ]+/g, ' ')
  .split(/\s+/).filter(Boolean).map((w) => CONTR[w] || w).join(' ').replace(/\bcan not\b/g, 'cannot').trim();

// ---------- 英文を書く入力（手書き2行・キーボード） ----------
class SentenceInput {
  constructor() {
    const st = store.settings();
    this.mode = st.spellMode === 'keyboard' ? 'keyboard' : 'hand';
    this.el = document.createElement('div');
    this.el.className = `sentence-input si-${this.mode}`;
    if (this.mode === 'keyboard') {
      this.el.innerHTML = '<textarea class="text-in si-kb" rows="2" autocapitalize="sentences" autocomplete="off" autocorrect="off" spellcheck="false" placeholder="英文を入力（iPad はペンで書いても OK）"></textarea>';
      this.input = this.el.querySelector('textarea');
    } else {
      this.pad = new Pad({ w: 1000, h: 420, guide: 'ruled', rows: 2, pen: 9, cls: 'pad-sentence', onStrokeEnd: () => sfx.pen() });
      this.el.appendChild(this.pad.el);
      this.el.insertAdjacentHTML('beforeend', '<p class="si-read small muted"></p>');
    }
  }
  isEmpty() { return this.mode === 'keyboard' ? !this.input.value.trim() : this.pad.isEmpty(); }
  clear() { if (this.mode === 'keyboard') this.input.value = ''; else this.pad.clear(); }
  undo() { if (this.pad) this.pad.undo(); }
  lock() { if (this.pad) this.pad.lock(); else this.input.readOnly = true; }
  focus() { this.input?.focus(); }
  /** 読み取った文字列を返す（読めないときは null） */
  async read() {
    if (this.mode === 'keyboard') return this.input.value.trim();
    const st = store.settings();
    if (st.judge !== 'auto' || navigator.onLine === false) return null;
    // ストロークを行ごとに分けて、それぞれ認識する
    const rows = [[], []];
    const rh = 420 / 2;
    for (const s of this.pad.getStrokes()) {
      const ys = s.map((p) => p[1]).sort((a, b) => a - b);
      const r = Math.min(1, Math.floor(ys[Math.floor(ys.length / 2)] / rh));
      rows[r].push(s.map(([x, y, t]) => [x, y - r * rh, t]));
    }
    try {
      const out = await recognizeLines(rows.map((strokes) => ({ strokes, w: 1000, h: rh })));
      const text = out.filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
      this.el.querySelector('.si-read').innerHTML = text ? `読み取り：<b>${esc(text)}</b>` : '';
      return text;
    } catch {
      return null;
    }
  }
  destroy() { this.pad?.destroy(); }
}

// ================= 並べかえの練習 =================
export function renderOrderPlay(root, params) {
  const mode = MODES[params.mode] ? params.mode : 'tile';
  const st = store.settings();
  const s = store.get();
  const keyOf = (o) => (mode === 'write' ? writeKey(o) : o.id);
  let pool = ORDER;
  if (params.ids) pool = params.ids.split(',').map((id) => orderById.get(id)).filter(Boolean);
  else if (params.g) pool = ORDER.filter((o) => o.g === params.g);
  else if (params.weak) pool = ORDER.filter((o) => status(s.items[o.id]) === 'weak' || s.stars[`q:${o.id}`]);
  if (!pool.length) pool = ORDER;
  const size = Math.min(mode === 'write' ? 5 : Math.max(5, st.sessionSize), pool.length);
  const deck = params.ids ? shuffle([...pool]) : pick(pool.map((o) => ({ ...o, id: keyOf(o), item: o })), s.items, size, { newRatio: st.newRatio }).map((x) => x.item);
  const queue = deck.map((o) => ({ o, retry: false }));
  let idx = 0, combo = 0, maxCombo = 0, xpSum = 0, busy = false, tiles = null, input = null, hinted = false, combos = null;
  const results = new Map();

  root.innerHTML = `
    <header class="play-head">
      <button class="icon-btn close" data-action="quit" aria-label="やめる">✕</button>
      <div class="play-title"><b>${MODES[mode].icon} ${MODES[mode].name}</b><small>${params.g ? esc(gTitle(params.g)) : '大問3 並べかえ'}</small></div>
      <div class="play-prog"><i></i></div>
      <span class="play-count"></span>
      <span class="combo-chip" hidden></span>
    </header>
    <div class="stage order-stage"></div>`;
  const stage = root.querySelector('.stage');
  const head = () => {
    root.querySelector('.play-prog i').style.width = `${(idx / queue.length) * 100}%`;
    root.querySelector('.play-count').textContent = `${Math.min(idx + 1, queue.length)} / ${queue.length}`;
    const cc = root.querySelector('.combo-chip');
    cc.hidden = combo < 3;
    cc.textContent = `🔥 ${combo} combo`;
  };

  function record(entry, grade, anchor) {
    const { o, retry } = entry;
    const ok = grade > 0;
    if (!retry) {
      store.update((x) => { x.items[keyOf(o)] = review(x.items[keyOf(o)], grade); });
      results.set(o.id, ok);
    }
    combo = ok ? combo + 1 : 0;
    maxCombo = Math.max(maxCombo, combo);
    const xp = retry ? (ok ? 3 : 0) : xpForAnswer(ok, combo) + (mode === 'write' && ok ? 10 : 0);
    xpSum += xp;
    recordAnswer(mode === 'write' ? 'write' : 'r3', ok, xp);
    if (ok) {
      sfx.correct(combo);
      if (xp && anchor) floatText(`+${xp}`, anchor, 'xp');
      if (combo && combo % 5 === 0) { sfx.combo(combo); burst({ count: 45, kind: 'star' }); }
    } else {
      sfx.wrong();
      if (!retry) queue.splice(Math.min(queue.length, idx + 3), 0, { o, retry: true });
    }
    head();
  }

  function show() {
    head();
    busy = false; hinted = false;
    tiles?.destroy(); tiles = null;
    input?.destroy(); input = null;
    stopSpeech();
    const { o, retry } = queue[idx];
    if (mode === 'write') {
      stage.innerHTML = `
        ${retry ? '<p class="retry-tag">🔁 もう一度</p>' : ''}
        <div class="q-card card write-card">
          <p class="eyebrow">日本文に合う英文を書こう</p>
          <p class="order-ja big">${esc(o.ja)}</p>
          <p class="write-frame small muted">${o.pre ? `<b>${esc(o.pre)}</b> ～ ` : ''}${o.post && !/^[,.?!]$/.test(o.post) ? `～ <b>${esc(o.post)}</b>` : ''}</p>
          <div class="write-hint" hidden>${shuffle([...o.chunks]).map((c) => `<span class="demo-tile">${esc(c)}</span>`).join(' ')}</div>
          <div class="si-host"></div>
          <div class="spell-tools">
            <button class="mini-btn" data-action="hint">💡 使う語句を見る</button>
            ${store.settings().spellMode === 'keyboard' ? '' : '<button class="mini-btn" data-action="undo">↶ 1画もどす</button>'}
            <button class="mini-btn" data-action="clear">全部消す</button>
            <button class="btn primary" data-action="check-write">判定する ✓</button>
          </div>
        </div>
        <div class="fb-host"></div>`;
      input = new SentenceInput();
      stage.querySelector('.si-host').appendChild(input.el);
      input.focus();
      return;
    }
    stage.innerHTML = `
      ${retry ? '<p class="retry-tag">🔁 もう一度</p>' : ''}
      <div class="q-card card order-card">
        <p class="eyebrow">${mode === 'exam' ? '日本文の意味を表すように（ ）内の語句を並べかえて、2番目と4番目にくるものの組み合わせを選ぼう' : 'タイルをタップして、日本文に合う英文を作ろう'}</p>
        <div class="tiles-host"></div>
        ${mode === 'exam' ? '<div class="choices combo-choices"></div><p class="tiny muted">上のタイルはメモ用に動かせます（本番の問題用紙に書きこむのと同じ）</p>' : `
        <div class="spell-tools">
          <button class="mini-btn" data-action="reset">↺ やり直す</button>
          <button class="mini-btn" data-action="tile-hint">💡 1番目を教えて</button>
          <button class="btn primary" data-action="check" disabled>判定する ✓</button>
        </div>`}
      </div>
      <div class="fb-host"></div>`;
    tiles = new OrderTiles(o, {
      onChange: (t) => { const b = stage.querySelector('[data-action="check"]'); if (b) b.disabled = !t.isFull(); },
    });
    stage.querySelector('.tiles-host').appendChild(tiles.el);
    if (mode === 'exam') {
      combos = comboChoices(o, tiles.tiles);
      stage.querySelector('.combo-choices').innerHTML = combos.c.map((c, i) => `<button class="choice" data-action="combo" data-i="${i}"><span class="num">${i + 1}</span><span class="ctext">${c}</span></button>`).join('');
    }
  }

  function feedback(o, ok, extra = '') {
    const num = (i) => tiles ? tiles.tiles.find((t) => t.idx === i)?.num : null;
    const n2 = num(1), n4 = num(3);
    const host = stage.querySelector('.fb-host');
    host.innerHTML = `
      <div class="feedback ${ok ? 'ok' : 'ng'}">
        <div class="fb-head">
          <span class="fb-mark">${ok ? '○ 正解！' : '× ざんねん'}</span>
          ${starButton(`q:${o.id}`)}
        </div>
        <p class="fb-sentence en">${esc(o.sentence)} <button class="icon-btn speak small" data-action="say-sentence" aria-label="英文を聞く">🔊</button></p>
        <p class="small muted">${esc(o.ja)}</p>
        ${n2 ? `<p class="fb-key small">本番なら：2番目＝<b>${CIRCLED[n2 - 1]} ${esc(o.chunks[1])}</b>、4番目＝<b>${CIRCLED[n4 - 1]} ${esc(o.chunks[3])}</b> → 答えは「<b>${CIRCLED[n2 - 1]} － ${CIRCLED[n4 - 1]}</b>」</p>` : ''}
        ${extra}
        ${o.x ? `<p class="fb-x">💡 ${esc(o.x)}</p>` : ''}
        ${o.g && o.g !== 'idiom' ? `<button class="mini-btn" data-action="lesson" data-g="${o.g}">🧪 文法レッスン「${esc(gTitle(o.g))}」を見る</button>` : ''}
        <div class="ai-box">
          <button class="btn ai-btn" data-ai>🤖 AI先生にくわしく聞く</button>
          <div class="ai-out" hidden></div>
          <form class="ai-ask" hidden><input class="text-in" placeholder="AI先生に質問（例：なぜ in がここにくるの？）" maxlength="200"><button class="btn small primary">質問</button></form>
        </div>
      </div>
      <div class="next-row"><button class="btn primary big" data-action="next">${idx + 1 >= queue.length ? '結果を見る' : '次へ ▶'}</button></div>`;
    bindStar(host);
    const got = !ok && tiles ? tiles.words().join(' ') : (extra && input ? host.dataset.got : '');
    bindAIBox(host.querySelector('.feedback'), {
      promptFn: () => explainOrderPrompt({ ja: o.ja, sentence: o.sentence, got: got || '', grammar: o.g ? gTitle(o.g) : '' }),
      cacheKey: `ox:${o.id}:${got || ''}`,
      context: () => `日本文：${o.ja}\n英文：${o.sentence}\n解説：${o.x || ''}`,
      followKey: o.id,
    });
    say(o.sentence);
    host.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function checkTiles() {
    if (busy || !tiles?.isFull()) return;
    busy = true;
    const entry = queue[idx], o = entry.o;
    const res = tiles.check();
    tiles.reveal(res);
    stage.querySelector('.spell-tools').hidden = true;
    const btn = stage.querySelector('.tiles-host');
    record(entry, res.ok ? (hinted ? 1 : 2) : 0, btn);
    judgeMark(res.ok);
    if (!res.ok) { shake(tiles.el.querySelector('.order-sentence')); setTimeout(() => tiles?.showAnswer(), 900); }
    feedback(o, res.ok, !res.ok ? `<p class="small">あなたの答え：<span class="en ng-text">${esc([o.pre, res.got, o.post].filter(Boolean).join(' '))}</span></p>` : '');
  }

  function pickCombo(i, btn) {
    if (busy) return;
    busy = true;
    const entry = queue[idx], o = entry.o;
    const ok = i === combos.a;
    stage.querySelectorAll('.combo-choices .choice').forEach((b, k) => {
      b.disabled = true;
      if (k === combos.a) b.classList.add('correct'); else if (k === i) b.classList.add('wrong');
    });
    if (!ok) shake(btn);
    record(entry, ok ? 2 : 0, btn);
    tiles.showAnswer();
    feedback(o, ok);
  }

  async function checkWrite() {
    if (busy || !input) return;
    if (input.isEmpty()) { toast('まだ何も書かれていません', { icon: '✍️' }); return; }
    busy = true;
    const entry = queue[idx], o = entry.o;
    const btn = stage.querySelector('[data-action="check-write"]');
    btn.classList.add('loading');
    const text = await input.read();
    btn.classList.remove('loading');
    input.lock();
    stage.querySelector('.spell-tools').hidden = true;
    stage.querySelector('.write-hint').hidden = false;
    const host = stage.querySelector('.fb-host');
    if (text == null) {
      // 読み取れない（オフライン・自分で判定の設定）：お手本と見比べて自己判定
      host.innerHTML = `<div class="feedback"><p class="fb-sentence en">${esc(o.sentence)}</p><p class="small muted">お手本と見比べて、自分で答え合わせしよう</p><div class="row-btns center"><button class="btn ok" data-action="self" data-v="1">○ 書けた</button><button class="btn ng" data-action="self" data-v="0">× まちがえた</button></div></div>`;
      say(o.sentence);
      return;
    }
    host.dataset.got = text;
    const exact = normSentence(text) === normSentence(o.sentence);
    const al = alignReading(o.sentence, text);
    const diff = `<p class="small">あなたの答え：<span class="en">${esc(text)}</span></p>${exact ? '' : `<div class="read-check en">${al.words.map((w) => `<span class="${w.ok ? '' : 'miss'}">${esc(w.w)}</span>`).join(' ')}</div><p class="tiny muted">赤い語が、あなたの答えに見つからなかった語です</p>`}`;
    const done = (ok, extra = '') => {
      record(entry, ok ? (hinted ? 1 : 2) : 0, host);
      judgeMark(ok);
      feedback(o, ok, diff + extra + (ok ? '' : `<div class="override"><button class="mini-btn" data-action="flip">${input.mode === 'keyboard' ? '実は正しい（○にする）' : '読み取りミス（正しく書けていた）'}</button></div>`));
      if (!ok && aiReady()) {
        host.querySelector('.feedback').insertAdjacentHTML('beforeend', '<div class="ai-check"><button class="btn ai-btn" data-action="ai-check">🤖 AIに「この英文でも正しい？」と聞く</button><div class="ai-check-out"></div></div>');
      }
    };
    done(exact);
  }

  function finish() {
    stopSpeech();
    tiles?.destroy(); tiles = null;
    input?.destroy(); input = null;
    const total = results.size;
    const okN = [...results.values()].filter(Boolean).length;
    checkBadges({ combo: maxCombo, perfect: total >= 10 && okN === total });
    store.update((x) => { x.bestCombo = Math.max(x.bestCombo, maxCombo); });
    sfx.finish();
    if (okN / Math.max(1, total) >= 0.8) setTimeout(() => rain(70), 300);
    const wrong = [...results.entries()].filter(([, ok]) => !ok).map(([id]) => id);
    root.querySelector('.play-head').innerHTML = `<button class="icon-btn close" data-action="close" aria-label="閉じる">✕</button><div class="play-title"><b>${MODES[mode].icon} ${MODES[mode].name}</b><small>おつかれさま！</small></div>`;
    stage.innerHTML = `
      <div class="result card">
        <div class="result-top">
          ${mascot(okN / Math.max(1, total) >= 0.8 ? 'cheer' : okN / Math.max(1, total) >= 0.5 ? 'happy' : 'think', 'float')}
          <div>
            <p class="eyebrow">RESULT</p>
            <p class="result-score"><b>${okN}</b> / ${total}</p>
            <p class="result-sub">+${xpSum} XP・最大 ${maxCombo} コンボ</p>
          </div>
        </div>
        <ul class="result-list q-results">
          ${deck.map((o) => `<li class="${results.get(o.id) ? 'ok' : 'ng'}"><span class="mark">${results.get(o.id) ? '○' : '×'}</span><span class="en">${esc(o.sentence)}</span></li>`).join('')}
        </ul>
        <div class="result-actions">
          ${wrong.length ? `<button class="btn ghost" data-action="again-wrong">まちがえた${wrong.length}問をもう一度</button>` : ''}
          <button class="btn primary" data-action="again">続けて練習</button>
          <button class="btn ghost" data-action="close">もどる</button>
        </div>
      </div>`;
    actions(root, {
      'again-wrong': () => go('orderplay', { mode, ids: wrong.join(',') }),
      again: () => go('orderplay', { ...params, t: Date.now() }),
    });
  }

  actions(root, {
    quit: async () => { if (idx === 0 || await confirmDialog('練習をやめますか？<br><small>ここまでの記録は保存されています</small>', { ok: 'やめる' })) go('order'); },
    close: () => go('order'),
    check: () => checkTiles(),
    reset: () => { tiles?.clear(); sfx.tap(); },
    'tile-hint': (el) => {
      if (!tiles || busy) return;
      const o = queue[idx].o;
      const t = tiles.tiles.find((x) => x.text === o.chunks[0]);
      hinted = true;
      tiles.place(t.num, 0);
      el.disabled = true;
      el.textContent = '💡 ヒントを使った';
    },
    combo: (el) => pickCombo(+el.dataset.i, el),
    hint: (el) => { hinted = true; stage.querySelector('.write-hint').hidden = false; el.disabled = true; },
    undo: () => input?.undo(),
    clear: () => { input?.clear(); sfx.tap(); },
    'check-write': () => checkWrite(),
    self: (el) => {
      const entry = queue[idx];
      const ok = el.dataset.v === '1';
      record(entry, ok ? 2 : 0, el);
      judgeMark(ok);
      feedback(entry.o, ok);
    },
    flip: (el) => {
      // 読み取りミスの修正：記録を正解に付け直す
      const entry = queue[idx], o = entry.o;
      if (!entry.retry) {
        store.update((x) => { const it = x.items[keyOf(o)]; if (it) { it.h = `${it.h.slice(0, -1)}1`; it.c++; it.w = Math.max(0, (it.w || 1) - 1); it.s = Math.max(it.s, 1); it.due = Date.now() + it.s * 864e5; } });
        results.set(o.id, true);
        const j = queue.findIndex((q, k) => k > idx && q.o === o && q.retry);
        if (j > 0) queue.splice(j, 1);
      }
      el.parentElement.innerHTML = '<span class="small muted">判定を「○」に直しました</span>';
      stage.querySelector('.fb-mark').textContent = '○ 正解！';
      stage.querySelector('.feedback').classList.replace('ng', 'ok');
      head();
      sfx.select();
    },
    'ai-check': async (el) => {
      const o = queue[idx].o;
      const text = stage.querySelector('.fb-host').dataset.got || '';
      const out = stage.querySelector('.ai-check-out');
      el.classList.add('loading');
      try {
        const r = await chatJSON(checkSentencePrompt({ ja: o.ja, model: o.sentence, text }), { cacheKey: `wc:${o.id}:${normSentence(text)}`, maxTokens: 300 });
        const d = r.data || {};
        out.innerHTML = `<p class="${d.ok ? 'ok-text' : ''}"><b>${d.ok ? '⭕ この英文でも正しいよ！' : '❌ ここを直そう'}</b> ${esc(d.comment || '')}</p>${d.corrected ? `<p class="en small">${esc(d.corrected)}</p>` : ''}`;
        el.remove();
        award('ai');
        if (d.ok) stage.querySelector('[data-action="flip"]')?.click();
      } catch (e) {
        out.innerHTML = `<p class="err">${esc(e.message)}</p>`;
      } finally {
        el.classList.remove('loading');
      }
    },
    lesson: (el) => go('grammar', { key: el.dataset.g }),
    'say-sentence': () => say(queue[idx]?.o.sentence),
    next: () => { sfx.tap(); idx++; if (idx >= queue.length) finish(); else show(); },
  });
  const onKey = (e) => {
    if (e.target.matches('input, textarea')) return;
    if (mode === 'exam' && /^[1-4]$/.test(e.key)) stage.querySelectorAll('.combo-choices .choice')[+e.key - 1]?.click();
    else if (e.key === 'Enter') { const n = stage.querySelector('[data-action="next"]'); if (n) n.click(); else stage.querySelector('[data-action="check"]:not([disabled]), [data-action="check-write"]')?.click(); }
  };
  addEventListener('keydown', onKey);
  show();
  return () => { removeEventListener('keydown', onKey); tiles?.destroy(); input?.destroy(); stopSpeech(); };
}
