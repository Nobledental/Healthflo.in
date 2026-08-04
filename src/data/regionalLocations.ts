// ─────────────────────────────────────────────────────────────────────────────
// HealthFlo Regional Location Data — v3.0 (Modular Multi-State Architecture)
// Architecture: State Hub → City Hub → City×Procedure → Neighbourhood×Procedure
// ─────────────────────────────────────────────────────────────────────────────

import { TAMIL_NADU_LOCATIONS } from "./locations/tamilNadu";
import { KARNATAKA_LOCATIONS } from "./locations/karnataka";
import { TELANGANA_LOCATIONS } from "./locations/telangana";

export type StateSlug = "tamil-nadu" | "karnataka" | "telangana";
export type NativeLanguage = "Tamil" | "Kannada" | "Telugu";

export interface CityOffer {
  badge: string;           // Short label shown on the offer card
  headline: string;        // Main offer headline
  subtext: string;         // Supporting detail
  bundleItems: string[];   // What's included
  urgency?: string;        // Optional scarcity/time signal
}

export interface HoneymoonSpot {
  name: string;
  distance: string;        // "~80 km from Coimbatore"
  description: string;     // Discreet one-liner for couples
}

export interface RegionalLocation {
  // ── Core Identity ──────────────────────────────────────────────────────────
  slug: string;
  stateSlug: StateSlug;
  name: string;
  stateName: string;
  nativeLanguage: NativeLanguage;
  nativeGreeting: string;

  // ── Geographic Intelligence ────────────────────────────────────────────────
  population: number;
  cluster: string;                    // "Western Cluster — Kongu Nadu Hub"
  clusterSlug: string;                // "western-kongu-nadu"
  coordinates: { lat: number; lng: number };
  railwayStation?: string;            // Nearest railway station name

  // ── Hub & Transit ──────────────────────────────────────────────────────────
  hubCity: string;
  transitTime: string;
  description: string;

  // ── SEO Hyperlocal Weapons ────────────────────────────────────────────────
  keyNeighbourhoods: string[];         // Exact searchable locality names
  localHospitals: string[];           // Competitor hospitals — shown for trust context

  // ── Procedure Availability ────────────────────────────────────────────────
  specializedProcedures: string[];    // Legacy — shown on city hub cards

  // ── Business Intelligence ─────────────────────────────────────────────────
  cityOffer?: CityOffer;              // City-level promotional package
  procedureOffers?: Partial<Record<string, CityOffer>>; // Per-procedure overrides

  // ── Lifestyle (Private / Discreet Use) ────────────────────────────────────
  honeymoonSpot?: HoneymoonSpot;
}

// ─────────────────────────────────────────────────────────────────────────────
// MASTER REGIONAL LOCATIONS REGISTRY
// ─────────────────────────────────────────────────────────────────────────────
export const REGIONAL_LOCATIONS: RegionalLocation[] = [
  ...TAMIL_NADU_LOCATIONS,
  ...KARNATAKA_LOCATIONS,
  ...TELANGANA_LOCATIONS,
];

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

export function getLocationsByState(stateSlug: StateSlug): RegionalLocation[] {
  return REGIONAL_LOCATIONS.filter((loc) => loc.stateSlug === stateSlug);
}

export function getLocationBySlug(stateSlug: string, slug: string): RegionalLocation | undefined {
  return REGIONAL_LOCATIONS.find((loc) => loc.stateSlug === stateSlug && loc.slug === slug);
}

export function getLocationsByCluster(clusterSlug: string): RegionalLocation[] {
  return REGIONAL_LOCATIONS.filter((loc) => loc.clusterSlug === clusterSlug);
}

export function getAllTamilNaduSlugs(): { stateSlug: string; slug: string }[] {
  return REGIONAL_LOCATIONS
    .filter((loc) => loc.stateSlug === "tamil-nadu")
    .map((loc) => ({ stateSlug: loc.stateSlug, slug: loc.slug }));
}

export function getCityProcedurePairs(
  procedureSlugs: string[]
): { stateSlug: string; citySlug: string; procedureSlug: string }[] {
  return REGIONAL_LOCATIONS.flatMap((loc) =>
    procedureSlugs.map((proc) => ({
      stateSlug: loc.stateSlug,
      citySlug: loc.slug,
      procedureSlug: proc,
    }))
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HYPERLOCAL NEIGHBOURHOOD ROUTING HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export function toAreaSlug(areaName: string): string {
  return areaName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function fromAreaSlug(location: RegionalLocation | undefined, areaSlug: string): string {
  if (!location) {
    // Fallback: title case the slug
    return areaSlug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const match = location.keyNeighbourhoods.find((area) => toAreaSlug(area) === areaSlug);
  if (match) return match;

  // Fallback if not found in array
  return areaSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getNeighbourhoodProcedurePairs(
  procedureSlugs: string[]
): { state: string; city: string; area: string; procedure: string }[] {
  return REGIONAL_LOCATIONS.flatMap((loc) =>
    loc.keyNeighbourhoods.flatMap((nh) =>
      procedureSlugs.map((proc) => ({
        state: loc.stateSlug,
        city: loc.slug,
        area: toAreaSlug(nh),
        procedure: proc,
      }))
    )
  );
}
