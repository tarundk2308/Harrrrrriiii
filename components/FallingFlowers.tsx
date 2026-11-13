"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";
import { useMemo } from "react";

const COUNT = 18;

export function FallingFlowers({
  container,
}: {
  container: RefObject<HTMLElement | null>;
}) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ container });
  const layerY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const layerX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 12, -8]);

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
    <motion.div className="falling-flowers" style={{ y: layerY, x: layerX }} aria-hidden="true">
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
            opacity: [0, 0.62, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </motion.div>
  );
}
