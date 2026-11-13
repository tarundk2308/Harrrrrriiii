"use client";

import { PRESSED_FLOWER_IDS } from "@/lib/pressedFlowers";
import { T } from "@/lib/motionSpeed";
import { motion, useTime, useTransform } from "framer-motion";
import { useMemo } from "react";

type Accent = {
  src: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  rot: number;
  opacity: number;
  phase: number;
};

function pickAccents(seed: string): Accent[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  const pick = (n: number) => PRESSED_FLOWER_IDS[Math.abs(h + n * 997) % PRESSED_FLOWER_IDS.length];

  return [
    {
      src: `/images/flowers/${pick(0)}.png`,
      top: "8%",
      left: "-4%",
      width: "min(28vw, 5.5rem)",
      rot: -14,
      opacity: 0.22,
      phase: 0,
    },
    {
      src: `/images/flowers/${pick(1)}.png`,
      top: "12%",
      right: "-6%",
      width: "min(26vw, 5rem)",
      rot: 16,
      opacity: 0.2,
      phase: 1.2,
    },
    {
      src: `/images/flowers/${pick(2)}.png`,
      bottom: "10%",
      left: "2%",
      width: "min(24vw, 4.5rem)",
      rot: 8,
      opacity: 0.18,
      phase: 0.6,
    },
    {
      src: `/images/flowers/${pick(3)}.png`,
      bottom: "6%",
      right: "-2%",
      width: "min(30vw, 5.75rem)",
      rot: -10,
      opacity: 0.19,
      phase: 2,
    },
  ];
}

function AccentImg({ accent }: { accent: Accent }) {
  const time = useTime();
  const x = useTransform(time, (t) => Math.sin((t + accent.phase * 1000) / T(3800)) * 8);
  const y = useTransform(time, (t) => Math.cos((t + accent.phase * 1000) / T(4200)) * 7);

  return (
    <motion.img
      src={accent.src}
      alt=""
      className="frame-florals__img"
      width={160}
      height={160}
      loading="lazy"
      decoding="async"
      draggable={false}
      style={{
        top: accent.top,
        bottom: accent.bottom,
        left: accent.left,
        right: accent.right,
        width: accent.width,
        opacity: accent.opacity,
        rotate: accent.rot,
        x,
        y,
      }}
    />
  );
}

export function FrameFloralAccents({ seed }: { seed: string }) {
  const accents = useMemo(() => pickAccents(seed), [seed]);

  return (
    <div className="frame-florals" aria-hidden="true">
      {accents.map((a, i) => (
        <AccentImg key={`${seed}-${i}`} accent={a} />
      ))}
    </div>
  );
}
