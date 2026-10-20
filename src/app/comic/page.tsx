export default function ComicReader() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-20 font-mono">
      <header className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-4xl font-black text-cyan-400 uppercase tracking-widest">Knysna's Saviour</h1>
        <p className="text-zinc-500 mt-2 tracking-wider">Interactive Webcomic / Collaboration with Icebergh</p>
      </header>
      <div className="w-full max-w-4xl mx-auto aspect-[2/3] bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
        [COMIC PANEL VIEWER ENGINE INITIALIZED - AWAITING ASSETS]
      </div>
      <div className="w-full max-w-4xl mx-auto mt-6 flex justify-between">
        <button className="text-zinc-400 hover:text-cyan-400 uppercase text-sm tracking-widest transition-colors">&lt; PREV PANEL</button>
        <button className="text-zinc-400 hover:text-cyan-400 uppercase text-sm tracking-widest transition-colors">NEXT PANEL &gt;</button>
      </div>
    </main>
  );
}
