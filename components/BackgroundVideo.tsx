"use client";

import { invite } from "@/lib/invite";
import { useEffect, useRef } from "react";

export function BackgroundVideo({ playing }: { playing: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !playing) return;

    const run = async () => {
      try {
        await el.play();
      } catch {
        /* gesture from open should unlock playback */
      }
    };

    void run();
  }, [playing]);

  if (!playing) return null;

  return (
    <div className="bg-video" aria-hidden="true">
      <video ref={ref} className="bg-video-media" muted loop playsInline autoPlay preload="auto">
        <source src={invite.videoSrc} type="video/mp4" />
        {invite.videoSrcFallback ? <source src={invite.videoSrcFallback} type="video/quicktime" /> : null}
      </video>
      <div className="bg-video-veil" />
    </div>
  );
}
