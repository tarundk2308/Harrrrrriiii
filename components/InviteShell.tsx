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

  const startAudio = useCallback(() => {
    void audioRef.current?.playFromStart();
  }, []);

  useEffect(() => {
    startAudio();
    void videoRef.current?.play();

    const onInteract = () => startAudio();
    window.addEventListener("pointerdown", onInteract, { once: true });
    return () => window.removeEventListener("pointerdown", onInteract);
  }, [startAudio]);

  const handleOpen = useCallback(() => {
    startAudio();
    setOpen(true);
  }, [startAudio]);

  return (
    <>
      <BackgroundVideo ref={videoRef} />
      <InviteAudio ref={audioRef} />
      <FallingFlowers active={open} />
      {!open ? <OpeningGate onOpen={handleOpen} /> : null}
      <Invite revealed={open} />
    </>
  );
}
