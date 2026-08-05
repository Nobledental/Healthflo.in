/**
 * Visitor Analytics Engine
 * Stores page-view events in a local JSON file (data/analytics.json).
 * Each record holds: timestamp, page, city, country, device, browser, referrer.
 * The file is append-only; we cap it at MAX_RECORDS to keep memory low.
 */

import fs from "fs";
import path from "path";

export interface VisitRecord {
  ts: number;          // Unix ms
  page: string;        // e.g. "/", "/locations/tamil-nadu/chennai"
  city?: string;
  country?: string;
  device: "mobile" | "tablet" | "desktop";
  browser: string;
  referrer?: string;
  ip?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "analytics.json");
const MAX_RECORDS = 5000;

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]", "utf8");
}

export function readRecords(): VisitRecord[] {
  ensureFile();
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8")) as VisitRecord[];
  } catch {
    return [];
  }
}

export function appendRecord(record: VisitRecord) {
  ensureFile();
  const records = readRecords();
  records.push(record);
  // Keep only the most recent MAX_RECORDS
  const trimmed = records.slice(-MAX_RECORDS);
  fs.writeFileSync(FILE, JSON.stringify(trimmed), "utf8");
}

export function detectDevice(ua: string): VisitRecord["device"] {
  if (/mobile|android|iphone|ipod|blackberry|windows phone/i.test(ua)) return "mobile";
  if (/ipad|tablet/i.test(ua)) return "tablet";
  return "desktop";
}

export function detectBrowser(ua: string): string {
  if (/edg\//i.test(ua)) return "Edge";
  if (/chrome\//i.test(ua)) return "Chrome";
  if (/firefox\//i.test(ua)) return "Firefox";
  if (/safari\//i.test(ua)) return "Safari";
  if (/opr\//i.test(ua)) return "Opera";
  return "Other";
}
