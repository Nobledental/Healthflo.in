import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import SpeculationRules from "@/components/SpeculationRules";
import UIProtector from "@/components/UIProtector";
import CoordinatorIntelligenceTracker from "@/components/analytics/CoordinatorIntelligenceTracker";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0066FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "HealthFlo Surgical Network | Advanced Laser & Laparoscopic Care in Tamil Nadu, Karnataka & Hyderabad",
    template: "%s | HealthFlo Surgical Network",
  },
  description:
    "Experience precision USFDA laser and laparoscopic surgery across Tamil Nadu, Karnataka, and Hyderabad. Serving all cities, towns, and villages with 100% cashless insurance approval, zero upfront cost, same-day discharge, and free hospital transit assistance.",
  keywords: [
    "HealthFlo surgical network",
    "Laser surgery hospital Tamil Nadu",
    "Laser piles doctor Karnataka",
    "Cashless surgery Hyderabad",
    "Laparoscopic hernia specialist Chennai",
    "Laser urology circumcision Bangalore",
    "Coimbatore Madurai Salem surgical hospital",
    "Mysuru Hubballi Mangaluru surgery center",
    "Warangal Karimnagar hospital network",
    "Tamil Kannada Telugu medical triage",
    "Rural surgical transit support India",
    "USFDA laser proctology fistula fissure",
    "No cost EMI surgical packages India",
  ],
  authors: [{ name: "HealthFlo Medical Board & Clinical Council" }],
  creator: "HealthFlo Surgical Healthcare Network",
  publisher: "HealthFlo India",
  metadataBase: new URL("https://healthflo.in"),
  alternates: {
    canonical: "https://healthflo.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://healthflo.in",
    siteName: "HealthFlo Surgical Network",
    title: "HealthFlo Surgical Network | Laser & Laparoscopic Care Across TN, KA & TS",
    description:
      "Precision USFDA surgical treatments with instant 100% cashless approval across Tamil Nadu, Karnataka & Telangana. Free travel coordination for town & village patients.",
    images: [
      {
        url: "/og-banner.jpg",
        width: 1200,
        height: 630,
        alt: "HealthFlo Accredited Surgical Network - Tamil Nadu, Karnataka & Hyderabad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HealthFlo Surgical Network | Pan-TN, KA & TS Healthcare",
    description:
      "Advanced laser proctology, laparoscopy & urology with 100% cashless insurance coverage across Tamil Nadu, Karnataka, and Hyderabad.",
    images: ["/og-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enterprise Medical Schema & Regional Coverage JSON-LD for Google & AI Search (Perplexity, ChatGPT, SGE)
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalOrganization",
        "@id": "https://healthflo.in/#organization",
        "name": "HealthFlo Surgical Network",
        "url": "https://healthflo.in",
        "logo": "https://healthflo.in/logo.png",
        "description":
          "Premier NABH-accredited surgical healthcare network specializing in USFDA laser proctology, laparoscopic general surgery, urology, and vascular procedures across Tamil Nadu, Karnataka, and Telangana.",
        "telephone": "+919363650066",
        "email": "care@healthflo.in",
        "areaServed": [
          {
            "@type": "State",
            "name": "Tamil Nadu",
            "containsPlace": [
              { "@type": "City", "name": "Chennai" },
              { "@type": "City", "name": "Coimbatore" },
              { "@type": "City", "name": "Madurai" },
              { "@type": "City", "name": "Tiruchirappalli" },
              { "@type": "City", "name": "Salem" },
              { "@type": "City", "name": "Tirunelveli" },
              { "@type": "City", "name": "Vellore" },
              { "@type": "City", "name": "Erode" },
              { "@type": "City", "name": "Thanjavur" },
              { "@type": "City", "name": "Dindigul" },
              { "@type": "City", "name": "Nagarcoil" }
            ]
          },
          {
            "@type": "State",
            "name": "Karnataka",
            "containsPlace": [
              { "@type": "City", "name": "Bengaluru" },
              { "@type": "City", "name": "Mysuru" },
              { "@type": "City", "name": "Hubballi-Dharwad" },
              { "@type": "City", "name": "Mangaluru" },
              { "@type": "City", "name": "Belagavi" },
              { "@type": "City", "name": "Kalaburagi" },
              { "@type": "City", "name": "Davangere" },
              { "@type": "City", "name": "Bellary" },
              { "@type": "City", "name": "Shimoga" },
              { "@type": "City", "name": "Tumakuru" }
            ]
          },
          {
            "@type": "State",
            "name": "Telangana & Hyderabad Region",
            "containsPlace": [
              { "@type": "City", "name": "Hyderabad" },
              { "@type": "City", "name": "Secunderabad" },
              { "@type": "City", "name": "Warangal" },
              { "@type": "City", "name": "Nizamabad" },
              { "@type": "City", "name": "Karimnagar" },
              { "@type": "City", "name": "Khammam" },
              { "@type": "City", "name": "Mahbubnagar" },
              { "@type": "City", "name": "Nalgonda" }
            ]
          }
        ],
        "availableLanguage": [
          { "@type": "Language", "name": "English", "alternateName": "en" },
          { "@type": "Language", "name": "Tamil", "alternateName": "ta" },
          { "@type": "Language", "name": "Kannada", "alternateName": "kn" },
          { "@type": "Language", "name": "Telugu", "alternateName": "te" },
          { "@type": "Language", "name": "Hindi", "alternateName": "hi" }
        ],
        "medicalSpecialty": [
          "ColorectalSurgery",
          "UrologicSurgery",
          "GeneralSurgery",
          "VascularSurgery"
        ],
        "accreditation": "NABH & USFDA Surgical Protocols"
      },
      {
        "@type": "WebSite",
        "@id": "https://healthflo.in/#website",
        "url": "https://healthflo.in",
        "name": "HealthFlo Hospital Network",
        "publisher": { "@id": "https://healthflo.in/#organization" },
        "inLanguage": "en-IN"
      }
    ],
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 overflow-x-hidden selection:bg-blue-600 selection:text-white">
        <SpeculationRules />
        <UIProtector />
        <CoordinatorIntelligenceTracker />
        {children}
      </body>
    </html>
  );
}
