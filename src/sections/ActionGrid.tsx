"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  ShieldCheck,
  Phone,
  CreditCard,
  MessageCircle,
  ChevronRight,
} from "lucide-react";

const PHONE = "+919363650066";
const WA = `https://wa.me/919363650066?text=${encodeURIComponent("Hello, I'd like to check my insurance eligibility.")}`;

const quickActions = [
  {
    icon: CalendarCheck,
    title: "Check Surgery Packages",
    desc: "Transparent all-inclusive pricing",
    cta: "Check Packages →",
    href: "#lead-capture",
    bg: "from-[#0038ff] to-[#0060ff]",
    text: "text-white",
    ctaStyle: "bg-white/20 hover:bg-white/30 text-white border-white/30",
  },
  {
    icon: ShieldCheck,
    title: "Check Insurance Coverage",
    desc: "30+ insurers. Cashless in 30 min.",
    cta: "Verify Now →",
    href: "#insurance",
    bg: "from-[#047857] to-[#059669]",
    text: "text-white",
    ctaStyle: "bg-white/20 hover:bg-white/30 text-white border-white/30",
  },
  {
    icon: CreditCard,
    title: "EMI — ₹0 Down",
    desc: "Pay from ₹999/month. No-cost EMI.",
    cta: "See Plans →",
    href: "#lead-capture",
    bg: "from-[#7c3aed] to-[#6d28d9]",
    text: "text-white",
    ctaStyle: "bg-white/20 hover:bg-white/30 text-white border-white/30",
  },
  {
    icon: Phone,
    title: "Call Now",
    desc: "+91 93636 50066 · 24×7 support",
    cta: "Call →",
    href: `tel:${PHONE}`,
    bg: "from-slate-800 to-slate-900",
    text: "text-white",
    ctaStyle: "bg-white/20 hover:bg-white/30 text-white border-white/30",
  },
];



export default function ActionGrid() {
  return (
    <section className="w-full flex flex-col gap-6 relative z-10 mb-4">


      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => (
          <motion.a
            key={idx}
            href={action.href}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className={`flex flex-col justify-between bg-gradient-to-br ${action.bg} rounded-2xl p-6 min-h-[160px] group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 no-underline`}
          >
            <div>
              <action.icon className={`w-7 h-7 mb-3 ${action.text} opacity-90`} />
              <h3 className={`font-bold text-[16px] leading-snug ${action.text}`}>{action.title}</h3>
              <p className={`text-[13px] mt-1 ${action.text} opacity-70 leading-snug`}>{action.desc}</p>
            </div>
            <span
              className={`inline-flex items-center gap-1 mt-4 text-[13px] font-bold border rounded-lg px-3 py-1.5 self-start transition-all ${action.ctaStyle}`}
            >
              {action.cta}
            </span>
          </motion.a>
        ))}
      </div>

      {/* Insurance + EMI callout bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl px-6 py-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-green-600 shrink-0" />
          <div>
            <p className="font-bold text-slate-800 text-[15px]">₹0 Upfront with Cashless Insurance</p>
            <p className="text-slate-500 text-[13px]">TATA AIG · Star Health · HDFC Ergo · Care Health · + 26 more</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-violet-600 shrink-0" />
          <div>
            <p className="font-bold text-slate-800 text-[15px]">No-Cost EMI Available</p>
            <p className="text-slate-500 text-[13px]">Pay from ₹999/month · 0% interest options</p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white font-bold px-5 py-2.5 rounded-xl text-[14px] hover:bg-[#1db954] transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4" />
            Check Eligibility Free
          </a>
          <a
            href="#lead-capture"
            className="flex items-center gap-1.5 text-[#05f] font-semibold text-[14px] whitespace-nowrap hover:underline"
          >
            Get EMI Quote <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

    </section>
  );
}
