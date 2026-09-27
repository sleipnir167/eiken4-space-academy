// やる気を引き出す仕組み：XP・レベル・階級（宇宙がテーマ）・ミッションワッペン（バッジ）
import * as store from './store.js';
import { status } from './srs.js';
import { sfx } from './sound.js';
import { toast } from './ui.js';

export const xpFor = (L) => 70 * (L - 1) + 18 * (L - 1) * (L - 2);
export function levelInfo(xp = store.get().xp) {
  let L = 1;
  while (xp >= xpFor(L + 1)) L++;
  const cur = xpFor(L), next = xpFor(L + 1);
  return { level: L, into: xp - cur, need: next - cur, ratio: (xp - cur) / (next - cur), title: titleFor(L) };
}
const TITLES = [
  [1, 'Cadet', '訓練生'], [3, 'Crew', 'クルー'], [5, 'Astronaut', '宇宙飛行士'], [8, 'Navigator', 'ナビゲーター'],
  [11, 'Pilot', 'パイロット'], [14, 'Commander', 'コマンダー'], [18, 'Captain', 'キャプテン'], [22, 'Star Explorer', '星の探検家'],
  [27, 'Galaxy Ranger', '銀河レンジャー'], [33, 'Space Hero', '宇宙のヒーロー'], [40, 'Galaxy Master', '銀河マスター'],
];
export const titleFor = (L) => { const t = TITLES.filter(([l]) => L >= l).pop(); return { en: t[1], ja: t[2] }; };

export const xpForAnswer = (correct, combo = 0) => (correct ? 10 + Math.min(combo, 10) * 2 : 2);

export const BADGES = [
  { id: 'first', icon: '🚀', name: 'Lift off!', desc: 'はじめて問題に答えた' },
  { id: 'combo10', icon: '🔥', name: '10連続正解', desc: '10問続けて正解した' },
  { id: 'combo30', icon: '💥', name: '30連続正解', desc: '30問続けて正解した' },
  { id: 'n100', icon: '🌙', name: '100問達成', desc: '合計100問（枚）に答えた' },
  { id: 'n500', icon: '🪐', name: '500問達成', desc: '合計500問（枚）に答えた' },
  { id: 'n2000', icon: '🌌', name: '2000問達成', desc: '合計2000問（枚）に答えた' },
  { id: 'w100', icon: '⭐', name: '単語100', desc: '100語を「定着中」以上にした' },
  { id: 'w300', icon: '🌟', name: '単語300', desc: '300語を「定着中」以上にした' },
  { id: 'w600', icon: '🏆', name: '単語600', desc: '600語を「定着中」以上にした' },
  { id: 'streak3', icon: '📅', name: '3日連続', desc: '3日続けて学習した' },
  { id: 'streak7', icon: '🗓️', name: '1週間皆勤', desc: '7日続けて学習した' },
  { id: 'streak30', icon: '🌏', name: '1か月皆勤', desc: '30日続けて学習した' },
  { id: 'goal', icon: '🎯', name: '今日の目標達成', desc: '1日の目標をクリアした' },
  { id: 'perfect', icon: '💯', name: 'パーフェクト', desc: '10問以上の練習で全問正解した' },
  { id: 'lap', icon: '⚡', name: 'スピード周回', desc: '高速周回を1周した' },
  { id: 'lap10', icon: '🌀', name: '10周の達人', desc: '高速周回を合計10周した' },
  { id: 'spell50', icon: '✍️', name: '手書きスペル50', desc: '手書きのつづりを50回正解した' },
  { id: 'verbs', icon: '🔁', name: '過去形マスター', desc: '動詞の過去形を30個「定着中」以上にした' },
  { id: 'order20', icon: '🧩', name: '並べかえ名人', desc: '並べかえ問題に20回正解した' },
  { id: 'meteor', icon: '☄️', name: 'メテオバスター', desc: 'メテオバスターに挑戦した' },
  { id: 'meteor30', icon: '💫', name: 'エースパイロット', desc: 'メテオバスターで1回に20個以上撃ち落とした' },
  { id: 'speak', icon: '🎤', name: 'スピーキングデビュー', desc: 'スピーキングテストの練習をした' },
  { id: 'speak-hi', icon: '🗣️', name: 'スピーキング合格ライン', desc: 'スピーキングで合格ラインをこえた' },
  { id: 'exam', icon: '📝', name: '模試デビュー', desc: '模擬試験を受けた' },
  { id: 'exam-pass', icon: '🌸', name: 'サクラサク', desc: '模擬試験で合格ラインをこえた' },
  { id: 'allparts', icon: '🧭', name: '全分野制覇', desc: '単語・筆記の大問1〜4・リスニング・スピーキングすべてに挑戦した' },
  { id: 'ai', icon: '🤖', name: 'AI先生に質問', desc: 'AIの解説・採点を使った' },
  { id: 'early', icon: '🌅', name: '早起き学習', desc: '朝6時前に学習した' },
];

function unlock(id) {
  const s = store.get();
  if (s.badges[id]) return false;
  store.update((st) => { st.badges[id] = Date.now(); });
  const b = BADGES.find((x) => x.id === id);
  setTimeout(() => {
    sfx.badge();
    toast(`<b>ワッペン獲得！</b> ${b.name}`, { icon: b.icon, ms: 3500, cls: 'badge-toast' });
  }, 700);
  return true;
}
export const award = unlock;

/** 状況に応じてバッジを判定する */
export function checkBadges(ctx = {}) {
  const s = store.get();
  const total = Object.values(s.days).reduce((a, d) => a + (d.n || 0), 0);
  if (total >= 1) unlock('first');
  if (total >= 100) unlock('n100');
  if (total >= 500) unlock('n500');
  if (total >= 2000) unlock('n2000');
  if (ctx.combo >= 10) unlock('combo10');
  if (ctx.combo >= 30) unlock('combo30');
  const sk = store.streak();
  if (sk >= 3) unlock('streak3');
  if (sk >= 7) unlock('streak7');
  if (sk >= 30) unlock('streak30');
  if (store.today().n >= s.settings.dailyGoal) unlock('goal');
  if (ctx.perfect) unlock('perfect');
  let learned = 0, spellOk = 0, verbs = 0, order = 0;
  for (const [id, st] of Object.entries(s.items)) {
    const good = ['review', 'mastered'].includes(status(st));
    if (id.startsWith('wm:') && good) learned++;
    else if (id.startsWith('ws:')) spellOk += st.c || 0;
    else if (id.startsWith('vp:') && good) verbs++;
    else if (id.startsWith('r3:')) order += st.c || 0;
  }
  if (learned >= 100) unlock('w100');
  if (learned >= 300) unlock('w300');
  if (learned >= 600) unlock('w600');
  if (spellOk >= 50) unlock('spell50');
  if (verbs >= 30) unlock('verbs');
  if (order >= 20) unlock('order20');
  const laps = Object.values(s.laps).reduce((a, l) => a + (l.count || 0), 0);
  if (laps >= 1) unlock('lap');
  if (laps >= 10) unlock('lap10');
  if (s.meteor.plays) unlock('meteor');
  if (s.meteor.best >= 20) unlock('meteor30');
  if (s.speaks.length) unlock('speak');
  if (s.speaks.some((w) => w.pass)) unlock('speak-hi');
  if (s.exams.length) unlock('exam');
  if (s.exams.some((e) => e.pass)) unlock('exam-pass');
  const k = new Set(Object.values(s.days).flatMap((d) => Object.keys(d.k || {})));
  if (['words', 'r1', 'r2', 'r3', 'r4', 'l1', 'l2', 'l3', 'speak'].every((x) => k.has(x))) unlock('allparts');
  if (ctx.ai) unlock('ai');
  const h = new Date().getHours();
  if (total > 0 && h < 6 && h >= 4) unlock('early');
}

function levelCheck(before) {
  const after = levelInfo();
  if (after.level > before) {
    setTimeout(() => {
      sfx.levelup();
      toast(`<b>レベルアップ！ Lv.${after.level}</b> ${after.title.ja}（${after.title.en}）`, { icon: '🚀', ms: 4000, cls: 'level-toast' });
    }, 400);
  }
}

/** 1問（1枚）の解答を記録（XP・日ごとの記録・レベルアップ） */
export function recordAnswer(k, correct, xp) {
  const before = levelInfo().level;
  store.logAnswer(k, correct, xp);
  levelCheck(before);
}

/** ボーナス XP（スピーキング・模試・ゲームなど） */
export function gainXP(n) {
  const before = levelInfo().level;
  store.addXPToday(n);
  levelCheck(before);
}

/** 分野だけ記録（スピーキングは「問題数」に数えず、挑戦したことを残す） */
export const logActivity = (k) => store.logActivityToday(k);
