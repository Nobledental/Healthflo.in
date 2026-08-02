export interface Treatment {
  id: string;
  name: string;
  description: string;
  benefits: string[];
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
        ]
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
        ]
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
        ]
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
        ]
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
        ]
      }
    ]
  }
];
