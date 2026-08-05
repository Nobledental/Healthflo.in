"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  ShieldCheck,
  Phone,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";
import { haptic } from "@/utils/haptics";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function ActionGrid() {
  const { config } = useSiteConfig();

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
      ctaStyle: "bg-[#0066FF] hover:bg-blue-700 text-white",
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
      ctaStyle: "bg-emerald-600 hover:bg-emerald-700 text-white",
      hapticMode: "light",
    },
    {
      icon: CreditCard,
      tag: "Zero Interest EMI",
      title: "No-Cost Surgery EMI",
      desc: "Don't delay surgical recovery due to finance. Flexible plans starting at just ₹999/month.",
      cta: "Explore EMI Plans",
      href: "#lead-capture",
      iconBg: "bg-[#e6f7f5] text-[#00A88F] border-[#b2e8e1]",
      hoverBorder: "hover:border-[#00A88F]",
      ctaStyle: "bg-[#00A88F] hover:bg-[#008f78] text-white",
      hapticMode: "light",
    },
    {
      icon: Phone,
      tag: "24×7 Emergency",
      title: "Instant Triage Helpline",
      desc: "Speak directly with our senior care coordinators & surgical experts for urgent guidance.",
      cta: `Call: ${config.helplineNumber}`,
      href: `tel:+${config.helplineRaw}`,
      iconBg: "bg-blue-50 text-[#0055ff] border-blue-200",
      hoverBorder: "hover:border-[#0055ff]",
      ctaStyle: "bg-slate-900 hover:bg-slate-800 text-white",
      hapticMode: "medium",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
            className={`flex flex-col justify-between bg-white rounded-2xl p-5 border border-slate-200 ${action.hoverBorder} shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 no-underline group`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${action.iconBg} group-hover:scale-105 transition-transform duration-300`}>
                  <action.icon className="w-5 h-5 stroke-[2]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                  {action.tag}
                </span>
              </div>

              <h3 className="font-extrabold text-[16px] text-slate-900 leading-tight mb-2 group-hover:text-[#0066FF] transition-colors">
                {action.title}
              </h3>

              <p className="text-[12px] text-slate-500 font-medium leading-relaxed mb-5">
                {action.desc}
              </p>
            </div>

            <div className={`w-full flex items-center justify-between font-extrabold text-[12px] rounded-xl px-4 py-3 transition-all ${action.ctaStyle}`}>
              <span>{action.cta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
