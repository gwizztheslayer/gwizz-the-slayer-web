"use client";

import { useState } from "react";

export default function CheckoutButton({ cartItems }: { cartItems: any[] }) {
  const [loading, setLoading] = useState(false);

  const handleStripeCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.error("Stripe error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalCheckout = () => {
    alert("PayPal gateway integration pending backend configuration.");
  };

  // Prevent checkout if no valid price exists
  if (!cartItems[0]?.price || cartItems[0].price <= 0) {
     return <div className="text-xs text-zinc-500 uppercase tracking-wider text-center mt-4 border border-zinc-800 py-2">Not Priced For Direct Sale</div>;
  }

  return (
    <div className="flex flex-col gap-2 w-full mt-2">
      <button 
        onClick={handleStripeCheckout} 
        disabled={loading}
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2.5 px-4 rounded-sm text-sm uppercase tracking-wider transition-colors disabled:opacity-50"
      >
        {loading ? "INITIALIZING..." : "PAY VIA STRIPE"}
      </button>
      <button 
        onClick={handlePayPalCheckout} 
        disabled={loading}
        className="w-full bg-[#00457C] hover:bg-[#0079C1] text-white font-bold py-2.5 px-4 rounded-sm text-sm uppercase tracking-wider transition-colors disabled:opacity-50"
      >
        PAY VIA PAYPAL
      </button>
    </div>
  );
}
