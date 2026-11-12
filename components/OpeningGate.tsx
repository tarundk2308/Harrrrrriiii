"use client";

import { AnimatedFloralStrip } from "@/components/AnimatedFloralStrip";
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
      transition={{ duration: reduce ? 0.2 : 0.55, delay: opening ? (reduce ? 0 : 0.5) : 0, ease }}
      aria-hidden={opening}
    >
      <div className="gate-floral-rail" aria-hidden="true">
        <AnimatedFloralStrip
          src="/images/lotus-florals.jpg"
          width={1024}
          height={260}
          imageClassName="gate-lotus-peek-img"
          washClassName="floral-strip-wash floral-strip-wash--gate"
        />
      </div>

      <motion.button
        type="button"
        className="pin pin--gate"
        onClick={open}
        aria-label="Tap to open the betrothal invitation"
        animate={
          opening
            ? { scale: 0.92, opacity: 0, y: 24, rotate: 2 }
            : reduce
              ? { scale: 1, opacity: 1, y: 0, rotate: 0 }
              : { scale: 1, opacity: 1, y: [0, -6, 0], rotate: [-1.5, 1.5, -1.5] }
        }
        transition={
          opening
            ? { duration: reduce ? 0.12 : 0.5, ease }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
        whileTap={reduce || opening ? undefined : { scale: 0.98 }}
      >
        <div className="pin-cover pin-cover--gate" aria-hidden="true">
          <div className="pin-cover-gradient" />
          <span className="pin-chip">{invite.eventTitle}</span>
        </div>

        <div className="pin-body pin-body--gate">
          <span className="pin-name pin-name--gate">{invite.groomFull}</span>
          <span className="pin-amp" aria-hidden="true">
            &
          </span>
          <span className="pin-name pin-name--gate">{invite.brideFull}</span>
          <span className="pin-gate-meta">{invite.dateLine}</span>
        </div>

        <motion.span
          className="pin-tap"
          animate={
            opening
              ? { opacity: 0, y: 8 }
              : reduce
                ? {}
                : { opacity: [0.65, 1, 0.65], y: [0, 2, 0] }
          }
          transition={
            opening
              ? { duration: 0.3, ease }
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          Tap to open
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
