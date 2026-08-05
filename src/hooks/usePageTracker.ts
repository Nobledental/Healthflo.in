/**
 * usePageTracker — lightweight client-side page-view tracker.
 * Call once in the root layout or each page. Fires once per mount.
 * Respects Do Not Track and skips admin pages.
 */
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function usePageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Skip admin pages & respect DNT
    if (pathname?.startsWith("/admin")) return;
    if (navigator.doNotTrack === "1") return;

    const referrer = document.referrer || "";

    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: pathname, referrer }),
      // fire-and-forget — don't await
    }).catch(() => {/* silently swallow */});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
}
