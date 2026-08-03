"use client";

import { motion } from "framer-motion";
import { PhoneCall, ClipboardList, Stethoscope, ShieldCheck, HeartHandshake } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    title: "Free Consultation",
    desc: "Reach out via call, WhatsApp or walk-in. Our friendly care coordinators listen to your concern and guide you — at zero cost.",
  },
  {
    icon: ClipboardList,
    title: "Clinical Evaluation",
    desc: "Your symptoms are evaluated thoroughly — including any existing reports, imaging or investigations.",
  },
  {
    icon: Stethoscope,
    title: "Matched with Surgeon",
    desc: "Based on your diagnosis, we personally match you with the most experienced, board-certified specialist.",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Op Preparation",
    desc: "We handle your pre-op tests, insurance pre-authorization, and all paperwork. You only need to show up.",
  },
  {
    icon: HeartHandshake,
    title: "Post-Op & Recovery",
    desc: "Your care coordinator stays with you — scheduling follow-ups, answering questions, and ensuring smooth recovery.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] py-24 overflow-hidden bg-gradient-to-br from-[#e8f2ff] via-[#f4f9ff] to-[#ffffff]" id="how-it-works">
      {/* 
        Using a very wide max-width (1600px) and wide padding to utilize full page width 
        and ensure all 5 steps fit nicely in a single row without horizontal scrolling.
      */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 xl:px-12 w-full">
        
        {/* ── Top Row: Text & CTA ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative z-10">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold tracking-[0.2em] text-[#0055ff] uppercase mb-4"
            >
              Your Journey. Our Commitment.
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-[44px] font-bold text-slate-900 tracking-tight leading-[1.15] mb-5"
            >
              From First Call to <span className="text-[#0055ff]">Full Recovery</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[16px] text-slate-600 leading-relaxed"
            >
              We guide you through every step — with real humans, not bots — so you always feel safe, informed, and cared for.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="shrink-0"
          >
            <a
              href="tel:+919363650066"
              className="inline-flex items-center justify-center gap-2 bg-[#0055ff] text-white text-[15px] font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <PhoneCall className="w-4 h-4" />
              Call Free
            </a>
          </motion.div>
        </div>

        {/* ── Bottom Row: 5-Step Timeline ── */}
        <div className="relative w-full">
          
          {/* The Connector Line (Desktop only) */}
          <div className="absolute top-[20px] left-[10%] right-[10%] h-[2px] bg-[#0055ff]/20 z-0 hidden lg:block"></div>

          {/* 5-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 xl:gap-8 relative z-10 w-full">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  className="flex flex-col group relative"
                >
                  {/* Node */}
                  <div className="w-10 h-10 rounded-full bg-[#0055ff] text-white flex items-center justify-center border-[4px] border-[#f0f6ff] mb-5 shadow-sm mx-auto lg:mx-0 group-hover:scale-110 group-hover:bg-blue-700 transition-all duration-300">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Card */}
                  <div className="bg-white rounded-2xl p-5 xl:p-7 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.06)] border border-white group-hover:border-blue-100 group-hover:shadow-[0_16px_40px_-8px_rgba(0,85,255,0.12)] transition-all duration-300 h-full flex flex-col">
                    <span className="text-[10px] font-black tracking-widest text-[#0055ff] uppercase mb-3 block">
                      Step 0{idx + 1}
                    </span>
                    <h3 className="font-bold text-slate-900 text-[16px] xl:text-[18px] leading-snug mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[13px] xl:text-[14px] text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
        </div>

      </div>
    </section>
  );
}
