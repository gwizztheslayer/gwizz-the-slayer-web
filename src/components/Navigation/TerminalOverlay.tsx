"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const MENU_CATEGORIES = [
  {
    title: "AUDIO & TRANSMISSIONS",
    links: [
      { name: "DISCOGRAPHY", path: "/discography" },
      { name: "DEMONS DON'T SLEEP", path: "/demons-dont-sleep" },
      { name: "STUDIO & LYRICS", path: "/lyrics" },
      { name: "VAULT STREAMS", path: "/vault" }
    ]
  },
  {
    title: "PHYSICAL ASSETS",
    links: [
      { name: "PHYSICAL WORK", path: "/physical-work" },
      { name: "FULL GALLERY", path: "/gallery" },
      { name: "SUPPLY DEPOT (MERCH & ARSENAL)", path: "/merchandise" }
    ]
  },
  {
    title: "LORE & ARCHIVES",
    links: [
      { name: "COMIC BOOK", path: "/comic" },
      { name: "LORE DATABASE", path: "/lore" },
      { name: "VISUALS", path: "/visuals" },
      { name: "ARTICLES", path: "/articles" }
    ]
  },
  {
    title: "COMMLINK",
    links: [
      { name: "LIVE EVENTS", path: "/live-events" },
      { name: "KAIRO", path: "/kairo" },
      { name: "AVC TERMINAL", path: "/avc" },
      { name: "NETWORK", path: "/network" },
      { name: "SUPPORT", path: "/support" }
    ]
  }
];

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:top-6 md:bottom-auto z-[9999] h-14 w-14 border border-toxic bg-black text-toxic flex items-center justify-center hover:bg-toxic hover:text-black transition-colors shadow-[0_0_15px_rgba(0,255,0,0.2)]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>

      <div className={`fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl transition-all duration-500 overflow-y-auto ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="min-h-screen p-8 md:p-16 max-w-7xl mx-auto flex flex-col relative">
          
          <div className="flex justify-between items-center border-b border-toxic/30 pb-6 mb-12">
            <div className="flex flex-col">
              <span className="text-toxic font-mono text-xs tracking-[0.3em] uppercase">[ SYNDICATE TERMINAL ]</span>
              <span className="text-white font-black text-2xl tracking-widest uppercase">Global Navigation</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-toxic transition-colors p-2">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 flex-grow">
            {MENU_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="flex flex-col">
                <h3 className="text-toxic font-mono text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-3">
                  <div className="w-1 h-4 bg-toxic"></div>
                  {cat.title}
                </h3>
                <div className="flex flex-col gap-4 pl-4 border-l border-white/10">
                  {cat.links.map((link, lIdx) => (
                    <Link 
                      key={lIdx} 
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-zinc-400 font-mono text-xs md:text-sm uppercase tracking-wider hover:text-white transition-colors flex items-center group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 text-toxic mr-2 transition-opacity">&gt;</span>
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="text-zinc-600 font-mono text-[10px] tracking-widest uppercase">G-WIZZ, THE SLAYER © 2026</span>
            <Link href="/vault/auth" onClick={() => setIsOpen(false)} className="border border-toxic px-6 py-2 text-toxic font-mono text-xs font-bold tracking-widest uppercase hover:bg-toxic hover:text-black transition-colors">
              AUTHORIZED LOGIN
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

