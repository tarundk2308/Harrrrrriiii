"use client";

import { useId, useMemo } from "react";

const OUTER = 12;
const INNER = 6;

function petalPath(scale: number) {
  const w = 52 * scale;
  const h = 118 * scale;
  return `M 0 0 C ${w * 0.55} ${h * 0.18}, ${w * 0.48} ${h * 0.62}, 0 ${h} C ${-w * 0.48} ${h * 0.62}, ${-w * 0.55} ${h * 0.18}, 0 0 Z`;
}

export function LotusIllustration({ bloom }: { bloom: number }) {
  const gradId = useId();
  const innerGradId = useId();
  const padGradId = useId();

  const outerAngles = useMemo(() => Array.from({ length: OUTER }, (_, i) => (i / OUTER) * 360), []);
  const innerAngles = useMemo(() => Array.from({ length: INNER }, (_, i) => (i / INNER) * 360 + 360 / (INNER * 2)), []);

  const closed = 1 - bloom;
  const open = bloom;

  return (
    <svg
      className="lotus-art"
      viewBox="-160 -160 320 320"
      aria-hidden="true"
      role="presentation"
    >
      <defs>
        <radialGradient id={padGradId} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#cfe6d4" />
          <stop offset="100%" stopColor="#9ec4a8" />
        </radialGradient>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff9fb" />
          <stop offset="55%" stopColor="#f3d9e4" />
          <stop offset="100%" stopColor="#e8b8ca" />
        </linearGradient>
        <linearGradient id={innerGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0dfe8" />
        </linearGradient>
      </defs>

      <ellipse cx="0" cy={28 + open * 8} rx={118 + open * 18} ry={34 + open * 4} fill={`url(#${padGradId})`} opacity={0.92} />
      <ellipse cx="0" cy={32 + open * 8} rx={96 + open * 12} ry={20} fill="#7aab88" opacity={0.25} />

      {outerAngles.map((deg, i) => {
        const tilt = -62 * closed + -8 * open;
        const lift = -18 * closed + 6 * open;
        const spread = 8 + open * 54;
        const rad = (deg * Math.PI) / 180;
        const tx = Math.sin(rad) * spread;
        const ty = -Math.cos(rad) * spread * 0.35 + lift;
        return (
          <g key={`o-${i}`} transform={`translate(${tx} ${ty}) rotate(${deg + tilt})`}>
            <path d={petalPath(1)} fill={`url(#${gradId})`} stroke="#d8a8b8" strokeWidth={0.6} opacity={0.96} />
          </g>
        );
      })}

      {innerAngles.map((deg, i) => {
        const tilt = -48 * closed + 4 * open;
        const lift = 4 + open * 4;
        const spread = open * 22;
        const rad = (deg * Math.PI) / 180;
        const tx = Math.sin(rad) * spread;
        const ty = -Math.cos(rad) * spread * 0.25 + lift;
        return (
          <g key={`i-${i}`} transform={`translate(${tx} ${ty}) rotate(${deg + tilt}) scale(0.62)`}>
            <path d={petalPath(1)} fill={`url(#${innerGradId})`} stroke="#e0c0d0" strokeWidth={0.5} />
          </g>
        );
      })}

      <circle cx="0" cy={6} r={10 + open * 4} fill="#faf6f0" stroke="#e2c878" strokeWidth={0.8} />
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        const r = 6 + open * 6;
        return (
          <circle
            key={i}
            cx={Math.cos(a) * r}
            cy={6 + Math.sin(a) * r * 0.35}
            r={1.8 + open * 0.5}
            fill="#e8c868"
            opacity={0.85}
          />
        );
      })}

      <text
        x="0"
        y={-8 - closed * 20}
        textAnchor="middle"
        className="lotus-art__monogram"
        opacity={0.15 + open * 0.85}
      >
        H · S
      </text>
    </svg>
  );
}
