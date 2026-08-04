import React from "react";
import Link from "next/link";
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
  return (
    <section className="relative rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-[#0B1426] to-slate-900 text-white p-6 sm:p-10 md:p-14 overflow-hidden border border-slate-800 shadow-2xl">

      {/* Ambient Aura Layers */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0055ff]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

        {/* ── LEFT: Content ────────────────────────────────────────────── */}
        <div className="lg:col-span-7 space-y-6">

          {/* Identity Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#00E5FF] font-extrabold text-[11px] tracking-wider uppercase flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              <span>{areaName ? `${areaName}, ${location.name}` : location.name} • {location.stateName}</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" />
              <span>Insurance Eligible</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-[11px] uppercase tracking-wider">
              {procedure.procedureDuration}
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white">
            {procedure.shortTitle} {areaName ? "in" : "in"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A2FF] via-[#00E5FF] to-teal-400">
              {areaName ? `${areaName}, ${location.name}` : location.name}.
            </span>
          </h1>

          {/* Hyperlocal Description */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
            {areaName ? (
              <>
                Dedicated surgical network access for patients residing in <strong className="text-white">{areaName}</strong> and nearby {location.name} sectors.
              </>
            ) : (
              <>
                Serving patients from{" "}
                <strong className="text-white">
                  {location.keyNeighbourhoods.slice(0, 4).join(", ")}
                </strong>
                {location.keyNeighbourhoods.length > 4 && (
                  <> and {location.keyNeighbourhoods.length - 4} more areas in {location.name}</>
                )}
                .
              </>
            )}{" "}
            {procedure.description.split(".")[0]}. Insurance Eligible with{" "}
            <strong className="text-emerald-300">same-day discharge</strong> and{" "}
            <strong className="text-emerald-300">{location.nativeLanguage} coordinator</strong> support.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base transition-all shadow-[0_8px_30px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950 shrink-0" />
              <span>Chat in {location.nativeLanguage} — Free Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+919363650066"
              className="px-6 py-4 rounded-2xl bg-slate-700/80 hover:bg-slate-600 text-white font-black text-base transition-all border border-slate-600 flex items-center justify-center gap-2 active:scale-95"
            >
              <Phone className="w-5 h-5 text-[#00E5FF] fill-[#00E5FF] animate-pulse shrink-0" />
              <span>+91 93636 50066</span>
            </a>
          </div>
        </div>

        {/* ── RIGHT: Procedure Stats Card ───────────────────────────────── */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-[2.2rem] p-6 sm:p-8 space-y-5 shadow-2xl">

            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0066FF] to-teal-500 flex items-center justify-center shadow-md shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#00E5FF] block truncate max-w-[240px]">
                  USFDA PROTOCOL — {(areaName || location.name).toUpperCase()}
                </span>
                <p className="text-white font-extrabold text-sm leading-tight">{procedure.usfdaProtocol}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Clock,    label: "Duration",     value: procedure.procedureDuration },
                { icon: Zap,      label: "Recovery",     value: procedure.recoveryTime },
                { icon: Building2, label: "Hospital Stay", value: procedure.hospitalStay },
                { icon: ShieldCheck, label: "Anesthesia", value: procedure.anesthesia },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="bg-slate-700/60 rounded-2xl p-3.5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#00E5FF]">
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-black uppercase tracking-wider">{label}</span>
                  </div>
                  <p className="text-white text-xs font-bold leading-tight">{value}</p>
                </div>
              ))}
            </div>

            {/* Transit */}
            <div className="flex items-start gap-3 bg-slate-700/40 rounded-2xl p-3.5">
              <Navigation className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[#00E5FF]">
                  {areaName ? `${areaName} Transit Support` : `${location.name} Transit Support`}
                </p>
                <p className="text-slate-200 text-xs font-medium">{location.transitTime}</p>
              </div>
            </div>

            {/* Hotline */}
            <div className="pt-1 border-t border-slate-700 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">24/7 {location.name} Helpline:</span>
              <a
                href="tel:+919363650066"
                className="text-white font-black hover:text-[#00E5FF] text-sm flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#00E5FF]" />
                +91 93636 50066
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
