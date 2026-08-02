"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Globe, GooglePlayLogo, AppleLogo, Lightning } from "@phosphor-icons/react";
import { useBattery } from "../hooks/useBattery";

export default function Hero() {
  const [city, setCity] = useState("Detecting...");
  const battery = useBattery();
  
  // Power saving triggers if battery < 20% and not charging
  const isLowPower = !battery.loading && battery.level <= 0.20 && !battery.charging;
  const powerSavingMode = isLowPower;

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.city) setCity(data.city);
        else setCity("Unknown");
      })
      .catch(() => setCity("Unknown"));
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] relative py-8 overflow-hidden w-full transition-colors duration-1000">
      
      {/* Top Indicators - Moved to sides */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 md:px-8 z-20">
        <span className="text-[13px] font-semibold uppercase tracking-widest text-slate-700">
          Excellence
        </span>
        <div className="px-4 py-1.5 rounded-full text-[13px] font-semibold flex items-center justify-center border shadow-sm backdrop-blur-md bg-white/70 border-white/50 text-slate-800">
          <span className={`w-2 h-2 rounded-full mr-2 ${powerSavingMode ? 'bg-red-500' : 'bg-[#0a84ff]'}`}></span>
          City: <span className="ml-1 font-bold">{city}</span>
        </div>
      </div>

      <div className="w-full max-w-7xl flex flex-col items-center text-center z-30 px-6 lg:px-12 mb-2 transition-opacity duration-500">

        <h1 className="text-[52px] md:text-[64px] lg:text-[76px] font-extrabold leading-[1.1] tracking-tighter z-10 mb-2 max-w-4xl mx-auto flex items-center justify-center gap-0 flex-wrap bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600">
          HealthFlo Hospital
        </h1>
        <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium leading-[1.4] tracking-tight z-10 mb-4 max-w-3xl mx-auto text-slate-700 mt-2">
          <span className="block">India's Leading Multispecialty Healthcare Network</span>
        </h2>


        <p className="text-[16px] lg:text-[18px] font-normal max-w-2xl mx-auto leading-relaxed mb-6 text-slate-500">
          Advanced robotic-assisted surgical centers delivering unmatched clinical outcomes with minimal recovery time.
        </p>

        <style>{`
          @keyframes slide-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        
        <div className="w-full max-w-[100vw] overflow-hidden relative mb-8 flex items-center group [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-5 border-y border-slate-200/50 dark:border-slate-800/50">
          <div className="flex whitespace-nowrap items-center" style={{ animation: 'slide-marquee 25s linear infinite', width: 'max-content' }}>
            {[...Array(2)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center">
                {['Cardiology', 'Neurology', 'Orthopedics', 'Oncology', 'Pediatrics', 'Gastroenterology', 'Urology', 'Pulmonology'].map((specialty, i) => (
                  <div key={i} className="inline-flex items-center px-8 group/item cursor-pointer">
                    <span className="text-slate-600 dark:text-slate-400 font-bold text-[14px] md:text-[16px] tracking-widest uppercase group-hover/item:text-[#0a84ff] transition-colors duration-300">
                      {specialty}
                    </span>
                    {/* Real separator in flex */}
                    <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-700 ml-16 opacity-50"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={`w-full mx-auto bg-gradient-to-r from-[#d4e9ff] to-[#bed8ff] dark:from-slate-800 dark:to-slate-900 rounded-2xl p-4 md:px-8 md:py-5 flex flex-col xl:flex-row items-center justify-between gap-6 transition-all duration-500 shadow-sm border border-blue-200/50 dark:border-slate-700/50 ${powerSavingMode ? 'opacity-50 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
          <div className="text-left flex-1 min-w-[250px] flex flex-col gap-2 items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 dark:bg-blue-900/30 border border-white/50 dark:border-blue-700/50 shadow-sm backdrop-blur-md hover:bg-white/60 transition-colors cursor-pointer">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider">
                Explore 15+ Advanced Medical Specialties
              </span>
              <span className="text-blue-600 ml-0.5 font-bold text-[10px]">→</span>
            </div>
            <p className="text-[15px] md:text-[18px] font-medium text-slate-800 dark:text-slate-200 leading-snug">
              Your personal AI health assistant, <span className="text-[#0a84ff] font-semibold">bringing expert care to your hands.</span>
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 flex-shrink-0">
            <button className="flex items-center justify-center gap-2 bg-[#0a84ff] hover:bg-blue-600 text-white rounded-xl px-5 py-2.5 transition-colors shadow-sm">
              <Globe weight="regular" className="text-xl" />
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-[9px] font-bold tracking-wider uppercase opacity-80 mb-0.5">Start now</span>
                <span className="text-[13px] font-bold">TRY IN WEB</span>
              </div>
            </button>
            
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-5 py-2.5 transition-colors shadow-sm">
              <GooglePlayLogo weight="fill" className="text-xl text-slate-700" />
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-[9px] font-semibold opacity-70 mb-0.5">GET IT ON</span>
                <span className="text-[13px] font-bold">Google Play</span>
              </div>
            </button>
            
            <button className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-xl px-5 py-2.5 transition-colors shadow-sm">
              <AppleLogo weight="fill" className="text-xl text-slate-700" />
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-[9px] font-semibold opacity-70 mb-0.5">Download on the</span>
                <span className="text-[13px] font-bold">App Store</span>
              </div>
            </button>
          </div>
        </div>
      </div>


    </section>
  );
}
