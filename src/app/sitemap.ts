import { MetadataRoute } from 'next';
import { REGIONAL_LOCATIONS } from '@/data/regionalLocations';
import { specialitiesData } from '@/data/specialities';

const BASE_URL = 'https://healthflo.in';
const SITE_LAST_MOD = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // 1. Root Core Surgical Portal & Specialities Master Hub
  const rootRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/specialities`,
      lastModified: SITE_LAST_MOD,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
  ];

  // 2. Individual Daycare Speciality Landing Pages
  const specialityRoutes: MetadataRoute.Sitemap = Object.keys(specialitiesData).map((slug) => ({
    url: `${BASE_URL}/specialities/${slug}`,
    lastModified: SITE_LAST_MOD,
    changeFrequency: 'weekly',
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
        changeFrequency: 'monthly',
        priority: 0.85,
      });
    });
  });

  // 4. Regional State & Town Triage Desks
  const regionalRoutes: MetadataRoute.Sitemap = REGIONAL_LOCATIONS.map((loc) => ({
    url: `${BASE_URL}/locations/${loc.stateSlug}/${loc.slug}`,
    lastModified: SITE_LAST_MOD,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...rootRoutes, ...specialityRoutes, ...programmaticRoutes, ...regionalRoutes];
}
