"use client";

import { useEffect } from "react";

export default function PremiumSmoothScroll() {
  useEffect(() => {
    // Safely apply fluid smooth scrolling and momentum without hijacking native browser mouse wheel events
    const documentEl = document.documentElement;
    
    // Ensure smooth scroll behavior is enabled globally
    documentEl.style.scrollBehavior = "smooth";

    return () => {
      documentEl.style.scrollBehavior = "auto";
    };
  }, []);

  return null;
}
