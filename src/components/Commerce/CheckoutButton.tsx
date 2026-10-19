"use client";

import { useState } from "react";

export default function CheckoutButton({ cartItems }: { cartItems: any[] }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });
      
      const data = await res.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout failed to generate URL:", data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error connecting to checkout gateway:", error);
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout} 
      disabled={loading || cartItems.length === 0}
      className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-6 rounded-md uppercase tracking-wider transition-colors disabled:opacity-50"
    >
      {loading ? "INITIALIZING SECURE LINK..." : "SECURE CHECKOUT VIA STRIPE"}
    </button>
  );
}
