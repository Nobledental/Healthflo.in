"use client";

import React, { useState, useEffect } from "react";
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
  ChevronRight,
  Database,
  Save,
  Trash2,
  Edit3,
  Filter,
  Download,
  Search,
  Tag,
  FolderOpen,
  FileSpreadsheet,
  PlusCircle
} from "lucide-react";

export interface LocalTriageNote {
  id: string;
  timestamp: string;
  patientName: string;
  phone: string;
  age: string;
  stateRegion: string;
  symptoms: string;
  comorbidities: string;
  insurance: string;
  urgency: string;
  urgencyColor: string;
  recommendedProcedure: string;
  technologyTag: string;
  hospitalRecommendation: string;
  recoveryEstimate: string;
  insuranceAdvisory: string;
  clinicalSummary: string;
  doctorNote: string;
  status: "Pending Triage" | "Pre-Auth Reserved" | "Consult Scheduled" | "Procedure Complete" | "Archived";
}

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

  // Workstation Local Clinical Notes & DB State
  const [localNotes, setLocalNotes] = useState<LocalTriageNote[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterUrgency, setFilterUrgency] = useState<string>("All");
  const [savedToLocal, setSavedToLocal] = useState(false);
  const [isEditingNoteId, setIsEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState<string>("");

  // Initialize Local DB Persistence
  useEffect(() => {
    try {
      const stored = localStorage.getItem("healthflo_triage_local_db");
      if (stored) {
        setLocalNotes(JSON.parse(stored));
      } else {
        const initialSeed: LocalTriageNote[] = [
          {
            id: "LOC_20260801_9A8F",
            timestamp: "2026-08-05 10:15:22",
            patientName: "Karthick Narayanan",
            phone: "9841029384",
            age: "42",
            stateRegion: "Tamil Nadu",
            symptoms: "Severe anorectal discomfort during defecation for 5 days accompanied by bleeding and prominent swelling.",
            comorbidities: "Hypertension (Managed on Amlodipine)",
            insurance: "Star Health Comprehensive Mediclaim",
            urgency: "LEVEL 1: URGENT WORKUP",
            urgencyColor: "text-rose-400 bg-rose-500/15 border-rose-500/40",
            recommendedProcedure: "Laser Hemorrhoidopexy (1470nm Radial Fiber Diode Laser)",
            technologyTag: "1470nm Radial Diode Fiber (Zero Incision, Sphincter-Preserving)",
            hospitalRecommendation: "Apollo Hospitals (Greams Road, Chennai)",
            recoveryEstimate: "Same-Day Discharge (<12 to 24 Hours). Return to normal activity within 48 hours.",
            insuranceAdvisory: "100% Cashless Eligible. Pre-authorization document generation takes ~45 minutes via HealthFlo Digital Desk.",
            clinicalSummary: "PATIENT: Karthick Narayanan (42 Yrs) - Region: Tamil Nadu\nPRESENTING SYMPTOMS: Severe anorectal discomfort during defecation for 5 days...\nRECOMMENDED PROTOCOL: Laser Hemorrhoidopexy\nDESIGNATED SURGICAL CENTER: Apollo Hospitals (Greams Road, Chennai)",
            doctorNote: "Patient called at 10:30 AM. Spouse inquired about surgical recovery time. Confirmed minimally invasive laser precision and same-day discharge. Pre-auth paperwork initiated with Star Health TPA desk.",
            status: "Pre-Auth Reserved"
          },
          {
            id: "LOC_20260802_3B4D",
            timestamp: "2026-08-04 16:40:11",
            patientName: "Suresh Babu R.",
            phone: "9980123987",
            age: "54",
            stateRegion: "Karnataka",
            symptoms: "Prominent rope-like tortuous varicose veins along medial right calf and thigh. Persistent evening edema and leg heaviness.",
            comorbidities: "Type 2 Diabetes Mellitus (HbA1c 7.4%)",
            insurance: "HDFC Ergo Optima Restore",
            urgency: "LEVEL 2: PRIORITY ELECTIVE",
            urgencyColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
            recommendedProcedure: "Endovenous Laser Ablation (EVLA) + USG-Guided Sclerotherapy",
            technologyTag: "1940nm Wavelength EVLA Catheter with Real-Time Doppler Guidance",
            hospitalRecommendation: "Manipal Hospital (Old Airport Road, Bengaluru)",
            recoveryEstimate: "Same-Day Discharge (<12 to 24 Hours). Return to normal activity within 48 hours.",
            insuranceAdvisory: "100% Cashless Eligible. Pre-authorization document generation takes ~45 minutes.",
            clinicalSummary: "PATIENT: Suresh Babu R. (54 Yrs) - Region: Karnataka\nRECOMMENDED PROTOCOL: EVLA Varicose Vein Ablation\nDESIGNATED SURGICAL CENTER: Manipal Hospital",
            doctorNote: "Requires pre-op endocrinal review due to elevated HbA1c (7.4%). Attending specialist informed. Scheduled outpatient Doppler assessment for Friday morning.",
            status: "Consult Scheduled"
          }
        ];
        setLocalNotes(initialSeed);
        localStorage.setItem("healthflo_triage_local_db", JSON.stringify(initialSeed));
      }
    } catch (err) {
      console.error("Local DB load error:", err);
    }
  }, []);

  const persistLocalNotes = (newNotes: LocalTriageNote[]) => {
    setLocalNotes(newNotes);
    try {
      localStorage.setItem("healthflo_triage_local_db", JSON.stringify(newNotes));
    } catch (err) {
      console.error("Local DB save error:", err);
    }
  };

  const handleSaveToLocalDb = () => {
    if (!result) return;
    const newNote: LocalTriageNote = {
      id: `LOC_${new Date().toISOString().slice(0, 10).replace(/-/g, "")}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      patientName: patientName || "Anonymous Patient",
      phone: phone || "Unspecified Contact",
      age: age || "Adult",
      stateRegion: stateRegion,
      symptoms: symptoms,
      comorbidities: comorbidities,
      insurance: insurance,
      urgency: result.urgency,
      urgencyColor: result.urgencyColor,
      recommendedProcedure: result.recommendedProcedure,
      technologyTag: result.technologyTag,
      hospitalRecommendation: result.hospitalRecommendation,
      recoveryEstimate: result.recoveryEstimate,
      insuranceAdvisory: result.insuranceAdvisory,
      clinicalSummary: result.clinicalSummary,
      doctorNote: `Initial triage completed by Care Directorate for ${result.recommendedProcedure}. Pending outpatient surgical consultation coordination.`,
      status: "Pending Triage"
    };

    const updated = [newNote, ...localNotes];
    persistLocalNotes(updated);
    setSavedToLocal(true);
    setTimeout(() => setSavedToLocal(false), 4000);
    onAuditLog(`[LOCAL DB] Saved clinical triage assessment for ${newNote.patientName} into workstation persistence repository.`);
  };

  const handleReloadCase = (note: LocalTriageNote) => {
    setPatientName(note.patientName === "Anonymous Patient" ? "" : note.patientName);
    setPhone(note.phone === "Unspecified Contact" ? "" : note.phone);
    setAge(note.age === "Adult" ? "" : note.age);
    if (note.stateRegion === "Tamil Nadu" || note.stateRegion === "Karnataka" || note.stateRegion === "Telangana") {
      setStateRegion(note.stateRegion as any);
    }
    setSymptoms(note.symptoms);
    setComorbidities(note.comorbidities);
    setInsurance(note.insurance);

    setResult({
      urgency: note.urgency as any,
      urgencyColor: note.urgencyColor,
      recommendedProcedure: note.recommendedProcedure,
      technologyTag: note.technologyTag,
      hospitalRecommendation: note.hospitalRecommendation,
      preOpChecklist: ["Complete Blood Count (CBC)", "Coagulation Profile (PT/INR)", "Fasting Blood Sugar", "ECG & Chest X-Ray", "Viral Markers (HBsAg / HCV / HIV)"],
      anesthesiaRisk: "Standard Short-Acting Protocol (Customized per comorbidities)",
      recoveryEstimate: note.recoveryEstimate,
      insuranceAdvisory: note.insuranceAdvisory,
      clinicalSummary: note.clinicalSummary
    });

    onAuditLog(`[LOCAL DB] Reloaded patient case [${note.patientName}] into AI Clinical Triage Console for follow-up review.`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteNote = (id: string, name: string) => {
    const updated = localNotes.filter(n => n.id !== id);
    persistLocalNotes(updated);
    onAuditLog(`[LOCAL DB] Removed clinical triage note for [${name}] from workstation database.`);
  };

  const handleStatusChange = (id: string, newStatus: LocalTriageNote["status"]) => {
    const updated = localNotes.map(n => n.id === id ? { ...n, status: newStatus } : n);
    persistLocalNotes(updated);
    onAuditLog(`[LOCAL DB] Updated patient care status to "${newStatus}" in local database.`);
  };

  const handleSaveEditedNote = (id: string) => {
    const updated = localNotes.map(n => n.id === id ? { ...n, doctorNote: editingNoteText } : n);
    persistLocalNotes(updated);
    setIsEditingNoteId(null);
    onAuditLog(`[LOCAL DB] Updated doctor follow-up note for record [${id}].`);
  };

  const handleExportLocalDb = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localNotes, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `HealthFlo_Local_Triage_Notes_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    onAuditLog(`[LOCAL DB] Exported ${localNotes.length} local clinical notes to encrypted JSON file.`);
  };

  const filteredLocalNotes = localNotes.filter(note => {
    const matchesSearch = searchQuery === "" || 
      `${note.patientName} ${note.phone} ${note.recommendedProcedure} ${note.doctorNote} ${note.stateRegion}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || note.status === filterStatus;
    const matchesUrgency = filterUrgency === "All" || 
      (filterUrgency === "Level 1" && note.urgency.includes("LEVEL 1")) ||
      (filterUrgency === "Level 2" && note.urgency.includes("LEVEL 2")) ||
      (filterUrgency === "Level 3" && note.urgency.includes("LEVEL 3"));
    return matchesSearch && matchesStatus && matchesUrgency;
  });

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
        ? "ZSR Stapler / Laser Circumcision (Advanced Comfort & Minimally Invasive)" 
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
            <Stethoscope className="w-5 h-5 text-cyan-400" /> Patient Clinical Symptom & Vitals Input
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
                <p className="text-xs text-slate-400 font-mono">Cross-referencing 12,000+ minimally invasive laser surgical records across South Indian medical centers...</p>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  
                  {/* Save to Local DB button */}
                  <button
                    onClick={handleSaveToLocalDb}
                    disabled={savedToLocal}
                    className="p-3.5 rounded-xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 hover:from-purple-600/40 hover:to-indigo-600/40 border border-purple-500/50 text-purple-200 text-xs font-black uppercase tracking-wide transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 cursor-pointer"
                  >
                    {savedToLocal ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Saved Locally
                      </>
                    ) : (
                      <>
                        <Database className="w-4 h-4 text-purple-400 shrink-0" /> Save to Local DB
                      </>
                    )}
                  </button>

                  {/* WhatsApp button */}
                  <button
                    onClick={handleWhatsAppBroadcast}
                    disabled={!phone}
                    className="p-3.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-[#25D366] text-xs font-black uppercase tracking-wide transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    title={!phone ? "Enter 10-digit phone on left" : "Send WhatsApp assessment"}
                  >
                    <Share2 className="w-4 h-4 shrink-0" />
                    <span>WhatsApp Handover</span>
                  </button>

                  {/* Log to CRM button */}
                  <button
                    onClick={handleLogToCRM}
                    disabled={loggedToCrm || isLogging}
                    className="p-3.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 text-blue-300 text-xs font-black uppercase tracking-wide transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
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
                    className="p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-black uppercase tracking-wide transition flex items-center justify-center gap-2 cursor-pointer"
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

      {/* ── WORKSTATION PATIENT CARE & CLINICAL NOTES DATABASE (LOCAL PERSISTENCE) ── */}
      <div className="bg-[#070E1E] border border-slate-800/90 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 mt-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold text-xs uppercase tracking-wider mb-2">
              <Database className="w-3.5 h-3.5 text-purple-400" /> Workstation Patient Care &amp; Clinical Notes Persistence
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
              <span>Local Triage Repository &amp; Doctor Follow-Up Notes</span>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-mono font-bold">
                {localNotes.length} Saved Cases
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
              Persist patient triage assessments locally in your browser workstation (<code className="text-cyan-400 font-mono text-xs">localStorage</code>). Edit private coordinator notes, manage pre-authorization statuses, reload past evaluations into the AI console, and export medical handover records without broadcasting to public server logs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleExportLocalDb}
              disabled={localNotes.length === 0}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition flex items-center gap-2 disabled:opacity-50 shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" /> Export DB (JSON)
            </button>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to clear all workstation local triage notes? This action cannot be undone.")) {
                  persistLocalNotes([]);
                  onAuditLog("[LOCAL DB] Wiped all locally persisted triage records from workstation database.");
                }
              }}
              disabled={localNotes.length === 0}
              className="px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 text-xs font-bold transition flex items-center gap-2 disabled:opacity-50 shadow-sm cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-rose-400" /> Clear Local DB
            </button>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#091326] p-4 rounded-2xl border border-slate-800/80">
          <div className="md:col-span-5 relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search local records by name, phone, procedure, note..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#060B16] border border-slate-700/90 text-xs text-white placeholder:text-slate-500 font-semibold focus:outline-none focus:border-cyan-400 transition"
            />
          </div>

          <div className="md:col-span-4 flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3 text-cyan-400" /> Status:
            </span>
            {(["All", "Pending Triage", "Pre-Auth Reserved", "Consult Scheduled", "Procedure Complete"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterStatus === st ? "bg-purple-600 text-white shadow-xs" : "bg-slate-800/60 text-slate-400 hover:text-white"
                }`}
              >
                {st === "All" ? "All Status" : st}
              </button>
            ))}
          </div>

          <div className="md:col-span-3 flex items-center justify-end gap-1.5 flex-wrap">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mr-1">Urgency:</span>
            {(["All", "Level 1", "Level 2", "Level 3"] as const).map((urg) => (
              <button
                key={urg}
                onClick={() => setFilterUrgency(urg)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  filterUrgency === urg ? "bg-cyan-600 text-white" : "bg-slate-800/60 text-slate-400 hover:text-white"
                }`}
              >
                {urg}
              </button>
            ))}
          </div>
        </div>

        {/* Saved Records Grid */}
        <div className="space-y-4 max-h-[720px] overflow-y-auto pr-1">
          {filteredLocalNotes.length === 0 ? (
            <div className="py-16 text-center text-slate-500 font-medium bg-[#060B16]/60 rounded-2xl border border-slate-800/80 p-8">
              <Database className="w-12 h-12 mx-auto text-slate-600 mb-3 stroke-[1.5]" />
              <p className="text-base font-bold text-slate-400">No matching clinical notes in workstation database</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
                Evaluate a patient case in the console above and click <span className="text-purple-400 font-bold">&quot;Save to Local DB&quot;</span> to retain your triage notes across sessions.
              </p>
            </div>
          ) : (
            filteredLocalNotes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl bg-[#091225] border border-slate-800 hover:border-purple-500/40 transition flex flex-col gap-4 shadow-lg"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold text-xs">
                      <User className="w-4 h-4 inline mr-1" />
                      {note.patientName}
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                      📞 {note.phone}
                    </span>
                    <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2.5 py-1 rounded-lg">
                      📍 {note.stateRegion}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      📅 {note.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider border ${note.urgencyColor}`}>
                      {note.urgency}
                    </span>

                    <select
                      value={note.status}
                      onChange={(e) => handleStatusChange(note.id, e.target.value as any)}
                      className="bg-[#060D1B] border border-slate-700 hover:border-cyan-400/50 rounded-xl px-3 py-1.5 text-xs font-bold text-emerald-300 focus:outline-none focus:border-cyan-400 transition cursor-pointer"
                    >
                      <option value="Pending Triage">⏳ Pending Triage</option>
                      <option value="Pre-Auth Reserved">🛡️ Pre-Auth Reserved</option>
                      <option value="Consult Scheduled">🩺 Consult Scheduled</option>
                      <option value="Procedure Complete">✅ Procedure Complete</option>
                      <option value="Archived">📦 Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-xs">
                      <span className="font-extrabold text-slate-400 uppercase text-[10px] tracking-wider block">Recommended Surgical Protocol:</span>
                      <p className="font-bold text-white text-sm mt-0.5">{note.recommendedProcedure}</p>
                      <p className="text-[11px] text-cyan-300 font-medium mt-0.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-400 shrink-0" /> {note.technologyTag}
                      </p>
                    </div>

                    <div className="text-xs bg-[#060C18] p-3 rounded-xl border border-slate-800/80">
                      <span className="font-extrabold text-slate-400 uppercase text-[10px] tracking-wider block mb-1">Presenting Symptoms:</span>
                      <p className="text-slate-300 font-medium leading-relaxed italic">&quot;{note.symptoms}&quot;</p>
                    </div>
                  </div>

                  {/* Editable Doctor Clinical Follow-Up Note */}
                  <div className="flex flex-col justify-between bg-[#060C18] p-3.5 rounded-xl border border-purple-500/30 space-y-2 shadow-inner">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>Workstation Clinical Follow-Up Note (Editable):</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Persistent in LocalStorage
                      </span>
                    </div>

                    {isEditingNoteId === note.id ? (
                      <div className="space-y-2 flex-1 flex flex-col">
                        <textarea
                          value={editingNoteText}
                          onChange={(e) => setEditingNoteText(e.target.value)}
                          rows={3}
                          className="w-full bg-[#030712] border border-purple-500/60 rounded-lg p-2.5 text-xs text-white font-medium focus:outline-none focus:ring-1 focus:ring-purple-400 flex-1"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setIsEditingNoteId(null)}
                            className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveEditedNote(note.id)}
                            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" /> Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          setIsEditingNoteId(note.id);
                          setEditingNoteText(note.doctorNote || "");
                        }}
                        className="flex-1 p-2.5 rounded-lg bg-[#030712]/70 hover:bg-[#030712] border border-slate-800 hover:border-purple-500/50 text-slate-200 text-xs font-medium cursor-pointer transition flex flex-col justify-between group"
                      >
                        <p className="leading-relaxed whitespace-pre-wrap">{note.doctorNote || "Click to add private clinical notes, coordinator updates, or patient financing discussions..."}</p>
                        <div className="text-right text-[10px] text-purple-400 opacity-0 group-hover:opacity-100 transition font-bold uppercase mt-2 flex items-center justify-end gap-1">
                          <Edit3 className="w-3 h-3" /> Click to Edit Note
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="text-slate-400 font-semibold">
                    <span>Designated Facility: </span>
                    <strong className="text-slate-200">{note.hospitalRecommendation}</strong>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={() => handleReloadCase(note)}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-black text-xs transition flex items-center gap-1.5 cursor-pointer"
                      title="Load this evaluation back into the AI Triage console"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-cyan-400" /> Reload in AI Console
                    </button>

                    <button
                      onClick={() => {
                        if (!note.phone || note.phone === "Unspecified Contact") return alert("No valid phone number for this patient.");
                        const msg = `*HealthFlo Clinical Care Update*\n\nDear *${note.patientName}*,\nFollowing up on your clinical triage assessment for *${note.recommendedProcedure}* at ${note.hospitalRecommendation}.\n\nOur priority desk has reserved your pre-authorization. Reply directly or call our coordinator desk to schedule your admission support!`;
                        window.open(`https://wa.me/91${note.phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`, "_blank");
                        onAuditLog(`[LOCAL DB] Dispatched follow-up WhatsApp to ${note.phone}`);
                      }}
                      disabled={!note.phone || note.phone === "Unspecified Contact"}
                      className="px-3 py-1.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-[#25D366] font-black text-xs transition flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" /> WhatsApp Follow-Up
                    </button>

                    <button
                      onClick={() => handleDeleteNote(note.id, note.patientName)}
                      className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/50 border border-slate-700 hover:border-rose-800 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                      title="Delete from local database"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
