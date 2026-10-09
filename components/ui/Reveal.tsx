"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  effect?: "fade" | "slide-up" | "scale" | "mask" | "blur" | "rotate" | "slide-left" | "slide-right";
  delay?: number;
  duration?: number;
  start?: string;
  once?: boolean;
};

export default function Reveal({
  children,
  className = "",
  effect = "slide-up",
  delay = 0,
  duration = 1.1,
  start = "top 88%",
  once = true
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const vars: gsap.TweenVars = {
        duration,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start,
          once
        }
      };

      switch (effect) {
        case "fade":
          gsap.fromTo(el, { opacity: 0 }, { opacity: 1, ...vars });
          break;
        case "slide-up":
          gsap.fromTo(el, { opacity: 0, y: 60 }, { opacity: 1, y: 0, ...vars });
          break;
        case "slide-left":
          gsap.fromTo(el, { opacity: 0, x: -70 }, { opacity: 1, x: 0, ...vars });
          break;
        case "slide-right":
          gsap.fromTo(el, { opacity: 0, x: 70 }, { opacity: 1, x: 0, ...vars });
          break;
        case "scale":
          gsap.fromTo(el, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, ...vars });
          break;
        case "blur":
          gsap.fromTo(
            el,
            { opacity: 0, filter: "blur(16px)" },
            { opacity: 1, filter: "blur(0px)", ...vars }
          );
          break;
        case "rotate":
          gsap.fromTo(
            el,
            { opacity: 0, rotate: 4, y: 40 },
            { opacity: 1, rotate: 0, y: 0, ...vars }
          );
          break;
        case "mask":
          gsap.fromTo(
            el,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", ...vars }
          );
          break;
      }
    }, ref);

    return () => ctx.revert();
  }, [effect, delay, duration, start, once]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
