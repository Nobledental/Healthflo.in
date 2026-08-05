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
          symptomSummary: "Guardrail activated: Inappropriate language detected. Realigned to medical etiquette.",
          urgencyTier: "Safety & Guardrail Policy",
          specialityCategory: "Clinical Protocol Guidance"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 🛡️ GUARDRAIL 2: SPAM, GIBBERISH & UNOPTIMIZED CONTENT
      // ─────────────────────────────────────────────────────────────
      else if (text.length < 2 || /^(asdf|qwer|zxcv|1234|test|lol|ok|yeah|no|yes|hihi|yyyy|xxxx)/i.test(text) || (!/[aeiou]/i.test(text) && text.length > 5)) {
        replyText = `I didn't quite catch a specific symptom or procedure in your message! I'm here to help evaluate your symptoms and schedule your consultation at empanelled hospitals in **${userCity}** based on proven surgical success rates and your exact budget.\n\nPlease feel free to type your condition (like *Piles, Hernia, Kidney Stones, Knee Replacement*) or simply give our care doctors a quick call for instant guidance!`;
        
        notesData = {
          symptomSummary: "Brief input detected. Prompted user to clarify condition or call directly.",
          urgencyTier: "General Medical Inquiry",
          specialityCategory: "Triage & Symptom Clarification"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 🛡️ GUARDRAIL 3: OFF-TOPIC SUBJECTS
      // ─────────────────────────────────────────────────────────────
      else if (/(cricket|modi|bjp|congress|bitcoin|crypto|movie|actor|song|python|javascript|who won|election|stock|nifty|market)/i.test(text)) {
        replyText = `As your HealthFlo care companion, my guidance is strictly dedicated to surgical treatments, empanelled hospital matching, and insurance support. I cannot assist with non-medical topics.\n\nHow can our medical team support your healthcare or hospital admission needs in **${userCity}** today?`;

        notesData = {
          symptomSummary: "Off-topic query intercepted by safety guardrail. Re-centered conversation on surgical care.",
          urgencyTier: "Safety & Guardrail Policy",
          specialityCategory: "Ethical Care Boundary"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 🌟 EXPLAINING HOW HEALTHFLO WORKS
      // ─────────────────────────────────────────────────────────────
      else if (/(how do you work|how does healthflo work|who are you|what is healthflo|what do you do|why healthflo|how it works)/i.test(text)) {
        replyText = `We simplify healthcare so you never have to navigate hospital billing or search for the right doctor alone!\n\nWhen you reach out from **${userCity}**, our team of doctors reviews your diagnosis and pairs you with an empanelled hospital that matches your exact budget range and has the highest surgical success rate. **There is zero compromise on surgical quality and USFDA safety standards**—we simply tailor hospital room comfort tiers to protect your finances, complete with dedicated admission coordination and cashless insurance support!`;

        cardData = {
          procedure: "Personalized Hospital & Success-Rate Matching",
          category: "HealthFlo Care Coordination",
          recoveryTime: "2-Hour Express Hospital Placement",
          estCost: "Tailored exactly to your budget & comfort tier",
          cashless: true,
          hospitalsCount: 25,
          recommendedDoctor: "Assigned HealthFlo Senior Doctor",
          doctorQualifications: "Hospital Success Rate & Budget Advisor",
          packageInclusions: ["Success-rate verified hospital placement", "100% Cashless TPA desk assistance", "Zero upfront hospital deposit support", "Dedicated admission coordination & guidance"]
        };

        notesData = {
          symptomSummary: `Inquired about HealthFlo model from ${userCity}. Explained empanelled hospital placement & budget matching.`,
          urgencyTier: "Hospital Matching Protocol",
          specialityCategory: "Care Coordination Model"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 👋 REGULAR GREETINGS (Hi, Hello, Good Morning, Help)
      // ─────────────────────────────────────────────────────────────
      else if (/^(hi|hello|hey|namaste|good morning|good afternoon|good evening|how are you|help|start|can you help)[\s.?!]*$/i.test(text)) {
        replyText = `Hi there! 👋 Welcome to HealthFlo. I'm your personal clinical companion for **${userCity}**.\n\nWe assist patients by scheduling consultations at verified empanelled hospitals that match your exact budget range and maintain the highest surgical success rates—with zero compromise on treatment quality. How can we help you today? Tell us what symptom or procedure you are evaluating!`;

        notesData = {
          symptomSummary: `User from ${userCity} initiated conversational triage. Ready to evaluate budget and empanelled hospitals.`,
          urgencyTier: "General Medical Inquiry",
          specialityCategory: "Patient Care Coordinator Desk"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 🔍 SECOND OPINION & UNNECESSARY SURGERY CHECK
      // ─────────────────────────────────────────────────────────────
      else if (/(second opinion|advised surgery|is surgery required|do i really need surgery|doubt|doctor told|unnecessary)/i.test(text)) {
        replyText = `Seeking a second opinion is the wisest step you can take! Many patients in **${userCity}** consult our senior surgical board after being advised surgery elsewhere, only to discover that conservative medication or non-invasive daycare treatment is sufficient.\n\n**We provide a complimentary 2nd Surgical Opinion from senior specialists with 15+ years of expertise**. Give our doctors a quick call or message on WhatsApp—we will review your reports immediately!`;

        cardData = {
          procedure: "Unbiased Senior Surgeon 2nd Opinion",
          category: "Medical Authenticity Protocol",
          recoveryTime: "Same Day Diagnostic Review",
          estCost: "Complimentary Clinical Screening",
          cashless: true,
          hospitalsCount: 25,
          recommendedDoctor: "Senior Specialist Clinical Board",
          doctorQualifications: "MS, M.Ch / DNB Diagnostic Review Lead",
          packageInclusions: ["Independent evaluation of surgery necessity", "Zero pressure or obligation guidance", "Comparison of advanced vs traditional methods", "Transparent budget matching if procedure needed"]
        };

        notesData = {
          symptomSummary: `Requested second surgical opinion from ${userCity}. Aligned with diagnostic screening.`,
          urgencyTier: "Priority Clinical Guidance",
          specialityCategory: "Second Opinion & Diagnostic Review"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 💳 EMI, ZERO INTEREST & BUDGET SUPPORT
      // ─────────────────────────────────────────────────────────────
      else if (/(no insurance|without insurance|emi|installment|poor|discount|monthly|afford|finance|cash bill)/i.test(text)) {
        replyText = `You should never have to compromise on surgical safety or clinical excellence due to immediate finances! If you do not have MediClaim or need a customized hospital package in **${userCity}**, our doctors are here to support you.\n\n**We coordinate flexible 0% interest EMI installment plans and schedule your procedure at empanelled hospitals according to your budget range**. We never compromise on medical quality—we simply align hospital comfort tiers to your financial peace of mind!`;

        cardData = {
          procedure: "Zero-Interest EMI & Custom Budget Placement",
          category: "Flexible Healthcare Financing",
          recoveryTime: "Instant Digital EMI Approval",
          estCost: "Customized to your affordable monthly budget",
          cashless: true,
          hospitalsCount: 25,
          recommendedDoctor: "Senior Financial & Care Coordinator",
          doctorQualifications: "Hospital Pricing & EMI Concierge",
          packageInclusions: ["0% Interest flexible EMI payment options", "Transparent empanelled hospital package pricing", "Zero compromise on USFDA operating excellence", "Dedicated hospital admission coordinator"]
        };

        notesData = {
          symptomSummary: `Inquired from ${userCity} regarding non-insurance financing, 0% EMI, and empanelled budget tiers.`,
          urgencyTier: "Hospital Matching Protocol",
          specialityCategory: "Healthcare Financing & EMI Support"
        };
      }
      // ─────────────────────────────────────────────────────────────
      // 🚀 STEP 1: DYNAMIC SEMANTIC MATCHING AGAINST WEBSITE DATABASE
      // ─────────────────────────────────────────────────────────────
      else {
        let matchedSpec: { title: string; category: string; usfdaProtocol?: string; recoveryTime?: string; benefits: string[] } | null = null;

        // Search in fullSpecialitiesList
        const foundSpec = Object.values(fullSpecialitiesList).find((spec) => {
          const matchesId = spec.id.toLowerCase().includes(text) || text.includes(spec.id.toLowerCase());
          const matchesTitle = spec.title.toLowerCase().includes(text) || text.includes(spec.shortTitle.toLowerCase());
          const matchesKeyword = spec.keywords.some(kw => text.includes(kw.toLowerCase()) || kw.toLowerCase().includes(text));
          return matchesId || matchesTitle || matchesKeyword;
        });

        if (foundSpec) {
          matchedSpec = {
            title: foundSpec.title,
            category: foundSpec.category || "Empanelled High-Success Network",
            usfdaProtocol: foundSpec.usfdaProtocol,
            recoveryTime: foundSpec.recoveryTime,
            benefits: foundSpec.benefits
          };
        }

        // Search in specialtiesData if not matched yet
        if (!matchedSpec) {
          for (const sec of specialtiesData) {
            for (const trt of sec.treatments) {
              if (text.includes(trt.name.toLowerCase()) || trt.name.toLowerCase().includes(text)) {
                matchedSpec = {
                  title: trt.name,
                  category: sec.name || "Specialized Surgical Care",
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
          replyText = `We completely understand what you're experiencing with **${matchedSpec.title}**, and we want to assure you that you are in safe hands! Modern minimally invasive laser techniques allow this to be resolved smoothly with virtually zero pain or lengthy stays.\n\nTo guarantee safety and protect your finances in **${userCity}**, our HealthFlo team of doctors analyzes proven hospital success rates and schedules your treatment at an empanelled hospital that fits your exact budget range—with zero compromise on treatment quality. Give our care doctors a quick call right now—we will coordinate your admission seamlessly!`;

          cardData = {
            procedure: matchedSpec.title,
            category: matchedSpec.category || "Empanelled High-Success Network",
            recoveryTime: matchedSpec.recoveryTime || "24 – 48 Hours Rapid Recovery",
            estCost: "Matched to your budget or 100% Cashless",
            cashless: true,
            hospitalsCount: 20,
            recommendedDoctor: doc.name,
            doctorQualifications: "Senior Specialist & Surgical Lead",
            packageInclusions: [
              "Hospital selection by verified success rates",
              matchedSpec.benefits[0] || "100% Cashless insurance TPA desk support",
              matchedSpec.benefits[1] || "Zero upfront admission deposit assistance",
              "Dedicated hospital admission coordination"
            ]
          };

          notesData = {
            symptomSummary: `Dynamic DB Match from ${userCity}: Patient inquiring about ${matchedSpec.title}. Guided to empanelled hospital placement.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: matchedSpec.category || "Specialist Surgical Care"
          };
        }
        // ─────────────────────────────────────────────────────────────
        // 🚀 STEP 2: BROAD DEPARTMENT & SPECIALTY RECOGNITION
        // ─────────────────────────────────────────────────────────────
        // 🦴 ORTHOPEDICS & JOINT CARE
        else if (/(ortho|knee|hip|joint|bone|fracture|acl|ligament|sports|arthritis|spine|slip disc|disc|back pain)/i.test(text)) {
          const doc = getDoc(3);
          replyText = `For joint discomfort, ligament tears, or orthopedic relief, precision mobility matters most! Our empanelled orthopedic centers in **${userCity}** specialize in minimally invasive and robotic procedures for swift recovery.\n\nOur clinical team evaluates verified joint surgery outcomes in **${userCity}** and schedules your consultation at a hospital that honors your exact insurance or budget tier with zero compromise on treatment quality. Call our doctors today!`;

          cardData = {
            procedure: "Advanced Joint & Arthroscopic Sports Care",
            category: "Orthopaedic & Spine Sciences",
            recoveryTime: "3 – 5 Days Early Mobility Protocol",
            estCost: "Matched to your insurance or budget tier",
            cashless: true,
            hospitalsCount: 18,
            recommendedDoctor: doc.name,
            doctorQualifications: "MS Orthopaedics, Joint & Spine Lead",
            packageInclusions: ["Hospital placement by high orthopedic success rate", "Advanced minimally invasive precision alignment", "100% Cashless TPA insurance pre-authorization", "Dedicated admission and rehab coordination"]
          };

          notesData = {
            symptomSummary: `Orthopedic/Joint care inquiry from ${userCity}. Recommended empanelled hospital placement.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "Orthopedic & Spine Care"
          };
        }
        // 🌸 GYNECOLOGY & WOMEN'S CARE
        else if (/(gynee|gyno|uterus|fibroid|ovarian|cyst|hysterec|c-section|pregnancy|bleeding|pelvic|laparoscopy|women|lady)/i.test(text)) {
          const doc = getDoc(2);
          replyText = `Women's surgical care requires empathy, complete privacy, and advanced precision. For uterine fibroids, cysts, or gynecological procedures in **${userCity}**, our empanelled suites utilize advanced keyhole technology with same-day or next-day home discharge.\n\n**We pair you with senior female operating surgeons at empanelled hospitals according to your budget range or cashless policy**. Connect confidentially with our team right now!`;

          cardData = {
            procedure: "Laparoscopic Gynecological Care",
            category: "Women's Advanced Surgical Care",
            recoveryTime: "24 – 48 Hours Comfortable Discharge",
            estCost: "Matched to your budget or corporate MediClaim",
            cashless: true,
            hospitalsCount: 15,
            recommendedDoctor: doc.name,
            doctorQualifications: "MS Obstetrics & Gynecology, Laparoscopy Lead",
            packageInclusions: ["Priority preference for female surgical lead", "100% Confidential patient record protection", "Express cashless MediClaim pre-authorization", "Dedicated personal admission coordination"]
          };

          notesData = {
            symptomSummary: `Gynecological surgery inquiry from ${userCity}. Aligned with private empanelled hospital placement.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "Gynecology & Women's Health"
          };
        }
        // 👁️ OPHTHALMOLOGY & EYE SURGERY
        else if (/(eye|vision|cataract|lasik|glaucoma|lens|blury|retina|cornea|specs|glasses)/i.test(text)) {
          replyText = `When it comes to eyesight, absolute laser precision is essential! Whether you need blade-free cataract procedure or advanced laser vision correction in **${userCity}**, our network ensures smooth recovery in minutes without injections or stitches.\n\n**Our doctors guide you to accredited eye hospitals with proven optical success rates at a cost tailored to your exact budget**. Give our team a quick call to review lens options and insurance!`;

          cardData = {
            procedure: "Blade-Free Laser Cataract & Vision Correction",
            category: "Advanced Ophthalmic Laser Suite",
            recoveryTime: "15-Minute Procedure (Same Day Vision)",
            estCost: "Matched to your budget or cashless insurance",
            cashless: true,
            hospitalsCount: 16,
            recommendedDoctor: "Senior Anterior Segment Specialist",
            doctorQualifications: "MS, DNB Ophthalmology (Fellow Refractive)",
            packageInclusions: ["Hospital selection by verified optical outcomes", "Choice of advanced monofocal & multifocal lenses", "100% Cashless cataract insurance approval", "Dedicated eye care admission coordinator"]
          };

          notesData = {
            symptomSummary: `Ophthalmic/Cataract inquiry from ${userCity}. Matched with blade-free daycare laser placement.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "Ophthalmic & Laser Vision Suite"
          };
        }
        // 👂 ENT (EAR, NOSE, THROAT)
        else if (/(ent|tonsil|sinus|septum|ear|nose|throat|deaf|thyroid|adenoidal|snoring|smell|polyps)/i.test(text)) {
          replyText = `Sinusitis, nasal breathing issues, and enlarged tonsils can be treated gently without external scars! Our empanelled ENT specialists in **${userCity}** utilize advanced endoscopic techniques that heal rapidly with minimal discomfort.\n\n**We review hospital success ratings across your locality to schedule your procedure with an experienced surgical lead within your budget range**. Call our doctors today for immediate assistance!`;

          cardData = {
            procedure: "Endoscopic Sinus & Minimally Invasive ENT Care",
            category: "Advanced ENT Surgical Suite",
            recoveryTime: "24-Hour Daycare Discharge",
            estCost: "Tailored to your insurance or affordable budget",
            cashless: true,
            hospitalsCount: 14,
            recommendedDoctor: "Senior Consultant Otorhinolaryngologist",
            doctorQualifications: "MS ENT, Endoscopic Airway Specialist",
            packageInclusions: ["Hospital matching by verified ENT success ratings", "Advanced tissue-sparing technology with fast recovery", "100% Paperless cashless hospital admission", "Dedicated regional hospital admission coordination"]
          };

          notesData = {
            symptomSummary: `ENT surgery query from ${userCity}. Recommended empanelled hospital placement.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "ENT & Endoscopic Airway Care"
          };
        }
        // 🩸 VASCULAR & COSMETIC CARE
        else if (/(vein|varicose|varicocele|spider|cosmetic|fat|lipo|lipoma|gynecomastia|breast|plastic|scar|cyst)/i.test(text)) {
          replyText = `For conditions like Varicose Veins, Lipoma, or aesthetic procedures in **${userCity}**, precision and rapid recovery are essential. We utilize advanced Endovenous Laser and micro-precision techniques, ensuring walk-home recovery with virtually zero scarring!\n\n**We schedule your consultation with accredited specialists boasting high patient satisfaction rates within your exact budget tier**. Call us right now for complete confidentiality and immediate guidance!`;

          cardData = {
            procedure: "Laser Varicose & Daycare Specialist Care",
            category: "Vascular & Specialist Surgical Suite",
            recoveryTime: "24 – 48 Hours Walk-Home Recovery",
            estCost: "Matched exactly to your budget or MediClaim",
            cashless: true,
            hospitalsCount: 15,
            recommendedDoctor: "Senior Vascular & Specialist Surgeon",
            doctorQualifications: "M.Ch Specialist Vascular Care Lead",
            packageInclusions: ["Hospital selection by high clinical satisfaction rates", "Advanced endovenous laser without large incisions", "Complete personal privacy and confidential record", "Dedicated hospital admission and pricing support"]
          };

          notesData = {
            symptomSummary: `Vascular/Specialist inquiry from ${userCity}. Aligned with laser daycare placement.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "Vascular & Specialist Surgery"
          };
        }
        // 🩹 GASTROENTEROLOGY & ABDOMINAL CARE
        else if (/(gastro|stomach|gallbladder|gallstone|appendix|appendicitis|reflux|acidity|ulcer|endoscopy|colonoscopy|biopsy)/i.test(text)) {
          const doc = getDoc(2);
          replyText = `Gallbladder stones and acute abdominal symptoms require swift, experienced evaluation! Our empanelled GI centers in **${userCity}** perform advanced keyhole procedures, allowing rapid hospital discharge and virtually zero scarring.\n\n**Why risk calling hospitals without verified outcomes? We instantly schedule your consultation with a center having the highest surgical recovery rates within your exact budget range**. Call our doctors now for priority placement!`;

          cardData = {
            procedure: "Laparoscopic Gallbladder & Abdominal Care",
            category: "Gastroenterology & GI Surgical Care",
            recoveryTime: "24 – 36 Hours Hospital Stay",
            estCost: "Matched to your budget or 100% Cashless",
            cashless: true,
            hospitalsCount: 18,
            recommendedDoctor: doc.name,
            doctorQualifications: "MS, M.Ch Surgical Gastroenterology",
            packageInclusions: ["Hospital selection by verified GI surgical success", "Precision minimally invasive camera instrumentation", "Express cashless MediClaim pre-authorization check", "Personal hospital admission coordinator"]
          };

          notesData = {
            symptomSummary: `Gastrointestinal inquiry from ${userCity}. Aligned with empanelled laparoscopic placement.`,
            urgencyTier: "Priority Clinical Guidance",
            specialityCategory: "Gastroenterology & GI Suite"
          };
        }
        // ─────────────────────────────────────────────────────────────
        // 🏥 STEP 3: SMART EMPANELLED AGGREGATOR FALLBACK
        // ─────────────────────────────────────────────────────────────
        else {
          replyText = `Thank you for connecting with us from **${userCity}**! No matter what symptom or treatment you are evaluating, HealthFlo ensures you receive gentle, USFDA gold-standard care without stress or billing surprises.\n\nBecause every patient's needs and budget are unique, **our HealthFlo team of doctors will evaluate your condition and schedule you with an empanelled hospital in ${userCity} according to your budget range**—with zero compromise on treatment quality! Call us or tap below—a quick phone conversation will answer everything!`;

          cardData = {
            procedure: "Personalized Hospital & Specialist Matching",
            category: "Empanelled High-Success Network",
            recoveryTime: "Same Day Medical Consultation",
            estCost: "Tailored to your budget or insurance plan",
            cashless: true,
            hospitalsCount: 25,
            recommendedDoctor: "Assigned HealthFlo Senior Doctor",
            doctorQualifications: "Surgical Success Rate & Care Specialist",
            packageInclusions: ["Empanelled hospital matching by success rate", "100% Paperless cashless insurance support", "Zero compromise on USFDA treatment quality", "Dedicated personalized admission coordination"]
          };

          notesData = {
            symptomSummary: `General consultation from ${userCity}. Guided toward empanelled hospital budget matching.`,
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

        {/* ── MODE 1: ASSISTANT MODE (CENTER ORB TO TOP BEACON DESIGN) ── */}
        {aiMode === "assistant" && (
          <div className="flex-1 w-full flex flex-col items-center justify-center relative overflow-y-auto sm:overflow-hidden scrollbar-none px-2 sm:px-4 py-4">
            
            {/* STATE 1: INITIAL / DEFAULT (ORB IN CENTER) */}
            {!latestAiMessage && !isThinking ? (
              <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto my-auto animate-[fadeIn_0.4s_ease-out]">
                
                {/* Center Stage Glowing AI Orb */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center select-none mb-6">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 via-teal-500/15 to-emerald-500/20 blur-3xl pointer-events-none animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/50 animate-[spin_30s_linear_infinite] pointer-events-none shadow-[0_0_30px_rgba(0,229,255,0.3)]" />
                  <div className="absolute -inset-5 rounded-full border border-emerald-400/30 animate-[spin_45s_linear_infinite_reverse] pointer-events-none" />
                  <div className="absolute -inset-10 rounded-full border border-slate-700/50 animate-[spin_60s_linear_infinite] pointer-events-none hidden sm:block" />

                  <div className="w-full h-full flex items-center justify-center transform scale-110 sm:scale-125 transition-transform duration-700 hover:scale-130">
                    <AiOrb preset={activePreset} className="w-full h-full filter drop-shadow-[0_0_40px_rgba(0,229,255,0.5)]" />
                  </div>
                </div>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 shadow-lg mb-4">
                  <Volume2 className="w-4 h-4 text-[#00E5FF] animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-cyan-300">Personal Clinical Companion • {userCity}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                  We Guide You to the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] via-teal-300 to-[#00A88F]">Highest Success Rate Hospital</span> in {userCity}.
                </h2>

                <p className="text-sm sm:text-base font-semibold text-slate-300 max-w-2xl leading-relaxed mb-8">
                  Never navigate hospital billing alone. Tell us your symptom or procedure—our HealthFlo team of doctors analyzes real hospital outcomes and schedules your consultation at an empanelled hospital that fits your exact budget range, with <strong className="text-white font-black">zero compromise on treatment quality</strong>!
                </p>

                {/* Quick Conversation Suggestions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-3xl text-left">
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
                      className="p-4 rounded-2xl bg-[#122240]/90 hover:bg-[#1B3058] text-xs sm:text-sm font-bold text-slate-200 border border-slate-700/80 shadow-md hover:border-cyan-400/60 transition-all flex items-center justify-between group"
                    >
                      <span className="line-clamp-2 pr-3">{sug}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>

              </div>
            ) : (
              /* STATE 2: ACTIVE CONVERSATION (ORB MOVES TO TOP CENTER) */
              <div className="w-full h-full max-w-[88rem] flex flex-col items-center justify-start py-2 animate-[fadeIn_0.35s_ease-out] overflow-y-auto">
                
                {/* Compact Top Header Orb */}
                <div className="flex flex-col items-center justify-center shrink-0 mb-6 transition-all duration-500">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center select-none">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 blur-xl pointer-events-none animate-pulse" />
                    <div className="absolute inset-2 rounded-full border border-dashed border-cyan-400/50 animate-[spin_20s_linear_infinite] pointer-events-none" />
                    <div className="w-full h-full flex items-center justify-center transform scale-110">
                      <AiOrb preset={activePreset} className="w-full h-full filter drop-shadow-[0_0_25px_rgba(0,229,255,0.4)]" />
                    </div>
                  </div>

                  {/* Live Speaking Status Badge */}
                  <div className="mt-3 px-4 py-1 rounded-full bg-slate-900/90 border border-slate-700 flex items-center gap-2 shadow-md">
                    {isThinking ? (
                      <>
                        <Radio className="w-3.5 h-3.5 text-[#00E5FF] animate-spin" />
                        <span className="text-[11px] font-black uppercase text-cyan-300 tracking-widest animate-pulse">Analyzing Empanelled Hospitals...</span>
                      </>
                    ) : isAiSpeaking ? (
                      <>
                        <div className="flex items-center gap-0.5">
                          <span className="w-1 h-3 bg-cyan-400 rounded-full animate-[pulse_0.4s_infinite]" />
                          <span className="w-1 h-5 bg-emerald-400 rounded-full animate-[pulse_0.6s_infinite_0.1s]" />
                          <span className="w-1 h-2 bg-cyan-400 rounded-full animate-[pulse_0.5s_infinite_0.2s]" />
                        </div>
                        <span className="text-[11px] font-black text-emerald-300 uppercase tracking-widest">HealthFlo Care Companion Speaking</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">Hospital Match Guidance Ready</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Response & Pathway Grid */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                  
                  {/* Left Column: Care Coordinator Guidance (NO TECH/DB NOTES) */}
                  <div className="lg:col-span-6 w-full flex flex-col items-start">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-950 text-slate-100 rounded-full shadow-lg border border-cyan-500/40 self-start mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-[pulse_0.6s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_10px_rgba(0,229,255,0.9)] shrink-0" />
                      <span className="text-[11px] font-black tracking-widest uppercase text-cyan-300">💬 Care Coordinator Guidance</span>
                    </div>

                    <div className="w-full p-6 sm:p-7 rounded-[2.5rem] bg-[#122240]/90 backdrop-blur-3xl border border-slate-600/70 shadow-[0_20px_60px_rgba(0,0,0,0.4)] space-y-5 text-left relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                      {isThinking ? (
                        <div className="py-12 space-y-3 text-center animate-pulse">
                          <Radio className="w-8 h-8 text-[#00E5FF] animate-spin mx-auto" />
                          <p className="text-sm font-black text-cyan-300 uppercase tracking-widest">Evaluating Hospital Success Rates in {userCity}...</p>
                          <p className="text-xs font-semibold text-slate-400 max-w-xs mx-auto">Matching your treatment requirements with verified senior surgeons within your budget range...</p>
                        </div>
                      ) : latestAiMessage ? (
                        <>
                          <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                            <span className="text-xs font-black text-cyan-300 flex items-center gap-1.5 uppercase tracking-wider">
                              <Stethoscope className="w-4 h-4 text-cyan-400" /> HealthFlo Clinical Desk
                            </span>
                            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-cyan-400" /> {userCity} Network
                            </span>
                          </div>

                          <p className="text-sm sm:text-base text-slate-100 font-semibold leading-relaxed whitespace-pre-wrap">
                            {latestAiMessage.text}
                          </p>

                          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/50 to-emerald-900/50 border border-emerald-500/30 flex items-start gap-3">
                            <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                            <div className="text-xs text-slate-200 space-y-1">
                              <strong className="text-white font-black uppercase tracking-wide block">Our Promise to You</strong>
                              <p className="font-medium leading-snug">
                                We schedule your procedure at empanelled hospitals according to your budget range. We never compromise on treatment quality or USFDA safety standards—we simply match hospital comfort tiers to protect your finances!
                              </p>
                            </div>
                          </div>
                        </>
                      ) : null}

                    </div>
                  </div>

                  {/* Right Column: Personalized HealthFlo Pathway Card */}
                  <div className="lg:col-span-6 w-full flex flex-col items-start lg:items-end">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-950 text-slate-100 rounded-full shadow-lg border border-emerald-500/40 self-start lg:self-end mb-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-[pulse_0.6s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-[0_0_10px_rgba(52,211,153,0.9)] shrink-0" />
                      <span className="text-[11px] font-black tracking-widest uppercase text-emerald-300">✨ Personalized HealthFlo Pathway</span>
                    </div>

                    <div className="w-full">
                      {isThinking ? (
                        <div className="p-8 rounded-[2.5rem] bg-[#122240]/90 border-2 border-emerald-500/40 shadow-2xl py-16 text-center space-y-3 animate-pulse">
                          <Activity className="w-10 h-10 text-emerald-400 animate-bounce mx-auto" />
                          <p className="text-sm font-black text-emerald-300 uppercase tracking-widest">Matching Budget & Insurance Tier...</p>
                          <p className="text-xs font-semibold text-slate-400">Selecting an empanelled hospital in {userCity} with verified surgical success.</p>
                        </div>
                      ) : latestAiMessage && latestAiMessage.treatmentCard ? (
                        <div className="p-6 sm:p-7 rounded-[2.5rem] bg-gradient-to-br from-[#122240] via-[#0E1C36] to-[#091528] text-white shadow-2xl border-2 border-emerald-500/50 space-y-5 text-left relative overflow-hidden animate-[scaleUp_0.35s_ease-out]">
                          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/80 pb-3.5">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-500/30 inline-flex items-center gap-1.5 shadow-sm">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Success-Rate Verified
                            </span>
                            <span className="text-xs text-cyan-300 font-black tracking-wide uppercase">{latestAiMessage.treatmentCard.category}</span>
                          </div>

                          <div>
                            <h4 className="text-xl sm:text-2xl font-black text-white leading-tight">{latestAiMessage.treatmentCard.procedure}</h4>
                            <div className="mt-3 p-3 rounded-2xl bg-[#0F1D35] border border-slate-700/70 flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-emerald-600/30 flex items-center justify-center shrink-0 font-black text-sm text-emerald-300">✓</div>
                              <div className="text-xs text-slate-300">
                                <strong className="text-white font-black block">Scheduled by HealthFlo Doctors</strong>
                                <span>Matched with accredited hospitals in <strong className="text-white">{userCity}</strong> that fit your budget range with zero compromise on quality.</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Recovery Protocol</span>
                              <span className="text-xs sm:text-sm font-black text-emerald-400 flex items-center gap-1.5 mt-1">
                                <Clock className="w-4 h-4 shrink-0" /> {latestAiMessage.treatmentCard.recoveryTime}
                              </span>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                              <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Budget Alignment</span>
                              <span className="text-xs sm:text-sm font-black text-[#00E5FF] block mt-1">
                                {latestAiMessage.treatmentCard.estCost}
                              </span>
                            </div>
                          </div>

                          {/* Package Inclusions Pills */}
                          {latestAiMessage.treatmentCard.packageInclusions && (
                            <div className="space-y-2">
                              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">HealthFlo Care Coordination:</span>
                              <div className="flex flex-wrap gap-2">
                                {latestAiMessage.treatmentCard.packageInclusions.map((inc, i) => (
                                  <span key={i} className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-950/80 text-emerald-200 border border-emerald-500/30">
                                    ✓ {inc}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="pt-2">
                            <p className="text-xs font-bold text-amber-300 mb-3 text-center flex items-center justify-center gap-1.5">
                              <span>💡 Connect with us now—our doctors coordinate your admission at zero extra cost!</span>
                            </p>
                            <a
                              href={WHATSAPP_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => haptic.medium()}
                              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all active:scale-95"
                            >
                              <Phone className="w-4 h-4 fill-current shrink-0 animate-bounce" />
                              <span>📞 Speak to HealthFlo Care Doctors Now</span>
                            </a>
                          </div>

                        </div>
                      ) : null}
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

        {/* ── MODE 2: CONVERSATION CHAT MODE (SCROLLABLE THREAD + QUICK SUGGESTIONS, NO TECH/DB NOTES) ──── */}
        {aiMode === "chat" && (
          <div className="flex-1 overflow-y-auto w-full px-2 sm:px-4 py-4 flex flex-col space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            
            {messages.length === 0 ? (
              <div className="my-auto flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4 animate-[fadeIn_0.4s_ease-out]">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 border border-cyan-400/40 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(0,229,255,0.2)]">
                  <HeartHandshake className="w-8 h-8 text-[#00E5FF]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Hospital Success & Budget Advisor</h2>
                <p className="text-sm sm:text-base font-semibold text-slate-300 max-w-xl mb-6 leading-relaxed">
                  We take the anxiety out of surgery in <strong>{userCity}</strong>. Tell us your medical symptoms and budget range, and our doctors will schedule your consultation at an empanelled hospital with the highest proven success rate!
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
                      className="p-4 rounded-2xl bg-[#122240]/90 hover:bg-[#1C3058] text-xs sm:text-sm font-bold text-slate-200 border border-slate-700/80 shadow-md hover:border-cyan-400/60 transition-all flex items-center justify-between group"
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
                          : "bg-[#122240]/95 text-slate-100 border border-slate-600/80 rounded-bl-none shadow-xl"
                      }`}>
                        {msg.sender === "ai" && (
                          <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-700/80 text-xs font-black text-cyan-400 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <HeartHandshake className="w-4 h-4 text-cyan-400" /> HealthFlo Clinical Desk
                            </span>
                            <span className="text-slate-400 font-bold lowercase text-[11px]">{msg.timestamp}</span>
                          </div>
                        )}
                        <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
                      </div>

                      {/* INTERACTIVE TREATMENT CARD IN CHAT THREAD (NO TECH NOTES OR CLINICAL EVALUATION EXPOSED) */}
                      {msg.treatmentCard && (
                        <div className="p-6 rounded-[2.2rem] bg-gradient-to-br from-[#122240] via-[#0E1D38] to-[#0A162B] text-white shadow-2xl border-2 border-emerald-500/50 space-y-5 animate-[scaleUp_0.3s_ease-out]">
                          
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-500/30 inline-flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Success-Rate Verified
                            </span>
                            <span className="text-xs text-cyan-300 font-bold">{msg.treatmentCard.category}</span>
                          </div>

                          <div>
                            <h4 className="text-xl sm:text-2xl font-black text-white">{msg.treatmentCard.procedure}</h4>
                            <p className="text-xs text-slate-300 font-medium mt-1">Scheduled by HealthFlo doctors across top accredited hospitals in <strong className="text-white font-black">{userCity}</strong> to match your exact budget & insurance tier.</p>
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
                    <span>HealthFlo doctors are analyzing proven hospital outcomes in {userCity} for your budget...</span>
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
