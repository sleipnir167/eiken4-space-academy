// 問題データの検証：node tools/check-data.mjs
//  選択肢の数・重複・空所・例文の { }・並べかえの語数・長文の設問など
import { WORDS, IDIOMS, PHRASES, VERBS, PART1, PART2, ORDER, PART4, L1, L2, L3, THEMES, spellable } from '../js/bank.js';
import { GRAMMAR } from '../data/grammar.js';

let errors = 0, warns = 0;
const err = (m) => { errors++; console.log(`✗ ${m}`); };
const warn = (m) => { warns++; console.log(`△ ${m}`); };
const dupCheck = (list, key, label) => {
  const seen = new Map();
  for (const x of list) {
    const k = key(x);
    if (seen.has(k)) err(`${label}：重複 ${k}`);
    seen.set(k, x);
  }
};

// 単語
for (const c of [...WORDS, ...IDIOMS, ...PHRASES]) {
  if (!c.w || !c.m || !c.e || !c.ej) err(`単語：項目が足りない ${c.w}`);
  if (!/\{[^}]+\}/.test(c.e)) err(`単語：例文に { } がない ${c.w} / ${c.e}`);
  if (![1, 2, 3].includes(c.r)) err(`単語：重要度 ${c.w}`);
  if (c.kind === 'word' && !THEMES[c.t]) err(`単語：テーマ ${c.w} / ${c.t}`);
  if (c.kind === 'word') {
    const target = (c.e.match(/\{([^}]+)\}/) || [])[1].toLowerCase();
    const w = c.w.toLowerCase();
    const forms = (c.f || '').toLowerCase();
    const stem = w.replace(/(e|y)$/, '');
    if (!target.startsWith(stem.slice(0, Math.max(2, stem.length - 1))) && !forms.includes(target)) warn(`単語：例文の見出し語の形が違う？ ${c.w} → {${target}}`);
  }
}
dupCheck(WORDS, (c) => c.w.toLowerCase(), '単語');
const [words, idioms, phrases] = [WORDS.length, IDIOMS.length, PHRASES.length];
const spell = [...WORDS, ...IDIOMS].filter(spellable).length;

// 動詞
for (const v of VERBS) {
  if (!v.e.includes(`{${v.past}}`)) err(`過去形：例文に {${v.past}} がない ${v.base}`);
}
dupCheck(VERBS, (v) => v.base, '過去形');

// 大問1
for (const q of PART1) {
  if (q.c.length !== 4) err(`大問1：選択肢が4つでない ${q.q}`);
  if (new Set(q.c).size !== q.c.length) err(`大問1：選択肢が重複 ${q.q}`);
  if ((q.q.match(/\(\s*\)/g) || []).length !== 1) err(`大問1：空所が1つでない ${q.q}`);
  if (!q.x || !q.j) err(`大問1：解説・訳がない ${q.q}`);
  if (q.k === 'grammar' && !GRAMMAR.some((g) => g.key === q.g)) err(`大問1：文法キー ${q.g} ${q.q}`);
}
dupCheck(PART1, (q) => q.id, '大問1');

// 大問2
for (const q of PART2) {
  if (q.c.length !== 4) err(`大問2：選択肢が4つでない ${q.lines[0][1]}`);
  if (new Set(q.c).size !== q.c.length) err(`大問2：選択肢が重複 ${q.lines[0][1]}`);
  const blanks = q.lines.filter(([, t]) => /\(\s*\)/.test(t)).length;
  if (blanks !== 1) err(`大問2：空所が1つでない ${q.lines.map((l) => l[1]).join(' / ')}`);
  if (q.lines.some(([w]) => !w)) err(`大問2：話者がない ${q.lines.map((l) => l[1]).join(' / ')}`);
}
dupCheck(PART2, (q) => q.id, '大問2');

// 大問3（並べかえ）
const keys = new Set([...GRAMMAR.map((g) => g.key), 'idiom']);
for (const o of ORDER) {
  if (o.chunks.length !== 5) err(`大問3：語句が5つでない ${o.ja}`);
  if (o.chunks[1] === o.chunks[3]) err(`大問3：2番目と4番目が同じ語 ${o.ja}`);
  if (!keys.has(o.g)) err(`大問3：文法キー ${o.g} ${o.ja}`);
  if (!/[.?!]$/.test(o.sentence)) err(`大問3：文の終わりに記号がない ${o.sentence}`);
}
dupCheck(ORDER, (o) => o.id, '大問3');

// 大問4
for (const p of PART4) {
  const want = { A: 2, B: 3, C: 5 }[p.type];
  if (p.qs.length !== want) err(`大問4：設問数 ${p.id} ${p.qs.length}（本番は${want}）`);
  for (const q of p.qs) {
    if (q.c.length !== 4) err(`大問4：選択肢が4つでない ${p.id} ${q.q}`);
    if (new Set(q.c).size !== 4) err(`大問4：選択肢が重複 ${p.id} ${q.q}`);
    if (!q.x) err(`大問4：解説がない ${p.id} ${q.q}`);
  }
  if (!p.ja) err(`大問4：訳がない ${p.id}`);
}

// リスニング
for (const [label, list, n] of [['第1部', L1, 3], ['第2部', L2, 4], ['第3部', L3, 4]]) {
  for (const q of list) {
    if (q.c.length !== n) err(`リスニング${label}：選択肢の数 ${q.lines[0][1]}`);
    if (new Set(q.c).size !== q.c.length) err(`リスニング${label}：選択肢が重複 ${q.lines[0][1]}`);
    if (!q.x || !q.j) err(`リスニング${label}：解説・訳がない ${q.lines[0][1]}`);
    if (label !== '第1部' && !q.q) err(`リスニング${label}：質問がない ${q.lines[0][1]}`);
  }
  dupCheck(list, (q) => q.id, `リスニング${label}`);
}

console.log(`\n単語 ${words}・熟語 ${idioms}・会話表現 ${phrases}（つづり練習できるもの ${spell}）・過去形 ${VERBS.length}`);
console.log(`大問1 ${PART1.length}・大問2 ${PART2.length}・大問3 ${ORDER.length}・大問4 ${PART4.length}題（${PART4.reduce((a, p) => a + p.qs.length, 0)}問）`);
console.log(`リスニング 第1部 ${L1.length}・第2部 ${L2.length}・第3部 ${L3.length}・文法レッスン ${GRAMMAR.length}`);
console.log(errors ? `\n${errors} 件のエラー・${warns} 件の注意` : `\nOK（注意 ${warns} 件）`);
process.exit(errors ? 1 : 0);
