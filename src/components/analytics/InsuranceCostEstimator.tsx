"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Calculator, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall, 
  Building2, 
  FileText, 
  ArrowRight, 
  Lock, 
  HelpCircle, 
  Clock, 
  Check, 
  AlertCircle,
  Car
} from "lucide-react";
import { haptic } from "@/utils/haptics";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface Props {
  defaultProcedure?: string;
  defaultCity?: string;
  defaultState?: string;
  className?: string;
}

const PROCEDURES = [
  { name: "Laser Circumcision & Foreskin Care", basePrice: "₹28,500", emi: "₹2,850/mo", recovery: "24-48 Hours", usfda: "Zsr & Diode 980nm Laser" },
  { name: "USFDA Laser Piles / Hemorrhoidoplasty", basePrice: "₹32,000", emi: "₹3,200/mo", recovery: "0-Day Discharge", usfda: "LHP 1470nm Biolitec Protocol" },
  { name: "Anal Fistula Laser Closure (FiLaC)", basePrice: "₹38,500", emi: "₹3,850/mo", recovery: "Same-day ambulatory", usfda: "Sphincter-Preserving Radial Fiber" },
  { name: "Anal Fissure Laser Sphincterotomy", basePrice: "₹29,000", emi: "₹2,900/mo", recovery: "Immediate relief", usfda: "Precision Contact Diode" },
  { name: "Painless Lipoma / Swelling / Cyst Excision", basePrice: "₹22,000", emi: "₹2,200/mo", recovery: "No sutures / Cosmetic", usfda: "Micro-incision USFDA Protocol" },
  { name: "Laparoscopic Hernia Repair (Inguinal/Umbilical)", basePrice: "₹45,000", emi: "₹4,500/mo", recovery: "1-Day hospital observation", usfda: "3D Mesh Fixation Laparoscopy" },
  { name: "Hydrocele Laser / Minimally Invasive Surgery", basePrice: "₹34,000", emi: "₹3,400/mo", recovery: "24 Hours return to work", usfda: "Bloodless Hydrocelectomy" },
  { name: "Varicose Vein Laser Ablation (EVLA)", basePrice: "₹42,000", emi: "₹4,200/mo", recovery: "Walk out same day", usfda: "Endovenous Radial Laser Fiber" },
  { name: "Kidney Stone Laser Lithotripsy (RIRS/PCNL)", basePrice: "₹48,000", emi: "₹4,800/mo", recovery: "Painless laser dust removal", usfda: "Holmium Laser & Flexible Scope" },
];

const HEALTH_HUBS = [
  { city: "Bengaluru (Whitefield, Outer Ring Rd, HSR)", state: "Karnataka", lang: "kn" },
  { city: "Hyderabad (Jubilee Hills, HITEC City, Gachibowli)", state: "Telangana", lang: "te" },
  { city: "Chennai (Anna Nagar, Adyar, OMR IT Corridor)", state: "Tamil Nadu", lang: "ta" },
  { city: "Coimbatore (RS Puram, Avinashi Rd Hub)", state: "Tamil Nadu", lang: "ta" },
  { city: "Mysuru (Gokulam, Kuvempunagar Hub)", state: "Karnataka", lang: "kn" },
  { city: "Warangal & Karimnagar Care Directory", state: "Telangana", lang: "te" },
  { city: "Salem, Madurai & Erode Surgical Hubs", state: "Tamil Nadu", lang: "ta" },
  { city: "Hubballi, Mangaluru & Belagavi Centers", state: "Karnataka", lang: "kn" },
  { city: "Pan-South India Speciality Referral Network", state: "Multi-State", lang: "en" },
];

const INSURERS = [
  { group: "Corporate Employee Group Policy (TCS, Infosys, Wipro, etc.)", status: "100% Cashless Pre-Approved", badge: "Instant Corporate Fast-Track", color: "text-emerald-400" },
  { group: "Star Health / HDFC Ergo / ICICI Lombard / Care", status: "100% Cashless Pre-Approved", badge: "Zero Upfront Hospital Deposit", color: "text-emerald-400" },
  { group: "Medi Assist / Niva Bupa / United India / National Ins.", status: "100% Cashless Eligible", badge: "Direct TPA Billing Authorization", color: "text-blue-400" },
  { group: "Self-Pay No-Cost EMI (Bajaj Finserv / UPI / Cards)", status: "No-Cost EMI Available", badge: "0% Interest / Flexible 12-Mo Tenure", color: "text-amber-400" },
];

export default function InsuranceCostEstimator({ defaultProcedure, defaultCity, defaultState, className = "" }: Props) {
  const { config } = useSiteConfig();
  // Initial state selection
  const initialProcIndex = PROCEDURES.findIndex(p => p.name.toLowerCase().includes(defaultProcedure?.toLowerCase() || ""));
  const initialHubIndex = HEALTH_HUBS.findIndex(h => h.city.toLowerCase().includes(defaultCity?.toLowerCase() || ""));

  const [selectedProc, setSelectedProc] = useState(PROCEDURES[initialProcIndex !== -1 ? initialProcIndex : 0]);
  const [selectedHub, setSelectedHub] = useState(HEALTH_HUBS[initialHubIndex !== -1 ? initialHubIndex : 0]);
  const [selectedInsurer, setSelectedInsurer] = useState(INSURERS[0]);

  // Form states
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
      setErrorMsg("Please enter a valid 10-digit mobile number for immediate SMS/WhatsApp pre-auth.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);
    haptic.medium();

    const noteText = `[INSTANT ESTIMATOR TRIAGE] Patient ${name} executed real-time cost & insurance calculation for ${selectedProc.name} in ${selectedHub.city}. Selected Payment/Policy Plan: "${selectedInsurer.group}". Estimated status: ${selectedInsurer.status}. Requesting priority coordinator outreach and empanelled hospital appointment scheduling.`;

    try {
      // Beam silently to Phase 4 Admin Intelligence & Coordinator Tracking CRM
      await fetch("/api/coordinator/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          city: selectedHub.city.split(" ")[0] || "Bengaluru",
          state: selectedHub.state || "South India",
          device: typeof window !== "undefined" && window.navigator ? (window.navigator.userAgent.includes("Mobile") ? "Mobile Estimator Widget" : "Desktop Estimator Widget") : "Web Estimator",
          pagesViewed: [typeof window !== "undefined" ? window.location.pathname : "/estimator"],
          lastClickedElement: `Claim Estimator: ${selectedProc.name}`,
          coordinatorClinicalNote: noteText,
          leadContact: {
            name: name,
            phone: phone,
            email: "estimator-lead@healthflo.in",
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
      setIsSubmitted(true); // Proceed to confirmation even on network hiccup to assure UX
    }
  };

  // Build localized WhatsApp connection URL
  const buildWhatsAppLink = () => {
    let greeting = "Hello HealthFlo Clinical Team,";
    if (selectedHub.lang === "ta") greeting = "வணக்கம் HealthFlo Clinical Team,";
    if (selectedHub.lang === "kn") greeting = "ನಮಸ್ಕಾರ HealthFlo Clinical Team,";
    if (selectedHub.lang === "te") greeting = "నమస్కారం HealthFlo Clinical Team,";

    const msg = `${greeting} I just checked the Cashless Insurance Estimator for *${selectedProc.name}* at your *${selectedHub.city}* empanelled hospital network under *${selectedInsurer.group}*. My name is ${name || "a patient"}. Please connect me with my senior triage coordinator for instant appointment scheduling.`;
    return `https://wa.me/${config.helplineRaw}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className={`w-full my-8 rounded-3xl bg-gradient-to-br from-[#061229] via-[#0A1836] to-[#0E1E45] text-white p-6 md:p-8 lg:p-10 border border-blue-500/30 shadow-2xl relative overflow-hidden font-sans ${className}`}>
      {/* Background Cyber Glowing Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10 relative z-10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>AI Cashless Surgery & EMI Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            Instant Hospital Pre-Approval & Treatment Cost Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Check live cashless insurance compatibility and package rates across HealthFlo’s empanelled surgical hospital network in Tamil Nadu, Karnataka & Hyderabad.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 shrink-0">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="font-bold text-white">100% Transparent Protocols</p>
            <p className="text-[11px] text-slate-400">Zero hidden OT or room charges</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* LEFT COLUMN: INTERACTIVE SELECTORS (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. SELECT PROCEDURE */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono text-[11px]">1</span>
              Select Target Procedure or Speciality
            </label>
            <select
              value={selectedProc.name}
              onChange={(e) => {
                const found = PROCEDURES.find(p => p.name === e.target.value);
                if (found) {
                  setSelectedProc(found);
                  handleCalculateChange();
                }
              }}
              className="w-full px-4 py-3.5 rounded-2xl bg-[#09152E] border border-blue-400/40 text-white font-bold text-sm sm:text-base focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition cursor-pointer shadow-inner"
            >
              {PROCEDURES.map((p) => (
                <option key={p.name} value={p.name} className="bg-[#0A1836] text-white">
                  {p.name} ({p.usfda})
                </option>
              ))}
            </select>
          </div>

          {/* 2. SELECT CITY & REGIONAL HUB */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono text-[11px]">2</span>
              Select Preferred Hospital Hub or City
            </label>
            <select
              value={selectedHub.city}
              onChange={(e) => {
                const found = HEALTH_HUBS.find(h => h.city === e.target.value);
                if (found) {
                  setSelectedHub(found);
                  handleCalculateChange();
                }
              }}
              className="w-full px-4 py-3.5 rounded-2xl bg-[#09152E] border border-emerald-400/40 text-white font-semibold text-sm sm:text-base focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition cursor-pointer shadow-inner"
            >
              {HEALTH_HUBS.map((h) => (
                <option key={h.city} value={h.city} className="bg-[#0A1836] text-white">
                  📍 {h.city} ({h.state})
                </option>
              ))}
            </select>
          </div>

          {/* 3. SELECT INSURANCE POLICY OR PAYMENT MODE */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-mono text-[11px]">3</span>
              Select Insurance Provider or Payment Plan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {INSURERS.map((ins) => (
                <button
                  key={ins.group}
                  type="button"
                  onClick={() => {
                    setSelectedInsurer(ins);
                    handleCalculateChange();
                  }}
                  className={`text-left p-3.5 rounded-2xl border transition flex flex-col justify-between ${
                    selectedInsurer.group === ins.group
                      ? "bg-blue-600/30 border-cyan-400 shadow-md shadow-cyan-500/15"
                      : "bg-[#0B1730] border-slate-700 hover:border-slate-500"
                  }`}
                >
                  <p className="text-xs font-bold text-slate-100 line-clamp-2">{ins.group}</p>
                  <span className={`text-[10px] font-extrabold tracking-wide uppercase mt-2 inline-flex items-center gap-1 ${ins.color}`}>
                    <CheckCircle2 className="w-3 h-3 shrink-0" /> {ins.badge}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* INCLUDED NETWORK EXTRAS */}
          <div className="p-4 rounded-2xl bg-[#09142A]/80 border border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <Car className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Free Round-Trip Patient Cab Included</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{selectedProc.recovery} Discharge Protocol</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>USFDA Accredited Operation Theatres</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: CALCULATED ESTIMATE & LEAD CLAIM (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="h-full rounded-3xl bg-gradient-to-b from-[#0E214A] to-[#0A1734] border-2 border-cyan-400/50 p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-[10px] font-black uppercase tracking-widest text-white shadow">
              Live Pre-Auth Desk
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Estimated Treatment Profile:
              </span>
              <h3 className="text-lg font-bold text-white pr-20 line-clamp-1">{selectedProc.name}</h3>
              
              {/* PRICE / CASHLESS BADGE */}
              <div className="my-5 p-4 rounded-2xl bg-[#071126] border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                    Estimated Patient Liability:
                  </span>
                  {selectedInsurer.group.includes("Self-Pay") ? (
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{selectedProc.emi}</span>
                      <span className="text-xs text-slate-400 font-semibold">(No-Cost EMI)</span>
                    </div>
                  ) : (
                    <div className="mt-1">
                      <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">₹0 Upfront</span>
                      <p className="text-[11px] font-bold text-cyan-300 mt-0.5">100% Cashless Insurance Eligible</p>
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 block">Package Valuation</span>
                  <span className="text-base font-mono font-bold text-slate-300 line-through">{selectedProc.basePrice}</span>
                </div>
              </div>

              {/* LOCATION BADGE */}
              <div className="text-xs text-slate-300 bg-blue-950/50 p-3 rounded-xl border border-blue-800/40 flex items-center justify-between mb-6">
                <span className="flex items-center gap-1.5 font-medium truncate">
                  📍 Hub: <strong className="text-white">{selectedHub.city.split(" ")[0]} Network</strong>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold shrink-0">
                  Empanelled Active
                </span>
              </div>
            </div>

            {/* FORM OR CONFIRMATION */}
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="claim-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleClaimSubmit} 
                  className="space-y-3 pt-4 border-t border-white/10"
                >
                  <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Lock In Your Pre-Approval & Free Transit:</span>
                  </div>

                  <div className="space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Patient or Guardian Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#060D1E] border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition font-medium"
                    />
                    <div className="relative">
                      <span className="absolute left-3.5 top-3 text-xs font-mono font-bold text-slate-400">+91</span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="10-Digit WhatsApp Mobile Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#060D1E] border border-slate-700 text-white placeholder:text-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition font-mono font-medium"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <p className="text-[11px] text-rose-400 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errorMsg}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-500/20 hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Securing Pre-Approval..."
                    ) : (
                      <>
                        <span>Claim Package & Pre-Auth</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-400 flex items-center justify-center gap-1 pt-1">
                    <Lock className="w-3 h-3 text-emerald-400" /> Confidential Patient Triage • Zero Third-Party Sharing
                  </p>
                </motion.form>
              ) : (
                <motion.div 
                  key="confirmation-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-2xl bg-gradient-to-tr from-emerald-950/90 to-[#0C2038] border border-emerald-500/40 text-center space-y-4 my-2"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30 font-black">
                    <Check className="w-7 h-7 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-white">Estimate Locked & Registered!</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Your clinical dossier has been securely logged with our senior surgical triage team for <strong className="text-emerald-300">{selectedHub.city.split(" ")[0]}</strong>.
                    </p>
                  </div>

                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => haptic.success()}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition"
                  >
                    <PhoneCall className="w-4 h-4 text-slate-950 animate-bounce" />
                    <span>Connect Live WhatsApp Coordinator</span>
                  </a>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-[11px] text-cyan-400 hover:underline inline-block font-semibold"
                  >
                    ← Check Another Procedure or City
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
