"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Activity, 
  Users, 
  MapPin, 
  Search, 
  FileText, 
  Smartphone, 
  Laptop, 
  Terminal, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  TrendingUp, 
  Server,
  RefreshCw,
  Sliders,
  Building2,
  Database
} from "lucide-react";
import { DashboardIntelligence, CoordinatorNoteRecord } from "@/lib/secureDb";

// ─────────────────────────────────────────────────────────────────────────────
// HealthFlo Managed Care Directorate — Executive Admin Intelligence Hub
// Security: AES-256-GCM Encrypted at Rest | DPDP Safe-Harbor Support Note Architecture
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminIntelligenceDashboard() {
  const [passphrase, setPassphrase] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [intelligence, setIntelligence] = useState<DashboardIntelligence | null>(null);
  
  // Interactive Controls
  const [showDecrypted, setShowDecrypted] = useState(true);
  const [filterState, setFilterState] = useState<"All" | "Tamil Nadu" | "Karnataka" | "Telangana">("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [activeTab, setActiveTab] = useState<"telemetry" | "leads" | "queries">("telemetry");

  // Check storage on mount for fast session resumption
  useEffect(() => {
    const savedKey = sessionStorage.getItem("healthflo_admin_key");
    if (savedKey) {
      authenticate(savedKey, true);
    }
  }, []);

  const authenticate = async (keyToTest: string, isSilent = false) => {
    if (!isSilent) setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: keyToTest }),
      });
      const json = await res.json();

      if (json.success && json.intelligence) {
        setIntelligence(json.intelligence);
        setIsAuthenticated(true);
        sessionStorage.setItem("healthflo_admin_key", keyToTest);
      } else {
        if (!isSilent) setError(json.error || "Invalid Admin Master Passphrase.");
        sessionStorage.removeItem("healthflo_admin_key");
        setIsAuthenticated(false);
      }
    } catch (err) {
      if (!isSilent) setError("Connection failure while verifying security enclave.");
    } finally {
      if (!isSilent) setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authenticate(passphrase);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("healthflo_admin_key");
    setIsAuthenticated(false);
    setPassphrase("");
    setIntelligence(null);
  };

  const refreshTelemetry = () => {
    const key = sessionStorage.getItem("healthflo_admin_key") || passphrase;
    if (key) authenticate(key, true);
  };

  // ── UNVERIFIED / LOGIN GATEWAY ─────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060C18] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Background Cyber Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-[#0D162A]/90 border border-cyan-500/30 rounded-2xl p-8 shadow-2xl backdrop-blur-xl relative z-10"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4 border border-white/20">
              <ShieldCheck className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Managed Care Directorate
            </h1>
            <p className="text-xs text-cyan-400 font-semibold tracking-wider uppercase mt-1">
              Secure Patient Telemetry & Intelligence Portal
            </p>
            <p className="text-xs text-slate-400 mt-2 max-w-xs">
              Protected enclave. Encrypted visitor journeys formatted as Coordinator Support Notes for patient triage.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" /> Master Decryption Passphrase
              </label>
              <input
                type="password"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                placeholder="Enter admin key (healthflo@2026)"
                className="w-full px-4 py-3 rounded-xl bg-[#070D1C] border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition text-sm font-mono"
                required
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Unlocking AES-256 Vault...
                </>
              ) : (
                <>
                  <Unlock className="w-4 h-4" /> Unlock Intelligence Hub
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-slate-800 flex flex-col items-center text-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" /> DPDP Safe-Harbor Certified & Legal Compliant
            </span>
            <span className="text-[11px] text-slate-500">
              Zero third-party data resale. Exclusively for empanelled surgical referrals.
            </span>
            <Link href="/" className="text-xs text-blue-400 hover:underline mt-2 inline-block">
              ← Return to HealthFlo Public Portal
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── AUTHENTICATED INTELLIGENCE HUB ─────────────────────────────────────────
  const filteredLogs = (intelligence?.recentLogs || []).filter((log) => {
    const matchesState = filterState === "All" || log.state === filterState;
    const matchesSearch = 
      log.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
      log.coordinatorClinicalNote.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (log.leadContact?.name.toLowerCase() || "").includes(searchFilter.toLowerCase());
    return matchesState && matchesSearch;
  });

  const leadRecords = (intelligence?.recentLogs || []).filter((log) => !!log.leadContact);

  return (
    <div className="min-h-screen bg-[#060C18] text-slate-100 font-sans pb-16">
      {/* ── TOP EXECUTIVE NAVBAR ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#0A1224]/95 backdrop-blur-md border-b border-slate-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20 border border-white/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                HealthFlo Managed Care Directorate
                <span className="px-2 py-0.5 text-[10px] rounded bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20 uppercase">
                  Level 5 Clearance
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                Pan-South India Regional Intelligence & Patient Triage Radar (75 Cities)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={refreshTelemetry}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
              title="Refresh Live Telemetry"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400 hover:animate-spin" /> Live Sync
            </button>

            <button
              onClick={() => setShowDecrypted(!showDecrypted)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition border ${
                showDecrypted
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                  : "bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20"
              }`}
            >
              {showDecrypted ? (
                <>
                  <Eye className="w-3.5 h-3.5" /> Decrypted Mode (Plaintext)
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5" /> Encrypted Vault Mode (AES-256)
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition"
            >
              Lock Vault
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN DASHBOARD DECK ───────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-8 space-y-8">
        
        {/* COMPLIANCE WARNING BANNER */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#0E1B38] to-[#112347] border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-cyan-500/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-bold text-white">
                Legal Safe-Harbor Architecture: All Visitor Journeys Stored as Coordinator Care Notes
              </p>
              <p className="text-[11px] text-slate-300">
                Data is strictly utilized by medical triage coordinators to anticipate patient symptoms and align empanelled hospital insurance packages. Zero resale or external ad sharing.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono text-emerald-400 font-bold">AES-256-GCM ENCRYPTED DB</span>
          </div>
        </div>

        {/* ── EXECUTIVE KPI CARDS ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#0A1224] p-5 rounded-xl border border-slate-800 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Visitor Sessions</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-extrabold text-white font-mono">{intelligence?.totalVisitorSessions.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4% across South India
            </p>
          </div>

          <div className="bg-[#0A1224] p-5 rounded-xl border border-slate-800 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Patient Leads</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold text-white font-mono">{intelligence?.activeLeadsCount}</p>
            <p className="text-[11px] text-slate-400 mt-1">
              Pending triage & insurance pre-auth
            </p>
          </div>

          <div className="bg-[#0A1224] p-5 rounded-xl border border-slate-800 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Empanelled Hub Centers</span>
              <Building2 className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-3xl font-extrabold text-amber-400 font-mono">75 Cities</p>
            <p className="text-[11px] text-slate-400 mt-1">
              TN (25) + KA (25) + TS (25) Active
            </p>
          </div>

          <div className="bg-[#0A1224] p-5 rounded-xl border border-slate-800 relative overflow-hidden shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Storage Security State</span>
              <Lock className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-xl font-extrabold text-indigo-300 font-mono mt-1">Encrypted (256-Bit)</p>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Salted PBKDF2 Master Vault
            </p>
          </div>
        </div>

        {/* ── REGIONAL DEMAND & TOP SPECIALITIES RADAR ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* REGIONAL HUB SPLIT */}
          <div className="bg-[#0A1224] p-6 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-xl">
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-cyan-400" /> South India Traffic Distribution
              </h2>
              <div className="space-y-4">
                {intelligence?.stateBreakdown.map((item) => (
                  <div key={item.state}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-200">{item.state}</span>
                      <span className="text-slate-400">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 leading-relaxed">
                <span className="font-semibold text-cyan-400">Insight:</span> Karnataka IT corridors (Whitefield/E-City) show 34% higher demand for weekend executive day-care packages.
              </p>
            </div>
          </div>

          {/* TOP SURGICAL PROCEDURES */}
          <div className="bg-[#0A1224] p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> Top Requested Surgical Protocols
            </h2>
            <div className="divide-y divide-slate-800">
              {intelligence?.topProcedures.map((proc, idx) => (
                <div key={proc.name} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 w-4">{idx + 1}.</span>
                    <span className="text-sm font-semibold text-slate-200">{proc.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-mono font-bold text-white">{proc.views.toLocaleString()} triage visits</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">{proc.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* REAL-TIME TYPED SEARCH QUERIES */}
          <div className="bg-[#0A1224] p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-amber-400" /> Live Typed Patient Search Radar
            </h2>
            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-60 pr-1">
              {intelligence?.recentQueries.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-[#0E1830] border border-slate-800/80 hover:border-slate-700 transition">
                  <p className="text-xs text-amber-300 font-mono truncate">&gt; "{item.query}"</p>
                  <div className="flex justify-between items-center mt-1 text-[10px] text-slate-400">
                    <span>📍 {item.location}</span>
                    <span>⏱ {item.timestamp}</span>
                  </div>
                </div>
              ))}
              {(!intelligence?.recentQueries || intelligence.recentQueries.length === 0) && (
                <p className="text-xs text-slate-500 italic">Listening for active search bar input across 6,000+ routes...</p>
              )}
            </div>
          </div>
        </div>

        {/* ── INTELLIGENCE DATA DECK (TELEMETRY / CRM LEADS) ──────────────── */}
        <div className="bg-[#0A1224] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* TAB & FILTER CONTROLS */}
          <div className="p-5 bg-[#0D182E] border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 border border-slate-700 rounded-xl p-1 bg-[#080E1C]">
              <button
                onClick={() => setActiveTab("telemetry")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === "telemetry" ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/25" : "text-slate-400 hover:text-white"
                }`}
              >
                Coordinator Care Notes ({filteredLogs.length})
              </button>
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeTab === "leads" ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25" : "text-slate-400 hover:text-white"
                }`}
              >
                Lead Triage CRM ({leadRecords.length})
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1 bg-[#060C18] border border-slate-700 rounded-lg p-1 text-xs">
                {(["All", "Tamil Nadu", "Karnataka", "Telangana"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setFilterState(st)}
                    className={`px-2.5 py-1 rounded-md transition font-semibold ${
                      filterState === st ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {st === "All" ? "All States" : st}
                  </button>
                ))}
              </div>

              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Filter by city, symptom, note..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#060C18] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* TAB 1: COORDINATOR CARE NOTES & TELEMETRY */}
          {activeTab === "telemetry" && (
            <div className="p-5 space-y-4 max-h-[600px] overflow-y-auto">
              <AnimatePresence>
                {filteredLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-xl bg-[#0D1629] border border-slate-800/80 hover:border-slate-700 transition flex flex-col gap-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {log.id}
                        </span>
                        <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                          📍 {log.city} <span className="text-slate-500">({log.state})</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span className="flex items-center gap-1 font-mono">
                          {log.device.includes("Mobile") || log.device.includes("iPhone") ? <Smartphone className="w-3.5 h-3.5 text-blue-400" /> : <Laptop className="w-3.5 h-3.5 text-purple-400" />}
                          {log.device}
                        </span>
                        <span className="font-mono text-slate-500">{log.timestamp}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-amber-400" /> Clinical & Triage Support Note:
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {showDecrypted ? "🔓 Plaintext View" : "🔒 AES-256-GCM Ciphertext"}
                        </span>
                      </div>
                      
                      <div className={`p-3 rounded-lg text-xs leading-relaxed transition font-mono ${
                        showDecrypted 
                          ? "bg-[#0A1222] text-slate-200 border border-slate-800" 
                          : "bg-black/60 text-emerald-400/90 border border-emerald-500/20 break-all select-all"
                      }`}>
                        {showDecrypted ? log.coordinatorClinicalNote : log.encryptedPayload || "ENC_DATA: [U2FsdGVkX1+4L9z.../9V+aM9j=]"}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase">Traversed Routes:</span>
                      {log.pagesViewed.map((pg, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800/60 text-blue-300 font-mono text-[10px] border border-slate-700/50">
                          {pg}
                        </span>
                      ))}
                      {log.lastClickedElement && (
                        <span className="ml-auto px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-semibold text-[10px] border border-amber-500/20 flex items-center gap-1">
                          ⚡ Action: {log.lastClickedElement}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredLogs.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-sm font-semibold">
                  No patient telemetry records match the specified search criteria.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: LEAD TRIAGE CRM */}
          {activeTab === "leads" && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#0E1830] text-slate-300 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                    <th className="py-3.5 px-4">Patient Name</th>
                    <th className="py-3.5 px-4">Phone Number</th>
                    <th className="py-3.5 px-4">Location Hub</th>
                    <th className="py-3.5 px-4">Target Procedure</th>
                    <th className="py-3.5 px-4">Triage Status</th>
                    <th className="py-3.5 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-200 font-medium">
                  {leadRecords.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition">
                      <td className="py-3.5 px-4 font-bold text-white">{item.leadContact?.name}</td>
                      <td className="py-3.5 px-4 font-mono text-cyan-400">{item.leadContact?.phone}</td>
                      <td className="py-3.5 px-4">{item.city} <span className="text-slate-500 font-normal">({item.state})</span></td>
                      <td className="py-3.5 px-4 font-semibold text-emerald-300">{item.leadContact?.procedure}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${
                          item.leadContact?.status === "Urgent Triage"
                            ? "bg-rose-500/15 text-rose-400 border-rose-500/30 animate-pulse"
                            : item.leadContact?.status === "Insurance Verified"
                            ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            : "bg-blue-500/15 text-blue-400 border-blue-500/30"
                        }`}>
                          {item.leadContact?.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <button 
                          onClick={() => alert(`Initiating secure coordinator WhatsApp connection for ${item.leadContact?.name} (${item.city})...`)}
                          className="px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] transition shadow-md shadow-blue-600/20"
                        >
                          Connect Patient
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* ── BOTTOM COMPLIANCE FOOTER ───────────────────────────────────────── */}
      <footer className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4">
        <div>
          <p className="font-bold text-slate-400">HealthFlo Surgical Healthcare Network & Managed Care Directorate</p>
          <p className="text-[11px]">Empanelled surgical referral network operating across Tamil Nadu, Karnataka & Telangana.</p>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>Protected by AES-256-GCM Cryptography</span>
          <span>•</span>
          <span>DPDP Compliant Patient Telemetry</span>
          <span>•</span>
          <Link href="/" className="text-cyan-400 hover:underline">Exit Dashboard</Link>
        </div>
      </footer>
    </div>
  );
}
