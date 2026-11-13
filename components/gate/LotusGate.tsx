"use client";

import { LotusReferenceBloom } from "@/components/gate/LotusReferenceBloom";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const BLOOM_MS = 2000;

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
  const bloomRef = useRef(0);
  const flashRef = useRef(0);
  const pullRef = useRef(0);
  const spinRef = useRef(0);
  const [, tick] = useState(0);
  const startRef = useRef<number | null>(null);
  const idleStart = useRef<number | null>(null);

  const bloom = bloomRef.current;
  const flash = flashRef.current;
  const pull = pullRef.current;
  const spin = spinRef.current;

  const open = useCallback(() => {
    if (phase !== "idle") return;
    if (reduce) {
      onReveal();
      onExit();
      return;
    }
    setPhase("blooming");
    startRef.current = performance.now();
  }, [onExit, onReveal, phase, reduce]);

  useEffect(() => {
    if (phase === "idle" && idleStart.current === null) {
      idleStart.current = performance.now();
    }
    if (phase !== "idle") idleStart.current = null;
  }, [phase]);

  useEffect(() => {
    let frame = 0;
    const loop = (now: number) => {
      if (phase === "idle" && idleStart.current !== null) {
        const t = (now - idleStart.current) / 1000;
        spinRef.current = Math.sin(t * 0.9) * 5 + t * 12;
        tick((n) => n + 1);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  useEffect(() => {
    if (phase !== "blooming" || startRef.current === null) return;

    let frame = 0;
    let revealed = false;

    const run = (now: number) => {
      const t = Math.min(1, (now - startRef.current!) / BLOOM_MS);
      const eased = 1 - Math.pow(1 - t, 2.15);
      bloomRef.current = eased;
      pullRef.current = t < 0.48 ? 0 : (t - 0.48) / 0.52;

      if (t < 0.52) {
        flashRef.current = 0;
      } else {
        flashRef.current = smoothstep((t - 0.52) / 0.48);
      }

      spinRef.current = eased * 16 + t * 42 + flashRef.current * 55;

      if (t >= 1 && !revealed) {
        revealed = true;
        flashRef.current = 1;
        onReveal();
        setPhase("done");
        window.setTimeout(() => onExit(), 120);
      }

      tick((n) => n + 1);
      if (t < 1) frame = requestAnimationFrame(run);
    };
    frame = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame);
  }, [onExit, onReveal, phase]);

  return (
    <motion.div
      className="lotus-gate"
      initial={{ opacity: 1 }}
      animate={phase === "done" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.12 }}
    >
      <div
        className="lotus-gate__flash"
        style={{ opacity: flash }}
        aria-hidden="true"
      />

      <div className="lotus-gate__orbit" aria-hidden="true">
        <span className="lotus-gate__ring lotus-gate__ring--a" />
        <span className="lotus-gate__ring lotus-gate__ring--b" />
      </div>

      <div className="lotus-gate__bloom">
        <LotusReferenceBloom bloom={bloom} flash={flash} spin={spin} pull={pull} />
      </div>

      <div className="lotus-gate__ui">
        <motion.div
          className="lotus-gate__card"
          initial={false}
          animate={
            phase === "blooming" || phase === "done"
              ? { opacity: 0, y: 12 }
              : { opacity: 1, y: 0 }
          }
          transition={{ duration: 0.25 }}
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
