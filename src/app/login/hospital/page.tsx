"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleTrendsEEATBanner from "@/components/seo/GoogleTrendsEEATBanner";
import { Building2, Lock, ArrowRight, CheckCircle2, ShieldCheck, Activity, KeyRound, Server } from "lucide-react";
import { haptic } from "@/utils/haptics";
import Link from "next/link";

export default function HospitalLoginPage() {
  const [doctorId, setDoctorId] = useState("");
  const [pin, setPin] = useState("");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    haptic.medium();
    setStatusMsg("🏥 Welcome Dr. Specialist / Hospital Admin! Launching your empanelled surgery dashboard...");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#00E5FF] selection:text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-28 md:pt-36 pb-20 relative z-10 flex flex-col gap-12">
        
        {/* Breadcrumb / Back Navigation */}
        <div>
          <Link
            href="/product"
            onClick={() => haptic.light()}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <span>← Back to Products & Portal Selection</span>
          </Link>
        </div>

        {/* Login Box */}
        <div className="bg-[#0B132B] border border-slate-800 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-8 relative z-10">
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto shadow-lg shadow-emerald-500/10">
                <Building2 className="w-8 h-8 stroke-[2.2]" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-slate-800 text-emerald-300 font-bold text-xs">
                Empanelled Partner & Surgeon Suite
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Doctor & Hospital Login
              </h1>
              <p className="text-sm text-slate-300 font-normal leading-relaxed">
                Access operation theatre day-care schedules, review incoming AI triage diagnostic sheets, and approve cashless insurance admissions.
              </p>
            </div>

            {statusMsg && (
              <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                  Doctor License No. or Hospital Center ID
                </label>
                <input
                  type="text"
                  required
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  placeholder="e.g., Dr. Sharma (NMC-48291) or BLR-HUB-01"
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-2xl px-5 py-4 text-white font-bold text-sm sm:text-base focus:border-emerald-400 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Secure Terminal PIN or Password
                  </label>
                  <span
                    onClick={() => alert("Please contact your HealthFlo Network Coordinator for credential resets.")}
                    className="text-xs font-bold text-emerald-400 hover:underline cursor-pointer"
                  >
                    Forgot Terminal Key?
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-900 border-2 border-slate-700 rounded-2xl px-5 py-4 text-white font-bold text-sm sm:text-base focus:border-emerald-400 focus:outline-none pr-12 text-center tracking-widest"
                  />
                  <KeyRound className="w-5 h-5 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/20 transition-transform active:scale-95"
              >
                <span>Open Surgeon Triage Roster</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Quick Test Demo Button for Doctors & Partners */}
              <div className="pt-2 text-center">
                <Link
                  href="/admin"
                  onClick={() => haptic.medium()}
                  className="inline-flex items-center gap-1.5 text-xs font-black text-amber-400 hover:text-amber-300 underline uppercase tracking-wider transition-colors"
                >
                  <span>⚡ Quick Test: Launch Live Partner Hospital Dashboard Without Login →</span>
                </Link>
              </div>
            </form>

            {/* Quick Switch to Patient Login */}
            <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400 font-semibold">
              Are you a Patient or Family Caregiver?{" "}
              <Link href="/login/patient" className="text-cyan-400 font-bold hover:underline ml-1">
                Switch to Patient Portal →
              </Link>
            </div>

          </div>

        </div>

        {/* Clinical Roster Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 flex items-center gap-3">
            <Activity className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Ambulatory Roster</p>
              <p className="text-xs text-slate-400">Real-time OT slots mapping</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">TPA Pre-Approval</p>
              <p className="text-xs text-slate-400">Paperless claim pre-auths</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0B1528] border border-slate-800 flex items-center gap-3">
            <Server className="w-6 h-6 text-purple-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">NMC Compliant</p>
              <p className="text-xs text-slate-400">Audit-ready documentation</p>
            </div>
          </div>
        </div>

        {/* E-E-A-T Footer Banner */}
        <GoogleTrendsEEATBanner 
          cityName="South India Surgical Hub"
          stateName="Hospital Operating Suite"
          procedureTitle="Laser Treatment Protocols"
        />

      </main>

      <Footer />
    </div>
  );
}
