import Navbar from "@/components/Navbar";
import ParticleCanvas from "@/components/ParticleCanvas";
import MobileStickyBar from "@/components/MobileStickyBar";
import Footer from "@/components/Footer";

// ── Landing Page Sections ──────────────────────────────────
import Hero from "@/sections/Hero";                           
import SpecializedTreatments from "@/sections/SpecializedTreatments"; 
import PackageInclusions from "@/sections/PackageInclusions"; 

import HowItWorks from "@/sections/HowItWorks";               
import Testimonials from "@/sections/Testimonials";           
import WhyHealthflo from "@/sections/WhyHealthflo";           
import FAQ from "@/sections/FAQ";                             
import ActionGrid from "@/sections/ActionGrid";               
import LeadCapture from "@/sections/LeadCapture";                 

export default function Home() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-[80px] md:pt-[120px] pb-20 md:pb-24 relative z-10 flex flex-col gap-4">
        {/* ── Stage 1: Hook ─────────────────────────────────────── */}
        <div className="flex flex-col mb-4">
          <Hero />
        </div>

        {/* ── Stage 2: Solutions ────────────────────────────────── */}
        <SpecializedTreatments />

        {/* ── Stage 3: Process ─────────────────────────────────── */}
        <HowItWorks />

        {/* ── Stage 4: Transparency & Cost ──────────────────────── */}
        <PackageInclusions />

        {/* ── Stage 5: Proof ───────────────────────────────────── */}
        <Testimonials />
        <WhyHealthflo />

        {/* ── Stage 6: Action ──────────────────────────────────── */}
        <div className="flex flex-col gap-8 mt-8">
          <ActionGrid />
          <LeadCapture />
          <FAQ />
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </>
  );
}
