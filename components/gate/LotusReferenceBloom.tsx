"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

const SRC = "/images/lotus-reference.png";

const OPEN_END = 0.36;
const ZOOM_END = 0.62;

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

export function LotusReferenceBloom({
  progress,
  idleSpin,
}: {
  progress: MotionValue<number>;
  idleSpin: MotionValue<number>;
}) {
  const scale = useTransform(progress, (t) => {
    if (t <= OPEN_END) {
      const u = t / OPEN_END;
      const eased = 1 - Math.pow(1 - u, 2.1);
      return 0.6 + eased * 0.32;
    }
    const z = smoothstep((t - OPEN_END) / (1 - OPEN_END));
    return 0.92 + z * 6.25;
  });

  const y = useTransform(progress, (t) => {
    if (t <= OPEN_END) return (1 - t / OPEN_END) * 3;
    return -smoothstep((t - OPEN_END) / (1 - OPEN_END)) * 6;
  });

  const rotate = useTransform([progress, idleSpin], ([t, spin]: number[]) => {
    if (t <= 0) return spin;
    if (t >= OPEN_END) return 0;
    return spin * (1 - t / OPEN_END) * 0.35;
  });

  const opacity = useTransform(progress, (t) => {
    if (t < ZOOM_END) return 1;
    return Math.max(0, 1 - smoothstep((t - ZOOM_END) / (1 - ZOOM_END)));
  });

  return (
    <motion.div className="lotus-ref lotus-ref--zoom" style={{ scale, y, rotate, opacity }}>
      <img src={SRC} alt="" className="lotus-ref__img" width={740} height={740} decoding="async" />
    </motion.div>
  );
}
