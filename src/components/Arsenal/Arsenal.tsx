"use client";
import Image from "next/image";
import Link from "next/link";

const APPAREL_DROPS = [
  { id: "m-001", name: "SMOKED OUT HALO HOODIE", price: "R 850", src: "/merch/stare-tee.jpg" },
  { id: "m-002", name: "APOCALYPTIC VISION HOODIE", price: "R 850", src: "/merch/volcanic-tee.jpg" },
  { id: "m-003", name: "NO F#CKS GIVEN TEE", price: "R 450", src: "/merch/nfg-tee.jpg" },
  { id: "m-004", name: "SYNDICATE RED EYE HOODIE", price: "R 850", src: "/merch/planet-tee.jpg" },
  { id: "m-005", name: "GREEN ALIEN PORTRAIT TEE", price: "R 450", src: "/merch/specimen-tee.jpg" }
];

const PHYSICAL_ASSETS = [
  { id: "p-001", name: "KNYSNA'S SAVIOUR (DELUXE VINYL + COMIC)", price: "R 650", src: "/merch/stare-tee.jpg", status: "PRE-ORDER" }
];

const DIGITAL_ASSETS = [
  { id: "d-001", name: "DEMONS DON'T SLEEP (MASTER STEMS)", price: "R 300", type: "AUDIO", status: "AVAILABLE" },
  { id: "d-002", name: "SYNDICATE UI ASSET & FONT PACK", price: "R 200", type: "ASSETS", status: "AVAILABLE" }
];

export default function Arsenal() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 relative z-10">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-toxic/30 pb-4 mb-12">
        <div>
          <span className="text-toxic font-mono text-[10px] tracking-widest uppercase mb-2 block">
            OFFICIAL SYNDICATE SUPPLY DEPOT
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
            MERCHANDISE
          </h2>
        </div>
        <Link 
          href="/merchandise" 
          className="mt-6 md:mt-0 inline-flex items-center border border-toxic px-6 py-3 text-toxic font-mono text-xs font-bold tracking-widest uppercase transition-colors hover:bg-toxic hover:text-black whitespace-nowrap shadow-[0_0_15px_rgba(0,255,0,0.2)]"
        >
          ENTER FULL VAULT &rarr;
        </Link>
      </div>

      {/* APPAREL SECTION */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-5 bg-toxic"></div>
          <h3 className="font-black text-white tracking-widest uppercase text-lg">APPAREL DROPS</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {APPAREL_DROPS.map((item) => (
            <Link href="/merchandise" key={item.id} className="group flex flex-col border border-white/10 bg-[#050505] transition-all duration-500 hover:border-toxic/60 relative cursor-pointer">
              <div className="relative aspect-square w-full overflow-hidden bg-zinc-900 border-b border-white/5">
                <Image src={item.src} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105 z-10" />
              </div>
              <div className="p-5 flex flex-col">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-black uppercase tracking-wide leading-tight text-white group-hover:text-toxic transition-colors pr-4">
                    {item.name}
                  </h3>
                  <span className="font-mono text-xs text-toxic whitespace-nowrap">{item.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* PHYSICAL ASSETS SECTION */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-5 bg-toxic"></div>
            <h3 className="font-black text-white tracking-widest uppercase text-lg">PHYSICAL ASSETS</h3>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {PHYSICAL_ASSETS.map((item) => (
              <Link href="/merchandise" key={item.id} className="group flex items-center gap-6 border border-white/10 bg-[#050505] p-4 transition-all duration-500 hover:border-toxic/60">
                <div className="relative h-24 w-24 flex-shrink-0 bg-zinc-900 overflow-hidden border border-white/5">
                  <Image src={item.src} alt={item.name} fill sizes="96px" className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex flex-col flex-grow">
                  <span className="text-toxic font-mono text-[10px] tracking-widest mb-1">{item.status}</span>
                  <h3 className="text-sm font-black text-white uppercase group-hover:text-toxic transition-colors leading-tight mb-2">{item.name}</h3>
                  <span className="font-mono text-xs text-zinc-400">{item.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* DIGITAL ASSETS SECTION */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-5 bg-toxic"></div>
            <h3 className="font-black text-white tracking-widest uppercase text-lg">DIGITAL ASSETS</h3>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {DIGITAL_ASSETS.map((item) => (
              <Link href="/merchandise" key={item.id} className="group flex items-center gap-6 border border-white/10 bg-[#050505] p-4 transition-all duration-500 hover:border-toxic/60">
                <div className="h-24 w-24 flex-shrink-0 bg-zinc-900 border border-white/5 flex items-center justify-center">
                  <span className="text-zinc-600 font-mono text-xs tracking-widest">[{item.type}]</span>
                </div>
                <div className="flex flex-col flex-grow">
                  <span className="text-toxic font-mono text-[10px] tracking-widest mb-1">{item.status}</span>
                  <h3 className="text-sm font-black text-white uppercase group-hover:text-toxic transition-colors leading-tight mb-2">{item.name}</h3>
                  <span className="font-mono text-xs text-zinc-400">{item.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
