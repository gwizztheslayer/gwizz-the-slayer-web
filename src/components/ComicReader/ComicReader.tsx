"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function ComicReader() {
  const comicPages = [
    "/comic/knysna-saviour-cover.png", 
    "/comic/page-1.png", 
    "/comic/page-2.png", 
    "/comic/page-3.png", 
    "/comic/page-4.png", 
    "/comic/page-5.png", 
    "/comic/page-6.png"
  ];
  
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    if (currentPage < comicPages.length - 1) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  if (comicPages.length === 0) return null;

  return (
    <section id="comic" className="w-full py-24 bg-black relative z-10 border-t border-toxic/20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white uppercase mb-4 tracking-[0.2em] drop-shadow-[0_0_15px_rgba(57,255,20,0.3)]"
          >
            KNYSNA'S SAVIOUR
          </motion.h2>
          <p className="text-toxic font-mono text-xs tracking-widest uppercase">
            [ OFFICIAL MANGA // LORE DATABASE INTEGRATION ]
          </p>
        </div>
        
        <div className="relative w-full max-w-3xl mx-auto bg-zinc-950 border border-toxic/40 shadow-[0_0_30px_rgba(57,255,20,0.1)] flex flex-col items-center justify-center overflow-hidden">
           <div className="relative w-full cursor-pointer select-none" onClick={(e) => {
             const rect = e.currentTarget.getBoundingClientRect();
             if (e.clientX - rect.left > rect.width / 2) nextPage();
             else prevPage();
           }}>
              <img 
                src={comicPages[currentPage]} 
                alt={`Knysna's Saviour - Page ${currentPage + 1}`} 
                className="w-full h-auto object-contain transition-opacity duration-300"
              />
              <div className="absolute inset-y-0 left-0 w-1/2 opacity-0 hover:opacity-100 flex items-center justify-start px-4 sm:px-8 bg-gradient-to-r from-black/50 to-transparent transition-opacity duration-300">
                <span className="text-white/50 text-4xl sm:text-6xl font-black tracking-tighter">{"<"}</span>
              </div>
              <div className="absolute inset-y-0 right-0 w-1/2 opacity-0 hover:opacity-100 flex items-center justify-end px-4 sm:px-8 bg-gradient-to-l from-black/50 to-transparent transition-opacity duration-300">
                <span className="text-white/50 text-4xl sm:text-6xl font-black tracking-tighter">{">"}</span>
              </div>
           </div>
           
           <div className="w-full flex justify-between items-center p-4 sm:p-6 bg-black border-t border-toxic/20 z-20">
             <button 
               aria-label="Previous Page"
               onClick={prevPage}
               disabled={currentPage === 0}
               className="text-toxic font-black tracking-widest px-4 py-3 sm:px-6 border border-toxic bg-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-toxic hover:text-black transition-colors text-xs sm:text-sm"
             >
               PREV
             </button>
             <div className="text-toxic px-4 py-3 sm:px-6 font-mono text-xs sm:text-sm flex items-center justify-center">
               PAGE {currentPage + 1} / {comicPages.length}
             </div>
             <button 
               aria-label="Next Page"
               onClick={nextPage}
               disabled={currentPage === comicPages.length - 1}
               className="text-toxic font-black tracking-widest px-4 py-3 sm:px-6 border border-toxic bg-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-toxic hover:text-black transition-colors text-xs sm:text-sm"
             >
               NEXT
             </button>
           </div>
        </div>
      </div>
    </section>
  );
}