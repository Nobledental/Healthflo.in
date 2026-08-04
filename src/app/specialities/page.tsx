"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import { specialitiesData } from "@/data/specialities";
import { 
  MagnifyingGlass, 
  Sparkle, 
  Heartbeat, 
  FirstAid, 
  Lightning, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  LockKey, 
  Car, 
  Stethoscope, 
  CaretRight,
  Hospital
} from "@phosphor-icons/react";

// Exhaustive catalogue of Major Hospital Surgeries & Inpatient Procedures
interface ProcedureItem {
  name: string;
  dept: string;
  type: string;
  stay: string;
  anesthesia: string;
}

const comprehensiveProcedures: ProcedureItem[] = [
  // Urology & Kidney (CKD) Care
  { name: "HAEMO-DIALYSIS (Per Sitting - Advanced CKD Support)", dept: "Urology & Kidney Care", type: "Daycare Session", stay: "4 Hours", anesthesia: "Local / No Anesthesia" },
  { name: "ESWL (Extra-corporeal Shock Wave Lithotripsy - Stone Smash)", dept: "Urology & Kidney Care", type: "Non-Invasive Daycare", stay: "Same Day", anesthesia: "Mild Sedation" },
  { name: "RIRS WITH CYSTOSCOPY WITH DJ STENT (Laser Stone Removal)", dept: "Urology & Kidney Care", type: "Advanced Laser Surgery", stay: "24 Hours (1 Night)", anesthesia: "Spinal / General" },
  { name: "PCNL + CYSTOSCOPY WITH DJ STENT (Large Kidney Stone Surgery)", dept: "Urology & Kidney Care", type: "Keyhole Renal Surgery", stay: "48 Hours (2 Nights)", anesthesia: "General Anesthesia" },
  { name: "URSL / LASER LITHOTRIPSY WITH DJ STENTING (Unilateral)", dept: "Urology & Kidney Care", type: "Laser Ureteroscopy", stay: "24 Hours (1 Night)", anesthesia: "Spinal / General" },
  { name: "CYSTOSCOPY WITH DJ STENTING", dept: "Urology & Kidney Care", type: "Endoscopic Procedure", stay: "Daycare / 24 Hours", anesthesia: "Spinal / Sedation" },
  { name: "CYSTOSCOPY (DIAGNOSTIC) / STENT REMOVAL", dept: "Urology & Kidney Care", type: "Daycare Procedure", stay: "2-3 Hours", anesthesia: "Local Gel / Mild Sedation" },
  { name: "TURP (Trans-Urethral Resection of Prostate - Enlarged Prostate)", dept: "Urology & Kidney Care", type: "Endoscopic Surgery", stay: "48 Hours (2 Nights)", anesthesia: "Spinal / General" },
  { name: "TURBT (Trans-Urethral Resection of Bladder Tumor)", dept: "Urology & Kidney Care", type: "Onco-Urology Surgery", stay: "48-72 Hours", anesthesia: "Spinal / General" },
  { name: "HYDROCELE SURGERY - UNILATERAL", dept: "Urology & Kidney Care", type: "Daycare Surgical Repair", stay: "Same Day / 24 Hours", anesthesia: "Spinal Anesthesia" },
  { name: "ORCHIDOPEXY / ORCHIDECTOMY", dept: "Urology & Kidney Care", type: "Specialized Urologic Surgery", stay: "24-48 Hours", anesthesia: "General / Spinal" },
  { name: "MEATOTOMY / MEATOPLASTY (Urethral Opening Repair)", dept: "Urology & Kidney Care", type: "Minor Reconstruction", stay: "Same Day", anesthesia: "Local / Mild Sedation" },

  // Laparoscopic & General Surgery
  { name: "CHOLECYSTECTOMY - LAPAROSCOPIC (Keyhole Gallbladder Stone Removal)", dept: "Laparoscopic & General", type: "Keyhole Surgery", stay: "24 Hours (1 Night)", anesthesia: "General Anesthesia" },
  { name: "CHOLECYSTECTOMY - OPEN (Conventional Gallbladder Surgery)", dept: "Laparoscopic & General", type: "Open Major Surgery", stay: "72 Hours (3 Nights)", anesthesia: "General Anesthesia" },
  { name: "APPENDICECTOMY - LAPAROSCOPIC (Keyhole Appendix Removal)", dept: "Laparoscopic & General", type: "Keyhole Surgery", stay: "24 Hours (1 Night)", anesthesia: "General Anesthesia" },
  { name: "APPENDICECTOMY - OPEN (Conventional Appendix Surgery)", dept: "Laparoscopic & General", type: "Open Surgical Repair", stay: "48-72 Hours", anesthesia: "General Anesthesia" },
  { name: "THYROIDECTOMY - TOTAL / SUB-TOTAL (Thyroid Gland Surgery)", dept: "Laparoscopic & General", type: "Major Endocrine Surgery", stay: "48 Hours (2 Nights)", anesthesia: "General Anesthesia" },
  { name: "HEMI THYROIDECTOMY (Partial Thyroid Excision)", dept: "Laparoscopic & General", type: "Endocrine Surgery", stay: "24-48 Hours", anesthesia: "General Anesthesia" },
  { name: "ENDOSCOPY + OESOPHAGEAL VARICEAL BANDING", dept: "Laparoscopic & General", type: "GI Endoscopic Therapy", stay: "24 Hours (1 Night)", anesthesia: "Sedation / Throat Spray" },
  { name: "ERCP WITH SPHINCTEROTOMY WITH STONE EXTRACTION (Bile Duct)", dept: "Laparoscopic & General", type: "Advanced Therapeutic Endoscopy", stay: "24-48 Hours", anesthesia: "Conscious Sedation" },
  { name: "PILONIDAL SINUS - PRIMARY CLOSURE / FLAP REPAIR", dept: "Laparoscopic & General", type: "Surgical Repair", stay: "24 Hours (1 Night)", anesthesia: "Spinal / General" },
  { name: "PERIANAL ABSCESS SURGICAL DRAINAGE & DEBRIDEMENT", dept: "Laparoscopic & General", type: "Emergency Proctology", stay: "Same Day / 24 Hours", anesthesia: "Spinal / General" },

  // Hernia Surgery & Mesh Protocols
  { name: "LAP INGUINAL HERNIOPLASTY - UNILATERAL (Ex Mesh & Disposable Trocar)", dept: "Hernia & Mesh Protocols", type: "Keyhole Hernia Repair", stay: "24 Hours (1 Night)", anesthesia: "General Anesthesia" },
  { name: "LAP INGUINAL HERNIOPLASTY - BILATERAL (Ex Mesh & Disposable Trocar)", dept: "Hernia & Mesh Protocols", type: "Keyhole Bilateral Repair", stay: "24-48 Hours", anesthesia: "General Anesthesia" },
  { name: "INGUINAL HERNIOPLASTY - UNILATERAL (Open Repair - Ex Mesh)", dept: "Hernia & Mesh Protocols", type: "Open Mesh Surgery", stay: "48 Hours (2 Nights)", anesthesia: "Spinal Anesthesia" },
  { name: "INGUINAL HERNIOPLASTY - BILATERAL (Open Repair - Ex Mesh)", dept: "Hernia & Mesh Protocols", type: "Open Mesh Surgery", stay: "48-72 Hours", anesthesia: "Spinal Anesthesia" },
  { name: "INGUINAL HERNIORRAPHY - UNILATERAL / BILATERAL (Without Mesh)", dept: "Hernia & Mesh Protocols", type: "Anatomical Tissue Repair", stay: "48 Hours (2 Nights)", anesthesia: "Spinal Anesthesia" },
  { name: "LAP UMBILICAL HERNIOPLASTY (Ex Mesh & Disposable Trocar)", dept: "Hernia & Mesh Protocols", type: "Keyhole Umbilical Repair", stay: "24 Hours (1 Night)", anesthesia: "General Anesthesia" },
  { name: "UMBILICAL HERNIORRAPHY / HERNIOPLASTY (Open Repair - Ex Mesh)", dept: "Hernia & Mesh Protocols", type: "Open Abdominal Wall Repair", stay: "48 Hours (2 Nights)", anesthesia: "Spinal / General" },
  { name: "LAP INCISIONAL / VENTRAL HERNIOPLASTY (Ex Mesh & Disposable Trocar)", dept: "Hernia & Mesh Protocols", type: "Keyhole Ventral Repair", stay: "48 Hours (2 Nights)", anesthesia: "General Anesthesia" },
  { name: "INCISIONAL / VENTRAL HERNIOPLASTY (Open Repair - Ex Mesh)", dept: "Hernia & Mesh Protocols", type: "Major Abdominal Reconstruction", stay: "72 Hours (3 Nights)", anesthesia: "General Anesthesia" },

  // Orthopedic, Joint Replacement & Fracture Trauma
  { name: "TOTAL KNEE REPLACEMENT (Unilateral) WITH NAVIGATION (Excluding Implant)", dept: "Orthopedics & Joint Care", type: "Computer-Navigated Arthroplasty", stay: "4 to 5 Days", anesthesia: "Spinal / Epidural" },
  { name: "TOTAL KNEE REPLACEMENT (Bilateral) WITH NAVIGATION (Excluding Implant)", dept: "Orthopedics & Joint Care", type: "Bilateral Navigated Replacement", stay: "5 to 6 Days", anesthesia: "Spinal / Epidural" },
  { name: "TOTAL HIP REPLACEMENT (Unilateral) WITH NAVIGATION (Excluding Implant)", dept: "Orthopedics & Joint Care", type: "Navigated Hip Arthroplasty", stay: "4 to 5 Days", anesthesia: "Spinal / Epidural" },
  { name: "BIPOLAR ARTHROPLASTY (Hip Hemiarthroplasty for Fractures)", dept: "Orthopedics & Joint Care", type: "Orthopedic Hip Repair", stay: "3 to 4 Days", anesthesia: "Spinal / General" },
  { name: "# NECK FEMUR FIXATION (DHS / PFN / Nailing & Plating / Cancellous Screw)", dept: "Orthopedics & Joint Care", type: "Major Hip Fracture Surgery", stay: "3 to 5 Days", anesthesia: "Spinal / General" },
  { name: "ORIF # SHAFT OF FEMUR (Open Reduction Internal Fixation of Thigh Bone)", dept: "Orthopedics & Joint Care", type: "Major Long Bone Surgery", stay: "4 to 5 Days", anesthesia: "Spinal / General" },
  { name: "ORIF # LONG BONE (Except Femur - Tibia, Humerus, Forearm)", dept: "Orthopedics & Joint Care", type: "Fracture Plating & Nailing", stay: "2 to 3 Days", anesthesia: "Regional Block / General" },
  { name: "ORIF FOR FRACTURES OF WRIST, ELBOW, ANKLE, OR KNEE JOINT", dept: "Orthopedics & Joint Care", type: "Joint Trauma Fixation", stay: "2 to 3 Days", anesthesia: "Regional Block / General" },
  { name: "ACL / PCL RECONSTRUCTION & MENISCECTOMY (Sports Med Keyhole)", dept: "Orthopedics & Joint Care", type: "Arthroscopic Ligament Surgery", stay: "24-48 Hours", anesthesia: "Spinal / Regional" },
  { name: "ARTHROSCOPIC SURGERY (Diagnostic / Synovectomy Other Than ACL / Meniscus)", dept: "Orthopedics & Joint Care", type: "Keyhole Joint Exploration", stay: "24 Hours (1 Night)", anesthesia: "Spinal / Regional" },
  { name: "CLOSED REDUCTION WITH K-WIRE FIXATION OF SHORT BONES (Hand/Foot)", dept: "Orthopedics & Joint Care", type: "Minimally Invasive Fracture Fix", stay: "Same Day / 24 Hours", anesthesia: "Local / Regional Block" },
  { name: "CLOSED REDUCTION WITH K-WIRE FIXATION OF LONG BONES", dept: "Orthopedics & Joint Care", type: "Percutaneous Fracture Pinning", stay: "24-48 Hours", anesthesia: "Regional / General" },
  { name: "SURGICAL IMPLANT / PLATE REMOVAL - LONG BONES", dept: "Orthopedics & Joint Care", type: "Hardware Extraction Surgery", stay: "24 Hours (1 Night)", anesthesia: "Spinal / General" },
  { name: "SURGICAL IMPLANT / SCREW REMOVAL - SHORT BONES", dept: "Orthopedics & Joint Care", type: "Minor Hardware Extraction", stay: "Same Day", anesthesia: "Local / Regional Block" },

  // Breast Care & Surgical Oncology
  { name: "BREAST LUMPECTOMY (Benign Tumor / Fibroadenoma Excision under GA)", dept: "Breast & Oncology Care", type: "Breast Preservation Surgery", stay: "Same Day / 24 Hours", anesthesia: "General Anesthesia" },
  { name: "SIMPLE MASTECTOMY (Complete Breast Tissue Removal)", dept: "Breast & Oncology Care", type: "Onco-Surgical Procedure", stay: "48-72 Hours", anesthesia: "General Anesthesia" },
  { name: "MODIFIED RADICAL MASTECTOMY (MRM with Lymph Node Clearance)", dept: "Breast & Oncology Care", type: "Major Cancer Surgery", stay: "3 to 4 Days", anesthesia: "General Anesthesia" },
  { name: "BCS (Breast Conserving Surgery) WITH AXILLARY NODE DISSECTION", dept: "Breast & Oncology Care", type: "Precision Oncology & Aesthetics", stay: "48-72 Hours", anesthesia: "General Anesthesia" },

  // Gynecology, Minimally Invasive & Pelvic Surgery
  { name: "TOTAL LAPAROSCOPIC HYSTERECTOMY (Keyhole Uterus Removal Surgery)", dept: "Gynecology & Pelvic Care", type: "Keyhole Pelvic Surgery", stay: "48 Hours (2 Nights)", anesthesia: "General Anesthesia" },
  { name: "LAPAROSCOPIC MYOMECTOMY (Keyhole Fibroid Excision & Uterine Conservation)", dept: "Gynecology & Pelvic Care", type: "Uterine Preservation Surgery", stay: "24-48 Hours", anesthesia: "General Anesthesia" },
  { name: "LAPAROSCOPIC OVARIAN CYSTECTOMY (Removal of Complex Ovarian Cysts / Endometriomas)", dept: "Gynecology & Pelvic Care", type: "Keyhole Cyst Removal", stay: "24 Hours (1 Night)", anesthesia: "General Anesthesia" },
  { name: "DIAGNOSTIC & OPERATIVE HYSTEROSCOPY (Endoscopic Uterine Cavity Exploration)", dept: "Gynecology & Pelvic Care", type: "Endoscopic Daycare", stay: "Same Day (Few Hours)", anesthesia: "Short General / Sedation" },
  { name: "SURGICAL MANAGEMENT OF ECTOPIC PREGNANCY (Laparoscopic Salpingectomy)", dept: "Gynecology & Pelvic Care", type: "Emergency Laparoscopy", stay: "24-48 Hours", anesthesia: "General Anesthesia" },

  // ENT, Sinus & Ear Reconstruction
  { name: "TONSILLECTOMY (Advanced Laser / Coblation Excision of Tonsils)", dept: "ENT & Sinus Care", type: "Coblation / Laser Surgery", stay: "Same Day / 24 Hours", anesthesia: "General Anesthesia" },
  { name: "SEPTOPLASTY (Correction of Deviated Nasal Septum / DNS & Sinusitis)", dept: "ENT & Sinus Care", type: "Nasal Airway Surgery", stay: "24 Hours (1 Night)", anesthesia: "General Anesthesia" },
  { name: "FESS (Functional Endoscopic Sinus Surgery for Polyps & Chronic Infection)", dept: "ENT & Sinus Care", type: "Endoscopic Sinus Clearance", stay: "24 Hours (1 Night)", anesthesia: "General Anesthesia" },
  { name: "TYMPANOPLASTY (Micro-Surgical Eardrum Perforation Repair & Grafting)", dept: "ENT & Sinus Care", type: "Micro-Ear Surgery", stay: "Same Day / 24 Hours", anesthesia: "Local / General" },
  { name: "MYRINGOTOMY WITH GROMMET INSERTION (Middle Ear Fluid Drainage)", dept: "ENT & Sinus Care", type: "Daycare Ear Protocol", stay: "2-3 Hours (Walk-out)", anesthesia: "General / Mild Sedation" },
  { name: "MASTOIDECTOMY (Surgical Eradicating Chronic Ear Infection / Cholesteatoma)", dept: "ENT & Sinus Care", type: "Major Otology Surgery", stay: "24-48 Hours", anesthesia: "General Anesthesia" },

  // Men's Specialized Surgery & Bariatric Metabolism
  { name: "GYNECOMASTIA SURGERY (Glandular Excision with Vaser / Laser Liposuction)", dept: "Men's Surgery & Bariatrics", type: "Aesthetic Chest Reduction", stay: "Same Day / 24 Hours", anesthesia: "General / Local Sedation" },
  { name: "VARICOCELE MICROSURGICAL LIGATION / EMBOLIZATION (Infertility & Vein Care)", dept: "Men's Surgery & Bariatrics", type: "Microsurgical Repair", stay: "Same Day / 24 Hours", anesthesia: "Spinal / Local Sedation" },
  { name: "PENILE FRENULECTOMY (Laser Release of Tight Penile Frenulum)", dept: "Men's Surgery & Bariatrics", type: "Laser Daycare Protocol", stay: "Walk-in & Walk-out (30 Mins)", anesthesia: "Local Gel / Anesthesia" },
  { name: "LAPAROSCOPIC SLEEVE GASTRECTOMY (Metabolic Bariatric Surgery for Weight Management)", dept: "Men's Surgery & Bariatrics", type: "Metabolic Keyhole Surgery", stay: "3 to 4 Days", anesthesia: "General Anesthesia" },
  { name: "LAPAROSCOPIC ROUX-EN-Y GASTRIC BYPASS (Advanced Bariatric Weight & Diabetes Surgery)", dept: "Men's Surgery & Bariatrics", type: "Advanced Metabolic Bypass", stay: "3 to 5 Days", anesthesia: "General Anesthesia" },

  // Vascular & Advanced Vein Therapies
  { name: "EVLT / RFA (Endovenous Laser / Radiofrequency Ablation for Varicose Veins)", dept: "Vascular & Vein Care", type: "Laser Vein Ablation", stay: "Daycare (No Stay Required)", anesthesia: "Local / Spinal" },
  { name: "MICROPHLEBECTOMY & ULTRASOUND-GUIDED SCLEROTHERAPY", dept: "Vascular & Vein Care", type: "Minimally Invasive Vein Care", stay: "Walk-in & Walk-out", anesthesia: "Local Anesthesia" },
  { name: "DIABETIC FOOT ULCER SURGICAL DEBRIDEMENT & VASCULAR RESCUE", dept: "Vascular & Vein Care", type: "Limb Preservation Protocol", stay: "24 to 72 Hours", anesthesia: "Spinal / Regional Block" },
  { name: "AV FISTULA CREATION SURGERY (Vascular Access for Hemodialysis Patients)", dept: "Vascular & Vein Care", type: "Vascular Access Surgery", stay: "Same Day / 24 Hours", anesthesia: "Local / Regional Block" },

  // Ophthalmology, Foot & Minor General Procedures
  { name: "FEMTO-LASIK / CONTOURA VISION (Robotic Blade-Free Refractive Vision Correction)", dept: "Ophthalmology & Minor Care", type: "Blade-Free Laser Vision", stay: "20-30 Minutes (Walk-out)", anesthesia: "Topical Eye Drops" },
  { name: "CATARACT SURGERY WITH IOL IMPLANTATION (Phaco-emulsification & Foldable Lens)", dept: "Ophthalmology & Minor Care", type: "Phaco / Laser Eye Surgery", stay: "30-60 Minutes (0 Nights)", anesthesia: "Local Eye Drops (Topical)" },
  { name: "SQUINT EYE CORRECTION SURGERY (Ocular Muscle Alignment Protocol)", dept: "Ophthalmology & Minor Care", type: "Ocular Muscle Surgery", stay: "Same Day (Few Hours)", anesthesia: "Local / General" },
  { name: "GLAUCOMA FILTRATION SURGERY (Trabeculectomy with Mitomycin-C)", dept: "Ophthalmology & Minor Care", type: "Ocular Pressure Relief", stay: "Same Day / 24 Hours", anesthesia: "Local Block / Drops" },
  { name: "VITREORETINAL SURGERY (Retinal Detachment / Macular Hole Repair)", dept: "Ophthalmology & Minor Care", type: "Advanced Retinal Surgery", stay: "24 Hours (1 Night)", anesthesia: "Local / General" },
  { name: "CORN FOOT EXCISIONAL SURGERY (Deep Root Removal & Cauterization)", dept: "Ophthalmology & Minor Care", type: "Minor Foot Surgery", stay: "Same Day (30 Mins)", anesthesia: "Local Anesthesia Block" },
  { name: "CARPAL TUNNEL RELEASE (Wrist Nerve Decompression Surgery)", dept: "Ophthalmology & Minor Care", type: "Hand & Nerve Surgery", stay: "Same Day / 24 Hours", anesthesia: "Local / Regional Block" },
  { name: "CYST / TUMOR / LIPOMA EXCISION SURGERY - BIG / MULTIPLE", dept: "Ophthalmology & Minor Care", type: "Surgical Excision & Histopathology", stay: "Same Day / 24 Hours", anesthesia: "Local / Mild Sedation" },
  { name: "CYST / TUMOR / LIPOMA / SEBACEOUS CYST EXCISION - SMALL", dept: "Ophthalmology & Minor Care", type: "Minor Surgical Procedure", stay: "Walk-in & Walk-out (1 Hour)", anesthesia: "Local Anesthesia" },
];

export default function SpecialitiesDirectory() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDept, setSelectedDept] = useState<string>("All Departments");

  const primaryLaserProcedures = Object.values(specialitiesData);

  const departments = [
    "All Departments",
    "Urology & Kidney Care",
    "Laparoscopic & General",
    "Hernia & Mesh Protocols",
    "Orthopedics & Joint Care",
    "Gynecology & Pelvic Care",
    "ENT & Sinus Care",
    "Men's Surgery & Bariatrics",
    "Vascular & Vein Care",
    "Breast & Oncology Care",
    "Ophthalmology & Minor Care"
  ];

  const filteredHospitalProcedures = comprehensiveProcedures.filter((item) => {
    const matchesDept = selectedDept === "All Departments" || item.dept === selectedDept;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const filteredLaserSuites = primaryLaserProcedures.filter((item) => {
    return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  // Layman symptom indicators for each procedure so anxious patients immediately recognize their condition
  const getSymptomGuide = (id: string) => {
    const symptoms: Record<string, { label: string; icon: string }> = {
      "circumcision": { label: "For tight foreskin (Phimosis), repeated penile infection, itching, hygiene & comfort", icon: "👨‍⚕️" },
      "laser-piles": { label: "For painless stopping of rectal bleeding, painful hard lumps & sitting discomfort", icon: "🩹" },
      "fistula": { label: "For recurring pus discharge, painful infected tunnels around the anal region", icon: "🛡️" },
      "fissure": { label: "For sharp, knife-like burning pain during and after visits to the restroom", icon: "⚡" },
      "hernia": { label: "For painless repair of groin, umbilical or abdominal muscle bulge without large cuts", icon: "✨" },
      "lipoma-varicose": { label: "For painful throbbing blue leg veins & harmless fatty skin swellings (cysts)", icon: "🌿" }
    };
    return symptoms[id] || { label: "Advanced USFDA laser procedure for rapid same-day recovery", icon: "🏥" };
  };

  // Authentic Clinical Light Pearl Protocol Headers
  const getHeaderVisual = (index: number, category: string, usfdaProtocol: string) => {
    const lightGradients = [
      "from-[#EEF5FB] via-[#F6F9FD] to-[#E5EFF8]",
      "from-[#F0F6FA] via-[#EBF3FB] to-[#E3EDF7]",
      "from-[#EDF7FA] via-[#F4FAFC] to-[#E5F3F6]",
      "from-[#F2F6FC] via-[#F8FBFE] to-[#E8EEF8]",
      "from-[#EEF6FA] via-[#F5F9FD] to-[#E6F1F8]",
      "from-[#F0F6FA] via-[#F7FAFD] to-[#E8F0F8]"
    ];
    const gradient = lightGradients[index % lightGradients.length];
    
    return (
      <div className={`relative h-44 sm:h-48 w-full bg-gradient-to-br ${gradient} border-b border-slate-200/80 overflow-hidden flex flex-col justify-between p-4 sm:p-5 transition-all duration-300`}>
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(100, 116, 139, 0.3) 1px, transparent 1px)",
            backgroundSize: "16px 16px"
          }}
        ></div>
        <div className="absolute -right-10 -bottom-10 w-44 h-44 border border-blue-500/15 rounded-full opacity-60 pointer-events-none"></div>
        
        <div className="z-10 flex items-center justify-between w-full">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white shadow-xs text-[11px] font-extrabold text-[#0B2545] border border-slate-200/80 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            USFDA LASER APPROVED
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-blue-900 bg-blue-50/95 border border-blue-200/80 px-3 py-1 rounded-full shadow-2xs">
            <ShieldCheck weight="fill" className="text-blue-600 text-sm" />
            Insurance Eligible Suite
          </span>
        </div>

        <div className="z-10 mt-auto pt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 bg-white text-[#0B2545] font-black text-[11px] px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs uppercase tracking-wide">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full inline-block"></span>
            <span>{category}</span>
          </span>
          <span className="text-[10px] font-black text-slate-400 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/60 font-mono hidden sm:inline-block truncate max-w-[150px]">
            {usfdaProtocol.split(" ")[0]} PROTOCOL
          </span>
        </div>
      </div>
    );
  };

  const packageInclusions = [
    { title: "Initial Consultation", desc: "Complete assessment by senior departmental surgeon." },
    { title: "Surgeon & Specialists", desc: "100% professional surgical team fees covered." },
    { title: "Anaesthetist Charges", desc: "Specialized general, spinal or sedation doctor fees." },
    { title: "OT Room Charges", desc: "Modern sterile Operation Theatre usage & machinery." },
    { title: "Routine Consultations", desc: "Daily round visits by treating specialist during admission." },
    { title: "Hospital Room Charges", desc: "Clean twin-sharing or private AC room as per package tier." },
    { title: "24/7 Nursing Care", desc: "Dedicated round-the-clock ward & post-op nursing attention." },
    { title: "In-Patient Medicines", desc: "All necessary antibiotics, infusions & pain medication in hospital." },
    { title: "Routine Consumables", desc: "Surgical drapes, IV sets, sutures & surgical disposable kits." },
    { title: "Post-Op Consultation", desc: "One comprehensive free checkup after hospital discharge." },
    { title: "Dressing & Wound Care", desc: "Complimentary sterile dressing change on your first review visit." }
  ];

  return (
    <main 
      className="min-h-screen bg-[#F6F8FB] text-slate-900 flex flex-col pt-24 selection:bg-blue-600 selection:text-white font-sans"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(148, 163, 184, 0.22) 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }}
    >
      <Navbar />

      {/* Trust & Accreditation Top Ribbon */}
      <div className="bg-gradient-to-r from-[#0F2236] via-[#1A385A] to-[#0F2236] text-white py-2.5 px-4 text-center text-xs sm:text-sm font-extrabold tracking-wide shadow-sm border-b border-slate-800 flex items-center justify-center gap-4 flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-teal-300">
          <CheckCircle weight="fill" className="text-teal-400 w-4 h-4" />
          <span>NABH Accredited Surgical Centers</span>
        </span>
        <span className="hidden md:inline text-slate-600">|</span>
        <span className="inline-flex items-center gap-1.5">
          <Stethoscope weight="fill" className="text-blue-400 w-4 h-4" />
          <span>Complete Multispecialty Surgical Care</span>
        </span>
        <span className="hidden md:inline text-slate-600">|</span>
        <span className="inline-flex items-center gap-1.5 text-amber-300">
          <ShieldCheck weight="fill" className="text-amber-400 w-4 h-4" />
          <span>All Major Health Insurance Eligible</span>
        </span>
      </div>

      {/* Comprehensive Hospital Authority Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-10 sm:py-16 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-950 text-xs sm:text-sm font-extrabold tracking-wide shadow-2xs">
            <Sparkle weight="fill" className="text-blue-600 text-base" />
            <span>INSTITUTE OF DAYCARE & MULTISPECIALTY SURGERY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0B2545] leading-[1.14]">
            Multispecialty Surgical Care & <br className="hidden sm:inline" />
            <span className="text-blue-600">
              Advanced Laser Procedures
            </span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-medium">
            From 15-minute stitch-free laser daycare treatments for piles, fissure & circumcision, to major hospital procedures like Laparoscopic Gallbladder surgery, Total Knee Replacements with Navigation, Kidney Care (Lithotripsy, Dialysis & Stenting), and General Surgery—HealthFlo delivers world-class surgical excellence under transparent Insurance Eligible Health Packages.
          </p>

          {/* Master Search Desk */}
          <div className="w-full max-w-2xl mx-auto mt-8 px-2">
            <div className="bg-white border border-slate-300 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 rounded-2xl p-2.5 shadow-lg flex items-center gap-3 transition-all">
              <div className="pl-3 text-blue-600 flex items-center pointer-events-none">
                <MagnifyingGlass weight="bold" className="w-6 h-6" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search any surgery (e.g. Cataract, Dialysis, Knee Replacement, Gallbladder, Piles)..."
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-xs sm:text-sm md:text-base font-bold focus:outline-none pr-3 py-2"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors shrink-0"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Standard 11-Point Package Inclusions Guarantee Section (Supreme Trust Builder) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full mb-14">
        <div className="bg-white border-2 border-emerald-500/30 rounded-[2.5rem] p-6 sm:p-10 shadow-xl bg-gradient-to-br from-white via-[#F9FEFB] to-[#F2FBF7]">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-black uppercase tracking-wider">
              <ShieldCheck weight="fill" className="text-emerald-600 text-sm" />
              Complete Financial Transparency & Peace of Mind
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545]">
              What Every HealthFlo Surgical Package Includes ✅
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              We eliminate hospital billing anxiety. Whether undergoing a simple 15-minute daycare laser procedure or a major laparoscopic hospital surgery, your transparent HealthFlo package guarantees all 11 core medical milestones:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {packageInclusions.map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs hover:border-emerald-300 transition-colors flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  ✓
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">{item.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
            
            <div className="bg-gradient-to-br from-[#0B2545] to-[#16385F] text-white rounded-2xl p-4 shadow-md flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block">NO HIDDEN SURGERY BILLS</span>
                <h4 className="text-xs sm:text-sm font-black text-white mt-1">Insurance Policy Support</h4>
              </div>
              <a 
                href="https://wa.me/919363650066?text=Hello%20HealthFlo%20Desk%2C%20I%20want%20to%20verify%20my%20insurance%20policy%20eligibility%20for%20your%2011-point%20all-inclusive%20surgical%20package."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 bg-[#128C7E] hover:bg-[#0E7065] text-white font-extrabold text-[11px] py-2 px-3 rounded-xl transition-all text-center uppercase tracking-wide block shadow-xs"
              >
                Check Policy Approval ❯
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: PRIMARY DAYCARE LASER SUITES (ALWAYS VISIBLE FIRST) */}
      <section className="px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-7xl mx-auto w-full mb-16">
        <div className="flex items-center gap-3 mb-8 border-b border-slate-200/80 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl shadow-xs shrink-0">
            ⚡
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] tracking-tight">
              Daycare & Laser Surgical Suites <span className="text-blue-600 font-bold text-lg sm:text-2xl">(6 Primary)</span>
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium">
              Ultra-advanced stitchless USFDA laser treatments featuring 100% bloodless protocols, zero hospital stay, and 3-hour discharge.
            </p>
          </div>
        </div>

        {filteredLaserSuites.length === 0 ? (
          <div className="text-center py-12 bg-white border border-slate-200/80 rounded-[2rem] max-w-xl mx-auto shadow-sm p-6">
            <Heartbeat className="w-12 h-12 text-blue-600 mx-auto mb-3 animate-pulse" />
            <h3 className="text-base font-extrabold text-slate-900">No daycare suite matches &quot;{searchQuery}&quot;</h3>
            <p className="text-slate-500 text-xs mt-1">Check below in our Major Hospital Surgeries list for inpatient orthopedic, general, or kidney procedures.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredLaserSuites.map((item, idx) => {
              const codeIdx = `HFL-${101 + idx}`;
              const symptomGuide = getSymptomGuide(item.id);

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-[2.3rem] border border-slate-200/90 hover:border-blue-400 transition-all duration-300 shadow-md hover:shadow-2xl hover:shadow-blue-950/10 flex flex-col justify-between overflow-hidden hover:-translate-y-1.5"
                >
                  <div>
                    {getHeaderVisual(idx, item.category, item.usfdaProtocol)}

                    <div className="p-6 sm:p-7 space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-mono font-extrabold text-blue-600 uppercase tracking-widest">
                        <span>{codeIdx} • DAYCARE SUITE</span>
                        <span className="text-emerald-700 bg-emerald-50 border border-emerald-200/60 font-sans font-extrabold px-2 py-0.5 rounded-md text-[10px]">
                          0 Nights Stay
                        </span>
                      </div>

                      <Link href={`/specialities/${item.id}`} className="block">
                        <h3 className="text-lg sm:text-xl font-black text-[#0B2545] group-hover:text-blue-600 transition-colors leading-snug">
                          {item.title}
                        </h3>
                      </Link>

                      <div className="bg-[#F3F7FA] border border-blue-100 rounded-xl p-3 flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 font-extrabold shadow-2xs">
                        <span className="text-base leading-none pt-0.5">{symptomGuide.icon}</span>
                        <span className="leading-snug">{symptomGuide.label}</span>
                      </div>

                      <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed line-clamp-3 font-medium">
                        {item.description}
                      </p>

                      <div className="bg-[#F8FAFD] border border-slate-200/80 rounded-2xl p-3.5 my-3 grid grid-cols-2 shadow-2xs">
                        <div className="border-r border-slate-200 pr-3">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">PAIN & CUTS</span>
                          <span className="text-xs sm:text-sm font-black text-blue-700 flex items-center gap-1.5 mt-1">
                            <Lightning weight="fill" className="text-blue-500 text-sm" />
                            <span>100% Painless</span>
                          </span>
                        </div>
                        <div className="pl-3.5">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">HOSPITAL STAY</span>
                          <span className="text-xs sm:text-sm font-black text-emerald-800 flex items-center gap-1.5 mt-1">
                            <Clock weight="fill" className="text-emerald-500 text-sm" />
                            <span>Home in 2-3 Hrs</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 sm:px-7 pb-6 pt-2 bg-[#FAFDFB]/60 border-t border-slate-100">
                    <div className="pt-2 grid grid-cols-1 gap-2.5">
                      <Link
                        href={`/specialities/${item.id}`}
                        className="w-full bg-[#0B2545] hover:bg-blue-600 text-white font-black text-xs sm:text-sm py-3.5 px-4 rounded-xl transition-colors shadow-sm flex items-center justify-between group/btn"
                      >
                        <span>VIEW COMPLETE GUIDE & PRICES</span>
                        <CaretRight weight="bold" className="text-slate-300 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>

                      <a
                        href={`https://wa.me/919363650066?text=Hello%20HealthFlo%20Specialists%2C%20I%20have%20a%20private%20inquiry%20regarding%20${encodeURIComponent(item.shortTitle)}%20painless%20laser%20care%20and%20insurance%20eligibility.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-emerald-50 hover:bg-emerald-100/80 text-emerald-900 border border-emerald-300/80 font-extrabold text-xs py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Ask Doctor on WhatsApp (Confidential)</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 2: COMPREHENSIVE HOSPITAL SURGICAL DIRECTORY & INPATIENT CATALOGUE */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-7xl mx-auto w-full flex-1 mb-16 bg-[#F0F5F9]/80 border-t border-slate-200/80 rounded-[3rem] p-6 sm:p-10 shadow-inner">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-slate-200/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-black text-teal-800 bg-teal-100/90 px-3.5 py-1 rounded-full mb-3 uppercase tracking-wider shadow-2xs">
                <Hospital weight="fill" className="text-teal-700 text-base" />
                <span>Comprehensive Hospital Surgical Directory</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
                All Major Hospital Surgeries & Inpatient Procedures <span className="text-emerald-700 font-bold text-xl sm:text-2xl">(45+)</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-base font-medium mt-2 max-w-3xl leading-relaxed">
                Explore all major inpatient, laparoscopic, orthopedic, urology, Dialysis, and oncological procedures conducted at empanelled HealthFlo hospitals.
              </p>
            </div>
          </div>

          {/* Department Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-1 pb-3">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider mr-2">Select Department:</span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all duration-200 shadow-2xs ${
                  selectedDept === dept
                    ? "bg-[#0B2545] text-white shadow-md scale-[1.03]"
                    : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {filteredHospitalProcedures.length === 0 ? (
            <div className="text-center py-12 bg-white border border-slate-200/80 rounded-[2rem] max-w-xl mx-auto shadow-sm p-6">
              <h3 className="text-base font-black text-slate-900">No hospital procedure matches your filter</h3>
              <button
                onClick={() => { setSelectedDept("All Departments"); setSearchQuery(""); }}
                className="mt-4 text-xs font-extrabold text-blue-700 bg-blue-50 px-5 py-2.5 rounded-xl border border-blue-200"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredHospitalProcedures.map((proc, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-blue-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-200/60 uppercase tracking-wider">
                        {proc.dept}
                      </span>
                      <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md font-mono">
                        {proc.type}
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-[#0B2545] group-hover:text-blue-700 transition-colors leading-snug">
                      {proc.name}
                    </h3>

                    <div className="flex items-center gap-4 text-xs font-extrabold text-slate-500 pt-1.5 border-t border-slate-100">
                      <span className="flex items-center gap-1 text-slate-700">
                        <Clock weight="fill" className="text-amber-500" />
                        <span>Stay: {proc.stay}</span>
                      </span>
                      <span>•</span>
                      <span>Anesthesia: {proc.anesthesia}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex sm:flex-col justify-end items-stretch sm:items-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <span className="inline-flex items-center justify-center gap-1.5 text-[11px] font-black text-amber-900 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200/80 self-center sm:self-end">
                      <ShieldCheck weight="fill" className="text-amber-600 text-sm" />
                      <span>Insurance Eligible</span>
                    </span>

                    <a
                      href={`https://wa.me/919363650066?text=Hello%20HealthFlo%20Clinical%20Coordinator%2C%20I%20want%20to%20know%20the%20insurance%20eligibility%2C%20package%20details%2C%20and%20surgeon%20availability%20for%20*${encodeURIComponent(proc.name)}*.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#0F2236] hover:bg-[#128C7E] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>Request Quote & Triage</span>
                      <CaretRight weight="bold" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Complete Patient Safety & Financial Reassurance Pillars */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 max-w-7xl mx-auto w-full">
        <div className="bg-white border border-slate-200/90 rounded-[2.5rem] p-8 sm:p-14 shadow-lg space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-[#0B2545]">
              Why Patients TRUST HealthFlo For Major & Minor Surgery
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-medium leading-relaxed">
              We know undergoing surgery can feel daunting or stressful. That is why our entire clinical model is built strictly around patient safety, transparent insurance assistance, and absolute personal dignity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F8FBFE] border border-slate-200/80 rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xs text-left hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl shadow-xs">
                <LockKey weight="bold" />
              </div>
              <h3 className="text-lg font-black text-[#0B2545]">100% Medical & Personal Privacy</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                Whether you need diagnostic cystoscopy, circumcision, or GI care, your consultation files, inquiries, and hospital discharge records remain completely confidential and discreetly handled.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-slate-200/80 rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xs text-left hover:border-amber-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xl shadow-xs">
                <ShieldCheck weight="bold" />
              </div>
              <h3 className="text-lg font-black text-[#0B2545]">Fast-Track Insurance Support</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                We provide prompt insurance eligibility verification and streamlined claim assistance across all Indian health insurance schemes and corporate employer policies in just 30 minutes.
              </p>
            </div>

            <div className="bg-[#F7FAFD] border border-slate-200/80 rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xs text-left hover:border-blue-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-700 flex items-center justify-center font-bold text-xl shadow-xs">
                <Car weight="bold" />
              </div>
              <h3 className="text-lg font-black text-[#0B2545]">Free Hospital AC Cab Transit</h3>
              <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                Do not stress about city traffic or transportation after your surgery. Our clinical team provides complimentary, clean, round-trip hospital AC cabs from your home directly to our surgical centers and back.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-left space-y-1">
              <h4 className="text-base sm:text-lg font-black text-[#0B2545]">Have a surgery recommendation or prescription?</h4>
              <p className="text-xs sm:text-sm font-medium text-slate-500">Share your diagnostic report directly with our clinical desk for an immediate surgical quote and insurance eligibility review.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://wa.me/919363650066?text=Hello%20HealthFlo%20Triage%20Desk%2C%20I%20have%20an%20existing%20surgery%20advice%20and%20want%20to%20check%20your%2011-point%20insurance%20eligible%20package%20option."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#128C7E] hover:bg-[#0E7065] text-white font-extrabold text-xs sm:text-sm px-7 py-4 rounded-2xl shadow-lg shadow-emerald-900/15 transition-all flex items-center gap-2"
              >
                <span>WhatsApp Prescription (1-Tap)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileStickyBar />
    </main>
  );
}
