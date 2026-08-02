"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Is laser surgery for piles painful?",
    a: "No. Laser treatment for piles (haemorrhoids) is virtually painless. A local or spinal anaesthesia is administered before the procedure, and most patients feel minimal discomfort both during and after surgery. Most patients rate their pain at 1–2 out of 10 post-procedure.",
  },
  {
    q: "Can I go home the same day as surgery?",
    a: "Yes — for most of our procedures (laser piles, fissure, fistula, circumcision, lipoma removal), same-day discharge is the standard. You arrive in the morning, have your procedure, rest for a few hours under supervision, and return home the same evening.",
  },
  {
    q: "Will my insurance cover this surgery?",
    a: "Most major Indian health insurance providers — including TATA AIG, Star Health, HDFC Ergo, Care Health, and 95+ others — cover our procedures. Our dedicated in-house insurance coordinators will verify your policy, file pre-authorisation, and manage all paperwork. You simply walk in.",
  },
  {
    q: "How long does recovery take after laser surgery?",
    a: "Recovery is remarkably fast with laser techniques. Most patients return to light desk work within 48–72 hours. Full physical activity is typically resumed within 1–2 weeks. This is 40–60% faster than traditional open surgery.",
  },
  {
    q: "What is a Care Coordinator and how do they help me?",
    a: "Every HealthFlo patient is assigned a dedicated Care Coordinator — a trained professional who serves as your single point of contact. They arrange your consultation, manage insurance approvals, coordinate your surgery date, arrange drop facility post-discharge, and schedule your follow-up consultation. You never have to deal with hospital administration directly.",
  },
  {
    q: "How much does a laser piles surgery cost?",
    a: "The cost varies by city, severity, and insurance coverage. All HealthFlo packages are all-inclusive — surgeon fees, anaesthetist, OT charges, medicines, nursing, and a free follow-up consultation are all covered. We also offer EMI options. Contact us for a personalised quote after your free consultation.",
  },
  {
    q: "Is the surgeon experienced? Can I see their credentials?",
    a: "All surgeons in the HealthFlo network are board-certified specialists with a minimum of 5 years of post-qualification surgical experience. Many hold advanced fellowships in minimally invasive surgery. Your care coordinator will share your surgeon's full profile and credentials before your consultation.",
  },
  {
    q: "What if I have complications after discharge?",
    a: "We provide 24×7 support from your care team. One complimentary post-operative consultation is included in every package. If you experience any concern after discharge, you can reach your care coordinator directly on WhatsApp or phone at any time.",
  },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full py-12 relative z-10" id="faq">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.2em] text-[#05f] uppercase mb-4"
        >
          Patient Questions, Answered
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight"
        >
          Frequently Asked<br />
          <span className="font-medium text-slate-900">Questions.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-slate-500 max-w-lg mx-auto text-[16px]"
        >
          Everything patients ask us before booking their first consultation — answered honestly and completely.
        </motion.p>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.04 }}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              openIdx === idx
                ? "border-[#05f]/30 bg-blue-50/50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-start justify-between gap-4 text-left px-6 py-5"
            >
              <span className={`font-semibold text-[15px] leading-snug ${openIdx === idx ? "text-[#05f]" : "text-slate-800"}`}>
                {faq.q}
              </span>
              <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-colors ${openIdx === idx ? "bg-[#05f] text-white" : "bg-slate-100 text-slate-500"}`}>
                {openIdx === idx ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
              </span>
            </button>

            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-[15px] text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
