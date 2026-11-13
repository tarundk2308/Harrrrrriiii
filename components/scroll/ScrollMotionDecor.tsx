"use client";

import { T } from "@/lib/motionSpeed";
import { motion, useScroll, useSpring, useTime, useTransform } from "framer-motion";
import type { RefObject } from "react";

const SPARK_COUNT = 9;

export function ScrollMotionDecor({ container }: { container: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container });
  const smooth = useSpring(scrollYProgress, { stiffness: 68, damping: 22, mass: 0.38 });
  const time = useTime();

  const ringScale = useTransform(smooth, [0, 0.45, 1], [0.94, 1.1, 0.97]);
  const ringRotateA = useTransform([smooth, time], ([s, t]) => (s as number) * 110 + Math.sin((t as number) / T(9000)) * 14);
  const ringRotateB = useTransform([smooth, time], ([s, t]) => (s as number) * -135 + Math.cos((t as number) / T(11000)) * -12);
  const leftY = useTransform([smooth, time], ([s, t]) => (s as number) * -175 + 48 + Math.sin((t as number) / T(5200)) * 22);
  const rightY = useTransform([smooth, time], ([s, t]) => (s as number) * 165 - 36 + Math.cos((t as number) / T(4800)) * 20);
  const leftX = useTransform([smooth, time], ([s, t]) => (s as number) * 18 + Math.sin((t as number) / T(6100)) * 12);
  const rightX = useTransform([smooth, time], ([s, t]) => -(s as number) * 16 + Math.cos((t as number) / T(5800)) * 10);
  const sparkOpacity = useTransform(smooth, [0, 0.15, 0.5, 0.85, 1], [0.35, 0.82, 1, 0.82, 0.38]);
  const sparkY = useTransform([smooth, time], ([s, t]) => (s as number) * -125 + 36 + Math.sin((t as number) / T(4400)) * 14);
  const sparkX = useTransform([smooth, time], ([s, t]) => (s as number) * 14 - 8 + Math.cos((t as number) / T(5000)) * 10);
  const lineScale = useTransform(smooth, [0, 0.5, 1], [0.58, 1, 0.76]);
  const dotTop = useTransform(smooth, (v) => `${v * 100}%`);
  const petalX = useTransform([smooth, time], ([s, t]) => (s as number) * 42 - 42 + Math.sin((t as number) / T(6500)) * 16);
  const bandRotate = useTransform([smooth, time], ([s, t]) => (s as number) * 20 - 8 + Math.sin((t as number) / T(7200)) * 6);
  const haloOpacity = useTransform(smooth, [0, 0.35, 0.7, 1], [0.55, 0.9, 0.7, 0.5]);
  const haloScale = useTransform([smooth, time], ([s, t]) => 0.88 + (s as number) * 0.18 + Math.sin((t as number) / T(6000)) * 0.04);
  const haloY = useTransform([smooth, time], ([s, t]) => (s as number) * -55 + 30 + Math.sin((t as number) / T(5000)) * 16);
  const ringPulse = useTransform(time, (t) => 1 + Math.sin(t / T(4200)) * 0.05);
  const ringScaleA = useTransform([ringScale, ringPulse], ([a, b]) => (a as number) * (b as number));
  const haloSoftOpacity = useTransform(haloOpacity, (v) => (v as number) * 0.72);
  const haloSoftY = useTransform([smooth, time], ([s, t]) => (s as number) * 40 - 20 + Math.cos((t as number) / T(5600)) * 18);

  return (
    <div className="scroll-motion" aria-hidden="true">
      <motion.div
        className="scroll-motion__halo"
        style={{ opacity: haloOpacity, scale: haloScale, y: haloY }}
      />
      <motion.div
        className="scroll-motion__halo scroll-motion__halo--soft"
        style={{ opacity: haloSoftOpacity, scale: haloScale, y: haloSoftY }}
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
        {Array.from({ length: 11 }, (_, i) => (
          <span key={i} className="scroll-motion__band-petal" />
        ))}
      </motion.div>
      <motion.div
        className="scroll-motion__corner scroll-motion__corner--tl"
        style={{ rotate: ringRotateA, scale: ringScaleA }}
      />
      <motion.div
        className="scroll-motion__corner scroll-motion__corner--br"
        style={{ rotate: ringRotateB, scale: ringScaleA }}
      />
    </div>
  );
}
