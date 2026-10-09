import type { Metadata } from "next";
import BackgroundFX from "@/components/BackgroundFX";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import MouseSpotlight from "@/components/MouseSpotlight";
import Navbar from "@/components/Navbar";
import ProjectGrid from "@/components/ProjectGrid";
import SiteReady from "@/components/SiteReady";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Projects — UMMAKJ Architecture Studio",
  description:
    "The complete archive of UMMAKJ Architecture Studio — residences, pavilions and estates across five continents, each a study in light, material and time."
};

export default function ProjectsPage() {
  return (
    <div className="noise relative min-h-screen bg-bg text-ink">
      <SiteReady />
      <BackgroundFX />
      <MouseSpotlight />
      <CustomCursor />

      <Navbar />

      <main className="relative z-10">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 blueprint-grid opacity-40" />
          <div className="absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-rose-glow" />

          <div className="relative mx-auto max-w-site px-6 pb-10 pt-40 lg:px-12 lg:pt-48">
            <div className="flex items-center gap-6 border-b border-hairline pb-10">
              <SectionHeading
                index="01"
                label="The Archive"
                title="Every place we have made."
                subtitle="Residences, pavilions and estates — a record of the houses that hold their silence. Select a work to study it in full."
              />
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-site px-6 pb-28 pt-16 lg:px-12 lg:pb-40">
          <ProjectGrid />
        </section>
      </main>

      <Footer />
    </div>
  );
}
