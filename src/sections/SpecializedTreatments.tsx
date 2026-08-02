"use client";

import { useState, useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { specialtiesData } from "@/data/treatments";

export default function SpecializedTreatments() {
  const [activeSpecialtyId, setActiveSpecialtyId] = useState<string>("proctology");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Read from URL on mount for easy sharing
    const params = new URLSearchParams(window.location.search);
    const specialtyParam = params.get("specialty");
    if (specialtyParam && specialtiesData.some(s => s.id === specialtyParam)) {
      setActiveSpecialtyId(specialtyParam);
    }
  }, []);

  const handleSpecialtyChange = (id: string) => {
    setActiveSpecialtyId(id);
    const url = new URL(window.location.href);
    url.searchParams.set("specialty", id);
    window.history.replaceState({}, "", url.toString());
  };

  // Avoid hydration mismatch by not rendering the client-specific state on the server
  if (!isMounted) return null; 

  const activeSpecialty = specialtiesData.find(s => s.id === activeSpecialtyId) || specialtiesData[0];

  return (
    <section className="w-full py-12 relative z-10" id="specialized-treatments">
      <div className="text-center mb-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.2em] text-[#05f] uppercase mb-3"
        >
          Treatment Packages &amp; Pricing
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight mb-3"
        >
          Explore Treatments
          <span className="text-[#05f]"> &amp; Package Rates</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          className="text-[13px] text-slate-400 flex items-center justify-center gap-1.5 mt-1"
        >
          <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-amber-400" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="7"/>
            <line x1="8" y1="7" x2="8" y2="11"/>
            <circle cx="8" cy="5" r="0.5" fill="currentColor"/>
          </svg>
          Prices shown are indicative starting rates. Final pricing may vary by location &amp; complexity.
          <span className="font-semibold text-slate-500">T&amp;C Apply.</span>
        </motion.p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Sleek, Text-only Pill Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {specialtiesData.map((specialty) => {
            const isSelected = activeSpecialtyId === specialty.id;
            return (
              <button
                key={specialty.id}
                onClick={() => handleSpecialtyChange(specialty.id)}
                className={`px-6 py-3 rounded-full text-[15px] font-semibold transition-all duration-300 ${
                  isSelected 
                    ? "bg-[#05f] text-white shadow-md shadow-blue-500/30" 
                    : "bg-[#b9c3d7]/30 text-slate-700 hover:bg-[#b9c3d7]/50"
                }`}
              >
                {specialty.name}
              </button>
            );
          })}
        </div>

        {/* Treatment Cards Grid */}
        <div className="w-full min-h-[450px] relative">
          
          {/* Professional Fluid Background (Even Care Neo Colors) */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
            <motion.div
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -50, 100, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                x: [0, -100, 50, 0],
                y: [0, 100, -50, 0],
                scale: [1, 1.2, 0.8, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-teal-400/20 rounded-full blur-[150px]"
            />
            <motion.div
              animate={{
                x: [0, 50, -100, 0],
                y: [0, 50, -100, 0],
                scale: [1, 1.1, 0.9, 1],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-[10%] left-[30%] w-[550px] h-[550px] bg-purple-500/20 rounded-full blur-[130px]"
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpecialtyId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative z-10"
            >
              {activeSpecialty.treatments.map((treatment, idx) => (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="relative rounded-[28px] overflow-hidden flex flex-row min-h-[260px] cursor-pointer group border border-white/60 shadow-[0_4px_24px_0_rgba(100,150,255,0.08)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_60px_0_rgba(0,100,255,0.22)] hover:border-white/90"
                  style={{
                    background: "linear-gradient(110deg, #ffffff 0%, #ddeeff 55%, #b8d8ff 100%)",
                  }}
                >
                  {/* Glassmorphic colour-glow hover overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-[28px]"
                    style={{
                      background: "linear-gradient(120deg, rgba(255,255,255,0.55) 0%, rgba(180,220,255,0.35) 50%, rgba(100,180,255,0.25) 100%)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                  />
                  {/* Inner rim glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-[28px] shadow-[inset_0_0_40px_0_rgba(100,180,255,0.3)]" />

                  {/* LEFT: Text content */}
                  <div className="relative z-20 flex flex-col justify-between p-7 w-[55%] shrink-0">
                    <div>
                      <h3 className="text-[20px] md:text-[22px] font-bold text-slate-900 leading-snug mb-2 tracking-tight">
                        {treatment.name}
                      </h3>
                      <p className="text-[13px] text-slate-600 leading-relaxed">
                        {treatment.description}
                      </p>
                    </div>

                    {/* Bottom: Price pill + Know More */}
                    <div className="flex flex-col gap-3 mt-6">
                      <span className="inline-flex items-center gap-2 self-start bg-white/80 backdrop-blur-md border border-white shadow-sm text-slate-800 text-[13px] font-semibold px-4 py-1.5 rounded-full">
                        <span className="text-[#0055ff] font-bold">{treatment.price}</span>
                        <span className="text-slate-400 font-normal">Package Rate*</span>
                      </span>
                      <button className="self-start flex items-center gap-2 bg-[#0055ff] hover:bg-blue-700 text-white text-[13px] font-semibold px-5 py-2 rounded-full shadow-md shadow-blue-500/20 transition-all duration-300 group/btn">
                        Know More
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* RIGHT: Image bleeding to edge */}
                  <div className="absolute right-0 top-0 bottom-0 w-[48%] pointer-events-none overflow-hidden">
                    {/* Fade blend from card bg colour */}
                    <div className="absolute inset-y-0 left-0 w-[40%] z-10" style={{ background: "linear-gradient(to right, #ddeeff, transparent)" }} />
                    {treatment.image ? (
                      <img
                        src={treatment.image}
                        alt={treatment.name}
                        className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-28 h-28 rounded-full bg-white/50 border-2 border-blue-100/60 flex items-center justify-center">
                          <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 text-blue-200" stroke="currentColor" strokeWidth="1.5">
                            <rect x="6" y="10" width="36" height="28" rx="4"/>
                            <circle cx="24" cy="22" r="6"/>
                            <path d="M6 34l8-8 6 6 8-10 8 8"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
