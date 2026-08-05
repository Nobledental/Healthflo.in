"use client";

import { useBattery } from "../hooks/useBattery";
import { useVisitorLocation } from "../hooks/useVisitorLocation";
import dynamic from "next/dynamic";
import { Sparkles, ShieldCheck, Phone, Search } from "lucide-react";

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
  const { city } = useVisitorLocation();
  const battery = useBattery();

  const isLowPower = !battery.loading && battery.level <= 0.20 && !battery.charging;
  const powerSavingMode = isLowPower;

  return (
    <section className="flex flex-col items-center relative pb-8 overflow-hidden w-full transition-colors duration-1000">
      {/* 3D Medical Model Background — ONLY on Desktop (>=1024px) */}
      {!powerSavingMode && <Hero3DBackground />}

      {/* Top Indicators Bar */}
      <div className="w-full max-w-7xl flex justify-between items-center px-4 md:px-8 pt-2 mb-6 sm:mb-10 z-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 backdrop-blur-md border border-blue-200/80 text-[#0066FF] text-[11px] sm:text-[13px] font-extrabold tracking-wide shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="truncate">India&apos;s #1 Laser Surgical Care Network</span>
        </div>

        <div className="px-3.5 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold flex items-center justify-center border shadow-sm backdrop-blur-xl bg-white/80 border-slate-200/80 text-slate-800 shrink-0">
          <span className={`w-2 h-2 rounded-full mr-2 ${powerSavingMode ? "bg-red-500" : "bg-[#0066FF]"}`} />
          <span>{city}</span>
        </div>
      </div>

      <div className="w-full max-w-7xl flex flex-col items-center text-center z-30 px-4 sm:px-6 lg:px-12 mb-4 transition-opacity duration-500 pt-4 md:pt-10">

        {/* H1 Headline */}
        <h1 className="text-[38px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-bold leading-[1.08] tracking-tight z-10 mb-3 max-w-4xl mx-auto text-slate-900 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center">
            <span className="font-bold">Health</span>
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0055ff] via-[#0088ff] to-[#00A88F]">Flo</span>
          </span>
          <span className="font-bold">Hospitals</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[15px] sm:text-[19px] md:text-[21px] font-normal text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6 px-2">
          Advanced Laser Surgical Care <span className="text-slate-300 hidden sm:inline">•</span><span className="block sm:inline text-[#0066FF] font-semibold"> Zero Pain</span> <span className="text-slate-300 hidden sm:inline">•</span><span className="block sm:inline"> Same-Day Discharge</span>
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
                    <span className="text-slate-700 font-extrabold text-[12px] md:text-[14px] uppercase tracking-wider hover:text-[#00A88F] transition-colors">
                      {t}
                    </span>
                    <div className={`w-1 h-1 rounded-full ${i % 2 === 0 ? "bg-[#0066FF]" : "bg-[#00A88F]"} ml-10 md:ml-16 opacity-75`} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* AI Health Assistant Hub Card — Voka Wiki Theme with Vibrant Action Colors */}
        <div className={`w-full max-w-5xl mx-auto bg-gradient-to-r from-[#ccefed] via-[#d7f5f5] to-[#c6ebf5] rounded-[32px] p-5 sm:p-7 md:px-9 md:py-7 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 shadow-[0_15px_50px_rgba(6,122,123,0.15)] border border-[#9edee0] transition-all duration-500 ${powerSavingMode ? "opacity-50 pointer-events-none scale-95" : "opacity-100 scale-100"}`}>
          
          <div className="text-left flex-1 min-w-0 flex flex-col gap-2.5 items-start w-full">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#82d4d6] shadow-2xs text-[#067A7B] text-[11px] font-bold uppercase tracking-wide">
              <Sparkles className="w-3.5 h-3.5 fill-[#067A7B] text-[#067A7B]" />
              <span>AI Care Assistant • Instant Triage</span>
            </div>
            <p className="text-[17px] sm:text-[20px] md:text-[22px] font-semibold text-[#062c2d] leading-snug tracking-tight">
              Get instant surgical triage &amp; pricing, <span className="font-bold text-[#067A7B]">pre-approved on your phone.</span>
            </p>
            {/* Small Apple & Google Play App Badges */}
            <div className="flex items-center gap-2 pt-1">
              <a 
                href="#download-ios" 
                onClick={(e) => { e.preventDefault(); alert("HealthFlo iOS App is currently in clinical beta for surgical care coordinators. Triage web desk is fully active!"); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0a2540] hover:bg-[#0055ff] text-white text-[11px] font-extrabold tracking-wide shadow-sm border border-[#0a2540]/40 hover:scale-[1.03] transition-all"
                title="Download on Apple App Store"
              >
                <svg className="w-3.5 h-3.5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.64-.78 1.08-1.87.96-2.96-.93.04-2.07.62-2.73 1.39-.59.67-1.12 1.77-.98 2.84 1.04.08 2.11-.49 2.75-1.27z"/>
                </svg>
                <span>App Store</span>
              </a>
              <a 
                href="#download-android" 
                onClick={(e) => { e.preventDefault(); alert("HealthFlo Android App is currently in clinical beta for surgical care coordinators. Triage web desk is fully active!"); }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0a2540] hover:bg-[#0055ff] text-white text-[11px] font-extrabold tracking-wide shadow-sm border border-[#0a2540]/40 hover:scale-[1.03] transition-all"
                title="Get it on Google Play"
              >
                <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 512 512">
                  <path fill="#4285F4" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"/>
                  <path fill="#34A853" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"/>
                  <path fill="#FBBC05" d="M430.8 290.7l-45.4 26-60.1-60.1 60.1-60.1 45.4 26c28.5 16.3 28.5 42.9 0 59.2z"/>
                  <path fill="#EA4335" d="M325.3 277.7L104.6 499l280.8-161.2-60.1-60.1z"/>
                </svg>
                <span>Google Play</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-start xl:justify-end gap-3 shrink-0 w-full xl:w-auto">

            {/* Voka Deep Teal CTA — Book Consultation */}
            <a
              href="#lead-capture"
              className="flex-1 sm:flex-none flex items-center justify-between gap-3.5 bg-[#067A7B] hover:bg-[#056263] text-white rounded-full pl-6 pr-2 py-2 transition-all shadow-[0_6px_22px_rgba(6,122,123,0.35)] active:scale-[0.96] font-bold text-[14.5px] group shrink-0"
            >
              <span>Book Free Consultation</span>
              <span className="w-8 h-8 rounded-full bg-white text-[#067A7B] flex items-center justify-center shadow-xs group-hover:rotate-45 transition-transform duration-300">
                <svg className="w-4 h-4 text-[#067A7B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </span>
            </a>

            {/* Yellow Phone Action Button (Image 3 Reference) */}
            <a
              href="tel:+918069044848"
              title="Call Instant Surgery Helpline"
              className="w-12 h-12 rounded-full bg-[#0055ff] hover:bg-blue-700 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(0,85,255,0.4)] transition-transform transform hover:scale-105 active:scale-95 shrink-0"
            >
              <Phone className="w-5 h-5 fill-white text-white" />
            </a>

            {/* Orange Search Action Button (Image 3 Reference) */}
            <a
              href="#specialized-treatments"
              title="Search Surgeries & Pricing"
              className="w-12 h-12 rounded-full bg-[#0a2540] hover:bg-slate-800 text-white flex items-center justify-center shadow-[0_4px_16px_rgba(10,37,64,0.35)] transition-transform transform hover:scale-105 active:scale-95 shrink-0"
            >
              <Search className="w-5 h-5 stroke-[2.5]" />
            </a>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/918069044848"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-900 rounded-full px-5 py-3 transition-all shadow-sm border border-slate-200 active:scale-95 font-bold text-[14px] shrink-0"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366] shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp Now</span>
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
