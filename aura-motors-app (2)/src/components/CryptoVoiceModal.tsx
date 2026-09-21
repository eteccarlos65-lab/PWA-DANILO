import React, { useState, useEffect } from 'react';
import { APP_ASSETS } from '../data/mockData';

interface CryptoVoiceModalProps {
  onClose: () => void;
}

export const CryptoVoiceModal: React.FC<CryptoVoiceModalProps> = ({ onClose }) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);
  const [waveHeights, setWaveHeights] = useState([12, 28, 16, 36, 20, 32, 14, 24]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    const waveTimer = setInterval(() => {
      setWaveHeights(prev => prev.map(() => Math.floor(Math.random() * 28) + 8));
    }, 150);

    return () => {
      clearInterval(timer);
      clearInterval(waveTimer);
    };
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, '0');
    const secs = (totalSec % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#1f1f22] to-[#0e0e11] rounded-3xl border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.2)] p-6 flex flex-col items-center text-center space-y-6">
        {/* Encryption badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e0e11] border border-sky-500/30">
          <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
          <span className="font-space text-[9px] uppercase tracking-widest text-[#38bdf8] font-bold">
            Canal Criptografado RSA-4096
          </span>
        </div>

        {/* Carlos Mendonça Avatar */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#f59e0b] shadow-[0_0_24px_rgba(245,158,11,0.5)]">
            <img
              src={APP_ASSETS.carlosConcierge}
              alt="Carlos Mendonça"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#1f1f22] flex items-center justify-center text-black">
            <span className="material-symbols-outlined text-[14px]">phone_in_talk</span>
          </span>
        </div>

        {/* Info & Timer */}
        <div>
          <h3 className="font-syne text-[20px] font-bold text-[#e5e1e6]">
            Carlos Mendonça
          </h3>
          <p className="font-outfit text-[13px] text-[#d8c3ad]/80">
            Curador Master AURA // Linha Direta
          </p>
          <span className="font-space text-[16px] text-[#ffc174] font-bold mt-1 inline-block">
            {formatTime(seconds)}
          </span>
        </div>

        {/* Audio Wave Visualizer */}
        <div className="h-10 flex items-center justify-center gap-1.5 w-full px-8">
          {waveHeights.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}px` }}
              className="w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all duration-150"
            />
          ))}
        </div>

        {/* Call Controls */}
        <div className="flex items-center justify-center gap-5 pt-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-[#2a2a2d] text-[#e5e1e6] hover:bg-[#353438]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMuted ? 'mic_off' : 'mic'}
            </span>
          </button>

          <button
            onClick={onClose}
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-[0_0_24px_rgba(220,38,38,0.5)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[28px]">call_end</span>
          </button>

          <button
            onClick={() => setIsSpeaker(!isSpeaker)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              isSpeaker ? 'bg-amber-500/20 text-[#ffc174] border border-amber-500/40' : 'bg-[#2a2a2d] text-[#e5e1e6] hover:bg-[#353438]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">volume_up</span>
          </button>
        </div>
      </div>
    </div>
  );
};
