"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "./Magnetic";

type MagneticButtonProps = {
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "outline";
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  dataCursor?: string;
};

export default function MagneticButton({
  children,
  variant = "outline",
  className = "",
  href,
  onClick,
  dataCursor
}: MagneticButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const idRef = useRef(0);

  const spawnRipple = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++idRef.current;
    setRipples((r) => [...r, { x, y, id }]);
    setTimeout(() => setRipples((r) => r.filter((r) => r.id !== id)), 700);
    onClick?.(e);
  };

  const base =
    "group relative inline-flex items-center justify-center gap-3 overflow-hidden px-8 py-4 text-[0.72rem] uppercase tracking-lux transition-all duration-500 select-none";

  const styles =
    variant === "solid"
      ? "bg-rose-metal text-[#0B0B0B] font-semibold shadow-glow hover:shadow-[0_0_40px_-5px_rgba(199,162,124,0.45)]"
      : variant === "ghost"
        ? "text-ink/80 hover:text-accent-light"
        : "gradient-border text-ink/90 hover:text-accent-light hover:border-accent/30";

  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-3">{children}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 z-0 scale-0 rounded-full bg-accent/10 opacity-0 blur-2xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100"
      />
      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25"
            style={{ left: r.x, top: r.y }}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 14, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>
    </>
  );

  const cls = `${base} ${styles} ${className}`;

  if (href) {
    return (
      <Magnetic>
        <a href={href} className={cls} onClick={spawnRipple} data-cursor={dataCursor}>
          {inner}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <button className={cls} onClick={spawnRipple} data-cursor={dataCursor} type="button">
        {inner}
      </button>
    </Magnetic>
  );
}
