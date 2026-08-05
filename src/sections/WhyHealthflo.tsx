"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyHealthflo() {
  return (
    <section className="w-full py-10 md:py-16 relative z-10">
      <div className="text-center mb-8 md:mb-16 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase mb-3"
        >
          The HealthFlo Standard
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-2xl sm:text-3xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight"
        >
          We didn&apos;t just improve healthcare.<br className="hidden sm:block" />
          <span className="font-medium text-slate-900"> We built a surgical institution.</span>
        </motion.h3>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-5xl mx-auto px-4 md:px-8"
      >
        {/* Mobile: stacked cards | Desktop: side-by-side */}
        <div className="flex flex-col md:flex-row items-stretch justify-center bg-slate-50/50 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] border border-slate-100 backdrop-blur-xl">
          
          {/* Traditional Path */}
          <div className="flex-1 p-6 md:p-8 lg:p-12 relative">
            <h4 className="text-base md:text-xl font-medium text-slate-500 mb-6 md:mb-10 pl-2">Traditional care</h4>
            
            <div className="space-y-6 md:space-y-10 relative">
              {/* Connecting line */}
              <div className="absolute left-[15px] top-6 bottom-6 w-px bg-slate-200" />
              
              {[
                { label: "Surgeon Selection", text: "You guess based on online reviews" },
                { label: "Insurance & Paperwork", text: "You manage the endless admin" },
                { label: "Recovery & Support", text: "Once discharged, you're on your own" },
              ].map((item, i) => (
                <div key={i} className="relative pl-10 md:pl-12">
                  <div className="absolute left-0 top-0.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                    <X className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={2.5} />
                  </div>
                  <h5 className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</h5>
                  <p className="text-[13px] md:text-base text-slate-600 font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* HealthFlo Path */}
          <div className="flex-1 p-6 md:p-8 lg:p-12 bg-[#05f] text-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl m-2 relative overflow-hidden">
            {/* Glows combining Existing Blue & Aster Teal */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#00A88F] rounded-full blur-3xl opacity-25 translate-y-1/3 -translate-x-1/4 pointer-events-none" />
            
            <h4 className="text-lg md:text-2xl font-bold text-white mb-6 md:mb-10 flex items-center gap-3 relative z-10 pl-1">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-[#05f] shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 md:w-4 md:h-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 5 5L20 7" />
                </svg>
              </div>
              HealthFlo
            </h4>
            
            <div className="space-y-6 md:space-y-10 relative z-10">
              {/* Connecting line */}
              <div className="absolute left-[15px] top-6 bottom-6 w-px bg-blue-500/50" />

              {[
                { label: "Surgeon Selection", text: "150+ Board-Certified Surgical Specialists" },
                { label: "Insurance & Paperwork", text: "Dedicated In-House Care Coordinators handle everything" },
                { label: "Recovery & Support", text: "Express Discharge & Free At-Home Follow-Up" },
              ].map((item, i) => (
                <div key={i} className="relative pl-10 md:pl-12">
                  <div className="absolute left-0 top-0.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00A88F] flex items-center justify-center text-white shadow-md">
                    <Check className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
                  </div>
                  <h5 className="text-[10px] md:text-[11px] font-bold text-blue-200 uppercase tracking-widest mb-1">{item.label}</h5>
                  <p className="text-white font-semibold text-[14px] md:text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
