import React from "react";
import { CheckCircle2 } from "lucide-react";
import type { SpecialityComparison } from "@/data/specialities";

interface ProcedureComparisonTableProps {
  procedureTitle: string;
  comparison: SpecialityComparison[];
}

export default function ProcedureComparisonTable({
  procedureTitle,
  comparison,
}: ProcedureComparisonTableProps) {
  if (!comparison || comparison.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="border-b border-slate-200 pb-5">
        <span className="text-[#1D3A6F] font-black text-xs uppercase tracking-widest block mb-1">
          Side by Side Comparison
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {procedureTitle} — HealthFlo Laser vs. Traditional Surgery
        </h2>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
        {/* Header */}
        <div className="grid grid-cols-3 text-xs font-black uppercase tracking-widest">
          <div className="bg-slate-100 p-4 text-slate-500">What We Compare</div>
          <div className="bg-[#1D3A6F] p-4 text-white text-center">HealthFlo Laser</div>
          <div className="bg-slate-200 p-4 text-slate-500 text-center">Old Open Surgery</div>
        </div>
        {comparison.map((row, idx) => (
          <div
            key={row.metric}
            className={`grid grid-cols-3 text-sm border-t border-slate-100 ${
              idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"
            }`}
          >
            <div className="p-4 font-bold text-slate-700 flex items-center">{row.metric}</div>
            <div className="p-4 text-emerald-800 font-semibold text-center flex items-center justify-center gap-1.5 bg-emerald-50/30">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{row.healthflo}</span>
            </div>
            <div className="p-4 text-slate-400 font-medium text-center flex items-center justify-center">{row.traditional}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
