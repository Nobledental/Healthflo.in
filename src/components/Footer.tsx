"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  Award, 
  Lock, 
  Building2, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Mail,
  Globe2,
  CheckCircle2
} from "lucide-react";
import { haptic } from "@/utils/haptics";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Footer() {
  const { config } = useSiteConfig();
  const [clickCount, setClickCount] = useState(0);
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
      setClickCount(0);
      window.open("/admin", "_blank", "noopener,noreferrer");
    } else {
      timerRef.current = setTimeout(() => {
        setClickCount(0);
      }, 1500);
    }
  };

  return (
    <footer className="w-full bg-gradient-to-b from-[#1C3664] via-[#18315B] to-[#122648] text-white relative z-10 mt-auto text-left border-t-2 border-[#2C528C] shadow-[0_-10px_35px_rgba(0,0,0,0.2)]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-14 pb-36 md:pb-28">
        
        {/* ── TOP BAR: BRAND LOGO, ACCREDITATION & AUTHENTIC WHITE SOCIALS ── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-10 mb-10 border-b border-white/15">
          
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 shrink-0">
              <span className="text-white font-black text-2xl tracking-tighter">H</span>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-1.5">
                <span className="text-white">Health</span>
                <span className="text-amber-300">Flo</span>
                <span className="text-[10px] sm:text-xs font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/40 ml-1">USFDA Network</span>
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-blue-100/80 tracking-wide uppercase mt-0.5">
                India&apos;s Premier Precision Laser & Daycare Surgery Directorate
              </p>
              {/* Compact App Badges */}
              <div className="flex items-center gap-2 mt-2.5">
                <a 
                  href="#download-ios" 
                  onClick={(e) => { e.preventDefault(); haptic.light(); alert("HealthFlo iOS App is currently in clinical beta for surgical care coordinators. Triage web desk is fully active!"); }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold tracking-wide shadow-xs border border-white/20 hover:scale-[1.03] transition-all"
                  title="Download on Apple App Store"
                >
                  <svg className="w-3 h-3 fill-current text-white shrink-0" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.35c.64-.78 1.08-1.87.96-2.96-.93.04-2.07.62-2.73 1.39-.59.67-1.12 1.77-.98 2.84 1.04.08 2.11-.49 2.75-1.27z"/>
                  </svg>
                  <span>App Store</span>
                </a>
                <a 
                  href="#download-android" 
                  onClick={(e) => { e.preventDefault(); haptic.light(); alert("HealthFlo Android App is currently in clinical beta for surgical care coordinators. Triage web desk is fully active!"); }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold tracking-wide shadow-xs border border-white/20 hover:scale-[1.03] transition-all"
                  title="Get it on Google Play"
                >
                  <svg className="w-3 h-3 shrink-0" viewBox="0 0 512 512">
                    <path fill="#4285F4" d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"/>
                    <path fill="#34A853" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"/>
                    <path fill="#FBBC05" d="M430.8 290.7l-45.4 26-60.1-60.1 60.1-60.1 45.4 26c28.5 16.3 28.5 42.9 0 59.2z"/>
                    <path fill="#EA4335" d="M325.3 277.7L104.6 499l280.8-161.2-60.1-60.1z"/>
                  </svg>
                  <span>Google Play</span>
                </a>
              </div>
            </div>
          </div>

          {/* NABH & USFDA Emblem */}
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-2xl shadow-sm">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 flex items-center justify-center shadow-inner shrink-0">
              {/* Award/Shield SVG */}
              <svg className="w-5 h-5 fill-[#1C3664]" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93-2.67-1.14-5-4.43-5-7.93V7.18L12 5z"/>
                <path d="M10.5 13.5l-2-2-1 1 3 3 5-5-1-1-4 4z"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs font-black text-white uppercase tracking-wider">NABH & USFDA Certified OTs</p>
              <p className="text-[11px] font-medium text-amber-300">10,000+ Successful Zero-Stitch Procedures</p>
            </div>
          </div>

          {/* Authentic White Social Media Icons */}
          <div className="flex items-center gap-2.5">
            <a 
              href={config.socials.facebook} 
              target="_blank" 
              rel="noreferrer"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/30 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            </a>
            <a 
              href={config.socials.instagram} 
              target="_blank" 
              rel="noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/30 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a 
              href={config.socials.linkedin} 
              target="_blank" 
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/30 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
            </a>
            <a 
              href={config.socials.twitter} 
              target="_blank" 
              rel="noreferrer"
              aria-label="Twitter"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white border border-white/30 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
            </a>
            <a 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noreferrer"
              title="WhatsApp Triage Desk"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-current text-white" />
            </a>
          </div>

        </div>

        {/* ── MAIN 4-COLUMN HOSPITAL DIRECTORY GRID ──────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/15">
          
          {/* Column 1: Network Hubs & Addresses (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base sm:text-lg font-extrabold text-white tracking-wide border-b border-white/20 pb-2.5 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Hospital Network Hubs</span>
            </h4>
            
            <div className="space-y-3 text-xs sm:text-[13px]">
              {[
                { city: "Hyderabad Triage HQ", desc: config.regionalAddresses.telangana },
                { city: "Bangalore Surgical Hub", desc: config.regionalAddresses.karnataka },
                { city: "Regional South India Desk", desc: config.regionalAddresses.tamilNadu }
              ].map((hub, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3.5 border border-white/10 space-y-1.5">
                  <p className="font-extrabold text-amber-300 flex items-center gap-2">
                    {/* Professional inline SVG map-pin */}
                    <svg className="w-3.5 h-3.5 fill-amber-400 shrink-0" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    <span>{hub.city}</span>
                  </p>
                  <p className="text-blue-100 font-medium leading-relaxed pl-5.5">{hub.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Our Surgical Clinics (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base sm:text-lg font-extrabold text-white tracking-wide border-b border-white/20 pb-2.5">
              Our Surgical Clinics
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13.5px] font-semibold text-blue-100/90">
              {[
                { name: "Proctology & Laser Piles Center", href: "/specialities/laser-piles" },
                { name: "Urology & Circumcision Suites", href: "/specialities/circumcision" },
                { name: "Laparoscopic & General Surgery", href: "/specialities/gallstone" },
                { name: "Hernia & Mesh Repair Protocols", href: "/specialities/hernia" },
                { name: "Orthopedics & Joint Preservation", href: "/specialities" },
                { name: "Gynecology & Pelvic Care", href: "/specialities" },
                { name: "ENT, Sinus & Ear Reconstruction", href: "/specialities" },
                { name: "Ophthalmology & Refractive Suites", href: "/specialities" },
                { name: "Vascular & Varicose Vein Therapies", href: "/specialities/varicose" },
                { name: "Men's Surgery & Metabolic Bariatrics", href: "/specialities" },
                { name: "Breast Care & Surgical Oncology", href: "/specialities" },
                { name: "Diagnostic & Operative Hysteroscopy", href: "/specialities" },
                { name: "Advanced Kidney Stone (RIRS/ESWL)", href: "/specialities" }
              ].map((clinic, idx) => (
                <li key={idx}>
                  <Link 
                    href={clinic.href} 
                    onClick={() => haptic.light()} 
                    className="hover:text-white hover:underline decoration-amber-400 transition-colors block py-0.5"
                  >
                    &rsaquo; {clinic.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links & Institutional Navigation (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-base sm:text-lg font-extrabold text-white tracking-wide border-b border-white/20 pb-2.5">
              Institutional Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13.5px] font-semibold text-blue-100/90">
              {[
                { name: "About HealthFlo Directorate", href: "/contact" },
                { name: "Regional Locations Directory", href: "/locations" },
                { name: "Standard 11-Point Package Guarantee", href: "/specialities" },
                { name: "Find an Empanelled Surgeon", href: "/specialities" },
                { name: "Check Insurance Eligibility", href: "/specialities" },
                { name: "Regional Transit & Cab Assistance", href: "/locations" },
                { name: "AI Symptom Diagnostic Triage", href: "/" },
                { name: "Patient Feedback & Success Stories", href: "/" },
                { name: "Corporate Group Mediclaim Desk", href: "/contact" },
                { name: "Clinical Careers & Fellowship", href: "/contact" },
                { name: "Privacy Policy & HIPAA Charter", href: "/contact" },
                { name: "Terms of Surgical Care", href: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link 
                    href={link.href} 
                    onClick={() => haptic.light()} 
                    className="hover:text-white hover:underline decoration-amber-400 transition-colors block py-0.5"
                  >
                    &rsaquo; {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Doctor Helpline & 24/7 Priority Desk (Span 3) */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className="text-base sm:text-lg font-extrabold text-white tracking-wide border-b border-white/20 pb-2.5 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
              <span>Doctor Enquiry & Helpline</span>
            </h4>
            
            <div className="space-y-3">
              <div className="bg-[#122442] border border-white/15 rounded-2xl p-4 space-y-2.5 shadow-md">
                <span className="text-[11px] font-black uppercase text-amber-300 block tracking-wider">24/7 Priority Triage Desk</span>
                <a 
                  href={`tel:+${config.helplineRaw}`} 
                  onClick={() => haptic.medium()} 
                  className="block text-xl sm:text-2xl font-black text-white hover:text-amber-300 transition-colors tracking-tight"
                >
                  {config.helplineNumber}
                </a>
                <p className="text-[11px] text-blue-200/90 font-medium leading-normal">
                  Connect instantly with senior clinical coordinators for rapid admission and insurance guidance.
                </p>
                <a 
                  href={`tel:+${config.helplineRaw}`} 
                  className="inline-flex items-center justify-center gap-2 text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 px-4 py-2.5 rounded-xl transition-all shadow-sm w-full mt-1"
                >
                  <Phone className="w-3.5 h-3.5 fill-slate-950 text-slate-950 shrink-0" />
                  <span>Call Dispatch Coordinator</span>
                </a>
              </div>

              <div className="bg-white/5 rounded-xl p-3.5 border border-white/10 space-y-2 text-xs">
                <p className="font-extrabold text-white">Clinical & Corporate Emails:</p>
                {[
                  config.email,
                  config.directorateEmail
                ].map((email) => (
                  <a 
                    key={email}
                    href={`mailto:${email}`} 
                    className="font-medium text-blue-200 hover:text-white transition-colors flex items-center gap-2 group/email"
                  >
                    <svg className="w-3.5 h-3.5 fill-blue-300 shrink-0 group-hover/email:fill-white transition-colors" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    <span className="truncate">{email}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* ── BOTTOM BAR: LEGAL CHARTER & COPYRIGHT ────────────────────────── */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-[13px] font-medium text-blue-200/90 text-center sm:text-left">
          <div>
            <p 
              onClick={handleCovertTrigger}
              title="HealthFlo Security Charter & DPDP Certification"
              className="font-extrabold text-white hover:text-amber-300 transition-colors cursor-pointer select-none"
            >
              © 2026 HealthFlo MediTech Systems • DPDP Safe-Harbor Certified • USFDA & NABH Accredited Protocols
            </p>
            <p className="text-[11px] text-blue-200/70 mt-1">
              Insurance Eligible across 30+ Major Insurers • Zero Out-Of-Pocket Surprises • HIPAA Compliant Patient Triage
            </p>
          </div>

          <div className="flex items-center gap-5 font-bold text-xs text-white">
            <Link href="/contact" className="hover:text-amber-300 transition-colors">Privacy Charter</Link>
            <span className="text-blue-400">|</span>
            <Link href="/contact" className="hover:text-amber-300 transition-colors">Terms of Surgery</Link>
            <span className="text-blue-400">|</span>
            <Link href="/locations" className="hover:text-amber-300 transition-colors">Regional Hubs</Link>
          </div>
        </div>

      </div>

    </footer>
  );
}
