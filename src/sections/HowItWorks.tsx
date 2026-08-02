"use client";

import { motion } from "framer-motion";
import { PhoneCall, ClipboardList, Stethoscope, ShieldCheck, HeartHandshake, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PhoneCall,
    title: "Free Consultation",
    desc: "Call, WhatsApp or walk-in. Zero cost.",
    badge: "₹0",
    accent: "#3b82f6",
    accentLight: "#eff6ff",
    accentBorder: "#bfdbfe",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Clinical Evaluation",
    desc: "Thorough assessment by our specialists.",
    badge: "Detailed",
    accent: "#8b5cf6",
    accentLight: "#f5f3ff",
    accentBorder: "#ddd6fe",
  },
  {
    number: "03",
    icon: Stethoscope,
    title: "Matched with Best Surgeon",
    desc: "Right specialist for your condition.",
    badge: "Best-Fit",
    accent: "#6366f1",
    accentLight: "#eef2ff",
    accentBorder: "#c7d2fe",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Pre-Op & Insurance",
    desc: "Tests, cashless auth & paperwork — handled.",
    badge: "Cashless",
    accent: "#14b8a6",
    accentLight: "#f0fdfa",
    accentBorder: "#99f6e4",
  },
  {
    number: "05",
    icon: HeartHandshake,
    title: "Post-Op Care",
    desc: "Recovery support until you're fully well.",
    badge: "Full Care",
    accent: "#f43f5e",
    accentLight: "#fff1f2",
    accentBorder: "#fecdd3",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-12 relative z-10" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.2em] text-[#05f] uppercase mb-2"
          >
            Your Journey. Our Commitment.
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="text-3xl md:text-[42px] font-bold text-slate-900 tracking-tight leading-tight"
          >
            From First Call to{" "}
            <span className="text-[#05f]">Full Recovery</span>
          </motion.h2>
        </div>

        {/* Step flow */}
        <div className="relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-[44px] left-[9%] right-[9%] h-[2px] z-0"
            style={{ background: "linear-gradient(to right, #3b82f6, #8b5cf6, #6366f1, #14b8a6, #f43f5e)" }}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.09 }}
                  className="relative z-10 flex flex-col items-center text-center group"
                >
                  {/* Icon bubble */}
                  <div
                    className="w-[88px] h-[88px] rounded-full border-4 border-white shadow-md flex flex-col items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300"
                    style={{ backgroundColor: step.accentLight, borderColor: step.accentBorder }}
                  >
                    <span className="text-[10px] font-black tracking-widest mb-0.5" style={{ color: step.accent }}>
                      {step.number}
                    </span>
                    <Icon className="w-6 h-6" style={{ color: step.accent }} />
                  </div>

                  {/* Badge */}
                  <span
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border mb-2"
                    style={{ color: step.accent, backgroundColor: step.accentLight, borderColor: step.accentBorder }}
                  >
                    {step.badge}
                  </span>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 text-[13px] leading-snug mb-1 px-1">
                    {step.title}
                  </h3>

                  {/* Short desc */}
                  <p className="text-[11px] text-slate-500 leading-relaxed px-1">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-100 rounded-2xl px-6 py-4 shadow-sm"
        >
          <p className="text-[14px] text-slate-700 font-medium text-center sm:text-left">
            🛡️ <span className="font-bold text-slate-900">Your first consultation is free.</span>{" "}
            A real care coordinator will call you within 30 minutes.
          </p>
          <div className="flex gap-2 shrink-0">
            <a
              href="tel:+919363650066"
              className="flex items-center gap-2 bg-[#0055ff] text-white text-[13px] font-bold px-5 py-2.5 rounded-full shadow-md shadow-blue-400/20 hover:bg-blue-700 transition-all duration-300"
            >
              <PhoneCall className="w-4 h-4" />
              Call Free
            </a>
            <a
              href="https://wa.me/919363650066"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 text-slate-700 text-[13px] font-semibold px-4 py-2.5 rounded-full hover:border-blue-300 transition-all duration-300"
            >
              WhatsApp
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
