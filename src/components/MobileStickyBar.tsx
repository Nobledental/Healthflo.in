"use client";

import { Phone, MessageCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const PHONE = "+919363650066";
const WHATSAPP_MSG = encodeURIComponent("Hello HealthFlo, I'd like a free callback.");

export default function MobileStickyBar() {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-[100] md:hidden"
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-3 py-3 flex items-stretch gap-2 pb-safe">
        <a
          href={`https://wa.me/${PHONE}?text=${WHATSAPP_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-[#25D366] text-white font-bold py-2.5 rounded-xl text-[12px] active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          <span>WhatsApp</span>
        </a>
        <a
          href={`tel:${PHONE}`}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-slate-900 text-white font-bold py-2.5 rounded-xl text-[12px] active:scale-95 transition-all"
        >
          <Phone className="w-5 h-5" />
          <span>Call Now</span>
        </a>
        <a
          href="#lead-capture"
          className="flex-1 flex flex-col items-center justify-center gap-0.5 bg-[#05f] text-white font-bold py-2.5 rounded-xl text-[12px] active:scale-95 transition-all relative overflow-hidden"
        >
          {/* Pulse indicator */}
          <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-pulse border border-white" />
          <Calendar className="w-5 h-5" />
          <span>Book Free</span>
        </a>
      </div>
    </motion.div>
  );
}
