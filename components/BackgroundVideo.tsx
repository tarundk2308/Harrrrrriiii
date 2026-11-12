"use client";

import { invite } from "@/lib/invite";
import { forwardRef, useImperativeHandle, useRef } from "react";

export type BackgroundVideoHandle = {
  play: () => Promise<void>;
};

export const BackgroundVideo = forwardRef<
  BackgroundVideoHandle,
  { visible: boolean }
>(function BackgroundVideo({ visible }, ref) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = async () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.playsInline = true;
    try {
      await el.play();
    } catch {
      /* retried from shell if needed */
    }
  };

  useImperativeHandle(ref, () => ({ play }), []);

  return (
    <div className={`bg-video${visible ? " is-on" : ""}`} aria-hidden="true">
      <video
        ref={videoRef}
        className="bg-video-media"
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={invite.videoSrc} type="video/mp4" />
        {invite.videoSrcFallback ? <source src={invite.videoSrcFallback} type="video/quicktime" /> : null}
      </video>
      <div className="bg-video-veil" />
    </div>
  );
});
