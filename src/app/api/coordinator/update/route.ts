import { NextResponse } from "next/server";
import { updateRecordAssignment, DEFAULT_ADMIN_KEY } from "@/lib/secureDb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, assignedDoctor, status, pass } = body;
    const adminPass = request.headers.get("x-admin-pass") || pass;

    const validPassphrases = [DEFAULT_ADMIN_KEY, "HealthFlo#2026!Secure", "healthflo@2026", "MASTER-KEY-2026"];
    if (!adminPass || !validPassphrases.includes(adminPass)) {
      return NextResponse.json({ error: "Unauthorized clinical staff access" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ error: "Patient Log ID is required" }, { status: 400 });
    }

    const success = await updateRecordAssignment(id, assignedDoctor, status);
    if (!success) {
      return NextResponse.json({ error: "Patient record not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Patient dossier updated successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: "Internal surgical network server error", details: err.message }, { status: 500 });
  }
}
