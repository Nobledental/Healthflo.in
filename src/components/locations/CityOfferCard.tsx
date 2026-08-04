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
      aria-label="Special Package"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#E58325] via-amber-500 to-amber-400 p-6 sm:p-8 shadow-xl"
    >
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

        {/* Left: Offer Details */}
        <div className="lg:col-span-8 space-y-3">

          <span className="text-[11px] font-black uppercase tracking-widest text-amber-900 bg-white/30 px-3 py-1 rounded-full inline-block">
            {offer.badge}
          </span>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            {offer.headline}
          </h2>

          <p className="text-slate-800 font-semibold text-sm">{offer.subtext}</p>

          {/* Bundle checklist */}
          <ul className="flex flex-wrap gap-2 pt-1">
            {offer.bundleItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-white/40 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* Urgency signal */}
          {offer.urgency && (
            <p className="text-xs font-extrabold text-red-900 bg-white/30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-700 animate-pulse inline-block" />
              {offer.urgency}
            </p>
          )}
        </div>

        {/* Right: CTAs */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-white shrink-0" />
            <span>Claim in {nativeLanguage}</span>
          </a>
          <a
            href="#lead-capture"
            className="bg-white/40 hover:bg-white/60 text-slate-900 font-black py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all border border-white/60 text-sm active:scale-95"
          >
            <span>Request Callback</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
