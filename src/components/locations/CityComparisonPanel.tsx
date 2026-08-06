import React from "react";
import { CheckCircle2, X, Clock, ShieldAlert, HeartHandshake, Sparkles } from "lucide-react";

interface CityComparisonPanelProps {
  cityName: string;
  procedureTitle: string;
  benefits: string[];
  nativeLanguage: string;
  localHospitals: string[];
}

export default function CityComparisonPanel({
  cityName,
  procedureTitle,
  benefits,
  nativeLanguage,
  localHospitals,
}: CityComparisonPanelProps) {
  const comparisonData = [
    { metric: "Insurance Pre-auth", us: "Fast-Track Digital Processing", them: "Tedious Paperwork & Delays", icon: Clock },
    { metric: "Appointment Wait", us: "Priority Same/Next-Day Slots", them: "Long OPD Queues & Waiting", icon: Sparkles },
    { metric: "Daycare Discharge", us: "Ambulatory (Discharge in Hours)", them: "1–3 Night Inpatient Stay", icon: CheckCircle2 },
    { metric: "Language & Care Support", us: `Dedicated ${nativeLanguage} Care Coordinator`, them: "Unassisted Hospital Navigation", icon: HeartHandshake },
  ];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-10">
      
      {/* ── LEFT: WHY PATIENTS CHOOSE HEALTHFLO ──────────────────────────── */}
      <div className="bg-gradient-to-br from-white via-slate-50/60 to-white border border-slate-200/80 rounded-[2.5rem] p-7 sm:p-9 shadow-lg flex flex-col justify-between relative overflow-hidden">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-wider border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Empanelled Excellence in {cityName}</span>
          </div>
          
          <h3 className="text-2xl sm:text-3xl font-black text-[#1D3A6F] tracking-tight leading-tight">
            Why {cityName} Patients Prefer HealthFlo for {procedureTitle}
          </h3>
          
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            We combine high-precision USFDA laser equipment with compassionate surgical care to eliminate operational trauma and administrative friction.
          </p>

          <ul className="space-y-4 pt-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3.5 text-sm sm:text-base font-bold text-slate-800 bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                <span>{benefit}</span>
              </li>
            ))}
            
            {/* Dedicated Language Coordinator Feature */}
            <li className="flex items-start gap-3.5 text-sm sm:text-base font-bold text-slate-900 bg-gradient-to-r from-emerald-50/80 to-teal-50/50 p-4 rounded-2xl border border-emerald-200 shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
              <span>
                <strong className="text-emerald-900 font-black">Dedicated {nativeLanguage} Clinical Coordinator:</strong> Personal advocacy from your initial WhatsApp inquiry in {cityName} through complete surgical discharge and home recovery.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── RIGHT: LOCAL HOSPITAL BENCHMARKING MATRIX ──────────────────────── */}
      <div className="bg-slate-900 border border-slate-800 text-white rounded-[2.5rem] p-7 sm:p-9 shadow-2xl flex flex-col justify-between relative overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-[#00E5FF] text-xs font-extrabold uppercase tracking-wider border border-blue-500/30">
            <span>Surgical Network Benchmark</span>
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              HealthFlo vs. Major {cityName} Hospitals
            </h3>
            {localHospitals && localHospitals.length > 0 && (
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Patients regularly transition from conventional municipal centers to HealthFlo empanelled surgical facilities for zero-waiting, 100% cashless laser treatments.
              </p>
            )}
          </div>

          {/* Comparative Cards / Rows */}
          <div className="space-y-3.5 pt-2">
            {comparisonData.map(({ metric, us, them, icon: Icon }) => (
              <div key={metric} className="p-4 rounded-2xl bg-[#0C162A] border border-slate-800/90 shadow-md space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-cyan-300 border-b border-slate-800 pb-2">
                  <Icon className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{metric}</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[9px] text-emerald-300/80 uppercase font-black block">HealthFlo Roster</span>
                      <span className="text-xs sm:text-sm font-black text-emerald-300 block">{us}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-500/80 shrink-0" />
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase font-bold block">Conventional Care</span>
                      <span className="text-xs sm:text-sm font-semibold text-slate-400 block line-through">{them}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
