"use client";

import React, { useState } from "react";
import { Clock, Droplet, Target, Smile, Sparkles, ShieldCheck, Award, CheckCircle2, Zap } from "lucide-react";

interface ZsrBenefitArchProps {
  procedureName?: string;
  isUrology?: boolean;
}

export default function ZsrBenefitArch({ procedureName = "Laser Circumcision", isUrology = true }: ZsrBenefitArchProps) {
  const [activeTab, setActiveTab] = useState<number>(2); // Default to center "Precise Incision"

  const benefits = [
    {
      id: 0,
      title: "Short procedure time",
      tagline: "15 to 20 Mins Daycare",
      desc: "Completed in a fraction of the time of conventional surgery, allowing you to return home within just 2 hours.",
      icon: Clock,
      color: "from-[#0050DD] to-blue-600",
      border: "border-blue-300/40 hover:border-blue-400",
      bgLight: "bg-gradient-to-b from-blue-900/40 via-slate-900/80 to-slate-900",
      textColor: "text-blue-300",
      accentBg: "bg-blue-500",
    },
    {
      id: 1,
      title: "Minimal bleeding",
      tagline: "Bloodless Sealing Protocol",
      desc: "Advanced ZSR compression & laser thermal vaporization instantly seals blood vessels, preventing surgical blood loss.",
      icon: Droplet,
      color: "from-emerald-500 to-teal-600",
      border: "border-emerald-300/40 hover:border-emerald-400",
      bgLight: "bg-gradient-to-b from-emerald-900/40 via-slate-900/80 to-slate-900",
      textColor: "text-emerald-300",
      accentBg: "bg-emerald-500",
    },
    {
      id: 2,
      title: "Precise incision",
      tagline: "Automated Micro-Accuracy",
      desc: "Calibrated circular cutting and simultaneous anastomosis protect all sensitive surrounding tissue with millimeter precision.",
      icon: Target,
      color: "from-[#1D3A6F] via-[#0050DD] to-indigo-600",
      border: "border-indigo-300/40 hover:border-indigo-400",
      bgLight: "bg-gradient-to-b from-indigo-900/40 via-slate-900/80 to-slate-900",
      textColor: "text-indigo-300",
      accentBg: "bg-indigo-500",
    },
    {
      id: 3,
      title: "Comfortable recovery",
      tagline: "Walk Home Same Day",
      desc: "Dramatically reduced post-operative discomfort. No raw wound exposure, ensuring a smooth, stress-free recovery at home.",
      icon: Smile,
      color: "from-purple-500 to-violet-600",
      border: "border-purple-300/40 hover:border-purple-400",
      bgLight: "bg-gradient-to-b from-purple-900/40 via-slate-900/80 to-slate-900",
      textColor: "text-purple-300",
      accentBg: "bg-purple-500",
    },
    {
      id: 4,
      title: "Better cosmetic appearance",
      tagline: "Stitch-Free Perfect Healing",
      desc: "Eliminates unsightly track scars or painful suture removal. Healing occurs smoothly with superior aesthetic symmetry.",
      icon: Sparkles,
      color: "from-amber-400 to-orange-500",
      border: "border-amber-300/40 hover:border-amber-400",
      bgLight: "bg-gradient-to-b from-amber-900/40 via-slate-900/80 to-slate-900",
      textColor: "text-amber-300",
      accentBg: "bg-amber-500",
    },
  ];

  const current = benefits[activeTab];

  return (
    <div className="w-full max-w-6xl mx-auto my-8 font-sans">
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0B172E] via-[#112244] to-[#0A1428] border-2 border-[#1E3A70] p-6 sm:p-10 shadow-2xl overflow-hidden text-white">
        {/* Background Ambient Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0050DD]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Badging */}
        <div className="relative z-10 text-center space-y-3 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/80 border border-amber-400/40 text-amber-300 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>High-Precision Clinical Protocol</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            The 5-Pillar Advantage for <span className="text-[#5293FF]">{procedureName}</span>
          </h3>
          <p className="text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto">
            Why thousands of patients select our advanced surgical protocols over conventional open techniques. Explore each clinical benefit below:
          </p>
        </div>

        {/* Radial / Arch Benefit Petals (Grid on all viewports for scan-friendly layout) */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {benefits.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeTab === idx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveTab(idx)}
                onClick={() => setActiveTab(idx)}
                className={`cursor-pointer rounded-2xl border ${item.border} ${item.bgLight} p-5 flex flex-col justify-between transition-all duration-300 relative group ${
                  isSelected ? "ring-2 ring-amber-400 scale-[1.02] shadow-xl bg-slate-800/90" : "opacity-85 hover:opacity-100"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-300" />
                    )}
                  </div>
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider ${item.textColor} block mb-1`}>
                    {item.tagline}
                  </span>
                  <h4 className="text-base font-black text-white leading-snug mb-2 group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs font-medium text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span>Pillar 0{idx + 1}</span>
                  <span className={isSelected ? "text-amber-300 font-extrabold" : "text-slate-500"}>
                    {isSelected ? "Active View" : "Click to view"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centerpiece Pedestal & Interactive Detail Box */}
        <div className="relative z-10 rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl overflow-hidden flex flex-col md:flex-row items-center gap-8">
          {/* Left: Animated Medical Instrument Pedestal Visual */}
          <div className="relative shrink-0 flex flex-col items-center justify-center">
            {/* Outer glowing rings */}
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-blue-600/30 to-emerald-500/20 flex items-center justify-center relative border border-slate-600/60 shadow-inner">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-slate-950 flex items-center justify-center relative border border-slate-700/80 shadow-2xl">
                {/* Center SVG Device representation */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-amber-400 via-amber-200 to-amber-100 flex items-center justify-center text-slate-900 shadow-xl mb-2">
                    <Zap className="w-9 h-9 text-[#1D3A6F] fill-[#1D3A6F]/20" />
                  </div>
                  <span className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
                    {isUrology ? "ZSR & Laser Suite" : "USFDA Laser Suite"}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">100% Single-Use Sterile</span>
                </div>
              </div>
              {/* Orbiting Badge */}
              <div className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md">
                NMC Approved Tech
              </div>
            </div>
          </div>

          {/* Right: Detailed Deep Dive on Selected Pillar */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-400/30 text-blue-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Deep-Dive: Why This Matters For Your Recovery</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
              <span>{current.title}</span>
              <span className="text-sm font-extrabold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {current.tagline}
              </span>
            </h4>
            <p className="text-slate-200 font-medium text-sm sm:text-base leading-relaxed">
              When undergoing {procedureName.toLowerCase()} with traditional scalpel techniques, patients frequently encounter delayed healing and unnecessary pain. By transitioning strictly to automated surgical instruments and precision laser optics, HealthFlo eliminates conventional incisions, ensuring <span className="text-emerald-300 font-bold">{current.desc.toLowerCase()}</span>
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Zero Overnight Stay Required</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Cashless TPA Insurance Covered</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="relative z-10 mt-8 text-center text-xs sm:text-sm font-semibold text-slate-300 bg-slate-950/60 rounded-xl py-3 px-4 border border-slate-800 max-w-2xl mx-auto">
          Every procedure is performed in an accredited Tier-1 facility by senior surgeons with over 15+ years of operative excellence.
        </div>
      </div>
    </div>
  );
}
