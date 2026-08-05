/**
 * POST /api/analytics/track
 * Receives a page view event from the client and stores it server-side.
 * Looks up city/country from IP using the ipapi.co public API (free tier).
 */

import { NextRequest, NextResponse } from "next/server";
import { appendRecord, detectDevice, detectBrowser, VisitRecord } from "@/lib/analytics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const page: string = body.page ?? "/";
    const referrer: string = body.referrer ?? "";

    // Get real IP (works behind Vercel/Cloudflare)
    const ip =
      req.headers.get("x-real-ip") ??
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";

    const ua = req.headers.get("user-agent") ?? "";
    const device = detectDevice(ua);
    const browser = detectBrowser(ua);

    // Geo lookup — non-blocking, best-effort
    let city: string | undefined;
    let country: string | undefined;
    try {
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`, {
        headers: { "User-Agent": "Healthflo-Analytics/1.0" },
        signal: AbortSignal.timeout(3000),
      });
      if (geoRes.ok) {
        const geo = await geoRes.json();
        city = geo.city;
        country = geo.country_name;
      }
    } catch {
      // Silently skip geo if request fails
    }

    const record: VisitRecord = {
      ts: Date.now(),
      page,
      city,
      country,
      device,
      browser,
      referrer: referrer || undefined,
      ip,
    };

    appendRecord(record);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
