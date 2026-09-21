import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

interface NavItem {
  id: TabType;
  label: string;
  iconName: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'showroom', label: 'Showroom', iconName: 'garage' },
  { id: 'veiculo', label: 'Veículo', iconName: 'speed' },
  { id: 'concierge', label: 'Concierge', iconName: 'key' },
  { id: 'studio', label: 'Studio', iconName: 'tune' }
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 w-full z-50 bg-[#0e0e11]/90 backdrop-blur-2xl border-t border-white/5 shadow-[0_-4px_24px_rgba(0,0,0,0.7)] pb-safe">
      <div className="h-16 px-2 max-w-md mx-auto flex items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeTab(item.id)}
              className={`group relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-all active:scale-95 ${
                isActive ? 'text-[#f59e0b]' : 'text-[#d8c3ad]/70 hover:text-[#e5e1e6]'
              }`}
            >
              {/* Active top amber glowing pill */}
              <span
                className={`absolute -top-1 w-6 h-[2.5px] rounded-full bg-[#f59e0b] shadow-[0_0_10px_rgba(245,158,11,0.9)] transition-all duration-300 ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
              />

              <span className="material-symbols-outlined text-[23px] transition-transform duration-200 group-hover:-translate-y-0.5">
                {item.iconName}
              </span>

              <span className="font-space text-[9px] uppercase tracking-[0.14em] font-semibold mt-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
