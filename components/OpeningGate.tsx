"use client";

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
    window.setTimeout(() => onOpenComplete(), reduce ? 220 : OPEN_MS);
  };

  return (
    <motion.div
      className="gate"
      initial={false}
      animate={
        opening ? { opacity: 0, pointerEvents: "none" } : { opacity: 1, pointerEvents: "auto" }
      }
      transition={{ duration: reduce ? 0.2 : 0.55, delay: opening ? (reduce ? 0 : 0.5) : 0, ease }}
      aria-hidden={opening}
    >
      <div className="gate-sky" aria-hidden="true">
        <span className="gate-orb gate-orb--a" />
        <span className="gate-orb gate-orb--b" />
        <span className="gate-orb gate-orb--c" />
      </div>

      <motion.button
        type="button"
        className="gate-envelope"
        onClick={open}
        aria-label="Tap to open the invitation"
        animate={
          opening
            ? { scale: 0.92, opacity: 0, y: 12 }
            : reduce
              ? { scale: 1, opacity: 1, y: 0 }
              : { scale: 1, opacity: 1, y: [0, -8, 0] }
        }
        transition={
          opening
            ? { duration: reduce ? 0.12 : 0.5, ease }
            : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
        }
        whileTap={reduce || opening ? undefined : { scale: 0.96 }}
        whileHover={reduce || opening ? undefined : { scale: 1.03 }}
      >
        {!reduce && !opening ? (
          <>
            <motion.span
              className="gate-pulse"
              aria-hidden="true"
              animate={{ scale: [1, 1.4], opacity: [0.45, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="gate-petals-ring" aria-hidden="true">
              <span>✿</span>
              <span>✿</span>
              <span>✿</span>
            </span>
            <span className="gate-heart-badge" aria-hidden="true">
              ♥
            </span>
          </>
        ) : null}

        <span className="gate-mark gate-mark--hero" aria-hidden="true">
          H<span>·</span>S
        </span>

        <span className="gate-couple">
          {invite.groomFull.split(" ")[0]} & {invite.brideFull.split(" ")[0]}
        </span>

        <span className="gate-when">{invite.weddingDateLine}</span>
        <span className="gate-when-sub">{invite.city}</span>

        <span className="gate-divider" aria-hidden="true" />

        <motion.span
          className="gate-open gate-open--hero"
          animate={
            opening
              ? { y: -24, opacity: 0 }
              : reduce
                ? {}
                : { letterSpacing: ["0.28em", "0.36em", "0.28em"] }
          }
          transition={
            opening
              ? { duration: 0.35, ease }
              : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          Tap to open
        </motion.span>
        <span className="gate-hint">Your invitation awaits inside</span>
      </motion.button>
    </motion.div>
  );
}
