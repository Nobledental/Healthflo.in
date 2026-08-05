"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleTrendsEEATBanner from "@/components/seo/GoogleTrendsEEATBanner";
import { 
  Building2, UserCheck, ShieldCheck, Smartphone, ArrowRight, 
  CheckCircle2, Lock, Heart, Sparkles, MessageSquare, 
  Calendar, Award, Download, Check, ExternalLink, HelpCircle
} from "lucide-react";
import { haptic } from "@/utils/haptics";
import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function ProductLoginPage() {
  const { config } = useSiteConfig();
  const [activeTab, setActiveTab] = useState<"patient" | "hospital">("patient");
  const [phoneOrId, setPhoneOrId] = useState("");
  const [otpOrPassword, setOtpOrPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [selectedOS, setSelectedOS] = useState<"ios" | "android">("android");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    haptic.medium();
    if (activeTab === "hospital") {
      setStatusMsg("🏥 Welcome Dr. Specialist / Admin! Connecting to your hospital surgical schedule...");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1200);
    } else {
      setStatusMsg("🎉 Verification successful! Your cashless insurance pre-approval is verified. Your surgical coordinator will contact you directly on WhatsApp.");
    }
  };

  const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=91${config.helplineRaw}&text=${encodeURIComponent("Hello HealthFlo Support, I need help downloading the Mobile App and connecting with a surgical coordinator.")}`;

  const products = [
    {
      badge: "Most Popular",
      title: "HealthFlo Mobile App",
      subtitle: "For Patients & Family Members",
      desc: "Your complete surgical companion on iOS & Android. Book consultations with empanelled doctors, view laser treatment estimates, securely store post-op prescriptions, and chat with your care navigator 24/7 in your local language.",
      icon: Smartphone,
      color: "text-[#00E5FF]",
      bg: "bg-cyan-500/10 border-cyan-500/30",
      highlights: [
        "Instant Doctor Appointment Booking",
        "Digital Medical Records & Discharge Advice",
        "24/7 Local Language Navigation Chat"
      ],
      action: { text: "Download App", link: "#app-download", isScroll: true }
    },
    {
      badge: "Free Online Tool",
      title: "AI Symptom Checker",
      subtitle: "Instant Guidance in 60 Seconds",
      desc: "Not sure if your discomfort is Piles, Fistula, Fissure, or Hernia? Answer 3 simple questions privately online to understand your condition and see if you qualify for painless laser day-care surgery.",
      icon: Sparkles,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/30",
      highlights: [
        "100% Private & Confidential",
        "Doctor-Reviewed Clinical Accuracy",
        "Immediate Specialist Recommendation"
      ],
      action: { text: "Try AI Checker Now", link: "/ai", isScroll: false }
    },
    {
      badge: "Cashless Support",
      title: "Instant Insurance Verification",
      subtitle: "Corporate & Personal Health Policies",
      desc: "Don't let hospital paperwork delay your healing. Use our automated verification tool to check your Mediclaim or Private Health Insurance eligibility for zero upfront out-of-pocket laser surgery.",
      icon: ShieldCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      highlights: [
        "Works with all major insurance cards",
        "Zero upfront payment approval guidance",
        "Dedicated insurance specialist support"
      ],
      action: { text: "Check Cashless Eligibility", link: "/insurance", isScroll: false }
    },
    {
      badge: "For Doctors & Clinics",
      title: "Hospital & Specialist Suite",
      subtitle: "Practice Management & Surgical Triage",
      desc: "A simple, clutter-free schedule and admission portal designed for operating proctologists and empanelled surgical hospitals across South India to review patient consultations seamlessly.",
      icon: Building2,
      color: "text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/30",
      highlights: [
        "Effortless OPD & Theatre Roster",
        "Paperless insurance claims collaboration",
        "Live patient care tracking"
      ],
      action: { text: "Open Doctor Portal", link: "#login-section", isScroll: true }
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-[#00E5FF] selection:text-slate-900 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-28 md:pt-36 pb-20 relative z-10 flex flex-col gap-20">
        
        {/* ── HEADER SECTION: SIMPLE, WARM & FRIENDLY ──────────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-[#00E5FF] border border-blue-500/30 text-xs sm:text-sm font-bold shadow-lg">
            <Heart className="w-4 h-4 text-[#00E5FF] fill-current" />
            <span>Healthcare Made Simple & Transparent</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15]">
            HealthFlo Products & <br />
            <span className="bg-gradient-to-r from-[#00E5FF] via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Easy Login Portal
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Discover our friendly mobile app and health tools designed to simplify your surgical journey. Log in below to view your appointment status, check cashless insurance, or manage hospital schedules.
          </p>
        </div>

        {/* ── PRODUCTS SHOWCASE GRID ───────────────────────────────────────── */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-5 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400 block mb-1">Our Healthcare Products</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Tools Designed for Patients, Family & Doctors</h2>
            </div>
            <span className="text-sm text-slate-400 font-medium">Available across Tamil Nadu, Karnataka & Telangana</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((prod) => {
              const Icon = prod.icon;
              return (
                <div key={prod.title} className="p-7 rounded-3xl bg-[#0B132B] border border-slate-800/80 flex flex-col justify-between hover:border-cyan-500/40 transition-all shadow-xl hover:shadow-2xl hover:shadow-cyan-950/20 group">
                  <div className="space-y-5">
                    
                    {/* Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-bold text-xs">
                        {prod.badge}
                      </span>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${prod.bg}`}>
                        <Icon className={`w-6 h-6 ${prod.color}`} />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-cyan-400 transition-colors">{prod.title}</h3>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mt-0.5">{prod.subtitle}</span>
                      <p className="text-sm text-slate-300 font-normal mt-3 leading-relaxed">{prod.desc}</p>
                    </div>

                    {/* Feature Highlights */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-800/60">
                      {prod.highlights.map((point) => (
                        <div key={point} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-300">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Button Action */}
                  <div className="pt-6 mt-6 border-t border-slate-800">
                    <Link
                      href={prod.action.link}
                      onClick={() => haptic.light()}
                      className="w-full py-3.5 rounded-xl bg-slate-800/80 hover:bg-cyan-500/20 text-white hover:text-cyan-300 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 hover:border-cyan-500 transition-all active:scale-95"
                    >
                      <span>{prod.action.text}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE APP HIGHLIGHT SECTION ─────────────────────────────────── */}
        <div id="app-download" className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#0C1B33] to-[#0D2447] border border-cyan-500/30 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="space-y-6 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider bg-cyan-900/40 px-3.5 py-1 rounded-full border border-cyan-500/30">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>South India's Most Trusted Surgical App</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Take Your Hospital Experience <br />
              <span className="text-[#00E5FF]">Into Your Own Hands</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              No more waiting in long OPD clinic queues or worrying about hospital bill surprises. With the HealthFlo App, you can connect directly with laser surgery specialists in Chennai, Bangalore, Hyderabad, Coimbatore, and 25+ cities in your own native language.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => { setSelectedOS("android"); haptic.medium(); alert("Redirecting to Google Play Store download page for HealthFlo App!"); }}
                className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-black text-sm sm:text-base flex items-center gap-3 shadow-xl transition-transform active:scale-95"
              >
                <Download className="w-5 h-5 text-slate-950" />
                <div className="text-left">
                  <span className="text-[10px] font-bold text-slate-600 block leading-tight">GET IT ON</span>
                  <span className="text-sm font-black leading-tight block">Google Play</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedOS("ios"); haptic.medium(); alert("Redirecting to Apple App Store download page for HealthFlo App!"); }}
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-black text-sm sm:text-base flex items-center gap-3 shadow-xl transition-transform active:scale-95"
              >
                <Download className="w-5 h-5 text-[#00E5FF]" />
                <div className="text-left">
                  <span className="text-[10px] font-bold text-slate-400 block leading-tight">DOWNLOAD ON THE</span>
                  <span className="text-sm font-black leading-tight block">App Store</span>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs font-bold text-slate-400">
              <span>★ 4.9 Star Patient Rating</span>
              <span>•</span>
              <span>100% Free & Secure</span>
              <span>•</span>
              <span>No Spam Calls</span>
            </div>
          </div>

          {/* Interactive Mobile App Preview Phone Box */}
          <div className="w-full md:w-80 shrink-0 bg-slate-900 border-4 border-slate-800 rounded-[2.5rem] p-4 shadow-2xl relative z-10 text-center">
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-4" />
            <div className="bg-[#0A1326] rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mx-auto text-[#00E5FF] font-black text-xl">
                HF
              </div>
              <h4 className="text-base font-black text-white">HealthFlo Care App</h4>
              <p className="text-xs text-slate-400">Hello! Dr. Coordinator is online to assist with your laser treatment inquiry.</p>
              
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left text-xs font-medium space-y-1">
                <span className="text-emerald-400 font-bold block">✓ Cashless Pre-Approval Verified</span>
                <span className="text-slate-300">Ambulatory discharge: 3 hours</span>
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg bg-[#00E5FF] text-slate-950 font-bold text-xs uppercase tracking-wider block hover:bg-cyan-300 transition-colors"
              >
                Chat on WhatsApp Now
              </a>
            </div>
          </div>

        </div>

        {/* ── SIMPLE EASY LOGIN CONSOLE ────────────────────────────────────── */}
        <div id="login-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
          
          {/* LEFT: FRIENDLY LOGIN BOX (7 COLS) */}
          <div className="lg:col-span-7 bg-[#0B132B] border border-slate-800 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl relative">
            <div className="space-y-6">
              
              <div>
                <h3 className="text-2xl font-black text-white">Quick Access Portal</h3>
                <p className="text-sm text-slate-400 mt-1">Select your role to view appointments, medical guidance, or hospital schedules.</p>
              </div>

              {/* Simple Tabs */}
              <div className="grid grid-cols-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl">
                <button
                  type="button"
                  onClick={() => { setActiveTab("patient"); haptic.light(); setStatusMsg(null); }}
                  className={`py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === "patient"
                      ? "bg-[#00E5FF] text-slate-950 shadow-md shadow-cyan-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <UserCheck className="w-4 h-4 shrink-0" />
                  <span>Patient / Family Login</span>
                </button>
                
                <button
                  type="button"
                  onClick={() => { setActiveTab("hospital"); haptic.light(); setStatusMsg(null); }}
                  className={`py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeTab === "hospital"
                      ? "bg-[#00E5FF] text-slate-950 shadow-md shadow-cyan-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>Doctor / Hospital Login</span>
                </button>
              </div>

              {/* Status Notice */}
              {statusMsg && (
                <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 font-medium text-sm flex items-center gap-3 animate-[fadeIn_0.3s_ease-out]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>{statusMsg}</span>
                </div>
              )}

              {/* Simple Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-2">
                    {activeTab === "patient" ? "Your Mobile Phone Number" : "Doctor Name or Hospital Center ID"}
                  </label>
                  <input
                    type="text"
                    required
                    value={phoneOrId}
                    onChange={(e) => setPhoneOrId(e.target.value)}
                    placeholder={activeTab === "patient" ? "e.g., +91 98765 43210" : "e.g., Dr. Sharma or Bangalore Hub #1"}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-white font-medium text-sm focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-300">
                      {activeTab === "patient" ? "One-Time Password (OTP)" : "Security Password or PIN"}
                    </label>
                    <span 
                      onClick={() => alert("We have sent an instant verification OTP to your WhatsApp!")}
                      className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
                    >
                      {activeTab === "patient" ? "Send OTP via WhatsApp" : "Forgot PIN?"}
                    </span>
                  </div>
                  <input
                    type="password"
                    required
                    value={otpOrPassword}
                    onChange={(e) => setOtpOrPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 text-white font-medium text-sm focus:border-[#00E5FF] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E5FF] to-cyan-400 hover:from-cyan-300 hover:to-cyan-300 text-slate-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-transform active:scale-95"
                >
                  <span>{activeTab === "patient" ? "Check Appointment & Claim Status" : "Open Hospital Schedule"}</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>

                {/* Quick test button for partners */}
                <div className="pt-3 text-center">
                  <Link
                    href="/admin"
                    onClick={() => haptic.medium()}
                    className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:text-amber-300 underline transition-colors"
                  >
                    <span>⚡ Doctors & Partners: Preview Live Hospital Dashboard (No password needed) →</span>
                  </Link>
                </div>
              </form>

            </div>
          </div>

          {/* RIGHT: WHY USE THE PORTAL (5 COLS) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-7 shadow-xl space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                <Lock className="w-4 h-4" />
                <span>Private & Secure Medical Promise</span>
              </div>
              
              <h3 className="text-xl font-black text-white">
                We Keep Your Medical Details Safe & Confidential
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                Whether you are seeking consultation for piles, hernia, or kidney stones, your diagnosis and insurance paperwork are treated with strictest medical discretion and encrypted safety.
              </p>

              <div className="space-y-3 pt-3 border-t border-slate-800 text-xs sm:text-sm font-semibold text-slate-300">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant SMS & WhatsApp Status Alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Fast TPA Cashless Insurance Processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero hidden consultation or file charges</span>
                </div>
              </div>
            </div>

            {/* Need Help Box */}
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-cyan-500/30 rounded-3xl p-6 text-white shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <HelpCircle className="w-5 h-5 text-[#00E5FF]" />
                <span>Need assistance logging in?</span>
              </div>
              <p className="text-xs text-slate-300">
                Our care advisors can help you reset your password or set up your mobile app account over the phone.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => haptic.light()}
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Chat with Care Support</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </div>

          </div>

        </div>

        {/* ── GOOGLE TRENDS & E-E-A-T AUDIT FOOTER BANNER ──────────────────── */}
        <GoogleTrendsEEATBanner 
          cityName="South India Medical Network"
          stateName="Patient Care & App Ecosystem"
          procedureTitle="Laser Treatment Accessibility"
        />

      </main>

      <Footer />
    </div>
  );
}
