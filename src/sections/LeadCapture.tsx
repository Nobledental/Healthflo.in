"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, Calendar, Sparkles, ShieldCheck, Clock, Stethoscope } from "lucide-react";

const treatments = [
  "Laser Piles Treatment",
  "Laser Fissure Treatment",
  "Laser Fistula Treatment",
  "Laser Circumcision",
  "Lipoma & Cyst Removal",
  "General Surgery",
];

const cities = [
  "Trichy", "Madurai", "Bangalore", "Hyderabad",
  "Chennai", "Salem", "Krishnagiri", "Dharmapuri",
];

const PHONE = "+919363650066";
const WHATSAPP_MSG = encodeURIComponent("Hello HealthFlo, I'd like a free callback.");

export default function LeadCapture() {
  const [form, setForm] = useState({ name: "", phone: "", city: "", treatment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, wire to CRM / backend
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="w-full relative z-10" id="lead-capture">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_8px_40px_rgba(0,0,0,0.07)] overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Left — Value Proposition */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#0038ff] to-[#003fcc] p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span className="text-white text-[12px] font-bold uppercase tracking-wider">Free Consultation</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
                Get a Free<br/>Callback in<br/>
                <span className="text-yellow-300">Under 30 Minutes.</span>
              </h2>
              <p className="text-blue-100 text-[15px] leading-relaxed">
                Share your details. Our care coordinator will call you, understand your condition, and guide your next step — at zero cost, zero obligation.
              </p>
            </div>

            {/* Guarantees */}
            <div className="relative z-10 mt-8 flex flex-col gap-4">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><ShieldCheck className="w-4 h-4 text-white"/></div>
                 <span className="text-white text-[15px] font-medium">100% Confidential & Secure</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Clock className="w-4 h-4 text-white"/></div>
                 <span className="text-white text-[15px] font-medium">Callback in Under 30 Mins</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0"><Stethoscope className="w-4 h-4 text-white"/></div>
                 <span className="text-white text-[15px] font-medium">Expert Medical Guidance</span>
               </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3 p-10">
            <h3 className="text-xl font-bold text-slate-900 mb-1">Book a Free Consultation</h3>
            <p className="text-slate-500 text-[14px] mb-8">No fees. No commitments. Just expert guidance.</p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
              >
                <div className="text-4xl mb-3">✅</div>
                <h4 className="text-lg font-bold text-green-800 mb-1">We'll call you shortly!</h4>
                <p className="text-green-700 text-sm">Your care coordinator will reach you within 30 minutes.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-slate-700">Your Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rajesh Kumar"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="border border-slate-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#05f] focus:ring-2 focus:ring-[#05f]/10 transition-all placeholder-slate-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-slate-700">Phone Number</label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="border border-slate-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#05f] focus:ring-2 focus:ring-[#05f]/10 transition-all placeholder-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-slate-700">Your City</label>
                    <select
                      value={form.city}
                      onChange={e => setForm({ ...form, city: e.target.value })}
                      className="border border-slate-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#05f] focus:ring-2 focus:ring-[#05f]/10 transition-all text-slate-700 bg-white"
                    >
                      <option value="">Select City</option>
                      {cities.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-slate-700">Treatment Needed</label>
                    <select
                      value={form.treatment}
                      onChange={e => setForm({ ...form, treatment: e.target.value })}
                      className="border border-slate-200 rounded-xl px-4 py-3 text-[15px] focus:outline-none focus:border-[#05f] focus:ring-2 focus:ring-[#05f]/10 transition-all text-slate-700 bg-white"
                    >
                      <option value="">Select Treatment</option>
                      {treatments.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 bg-[#05f] hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-[16px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Get Free Callback Now
                </button>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <a href={`https://wa.me/${PHONE}?text=${WHATSAPP_MSG}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] text-slate-500 hover:text-green-600 transition-colors font-medium">
                    <MessageCircle className="w-4 h-4" /> WhatsApp Instead
                  </a>
                  <span className="text-slate-300">|</span>
                  <a href={`tel:${PHONE}`}
                    className="flex items-center gap-2 text-[13px] text-slate-500 hover:text-[#05f] transition-colors font-medium">
                    <Phone className="w-4 h-4" /> Call Directly
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
