"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site";
import SectionHeading from "./ui/SectionHeading";

export default function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const go = (d: number) => {
    setState(([i]) => [(i + d + TESTIMONIALS.length) % TESTIMONIALS.length, d]);
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 6500);
    return () => clearInterval(t);
  }, [paused, index]);

  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="relative mx-auto max-w-site px-6 py-28 lg:px-12 lg:py-40">
      <SectionHeading
        index="06"
        label="Voices"
        title="What our clients say."
        align="center"
      />

      <div
        className="relative mx-auto mt-16 max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute inset-0 -m-10 bg-rose-glow opacity-60" />

        <div className="glass gradient-border relative overflow-hidden p-10 lg:p-16">
          <Quote className="absolute right-8 top-8 h-16 w-16 text-accent/10" />

          <AnimatePresence mode="wait" custom={dir}>
            <motion.figure
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 80 : -80, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: dir >= 0 ? -80 : 80, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <blockquote className="font-display text-2xl italic leading-relaxed text-ink lg:text-[2rem]">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/50 bg-accent/10">
                  <span className="font-display text-lg text-accent-light">
                    {t.author.charAt(0)}
                  </span>
                </span>
                <div>
                  <p className="text-sm text-ink">{t.author}</p>
                  <p className="label-mono mt-1 text-ink/40">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setState([i, i > index ? 1 : -1])}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-px transition-all duration-500 ${
                  i === index ? "w-10 bg-accent" : "w-5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-all duration-300 hover:border-accent/60 hover:text-accent-light"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline transition-all duration-300 hover:border-accent/60 hover:text-accent-light"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
