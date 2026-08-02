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
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.2em] text-[#05f] uppercase mb-4"
        >
          Advanced Clinical Care
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight"
        >
          Find the care you need.<br/>
          <span className="font-medium text-slate-900">From doctors you can trust.</span>
        </motion.h3>
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
              className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full justify-center relative z-10"
            >
              {activeSpecialty.treatments.map((treatment) => (
                <div 
                  key={treatment.id}
                  className="bg-gradient-to-br from-[#e6f0fa]/70 to-[#d6e5ff]/70 backdrop-blur-xl border border-white/80 rounded-[24px] p-8 relative overflow-hidden group hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_30px_60px_-15px_rgba(5,100,255,0.25)] hover:border-white transition-all duration-500 min-h-[280px] flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
                >
                  {/* Left Content Area */}
                  <div className="relative z-10 w-[55%] md:w-[60%] flex flex-col h-full flex-1">
                    <h3 className="text-[20px] font-bold text-slate-900 leading-snug mb-3">
                      {treatment.name}
                    </h3>
                    <p className="text-[14px] text-slate-700 mb-8 leading-relaxed pr-2 font-medium">
                      {treatment.description}
                    </p>
                    
                    {/* Voka-style white pill badge at bottom */}
                    <div className="mt-auto">
                      <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/90 text-[#05f] text-[13px] font-bold shadow-sm backdrop-blur-md">
                        {treatment.benefits.length}+ Benefits
                      </span>
                    </div>
                  </div>

                  {/* Right Image Area (Placeholder) */}
                  <div className="absolute right-0 bottom-0 top-0 w-[45%] md:w-[40%] pointer-events-none overflow-hidden rounded-r-[24px]">
                    {/* Subtle glass effect for the placeholder */}
                    <div className="w-full h-full bg-gradient-to-l from-white/20 to-transparent group-hover:scale-105 transition-all duration-700 origin-right" />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
