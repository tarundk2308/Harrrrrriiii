"use client";

import { motion, useReducedMotion } from "framer-motion";

function Petal({
  d,
  fill,
  origin,
  delay = 0,
  reduce,
}: {
  d: string;
  fill: string;
  origin: string;
  delay?: number;
  reduce: boolean;
}) {
  return (
    <motion.path
      d={d}
      fill={fill}
      style={{ transformOrigin: origin }}
      animate={reduce ? undefined : { rotate: [0, 2.5, -2, 0], scale: [1, 1.02, 1] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export function FreshFloralIllustration({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const reduce = useReducedMotion() ?? false;
  const className = variant === "compact" ? "fresh-floral fresh-floral--compact" : "fresh-floral";

  return (
    <svg
      className={className}
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="petalRose" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffe8f0" />
          <stop offset="100%" stopColor="#f9a8d4" />
        </linearGradient>
        <linearGradient id="petalLilac" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="100%" stopColor="#d8b4fe" />
        </linearGradient>
        <linearGradient id="petalPeach" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff7ed" />
          <stop offset="100%" stopColor="#fdba74" />
        </linearGradient>
        <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d1fae5" />
          <stop offset="100%" stopColor="#86efac" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="320" fill="url(#glow)" />

      <motion.g
        animate={reduce ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ellipse cx="95" cy="248" rx="38" ry="22" fill="url(#leaf)" opacity="0.85" />
        <ellipse cx="310" cy="255" rx="42" ry="24" fill="url(#leaf)" opacity="0.8" />

        <Petal
          d="M55 210 C55 170 95 140 120 168 C95 125 145 115 155 155 C175 120 210 145 195 185 C225 165 235 210 200 230 C210 260 165 275 140 248 C115 278 75 255 85 220 C60 235 55 210 55 210Z"
          fill="url(#petalRose)"
          origin="120px 210px"
          delay={0}
          reduce={reduce}
        />
        <Petal
          d="M248 205 C248 168 285 148 305 172 C288 138 332 128 340 162 C360 132 392 158 378 192 C402 178 408 218 372 236 C380 262 340 272 318 248 C295 270 262 252 268 218 C248 228 248 205 248 205Z"
          fill="url(#petalLilac)"
          origin="310px 205px"
          delay={0.5}
          reduce={reduce}
        />
        <Petal
          d="M168 218 C168 198 188 188 198 202 C190 182 218 178 222 198 C232 185 248 198 242 215 C252 208 258 228 238 238 C242 252 218 258 208 242 C198 255 178 245 182 228 C168 232 168 218 168 218Z"
          fill="url(#petalPeach)"
          origin="200px 218px"
          delay={1}
          reduce={reduce}
        />

        <circle cx="198" cy="205" r="8" fill="#fde68a" opacity="0.9" />
        <circle cx="122" cy="198" r="6" fill="#fecdd3" opacity="0.8" />
        <circle cx="318" cy="200" r="6" fill="#e9d5ff" opacity="0.85" />
      </motion.g>

      {!reduce
        ? [12, 28, 72, 88, 55].map((x, i) => (
            <motion.circle
              key={x}
              cx={40 + x * 3.2}
              cy={60 + (i % 3) * 22}
              r={2 + (i % 2)}
              fill={i % 2 ? "#fbcfe8" : "#ddd6fe"}
              opacity="0.7"
              animate={{ opacity: [0.3, 0.9, 0.3], y: [0, -6, 0] }}
              transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.35 }}
            />
          ))
        : null}
    </svg>
  );
}
