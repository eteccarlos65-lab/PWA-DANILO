/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, ConciergeBooking } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ShowroomView } from './components/ShowroomView';
import { VehicleView } from './components/VehicleView';
import { StudioView } from './components/StudioView';
import { ConciergeView } from './components/ConciergeView';
import { BookingSuccessModal } from './components/BookingSuccessModal';
import { CryptoVoiceModal } from './components/CryptoVoiceModal';
import { DirectImageLinksModal } from './components/DirectImageLinksModal';
import { UserProfileModal } from './components/UserProfileModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('showroom');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [configSummary, setConfigSummary] = useState<string>('');
  
  // Modals state
  const [confirmedBooking, setConfirmedBooking] = useState<ConciergeBooking | null>(null);
  const [isCryptoVoiceOpen, setIsCryptoVoiceOpen] = useState<boolean>(false);
  const [isImageLinksOpen, setIsImageLinksOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(prev => (prev === message ? null : prev));
    }, 3000);
  };

  const handleConfirmBooking = (booking: ConciergeBooking) => {
    setConfirmedBooking(booking);
    showToast('Reserva VIP confirmada com sucesso');
  };

  return (
    <div className="min-h-screen bg-[#0e0e11] text-[#e5e1e6] flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-18 inset-x-0 z-50 flex justify-center px-4 pointer-events-none animate-bounce-short">
          <div className="bg-[#1f1f22]/95 backdrop-blur-xl border border-amber-500/40 text-[#ffc174] px-4 py-2 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex items-center gap-2 font-space text-[11px] uppercase font-bold tracking-wider pointer-events-auto">
            <span className="material-symbols-outlined text-[16px] text-[#f59e0b]">info</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Persistent Global Header */}
      <Header
        activeTab={activeTab}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      {/* Main View Area with Top Offset for Header */}
      <main className="flex-1 w-full max-w-md mx-auto pt-20 pb-10">
        {activeTab === 'showroom' && (
          <ShowroomView
            onNavigateTab={tab => setActiveTab(tab)}
            onOpenToast={showToast}
          />
        )}

        {activeTab === 'veiculo' && (
          <VehicleView
            onNavigateTab={tab => setActiveTab(tab)}
            onOpenToast={showToast}
            onOpenVIPModal={() => setActiveTab('concierge')}
          />
        )}

        {activeTab === 'studio' && (
          <StudioView
            onNavigateTab={tab => setActiveTab(tab)}
            onOpenToast={showToast}
            onPassConfigToConcierge={summary => {
              setConfigSummary(summary);
            }}
          />
        )}

        {activeTab === 'concierge' && (
          <ConciergeView
            initialConfigSummary={configSummary}
            onOpenToast={showToast}
            onConfirmBooking={handleConfirmBooking}
            onOpenCryptoVoice={() => setIsCryptoVoiceOpen(true)}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={tab => setActiveTab(tab)}
      />

      {/* Modals */}
      {confirmedBooking && (
        <BookingSuccessModal
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
          onShare={() => {
            if (navigator.share) {
              navigator.share({
                title: 'AURA Motors // Reserva VIP',
                text: 'Meu passe exclusivo de pista e test-drive AURA Privé foi homologado!',
                url: window.location.href
              }).catch(() => {});
            } else {
              navigator.clipboard.writeText(window.location.href);
              showToast('Link do passe copiado para a área de transferência');
            }
          }}
        />
      )}

      {isCryptoVoiceOpen && (
        <CryptoVoiceModal onClose={() => setIsCryptoVoiceOpen(false)} />
      )}

      {isImageLinksOpen && (
        <DirectImageLinksModal
          onClose={() => setIsImageLinksOpen(false)}
          onOpenToast={showToast}
        />
      )}

      {isProfileOpen && (
        <UserProfileModal
          onClose={() => setIsProfileOpen(false)}
          onOpenImageLinks={() => setIsImageLinksOpen(true)}
          onOpenToast={showToast}
        />
      )}
    </div>
  );
}
