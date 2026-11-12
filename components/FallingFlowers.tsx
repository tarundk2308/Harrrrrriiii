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
  "linear-gradient(165deg, #fce7f3, #f9a8d4)",
  "linear-gradient(165deg, #ffedd5, #fecdd3)",
  "linear-gradient(165deg, #fce7f3, #fbcfe8)",
  "linear-gradient(165deg, #fff1f2, #fda4af)",
];

function makeFlowers(count: number, opacityMul: number): Flower[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${2 + Math.random() * 96}%`,
    delay: `${-(Math.random() * 32).toFixed(1)}s`,
    duration: `${10 + Math.random() * 16}s`,
    size: 10 + Math.random() * 16,
    drift: `${-50 + Math.random() * 100}px`,
    opacity: (0.08 + Math.random() * 0.12) * opacityMul,
    bg: PASTEL_LOTTES[id % PASTEL_LOTTES.length]!,
    spin: 120 + Math.random() * 140,
  }));
}

export function FallingFlowers({ intense }: { intense?: boolean }) {
  const flowers = useMemo(
    () => makeFlowers(intense ? 50 : 36, intense ? 0.9 : 0.75),
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
            boxShadow: "0 0 14px rgba(255, 255, 255, 0.55)",
          }}
        />
      ))}
    </div>
  );
}
