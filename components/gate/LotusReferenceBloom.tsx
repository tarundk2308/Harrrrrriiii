"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const SRC = "/images/lotus-reference.png";

const ZOOM_AT = 0.38;

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

function bloomEase(t: number) {
  if (t <= 0) return 0;
  return 1 - Math.pow(1 - t, 2.35);
}

function flashFromProgress(t: number) {
  if (t < ZOOM_AT) return 0;
  return smoothstep((t - ZOOM_AT) / (1 - ZOOM_AT));
}

function bloomRotation(t: number) {
  const b = bloomEase(t);
  return b * 12 + t * 22;
}

export function LotusReferenceBloom({
  progress,
  idleSpin,
}: {
  progress: MotionValue<number>;
  idleSpin: MotionValue<number>;
}) {
  const scale = useTransform(progress, (t) => {
    const b = bloomEase(t);
    const openPhase = smoothstep(Math.min(1, b / 0.65));
    const zoom = smoothstep(Math.max(0, (b - 0.38) / 0.62));
    const f = flashFromProgress(t);
    const mega = smoothstep(Math.max(0, (t - 0.5) / 0.5));
    return 0.58 + openPhase * 0.45 + zoom * 1.1 + f * 1.2 + mega * 16;
  });

  const y = useTransform(progress, (t) => {
    const b = bloomEase(t);
    const f = flashFromProgress(t);
    return (1 - b) * 4 - f * 8;
  });

  const rotate = useTransform([progress, idleSpin], ([t, spin]: number[]) => {
    if (t <= 0) return spin;
    const lockT = Math.min(t, ZOOM_AT);
    return bloomRotation(lockT);
  });

  const opacity = useTransform(progress, (t) => {
    const f = flashFromProgress(t);
    if (f < 0.72) return 1;
    return Math.max(0, 1 - smoothstep((f - 0.72) / 0.28) * 0.95);
  });

  return (
    <motion.div className="lotus-ref lotus-ref--zoom" style={{ scale, y, rotate, opacity }}>
      <img src={SRC} alt="" className="lotus-ref__img" width={740} height={740} decoding="async" />
    </motion.div>
  );
}
