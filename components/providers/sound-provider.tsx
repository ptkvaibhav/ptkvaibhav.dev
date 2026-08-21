"use client";

import * as React from "react";

type SoundType = "click" | "terminal-key" | "scan" | "success" | "toggle" | "alert";

type SoundProviderState = {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (type: SoundType) => void;
};

const SoundContext = React.createContext<SoundProviderState>({
  isMuted: true,
  toggleMute: () => null,
  playSound: () => null,
});

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isMuted, setIsMuted] = React.useState(true);
  const audioCtxRef = React.useRef<AudioContext | null>(null);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("ptk-sound-muted");
      if (saved !== null) {
        setIsMuted(saved === "true");
      }
    } catch {
      // ignore
    }
  }, []);

  const getAudioContext = React.useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const toggleMute = React.useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("ptk-sound-muted", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const playSound = React.useCallback(
    (type: SoundType) => {
      if (isMuted) return;
      const ctx = getAudioContext();
      if (!ctx) return;

      try {
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === "click") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
          osc.start(now);
          osc.stop(now + 0.04);
        } else if (type === "terminal-key") {
          osc.type = "triangle";
          const randomPitch = 1200 + Math.random() * 400;
          osc.frequency.setValueAtTime(randomPitch, now);
          gain.gain.setValueAtTime(0.015, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
          osc.start(now);
          osc.stop(now + 0.03);
        } else if (type === "scan") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(400, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.12);
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
          osc.start(now);
          osc.stop(now + 0.12);
        } else if (type === "success") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(523.25, now); // C5
          osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
          osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
          osc.start(now);
          osc.stop(now + 0.25);
        } else if (type === "alert") {
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(300, now);
          osc.frequency.linearRampToValueAtTime(200, now + 0.1);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start(now);
          osc.stop(now + 0.1);
        } else if (type === "toggle") {
          osc.type = "sine";
          osc.frequency.setValueAtTime(600, now);
          osc.frequency.exponentialRampToValueAtTime(900, now + 0.05);
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
          osc.start(now);
          osc.stop(now + 0.05);
        }
      } catch {
        // audio error ignored
      }
    },
    [isMuted, getAudioContext]
  );

  const value = React.useMemo(
    () => ({ isMuted, toggleMute, playSound }),
    [isMuted, toggleMute, playSound]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export const useSound = () => React.useContext(SoundContext);

