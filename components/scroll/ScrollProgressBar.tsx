"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { RefObject } from "react";

export function ScrollProgressBar({ container }: { container: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  const width = useTransform(smooth, (v) => `${Math.min(100, v * 100)}%`);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.div className="scroll-progress__fill" style={{ width }} />
    </div>
  );
}
