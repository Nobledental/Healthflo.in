"use client";

import { useEffect, useState } from "react";
import { useBattery } from "../hooks/useBattery";

const treatments = [
  "Laser Piles Treatment",
  "Laser Fissure Relief",
  "Laser Fistula Surgery",
  "Laser Circumcision",
  "Lipoma & Cyst Removal",
  "Anal Fistulotomy",
  "Haemorrhoidectomy",
  "Day-Care General Surgery",
];

export default function Hero() {
  const [city, setCity] = useState("Detecting...");
  const battery = useBattery();

  const isLowPower = !battery.loading && battery.level <= 0.20 && !battery.charging;
  const powerSavingMode = isLowPower;

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => { if (data.city) setCity(data.city); else setCity("Unknown"); })
      .catch(() => setCity("Unknown"));
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] relative py-8 overflow-hidden w-full transition-colors duration-1000">

      {/* Top Indicators */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 md:px-8 z-20">
        <span className="text-[13px] font-semibold uppercase tracking-widest text-slate-700">
          Excellence
        </span>
        <div className="flex items-center gap-3">
          <div className="px-4 py-1.5 rounded-full text-[13px] font-semibold flex items-center justify-center border shadow-sm backdrop-blur-md bg-white/70 border-white/50 text-slate-800">
            <span className={`w-2 h-2 rounded-full mr-2 ${powerSavingMode ? "bg-red-500" : "bg-[#0a84ff]"}`}></span>
            <span className="ml-1 font-bold">{city}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl flex flex-col items-center text-center z-30 px-6 lg:px-12 mb-2 transition-opacity duration-500">

        {/* H1 */}
        <h1 className="text-[52px] md:text-[64px] lg:text-[76px] font-extrabold leading-[1.1] tracking-tighter z-10 mb-2 max-w-4xl mx-auto flex items-center justify-center gap-0 flex-wrap bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600">
          HealthFlo Hospital
        </h1>

        <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium leading-[1.4] tracking-tight z-10 mb-4 max-w-3xl mx-auto text-slate-700 mt-2">
          <span className="block">Advanced Laser Surgical Care. Zero Pain. Same-Day Discharge.</span>
        </h2>

        {/* Social Proof Numbers */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-6 mt-2">
          {[
            { value: "10,000+", label: "Patients Treated" },
            { value: "4.8★", label: "Rating" },
            { value: "30+", label: "Insurer Partners" },
            { value: "8 Cities", label: "Pan India" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 text-[18px] leading-none">{s.value}</span>
              <span className="text-slate-500 text-[13px]">{s.label}</span>
              {i < 3 && <span className="text-slate-300 ml-2">|</span>}
            </div>
          ))}
        </div>

        <p className="text-[16px] lg:text-[18px] font-normal max-w-2xl mx-auto leading-relaxed mb-2 text-slate-500">
          India's trusted laser surgical care network — USFDA-approved procedures, cashless support across 30+ insurance companies, and dedicated care coordinators from first consult to full recovery.
        </p>

        {/* Treatment marquee — actual treatments only */}
        <style>{`
          @keyframes slide-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        <div className="w-full max-w-[100vw] overflow-hidden relative mb-8 flex items-center group [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-5 border-y border-slate-200/50">
          <div className="flex whitespace-nowrap items-center" style={{ animation: "slide-marquee 25s linear infinite", width: "max-content" }}>
            {[...Array(2)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center">
                {treatments.map((t, i) => (
                  <div key={i} className="inline-flex items-center px-8 group/item cursor-pointer">
                    <span className="text-slate-600 font-bold text-[14px] md:text-[16px] tracking-widest uppercase group-hover/item:text-[#0a84ff] transition-colors duration-300">
                      {t}
                    </span>
                    <div className="w-[1px] h-8 bg-slate-200 ml-16 opacity-50"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Original AI Health Assistant App Banner */}
        <div className={`w-full mx-auto bg-gradient-to-r from-[#d4e9ff] to-[#bed8ff] rounded-[1.5rem] p-4 md:px-8 md:py-5 flex flex-col xl:flex-row items-center justify-between gap-6 transition-all duration-500 shadow-sm border border-blue-200/50 ${powerSavingMode ? "opacity-50 pointer-events-none scale-95" : "opacity-100 scale-100"}`}>
          
          <div className="text-left flex-1 min-w-[250px] flex flex-col gap-2 items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-white/50 shadow-sm backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a84ff]"></span>
              <span className="text-[10px] font-bold text-[#0a84ff] uppercase tracking-wider">
                EXPLORE 15+ ADVANCED MEDICAL SPECIALTIES →
              </span>
            </div>
            <p className="text-[16px] md:text-[18px] font-medium text-slate-700 leading-snug">
              Your personal AI health assistant, <span className="text-[#0a84ff]">bringing expert care to your hands.</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 flex-shrink-0">

            {/* Try in Web Button */}
            <a
              href="#web-app"
              className="flex items-center gap-2 bg-[#0a84ff] hover:bg-blue-600 text-white rounded-xl px-4 py-2 transition-all shadow-sm group"
            >
              {/* Globe / Web icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 group-hover:rotate-12 transition-transform">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"/>
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[9px] leading-none font-bold uppercase tracking-wide text-blue-100 mb-0.5">Start Now</span>
                <span className="text-[14px] font-bold leading-none tracking-tight">TRY IN WEB</span>
              </div>
            </a>

            {/* Google Play Button — authentic multicolor icon */}
            <a
              href="#download-android"
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 rounded-xl px-4 py-2 transition-all shadow-sm border border-slate-100 group"
            >
              <svg viewBox="0 0 48 48" className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none">
                <path d="M7.705 4.043A1.17 1.17 0 0 0 7 5.089V42.91a1.17 1.17 0 0 0 .705 1.046l.087.04 21.007-21.007v-.496L7.792 4.003z" fill="#4FC3F7"/>
                <path d="M35.807 28.03l-7-4.03V23.5l7-4.03.158.09 8.299 4.716c2.371 1.346 2.371 3.551 0 4.897l-8.299 4.716z" fill="#FFCA28"/>
                <path d="M35.965 28.03L28.8 21l-21.1 21.956a2.756 2.756 0 0 0 3.523.098z" fill="#F06292"/>
                <path d="M35.965 19.97L11.223 5.945a2.756 2.756 0 0 0-3.523.098L28.8 27z" fill="#69F0AE"/>
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[9px] leading-none font-bold uppercase tracking-wide text-slate-500 mb-0.5">Get it on</span>
                <span className="text-[14px] font-bold leading-none tracking-tight">Google Play</span>
              </div>
            </a>

            {/* App Store Button — authentic Apple logo */}
            <a
              href="#download-ios"
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 rounded-xl px-4 py-2 transition-all shadow-sm border border-slate-100 group"
            >
              <svg viewBox="0 0 814 1000" className="w-5 h-6 group-hover:scale-110 transition-transform" fill="#1a1a1a">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-150.3-86.4c-52.1-56.9-94.5-143.8-94.5-226.3 0-188.7 123.3-288.7 244.6-288.7 62.9 0 116.3 40.8 155.8 40.8 37.3 0 98.9-43 166.7-43 26.7 0 130.2 2.6 198.6 87.8zm-123.7-229c31.5-37.5 54.3-89.5 54.3-141.5 0-7.1-.6-14.3-1.9-20.1-51.5 1.9-112.3 34.2-149.2 75.8-28.5 32-56.3 83.9-56.3 136.5 0 7.7 1.3 15.5 1.9 17.9 3.2.6 8.4 1.3 13.6 1.3 46.2 0 101.8-31 137.6-69.9z"/>
              </svg>
              <div className="flex flex-col text-left">
                <span className="text-[9px] leading-none font-bold tracking-wide text-slate-500 mb-0.5">Download on the</span>
                <span className="text-[14px] font-bold leading-none tracking-tight">App Store</span>
              </div>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
