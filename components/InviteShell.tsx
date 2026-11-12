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

const INVITE_DELAY_MS = 1150;

export function InviteShell() {
  const [sessionOpen, setSessionOpen] = useState(false);
  const [inviteVisible, setInviteVisible] = useState(false);
  const [gateVisible, setGateVisible] = useState(true);
  const videoRef = useRef<BackgroundVideoHandle>(null);

  useEffect(() => {
    void videoRef.current?.play();
  }, []);

  return (
    <div className={`invite-root ${sessionOpen ? "is-open" : "is-gate"}`}>
      <BackgroundVideo ref={videoRef} />
      <FallingFlowers active={sessionOpen} />
      <InviteAudio active={sessionOpen} />
      <Invite revealed={inviteVisible} />
      {gateVisible ? (
        <OpeningGate
          onCurtainStart={() => {
            setSessionOpen(true);
            void videoRef.current?.play();
          }}
          onCurtainEnd={() => {
            setGateVisible(false);
            window.setTimeout(() => setInviteVisible(true), INVITE_DELAY_MS);
          }}
        />
      ) : null}
    </div>
  );
}
