"use client";

import { PressedFlowerField } from "@/components/floral/PressedFlowerField";
import { LotusReferenceBloom } from "@/components/gate/LotusReferenceBloom";
import { GATE_FLOWERS } from "@/lib/pressedFlowers";
import { invite } from "@/lib/invite";
import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";

const BLOOM_S = 1.35;
const ZOOM_AT = 0.42;
const REVEAL_AT = 0.8;

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

export function LotusGate({
  onReveal,
  onExit,
}: {
  onReveal: () => void;
  onExit: () => void;
}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "blooming" | "done">("idle");
  const progress = useMotionValue(0);
  const idleSpin = useMotionValue(0);
  const idleStart = useRef<number | null>(null);
  const revealedRef = useRef(false);

  const washOpacity = useTransform(progress, (t) => {
    if (t < ZOOM_AT - 0.04) return 0;
    return smoothstep((t - (ZOOM_AT - 0.04)) / (1 - (ZOOM_AT - 0.04))) * 0.62;
  });

  const blinkOpacity = useTransform(progress, (t) => {
    if (t < 0.7) return 0;
    const u = (t - 0.7) / 0.3;
    if (u < 0.5) return smoothstep(u / 0.5);
    return 1;
  });

  const ringScale = useTransform(progress, (t) => 1 + bloomHint(t) * 0.08);
  const ringA = useTransform(progress, (t) => (t > 0 ? Math.min(t, ZOOM_AT) * 28 : 0));
  const ringB = useTransform(progress, (t) => (t > 0 ? -Math.min(t, ZOOM_AT) * 22 : 0));

  useAnimationFrame((t) => {
    if (phase !== "idle") return;
    if (idleStart.current === null) idleStart.current = t;
    const elapsed = (t - idleStart.current) / 1000;
    idleSpin.set(Math.sin(elapsed * 0.85) * 4 + elapsed * 10);
  });

  useMotionValueEvent(progress, "change", (v) => {
    if (phase !== "blooming" || revealedRef.current) return;
    if (v >= REVEAL_AT) {
      revealedRef.current = true;
      onReveal();
    }
  });

  const open = useCallback(() => {
    if (phase !== "idle") return;
    if (reduce) {
      onReveal();
      onExit();
      return;
    }
    idleStart.current = null;
    revealedRef.current = false;
    setPhase("blooming");
    progress.set(0);
    animate(progress, 1, {
      duration: BLOOM_S,
      ease: [0.32, 0.72, 0.28, 1],
      onComplete: () => {
        if (!revealedRef.current) {
          revealedRef.current = true;
          onReveal();
        }
        setPhase("done");
        window.setTimeout(() => onExit(), 220);
      },
    });
  }, [onExit, onReveal, phase, progress, reduce]);

  return (
    <motion.div
      className="lotus-gate"
      initial={{ opacity: 1 }}
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1], delay: phase === "done" ? 0.05 : 0 }}
    >
      <motion.div className="lotus-gate__wash" style={{ opacity: washOpacity }} aria-hidden="true" />
      <motion.div className="lotus-gate__pastel-blink" style={{ opacity: blinkOpacity }} aria-hidden="true" />

      {reduce ? null : (
        <PressedFlowerField flowers={GATE_FLOWERS} progress={progress} className="pressed-flower-layer--gate" />
      )}

      <div className="lotus-gate__orbit" aria-hidden="true">
        <motion.span
          className="lotus-gate__ring lotus-gate__ring--a"
          style={{ scale: ringScale, rotate: ringA }}
        />
        <motion.span
          className="lotus-gate__ring lotus-gate__ring--b"
          style={{ rotate: ringB, scale: ringScale }}
        />
      </div>

      <div className="lotus-gate__bloom">
        <LotusReferenceBloom progress={progress} idleSpin={idleSpin} />
      </div>

      <div className="lotus-gate__ui">
        <motion.div
          className="lotus-gate__card"
          initial={false}
          animate={
            phase === "blooming" || phase === "done"
              ? { opacity: 0, y: 14, filter: "blur(2px)" }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0.28, 1] }}
        >
          <p className="lotus-gate__monogram">{invite.monogram}</p>
          <p className="lotus-gate__sub">{invite.eventTitle}</p>
          <button type="button" className="lotus-gate__cta" onClick={open} disabled={phase !== "idle"}>
            {invite.gateCta}
          </button>
        </motion.div>
      </div>

      {phase === "idle" ? (
        <button type="button" className="lotus-gate__hit" aria-label={invite.gateCta} onClick={open} />
      ) : null}
    </motion.div>
  );
}

function bloomHint(t: number) {
  if (t <= 0) return 0;
  return 1 - Math.pow(1 - t, 2.1);
}
