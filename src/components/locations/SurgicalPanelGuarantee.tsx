"use client";

import React from "react";
import { Award, ShieldCheck, Stethoscope, UserCheck, CheckCircle2, Quote } from "lucide-react";
import Image from "next/image";

interface SurgicalPanelGuaranteeProps {
  cityName: string;
  stateName?: string;
  procedureTitle: string;
  procedureSlug?: string;
}

export default function SurgicalPanelGuarantee({
  cityName,
  stateName = "Tamil Nadu",
  procedureTitle,
  procedureSlug = "",
}: SurgicalPanelGuaranteeProps) {
  // Determine specialized title based on procedure
  const text = (procedureTitle + " " + procedureSlug).toLowerCase();
  let specialtyTitle = "Senior Laser Proctologist";
  let fieldName = "Advanced Proctology";

  if (text.includes("circumcision") || text.includes("foreskin") || text.includes("phimosis") || text.includes("urology") || text.includes("men")) {
    specialtyTitle = "Senior Urological & Laser Surgeon";
    fieldName = "Advanced Urological & Laser Protocols";
  } else if (text.includes("hernia") || text.includes("laparoscopic") || text.includes("gallbladder") || text.includes("appendix")) {
    specialtyTitle = "Senior Laparoscopic & General Specialist";
    fieldName = "Advanced Laparoscopic & General Surgery";
  } else if (text.includes("vein") || text.includes("varicosities") || text.includes("vascular")) {
    specialtyTitle = "Senior Endovascular & Laser Specialist";
    fieldName = "Advanced Endovascular & Laser Ablation";
  } else if (text.includes("piles") || text.includes("fissure") || text.includes("fistula") || text.includes("anorectal") || text.includes("proctology")) {
    specialtyTitle = "Senior Laser Proctologist";
    fieldName = "Advanced Laser Proctology";
  } else {
    specialtyTitle = "Senior Minimally Invasive Laser Specialist";
    fieldName = "Advanced Minimally Invasive Surgery";
  }

  return (
    <section aria-labelledby="surgical-panel-title" className="w-full relative z-10">
      <div className="bg-gradient-to-b from-[#F4F7FB] via-[#FAFCFF] to-[#F4F7FB] border border-slate-200/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-[#0050DD]/20 text-xs font-extrabold text-[#0050DD] uppercase tracking-wider shadow-2xs mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>NMC Vetted Surgical Excellence</span>
          </div>
          <h2 id="surgical-panel-title" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1D3A6F] tracking-tight leading-tight">
            Consult with {cityName}’s Most Qualified Surgical Panel.
          </h2>
          <p className="mt-3 text-sm sm:text-base font-semibold text-slate-600">
            We provide direct, verified access to senior board-certified specialists and Tier-1 surgical leadership in {cityName}, ensuring empathetic and personalized care.
          </p>
        </div>

        {/* 2-Column Grid: Surgeon Profile & Vetting Protocol */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Left Column: Blind Credential Profile */}
          <div className="lg:col-span-6 bg-white border-2 border-slate-200/90 rounded-2xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(29,58,111,0.06)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 via-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />
            
            <div>
              {/* Premium Vector Icon Badge & Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1D3A6F] to-[#0050DD] p-0.5 shadow-md shrink-0 flex items-center justify-center relative">
                  <div className="w-full h-full bg-[#11254A] rounded-[14px] flex items-center justify-center">
                    <UserCheck className="w-8 h-8 text-amber-400 stroke-[2]" />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                    <Award className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                  </span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#1D3A6F] leading-tight">
                    {specialtyTitle}
                    <span className="block text-sm sm:text-base text-[#0050DD] font-extrabold mt-0.5">
                      ({cityName} Network)
                    </span>
                  </h3>
                  <div className="inline-block mt-1 px-2.5 py-0.5 bg-amber-50 border border-amber-300/60 rounded-md text-xs font-black text-amber-900 tracking-wide">
                    Senior Empanelled Surgical Specialists
                  </div>
                </div>
              </div>

              {/* Stats Layout */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100/80 gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Experience:</span>
                  <span className="text-sm sm:text-base font-black text-slate-800 text-right">10 to 15+ Years in {fieldName}</span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100/80 gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Surgical Volume:</span>
                  <span className="text-sm sm:text-base font-black text-[#0050DD] text-right">3,000+ Successful Network Procedures</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-slate-100/80 gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Background:</span>
                  <span className="text-sm sm:text-base font-extrabold text-slate-800 text-right">Senior Consultants &amp; HODs at empanelled centers</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Accreditation:</span>
                  <span className="text-sm sm:text-base font-black text-emerald-700 text-right flex items-center justify-end gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 inline" />
                    <span>NMC-Registered & USFDA Laser Certified</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Availability Banner */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="w-full bg-emerald-50/90 border border-emerald-200/80 rounded-xl py-2.5 px-4 text-center">
                <p className="text-xs sm:text-sm font-black text-emerald-800 flex items-center justify-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>(Available for consultation via Healthflo)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Vetting Protocol Guarantee */}
          <div className="lg:col-span-6 bg-gradient-to-br from-white via-[#FAFCFF] to-emerald-50/30 border-2 border-emerald-200/70 rounded-2xl p-6 sm:p-7 shadow-[0_4px_25px_rgba(16,185,129,0.08)] flex flex-col justify-between relative">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 border border-emerald-300/60 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#1D3A6F] tracking-tight">
                  The HealthFlo Surgeon Guarantee
                </h3>
              </div>

              <p className="text-sm sm:text-base font-medium text-slate-600 leading-relaxed mb-6">
                To uphold our commitment to clinical excellence, every specialist empanelled in our <span className="font-bold text-slate-800">{cityName} network</span> undergoes rigorous credential verification and standard-of-care alignment:
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-lg shrink-0 select-none">✔️</span>
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-slate-800 block">
                      Proven post-MS/MCh clinical excellence &amp; senior expertise.
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Ensuring mature surgical precision, patient safety, and exceptional diagnostic accuracy.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-lg shrink-0 select-none">✔️</span>
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-slate-800 block">
                      Proven track record of superior surgical outcomes.
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Continuous peer-reviewed clinical audits and systematic patient outcome tracking.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-lg shrink-0 select-none">✔️</span>
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-slate-800 block">
                      Specialized fellowship training in minimally invasive laser protocols.
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Mastery over high-precision laser therapy and gentle recovery techniques.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-lg shrink-0 select-none">✔️</span>
                  <div>
                    <span className="text-sm sm:text-base font-extrabold text-slate-800 block">
                      Mandatory adoption of USFDA-approved laser technologies.
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Ensuring high-precision tissue conservation, enhanced clinical precision, and optimal recovery timelines.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-100">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Clinical Audit Status: <strong className="text-emerald-700">Verified Active</strong></span>
                <span>Standard of Care: <strong className="text-[#0050DD]">100% Compliant</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Block: Clinical Director Quote (Face of Quality) */}
        <div className="bg-gradient-to-r from-[#1D3A6F] via-[#11254A] to-[#1D3A6F] rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-4 bottom-0 select-none pointer-events-none opacity-10">
            <Stethoscope className="w-48 h-48 text-white" />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 max-w-4xl mx-auto">
            {/* Medical Director Authority Badge & Avatar */}
            <div className="flex flex-col items-center text-center shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-50 p-1 shadow-xl relative mb-2">
                <div className="w-full h-full rounded-full bg-slate-900 border-2 border-white overflow-hidden flex items-center justify-center">
                  <Stethoscope className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 stroke-[1.8]" />
                </div>
                <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
              <span className="text-sm font-black text-amber-300 tracking-tight">HealthFlo Medical Board</span>
              <span className="text-[11px] font-bold text-blue-200 leading-tight">Clinical Audit Committee</span>
            </div>

            {/* Quote Copy */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 mb-2">
                <Quote className="w-5 h-5 rotate-180 shrink-0 opacity-80" />
                <span className="text-xs font-black uppercase tracking-widest text-amber-300/90">
                  Message from our Medical Directorate
                </span>
              </div>
              <blockquote className="text-base sm:text-lg md:text-xl font-medium text-slate-100 italic leading-relaxed">
                &ldquo;Our mission is to bring identical, world-class surgical precision to every patient in {stateName}, removing the anxiety of hospital billing and ensuring you are operated on only by the region&apos;s elite surgeons.&rdquo;
              </blockquote>
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-blue-200 font-semibold gap-1">
                <span>Chief Medical Officer &amp; Clinical Director — <strong className="text-white font-extrabold">HealthFlo Ventures</strong></span>
                <span>Clinical Oversight for {cityName} Surgical Network</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
