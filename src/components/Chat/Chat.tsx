"use client";
import { useState } from "react";

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setStatus("loading");
    
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (res.ok) {
        setStatus("success");
        setMessage("");
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("idle");
      }
    } catch (error) {
      setStatus("idle");
    }
  };

  return (
    <div className="fixed bottom-24 right-4 z-[90] flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-96 bg-[#050505] border border-toxic/30 mb-4 flex flex-col shadow-[0_0_20px_rgba(57,255,20,0.1)] overflow-hidden">
          <div className="bg-void border-b border-toxic/20 p-4 flex justify-between items-center">
            <h3 className="text-toxic font-black tracking-widest text-xs uppercase">Syndicate Comms</h3>
            <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-toxic">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 p-3 self-start max-w-[85%] rounded-br-xl rounded-tr-xl rounded-tl-xl">
              <p className="text-white/80 text-sm font-mono">Connection established. Leave a transmission.</p>
            </div>
            {status === "success" && (
              <div className="bg-toxic/10 border border-toxic p-3 self-end max-w-[85%] rounded-bl-xl rounded-tr-xl rounded-tl-xl">
                <p className="text-toxic text-sm font-mono">Transmission secured. The Syndicate will review.</p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 flex gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="ENTER SECURE COMM..." 
              disabled={status === "loading"}
              className="bg-black border border-white/40 p-2 text-white font-mono text-xs w-full focus:outline-none focus:border-toxic disabled:opacity-50"
            />
            <button type="submit" disabled={status === "loading"} className="bg-toxic text-black px-3 font-black tracking-widest text-xs hover:bg-white transition-colors disabled:opacity-50">
              {status === "loading" ? "..." : ">"}
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-toxic text-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_15px_rgba(57,255,20,0.4)]"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path></svg>
        )}
      </button>
    </div>
  );
}