"use client";

import { Phone, MessageCircle, Calendar } from "lucide-react";

const PHONE = "+919363650066";
const WHATSAPP_MSG = encodeURIComponent("Hello HealthFlo, I'd like a free callback.");

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden">
      <div className="bg-white border-t border-slate-200 shadow-[0_-8px_30px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center gap-2">
        <a
          href={`https://wa.me/${PHONE}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3 rounded-xl text-[14px] active:scale-95 transition-transform"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        <a
          href={`tel:${PHONE}`}
          className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-800 border border-slate-200 font-bold py-3 rounded-xl text-[14px] active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4" />
          Call Now
        </a>
        <a
          href="#lead-capture"
          className="flex-1 flex items-center justify-center gap-2 bg-[#05f] text-white font-bold py-3 rounded-xl text-[14px] active:scale-95 transition-transform"
        >
          <Calendar className="w-4 h-4" />
          Book Free
        </a>
      </div>
    </div>
  );
}
