"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export default function CountUp({ value, suffix = "", duration = 2.2, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obj = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: value,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true
        },
        onUpdate: () => {
          el.textContent = String(Math.round(obj.v));
        }
      });
    }, ref);

    return () => ctx.revert();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
