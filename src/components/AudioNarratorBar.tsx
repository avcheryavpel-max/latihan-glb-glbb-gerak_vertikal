import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Square,
  Volume2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import type { NarratorSegment } from '../types/quiz';
import type { NarratorEngine, NarratorStatus } from '../hooks/useNarrator';

interface AudioNarratorBarProps {
  status: NarratorStatus;
  engine: NarratorEngine;
  serverAvailable: boolean;
  activeStageIndex: number | null;
  progressPercent: number;
  rate: number;
  errorMessage: string | null;
  segments: NarratorSegment[];
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
  onStop: () => void;
  onRateChange: (rate: number) => void;
  onEngineChange: (engine: NarratorEngine) => void;
}

const SPEED_OPTIONS = [
  { value: 0.8, label: '0,8×' },
  { value: 0.9, label: '0,9×' },
  { value: 1.0, label: '1,0×' },
  { value: 1.15, label: '1,15×' },
  { value: 1.3, label: '1,3×' },
];

export const AudioNarratorBar: React.FC<AudioNarratorBarProps> = ({
  status,
  engine,
  serverAvailable,
  activeStageIndex,
  progressPercent,
  rate,
  errorMessage,
  segments,
  onPlay,
  onPause,
  onResume,
  onRestart,
  onStop,
  onRateChange,
  onEngineChange,
}) => {
  const isPlaying = status === 'playing';
  const isPaused = status === 'paused';
  const isLoading = status === 'loading';
  const isActive = isPlaying || isPaused || isLoading;

  const activeStageTitle =
    activeStageIndex !== null && segments[activeStageIndex]
      ? `Tahap ${activeStageIndex + 1} dari ${segments.length}: ${segments[activeStageIndex].stageTitle}`
      : 'Siap membacakan seluruh pembahasan seperti guru di kelas';

  return (
    <div
      className="scroll-mt-20 bg-white border border-[#CBEAE4] rounded-xl p-4 mb-4"
      role="region"
      aria-label="Narator Audio Pembahasan"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center shrink-0">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            ) : (
              <Volume2 className="w-5 h-5" aria-hidden="true" />
            )}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-[#0F2D2B]">
              Narator Audio Guru · Pembahasan Sistematis
            </h4>
            <p className="text-xs text-[#4B7A74] mt-0.5 truncate" aria-live="polite">
              {isLoading
                ? 'Menyiapkan audio narasi guru berbahasa Indonesia…'
                : isPaused
                  ? `Dijeda — ${activeStageTitle}`
                  : activeStageTitle}
            </p>
          </div>
        </div>

        {/* Main Audio Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {!isActive && (
            <button
              type="button"
              onClick={onPlay}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] text-xs font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              PUTAR PEMBAHASAN
            </button>
          )}

          {isPlaying && (
            <button
              type="button"
              onClick={onPause}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] text-xs font-bold text-[#0F2D2B] bg-[#FEF3C7] hover:bg-[#FDE68A] border border-[#F59E0B]/40 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Pause className="w-4 h-4" aria-hidden="true" />
              JEDA
            </button>
          )}

          {isPaused && (
            <button
              type="button"
              onClick={onResume}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] text-xs font-bold text-white bg-[#0F766E] hover:bg-[#0D9488] rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Play className="w-4 h-4" aria-hidden="true" />
              LANJUTKAN
            </button>
          )}

          <button
            type="button"
            onClick={onRestart}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[42px] text-xs font-bold text-[#0F766E] bg-white hover:bg-[#F0FDFA] border border-[#99E2D8] rounded-xl transition-colors disabled:opacity-50 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            ULANGI
          </button>

          <button
            type="button"
            onClick={onStop}
            disabled={!isActive}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[42px] text-xs font-bold text-[#9F1239] bg-white hover:bg-[#FFF1F2] border border-[#FECDD3] rounded-xl transition-colors disabled:opacity-45 disabled:cursor-not-allowed whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Square className="w-3.5 h-3.5" aria-hidden="true" />
            BERHENTI
          </button>
        </div>
      </div>

      {/* Progress bar & speed/voice controls */}
      <div className="mt-3.5 pt-3 border-t border-[#E6F4F1] flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
        <div className="flex-1 flex items-center gap-3 min-w-0">
          <div
            className="flex-1 h-2 bg-[#E6F4F1] rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progres pembacaan pembahasan"
          >
            <div
              className="h-full bg-[#0D9488] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold font-mono-math text-[#0F766E] tabular-nums shrink-0">
            {progressPercent}%
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-[#3C6A65]">
            <span>Kecepatan</span>
            <select
              value={rate}
              onChange={(e) => onRateChange(Number(e.target.value))}
              aria-label="Kecepatan narator"
              className="px-2.5 py-1.5 text-xs font-bold font-mono-math text-[#0F2D2B] bg-[#F8FCFB] border border-[#CBEAE4] rounded-lg focus:outline-none focus:border-[#0F766E]"
            >
              {SPEED_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>

          {serverAvailable && (
            <label className="flex items-center gap-1.5 text-xs font-semibold text-[#3C6A65]">
              <span>Suara</span>
              <select
                value={engine}
                onChange={(e) => onEngineChange(e.target.value as NarratorEngine)}
                aria-label="Pilihan mesin suara narator"
                className="px-2.5 py-1.5 text-xs font-bold text-[#0F2D2B] bg-[#F8FCFB] border border-[#CBEAE4] rounded-lg focus:outline-none focus:border-[#0F766E]"
              >
                <option value="server">Suara Guru Alami</option>
                <option value="webspeech">Suara Perangkat</option>
              </select>
            </label>
          )}
        </div>
      </div>

      {/* Stage step quick-indicator */}
      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11.5px] text-[#4B7A74]">
        {segments.map((seg, idx) => {
          const isCurrent = activeStageIndex === idx;
          return (
            <React.Fragment key={seg.stageIndex}>
              {idx > 0 && <span aria-hidden="true">·</span>}
              <span
                className={
                  isCurrent
                    ? 'font-bold text-[#0F766E] underline underline-offset-4'
                    : 'font-medium'
                }
              >
                {idx + 1}. {seg.stageTitle}
              </span>
            </React.Fragment>
          );
        })}
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mt-3 flex items-start gap-2 px-3 py-2.5 rounded-lg bg-[#FFF1F2] border border-[#FECDD3] text-xs font-medium text-[#9F1239]"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
