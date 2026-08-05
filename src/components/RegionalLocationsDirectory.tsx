"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { REGIONAL_LOCATIONS, getLocationsByState, RegionalLocation } from "@/data/regionalLocations";
import { specialitiesData } from "@/data/specialities";
import { 
  MapPin, 
  Navigation, 
  ChevronRight, 
  Phone, 
  Search, 
  ShieldCheck, 
  Activity, 
  CheckCircle2,
  SlidersHorizontal,
  Compass
} from "lucide-react";
import { haptic } from "@/utils/haptics";
import { useSiteConfig } from "@/context/SiteConfigContext";

/* ── Custom Professional Medical & Radar SVGs ───────────────────────────────── */
function HighPrecisionMedicalPinSVG({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pinGrad" x1="24" y1="2" x2="24" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00E5FF" />
          <stop offset="1" stopColor="#0066FF" />
        </linearGradient>
        <linearGradient id="crossGrad" x1="18" y1="13" x2="30" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E2F1FF" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Radar Signal Pulses */}
      <circle cx="24" cy="19" r="16" stroke="#00E5FF" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="3 3" />
      <circle cx="24" cy="19" r="21" stroke="#0066FF" strokeWidth="1" strokeOpacity="0.15" />
      
      {/* Waypoint Base Shadow/Anchor */}
      <ellipse cx="24" cy="43" rx="7" ry="2.5" fill="#0066FF" fillOpacity="0.3" filter="url(#glow)" />
      
      {/* Primary Medical GPS Pin */}
      <path
        d="M24 3.5C15.44 3.5 8.5 10.44 8.5 19C8.5 29.5 24 43.5 24 43.5C24 43.5 39.5 29.5 39.5 19C39.5 10.44 32.56 3.5 24 3.5Z"
        fill="url(#pinGrad)"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeOpacity="0.4"
        filter="url(#glow)"
      />
      
      {/* Inner Dark Chamber */}
      <circle cx="24" cy="18.5" r="8.5" fill="#0B1426" />
      
      {/* Glowing Medical Cross */}
      <path
        d="M26.2 13.5H21.8C21.47 13.5 21.2 13.77 21.2 14.1V16.3H19C18.67 16.3 18.4 16.57 18.4 16.9V21.3C18.4 21.63 18.67 21.9 19 21.9H21.2V24.1C21.2 24.43 21.47 24.7 21.8 24.7H26.2C26.53 24.7 26.8 24.43 26.8 24.1V21.9H29C29.33 21.9 29.6 21.63 29.6 21.3V16.9C29.6 16.57 29.33 16.3 29 16.3H26.8V14.1C26.8 13.77 26.53 13.5 26.2 13.5Z"
        fill="url(#crossGrad)"
      />
    </svg>
  );
}

function HospitalShieldSVG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L3 6V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V6L12 2Z"
        fill="#0066FF"
        fillOpacity="0.2"
        stroke="#00E5FF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 8V16" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 12H16" stroke="#00E5FF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TransitRouteSVG({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 17C19 18.6569 17.6569 20 16 20C14.3431 20 13 18.6569 13 17C13 15.3431 14.3431 14 16 14C17.6569 14 19 15.3431 19 17Z" stroke="#34D399" strokeWidth="2" />
      <path d="M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7Z" stroke="#00E5FF" strokeWidth="2" />
      <path d="M16 14V11C16 9.34315 14.6569 8 13 8H11" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
      <circle cx="16" cy="17" r="1" fill="#34D399" />
      <circle cx="8" cy="7" r="1" fill="#00E5FF" />
    </svg>
  );
}

export default function RegionalLocationsDirectory() {
  const { config } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<"all" | "tamil-nadu" | "karnataka" | "telangana">("tamil-nadu");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSlug, setSelectedSlug] = useState<string>("chennai");

  const stateTabs = [
    { id: "tamil-nadu", label: "Tamil Nadu", count: getLocationsByState("tamil-nadu").length, tag: "தமிழ்", color: "text-amber-400", defaultSlug: "chennai" },
    { id: "karnataka", label: "Karnataka", count: getLocationsByState("karnataka").length, tag: "ಕನ್ನಡ", color: "text-emerald-400", defaultSlug: "bengaluru" },
    { id: "telangana", label: "Hyderabad & Telangana", count: getLocationsByState("telangana").length, tag: "తెలుగు", color: "text-cyan-400", defaultSlug: "hyderabad" },
    { id: "all", label: "Pan-South India", count: REGIONAL_LOCATIONS.length, tag: "All Hubs", color: "text-blue-400", defaultSlug: "chennai" },
  ];

  // Filter locations by selected tab and search query
  const availableLocations = REGIONAL_LOCATIONS.filter((loc) => {
    const matchesTab = activeTab === "all" || loc.stateSlug === activeTab;
    const matchesSearch = 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      loc.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.nativeLanguage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Currently selected location details for the inline bottom spotlight dock
  const activeLocation: RegionalLocation = 
    REGIONAL_LOCATIONS.find((l) => l.slug === selectedSlug) || 
    availableLocations[0] || 
    REGIONAL_LOCATIONS[0];

  const handleTabChange = (tabId: typeof activeTab, defaultSlug: string) => {
    haptic.light();
    setActiveTab(tabId);
    setSelectedSlug(defaultSlug);
  };

  return (
    <section className="w-full py-12 sm:py-16 relative z-10 bg-[#f4f8ff]" id="locations-hub">
      {/* Clean Light Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0055FF] text-[11px] font-black uppercase tracking-widest">
              <HospitalShieldSVG className="w-3.5 h-3.5" />
              Regional Surgical Network
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              24/7 Dispatch Online
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
            Find Your Local Surgical Hub
          </h2>
          <p className="mt-1.5 text-[14px] text-slate-500 font-medium">Select your city to activate patient transit &amp; insurance coordination.</p>
        </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col gap-5">
        
        <div className="flex flex-col gap-5">
          
          {/* ── STATE TABS & SEARCH ROW ──────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
            
            {/* State Selection Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {stateTabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id as any, tab.defaultSlug)}
                    className={`px-3.5 py-2 rounded-xl font-black text-xs whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                      isSelected
                        ? "bg-[#0066FF] text-white shadow-[0_4px_12px_rgba(0,102,255,0.25)]"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? "bg-white/20 text-white" : "bg-white text-slate-400 border border-slate-200"
                    }`}>
                      {tab.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-[220px] shrink-0">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search city or town..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 font-medium text-xs focus:outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          {/* ── CITY CHIP CLOUD ────────────────────── */}
          <div>
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 max-h-[160px] overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {availableLocations.length > 0 ? (
                  availableLocations.map((loc) => {
                    const isCurrent = activeLocation.slug === loc.slug;
                    return (
                      <button
                        key={loc.slug}
                        onClick={() => {
                          haptic.medium();
                          setSelectedSlug(loc.slug);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                          isCurrent
                            ? "bg-[#0066FF] text-white shadow-[0_2px_8px_rgba(0,102,255,0.25)]"
                            : "bg-white hover:bg-blue-50 text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-[#0066FF]"
                        }`}
                      >
                        <MapPin className={`w-3 h-3 shrink-0 ${isCurrent ? "text-white" : "text-[#0066FF]"}`} />
                        {loc.name}
                      </button>
                    );
                  })
                ) : (
                  <div className="w-full py-4 text-center text-xs font-bold text-slate-400">
                    No matching city found for &quot;{searchQuery}&quot;
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Selected Location Spotlight */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLocation.slug}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#eef4ff] to-[#f0fbff] border border-blue-200 flex flex-col gap-4 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0066FF]/30 to-transparent pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10 w-full">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 p-2.5">
                    <HighPrecisionMedicalPinSVG className="w-full h-full" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5">
                        {activeLocation.name} Surgical Hub
                        <ShieldCheck className="w-4 h-4 text-[#0066FF] shrink-0" />
                      </h3>
                      <span className="text-[11px] font-extrabold text-[#0066FF] px-2.5 py-0.5 rounded-full bg-blue-100 border border-blue-200">
                        {activeLocation.nativeGreeting}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold text-slate-500">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <TransitRouteSVG className="w-4 h-4 shrink-0" />
                        <span>{activeLocation.transitTime}</span>
                      </div>
                      <span className="hidden sm:inline text-slate-300">•</span>
                      <div className="flex items-center gap-1 text-emerald-600 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{activeLocation.nativeLanguage} Coordinator on Duty</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-blue-100">
                  <a
                    href={`tel:+${config.helplineRaw}`}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-xs flex items-center justify-center gap-2 border border-slate-200 shadow-sm transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-500 fill-emerald-400" />
                    <span>24/7 Helpline</span>
                  </a>

                  <Link
                    href={`/locations/${activeLocation.stateSlug}/${activeLocation.slug}`}
                    onClick={() => haptic.light()}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,102,255,0.3)] transition-all"
                  >
                    <span>Enter {activeLocation.name} Portal</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Procedure Quick Links */}
              <div className="w-full pt-3 border-t border-blue-100 relative z-10">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0066FF] flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    Procedures in {activeLocation.name}:
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400 hidden sm:inline">100% Insurance Eligible · USFDA Laser</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(specialitiesData).map(([slug, spec]) => (
                    <Link
                      key={slug}
                      href={`/locations/${activeLocation.stateSlug}/${activeLocation.slug}/${slug}`}
                      onClick={() => haptic.light()}
                      className="text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded-lg bg-white hover:bg-[#0066FF] hover:text-white text-slate-700 border border-slate-200 hover:border-blue-400 transition-all duration-200 flex items-center gap-1.5"
                    >
                      {spec.shortTitle}
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

        {/* View All Action */}
        <div className="mt-6 text-center">
          <Link
            href="/locations"
            onClick={() => haptic.medium()}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0066FF] hover:bg-blue-700 text-white font-black text-sm uppercase tracking-wider shadow-[0_4px_18px_rgba(0,102,255,0.3)] transition-all hover:scale-105 active:scale-95"
          >
            View All Regional Hubs
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  </section>
);
}
