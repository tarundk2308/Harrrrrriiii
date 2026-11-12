"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeartReveal({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active || !reduce) return;
    const id = window.setTimeout(onComplete, 120);
    return () => window.clearTimeout(id);
  }, [active, reduce, onComplete]);

  if (!active) return null;
  if (reduce) return <div className="heart-reveal heart-reveal--reduce" aria-hidden="true" />;

  return (
    <motion.div className="heart-reveal" aria-hidden="true">
      <motion.div
        className="heart-reveal-flash"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.85, 0] }}
        transition={{ duration: 0.75, times: [0, 0.35, 1], ease }}
      />
      <motion.div
        className="heart-reveal-core"
        initial={{ scale: 0.35, opacity: 1 }}
        animate={{ scale: 22, opacity: [1, 1, 0] }}
        transition={{
          duration: 1.05,
          ease,
          times: [0, 0.55, 1],
        }}
        onAnimationComplete={onComplete}
      >
        <span className="heart-reveal-shape">♥</span>
      </motion.div>
    </motion.div>
  );
}
