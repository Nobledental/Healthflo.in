"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ShieldCheck, Activity, Wallet, HeartHandshake, Sparkles, HelpCircle, MessageCircle } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface FAQItem {
  id: string;
  category: "surgery" | "insurance" | "recovery" | "safety";
  q: string;
  a: string;
}

interface FAQProps {
  cityName?: string;
  procedureTitle?: string;
  customFaqs?: Array<{ question: string; answer: string }>;
  whatsappUrl?: string;
}

const defaultFaqs: FAQItem[] = [
  {
    id: "pain",
    category: "surgery",
    q: "Is laser surgery for piles, fistula, and proctology painful?",
    a: "No. Advanced laser surgical techniques are virtually painless compared to conventional surgeries. Administered under targeted anaesthesia, our precision diode lasers seal nerves instantly, leaving zero open wounds or stitches. Patients regularly rate post-procedure discomfort at 1–2 out of 10.",
  },
  {
    id: "sameday",
    category: "surgery",
    q: "Can I go home the same day as my surgery?",
    a: "Yes. For over 95% of minimally invasive treatments—including laser piles, fissure, fistula, circumcision, and lipoma excisions—same-day hospital discharge is standard practice. You are admitted in the morning, undergo a brief procedure, rest under specialized observation, and walk home comfortably the same evening.",
  },
  {
    id: "insurance",
    category: "insurance",
    q: "Will my medical insurance cover laser surgical treatments?",
    a: "Yes. Our USFDA-approved surgical procedures are recognized and covered by 95+ major health insurers, including TATA AIG, Star Health, HDFC Ergo, Care Health, and government schemes where applicable. Our dedicated in-house insurance desk executes rapid 30-minute digital pre-authorization, enabling 100% cashless admission.",
  },
  {
    id: "cost",
    category: "insurance",
    q: "How are surgical procedure costs calculated?",
    a: "HealthFlo packages are strictly transparent and all-inclusive—covering senior surgeon professional fees, anaesthetist charges, high-precision OT consumables, diagnostic profiling, medicines, nursing, and a complimentary post-discharge follow-up consultation. Zero surprise room rent caps or hidden add-ons. Easy 0% interest EMI financing is also available.",
  },
  {
    id: "recovery",
    category: "recovery",
    q: "What is the expected recovery timeline after laser surgery?",
    a: "Due to zero cutting or cautery burns, recovery is remarkably accelerated. Most patients comfortably return to desk routines and normal mobility within 48 to 72 hours. Complete tissue assimilation occurs in 1–2 weeks—representing a 60% faster clinical recovery than conventional scalpel surgery.",
  },
  {
    id: "coordinator",
    category: "recovery",
    q: "What role does my dedicated Care Coordinator play?",
    a: "Every patient is assigned an experienced, dedicated Care Coordinator who acts as your single clinical point of contact. They orchestrate your surgeon consultations, process all insurance claims, manage hospital admission protocols, arrange free out-of-town patient transit, and book follow-up consultations.",
  },
  {
    id: "surgeons",
    category: "safety",
    q: "What are the clinical qualifications of HealthFlo surgeons?",
    a: "Our network surgeons are strictly elite, board-certified specialists (MS / DNB / M.Ch / FIAGES) averaging 10 to 15+ years of dedicated surgical operative experience. Prior to your initial consultation, your coordinator will share your designated surgeon's complete professional credentials and fellowship accolades.",
  },
  {
    id: "support",
    category: "safety",
    q: "What emergency post-operative support is available after discharge?",
    a: "Patient protection extends beyond hospital discharge. You retain comprehensive 24/7 direct communication with your clinical care team and assigned Care Coordinator via priority phone and WhatsApp dispatch. One complimentary diagnostic follow-up appointment is standard with every treatment package.",
  },
];

const categories = [
  { id: "all", label: "All Topics", icon: HelpCircle },
  { id: "surgery", label: "Laser & Surgery", icon: Activity },
  { id: "insurance", label: "Insurance & Costs", icon: Wallet },
  { id: "recovery", label: "Care & Recovery", icon: HeartHandshake },
  { id: "safety", label: "Surgeons & Safety", icon: ShieldCheck },
] as const;

export default function FAQ({ cityName, procedureTitle, customFaqs, whatsappUrl }: FAQProps = {}) {
  const { config } = useSiteConfig();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Merge custom procedure FAQs if provided
  const combinedFaqs: FAQItem[] = customFaqs && customFaqs.length > 0 ? [
    ...customFaqs.map((f, idx) => ({
      id: `custom-${idx}`,
      category: "surgery" as const,
      q: f.question,
      a: f.answer
    })),
    ...defaultFaqs
  ] : defaultFaqs;

  const [openIdx, setOpenIdx] = useState<string | null>(combinedFaqs[0]?.id || "pain");

  const filteredFaqs = activeCategory === "all" 
    ? combinedFaqs 
    : combinedFaqs.filter((item) => item.category === activeCategory);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": combinedFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  const activeWhatsAppUrl = whatsappUrl || config.socials.whatsapp;

  return (
    <section className="w-full py-12 md:py-16 relative z-10 overflow-hidden" id="faq">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact, Professional Header */}
        <div className="mb-8 md:mb-10 pb-6 border-b border-slate-200/80 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/80 text-[#0066FF] text-[11px] font-extrabold uppercase tracking-wider mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#0066FF]" />
            <span>Clinical Intelligence Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight mb-2.5">
            {procedureTitle ? (
              <>Frequently Asked <span className="text-[#0066FF] font-semibold">Questions</span> About {procedureTitle} {cityName ? `in ${cityName}` : ""}</>
            ) : (
              <>Patient Frequently Asked <span className="text-[#0066FF] font-semibold">Questions</span></>
            )}
          </h2>
          <p className="text-slate-600 text-[14px] sm:text-[16px] font-normal max-w-3xl leading-relaxed">
            Authoritative answers on USFDA surgical protocols, 100% cashless insurance claims, and same-day recovery procedures.
          </p>
        </div>

        {/* Compact Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-6 sm:mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  const newlyFiltered = cat.id === "all" ? combinedFaqs : combinedFaqs.filter(f => f.category === cat.id);
                  if (newlyFiltered.length > 0 && !newlyFiltered.some(f => f.id === openIdx)) {
                    setOpenIdx(newlyFiltered[0].id);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-extrabold transition-all duration-200 border shadow-2xs active:scale-95 ${
                  isActive
                    ? "bg-[#0066FF] text-white border-[#0066FF] shadow-[0_4px_14px_rgba(0,102,255,0.25)]"
                    : "bg-white/80 hover:bg-slate-50 text-slate-700 border-slate-200/80"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-[#0066FF]"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Compact 2-Column Responsive FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
          {filteredFaqs.map((faq) => {
            const isOpen = openIdx === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden text-left ${
                  isOpen
                    ? "bg-gradient-to-br from-blue-50/90 via-white to-cyan-50/60 border-[#0066FF]/60 shadow-[0_6px_22px_rgba(0,102,255,0.08)]"
                    : "bg-white/90 hover:bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5 sm:py-4 text-left font-bold transition-colors group"
                >
                  <span className={`text-[14px] md:text-[15px] leading-snug tracking-tight ${isOpen ? "text-[#0066FF] font-black" : "text-slate-900 group-hover:text-[#0066FF]"}`}>
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 border ${
                    isOpen 
                      ? "bg-[#0066FF] text-white border-[#0066FF] rotate-180 shadow-2xs" 
                      : "bg-slate-100/80 text-slate-600 border-slate-200/80 group-hover:bg-blue-50 group-hover:text-[#0066FF]"
                  }`}>
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-2 text-[13.5px] sm:text-[14px] text-slate-600 font-medium leading-relaxed border-t border-slate-100">
                        <p className="mb-3">{faq.a}</p>
                        <div className="pt-3 border-t border-slate-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px]">
                          <span className="text-emerald-700 font-extrabold flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>100% Confidential &amp; Discreet Care</span>
                          </span>
                          <a
                            href={activeWhatsAppUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-black text-[#0066FF] hover:text-[#0042c4] transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-[#0066FF] text-white" />
                            <span>Ask on WhatsApp Confidentially &rarr;</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Professional Clinical Footer Banner inside FAQ */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-gradient-to-r from-slate-900 via-[#0A1428] to-slate-900 text-white p-5 rounded-2xl shadow-md border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0066FF] to-cyan-500 flex items-center justify-center text-white font-black shadow-md shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[14px] md:text-[15px] font-black tracking-tight text-white leading-tight">
                Have a specific diagnostic or insurance question?
              </h4>
              <p className="text-[12px] text-slate-300 font-semibold mt-0.5">
                Speak directly with a senior clinical triage coordinator on our 24/7 priority medical desk.
              </p>
            </div>
          </div>
          <a
            href={activeWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-blue-600 text-white text-[13px] font-extrabold transition-all shadow-[0_4px_14px_rgba(0,102,255,0.3)] shrink-0 active:scale-95"
          >
            Ask Clinical Desk →
          </a>
        </div>

      </div>
    </section>
  );
}
