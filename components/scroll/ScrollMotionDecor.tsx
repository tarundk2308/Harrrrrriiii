"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { RefObject } from "react";

const SPARKS = ["✦", "❀", "✦", "❀", "✦"] as const;

export function ScrollMotionDecor({ container }: { container: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.35 });

  const ringScale = useTransform(smooth, [0, 0.45, 1], [0.92, 1.08, 0.95]);
  const ringRotateA = useTransform(smooth, [0, 1], [0, 95]);
  const ringRotateB = useTransform(smooth, [0, 1], [0, -120]);
  const leftY = useTransform(smooth, [0, 1], [40, -160]);
  const rightY = useTransform(smooth, [0, 1], [-30, 150]);
  const sparkOpacity = useTransform(smooth, [0, 0.15, 0.5, 0.85, 1], [0.25, 0.75, 1, 0.75, 0.25]);
  const sparkY = useTransform(smooth, [0, 1], [30, -110]);
  const lineScale = useTransform(smooth, [0, 0.5, 1], [0.55, 1, 0.72]);
  const dotTop = useTransform(smooth, (v) => `${v * 100}%`);
  const petalX = useTransform(smooth, [0, 1], [-36, 36]);
  const bandRotate = useTransform(smooth, [0, 1], [-6, 10]);

  return (
    <div className="scroll-motion" aria-hidden="true">
      <motion.div className="scroll-motion__ring scroll-motion__ring--a" style={{ scale: ringScale, rotate: ringRotateA }} />
      <motion.div className="scroll-motion__ring scroll-motion__ring--b" style={{ rotate: ringRotateB }} />

      <motion.svg className="scroll-motion__arch scroll-motion__arch--left" style={{ y: leftY }} viewBox="0 0 80 200">
        <path d="M60 8 Q20 80 60 192" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="60" cy="8" r="4" fill="currentColor" />
      </motion.svg>

      <motion.svg className="scroll-motion__arch scroll-motion__arch--right" style={{ y: rightY }} viewBox="0 0 80 200">
        <path d="M20 8 Q60 80 20 192" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="20" cy="8" r="4" fill="currentColor" />
      </motion.svg>

      <motion.div className="scroll-motion__sparkles" style={{ opacity: sparkOpacity, y: sparkY }}>
        {SPARKS.map((mark, i) => (
          <span key={i} className="scroll-motion__spark" style={{ left: `${12 + i * 19}%` }}>
            {mark}
          </span>
        ))}
      </motion.div>

      <div className="scroll-motion__track">
        <motion.div className="scroll-motion__track-line" style={{ scaleX: lineScale }} />
        <motion.span className="scroll-motion__track-dot" style={{ top: dotTop }} />
      </div>

      <motion.div className="scroll-motion__petal-band" style={{ x: petalX, rotate: bandRotate }}>
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i} className="scroll-motion__band-petal" />
        ))}
      </motion.div>
    </div>
  );
}
