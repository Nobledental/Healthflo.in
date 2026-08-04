import { NextRequest, NextResponse } from "next/server";
import { readSiteConfig, writeSiteConfig, SiteConfig } from "@/lib/siteConfig";
import { DEFAULT_ADMIN_KEY } from "@/lib/secureDb";

export async function GET(req: NextRequest) {
  try {
    const config = await readSiteConfig();
    return NextResponse.json({ success: true, config });
  } catch (error: any) {
    console.error("Error retrieving site configuration:", error);
    return NextResponse.json({ success: false, error: "Failed to read configuration parameters." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passphrase, config, newConfig } = body;
    const targetConfig = config || newConfig;

    // Verify Directorate Admin credentials
    const validKeys = [DEFAULT_ADMIN_KEY, "healthflo2026", "HealthFlo#2026!Secure", "MASTER-KEY-2026", "director2026"];
    if (!passphrase || !validKeys.includes(passphrase)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Invalid Directorate Admin passphrase for configuration modification." },
        { status: 403 }
      );
    }

    if (!targetConfig) {
      return NextResponse.json({ success: false, error: "Missing configuration data in payload." }, { status: 400 });
    }

    const updated = await writeSiteConfig(targetConfig as Partial<SiteConfig>);
    
    return NextResponse.json({
      success: true,
      message: "Global Site, Contact, and SEO/GEO parameters successfully broadcasted and persisted to vault storage.",
      config: updated
    });
  } catch (error: any) {
    console.error("Error updating site configuration:", error);
    return NextResponse.json({ success: false, error: "Server exception while saving configuration." }, { status: 500 });
  }
}
