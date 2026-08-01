"use client";

import { MagnifyingGlass, Globe } from "@phosphor-icons/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full flex items-center px-12 py-6 justify-between z-50 bg-transparent">
      {/* Left: Logo */}
      <div className="flex items-center w-1/4">
        <div className="text-[24px] font-black text-slate-900 tracking-tight uppercase flex items-center">
          Healthflo
        </div>
      </div>
      
      {/* Middle: Links */}
      <div className="hidden md:flex space-x-10 justify-center w-2/4">
        <Link className="text-slate-800 font-medium text-[15px] hover:text-[#0a84ff] transition-colors" href="#">3D animation</Link>
        <Link className="text-slate-800 font-medium text-[15px] hover:text-[#0a84ff] transition-colors" href="#">Modeling &amp; simulation</Link>
        <Link className="text-slate-800 font-medium text-[15px] hover:text-[#0a84ff] transition-colors" href="#">3D Atlas</Link>
        <Link className="text-slate-800 font-medium text-[15px] hover:text-[#0a84ff] transition-colors" href="#">Medical Wiki</Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-6 w-1/4 justify-end">
        <button className="text-slate-800 hover:text-[#0a84ff] transition-colors">
          <MagnifyingGlass weight="regular" className="text-[22px]" />
        </button>
        <button className="text-slate-800 hover:text-[#0a84ff] transition-colors">
          <Globe weight="regular" className="text-[22px]" />
        </button>
        <button className="bg-[#0a84ff] hover:bg-blue-600 text-white font-semibold text-[15px] px-6 py-2.5 rounded-full shadow-sm transition-all">
          Get in touch
        </button>
      </div>
    </nav>
  );
}
