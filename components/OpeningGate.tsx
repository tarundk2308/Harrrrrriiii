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
    window.setTimeout(() => onOpen(), reduce ? 120 : 1300);
  };

  return (
    <motion.div
      className="gate"
      initial={false}
      animate={opening ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }}
      transition={{ duration: reduce ? 0.2 : 0.6, delay: opening ? (reduce ? 0 : 0.65) : 0, ease }}
      aria-hidden={opening}
    >
      <div className="gate-inner">
        <motion.div
          className="envelope"
          animate={
            opening
              ? { y: reduce ? 0 : -18, scale: reduce ? 1 : 1.02, opacity: reduce ? 1 : 0.92 }
              : { y: 0, scale: 1, opacity: 1 }
          }
          transition={{ duration: reduce ? 0.15 : 0.95, ease }}
        >
          <div className="env-lid" aria-hidden="true">
            <div className={`env-flap ${opening ? "is-open" : ""}`} />
            <span className="env-seal">
              H<span>·</span>S
            </span>
          </div>

          <div className="env-sheet">
            <Kolam when="load" />
            <p lang="ta" className="gate-tamil">
              {invite.occasionTamil}
            </p>
            <p className="gate-eyebrow">Engagement</p>
            <p className="gate-names">
              {invite.groom}
              <span className="gate-amp">&</span>
              {invite.bride}
            </p>
            <p className="gate-when">
              {invite.city} · {invite.dateLine}
            </p>

            <motion.button
              type="button"
              className="open-pill"
              onClick={open}
              aria-label="Open the invitation"
              whileTap={reduce ? undefined : { scale: 0.97 }}
              animate={opening ? { opacity: 0 } : { opacity: 1 }}
            >
              <span className="open-pill-label">Open invitation</span>
              <span className="open-pill-hint" aria-hidden="true">
                ↓
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
