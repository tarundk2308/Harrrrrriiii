"use client";

import { motion, useReducedMotion } from "framer-motion";

export function InviteBackdrop({ lush }: { lush?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className={`pinterest-canvas ${lush ? "pinterest-canvas--lush" : ""}`} aria-hidden="true">
      <div className="pinterest-canvas-base" />
      <motion.div
        className="pinterest-blob pinterest-blob--rose"
        animate={reduce ? undefined : { x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pinterest-blob pinterest-blob--lilac"
        animate={reduce ? undefined : { x: [0, -20, 0], y: [0, 14, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.div
        className="pinterest-blob pinterest-blob--peach"
        animate={reduce ? undefined : { x: [0, 16, 0], y: [0, 10, 0], opacity: [0.45, 0.7, 0.45] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="pinterest-blob pinterest-blob--mint"
        animate={reduce ? undefined : { y: [0, -12, 0], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />

      {!reduce
        ? Array.from({ length: lush ? 14 : 9 }).map((_, i) => (
            <motion.span
              key={i}
              className="pinterest-dust"
              style={{
                left: `${6 + (i * 7.3) % 90}%`,
                top: `${10 + (i * 13) % 82}%`,
              }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1, 0.4] }}
              transition={{
                duration: 2.6 + (i % 4) * 0.5,
                repeat: Infinity,
                delay: i * 0.28,
                ease: "easeInOut",
              }}
            />
          ))
        : null}
    </div>
  );
}
