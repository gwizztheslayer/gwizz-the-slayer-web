import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, rateLimitResponse } from "@/lib/server/route-security";

const contactInput = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5_000),
});

export async function POST(request: Request) {
  const limit = await rateLimit(request, "contact", 5, 60 * 60_000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 6_000) return NextResponse.json({ error: "Message is too large." }, { status: 413 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = contactInput.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Please check the form fields." }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    return NextResponse.json({ error: "Contact delivery is not configured yet." }, { status: 503 });
  }

  const { name, email, message } = parsed.data;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Website message from ${name}`,
        text: `From: ${name}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Contact provider rejected a message:", response.status);
      return NextResponse.json({ error: "Message delivery failed. Please try again later." }, { status: 502 });
    }
    return NextResponse.json({ status: "sent" });
  } catch {
    console.error("Contact provider could not be reached.");
    return NextResponse.json({ error: "Message delivery failed. Please try again later." }, { status: 502 });
  }
}
