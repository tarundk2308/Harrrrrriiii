"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const COUNT = 18;

export function FallingFlowers() {
  const reduce = useReducedMotion();
  const petals = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 7) % 100}%`,
        delay: (i % 7) * 0.45,
        duration: 9 + (i % 5) * 1.4,
        size: 0.75 + (i % 4) * 0.2,
        drift: i % 2 ? 22 : -18,
      })),
    [],
  );

  if (reduce) return null;

  return (
    <div className="falling-flowers" aria-hidden="true">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="falling-flowers__petal"
          style={{ left: p.left, scale: p.size }}
          initial={{ y: "-12vh", x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: ["-12vh", "112vh"],
            x: [0, p.drift, -p.drift * 0.6, p.drift * 0.4],
            rotate: [0, 140, 280, 420],
            opacity: [0, 0.55, 0.45, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
