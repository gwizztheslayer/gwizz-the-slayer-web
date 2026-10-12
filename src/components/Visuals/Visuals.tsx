"use client";
import { motion } from "framer-motion";
import IframeFacade from "@/components/IframeFacade/IframeFacade";
import { useEffect, useState } from "react";

export default function Visuals() {
  const fallbackVideos = [
    { title: "CAN DO ANYTHING", id: "K9jWBnbFFW4" },
    { title: "CLASSIFIED TRANSMISSION", id: "15ms5t_rSE0" },
    { title: "CLASSIFIED TRANSMISSION", id: "grOed-_aJ4I" },
    { title: "CLASSIFIED TRANSMISSION", id: "hOxbUBvEzzc" }
  ];
  const [videos, setVideos] = useState(fallbackVideos);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/youtube", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("Video feed unavailable")))
      .then((data: { videos?: { id?: string; title?: string }[] }) => {
        const latest = data.videos?.filter((video): video is { id: string; title: string } => Boolean(video.id && video.title && /^[\w-]{11}$/.test(video.id)));
        if (latest?.length) setVideos(latest);
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);
  
  return (
    <section id="visuals" className="scroll-mt-20 border-y border-toxic/30 py-24 bg-black/60 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: true }} 
          className="text-5xl font-black text-toxic mb-12 uppercase tracking-tighter"
        >
          VISUALS
        </motion.h2>

        {/* FEATURED GOOGLE DRIVE EMBED */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="w-full max-w-3xl mx-auto shadow-[0_0_30px_rgba(57,255,20,0.15)] rounded-xl overflow-hidden border border-toxic/30 bg-black flex flex-col mb-24"
        >
          <div className="bg-toxic text-black px-4 py-2 text-xs font-black tracking-[0.2em] uppercase flex justify-between items-center">
            <span>[ TRANSMISSION: TAKING_OVER ]</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              <span>REC</span>
            </div>
          </div>
          
          <div className="relative w-full aspect-video bg-black flex">
            <IframeFacade 
              title="G-Wizz, The Slayer - Taking Over Ft. Ace Mclein"
              src="https://drive.google.com/file/d/1T4g1HitxceZnGPcA35UfhFjeQ7VziAKg/preview"
              provider="SECURE_DRIVE"
            />
          </div>
        </motion.div>

        <p className="mb-6 font-mono text-xs uppercase tracking-widest text-zinc-500">Featured videos from the G-Wizz, The Slayer YouTube channel</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((vid, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.2 }}
              className="aspect-video bg-black border border-white/10 flex items-center justify-center relative overflow-hidden group shadow-[0_0_15px_rgba(57,255,20,0.05)] rounded-[12px]"
            >
              <IframeFacade 
                title={`${vid.title} - G-Wizz The Slayer`}
                src={`https://www.youtube.com/embed/${vid.id}?modestbranding=1&rel=0`}
                provider="YOUTUBE"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
