"use client";

import { invite } from "@/lib/invite";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type InviteAudioHandle = {
  playFromStart: () => Promise<boolean>;
};

export const InviteAudio = forwardRef<InviteAudioHandle>(function InviteAudio(_props, ref) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playFromStart = async () => {
    const el = audioRef.current;
    if (!el) return false;
    el.volume = 0.42;
    if (el.currentTime < invite.audioStartSeconds - 0.25) {
      el.currentTime = invite.audioStartSeconds;
    }
    try {
      await el.play();
      return !el.paused;
    } catch {
      return false;
    }
  };

  useImperativeHandle(ref, () => ({ playFromStart }), []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.setAttribute("playsinline", "");
    const onReady = () => void playFromStart();
    el.addEventListener("canplaythrough", onReady, { once: true });
    return () => el.removeEventListener("canplaythrough", onReady);
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
