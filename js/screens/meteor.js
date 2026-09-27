// メテオバスター：60秒の単語バトル
//  落ちてくる隕石の単語の意味を選ぶとレーザーで撃ち落とせる。まちがえると3秒減る。5連続でボーナス時間
import * as store from '../store.js';
import { CARDS, WORDS, IDIOMS, meanKey } from '../bank.js';
import { review, pick, shuffle, status } from '../srs.js';
import { recordAnswer, checkBadges, gainXP } from '../game.js';
import { actions, esc } from '../ui.js';
import { go } from '../app.js';
import { sfx } from '../sound.js';
import { say, stop as stopSpeech } from '../speech.js';
import { explode, rain, shake, burst } from '../fx.js';
import { mascot } from '../mascot.js';
import { cardsFor } from './words.js';

const TIME = 60;
const RANGES = [['auto', '🌀 おまかせ'], ['learned', '学習した単語'], ['rank:1', 'ランクA'], ['rank:2', 'ランクB'], ['kind:idiom', '熟語']];

export function renderMeteor(root, params) {
  const s = store.get();
  let src = params.src || localStorage.getItem('e4-meteor-src') || 'auto';
  let dir = localStorage.getItem('e4-meteor-dir') || 'en';
  const m = s.meteor;

  const intro = () => {
    const pool = poolFor(src);
    root.innerHTML = `
      <header class="play-head space">
        <button class="icon-btn close" data-action="close" aria-label="閉じる">✕</button>
        <div class="play-title"><b>☄️ メテオバスター</b><small>60秒の単語バトル</small></div>
      </header>
      <div class="meteor-intro">
        <div class="mi-card card">
          <div class="mi-top">${mascot('cheer', 'float')}<div>
            <h2>隕石をレーザーで撃ち落とせ！</h2>
            <ul class="mi-rules">
              <li>☄️ 落ちてくる隕石の単語の<b>意味</b>を選ぶと発射！</li>
              <li>❌ まちがえたり、地面に落ちたりすると <b>3秒</b> へる</li>
              <li>🔥 5連続で撃ち落とすと <b>+3秒</b> ボーナス</li>
            </ul>
          </div></div>
          <div class="mi-best"><div><small>ベスト</small><b>${m.best || 0}</b></div><div><small>プレイ回数</small><b>${m.plays || 0}</b></div><div><small>通算撃墜</small><b>${m.total || 0}</b></div></div>
          <h3 class="sub-h">出題する単語</h3>
          <div class="chips">${RANGES.map(([v, l]) => `<button class="chip ${src === v ? 'on' : ''}" data-action="src" data-v="${v}">${l}</button>`).join('')}</div>
          <h3 class="sub-h">出し方</h3>
          <div class="seg">${[['en', '英語 → 意味'], ['ja', '意味 → 英語']].map(([v, l]) => `<button class="${dir === v ? 'on' : ''}" data-action="dir" data-v="${v}">${l}</button>`).join('')}</div>
          <p class="small muted">${pool.length < 8 ? '⚠️ 単語が少ないので「おまかせ」で遊ぼう' : `${pool.length}語から出題`}</p>
          <button class="btn primary big wide launch-btn" data-action="go" ${pool.length < 8 ? 'disabled' : ''}>🚀 発進！</button>
        </div>
      </div>`;
  };

  function poolFor(v) {
    const list = cardsFor(v).filter((c) => c.kind !== 'phrase');
    return v === 'auto' ? [...WORDS, ...IDIOMS] : list;
  }

  intro();
  let cleanupGame = null;
  actions(root, {
    close: () => go('words'),
    src: (el) => { src = el.dataset.v; localStorage.setItem('e4-meteor-src', src); sfx.select(); intro(); },
    dir: (el) => { dir = el.dataset.v; localStorage.setItem('e4-meteor-dir', dir); sfx.select(); intro(); },
    go: () => { sfx.launch(); cleanupGame = game(root, poolFor(src), { dir, src }); },
  });
  return () => cleanupGame?.();
}

function game(root, pool, { dir, src }) {
  const s = store.get();
  // 苦手・復習どきを多めに、新しい単語も少し
  const deck = pick(pool.map((c) => ({ ...c, id: meanKey(c), card: c })), s.items, Math.min(80, pool.length), { newRatio: 0.35, weight: (c) => 4 - c.card.r }).map((x) => x.card);
  let qi = 0, hits = 0, misses = 0, combo = 0, maxCombo = 0, running = false, over = false;
  let meteor = null, raf = 0, last = 0, busy = false, endAt = 0, pausedAt = 0, clock = null;
  // 残り時間は実時間で計る（描画が間引かれても時計は正しく進む）
  const timeLeft = () => Math.max(0, (endAt - (pausedAt || performance.now())) / 1000);
  const addTime = (sec) => { endAt += sec * 1000; };
  const missed = new Map();

  root.innerHTML = `
    <div class="meteor-game">
      <div class="mg-sky"><div class="stars s1"></div><div class="stars s2"></div></div>
      <header class="mg-hud">
        <button class="icon-btn close" data-action="quit" aria-label="やめる">✕</button>
        <div class="mg-time"><i></i><b>60</b></div>
        <div class="mg-score"><small>撃墜</small><b>0</b></div>
        <div class="mg-combo" hidden></div>
      </header>
      <div class="mg-field">
        <div class="mg-ground"></div>
        <div class="mg-rocket">🚀</div>
        <div class="mg-count"></div>
      </div>
      <div class="mg-choices"></div>
    </div>`;
  const field = root.querySelector('.mg-field');
  const rocket = root.querySelector('.mg-rocket');
  const choicesEl = root.querySelector('.mg-choices');
  const timeEl = root.querySelector('.mg-time');
  const scoreEl = root.querySelector('.mg-score b');
  const comboEl = root.querySelector('.mg-combo');

  const speed = () => Math.max(0.11, 0.055 + hits * 0.004); // 1秒あたりに落ちる割合（画面の高さ比）

  function distractors(c) {
    const same = CARDS.filter((x) => x.kind === c.kind && x.id !== c.id && x.m !== c.m && x.pos[0] === c.pos[0] && x.w !== c.w);
    const out = shuffle(same).slice(0, 3);
    for (const x of shuffle([...CARDS])) { if (out.length >= 3) break; if (x.id !== c.id && !out.includes(x) && x.kind !== 'phrase') out.push(x); }
    return out;
  }

  function spawn() {
    if (over) return;
    if (qi >= deck.length) { qi = 0; shuffle(deck); }
    const c = deck[qi++];
    const opts = shuffle([c, ...distractors(c)]);
    const el = document.createElement('div');
    el.className = 'meteor';
    const label = dir === 'en' ? c.w : c.m;
    el.innerHTML = `<div class="meteor-rock"><span class="${dir === 'en' ? 'en' : ''}">${esc(label)}</span></div><div class="meteor-tail"></div>`;
    const x = 0.2 + Math.random() * 0.6;
    el.style.left = `${x * 100}%`;
    field.appendChild(el);
    meteor = { c, el, y: -0.05, x };
    choicesEl.innerHTML = opts.map((o, i) => `<button class="mg-choice" data-action="shoot" data-id="${esc(o.id)}"><span class="num">${i + 1}</span><span class="${dir === 'en' ? '' : 'en'}">${esc(dir === 'en' ? o.m : o.w)}</span></button>`).join('');
    busy = false;
    if (dir === 'en') say(c.w, { rate: 1 });
  }

  function hud() {
    const t = timeLeft();
    timeEl.querySelector('b').textContent = Math.ceil(t);
    timeEl.querySelector('i').style.width = `${(t / TIME) * 100}%`;
    timeEl.classList.toggle('low', t <= 10);
    scoreEl.textContent = hits;
    comboEl.hidden = combo < 2;
    comboEl.textContent = `🔥 ${combo}`;
  }

  function fieldPos(fx, fy) {
    const r = field.getBoundingClientRect();
    return { x: r.left + fx * r.width, y: r.top + fy * r.height };
  }

  function loop(t) {
    if (!running) return;
    const dt = Math.min(0.05, (t - last) / 1000);
    last = t;
    if (meteor && !busy) {
      meteor.y += speed() * dt;
      meteor.el.style.top = `${meteor.y * 100}%`;
      if (meteor.y >= 0.8) crash();
    }
    hud();
    if (timeLeft() <= 0) return end();
    raf = requestAnimationFrame(loop);
  }

  function logResult(c, ok) {
    store.update((x) => { x.items[meanKey(c)] = review(x.items[meanKey(c)], ok ? 2 : 0); });
    recordAnswer('meteor', ok, ok ? 3 + Math.min(combo, 7) : 0);
  }

  function shoot(id, btn) {
    if (busy || !meteor || over) return;
    busy = true;
    const { c, el } = meteor;
    const ok = id === c.id;
    choicesEl.querySelectorAll('.mg-choice').forEach((b) => {
      if (b.dataset.id === c.id) b.classList.add('correct');
      else if (b === btn) b.classList.add('wrong');
    });
    logResult(c, ok);
    if (ok) {
      hits++; combo++; maxCombo = Math.max(maxCombo, combo);
      sfx.laser();
      // レーザー
      const rr = rocket.getBoundingClientRect(), mr = el.getBoundingClientRect();
      const fr = field.getBoundingClientRect();
      const x1 = rr.left + rr.width / 2 - fr.left, y1 = rr.top - fr.top, x2 = mr.left + mr.width / 2 - fr.left, y2 = mr.top + mr.height / 2 - fr.top;
      const beam = document.createElement('div');
      beam.className = 'laser';
      beam.style.left = `${x1}px`; beam.style.top = `${y1}px`;
      beam.style.height = `${Math.hypot(x2 - x1, y2 - y1)}px`;
      beam.style.transform = `rotate(${Math.atan2(x2 - x1, -(y2 - y1))}rad)`;
      field.appendChild(beam);
      rocket.style.left = `${meteor.x * 100}%`;
      setTimeout(() => {
        beam.remove();
        const p = fieldPos(meteor?.x ?? 0.5, (meteor?.y ?? 0.3) + 0.04);
        explode(p.x, p.y, { big: combo % 5 === 0 });
        sfx.boom();
        el.classList.add('boom');
        setTimeout(() => el.remove(), 250);
        if (combo > 0 && combo % 5 === 0) { addTime(3); sfx.combo(combo); floatBonus('+3秒！'); }
        meteor = null;
        setTimeout(spawn, 280);
      }, 160);
    } else {
      misses++; combo = 0;
      missed.set(c.id, c);
      sfx.hit();
      addTime(-3);
      floatBonus('−3秒');
      shake(root.querySelector('.meteor-game'));
      el.classList.add('miss');
      el.querySelector('.meteor-rock').insertAdjacentHTML('beforeend', `<small class="meteor-ans">${esc(dir === 'en' ? c.m : c.w)}</small>`);
      setTimeout(() => { el.remove(); meteor = null; spawn(); }, 1100);
    }
    hud();
  }

  function crash() {
    if (!meteor || busy) return;
    busy = true;
    const { c, el } = meteor;
    logResult(c, false);
    misses++; combo = 0;
    missed.set(c.id, c);
    sfx.hit();
    addTime(-3);
    floatBonus('−3秒');
    const p = fieldPos(meteor.x, 0.82);
    explode(p.x, p.y, { count: 20 });
    shake(root.querySelector('.meteor-game'));
    el.classList.add('miss');
    choicesEl.querySelectorAll('.mg-choice').forEach((b) => { if (b.dataset.id === c.id) b.classList.add('correct'); });
    setTimeout(() => { el.remove(); meteor = null; spawn(); }, 900);
  }

  function floatBonus(text) {
    const d = document.createElement('div');
    d.className = `mg-float ${text.startsWith('+') ? 'plus' : 'minus'}`;
    d.textContent = text;
    timeEl.appendChild(d);
    setTimeout(() => d.remove(), 1000);
  }

  async function countdown() {
    const el = root.querySelector('.mg-count');
    for (const n of ['3', '2', '1', 'GO!']) {
      if (over) return;
      el.textContent = n;
      el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
      sfx.beep(n === 'GO!');
      await new Promise((r) => setTimeout(r, 700));
    }
    el.textContent = '';
    running = true;
    last = performance.now();
    endAt = last + TIME * 1000;
    spawn();
    raf = requestAnimationFrame(loop);
    clock = setInterval(() => { if (!running) return; hud(); if (timeLeft() <= 0) end(); }, 250);
  }

  function end() {
    if (over) return;
    over = true; running = false;
    cancelAnimationFrame(raf);
    clearInterval(clock);
    stopSpeech();
    const prev = store.get().meteor.best || 0;
    const best = hits > prev;
    store.update((x) => {
      x.meteor = { ...x.meteor, best: Math.max(prev, hits), plays: (x.meteor.plays || 0) + 1, total: (x.meteor.total || 0) + hits };
      x.bestCombo = Math.max(x.bestCombo, maxCombo);
    });
    gainXP(10 + hits);
    checkBadges({ combo: maxCombo });
    sfx.finish();
    if (best && hits >= 5) { setTimeout(() => { sfx.levelup(); rain(100); }, 400); } else burst({ count: 50, kind: 'star' });
    const acc = hits + misses ? Math.round((hits / (hits + misses)) * 100) : 0;
    const rank = hits >= 25 ? 'S' : hits >= 18 ? 'A' : hits >= 12 ? 'B' : hits >= 6 ? 'C' : 'D';
    const miss = [...missed.values()];
    root.innerHTML = `
      <header class="play-head space">
        <button class="icon-btn close" data-action="close" aria-label="閉じる">✕</button>
        <div class="play-title"><b>☄️ メテオバスター</b><small>ミッション終了！</small></div>
      </header>
      <div class="meteor-intro">
        <div class="card result mg-result">
          <div class="result-top">
            ${mascot(hits >= 12 ? 'cheer' : hits >= 6 ? 'happy' : 'think', 'float')}
            <div>
              <p class="eyebrow">${best ? '🏆 NEW RECORD!' : 'MISSION COMPLETE'}</p>
              <p class="result-score"><span class="rank rank-${rank}">${rank}</span><b>${hits}</b> 個撃墜</p>
              <p class="result-sub">正答率 ${acc}%・最大 ${maxCombo} コンボ・ベスト ${Math.max(prev, hits)}</p>
            </div>
          </div>
          ${miss.length ? `<h3 class="sub-h">撃ちもらした単語</h3><ul class="result-list">${miss.map((c) => `<li class="ng"><div class="wl-row"><span class="mark">×</span><b class="wl-w">${esc(c.w)}</b><span class="wl-m">${esc(c.m)}</span><i class="dot st-${status(store.get().items[meanKey(c)])}"></i></div></li>`).join('')}</ul>` : '<p class="ok-text center">パーフェクト！1つもまちがえなかった！</p>'}
          <div class="result-actions">
            ${miss.length ? `<button class="btn ghost" data-action="review" data-ids="${esc(miss.map((c) => c.id).join(','))}">🃏 撃ちもらした単語を復習</button>` : ''}
            <button class="btn primary" data-action="again">🚀 もう一度</button>
            <button class="btn ghost" data-action="close">単語帳へ</button>
          </div>
        </div>
      </div>`;
    actions(root, {
      review: (el) => go('wordplay', { mode: 'flash', ids: el.dataset.ids }),
      again: () => go('meteor', { src, t: Date.now() }),
    });
  }

  actions(root, {
    shoot: (el) => shoot(el.dataset.id, el),
    quit: () => { over = true; running = false; cancelAnimationFrame(raf); clearInterval(clock); stopSpeech(); go('meteor', { src, t: Date.now() }); },
  });
  const onKey = (e) => { if (/^[1-4]$/.test(e.key)) choicesEl.querySelectorAll('.mg-choice')[+e.key - 1]?.click(); };
  addEventListener('keydown', onKey);
  // アプリを切りかえたら一時停止し、もどったら続きから
  const onVis = () => {
    if (document.hidden && running) { running = false; pausedAt = performance.now(); cancelAnimationFrame(raf); }
    else if (!document.hidden && !over && !running && pausedAt) { endAt += performance.now() - pausedAt; pausedAt = 0; running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
  };
  document.addEventListener('visibilitychange', onVis);
  countdown();
  return () => { over = true; running = false; cancelAnimationFrame(raf); clearInterval(clock); removeEventListener('keydown', onKey); document.removeEventListener('visibilitychange', onVis); stopSpeech(); };
}
