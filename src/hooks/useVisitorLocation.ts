"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export interface VisitorLocation {
  city: string;
  state: string;
  loading: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Visitor Location Resolver Hook
// Purpose: Synchronizes location state across Landing Page Hero badge and
// Admin Coordinator Intelligence Tracker so doctors and patients always see the
// exact same unified regional hub classification.
// ─────────────────────────────────────────────────────────────────────────────

export function useVisitorLocation(): VisitorLocation {
  const pathname = usePathname() || "";
  const [location, setLocation] = useState<VisitorLocation>({
    city: "Hyderabad Metro Area (Telangana Hub)",
    state: "Telangana",
    loading: true,
  });

  useEffect(() => {
    let active = true;

    // Clear obsolete legacy geo cache that forced Tamil Nadu during local development
    try {
      sessionStorage.removeItem("healthflo_geo_cache");
    } catch {}

    // 1. If URL pathname explicitly corresponds to a specific hub page, reflect that center for UI display
    // but do NOT overwrite the physical device location in storage!
    const lowerPath = pathname.toLowerCase();
    if (lowerPath.includes("karnataka") || lowerPath.includes("bengaluru") || lowerPath.includes("mysuru")) {
      const explicitLoc = {
        city: lowerPath.includes("bengaluru") ? "Bengaluru Tech & Metro Hub" : "Karnataka Medical Cluster",
        state: "Karnataka",
        loading: false
      };
      if (active) setLocation(explicitLoc);
      return;
    } else if (lowerPath.includes("telangana") || lowerPath.includes("hyderabad") || lowerPath.includes("warangal")) {
      const explicitLoc = {
        city: lowerPath.includes("hyderabad") ? "Hyderabad Metro Area (Telangana Hub)" : "Telangana Medical Cluster",
        state: "Telangana",
        loading: false
      };
      if (active) setLocation(explicitLoc);
      return;
    } else if (lowerPath.includes("chennai") || lowerPath.includes("coimbatore")) {
      const explicitLoc = {
        city: lowerPath.includes("chennai") ? "Chennai Metro Hub" : "Coimbatore Western Hub",
        state: "Tamil Nadu",
        loading: false
      };
      if (active) setLocation(explicitLoc);
      return;
    }

    // 2. Check if we already cached the real verified location in sessionStorage
    try {
      const cached = sessionStorage.getItem("healthflo_geo_v3");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.city && parsed.state) {
          if (active) setLocation({ city: parsed.city, state: parsed.state, loading: false });
          return;
        }
      }
    } catch {}

    // 3. Otherwise fetch from our resilient internal server location resolver (which discovers real public IP)
    fetch("/api/analytics/location")
      .then((res) => res.json())
      .then((data) => {
        if (!active) return;
        if (data && data.success && data.city && data.state) {
          const newLoc = { city: data.city, state: data.state, loading: false };
          setLocation(newLoc);
          try { sessionStorage.setItem("healthflo_geo_v3", JSON.stringify(newLoc)); } catch {}
        } else {
          setLocation((prev) => ({ ...prev, loading: false }));
        }
      })
      .catch(() => {
        if (active) setLocation((prev) => ({ ...prev, loading: false }));
      });

    return () => { active = false; };
  }, [pathname]);

  return location;
}
