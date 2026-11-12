"use client";

import { motion, useReducedMotion } from "framer-motion";

export function RingsMotif() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="rings-motif"
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, y: -12, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg viewBox="0 0 120 72" className="rings-motif-svg">
        <motion.ellipse
          cx="48"
          cy="40"
          rx="22"
          ry="20"
          fill="none"
          stroke="url(#ringGold)"
          strokeWidth="3"
          initial={false}
          animate={reduce ? undefined : { rotate: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.ellipse
          cx="72"
          cy="40"
          rx="22"
          ry="20"
          fill="none"
          stroke="url(#ringGold)"
          strokeWidth="3"
          initial={false}
          animate={reduce ? undefined : { rotate: [0, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
        <circle cx="72" cy="28" r="4" fill="#e8c4cf" stroke="url(#ringGold)" strokeWidth="1" />
        <motion.path
          d="M38 18 Q28 8 20 14"
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="1.2"
          animate={reduce ? undefined : { d: ["M38 18 Q28 8 20 14", "M38 18 Q26 6 18 12", "M38 18 Q28 8 20 14"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M82 18 Q92 8 100 14"
          fill="none"
          stroke="#c4b5fd"
          strokeWidth="1.2"
          animate={reduce ? undefined : { d: ["M82 18 Q92 8 100 14", "M82 18 Q94 6 102 12", "M82 18 Q92 8 100 14"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a574" />
            <stop offset="50%" stopColor="#f0d78c" />
            <stop offset="100%" stopColor="#c4935a" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
