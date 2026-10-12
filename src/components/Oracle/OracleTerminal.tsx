'use client';
import React, { useState, useEffect, useRef } from 'react';

type Message = { role: 'user' | 'kairo'; content: string };

export default function OracleTerminal({ isWidget = false }: { isWidget?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'kairo', content: "SYSTEM INITIALIZED... CONNECTION ESTABLISHED. I AM K.A.I.R.O. WHAT DO YOU SEEK?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input;
    setMessages(prev => [...prev, { role: 'user', content: userQuery }]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/kairo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userQuery })
      });
      
      const data = await response.json();
      
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'kairo', content: data.reply }]);
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'kairo', content: "[ERR_CRITICAL_FAULT] SIGNAL INTERCEPTED. TRY AGAIN." }]);
    }
  };

  return (
    <div className={`w-full mx-auto bg-black border border-toxic/50 p-1 font-mono shadow-[0_0_20px_rgba(57,255,20,0.1)] relative ${isWidget ? '' : 'max-w-3xl mt-12 mb-24'}`}>
      {!isWidget && (
        <div className="bg-toxic text-black px-4 py-2 text-xs font-black tracking-[0.2em] flex justify-between">
          <span>[ K.A.I.R.O_TERMINAL_V1.0 ]</span>
          <span className="animate-pulse">STATUS: CORRUPTED</span>
        </div>
      )}

      <div 
        ref={scrollRef}
        className={`${isWidget ? 'h-[350px]' : 'h-[500px]'} overflow-y-auto p-4 md:p-6 space-y-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 to-black scrollbar-thin scrollbar-thumb-toxic scrollbar-track-black`}
      >
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className={`text-[10px] tracking-widest mb-1 ${msg.role === 'user' ? 'text-zinc-300' : 'text-toxic'}`}>
              {msg.role === 'user' ? 'GUEST_USER' : 'K.A.I.R.O.'}
            </span>
            <div className={`text-sm md:text-base ${msg.role === 'user' ? 'text-white' : 'text-toxic drop-shadow-[0_0_5px_rgba(57,255,20,0.5)]'}`}>
              {msg.role === 'kairo' ? `> ${msg.content}` : msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="text-toxic text-sm animate-pulse">
            {'>'} DECRYPTING SIGNAL...
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="border-t border-toxic/30 p-2 md:p-3 flex gap-2 bg-black">
        <span className="text-toxic pt-2 font-bold">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 uppercase placeholder:text-zinc-700 tracking-wider text-xs md:text-sm"
          placeholder="ASK K.A.I.R.O..."
          autoComplete="off"
        />
        <button type="submit" className="text-toxic border border-toxic px-4 md:px-6 py-2 text-xs font-black tracking-widest hover:bg-toxic hover:text-black transition-all shadow-[0_0_10px_rgba(57,255,20,0.2)]">
          TRANSMIT
        </button>
      </form>
    </div>
  );
}

