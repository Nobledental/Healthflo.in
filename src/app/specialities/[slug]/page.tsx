import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import { specialitiesData } from "@/data/specialities";
import SpecialityClientView from "@/components/SpecialityClientView";

export async function generateStaticParams() {
  return Object.keys(specialitiesData).map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = specialitiesData[resolvedParams.slug];
  if (!data) return { title: "Speciality Not Found | HealthFlo" };

  return {
    title: `${data.title} | Insurance Eligible Laser Surgery Across South India`,
    description: `${data.description} Medically reviewed USFDA surgical protocols with 0-day stay and free hospital cab transit from urban residential zones, tech IT corridors, regional towns, and hill retreats.`,
    keywords: [
      ...data.keywords,
      `${data.shortTitle} insurance eligible`,
      `${data.shortTitle} zero stay hospital`,
      `best ${data.shortTitle} doctor near me`,
      `painless ${data.shortTitle} surgery Tiruchirappalli Trichy Thillai Nagar Bangalore Chennai`,
      `empanelled hospital budget tier choice ${data.shortTitle}`,
      "USFDA laser surgery procedure 2026"
    ],
    openGraph: {
      title: `${data.title} | HealthFlo Accredited Surgical Network`,
      description: data.subtitle,
      url: `https://healthflo.in/specialities/${data.id}`,
      type: "article",
    },
  };
}

export default async function SpecialityDetailHub({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const data = specialitiesData[resolvedParams.slug];

  if (!data) {
    notFound();
  }

  // Structured medical schema for Google Search FAQ drawers, Perplexity, and E-E-A-T validation
  const currentDate = new Date().toISOString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `https://healthflo.in/specialities/${data.id}#webpage`,
        "name": data.title,
        "description": data.description,
        "medicalSpecialty": data.category,
        "lastReviewed": currentDate.split("T")[0],
        "dateModified": currentDate,
        "author": {
          "@type": "Organization",
          "name": "HealthFlo Medical Advisory & Surgical Directorate",
          "url": "https://healthflo.in"
        },
        "reviewedBy": {
          "@type": "MedicalOrganization",
          "name": "HealthFlo Doctors",
          "url": "https://healthflo.in/doctors"
        },
        "about": {
          "@type": "MedicalProcedure",
          "name": data.title,
          "bodyLocation": data.category,
          "procedureType": "MinimallyInvasiveProcedure",
          "medicalCode": {
            "@type": "MedicalCode",
            "name": data.usfdaProtocol
          }
        }
      },
      {
        "@type": "MedicalBusiness",
        "@id": "https://healthflo.in/#clinic",
        "name": "HealthFlo Specialized Laser & Daycare Hospital Network",
        "medicalSpecialty": data.category,
        "areaServed": [
          "Tiruchirappalli Thillai Nagar", "Trichy Srirangam", "Trichy Cantonment", "BHEL Township", "KKT Nagar", "Edamalaipatti Pudur",
          "Thanjavur", "Karur", "Pudukkottai", "Ariyalur", "Perambalur", "Dindigul", "Salem", "Erode",
          "Hyderabad Nallagandla", "HITEC City IT Corridor", "Gachibowli", "Jubilee Hills",
          "Bangalore Whitefield", "Outer Ring Road Tech Hub", "Koramangala", "Indiranagar",
          "Chennai TIDEL Park", "Anna Nagar", "Shollinganallur", "Coimbatore RS Puram",
          "Ooty Nilgiri Retreat Belt", "Coorg Discreet Care Sanctuary", "Vellore"
        ],
        "availableService": {
          "@type": "MedicalTest",
          "name": `Pre-operative diagnostic triage and ${data.shortTitle} insurance eligibility clearance`
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": data.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main 
      className="min-h-screen bg-[#F6F8FB] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white pt-24 font-sans"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(148, 163, 184, 0.22) 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <SpecialityClientView data={data} />
      <Footer />
      <MobileStickyBar />
    </main>
  );
}
