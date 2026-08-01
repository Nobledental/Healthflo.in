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
    "cardiology": {
        id: "cardiology",
        title: "Cardiology",
        subtitle: "Advanced Heart Care",
        description: "Comprehensive cardiac care from preventive screening to advanced robotic heart surgeries and angioplasty, led by globally trained cardiologists.",
        benefits: [
            "24/7 Cardiac Emergency",
            "Advanced Cath Labs",
            "Minimally Invasive Surgeries",
            "Post-op Cardiac Rehab"
        ],
        keywords: ["heart", "chest pain", "angioplasty", "bypass", "ecg"],
        category: "Cardiology",
        heroImage: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=800&auto=format&fit=crop"
    },
    "oncology": {
        id: "oncology",
        title: "Oncology",
        subtitle: "Precision Cancer Care",
        description: "Multi-disciplinary tumor boards providing personalized cancer treatment plans using the latest in radiation, medical, and surgical oncology.",
        benefits: [
            "Targeted Chemotherapy",
            "TrueBeam Radiotherapy",
            "Robotic Onco-Surgery",
            "Palliative Care Support"
        ],
        keywords: ["cancer", "tumor", "chemotherapy", "radiation"],
        category: "Oncology",
        heroImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
    },
    "neurology": {
        id: "neurology",
        title: "Neurology",
        subtitle: "Brain & Spine Institute",
        description: "State-of-the-art neurosciences center treating complex brain and spine disorders with advanced neuro-navigation and microscopic surgery.",
        benefits: [
            "Stroke Ready Unit",
            "Epilepsy Monitoring",
            "Deep Brain Stimulation",
            "Spinal Decompression"
        ],
        keywords: ["brain", "spine", "stroke", "paralysis", "headache"],
        category: "Neurology",
        heroImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop"
    },
    "orthopedics": {
        id: "orthopedics",
        title: "Orthopedics",
        subtitle: "Bone & Joint Care",
        description: "Restoring mobility through advanced joint replacements, arthroscopic surgeries, and sports medicine with highly specialized orthopedic surgeons.",
        benefits: [
            "Robotic Knee Replacement",
            "Sports Injury Clinic",
            "Complex Trauma Care",
            "Physiotherapy Center"
        ],
        keywords: ["bone", "joint", "knee", "back pain", "fracture"],
        category: "Orthopedics",
        heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop"
    },
    "pediatrics": {
        id: "pediatrics",
        title: "Pediatrics",
        subtitle: "Child Health Center",
        description: "Compassionate, specialized care for infants, children, and adolescents, featuring a Level III Neonatal Intensive Care Unit (NICU).",
        benefits: [
            "Level III NICU",
            "Pediatric Surgery",
            "Vaccination Center",
            "Child Psychology"
        ],
        keywords: ["child", "baby", "infant", "pediatrician"],
        category: "Pediatrics",
        heroImage: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=800&auto=format&fit=crop"
    },
    "emergency": {
        id: "emergency",
        title: "Emergency & Trauma",
        subtitle: "24/7 Rapid Response",
        description: "Level 1 Trauma center equipped to handle critical medical, surgical, and cardiac emergencies with a fleet of Advanced Life Support ambulances.",
        benefits: [
            "Level 1 Trauma Care",
            "ALS Ambulances",
            "Code Blue Team",
            "24/7 Blood Bank"
        ],
        keywords: ["emergency", "accident", "trauma", "ambulance"],
        category: "Emergency",
        heroImage: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=800&auto=format&fit=crop"
    }
};
