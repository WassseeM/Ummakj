"use client";

import Reveal from "./Reveal";
import SplitText from "./SplitText";

type SectionHeadingProps = {
  index?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  index,
  label,
  title,
  subtitle,
  align = "left",
  className = ""
}: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-6 ${align === "center" ? "items-center text-center" : "items-start"} ${className}`}
    >
      {label && (
        <Reveal effect="fade" delay={0.1}>
          <p className="label-mono flex items-center gap-4 text-accent/80">
            {index && <span className="text-ink/40">{index}</span>}
            {index && <span className="h-px w-10 bg-accent/40" />}
            {label}
          </p>
        </Reveal>
      )}
      {title && (
        <h2 className="section-title max-w-4xl text-4xl text-ink sm:text-5xl lg:text-6xl">
          <SplitText text={title} from="bottom" />
        </h2>
      )}
      {subtitle && (
        <Reveal effect="fade" delay={0.25}>
          <p className="max-w-xl text-sm leading-relaxed text-ink-muted">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
