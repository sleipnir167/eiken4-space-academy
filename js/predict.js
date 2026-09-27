// 合格予測：直近の正答率などから技能ごとの CSE スコアの目安を出す
//  英検4級：一次試験 1000 点満点（リーディング・リスニング 各500）で合格基準 622
//           スピーキングテスト 500 点満点で合格基準 324（一次の合否とは別に判定）
//  ※ 実際の CSE スコアは統計的に算出されるため、ここでの値はあくまで目安（正答率 約6割で合格ライン付近になるよう換算）
import * as store from './store.js';

export const PASS1 = 622, PASS_S = 324, SKILL_MAX = 500;
export const SKILL_LINE = Math.round(PASS1 / 2);
export const cse = (ratio, k = 0.9) => Math.round(SKILL_MAX * Math.pow(Math.max(0, Math.min(1, ratio)), k));

const ratioOf = (bits) => (bits.length ? [...bits].filter((b) => b === '1').length / bits.length : null);

export function estimate(s = store.get()) {
  const rb = s.recent.r.slice(-80), lb = s.recent.l.slice(-60);
  const r = rb.length >= 10 ? { ratio: ratioOf(rb), n: rb.length } : null;
  const l = lb.length >= 8 ? { ratio: ratioOf(lb), n: lb.length } : null;
  const ss = s.speaks.slice(-3);
  const sp = ss.length ? { ratio: ss.reduce((a, x) => a + x.total / x.max, 0) / ss.length, n: ss.length } : null;
  const out = { r, l, s: sp };
  for (const k of ['r', 'l']) if (out[k]) out[k].cse = cse(out[k].ratio);
  if (sp) sp.cse = cse(sp.ratio);
  out.total1 = r && l ? r.cse + l.cse : null;
  // 片方しかないときは、わかっている技能で仮置きした見込み
  const known = ['r', 'l'].filter((k) => out[k]);
  out.guess1 = known.length ? Math.round((known.reduce((a, k) => a + out[k].cse, 0) / known.length) * 2) : null;
  out.pass1 = out.total1 != null ? out.total1 >= PASS1 : null;
  out.passS = sp ? sp.cse >= PASS_S : null;
  return out;
}
