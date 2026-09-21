import React, { useState } from 'react';
import { TabType } from '../types';
import { APP_ASSETS } from '../data/mockData';

interface VehicleViewProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenToast: (msg: string) => void;
  onOpenVIPModal: () => void;
}

interface GallerySlide {
  image: string;
  label: string;
  indicator: string;
}

export const VehicleView: React.FC<VehicleViewProps> = ({
  onNavigateTab,
  onOpenToast,
  onOpenVIPModal
}) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState({
    id: 'obsidian',
    name: 'Obsidian Black Satin',
    specTag: 'Fosco Multicamada'
  });

  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    powertrain: true,
    chassis: false,
    dimensions: false
  });

  const slides: GallerySlide[] = [
    {
      image: APP_ASSETS.hyperionFront,
      label: 'Vista Frontal Esculpida',
      indicator: '01 // VISÃO FRONTAL'
    },
    {
      image: APP_ASSETS.hyperionCockpit,
      label: 'Cockpit de Alta Precisão',
      indicator: '02 // COCKPIT BESPOKE'
    },
    {
      image: APP_ASSETS.hyperionRear,
      label: 'Difusor Ativo Venturi',
      indicator: '03 // DIFUSOR & AERODINÂMICA'
    }
  ];

  const colors = [
    {
      id: 'obsidian',
      name: 'Obsidian Black Satin',
      specTag: 'Fosco Multicamada',
      label: 'Obsidian',
      gradient: 'from-[#2a2a30] via-[#151518] to-[#0a0a0c]'
    },
    {
      id: 'amber',
      name: 'Amber Sunburst Pearl',
      specTag: 'Verniz Dourado Quente',
      label: 'Sunburst',
      gradient: 'from-[#f59e0b] via-[#b45309] to-[#78350f]'
    },
    {
      id: 'mercury',
      name: 'Liquid Mercury Raw',
      specTag: 'Alumínio Polido Criogênico',
      label: 'Mercury',
      gradient: 'from-[#e5e5ea] via-[#9e9ea7] to-[#48484a]'
    },
    {
      id: 'silk',
      name: 'Racing Silk Emerald',
      specTag: 'Pigmento Metálico Tradicional',
      label: 'Silk',
      gradient: 'from-[#1b4332] via-[#081c15] to-[#040f0b]'
    }
  ];

  const toggleAccordion = (key: string) => {
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleNextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const handleColorSelect = (c: typeof colors[0]) => {
    setSelectedColor({
      id: c.id,
      name: c.name,
      specTag: c.specTag
    });
    onOpenToast(`Pintura alterada para: ${c.name}`);
  };

  return (
    <div className="flex flex-col w-full text-[#e5e1e6] pb-32">
      {/* Top Spec Teaser Strip */}
      <section className="px-4 md:px-6 pt-2 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
          <span className="font-space text-[10px] uppercase text-[#ffc174] tracking-widest font-bold">
            Edição Atelier // 04 de 12
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a2a2d] border border-white/5 text-[#d8c3ad]">
          <span className="material-symbols-outlined text-[14px] text-[#ffc174]">verified</span>
          <span className="font-space text-[9px] tracking-widest uppercase font-semibold">Chassi Homologado</span>
        </div>
      </section>

      {/* Vehicle Title Header */}
      <section className="px-4 md:px-6 mb-4">
        <div className="flex items-baseline gap-1.5">
          <span className="font-space text-[9px] text-[#d8c3ad]/70 uppercase tracking-[0.25em] font-semibold">
            Série Especial
          </span>
          <span className="font-space text-[10px] text-[#38bdf8] font-semibold tracking-wider">
            // MY2026
          </span>
        </div>
        <h1 className="font-syne text-[32px] md:text-[40px] font-bold tracking-tight text-[#e5e1e6] mt-0.5">
          Hyperion GT
        </h1>
        <p className="font-outfit text-[13px] text-[#d8c3ad]/80 tracking-wide mt-1 font-light leading-relaxed">
          Matte Obsidian Edition • Aerodinâmica Ativa em Carbono e Trem de Força Bi-Turbo Híbrido
        </p>
      </section>

      {/* Interactive Cinematic Angle Gallery */}
      <section className="relative w-full mb-6">
        <div className="relative w-full h-80 overflow-hidden bg-[#0e0e11]">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.label}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-transparent to-[#131316]/20" />
                <div className="absolute bottom-3 left-4 md:left-6">
                  <span className="px-3 py-1 rounded-full bg-[#1f1f22]/85 backdrop-blur-md text-[#e5e1e6] font-space text-[9px] tracking-widest uppercase border border-white/10 font-bold">
                    {slide.label}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Navigation Arrows */}
          <div className="absolute top-3 right-4 md:right-6 flex gap-1.5 z-10">
            <button
              onClick={handlePrevSlide}
              aria-label="Foto anterior"
              className="w-8 h-8 rounded-full bg-[#2a2a2d]/80 backdrop-blur-md flex items-center justify-center text-[#e5e1e6] hover:text-[#ffc174] transition-colors border border-white/10 active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button
              onClick={handleNextSlide}
              aria-label="Próxima foto"
              className="w-8 h-8 rounded-full bg-[#2a2a2d]/80 backdrop-blur-md flex items-center justify-center text-[#e5e1e6] hover:text-[#ffc174] transition-colors border border-white/10 active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Gallery Pagination Dots & Telemetry Micro-Bar */}
        <div className="px-4 md:px-6 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                aria-label={`Ver slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? 'w-6 bg-[#f59e0b] shadow-[0_0_6px_rgba(245,158,11,0.8)]'
                    : 'w-2 bg-[#353438]'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 text-[#d8c3ad]/80 font-space text-[10px] font-semibold tracking-wider">
            <span className="material-symbols-outlined text-[14px] text-[#38bdf8]">360</span>
            <span>{slides[currentSlide].indicator}</span>
          </div>
        </div>
      </section>

      {/* Bespoke Paint Finish Selector */}
      <section className="px-4 md:px-6 mb-8">
        <div className="p-4 md:p-5 rounded-2xl bg-[#1b1b1e] border border-white/5 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className="flex flex-col">
              <span className="font-space text-[9px] uppercase tracking-widest text-[#d8c3ad]/70 font-semibold">
                Configuração Externa
              </span>
              <span className="font-syne text-[18px] font-bold text-[#e5e1e6]">
                {selectedColor.name}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#1f1f22] font-space text-[10px] text-[#ffc174] border border-amber-500/20 font-semibold">
              {selectedColor.specTag}
            </span>
          </div>

          {/* Color Disc Buttons */}
          <div className="grid grid-cols-4 gap-2.5 pt-2">
            {colors.map(c => {
              const isSelected = selectedColor.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => handleColorSelect(c)}
                  className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all border ${
                    isSelected
                      ? 'bg-[#1f1f22] border-amber-500/40 shadow-lg'
                      : 'bg-[#1f1f22]/50 border-transparent hover:bg-[#1f1f22]'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full p-0.5 flex items-center justify-center transition-transform ${
                      isSelected ? 'ring-2 ring-[#f59e0b] scale-105' : 'hover:scale-105'
                    }`}
                  >
                    <span className={`w-full h-full rounded-full bg-gradient-to-br ${c.gradient} shadow-inner`} />
                  </div>
                  <span
                    className={`font-space text-[9px] uppercase tracking-tighter font-semibold ${
                      isSelected ? 'text-[#ffc174]' : 'text-[#d8c3ad]/70'
                    }`}
                  >
                    {c.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Performance Telemetry Dashboard (2x2 Matrix) */}
      <section className="px-4 md:px-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f59e0b] text-[18px]">speed</span>
            <h2 className="font-space text-[12px] uppercase tracking-wider text-[#e5e1e6] font-bold">
              Telemetria de Pista
            </h2>
          </div>
          <span className="font-space text-[9px] text-[#d8c3ad]/70 tracking-widest uppercase font-semibold">
            Validação Nürburgring
          </span>
        </div>

        {/* 2x2 Telemetry Metric Matrix */}
        <div className="grid grid-cols-2 gap-3">
          {/* Aceleração */}
          <div className="p-4 rounded-2xl bg-[#1b1b1e] border border-white/5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-space text-[9px] uppercase tracking-widest text-[#d8c3ad]/70 font-semibold">
                Aceleração
              </span>
              <span className="material-symbols-outlined text-[#f59e0b] text-[16px]">timer</span>
            </div>
            <div className="my-2">
              <div className="font-syne text-[30px] font-bold tracking-tight text-[#e5e1e6]">
                2.4<span className="font-space text-[12px] text-[#ffc174] font-normal ml-0.5">s</span>
              </div>
              <span className="font-space text-[10px] text-[#d8c3ad]/70 font-semibold">
                0 - 100 KM/H
              </span>
            </div>
            <div className="w-full h-1 bg-[#353438] rounded-full overflow-hidden">
              <div className="h-full w-[94%] bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
            </div>
          </div>

          {/* Potência Híbrida */}
          <div className="p-4 rounded-2xl bg-[#1b1b1e] border border-white/5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-space text-[9px] uppercase tracking-widest text-[#d8c3ad]/70 font-semibold">
                Potência Total
              </span>
              <span className="material-symbols-outlined text-[#38bdf8] text-[16px]">bolt</span>
            </div>
            <div className="my-2">
              <div className="font-syne text-[30px] font-bold tracking-tight text-[#e5e1e6]">
                1.150<span className="font-space text-[12px] text-[#38bdf8] font-normal ml-0.5">cv</span>
              </div>
              <span className="font-space text-[10px] text-[#d8c3ad]/70 font-semibold truncate block">
                V8 TWIN-TURBO + 3x E-MOTORS
              </span>
            </div>
            <div className="w-full h-1 bg-[#353438] rounded-full overflow-hidden">
              <div className="h-full w-[98%] bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
            </div>
          </div>

          {/* Velocidade Máxima */}
          <div className="p-4 rounded-2xl bg-[#1b1b1e] border border-white/5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-space text-[9px] uppercase tracking-widest text-[#d8c3ad]/70 font-semibold">
                Vel. Máxima
              </span>
              <span className="material-symbols-outlined text-[#f59e0b] text-[16px]">flight_takeoff</span>
            </div>
            <div className="my-2">
              <div className="font-syne text-[30px] font-bold tracking-tight text-[#e5e1e6]">
                380<span className="font-space text-[12px] text-[#ffc174] font-normal ml-0.5">km/h</span>
              </div>
              <span className="font-space text-[10px] text-[#d8c3ad]/70 font-semibold truncate block">
                LIMITADA ELETRONICAMENTE
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#ffc174] font-space text-[9px] font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
              <span>Aero Drag Reduction Ativo</span>
            </div>
          </div>

          {/* Downforce */}
          <div className="p-4 rounded-2xl bg-[#1b1b1e] border border-white/5 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-space text-[9px] uppercase tracking-widest text-[#d8c3ad]/70 font-semibold">
                Pressão Aero
              </span>
              <span className="material-symbols-outlined text-[#38bdf8] text-[16px]">air</span>
            </div>
            <div className="my-2">
              <div className="font-syne text-[30px] font-bold tracking-tight text-[#e5e1e6]">
                650<span className="font-space text-[12px] text-[#38bdf8] font-normal ml-0.5">kg</span>
              </div>
              <span className="font-space text-[10px] text-[#d8c3ad]/70 font-semibold truncate block">
                A 280 KM/H NO MODO TRACK
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#38bdf8] font-space text-[9px] font-semibold">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>Asa Biplana Dinâmica</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sensory & Interior Craftsmanship Section */}
      <section className="px-4 md:px-6 mb-8">
        <div className="mb-4">
          <span className="font-space text-[9px] text-[#ffc174] uppercase tracking-[0.2em] font-bold">
            Haute Horlogerie Automotiva
          </span>
          <h2 className="font-syne text-[22px] font-bold text-[#e5e1e6] tracking-tight mt-0.5">
            Imersão Sensorial
          </h2>
          <p className="font-outfit text-[13px] text-[#d8c3ad]/80 mt-1 font-light leading-relaxed">
            Cada superfície que toca a pele ou conduz o ar sonoro foi fabricada à mão em Oxfordshire.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {/* Item 1: Nappa Leather */}
          <div className="rounded-2xl overflow-hidden bg-[#1b1b1e] border border-white/5 shadow-md">
            <div className="relative h-44 w-full bg-[#0e0e11]">
              <img
                src={APP_ASSETS.nappaLeather}
                alt="Couro Nappa Perfurado"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1b1e] via-transparent to-transparent" />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#353438]/85 backdrop-blur-md text-[#ffc174] font-space text-[9px] tracking-wider uppercase font-bold border border-amber-500/20">
                Curadoria Têxtil
              </span>
            </div>
            <div className="p-4 md:p-5">
              <h3 className="font-syne text-[18px] font-bold text-[#e5e1e6]">
                Couro Nappa Perfurado à Mão
              </h3>
              <p className="font-outfit text-[13px] text-[#d8c3ad]/80 mt-1.5 leading-relaxed font-light">
                Peles curtidas com extrato de folhas de oliveira para máxima respirabilidade e perfume natural suave. Padrão geométrico paramétrico que canaliza climatização individualizada.
              </p>
            </div>
          </div>

          {/* Item 2 & 3: Audio and Titanium */}
          <div className="grid grid-cols-1 gap-3">
            <div className="p-4 rounded-2xl bg-[#1b1b1e] border border-white/5 shadow-sm flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#2a2a2d] text-[#f59e0b] shrink-0 border border-white/5">
                <span className="material-symbols-outlined text-[24px]">surround_sound</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-syne text-[16px] font-bold text-[#e5e1e6]">
                    Bowers &amp; Wilkins Diamond Surround
                  </h4>
                  <span className="font-space text-[11px] text-[#38bdf8] font-bold shrink-0">
                    1.400W
                  </span>
                </div>
                <p className="font-outfit text-[12px] text-[#d8c3ad]/80 mt-1 leading-relaxed font-light">
                  Grelhas acústicas em titânio usinado em espiral áurea com 16 transdutores e tweeters de cúpula de diamante puro.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1b1b1e] border border-white/5 shadow-sm flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#2a2a2d] text-[#f59e0b] shrink-0 border border-white/5">
                <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-syne text-[16px] font-bold text-[#e5e1e6]">
                  Comandos em Titânio Aeronáutico
                </h4>
                <p className="font-outfit text-[12px] text-[#d8c3ad]/80 mt-1 leading-relaxed font-light">
                  Seletores rotativos usinados a partir de blocos maciços de grau 5 com recartilhado tátil de alta fidelidade háptica.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications (Accordions) */}
      <section className="px-4 md:px-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-space text-[12px] uppercase tracking-wider text-[#e5e1e6] font-bold">
            Arquitetura Mecânica
          </h2>
          <span className="font-space text-[10px] text-[#d8c3ad]/70 font-semibold">
            Homologação FIA GT
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Spec 1: Powertrain */}
          <div className="rounded-2xl bg-[#1b1b1e] border border-white/5 overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleAccordion('powertrain')}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#f59e0b] text-[20px]">save_as</span>
                <span className="font-space text-[12px] text-[#e5e1e6] font-bold">
                  Trem de Força &amp; Propulsão Híbrida
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-[#d8c3ad] transition-transform duration-300 ${
                  openAccordions.powertrain ? 'rotate-180 text-[#f59e0b]' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            {openAccordions.powertrain && (
              <div className="px-4 pb-4 pt-1 flex flex-col gap-2 font-space text-[11px] text-[#d8c3ad]/80 border-t border-white/5">
                <div className="flex justify-between py-1.5 bg-[#1f1f22] px-3 rounded-lg">
                  <span>Motor a Combustão</span>
                  <span className="text-[#e5e1e6] font-bold">4.0L V8 Biturbo Flat-Plane</span>
                </div>
                <div className="flex justify-between py-1.5 bg-[#1f1f22] px-3 rounded-lg">
                  <span>Módulos Elétricos</span>
                  <span className="text-[#e5e1e6] font-bold">3 Motores Axiais (800V)</span>
                </div>
                <div className="flex justify-between py-1.5 bg-[#1f1f22] px-3 rounded-lg">
                  <span>Torque Combinado</span>
                  <span className="text-[#38bdf8] font-bold">1.380 Nm Instantâneo</span>
                </div>
                <div className="flex justify-between py-1.5 bg-[#1f1f22] px-3 rounded-lg">
                  <span>Transmissão</span>
                  <span className="text-[#e5e1e6] font-bold">Dual-Clutch 8 Velocidades F1</span>
                </div>
              </div>
            )}
          </div>

          {/* Spec 2: Monocoque Chassis */}
          <div className="rounded-2xl bg-[#1b1b1e] border border-white/5 overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleAccordion('chassis')}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#f59e0b] text-[20px]">shield</span>
                <span className="font-space text-[12px] text-[#e5e1e6] font-bold">
                  Chassi de Carbono Monocoque
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-[#d8c3ad] transition-transform duration-300 ${
                  openAccordions.chassis ? 'rotate-180 text-[#f59e0b]' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            {openAccordions.chassis && (
              <div className="px-4 pb-4 pt-1 flex flex-col gap-2 font-space text-[11px] text-[#d8c3ad]/80 border-t border-white/5">
                <div className="flex justify-between py-1.5 bg-[#1f1f22] px-3 rounded-lg">
                  <span>Célula de Sobrevivência</span>
                  <span className="text-[#e5e1e6] font-bold">Fibra T1000G de Grau Militar</span>
                </div>
                <div className="flex justify-between py-1.5 bg-[#1f1f22] px-3 rounded-lg">
                  <span>Rigidez Torcional</span>
                  <span className="text-[#e5e1e6] font-bold">68.000 Nm/grau</span>
                </div>
                <div className="flex justify-between py-1.5 bg-[#1f1f22] px-3 rounded-lg">
                  <span>Peso a Seco</span>
                  <span className="text-[#38bdf8] font-bold">1.395 kg</span>
                </div>
              </div>
            )}
          </div>

          {/* Spec 3: Dimensions & Aero */}
          <div className="rounded-2xl bg-[#1b1b1e] border border-white/5 overflow-hidden transition-all duration-300">
            <button
              onClick={() => toggleAccordion('dimensions')}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#f59e0b] text-[20px]">straighten</span>
                <span className="font-space text-[12px] text-[#e5e1e6] font-bold">
                  Dimensões &amp; Aerodinâmica Ativa
                </span>
              </div>
              <span
                className={`material-symbols-outlined text-[#d8c3ad] transition-transform duration-300 ${
                  openAccordions.dimensions ? 'rotate-180 text-[#f59e0b]' : ''
                }`}
              >
                expand_more
              </span>
            </button>

            {openAccordions.dimensions && (
              <div className="px-4 pb-4 pt-1 flex flex-col gap-2 font-space text-[11px] text-[#d8c3ad]/80 border-t border-white/5">
                <div className="flex justify-between py-1.5 bg-[#1f1f22] px-3 rounded-lg">
                  <span>Comprimento / Largura</span>
                  <span className="text-[#e5e1e6] font-bold">4.685 mm / 2.040 mm</span>
                </div>
                <div className="flex justify-between py-1.5 bg-[#1f1f22] px-3 rounded-lg">
                  <span>Altura</span>
                  <span className="text-[#e5e1e6] font-bold">1.130 mm (Modo Track)</span>
                </div>
                <div className="flex justify-between py-1.5 bg-[#1f1f22] px-3 rounded-lg">
                  <span>Distribuição de Peso</span>
                  <span className="text-[#38bdf8] font-bold">42% Dianteira / 58% Traseira</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* VIP Concierge Test Drive Booking Card */}
      <section className="px-4 md:px-6 mb-8">
        <div className="p-5 md:p-6 rounded-2xl bg-gradient-to-br from-[#2a2a2d] via-[#1f1f22] to-[#0e0e11] border border-amber-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 text-[#ffc174] mb-2">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            <span className="font-space text-[9px] uppercase tracking-widest font-bold">
              Protocolo Privativo AURA
            </span>
          </div>

          <h3 className="font-syne text-[20px] font-bold text-[#e5e1e6]">
            Experiência de Pista Exclusiva
          </h3>

          <p className="font-outfit text-[13px] text-[#d8c3ad]/80 mt-2 mb-4 leading-relaxed font-light">
            Agende uma sessão privada em autódromo homologado com telemetria acompanhada por piloto instrutor de Fórmula 1 e consultor do Atelier.
          </p>

          <div className="flex items-center gap-4 text-[#d8c3ad]/80 font-space text-[10px] font-semibold">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-[#f59e0b]">schedule</span>
              Sessão 3h
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[14px] text-[#f59e0b]">local_gas_station</span>
              Combustível de Corrida Incluído
            </span>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Action Deck */}
      <aside className="fixed bottom-16 inset-x-0 z-40 bg-[#0e0e11]/92 backdrop-blur-2xl px-4 md:px-6 py-3.5 border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.8)]">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-space text-[9px] uppercase text-[#d8c3ad]/70 tracking-wider font-semibold">
                Investimento Estimado
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-pulse" />
            </div>
            <div className="font-syne text-[20px] text-[#e5e1e6] font-bold tracking-tight">
              R$ 4.250.000
            </div>
            <span className="font-space text-[10px] text-[#ffc174] truncate font-semibold">
              Entrega em até 120 dias
            </span>
          </div>

          <button
            onClick={onOpenVIPModal}
            className="flex-1 px-5 py-3 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#472a00] font-space text-[12px] uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(245,158,11,0.5)] active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            <span className="whitespace-nowrap">Agendar VIP</span>
          </button>
        </div>
      </aside>
    </div>
  );
};
