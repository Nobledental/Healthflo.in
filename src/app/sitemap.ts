import { MetadataRoute } from 'next';
import { REGIONAL_LOCATIONS } from '@/data/regionalLocations';
import { specialitiesData } from '@/data/specialities';

const BASE_URL = 'https://healthflo.in';
const SITE_LAST_MOD = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Root Core Surgical Portal & Master Landing Hubs
  const rootRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/specialities`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/locations`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/ai`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'daily',
      priority: 0.90,
    },
    {
      url: `${BASE_URL}/product`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.90,
    },
    {
      url: `${BASE_URL}/login/patient`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
    {
      url: `${BASE_URL}/login/hospital`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'monthly',
      priority: 0.80,
    },
  ];

  // 2. Individual Daycare Speciality Landing Pages
  const specialityRoutes: MetadataRoute.Sitemap = Object.keys(specialitiesData).map((slug) => ({
    url: `${BASE_URL}/specialities/${slug}`,
    lastModified: SITE_LAST_MOD,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 3. Programmatic Micro-Location Surgical Action Corridors
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
    "salem-cashless-laser-center"
  ];

  const programmaticRoutes: MetadataRoute.Sitemap = [];
  Object.keys(specialitiesData).forEach((slug) => {
    sampleHubs.forEach((hub) => {
      programmaticRoutes.push({
        url: `${BASE_URL}/specialities/${slug}/${hub}`,
        lastModified: SITE_LAST_MOD,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  // 4. Regional State Triage Desks (Tamil Nadu, Karnataka, Telangana)
  const uniqueStates = Array.from(new Set(REGIONAL_LOCATIONS.map(loc => loc.stateSlug)));
  const stateRoutes: MetadataRoute.Sitemap = uniqueStates.map((stateSlug) => ({
    url: `${BASE_URL}/locations/${stateSlug}`,
    lastModified: SITE_LAST_MOD,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 5. Regional City & Town Triage Desks
  const regionalCityRoutes: MetadataRoute.Sitemap = REGIONAL_LOCATIONS.map((loc) => ({
    url: `${BASE_URL}/locations/${loc.stateSlug}/${loc.slug}`,
    lastModified: SITE_LAST_MOD,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 6. ALL 975+ Regional City Procedure Portal Links (Dynamically Generated)
  // Whenever any new city or procedure is added to regionalLocations.ts or specialities.ts,
  // Next.js automatically generates all corresponding URL combinations for Google Search engines!
  const regionalProcedureRoutes: MetadataRoute.Sitemap = [];
  REGIONAL_LOCATIONS.forEach((loc) => {
    Object.keys(specialitiesData).forEach((procSlug) => {
      regionalProcedureRoutes.push({
        url: `${BASE_URL}/locations/${loc.stateSlug}/${loc.slug}/${procSlug}`,
        lastModified: SITE_LAST_MOD,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });
  });

  return [
    ...rootRoutes, 
    ...specialityRoutes, 
    ...programmaticRoutes, 
    ...stateRoutes, 
    ...regionalCityRoutes, 
    ...regionalProcedureRoutes
  ];
}
