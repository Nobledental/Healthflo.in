"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function CTABanner() {
  const { config } = useSiteConfig();
  return (
    <section className="w-full py-8 md:py-12 relative z-10" id="cta">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-[#0a2540] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(10,37,64,0.4)]"
      >
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#05f]/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-center p-6 md:p-10 lg:p-16">
          {/* Left: Copy */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight mb-2 md:mb-3">
              Ready to Take the Next Step?
            </h2>
            <p className="text-blue-200 text-[14px] md:text-[16px] leading-relaxed mb-5 md:mb-8">
              Our care team is here to help you — from understanding your condition to arranging your surgery, insurance, and follow-up. No cost. No obligation.
            </p>

            <div className="flex flex-wrap gap-3 md:gap-4">
              <a
                href={config.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 md:gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-5 md:px-6 py-3 md:py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-[14px] md:text-[15px]"
              >
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                WhatsApp Us
              </a>

              <a
                href={`tel:+${config.helplineRaw}`}
                className="flex items-center gap-2 md:gap-3 bg-white hover:bg-blue-50 text-[#0a2540] font-bold px-5 md:px-6 py-3 md:py-3.5 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 text-[14px] md:text-[15px]"
              >
                <Phone className="w-4 h-4 md:w-5 md:h-5" />
                Call Now
              </a>

              <a
                href="#specialized-treatments"
                className="flex items-center gap-2 md:gap-3 bg-transparent border-2 border-white/30 hover:border-white text-white font-bold px-5 md:px-6 py-3 md:py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 text-[14px] md:text-[15px]"
              >
                <CalendarCheck className="w-4 h-4 md:w-5 md:h-5" />
                Book Consultation
              </a>
            </div>
          </div>

          {/* Right: Contact Info */}
          <div className="bg-white/10 backdrop-blur-md rounded-[1.25rem] md:rounded-[1.5rem] border border-white/20 p-5 md:p-8 flex flex-col gap-3 md:gap-4">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#05f] flex items-center justify-center shadow-lg shrink-0">
                <Phone className="w-5 h-5 md:w-7 md:h-7 text-white" />
              </div>
              <div>
                <p className="text-blue-200 text-[11px] md:text-[12px] font-bold uppercase tracking-wider mb-0.5">We are just a call away!</p>
                <a href={`tel:+${config.helplineRaw}`} className="text-white text-xl md:text-2xl font-extrabold tracking-tight hover:text-blue-200 transition-colors">
                  {config.helplineNumber}
                </a>
              </div>
            </div>
            <div className="h-px bg-white/20" />
            <p className="text-blue-200 text-[13px] md:text-[14px]">
              <span className="font-bold text-white">Mon – Sun</span> &nbsp;|&nbsp; 9:00 AM – 8:00 PM
            </p>
            <div className="grid grid-cols-2 gap-2 md:gap-3 mt-1 md:mt-2">
              {[
                "Thousands of Happy Patients",
                "Safe & Hygienic Environment",
                "4.8/5 Patient Rating",
                "Your Health, Our Priority",
              ].map((label, i) => (
                <div key={i} className="bg-white/10 rounded-xl px-2.5 py-1.5 md:px-3 md:py-2 text-[11px] md:text-[12px] text-white/80 font-medium text-center">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
