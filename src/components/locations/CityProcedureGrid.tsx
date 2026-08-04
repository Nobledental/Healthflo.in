import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { specialitiesData } from "@/data/specialities";

interface CityProcedureGridProps {
  stateSlug: string;
  citySlug: string;
  cityName: string;
  keyNeighbourhoods?: string[];
}

export default function CityProcedureGrid({
  stateSlug,
  citySlug,
  cityName,
  keyNeighbourhoods = [],
}: CityProcedureGridProps) {
  const procedures = Object.values(specialitiesData);

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <span className="text-[#1D3A6F] font-extrabold text-xs uppercase tracking-widest block mb-1">
            AVAILABLE FOR {cityName.toUpperCase()} PATIENTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Insurance Eligible Surgical Packages in {cityName}
          </h2>
        </div>
        <p className="text-slate-500 font-medium text-sm max-w-md">
          All-inclusive. Zero room-rent cap penalties. No hidden disposable charges.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {procedures.map((proc) => (
          <Link
            key={proc.id}
            href={`/locations/${stateSlug}/${citySlug}/${proc.id}`}
            className="group relative flex flex-col justify-between p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:border-[#1D3A6F] hover:shadow-lg transition-all overflow-hidden"
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1D3A6F]/0 to-[#1D3A6F]/0 group-hover:from-[#1D3A6F]/3 group-hover:to-transparent transition-all pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#E58325] block mb-2">
                {proc.category}
              </span>
              <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-[#1D3A6F] transition-colors leading-tight">
                {proc.shortTitle} in {cityName}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">
                {proc.procedureDuration} • {proc.recoveryTime} • Insurance Eligible
              </p>

              {/* Mini neighbourhood signal */}
              {keyNeighbourhoods.length > 0 && (
                <p className="text-[11px] text-slate-400 font-medium">
                  Serving: {keyNeighbourhoods.slice(0, 3).join(", ")}
                  {keyNeighbourhoods.length > 3 && " & more"}
                </p>
              )}
            </div>

            <div className="relative z-10 mt-5 flex items-center justify-between">
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-lg">
                Insurance Eligible
              </span>
              <span className="inline-flex items-center text-[#1D3A6F] font-extrabold text-xs group-hover:translate-x-1 transition-all uppercase tracking-wider gap-1">
                View Details
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
