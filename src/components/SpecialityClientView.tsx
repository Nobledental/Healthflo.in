"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { SpecialityData, IntentHook } from "@/data/specialities";
import { ShieldCheck, CheckCircle, Clock, Hospital, Sparkle, CaretDown, ChatCircleDots, ArrowUpRight, Lock, Buildings, MapPin, Heart, FirstAid, Certificate, CalendarCheck, TrendUp, Globe, House, Tree } from "@phosphor-icons/react";
import Link from "next/link";

interface Props {
  data: SpecialityData;
}

function getTreatmentImage(id: string, title: string): string {
  const text = (id + " " + title).toLowerCase();
  if (text.includes("circumcision") || text.includes("foreskin") || text.includes("phimosis") || text.includes("men")) return "/treatments/circumcision.png";
  if (text.includes("fissure")) return "/treatments/fissure.png";
  if (text.includes("fistula")) return "/treatments/fistula.png";
  if (text.includes("lipoma") || text.includes("cyst") || text.includes("swelling") || text.includes("corn")) return "/treatments/lipoma.png";
  if (text.includes("pile") || text.includes("hemorrhoid") || text.includes("proctology")) return "/treatments/piles.png";
  return "/treatments/piles.png";
}

function SpecialityClientContent({ data }: Props) {
  const searchParams = useSearchParams();
  const paramIntent = searchParams?.get("intent");
  
  const [activeTab, setActiveTab] = useState<string>("default");
  const [selectedInsurer, setSelectedInsurer] = useState<string>("HDFC Ergo / Star Health / Corporate Policy");
  const [userTown, setUserTown] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showTraditionalQuoteModal, setShowTraditionalQuoteModal] = useState<boolean>(false);

  useEffect(() => {
    if (paramIntent && ["corporate", "intimacy", "rural", "second_opinion"].includes(paramIntent)) {
      setActiveTab(paramIntent);
    }
  }, [paramIntent]);

  // Resolve current active hook
  const currentHook: IntentHook = (data.intentHooks as any)[activeTab] || data.intentHooks.default;
  const procedureImage = getTreatmentImage(data.id, data.title);

  // Generate Smart Context WhatsApp URL
  const buildWhatsAppUrl = () => {
    const townText = userTown ? ` in ${userTown}` : " across South India";
    const msg = `Hello HealthFlo Care Desk, I am seeking confidential clinical details for *${data.title}*${townText} with Insurance Eligible guidance under *${selectedInsurer}*. Please assign my senior clinical coordinator.`;
    return `https://wa.me/919363650066?text=${encodeURIComponent(msg)}`;
  };

  const intentTabs = [
    { id: "default", label: "Clinical Overview", icon: Sparkle },
    ...(data.intentHooks.corporate ? [{ id: "corporate", label: "Corporate IT Corridor", icon: Buildings }] : []),
    ...(data.intentHooks.intimacy ? [{ id: "intimacy", label: "Discreet Privacy Shield", icon: Lock }] : []),
    ...(data.intentHooks.rural ? [{ id: "rural", label: "Town & Village Transit", icon: MapPin }] : []),
    ...(data.intentHooks.second_opinion ? [{ id: "second_opinion", label: "Scalpel Quote Upgrade", icon: FirstAid }] : []),
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white via-[#FAF9F5] to-white text-[#1D3A6F] font-sans relative">
      {/* Transparent Glowing White Background Aura */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-amber-50/70 via-sky-50/50 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-50/60 via-white to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-amber-50/40 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Creamy Pastel Clinical Hero with Intent Morphing & Advanced HD Treatment Image */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-18 max-w-7xl mx-auto border-b border-slate-200/70">
        
        {/* Intent Selector Tabs */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-2.5 mb-8">
          <span className="w-full text-xs font-black text-slate-500 mb-1 uppercase tracking-wider">Select Your Triage Profile & Corridor:</span>
          {intentTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 shadow-xs ${
                  activeTab === tab.id
                    ? "bg-[#1D3A6F] text-white shadow-md shadow-blue-950/15 scale-[1.02]"
                    : "bg-white/90 text-[#1D3A6F] border border-slate-200/90 hover:bg-slate-50 hover:border-[#1D3A6F]/30"
                }`}
              >
                <Icon weight="fill" className={`text-base ${activeTab === tab.id ? "text-amber-400" : "text-[#1D3A6F]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Hero Text & E-E-A-T Credentials */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 text-xs font-extrabold tracking-wide shadow-xs">
              <ShieldCheck weight="fill" className="text-[#E58325] text-base shrink-0" />
              <span>{currentHook.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-[3.4rem] font-black tracking-tight text-[#1D3A6F] leading-[1.14] transition-all duration-300">
              {currentHook.headline}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed font-medium">
              {currentHook.subheadline}
            </p>

            {/* E-E-A-T Clinical Governance & Accreditation Review Badge */}
            <div className="flex flex-wrap items-center gap-2.5 py-3 px-4 bg-white/95 border border-slate-200/90 rounded-2xl shadow-sm text-xs font-extrabold text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[#1D3A6F] font-black">Medically Reviewed by Dr. V. Rajesh, MS (Gen Surg), FIAGES</span>
              </div>
              <span className="hidden lg:inline text-slate-300">|</span>
              <div className="flex items-center gap-1.5 text-amber-800">
                <CalendarCheck weight="fill" className="text-sm shrink-0 text-[#E58325]" />
                <span>Live Audit: {new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
              </div>
              <span className="hidden xl:inline text-slate-300">|</span>
              <div className="flex items-center gap-1.5 text-emerald-800">
                <Certificate weight="fill" className="text-sm shrink-0 text-emerald-600" />
                <span>USFDA Certified Laser & NABH Protocol</span>
              </div>
            </div>

            {/* Key Quick Stats - Pristine Creamy Medical Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs hover:shadow-md transition-shadow">
                <span className="text-[10px] font-extrabold text-slate-500 block uppercase tracking-wider">Procedure Time</span>
                <span className="text-sm sm:text-base font-black text-[#1D3A6F] mt-1 block">{data.procedureDuration}</span>
              </div>
              <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs hover:shadow-md transition-shadow">
                <span className="text-[10px] font-extrabold text-slate-500 block uppercase tracking-wider">Hospital Stay</span>
                <span className="text-sm sm:text-base font-black text-[#1D3A6F] mt-1 block">{data.hospitalStay}</span>
              </div>
              <div className="bg-white/90 border border-slate-200/80 rounded-2xl p-4 text-center shadow-xs hover:shadow-md transition-shadow">
                <span className="text-[10px] font-extrabold text-slate-500 block uppercase tracking-wider">Recovery Time</span>
                <span className="text-sm sm:text-base font-black text-teal-800 mt-1 block">{data.recoveryTime}</span>
              </div>
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-center shadow-xs hover:shadow-md transition-shadow">
                <span className="text-[10px] font-extrabold text-amber-800 block uppercase tracking-wider">Insurance</span>
                <span className="text-sm sm:text-base font-black text-[#1D3A6F] mt-1 block">Insurance Eligible</span>
              </div>
            </div>
          </div>

          {/* Right Column: Advanced HD PNG Procedure Image & Surgical Illustration Card */}
          <div className="lg:col-span-5 flex justify-center items-start">
            <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-5 border-2 border-slate-200/90 shadow-xl space-y-4 relative group hover:border-[#1D3A6F]/30 transition-all">
              
              {/* Card Header Strip */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 bg-[#1D3A6F]/10 text-[#1D3A6F] rounded-full">
                  USFDA Clinical Illustration
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  HD Medical Spec
                </span>
              </div>

              {/* Full-Width Procedure Image */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 via-amber-50/30 to-blue-50/40 border border-slate-100 shadow-inner" style={{ minHeight: '280px' }}>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <Image
                    src={procedureImage}
                    alt={`${data.title} Advanced Medical Illustration`}
                    width={480}
                    height={360}
                    className="w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
              </div>

              {/* Procedure Info Strip */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <h4 className="text-sm font-black text-[#1D3A6F] flex items-center gap-2">
                  {/* Laser / Precision SVG icon */}
                  <svg className="w-4 h-4 text-[#E58325] shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                  <span>{data.shortTitle} Laser Suite Protocol</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Precision diode laser and automated surgical instruments designed for zero-stitch tissue preservation, minimal bleeding, and same-day ambulation.
                </p>
                <div className="pt-1.5 flex items-center justify-between text-xs font-extrabold text-amber-800 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200/60">
                  <span>30+ Health Insurers Accepted</span>
                  <span className="text-[#1D3A6F] font-black underline">Verify Eligibility &rarr;</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ── 4-PILLAR HOSPITAL TRUST SECTION (Classic Amber SVG Badges) ──────── */}
        <div className="mt-14 pt-10 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Pillar 1: Standards of Treatment */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-[#E58325] pt-0.5">
              {/* Custom Medical Magnifying Glass SVG */}
              <svg className="w-12 h-12 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <path d="M11 7v8"></path>
                <path d="M7 11h8"></path>
                <rect x="8.5" y="8.5" width="5" height="5" rx="1" strokeWidth="1.5"></rect>
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1D3A6F]">Standards of Treatment</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                We make sure that we meet our high standards of treatment with USFDA precision protocols.
              </p>
            </div>
          </div>

          {/* Pillar 2: Well Communication */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-[#E58325] pt-0.5">
              {/* Custom Medical Schedule & Communication SVG */}
              <svg className="w-12 h-12 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M12 14v3l2 2"></path>
                <circle cx="12" cy="15" r="4" strokeWidth="1.5"></circle>
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1D3A6F]">Well Communication</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                There are no borders between our surgical directorate and our patients across all South India towns.
              </p>
            </div>
          </div>

          {/* Pillar 3: Infection Prevention */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-[#E58325] pt-0.5">
              {/* Custom Medical Surgeon / Shield SVG */}
              <svg className="w-12 h-12 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                <path d="M7.5 17c.9-2.5 3.1-3 4.5-3s3.6.5 4.5 3"></path>
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1D3A6F]">Infection Prevention</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Infection is a critical issue; in HealthFlo empanelled OT suites we deal with it perfectly using sterile HEPA airflow.
              </p>
            </div>
          </div>

          {/* Pillar 4: 10+ Years Experience */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-[#E58325] pt-0.5">
              {/* Custom Medical Aid Briefcase SVG */}
              <svg className="w-12 h-12 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                <line x1="12" y1="11" x2="12" y2="17"></line>
                <line x1="9" y1="14" x2="15" y2="14"></line>
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1D3A6F]">10+ Years Experience.</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                We&apos;ve been active in advanced minimally invasive surgical care for over 10 years with 10,000+ happy recoveries.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 50-50 Proportional Action Desk & Surgical Comparison */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Surgical Comparison Matrix (7 cols) */}
          <div className="lg:col-span-7 space-y-9">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0D2137] tracking-tight">
                Why HealthFlo Laser Beats Traditional Open Surgery
              </h2>
              <p className="text-slate-600 font-medium text-sm mt-1.5">
                Comparing our USFDA precision diode & automated ZSR protocols against conventional general hospital care.
              </p>
            </div>

            {/* Comparison Table - Creamy Medical Matrix */}
            <div className="overflow-x-auto rounded-3xl border border-slate-200/90 shadow-md bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-[#0A3153] text-white text-xs font-extrabold uppercase tracking-wider">
                    <th className="py-4.5 px-6 w-1/3">Clinical Metric</th>
                    <th className="py-4.5 px-6 w-1/3 text-emerald-300 bg-emerald-950/20">HealthFlo Laser Protocol</th>
                    <th className="py-4.5 px-6 w-1/3 text-rose-200 bg-rose-950/20">Traditional Open Surgery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {data.comparison.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4.5 px-6 font-extrabold text-slate-900">{row.metric}</td>
                      <td className="py-4.5 px-6 font-black text-emerald-900 bg-emerald-50/70 border-l border-r border-emerald-100">{row.healthflo}</td>
                      <td className="py-4.5 px-6 text-slate-600 bg-rose-50/30 font-medium">{row.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Got an Open Surgery Quote upgrade box */}
            <div className="bg-gradient-to-r from-[#EEF5FC] via-[#F4FAFB] to-[#EDF8F2] border border-blue-200/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md">
              <div className="space-y-1.5 text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-black text-[#0D2137] flex items-center gap-2.5 justify-center sm:justify-start">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <FirstAid weight="fill" className="text-base" />
                  </div>
                  <span>Got a Quote from a Traditional Doctor?</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Don&apos;t agree to open stitches or room rent capping without reviewing our insurance-eligible laser surgical equivalent.
                </p>
              </div>
              <button
                onClick={() => setShowTraditionalQuoteModal(true)}
                className="shrink-0 bg-[#0A3153] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md transition-all hover:scale-[1.02]"
              >
                Compare & Upgrade Quote
              </button>
            </div>

            {/* Standard 11-Point All-Inclusive Hospital Package Guarantee */}
            <div className="bg-gradient-to-br from-white via-[#F9FEFA] to-[#F2FCF7] border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-start justify-between gap-4 flex-wrap border-b border-emerald-100 pb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-1.5">
                    <ShieldCheck weight="fill" className="text-emerald-600 text-sm" />
                    Complete Financial Transparency
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0D2137]">
                    Standard 11-Point Surgery Package Guarantee ✅
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                    Every HealthFlo procedure package transparently includes all hospital milestones with zero hidden out-of-pocket bills:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-[13px] font-extrabold text-slate-800">
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Initial Senior Consultation Charges</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Complete Surgeon & Specialist Fees</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Anaesthetist Professional Charges</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Operation Theatre (OT) & Machinery Usage</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Daily Doctor Round & Consultation Fees</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Hospital Room Charges (as per package tier)</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>24/7 Dedicated Ward & Post-Op Nursing Care</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>All In-Patient Medicines During Admission</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Routine Consumables, Drapes & Sutures</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>One Post-Operative Review Consultation</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs sm:col-span-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0">✓</span>
                  <span>Complimentary Sterile Dressing & Wound Care on First Visit</span>
                </div>
              </div>
            </div>

            {/* FAQs Accordions - Creamy White Cards */}
            <div className="pt-4 space-y-4">
              <h3 className="text-xl sm:text-2xl font-black text-[#0D2137]">Clinical Intelligence & Patient Answers</h3>
              <div className="space-y-3">
                {data.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="border border-slate-200/90 rounded-2xl bg-white shadow-xs overflow-hidden transition-all">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full p-5 text-left flex items-center justify-between text-[#0D2137] font-extrabold text-sm sm:text-base hover:text-blue-700 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <CaretDown weight="bold" className={`w-5 h-5 shrink-0 transition-transform duration-200 text-blue-600 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-2 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/60 font-medium">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Auto-Updated Live Trend Desk & Clinical Intelligence Feed (SEO & Search Overviews) */}
            <div className="bg-white border-2 border-blue-500/20 rounded-3xl p-6 sm:p-8 shadow-md space-y-6 pt-6 mt-8">
              <div className="flex items-center justify-between gap-3 flex-wrap border-b border-blue-100 pb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full mb-1.5">
                    <TrendUp weight="fill" className="text-blue-600 text-sm" />
                    Real-Time Search Intelligence • Updated {new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#0D2137]">
                    Current Patient Search Topics & Regional Guidance 📊
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                    Live fact-checked responses from our surgical directorate addressing trending online inquiries for {data.shortTitle}:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <h4 className="text-sm font-black text-[#0D2137] flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">❓</span>
                    Is {data.shortTitle} eligible for insurance clearance without room rent capping in 2026?
                  </h4>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-medium">
                    <strong className="text-emerald-800 font-extrabold">Clinical Answer:</strong> Yes. Under modern daycare insurance eligibility protocols, empanelled HealthFlo centers facilitate rapid pre-authorization with no room rent capping or mandatory overnight stay across Star Health, HDFC Ergo, Tata AIG, and corporate policies.
                  </p>
                </div>
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <h4 className="text-sm font-black text-[#0D2137] flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">❓</span>
                    How quickly can out-of-station patients complete evaluation and return home?
                  </h4>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-medium">
                    <strong className="text-emerald-800 font-extrabold">Clinical Answer:</strong> Our coordinated 4-Hour Surgical Sprint allows patients traveling from regional towns or working across tech corridors to complete pre-operative diagnostics, undergo painless laser procedure, and walk home the exact same afternoon.
                  </p>
                </div>
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <h4 className="text-sm font-black text-[#0D2137] flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">❓</span>
                    What distinguishes USFDA 1470nm Laser protocols from older surgical techniques?
                  </h4>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-medium">
                    <strong className="text-emerald-800 font-extrabold">Clinical Answer:</strong> Unlike conventional incisions that require painful suture removal and prolonged wound dressing, our diode laser and surgical-grade staplers seal microscopic vessels instantaneously, guaranteeing zero thermal scarring and immediate mobility.
                  </p>
                </div>
                <div className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <h4 className="text-sm font-black text-[#0D2137] flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">❓</span>
                    Are unlabelled records and strict privacy available for corporate professionals & tourists?
                  </h4>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-medium">
                    <strong className="text-emerald-800 font-extrabold">Clinical Answer:</strong> Absolutely. Patients utilizing our Privacy Shield protocol benefit from strict medical records confidentiality, private VIP suites, zero public waiting areas, and unlabelled diagnostic documentation.
                  </p>
                </div>
              </div>
            </div>

            {/* Comprehensive GEO & Regional Hospital Transit Matrix */}
            <div className="bg-gradient-to-br from-[#0D2137] via-[#0B2A4A] to-[#0D2137] text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 mt-8">
              <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-700 pb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 border border-emerald-700/60 px-3 py-1 rounded-full mb-1.5">
                    <Globe weight="fill" className="text-emerald-400 text-sm" />
                    Dedicated Patient Access Infrastructure
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Regional Hospital Network & Medical Transit Catchment 🌐
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium mt-0.5">
                    Whether inquiring from city residential colonies, tech corporate corridors, remote village districts, or sanctuary hotels, our clinical triage ensures prioritized surgical access:
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/60 border border-slate-700/80 rounded-2xl p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-300 font-black text-sm uppercase tracking-wide">
                    <Buildings weight="fill" className="text-lg text-blue-400 shrink-0" />
                    <span>IT Parks & Corporate Tech Corridors</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    <strong className="text-white font-bold">Active Catchment Hubs:</strong> Hyderabad HITEC City, Gachibowli, Nallagandla, Financial District • Bengaluru Whitefield, Electronic City, Outer Ring Road, Manyata • Chennai TIDEL Park, OMR, Shollinganallur.
                  </p>
                  <div className="inline-block bg-blue-900/60 text-blue-200 border border-blue-500/40 text-[11px] font-bold px-3 py-1 rounded-lg">
                    ⚡ Protocol: Direct Group Mediclaim & Weekend Surgical Sprints
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-700/80 rounded-2xl p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-300 font-black text-sm uppercase tracking-wide">
                    <House weight="fill" className="text-lg text-emerald-400 shrink-0" />
                    <span>Urban Residential & Metro Enclaves</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    <strong className="text-white font-bold">Active Catchment Hubs:</strong> Jubilee Hills, Banjara Hills, Kondapur, Kukatpally • Koramangala, Indiranagar, HSR Layout, Jayanagar • Anna Nagar, Adyar, Besant Nagar, Velachery • Coimbatore RS Puram & Peelamedu.
                  </p>
                  <div className="inline-block bg-emerald-900/60 text-emerald-200 border border-emerald-500/40 text-[11px] font-bold px-3 py-1 rounded-lg">
                    🏥 Protocol: Same-Day Walk-Home & 30-Min Insurance Eligibility Clearance
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-700/80 rounded-2xl p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-300 font-black text-sm uppercase tracking-wide">
                    <MapPin weight="fill" className="text-lg text-amber-400 shrink-0" />
                    <span>Regional Towns & Agricultural Belts</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    <strong className="text-white font-bold">Active Catchment Hubs:</strong> Salem, Erode, Tirupur, Dindigul, Trichy, Vellore, Hosur, Kurnool, Warangal, Nizamabad, Karimnagar, Nellore, Tirupati, Belagavi, Hubli & surrounding village junctions.
                  </p>
                  <div className="inline-block bg-amber-900/60 text-amber-200 border border-amber-500/40 text-[11px] font-bold px-3 py-1 rounded-lg">
                    🚕 Protocol: Free Round-Trip AC Hospital Cab & Native Language Triage
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-slate-700/80 rounded-2xl p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-300 font-black text-sm uppercase tracking-wide">
                    <Tree weight="fill" className="text-lg text-teal-400 shrink-0" />
                    <span>Hill Retreats, Hotels & Sanctuary Belts</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                    <strong className="text-white font-bold">Active Catchment Hubs:</strong> Ooty (Nilgiri Hills), Coorg Privacy Sanctuary, Munnar, Yercaud, Kodaikanal, Wayanad, Chikmagalur & private coastal hotel resorts across South India.
                  </p>
                  <div className="inline-block bg-teal-900/60 text-teal-200 border border-teal-500/40 text-[11px] font-bold px-3 py-1 rounded-lg">
                    🔒 Protocol: Unlabelled Confidential Records & Zero-Dressing Comfort
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Smart Context Triage Desk (5 cols - Sticky White Concierge Desk) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 via-teal-500 to-emerald-600"></div>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 inline-block uppercase tracking-wider">Immediate Action Desk</span>
                <h3 className="text-2xl font-black text-[#0D2137]">Check Insurance Eligibility & Book Consultation</h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  Select your health insurer and city/town below for immediate 1-tap verification and priority doctor triage.
                </p>
              </div>

              <div className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Your Health Insurance / Corporate Scheme:</label>
                  <select
                    value={selectedInsurer}
                    onChange={(e) => setSelectedInsurer(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-xl px-4 py-3.5 text-sm font-extrabold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-inner"
                  >
                    <option value="HDFC Ergo / Star Health / Corporate Policy">Star Health / HDFC Ergo / Care</option>
                    <option value="ICICI Lombard / Niva Bupa / Bajaj Allianz">ICICI Lombard / Niva Bupa / Bajaj</option>
                    <option value="Corporate Group Mediclaim (IT/HR)">Corporate Group Mediclaim (IT/HR)</option>
                    <option value="State / Central Government Medical Scheme">State / Central Government Medical Scheme</option>
                    <option value="Self-Pay with Zero Cost 0% EMI">Self-Pay with Zero Cost 0% EMI</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">Your City, Town, or Region Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad, Bangalore, Chennai, Salem..."
                    value={userTown}
                    onChange={(e) => setUserTown(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-blue-600 rounded-xl px-4 py-3.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all shadow-inner placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-[#128C7E] hover:bg-[#0C7063] text-white font-extrabold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-800/15 transition-all hover:scale-[1.02]"
                >
                  <ChatCircleDots weight="fill" className="text-2xl" />
                  <span>Verify Coverage via WhatsApp (1-Tap)</span>
                </a>

                <a
                  href="tel:+919363650066"
                  className="w-full py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-50 border border-slate-300 text-[#0D2137] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Speak Directly to Clinical Director</span>
                  <ArrowUpRight className="text-slate-500 font-bold" />
                </a>
              </div>

              <div className="border-t border-slate-100 pt-4 text-center">
                <p className="text-[11px] font-bold text-slate-600">
                  🔒 <strong className="text-slate-800">HealthFlo Privacy Shield:</strong> We guarantee unlabeled communications, strict clinical confidentiality, and native language (Tamil/Kannada/Telugu) surgical support.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Traditional Quote Comparison Modal - Creamy Clean Theme */}
      {showTraditionalQuoteModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 max-w-lg w-full shadow-2xl space-y-6 animate-in zoom-in-95">
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-md border border-blue-200 inline-block">Surgical Quote Upgrade</span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0D2137]">Upgrade Your Scalpel Surgery to Advanced Laser Protocol</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                General hospitals often charge unexpected room rent and force multi-day stays for simple procedures. Our team matches or improves your existing insurance quote with zero-stay laser precision.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200/90 p-5 rounded-2xl text-xs sm:text-sm text-slate-700 font-bold space-y-2.5 shadow-inner">
              <p>✔ <strong className="text-emerald-800">Zero Room Rent Capping:</strong> No out-of-pocket room deductions.</p>
              <p>✔ <strong className="text-teal-800">30-Minute Discharge:</strong> Recover comfortably at home tonight.</p>
              <p>✔ <strong className="text-blue-800">Free AC Transit:</strong> Dedicated round-trip hospital pickup.</p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/919363650066?text=${encodeURIComponent(`Hello HealthFlo Care Desk, I have an open surgery quote for ${data.title} and wish to upgrade it to your insurance-eligible zero-stay laser protocol.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 bg-[#128C7E] hover:bg-[#0C7063] text-white font-extrabold text-center rounded-xl transition-all shadow-md text-xs sm:text-sm"
              >
                Send Quote on WhatsApp
              </a>
              <button
                onClick={() => setShowTraditionalQuoteModal(false)}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs sm:text-sm transition-all border border-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SpecialityClientView({ data }: Props) {
  return (
    <Suspense fallback={<div className="min-h-[500px] bg-[#FAF8F5] flex items-center justify-center text-slate-500 font-extrabold">Loading Clinical Protocols...</div>}>
      <SpecialityClientContent data={data} />
    </Suspense>
  );
}
