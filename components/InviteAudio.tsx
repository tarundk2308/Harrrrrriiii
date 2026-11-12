"use client";

import { invite } from "@/lib/invite";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type InviteAudioHandle = {
  playFromStart: () => Promise<void>;
};

export const InviteAudio = forwardRef<InviteAudioHandle>(function InviteAudio(_props, ref) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playFromStart = async () => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = 0.42;
    el.currentTime = invite.audioStartSeconds;
    try {
      await el.play();
    } catch {
      /* retried from shell if needed */
    }
  };

  useImperativeHandle(ref, () => ({ playFromStart }), []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.setAttribute("playsinline", "");
  }, []);

  return (
    <audio
      ref={audioRef}
      src={invite.audioSrc}
      loop
      preload="auto"
      className="invite-media-hidden"
      aria-hidden="true"
    />
  );
});
