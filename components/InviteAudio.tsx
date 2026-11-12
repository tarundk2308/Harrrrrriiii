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
  /** Muted autoplay-friendly start at the configured offset. */
  playFromStart: () => Promise<boolean>;
  /** Unmute and play — call from a user gesture when possible. */
  ensureAudible: () => Promise<boolean>;
};

function applyStartOffset(el: HTMLAudioElement) {
  if (el.readyState < 1) return;
  const start = invite.audioStartSeconds;
  if (el.currentTime < start - 0.2) {
    try {
      el.currentTime = start;
    } catch {
      /* wait for more data */
    }
  }
}

export const InviteAudio = forwardRef<
  InviteAudioHandle,
  { onReady?: () => void }
>(function InviteAudio({ onReady }, ref) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const audibleRef = useRef(false);

  const playFromStart = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return false;

    applyStartOffset(el);
    el.volume = 0.42;

    if (
      !el.paused &&
      el.currentTime >= invite.audioStartSeconds - 0.5 &&
      (audibleRef.current ? !el.muted : true)
    ) {
      return true;
    }

    if (!audibleRef.current) {
      el.muted = true;
    } else {
      el.muted = false;
    }

    try {
      await el.play();
      applyStartOffset(el);
      if (!el.muted) audibleRef.current = true;
      return !el.paused;
    } catch {
      if (audibleRef.current) return false;
    }

    el.muted = true;
    try {
      await el.play();
      applyStartOffset(el);
      return !el.paused;
    } catch {
      return false;
    }
  }, []);

  const ensureAudible = useCallback(async () => {
    const el = audioRef.current;
    if (!el) return false;

    applyStartOffset(el);
    el.volume = 0.42;
    el.muted = false;

    try {
      if (el.paused) {
        await el.play();
      }
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

    const onMeta = () => {
      applyStartOffset(el);
      arm();
    };

    el.addEventListener("loadedmetadata", onMeta);
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
      el.removeEventListener("loadedmetadata", onMeta);
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
      autoPlay
      preload="auto"
      playsInline
      controls={false}
      className="invite-media-hidden"
      aria-hidden="true"
    />
  );
});
