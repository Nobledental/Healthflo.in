"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { usePageTracker } from "@/hooks/usePageTracker";
import { useVisitorLocation } from "@/hooks/useVisitorLocation";

// ─────────────────────────────────────────────────────────────────────────────
// Client Telemetry & Coordinator Patient Care Listener
// Purpose: Silently logs visitor journey across regional hubs to empower health
// coordinators with empathetic, localized context upon triage call initiation.
// Legal Safe Harbor: DPDP Compliant Support Note Telemetry.
// ─────────────────────────────────────────────────────────────────────────────

export default function CoordinatorIntelligenceTracker() {
  usePageTracker();
  const pathname = usePathname() || "/";
  const { city, state } = useVisitorLocation();
  const sessionIdRef = useRef<string>("");
  const pagesViewedRef = useRef<string[]>([]);
  
  const locationRef = useRef({ city, state });
  locationRef.current = { city, state };

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
    if (!pathname || !sessionIdRef.current || pathname.startsWith("/admin")) return;
    
    // Avoid re-logging exact same consecutive page view
    if (pagesViewedRef.current[pagesViewedRef.current.length - 1] !== pathname) {
      pagesViewedRef.current.push(pathname);
    }

    // Send anonymous background telemetry pulse to coordinator note engine with reliable geo hub
    const timer = setTimeout(() => {
      fetch("/api/coordinator/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          city: locationRef.current.city,
          state: locationRef.current.state,
          pagesViewed: pagesViewedRef.current,
          lastClickedElement: pathname === "/" ? "Viewing Home Page" : `Viewing ${pathname}`,
          searchQueries: [],
        }),
      }).catch(() => {
        // Silently swallow errors to ensure zero UX disruption
      });
    }, 1500); // 1.5s debounce to allow accurate geo location resolution before sending

    return () => clearTimeout(timer);
  }, [pathname, city, state]);

  // Active Dwell-Time Intelligence: Detect high surgical consultation intent after 45s of engagement
  useEffect(() => {
    if (!pathname || !sessionIdRef.current || pathname.startsWith("/admin")) return;
    const dwellTimer = setTimeout(() => {
      const pageName = pathname === "/" ? "Main Hospital Network Homepage" : pathname.replace("/", " ").toUpperCase();
      fetch("/api/coordinator/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          city: locationRef.current.city,
          state: locationRef.current.state,
          pagesViewed: pagesViewedRef.current,
          lastClickedElement: `Active Reading (${pathname})`,
          coordinatorClinicalNote: `High Clinical Intent: Patient has spent significant time (>45s) reviewing ${pageName}. Ready for surgical consultation guidance.`
        }),
      }).catch(() => {});
    }, 45000); // 45 seconds active dwell

    return () => clearTimeout(dwellTimer);
  }, [pathname, city, state]);

  // Global click event capture for high-intent conversion buttons
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
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
        const pageName = pathname === "/" ? "Home Page" : pathname.replace("/", " ");
        fetch("/api/coordinator/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: sessionIdRef.current,
            city: locationRef.current.city,
            state: locationRef.current.state,
            pagesViewed: pagesViewedRef.current,
            lastClickedElement: `Button clicked: [${buttonText}]`,
            coordinatorClinicalNote: `Urgent Patient Activity: Patient clicked on '${buttonText}' while reading the ${pageName} section. Doctor or care coordinator advised to verify hospital schedule and assist.`
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
