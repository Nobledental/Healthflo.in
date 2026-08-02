import Navbar from "@/components/Navbar";
import ParticleCanvas from "@/components/ParticleCanvas";
import MobileStickyBar from "@/components/MobileStickyBar";
import Footer from "@/components/Footer";

// ── Landing Page Sections ──────────────────────────────────
import Hero from "@/sections/Hero";                           
import TrustHighlights from "@/sections/TrustHighlights";     
import SpecializedTreatments from "@/sections/SpecializedTreatments"; 
import PackageInclusions from "@/sections/PackageInclusions"; 

import HowItWorks from "@/sections/HowItWorks";               
import StatsBar from "@/sections/StatsBar";                   
import Testimonials from "@/sections/Testimonials";           
import WhyHealthflo from "@/sections/WhyHealthflo";           
import FAQ from "@/sections/FAQ";                             
import ActionGrid from "@/sections/ActionGrid";               
import LeadCapture from "@/sections/LeadCapture";             
import CTABanner from "@/sections/CTABanner";                 

export default function Home() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-8 pt-[120px] pb-24 relative z-10 flex flex-col gap-12">
        {/* ── Stage 1: Hook ─────────────────────────────────────── */}
        <div className="flex flex-col gap-4 mb-8">
          <Hero />
        </div>

        {/* ── Stage 2: Solutions ────────────────────────────────── */}
        <SpecializedTreatments />

        {/* ── Stage 3: Transparency & Cost ──────────────────────── */}
        <PackageInclusions />


        {/* ── Stage 4: Process ─────────────────────────────────── */}
        <HowItWorks />

        {/* ── Stage 5: Proof ───────────────────────────────────── */}
        <StatsBar />
        <Testimonials />
        <WhyHealthflo />
        <TrustHighlights />

        {/* ── Stage 6: Action ──────────────────────────────────── */}
        <div className="flex flex-col gap-16 mt-12">
          <ActionGrid />
          <LeadCapture />
          <FAQ />
        </div>

        {/* ── Final Conversion ─────────────────────────────────── */}
        <CTABanner />
      </main>

      <Footer />
      <MobileStickyBar />
    </>
  );
}
