"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const xTo = gsap.quickTo(el, "left", { duration: 1.1, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "top", { duration: 1.1, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX - 350);
      yTo(e.clientY - 350);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[700px] w-[700px] rounded-full md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(199,162,124,0.07) 0%, rgba(199,162,124,0.025) 38%, transparent 65%)"
      }}
    />
  );
}
