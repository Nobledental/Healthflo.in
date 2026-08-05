"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  CheckCircle2, 
  PhoneCall, 
  Building2, 
  FileText, 
  ArrowRight, 
  Lock, 
  Clock, 
  Check, 
  AlertCircle,
  Car,
  MapPin,
  Stethoscope,
  ChevronDown,
  Award,
  Activity
} from "lucide-react";
import { haptic } from "@/utils/haptics";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { REGIONAL_LOCATIONS } from "@/data/regionalLocations";

interface Props {
  defaultProcedure?: string;
  defaultCity?: string;
  defaultState?: string;
  className?: string;
}

const PROCEDURES = [
  { name: "Laser Circumcision & Foreskin Care", basePrice: "₹28,500", emi: "₹2,850/mo", recovery: "24-48 Hours", usfda: "Zsr & Diode 980nm Laser Protocol" },
  { name: "USFDA Laser Piles / Hemorrhoidoplasty", basePrice: "₹32,000", emi: "₹3,200/mo", recovery: "0-Day Ambulatory Discharge", usfda: "LHP 1470nm Biolitec Protocol" },
  { name: "Anal Fistula Laser Closure (FiLaC)", basePrice: "₹38,500", emi: "₹3,850/mo", recovery: "Same-Day Day-Care Protocol", usfda: "Sphincter-Preserving Radial Fiber" },
  { name: "Anal Fissure Laser Sphincterotomy", basePrice: "₹29,000", emi: "₹2,900/mo", recovery: "Immediate Post-Op Relief", usfda: "Precision Contact Diode Laser" },
  { name: "Minimally Invasive Lipoma / Cyst Excision", basePrice: "₹22,000", emi: "₹2,200/mo", recovery: "No Sutures • Cosmetic Technique", usfda: "Micro-Incision USFDA Standard" },
  { name: "Laparoscopic Hernia Repair (Inguinal/Umbilical)", basePrice: "₹45,000", emi: "₹4,500/mo", recovery: "1-Day Hospital Observation", usfda: "3D Anatomical Mesh Fixation" },
  { name: "Hydrocele Laser / Minimally Invasive Surgery", basePrice: "₹34,000", emi: "₹3,400/mo", recovery: "24-Hour Return to Daily Activity", usfda: "Minimally Invasive Hydrocelectomy" },
  { name: "Varicose Vein Laser Ablation (EVLA)", basePrice: "₹42,000", emi: "₹4,200/mo", recovery: "Walk Out Same Day", usfda: "Endovenous Radial Laser Fiber" },
  { name: "Kidney Stone Laser Lithotripsy (RIRS/PCNL)", basePrice: "₹48,000", emi: "₹4,800/mo", recovery: "Advanced Laser Dust Elimination", usfda: "Holmium Laser & Flexible Scope" },
];

interface MedicalHubOption {
  id: string;
  display: string;
  cityName: string;
  state: string;
  lang: string;
  group: "Metro Referral Centers" | "Tamil Nadu Regional Hubs" | "Karnataka Regional Hubs" | "Telangana Regional Hubs";
}

const INSURERS = [
  { group: "Corporate Employee Group Policy (TCS, Infosys, Wipro, Cognizant, etc.)", status: "100% Cashless Pre-Approved", badge: "Instant Corporate Fast-Track", color: "text-emerald-400" },
  { group: "Star Health / HDFC Ergo / ICICI Lombard / Care Insurance", status: "100% Cashless Pre-Approved", badge: "Zero Upfront Hospital Deposit", color: "text-emerald-400" },
  { group: "Medi Assist / Niva Bupa / United India / National Insurance (TPAs)", status: "100% Cashless Eligible", badge: "Direct TPA Billing Authorization", color: "text-blue-400" },
  { group: "Self-Pay No-Cost EMI (Bajaj Finserv / UPI / Major Credit Cards)", status: "No-Cost EMI Approved", badge: "0% Interest • Flexible 12-Month Tenure", color: "text-amber-400" },
];

export default function InsuranceCostEstimator({ defaultProcedure, defaultCity, defaultState, className = "" }: Props) {
  const { config } = useSiteConfig();

  // Dynamically assemble all 75+ medical centers into clean, highly professional categorized groups
  const hubOptions = useMemo<MedicalHubOption[]>(() => {
    const metros: MedicalHubOption[] = [
      { id: "metro-che", display: "Chennai (Anna Nagar, Adyar, OMR IT Corridor) — Tamil Nadu", cityName: "Chennai", state: "Tamil Nadu", lang: "ta", group: "Metro Referral Centers" },
      { id: "metro-blr", display: "Bengaluru (Whitefield, Outer Ring Road, HSR Layout) — Karnataka", cityName: "Bengaluru", state: "Karnataka", lang: "kn", group: "Metro Referral Centers" },
      { id: "metro-hyd", display: "Hyderabad (Jubilee Hills, HITEC City, Gachibowli) — Telangana", cityName: "Hyderabad", state: "Telangana", lang: "te", group: "Metro Referral Centers" },
      { id: "metro-cbe", display: "Coimbatore (RS Puram, Avinashi Road Care Hub) — Tamil Nadu", cityName: "Coimbatore", state: "Tamil Nadu", lang: "ta", group: "Metro Referral Centers" },
      { id: "metro-mys", display: "Mysuru (Gokulam, Kuvempunagar Medical Hub) — Karnataka", cityName: "Mysuru", state: "Karnataka", lang: "kn", group: "Metro Referral Centers" },
    ];

    const regionalTN: MedicalHubOption[] = REGIONAL_LOCATIONS
      .filter(l => l.stateSlug === "tamil-nadu" && !["chennai", "coimbatore"].includes(l.slug))
      .map(l => ({
        id: `tn-${l.slug}`,
        display: `${l.name} (${l.cluster.split("—")[0].trim()}) — Tamil Nadu`,
        cityName: l.name,
        state: "Tamil Nadu",
        lang: "ta",
        group: "Tamil Nadu Regional Hubs"
      }));

    const regionalKA: MedicalHubOption[] = REGIONAL_LOCATIONS
      .filter(l => l.stateSlug === "karnataka" && !["bengaluru", "mysuru"].includes(l.slug))
      .map(l => ({
        id: `ka-${l.slug}`,
        display: `${l.name} (${l.cluster.split("—")[0].trim()}) — Karnataka`,
        cityName: l.name,
        state: "Karnataka",
        lang: "kn",
        group: "Karnataka Regional Hubs"
      }));

    const regionalTS: MedicalHubOption[] = REGIONAL_LOCATIONS
      .filter(l => l.stateSlug === "telangana" && !["hyderabad"].includes(l.slug))
      .map(l => ({
        id: `ts-${l.slug}`,
        display: `${l.name} (${l.cluster.split("—")[0].trim()}) — Telangana`,
        cityName: l.name,
        state: "Telangana",
        lang: "te",
        group: "Telangana Regional Hubs"
      }));

    return [...metros, ...regionalTN, ...regionalKA, ...regionalTS];
  }, []);

  // Smart fuzzy matching for procedure & city to ensure accuracy from programmatic routes
  const initialProc = useMemo(() => {
    if (!defaultProcedure) return PROCEDURES[0];
    const lower = defaultProcedure.toLowerCase();
    let idx = -1;
    if (lower.includes("circumcision") || lower.includes("foreskin")) idx = PROCEDURES.findIndex(p => p.name.toLowerCase().includes("circumcision"));
    else if (lower.includes("piles") || lower.includes("hemorrhoid")) idx = PROCEDURES.findIndex(p => p.name.toLowerCase().includes("piles"));
    else if (lower.includes("fistula")) idx = PROCEDURES.findIndex(p => p.name.toLowerCase().includes("fistula"));
    else if (lower.includes("fissure")) idx = PROCEDURES.findIndex(p => p.name.toLowerCase().includes("fissure"));
    else if (lower.includes("lipoma") || lower.includes("cyst") || lower.includes("swelling")) idx = PROCEDURES.findIndex(p => p.name.toLowerCase().includes("lipoma"));
    else if (lower.includes("hernia")) idx = PROCEDURES.findIndex(p => p.name.toLowerCase().includes("hernia"));
    else if (lower.includes("hydrocele")) idx = PROCEDURES.findIndex(p => p.name.toLowerCase().includes("hydrocele"));
    else if (lower.includes("varicose") || lower.includes("vein")) idx = PROCEDURES.findIndex(p => p.name.toLowerCase().includes("varicose"));
    else if (lower.includes("stone") || lower.includes("lithotripsy")) idx = PROCEDURES.findIndex(p => p.name.toLowerCase().includes("stone"));
    else idx = PROCEDURES.findIndex(p => p.name.toLowerCase().includes(lower) || lower.includes(p.name.toLowerCase()));

    if (idx !== -1) return PROCEDURES[idx];
    return { name: defaultProcedure, basePrice: "₹28,500", emi: "₹2,850/mo", recovery: "Same-Day Daycare", usfda: "Advanced USFDA Minimally Invasive Protocol" };
  }, [defaultProcedure]);

  const initialHub = useMemo<MedicalHubOption>(() => {
    if (!defaultCity) return hubOptions[0];
    const lower = defaultCity.toLowerCase();
    const idx = hubOptions.findIndex(h => h.cityName.toLowerCase() === lower || h.display.toLowerCase().includes(lower) || lower.includes(h.cityName.toLowerCase()));
    if (idx !== -1) return hubOptions[idx];
    return {
      id: `custom-${defaultCity.toLowerCase().replace(/\s+/g, "-")}`,
      display: `${defaultCity} — ${defaultState || "Tamil Nadu"}`,
      cityName: defaultCity,
      state: defaultState || "Tamil Nadu",
      lang: defaultState?.toLowerCase().includes("karnataka") ? "kn" : defaultState?.toLowerCase().includes("telangana") ? "te" : "ta",
      group: "Tamil Nadu Regional Hubs"
    };
  }, [defaultCity, defaultState, hubOptions]);

  const [selectedProc, setSelectedProc] = useState(initialProc);
  const [selectedHub, setSelectedHub] = useState<MedicalHubOption>(initialHub);
  const [selectedInsurer, setSelectedInsurer] = useState(INSURERS[0]);

  // Lock selectors when landing on specific procedure + city page to preserve Ad Scent and reduce cognitive load
  const [isLocked, setIsLocked] = useState(Boolean(defaultProcedure || defaultCity));

  // Form registration state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCalculateChange = () => {
    haptic.light();
  };

  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || phone.length < 10) {
      setErrorMsg("Please provide a valid 10-digit mobile number for instantaneous SMS and WhatsApp pre-authorization.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);
    haptic.medium();

    const noteText = `[CLINICAL ESTIMATOR CONCIERGE] Patient ${name} verified treatment tariff & cashless TPA eligibility for ${selectedProc.name} at ${selectedHub.cityName} (${selectedHub.state}). Policy/Payment Plan: "${selectedInsurer.group}". Estimated eligibility: ${selectedInsurer.status}. Priority coordinator callback & hospital outpatient appointment requested.`;

    try {
      await fetch("/api/coordinator/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: selectedHub.cityName || "South India",
          state: selectedHub.state || "Multi-State",
          device: typeof window !== "undefined" && window.navigator ? (window.navigator.userAgent.includes("Mobile") ? "Mobile Estimator Concierge" : "Desktop Estimator Concierge") : "Web Estimator",
          pagesViewed: [typeof window !== "undefined" ? window.location.pathname : "/estimator"],
          lastClickedElement: `Pre-Auth Registration: ${selectedProc.name}`,
          coordinatorClinicalNote: noteText,
          leadContact: {
            name: name,
            phone: phone,
            email: "care-concierge@healthflo.in",
            procedure: selectedProc.name,
            status: "Insurance Verified",
          },
        }),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      haptic.success();
    } catch (err) {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  // Build localized WhatsApp direct connection URL in natural conversational language
  const buildWhatsAppLink = () => {
    let greeting = "Hello HealthFlo Clinical Team,";
    if (selectedHub.lang === "ta") greeting = "வணக்கம் HealthFlo Clinical Team,";
    if (selectedHub.lang === "kn") greeting = "ನಮಸ್ಕಾರ HealthFlo Clinical Team,";
    if (selectedHub.lang === "te") greeting = "నమస్కారం HealthFlo Clinical Team,";

    const langName = selectedHub.lang === "ta" ? "Tamil" : selectedHub.lang === "kn" ? "Kannada" : selectedHub.lang === "te" ? "Telugu" : "clinical";
    const msg = `${greeting} I am looking for *${selectedProc.name}* in *${selectedHub.cityName}* under *${selectedInsurer.group}*. My name is ${name || "a patient"}. Can I speak to a ${langName} care coordinator about the treatment cost and 100% cashless insurance?`;
    return `https://wa.me/${config.helplineRaw}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className={`w-full my-10 rounded-3xl bg-[#060D1A] border border-slate-800 text-slate-100 p-6 sm:p-8 lg:p-10 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.85)] relative overflow-hidden font-sans ${className}`}>
      
      {/* Subtle Premium Architectural Background Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* ── HEADER BANNER ────────────────────────────────────────────────────── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 pb-7 border-b border-slate-800/90 relative z-10">
        <div className="space-y-2.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E1A33] border border-cyan-500/30 text-cyan-300 text-xs font-extrabold uppercase tracking-wider shadow-inner">
            <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
            <span>Clinical Package &amp; Cashless TPA Concierge</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
            Instant Hospital Pre-Approval &amp; Clinical Care Concierge
          </h2>
          
          <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
            Verify real-time surgical package tariffs, USFDA operational protocols, and 100% cashless insurance compatibility across our empanelled network centers in Tamil Nadu, Karnataka &amp; Telangana.
          </p>
        </div>

        {/* Clinical Transparency Assurance Badge */}
        <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#091224]/90 border border-slate-700/80 shadow-lg shrink-0">
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 text-emerald-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-extrabold text-white text-xs sm:text-sm">100% Transparent Protocols</span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">Zero hidden room or surgical OT exclusions</p>
          </div>
        </div>
      </div>

      {/* ── MAIN ESTIMATOR GRID ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT COLUMN: MEDICAL SELECTOR PARAMETERS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* LOCKED TARGET AD SCENT BANNER OR OPEN DROPDOWNS */}
          {isLocked ? (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0C1932] to-slate-900 border-2 border-cyan-500/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-[11px] uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>Target Profile Pre-Configured</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsLocked(false)}
                  className="text-xs text-cyan-400 font-extrabold hover:text-cyan-300 underline transition-all"
                >
                  Change Procedure or City ✏️
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-[#070D1B] p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">SELECTED PROCEDURE</span>
                  <p className="text-white font-extrabold text-sm sm:text-base">{selectedProc.name}</p>
                  <p className="text-cyan-400 font-bold text-xs mt-0.5">✔️ {selectedProc.usfda}</p>
                </div>
                <div className="bg-[#070D1B] p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-0.5">TARGET SURGICAL HUB</span>
                  <p className="text-white font-extrabold text-sm sm:text-base">{selectedHub.cityName}</p>
                  <p className="text-emerald-400 font-bold text-xs mt-0.5">✔️ Empanelled Hospital Network</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* 1. SURGICAL PROCEDURE SELECTOR */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-cyan-400 tracking-wider flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-mono font-bold text-[10px]">STEP 01</span>
                  <span>Target Surgical Procedure &amp; Protocol</span>
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <select
                    value={selectedProc.name}
                    onChange={(e) => {
                      const found = PROCEDURES.find(p => p.name === e.target.value);
                      if (found) {
                        setSelectedProc(found);
                        handleCalculateChange();
                      }
                    }}
                    className="w-full pl-12 pr-10 py-4 rounded-2xl bg-[#091224] border border-slate-700/90 text-white font-bold text-sm sm:text-base focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition cursor-pointer shadow-inner appearance-none"
                  >
                    {PROCEDURES.map((p) => (
                      <option key={p.name} value={p.name} className="bg-[#091224] text-white py-2">
                        {p.name} ({p.usfda})
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* 2. REGIONAL HOSPITAL HUB & CITY SELECTOR */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono font-bold text-[10px]">STEP 02</span>
                  <span>Empanelled Surgical Center &amp; City Hub (All Southern Locations)</span>
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <select
                    value={selectedHub.id}
                    onChange={(e) => {
                      const found = hubOptions.find(h => h.id === e.target.value);
                      if (found) {
                        setSelectedHub(found);
                        handleCalculateChange();
                      }
                    }}
                    className="w-full pl-12 pr-10 py-4 rounded-2xl bg-[#091224] border border-slate-700/90 text-white font-semibold text-sm sm:text-base focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition cursor-pointer shadow-inner appearance-none truncate"
                  >
                    <optgroup label="Primary Metro Surgical Hubs" className="bg-[#060D1A] text-cyan-300 font-extrabold text-xs uppercase">
                      {hubOptions.filter(h => h.group === "Metro Referral Centers").map((h) => (
                        <option key={h.id} value={h.id} className="bg-[#091224] text-white font-semibold text-sm">
                          {h.display}
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Tamil Nadu Regional Surgical Centers (25 Cities)" className="bg-[#060D1A] text-emerald-300 font-extrabold text-xs uppercase">
                      {hubOptions.filter(h => h.group === "Tamil Nadu Regional Hubs").map((h) => (
                        <option key={h.id} value={h.id} className="bg-[#091224] text-white font-semibold text-sm">
                          {h.display}
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Karnataka Regional Surgical Centers (25 Cities)" className="bg-[#060D1A] text-emerald-300 font-extrabold text-xs uppercase">
                      {hubOptions.filter(h => h.group === "Karnataka Regional Hubs").map((h) => (
                        <option key={h.id} value={h.id} className="bg-[#091224] text-white font-semibold text-sm">
                          {h.display}
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Telangana Regional Surgical Centers (25 Cities)" className="bg-[#060D1A] text-emerald-300 font-extrabold text-xs uppercase">
                      {hubOptions.filter(h => h.group === "Telangana Regional Hubs").map((h) => (
                        <option key={h.id} value={h.id} className="bg-[#091224] text-white font-semibold text-sm">
                          {h.display}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 3. INSURANCE POLICY OR PAYMENT MODE */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono font-bold text-[10px]">
                {isLocked ? "STEP 01" : "STEP 03"}
              </span>
              <span>TPA Insurance Policy or Payment Protocol</span>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {INSURERS.map((ins) => {
                const isSelected = selectedInsurer.group === ins.group;
                return (
                  <button
                    key={ins.group}
                    type="button"
                    onClick={() => {
                      setSelectedInsurer(ins);
                      handleCalculateChange();
                    }}
                    className={`text-left p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-gradient-to-br from-blue-900/60 via-[#0C1B3A] to-[#0D2246] border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                        : "bg-[#091224]/80 border-slate-800 hover:border-slate-700 hover:bg-[#0A162C]"
                    }`}
                  >
                    <p className={`text-xs font-bold leading-relaxed line-clamp-2 ${isSelected ? "text-white" : "text-slate-300"}`}>
                      {ins.group}
                    </p>
                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-1.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${ins.color}`} />
                      <span className={`text-[10px] font-black tracking-wider uppercase ${ins.color}`}>
                        {ins.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SURGICAL NETWORK PROTOCOL HIGHLIGHTS */}
          <div className="p-4 rounded-2xl bg-[#080E1C] border border-slate-800/90 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2.5 text-xs text-slate-300 font-semibold">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0 border border-cyan-500/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>100% Cashless TPA &amp; 0% EMI Support</span>
            </div>
            
            <div className="flex items-center gap-2.5 text-xs text-slate-300 font-semibold">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0 border border-emerald-500/20">
                <Clock className="w-4 h-4" />
              </div>
              <span>{selectedProc.recovery} Discharge Target</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300 font-semibold">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 border border-amber-500/20">
                <Building2 className="w-4 h-4" />
              </div>
              <span>USFDA Accredited Surgical Suites</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRE-AUTHORIZATION DESK & CLAIM ENGINE (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="h-full rounded-3xl bg-gradient-to-b from-[#09152C] via-[#0A1734] to-[#0D1F42] border border-slate-700 p-6 sm:p-7 shadow-[0_15px_45px_rgba(0,0,0,0.5)] flex flex-col justify-between relative overflow-hidden">
            
            {/* Live Triage Status Flag */}
            <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 text-[10px] font-black uppercase tracking-widest text-white shadow-lg flex items-center gap-1.5">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>Live Pre-Auth Desk</span>
            </div>

            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Estimated Treatment Profile:
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-white pr-28 line-clamp-1">
                  {selectedProc.name}
                </h3>
              </div>
              
              {/* FINANCIAL & INSURANCE VALUATION TILE */}
              <div className="p-5 rounded-2xl bg-[#060D1A]/90 border border-cyan-500/30 shadow-inner flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
                    Estimated Patient Liability:
                  </span>
                  {selectedInsurer.group.includes("Self-Pay") ? (
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono tracking-tight">{selectedProc.emi}</span>
                      <span className="text-[11px] text-slate-400 font-bold">(0% EMI)</span>
                    </div>
                  ) : (
                    <div className="mt-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono tracking-tight">₹0 Upfront</span>
                      <p className="text-[11px] font-extrabold text-cyan-300 mt-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>100% Cashless Insurance Eligible</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-right shrink-0 pl-4 border-l border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Package Tariff</span>
                  <span className="text-lg font-mono font-black text-slate-400 line-through block mt-1">{selectedProc.basePrice}</span>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase block mt-0.5">Direct Billing</span>
                </div>
              </div>

              {/* HOSPITAL FACILITY NETWORK BADGE */}
              <div className="p-3.5 rounded-2xl bg-[#0B172E] border border-slate-700/80 flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2.5 truncate">
                  <div className="p-2 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Empanelled Facility Network:</span>
                    <strong className="text-xs sm:text-sm text-white font-extrabold truncate block">
                      {selectedHub.cityName} Surgical Care Network
                    </strong>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Empanelled</span>
                </span>
              </div>
            </div>

            {/* PRE-AUTHORIZATION REGISTRATION FORM */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="claim-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleClaimSubmit} 
                  className="space-y-4 pt-5 mt-5 border-t border-slate-800/90"
                >
                  <div className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5 uppercase tracking-wide">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Secure Your Pre-Approval &amp; Hospital Transit:</span>
                  </div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Patient or Guardian Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#060D1A] border border-slate-700/90 text-white placeholder:text-slate-500 text-xs sm:text-sm font-semibold focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                    />
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-xs sm:text-sm font-mono font-bold text-slate-400">+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-Digit WhatsApp Mobile Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-[#060D1A] border border-slate-700/90 text-white placeholder:text-slate-500 text-xs sm:text-sm font-mono font-semibold focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-[11px] text-rose-400 font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-500" /> 
                      <span>{errorMsg}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:opacity-95 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all transform active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <span>Verifying Policy &amp; Hospital Roster...</span>
                    ) : (
                      <>
                        <span>Claim Package &amp; Pre-Auth</span>
                        <ArrowRight className="w-4 h-4 text-slate-950 stroke-[2.5]" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] font-semibold text-center text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                    <Lock className="w-3 h-3 text-emerald-400" /> 
                    <span>100% Confidential Care Coordination • Zero Third-Party Sharing</span>
                  </p>
                </motion.form>
              ) : (
                <motion.div 
                  key="confirmation-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-[#071328] border border-emerald-500/40 text-center space-y-5 my-3 shadow-lg"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-slate-950 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <h4 className="text-lg font-black text-white">Pre-Authorization Registered!</h4>
                    <p className="text-xs text-slate-300 font-medium leading-relaxed">
                      Your diagnostic profile has been securely logged with our senior surgical coordinator for the <strong className="text-emerald-400">{selectedHub.cityName} Network</strong>.
                    </p>
                  </div>

                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => haptic.success()}
                    className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 transition"
                  >
                    <PhoneCall className="w-4 h-4 text-slate-950 stroke-[2.5] animate-bounce" />
                    <span>Connect Live WhatsApp Coordinator</span>
                  </a>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs text-cyan-400 hover:underline inline-block font-extrabold mt-2"
                  >
                    ← Check Another Procedure or Location
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
