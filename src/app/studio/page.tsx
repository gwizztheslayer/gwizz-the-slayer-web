export default function StudioArchives() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-20 font-mono">
      <header className="mb-12 border-b border-zinc-800 pb-8">
        <h1 className="text-4xl font-black text-cyan-400 uppercase tracking-widest">Studio Archives</h1>
        <p className="text-zinc-500 mt-2 tracking-wider">Production Breakdowns, FL Studio Arrangements & Canvas Preparation</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="border border-zinc-800 p-6 hover:border-zinc-600 transition-colors">
          <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">Audio Engineering</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Raw insights into FL Studio project files, vocal chain routing, and beat arrangement architectures.
          </p>
          <button className="text-cyan-400 text-xs border border-cyan-900 px-4 py-2 hover:bg-cyan-950 uppercase transition-colors">Access Logs</button>
        </section>
        <section className="border border-zinc-800 p-6 hover:border-zinc-600 transition-colors">
          <h2 className="text-xl font-bold text-white uppercase mb-4 tracking-wider">Visual Mediums</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-4">
            Time-lapse records of acrylic canvas treatments, drafting stages, and final layer applications.
          </p>
          <button className="text-cyan-400 text-xs border border-cyan-900 px-4 py-2 hover:bg-cyan-950 uppercase transition-colors">Access Logs</button>
        </section>
      </div>
    </main>
  );
}
