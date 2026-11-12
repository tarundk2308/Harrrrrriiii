"use client";

import { FallingFlowers } from "@/components/FallingFlowers";
import { Invite } from "@/components/Invite";
import { OpeningGate } from "@/components/OpeningGate";
import { useState } from "react";

export function InviteShell() {
  const [open, setOpen] = useState(false);
  const [gateVisible, setGateVisible] = useState(true);

  return (
    <div className={`invite-root ${open ? "is-open" : "is-gate"}`}>
      <FallingFlowers intense={open} />
      {gateVisible ? (
        <OpeningGate
          onOpenStart={() => setOpen(true)}
          onOpenComplete={() => setGateVisible(false)}
        />
      ) : null}
      <Invite revealed={open} />
    </div>
  );
}
