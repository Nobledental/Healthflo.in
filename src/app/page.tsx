import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { readSiteConfig } from "@/lib/siteConfig";

// ── Above-The-Fold Synchronous Sections (For Instant FCP/LCP SEO & Core Web Vitals) ──
import Hero from "@/sections/Hero";                           

// ── Below-The-Fold Dynamic Code Splitting (Optimized for Server Components & Rural Mobile Speeds) ──
const ParticleCanvas = dynamic(() => import("@/components/ParticleCanvas"), { 
  loading: () => <div className="fixed inset-0 z-0 pointer-events-none bg-transparent" /> 
});

const MobileStickyBar = dynamic(() => import("@/components/MobileStickyBar"));

const SpecializedTreatments = dynamic(() => import("@/sections/SpecializedTreatments"), { 
  loading: () => <div className="w-full min-h-[400px] animate-pulse bg-slate-50/50 rounded-3xl" /> 
});

const HowItWorks = dynamic(() => import("@/sections/HowItWorks"), { 
  loading: () => <div className="w-full min-h-[350px] animate-pulse bg-slate-50/50 rounded-3xl" /> 
});

const PackageInclusions = dynamic(() => import("@/sections/PackageInclusions"), { 
  loading: () => <div className="w-full min-h-[400px] animate-pulse bg-slate-50/50 rounded-3xl" /> 
});

const Testimonials = dynamic(() => import("@/sections/Testimonials"), { 
  loading: () => <div className="w-full min-h-[450px] animate-pulse bg-slate-50/50 rounded-3xl" /> 
});

const WhyHealthflo = dynamic(() => import("@/sections/WhyHealthflo"), { 
  loading: () => <div className="w-full min-h-[400px] animate-pulse bg-slate-50/50 rounded-3xl" /> 
});

const RegionalLocationsDirectory = dynamic(() => import("@/components/RegionalLocationsDirectory"), { 
  loading: () => <div className="w-full min-h-[400px] animate-pulse bg-slate-50/50 rounded-3xl" /> 
});

const ActionGrid = dynamic(() => import("@/sections/ActionGrid"), { 
  loading: () => <div className="w-full min-h-[300px] animate-pulse bg-slate-50/50 rounded-3xl" /> 
});

const LeadCapture = dynamic(() => import("@/sections/LeadCapture"), { 
  loading: () => <div className="w-full min-h-[600px] animate-pulse bg-slate-50/50 rounded-3xl" /> 
});

const FAQ = dynamic(() => import("@/sections/FAQ"), { 
  loading: () => <div className="w-full min-h-[400px] animate-pulse bg-slate-50/50 rounded-3xl" /> 
});

export default async function Home() {
  const config = await readSiteConfig();
  // Master JSON-LD Schema for AI Search Engines & Google Rich Results
  const healthfloSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "@id": "https://healthflo.in/#organization",
        "name": "HealthFlo Surgical Care Network",
        "url": "https://healthflo.in",
        "logo": "https://healthflo.in/logo.png",
        "description": "India's premier managed laser surgical network delivering zero-pain USFDA laser surgery for piles, fistula, hernia, kidney stones, and varicose veins with 100% cashless insurance approval.",
        "telephone": `+${config.helplineRaw}`,
        "email": "care@healthflo.in",
        "priceRange": "₹₹ - 100% Cashless Insured Care",
        "medicalSpecialty": [
          "Proctology",
          "UrologicSurgery",
          "GeneralSurgery",
          "VascularSurgery",
          "LaparoscopicSurgery"
        ],
        "availableLanguage": ["en", "ta", "kn", "te", "hi"],
        "areaServed": [
          { "@type": "State", "name": "Tamil Nadu" },
          { "@type": "State", "name": "Karnataka" },
          { "@type": "State", "name": "Telangana" },
          { "@type": "City", "name": "Hyderabad" },
          { "@type": "City", "name": "Bangalore" },
          { "@type": "City", "name": "Chennai" }
        ],
        "hasCredential": [
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "NABH Accreditation" },
          { "@type": "EducationalOccupationalCredential", "credentialCategory": "USFDA Surgical Protocol Compliance" }
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": `+${config.helplineRaw}`,
          "contactType": "24/7 Clinical Triage & Emergency Triage",
          "availableLanguage": ["English", "Tamil", "Kannada", "Telugu", "Hindi"]
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://healthflo.in/#webpage",
        "url": "https://healthflo.in",
        "name": "HealthFlo | India's Premier Laser Surgical & Cashless Care Network",
        "isPartOf": { "@id": "https://healthflo.in/#organization" },
        "about": { "@id": "https://healthflo.in/#organization" },
        "description": "Book priority consultation for painless laser piles, hernia, kidney stone & circumcision surgery. Native language coordinators & free hospital cab travel."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(healthfloSchema) }}
      />
      <ParticleCanvas />
      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-[80px] md:pt-[120px] pb-20 md:pb-24 relative z-10 flex flex-col gap-4">
        {/* ── Stage 1: Hook (Synchronous High-Speed Render) ───────────────────── */}
        <div className="flex flex-col mb-4">
          <Hero />
        </div>

        {/* ── Stage 2: Solutions (Dynamically Streamed) ──────────────────────── */}
        <SpecializedTreatments />

        {/* ── Stage 3: Process ───────────────────────────────────────────────── */}
        <HowItWorks />

        {/* ── Stage 4: Transparency & Cost ────────────────────────────────────── */}
        <PackageInclusions />

        {/* ── Stage 5: Proof & Regional Authority ─────────────────────────────── */}
        <Testimonials />
        <WhyHealthflo />

        {/* ── Stage 6: Pan-TN, KA & TS Town & Village Discovery Network ──────── */}
        <RegionalLocationsDirectory />

        {/* ── Stage 7: Action & Regional Language Triage Desk ─────────────────── */}
        <div className="flex flex-col gap-8 mt-8">
          <ActionGrid />
          <LeadCapture />
          <FAQ />
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </>
  );
}
