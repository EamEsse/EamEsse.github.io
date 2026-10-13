/* Pixel&Craft project model. Uses the same .pixeljson schema as the desktop app. */
(function (root) {
  'use strict';
  const CLEAR = '#00FFFFFF';
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function color(value) {
    let s = String(value || '').trim().replace(/^#/, '').toUpperCase();
    if (s.length === 6) s = 'FF' + s;
    if (!/^[0-9A-F]{8}$/.test(s)) throw new Error('Invalid HEX');
    return s.startsWith('00') ? CLEAR : '#' + s;
  }
  const rgba = c => [1, 3, 5, 7].map(i => parseInt(c.slice(i, i + 2), 16));
  const hex = a => '#' + a.map(v => clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')).join('').toUpperCase();
  const css = c => { const [a, r, g, b] = rgba(c); return `rgba(${r},${g},${b},${a / 255})`; };
  function blend(dst, src, opacity = 1) {
    const [da, dr, dg, db] = rgba(dst), [a, r, g, b] = rgba(src);
    const sa = a / 255 * opacity, d = da / 255, ra = sa + d * (1 - sa);
    if (!ra) return CLEAR;
    return hex([ra * 255, (r * sa + dr * d * (1 - sa)) / ra, (g * sa + dg * d * (1 - sa)) / ra, (b * sa + db * d * (1 - sa)) / ra]);
  }
  function layer(w, h, n) {
    return { name: n ? `Capa ${n}` : 'Fondo', defaultNameNumber: n, visible: true, opacity: 1, hex: Array(w * h).fill(CLEAR), outsidePixels: [] };
  }
  class Project {
    constructor(w = 32, h = 32) {
      this.Width = w; this.Height = h; this.Shape = 'Square'; this.Layers = [layer(w, h, 0), layer(w, h, 1)];
      this.ActiveLayer = 1; this.Marks = []; this.Recent = []; this.Saved = []; this.ReferenceImage = null;
    }
    get active() { return this.Layers[this.ActiveLayer]; }
    contains(x, y) {
      const w = this.Width, h = this.Height;
      if (x < 0 || y < 0 || x >= w || y >= h) return false;
      if (this.Shape === 'Circle') return ((x + .5 - w / 2) / (w / 2)) ** 2 + ((y + .5 - h / 2) / (h / 2)) ** 2 <= 1;
      const size = Math.min(w, h), l = Math.floor((w - size) / 2), t = Math.floor((h - size) / 2);
      return x >= l && x < l + size && y >= t && y < t + size;
    }
    get(x, y) {
      if (!this.contains(x, y)) return CLEAR;
      let result = CLEAR;
      const i = y * this.Width + x;
      for (const l of this.Layers) {
        const src = l.hex[i];
        if (!l.visible || l.opacity === 0 || src === CLEAR) continue;
        result = l.opacity === 1 && src.startsWith('#FF') ? src : blend(result, src, l.opacity);
      }
      return result;
    }
    cells() { return Array.from({ length: this.Width * this.Height }, (_, i) => this.get(i % this.Width, Math.floor(i / this.Width))); }
    set(x, y, c) { if (this.contains(x, y)) this.active.hex[y * this.Width + x] = c; }
    stroke(x0, y0, x1, y1, size, c) {
      if (!this.contains(x0, y0) || !this.contains(x1, y1)) return;
      const left = Array(this.Height).fill(this.Width), right = Array(this.Height).fill(0), half = Math.floor((size - 1) / 2);
      const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
      let err = dx + dy;
      for (;;) {
        for (let y = Math.max(0, y0 - half); y < Math.min(this.Height, y0 - half + size); y++) {
          left[y] = Math.min(left[y], Math.max(0, x0 - half)); right[y] = Math.max(right[y], Math.min(this.Width, x0 - half + size));
        }
        if (x0 === x1 && y0 === y1) break;
        const e = err * 2;
        if (e >= dy) { err += dy; x0 += sx; } if (e <= dx) { err += dx; y0 += sy; }
      }
      for (let y = 0; y < this.Height; y++) for (let x = left[y]; x < right[y]; x++) this.set(x, y, c);
    }
    fill(x, y, c) {
      if (!this.contains(x, y)) return;
      const original = this.active.hex[y * this.Width + x];
      if (c === original) return;
      const queue = [[x, y]]; this.set(x, y, c);
      for (let i = 0; i < queue.length; i++) {
        const [cx, cy] = queue[i];
        for (const [nx, ny] of [[cx - 1, cy], [cx + 1, cy], [cx, cy - 1], [cx, cy + 1]]) {
          if (this.contains(nx, ny) && this.active.hex[ny * this.Width + nx] === original) { this.set(nx, ny, c); queue.push([nx, ny]); }
        }
      }
    }
    touch(c) { if (c === CLEAR || this.Recent.includes(c)) return; this.Recent.push(c); if (this.Recent.length > 14) this.Recent.shift(); }
    addLayer() {
      if (this.Layers.length >= 32) throw new Error('Max 32 layers');
      const n = Math.max(...this.Layers.map(l => l.defaultNameNumber || 0)) + 1;
      this.Layers.push(layer(this.Width, this.Height, n)); this.ActiveLayer = this.Layers.length - 1;
    }
    removeLayer(i) { if (i <= 0) return; this.Layers.splice(i, 1); this.ActiveLayer = clamp(this.ActiveLayer > i ? this.ActiveLayer - 1 : this.ActiveLayer, 0, this.Layers.length - 1); }
    reorder(from, to) {
      if (from <= 0 || to <= 0 || from === to) return;
      const active = this.active, [l] = this.Layers.splice(from, 1); this.Layers.splice(to, 0, l); this.ActiveLayer = this.Layers.indexOf(active);
    }
    move(dx, dy) {
      const l = this.active, pixels = l.outsidePixels.slice();
      l.hex.forEach((c, i) => { if (c !== CLEAR) pixels.push({ x: i % this.Width, y: Math.floor(i / this.Width), hex: c }); });
      l.hex.fill(CLEAR); l.outsidePixels = [];
      pixels.forEach(p => {
        const x = p.x + dx, y = p.y + dy;
        if (x >= 0 && y >= 0 && x < this.Width && y < this.Height) l.hex[y * this.Width + x] = p.hex;
        else l.outsidePixels.push({ x, y, hex: p.hex });
      });
    }
    resize(w, h) {
      this.Layers.forEach(l => {
        const cells = Array(w * h).fill(CLEAR), outside = [];
        for (let y = 0; y < Math.min(h, this.Height); y++) for (let x = 0; x < Math.min(w, this.Width); x++) cells[y * w + x] = l.hex[y * this.Width + x];
        l.outsidePixels.forEach(p => { if (p.x >= 0 && p.y >= 0 && p.x < w && p.y < h) cells[p.y * w + p.x] = p.hex; else outside.push(p); });
        l.hex = cells; l.outsidePixels = outside;
      });
      this.Width = w; this.Height = h; this.Marks = this.Marks.filter(([x, y]) => x < w && y < h);
    }
    mark(x, y, erase) {
      if (!this.contains(x, y)) return;
      const i = this.Marks.findIndex(p => p[0] === x && p[1] === y);
      if (erase && i >= 0) this.Marks.splice(i, 1); else if (!erase && i < 0) this.Marks.push([x, y]);
    }
    serialize() {
      const data = { Width: this.Width, Height: this.Height, Shape: this.Shape, Cells: [], Recent: this.Recent, Saved: this.Saved,
        Layers: this.Layers, ActiveLayer: this.ActiveLayer, Marks: this.Marks };
      if (this.ReferenceImage) data.ReferenceImage = this.ReferenceImage;
      return JSON.stringify(data);
    }
    static load(input) {
      const data = typeof input === 'string' ? JSON.parse(input) : input;
      const w = data.Width, h = data.Height;
      if (!Number.isInteger(w) || !Number.isInteger(h) || w < 1 || h < 1 || w > 256 || h > 256) throw new Error('Invalid dimensions (1–256)');
      const p = new Project(w, h);
      if (data.Shape && !['Square', 'Circle', 'Oval', 'OvalHorizontal', 'OvalVertical'].includes(data.Shape)) throw new Error('Invalid shape');
      p.Shape = data.Shape && data.Shape !== 'Square' ? 'Circle' : 'Square';
      if (Array.isArray(data.Layers) && data.Layers.length) {
        if (data.Layers.length > 32) throw new Error('Max 32 layers');
        p.Layers = data.Layers.map((l, i) => ({ name: String(l.name || (i ? `Capa ${i}` : 'Fondo')), defaultNameNumber: l.defaultNameNumber ?? null,
          visible: l.visible !== false, opacity: Number.isFinite(l.opacity) ? clamp(l.opacity, 0, 1) : 1,
          hex: Array.from({ length: w * h }, (_, j) => l.hex?.[j] ? color(l.hex[j]) : CLEAR),
          outsidePixels: (l.outsidePixels || []).filter(a => Number.isInteger(a.x) && Number.isInteger(a.y)).map(a => ({ x: a.x, y: a.y, hex: color(a.hex) })) }));
        p.ActiveLayer = clamp(Number.isInteger(data.ActiveLayer) ? data.ActiveLayer : 1, 0, p.Layers.length - 1);
      } else p.Layers[1].hex = Array.from({ length: w * h }, (_, i) => data.Cells?.[i] ? color(data.Cells[i]) : CLEAR);
      p.Recent = [...new Set((data.Recent || []).map(color))].filter(c => c !== CLEAR).slice(-14);
      p.Saved = palette(data);
      p.Marks = (data.Marks || []).filter(a => Array.isArray(a) && a.length >= 2 && Number.isInteger(a[0]) && Number.isInteger(a[1]) && a[0] >= 0 && a[1] >= 0 && a[0] < w && a[1] < h).map(a => a.slice(0, 2));
      if (data.ReferenceImage) {
        const r = data.ReferenceImage;
        if (typeof r.data !== 'string' || ![r.x, r.y, r.width, r.height].every(Number.isFinite) || r.width <= 0 || r.height <= 0) throw new Error('Invalid reference image');
        p.ReferenceImage = { data: r.data, x: r.x, y: r.y, width: r.width, height: r.height };
      }
      return p;
    }
  }
  function palette(data) {
    const seen = new Set();
    return (data.Saved || []).map(s => ({ name: typeof s === 'string' ? '' : String(s.name || ''), hex: color(typeof s === 'string' ? s : s.hex) }))
      .filter(s => s.hex !== CLEAR && !seen.has(s.hex) && seen.add(s.hex));
  }
  function letters(cells) {
    const map = new Map();
    cells.forEach(c => { if (c !== CLEAR && !map.has(c) && map.size < 52) map.set(c, String.fromCharCode(map.size < 26 ? 65 + map.size : 97 + map.size - 26)); });
    return map;
  }
  function counts(cells, w, h, direction) {
    const result = Array(cells.length).fill(0);
    if (!direction) return result;
    const rows = direction === 'row', a = rows ? h : w, b = rows ? w : h;
    for (let i = 0; i < a; i++) {
      let prev = CLEAR, n = 0;
      for (let j = 0; j < b; j++) {
        const idx = rows ? i * w + j : j * w + i, c = cells[idx];
        n = c === CLEAR ? 0 : c === prev ? n + 1 : 1; prev = c; result[idx] = n;
      }
    }
    return result;
  }
  class History {
    constructor(p) { this.reset(p); }
    reset(p) { this.past = []; this.future = []; this.saved = p.serialize(); this.start = null; this.bytes = 0; }
    begin(p) { if (this.start === null) this.start = p.serialize(); }
    end(p) {
      if (this.start === null) return;
      if (this.start !== p.serialize()) { this.past.push(this.start); this.bytes += this.start.length * 2; this.future = []; }
      this.start = null;
      while (this.past.length > 1 && (this.past.length > 100 || this.bytes > 64 * 1024 * 1024)) this.bytes -= this.past.shift().length * 2;
    }
    undo(p) { this.end(p); const s = this.past.pop(); if (!s) return p; this.bytes -= s.length * 2; this.future.push(p.serialize()); return Project.load(s); }
    redo(p) { const s = this.future.pop(); if (!s) return p; const before = p.serialize(); this.past.push(before); this.bytes += before.length * 2; return Project.load(s); }
    dirty(p) { return p.serialize() !== this.saved; }
  }
  const api = { Project, History, CLEAR, color, rgba, hex, css, blend, palette, letters, counts, clamp };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.PixelCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
