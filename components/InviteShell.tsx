"use client";

import { FallingFlowers } from "@/components/FallingFlowers";
import { Invite } from "@/components/Invite";
import { InviteAudio } from "@/components/InviteAudio";
import { OpeningGate } from "@/components/OpeningGate";
import { useState } from "react";

export function InviteShell() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <InviteAudio playing={open} />
      <FallingFlowers active={open} />
      {!open ? <OpeningGate onOpen={() => setOpen(true)} /> : null}
      <Invite revealed={open} />
    </>
  );
}
