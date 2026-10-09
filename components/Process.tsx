"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PROCESS } from "@/lib/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function Process() {
  const spine = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (spine.current) {
        gsap.fromTo(
          spine.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: spine.current,
              start: "top 75%",
              end: "bottom 65%",
              scrub: 0.6
            }
          }
        );
      }
    }, spine);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative overflow-hidden border-y border-hairline bg-bg-soft">
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      <div className="absolute -left-48 bottom-0 h-[520px] w-[520px] rounded-full bg-rose-glow" />

      <div className="relative mx-auto max-w-site px-6 py-28 lg:px-12 lg:py-40">
        <SectionHeading
          index="05"
          label="The Method"
          title="From line to landmark."
          subtitle="Six movements, one continuous hand. Every commission follows the same disciplined arc — never rushed, never repeated."
          align="center"
        />

        <div className="relative mt-24 max-w-3xl mx-auto">
          <div className="absolute left-[13px] top-0 h-full w-px bg-white/10 sm:left-1/2" />
          <div
            ref={spine}
            className="absolute left-[13px] top-0 h-full w-px bg-rose-metal shadow-[0_0_12px_rgba(199,162,124,0.5)] sm:left-1/2"
            style={{ transformOrigin: "top center" }}
          />

          <div className="space-y-16">
            {PROCESS.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <Reveal key={step.id} effect={left ? "slide-left" : "slide-right"}>
                  <div className={`relative flex sm:items-center ${left ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    <span className="absolute left-0 top-1 flex h-[27px] w-[27px] items-center justify-center sm:left-1/2 sm:-translate-x-1/2">
                      <span className="h-full w-full rotate-45 border border-accent bg-bg" />
                      <span className="absolute h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>

                    <div
                      className={`glass-soft gradient-border ml-12 w-full p-8 sm:ml-0 sm:w-[calc(50%-3.5rem)] ${
                        left ? "" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-4xl text-accent/50">{step.no}</span>
                        <span className="label-mono text-accent/70">{step.title}</span>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-ink-muted">{step.text}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
