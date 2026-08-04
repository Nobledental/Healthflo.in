"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SiteConfig } from "@/lib/siteConfig";

const DEFAULT_CONFIG_STATE: SiteConfig = {
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
    facebook: "https://facebook.com/healthflo.surgical.network"
  },
  seo: {
    siteTitle: "HealthFlo Surgical Network | Advanced Laser & Laparoscopic Care in Tamil Nadu, Karnataka & Hyderabad",
    siteDescription: "Precision USFDA surgical treatments with instant 100% cashless approval across Tamil Nadu, Karnataka & Telangana. Free travel coordination for town & village patients.",
    geoRegion: "IN-TN, IN-KA, IN-TG",
    geoPlacename: "Chennai, Bengaluru, Hyderabad, Coimbatore",
    geoPosition: "13.0827;80.2707"
  }
};

interface SiteConfigContextType {
  config: SiteConfig;
  isLoading: boolean;
  refreshConfig: () => Promise<void>;
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: DEFAULT_CONFIG_STATE,
  isLoading: true,
  refreshConfig: async () => {}
});

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG_STATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/config", { cache: "no-store" });
      const data = await res.json();
      if (data.success && data.config) {
        setConfig(data.config);
      }
    } catch (err) {
      console.error("Error synchronizing live Directorate site configuration:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
    
    // Set up interactive listener so admin saves update open tabs instantly via storage events
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "healthflo_config_updated") {
        fetchConfig();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, isLoading, refreshConfig: fetchConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig(): SiteConfigContextType {
  return useContext(SiteConfigContext);
}
