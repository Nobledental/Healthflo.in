"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadCapture from "@/sections/LeadCapture";
import FAQ from "@/sections/FAQ";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Building2, 
  ChevronRight, 
  Lock,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { haptic } from "@/utils/haptics";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function ContactPage() {
  const { config } = useSiteConfig();
  const [clickCount, setClickCount] = useState(0);
  const [triggerFeedback, setTriggerFeedback] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const WHATSAPP_URL = config.socials.whatsapp;

  // Covert Admin Dashboard Trigger: Triple-click within 1.5 seconds opens /admin in a new tab
  const handleCovertTrigger = () => {
    haptic.light();
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (timerRef.current) clearTimeout(timerRef.current);

    if (newCount >= 3) {
      haptic.medium();
      setTriggerFeedback(true);
      setClickCount(0);
      
      setTimeout(() => {
        setTriggerFeedback(false);
        window.open("/admin", "_blank", "noopener,noreferrer");
      }, 300);
    } else {
      timerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 1500);
    }
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-[90px] md:pt-[140px] pb-24 relative z-10 space-y-20">
        
        {/* ── HERO SECTION & HEADER ───────────────────────────────────────── */}
        <section className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1D3A6F]/10 to-[#00E5FF]/10 border border-[#1D3A6F]/20 px-4 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-[#E58325]" />
            <span className="text-xs sm:text-sm font-extrabold text-[#1D3A6F] uppercase tracking-wider">
              24/7 Precision Surgical Directorate
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-none">
            Connect With Your Dedicated <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#1D3A6F] via-[#2D5DAF] to-[#0E1C36]">
              Clinical Triage Desk
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Reach our senior hospital coordinators across Tamil Nadu, Karnataka, Telangana, and Maharashtra for immediate surgical scheduling, 100% Insurance Eligible pre-approvals, and complimentary transit support.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`tel:+${config.helplineRaw}`}
              onClick={() => haptic.medium()}
              className="px-8 py-4 rounded-2xl bg-[#1D3A6F] hover:bg-[#12284C] text-white font-black text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-xl transition-all hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4 text-[#00E5FF] animate-pulse" />
              <span>Call {config.helplineNumber}</span>
            </a>
            
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptic.light()}
              className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Live Coordinator</span>
            </a>
          </div>
        </section>

        {/* ── CONTACT CHANNELS GRID ──────────────────────────────────────── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Emergency & Priority Triage */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#1D3A6F] rounded-3xl p-8 space-y-6 transition-all shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1D3A6F]/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-[#1D3A6F]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#E58325] uppercase tracking-wider block mb-1">
                  Direct Admission Hotline
                </span>
                <h3 className="text-2xl font-black text-slate-900">24/7 Clinical Triage</h3>
                <p className="text-sm text-slate-600 font-medium mt-2 leading-relaxed">
                  Immediate doctor consultation scheduling and emergency surgical bed allocation across our 50+ empanelled hospital networks.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100">
              <a 
                href={`tel:+${config.helplineRaw}`}
                className="text-2xl font-black text-[#1D3A6F] hover:text-[#E58325] transition-colors block tracking-tight"
              >
                {config.helplineNumber}
              </a>
              <span className="text-xs text-slate-400 font-semibold mt-1 block">
                Avg. response time: Under 45 seconds
              </span>
            </div>
          </div>

          {/* Card 2: Multilingual Concierge */}
          <div className="bg-white border-2 border-slate-200 hover:border-emerald-500 rounded-3xl p-8 space-y-6 transition-all shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">
                  WhatsApp Medical Desk
                </span>
                <h3 className="text-2xl font-black text-slate-900">Instant Concierge</h3>
                <p className="text-sm text-slate-600 font-medium mt-2 leading-relaxed">
                  Connect with certified healthcare navigators fluent in Tamil, Kannada, Telugu, Hindi, Malayalam, and English.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100">
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Chat Live Now</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Corporate & Insurance Desk */}
          <div className="bg-white border-2 border-slate-200 hover:border-[#1D3A6F] rounded-3xl p-8 space-y-6 transition-all shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1D3A6F]/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-[#1D3A6F]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#1D3A6F] uppercase tracking-wider block mb-1">
                  Administrative Directorate
                </span>
                <h3 className="text-2xl font-black text-slate-900">Clinical & Legal Desk</h3>
                <p className="text-sm text-slate-600 font-medium mt-2 leading-relaxed">
                  For corporate empanelment, insurance pre-authorization validation, patient transfer summaries, and hospital networking inquiries.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 space-y-2">
              <a 
                href={`mailto:${config.email}`}
                className="text-sm font-extrabold text-slate-800 hover:text-[#1D3A6F] transition-colors block truncate"
              >
                {config.email}
              </a>
              <a 
                href={`mailto:${config.directorateEmail}`}
                className="text-sm font-extrabold text-slate-800 hover:text-[#1D3A6F] transition-colors block truncate"
              >
                {config.directorateEmail}
              </a>
            </div>
          </div>

        </section>

        {/* ── COVERT SECURITY & ZERO-TRUST CHARTER BANNER ──────────────────── */}
        {/* Triple-click on this security emblem acts as the secret, non-hackable trigger to launch /admin in a separate tab */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#0D1F3C] via-[#152F5A] to-[#0D1F3C] border border-blue-500/30 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-60 h-60 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30 font-black text-xs uppercase tracking-wider">
                  HIPAA Compliant & USFDA Protocol
                </span>
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> End-to-End Encrypted Triage
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Institutional Clinical Privacy & Security Standards
              </h3>
              <p className="text-sm sm:text-base font-medium text-slate-300 leading-relaxed">
                Every patient diagnostic report, insurance policy document, and surgical itinerary processed through HealthFlo is protected by military-grade 256-bit encryption. Our surgical coordinators adhere strictly to international patient confidentiality mandates.
              </p>
              <div 
                onClick={handleCovertTrigger}
                className="pt-3 border-t border-white/15 mt-3 cursor-pointer select-none group/dpdp inline-block"
                title="Verify DPDP Safe-Harbor Encryption & Zero-Trust Charter"
              >
                <p className="text-xs sm:text-[13px] font-black text-amber-300 group-hover/dpdp:text-white transition-colors tracking-wide">
                  © 2026 HealthFlo MediTech Systems • DPDP Safe-Harbor Certified • Zero-Trust Protected Architecture
                </p>
                <p className="text-[11px] text-blue-200/80 font-medium mt-0.5">
                  End-to-End Encrypted Triage under Indian Digital Personal Data Protection (DPDP) Act 2023 Guidelines.
                </p>
              </div>
            </div>

            {/* COVERT TRIGGER BUTTON: Triple click to open /admin in a new tab */}
            <div className="shrink-0 flex flex-col items-center">
              <button
                type="button"
                onClick={handleCovertTrigger}
                title="USFDA Network Verification Emblem"
                className={`group px-6 py-5 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 select-none ${
                  triggerFeedback 
                    ? "bg-amber-500/30 border-amber-400 scale-105 shadow-2xl shadow-amber-500/50" 
                    : "bg-white/5 hover:bg-white/10 border-white/20 hover:border-amber-400/60 shadow-lg"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
                  <ShieldCheck className="w-7 h-7 text-[#0E1C36] stroke-[2.5]" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-300 group-hover:text-white transition-colors">
                  Zero-Trust Charter
                </span>
                <span className="text-[10px] text-blue-200/60 font-semibold">
                  Verified Surgical Network
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE LEAD CAPTURE ENGINE ───────────────────────────── */}
        <section id="consult" className="space-y-8 pt-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase text-[#1D3A6F] tracking-wider block">
              Instant Appointment Allocation
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
              Schedule Your Priority Consultation
            </h2>
          </div>
          <LeadCapture />
        </section>

        {/* ── FREQUENTLY ASKED QUESTIONS ────────────────────────────────── */}
        <section className="pt-12 border-t border-slate-200">
          <FAQ />
        </section>

      </main>

      <Footer />
    </>
  );
}
