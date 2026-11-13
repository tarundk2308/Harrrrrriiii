"use client";

import { motion, useScroll, useSpring, useTime, useTransform } from "framer-motion";
import type { RefObject } from "react";

export function MainFloralBackdrop({ container }: { container: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container });
  const smooth = useSpring(scrollYProgress, { stiffness: 65, damping: 22, mass: 0.38 });
  const time = useTime();

  const driftX = useTransform(time, (t) => Math.sin(t / 4500) * 14);
  const driftY = useTransform(time, (t) => Math.cos(t / 5200) * 12);

  const washScale = useTransform(smooth, [0, 0.42, 1], [1, 1.14, 0.98]);
  const washRotate = useTransform(
    [smooth, time],
    ([s, t]) => (s as number) * 9 + Math.sin((t as number) / 6000) * 3,
  );

  const blobAy = useTransform([smooth, time], ([s, t]) => {
    const scroll = (s as number) * 16;
    const wave = Math.sin((t as number) / 4000) * 10;
    return `${scroll + wave}%`;
  });
  const blobAx = useTransform([smooth, time], ([s, t]) => {
    return `${(s as number) * 14 + Math.cos((t as number) / 4800) * 8}%`;
  });
  const blobARotate = useTransform([smooth, time], ([s, t]) => (s as number) * 24 + Math.sin((t as number) / 7000) * 6);

  const blobBy = useTransform([smooth, time], ([s, t]) => {
    const base = 8 - (s as number) * 14;
    return `${base + Math.sin((t as number) / 5200) * 9}%`;
  });
  const blobBx = useTransform([smooth, time], ([s, t]) => {
    return `${-(s as number) * 16 + Math.cos((t as number) / 4400) * 7}%`;
  });
  const blobBRotate = useTransform([smooth, time], ([s, t]) => -(s as number) * 18 + Math.cos((t as number) / 6500) * 5);

  const blobCy = useTransform([smooth, time], ([s, t]) => {
    return `${-6 + (s as number) * 22 + Math.sin((t as number) / 5800) * 8}%`;
  });
  const blobCx = useTransform([smooth, time], ([s, t]) => {
    return `${(s as number) * 8 - Math.sin((t as number) / 5000) * 6}%`;
  });

  return (
    <div className="main-floral" aria-hidden="true">
      <motion.div
        className="main-floral__wash"
        style={{ scale: washScale, rotate: washRotate, x: driftX, y: driftY }}
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
