import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadCapture from "@/sections/LeadCapture";
import FAQ from "@/sections/FAQ";
import {
  getLocationBySlug,
  getNeighbourhoodProcedurePairs,
  fromAreaSlug,
} from "@/data/regionalLocations";
import { specialitiesData } from "@/data/specialities";
import { ChevronRight, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";
import { readSiteConfig } from "@/lib/siteConfig";

// Modular location components
import CityProcedureHero from "@/components/locations/CityProcedureHero";
import CityOfferCard from "@/components/locations/CityOfferCard";
import NeighbourhoodGrid from "@/components/locations/NeighbourhoodGrid";
import CityComparisonPanel from "@/components/locations/CityComparisonPanel";
import ProcedureComparisonTable from "@/components/locations/ProcedureComparisonTable";
import PrivateRecoveryBanner from "@/components/locations/PrivateRecoveryBanner";
import CrossSellProcedures from "@/components/locations/CrossSellProcedures";
import InsuranceCostEstimator from "@/components/analytics/InsuranceCostEstimator";
import RegionalMobileBar from "@/components/locations/RegionalMobileBar";
import HospitalTierBudgetSection from "@/components/locations/HospitalTierBudgetSection";
import PatientJourneySteps from "@/components/locations/PatientJourneySteps";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC PARAMS — Generates pages for every city × neighbourhood × procedure
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const procedureSlugs = Object.keys(specialitiesData);
  const allPairs = getNeighbourhoodProcedurePairs(procedureSlugs);
  // Pre-generate top 150 combinations during build for fast deployment;
  // Next.js handles all remaining 15,000+ hyperlocal pages dynamically on first request!
  return allPairs.slice(0, 150).map(({ state, city, area, procedure }) => ({
    state,
    city,
    procedure,
    area,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — Hyperlocal SEO optimization per neighbourhood × procedure
// ─────────────────────────────────────────────────────────────────────────────
type Props = {
  params: Promise<{ state: string; city: string; procedure: string; area: string }> | { state: string; city: string; procedure: string; area: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const location = getLocationBySlug(resolved.state, resolved.city);
  const procedure = specialitiesData[resolved.procedure];

  if (!location || !procedure) {
    return { title: "Not Found | HealthFlo Surgical Network" };
  }

  const areaName = fromAreaSlug(location, resolved.area);
  const cityProcedureOffer = location.procedureOffers?.[resolved.procedure];
  const offer = cityProcedureOffer ?? location.cityOffer;
  const offerText = offer ? ` ${offer.headline}.` : "";
  const config = await readSiteConfig();

  return {
    title: `${procedure.shortTitle} in ${areaName}, ${location.name} | 100% Insurance Eligible | HealthFlo`,
    description: `Looking for ${procedure.shortTitle.toLowerCase()} near ${areaName}, ${location.name}? HealthFlo surgical network offers USFDA laser suites, 100% Insurance Eligible packages, same-day discharge, and dedicated ${location.nativeLanguage} coordinators.${offerText} Call +91 ${config.helplineNumber}.`,
    keywords: [
      `${procedure.shortTitle} in ${areaName}`,
      `${procedure.shortTitle} near ${areaName} ${location.name}`,
      `laser surgery ${areaName} ${location.name}`,
      `Insurance Eligible ${procedure.shortTitle.toLowerCase()} ${areaName}`,
      `${areaName} ${procedure.shortTitle.toLowerCase()} cost`,
      `${procedure.shortTitle} doctor in ${areaName}`,
      `best hospital for ${procedure.shortTitle.toLowerCase()} near ${areaName}`,
      `same day surgery ${location.name}`,
    ],
    openGraph: {
      title: `${procedure.shortTitle} near ${areaName}, ${location.name} — USFDA Laser Protocols | HealthFlo`,
      description: `Minimally invasive, stitch-free ${procedure.shortTitle.toLowerCase()} accessible from ${areaName} at empanelled hospitals in ${location.name}. Insurance Eligible with dedicated ${location.nativeLanguage} support.`,
      url: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}/${resolved.procedure}/${resolved.area}`,
    },
    alternates: {
      canonical: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}/${resolved.procedure}/${resolved.area}`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default async function NeighbourhoodProcedurePage({ params }: Props) {
  const resolved = await Promise.resolve(params);
  const location = getLocationBySlug(resolved.state, resolved.city);
  const procedure = specialitiesData[resolved.procedure];

  if (!location || !procedure) notFound();

  const areaName = fromAreaSlug(location, resolved.area);
  const activeOffer = location.procedureOffers?.[resolved.procedure] ?? location.cityOffer ?? null;
  const config = await readSiteConfig();

  const WHATSAPP_MSG = `Hello HealthFlo — I am reaching out from ${areaName}, ${location.name} (${location.stateName}). I am seeking ${procedure.shortTitle} and would like to connect with a ${location.nativeLanguage} coordinator. Please share Insurance Eligible package details and transit options.`;
  const WHATSAPP_URL = `https://wa.me/${config.helplineRaw}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  // Hyperlocal JSON-LD: MedicalClinic + MedicalProcedure + ServiceArea targeting neighbourhood
  const neighbourhoodSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        name: `HealthFlo Surgical Network — ${procedure.shortTitle} in ${areaName}, ${location.name}`,
        description: `HealthFlo-empanelled hospitals providing advanced laser ${procedure.shortTitle} for patients residing in ${areaName} and surrounding ${location.name} sectors.`,
        url: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}/${resolved.procedure}/${resolved.area}`,
        telephone: `+${config.helplineRaw}`,
        medicalSpecialty: procedure.category,
        areaServed: {
          "@type": "Place",
          name: areaName,
          containedInPlace: {
            "@type": "City",
            name: location.name,
            containedInPlace: { "@type": "State", name: location.stateName },
          },
        },
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng,
          },
          geoRadius: "30000",
        },
        availableService: {
          "@type": "MedicalProcedure",
          name: procedure.title,
          procedureType: "https://schema.org/SurgicalProcedure",
          bodyLocation: procedure.category,
          preparation: procedure.anesthesia,
          followup: `Recovery: ${procedure.recoveryTime}`,
          howPerformed: procedure.usfdaProtocol,
        },
        availableLanguage: ["en", location.nativeLanguage.toLowerCase().slice(0, 2)],
      },
      {
        "@type": "FAQPage",
        mainEntity: procedure.faqs.slice(0, 3).map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://healthflo.in" },
          { "@type": "ListItem", position: 2, name: "Locations", item: "https://healthflo.in/locations" },
          { "@type": "ListItem", position: 3, name: location.stateName, item: `https://healthflo.in/locations/${location.stateSlug}` },
          { "@type": "ListItem", position: 4, name: location.name, item: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}` },
          { "@type": "ListItem", position: 5, name: procedure.shortTitle, item: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}/${resolved.procedure}` },
          { "@type": "ListItem", position: 6, name: areaName, item: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}/${resolved.procedure}/${resolved.area}` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(neighbourhoodSchema) }}
      />

      <Navbar />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-[90px] md:pt-[140px] pb-32 md:pb-20 relative z-10 flex flex-col gap-16">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 flex-wrap">
          <Link href="/" className="hover:text-[#1D3A6F] transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/locations" className="hover:text-[#1D3A6F] transition-colors">Locations</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/locations/${location.stateSlug}`} className="hover:text-[#1D3A6F] transition-colors">{location.stateName}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/locations/${location.stateSlug}/${location.slug}`} className="hover:text-[#1D3A6F] transition-colors">{location.name}</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/locations/${location.stateSlug}/${location.slug}/${resolved.procedure}`} className="hover:text-[#1D3A6F] transition-colors">{procedure.shortTitle}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1D3A6F] font-extrabold">{areaName}</span>
        </nav>

        {/* Hyperlocal Hero */}
        <CityProcedureHero
          location={location}
          procedure={procedure}
          whatsappUrl={WHATSAPP_URL}
          areaName={areaName}
        />

        {/* 3-Step Scan-Friendly Patient Journey & TPA Process */}
        <PatientJourneySteps
          cityName={location.name}
          nativeLanguage={location.nativeLanguage}
          whatsappUrl={WHATSAPP_URL}
        />

        {/* Hospital Tier & Budget Matching Breakdown */}
        <HospitalTierBudgetSection 
          procedureTitle={procedure.title}
          cityName={location.name}
          nativeLanguage={location.nativeLanguage}
          whatsappUrl={WHATSAPP_URL}
        />

        {/* AI Cashless Surgery & EMI Estimator Engine */}
        <InsuranceCostEstimator defaultProcedure={procedure.title} defaultCity={location.name} defaultState={location.stateName} />

        {/* Hyperlocal Concierge Strip */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0E1C36] via-[#12284C] to-[#0E1C36] border border-blue-500/30 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black px-3 py-1 rounded-full bg-blue-500/20 text-[#00E5FF] uppercase tracking-wider border border-blue-400/30">
                {areaName} Patient Care Protocol
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Priority Admission
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Direct Transit & Admission Assistance from {areaName}
            </h3>
            <p className="text-sm font-medium text-slate-300 leading-relaxed">
              Our dedicated {location.nativeLanguage}-speaking coordinator for {location.name} manages diagnostic sample collection in {areaName}, arranges rapid medical transit, and guarantees transparent hospital empanelment billing with zero upfront surprises.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg"
            >
              <span>Request {areaName} Admission Support</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Special Package Offer */}
        {activeOffer && (
          <CityOfferCard
            offer={activeOffer}
            nativeLanguage={location.nativeLanguage}
            whatsappUrl={WHATSAPP_URL}
          />
        )}

        {/* Neighbourhood Coverage Grid (Allowing users to switch between localities in this city for this procedure) */}
        <NeighbourhoodGrid
          cityName={location.name}
          neighbourhoods={location.keyNeighbourhoods}
          transitTime={location.transitTime}
          railwayStation={location.railwayStation}
          titleOverride={`Explore Other ${location.name} Neighbourhoods for ${procedure.shortTitle}`}
          descriptionOverride={`Switch between sectors across ${location.name} to view dedicated surgical accessibility and transit coverage.`}
          stateSlug={location.stateSlug}
          citySlug={location.slug}
          procedureSlug={resolved.procedure}
          activeAreaSlug={resolved.area}
        />

        {/* Benefits & Local Hospital Comparison */}
        <CityComparisonPanel
          cityName={location.name}
          procedureTitle={procedure.shortTitle}
          benefits={procedure.benefits}
          nativeLanguage={location.nativeLanguage}
          localHospitals={location.localHospitals}
        />

        {/* Laser vs Traditional Surgery Table */}
        <ProcedureComparisonTable
          procedureTitle={procedure.shortTitle}
          comparison={procedure.comparison}
        />

        {/* Private Recovery Option (Honeymoon Spot) */}
        {(resolved.procedure === "circumcision" || resolved.procedure === "laser-piles") && (
          <PrivateRecoveryBanner
            cityName={location.name}
            honeymoonSpot={location.honeymoonSpot}
            whatsappUrl={WHATSAPP_URL}
          />
        )}

        {/* Other procedures available to patients in this area */}
        <CrossSellProcedures
          stateSlug={location.stateSlug}
          citySlug={location.slug}
          cityName={`${areaName}, ${location.name}`}
          currentProcedureId={resolved.procedure}
        />

        {/* Lead Capture and FAQ */}
        <div id="lead-capture" className="space-y-12">
          <LeadCapture />
          <FAQ />
        </div>

        {/* Navigation back links */}
        <div className="text-center pt-4 border-t border-slate-100 space-y-3">
          <Link
            href={`/locations/${location.stateSlug}/${location.slug}/${resolved.procedure}`}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#1D3A6F] hover:text-[#E58325] transition-colors"
          >
            <span>← Back to All {location.name} {procedure.shortTitle} Coverage</span>
          </Link>
          <div className="block">
            <Link
              href={`/locations/${location.stateSlug}/${location.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#1D3A6F] transition-colors"
            >
              <span>← {location.name} Regional Surgical Hub</span>
            </Link>
          </div>
        </div>
      </main>

      <RegionalMobileBar 
        cityName={areaName ? `${areaName}, ${location.name}` : location.name} 
        nativeLanguage={location.nativeLanguage} 
        procedureTitle={procedure.shortTitle} 
        whatsappUrl={WHATSAPP_URL} 
      />

      <Footer />
    </>
  );
}
