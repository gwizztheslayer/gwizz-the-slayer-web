"use client";
import { useState } from "react";
import Link from "next/link";

export default function AuthGate() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent">("idle");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#050505] border border-toxic/30 p-8 md:p-12 relative z-10 shadow-[0_0_30px_rgba(0,255,0,0.05)]">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="h-16 w-16 border-2 border-toxic mb-6 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-toxic/20 animate-pulse"></div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ff00" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
          <span className="text-red-500 font-mono text-[10px] tracking-[0.3em] uppercase mb-2 animate-pulse">[ RESTRICTED AREA ]</span>
          <h1 className="text-3xl font-black text-white uppercase tracking-widest">Vault Access</h1>
        </div>

        {status === "sent" ? (
          <div className="flex flex-col items-center text-center space-y-6">
            <span className="text-toxic font-mono text-sm uppercase tracking-widest">Link Transmitted</span>
            <p className="text-zinc-400 text-xs font-mono leading-relaxed">
              An encrypted access link has been sent to <span className="text-white">{email}</span>. Check your inbox to bypass the firewall.
            </p>
            <button onClick={() => setStatus("idle")} className="text-zinc-600 hover:text-toxic font-mono text-[10px] uppercase tracking-widest transition-colors mt-4">
              [ Retry Sequence ]
            </button>
          </div>
        ) : (
          <form onSubmit={handleAuth} className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-toxic font-mono text-[10px] uppercase tracking-widest">Identification (Email)</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operative@syndicate.com"
                className="bg-black border border-white/20 p-4 text-white font-mono text-xs focus:outline-none focus:border-toxic transition-colors placeholder:text-zinc-700"
              />
            </div>
            
            <button 
              type="submit"
              disabled={status === "loading"}
              className={`w-full py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all border
                ${status === "loading" 
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-500 cursor-wait' 
                  : 'bg-black border-toxic text-toxic hover:bg-toxic hover:text-black'}`}
            >
              {status === "loading" ? '[ AUTHENTICATING... ]' : '[ REQUEST ACCESS ]'}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
           <p className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
             By entering the vault, you agree to the Syndicate terms of engagement.
           </p>
        </div>
      </div>
      
      <Link href="/" className="mt-8 text-zinc-500 hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors z-10">
        &larr; Return to Surface
      </Link>
    </main>
  );
}
