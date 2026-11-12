"use client";

import {
  BackgroundVideo,
  type BackgroundVideoHandle,
} from "@/components/BackgroundVideo";
import { FallingFlowers } from "@/components/FallingFlowers";
import { Invite } from "@/components/Invite";
import { InviteAudio, type InviteAudioHandle } from "@/components/InviteAudio";
import { OpeningGate } from "@/components/OpeningGate";
import { useCallback, useEffect, useRef, useState } from "react";

export function InviteShell() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<InviteAudioHandle>(null);
  const videoRef = useRef<BackgroundVideoHandle>(null);
  const audioOnRef = useRef(false);

  const startAudio = useCallback(async () => {
    if (audioOnRef.current) return;
    const ok = await audioRef.current?.playFromStart();
    if (ok) audioOnRef.current = true;
  }, []);

  useEffect(() => {
    void startAudio();
    void videoRef.current?.play();

    const kick = () => void startAudio();
    const events = ["touchstart", "touchend", "click", "keydown", "pointerdown"] as const;

    for (const name of events) {
      window.addEventListener(name, kick, { capture: true });
    }

    const onVisible = () => {
      if (document.visibilityState === "visible") void startAudio();
    };
    window.addEventListener("pageshow", kick);
    window.addEventListener("visibilitychange", onVisible);

    const retry = window.setInterval(() => {
      if (audioOnRef.current) {
        window.clearInterval(retry);
        return;
      }
      void startAudio();
    }, 600);
    window.setTimeout(() => window.clearInterval(retry), 5000);

    return () => {
      for (const name of events) {
        window.removeEventListener(name, kick, { capture: true });
      }
      window.removeEventListener("pageshow", kick);
      window.removeEventListener("visibilitychange", onVisible);
      window.clearInterval(retry);
    };
  }, [startAudio]);

  const handleOpen = useCallback(() => {
    void startAudio();
    void videoRef.current?.play();
    setOpen(true);
  }, [startAudio]);

  return (
    <div className="invite-root">
      <BackgroundVideo ref={videoRef} />
      <InviteAudio ref={audioRef} />
      <FallingFlowers active={open} />
      {!open ? <OpeningGate onOpen={handleOpen} /> : null}
      <Invite revealed={open} />
    </div>
  );
}
