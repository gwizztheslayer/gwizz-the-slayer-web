import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Checkout is unavailable until live payment and fulfilment details are configured." },
    { status: 503 },
  );
}
