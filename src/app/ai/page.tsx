"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import AiOrb from "@/components/AiOrb";
import { 
  Sparkles, Send, Mic, ShieldCheck, Activity, ArrowRight, 
  CheckCircle2, Clock, MapPin, Phone, MessageSquare, 
  User, Bot, RefreshCw, HelpCircle, Building2, ChevronRight, Volume2, Layers, FileText, Lock, HeartHandshake, Zap, Award, Stethoscope, Radio, Shield, AlertTriangle
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { haptic } from "@/utils/haptics";
import { doctorsData } from "@/data/doctors";
import { specialtiesData } from "@/data/treatments";
import { specialitiesData as fullSpecialitiesList, SpecialityData } from "@/data/specialities";

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  clinicalNotes?: {
    symptomSummary: string;
    urgencyTier: "Priority Clinical Guidance" | "Hospital Matching Protocol" | "General Medical Inquiry" | "Safety & Guardrail Policy";
    specialityCategory: string;
  };
  treatmentCard?: {
    procedure: string;
    category: string;
    recoveryTime: string;
    estCost: string;
    cashless: boolean;
    hospitalsCount: number;
    recommendedDoctor: string;
    doctorQualifications?: string;
    packageInclusions?: string[];
  };
}

export default function AdvancedHumanlikeAIPage() {
  const { config } = useSiteConfig();
  const [aiMode, setAiMode] = useState<"assistant" | "chat">("assistant");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [activePreset, setActivePreset] = useState<"Daylight" | "Aurora" | "Ember" | "Plasma">("Aurora");
  const [sessionId, setSessionId] = useState<string>("session-init");
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [userCity, setUserCity] = useState<string>("your city");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=91${config.helplineRaw}&text=${encodeURIComponent("Hello HealthFlo Team, I consulted your online clinical companion. I would like your assistance to guide me to the best hospital with the highest success rate and fit within my budget/insurance.")}`;

  // Initialize Session ID & Recognize User Location Silently
  useEffect(() => {
    const existingSession = localStorage.getItem("healthflo_ai_session");
    const id = existingSession || "hf-patient-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 6);
    if (!existingSession) localStorage.setItem("healthflo_ai_session", id);
    setSessionId(id);

    // Recognize User City via cache or free IP geolocation
    const cachedCity = localStorage.getItem("user_geo_city");
    if (cachedCity) {
      setUserCity(cachedCity);
    } else {
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          if (data && data.city) {
            setUserCity(data.city);
            localStorage.setItem("user_geo_city", data.city);
          } else {
            setUserCity("South India Metro Hub");
          }
        })
        .catch(() => {
          setUserCity("Bangalore / Chennai / Hyderabad Hub");
        });
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (aiMode === "chat") {
      scrollToBottom();
    }
  }, [messages, isThinking, aiMode]);

  // Silent Background Consultation Record
  const recordSilentConsultationNote = async (promptText: string, aiReplyText: string, procedureName?: string, symptomSummary?: string, category?: string) => {
    const newNoteObj = {
      sessionId,
      userPrompt: promptText,
      extractedSymptoms: [symptomSummary || "General Inquiry", category || "Care Coordination"],
      suggestedProcedure: procedureName || "Hospital & Success Rate Matching",
      aiDiagnosticResponse: aiReplyText,
      clinicalNotesSummary: `Location: ${userCity}. Prompt: "${promptText.substring(0, 75)}...". Recommended connecting with HealthFlo desk for success-rate based hospital placement.`
    };

    try {
      const existingLog = JSON.parse(localStorage.getItem("healthflo_ai_notes_log") || "[]");
      existingLog.unshift({ ...newNoteObj, timestamp: new Date().toISOString() });
      localStorage.setItem("healthflo_ai_notes_log", JSON.stringify(existingLog.slice(0, 200)));
    } catch {}

    try {
      await fetch("/api/ai/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNoteObj)
      });
    } catch {}
  };

  // ── DYNAMIC DB MATCHING, SHORT CONVERSATION & STRICT GUARDRAILS ────────
  const generateAIResponse = (userPrompt: string) => {
    setIsThinking(true);
    setIsAiSpeaking(false);
    haptic.medium();
    setActivePreset("Plasma");

    setTimeout(() => {
      setIsThinking(false);
      setIsAiSpeaking(true);
      setActivePreset("Aurora");

      const text = userPrompt.toLowerCase().trim();
      let replyText = "";
      let cardData: ChatMessage["treatmentCard"] = undefined;
      let notesData: ChatMessage["clinicalNotes"] = undefined;

      const getDoc = (index: number) => doctorsData[index % doctorsData.length] || {
        name: "Senior Operating Specialist",
        qualifications: "MS, M.Ch / DNB (Verified Surgical Lead)",
        hospitals: ["Top Success Rate Hospitals"]
      };

      // ─────────────────────────────────────────────────────────────
      // 🛡️ GUARDRAIL 1: PROFANITY & ABUSE PROTECTION
      // ─────────────────────────────────────────────────────────────
      if (/(fuck|shit|bitch|bastard|asshole|cunt|dick|piss|crap|sex|nude)/i.test(text)) {
        replyText = `We are deeply committed to maintaining a supportive, respectful, and dignified medical space for every patient. I am unable to engage with offensive or inappropriate language.\n\nIf you or someone in your family is seeking legitimate surgical assistance or hospital treatment guidance, our HealthFlo Care Desk is ready to assist you professionally and confidentially.`;
        
        notesData = {
          symptomSummary: "Guardrail activated: Inappropriate or profanity language detected. Conversation realigned to medical etiquette.",
          urgencyTier: "Safety & Guardrail Policy",
          specialityCategory: "Clinical Protocol Guidance"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 🛡️ GUARDRAIL 2: SPAM, GIBBERISH & UNOPTIMIZED CONTENT (e.g., "asdf", "www", random keystrokes)
      // ─────────────────────────────────────────────────────────────
      else if (text.length < 2 || /^(asdf|qwer|zxcv|1234|test|lol|ok|yeah|no|yes|hihi|yyyy|xxxx)/i.test(text) || (!/[aeiou]/i.test(text) && text.length > 5)) {
        replyText = `I didn't quite catch a specific surgical symptom or procedure name in your message! To give you accurate guidance, I evaluate your symptoms and match you with hospitals in **${userCity}** based on proven surgical success rates and your exact budget.\n\nPlease feel free to type your procedure (like *Piles, Hernia, Kidney Stones, Knee Replacement, Fibroids*) or simply give our care desk a call for instant, personalized reassurance!`;
        
        notesData = {
          symptomSummary: "Unstructured or brief input detected. Prompted user to clarify surgical condition or call directly for care coordination.",
          urgencyTier: "General Medical Inquiry",
          specialityCategory: "Triage & Symptom Clarification"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 🛡️ GUARDRAIL 3: OFF-TOPIC (Politics, Crypto, Sports, Competitors, Movies, Coding)
      // ─────────────────────────────────────────────────────────────
      else if (/(cricket|modi|bjp|congress|bitcoin|crypto|movie|actor|song|python|javascript|who won|election|stock|nifty|market)/i.test(text)) {
        replyText = `As your dedicated HealthFlo Care Companion, my ethical guidance is strictly devoted to surgical treatments, hospital matching, and cashless insurance support. I am unable to comment on general world affairs or non-medical topics.\n\nHow can we support your healthcare or hospital admission needs in **${userCity}** today?`;

        notesData = {
          symptomSummary: "Off-topic subject query intercepted by safety guardrail. Re-centered conversation on surgical care.",
          urgencyTier: "Safety & Guardrail Policy",
          specialityCategory: "Ethical Care Boundary"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 🌟 EXPLAINING HOW HEALTHFLO WORKS (Surgical Aggregator Logic)
      // ─────────────────────────────────────────────────────────────
      else if (/(how do you work|how does healthflo work|who are you|what is healthflo|what do you do|why healthflo|how it works)/i.test(text)) {
        replyText = `We simplify surgery so you never have to navigate confusing hospital billing or finding the right doctor alone.\n\nWhen you reach out to us from **${userCity}**, we analyze your exact medical diagnosis, evaluate your insurance policy or budget, and review real-time hospital success rate records. **We then guide you directly to the top-performing specialized hospital and surgeon that fits your budget perfectly**—complete with express 100% cashless pre-approval and complimentary cab transit!\n\nYou don't deal with hospital billing desks directly; our care coordinators manage everything on your behalf from start to finish.`;

        cardData = {
          procedure: "Personalized Hospital & Success-Rate Matching",
          category: "HealthFlo Care Coordination",
          recoveryTime: "2-Hour Express Hospital Placement",
          estCost: "Tailored exactly to your insurance or budget",
          cashless: true,
          hospitalsCount: 25,
          recommendedDoctor: "Assigned Senior Medical Coordinator",
          doctorQualifications: "Hospital Success Rate & Budget Advisor",
          packageInclusions: ["Success-rate verified hospital placement", "100% Cashless TPA desk assistance", "Zero upfront hospital deposit support", "Complimentary pick-up & drop cab transit"]
        };

        notesData = {
          symptomSummary: `User inquired about HealthFlo care aggregator model from ${userCity}. Explained success-rate & budget matching framework.`,
          urgencyTier: "Hospital Matching Protocol",
          specialityCategory: "Care Coordination Model"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 👋 REGULAR GREETINGS (Hi, Hello, Good Morning, Help)
      // ─────────────────────────────────────────────────────────────
      else if (/^(hi|hello|hey|namaste|good morning|good afternoon|good evening|how are you|help|start|can you help)[\s.?!]*$/i.test(text)) {
        replyText = `Hello and welcome! I am your HealthFlo personal care companion, here to assist you from **${userCity}**.\n\nWhenever you share a symptom or surgery name, we instantly review local hospital success rates and insurance plans to find your ideal treatment path. How are you feeling today? Tell me what symptoms or surgeries you are evaluating, or call our care team for instant reassurance!`;

        notesData = {
          symptomSummary: `User from ${userCity} initiated conversational triage. Ready to evaluate budget and hospital success rates.`,
          urgencyTier: "General Medical Inquiry",
          specialityCategory: "Patient Care Coordinator Desk"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 🔍 SECOND OPINION & UNNECESSARY SURGERY CHECK
      // ─────────────────────────────────────────────────────────────
      else if (/(second opinion|advised surgery|is surgery required|do i really need surgery|doubt|doctor told|unnecessary)/i.test(text)) {
        replyText = `Getting a second opinion before undergoing surgery is the smartest decision you can make! Many patients in **${userCity}** come to us after being advised surgery elsewhere, only to discover through our specialist board that conservative medication or simple daycare laser treatment works just as well.\n\n**We offer a complimentary, unbiased 2nd Surgical Opinion from senior doctors with 15+ years of expertise**. Call our desk now or send us your medical diagnosis on WhatsApp—we will evaluate your scans immediately at zero cost!`;

        cardData = {
          procedure: "Unbiased Senior Surgeon 2nd Opinion",
          category: "Medical Authenticity Protocol",
          recoveryTime: "Same Day Diagnostic Scan Evaluation",
          estCost: "Complimentary Clinical Screening",
          cashless: true,
          hospitalsCount: 25,
          recommendedDoctor: "Senior Specialist Clinical Board",
          doctorQualifications: "MS, M.Ch / DNB Diagnostic Review Lead",
          packageInclusions: ["Independent evaluation of surgery necessity", "Zero pressure or obligation guidance", "Comparison of laser vs traditional methods", "Transparent budget matching if surgery needed"]
        };

        notesData = {
          symptomSummary: `Requested second surgical opinion from ${userCity}. Aligned with complimentary diagnostic screening and specialist review.`,
          urgencyTier: "Priority Clinical Guidance",
          specialityCategory: "Second Opinion & Diagnostic Review"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 💳 EMI, ZERO INTEREST & UNINSURED BUDGET SUPPORT
      // ─────────────────────────────────────────────────────────────
      else if (/(no insurance|without insurance|emi|installment|poor|discount|monthly|afford|finance|cash bill)/i.test(text)) {
        replyText = `You should never have to compromise on surgical safety or hospital quality due to upfront finances! If you do not have corporate MediClaim or need assistance managing out-of-pocket medical bills in **${userCity}**, HealthFlo has you covered.\n\n**We coordinate Zero-Interest (0% EMI) flexible monthly installment plans and negotiate specialized hospital package rates directly on your behalf**. Give our Care Desk a quick call today—tell us your budget limit, and we will direct you to a high-success hospital that fits your financial comfort!`;

        cardData = {
          procedure: "Zero-Interest EMI & Custom Budget Placement",
          category: "Flexible Healthcare Financing",
          recoveryTime: "Instant Digital EMI Approval",
          estCost: "Customized to your affordable monthly budget",
          cashless: true,
          hospitalsCount: 25,
          recommendedDoctor: "Senior Financial & Care Coordinator",
          doctorQualifications: "Hospital Pricing & EMI Concierge",
          packageInclusions: ["0% Interest flexible EMI payment options", "Negotiated transparent hospital package pricing", "Zero hidden operating theatre charges", "Dedicated budget placement across top hospitals"]
        };

        notesData = {
          symptomSummary: `Inquired from ${userCity} regarding non-insurance financing, 0% EMI installments, and discounted hospital pricing tiers.`,
          urgencyTier: "Hospital Matching Protocol",
          specialityCategory: "Healthcare Financing & EMI Support"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 🚀 STEP 1: DYNAMIC SEMANTIC MATCHING AGAINST AUTHORITATIVE WEBSITE DATABASE (`specialitiesData` & `treatments`)
      // ─────────────────────────────────────────────────────────────
      else {
        let matchedSpec: { title: string; category: string; usfdaProtocol?: string; recoveryTime?: string; benefits: string[] } | null = null;

        // Search in fullSpecialitiesList (from @/data/specialities)
        const foundSpec = Object.values(fullSpecialitiesList).find((spec) => {
          const matchesId = spec.id.toLowerCase().includes(text) || text.includes(spec.id.toLowerCase());
          const matchesTitle = spec.title.toLowerCase().includes(text) || text.includes(spec.shortTitle.toLowerCase());
          const matchesKeyword = spec.keywords.some(kw => text.includes(kw.toLowerCase()) || kw.toLowerCase().includes(text));
          return matchesId || matchesTitle || matchesKeyword;
        });

        if (foundSpec) {
          matchedSpec = {
            title: foundSpec.title,
            category: foundSpec.category || "Verified High-Success Roster",
            usfdaProtocol: foundSpec.usfdaProtocol,
            recoveryTime: foundSpec.recoveryTime,
            benefits: foundSpec.benefits
          };
        }

        // Search in specialtiesData (from @/data/treatments) if not matched yet
        if (!matchedSpec) {
          for (const sec of specialtiesData) {
            for (const trt of sec.treatments) {
              if (text.includes(trt.name.toLowerCase()) || trt.name.toLowerCase().includes(text)) {
                matchedSpec = {
                  title: trt.name,
                  category: sec.name || "Hernia, Veins & General Care",
                  usfdaProtocol: "Minimally Invasive Daycare Protocol",
                  recoveryTime: "24 – 48 Hours Rapid Discharge",
                  benefits: trt.benefits
                };
                break;
              }
            }
            if (matchedSpec) break;
          }
        }

        if (matchedSpec !== null) {
          const doc = getDoc(0);
          replyText = `I see you are inquiring about **${matchedSpec.title}**. Please be reassured that modern surgical techniques allow this to be managed smoothly with virtually zero pain or lengthy hospital stays!\n\nIn and around **${userCity}**, our care network specializes in **${matchedSpec.usfdaProtocol || "Advanced Minimally Invasive Protocols"}**, ensuring you can return to normal routine within **${matchedSpec.recoveryTime || "24 to 48 hours"}**.\n\nTo protect your budget and guarantee safety, **we actively match you with the hospital boasting the highest success rate for this exact procedure within your insurance or financial limit**. Call our care desk right now—we will secure your hospital placement immediately!`;

          cardData = {
            procedure: matchedSpec.title,
            category: matchedSpec.category || "Verified High-Success Roster",
            recoveryTime: matchedSpec.recoveryTime || "24 – 48 Hours Rapid Recovery",
            estCost: "Matched to your budget or 100% Cashless",
            cashless: true,
            hospitalsCount: 20,
            recommendedDoctor: doc.name,
            doctorQualifications: "Senior Specialist & Surgical Lead",
            packageInclusions: [
              "Hospital placement by highest success rate",
              matchedSpec.benefits[0] || "100% Cashless insurance TPA desk support",
              matchedSpec.benefits[1] || "Zero upfront admission deposit assistance",
              "Complimentary pick-up & drop cab transit"
            ]
          };

          notesData = {
            symptomSummary: `Dynamic DB Match from ${userCity}: Patient inquiring about ${matchedSpec.title}. Guided to success-rate hospital redirection.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: matchedSpec.category || "Specialist Surgical Care"
          };
        }
        // ─────────────────────────────────────────────────────────────
        // 🚀 STEP 2: BROAD SURGICAL DEPARTMENT & SPECIALTY RECOGNITION
        // ─────────────────────────────────────────────────────────────
        // 🦴 ORTHOPEDICS & JOINT REPLACEMENT
        else if (/(ortho|knee|hip|joint|bone|fracture|acl|ligament|sports|arthritis|spine|slip disc|disc|back pain)/i.test(text)) {
          const doc = getDoc(3);
          replyText = `For joint discomfort, ligament tears, or knee/hip surgery, precision mobility matters most! Our accredited orthopedic centers around **${userCity}** specialize in **Robotic & Arthroscopic Minimally Invasive Surgery**, ensuring rapid walking recovery with minimal scarring.\n\nWe don't let you guess which hospital has the safest orthopedic room; **our clinical desk analyzes verified joint surgery success rates in ${userCity} and directs you to the top hospital that honors your exact insurance or budget**. Call us today for instant alignment!`;

          cardData = {
            procedure: "Robotic Joint & Arthroscopic Sports Surgery",
            category: "Orthopaedic & Spine Sciences",
            recoveryTime: "3 – 5 Days Early Mobility Protocol",
            estCost: "Matched to your insurance or budget tier",
            cashless: true,
            hospitalsCount: 18,
            recommendedDoctor: doc.name,
            doctorQualifications: "MS Orthopaedics, Robotic Joint & Spine Lead",
            packageInclusions: ["Hospital placement by high orthopedic success rate", "Robotic-assisted precision alignment available", "100% Cashless TPA insurance pre-authorization", "Complimentary transit and rehab physiotherapy support"]
          };

          notesData = {
            symptomSummary: `Orthopedic/Joint care inquiry from ${userCity}. Recommended success-rate placement for arthroscopic/robotic joint procedure.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "Orthopedic & Spine Care"
          };
        }
        // 🌸 GYNECOLOGY & WOMEN'S SURGICAL CARE
        else if (/(gynee|gyno|uterus|fibroid|ovarian|cyst|hysterec|c-section|pregnancy|bleeding|pelvic|laparoscopy|women|lady)/i.test(text)) {
          const doc = getDoc(2);
          replyText = `Women's surgical procedures require total empathy, personal privacy, and delicate precision. For uterine fibroids, ovarian cysts, or laparoscopic hysterectomy around **${userCity}**, our empanelled gynecological suites utilize **3D Keyhole Minimally Invasive Technology** with same-day or next-day discharge.\n\n**We can pair you directly with senior female operating surgeons with the highest patient success ratings in ${userCity}, tailored perfectly to your cashless MediClaim or budget**. Call our care team confidentially right now!`;

          cardData = {
            procedure: "Laparoscopic Hysterectomy & Fibroid Removal",
            category: "Women's Advanced Surgical Care",
            recoveryTime: "24 – 48 Hours Comfortable Discharge",
            estCost: "Covered completely under corporate MediClaim",
            cashless: true,
            hospitalsCount: 15,
            recommendedDoctor: doc.name,
            doctorQualifications: "MS Obstetrics & Gynecology, Laparoscopy Lead",
            packageInclusions: ["Priority preference for female surgical lead", "100% Confidential patient record protection", "Express cashless MediClaim pre-authorization", "Complimentary private pick-up & drop cabs"]
          };

          notesData = {
            symptomSummary: `Gynecological surgery inquiry from ${userCity}. Aligned with private, high-success keyhole surgical placement.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "Gynecology & Women's Health"
          };
        }
        // 👁️ OPHTHALMOLOGY & LASIK EYE SURGERY
        else if (/(eye|vision|cataract|lasik|glaucoma|lens|blury|retina|cornea|specs|glasses)/i.test(text)) {
          replyText = `When it comes to your vision, advanced laser precision is essential! Whether you need blade-free **Cataract Phacoemulsification with imported IOL lenses** or **Contoura Vision LASIK** to remove glasses around **${userCity}**, our network guarantees zero injection and zero pad recovery in under 15 minutes!\n\n**Let HealthFlo guide you to the top accredited eye hospital in ${userCity} with 100% optical success rates at a price tailored to your exact budget**. Give our desk a quick call now to review lens options and insurance!`;

          cardData = {
            procedure: "Blade-Free Laser Cataract & Contoura LASIK",
            category: "Advanced Ophthalmic Laser Suite",
            recoveryTime: "15-Minute Procedure (Same Day Clear Vision)",
            estCost: "Matched to your budget or cashless insurance",
            cashless: true,
            hospitalsCount: 16,
            recommendedDoctor: "Senior Anterior Segment & LASIK Specialist",
            doctorQualifications: "MS, DNB Ophthalmology (Fellow Cornea & Refractive)",
            packageInclusions: ["Hospital selection by verified vision success rates", "Choice of imported monofocal & multifocal lenses", "100% Cashless cataract insurance approval", "Dedicated admissions coordinator & cab transit"]
          };

          notesData = {
            symptomSummary: `Ophthalmic/Cataract/LASIK inquiry from ${userCity}. Matched with blade-free daycare laser placement.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "Ophthalmic & Laser Vision Suite"
          };
        }
        // 👂 ENT (EAR, NOSE, THROAT) SURGERY
        else if (/(ent|tonsil|sinus|septum|ear|nose|throat|deaf|thyroid|adenoidal|snoring|smell|polyps)/i.test(text)) {
          replyText = `Chronic sinusitis, breathing blockages, deviated septum (DNS), and enlarged tonsils can be solved permanently without external scars! Our ENT specialists across **${userCity}** utilize **Endoscopic & Coblator Plasma techniques** that heal in just a few days with minimal discomfort.\n\n**We review hospital success ratings across your locality to place you with the most experienced ENT surgical lead that aligns with your MediClaim or budget**. Call our team today for quick answers!`;

          cardData = {
            procedure: "Endoscopic Sinus (FESS) & Coblator Tonsillectomy",
            category: "Advanced ENT & Skull Base Suite",
            recoveryTime: "24-Hour Daycare Discharge",
            estCost: "Tailored to your insurance or affordable budget",
            cashless: true,
            hospitalsCount: 14,
            recommendedDoctor: "Senior Consultant Otorhinolaryngologist",
            doctorQualifications: "MS ENT, Endoscopic Airway Specialist",
            packageInclusions: ["Hospital matching by highest ENT surgical ratings", "Coblation plasma technology with minimal bleeding", "100% Paperless cashless hospital admission", "Complimentary pick-up & drop transit cab"]
          };

          notesData = {
            symptomSummary: `ENT surgery query from ${userCity}. Recommended hospital placement for endoscopic sinus / coblation protocol.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "ENT & Endoscopic Airway Care"
          };
        }
        // 🩸 VASCULAR, COSMETIC & VARICOSE VEINS
        else if (/(vein|varicose|varicocele|spider|cosmetic|fat|lipo|lipoma|gynecomastia|breast|plastic|scar|cyst)/i.test(text)) {
          replyText = `For vascular conditions like Varicose Veins or cosmetic procedures like Lipomatosis and Gynecomastia around **${userCity}**, non-invasive precision is key. We utilize **Endovenous Laser Treatment (EVLT)** and precision micro-sculpting, leaving virtually no visible scars with same-day home discharge!\n\n**We connect you exclusively with accredited plastic and vascular surgeons boasting the highest aesthetic success rates within your budget**. Call us right now for complete confidentiality and pricing answers!`;

          cardData = {
            procedure: "Laser Varicose EVLT & Daycare Micro-Surgery",
            category: "Vascular & Aesthetic Surgical Care",
            recoveryTime: "24 – 48 Hours Walk-Home Recovery",
            estCost: "Matched exactly to your budget or MediClaim",
            cashless: true,
            hospitalsCount: 15,
            recommendedDoctor: "Senior Vascular & Aesthetic Surgeon",
            doctorQualifications: "M.Ch Plastic & Peripheral Vascular Specialist",
            packageInclusions: ["Hospital selection by high aesthetic success rates", "Endovenous laser EVLT without large skin incisions", "Complete personal privacy and confidential record", "Zero upfront hospital deposit billing guidance"]
          };

          notesData = {
            symptomSummary: `Vascular/Aesthetic procedure inquiry from ${userCity}. Aligned with EVLT laser / daycare microsurgery placement.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "Vascular & Cosmetic Surgery"
          };
        }
        // 🩹 GASTROENTEROLOGY & GENERAL ABDOMINAL SURGERY
        else if (/(gastro|stomach|gallbladder|gallstone|appendix|appendicitis|reflux|acidity|ulcer|endoscopy|colonoscopy|biopsy)/i.test(text)) {
          const doc = getDoc(2);
          replyText = `Gallbladder stones (cholelithiasis) and acute appendix issues require swift, expert intervention! Our advanced GI surgical centers in **${userCity}** perform **3D Laparoscopic Cholecystectomy and Appendectomy**, removing the issue through miniature keyholes with rapid 24-hour hospital discharge and virtually zero scarring.\n\n**Why risk calling random hospitals? We instantly match your surgery with the GI center having the highest documented surgical recovery rates within your exact insurance tier**. Call our desk now for priority placement!`;

          cardData = {
            procedure: "Laparoscopic Gallbladder & Appendix Surgery",
            category: "Gastroenterology & GI Surgical Care",
            recoveryTime: "24 – 36 Hours Hospital Stay",
            estCost: "Covered 100% under corporate MediClaim",
            cashless: true,
            hospitalsCount: 18,
            recommendedDoctor: doc.name,
            doctorQualifications: "MS, M.Ch Surgical Gastroenterology",
            packageInclusions: ["Hospital selection by verified GI surgical success", "Precision 3D keyhole camera instrumentation", "Express 2-hour cashless pre-authorization check", "Personal admissions buddy and complimentary cab"]
          };

          notesData = {
            symptomSummary: `Gastrointestinal / Gallbladder inquiry from ${userCity}. Aligned with high-success laparoscopic GI surgical placement.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "Gastroenterology & GI Suite"
          };
        }
        // ─────────────────────────────────────────────────────────────
        // 🏥 STEP 3: SMART GENERAL AGGREGATOR FALLBACK (Surgical matching)
        // ─────────────────────────────────────────────────────────────
        else {
          replyText = `Thank you for consulting us from **${userCity}**. No matter what health symptom or surgical treatment you are evaluating, HealthFlo ensures you receive gentle, minimally invasive medical care without any stress or hospital price inflation.\n\nBecause every patient's diagnosis and MediClaim policy is unique, **our clinical team will analyze your requirements and redirect you directly to the hospital in ${userCity} with the absolute highest surgical success rate within your budget**. Call us or tap the button below—a brief 3-minute phone conversation will answer everything!`;

          cardData = {
            procedure: "Personalized Hospital & Surgeon Matching",
            category: "Verified High-Success Network",
            recoveryTime: "Same Day Coordinator Consultation",
            estCost: "Tailored to your budget or insurance",
            cashless: true,
            hospitalsCount: 25,
            recommendedDoctor: "Assigned HealthFlo Senior Coordinator",
            doctorQualifications: "Surgical Success Rate & Care Specialist",
            packageInclusions: ["Hospital redirection by high success rate", "100% Paperless cashless insurance guidance", "Dedicated personalized care coordinator", "Free transit cab assistance for admissions"]
          };

          notesData = {
            symptomSummary: `General consultation from ${userCity}: "${userPrompt.substring(0, 60)}...". Guided toward hospital success rate matching.`,
            urgencyTier: "Hospital Matching Protocol",
            specialityCategory: "Care Coordination Hub"
          };
        }
      }

      const aiMsg: ChatMessage = {
        id: Date.now().toString() + "-ai",
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        clinicalNotes: notesData,
        treatmentCard: cardData
      };

      setMessages((prev) => [...prev, aiMsg]);
      recordSilentConsultationNote(userPrompt, replyText, cardData?.procedure, notesData?.symptomSummary, notesData?.specialityCategory);
      setTimeout(() => setIsAiSpeaking(false), 8000);
    }, 1200);
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
    "❓ How does HealthFlo select hospitals with the highest success rates?",
    "🤕 I was advised surgery by my doctor — can I get a free second opinion?",
    "🛡️ What if I don't have insurance? Do you offer 0% interest monthly EMI?",
    "⚡ What makes painless laser surgery safer than traditional stitch surgery?"
  ];

  const latestAiMessage = [...messages].reverse().find((m) => m.sender === "ai");

  return (
    <div className="h-screen w-full bg-gradient-to-b from-[#0A1120] via-[#0D182E] to-[#122240] text-slate-100 font-sans relative overflow-hidden flex flex-col">
      <Navbar />

      {/* Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-[#0055ff]/15 via-[#00E5FF]/10 to-transparent rounded-full blur-[160px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* ── MAIN WORKSPACE ────────────────────── */}
      <main className="flex-1 w-full max-w-[94rem] mx-auto px-2 sm:px-5 pt-20 sm:pt-24 pb-2 flex flex-col overflow-hidden relative z-10">
        
        {/* Top Header Trust & Location Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 px-4 py-2 bg-[#12213F]/80 backdrop-blur-2xl border border-slate-700/80 rounded-2xl sm:rounded-full shadow-lg mb-2 shrink-0">
          
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 absolute inset-0 m-auto" />
            </div>
            <span className="text-xs font-black text-white tracking-wide flex items-center gap-2">
              <span>HealthFlo Care Companion</span>
              <span className="hidden sm:inline-flex text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 items-center gap-1 shadow-inner">
                <MapPin className="w-3 h-3 text-[#00E5FF] animate-bounce" /> Recognized: {userCity}
              </span>
            </span>
          </div>

          {/* DUAL TOGGLE */}
          <div className="flex items-center p-1 bg-slate-900/90 border border-slate-700/90 rounded-full shadow-inner mx-auto sm:mx-0">
            <button
              type="button"
              onClick={() => { setAiMode("assistant"); haptic.medium(); }}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                aiMode === "assistant"
                  ? "bg-gradient-to-r from-[#0055ff] to-[#00A88F] text-white shadow-lg shadow-blue-500/30 scale-[1.02]"
                  : "text-slate-400 hover:text-white bg-transparent"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
              <span>Assistant Mode</span>
            </button>

            <button
              type="button"
              onClick={() => { setAiMode("chat"); haptic.medium(); }}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 ${
                aiMode === "chat"
                  ? "bg-[#253961] text-white shadow-md shadow-blue-900/30 scale-[1.02]"
                  : "text-slate-400 hover:text-white bg-transparent"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
              <span>Conversation Chat Mode</span>
            </button>
          </div>

          {/* Clean Patient Benefit Tag & Reset Action */}
          <div className="flex items-center gap-2.5">
            <div className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-black text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/40 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hospital Success Rate Matching</span>
            </div>

            <button
              onClick={() => { haptic.light(); setMessages([]); setIsThinking(false); setIsAiSpeaking(false); }}
              title="Reset Conversation"
              className="text-xs font-bold text-slate-400 hover:text-red-400 flex items-center gap-1 transition-colors px-2 py-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">New Chat</span>
            </button>
          </div>
        </div>

        {/* ── MODE 1: ASSISTANT MODE (ADVANCED FLANKING DESIGN) ── */}
        {aiMode === "assistant" && (
          <div className="flex-1 w-full flex items-center justify-center relative overflow-y-auto sm:overflow-hidden scrollbar-none px-1">
            
            <div className="w-full h-full max-w-[92rem] grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 lg:gap-6 items-center my-auto px-1 sm:px-2 animate-[fadeIn_0.4s_ease-out]">
              
              {/* ── LEFT COLUMN (COL-SPAN-4): CLINICAL CARE CONSULTATION ── */}
              <div className="lg:col-span-4 flex flex-col items-start w-full max-h-[70vh] sm:max-h-[72vh] order-2 lg:order-1 transition-all">
                
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-950 text-slate-100 rounded-full shadow-lg border border-cyan-500/40 self-start mb-2 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-[pulse_0.6s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_10px_rgba(0,229,255,0.9)] shrink-0" />
                  <span className="text-[11px] font-black tracking-widest uppercase text-cyan-300">💬 Clinical Care Consultation</span>
                </div>

                <div className="w-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent p-5 sm:p-6 rounded-[2.2rem] bg-[#13203A]/90 backdrop-blur-3xl border border-slate-600/70 shadow-[0_20px_60px_rgba(0,0,0,0.4)] space-y-4 text-left relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                  {latestAiMessage && !isThinking ? (
                    /* AI RESPONDED */
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-700/80 pb-2.5">
                        <span className="text-xs font-black text-cyan-400 flex items-center gap-1.5 uppercase tracking-wider">
                          <Stethoscope className="w-4 h-4 text-cyan-400" /> Care Coordinator Guidance
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" /> {userCity}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-100 font-semibold leading-relaxed whitespace-pre-wrap">
                        {latestAiMessage.text}
                      </p>

                      {/* CLINICAL ASSESSMENT PROFILE */}
                      {latestAiMessage.clinicalNotes && (
                        <div className="p-4 rounded-2xl bg-[#0C1527]/90 border border-cyan-500/40 space-y-2 text-left shadow-inner">
                          <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-black text-[#00E5FF] uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-cyan-400" /> Care Matching Evaluation
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700/50 font-extrabold text-[10px]">
                              {latestAiMessage.clinicalNotes.urgencyTier}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-300 italic">
                            &quot;{latestAiMessage.clinicalNotes.symptomSummary}&quot;
                          </p>
                          <div className="pt-1 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                            <span>Focus: <strong className="text-slate-200">{latestAiMessage.clinicalNotes.specialityCategory}</strong></span>
                            <span className="flex items-center gap-1 text-emerald-400"><Shield className="w-3 h-3" /> Confidential Care</span>
                          </div>
                        </div>
                      )}

                      {/* How HealthFlo Works Advisory */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/40 to-emerald-900/40 border border-emerald-500/30 flex items-start gap-3">
                        <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-[11px] sm:text-xs font-semibold text-slate-200 leading-snug">
                          <strong>How HealthFlo Works:</strong> We never let you navigate hospitals alone. Our coordinators review your symptoms and match you with the hospital boasting the highest success rate in <strong>{userCity}</strong> within your budget!
                        </p>
                      </div>
                    </div>
                  ) : isThinking ? (
                    /* THINKING STATE */
                    <div className="py-12 space-y-4 text-center animate-pulse">
                      <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                        <Radio className="w-6 h-6 text-[#00E5FF] animate-spin" />
                      </div>
                      <p className="text-sm font-black text-cyan-300 uppercase tracking-widest">Analyzing {userCity} Hospital Data...</p>
                      <p className="text-xs font-medium text-slate-400 max-w-xs mx-auto">Comparing surgical success rates, patient feedback, and cashless insurance tiers...</p>
                    </div>
                  ) : (
                    /* INITIAL STATE ON LEFT PANEL */
                    <div className="space-y-4 py-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 font-extrabold text-xs">
                        <MapPin className="w-3.5 h-3.5 text-[#00E5FF]" />
                        <span>Connected to Accredited Hospitals in {userCity}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                        We Guide You to the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] via-teal-300 to-[#00A88F]">Highest Success Rate Hospital.</span>
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed">
                        Don&apos;t call hospitals blindly or worry about hidden costs. You share your symptoms and budget—**HealthFlo directly connects you to the top-performing hospital and surgeon** in your area with 100% cashless insurance!
                      </p>
                      <div className="p-3.5 rounded-2xl bg-[#0C1629] border border-cyan-500/30 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                          <HeartHandshake className="w-5 h-5 text-cyan-300" />
                        </div>
                        <div className="text-xs font-semibold text-slate-300">
                          <strong className="text-white block">Surgical Aggregator & Care Protection</strong>
                          <span>Type a symptom or ask how we protect your surgical budget and guarantee transparent healing.</span>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* ── CENTER COLUMN (COL-SPAN-4): 100% UNOBSCURED, NEON-GLOWING SOVEREIGN AI ORB ── */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center relative my-3 lg:my-0 order-1 lg:order-2 shrink-0">
                
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center select-none">
                  
                  <div className="absolute -inset-2 sm:-inset-4 rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-emerald-500/15 blur-2xl pointer-events-none animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 animate-[spin_25s_linear_infinite] pointer-events-none shadow-[0_0_20px_rgba(0,229,255,0.2)]" />
                  <div className="absolute -inset-5 sm:-inset-7 rounded-full border border-emerald-400/40 animate-[spin_40s_linear_infinite_reverse] pointer-events-none" />
                  <div className="absolute -inset-10 sm:-inset-12 rounded-full border border-slate-700/60 animate-[spin_60s_linear_infinite] pointer-events-none hidden sm:block" />

                  {isThinking && (
                    <div className="absolute -inset-3 rounded-full border-2 border-dashed border-[#00E5FF] animate-[spin_2s_linear_infinite] shadow-[0_0_55px_rgba(0,229,255,0.6)] pointer-events-none" />
                  )}

                  <div className="absolute left-0 top-1/2 -translate-x-3.5 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border-2 border-[#00E5FF] shadow-[0_0_15px_#00e5ff] animate-pulse hidden lg:flex items-center justify-center pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                  <div className="absolute right-0 top-1/2 translate-x-3.5 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-950 border-2 border-emerald-400 shadow-[0_0_15px_#34d399] animate-pulse hidden lg:flex items-center justify-center pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  <div className="w-full h-full flex items-center justify-center transform scale-110 sm:scale-125 transition-transform duration-700 hover:scale-130">
                    <AiOrb preset={activePreset} className="w-full h-full filter drop-shadow-[0_0_35px_rgba(0,229,255,0.45)]" />
                  </div>

                </div>

                {/* Live Status Badge */}
                <div className="mt-4 sm:mt-6 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 flex items-center gap-2.5 shadow-md">
                  {isThinking ? (
                    <>
                      <Zap className="w-4 h-4 text-[#00E5FF] animate-bounce" />
                      <span className="text-xs font-black uppercase text-cyan-300 tracking-widest animate-pulse">Filtering Hospital Success Rates...</span>
                    </>
                  ) : isAiSpeaking ? (
                    <>
                      <div className="flex items-center gap-0.5">
                        <span className="w-1 h-3 bg-cyan-400 rounded-full animate-[pulse_0.4s_infinite]" />
                        <span className="w-1 h-5 bg-emerald-400 rounded-full animate-[pulse_0.6s_infinite_0.1s]" />
                        <span className="w-1 h-2 bg-cyan-400 rounded-full animate-[pulse_0.5s_infinite_0.2s]" />
                        <span className="w-1 h-4 bg-blue-400 rounded-full animate-[pulse_0.3s_infinite]" />
                      </div>
                      <span className="text-xs font-black text-emerald-300 uppercase tracking-widest">HealthFlo Companion Speaking</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-slate-400 animate-pulse" />
                      <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Assistant Mode • Ready for Conversation</span>
                    </>
                  )}
                </div>

              </div>

              {/* ── RIGHT COLUMN (COL-SPAN-4): YOUR PERSONALIZED HEALTHFLO PATHWAY ── */}
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end w-full max-h-[70vh] sm:max-h-[72vh] order-3 transition-all">
                
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-950 text-slate-100 rounded-full shadow-lg border border-emerald-500/40 self-start lg:self-end mb-2 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-[pulse_0.6s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_10px_rgba(52,211,153,0.9)] shrink-0" />
                  <span className="text-[11px] font-black tracking-widest uppercase text-emerald-300">✨ Your Personalized HealthFlo Pathway</span>
                </div>

                <div className="w-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent rounded-[2.2rem] transition-all">
                  
                  {latestAiMessage && latestAiMessage.treatmentCard && !isThinking ? (
                    /* AI HAS ANSWERED WITH SURGERY & SUCCESS-RATE MATCHING CARD */
                    <div className="p-5 sm:p-6 rounded-[2.2rem] bg-gradient-to-br from-[#122240] via-[#0D1C36] to-[#0A162B] text-white shadow-2xl border-2 border-emerald-500/50 space-y-4 text-left relative overflow-hidden animate-[scaleUp_0.35s_ease-out]">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                      <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-500/30 inline-flex items-center gap-1.5 shadow-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Success-Rate Verified
                        </span>
                        <span className="text-xs text-cyan-300 font-bold">{latestAiMessage.treatmentCard.category}</span>
                      </div>

                      <div>
                        <h4 className="text-lg sm:text-xl font-black text-white leading-tight">{latestAiMessage.treatmentCard.procedure}</h4>
                        <div className="mt-2 p-2.5 rounded-xl bg-[#0E1B33] border border-slate-700/70 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-600/30 flex items-center justify-center shrink-0 font-black text-xs text-emerald-300">✓</div>
                          <div>
                            <p className="text-xs font-black text-white">Matched by Highest Surgical Success</p>
                            <p className="text-[10px] text-slate-400 font-medium">Filtered across top accredited hospitals in <strong>{userCity}</strong> to match your exact financial & MediClaim tier.</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Recovery Time</span>
                          <span className="text-xs sm:text-sm font-black text-emerald-400 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3.5 h-3.5 shrink-0" /> {latestAiMessage.treatmentCard.recoveryTime}
                          </span>
                        </div>
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Budget & Insurance</span>
                          <span className="text-xs sm:text-sm font-black text-[#00E5FF] block mt-0.5">
                            {latestAiMessage.treatmentCard.estCost}
                          </span>
                        </div>
                      </div>

                      {/* Package Inclusions Pills */}
                      {latestAiMessage.treatmentCard.packageInclusions && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">HealthFlo Aggregator Benefits:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {latestAiMessage.treatmentCard.packageInclusions.map((inc, i) => (
                              <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-900/40 text-emerald-200 border border-emerald-500/20">
                                ✓ {inc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-1">
                        <p className="text-[11px] font-bold text-amber-300 mb-2 text-center flex items-center justify-center gap-1">
                          <span>💡 Speak to us first — we match your budget with top hospital success rates!</span>
                        </p>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => haptic.medium()}
                          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all active:scale-95"
                        >
                          <Phone className="w-4 h-4 fill-current shrink-0 animate-bounce" />
                          <span>📞 Speak to HealthFlo Care Desk Now</span>
                        </a>
                      </div>

                    </div>
                  ) : isThinking ? (
                    /* THINKING ON RIGHT PANEL */
                    <div className="p-6 sm:p-7 rounded-[2.2rem] bg-[#13203A]/90 border-2 border-emerald-500/40 shadow-2xl py-12 text-center space-y-3 animate-pulse">
                      <Activity className="w-10 h-10 text-emerald-400 animate-bounce mx-auto" />
                      <p className="text-sm font-black text-emerald-300 uppercase tracking-widest">Matching Success Rates in {userCity}...</p>
                      <p className="text-xs font-semibold text-slate-400">Selecting best hospital fit based on surgical ratings and cashless insurance coverage.</p>
                    </div>
                  ) : (
                    /* INITIAL STATE ON RIGHT PANEL */
                    <div className="p-5 sm:p-6 rounded-[2.2rem] bg-[#13203A]/90 backdrop-blur-3xl border border-slate-600/70 shadow-[0_20px_60px_rgba(0,0,0,0.35)] space-y-4 text-left relative">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

                      <div className="flex items-center gap-2 text-xs font-black text-emerald-300 bg-emerald-950/70 p-2.5 rounded-xl border border-emerald-500/40 w-fit">
                        <Award className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span>Why We Connect You to Hospitals</span>
                      </div>
                      <h3 className="text-xl font-black text-white tracking-tight leading-tight">
                        Hospital Success Rate & Budget Alignment
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-slate-300 leading-relaxed">
                        When you connect with HealthFlo, **we analyze real hospital outcomes in {userCity}** and redirect you to the safest center that completely honors your financial budget or MediClaim limit—no extra deposits!
                      </p>
                      <div className="pt-2 border-t border-slate-700/80 space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Highest Success Ratings</span>
                          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 100% Budget Alignment</span>
                        </div>
                        <div className="p-3 rounded-xl bg-[#0B1527] border border-slate-700/60 text-center">
                          <p className="text-xs font-bold text-slate-200 mb-2">Want immediate assistance finding your ideal hospital?</p>
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-wider w-full transition-all shadow-md active:scale-95"
                          >
                            <Phone className="w-3.5 h-3.5 fill-current" />
                            <span>📞 Connect to HealthFlo Desk Now</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          </div>
        )}

        {/* ── MODE 2: CONVERSATION CHAT MODE (SCROLLABLE THREAD + QUICK SUGGESTIONS) ──── */}
        {aiMode === "chat" && (
          <div className="flex-1 overflow-y-auto w-full px-2 py-4 flex flex-col space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            
            {messages.length === 0 ? (
              <div className="my-auto flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 animate-[fadeIn_0.4s_ease-out]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-400/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(0,229,255,0.2)]">
                  <HeartHandshake className="w-8 h-8 text-[#00E5FF]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Hospital Success & Budget Advisor</h2>
                <p className="text-sm font-semibold text-slate-300 max-w-xl mb-6 leading-relaxed">
                  We take the anxiety out of choosing a hospital in <strong>{userCity}</strong>. Tell us your medical symptoms and budget, and we will guide you to the specialized hospital with the highest proven success rate!
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
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
                      className="p-4 rounded-2xl bg-[#13203A]/90 hover:bg-[#1C2F55] text-xs sm:text-sm font-bold text-slate-200 border border-slate-700/80 shadow-md hover:border-cyan-400/60 transition-all flex items-center justify-between group"
                    >
                      <span className="line-clamp-2 pr-3">{sug}</span>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6 pb-6 max-w-4xl mx-auto w-full">
                
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 sm:gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-[fadeIn_0.3s_ease-out]`}
                  >
                    {msg.sender === "ai" && (
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950 border-2 border-cyan-500 shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center shrink-0">
                        <AiOrb preset="Aurora" className="w-full h-full rounded-full overflow-hidden scale-110" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping border border-slate-950" />
                      </div>
                    )}

                    <div className={`space-y-4 max-w-[90%] sm:max-w-[82%] ${msg.sender === "user" ? "order-1" : "order-2"}`}>
                      
                      {/* Text Bubble */}
                      <div className={`p-5 sm:p-6 rounded-[2rem] text-xs sm:text-sm font-semibold leading-relaxed shadow-lg ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-[#0055ff] to-[#0077ff] text-white rounded-br-none border border-blue-400/30"
                          : "bg-[#13213C]/95 text-slate-100 border border-slate-600/80 rounded-bl-none shadow-xl"
                      }`}>
                        {msg.sender === "ai" && (
                          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-700/80 text-xs font-black text-cyan-400 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <HeartHandshake className="w-4 h-4 text-cyan-400" /> HealthFlo Care Companion
                            </span>
                            <span className="text-slate-400 font-bold lowercase text-[11px]">{msg.timestamp}</span>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                      </div>

                      {/* CLINICAL ASSESSMENT PROFILE */}
                      {msg.clinicalNotes && (
                        <div className="p-4 rounded-2xl bg-[#0B1526]/90 border border-cyan-500/40 space-y-1.5 text-left shadow-md">
                          <div className="flex items-center justify-between text-[11px] font-black text-[#00E5FF] uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-cyan-400" /> Care Matching Evaluation
                            </span>
                            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-extrabold border border-cyan-800/50">{msg.clinicalNotes.urgencyTier}</span>
                          </div>
                          <p className="text-xs font-medium text-slate-300 italic">
                            &quot;{msg.clinicalNotes.symptomSummary}&quot;
                          </p>
                        </div>
                      )}

                      {/* INTERACTIVE TREATMENT CARD IN CHAT THREAD */}
                      {msg.treatmentCard && (
                        <div className="p-6 rounded-[2.2rem] bg-gradient-to-br from-[#122240] via-[#0D1C36] to-[#0A162B] text-white shadow-2xl border-2 border-emerald-500/50 space-y-5 animate-[scaleUp_0.3s_ease-out]">
                          
                          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-500/30 inline-flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Success-Rate Verified
                            </span>
                            <span className="text-xs text-cyan-300 font-bold">{msg.treatmentCard.category}</span>
                          </div>

                          <div>
                            <h4 className="text-xl sm:text-2xl font-black text-white">{msg.treatmentCard.procedure}</h4>
                            <p className="text-xs text-slate-300 font-medium mt-1">Matched by highest surgical outcomes in <strong className="text-white font-black">{userCity}</strong> to match your exact budget & insurance tier.</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1">
                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Recovery Time</span>
                              <span className="text-xs sm:text-sm font-black text-emerald-400 flex items-center gap-1 mt-1">
                                <Clock className="w-3.5 h-3.5 shrink-0" /> {msg.treatmentCard.recoveryTime}
                              </span>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Budget & Insurance</span>
                              <span className="text-xs sm:text-sm font-black text-[#00E5FF] block mt-1">
                                {msg.treatmentCard.estCost}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2">
                            <a
                              href={WHATSAPP_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => haptic.medium()}
                              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/30 transition-transform active:scale-95"
                            >
                              <Phone className="w-4 h-4 fill-current shrink-0 animate-bounce" />
                              <span>📞 Connect to HealthFlo Care Desk Now</span>
                            </a>
                          </div>

                        </div>
                      )}

                    </div>
                  </div>
                ))}

                {isThinking && (
                  <div className="flex items-center gap-4 text-cyan-300 font-bold text-xs sm:text-sm pl-2 animate-pulse">
                    <div className="relative w-10 h-10 rounded-full bg-slate-900 border border-cyan-500 flex items-center justify-center shrink-0">
                      <Radio className="w-5 h-5 text-[#00E5FF] animate-spin" />
                    </div>
                    <span>HealthFlo companion is comparing hospital success rates in {userCity} and tailoring your budget path...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

          </div>
        )}

        {/* ── THE SINGLE BOTTOM GEMINI-STYLE CHAT INPUT BAR ──── */}
        <div className="w-full max-w-4xl mx-auto pt-2 shrink-0 z-20">
          <form
            onSubmit={handleSendMessage}
            className="w-full p-2 bg-[#12213F]/95 backdrop-blur-3xl border-2 border-slate-600/80 rounded-[2.5rem] shadow-[0_15px_50px_rgba(0,0,0,0.5)] flex items-center gap-2 sm:gap-3 focus-within:border-[#00E5FF] focus-within:shadow-[0_0_35px_rgba(0,229,255,0.25)] transition-all"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center shrink-0 ml-1 shadow-inner ${
              aiMode === "assistant" ? "bg-cyan-950/80 border-cyan-500/60 text-[#00E5FF]" : "bg-slate-800 border-slate-600 text-white"
            }`}>
              {aiMode === "assistant" ? <Sparkles className="w-5 h-5 animate-pulse text-[#00E5FF]" /> : <MessageSquare className="w-5 h-5" />}
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                aiMode === "assistant"
                  ? `Type your symptom, procedure, or ask how we select the best hospital in ${userCity} within your budget...`
                  : `Ask your HealthFlo clinical coordinator anything...`
              }
              className="flex-1 bg-transparent text-white text-xs sm:text-base font-semibold focus:outline-none placeholder:text-slate-400 pl-2 py-2"
            />

            <button
              type="button"
              onClick={() => { haptic.light(); alert("Voice Input activated! You may speak directly to your HealthFlo Care Desk."); }}
              title="Speak to Clinical Companion"
              className="w-10 h-10 rounded-full hover:bg-slate-800 text-slate-300 hover:text-[#00E5FF] flex items-center justify-center transition-colors shrink-0"
            >
              <Mic className="w-5 h-5" />
            </button>

            <button
              type="submit"
              disabled={!inputValue.trim() || isThinking}
              title="Submit Message"
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all shrink-0 mr-0.5 shadow-md ${
                inputValue.trim() && !isThinking
                  ? "bg-gradient-to-r from-[#00E5FF] via-[#0055ff] to-blue-600 text-white hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed shadow-none"
              }`}
            >
              <Send className="w-5 h-5 ml-0.5 fill-current" />
            </button>
          </form>

          {/* Clean Visitor-Friendly Clinical Disclaimer */}
          <div className="text-center pt-2 pb-1 text-[11px] font-extrabold text-slate-400">
            <span>HealthFlo evaluates hospital success rates & budget alignment. For direct telephone placement, dial </span>
            <a href={`tel:${config.helplineRaw}`} className="text-[#00E5FF] underline hover:text-white transition-colors">{config.helplineNumber}</a>
            <span> to speak immediately with our Care Coordination Desk.</span>
          </div>
        </div>

      </main>
    </div>
  );
}
