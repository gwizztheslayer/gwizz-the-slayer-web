"use client";
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

export default function KairoTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([
    "[SYSTEM] K.A.I.R.O. Neural Link Established.", 
    "[AVALON OBSIDIAN] Awaiting operative input..."
  ]);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLogs(prev => [...prev, `> ${input}`]);
    const currentInput = input;
    setInput("");

    const res = await fetch("/api/kairo", {
      method: "POST",
      body: JSON.stringify({ query: currentInput })
    });
    const data = await res.json();
    setLogs(prev => [...prev, `[K.A.I.R.O] ${data.response}`]);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-black border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.7)] flex items-center justify-center text-cyan-400 z-50 hover:scale-105 transition-all"
      >
        <span className="font-mono font-bold tracking-widest text-sm">K.AI</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <m.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 w-96 h-96 bg-zinc-950/95 border border-red-900/40 backdrop-blur-md p-5 font-mono text-cyan-500 z-50 flex flex-col shadow-[0_0_20px_rgba(127,29,29,0.2)] rounded-sm"
          >
            <div className="border-b border-red-900/30 pb-2 mb-3">
              <span className="text-red-500 text-xs tracking-widest uppercase animate-pulse">Neural Interface Active</span>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-hide text-sm">
              {logs.map((log, i) => (
                <div key={i} className="opacity-90">{log}</div>
              ))}
            </div>
            
            <form onSubmit={handleQuery} className="border-t border-cyan-900/50 pt-3 relative flex items-center">
              <span className="text-cyan-700 mr-2">{">"}</span>
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent outline-none text-cyan-400 placeholder-cyan-900 text-sm"
                placeholder="Query database..."
                autoFocus
              />
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
