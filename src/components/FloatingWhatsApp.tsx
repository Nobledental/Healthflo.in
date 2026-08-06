"use client";

import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function FloatingWhatsApp() {
  const { config } = useSiteConfig();
  const [isVisible, setIsVisible] = useState(false);

  // Show after scrolling down slightly to avoid blocking hero content immediately
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const defaultMessage = "Hello HealthFlo, I would like to book a consultation.";
  const whatsappUrl = `https://wa.me/${config.helplineRaw}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-8 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl transition-transform hover:scale-110 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 duration-300"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      {/* Optional: Add a small ping indicator */}
      <span className="absolute top-0 right-0 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-white"></span>
      </span>
    </a>
  );
}
