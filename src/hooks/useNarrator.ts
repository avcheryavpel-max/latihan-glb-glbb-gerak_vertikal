import { useCallback, useEffect, useRef, useState } from 'react';
import type { NarratorSegment } from '../types/quiz';

export type NarratorStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';
export type NarratorEngine = 'server' | 'webspeech';

interface UseNarratorReturn {
  status: NarratorStatus;
  engine: NarratorEngine;
  serverAvailable: boolean;
  webSpeechAvailable: boolean;
  activeStageIndex: number | null;
  progressPercent: number;
  rate: number;
  errorMessage: string | null;
  setEngine: (next: NarratorEngine) => void;
  setRate: (next: number) => void;
  playAll: (startFrom?: number) => void;
  pause: () => void;
  resume: () => void;
  restart: () => void;
  stop: () => void;
}

function base64ToBlobUrl(base64: string, mimeType: string): string {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: mimeType });
  return URL.createObjectURL(blob);
}

function pickIndonesianVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;
  const exact = voices.find((v) => v.lang.toLowerCase() === 'id-id');
  if (exact) return exact;
  const idPrefix = voices.find((v) => v.lang.toLowerCase().startsWith('id'));
  if (idPrefix) return idPrefix;
  const indoName = voices.find((v) => v.name.toLowerCase().includes('indonesia'));
  return indoName ?? voices[0];
}

export function useNarrator(
  questionId: number,
  segments: NarratorSegment[]
): UseNarratorReturn {
  const [status, setStatus] = useState<NarratorStatus>('idle');
  const [serverAvailable, setServerAvailable] = useState<boolean>(true);
  const [webSpeechAvailable, setWebSpeechAvailable] = useState<boolean>(false);
  const [engine, setEngineState] = useState<NarratorEngine>('server');
  const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null);
  const [segmentProgress, setSegmentProgress] = useState<number>(0);
  const [rate, setRateState] = useState<number>(1.0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Map<string, string>>(new Map());
  const sessionTokenRef = useRef<number>(0);
  const pauseTimerRef = useRef<number | null>(null);
  const currentStageRef = useRef<number>(0);
  const rateRef = useRef<number>(rate);
  const engineRef = useRef<NarratorEngine>(engine);
  const statusRef = useRef<NarratorStatus>(status);

  rateRef.current = rate;
  engineRef.current = engine;
  statusRef.current = status;

  useEffect(() => {
    const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;
    setWebSpeechAvailable(hasSpeech);

    let cancelled = false;
    fetch('/api/tts/status')
      .then((res) => (res.ok ? res.json() : { serverTtsAvailable: false }))
      .then((data: { serverTtsAvailable?: boolean }) => {
        if (cancelled) return;
        const avail = Boolean(data?.serverTtsAvailable);
        setServerAvailable(avail);
        if (!avail) {
          setEngineState('webspeech');
        }
      })
      .catch(() => {
        if (!cancelled) {
          setServerAvailable(false);
          setEngineState('webspeech');
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const clearPlaybackTimers = useCallback(() => {
    if (pauseTimerRef.current !== null) {
      window.clearTimeout(pauseTimerRef.current);
      pauseTimerRef.current = null;
    }
  }, []);

  const stopAll = useCallback(() => {
    sessionTokenRef.current += 1;
    clearPlaybackTimers();

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current.onended = null;
      audioRef.current.ontimeupdate = null;
      audioRef.current.onerror = null;
      audioRef.current = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setStatus('idle');
    setActiveStageIndex(null);
    setSegmentProgress(0);
    setErrorMessage(null);
  }, [clearPlaybackTimers]);

  // Stop narration when question changes
  useEffect(() => {
    stopAll();
  }, [questionId, stopAll]);

  // Clean up object URLs on unmount
  useEffect(() => {
    const cache = audioCacheRef.current;
    return () => {
      stopAll();
      cache.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, [stopAll]);

  const fetchServerAudioUrl = useCallback(
    async (seg: NarratorSegment): Promise<string> => {
      const key = `${questionId}:${seg.stageIndex}`;
      const cached = audioCacheRef.current.get(key);
      if (cached) return cached;

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `${seg.stageTitle}. ${seg.spokenText}`,
          voiceName: 'Kore',
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { audioBase64?: string; mimeType?: string; error?: string }
        | null;

      if (!res.ok || !data?.audioBase64) {
        throw new Error(data?.error || 'Gagal memuat audio narasi server.');
      }

      const url = base64ToBlobUrl(data.audioBase64, data.mimeType || 'audio/wav');
      audioCacheRef.current.set(key, url);
      return url;
    },
    [questionId]
  );

  const playSegmentRef = useRef<(idx: number, token: number, useEngine: NarratorEngine) => void>(
    () => {}
  );

  const scheduleNextSegment = useCallback(
    (nextIdx: number, token: number, useEngine: NarratorEngine) => {
      if (sessionTokenRef.current !== token) return;
      if (nextIdx >= segments.length) {
        setStatus('idle');
        setActiveStageIndex(null);
        setSegmentProgress(1);
        return;
      }
      // Natural pedagogical pause (380ms) between textbook stages
      pauseTimerRef.current = window.setTimeout(() => {
        if (sessionTokenRef.current === token) {
          playSegmentRef.current(nextIdx, token, useEngine);
        }
      }, 380);
    },
    [segments.length]
  );

  const playWithWebSpeech = useCallback(
    (idx: number, token: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setStatus('error');
        setErrorMessage(
          'Browser ini tidak mendukung Web Speech API dan layanan audio server tidak tersedia.'
        );
        return;
      }

      const seg = segments[idx];
      if (!seg) return;

      window.speechSynthesis.cancel();

      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        // Trigger voice load; if still empty after check, inform user honestly
        const utterance = new SpeechSynthesisUtterance(`${seg.stageTitle}. ${seg.spokenText}`);
        utterance.lang = 'id-ID';
        utterance.rate = rateRef.current;
        utterance.pitch = 1.0;

        let started = false;
        const guardTimer = window.setTimeout(() => {
          if (!started && sessionTokenRef.current === token) {
            window.speechSynthesis.cancel();
            setStatus('error');
            setErrorMessage(
              'Perangkat tidak memiliki suara Text-to-Speech Bahasa Indonesia yang aktif. Pastikan suara browser/sistem diaktifkan atau jalankan di browser desktop/ponsel standar.'
            );
          }
        }, 1200);

        utterance.onstart = () => {
          started = true;
          window.clearTimeout(guardTimer);
          if (sessionTokenRef.current !== token) return;
          setStatus('playing');
          setActiveStageIndex(idx);
          setSegmentProgress(0.2);
        };
        utterance.onend = () => {
          window.clearTimeout(guardTimer);
          if (sessionTokenRef.current !== token) return;
          setSegmentProgress(1);
          scheduleNextSegment(idx + 1, token, 'webspeech');
        };
        utterance.onerror = () => {
          window.clearTimeout(guardTimer);
          if (sessionTokenRef.current !== token) return;
          setStatus('error');
          setErrorMessage('Pemutaran suara perangkat terhenti. Coba tekan Ulangi.');
        };

        currentStageRef.current = idx;
        setActiveStageIndex(idx);
        setStatus('playing');
        window.speechSynthesis.speak(utterance);
        return;
      }

      const voice = pickIndonesianVoice();
      const utterance = new SpeechSynthesisUtterance(`${seg.stageTitle}. ${seg.spokenText}`);
      if (voice) utterance.voice = voice;
      utterance.lang = voice?.lang || 'id-ID';
      utterance.rate = rateRef.current;
      utterance.pitch = 1.02;

      utterance.onstart = () => {
        if (sessionTokenRef.current !== token) return;
        setStatus('playing');
        setActiveStageIndex(idx);
        setSegmentProgress(0.15);
      };
      utterance.onboundary = (ev) => {
        if (sessionTokenRef.current !== token) return;
        const totalChars = Math.max(1, seg.spokenText.length);
        setSegmentProgress(Math.min(0.95, Math.max(0.1, ev.charIndex / totalChars)));
      };
      utterance.onend = () => {
        if (sessionTokenRef.current !== token) return;
        setSegmentProgress(1);
        scheduleNextSegment(idx + 1, token, 'webspeech');
      };
      utterance.onerror = () => {
        if (sessionTokenRef.current !== token) return;
        setStatus('error');
        setErrorMessage('Gagal memutar suara perangkat pada tahap ini.');
      };

      currentStageRef.current = idx;
      setActiveStageIndex(idx);
      setStatus('playing');
      window.speechSynthesis.speak(utterance);
    },
    [scheduleNextSegment, segments]
  );

  const playSegment = useCallback(
    async (idx: number, token: number, useEngine: NarratorEngine) => {
      if (sessionTokenRef.current !== token) return;
      const seg = segments[idx];
      if (!seg) return;

      currentStageRef.current = idx;
      setActiveStageIndex(idx);
      setSegmentProgress(0);
      setErrorMessage(null);

      if (useEngine === 'webspeech') {
        playWithWebSpeech(idx, token);
        return;
      }

      setStatus('loading');
      try {
        const url = await fetchServerAudioUrl(seg);
        if (sessionTokenRef.current !== token) return;

        // Prefetch next segment in background for zero-gap transitions
        if (idx + 1 < segments.length) {
          fetchServerAudioUrl(segments[idx + 1]).catch(() => {});
        }

        const audio = new Audio(url);
        audio.playbackRate = rateRef.current;
        audioRef.current = audio;

        audio.ontimeupdate = () => {
          if (sessionTokenRef.current !== token) return;
          if (audio.duration > 0) {
            setSegmentProgress(audio.currentTime / audio.duration);
          }
        };
        audio.onended = () => {
          if (sessionTokenRef.current !== token) return;
          setSegmentProgress(1);
          scheduleNextSegment(idx + 1, token, 'server');
        };
        audio.onerror = () => {
          if (sessionTokenRef.current !== token) return;
          setEngineState('webspeech');
          playWithWebSpeech(idx, token);
        };

        await audio.play();
        if (sessionTokenRef.current === token) {
          setStatus('playing');
        }
      } catch {
        if (sessionTokenRef.current !== token) return;
        // Seamless automatic fallback to Web Speech API
        setServerAvailable(false);
        setEngineState('webspeech');
        playWithWebSpeech(idx, token);
      }
    },
    [fetchServerAudioUrl, playWithWebSpeech, scheduleNextSegment, segments]
  );

  playSegmentRef.current = playSegment;

  const playAll = useCallback(
    (startFrom = 0) => {
      stopAll();
      const token = sessionTokenRef.current + 1;
      sessionTokenRef.current = token;
      const chosenEngine = serverAvailable ? engineRef.current : 'webspeech';
      playSegment(startFrom, token, chosenEngine);
    },
    [playSegment, serverAvailable, stopAll]
  );

  const pause = useCallback(() => {
    if (statusRef.current !== 'playing') return;
    clearPlaybackTimers();
    if (engineRef.current === 'server' && audioRef.current) {
      audioRef.current.pause();
      setStatus('paused');
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
      setStatus('paused');
    }
  }, [clearPlaybackTimers]);

  const resume = useCallback(() => {
    if (statusRef.current !== 'paused') return;
    if (engineRef.current === 'server' && audioRef.current) {
      audioRef.current.playbackRate = rateRef.current;
      audioRef.current.play().catch(() => {});
      setStatus('playing');
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
      setStatus('playing');
    }
  }, []);

  const restart = useCallback(() => {
    playAll(0);
  }, [playAll]);

  const setRate = useCallback(
    (nextRate: number) => {
      setRateState(nextRate);
      rateRef.current = nextRate;
      if (engineRef.current === 'server' && audioRef.current) {
        audioRef.current.playbackRate = nextRate;
      } else if (
        engineRef.current === 'webspeech' &&
        (statusRef.current === 'playing' || statusRef.current === 'paused')
      ) {
        // Web Speech requires re-speaking current segment to apply new rate reliably
        playAll(currentStageRef.current);
      }
    },
    [playAll]
  );

  const setEngine = useCallback(
    (next: NarratorEngine) => {
      const wasActive = statusRef.current === 'playing' || statusRef.current === 'paused';
      const resumeIdx = currentStageRef.current;
      stopAll();
      setEngineState(next);
      engineRef.current = next;
      if (wasActive) {
        const token = sessionTokenRef.current + 1;
        sessionTokenRef.current = token;
        playSegment(resumeIdx, token, next);
      }
    },
    [playSegment, stopAll]
  );

  const totalStages = Math.max(1, segments.length);
  const progressPercent =
    activeStageIndex === null
      ? status === 'idle'
        ? 0
        : 100
      : Math.round(((activeStageIndex + segmentProgress) / totalStages) * 100);

  return {
    status,
    engine,
    serverAvailable,
    webSpeechAvailable,
    activeStageIndex,
    progressPercent: Math.min(100, Math.max(0, progressPercent)),
    rate,
    errorMessage,
    setEngine,
    setRate,
    playAll,
    pause,
    resume,
    restart,
    stop: stopAll,
  };
}
