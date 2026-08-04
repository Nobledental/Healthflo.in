export interface RegionalLocation {
  slug: string;
  stateSlug: "tamil-nadu" | "karnataka" | "telangana";
  name: string;
  stateName: string;
  nativeLanguage: "Tamil" | "Kannada" | "Telugu";
  nativeGreeting: string;
  hubCity: string;
  transitTime: string;
  description: string;
  specializedProcedures: string[];
}

export const REGIONAL_LOCATIONS: RegionalLocation[] = [
  // ── TAMIL NADU CITIES, TOWNS & VILLAGES ────────────────────────────────────────
  {
    slug: "chennai",
    stateSlug: "tamil-nadu",
    name: "Chennai",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    hubCity: "Chennai Speciality Medical Hub",
    transitTime: "Direct City Ambulatory & Metro Care Support",
    description: "Serving Chennai & Greater Northern Tamil Nadu with USFDA laser protocols and 30-min cashless insurance approval.",
    specializedProcedures: ["Laser Piles & Fistula Care", "Laparoscopic Hernia Repair", "Laser Circumcision & Kidney Stones", "Varicose Vein Laser Therapy"]
  },
  {
    slug: "coimbatore",
    stateSlug: "tamil-nadu",
    name: "Coimbatore",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    hubCity: "Coimbatore & Western Tamil Nadu Hub",
    transitTime: "Express Highway & Station Pickups Available",
    description: "Delivering advanced laser surgical treatments to Coimbatore, Tiruppur, and surrounding textile belt towns with zero upfront payment.",
    specializedProcedures: ["Laser Proctology (Piles/Fissure)", "Laparoscopic Gallbladder & Hernia", "Laser Urology Protocols", "Painless Day Care Surgery"]
  },
  {
    slug: "madurai",
    stateSlug: "tamil-nadu",
    name: "Madurai",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    hubCity: "Madurai Southern Tamil Nadu Triage Desk",
    transitTime: "Free Assisted Cab Transit from Regional Villages",
    description: "Bringing high-tech laser surgery and dedicated Tamil language care coordinators to patients across Madurai and southern districts.",
    specializedProcedures: ["Laser Piles & Fistula Surgery", "Laparoscopic Hernia Solutions", "Laser Kidney Stone Surgery", "Vascular Endovenous Therapy"]
  },
  {
    slug: "tiruchirappalli",
    stateSlug: "tamil-nadu",
    name: "Tiruchirappalli (Trichy)",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    hubCity: "Central Tamil Nadu Medical Desk",
    transitTime: "Direct Bus Terminus & Station Transit Support",
    description: "Expert NABH laser surgery protocols accessible to Trichy and Kaveri delta agricultural towns with full insurance assistance.",
    specializedProcedures: ["Laser Piles & Anal Fissure Care", "Laparoscopic Abdominal Surgery", "Minimally Invasive Urology", "Day Care Laser Procedures"]
  },
  {
    slug: "salem",
    stateSlug: "tamil-nadu",
    name: "Salem",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    hubCity: "Salem & Western TN Surgical Corridor",
    transitTime: "Coordinated Cab Transit for Surrounding Towns",
    description: "Comprehensive surgical triage and cashless health coverage for residents of Salem, Yercaud hills, and surrounding industrial villages.",
    specializedProcedures: ["Laser Proctology Surgery", "Laparoscopic Hernia Repair", "Painless Circumcision", "Varicose Veins Laser Care"]
  },
  {
    slug: "tirunelveli",
    stateSlug: "tamil-nadu",
    name: "Tirunelveli",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    hubCity: "South Tamil Nadu Triage Desk",
    transitTime: "Free Inter-Town Travel Coordination Available",
    description: "Connecting Tirunelveli and deep southern village clusters to world-class USFDA surgical care with Tamil coordinator support.",
    specializedProcedures: ["Laser Piles & Fistula Cure", "Laparoscopic Hernia & Gallbladder", "Laser Urological Care", "Cashless Surgery Assistance"]
  },
  {
    slug: "vellore",
    stateSlug: "tamil-nadu",
    name: "Vellore",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    hubCity: "Northern TN & Corridor Hub",
    transitTime: "Express Transit Support from Ranipet & Surroundings",
    description: "Fast-track cashless laser surgery for Vellore district, featuring zero room rent caps and same-day discharge protocols.",
    specializedProcedures: ["Laser Piles, Fissure & Fistula", "Advanced Laparoscopic Surgery", "Laser Circumcision", "No-Cost EMI Surgery"]
  },
  {
    slug: "erode",
    stateSlug: "tamil-nadu",
    name: "Erode",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    hubCity: "Erode & Bhavani Basin Medical Desk",
    transitTime: "Free Town & Village Transit Assistance",
    description: "Transparent surgical packages and fluent Tamil medical guides for Erode, Bhavani, and rural farm communities.",
    specializedProcedures: ["Laser Proctology Care", "Laparoscopic Hernia Repair", "Laser Stone Solutions", "Same-Day Hospital Discharge"]
  },
  {
    slug: "dindigul",
    stateSlug: "tamil-nadu",
    name: "Dindigul",
    stateName: "Tamil Nadu",
    nativeLanguage: "Tamil",
    nativeGreeting: "வணக்கம் (Vanakkam)",
    hubCity: "Central TN & Palani Region Desk",
    transitTime: "Free Cab Coordination from Rural Villages",
    description: "Dedicated surgical outreach for Dindigul town and surrounding village zones, providing zero-pain laser procedures and cashless billing.",
    specializedProcedures: ["Laser Piles Surgery", "Laparoscopic Hernia Surgery", "Painless Urology Care", "Cashless Insurance Guidance"]
  },

  // ── KARNATAKA CITIES, TOWNS & VILLAGES ─────────────────────────────────────────
  {
    slug: "bengaluru",
    stateSlug: "karnataka",
    name: "Bengaluru (Bangalore)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    hubCity: "Bengaluru Advanced Speciality Centers",
    transitTime: "City-Wide Emergency & Ambulance Transit",
    description: "Premier USFDA robotic and laser surgical centers across Indiranagar, HSR, Whitefield, and Hebbal with instant cashless insurance.",
    specializedProcedures: ["Laser Proctology & Fistula", "Laparoscopic Hernia & Gallbladder", "Laser Urology & Circumcision", "Endovenous Laser Vein Surgery"]
  },
  {
    slug: "mysuru",
    stateSlug: "karnataka",
    name: "Mysuru (Mysore)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    hubCity: "Mysuru & Southern Karnataka Hub",
    transitTime: "Express Expressway & Highway Cab Coordination",
    description: "Trusted laser surgery network for Mysuru, Mandya, and heritage countryside villages with native Kannada speaking coordinators.",
    specializedProcedures: ["Laser Piles & Fissure Therapy", "Laparoscopic Hernia Repair", "Laser Kidney Stone Treatment", "Transparent Package Pricing"]
  },
  {
    slug: "hubballi-dharwad",
    stateSlug: "karnataka",
    name: "Hubballi-Dharwad",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    hubCity: "North Karnataka Surgical Center",
    transitTime: "Direct Railway Station & Town Transit Support",
    description: "Serving North Karnataka with advanced minimally invasive surgical treatments, eliminating the need to travel to metro cities.",
    specializedProcedures: ["Laser Proctology (Piles & Fistula)", "Laparoscopic General Surgery", "Urological Laser Care", "Cashless Hospital Support"]
  },
  {
    slug: "mangaluru",
    stateSlug: "karnataka",
    name: "Mangaluru (Mangalore)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    hubCity: "Coastal Karnataka Medical Hub",
    transitTime: "Coordinated Cab Pickups along Coastal Corridor",
    description: "Bringing zero-pain surgical treatments and expert surgical triage to Mangaluru, Udupi, and Dakshina Kannada coastal villages.",
    specializedProcedures: ["Laser Proctology & Piles Care", "Laparoscopic Hernia Solutions", "Laser Circumcision", "Day Care Laser Surgery"]
  },
  {
    slug: "belagavi",
    stateSlug: "karnataka",
    name: "Belagavi (Belgaum)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    hubCity: "North-West Karnataka Surgical Corridor",
    transitTime: "Free Rural & Town Travel Assistance Available",
    description: "Empowering Belagavi and border village patients with transparent surgery costs and 100% cashless insurance approval.",
    specializedProcedures: ["Laser Piles & Fistula Treatment", "Laparoscopic Abdominal Surgery", "Laser Kidney Stone Care", "No-Cost Surgery EMI"]
  },
  {
    slug: "kalaburagi",
    stateSlug: "karnataka",
    name: "Kalaburagi (Gulbarga)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    hubCity: "North-East Karnataka Medical Desk",
    transitTime: "Direct Bus Terminus & Station Transit Support",
    description: "Specialized hospital surgical navigation for Kalaburagi region, featuring native Kannada support and zero upfront hospital deposit.",
    specializedProcedures: ["Laser Proctology Surgery", "Laparoscopic Hernia Repair", "Minimally Invasive Urology", "Cashless Desk Support"]
  },
  {
    slug: "tumakuru",
    stateSlug: "karnataka",
    name: "Tumakuru (Tumkur)",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    hubCity: "Bengaluru-Tumakuru Surgical Corridor",
    transitTime: "Free Highway Cab Pickup to Bengaluru Speciality Centers",
    description: "Fast highway surgical transit and localized triage for Tumakuru town and surrounding coconut farming villages.",
    specializedProcedures: ["Laser Piles & Fissure Care", "Laparoscopic Hernia Solutions", "Painless Urology Surgery", "Transparent All-Inclusive Pricing"]
  },
  {
    slug: "davangere",
    stateSlug: "karnataka",
    name: "Davangere",
    stateName: "Karnataka",
    nativeLanguage: "Kannada",
    nativeGreeting: "ನಮಸ್ಕಾರ (Namaskara)",
    hubCity: "Central Karnataka Medical Desk",
    transitTime: "Express Highway Transit Coordination",
    description: "High-tech laser surgical care delivered to Davangere and Central Karnataka agricultural heartland with complete insurance guidance.",
    specializedProcedures: ["Laser Proctology & Fistula", "Laparoscopic Gallbladder Care", "Laser Stone Surgery", "Same-Day Hospital Discharge"]
  },

  // ── TELANGANA & HYDERABAD REGION TOWNS & VILLAGES ──────────────────────────────
  {
    slug: "hyderabad",
    stateSlug: "telangana",
    name: "Hyderabad & Jubilee Hills Network",
    stateName: "Telangana & Hyderabad Region",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    hubCity: "Hyderabad Advanced Speciality Hub",
    transitTime: "City-Wide Ambulatory & Metro Transit Support",
    description: "Premier robotic and laser surgical centers across Jubilee Hills, Kukatpally, Gachibowli, and Secunderabad with instant cashless billing.",
    specializedProcedures: ["Laser Proctology & Fistula", "Laparoscopic Hernia & Gallbladder", "Laser Urology & Circumcision", "Endovenous Laser Vein Therapy"]
  },
  {
    slug: "warangal",
    stateSlug: "telangana",
    name: "Warangal & Hanamkonda",
    stateName: "Telangana & Hyderabad Region",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    hubCity: "Eastern Telangana Surgical Desk",
    transitTime: "Free Highway & Station Transit Coordination",
    description: "Serving Warangal, Hanamkonda, and rural Kakatiya heritage districts with state-of-the-art laser surgeries and Telugu coordinators.",
    specializedProcedures: ["Laser Piles & Fissure Treatment", "Laparoscopic Hernia Repair", "Laser Kidney Stone Removal", "Cashless Insurance Approval"]
  },
  {
    slug: "karimnagar",
    stateSlug: "telangana",
    name: "Karimnagar",
    stateName: "Telangana & Hyderabad Region",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    hubCity: "Northern Telangana Surgical Corridor",
    transitTime: "Coordinated Cab Transit from Surrounding Towns",
    description: "Bringing advanced USFDA surgical protocols to Karimnagar and Ramagundam belt with zero upfront hospital deposit.",
    specializedProcedures: ["Laser Proctology Care", "Laparoscopic Abdominal Surgery", "Laser Circumcision & Urology", "Zero Interest EMI Plans"]
  },
  {
    slug: "nizamabad",
    stateSlug: "telangana",
    name: "Nizamabad",
    stateName: "Telangana & Hyderabad Region",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    hubCity: "North-West Telangana Medical Desk",
    transitTime: "Free Assisted Cab Transit from Regional Villages",
    description: "Expert surgical triage and cashless health coverage for residents of Nizamabad, Kamareddy, and regional village communities.",
    specializedProcedures: ["Laser Piles & Fistula Surgery", "Laparoscopic Hernia Solutions", "Laser Stone Treatment", "Same-Day Day Care Surgery"]
  },
  {
    slug: "khammam",
    stateSlug: "telangana",
    name: "Khammam",
    stateName: "Telangana & Hyderabad Region",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    hubCity: "South-East Telangana Triage Desk",
    transitTime: "Direct Bus Terminus & Station Pickups Available",
    description: "Transparent surgical packages and fluent Telugu medical guides for Khammam, Kothagudem, and surrounding farming towns.",
    specializedProcedures: ["Laser Proctology (Piles/Fissure)", "Laparoscopic Gallbladder & Hernia", "Painless Urology Care", "Cashless Desk Support"]
  },
  {
    slug: "mahbubnagar",
    stateSlug: "telangana",
    name: "Mahbubnagar",
    stateName: "Telangana & Hyderabad Region",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    hubCity: "Southern Telangana Medical Corridor",
    transitTime: "Express Highway Cab Transit to Hyderabad Hubs",
    description: "Seamless hospital transit and world-class surgical care for Mahbubnagar, Jadcherla, and southern village clusters.",
    specializedProcedures: ["Laser Piles, Fissure & Fistula", "Laparoscopic Hernia Surgery", "Minimally Invasive Urology", "No-Cost EMI Surgery"]
  },
  {
    slug: "nalgonda",
    stateSlug: "telangana",
    name: "Nalgonda & Miryalaguda",
    stateName: "Telangana & Hyderabad Region",
    nativeLanguage: "Telugu",
    nativeGreeting: "నమస్కారం (Namaskaram)",
    hubCity: "Nalgonda & Krishna Basin Medical Desk",
    transitTime: "Free Town & Village Transit Assistance",
    description: "High-tech laser surgical care accessible to Nalgonda, Miryalaguda, and surrounding rural communities with full insurance pre-approval.",
    specializedProcedures: ["Laser Proctology & Fistula Care", "Laparoscopic Hernia Repair", "Laser Kidney Stone Treatment", "Transparent All-Inclusive Pricing"]
  }
];

export function getLocationsByState(stateSlug: string): RegionalLocation[] {
  return REGIONAL_LOCATIONS.filter((loc) => loc.stateSlug === stateSlug);
}

export function getLocationBySlug(stateSlug: string, slug: string): RegionalLocation | undefined {
  return REGIONAL_LOCATIONS.find((loc) => loc.stateSlug === stateSlug && loc.slug === slug);
}
