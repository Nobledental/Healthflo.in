"use client";

import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

const insurers = [
  "Star Health",
  "HDFC Ergo",
  "ICICI Lombard",
  "Care Health",
  "Niva Bupa"
];

const packageHighlights = [
  "Surgeon, Anaesthetist & OT fees",
  "Hospital room & nursing charges",
  "All medicines & routine consumables",
  "Free post-op consultation & dressings",
  "Dedicated Care Coordinator support"
];

export default function PackageInclusions() {
  const { config } = useSiteConfig();
  return (
    <section className="w-full py-8 md:py-12 relative z-10" id="insurance-package">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Premium Blue Banner */}
        <div className="bg-[#05f] rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-16 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(5,100,255,0.4)]">
          
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#002bd9]/40 rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Content - Insurance Desk */}
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full text-white text-[11px] md:text-[12px] font-bold tracking-wider uppercase mb-4 md:mb-6 border border-white/20"
              >
                <ShieldCheck size={14} />
                HealthFlo Insurance Desk
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-light text-white tracking-tight leading-[1.1] mb-4 md:mb-6"
              >
                Insurance Support
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[14px] md:text-[16px] text-blue-100 leading-relaxed mb-6 md:mb-8"
              >
                Don&apos;t let cost or paperwork delay your care. Our dedicated in-house team handles all approvals so you can walk in and focus only on healing.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-3 mb-6 md:mb-10"
              >
                <button className="bg-white text-[#05f] px-6 md:px-8 py-3 md:py-3.5 rounded-full font-bold text-[14px] md:text-[15px] hover:bg-blue-50 transition-all duration-300">
                  Check Eligibility
                </button>
                <button className="flex items-center gap-2 bg-transparent text-white border border-white/30 px-5 md:px-6 py-3 md:py-3.5 rounded-full font-bold text-[14px] md:text-[15px] hover:bg-white/10 transition-colors duration-300">
                  No-Cost EMI <ArrowRight size={14} />
                </button>
              </motion.div>

              {/* Insurer Logos */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-2"
              >
                {insurers.map((insurer, idx) => (
                  <div key={idx} className="bg-white/10 px-2.5 py-1 md:px-3 md:py-1.5 rounded-md backdrop-blur-sm border border-white/10 text-white font-medium text-[12px] md:text-[13px]">
                    {insurer}
                  </div>
                ))}
                <div className="bg-white text-[#05f] px-2.5 py-1 md:px-3 md:py-1.5 rounded-md font-bold text-[12px] md:text-[13px] shadow-sm">
                  +25 More
                </div>
              </motion.div>
            </div>

            {/* Right Content - Package Inclusions */}
            <div className="flex flex-col gap-4 md:gap-5">
              
              {/* Approval Badge */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white p-4 md:p-5 rounded-[1.25rem] md:rounded-[20px] shadow-lg flex items-start gap-3 md:gap-4"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-[14px] md:text-[16px] font-bold text-slate-900 mb-0.5">30-Minute In-House Approval</h4>
                  <p className="text-slate-500 text-[12px] md:text-[13px] leading-snug">Express insurance processing by our dedicated coordinators — from first call to OT clearance.</p>
                </div>
              </motion.div>

              {/* Package Inclusions Checklist */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-[#0038ff] p-5 md:p-6 rounded-[1.25rem] md:rounded-[20px] border border-white/10"
              >
                <h5 className="text-white font-bold text-[14px] md:text-[16px] mb-3 md:mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" /> All-Inclusive Package
                </h5>
                <ul className="flex flex-col gap-2.5 md:gap-3">
                  {packageHighlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 md:gap-3">
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-white/80 shrink-0 mt-0.5" />
                      <span className="text-white/90 text-[13px] md:text-[14px] font-medium leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 md:mt-5 pt-3 md:pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
                  <p className="text-white/60 text-[11px] md:text-[12px] italic">
                    * No hidden bills. No surprise charges.
                  </p>
                  <a
                    href={`tel:+${config.helplineRaw}`}
                    className="inline-flex items-center justify-center gap-2 bg-white text-[#05f] text-[12px] md:text-[13px] font-bold px-5 md:px-6 py-2 md:py-2.5 rounded-full hover:bg-blue-50 transition-colors shadow-md shrink-0"
                  >
                    Check Eligibility <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </a>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
