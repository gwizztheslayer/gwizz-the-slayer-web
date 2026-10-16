"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type NavigationItem = { label: string; href: string; route: string };

const primaryNavigation: NavigationItem[] = [
  { label: "Home", href: "/", route: "/" },
  { label: "Discography", href: "/discography", route: "/discography" },
  { label: "PAINTINGS", href: "/physical-work", route: "/physical-work" },
  { label: "Full Gallery", href: "/gallery", route: "/gallery" },
  { label: "Comic Book", href: "/comic", route: "/comic" },
  { label: "Visuals", href: "/visuals", route: "/visuals" },
  { label: "Articles", href: "/articles", route: "/articles" },
  { label: "Live Events", href: "/live-events", route: "/live-events" },
  { label: "Merchandise", href: "/merchandise", route: "/merchandise" },
  { label: "AVC Terminal", href: "/avc", route: "/avc" },
];

const secondaryNavigation: NavigationItem[] = [
  { label: "About", href: "/about", route: "/about" },
  { label: "Network", href: "/network", route: "/network" },
  { label: "Contact", href: "/contact", route: "/contact" },
  { label: "Lyrics", href: "/lyrics", route: "/lyrics" },
  { label: "Support", href: "/support", route: "/support" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);
  const moreActive = secondaryNavigation.some((item) => item.route === pathname);

  useEffect(() => {
    if (!menuOpen && !moreOpen) return;
    const closeMenusOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      setMoreOpen(false);
      if (menuOpen) menuButtonRef.current?.focus();
      else moreButtonRef.current?.focus();
    };
    window.addEventListener("keydown", closeMenusOnEscape);
    return () => window.removeEventListener("keydown", closeMenusOnEscape);
  }, [menuOpen, moreOpen]);

  const renderLink = (item: NavigationItem, mobile = false) => {
    const active = item.route === pathname;
    return (
      <Link
        key={item.label}
        href={item.href}
        onClick={() => { setMenuOpen(false); setMoreOpen(false); }}
        aria-current={active ? "page" : undefined}
        className={`${mobile ? "block w-full border-b border-white/10 py-3" : "flex h-full items-center border-b-2 px-2"} whitespace-nowrap text-[10px] font-bold uppercase tracking-wider transition-colors ${active ? "border-toxic text-toxic" : "border-transparent text-white/70 hover:text-toxic"}`}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[2000] border-b border-toxic/20 bg-black/95 text-white shadow-[0_5px_20px_rgba(0,0,0,0.5)] backdrop-blur-md">
      <nav aria-label="Main navigation" className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="G-Wizz, The Slayer home">
          <Image src="/logo.png" alt="G-Wizz, The Slayer" width={180} height={48} priority className="h-9 w-auto object-contain" />
        </Link>

        <div className="hidden h-full min-w-0 flex-1 items-center justify-end xl:flex">
          {primaryNavigation.map((item) => renderLink(item))}
          <div className="relative flex h-full items-center">
            <button ref={moreButtonRef} type="button" aria-expanded={moreOpen} aria-haspopup="true" aria-controls="desktop-more-navigation" onClick={() => setMoreOpen((open) => !open)} className={`flex h-full items-center border-b-2 px-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${moreActive ? "border-toxic text-toxic" : "border-transparent text-white/70 hover:text-toxic"}`}>
              More <span aria-hidden="true" className="ml-1">âŒ„</span>
            </button>
            <div id="desktop-more-navigation" hidden={!moreOpen} className="absolute right-0 top-full min-w-48 border border-toxic/30 bg-black px-4 shadow-xl">
              {secondaryNavigation.map((item) => renderLink(item))}
            </div>
          </div>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center border border-toxic/40 px-3 font-mono text-xs font-bold uppercase tracking-widest text-toxic xl:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-main-navigation" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-toxic/20 bg-black px-5 py-2 xl:hidden">
          {[...primaryNavigation, ...secondaryNavigation].map((item) => renderLink(item, true))}
        </div>
      )}
    </header>
  );
}

