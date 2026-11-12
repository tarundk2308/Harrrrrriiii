"use client";

import { invite } from "@/lib/invite";
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
    window.setTimeout(() => onOpen(), reduce ? 120 : 1400);
  };

  return (
    <motion.div
      className="gate"
      initial={false}
      animate={opening ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }}
      transition={{ duration: reduce ? 0.2 : 0.65, delay: opening ? (reduce ? 0 : 0.75) : 0, ease }}
      aria-hidden={opening}
    >
      <div className="gate-inner">
        <motion.button
          type="button"
          className="envelope"
          onClick={open}
          aria-label="Click to open the invitation"
          animate={
            opening
              ? { scale: reduce ? 1 : 1.03, y: reduce ? 0 : -12, rotateX: reduce ? 0 : -8 }
              : { scale: 1, y: 0, rotateX: 0 }
          }
          transition={{ duration: reduce ? 0.15 : 1.1, ease }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
        >
          <span className={`flap ${opening ? "is-open" : ""}`} aria-hidden="true" />
          <span className="env-body">
            <Kolam when="load" />
            <span lang="ta" className="gate-tamil">
              {invite.occasionTamil}
            </span>
            <span className="gate-monogram" aria-hidden="true">
              H<span>·</span>S
            </span>
            <span className="gate-names">
              {invite.groom} & {invite.bride}
            </span>
            <span className="gate-cta">Click to open</span>
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
}
