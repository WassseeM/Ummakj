"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/site";
import Reveal from "./ui/Reveal";
import Tilt from "./ui/Tilt";

function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext
}: {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const idx = PROJECTS.findIndex((p) => p.id === project.id);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[105] flex flex-col bg-bg"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      exit={{ clipPath: "inset(0 0 100% 0)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="blueprint-grid absolute inset-0 opacity-30" />

      <div className="relative z-10 flex items-center justify-between px-6 py-6 lg:px-12">
        <p className="label-mono text-accent/80">
          Project {String(idx + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </p>
        <button
          onClick={onClose}
          aria-label="Close project"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-hairline transition-colors duration-300 hover:border-accent/60"
        >
          <X className="h-5 w-5 text-ink/80 transition-colors group-hover:text-accent-light" />
        </button>
      </div>

      <div className="relative z-10 flex flex-1 flex-col gap-8 overflow-y-auto px-6 pb-16 lg:grid lg:grid-cols-12 lg:items-center lg:gap-0 lg:overflow-hidden lg:px-12">
        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 lg:pr-16"
        >
          <div className="relative aspect-[16/11] overflow-hidden shadow-luxe">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          key={`${project.id}-text`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6 lg:col-span-5"
        >
          <div>
            <p className="label-mono text-accent/70">{project.type}</p>
            <h2 className="section-title mt-4 text-5xl text-ink sm:text-6xl">{project.title}</h2>
          </div>

          <div className="flex flex-wrap gap-8 border-y border-hairline py-5">
            {[
              ["Location", project.location],
              ["Year", project.year],
              ["Area", project.area]
            ].map(([k, v]) => (
              <div key={k}>
                <p className="label-mono text-ink/35">{k}</p>
                <p className="mt-2 font-mono text-sm text-ink/85">{v}</p>
              </div>
            ))}
          </div>

          <p className="max-w-md leading-relaxed text-ink-muted">{project.description}</p>

          <div className="flex items-center gap-4 pt-2">
            <a
              href="/#contact"
              className="under-link font-mono text-[0.62rem] uppercase tracking-lux text-accent-light"
            >
              Enquire about this project
            </a>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 hidden items-center justify-between border-t border-hairline px-12 py-5 lg:flex">
        <button
          onClick={onPrev}
          className="group flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-lux text-ink/50 transition-colors hover:text-accent-light"
        >
          <ChevronLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
          Previous
        </button>
        <span className="font-mono text-[0.6rem] uppercase tracking-lux text-ink/30">
          {project.location}
        </span>
        <button
          onClick={onNext}
          className="group flex items-center gap-3 font-mono text-[0.6rem] uppercase tracking-lux text-ink/50 transition-colors hover:text-accent-light"
        >
          Next
          <ChevronRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

export default function ProjectGrid() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const found = PROJECTS.find((p) => p.id === id);
    if (found) setActive(found);
  }, []);

  const step = (dir: 1 | -1) => {
    if (!active) return;
    const idx = PROJECTS.findIndex((p) => p.id === active.id);
    const next = PROJECTS[(idx + dir + PROJECTS.length) % PROJECTS.length];
    setActive(next);
  };

  return (
    <>
      <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
        {PROJECTS.map((p, i) => (
          <Reveal
            key={p.id}
            effect={i % 3 === 0 ? "slide-up" : i % 3 === 1 ? "fade" : "rotate"}
            delay={0.08 * (i % 3)}
            className="mb-8 break-inside-avoid"
          >
            <button
              onClick={() => setActive(p)}
              data-cursor="view"
              className="group relative block w-full overflow-hidden text-left"
              aria-label={`Open ${p.title}`}
            >
              <Tilt max={5} scale={1.03} glare={false}>
                <div
                  className={`relative overflow-hidden ${p.tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover transition-transform duration-[1.4s] ease-lux group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/25 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-90" />
                  <div className="absolute inset-0 blueprint-grid opacity-0 transition-opacity duration-700 group-hover:opacity-40" />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                    <div className="translate-y-4 transition-transform duration-700 ease-lux group-hover:translate-y-0">
                      <p className="label-mono text-accent/80">{p.location}</p>
                      <h3 className="section-title mt-2 text-3xl text-ink">{p.title}</h3>
                      <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-wide3 text-ink/50">
                        {p.type} — {p.year}
                      </p>
                    </div>
                    <span className="flex h-12 w-12 shrink-0 translate-y-4 items-center justify-center rounded-full border border-accent/50 bg-bg/40 opacity-0 backdrop-blur-sm transition-all duration-700 ease-lux group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-5 w-5 text-accent-light transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Tilt>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal
            project={active}
            onClose={() => setActive(null)}
            onPrev={() => step(-1)}
            onNext={() => step(1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
