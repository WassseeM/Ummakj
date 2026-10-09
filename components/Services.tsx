"use client";

import { Building2, Sofa, TreePine, Landmark, Monitor, Compass, ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/lib/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Tilt from "./ui/Tilt";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  building: Building2,
  sofa: Sofa,
  tree: TreePine,
  city: Landmark,
  monitor: Monitor,
  compass: Compass
};

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden border-y border-hairline bg-bg-soft">
      <div className="absolute inset-0 blueprint-grid opacity-30" />
      <div className="absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-rose-glow" />

      <div className="relative mx-auto max-w-site px-6 py-28 lg:px-12 lg:py-40">
        <SectionHeading
          index="02"
          label="What We Do"
          title="One hand across the entire estate."
          subtitle="Architecture is not a building — it is everything the hand touches, from the master plan to the last brass fitting."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Building2;
            return (
              <Reveal key={s.id} effect="slide-up" delay={0.06 * i}>
                <Tilt max={6} scale={1.02}>
                  <div
                    className="gradient-border group relative flex h-full flex-col gap-6 overflow-hidden bg-bg/60 p-8 backdrop-blur-sm transition-all duration-700 hover:bg-bg/20 lg:p-10"
                    data-cursor="view"
                  >
                    <div className="absolute inset-0 bg-rose-glow opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                    <div className="flex items-start justify-between">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/5 transition-all duration-700 group-hover:rotate-6 group-hover:scale-110 group-hover:border-accent/70 group-hover:shadow-[0_0_24px_rgba(199,162,124,0.35)]">
                        <Icon className="h-6 w-6 text-accent-light transition-transform duration-700 group-hover:-translate-y-0.5" />
                      </span>
                      <span className="font-mono text-xs text-ink/25 transition-colors duration-500 group-hover:text-accent/60">
                        0{i + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="section-title text-3xl text-ink transition-colors duration-500 group-hover:text-accent-light">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink-muted">{s.blurb}</p>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-hairline pt-5">
                      <span className="label-mono text-accent/0 transition-colors duration-500 group-hover:text-accent/70">
                        Explore
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-accent/0 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                    </div>
                  </div>
                </Tilt>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
