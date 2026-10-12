import React from 'react';

export default function TheArchitects() {
  const members = [
    { name: "CEOXCAM88", role: "EXECUTIVE PRODUCER", status: "ACTIVE" },
    { name: "ICEBERGH", role: "VOCALIST / WRITER", status: "ACTIVE" },
    { name: "ACIDIQ TRUTH", role: "VOCALIST / WRITER", status: "ACTIVE" },
    { name: "XXXCEPTIONAL", role: "VOCALIST / WRITER", status: "ACTIVE" }
  ];

  return (
    <section className="w-full py-24 bg-black border-t border-toxic/20 relative overflow-hidden font-mono">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        <div className="mb-16 border-b border-toxic/30 pb-6">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest aura-toxic-text">
            THE <span className="text-toxic">ARCHITECTS</span>
          </h2>
          <p className="text-toxic/60 tracking-[0.3em] mt-2 uppercase text-xs">
            [ FORGING THE KNYSNA UNDERGROUND SOUND ]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, idx) => (
            <div key={idx} className="bg-black/80 border border-toxic/30 p-6 shadow-[0_0_15px_rgba(57,255,20,0.05)] hover:shadow-[0_0_25px_rgba(57,255,20,0.15)] transition-all duration-500 group relative">
              <div className="absolute inset-0 bg-toxic/0 group-hover:bg-toxic/5 transition-colors duration-500 pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-8">
                <span className="text-toxic text-xs tracking-widest font-bold">0{idx + 1}</span>
                <span className="h-2 w-2 rounded-full bg-toxic animate-pulse shadow-[0_0_8px_rgba(57,255,20,0.8)]"></span>
              </div>
              
              <h3 className="text-xl font-black text-white uppercase tracking-widest mb-1 group-hover:text-toxic transition-colors">
                {member.name}
              </h3>
              <p className="text-xs text-zinc-400 tracking-widest uppercase border-t border-toxic/20 pt-2 mt-2">
                {member.role}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
