import { FormData } from "./types";

export async function submitForm(data: FormData): Promise<boolean> {
  try {
    const response = await fetch("/api/submit", {
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
