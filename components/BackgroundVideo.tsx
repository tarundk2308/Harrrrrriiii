"use client";

import { invite } from "@/lib/invite";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type BackgroundVideoHandle = {
  play: () => Promise<void>;
};

export const BackgroundVideo = forwardRef<BackgroundVideoHandle>(function BackgroundVideo(_props, ref) {
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
      /* retried on interaction */
    }
  };

  useImperativeHandle(ref, () => ({ play }), []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");
    el.removeAttribute("controls");

    const kick = () => void play();
    kick();

    el.addEventListener("loadeddata", kick);
    el.addEventListener("canplay", kick);

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
      el.removeEventListener("pause", onPause);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("click", onInteract);
    };
  }, []);

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
          <source src={invite.videoSrcFallback} type="video/quicktime" />
        </video>
      </div>
      <div className="bg-video-veil" />
    </div>
  );
});
