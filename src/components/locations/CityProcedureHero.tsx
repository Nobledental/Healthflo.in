"use client";

import React from "react";
import Link from "next/link";
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
  Lock
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

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function CityProcedureHero({
  location,
  procedure,
  whatsappUrl,
  areaName,
}: CityProcedureHeroProps) {
  const { config } = useSiteConfig();

  // Native script trust anchor calculation for Tamil Nadu and Southern states
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

  // Procedure-specific conversion bullets based on clinical anxiety and emotional motivation
  const isProctology = procedure.category === "Piles, Fissure & Anal Care" || procedure.id.includes("piles") || procedure.id.includes("fistula") || procedure.id.includes("fissure");
  const isGeneral = procedure.category === "Hernia, Veins & General Care" || procedure.id.includes("hernia") || procedure.id.includes("lipoma") || procedure.id.includes("varicose") || procedure.id.includes("hydrocele");
  const isUrology = procedure.category === "Circumcision & Men's Health" || procedure.id.includes("circumcision");

  return (
    <section className="relative rounded-[2.5rem] bg-gradient-to-br from-[#070D1B] via-[#0B152A] to-[#070D1B] text-white p-6 sm:p-10 md:p-14 overflow-hidden border border-slate-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] font-sans">
      {/* Warm & Trust-Building Ambient Lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* ── LEFT: Conversion Optimized Copy ────────────────────────────── */}
        <div className="lg:col-span-7 space-y-6">
          {/* Trust Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-600/20 border border-blue-500/40 text-cyan-300 font-extrabold text-[11px] tracking-wider uppercase flex items-center gap-1.5 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{areaName ? `${areaName}, ${location.name}` : location.name} • {location.stateName}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% Cashless Insurance &amp; EMI</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-amber-400 shrink-0" />
              <span>Senior Specialists</span>
            </span>
          </div>

          {/* H1 - High Intent Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white">
            {procedure.shortTitle} {areaName ? "in" : "in"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400">
              {areaName ? `${areaName}, ${location.name}` : location.name}.
            </span>
          </h1>

          {/* Human-Centric Senior Doctor Subtitle (Replaced system/engine jargon with clinical authority) */}
          <p className="text-slate-200 text-base sm:text-lg font-bold leading-relaxed">
            Consult with {location.name}&apos;s senior-most surgical specialists (<span className="text-amber-300 font-black">15+ years clinical experience</span>) at premium empanelled NMC-registered hospitals.
          </p>

          {/* Rapid-Fire Scan-Friendly Bullet Points (People scan, they don't read) */}
          <div className="space-y-3 pt-1 text-sm sm:text-base text-slate-200 font-medium">
            {isProctology && (
              <>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-extrabold select-none mt-0.5 shrink-0">✔️</span>
                  <span><strong className="text-white font-black">100% Confidential Care:</strong> Discreet, private coordination with unlabelled medical records to ensure complete dignity.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-extrabold select-none mt-0.5 shrink-0">✔️</span>
                  <span><strong className="text-white font-black">No Cuts, No Stitches:</strong> Advanced USFDA laser protocol designed for rapid relief from recurring discomfort without open wound surgery.</span>
                </div>
              </>
            )}

            {isGeneral && (
              <>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-extrabold select-none mt-0.5 shrink-0">✔️</span>
                  <span><strong className="text-white font-black">Quick, Scarless Recovery:</strong> Minimally invasive laparoscopic and laser techniques with rapid return to daily routine.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-extrabold select-none mt-0.5 shrink-0">✔️</span>
                  <span><strong className="text-white font-black">Resume Work Tomorrow:</strong> Optimized day-care surgical care with minimal disruption to your professional schedule.</span>
                </div>
              </>
            )}

            {isUrology && (
              <>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-extrabold select-none mt-0.5 shrink-0">✔️</span>
                  <span><strong className="text-white font-black">Advanced ZSR Laser Method:</strong> High-precision, stitch-free procedure completed in just 20 minutes with gentle recovery.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-extrabold select-none mt-0.5 shrink-0">✔️</span>
                  <span><strong className="text-white font-black">Same-Day Discharge:</strong> Walk home comfortably the very same afternoon without overnight hospital admission.</span>
                </div>
              </>
            )}

            {!isProctology && !isGeneral && !isUrology && (
              <>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-extrabold select-none mt-0.5 shrink-0">✔️</span>
                  <span><strong className="text-white font-black">Advanced USFDA Protocols:</strong> Minimally invasive clinical technique performed by 15+ year senior hospital experts.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-extrabold select-none mt-0.5 shrink-0">✔️</span>
                  <span><strong className="text-white font-black">Same-Day Discharge:</strong> Return home comfortably within hours under optimized ambulatory care.</span>
                </div>
              </>
            )}

            {/* Family-Centric Assurance Bullet (Crucial for Indian & Tamil Nadu Families) */}
            <div className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-extrabold select-none mt-0.5 shrink-0">✔️</span>
              <span><strong className="text-amber-300 font-black">Zero Stress for Your Family:</strong> Same-day discharge, 100% cashless insurance paperwork handled directly by us, and complimentary surgical cab drops.</span>
            </div>

            {/* Native Language Trust Bullet */}
            <div className="flex items-start gap-2.5">
              <span className="text-emerald-400 font-extrabold select-none mt-0.5 shrink-0">✔️</span>
              <span><strong className="text-cyan-300 font-black">Speak in {location.nativeLanguage} {nativeTag}:</strong> Direct connection to your compassionate local surgical coordinator right now.</span>
            </div>
          </div>

          {/* High-Visibility Call & WhatsApp CTAs with Native Script */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-5">
            <a
              href={`tel:+${config.helplineRaw}`}
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-[#0066FF] to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-black text-base sm:text-lg transition-all shadow-[0_10px_35px_rgba(0,102,255,0.4)] border border-blue-400/60 flex items-center justify-center gap-2.5 active:scale-95 shrink-0"
              title="Click to call senior surgical counseling helpline"
            >
              <Phone className="w-5 h-5 text-white fill-white animate-pulse shrink-0" />
              <span>{callNowLabel}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-base transition-all shadow-[0_8px_30px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2 active:scale-95"
              title="Start confidential consultation on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950 shrink-0" />
              <span className="text-center">{chatLabel}</span>
              <ChevronRight className="w-4 h-4 shrink-0 hidden md:inline" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 pt-1 pl-1">
            <span className="flex items-center gap-1 text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              On-Duty Coordinator Available
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-cyan-400" /> 100% Patient Privacy Guaranteed
            </span>
          </div>
        </div>

        {/* ── RIGHT: Warm Humanized Care & Procedure Stats Card ───────────── */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-gradient-to-b from-[#0C172E]/95 to-[#081020]/95 backdrop-blur-xl border border-slate-700/90 rounded-[2.2rem] p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Human Care Coordinator & Senior Surgeon Trust Header */}
            <div className="p-4 rounded-2xl bg-[#0F1E3A] border border-blue-500/30 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md border-2 border-white/20 shrink-0">
                  <HeartHandshake className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-white">{location.name} Clinical Care Desk</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px] uppercase">{location.nativeLanguage} Support</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium leading-normal mt-0.5">
                    Speak directly with a medical care guide &amp; schedule consultation with senior specialists (15+ yrs experience).
                  </p>
                </div>
              </div>
            </div>

            {/* USFDA Clinical Protocol Title */}
            <div className="flex items-center justify-between gap-3 px-1">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 block">
                  USFDA SURGICAL PROTOCOL — {(areaName || location.name).toUpperCase()}
                </span>
                <p className="text-white font-extrabold text-sm leading-tight">{procedure.usfdaProtocol}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
            </div>

            {/* Quick Summary Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Clock, label: "Procedure Time", value: procedure.procedureDuration },
                { icon: Zap, label: "Hospital Stay", value: procedure.hospitalStay },
                { icon: ShieldCheck, label: "Anesthesia Care", value: procedure.anesthesia },
                { icon: Building2, label: "Hospital Tier", value: "Empanelled Network" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-[#060D19]/90 border border-slate-800/80 rounded-2xl p-3.5 space-y-1 shadow-inner">
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</span>
                  </div>
                  <p className="text-white text-xs font-bold leading-tight truncate">{value}</p>
                </div>
              ))}
            </div>

            {/* Admission & Family Support Assistance */}
            <div className="flex items-start gap-3 bg-slate-800/60 rounded-2xl p-3.5 border border-slate-700/50">
              <Navigation className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-black text-white flex items-center gap-1.5">
                  <span>{areaName ? `${areaName} Family & Cab Support` : `${location.name} Family & Cab Support`}</span>
                </p>
                <p className="text-slate-300 text-xs font-medium mt-0.5 leading-relaxed">
                  Complimentary patient pickup, zero paperwork hassle, and immediate room allocation upon hospital arrival.
                </p>
              </div>
            </div>

            {/* Direct Telephone Hotline */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">24/7 {location.name} Direct Helpline:</span>
              <a
                href={`tel:+${config.helplineRaw}`}
                className="text-white font-black hover:text-cyan-400 text-sm flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                {config.helplineNumber}
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

