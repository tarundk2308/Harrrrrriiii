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
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useCallback, useRef, useState } from "react";

const BLOOM_S = 1.2;

function smoothstep(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * (3 - 2 * t);
}

export function LotusGate({
  onPreload,
  onExit,
}: {
  onPreload: () => void;
  onExit: () => void;
}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<"idle" | "blooming" | "done">("idle");
  const progress = useMotionValue(0);
  const idleSpin = useMotionValue(0);
  const idleStart = useRef<number | null>(null);

  const pinkFill = useTransform(progress, (t) => {
    if (t < 0.3) return 0;
    if (t <= 0.5) return smoothstep((t - 0.3) / 0.2);
    return 1;
  });

  const decorOpacity = useTransform(progress, (t) => (t > 0.34 ? Math.max(0, 1 - (t - 0.34) / 0.2) : 1));

  useAnimationFrame((t) => {
    if (phase !== "idle") return;
    if (idleStart.current === null) idleStart.current = t;
    const elapsed = (t - idleStart.current) / 1000;
    idleSpin.set(Math.sin(elapsed * 0.85) * 4 + elapsed * 10);
  });

  const open = useCallback(() => {
    if (phase !== "idle") return;
    if (reduce) {
      onPreload();
      onExit();
      return;
    }
    idleStart.current = null;
    onPreload();
    setPhase("blooming");
    progress.set(0);
    animate(progress, 1, {
      duration: BLOOM_S,
      ease: [0.42, 0, 0.2, 1],
      onComplete: () => {
        setPhase("done");
        window.setTimeout(() => onExit(), 50);
      },
    });
  }, [onExit, onPreload, phase, progress, reduce]);

  return (
    <motion.div
      className="lotus-gate"
      initial={{ opacity: 1 }}
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.16, ease: "linear" }}
    >
      <motion.div className="lotus-gate__pink-fill" style={{ opacity: pinkFill }} aria-hidden="true" />

      {reduce ? null : (
        <motion.div style={{ opacity: decorOpacity }} className="lotus-gate__decor">
          <PressedFlowerField
            flowers={GATE_FLOWERS}
            progress={progress}
            preload
            className="pressed-flower-layer--gate"
          />
          <div className="lotus-gate__orbit" aria-hidden="true">
            <span className="lotus-gate__ring lotus-gate__ring--a" />
            <span className="lotus-gate__ring lotus-gate__ring--b" />
          </div>
        </motion.div>
      )}

      <div className="lotus-gate__bloom">
        <LotusReferenceBloom progress={progress} idleSpin={idleSpin} />
      </div>

      <div className="lotus-gate__ui">
        <motion.div
          className="lotus-gate__card"
          initial={false}
          animate={
            phase === "blooming" || phase === "done"
              ? { opacity: 0, y: 10 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.22, ease: [0.42, 0, 0.2, 1] }}
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
