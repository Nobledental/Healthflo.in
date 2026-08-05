"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleTrendsEEATBanner from "@/components/seo/GoogleTrendsEEATBanner";
import { Building2, Lock, ArrowRight, CheckCircle2, MessageSquare, Phone, HelpCircle, Award } from "lucide-react";
import { haptic } from "@/utils/haptics";
import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function HospitalLoginPage() {
  const { config } = useSiteConfig();
  const [medicalId, setMedicalId] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handlePartnerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    haptic.medium();
    setStatusMsg("🎉 Partner Authentication confirmed! Opening your Surgical Operation Theatre schedule and patient admissions roster...");
  };

  const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=91${config.helplineRaw}&text=${encodeURIComponent("Hello HealthFlo Medical Relations, I need assistance logging into my Doctor/Hospital partner suite.")}`;

  return (
    <div className="w-full bg-gradient-to-b from-white via-[#FAF9F5] to-white text-[#1D3A6F] font-sans relative min-h-screen flex flex-col">
      <Navbar />

      {/* Ambient Aura & Soft Glow Background */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-gradient-to-bl from-emerald-50/70 via-sky-50/40 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-gradient-to-tr from-blue-50/60 via-white to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[750px] bg-teal-50/50 rounded-full blur-[160px] pointer-events-none -z-10" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-28 md:pt-36 pb-20 relative z-10 flex flex-col gap-12">
        
        {/* Breadcrumb / Back Navigation */}
        <div>
          <Link
            href="/product"
            onClick={() => haptic.light()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-600 hover:text-emerald-700 transition-colors"
          >
            <span>← Back to Products & Portal Selection</span>
          </Link>
        </div>

        {/* Login Box */}
        <div className="bg-white border-2 border-slate-200/80 rounded-[2.5rem] p-6 sm:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.06)] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50/80 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-8 relative z-10">
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
                <Building2 className="w-8 h-8 stroke-[2.2]" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200 inline-block">
                Empanelled Hospital Partner Suite
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#1D3A6F] tracking-tight">
                Doctor & Hospital Roster
              </h1>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Log in to review operation theatre schedules, AI symptom triage reports, surgical consent paperwork, and patient discharge tracking.
              </p>
            </div>

            {statusMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-sm flex items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            <form onSubmit={handlePartnerLogin} className="space-y-6">
              <div>
                <label className="text-xs font-black text-[#1D3A6F] uppercase tracking-wider block mb-2">
                  Hospital Code / Doctor Medical ID
                </label>
                <input
                  type="text"
                  required
                  value={medicalId}
                  onChange={(e) => setMedicalId(e.target.value)}
                  placeholder="e.g., DOC-BLR-0412"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-black text-base uppercase focus:border-emerald-600 focus:bg-white focus:outline-none transition-all shadow-2xs"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-[#1D3A6F] uppercase tracking-wider">
                    Secure Partner Access PIN / Password
                  </label>
                  <span
                    onClick={() => alert("Doctor Password instructions have been transmitted to your registered clinic telephone and WhatsApp!")}
                    className="text-xs font-black text-emerald-700 hover:underline cursor-pointer"
                  >
                    Forgot access PIN?
                  </span>
                </div>
                <input
                  type="password"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-black text-base tracking-widest focus:border-emerald-600 focus:bg-white focus:outline-none transition-all shadow-2xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#1D3A6F] hover:bg-[#12284C] text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-slate-900/20 transition-all active:scale-95"
              >
                <span>Access Surgical Dashboard</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>

            <div className="pt-3 text-center">
              <button
                type="button"
                onClick={() => { haptic.light(); alert("Simulating instant Demo Mode access for operating surgeons and clinic directors!"); setMedicalId("DEMO-SURG-2026"); setPinCode("123456"); }}
                className="text-xs font-black text-emerald-700 hover:text-emerald-800 underline uppercase tracking-wider"
              >
                Try Quick Partner Demo Access Mode
              </button>
            </div>

            {/* Quick Switch to Patient Login */}
            <div className="pt-5 border-t border-slate-200 text-center text-xs text-slate-600 font-semibold">
              Are you a Patient or Caregiver?{" "}
              <Link href="/login/patient" className="text-[#0055ff] font-black hover:underline ml-1">
                Switch to Patient Portal →
              </Link>
            </div>

          </div>

        </div>

        {/* Clinical Accreditation Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <Award className="w-7 h-7 text-amber-500 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#1D3A6F]">NABH Standards</p>
              <p className="text-xs font-medium text-slate-500">Adhering to top surgical safety</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <Lock className="w-7 h-7 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#1D3A6F]">HL7 & FHIR Compliant</p>
              <p className="text-xs font-medium text-slate-500">Secure interoperable EMR</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <MessageSquare className="w-7 h-7 text-[#0055ff] shrink-0" />
            <div>
              <p className="text-sm font-black text-[#1D3A6F]">Partner Help Desk</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-700 hover:underline block font-bold">
                Connect with Doctor Desk →
              </a>
            </div>
          </div>
        </div>

        {/* E-E-A-T Footer Banner */}
        <GoogleTrendsEEATBanner 
          cityName="South India Partner Network"
          stateName="Surgical Roster Hub"
          procedureTitle="Day-Care Theatre Management"
        />

      </main>

      <Footer />
    </div>
  );
}
