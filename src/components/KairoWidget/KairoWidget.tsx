"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function KairoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState<{sender: "sys" | "user", text: string}[]>([
    { sender: "sys", text: "SYSTEM OVERRIDE. I AM K.A.I.R.O. STATE YOUR QUERY." }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setChatLog(prev => [...prev, { sender: "user", text: message }]);
    const currentMessage = message;
    setMessage("");

    setTimeout(() => {
      setChatLog(prev => [...prev, { 
        sender: "sys", 
        text: `PROCESSING... DATA LOGGED. NEURAL NET REQUIRES API INTEGRATION TO FULLY EXECUTE: "${currentMessage.substring(0, 15)}..."` 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-[110px] md:bottom-[120px] right-4 md:right-6 z-[9999] font-mono flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-6 w-[85vw] sm:w-80 bg-zinc-950 border border-toxic shadow-[0_0_30px_rgba(57,255,20,0.15)] flex flex-col overflow-hidden origin-bottom-right"
          >
            <div className="bg-toxic text-black p-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black tracking-[0.2em] uppercase">
                  K.A.I.R.O. // ONLINE
                </span>
              </div>
              <button aria-label="Close Kairo Widget" onClick={() => setIsOpen(false)} className="hover:text-white transition-colors text-xs font-bold">
                [X]
              </button>
            </div>

            <div className="h-72 p-4 overflow-y-auto space-y-4 text-xs flex flex-col scrollbar-thin scrollbar-thumb-toxic scrollbar-track-black bg-[url('/noise.png')] bg-cover mix-blend-lighten">
              {chatLog.map((msg, idx) => (
                <div key={idx} className={`max-w-[85%] ${msg.sender === "user" ? "self-end" : "self-start"}`}>
                  <div className={`text-[9px] tracking-widest mb-1 ${msg.sender === "user" ? "text-right text-zinc-300" : "text-toxic"}`}>
                    {msg.sender === "user" ? "GUEST_USER" : "K.A.I.R.O."}
                  </div>
                  <div className={`p-3 ${msg.sender === "user" ? "bg-zinc-900 text-white border-r-2 border-zinc-500" : "bg-black text-zinc-300 border-l-2 border-toxic shadow-[0_0_10px_rgba(57,255,20,0.1)]"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-3 border-t border-zinc-900 bg-black flex gap-2 items-center">
              <span className="text-toxic text-xs">{">"}</span>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="TRANSMIT_TO_KAIRO..."
                className="flex-1 bg-transparent border-none outline-none text-toxic text-xs placeholder-zinc-400"
              />
              <button aria-label="Send Message" type="submit" className="text-zinc-300 hover:text-toxic text-[10px] tracking-widest transition-colors uppercase font-bold">
                [SEND]
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        aria-label="Toggle Kairo Agent"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#39FF14] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.5)] border-2 border-black cursor-pointer group"
      >
        <svg aria-hidden="true" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </motion.button>
      
    </div>
  );
}