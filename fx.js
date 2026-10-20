/* ==========================================================================
   FX.JS — (1) quái vật pixel nhả / nuốt icon ☭ quanh avatar
           (2) khối nội dung ghép từ pixel khi cuộn xuống, tan thành pixel khi cuộn lên
   Không cần sửa gì ở đây. Số icon: N_ICON, tốc độ: SPEED.
   ========================================================================== */
"use strict";
(function () {
  const RM = matchMedia("(prefers-reduced-motion:reduce)").matches, rnd = Math.random;
  const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim() || "#ff3b57";
  const FONT = '"Apple Symbols","Segoe UI Symbol","Noto Sans Symbols 2","DejaVu Sans",sans-serif';
  const N_ICON = 8, SPEED = 1, S = 340, C = S / 2;

  /* ---------- 1. QUÁI VẬT PIXEL (thiết kế riêng, 14×13 ô) ---------- */
  const MAP = ["..o........o..", ".obo......obo.", ".obboooooobbo.", "obbbbbbbbbbbbo", "obbwwbbbbwwbbo", "obbwpbbbbwpbbo", "obbbbbbbbbbbbo",
    "obboooooooobbo", "obmwmmmmmmwmbo", "obmmmrrrrmmmbo", ".obmmmrrmmmbo.", "..oobbbbbboo..", "....oooooo...."];
  const PAL = { o: "#1b0a33", b: "#8a3ffc", w: "#ffffff", p: "#12041f", m: "#12041f", r: "#ff3b57" };
  const spr = document.createElement("canvas"); spr.width = 14; spr.height = 13;
  { const g = spr.getContext("2d"); MAP.forEach((row, y) => [...row].forEach((c, x) => { if (PAL[c]) { g.fillStyle = PAL[c]; g.fillRect(x, y, 1, 1); } })); }
  /* ☭ dạng pixel: vẽ nhỏ 14×14 rồi phóng 2× không làm mịn */
  const gs = document.createElement("canvas"); gs.width = gs.height = 14;
  { const g = gs.getContext("2d"); g.font = "bold 13px " + FONT; g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#fff"; g.fillText("☭", 7, 7.5);
    const im = g.getImageData(0, 0, 14, 14), d = im.data; for (let i = 3; i < d.length; i += 4) d[i] = d[i] > 90 ? 255 : 0; g.putImageData(im, 0, 0); }   /* cắt nét → pixel thật */

  const cv = document.getElementById("orb"); if (!cv) return initReveal();
  const g = cv.getContext("2d"), dpr = Math.min(2, devicePixelRatio || 1);
  cv.width = cv.height = S * dpr; g.scale(dpr, dpr);

  const MA = -48 * Math.PI / 180, MR = 112;                    // quái vật ở góc trên bên phải avatar
  const MX = C + Math.cos(MA) * MR, MY = C + Math.sin(MA) * MR;
  const mon = { s: 1, v: 0, t: 1, pop: 0, stored: 1, sp: 2.5, bob: 0 };
  const rr = (a, b) => a + rnd() * (b - a);
  const mk = (a, sign) => ({ a, w: sign * rr(.26, .46) * SPEED, R: rr(92, 130), aw: rr(8, 20), f: rr(.4, 1.1), ph: rnd() * 6.28, d: 0, sc: 1, cd: 0, eat: -1, x: 0, y: 0, tr: 0 });
  const ps = Array.from({ length: N_ICON }, (_, i) => mk(i / N_ICON * 6.283, i % 3 ? 1 : -1));
  const dots = []; let T = 0;

  const pos = p => {
    const a = p.a + .14 * Math.sin(T * .7 + p.ph), r = p.R + p.aw * Math.sin(T * p.f + p.ph) + 5 * Math.sin(T * 2.3 + p.ph * 2) + p.d;
    return [C + Math.cos(a) * r, C + Math.sin(a) * r, r];
  };

  function step(dt) {
    T += dt;
    for (let i = ps.length - 1; i >= 0; i--) {
      const p = ps[i];
      if (p.eat >= 0) {                                         // đang bị nuốt: bay vào miệng, nhỏ dần
        p.eat += dt / .32; const e = p.eat * p.eat;
        p.x += (MX - p.x) * Math.min(1, e * .5 + dt * 6); p.y += (MY - p.y) * Math.min(1, e * .5 + dt * 6); p.sc = Math.max(0, 1 - p.eat);
        if (p.eat >= 1) { ps.splice(i, 1); mon.stored++; mon.t = 1 + .16 * mon.stored; mon.pop = 1; }
        continue;
      }
      p.a += p.w * dt; p.d *= Math.exp(-dt * 1.5); p.sc = Math.min(1, p.sc + dt * 2.2); p.cd -= dt;
      const q = pos(p); p.x = q[0]; p.y = q[1];
      p.tr -= dt; if (p.tr <= 0) { p.tr = .05; for (let k = 0; k < 2; k++) dots.push({ x: Math.round((p.x + rr(-5, 5)) / 3) * 3, y: Math.round((p.y + rr(-5, 5)) / 3) * 3, l: 1, c: rnd() > .5 ? 1 : 0 }); }
      for (const o of ps) if (o !== p && o.eat < 0 && Math.hypot(p.x - o.x, p.y - o.y) < 30) p.a += (Math.sin(p.ph) > 0 ? 1 : -1) * dt * .9;   /* tách nhau ra, đỡ chồng */
      if (p.cd <= 0 && Math.hypot(p.x - MX, p.y - MY) < 13 * mon.s + 9) p.eat = 0;
    }
    mon.sp -= dt; if (mon.stored >= 4) mon.sp = Math.min(mon.sp, .5);
    if (mon.sp <= 0 && mon.stored > 0) {                         // nhả 1 icon: monster nhỏ lại
      mon.sp = rr(2.4, 4.4); mon.stored--; mon.t = 1 + .16 * mon.stored; mon.pop = -1;
      const p = mk(MA, rnd() > .5 ? 1 : -1); p.sc = 0; p.cd = 3.2; p.d = MR - pos(p)[2]; p.d += 0; ps.push(p);
    } else if (mon.sp <= 0) mon.sp = 1;
    mon.v += (mon.t - mon.s) * 70 * dt; mon.v *= Math.exp(-dt * 9); mon.s += mon.v * dt;   // lò xo: to ra có nảy
    mon.pop *= Math.exp(-dt * 6); mon.bob += dt;
    for (let i = dots.length - 1; i >= 0; i--) { dots[i].l -= dt * 1.5; if (dots[i].l <= 0) dots.splice(i, 1); }
  }

  function draw() {
    g.clearRect(0, 0, S, S); g.imageSmoothingEnabled = false;
    const acc = css("--acc"), acc3 = css("--acc-3");
    dots.forEach(d => { g.globalAlpha = d.l * .8; g.fillStyle = d.c ? "#fff" : acc3; g.fillRect(d.x, d.y, 3, 3); }); g.globalAlpha = 1;
    /* quái vật */
    const px = 2.4 * mon.s, w = 14 * px, h = 13 * px, sx = 1 + .2 * mon.pop, sy = 1 - .2 * mon.pop;
    g.save(); g.translate(MX, MY + Math.sin(mon.bob * 1.6) * 1.5);
    const gl = g.createRadialGradient(0, 0, 2, 0, 0, w); gl.addColorStop(0, "rgba(168,85,247,.35)"); gl.addColorStop(1, "rgba(168,85,247,0)");
    g.fillStyle = gl; g.fillRect(-w, -w, 2 * w, 2 * w);
    g.scale(sx, sy); g.drawImage(spr, -w / 2, -h / 2, w, h); g.restore();
    /* icon ☭ kính lỏng */
    ps.forEach(p => {
      g.save(); g.translate(p.x, p.y); g.scale(p.sc, p.sc);
      const lg = g.createRadialGradient(-5, -6, 1, 0, 0, 17); lg.addColorStop(0, "rgba(255,255,255,.40)"); lg.addColorStop(.6, "rgba(255,255,255,.08)"); lg.addColorStop(1, "rgba(255,255,255,.18)");
      g.beginPath(); g.arc(0, 0, 17, 0, 6.283); g.fillStyle = lg; g.fill(); g.lineWidth = 1.2; g.strokeStyle = "rgba(255,255,255,.55)"; g.stroke();
      g.beginPath(); g.arc(0, 0, 13, 3.5, 4.9); g.lineWidth = 1.6; g.strokeStyle = "rgba(255,255,255,.75)"; g.stroke();
      g.shadowColor = acc; g.shadowBlur = 12; g.imageSmoothingEnabled = false; g.drawImage(gs, -14, -14, 28, 28);
      g.restore();
    });
  }

  if (RM) { for (let i = 0; i < 40; i++) step(.1); draw(); }
  else {
    let last = 0, on = true;
    const loop = t => { if (!on) return; const dt = Math.min(.05, (t - last) / 1000 || .016); last = t; step(dt); draw(); requestAnimationFrame(loop); };
    new IntersectionObserver(e => { const v = e[0].isIntersecting; if (v && !on) { on = true; last = performance.now(); requestAnimationFrame(loop); } on = v; }).observe(cv);
    requestAnimationFrame(loop);
  }
  initReveal();

  /* ---------- 2. GHÉP PIXEL KHI CUỘN XUỐNG / TAN PIXEL KHI CUỘN LÊN ---------- */
  function initReveal() {
    if (RM) { window.pxReveal = e => e.target.classList.toggle("in", e.intersectionRatio >= .14); return; }
    const pc = document.createElement("canvas"); pc.id = "pix"; document.body.appendChild(pc);
    const x = pc.getContext("2d"), P = []; let run = false;
    const fit = () => { const d = Math.min(2, devicePixelRatio || 1); pc.width = innerWidth * d; pc.height = innerHeight * d; x.setTransform(d, 0, 0, d, 0, 0); };
    fit(); addEventListener("resize", fit);
    const ease = t => 1 - Math.pow(1 - t, 3);

    function burst(el, out) {
      if (P.length > 420) return;
      const r = el.getBoundingClientRect(), top = Math.max(r.top, 0), bot = Math.min(r.bottom, innerHeight);
      if (bot - top < 8) return;
      const n = Math.max(18, Math.min(70, r.width * (bot - top) / 1100 | 0)), cols = [css("--acc"), css("--acc-3"), "#ffffff", "#c9a8ff"];
      for (let i = 0; i < n; i++) P.push({ el, out, r: { l: r.left, w: r.width, t: top, h: bot - top }, u: rnd(), v: rnd(),
        sx: (rnd() - .5) * 240, sy: (rnd() - .5) * 160 + (out ? -50 : 36), t: -rnd() * .3, dur: .5 + rnd() * .3, s: [4, 6, 8][rnd() * 3 | 0], c: cols[rnd() * 4 | 0] });
      if (!run) { run = true; last = performance.now(); requestAnimationFrame(tick); }
    }
    let last = 0;
    function tick(now) {
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      x.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i]; p.t += dt; if (p.t < 0) continue;
        const k = p.t / p.dur; if (k >= 1 || !p.el.isConnected) { P.splice(i, 1); continue; }
        const e = ease(k); let r = p.r;
        if (!p.out) { const b = p.el.getBoundingClientRect(); r = { l: b.left, w: b.width, t: b.top, h: b.height }; }   // bám theo khi trang đang cuộn
        const tx = r.l + p.u * r.w, ty = r.t + p.v * r.h;
        const ox = p.out ? p.sx * e : p.sx * (1 - e), oy = p.out ? p.sy * e : p.sy * (1 - e);
        x.globalAlpha = p.out ? (1 - k) * .95 : (k < .7 ? k / .7 : (1 - k) / .3) * .95;
        x.fillStyle = p.c; x.fillRect(Math.round((tx + ox) / 4) * 4, Math.round((ty + oy) / 4) * 4, p.s, p.s);
      }
      x.globalAlpha = 1;
      if (P.length) requestAnimationFrame(tick); else { run = false; x.clearRect(0, 0, innerWidth, innerHeight); }
    }
    window.pxReveal = e => {
      const el = e.target, c = el.classList, quiet = performance.now() - (window.pxQuiet || 0) < 450;
      if (e.intersectionRatio >= .14 && !c.contains("in")) { c.remove("out"); c.add("in"); if (!quiet) burst(el, false); }
      else if (e.intersectionRatio < .14 && c.contains("in") && e.boundingClientRect.top > innerHeight * .4) { c.remove("in"); c.add("out"); burst(el, true); }
    };
  }
})();
