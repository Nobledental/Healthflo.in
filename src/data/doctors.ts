export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  experience: string;
  image: string;
  hospitals: string[];
};

export const doctorsData: Doctor[] = [
  {
    id: "dr-amit-sharma",
    name: "Dr. Amit Sharma",
    specialty: "Senior Proctologist & Laser Surgeon",
    qualifications: "MS, DNB (General Surgery)",
    experience: "15+ Years Experience",
    image: "/images/doctor-placeholder.webp",
    hospitals: ["Healthflo Premier, New Delhi"],
  },
  {
    id: "dr-vikram-singh",
    name: "Dr. Vikram Singh",
    specialty: "Lead Urologist & Andrologist",
    qualifications: "MS, M.Ch (Urology)",
    experience: "12+ Years Experience",
    image: "/images/doctor-placeholder.webp",
    hospitals: ["Healthflo Advanced, Gurgaon"],
  },
  {
    id: "dr-neha-kapoor",
    name: "Dr. Neha Kapoor",
    specialty: "General & Laparoscopic Surgeon",
    qualifications: "MS, FIAGES",
    experience: "10+ Years Experience",
    image: "/images/doctor-placeholder.webp",
    hospitals: ["Healthflo Central, Noida"],
  },
];
