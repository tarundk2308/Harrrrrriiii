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

  const armAudio = useCallback(async () => {
    return (await audioRef.current?.playFromStart()) ?? false;
  }, []);

  const primeAudio = useCallback(async () => {
    const handle = audioRef.current;
    if (!handle) return false;
    await handle.playFromStart();
    return handle.ensureAudible();
  }, []);

  useLayoutEffect(() => {
    void armAudio();
  }, [armAudio]);

  useEffect(() => {
    void armAudio();
    void videoRef.current?.play();

    let raf = 0;
    let rafCount = 0;
    const rafKick = () => {
      if (rafCount > 180) return;
      rafCount += 1;
      void armAudio();
      raf = window.requestAnimationFrame(rafKick);
    };
    raf = window.requestAnimationFrame(rafKick);

    const onGesture = () => void primeAudio();
    const events = [
      "touchstart",
      "touchend",
      "click",
      "keydown",
      "pointerdown",
    ] as const;

    for (const name of events) {
      window.addEventListener(name, onGesture, { capture: true, passive: true });
    }

    const onVisible = () => {
      if (document.visibilityState === "visible") void armAudio();
    };
    const onPageShow = () => void primeAudio();
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("visibilitychange", onVisible);

    const keepAlive = window.setInterval(() => void armAudio(), 900);

    return () => {
      window.cancelAnimationFrame(raf);
      for (const name of events) {
        window.removeEventListener(name, onGesture, { capture: true });
      }
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(keepAlive);
    };
  }, [armAudio, primeAudio]);

  const handleOpen = useCallback(() => {
    void primeAudio();
    void videoRef.current?.play();
    setOpen(true);
  }, [primeAudio]);

  return (
    <div className="invite-root">
      <BackgroundVideo ref={videoRef} onPlaying={armAudio} />
      <InviteAudio ref={audioRef} onReady={() => void armAudio()} />
      <FallingFlowers active={open} />
      {!open ? (
        <OpeningGate onOpen={handleOpen} onPrime={primeAudio} />
      ) : null}
      <Invite revealed={open} />
    </div>
  );
}
