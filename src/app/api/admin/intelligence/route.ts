import { NextRequest, NextResponse } from "next/server";
import { getDashboardIntelligence, DEFAULT_ADMIN_KEY } from "@/lib/secureDb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passphrase } = body;

    if (!passphrase) {
      return NextResponse.json(
        { success: false, error: "Authentication required. Passphrase missing." },
        { status: 401 }
      );
    }

    const result = await getDashboardIntelligence(passphrase);

    if (!result.success || !result.data) {
      return NextResponse.json(
        { success: false, error: result.error || "Invalid Admin Credentials" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Authentication successful. AES-256 decrypted patient coordinator logs ready.",
      intelligence: result.data
    });
  } catch (error: any) {
    console.error("Admin Intelligence Fetch Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal processing failure while retrieving encrypted logs." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // Support GET via auth token header or query param for quick demo validation
  const passphrase = req.headers.get("x-admin-key") || req.nextUrl.searchParams.get("key") || "";
  
  const result = await getDashboardIntelligence(passphrase);
  if (!result.success) {
    return NextResponse.json({ success: false, error: "Unauthorized access to HealthFlo Medical Intelligence hub." }, { status: 403 });
  }

  return NextResponse.json({ success: true, intelligence: result.data });
}
