"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import BackgroundFX from "@/components/BackgroundFX";
import CustomCursor from "@/components/CustomCursor";
import MouseSpotlight from "@/components/MouseSpotlight";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import BlueprintTransform from "@/components/BlueprintTransform";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="noise relative min-h-screen bg-bg text-ink">
      <SmoothScroll />
      <BackgroundFX />
      <MouseSpotlight />
      <CustomCursor />

      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <BlueprintTransform />
        <Projects />
        <Services />
        <About />
        <Process />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
