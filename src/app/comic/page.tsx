"use client";
import { useState, useEffect, useCallback } from "react";
import { m, AnimatePresence } from "framer-motion";

export default function ComicReader() {
  const [currentPanel, setCurrentPanel] = useState(0);
  const totalPanels = 3; // Engine capacity placeholder

  const nextPanel = useCallback(() => {
    setCurrentPanel((prev) => (prev < totalPanels - 1 ? prev + 1 : prev));
  }, [totalPanels]);

  const prevPanel = useCallback(() => {
    setCurrentPanel((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextPanel();
      if (e.key === "ArrowLeft") prevPanel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextPanel, prevPanel]);

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-20 font-mono">
      <header className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-4xl font-black text-cyan-400 uppercase tracking-widest">Knysna's Saviour</h1>
        <p className="text-zinc-500 mt-2 tracking-wider">Interactive Webcomic / Collaboration with Icebergh</p>
      </header>
      
      <div className="w-full max-w-4xl mx-auto aspect-[2/3] bg-zinc-950 border border-zinc-800 relative overflow-hidden flex items-center justify-center text-zinc-600">
        <AnimatePresence mode="wait">
          <m.div
            key={currentPanel}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            [PANEL {currentPanel + 1} ASSET PENDING]
          </m.div>
        </AnimatePresence>
      </div>
      
      <div className="w-full max-w-4xl mx-auto mt-6 flex justify-between items-center">
        <button 
          onClick={prevPanel}
          disabled={currentPanel === 0}
          className="text-zinc-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-zinc-400 uppercase text-sm tracking-widest transition-colors"
        >
          &lt; PREV PANEL
        </button>
        <span className="text-xs text-zinc-600 font-bold">{currentPanel + 1} / {totalPanels}</span>
        <button 
          onClick={nextPanel}
          disabled={currentPanel === totalPanels - 1}
          className="text-zinc-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-zinc-400 uppercase text-sm tracking-widest transition-colors"
        >
          NEXT PANEL &gt;
        </button>
      </div>
    </main>
  );
}
