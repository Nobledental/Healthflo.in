import { NextRequest } from "next/server";
import { getDashboardIntelligence } from "@/lib/secureDb";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pass = searchParams.get("pass") || "";
  const headerPass = request.headers.get("x-admin-pass") || pass;

  // First verify authorization
  const authCheck = await getDashboardIntelligence(headerPass);
  if (!authCheck.success) {
    return new Response(JSON.stringify({ error: "Unauthorized Staff Passkey" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      let isClosed = false;

      const sendUpdate = async () => {
        if (isClosed || request.signal.aborted) return;
        try {
          const res = await getDashboardIntelligence(headerPass);
          if (res.success && res.data) {
            const dataString = JSON.stringify(res.data);
            controller.enqueue(encoder.encode(`data: ${dataString}\n\n`));
          }
        } catch (err) {
          // Ignore stream closed errors during Next.js reloads
        }
      };

      // Send initial snapshot immediately
      await sendUpdate();

      // Send live updates every 3.5 seconds
      const interval = setInterval(async () => {
        if (request.signal.aborted || isClosed) {
          clearInterval(interval);
          if (!isClosed) {
            isClosed = true;
            try { controller.close(); } catch (e) {}
          }
          return;
        }
        await sendUpdate();
      }, 3500);

      request.signal.addEventListener("abort", () => {
        isClosed = true;
        clearInterval(interval);
        try { controller.close(); } catch (e) {}
      });
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no"
    }
  });
}
