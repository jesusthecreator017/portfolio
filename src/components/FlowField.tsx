'use client';

import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; k: boolean };

/** FIG.01: fine-line particle trails that bend away from the pointer. */
export default function FlowField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const hero = cv?.parentElement;
    const ctx = cv?.getContext('2d');
    if (!cv || !hero || !ctx) return;

    const root = document.documentElement;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let W = 0,
      H = 0,
      P: Particle[] = [],
      c1 = '',
      c2 = '',
      mx = -999,
      my = -999,
      raf = 0,
      t = 0,
      visible = true;

    const cap = () =>
      W < 700 || matchMedia('(pointer: coarse)').matches ? 90 : 240;
    const cols = () => {
      const r = getComputedStyle(root);
      c1 = r.getPropertyValue('--fld-a').trim();
      c2 = r.getPropertyValue('--fld-b').trim();
    };
    const ang = (x: number, y: number) =>
      Math.sin(x * 0.0042 + t) * 1.7 + Math.cos(y * 0.0051 - t * 0.8) * 1.7;
    const step = (p: Particle, sp: number) => {
      const a = ang(p.x, p.y),
        dx = p.x - mx,
        dy = p.y - my,
        d = Math.hypot(dx, dy);
      let vx = Math.cos(a) * sp,
        vy = Math.sin(a) * sp;
      if (d < 110) {
        const f = (1 - d / 110) * 3.2;
        vx += (dx / d) * f;
        vy += (dy / d) * f;
      }
      ctx.strokeStyle = p.k ? c1 : c2;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      p.x += vx;
      p.y += vy;
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
        p.x = Math.random() * W;
        p.y = Math.random() * H;
      }
    };
    const clear = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, W, H);
    };
    // Reduced motion: one static frame, no animation loop.
    const still = () => {
      clear();
      ctx.globalAlpha = 0.5;
      ctx.lineWidth = 1;
      for (const p of P) for (let j = 0; j < 90; j++) step(p, 1.6);
    };
    const frame = () => {
      t += 0.0016;
      // fade old trails but keep the canvas transparent so the grid shows
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 0.08;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 1;
      for (const p of P) step(p, 1.1);
      raf = requestAnimationFrame(frame);
    };
    const run = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      cols();
      if (reduce.matches) return still();
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const b = cv.getBoundingClientRect();
      W = b.width;
      H = b.height;
      if (!W || !H) return;
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(cap(), Math.floor((W * H) / 3600));
      P = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        k: Math.random() < 0.35,
      }));
      clear();
      run();
    };
    const move = (e: PointerEvent) => {
      const b = cv.getBoundingClientRect();
      mx = e.clientX - b.left;
      my = e.clientY - b.top;
    };
    const leave = () => {
      mx = my = -999;
    };
    const up = (e: PointerEvent) => e.pointerType !== 'mouse' && leave();

    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerdown', move);
    hero.addEventListener('pointerleave', leave);
    hero.addEventListener('pointerup', up);
    hero.addEventListener('pointercancel', leave);
    const ro = new ResizeObserver(size);
    ro.observe(hero);
    const io = new IntersectionObserver((es) => {
      visible = es[0].isIntersecting;
      run();
    });
    io.observe(hero);
    reduce.addEventListener('change', run);
    document.addEventListener('visibilitychange', run);
    const mo = new MutationObserver(() => {
      clear();
      run();
    });
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    size();

    return () => {
      cancelAnimationFrame(raf);
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerdown', move);
      hero.removeEventListener('pointerleave', leave);
      hero.removeEventListener('pointerup', up);
      hero.removeEventListener('pointercancel', leave);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      reduce.removeEventListener('change', run);
      document.removeEventListener('visibilitychange', run);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="flow pointer-events-none absolute inset-0 z-0 block size-full"
    />
  );
}
