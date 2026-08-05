"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { specialtiesData } from "@/data/treatments";
import GlowCard from "@/components/GlowCard";
import { haptic } from "@/utils/haptics";

export default function SpecializedTreatments() {
  const [activeSpecialtyId, setActiveSpecialtyId] = useState<string>("proctology");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const params = new URLSearchParams(window.location.search);
    const specialtyParam = params.get("specialty");
    if (specialtyParam && specialtiesData.some(s => s.id === specialtyParam)) {
      setActiveSpecialtyId(specialtyParam);
    }
  }, []);

  const handleSpecialtyChange = (id: string) => {
    haptic.light(); // Trigger tactile mobile haptic feedback on tab switch!
    setActiveSpecialtyId(id);
    const url = new URL(window.location.href);
    url.searchParams.set("specialty", id);
    window.history.replaceState({}, "", url.toString());
  };

  if (!isMounted) return null; 

  const activeSpecialty = specialtiesData.find(s => s.id === activeSpecialtyId) || specialtiesData[0];

  return (
    <section className="w-full pt-6 pb-16 relative z-10" id="specialized-treatments">
      <div className="text-center mb-6 md:mb-10 px-3">
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-md border border-blue-200 text-[#0066FF] text-[11px] font-extrabold tracking-wide uppercase mb-3 shadow-[0_4px_15px_rgba(0,102,255,0.12)]"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Clinical Excellence & Daycare Care</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-light text-slate-800 tracking-tight leading-[1.15] flex flex-wrap items-center justify-center gap-2 md:gap-3"
        >
          <span>Medical</span>
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0055ff] via-[#0088ff] to-[#00A88F] drop-shadow-sm">
            Services
          </span>
        </motion.h2>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center px-3 md:px-6 relative">
        
        {/* RADIANT ASTER BLUE & MEDICAL TEAL BACKGROUND BEHIND THE GLASSMORPHIC CARDS */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[90%] md:w-[700px] h-[80%] bg-gradient-to-tr from-[#0055ff]/40 via-[#0088ff]/30 to-[#00A88F]/40 rounded-[80px] blur-[50px] md:blur-[110px] opacity-90 transition-all duration-700" />
          <div className="absolute top-[35%] left-0 w-[280px] h-[280px] bg-[#0066FF]/45 rounded-full blur-[65px]" />
          <div className="absolute bottom-[20%] right-0 w-[300px] h-[300px] bg-[#00A88F]/45 rounded-full blur-[70px]" />
        </div>

        {/* Sleek Glassmorphic Tab Bar with Haptic Tactile Tap */}
        <div className="w-full max-w-2xl mb-8 md:mb-14">
          <div className="flex items-center justify-between sm:justify-center p-1.5 bg-white/50 backdrop-blur-2xl rounded-2xl sm:rounded-full border border-white/80 shadow-[0_8px_30px_rgba(0,168,143,0.18)] gap-1">
            {specialtiesData.map((specialty) => {
              const isSelected = activeSpecialtyId === specialty.id;
              return (
                <button
                  key={specialty.id}
                  onClick={() => handleSpecialtyChange(specialty.id)}
                  className={`flex-1 sm:flex-initial relative px-2.5 sm:px-7 py-2.5 rounded-xl sm:rounded-full text-[12px] sm:text-[15px] font-extrabold transition-all duration-300 text-center active:scale-95 ${
                    isSelected 
                      ? "text-white shadow-[0_4px_15px_rgba(0,102,255,0.35)]" 
                      : "text-slate-700 hover:text-slate-950 hover:bg-white/60"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeTreatmentTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#0066FF] to-[#0050DD] rounded-xl sm:rounded-full"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10 truncate block max-w-full">{specialty.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Treatment Cards Area with Cursor-Tracking Glow and Haptics */}
        <div className="w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSpecialtyId}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="w-full relative z-10"
            >
              {/* MOBILE: Authentic Patient App Glassmorphic Glow Tiles (< 768px) */}
              <div className="flex flex-col gap-4 md:hidden">
                {activeSpecialty.treatments.map((treatment, idx) => (
                  <motion.div
                    key={`mobile-${treatment.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <GlowCard
                      href={`/specialities/${treatment.id}`}
                      hapticMode="medium"
                      className="flex items-center justify-between gap-3.5 p-4 sm:p-5 rounded-[28px] bg-white/55 hover:bg-white/75 backdrop-blur-2xl border border-white/80 hover:border-white shadow-[0_12px_38px_rgba(0,102,255,0.18)] hover:shadow-[0_15px_45px_rgba(0,168,143,0.25)] active:scale-[0.97] transition-all duration-300"
                    >
                      {/* Top glass sheen highlight */}
                      <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-white/45 to-transparent pointer-events-none z-0" />

                      {/* Left content column */}
                      <div className="flex-1 min-w-0 flex flex-col z-10">
                        <div className="flex flex-wrap items-center gap-1.5 mb-2">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 border border-blue-100/80 shadow-2xs text-[10px] font-black uppercase tracking-wider text-[#0055ff]">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Daycare Laser
                          </span>
                          <span className="text-[11px] font-extrabold text-blue-950/80">
                            • 30m Proc.
                          </span>
                        </div>

                        <h3 className="text-[17px] font-black text-slate-900 leading-tight truncate group-hover:text-[#0055ff] transition-colors mb-1">
                          {treatment.name}
                        </h3>
                        
                        <p className="text-[13px] text-slate-700 font-medium line-clamp-2 leading-relaxed mb-3.5">
                          {treatment.description}
                        </p>

                        <div className="inline-flex items-center w-max gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0066FF] text-white text-[11px] sm:text-[12px] font-extrabold shadow-[0_4px_14px_rgba(0,102,255,0.35)] group-hover:bg-blue-700 transition-all">
                          <span>Consult Specialist</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Right side compact app thumbnail in dual glass frame */}
                      <div className="w-[94px] h-[94px] sm:w-[110px] sm:h-[110px] rounded-[22px] overflow-hidden shrink-0 bg-white/70 backdrop-blur-md border-2 border-white p-1 shadow-[0_6px_22px_rgba(0,70,200,0.22)] relative z-10 flex items-center justify-center">
                        <div className="w-full h-full rounded-[16px] overflow-hidden relative bg-blue-50/60">
                          {treatment.image ? (
                            <img
                              src={treatment.image}
                              alt={treatment.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-blue-500">
                              <Zap className="w-6 h-6 animate-pulse" />
                            </div>
                          )}
                          <div className="absolute bottom-1 right-1 bg-slate-950/85 backdrop-blur-xs px-1.5 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-wider shadow-2xs">
                            USFDA
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>

              {/* DESKTOP: Glassmorphic Glow Cards Grid (>= 768px) */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {activeSpecialty.treatments.map((treatment, idx) => (
                  <motion.div
                    key={`desktop-${treatment.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <GlowCard
                      href={`/specialities/${treatment.id}`}
                      hapticMode="medium"
                      className="rounded-[32px] flex flex-col min-h-[460px] cursor-pointer bg-white/50 hover:bg-white/70 backdrop-blur-2xl border border-white/80 hover:border-white transition-all duration-500 shadow-[0_15px_45px_rgba(0,102,255,0.16)] hover:shadow-[0_20px_50px_rgba(0,168,143,0.28)]"
                    >
                      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
                      
                      <div className="relative z-20 flex flex-col p-8 pb-0">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-3 py-1 rounded-full bg-white/90 border border-blue-100 shadow-2xs text-[#0066FF]">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#00A88F]" /> USFDA Approved
                          </span>
                          <span className="text-[12px] font-extrabold text-blue-950/70">Zero Pain</span>
                        </div>

                        <h3 className="text-[23px] font-black text-slate-900 leading-snug mb-3 tracking-tight group-hover:text-[#0055ff] transition-colors">
                          {treatment.name}
                        </h3>
                        <p className="text-[14px] text-slate-700 font-medium leading-relaxed mb-6">
                          {treatment.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1.5 bg-[#0066FF] text-white text-[13px] font-bold px-5 py-2.5 rounded-full shadow-[0_6px_20px_rgba(0,102,255,0.35)] hover:bg-blue-700 transition-colors group/btn">
                            <span>Know More</span>
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>

                      <div className="relative flex-1 w-full mt-8 min-h-[230px] overflow-hidden p-3 pt-0">
                        <div className="w-full h-full rounded-2xl overflow-hidden relative border border-white/60 shadow-inner">
                          {treatment.image ? (
                            <img
                              src={treatment.image}
                              alt={treatment.name}
                              className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                              loading="lazy"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-blue-50/60">
                              <Zap className="w-12 h-12 text-blue-400" />
                            </div>
                          )}
                        </div>
                      </div>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Master Directory Action */}
        <div className="mt-12 text-center z-20">
          <Link
            href="/specialities"
            onClick={() => haptic.medium()}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#0066FF] hover:bg-[#00A88F] text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_10px_35px_rgba(0,102,255,0.35)] hover:shadow-[0_12px_40px_rgba(0,168,143,0.4)] transition-all transform hover:scale-105 active:scale-95"
          >
            <span>Explore All 15+ Laser Specialities & Treatments</span>
            <ArrowRight className="w-5 h-5 text-[#99F6E4]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
