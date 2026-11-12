"use client";

import {
  BackgroundVideo,
  type BackgroundVideoHandle,
} from "@/components/BackgroundVideo";
import { FallingFlowers } from "@/components/FallingFlowers";
import { Invite } from "@/components/Invite";
import { InviteAudio, type InviteAudioHandle } from "@/components/InviteAudio";
import { OpeningGate } from "@/components/OpeningGate";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export function InviteShell() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<InviteAudioHandle>(null);
  const videoRef = useRef<BackgroundVideoHandle>(null);
  const startAudio = useCallback(async () => {
    const handle = audioRef.current;
    if (!handle) return false;

    await handle.playFromStart();
    const audible = await handle.ensureAudible();
    return audible;
  }, []);

  useLayoutEffect(() => {
    void startAudio();
  }, [startAudio]);

  useEffect(() => {
    void startAudio();
    void videoRef.current?.play();

    let raf = 0;
    let rafCount = 0;
    const rafKick = () => {
      if (rafCount > 240) return;
      rafCount += 1;
      void startAudio();
      raf = window.requestAnimationFrame(rafKick);
    };
    raf = window.requestAnimationFrame(rafKick);

    const kick = () => void startAudio();
    const events = [
      "touchstart",
      "touchend",
      "click",
      "keydown",
      "pointerdown",
      "scroll",
      "wheel",
    ] as const;

    for (const name of events) {
      window.addEventListener(name, kick, { capture: true, passive: true });
    }

    const onVisible = () => {
      if (document.visibilityState === "visible") void startAudio();
    };
    window.addEventListener("pageshow", kick);
    window.addEventListener("visibilitychange", onVisible);

    const keepAlive = window.setInterval(() => void startAudio(), 750);

    return () => {
      window.cancelAnimationFrame(raf);
      for (const name of events) {
        window.removeEventListener(name, kick, { capture: true });
      }
      window.removeEventListener("pageshow", kick);
      window.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(keepAlive);
    };
  }, [startAudio]);

  const handleOpen = useCallback(() => {
    void startAudio();
    void videoRef.current?.play();
    setOpen(true);
  }, [startAudio]);

  return (
    <div className="invite-root">
      <BackgroundVideo ref={videoRef} onPlaying={startAudio} />
      <InviteAudio ref={audioRef} onReady={() => void startAudio()} />
      <FallingFlowers active={open} />
      {!open ? <OpeningGate onOpen={handleOpen} onPrime={startAudio} /> : null}
      <Invite revealed={open} />
    </div>
  );
}
