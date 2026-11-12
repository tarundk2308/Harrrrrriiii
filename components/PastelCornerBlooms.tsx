"use client";

import { motion, useReducedMotion } from "framer-motion";

function Bloom({ className, delay }: { className: string; delay: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      animate={
        reduce
          ? undefined
          : { rotate: [0, 6, -5, 0], scale: [1, 1.05, 1], y: [0, -6, 0] }
      }
      transition={{ duration: 9 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <ellipse cx="50" cy="58" rx="28" ry="18" fill="url(#bloomA)" opacity="0.9" />
      <ellipse cx="34" cy="50" rx="18" ry="26" fill="url(#bloomB)" opacity="0.75" transform="rotate(-22 34 50)" />
      <ellipse cx="66" cy="50" rx="18" ry="26" fill="url(#bloomB)" opacity="0.75" transform="rotate(22 66 50)" />
      <ellipse cx="50" cy="38" rx="14" ry="22" fill="url(#bloomC)" opacity="0.95" />
      <defs>
        <linearGradient id="bloomA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe4ec" />
          <stop offset="100%" stopColor="#f9a8d4" />
        </linearGradient>
        <linearGradient id="bloomB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ede9fe" />
          <stop offset="100%" stopColor="#f0abfc" />
        </linearGradient>
        <linearGradient id="bloomC" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="100%" stopColor="#fecdd3" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}

export function PastelCornerBlooms() {
  return (
    <div className="corner-blooms" aria-hidden="true">
      <Bloom className="corner-bloom corner-bloom--tl" delay={0} />
      <Bloom className="corner-bloom corner-bloom--tr" delay={0.8} />
      <Bloom className="corner-bloom corner-bloom--bl" delay={1.2} />
      <Bloom className="corner-bloom corner-bloom--br" delay={0.4} />
    </div>
  );
}
