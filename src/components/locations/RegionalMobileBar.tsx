"use client";

import React from "react";
import { Phone, MessageCircle, ShieldCheck } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { haptic } from "@/utils/haptics";

interface RegionalMobileBarProps {
  cityName: string;
  nativeLanguage?: string;
  procedureTitle?: string;
  whatsappUrl?: string;
}

export default function RegionalMobileBar({
  cityName,
  nativeLanguage = "Regional",
  procedureTitle = "Laser Surgery",
  whatsappUrl,
}: RegionalMobileBarProps) {
  const { config } = useSiteConfig();

  const handleWhatsAppClick = () => {
    haptic.success();
  };

  const handlePhoneClick = () => {
    haptic.medium();
  };

  const defaultWhatsAppMsg = `Hello HealthFlo — I am looking for ${procedureTitle} in ${cityName}. I would like to consult with a ${nativeLanguage} clinical coordinator regarding surgical packages and cashless hospital eligibility.`;
  const targetWhatsAppUrl = whatsappUrl || `https://wa.me/${config.helplineRaw}?text=${encodeURIComponent(defaultWhatsAppMsg)}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#060D1A]/95 backdrop-blur-xl border-t border-slate-800 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] py-3 px-4 transition-all">
      <div className="flex items-center justify-between gap-2.5 max-w-md mx-auto">
        
        {/* Instant Phone Connection */}
        <a
          href={`tel:+${config.helplineRaw}`}
          onClick={handlePhoneClick}
          className="flex-1 py-3 px-3 rounded-xl bg-[#0F1E3B] hover:bg-[#16294D] active:scale-[0.98] border border-cyan-500/30 text-white flex items-center justify-center gap-2 transition shadow-inner"
        >
          <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Phone className="w-3.5 h-3.5 fill-cyan-400 animate-pulse" />
          </div>
          <div className="text-left leading-none">
            <span className="text-[9px] font-bold text-slate-400 uppercase block">24/7 Helpline</span>
            <span className="text-xs font-black tracking-tight text-white mt-0.5 block">Call Doctor</span>
          </div>
        </a>

        {/* WhatsApp Local Language Connection */}
        <a
          href={targetWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="flex-1 py-3 px-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 active:scale-[0.98] text-slate-950 font-black flex items-center justify-center gap-2 transition shadow-[0_4px_20px_rgba(16,185,129,0.4)]"
        >
          <MessageCircle className="w-4 h-4 fill-slate-950 shrink-0" />
          <div className="text-left leading-none">
            <span className="text-[9px] font-extrabold uppercase opacity-80 block">Free Consultation</span>
            <span className="text-xs font-black tracking-tight mt-0.5 block truncate">Chat in {nativeLanguage}</span>
          </div>
        </a>

      </div>
      
      <div className="flex items-center justify-center gap-1 mt-2 text-[10px] font-extrabold text-cyan-400 tracking-wider uppercase">
        <ShieldCheck className="w-3 h-3 text-emerald-400 inline shrink-0" />
        <span>USFDA Certified Surgical Protocols in {cityName}</span>
      </div>
    </div>
  );
}
