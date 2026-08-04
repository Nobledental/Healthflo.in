import React from "react";

interface LocalHospitalContextProps {
  cityName: string;
  localHospitals: string[];
}

export default function LocalHospitalContext({
  cityName,
  localHospitals,
}: LocalHospitalContextProps) {
  if (!localHospitals || localHospitals.length === 0) return null;

  return (
    <section className="bg-[#FAF9F5] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4">
      <h3 className="text-xl font-black text-[#1D3A6F]">
        Why {cityName} Patients Transfer to HealthFlo-Empanelled Hospitals
      </h3>
      <p className="text-sm text-slate-500 font-medium">
        Many patients from {localHospitals.join(", ")} contact HealthFlo for faster Insurance Eligible
        laser care with guaranteed same-week appointments.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {[
          { label: "Insurance Pre-auth", us: "30 minutes", them: "2–5 days" },
          { label: "Appointment", us: "This week", them: "4–12 weeks" },
          { label: "Hospital Stay", us: "0 nights — daycare", them: "1–3 nights" },
        ].map(({ label, us, them }) => (
          <div key={label} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="bg-slate-100 px-4 py-2 text-xs font-black text-slate-500 uppercase tracking-wider">
              {label}
            </div>
            <div className="grid grid-cols-2 text-xs divide-x divide-slate-100">
              <div className="px-3 py-2.5 text-emerald-800 font-bold flex items-center">✓ {us}</div>
              <div className="px-3 py-2.5 text-slate-400 font-medium line-through flex items-center">{them}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
