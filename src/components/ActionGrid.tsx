"use client";

import { MagnifyingGlass, ArrowCircleRight } from "@phosphor-icons/react";

export default function ActionGrid() {
  return (
    <section className="w-full flex flex-col gap-8 mt-12">
      {/* Search Bar */}
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="glass-card bg-[#003344]/80 backdrop-blur-xl border-2 border-white rounded-full p-2 flex items-center shadow-2xl">
          <input
            className="bg-transparent border-none focus:ring-0 text-white placeholder-white/70 text-lg px-6 w-full font-medium"
            placeholder="Search For Doctors, Specialities And Health Check Packages..."
            type="text"
          />
          <button className="bg-[#ff8a00] hover:bg-[#ff9a20] w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg mr-1">
            <MagnifyingGlass weight="bold" className="text-white text-xl" />
          </button>
        </div>
      </div>
      
      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 rounded-2xl overflow-hidden border-2 border-[#e2e8f0] shadow-sm">
        <div className="bg-[#fdfbf7] p-6 flex items-center justify-between border-r border-[#e2e8f0] hover:bg-white transition-colors cursor-pointer group">
          <span className="text-slate-900 font-bold text-[18px]">Book Appointment</span>
          <ArrowCircleRight className="text-2xl text-slate-400 group-hover:text-[#0a84ff] transition-colors" />
        </div>
        <div className="bg-[#fdfbf7] p-6 flex items-center justify-between border-r border-[#e2e8f0] hover:bg-white transition-colors cursor-pointer group">
          <span className="text-slate-900 font-bold text-[18px]">Find Hospital</span>
          <ArrowCircleRight className="text-2xl text-slate-400 group-hover:text-[#0a84ff] transition-colors" />
        </div>
        <div className="bg-[#fdfbf7] p-6 flex items-center justify-between border-r border-[#e2e8f0] hover:bg-white transition-colors cursor-pointer group">
          <span className="text-slate-900 font-bold text-[18px]">Book Health Check</span>
          <ArrowCircleRight className="text-2xl text-slate-400 group-hover:text-[#0a84ff] transition-colors" />
        </div>
        <div className="bg-[#fdfbf7] p-6 flex items-center justify-between hover:bg-white transition-colors cursor-pointer group">
          <span className="text-slate-900 font-bold text-[18px]">Get Expert Opinion</span>
          <ArrowCircleRight className="text-2xl text-slate-400 group-hover:text-[#0a84ff] transition-colors" />
        </div>
      </div>
      
      {/* Subtitle */}
      <div className="text-center lg:text-left">
        <h3 className="text-slate-500 font-semibold text-[16px] tracking-wide">
          Clinical Excellence at HealthFlo Hospitals – India’s Leading Multispeciality Healthcare Network
        </h3>
      </div>
    </section>
  );
}
