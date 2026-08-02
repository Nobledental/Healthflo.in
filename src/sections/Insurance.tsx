"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Clock, ArrowRight } from "lucide-react";

const insurers = [
  "Star Health",
  "HDFC Ergo",
  "ICICI Lombard",
  "Care Health",
  "Niva Bupa"
];

export default function Insurance() {
  return (
    <section className="w-full py-12 relative z-10" id="insurance">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Massive Premium Blue Banner */}
        <div className="bg-[#05f] rounded-[3rem] p-10 md:p-16 lg:p-20 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(5,100,255,0.4)]">
          
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#002bd9]/40 rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-bold tracking-wide uppercase mb-6 border border-white/20"
              >
                <ShieldCheck size={16} />
                HealthFlo Insurance Desk
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-6"
              >
                Insurance Support
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-lg text-blue-100 leading-relaxed mb-10 max-w-lg"
              >
                Don't let cost or paperwork delay your care. Our dedicated in-house insurance coordinators handle all approvals — TATA AIG, Star Health, HDFC Ergo — so you walk in and focus only on healing.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <button className="bg-white text-[#05f] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  Check Eligibility
                </button>
                <button className="flex items-center gap-2 bg-transparent text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors duration-300">
                  No-Cost EMI Plans <ArrowRight size={18} />
                </button>
              </motion.div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col gap-6">
              
              {/* Approval Badge */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white p-6 rounded-[24px] shadow-lg flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-1">30-Minute In-House Approval</h4>
                  <p className="text-slate-600 text-sm">Express insurance processing by our dedicated coordinators — from first call to OT clearance.</p>
                </div>
              </motion.div>

              {/* Logos Grid */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-[#0038ff] p-8 rounded-[24px] border border-white/10"
              >
                <h5 className="text-white font-semibold mb-6">Accepted at All HealthFlo Surgical Centers</h5>
                <div className="flex flex-wrap gap-3">
                  {insurers.map((insurer, idx) => (
                    <div key={idx} className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm border border-white/10 text-white font-medium text-sm">
                      {insurer}
                    </div>
                  ))}
                  <div className="bg-white text-[#05f] px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
                    +50 More
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
