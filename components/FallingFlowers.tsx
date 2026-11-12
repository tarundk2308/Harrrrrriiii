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
  hue: number;
  spin: number;
};

function makeFlowers(count: number): Flower[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: `${4 + Math.random() * 92}%`,
    delay: `${-(Math.random() * 28).toFixed(1)}s`,
    duration: `${14 + Math.random() * 16}s`,
    size: 7 + Math.random() * 12,
    drift: `${-40 + Math.random() * 80}px`,
    opacity: 0.12 + Math.random() * 0.18,
    hue: Math.random() > 0.5 ? 38 : 350,
    spin: 160 + Math.random() * 120,
  }));
}

export function FallingFlowers({ active }: { active: boolean }) {
  const flowers = useMemo(() => makeFlowers(36), []);

  if (!active) return null;

  return (
    <div className="flowers" aria-hidden="true">
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
            background: `linear-gradient(165deg, hsl(${f.hue} 72% 94%), hsl(${f.hue} 42% 72%))`,
          }}
        />
      ))}
    </div>
  );
}
