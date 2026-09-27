// マスコット「ルナ先生」（宇宙服のうさぎ）
const INK = '#2b2350';
const EYES = {
  normal: `<ellipse cx="84" cy="90" rx="7.5" ry="9" fill="${INK}"/><ellipse cx="116" cy="90" rx="7.5" ry="9" fill="${INK}"/>
           <circle cx="87" cy="86" r="3" fill="#fff"/><circle cx="119" cy="86" r="3" fill="#fff"/>
           <circle cx="82" cy="94" r="1.4" fill="#fff" opacity=".8"/><circle cx="114" cy="94" r="1.4" fill="#fff" opacity=".8"/>`,
  happy: `<path d="M76 92 q8 -11 16 0" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
          <path d="M108 92 q8 -11 16 0" stroke="${INK}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
  sad: `<path d="M77 88 q7 6 15 2" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M108 90 q8 4 15 -2" stroke="${INK}" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path class="tear" d="M80 96 q-5 9 0 12 q5 -3 0 -12z" fill="#7cc8ff"/>`,
  think: `<ellipse cx="81" cy="86" rx="6.5" ry="8" fill="${INK}"/><ellipse cx="113" cy="86" rx="6.5" ry="8" fill="${INK}"/>
          <circle cx="83" cy="82" r="2.6" fill="#fff"/><circle cx="115" cy="82" r="2.6" fill="#fff"/>`,
  wow: `<circle cx="84" cy="90" r="10" fill="${INK}"/><circle cx="116" cy="90" r="10" fill="${INK}"/>
        <circle cx="88" cy="85" r="3.8" fill="#fff"/><circle cx="120" cy="85" r="3.8" fill="#fff"/>`,
};

/**
 * mood: normal | happy | sad | think | wow | cheer
 * outfit: astro（宇宙服・ヘルメット）| examiner（ヘッドセット＋めがねの試験官）
 */
export function mascot(mood = 'normal', cls = '', outfit = 'astro') {
  const eye = EYES[mood] ? mood : mood === 'cheer' ? 'happy' : 'normal';
  const cheer = mood === 'cheer' || mood === 'happy';
  const u = Math.random().toString(36).slice(2, 7);
  const astro = outfit === 'astro';
  const mouth = mood === 'wow'
    ? '<ellipse cx="100" cy="110" rx="5" ry="6" fill="#c2415d"/>'
    : mood === 'sad' ? '<path d="M94 112 q6 -5 12 0" stroke="#8a3b5b" stroke-width="3" fill="none" stroke-linecap="round"/>'
      : '<path d="M93 106 q3.5 5 7 0 q3.5 5 7 0" stroke="#8a3b5b" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
  return `
<svg class="mascot ${cls} mood-${mood}" viewBox="0 0 200 200" aria-hidden="true">
  <defs>
    <radialGradient id="lf${u}" cx="0.38" cy="0.32" r="0.85"><stop offset="0" stop-color="#ffffff"/><stop offset="0.7" stop-color="#f3efff"/><stop offset="1" stop-color="#ddd5fb"/></radialGradient>
    <radialGradient id="lg${u}" cx="0.3" cy="0.25" r="0.9"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset="0.45" stop-color="#bfe9ff" stop-opacity=".16"/><stop offset="1" stop-color="#7c6cf0" stop-opacity=".22"/></radialGradient>
    <linearGradient id="ls${u}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dcd6f5"/></linearGradient>
  </defs>
  <ellipse cx="100" cy="193" rx="46" ry="6" fill="rgba(20,10,60,.16)"/>
  <g class="mascot-body">
    <!-- 耳 -->
    <g class="ears">
      <g transform="rotate(-14 78 44)"><ellipse cx="78" cy="22" rx="12" ry="30" fill="url(#lf${u})" stroke="#cfc6f3" stroke-width="2"/><ellipse cx="78" cy="24" rx="6" ry="21" fill="#ffb3c8"/></g>
      <g transform="rotate(14 122 44)"><ellipse cx="122" cy="22" rx="12" ry="30" fill="url(#lf${u})" stroke="#cfc6f3" stroke-width="2"/><ellipse cx="122" cy="24" rx="6" ry="21" fill="#ffb3c8"/></g>
    </g>
    <!-- 腕 -->
    ${cheer
      ? `<path class="arm-l" d="M58 150 Q34 130 30 104" stroke="url(#ls${u})" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="30" cy="102" r="9" fill="#ff7a59"/>
         <path class="arm-r" d="M142 150 Q166 130 170 104" stroke="url(#ls${u})" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="170" cy="102" r="9" fill="#ff7a59"/>`
      : `<path d="M60 148 Q46 160 50 176" stroke="url(#ls${u})" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="51" cy="178" r="8.5" fill="#ff7a59"/>
         <path d="M140 148 Q154 160 150 176" stroke="url(#ls${u})" stroke-width="15" fill="none" stroke-linecap="round"/><circle cx="149" cy="178" r="8.5" fill="#ff7a59"/>`}
    <!-- 体（宇宙服） -->
    <path d="M62 142 Q100 126 138 142 L144 180 Q100 194 56 180 Z" fill="url(#ls${u})" stroke="#cfc6f3" stroke-width="2"/>
    <rect x="84" y="152" width="32" height="22" rx="6" fill="#2b2f77"/>
    <circle cx="92" cy="163" r="3.2" fill="#1dd3b0"/><circle cx="101" cy="163" r="3.2" fill="#ffd23f"/><circle cx="110" cy="163" r="3.2" fill="#ff4d6d"/>
    <path d="M70 176 l-2 12 h16 l1 -9z M130 176 l2 12 h-16 l-1 -9z" fill="#7c6cf0"/>
    <!-- 顔 -->
    <circle cx="100" cy="94" r="44" fill="url(#lf${u})"/>
    ${EYES[eye]}
    <ellipse cx="100" cy="101" rx="4" ry="3" fill="#ff8fab"/>
    <g class="mouth">${mouth}<ellipse class="mouth-open" cx="100" cy="110" rx="5" ry="5.5" fill="#c2415d" opacity="0"/></g>
    <ellipse cx="72" cy="104" rx="8" ry="5" fill="#ff8fab" opacity=".5"/>
    <ellipse cx="128" cy="104" rx="8" ry="5" fill="#ff8fab" opacity=".5"/>
    ${astro ? `
      <!-- ヘルメット -->
      <circle cx="100" cy="92" r="57" fill="url(#lg${u})" stroke="#e8e4ff" stroke-width="5"/>
      <path d="M62 66 Q74 44 98 40" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" opacity=".85"/>
      <circle cx="58" cy="82" r="3" fill="#fff" opacity=".8"/>
      <path d="M50 128 Q100 150 150 128" stroke="#ff7a59" stroke-width="8" fill="none" stroke-linecap="round"/>
      <!-- アンテナ -->
      <path d="M146 58 L160 34" stroke="#b8b0e6" stroke-width="4" stroke-linecap="round"/>
      <path class="antenna-star" d="M160 22 l3.6 7.4 8 1.1 -5.8 5.6 1.4 8 -7.2 -3.8 -7.2 3.8 1.4 -8 -5.8 -5.6 8 -1.1z" fill="#ffd23f" stroke="#f5a623" stroke-width="1.5" stroke-linejoin="round"/>` : `
      <!-- めがね -->
      <circle cx="84" cy="90" r="15" fill="none" stroke="#2b2f77" stroke-width="3.5"/>
      <circle cx="116" cy="90" r="15" fill="none" stroke="#2b2f77" stroke-width="3.5"/>
      <path d="M99 88 q1 -3 2 0" stroke="#2b2f77" stroke-width="3.5" fill="none"/>
      <!-- ヘッドセット -->
      <path d="M54 92 Q54 40 100 40 Q146 40 146 92" stroke="#2b2f77" stroke-width="6" fill="none"/>
      <rect x="46" y="82" width="14" height="24" rx="6" fill="#7c6cf0"/>
      <rect x="140" y="82" width="14" height="24" rx="6" fill="#7c6cf0"/>
      <path d="M53 104 Q58 124 86 120" stroke="#2b2f77" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <circle cx="88" cy="120" r="4.5" fill="#ff7a59"/>`}
  </g>
</svg>`;
}

const LINES = {
  morning: ['おはよう！朝の10分は記憶のゴールデンタイムだよ', '朝の単語チェックで、今日もいいスタートを！'],
  day: ['今日もいっしょに宇宙へ出発しよう！', 'コツコツが合格星への近道だよ', 'まちがえた単語は、覚え直したときがいちばん強い！', '英語は声に出すと覚えやすいよ', '並べかえは「だれが・どうする」から考えよう'],
  evening: ['おつかれさま！少しだけやっていこう', '寝る前の復習は記憶に残りやすいよ'],
  due: (n) => `復習どきの単語・問題が${n}こあるよ。忘れる前にやっつけよう！`,
  streak: (n) => `${n}日連続！燃料満タンでミッション続行！`,
  exam: (d) => `打ち上げ（試験）まであと${d}日。いっしょに合格しよう！`,
  speak: (d) => `スピーキングテストまであと${d}日！声に出して練習しよう`,
};

export function greeting({ due = 0, streak = 0, examDays = null, speakDays = null } = {}) {
  const h = new Date().getHours();
  const opts = [];
  if (speakDays != null && speakDays >= 0 && speakDays <= 30) opts.push(LINES.speak(speakDays));
  if (due >= 10) opts.push(LINES.due(due));
  if (streak >= 2) opts.push(LINES.streak(streak));
  if (examDays != null && examDays >= 0 && examDays <= 60) opts.push(LINES.exam(examDays));
  opts.push(...(h < 10 ? LINES.morning : h >= 18 ? LINES.evening : LINES.day));
  return opts[Math.floor(Math.random() * Math.min(opts.length, 3))];
}
