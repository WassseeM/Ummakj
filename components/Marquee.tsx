"use client";

const WORDS = ["Architecture", "Interiors", "Landscape", "Urban Planning", "Master Planning"];

export default function Marquee() {
  const row = (reverse = false) => (
    <div className={`flex shrink-0 items-center ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
      {Array.from({ length: 4 }).map((_, n) => (
        <div key={n} className="flex shrink-0 items-center">
          {WORDS.map((w) => (
            <span key={w} className="flex shrink-0 items-center">
              <span className="font-display text-3xl italic tracking-wide text-ink/40 transition-colors duration-500 hover:text-accent-light sm:text-5xl lg:text-6xl">
                {w}
              </span>
              <span className="mx-8 h-2 w-2 rotate-45 border border-accent/50" />
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-hairline bg-bg-soft py-10 sm:py-14">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg-soft to-transparent" />
      <div className="marquee-track">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
