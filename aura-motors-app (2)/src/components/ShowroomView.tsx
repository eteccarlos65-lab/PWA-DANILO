import React, { useState, useEffect } from 'react';
import { Vehicle, TabType } from '../types';
import { SHOWROOM_VEHICLES, APP_ASSETS } from '../data/mockData';
import { engineAudio } from '../utils/audioSynthesizer';

interface ShowroomViewProps {
  onNavigateTab: (tab: TabType) => void;
  onSelectVehicle?: (vehicleId: string) => void;
  onOpenToast: (msg: string) => void;
}

export const ShowroomView: React.FC<ShowroomViewProps> = ({
  onNavigateTab,
  onOpenToast
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [isHeroFavorited, setIsHeroFavorited] = useState<boolean>(false);
  const [isEnginePlaying, setIsEnginePlaying] = useState<boolean>(false);
  const [waveHeights, setWaveHeights] = useState<number[]>([
    12, 20, 28, 16, 32, 24, 12, 20, 28, 16, 32, 24, 16, 28, 20, 12
  ]);

  // Audio wave animation
  useEffect(() => {
    let interval: any = null;
    if (isEnginePlaying) {
      interval = setInterval(() => {
        setWaveHeights(prev =>
          prev.map(() => Math.floor(Math.random() * 26) + 6)
        );
      }, 120);
    } else {
      setWaveHeights([
        10, 18, 26, 14, 30, 22, 10, 18, 26, 14, 30, 22, 14, 26, 18, 10
      ]);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isEnginePlaying]);

  const handleToggleSound = () => {
    const isNowPlaying = engineAudio.toggle();
    setIsEnginePlaying(isNowPlaying);
    if (isNowPlaying) {
      onOpenToast('Sinfonia V12 ativada a 9.200 RPM');
    }
  };

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'hipercarros', label: 'Hipercarros' },
    { id: 'gran-turismo', label: 'Gran Turismo' },
    { id: 'eletricos-puros', label: 'Elétricos Puros' },
    { id: 'bespoke-vintage', label: 'Bespoke Vintage' }
  ];

  const filteredVehicles = activeCategory === 'todos'
    ? SHOWROOM_VEHICLES
    : SHOWROOM_VEHICLES.filter(v => v.category === activeCategory);

  return (
    <div className="flex flex-col w-full text-[#e5e1e6] pb-28">
      {/* Hero Section */}
      <section className="relative w-full px-4 md:px-6 pt-3 pb-8 overflow-hidden flex flex-col">
        {/* Atmospheric studio light blooms */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-28 -right-16 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Editorial Subtitle & Title */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
          <span className="font-space text-[9px] text-[#ffc174] uppercase tracking-[0.25em] font-bold">
            Atelier AURA // Coleção Privada
          </span>
        </div>

        <h1 className="font-syne text-[28px] md:text-[36px] font-bold uppercase text-[#e5e1e6] tracking-tight mb-1 leading-tight">
          Pura Emoção Mecânica
        </h1>
        <p className="font-outfit text-[14px] text-[#d8c3ad]/80 mb-6 max-w-md leading-relaxed font-light">
          A arte do movimento esculpida em carbono e eletricidade. Onde o pulso humano dita o compasso da velocidade.
        </p>

        {/* Star Featured Car Card: AURA Hyperion GT */}
        <div className="relative w-full rounded-2xl bg-[#1b1b1e]/90 backdrop-blur-xl border border-white/5 shadow-2xl overflow-hidden group">
          {/* Main Image Stage */}
          <div className="relative w-full h-64 md:h-72 overflow-hidden bg-[#0e0e11]">
            <img
              src={APP_ASSETS.hyperionHero}
              alt="AURA Hyperion GT"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1e] via-[#1b1b1e]/20 to-transparent" />

            {/* Floating Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#0e0e11]/85 backdrop-blur-md font-space text-[9px] text-[#ffc174] font-bold uppercase tracking-widest border border-amber-500/20 shadow-md">
                Edição 01/25
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 backdrop-blur-md font-space text-[9px] text-amber-300 font-semibold uppercase tracking-wider flex items-center gap-1 border border-amber-400/30">
                <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />
                Exemplar Ativo
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <button
                onClick={() => {
                  setIsHeroFavorited(!isHeroFavorited);
                  onOpenToast(!isHeroFavorited ? 'AURA Hyperion GT adicionado aos favoritos' : 'Removido dos favoritos');
                }}
                aria-label="Favoritar veículo"
                className={`w-9 h-9 rounded-full bg-[#0e0e11]/80 backdrop-blur-md flex items-center justify-center transition-all active:scale-90 border border-white/10 ${
                  isHeroFavorited ? 'text-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.5)]' : 'text-[#d8c3ad] hover:text-white'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[19px]"
                  style={{ fontVariationSettings: isHeroFavorited ? "'FILL' 1" : "'FILL' 0" }}
                >
                  favorite
                </span>
              </button>
            </div>
          </div>

          {/* Telemetry and Metrics */}
          <div className="p-4 md:p-6 flex flex-col gap-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="font-space text-[9px] uppercase text-[#d8c3ad]/70 tracking-wider font-semibold">
                  Hipercarro Híbrido
                </span>
                <h2 className="font-syne text-[22px] font-bold text-[#e5e1e6]">
                  AURA Hyperion GT
                </h2>
              </div>
              <div className="text-right">
                <span className="font-space text-[9px] uppercase text-[#d8c3ad]/70 font-semibold">
                  Valor Estimado
                </span>
                <p className="font-space text-[14px] text-[#ffc174] font-bold">
                  R$ 14.200.000
                </p>
              </div>
            </div>

            {/* Cockpit Strip */}
            <div className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl bg-[#1f1f22]/80 backdrop-blur-sm border border-white/5">
              <div className="flex flex-col">
                <span className="font-space text-[9px] uppercase text-[#d8c3ad]/70">0-100 km/h</span>
                <span className="font-space text-[14px] text-[#e5e1e6] font-bold">2.4s</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-2.5">
                <span className="font-space text-[9px] uppercase text-[#d8c3ad]/70">Potência</span>
                <span className="font-space text-[14px] text-[#ffc174] font-bold">1.150 cv</span>
              </div>
              <div className="flex flex-col border-l border-white/10 pl-2.5">
                <span className="font-space text-[9px] uppercase text-[#d8c3ad]/70">Vel. Máxima</span>
                <span className="font-space text-[14px] text-[#38bdf8] font-bold">398 km/h</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigateTab('studio')}
              className="mt-1 w-full py-3.5 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#472a00] font-space text-[12px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(245,158,11,0.4)] active:scale-[0.99] transition-all"
            >
              <span>Configurar Exemplar</span>
              <span className="material-symbols-outlined text-[17px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sensorial Category Filters */}
      <section className="w-full px-4 md:px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-space text-[10px] uppercase text-[#d8c3ad]/70 tracking-widest font-semibold">
            Filtrar Coleção
          </span>
          <span className="font-space text-[10px] text-[#ffc174] font-semibold">
            {filteredVehicles.length} Modelos
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-4 py-2 rounded-full font-space text-[11px] uppercase tracking-wider font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#f59e0b] text-[#472a00] shadow-[0_0_16px_rgba(245,158,11,0.4)]'
                    : 'bg-[#2a2a2d] text-[#d8c3ad] hover:text-white hover:bg-[#353438]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Curated Grid of Vehicles */}
      <section className="w-full px-4 md:px-6 mb-8 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-space text-[10px] uppercase text-[#ffc174] tracking-widest font-bold">
              Disponibilidade Imediata
            </span>
            <h3 className="font-syne text-[20px] font-bold text-[#e5e1e6]">
              Curadoria do Showroom
            </h3>
          </div>
        </div>

        {filteredVehicles.map(car => (
          <article
            key={car.id}
            className="w-full rounded-2xl bg-[#1b1b1e]/95 backdrop-blur-xl border border-white/5 shadow-xl overflow-hidden flex flex-col group transition-all"
          >
            <div className="relative w-full h-52 bg-[#0e0e11] overflow-hidden">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1e] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0e0e11]/85 backdrop-blur-sm border border-white/10">
                <span className="font-space text-[9px] uppercase tracking-wider font-bold text-[#ffc174]">
                  {car.tagBadge}
                </span>
              </div>
            </div>

            <div className="p-4 md:p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-syne text-[18px] font-bold text-[#e5e1e6]">
                    {car.name}
                  </h4>
                  <p className="font-outfit text-[13px] text-[#d8c3ad]/80">
                    {car.edition}
                  </p>
                </div>
                <span className="font-space text-[13px] text-[#ffc174] font-semibold">
                  {car.priceFormatted}
                </span>
              </div>

              {/* Specs Strip */}
              <div className="grid grid-cols-2 gap-2 p-2 rounded-xl bg-[#1f1f22]/70 border border-white/5">
                <div className="px-2 py-1 flex items-center justify-between">
                  <span className="font-space text-[9px] uppercase text-[#d8c3ad]/70">Potência</span>
                  <span className="font-space text-[12px] text-[#e5e1e6] font-bold">{car.specs.power}</span>
                </div>
                <div className="px-2 py-1 flex items-center justify-between border-l border-white/10">
                  <span className="font-space text-[9px] uppercase text-[#d8c3ad]/70">
                    {car.specs.range ? 'Autonomia' : car.specs.downforce ? 'Downforce' : car.specs.transmission ? 'Câmbio' : '0-100 km/h'}
                  </span>
                  <span className="font-space text-[12px] text-[#38bdf8] font-bold">
                    {car.specs.range || car.specs.downforce || car.specs.transmission || car.specs.acceleration}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  onNavigateTab('veiculo');
                  onOpenToast(`Explorando especificações de: ${car.name}`);
                }}
                className="w-full py-2.5 rounded-xl bg-[#2a2a2d] hover:bg-[#353438] text-[#e5e1e6] font-space text-[11px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 border border-white/5"
              >
                <span>Explorar Detalhes</span>
                <span className="material-symbols-outlined text-[15px]">arrow_outward</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Sensory Audio Experience Section */}
      <section className="w-full px-4 md:px-6 mb-8">
        <div className="relative w-full rounded-2xl bg-gradient-to-br from-[#1f1f22] via-[#1b1b1e] to-[#0e0e11] p-5 md:p-6 border border-white/5 shadow-2xl overflow-hidden">
          {/* Light Bloom */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#f59e0b] text-[18px]">graphic_eq</span>
            <span className="font-space text-[9px] uppercase text-[#ffc174] tracking-[0.2em] font-bold">
              Imersão Sensorial
            </span>
          </div>

          <h3 className="font-syne text-[20px] font-bold text-[#e5e1e6] mb-2">
            A Experiência Acústica &amp; Tátil
          </h3>
          <p className="font-outfit text-[13px] text-[#d8c3ad]/80 mb-5 leading-relaxed font-light">
            Cada curva acústica do sistema de escape em titânio inconel é afinada como um instrumento de orquestra. Ouça a ressonância harmônica a 9.200 RPM.
          </p>

          {/* Interactive Player Card */}
          <div className="w-full rounded-xl bg-[#2a2a2d]/80 backdrop-blur-md p-3.5 flex flex-col gap-3 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleSound}
                  aria-label="Reproduzir áudio do motor"
                  className="w-11 h-11 rounded-full bg-[#f59e0b] text-[#472a00] flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.55)] active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[24px]">
                    {isEnginePlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <div className="flex flex-col">
                  <span className="font-space text-[12px] text-[#e5e1e6] font-bold">
                    Sinfonia V12 Twin-Turbo
                  </span>
                  <span className={`font-space text-[10px] ${isEnginePlaying ? 'text-[#f59e0b] font-semibold' : 'text-[#d8c3ad]/70'}`}>
                    {isEnginePlaying ? 'Acelerando em banco de provas // 9.200 RPM' : 'Pronto para acelerar (0:18)'}
                  </span>
                </div>
              </div>

              <span className="font-space text-[9px] uppercase text-[#ffc174] bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded font-bold">
                Hi-Res Audio
              </span>
            </div>

            {/* Dynamic Waveform Visualizer */}
            <div className="w-full h-8 flex items-center justify-between gap-1 px-1">
              {waveHeights.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}px` }}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isEnginePlaying
                      ? 'bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certified Curatorship Footer */}
      <footer className="w-full px-4 md:px-6 pb-6 flex flex-col items-center text-center gap-2">
        <div className="w-12 h-12 rounded-full bg-[#2a2a2d] border border-white/10 flex items-center justify-center text-[#ffc174] shadow-inner">
          <span className="material-symbols-outlined text-[26px]">verified</span>
        </div>
        <span className="font-space text-[10px] uppercase text-[#e5e1e6] tracking-[0.2em] font-bold">
          Curadoria Certificada AURA Motors
        </span>
        <p className="font-outfit text-[12px] text-[#d8c3ad]/70 max-w-xs leading-relaxed font-light">
          Todos os veículos acompanham telemetria de fabricação registrada em livro digital cifrado e garantia vitalícia de autenticidade mecânica.
        </p>
        <div className="flex items-center gap-4 mt-2">
          <span className="font-space text-[10px] text-[#d8c3ad]/70 uppercase tracking-widest font-semibold">São Paulo</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="font-space text-[10px] text-[#d8c3ad]/70 uppercase tracking-widest font-semibold">Mônaco</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="font-space text-[10px] text-[#d8c3ad]/70 uppercase tracking-widest font-semibold">Zurique</span>
        </div>
      </footer>

      {/* Floating Concierge Direct Shortcut */}
      <div className="fixed right-4 bottom-20 z-40">
        <button
          onClick={() => onNavigateTab('concierge')}
          className="flex items-center gap-2 pl-3.5 pr-4 py-2.5 rounded-full bg-[#353438]/90 hover:bg-[#353438] backdrop-blur-xl text-[#e5e1e6] border border-amber-500/30 shadow-2xl transition-all active:scale-95 group"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f59e0b] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#f59e0b]" />
          </span>
          <span className="font-space text-[11px] uppercase tracking-wider text-[#e5e1e6] group-hover:text-[#ffc174] font-semibold transition-colors">
            Concierge Privado
          </span>
          <span className="material-symbols-outlined text-[17px] text-[#f59e0b]">chat</span>
        </button>
      </div>
    </div>
  );
};
