"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { REGIONAL_LOCATIONS, RegionalLocation } from "@/data/regionalLocations";
import { haptic } from "@/utils/haptics";
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Search, 
  Building2, 
  Navigation, 
  CheckCircle, 
  ArrowRight,
  Globe,
  HeartPulse,
  Activity,
  ChevronRight,
  Layers
} from "lucide-react";
import { specialitiesData } from "@/data/specialities";
import { useSiteConfig } from "@/context/SiteConfigContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), {
  loading: () => <div className="fixed inset-0 z-0 pointer-events-none bg-transparent" />,
});

const MobileStickyBar = dynamic(() => import("@/components/MobileStickyBar"));

const regionalCorridors = [
  "Hyderabad Surgical Hub",
  "Bangalore Laser Suites",
  "Chennai Clinical Center",
  "Coimbatore Day-Care Hub",
  "Warangal Triage Desk",
  "Karimnagar Transit Network",
  "Mysore Surgical Center",
  "Madurai Medical Desk",
  "Tiruchirappalli Care",
  "Kumbakonam Network",
];

export default function RegionalLocationsDirectoryPage() {
  const { config } = useSiteConfig();
  const [selectedState, setSelectedState] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [city, setCity] = useState("Detecting...");

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => { if (data.city) setCity(data.city); else setCity("South India"); })
      .catch(() => setCity("South India"));
  }, []);

  const stateFilters = [
    { id: "all", label: "All South India Centers", count: REGIONAL_LOCATIONS.length },
    { id: "telangana", label: "Telangana (Hyderabad Hub)", count: REGIONAL_LOCATIONS.filter(l => l.stateSlug === "telangana").length },
    { id: "karnataka", label: "Karnataka (Bangalore Hub)", count: REGIONAL_LOCATIONS.filter(l => l.stateSlug === "karnataka").length },
    { id: "tamil-nadu", label: "Tamil Nadu (Chennai & Coimbatore)", count: REGIONAL_LOCATIONS.filter(l => l.stateSlug === "tamil-nadu").length },
  ];

  const filteredLocations = useMemo(() => {
    return REGIONAL_LOCATIONS.filter(item => {
      const matchesState = selectedState === "all" || item.stateSlug === selectedState;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        item.name.toLowerCase().includes(q) || 
        item.hubCity.toLowerCase().includes(q) || 
        item.stateName.toLowerCase().includes(q) ||
        item.specializedProcedures.some(p => p.toLowerCase().includes(q));
      return matchesState && matchesQuery;
    });
  }, [selectedState, searchQuery]);

  const clusterGroups = useMemo(() => {
    const groups: Record<string, RegionalLocation[]> = {};
    filteredLocations.forEach(loc => {
      const c = loc.cluster || "General Regional Surgical Corridors";
      if (!groups[c]) groups[c] = [];
      groups[c].push(loc);
    });
    return Object.entries(groups);
  }, [filteredLocations]);

  return (
    <div className="w-full bg-gradient-to-b from-white via-[#FAF9F5] to-white text-[#1D3A6F] font-sans relative min-h-screen">
      <ParticleCanvas />
      <Navbar />
      
      {/* Transparent Glowing White & Ambient Aura Background */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-gradient-to-bl from-blue-50/70 via-sky-50/40 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-gradient-to-tr from-blue-50/60 via-white to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[750px] bg-teal-50/50 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* ── HERO SECTION: REGIONAL HEALTHCARE DIRECTORATE ──────────────────── */}
      <section className="px-4 sm:px-6 lg:px-12 pt-[90px] md:pt-[130px] pb-12 max-w-7xl mx-auto border-b border-slate-200/70 relative z-10">
        
        {/* Top Indicators Bar */}
        <div className="w-full flex flex-wrap justify-between items-center gap-3 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200 text-[#0055ff] text-xs sm:text-sm font-extrabold tracking-wide shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Regional Hospital Directorate • NABH Empanelled Care</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center border shadow-sm backdrop-blur-xl bg-white/90 border-slate-200/80 text-slate-800 shrink-0">
            <span className="w-2 h-2 rounded-full mr-2 bg-[#00A88F]" />
            <span>{city} Network</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-5">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1D3A6F] leading-[1.12]">
              South India Regional <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0055ff] via-[#0088ff] to-[#00A88F]">Hospital Network & Transit</span> Desk.
            </h1>
            <p className="text-slate-600 text-base sm:text-lg max-w-3xl leading-relaxed font-medium">
              We eliminate healthcare distance barriers across Telangana, Karnataka, and Tamil Nadu. Connect directly with specialized USFDA laser surgical suites, enjoy seamless hospital cab transit assistance, and receive dedicated native language care coordination.
            </p>

            {/* Social Proof Numbers Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-2">
              {[
                { value: "150+", label: "Surgeons" },
                { value: "30+", label: "Insurers Accepted" },
                { value: "100%", label: "Assisted Transit" },
                { value: "3 States", label: "Regional Hubs" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-black text-slate-900 text-base sm:text-lg leading-none">{s.value}</span>
                  <span className="text-slate-500 font-bold text-xs sm:text-sm">{s.label}</span>
                  {i < 3 && <span className="text-slate-300 ml-2 hidden sm:inline">|</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white/95 border-2 border-[#1D3A6F]/10 rounded-3xl p-6 shadow-xl space-y-3 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-xl pointer-events-none" />
              <span className="text-xs font-black text-[#0066FF] uppercase tracking-wider block flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 fill-[#0066FF]" /> Priority Triage & Transit Line
              </span>
              <div className="flex items-center justify-between">
                <a 
                  href={`tel:+${config.helplineRaw}`} 
                  onClick={() => haptic.medium()}
                  className="text-2xl font-black text-[#1D3A6F] hover:text-[#0055ff] transition-colors inline-flex items-center gap-2.5"
                >
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span>+91 {config.helplineNumber}</span>
                </a>
              </div>
              <p className="text-xs text-slate-500 font-semibold leading-normal pt-1 border-t border-slate-100">
                Instant Insurance Eligible evaluation & surgical coordinator assignment in Telugu, Kannada & Tamil.
              </p>
            </div>
          </div>
        </div>

        {/* Marquee Ribbon of Regional Corridors */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slide-marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}} />

        <div className="w-full overflow-hidden relative mt-8 mb-6 flex items-center [mask-image:linear-gradient(to_right,transparent_1%,black_15%,black_85%,transparent_99%)] py-3.5 border-y border-slate-200/70 bg-white/60 backdrop-blur-md rounded-2xl">
          <div className="flex whitespace-nowrap items-center" style={{ animation: "slide-marquee 30s linear infinite", width: "max-content" }}>
            {[...Array(2)].map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center">
                {regionalCorridors.map((c, i) => (
                  <div key={i} className="inline-flex items-center px-6">
                    <span className="text-[13px] md:text-[14px] font-black text-slate-800 tracking-tight flex items-center gap-2">
                      <span className="text-[#00A88F] text-[16px] leading-none">♦</span>
                      <span>{c}</span>
                    </span>
                    <span className="ml-6 text-slate-300 font-light">•</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* E-E-A-T Institutional Trust Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3.5 bg-white/90 border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:border-blue-200 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
              <Building2 className="w-5 h-5 text-[#0055ff]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1D3A6F]">Empanelled Surgical Hubs</h4>
              <p className="text-xs text-slate-500 font-medium">Equipped with 100% sterile HEPA airflow & laser OTs.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/90 border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:border-teal-200 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 flex items-center justify-center shrink-0 border border-teal-100">
              <ShieldCheck className="w-5 h-5 text-[#00A88F]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1D3A6F]">Insurance Eligible Care</h4>
              <p className="text-xs text-slate-500 font-medium">Accepted across 30+ major insurers with zero surprises.</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-white/90 border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:border-blue-200 transition-colors">
            <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
              <Navigation className="w-5 h-5 text-[#0055ff]" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1D3A6F]">Free Assisted Cab Transit</h4>
              <p className="text-xs text-slate-500 font-medium">Door-to-hospital pickup from towns across South India.</p>
            </div>
          </div>
        </div>

      </section>

      {/* ── INTERACTIVE SEARCH & STATE FILTERS ───────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-12 py-10 max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          
          {/* State Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {stateFilters.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  haptic.light();
                  setSelectedState(tab.id);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all shadow-xs flex items-center gap-2 ${
                  selectedState === tab.id
                    ? "bg-[#1D3A6F] text-white shadow-md shadow-blue-950/20 scale-[1.02]"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-[#1D3A6F]"
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-black ${
                  selectedState === tab.id ? "bg-[#00A88F] text-white" : "bg-slate-100 text-slate-600"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Real-time Search Box */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search city, town, or surgery..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-2.5 text-sm font-medium text-[#1D3A6F] focus:outline-none focus:ring-2 focus:ring-[#0055ff]/30 focus:border-[#0055ff] shadow-xs placeholder:text-slate-400"
            />
          </div>

        </div>

        {/* ── REGIONAL HOSPITALS & TRANSIT DIRECTORY BY CLUSTER ──────────────────── */}
        {filteredLocations.length === 0 ? (
          <div className="bg-white/90 rounded-3xl p-12 text-center border border-slate-200/80 max-w-2xl mx-auto my-8 space-y-4 shadow-sm">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold text-[#1D3A6F]">No medical corridors matched your query</h3>
            <p className="text-sm text-slate-600 font-medium">
              We arrange hospital admissions from every town in South India. Call our centralized triage line for direct transit assistance.
            </p>
            <a 
              href={`tel:+${config.helplineRaw}`} 
              className="inline-flex items-center gap-2 text-sm font-black text-white bg-[#0055ff] hover:bg-blue-600 px-6 py-3 rounded-2xl shadow-md transition-all"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Call Triage Coordinator (+91 {config.helplineNumber})</span>
            </a>
          </div>
        ) : (
          <div className="space-y-12">
            {clusterGroups.map(([clusterName, locations]) => (
              <div key={clusterName} className="space-y-6">
                
                {/* Cluster Header Badge */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-[#1D3A6F]/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0055ff] to-[#0A2540] flex items-center justify-center text-white shadow-sm shrink-0">
                      <Layers className="w-5 h-5 text-[#00A88F]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#1D3A6F] tracking-tight flex items-center gap-2">
                        <span>{clusterName}</span>
                      </h3>
                      <p className="text-xs font-semibold text-slate-500">
                        Dedicated NABH surgical triage & transit coordination throughout this regional sector.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#0055ff] bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full shrink-0">
                    {locations.length} {locations.length === 1 ? "Hub City" : "Hub Cities"}
                  </span>
                </div>

                {/* Grid of City Cards within Cluster */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {locations.map((loc) => {
                    const cleanedDesc = loc.description.replace(/cashless/gi, "Insurance Eligible");

                    return (
                      <div 
                        key={loc.slug} 
                        className="bg-white/95 rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:border-[#0055ff]/40"
                      >
                        <div className="space-y-4">
                          
                          {/* Header with State Tag & Native Greeting */}
                          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
                            <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 bg-blue-50 text-[#0055ff] rounded-full border border-blue-100 font-mono">
                              {loc.stateName} Hub
                            </span>
                            <span className="text-xs font-black text-[#00A88F] bg-teal-50/80 px-2.5 py-1 rounded-xl border border-teal-200/60">
                              {loc.nativeGreeting}
                            </span>
                          </div>

                          {/* City Name & Medical Hub */}
                          <div className="space-y-1">
                            <Link 
                              href={`/locations/${loc.stateSlug}/${loc.slug}`}
                              className="text-2xl font-black text-[#1D3A6F] group-hover:text-[#0055ff] transition-colors inline-flex items-center gap-2"
                            >
                              <span>{loc.name}</span>
                              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-[#0055ff] group-hover:translate-x-1 transition-all" />
                            </Link>
                            <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-[#00A88F] shrink-0" />
                              <span>{loc.hubCity}</span>
                            </p>
                          </div>

                          {/* Transit & Clinical Protocol Description */}
                          <p className="text-xs text-slate-600 font-medium leading-relaxed bg-[#FAF9F5] p-3 rounded-2xl border border-slate-100">
                            {cleanedDesc}
                          </p>

                          {/* Transit Time Badge */}
                          <div className="flex items-center gap-2 text-xs font-extrabold text-[#1D3A6F] bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200/80">
                            <Navigation className="w-3.5 h-3.5 text-[#00A88F] shrink-0" />
                            <span className="truncate">{loc.transitTime}</span>
                          </div>

                          {/* Procedure Matrix Quick Links */}
                          <div className="space-y-2 pt-2 border-t border-slate-100">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-black uppercase tracking-wider text-[#1D3A6F] flex items-center gap-1.5">
                                <Activity className="w-3.5 h-3.5 text-[#0055ff]" />
                                <span>Direct Procedure Matrix:</span>
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">1-Click Triage</span>
                            </div>
                            <div className="grid grid-cols-2 gap-1.5">
                              {Object.entries(specialitiesData).map(([slug, spec]) => (
                                <Link
                                  key={slug}
                                  href={`/locations/${loc.stateSlug}/${loc.slug}/${slug}`}
                                  onClick={() => haptic.light()}
                                  className="text-[11px] font-bold text-slate-700 bg-white hover:bg-[#0055ff] hover:text-white border border-slate-200/90 hover:border-[#0055ff] px-2.5 py-1.5 rounded-xl transition-all duration-200 flex items-center justify-between group/link shadow-2xs truncate"
                                >
                                  <span className="truncate pr-1">{spec.shortTitle}</span>
                                  <ChevronRight className="w-3 h-3 text-[#00A88F] group-hover/link:text-white shrink-0 opacity-80 group-hover/link:translate-x-0.5 transition-transform" />
                                </Link>
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Footer Action Strip */}
                        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                          <Link
                            href={`/locations/${loc.stateSlug}/${loc.slug}`}
                            onClick={() => haptic.medium()}
                            className="flex-1 bg-[#1D3A6F] hover:bg-[#0055ff] text-white text-xs font-extrabold py-3 px-4 rounded-2xl text-center transition-all shadow-sm active:scale-95 block"
                          >
                            Explore Medical Hub &rarr;
                          </Link>
                          <a
                            href={`https://wa.me/${config.helplineRaw}?text=${encodeURIComponent(`Hello HealthFlo team, I am calling from ${loc.name}, ${loc.stateName}. Please connect me with a native ${loc.nativeLanguage} surgical coordinator regarding Insurance Eligible treatments and hospital cab transit.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            title="WhatsApp Native Care Desk"
                            className="w-11 h-11 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl flex items-center justify-center transition-all shadow-sm shrink-0 active:scale-95 hover:scale-105"
                          >
                            <MessageCircle className="w-5 h-5 fill-current" />
                          </a>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* ── 4-PILLAR HOSPITAL TRUST SECTION ──────── */}
      <section className="px-4 sm:px-6 lg:px-12 py-16 max-w-7xl mx-auto relative z-10">
        <div className="pt-12 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Pillar 1: Standards of Treatment */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-[#0055ff] pt-0.5">
              <svg className="w-12 h-12 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <path d="M11 7v8"></path>
                <path d="M7 11h8"></path>
                <rect x="8.5" y="8.5" width="5" height="5" rx="1" strokeWidth="1.5"></rect>
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1D3A6F]">Standards of Treatment</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                We make sure that we meet our high standards of treatment with USFDA precision protocols across every South India surgical corridor.
              </p>
            </div>
          </div>

          {/* Pillar 2: Well Communication */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-[#00A88F] pt-0.5">
              <svg className="w-12 h-12 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <path d="M12 14v3l2 2"></path>
                <circle cx="12" cy="15" r="4" strokeWidth="1.5"></circle>
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1D3A6F]">Well Communication</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                There are no borders between our surgical directorate and our patients in Tamil, Kannada, Telugu, Hindi, and English.
              </p>
            </div>
          </div>

          {/* Pillar 3: Infection Prevention */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-[#0055ff] pt-0.5">
              <svg className="w-12 h-12 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M12 8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
                <path d="M7.5 17c.9-2.5 3.1-3 4.5-3s3.6.5 4.5 3"></path>
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1D3A6F]">Infection Prevention</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Infection is a critical issue; in HealthFlo empanelled OT suites we deal with it perfectly using 100% sterile HEPA airflow protocols.
              </p>
            </div>
          </div>

          {/* Pillar 4: 10+ Years Experience */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-[#00A88F] pt-0.5">
              <svg className="w-12 h-12 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path>
                <line x1="12" y1="11" x2="12" y2="17"></line>
                <line x1="9" y1="14" x2="15" y2="14"></line>
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-[#1D3A6F]">10+ Years Experience</h3>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                Our surgical panel consists of senior MS/MCh consultants specializing in zero-stitch laser procedures and expedited patient discharge.
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
      <MobileStickyBar />
    </div>
  );
}
