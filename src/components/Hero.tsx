"use client";

import { Globe, GooglePlayLogo, AppleLogo } from "@phosphor-icons/react";

export default function Hero() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between min-h-[85vh] pt-12">
      <div className="w-full lg:w-1/2 flex flex-col z-30 px-12">
        <h1 className="text-[56px] lg:text-[72px] font-bold leading-[1.1] tracking-tight z-10 text-slate-900 mb-6">
          VOKA 3D Anatomy<br />&amp; Pathology
        </h1>
        <p className="text-slate-600 text-[20px] font-medium max-w-md leading-relaxed mb-10">
          Designed to make medical education better
        </p>
        
        <div className="flex flex-wrap items-center gap-4">
          <button className="flex items-center justify-center gap-2 bg-[#0a84ff] hover:bg-blue-600 text-white rounded-xl px-5 py-3 transition-colors shadow-sm">
            <Globe weight="regular" className="text-2xl" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] font-bold tracking-wider uppercase opacity-80 mb-0.5">Start now</span>
              <span className="text-[14px] font-bold">TRY IN WEB</span>
            </div>
          </button>
          
          <button className="flex items-center justify-center gap-3 bg-[#111418] hover:bg-black text-white rounded-xl px-5 py-3 transition-colors shadow-sm">
            <GooglePlayLogo weight="fill" className="text-2xl" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] opacity-80 mb-0.5">GET IT ON</span>
              <span className="text-[15px] font-medium">Google Play</span>
            </div>
          </button>
          
          <button className="flex items-center justify-center gap-3 bg-[#111418] hover:bg-black text-white rounded-xl px-5 py-3 transition-colors shadow-sm">
            <AppleLogo weight="fill" className="text-2xl" />
            <div className="flex flex-col items-start leading-none">
              <span className="text-[10px] opacity-80 mb-0.5">Download on the</span>
              <span className="text-[15px] font-medium">App Store</span>
            </div>
          </button>
        </div>
      </div>
      
      <div className="w-full lg:w-1/2 relative h-[600px]">
        <div className="heart-stage w-full h-full relative">
          <div className="rings"></div>
          <div className="radial-wave"></div>
          <div className="halo-glow"></div>
          
          {/* Right atrium node */}
          <div className="absolute" style={{ top: "45%", left: "32%" }}>
            <div className="node-dot"></div>
            <div className="absolute -top-[80px] -left-[140px] flex items-end">
              <div className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1.5 shadow-sm rounded-sm">Right atrium</div>
              <div className="w-[100px] h-[1px] bg-white/60 origin-bottom-left -rotate-[35deg]"></div>
            </div>
          </div>
          
          {/* Aortic valve stenosis node */}
          <div className="absolute" style={{ top: "60%", left: "60%" }}>
            <div className="node-dot"></div>
            <div className="absolute -top-[160px] ml-4 flex items-end">
              <div className="w-[120px] h-[1px] bg-white/60 origin-bottom-left -rotate-[50deg]"></div>
              <div className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1.5 shadow-sm rounded-sm absolute -top-[95px] left-[75px] whitespace-nowrap">Aortic valve stenosis</div>
            </div>
          </div>
          
          {/* Hypertrophy node */}
          <div className="absolute" style={{ top: "75%", left: "75%" }}>
            <div className="node-dot"></div>
            <div className="absolute -top-[100px] ml-2 flex items-end">
              <div className="w-[60px] h-[1px] bg-white/60 origin-bottom-left -rotate-[75deg]"></div>
              <div className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1.5 shadow-sm rounded-sm absolute -top-[65px] left-[15px]">Hypertrophy</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
