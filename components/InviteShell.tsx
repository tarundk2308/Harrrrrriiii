"use client";

import { FallingFlowers } from "@/components/FallingFlowers";
import { HeartReveal } from "@/components/HeartReveal";
import { Invite } from "@/components/Invite";
import { InviteAudio } from "@/components/InviteAudio";
import { InviteBackdrop } from "@/components/InviteBackdrop";
import { OpeningGate } from "@/components/OpeningGate";
import { useState } from "react";

export function InviteShell() {
  const [open, setOpen] = useState(false);
  const [gateVisible, setGateVisible] = useState(true);
  const [heartActive, setHeartActive] = useState(false);

  const handleOpenStart = () => {
    setHeartActive(true);
    setOpen(true);
  };

  return (
    <div className={`invite-root ${open ? "is-open" : "is-gate"}`}>
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
