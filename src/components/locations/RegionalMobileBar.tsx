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

  const defaultWhatsAppMsg = `Hello HealthFlo, I'm looking for ${procedureTitle} in ${cityName}. Could I speak with a ${nativeLanguage} care coordinator?`;
  const targetWhatsAppUrl = whatsappUrl || `https://wa.me/${config.helplineRaw}?text=${encodeURIComponent(defaultWhatsAppMsg)}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] py-3 px-4 pb-4">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        
        {/* Soft Pastel Phone Button */}
        <a
          href={`tel:+${config.helplineRaw}`}
          onClick={handlePhoneClick}
          className="flex-1 py-3 px-3 rounded-2xl bg-blue-50/80 hover:bg-blue-100 active:scale-[0.98] text-blue-700 flex items-center justify-center gap-2.5 transition-all shadow-sm border border-blue-100/50"
        >
          <div className="w-8 h-8 rounded-full bg-blue-200/50 flex items-center justify-center">
            <Phone className="w-4 h-4 fill-blue-600/20 text-blue-700" />
          </div>
          <div className="text-left leading-tight">
            <span className="text-[10px] font-bold text-blue-600/80 uppercase block">Helpline</span>
            <span className="text-sm font-black tracking-tight text-blue-900 block">Call Us</span>
          </div>
        </a>

        {/* Soft Pastel WhatsApp Button */}
        <a
          href={targetWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppClick}
          className="flex-1 py-3 px-3 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100 active:scale-[0.98] text-emerald-800 flex items-center justify-center gap-2.5 transition-all shadow-sm border border-emerald-100/50"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-200/50 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 fill-emerald-600/20 text-emerald-700" />
          </div>
          <div className="text-left leading-tight">
            <span className="text-[10px] font-bold text-emerald-600/80 uppercase block">Consult</span>
            <span className="text-sm font-black tracking-tight text-emerald-900 block">WhatsApp</span>
          </div>
        </a>

      </div>
      
      <div className="flex items-center justify-center gap-1.5 mt-2.5 text-[10px] font-bold text-slate-500">
        <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
        <span>Secure & Confidential Care in {cityName}</span>
      </div>
    </div>
  );
}
