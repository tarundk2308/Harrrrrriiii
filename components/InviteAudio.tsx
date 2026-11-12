"use client";

import { invite } from "@/lib/invite";
import { useEffect, useRef } from "react";

export function InviteAudio({ playing }: { playing: boolean }) {
  const ref = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !playing) return;

    const start = async () => {
      try {
        el.volume = 0.42;
        el.currentTime = invite.audioStartSeconds;
        await el.play();
      } catch {
        /* autoplay blocked until user gesture — open click counts */
      }
    };

    void start();
  }, [playing]);

  return (
    <audio ref={ref} src={invite.audioSrc} loop preload="auto" className="sr-only" aria-hidden="true" />
  );
}
