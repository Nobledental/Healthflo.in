import React from "react";
import { CheckCircle2, X, Award, ShieldCheck } from "lucide-react";
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
    <section className="space-y-6 my-10">
      <div className="border-b border-slate-200/80 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1D3A6F]/10 text-[#1D3A6F] text-xs font-black uppercase tracking-wider mb-2.5">
          <Award className="w-3.5 h-3.5" />
          <span>Clinical Efficacy &amp; Safety Evaluation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
          {procedureTitle}: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D3A6F] to-teal-700">HealthFlo Laser vs. Traditional Surgery</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Evidence-based medical comparison demonstrating why minimally invasive laser intervention accelerates recovery and eliminates post-operative pain.
        </p>
      </div>

      {/* ── DESKTOP & TABLET VIEW (Clean 3-Column Architectural Table) ── */}
      <div className="hidden md:block overflow-hidden rounded-[2rem] border border-slate-200 shadow-lg bg-white">
        <div className="grid grid-cols-12 text-xs font-black uppercase tracking-widest bg-slate-900 text-white">
          <div className="col-span-4 p-5 text-slate-300">Surgical &amp; Recovery Metric</div>
          <div className="col-span-4 p-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>HealthFlo Advanced Laser</span>
          </div>
          <div className="col-span-4 p-5 bg-slate-800 text-slate-400 text-center">Conventional Open Surgery</div>
        </div>

        {comparison.map((row, idx) => (
          <div
            key={row.metric}
            className={`grid grid-cols-12 text-sm border-t border-slate-100 transition hover:bg-emerald-50/10 ${
              idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"
            }`}
          >
            <div className="col-span-4 p-5 font-bold text-slate-800 flex items-center text-base">
              {row.metric}
            </div>
            
            <div className="col-span-4 p-5 text-emerald-950 font-black text-center flex items-center justify-center gap-2 bg-emerald-50/50 border-x border-emerald-100/60 text-base">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 stroke-[2.5]" />
              <span>{row.healthflo}</span>
            </div>
            
            <div className="col-span-4 p-5 text-slate-500 font-semibold text-center flex items-center justify-center gap-2">
              <X className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{row.traditional}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── MOBILE CARD VIEW (Responsive, Stacked Tiles for Small Screens) ── */}
      <div className="md:hidden space-y-4">
        {comparison.map((row) => (
          <div 
            key={row.metric} 
            className="p-5 rounded-3xl bg-white border border-slate-200 shadow-md space-y-3.5 relative overflow-hidden"
          >
            {/* Metric Banner */}
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Comparison Metric</span>
              <span className="px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-black">
                {row.metric}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-0.5">
              {/* HealthFlo Laser Protocol */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white border border-emerald-200/80 shadow-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>HealthFlo Laser Protocol</span>
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-600 text-white">Recommended</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 stroke-[3]" />
                  <p className="text-base font-black text-slate-900">{row.healthflo}</p>
                </div>
              </div>

              {/* Conventional Surgery */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1 text-slate-500">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Conventional Open Surgery
                </span>
                <div className="flex items-center gap-2 pt-0.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 stroke-[2.5]" />
                  <p className="text-sm font-semibold text-slate-600">{row.traditional}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
