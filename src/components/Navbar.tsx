"use client";

import { MagnifyingGlass, Bell } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 w-full flex items-center px-8 py-6 justify-between z-50 bg-transparent">
      <div className="flex items-center w-1/4">
        <div className="text-[20px] font-bold text-slate-900 tracking-tighter flex items-center">
          <div className="relative w-6 h-6 mr-2 flex items-center justify-center">
            <div className="absolute w-6 h-6 bg-[#0a84ff]/20 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            <div className="absolute w-4 h-4 bg-[#0a84ff]/40 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-[#0a84ff] rounded-full shadow-[0_0_8px_3px_rgba(10,132,255,0.6)] z-10"></div>
          </div>
          <span className="bg-white/40 backdrop-blur-md px-2 py-0.5 rounded-l-full text-slate-800 border border-white/40">Health</span>
          <span className="text-[#0a84ff] bg-transparent rounded-r-full font-extrabold pr-2">flo</span>
        </div>
      </div>
      
      <div className="hidden md:flex space-x-8 justify-center w-2/4">
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
        <Image alt="Profile" width={32} height={32} className="w-8 h-8 rounded-full object-cover border border-white/40 shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrflFTN90xdhvUADUmLj4NgmyOqpNCecNgMFjpmsYO62QX5TUlJ25hrARzkS5ZuiLYBMsCe9jFV8DAd7XSJqYIMkV8-4g5ibqfe-pitSw3Q_CvOdR6GQiEZDlhTKtNm2Ad-3yIhoZM6gG9VcKkk5wN9kzT0fAGR0VascBPsuYMruju8DDS3wWSF4uDY00o04PiKaGcqAE3g0QFchbAe1qhoYgy2QFchbAe1qhoYgy2uvo9bxsdDTXzbUEO2TCMf4lM6RUtA" unoptimized/>
      </div>
    </nav>
  );
}
