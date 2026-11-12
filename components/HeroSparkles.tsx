"use client";

import { motion, useReducedMotion } from "framer-motion";

const SPARKS = [
  { mark: "✦", left: "8%", top: "12%", d: 4.2 },
  { mark: "❀", left: "88%", top: "18%", d: 5.1 },
  { mark: "♡", left: "14%", top: "78%", d: 4.8 },
  { mark: "✦", left: "82%", top: "72%", d: 3.9 },
  { mark: "❀", left: "50%", top: "6%", d: 5.5 },
] as const;

export function HeroSparkles() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div className="hero-sparkles" aria-hidden="true">
      {SPARKS.map(({ mark, left, top, d }, i) => (
        <motion.span
          key={i}
          className="hero-spark"
          style={{ left, top }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0.35, 0.95, 0.35],
            y: [0, -8, 0],
            scale: [0.92, 1.05, 0.92],
            rotate: [0, i % 2 ? 10 : -8, 0],
          }}
          transition={{ duration: d, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
        >
          {mark}
        </motion.span>
      ))}
    </div>
  );
}
