import React from "react";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import type { CityOffer } from "@/data/regionalLocations";

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────
interface CityOfferCardProps {
  offer: CityOffer;
  nativeLanguage: string;
  whatsappUrl: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function CityOfferCard({ offer, nativeLanguage, whatsappUrl }: CityOfferCardProps) {
  return (
    <section
      aria-label="Empanelled Surgical Package"
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1D3A6F] via-[#152D56] to-[#0E2243] p-7 sm:p-10 shadow-2xl border border-blue-400/20 text-white my-10 font-sans"
    >
      {/* Subtle traditional medical glow (no noisy diagonal hazard stripes) */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-amber-400/15 via-blue-300/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* Left: Offer Details */}
        <div className="lg:col-span-8 space-y-4">

          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-300 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block animate-pulse" />
            <span>{offer.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight">
            {offer.headline}
          </h2>

          <p className="text-blue-100/90 font-bold text-base leading-relaxed">{offer.subtext}</p>

          {/* Bundle checklist */}
          <ul className="flex flex-wrap gap-2.5 pt-2">
            {offer.bundleItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 bg-white px-3.5 py-2 rounded-xl shadow-xs border border-white/90"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Urgency signal */}
          {offer.urgency && (
            <p className="text-xs sm:text-sm font-black text-amber-200 bg-amber-950/40 border border-amber-400/30 inline-flex items-center gap-2 px-4 py-2 rounded-xl mt-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block" />
              <span>{offer.urgency}</span>
            </p>
          )}
        </div>

        {/* Right: CTAs */}
        <div className="lg:col-span-4 flex flex-col gap-3.5 w-full">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/30 transition-all transform active:scale-95 text-base"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600 shrink-0" />
            <span>Consult in {nativeLanguage}</span>
          </a>
          <a
            href="#lead-capture"
            className="w-full bg-white/10 hover:bg-white/20 text-white font-black py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all border border-white/20 text-sm backdrop-blur-md active:scale-95"
          >
            <span>Request Instant Callback</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
