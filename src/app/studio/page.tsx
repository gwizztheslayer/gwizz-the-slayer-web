"use client";
import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";

export default function StudioArchives() {
  const [activeLog, setActiveLog] = useState<string | null>(null);

  const toggleLog = (logId: string) => {
    setActiveLog(activeLog === logId ? null : logId);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-20 font-mono">
      <header className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-4xl font-black text-cyan-400 uppercase tracking-widest">Studio Archives</h1>
        <p className="text-zinc-500 mt-2 tracking-wider">Production Breakdowns, FL Studio Arrangements & Canvas Preparation</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="border border-zinc-800 p-6 hover:border-zinc-600 transition-colors bg-zinc-950/50">
          <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">Audio Engineering</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Raw insights into FL Studio project files, vocal chain routing, and beat arrangement architectures.
          </p>
          <button 
            onClick={() => toggleLog('audio')}
            className="text-cyan-400 text-xs border border-cyan-900 px-4 py-2 hover:bg-cyan-950 uppercase transition-colors"
          >
            {activeLog === 'audio' ? 'CLOSE LOGS' : 'ACCESS LOGS'}
          </button>
          <AnimatePresence>
            {activeLog === 'audio' && (
              <m.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden border-t border-zinc-800"
              >
                <div className="pt-4 text-xs text-zinc-500">
                  [SYS_MSG: SECURE AUDIO LOGS PENDING UPLOAD]
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </section>
        
        <section className="border border-zinc-800 p-6 hover:border-zinc-600 transition-colors bg-zinc-950/50">
          <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">Visual Mediums</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Time-lapse records of acrylic canvas treatments, drafting stages, and final layer applications.
          </p>
          <button 
            onClick={() => toggleLog('visual')}
            className="text-cyan-400 text-xs border border-cyan-900 px-4 py-2 hover:bg-cyan-950 uppercase transition-colors"
          >
            {activeLog === 'visual' ? 'CLOSE LOGS' : 'ACCESS LOGS'}
          </button>
          <AnimatePresence>
            {activeLog === 'visual' && (
              <m.div 
                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                className="overflow-hidden border-t border-zinc-800"
              >
                <div className="pt-4 text-xs text-zinc-500">
                  [SYS_MSG: TIME-LAPSE RECORDS PENDING UPLOAD]
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}
