export interface Treatment {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  price: string;
  image: string; // path relative to /public e.g. /treatments/piles.png
}

export interface Specialty {
  id: string;
  name: string;
  treatments: Treatment[];
}

export const specialtiesData: Specialty[] = [
  {
    id: "proctology",
    name: "Proctology",
    treatments: [
      {
        id: "laser-piles",
        name: "Laser Treatment for Piles",
        description: "Advanced laser procedure for quick, effective relief without cuts or stitches.",
        benefits: [
          "Minimally invasive",
          "Less pain & bleeding",
          "Quick recovery",
          "Day care procedure"
        ],
        price: "₹25,000",
        image: "/treatments/piles.png"
      },
      {
        id: "fissure",
        name: "Laser Fissure Treatment",
        description: "Painless laser intervention to heal fissures with maximum precision.",
        benefits: [
          "Virtually painless",
          "No daily dressings",
          "Return to work next day",
          "High success rate"
        ],
        price: "₹20,000",
        image: "/treatments/fissure.png"
      },
      {
        id: "fistula",
        name: "Laser Fistula Treatment",
        description: "Sphincter-saving laser surgery ensuring safety and fast healing.",
        benefits: [
          "Preserves sphincter muscles",
          "No large incisions",
          "Minimal scarring",
          "Same-day discharge*"
        ],
        price: "₹35,000",
        image: "/treatments/fistula.png"
      }
    ]
  },
  {
    id: "urology",
    name: "Urology",
    treatments: [
      {
        id: "laser-circumcision",
        name: "Laser Circumcision",
        description: "Safe, quick & virtually painless procedure for medical or personal needs.",
        benefits: [
          "Painless procedure",
          "Minimal bleeding",
          "Fast recovery",
          "Day care surgery"
        ],
        price: "₹18,000",
        image: "/treatments/circumcision.png"
      }
    ]
  },
  {
    id: "general-surgery",
    name: "General Surgery",
    treatments: [
      {
        id: "lipoma-cyst",
        name: "Lipoma & Cyst Removal",
        description: "Safe removal of lumps and cysts with focus on minimal scarring.",
        benefits: [
          "Minimally invasive",
          "Small incision",
          "Minimal scarring",
          "Quick recovery"
        ],
        price: "₹15,000",
        image: "/treatments/lipoma.png"
      }
    ]
  }
];
