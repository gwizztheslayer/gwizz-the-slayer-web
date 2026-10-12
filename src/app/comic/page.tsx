"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const comicPages = [
  "/comic/knysna-saviour-cover.png",
  "/comic/page-1.png",
  "/comic/page-2.png",
  "/comic/page-3.png",
  "/comic/page-4.png",
  "/comic/page-5.png",
  "/comic/page-6.png"
];

export default function ComicReaderPage() {
  const [hasEntered, setHasEntered] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const previousPage = useCallback(() => setCurrentPage((page) => Math.max(0, page - 1)), []);
  const nextPage = useCallback(() => setCurrentPage((page) => Math.min(comicPages.length - 1, page + 1)), []);

  useEffect(() => {
    if (!hasEntered) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") nextPage();
      if (event.key === "ArrowLeft") previousPage();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasEntered, nextPage, previousPage]);

  const enterReader = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      void audioRef.current.play().catch(() => undefined);
    }
  };

  return (
    <main className="min-h-screen bg-black pt-16 text-white">
      <audio ref={audioRef} src="/audio/ambient-loop.mp3" loop />
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col px-4 py-6 md:px-8">
        <header className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <Link href="/" className="font-mono text-xs uppercase tracking-widest text-zinc-400 hover:text-toxic">← Back to home</Link>
          <p className="text-right font-mono text-xs font-bold uppercase tracking-widest text-toxic">Knysna&apos;s Saviour · Issue 1</p>
        </header>

        <section className="border-b border-toxic/20 py-7">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-toxic">Original webcomic</p>
          <h1 className="mt-2 text-4xl font-black uppercase tracking-tight text-white md:text-6xl">Comic Book</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">Read Knysna&apos;s Saviour in the interactive reader below. Open the cover to begin, then use the arrow buttons or keyboard to move through the issue.</p>
        </section>

        <div className="flex flex-1 flex-col items-center justify-center py-6">
          {!hasEntered ? (
            <div className="flex w-full max-w-xl flex-col items-center border border-zinc-800 bg-zinc-950 px-6 py-16 text-center">
              <Image src="/comic/knysna-saviour-cover.png" alt="Knysna's Saviour cover" width={360} height={540} className="mb-8 max-h-[50vh] w-auto object-contain" priority />
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400">Official comic book</p>
              <h2 className="mt-3 text-3xl font-black uppercase">Knysna&apos;s Saviour</h2>
              <button type="button" onClick={enterReader} className="mt-8 border border-toxic px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest text-toxic hover:bg-toxic hover:text-black">Open reader</button>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center">
              <div className="relative h-[65vh] min-h-[360px] w-full max-w-5xl border border-zinc-800 bg-zinc-950">
                <Image src={comicPages[currentPage]} alt={currentPage === 0 ? "Knysna's Saviour cover" : `Knysna's Saviour page ${currentPage}`} fill sizes="(max-width: 768px) 100vw, 80vw" className="object-contain p-3 md:p-6" priority />
              </div>
              <div className="mt-4 flex w-full max-w-5xl items-center justify-between gap-4 border-t border-zinc-800 pt-4 font-mono text-xs uppercase tracking-widest">
                <button type="button" onClick={previousPage} disabled={currentPage === 0} className="px-3 py-3 text-zinc-300 hover:text-toxic disabled:cursor-not-allowed disabled:opacity-30">Previous</button>
                <span className="text-zinc-500">{currentPage === 0 ? "Cover" : `Page ${currentPage}`} · {currentPage + 1} / {comicPages.length}</span>
                <button type="button" onClick={nextPage} disabled={currentPage === comicPages.length - 1} className="px-3 py-3 text-zinc-300 hover:text-toxic disabled:cursor-not-allowed disabled:opacity-30">Next</button>
              </div>
              <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-widest text-zinc-600">Use the arrow keys to turn pages</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
