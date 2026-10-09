"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone, Send } from "lucide-react";
import { IMAGES, SITE } from "@/lib/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import MagneticButton from "./ui/MagneticButton";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-hairline">
      <div className="absolute inset-0 blueprint-grid opacity-30" />

      <div className="relative mx-auto max-w-site px-6 py-28 lg:px-12 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              index="07"
              label="Begin"
              title="Let us build something that outlives you."
              subtitle="Commissions are limited to six per year. Tell us about your site, your light and your ambition — we will reply within two working days."
            />

            <div className="mt-12 space-y-6">
              {[
                { icon: MapPin, label: "Studio", value: SITE.address },
                { icon: Mail, label: "Enquiries", value: SITE.email },
                { icon: Phone, label: "Telephone", value: SITE.phone }
              ].map((row, i) => (
                <Reveal key={row.label} effect="slide-up" delay={0.08 * i}>
                  <a
                    href={row.icon === Mail ? `mailto:${row.value}` : row.icon === Phone ? `tel:${row.value.replace(/[^+\d]/g, "")}` : "#contact"}
                    className="group flex items-center gap-6"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/40 transition-all duration-500 group-hover:border-accent/80 group-hover:bg-accent/10">
                      <row.icon className="h-5 w-5 text-accent-light" />
                    </span>
                    <span>
                      <span className="label-mono block text-ink/35">{row.label}</span>
                      <span className="mt-1 block text-sm text-ink/85 transition-colors duration-300 group-hover:text-accent-light">
                        {row.value}
                      </span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <div className="relative mt-12 aspect-[16/9] overflow-hidden gradient-border">
              <Image
                src={IMAGES.office}
                alt="UMMAKJ atelier interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                className="object-cover transition-transform duration-[1.6s] ease-lux hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
              <p className="absolute bottom-5 left-6 label-mono text-accent">The Atelier — Mayfair, London</p>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <Reveal effect="fade" delay={0.1}>
              <form onSubmit={onSubmit} className="glass gradient-border relative p-8 lg:p-10">
                <p className="label-mono mb-8 text-accent/80">Commission Enquiry</p>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="label-mono mb-3 block text-[0.55rem] text-ink/45">
                      Full Name
                    </label>
                    <input id="name" required className="field" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="label-mono mb-3 block text-[0.55rem] text-ink/45">
                      Email
                    </label>
                    <input id="email" type="email" required className="field" placeholder="you@estate.com" />
                  </div>
                </div>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="type" className="label-mono mb-3 block text-[0.55rem] text-ink/45">
                      Project Type
                    </label>
                    <select id="type" className="field appearance-none" defaultValue="Private Residence">
                      {["Private Residence", "Interior Design", "Landscape", "Urban Planning", "Master Planning"].map((o) => (
                        <option key={o} value={o} className="bg-bg">
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="site" className="label-mono mb-3 block text-[0.55rem] text-ink/45">
                      Location
                    </label>
                    <input id="site" className="field" placeholder="Country / city" />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="msg" className="label-mono mb-3 block text-[0.55rem] text-ink/45">
                    Brief
                  </label>
                  <textarea
                    id="msg"
                    rows={5}
                    className="field resize-none"
                    placeholder="The site, the light, the dream…"
                  />
                </div>

                <div className="mt-8 flex items-center justify-between gap-6">
                  <p className="label-mono text-ink/30">Reply within 48h</p>
                  <MagneticButton variant="solid" dataCursor="send">
                    {sent ? "Received" : "Send Enquiry"}
                    {sent ? "— Thank you" : <Send className="h-4 w-4" />}
                  </MagneticButton>
                </div>
              </form>
            </Reveal>

            <Reveal effect="fade" delay={0.2}>
              <div className="relative h-64 overflow-hidden gradient-border">
                <iframe
                  title="UMMAKJ Studio — Mayfair, London"
                  src="https://www.google.com/maps?q=Savile+Row,+Mayfair,+London&output=embed"
                  className="h-full w-full border-0 opacity-70 grayscale-[0.5] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
                <a
                  href="#contact"
                  className="glass group absolute bottom-4 left-4 flex items-center gap-3 px-4 py-3"
                >
                  <MapPin className="h-4 w-4 text-accent" />
                  <span className="font-mono text-[0.6rem] uppercase tracking-wide3 text-ink/80">
                    Mayfair, London
                  </span>
                  <ArrowUpRight className="h-3 w-3 text-accent/0 transition-all duration-500 group-hover:text-accent" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
