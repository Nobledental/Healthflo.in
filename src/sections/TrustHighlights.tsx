"use client";

import { motion } from "framer-motion";
import { UserCheck, Zap, Clock, Phone, HeartHandshake } from "lucide-react";

const highlights = [
  {
    icon: UserCheck,
    title: "Experienced Surgeons",
    desc: "Specialists with years of expertise",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Zap,
    title: "Advanced Laser Care",
    desc: "Minimally invasive. Faster recovery.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Clock,
    title: "Same-Day Discharge",
    desc: "Go home the same day.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Phone,
    title: "Free Consultation",
    desc: "Talk to our experts at no cost.",
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    icon: HeartHandshake,
    title: "End-to-End Support",
    desc: "We're with you before, during & after.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

const cities = [
  "Trichy", "Madurai", "Dharmapuri", "Krishnagiri", "Salem",
  "Bangalore", "Hyderabad", "Chennai",
];

export default function TrustHighlights() {
  return (
    <section className="w-full py-8 md:py-12 relative z-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Sleek Features Row — 2 cols mobile, 3 tablet, 5 desktop */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-12"
        >
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3.5 md:p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full ${item.bg} flex items-center justify-center mb-2.5 md:mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 ${item.color}`} />
                </div>
                <h4 className="font-bold text-slate-900 text-[13px] md:text-[15px] leading-tight mb-0.5 md:mb-1">{item.title}</h4>
                <p className="text-[11px] md:text-[13px] text-slate-500 leading-snug hidden sm:block">{item.desc}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Premium Cities Band */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 rounded-xl md:rounded-2xl p-4 md:p-6 md:px-10 shadow-xl"
        >
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[13px] md:text-[14px] font-bold text-white uppercase tracking-wider">HealthFlo Network</span>
          </div>
          
          <div className="flex flex-wrap justify-start sm:justify-end gap-x-4 md:gap-x-6 gap-y-2">
            {cities.map((city, idx) => (
              <span
                key={idx}
                className="text-[12px] md:text-[14px] font-medium text-slate-300 flex items-center gap-2"
              >
                {city}
                {idx !== cities.length - 1 && <span className="text-slate-600 hidden md:inline">•</span>}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
