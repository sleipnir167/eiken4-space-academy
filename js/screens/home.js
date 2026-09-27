// ホーム：打ち上げカウントダウン（試験までの日数・合格予測）・今日のミッション・技能別の予測
import * as store from '../store.js';
import { CARDS, meanKey, exampleHTML } from '../bank.js';
import { isDue, status } from '../srs.js';
import { levelInfo } from '../game.js';
import { mascot, greeting } from '../mascot.js';
import { ring, actions, esc, daysUntil } from '../ui.js';
import { go } from '../app.js';
import { sfx } from '../sound.js';
import { say } from '../speech.js';
import { estimate, PASS1, PASS_S, SKILL_MAX, SKILL_LINE } from '../predict.js';
import { rocketFly, shootingStar } from '../fx.js';

/** 今日のミッション（分野ごとの目標） */
export function todayPlan() {
  const s = store.get();
  const k = store.today().k || {};
  const sd = daysUntil(s.settings.speakDate);
  const dow = new Date().getDay();
  const speakDay = (sd != null && sd >= 0 && sd <= 21) || dow % 3 === 0;
  const due = CARDS.filter((c) => isDue(s.items[meanKey(c)])).length;
  const sum = (...keys) => keys.reduce((a, x) => a + (k[x] || 0), 0);
  const extra = speakDay
    ? { id: 'speak', icon: '🎤', label: 'スピーキング', sub: '声に出して答えよう', done: sum('speak'), target: 1, to: ['speaktest', { mode: 'practice', card: 'random' }] }
    : dow % 2
      ? { id: 'verbs', icon: '🔁', label: '過去形マスター', sub: 'went・bought…', done: sum('verbs'), target: 10, to: ['verbs', { mode: 'choice' }] }
      : { id: 'meteor', icon: '☄️', label: 'メテオバスター', sub: '60秒で単語バトル', done: sum('meteor') ? 1 : 0, target: 1, to: ['meteor'] };
  return [
    { id: 'words', icon: '🃏', label: '単語カード', sub: due ? `復習どき ${due} 枚` : '新しい単語も', done: sum('words'), target: 20, to: ['wordplay', { mode: 'flash', src: 'auto' }] },
    { id: 'spell', icon: '✍️', label: '手書きスペル', sub: 'ペンでつづりを書く', done: sum('spell'), target: 10, to: ['wordplay', { mode: 'spell', src: 'auto' }] },
    { id: 'drill', icon: '📖', label: '筆記ドリル', sub: '大問1・2', done: sum('r1', 'r2', 'r4'), target: 10, to: ['quiz', { part: 'mix' }] },
    { id: 'order', icon: '🧩', label: '並べかえ', sub: '大問3', done: sum('r3'), target: 5, to: ['orderplay', { mode: 'tile' }] },
    { id: 'listen', icon: '🎧', label: 'リスニング', sub: '第1〜3部', done: sum('l1', 'l2', 'l3'), target: 6, to: ['quiz', { part: 'lmix' }] },
    extra,
  ];
}

export function renderHome(root) {
  const s = store.get();
  const st = s.settings;
  const lv = levelInfo();
  const streak = store.streak();
  const today = store.today();
  let due = 0, learned = 0;
  for (const c of CARDS) {
    const it = s.items[meanKey(c)];
    if (!it?.n) continue;
    if (['review', 'mastered'].includes(status(it))) learned++;
    if (isDue(it)) due++;
  }
  const examDays = daysUntil(st.examDate);
  const speakDays = daysUntil(st.speakDate);
  const est = estimate(s);
  const plan = todayPlan();
  const planDone = plan.filter((p) => p.done >= p.target).length;
  const hour = new Date().getHours();
  const hello = hour < 10 ? 'Good morning' : hour < 18 ? 'Hello' : 'Good evening';
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const cod = CARDS[Math.floor(Date.now() / 864e5) % CARDS.length]; // 今日の単語
  const score = est.total1 ?? est.guess1;
  const progress = score != null ? Math.min(1, score / PASS1) : 0;
  const target = examDays != null && examDays >= 0 ? { d: examDays, label: 'LAUNCH', ja: '一次試験' }
    : speakDays != null && speakDays >= 0 ? { d: speakDays, label: 'SPEAKING', ja: 'スピーキングテスト' } : null;

  const bar = (key, name, data, max = SKILL_MAX, line = SKILL_LINE) => `
    <div class="skill ${data ? '' : 'none'}">
      <div class="skill-head"><b>${name}</b><span>${data ? `${data.cse}<small>/${max}</small>` : '<small>データなし</small>'}</span></div>
      <div class="skill-bar"><i style="width:${data ? (data.cse / max) * 100 : 0}%" class="${data && data.cse >= line ? 'ok' : ''}"></i><em style="left:${(line / max) * 100}%"></em></div>
      <small class="muted">${data ? `正答率 ${Math.round(data.ratio * 100)}%（直近${data.n}${key === 's' ? '回' : '問'}）` : { r: '筆記を10問以上解くと表示', l: 'リスニングを8問以上解くと表示', s: 'スピーキングの練習をすると表示' }[key]}</small>
    </div>`;

  root.innerHTML = `
  <header class="home-hero">
    <div class="stars s1"></div><div class="stars s2"></div>
    <svg class="hero-planets" viewBox="0 0 1000 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id="pl1" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffd9a8"/><stop offset=".6" stop-color="#ff9f68"/><stop offset="1" stop-color="#e2572f"/></radialGradient>
        <radialGradient id="pl2" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#c7f5ff"/><stop offset=".6" stop-color="#4cc9f0"/><stop offset="1" stop-color="#3a56c5"/></radialGradient>
      </defs>
      <g class="planet p1"><ellipse cx="880" cy="70" rx="78" ry="16" fill="none" stroke="#ffd23f" stroke-width="5" opacity=".75" transform="rotate(-14 880 70)"/><circle cx="880" cy="70" r="40" fill="url(#pl1)"/><path d="M806 88 Q880 64 954 52" stroke="#ffd23f" stroke-width="5" fill="none" opacity=".9"/></g>
      <g class="planet p2"><circle cx="965" cy="205" r="16" fill="url(#pl2)"/><circle cx="960" cy="200" r="3" fill="#fff" opacity=".4"/></g>
      <path d="M430 230 Q640 110 990 150" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="3 12" stroke-linecap="round" opacity=".45"/>
    </svg>
    <button class="icon-btn gear" data-action="settings" aria-label="設定">
      <svg viewBox="0 0 24 24"><path d="M19.14 12.94a7.07 7.07 0 0 0 0-1.88l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7 7 0 0 0-1.62-.94l-.36-2.54a.48.48 0 0 0-.48-.41h-3.84a.47.47 0 0 0-.47.41l-.36 2.54a7.3 7.3 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58a7.4 7.4 0 0 0 0 1.88l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54a7 7 0 0 0 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61zM12 15.6a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"/></svg>
    </button>
    <div class="hero-inner">
      <div class="hero-mascot" data-action="poke">${mascot(planDone >= plan.length ? 'cheer' : 'normal', 'float')}</div>
      <div class="hero-text">
        <p class="bubble">${esc(greeting({ due, streak, examDays, speakDays }))}</p>
        <h1><span class="h1-sub">${hello}${st.name ? `, ${esc(st.name)}` : ''}!</span>英検4級 <span class="brand">Space Academy</span></h1>
        <div class="hero-stats">
          <div class="lv-chip"><b>Lv.${lv.level}</b><span>${lv.title.ja}</span></div>
          <div class="xp-bar" title="次のレベルまで ${lv.need - lv.into} XP"><i style="width:${(lv.ratio * 100).toFixed(1)}%"></i><small>${lv.into} / ${lv.need} XP</small></div>
          <div class="streak-chip ${streak ? 'on' : ''}"><span class="flame">🔥</span><b>${streak}</b>日連続</div>
        </div>
      </div>
    </div>
  </header>

  <section class="home-grid">
    <article class="card launch-card" data-action="settings" role="button" aria-label="試験日を設定">
      <div class="lc-head"><span class="lc-tag">MISSION</span><b>英検4級 合格星へ</b><span class="lc-sub">${target ? `${target.ja}まで` : '試験日を設定しよう'}</span></div>
      <div class="lc-count">${target ? `<small>${target.label}</small><b>${target.d}</b><span>DAYS</span>` : '<small>T-MINUS</small><b>--</b><span>タップして設定</span>'}</div>
      <div class="lc-route">
        <span class="lc-earth">🌏</span>
        <div class="lc-track"><i style="width:${(progress * 100).toFixed(1)}%"></i><span class="lc-rocket" style="--p:${progress}">🚀</span></div>
        <span class="lc-goal">🪐<small>合格星</small></span>
      </div>
      <p class="lc-note small">${score == null ? '問題を解くと、合格星までの距離（予測スコア）がわかるよ' : score >= PASS1 ? `<b class="ok-text">合格ライン ${PASS1} に到達！</b>このまま維持しよう` : `予測 <b>${score}</b> ／ 合格ライン <b>${PASS1}</b>（あと <b>${PASS1 - score}</b>）`}</p>
    </article>

    <div class="home-col col-a">
    <article class="card predict-card">
      <h2>合格予測 <small>CSEスコアの目安</small></h2>
      <div class="predict-total">
        ${ring(score != null ? score / 1000 : 0, { size: 118, stroke: 12, color: score >= PASS1 ? 'var(--mint)' : 'var(--nebula)', label: score ?? '--', sub: est.total1 != null ? '一次の予測' : '一次の見込み' })}
        <p class="small">${score == null ? 'リーディングとリスニングを解くと、予測スコアが出ます。' : score >= PASS1 ? `<b class="ok-text">合格ライン（${PASS1}）をこえています！</b>` : `合格ライン <b>${PASS1}</b> まであと <b>${PASS1 - score}</b>。<br>低いほうの技能をのばすのが近道！`}</p>
      </div>
      <div class="skills">
        ${bar('r', 'Reading', est.r)}${bar('l', 'Listening', est.l)}
        ${bar('s', 'Speaking', est.s, SKILL_MAX, PASS_S)}
      </div>
      <p class="tiny muted">※ 正答率からの換算による目安です。4級の一次試験はリーディング500＋リスニング500＝1000点満点。スピーキングは別に判定されます。</p>
    </article>

    <article class="card today-card">
      ${ring(today.n / st.dailyGoal, { size: 110, stroke: 12, color: 'var(--sky)', label: `${today.n}<small>/${st.dailyGoal}</small>`, sub: '今日の問題' })}
      <div>
        <h2>今日の記録</h2>
        <ul class="mini-stats">
          <li><b>${today.n ? Math.round((today.c / today.n) * 100) : '--'}<small>%</small></b><span>正答率</span></li>
          <li class="${due ? 'hot' : ''}"><b>${due}</b><span>復習どき</span></li>
          <li><b>${Math.round((today.sec || 0) / 60)}<small>分</small></b><span>学習時間</span></li>
          <li><b>${learned}</b><span>覚えた語</span></li>
        </ul>
      </div>
    </article>

    <article class="card word-day" data-action="speak-cod">
      <p class="eyebrow">⭐ Word of the Day</p>
      <p class="wod-word">${esc(cod.w)} <button class="icon-btn speak" aria-label="発音を聞く">🔊</button></p>
      <p class="wod-mean"><span class="pos">${esc(cod.pos)}</span>${esc(cod.m)}</p>
      <p class="wod-ex">${exampleHTML(cod)}</p>
      <p class="muted small">${esc(cod.ej)}</p>
    </article>

    </div>
    <div class="home-col col-b">
    <article class="card plan-card">
      <h2>今日のミッション <small>${planDone}/${plan.length} クリア</small></h2>
      <div class="plan-list">
        ${plan.map((p, i) => `
          <button class="plan-item ${p.done >= p.target ? 'done' : ''}" data-action="plan" data-i="${i}">
            <span class="plan-icon">${p.icon}</span>
            <span class="plan-text"><b>${p.label}</b><small>${p.sub}</small></span>
            <span class="plan-count">${p.done >= p.target ? '<span class="check">✓</span>' : `${Math.min(p.done, p.target)}<small>/${p.target}</small>`}</span>
            <i class="plan-prog" style="width:${Math.min(1, p.done / p.target) * 100}%"></i>
          </button>`).join('')}
      </div>
      <button class="btn primary big wide launch-btn" data-action="auto">🚀 おまかせで発進</button>
    </article>

    <article class="card quick-card">
      <h2>ほかのミッション</h2>
      <div class="quick-grid">
        <button class="quick q-exam" data-go="exam"><span>📝</span><b>模擬試験</b><small>本番形式で力試し</small></button>
        <button class="quick q-meteor" data-go="meteor"><span>☄️</span><b>メテオバスター</b><small>60秒の単語バトル</small></button>
        <button class="quick q-speed" data-go="wordplay" data-params='{"mode":"speed","src":"rank:1"}'><span>⚡</span><b>高速周回</b><small>単語を大量に回す</small></button>
        <button class="quick q-verbs" data-go="verbs" data-params='{"mode":"menu"}'><span>🔁</span><b>過去形マスター</b><small>went・bought・saw…</small></button>
        <button class="quick q-grammar" data-go="grammar"><span>🧪</span><b>文法レッスン</b><small>4級の文法14項目</small></button>
        <button class="quick q-weak" data-go="quiz" data-params='{"part":"weak"}'><span>🎯</span><b>苦手ノート</b><small>まちがえた問題</small></button>
      </div>
    </article>
    </div>

    ${!standalone && isIOS ? `
    <article class="card install-card">
      <h2>📲 ホーム画面に追加しよう</h2>
      <p class="small">Safari の共有ボタン <b>⎋</b> →「ホーム画面に追加」で、全画面・オフラインで使えるアプリになります。</p>
    </article>` : ''}
  </section>`;

  actions(root, {
    settings: () => { sfx.tap(); go('settings', { sec: 'profile' }); },
    poke: (el) => { sfx.pop(); el.firstElementChild?.classList.remove('jump'); void el.offsetWidth; el.firstElementChild?.classList.add('jump'); rocketFly(); },
    plan: (el) => { sfx.select(); const p = plan[+el.dataset.i]; go(...p.to); },
    auto: () => {
      sfx.launch();
      rocketFly();
      const p = plan.find((x) => x.done < x.target) || plan[0];
      setTimeout(() => go(...p.to), 450);
    },
    'speak-cod': () => say(cod.kind === 'phrase' ? cod.w : `${cod.w}.`),
  });
  root.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => {
    sfx.select();
    go(b.dataset.go, b.dataset.params ? JSON.parse(b.dataset.params) : {});
  }));
  // ときどき流れ星
  const t = setInterval(() => { if (!document.hidden && Math.random() < 0.5) shootingStar(); }, 9000);
  setTimeout(shootingStar, 1200);
  return () => clearInterval(t);
}
