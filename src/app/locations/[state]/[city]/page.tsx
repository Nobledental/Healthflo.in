import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadCapture from "@/sections/LeadCapture";
import FAQ from "@/sections/FAQ";
import { REGIONAL_LOCATIONS, getLocationBySlug } from "@/data/regionalLocations";
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Navigation, 
  ShieldCheck, 
  CheckCircle2, 
  Globe2, 
  Clock, 
  Award, 
  ChevronRight,
  Sparkles
} from "lucide-react";

type Props = {
  params: Promise<{ state: string; city: string }> | { state: string; city: string };
};

export async function generateStaticParams() {
  return REGIONAL_LOCATIONS.map((loc) => ({
    state: loc.stateSlug,
    city: loc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const location = getLocationBySlug(resolved.state, resolved.city);
  if (!location) {
    return { title: "Location Not Found | HealthFlo Surgical Network" };
  }

  return {
    title: `Laser Surgery & Cashless Hospital Care in ${location.name} | HealthFlo`,
    description: `Top USFDA laser and laparoscopic hospital surgical care serving ${location.name}, ${location.stateName}. 100% cashless insurance approval, native ${location.nativeLanguage} surgical coordinators, zero upfront deposit, and ${location.transitTime.toLowerCase()}.`,
    keywords: [
      `Laser surgery in ${location.name}`,
      `Piles specialist doctor near ${location.name}`,
      `Laparoscopic hernia hospital ${location.name}`,
      `Cashless surgery ${location.name} ${location.stateName}`,
      `Urology kidney stone surgery ${location.name}`,
      `HealthFlo ${location.name} contact`,
      `${location.nativeLanguage} medical coordinator surgery`,
      `Free hospital cab assistance ${location.name}`
    ],
    openGraph: {
      title: `Laser & Laparoscopic Surgical Care in ${location.name} | HealthFlo`,
      description: `Experience painless USFDA laser procedures with instant cashless pre-approval in ${location.name}. Dedicated ${location.nativeLanguage} language support & free hospital transit assistance.`,
      url: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}`,
    }
  };
}

export default async function RegionalLocationPage({ params }: Props) {
  const resolved = await params;
  const location = getLocationBySlug(resolved.state, resolved.city);

  if (!location) {
    notFound();
  }

  const WHATSAPP_URL = `https://wa.me/919363650066?text=${encodeURIComponent(
    `Hello HealthFlo, I am visiting from ${location.name} (${location.stateName}) and would like to speak with a ${location.nativeLanguage} medical coordinator regarding surgical packages and cashless insurance.`
  )}`;

  // Location JSON-LD Schema for Google & AI Engines
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": `HealthFlo Surgical Network - ${location.name} Triage Desk`,
    "description": location.description,
    "url": `https://healthflo.in/locations/${location.stateSlug}/${location.slug}`,
    "telephone": "+919363650066",
    "areaServed": {
      "@type": "City",
      "name": location.name,
      "containedInPlace": {
        "@type": "State",
        "name": location.stateName
      }
    },
    "availableLanguage": ["en", location.nativeLanguage.toLowerCase().slice(0, 2)],
    "medicalSpecialty": [
      "ColorectalSurgery",
      "UrologicSurgery",
      "GeneralSurgery"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />
      
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-[90px] md:pt-[140px] pb-20 md:pb-24 relative z-10 flex flex-col gap-16">
        
        {/* ── LOCATION HERO DESK ────────────────────────────────────────────── */}
        <section className="relative rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-[#0B1426] to-slate-900 text-white p-6 sm:p-10 md:p-14 overflow-hidden border border-slate-800 shadow-2xl">
          
          {/* Background Ambient Aura */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0055ff]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#00E5FF] font-extrabold text-[12px] tracking-wider uppercase flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{location.name} • {location.stateName}</span>
                </span>

                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-[12px] uppercase tracking-wider flex items-center gap-1.5">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>{location.nativeLanguage} Coordinator Available</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white">
                {location.nativeGreeting} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A2FF] via-[#00E5FF] to-teal-400">
                  Advanced Surgical Care in {location.name}.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                {location.description} Experience high-precision USFDA laser surgery for piles, hernia, kidney stones, and varicose veins without traveling blindly. Our regional desk arranges <strong>100% cashless insurance approval</strong> and <strong>{location.transitTime.toLowerCase()}</strong>.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-base transition-all shadow-[0_8px_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 text-center"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950 text-emerald-500 shrink-0" />
                  <span>Chat in {location.nativeLanguage} on WhatsApp</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href="#lead-capture"
                  className="px-6 py-4 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-white font-black text-base transition-all shadow-[0_8px_30px_rgba(0,102,255,0.3)] flex items-center justify-center gap-2 text-center"
                >
                  <span>Consult FLO Agent Now</span>
                </a>
              </div>
            </div>

            {/* Right Column Hub Card */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-[2.2rem] p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0066FF] to-teal-500 text-white flex items-center justify-center font-black shadow-md">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF]">
                      REGIONAL SURGICAL HUB
                    </span>
                    <h3 className="text-lg font-extrabold text-white leading-tight">
                      {location.hubCity}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4 text-sm font-medium text-slate-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-extrabold block">Zero-Pain USFDA Laser Care</strong>
                      <span>Minimally invasive incisions, 24-hour discharge, and prompt recovery protocols.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-extrabold block">100% Cashless Triage</strong>
                      <span>All 30+ major health insurers accepted with 30-minute pre-auth approvals.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-extrabold block">Village & Town Transit Support</strong>
                      <span>{location.transitTime}. Free travel guidance for out-of-town patients & attendants.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">24/7 {location.name} Helpline:</span>
                  <a href="tel:+919363650066" className="text-white font-black hover:text-[#00E5FF] text-base flex items-center gap-1.5 transition-colors">
                    <Phone className="w-4 h-4 text-[#00E5FF]" />
                    <span>+91 93636 50066</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── SPECIALIZED PROCEDURES AVAILABLE IN TOWN ──────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <span className="text-[#0066FF] font-extrabold text-xs uppercase tracking-widest block mb-1">
                AVAILABLE FOR {location.name.toUpperCase()} PATIENTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                Specialized Surgical Packages
              </h2>
            </div>
            <p className="text-slate-600 font-medium text-sm max-w-md">
              Fixed all-inclusive transparent costs with zero room rent cap penalties or hidden disposable charges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {location.specializedProcedures.map((proc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:border-[#0066FF] hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0066FF] mb-4 font-black">
                    #{idx + 1}
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-[#0066FF] transition-colors">
                    {proc}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                    USFDA laser & robotic precision. Instant cashless insurance pre-approval and same-day recovery.
                  </p>
                </div>

                <a
                  href="#lead-capture"
                  className="inline-flex items-center text-[#0066FF] font-extrabold text-xs group-hover:translate-x-1 transition-all uppercase tracking-wider"
                >
                  <span>Check Availability</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── FLO AGENT REGIONAL DESK & FAQ ───────────────────────────────── */}
        <div className="space-y-12">
          <LeadCapture />
          <FAQ />
        </div>

        {/* ── BACK TO ALL REGIONS LINK ────────────────────────────────────── */}
        <div className="text-center pt-8 border-t border-slate-100">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#0066FF] font-extrabold text-sm transition-colors"
          >
            <span>← Return to Pan-India HealthFlo Healthcare Hub</span>
          </Link>
        </div>

      </main>

      <Footer />
    </>
  );
}
