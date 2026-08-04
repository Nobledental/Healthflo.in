"use client";

import React, { useState, useEffect } from "react";
import { 
  Globe2, 
  Phone, 
  Mail, 
  MapPin, 
  Share2, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw, 
  Save, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  Sliders,
  Send,
  ArrowRight,
  Radio
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface TabGlobalConfigProps {
  passphrase: string;
  onAuditLog: (msg: string) => void;
}

export default function TabGlobalConfig({ passphrase, onAuditLog }: TabGlobalConfigProps) {
  const { config, refreshConfig } = useSiteConfig();
  
  // Local editable form state initialized from context
  const [formData, setFormData] = useState({ ...config });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Synchronize form when production config updates (after broadcast or initial load)
  useEffect(() => {
    setFormData({ ...config });
  }, [config]);

  const hasUnsavedChanges = JSON.stringify(formData) !== JSON.stringify(config);

  const handleChange = (field: string, value: any) => {
    setSaveStatus(null);
    setFormData((prev: any) => {
      const keys = field.split(".");
      if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: { ...prev[keys[0]], [keys[1]]: value }
        };
      }
      
      const updated = { ...prev, [field]: value };
      
      // Auto-sync WhatsApp number digits if user updates Raw Dialer Number
      if (field === "helplineRaw" && typeof value === "string") {
        const cleanNumber = value.replace(/[^0-9]/g, "");
        if (updated.socials?.whatsapp && updated.socials.whatsapp.includes("wa.me/")) {
          updated.socials = {
            ...updated.socials,
            whatsapp: updated.socials.whatsapp.replace(/wa\.me\/[0-9]+/, `wa.me/${cleanNumber}`)
          };
        }
      }

      return updated;
    });
  };

  const handleBroadcast = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);

    try {
      const res = await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passphrase,
          config: formData,
          newConfig: formData
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to broadcast configuration update.");
      }

      // Re-fetch global context so all pages react immediately
      await refreshConfig();

      setSaveStatus({
        type: "success",
        message: "🎉 SUCCESS: All updates have been published! Your new Helpline, Addresses, WhatsApp links, and SEO tags are now live on every landing page across the website."
      });
      onAuditLog(`[GLOBAL CONFIG] Director broadcasted updated site configuration for helpline (${formData.helplineNumber}) & address.`);
    } catch (err: any) {
      setSaveStatus({
        type: "error",
        message: err.message || "Error transmitting config to production edge."
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData({ ...config });
    setSaveStatus({
      type: "success",
      message: "Form restored to what is currently live on the production website."
    });
  };

  return (
    <div className="p-6 md:p-8 space-y-8 text-slate-200">
      
      {/* Header Banner with Prominent Top Actions */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Globe2 className="w-3.5 h-3.5" /> Edge Site Configuration Directorate
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Global Site, Social &amp; SEO Broadcast Console
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Edit below to update helpline numbers, email addresses, regional hub locations, WhatsApp automated chat links, and SEO titles across all web pages simultaneously.
          </p>
        </div>

        {/* TOP ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {hasUnsavedChanges && (
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Unsaved Edits
            </span>
          )}
          <button
            type="button"
            onClick={handleReset}
            disabled={isSaving}
            className="px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-extrabold text-xs transition flex items-center gap-2 border border-slate-700 disabled:opacity-50"
          >
            <RefreshCw className="w-4 h-4" /> Revert to Live State
          </button>
          <button
            type="button"
            onClick={() => handleBroadcast()}
            disabled={isSaving || !hasUnsavedChanges}
            className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm uppercase tracking-wider transition flex items-center gap-2.5 shadow-xl ${
              hasUnsavedChanges
                ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 text-white shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98]"
                : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
            }`}
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" /> Publishing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" /> Save &amp; Broadcast to Website
              </>
            )}
          </button>
        </div>
      </div>

      {/* NOTIFICATIONS & UNSAVED ALERT BANNER */}
      {hasUnsavedChanges && !saveStatus && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-amber-300 font-sans shadow-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <div className="font-extrabold text-sm text-amber-200">You have unpublished changes in this form!</div>
              <div className="text-xs text-amber-300/80">Your updates are currently in preview mode. Click <b>Save &amp; Broadcast</b> above or at the bottom to publish them instantly to the live website.</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => handleBroadcast()}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs uppercase tracking-wider transition shrink-0 shadow"
          >
            Publish Live Now
          </button>
        </div>
      )}

      {saveStatus && (
        <div className={`p-5 rounded-2xl border-2 flex items-center gap-4 text-sm font-bold shadow-xl animate-fade-in ${
          saveStatus.type === "success" 
            ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-emerald-500/10"
            : "bg-rose-500/15 border-rose-500/50 text-rose-300 shadow-rose-500/10"
        }`}>
          {saveStatus.type === "success" ? <CheckCircle2 className="w-7 h-7 text-emerald-400 shrink-0" /> : <AlertCircle className="w-7 h-7 text-rose-400 shrink-0" />}
          <div className="space-y-1">
            <div className="text-base font-black text-white">{saveStatus.type === "success" ? "Live Broadcast Complete!" : "Transmission Error"}</div>
            <div className="text-xs sm:text-sm leading-relaxed font-medium text-slate-200">{saveStatus.message}</div>
          </div>
        </div>
      )}

      <form onSubmit={handleBroadcast} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT 2 COLUMNS: CONFIG FORM FIELDS */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* SECTION 1: CORE CONTACT HELPLINES */}
          <div className="p-6 rounded-3xl bg-[#070D1A] border border-slate-800 space-y-5 shadow-inner">
            <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Phone className="w-4 h-4 text-cyan-400" /> Primary Multilingual Surgical Helplines &amp; Hubs
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Display Helpline Number</span>
                  <span className="text-[10px] text-cyan-400 font-normal">(Shown on Navbar/Hero)</span>
                </label>
                <input
                  type="text"
                  value={formData.helplineNumber || ""}
                  onChange={(e) => handleChange("helplineNumber", e.target.value)}
                  placeholder="+91 93636 50066"
                  className="w-full bg-[#0A1224] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-white font-mono text-sm font-bold focus:outline-none transition shadow-sm"
                  required
                />
                <p className="text-[11px] text-slate-500 mt-1">Formatted with spacing for high patient readability.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Raw Dialer Number</span>
                  <span className="text-[10px] text-cyan-400 font-normal">(Used for automated dials)</span>
                </label>
                <input
                  type="text"
                  value={formData.helplineRaw || ""}
                  onChange={(e) => handleChange("helplineRaw", e.target.value)}
                  placeholder="919363650066"
                  className="w-full bg-[#0A1224] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-white font-mono text-sm font-bold focus:outline-none transition shadow-sm"
                  required
                />
                <p className="text-[11px] text-emerald-400 mt-1">⚡ Changing this automatically updates the WhatsApp chat link below.</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Patient Desk Email Address
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="care@healthflo.in"
                  className="w-full bg-[#0A1224] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-white text-sm font-semibold focus:outline-none transition shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Directorate Escalation Email
                </label>
                <input
                  type="email"
                  value={formData.directorateEmail || ""}
                  onChange={(e) => handleChange("directorateEmail", e.target.value)}
                  placeholder="director@healthflo.in"
                  className="w-full bg-[#0A1224] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-white text-sm font-semibold focus:outline-none transition shadow-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Corporate Headquarters &amp; Surgical Hub Address (Footer &amp; Contact Page)
                </label>
                <input
                  type="text"
                  value={formData.corporateAddress || ""}
                  onChange={(e) => handleChange("corporateAddress", e.target.value)}
                  placeholder="HealthFlo Surgical Network Directorate, Greams Road IT Hub, Chennai 600006"
                  className="w-full bg-[#0A1224] border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-3 text-white text-sm font-semibold focus:outline-none transition shadow-sm"
                  required
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: REGIONAL HUB ADDRESSES */}
          <div className="p-6 rounded-3xl bg-[#070D1A] border border-slate-800 space-y-5">
            <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <MapPin className="w-4 h-4 text-rose-400" /> Regional Network Centers &amp; Surgical Suites
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Tamil Nadu Surgical Directorate (Chennai &amp; Coimbatore)
                </label>
                <input
                  type="text"
                  value={formData.regionalAddresses?.tamilNadu || ""}
                  onChange={(e) => handleChange("regionalAddresses.tamilNadu", e.target.value)}
                  className="w-full bg-[#0A1224] border border-slate-700 focus:border-rose-400 rounded-xl px-4 py-2.5 text-white text-xs font-medium focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Karnataka Surgical Enclave (Bengaluru Indiranagar &amp; Whitefield)
                </label>
                <input
                  type="text"
                  value={formData.regionalAddresses?.karnataka || ""}
                  onChange={(e) => handleChange("regionalAddresses.karnataka", e.target.value)}
                  className="w-full bg-[#0A1224] border border-slate-700 focus:border-rose-400 rounded-xl px-4 py-2.5 text-white text-xs font-medium focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Telangana Precision Center (Hyderabad Jubilee Hills &amp; Hitec City)
                </label>
                <input
                  type="text"
                  value={formData.regionalAddresses?.telangana || ""}
                  onChange={(e) => handleChange("regionalAddresses.telangana", e.target.value)}
                  className="w-full bg-[#0A1224] border border-slate-700 focus:border-rose-400 rounded-xl px-4 py-2.5 text-white text-xs font-medium focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: SOCIAL & INSTANT CHAT MAPPINGS */}
          <div className="p-6 rounded-3xl bg-[#070D1A] border border-slate-800 space-y-5">
            <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Share2 className="w-4 h-4 text-emerald-400" /> Social Media &amp; WhatsApp Concierge Mappings
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>WhatsApp Triage &amp; Appointment Anchor URL</span>
                  <span className="text-[10px] text-slate-400 font-normal">(Primary conversion channel)</span>
                </label>
                <input
                  type="text"
                  value={formData.socials?.whatsapp || ""}
                  onChange={(e) => handleChange("socials.whatsapp", e.target.value)}
                  placeholder="https://wa.me/919363650066?text=Hello%20HealthFlo..."
                  className="w-full bg-[#0A1224] border border-emerald-500/40 focus:border-emerald-400 rounded-xl px-4 py-3 text-emerald-300 font-mono text-xs font-bold focus:outline-none transition"
                />
                <p className="text-[11px] text-slate-500 mt-1">This link is connected to the live WhatsApp AI auto-responder &amp; floating consultation buttons.</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Instagram Official Handle
                </label>
                <input
                  type="text"
                  value={formData.socials?.instagram || ""}
                  onChange={(e) => handleChange("socials.instagram", e.target.value)}
                  placeholder="https://instagram.com/healthflo.surgical"
                  className="w-full bg-[#0A1224] border border-slate-700 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  LinkedIn Corporate Page
                </label>
                <input
                  type="text"
                  value={formData.socials?.linkedin || ""}
                  onChange={(e) => handleChange("socials.linkedin", e.target.value)}
                  placeholder="https://linkedin.com/company/healthflo"
                  className="w-full bg-[#0A1224] border border-slate-700 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Facebook Network Page
                </label>
                <input
                  type="text"
                  value={formData.socials?.facebook || ""}
                  onChange={(e) => handleChange("socials.facebook", e.target.value)}
                  placeholder="https://facebook.com/healthflo.surgical.network"
                  className="w-full bg-[#0A1224] border border-slate-700 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Twitter / X Profile URL
                </label>
                <input
                  type="text"
                  value={formData.socials?.twitter || ""}
                  onChange={(e) => handleChange("socials.twitter", e.target.value)}
                  placeholder="https://twitter.com/healthflo_in"
                  className="w-full bg-[#0A1224] border border-slate-700 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: SEO & GEO METADATA ENGINE */}
          <div className="p-6 rounded-3xl bg-[#070D1A] border border-slate-800 space-y-5">
            <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800/80 pb-3">
              <Search className="w-4 h-4 text-purple-400" /> Automated SEO &amp; GEO Discovery Metadata
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Global SEO Title Banner
                </label>
                <input
                  type="text"
                  value={formData.seo?.siteTitle || ""}
                  onChange={(e) => handleChange("seo.siteTitle", e.target.value)}
                  placeholder="HealthFlo Surgical Network | Advanced Laser & Laparoscopic Care..."
                  className="w-full bg-[#0A1224] border border-slate-700 focus:border-purple-400 rounded-xl px-4 py-3 text-white text-sm font-bold focus:outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Global SEO Description &amp; Value Proposition
                </label>
                <textarea
                  value={formData.seo?.siteDescription || ""}
                  onChange={(e) => handleChange("seo.siteDescription", e.target.value)}
                  rows={3}
                  className="w-full bg-[#0A1224] border border-slate-700 focus:border-purple-400 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition leading-relaxed"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Target Geographies (GEO Regions)
                  </label>
                  <input
                    type="text"
                    value={formData.seo?.geoRegion || ""}
                    onChange={(e) => handleChange("seo.geoRegion", e.target.value)}
                    placeholder="IN-TN, IN-KA, IN-TG"
                    className="w-full bg-[#0A1224] border border-slate-700 focus:border-purple-400 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Target Placename Hubs
                  </label>
                  <input
                    type="text"
                    value={formData.seo?.geoPlacename || ""}
                    onChange={(e) => handleChange("seo.geoPlacename", e.target.value)}
                    placeholder="Chennai, Bengaluru, Hyderabad, Coimbatore"
                    className="w-full bg-[#0A1224] border border-slate-700 focus:border-purple-400 rounded-xl px-4 py-3 text-white text-sm focus:outline-none transition"
                  />
                </div>
              </div>
              <p className="text-[11px] text-slate-500">Used by generative AI search engines, Google schema markup, and regional SEO crawlers.</p>
            </div>
          </div>

          {/* SUBMIT BUTTON AT BOTTOM */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSaving || !hasUnsavedChanges}
              className={`w-full py-5 rounded-2xl font-black text-base uppercase tracking-wider shadow-xl transition flex items-center justify-center gap-3 ${
                hasUnsavedChanges
                  ? "bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 text-white shadow-cyan-500/25 hover:opacity-95 cursor-pointer"
                  : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
              }`}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-6 h-6 animate-spin" /> Transmitting Overrides to Live Website...
                </>
              ) : hasUnsavedChanges ? (
                <>
                  <Sparkles className="w-6 h-6 text-amber-300" /> Broadcast Global Site &amp; SEO Update Now
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" /> All Changes Currently Live &amp; Synced
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE SIMULATION vs PENDING DRAFT */}
        <div className="space-y-6">
          
          {/* LIVE ON PRODUCTION WEBSITE RIGHT NOW */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-[#081524] to-[#040A12] border-2 border-emerald-500/50 shadow-2xl space-y-5 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm">
                <Radio className="w-4 h-4 animate-pulse text-emerald-400" /> CURRENTLY LIVE ON WEBSITE
              </div>
              <span className="text-[10px] uppercase font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">Active Production</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This widget shows exactly what is appearing right now to patients across all landing pages, navbars, and automated AI bots.
            </p>

            <div className="p-4 rounded-2xl bg-[#03070E] border border-emerald-500/30 space-y-4 font-sans text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Navbar Helpline Button</span>
                <div className="flex items-center gap-2 font-black text-cyan-400 text-sm">
                  <Phone className="w-4 h-4 text-emerald-400" /> {config.helplineNumber || "N/A"}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Footer Corporate Address Stamp</span>
                <div className="flex items-start gap-2 text-slate-200 text-xs">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" /> 
                  <span>{config.corporateAddress || "N/A"}</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Live WhatsApp AI Endpoint</span>
                <div className="truncate font-mono text-emerald-300 text-[11px] bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                  {config.socials?.whatsapp || "N/A"}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Active GEO Regions &amp; Hubs</span>
                <div className="text-amber-300 font-semibold text-xs">
                  {config.seo?.geoRegion || "N/A"} ({config.seo?.geoPlacename})
                </div>
              </div>
            </div>
          </div>

          {/* YOUR PENDING PREVIEW CARD */}
          <div className={`p-6 rounded-3xl transition border-2 shadow-2xl space-y-5 relative overflow-hidden ${
            hasUnsavedChanges
              ? "bg-gradient-to-b from-[#1E1408] to-[#0A0703] border-amber-500/50 shadow-amber-500/10"
              : "bg-slate-900/40 border-slate-800 opacity-70"
          }`}>
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 text-amber-300 font-black text-sm">
                <Sliders className="w-4 h-4" /> YOUR PENDING EDITS PREVIEW
              </div>
              {hasUnsavedChanges ? (
                <span className="text-[10px] uppercase font-extrabold bg-amber-500 text-black px-2 py-0.5 rounded animate-pulse">Draft Mode</span>
              ) : (
                <span className="text-[10px] uppercase font-bold text-slate-500">Synced</span>
              )}
            </div>

            {hasUnsavedChanges ? (
              <>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  You have modified the fields below. Once you hit <b>Save &amp; Broadcast</b>, this exact data will replace the Live Production State above:
                </p>

                <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 space-y-3 font-sans text-xs text-amber-100">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">New Helpline Display:</span>
                    <span className="font-bold text-amber-300 text-sm">{formData.helplineNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">New Corporate Address:</span>
                    <span>{formData.corporateAddress}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">New WhatsApp Link:</span>
                    <div className="truncate font-mono text-xs text-amber-300">{formData.socials?.whatsapp}</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleBroadcast()}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-black text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow"
                >
                  <Sparkles className="w-4 h-4" /> Push These Edits Live Now
                </button>
              </>
            ) : (
              <div className="py-6 text-center text-xs text-slate-400 font-medium">
                No unsaved changes detected. As you type in the boxes on the left, a real-time preview of your modifications will appear right here before you broadcast!
              </div>
            )}
          </div>

          {/* Encryption & Security Information */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-start gap-3 text-blue-300 text-xs font-semibold">
            <ShieldCheck className="w-6 h-6 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-blue-200">Zero-Downtime Live Propagation</div>
              <div className="text-blue-300/80 font-normal">
                When you click Save &amp; Broadcast, updates are written to `.secure_data/site_config.json` and immediately propagated into React Context across all user sessions without requiring a server reboot or app rebuild.
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
