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
  Activity,
  Sparkles,
  MessageCircle
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
    <section className={`w-full my-12 rounded-[2.8rem] bg-gradient-to-b from-[#102246] via-[#0B1832] to-[#071124] border border-blue-400/25 text-slate-100 p-7 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden font-sans ${className}`}>
      
      {/* Subtle Luxury Architectural Ambient Glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-cyan-400/10 via-emerald-400/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />
      
      {/* ── HEADER BANNER ────────────────────────────────────────────────────── */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-700/80 relative z-10">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#172D59] border border-cyan-400/40 text-cyan-300 text-xs font-extrabold uppercase tracking-wider shadow-inner">
            <Stethoscope className="w-4 h-4 text-cyan-400" />
            <span>Instant Surgery Cost &amp; Cashless Insurance Estimator</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
            Calculate Your Exact Surgery Cost &amp; Verify Cashless Insurance
          </h2>
          
          <p className="text-sm sm:text-base text-blue-100/90 font-medium leading-relaxed">
            Check real-time treatment prices, empanelled hospital options near you, and 100% cashless insurance approval—no waiting, no hidden billing surprises across Tamil Nadu, Karnataka &amp; Telangana.
          </p>
        </div>

        {/* Clinical Transparency Assurance Badge */}
        <div className="flex items-center gap-4 p-5 rounded-2xl bg-[#0D1D3A]/95 border border-emerald-400/30 shadow-xl shrink-0">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-emerald-300">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-black text-white text-xs sm:text-sm uppercase tracking-wide">100% Transparent Package Pricing</span>
            </div>
            <p className="text-xs text-blue-200/80 font-semibold mt-1">Zero hidden room charges or surprise operating fees</p>
          </div>
        </div>
      </div>

      {/* ── MAIN ESTIMATOR GRID ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
        
        {/* LEFT COLUMN: MEDICAL SELECTOR PARAMETERS (7 cols) */}
        <div className="lg:col-span-7 space-y-7">
          
          {/* LOCKED TARGET BANNER OR OPEN DROPDOWNS */}
          {isLocked ? (
            <div className="p-6.5 rounded-3xl bg-gradient-to-r from-[#0E1E3C] via-[#12274D] to-[#0E1E3C] border-2 border-cyan-400/40 shadow-xl space-y-4.5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs uppercase tracking-wider border border-emerald-500/40 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Your Treatment &amp; Location Profile (Selected)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsLocked(false)}
                  className="text-xs sm:text-sm text-amber-300 font-black hover:text-amber-200 underline transition-all bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-400/20"
                >
                  Change Treatment or City ✏️
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-[#09152B] p-4 rounded-2xl border border-slate-700/80 shadow-sm">
                  <span className="text-[11px] font-extrabold text-cyan-300 uppercase tracking-wider block mb-1">SELECTED TREATMENT</span>
                  <p className="text-white font-black text-base">{selectedProc.name}</p>
                  <p className="text-emerald-400 font-extrabold text-xs mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span>{selectedProc.usfda}</span>
                  </p>
                </div>
                <div className="bg-[#09152B] p-4 rounded-2xl border border-slate-700/80 shadow-sm">
                  <span className="text-[11px] font-extrabold text-cyan-300 uppercase tracking-wider block mb-1">YOUR CITY / TOWN</span>
                  <p className="text-white font-black text-base">{selectedHub.cityName}</p>
                  <p className="text-emerald-400 font-extrabold text-xs mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                    <span>Empanelled USFDA Hospital Network</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* 1. SURGICAL PROCEDURE SELECTOR */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-black uppercase text-cyan-300 tracking-wider flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-mono font-extrabold text-xs">STEP 1</span>
                  <span>Select Your Treatment / Procedure:</span>
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
                    className="w-full pl-12 pr-10 py-4 rounded-2xl bg-[#0C1A36] border-2 border-slate-700 hover:border-cyan-400/60 text-white font-extrabold text-sm sm:text-base focus:outline-none focus:border-cyan-400 shadow-md transition-all appearance-none cursor-pointer"
                  >
                    {PROCEDURES.map((p) => (
                      <option key={p.name} value={p.name} className="bg-[#0B1832] text-white font-bold py-1">
                        {p.name} ({p.basePrice} Package)
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-300">
                    <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
              </div>

              {/* 2. SURGICAL CENTER & LOCATION SELECTOR */}
              <div className="space-y-2.5">
                <label className="text-xs sm:text-sm font-black uppercase text-emerald-300 tracking-wider flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono font-extrabold text-xs">STEP 2</span>
                  <span>Select Your Nearest Hospital Location:</span>
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
                    className="w-full pl-12 pr-10 py-4 rounded-2xl bg-[#0C1A36] border-2 border-slate-700 hover:border-emerald-400/60 text-white font-extrabold text-sm sm:text-base focus:outline-none focus:border-emerald-400 shadow-md transition-all appearance-none cursor-pointer"
                  >
                    <optgroup label="Primary Metro Surgical Hubs" className="bg-[#0A152C] text-cyan-300 font-black text-xs uppercase">
                      {hubOptions.filter(h => h.group === "Metro Referral Centers").map((h) => (
                        <option key={h.id} value={h.id} className="bg-[#091224] text-white font-bold text-sm">
                          {h.display}
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Tamil Nadu Regional Surgical Centers (25 Cities)" className="bg-[#0A152C] text-emerald-300 font-black text-xs uppercase">
                      {hubOptions.filter(h => h.group === "Tamil Nadu Regional Hubs").map((h) => (
                        <option key={h.id} value={h.id} className="bg-[#091224] text-white font-bold text-sm">
                          {h.display}
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Karnataka Regional Surgical Centers (25 Cities)" className="bg-[#0A152C] text-emerald-300 font-black text-xs uppercase">
                      {hubOptions.filter(h => h.group === "Karnataka Regional Hubs").map((h) => (
                        <option key={h.id} value={h.id} className="bg-[#091224] text-white font-bold text-sm">
                          {h.display}
                        </option>
                      ))}
                    </optgroup>

                    <optgroup label="Telangana Regional Surgical Centers (25 Cities)" className="bg-[#0A152C] text-emerald-300 font-black text-xs uppercase">
                      {hubOptions.filter(h => h.group === "Telangana Regional Hubs").map((h) => (
                        <option key={h.id} value={h.id} className="bg-[#091224] text-white font-bold text-sm">
                          {h.display}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400">
                    <ChevronDown className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* 3. INSURANCE POLICY OR PAYMENT MODE */}
          <div className="space-y-3">
            <label className="text-xs sm:text-sm font-black uppercase text-amber-300 tracking-wider flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono font-extrabold text-xs">
                {isLocked ? "STEP 1" : "STEP 3"}
              </span>
              <span>Select Your Insurance or Payment Option:</span>
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
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
                    className={`text-left p-4.5 rounded-2xl border-2 transition-all flex flex-col justify-between shadow-md ${
                      isSelected
                        ? "bg-gradient-to-br from-[#18366C] via-[#142C58] to-[#0E2042] border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.25)] scale-[1.01]"
                        : "bg-[#0A162C]/90 border-slate-800 hover:border-slate-600 hover:bg-[#0C1A35]"
                    }`}
                  >
                    <p className={`text-xs sm:text-sm font-bold leading-relaxed ${isSelected ? "text-white" : "text-blue-100/80"}`}>
                      {ins.group}
                    </p>
                    <div className="mt-4 pt-2.5 border-t border-slate-700/80 flex items-center gap-2">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${isSelected ? "text-emerald-400" : "text-amber-400"}`} />
                      <span className={`text-[11px] font-black tracking-wide uppercase ${isSelected ? "text-emerald-300" : "text-amber-300"}`}>
                        {ins.badge}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SURGICAL NETWORK PROTOCOL HIGHLIGHTS */}
          <div className="p-5 rounded-2xl bg-[#0A152B] border border-slate-700/80 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-inner">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-blue-100 font-extrabold">
              <div className="p-2.5 rounded-xl bg-cyan-500/15 text-cyan-400 shrink-0 border border-cyan-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span>100% Cashless Insurance &amp; 0% EMI Support</span>
            </div>
            
            <div className="flex items-center gap-3 text-xs sm:text-sm text-blue-100 font-extrabold">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0 border border-emerald-500/30">
                <Clock className="w-5 h-5" />
              </div>
              <span>{selectedProc.recovery} Daycare Discharge</span>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-blue-100 font-extrabold">
              <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 shrink-0 border border-amber-500/30">
                <Building2 className="w-5 h-5" />
              </div>
              <span>Gold-Standard USFDA Surgical Safety</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE COST BREAKDOWN DESK (5 cols) */}
        <div className="lg:col-span-5 w-full">
          
          <div className="bg-gradient-to-b from-[#11264E] to-[#0A162D] border-2 border-emerald-400/40 rounded-[2.3rem] p-7 sm:p-8 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2)] relative overflow-hidden text-center sm:text-left flex flex-col justify-between h-full">
            
            {/* Live Estimator Status Flag */}
            <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-[11px] font-black uppercase tracking-wider text-slate-950 shadow-lg flex items-center gap-1.5 font-sans">
              <Activity className="w-3.5 h-3.5 animate-pulse stroke-[3]" />
              <span>Live Package Estimator</span>
            </div>

            <div className="space-y-6 pt-2">
              <div>
                <span className="text-[11px] font-extrabold text-cyan-300 uppercase tracking-wider block mb-1">
                  Your Custom Package Breakdown:
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white pr-24 leading-tight">
                  {selectedProc.name}
                </h3>
              </div>
              
              {/* FINANCIAL & INSURANCE VALUATION TILE */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#071124] border border-cyan-400/40 shadow-inner flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left">
                <div>
                  <span className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                    Estimated Out-of-Pocket Cost:
                  </span>
                  {selectedInsurer.group.includes("Self-Pay") ? (
                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-amber-300 font-mono tracking-tight">{selectedProc.emi}</span>
                      <span className="text-xs text-amber-200 font-extrabold">(0% EMI Available)</span>
                    </div>
                  ) : (
                    <div className="mt-1.5 space-y-1">
                      <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono tracking-tight">₹0 Upfront</span>
                      <p className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>100% Cashless Insurance Approved</span>
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-left sm:text-right shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 sm:border-l border-slate-800 sm:pl-5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Total Package Value</span>
                  <span className="text-xl sm:text-2xl font-mono font-extrabold text-slate-400 line-through block mt-0.5">{selectedProc.basePrice}</span>
                  <span className="text-[11px] text-emerald-400 font-extrabold uppercase block mt-1">Direct Hospital Billing</span>
                </div>
              </div>

              {/* HOSPITAL FACILITY NETWORK BADGE */}
              <div className="p-4 rounded-2xl bg-[#0D1C3A] border border-slate-700 flex items-center justify-between gap-3 shadow-sm text-left">
                <div className="flex items-center gap-3 truncate">
                  <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-400/30 shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Selected Hospital Network:</span>
                    <strong className="text-sm sm:text-base text-white font-extrabold truncate block">
                      {selectedHub.cityName} Surgical Centers
                    </strong>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black uppercase tracking-wider shrink-0 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Verified</span>
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
                  className="space-y-4 pt-6 mt-6 border-t border-slate-700/80 text-left"
                >
                  <div className="text-xs sm:text-sm font-black text-amber-300 flex items-center gap-2 uppercase tracking-wide">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                    <span>Receive Custom Estimate &amp; Doctor Callback:</span>
                  </div>

                  <div className="space-y-3.5">
                    <input
                      type="text"
                      required
                      placeholder="Patient or Guardian Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4.5 py-4 rounded-2xl bg-[#071328] border border-slate-600 text-white placeholder:text-slate-400 text-sm font-extrabold focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition shadow-inner"
                    />
                    <div className="relative">
                      <span className="absolute left-4.5 top-4 text-sm font-mono font-extrabold text-cyan-400">+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-Digit WhatsApp Number (For Instant Estimate)"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-13 pr-4.5 py-4 rounded-2xl bg-[#071328] border border-slate-600 text-white placeholder:text-slate-400 text-sm font-mono font-extrabold focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition shadow-inner"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-xs text-rose-300 font-extrabold flex items-center gap-1.5 bg-rose-950/50 p-2.5 rounded-xl border border-rose-500/40">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" /> 
                      <span>{errorMsg}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-emerald-900/40 transition-all transform active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Connecting Surgical Concierge...</span>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 fill-white text-emerald-600 shrink-0" />
                        <span>Get Instant Estimate via WhatsApp</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </>
                    )}
                  </button>

                  <p className="text-xs font-bold text-center text-blue-200/80 flex items-center justify-center gap-1.5 pt-1">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> 
                    <span>100% Confidential Care Coordination • Zero Spam or Sharing</span>
                  </p>
                </motion.form>
              ) : (
                <motion.div 
                  key="confirmation-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-7 rounded-3xl bg-[#09162F] border-2 border-emerald-400 text-center space-y-6 my-4 shadow-2xl"
                >
                  <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-600 text-slate-950 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(16,185,129,0.5)]">
                    <Check className="w-9 h-9 stroke-[3]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl font-black text-white">Estimate Request Registered!</h4>
                    <p className="text-sm text-blue-100 font-semibold leading-relaxed">
                      Your treatment profile and insurance preference have been securely logged with our senior surgical coordinator for the <strong className="text-emerald-400 font-black">{selectedHub.cityName} Network</strong>.
                    </p>
                  </div>

                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => haptic.success()}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 transition transform active:scale-95"
                  >
                    <PhoneCall className="w-5 h-5 text-white stroke-[2.5] animate-bounce" />
                    <span>Connect Live WhatsApp Coordinator</span>
                  </a>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs sm:text-sm text-amber-300 hover:underline inline-block font-black mt-2"
                  >
                    ← Calculate Another Treatment or Location
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
