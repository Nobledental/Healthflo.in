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
      {/* High-Converting Traditional Medical Trust Block */}
      <div className="bg-gradient-to-b from-white via-[#FAF9F5] to-white border border-slate-200/90 rounded-[2.5rem] p-8 sm:p-12 md:p-14 text-[#1D3A6F] shadow-xl relative overflow-hidden">
        
        {/* Ambient traditional background glows */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-amber-50/70 via-sky-50/40 to-transparent rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-emerald-50/50 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Clear Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-[#1D3A6F] text-xs font-extrabold uppercase tracking-widest shadow-xs">
              <Building2 className="w-3.5 h-3.5 text-[#1D3A6F] shrink-0" />
              <span>Transparent Pricing &amp; Empanelled Network</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[2.8rem] font-black tracking-tight leading-tight text-[#1D3A6F]">
              World-Class Surgical Care,{" "}
              <span className="text-[#E58325] underline decoration-[#1D3A6F]/15 decoration-4 underline-offset-8">
                Matched to Your Budget.
              </span>
            </h2>

            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-bold">
              We partner with premier, NMC-registered hospital centers in <strong className="text-[#1D3A6F] font-black">{cityName}</strong>. Whether you select a standard day-care ward or a private AC executive suite for recovery, your surgery is performed exclusively by our <span className="text-[#E58325] font-black bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/80">senior surgical specialists (15+ years clinical expertise)</span> with <span className="text-emerald-900 font-black bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200/80">100% uncompromised USFDA clinical precision</span>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm font-bold text-slate-700">
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                No Hidden Fees or Upfront Surprises
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                100% Cashless TPA &amp; 0% EMI Support
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-2 rounded-xl border border-slate-200/90 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-[#E58325] shrink-0" />
                Speak in {langLabel}
              </span>
            </div>
          </div>

          {/* Right Column: High-Intent Action Block */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white border-2 border-slate-200/90 rounded-[2.2rem] p-7 sm:p-8 space-y-6 shadow-xl hover:border-[#1D3A6F]/30 transition-all text-center sm:text-left">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-900 text-xs font-extrabold uppercase tracking-wider border border-emerald-200/80 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Instant Price Breakdown</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#1D3A6F]">
                  Get a Custom Price Estimate in 5 Minutes
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  Share your preferred hospital location in {cityName} and insurance details with our clinical coordinator for a real-time, line-by-line cost estimate.
                </p>
              </div>

              <div className="pt-2 space-y-3.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-[#1D3A6F] hover:bg-[#152C55] text-white font-black text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 active:scale-95"
                  title="Request custom pricing calculation"
                >
                  <Calculator className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Get Custom Price Estimate</span>
                  <ChevronRight className="w-4 h-4 text-white shrink-0" />
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-sm sm:text-base transition-all shadow-[0_6px_20px_rgba(37,211,102,0.25)] hover:shadow-lg flex items-center justify-center gap-2 active:scale-95"
                  title="Chat directly with coordinator on WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-white shrink-0" />
                  <span>Ask a Coordinator in {langLabel}</span>
                </a>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-slate-500 font-bold">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% Confidential. Your medical data is strictly protected.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
