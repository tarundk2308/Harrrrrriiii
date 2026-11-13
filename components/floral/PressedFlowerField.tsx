"use client";

import type { FlowerPlace } from "@/lib/pressedFlowers";
import { T } from "@/lib/motionSpeed";
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

  const spread = useTransform([progress, time], ([p, t]) => {
    const zoom = 1 + zoomPhase(p as number) * (0.22 + place.depth * 0.4);
    const breathe = ambient ? 1 + Math.sin((t as number) / T(4500) + place.delay) * 0.04 : 1;
    return zoom * breathe;
  });

  const driftX = useTransform([progress, scrollY, time], ([p, s, t]) => {
    const z = zoomPhase(p as number);
    const scrollDrift = ((place.x - 48) * z * 2.4) / 1;
    const parallax = ambient ? ((s as number) - 0.5) * (18 + place.depth * 24) : 0;
    const wave = ambient ? Math.sin((t as number) / T(3600) + place.delay * 2) * (12 + place.depth * 6) : 0;
    return scrollDrift + parallax + wave;
  });

  const driftY = useTransform([progress, scrollY, time], ([p, s, t]) => {
    const z = zoomPhase(p as number);
    const dy = ((place.y - 48) * z * 2.0) / 1;
    const parallax = ((s as number) * (22 + place.depth * 38)) / 1;
    const wave = ambient ? Math.cos((t as number) / T(4200) + place.delay) * (10 + place.depth * 7) : 0;
    return dy - parallax + wave;
  });

  const sway = useTransform([scrollY, time], ([s, t]) => {
    const scrollSway = (s as number) * place.float * 0.5;
    const idle = ambient ? Math.sin((t as number) / T(3200) + place.delay) * 4 : 0;
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
        className={ambient ? "pressed-flower pressed-flower--ambient" : "pressed-flower"}
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
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 64, damping: 22, mass: 0.38 });

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
