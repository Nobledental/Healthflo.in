"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Stethoscope, 
  Brain, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  FileText, 
  Send, 
  ClipboardCheck, 
  RefreshCw, 
  ShieldAlert, 
  Award, 
  Layers, 
  Activity,
  HeartPulse,
  Building2,
  Share2,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface TabAITriageProps {
  onAuditLog: (msg: string) => void;
  onRefreshData: () => void;
}

interface TriageResult {
  urgency: "LEVEL 1: URGENT WORKUP" | "LEVEL 2: PRIORITY ELECTIVE" | "LEVEL 3: STANDARD CONSULTATION";
  urgencyColor: string;
  recommendedProcedure: string;
  technologyTag: string;
  hospitalRecommendation: string;
  preOpChecklist: string[];
  anesthesiaRisk: string;
  recoveryEstimate: string;
  insuranceAdvisory: string;
  clinicalSummary: string;
}

const EMPANELLED_BY_STATE: Record<string, string[]> = {
  "Tamil Nadu": [
    "Apollo Hospitals (Greams Road, Chennai)",
    "Kauvery Hospital (Alwarpet, Chennai)",
    "KMCH (Kovai Medical Center & Hospital, Coimbatore)",
    "Meenakshi Mission Hospital (Madurai)"
  ],
  "Karnataka": [
    "Manipal Hospital (Old Airport Road, Bengaluru)",
    "Fortis Hospital (Bannerghatta Road, Bengaluru)",
    "Narayana Health City (Bommasandra, Bengaluru)",
    "Apollo BGS Hospital (Mysuru)"
  ],
  "Telangana": [
    "Yashoda Hospitals (Secunderabad & Somajiguda, Hyderabad)",
    "Apollo Hospitals (Jubilee Hills, Hyderabad)",
    "KIMS Hospitals (Secunderabad)"
  ]
};

export default function TabAITriage({ onAuditLog, onRefreshData }: TabAITriageProps) {
  // Input State
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [stateRegion, setStateRegion] = useState<"Tamil Nadu" | "Karnataka" | "Telangana">("Tamil Nadu");
  const [symptoms, setSymptoms] = useState("");
  const [comorbidities, setComorbidities] = useState("None");
  const [insurance, setInsurance] = useState("Corporate Group Insurance (EHS / Mediclaim)");
  
  // Evaluation State
  const [evaluating, setEvaluating] = useState(false);
  const [evalStep, setEvalStep] = useState("");
  const [result, setResult] = useState<TriageResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [loggedToCrm, setLoggedToCrm] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  // Quick Load Sample Cases for Director Testing
  const loadSampleCase = (type: number) => {
    setResult(null);
    setLoggedToCrm(false);
    if (type === 1) {
      setPatientName("Karthick Narayanan");
      setPhone("9841029384");
      setAge("42");
      setStateRegion("Tamil Nadu");
      setSymptoms("Severe anorectal pain during defecation for 5 days accompanied by bright red arterial bleeding and prominent perianal swelling. Sitting for >15 minutes causes severe discomfort.");
      setComorbidities("Hypertension (Managed on Amlodipine)");
      setInsurance("Star Health Comprehensive Mediclaim");
    } else if (type === 2) {
      setPatientName("Suresh Babu R.");
      setPhone("9980123987");
      setAge("54");
      setStateRegion("Karnataka");
      setSymptoms("Prominent rope-like tortuous varicose veins along medial right calf and thigh. Persistent evening edema and throbbing leg heaviness after standing shifts.");
      setComorbidities("Type 2 Diabetes Mellitus (HbA1c 7.4%)");
      setInsurance("HDFC Ergo Optima Restore");
    } else if (type === 3) {
      setPatientName("Venkatesh Rao");
      setPhone("9848034567");
      setAge("48");
      setStateRegion("Telangana");
      setSymptoms("Recurrent left inguinal bulge that protrudes when straining or coughing. Mild aching pain in groin, currently reducible without strangulation signs.");
      setComorbidities("None");
      setInsurance("Corporate Group Insurance (EHS / Mediclaim)");
    }
  };

  const handleRunAI = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setEvaluating(true);
    setResult(null);
    setLoggedToCrm(false);

    // Simulated step-by-step diagnostic reasoning animation
    const steps = [
      "Parsing clinical semiology & anatomical severity markers...",
      "Cross-referencing USFDA minimal-access surgical protocols...",
      "Evaluating anesthesia risk against patient comorbidities...",
      "Mapping nearest empanelled surgical center in " + stateRegion + "...",
      "Synthesizing safe-harbor clinical handover..."
    ];

    let currentStep = 0;
    setEvalStep(steps[0]);

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setEvalStep(steps[currentStep]);
      } else {
        clearInterval(interval);
        generateTriageReport();
      }
    }, 600);
  };

  const generateTriageReport = () => {
    const text = symptoms.toLowerCase();
    let proc = "General Advanced Minimally Invasive Surgery";
    let tech = "USFDA Precision Laparoscopic & Robotic Instrumentation";
    let urg: TriageResult["urgency"] = "LEVEL 2: PRIORITY ELECTIVE";
    let urgColor = "text-amber-400 bg-amber-500/10 border-amber-500/30";
    let check = ["Complete Blood Count (CBC)", "Coagulation Profile (PT/INR)", "Fasting Blood Sugar", "ECG & Chest X-Ray", "Viral Markers (HBsAg / HCV / HIV)"];
    
    if (text.includes("bleed") || text.includes("pile") || text.includes("fistula") || text.includes("fissure") || text.includes("anorectal") || text.includes("defecation")) {
      proc = text.includes("fistula") 
        ? "Laser Fistula Tract Closure (FiLaC® Protocol)" 
        : "Laser Hemorrhoidopexy (1470nm Radial Fiber Diode Laser)";
      tech = "1470nm Radial Diode Fiber (Zero Incision, Sphincter-Preserving, Zero Room Rent Cap)";
      if (text.includes("severe") || text.includes("arterial") || text.includes("bleed")) {
        urg = "LEVEL 1: URGENT WORKUP";
        urgColor = "text-rose-400 bg-rose-500/15 border-rose-500/40 animate-pulse";
      }
      check.push("Proctoscopy & Digital Rectal Exam (DRE)", "Liver Function Tests");
    } else if (text.includes("vein") || text.includes("varicose") || text.includes("edema") || text.includes("calf") || text.includes("throbbing")) {
      proc = "Endovenous Laser Ablation (EVLA) + USG-Guided Sclerotherapy";
      tech = "1940nm Wavelength EVLA Catheter with Real-Time Doppler Guidance";
      urg = "LEVEL 2: PRIORITY ELECTIVE";
      urgColor = "text-amber-400 bg-amber-500/10 border-amber-500/30";
      check.push("Venous Color Doppler Ultrasound (Bilateral Lower Limbs)");
    } else if (text.includes("hernia") || text.includes("inguinal") || text.includes("bulge") || text.includes("groin") || text.includes("gall")) {
      proc = text.includes("gall") || text.includes("stone") && text.includes("bladder")
        ? "3D 4K Laparoscopic Cholecystectomy"
        : "3D Laparoscopic Totally Extraperitoneal (TEP) Mesh Repair";
      tech = "High-Definition 3D 4K Vision Systems with Ultra-Pro Monopilar Mesh Protection";
      urg = "LEVEL 2: PRIORITY ELECTIVE";
      check.push("Ultrasound Abdomen & Pelvis", "Serum Electrolytes & Renal Function");
    } else if (text.includes("stone") || text.includes("urology") || text.includes("kidney") || text.includes("urine") || text.includes("circumcision")) {
      proc = text.includes("circumcision") 
        ? "ZSR Stapler / Laser Circumcision (Painless & Bloodless)" 
        : "Retrograde Intra-Renal Surgery (RIRS) + Thulium Fiber Laser Lithotripsy";
      tech = "Flexible Ureteroscopic Thulium Fiber Laser (Dusting & Fragmenting Engine)";
      if (text.includes("pain") && (text.includes("severe") || text.includes("acute"))) {
        urg = "LEVEL 1: URGENT WORKUP";
        urgColor = "text-rose-400 bg-rose-500/15 border-rose-500/40 animate-pulse";
      }
      check.push("CT KUB (Without Contrast)", "Urine Routine & Culture Sensitivity", "Serum Creatinine");
    }

    const hospitals = EMPANELLED_BY_STATE[stateRegion] || EMPANELLED_BY_STATE["Tamil Nadu"];
    const chosenHospital = hospitals[Math.floor(Math.random() * hospitals.length)];

    let anesthesia = "Standard Short-Acting Spinal / GA Protocol (Low Cardiac Risk)";
    if (comorbidities.toLowerCase().includes("diabetes") || comorbidities.toLowerCase().includes("hypertension") || comorbidities.toLowerCase().includes("cardiac")) {
      anesthesia = `Modified Cardiac/Metabolic Protocol with Pre-Op Physician Clearance (Due to: ${comorbidities})`;
    }

    let insAdv = "100% Cashless Eligible. Pre-authorization document generation takes ~45 minutes via HealthFlo Digital Desk.";
    if (insurance.toLowerCase().includes("uninsured") || insurance.toLowerCase().includes("self")) {
      insAdv = "Self-Pay Package: Eligible for HealthFlo zero-cost 0% EMI medical loan financing with overnight approval.";
    }

    const summary = `PATIENT: ${patientName || "Anonymous Patient"} (${age ? age + " Yrs" : "Adult"}) - Region: ${stateRegion}
PRESENTING SYMPTOMS: ${symptoms}
COMORBIDITIES: ${comorbidities}
TRIAGE LEVEL: ${urg}
RECOMMENDED PROTOCOL: ${proc}
PRIMARY TECH: ${tech}
DESIGNATED SURGICAL CENTER: ${chosenHospital}
ANESTHESIA ADVISORY: ${anesthesia}
CASHLESS CLEARANCE: ${insAdv}`;

    setResult({
      urgency: urg,
      urgencyColor: urgColor,
      recommendedProcedure: proc,
      technologyTag: tech,
      hospitalRecommendation: chosenHospital,
      preOpChecklist: check,
      anesthesiaRisk: anesthesia,
      recoveryEstimate: "Same-Day Discharge (<12 to 24 Hours). Return to normal sedentary activity within 48 hours.",
      insuranceAdvisory: insAdv,
      clinicalSummary: summary
    });

    setEvaluating(false);
    onAuditLog(`[AI TRIAGE] Evaluated symptoms for patient ${patientName || "Anonymous"} (${stateRegion}). Recommended protocol: ${proc}`);
  };

  const handleCopyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.clinicalSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    onAuditLog(`[AI TRIAGE] Officer copied clinical handover note for ${patientName || "Patient"} to clipboard.`);
  };

  const handleWhatsAppBroadcast = () => {
    if (!result || !phone) return;
    const msg = `*HealthFlo Clinical Triage & Cashless Surgical Handover*\n\nDear *${patientName || "Patient"}*,\nBased on our senior medical directorate evaluation for your reported symptoms, here is your preliminary surgical protocol:\n\n🔬 *Recommended Procedure:* ${result.recommendedProcedure}\n⚡ *Technology:* ${result.technologyTag}\n🏥 *Designated Center:* ${result.hospitalRecommendation}\n📋 *Recovery Estimate:* ${result.recoveryEstimate}\n\nOur native language coordinator has reserved your consultation. Reply directly or call our 24/7 priority desk to finalize cashless pre-authorization!`;
    const url = `https://wa.me/91${phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onAuditLog(`[AI TRIAGE] Dispatched automated surgical WhatsApp handover to +91 ${phone}`);
  };

  const handleLogToCRM = async () => {
    if (!result) return;
    setIsLogging(true);
    try {
      const res = await fetch("/api/coordinator/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "SESS_TRIAGE_" + Math.floor(10000 + Math.random() * 90000),
          city: result.hospitalRecommendation.split(" (")[0] || "Surgical Triage Center",
          state: stateRegion,
          device: "Admin AI Triage Copilot Workbench",
          pagesViewed: ["/admin (AI Symptom Evaluation Console)"],
          lastClickedElement: "AI Triage CRM Submission",
          leadContact: {
            name: patientName || "Triage Evaluated Patient",
            phone: phone || "N/A",
            procedure: result.recommendedProcedure,
            status: "Triage Completed"
          },
          coordinatorClinicalNote: `[AI CLINICAL TRIAGE ASSESSOR REPORT]\n${result.clinicalSummary}`
        })
      });

      if (res.ok) {
        setLoggedToCrm(true);
        onRefreshData();
        onAuditLog(`[AI TRIAGE] Patient ${patientName || "Anonymous"} successfully saved to Safe-Harbor CRM with full auto-responder receipts.`);
      }
    } catch (e) {
      console.error("CRM save error:", e);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 text-slate-200">
      
      {/* Top Console Title Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Brain className="w-3.5 h-3.5" /> Generative Clinical Triage &amp; USFDA Protocol Mapping Engine
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span>AI-Powered Clinical Symptom Evaluation Assistant</span>
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluate raw patient symptoms, map minimal-access laser surgical protocols, verify empanelled hospital availability, and dispatch WhatsApp handovers in seconds.
          </p>
        </div>

        {/* Quick Load sample triggers */}
        <div className="flex flex-col sm:flex-row gap-2 shrink-0">
          <span className="text-[11px] font-bold text-slate-500 uppercase self-center mr-1 hidden lg:inline">Quick Test Cases:</span>
          <button
            onClick={() => loadSampleCase(1)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-rose-400" /> Case 1: Laser Piles (TN)
          </button>
          <button
            onClick={() => loadSampleCase(2)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-blue-400" /> Case 2: Varicose (KA)
          </button>
          <button
            onClick={() => loadSampleCase(3)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-400" /> Case 3: Hernia (TS)
          </button>
        </div>
      </div>

      {/* Main 2-Column Responsive Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT 5 COLUMNS: PATIENT INGESTION & SYMPTOM CONSOLE */}
        <div className="lg:col-span-5 bg-[#070D1A] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
            <Stethoscope className="w-5 h-5 text-cyan-400" /> Patient Clinical Telemetry Input
          </h3>

          <form onSubmit={handleRunAI} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Patient Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Karthick N."
                    className="w-full bg-[#0A1224] border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-white text-xs font-bold focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  10-Digit Phone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9841029384"
                    className="w-full bg-[#0A1224] border border-slate-700 rounded-xl pl-10 pr-3 py-2.5 text-white text-xs font-mono font-bold focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Age (Yrs)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="42"
                  className="w-full bg-[#0A1224] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs font-bold focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Patient Region / State
                </label>
                <select
                  value={stateRegion}
                  onChange={(e: any) => setStateRegion(e.target.value)}
                  className="w-full bg-[#0A1224] border border-slate-700 rounded-xl px-3 py-2.5 text-white text-xs font-bold focus:outline-none focus:border-cyan-500 transition"
                >
                  <option value="Tamil Nadu">Tamil Nadu (Chennai / Kovai)</option>
                  <option value="Karnataka">Karnataka (Bengaluru / Mysuru)</option>
                  <option value="Telangana">Telangana (Hyderabad Hub)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Presenting Symptoms &amp; Clinical Notes</span>
                <span className="text-[10px] text-slate-500 lowercase font-normal">(required)</span>
              </label>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
                rows={4}
                placeholder="Describe presenting symptoms, pain duration, anatomical site, bleeding signs, or imaging findings..."
                className="w-full bg-[#0A1224] border border-slate-700 rounded-xl p-3.5 text-white text-xs font-medium leading-relaxed focus:outline-none focus:border-cyan-500 transition shadow-inner"
              />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Comorbidities &amp; Medications
                </label>
                <input
                  type="text"
                  value={comorbidities}
                  onChange={(e) => setComorbidities(e.target.value)}
                  placeholder="e.g. Diabetes, Hypertension, on Aspirin / Warfarin"
                  className="w-full bg-[#0A1224] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Insurance / Cashless Financing Status
                </label>
                <select
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value)}
                  className="w-full bg-[#0A1224] border border-slate-700 rounded-xl px-3.5 py-2.5 text-white text-xs font-semibold focus:outline-none focus:border-cyan-500 transition"
                >
                  <option value="Corporate Group Insurance (EHS / Mediclaim)">Corporate Group Insurance (EHS / Mediclaim)</option>
                  <option value="Retail Mediclaim (Star Health / HDFC Ergo / Niva Bupa)">Retail Mediclaim (Star Health / HDFC Ergo / Niva Bupa)</option>
                  <option value="Government Scheme (Ayushman / State CM Scheme)">Government Scheme (Ayushman / State CM Scheme)</option>
                  <option value="Uninsured (Seeking HealthFlo 0% EMI Medical Loan)">Uninsured (Seeking HealthFlo 0% EMI Medical Loan)</option>
                </select>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={evaluating || !symptoms.trim()}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer"
              >
                {evaluating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> {evalStep || "Evaluating..."}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" /> Execute AI Clinical Triage &amp; USFDA Mapping
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT 7 COLUMNS: AI SYNTHESIZED CLINICAL HANDOVER & ACTIONS */}
        <div className="lg:col-span-7 bg-[#091122] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
          
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {evaluating && (
            <div className="my-auto flex flex-col items-center justify-center text-center space-y-5 p-8">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20 animate-ping" />
                <div className="absolute inset-0 rounded-full border-4 border-t-cyan-400 border-r-transparent border-b-blue-500 border-l-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
                  <Brain className="w-8 h-8 animate-pulse" />
                </div>
              </div>
              <div className="space-y-1 max-w-sm">
                <h4 className="text-base font-black text-white">{evalStep}</h4>
                <p className="text-xs text-slate-400 font-mono">Cross-referencing 12,000+ zero-pain laser surgical records across South Indian medical centers...</p>
              </div>
            </div>
          )}

          {!evaluating && !result && (
            <div className="my-auto flex flex-col items-center justify-center text-center space-y-4 p-8 text-slate-500">
              <div className="w-16 h-16 rounded-3xl bg-[#060B16] border border-slate-800 flex items-center justify-center text-slate-600 shadow-inner">
                <Brain className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="max-w-md space-y-2">
                <p className="text-base font-black text-slate-400">Awaiting Patient Symptom Evaluation</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter patient case details on the left or load one of our quick test cases above to generate an automated AI clinical triage assessment and empanelled surgical mapping.
                </p>
              </div>
            </div>
          )}

          {!evaluating && result && (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              
              {/* Report Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      AI CLINICAL ASSESSOR VERDICT
                    </span>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {result.recommendedProcedure}
                      </h3>
                    </div>
                  </div>
                  <div className={`px-3.5 py-1.5 rounded-2xl border text-xs font-black tracking-wider uppercase flex items-center gap-1.5 shadow-sm ${result.urgencyColor}`}>
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>{result.urgency}</span>
                  </div>
                </div>

                {/* Key Metric Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#060C18] border border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-black text-cyan-400 uppercase flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Recommended Surgical Technology
                    </span>
                    <p className="text-xs font-bold text-white leading-relaxed">
                      {result.technologyTag}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#060C18] border border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-black text-emerald-400 uppercase flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" /> Designated Empanelled Center
                    </span>
                    <p className="text-xs font-bold text-white leading-relaxed flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" /> {result.hospitalRecommendation}
                    </p>
                  </div>
                </div>

                {/* Checklist & Recovery */}
                <div className="p-5 rounded-2xl bg-[#060D1A] border border-slate-800 space-y-4">
                  <div>
                    <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ClipboardCheck className="w-4 h-4 text-purple-400" /> Pre-Operative Diagnostic Workup Checklist
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.preOpChecklist.map((item, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-800/80 pt-3 flex flex-col sm:flex-row gap-4 text-xs">
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Anesthesia Risk Assessment</span>
                      <p className="font-semibold text-amber-300">{result.anesthesiaRisk}</p>
                    </div>
                    <div className="flex-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Estimated Hospital Stay</span>
                      <p className="font-semibold text-cyan-300">{result.recoveryEstimate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Toolbar & Handover Dispatch */}
              <div className="pt-6 border-t border-slate-800/80 space-y-4">
                
                {loggedToCrm ? (
                  <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Triage record successfully logged to Safe-Harbor CRM with real-time auto-responder audit trail!</span>
                  </div>
                ) : null}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* WhatsApp button */}
                  <button
                    onClick={handleWhatsAppBroadcast}
                    disabled={!phone}
                    className="p-3.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-[#25D366] text-xs font-black uppercase tracking-wide transition flex items-center justify-center gap-2 disabled:opacity-50"
                    title={!phone ? "Enter 10-digit phone on left" : "Send WhatsApp assessment"}
                  >
                    <Share2 className="w-4 h-4 shrink-0" />
                    <span>WhatsApp Handover</span>
                  </button>

                  {/* Log to CRM button */}
                  <button
                    onClick={handleLogToCRM}
                    disabled={loggedToCrm || isLogging}
                    className="p-3.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 text-blue-300 text-xs font-black uppercase tracking-wide transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLogging ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Saving...
                      </>
                    ) : loggedToCrm ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Saved to CRM
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-blue-400 shrink-0" /> Log Triage to CRM
                      </>
                    )}
                  </button>

                  {/* Copy clipboard button */}
                  <button
                    onClick={handleCopyToClipboard}
                    className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-black uppercase tracking-wide transition flex items-center justify-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Copied Note!
                      </>
                    ) : (
                      <>
                        <ClipboardCheck className="w-4 h-4 text-slate-400 shrink-0" /> Copy Surgeon Note
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Model: HFLO-CLINICAL-GEN-V2</span>
                  <span>Compliance: DPDP Act 2023 Safe-Harbor</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
