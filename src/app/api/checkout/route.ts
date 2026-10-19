import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe using the secret key we securely injected into Vercel
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Format your frontend cart items for Stripe's checkout system
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'zar', // South African Rand. Change to 'usd' if targeting international pricing.
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100), // Stripe calculates in cents/cents-equivalent
      },
      quantity: item.quantity || 1,
    }));

    // Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      // CRITICAL FOR PHYSICAL WORK: This forces Stripe to collect the user's shipping address
      shipping_address_collection: {
        allowed_countries: ['ZA', 'US', 'GB', 'CA', 'EU'], 
      },
      line_items: lineItems,
      mode: 'payment',
      success_url: `https://www.gwizztheslayer.co.za/vault/success`,
      cancel_url: `https://www.gwizztheslayer.co.za/vault`,
    });

    // Return the secure Stripe-hosted checkout URL to the frontend
    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("STRIPE CHECKOUT ERROR:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
