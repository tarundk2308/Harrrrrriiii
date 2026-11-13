"use client";

import { A, T } from "@/lib/motionSpeed";
import { motion, useScroll, useSpring, useTime, useTransform } from "framer-motion";
import type { RefObject } from "react";

/** Extra moving veils & arcs on the main scroll only. */
export function AnimatedBackdropOrnaments({ container }: { container: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container });
  const smooth = useSpring(scrollYProgress, { stiffness: 62, damping: 22, mass: 0.4 });
  const time = useTime();

  const bandY = useTransform([smooth, time], ([s, t]) => (s as number) * -40 + Math.sin((t as number) / T(5400)) * A(18));
  const bandX = useTransform(time, (t) => Math.cos(t / T(6200)) * A(22));
  const arcLeft = useTransform([smooth, time], ([s, t]) => (s as number) * 28 + Math.sin((t as number) / T(4800)) * A(14));
  const arcRight = useTransform([smooth, time], ([s, t]) => -(s as number) * 24 + Math.cos((t as number) / T(5100)) * A(12));
  const washRotate = useTransform([smooth, time], ([s, t]) => (s as number) * 8 + Math.sin((t as number) / T(8000)) * A(5));
  const glowAx = useTransform(time, (t) => Math.sin(t / T(4500)) * A(30));
  const glowAy = useTransform([smooth, time], ([s, t]) => (s as number) * 35 + Math.cos((t as number) / T(5200)) * A(20));
  const glowBx = useTransform(time, (t) => Math.cos(t / T(5000)) * A(-26));
  const glowBy = useTransform([smooth, time], ([s, t]) => -(s as number) * 30 + Math.sin((t as number) / T(4700)) * A(18));

  return (
    <div className="backdrop-ornaments-anim" aria-hidden="true">
      <motion.div className="backdrop-ornaments-anim__band" style={{ y: bandY, x: bandX, rotate: washRotate }} />
      <motion.svg
        className="backdrop-ornaments-anim__arc backdrop-ornaments-anim__arc--left"
        style={{ y: arcLeft }}
        viewBox="0 0 60 320"
      >
        <path d="M48 16 Q8 160 48 304" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.85" />
        <path d="M38 40 Q18 160 38 280" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.45" />
      </motion.svg>
      <motion.svg
        className="backdrop-ornaments-anim__arc backdrop-ornaments-anim__arc--right"
        style={{ y: arcRight }}
        viewBox="0 0 60 320"
      >
        <path d="M12 16 Q52 160 12 304" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.85" />
        <path d="M22 40 Q42 160 22 280" fill="none" stroke="currentColor" strokeWidth="0.65" opacity="0.45" />
      </motion.svg>
      <motion.div
        className="backdrop-ornaments-anim__glow backdrop-ornaments-anim__glow--a"
        style={{ x: glowAx, y: glowAy }}
      />
      <motion.div
        className="backdrop-ornaments-anim__glow backdrop-ornaments-anim__glow--b"
        style={{ x: glowBx, y: glowBy }}
      />
    </div>
  );
}
