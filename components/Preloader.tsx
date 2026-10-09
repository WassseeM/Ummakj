"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { gsap } from "@/lib/gsap";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const stateRef = useRef({ loaded: false, counted: false, done: false });

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pre-grid",
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: "power2.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".pre-tag",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.08, delay: 0.3 }
      );

      const obj = { v: 0 };
      gsap.to(obj, {
        v: 100,
        duration: 2.7,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.round(obj.v));
          if (Math.round(obj.v) >= 100) {
            stateRef.current.counted = true;
            tryFinish();
          }
        }
      });
    }, el);

    const tryFinish = () => {
      const s = stateRef.current;
      if (s.done || !s.loaded || !s.counted) return;
      s.done = true;

      const tl = gsap.timeline({
        onComplete: () => {
          window.dispatchEvent(new CustomEvent("ummakj:ready"));
          onComplete();
        }
      });

      tl.to(".pre-logo", { scale: 1.14, filter: "drop-shadow(0 0 34px rgba(199,162,124,0.55))", duration: 1, ease: "power3.inOut" })
        .to(".pre-caption", { opacity: 0, y: -16, duration: 0.45, ease: "power2.in" }, "-=0.3")
        .to(".pre-progress", { opacity: 0, duration: 0.4, ease: "power2.in" }, "<")
        .to(el, { yPercent: -100, duration: 1.15, ease: "power4.inOut" }, "-=0.15");
    };

    const onLoad = () => {
      stateRef.current.loaded = true;
      tryFinish();
    };

    if (document.readyState === "complete") {
      stateRef.current.loaded = true;
    } else {
      window.addEventListener("load", onLoad);
    }

    const safety = window.setTimeout(() => {
      stateRef.current.loaded = true;
      tryFinish();
    }, 9000);

    return () => {
      ctx.revert();
      window.removeEventListener("load", onLoad);
      window.clearTimeout(safety);
    };
  }, [onComplete]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center overflow-hidden bg-bg"
      aria-hidden="true"
    >
      <div className="pre-grid blueprint-grid absolute inset-0 opacity-0" />
      <div className="absolute inset-0 bg-rose-glow opacity-60" />

      <div className="relative flex w-full max-w-[320px] flex-col items-center px-8">
        <div className="pre-logo w-full will-change-transform">
          <Logo
            animated
            delay={0.35}
            showWordmark={false}
            onComplete={() => {
              stateRef.current.counted = true;
            }}
          />
        </div>
        <div className="pre-caption mt-8 text-center">
          <p className="font-display text-xl tracking-[0.4em] text-ink">UMMAKJ</p>
          <p className="label-mono mt-2 text-accent/70">Architecture Studio</p>
        </div>
      </div>

      <div className="pre-progress absolute bottom-10 left-1/2 w-[min(420px,70vw)] -translate-x-1/2">
        <div className="mb-3 flex items-end justify-between">
          <span className="pre-tag label-mono text-accent/70">Composing Space</span>
          <span className="pre-tag font-mono text-sm text-ink/90">{progress}%</span>
        </div>
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            className="h-full bg-rose-metal transition-[width] duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="pre-tag absolute bottom-10 left-10 hidden font-mono text-[0.6rem] uppercase tracking-widest text-ink/25 md:block">
        EST. MMIX — MMXXVI
      </div>
      <div className="pre-tag absolute bottom-10 right-10 hidden font-mono text-[0.6rem] uppercase tracking-widest text-ink/25 md:block">
        Blueprint / A0 · Rev. Final
      </div>
    </div>
  );
}
