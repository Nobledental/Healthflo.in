import React from "react";
import Link from "next/link";
import { specialitiesData } from "@/data/specialities";

interface CrossSellProceduresProps {
  stateSlug: string;
  citySlug: string;
  cityName: string;
  currentProcedureId?: string;
}

export default function CrossSellProcedures({
  stateSlug,
  citySlug,
  cityName,
  currentProcedureId,
}: CrossSellProceduresProps) {
  const procedures = Object.values(specialitiesData).filter(
    (p) => p.id !== currentProcedureId
  );

  if (procedures.length === 0) return null;

  return (
    <section className="space-y-5">
      <h3 className="text-xl font-black text-slate-900">
        Other Procedures Available in {cityName}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {procedures.map((p) => (
          <Link
            key={p.id}
            href={`/locations/${stateSlug}/${citySlug}/${p.id}`}
            className="group flex flex-col justify-between gap-2 bg-white border border-slate-200 hover:border-[#1D3A6F] hover:shadow-md rounded-2xl p-4 transition-all text-center"
          >
            <div>
              <span className="text-sm font-extrabold text-[#1D3A6F] group-hover:text-[#E58325] transition-colors leading-tight block mb-1">
                {p.shortTitle}
              </span>
              <span className="text-[11px] text-slate-400 font-medium block">
                {p.procedureDuration}
              </span>
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 pt-2 border-t border-slate-100">
              Insurance Eligible →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
