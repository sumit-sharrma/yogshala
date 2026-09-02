import { FormData } from "./types";

export async function submitForm(data: FormData): Promise<boolean> {
  const webhookUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

  if (!webhookUrl) {
    console.error("Google Sheets webhook URL not configured");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        submittedAt: new Date().toISOString(),
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Submission failed:", error);
    return false;
  }
}
