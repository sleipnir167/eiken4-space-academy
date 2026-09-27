// 過去形マスター：不規則動詞・つづりに注意する規則動詞の過去形
//  menu：一覧・モード選択 ／ choice：4択（goed・wented などのまちがいやすい形から選ぶ）／ spell：手書きで書く
import * as store from '../store.js';
import { VERBS, verbById } from '../bank.js';
import { review, pick, shuffle, status, STATUS_LABEL } from '../srs.js';
import { recordAnswer, xpForAnswer, checkBadges } from '../game.js';
import { actions, esc, toast, confirmDialog } from '../ui.js';
import { go } from '../app.js';
import { sfx } from '../sound.js';
import { say, stop as stopSpeech } from '../speech.js';
import { burst, floatText, shake, judgeMark, rain } from '../fx.js';
import { mascot } from '../mascot.js';
import { SpellInput, answerHTML } from '../spell.js';

const exHTML = (v, blank = false) => esc(v.e).replace(/\{([^}]+)\}/g, (m, x) => (blank ? '<span class="blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>' : `<b class="hl">${esc(x)}</b>`));
const exPlain = (v) => v.e.replace(/[{}]/g, '');

const ing = (b) => (/ie$/.test(b) ? `${b.slice(0, -2)}ying` : /[^e]e$/.test(b) ? `${b.slice(0, -1)}ing` : /^[^aeiou]*[aeiou][bdgmnpt]$/.test(b) ? `${b}${b.slice(-1)}ing` : `${b}ing`);

/** まちがえやすい形（goed・wented・stoped など）を作る */
function wrongForms(v) {
  const b = v.base, p = v.past;
  const out = new Set();
  if (v.irregular) {
    out.add(/e$/.test(b) ? `${b}d` : `${b}ed`);
    if (p !== b) out.add(/e$/.test(p) ? `${p}d` : `${p}ed`);
  } else {
    if (/[^aeiou]y$/.test(b)) { out.add(`${b}ed`); out.add(`${b.slice(0, -1)}ed`); }
    if (/[aeiou][bdgmnpt]$/.test(b) && /(pp|nn|gg|tt|dd|bb|mm)ed$/.test(p)) out.add(`${b}ed`);
    if (/e$/.test(b)) out.add(`${b}ed`);
    if (/[aeiou]y$/.test(b)) out.add(`${b.slice(0, -1)}ied`);
    if (!/(pp|nn|gg|tt|dd|bb|mm)ed$/.test(p) && /[aeiou][bdgpt]$/.test(b)) out.add(`${b}${b.slice(-1)}ed`);
  }
  out.add(ing(b));
  out.add(/(s|sh|ch|x|o)$/.test(b) ? `${b}es` : /[^aeiou]y$/.test(b) ? `${b.slice(0, -1)}ies` : `${b}s`);
  out.delete(p); out.delete(b);
  const list = shuffle([...out]).slice(0, 3);
  for (const x of shuffle(VERBS.filter((y) => y.id !== v.id).map((y) => y.past))) { if (list.length >= 3) break; if (!list.includes(x) && x !== p) list.push(x); }
  return list;
}

export function renderVerbs(root, params) {
  const mode = ['choice', 'spell'].includes(params.mode) ? params.mode : 'menu';
  if (mode === 'menu') return menu(root);
  return session(root, mode, params);
}

function menu(root) {
  const s = store.get();
  const st = (v) => status(s.items[v.id]);
  const done = VERBS.filter((v) => ['review', 'mastered'].includes(st(v))).length;
  const weak = VERBS.filter((v) => st(v) === 'weak').length;
  root.innerHTML = `
    <header class="play-head">
      <button class="icon-btn close" data-action="close" aria-label="閉じる">✕</button>
      <div class="play-title"><b>🔁 過去形マスター</b><small>4級は過去形の文がたくさん出る！</small></div>
    </header>
    <div class="stage verbs-menu">
      <section class="card verbs-intro">
        ${mascot('cheer', 'float')}
        <div>
          <h2>go → went、buy → bought</h2>
          <p class="small">「昨日〇〇した」は過去形。形が変わる<b>不規則動詞</b>と、<b>つづりが変わる規則動詞</b>（study → studied、stop → stopped）をまとめて覚えよう。</p>
          <div class="verbs-meter"><div class="vm-bar"><i style="width:${(done / VERBS.length) * 100}%"></i></div><small>定着 <b>${done}</b> / ${VERBS.length}語${weak ? `・苦手 ${weak}語` : ''}</small></div>
          <div class="row-btns">
            <button class="btn primary big" data-action="start" data-m="choice">✅ 4択で覚える</button>
            <button class="btn ok big" data-action="start" data-m="spell">✍️ 手書きで書く</button>
            ${weak ? '<button class="btn ghost" data-action="weak">🎯 苦手だけ</button>' : ''}
          </div>
        </div>
      </section>
      <section class="card">
        <h2>過去形の一覧 <small>タップで発音</small></h2>
        <div class="verb-table">
          ${VERBS.map((v) => `<button class="vt-row ${v.irregular ? '' : 'reg'}" data-say="${esc(v.base)}, ${esc(v.past)}"><i class="dot st-${st(v)}" title="${STATUS_LABEL[st(v)]}"></i><span class="vt-base">${esc(v.base)}</span><span class="vt-arrow">→</span><b class="vt-past">${esc(v.past)}</b><small>${esc(v.m)}</small></button>`).join('')}
        </div>
        <p class="tiny muted">緑のわく＝規則動詞（-ed をつける）だけど、つづりに注意するもの</p>
      </section>
    </div>`;
  actions(root, {
    close: () => go('words'),
    start: (el) => { sfx.launch(); go('verbs', { mode: el.dataset.m }); },
    weak: () => { sfx.launch(); go('verbs', { mode: 'choice', weak: 1 }); },
  });
  root.querySelectorAll('[data-say]').forEach((b) => b.addEventListener('click', () => say(b.dataset.say, { rate: 0.8 })));
}

function session(root, mode, params) {
  const st = store.settings();
  const s = store.get();
  let pool = VERBS;
  if (params.ids) pool = params.ids.split(',').map((id) => verbById.get(id)).filter(Boolean);
  else if (params.weak) pool = VERBS.filter((v) => status(s.items[v.id]) === 'weak');
  if (!pool.length) pool = VERBS;
  const deck = params.ids ? shuffle([...pool]) : pick(pool, s.items, Math.min(st.sessionSize, pool.length), { newRatio: 0.4, weight: (v) => (v.irregular ? 2 : 1) });
  const queue = deck.map((v) => ({ v, retry: false }));
  let idx = 0, combo = 0, maxCombo = 0, xpSum = 0, busy = false, spell = null;
  const results = new Map();

  root.innerHTML = `
    <header class="play-head">
      <button class="icon-btn close" data-action="quit" aria-label="やめる">✕</button>
      <div class="play-title"><b>過去形マスター</b><small>${mode === 'spell' ? '手書きで書く' : '4択で覚える'}</small></div>
      <div class="play-prog"><i></i></div>
      <span class="play-count"></span>
      <span class="combo-chip" hidden></span>
    </header>
    <div class="stage verb-stage"></div>`;
  const stage = root.querySelector('.stage');
  const head = () => {
    root.querySelector('.play-prog i').style.width = `${(idx / queue.length) * 100}%`;
    root.querySelector('.play-count').textContent = `${Math.min(idx + 1, queue.length)} / ${queue.length}`;
    const cc = root.querySelector('.combo-chip');
    cc.hidden = combo < 3;
    cc.textContent = `🔥 ${combo} combo`;
  };

  function answer(entry, ok, anchor) {
    const { v, retry } = entry;
    if (!retry) {
      store.update((x) => { x.items[v.id] = review(x.items[v.id], ok ? 2 : 0); });
      results.set(v.id, ok);
    }
    combo = ok ? combo + 1 : 0;
    maxCombo = Math.max(maxCombo, combo);
    const xp = retry ? (ok ? 3 : 0) : xpForAnswer(ok, combo);
    xpSum += xp;
    recordAnswer('verbs', ok, xp);
    if (ok) {
      sfx.correct(combo);
      if (xp && anchor) floatText(`+${xp}`, anchor, 'xp');
      if (combo && combo % 5 === 0) { sfx.combo(combo); burst({ count: 40, kind: 'star' }); }
    } else {
      sfx.wrong();
      if (!retry) queue.splice(Math.min(queue.length, idx + 3), 0, { v, retry: true });
    }
    head();
  }

  function show() {
    head();
    busy = false;
    spell?.destroy(); spell = null;
    const { v, retry } = queue[idx];
    const top = `
      ${retry ? '<p class="retry-tag">🔁 もう一度</p>' : ''}
      <div class="prompt-card verb-prompt">
        <p class="vp-base">${esc(v.base)} <span class="vp-arrow">→</span> <span class="vp-q">?</span> <button class="icon-btn speak" data-action="say-base" aria-label="発音">🔊</button></p>
        <p class="vp-mean">${esc(v.m)}${v.irregular ? '' : ' <span class="tag">つづり注意</span>'}</p>
        <p class="vp-ex">${exHTML(v, true)}</p>
        <p class="muted small">${esc(v.ej)}</p>
      </div>`;
    if (mode === 'choice') {
      const opts = shuffle([v.past, ...wrongForms(v)]);
      stage.innerHTML = `${top}
        <div class="choices two">${opts.map((o, i) => `<button class="choice" data-action="pick" data-v="${esc(o)}"><span class="num">${i + 1}</span><span class="ctext en">${esc(o)}</span></button>`).join('')}</div>
        <div class="after" hidden></div>`;
    } else {
      stage.innerHTML = `${top}
        <div class="spell-host"></div>
        <div class="spell-tools">
          <button class="mini-btn" data-action="undo">↶ 1画もどす</button>
          <button class="mini-btn" data-action="clear">全部消す</button>
          <button class="btn primary" data-action="check">判定する ✓</button>
        </div>
        <div class="after" hidden></div>`;
      spell = new SpellInput({ answer: v.past });
      stage.querySelector('.spell-host').appendChild(spell.el);
      spell.focus();
    }
    say(v.base, { rate: 0.85 });
  }

  function after(v, ok, extra = '') {
    const box = stage.querySelector('.after');
    box.hidden = false;
    box.innerHTML = `
      <p class="after-word"><span class="en">${esc(v.base)}</span> → <b class="en ${ok ? 'ok-text' : 'ng-text'}">${esc(v.past)}</b>　${esc(v.m)}</p>
      ${extra}
      <p class="after-ex">${exHTML(v)}<br><small class="muted">${esc(v.ej)}</small></p>
      <button class="btn primary" data-action="next">${idx + 1 >= queue.length ? '結果を見る' : '次へ ▶'}</button>`;
    stage.querySelector('.vp-q').textContent = v.past;
    stage.querySelector('.vp-ex').innerHTML = exHTML(v);
    say(exPlain(v));
  }

  function pickChoice(val, btn) {
    if (busy) return;
    busy = true;
    const entry = queue[idx], v = entry.v;
    const ok = val === v.past;
    stage.querySelectorAll('.choice').forEach((b) => {
      b.disabled = true;
      if (b.dataset.v === v.past) b.classList.add('correct');
      else if (b.dataset.v === val) b.classList.add('wrong');
    });
    if (!ok) shake(btn);
    answer(entry, ok, btn);
    after(v, ok, ok ? '' : `<p class="small muted">「${esc(val)}」ではなく「${esc(v.past)}」。${v.irregular ? '不規則に形が変わる動詞だよ。' : 'つづりに注意しよう。'}</p>`);
  }

  async function checkSpell() {
    if (busy || !spell) return;
    if (spell.isEmpty()) { toast('まだ何も書かれていません', { icon: '✍️' }); return; }
    busy = true;
    const entry = queue[idx], v = entry.v;
    const btn = stage.querySelector('[data-action="check"]');
    btn.classList.add('loading');
    const res = await spell.check();
    btn.classList.remove('loading');
    spell.reveal(res);
    stage.querySelector('.spell-tools').hidden = true;
    const ok = res.ok === null ? null : res.ok;
    if (ok === null) {
      const box = stage.querySelector('.after');
      box.hidden = false;
      box.innerHTML = `<p class="after-word"><b class="en">${esc(v.past)}</b></p><p class="small muted">お手本と見比べて、自分で答え合わせしよう</p><div class="row-btns center"><button class="btn ok" data-action="self" data-v="1">○ 書けた</button><button class="btn ng" data-action="self" data-v="0">× まちがえた</button></div>`;
      return;
    }
    judgeMark(ok);
    answer(entry, ok, btn);
    after(v, ok, res.ok === false ? `<p class="sr-word en">${answerHTML(v.past, res.letters)}</p>${res.got ? `<p class="small muted">読み取り：${esc(res.got)}</p>` : ''}` : '');
  }

  function finish() {
    stopSpeech();
    spell?.destroy(); spell = null;
    const total = results.size;
    const okN = [...results.values()].filter(Boolean).length;
    checkBadges({ combo: maxCombo, perfect: total >= 10 && okN === total });
    store.update((x) => { x.bestCombo = Math.max(x.bestCombo, maxCombo); });
    sfx.finish();
    if (okN / Math.max(1, total) >= 0.8) setTimeout(() => rain(70), 300);
    const wrong = [...results.entries()].filter(([, ok]) => !ok).map(([id]) => id);
    root.querySelector('.play-head').innerHTML = `<button class="icon-btn close" data-action="menu" aria-label="閉じる">✕</button><div class="play-title"><b>過去形マスター</b><small>おつかれさま！</small></div>`;
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
        <ul class="result-list">
          ${deck.map((v) => `<li class="${results.get(v.id) ? 'ok' : 'ng'}"><div class="wl-row"><span class="mark">${results.get(v.id) ? '○' : '×'}</span><b class="wl-w">${esc(v.base)} → ${esc(v.past)}</b><span class="wl-m">${esc(v.m)}</span></div></li>`).join('')}
        </ul>
        <div class="result-actions">
          ${wrong.length ? `<button class="btn ghost" data-action="again-wrong">まちがえた${wrong.length}語をもう一度</button>` : ''}
          <button class="btn primary" data-action="again">続けて練習</button>
          <button class="btn ghost" data-action="menu">一覧へ</button>
        </div>
      </div>`;
    actions(root, {
      'again-wrong': () => go('verbs', { mode, ids: wrong.join(',') }),
      again: () => go('verbs', { mode, t: Date.now() }),
      menu: () => go('verbs', { mode: 'menu', t: Date.now() }),
    });
  }

  actions(root, {
    quit: async () => { if (idx === 0 || await confirmDialog('練習をやめますか？<br><small>ここまでの記録は保存されています</small>', { ok: 'やめる' })) go('verbs', { mode: 'menu' }); },
    pick: (el) => pickChoice(el.dataset.v, el),
    'say-base': () => say(queue[idx]?.v.base),
    next: () => { sfx.tap(); idx++; if (idx >= queue.length) finish(); else show(); },
    undo: () => spell?.undo(),
    clear: () => { spell?.clear(); sfx.tap(); },
    check: () => checkSpell(),
    self: (el) => {
      const entry = queue[idx], v = entry.v;
      const ok = el.dataset.v === '1';
      judgeMark(ok);
      answer(entry, ok, el);
      after(v, ok);
    },
  });
  const onKey = (e) => {
    if (e.target.matches('input, textarea')) { if (e.key === 'Enter' && mode === 'spell') { e.preventDefault(); if (!busy) checkSpell(); else stage.querySelector('[data-action="next"]')?.click(); } return; }
    if (/^[1-4]$/.test(e.key)) stage.querySelectorAll('.choice')[+e.key - 1]?.click();
    else if (e.key === 'Enter') { if (mode === 'spell' && !busy) checkSpell(); else stage.querySelector('[data-action="next"]')?.click(); }
  };
  addEventListener('keydown', onKey);
  show();
  return () => { removeEventListener('keydown', onKey); spell?.destroy(); stopSpeech(); };
}
