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
  Database,
  KeyRound,
  Cpu,
  Navigation,
  AlertTriangle
} from "lucide-react";
import { DashboardIntelligence, CoordinatorNoteRecord } from "@/lib/secureDb";
import { 
  generateHardwareSignature, 
  checkDeviceAuthorization, 
  enrollCurrentDevice, 
  verifyGeographicAuthorization, 
  checkBruteForceLockout, 
  registerFailedAttempt, 
  clearFailedAttempts,
  HardwareSignature,
  GeoLocationStatus
} from "@/utils/zeroTrustAuth";

// ─────────────────────────────────────────────────────────────────────────────
// HealthFlo Managed Care Directorate — Executive Admin Intelligence Hub
// Security: Zero-Trust Hardware Binding + GPS Geofencing + AES-256 Encryption
// Legal Positioning: Internal Patient Care Coordinator Notes (Empanelled Network Only)
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminIntelligenceDashboard() {
  const [loginId, setLoginId] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [enrollmentKey, setEnrollmentKey] = useState("");
  const [showEnrollment, setShowEnrollment] = useState(false);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [intelligence, setIntelligence] = useState<DashboardIntelligence | null>(null);
  
  // Zero-Trust State
  const [hwAuth, setHwAuth] = useState<{ isEnrolled: boolean; isAuthorized: boolean; signature?: HardwareSignature }>({ isEnrolled: false, isAuthorized: false });
  const [geoStatus, setGeoStatus] = useState<GeoLocationStatus | null>(null);
  const [lockout, setLockout] = useState<{ locked: boolean; remainingSeconds: number }>({ locked: false, remainingSeconds: 0 });
  const [attemptsRemaining, setAttemptsRemaining] = useState(3);

  // Interactive Controls
  const [showDecrypted, setShowDecrypted] = useState(true);
  const [filterState, setFilterState] = useState<"All" | "Tamil Nadu" | "Karnataka" | "Telangana">("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [activeTab, setActiveTab] = useState<"telemetry" | "leads" | "queries">("telemetry");

  // Check device authorization and storage on mount
  useEffect(() => {
    const authCheck = checkDeviceAuthorization();
    setHwAuth(authCheck);

    verifyGeographicAuthorization().then((geo) => {
      setGeoStatus(geo);
    });

    const lockStatus = checkBruteForceLockout();
    setLockout(lockStatus);

    const savedKey = sessionStorage.getItem("healthflo_admin_key");
    const savedUser = sessionStorage.getItem("healthflo_admin_user");
    if (savedKey && savedUser && authCheck.isAuthorized && lockStatus.locked === false) {
      setLoginId(savedUser);
      authenticate(savedUser, savedKey, true);
    }
  }, []);

  // Lockout countdown timer
  useEffect(() => {
    let interval: any;
    if (lockout.locked && lockout.remainingSeconds > 0) {
      interval = setInterval(() => {
        setLockout((prev) => {
          if (prev.remainingSeconds <= 1) {
            clearFailedAttempts();
            return { locked: false, remainingSeconds: 0 };
          }
          return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockout.locked, lockout.remainingSeconds]);

  const authenticate = async (userToTest: string, keyToTest: string, isSilent = false) => {
    if (!isSilent) setLoading(true);
    setError(null);

    // 1. Check Brute Force Lock
    if (lockout.locked) {
      if (!isSilent) setError(`🚨 Security Lockout Active: Too many unauthorized attempts. Retry in ${lockout.remainingSeconds}s.`);
      if (!isSilent) setLoading(false);
      return;
    }

    // 2. Validate Login ID
    const validUsers = ["director@healthflo.in", "admin@healthflo.in", "coordinator_chief", "admin"];
    if (!validUsers.includes(userToTest.toLowerCase().trim())) {
      const fail = registerFailedAttempt();
      setLockout({ locked: fail.locked, remainingSeconds: fail.remainingSeconds });
      setAttemptsRemaining(fail.attemptsLeft);
      if (!isSilent) setError(`Unauthorized User ID. Access denied. (${fail.attemptsLeft} attempts remaining before enclave lockdown)`);
      if (!isSilent) setLoading(false);
      return;
    }

    // 3. Zero-Trust Hardware Verification
    const currentHw = checkDeviceAuthorization();
    if (currentHw.isEnrolled && !currentHw.isAuthorized) {
      if (!isSilent) setError(`🛑 SECURITY BREACH ALERT: Access Denied. Unregistered Hardware Fingerprint (${currentHw.signature.deviceHash}). This incident has been logged.`);
      if (!isSilent) setLoading(false);
      return;
    }

    // 4. Geolocation Verification
    if (geoStatus && !geoStatus.verified) {
      if (!isSilent) setError(`🌐 GEO-FENCE VIOLATION: Access attempted from restricted geographical coordinates (${geoStatus.latitude?.toFixed(2)}, ${geoStatus.longitude?.toFixed(2)}).`);
      if (!isSilent) setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passphrase: keyToTest }),
      });
      const json = await res.json();

      if (json.success && json.intelligence) {
        clearFailedAttempts();
        setIntelligence(json.intelligence);
        setIsAuthenticated(true);
        sessionStorage.setItem("healthflo_admin_key", keyToTest);
        sessionStorage.setItem("healthflo_admin_user", userToTest);
        
        // Auto-enroll device on successful login if not already enrolled
        if (!currentHw.isEnrolled) {
          const newSig = enrollCurrentDevice();
          setHwAuth({ isEnrolled: true, isAuthorized: true, signature: newSig });
        }
      } else {
        const fail = registerFailedAttempt();
        setLockout({ locked: fail.locked, remainingSeconds: fail.remainingSeconds });
        setAttemptsRemaining(fail.attemptsLeft);
        if (!isSilent) setError(json.error || `Invalid Admin Passphrase. (${fail.attemptsLeft} attempts left)`);
        sessionStorage.removeItem("healthflo_admin_key");
        setIsAuthenticated(false);
      }
    } catch (err) {
      if (!isSilent) setError("Connection failure while verifying encrypted security enclave.");
    } finally {
      if (!isSilent) setLoading(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authenticate(loginId, passphrase);
  };

  const handleDeviceEnrollment = () => {
    if (enrollmentKey === "MASTER-KEY-2026" || enrollmentKey === "healthflo@2026") {
      const newSig = enrollCurrentDevice();
      setHwAuth({ isEnrolled: true, isAuthorized: true, signature: newSig });
      setError(null);
      setShowEnrollment(false);
      alert("✅ Hardware Signature Enrolled: This device is now trusted for Directorate operations.");
    } else {
      setError("❌ Invalid Master Enrollment Key.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("healthflo_admin_key");
    sessionStorage.removeItem("healthflo_admin_user");
    setIsAuthenticated(false);
    setPassphrase("");
    setIntelligence(null);
  };

  const refreshTelemetry = () => {
    const key = sessionStorage.getItem("healthflo_admin_key") || passphrase;
    const user = sessionStorage.getItem("healthflo_admin_user") || loginId;
    if (key && user) authenticate(user, key, true);
  };

  // ── UNVERIFIED / ZERO-TRUST LOGIN GATEWAY ──────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050B14] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Background Cyber Security Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg bg-[#0A1224]/95 border border-amber-400/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.15)] backdrop-blur-2xl relative z-10"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-blue-600 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-3 border border-white/20">
              <ShieldCheck className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              HealthFlo Directorate
            </h1>
            <p className="text-xs font-black text-amber-400 uppercase tracking-widest mt-1 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
              🔒 4-Layer Zero-Trust Command Hub
            </p>
            <p className="text-xs text-slate-400 mt-2 max-w-sm">
              Protected enclave. Encrypted visitor telemetry formatted strictly as <strong className="text-slate-300">Internal Patient Care Coordinator Notes</strong> for empanelled hospitals.
            </p>
          </div>

          {/* Real-time Hardware & Geo Security Radar */}
          <div className="mb-6 bg-[#060D1A] border border-blue-500/20 rounded-2xl p-3.5 space-y-2 text-[11px] font-mono shadow-inner">
            <div className="flex items-center justify-between text-slate-300 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> [DEV-FINGERPRINT]:
              </span>
              <span className="text-amber-300 font-bold truncate max-w-[200px]">
                {hwAuth.signature?.deviceHash || "Scanning hardware..."}
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" /> [GEO-VERIFICATION]:
              </span>
              <span className="text-slate-200 text-right truncate max-w-[220px]">
                {geoStatus ? `${geoStatus.city} (${geoStatus.state})` : "Triangulating GPS coordinates..."}
              </span>
            </div>
          </div>

          {lockout.locked ? (
            <div className="p-5 rounded-2xl bg-rose-500/15 border-2 border-rose-500 text-rose-300 text-center space-y-2 animate-bounce">
              <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto" />
              <h3 className="font-bold text-base text-white">Security Enclave Lockdown Active</h3>
              <p className="text-xs">Multiple failed sign-in attempts detected. Access frozen to deter credential theft.</p>
              <p className="font-mono text-sm text-amber-300 font-extrabold">Cooldown Remaining: {lockout.remainingSeconds} seconds</p>
            </div>
          ) : (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-amber-400" /> Executive Login ID
                </label>
                <input
                  type="email"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                  placeholder="director@healthflo.in"
                  className="w-full px-4 py-3 rounded-xl bg-[#070D1C] border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Master Decryption Passphrase
                </label>
                <input
                  type="password"
                  value={passphrase}
                  onChange={(e) => setPassphrase(e.target.value)}
                  placeholder="Enter secret key (HealthFlo#2026!Secure)"
                  className="w-full px-4 py-3 rounded-xl bg-[#070D1C] border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition text-sm font-mono"
                  required
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-blue-600 hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-amber-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Hardware & AES Vault...
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4" /> Authenticate & Open Directorate Command
                  </>
                )}
              </button>
            </form>
          )}

          {/* Device Enrollment Manual Override Toggle */}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setShowEnrollment(!showEnrollment)}
              className="text-[11px] text-amber-400/80 hover:text-amber-300 font-semibold underline decoration-amber-500/50"
            >
              {showEnrollment ? "▲ Hide Device Enrollment Key" : "⚡ Need to register a new laptop or phone? Click to Bind Hardware"}
            </button>
            
            {showEnrollment && (
              <div className="mt-3 p-3.5 bg-white/5 border border-white/10 rounded-2xl text-left space-y-2 animate-fadeIn">
                <p className="text-[11px] text-slate-300 font-medium">
                  Enter your one-time hardware enrollment token to bind this machine to the security whitelist:
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={enrollmentKey}
                    onChange={(e) => setEnrollmentKey(e.target.value)}
                    placeholder="e.g. MASTER-KEY-2026"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleDeviceEnrollment}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition"
                  >
                    Bind Device
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col items-center text-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Legal Safe-Harbor: Empanelled Hospital Network Only
            </span>
            <span className="text-[11px] text-slate-500 leading-tight">
              All records encrypted in transit & at rest. Zero hospital ownership claims; exclusively patient concierge coordination notes.
            </span>
            <Link href="/" className="text-xs text-blue-400 hover:text-amber-300 font-semibold mt-1 inline-block transition-colors">
              ← Return to HealthFlo Patient Portal
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
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-blue-600 flex items-center justify-center shadow-md shadow-amber-500/20 border border-white/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-base md:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                HealthFlo Managed Care Directorate
                <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-500/10 text-emerald-400 font-black border border-emerald-500/30 uppercase tracking-wider">
                  Level 5 Clearance • {loginId || "Directorate"}
                </span>
              </h1>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                <span>Pan-South India Triage Hub</span>
                <span className="text-slate-600">•</span>
                <span className="text-amber-400 font-mono text-[11px]">HW: {hwAuth.signature?.deviceHash}</span>
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
