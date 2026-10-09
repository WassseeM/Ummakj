"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type SplitTextProps = {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  from?: "bottom" | "blur";
  once?: boolean;
};

export default function SplitText({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
  stagger = 0.028,
  duration = 1.2,
  from = "bottom",
  once = true
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = el.querySelectorAll<HTMLElement>(".st-char");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once
        }
      });

      if (from === "blur") {
        tl.fromTo(
          chars,
          { opacity: 0, filter: "blur(14px)", y: 30 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: duration * 0.8,
            ease: "power3.out",
            stagger
          }
        );
      } else {
        tl.fromTo(
          chars,
          { yPercent: 130, rotate: 6 },
          {
            yPercent: 0,
            rotate: 0,
            duration,
            ease: "power4.out",
            stagger
          }
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [delay, stagger, duration, from, once]);

  const words = text.split(" ");

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="st-word" aria-hidden="true">
          {word.split("").map((char, j) => (
            <span key={j} className="st-char">
              {char}
            </span>
          ))}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
