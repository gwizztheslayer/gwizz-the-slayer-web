'use client';

import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import Spectrogram from 'wavesurfer.js/dist/plugins/spectrogram.esm.js';

export default function WaveformPlayer({ track, index }: { track: any, index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const spectrogramRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showSpectrogram, setShowSpectrogram] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !timelineRef.current || !spectrogramRef.current || !track.audio) return;

    // Initialize the advanced WaveSurfer instance
    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: '#3f3f46',      // zinc-700
      progressColor: '#39ff14',  // toxic green
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      height: 48,
      normalize: true,
      plugins: [
        Hover.create({
          lineColor: '#39ff14',
          lineWidth: 2,
          labelBackground: '#18181b',
          labelColor: '#39ff14',
          labelSize: '10px',
        }),
        Timeline.create({
          container: timelineRef.current,
          height: 16,
          timeInterval: 0.2,
          primaryLabelInterval: 5,
          style: {
            fontSize: '9px',
            color: '#71717a',
          }
        }),
        Spectrogram.create({
          container: spectrogramRef.current,
          labels: true,
          height: 80,
          labelsBackground: 'rgba(0, 0, 0, 0.8)',
          labelsColor: '#39ff14',
        })
      ]
    });

    wavesurfer.load(track.audio);

    wavesurfer.on('ready', () => setIsLoaded(true));
    wavesurfer.on('play', () => setIsPlaying(true));
    wavesurfer.on('pause', () => setIsPlaying(false));
    
    // Auto-play the next track when this one finishes
    wavesurfer.on('finish', () => {
      setIsPlaying(false);
      window.dispatchEvent(new CustomEvent('playNextTrack', { detail: index + 1 }));
    });

    wavesurferRef.current = wavesurfer;

    // Mutually exclusive playback (pause if another track starts)
    const handleGlobalPlay = (e: any) => {
      if (e.detail !== index) {
        wavesurfer.pause();
      }
    };
    
    // Listen for the "finish" signal from the previous track
    const handlePlayNext = (e: any) => {
      if (e.detail === index) {
        wavesurfer.play();
      }
    };

    window.addEventListener('globalPlay', handleGlobalPlay);
    window.addEventListener('playNextTrack', handlePlayNext);

    return () => {
      window.removeEventListener('globalPlay', handleGlobalPlay);
      window.removeEventListener('playNextTrack', handlePlayNext);
      wavesurfer.destroy();
    };
  }, [track.audio, index]);

  const togglePlay = () => {
    if (!wavesurferRef.current) return;
    if (wavesurferRef.current.isPlaying()) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
      // Broadcast to the other tracks that this one is taking over
      window.dispatchEvent(new CustomEvent('globalPlay', { detail: index }));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    wavesurferRef.current?.setVolume(newVol);
  };

  return (
    <li className="py-6 flex flex-col gap-4 group border-b border-zinc-900 last:border-0">
      {/* Title & Controls Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <span className="text-zinc-700 text-xs font-bold w-4">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-zinc-300 group-hover:text-toxic transition-colors text-sm uppercase tracking-wider">
            {track.title}
          </span>
        </div>

        {track.audio && (
          <div className="flex items-center gap-6 text-xs font-mono">
            {/* Volume Control */}
            <div className="flex items-center gap-3 text-zinc-500">
              <span className="text-[10px] uppercase">VOL</span>
              <input 
                type="range" 
                min="0" max="1" step="0.05" 
                value={volume} 
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-toxic"
              />
            </div>
            
            {/* Spectrogram Toggle */}
            <button 
              onClick={() => setShowSpectrogram(!showSpectrogram)}
              className={`border px-3 py-1 text-[9px] uppercase tracking-widest transition-colors ${
                showSpectrogram 
                  ? 'border-toxic text-toxic bg-toxic/10' 
                  : 'border-zinc-800 text-zinc-500 hover:border-toxic hover:text-toxic'
              }`}
            >
              Producer View
            </button>
          </div>
        )}
      </div>
      
      {/* Waveform Player Body */}
      {track.audio && (
        <div className="flex flex-col gap-2 w-full pt-2">
          <div className="flex items-center gap-6 w-full">
            {/* Play Button */}
            <button 
              onClick={togglePlay}
              disabled={!isLoaded}
              className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-zinc-800 hover:border-toxic hover:text-toxic transition-colors text-zinc-400 disabled:opacity-30 disabled:hover:border-zinc-800 disabled:hover:text-zinc-400"
            >
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
              )}
            </button>
            
            {/* Waveform Container */}
            <div className="w-full flex-grow relative flex flex-col">
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center text-[10px] uppercase tracking-widest text-zinc-600 font-mono animate-pulse">
                  Decrypting Audio Data...
                </div>
              )}
              
              <div className={`w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                {/* Main Wave */}
                <div ref={containerRef} className="w-full cursor-pointer" />
                {/* Timeline */}
                <div ref={timelineRef} className="w-full mt-1 border-t border-zinc-900 pt-1 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Collapsible Spectrogram */}
          <div className={`w-full pl-[72px] transition-all duration-500 overflow-hidden ${showSpectrogram && isLoaded ? 'h-[80px] mt-4 opacity-100' : 'h-0 opacity-0'}`}>
            <div className="border border-zinc-800 relative">
              <div ref={spectrogramRef} className="w-full" />
              <div className="absolute top-1 right-2 text-[8px] font-mono text-toxic bg-black/60 px-1 pointer-events-none">
                FREQUENCY HEATMAP
              </div>
            </div>
          </div>

        </div>
      )}
    </li>
  );
}