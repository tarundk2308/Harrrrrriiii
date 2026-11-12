"use client";

import { invite } from "@/lib/invite";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";

export type InviteAudioHandle = {
  playFromStart: () => Promise<boolean>;
  ensureAudible: () => Promise<boolean>;
};

function seekToStart(el: HTMLAudioElement) {
  el.volume = 0.42;
  if (el.currentTime < invite.audioStartSeconds - 0.25) {
    el.currentTime = invite.audioStartSeconds;
  }
}

export const InviteAudio = forwardRef<
  InviteAudioHandle,
  { onReady?: () => void }
>(function InviteAudio({ onReady }, ref) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const playFromStart = async () => {
    const el = audioRef.current;
    if (!el) return false;
    if (!el.paused && el.currentTime >= invite.audioStartSeconds - 0.5) {
      return true;
    }

    seekToStart(el);
    el.muted = false;

    try {
      await el.play();
      if (!el.paused) return true;
    } catch {
      /* autoplay policy — try muted so playback is armed */
    }

    try {
      el.muted = true;
      await el.play();
      return !el.paused;
    } catch {
      return false;
    }
  };

  const ensureAudible = async () => {
    const el = audioRef.current;
    if (!el) return false;

    el.muted = false;
    el.volume = 0.42;
    if (el.currentTime < invite.audioStartSeconds - 0.25) {
      el.currentTime = invite.audioStartSeconds;
    }

    if (el.paused) {
      try {
        await el.play();
      } catch {
        return false;
      }
    }

    return !el.paused && !el.muted;
  };

  useImperativeHandle(ref, () => ({ playFromStart, ensureAudible }), []);

  const kick = () => {
    void playFromStart();
    void ensureAudible();
  };

  useLayoutEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.setAttribute("playsinline", "");
    kick();
    onReady?.();
  }, [onReady]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.load();

    kick();

    el.addEventListener("loadeddata", kick);
    el.addEventListener("canplay", kick);
    el.addEventListener("canplaythrough", kick);
    el.addEventListener("playing", kick);

    const onPause = () => {
      if (document.visibilityState !== "visible") return;
      void ensureAudible();
    };
    el.addEventListener("pause", onPause);

    const watchdog = window.setInterval(() => {
      if (el.paused || el.muted) void ensureAudible();
    }, 900);

    return () => {
      el.removeEventListener("loadeddata", kick);
      el.removeEventListener("canplay", kick);
      el.removeEventListener("canplaythrough", kick);
      el.removeEventListener("playing", kick);
      el.removeEventListener("pause", onPause);
      window.clearInterval(watchdog);
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
