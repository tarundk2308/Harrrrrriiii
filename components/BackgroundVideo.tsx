"use client";

import { invite } from "@/lib/invite";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type BackgroundVideoHandle = {
  play: () => Promise<void>;
};

export const BackgroundVideo = forwardRef<
  BackgroundVideoHandle,
  { onPlaying?: () => void }
>(function BackgroundVideo({ onPlaying }, ref) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = async () => {
    const el = videoRef.current;
    if (!el) return;
    el.defaultMuted = true;
    el.muted = true;
    el.playsInline = true;
    el.controls = false;
    try {
      await el.play();
    } catch {
      /* retried on events below */
    }
  };

  useImperativeHandle(ref, () => ({ play }), []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");
    el.setAttribute("x-webkit-airplay", "deny");
    el.removeAttribute("controls");

    const kick = () => void play();
    kick();

    const handlePlaying = () => onPlaying?.();

    el.addEventListener("loadeddata", kick);
    el.addEventListener("canplay", kick);
    el.addEventListener("playing", handlePlaying);

    const onPause = () => {
      if (document.visibilityState !== "visible") return;
      void play();
    };
    el.addEventListener("pause", onPause);

    const onInteract = () => void play();
    window.addEventListener("touchstart", onInteract, { once: true, passive: true });
    window.addEventListener("click", onInteract, { once: true });

    return () => {
      el.removeEventListener("loadeddata", kick);
      el.removeEventListener("canplay", kick);
      el.removeEventListener("playing", handlePlaying);
      el.removeEventListener("pause", onPause);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
    };
  }, [onPlaying]);

  return (
    <div className="bg-video is-on" aria-hidden="true">
      <div className="bg-video-frame">
        <video
          ref={videoRef}
          className="bg-video-media"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
        >
          <source src={invite.videoSrc} type="video/mp4" />
        </video>
      </div>
      <div className="bg-video-veil" />
    </div>
  );
});
