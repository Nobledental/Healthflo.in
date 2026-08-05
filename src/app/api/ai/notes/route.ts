import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// ─────────────────────────────────────────────────────────────────────────────
// Sovereign AI Clinical Memory & Note-Taking Engine (Local File DB Persistence)
// Stores every patient symptom interaction, extracted notes, and triage decisions
// ─────────────────────────────────────────────────────────────────────────────

export interface AIClinicalNote {
  id: string;
  sessionId: string;
  timestamp: string;
  userPrompt: string;
  extractedSymptoms: string[];
  suggestedProcedure?: string;
  cashlessEligibility: boolean;
  aiDiagnosticResponse: string;
  clinicalNotesSummary: string;
}

const DB_FILE_PATH = path.join(process.cwd(), "data", "ai_clinical_memory_db.json");

async function ensureDbExists() {
  const dataDir = path.join(process.cwd(), "data");
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch {}
  try {
    await fs.access(DB_FILE_PATH);
  } catch {
    await fs.writeFile(DB_FILE_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await ensureDbExists();

    const currentDataRaw = await fs.readFile(DB_FILE_PATH, "utf-8");
    let records: AIClinicalNote[] = [];
    try {
      records = JSON.parse(currentDataRaw);
    } catch {
      records = [];
    }

    const newNote: AIClinicalNote = {
      id: "ai-note-" + Date.now().toString() + "-" + Math.random().toString(36).substring(2, 6),
      sessionId: body.sessionId || "anonymous-session-" + Math.floor(Math.random() * 10000),
      timestamp: new Date().toISOString(),
      userPrompt: body.userPrompt || "",
      extractedSymptoms: body.extractedSymptoms || ["Surgical Consultation"],
      suggestedProcedure: body.suggestedProcedure || "Multidisciplinary Surgical Evaluation",
      cashlessEligibility: body.cashlessEligibility !== undefined ? body.cashlessEligibility : true,
      aiDiagnosticResponse: body.aiDiagnosticResponse || "",
      clinicalNotesSummary: body.clinicalNotesSummary || "Initial AI clinical reasoning and triage assessment completed."
    };

    // Prepend to maintain newest first in our local database
    records.unshift(newNote);

    // Persist to local filesystem database
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(records.slice(0, 500), null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "AI clinical notes stored securely in local database.",
      noteId: newNote.id,
      totalSavedNotes: records.length
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to persist AI note to local database", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await ensureDbExists();
    const dataRaw = await fs.readFile(DB_FILE_PATH, "utf-8");
    const notes: AIClinicalNote[] = JSON.parse(dataRaw);
    return NextResponse.json({ success: true, count: notes.length, notes });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Could not retrieve AI database notes", details: error.message },
      { status: 500 }
    );
  }
}
