"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function OpeningGate({
  onOpen,
  onPrime,
}: {
  onOpen: () => void;
  onPrime?: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onPrime?.();
    onOpen();
  };

  return (
    <motion.div
      className="gate"
      initial={false}
      animate={opening ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }}
      transition={{ duration: reduce ? 0.2 : 0.5, delay: opening ? (reduce ? 0 : 0.4) : 0, ease }}
      aria-hidden={opening}
      onPointerDown={() => onPrime?.()}
    >
      <motion.button
        type="button"
        className="gate-chip"
        onClick={open}
        aria-label="Tap to open the invitation"
        animate={opening ? { scale: 0.96, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: reduce ? 0.12 : 0.45, ease }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
      >
        <span className="gate-mark" aria-hidden="true">
          H<span>·</span>S
        </span>
        <span className="gate-open">Tap to open</span>
      </motion.button>
    </motion.div>
  );
}
