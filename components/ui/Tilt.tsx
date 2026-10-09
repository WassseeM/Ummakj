"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type TiltProps = {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
};

export default function Tilt({
  children,
  className = "",
  max = 7,
  scale = 1.02,
  glare = true
}: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) return;

    const rx = gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3.out" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3.out" });
    const sx = gsap.quickTo(el, "scale", { duration: 0.9, ease: "power3.out" });
    const glareEl = el.querySelector<HTMLElement>("[data-glare]");

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      ry(px * max * 2);
      rx(-py * max * 2);
      sx(scale);
      if (glareEl) {
        gsap.to(glareEl, {
          backgroundPosition: `${50 + px * 60}% ${50 + py * 60}%`,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    };

    const onLeave = () => {
      rx(0);
      ry(0);
      sx(1);
      if (glareEl) gsap.to(glareEl, { backgroundPosition: "50% 50%", duration: 0.5 });
    };

    el.style.transformStyle = "preserve-3d";
    el.style.perspective = "1200px";

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [max, scale]);

  return (
    <div ref={ref} className={className}>
      {children}
      {glare && (
        <div
          data-glare
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 hover:opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.14), transparent 55%)"
          }}
        />
      )}
    </div>
  );
}
