import React from "react";
import { Building2, ShieldCheck, CreditCard, Stethoscope, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ConciergeServicesProps {
  cityName: string;
}

export default function ConciergeServices({ cityName }: ConciergeServicesProps) {
  const services = [
    {
      icon: Building2,
      title: "Select Hospital & Budget",
      desc: `Choose from our network of premium, empanelled hospitals in ${cityName} that perfectly match your budget and location preferences.`,
      color: "bg-blue-50 text-blue-600 border-blue-100",
      iconColor: "text-blue-500",
    },
    {
      icon: Stethoscope,
      title: "Best Treatment Care",
      desc: "Get operated by senior surgeons with 15+ years of experience using USFDA-approved laser & laparoscopic technology.",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      iconColor: "text-emerald-500",
    },
    {
      icon: ShieldCheck,
      title: "100% Cashless TPA Support",
      desc: "Our dedicated insurance desk handles all the paperwork for you, ensuring fast-track digital pre-approval with 95+ insurers.",
      color: "bg-purple-50 text-purple-600 border-purple-100",
      iconColor: "text-purple-500",
    },
    {
      icon: CreditCard,
      title: "0% EMI & Financing",
      desc: "Don't delay your recovery. Flexible, no-cost EMI plans starting from just ₹999/month make treatment affordable for everyone.",
      color: "bg-amber-50 text-amber-600 border-amber-100",
      iconColor: "text-amber-500",
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Clinical Care Concierge</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Clinical Package &amp; <span className="text-emerald-600">Cashless TPA Concierge</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            Fast-Track Hospital Pre-Approval &amp; Seamless Treatment Journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <div key={idx} className={`p-6 rounded-3xl border transition-all hover:-translate-y-1 hover:shadow-lg ${svc.color} bg-opacity-50`}>
              <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-5 ${svc.iconColor}`}>
                <svc.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{svc.title}</h3>
              <p className="text-sm text-slate-700 font-medium leading-relaxed">{svc.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="#lead-capture" className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-md active:scale-95">
            <span>Check My Eligibility Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
