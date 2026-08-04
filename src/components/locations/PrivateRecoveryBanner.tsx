import React from "react";
import { ArrowRight } from "lucide-react";
import type { HoneymoonSpot } from "@/data/regionalLocations";

interface PrivateRecoveryBannerProps {
  cityName: string;
  honeymoonSpot?: HoneymoonSpot;
  whatsappUrl: string;
}

export default function PrivateRecoveryBanner({
  cityName,
  honeymoonSpot,
  whatsappUrl,
}: PrivateRecoveryBannerProps) {
  if (!honeymoonSpot) return null;

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1D3A6F]/5 via-white to-amber-50/40 border border-[#1D3A6F]/10 p-6 sm:p-8 shadow-sm">
      <div className="max-w-3xl space-y-3">
        <span className="text-[11px] font-black uppercase tracking-widest text-[#1D3A6F]/50">
          Post-Procedure Comfort — Private Recovery Option
        </span>
        <h3 className="text-lg sm:text-xl font-black text-[#1D3A6F]">
          Recovering Near {honeymoonSpot.name}
          <span className="ml-2 text-sm font-semibold text-slate-400">({honeymoonSpot.distance})</span>
        </h3>
        <p className="text-slate-600 font-medium text-sm leading-relaxed">
          {honeymoonSpot.description} Many of our {cityName} patients choose to combine their same-day
          discharge with a short private recovery stay nearby — away from colleagues and family, in a calm and
          comfortable environment.
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#1D3A6F] hover:text-[#E58325] transition-colors pt-1"
        >
          <span>Ask our coordinator about private recovery arrangements</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
