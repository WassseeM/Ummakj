"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { IMAGES, SITE } from "@/lib/site";
import MagneticButton from "./ui/MagneticButton";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const readyRef = useRef(false);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-bg", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(".hero-shade", {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }, el);

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(".hero-bg", { x: x * -26, y: y * -14, duration: 1.2, ease: "power2.out" });
      gsap.to(".hero-content", { x: x * 12, y: y * 7, duration: 1.2, ease: "power2.out" });
      gsap.to(".hero-float-a", { x: x * 46, y: y * 30, duration: 1.6, ease: "power2.out" });
      gsap.to(".hero-float-b", { x: x * -34, y: y * -24, duration: 1.6, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(".hero-bg", { x: 0, y: 0, duration: 1.4, ease: "power3.out" });
      gsap.to(".hero-content", { x: 0, y: 0, duration: 1.4, ease: "power3.out" });
      gsap.to(".hero-float-a", { x: 0, y: 0, duration: 1.8, ease: "power3.out" });
      gsap.to(".hero-float-b", { x: 0, y: 0, duration: 1.8, ease: "power3.out" });
    };

    if (window.matchMedia("(pointer: fine)").matches) {
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
    }

    const onReady = () => {
      if (readyRef.current) return;
      readyRef.current = true;

      const tl = gsap.timeline({ delay: 0.15 });

      tl.fromTo(
        ".hero-bg",
        { scale: 1.18 },
        { scale: 1, duration: 2.4, ease: "power3.out" }
      )
        .fromTo(
          ".hero-char",
          { yPercent: 120, rotate: 5 },
          { yPercent: 0, rotate: 0, duration: 1.3, ease: "power4.out", stagger: 0.03 },
          "-=1.6"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" },
          "-=0.7"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 },
          "-=0.5"
        )
        .fromTo(
          ".hero-meta",
          { opacity: 0 },
          { opacity: 1, duration: 0.9, ease: "power2.out" },
          "-=0.4"
        );
    };

    window.addEventListener("ummakj:ready", onReady);
    return () => {
      ctx.revert();
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("ummakj:ready", onReady);
    };
  }, []);

  const line = (text: string, cls: string) => (
    <span className={`block overflow-hidden ${cls}`} aria-hidden="true">
      {text.split("").map((c, i) => (
        <span key={i} className="hero-char inline-block will-change-transform">
          {c}
        </span>
      ))}
    </span>
  );

  return (
    <section ref={root} id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div className="hero-bg absolute inset-0 will-change-transform">
        <Image
          src={IMAGES.heroVilla}
          alt="UMMAKJ signature villa at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="hero-shade absolute inset-0 bg-gradient-to-b from-bg/80 via-bg/20 to-bg opacity-0" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-bg/60" />
      <div className="absolute inset-0 blueprint-grid opacity-50" />
      <div className="absolute inset-0 vignette" />

      <svg
        className="hero-float-a absolute right-[8%] top-[22%] h-40 w-40 text-accent/30 lg:h-56 lg:w-56"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <path d="M30 170 V40 H170 V170" stroke="currentColor" strokeWidth="0.75" />
        <path d="M60 150 V80 H140 V150" stroke="currentColor" strokeWidth="0.75" />
        <path d="M40 40 L100 12 L160 40" stroke="currentColor" strokeWidth="0.75" />
        <path d="M60 110 H140 M60 130 H140" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.6" />
      </svg>
      <svg
        className="hero-float-b bottom-[18%] left-[6%] hidden h-32 w-32 text-accent/20 lg:block"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <path d="M40 170 V60 H160 V170" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="100" cy="40" r="22" stroke="currentColor" strokeWidth="0.75" />
        <path d="M100 18 V62 M78 40 H122" stroke="currentColor" strokeWidth="0.5" />
      </svg>

      <div className="hero-content relative z-10 mx-auto flex w-full max-w-site flex-1 flex-col justify-center px-6 pb-28 pt-40 lg:px-12">
        <p className="hero-meta label-mono mb-8 flex items-center gap-4 text-accent/80 opacity-0">
          <span className="h-px w-14 bg-accent/50" />
          {SITE.tagline}
        </p>

        <h1 className="section-title text-[clamp(2.6rem,8.5vw,7.5rem)] leading-[0.98] tracking-tight text-ink">
          {line("Creating", "text-[0.62em] font-display italic tracking-wide3 text-accent-light")}
          {line("Architecture", "")}
          {line("Beyond Time.", "text-rose")}
        </h1>

        <p className="hero-sub mt-10 max-w-xl text-sm leading-relaxed text-ink/70 opacity-0 lg:text-base">
          Designing Timeless Spaces. Architecture, interiors and landscape composed as a single
          hand — from the first line on paper to the final bronze detail.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-8">
          <div className="hero-cta opacity-0">
            <MagneticButton href="/projects" variant="solid" dataCursor="view">
              Explore Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </MagneticButton>
          </div>
          <div className="hero-cta opacity-0">
            <MagneticButton href="/#contact" variant="ghost">
              Book Consultation
              <span className="h-px w-10 bg-accent/60" />
            </MagneticButton>
          </div>
        </div>
      </div>

      <div className="hero-meta relative z-10 mx-auto flex w-full max-w-site items-end justify-between px-6 pb-10 opacity-0 lg:px-12">
        <a
          href="#projects"
          className="group flex flex-col items-center gap-3 font-mono text-[0.6rem] uppercase tracking-lux text-ink/50 transition-colors hover:text-accent-light"
        >
          Scroll
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
        <div className="hidden flex-col items-end gap-1 text-right font-mono text-[0.6rem] uppercase tracking-widest text-ink/35 md:flex">
          <span>51.5112° N — 0.1399° W</span>
          <span>EST. MMIX · London</span>
        </div>
      </div>
    </section>
  );
}
