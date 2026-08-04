"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  ShieldCheck,
  Phone,
  CreditCard,
  MessageCircle,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from "lucide-react";
import { haptic } from "@/utils/haptics";

const PHONE = "+919363650066";
const WA = `https://wa.me/919363650066?text=${encodeURIComponent("Hello, I'd like to check my hospital insurance & surgical package eligibility.")}`;

const quickActions = [
  {
    icon: CalendarCheck,
    tag: "All-Inclusive Pricing",
    title: "Surgical Care Packages",
    desc: "100% transparent pricing for laser proctology, urology & hernia with zero hidden room charges.",
    cta: "View Packages",
    href: "#lead-capture",
    iconBg: "bg-blue-50 text-[#0066FF] border-blue-200",
    hoverBorder: "hover:border-[#0066FF]",
    ctaStyle: "bg-[#0066FF] hover:bg-blue-700 text-white shadow-[0_4px_14px_rgba(0,102,255,0.25)]",
    hapticMode: "medium",
  },
  {
    icon: ShieldCheck,
    tag: "Cashless Desk",
    title: "Check Insurance Coverage",
    desc: "We accept TATA AIG, Star Health, HDFC Ergo & 30+ major insurers with instant 30-min approval.",
    cta: "Verify Coverage",
    href: "#insurance",
    iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    hoverBorder: "hover:border-emerald-500",
    ctaStyle: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_4px_14px_rgba(16,185,129,0.25)]",
    hapticMode: "light",
  },
  {
    icon: CreditCard,
    tag: "Zero Interest EMI",
    title: "No-Cost Surgery EMI",
    desc: "Don't delay surgical recovery due to finance. Flexible plans starting at just ₹999/month.",
    cta: "Explore EMI Plans",
    href: "#lead-capture",
    iconBg: "bg-purple-50 text-purple-600 border-purple-200",
    hoverBorder: "hover:border-purple-500",
    ctaStyle: "bg-purple-600 hover:bg-purple-700 text-white shadow-[0_4px_14px_rgba(147,51,234,0.25)]",
    hapticMode: "light",
  },
  {
    icon: Phone,
    tag: "24×7 Emergency",
    title: "Instant Triage Helpline",
    desc: "Speak directly with our senior care coordinators & surgical experts for urgent guidance.",
    cta: "Call Now: 93636 50066",
    href: `tel:${PHONE}`,
    iconBg: "bg-rose-50 text-rose-600 border-rose-200",
    hoverBorder: "hover:border-rose-500",
    ctaStyle: "bg-slate-900 hover:bg-slate-800 text-white shadow-[0_4px_14px_rgba(15,23,42,0.25)]",
    hapticMode: "medium",
  },
];

export default function ActionGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8 relative z-10 my-8">

      {/* Quick Action Cards — Sleek Frosted Glass Medical App UI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {quickActions.map((action, idx) => (
          <motion.a
            key={idx}
            href={action.href}
            onClick={() => {
              if (action.hapticMode === "medium") haptic.medium();
              else haptic.light();
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className={`flex flex-col justify-between bg-white/90 backdrop-blur-xl rounded-3xl p-6 border-2 border-slate-200/80 ${action.hoverBorder} shadow-[0_10px_35px_rgba(0,60,180,0.06)] hover:shadow-[0_16px_45px_rgba(0,60,180,0.12)] hover:-translate-y-1.5 transition-all duration-300 no-underline group relative overflow-hidden`}
          >
            {/* Soft subtle top highlight */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#0066FF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-inner ${action.iconBg} group-hover:scale-105 transition-transform duration-300`}>
                  <action.icon className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200/60">
                  {action.tag}
                </span>
              </div>

              <h3 className="font-extrabold text-[17px] sm:text-[18px] text-slate-900 leading-tight mb-2 group-hover:text-[#0066FF] transition-colors">
                {action.title}
              </h3>
              
              <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-6">
                {action.desc}
              </p>
            </div>

            <div
              className={`w-full flex items-center justify-between font-extrabold text-[13px] rounded-2xl px-4 py-3.5 transition-all ${action.ctaStyle}`}
            >
              <span>{action.cta}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* High-Tech Hospital Financing & Insurance Authority Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-[#071936] to-slate-900 text-white border border-blue-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_16px_45px_rgba(0,50,150,0.15)] relative overflow-hidden"
      >
        {/* Background ambient light */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#0066FF]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10 flex-1 min-w-0">
          
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-black text-white text-[16px] sm:text-[17px]">₹0 Upfront Surgery</span>
                <span className="text-[10px] font-extrabold bg-emerald-950 text-emerald-400 border border-emerald-600/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Cashless Approved
                </span>
              </div>
              <p className="text-slate-300 text-[13px] font-semibold mt-0.5 truncate">
                TATA AIG • Star Health • HDFC Ergo • ICICI Lombard • + 30 more
              </p>
            </div>
          </div>

          <div className="hidden lg:block w-[1px] h-10 bg-slate-700 mx-2" />

          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-[#0066FF]/20 border border-[#0066FF]/40 flex items-center justify-center text-[#4da8ff] shrink-0 shadow-inner">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <p className="font-black text-white text-[16px] sm:text-[17px]">No-Cost Surgery EMI</p>
              <p className="text-slate-300 text-[13px] font-semibold mt-0.5">Pay flexibly from ₹999/month • 0% interest options</p>
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto relative z-10">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => haptic.light()}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-4 rounded-2xl text-[14px] shadow-[0_6px_20px_rgba(16,185,129,0.3)] transition-all active:scale-95 whitespace-nowrap"
          >
            <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
            <span>Check Cashless Eligibility</span>
          </a>
          <a
            href="#lead-capture"
            onClick={() => haptic.light()}
            className="flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-[14px] px-5 py-4 rounded-2xl whitespace-nowrap transition-all active:scale-95"
          >
            <span>EMI Quote</span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
          </a>
        </div>
      </motion.div>

    </section>
  );
}
