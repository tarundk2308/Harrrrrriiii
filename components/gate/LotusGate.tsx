"use client";

import { GateScene } from "@/components/gate/GateScene";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

const SPLIT_S = 0.92;
const SPLIT_EASE = [0.45, 0, 0.18, 1] as const;

export function LotusGate({
  onPreload,
  onExit,
}: {
  onPreload: () => void;
  onExit: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const [done, setDone] = useState(false);

  const open = useCallback(() => {
    if (opening || done) return;
    onPreload();
    if (reduce) {
      setDone(true);
      onExit();
      return;
    }
    setOpening(true);
  }, [done, onExit, onPreload, opening, reduce]);

  const finish = useCallback(() => {
    if (!opening || done) return;
    setDone(true);
    window.setTimeout(() => onExit(), 40);
  }, [done, onExit, opening]);

  if (done) return null;

  return (
    <div className="lotus-gate lotus-gate--split" aria-hidden={opening}>
      <motion.div
        className="lotus-gate__panel lotus-gate__panel--left"
        initial={false}
        animate={{ x: opening ? "-100%" : "0%" }}
        transition={{ duration: reduce ? 0.01 : SPLIT_S, ease: SPLIT_EASE }}
        onAnimationComplete={() => {
          if (opening) finish();
        }}
      >
        <div className="lotus-gate__panel-view">
          <GateScene onOpen={open} disabled={opening} />
        </div>
      </motion.div>

      <motion.div
        className="lotus-gate__panel lotus-gate__panel--right"
        initial={false}
        animate={{ x: opening ? "100%" : "0%" }}
        transition={{ duration: reduce ? 0.01 : SPLIT_S, ease: SPLIT_EASE }}
      >
        <div className="lotus-gate__panel-view lotus-gate__panel-view--right">
          <GateScene onOpen={open} disabled={opening} />
        </div>
      </motion.div>

      <span className="lotus-gate__seam" aria-hidden="true" />
    </div>
  );
}
