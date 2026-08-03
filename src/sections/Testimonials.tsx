"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Laser surgery was painless. Back at work in 48 hours. Incredible experience.",
    author: "Rohan M.", location: "Bangalore", treatment: "Laser Piles", rating: 5, initials: "RM", color: "bg-blue-100 text-blue-700",
  },
  {
    quote: "Insurance handled completely by them. Zero upfront cost. Not a single paper to sign.",
    author: "Vikram S.", location: "Hyderabad", treatment: "Laser Fistula", rating: 5, initials: "VS", color: "bg-violet-100 text-violet-700",
  },
  {
    quote: "Operated in the morning, home by evening. Same-day discharge is real!",
    author: "Sneha K.", location: "Chennai", treatment: "Laser Circumcision", rating: 5, initials: "SK", color: "bg-teal-100 text-teal-700",
  },
  {
    quote: "Lipoma removal was quick and virtually scarless. Professional team throughout.",
    author: "Anita D.", location: "Madurai", treatment: "Lipoma Removal", rating: 5, initials: "AD", color: "bg-rose-100 text-rose-700",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-8 relative z-10" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Compact Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Patient Stories
            </h2>
            <p className="text-[14px] text-slate-500 mt-1">
              Trusted by 10,000+ patients across 8 cities.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-100 text-yellow-700 px-3 py-1.5 rounded-full text-[13px] font-bold">
              <Star fill="currentColor" size={14} className="text-yellow-500" />
              4.9/5 Average Rating
            </div>
            <div className="flex -space-x-2">
              {["RM","VS","SK"].map((ini, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-[10px]">
                  {ini}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-white bg-[#05f] flex items-center justify-center text-white text-[9px] font-bold">+2k</div>
            </div>
          </div>
        </motion.div>

        {/* Horizontal Scroll Testimonials */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 gap-4 snap-x snap-mandatory hide-scrollbar"
        >
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-[280px] md:w-[320px] bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-4 right-4 text-slate-100 w-6 h-6 rotate-180" />
              
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#05f] bg-blue-50 px-2 py-0.5 rounded-full">
                  {t.treatment}
                </span>
                <div className="flex text-yellow-400">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} fill="currentColor" size={12} />)}
                </div>
              </div>

              <p className="text-[14px] text-slate-700 leading-snug mb-5 min-h-[60px]">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900 leading-none">{t.author}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Hide Scrollbar Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
