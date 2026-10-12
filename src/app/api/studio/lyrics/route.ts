import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { z } from "zod";
import { isAuthorizedAdminRequest, rateLimit, rateLimitResponse } from "@/lib/server/route-security";

export const dynamic = "force-dynamic";

const lyricsInput = z.object({
  title: z.string().trim().min(1).max(160),
  text_content: z.string().trim().min(1).max(50_000),
  cover_image: z.union([
    z.string().trim().max(2_048).url().refine((value) => value.startsWith("https://")),
    z.string().trim().max(2_048).regex(/^\/(?!\/)[^\s<>"']*$/),
  ]).optional().or(z.literal("")),
});

async function authorize(request: Request) {
  if (!process.env.ADMIN_API_TOKEN) {
    return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
  }
  const limit = await rateLimit(request, "studio-lyrics", 20, 60_000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);
  if (!isAuthorizedAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}

export async function GET(request: Request) {
  const denied = await authorize(request);
  if (denied) return denied;

  try {
    const { rows } = await sql`SELECT * FROM lyrics ORDER BY created_at DESC;`;
    return NextResponse.json({ lyrics: rows });
  } catch {
    return NextResponse.json({ error: "Failed to read lyrics." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const denied = await authorize(request);
  if (denied) return denied;
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 60_000) return NextResponse.json({ error: "Request body is too large." }, { status: 413 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const parsed = lyricsInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lyrics payload.", details: parsed.error.flatten() }, { status: 400 });
  }

  const { title, text_content, cover_image } = parsed.data;
  const trackSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  if (!trackSlug) return NextResponse.json({ error: "Title must contain letters or numbers." }, { status: 400 });

  try {
    await sql`
      INSERT INTO lyrics (track_slug, title, text_content, cover_image)
      VALUES (${trackSlug}, ${title}, ${text_content}, ${cover_image || null})
      ON CONFLICT (track_slug)
      DO UPDATE SET title = EXCLUDED.title, text_content = EXCLUDED.text_content,
        cover_image = EXCLUDED.cover_image, created_at = CURRENT_TIMESTAMP;
    `;
    return NextResponse.json({ message: "Lyrics saved." });
  } catch {
    return NextResponse.json({ error: "Could not save lyrics." }, { status: 500 });
  }
}
