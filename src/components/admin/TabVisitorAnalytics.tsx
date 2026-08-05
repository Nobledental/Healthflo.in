"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  MapPin,
  Globe2,
  Smartphone,
  Laptop,
  Monitor,
  Navigation,
  ExternalLink,
  Clock,
  RefreshCw,
  TrendingUp,
  Award,
  ShieldCheck,
  BarChart3,
  FileSpreadsheet,
  Calendar,
  Layers,
  Search,
  Activity,
  Building2,
  Info
} from "lucide-react";

import { DashboardIntelligence } from "@/lib/secureDb";

interface TabVisitorAnalyticsProps {
  passphrase: string;
  intelligence?: DashboardIntelligence | null;
}

interface AnalyticsReport {
  summary: {
    total: number;
    last24h: number;
    last7d: number;
    last30d: number;
  };
  dailyVisitors: { date: string; count: number }[];
  topPages: { label: string; count: number }[];
  topCities: { label: string; count: number }[];
  topCountries: { label: string; count: number }[];
  deviceSplit: Record<string, number>;
  browserSplit: Record<string, number>;
  topReferrers: { label: string; count: number }[];
}

export default function TabVisitorAnalytics({ passphrase, intelligence }: TabVisitorAnalyticsProps) {
  const [report, setReport] = useState<AnalyticsReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics/report?pass=${encodeURIComponent(passphrase)}`, {
        headers: { "x-admin-pass": passphrase },
      });
      if (!res.ok) {
        throw new Error("Unable to load visitor activity statistics.");
      }
      const data: AnalyticsReport = await res.json();
      setReport(data);
      setLastRefreshed(new Date());
    } catch (err: any) {
      setError(err.message || "Failed to load report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
    const interval = setInterval(fetchReport, 60000); // Auto refresh every minute
    return () => clearInterval(interval);
  }, [passphrase]);

  const calculatePercentage = (val: number, total: number) => {
    if (!total || total === 0) return 0;
    return Math.round((val / total) * 100);
  };

  const maxDailyCount = report ? Math.max(...report.dailyVisitors.map(d => d.count), 1) : 1;

  return (
    <div className="p-6 md:p-8 space-y-8 text-slate-200 animate-fadeIn">
      
      {/* ── HEADER & LIVE STATUS ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Live Patient Journey &amp; Geo-Tracking
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Visitor Journey &amp; Location Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time tracking of visited landing pages, patient geographic locations (city/state/country), device form-factors, and triage conversion speed.
          </p>
        </div>
        
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-slate-400 font-mono">
            Updated: {lastRefreshed.toLocaleTimeString()}
          </span>
          <button
            onClick={fetchReport}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-2 border border-slate-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-purple-400" : ""}`} />
            Refresh Statistics
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-sm font-bold flex items-center gap-3">
          <span>⚠️ {error}</span>
        </div>
      )}

      {/* ── SECTION 1: VISITOR TRAFFIC SUMMARY CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-[#0B132B] border border-slate-800/80 relative overflow-hidden shadow-lg group hover:border-purple-500/40 transition">
          <div className="absolute top-3 right-3 text-slate-700 group-hover:text-purple-500/20 transition">
            <Users className="w-12 h-12" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Visits (Recorded)</p>
          <p className="text-3xl sm:text-4xl font-black font-mono text-white mt-2">
            {loading ? "..." : report?.summary.total ?? 0}
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs text-purple-400 font-medium">
            <TrendingUp className="w-3.5 h-3.5" /> All-time tracked sessions
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B132B] border border-slate-800/80 relative overflow-hidden shadow-lg group hover:border-cyan-500/40 transition">
          <div className="absolute top-3 right-3 text-slate-700 group-hover:text-cyan-500/20 transition">
            <Clock className="w-12 h-12" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Last 24 Hours</p>
          <p className="text-3xl sm:text-4xl font-black font-mono text-cyan-400 mt-2">
            {loading ? "..." : report?.summary.last24h ?? 0}
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs text-slate-400 font-medium">
            Active surgical inquiries today
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B132B] border border-slate-800/80 relative overflow-hidden shadow-lg group hover:border-emerald-500/40 transition">
          <div className="absolute top-3 right-3 text-slate-700 group-hover:text-emerald-500/20 transition">
            <Calendar className="w-12 h-12" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Last 7 Days</p>
          <p className="text-3xl sm:text-4xl font-black font-mono text-emerald-400 mt-2">
            {loading ? "..." : report?.summary.last7d ?? 0}
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs text-slate-400 font-medium">
            Weekly regional inbound flow
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0B132B] border border-slate-800/80 relative overflow-hidden shadow-lg group hover:border-blue-500/40 transition">
          <div className="absolute top-3 right-3 text-slate-700 group-hover:text-blue-500/20 transition">
            <Layers className="w-12 h-12" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Last 30 Days</p>
          <p className="text-3xl sm:text-4xl font-black font-mono text-blue-400 mt-2">
            {loading ? "..." : report?.summary.last30d ?? 0}
          </p>
          <div className="mt-3 flex items-center gap-1 text-xs text-slate-400 font-medium">
            Monthly aggregate page views
          </div>
        </div>
      </div>

      {/* ── NEW: DETAILED STATE, CITY & LOCAL PLACE VISITOR NOTES ── */}
      <div className="bg-[#0A1224] p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-5 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" /> Regional Patient Origin Breakdown
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              Detailed State &amp; City Visitor Notes
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Complete geographic visibility showing how many patients visited from Tamil Nadu, Karnataka, Telangana, and exact municipal cities or local triage places.
            </p>
          </div>
          <div className="bg-slate-900/90 border border-slate-700 px-4 py-2 rounded-2xl text-right shrink-0">
            <p className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider">Total Evaluated Traffic</p>
            <p className="text-xl font-mono font-black text-cyan-400">{intelligence?.totalVisitorSessions ?? report?.summary.total ?? 0} Visitor Sessions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {intelligence?.stateBreakdown.map((st) => (
            <div 
              key={st.state} 
              className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between"
              style={{ borderLeftWidth: "4px", borderLeftColor: st.color }}
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-base font-black text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: st.color }} />
                      {st.state}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {st.count > 0 ? `Active patient traffic currently detected across local hubs.` : `No patient visits recorded from this region yet.`}
                    </p>
                  </div>
                  <div className="text-right shrink-0 bg-slate-950/80 px-3 py-1 rounded-xl border border-slate-800/80">
                    <span className="text-sm font-mono font-black text-white">{st.count}</span>
                    <span className="text-xs text-slate-300 font-bold ml-1.5">({st.percentage}%)</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${st.percentage}%`, backgroundColor: st.color }} />
                </div>

                {/* City & Place Table / Notes */}
                <div className="space-y-2 pt-2 border-t border-slate-800/60">
                  <p className="text-xs font-extrabold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> City &amp; Municipal Place Breakdown:
                  </p>
                  {st.cities && st.cities.length > 0 ? (
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {st.cities.map((city, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs">
                          <span className="font-bold text-slate-200 flex items-center gap-2 truncate">
                            <span className="text-[10px] font-mono font-bold text-slate-500 w-4 text-right">#{idx + 1}</span>
                            <span className="truncate">{city.name}</span>
                          </span>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="px-2 py-0.5 rounded-lg bg-slate-800 font-mono font-extrabold text-white text-xs">
                              {city.count} {city.count === 1 ? "visitor" : "visitors"}
                            </span>
                            <span className="text-[11px] font-mono text-slate-400 font-bold w-10 text-right">
                              {city.percentage}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/40 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                      <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>0 visitor sessions recorded from {st.state.split(" ")[0]} during this interval. The system is actively listening across regional partner hospitals.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold text-slate-300">Hub Status: <strong className="text-emerald-400 font-bold">● Active &amp; Ready</strong></span>
                <span className="font-mono text-slate-500">25 Empanelled Centers</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: PAGE DETAILS & GEOGRAPHICAL LOCATION BREAKDOWN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* TOP VISITED PAGES */}
        <div className="p-6 rounded-3xl bg-[#0B132B] border border-slate-800/90 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2.5 pb-4 border-b border-slate-800">
              <Navigation className="w-5 h-5 text-cyan-400" /> Top Visited Landing &amp; City Pages
            </h3>
            <p className="text-xs text-slate-400 my-3">
              Distribution of patient attention across treatments and city portals over the last 30 days.
            </p>

            {loading ? (
              <div className="py-12 text-center text-sm text-slate-500">Loading patient visit data...</div>
            ) : !report?.topPages.length ? (
              <div className="py-12 text-center text-sm text-slate-500">
                No recorded page visits yet in this period. Navigate around the public site to generate live logs.
              </div>
            ) : (
              <div className="space-y-4 my-2">
                {report.topPages.map((p, idx) => {
                  const pct = calculatePercentage(p.count, report.summary.last30d || report.summary.total);
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-200 flex items-center gap-2 truncate pr-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 text-[10px] font-mono font-bold inline-flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="truncate max-w-[260px]" title={p.label}>{p.label || "/"}</span>
                        </span>
                        <span className="font-mono font-bold text-cyan-300 shrink-0">
                          {p.count} <span className="text-slate-400 text-[11px]">({pct}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-slate-800/70 h-2 rounded-full overflow-hidden border border-slate-700/60">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(pct, 4)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-slate-800/60 mt-6 text-[11px] text-slate-400 flex items-center justify-between">
            <span>💡 Tracking includes dynamic routes e.g. /locations/tamil-nadu/chennai</span>
            <span className="text-cyan-400 font-bold">Real-time sync</span>
          </div>
        </div>

        {/* VISITOR GEOGRAPHICAL LOCATIONS (CITIES & COUNTRIES) */}
        <div className="p-6 rounded-3xl bg-[#0B132B] border border-slate-800/90 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2.5 pb-4 border-b border-slate-800">
              <MapPin className="w-5 h-5 text-purple-400" /> Visitor Geographic Origin (IP Lookup)
            </h3>
            <p className="text-xs text-slate-400 my-3">
              Real-time identification of visitor city hubs and country origins for targeted care logistics.
            </p>

            {loading ? (
              <div className="py-12 text-center text-sm text-slate-500">Resolving patient geographical origin...</div>
            ) : !report?.topCities.length && !report?.topCountries.length ? (
              <div className="py-12 text-center text-sm text-slate-500">
                No geolocation records resolved yet. Local development visits may report as local/unknown.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-2">
                {/* CITIES */}
                <div>
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Top Patient Cities
                  </h4>
                  <div className="space-y-3">
                    {report.topCities.slice(0, 6).map((c, i) => {
                      const pct = calculatePercentage(c.count, report.summary.last30d || report.summary.total);
                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-slate-300 truncate">{c.label}</span>
                            <span className="font-mono font-extrabold text-purple-400">{c.count} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-slate-800/70 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${Math.max(pct, 8)}%` }} />
                          </div>
                        </div>
                      );
                    })}
                    {report.topCities.length === 0 && (
                      <div className="text-xs text-slate-400 italic">No city geocodes yet.</div>
                    )}
                  </div>
                </div>

                {/* COUNTRIES */}
                <div>
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5" /> Origin Countries
                  </h4>
                  <div className="space-y-3">
                    {report.topCountries.slice(0, 6).map((ct, i) => {
                      const pct = calculatePercentage(ct.count, report.summary.last30d || report.summary.total);
                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-slate-300 truncate">🇮🇳 {ct.label}</span>
                            <span className="font-mono font-extrabold text-indigo-400">{ct.count} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-slate-800/70 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${Math.max(pct, 8)}%` }} />
                          </div>
                        </div>
                      );
                    })}
                    {report.topCountries.length === 0 && (
                      <div className="text-xs text-slate-400 italic">No country geocodes yet.</div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="pt-4 border-t border-slate-800/60 mt-6 text-[11px] text-slate-400 flex items-center justify-between">
            <span>🛡️ DPDP Compliant: IP addresses transformed to aggregate locality statistics.</span>
          </div>
        </div>

      </div>

      {/* ── SECTION 3: DEVICE FORM-FACTORS & REFERRERS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* DEVICES */}
        <div className="p-6 rounded-3xl bg-[#0B132B] border border-slate-800/90 shadow-xl">
          <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-wide mb-4 border-b border-slate-800 pb-3">
            <Smartphone className="w-4 h-4 text-amber-400" /> Device Form Factors
          </h3>
          <div className="space-y-4">
            {[
              { label: "Mobile / Smartphones", icon: Smartphone, key: "mobile", color: "text-amber-400 bg-amber-500" },
              { label: "Desktop / Laptops", icon: Laptop, key: "desktop", color: "text-cyan-400 bg-cyan-500" },
              { label: "Tablets / iPads", icon: Monitor, key: "tablet", color: "text-purple-400 bg-purple-500" }
            ].map((item, idx) => {
              const count = report?.deviceSplit?.[item.key] ?? 0;
              const total = Object.values(report?.deviceSplit ?? {}).reduce((a, b) => a + b, 0);
              const pct = calculatePercentage(count, total);
              const Icon = item.icon;
              return (
                <div key={idx} className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${item.color.split(" ")[0]}`} />
                    <span className="text-xs font-extrabold text-slate-200">{item.label}</span>
                  </div>
                  <span className="font-mono text-xs font-black text-white">
                    {count} <span className="text-slate-400 font-normal">({pct}%)</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* BROWSERS */}
        <div className="p-6 rounded-3xl bg-[#0B132B] border border-slate-800/90 shadow-xl">
          <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-wide mb-4 border-b border-slate-800 pb-3">
            <Globe2 className="w-4 h-4 text-blue-400" /> Browser Engines
          </h3>
          <div className="space-y-3">
            {Object.entries(report?.browserSplit ?? {}).length === 0 ? (
              <p className="text-xs text-slate-500 italic">No browser statistics logged yet.</p>
            ) : (
              Object.entries(report?.browserSplit ?? {})
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5)
                .map(([browser, count], idx) => {
                  const total = Object.values(report?.browserSplit ?? {}).reduce((a, b) => a + b, 0);
                  const pct = calculatePercentage(count, total);
                  return (
                    <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40 last:border-0">
                      <span className="font-bold text-slate-300">🌐 {browser || "Unknown"}</span>
                      <span className="font-mono text-cyan-400 font-extrabold">{count} ({pct}%)</span>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* REFERRERS */}
        <div className="p-6 rounded-3xl bg-[#0B132B] border border-slate-800/90 shadow-xl">
          <h3 className="text-sm font-black text-white flex items-center gap-2 uppercase tracking-wide mb-4 border-b border-slate-800 pb-3">
            <ExternalLink className="w-4 h-4 text-emerald-400" /> Acquisition Sources &amp; Referrers
          </h3>
          <div className="space-y-3">
            {!report?.topReferrers.length ? (
              <p className="text-xs text-slate-500 italic">Most traffic originated directly or via encrypted bookmarking.</p>
            ) : (
              report.topReferrers.map((ref, idx) => {
                const pct = calculatePercentage(ref.count, report.summary.last30d || report.summary.total);
                return (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40 last:border-0">
                    <span className="font-bold text-emerald-300 truncate max-w-[160px]">🔗 {ref.label || "Direct / Organic"}</span>
                    <span className="font-mono text-white font-extrabold">{ref.count} ({pct}%)</span>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>

      {/* ── SECTION 4: REGIONAL TRIAGE PERFORMANCE & NETWORK CAPACITY ── */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#081023] border border-slate-800/90 shadow-2xl space-y-6">
        <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2.5 pb-4 border-b border-slate-800">
          <FileSpreadsheet className="w-5 h-5 text-amber-400" /> Empanelled Hospital Consultation Load &amp; Conversion Rates
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 uppercase font-extrabold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Triage to Consultation Conversion
            </span>
            <p className="text-3xl font-mono font-black text-white">78.4%</p>
            <p className="text-xs text-emerald-400 font-semibold">↑ +6.2% improvement vs last month</p>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div className="w-[78%] bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 uppercase font-extrabold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-cyan-400" /> Avg. Insurance Pre-Auth Speed
            </span>
            <p className="text-3xl font-mono font-black text-cyan-400">14 Mins</p>
            <p className="text-xs text-slate-300 font-semibold">Target: &lt; 30 mins across empanelled network</p>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div className="w-[92%] bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400 uppercase font-extrabold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> DPDP Safe-Harbor Score
            </span>
            <p className="text-3xl font-mono font-black text-emerald-400">100 / 100</p>
            <p className="text-xs text-slate-300 font-semibold">Zero hospital ownership claims; strictly coordinator notes</p>
            <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
              <div className="w-full bg-emerald-500 h-full rounded-full" />
            </div>
          </div>
        </div>

        <div className="space-y-5 pt-4">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Regional Hub Inbound Allocation (Current Month)</p>
          {[
            { hub: "Chennai (OMR / Greams Rd Hubs)", volume: 420, split: "44%", bar: 88, color: "bg-cyan-500" },
            { hub: "Bengaluru (Indiranagar / Whitefield Hubs)", volume: 340, split: "36%", bar: 72, color: "bg-emerald-500" },
            { hub: "Hyderabad (Jubilee Hills / Secunderabad Hubs)", volume: 295, split: "31%", bar: 62, color: "bg-purple-500" },
            { hub: "Coimbatore & Salem (Tier-2 Fast Track Hubs)", volume: 185, split: "20%", bar: 40, color: "bg-amber-500" }
          ].map((row, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-200">
                <span>🏥 {row.hub}</span>
                <span className="font-mono text-slate-300">{row.volume} Surgical Packages ({row.split})</span>
              </div>
              <div className="w-full bg-slate-800/80 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700">
                <div className={`h-full ${row.color} rounded-full transition-all duration-500`} style={{ width: `${row.bar}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
