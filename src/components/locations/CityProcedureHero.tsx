"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSiteConfig } from "@/context/SiteConfigContext";
import {
  MapPin,
  Phone,
  MessageCircle,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  Zap,
  Building2,
  ChevronRight,
  UserCheck,
  HeartHandshake,
  User,
  Sparkles,
  Lock,
  CalendarCheck
} from "lucide-react";
import type { RegionalLocation } from "@/data/regionalLocations";
import type { SpecialityData } from "@/data/specialities";

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────
interface CityProcedureHeroProps {
  location: RegionalLocation;
  procedure: SpecialityData;
  whatsappUrl: string;
  areaName?: string;
}

function getTreatmentImage(id: string, title: string): string {
  const text = (id + " " + title).toLowerCase();
  if (text.includes("circumcision") || text.includes("foreskin") || text.includes("phimosis") || text.includes("men") || text.includes("urology")) return "/treatments/circumcision.png";
  if (text.includes("fissure")) return "/treatments/fissure.png";
  if (text.includes("fistula")) return "/treatments/fistula.png";
  if (text.includes("lipoma") || text.includes("cyst") || text.includes("swelling") || text.includes("corn")) return "/treatments/lipoma.png";
  if (text.includes("pile") || text.includes("hemorrhoid") || text.includes("proctology")) return "/treatments/piles.png";
  return "/treatments/piles.png";
}

// ─────────────────────────────────────────────────────────────────────────────
// Component — Traditional Medical Theme & HD Illustration Pictures
// ─────────────────────────────────────────────────────────────────────────────
export default function CityProcedureHero({
  location,
  procedure,
  whatsappUrl,
  areaName,
}: CityProcedureHeroProps) {
  const { config } = useSiteConfig();

  // Native script trust anchor calculation for Southern states
  const isTamil = location.nativeLanguage === "Tamil" || location.stateSlug === "tamil-nadu" || location.stateName?.toLowerCase().includes("tamil");
  const isKannada = location.nativeLanguage === "Kannada" || location.stateSlug === "karnataka";
  const isTelugu = location.nativeLanguage === "Telugu" || location.stateSlug === "telangana";

  const nativeTag = isTamil ? "(தமிழ்)" : isKannada ? "(ಕನ್ನಡ)" : isTelugu ? "(తెలుగు)" : `(${location.nativeLanguage})`;
  const callNowLabel = isTamil 
    ? "Call Now — தமிழில் பேசலாம்" 
    : isKannada 
    ? "Call Now — ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ" 
    : isTelugu 
    ? "Call Now — తెలుగులో మాట్లాడండి" 
    : `Call Now — Speak in ${location.nativeLanguage}`;

  const chatLabel = `Chat in ${location.nativeLanguage} ${nativeTag} — Free Consultation`;

  const procedureImage = getTreatmentImage(procedure.id, procedure.title);

  // Procedure-specific conversion bullets based on clinical anxiety and emotional motivation
  const isProctology = procedure.category === "Piles, Fissure & Anal Care" || procedure.id.includes("piles") || procedure.id.includes("fistula") || procedure.id.includes("fissure");
  const isGeneral = procedure.category === "Hernia, Veins & General Care" || procedure.id.includes("hernia") || procedure.id.includes("lipoma") || procedure.id.includes("varicose") || procedure.id.includes("hydrocele");
  const isUrology = procedure.category === "Circumcision & Men's Health" || procedure.id.includes("circumcision");

  return (
    <section className="relative rounded-[2.5rem] bg-gradient-to-b from-white via-[#FAF9F5] to-white text-[#1D3A6F] p-6 sm:p-10 md:p-14 border border-slate-200/90 shadow-xl overflow-hidden font-sans">
      {/* Traditional Warm Ambient Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-50/80 via-sky-50/40 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-50/50 rounded-full blur-[110px] pointer-events-none -z-10" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* ── LEFT: Conversion & Trust Optimized Copy ──────────────────────── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Traditional Medical Trust Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-[#1D3A6F] border border-blue-200/80 font-extrabold text-[11px] tracking-wide uppercase flex items-center gap-1.5 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#1D3A6F] shrink-0" />
              <span>{areaName ? `${areaName}, ${location.name}` : location.name} • {location.stateName}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200/80 font-extrabold text-[11px] uppercase tracking-wide flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>100% Cashless Insurance &amp; 0% EMI</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200/80 font-extrabold text-[11px] uppercase tracking-wide flex items-center gap-1 shadow-xs">
              <UserCheck className="w-3.5 h-3.5 text-[#E58325] shrink-0" />
              <span>Senior Specialists Network</span>
            </span>
          </div>

          {/* H1 - Deep Royal Navy Headline with Warm Amber Underline */}
          <h1 className="text-3xl sm:text-5xl md:text-[3.2rem] font-black tracking-tight leading-[1.14] text-[#1D3A6F]">
            {procedure.shortTitle} {areaName ? "in" : "in"}{" "}
            <span className="text-[#1D3A6F] underline decoration-[#E58325] decoration-4 underline-offset-8">
              {areaName ? `${areaName}, ${location.name}` : location.name}.
            </span>
          </h1>

          {/* Human-Centric Senior Doctor Subtitle */}
          <p className="text-slate-700 text-base sm:text-lg font-bold leading-relaxed">
            Consult with {location.name}&apos;s senior-most surgical specialists (<span className="text-[#E58325] font-black bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">15+ years clinical experience</span>) at premium empanelled NMC-registered hospital centers.
          </p>

          {/* Rapid-Fire Scan-Friendly Bullet Points in Crisp Traditional Layout */}
          <div className="space-y-3.5 pt-1 text-sm sm:text-base text-slate-600 font-medium">
            {isProctology && (
              <>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs mt-0.5 shrink-0">✓</span>
                  <span><strong className="text-[#1D3A6F] font-black">100% Confidential Care:</strong> Discreet, private care coordination with unlabelled medical records to ensure your complete dignity and comfort.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs mt-0.5 shrink-0">✓</span>
                  <span><strong className="text-[#1D3A6F] font-black">No Cuts, No Stitches:</strong> Advanced USFDA laser protocol designed for rapid relief from recurring discomfort without open wound surgery.</span>
                </div>
              </>
            )}

            {isGeneral && (
              <>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs mt-0.5 shrink-0">✓</span>
                  <span><strong className="text-[#1D3A6F] font-black">Quick, Scarless Recovery:</strong> Minimally invasive laparoscopic and laser surgical techniques with rapid return to your normal daily routine.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs mt-0.5 shrink-0">✓</span>
                  <span><strong className="text-[#1D3A6F] font-black">Resume Work Tomorrow:</strong> Optimized day-care hospital admission designed for minimal disruption to your family and work schedule.</span>
                </div>
              </>
            )}

            {isUrology && (
              <>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs mt-0.5 shrink-0">✓</span>
                  <span><strong className="text-[#1D3A6F] font-black">Advanced ZSR &amp; Laser Method:</strong> High-precision, stitch-free procedure completed in just 20 minutes with gentle tissue preservation.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs mt-0.5 shrink-0">✓</span>
                  <span><strong className="text-[#1D3A6F] font-black">Same-Day Discharge:</strong> Walk home comfortably the very same afternoon without requiring overnight hospital admission.</span>
                </div>
              </>
            )}

            {!isProctology && !isGeneral && !isUrology && (
              <>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs mt-0.5 shrink-0">✓</span>
                  <span><strong className="text-[#1D3A6F] font-black">Advanced USFDA Protocols:</strong> Minimally invasive clinical technique performed by 15+ year veteran hospital experts.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs mt-0.5 shrink-0">✓</span>
                  <span><strong className="text-[#1D3A6F] font-black">Same-Day Discharge:</strong> Return home comfortably within hours under our optimized ambulatory day-care protocols.</span>
                </div>
              </>
            )}

            {/* Family-Centric Assurance Bullet */}
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-[#E58325] flex items-center justify-center font-black text-xs mt-0.5 shrink-0">★</span>
              <span><strong className="text-[#E58325] font-black">Zero Stress for Your Family:</strong> Same-day discharge, 100% cashless insurance paperwork handled directly by us, and complimentary surgical cab drops.</span>
            </div>

            {/* Native Language Trust Bullet */}
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-xs mt-0.5 shrink-0">✓</span>
              <span><strong className="text-[#1D3A6F] font-black">Speak in {location.nativeLanguage} {nativeTag}:</strong> Direct connection to your compassionate local surgical coordinator right now.</span>
            </div>
          </div>

          {/* High-Visibility Call & WhatsApp CTAs with Native Script */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-5">
            <a
              href={`tel:+${config.helplineRaw}`}
              className="px-7 py-4 rounded-2xl bg-[#1D3A6F] hover:bg-[#152C55] text-white font-black text-base sm:text-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 active:scale-95 shrink-0"
              title="Click to call senior surgical counseling helpline"
            >
              <Phone className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse shrink-0" />
              <span>{callNowLabel}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-black text-base transition-all shadow-[0_8px_25px_rgba(37,211,102,0.25)] hover:shadow-lg flex items-center justify-center gap-2 active:scale-95"
              title="Start confidential consultation on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-white text-white shrink-0" />
              <span className="text-center">{chatLabel}</span>
              <ChevronRight className="w-4 h-4 shrink-0 hidden md:inline text-white" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-1 pl-1">
            <span className="flex items-center gap-1.5 text-emerald-700 font-sans">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              On-Duty Medical Coordinator Available
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-600">
              <Lock className="w-3.5 h-3.5 text-slate-500" /> 100% Patient Privacy Guaranteed
            </span>
          </div>
        </div>

        {/* ── RIGHT: Traditional Medical Picture & Clinical Spec Card ────── */}
        <div className="lg:col-span-5 flex justify-center items-start w-full">
          <div className="w-full bg-white/95 backdrop-blur-md rounded-[2.2rem] p-6 border-2 border-slate-200/90 shadow-xl space-y-5 relative group hover:border-[#1D3A6F]/30 transition-all">
            
            {/* Card Header Strip */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 bg-[#1D3A6F]/10 text-[#1D3A6F] rounded-full">
                {isUrology ? 'Painless Laser & ZSR Relief' : 'USFDA Clinical Illustration'}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {isUrology ? 'Stitch-Free & Clean' : 'HD Medical Spec'}
              </span>
            </div>

            {/* Full-Width Procedure Relief Illustration */}
            <div className={`relative w-full rounded-2xl overflow-hidden ${isUrology ? 'bg-gradient-to-b from-white via-amber-50/20 to-amber-50/40' : 'bg-gradient-to-br from-slate-50 via-amber-50/30 to-blue-50/40'} border border-slate-100 shadow-inner min-h-[260px]`}>
              <div className={`absolute inset-0 flex items-center justify-center ${isUrology ? 'p-3 sm:p-4' : 'p-6'}`}>
                <Image
                  src={procedureImage}
                  alt={`${procedure.title} Procedure & Relief Guide in ${location.name}`}
                  width={isUrology ? 600 : 480}
                  height={isUrology ? 450 : 360}
                  className="w-full h-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ maxHeight: isUrology ? '300px' : '280px' }}
                />
              </div>
            </div>

            {/* Procedure Info Strip */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-black text-[#1D3A6F]">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#E58325] shrink-0" />
                  <span>{procedure.usfdaProtocol}</span>
                </span>
              </div>
              
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {isUrology 
                  ? `Advanced laser and ZSR stapler circumcision resolves tight foreskin (phimosis), recurrent irritation, and hygiene issues in just 20 minutes with zero blood loss and fast, painless recovery in ${location.name}.`
                  : `Precision USFDA laser and minimally invasive instrumentation designed for stitch-free tissue preservation, negligible pain, and rapid daycare recovery in ${location.name}.`
                }
              </p>

              {/* Quick Summary Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left shadow-xs">
                  <span className="text-[10px] font-extrabold text-slate-500 block uppercase tracking-wider">Procedure Time</span>
                  <span className="text-xs sm:text-sm font-black text-[#1D3A6F] mt-0.5 block">{procedure.procedureDuration}</span>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-left shadow-xs">
                  <span className="text-[10px] font-extrabold text-slate-500 block uppercase tracking-wider">Hospital Stay</span>
                  <span className="text-xs sm:text-sm font-black text-[#1D3A6F] mt-0.5 block">{procedure.hospitalStay}</span>
                </div>
              </div>

              {/* Admission & Family Support Assistance Banner */}
              <div className="flex items-center justify-between text-xs font-extrabold text-amber-900 bg-amber-50 px-4 py-2.5 rounded-xl border border-amber-200/70">
                <span>30+ Major Insurers Accepted</span>
                <span className="text-[#1D3A6F] font-black underline">Verify Cashless TPA &rarr;</span>
              </div>

              {/* Direct Telephone Helpline */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">24/7 {location.name} Direct Helpline:</span>
                <a
                  href={`tel:+${config.helplineRaw}`}
                  className="text-[#1D3A6F] font-black hover:text-[#E58325] flex items-center gap-1 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  {config.helplineNumber}
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
