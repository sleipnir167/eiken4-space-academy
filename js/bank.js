// 問題・単語データの読み込みと整形
import { WORDS_RAW, IDIOMS_RAW, PHRASES_RAW } from '../data/words.js';
import { VERBS_RAW } from '../data/verbs.js';
import { PART1_RAW, PART2_RAW, PASSAGES } from '../data/reading.js';
import { ORDER_RAW } from '../data/order.js';
import { L1_RAW, L2_RAW, L3_RAW } from '../data/listening.js';

export function hashId(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(36);
}
const lines = (raw) => raw.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('//'));
const cols = (l) => l.split('|').map((s) => s.trim());
const choices = (s) => s.split(' / ').map((x) => x.trim()).filter(Boolean);

// ---------------- 単語・熟語・会話表現 ----------------
function parseCards(raw, kind) {
  const seen = new Set();
  const out = [];
  for (const l of lines(raw)) {
    const [w, pos, m, e, ej, r, f, t] = cols(l);
    const base = kind === 'word' ? w : `${kind[0]}:${w}`;
    if (seen.has(base)) continue; // 重複は最初のものを使う
    seen.add(base);
    out.push({ id: base, kind, w, pos, m, e, ej, r: Number(r) || 2, f: f || '', t: t || (kind === 'word' ? 'adv' : kind), n: out.length });
  }
  return out;
}
export const WORDS = parseCards(WORDS_RAW, 'word');
export const IDIOMS = parseCards(IDIOMS_RAW, 'idiom');
export const PHRASES = parseCards(PHRASES_RAW, 'phrase');
export const CARDS = [...WORDS, ...IDIOMS, ...PHRASES];
export const cardById = new Map(CARDS.map((c) => [c.id, c]));

export const KIND_LABEL = { word: '単語', idiom: '熟語', phrase: '会話表現' };
export const RANK_LABEL = { 1: 'A 最重要', 2: 'B 重要', 3: 'C おさえたい' };
export const THEMES = {
  time: ['🗓️', '時・曜日・月'], num: ['🔢', '数'], people: ['👪', '人・家族'], school: ['🏫', '学校'], job: ['👩‍🚀', '仕事'],
  food: ['🍙', '食べ物'], place: ['🏙️', '場所・建物'], travel: ['🚆', '乗り物・旅行'], nature: ['🌈', '自然・天気・動物'],
  home: ['🏠', '家・持ち物'], hobby: ['⚽', '趣味・スポーツ'], body: ['🩺', '体・健康'], verb: ['🏃', '動詞'], adj: ['🎨', '形容詞'], adv: ['🧩', '副詞・その他'],
};

/** つづりを書く練習ができるか（～ や A/B など可変部分がないもの） */
export const spellable = (c) => c.kind !== 'phrase' && /^[A-Za-z][A-Za-z' .-]*[A-Za-z.]$/.test(c.w) && !/\b(one's|oneself|A|B)\b/.test(c.w) && !c.w.includes('~');

/** 例文を HTML に（見出し語を強調／空欄に） */
export function exampleHTML(c, { blank = false } = {}) {
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  return esc(c.e).replace(/\{([^}]+)\}/g, (m, x) => (blank ? `<span class="blank">${'&nbsp;'.repeat(Math.max(4, x.length))}</span>` : `<b class="hl">${x}</b>`));
}
export const examplePlain = (c) => c.e.replace(/[{}]/g, '');
/** 例文中の見出し語の形（変化形も含む） */
export const exampleTarget = (c) => (c.e.match(/\{([^}]+)\}/) || [])[1] || c.w;

// SRS のキー
export const meanKey = (c) => `wm:${c.id}`;
export const spellKey = (c) => `ws:${c.id}`;

// ---------------- 過去形マスター ----------------
export const VERBS = lines(VERBS_RAW).map((l, n) => {
  const [base, past, m, e, ej, k] = cols(l);
  return { id: `vp:${base}`, base, past, m, e, ej, irregular: k !== 'r', n };
});
export const verbById = new Map(VERBS.map((v) => [v.id, v]));

// ---------------- 筆記 ----------------
export const R1_CATS = { noun: '名詞', verb: '動詞', adj: '形容詞', adv: '副詞', idiom: '熟語', grammar: '文法' };

export const PART1 = lines(PART1_RAW).map((l) => {
  const [q, c, k, x, j] = cols(l);
  const [cat, g] = k.split(':');
  return { id: `r1:${hashId(q)}`, part: 1, q, c: choices(c), a: 0, k: cat, g: g || '', x, j };
});

const speaker = (s) => {
  const m = s.match(/^([A-Za-z .']+):\s*(.*)$/);
  return m ? [m[1].trim(), m[2].trim()] : ['', s.trim()];
};
export const PART2 = lines(PART2_RAW).map((l) => {
  const [d, c, x, j] = cols(l);
  return { id: `r2:${hashId(d)}`, part: 2, lines: d.split(' // ').map(speaker), c: choices(c), a: 0, x, j };
});

// 大問3：並べかえ
const joinSentence = (pre, mid, post) => {
  let s = [pre, mid].filter(Boolean).join(' ');
  s += /^[,.?!]/.test(post) ? post : ` ${post}`;
  s = s.trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
};
export const ORDER = lines(ORDER_RAW).map((l) => {
  const [ja, pre, ch, post, g, x] = cols(l);
  const chunks = choices(ch);
  return { id: `r3:${hashId(ja + ch)}`, part: 3, ja, pre, chunks, post, g, x, sentence: joinSentence(pre, chunks.join(' '), post) };
});
export const orderById = new Map(ORDER.map((o) => [o.id, o]));
export { joinSentence };

// 大問4：長文
export const PART4 = PASSAGES.map((p) => ({
  ...p,
  qs: p.qs.map((q, i) => ({ ...q, id: `r4:${p.id}:${i}`, part: 4, a: 0, pid: p.id })),
}));
export const PART4_QS = PART4.flatMap((p) => p.qs);
export const passageById = new Map(PART4.map((p) => [p.id, p]));
export const R4_TYPES = { A: '掲示・お知らせ', B: 'Eメール・手紙', C: '説明文・物語' };

// ---------------- リスニング ----------------
const gender = (who) => (/^(M|Man|Boy|Father|Dad)$/i.test(who) ? 'M' : 'W');
const talk = (s) => s.split(' // ').map((t) => { const [w, x] = speaker(t); return [gender(w), x]; });

export const L1 = lines(L1_RAW).map((l) => {
  const [d, c, pic, x, j] = cols(l);
  const [icon, place] = (pic || '💬@home').split('@');
  return { id: `l1:${hashId(d)}`, part: 1, lines: talk(d), c: choices(c), a: 0, icon, place: place || 'home', x, j };
});
export const L2 = lines(L2_RAW).map((l) => {
  const [d, q, c, x, j] = cols(l);
  return { id: `l2:${hashId(d)}`, part: 2, lines: talk(d), q, c: choices(c), a: 0, x, j };
});
export const L3 = lines(L3_RAW).map((l) => {
  const [d, q, c, x, j] = cols(l);
  return { id: `l3:${hashId(d)}`, part: 3, lines: talk(d), q, c: choices(c), a: 0, x, j };
});
export const LISTENING = { 1: L1, 2: L2, 3: L3 };

/** 選択肢をシャッフルして { c, a } を返す（元の正解は a） */
export function shuffleChoices(item) {
  const order = item.c.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
  return { c: order.map((i) => item.c[i]), a: order.indexOf(item.a ?? 0) };
}

/** 追加問題（取り込み・AI生成）を含めた大問1の問題 */
export function part1Pool(custom = []) {
  return [...PART1, ...custom.filter((q) => q.part === 1 && Array.isArray(q.c) && q.c.length === 4)];
}
