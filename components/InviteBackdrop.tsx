"use client";

import { motion, useReducedMotion } from "framer-motion";

export function InviteBackdrop({ lush }: { lush?: boolean }) {
  const reduce = useReducedMotion();

  return (
    <div className={`invite-backdrop ${lush ? "invite-backdrop--lush" : ""}`} aria-hidden="true">
      <svg className="backdrop-arch backdrop-arch--left" viewBox="0 0 120 200" fill="none">
        <motion.path
          d="M10 200 Q60 80 10 20"
          stroke="currentColor"
          strokeWidth="1.2"
          initial={false}
          animate={reduce ? undefined : { pathLength: [0.6, 1, 0.6], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="28"
          cy="48"
          r="4"
          fill="currentColor"
          animate={reduce ? undefined : { scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </svg>

      <svg className="backdrop-arch backdrop-arch--right" viewBox="0 0 120 200" fill="none">
        <motion.path
          d="M110 200 Q60 80 110 20"
          stroke="currentColor"
          strokeWidth="1.2"
          animate={reduce ? undefined : { pathLength: [0.5, 1, 0.5], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>

      <motion.div
        className="backdrop-orb backdrop-orb--a"
        animate={reduce ? undefined : { x: [0, 18, 0], y: [0, -12, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="backdrop-orb backdrop-orb--b"
        animate={reduce ? undefined : { x: [0, -14, 0], y: [0, 10, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="backdrop-orb backdrop-orb--c"
        animate={reduce ? undefined : { opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {!reduce ? (
        <>
          {Array.from({ length: lush ? 16 : 10 }).map((_, i) => (
            <motion.span
              key={i}
              className="backdrop-sparkle"
              style={{
                left: `${8 + (i * 6.2) % 88}%`,
                top: `${12 + (i * 17) % 78}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.4, 1, 0.4],
                rotate: [0, 180],
              }}
              transition={{
                duration: 2.4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.22,
                ease: "easeInOut",
              }}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
