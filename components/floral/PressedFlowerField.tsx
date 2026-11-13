"use client";

import type { FlowerPlace } from "@/lib/pressedFlowers";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTime,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { type RefObject, useEffect } from "react";

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
  ambient,
}: {
  place: FlowerPlace;
  progress: MotionValue<number>;
  scrollY: MotionValue<number>;
  ambient: boolean;
}) {
  const time = useTime();

  const spread = useTransform(progress, (p) => 1 + zoomPhase(p) * (0.22 + place.depth * 0.4));
  const driftX = useTransform([progress, time], ([p, t]) => {
    const z = zoomPhase(p as number);
    const scrollDrift = ((place.x - 48) * z * 2.4) / 1;
    const wave = ambient ? Math.sin((t as number) / 4200 + place.delay * 2) * (6 + place.depth * 4) : 0;
    return scrollDrift + wave;
  });
  const driftY = useTransform([progress, scrollY, time], ([p, s, t]) => {
    const z = zoomPhase(p as number);
    const dy = ((place.y - 48) * z * 2.0) / 1;
    const parallax = ((s as number) * (12 + place.depth * 28)) / 1;
    const wave = ambient ? Math.cos((t as number) / 5000 + place.delay) * (5 + place.depth * 5) : 0;
    return dy - parallax + wave;
  });
  const sway = useTransform([scrollY, time], ([s, t]) => {
    const scrollSway = (s as number) * place.float * 0.35;
    const idle = ambient ? Math.sin((t as number) / 3800 + place.delay) * 2.5 : 0;
    return place.rot + scrollSway + idle;
  });
  const zPx = useTransform(progress, (p) => zoomPhase(p) * (40 + place.depth * 220));

  return (
    <motion.div
      className="pressed-flower-wrap"
      style={{
        left: `${place.x}%`,
        top: `${place.y}%`,
        width: place.size,
        opacity: place.opacity,
        zIndex: place.layer,
        x: driftX,
        y: driftY,
        scale: spread,
        rotate: sway,
        translateZ: zPx,
      }}
    >
      <img
        src={place.src}
        alt=""
        className="pressed-flower"
        width={place.naturalW}
        height={place.naturalH}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </motion.div>
  );
}

export function PressedFlowerField({
  flowers,
  progress,
  container,
  className = "",
  preload,
  ambient = false,
}: {
  flowers: FlowerPlace[];
  progress?: MotionValue<number>;
  container?: RefObject<HTMLElement | null>;
  className?: string;
  preload?: boolean;
  ambient?: boolean;
}) {
  const fallback = useMotionValue(0);
  const prog = progress ?? fallback;

  const { scrollYProgress } = useScroll({ container });
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 70, damping: 24, mass: 0.4 });

  useEffect(() => {
    if (!preload) return;
    flowers.forEach((f) => {
      const img = new Image();
      img.src = f.src;
    });
  }, [flowers, preload]);

  return (
    <div className={`pressed-flower-layer ${className}`.trim()} aria-hidden="true">
      {flowers.map((f, i) => (
        <FlowerSprite
          key={`${f.slotId}-${i}`}
          place={f}
          progress={prog}
          scrollY={smoothScroll}
          ambient={ambient}
        />
      ))}
    </div>
  );
}
