"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export default function WhyHealthflo() {
  return (
    <section className="w-full py-16 relative z-10">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold tracking-[0.2em] text-blue-500 uppercase mb-4"
        >
          The HealthFlo Standard
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight"
        >
          We didn&apos;t just improve healthcare.<br/>
          <span className="font-medium text-slate-900">We reimagined it.</span>
        </motion.h3>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch justify-center bg-slate-50/50 rounded-[2rem] overflow-hidden shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)] border border-slate-100 backdrop-blur-xl"
      >
        
        {/* Traditional Path (Left) */}
        <div className="flex-1 p-8 md:p-12 relative">
          <h4 className="text-xl font-medium text-slate-500 mb-10 pl-2">Traditional care</h4>
          
          <div className="space-y-10 relative">
            {/* Connecting line */}
            <div className="absolute left-[15px] top-6 bottom-6 w-px bg-slate-200" />
            
            <div className="relative pl-12">
              <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Surgeon Selection</h5>
              <p className="text-slate-600 font-medium">You guess based on online reviews</p>
            </div>
            
            <div className="relative pl-12">
              <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Insurance & Paperwork</h5>
              <p className="text-slate-600 font-medium">You manage the endless admin</p>
            </div>
            
            <div className="relative pl-12">
              <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                <X className="w-4 h-4" strokeWidth={2.5} />
              </div>
              <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Recovery & Support</h5>
              <p className="text-slate-600 font-medium">Once discharged, you&apos;re on your own</p>
            </div>
          </div>
        </div>

        {/* HealthFlo Path (Right) - Even Hospitals Bold Theme */}
        <div className="flex-1 p-8 md:p-12 bg-[#05f] text-white rounded-[2rem] shadow-2xl m-2 relative overflow-hidden">
          {/* Subtle glow in background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <h4 className="text-2xl font-bold text-white mb-10 flex items-center gap-3 relative z-10 pl-1">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#05f] shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 12 5 5L20 7" />
              </svg>
            </div>
            HealthFlo
          </h4>
          
          <div className="space-y-10 relative z-10">
            {/* Connecting line */}
            <div className="absolute left-[15px] top-6 bottom-6 w-px bg-blue-500/50" />

            <div className="relative pl-12">
              <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-md">
                 <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <h5 className="text-[11px] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Surgeon Selection</h5>
              <p className="text-white font-semibold text-lg">150+ Board-Certified Specialists</p>
            </div>
            
            <div className="relative pl-12">
              <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-md">
                 <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <h5 className="text-[11px] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Insurance & Paperwork</h5>
              <p className="text-white font-semibold text-lg">Transparent Guidance & End-to-End Support</p>
            </div>
            
            <div className="relative pl-12">
              <div className="absolute left-0 top-0.5 w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-white shadow-md">
                 <Check className="w-4 h-4" strokeWidth={3} />
              </div>
              <h5 className="text-[11px] font-bold text-blue-200 uppercase tracking-widest mb-1.5">Recovery & Support</h5>
              <p className="text-white font-semibold text-lg">Faster Recovery & Same-Day Discharge*</p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
