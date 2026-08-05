"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import AiOrb from "@/components/AiOrb";
import { 
  Sparkles, Send, Mic, ShieldCheck, Activity, ArrowRight, 
  CheckCircle2, Clock, MapPin, Phone, MessageSquare, 
  User, Bot, RefreshCw, HelpCircle, Building2, ChevronRight, Volume2, Layers
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { haptic } from "@/utils/haptics";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  treatmentCard?: {
    procedure: string;
    category: string;
    recoveryTime: string;
    estCost: string;
    cashless: boolean;
    hospitalsCount: number;
    recommendedDoctor: string;
  };
}

export default function AIClinicalTriagePage() {
  const { config } = useSiteConfig();
  const [aiMode, setAiMode] = useState<"assistant" | "chat">("assistant");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [activePreset, setActivePreset] = useState<"Daylight" | "Aurora" | "Ember" | "Plasma">("Daylight");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=91${config.helplineRaw}&text=${encodeURIComponent("Hello HealthFlo Surgical Care Desk, I consulted the online HealthFlo AI Assistant and would like to connect with a senior operating surgeon for an outpatient appointment.")}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (aiMode === "chat") {
      scrollToBottom();
    }
  }, [messages, isThinking, aiMode]);

  // Simulate intelligent response with Treatment Card matching
  const generateAIResponse = (userPrompt: string) => {
    setIsThinking(true);
    haptic.medium();

    setTimeout(() => {
      setIsThinking(false);

      const promptLower = userPrompt.toLowerCase();
      let replyText = "";
      let cardData: ChatMessage["treatmentCard"] = undefined;

      if (promptLower.includes("pile") || promptLower.includes("fistula") || promptLower.includes("fissure") || promptLower.includes("bleed") || promptLower.includes("pain") || promptLower.includes("procto")) {
        replyText = "Based on your symptom description, this falls under our **Advanced Laser Proctology Protocol**. Discomfort or bleeding during bowel movements is commonly related to internal hemorrhoids or fissure tears. Our empanelled NMC-verified proctologists perform USFDA-approved **Painless Laser Hemorrhoidoplasty**, which requires zero incisions, stitches, or painful dressings.";
        cardData = {
          procedure: "Laser Proctology (Piles / Fistula / Fissure)",
          category: "Ambulatory Day-Care Surgery",
          recoveryTime: "24 – 48 Hours (Walk home same evening)",
          estCost: "₹45,000 – ₹65,000 (Covered under insurance)",
          cashless: true,
          hospitalsCount: 18,
          recommendedDoctor: "Dr. Arvind Ramesh, MBBS, MS (Proctology)"
        };
      } else if (promptLower.includes("hernia") || promptLower.includes("swel") || promptLower.includes("groin") || promptLower.includes("lump") || promptLower.includes("bulge")) {
        replyText = "A noticeable bulge or localized pain during lifting or coughing points toward an **Abdominal or Inguinal Hernia**. We recommend an urgent ultrasound consultation. Our surgeons use ultra-lightweight **3D Laparoscopic Mesh Repair**, ensuring high abdominal reinforcement with minimal recurrence risk.";
        cardData = {
          procedure: "3D Laparoscopic Mesh Herniated Repair",
          category: "Minimally Invasive Abdominal Surgery",
          recoveryTime: "2 – 3 Days normal activities",
          estCost: "₹55,000 – ₹85,000 (Complete Cashless Available)",
          cashless: true,
          hospitalsCount: 14,
          recommendedDoctor: "Dr. Sneha Varma, MBBS, MS, FIAGES"
        };
      } else if (promptLower.includes("stone") || promptLower.includes("kidney") || promptLower.includes("urine") || promptLower.includes("circum") || promptLower.includes("uro")) {
        replyText = "Your symptoms relate to our **Urology & Renal Sciences Pathway**. For kidney or ureter stones, we utilize non-invasive **RIRS / Laser Lithotripsy** that pulverized calcifications without any cuts. For cosmetic or medical circumcision, we use the precision **ZSR Stapler Circumcision** technique.";
        cardData = {
          procedure: "Laser Stone Lithotripsy & ZSR Circumcision",
          category: "Advanced Endourology Suite",
          recoveryTime: "12 – 24 Hours ambulatory discharge",
          estCost: "₹40,000 – ₹70,000 (Zero Out-of-Pocket Support)",
          cashless: true,
          hospitalsCount: 12,
          recommendedDoctor: "Dr. Rohan Kariappa, MBBS, MCh (Urology)"
        };
      } else if (promptLower.includes("insur") || promptLower.includes("mediclaim") || promptLower.includes("tpa") || promptLower.includes("cost") || promptLower.includes("price") || promptLower.includes("money")) {
        replyText = "HealthFlo operates a dedicated **Zero Out-of-Pocket Cashless Insurance Desk**. We process pre-authorization directly with all major corporate health policies (Star Health, HDFC Ergo, Niva Bupa, ICICI Lombard, Reliance General, and PSU insurers) within **2 hours** prior to admission.";
        cardData = {
          procedure: "Comprehensive Cashless Surgery Triage",
          category: "Paperless Insurance Claims Assistance",
          recoveryTime: "2-Hour Express Pre-Approval Protocol",
          estCost: "₹0 Upfront Deposit at Empanelled Hospitals",
          cashless: true,
          hospitalsCount: 25,
          recommendedDoctor: "Dedicated TPA Claims Legal Advocate"
        };
      } else {
        replyText = "Thank you for collaborating with HealthFlo AI. Based on your inquiry, our clinical algorithm suggests connecting with a multidisciplinary surgical specialist. Whether you require laser proctology, hernia evaluation, varicose vein treatment, or urological care, our clinical board ensures **USFDA surgical protocols** and **100% cashless treatment**.";
        cardData = {
          procedure: "Multidisciplinary Surgical Evaluation",
          category: "NABH Empanelled Clinical Diagnostics",
          recoveryTime: "Same Day Outpatient Consultation",
          estCost: "Free Initial Care Coordinator Screening",
          cashless: true,
          hospitalsCount: 25,
          recommendedDoctor: "Senior Surgeon Lead (Selected City Hub)"
        };
      }

      const aiMsg: ChatMessage = {
        id: Date.now().toString() + "-ai",
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        treatmentCard: cardData
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 1400);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isThinking) return;
    haptic.medium();

    const sentText = inputValue.trim();
    const userMsg: ChatMessage = {
      id: Date.now().toString() + "-user",
      sender: "user",
      text: sentText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    generateAIResponse(sentText);
  };

  const sampleSuggestions = [
    "🤕 Bleeding or discomfort during bowel movements — what are my laser options?",
    "🛡️ How do I verify cashless insurance for 3D Mesh Hernia Surgery?",
    "🏥 Locate an empanelled proctology laser specialist near Bangalore or Chennai",
    "⚡ Why is USFDA laser proctology safer than traditional stitch surgery?"
  ];

  const latestAiMessage = [...messages].reverse().find((m) => m.sender === "ai");

  return (
    <div className="h-screen w-full bg-gradient-to-b from-white via-[#FAF9F5] to-[#F3F6FA] text-[#1D3A6F] font-sans relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Ambient Architectural Light Glows */}
      <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-bl from-blue-100/70 via-sky-50/50 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[650px] h-[650px] bg-gradient-to-tr from-emerald-100/60 via-white to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* ── MAIN NON-SCROLLABLE APPLICATION CONTAINER ─────────────────────── */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-3 sm:px-6 pt-20 sm:pt-24 pb-4 flex flex-col overflow-hidden relative z-10">
        
        {/* Top Header Status & Dual Mode Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2 bg-white/80 backdrop-blur-2xl border border-slate-200/90 rounded-2xl sm:rounded-full shadow-xs mb-3 shrink-0">
          
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0055ff] animate-ping shrink-0" />
            <span className="text-xs font-black text-slate-800 tracking-wide">HealthFlo AI Engine</span>
          </div>

          {/* DUAL TOGGLE: ASSISTANT MODE (DEFAULT) vs CONVERSATION CHAT MODE */}
          <div className="flex items-center p-1 bg-slate-100 border border-slate-200 rounded-full shadow-inner mx-auto sm:mx-0">
            <button
              type="button"
              onClick={() => { setAiMode("assistant"); haptic.medium(); }}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                aiMode === "assistant"
                  ? "bg-[#0055ff] text-white shadow-md shadow-blue-500/20 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-950 bg-transparent"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assistant Mode</span>
            </button>

            <button
              type="button"
              onClick={() => { setAiMode("chat"); haptic.medium(); }}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                aiMode === "chat"
                  ? "bg-[#1D3A6F] text-white shadow-md shadow-slate-900/20 scale-[1.02]"
                  : "text-slate-600 hover:text-slate-950 bg-transparent"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Conversation Chat Mode</span>
            </button>
          </div>

          {/* Reset Action */}
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <ShieldCheck className="w-3 h-3" /> NMC Surgeon Calibrated
            </span>
            <button
              onClick={() => { haptic.light(); setMessages([]); setIsThinking(false); }}
              title="Reset Chat Session"
              className="text-xs font-bold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* ── MODE 1: ASSISTANT MODE (DEFAULT) - PURE ORB IN CENTER WITH LOCKED TOP ARM SPEECH ── */}
        {aiMode === "assistant" && (
          <div className="flex-1 overflow-y-auto w-full px-2 py-2 flex flex-col items-center justify-center relative scrollbar-none">
            
            <div className="my-auto w-full max-w-4xl flex flex-col items-center justify-center text-center animate-[fadeIn_0.4s_ease-out] relative">
              
              {/* THE CENTRAL AI ORB WITH LOCKED TOP ORBITAL ARM SPEECH NODE */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center select-none my-6">
                
                {/* Background Rotating Dashed Architectural Rings (Decoration ONLY - NO TEXT INSIDE) */}
                <div className="absolute inset-2 sm:inset-4 rounded-full border-2 border-dashed border-slate-300/60 animate-[spin_30s_linear_infinite] pointer-events-none" />
                <div className="absolute -inset-2 sm:-inset-4 rounded-full border border-slate-200/80 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />
                {isThinking && (
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#0055ff] animate-[spin_3s_linear_infinite] shadow-[0_0_45px_rgba(0,85,255,0.35)] pointer-events-none" />
                )}

                {/* Central Luminous Orb */}
                <div className="w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
                  <AiOrb preset={activePreset} className="w-full h-full transform scale-110 sm:scale-125" />
                </div>
                
                {/* ── THE LOCKED ORBITAL ARM & BLINKING BLACK DOT NODE (FIXED UPRIGHT AT TOP) ── */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 sm:-translate-y-8 z-20 flex flex-col items-center w-full max-w-2xl px-2">
                  
                  {/* Blinking Black Dot & Connecting Anchor on Arm Edge */}
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-950 text-white rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.25)] border-2 border-slate-800 mb-2 animate-bounce">
                    <span className="w-3 h-3 rounded-full bg-white animate-[pulse_0.6s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_10px_rgba(255,255,255,0.9)] shrink-0" />
                    <span className="text-xs font-black tracking-widest uppercase">
                      {isThinking ? "Traversing Causal Graph..." : "Orbital Arm Speaking"}
                    </span>
                  </div>

                  {/* SPEECH CONTENT LOCKED AT TOP UNTIL USER RESPONDS */}
                  {!isThinking ? (
                    <div className="w-full p-6 rounded-[2rem] bg-white/95 backdrop-blur-2xl border-2 border-[#0055ff]/30 shadow-[0_20px_60px_rgba(0,0,0,0.15)] text-left animate-[scaleUp_0.35s_ease-out]">
                      
                      {latestAiMessage ? (
                        /* AI HAS ANSWERED USER INQUIRY */
                        <div className="space-y-4">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                            <span className="text-xs font-black text-emerald-700 flex items-center gap-1.5 uppercase tracking-wider">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              Clinical Triage Guidance
                            </span>
                            <button 
                              onClick={() => setAiMode("chat")}
                              className="text-xs font-extrabold text-[#0055ff] hover:underline"
                            >
                              Open Chat Thread ({messages.length}) →
                            </button>
                          </div>

                          <p className="text-sm sm:text-base text-slate-800 font-bold leading-relaxed whitespace-pre-wrap">
                            {latestAiMessage.text}
                          </p>

                          {/* INTERACTIVE TREATMENT CARD ON ORB ARM */}
                          {latestAiMessage.treatmentCard && (
                            <div className="p-5 rounded-3xl bg-gradient-to-br from-[#1D3A6F] to-[#0E2347] text-white shadow-xl border border-white/10 space-y-4 mt-3">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-emerald-300 uppercase tracking-wider">{latestAiMessage.treatmentCard.category}</span>
                                <span className="text-xs text-blue-200 font-bold">{latestAiMessage.treatmentCard.hospitalsCount} Verified Hospitals</span>
                              </div>

                              <h4 className="text-lg sm:text-xl font-black text-white">{latestAiMessage.treatmentCard.procedure}</h4>

                              <div className="grid grid-cols-2 gap-2.5 pt-1">
                                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                                  <span className="text-[10px] font-bold text-slate-300 block uppercase">Recovery</span>
                                  <span className="text-xs font-black text-emerald-400 block mt-0.5">{latestAiMessage.treatmentCard.recoveryTime}</span>
                                </div>
                                <div className="p-3 rounded-xl bg-white/10 border border-white/10">
                                  <span className="text-[10px] font-bold text-slate-300 block uppercase">Cashless Estimate</span>
                                  <span className="text-xs font-black text-[#00E5FF] block mt-0.5">{latestAiMessage.treatmentCard.estCost}</span>
                                </div>
                              </div>

                              <a
                                href={WHATSAPP_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => haptic.medium()}
                                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
                              >
                                <Phone className="w-4 h-4 fill-current" />
                                <span>Call / Connect with Surgeon Now</span>
                              </a>
                            </div>
                          )}
                        </div>
                      ) : (
                        /* INITIAL LANDING SPEECH: LOCKED ON TOP OF ARM UNTIL USER RESPONDS */
                        <div className="text-center space-y-2 py-2">
                          <h2 className="text-xl sm:text-3xl font-black text-[#1D3A6F] tracking-tight">
                            I am your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0055ff] to-[#00A88F]">HealthFlo Assistant.</span>
                          </h2>
                          <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-md mx-auto">
                            Type any symptom or surgical inquiry below. My orbital arm will immediately assemble your clinical guidance and cashless hospital options.
                          </p>
                        </div>
                      )}

                    </div>
                  ) : (
                    /* THINKING BOX LOCKED AT TOP */
                    <div className="p-5 rounded-3xl bg-white/95 border-2 border-blue-500/40 shadow-xl text-center">
                      <p className="text-sm font-black text-[#0055ff] animate-pulse">Consulting sovereign medical heuristics & hospital rosters...</p>
                    </div>
                  )}

                </div>

              </div>

              {/* Notice: ZERO text headings below the orb, ZERO suggestion pill cards below! Pure focus on Orb & Top Arm speech! */}

            </div>
          </div>
        )}

        {/* ── MODE 2: CONVERSATION CHAT MODE (SCROLLABLE HISTORY + SUGGESTION CARDS) ──── */}
        {aiMode === "chat" && (
          <div className="flex-1 overflow-y-auto w-full px-2 py-4 flex flex-col space-y-6 scrollbar-thin scrollbar-thumb-slate-300">
            
            {messages.length === 0 ? (
              /* EMPTY CHAT MODE: SHOW SUGGESTION CARDS HERE FOR QUICK DISCOVERY */
              <div className="my-auto flex flex-col items-center justify-center text-center max-w-2xl mx-auto px-4 animate-[fadeIn_0.4s_ease-out]">
                <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center mb-4">
                  <MessageSquare className="w-8 h-8 text-[#0055ff]" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-1">Conversation Chat Thread</h2>
                <p className="text-sm font-medium text-slate-500 max-w-lg mb-6">
                  Select a common topic below to start a continuous conversation, or type directly into the input bar.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                  {sampleSuggestions.map((sug, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => {
                        if (isThinking) return;
                        haptic.light();
                        const userMsg: ChatMessage = {
                          id: Date.now().toString() + "-user",
                          sender: "user",
                          text: sug,
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        };
                        setMessages((prev) => [...prev, userMsg]);
                        generateAIResponse(sug);
                      }}
                      className="p-3.5 rounded-2xl bg-white hover:bg-blue-50/70 text-left text-xs font-bold text-slate-700 border border-slate-200 shadow-xs hover:border-[#0055ff]/40 transition-all flex items-center justify-between group"
                    >
                      <span className="line-clamp-2 pr-2">{sug}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0055ff] group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-6 max-w-3xl mx-auto w-full">
                
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 sm:gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-[fadeIn_0.3s_ease-out]`}
                  >
                    {msg.sender === "ai" && (
                      <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#EEF1F5] border-2 border-white shadow-md flex items-center justify-center shrink-0">
                        <AiOrb preset="Daylight" className="w-full h-full rounded-full overflow-hidden" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-slate-950 animate-[pulse_0.7s_infinite] border border-white" title="Communicating Arm Dot" />
                      </div>
                    )}

                    <div className={`space-y-4 max-w-[88%] sm:max-w-[82%] ${msg.sender === "user" ? "order-1" : "order-2"}`}>
                      
                      {/* Text Bubble */}
                      <div className={`p-4 sm:p-5 rounded-[1.75rem] text-sm sm:text-base font-semibold leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#0055ff] text-white rounded-br-none"
                          : "bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-md"
                      }`}>
                        {msg.sender === "ai" && (
                          <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-slate-100 text-xs font-black text-[#0055ff]">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>HealthFlo Clinical Assistant</span>
                            <span className="text-slate-400 font-normal ml-auto">{msg.timestamp}</span>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                      </div>

                      {/* INTERACTIVE TREATMENT CARD IN CHAT THREAD */}
                      {msg.treatmentCard && (
                        <div className="p-6 rounded-[2rem] bg-gradient-to-br from-[#1D3A6F] to-[#0E2347] text-white shadow-2xl border-2 border-[#0055ff]/40 space-y-5 animate-[scaleUp_0.3s_ease-out]">
                          
                          <div className="flex items-center justify-between border-b border-white/10 pb-4">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-500/30 inline-flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Recommended Protocol
                            </span>
                            <span className="text-xs text-blue-200 font-bold">{msg.treatmentCard.category}</span>
                          </div>

                          <div>
                            <h4 className="text-xl sm:text-2xl font-black text-white">{msg.treatmentCard.procedure}</h4>
                            <p className="text-xs text-blue-200 font-medium mt-1">Lead Surgeon: <strong className="text-white">{msg.treatmentCard.recommendedDoctor}</strong> ({msg.treatmentCard.hospitalsCount} empanelled centers available)</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                              <span className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Recovery Time</span>
                              <span className="text-xs sm:text-sm font-black text-emerald-400 flex items-center gap-1 mt-1">
                                <Clock className="w-3.5 h-3.5 shrink-0" /> {msg.treatmentCard.recoveryTime}
                              </span>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                              <span className="text-[11px] font-bold text-slate-300 block uppercase tracking-wider">Estimate & Cashless</span>
                              <span className="text-xs sm:text-sm font-black text-[#00E5FF] block mt-1">
                                {msg.treatmentCard.estCost}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2 flex flex-wrap gap-3">
                            <a
                              href={WHATSAPP_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => haptic.medium()}
                              className="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30 transition-transform active:scale-95"
                            >
                              <Phone className="w-4 h-4 fill-current" />
                              <span>Call / Connect with Surgeon Now</span>
                            </a>
                          </div>

                        </div>
                      )}

                    </div>
                  </div>
                ))}

                {isThinking && (
                  <div className="flex items-center gap-4 text-slate-500 font-bold text-sm pl-2 animate-pulse">
                    <div className="relative w-9 h-9 rounded-full bg-[#EEF1F5] border border-slate-300 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-slate-950 animate-ping" />
                    </div>
                    <span>HealthFlo AI is traversing medical heuristics and empanelled hospital rosters...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

          </div>
        )}

        {/* ── THE SINGLE BOTTOM GEMINI-STYLE CHAT INPUT BOX (UNIVERSAL) ──── */}
        <div className="w-full max-w-3xl mx-auto pt-2 shrink-0">
          <form
            onSubmit={handleSendMessage}
            className="w-full p-2 bg-white/95 backdrop-blur-2xl border-2 border-slate-200/90 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex items-center gap-2 sm:gap-3 focus-within:border-[#0055ff] focus-within:ring-4 focus-within:ring-[#0055ff]/10 transition-all"
          >
            {/* Left Mode Indicator Icon */}
            <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center shrink-0 ml-1 ${
              aiMode === "assistant" ? "bg-blue-50 border-blue-200 text-[#0055ff]" : "bg-slate-100 border-slate-300 text-slate-800"
            }`}>
              {aiMode === "assistant" ? <Sparkles className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
            </div>

            {/* Input Field */}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                aiMode === "assistant"
                  ? "Ask the Assistant Orb about symptoms, laser procedures, or cashless surgery..."
                  : "Type a message in conversation chat mode..."
              }
              className="flex-1 bg-transparent text-slate-900 text-sm sm:text-base font-semibold focus:outline-none placeholder:text-slate-400 pl-2 py-2"
            />

            {/* Voice Mic Button */}
            <button
              type="button"
              onClick={() => { haptic.light(); alert("Voice Input mode activated! You may speak your symptoms directly to the HealthFlo AI Orb."); }}
              title="Speak with AI Orb"
              className="w-10 h-10 rounded-full hover:bg-slate-100 text-slate-600 hover:text-[#0055ff] flex items-center justify-center transition-colors shrink-0"
            >
              <Mic className="w-5 h-5" />
            </button>

            {/* Send Submit Button */}
            <button
              type="submit"
              disabled={!inputValue.trim() || isThinking}
              title="Submit Inquiry"
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all shrink-0 mr-0.5 shadow-md ${
                inputValue.trim() && !isThinking
                  ? "bg-[#0055ff] hover:bg-blue-600 text-white active:scale-90"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              <Send className="w-5 h-5 ml-0.5" />
            </button>
          </form>

          {/* Minimal Disclaimer Footer */}
          <div className="text-center pt-2 pb-1 text-[11px] font-bold text-slate-500">
            <span>HealthFlo AI uses clinical triage reasoning. For emergency trauma or severe pain, dial </span>
            <a href={`tel:${config.helplineRaw}`} className="text-[#0055ff] underline">{config.helplineNumber}</a>
            <span> immediately for ambulance dispatch.</span>
          </div>
        </div>

      </main>
    </div>
  );
}
