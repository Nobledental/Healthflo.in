import Navbar from "@/components/Navbar";
import ParticleCanvas from "@/components/ParticleCanvas";
import Hero from "@/components/Hero";
import ActionGrid from "@/components/ActionGrid";
import WhyHealthflo from "@/components/WhyHealthflo";
import SpecializedTreatments from "@/components/SpecializedTreatments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ParticleCanvas />
      <Navbar />
      
      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 pt-[120px] pb-24 relative z-10 flex flex-col gap-24">
        <Hero />
        <ActionGrid />
        <SpecializedTreatments />
        <WhyHealthflo />
      </main>

      <Footer />
    </>
  );
}
