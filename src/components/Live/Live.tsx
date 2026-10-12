"use client";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const shows = [
  { id: 1, date: "JUN 20", venue: "Love Life Center", city: "Knysna, WC", status: "Coming Soon" }
];

export default function Live() {
  return (
    <section id="live" className="w-full bg-void py-24 px-6 border-t border-toxic/30 relative z-20">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        <h2 className="text-5xl md:text-7xl text-toxic font-black tracking-tighter uppercase drop-shadow-[0_0_15px_rgba(57,255,20,0.3)]">
          Live Transmissions
        </h2>
        <div className="flex flex-col gap-4">
          {shows.map((show) => (
            <div key={show.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-surface border border-toxic/20 hover:border-toxic transition-colors duration-300 gap-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6 w-full md:w-auto">
                <span className="text-3xl font-black text-toxic w-24">{show.date}</span>
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase tracking-wide">{show.venue}</h3>
                  <div className="flex items-center gap-2 text-zinc-400 mt-1">
                    <MapPin className="w-4 h-4" />
                    <span className="tracking-widest uppercase text-sm">{show.city}</span>
                  </div>
                </div>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(57,255,20,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto px-8 py-4 bg-transparent border border-toxic text-toxic font-bold tracking-widest uppercase hover:bg-toxic hover:text-void transition-all cursor-default"
              >
                {show.status}
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}