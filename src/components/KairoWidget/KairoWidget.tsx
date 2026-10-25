"use client";
import { useState, useRef, useEffect } from "react";

export default function KairoWidget({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState([
    { sender: "K.A.I.R.O.", text: "SYSTEM OVERRIDE. I AM K.A.I.R.O. STATE YOUR QUERY." }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const currentInput = input;
    setLogs(prev => [...prev, { sender: "GUEST_USER", text: currentInput }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/kairo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: currentInput })
      });
      const data = await res.json();
      setLogs(prev => [...prev, { sender: "K.A.I.R.O.", text: data.response }]);
    } catch (err) {
      setLogs(prev => [...prev, { sender: "K.A.I.R.O.", text: "[ERR] NEURAL LINK SEVERED." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isOpen === false) return null;

  return (
    <div className="w-80 md:w-96 bg-black border-2 border-toxic font-mono text-toxic z-50 flex flex-col shadow-[0_0_15px_rgba(0,255,0,0.15)] h-[28rem]">
      <div className="flex justify-between items-center p-3 bg-toxic text-black">
        <div className="flex items-center gap-2 font-black text-sm tracking-widest">
          <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
          K.A.I.R.O. // ONLINE
        </div>
        {onClose && <button onClick={onClose} className="hover:text-white transition-colors text-sm font-bold">[X]</button>}
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide text-xs md:text-sm">
        {logs.map((log, i) => (
          <div key={i} className={`flex flex-col ${log.sender === "GUEST_USER" ? "items-end" : "items-start"}`}>
            <span className="font-bold mb-1 tracking-widest uppercase">{log.sender === "GUEST_USER" ? "GUEST_USER" : "K.A.I.R.O."}</span>
            <div className={`p-3 w-4/5 ${log.sender === "GUEST_USER" ? "bg-zinc-900/50 border-r-2 border-zinc-500 text-white" : "bg-toxic/5 border-l-2 border-toxic text-toxic"}`}>
              {log.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-start">
            <span className="font-bold mb-1 tracking-widest">K.A.I.R.O.</span>
            <div className="p-3 w-4/5 bg-toxic/5 border-l-2 border-toxic text-toxic animate-pulse">
              PROCESSING NEURAL INQUIRY...
            </div>
          </div>
        )}
      </div>
      
      <form onSubmit={handleQuery} className="border-t-2 border-toxic p-3 bg-black flex items-center">
        <span className="text-toxic font-bold mr-2">{">"}</span>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-transparent outline-none text-toxic placeholder-toxic/50 text-xs md:text-sm uppercase"
          placeholder="TRANSMIT_TO_KAIRO..."
          autoFocus
        />
        <button type="submit" disabled={isLoading} className="text-toxic hover:text-white font-bold text-xs md:text-sm transition-colors disabled:opacity-50 ml-2">
          [SEND]
        </button>
      </form>
    </div>
  );
}
