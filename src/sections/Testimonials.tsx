"use client";

import { motion } from "framer-motion";
import { Star, Quote, PhoneCall } from "lucide-react";

const testimonials = [
  {
    quote: "Laser surgery was painless. Back at work in 48 hours. Incredible experience.",
    author: "Rohan M.",
    location: "Bangalore",
    treatment: "Laser Piles",
    rating: 5,
    initials: "RM",
    color: "bg-blue-100 text-blue-700",
  },
  {
    quote: "Insurance handled completely by them. Zero upfront cost. Not a single paper to sign.",
    author: "Vikram S.",
    location: "Hyderabad",
    treatment: "Laser Fistula",
    rating: 5,
    initials: "VS",
    color: "bg-violet-100 text-violet-700",
  },
  {
    quote: "Operated in the morning, home by evening. Same-day discharge is real!",
    author: "Sneha K.",
    location: "Chennai",
    treatment: "Laser Circumcision",
    rating: 5,
    initials: "SK",
    color: "bg-teal-100 text-teal-700",
  },
  {
    quote: "Lipoma removal was quick and virtually scarless. Professional team throughout.",
    author: "Anita D.",
    location: "Madurai",
    treatment: "Lipoma Removal",
    rating: 5,
    initials: "AD",
    color: "bg-rose-100 text-rose-700",
  },
];

const stats = [
  { value: "10,000+", label: "Patients" },
  { value: "4.9★", label: "Avg Rating" },
  { value: "30+", label: "Insurers" },
  { value: "8", label: "Cities" },
];

export default function Testimonials() {
  return (
    <section className="w-full py-10 relative z-10" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* ── Compact Header Row ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
        >
          {/* Left: Title */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#05f] uppercase mb-1">Patient Stories</p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              Built by Trusted Hands,{" "}
              <span className="text-[#05f]">Valued by Thousands.</span>
            </h2>
          </div>

          {/* Right: Inline stats + CTA */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Star rating pill */}
            <div className="flex items-center gap-2 bg-white border border-slate-100 shadow-sm px-4 py-2 rounded-full">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={13} />)}
              </div>
              <span className="text-[13px] font-bold text-slate-800">4.9 / 5</span>
            </div>

            {/* Avatar stack */}
            <div className="flex items-center gap-2 bg-white border border-slate-100 shadow-sm px-3 py-2 rounded-full">
              <div className="flex -space-x-2.5">
                {["RM","VS","SK"].map((ini, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                    {ini}
                  </div>
                ))}
                <div className="w-7 h-7 rounded-full border-2 border-white bg-[#05f] flex items-center justify-center text-white text-[9px] font-bold">+2k</div>
              </div>
              <span className="text-[12px] text-slate-600 font-medium ml-1">10,000+ patients</span>
            </div>

            {/* CTA */}
            <button className="flex items-center gap-2 bg-[#05f] text-white px-5 py-2.5 rounded-full font-bold text-[13px] hover:bg-blue-700 transition-all duration-300 shadow-md shadow-blue-500/20">
              <PhoneCall size={14} />
              Call Now
            </button>
          </div>
        </motion.div>

        {/* ── Compact Stats Bar ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-4 gap-3 mb-8"
        >
          {stats.map((s, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-2xl px-4 py-3 text-center shadow-sm">
              <p className="text-[20px] font-extrabold text-slate-900 leading-none">{s.value}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Testimonial Cards Grid (2×2) ─────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white border border-slate-100 rounded-[20px] p-5 relative group hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Quote className="absolute top-4 right-4 text-slate-100 w-8 h-8 rotate-180 group-hover:text-blue-50 transition-colors" />

              {/* Top row: tag + stars */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#05f] bg-blue-50 px-2.5 py-1 rounded-full">
                  {t.treatment}
                </span>
                <div className="flex text-yellow-400">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} fill="currentColor" size={12} />)}
                </div>
              </div>

              {/* Quote */}
              <p className="text-[13px] text-slate-700 leading-relaxed mb-4 relative z-10">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900 leading-none">{t.author}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
