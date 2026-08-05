"use client";

import React from "react";
import { ShieldCheck, UserCheck, Sparkles, CheckCircle2, Clock, ArrowRight } from "lucide-react";

interface PatientJourneyStepsProps {
  cityName: string;
  nativeLanguage?: string;
  whatsappUrl?: string;
}

export default function PatientJourneySteps({ cityName, nativeLanguage = "English", whatsappUrl }: PatientJourneyStepsProps) {
  const isTamil = nativeLanguage === "Tamil";
  const nativeTag = isTamil ? "(தமிழ்)" : `(${nativeLanguage})`;

  const steps = [
    {
      stepNumber: "01",
      title: "Confidential Care Discussion",
      badge: `Private & Discreet ${nativeTag}`,
      description: `Speak openly with our dedicated ${cityName} care coordinator. We explain your procedure, review TPA cashless insurance eligibility, and provide complete transparent pricing in minutes without judgment.`,
      icon: ShieldCheck,
      color: "from-blue-500 to-indigo-600",
      accent: "text-blue-400",
      border: "border-blue-500/30",
      bg: "bg-blue-950/20",
    },
    {
      stepNumber: "02",
      title: "Senior Surgeon Consultation",
      badge: "15+ Years Experience",
      description: `Get diagnosed by ${cityName}'s leading NMC-registered specialists. We arrange direct hospital appointments at an empanelled tier that matches your personal preference with zero paperwork hassle.`,
      icon: UserCheck,
      color: "from-amber-500 to-orange-600",
      accent: "text-amber-400",
      border: "border-amber-500/30",
      bg: "bg-amber-950/20",
    },
    {
      stepNumber: "03",
      title: "Minimally Invasive Recovery",
      badge: "Same-Day Discharge",
      description: `Undergo an advanced USFDA laser or ZSR procedure designed for comfort and precision. Walk home comfortably in just a few hours with complimentary cab transit and zero family stress.`,
      icon: Sparkles,
      color: "from-emerald-500 to-teal-600",
      accent: "text-emerald-400",
      border: "border-emerald-500/30",
      bg: "bg-emerald-950/20",
    },
  ];

  return (
    <section className="py-12 my-6 font-sans">
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3 px-4">
        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs uppercase tracking-wider inline-flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          <span>Streamlined Care Protocol</span>
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Your Simple, Stress-Free Path to Complete Relief.
        </h2>
        <p className="text-slate-600 dark:text-slate-300 font-medium text-sm sm:text-base">
          No complicated hospital queues or billing surprises. We guide you and your family personally from start to full recovery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative px-2 sm:px-0">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={step.stepNumber}
              className={`relative rounded-3xl bg-[#0A1325] border ${step.border} p-6 sm:p-8 flex flex-col justify-between transition-all hover:shadow-xl hover:translate-y-[-2px] group`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-slate-700/40 font-mono select-none">
                    {step.stepNumber}
                  </span>
                </div>

                <div className="space-y-1.5 pt-2">
                  <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 inline-block`}>
                    {step.badge}
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center text-xs font-bold text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
                <span>Verified Healthflo Protocol</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
