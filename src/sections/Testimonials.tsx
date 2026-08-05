"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, CheckCircle2, Building2, HeartHandshake } from "lucide-react";

const testimonials = [
  {
    quote: "I suffered from grade-3 piles for years out of surgery fear. HealthFlo arranged my surgeon consultation in Indiranagar within 2 hours. The laser procedure took 30 minutes, zero stitches, and HDFC Ergo covered 100% cashless. Sitting comfortably by day 2!",
    author: "Rohan Mukherjee",
    meta: "Male, 38 yrs • Bangalore",
    treatment: "Laser Piles (LHP®)",
    insurance: "HDFC ERGO Cashless",
    date: "2 weeks ago",
    rating: 5,
    initials: "RM",
    color: "bg-gradient-to-tr from-[#0055ff] to-[#0088ff] text-white",
  },
  {
    quote: "After a failed traditional fistula surgery elsewhere, my condition recurred. Dr. Reddy at HealthFlo Jubilee Hills explained laser tract sealing. Zero cuts or bleeding. The insurance desk handled every paper—not a single rupee paid from my pocket!",
    author: "Vikram Sharma",
    meta: "Male, 44 yrs • Hyderabad",
    treatment: "Laser Fistula (FiLaC®)",
    insurance: "Star Health 100% Covered",
    date: "1 month ago",
    rating: 5,
    initials: "VS",
    color: "bg-gradient-to-tr from-[#00A88F] to-[#007a68] text-white",
  },
  {
    quote: "Extremely discreet and hygienic surgical standard. Operated at 9 AM, discharged by 2 PM with completely painless recovery. My personal care coordinator stayed with me throughout admission and discharge. Truly a 5-star hospital experience.",
    author: "Karthik Rajan",
    meta: "Male, 31 yrs • Chennai",
    treatment: "Laser Circumcision (ZSR)",
    insurance: "ICICI Lombard Approved",
    date: "3 weeks ago",
    rating: 5,
    initials: "KR",
    color: "bg-gradient-to-tr from-[#0a2540] to-[#0038ff] text-white",
  },
  {
    quote: "My husband suffered an acute 12mm ureteric stone with severe pain. HealthFlo coordinated emergency diagnostic scanning and immediate RIRS laser surgery without a single surgical cut. Pain-free stone clearance in 45 minutes flat!",
    author: "Anika Deshpande",
    meta: "Female, 52 yrs • Pune",
    treatment: "Laser Kidney Stone (RIRS)",
    insurance: "Niva Bupa Cashless",
    date: "1 week ago",
    rating: 5,
    initials: "AD",
    color: "bg-gradient-to-tr from-[#0055ff] to-[#0088ff] text-white",
  },
  {
    quote: "As a dentist standing for hours daily, severe varicose veins made working painful. I underwent Endovenous Laser Ablation at HealthFlo. Walked out of the surgical center on my own feet the very same evening with zero leg scars!",
    author: "Dr. Sneha Verma",
    meta: "Female, 36 yrs • Mumbai",
    treatment: "Varicose Veins (EVLA)",
    insurance: "Care Health Approved",
    date: "1 month ago",
    rating: 5,
    initials: "SV",
    color: "bg-gradient-to-tr from-[#00A88F] to-[#007a68] text-white",
  },
  {
    quote: "Had 4 prominent forearm lipomas that made me self-conscious. The surgeon used painless micro-laser ablation. Recovered in 24 hours with virtually zero visible marks. Best surgical coordination platform in India by far!",
    author: "Siddharth Mehta",
    meta: "Male, 29 yrs • Delhi NCR",
    treatment: "Lipoma Excision",
    insurance: "TATA AIG Cashless",
    date: "3 weeks ago",
    rating: 5,
    initials: "SM",
    color: "bg-gradient-to-tr from-[#0a2540] to-[#0038ff] text-white",
  },
];

const doubled = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-6 md:py-10 z-10 overflow-hidden bg-transparent border-none"
      id="patient-stories"
    >
      {/* ── Compact Section Header (Centered in Viewport) ── */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-blue-200/80 text-[#0055ff] text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full mb-2.5 shadow-xs"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-black text-[9px]">G</div>
          Google Verified Reviews · 4.9 / 5.0 · 2,480+ Patients
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[48px] font-light text-slate-800 tracking-tight leading-[1.15]"
        >
          Patient Stories.{" "}
          <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0055ff] via-indigo-600 to-cyan-500">
            Real Outcomes.
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-1.5 text-[13.5px] md:text-[14.5px] text-slate-500 font-medium max-w-lg mx-auto"
        >
          Every review is from a verified patient who underwent seamless surgery through HealthFlo.
        </motion.p>
      </div>

      {/* ── True Full-Screen Width (0px left edge to 0px right edge) & Containerless Carousel ── */}
      <div className="w-full relative overflow-hidden">
        <div
          className="flex items-stretch gap-4 md:gap-5 w-max hover:[animation-play-state:paused] py-4 px-3 sm:px-6 transition-all"
          style={{ animation: "scroll-testimonials 65s linear infinite" }}
        >
          {doubled.map((t, idx) => (
            <div
              key={idx}
              className="w-[280px] sm:w-[315px] shrink-0 bg-white/90 backdrop-blur-2xl border border-white/80 rounded-[22px] p-4.5 shadow-[0_12px_35px_-12px_rgba(0,40,150,0.12)] hover:bg-white hover:shadow-[0_20px_50px_-15px_rgba(0,85,255,0.25)] hover:border-blue-500/50 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Permanent Ultra-Sleek Gradient Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0055ff] via-indigo-500 to-cyan-400 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Treatment Pill + Stars */}
                <div className="flex items-center justify-between gap-2 mt-1 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-blue-50 text-[#0055ff] text-[10px] font-black uppercase tracking-wider border border-blue-100 group-hover:bg-[#0055ff] group-hover:text-white group-hover:border-transparent transition-all duration-300 truncate">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0055ff] group-hover:bg-white shrink-0 transition-colors" />
                    <span className="truncate">{t.treatment}</span>
                  </span>
                  <div className="flex text-amber-400 gap-0.5 shrink-0">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} fill="currentColor" size={12} />
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <p className="text-[12px] md:text-[12.5px] text-slate-700 group-hover:text-slate-950 font-medium leading-[1.6] mb-3.5 transition-colors">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div>
                {/* Insurance Cashless Badge */}
                <div className="inline-flex items-center gap-1.5 text-emerald-700 text-[10.5px] font-extrabold bg-emerald-50/90 px-2 py-0.5 rounded-md border border-emerald-200/70 mb-3 w-max shadow-2xs group-hover:bg-emerald-100 transition-colors">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>{t.insurance}</span>
                </div>

                {/* Patient Author Metadata */}
                <div className="flex items-center gap-2.5 pt-2.5 border-t border-slate-100/90">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-[11px] shadow-xs relative shrink-0 ${t.color} group-hover:scale-105 transition-transform`}>
                    {t.initials}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-2xs">
                      <CheckCircle2 className="w-2.5 h-2.5 fill-emerald-500 text-white" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-black text-slate-900 leading-tight truncate group-hover:text-blue-600 transition-colors">{t.author}</p>
                    <p className="text-[10px] text-slate-500 font-bold mt-0.5 truncate">{t.meta}</p>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 shadow-2xs" title="Verified Google Review">
                    <span className="text-[#4285F4] font-black text-[9px]">G</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Interactive Navigation Hint ── */}
      <div className="text-center mt-3 sm:mt-4 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-extrabold uppercase tracking-wider">
        <HeartHandshake className="w-3.5 h-3.5 text-blue-500 animate-pulse shrink-0" />
        <span>Hover or touch any card to pause and explore verified records</span>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-testimonials {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
