import React from 'react';
import { APP_ASSETS } from '../data/mockData';

interface UserProfileModalProps {
  onClose: () => void;
  onOpenImageLinks: () => void;
  onOpenToast: (msg: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  onClose,
  onOpenImageLinks,
  onOpenToast
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#1b1b1e] to-[#131316] rounded-3xl border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="font-space text-[9px] uppercase tracking-widest text-[#ffc174] font-bold">
            Credencial VIP // AURA Atelier
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2a2a2d] hover:bg-[#353438] text-[#d8c3ad] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Member Profile Avatar */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <img
                src={APP_ASSETS.avatar}
                alt="VIP Client"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#f59e0b] border-2 border-[#131316] flex items-center justify-center text-[#472a00]">
              <span className="material-symbols-outlined text-[12px] font-bold">star</span>
            </span>
          </div>

          <div>
            <h3 className="font-syne text-[18px] font-bold text-[#e5e1e6]">
              Roberto Guimarães
            </h3>
            <p className="font-outfit text-[12px] text-[#d8c3ad]/80">
              Membro Atelier Gold • Titular #892
            </p>
          </div>
        </div>

        {/* Quotas */}
        <div className="grid grid-cols-2 gap-2 bg-[#0e0e11] p-3 rounded-2xl border border-white/5 font-space text-[11px]">
          <div className="flex flex-col">
            <span className="text-[#d8c3ad]/70 text-[9px] uppercase">Alocações Atelier</span>
            <span className="text-[#ffc174] font-bold text-[14px]">2 Exemplares</span>
          </div>
          <div className="flex flex-col border-l border-white/10 pl-3">
            <span className="text-[#d8c3ad]/70 text-[9px] uppercase">Acesso a Pista</span>
            <span className="text-[#38bdf8] font-bold text-[14px]">Ilimitado</span>
          </div>
        </div>

        {/* Special Actions: Download ZIP & Direct Image Links */}
        <div className="pt-1 flex flex-col gap-2">
          <a
            href="/aura-motors-app.zip"
            download="aura-motors-app.zip"
            onClick={() => onOpenToast('Iniciando download do arquivo aura-motors-app.zip')}
            className="w-full py-3 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#472a00] font-space text-[11px] uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Baixar Projeto Completo (.ZIP)</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onOpenImageLinks();
            }}
            className="w-full py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#ffc174] font-space text-[11px] uppercase tracking-wider font-bold flex items-center justify-center gap-2 border border-amber-500/30 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">image</span>
            <span>Ver Links Diretos das Imagens HTML</span>
          </button>
        </div>

        {/* Security and Logout simulation */}
        <div className="pt-1 border-t border-white/5 flex items-center justify-between text-[#d8c3ad]/70 font-space text-[10px]">
          <span>ID Cifrado: RSA-8924</span>
          <button
            onClick={() => {
              onOpenToast('Sessão sincronizada com o Atelier');
              onClose();
            }}
            className="text-[#ffc174] hover:underline font-bold"
          >
            Sincronizar
          </button>
        </div>
      </div>
    </div>
  );
};
