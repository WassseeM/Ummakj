"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { IMAGES, STATS, TIMELINE } from "@/lib/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import CountUp from "./ui/CountUp";
import SplitText from "./ui/SplitText";

export default function About() {
  const lineRef = useRef<HTMLDivElement>(null);
  const imgWrap = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.6
            }
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".timeline-node").forEach((node) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(2.2)",
            scrollTrigger: { trigger: node, start: "top 75%", once: true }
          }
        );
      });

      if (imgWrap.current) {
        gsap.to(imgWrap.current, {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: imgWrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    }, imgWrap);
    return () => ctx.revert();
  }, []);

  return (
    <section id="studio" className="relative mx-auto max-w-site px-6 py-28 lg:px-12 lg:py-40">
      <SectionHeading
        index="03"
        label="The Studio"
        title="Sixteen years of patient craft."
        subtitle="UMMAKJ is a practice of seventy hands, one signature and an uncompromising belief that architecture is a gift to time."
      />

      <div className="mt-20 grid gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="relative">
          <div className="relative aspect-[3/4] overflow-hidden gradient-border">
            <div ref={imgWrap} className="relative h-[118%] w-full will-change-transform">
              <Image
                src={IMAGES.founder}
                alt="UMMAKJ founding principal"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
          </div>

          <Reveal effect="slide-up" delay={0.2}>
            <div className="glass absolute -bottom-10 left-6 right-6 p-6 lg:-left-6 lg:right-auto lg:w-80">
              <p className="font-display text-2xl italic leading-snug text-ink">
                “We do not design for a season. We design for the moment a house finally belongs
                to its place.”
              </p>
              <p className="label-mono mt-4 text-accent/80">U. Karim — Founding Principal</p>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center gap-10">
          <Reveal effect="slide-right">
            <div className="border-l border-accent/40 pl-6">
              <h3 className="section-title text-3xl text-ink">Vision</h3>
              <p className="mt-4 max-w-md leading-relaxed text-ink-muted">
                To build places that outlive fashion — architecture whose value is measured in
                generations, not square metres.
              </p>
            </div>
          </Reveal>

          <Reveal effect="slide-right" delay={0.12}>
            <div className="border-l border-accent/40 pl-6">
              <h3 className="section-title text-3xl text-ink">Mission</h3>
              <p className="mt-4 max-w-md leading-relaxed text-ink-muted">
                A single, obsessive hand across architecture, interiors and landscape. Every
                project begins on paper, is proven in our own workshop, and is finished on site
                by our own hands.
              </p>
            </div>
          </Reveal>

          <Reveal effect="slide-right" delay={0.24}>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-hairline bg-hairline">
              {STATS.map((s) => (
                <div key={s.label} className="group bg-bg-soft p-8 transition-colors duration-500 hover:bg-bg">
                  <p className="font-display text-5xl text-ink lg:text-6xl">
                    <CountUp value={s.value} suffix={s.suffix} className="text-rose" />
                  </p>
                  <p className="label-mono mt-4 text-ink/45">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-32 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label-mono text-accent/80">Milestones</p>
          <h3 className="section-title mt-4 text-4xl text-ink">
            <SplitText text="The road to here." />
          </h3>
        </div>

        <div className="relative lg:col-span-8">
          <div className="absolute left-[5px] top-2 h-[calc(100%-2rem)] w-px bg-white/10" />
          <div
            ref={lineRef}
            className="absolute left-[5px] top-2 h-[calc(100%-2rem)] w-px bg-rose-metal"
            style={{ transformOrigin: "top center" }}
          />
          <div className="space-y-14">
            {TIMELINE.map((t, i) => (
              <Reveal key={t.year} effect="slide-up" delay={0.05 * i}>
                <div className="relative pl-12">
                  <span className="timeline-node absolute left-0 top-2 flex h-[11px] w-[11px] -translate-x-1/2 items-center justify-center rounded-full border border-accent bg-bg">
                    <span className="h-[3px] w-[3px] rounded-full bg-accent" />
                  </span>
                  <p className="font-display text-3xl text-accent">{t.year}</p>
                  <h4 className="mt-2 text-lg text-ink">{t.title}</h4>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
