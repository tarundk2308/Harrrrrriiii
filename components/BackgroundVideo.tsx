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
    el.muted = true;
    el.playsInline = true;
    try {
      await el.play();
    } catch {
      /* retried on first interaction */
    }
  };

  useImperativeHandle(ref, () => ({ play }), []);

  useEffect(() => {
    void play();
  }, []);

  return (
    <div className="bg-video is-on" aria-hidden="true">
      <video
        ref={videoRef}
        className="bg-video-media"
        muted
        loop
        playsInline
        autoPlay
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
