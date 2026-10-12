"use client";
import { useState } from "react";
import Image from "next/image";

const MERCH_INVENTORY = [
  {
    id: "m-001",
    name: "SYNDICATE HEAVYWEIGHT HOODIE",
    price: "R 850",
    description: "Premium 400gsm cotton. Toxic green embroidered logo on chest.",
    src: "/images/merch-placeholder-1.jpg",
    status: "AVAILABLE",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "m-002",
    name: "SMOKED OUT HALO TEE",
    price: "R 450",
    description: "Acid wash vintage tee featuring the Smoked Out Halo painting.",
    src: "/images/merch-placeholder-2.jpg",
    status: "LOW STOCK",
    sizes: ["M", "L", "XL"]
  },
  {
    id: "m-003",
    name: "DEMONS DON'T SLEEP CAP",
    price: "R 350",
    description: "Distressed dad hat. Metal clasp. Embroidered lettering.",
    src: "/images/merch-placeholder-3.jpg",
    status: "SOLD OUT",
    sizes: ["OSFA"]
  },
  {
    id: "m-004",
    name: "K.A.I.R.O. TACTICAL VEST",
    price: "R 1200",
    description: "Limited edition utility vest. 6 pockets. Syndicate woven label.",
    src: "/images/merch-placeholder-4.jpg",
    status: "PRE-ORDER",
    sizes: ["M", "L", "XL"]
  }
];

export default function MerchandiseExperience() {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const handleSizeSelect = (itemId: string, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-24">
      <section className="mx-auto max-w-7xl px-4">
        {/* HEADER */}
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <span className="text-toxic font-mono text-xs tracking-[0.3em] uppercase mb-4">[ Authorized Personnel Only ]</span>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-[0.2em] mb-4">
            The Supply <span className="text-toxic">Depot</span>
          </h1>
          <p className="text-white/50 text-sm md:text-base tracking-widest max-w-2xl">
            Official Syndicate uniform and artifacts. Limited production runs.
          </p>
        </div>

        {/* MERCH GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {MERCH_INVENTORY.map((item) => (
            <div key={item.id} className="group flex flex-col border border-white/10 bg-[#050505] transition-all duration-500 hover:border-toxic/60 relative">
              <div className="absolute top-4 right-4 z-20">
                <span className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest border bg-black/90 backdrop-blur-md
                  ${item.status === 'AVAILABLE' ? 'border-toxic/50 text-toxic' : 
                    item.status === 'SOLD OUT' ? 'border-red-500/50 text-red-500' : 
                    'border-yellow-500/50 text-yellow-500'}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="relative aspect-square w-full overflow-hidden bg-zinc-900 border-b border-white/5">
                 <div className="absolute inset-0 flex items-center justify-center text-zinc-800 font-mono text-xs z-0">
                    [ AWAITING IMAGE ASSET ]
                 </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-black uppercase tracking-wide leading-tight text-white group-hover:text-toxic transition-colors pr-4">
                    {item.name}
                  </h2>
                  <span className="font-mono text-sm text-zinc-300 whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-xs text-zinc-500 mb-6 flex-grow">{item.description}</p>

                <div className="mt-auto">
                  {item.status !== "SOLD OUT" ? (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {item.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(item.id, size)}
                            className={`h-8 min-w-[32px] px-2 border font-mono text-[10px] uppercase tracking-wider transition-colors
                              ${selectedSizes[item.id] === size 
                                ? 'border-toxic bg-toxic text-black font-bold' 
                                : 'border-white/20 text-zinc-400 hover:border-toxic hover:text-toxic'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>

                      <button 
                        disabled={!selectedSizes[item.id]}
                        className={`w-full py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all
                          ${selectedSizes[item.id] 
                            ? 'bg-white text-black hover:bg-toxic border border-transparent' 
                            : 'bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed'}`}
                      >
                        {selectedSizes[item.id] ? '[ ACQUIRE ]' : 'SELECT SIZE'}
                      </button>
                    </div>
                  ) : (
                    <button disabled className="w-full py-3 bg-black border border-red-500/20 text-red-500/50 font-mono text-xs font-bold uppercase tracking-[0.2em] cursor-not-allowed">
                      UNAVAILABLE
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}