"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, CheckCircle2, Building2, HeartHandshake } from "lucide-react";

const testimonials = [
  {
    quote: "I suffered from grade-3 piles for years out of surgery fear. HealthFlo arranged my surgeon consultation in Indiranagar within 2 hours. The laser procedure took 30 minutes, zero stitches, and HDFC Ergo covered 100% cashless. Sitting comfortably by day 2!",
    author: "Rohan Mukherjee",
    meta: "Male, 38 yrs • Bangalore",
    treatment: "Laser Piles (LHP®)",
    hospital: "HealthFlo Surgical Partner, Indiranagar",
    insurance: "HDFC ERGO Cashless",
    date: "2 weeks ago",
    rating: 5,
    initials: "RM",
    color: "bg-gradient-to-tr from-blue-600 to-indigo-500 text-white",
    verified: true,
  },
  {
    quote: "After a failed traditional fistula surgery elsewhere, my condition recurred. Dr. Reddy at HealthFlo Jubilee Hills explained laser tract sealing. Zero cuts or bleeding. The insurance desk handled every paper—not a single rupee paid from my pocket!",
    author: "Vikram Sharma",
    meta: "Male, 44 yrs • Hyderabad",
    treatment: "Laser Fistula (FiLaC®)",
    hospital: "HealthFlo Center of Excellence, Jubilee Hills",
    insurance: "Star Health 100% Covered",
    date: "1 month ago",
    rating: 5,
    initials: "VS",
    color: "bg-gradient-to-tr from-violet-600 to-purple-500 text-white",
    verified: true,
  },
  {
    quote: "Extremely discreet and hygienic surgical standard. Operated at 9 AM, discharged by 2 PM with completely painless recovery. My personal care coordinator stayed with me throughout admission and discharge. Truly a 5-star hospital experience.",
    author: "Karthik Rajan",
    meta: "Male, 31 yrs • Chennai",
    treatment: "Laser Circumcision (ZSR)",
    hospital: "HealthFlo Advanced Facility, Adyar",
    insurance: "ICICI Lombard Approved",
    date: "3 weeks ago",
    rating: 5,
    initials: "KR",
    color: "bg-gradient-to-tr from-teal-600 to-emerald-500 text-white",
    verified: true,
  },
  {
    quote: "My husband suffered an acute 12mm ureteric stone with severe pain. HealthFlo coordinated emergency diagnostic scanning and immediate RIRS laser surgery without a single surgical cut. Pain-free stone clearance in 45 minutes flat!",
    author: "Anika Deshpande",
    meta: "Female, 52 yrs • Pune",
    treatment: "Laser Kidney Stone (RIRS)",
    hospital: "HealthFlo Hospital Network, Baner",
    insurance: "Niva Bupa Cashless",
    date: "1 week ago",
    rating: 5,
    initials: "AD",
    color: "bg-gradient-to-tr from-rose-600 to-pink-500 text-white",
    verified: true,
  },
  {
    quote: "As a dentist standing for hours daily, severe varicose veins made working painful. I underwent Endovenous Laser Ablation at HealthFlo. Walked out of the surgical center on my own feet the very same evening with zero leg scars!",
    author: "Dr. Sneha Verma",
    meta: "Female, 36 yrs • Mumbai",
    treatment: "Varicose Veins Laser (EVLA)",
    hospital: "HealthFlo Vascular Wing, Andheri",
    insurance: "Care Health Approved",
    date: "1 month ago",
    rating: 5,
    initials: "SV",
    color: "bg-gradient-to-tr from-amber-600 to-orange-500 text-white",
    verified: true,
  },
  {
    quote: "Had 4 prominent forearm lipomas that made me self-conscious. The surgeon used painless micro-laser ablation. Recovered in 24 hours with virtually zero visible marks. Best surgical coordination platform in India by far!",
    author: "Siddharth Mehta",
    meta: "Male, 29 yrs • Delhi NCR",
    treatment: "Painless Lipoma Excision",
    hospital: "HealthFlo Partner Center, Gurugram",
    insurance: "TATA AIG Cashless",
    date: "3 weeks ago",
    rating: 5,
    initials: "SM",
    color: "bg-gradient-to-tr from-cyan-600 to-blue-600 text-white",
    verified: true,
  },
];

// Duplicate list to create seamless infinite loop
const infiniteTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-20 relative z-10 overflow-hidden" id="patient-stories">
      
      {/* Subtle background glow for glassmorphic elevation */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-10">
        
        {/* Google Reviews Verified Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-slate-800 font-extrabold text-[12px] sm:text-[14px] bg-white/80 backdrop-blur-xl px-4 sm:px-6 py-2.5 rounded-full border border-slate-200/80 shadow-[0_8px_30px_rgba(0,85,255,0.12)] mb-6"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-[#4285F4] text-white flex items-center justify-center font-black text-[12px] shadow-xs">G</div>
            <span className="tracking-tight font-black text-slate-900">Google Reviews</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:inline-block" />
          <div className="flex items-center gap-1.5 text-amber-600 font-black">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={15} />)}
            </div>
            <span>4.9 / 5.0</span>
            <span className="text-slate-400 font-semibold text-[11px] ml-0.5">(2,480+ surgical reviews)</span>
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:inline-block" />
          <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full text-[11px] font-black border border-emerald-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>100% Verified Patients</span>
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black text-slate-900 tracking-tight leading-[1.15]"
        >
          Patient Stories.<br className="sm:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055ff] via-[#0088ff] to-teal-500 ml-2 sm:ml-0">
            Real Surgical Outcomes.
          </span>
        </motion.h2>
      </div>

      {/* Infinite Left-to-Right Continuous Scroll Carousel */}
      <div className="w-full relative overflow-hidden py-2">
        {/* Fade gradients on edges for depth */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        <div className="animate-marquee-left-to-right flex items-stretch gap-5 w-max hover:[animation-play-state:paused] py-2 px-4">
          {infiniteTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="w-[88vw] sm:w-[380px] md:w-[420px] bg-white/75 hover:bg-white backdrop-blur-2xl border border-white/90 hover:border-blue-200 rounded-[30px] p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,60,200,0.12)] hover:shadow-[0_18px_50px_rgba(0,85,255,0.2)] transition-all duration-300 flex flex-col justify-between relative group cursor-default"
            >
              <div>
                {/* Top header row: Procedure Tag + Date + Stars */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="px-3 py-1 rounded-full bg-blue-50/90 text-[#0066FF] font-black text-[11px] tracking-wide uppercase border border-blue-200/60 flex items-center gap-1.5 shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                      {t.treatment}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400">{t.date}</span>
                    <div className="flex text-amber-400 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/50">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} fill="currentColor" size={13} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Patient Quote */}
                <p className="text-[14px] sm:text-[15px] text-slate-800 font-medium leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Bottom section: Hospital info & Patient profile */}
              <div>
                {/* Hospital and Cashless Verification Box */}
                <div className="bg-slate-50/90 group-hover:bg-blue-50/50 p-3 rounded-2xl border border-slate-200/70 mb-4 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-700 font-bold truncate">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{t.hospital}</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-emerald-700 font-extrabold bg-emerald-100/70 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0 w-max">
                    <HeartHandshake className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{t.insurance}</span>
                  </div>
                </div>

                {/* Patient Avatar & Identity */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[13px] shadow-sm relative ${t.color}`}>
                      {t.initials}
                      {/* Verified green badge overlay */}
                      <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white" />
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-[15px] font-black text-slate-950 leading-tight">{t.author}</p>
                        <span className="text-[10px] bg-blue-100 text-[#0066FF] px-1.5 py-0.2 rounded font-extrabold">Verified</span>
                      </div>
                      <p className="text-[12px] font-bold text-slate-500 mt-0.5">{t.meta}</p>
                    </div>
                  </div>

                  {/* Google Icon indicator */}
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-black">
                    <span className="text-[#4285F4]">G</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Keyframes for Continuous Smooth Left-to-Right Loop */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-left-to-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-left-to-right {
          display: flex;
          animation: scroll-left-to-right 45s linear infinite;
        }
      `}} />
    </section>
  );
}
