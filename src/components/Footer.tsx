"use client";

import Link from "next/link";
import { TwitterLogo, LinkedinLogo, FacebookLogo } from "@phosphor-icons/react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e2e8f0] bg-white/80 backdrop-blur-xl py-12 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2">
          <div className="text-[20px] font-bold text-slate-900 tracking-tighter mb-4 flex items-center">
            <div className="relative w-6 h-6 mr-2 flex items-center justify-center">
              <div className="w-2 h-2 bg-[#0a84ff] rounded-full shadow-[0_0_8px_3px_rgba(10,132,255,0.6)] z-10"></div>
            </div>
            <span className="text-slate-800">Health</span>
            <span className="text-[#0a84ff]">flo</span>
          </div>
          <p className="text-slate-600 text-sm mb-6 max-w-sm">
            Leading the future of minimally invasive and robotic-assisted surgery for exceptional patient outcomes.
          </p>
        </div>
        <div>
          <h3 className="text-slate-900 font-semibold text-sm mb-4">About</h3>
          <ul className="space-y-3">
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Our History</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Leadership Team</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Careers</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">News &amp; Press</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-slate-900 font-semibold text-sm mb-4">Departments</h3>
          <ul className="space-y-3">
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Cardiothoracic</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Neurosurgery</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Orthopedic</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Robotic Urology</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-slate-900 font-semibold text-sm mb-4">Patient Portal</h3>
          <ul className="space-y-3">
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Log In</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Pay Bill</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Medical Records</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Support</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-[#e2e8f0] flex flex-col md:flex-row justify-between items-center">
        <p className="text-slate-500 text-sm">© 2024 Healthflo Hospitals. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link className="text-slate-500 hover:text-slate-900 transition-colors" href="#"><TwitterLogo weight="fill" className="text-lg" /></Link>
          <Link className="text-slate-500 hover:text-slate-900 transition-colors" href="#"><LinkedinLogo weight="fill" className="text-lg" /></Link>
          <Link className="text-slate-500 hover:text-slate-900 transition-colors" href="#"><FacebookLogo weight="fill" className="text-lg" /></Link>
        </div>
      </div>
    </footer>
  );
}
