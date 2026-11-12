"use client";

import {
  BackgroundVideo,
  type BackgroundVideoHandle,
} from "@/components/BackgroundVideo";
import { FallingFlowers } from "@/components/FallingFlowers";
import { Invite } from "@/components/Invite";
import { InviteAudio } from "@/components/InviteAudio";
import { InvitePauseBeat } from "@/components/InvitePauseBeat";
import { OpeningGate } from "@/components/OpeningGate";
import { useEffect, useRef, useState } from "react";

const PAUSE_MS = 1300;

export function InviteShell() {
  const [gateVisible, setGateVisible] = useState(true);
  const [pauseBeat, setPauseBeat] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<BackgroundVideoHandle>(null);

  useEffect(() => {
    void videoRef.current?.play();
  }, []);

  const finishGate = () => {
    setGateVisible(false);
    setPauseBeat(true);
    window.setTimeout(() => {
      setPauseBeat(false);
      setReady(true);
      void videoRef.current?.play();
    }, PAUSE_MS);
  };

  return (
    <div className={`invite-root ${ready ? "is-open" : "is-gate"}`}>
      <BackgroundVideo ref={videoRef} />
      <FallingFlowers active={ready} />
      <InviteAudio active={ready} />
      <InvitePauseBeat active={pauseBeat} />
      <Invite revealed={ready} />
      {gateVisible ? <OpeningGate onOpen={finishGate} /> : null}
    </div>
  );
}
