"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ARTIST_PROFILE } from "@/data/artist";
import { GALLERY_ARTWORKS, type GalleryArtwork } from "@/data/gallery-artworks";

const collections = ["All Works", ...Array.from(new Set(GALLERY_ARTWORKS.map((artwork) => artwork.collection)))];

export default function GalleryExperience() {
  const [collection, setCollection] = useState("All Works");
  const [query, setQuery] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState<GalleryArtwork | null>(null);
  const dialogRef = useRef<HTMLElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const artworks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return GALLERY_ARTWORKS.filter((artwork) => {
      const matchesCollection = collection === "All Works" || artwork.collection === collection;
      const matchesQuery = !normalizedQuery || `${artwork.title} ${artwork.medium} ${artwork.description}`.toLowerCase().includes(normalizedQuery);
      return matchesCollection && matchesQuery;
    });
  }, [collection, query]);

  useEffect(() => {
    if (!selectedArtwork) return;

    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusableSelector = "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";
    const focusCloseButton = () => dialogRef.current?.querySelector<HTMLElement>("button:not([disabled])")?.focus();
    const focusableElements = () => Array.from(dialogRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    focusCloseButton();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedArtwork(null);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = focusableElements();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (previouslyFocusedRef.current?.isConnected) previouslyFocusedRef.current.focus();
    };
  }, [selectedArtwork]);

  return (
    <main className="min-h-screen bg-black pb-24 pt-24 text-white">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-toxic">Complete collection</p>
        <h1 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-6xl">Full Gallery</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">Browse the full painting collection. Select a work to view its details.</p>

        <div className="mt-8 flex flex-col gap-4 border-y border-white/10 py-5 md:flex-row md:items-center md:justify-between">
          <label className="sr-only" htmlFor="gallery-search">Search artwork</label>
          <input
            id="gallery-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search titles, mediums, and details"
            className="w-full border border-white/15 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-toxic md:max-w-sm"
          />
          <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Filter artwork by collection">
            {collections.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCollection(item)}
                aria-pressed={collection === item}
                className={`shrink-0 border px-3 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors ${collection === item ? "border-toxic bg-toxic text-black" : "border-white/15 text-zinc-300 hover:border-toxic hover:text-toxic"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {artworks.length ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((artwork) => (
              <button
                key={artwork.id}
                type="button"
                onClick={() => setSelectedArtwork(artwork)}
                className="group border border-white/10 bg-zinc-950 text-left transition-colors hover:border-toxic/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-toxic"
                aria-label={`View details for ${artwork.title}`}
              >
                <span className="relative block aspect-[4/5] overflow-hidden bg-black">
                  <Image src={artwork.src} alt={artwork.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 border border-toxic/40 bg-black/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-toxic">{artwork.status}</span>
                </span>
                <span className="block p-5">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-black tracking-wide text-white group-hover:text-toxic">{artwork.title}</span>
                    <span className="font-mono text-xs text-zinc-500">{artwork.year}</span>
                  </span>
                  <span className="mt-2 block text-sm text-zinc-400">{artwork.medium}</span>
                  <span className="mt-4 block font-mono text-[10px] uppercase tracking-wider text-zinc-500">{artwork.collection}</span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-10 border border-white/10 bg-zinc-950 p-8 text-center text-zinc-400">No works match that search.</p>
        )}
      </section>

      <section className="border-y border-toxic/20 bg-zinc-950/60 py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 md:grid-cols-[240px_1fr]">
          <div className="relative mx-auto aspect-square w-full max-w-[240px] overflow-hidden border border-toxic/30">
            <Image src={ARTIST_PROFILE.portrait} alt={ARTIST_PROFILE.name} fill sizes="240px" className="object-cover" />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-toxic">The artist</p>
            <h2 className="mt-2 text-3xl font-black uppercase text-white">{ARTIST_PROFILE.name}</h2>
            <p className="mt-4 leading-relaxed text-zinc-300">{ARTIST_PROFILE.galleryBiography}</p>
          </div>
        </div>
      </section>

      {selectedArtwork && (
        <div
          className="fixed inset-0 z-[2100] flex items-center justify-center overflow-y-auto bg-black/90 p-4 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedArtwork(null);
          }}
        >
          <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="artwork-title" className="grid w-full max-w-5xl grid-cols-1 overflow-hidden border border-toxic/30 bg-zinc-950 md:grid-cols-2">
            <div className="relative min-h-[320px] bg-black md:min-h-[600px]">
              <Image src={selectedArtwork.src} alt={selectedArtwork.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-4" />
            </div>
            <div className="p-6 md:p-10">
              <button type="button" onClick={() => setSelectedArtwork(null)} className="float-right border border-white/20 px-3 py-2 font-mono text-xs text-zinc-300 hover:border-toxic hover:text-toxic">Close</button>
              <p className="font-mono text-xs uppercase tracking-widest text-toxic">{selectedArtwork.collection}</p>
              <h2 id="artwork-title" className="mt-4 text-3xl font-black uppercase text-white">{selectedArtwork.title}</h2>
              <p className="mt-2 font-mono text-sm text-zinc-500">{selectedArtwork.year} ┬╖ {selectedArtwork.status}</p>
              <p className="mt-8 leading-relaxed text-zinc-300">{selectedArtwork.description}</p>
              <dl className="mt-8 space-y-4 border-t border-white/10 pt-6 text-sm">
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Medium</dt><dd className="mt-1 text-zinc-200">{selectedArtwork.medium}</dd></div>
                <div><dt className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Dimensions</dt><dd className="mt-1 text-zinc-200">{selectedArtwork.dimensions}</dd></div>
              </dl>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
