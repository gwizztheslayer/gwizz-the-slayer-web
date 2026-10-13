"use client";
import Image from "next/image";
import Link from "next/link";

const FEATURED_MERCH = [
  { id: "m-001", name: "SMOKED OUT HALO HOODIE", price: "R 850", src: "/merch/halo-hoodie.jpg" },
  { id: "m-002", name: "APOCALYPTIC VISION HOODIE", price: "R 850", src: "/merch/apoc-hoodie.jpg" },
  { id: "m-003", name: "NO F#CKS GIVEN TEE", price: "R 450", src: "/merch/nfg-tee.jpg" }
];

export default function HomeMerchSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      
      {/* HEADER - PERFECTLY MATCHING DISCOGRAPHY LAYOUT */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-4 mb-8">
        <div>
          <span className="text-toxic font-mono text-[10px] tracking-widest uppercase mb-2 block">
            OFFICIAL SYNDICATE UNIFORM
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
            MERCHANDISE
          </h2>
        </div>
        <Link 
          href="/merchandise" 
          className="mt-6 md:mt-0 inline-flex items-center border border-toxic px-6 py-2 text-toxic font-mono text-xs font-bold tracking-widest uppercase transition-colors hover:bg-toxic hover:text-black whitespace-nowrap"
        >
          ENTER FULL VAULT &rarr;
        </Link>
      </div>

      {/* SUB-SECTION DIVIDER (Matching the | ALBUMS formatting) */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-5 bg-toxic"></div>
        <h3 className="font-black text-white tracking-widest uppercase text-lg">LATEST DROPS</h3>
      </div>

      {/* MERCH PREVIEW GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURED_MERCH.map((item) => (
          <Link href="/merchandise" key={item.id} className="group flex flex-col border border-white/10 bg-[#050505] transition-all duration-500 hover:border-toxic/60 relative cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-900 border-b border-white/5">
              <Image src={item.src} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105 z-10" />
              <div className="absolute inset-0 flex items-center justify-center text-zinc-800 font-mono text-xs z-0">
                [ LOADING ]
              </div>
            </div>
            <div className="p-5 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-black uppercase tracking-wide leading-tight text-white group-hover:text-toxic transition-colors pr-4">
                  {item.name}
                </h3>
                <span className="font-mono text-sm text-toxic whitespace-nowrap">{item.price}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}