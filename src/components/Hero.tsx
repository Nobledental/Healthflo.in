"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [city, setCity] = useState("Detecting...");

  useEffect(() => {
    // Simulate city detection
    setTimeout(() => {
      setCity("New York");
    }, 1500);
  }, []);

  return (
    <section className="flex flex-col lg:flex-row items-center gap-16 min-h-[70vh]">
      <div className="w-full lg:w-1/2 flex flex-col z-30">
        <div className="flex items-center mb-6">
          <span className="text-[13px] font-semibold text-slate-700 mr-4 ml-2 uppercase tracking-widest">
            Excellence
          </span>
          <div className="px-5 py-2 rounded-full text-[14px] font-semibold bg-white/70 text-slate-800 flex items-center border border-white/50 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#0a84ff] mr-3"></span>
            City: <span className="ml-1 font-bold">{city}</span>
          </div>
        </div>
        <h1 className="text-[64px] lg:text-[84px] font-bold leading-[1.05] tracking-tight z-10 text-slate-900 mb-6">
          Search For Doctors, Specialities And Health Check Packages...
        </h1>
        <p className="text-slate-700 text-lg font-medium max-w-md leading-relaxed">
          Advanced robotic-assisted surgical centers delivering unmatched clinical outcomes with minimal recovery time.
        </p>
      </div>
      <div className="w-full lg:w-1/2 relative h-[500px]">
        <div className="heart-stage w-full h-full relative">
          <div className="rings"></div>
          <div className="radial-wave"></div>
          <div className="halo-glow"></div>
          <div className="node-dot" style={{ top: "25%", left: "48%" }}></div>
          <div className="node-dot" style={{ top: "50%", left: "32%" }}></div>
          <div className="node-dot" style={{ top: "65%", left: "52%" }}></div>
          <div className="node-dot" style={{ top: "45%", left: "68%" }}></div>
        </div>
      </div>
    </section>
  );
}
