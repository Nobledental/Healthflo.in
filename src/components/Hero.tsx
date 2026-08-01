"use client";

import { useEffect, useState } from "react";
import { Globe, GooglePlayLogo, AppleLogo, Lightning } from "@phosphor-icons/react";
import { useBattery } from "../hooks/useBattery";

export default function Hero() {
  const [city, setCity] = useState("Detecting...");
  const battery = useBattery();
  
  // Power saving triggers if battery < 20% and not charging
  const isLowPower = !battery.loading && battery.level <= 0.20 && !battery.charging;
  
  // Also allow manual override for demonstration
  const [manualPowerSave, setManualPowerSave] = useState(false);
  const powerSavingMode = isLowPower || manualPowerSave;

  useEffect(() => {
    // Simulate city detection
    setTimeout(() => {
      setCity("New York");
    }, 1500);
  }, []);

  return (
    <section className="flex flex-col items-center relative pt-24 pb-12 overflow-hidden w-full transition-colors duration-1000">
      
      {/* Optional Manual Toggle for Testing */}
      <button 
        onClick={() => setManualPowerSave(!manualPowerSave)}
        className="absolute top-6 right-6 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-slate-200 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 transition-colors text-slate-500 hover:text-slate-800"
      >
        <Lightning weight={powerSavingMode ? "fill" : "regular"} className={powerSavingMode ? "text-yellow-400" : ""} />
        Toggle Power Save (Testing)
      </button>

      <div className="w-full max-w-5xl flex flex-col items-center text-center z-30 px-6 lg:px-12 mb-4 transition-opacity duration-500">
        <div className="flex items-center justify-center mb-8">
          <span className="text-[13px] font-semibold mr-4 ml-2 uppercase tracking-widest text-slate-700">
            Excellence
          </span>
          <div className="px-5 py-2 rounded-full text-[14px] font-semibold flex items-center justify-center border shadow-sm backdrop-blur-md bg-white/70 border-white/50 text-slate-800">
            <span className={`w-2 h-2 rounded-full mr-3 ${powerSavingMode ? 'bg-red-500' : 'bg-[#0a84ff]'}`}></span>
            City: <span className="ml-1 font-bold">{city}</span>
          </div>
        </div>

        <h1 className="text-[52px] md:text-[64px] lg:text-[76px] font-bold leading-[1.1] tracking-tight z-10 mb-4 max-w-4xl mx-auto text-slate-900 flex items-center justify-center gap-0 flex-wrap mt-4">
          HealthFlo hospitals
        </h1>
        <h2 className="text-[28px] md:text-[36px] lg:text-[44px] font-normal leading-[1.3] tracking-tight z-10 mb-8 max-w-4xl mx-auto text-slate-700">
          <span className="block">India's Leading Multispecialty Healthcare Network</span>
          <span className="block mt-1 text-slate-500">AI assisted Advanced Health care.</span>
        </h2>
        
        <p className="text-[20px] lg:text-[22px] font-medium max-w-2xl mx-auto leading-relaxed mb-12 text-slate-600">
          Advanced robotic-assisted surgical centers delivering unmatched clinical outcomes with minimal recovery time.
        </p>

        <div className={`flex flex-wrap items-center justify-center gap-6 transition-all duration-500 ${powerSavingMode ? 'opacity-50 pointer-events-none scale-95' : 'opacity-100 scale-100'}`}>
          <button className="flex items-center justify-center gap-2 bg-[#0a84ff] hover:bg-blue-600 text-white rounded-xl px-6 py-4 transition-colors shadow-sm">
            <Globe weight="regular" className="text-2xl" />
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[10px] font-bold tracking-wider uppercase opacity-80 mb-0.5">Start now</span>
              <span className="text-[14px] font-bold">TRY IN WEB</span>
            </div>
          </button>
          
          <button className="flex items-center justify-center gap-3 bg-[#111418] hover:bg-black text-white rounded-xl px-6 py-4 transition-colors shadow-sm">
            <GooglePlayLogo weight="fill" className="text-2xl" />
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[10px] opacity-80 mb-0.5">GET IT ON</span>
              <span className="text-[15px] font-medium">Google Play</span>
            </div>
          </button>
          
          <button className="flex items-center justify-center gap-3 bg-[#111418] hover:bg-black text-white rounded-xl px-6 py-4 transition-colors shadow-sm">
            <AppleLogo weight="fill" className="text-2xl" />
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[10px] opacity-80 mb-0.5">Download on the</span>
              <span className="text-[15px] font-medium">App Store</span>
            </div>
          </button>
        </div>
      </div>


    </section>
  );
}
