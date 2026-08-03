export interface DepartmentData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    benefits: string[];
    keywords: string[];
    category: string;
    heroImage: string;
}

export const departmentsData: Record<string, DepartmentData> = {
    "proctology": {
        id: "proctology",
        title: "Proctology",
        subtitle: "Advanced Anorectal Care",
        description: "Painless, minimally invasive laser treatments for Piles, Fissures, and Fistulas with same-day discharge and zero cuts.",
        benefits: [
            "USFDA Approved Lasers",
            "30-Minute Procedure",
            "Zero Pain & Bleeding",
            "Resume Work in 48 Hours"
        ],
        keywords: ["piles", "fissure", "fistula", "hemorrhoids", "laser"],
        category: "Proctology",
        heroImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop"
    },
    "urology": {
        id: "urology",
        title: "Urology",
        subtitle: "Expert Urological Care",
        description: "Specialized laser circumcision and treatment for phimosis ensuring quick recovery, better hygiene, and minimal discomfort.",
        benefits: [
            "ZSR & Laser Circumcision",
            "No Stitches, No Scars",
            "10-Minute Procedure",
            "Same-Day Discharge"
        ],
        keywords: ["circumcision", "phimosis", "zsr", "urology"],
        category: "Urology",
        heroImage: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800&auto=format&fit=crop"
    },
    "laparoscopy": {
        id: "laparoscopy",
        title: "Laparoscopic Surgery",
        subtitle: "Keyhole Surgeries",
        description: "Advanced laparoscopic solutions for Gallbladder stones, Hernia repair, and Appendicitis with faster recovery and smaller incisions.",
        benefits: [
            "Minimally Invasive",
            "Less Post-Op Pain",
            "Reduced Risk of Infection",
            "Shorter Hospital Stay"
        ],
        keywords: ["gallbladder", "hernia", "appendix", "laparoscopy", "keyhole"],
        category: "Laparoscopy",
        heroImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop"
    },
    "general-surgery": {
        id: "general-surgery",
        title: "General Surgery",
        subtitle: "Day-Care Procedures",
        description: "Expert surgical removal of Lipomas, Cysts, and other minor day-care procedures under high-precision clinical protocols.",
        benefits: [
            "Cosmetic Stitching",
            "Virtually Scarless",
            "Local Anesthesia",
            "Immediate Recovery"
        ],
        keywords: ["lipoma", "cyst", "minor surgery", "pilonidal sinus"],
        category: "General Surgery",
        heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
    },
    "vascular": {
        id: "vascular",
        title: "Vascular Surgery",
        subtitle: "Vein & Vascular Care",
        description: "State-of-the-art laser ablation and treatments for Varicose Veins to restore healthy blood flow without major surgery.",
        benefits: [
            "EVLT (Laser Ablation)",
            "No General Anesthesia",
            "No Major Incisions",
            "Walk-In, Walk-Out"
        ],
        keywords: ["varicose veins", "spider veins", "vascular", "evlt"],
        category: "Vascular",
        heroImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop"
    }
};
