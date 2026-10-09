"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import Magnetic from "./ui/Magnetic";
import MagneticButton from "./ui/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onReady = () => setVisible(true);
    window.addEventListener("ummakj:ready", onReady);
    return () => window.removeEventListener("ummakj:ready", onReady);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={visible ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        className={`fixed left-0 top-0 z-[80] w-full transition-all duration-700 ${
          scrolled ? "glass border-b border-hairline py-4" : "border-b border-transparent py-7"
        }`}
      >
        <div className="mx-auto flex max-w-site items-center justify-between px-6 lg:px-12">
          <a href="/" className="group flex items-center gap-3" aria-label="UMMAKJ home">
            <span className="font-display text-lg tracking-[0.34em] text-ink transition-colors duration-500 group-hover:text-accent-light">
              UMMAKJ
            </span>
            <span className="hidden h-px w-8 bg-accent/40 transition-all duration-500 group-hover:w-14 md:block" />
            <span className="label-mono hidden text-[0.55rem] text-ink/40 lg:block">Studio</span>
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="under-link font-mono text-[0.68rem] uppercase tracking-wide3 text-ink/70 transition-colors duration-300 hover:text-accent-light"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Magnetic className="hidden sm:block">
              <a
                href="/#contact"
                className="gradient-border group flex items-center gap-2 px-5 py-2.5 font-mono text-[0.62rem] uppercase tracking-lux text-ink/85 transition-colors duration-300 hover:text-accent-light"
              >
                Consult
                <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="group flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-hairline transition-colors duration-300 hover:border-accent/50"
            >
              <span className="h-px w-5 bg-ink/80 transition-all duration-500 group-hover:w-6 group-hover:bg-accent-light" />
              <span className="h-px w-5 bg-ink/80 transition-all duration-500 group-hover:w-4 group-hover:bg-accent-light" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col bg-bg/95 backdrop-blur-xl"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="blueprint-grid absolute inset-0 opacity-40" />
            <div className="flex items-center justify-between px-6 py-7 lg:px-12">
              <span className="font-display text-lg tracking-[0.34em] text-ink">UMMAKJ</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-hairline transition-colors duration-300 hover:border-accent/50"
              >
                <span className="absolute h-px w-5 rotate-45 bg-ink/80 transition-colors group-hover:bg-accent-light" />
                <span className="absolute h-px w-5 -rotate-45 bg-ink/80 transition-colors group-hover:bg-accent-light" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-8 lg:px-24">
              {[...NAV, { label: "Home", href: "/" }].map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center gap-6 overflow-hidden border-b border-hairline py-4 lg:py-5"
                >
                  <span className="font-mono text-xs text-accent/60">0{i + 1}</span>
                  <span className="font-display text-4xl tracking-wide text-ink transition-all duration-500 group-hover:translate-x-3 group-hover:text-accent-light sm:text-6xl">
                    {item.label}
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-accent/0 transition-all duration-500 group-hover:text-accent" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap items-end justify-between gap-4 px-8 pb-10 lg:px-24"
            >
              <p className="label-mono text-accent/70">{SITE.tagline}</p>
              <p className="font-mono text-xs text-ink/40">{SITE.address}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
