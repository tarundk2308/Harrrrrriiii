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

const PASTEL_PETALS = [
  "linear-gradient(165deg, #fce7f3, #f9a8d4)",
  "linear-gradient(165deg, #ede9fe, #c4b5fd)",
  "linear-gradient(165deg, #ffedd5, #fdba74)",
  "linear-gradient(165deg, #e0f2fe, #bae6fd)",
  "linear-gradient(165deg, #fef3c7, #fde68a)",
  "linear-gradient(165deg, #ffe4e6, #fda4af)",
];

function makeFlowers(count: number, opacityMul: number): Flower[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${2 + Math.random() * 96}%`,
    delay: `${-(Math.random() * 32).toFixed(1)}s`,
    duration: `${10 + Math.random() * 16}s`,
    size: 10 + Math.random() * 18,
    drift: `${-60 + Math.random() * 120}px`,
    opacity: (0.1 + Math.random() * 0.14) * opacityMul,
    bg: PASTEL_PETALS[id % PASTEL_PETALS.length]!,
    spin: 120 + Math.random() * 160,
  }));
}

export function FallingFlowers({ intense }: { intense?: boolean }) {
  const flowers = useMemo(
    () => makeFlowers(intense ? 56 : 38, intense ? 1 : 0.85),
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
            boxShadow: "0 0 16px rgba(255, 255, 255, 0.55)",
          }}
        />
      ))}
    </div>
  );
}
