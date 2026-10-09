"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; r: number; vx: number; vy: number; o: number };

export default function BackgroundFX() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = c.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(90, Math.floor((w * h) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        o: Math.random() * 0.4 + 0.08
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(199,162,124,${p.o})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <div className="absolute -left-32 top-1/4 h-[480px] w-[480px] rounded-full bg-rose-glow" />
      <div className="absolute -right-40 top-[58%] h-[520px] w-[520px] rounded-full bg-rose-glow opacity-70" />
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

      <svg
        className="absolute left-[7%] top-[38%] h-24 w-24 animate-float-y text-accent/10"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path d="M40 170 V40 H160 V170" stroke="currentColor" strokeWidth="0.75" />
        <path d="M40 105 H160" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.6" />
      </svg>
      <svg
        className="absolute right-[9%] top-[30%] h-20 w-20 animate-float-y text-accent/10 [animation-delay:2.4s]"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.75" />
        <path d="M100 40 V160 M40 100 H160" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
