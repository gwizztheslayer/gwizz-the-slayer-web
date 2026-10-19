import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, customerDetails } = body;

    console.log("CHECKOUT INITIATED. Payload received:", { 
      itemCount: items?.length || 0, 
      customer: customerDetails?.email || "Guest" 
    });
    
    return NextResponse.json(
      { 
        success: false,
        message: "Checkout infrastructure is currently in development. Payment gateways are not yet live.",
        receivedItems: items?.length || 0
      },
      { status: 503 }
    );

  } catch (error: any) {
    console.error("CHECKOUT PAYLOAD ERROR:", error);
    return NextResponse.json(
      { error: "Invalid checkout payload format." },
      { status: 400 }
    );
  }
}
