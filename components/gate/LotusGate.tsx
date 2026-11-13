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

const BLOOM_S = 1.55;
const ZOOM_AT = 0.38;
const REVEAL_AT = 0.58;

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

  /** Full pastel pink by 50% progress, held through the end. */
  const pinkFill = useTransform(progress, (t) => {
    if (t < 0.28) return 0;
    if (t <= 0.5) return smoothstep((t - 0.28) / 0.22);
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
        window.setTimeout(() => onExit(), 280);
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
      <motion.div className="lotus-gate__pink-fill" style={{ opacity: pinkFill }} aria-hidden="true" />

      {reduce ? null : (
        <PressedFlowerField
          flowers={GATE_FLOWERS}
          progress={progress}
          preload
          className="pressed-flower-layer--gate"
        />
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
