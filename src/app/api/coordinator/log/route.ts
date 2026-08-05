import { NextRequest, NextResponse } from "next/server";
import { recordVisitorEvent } from "@/lib/secureDb";
import { triggerAutoResponder } from "@/lib/autoResponder";

// Route Handler for Real-Time Telemetry and Multi-Channel Bot Dispatch
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract clinical browser & device platform identification from headers
    const userAgent = req.headers.get("user-agent") || body.userAgent || "Unknown Device";
    let device = "Desktop Web Browser";
    if (/iphone/i.test(userAgent)) device = "Apple iPhone (iOS)";
    else if (/ipad/i.test(userAgent)) device = "Apple iPad (iOS)";
    else if (/android.*mobile/i.test(userAgent)) device = "Android Smartphone";
    else if (/android/i.test(userAgent)) device = "Android Tablet";
    else if (/macintosh|mac os/i.test(userAgent)) device = "Apple Mac Laptop";
    else if (/windows nt/i.test(userAgent)) device = "Windows PC / Laptop";
    else if (/mobile/i.test(userAgent)) device = "Mobile Smartphone";

    let receipts = undefined;
    if (body.leadContact && body.leadContact.phone) {
      receipts = await triggerAutoResponder({
        name: body.leadContact.name || "Patient Inquiry",
        phone: body.leadContact.phone,
        procedure: body.leadContact.procedure,
        email: body.leadContact.email
      });
    }

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
      coordinatorClinicalNote: body.coordinatorClinicalNote,
      autoResponderReceipts: receipts
    });

    return NextResponse.json({
      success: true,
      message: "Telemetry event captured safely under Coordinator Patient Care Support log (Encrypted At Rest).",
      recordId: savedRecord.id,
      autoResponderReceipts: receipts
    });
  } catch (error: any) {
    console.error("Telemetry Logging Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record telemetry note." },
      { status: 500 }
    );
  }
}
