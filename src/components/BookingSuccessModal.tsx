import React from 'react';
import { ConciergeBooking } from '../types';
import { APP_ASSETS } from '../data/mockData';

interface BookingSuccessModalProps {
  booking: ConciergeBooking;
  onClose: () => void;
  onShare: () => void;
}

export const BookingSuccessModal: React.FC<BookingSuccessModalProps> = ({
  booking,
  onClose,
  onShare
}) => {
  const modeTitles = {
    capuava: 'Circuito Fechado Fazenda Capuava',
    heliponto: 'Entrega Heliponto / Residencial',
    serra: 'Rota Cênica Serra do Mar'
  };

  const slotTitles = {
    morning: '09:00 - Sessão Auroral',
    sunset: '16:30 - Sunset Drive'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1f1f22] to-[#131316] rounded-3xl border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.25)] overflow-hidden flex flex-col">
        {/* Header ribbon */}
        <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="font-space text-[10px] text-[#ffc174] uppercase tracking-widest font-bold">
              Protocolo Confirmado // AURA PRIVÉ
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#2a2a2d] hover:bg-[#353438] text-[#d8c3ad] hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body Pass */}
        <div className="p-6 flex flex-col space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-[#f59e0b] mb-3">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <h3 className="font-syne text-[22px] font-bold text-[#e5e1e6]">
              Reserva VIP Homologada
            </h3>
            <p className="font-outfit text-[13px] text-[#d8c3ad]/80 mt-1">
              Código de Identificação Criptografado:
            </p>
            <span className="font-space text-[14px] text-[#ffc174] font-bold tracking-widest bg-[#0e0e11] px-4 py-1.5 rounded-lg border border-amber-500/20 inline-block mt-1">
              AURA-CAP-98214-VIP
            </span>
          </div>

          {/* Details Card */}
          <div className="p-4 rounded-2xl bg-[#0e0e11]/80 border border-white/5 space-y-2.5 font-space text-[11px]">
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-[#d8c3ad]/70 uppercase">Experiência</span>
              <span className="text-[#e5e1e6] font-bold text-right truncate max-w-[200px]">
                {modeTitles[booking.mode]}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-[#d8c3ad]/70 uppercase">Data &amp; Janela</span>
              <span className="text-[#ffc174] font-bold">
                {booking.dateDay} Outubro // {slotTitles[booking.timeSlot]}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-white/5">
              <span className="text-[#d8c3ad]/70 uppercase">Climatização</span>
              <span className="text-[#38bdf8] font-bold">{booking.temperature}°C Ativa</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-[#d8c3ad]/70 uppercase">Curador Master</span>
              <span className="text-[#e5e1e6] font-bold">Carlos Mendonça</span>
            </div>
          </div>

          {/* QR Code Simulation */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#1b1b1e] border border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-black text-[32px]">qr_code_2</span>
              </div>
              <div className="flex flex-col">
                <span className="font-space text-[10px] uppercase text-[#e5e1e6] font-bold">
                  Passe Digital Apple Wallet / NFC
                </span>
                <span className="font-outfit text-[11px] text-[#d8c3ad]/70">
                  Pronto para validação no heliponto
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onShare}
              className="py-3 rounded-xl bg-[#2a2a2d] hover:bg-[#353438] text-[#e5e1e6] font-space text-[11px] uppercase tracking-wider font-bold flex items-center justify-center gap-2 border border-white/5 transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">share</span>
              <span>Compartilhar</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 rounded-xl bg-[#f59e0b] hover:bg-[#fbbf24] text-[#472a00] font-space text-[11px] uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(245,158,11,0.4)] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">done</span>
              <span>Concluir</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
