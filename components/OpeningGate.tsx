"use client";

import { CurtainDecor } from "@/components/CurtainDecor";
import { Kolam } from "@/components/Kolam";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const OPEN_MS = 1450;

export function OpeningGate({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => onOpen(), reduce ? 80 : OPEN_MS);
  };

  const panelTransition = {
    duration: reduce ? 0.15 : 1.35,
    ease,
  };

  return (
    <div
      className={`curtain-stage ${opening ? "curtain-stage--opening" : ""}`}
      aria-hidden={opening}
    >
      <CurtainDecor />
      <div className="curtain-rod" aria-hidden="true">
        <span className="curtain-rod-shine" />
      </div>

      <motion.button
        type="button"
        className="curtain curtain--left"
        aria-label="Open the curtains"
        disabled={opening}
        onClick={open}
        initial={false}
        animate={{ x: opening ? "-105vw" : "0vw" }}
        transition={panelTransition}
      >
        <span className="curtain-lettering curtain-lettering--left">
          <span className="curtain-line curtain-line--mix">{invite.curtainLeft}</span>
          <span className="curtain-line curtain-line--name">{invite.groom}</span>
        </span>
      </motion.button>

      <motion.button
        type="button"
        className="curtain curtain--right"
        aria-label="Open the curtains"
        disabled={opening}
        onClick={open}
        initial={false}
        animate={{ x: opening ? "105vw" : "0vw" }}
        transition={panelTransition}
      >
        <span className="curtain-lettering curtain-lettering--right">
          <span className="curtain-line curtain-line--mix">{invite.curtainRight}</span>
          <span className="curtain-line curtain-line--name">{invite.bride}</span>
          <span className="curtain-line curtain-line--place">{invite.curtainPlace}</span>
        </span>
      </motion.button>

      <div className="curtain-preview">
        <motion.button
          type="button"
          className="curtain-card curtain-card--minimal"
          onClick={open}
          disabled={opening}
          aria-label="Open the curtains"
          animate={opening ? { opacity: 0, scale: 0.96 } : { opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0.1 : 0.35, ease }}
          whileTap={reduce || opening ? undefined : { scale: 0.98 }}
        >
          <Kolam when="load" />
          <p className="curtain-center-mix">{invite.curtainCouple}</p>
          <span className="curtain-cta">{invite.curtainCta}</span>
        </motion.button>
      </div>
    </div>
  );
}
