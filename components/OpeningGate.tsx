"use client";

import { invite } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
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
      className="gate gate--engagement"
      initial={false}
      animate={
        opening ? { opacity: 0, pointerEvents: "none" } : { opacity: 1, pointerEvents: "auto" }
      }
      transition={{ duration: reduce ? 0.2 : 0.55, delay: opening ? (reduce ? 0 : 0.5) : 0, ease }}
      aria-hidden={opening}
    >
      <div className="gate-lotus-peek" aria-hidden="true">
        <Image src="/images/lotus-florals.jpg" alt="" width={1024} height={260} className="gate-lotus-peek-img" priority />
      </div>

      <motion.button
        type="button"
        className="gate-envelope gate-envelope--engagement"
        onClick={open}
        aria-label="Tap to open the engagement invitation"
        animate={
          opening
            ? { scale: 0.9, opacity: 0, y: 20 }
            : reduce
              ? { scale: 1, opacity: 1, y: 0 }
              : { scale: 1, opacity: 1, y: [0, -6, 0] }
        }
        transition={
          opening
            ? { duration: reduce ? 0.12 : 0.5, ease }
            : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
        }
        whileTap={reduce || opening ? undefined : { scale: 0.97 }}
      >
        {!reduce && !opening ? (
          <motion.span
            className="gate-pulse"
            aria-hidden="true"
            animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        ) : null}

        <motion.div
          className="gate-monogram-hero"
          aria-hidden="true"
          animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>H</span>
          <span className="gate-monogram-dot">·</span>
          <span>S</span>
        </motion.div>

        <span className="gate-couple gate-couple--script">
          {invite.brideShort}
          <span className="gate-amp-gold">&</span>
          {invite.groomShort}
        </span>

        <span className="gate-when gate-when--engagement">{invite.eventTitle}</span>
        <span className="gate-when-sub">{invite.dateLine}</span>

        <span className="gate-divider" aria-hidden="true" />

        <motion.span
          className="gate-open gate-open--hero"
          animate={
            opening
              ? { y: -20, opacity: 0 }
              : reduce
                ? {}
                : { letterSpacing: ["0.26em", "0.34em", "0.26em"] }
          }
          transition={
            opening
              ? { duration: 0.35, ease }
              : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }
        >
          Tap to open
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
