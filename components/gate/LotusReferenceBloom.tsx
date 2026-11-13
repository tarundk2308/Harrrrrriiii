"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const SRC = "/images/lotus-reference.png";

/** Zoom / flash begins here — rotation locks so zoom stays straight. */
const ZOOM_AT = 0.42;

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

function bloomEase(t: number) {
  if (t <= 0) return 0;
  return 1 - Math.pow(1 - t, 2.45);
}

function flashFromProgress(t: number) {
  if (t < ZOOM_AT) return 0;
  return smoothstep((t - ZOOM_AT) / (1 - ZOOM_AT));
}

function bloomRotation(t: number) {
  const b = bloomEase(t);
  return b * 12 + t * 26;
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
    const openPhase = smoothstep(Math.min(1, b / 0.68));
    const zoom = smoothstep(Math.max(0, (b - 0.44) / 0.56));
    const f = flashFromProgress(t);
    return 0.58 + openPhase * 0.48 + zoom * 0.82 + f * 0.44;
  });

  const y = useTransform(progress, (t) => {
    const b = bloomEase(t);
    const zoom = smoothstep(Math.max(0, (b - 0.44) / 0.56));
    const f = flashFromProgress(t);
    return (1 - b) * 5 - zoom * 18 - f * 22;
  });

  const rotate = useTransform([progress, idleSpin], ([t, spin]: number[]) => {
    if (t <= 0) return spin;
    const lockT = Math.min(t, ZOOM_AT);
    return bloomRotation(lockT);
  });

  const opacity = useTransform(progress, (t) => {
    const f = flashFromProgress(t);
    return Math.max(0, 1 - f * 0.98);
  });

  return (
    <motion.div className="lotus-ref" style={{ scale, y, rotate, opacity }}>
      <img src={SRC} alt="" className="lotus-ref__img" width={740} height={740} decoding="async" />
    </motion.div>
  );
}
