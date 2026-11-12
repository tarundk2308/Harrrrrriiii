"use client";

import { invite } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const OPEN_MS = 1100;

const BURST = [
  { x: -120, y: -90, r: -25 },
  { x: 130, y: -70, r: 30 },
  { x: -90, y: 100, r: 15 },
  { x: 110, y: 90, r: -20 },
  { x: 0, y: -130, r: 10 },
  { x: -140, y: 20, r: -35 },
  { x: 140, y: 10, r: 40 },
  { x: 0, y: 120, r: 5 },
  { x: -60, y: -120, r: 22 },
  { x: 70, y: -110, r: -18 },
  { x: -100, y: -30, r: 12 },
  { x: 95, y: -40, r: -12 },
];

export function OpeningGate({
  onOpenStart,
  onOpenComplete,
}: {
  onOpenStart: () => void;
  onOpenComplete: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const burst = useMemo(() => BURST, []);

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
    transition={{ duration: reduce ? 0.2 : 0.5, delay: opening ? (reduce ? 0 : 0.45) : 0, ease }}
    aria-hidden={opening}
  >
    <motion.div
      className={`gate-bloom ${opening ? "gate-bloom--on" : ""}`}
      aria-hidden="true"
      initial={false}
      animate={opening ? { scale: [0.2, 2.8], opacity: [0.55, 0] } : { scale: 0, opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.85, ease: "easeOut" }}
    />

    {opening && !reduce
      ? burst.map((p, i) => (
          <motion.span
            key={i}
            className="gate-burst-petal"
            aria-hidden="true"
            initial={{ x: 0, y: 0, scale: 0.4, opacity: 1, rotate: 0 }}
            animate={{
              x: p.x,
              y: p.y,
              scale: [0.4, 1.1, 0.6],
              opacity: [1, 1, 0],
              rotate: p.r,
            }}
            transition={{ duration: 0.85, delay: i * 0.02, ease }}
          />
        ))
      : null}

    <div className="gate-sky" aria-hidden="true">
      <span className="gate-orb gate-orb--a" />
      <span className="gate-orb gate-orb--b" />
      <span className="gate-orb gate-orb--c" />
    </div>

    <div className="gate-envelope-stage">
      <motion.span
        className="gate-flap gate-flap--left"
        aria-hidden="true"
        initial={false}
        animate={opening ? { rotateY: -108, x: -40, opacity: 0.2 } : { rotateY: 0, x: 0, opacity: 1 }}
        transition={{ duration: reduce ? 0.15 : 0.55, ease }}
      />
      <motion.span
        className="gate-flap gate-flap--right"
        aria-hidden="true"
        initial={false}
        animate={opening ? { rotateY: 108, x: 40, opacity: 0.2 } : { rotateY: 0, x: 0, opacity: 1 }}
        transition={{ duration: reduce ? 0.15 : 0.55, ease }}
      />

      <motion.button
        type="button"
        className="gate-envelope"
        onClick={open}
        aria-label="Tap to open the invitation"
        animate={
          opening
            ? { scale: [1, 1.06, 0.88], opacity: [1, 1, 0], y: [0, -6, 28], rotateZ: reduce ? 0 : [0, -2, 4] }
            : reduce
              ? { scale: 1, opacity: 1, y: 0 }
              : { scale: 1, opacity: 1, y: [0, -8, 0] }
        }
        transition={
          opening
            ? { duration: reduce ? 0.12 : 0.65, ease }
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
              animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              className="gate-shimmer"
              aria-hidden="true"
              animate={{ x: ["-120%", "140%"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
            />
          </>
        ) : null}

        <span className="gate-petals-ring" aria-hidden="true">
          <span>✿</span>
          <span>✿</span>
          <span>✿</span>
        </span>

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
              ? { y: -40, opacity: 0, letterSpacing: "0.5em" }
              : reduce
                ? {}
                : { letterSpacing: ["0.28em", "0.36em", "0.28em"] }
          }
          transition={
            opening
              ? { duration: 0.45, ease }
              : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          Tap to open
        </motion.span>
        <span className="gate-hint">Your invitation awaits inside</span>
      </motion.button>
    </div>
  </motion.div>
  );
}
