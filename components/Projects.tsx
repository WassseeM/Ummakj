"use client";

import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-site px-6 py-28 lg:px-12 lg:py-40">
      <div className="mb-16 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
        <SectionHeading
          index="01"
          label="Selected Works"
          title="Houses that hold their silence."
          subtitle="A curated selection of recent residences, pavilions and estates — each a study in light, material and time."
        />
        <Reveal effect="fade" delay={0.3}>
          <a
            href="/projects"
            className="under-link font-mono text-[0.62rem] uppercase tracking-lux text-accent-light"
          >
            View all 120 projects
          </a>
        </Reveal>
      </div>

      <div className="border-t border-hairline">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} effect="slide-up" delay={0.04 * (i % 4)}>
            <a
              href={`/projects#${p.id}`}
              className="group flex items-center gap-5 border-b border-hairline py-6 transition-all duration-500 hover:bg-white/[0.02] lg:gap-8 lg:py-7"
            >
              <span className="w-8 shrink-0 font-mono text-xs text-accent/50 transition-colors duration-500 group-hover:text-accent">
                0{i + 1}
              </span>
              <h3 className="shrink-0 font-display text-2xl leading-tight text-ink transition-all duration-500 group-hover:translate-x-3 group-hover:text-accent-light sm:text-3xl lg:text-4xl">
                {p.title}
              </h3>
              <span className="hidden font-mono text-[0.6rem] uppercase tracking-wide3 text-ink/45 lg:block">
                {p.location}
              </span>
              <span className="ml-auto hidden font-mono text-[0.6rem] uppercase tracking-wide3 text-ink/35 md:block">
                {p.type} — {p.year}
              </span>
              <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline transition-all duration-500 group-hover:border-accent/60 group-hover:text-accent-light sm:flex">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
