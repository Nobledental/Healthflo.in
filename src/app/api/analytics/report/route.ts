/**
 * GET /api/analytics/report
 * Returns aggregated analytics data for the admin dashboard.
 * Protected by X-Admin-Pass header matching the admin passphrase env var.
 */

import { NextRequest, NextResponse } from "next/server";
import { readRecords, VisitRecord } from "@/lib/analytics";

function countBy<T>(arr: T[], key: (item: T) => string | undefined): Record<string, number> {
  const map: Record<string, number> = {};
  for (const item of arr) {
    const k = key(item) ?? "Unknown";
    map[k] = (map[k] ?? 0) + 1;
  }
  return map;
}

function topN(map: Record<string, number>, n: number): { label: string; count: number }[] {
  return Object.entries(map)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([label, count]) => ({ label, count }));
}

export async function GET(req: NextRequest) {
  const pass = req.headers.get("x-admin-pass") ?? req.nextUrl.searchParams.get("pass") ?? "";
  const expected = process.env.ADMIN_PASSPHRASE ?? "";
  if (expected && pass !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const records = readRecords();
  const now = Date.now();

  // Time windows
  const last24h = records.filter(r => r.ts >= now - 86_400_000);
  const last7d  = records.filter(r => r.ts >= now - 7 * 86_400_000);
  const last30d = records.filter(r => r.ts >= now - 30 * 86_400_000);

  // Visitors by day (last 14 days)
  const dailyMap: Record<string, number> = {};
  for (let d = 13; d >= 0; d--) {
    const day = new Date(now - d * 86_400_000).toISOString().slice(0, 10);
    dailyMap[day] = 0;
  }
  last7d.concat(records.filter(r => r.ts >= now - 14 * 86_400_000)).forEach(r => {
    const day = new Date(r.ts).toISOString().slice(0, 10);
    if (day in dailyMap) dailyMap[day]++;
  });
  const dailyVisitors = Object.entries(dailyMap).map(([date, count]) => ({ date, count }));

  // Top pages
  const topPages = topN(countBy(last30d, r => r.page), 10);

  // Top cities
  const topCities = topN(countBy(last30d, r => r.city), 10);

  // Top countries
  const topCountries = topN(countBy(last30d, r => r.country), 8);

  // Device split
  const deviceSplit = countBy(last30d, r => r.device);

  // Browser split
  const browserSplit = countBy(last30d, r => r.browser);

  // Top referrers
  const topReferrers = topN(
    countBy(last30d.filter(r => r.referrer), r => {
      try { return new URL(r.referrer!).hostname; } catch { return r.referrer; }
    }),
    8
  );

  return NextResponse.json({
    summary: {
      total: records.length,
      last24h: last24h.length,
      last7d: last7d.length,
      last30d: last30d.length,
    },
    dailyVisitors,
    topPages,
    topCities,
    topCountries,
    deviceSplit,
    browserSplit,
    topReferrers,
  });
}
