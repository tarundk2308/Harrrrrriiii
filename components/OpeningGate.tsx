"use client";

import { invite } from "@/lib/invite";
import { GroomName } from "@/components/GroomName";
import { Kolam } from "@/components/Kolam";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function OpeningGate({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
  };

  return (
    <motion.div
      className="gate"
      initial={false}
      animate={opening ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }}
      transition={{ duration: reduce ? 0.2 : 0.55, delay: opening ? (reduce ? 0 : 0.45) : 0, ease }}
      aria-hidden={opening}
    >
      <div className="gate-inner">
        <motion.button
          type="button"
          className="gate-card"
          onClick={open}
          aria-label="Open the invitation"
          animate={opening ? { y: reduce ? 0 : -10, scale: reduce ? 1 : 0.98, opacity: 0.85 } : { y: 0, scale: 1, opacity: 1 }}
          transition={{ duration: reduce ? 0.12 : 0.75, ease }}
          whileTap={reduce ? undefined : { scale: 0.985 }}
        >
          <span className="gate-mark" aria-hidden="true">
            H<span>·</span>S
          </span>

          <Kolam when="load" />

          <p lang="ta" className="gate-tamil">
            {invite.occasionTamil}
          </p>
          <p className="gate-eyebrow">Engagement</p>

          <span className="gate-rule" aria-hidden="true" />

          <p className="gate-names">
            <GroomName variant="compact" />
            <span className="gate-amp">&</span>
            {invite.bride}
          </p>

          <p className="gate-when">
            {invite.weekday} · {invite.dateLine}
            <br />
            {invite.timeLine} · {invite.city}
          </p>

          <span className="gate-rule gate-rule-short" aria-hidden="true" />

          <span className="gate-open">Tap to open</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
