"use client";

import { useEffect, useRef } from "react";

const SRC = "/audio/adiyae.mp3";

export function InviteAudio({ active }: { active: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const audio = new Audio(SRC);
    audio.loop = true;
    audio.volume = 0.42;
    audio.preload = "auto";
    audioRef.current = audio;

    const start = async () => {
      try {
        audio.currentTime = 0;
        await audio.play();
      } catch {
        /* gesture already consumed on gate tap */
      }
    };

    void start();

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [active]);

  return null;
}
