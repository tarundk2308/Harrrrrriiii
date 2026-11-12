"use client";

import { useMemo } from "react";

type Flower = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  drift: string;
  opacity: number;
  bg: string;
  spin: number;
};

const PASTEL_LOTTES = [
  "linear-gradient(165deg, #fce7f3, #f5c6e0)",
  "linear-gradient(165deg, #ede9fe, #ddd6fe)",
  "linear-gradient(165deg, #ffedd5, #fed7aa)",
  "linear-gradient(165deg, #d1fae5, #a7f3d0)",
  "linear-gradient(165deg, #e0f2fe, #bae6fd)",
  "linear-gradient(165deg, #fef3c7, #fde68a)",
];

function makeFlowers(count: number, opacityMul: number): Flower[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${2 + Math.random() * 96}%`,
    delay: `${-(Math.random() * 32).toFixed(1)}s`,
    duration: `${12 + Math.random() * 18}s`,
    size: 8 + Math.random() * 14,
    drift: `${-50 + Math.random() * 100}px`,
    opacity: (0.06 + Math.random() * 0.09) * opacityMul,
    bg: PASTEL_LOTTES[id % PASTEL_LOTTES.length]!,
    spin: 140 + Math.random() * 140,
  }));
}

export function FallingFlowers({ intense }: { intense?: boolean }) {
  const flowers = useMemo(
    () => makeFlowers(intense ? 48 : 30, intense ? 0.75 : 0.65),
    [intense]
  );

  return (
    <div className={`flowers ${intense ? "flowers--lush" : "flowers--soft"}`} aria-hidden="true">
      {flowers.map((f) => (
        <span
          key={f.id}
          className="flower"
          style={{
            left: f.left,
            width: f.size,
            height: f.size * 1.45,
            animationDuration: f.duration,
            animationDelay: f.delay,
            opacity: f.opacity,
            ["--drift" as string]: f.drift,
            ["--spin" as string]: `${f.spin}deg`,
            background: f.bg,
            boxShadow: "0 0 14px rgba(255, 255, 255, 0.45)",
          }}
        />
      ))}
    </div>
  );
}
