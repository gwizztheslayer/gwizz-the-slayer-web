"use client";
import React, { useState } from "react";

export default function MasterStudioCMS() {
  const [activeTab, setActiveTab] = useState("LYRICS ENGINE");
  
  const [title, setTitle] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [lyricsText, setLyricsText] = useState("");
  const [status, setStatus] = useState("STATUS: AWAITING INPUT");

  const tabs = ["DASHBOARD", "ARSENAL (MERCH)", "AUDIO (MUSIC)", "MANGA TERMINAL", "LYRICS ENGINE"];

  const handleSaveToDatabase = async () => {
    if (!title || !lyricsText) {
      setStatus("ERROR: TITLE AND LYRICS REQUIRED");
      return;
    }
    
    setStatus("STATUS: TRANSMITTING TO MATRIX...");
    
    try {
      const response = await fetch("/api/studio/lyrics", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
        body: JSON.stringify({ title, text_content: lyricsText, cover_image: coverImage }),
      });

      if (response.ok) {
        setStatus("STATUS: LYRICS SUCCESSFULLY SAVED TO DATABASE");
        setTitle("");
        setCoverImage("");
        setLyricsText("");
      } else if (response.status === 401) {
        setStatus("ERROR: ADMIN TOKEN IS INVALID");
      } else if (response.status === 503) {
        setStatus("ERROR: ADMIN ACCESS IS NOT CONFIGURED");
      } else {
        setStatus("ERROR: DATABASE REJECTED PAYLOAD");
      }
    } catch (error) {
      setStatus("ERROR: CONNECTION FAILURE");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex font-mono">
      <aside className="w-64 bg-black border-r border-zinc-900 flex flex-col">
        <div className="p-6 border-b border-zinc-900">
          <h1 className="text-xl font-bold text-toxic tracking-widest">MASTER CMS</h1>
          <p className="text-[10px] text-zinc-400 mt-1 uppercase">G-Wizz The Slayer</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left p-3 text-xs tracking-widest transition-colors ${activeTab === tab ? "bg-zinc-900 text-white border-l-2 border-toxic" : "text-zinc-400 hover:text-zinc-300 hover:bg-zinc-900/50"}`}>
              [ {tab} ]
            </button>
          ))}
        </nav>
        <div className={`p-4 border-t border-zinc-900 text-[10px] ${status.includes("ERROR") ? "text-red-500" : "text-toxic"}`}>
          {status}
        </div>
      </aside>

      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-4xl">
          <div className="mb-10 pb-4 border-b border-zinc-900 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-widest">{activeTab}</h2>
              <p className="text-zinc-400 text-sm mt-2">Manage your production assets and inventory.</p>
            </div>
            {activeTab === "LYRICS ENGINE" && (
              <button onClick={handleSaveToDatabase} className="px-6 py-3 bg-toxic text-black font-bold text-xs tracking-widest hover:bg-[#baff29] transition-colors">
                SAVE TO DATABASE
              </button>
            )}
          </div>

          {activeTab === "LYRICS ENGINE" && (
            <div className="space-y-6">
              <div>
                <label htmlFor="admin-token" className="mb-2 block text-xs uppercase tracking-widest text-zinc-400">Admin API token</label>
                <input
                  id="admin-token"
                  type="password"
                  autoComplete="current-password"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  placeholder="Enter the configured admin token"
                  className="w-full bg-black border border-zinc-900 p-4 text-white focus:border-toxic outline-none"
                />
                <p className="mt-2 text-xs text-zinc-500">The token is held only in this page and is not saved to browser storage.</p>
              </div>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Track Title (e.g. DEMONS DON'T SLEEP)" 
                className="w-full bg-black border border-zinc-900 p-4 text-white focus:border-toxic outline-none" 
              />
              <input 
                type="text" 
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Cover Art URL (e.g. /images/drip.jpg)" 
                className="w-full bg-black border border-zinc-900 p-4 text-white focus:border-toxic outline-none" 
              />
              <textarea 
                value={lyricsText}
                onChange={(e) => setLyricsText(e.target.value)}
                placeholder="Paste raw lyrical payload here..." 
                className="w-full h-[400px] bg-black border border-zinc-900 p-4 text-zinc-300 focus:border-toxic outline-none scrollbar-thin scrollbar-thumb-zinc-800" 
              />
            </div>
          )}
          
          {activeTab !== "LYRICS ENGINE" && (
             <div className="p-12 border border-zinc-900 border-dashed flex flex-col items-center justify-center text-zinc-400">
               <p className="text-sm tracking-widest uppercase">MODULE AWAITING ACTIVATION</p>
             </div>
          )}
        </div>
      </main>
    </div>
  );
}
