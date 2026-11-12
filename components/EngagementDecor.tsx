"use client";

import { motion, useReducedMotion } from "framer-motion";

function FloatingLotus({
  id,
  className,
  delay = 0,
}: {
  id: string;
  className: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      className={className}
      viewBox="0 0 80 80"
      aria-hidden="true"
      animate={
        reduce
          ? undefined
          : {
              y: [0, -10, 0],
              rotate: [0, 4, -3, 0],
              scale: [1, 1.06, 1],
            }
      }
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <ellipse cx="40" cy="48" rx="22" ry="14" fill={`url(#lotusPetal-${id})`} opacity="0.85" />
      <ellipse cx="28" cy="42" rx="14" ry="20" fill={`url(#lotusPetal-${id})`} opacity="0.7" transform="rotate(-25 28 42)" />
      <ellipse cx="52" cy="42" rx="14" ry="20" fill={`url(#lotusPetal-${id})`} opacity="0.7" transform="rotate(25 52 42)" />
      <ellipse cx="40" cy="32" rx="10" ry="16" fill={`url(#lotusPetalLight-${id})`} opacity="0.9" />
      <defs>
        <linearGradient id={`lotusPetal-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id={`lotusPetalLight-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="100%" stopColor="#fbcfe8" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

export function EngagementDecor() {
  const reduce = useReducedMotion();

  return (
    <div className="engagement-decor" aria-hidden="true">
      <FloatingLotus id="tl" className="engagement-decor-lotus engagement-decor-lotus--tl" delay={0} />
      <FloatingLotus id="tr" className="engagement-decor-lotus engagement-decor-lotus--tr" delay={1.2} />
      <FloatingLotus id="mid" className="engagement-decor-lotus engagement-decor-lotus--mid" delay={0.6} />

      <motion.div
        className="engagement-decor-arch engagement-decor-arch--left"
        animate={reduce ? undefined : { opacity: [0.35, 0.65, 0.35], x: [0, 4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="engagement-decor-arch engagement-decor-arch--right"
        animate={reduce ? undefined : { opacity: [0.3, 0.6, 0.3], x: [0, -4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {Array.from({ length: 8 }).map((_, i) => (
        <motion.span
          key={i}
          className="engagement-sparkle"
          style={{
            left: `${10 + i * 11}%`,
            top: `${8 + (i % 4) * 18}%`,
          }}
          animate={
            reduce
              ? undefined
              : { opacity: [0, 1, 0], scale: [0.5, 1.1, 0.5], rotate: [0, 90, 180] }
          }
          transition={{
            duration: 2.8 + (i % 3) * 0.4,
            repeat: Infinity,
            delay: i * 0.35,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
