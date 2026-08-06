"use client";

import React from "react";
import { ShieldCheck, UserCheck, Sparkles, CheckCircle2, Clock, Building2, Award, Wallet } from "lucide-react";
import ZsrBenefitArch from "@/components/treatments/ZsrBenefitArch";

interface PatientJourneyStepsProps {
  cityName: string;
  nativeLanguage?: string;
  whatsappUrl?: string;
  procedureTitle?: string;
  procedureSlug?: string;
}

export default function PatientJourneySteps({
  cityName,
  nativeLanguage = "English",
  whatsappUrl,
  procedureTitle,
  procedureSlug,
}: PatientJourneyStepsProps) {
  const isTamil = nativeLanguage === "Tamil";
  const isKannada = nativeLanguage === "Kannada";
  const isTelugu = nativeLanguage === "Telugu";
  const nativeTag = isTamil ? "(தமிழ்)" : isKannada ? "(ಕನ್ನಡ)" : isTelugu ? "(తెలుగు)" : `(${nativeLanguage})`;

  const steps = [
    {
      stepNumber: "01",
      title: "Confidential Care Discussion",
      badge: `Private & Discreet ${nativeTag}`,
      description: `Speak openly with our dedicated ${cityName} care coordinator. We explain your procedure, review TPA cashless insurance eligibility, and provide complete transparent pricing in minutes without judgment.`,
      icon: ShieldCheck,
      color: "from-[#1D3A6F] to-blue-800",
      badgeClass: "bg-blue-50 border-blue-200/80 text-blue-900",
      border: "border-blue-200/80",
    },
    {
      stepNumber: "02",
      title: "VIP Hospital Concierge",
      badge: "Express TPA Desk",
      description: `No long admission queues or billing friction. Your personal clinical guide assists with direct admission, paperwork, diagnostics, and 100% cashless pre-authorization across major insurance partners.`,
      icon: UserCheck,
      color: "from-[#0050DD] to-blue-600",
      badgeClass: "bg-blue-50 border-blue-200/80 text-blue-900",
      border: "border-slate-200/90",
    },
    {
      stepNumber: "03",
      title: "Minimally Invasive Recovery",
      badge: "Same-Day Discharge",
      description: `Undergo an advanced USFDA laser or ZSR procedure designed for comfort and precision. Walk home comfortably in just a few hours with complimentary cab transit and zero family stress.`,
      icon: Sparkles,
      color: "from-emerald-600 to-teal-700",
      badgeClass: "bg-emerald-50 border-emerald-200/80 text-emerald-900",
      border: "border-slate-200/90",
    },
  ];

  return (
    <section className="py-8 my-4 font-sans">
      
      {/* ── HEALTHFLO CARE GLIMPSE ADVANTAGE BAR (SHORT, SWEET & PASTEL) ────────────── */}
      <div className="mb-14 px-2 sm:px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Tile 1: Select Hospital & Budget (Pastel Sky Blue) */}
          <div className="p-5 rounded-[1.6rem] bg-[#EBF4FF] border border-blue-200/80 shadow-[0_4px_18px_rgba(0,80,221,0.06)] hover:shadow-[0_8px_25px_rgba(0,80,221,0.12)] transition-all hover:translate-y-[-2px] flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0050DD] text-white flex items-center justify-center mb-3.5 shadow-md group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-[#0B2556] tracking-tight">
                Select Hospital &amp; Budget
              </h4>
              <p className="text-xs sm:text-sm text-[#2C487A] font-semibold mt-1.5 leading-normal">
                Transparent empanelled healthcare tiers tailored to your budget.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-blue-200/70 flex items-center gap-2 text-xs font-black text-[#0050DD] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#0050DD] animate-pulse" />
              <span>Custom Pricing</span>
            </div>
          </div>

          {/* Tile 2: Best Treatment Care (Pastel Peach/Amber) */}
          <div className="p-5 rounded-[1.6rem] bg-[#FFF6EB] border border-amber-200/80 shadow-[0_4px_18px_rgba(229,131,37,0.06)] hover:shadow-[0_8px_25px_rgba(229,131,37,0.14)] transition-all hover:translate-y-[-2px] flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E57600] text-white flex items-center justify-center mb-3.5 shadow-md group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-[#562B00] tracking-tight">
                Get Best Treatment Care
              </h4>
              <p className="text-xs sm:text-sm text-[#7D450A] font-semibold mt-1.5 leading-normal">
                Senior surgical specialists &amp; precision USFDA laser technology.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-200/70 flex items-center gap-2 text-xs font-black text-[#C65D00] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#E57600] animate-pulse" />
              <span>Gold-Standard Care</span>
            </div>
          </div>

          {/* Tile 3: Cashless Insurance (Pastel Mint/Emerald) */}
          <div className="p-5 rounded-[1.6rem] bg-[#EAFBEE] border border-emerald-200/80 shadow-[0_4px_18px_rgba(16,185,129,0.06)] hover:shadow-[0_8px_25px_rgba(16,185,129,0.14)] transition-all hover:translate-y-[-2px] flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#109068] text-white flex items-center justify-center mb-3.5 shadow-md group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-[#0A4732] tracking-tight">
                100% Cashless Support
              </h4>
              <p className="text-xs sm:text-sm text-[#196B4E] font-semibold mt-1.5 leading-normal">
                Instant digital TPA pre-approval across 30+ insurance providers.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-200/70 flex items-center gap-2 text-xs font-black text-[#0B724D] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#109068] animate-pulse" />
              <span>Zero Upfront Deposit</span>
            </div>
          </div>

          {/* Tile 4: 0% No-Cost EMI (Pastel Lavender/Purple) */}
          <div className="p-5 rounded-[1.6rem] bg-[#F4EFFD] border border-purple-200/80 shadow-[0_4px_18px_rgba(147,51,234,0.06)] hover:shadow-[0_8px_25px_rgba(147,51,234,0.14)] transition-all hover:translate-y-[-2px] flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#7B3AEC] text-white flex items-center justify-center mb-3.5 shadow-md group-hover:scale-105 transition-transform">
                <Wallet className="w-6 h-6 stroke-[2.2]" />
              </div>
              <h4 className="text-base sm:text-lg font-black text-[#37166B] tracking-tight">
                0% No-Cost EMI Support
              </h4>
              <p className="text-xs sm:text-sm text-[#552E99] font-semibold mt-1.5 leading-normal">
                Flexible 6 to 12 months EMI plans with zero interest charges.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-purple-200/70 flex items-center gap-2 text-xs font-black text-[#612CBF] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#7B3AEC] animate-pulse" />
              <span>Instant Digital Approval</span>
            </div>
          </div>

        </div>
      </div>

      <div className="text-center max-w-3xl mx-auto mb-6 space-y-3 px-4">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 shadow-xs">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Streamlined Care Protocol</span>
        </span>
        <div className="text-sm sm:text-base font-black text-[#0050DD] tracking-wide pt-1">
          &ldquo;We treat you like family.&rdquo;
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#1D3A6F] tracking-tight">
          Your Simple, Stress-Free Path to Complete Relief.
        </h2>
        <p className="text-slate-600 font-medium text-sm sm:text-base">
          No complicated hospital queues or billing surprises. We guide you and your family personally from start to full recovery.
        </p>
      </div>

      {/* Interactive High-End 5-Pillar Advantage Arch */}
      <ZsrBenefitArch
        procedureName={procedureTitle || "Advanced Laser & ZSR Treatment"}
        isUrology={!procedureSlug || procedureSlug.toLowerCase().includes("circumcision") || procedureSlug.toLowerCase().includes("urology")}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative px-2 sm:px-0">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.stepNumber}
              className={`relative rounded-3xl bg-white border-2 ${step.border} p-6 sm:p-8 flex flex-col justify-between transition-all shadow-md hover:shadow-xl hover:translate-y-[-2px] group hover:border-[#1D3A6F]/30`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-slate-200 font-mono select-none">
                    {step.stepNumber}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${step.badgeClass} inline-block shadow-xs`}>
                    {step.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-[#1D3A6F] group-hover:text-[#E58325] transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                <span>Verified HealthFlo Protocol</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
