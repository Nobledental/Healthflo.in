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
  Award,
  ChevronRight,
  Building2,
} from "lucide-react";

// Modular components
import CityProcedureGrid from "@/components/locations/CityProcedureGrid";
import NeighbourhoodGrid from "@/components/locations/NeighbourhoodGrid";
import LocalHospitalContext from "@/components/locations/LocalHospitalContext";

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
  const resolved = await Promise.resolve(params);
  const location = getLocationBySlug(resolved.state, resolved.city);
  if (!location) {
    return { title: "Location Not Found | HealthFlo Surgical Network" };
  }

  const topNeighbourhoods = location.keyNeighbourhoods?.slice(0, 4).join(", ") ?? location.name;

  return {
    title: `Laser Surgery in ${location.name} — ${location.keyNeighbourhoods?.[0] ?? ""} & ${location.keyNeighbourhoods?.[1] ?? ""} | HealthFlo`,
    description: `Insurance Eligible laser surgical care in ${location.name}, ${location.stateName}. Serving ${topNeighbourhoods} and surrounding areas. Same-day discharge. ${location.nativeLanguage} coordinator. Free cab from ${location.railwayStation ?? location.name}. Call +91 93636 50066.`,
    keywords: [
      `Laser surgery in ${location.name}`,
      `Piles specialist ${location.name}`,
      `Laparoscopic hernia hospital ${location.name}`,
      `Insurance Eligible surgery ${location.name}`,
      `Laser circumcision ${location.name}`,
      ...(location.keyNeighbourhoods ?? []).slice(0, 4).map((n) => `laser surgery ${n} ${location.name}`),
    ],
    openGraph: {
      title: `Laser & Laparoscopic Surgical Care in ${location.name} | HealthFlo`,
      description: `Painless USFDA laser procedures with instant Insurance Eligible pre-approval in ${location.name}. Dedicated ${location.nativeLanguage} language support & free hospital transit.`,
      url: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}`,
    },
    alternates: {
      canonical: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}`,
    },
  };
}

export default async function RegionalLocationPage({ params }: Props) {
  const resolved = await Promise.resolve(params);
  const location = getLocationBySlug(resolved.state, resolved.city);

  if (!location) notFound();

  const WHATSAPP_URL = `https://wa.me/919363650066?text=${encodeURIComponent(
    `Hello HealthFlo, I am from ${location.name} (${location.stateName}) and would like a ${location.nativeLanguage} coordinator for laser surgery. Please share Insurance Eligible package details.`
  )}`;

  // City JSON-LD Schema
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: `HealthFlo Surgical Network — ${location.name}`,
    description: location.description,
    url: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}`,
    telephone: "+919363650066",
    ...(location.coordinates && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: location.coordinates.lat,
        longitude: location.coordinates.lng,
      },
    }),
    areaServed: [
      {
        "@type": "City",
        name: location.name,
        containedInPlace: { "@type": "State", name: location.stateName },
      },
      ...(location.keyNeighbourhoods ?? []).map((n) => ({
        "@type": "Place",
        name: n,
        containedInPlace: { "@type": "City", name: location.name },
      })),
    ],
    availableLanguage: ["en", location.nativeLanguage.toLowerCase().slice(0, 2)],
    medicalSpecialty: ["ColorectalSurgery", "UrologicSurgery", "GeneralSurgery"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />

      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-[90px] md:pt-[140px] pb-20 md:pb-24 relative z-10 flex flex-col gap-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 flex-wrap">
          <Link href="/" className="hover:text-[#1D3A6F] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/locations" className="hover:text-[#1D3A6F] transition-colors">Locations</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/locations/${location.stateSlug}`} className="hover:text-[#1D3A6F] transition-colors">{location.stateName}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1D3A6F] font-extrabold">{location.name}</span>
        </nav>

        {/* Location Hero */}
        <section className="relative rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-[#0B1426] to-slate-900 text-white p-6 sm:p-10 md:p-14 overflow-hidden border border-slate-800 shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0055ff]/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#00E5FF] font-extrabold text-[11px] tracking-wider uppercase flex items-center gap-1.5">
                  <MapPin className="w-3 h-3" />
                  <span>{location.name} • {location.stateName}</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Globe2 className="w-3 h-3" />
                  <span>{location.nativeLanguage} Coordinator Available</span>
                </span>
                {location.cluster && (
                  <span className="px-3.5 py-1.5 rounded-full bg-slate-700/60 border border-slate-600 text-slate-300 font-semibold text-[11px]">
                    {location.cluster}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white">
                {location.nativeGreeting} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A2FF] via-[#00E5FF] to-teal-400">
                  Surgical Care in {location.name}.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-medium">
                {location.description}
              </p>

              {/* Neighbourhood pill strip */}
              {location.keyNeighbourhoods && location.keyNeighbourhoods.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {location.keyNeighbourhoods.slice(0, 6).map((n) => (
                    <span key={n} className="text-[11px] font-bold text-slate-300 bg-slate-800/60 border border-slate-700 px-2.5 py-1 rounded-lg flex items-center gap-1">
                      <MapPin className="w-2.5 h-2.5 text-[#00E5FF]" />
                      {n}
                    </span>
                  ))}
                  {location.keyNeighbourhoods.length > 6 && (
                    <span className="text-[11px] font-bold text-slate-400 px-2.5 py-1">
                      +{location.keyNeighbourhoods.length - 6} more areas
                    </span>
                  )}
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base transition-all shadow-[0_8px_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-slate-950 shrink-0" />
                  <span>Chat in {location.nativeLanguage} on WhatsApp</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#lead-capture"
                  className="px-6 py-4 rounded-2xl bg-[#0066FF] hover:bg-blue-600 text-white font-black text-base transition-all shadow-[0_8px_30px_rgba(0,102,255,0.3)] flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>Consult FLO Agent Now</span>
                </a>
              </div>
            </div>

            {/* Right: Hub Card */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-[2.2rem] p-6 sm:p-8 space-y-6 shadow-2xl">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-700">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0066FF] to-teal-500 text-white flex items-center justify-center shadow-md shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#00E5FF]">REGIONAL SURGICAL HUB</span>
                    <h3 className="text-lg font-extrabold text-white leading-tight">{location.hubCity}</h3>
                  </div>
                </div>

                <div className="space-y-4 text-sm font-medium text-slate-300">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-extrabold block">USFDA Laser Precision Care</strong>
                      <span>Minimally invasive — same-day discharge & quick recovery.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-extrabold block">Insurance Eligible Triage</strong>
                      <span>30+ major health insurers. 30-minute pre-auth approvals.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white font-extrabold block">Village & Town Transit Support</strong>
                      <span>{location.transitTime}</span>
                    </div>
                  </div>
                  {location.railwayStation && (
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white font-extrabold block">Free Pickup Available</strong>
                        <span>{location.railwayStation}</span>
                      </div>
                    </div>
                  )}
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

        {/* Procedure Grid */}
        <CityProcedureGrid
          stateSlug={location.stateSlug}
          citySlug={location.slug}
          cityName={location.name}
          keyNeighbourhoods={location.keyNeighbourhoods}
        />

        {/* Neighbourhood Directory */}
        <NeighbourhoodGrid
          cityName={location.name}
          neighbourhoods={location.keyNeighbourhoods}
          transitTime={location.transitTime}
          railwayStation={location.railwayStation}
          titleOverride={`Areas & Neighbourhoods Covered in ${location.name}`}
          descriptionOverride={`Patients from all these localities reach our empanelled facilities within ${location.transitTime.toLowerCase()}.`}
        />

        {/* Local Hospital Context */}
        <LocalHospitalContext
          cityName={location.name}
          localHospitals={location.localHospitals}
        />

        {/* Lead Capture & FAQ */}
        <div id="lead-capture" className="space-y-12">
          <LeadCapture />
          <FAQ />
        </div>

        {/* Back Links */}
        <div className="text-center pt-8 border-t border-slate-100 space-y-2">
          <Link
            href={`/locations/${location.stateSlug}`}
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#1D3A6F] font-extrabold text-sm transition-colors"
          >
            <span>← All {location.stateName} Cities</span>
          </Link>
          <div>
            <Link
              href="/locations"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#1D3A6F] transition-colors"
            >
              <span>← Regional Hospital Network Directory</span>
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
