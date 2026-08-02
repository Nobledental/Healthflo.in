"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, HeartPulse, Users, PlayCircle, CheckCircle2, ChevronRight, Check } from "lucide-react";

type JourneyStage = "pre-surgery" | "during-surgery" | "recovery";

export default function PatientJourney() {
  const [activeStage, setActiveStage] = useState<JourneyStage>("pre-surgery");

  const stages = {
    "pre-surgery": {
      title: "Pre-Surgery",
      videoPlaceholder: "Pre-Surgery Consultation & Planning",
      highlights: [
        { title: "Expert Consultation", desc: "Consult with top specialists with cashless & EMI support.", badge: "Cashless & EMI" },
        { title: "Pre-Surgery Preparation", desc: "Personalized diet plans and medical checks before the procedure.", badge: "Personalized Care" },
        { title: "Free Pick-up & Drop", desc: "Comfortable and safe hospital travel arranged for you.", badge: "Free & Safe Travel" },
      ]
    },
    "during-surgery": {
      title: "During Surgery",
      videoPlaceholder: "Advanced Surgical Procedures",
      highlights: [
        { title: "Advanced Surgery Care", desc: "Expert surgeons with 24/7 care coordination throughout.", badge: "Expert & Trusted" },
        { title: "Minimally Invasive", desc: "Shorter surgery duration with modern technology.", badge: "High Precision" },
        { title: "Seamless Experience", desc: "Focus on comfort, care & smooth process with guided support.", badge: "Safety-First" },
      ]
    },
    "recovery": {
      title: "Recovery",
      videoPlaceholder: "Post-Operative Care & Recovery",
      highlights: [
        { title: "Smooth Discharge", desc: "Quick, hassle-free process with insurance support.", badge: "Hassle-free Process" },
        { title: "Recovery & Follow-Up", desc: "Home recovery guidance with free doctor follow-ups.", badge: "We Care Beyond Surgery" },
        { title: "24x7 Assistance", desc: "Continuous support from care team for any queries.", badge: "Peace of Mind" },
      ]
    }
  };

  return (
    <section className="w-full py-12 relative z-10" id="patient-journey">
      
      {/* Top Highlights */}
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 md:gap-8 mb-20">
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-slate-100">
          <ShieldCheck className="text-green-500 w-5 h-5" />
          <span className="font-semibold text-slate-800 text-sm md:text-base">Cashless on 100+ insurers</span>
        </div>
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-slate-100">
          <HeartPulse className="text-[#05f] w-5 h-5" />
          <span className="font-semibold text-slate-800 text-sm md:text-base">USFDA-Approved Procedure</span>
        </div>
        <div className="flex items-center gap-3 bg-white/60 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-slate-100">
          <Users className="text-purple-500 w-5 h-5" />
          <span className="font-semibold text-slate-800 text-sm md:text-base">Dedicated Team</span>
        </div>
      </div>

      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.2em] text-[#05f] uppercase mb-4"
        >
          End-to-End Excellence
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight"
        >
          Your Journey to <span className="font-medium text-slate-900">Recovery.</span>
        </motion.h3>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Interactive Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-slate-100/80 backdrop-blur-sm p-1.5 rounded-full inline-flex relative shadow-inner">
            {(Object.keys(stages) as JourneyStage[]).map((stage) => (
              <button
                key={stage}
                onClick={() => setActiveStage(stage)}
                className={`relative px-8 py-3 rounded-full text-[15px] font-semibold transition-all duration-300 z-10 ${
                  activeStage === stage ? "text-white" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {activeStage === stage && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#05f] rounded-full shadow-md"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-20">{stages[stage].title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              {/* Left: Video Placeholder */}
              <div className="w-full aspect-[4/3] rounded-[1.5rem] bg-gradient-to-br from-slate-100 to-slate-200 border border-white shadow-inner flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer">
                {/* Subtle animated background for the placeholder */}
                <div className="absolute inset-0 bg-blue-500/5 mix-blend-multiply group-hover:scale-110 transition-transform duration-700" />
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
                  <PlayCircle className="w-8 h-8 text-[#05f] ml-1" />
                </div>
                <p className="mt-6 text-sm font-semibold text-slate-600 uppercase tracking-widest relative z-10 group-hover:text-[#05f] transition-colors">
                  Watch Video
                </p>
                <div className="absolute bottom-6 left-6 right-6 text-center">
                   <p className="text-slate-500 font-medium text-sm">{stages[activeStage].videoPlaceholder}</p>
                </div>
              </div>

              {/* Right: Content Highlights */}
              <div className="flex flex-col gap-8">
                {stages[activeStage].highlights.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex gap-4 group"
                  >
                    <div className="mt-1 shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-[#05f] group-hover:border-[#05f] transition-colors duration-300">
                      <Check className="w-4 h-4 text-[#05f] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-bold text-slate-900">{item.title}</h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[15px]">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
