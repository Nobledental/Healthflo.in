"use client";

import { MagnifyingGlass, Bell, Phone, ShieldCheck, SignOut } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InteractiveOrb from "./InteractiveOrb";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Navbar() {
  const { config } = useSiteConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastOrbSection, setIsPastOrbSection] = useState(false);
  const [showSafeTooltip, setShowSafeTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Bottom nav appears when top nav disappears
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Orb introduces itself after scrolling past the main Orb section
      if (window.scrollY > 800) {
        setIsPastOrbSection(true);
      } else {
        setIsPastOrbSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Quick Exit / Safe Leave feature for patients researching private medical treatments (circumcision/proctology)
  const handleSafeLeave = () => {
    window.location.replace("https://www.google.com");
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 w-full flex items-center px-4 md:px-8 py-4 md:py-6 justify-between z-50 bg-transparent">
        <div className="flex items-center w-auto md:w-1/4">
          <Link href="/" className="text-[18px] md:text-[20px] font-bold text-slate-900 tracking-tighter flex items-center">
            <div className="relative w-5 h-5 md:w-6 md:h-6 mr-2 flex items-center justify-center">
              <div className="absolute w-5 h-5 md:w-6 md:h-6 bg-[#0a84ff]/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              <div className="absolute w-3.5 h-3.5 md:w-4 md:h-4 bg-[#0a84ff]/40 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#0a84ff] rounded-full shadow-[0_0_8px_3px_rgba(10,132,255,0.6)] z-10"></div>
            </div>
            <span className="bg-white/40 backdrop-blur-md px-3 py-0.5 rounded-full text-slate-800 border border-white/40 inline-flex items-center shadow-2xs hover:bg-white/70 transition-colors">
              <span>Health</span><span className="text-[#0a84ff] font-extrabold">Flo</span>
            </span>
          </Link>
        </div>
        
        {/* Top Center Links (Slide up and disappear on scroll) */}
        <div className={`hidden md:flex space-x-8 justify-center w-2/4 transition-all duration-500 ease-in-out ${isScrolled ? "-translate-y-10 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
          <Link className="text-slate-900 font-semibold text-[15px] hover:text-blue-600 transition-colors" href="/">Overview</Link>
          <Link className="text-slate-700 font-bold text-[15px] hover:text-blue-600 transition-colors flex items-center gap-1" href="/specialities">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
            Specialities
          </Link>
          <Link className="text-slate-600 font-medium text-[15px] hover:text-slate-900 transition-colors" href="/locations">Regional Hubs</Link>
          <Link className="text-slate-600 font-medium text-[15px] hover:text-slate-900 transition-colors" href="/contact">Contact Us</Link>
        </div>

        <div className="flex items-center gap-2 md:gap-3 md:w-1/4 justify-end">
          {/* Safe Leave / Quick Exit Privacy Button */}
          <div className="relative">
            <button
              onClick={handleSafeLeave}
              onMouseEnter={() => setShowSafeTooltip(true)}
              onMouseLeave={() => setShowSafeTooltip(false)}
              className="bg-rose-50 hover:bg-rose-100 border border-rose-200/60 text-rose-700 text-xs font-semibold px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xs transition-all hover:scale-105"
              title="Click to instantly switch screen to Google for personal privacy"
            >
              <ShieldCheck weight="fill" className="text-rose-600 text-sm" />
              <span className="hidden sm:inline">Safe Leave</span>
              <SignOut className="text-xs text-rose-600 hidden lg:inline" />
            </button>
            {showSafeTooltip && (
              <div className="absolute top-10 right-0 bg-slate-900 text-white text-[11px] font-medium p-2 rounded-lg shadow-xl w-48 z-50 animate-in fade-in zoom-in-95 duration-150">
                <span className="text-rose-400 font-bold">Privacy Shield:</span> Click to instantly exit page if someone approaches your screen.
              </div>
            )}
          </div>

          <div className="relative hidden xl:block">
            <input className="bg-white/60 border border-white/40 rounded-full py-1.5 pl-5 pr-10 text-[13px] font-medium text-slate-800 w-48 focus:outline-none focus:border-[#0a84ff] focus:bg-white placeholder-slate-400 backdrop-blur-md transition-all shadow-sm" placeholder="Search surgery..." type="text"/>
            <MagnifyingGlass className="absolute right-4 top-2.5 text-sm text-slate-400" />
          </div>

          <a href={`tel:+${config.helplineRaw}`} title={`Call HealthFlo Helpline: ${config.helplineNumber}`} className="w-8 h-8 flex items-center justify-center bg-[#0055ff] hover:bg-blue-700 text-white rounded-full shadow-md transition-all hover:scale-105">
            <Phone weight="fill" className="text-[14px]" />
          </a>
        </div>
      </nav>

      {/* Floating Bottom Nav (Slides in from bottom on scroll) — DESKTOP ONLY */}
      <div className={`hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"}`}>
        <div className="flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(10,132,255,0.18)]">
          {/* Orb placed next to the links */}
          <div className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] shrink-0 mr-2 ml-1">
             <InteractiveOrb showSpeechBubble={isPastOrbSection} blinkOnMount={isPastOrbSection} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0a84ff] mr-4 leading-tight max-w-[60px] hidden md:block">AI Care Navigator</span>

          <div className="h-6 w-[1px] bg-slate-300/60 mr-6"></div>

          <div className="flex space-x-6 md:space-x-8 pr-4 items-center">
            <Link className="text-slate-900 font-semibold text-[15px] hover:text-[#0a84ff] transition-colors" href="/">Overview</Link>
            <Link className="text-blue-600 font-bold text-[15px] hover:text-blue-700 transition-colors flex items-center gap-1.5" href="/specialities">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              Specialities
            </Link>
            <Link className="text-slate-700 font-medium text-[15px] hover:text-[#0a84ff] transition-colors" href="/locations">Regional Hubs</Link>
            <Link className="text-slate-700 font-medium text-[15px] hover:text-[#0a84ff] transition-colors" href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
