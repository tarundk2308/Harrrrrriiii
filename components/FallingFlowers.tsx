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

const RED_WHITE_LOTTES = [
  "linear-gradient(165deg, #fff5f5, #fecaca)",
  "linear-gradient(165deg, #ffffff, #fee2e2)",
  "linear-gradient(165deg, #fca5a5, #fef2f2)",
  "linear-gradient(165deg, #fff1f2, #fda4af)",
  "linear-gradient(165deg, #ffffff, #ffe4e6)",
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
    bg: RED_WHITE_LOTTES[id % RED_WHITE_LOTTES.length]!,
    spin: 140 + Math.random() * 140,
  }));
}

export function FallingFlowers({ intense }: { intense?: boolean }) {
  const flowers = useMemo(
    () => makeFlowers(intense ? 22 : 14, intense ? 0.55 : 0.45),
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
            boxShadow: "0 0 10px rgba(255, 255, 255, 0.65)",
          }}
        />
      ))}
    </div>
  );
}
