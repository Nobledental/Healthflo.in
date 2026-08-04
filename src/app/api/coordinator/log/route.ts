import { NextRequest, NextResponse } from "next/server";
import { recordVisitorEvent } from "@/lib/secureDb";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract basic browser/device fingerprinting from headers if not provided
    const userAgent = req.headers.get("user-agent") || body.userAgent || "Unknown Device";
    let device = "Desktop Browser";
    if (/mobile/i.test(userAgent)) device = "Mobile Smartphone";
    else if (/ipad|tablet/i.test(userAgent)) device = "Tablet Device";

    const savedRecord = await recordVisitorEvent({
      sessionId: body.sessionId,
      city: body.city || "South India Visitor Hub",
      state: body.state || "Tamil Nadu",
      device: body.device || device,
      userAgent: userAgent,
      pagesViewed: body.pagesViewed || ["/"],
      lastClickedElement: body.lastClickedElement,
      searchQueries: body.searchQueries || [],
      leadContact: body.leadContact,
      coordinatorClinicalNote: body.coordinatorClinicalNote
    });

    return NextResponse.json({
      success: true,
      message: "Telemetry event captured safely under Coordinator Patient Care Support log (Encrypted At Rest).",
      recordId: savedRecord.id
    });
  } catch (error: any) {
    console.error("Telemetry Logging Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record telemetry note." },
      { status: 500 }
    );
  }
}
