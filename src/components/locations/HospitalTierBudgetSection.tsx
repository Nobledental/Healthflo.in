"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  Sparkles,
  Award,
  DollarSign,
  UserCheck,
  Stethoscope,
  HeartHandshake,
  Lock,
  ChevronRight,
  Calculator,
  HelpCircle
} from "lucide-react";

interface HospitalTierBudgetSectionProps {
  procedureTitle?: string;
  cityName?: string;
  nativeLanguage?: string;
  whatsappUrl?: string;
}

export default function HospitalTierBudgetSection({
  procedureTitle = "Advanced Laser Surgery",
  cityName = "your city",
  nativeLanguage = "Tamil / Regional",
  whatsappUrl = "https://wa.me/919876543210?text=Hello%2C%20I%20want%20to%20know%20more%20about%20empanelled%20hospital%20tiers%20and%20budget%20breakdowns.",
}: HospitalTierBudgetSectionProps) {
  const [selectedTier, setSelectedTier] = useState<"economy" | "standard" | "executive">("standard");

  const tierDetails = {
    economy: {
      name: "Economy & Daycare Tier",
      tagline: "Optimized for Value & Quick Same-Day Recovery",
      badge: "Most Cost-Effective",
      color: "from-teal-500/20 via-slate-800 to-slate-900 border-teal-500/40 text-teal-400",
      activeBg: "bg-teal-500/10 border-teal-500",
      priceRange: "Budget Optimized / Basic Coverage",
      roomType: "Modern Air-Conditioned Daycare & Shared Recovery Ward",
      hospitality: "Standard attentive clinical nursing & walk-home discharge triage",
      breakdown: [
        { label: "Senior Specialist Surgeon & Medical Team", cost: "Standard Gold Protocol", status: "100% Identical" },
        { label: "USFDA Laser Equipment & OT Safety Consumables", cost: "Precision Grade A", status: "100% Identical" },
        { label: "Room Rent & Nursing (Daycare / Shared AC)", cost: "Economy Rate", status: "Budget Optimized" },
        { label: "Non-Clinical Hospitality & Guest Amenities", cost: "Standard Care", status: "Basic Comfort" },
      ],
      description: "Ideal for patients seeking immediate USFDA laser relief with maximum financial efficiency or standard co-pay insurance limits."
    },
    standard: {
      name: "Standard Private Tier",
      tagline: "Dedicated Private AC Room & Personal Nursing Advocacy",
      badge: "Most Popular & Recommended",
      color: "from-blue-500/20 via-slate-800 to-slate-900 border-blue-500/50 text-[#00E5FF]",
      activeBg: "bg-blue-500/15 border-[#00E5FF]",
      priceRange: "Full Corporate Insurance & Standard EMI",
      roomType: "Dedicated Single Private AC Recovery Room",
      hospitality: "One-on-one attendant bed, dedicated care guide & customized meals",
      breakdown: [
        { label: "Senior Specialist Surgeon & Medical Team", cost: "Standard Gold Protocol", status: "100% Identical" },
        { label: "USFDA Laser Equipment & OT Safety Consumables", cost: "Precision Grade A", status: "100% Identical" },
        { label: "Room Rent & Nursing (Single Private AC Room)", cost: "Standard Rate", status: "Full Private Comfort" },
        { label: "Non-Clinical Hospitality & Guest Amenities", cost: "Enhanced Care", status: "Dedicated Attendant Bed" },
      ],
      description: "Our recommended baseline for desk professionals and families desiring quiet privacy and direct cashless insurance settlement."
    },
    executive: {
      name: "Executive & Luxury Suite Tier",
      tagline: "VIP Private Suite with Premium Hospitality & Express Care",
      badge: "Premium Comfort",
      color: "from-amber-500/20 via-slate-800 to-slate-900 border-amber-500/50 text-amber-300",
      activeBg: "bg-amber-500/15 border-amber-400",
      priceRange: "Executive Insurance Eligibility / Private Pay",
      roomType: "Spacious VIP Luxury Suite & Private Lounge",
      hospitality: "Dedicated concierge medical assistance, gourmet meals & guest lounge",
      breakdown: [
        { label: "Senior Specialist Surgeon & Medical Team", cost: "Standard Gold Protocol", status: "100% Identical" },
        { label: "USFDA Laser Equipment & OT Safety Consumables", cost: "Precision Grade A", status: "100% Identical" },
        { label: "Room Rent & Nursing (VIP Luxury Hospital Suite)", cost: "Executive Rate", status: "Luxury Hospitality" },
        { label: "Non-Clinical Hospitality & Guest Amenities", cost: "VIP Concierge Care", status: "Full Companion Lounge" },
      ],
      description: "Designed for discerning patients seeking executive hospital luxury, complete seclusion, and frictionless VIP admission protocols."
    }
  };

  const active = tierDetails[selectedTier];

  return (
    <section className="my-14 space-y-10">
      
      {/* ── HEADER & DOCTOR SCHEDULING GUARANTEE ───────────────────────────── */}
      <div className="bg-gradient-to-br from-[#0A1122] via-[#0E1A33] to-[#0A1122] border border-slate-800/80 rounded-[3rem] p-8 sm:p-12 md:p-16 text-white shadow-2xl relative overflow-hidden">
        
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/50 text-[#00E5FF] text-xs font-black uppercase tracking-widest shadow-inner">
            <Building2 className="w-3.5 h-3.5" />
            <span>HealthFlo Empanelled Hospital & Budget Matching Engine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white">
            How HealthFlo Doctor Scheduling & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A2FF] via-[#00E5FF] to-teal-400">Hospital Budget Matching Works.</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
            When you contact HealthFlo, our surgical specialists coordinate your care directly. We don&apos;t just book an appointment—we evaluate your symptoms, schedule your consultation with senior empanelled surgeons in {cityName}, and match you to a hospital facility that perfectly aligns with your financial preference or health insurance coverage.
          </p>
        </div>

        {/* 4 Step Workflow Grid */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          
          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/80 rounded-3xl p-6 space-y-4 hover:border-blue-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-[#00E5FF] flex items-center justify-center font-black text-lg border border-blue-500/30">
              01
            </div>
            <h4 className="text-lg font-black text-white">Doctor & Surgical Triage</h4>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">
              Our clinical team connects with you to understand your symptoms, diagnose your case, and schedule your procedure with an experienced NMC-registered laser specialist in {cityName}.
            </p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/80 rounded-3xl p-6 space-y-4 hover:border-teal-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-black text-lg border border-teal-500/30">
              02
            </div>
            <h4 className="text-lg font-black text-white">Hospital Tier & Budget Matching</h4>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">
              We present you with verified empanelled hospital tiers (Economy, Standard Private, or Executive Suite) to match your personal budget range or insurance policy room-rent cap.
            </p>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-md border border-slate-700/80 rounded-3xl p-6 space-y-4 hover:border-amber-500/50 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-lg border border-amber-500/30">
              03
            </div>
            <h4 className="text-lg font-black text-white">Transparent Cost Breakdown</h4>
            <p className="text-slate-300 text-sm font-medium leading-relaxed">
              You receive an upfront, line-by-line breakdown of surgical costs, OT consumables, and room charges before admission. Absolutely zero surprise hospital billing or hidden add-ons.
            </p>
          </div>

        </div>

        {/* ── THE ZERO COMPROMISE GUARANTEE CALLOUT ───────────────────────── */}
        <div className="relative z-10 mt-12 p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-emerald-950/80 via-[#0A2235] to-teal-950/80 border-2 border-emerald-500/40 shadow-[0_10px_40px_rgba(16,185,129,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/40">
              <Lock className="w-3.5 h-3.5" />
              <span>Our Unconditional Medical Commitment</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Zero Compromise on Treatment Quality & Surgical Excellence.
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
              Why do overall hospital costs differ? <strong className="text-emerald-300">Only due to hospital room comfort and non-clinical amenities!</strong> Across all tiers—from simple day-care wards to luxury private suites—you receive the exact same high-precision USFDA laser equipment, OT hygiene standards, surgical materials, and senior specialist surgeons. We empower you to optimize your room comfort budget without ever compromising on world-class clinical care.
            </p>
          </div>

          <div className="shrink-0 flex flex-col gap-3 w-full md:w-auto">
            <div className="px-5 py-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-white font-extrabold text-sm">100% Consistent Surgical Mastery</p>
                <p className="text-emerald-300/90 text-xs font-semibold">Senior Specialists & USFDA Lasers in All Tiers</p>
              </div>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm uppercase tracking-wider text-center shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Get Your Budget Match</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* ── INTERACTIVE HOSPITAL TIER & COST BREAKDOWN PREVIEW ────────────── */}
      <div className="bg-gradient-to-b from-white via-slate-50 to-white border border-slate-200/90 rounded-[3rem] p-6 sm:p-10 md:p-14 shadow-xl space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1D3A6F] font-black text-xs uppercase tracking-widest border border-blue-200 inline-block">
            Interactive Tier Preview • {procedureTitle}
          </span>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Select an Empanelled Hospital Tier to See How Costs Behave
          </h3>
          <p className="text-slate-600 font-medium text-sm sm:text-base">
            Explore our three hospital tiers below to visualize how surgical precision stays fixed while hospital room amenities scale to match your personal preferences.
          </p>
        </div>

        {/* Tier Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(["economy", "standard", "executive"] as const).map((tierKey) => {
            const t = tierDetails[tierKey];
            const isSelected = selectedTier === tierKey;
            return (
              <button
                key={tierKey}
                onClick={() => setSelectedTier(tierKey)}
                className={`p-6 rounded-3xl text-left transition-all duration-300 border-2 flex flex-col justify-between gap-4 relative overflow-hidden ${
                  isSelected
                    ? "bg-slate-950 border-[#00E5FF] text-white shadow-[0_12px_40px_rgba(0,102,255,0.25)] scale-[1.02]"
                    : "bg-white hover:bg-slate-50 border-slate-200 text-slate-900 shadow-sm hover:border-slate-300"
                }`}
              >
                {isSelected && (
                  <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#00A2FF]/20 text-[#00E5FF] text-[10px] font-black uppercase tracking-wider border border-[#00A2FF]/40">
                    Selected
                  </span>
                )}
                <div className="space-y-2 pr-12">
                  <span className={`text-xs font-black uppercase tracking-wider block ${isSelected ? "text-[#00E5FF]" : "text-blue-600"}`}>
                    {t.badge}
                  </span>
                  <h4 className="text-xl font-black">{t.name}</h4>
                  <p className={`text-xs font-semibold leading-relaxed ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                    {t.tagline}
                  </p>
                </div>

                <div className={`pt-4 border-t w-full flex items-center justify-between font-extrabold text-xs uppercase tracking-wider ${
                  isSelected ? "border-slate-800 text-emerald-400" : "border-slate-100 text-slate-700"
                }`}>
                  <span>{t.priceRange}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Itemized Breakdown Display */}
        <div className="bg-slate-950 text-white rounded-[2.5rem] p-7 sm:p-10 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
          
          {/* Ambient inner glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-[#00E5FF] block mb-1">
                ITEMIZED COST & QUALITY MATRIX
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {active.name} — Detailed Cost Structure
              </h4>
            </div>
            <span className="px-4 py-2 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-extrabold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Cashless Eligible & 0% EMI Support</span>
            </span>
          </div>

          <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed max-w-3xl">
            {active.description} In this tier, your hospital room accommodation is a <strong className="text-white">{active.roomType}</strong> featuring <strong className="text-white">{active.hospitality}</strong>.
          </p>

          {/* Breakdown Table */}
          <div className="space-y-3 pt-2">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-2 text-slate-400 font-black text-xs uppercase tracking-wider">
              <div className="col-span-6">Treatment Component & Medical Category</div>
              <div className="col-span-3">Assumed Quality / Tier Spec</div>
              <div className="col-span-3 text-right">Cost Variance Impact</div>
            </div>

            {active.breakdown.map((item, idx) => {
              const isSurgical = item.label.includes("Surgeon") || item.label.includes("USFDA Laser");
              return (
                <div
                  key={idx}
                  className={`grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center p-4 sm:p-5 rounded-2xl border transition-all ${
                    isSurgical
                      ? "bg-gradient-to-r from-emerald-950/30 to-slate-900 border-emerald-500/30"
                      : "bg-[#0C162A] border-slate-800"
                  }`}
                >
                  <div className="sm:col-span-6 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isSurgical ? "bg-emerald-500/20 text-emerald-400" : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {isSurgical ? <Stethoscope className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-white font-extrabold text-sm sm:text-base">{item.label}</p>
                      {isSurgical && (
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                          🔒 Fixed Quality Across All Tiers
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="sm:col-span-3 font-bold text-slate-300 text-xs sm:text-sm">
                    <span className="sm:hidden text-slate-500 uppercase text-[10px] block font-extrabold">Quality Spec: </span>
                    {item.cost}
                  </div>

                  <div className="sm:col-span-3 sm:text-right font-black text-xs sm:text-sm">
                    <span className="sm:hidden text-slate-500 uppercase text-[10px] block font-extrabold">Impact: </span>
                    <span className={`inline-block px-3 py-1 rounded-full ${
                      isSurgical
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-blue-500/20 text-[#00E5FF] border border-blue-500/30"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-xs sm:text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Need help selecting your ideal hospital tier? Our {nativeLanguage} coordinators provide custom estimates in 5 minutes.</span>
            </p>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-white font-black text-sm tracking-wider transition-all shadow-[0_8px_30px_rgba(0,102,255,0.35)] flex items-center gap-2 shrink-0 active:scale-95"
            >
              <Calculator className="w-4 h-4" />
              <span>Request Custom Cost Breakdown</span>
            </a>
          </div>

        </div>

      </div>

    </section>
  );
}
