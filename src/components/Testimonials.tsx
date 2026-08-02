"use client";

import { motion } from "framer-motion";
import { Star, Quote, PhoneCall } from "lucide-react";

const testimonials = [
  {
    quote: "The laser surgery was painless. I was back at work within 48 hours. Incredible experience from start to finish.",
    author: "Rohan M.",
    location: "Bangalore",
    rating: 5,
  },
  {
    quote: "Insurance process was handled completely by them. 0 upfront cost. I didn't have to worry about a single piece of paperwork.",
    author: "Vikram S.",
    location: "Delhi",
    rating: 5,
  },
  {
    quote: "Excellent maternity wing. The staff felt like family and the facilities are truly world-class.",
    author: "Sneha K.",
    location: "Mumbai",
    rating: 5,
  },
  {
    quote: "State-of-the-art facilities and very professional specialists. Highly recommend for any surgical needs.",
    author: "Anita D.",
    location: "Pune",
    rating: 4,
  }
];

export default function Testimonials() {
  return (
    <section className="w-full py-12 bg-gradient-to-b from-white to-slate-50 relative z-10" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Trust Metrics & CTA */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight leading-tight mb-6"
            >
              Built by Trusted Hands,<br/>
              <span className="font-bold text-[#05f]">Valued by Thousands.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-600 leading-relaxed mb-10 max-w-md"
            >
              Join a community of 50,000+ patients who chose Surgical Excellence for their life-changing procedures.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 mb-10"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                     {/* Placeholder for patient avatars */}
                     <span className="text-slate-400 text-xs">IMG</span>
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-white bg-[#05f] flex items-center justify-center text-white text-xs font-bold z-10">
                  +2k
                </div>
              </div>
              <div>
                <div className="flex text-yellow-400 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                </div>
                <p className="text-sm font-bold text-slate-800">Rated 4.9/5 stars</p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 bg-[#05f] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <PhoneCall size={20} />
              Call Now for Assistance
            </motion.button>
          </div>

          {/* Right: Testimonial Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 rounded-[24px] shadow-sm border border-slate-100 relative group hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500"
                >
                  <Quote className="absolute top-6 right-6 text-slate-100 w-12 h-12 rotate-180 group-hover:text-blue-50 transition-colors" />
                  
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} fill="currentColor" size={14} />)}
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed font-medium mb-8 relative z-10">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-[#05f] flex items-center justify-center font-bold text-sm">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">{testimonial.author}</h5>
                      <p className="text-xs text-slate-500">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
