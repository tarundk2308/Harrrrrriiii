"use client";

import { invite } from "@/lib/invite";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";

export type InviteAudioHandle = {
  playFromStart: () => Promise<boolean>;
  ensureAudible: () => Promise<boolean>;
};

export const InviteAudio = forwardRef<
  InviteAudioHandle,
  { onReady?: () => void }
>(function InviteAudio({ onReady }, ref) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audibleRef = useRef(false);

  const playFromStart = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return false;

    el.volume = 0.42;

    if (
      !el.paused &&
      (audibleRef.current ? !el.muted : true)
    ) {
      return true;
    }

    el.muted = audibleRef.current ? false : true;

    try {
      await el.play();
      if (!el.muted) audibleRef.current = true;
      return !el.paused;
    } catch {
      if (audibleRef.current) return false;
    }

    el.muted = true;
    try {
      await el.play();
      return !el.paused;
    } catch {
      return false;
    }
  }, []);

  const ensureAudible = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return false;

    el.volume = 0.42;
    el.muted = false;

    try {
      if (el.paused) await el.play();
      audibleRef.current = !el.paused && !el.muted;
      return audibleRef.current;
    } catch {
      return false;
    }
  }, []);

  useImperativeHandle(ref, () => ({ playFromStart, ensureAudible }), [
    playFromStart,
    ensureAudible,
  ]);

  const arm = useCallback(() => {
    void playFromStart();
  }, [playFromStart]);

  useLayoutEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.setAttribute("playsinline", "");
    arm();
    onReady?.();
  }, [arm, onReady]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    el.addEventListener("loadeddata", arm);
    el.addEventListener("canplay", arm);

    const onPause = () => {
      if (document.visibilityState !== "visible") return;
      if (!audibleRef.current) arm();
    };
    el.addEventListener("pause", onPause);

    const watchdog = window.setInterval(() => {
      if (el.paused) arm();
    }, 1200);

    return () => {
      el.removeEventListener("loadeddata", arm);
      el.removeEventListener("canplay", arm);
      el.removeEventListener("pause", onPause);
      window.clearInterval(watchdog);
    };
  }, [arm]);

  return (
    <audio
      ref={audioRef}
      src={invite.audioSrc}
      loop
      preload="auto"
      playsInline
      controls={false}
      className="invite-media-hidden"
      aria-hidden="true"
    />
  );
});
