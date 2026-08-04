"use client";

import { Phone, MessageCircle, Calendar, LayoutGrid, X, Compass, Stethoscope, User, Mail, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { haptic } from "@/utils/haptics";

const PHONE = "+919363650066";

export default function MobileStickyBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname() || "";

  const isTamilNadu = pathname.includes("tamil-nadu") || pathname.includes("chennai") || pathname.includes("coimbatore") || pathname.includes("madurai") || pathname.includes("trichy") || pathname.includes("salem");
  const isKarnataka = pathname.includes("karnataka") || pathname.includes("bangalore") || pathname.includes("bengaluru") || pathname.includes("mysore") || pathname.includes("mangalore") || pathname.includes("hubli");
  const isTelangana = pathname.includes("telangana") || pathname.includes("hyderabad") || pathname.includes("warangal") || pathname.includes("karimnagar");

  let regionalMsg = "Hello HealthFlo, I'd like a free specialist surgical consultation and cashless insurance check.";
  let regionalLabel = "AI Patient Triage Desk (Multi-Lingual Support)";

  if (isTamilNadu) {
    regionalMsg = "வணக்கம் HealthFlo, I'd like a free consultation with an empanelled surgery specialist and cashless insurance check in Tamil Nadu.";
    regionalLabel = "Tamil Nadu Care Concierge Active (தமிழ்)";
  } else if (isKarnataka) {
    regionalMsg = "ನಮಸ್ಕಾರ HealthFlo, I'd like a free consultation with an empanelled surgery specialist and cashless insurance check in Karnataka.";
    regionalLabel = "Karnataka Care Concierge Active (ಕನ್ನಡ)";
  } else if (isTelangana) {
    regionalMsg = "నమస్కారం HealthFlo, I'd like a free consultation with an empanelled surgery specialist and cashless insurance check in Telangana.";
    regionalLabel = "Telangana Care Concierge Active (తెలుగు)";
  }

  const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(regionalMsg)}`;

  const toggleMenu = () => {
    haptic.light();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = () => {
    haptic.light();
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop when menu is open */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              haptic.light();
              setIsMenuOpen(false);
            }}
            className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-[105] md:hidden"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-4 left-0 right-0 mx-auto w-[calc(100%-28px)] max-w-[400px] z-[110] md:hidden">
        {/* Glassmorphic Navigation & Booking Popup */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mb-3 bg-white/85 backdrop-blur-2xl border border-white/80 rounded-[26px] shadow-[0_12px_45px_rgba(0,80,220,0.25)] p-4 overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-200/70">
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] animate-ping absolute" />
                    <span className="w-2 h-2 rounded-full bg-[#0066FF] relative z-10" />
                  </div>
                  <span className="text-[12px] font-black text-slate-900 tracking-wider uppercase">
                    AI Care Navigator
                  </span>
                </div>
                <button
                  onClick={() => {
                    haptic.light();
                    setIsMenuOpen(false);
                  }}
                  className="text-slate-600 hover:text-slate-900 text-[11px] font-bold px-3 py-1 bg-slate-200/70 rounded-full flex items-center gap-1 transition-colors active:scale-90"
                >
                  <span>Close</span>
                  <X className="w-3 h-3" />
                </button>
              </div>

              {/* Regional Concierge Triage Badge */}
              <div className="mb-3 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center gap-2 text-[11px] font-bold text-blue-900 shadow-2xs">
                <Globe className="w-3.5 h-3.5 text-[#0066FF] shrink-0 animate-pulse" />
                <span>{regionalLabel}</span>
              </div>

              {/* Priority Book Free Card inside the Menu */}
              <a
                href="#lead-capture"
                onClick={() => {
                  haptic.success();
                  setIsMenuOpen(false);
                }}
                className="mb-3 block w-full bg-gradient-to-r from-[#0066FF] to-[#0050DD] text-white p-3.5 rounded-2xl shadow-[0_6px_20px_rgba(0,102,255,0.3)] transition-transform active:scale-[0.94] relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-extrabold text-[14px] leading-tight flex items-center gap-2">
                        <span>Book Free Consultation</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse inline-block" />
                      </div>
                      <div className="text-[11px] text-blue-100 mt-0.5">
                        Same-Day Callback & Zero Pain Laser Care
                      </div>
                    </div>
                  </div>
                </div>
              </a>

              {/* Page Navigators Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="/"
                  onClick={handleNavClick}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50/90 hover:bg-white text-slate-800 font-bold text-[13px] border border-slate-200/70 shadow-2xs transition-all active:scale-[0.93]"
                >
                  <div className="w-7 h-7 rounded-xl bg-blue-100 text-[#0066FF] flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span>Overview</span>
                </a>
                <a
                  href="/specialities"
                  onClick={handleNavClick}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50/90 hover:bg-white text-slate-800 font-bold text-[13px] border border-slate-200/70 shadow-2xs transition-all active:scale-[0.93]"
                >
                  <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <span>Specialities</span>
                </a>
                <a
                  href="#patient-stories"
                  onClick={handleNavClick}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50/90 hover:bg-white text-slate-800 font-bold text-[13px] border border-slate-200/70 shadow-2xs transition-all active:scale-[0.93]"
                >
                  <div className="w-7 h-7 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <span>Patient Portal</span>
                </a>
                <a
                  href="#contact"
                  onClick={handleNavClick}
                  className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50/90 hover:bg-white text-slate-800 font-bold text-[13px] border border-slate-200/70 shadow-2xs transition-all active:scale-[0.93]"
                >
                  <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>Contact Us</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3-Column Floating Glassmorphic Dock with Tactile Device Vibration */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          className="bg-white/60 backdrop-blur-2xl border border-white/80 shadow-[0_8px_35px_rgba(0,60,180,0.22)] p-2 rounded-[24px] grid grid-cols-3 gap-2"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics="whatsapp_mobile_dock_click"
            onClick={() => haptic.medium()}
            className="flex flex-col items-center justify-center gap-1 bg-[#25D366] hover:bg-[#20b858] text-white font-extrabold py-2.5 px-2 rounded-[18px] text-[12px] tracking-tight shadow-md active:scale-[0.92] transition-all w-full min-w-0"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-full">WhatsApp</span>
          </a>
          
          <a
            href={`tel:${PHONE}`}
            data-analytics="helpline_mobile_dock_click"
            onClick={() => haptic.medium()}
            className="flex flex-col items-center justify-center gap-1 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-2.5 px-2 rounded-[18px] text-[12px] tracking-tight shadow-md active:scale-[0.92] transition-all w-full min-w-0"
          >
            <Phone className="w-4 h-4 shrink-0" />
            <span className="truncate max-w-full">Call Now</span>
          </a>

          <button
            onClick={toggleMenu}
            className={`flex flex-col items-center justify-center gap-1 py-2.5 px-2 rounded-[18px] text-[12px] tracking-tight font-extrabold border transition-all active:scale-[0.92] shadow-md w-full min-w-0 ${
              isMenuOpen 
                ? "bg-slate-800 text-white border-slate-800" 
                : "bg-[#0066FF] hover:bg-blue-600 text-white border-[#0066FF]"
            }`}
          >
            {isMenuOpen ? <X className="w-4 h-4 shrink-0" /> : <LayoutGrid className="w-4 h-4 shrink-0" />}
            <span className="truncate max-w-full">{isMenuOpen ? "Close" : "More"}</span>
          </button>
        </motion.div>
      </div>
    </>
  );
}
