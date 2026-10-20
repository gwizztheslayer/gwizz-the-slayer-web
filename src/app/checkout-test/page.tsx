import CheckoutButton from "@/components/Commerce/CheckoutButton";

export default function CheckoutTest() {
  const mockCart = [
    {
      name: "Original Acrylic Canvas",
      price: 2500.00,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white p-12 font-mono flex flex-col items-center justify-center">
      <div className="border border-zinc-800 bg-zinc-900 p-8 rounded-lg max-w-lg w-full text-center space-y-6">
        <h1 className="text-2xl font-bold text-cyan-400">PHYSICAL VAULT: SECURE CHECKOUT</h1>
        
        <div className="bg-black border border-zinc-800 p-4 rounded text-left">
          <h2 className="text-lg text-zinc-200">{mockCart[0].name}</h2>
          <p className="text-zinc-500 mt-2">Quantity: {mockCart[0].quantity}</p>
          <p className="text-emerald-400 font-bold mt-2">ZAR {mockCart[0].price}.00</p>
        </div>

        <p className="text-xs text-zinc-500 uppercase tracking-widest">
          Shipping address collected securely via Stripe.
        </p>

        <CheckoutButton cartItems={mockCart} />
      </div>
    </main>
  );
}
