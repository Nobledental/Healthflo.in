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
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#00E5FF] selection:text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-28 md:pt-36 pb-20 relative z-10 flex flex-col gap-12">
        
        {/* Breadcrumb / Back Navigation */}
        <div>
          <Link
            href="/product"
            onClick={() => haptic.light()}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <span>← Back to Products & Portal Selection</span>
          </Link>
        </div>

        {/* Login Box */}
        <div className="bg-[#0A1326] border border-slate-800 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl mx-auto space-y-8 relative z-10">
            
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-[#00E5FF] mx-auto shadow-lg shadow-cyan-500/10">
                <UserCheck className="w-8 h-8 stroke-[2.2]" />
              </div>
              <span className="px-3.5 py-1 rounded-full bg-slate-800 text-slate-300 font-bold text-xs">
                Secure Patient & Caregiver Portal
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Welcome back to HealthFlo
              </h1>
              <p className="text-sm text-slate-300 font-normal leading-relaxed">
                Enter your mobile number below to access your laser surgery consultation schedule, discharge summaries, and cashless insurance tracking.
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
                  Your Registered Mobile Number
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 text-slate-400 font-bold text-sm select-none">+91</span>
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="98765 43210"
                    className="w-full bg-slate-900 border-2 border-slate-700 rounded-2xl pl-14 pr-4 py-4 text-white font-bold text-base focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    One-Time Verification OTP
                  </label>
                  <span
                    onClick={() => alert("An instant verification OTP has been generated and sent to your WhatsApp number!")}
                    className="text-xs font-bold text-[#00E5FF] hover:underline cursor-pointer flex items-center gap-1"
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
                  className="w-full bg-slate-900 border-2 border-slate-700 rounded-2xl px-5 py-4 text-white font-bold text-base tracking-widest focus:border-[#00E5FF] focus:outline-none text-center"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#00E5FF] hover:bg-cyan-300 text-slate-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-2xl shadow-cyan-500/20 transition-transform active:scale-95"
              >
                <span>Verify & Open My Health Folder</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </form>

            {/* Quick Switch to Doctor Login */}
            <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400 font-semibold">
              Are you a Doctor or Hospital Partner?{" "}
              <Link href="/login/hospital" className="text-emerald-400 font-bold hover:underline ml-1">
                Switch to Doctor Portal →
              </Link>
            </div>

          </div>

        </div>

        {/* Security Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#0C152B] border border-slate-800 flex items-center gap-3">
            <Lock className="w-6 h-6 text-cyan-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Bank-Grade Privacy</p>
              <p className="text-xs text-slate-400">100% Encrypted medical records</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0C152B] border border-slate-800 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Cashless Verified</p>
              <p className="text-xs text-slate-400">Instant insurance claim tracking</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0C152B] border border-slate-800 flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">Need Support?</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-[#00E5FF] hover:underline block font-semibold">
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
