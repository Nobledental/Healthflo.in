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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full relative z-10"
            >
              {activeSpecialty.treatments.map((treatment, idx) => (
                <motion.div
                  key={treatment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="relative rounded-3xl overflow-hidden flex flex-col min-h-[480px] cursor-pointer group bg-[#f3f7fc] hover:bg-[#eef4fb] border border-[#e4ecf7] hover:border-blue-200 transition-all duration-500 hover:shadow-[0_20px_40px_-10px_rgba(0,85,255,0.1)]"
                >
                  {/* TOP: Text content */}
                  <div className="relative z-20 flex flex-col p-8 pb-0">
                    <h3 className="text-[22px] font-bold text-slate-900 leading-snug mb-3 tracking-tight group-hover:text-[#0055ff] transition-colors">
                      {treatment.name}
                    </h3>
                    <p className="text-[14px] text-slate-500 leading-relaxed mb-6">
                      {treatment.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 bg-white border border-[#e4ecf7] shadow-sm text-slate-800 text-[13px] font-semibold px-4 py-1.5 rounded-full">
                        <span className="text-[#0055ff] font-bold">{treatment.price}</span>
                      </span>
                      <button className="flex items-center gap-1.5 bg-[#0055ff] text-white text-[13px] font-semibold px-4 py-1.5 rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors group/btn">
                        Know More
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>

                  {/* BOTTOM: Image blending to edges */}
                  <div className="relative flex-1 w-full mt-10 min-h-[220px] overflow-hidden">
                    {/* Top fade gradient to blend image into the solid background */}
                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#f3f7fc] group-hover:from-[#eef4fb] to-transparent z-10 transition-colors duration-500" />
                    
                    {treatment.image ? (
                      <img
                        src={treatment.image}
                        alt={treatment.name}
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-50/50">
                        <div className="w-24 h-24 rounded-full bg-white/80 border-2 border-blue-100/60 flex items-center justify-center">
                          <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10 text-blue-200" stroke="currentColor" strokeWidth="1.5">
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
