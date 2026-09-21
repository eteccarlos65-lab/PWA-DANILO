import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TabType, SavedCar, PaintOption, WheelOption, CaliperOption } from '../types';
import {
  PAINT_OPTIONS,
  WHEEL_OPTIONS,
  CALIPER_OPTIONS,
  INTERIOR_OPTIONS,
  INITIAL_SAVED_CARS,
  APP_ASSETS
} from '../data/mockData';
import { ThreeCarViewer } from './ThreeCarViewer';

interface StudioViewProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenToast: (msg: string) => void;
  onPassConfigToConcierge: (configSummary: string) => void;
}

export const StudioView: React.FC<StudioViewProps> = ({
  onNavigateTab,
  onOpenToast,
  onPassConfigToConcierge
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'paint' | 'wheels' | 'interior'>('paint');
  const [selectedPaint, setSelectedPaint] = useState<PaintOption>(PAINT_OPTIONS[0]);
  const [selectedWheel, setSelectedWheel] = useState<WheelOption>(WHEEL_OPTIONS[0]);
  const [selectedCaliper, setSelectedCaliper] = useState<CaliperOption>(CALIPER_OPTIONS[0]);
  const [hasInteriorPackage, setHasInteriorPackage] = useState<boolean>(true);
  const [savedCars, setSavedCars] = useState<SavedCar[]>(INITIAL_SAVED_CARS);

  // 3D Visualizer controls
  const [anglePreset, setAnglePreset] = useState<'lateral' | 'frontal' | 'pista' | null>(null);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [resetCounter, setResetCounter] = useState<number>(0);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);

  const basePrice = 3800000;
  const optionsTotal =
    selectedPaint.price +
    selectedWheel.price +
    selectedCaliper.price +
    (hasInteriorPackage ? INTERIOR_OPTIONS[0].price : 0);

  const totalPrice = basePrice + optionsTotal;

  const handleSelectPaint = (paint: PaintOption) => {
    setSelectedPaint(paint);
    onOpenToast(`Acabamento selecionado: ${paint.name}`);
  };

  const handleSelectWheel = (wheel: WheelOption) => {
    setSelectedWheel(wheel);
    onOpenToast(`Rodas configuradas: ${wheel.name}`);
  };

  const handleSelectCaliper = (caliper: CaliperOption) => {
    setSelectedCaliper(caliper);
    onOpenToast(`Pinças de freio: ${caliper.name}`);
  };

  const handleSaveToAtelier = () => {
    setIsSaving(true);
    setTimeout(() => {
      const newCar: SavedCar = {
        id: `custom-${Date.now()}`,
        title: `Hyperion GT Atelier`,
        status: 'Alocação Reservada',
        statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        details: `${selectedPaint.name} / ${selectedWheel.name}`,
        price: `R$ ${totalPrice.toLocaleString('pt-BR')}`,
        image: APP_ASSETS.studioTurntable
      };

      setSavedCars(prev => [newCar, ...prev]);
      setIsSaving(false);
      onOpenToast('Obra-prima salva com sucesso na Sua Garagem Atelier');

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#f59e0b', '#ffc174', '#38bdf8', '#ffffff']
        });
      } catch {
        // ignore if not supported
      }
    }, 600);
  };

  const handleSendToConcierge = () => {
    setIsSending(true);
    const summary = `Hyperion GT Atelier (${selectedPaint.name}, Rodas ${selectedWheel.name}, Pinças ${selectedCaliper.name}) - R$ ${totalPrice.toLocaleString('pt-BR')}`;
    setTimeout(() => {
      setIsSending(false);
      onPassConfigToConcierge(summary);
      onNavigateTab('concierge');
      onOpenToast('Configuração transmitida ao Concierge Privado Carlos Mendonça');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full text-[#e5e1e6] px-4 md:px-6 pb-32 space-y-6">
      {/* Header */}
      <header className="flex flex-col space-y-1 pt-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
          <span className="font-space text-[9px] uppercase text-[#ffc174] tracking-[0.25em] font-bold">
            Atelier de Criação
          </span>
        </div>
        <h1 className="font-syne text-[26px] md:text-[32px] text-[#e5e1e6] tracking-tight uppercase font-bold">
          STUDIO AURA
        </h1>
        <p className="font-outfit text-[13px] text-[#d8c3ad]/80 font-light">
          Esculpa cada detalhe da sua próxima obra-prima automobilística.
        </p>
      </header>

      {/* 3D Realtime Interactive Stage */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#0e0e11] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/5">
        {/* Amber floor ambient glow */}
        <div className="absolute -bottom-10 inset-x-12 h-24 bg-amber-500/15 blur-3xl pointer-events-none rounded-full" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex justify-between items-center z-10 pointer-events-auto">
          <div className="bg-[#1f1f22]/85 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-2 border border-white/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
            <span className="font-space text-[10px] text-[#e5e1e6] uppercase tracking-wider font-semibold">
              MODO 3D REALTIME // WEBGL ATIVO
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setAnglePreset(null);
                setResetCounter(c => c + 1);
                onOpenToast('Câmera 3D resetada');
              }}
              title="Resetar Câmera"
              className="w-8 h-8 rounded-full bg-[#2a2a2d]/80 backdrop-blur-md flex items-center justify-center text-[#e5e1e6] hover:text-[#ffc174] transition-colors shadow-sm border border-white/10 active:scale-95"
            >
              <span className="material-symbols-outlined text-[17px]">360</span>
            </button>
          </div>
        </div>

        {/* 3D Canvas Container */}
        <div className="relative w-full h-80 flex items-center justify-center overflow-hidden bg-radial from-[#1b1b1e] via-[#0e0e11] to-[#0a0a0c]">
          <ThreeCarViewer
            key={resetCounter}
            bodyColorHex={selectedPaint.threeColor}
            caliperColorHex={selectedCaliper.threeColor}
            wireframe={isWireframe}
            anglePreset={anglePreset}
          />

          {/* Floating Camera Angle Selector */}
          <div className="absolute top-14 right-3 flex flex-col gap-1.5 z-10">
            <button
              onClick={() => setAnglePreset('lateral')}
              className={`px-2.5 py-1 rounded backdrop-blur-md border text-[10px] font-space uppercase tracking-wider transition-all ${
                anglePreset === 'lateral'
                  ? 'bg-amber-500/20 border-amber-500 text-[#ffc174] font-bold'
                  : 'bg-[#2a2a2d]/80 border-white/10 hover:border-amber-400/40 text-[#e5e1e6]'
              }`}
            >
              Lateral
            </button>
            <button
              onClick={() => setAnglePreset('frontal')}
              className={`px-2.5 py-1 rounded backdrop-blur-md border text-[10px] font-space uppercase tracking-wider transition-all ${
                anglePreset === 'frontal'
                  ? 'bg-amber-500/20 border-amber-500 text-[#ffc174] font-bold'
                  : 'bg-[#2a2a2d]/80 border-white/10 hover:border-amber-400/40 text-[#e5e1e6]'
              }`}
            >
              Frontal
            </button>
            <button
              onClick={() => setAnglePreset('pista')}
              className={`px-2.5 py-1 rounded backdrop-blur-md border text-[10px] font-space uppercase tracking-wider transition-all ${
                anglePreset === 'pista'
                  ? 'bg-amber-500/20 border-amber-500 text-[#ffc174] font-bold'
                  : 'bg-[#2a2a2d]/80 border-white/10 hover:border-amber-400/40 text-[#e5e1e6]'
              }`}
            >
              Pista
            </button>
            <button
              onClick={() => {
                setIsWireframe(!isWireframe);
                onOpenToast(!isWireframe ? 'Modo Wireframe Ativado' : 'Renderizador Sólido Ativado');
              }}
              className={`px-2.5 py-1 rounded backdrop-blur-md border text-[10px] font-space uppercase tracking-wider transition-all ${
                isWireframe
                  ? 'bg-sky-500/20 border-sky-400 text-[#38bdf8] font-bold'
                  : 'bg-[#2a2a2d]/80 border-white/10 hover:border-sky-400/40 text-[#38bdf8]'
              }`}
            >
              Wireframe
            </button>
          </div>

          {/* Touch instructions badge */}
          <div className="absolute bottom-2 flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e0e11]/85 backdrop-blur-sm border border-white/10 pointer-events-none">
            <span className="material-symbols-outlined text-[14px] text-[#f59e0b]">touch_app</span>
            <span className="font-space text-[9px] text-[#d8c3ad]/80 uppercase tracking-widest font-semibold">
              Arraste para rotacionar 360° / Pitada zoom
            </span>
          </div>
        </div>

        {/* Spec bar at bottom of 3D frame */}
        <div className="px-4 py-3 bg-[#1b1b1e]/90 backdrop-blur-md flex justify-between items-center border-t border-white/5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f59e0b] text-[16px]">tune</span>
            <span className="font-space text-[12px] text-[#e5e1e6] font-semibold">
              {selectedPaint.name}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-space text-[9px] text-[#ffc174] uppercase tracking-wider font-bold">
              Pronto para Pista
            </span>
            <span className="material-symbols-outlined text-[#f59e0b] text-[16px]">verified</span>
          </div>
        </div>
      </div>

      {/* Dynamic Price Ticker */}
      <div className="bg-[#1b1b1e] rounded-2xl p-4 md:p-5 border border-white/5 shadow-md flex flex-col space-y-1">
        <div className="flex justify-between items-center">
          <span className="font-space text-[10px] uppercase text-[#d8c3ad]/70 tracking-wider font-semibold">
            Valor Estimado de Encomenda
          </span>
          <span className="font-space text-[9px] text-[#ffc174] uppercase tracking-widest font-bold">
            Cotação Oficial BRL
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div className="flex flex-col">
            <span className="font-outfit text-[13px] text-[#d8c3ad]/80">
              Base: R$ 3.800.000 + Opcionais:{' '}
              <span className="text-[#ffc174] font-semibold">
                R$ {optionsTotal.toLocaleString('pt-BR')}
              </span>
            </span>
          </div>
          <div className="text-right">
            <span className="font-syne text-[22px] font-bold text-[#ffc174] tracking-tight">
              R$ {totalPrice.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>

        {/* Package Progress Bar */}
        <div className="w-full bg-[#2a2a2d] h-1.5 rounded-full overflow-hidden mt-2">
          <div
            style={{ width: `${Math.min(100, 60 + (optionsTotal / 600000) * 40)}%` }}
            className="bg-[#f59e0b] h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
          />
        </div>
      </div>

      {/* Customization Tabs */}
      <div className="flex flex-col space-y-4">
        {/* Tab Headers */}
        <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveSubTab('paint')}
            className={`px-4 py-2.5 rounded-xl font-space text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeSubTab === 'paint'
                ? 'bg-[#2a2a2d] text-[#ffc174] border border-amber-500/30 shadow-md'
                : 'bg-[#1b1b1e] text-[#d8c3ad]/70 hover:text-white border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">palette</span>
            1. Pintura Externa
          </button>

          <button
            onClick={() => setActiveSubTab('wheels')}
            className={`px-4 py-2.5 rounded-xl font-space text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeSubTab === 'wheels'
                ? 'bg-[#2a2a2d] text-[#ffc174] border border-amber-500/30 shadow-md'
                : 'bg-[#1b1b1e] text-[#d8c3ad]/70 hover:text-white border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">radio_button_checked</span>
            2. Rodas &amp; Pinças
          </button>

          <button
            onClick={() => setActiveSubTab('interior')}
            className={`px-4 py-2.5 rounded-xl font-space text-[11px] uppercase tracking-wider font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeSubTab === 'interior'
                ? 'bg-[#2a2a2d] text-[#ffc174] border border-amber-500/30 shadow-md'
                : 'bg-[#1b1b1e] text-[#d8c3ad]/70 hover:text-white border border-transparent'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">airline_seat_recline_extra</span>
            3. Interiores
          </button>
        </div>

        {/* Tab 1: Pintura Externa */}
        {activeSubTab === 'paint' && (
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-space text-[10px] text-[#e5e1e6] uppercase font-bold">
                Acabamento de Superfície
              </span>
              <span className="font-space text-[9px] text-[#ffc174] uppercase font-semibold">
                Efeito Tridimensional Líquido
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              {PAINT_OPTIONS.map(paint => {
                const isSelected = selectedPaint.id === paint.id;
                return (
                  <button
                    key={paint.id}
                    onClick={() => handleSelectPaint(paint)}
                    className={`group flex flex-col items-center p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#2a2a2d] border-amber-500/50 shadow-lg'
                        : 'bg-[#1b1b1e] border-white/5 hover:bg-[#2a2a2d]'
                    }`}
                  >
                    <div className="relative w-12 h-12 rounded-full p-0.5 bg-[#1f1f22] shadow-md">
                      <div
                        className={`w-full h-full rounded-full bg-gradient-to-tr ${paint.gradientClass} shadow-inner`}
                      />
                      {isSelected && (
                        <div className="absolute inset-0 rounded-full ring-2 ring-[#f59e0b]" />
                      )}
                    </div>
                    <span className="font-space text-[9px] text-[#e5e1e6] mt-2 text-center font-bold truncate w-full">
                      {paint.name.split(' ')[0]}
                    </span>
                    <span
                      className={`font-space text-[9px] ${
                        isSelected ? 'text-[#ffc174] font-semibold' : 'text-[#d8c3ad]/60'
                      }`}
                    >
                      {paint.priceFormatted}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Rodas & Pinças */}
        {activeSubTab === 'wheels' && (
          <div className="flex flex-col space-y-4">
            {/* Wheels */}
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-space text-[10px] text-[#e5e1e6] uppercase font-bold">
                  Conjunto Forjado 21" Aero-Blade
                </span>
                <span className="font-space text-[9px] text-[#d8c3ad]/70 font-semibold">
                  Fibra de Carbono &amp; Titânio
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {WHEEL_OPTIONS.map(wheel => {
                  const isSelected = selectedWheel.id === wheel.id;
                  return (
                    <button
                      key={wheel.id}
                      onClick={() => handleSelectWheel(wheel)}
                      className={`p-2.5 rounded-xl flex items-center space-x-3 text-left border transition-all ${
                        isSelected
                          ? 'bg-[#2a2a2d] border-amber-500/50 shadow-md'
                          : 'bg-[#1b1b1e] border-white/5 hover:bg-[#2a2a2d]'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#0e0e11] shrink-0 border border-white/5">
                        <img
                          src={wheel.image}
                          alt={wheel.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-space text-[11px] text-[#e5e1e6] font-bold truncate">
                          {wheel.name}
                        </span>
                        <span className="font-space text-[10px] text-[#ffc174] font-semibold">
                          {wheel.priceFormatted}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Calipers */}
            <div className="flex flex-col space-y-2">
              <span className="font-space text-[10px] text-[#e5e1e6] uppercase font-bold">
                Pinças de Freio Cerâmicas (Carbon-Ceramic)
              </span>

              <div className="grid grid-cols-3 gap-2">
                {CALIPER_OPTIONS.map(caliper => {
                  const isSelected = selectedCaliper.id === caliper.id;
                  return (
                    <button
                      key={caliper.id}
                      onClick={() => handleSelectCaliper(caliper)}
                      className={`p-2.5 rounded-xl flex flex-col items-center text-center space-y-1 border transition-all ${
                        isSelected
                          ? 'bg-[#2a2a2d] border-amber-500/50 shadow-md'
                          : 'bg-[#1b1b1e] border-white/5 hover:bg-[#2a2a2d]'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full ${caliper.colorClass}`} />
                      <span className="font-space text-[10px] text-[#e5e1e6] font-bold truncate w-full">
                        {caliper.name}
                      </span>
                      <span
                        className={`font-space text-[9px] ${
                          isSelected ? 'text-[#ffc174] font-semibold' : 'text-[#d8c3ad]/60'
                        }`}
                      >
                        {caliper.priceFormatted}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Interiores */}
        {activeSubTab === 'interior' && (
          <div className="flex flex-col space-y-3">
            <div
              onClick={() => setHasInteriorPackage(!hasInteriorPackage)}
              className="relative w-full h-40 rounded-2xl overflow-hidden bg-[#1b1b1e] border border-white/5 shadow-md cursor-pointer group"
            >
              <img
                src={INTERIOR_OPTIONS[0].image}
                alt="Interior"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e11] via-transparent to-transparent" />
              <div className="absolute bottom-2.5 inset-x-3 flex justify-between items-end">
                <div>
                  <span className="font-space text-[9px] uppercase text-[#ffc174] font-bold">
                    Estofamento Selecionado
                  </span>
                  <h4 className="font-syne text-[15px] font-bold text-[#e5e1e6]">
                    {INTERIOR_OPTIONS[0].name}
                  </h4>
                </div>
                <span className="font-space text-[11px] text-[#ffc174] font-bold bg-black/60 px-2 py-0.5 rounded">
                  {INTERIOR_OPTIONS[0].priceFormatted}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#1b1b1e] p-3 rounded-xl flex flex-col space-y-1 border border-white/5">
                <span className="font-space text-[9px] text-[#d8c3ad]/70 uppercase font-semibold">
                  Costura Especial
                </span>
                <span className="font-outfit text-[12px] text-[#e5e1e6] font-medium">
                  Ponto Cruzado Âmbar
                </span>
                <span className="font-space text-[9px] text-[#38bdf8]">
                  Feito à Mão em Bologna
                </span>
              </div>

              <div className="bg-[#1b1b1e] p-3 rounded-xl flex flex-col space-y-1 border border-white/5">
                <span className="font-space text-[9px] text-[#d8c3ad]/70 uppercase font-semibold">
                  Halo Ambiente
                </span>
                <div className="flex items-center gap-1.5 pt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_6px_rgba(245,158,11,0.8)]" />
                  <span className="font-outfit text-[12px] text-[#e5e1e6] font-medium">
                    Fóton Dourado 2700K
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sua Garagem Atelier (Saved Cars) */}
      <section className="flex flex-col space-y-3 pt-2">
        <div className="flex justify-between items-baseline">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f59e0b] text-[20px]">garage</span>
            <h2 className="font-syne text-[18px] font-bold text-[#e5e1e6] uppercase tracking-tight">
              Sua Garagem Atelier
            </h2>
          </div>
          <span className="font-space text-[11px] text-[#ffc174] font-semibold">
            {savedCars.length} Salvos
          </span>
        </div>

        <div className="flex flex-col space-y-2.5">
          {savedCars.map(car => (
            <div
              key={car.id}
              className="bg-[#1b1b1e] rounded-2xl p-2.5 flex items-center space-x-3 border border-white/5 shadow-md hover:bg-[#2a2a2d] transition-colors"
            >
              <div className="w-24 h-16 rounded-xl overflow-hidden bg-[#0e0e11] shrink-0 relative border border-white/5">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h3 className="font-syne text-[15px] font-bold text-[#e5e1e6] truncate">
                    {car.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#2a2a2d] text-[#ffc174] font-space text-[8px] uppercase tracking-wider font-bold border border-amber-500/20">
                    {car.status}
                  </span>
                </div>
                <span className="font-outfit text-[12px] text-[#d8c3ad]/80 truncate">
                  {car.details}
                </span>
                <span className="font-space text-[12px] text-[#e5e1e6] font-bold pt-0.5">
                  {car.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dual CTA Buttons */}
      <div className="pt-2 flex flex-col space-y-2">
        <button
          onClick={handleSaveToAtelier}
          disabled={isSaving}
          className="w-full h-12 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#472a00] font-space text-[12px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(245,158,11,0.4)] active:scale-[0.99] transition-all disabled:opacity-75"
        >
          <span className={`material-symbols-outlined text-[20px] ${isSaving ? 'animate-spin' : ''}`}>
            {isSaving ? 'sync' : 'save'}
          </span>
          <span>{isSaving ? 'Salvando no Atelier...' : 'Salvar no Atelier'}</span>
        </button>

        <button
          onClick={handleSendToConcierge}
          disabled={isSending}
          className="w-full h-12 rounded-xl bg-[#2a2a2d] hover:bg-[#353438] text-[#e5e1e6] hover:text-[#ffc174] font-space text-[12px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 border border-white/5 shadow-sm active:scale-[0.99] transition-all disabled:opacity-75"
        >
          <span className={`material-symbols-outlined text-[20px] text-[#f59e0b] ${isSending ? 'animate-pulse' : ''}`}>
            support_agent
          </span>
          <span>{isSending ? 'Transmitindo...' : 'Enviar para o Concierge'}</span>
        </button>
      </div>
    </div>
  );
};
