// 演出：紙吹雪・星・ロケット・流れ星・爆発・ポップアップ
const canvas = () => document.getElementById('fx-canvas');
let particles = [];
let raf = 0;
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize() {
  const c = canvas();
  const dpr = Math.min(devicePixelRatio || 1, 2);
  c.width = innerWidth * dpr; c.height = innerHeight * dpr;
  c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
}
addEventListener('resize', () => canvas() && resize());
const ensure = () => { if (!canvas().width) resize(); if (!raf) raf = requestAnimationFrame(loop); };

const CONFETTI = ['#ff7a59', '#ffd23f', '#1dd3b0', '#4cc9f0', '#7c6cf0', '#ff6fb5', '#ffffff'];
const STARS = ['#ffd23f', '#ffe27a', '#fff3b0', '#ffc53d'];
const FIRE = ['#ffd23f', '#ff9f43', '#ff7a59', '#ff4d6d', '#fff3b0'];

/** 紙吹雪（kind='confetti'）または星（kind='star'） */
export function burst({ count = 80, kind = 'confetti', x = innerWidth / 2, y = innerHeight * 0.35, spread = 1 } = {}) {
  if (reduced()) return;
  const colors = kind === 'star' ? STARS : CONFETTI;
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = (4 + Math.random() * 9) * spread;
    particles.push({
      kind, x, y,
      vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6,
      r: kind === 'star' ? 6 + Math.random() * 7 : 5 + Math.random() * 5,
      rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.3,
      sway: Math.random() * 6.28,
      color: colors[i % colors.length],
      life: 0, max: 130 + Math.random() * 90,
    });
  }
  ensure();
}

/** 爆発（メテオを撃ったとき） */
export function explode(x, y, { count = 36, big = false } = {}) {
  if (reduced()) return;
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const v = (2 + Math.random() * (big ? 11 : 7));
    particles.push({
      kind: i % 4 === 0 ? 'star' : 'spark', x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
      r: i % 4 === 0 ? 4 + Math.random() * 5 : 2 + Math.random() * 3.5, rot: 0, vr: 0.1, sway: 0,
      color: FIRE[i % FIRE.length], life: 0, max: 40 + Math.random() * 30, drag: true,
    });
  }
  particles.push({ kind: 'ring', x, y, vx: 0, vy: 0, r: 8, rot: 0, vr: 0, sway: 0, color: '#fff3b0', life: 0, max: 22, drag: true });
  ensure();
}

/** 画面上から紙吹雪と星が降る */
export function rain(count = 90) {
  if (reduced()) return;
  for (let i = 0; i < count; i++) {
    particles.push({
      kind: i % 4 === 0 ? 'star' : 'confetti', x: Math.random() * innerWidth, y: -20 - Math.random() * innerHeight * 0.8,
      vx: (Math.random() - 0.3) * 1.5, vy: 1.5 + Math.random() * 2.5,
      r: 5 + Math.random() * 6, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.12,
      sway: Math.random() * 6.28, color: i % 4 === 0 ? STARS[i % 4] : CONFETTI[i % 7], life: 0, max: 420, rain: true,
    });
  }
  ensure();
}

/** ロケットが画面を飛んでいく */
export function rocketFly() {
  if (reduced()) return;
  particles.push({ kind: 'rocket', x: innerWidth * (0.15 + Math.random() * 0.2), y: innerHeight + 40, vx: 3.2, vy: -7.5, r: 24, rot: 0, vr: 0, sway: 0, color: '#fff', life: 0, max: 300, rain: true });
  ensure();
}

/** 流れ星 */
export function shootingStar() {
  if (reduced()) return;
  particles.push({ kind: 'comet', x: innerWidth * (0.4 + Math.random() * 0.6), y: -10, vx: -9, vy: 6, r: 4, rot: 0, vr: 0, sway: 0, color: '#fff', life: 0, max: 200, rain: true, trail: [] });
  ensure();
}

function star(ctx, r) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = (Math.PI / 5) * i - Math.PI / 2;
    const rr = i % 2 ? r * 0.45 : r;
    ctx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  ctx.closePath();
  ctx.fill();
}
function rocket(ctx, r, life) {
  // 炎
  const fl = r * (0.9 + Math.sin(life * 0.9) * 0.25);
  ctx.fillStyle = '#ffd23f';
  ctx.beginPath(); ctx.moveTo(-r * 0.35, r * 0.9); ctx.quadraticCurveTo(0, r * 0.9 + fl * 1.6, r * 0.35, r * 0.9); ctx.fill();
  ctx.fillStyle = '#ff7a59';
  ctx.beginPath(); ctx.moveTo(-r * 0.2, r * 0.9); ctx.quadraticCurveTo(0, r * 0.9 + fl, r * 0.2, r * 0.9); ctx.fill();
  // 翼
  ctx.fillStyle = '#ff4d6d';
  ctx.beginPath(); ctx.moveTo(-r * 0.45, r * 0.2); ctx.lineTo(-r * 0.85, r * 0.95); ctx.lineTo(-r * 0.4, r * 0.8); ctx.fill();
  ctx.beginPath(); ctx.moveTo(r * 0.45, r * 0.2); ctx.lineTo(r * 0.85, r * 0.95); ctx.lineTo(r * 0.4, r * 0.8); ctx.fill();
  // 機体
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#2b2f77'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, -r * 1.2); ctx.quadraticCurveTo(r * 0.6, -r * 0.4, r * 0.45, r * 0.9); ctx.lineTo(-r * 0.45, r * 0.9); ctx.quadraticCurveTo(-r * 0.6, -r * 0.4, 0, -r * 1.2); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#4cc9f0';
  ctx.beginPath(); ctx.arc(0, -r * 0.25, r * 0.22, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
}

function loop() {
  const c = canvas();
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
  particles = particles.filter((p) => p.life < p.max && p.y < innerHeight + 80 && p.y > -300 && p.x < innerWidth + 80 && p.x > -120);
  for (const p of particles) {
    p.life++;
    p.sway += 0.05;
    if (p.kind === 'rocket') { p.x += p.vx + Math.sin(p.life / 10) * 0.8; p.y += p.vy; p.vy *= 1.005; p.rot = Math.atan2(p.vy, p.vx) + Math.PI / 2; }
    else if (p.kind === 'comet') { p.trail.push([p.x, p.y]); if (p.trail.length > 14) p.trail.shift(); p.x += p.vx; p.y += p.vy; }
    else if (p.kind === 'ring') { p.r += 5; }
    else if (p.drag) { p.vx *= 0.9; p.vy *= 0.9; p.x += p.vx; p.y += p.vy; }
    else if (p.rain) { p.x += p.vx + Math.sin(p.sway) * 0.8; p.y += p.vy; }
    else {
      p.vx *= 0.96; p.vy = p.vy * 0.96 + 0.32;
      p.x += p.vx + Math.sin(p.sway) * 0.5; p.y += p.vy;
    }
    p.rot += p.vr;
    const alpha = p.kind === 'rocket' ? 1 : p.kind === 'ring' ? 1 - p.life / p.max : Math.min(1, (p.max - p.life) / (p.drag ? 20 : 40));
    ctx.save();
    ctx.globalAlpha = Math.max(0, alpha);
    if (p.kind === 'comet') {
      const g = ctx.createLinearGradient(p.trail[0]?.[0] ?? p.x, p.trail[0]?.[1] ?? p.y, p.x, p.y);
      g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,243,176,.95)');
      ctx.strokeStyle = g; ctx.lineWidth = 3; ctx.lineCap = 'round';
      ctx.beginPath(); p.trail.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.lineTo(p.x, p.y); ctx.stroke();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      continue;
    }
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    if (p.kind === 'star') star(ctx, p.r);
    else if (p.kind === 'rocket') rocket(ctx, p.r, p.life);
    else if (p.kind === 'spark') { ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill(); }
    else if (p.kind === 'ring') { ctx.strokeStyle = p.color; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.stroke(); }
    else {
      ctx.scale(1, Math.abs(Math.sin(p.sway * 2)) + 0.1);
      ctx.fillRect(-p.r / 2, -p.r / 3, p.r, p.r * 0.66);
    }
    ctx.restore();
  }
  raf = particles.length ? requestAnimationFrame(loop) : 0;
  if (!raf) ctx.clearRect(0, 0, c.width, c.height);
}

/** 要素の上に「+10」などを浮かび上がらせる */
export function floatText(text, el, cls = '') {
  const r = el?.getBoundingClientRect?.() || { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
  const d = document.createElement('div');
  d.className = `float-text ${cls}`;
  d.textContent = text;
  d.style.left = `${r.left + r.width / 2}px`;
  d.style.top = `${r.top + r.height / 2}px`;
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 1400);
}

export function shake(el) {
  if (!el || reduced()) return;
  el.classList.remove('shake');
  void el.offsetWidth;
  el.classList.add('shake');
}

/** 正解の大きな○・不正解の×を画面中央に出す */
export function judgeMark(ok) {
  const d = document.createElement('div');
  d.className = `judge-mark ${ok ? 'ok' : 'ng'}`;
  d.innerHTML = ok
    ? '<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="70"/></svg>'
    : '<svg viewBox="0 0 200 200"><path d="M50 50L150 150M150 50L50 150"/></svg>';
  document.body.appendChild(d);
  setTimeout(() => d.remove(), 900);
}
