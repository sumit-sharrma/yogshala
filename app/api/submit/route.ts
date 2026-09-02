import { NextRequest, NextResponse } from "next/server";
import { FormData } from "@/lib/types";

const SHEETS_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

export async function POST(request: NextRequest) {
  if (!SHEETS_URL) {
    return NextResponse.json(
      { error: "Google Sheets webhook not configured" },
      { status: 500 }
    );
  }

  try {
    const data = (await request.json()) as FormData & { submittedAt?: string };

    const response = await fetch(SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        submittedAt: data.submittedAt || new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Sheets responded with ${response.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}
