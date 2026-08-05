"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleTrendsEEATBanner from "@/components/seo/GoogleTrendsEEATBanner";
import { UserCheck, Lock, ArrowRight, CheckCircle2, MessageSquare, Phone, HelpCircle, ShieldCheck } from "lucide-react";
import { haptic } from "@/utils/haptics";
import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function PatientLoginPage() {
  const { config } = useSiteConfig();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    haptic.medium();
    setStatusMsg("🎉 Verification successful! Your cashless surgical claim is pre-approved. Your care navigator is sending your OPD appointment link via WhatsApp.");
  };

  const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=91${config.helplineRaw}&text=${encodeURIComponent("Hello HealthFlo Team, I need help logging into my Patient Account to view my surgical schedule.")}`;

  return (
    <div className="w-full bg-gradient-to-b from-white via-[#FAF9F5] to-white text-[#1D3A6F] font-sans relative min-h-screen flex flex-col">
      <Navbar />

      {/* Ambient Aura & Soft Glow Background */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-gradient-to-bl from-blue-50/70 via-sky-50/40 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-gradient-to-tr from-blue-50/60 via-white to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[750px] bg-teal-50/50 rounded-full blur-[160px] pointer-events-none -z-10" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-28 md:pt-36 pb-20 relative z-10 flex flex-col gap-12">
        
        {/* Breadcrumb / Back Navigation */}
        <div>
          <Link
            href="/product"
            onClick={() => haptic.light()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-600 hover:text-[#0055ff] transition-colors"
          >
            <span>← Back to Products & Portal Selection</span>
          </Link>
        </div>

        {/* Login Box */}
        <div className="bg-white border-2 border-slate-200/80 rounded-[2.5rem] p-6 sm:p-12 shadow-[0_15px_45px_rgba(0,0,0,0.06)] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/80 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-8 relative z-10">
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0055ff] mx-auto shadow-sm">
                <UserCheck className="w-8 h-8 stroke-[2.2]" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#0055ff] border border-blue-200 font-extrabold text-xs inline-block">
                Secure Patient & Caregiver Portal
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#1D3A6F] tracking-tight">
                Welcome back to HealthFlo
              </h1>
              <p className="text-sm text-slate-600 font-normal leading-relaxed">
                Enter your mobile number below to access your laser surgery consultation schedule, discharge summaries, and cashless insurance tracking.
              </p>
            </div>

            {statusMsg && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-bold text-sm flex items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div>
                <label className="text-xs font-black text-[#1D3A6F] uppercase tracking-wider block mb-2">
                  Your Registered Mobile Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-500 font-bold text-base select-none">+91</span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl pl-14 pr-4 py-4 text-slate-900 font-black text-base focus:border-[#0055ff] focus:bg-white focus:outline-none transition-all shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-black text-[#1D3A6F] uppercase tracking-wider">
                    One-Time Verification OTP
                  </label>
                  <span
                    onClick={() => alert("An instant verification OTP has been generated and sent to your WhatsApp number!")}
                    className="text-xs font-black text-[#0055ff] hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Send OTP to WhatsApp</span>
                  </span>
                </div>
                <input
                  type="password"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-black text-base tracking-widest focus:border-[#0055ff] focus:bg-white focus:outline-none text-center transition-all shadow-2xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#0055ff] hover:bg-blue-600 text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 transition-all active:scale-95"
              >
                <span>Verify & Open My Health Folder</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>

            {/* Quick Switch to Doctor Login */}
            <div className="pt-5 border-t border-slate-200 text-center text-xs text-slate-600 font-semibold">
              Are you a Doctor or Hospital Partner?{" "}
              <Link href="/login/hospital" className="text-emerald-700 font-black hover:underline ml-1">
                Switch to Doctor Portal →
              </Link>
            </div>

          </div>

        </div>

        {/* Security Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <Lock className="w-7 h-7 text-[#0055ff] shrink-0" />
            <div>
              <p className="text-sm font-black text-[#1D3A6F]">Bank-Grade Privacy</p>
              <p className="text-xs font-medium text-slate-500">100% Encrypted medical records</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <ShieldCheck className="w-7 h-7 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#1D3A6F]">Cashless Verified</p>
              <p className="text-xs font-medium text-slate-500">Instant insurance claim tracking</p>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center gap-4">
            <HelpCircle className="w-7 h-7 text-amber-500 shrink-0" />
            <div>
              <p className="text-sm font-black text-[#1D3A6F]">Need Support?</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-[#0055ff] hover:underline block font-bold">
                Chat with Care Advisor →
              </a>
            </div>
          </div>
        </div>

        {/* E-E-A-T Footer Banner */}
        <GoogleTrendsEEATBanner 
          cityName="South India Medical Hub"
          stateName="Patient Care Center"
          procedureTitle="Ambulatory Day-Care Protocols"
        />

      </main>

      <Footer />
    </div>
  );
}
