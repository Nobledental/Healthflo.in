"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  Phone, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  User, 
  Bot, 
  RefreshCw,
  Clock,
  ChevronRight,
  Award,
  Stethoscope,
  Navigation,
  Globe2
} from "lucide-react";
import { haptic } from "@/utils/haptics";
import { useSiteConfig } from "@/context/SiteConfigContext";

type Message = {
  id: string;
  sender: "bot" | "user";
  senderName?: string;
  text?: string;
  options?: string[];
  action?: "SELECT_TREATMENT" | "SELECT_CITY" | "ENTER_DETAILS" | "COMPLETE";
  timestamp: string;
};

export default function LeadCapture() {
  const { config } = useSiteConfig();
  const PHONE = `+${config.helplineRaw}`;
  const WHATSAPP_URL = config.socials.whatsapp;

  const [messages, setMessages] = useState<Message[]>([]);
  const [step, setStep] = useState<"treatment" | "city" | "details" | "complete">("treatment");
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: "1",
        sender: "bot",
        senderName: "FLO Agent",
        text: "Hello! Welcome to HealthFlo Surgical Network. I am FLO Agent, your automated medical triage concierge. We serve every city, town, and village across Tamil Nadu, Karnataka, and Hyderabad with 100% cashless laser surgery and dedicated admission coordination. Which procedure or assistance do you need today?",
        options: [
          "Laser Proctology (Piles, Fistula & Fissure)",
          "Laparoscopic Care (Hernia & Gallbladder)",
          "Laser Urology (Circumcision & Kidney Stones)",
          "Vascular Care (Varicose Veins)",
          "Out-of-Town / Village Transit & Admission Support",
          "Speak with Coordinator in Tamil, Kannada or Telugu"
        ],
        action: "SELECT_TREATMENT",
        timestamp: now
      }
    ]);
  }, []);

  useEffect(() => {
    if (messages.length > 1 || isTyping) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  const handleSelectOption = (option: string, currentAction?: string) => {
    haptic.medium();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages(prev => prev.map(m => m.action === currentAction ? { ...m, options: undefined, action: undefined } : m).concat({
      id: Date.now().toString(),
      sender: "user",
      text: option,
      timestamp: now
    }));

    setIsTyping(true);

    if (currentAction === "SELECT_TREATMENT") {
      setSelectedTreatment(option);
      setTimeout(() => {
        setIsTyping(false);
        setStep("city");
        let responseText = `HealthFlo specializes in advanced ${option} with zero-pain recovery and same-day discharge. Which state or regional district are you visiting from?`;
        if (option.includes("Transit") || option.includes("Coordinator")) {
          responseText = `We proudly assist patients traveling from rural districts, villages, and towns with complete hospital admission coordination and fluent coordinators in Tamil, Kannada, and Telugu. Please select your region below:`;
        }

        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: "bot",
          senderName: "FLO Agent",
          text: responseText,
          options: [
            "Tamil Nadu Network (Chennai, Coimbatore, Madurai, Salem & All Districts)",
            "Karnataka Network (Bengaluru, Mysuru, Hubballi, Mangaluru & All Towns)",
            "Hyderabad & Telangana (Hyderabad, Warangal, Karimnagar & All Towns)",
            "Rural / Out-of-Town Village Patient (Need Admission & Travel Guidance)",
            "Online Tele-Consultation (Pan-India & NRI Care)"
          ],
          action: "SELECT_CITY",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 700);
    } else if (currentAction === "SELECT_CITY") {
      setSelectedCity(option);
      setTimeout(() => {
        setIsTyping(false);
        setStep("details");
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          sender: "bot",
          senderName: "FLO Agent",
          text: `Excellent. Our senior surgical desk for ${option.split(" (")[0]} is accepting priority consultations today. Please enter your Patient Name and 10-digit Mobile Number below. A native medical coordinator will call you within 30 minutes in your regional language (Tamil/Kannada/Telugu/Hindi/English) to arrange cashless insurance and travel support:`,
          action: "ENTER_DETAILS",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
      }, 700);
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    haptic.success();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Fire real telemetry log and instant auto-responder dispatch
    fetch("/api/coordinator/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: "SESS_WEB_" + Math.floor(1000 + Math.random() * 9000),
        city: selectedCity.split(" (")[0] || "South India Triage Hub",
        state: selectedCity.includes("Tamil") ? "Tamil Nadu" : selectedCity.includes("Karnataka") ? "Karnataka" : selectedCity.includes("Hyderabad") ? "Telangana" : "Pan-India",
        device: "Web Lead Capture Console",
        pagesViewed: ["/ (Interactive Lead Triage Console)"],
        lastClickedElement: "Lead Capture Chat Completion",
        leadContact: {
          name,
          phone,
          procedure: selectedTreatment || "General Surgical Consultation",
          status: "Urgent Triage"
        },
        coordinatorClinicalNote: `Patient requested priority triage via interactive FLO Agent console. Selected treatment: ${selectedTreatment}. Region: ${selectedCity}.`
      })
    }).catch(err => console.error("Auto-responder dispatch error:", err));

    setMessages(prev => prev.map(m => m.action === "ENTER_DETAILS" ? { ...m, action: undefined } : m).concat({
      id: Date.now().toString(),
      sender: "user",
      text: `Patient: ${name}  |  Contact: ${phone}`,
      timestamp: now
    }));

    setStep("complete");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: "bot",
        senderName: "FLO Agent",
        text: `Priority Triage Confirmed, ${name}! 🚀 We have instantly dispatched an automated WhatsApp & SMS confirmation receipt to ${phone}. Your consultation for ${selectedTreatment} has been logged for our regional surgical desk in ${selectedCity.split(" (")[0]}. A specialized medical coordinator will call you directly from ${config.helplineNumber} within 30 minutes!`,
        action: "COMPLETE",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 900);
  };

  const resetChat = () => {
    haptic.light();
    setStep("treatment");
    setSelectedTreatment("");
    setSelectedCity("");
    setName("");
    setPhone("");
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages([
      {
        id: "1",
        sender: "bot",
        senderName: "FLO Agent",
        text: "Hello again! I am FLO Agent. We serve every city, town, and village across Tamil Nadu, Karnataka, and Hyderabad. Which surgical procedure or language assistance do you need today?",
        options: [
          "Laser Proctology (Piles, Fistula & Fissure)",
          "Laparoscopic Care (Hernia & Gallbladder)",
          "Laser Urology (Circumcision & Kidney Stones)",
          "Vascular Care (Varicose Veins)",
          "Out-of-Town / Village Transit & Admission Support",
          "Speak with Coordinator in Tamil, Kannada or Telugu"
        ],
        action: "SELECT_TREATMENT",
        timestamp: now
      }
    ]);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 md:py-20 relative z-10" id="lead-capture">

      {/* Bulletproof 2-Column Proportional Grid (50-50 Split on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        
        {/* LEFT COLUMN: Authentic Medical Value & Regional Action Desk */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-full space-y-8 text-left"
        >
          <div className="space-y-5">
            {/* Tag */}
            <div className="inline-flex flex-wrap items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-full px-4 py-2 shadow-2xs">
              <Globe2 className="w-4 h-4 text-[#0066FF] shrink-0" />
              <span className="text-[#0066FF] text-[12px] font-black uppercase tracking-wider">
                PAN-TN • KARNATAKA • HYDERABAD NETWORK
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-slate-800 tracking-tight leading-tight">
              Every City.<br />
              <span className="font-semibold bg-gradient-to-r from-[#0055ff] via-[#0077ff] to-teal-600 bg-clip-text text-transparent">
                Every Town & Village.
              </span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              We eliminate healthcare distance barriers across Tamil Nadu, Karnataka, and Hyderabad. Experience 100% cashless laser surgery with free hospital travel coordination, native language coordinators (Tamil, Kannada, Telugu), and zero room rent cap surprises.
            </p>
          </div>

          {/* Tactile Contact Command Cards */}
          <div className="space-y-4 pt-1">
            
            {/* WhatsApp Instant Chat Card */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => haptic.medium()}
              className="flex items-center justify-between p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-[#25D366]/70 transition-all duration-300 group no-underline"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-13 h-13 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#25D366] shrink-0 group-hover:scale-105 transition-transform shadow-inner">
                  <MessageCircle className="w-6.5 h-6.5 stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                    REGIONAL DESK (TAMIL / KANNADA / TELUGU)
                  </span>
                  <p className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                    Chat on WhatsApp Now
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 group-hover:text-[#25D366] transition-all shrink-0 ml-2" />
            </a>

            {/* Direct Helpline & Transit Support Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${PHONE}`}
                onClick={() => haptic.light()}
                className="flex flex-col justify-between p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-[#0066FF] hover:shadow-md transition-all duration-300 no-underline group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-[#0066FF] mb-3 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                    24/7 MULTILINGUAL HELPLINE
                  </span>
                  <p className="text-base font-black text-slate-900 group-hover:text-[#0066FF] transition-colors">
                    {config.helplineNumber}
                  </p>
                </div>
              </a>

              <div
                className="flex flex-col justify-between p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-purple-500 hover:shadow-md transition-all duration-300 group cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-600 mb-3 group-hover:scale-105 transition-transform">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-0.5">
                    VILLAGE & TOWN CARE
                  </span>
                  <p className="text-base font-black text-slate-900 group-hover:text-purple-600 transition-colors">
                    Free Transit Coordination
                  </p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* RIGHT COLUMN: Interactive Triage Chat Console */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full flex justify-center lg:justify-end"
        >
          {/* THE AIRTIGHT ROTATING NEON ENERGY BORDER WRAPPER */}
          <div className="relative w-full max-w-[560px] rounded-[2.6rem] p-[3px] shadow-[0_24px_80px_-15px_rgba(0,80,255,0.18)] flex flex-col justify-between overflow-hidden bg-slate-900/5">
            
            {/* Fully bounded spinning energy animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[2.6rem]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] bg-[conic-gradient(from_0deg,transparent,#0055ff,#00e5ff,transparent,#2563eb,transparent)] animate-[spin_6s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250%] h-[250%] bg-[conic-gradient(from_0deg,#0055ff,#00e5ff,#ffffff,#2563eb)] animate-[spin_6s_linear_infinite] blur-[35px] opacity-45" />
            </div>

            {/* INNER WHITE CARD - Balanced proportions and sleek height */}
            <div className="relative z-10 w-full flex-1 flex flex-col justify-between bg-white dark:bg-slate-900 p-5 sm:p-6.5 rounded-[2.4rem] border border-white/90 shadow-inner overflow-hidden">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#0055ff] to-[#00d4ff] flex items-center justify-center text-white shadow-md shadow-blue-500/25 border border-white/20">
                      <Bot className="w-5.5 h-5.5 stroke-[2.2]" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse shadow-sm" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-slate-900 text-[17px] sm:text-[19px] tracking-tight leading-none truncate">
                        Reserve clinical time.
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 font-extrabold text-[9.5px] rounded-full border border-emerald-200/80 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span className="uppercase tracking-wider">ONLINE NOW</span>
                      </span>
                    </div>
                    <p className="text-[11.5px] sm:text-[12.5px] text-slate-500 font-bold mt-1 flex items-center gap-1.5 truncate">
                      <Clock className="w-3.5 h-3.5 text-[#0066FF] shrink-0" />
                      <span className="truncate">FLO Agent • TN, KA & TS Triage Concierge</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={resetChat}
                  title="Restart Diagnostic Chat"
                  className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0 flex items-center gap-1 text-[11.5px] font-extrabold ml-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset</span>
                </button>
              </div>

              {/* Chat Conversation Surface - Balanced ergonomic height */}
              <div className="h-[330px] sm:h-[350px] overflow-y-auto pr-1 sm:pr-2 space-y-4 flex flex-col pt-0.5">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.22 }}
                      className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"} w-full shrink-0`}
                    >
                      <div className="flex items-start gap-2.5 max-w-[95%] sm:max-w-[88%]">
                        {msg.sender === "bot" && (
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0055ff] to-[#00d4ff] text-white flex items-center justify-center shrink-0 mt-1 shadow-2xs font-bold text-xs">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className="flex flex-col min-w-0">
                          {msg.senderName && (
                            <span className="text-[10.5px] font-extrabold text-[#0066FF] mb-1 ml-1 flex items-center gap-1">
                              <span>{msg.senderName}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                            </span>
                          )}
                          <div
                            className={`p-3.5 sm:p-4 rounded-[18px] font-medium text-[13.5px] sm:text-[14.5px] leading-relaxed shadow-2xs ${
                              msg.sender === "user"
                                ? "bg-gradient-to-r from-[#0055ff] to-[#0077ff] text-white rounded-br-xs font-bold shadow-blue-500/10"
                                : "bg-slate-50 text-slate-800 rounded-bl-xs border border-slate-200/80"
                            }`}
                          >
                            <p className="whitespace-pre-line text-[13.5px] sm:text-[14.5px] leading-relaxed font-semibold">
                              {msg.text}
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-1.5">
                              <span className={`text-[9.5px] font-bold ${msg.sender === "user" ? "text-blue-100" : "text-slate-400"}`}>
                                {msg.timestamp}
                              </span>
                              {msg.sender === "user" && (
                                <span className="text-white text-[9.5px]">✓✓</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Diagnostic Action Chips */}
                      {msg.options && (
                        <motion.div 
                          initial={{ opacity: 0, y: 6 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          transition={{ delay: 0.15 }}
                          className="flex flex-col sm:flex-row flex-wrap gap-2 mt-3 ml-0 sm:ml-9.5 w-full sm:w-auto"
                        >
                          {msg.options.map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleSelectOption(opt, msg.action)}
                              className="px-3.5 py-2 bg-blue-50/90 hover:bg-[#0055ff] text-[#0055FF] hover:text-white font-extrabold text-[12.5px] sm:text-[13px] rounded-xl border border-blue-200/80 shadow-2xs transition-all duration-200 active:scale-[0.98] text-left flex items-center justify-between group/chip"
                            >
                              <span>{opt}</span>
                              <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover/chip:opacity-100 group-hover/chip:translate-x-0.5 transition-all ml-2 shrink-0 hidden sm:block" />
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {/* Realistic Medical Typing Indicator */}
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }} 
                      className="flex items-center gap-2 text-slate-500 font-bold text-xs ml-9.5 py-2 shrink-0"
                    >
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-[#0066FF] rounded-full animate-bounce" />
                      </span>
                      <span>FLO Agent is processing regional surgical guidance...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div ref={chatEndRef} className="shrink-0 h-1" />
              </div>

              {/* Bottom Interactive Action Input Hub */}
              <div className="mt-3.5 pt-3.5 border-t border-slate-100 shrink-0">
                {step === "details" ? (
                  <motion.form 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleDetailsSubmit} 
                    className="flex flex-col sm:flex-row gap-2 bg-slate-50/90 p-2.5 rounded-2xl border border-slate-200/90"
                  >
                    <div className="relative flex-1">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        required
                        placeholder="Patient Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 font-bold text-[13px] focus:outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-blue-500/10 shadow-2xs"
                      />
                    </div>
                    <div className="relative flex-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        required
                        placeholder="10-Digit Mobile Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 font-bold text-[13px] focus:outline-none focus:border-[#0066FF] focus:ring-4 focus:ring-blue-500/10 shadow-2xs"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-[#0055ff] to-[#0077ff] hover:from-blue-700 hover:to-blue-600 text-white font-black rounded-xl text-[13px] shadow-[0_4px_16px_rgba(0,102,255,0.3)] transition-all flex items-center justify-center gap-1.5 whitespace-nowrap active:scale-95"
                    >
                      <span>Claim Callback</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : step === "complete" ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-emerald-50 text-emerald-900 font-extrabold p-3 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[12px] sm:text-[13px] border border-emerald-200 shadow-2xs"
                  >
                    <div className="flex items-center gap-2 text-center sm:text-left">
                      <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs">
                        ✓
                      </div>
                      <span>Surgical Priority Confirmed. Coordinator calling shortly in your language.</span>
                    </div>
                    <a 
                      href={WHATSAPP_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-emerald-600 text-white px-3.5 py-1.5 rounded-lg shadow-md font-black hover:bg-emerald-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-[11.5px]"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                      <span>WhatsApp Scan Reports</span>
                    </a>
                  </motion.div>
                ) : (
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11px] font-bold text-slate-500 px-1 py-0.5">
                    <span className="flex items-center gap-1.5 text-slate-600 font-bold truncate">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
                      <span className="truncate">Select any procedure above to receive doctor options</span>
                    </span>
                    <div className="flex items-center gap-2 text-[10.5px] font-extrabold text-emerald-700 shrink-0">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 shrink-0" />
                        <span>HIPAA Encrypted</span>
                      </span>
                      <span>•</span>
                      <span>Zero-Spam Promise</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
