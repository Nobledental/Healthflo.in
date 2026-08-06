import fs from "fs/promises";
import path from "path";

// ─────────────────────────────────────────────────────────────────────────────
// HealthFlo Global Site, Contact, SEO & GEO Configuration Hub
// Centralized state engine supporting real-time broadcast across all routes
// ─────────────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  helplineNumber: string;
  helplineRaw: string;
  email: string;
  directorateEmail: string;
  corporateAddress: string;
  regionalAddresses: {
    tamilNadu: string;
    karnataka: string;
    telangana: string;
  };
  socials: {
    whatsapp: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    facebook: string;
    youtube?: string;
  };
  seo: {
    siteTitle: string;
    siteDescription: string;
    geoRegion: string; // e.g. "IN-TN, IN-KA, IN-TG"
    geoPlacename: string; // e.g. "Chennai, Bengaluru, Hyderabad"
    geoPosition: string; // e.g. "13.0827;80.2707"
  };
}

const DEFAULT_SITE_CONFIG: SiteConfig = {
  helplineNumber: "+91 93636 50066",
  helplineRaw: "919363650066",
  email: "care@healthflo.in",
  directorateEmail: "director@healthflo.in",
  corporateAddress: "HealthFlo Surgical Network Directorate, Greams Road IT Hub & OMR Healthcare Corridor, Chennai, Tamil Nadu 600006",
  regionalAddresses: {
    tamilNadu: "Level 4, OMR Healthcare & Tech Parkway, Chennai 600096 • Coimbatore RS Puram Hub",
    karnataka: "HealthFlo Precision Suite, Indiranagar 100ft Rd & Whitefield IT Corridor, Bengaluru 560038",
    telangana: "Advanced Daycare Enclave, Road No. 36, Jubilee Hills & Hitec City, Hyderabad 500033"
  },
  socials: {
    whatsapp: "https://wa.me/919363650066?text=Hello%20HealthFlo%20team,%20I%20would%20like%20to%20consult%20a%20surgical%20coordinator%20regarding%20packages,%20insurance%20eligibility,%20and%20transit.",
    instagram: "https://instagram.com/healthflo.surgical",
    linkedin: "https://linkedin.com/company/healthflo-meditech",
    twitter: "https://twitter.com/healthflo_in",
    facebook: "https://facebook.com/healthflo.surgical.network",
    youtube: "https://youtube.com/@healthflomeditech"
  },
  seo: {
    siteTitle: "HealthFlo Surgical Network | Advanced Laser & Laparoscopic Care in Tamil Nadu, Karnataka & Hyderabad",
    siteDescription: "Precision USFDA surgical treatments with dedicated 100% cashless insurance support across Tamil Nadu, Karnataka & Telangana. Free travel coordination for town & village patients.",
    geoRegion: "IN-TN, IN-KA, IN-TG",
    geoPlacename: "Chennai, Bengaluru, Hyderabad, Coimbatore",
    geoPosition: "13.0827;80.2707"
  }
};

const CONFIG_DIR = path.join(process.cwd(), ".secure_data");
const CONFIG_FILE = path.join(CONFIG_DIR, "site_config.json");

async function ensureConfigExists(): Promise<void> {
  try {
    await fs.mkdir(CONFIG_DIR, { recursive: true });
  } catch {}

  try {
    await fs.access(CONFIG_FILE);
  } catch {
    await fs.writeFile(CONFIG_FILE, JSON.stringify(DEFAULT_SITE_CONFIG, null, 2), "utf8");
  }
}

function sanitizeSiteConfig(cfg: SiteConfig): SiteConfig {
  return {
    ...cfg,
    helplineRaw: (cfg.helplineRaw || "").toString().replace(/\D/g, "") || "919363650066",
  };
}

export async function readSiteConfig(): Promise<SiteConfig> {
  await ensureConfigExists();
  try {
    const data = await fs.readFile(CONFIG_FILE, "utf8");
    const parsed = JSON.parse(data);
    return sanitizeSiteConfig({ ...DEFAULT_SITE_CONFIG, ...parsed });
  } catch (err) {
    console.error("Failed to read site config file, using default parameters:", err);
    return sanitizeSiteConfig(DEFAULT_SITE_CONFIG);
  }
}

export async function writeSiteConfig(newConfig: Partial<SiteConfig>): Promise<SiteConfig> {
  await ensureConfigExists();
  const current = await readSiteConfig();
  const merged: SiteConfig = sanitizeSiteConfig({
    ...current,
    ...newConfig,
    regionalAddresses: { ...current.regionalAddresses, ...(newConfig.regionalAddresses || {}) },
    socials: { ...current.socials, ...(newConfig.socials || {}) },
    seo: { ...current.seo, ...(newConfig.seo || {}) }
  });

  try {
    await fs.writeFile(CONFIG_FILE, JSON.stringify(merged, null, 2), "utf8");
  } catch (err) {
    console.error("Failed saving site config to disk:", err);
  }

  return merged;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  return await readSiteConfig();
}
