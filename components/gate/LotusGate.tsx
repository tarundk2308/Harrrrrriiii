"use client";

import { GateScene } from "@/components/gate/GateScene";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

const SPLIT_DURATION = 1.15;
const SPLIT_EASE = [0.32, 0.72, 0, 1] as const;

const panelTransition = (reduce: boolean) => ({
  x: {
    duration: reduce ? 0.01 : SPLIT_DURATION,
    ease: SPLIT_EASE,
  },
  opacity: {
    duration: reduce ? 0.01 : 0.55,
    delay: reduce ? 0 : 0.42,
    ease: [0.33, 1, 0.68, 1] as const,
  },
});

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
    window.setTimeout(() => onExit(), 80);
  }, [done, onExit, opening]);

  if (done) return null;

  return (
    <div className="lotus-gate lotus-gate--split" aria-hidden={opening}>
      <motion.div
        className="lotus-gate__panel lotus-gate__panel--left"
        initial={false}
        animate={{ x: opening ? "-100%" : "0%", opacity: opening ? 0 : 1 }}
        transition={panelTransition(!!reduce)}
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
        animate={{ x: opening ? "100%" : "0%", opacity: opening ? 0 : 1 }}
        transition={panelTransition(!!reduce)}
      >
        <div className="lotus-gate__panel-view lotus-gate__panel-view--right">
          <GateScene onOpen={open} disabled={opening} />
        </div>
      </motion.div>

      <motion.span
        className="lotus-gate__seam"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: opening ? 0 : 1, scaleY: opening ? 0.6 : 1 }}
        transition={{ duration: reduce ? 0.01 : 0.5, ease: "easeOut" }}
      />
    </div>
  );
}
