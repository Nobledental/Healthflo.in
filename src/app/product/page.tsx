"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleTrendsEEATBanner from "@/components/seo/GoogleTrendsEEATBanner";
import { 
  Building2, UserCheck, ShieldCheck, Smartphone, ArrowRight, 
  CheckCircle2, Lock, Heart, Sparkles, MessageSquare, 
  Award, Download, Check, ExternalLink, HelpCircle
} from "lucide-react";
import { haptic } from "@/utils/haptics";
import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function ProductLoginPage() {
  const { config } = useSiteConfig();
  const [selectedOS, setSelectedOS] = useState<"ios" | "android">("android");

  const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=91${config.helplineRaw}&text=${encodeURIComponent("Hello HealthFlo Support, I need help downloading the Mobile App and connecting with a surgical coordinator.")}`;

  const products = [
    {
      badge: "Most Popular",
      title: "HealthFlo Mobile App",
      subtitle: "For Patients & Family Members",
      desc: "Your complete surgical companion on iOS & Android. Book consultations with empanelled doctors, view laser treatment estimates, securely store post-op prescriptions, and chat with your care navigator 24/7 in your local language.",
      icon: Smartphone,
      color: "text-[#0055ff]",
      bg: "bg-blue-50/80 border-blue-200",
      highlights: [
        "Instant Doctor Appointment Booking",
        "Digital Medical Records & Discharge Advice",
        "24/7 Local Language Navigation Chat"
      ],
      action: { text: "Explore Mobile App", link: "#app-download" }
    },
    {
      badge: "Free Online Tool",
      title: "AI Symptom Checker",
      subtitle: "Instant Guidance in 60 Seconds",
      desc: "Not sure if your discomfort is Piles, Fistula, Fissure, or Hernia? Answer 3 simple questions privately online to understand your condition and see if you qualify for painless laser day-care surgery.",
      icon: Sparkles,
      color: "text-[#E58325]",
      bg: "bg-amber-50/80 border-amber-200",
      highlights: [
        "100% Private & Confidential",
        "Doctor-Reviewed Clinical Accuracy",
        "Immediate Specialist Recommendation"
      ],
      action: { text: "Try AI Checker Now", link: "/ai" }
    },
    {
      badge: "Cashless Support",
      title: "Instant Insurance Verification",
      subtitle: "Corporate & Personal Health Policies",
      desc: "Don't let hospital paperwork delay your healing. Use our automated verification tool to check your Mediclaim or Private Health Insurance eligibility for zero upfront out-of-pocket laser surgery.",
      icon: ShieldCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50/80 border-emerald-200",
      highlights: [
        "Works with all major insurance cards",
        "Zero upfront payment approval guidance",
        "Dedicated insurance specialist support"
      ],
      action: { text: "Check Cashless Eligibility", link: "/insurance" }
    },
    {
      badge: "For Doctors & Clinics",
      title: "Hospital & Specialist Suite",
      subtitle: "Practice Management & Surgical Triage",
      desc: "A simple, clutter-free schedule and admission portal designed for operating proctologists and empanelled surgical hospitals across South India to review patient consultations seamlessly.",
      icon: Building2,
      color: "text-purple-600",
      bg: "bg-purple-50/80 border-purple-200",
      highlights: [
        "Effortless OPD & Theatre Roster",
        "Paperless insurance claims collaboration",
        "Live patient care tracking"
      ],
      action: { text: "Open Doctor Dashboard", link: "/login/hospital" }
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white via-[#FAF9F5] to-white text-[#1D3A6F] font-sans relative min-h-screen">
      <Navbar />

      {/* Ambient Aura & Soft Glow Background */}
      <div className="absolute top-0 right-0 w-[650px] h-[650px] bg-gradient-to-bl from-blue-50/70 via-sky-50/40 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-0 w-[550px] h-[550px] bg-gradient-to-tr from-blue-50/60 via-white to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[750px] h-[750px] bg-teal-50/50 rounded-full blur-[160px] pointer-events-none -z-10" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 pt-28 md:pt-36 pb-20 relative z-10 flex flex-col gap-16">
        
        {/* ── HEADER SECTION: WARM, CLEAN & PROFESSIONAL ──────────────────── */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D3A6F]/10 to-[#0055ff]/10 border border-[#1D3A6F]/20 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-xs">
            <Heart className="w-4 h-4 text-[#0055ff] fill-current" />
            <span className="text-[#1D3A6F] font-extrabold uppercase tracking-wider">Healthcare Made Simple & Transparent</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1D3A6F] tracking-tight leading-[1.15]">
            HealthFlo Products & <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0055ff] via-[#2D5DAF] to-[#00A88F]">
              Access Portals
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Select your dedicated gateway below to securely log in to your personal health record or hospital dashboard, or explore our interactive mobile patient suite.
          </p>
        </div>

        {/* ── TOP BEAUTIFUL PORTAL GATEWAY (NO FORMS, QUICK REDIRECT) ─────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
          
          {/* 1. PATIENT & FAMILY PORTAL CARD */}
          <Link
            href="/login/patient"
            onClick={() => haptic.medium()}
            className="group relative rounded-[2.5rem] p-8 bg-white border-2 border-slate-200/80 hover:border-[#0055ff]/50 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,85,255,0.12)] overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/80 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-100/70 transition-all" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#0055ff] shadow-sm">
                  <UserCheck className="w-8 h-8 stroke-[2.2]" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-blue-50 text-[#0055ff] font-extrabold text-xs border border-blue-200">
                  Patient Gateway
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1D3A6F] group-hover:text-[#0055ff] transition-colors flex items-center gap-2">
                  <span>Patient & Family Login</span>
                  <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1.5 transition-transform text-[#0055ff]" />
                </h2>
                <p className="text-sm text-slate-600 font-normal mt-2.5 leading-relaxed">
                  View your surgical appointments, download hospital discharge summaries, review post-operative care prescriptions, and check cashless insurance claim progress.
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700 font-semibold">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Instant OTP verification via Mobile / WhatsApp</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>24/7 direct access to your care coordinator</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <div className="w-full py-4 rounded-2xl bg-[#0055ff] hover:bg-blue-600 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
                <span>Enter Patient Portal</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </Link>

          {/* 2. DOCTOR & HOSPITAL PARTNER PORTAL CARD */}
          <Link
            href="/login/hospital"
            onClick={() => haptic.medium()}
            className="group relative rounded-[2.5rem] p-8 bg-white border-2 border-slate-200/80 hover:border-emerald-500/50 transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.12)] overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/80 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-100/70 transition-all" />
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                  <Building2 className="w-8 h-8 stroke-[2.2]" />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200">
                  Partner Suite
                </span>
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1D3A6F] group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                  <span>Doctor & Hospital Login</span>
                  <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1.5 transition-transform text-emerald-600" />
                </h2>
                <p className="text-sm text-slate-600 font-normal mt-2.5 leading-relaxed">
                  Empanelled proctologists, general surgeons, and tier-1 hospital partner centers can access operation theatre rosters, AI symptom triage reports, and patient files.
                </p>
              </div>

              <div className="space-y-2.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-700 font-semibold">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Paperless day-care surgery coordination</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Quick demo preview mode available</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <div className="w-full py-4 rounded-2xl bg-[#1D3A6F] hover:bg-[#12284C] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 transition-all">
                <span>Open Doctor & Hospital Suite</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </Link>

        </div>

        {/* ── PRODUCTS SHOWCASE GRID ───────────────────────────────────────── */}
        <div className="space-y-8 pt-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200/80 pb-5 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#0055ff] block mb-1">Our Healthcare Products</span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1D3A6F] tracking-tight">Tools Designed for Patients, Family & Doctors</h2>
            </div>
            <span className="text-sm text-slate-500 font-semibold">Available across Tamil Nadu, Karnataka & Telangana</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((prod) => {
              const Icon = prod.icon;
              return (
                <div key={prod.title} className="p-8 rounded-[2.5rem] bg-white border border-slate-200/80 flex flex-col justify-between hover:border-[#0055ff]/40 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] group">
                  <div className="space-y-5">
                    
                    {/* Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200">
                        {prod.badge}
                      </span>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${prod.bg}`}>
                        <Icon className={`w-6 h-6 ${prod.color}`} />
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-2xl font-black text-[#1D3A6F] group-hover:text-[#0055ff] transition-colors">{prod.title}</h3>
                      <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block mt-0.5">{prod.subtitle}</span>
                      <p className="text-sm text-slate-600 font-normal mt-3 leading-relaxed">{prod.desc}</p>
                    </div>

                    {/* Feature Highlights */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                      {prod.highlights.map((point) => (
                        <div key={point} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 stroke-[2.5]" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Button Action */}
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      href={prod.action.link}
                      onClick={() => haptic.light()}
                      className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-[#0055ff] text-[#1D3A6F] hover:text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 border border-slate-200/80 hover:border-[#0055ff] transition-all active:scale-95 shadow-xs"
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
        <div id="app-download" className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#1D3A6F] to-[#0D1C36] text-white border border-blue-500/20 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="space-y-6 max-w-xl relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wider bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>South India's Most Trusted Surgical App</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Take Your Hospital Experience <br />
              <span className="text-[#00E5FF]">Into Your Own Hands</span>
            </h2>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
              No more waiting in long OPD clinic queues or worrying about hospital bill surprises. With the HealthFlo App, you can connect directly with laser surgery specialists in Chennai, Bangalore, Hyderabad, Coimbatore, and 25+ cities in your own native language.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => { setSelectedOS("android"); haptic.medium(); alert("Redirecting to Google Play Store download page for HealthFlo App!"); }}
                className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-black text-sm sm:text-base flex items-center gap-3 shadow-xl transition-transform active:scale-95"
              >
                <Download className="w-5 h-5 text-[#0055ff]" />
                <div className="text-left">
                  <span className="text-[10px] font-bold text-slate-600 block leading-tight">GET IT ON</span>
                  <span className="text-sm font-black leading-tight block text-slate-950">Google Play</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setSelectedOS("ios"); haptic.medium(); alert("Redirecting to Apple App Store download page for HealthFlo App!"); }}
                className="px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 font-black text-sm sm:text-base flex items-center gap-3 shadow-xl transition-transform active:scale-95"
              >
                <Download className="w-5 h-5 text-[#00E5FF]" />
                <div className="text-left">
                  <span className="text-[10px] font-bold text-slate-300 block leading-tight">DOWNLOAD ON THE</span>
                  <span className="text-sm font-black leading-tight block text-white">App Store</span>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-6 pt-2 text-xs font-bold text-blue-200">
              <span>★ 4.9 Star Patient Rating</span>
              <span>•</span>
              <span>100% Free & Secure</span>
              <span>•</span>
              <span>No Spam Calls</span>
            </div>
          </div>

          {/* Interactive Mobile App Preview Phone Box */}
          <div className="w-full md:w-80 shrink-0 bg-slate-900 border-4 border-slate-700 rounded-[2.5rem] p-4 shadow-2xl relative z-10 text-center">
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-4" />
            <div className="bg-[#0A1326] rounded-2xl p-5 border border-slate-800 space-y-4 text-white">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center mx-auto text-[#00E5FF] font-black text-xl">
                HF
              </div>
              <h4 className="text-base font-black text-white">HealthFlo Care App</h4>
              <p className="text-xs text-slate-300">Hello! Dr. Coordinator is online to assist with your laser treatment inquiry.</p>
              
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

        {/* ── SECURITY & SUPPORT BANNER ───────────────────────────────────── */}
        <div className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_10px_35px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0055ff] uppercase tracking-wider">
              <Lock className="w-4 h-4" />
              <span>Private & Secure Medical Promise</span>
            </div>
            <h3 className="text-2xl font-black text-[#1D3A6F]">We Keep Your Medical Details Safe & Confidential</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
              Whether you are seeking consultation for piles, hernia, or kidney stones, your diagnosis and insurance paperwork are treated with strictest medical discretion and bank-grade digital privacy.
            </p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => haptic.light()}
            className="px-6 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-emerald-500/20 transition-all shrink-0 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-white text-emerald-500" />
            <span>Chat with Care Support</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-100" />
          </a>
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
