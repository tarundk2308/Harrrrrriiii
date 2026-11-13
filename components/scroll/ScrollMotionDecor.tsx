"use client";

import { motion, useScroll, useSpring, useTime, useTransform } from "framer-motion";
import type { RefObject } from "react";

const SPARK_COUNT = 5;

export function ScrollMotionDecor({ container }: { container: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container });
  const smooth = useSpring(scrollYProgress, { stiffness: 72, damping: 24, mass: 0.38 });
  const time = useTime();

  const ringScale = useTransform(smooth, [0, 0.45, 1], [0.94, 1.1, 0.97]);
  const ringRotateA = useTransform(smooth, [0, 1], [0, 110]);
  const ringRotateB = useTransform(smooth, [0, 1], [0, -135]);
  const leftY = useTransform(smooth, [0, 1], [48, -175]);
  const rightY = useTransform(smooth, [0, 1], [-36, 165]);
  const leftX = useTransform(smooth, [0, 0.5, 1], [0, 18, -6]);
  const rightX = useTransform(smooth, [0, 0.5, 1], [0, -16, 8]);
  const sparkOpacity = useTransform(smooth, [0, 0.15, 0.5, 0.85, 1], [0.35, 0.82, 1, 0.82, 0.38]);
  const sparkY = useTransform(smooth, [0, 1], [36, -125]);
  const sparkX = useTransform(smooth, [0, 1], [-8, 14]);
  const lineScale = useTransform(smooth, [0, 0.5, 1], [0.58, 1, 0.76]);
  const dotTop = useTransform(smooth, (v) => `${v * 100}%`);
  const petalX = useTransform(smooth, [0, 1], [-42, 42]);
  const bandRotate = useTransform(smooth, [0, 1], [-8, 12]);
  const haloOpacity = useTransform(smooth, [0, 0.35, 0.7, 1], [0.55, 0.9, 0.7, 0.5]);
  const haloScale = useTransform(smooth, [0, 1], [0.88, 1.06]);
  const haloY = useTransform([smooth, time], ([s, t]) => (s as number) * -55 + 30 + Math.sin((t as number) / 5000) * 10);
  const ringPulse = useTransform(time, (t) => 1 + Math.sin(t / 4200) * 0.03);
  const ringScaleA = useTransform([ringScale, ringPulse], ([a, b]) => (a as number) * (b as number));

  return (
    <div className="scroll-motion" aria-hidden="true">
      <motion.div
        className="scroll-motion__halo"
        style={{ opacity: haloOpacity, scale: haloScale, y: haloY }}
      />
      <motion.div
        className="scroll-motion__ring scroll-motion__ring--a"
        style={{ scale: ringScaleA, rotate: ringRotateA }}
      />
      <motion.div
        className="scroll-motion__ring scroll-motion__ring--b"
        style={{ scale: ringScaleA, rotate: ringRotateB }}
      />

      <motion.svg
        className="scroll-motion__arch scroll-motion__arch--left"
        style={{ y: leftY, x: leftX }}
        viewBox="0 0 80 200"
      >
        <path d="M60 8 Q20 80 60 192" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="60" cy="8" r="4" fill="currentColor" />
      </motion.svg>

      <motion.svg
        className="scroll-motion__arch scroll-motion__arch--right"
        style={{ y: rightY, x: rightX }}
        viewBox="0 0 80 200"
      >
        <path d="M20 8 Q60 80 20 192" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="20" cy="8" r="4" fill="currentColor" />
      </motion.svg>

      <motion.div className="scroll-motion__sparkles" style={{ opacity: sparkOpacity, y: sparkY, x: sparkX }}>
        {Array.from({ length: SPARK_COUNT }, (_, i) => (
          <span key={i} className="scroll-motion__spark scroll-motion__dot" style={{ left: `${12 + i * 19}%` }} />
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
