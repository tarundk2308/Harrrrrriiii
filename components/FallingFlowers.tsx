"use client";

import { useMemo } from "react";

type Flower = {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  drift: string;
  sway: string;
  opacity: number;
  bg: string;
  spin: number;
};

const PASTEL_LOTTES = [
  "linear-gradient(165deg, #ffe4ec, #f9a8d4)",
  "linear-gradient(165deg, #ede9fe, #e9d5ff)",
  "linear-gradient(165deg, #ffedd5, #fecdd3)",
  "linear-gradient(165deg, #ecfdf5, #a7f3d0)",
  "linear-gradient(165deg, #fff1f2, #fda4af)",
  "linear-gradient(165deg, #fce7f3, #f0abfc)",
];

function makeFlowers(count: number, opacityMul: number): Flower[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${2 + Math.random() * 96}%`,
    delay: `${-(Math.random() * 40).toFixed(1)}s`,
    duration: `${7 + Math.random() * 10}s`,
    size: 10 + Math.random() * 16,
    drift: `${-70 + Math.random() * 140}px`,
    sway: `${-22 + Math.random() * 44}px`,
    opacity: (0.1 + Math.random() * 0.14) * opacityMul,
    bg: PASTEL_LOTTES[id % PASTEL_LOTTES.length]!,
    spin: 200 + Math.random() * 220,
  }));
}

export function FallingFlowers({ intense }: { intense?: boolean }) {
  const flowers = useMemo(
    () => makeFlowers(intense ? 28 : 16, intense ? 0.55 : 0.35),
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
            ["--sway" as string]: f.sway,
            ["--spin" as string]: `${f.spin}deg`,
            background: f.bg,
            boxShadow: "0 0 14px rgba(255, 255, 255, 0.55)",
          }}
        />
      ))}
    </div>
  );
}
