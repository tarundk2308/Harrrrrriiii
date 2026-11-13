"use client";

import { motion } from "framer-motion";
import { type ReactNode, useMemo } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const PETAL_COUNT = 5;

function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  };
}

function framePetals(seed: string) {
  const rand = seededRandom(seed);
  const hues = [
    ["#f0c4d8", "#e4a8c0"],
    ["#f2d4e4", "#dfb0c8"],
    ["#e8c8dc", "#d8a0b8"],
    ["#f4dce8", "#e8b8cc"],
    ["#ecc8d8", "#dea0b4"],
  ] as const;

  return Array.from({ length: PETAL_COUNT }, (_, i) => {
    const top = 6 + rand() * 82;
    const left = 5 + rand() * 86;
    const hue = hues[Math.floor(rand() * hues.length)];
    return {
      id: i,
      top: `${top.toFixed(2)}%`,
      left: `${left.toFixed(2)}%`,
      rotate: -48 + rand() * 96,
      scale: 0.68 + rand() * 0.55,
      opacity: 0.32 + rand() * 0.22,
      background: `linear-gradient(160deg, ${hue[0]}, ${hue[1]})`,
    };
  });
}

export function ChapterGrandFrame({
  children,
  className = "",
  decorSeed = "frame",
}: {
  children: ReactNode;
  className?: string;
  decorSeed?: string;
}) {
  const petals = useMemo(() => framePetals(decorSeed), [decorSeed]);

  return (
    <motion.div
      className={`chapter__frame chapter__frame--grand ${className}`.trim()}
      initial={{ opacity: 0, y: 36, scale: 0.94, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: false, amount: 0.48, margin: "-5% 0px -5% 0px" }}
      transition={{ duration: 0.8, ease, type: "spring", stiffness: 90, damping: 18 }}
    >
      <svg className="chapter__arch" viewBox="0 0 280 40" aria-hidden="true">
        <path d="M8 32 Q140 4 272 32" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      {petals.map((p) => (
        <span
          key={p.id}
          className="chapter__petal"
          aria-hidden="true"
          style={{
            top: p.top,
            left: p.left,
            opacity: p.opacity,
            background: p.background,
            transform: `rotate(${p.rotate}deg) scale(${p.scale})`,
          }}
        />
      ))}
      {children}
    </motion.div>
  );
}
