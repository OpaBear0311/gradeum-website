// useTimeline.ts — drives the choreography

import { useState, useEffect, useCallback, useRef } from 'react';

export interface Beat {
  id: string;
  startMs: number;
  durationMs: number;
}

export function useTimeline(beats: Beat[]) {
  const [elapsed, setElapsed] = useState(-1); // -1 = not started
  const [playing, setPlaying] = useState(false);
  const startRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  const totalDuration = beats.length > 0
    ? Math.max(...beats.map(b => b.startMs + b.durationMs))
    : 0;

  const tick = useCallback(() => {
    const now = performance.now() - startRef.current;
    setElapsed(now);
    if (now < totalDuration + 2000) {
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [totalDuration]);

  const play = useCallback(() => {
    startRef.current = performance.now();
    setElapsed(0);
    setPlaying(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const restart = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setElapsed(-1);
    setPlaying(false);
    setTimeout(play, 100);
  }, [play]);

  // Auto-start after 1s
  useEffect(() => {
    const timer = setTimeout(play, 1000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [play]);

  const activeBeat = beats.find(
    b => elapsed >= b.startMs && elapsed < b.startMs + b.durationMs
  )?.id || (elapsed >= totalDuration ? 'done' : null);

  const beatProgress = (beatId: string): number => {
    const beat = beats.find(b => b.id === beatId);
    if (!beat) return 0;
    if (elapsed < beat.startMs) return 0;
    if (elapsed >= beat.startMs + beat.durationMs) return 1;
    return (elapsed - beat.startMs) / beat.durationMs;
  };

  const isBeatActive = (beatId: string): boolean => {
    const beat = beats.find(b => b.id === beatId);
    if (!beat) return false;
    return elapsed >= beat.startMs;
  };

  const isBeatDone = (beatId: string): boolean => {
    const beat = beats.find(b => b.id === beatId);
    if (!beat) return false;
    return elapsed >= beat.startMs + beat.durationMs;
  };

  return { elapsed, playing, activeBeat, beatProgress, isBeatActive, isBeatDone, restart, done: elapsed >= totalDuration };
}
