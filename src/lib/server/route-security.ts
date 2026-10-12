import { createHash, timingSafeEqual } from "node:crypto";
import { sql } from "@vercel/postgres";

type RateLimitEntry = { count: number; resetAt: number };
type RateLimitResult = { allowed: boolean; retryAfterSeconds: number };

const localRateLimits = new Map<string, RateLimitEntry>();
let rateLimitTableReady: Promise<void> | undefined;
let callsSinceCleanup = 0;

async function ensureRateLimitTable() {
  if (!rateLimitTableReady) {
    rateLimitTableReady = sql`
      CREATE TABLE IF NOT EXISTS api_rate_limits (
        bucket_key TEXT PRIMARY KEY,
        request_count INTEGER NOT NULL,
        reset_at TIMESTAMPTZ NOT NULL
      );
    `.then(() => undefined).catch((error: unknown) => {
      rateLimitTableReady = undefined;
      throw error;
    });
  }
  await rateLimitTableReady;
}

function localFallback(bucketKey: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  let entry = localRateLimits.get(bucketKey);

  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs };
    localRateLimits.set(bucketKey, entry);
  }

  if (localRateLimits.size > 5_000) {
    for (const [storedKey, storedEntry] of localRateLimits) {
      if (storedEntry.resetAt <= now) localRateLimits.delete(storedKey);
    }
  }

  entry.count += 1;
  return {
    allowed: entry.count <= limit,
    retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1_000)),
  };
}

/** Uses shared Postgres storage when configured, with a per-instance fallback. */
export async function rateLimit(request: Request, key: string, limit: number, windowMs: number): Promise<RateLimitResult> {
  const ip = request.headers.get("x-real-ip") ?? request.headers.get("cf-connecting-ip") ?? "unknown";
  const bucketKey = createHash("sha256").update(`${key}:${ip}`).digest("hex");

  try {
    await ensureRateLimitTable();
    const { rows } = await sql`
      INSERT INTO api_rate_limits (bucket_key, request_count, reset_at)
      VALUES (${bucketKey}, 1, clock_timestamp() + (${windowMs} * INTERVAL '1 millisecond'))
      ON CONFLICT (bucket_key) DO UPDATE SET
        request_count = CASE
          WHEN api_rate_limits.reset_at <= clock_timestamp() THEN 1
          ELSE api_rate_limits.request_count + 1
        END,
        reset_at = CASE
          WHEN api_rate_limits.reset_at <= clock_timestamp()
            THEN clock_timestamp() + (${windowMs} * INTERVAL '1 millisecond')
          ELSE api_rate_limits.reset_at
        END
      RETURNING request_count,
        GREATEST(1, CEIL(EXTRACT(EPOCH FROM (reset_at - clock_timestamp()))))::INTEGER AS retry_after_seconds;
    `;

    callsSinceCleanup += 1;
    if (callsSinceCleanup >= 100) {
      callsSinceCleanup = 0;
      void sql`DELETE FROM api_rate_limits WHERE reset_at < clock_timestamp();`.catch(() => undefined);
    }

    const entry = rows[0] as { request_count: number; retry_after_seconds: number } | undefined;
    const count = Number(entry?.request_count ?? 1);
    return {
      allowed: count <= limit,
      retryAfterSeconds: Math.max(1, Number(entry?.retry_after_seconds ?? Math.ceil(windowMs / 1_000))),
    };
  } catch {
    return localFallback(bucketKey, limit, windowMs);
  }
}

export function isAuthorizedAdminRequest(request: Request) {
  const expected = process.env.ADMIN_API_TOKEN;
  const authorization = request.headers.get("authorization") ?? "";
  const supplied = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!expected || !supplied) return false;

  const expectedBytes = Buffer.from(expected);
  const suppliedBytes = Buffer.from(supplied);
  return expectedBytes.length === suppliedBytes.length && timingSafeEqual(expectedBytes, suppliedBytes);
}

export function rateLimitResponse(retryAfterSeconds: number) {
  return Response.json(
    { error: "Too many requests. Please try again later." },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
  );
}
