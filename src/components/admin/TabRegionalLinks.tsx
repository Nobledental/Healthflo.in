"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { REGIONAL_LOCATIONS, RegionalLocation } from "@/data/regionalLocations";
import { specialitiesData } from "@/data/specialities";
import { 
  Building2, 
  MapPin, 
  Activity, 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Globe, 
  Navigation, 
  Copy, 
  Check, 
  SlidersHorizontal,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { haptic } from "@/utils/haptics";

export default function TabRegionalLinks() {
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedSpeciality, setSelectedSpeciality] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Copy portal link helper for doctor-to-patient consultation sharing
  const handleCopyLink = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    haptic.medium();
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // Calculate high-level metrics for medical network transparency
  const totalCities = REGIONAL_LOCATIONS.length;
  const specialitiesEntries = Object.entries(specialitiesData);
  const totalProcedures = specialitiesEntries.length;
  const totalActivePortals = totalCities * (totalProcedures + 1); // procedure pages + city master page

  // Filter regional locations based on state selection and text search
  const filteredLocations = useMemo(() => {
    return REGIONAL_LOCATIONS.filter((loc) => {
      const stateMatch = selectedState === "all" || loc.stateSlug === selectedState;
      const queryMatch = searchQuery.trim() === "" || 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        loc.stateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.cluster.toLowerCase().includes(searchQuery.toLowerCase());
      return stateMatch && queryMatch;
    });
  }, [selectedState, searchQuery]);

  // Filter procedures if a specific specialty filter is chosen
  const displayedSpecialities = useMemo(() => {
    if (selectedSpeciality === "all") return specialitiesEntries;
    return specialitiesEntries.filter(([slug]) => slug === selectedSpeciality);
  }, [selectedSpeciality, specialitiesEntries]);

  return (
    <div className="p-6 sm:p-8 text-slate-100 space-y-8 max-h-[82vh] overflow-y-auto pr-2 custom-scrollbar">
      
      {/* ── HEADER DESCRIPTION & SYSTEM OVERVIEW ── */}
      <div className="bg-[#0D182E] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Hospital Referral &amp; Patient Portal Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Regional Surgical Center &amp; Procedure Directory
            </h2>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Explore and share dedicated clinical portals generated specifically for each regional hospital center across South India. Consulting physicians can instantly copy direct patient consultation web links for specific surgeries to share during telephone triage or diagnostic counseling.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 bg-[#080E1B] p-5 rounded-2xl border border-slate-800">
            <Globe className="w-10 h-10 text-cyan-400 shrink-0" />
            <div className="text-left">
              <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider block">Total Live Patient Portals</span>
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{totalActivePortals}</span>
              <span className="text-xs text-emerald-400 font-bold block mt-0.5">Verified Medical Access Ready</span>
            </div>
          </div>
        </div>

        {/* ── KEY NETWORK STATISTICS BAR ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
          <div className="bg-[#080E1A] p-4 rounded-2xl border border-slate-800/60 flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Regional Municipal Centers</span>
              <span className="text-xl font-extrabold text-white block">{totalCities} Surgical Cities</span>
            </div>
          </div>

          <div className="bg-[#080E1A] p-4 rounded-2xl border border-slate-800/60 flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 text-cyan-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Surgical Procedures</span>
              <span className="text-xl font-extrabold text-white block">{totalProcedures} Specialized Protocols</span>
            </div>
          </div>

          <div className="bg-[#080E1A] p-4 rounded-2xl border border-slate-800/60 flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wide">Coverage Territories</span>
              <span className="text-xl font-extrabold text-white block">Tamil Nadu, Karnataka &amp; Telangana</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE CONTROLS & SEARCH FILTER ── */}
      <div className="bg-[#0D182E] p-6 rounded-3xl border border-slate-800/80 space-y-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            <span>Filter Medical Centers &amp; Surgical Specialties</span>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by city, state or regional cluster..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#080E1A] border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs font-semibold text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition shadow-inner"
            />
          </div>
        </div>

        {/* State Selection Tabs */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Select Regional State Network:</span>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", name: "All Southern Centers", count: totalCities },
              { id: "tamil-nadu", name: "Tamil Nadu Hospital Network", count: REGIONAL_LOCATIONS.filter(l => l.stateSlug === "tamil-nadu").length },
              { id: "karnataka", name: "Karnataka Hospital Network", count: REGIONAL_LOCATIONS.filter(l => l.stateSlug === "karnataka").length },
              { id: "telangana", name: "Telangana Hospital Network", count: REGIONAL_LOCATIONS.filter(l => l.stateSlug === "telangana").length }
            ].map((st) => {
              const active = selectedState === st.id;
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    haptic.light();
                    setSelectedState(st.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
                    active 
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/20 border border-cyan-400/30" 
                      : "bg-[#080E1A] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{st.name}</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] ${active ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"}`}>
                    {st.count} Cities
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Procedure Specialty Selection Tabs */}
        <div className="space-y-2 pt-2 border-t border-slate-800/60">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Filter by Surgical Specialty Protocol:</span>
          <div className="flex flex-wrap items-center gap-2 max-h-40 overflow-y-auto p-1 custom-scrollbar">
            <button
              onClick={() => {
                haptic.light();
                setSelectedSpeciality("all");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                selectedSpeciality === "all"
                  ? "bg-cyan-500 text-slate-950 font-extrabold shadow-sm"
                  : "bg-[#080E1A] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>Display All 12 Procedures</span>
            </button>
            {specialitiesEntries.map(([slug, spec]) => {
              const active = selectedSpeciality === slug;
              return (
                <button
                  key={slug}
                  onClick={() => {
                    haptic.light();
                    setSelectedSpeciality(slug);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    active
                      ? "bg-cyan-500 text-slate-950 font-extrabold shadow-sm"
                      : "bg-[#080E1A] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                  }`}
                >
                  <span>{spec.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── CITY MATRIX GRID ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold px-2">
          <span>Showing {filteredLocations.length} Regional Center Hubs</span>
          <span>Click any button to inspect Live Web Portal or Copy Direct Patient Link</span>
        </div>

        <AnimatePresence>
          {filteredLocations.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredLocations.map((loc, idx) => {
                const masterUrl = `/locations/${loc.stateSlug}/${loc.slug}`;
                const isMasterCopied = copiedUrl === masterUrl;

                return (
                  <motion.div
                    key={`${loc.stateSlug}-${loc.slug}-${idx}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.02 }}
                    className="bg-[#0E172B] border border-slate-800 hover:border-slate-700/80 rounded-3xl p-6 shadow-xl transition space-y-6"
                  >
                    {/* City Master Header Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="text-xs font-bold text-blue-300 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-lg uppercase font-mono tracking-wide">
                            {loc.stateName}
                          </span>
                          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                            <span>{loc.name} Surgical Referral Center</span>
                            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" /> Cluster: {loc.cluster}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                            <Navigation className="w-3.5 h-3.5 text-emerald-400" /> Transit Hub: {loc.hubCity} ({loc.transitTime})
                          </span>
                          {loc.railwayStation && (
                            <span className="text-slate-400">Terminal: {loc.railwayStation}</span>
                          )}
                        </div>
                      </div>

                      {/* Master Portal Actions */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => handleCopyLink(masterUrl, e)}
                          title="Copy Master Portal URL to share with patient"
                          className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
                        >
                          {isMasterCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                          <span>{isMasterCopied ? "Link Copied!" : "Copy Portal Link"}</span>
                        </button>

                        <Link
                          href={masterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-md shadow-cyan-500/20 transition flex items-center gap-1.5"
                        >
                          <span>Open City Portal</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>

                    {/* Surgical Specialties Grid for this City */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-400 font-bold">
                        <span className="uppercase tracking-wider text-[11px] text-cyan-300 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-cyan-400" />
                          Dedicated Procedure Consultation Pages for {loc.name} ({displayedSpecialities.length} Active):
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">100% USFDA Laser &amp; Laparoscopic Ready</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {displayedSpecialities.map(([slug, spec]) => {
                          const procedureUrl = `/locations/${loc.stateSlug}/${loc.slug}/${slug}`;
                          const isCopied = copiedUrl === procedureUrl;

                          return (
                            <div
                              key={slug}
                              className="bg-[#080E1A] hover:bg-[#0A1324] border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl p-3.5 transition flex flex-col justify-between gap-3 shadow-md group"
                            >
                              <div className="space-y-1">
                                <span className="text-xs font-extrabold text-slate-200 group-hover:text-cyan-300 transition line-clamp-1 block">
                                  {spec.shortTitle}
                                </span>
                                <span className="text-[11px] font-medium text-slate-500 block line-clamp-1">
                                  {loc.name} Hub • {spec.category.split("&")[0]}
                                </span>
                              </div>

                              <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-slate-800/80">
                                <button
                                  onClick={(e) => handleCopyLink(procedureUrl, e)}
                                  title={`Copy ${spec.shortTitle} consultation URL for ${loc.name}`}
                                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                                    isCopied 
                                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" 
                                      : "bg-slate-800/90 hover:bg-slate-700 text-slate-300 border border-slate-700/60"
                                  }`}
                                >
                                  {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                                  <span>{isCopied ? "Copied" : "Copy Link"}</span>
                                </button>

                                <Link
                                  href={procedureUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title={`Inspect Live ${spec.shortTitle} Portal for ${loc.name}`}
                                  className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition flex items-center justify-center shrink-0"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Local Competitor / Hub Context Note */}
                    <div className="bg-[#080E1A]/60 px-4 py-2.5 rounded-xl border border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span><strong>Hyperlocal Patient Guidance:</strong> Built for patients across {loc.keyNeighbourhoods.slice(0, 3).join(", ")} &amp; surrounding districts.</span>
                      <span className="text-emerald-400 font-semibold hidden md:inline">24/7 Doctor Consultation Line Active</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#0D1629] border border-slate-800 rounded-3xl space-y-3">
              <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-lg font-bold text-white">No Medical Centers Found</h4>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                No surgical centers match your search for &quot;{searchQuery}&quot;. Try selecting another state network or adjusting your filters.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
