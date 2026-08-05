"use client";

import React from "react";
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  Sparkles,
  Lock,
  ChevronRight,
  Calculator,
  MessageCircle
} from "lucide-react";

interface HospitalTierBudgetSectionProps {
  procedureTitle?: string;
  cityName?: string;
  nativeLanguage?: string;
  whatsappUrl?: string;
}

export default function HospitalTierBudgetSection({
  procedureTitle = "Advanced Minimally Invasive Surgery",
  cityName = "your city",
  nativeLanguage = "Tamil",
  whatsappUrl = "https://wa.me/919876543210?text=Hello%2C%20I%20want%20a%20custom%20price%20estimate%20and%20hospital%20options%20near%20me.",
}: HospitalTierBudgetSectionProps) {
  const isTamil = nativeLanguage === "Tamil" || nativeLanguage?.toLowerCase().includes("tamil");
  const isKannada = nativeLanguage === "Kannada";
  const isTelugu = nativeLanguage === "Telugu";
  const nativeTag = isTamil ? "(தமிழ்)" : isKannada ? "(ಕನ್ನಡ)" : isTelugu ? "(తెలుగు)" : "";
  const langLabel = nativeTag ? `${nativeLanguage} ${nativeTag}` : nativeLanguage;

  return (
    <section className="my-12 font-sans">
      {/* High-Converting Trust Block for Google Ads Landing Pages */}
      <div className="bg-gradient-to-br from-[#0A1122] via-[#0E1A33] to-[#0A1122] border border-slate-800 rounded-[2.5rem] p-8 sm:p-12 md:p-14 text-white shadow-2xl relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/40 text-cyan-300 text-xs font-black uppercase tracking-widest shadow-sm">
              <Building2 className="w-3.5 h-3.5 shrink-0" />
              <span>Transparent Pricing &amp; Empanelled Network</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white">
              World-Class Surgical Care,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400">
                Matched to Your Budget.
              </span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
              We partner with premier, NMC-registered hospital centers in <strong className="text-white font-bold">{cityName}</strong>. Whether you select a standard day-care ward or a private AC executive suite for recovery, your surgery is performed exclusively by our <strong className="text-amber-300 font-extrabold">senior surgical specialists (15+ years clinical expertise)</strong> with <strong className="text-emerald-300 font-bold">100% uncompromised USFDA clinical precision</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm font-bold text-slate-300">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                No Hidden Fees or Upfront Surprises
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                100% Cashless TPA &amp; 0% EMI Support
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3.5 py-2 rounded-xl border border-slate-700">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                Speak in {langLabel}
              </span>
            </div>
          </div>

          {/* Right Column: High-Intent Action Block */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-[#0A1325]/95 backdrop-blur-xl border border-slate-700/80 rounded-[2.2rem] p-7 sm:p-8 space-y-6 shadow-2xl text-center sm:text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant Price Breakdown</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Get a Custom Price Estimate in 5 Minutes
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                  Share your preferred hospital location in {cityName} and insurance details with our clinical coordinator for a real-time, line-by-line cost estimate.
                </p>
              </div>

              <div className="pt-2 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0066FF] to-blue-600 hover:from-blue-600 text-white font-black text-base transition-all shadow-[0_10px_35px_rgba(0,102,255,0.4)] flex items-center justify-center gap-2.5 active:scale-95 border border-blue-400"
                >
                  <Calculator className="w-5 h-5 text-white shrink-0" />
                  <span>Get Custom Price Estimate</span>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-sm transition-all border border-slate-700 flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Ask a Coordinator in {langLabel}</span>
                </a>
              </div>

              <div className="pt-2 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-400 font-semibold">
                <Lock className="w-3.5 h-3.5 text-[#00E5FF] shrink-0" />
                <span>100% Confidential. Your medical data is strictly protected.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
