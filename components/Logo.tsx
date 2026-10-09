"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type LogoProps = {
  className?: string;
  animated?: boolean;
  delay?: number;
  onComplete?: () => void;
  showWordmark?: boolean;
  wordmarkClassName?: string;
};

function Emblem({ animated, strokeWidth = 1.6 }: { animated: boolean; strokeWidth?: number }) {
  const dash = animated ? { strokeDasharray: 1, strokeDashoffset: 1 } : {};

  return (
    <svg
      viewBox="0 0 240 232"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      role="img"
      aria-label="UMMAKJ Architecture Studio emblem"
    >
      <defs>
        <linearGradient id="roseG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EBD0AC" />
          <stop offset="0.34" stopColor="#C7A27C" />
          <stop offset="0.62" stopColor="#7E5C3A" />
          <stop offset="1" stopColor="#E4C296" />
        </linearGradient>
        <linearGradient id="roseGSoft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9CCA5" stopOpacity="0.5" />
          <stop offset="1" stopColor="#C7A27C" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <g stroke="#ffffff" strokeOpacity="0.055" strokeWidth="0.5">
        <path d="M70 56 H170 M70 76 H170 M70 96 H170 M70 116 H170 M70 136 H170 M70 156 H170 M70 176 H170 M70 196 H170" />
        <path d="M80 56 V196 M100 56 V196 M120 56 V196 M140 56 V196 M160 56 V196" />
      </g>

      <g stroke="url(#roseG)" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 68 L120 22 L190 68" data-draw {...dash} />
        <path d="M46 68 H194" data-draw {...dash} strokeOpacity="0.6" />
        <path d="M66 188 V66" data-draw {...dash} />
        <path d="M174 188 V66" data-draw {...dash} />
        <path d="M66 66 H174" data-draw {...dash} />
        <path d="M66 188 H174" data-draw {...dash} />
        <path d="M96 188 V158 A24 24 0 0 1 144 158 V188" data-draw {...dash} />
        <path d="M66 108 H174 M66 150 H174" data-draw {...dash} strokeOpacity="0.55" />
        <path d="M120 37 V55 M111 46 H129" data-draw {...dash} strokeOpacity="0.8" />
        <rect x="74" y="80" width="16" height="14" data-draw {...dash} />
        <rect x="74" y="120" width="16" height="14" data-draw {...dash} />
        <rect x="74" y="160" width="16" height="14" data-draw {...dash} />
        <rect x="150" y="80" width="16" height="14" data-draw {...dash} />
        <rect x="150" y="120" width="16" height="14" data-draw {...dash} />
        <rect x="150" y="160" width="16" height="14" data-draw {...dash} />
      </g>

      <g stroke="#C7A27C" strokeOpacity="0.4" strokeWidth="1" strokeLinecap="round">
        <path d="M48 190 H192" data-draw {...dash} />
        <path d="M62 194 v5 M82 194 v5 M102 194 v5 M122 194 v5 M142 194 v5 M162 194 v5 M182 194 v5" data-draw {...dash} />
        <path d="M120 62 V188 M66 126 H174" strokeDasharray="4 6" strokeOpacity="0.2" />
      </g>

      <g stroke="url(#roseG)" strokeWidth="1">
        <circle cx="120" cy="46" r="9" data-draw {...dash} />
        <circle cx="214" cy="44" r="15" data-draw {...dash} />
        <path d="M214 29 V59 M199 44 H229 M205 36 L223 52 M205 52 L223 36" data-draw {...dash} strokeOpacity="0.7" />
        <path d="M50 10 H190 M50 4 V16 M190 4 V16" data-draw {...dash} strokeOpacity="0.5" />
        <path d="M36 66 V188 M30 66 H42 M30 188 H42" data-draw {...dash} strokeOpacity="0.5" />
      </g>

      <g fill="url(#roseG)">
        <circle cx="66" cy="66" r="2.6" />
        <circle cx="174" cy="66" r="2.6" />
        <circle cx="66" cy="188" r="2.6" />
        <circle cx="174" cy="188" r="2.6" />
      </g>

      <g
        data-logo-fill
        opacity="0"
        fill="url(#roseGSoft)"
        stroke="none"
        className="transition-opacity duration-700"
      >
        <polygon points="50,68 120,22 190,68 46,68" />
        <polygon points="66,66 174,66 174,188 66,188" opacity="0.6" />
      </g>

      <g
        className="font-mono"
        fill="#8C8881"
        fontSize="8.5"
        letterSpacing="1.5"
      >
        <text x="14" y="212">ELEVATION 01 · MAIN FACADE</text>
        <text x="14" y="226">SCALE 1:100 — REV. A</text>
        <text x="214" y="27" textAnchor="middle" fill="#C7A27C">N</text>
        <text x="120" y="212" textAnchor="middle" fill="#C7A27C" opacity="0.8">18.00 m</text>
      </g>
    </svg>
  );
}

export default function Logo({
  className = "",
  animated = false,
  delay = 0,
  onComplete,
  showWordmark = true,
  wordmarkClassName = ""
}: LogoProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!animated || !ref.current) return;

    const root = ref.current;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay,
        onComplete: () => onComplete?.()
      });

      tl.to("[data-draw]", {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        stagger: { each: 0.09, from: "start" }
      })
        .to("[data-logo-fill]", { opacity: 1, duration: 1, ease: "power2.out" }, "-=0.7")
        .fromTo(
          root.querySelector(".logo-fade"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        );
    }, ref);

    return () => ctx.revert();
  }, [animated, delay, onComplete]);

  return (
    <div ref={ref} className={className}>
      <Emblem animated={animated} />
      {showWordmark && (
        <div className={`logo-fade text-center ${wordmarkClassName}`}>
          <p className="font-display text-[clamp(1.6rem,4vw,2.6rem)] tracking-[0.32em] text-ink">
            UMMAKJ
          </p>
          <p className="label-mono mt-1 text-[0.58rem] text-accent/70">Architecture Studio</p>
        </div>
      )}
    </div>
  );
}
