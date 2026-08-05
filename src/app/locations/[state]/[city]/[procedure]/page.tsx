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
  getCityProcedurePairs,
} from "@/data/regionalLocations";
import { specialitiesData } from "@/data/specialities";
import { ChevronRight } from "lucide-react";
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
import GoogleTrendsEEATBanner from "@/components/seo/GoogleTrendsEEATBanner";
import HospitalTierBudgetSection from "@/components/locations/HospitalTierBudgetSection";
import PatientJourneySteps from "@/components/locations/PatientJourneySteps";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC PARAMS — Generates one page per city × procedure combination
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const procedureSlugs = Object.keys(specialitiesData);
  return getCityProcedurePairs(procedureSlugs).map(({ stateSlug, citySlug, procedureSlug }) => ({
    state: stateSlug,
    city: citySlug,
    procedure: procedureSlug,
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// METADATA — Unique per city × procedure
// ─────────────────────────────────────────────────────────────────────────────
type Props = {
  params: Promise<{ state: string; city: string; procedure: string }> | { state: string; city: string; procedure: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const location = getLocationBySlug(resolved.state, resolved.city);
  const procedure = specialitiesData[resolved.procedure];

  if (!location || !procedure) {
    return { title: "Not Found | HealthFlo Surgical Network" };
  }

  const cityProcedureOffer = location.procedureOffers?.[resolved.procedure];
  const offer = cityProcedureOffer ?? location.cityOffer;
  const offerText = offer ? ` ${offer.headline}.` : "";

  const primaryNeighbourhood = location.keyNeighbourhoods[0] ?? location.name;
  const secondaryNeighbourhood = location.keyNeighbourhoods[1] ?? primaryNeighbourhood;
  const config = await readSiteConfig();

  return {
    title: `${procedure.shortTitle} in ${location.name} — ${primaryNeighbourhood} & ${secondaryNeighbourhood} | HealthFlo`,
    description: `Insurance Eligible ${procedure.shortTitle.toLowerCase()} in ${location.name}, ${location.stateName}. Serving ${location.keyNeighbourhoods.slice(0, 4).join(", ")} and surrounding areas.${offerText} Same-day discharge. ${location.nativeLanguage} coordinator. Call +91 ${config.helplineNumber}.`,
    keywords: [
      `${procedure.shortTitle} in ${location.name}`,
      `${procedure.shortTitle} near ${primaryNeighbourhood}`,
      `${procedure.shortTitle} ${secondaryNeighbourhood}`,
      `laser surgery ${location.name} ${location.stateName}`,
      `Insurance Eligible ${procedure.shortTitle.toLowerCase()} ${location.name}`,
      `${location.name} ${procedure.shortTitle.toLowerCase()} cost`,
      `${procedure.shortTitle} ${location.name} hospital`,
      `same day surgery ${location.name}`,
    ],
    openGraph: {
      title: `${procedure.shortTitle} in ${location.name} — Same-Day Discharge | HealthFlo`,
      description: `Minimally invasive, stitch-free ${procedure.shortTitle.toLowerCase()} at HealthFlo-empanelled hospitals in ${location.name}. Insurance Eligible with transparent hospital tier budget matching and ${location.nativeLanguage} coordinator support across ${location.name}.`,
      url: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}/${resolved.procedure}`,
    },
    alternates: {
      canonical: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}/${resolved.procedure}`,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default async function CityProcedurePage({ params }: Props) {
  const resolved = await Promise.resolve(params);
  const location = getLocationBySlug(resolved.state, resolved.city);
  const procedure = specialitiesData[resolved.procedure];

  if (!location || !procedure) notFound();

  const activeOffer = location.procedureOffers?.[resolved.procedure] ?? location.cityOffer ?? null;
  const config = await readSiteConfig();

  const WHATSAPP_MSG = `Hello HealthFlo — I am from ${location.name}, ${location.stateName}. I am looking for ${procedure.shortTitle} and would like to speak with a ${location.nativeLanguage} coordinator. Please share Insurance Eligible package details.`;
  const WHATSAPP_URL = `https://wa.me/${config.helplineRaw}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  // JSON-LD: MedicalClinic + MedicalProcedure + ServiceArea
  const cityProcedureSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        name: `HealthFlo Surgical Network — ${procedure.shortTitle} in ${location.name}`,
        description: `HealthFlo-empanelled hospitals providing ${procedure.shortTitle} in ${location.name}, ${location.stateName}.`,
        url: `https://healthflo.in/locations/${location.stateSlug}/${location.slug}/${resolved.procedure}`,
        telephone: `+${config.helplineRaw}`,
        medicalSpecialty: procedure.category,
        areaServed: {
          "@type": "City",
          name: location.name,
          containedInPlace: { "@type": "State", name: location.stateName },
        },
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: location.coordinates.lat,
            longitude: location.coordinates.lng,
          },
          geoRadius: "80000",
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
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityProcedureSchema) }}
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
          <span className="text-[#1D3A6F] font-extrabold">{procedure.shortTitle}</span>
        </nav>

        {/* Hero */}
        <CityProcedureHero
          location={location}
          procedure={procedure}
          whatsappUrl={WHATSAPP_URL}
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

        {/* Special Package Offer */}
        {activeOffer && (
          <CityOfferCard
            offer={activeOffer}
            nativeLanguage={location.nativeLanguage}
            whatsappUrl={WHATSAPP_URL}
          />
        )}

        {/* Neighbourhood Coverage Grid */}
        <NeighbourhoodGrid
          cityName={location.name}
          neighbourhoods={location.keyNeighbourhoods}
          transitTime={location.transitTime}
          railwayStation={location.railwayStation}
          titleOverride={`${procedure.shortTitle} Available Across ${location.name} Neighbourhoods`}
          stateSlug={location.stateSlug}
          citySlug={location.slug}
          procedureSlug={resolved.procedure}
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

        {/* Other procedures in this city */}
        <CrossSellProcedures
          stateSlug={location.stateSlug}
          citySlug={location.slug}
          cityName={location.name}
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
            href={`/locations/${location.stateSlug}/${location.slug}`}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#1D3A6F] hover:text-[#E58325] transition-colors"
          >
            <span>← View All Procedures Available in {location.name}</span>
          </Link>
          <div className="block">
            <Link
              href="/locations"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-[#1D3A6F] transition-colors"
            >
              <span>← Regional Hospital Network Directory</span>
            </Link>
          </div>
        </div>

        <GoogleTrendsEEATBanner 
          cityName={location.name}
          stateName={location.stateName}
          procedureTitle={procedure.title}
        />
      </main>

      <RegionalMobileBar 
        cityName={location.name} 
        nativeLanguage={location.nativeLanguage} 
        procedureTitle={procedure.shortTitle} 
        whatsappUrl={WHATSAPP_URL} 
      />

      <Footer />
    </>
  );
}
