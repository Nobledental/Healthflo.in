import React from "react";
import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { toAreaSlug } from "@/data/regionalLocations";

interface NeighbourhoodGridProps {
  cityName: string;
  neighbourhoods: string[];
  transitTime: string;
  railwayStation?: string;
  titleOverride?: string;
  descriptionOverride?: string;
  stateSlug?: string;
  citySlug?: string;
  procedureSlug?: string;
  activeAreaSlug?: string;
}

export default function NeighbourhoodGrid({
  cityName,
  neighbourhoods,
  transitTime,
  railwayStation,
  titleOverride,
  descriptionOverride,
  stateSlug,
  citySlug,
  procedureSlug,
  activeAreaSlug,
}: NeighbourhoodGridProps) {
  if (!neighbourhoods || neighbourhoods.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <span className="text-[#1D3A6F] font-black text-xs uppercase tracking-widest block mb-1">
          Areas We Serve — {cityName}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {titleOverride || `Coverage Across All ${cityName} Neighbourhoods`}
        </h2>
        <p className="text-slate-600 font-medium text-sm mt-2 max-w-3xl">
          {descriptionOverride || (
            <>
              Patients from all areas of {cityName} reach our HealthFlo-empanelled hospitals within{" "}
              {transitTime.toLowerCase()}.
              {railwayStation && (
                <> Free cab pickup available from <strong>{railwayStation}</strong> and key transit terminals.</>
              )}
            </>
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {neighbourhoods.map((area) => {
          const areaSlug = toAreaSlug(area);
          const isLink = stateSlug && citySlug && procedureSlug;
          const isActive = activeAreaSlug === areaSlug;
          const href = isLink
            ? `/locations/${stateSlug}/${citySlug}/${procedureSlug}/${areaSlug}`
            : undefined;

          if (isLink && href) {
            return (
              <Link
                key={area}
                href={href}
                className={`group flex items-center justify-between gap-2 border rounded-2xl px-4 py-3 transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[#1D3A6F] to-[#0D1F3C] border-[#00E5FF] text-white shadow-md pointer-events-none"
                    : "bg-white border-slate-200 hover:border-[#1D3A6F] hover:shadow-md hover:bg-slate-50/50"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? "bg-white/10" : "bg-[#1D3A6F]/8 group-hover:bg-[#1D3A6F]/15"
                    }`}
                  >
                    <MapPin className={`w-3.5 h-3.5 ${isActive ? "text-[#00E5FF]" : "text-[#1D3A6F]"}`} />
                  </div>
                  <span
                    className={`text-sm font-bold truncate transition-colors ${
                      isActive ? "text-white" : "text-slate-700 group-hover:text-[#1D3A6F]"
                    }`}
                  >
                    {area}
                  </span>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                    isActive ? "text-[#00E5FF]" : "text-slate-400 group-hover:text-[#1D3A6F]"
                  }`}
                />
              </Link>
            );
          }

          return (
            <div
              key={area}
              className="group flex items-center gap-2.5 bg-white border border-slate-200 rounded-2xl px-4 py-3 hover:border-[#1D3A6F] hover:shadow-md transition-all cursor-default"
            >
              <div className="w-6 h-6 rounded-lg bg-[#1D3A6F]/8 flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-[#1D3A6F]" />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-[#1D3A6F] transition-colors leading-tight truncate">
                {area}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

