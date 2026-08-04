"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// Client Telemetry & Coordinator Patient Care Listener
// Purpose: Silently logs visitor journey across regional hubs to empower health
// coordinators with empathetic, localized context upon triage call initiation.
// Legal Safe Harbor: DPDP Compliant Support Note Telemetry.
// ─────────────────────────────────────────────────────────────────────────────

export default function CoordinatorIntelligenceTracker() {
  const pathname = usePathname();
  const sessionIdRef = useRef<string>("");
  const pagesViewedRef = useRef<string[]>([]);

  useEffect(() => {
    // Generate or retrieve persistent browser session ID for session continuation
    let sId = sessionStorage.getItem("healthflo_session_id");
    if (!sId) {
      sId = `SESS_WEB_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      sessionStorage.setItem("healthflo_session_id", sId);
    }
    sessionIdRef.current = sId;
  }, []);

  useEffect(() => {
    if (!pathname || !sessionIdRef.current) return;
    
    // Avoid re-logging exact same consecutive page view
    if (pagesViewedRef.current[pagesViewedRef.current.length - 1] !== pathname) {
      pagesViewedRef.current.push(pathname);
    }

    // Determine estimated regional cluster & state from pathname
    let state = "Tamil Nadu";
    let city = "South India Regional Hub";
    if (pathname.includes("karnataka") || pathname.includes("bengaluru") || pathname.includes("mysuru")) {
      state = "Karnataka";
      city = pathname.includes("bengaluru") ? "Bengaluru Cluster" : "Karnataka Regional Hub";
    } else if (pathname.includes("telangana") || pathname.includes("hyderabad") || pathname.includes("warangal")) {
      state = "Telangana";
      city = pathname.includes("hyderabad") ? "Hyderabad Metro Cluster" : "Telangana Regional Hub";
    } else if (pathname.includes("chennai") || pathname.includes("coimbatore")) {
      state = "Tamil Nadu";
      city = pathname.includes("chennai") ? "Chennai Metro Cluster" : "Coimbatore Western Hub";
    }

    // Send anonymous background telemetry pulse to coordinator note engine
    const timer = setTimeout(() => {
      fetch("/api/coordinator/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          city,
          state,
          pagesViewed: pagesViewedRef.current,
          lastClickedElement: `Navigated to ${pathname}`,
          searchQueries: [],
        }),
      }).catch(() => {
        // Silently swallow errors to ensure zero UX disruption
      });
    }, 1200); // 1.2s debounce to verify intentional page dwell

    return () => clearTimeout(timer);
  }, [pathname]);

  // Global click event capture for high-intent conversion buttons
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest("button, a") as HTMLElement;
      if (!button) return;

      const buttonText = button.innerText?.trim() || button.getAttribute("aria-label") || "";
      // Only capture significant action clicks (packages, insurance, callbacks)
      if (
        /claim|insurance|package|whatsapp|call|triage|book|eligibility|cost|network/i.test(buttonText) &&
        buttonText.length < 60
      ) {
        fetch("/api/coordinator/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            pagesViewed: pagesViewedRef.current,
            lastClickedElement: `Action Button: [${buttonText}]`,
            coordinatorClinicalNote: `High-Intent Telemetry: Visitor activated '${buttonText}' on route ${pathname}. Coordinator advised to verify empanelled hospital availability for immediate consultation.`
          }),
        }).catch(() => {});
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [pathname]);

  // Renderless telemetry provider
  return null;
}
