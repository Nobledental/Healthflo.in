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
    <section className="w-full py-8 md:py-12 relative z-10" id="insurance">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        <div className="bg-[#05f] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-20 relative overflow-hidden shadow-[0_30px_60px_-15px_rgba(5,100,255,0.4)]">
          
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/10 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-[#002bd9]/40 rounded-full blur-[80px] transform -translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1.5 md:px-4 md:py-2 rounded-full text-white text-[11px] md:text-sm font-bold tracking-wide uppercase mb-4 md:mb-6 border border-white/20"
              >
                <ShieldCheck size={14} />
                HealthFlo Insurance Desk
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight mb-4 md:mb-6"
              >
                100% Cashless & Easy EMI Support
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-[14px] md:text-lg text-blue-100 leading-relaxed mb-6 md:mb-10 max-w-lg"
              >
                Don&apos;t let money or hospital paperwork delay your healing. Our friendly team handles all health insurance forms directly with Star Health, HDFC Ergo, ICICI, and 50+ providers—so you can get treated with zero out-of-pocket stress.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-3 md:gap-4"
              >
                <button className="bg-white text-[#05f] px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-[14px] md:text-lg hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  Check My Insurance
                </button>
                <button className="flex items-center gap-2 bg-transparent text-white border border-white/30 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-[14px] md:text-lg hover:bg-white/10 transition-colors duration-300">
                  No-Cost Easy EMI <ArrowRight size={16} />
                </button>
              </motion.div>
            </div>

            {/* Right Content */}
            <div className="flex flex-col gap-4 md:gap-6">
              
              {/* Approval Badge */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white p-4 md:p-6 rounded-[20px] md:rounded-[24px] shadow-lg flex items-start gap-3 md:gap-4"
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-[15px] md:text-xl font-bold text-slate-900 mb-0.5 md:mb-1">Priority Insurance Verification</h4>
                  <p className="text-slate-600 text-[12px] md:text-sm leading-snug">We coordinate your policy verification in advance before your hospital arrival—ensuring seamless admission without paperwork headaches.</p>
                </div>
              </motion.div>

              {/* Insurers Grid */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="bg-[#0038ff] p-5 md:p-8 rounded-[20px] md:rounded-[24px] border border-white/10"
              >
                <h5 className="text-white font-semibold mb-4 md:mb-6 text-[14px] md:text-base">Accepted at All Our Empanelled Hospital Centers</h5>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {insurers.map((insurer, idx) => (
                    <div key={idx} className="bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg backdrop-blur-sm border border-white/10 text-white font-medium text-[12px] md:text-sm">
                      {insurer}
                    </div>
                  ))}
                  <div className="bg-white text-[#05f] px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-[12px] md:text-sm shadow-sm">
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
