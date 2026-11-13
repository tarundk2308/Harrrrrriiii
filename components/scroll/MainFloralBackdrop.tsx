"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import type { RefObject } from "react";

export function MainFloralBackdrop({ container }: { container: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container });
  const smooth = useSpring(scrollYProgress, { stiffness: 65, damping: 22, mass: 0.38 });

  const washScale = useTransform(smooth, [0, 0.42, 1], [1, 1.14, 0.98]);
  const washRotate = useTransform(smooth, [0, 1], [0, 9]);

  const blobAy = useTransform(smooth, [0, 0.55, 1], ["0%", "16%", "-6%"]);
  const blobAx = useTransform(smooth, [0, 1], ["0%", "14%"]);
  const blobARotate = useTransform(smooth, [0, 1], [0, 24]);

  const blobBy = useTransform(smooth, [0, 0.45, 1], ["8%", "-14%", "4%"]);
  const blobBx = useTransform(smooth, [0, 1], ["0%", "-16%"]);
  const blobBRotate = useTransform(smooth, [0, 1], [0, -18]);

  const blobCy = useTransform(smooth, [0, 1], ["-6%", "22%"]);
  const blobCx = useTransform(smooth, [0, 0.5, 1], ["0%", "8%", "-10%"]);

  return (
    <div className="main-floral" aria-hidden="true">
      <motion.div
        className="main-floral__wash"
        style={{ scale: washScale, rotate: washRotate }}
      />
      <motion.div
        className="main-floral__blob main-floral__blob--a"
        style={{ y: blobAy, x: blobAx, rotate: blobARotate }}
      />
      <motion.div
        className="main-floral__blob main-floral__blob--b"
        style={{ y: blobBy, x: blobBx, rotate: blobBRotate }}
      />
      <motion.div
        className="main-floral__blob main-floral__blob--c"
        style={{ y: blobCy, x: blobCx, scale: washScale }}
      />
    </div>
  );
}
