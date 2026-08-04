import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import { specialitiesData } from "@/data/specialities";
import SpecialityClientView from "@/components/SpecialityClientView";

// Sample high-intent programmatic hubs for static pre-generation
export async function generateStaticParams() {
  const sampleHubs = [
    "hyderabad-nallagandla",
    "hyderabad-gachibowli",
    "bangalore-whitefield-it-corridor",
    "bangalore-koramangala",
    "chennai-tidel-park-hub",
    "chennai-anna-nagar",
    "ooty-resort-privacy-belt",
    "coorg-discreet-intimate-care",
    "erode-regional-transit-desk",
    "nizamabad-rural-surgical-support",
    "salem-insurance-eligible-center"
  ];

  const params: { slug: string; hub: string }[] = [];
  Object.keys(specialitiesData).forEach((slug) => {
    sampleHubs.forEach((hub) => {
      params.push({ slug, hub });
    });
  });
  return params;
}

// Allow unlimited dynamic local regional URLs generated on-the-fly from ad geofences or search queries!
export const dynamicParams = true;

function formatHubName(hub: string): { title: string; type: string; badge: string } {
  const cleaned = hub.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  if (hub.includes("it") || hub.includes("corridor") || hub.includes("tech") || hub.includes("park")) {
    return { title: cleaned, type: "Corporate Tech Park Corridor", badge: "Weekend Surgical Sprint • Direct Corporate Group Mediclaim Assistance" };
  }
  if (hub.includes("resort") || hub.includes("privacy") || hub.includes("ooty") || hub.includes("coorg") || hub.includes("munnar")) {
    return { title: cleaned, type: "Resort & Privacy Sanctuary", badge: "Exclusive Privacy Shield • Unlabeled Clinical Records • Zero Dressing" };
  }
  if (hub.includes("regional") || hub.includes("transit") || hub.includes("rural") || hub.includes("erode") || hub.includes("salem") || hub.includes("nizamabad")) {
    return { title: cleaned, type: "Regional Town & Village Desk", badge: "Free Round-Trip AC Hospital Cab • Native Tamil/Telugu/Kannada Triage" };
  }
  return { title: cleaned, type: "Urban Residential Surgical Network", badge: "Same-Day Walk-Home Care • 30-Minute Insurance Eligibility Clearance" };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; hub: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const data = specialitiesData[resolvedParams.slug];
  if (!data) return { title: "Speciality Not Found | HealthFlo" };

  const hubInfo = formatHubName(resolvedParams.hub);

  return {
    title: `${data.shortTitle} in ${hubInfo.title} | Insurance Eligible Zero-Stay Surgery`,
    description: `Dedicated USFDA laser and ZSR stapler ${data.shortTitle.toLowerCase()} protocols tailored for ${hubInfo.title}. Experience 0-day hospitalization, painless walk-home recovery, insurance eligibility guidance, and free hospital transit.`,
    keywords: [...data.keywords, `${data.shortTitle} in ${hubInfo.title}`, `insurance eligible surgery ${hubInfo.title}`, `laser doctor near ${hubInfo.title}`],
    openGraph: {
      title: `${data.title} - Specialized for ${hubInfo.title}`,
      description: `Precision USFDA surgical protocols with full insurance eligibility guidance and transit support for patients in ${hubInfo.title}.`,
      url: `https://healthflo.in/specialities/${data.id}/${resolvedParams.hub}`,
      type: "article",
    },
  };
}

export default async function ProgrammaticHubPage({ params }: { params: Promise<{ slug: string; hub: string }> }) {
  const resolvedParams = await params;
  const data = specialitiesData[resolvedParams.slug];

  if (!data) {
    notFound();
  }

  const hubInfo = formatHubName(resolvedParams.hub);
  const currentDate = new Date().toISOString();

  // Deep regional SEO & AI structured data graph with professional E-E-A-T credentials
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `https://healthflo.in/specialities/${data.id}/${resolvedParams.hub}#procedure`,
    "name": `${data.title} (${hubInfo.title} Regional Access)`,
    "description": data.description,
    "lastReviewed": currentDate.split("T")[0],
    "author": {
      "@type": "Organization",
      "name": "HealthFlo Medical Advisory & Surgical Directorate"
    },
    "location": {
      "@type": "Place",
      "name": hubInfo.title,
      "address": { "@type": "PostalAddress", "addressRegion": "South India" }
    },
    "medicalSpecialty": data.category,
    "procedureType": "Daycare Minimally Invasive Laser Surgery",
    "provider": { "@id": "https://healthflo.in/#organization" }
  };

  // Modify the data copy slightly for this hub to feed into Client View
  const customizedData = {
    ...data,
    intentHooks: {
      ...data.intentHooks,
      default: {
        badge: `${hubInfo.badge}`,
        headline: `Precision ${data.shortTitle} Protocols for ${hubInfo.title}`,
        subheadline: `${data.subtitle}. Offering expert clinical triage, insurance eligibility guidance, and dedicated hospital transit specifically coordinated for residents and professionals across ${hubInfo.title}.`
      }
    }
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

      {/* Programmatic Geo Hospital Access Banner */}
      <div className="bg-[#0D2137] text-white border-b border-slate-800 py-3 px-4 text-center text-xs sm:text-sm font-bold tracking-wide shadow-sm flex items-center justify-center gap-2 flex-wrap">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
        <span>🏥 HealthFlo Regional Patient Access & Medical Transit Protocol Active for:</span>
        <span className="text-emerald-300 font-black uppercase tracking-wider">{hubInfo.title} ({hubInfo.type})</span>
      </div>

      <SpecialityClientView data={customizedData} />
      <Footer />
      <MobileStickyBar />
    </main>
  );
}
