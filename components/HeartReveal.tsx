"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useLayoutEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

type ZoomMetrics = {
  from: number;
  to: number;
  duration: number;
  flashPeak: number;
  fadeAt: number;
};

function isTouchPhone() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 640px), (hover: none) and (pointer: coarse)").matches;
}

function heartGlyphWidthPx(vw: number, touch: boolean) {
  const fontPx = touch
    ? Math.min(Math.max(vw * 0.24, 80), 108)
    : Math.min(Math.max(vw * 0.18, 72), 112);
  return fontPx * 0.92;
}

function computeZoomMetrics(): ZoomMetrics {
  const touch = isTouchPhone();
  const vw = window.innerWidth;
  const vh = window.visualViewport?.height ?? window.innerHeight;
  const heartW = heartGlyphWidthPx(vw, touch);
  const cover = (Math.max(vw, vh) / heartW) * (touch ? 1.75 : 1.5);

  return {
    from: touch ? 0.48 : 0.35,
    to: Math.min(Math.max(cover, touch ? 22 : 18), 52),
    duration: touch ? 1.22 : 1.05,
    flashPeak: touch ? 0.72 : 0.85,
    fadeAt: touch ? 0.68 : 0.55,
  };
}

export function HeartReveal({
  active,
  onComplete,
}: {
  active: boolean;
  onComplete: () => void;
}) {
  const reduce = useReducedMotion();
  const [metrics, setMetrics] = useState<ZoomMetrics | null>(null);

  useLayoutEffect(() => {
    if (!active) {
      setMetrics(null);
      return;
    }
    const refresh = () => setMetrics(computeZoomMetrics());
    refresh();
    window.visualViewport?.addEventListener("resize", refresh);
    return () => window.visualViewport?.removeEventListener("resize", refresh);
  }, [active]);

  useEffect(() => {
    if (!active || !reduce) return;
    const id = window.setTimeout(onComplete, 120);
    return () => window.clearTimeout(id);
  }, [active, reduce, onComplete]);

  if (!active) return null;
  if (reduce) return <div className="heart-reveal heart-reveal--reduce" aria-hidden="true" />;

  const m = metrics ?? computeZoomMetrics();

  return (
    <motion.div className="heart-reveal" aria-hidden="true">
      <motion.div
        className="heart-reveal-flash"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, m.flashPeak, 0] }}
        transition={{ duration: m.duration * 0.72, times: [0, 0.32, 1], ease }}
      />
      <motion.div
        className="heart-reveal-core"
        initial={{ scale: m.from, opacity: 1 }}
        animate={{ scale: m.to, opacity: [1, 1, 0] }}
        transition={{
          duration: m.duration,
          ease,
          times: [0, m.fadeAt, 1],
        }}
        onAnimationComplete={onComplete}
      >
        <span className="heart-reveal-shape">♥</span>
      </motion.div>
    </motion.div>
  );
}
