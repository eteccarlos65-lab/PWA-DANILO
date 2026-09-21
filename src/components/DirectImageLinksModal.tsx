import React, { useState } from 'react';
import { APP_ASSETS } from '../data/mockData';

interface DirectImageLinksModalProps {
  onClose: () => void;
  onOpenToast: (msg: string) => void;
}

interface ImageAssetInfo {
  name: string;
  category: string;
  url: string;
}

const ASSET_LIST: ImageAssetInfo[] = [
  {
    name: 'AURA Hyperion GT (Hero Pista Showroom)',
    category: 'Showroom Principal',
    url: APP_ASSETS.hyperionHero
  },
  {
    name: 'AURA Hyperion GT (Vista Frontal Esculpida)',
    category: 'Veículo // Galeria 360',
    url: APP_ASSETS.hyperionFront
  },
  {
    name: 'Cockpit de Alta Precisão & Volante F1',
    category: 'Veículo // Interior Bespoke',
    url: APP_ASSETS.hyperionCockpit
  },
  {
    name: 'Difusor Traseiro Ativo Venturi & Escapes',
    category: 'Veículo // Aerodinâmica',
    url: APP_ASSETS.hyperionRear
  },
  {
    name: 'Couro Nappa Perfurado & Fibra de Carbono',
    category: 'Artesanato & Têxtil',
    url: APP_ASSETS.nappaLeather
  },
  {
    name: 'Studio Turntable Hipercarro (Vista Superior)',
    category: 'Studio de Configuração',
    url: APP_ASSETS.studioTurntable
  },
  {
    name: 'Carlos Mendonça (Curador Master AURA)',
    category: 'Concierge Privé',
    url: APP_ASSETS.carlosConcierge
  },
  {
    name: 'Logotipo & Emblema Dourado AURA Motors',
    category: 'Identidade Visual & Branding',
    url: APP_ASSETS.logo
  }
];

export const DirectImageLinksModal: React.FC<DirectImageLinksModalProps> = ({
  onClose,
  onOpenToast
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyUrl = (url: string, index: number) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    onOpenToast('Link direto copiado para a área de transferência');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleCopyHtmlTag = (url: string, alt: string) => {
    const snippet = `<img src="${url}" alt="${alt}" referrerPolicy="no-referrer" />`;
    navigator.clipboard.writeText(snippet);
    onOpenToast('Tag HTML <img ... /> copiada');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-gradient-to-b from-[#1b1b1e] to-[#131316] rounded-3xl border border-amber-500/30 shadow-[0_0_60px_rgba(245,158,11,0.25)] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[#f59e0b]">
              <span className="material-symbols-outlined text-[20px]">link</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                <span className="font-space text-[9px] uppercase tracking-widest text-[#ffc174] font-bold">
                  Links Diretos das Imagens
                </span>
              </div>
              <h3 className="font-syne text-[18px] font-bold text-[#e5e1e6]">
                Repositório de Mídia HTML
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2a2a2d] hover:bg-[#353438] text-[#d8c3ad] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Info Description */}
        <div className="px-5 py-3 bg-[#0e0e11]/80 border-b border-white/5 shrink-0 flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[#38bdf8] text-[18px] shrink-0 mt-0.5">info</span>
          <p className="font-outfit text-[12px] text-[#d8c3ad]/90 leading-relaxed font-light">
            Sim, é totalmente possível adicionar links diretos para as imagens do HTML! Abaixo estão todas as URLs públicas diretas prontas para copiar e usar em tags <code className="text-[#ffc174] font-space text-[11px]">&lt;img src="..."&gt;</code>.
          </p>
        </div>

        {/* Scrollable list */}
        <div className="p-5 overflow-y-auto flex flex-col space-y-3 divide-y divide-white/5">
          {ASSET_LIST.map((asset, i) => (
            <div key={i} className="pt-3 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-14 h-12 rounded-lg overflow-hidden bg-[#0e0e11] shrink-0 border border-white/10 relative">
                  <img
                    src={asset.url}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-space text-[9px] uppercase tracking-wider text-[#ffc174] font-bold">
                    {asset.category}
                  </span>
                  <span className="font-syne text-[13px] font-bold text-[#e5e1e6] truncate">
                    {asset.name}
                  </span>
                  <span className="font-space text-[10px] text-[#d8c3ad]/60 truncate max-w-[260px] sm:max-w-xs">
                    {asset.url}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => handleCopyUrl(asset.url, i)}
                  className={`px-3 py-1.5 rounded-lg font-space text-[10px] uppercase font-bold tracking-wider flex items-center gap-1 transition-all ${
                    copiedIndex === i
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-[#2a2a2d] hover:bg-[#353438] text-[#e5e1e6] border border-white/5'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {copiedIndex === i ? 'check' : 'content_copy'}
                  </span>
                  <span>{copiedIndex === i ? 'Copiado!' : 'Copiar URL'}</span>
                </button>

                <button
                  onClick={() => handleCopyHtmlTag(asset.url, asset.name)}
                  title="Copiar Tag HTML Completa"
                  className="px-2.5 py-1.5 rounded-lg bg-[#2a2a2d] hover:bg-[#353438] text-[#38bdf8] border border-white/5 font-space text-[10px] uppercase font-bold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[14px]">code</span>
                  <span className="hidden sm:inline">Tag HTML</span>
                </button>

                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#2a2a2d] hover:bg-[#353438] text-[#d8c3ad] hover:text-white border border-white/5 flex items-center justify-center"
                  title="Abrir em nova aba"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0e0e11] border-t border-white/10 flex items-center justify-between">
          <span className="font-space text-[10px] text-[#d8c3ad]/70">
            Total: 8 Ativos em Alta Resolução
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#472a00] font-space text-[11px] uppercase font-bold tracking-wider transition-all"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
