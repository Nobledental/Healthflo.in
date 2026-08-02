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
          <p className="text-slate-600 text-sm mb-4 max-w-sm">
            India's trusted managed surgical care network. Cashless on 30+ insurers. Same-day discharge. Dedicated care coordinators.
          </p>
          <div className="flex flex-col gap-2">
            <a href="tel:+919363650066" className="text-sm font-bold text-[#0a84ff] hover:underline">📞 +91 93636 50066</a>
            <a href="https://wa.me/919363650066" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-green-600 hover:underline">💬 WhatsApp Us</a>
          </div>
        </div>
        <div>
          <h3 className="text-slate-900 font-semibold text-sm mb-4">Company</h3>
          <ul className="space-y-3">
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">About HealthFlo</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Our Surgical Team</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">HealthFlo Facilities</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-slate-900 font-semibold text-sm mb-4">Treatments</h3>
          <ul className="space-y-3">
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#specialized-treatments">Laser Piles & Fissure</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#specialized-treatments">Laser Fistula Treatment</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#specialized-treatments">Laser Circumcision</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#specialized-treatments">Lipoma & Cyst Removal</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-slate-900 font-semibold text-sm mb-4">Patient Support</h3>
          <ul className="space-y-3">
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#faq">FAQs</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#insurance">Insurance Desk</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#package-inclusions">What's Included</Link></li>
            <li><Link className="text-slate-600 hover:text-[#0a84ff] text-sm transition-colors" href="#lead-capture">Book Consultation</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-12 pt-8 border-t border-[#e2e8f0] flex flex-col md:flex-row justify-between items-center">
        <p className="text-slate-500 text-sm">© 2025 HealthFlo Surgical Care Network. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link className="text-slate-500 hover:text-slate-900 transition-colors" href="#"><TwitterLogo weight="fill" className="text-lg" /></Link>
          <Link className="text-slate-500 hover:text-slate-900 transition-colors" href="#"><LinkedinLogo weight="fill" className="text-lg" /></Link>
          <Link className="text-slate-500 hover:text-slate-900 transition-colors" href="#"><FacebookLogo weight="fill" className="text-lg" /></Link>
        </div>
      </div>
    </footer>
  );
}
