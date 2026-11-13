"use client";

import { A, T } from "@/lib/motionSpeed";
import { motion, useScroll, useSpring, useTime, useTransform } from "framer-motion";
import type { RefObject } from "react";

export function MainFloralBackdrop({ container }: { container: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container });
  const smooth = useSpring(scrollYProgress, { stiffness: 58, damping: 20, mass: 0.42 });
  const time = useTime();

  const driftX = useTransform(time, (t) => Math.sin(t / T(3800)) * A(28));
  const driftY = useTransform(time, (t) => Math.cos(t / T(4200)) * A(24));

  const washScale = useTransform([smooth, time], ([s, t]) => {
    const breathe = 1 + Math.sin((t as number) / T(5500)) * A(0.045);
    const scroll = 1 + (s as number) * 0.12;
    return breathe * scroll;
  });
  const washRotate = useTransform(
    [smooth, time],
    ([s, t]) => (s as number) * 11 + Math.sin((t as number) / T(5200)) * A(6),
  );

  const blobAy = useTransform([smooth, time], ([s, t]) => {
    const scroll = (s as number) * 22;
    const wave = Math.sin((t as number) / T(3200)) * A(18);
    return `${scroll + wave}%`;
  });
  const blobAx = useTransform([smooth, time], ([s, t]) => {
    return `${(s as number) * 18 + Math.cos((t as number) / T(3600)) * A(14)}%`;
  });
  const blobARotate = useTransform([smooth, time], ([s, t]) => (s as number) * 28 + Math.sin((t as number) / T(6000)) * A(10));

  const blobBy = useTransform([smooth, time], ([s, t]) => {
    const base = 8 - (s as number) * 18;
    return `${base + Math.sin((t as number) / T(4100)) * A(16)}%`;
  });
  const blobBx = useTransform([smooth, time], ([s, t]) => {
    return `${-(s as number) * 20 + Math.cos((t as number) / T(3900)) * A(12)}%`;
  });
  const blobBRotate = useTransform([smooth, time], ([s, t]) => -(s as number) * 22 + Math.cos((t as number) / T(5800)) * A(8));

  const blobCy = useTransform([smooth, time], ([s, t]) => {
    return `${-6 + (s as number) * 26 + Math.sin((t as number) / T(4500)) * A(14)}%`;
  });
  const blobCx = useTransform([smooth, time], ([s, t]) => {
    return `${(s as number) * 11 - Math.sin((t as number) / T(4700)) * A(11)}%`;
  });

  const floatAx = useTransform(time, (t) => Math.sin(t / T(3000)) * A(36));
  const floatAy = useTransform(time, (t) => Math.cos(t / T(3400)) * A(28));
  const floatBx = useTransform(time, (t) => Math.cos(t / T(3600)) * A(-32));
  const floatBy = useTransform(time, (t) => Math.sin(t / T(3100)) * A(30));
  const floatCx = useTransform(time, (t) => Math.sin(t / T(4100)) * A(24));
  const floatCy = useTransform(time, (t) => Math.cos(t / T(3800)) * A(20));
  const floatDx = useTransform(time, (t) => Math.cos(t / T(3300)) * A(-28));
  const floatDy = useTransform(time, (t) => Math.sin(t / T(4600)) * A(22));

  const blobDy = useTransform([smooth, time], ([s, t]) => {
    return `${14 - (s as number) * 12 + Math.sin((t as number) / T(5000)) * A(12)}%`;
  });
  const blobDx = useTransform([smooth, time], ([s, t]) => {
    return `${78 + (s as number) * 8 + Math.cos((t as number) / T(4400)) * A(10)}%`;
  });
  const blobERotate = useTransform([smooth, time], ([s, t]) => (s as number) * -18 + Math.cos((t as number) / T(6400)) * A(9));
  const blobEy = useTransform([smooth, time], ([s, t]) => {
    return `${62 + (s as number) * 16 + Math.sin((t as number) / T(4300)) * A(14)}%`;
  });
  const blobEx = useTransform([smooth, time], ([s, t]) => {
    return `${-8 - (s as number) * 6 + Math.cos((t as number) / T(4900)) * A(12)}%`;
  });

  return (
    <div className="main-floral" aria-hidden="true">
      <motion.div
        className="main-floral__wash"
        style={{ scale: washScale, rotate: washRotate, x: driftX, y: driftY }}
      />
      <motion.div className="main-floral__float main-floral__float--a" style={{ x: floatAx, y: floatAy }} />
      <motion.div className="main-floral__float main-floral__float--b" style={{ x: floatBx, y: floatBy }} />
      <motion.div className="main-floral__float main-floral__float--c" style={{ x: floatCx, y: floatCy }} />
      <motion.div className="main-floral__float main-floral__float--d" style={{ x: floatDx, y: floatDy }} />
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
      <motion.div
        className="main-floral__blob main-floral__blob--d"
        style={{ y: blobDy, x: blobDx, rotate: blobERotate }}
      />
      <motion.div className="main-floral__blob main-floral__blob--e" style={{ y: blobEy, x: blobEx, rotate: blobERotate }} />
    </div>
  );
}
