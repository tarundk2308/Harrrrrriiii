"use client";

import { PinterestPinArt } from "@/components/PinterestPinArt";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const OPEN_MS = 1200;

export function OpeningGate({
  onOpenStart,
  onOpenComplete,
}: {
  onOpenStart: () => void;
  onOpenComplete: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpenStart();
    const touch =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 640px), (hover: none) and (pointer: coarse)").matches;
    const doneMs = reduce ? 220 : touch ? 1320 : OPEN_MS;
    window.setTimeout(() => onOpenComplete(), doneMs);
  };

  return (
    <motion.div
      className="gate gate--pinterest"
      initial={false}
      animate={
        opening ? { opacity: 0, pointerEvents: "none" } : { opacity: 1, pointerEvents: "auto" }
      }
      transition={{ duration: reduce ? 0.2 : 0.45, delay: opening ? (reduce ? 0 : 0.45) : 0, ease }}
      aria-hidden={opening}
    >
      <motion.button
        type="button"
        className="pinterest-pin pinterest-pin--interactive"
        onClick={open}
        aria-label="Tap to open the betrothal invitation"
        animate={opening ? { scale: 0.97, opacity: 0, y: 12 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.12 : 0.4, ease }}
        whileTap={reduce || opening ? undefined : { scale: 0.985 }}
      >
        <PinterestPinArt />

        <div className="pinterest-pin__copy">
          <p className="pinterest-pin__eyebrow">{invite.eventTitle}</p>
          <p className="pinterest-pin__title pinterest-pin__title--gate">
            {invite.groomFull}
            <span className="pinterest-pin__amp"> & </span>
            {invite.brideFull}
          </p>
          <p className="pinterest-pin__meta pinterest-pin__meta--gate">{invite.dateLine}</p>
        </div>

        <span className="pinterest-pin__hint">Tap to open</span>
      </motion.button>
    </motion.div>
  );
}
