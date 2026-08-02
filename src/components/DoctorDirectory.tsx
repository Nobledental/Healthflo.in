"use client";

import { motion } from "framer-motion";
import { User, MapPin, Award } from "lucide-react";
import { doctorsData } from "@/data/doctors";

export default function DoctorDirectory() {
  return (
    <section className="w-full py-24 relative z-10" id="doctor-directory">
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.2em] text-[#05f] uppercase mb-4"
        >
          Our Experts
        </motion.h2>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight"
        >
          Meet Our Top Surgeons.<br/>
          <span className="font-medium text-slate-900">Dedicated to your recovery.</span>
        </motion.h3>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsData.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-[24px] overflow-hidden border border-[#e2e8f0] shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(5,100,255,0.15)] hover:-translate-y-2 transition-all duration-500 group flex flex-col"
            >
              {/* Doctor Image Area with Voka-style subtle background */}
              <div className="h-[220px] w-full bg-gradient-to-br from-[#f0f4ff] to-[#e1ebff] relative flex items-end justify-center pt-8 overflow-hidden">
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200/40 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
                
                {/* Fallback Icon / Placeholder for Doctor Image */}
                <div className="relative z-10 w-32 h-32 rounded-full bg-white/80 border-4 border-white shadow-md flex items-center justify-center text-[#05f]/40 group-hover:scale-105 transition-transform duration-500 mb-[-20px]">
                  <User size={64} strokeWidth={1.5} />
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-8 pt-10 flex flex-col flex-1 bg-white relative z-20">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center text-[11px] font-bold tracking-wider uppercase text-[#05f] bg-blue-50 px-2 py-1 rounded-md">
                    {doctor.experience}
                  </span>
                </div>
                
                <h4 className="text-xl font-bold text-slate-900 mb-1">{doctor.name}</h4>
                <p className="text-sm font-medium text-slate-600 mb-4">{doctor.specialty}</p>

                <div className="space-y-3 mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-[#05f] mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-600 leading-tight">{doctor.qualifications}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-500 leading-tight">{doctor.hospitals.join(", ")}</span>
                  </div>
                </div>

                <button className="mt-8 w-full py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-[#05f] hover:text-white hover:border-[#05f] transition-colors duration-300">
                  Book Consultation
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
