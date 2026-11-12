"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CurtainDecor() {
  const reduce = useReducedMotion();

  return (
    <div className="curtain-decor" aria-hidden="true">
      <svg className="curtain-garland curtain-garland--top" viewBox="0 0 400 48" preserveAspectRatio="none">
        <path
          d="M0 28 Q50 4 100 26 T200 24 T300 26 T400 22"
          stroke="url(#garlandGold)"
          strokeWidth="2"
          fill="none"
        />
        {Array.from({ length: 11 }).map((_, i) => (
          <circle
            key={i}
            cx={20 + i * 36}
            cy={22 + (i % 2) * 8}
            r={i % 3 === 0 ? 5 : 3.5}
            fill={i % 2 ? "rgba(255,180,140,0.85)" : "rgba(240,217,160,0.9)"}
          />
        ))}
        <defs>
          <linearGradient id="garlandGold" x1="0" y1="0" x2="400" y2="0">
            <stop offset="0%" stopColor="rgba(180,120,50,0.4)" />
            <stop offset="50%" stopColor="rgba(240,217,160,0.95)" />
            <stop offset="100%" stopColor="rgba(180,120,50,0.4)" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="curtain-decor-arch curtain-decor-arch--l" viewBox="0 0 80 120" fill="none">
        <path d="M8 115 Q40 20 8 8" stroke="rgba(240,217,160,0.55)" strokeWidth="1.2" />
        <path d="M14 100 Q36 35 14 18" stroke="rgba(255,200,150,0.35)" strokeWidth="0.8" />
        <circle cx="22" cy="32" r="3" fill="rgba(255,210,170,0.7)" />
        <circle cx="30" cy="52" r="2" fill="rgba(240,217,160,0.5)" />
      </svg>
      <svg className="curtain-decor-arch curtain-decor-arch--r" viewBox="0 0 80 120" fill="none">
        <path d="M72 115 Q40 20 72 8" stroke="rgba(240,217,160,0.55)" strokeWidth="1.2" />
        <path d="M66 100 Q44 35 66 18" stroke="rgba(255,200,150,0.35)" strokeWidth="0.8" />
        <circle cx="58" cy="32" r="3" fill="rgba(255,210,170,0.7)" />
        <circle cx="50" cy="52" r="2" fill="rgba(240,217,160,0.5)" />
      </svg>

      <svg className="curtain-kolam-ring" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" stroke="rgba(240,217,160,0.25)" strokeWidth="1" fill="none" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          const x = 60 + Math.cos(a) * 42;
          const y = 60 + Math.sin(a) * 42;
          return <circle key={i} cx={x} cy={y} r="2.5" fill="rgba(255,210,170,0.55)" />;
        })}
      </svg>

      {!reduce
        ? Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              className="curtain-spark"
              style={{ left: `${8 + i * 7.5}%`, top: `${14 + (i % 4) * 18}%` }}
              animate={{ opacity: [0.15, 1, 0.15], scale: [0.5, 1.1, 0.5], y: [0, -8, 0] }}
              transition={{ duration: 2 + i * 0.18, repeat: Infinity, delay: i * 0.12 }}
            />
          ))
        : null}

      <span className="curtain-tassel curtain-tassel--l" />
      <span className="curtain-tassel curtain-tassel--r" />
    </div>
  );
}
