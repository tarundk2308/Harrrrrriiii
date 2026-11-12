"use client";

import {
  BackgroundVideo,
  type BackgroundVideoHandle,
} from "@/components/BackgroundVideo";
import { FallingFlowers } from "@/components/FallingFlowers";
import { HeartReveal } from "@/components/HeartReveal";
import { Invite } from "@/components/Invite";
import { InviteAudio } from "@/components/InviteAudio";
import { InviteBackdrop } from "@/components/InviteBackdrop";
import { OpeningGate } from "@/components/OpeningGate";
import { useEffect, useRef, useState } from "react";

export function InviteShell() {
  const [open, setOpen] = useState(false);
  const [gateVisible, setGateVisible] = useState(true);
  const [heartActive, setHeartActive] = useState(false);
  const videoRef = useRef<BackgroundVideoHandle>(null);

  useEffect(() => {
    void videoRef.current?.play();
  }, []);

  const handleOpenStart = () => {
    setHeartActive(true);
    setOpen(true);
    void videoRef.current?.play();
  };

  return (
    <div className={`invite-root ${open ? "is-open" : "is-gate"}`}>
      <BackgroundVideo ref={videoRef} />
      <InviteBackdrop lush={open} />
      <FallingFlowers intense={open} />
      <InviteAudio active={open} />
      {gateVisible ? (
        <OpeningGate
          onOpenStart={handleOpenStart}
          onOpenComplete={() => setGateVisible(false)}
        />
      ) : null}
      <HeartReveal active={heartActive} onComplete={() => setHeartActive(false)} />
      <Invite revealed={open} rising={heartActive || open} />
    </div>
  );
}
