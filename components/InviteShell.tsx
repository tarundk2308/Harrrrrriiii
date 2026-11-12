"use client";

import {
  BackgroundVideo,
  type BackgroundVideoHandle,
} from "@/components/BackgroundVideo";
import { FallingFlowers } from "@/components/FallingFlowers";
import { Invite } from "@/components/Invite";
import { InviteAudio, type InviteAudioHandle } from "@/components/InviteAudio";
import { OpeningGate } from "@/components/OpeningGate";
import { useCallback, useRef, useState } from "react";

export function InviteShell() {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<InviteAudioHandle>(null);
  const videoRef = useRef<BackgroundVideoHandle>(null);

  const handleOpen = useCallback(() => {
    void audioRef.current?.playFromStart();
    void videoRef.current?.play();
    setOpen(true);
  }, []);

  return (
    <>
      <BackgroundVideo ref={videoRef} visible={open} />
      <InviteAudio ref={audioRef} />
      <FallingFlowers active={open} />
      {!open ? <OpeningGate onOpen={handleOpen} /> : null}
      <Invite revealed={open} />
    </>
  );
}
