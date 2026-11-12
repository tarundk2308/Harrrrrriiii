"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CurtainGraphics() {
  const reduce = useReducedMotion();

  return (
  <motion.div
    className="curtain-graphic-layer"
    aria-hidden="true"
    animate={reduce ? undefined : { opacity: [0.65, 1, 0.65] }}
    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
  >
      <svg className="curtain-tassel curtain-tassel--left" viewBox="0 0 32 80" fill="none">
        <path d="M16 0 L16 52" stroke="url(#tGold)" strokeWidth="2" />
        <ellipse cx="16" cy="58" rx="7" ry="9" fill="url(#tGold)" />
        <path d="M10 66 Q16 74 22 66" stroke="#c9a66b" strokeWidth="1.2" fill="none" />
        <defs>
          <linearGradient id="tGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5e6c8" />
            <stop offset="100%" stopColor="#b8874a" />
          </linearGradient>
        </defs>
      </svg>
      <svg className="curtain-tassel curtain-tassel--right" viewBox="0 0 32 80" fill="none">
        <path d="M16 0 L16 52" stroke="url(#tGold2)" strokeWidth="2" />
        <ellipse cx="16" cy="58" rx="7" ry="9" fill="url(#tGold2)" />
        <path d="M10 66 Q16 74 22 66" stroke="#c9a66b" strokeWidth="1.2" fill="none" />
        <defs>
          <linearGradient id="tGold2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5e6c8" />
            <stop offset="100%" stopColor="#b8874a" />
          </linearGradient>
        </defs>
      </svg>
      {[
        { mark: "✦", left: "18%", top: "14%" },
        { mark: "❀", left: "46%", top: "10%" },
        { mark: "♡", left: "74%", top: "16%" },
        { mark: "✦", left: "28%", top: "52%" },
        { mark: "❀", left: "62%", top: "48%" },
        { mark: "✦", left: "12%", top: "78%" },
        { mark: "♡", left: "84%", top: "76%" },
      ].map(({ mark, left, top }, i) => (
        <motion.span
          key={i}
          className="curtain-spark"
          style={{ left, top }}
          animate={reduce ? undefined : { y: [0, -6, 0], opacity: [0.4, 1, 0.4], rotate: [0, 12, 0] }}
          transition={{ duration: 3 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.35 }}
        >
          {mark}
        </motion.span>
      ))}
    </motion.div>
  );
}
