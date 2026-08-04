"use client";

import { useEffect, useState } from "react";
import { useBattery } from "../hooks/useBattery";
import dynamic from "next/dynamic";
import { Globe, Sparkles, ShieldCheck } from "lucide-react";

const Hero3DBackground = dynamic(() => import("../components/Hero3DBackground"), {
  ssr: false,
});

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
    <section className="flex flex-col items-center relative pb-8 overflow-hidden w-full transition-colors duration-1000">
      {/* 3D Medical Model Background — ONLY on Desktop (>=1024px) */}
      {!powerSavingMode && <Hero3DBackground />}

      {/* Top Indicators Bar */}
      <div className="w-full max-w-7xl flex justify-between items-center px-4 md:px-8 pt-2 mb-6 sm:mb-10 z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 backdrop-blur-md border border-blue-200/80 text-[#0066FF] text-[11px] sm:text-[13px] font-extrabold tracking-wide shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="truncate">India's #1 Laser Surgical Care Network</span>
        </div>

        <div className="px-3.5 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold flex items-center justify-center border shadow-sm backdrop-blur-xl bg-white/80 border-slate-200/80 text-slate-800 shrink-0">
          <span className={`w-2 h-2 rounded-full mr-2 ${powerSavingMode ? "bg-red-500" : "bg-[#0066FF]"}`} />
          <span>{city}</span>
        </div>
      </div>

      <div className="w-full max-w-7xl flex flex-col items-center text-center z-30 px-4 sm:px-6 lg:px-12 mb-4 transition-opacity duration-500 pt-4 md:pt-10">

        {/* H1 Headline */}
        <h1 className="text-[36px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-black leading-[1.08] tracking-tight z-10 mb-3 max-w-4xl mx-auto text-slate-950 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center">
            <span>Health</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055ff] via-[#0088ff] to-cyan-500">Flo</span>
          </span>
          <span>Hospitals</span>
        </h1>

        {/* Crisp Mobile-Optimized Subtitle */}
        <p className="text-[15px] sm:text-[20px] md:text-[22px] font-bold text-slate-700 max-w-3xl mx-auto leading-relaxed mb-6 px-2">
          Advanced Laser Surgical Care <span className="text-slate-300 hidden sm:inline">•</span><span className="block sm:inline text-[#0066FF] font-extrabold"> Zero Pain</span> <span className="text-slate-300 hidden sm:inline">•</span><span className="block sm:inline"> Same-Day Discharge</span>
        </p>

        {/* Social Proof Numbers — Desktop only */}
        <div className="hidden sm:flex flex-wrap items-center justify-center gap-3 md:gap-8 mb-8 mt-1">
          {[
            { value: "10,000+", label: "Patients" },
            { value: "4.8★", label: "Rating" },
            { value: "30+", label: "Insurers" },
            { value: "8 Cities", label: "Pan India" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="font-black text-slate-900 text-[15px] md:text-[18px] leading-none">{s.value}</span>
              <span className="text-slate-500 font-bold text-[11px] md:text-[13px]">{s.label}</span>
              {i < 3 && <span className="text-slate-300 ml-2 hidden sm:inline">|</span>}
            </div>
          ))}
        </div>

        {/* Treatment Marquee Ribbon */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slide-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}} />

        <div className="w-full max-w-[100vw] overflow-hidden relative mt-4 lg:mt-6 mb-8 flex items-center [mask-image:linear-gradient(to_right,transparent_2%,black_15%,black_85%,transparent_98%)] py-3 md:py-4 border-y border-slate-200/60 bg-white/40 backdrop-blur-md">
          <div className="flex whitespace-nowrap items-center" style={{ animation: "slide-marquee 28s linear infinite", width: "max-content" }}>
            {[...Array(2)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center">
                {treatments.map((t, i) => (
                  <div key={i} className="inline-flex items-center px-5 md:px-8">
                    <span className="text-slate-700 font-extrabold text-[12px] md:text-[14px] uppercase tracking-wider hover:text-[#0066FF] transition-colors">
                      {t}
                    </span>
                    <div className="w-1 h-1 rounded-full bg-[#0066FF] ml-10 md:ml-16 opacity-70" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* AI Health Assistant Hub — Native App Card on Mobile */}
        <div className={`w-full max-w-5xl mx-auto bg-gradient-to-br from-[#0055ff]/10 via-blue-50 to-cyan-50/70 backdrop-blur-2xl rounded-[32px] p-5 sm:p-7 md:px-9 md:py-7 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 shadow-[0_12px_45px_rgba(0,80,220,0.12)] border border-blue-200/80 transition-all duration-500 ${powerSavingMode ? "opacity-50 pointer-events-none scale-95" : "opacity-100 scale-100"}`}>
          
          <div className="text-left flex-1 min-w-0 flex flex-col gap-2.5 items-start w-full">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-blue-200/80 shadow-2xs text-[#0066FF] text-[11px] font-black uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 fill-[#0066FF]" />
              <span>AI Care Assistant • Instant Triage</span>
            </div>
            <p className="text-[17px] sm:text-[20px] md:text-[22px] font-extrabold text-slate-900 leading-snug tracking-tight">
              Get instant surgical triage & pricing, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055ff] to-cyan-600">pre-approved on your phone.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row xl:flex-row items-stretch sm:items-center justify-start xl:justify-end gap-3 shrink-0 w-full xl:w-auto">

            {/* Try in Web Primary Hero Button */}
            <a
              href="#web-app"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#0066FF] hover:bg-blue-700 text-white rounded-2xl px-5 py-3.5 sm:py-3 transition-all shadow-[0_6px_22px_rgba(0,102,255,0.35)] active:scale-[0.96] font-extrabold text-[14px] tracking-tight shrink-0"
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span>Try Instant Web AI →</span>
            </a>

            {/* App Store Badge Row (2-Col grid on mobile to prevent squashing) */}
            <div className="grid grid-cols-2 gap-2 w-full sm:w-auto shrink-0">
              {/* Google Play */}
              <a
                href="#download-android"
                className="flex items-center justify-center sm:justify-start gap-2 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl px-3 py-2.5 sm:py-2 transition-all shadow-sm border border-slate-200/80 active:scale-95 group"
              >
                <svg viewBox="0 0 48 48" className="w-5 h-5 shrink-0 group-hover:scale-110 transition-transform" fill="none">
                  <path d="M7.705 4.043A1.17 1.17 0 0 0 7 5.089V42.91a1.17 1.17 0 0 0 .705 1.046l.087.04 21.007-21.007v-.496L7.792 4.003z" fill="#4FC3F7"/>
                  <path d="M35.807 28.03l-7-4.03V23.5l7-4.03.158.09 8.299 4.716c2.371 1.346 2.371 3.551 0 4.897l-8.299 4.716z" fill="#FFCA28"/>
                  <path d="M35.965 28.03L28.8 21l-21.1 21.956a2.756 2.756 0 0 0 3.523.098z" fill="#F06292"/>
                  <path d="M35.965 19.97L11.223 5.945a2.756 2.756 0 0 0-3.523.098L28.8 27z" fill="#69F0AE"/>
                </svg>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[8px] leading-none font-extrabold uppercase tracking-wide text-slate-400 mb-0.5 truncate">Get it on</span>
                  <span className="text-[12px] sm:text-[13px] font-black leading-none tracking-tight truncate">Google Play</span>
                </div>
              </a>

              {/* App Store */}
              <a
                href="#download-ios"
                className="flex items-center justify-center sm:justify-start gap-2 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl px-3 py-2.5 sm:py-2 transition-all shadow-sm border border-slate-200/80 active:scale-95 group"
              >
                <svg viewBox="0 0 814 1000" className="w-4 h-5 shrink-0 group-hover:scale-110 transition-transform" fill="#1a1a1a">
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.3-150.3-86.4c-52.1-56.9-94.5-143.8-94.5-226.3 0-188.7 123.3-288.7 244.6-288.7 62.9 0 116.3 40.8 155.8 40.8 37.3 0 98.9-43 166.7-43 26.7 0 130.2 2.6 198.6 87.8zm-123.7-229c31.5-37.5 54.3-89.5 54.3-141.5 0-7.1-.6-14.3-1.9-20.1-51.5 1.9-112.3 34.2-149.2 75.8-28.5 32-56.3 83.9-56.3 136.5 0 7.7 1.3 15.5 1.9 17.9 3.2.6 8.4 1.3 13.6 1.3 46.2 0 101.8-31 137.6-69.9z"/>
                </svg>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[8px] leading-none font-extrabold tracking-wide text-slate-400 mb-0.5 truncate">Download on</span>
                  <span className="text-[12px] sm:text-[13px] font-black leading-none tracking-tight truncate">App Store</span>
                </div>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
