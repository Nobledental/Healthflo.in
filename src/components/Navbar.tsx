"use client";

import { MagnifyingGlass, Bell, Phone } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import InteractiveOrb from "./InteractiveOrb";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastOrbSection, setIsPastOrbSection] = useState(false);

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

  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 w-full flex items-center px-8 py-6 justify-between z-50 bg-transparent">
        <div className="flex items-center w-1/4">
          <div className="text-[20px] font-bold text-slate-900 tracking-tighter flex items-center">
            <div className="relative w-6 h-6 mr-2 flex items-center justify-center">
              <div className="absolute w-6 h-6 bg-[#0a84ff]/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              <div className="absolute w-4 h-4 bg-[#0a84ff]/40 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#0a84ff] rounded-full shadow-[0_0_8px_3px_rgba(10,132,255,0.6)] z-10"></div>
            </div>
            <span className="bg-white/40 backdrop-blur-md pl-3 pr-1 py-0.5 rounded-l-full text-slate-800 border border-white/40 border-r-0">Health</span><span className="text-[#0a84ff] bg-white/40 backdrop-blur-md pr-3 pl-0 py-0.5 rounded-r-full font-extrabold border border-white/40 border-l-0">Flo</span>
          </div>
        </div>
        
        {/* Top Center Links (Slide up and disappear on scroll) */}
        <div className={`hidden md:flex space-x-8 justify-center w-2/4 transition-all duration-500 ease-in-out ${isScrolled ? "-translate-y-10 opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}>
          <Link className="text-slate-900 font-semibold text-[15px] hover:text-accent-blue transition-colors" href="#">Overview</Link>
          <Link className="text-slate-600 font-medium text-[15px] hover:text-slate-900 transition-colors" href="#">Departments</Link>
          <Link className="text-slate-600 font-medium text-[15px] hover:text-slate-900 transition-colors" href="#">Patient Portal</Link>
          <Link className="text-slate-600 font-medium text-[15px] hover:text-slate-900 transition-colors" href="#">Contact Us</Link>
        </div>

        <div className="flex items-center space-x-4 w-1/4 justify-end">
          <div className="relative hidden lg:block">
            <input className="bg-white/60 border border-white/40 rounded-full py-1.5 pl-5 pr-10 text-[14px] font-medium text-slate-800 w-56 focus:outline-none focus:border-[#0a84ff] focus:bg-white placeholder-slate-400 backdrop-blur-md transition-all shadow-sm" placeholder="Search data..." type="text"/>
            <MagnifyingGlass className="absolute right-4 top-2 text-sm text-slate-400" />
          </div>
          <div className="relative cursor-pointer w-8 h-8 flex items-center justify-center bg-white/60 rounded-full border border-white/40 hover:bg-white transition-colors shadow-sm">
            <Bell className="text-[16px] text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
          </div>
          <a href="tel:+919363650066" className="w-8 h-8 flex items-center justify-center bg-[#0055ff] hover:bg-blue-700 text-white rounded-full shadow-md transition-all hover:scale-105">
            <Phone weight="fill" className="text-[14px]" />
          </a>
        </div>
      </nav>

      {/* Floating Bottom Nav (Slides in from bottom on scroll) */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"}`}>
        <div className="flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/30 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(10,132,255,0.15)]">
          {/* Orb placed next to the links */}
          <div className="w-[40px] h-[40px] md:w-[48px] md:h-[48px] shrink-0 mr-2 ml-1">
             <InteractiveOrb showSpeechBubble={isPastOrbSection} blinkOnMount={isPastOrbSection} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0a84ff] mr-4 leading-tight max-w-[60px] hidden md:block">AI Care Navigator</span>

          <div className="h-6 w-[1px] bg-slate-300/50 mr-6"></div>

          <div className="flex space-x-6 md:space-x-8 pr-4">
            <Link className="text-slate-900 font-semibold text-[15px] hover:text-[#0a84ff] transition-colors" href="#">Overview</Link>
            <Link className="text-slate-700 font-medium text-[15px] hover:text-[#0a84ff] transition-colors" href="#">Departments</Link>
            <Link className="text-slate-700 font-medium text-[15px] hover:text-[#0a84ff] transition-colors" href="#">Patient Portal</Link>
            <Link className="text-slate-700 font-medium text-[15px] hover:text-[#0a84ff] transition-colors" href="#">Contact Us</Link>
          </div>
        </div>
      </div>
    </>
  );
}
