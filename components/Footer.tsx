"use client";

import { Instagram, Linkedin, Youtube, Facebook, ArrowUp } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import Logo from "./Logo";
import Magnetic from "./ui/Magnetic";

const SOCIALS = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Facebook, label: "Facebook", href: "#" }
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-bg-soft">
      <div className="absolute inset-0 blueprint-grid opacity-20" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-rose-metal opacity-40" />

      <div className="relative mx-auto max-w-site px-6 pt-24 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="max-w-[300px]">
              <Logo animated={false} showWordmark={false} />
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-muted">
              Architecture, interiors and landscape composed as a single hand — from the first
              line on paper to the final bronze detail.
            </p>
            <div className="mt-8 flex items-center gap-3">
              {SOCIALS.map((s) => (
                <Magnetic key={s.label} strength={0.5}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="group flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-all duration-500 hover:border-accent/70 hover:shadow-[0_0_20px_rgba(199,162,124,0.35)]"
                  >
                    <s.icon className="h-4 w-4 text-ink/60 transition-all duration-500 group-hover:text-accent-light" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <p className="label-mono text-accent/60">Studio</p>
            <ul className="mt-6 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="group flex items-center gap-3 text-sm text-ink/70 transition-colors duration-300 hover:text-accent-light"
                  >
                    <span className="h-px w-0 bg-accent/60 transition-all duration-500 group-hover:w-6" />
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="label-mono text-accent/60">Atelier</p>
            <address className="mt-6 space-y-3 text-sm not-italic text-ink/70">
              <p>{SITE.address}</p>
              <p className="font-mono text-xs text-ink/40">51.5112° N — 0.1399° W</p>
              <p>
                <a href={`mailto:${SITE.email}`} className="under-link text-accent-light">
                  {SITE.email}
                </a>
              </p>
              <p>
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`} className="under-link">
                  {SITE.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="pointer-events-none select-none overflow-hidden py-14">
          <p className="whitespace-nowrap text-center font-display text-[clamp(3.4rem,13vw,12rem)] leading-none tracking-[0.08em] text-transparent [-webkit-text-stroke:1px_rgba(199,162,124,0.28)]">
            UMMAKJ
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-hairline py-8 sm:flex-row">
          <p className="font-mono text-[0.6rem] uppercase tracking-wide3 text-ink/35">
            © MMXXVI {SITE.name}. All rights reserved.
          </p>
          <p className="label-mono text-accent/50">Crafted by hand — not by template</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-hairline transition-all duration-500 hover:border-accent/70 hover:shadow-[0_0_20px_rgba(199,162,124,0.35)]"
          >
            <ArrowUp className="h-4 w-4 text-ink/60 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-accent-light" />
          </button>
        </div>
      </div>
    </footer>
  );
}
