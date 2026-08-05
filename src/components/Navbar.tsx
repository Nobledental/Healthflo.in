"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Bell, Search } from "lucide-react";
import InteractiveOrb from "./InteractiveOrb";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { haptic } from "@/utils/haptics";

export default function Navbar() {
  const { config } = useSiteConfig();
  const pathname = usePathname() || "";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastOrbSection, setIsPastOrbSection] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (window.scrollY > 800) {
        setIsPastOrbSection(true);
      } else {
        setIsPastOrbSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    haptic.medium();
    if (searchVal.trim()) {
      window.location.href = `/specialities?search=${encodeURIComponent(searchVal.trim())}`;
    } else {
      window.location.href = "/specialities";
    }
  };

  const navLinks = [
    { name: "Overview", href: "/" },
    { name: "Specialities", href: "/specialities", dot: "bg-emerald-500 animate-pulse" },
    { name: "⚡ AI Triage", href: "/ai", textClass: "text-cyan-700 hover:text-blue-700" },
    { name: "Regional Hubs", href: "/locations" },
    { name: "Products & Login", href: "/product" },
    { name: "Contact Us", href: "/contact" },
  ];

  const getLinkClass = (targetHref: string, textClass?: string) => {
    const isActive = pathname === targetHref || (targetHref !== "/" && pathname.startsWith(targetHref));
    const baseClass = "px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] lg:text-[14px] transition-all flex items-center gap-1.5 whitespace-nowrap ";
    if (isActive) {
      return baseClass + "bg-white text-slate-900 font-black shadow-xs border border-slate-200/80";
    }
    return baseClass + `font-bold ${textClass || "text-slate-600 hover:text-slate-900"} hover:bg-white/80 bg-transparent`;
  };

  return (
    <>
      {/* ── TOP NAVBAR: TRANSPARENT & UNIFORM CAPSULE UI DESIGN ────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 w-full flex items-center justify-between px-3 sm:px-6 lg:px-8 py-3.5 z-50 bg-transparent pointer-events-none">
        
        {/* Left Section: Brand Badge & Connected Capsule Navigator */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 pointer-events-auto">
          
          {/* Uniform Brand Capsule */}
          <div className="flex items-center p-1 bg-[#EEF1F5]/90 backdrop-blur-xl border-2 border-white rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.06)] h-11 sm:h-12 lg:h-13">
            <Link 
              href="/" 
              onClick={() => haptic.light()}
              className="px-3.5 py-1.5 rounded-full bg-white text-slate-900 shadow-2xs border border-slate-200/60 font-black text-base sm:text-[17px] tracking-tight flex items-center gap-2 hover:bg-slate-50 transition-colors h-full"
            >
              <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                <div className="absolute w-4 h-4 bg-[#0055ff]/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="w-2 h-2 bg-[#0055ff] rounded-full shadow-[0_0_8px_3px_rgba(0,85,255,0.6)] z-10" />
              </div>
              <span className="leading-none">
                <span>Health</span><span className="text-[#0055ff]">Flo</span>
              </span>
            </Link>
          </div>

          {/* Connected Twin Pills - Uniform Height */}
          <div className={`hidden xl:flex items-center p-1 bg-[#EEF1F5]/90 backdrop-blur-xl border-2 border-white rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.06)] gap-1 text-xs font-bold shrink-0 h-11 sm:h-12 lg:h-13 transition-all duration-500 ease-in-out ${
            isScrolled ? "-translate-y-12 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
          }`}>
            <Link
              href="/#lead-capture"
              onClick={() => haptic.light()}
              className="px-3.5 py-1.5 rounded-full text-slate-600 hover:text-slate-900 font-bold hover:bg-white/80 transition-all"
            >
              Diagnose
            </Link>
            <div className="w-[1.5px] h-4 bg-slate-300/60 rounded-full my-auto" />
            <Link
              href="/specialities"
              onClick={() => haptic.light()}
              className="px-3.5 py-1.5 rounded-full bg-white text-slate-900 shadow-xs border border-slate-200/80 font-black hover:border-[#0055ff]/40 transition-all flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#0055ff] shrink-0 shadow-[0_0_6px_rgba(0,85,255,0.6)]" />
              <span>My Surgery</span>
            </Link>
          </div>

        </div>

        {/* Center Section: Core Navigation Links Capsule with Uniform White Pill Effect */}
        <div className={`hidden md:flex items-center p-1.5 px-3 lg:px-4 bg-[#EEF1F5]/90 backdrop-blur-xl border-2 border-white rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.06)] gap-1 shrink-0 pointer-events-auto h-11 sm:h-12 lg:h-13 transition-all duration-500 ease-in-out ${
          isScrolled ? "-translate-y-12 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => haptic.light()}
              className={getLinkClass(link.href, link.textClass)}
            >
              {link.dot && <span className={`w-2 h-2 rounded-full inline-block shrink-0 ${link.dot}`} />}
              <span>{link.name}</span>
            </Link>
          ))}
        </div>

        {/* Right Section: Wide Search & Connected Triple-Circle Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 pointer-events-auto">
          
          {/* Capsule Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className={`hidden 2xl:flex items-center w-48 shrink-0 h-11 sm:h-12 lg:h-13 transition-all duration-500 ease-in-out ${
              isScrolled ? "-translate-y-12 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
            }`}
          >
            <div className="w-full h-full p-1 pl-4 pr-1 bg-[#EEF1F5]/90 backdrop-blur-xl border-2 border-white rounded-full flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.06)] focus-within:ring-2 focus-within:ring-[#0055ff]/30 focus-within:border-[#0055ff] transition-all">
              <input 
                type="text" 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search..." 
                className="w-full bg-transparent text-slate-800 text-xs sm:text-sm font-semibold focus:outline-none placeholder:text-slate-400 pl-1 pr-2" 
              />
              <button 
                type="submit"
                onClick={() => haptic.light()}
                className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-white hover:bg-[#0055ff] text-slate-700 hover:text-white flex items-center justify-center shadow-xs transition-all shrink-0 border border-slate-200/60 hover:border-[#0055ff]"
                aria-label="Search Surgery"
              >
                <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </form>

          {/* Connected Triple-Circle Actions - Uniform Height */}
          <div className="flex items-center p-1 bg-[#EEF1F5]/90 backdrop-blur-xl border-2 border-white rounded-full shadow-[0_2px_15px_rgba(0,0,0,0.06)] gap-1 shrink-0 h-11 sm:h-12 lg:h-13">
            
            {/* 1. Vibrant Blue Phone Circle */}
            <a
              href={`tel:+${config.helplineRaw}`}
              onClick={() => haptic.medium()}
              title={`Call HealthFlo Triage Desk: +91 ${config.helplineNumber}`}
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-[#0055ff] hover:bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/30 transition-transform active:scale-95 shrink-0"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current text-white" />
            </a>

            {/* 2. White Bell Circle with Red Dot */}
            <button
              type="button"
              onClick={() => {
                haptic.light();
                alert("🔔 Clinical Notice: All South India Laser Surgical Centers currently have instant triage & zero-stitch OPD appointments open!");
              }}
              title="Clinical Notifications"
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-xs border border-slate-200/60 relative transition-transform active:scale-95 shrink-0"
            >
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2] text-slate-700" />
              <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse" />
            </button>

            {/* 3. Coordinator Avatar Circle */}
            <div
              onClick={() => {
                haptic.light();
                alert("👨‍⚕️ Your Dedicated Medical Coordinator is assigned & monitoring your triage file.");
              }}
              title="Your Dedicated Medical Coordinator"
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full bg-blue-50 border-2 border-white overflow-hidden shadow-xs cursor-pointer hover:scale-105 transition-transform flex items-center justify-center shrink-0 relative"
            >
              <span className="text-[9px] font-black text-[#0055ff] absolute pointer-events-none">MC</span>
              <img 
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=150&h=150&q=80" 
                alt="Coordinator" 
                className="w-full h-full object-cover relative z-10"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>

          </div>

        </div>
      </nav>

      {/* ── FLOATING BOTTOM NAV (DESKTOP ON SCROLL) ────────────────────────────── */}
      <div className={`hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      }`}>
        <div className="flex items-center px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#EEF1F5]/95 backdrop-blur-2xl border-2 border-white shadow-[0_8px_32px_rgba(10,37,64,0.15)] gap-4">
          
          <div className="w-[42px] h-[42px] shrink-0 mr-1">
            <InteractiveOrb showSpeechBubble={isPastOrbSection} blinkOnMount={isPastOrbSection} />
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider text-[#0055ff] mr-2 leading-tight max-w-[70px] hidden lg:block">
            AI Care Navigator
          </span>

          <div className="h-5 w-[1.5px] bg-slate-300/60 mr-2" />

          <div className="flex space-x-6 pr-4 items-center font-extrabold text-[14px]">
            <Link className="text-slate-700 hover:text-[#0055ff] transition-colors whitespace-nowrap" href="/">Overview</Link>
            <Link className="text-[#0055ff] hover:text-blue-700 transition-colors flex items-center gap-1.5 whitespace-nowrap" href="/specialities">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse shrink-0" />
              Specialities
            </Link>
            <Link className="text-cyan-600 hover:text-blue-700 transition-colors font-black whitespace-nowrap" href="/ai">⚡ AI Triage</Link>
            <Link className="text-slate-700 hover:text-[#0055ff] transition-colors whitespace-nowrap" href="/locations">Regional Hubs</Link>
            <Link className="text-slate-900 hover:text-[#0055ff] transition-colors font-black whitespace-nowrap" href="/product">Products & Login</Link>
            <Link className="text-slate-700 hover:text-[#0055ff] transition-colors whitespace-nowrap" href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
