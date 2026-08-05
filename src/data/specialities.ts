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
    title: "Advanced Laser & ZSR Circumcision (No Stitches)",
    shortTitle: "Laser Circumcision",
    category: "Circumcision & Men's Health",
    subtitle: "Advanced 15-Minute Procedure for Tight Foreskin (Phimosis) & Better Hygiene",
    description: "Simple, minimally invasive procedure performed to safely remove tight or problematic foreskin (phimosis, repeated infections, balanitis) without manual cutting or stitches. Choose from empanelled hospital tiers based on your room budget needs with zero compromise on USFDA surgical safety and precision.",
    usfdaProtocol: "Automated ZSR Stapler & Precision Laser Technique",
    recoveryTime: "24 to 48 Hours Quick Walk-Home Recovery",
    procedureDuration: "15 - 20 Minutes (Simple Daycare)",
    hospitalStay: "0 Nights (Go home comfortably in 2 hours)",
    anesthesia: "Advanced Local Numbing or Gentle Sleep Sedation",
    benefits: [
      "100% Bloodless procedure with zero manual stitches",
      "Choose empanelled hospital tiers to fit your budget with zero surgical compromise",
      "Complete Privacy Shield — confidential, unlabeled records",
      "100% Cashless insurance processing & 0% EMI financial assistance"
    ],
    keywords: [
      "male circumcision procedure Tiruchirappalli Trichy",
      "phimosis tight foreskin treatment Thillai Nagar Srirangam",
      "minimally invasive circumcision surgery near me",
      "laser circumcision cost in India Chennai Hyderabad Bangalore",
      "ZSR stapler circumcision benefits Central Tamil Nadu",
      "adult male circumcision hygiene and recovery",
      "circumcision empanelled hospital budget tier choice",
      "cashless circumcision insurance coverage India"
    ],
    comparison: [
      { metric: "How It Is Done", healthflo: "Automated ZSR Stapler & Gentle Laser (No scalpel cutting)", traditional: "Open knife cuts and scissors" },
      { metric: "Pain & Bleeding", healthflo: "Zero bleeding & advanced comfort recovery", traditional: "Bleeding and sharp stitch pain for days" },
      { metric: "Stitches / Wounds", healthflo: "No manual stitches (Self-healing soft silicon ring)", traditional: "10 to 15 rough thread stitches requiring removal" },
      { metric: "Hospital Stay", healthflo: "0 Nights (Walk out comfortably in 2 hours)", traditional: "1 to 2 days hospital room admission" },
      { metric: "Returning to Work", healthflo: "Next Day or weekend recovery", traditional: "2 to 3 weeks of awkward bed rest" }
    ],
    intentHooks: {
      default: {
        badge: "Empanelled Network • Choose Your Hospital Tier • 100% Cashless",
        headline: "Advanced Laser & ZSR Circumcision Without Stitches or Hospital Stay",
        subheadline: "Solve tight foreskin and intimate discomfort in just 15 minutes. Choose empanelled hospital room tiers based on your budget with zero compromise on surgical safety."
      },
      intimacy: {
        badge: "Total Privacy Shield • Unlabeled Triage • Confidential Care",
        headline: "Discreet & Minimally Invasive Circumcision for Complete Comfort & Hygiene",
        subheadline: "Designed for men seeking neat, stitch-free healing and improved intimate hygiene with fully confidential care coordinators."
      },
      corporate: {
        badge: "Weekend Quick Care • Direct Corporate Insurance Approval",
        headline: "Saturday 15-Minute Laser Circumcision — Comfortably at Your Desk on Monday",
        subheadline: "Zero-stay daycare surgery designed for professional schedules. We handle 100% cashless corporate insurance and 0% EMI documentation directly."
      },
      rural: {
        badge: "Dedicated Hospital Admission Guidance • Native Tamil Support",
        headline: "Advanced Laser Circumcision Made Easy From Trichy & Delta Towns",
        subheadline: "Avoid older hospital cuts. Direct admission scheduling and care coordination from Trichy Junction, Thillai Nagar, Srirangam and surrounding towns."
      },
      second_opinion: {
        badge: "Got an Open-Surgery Quote? Choose Your Budget Tier With Us",
        headline: "Avoid Painful Stitches and Unrestricted Hospital Billing",
        subheadline: "Upgrade your existing surgical advice to our precision laser care. Choose an empanelled hospital tier that aligns with your exact budget with zero surgical compromise."
      }
    },
    faqs: [
      { question: "How does empanelled hospital tier selection and budget matching work?", answer: "HealthFlo connects you with accredited empanelled laser surgical centers. You can freely choose your hospital room tier (Economy, Standard, or Executive) based on your personal budget or health insurance limits. There is ZERO compromise on the medical or surgical quality across tiers—price differences reflect room comfort and non-clinical amenities only, never the gold-standard surgical care or specialist expertise. We handle complete insurance processing and financial support." },
      { question: "Why is circumcision performed and what is Phimosis?", answer: "Beyond hygiene and personal preferences, circumcision is medically recommended for Phimosis (a tight foreskin that cannot pull back normally), repeated foreskin inflammation (balanitis), and to prevent recurring infections. Removing the tight foreskin restores everyday comfort and easy hygiene." },
      { question: "Is laser & ZSR circumcision comfortable and safe?", answer: "Yes! Using specialized local numbing creams or short sedative naps, patients experience advanced comfort with minimal to zero discomfort during the short 15-minute procedure. Recovery is smooth without any sharp stitch pulling." },
      { question: "How fast is recovery and when can I return to normal routine?", answer: "You can walk out of the hospital within 2 hours of the procedure. Most men comfortably resume regular desktop work or driving the very next day, with complete skin healing within about one week." },
      { question: "Will my consultation and records remain completely private?", answer: "Absolutely. Under our HealthFlo Privacy Shield protocol, all consultations, WhatsApp messaging, and diagnosis files remain completely confidential and unlabeled for maximum personal dignity." }
    ]
  },
  "laser-piles": {
    id: "laser-piles",
    title: "Advanced Laser Treatment for Piles (Hemorrhoids)",
    shortTitle: "Laser Piles Care",
    category: "Piles, Fissure & Anal Care",
    subtitle: "Quick 20-Minute Laser Healing Without Scalpel Cutting or Stitches",
    description: "Advanced laser therapy that gently cures grade 1 to grade 4 piles (hemorrhoids) from the inside without cutting or surgical stitches. Choose from verified empanelled hospital tiers based on your budget with zero compromise on USFDA surgical precision and 100% insurance processing support.",
    usfdaProtocol: "Internal Laser Hemorrhoid Shrinkage (LHP)",
    recoveryTime: "Next Day Normal Routine Resumption",
    procedureDuration: "15 - 20 Minutes (Simple Daycare)",
    hospitalStay: "0 Nights (Go home comfortably in 3 hours)",
    anesthesia: "Gentle Sleep Sedation or Local Triage",
    benefits: [
      "No Surgical Cuts, No Stitches, and Zero Scars",
      "Choose empanelled hospital tiers based on your budget with zero surgical compromise",
      "Protects delicate anal muscles (Zero risk of loss of bowel control)",
      "Complete cashless insurance processing & 0% EMI financial assistance"
    ],
    keywords: [
      "minimally invasive laser piles surgery Tiruchirappalli Trichy",
      "hemorrhoid laser treatment Thillai Nagar Srirangam Cantonment",
      "piles hospital Bangalore Hyderabad Chennai Coimbatore Trichy",
      "laser piles surgery cost in Central Tamil Nadu India",
      "cashless piles doctor appointment empanelled tier",
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
        badge: "Empanelled Network • Choose Your Hospital Tier • 100% Cashless",
        headline: "Advanced Laser Piles Treatment Without Cutting, Stitches, or Scars",
        subheadline: "End bleeding and restroom discomfort effectively in 20 minutes. Choose your hospital room tier to match your exact budget with zero compromise on USFDA surgical safety."
      },
      intimacy: {
        badge: "Complete Dignity & Privacy • Unlabeled Medical Records",
        headline: "Confidential Laser Proctology Without Embarrassment",
        subheadline: "Experience compassionate, private consultation and same-day laser healing with dedicated, confidential care coordinators."
      },
      corporate: {
        badge: "Desk Professional Express Care • Direct Insurance Approval",
        headline: "End Sitting Discomfort Permanently — 20-Minute Weekend Laser Care",
        subheadline: "Tailored for office and desk professionals. Undergo quick laser piles care on Saturday and comfortably return to your regular duties on Monday."
      },
      rural: {
        badge: "Dedicated Hospital Admission Guidance • Native Tamil Support",
        headline: "Advanced City Laser Piles Surgery Made Easy From Trichy & Surrounding Towns",
        subheadline: "Do not suffer agonizing traditional open hospital surgeries. Our team provides direct admission coordination across Trichy, Thillai Nagar & Delta districts."
      },
      second_opinion: {
        badge: "Holding an Overpriced Hospital Quote? Match Your Budget With Us",
        headline: "Don't Overpay for Open Scalpel Surgery and Unwanted Hospital Stay",
        subheadline: "We audit empanelled surgical centers to match your budget and insurance policy limits. Zero surgical compromise—pay only for the room tier you need."
      }
    },
    faqs: [
      { question: "How does empanelled hospital tier selection and budget matching work?", answer: "HealthFlo connects you with accredited empanelled laser surgical centers. You can freely choose your hospital room tier (Economy, Standard, or Executive) based on your personal budget or health insurance limits. There is ZERO compromise on the medical or surgical quality across tiers—price differences reflect room comfort and non-clinical amenities only, never the gold-standard surgical care or specialist expertise. We handle complete insurance processing and financial support." },
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
    description: "Specialized gentle laser therapy that seals anal fistula tracts permanently from the inside. Choose from empanelled hospital tiers based on your budget with zero compromise on USFDA surgical safety, 100% muscle protection, and complete insurance processing support.",
    usfdaProtocol: "360-Degree Radial Laser Tract Closure",
    recoveryTime: "2 to 3 Days Normal Routine",
    procedureDuration: "20 - 30 Minutes (Simple Daycare)",
    hospitalStay: "0 Nights (Same-Day Home Recovery)",
    anesthesia: "Gentle Sleep Sedation",
    benefits: [
      "100% Protection of anal sphincter muscle & bowel control",
      "Choose empanelled hospital tiers based on budget with zero surgical compromise",
      "High cure rate without open surgical cuts or slow-healing wound cavities",
      "Complete 100% cashless insurance clearing & 0% EMI financial assistance"
    ],
    keywords: [
      "laser fistula treatment near me Tiruchirappalli Trichy",
      "anal fistula surgery cost Thillai Nagar Srirangam Bangalore Chennai",
      "fistula without surgery cuts Central Tamil Nadu",
      "minimally invasive fistula empanelled hospital tier choice",
      "perianal fistula laser cure India"
    ],
    comparison: [
      { metric: "Muscle Safety", healthflo: "100% Safe (Laser seals tunnel gently from inside)", traditional: "High risk of muscle cuts leading to control issues" },
      { metric: "Open Wound Size", healthflo: "No surgical cuts or open wounds", traditional: "Large open cavity requiring weeks to heal" },
      { metric: "Daily Life Return", healthflo: "2 to 3 days return to regular routine", traditional: "4 to 8 weeks of daily painful wound dressings" }
    ],
    intentHooks: {
      default: {
        badge: "Empanelled Network • Choose Your Hospital Tier • 100% Cashless",
        headline: "Advanced Laser Anal Fistula Care That Protects Muscle Control",
        subheadline: "Stop repeated infection without open surgery cuts. Choose your hospital room tier to fit your exact budget with zero compromise on USFDA surgical safety."
      },
      intimacy: {
        badge: "Total Privacy Shield • Discreet Triage • Confidential Care",
        headline: "Discreet Laser Fistula Sealing With Complete Personal Dignity",
        subheadline: "Heal complex anal tracts without open wounds or embarrassing daily dressings. Fully private consultations and unlabeled hospital documentation."
      },
      corporate: {
        badge: "Desk Professional Protocol • Direct Corporate Insurance Approval",
        headline: "Permanent Laser Fistula Sealing — Return to Work Without Open Wounds",
        subheadline: "Skip the weeks of painful gauze dressings required by traditional surgery. Enjoy quick weekend laser sealing with complete cashless insurance handling."
      },
      rural: {
        badge: "Dedicated Hospital Admission Guidance • Native Tamil Support",
        headline: "Expert Laser Fistula Surgery Made Accessible From Trichy & Surrounding Towns",
        subheadline: "Do not risk bowel control loss from open village surgeries. Receive direct medical guidance from Trichy Junction, Thillai Nagar or Delta districts."
      },
      second_opinion: {
        badge: "Received an Open Fistula Quote? Protect Your Muscle Control",
        headline: "Avoid Risky Open Muscle Cutting & Choose Your Budget Tier",
        subheadline: "We match you with verified laser specialists at comparable or better pricing. Choose your hospital room tier to align with your health insurance with zero surgical compromise."
      }
    },
    faqs: [
      { question: "How does empanelled hospital tier selection and budget matching work?", answer: "HealthFlo connects you with accredited empanelled laser surgical centers. You can freely choose your hospital room tier (Economy, Standard, or Executive) based on your personal budget or health insurance limits. There is ZERO compromise on the medical or surgical quality across tiers—price differences reflect room comfort and non-clinical amenities only, never the gold-standard surgical care or specialist expertise. We handle complete insurance processing and financial support." },
      { question: "Why is traditional open surgery risky for anal fistula?", answer: "Older open surgery involves cutting through delicate sphincter muscles to clear the fistula tunnel, which can risk bowel control issues. Our laser technique gently seals the tract from inside without cutting any muscle fibers." },
      { question: "How soon will the infection and discharge stop?", answer: "The laser permanently seals the inner pathway during the 20-minute treatment, terminating repeated infection and allowing smooth natural tissue healing over the following days." }
    ]
  },
  "fissure": {
    id: "fissure",
    title: "Advanced Laser Relief for Anal Fissure & Spasm",
    shortTitle: "Laser Fissure Care",
    category: "Piles, Fissure & Anal Care",
    subtitle: "Instant Relief from Sharp Restroom Burning and Chronic Bleeding Tears",
    description: "Quick 15-minute laser therapy that instantly releases painful anal muscle spasms and cures chronic fissures without surgical cuts. Choose empanelled hospital tiers based on your room budget needs with zero surgical compromise and full insurance processing support.",
    usfdaProtocol: "Precision Laser Sphincter Relaxation",
    recoveryTime: "Immediate Comfort & Next Day Routine",
    procedureDuration: "10 - 15 Minutes (Simple Daycare)",
    hospitalStay: "0 Nights (Walk out comfortably in 2 hours)",
    anesthesia: "Advanced Local Numbing or Gentle Sleep",
    benefits: [
      "Fast relief from sharp burning sensations during restroom visits",
      "Choose empanelled hospital tiers based on budget with zero surgical compromise",
      "Simultaneous gentle removal of associated skin tags without stitches",
      "100% Cashless insurance processing & 0% EMI financial assistance"
    ],
    keywords: [
      "anal fissure pain relief treatment Tiruchirappalli Trichy",
      "laser fissure surgery cost Thillai Nagar Srirangam Chennai Bangalore",
      "chronic anal tear cure without cuts Central Tamil Nadu",
      "minimally invasive fissure empanelled hospital budget tiers India"
    ],
    comparison: [
      { metric: "Pain Relief", healthflo: "Immediate comfort right after treatment", traditional: "Ongoing wound burning for days after surgery" },
      { metric: "Skin Tag Removal", healthflo: "Gentle laser touch-up (No stitches)", traditional: "Surgical clipping with thread stitches" }
    ],
    intentHooks: {
      default: {
        badge: "Empanelled Network • Choose Your Hospital Tier • 100% Cashless",
        headline: "Instant Laser Relief from Sharp Anal Fissure Burning & Spasm",
        subheadline: "Heal painful anal tears permanently in 15 minutes. Choose your hospital room tier to fit your exact budget with zero compromise on USFDA surgical safety."
      },
      intimacy: {
        badge: "Complete Privacy Shield • Unlabeled Triage • Confidential Care",
        headline: "Discreet Laser Relief for Severe Intimate Anal Burning",
        subheadline: "Experience instant pain relief and gentle skin tag removal in complete confidence with private care coordinators and unmarked billing."
      },
      corporate: {
        badge: "Desk Professional Protocol • Direct Insurance Approval",
        headline: "End Restroom Agony & Sitting Pain — 15-Minute Weekend Care",
        subheadline: "Return to comfortable office desk working instantly after quick 15-minute daycare laser therapy with full corporate cashless processing."
      },
      rural: {
        badge: "Dedicated Hospital Admission Guidance • Native Tamil Support",
        headline: "Instant City Laser Fissure Relief Accessible From Trichy & Surrounding Towns",
        subheadline: "Direct admission coordination from Trichy Junction, Thillai Nagar, Srirangam or surrounding towns with same-day walk-home healing."
      },
      second_opinion: {
        badge: "Holding an Open Surgery Quote? Match Your Budget With Us",
        headline: "Don't Undergo Painful Surgical Cutting for Anal Fissures",
        subheadline: "Upgrade to gentle 15-minute laser muscle relaxation. Choose an empanelled hospital tier that matches your budget with zero surgical compromise."
      }
    },
    faqs: [
      { question: "How does empanelled hospital tier selection and budget matching work?", answer: "HealthFlo connects you with accredited empanelled laser surgical centers. You can freely choose your hospital room tier (Economy, Standard, or Executive) based on your personal budget or health insurance limits. There is ZERO compromise on the medical or surgical quality across tiers—price differences reflect room comfort and non-clinical amenities only, never the gold-standard surgical care or specialist expertise. We handle complete insurance processing and financial support." },
      { question: "How fast does the sharp burning pain go away?", answer: "Most patients experience dramatic, immediate pain relief immediately after the short procedure, as the laser gently releases the tight muscle spasm causing the agony." }
    ]
  },
  "hernia": {
    id: "hernia",
    title: "Keyhole 3D Mesh Treatment for Hernia",
    shortTitle: "Keyhole Hernia Care",
    category: "Hernia, Veins & General Care",
    subtitle: "Advanced Laparoscopic Repair Without Large Abdominal Cuts or Scars",
    description: "Safe keyhole surgery for inguinal, umbilical, and abdominal hernias using lightweight 3D reinforcing mesh. Choose from verified empanelled hospital tiers based on your budget with zero compromise on surgical precision and complete insurance processing support.",
    usfdaProtocol: "Laparoscopic Keyhole 3D Mesh Reinforcement",
    recoveryTime: "2 to 3 Days Comfortable Walking & Routine",
    procedureDuration: "30 - 45 Minutes",
    hospitalStay: "Daycare or 1-Night Simple Observation",
    anesthesia: "Safe Spinal or Sleep Anesthesia",
    benefits: [
      "Tiny pinhole camera care (No large surgery scars or abdominal cuts)",
      "Choose empanelled hospital tiers based on budget with zero surgical compromise",
      "Strong 3D supportive internal mesh prevents hernia relapse",
      "100% Cashless insurance clearing & 0% EMI financial assistance"
    ],
    keywords: [
      "laparoscopic hernia repair surgery Tiruchirappalli Trichy",
      "keyhole hernia cost Thillai Nagar Srirangam Cantonment Bangalore Chennai",
      "inguinal umbilical hernia treatment without scars Central Tamil Nadu",
      "3D mesh hernia empanelled hospital tier budget India"
    ],
    comparison: [
      { metric: "Surgery Mark", healthflo: "Three tiny pinhole camera spots", traditional: "Large 4 to 6 inch abdominal cut & stitches" },
      { metric: "Future Protection", healthflo: "Strong supportive interior 3D mesh", traditional: "Stitched tissues under pulling tension" }
    ],
    intentHooks: {
      default: {
        badge: "Empanelled Network • Choose Your Hospital Tier • 100% Cashless",
        headline: "Keyhole Hernia Treatment Without Large Surgery Scars",
        subheadline: "Restore abdominal comfort safely with keyhole 3D mesh reinforcement. Choose your hospital room tier to fit your exact budget with zero surgical compromise."
      },
      intimacy: {
        badge: "Dignity Protected • Unlabeled Documentation",
        headline: "Discreet Keyhole Hernia Repair With Tiny Pinhole Healing",
        subheadline: "Avoid large abdominal surgery scars. Experience clean, discrete healing with dedicated personal care coordinators and confidential billing."
      },
      corporate: {
        badge: "Executive Recovery Protocol • Direct Corporate Insurance Approval",
        headline: "Fast-Track Keyhole 3D Mesh Hernia Repair For Active Professionals",
        subheadline: "Return to your routine in just 48 hours without extended hospital leaves. We handle 100% cashless corporate group insurance clearing directly."
      },
      rural: {
        badge: "Dedicated Hospital Admission Guidance • Native Tamil Support",
        headline: "Advanced Keyhole Hernia Surgery Accessible From Trichy & Delta Towns",
        subheadline: "Direct admission support and surgical scheduling from Trichy Junction, Thillai Nagar, Srirangam and surrounding towns with zero open surgical risks."
      },
      second_opinion: {
        badge: "Holding an Overpriced Open Surgery Quote? Match Your Budget",
        headline: "Avoid Large Open Cuts and Unnecessary Hospital Stay Costs",
        subheadline: "Upgrade to keyhole 3D mesh reinforcement. Choose an empanelled hospital tier that fits your budget with zero surgical compromise."
      }
    },
    faqs: [
      { question: "How does empanelled hospital tier selection and budget matching work?", answer: "HealthFlo connects you with accredited empanelled laser and laparoscopic centers. You can freely choose your hospital room tier (Economy, Standard, or Executive) based on your personal budget or health insurance limits. There is ZERO compromise on the medical or surgical quality across tiers—price differences reflect room comfort and non-clinical amenities only, never the gold-standard surgical care or specialist expertise. We handle complete insurance processing and financial support." },
      { question: "Why is keyhole mesh surgery better than open cuts?", answer: "Keyhole (laparoscopic) treatment reinforces the weak muscle opening from the inside using a supportive mesh without cutting through large muscle layers. This means much less pain and far quicker healing." }
    ]
  },
  "lipoma-varicose": {
    id: "lipoma-varicose",
    title: "Laser Varicose Veins Treatment & Lipoma Removal",
    shortTitle: "Varicose & Lipoma Care",
    category: "Hernia, Veins & General Care",
    subtitle: "Non-Surgical Laser Vein Healing & Scar-Free Swelling Removal",
    description: "Gentle internal laser treatment (EVLT) to relieve painful varicose leg veins and precision micro-removal of fatty skin swellings (lipomas and cysts) without open surgery or scarring. Choose empanelled hospital tiers based on your budget with zero surgical compromise.",
    usfdaProtocol: "Internal Laser Vein Care (EVLT) & Micro-Excision",
    recoveryTime: "Same-Day Immediate Walk-Home",
    procedureDuration: "20 - 40 Minutes (Simple Daycare)",
    hospitalStay: "0 Nights (Go home immediately after care)",
    anesthesia: "Advanced Local Numbing or Brief Sedation",
    benefits: [
      "No painful surgical vein stripping or leg incisions",
      "Choose empanelled hospital tiers based on budget with zero surgical compromise",
      "Precision micro-removal of lipomas and swellings without ugly stitch scars",
      "Complete cashless insurance processing & 0% EMI financial assistance"
    ],
    keywords: [
      "laser varicose vein surgery near me Tiruchirappalli Trichy",
      "minimally invasive lipoma swelling removal Thillai Nagar Srirangam Bangalore Chennai",
      "laser treatment for leg vein pain Central Tamil Nadu",
      "cyst removal empanelled hospital budget tier without scar marks India"
    ],
    comparison: [
      { metric: "Treatment Technique", healthflo: "Gentle internal light fiber sealing (EVLT)", traditional: "Painful groin incisions and physical pulling of veins" },
      { metric: "Skin Appearance", healthflo: "Clean skin healing without stitch scars", traditional: "Visible thread stitches and surgery marks" }
    ],
    intentHooks: {
      default: {
        badge: "Empanelled Network • Choose Your Hospital Tier • 100% Cashless",
        headline: "Laser Varicose Vein & Lipoma Care Without Surgery Scars",
        subheadline: "Relieve throbbing leg veins and skin swellings in 30 minutes. Choose your hospital room tier to fit your exact budget with zero surgical compromise."
      },
      intimacy: {
        badge: "Flawless Skin Healing • Complete Personal Privacy",
        headline: "Scar-Free Lipoma & Vein Removal For Clean Aesthetic Healing",
        subheadline: "Remove troublesome skin swellings or prominent blue veins cleanly without leaving visible thread stitch marks or surgery scars."
      },
      corporate: {
        badge: "Standing & Desk Worker Protocol • Direct Insurance Approval",
        headline: "Relieve Tired, Throbbing Leg Veins — Same-Day 30-Minute Care",
        subheadline: "Ideal for teachers, engineers, and professionals with standing or desk fatigue. Walk home the same day with complete corporate cashless processing."
      },
      rural: {
        badge: "Dedicated Hospital Admission Guidance • Native Tamil Support",
        headline: "Expert Laser Vein & Lipoma Surgery Accessible From Trichy & Delta Towns",
        subheadline: "Direct medical scheduling from Trichy Junction, Thillai Nagar, Srirangam and surrounding towns with zero hospital admission stays."
      },
      second_opinion: {
        badge: "Holding a Surgery Stripping Quote? Match Your Budget With Us",
        headline: "Avoid Painful Physical Vein Stripping and Open Groin Cuts",
        subheadline: "Upgrade to gentle internal laser vein sealing (EVLT). Choose an empanelled hospital tier that aligns with your budget with zero surgical compromise."
      }
    },
    faqs: [
      { question: "How does empanelled hospital tier selection and budget matching work?", answer: "HealthFlo connects you with accredited empanelled laser centers. You can freely choose your hospital room tier (Economy, Standard, or Executive) based on your personal budget or health insurance limits. There is ZERO compromise on the medical or surgical quality across tiers—price differences reflect room comfort and non-clinical amenities only, never the gold-standard surgical care or specialist expertise. We handle complete insurance processing and financial support." },
      { question: "Is laser treatment for varicose veins permanent?", answer: "Yes! Once the damaged, dilated vein is gently sealed shut by the medical laser, healthy normal veins instantly take over smooth blood circulation while the treated vein naturally dissolves over time." }
    ]
  }
};
