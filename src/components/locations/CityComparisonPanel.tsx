import React from "react";
import { CheckCircle2 } from "lucide-react";

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
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Benefits */}
      <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm space-y-4">
        <h3 className="text-xl font-black text-[#1D3A6F]">
          Why {cityName} Patients Choose HealthFlo for {procedureTitle}
        </h3>
        <ul className="space-y-3">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-3 text-sm font-medium text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
          {/* City-specific benefit */}
          <li className="flex items-start gap-3 text-sm font-medium text-slate-700">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <span>
              <strong>Free {nativeLanguage} coordinator</strong> — from your first WhatsApp message in{" "}
              {cityName} to discharge at our empanelled hospital.
            </span>
          </li>
        </ul>
      </div>

      {/* Local Hospitals Comparison */}
      <div className="bg-[#FAF9F5] border border-slate-200 rounded-3xl p-7 shadow-sm space-y-4">
        <h3 className="text-xl font-black text-[#1D3A6F]">
          HealthFlo vs. Major {cityName} Hospitals
        </h3>
        {localHospitals && localHospitals.length > 0 && (
          <p className="text-xs text-slate-500 font-medium">
            Patients from {localHospitals.join(", ")} frequently transfer to HealthFlo-empanelled facilities
            for faster, Insurance Eligible laser care.
          </p>
        )}
        <div className="space-y-2 pt-1">
          {[
            { metric: "Insurance Pre-auth", us: "30 minutes — same visit", them: "2–5 days processing" },
            { metric: "Appointment Wait", us: "This week guaranteed", them: "4–12 week waitlist" },
            { metric: "Daycare Discharge", us: "Go home in 2–3 hours", them: "1–3 night admission" },
            { metric: "Language Support", us: `${nativeLanguage} coordinator`, them: "General staff only" },
          ].map(({ metric, us, them }) => (
            <div key={metric} className="grid grid-cols-3 text-xs border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
              <div className="bg-slate-100 px-3 py-2.5 font-bold text-slate-600 col-span-1 flex items-center">{metric}</div>
              <div className="bg-emerald-50 px-3 py-2.5 font-bold text-emerald-800 col-span-1 flex items-center">✓ {us}</div>
              <div className="bg-slate-50 px-3 py-2.5 font-medium text-slate-400 col-span-1 line-through flex items-center">{them}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
