"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
    const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
    const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3.out" });

    let hover = false;

    const onMove = (e: MouseEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const isInteractive = (t: EventTarget | null) => {
      if (!(t instanceof Element)) return false;
      return Boolean(
        t.closest(
          "a, button, [role=button], input, textarea, select, [data-cursor], [data-hover]"
        )
      );
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const custom = target.closest<HTMLElement>("[data-cursor]");
      const labelText = custom?.dataset.cursor ?? "";
      hover = Boolean(custom || target.closest("a, button, [role=button]"));

      gsap.to(ring, {
        scale: hover ? 2.4 : 1,
        backgroundColor: hover ? "rgba(199,162,124,0.06)" : "rgba(199,162,124,0)",
        borderColor: hover ? "rgba(199,162,124,0.7)" : "rgba(199,162,124,0.35)",
        duration: 0.4,
        ease: "power3.out"
      });
      gsap.to(dot, {
        scale: hover ? 0.4 : 1,
        duration: 0.4,
        ease: "power3.out"
      });

      if (label) {
        label.textContent = labelText;
        gsap.to(label, {
          opacity: labelText ? 1 : 0,
          scale: labelText ? 1 : 0.6,
          duration: 0.35
        });
      }
    };

    const onDown = () => gsap.to(ring, { scale: hover ? 1.8 : 0.8, duration: 0.25 });
    const onUp = () => gsap.to(ring, { scale: hover ? 2.4 : 1, duration: 0.25 });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[120] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
        style={{ borderColor: "rgba(199,162,124,0.35)" }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-accent-light opacity-0"
        />
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[121] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
      />
    </>
  );
}
