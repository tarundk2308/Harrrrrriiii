"use client";

import type { FlowerPlace } from "@/lib/pressedFlowers";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { RefObject } from "react";

const ZOOM_AT = 0.42;

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

function zoomPhase(p: number) {
  if (p < ZOOM_AT) return 0;
  return smoothstep((p - ZOOM_AT) / (1 - ZOOM_AT));
}

function FlowerSprite({
  place,
  progress,
  scrollY,
}: {
  place: FlowerPlace;
  progress: MotionValue<number>;
  scrollY: MotionValue<number>;
}) {
  const spread = useTransform(progress, (p) => 1 + zoomPhase(p) * (0.28 + place.depth * 0.5));
  const zPx = useTransform(progress, (p) => zoomPhase(p) * (60 + place.depth * 280));

  const left = useTransform(progress, (p) => {
    const z = zoomPhase(p);
    const dx = (place.x - 48) * z * 0.35;
    return `${place.x + dx}%`;
  });

  const top = useTransform([progress, scrollY], ([p, s]) => {
    const z = zoomPhase(p as number);
    const dy = (place.y - 48) * z * 0.28;
    const parallax = (s as number) * (8 + place.depth * 14);
    return `${place.y + dy - parallax}%`;
  });

  const sway = useTransform(scrollY, [0, 1], [place.rot, place.rot + place.float * 0.4]);

  return (
    <motion.div
      className="pressed-flower-wrap"
      style={{
        left,
        top,
        width: place.size,
        opacity: place.opacity,
        zIndex: place.layer,
        scale: spread,
        rotate: sway,
        translateZ: zPx,
      }}
    >
      <motion.img
        src={place.src}
        alt=""
        className="pressed-flower"
        draggable={false}
        decoding="async"
        animate={{ y: [0, -place.float, 0] }}
        transition={{
          duration: 5.2 + place.delay * 0.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: place.delay,
        }}
      />
    </motion.div>
  );
}

export function PressedFlowerField({
  flowers,
  progress,
  container,
  className = "",
}: {
  flowers: FlowerPlace[];
  progress?: MotionValue<number>;
  container?: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const fallback = useMotionValue(0);
  const prog = progress ?? fallback;

  const { scrollYProgress } = useScroll({ container });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.4 });

  return (
    <div className={`pressed-flower-layer ${className}`.trim()} aria-hidden="true">
      {flowers.map((f, i) => (
        <FlowerSprite key={`${f.id}-${i}`} place={f} progress={prog} scrollY={smoothScroll} />
      ))}
    </div>
  );
}
