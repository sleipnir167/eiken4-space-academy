// 並べかえ（大問3）のタイル：タップでも、ドラッグでも並べられる
import { esc } from './ui.js';
import { sfx } from './sound.js';
import { shuffle } from './srs.js';

export const CIRCLED = ['①', '②', '③', '④', '⑤', '⑥'];
const norm = (s) => String(s).toLowerCase().replace(/[’]/g, "'");
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 本番形式の選択肢（2番目と4番目の組み合わせ）を作る */
export function comboChoices(item, tiles) {
  const numOf = (i) => tiles.find((t) => t.idx === i).num;
  const correct = `${numOf(1)}-${numOf(3)}`;
  const set = new Set([correct]);
  const nums = [1, 2, 3, 4, 5];
  let guard = 0;
  while (set.size < 4 && guard++ < 100) {
    const a = nums[Math.floor(Math.random() * 5)], b = nums[Math.floor(Math.random() * 5)];
    if (a !== b) set.add(`${a}-${b}`);
  }
  const list = shuffle([...set]);
  return { c: list.map((k) => k.split('-').map((n) => CIRCLED[n - 1]).join(' － ')), a: list.indexOf(correct), keys: list };
}

export class OrderTiles {
  /**
   * item: { ja, pre, chunks, post }
   * onChange(tiles)：置いたり外したりしたとき / onFull(tiles)：5つ全部置いたとき
   */
  constructor(item, { onChange, onFull, showJa = true, tiles = null } = {}) {
    this.item = item;
    this.onChange = onChange;
    this.onFull = onFull;
    // 表示順（①〜⑤）はシャッフル。idx は正しい順番での位置
    this.tiles = tiles || shuffle(item.chunks.map((text, idx) => ({ idx, text }))).map((t, k) => ({ ...t, num: k + 1 }));
    this.slots = new Array(item.chunks.length).fill(null); // slot → tile.num
    this.locked = false;
    this.el = document.createElement('div');
    this.el.className = 'order';
    this.el.innerHTML = `
      ${showJa ? `<p class="order-ja">${esc(item.ja)}</p>` : ''}
      <div class="order-sentence">
        ${item.pre ? `<span class="os-fix">${esc(item.pre)}</span>` : ''}
        <span class="os-bracket">(</span>
        ${this.slots.map((_, i) => `<span class="slot ${i === 1 || i === 3 ? 'key' : ''}" data-slot="${i}"><small>${i + 1}番目</small></span>`).join('')}
        <span class="os-bracket">)</span>
        ${item.post ? `<span class="os-fix">${esc(item.post)}</span>` : ''}
      </div>
      <div class="order-bank">
        ${this.tiles.map((t) => `<button type="button" class="tile" data-num="${t.num}"><i>${CIRCLED[t.num - 1]}</i><span>${esc(t.text)}</span></button>`).join('')}
      </div>`;
    this.bind();
  }

  tileEl(num) { return this.el.querySelector(`.tile[data-num="${num}"]`); }
  slotEl(i) { return this.el.querySelector(`.slot[data-slot="${i}"]`); }

  /** FLIP：要素を移動したあと、元の位置からすっと動かす */
  move(el, target, before = null) {
    const r0 = el.getBoundingClientRect();
    if (before) target.insertBefore(el, before); else target.appendChild(el);
    if (reduced()) return;
    const r1 = el.getBoundingClientRect();
    el.animate([{ transform: `translate(${r0.left - r1.left}px, ${r0.top - r1.top}px)` }, { transform: 'none' }], { duration: 220, easing: 'cubic-bezier(.2,.8,.3,1.2)' });
  }

  place(num, slot = null) {
    if (this.locked) return;
    const cur = this.slots.indexOf(num);
    let i = slot ?? this.slots.indexOf(null);
    if (i < 0) return;
    if (cur === i) return;
    if (cur >= 0) this.slots[cur] = null;
    // 置き先にほかのタイルがあれば入れかえる（前にいた場所か、なければ下へもどす）
    const other = this.slots[i];
    if (other != null) {
      if (cur >= 0) { this.slots[cur] = other; this.move(this.tileEl(other), this.slotEl(cur)); }
      else this.unplaceEl(other);
    }
    this.slots[i] = num;
    this.move(this.tileEl(num), this.slotEl(i));
    sfx.place();
    this.changed();
  }
  unplaceEl(num) {
    const bank = this.el.querySelector('.order-bank');
    // もとの番号の順に並べ直す
    const after = [...bank.querySelectorAll('.tile')].find((t) => +t.dataset.num > num);
    this.move(this.tileEl(num), bank, after || null);
  }
  remove(num) {
    if (this.locked) return;
    const i = this.slots.indexOf(num);
    if (i < 0) return;
    this.slots[i] = null;
    this.unplaceEl(num);
    sfx.unplace();
    this.changed();
  }
  clear() {
    if (this.locked) return;
    this.slots.forEach((n) => { if (n != null) this.unplaceEl(n); });
    this.slots.fill(null);
    this.changed();
  }
  changed() {
    this.el.querySelectorAll('.slot').forEach((s, i) => s.classList.toggle('filled', this.slots[i] != null));
    this.onChange?.(this);
    if (this.isFull()) this.onFull?.(this);
  }
  isFull() { return this.slots.every((n) => n != null); }
  isEmpty() { return this.slots.every((n) => n == null); }
  textOf(num) { return this.tiles.find((t) => t.num === num)?.text ?? ''; }
  words() { return this.slots.map((n) => (n == null ? '___' : this.textOf(n))); }

  /** 判定：語の並び（同じ語が2つあってもOK）で比べる */
  check() {
    const per = this.slots.map((n, i) => n != null && norm(this.textOf(n)) === norm(this.item.chunks[i]));
    return { ok: per.every(Boolean), per, got: this.words().join(' ') };
  }

  reveal(res) {
    this.lock();
    this.el.classList.add('revealed');
    this.el.querySelectorAll('.slot').forEach((s, i) => {
      s.classList.toggle('ok', res.per[i]);
      s.classList.toggle('ng', !res.per[i]);
    });
  }
  /** 正しい順に並べ直して見せる */
  showAnswer() {
    this.lock();
    // 同じ語が2つあるときは、今置いてあるタイルをなるべく動かさない
    const used = new Set();
    const want = this.item.chunks.map((text, i) => {
      const here = this.slots[i];
      const t = (here != null && !used.has(here) && norm(this.textOf(here)) === norm(text))
        ? this.tiles.find((x) => x.num === here)
        : this.tiles.find((x) => !used.has(x.num) && norm(x.text) === norm(text));
      used.add(t.num);
      return t.num;
    });
    want.forEach((num, i) => { if (this.slots[i] !== num) this.move(this.tileEl(num), this.slotEl(i)); this.slots[i] = num; });
    this.el.querySelectorAll('.slot').forEach((s) => { s.classList.remove('ng'); s.classList.add('ok', 'filled'); });
  }
  lock() { this.locked = true; this.el.classList.add('locked'); }

  bind() {
    let drag = null;
    const slotAt = (x, y) => {
      const hit = document.elementFromPoint(x, y)?.closest('.slot');
      return hit && this.el.contains(hit) ? +hit.dataset.slot : null;
    };
    const overBank = (x, y) => !!document.elementFromPoint(x, y)?.closest('.order-bank');
    this.el.addEventListener('pointerdown', (e) => {
      const t = e.target.closest('.tile');
      if (!t || this.locked) return;
      drag = { t, num: +t.dataset.num, x: e.clientX, y: e.clientY, moved: false, ghost: null, id: e.pointerId };
    });
    addEventListener('pointermove', this._pm = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 10) return;
      e.preventDefault();
      if (!drag.moved) {
        drag.moved = true;
        const r = drag.t.getBoundingClientRect();
        drag.ghost = drag.t.cloneNode(true);
        drag.ghost.classList.add('tile-ghost');
        Object.assign(drag.ghost.style, { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
        document.body.appendChild(drag.ghost);
        drag.t.classList.add('dragging');
        drag.r = r;
      }
      drag.ghost.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.max(-6, Math.min(6, dx / 30))}deg)`;
      const s = slotAt(e.clientX, e.clientY);
      this.el.querySelectorAll('.slot').forEach((x) => x.classList.toggle('hover', +x.dataset.slot === s));
    }, { passive: false });
    const end = (e) => {
      if (!drag || e.pointerId !== drag.id) return;
      const d = drag;
      drag = null;
      this.el.querySelectorAll('.slot.hover').forEach((x) => x.classList.remove('hover'));
      if (!d.moved) {
        // タップ：下のタイルなら次の空いているマスへ、マスの中なら下にもどす
        if (this.slots.includes(d.num)) this.remove(d.num); else this.place(d.num);
        return;
      }
      d.ghost.remove();
      d.t.classList.remove('dragging');
      const s = slotAt(e.clientX, e.clientY);
      if (s != null) this.place(d.num, s);
      else if (overBank(e.clientX, e.clientY) && this.slots.includes(d.num)) this.remove(d.num);
    };
    addEventListener('pointerup', this._pu = end);
    addEventListener('pointercancel', this._pc = end);
    // スロットのタップ（タイルのない場所）は何もしない。スクロール防止
    this.el.addEventListener('touchmove', (e) => { if (drag?.moved) e.preventDefault(); }, { passive: false });
  }

  destroy() {
    removeEventListener('pointermove', this._pm);
    removeEventListener('pointerup', this._pu);
    removeEventListener('pointercancel', this._pc);
    document.querySelectorAll('.tile-ghost').forEach((g) => g.remove());
  }
}
