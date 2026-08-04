export interface SpecialityComparison {
  metric: string;
  healthflo: string;
  traditional: string;
}

export interface IntentHook {
  headline: string;
  subheadline: string;
  badge: string;
}

export interface SpecialityFAQ {
  question: string;
  answer: string;
}

export interface SpecialityData {
  id: string;
  title: string;
  shortTitle: string;
  category: "Piles, Fissure & Anal Care" | "Circumcision & Men's Health" | "Hernia, Veins & General Care";
  subtitle: string;
  description: string;
  usfdaProtocol: string;
  recoveryTime: string;
  procedureDuration: string;
  hospitalStay: string;
  anesthesia: string;
  benefits: string[];
  keywords: string[];
  comparison: SpecialityComparison[];
  intentHooks: {
    default: IntentHook;
    corporate?: IntentHook;
    intimacy?: IntentHook;
    rural?: IntentHook;
    second_opinion?: IntentHook;
  };
  faqs: SpecialityFAQ[];
}

export const specialitiesData: Record<string, SpecialityData> = {
  "circumcision": {
    id: "circumcision",
    title: "Painless Laser & ZSR Circumcision (No Stitches)",
    shortTitle: "Laser Circumcision",
    category: "Circumcision & Men's Health",
    subtitle: "Advanced 15-Minute Procedure for Tight Foreskin (Phimosis) & Better Hygiene",
    description: "Simple, 100% pain-free procedure performed to safely remove tight or problematic foreskin (phimosis, repeated infections, balanitis) without manual cutting or stitches. Using automated self-shedding ZSR staplers and gentle lasers, healing takes just a few days with same-day home discharge and total personal privacy.",
    usfdaProtocol: "Automated ZSR Stapler & Painless Laser Technique",
    recoveryTime: "24 to 48 Hours Quick Walk-Home Recovery",
    procedureDuration: "15 - 20 Minutes (Simple Daycare)",
    hospitalStay: "0 Nights (Go home comfortably in 2 hours)",
    anesthesia: "Painless Local Cream or Gentle Sleep Sedation",
    benefits: [
      "100% Bloodless procedure with zero manual stitches",
      "Solves tight foreskin (phimosis) and prevents repeated infections",
      "Complete Privacy Shield — confidential, unlabeled records",
      "Instant 100% Cashless health & corporate insurance support"
    ],
    keywords: [
      "male circumcision procedure",
      "phimosis tight foreskin treatment",
      "painless circumcision surgery near me",
      "laser circumcision cost in India",
      "ZSR stapler circumcision benefits",
      "adult male circumcision hygiene and recovery",
      "circumcision hospital Bangalore Hyderabad Chennai",
      "cashless circumcision insurance coverage India"
    ],
    comparison: [
      { metric: "How It Is Done", healthflo: "Automated ZSR Stapler & Gentle Laser (No scalpel cutting)", traditional: "Open knife cuts and scissors" },
      { metric: "Pain & Bleeding", healthflo: "Zero bleeding & completely painless recovery", traditional: "Bleeding and sharp stitch pain for days" },
      { metric: "Stitches / Wounds", healthflo: "No manual stitches (Self-healing soft silicon ring)", traditional: "10 to 15 rough thread stitches requiring removal" },
      { metric: "Hospital Stay", healthflo: "0 Nights (Walk out comfortably in 2 hours)", traditional: "1 to 2 days hospital room admission" },
      { metric: "Returning to Work", healthflo: "Next Day or weekend recovery", traditional: "2 to 3 weeks of awkward bed rest" }
    ],
    intentHooks: {
      default: {
        badge: "NABH Approved • 100% Cashless • Precision Laser Center",
        headline: "Painless Laser & ZSR Circumcision Without Stitches or Hospital Stay",
        subheadline: "Solve tight foreskin (phimosis) and intimacy discomfort in just 15 minutes. Enjoy zero pain, bloodless healing, and 100% confidential care."
      },
      intimacy: {
        badge: "Total Privacy Shield • Unlabeled Triage • Confidential Care",
        headline: "Discreet & Painless Circumcision for Complete Comfort & Hygiene",
        subheadline: "Designed for men seeking neat, stitch-free healing and improved intimate hygiene with fully confidential care coordinators."
      },
      corporate: {
        badge: "Weekend Quick Care • Direct Corporate Insurance Approval",
        headline: "Saturday 15-Minute Laser Circumcision — Comfortably at Your Desk on Monday",
        subheadline: "Zero-stay daycare surgery designed for busy IT professionals. We handle 100% cashless corporate group insurance documentation directly."
      },
      rural: {
        badge: "Free Round-Trip Dedicated Hospital AC Cab • Native Language Support",
        headline: "Advanced City Laser Circumcision Made Easy From Your Town",
        subheadline: "Avoid risky village hospital cuts. Travel free in our clean AC hospital cabs with friendly Telugu, Tamil, or Kannada care guides."
      },
      second_opinion: {
        badge: "Got an Open-Surgery Quote? Get a Guaranteed Laser Upgrade",
        headline: "Avoid Painful Stitches and Room Rent Limits from Older Hospitals",
        subheadline: "Upgrade your existing surgery advice to our painless, zero-stay laser care with instant 100% insurance approval."
      }
    },
    faqs: [
      { question: "Why is circumcision performed and what is Phimosis?", answer: "Beyond hygiene and personal preferences, circumcision is medically recommended for Phimosis (a tight foreskin that cannot pull back normally), repeated foreskin inflammation (balanitis), and to prevent recurring infections. Removing the tight foreskin restores everyday comfort and easy hygiene." },
      { question: "Is laser & ZSR circumcision really painless?", answer: "Yes! Using specialized local numbing creams or short sedative naps, you feel zero pain or discomfort during the short 15-minute procedure. Recovery is smooth without any sharp stitch pulling." },
      { question: "How fast is recovery and when can I return to normal routine?", answer: "You can walk out of the hospital within 2 hours of the procedure. Most men comfortably resume regular desktop work or driving the very next day, with complete skin healing within about one week." },
      { question: "Will my consultation and records remain completely private?", answer: "Absolutely. Under our HealthFlo Privacy Shield protocol, all consultations, WhatsApp messaging, and diagnosis files remain completely confidential and unlabeled for maximum personal dignity." },
      { question: "Is circumcision covered by my health insurance?", answer: "Yes, circumcision for medical conditions such as phimosis or recurrent penile infections is fully covered under 100% cashless health insurance and corporate medical policies." }
    ]
  },
  "laser-piles": {
    id: "laser-piles",
    title: "Painless Laser Treatment for Piles (Hemorrhoids)",
    shortTitle: "Laser Piles Care",
    category: "Piles, Fissure & Anal Care",
    subtitle: "Quick 20-Minute Laser Healing Without Scalpel Cutting or Stitches",
    description: "Advanced laser therapy that gently cures grade 1 to grade 4 piles (hemorrhoids) from the inside without cutting, surgical stitching, or painful wounds. Stops bleeding instantly, eliminates restroom pain, and allows you to walk home comfortably within 3 hours.",
    usfdaProtocol: "Internal Laser Hemorrhoid Shrinkage (LHP)",
    recoveryTime: "Next Day Normal Routine Resumption",
    procedureDuration: "15 - 20 Minutes (Simple Daycare)",
    hospitalStay: "0 Nights (Go home comfortably in 3 hours)",
    anesthesia: "Painless Sleep Sedation or Local Triage",
    benefits: [
      "No Surgical Cuts, No Stitches, and Zero Scars",
      "Protects delicate muscles (Zero risk of loss of control)",
      "Immediate permanent relief from bleeding & throbbing pain",
      "100% Cashless under all health & corporate insurance plans"
    ],
    keywords: [
      "painless laser piles surgery",
      "hemorrhoid laser treatment near me",
      "piles hospital Bangalore Hyderabad Chennai",
      "laser piles surgery cost in India",
      "cashless piles doctor appointment",
      "piles treatment without cuts or stitches"
    ],
    comparison: [
      { metric: "Surgical Method", healthflo: "Gentle internal laser shrinking (No cutting)", traditional: "Open surgery cuts with scalpel & cautery wounds" },
      { metric: "Restroom Comfort", healthflo: "Smooth, comfortable visits after surgery", traditional: "Severe burning and excruciating pain for days" },
      { metric: "Muscle Protection", healthflo: "100% Safe (Protected laser guidance)", traditional: "Risk of muscle damage and bowel control issues" },
      { metric: "Hospital Admission", healthflo: "3 hours daycare — recover in your own bed", traditional: "2 to 3 days bed rest hospital admission" },
      { metric: "Daily Dressing", healthflo: "Zero wound dressings or gauze packing needed", traditional: "Painful daily wound dressing changes" }
    ],
    intentHooks: {
      default: {
        badge: "NABH Certified • Precision Laser Hub • 100% Cashless",
        headline: "Painless Laser Piles Treatment Without Cutting, Stitches, or Scars",
        subheadline: "End bleeding and restroom pain permanently in just 20 minutes with gentle laser care. Zero hospital room rent limits."
      },
      corporate: {
        badge: "Desk Professional Express Care • Direct Insurance Approval",
        headline: "End Sitting Discomfort Permanently — 20-Minute Weekend Laser Care",
        subheadline: "Tailored for office professionals. Undergo quick laser piles care on Saturday and comfortably return to your desk on Monday."
      },
      rural: {
        badge: "Free Round-Trip Dedicated Hospital AC Cab • Native Language Guides",
        headline: "Advanced City Laser Piles Surgery Made Easy From Your Town",
        subheadline: "Do not suffer agonizing older village hospital surgeries. Our free AC cab team coordinates your completely painless, cashless journey."
      }
    },
    faqs: [
      { question: "How does laser piles treatment work without cutting?", answer: "Instead of cutting tissue away with a scalpel, a tiny laser fiber delivers gentle light energy inside the hemorrhoid cushion. This cleanly shrinks the pile from within and stops bleeding instantly without leaving an open wound." },
      { question: "Will piles come back after laser treatment?", answer: "Our laser therapy targets and seals the underlying blood vessels at the root of the hemorrhoid, leading to permanent healing and an industry-leading near-zero recurrence rate." },
      { question: "When can I sit normally and walk after laser piles surgery?", answer: "Because there are no external cuts or stitches, patients walk out of the hospital comfortably within 3 hours and resume normal sitting and everyday walking the very next day." }
    ]
  },
  "fistula": {
    id: "fistula",
    title: "Advanced Laser Treatment for Anal Fistula",
    shortTitle: "Laser Fistula Care",
    category: "Piles, Fissure & Anal Care",
    subtitle: "Safe Laser Tract Healing Without Surgery Cuts or Muscle Damage",
    description: "Specialized gentle laser therapy that seals anal fistula tracts permanently from the inside. Protects 100% of your sphincter muscle control (zero risk of incontinence) with no open surgical wounds, no daily painful dressings, and quick 3-day recovery.",
    usfdaProtocol: "360-Degree Radial Laser Tract Closure",
    recoveryTime: "2 to 3 Days Normal Routine",
    procedureDuration: "20 - 30 Minutes (Simple Daycare)",
    hospitalStay: "0 Nights (Same-Day Home Recovery)",
    anesthesia: "Painless Sleep Sedation",
    benefits: [
      "100% Protection of anal muscle & bowel control",
      "High cure rate even in difficult or repeating cases",
      "No large open surgical cuts or slow-healing wound cavities",
      "Complete 100% Cashless insurance clearing"
    ],
    keywords: [
      "laser fistula treatment near me",
      "anal fistula surgery cost Bangalore Hyderabad Chennai",
      "fistula without surgery cuts",
      "painless fistula treatment India",
      "perianal fistula laser cure"
    ],
    comparison: [
      { metric: "Muscle Safety", healthflo: "100% Safe (Laser seals tunnel gently from inside)", traditional: "High risk of muscle cuts leading to control issues" },
      { metric: "Open Wound Size", healthflo: "No surgical cuts or open wounds", traditional: "Large open cavity requiring weeks to heal" },
      { metric: "Daily Life Return", healthflo: "2 to 3 days return to regular routine", traditional: "4 to 8 weeks of daily painful wound dressings" }
    ],
    intentHooks: {
      default: {
        badge: "Specialized Laser Center • 100% Cashless Approval • Safe Healing",
        headline: "Advanced Laser Anal Fistula Care That Protects Muscle Control",
        subheadline: "Stop repeated infection and discomfort without open surgery cuts. Experience same-day discharge with 100% muscle protection."
      }
    },
    faqs: [
      { question: "Why is traditional open surgery risky for anal fistula?", answer: "Older open surgery involves cutting through delicate sphincter muscles to clear the fistula tunnel, which can risk bowel control issues. Our laser technique gently seals the tract from inside without cutting any muscle fibers." },
      { question: "How soon will the infection and discharge stop?", answer: "The laser permanently seals the inner pathway during the 20-minute treatment, terminating repeated infection and allowing smooth natural tissue healing over the following days." }
    ]
  },
  "fissure": {
    id: "fissure",
    title: "Painless Laser Relief for Anal Fissure & Spasm",
    shortTitle: "Laser Fissure Care",
    category: "Piles, Fissure & Anal Care",
    subtitle: "Instant Relief from Sharp Restroom Burning and Chronic Bleeding Tears",
    description: "Quick 15-minute laser therapy that instantly releases painful anal muscle spasms and cures chronic fissures without surgical cuts. Experience dramatic pain relief from your very first restroom visit after surgery.",
    usfdaProtocol: "Precision Laser Sphincter Relaxation",
    recoveryTime: "Immediate Pain Relief & Next Day Routine",
    procedureDuration: "10 - 15 Minutes (Simple Daycare)",
    hospitalStay: "0 Nights (Walk out comfortably in 2 hours)",
    anesthesia: "Painless Local Cream or Gentle Sleep",
    benefits: [
      "Instant stop to sharp burning during restroom visits",
      "Simultaneous gentle removal of associated skin tags",
      "Zero cuts, stitches, or open wounds",
      "Same-day walk-home medical comfort"
    ],
    keywords: [
      "anal fissure pain relief treatment",
      "laser fissure surgery cost Chennai Bangalore Hyderabad",
      "chronic anal tear cure without cuts",
      "painless fissure treatment India"
    ],
    comparison: [
      { metric: "Pain Relief", healthflo: "Immediate comfort right after treatment", traditional: "Ongoing wound burning for days after surgery" },
      { metric: "Skin Tag Removal", healthflo: "Gentle laser touch-up (No stitches)", traditional: "Surgical clipping with thread stitches" }
    ],
    intentHooks: {
      default: {
        badge: "15-Minute Express Relief • 100% Cashless • Daycare Care",
        headline: "Instant Laser Relief from Sharp Anal Fissure Burning & Spasm",
        subheadline: "Heal painful anal tears permanently in just 15 minutes without cuts or hospital night stays. Walk home pain-free today."
      }
    },
    faqs: [
      { question: "How fast does the sharp burning pain go away?", answer: "Most patients experience dramatic, immediate pain relief immediately after the short procedure, as the laser gently releases the tight muscle spasm causing the agony." }
    ]
  },
  "hernia": {
    id: "hernia",
    title: "Keyhole 3D Mesh Treatment for Hernia",
    shortTitle: "Keyhole Hernia Care",
    category: "Hernia, Veins & General Care",
    subtitle: "Advanced Laparoscopic Repair Without Large Abdominal Cuts or Scars",
    description: "Safe keyhole surgery for inguinal, umbilical, and abdominal hernias using lightweight 3D reinforcing mesh. Requires only tiny pinhole spots with no large scars, minimal discomfort, and quick return to your daily routine.",
    usfdaProtocol: "Laparoscopic Keyhole 3D Mesh Reinforcement",
    recoveryTime: "2 to 3 Days Comfortable Walking & Routine",
    procedureDuration: "30 - 45 Minutes",
    hospitalStay: "Daycare or 1-Night Simple Observation",
    anesthesia: "Safe Spinal or Sleep Anesthesia",
    benefits: [
      "Tiny pinhole camera care (No large surgery scars)",
      "Strong 3D supportive mesh prevents hernia relapse",
      "10x less discomfort than older open surgical methods",
      "100% Cashless support across all health insurance policies"
    ],
    keywords: [
      "laparoscopic hernia repair surgery",
      "keyhole hernia cost Bangalore Chennai Hyderabad",
      "inguinal umbilical hernia treatment without scars",
      "3D mesh hernia surgery India"
    ],
    comparison: [
      { metric: "Surgery Mark", healthflo: "Three tiny pinhole camera spots", traditional: "Large 4 to 6 inch abdominal cut & stitches" },
      { metric: "Future Protection", healthflo: "Strong supportive interior 3D mesh", traditional: "Stitched tissues under pulling tension" }
    ],
    intentHooks: {
      default: {
        badge: "Keyhole Precision Surgery • 100% Cashless • Supportive 3D Mesh",
        headline: "Keyhole Hernia Treatment Without Large Surgery Scars",
        subheadline: "Restore abdominal comfort safely with keyhole 3D mesh reinforcement and quick daycare healing protocols."
      }
    },
    faqs: [
      { question: "Why is keyhole mesh surgery better than open cuts?", answer: "Keyhole (laparoscopic) treatment reinforces the weak muscle opening from the inside using a supportive mesh without cutting through large muscle layers. This means much less pain and far quicker healing." }
    ]
  },
  "lipoma-varicose": {
    id: "lipoma-varicose",
    title: "Laser Varicose Veins Treatment & Lipoma Removal",
    shortTitle: "Varicose & Lipoma Care",
    category: "Hernia, Veins & General Care",
    subtitle: "Non-Surgical Laser Vein Healing & Scar-Free Swelling Removal",
    description: "Gentle internal laser treatment (EVLT) to relieve painful, throbbing varicose leg veins without open vein surgery or scarring. Also includes painless micro-removal of fatty skin swellings (lipomas and cysts) with zero visible stitch marks.",
    usfdaProtocol: "Internal Laser Vein Care (EVLT) & Micro-Excision",
    recoveryTime: "Same-Day Immediate Walk-Home",
    procedureDuration: "20 - 40 Minutes (Simple Daycare)",
    hospitalStay: "0 Nights (Go home immediately after care)",
    anesthesia: "Painless Local Numbing or Brief Sedation",
    benefits: [
      "No painful surgical vein stripping or leg cuts",
      "Painless micro-removal of lipomas without ugly stitch scars",
      "Restores smooth, comfortable blood circulation in legs",
      "Fully covered under cashless health insurance schemes"
    ],
    keywords: [
      "laser varicose vein surgery near me",
      "painless lipoma swelling removal Bangalore Chennai Hyderabad",
      "laser treatment for leg vein pain",
      "cyst removal without scar marks India"
    ],
    comparison: [
      { metric: "Treatment Technique", healthflo: "Gentle internal light fiber sealing (EVLT)", traditional: "Painful groin incisions and physical pulling of veins" },
      { metric: "Skin Appearance", healthflo: "Clean skin healing without stitch scars", traditional: "Visible thread stitches and surgery marks" }
    ],
    intentHooks: {
      default: {
        badge: "Advanced Laser Vein Center • Scar-Free Precision • 100% Cashless",
        headline: "Laser Varicose Vein & Lipoma Care Without Surgery Scars",
        subheadline: "Relieve throbbing leg veins and swelling in just 30 minutes with gentle medical laser fibers. Walk home the same day."
      }
    },
    faqs: [
      { question: "Is laser treatment for varicose veins permanent?", answer: "Yes! Once the damaged, dilated vein is gently sealed shut by the medical laser, healthy normal veins instantly take over smooth blood circulation while the treated vein naturally dissolves over time." }
    ]
  }
};
