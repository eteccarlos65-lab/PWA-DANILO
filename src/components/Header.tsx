import React from 'react';
import { TabType } from '../types';
import { APP_ASSETS } from '../data/mockData';

interface HeaderProps {
  activeTab: TabType;
  onProfileClick: () => void;
}

const TAB_TITLES: Record<TabType, string> = {
  showroom: 'Showroom',
  veiculo: 'Veículo',
  concierge: 'Concierge',
  studio: 'Studio'
};

export const Header: React.FC<HeaderProps> = ({ activeTab, onProfileClick }) => {
  return (
    <header className="fixed top-0 inset-x-0 w-full z-50 bg-[#131316]/85 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_16px_rgba(0,0,0,0.5)]">
      <div className="h-16 px-4 md:px-6 max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand & Active Screen Label */}
        <div className="flex items-center gap-3">
          <img
            src={APP_ASSETS.logo}
            alt="AURA Automotive Logo"
            className="h-8 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-space text-[9px] uppercase text-[#f59e0b] tracking-[0.28em] font-bold">
              AURA
            </span>
            <span className="font-syne text-[18px] text-[#e5e1e6] font-semibold tracking-tight leading-none">
              {TAB_TITLES[activeTab]}
            </span>
          </div>
        </div>

        {/* Actions: Download ZIP & User VIP Profile */}
        <div className="flex items-center gap-2">
          <a
            href="/aura-motors-app.zip"
            download="aura-motors-app.zip"
            title="Baixar Código Fonte Completo (.ZIP)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2a2a2d] hover:bg-[#353438] text-[#ffc174] border border-amber-500/20 text-[10px] font-space font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[15px] text-[#f59e0b]">download</span>
            <span className="hidden sm:inline">Baixar .ZIP</span>
          </a>

          <button
            onClick={onProfileClick}
            aria-label="Abrir Perfil VIP"
            className="relative flex items-center justify-center p-1 rounded-full hover:ring-2 hover:ring-amber-500/40 transition-all active:scale-95 group"
          >
            <img
              src={APP_ASSETS.avatar}
              alt="VIP Member"
              className="w-8 h-8 rounded-full object-cover border border-amber-500/30 group-hover:border-amber-400"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#f59e0b] ring-2 ring-[#131316] shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
