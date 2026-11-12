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
    if (!el.paused && el.currentTime >= invite.audioStartSeconds - 0.5) {
      return true;
    }

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
    el.load();

    const kick = () => void playFromStart();
    kick();

    el.addEventListener("loadeddata", kick);
    el.addEventListener("canplay", kick);
    el.addEventListener("canplaythrough", kick);

    return () => {
      el.removeEventListener("loadeddata", kick);
      el.removeEventListener("canplay", kick);
      el.removeEventListener("canplaythrough", kick);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src={invite.audioSrc}
      loop
      autoPlay
      preload="auto"
      controls={false}
      className="invite-media-hidden"
      aria-hidden="true"
    />
  );
});
