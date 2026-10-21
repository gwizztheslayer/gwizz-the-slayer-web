'use client';

import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

export default function WaveformPlayer({ track, index }: { track: any, index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !track.audio) return;

    // Initialize the waveform instance
    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#3f3f46',      // zinc-700
      progressColor: '#39ff14',  // toxic green
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 40,
      cursorWidth: 0,
      normalize: true,
    });

    wavesurfer.load(track.audio);

    wavesurfer.on('ready', () => setIsLoaded(true));
    wavesurfer.on('play', () => setIsPlaying(true));
    wavesurfer.on('pause', () => setIsPlaying(false));
    wavesurfer.on('finish', () => setIsPlaying(false));

    wavesurferRef.current = wavesurfer;

    return () => {
      wavesurfer.destroy();
    };
  }, [track.audio]);

  const togglePlay = () => {
    wavesurferRef.current?.playPause();
  };

  return (
    <li className="py-6 flex flex-col gap-4 group border-b border-zinc-900 last:border-0">
      <div className="flex items-center gap-6">
        <span className="text-zinc-700 text-xs font-bold w-4">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-zinc-300 group-hover:text-toxic transition-colors text-sm uppercase tracking-wider">
          {track.title}
        </span>
      </div>
      
      {track.audio && (
        <div className="flex items-center gap-6 w-full pl-10 pr-4">
          <button 
            onClick={togglePlay}
            disabled={!isLoaded}
            className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-zinc-800 hover:border-toxic hover:text-toxic transition-colors text-zinc-500 disabled:opacity-30 disabled:hover:border-zinc-800 disabled:hover:text-zinc-500"
          >
            {isPlaying ? '■' : '▶'}
          </button>
          
          <div className="w-full flex-grow relative">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center text-[10px] uppercase tracking-widest text-zinc-600 font-mono">
                Loading Audio Data...
              </div>
            )}
            <div ref={containerRef} className={`w-full transition-opacity duration-500 ${isLoaded ? 'opacity-80 hover:opacity-100' : 'opacity-0'}`} />
          </div>
        </div>
      )}
    </li>
  );
}