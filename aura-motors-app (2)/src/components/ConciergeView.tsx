import React, { useState } from 'react';
import { ConciergeBooking } from '../types';
import { APP_ASSETS } from '../data/mockData';

interface ConciergeViewProps {
  initialConfigSummary?: string;
  onOpenToast: (msg: string) => void;
  onConfirmBooking: (booking: ConciergeBooking) => void;
  onOpenCryptoVoice: () => void;
}

export const ConciergeView: React.FC<ConciergeViewProps> = ({
  initialConfigSummary,
  onOpenToast,
  onConfirmBooking,
  onOpenCryptoVoice
}) => {
  const [selectedMode, setSelectedMode] = useState<'capuava' | 'heliponto' | 'serra'>('capuava');
  const [selectedDay, setSelectedDay] = useState<number>(25);
  const [selectedSlot, setSelectedSlot] = useState<'morning' | 'sunset'>('morning');
  const [temperature, setTemperature] = useState<number>(21);
  const [soundtrack, setSoundtrack] = useState<string>('zimmer');
  const [champagne, setChampagne] = useState<boolean>(true);
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const days = [
    { day: 24, label: 'QUI', disabled: false },
    { day: 25, label: 'SEX', disabled: false },
    { day: 26, label: 'SÁB', disabled: false },
    { day: 27, label: 'DOM', disabled: false },
    { day: 28, label: 'SEG', disabled: true }
  ];

  const handleModeChange = (mode: 'capuava' | 'heliponto' | 'serra') => {
    setSelectedMode(mode);
    const names = {
      capuava: 'Fazenda Capuava (Autódromo)',
      heliponto: 'Entrega Porta a Porta',
      serra: 'Rota Cênica Serra do Mar'
    };
    onOpenToast(`Modalidade: ${names[mode]}`);
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      onConfirmBooking({
        mode: selectedMode,
        dateDay: selectedDay,
        timeSlot: selectedSlot,
        temperature,
        soundtrack,
        champagne,
        notes: initialConfigSummary
      });
    }, 600);
  };

  return (
    <div className="flex flex-col w-full text-[#e5e1e6] px-4 md:px-6 pb-32 space-y-6">
      {/* Header */}
      <section className="flex flex-col space-y-1 pt-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          <span className="font-space text-[9px] uppercase tracking-[0.25em] text-[#ffc174] font-bold">
            Sessão Sob Medida
          </span>
        </div>
        <h2 className="font-syne text-[26px] md:text-[32px] text-[#e5e1e6] uppercase tracking-tight font-bold">
          CONCIERGE PRIVÉ
        </h2>
        <p className="font-outfit text-[14px] text-[#d8c3ad]/80 leading-relaxed font-light">
          Uma experiência sensorial personalizada para os seus sentidos.
        </p>

        {initialConfigSummary && (
          <div className="mt-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#f59e0b] text-[18px]">verified</span>
            <div className="flex flex-col min-w-0">
              <span className="font-space text-[9px] uppercase text-[#ffc174] font-bold">
                Configuração Vinculada do Studio
              </span>
              <span className="font-outfit text-[12px] text-[#e5e1e6] truncate">
                {initialConfigSummary}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Curador Master VIP Card */}
      <section className="relative bg-[#1f1f22]/80 backdrop-blur-2xl rounded-2xl p-4 md:p-5 border border-white/5 shadow-2xl flex flex-col space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg shrink-0 border border-white/10">
            <img
              src={APP_ASSETS.carlosConcierge}
              alt="Carlos Mendonça"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11]/80 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-space text-[9px] uppercase text-[#38bdf8] tracking-widest font-bold">
                Atendimento 1-on-1
              </span>
              <span className="material-symbols-outlined text-[14px] text-[#38bdf8]">verified</span>
            </div>
            <h3 className="font-syne text-[18px] font-bold text-[#e5e1e6] truncate">
              Carlos Mendonça
            </h3>
            <p className="font-outfit text-[13px] text-[#d8c3ad]/80 truncate">
              Curador Master AURA
            </p>
          </div>
        </div>

        {/* Direct Contact Actions */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%20Carlos%2C%20gostaria%20de%20agendar%20uma%20sess%C3%A3o%20exclusiva%20AURA%20Priv%C3%A9."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onOpenToast('Redirecionando para canal privativo WhatsApp')}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#2a2a2d] hover:bg-[#353438] text-[#e5e1e6] border border-white/5 transition-all active:scale-[0.98] shadow-sm group"
          >
            <span className="material-symbols-outlined text-[18px] text-[#f59e0b] group-hover:scale-110 transition-transform">
              chat
            </span>
            <span className="font-space text-[11px] tracking-wider uppercase font-bold text-[#e5e1e6]">
              WhatsApp Privé
            </span>
          </a>

          <button
            type="button"
            onClick={onOpenCryptoVoice}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#2a2a2d] hover:bg-[#353438] text-[#e5e1e6] border border-white/5 transition-all active:scale-[0.98] shadow-sm group"
          >
            <span className="material-symbols-outlined text-[18px] text-[#38bdf8] group-hover:scale-110 transition-transform">
              lock
            </span>
            <span className="font-space text-[11px] tracking-wider uppercase font-bold text-[#e5e1e6]">
              Voz Cripto
            </span>
          </button>
        </div>
      </section>

      {/* 01 // Test Drive Modality Picker */}
      <section className="flex flex-col space-y-3">
        <div className="flex justify-between items-baseline">
          <h3 className="font-space text-[11px] uppercase text-[#d8c3ad]/80 tracking-wider font-bold">
            01 // Modalidade de Test Drive
          </h3>
          <span className="font-space text-[9px] text-[#ffc174] uppercase tracking-widest font-bold">
            Exclusivo
          </span>
        </div>

        <div className="flex flex-col space-y-2.5">
          {/* Capuava */}
          <div
            onClick={() => handleModeChange('capuava')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-md ${
              selectedMode === 'capuava'
                ? 'bg-[#2a2a2d] border-amber-500/50 shadow-lg'
                : 'bg-[#1b1b1e] border-white/5 hover:bg-[#2a2a2d]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-space text-[9px] uppercase text-[#ffc174] tracking-widest font-bold">
                    Autódromo Privado
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#1f1f22] text-[9px] font-space text-[#d8c3ad] font-semibold">
                    Pista
                  </span>
                </div>
                <h4 className="font-syne text-[15px] text-[#e5e1e6] font-bold leading-snug">
                  Circuito Fechado Fazenda Capuava
                </h4>
                <p className="font-outfit text-[12px] text-[#d8c3ad]/80 mt-1 leading-relaxed font-light">
                  Alta Performance, telemetria em tempo real e instrutor de pilotagem pro.
                </p>
              </div>

              <div className="w-6 h-6 rounded-full bg-[#1f1f22] flex items-center justify-center shrink-0 border border-white/10">
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    selectedMode === 'capuava'
                      ? 'bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                      : 'bg-transparent'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Heliponto */}
          <div
            onClick={() => handleModeChange('heliponto')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-md ${
              selectedMode === 'heliponto'
                ? 'bg-[#2a2a2d] border-amber-500/50 shadow-lg'
                : 'bg-[#1b1b1e] border-white/5 hover:bg-[#2a2a2d]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-space text-[9px] uppercase text-[#38bdf8] tracking-widest font-bold">
                    Porta a Porta
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#1f1f22] text-[9px] font-space text-[#d8c3ad] font-semibold">
                    Conveniência
                  </span>
                </div>
                <h4 className="font-syne text-[15px] text-[#e5e1e6] font-bold leading-snug">
                  Heliponto ou Residência
                </h4>
                <p className="font-outfit text-[12px] text-[#d8c3ad]/80 mt-1 leading-relaxed font-light">
                  Entrega em reboque climatizado fechado diretamente na sua localização.
                </p>
              </div>

              <div className="w-6 h-6 rounded-full bg-[#1f1f22] flex items-center justify-center shrink-0 border border-white/10">
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    selectedMode === 'heliponto'
                      ? 'bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                      : 'bg-transparent'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Serra do Mar */}
          <div
            onClick={() => handleModeChange('serra')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer shadow-md ${
              selectedMode === 'serra'
                ? 'bg-[#2a2a2d] border-amber-500/50 shadow-lg'
                : 'bg-[#1b1b1e] border-white/5 hover:bg-[#2a2a2d]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-space text-[9px] uppercase text-[#ffc174] tracking-widest font-bold">
                    Tour Gastronômico
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-[#1f1f22] text-[9px] font-space text-[#d8c3ad] font-semibold">
                    Curadoria
                  </span>
                </div>
                <h4 className="font-syne text-[15px] text-[#e5e1e6] font-bold leading-snug">
                  Rota Cênica Serra do Mar
                </h4>
                <p className="font-outfit text-[12px] text-[#d8c3ad]/80 mt-1 leading-relaxed font-light">
                  Curvas sinuosas ao nascer do sol acompanhadas de café gourmet artesanal.
                </p>
              </div>

              <div className="w-6 h-6 rounded-full bg-[#1f1f22] flex items-center justify-center shrink-0 border border-white/10">
                <span
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    selectedMode === 'serra'
                      ? 'bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                      : 'bg-transparent'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 // Date & Solar Window */}
      <section className="flex flex-col space-y-3">
        <div className="flex justify-between items-baseline">
          <h3 className="font-space text-[11px] uppercase text-[#d8c3ad]/80 tracking-wider font-bold">
            02 // Data &amp; Janela Solar
          </h3>
          <span className="font-space text-[11px] text-[#e5e1e6] tracking-wider font-bold">
            OUTUBRO 2025
          </span>
        </div>

        {/* Date Selector */}
        <div className="grid grid-cols-5 gap-2">
          {days.map(d => {
            const isSelected = selectedDay === d.day;
            return (
              <button
                key={d.day}
                disabled={d.disabled}
                onClick={() => {
                  setSelectedDay(d.day);
                  onOpenToast(`Data selecionada: ${d.label} ${d.day} de Outubro`);
                }}
                className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all ${
                  d.disabled
                    ? 'bg-[#1b1b1e] opacity-40 cursor-not-allowed border-transparent'
                    : isSelected
                    ? 'bg-[#2a2a2d] border-amber-500/50 shadow-lg text-[#e5e1e6]'
                    : 'bg-[#1b1b1e] border-white/5 text-[#d8c3ad]/70 hover:text-white'
                }`}
              >
                <span
                  className={`font-space text-[9px] uppercase tracking-wider font-bold ${
                    isSelected ? 'text-[#ffc174]' : ''
                  }`}
                >
                  {d.label}
                </span>
                <span
                  className={`font-syne text-[18px] font-bold ${
                    isSelected ? 'text-[#ffc174]' : 'text-[#e5e1e6]'
                  }`}
                >
                  {d.day}
                </span>
                <span
                  className={`w-1 h-1 rounded-full mt-1 ${
                    isSelected ? 'bg-[#f59e0b] shadow-[0_0_6px_rgba(245,158,11,1)]' : 'bg-transparent'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Time Slots */}
        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setSelectedSlot('morning')}
            className={`p-3.5 rounded-2xl text-left transition-all border ${
              selectedSlot === 'morning'
                ? 'bg-[#2a2a2d] border-amber-500/50 shadow-md'
                : 'bg-[#1b1b1e] border-white/5 hover:bg-[#2a2a2d]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-space text-[12px] tracking-wider uppercase font-bold ${
                  selectedSlot === 'morning' ? 'text-[#ffc174]' : 'text-[#d8c3ad]/70'
                }`}
              >
                09:00
              </span>
              <span
                className={`material-symbols-outlined text-[16px] ${
                  selectedSlot === 'morning' ? 'text-[#f59e0b]' : 'text-[#d8c3ad]/50'
                }`}
              >
                wb_twilight
              </span>
            </div>
            <span className="font-syne text-[13px] text-[#e5e1e6] font-bold block mt-0.5">
              Sessão Auroral
            </span>
            <span className="font-outfit text-[11px] text-[#d8c3ad]/70">
              Luz dourada matutina
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedSlot('sunset')}
            className={`p-3.5 rounded-2xl text-left transition-all border ${
              selectedSlot === 'sunset'
                ? 'bg-[#2a2a2d] border-amber-500/50 shadow-md'
                : 'bg-[#1b1b1e] border-white/5 hover:bg-[#2a2a2d]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`font-space text-[12px] tracking-wider uppercase font-bold ${
                  selectedSlot === 'sunset' ? 'text-[#ffc174]' : 'text-[#d8c3ad]/70'
                }`}
              >
                16:30
              </span>
              <span
                className={`material-symbols-outlined text-[16px] ${
                  selectedSlot === 'sunset' ? 'text-[#f59e0b]' : 'text-[#d8c3ad]/50'
                }`}
              >
                wb_twilight
              </span>
            </div>
            <span className="font-syne text-[13px] text-[#e5e1e6] font-bold block mt-0.5">
              Sunset Drive
            </span>
            <span className="font-outfit text-[11px] text-[#d8c3ad]/70">
              Ocaso e iluminação ativa
            </span>
          </button>
        </div>
      </section>

      {/* 03 // Cabin Atmosphere */}
      <section className="flex flex-col space-y-3">
        <div className="flex justify-between items-baseline">
          <h3 className="font-space text-[11px] uppercase text-[#d8c3ad]/80 tracking-wider font-bold">
            03 // Atmosfera de Cabine
          </h3>
          <span className="font-space text-[9px] text-[#38bdf8] tracking-widest uppercase font-bold">
            Bespoke
          </span>
        </div>

        <div className="bg-[#1f1f22]/70 backdrop-blur-xl rounded-2xl p-4 md:p-5 space-y-4 border border-white/5 shadow-xl">
          {/* Temperature */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2a2a2d] border border-white/5 flex items-center justify-center text-[#38bdf8]">
                <span className="material-symbols-outlined text-[20px]">ac_unit</span>
              </div>
              <div className="flex flex-col">
                <span className="font-syne text-[14px] text-[#e5e1e6] font-bold">Climatização</span>
                <span className="font-space text-[9px] text-[#d8c3ad]/70 uppercase tracking-wider font-semibold">
                  Microclima Biométrico
                </span>
              </div>
            </div>

            <div className="flex items-center bg-[#0e0e11] px-2.5 py-1.5 rounded-xl gap-3 border border-white/10 shadow-inner">
              <button
                type="button"
                onClick={() => setTemperature(t => Math.max(16, t - 1))}
                className="text-[#d8c3ad] hover:text-white p-1 active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">remove</span>
              </button>
              <span className="font-space text-[12px] text-[#e5e1e6] font-bold min-w-[36px] text-center">
                {temperature}°C
              </span>
              <button
                type="button"
                onClick={() => setTemperature(t => Math.min(28, t + 1))}
                className="text-[#d8c3ad] hover:text-white p-1 active:scale-90 transition-transform"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
              </button>
            </div>
          </div>

          {/* Soundtrack */}
          <div className="flex items-center justify-between pt-1 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2a2a2d] border border-white/5 flex items-center justify-center text-[#f59e0b]">
                <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
              </div>
              <div className="flex flex-col">
                <span className="font-syne text-[14px] text-[#e5e1e6] font-bold">Trilha Acústica</span>
                <span className="font-space text-[9px] text-[#d8c3ad]/70 uppercase tracking-wider font-semibold">
                  Sistema Sonoro Hi-Fi
                </span>
              </div>
            </div>

            <div className="relative">
              <select
                value={soundtrack}
                onChange={e => setSoundtrack(e.target.value)}
                className="appearance-none bg-[#0e0e11] text-[#e5e1e6] font-space text-[11px] font-semibold py-2 pl-3 pr-8 rounded-xl border border-white/10 outline-none focus:border-amber-500 transition-colors cursor-pointer"
              >
                <option value="zimmer">Hans Zimmer Orchestral</option>
                <option value="jazz">Jazz Contemporâneo</option>
                <option value="ambient">Analog Ambient Modular</option>
              </select>
              <span className="material-symbols-outlined text-[16px] text-[#d8c3ad] absolute right-2.5 top-2.5 pointer-events-none">
                unfold_more
              </span>
            </div>
          </div>

          {/* Champagne */}
          <div className="flex items-center justify-between pt-1 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#2a2a2d] border border-white/5 flex items-center justify-center text-[#ffc174]">
                <span className="material-symbols-outlined text-[20px]">wine_bar</span>
              </div>
              <div className="flex flex-col">
                <span className="font-syne text-[14px] text-[#e5e1e6] font-bold">Champagne Privé</span>
                <span className="font-space text-[9px] text-[#d8c3ad]/70 uppercase tracking-wider font-semibold">
                  Taças Baccarat Cristal
                </span>
              </div>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={champagne}
                onChange={e => setChampagne(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#0e0e11] border border-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-[#e5e1e6] after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-[#f59e0b] shadow-inner" />
            </label>
          </div>
        </div>
      </section>

      {/* Confirmation Section */}
      <section className="pt-2 flex flex-col space-y-2.5">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={isConfirming}
          className="w-full py-4 px-6 rounded-2xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#472a00] font-syne text-[16px] tracking-tight font-bold flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(245,158,11,0.45)] hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-75"
        >
          <span className="material-symbols-outlined text-[22px]">
            {isConfirming ? 'sync' : 'verified_user'}
          </span>
          <span>{isConfirming ? 'Validando Protocolo...' : 'Confirmar Reserva VIP'}</span>
        </button>

        <div className="flex items-center justify-center gap-1.5 text-center">
          <span className="material-symbols-outlined text-[14px] text-[#d8c3ad]/70">shield</span>
          <span className="font-space text-[9px] text-[#d8c3ad]/70 uppercase tracking-widest font-semibold">
            Protocolo de Confidencialidade e Seguro Integral Ativo
          </span>
        </div>
      </section>
    </div>
  );
};
