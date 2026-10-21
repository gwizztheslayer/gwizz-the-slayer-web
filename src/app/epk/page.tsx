"use client";
import { useState } from "react";

export default function ElectronicPressKit() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate server transmission delay
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-20 font-mono">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 border-b border-zinc-800 pb-8">
          <h1 className="text-5xl font-black text-white uppercase tracking-widest mb-2">G-Wizz, The Slayer</h1>
          <h2 className="text-xl text-cyan-400 tracking-widest uppercase">Official Electronic Press Kit</h2>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="col-span-2 space-y-12">
            <section>
              <h3 className="border-b border-zinc-800 text-zinc-500 pb-2 mb-6 uppercase tracking-widest text-sm">Biography</h3>
              <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                Operating out of Knysna, South Africa, G-Wizz, The Slayer is a multidisciplinary artist pushing the boundaries of music production, visual arts, and independent media. Founder of the independent label "Dreams Of Colour", his work spans across original acrylic paintings, web application development, and defining musical projects like "Demons Don't Sleep" and the collaborative album "Knysna's Saviour".
              </p>
            </section>
            
            <section>
              <h3 className="border-b border-zinc-800 text-zinc-500 pb-2 mb-6 uppercase tracking-widest text-sm">Technical Rider & Assets</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border border-zinc-800 p-4 hover:border-zinc-600 transition-colors bg-zinc-950/50">
                  <span className="uppercase text-sm tracking-wider">High-Res Press Photos</span>
                  <button className="text-cyan-400 hover:text-white transition-colors text-xs">DOWNLOAD ZIP</button>
                </li>
                <li className="flex justify-between items-center border border-zinc-800 p-4 hover:border-zinc-600 transition-colors bg-zinc-950/50">
                  <span className="uppercase text-sm tracking-wider">Stage Plot & Audio Rider</span>
                  <button className="text-cyan-400 hover:text-white transition-colors text-xs">DOWNLOAD PDF</button>
                </li>
              </ul>
            </section>
          </div>
          
          <div className="space-y-8">
            <section className="bg-zinc-900 border border-zinc-800 p-8">
              <h3 className="text-white uppercase tracking-widest mb-6 font-bold">Booking Inquiry</h3>
              
              {formState === 'success' ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <span className="text-emerald-400 text-2xl mb-2">?</span>
                  <p className="text-emerald-400 uppercase text-sm tracking-widest">Transmission Sent</p>
                  <p className="text-zinc-500 text-xs mt-2">We will respond shortly.</p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="mt-6 text-xs text-zinc-400 hover:text-white underline decoration-zinc-700 uppercase tracking-widest"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
                  <input required type="text" placeholder="ORGANIZATION / PROMOTER" className="bg-black border border-zinc-700 p-3 text-sm text-white outline-none focus:border-cyan-400 transition-colors" />
                  <input required type="email" placeholder="CONTACT EMAIL" className="bg-black border border-zinc-700 p-3 text-sm text-white outline-none focus:border-cyan-400 transition-colors" />
                  <textarea required placeholder="EVENT DETAILS / INQUIRY" rows={4} className="bg-black border border-zinc-700 p-3 text-sm text-white outline-none focus:border-cyan-400 transition-colors resize-none"></textarea>
                  <button 
                    type="submit" 
                    disabled={formState === 'submitting'}
                    className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 uppercase tracking-widest text-sm transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'submitting' ? 'SENDING...' : 'Submit Transmission'}
                  </button>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
