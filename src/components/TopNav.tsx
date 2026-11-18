import React from 'react';
import { Play, RotateCcw } from 'lucide-react';
import type { AppView } from '../types/quiz';

interface TopNavProps {
  currentView: AppView;
  hasStarted: boolean;
  hasFinished: boolean;
  onNavigate: (view: AppView) => void;
  onStartPractice: () => void;
  onRestartPractice: () => void;
}

const NAV_ITEMS: { id: AppView; label: string }[] = [
  { id: 'home', label: 'Beranda' },
  { id: 'guide', label: 'Petunjuk' },
  { id: 'topics', label: 'Daftar Materi' },
  { id: 'quiz', label: 'Latihan Soal' },
  { id: 'results', label: 'Hasil' },
];

export const TopNav: React.FC<TopNavProps> = ({
  currentView,
  hasStarted,
  hasFinished,
  onNavigate,
  onStartPractice,
  onRestartPractice,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D5EBE7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="text-base sm:text-lg font-extrabold tracking-tight text-[#0F2D2B] whitespace-nowrap shrink-0 cursor-pointer text-left"
        >
          Kinematika HOTS
        </button>

        {/* Zone 2: Clean Single-Line Text Navigation Links */}
        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-6 text-sm font-semibold"
        >
          {NAV_ITEMS.map((item) => {
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer border-b-2 ${
                  active
                    ? 'text-[#0F766E] border-[#0F766E]'
                    : 'text-[#4B7A74] border-transparent hover:text-[#0F2D2B]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary CTA */}
        <div className="flex items-center shrink-0">
          {hasFinished ? (
            <button
              type="button"
              onClick={onRestartPractice}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              Ulangi Latihan
            </button>
          ) : (
            <button
              type="button"
              onClick={onStartPractice}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              {hasStarted ? 'Lanjutkan Latihan' : 'Mulai Latihan'}
            </button>
          )}
        </div>
      </div>

      {/* Mobile compact single-row sub-nav */}
      <nav
        aria-label="Navigasi seluler"
        className="md:hidden border-t border-[#E6F4F1] bg-[#FCFEFE] px-3 py-1.5 flex items-center gap-4 overflow-x-auto text-xs font-semibold"
      >
        {NAV_ITEMS.map((item) => {
          const active = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`py-1 whitespace-nowrap shrink-0 cursor-pointer ${
                active ? 'text-[#0F766E] font-bold underline underline-offset-4' : 'text-[#4B7A74]'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
