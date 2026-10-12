"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ARTIST_PROFILE } from "@/data/artist";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-24 bg-black/50 relative z-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="w-full md:w-1/3 relative aspect-square border border-toxic/50 shadow-[0_0_15px_rgba(57,255,20,0.1)]"
        >
          <Image src={ARTIST_PROFILE.portrait} alt={ARTIST_PROFILE.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full md:w-2/3"
        >
          <h2 className="text-5xl font-black text-toxic mb-6 uppercase tracking-tighter drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]">
            {ARTIST_PROFILE.name}
          </h2>
          <div className="space-y-7 font-mono">
            <p className="text-lg leading-relaxed text-white/80">
              {ARTIST_PROFILE.introduction}
            </p>
            <div className="space-y-6 border-l border-toxic/30 pl-5">
              {ARTIST_PROFILE.biographySections.map((section) => (
                <div key={section.heading}>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-toxic">
                    {section.heading}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
