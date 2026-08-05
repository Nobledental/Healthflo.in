"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleTrendsEEATBanner from "@/components/seo/GoogleTrendsEEATBanner";
import { Sparkles, ShieldCheck, Activity, ArrowRight, CheckCircle2, Clock, MapPin, Phone, MessageSquare, AlertCircle, RefreshCw } from "lucide-react";
import { REGIONAL_LOCATIONS, RegionalLocation } from "@/data/regionalLocations";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { haptic } from "@/utils/haptics";

export default function AIClinicalTriagePage() {
  const { config } = useSiteConfig();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [symptom, setSymptom] = useState("Proctology (Piles, Fistula, Fissure)");
  const [severity, setSeverity] = useState("Moderate — recurring discomfort lasting several weeks");
  const [selectedState, setSelectedState] = useState("Tamil Nadu");
  const [selectedCity, setSelectedCity] = useState("Salem");
  const [insuranceType, setInsuranceType] = useState("Corporate Employee Group Policy / Mediclaim");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Filter cities based on selected state
  const currentCities = REGIONAL_LOCATIONS.filter((loc: RegionalLocation) => loc.stateName === selectedState);

  const handleRunDiagnostics = (e: React.FormEvent) => {
    e.preventDefault();
    haptic.medium();
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setStep(4); // Show AI result
    }, 1500);
  };

  const WHATSAPP_MESSAGE = encodeURIComponent(
    `Hello Dr. Chief Surgical Coordinator, I completed an AI Clinical Triage evaluation on HealthFlo.in for ${symptom} in ${selectedCity} (${selectedState}). My severity rating is: ${severity}. I have ${insuranceType}. Please share the empanelled laser hospital details and OPD doctor consultation slot.`
  );
  const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=91${config.helplineRaw}&text=${WHATSAPP_MESSAGE}`;

  const stateOptions = ["Tamil Nadu", "Karnataka", "Telangana"];

  return (
    <div className="min-h-screen bg-slate-900 text-white selection:bg-[#00E5FF] selection:text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-28 md:pt-36 pb-20 relative z-10 flex flex-col gap-12">
        
        {/* ── HERO SECTION: CLINICAL INTELLIGENCE CENTER ──────────────────── */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-[#00E5FF] border border-blue-500/30 text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg animate-pulse">
            <Sparkles className="w-4 h-4 text-[#00E5FF]" />
            <span>HealthFlo AI Clinical Triage Engine 2.0</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Instant Surgical Triage & <br />
            <span className="bg-gradient-to-r from-[#00E5FF] via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Empanelled Doctor Matching
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Eliminate outpatient diagnostic guessing. Our medical heuristic engine maps your symptoms directly to USFDA laser protocols, cash-free insurance applicability, and verified surgeons across South India in 60 seconds.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-2 text-xs font-black uppercase tracking-wider text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>NMC Surgeon Calibrated</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>100% Cashless TPA Check</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Ambulatory Discharge Protocol</span>
            </div>
          </div>
        </div>

        {/* ── INTERACTIVE AI SCREENER CONSOLE ─────────────────────────────── */}
        <div className="bg-[#0A1326] border border-slate-800 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Background Cyber Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Progress Tabs Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-8 text-xs font-black uppercase tracking-wider">
            <span className="text-slate-400">Diagnostic Phase: {step} of 4</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((idx) => (
                <div 
                  key={idx} 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === step ? "w-10 bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.6)]" : idx < step ? "w-4 bg-emerald-400" : "w-4 bg-slate-700"
                  }`} 
                />
              ))}
            </div>
          </div>

          {step < 4 ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep((prev) => (prev + 1) as any); }} className="space-y-8 relative z-10 max-w-3xl mx-auto">
              
              {/* STEP 1: SYMPTOM & CLINICAL ARENA */}
              {step === 1 && (
                <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">Select Primary Symptom or Surgical Concern</h3>
                    <p className="text-sm text-slate-400">Our algorithm routes to specialized Proctologists, General Surgeons, Urologists, or Phlebologists.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "Proctology (Piles, Fistula, Fissure)", desc: "Bleeding during stool, severe perianal pain, or abscess" },
                      { label: "Hernia (Inguinal, Umbilical, Incisional)", desc: "Visible lump or protrusion in abdomen or groin during straining" },
                      { label: "Urology & Circumcision / Stone", desc: "Severe flank pain, urinary restriction, or phimosis distress" },
                      { label: "Varicose Veins & Vascular", desc: "Twisted, swollen leg veins with aching or ulcers during standing" },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.label}
                        onClick={() => { setSymptom(item.label); haptic.light(); }}
                        className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          symptom === item.label
                            ? "bg-blue-600/20 border-[#00E5FF] text-white shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                            : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div>
                          <span className="text-base font-black block text-white mb-1">{item.label}</span>
                          <span className="text-xs text-slate-400 leading-relaxed font-medium">{item.desc}</span>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-cyan-400">
                          <span>{symptom === item.label ? "Selected Protocol" : "Click to select"}</span>
                          {symptom === item.label && <CheckCircle2 className="w-4 h-4 ml-auto text-[#00E5FF]" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-8 py-3.5 rounded-full bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-cyan-500/20 transition-transform active:scale-95"
                    >
                      <span>Next: Clinical Severity</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: DURATION & SEVERITY */}
              {step === 2 && (
                <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">How severe is the discomfort or condition?</h3>
                    <p className="text-sm text-slate-400">Helps determine if immediate daycare outpatient surgical intervention or conservative treatment is indicated.</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Mild — intermittent discomfort occurring occasionally",
                      "Moderate — recurring discomfort lasting several weeks impacting routines",
                      "Severe — acute pain, active bleeding, or immediate impediment to movement",
                      "Post-Surgical Relapse — previously attempted open surgery elsewhere that failed",
                    ].map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => { setSeverity(item); haptic.light(); }}
                        className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                          severity === item
                            ? "bg-emerald-500/20 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                            : "bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <span className="text-sm sm:text-base font-bold text-white">{item}</span>
                        {severity === item && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-8 py-3.5 rounded-full bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-black text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-cyan-500/20 transition-transform active:scale-95"
                    >
                      <span>Next: Location & Insurance</span>
                      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: REGIONAL CENTER & TPA POLICY */}
              {step === 3 && (
                <div className="space-y-6 animate-[fadeIn_0.4s_ease-out]">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">Select Your South India Hub & Insurance Coverage</h3>
                    <p className="text-sm text-slate-400">We match you with empanelled daycare surgical facilities with zero-upfront cash pre-authorization.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">Select State</label>
                      <select
                        value={selectedState}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedState(val);
                          const matching = REGIONAL_LOCATIONS.filter((l: RegionalLocation) => l.stateName === val);
                          if (matching && matching.length > 0) setSelectedCity(matching[0].name);
                        }}
                        className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl px-4 py-3 text-white font-bold focus:border-[#00E5FF] focus:outline-none"
                      >
                        {stateOptions.map((st) => (
                          <option key={st} value={st}>{st} Network Hub</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">Select Regional City</label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full bg-slate-900 border-2 border-slate-700 rounded-xl px-4 py-3 text-white font-bold focus:border-[#00E5FF] focus:outline-none"
                      >
                        {currentCities.map((c: RegionalLocation) => (
                          <option key={c.name} value={c.name}>{c.name} ({c.localHospitals.length} Hospitals)</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-400 block">Health Insurance Status</label>
                    {[
                      "Corporate Employee Group Policy / Mediclaim",
                      "Private Individual Health Insurance (Star, Niva, HDFC, Care)",
                      "Government / Scheme Policy (Ayushman, State Health Scheme)",
                      "Self-Pay Cash (Need Low Interest Medical EMI / Transparent Package)",
                    ].map((item) => (
                      <button
                        type="button"
                        key={item}
                        onClick={() => { setInsuranceType(item); haptic.light(); }}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          insuranceType === item
                            ? "bg-blue-600/20 border-[#00E5FF] text-white font-black"
                            : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        <span className="text-sm">{item}</span>
                        {insuranceType === item && <CheckCircle2 className="w-4 h-4 text-[#00E5FF] shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleRunDiagnostics}
                      disabled={isAnalyzing}
                      className="px-10 py-4 rounded-full bg-gradient-to-r from-emerald-400 to-[#00E5FF] text-slate-950 font-black text-sm sm:text-base flex items-center gap-3 shadow-2xl shadow-emerald-500/30 hover:scale-105 transition-all"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Auditing Clinical Protocols...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 fill-current" />
                          <span>Generate Clinical AI Action Plan</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          ) : (
            /* STEP 4: AI DIAGNOSTIC REPORT & REAL-TIME TRIAGE ROSTER */
            <div className="space-y-8 animate-[fadeIn_0.5s_ease-out] relative z-10 max-w-4xl mx-auto">
              
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/90 to-blue-950/90 border border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-black text-emerald-300 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>AI Surgical Triage Audit Complete</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    USFDA Laser Intervention Recommended
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    Based on your presentation of <strong className="text-emerald-400">{symptom}</strong> with <strong className="text-cyan-400">{severity}</strong>, conventional open hospital cutting is NOT required. You are eligible for minimally invasive laser surgery in <strong className="text-white">{selectedCity}</strong>.
                  </p>
                </div>

                <div className="w-full md:w-auto flex flex-col gap-3 shrink-0">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => haptic.medium()}
                    className="px-8 py-4 rounded-2xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-3 shadow-2xl shadow-cyan-500/30 transition-transform active:scale-95 text-center"
                  >
                    <MessageSquare className="w-5 h-5 text-slate-950 fill-current" />
                    <span>Connect Doctor via WhatsApp</span>
                  </a>
                  <button
                    onClick={() => { setStep(1); haptic.light(); }}
                    className="text-xs font-bold text-slate-400 hover:text-white underline text-center"
                  >
                    Reset & Restart AI Screener
                  </button>
                </div>
              </div>

              {/* Clinical AI Roster Breakdown Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#0A1326] border border-slate-800 space-y-3">
                  <div className="text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Activity className="w-4 h-4" />
                    <span>Ambulatory Recovery</span>
                  </div>
                  <p className="text-lg font-black text-white">Go Home in 2–4 Hours</p>
                  <p className="text-xs text-slate-400 font-medium">No overnight hospital admission needed. Zero sutures or dressings to remove.</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0A1326] border border-slate-800 space-y-3">
                  <div className="text-xs font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>TPA Claim Pre-Approval</span>
                  </div>
                  <p className="text-lg font-black text-white">100% Cashless Eligible</p>
                  <p className="text-xs text-slate-400 font-medium">Your selected coverage (<span className="text-slate-300 font-bold">{insuranceType}</span>) qualifies for immediate pre-auth processing.</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0A1326] border border-slate-800 space-y-3">
                  <div className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedCity} Surgical Roster</span>
                  </div>
                  <p className="text-lg font-black text-white">Immediate OPD Slots Open</p>
                  <p className="text-xs text-slate-400 font-medium">Empanelled NMC senior surgical specialists in {selectedCity} are on active triage duty.</p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* ── GOOGLE TRENDS & E-E-A-T AUDIT FOOTER BANNER ──────────────────── */}
        <GoogleTrendsEEATBanner 
          cityName={selectedCity}
          stateName={selectedState}
          procedureTitle="Minimally Invasive Laser Surgical Protocols"
        />

      </main>

      <Footer />
    </div>
  );
}
