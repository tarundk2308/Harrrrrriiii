"use client";

import {
  BackgroundVideo,
  type BackgroundVideoHandle,
} from "@/components/BackgroundVideo";
import { FallingFlowers } from "@/components/FallingFlowers";
import { Invite } from "@/components/Invite";
import { InviteAudio } from "@/components/InviteAudio";
import { OpeningGate } from "@/components/OpeningGate";
import { useEffect, useRef, useState } from "react";

export function InviteShell() {
  const [open, setOpen] = useState(false);
  const [gateVisible, setGateVisible] = useState(true);
  const videoRef = useRef<BackgroundVideoHandle>(null);

  useEffect(() => {
    void videoRef.current?.play();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    void videoRef.current?.play();
  };

  return (
    <div className={`invite-root ${open ? "is-open" : "is-gate"}`}>
      <BackgroundVideo ref={videoRef} />
      <FallingFlowers active={open} />
      <InviteAudio active={open} />
      <Invite revealed={open} />
      {gateVisible ? (
        <OpeningGate
          onOpen={() => {
            handleOpen();
            setGateVisible(false);
          }}
        />
      ) : null}
    </div>
  );
}
