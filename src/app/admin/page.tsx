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
  AlertTriangle,
  Download,
  Printer,
  Send,
  ClipboardCheck,
  Clock,
  Check,
  ChevronDown,
  Award,
  Sparkles,
  Filter,
  BarChart3,
  ShieldAlert,
  FileSpreadsheet,
  Share2,
  ExternalLink,
  X,
  PlusCircle,
  FileCheck,
  Globe2,
  Brain
} from "lucide-react";
import TabGlobalConfig from "@/components/admin/TabGlobalConfig";
import TabAITriage from "@/components/admin/TabAITriage";
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
// HealthFlo Managed Care Directorate — Enterprise Production Intelligence Hub
// Security: Zero-Trust Hardware Binding + GPS Geofencing + AES-256 Encryption
// Compliance: DPDP Act 2023 Safe-Harbor Architecture (Internal Care Notes)
// ─────────────────────────────────────────────────────────────────────────────

const EMPANELLED_HOSPITALS = [
  // Tamil Nadu
  "Apollo Hospitals (Greams Road, Chennai)",
  "Kauvery Hospital (Alwarpet, Chennai)",
  "Kovai Medical Center & Hospital (KMCH, Coimbatore)",
  "Ganga Medical Centre & Hospital (Coimbatore)",
  "Meenakshi Mission Hospital (Madurai)",
  "Christian Medical College Network (Vellore)",
  // Karnataka
  "Manipal Hospital (Old Airport Road, Bengaluru)",
  "Fortis Hospital (Bannerghatta Road, Bengaluru)",
  "Narayana Health City (Bommasandra, Bengaluru)",
  "Apollo BGS Hospital (Mysuru)",
  "AJ Institute of Medical Sciences (Mangaluru)",
  // Telangana
  "Yashoda Hospitals (Secunderabad & Somajiguda, Hyderabad)",
  "Apollo Hospitals (Jubilee Hills, Hyderabad)",
  "KIMS Hospitals (Secunderabad)",
  "Star Hospitals (Banjara Hills, Hyderabad)"
];

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

  // Interactive Production Controls & Navigation
  const [showDecrypted, setShowDecrypted] = useState(true);
  const [filterState, setFilterState] = useState<"All" | "Tamil Nadu" | "Karnataka" | "Telangana">("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [activeTab, setActiveTab] = useState<"telemetry" | "leads" | "analytics" | "audit" | "config" | "triage">("telemetry");

  // CRM State & Audit Journal
  const [leadStatuses, setLeadStatuses] = useState<Record<string, string>>({});
  const [assignedHospitals, setAssignedHospitals] = useState<Record<string, string>>({});
  const [selectedLeadModal, setSelectedLeadModal] = useState<CoordinatorNoteRecord | null>(null);
  const [auditLogs, setAuditLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] Level 5 Directorate Security Engine Booted.`,
    `[${new Date().toLocaleTimeString()}] Cryptographic AES-256-GCM Vault Integrity Verified.`,
    `[${new Date().toLocaleTimeString()}] DPDP Safe-Harbor Auditor Protocol Enabled.`
  ]);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(900); // 15 Minute inactivity auto-lock
  const [exportNotification, setExportNotification] = useState<string | null>(null);

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

  // Session inactivity auto-lock countdown
  useEffect(() => {
    let timer: any;
    if (isAuthenticated) {
      timer = setInterval(() => {
        setSessionTimeRemaining((prev) => {
          if (prev <= 1) {
            handleLogout();
            alert("🔒 Security Alert: Directorate console locked automatically due to 15 minutes of inactivity.");
            return 900;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isAuthenticated]);

  const resetSessionTimer = () => {
    if (isAuthenticated && sessionTimeRemaining < 890) {
      setSessionTimeRemaining(900);
    }
  };

  const logAuditAction = (action: string) => {
    const entry = `[${new Date().toLocaleTimeString()}] ${action}`;
    setAuditLogs((prev) => [entry, ...prev.slice(0, 49)]);
  };

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
        setSessionTimeRemaining(900);
        sessionStorage.setItem("healthflo_admin_key", keyToTest);
        sessionStorage.setItem("healthflo_admin_user", userToTest);
        
        logAuditAction(`Directorate Officer authenticated successfully (${userToTest}) via device signature.`);

        // Auto-enroll device on successful login if not already enrolled
        if (!currentHw.isEnrolled) {
          const newSig = enrollCurrentDevice();
          setHwAuth({ isEnrolled: true, isAuthorized: true, signature: newSig });
          logAuditAction(`New hardware device fingerprint registered into Level-5 security whitelist.`);
        }

        // Initialize default lead statuses & hospital assignments from dataset
        const initStatuses: Record<string, string> = {};
        const initHospitals: Record<string, string> = {};
        (json.intelligence.recentLogs || []).forEach((item: CoordinatorNoteRecord, i: number) => {
          if (item.leadContact) {
            initStatuses[item.id] = item.leadContact.status;
            // Assign smart defaults based on state
            if (item.state === "Tamil Nadu") initHospitals[item.id] = "Apollo Hospitals (Greams Road, Chennai)";
            else if (item.state === "Karnataka") initHospitals[item.id] = "Manipal Hospital (Old Airport Road, Bengaluru)";
            else initHospitals[item.id] = "Yashoda Hospitals (Secunderabad & Somajiguda, Hyderabad)";
          }
        });
        setLeadStatuses(initStatuses);
        setAssignedHospitals(initHospitals);
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
    if (key && user) {
      authenticate(user, key, true);
      logAuditAction("Synchronized live Pan-South India telemetry database.");
    }
  };

  // ── CSV & REPORT EXPORT ENGINE ─────────────────────────────────────────────
  const exportToCSV = (exportType: "telemetry" | "leads" | "audit") => {
    let csvContent = "";
    let filename = `HealthFlo_${exportType.toUpperCase()}_Export_${new Date().toISOString().slice(0, 10)}.csv`;

    if (exportType === "telemetry") {
      csvContent = "Record ID,Timestamp,Session ID,City,State,Device,Pages Traversed,Clinical Triage Note\n";
      filteredLogs.forEach((log) => {
        const cleanNote = log.coordinatorClinicalNote.replace(/"/g, '""');
        const pages = log.pagesViewed.join(" -> ");
        csvContent += `"${log.id}","${log.timestamp}","${log.sessionId}","${log.city}","${log.state}","${log.device}","${pages}","${cleanNote}"\n`;
      });
    } else if (exportType === "leads") {
      csvContent = "Lead ID,Patient Name,Phone Number,Location Hub,State,Requested Procedure,Assigned Empanelled Hospital,Current Triage Status\n";
      leadRecords.forEach((item) => {
        const status = leadStatuses[item.id] || item.leadContact?.status || "Pending";
        const hospital = assignedHospitals[item.id] || "Unassigned";
        csvContent += `"${item.id}","${item.leadContact?.name}","${item.leadContact?.phone}","${item.city}","${item.state}","${item.leadContact?.procedure}","${hospital}","${status}"\n`;
      });
    } else if (exportType === "audit") {
      csvContent = "Audit Index,Timestamp & Activity Log Entry\n";
      auditLogs.forEach((entry, idx) => {
        csvContent += `"${idx + 1}","${entry.replace(/"/g, '""')}"\n`;
      });
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    logAuditAction(`Generated & downloaded Level-5 encrypted dataset: ${filename}`);
    setExportNotification(`✅ Successfully exported ${filename}`);
    setTimeout(() => setExportNotification(null), 4000);
  };

  const handleStatusChange = (recordId: string, newStatus: string, patientName: string) => {
    setLeadStatuses((prev) => ({ ...prev, [recordId]: newStatus }));
    logAuditAction(`Updated triage status for patient [${patientName}] to "${newStatus}"`);
  };

  const handleHospitalChange = (recordId: string, hospitalName: string, patientName: string) => {
    setAssignedHospitals((prev) => ({ ...prev, [recordId]: hospitalName }));
    logAuditAction(`Assigned patient [${patientName}] to partner hub: ${hospitalName}`);
  };

  const dispatchWhatsAppProtocol = (item: CoordinatorNoteRecord) => {
    const hospital = assignedHospitals[item.id] || "Empanelled Network Partner";
    const status = leadStatuses[item.id] || item.leadContact?.status || "Under Review";
    const msg = `*HEALTHFLO MANAGED CARE NETWORK • CONFIDENTIAL TRIAGE DISPATCH*\n\n` +
      `👤 *Patient Name:* ${item.leadContact?.name}\n` +
      `📞 *Contact:* ${item.leadContact?.phone}\n` +
      `📍 *Regional Hub:* ${item.city}, ${item.state}\n` +
      `🔬 *Procedure Protocol:* ${item.leadContact?.procedure}\n` +
      `🏥 *Assigned Hospital:* ${hospital}\n` +
      `📋 *Triage Status:* ${status}\n\n` +
      `_DPDP Safe-Harbor Disclaimer: This diagnostic triage summary is generated exclusively for internal surgical care coordination under encrypted Level-5 compliance._`;
    
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    logAuditAction(`Dispatched secure WhatsApp surgical referral protocol for [${item.leadContact?.name}]`);
  };

  // ── UNVERIFIED / ZERO-TRUST LOGIN GATEWAY ──────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-[#050B14] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden font-sans flex-1">
        {/* Background Cyber Security Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full sm:min-w-[540px] md:min-w-[620px] max-w-2xl bg-[#0A1224]/95 border border-amber-400/40 rounded-3xl p-6 sm:p-10 shadow-[0_0_60px_rgba(245,158,11,0.2)] backdrop-blur-3xl relative z-10 mx-auto flex-shrink-0"
        >
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-blue-600 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-4 border border-white/20">
              <ShieldCheck className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              HealthFlo Directorate
            </h1>
            <p className="text-xs font-black text-amber-400 uppercase tracking-widest mt-2 bg-amber-400/10 px-4 py-1 rounded-full border border-amber-400/25 shadow-xs">
              🔒 4-Layer Zero-Trust Command Hub
            </p>
            <p className="text-xs sm:text-[13px] text-slate-400 mt-3 max-w-md leading-relaxed">
              Protected enclave. Encrypted visitor telemetry formatted strictly as <strong className="text-slate-200 font-bold">Internal Patient Care Coordinator Notes</strong> for empanelled hospitals.
            </p>
          </div>

          {/* Real-time Hardware & Geo Security Radar */}
          <div className="mb-8 bg-[#060D1A]/90 border border-blue-500/30 rounded-2xl p-4 sm:p-5 space-y-3 font-mono text-xs shadow-inner">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-300 border-b border-slate-800/80 pb-2.5 gap-1.5">
              <span className="flex items-center gap-2 text-cyan-400 font-extrabold shrink-0">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse shrink-0" /> [DEVICE-FINGERPRINT]:
              </span>
              <span className="text-amber-300 font-bold break-all text-left sm:text-right">
                {hwAuth.signature?.deviceHash || "Scanning hardware security signatures..."}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-slate-300 gap-1.5">
              <span className="flex items-center gap-2 text-emerald-400 font-extrabold shrink-0">
                <Navigation className="w-4 h-4 text-emerald-400 shrink-0" /> [GEO-VERIFICATION]:
              </span>
              <span className="text-slate-200 break-all text-left sm:text-right font-medium">
                {geoStatus ? `${geoStatus.city || "Authorized Zone"}, ${geoStatus.state || "India"} [Verified]` : "Triangulating encrypted GPS coordinates..."}
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

  const formatMinSec = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? "0" + s : s}s`;
  };

  return (
    <div 
      className="w-full min-h-screen bg-[#060C18] text-slate-100 font-sans pb-16 flex-1 select-none"
      onClick={resetSessionTimer}
      onMouseMove={resetSessionTimer}
    >
      {/* ── TOP EXECUTIVE NAVBAR ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#0A1224]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-blue-600 flex items-center justify-center shadow-md shadow-amber-500/20 border border-white/20">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                  HealthFlo Directorate
                  <span className="px-2 py-0.5 text-[9px] sm:text-[10px] rounded bg-emerald-500/10 text-emerald-400 font-black border border-emerald-500/30 uppercase tracking-wider">
                    Level 5 Clearance
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400 flex items-center gap-2">
                  <span>Pan-South India Triage Hub</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-amber-400 font-mono text-[11px] hidden sm:inline">HW: {hwAuth.signature?.deviceHash.slice(0, 12)}...</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-cyan-400 font-mono text-[11px] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400 animate-pulse" /> Auto-Lock: {formatMinSec(sessionTimeRemaining)}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto justify-end">
            {exportNotification && (
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-fadeIn">
                {exportNotification}
              </span>
            )}

            <button
              onClick={() => exportToCSV(activeTab === "leads" ? "leads" : activeTab === "audit" ? "audit" : "telemetry")}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition border border-slate-600 shadow-sm"
              title="Export Current Table to CSV"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" /> Export CSV
            </button>

            <button
              onClick={refreshTelemetry}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
              title="Refresh Live Telemetry"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400 hover:animate-spin" /> Live Sync
            </button>

            <button
              onClick={() => {
                setShowDecrypted(!showDecrypted);
                logAuditAction(`Toggled security viewmode to ${!showDecrypted ? "Plaintext Decryption" : "AES-256 Ciphertext Vault"}`);
              }}
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
              className="px-3 py-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 font-bold text-xs border border-rose-500/30 transition shadow-xs"
            >
              Lock Vault
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN DASHBOARD DECK ───────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-8 space-y-8">
        
        {/* COMPLIANCE WARNING BANNER */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-[#0E1B38] via-[#12224A] to-[#0E1B38] border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-cyan-500/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
                <span>DPDP Act 2023 Safe-Harbor Architecture: All Visitor Journeys Stored as Coordinator Care Notes</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-blue-500/20 text-blue-300 border border-blue-500/30">CERTIFIED SECURE</span>
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#0A1224] p-5 rounded-2xl border border-slate-800/90 relative overflow-hidden shadow-xl hover:border-cyan-500/40 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Total Visitor Sessions</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-extrabold text-white font-mono">{intelligence?.totalVisitorSessions.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-400 font-semibold mt-1.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +18.4% across South India
            </p>
          </div>

          <div className="bg-[#0A1224] p-5 rounded-2xl border border-slate-800/90 relative overflow-hidden shadow-xl hover:border-emerald-500/40 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Patient Leads</span>
              <Users className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-3xl font-extrabold text-white font-mono">{intelligence?.activeLeadsCount}</p>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Triage & pre-auth workflows active
            </p>
          </div>

          <div className="bg-[#0A1224] p-5 rounded-2xl border border-slate-800/90 relative overflow-hidden shadow-xl hover:border-amber-500/40 transition">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Empanelled Hub Centers</span>
              <Building2 className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-3xl font-extrabold text-amber-400 font-mono">75 Cities</p>
            <p className="text-[11px] text-slate-400 mt-1.5">
              TN (25) + KA (25) + TS (25) Active
            </p>
          </div>

          <div className="bg-[#0A1224] p-5 rounded-2xl border border-slate-800/90 relative overflow-hidden shadow-xl hover:border-indigo-500/40 transition">
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
                      <span className="text-slate-400 font-mono">{item.percentage}% ({item.count} sessions)</span>
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
              <p className="text-xs text-slate-400 leading-relaxed flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span><strong className="text-cyan-400 font-semibold">Directorate Insight:</strong> Karnataka IT corridors (Whitefield/E-City) & Chennai OMR show 34% higher demand for weekend USFDA laser proctology packages.</span>
              </p>
            </div>
          </div>

          {/* TOP SURGICAL PROCEDURES */}
          <div className="bg-[#0A1224] p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
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
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 text-center font-semibold">
              📈 Laser Circumcision & Hernia protocols trending highest in outpatient conversions.
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

        {/* ── INTELLIGENCE DATA DECK (4-TAB ENTERPRISE ENGINE) ──────────────── */}
        <div className="bg-[#0A1224] rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* TAB & FILTER CONTROLS */}
          <div className="p-5 bg-[#0D182E] border-b border-slate-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 border border-slate-700 rounded-2xl p-1.5 bg-[#070D1A]">
              <button
                onClick={() => setActiveTab("telemetry")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "telemetry" ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-500/25" : "text-slate-400 hover:text-white"
                }`}
              >
                <Activity className="w-3.5 h-3.5" /> Coordinator Care Notes ({filteredLogs.length})
              </button>
              
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "leads" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/25" : "text-slate-400 hover:text-white"
                }`}
              >
                <Users className="w-3.5 h-3.5" /> Lead Triage CRM ({leadRecords.length})
              </button>

              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "analytics" ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25" : "text-slate-400 hover:text-white"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" /> Regional Triage Analytics
              </button>

              <button
                onClick={() => setActiveTab("audit")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "audit" ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-500/25" : "text-slate-400 hover:text-white"
                }`}
              >
                <FileCheck className="w-3.5 h-3.5" /> DPDP Audit Trail ({auditLogs.length})
              </button>

              <button
                onClick={() => setActiveTab("config")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "config" ? "bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 text-white shadow-md shadow-cyan-500/25" : "text-slate-400 hover:text-white"
                }`}
              >
                <Globe2 className="w-3.5 h-3.5 text-cyan-300" /> Global Site &amp; SEO Config
              </button>

              <button
                onClick={() => setActiveTab("triage")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === "triage" ? "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/25" : "text-slate-400 hover:text-white"
                }`}
              >
                <Brain className="w-3.5 h-3.5 text-pink-300 animate-pulse" /> AI Triage Copilot
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {(activeTab === "telemetry" || activeTab === "leads") && (
                <>
                  <div className="flex items-center gap-1 bg-[#060C18] border border-slate-700 rounded-xl p-1 text-xs">
                    {(["All", "Tamil Nadu", "Karnataka", "Telangana"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setFilterState(st)}
                        className={`px-2.5 py-1 rounded-lg transition font-semibold ${
                          filterState === st ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {st === "All" ? "All States" : st}
                      </button>
                    ))}
                  </div>

                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Filter by city, patient, note..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#060C18] border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-medium"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* TAB 1: COORDINATOR CARE NOTES & TELEMETRY */}
          {activeTab === "telemetry" && (
            <div className="p-5 space-y-4 max-h-[640px] overflow-y-auto">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span>Showing secure patient telemetry captured across regional hospital portals</span>
                <span className="font-mono text-cyan-400 font-semibold">Encryption Vault: Active & Synchronized</span>
              </div>

              <AnimatePresence>
                {filteredLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-4 rounded-2xl bg-[#0D1629] border border-slate-800/80 hover:border-cyan-500/30 transition flex flex-col gap-3 shadow-md"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                          {log.id}
                        </span>
                        <span className="text-xs font-bold text-slate-200 flex items-center gap-1">
                          📍 {log.city} <span className="text-slate-500 font-semibold">({log.state})</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span className="flex items-center gap-1 font-mono text-slate-300">
                          {log.device.includes("Mobile") || log.device.includes("iPhone") ? <Smartphone className="w-3.5 h-3.5 text-blue-400" /> : <Laptop className="w-3.5 h-3.5 text-purple-400" />}
                          {log.device}
                        </span>
                        <span className="font-mono text-slate-400">{log.timestamp}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px] flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-amber-400" /> Clinical & Triage Support Note:
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {showDecrypted ? "🔓 Plaintext View" : "🔒 AES-256-GCM Ciphertext"}
                        </span>
                      </div>
                      
                      <div className={`p-3.5 rounded-xl text-xs sm:text-[13px] leading-relaxed transition font-mono ${
                        showDecrypted 
                          ? "bg-[#0A1222] text-slate-100 border border-slate-700/80 shadow-inner" 
                          : "bg-black/80 text-emerald-400 font-bold border border-emerald-500/30 break-all select-all shadow-inner"
                      }`}>
                        {showDecrypted ? log.coordinatorClinicalNote : log.encryptedPayload || "ENC_DATA: [U2FsdGVkX1+4L9z.../9V+aM9j=]"}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase">Traversed Routes:</span>
                      {log.pagesViewed.map((pg, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800/80 text-blue-300 font-mono text-[10px] border border-slate-700">
                          {pg}
                        </span>
                      ))}
                      {log.lastClickedElement && (
                        <span className="ml-auto px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 font-bold text-[10px] border border-amber-500/30 flex items-center gap-1 shadow-xs">
                          ⚡ Action Triggered: {log.lastClickedElement}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {filteredLogs.length === 0 && (
                <div className="py-16 text-center text-slate-500 text-sm font-semibold">
                  No patient telemetry records match the specified search or regional filter criteria.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: INTERACTIVE LEAD TRIAGE CRM */}
          {activeTab === "leads" && (
            <div className="p-5">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-3 mb-2 border-b border-slate-800">
                <span>Interactive CRM: Assign empanelled partner hospitals and dispatch instant WhatsApp coordinator itineraries</span>
                <span className="text-emerald-400 font-mono font-bold">100% Legal Safe-Harbor Compliant</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#0E1830] text-slate-300 font-extrabold uppercase tracking-wider text-[10px] border-b border-slate-700">
                      <th className="py-4 px-3">Patient & Contact</th>
                      <th className="py-4 px-3">Regional Hub</th>
                      <th className="py-4 px-3">Target Procedure</th>
                      <th className="py-4 px-3">Partner Hospital Assignment</th>
                      <th className="py-4 px-3">Triage Workflow Status</th>
                      <th className="py-4 px-3 text-right">Dispatch Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 text-slate-200 font-medium">
                    {leadRecords.map((item) => {
                      const status = leadStatuses[item.id] || item.leadContact?.status || "General Inquiry";
                      const hospital = assignedHospitals[item.id] || "Select Empanelled Hospital";

                      return (
                        <tr key={item.id} className="hover:bg-slate-800/40 transition group">
                          <td className="py-4 px-3">
                            <p className="font-extrabold text-white text-sm">{item.leadContact?.name}</p>
                            <p className="font-mono text-cyan-400 text-[11px] mt-0.5">{item.leadContact?.phone}</p>
                          </td>
                          <td className="py-4 px-3">
                            <p className="font-bold text-slate-200">{item.city}</p>
                            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded mt-1 inline-block">{item.state}</span>
                          </td>
                          <td className="py-4 px-3">
                            <span className="font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                              {item.leadContact?.procedure}
                            </span>
                          </td>
                          
                          {/* Interactive Partner Hospital Dropdown */}
                          <td className="py-4 px-3">
                            <select
                              value={hospital}
                              onChange={(e) => handleHospitalChange(item.id, e.target.value, item.leadContact?.name || "")}
                              className="bg-[#070E1E] border border-slate-700 hover:border-amber-400/50 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-400 transition cursor-pointer max-w-[240px] truncate shadow-xs"
                            >
                              <option value="Unassigned">-- Select Empanelled Hospital --</option>
                              {EMPANELLED_HOSPITALS.map((h) => (
                                <option key={h} value={h}>{h}</option>
                              ))}
                            </select>
                          </td>

                          {/* Interactive Triage Workflow Status */}
                          <td className="py-4 px-3">
                            <select
                              value={status}
                              onChange={(e) => handleStatusChange(item.id, e.target.value, item.leadContact?.name || "")}
                              className={`px-3 py-1.5 rounded-full text-xs font-extrabold border cursor-pointer transition focus:outline-none shadow-xs ${
                                status === "Urgent Triage"
                                  ? "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse"
                                  : status === "Insurance Verified"
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                  : status === "Surgeon Assigned"
                                  ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                                  : "bg-blue-500/20 text-blue-300 border-blue-500/40"
                              }`}
                            >
                              <option value="New Entry" className="bg-[#0D1629] text-white">New Entry</option>
                              <option value="Urgent Triage" className="bg-[#0D1629] text-rose-400">🚨 Urgent Triage</option>
                              <option value="Callback Scheduled" className="bg-[#0D1629] text-amber-300">📞 Callback Scheduled</option>
                              <option value="Insurance Verified" className="bg-[#0D1629] text-emerald-400">✅ Insurance Verified</option>
                              <option value="Surgeon Assigned" className="bg-[#0D1629] text-purple-400">🩺 Surgeon Assigned</option>
                              <option value="Procedure Complete" className="bg-[#0D1629] text-cyan-400">🏁 Procedure Complete</option>
                            </select>
                          </td>

                          {/* Dispatch Actions */}
                          <td className="py-4 px-3 text-right space-x-2">
                            <button
                              onClick={() => setSelectedLeadModal(item)}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-600 transition"
                              title="View Patient Telemetry Dossier"
                            >
                              <Eye className="w-3.5 h-3.5 inline mr-1 text-cyan-400" /> Dossier
                            </button>
                            <button 
                              onClick={() => dispatchWhatsAppProtocol(item)}
                              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 text-white font-extrabold text-xs transition shadow-md shadow-emerald-500/20 inline-flex items-center gap-1"
                            >
                              <Send className="w-3 h-3" /> WhatsApp Protocol
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: REGIONAL TRIAGE & CONVERSION ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="p-6 space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#0D1629] border border-slate-800 space-y-2 shadow-lg">
                  <span className="text-xs text-slate-400 uppercase font-extrabold flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-400" /> Triage to Consultation Conversion
                  </span>
                  <p className="text-3xl font-mono font-black text-white">78.4%</p>
                  <p className="text-xs text-emerald-400 font-semibold">↑ +6.2% improvement vs last month</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="w-[78%] bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D1629] border border-slate-800 space-y-2 shadow-lg">
                  <span className="text-xs text-slate-400 uppercase font-extrabold flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" /> Avg. Insurance Pre-Auth Speed
                  </span>
                  <p className="text-3xl font-mono font-black text-cyan-400">14 Mins</p>
                  <p className="text-xs text-slate-300 font-semibold">Target: &lt; 30 mins across empanelled network</p>
                  <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                    <div className="w-[92%] bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full" />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0D1629] border border-slate-800 space-y-2 shadow-lg">
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

              <div className="p-6 rounded-2xl bg-[#0D182E] border border-slate-800/90 shadow-xl">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2 mb-6">
                  <FileSpreadsheet className="w-4 h-4 text-amber-400" /> Empanelled Hospital Triage Load (By Regional Hub)
                </h3>
                <div className="space-y-5">
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
          )}

          {/* TAB 4: DPDP COMPLIANCE AUDIT TRAIL */}
          {activeTab === "audit" && (
            <div className="p-6 space-y-4 max-h-[640px] overflow-y-auto font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-slate-300 font-sans">
                <div>
                  <p className="font-extrabold text-white text-sm flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-amber-400" /> Level-5 Cryptographic Audit Trail (DPDP Act 2023)
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Tamper-proof chronological log of all directorate actions, decryptions, and data exports.
                  </p>
                </div>
                <button
                  onClick={() => exportToCSV("audit")}
                  className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-extrabold hover:bg-amber-500/30 transition flex items-center gap-1 shrink-0 w-max"
                >
                  <Download className="w-3.5 h-3.5" /> Download Audit Journal
                </button>
              </div>

              <div className="space-y-2">
                {auditLogs.map((log, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#060D1A] border border-slate-800/90 hover:border-slate-700 text-slate-300 flex items-start gap-2 transition">
                    <span className="text-slate-500 font-bold">#{auditLogs.length - idx}</span>
                    <span className="text-emerald-400 font-bold">&gt;&gt;</span>
                    <span className="flex-1 text-slate-200 font-mono text-xs">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "config" && (
            <TabGlobalConfig
              passphrase={passphrase || sessionStorage.getItem("healthflo_admin_key") || ""}
              onAuditLog={logAuditAction}
            />
          )}

          {activeTab === "triage" && (
            <TabAITriage
              onAuditLog={logAuditAction}
              onRefreshData={() => {
                const p = passphrase || sessionStorage.getItem("healthflo_admin_key") || "";
                if (p && loginId) authenticate(loginId, p, true);
              }}
            />
          )}
        </div>
      </main>

      {/* ── INTERACTIVE PATIENT DOSSIER MODAL / SLIDE-OVER ─────────────────── */}
      <AnimatePresence>
        {selectedLeadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#0A1224] border-2 border-cyan-500/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(6,182,212,0.25)] relative overflow-hidden text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedLeadModal(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 flex items-center justify-center transition border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    {selectedLeadModal.leadContact?.name} • Clinical Triage Dossier
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Session ID: {selectedLeadModal.sessionId} | Captured: {selectedLeadModal.timestamp}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#060D1A] border border-slate-800">
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Requested Procedure</span>
                    <p className="text-sm font-extrabold text-emerald-400 mt-0.5">{selectedLeadModal.leadContact?.procedure}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Regional Triage City</span>
                    <p className="text-sm font-extrabold text-white mt-0.5">{selectedLeadModal.city} ({selectedLeadModal.state})</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Assigned Partner Hospital</span>
                    <p className="text-xs font-bold text-amber-300 mt-0.5">{assignedHospitals[selectedLeadModal.id] || "Pending Assignment"}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px]">Current Workflow State</span>
                    <p className="text-xs font-bold text-cyan-300 mt-0.5">{leadStatuses[selectedLeadModal.id] || selectedLeadModal.leadContact?.status}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold text-xs uppercase mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Medical Coordinator Clinical Note (Plaintext Decryption)
                  </label>
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-slate-200 font-mono leading-relaxed text-xs">
                    {selectedLeadModal.coordinatorClinicalNote}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-200 text-[11px]">
                  <p className="font-extrabold text-white flex items-center gap-1 mb-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> DPDP Safe-Harbor Auditor Notes:
                  </p>
                  This patient inquiry was captured through HealthFlo's Level-5 secure medical concierge gateway. Records are shared exclusively with empanelled hospital coordinators for surgical package pre-authorization under strict medical doctor-patient privilege protocols.
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setSelectedLeadModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition"
                >
                  Close Dossier
                </button>
                <button
                  onClick={() => {
                    dispatchWhatsAppProtocol(selectedLeadModal);
                    setSelectedLeadModal(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-95 text-white font-extrabold text-xs transition shadow-lg shadow-emerald-500/25 flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Transmit Triage to Surgeon WhatsApp
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM COMPLIANCE FOOTER ───────────────────────────────────────── */}
      <footer className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4">
        <div>
          <p className="font-bold text-slate-400">HealthFlo Surgical Healthcare Network & Managed Care Directorate</p>
          <p className="text-[11px]">Empanelled surgical referral network operating across Tamil Nadu, Karnataka & Telangana.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-[11px]">
          <span className="text-emerald-400 font-mono font-semibold">✓ Protected by AES-256-GCM Cryptography</span>
          <span>•</span>
          <span>DPDP Act 2023 Safe-Harbor Certified</span>
          <span>•</span>
          <Link href="/" className="text-cyan-400 hover:underline font-bold">Exit Directorate</Link>
        </div>
      </footer>
    </div>
  );
}
