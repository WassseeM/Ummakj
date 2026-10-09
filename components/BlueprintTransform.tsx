"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { IMAGES } from "@/lib/site";

const WireScene = dynamic(() => import("./WireScene"), { ssr: false });

const PHASES = ["Blueprint", "Wireframe", "Elevation", "Residence"];

export default function BlueprintTransform() {
  const root = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  const phaseRef = useRef(0);

  useLayoutEffect(() => {
    const el = root.current;
    const sc = section.current;
    if (!el || !sc) return;

    const ctx = gsap.context(() => {
      const updatePhase = (self: ScrollTrigger) => {
        const p = self.progress;
        const idx = p < 0.28 ? 0 : p < 0.52 ? 1 : p < 0.76 ? 2 : 3;
        if (idx !== phaseRef.current) {
          phaseRef.current = idx;
          setPhase(idx);
        }
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sc,
          start: "top top",
          end: "+=3400",
          scrub: 1,
          pin: true,
          onUpdate: updatePhase
        }
      });

      tl.to("[data-plan-draw]", {
        strokeDashoffset: 0,
        duration: 0.16,
        ease: "none",
        stagger: 0.012
      })
        .to(".plan-label", { opacity: 1, duration: 0.06, stagger: 0.02 }, "-=0.02")
        .to(".plan-grid", { opacity: 1, duration: 0.05 }, "<")
        .to(".plan-layer", { opacity: 0, duration: 0.08, ease: "none" })
        .fromTo(
          ".wire-layer",
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.14, ease: "power2.out" },
          "-=0.02"
        )
        .to(
          ".wire-hint",
          { opacity: 1, duration: 0.05 },
          "<"
        )
        .to(".wire-layer", { opacity: 0, duration: 0.1, ease: "none" })
        .fromTo(
          ".villa-layer",
          { clipPath: "inset(0 0 100% 0)", filter: "grayscale(1)" },
          { clipPath: "inset(0 0 0% 0)", filter: "grayscale(0)", duration: 0.16, ease: "power2.inOut" },
          "-=0.03"
        )
        .fromTo(
          ".villa-caption",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" },
          "-=0.06"
        );
    }, sc);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative overflow-hidden bg-bg">
      <div className="flex h-screen flex-col">
        <div className="mx-auto flex w-full max-w-site flex-1 flex-col px-6 pt-28 lg:px-12">
          <div className="flex items-center justify-between">
            <p className="label-mono text-accent/80">04 — The Making of a Villa</p>
            <p className="label-mono hidden text-ink/40 sm:block">Keep scrolling</p>
          </div>

          <div ref={root} className="relative mt-10 flex flex-1 flex-col items-center justify-center pb-6">
            <div className="absolute inset-0 blueprint-grid opacity-40" />
            <div className="absolute inset-0 bg-rose-glow opacity-50" />

            <div className="plan-layer relative h-[min(58vh,520px)] w-full max-w-[720px] will-change-transform">
              <svg
                viewBox="0 0 400 300"
                fill="none"
                className="h-full w-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g stroke="#ffffff" strokeOpacity="0.045" strokeWidth="0.5" className="plan-grid opacity-0">
                  <path d="M24 62 H376 M24 100 H376 M24 138 H376 M24 176 H376 M24 214 H376 M24 252 H376" />
                  <path d="M80 24 V276 M136 24 V276 M192 24 V276 M248 24 V276 M304 24 V276 M360 24 V276" />
                </g>

                <g
                  stroke="#C7A27C"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  <path
                    d="M24 24 H376 V276 H24 Z"
                    data-plan-draw
                    style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                    pathLength={1}
                  />
                  <path
                    d="M140 24 V276"
                    data-plan-draw
                    style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                    pathLength={1}
                  />
                  <path
                    d="M140 150 H376"
                    data-plan-draw
                    style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                    pathLength={1}
                  />
                  <path
                    d="M300 150 V276"
                    data-plan-draw
                    style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                    pathLength={1}
                  />
                  <path
                    d="M140 196 A42 42 0 0 0 182 150"
                    data-plan-draw
                    style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                    pathLength={1}
                    strokeOpacity="0.7"
                  />
                  <path
                    d="M300 228 A32 32 0 0 0 332 196"
                    data-plan-draw
                    style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
                    pathLength={1}
                    strokeOpacity="0.7"
                  />
                  <path
                    d="M24 60 H376 M24 168 H376 M60 24 V276 M190 24 V276"
                    strokeOpacity="0.3"
                    strokeDasharray="5 7"
                    strokeWidth="0.8"
                  />
                </g>

                <g className="plan-label" opacity="0" fill="#8C8881" fontSize="9" letterSpacing="2">
                  <text x="34" y="46">LIVING · DOUBLE HEIGHT</text>
                  <text x="160" y="46">KITCHEN</text>
                  <text x="160" y="176">DINING</text>
                  <text x="316" y="176">STUDY</text>
                  <text x="34" y="258">FOYER</text>
                  <text x="36" y="290" fill="#C7A27C" opacity="0.8">GROUND FLOOR · SCALE 1:100</text>
                  <text x="390" y="16" textAnchor="end" fill="#C7A27C" opacity="0.8">N ↑</text>
                </g>
              </svg>
            </div>

            <div className="wire-layer absolute inset-0 flex items-center justify-center opacity-0 will-change-transform">
              <div className="relative h-[min(58vh,520px)] w-full max-w-[720px]">
                <WireScene />
              </div>
            </div>

            <div className="villa-layer absolute inset-0 flex items-center justify-center">
              <div className="relative h-[min(60vh,540px)] w-full max-w-[760px] overflow-hidden">
                <Image
                  src={IMAGES.heroVillaAlt}
                  alt="Completed luxury villa residence"
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40" />
                <div className="absolute inset-0 blueprint-grid opacity-30" />
                <div className="villa-caption absolute bottom-6 left-6 opacity-0">
                  <p className="label-mono text-accent">The Vault House — Marbella</p>
                  <p className="mt-2 font-display text-2xl text-ink">Completed, 2025</p>
                </div>
              </div>
            </div>

            <div className="wire-hint absolute bottom-2 font-mono text-[0.6rem] uppercase tracking-lux text-accent/60 opacity-0">
              Rotating wireframe — volumetric study
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-hairline py-5">
            {PHASES.map((p, i) => (
              <div key={p} className="flex items-center gap-3">
                <span
                  className={`flex h-2.5 w-2.5 items-center justify-center rounded-full border transition-all duration-700 ${
                    i === phase
                      ? "border-accent bg-accent shadow-[0_0_14px_rgba(199,162,124,0.7)]"
                      : i < phase
                        ? "border-accent/60 bg-accent/40"
                        : "border-white/20"
                  }`}
                />
                <span
                  className={`font-mono text-[0.58rem] uppercase tracking-wide3 transition-all duration-700 ${
                    i === phase ? "text-accent-light" : "text-ink/35"
                  }`}
                >
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
