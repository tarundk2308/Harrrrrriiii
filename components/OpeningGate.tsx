"use client";

import { CurtainGraphics } from "@/components/CurtainGraphics";
import { Kolam } from "@/components/Kolam";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const OPEN_MS = 1450;

export function OpeningGate({
  onCurtainStart,
  onCurtainEnd,
}: {
  onCurtainStart: () => void;
  onCurtainEnd: () => void;
}) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onCurtainStart();
    window.setTimeout(() => onCurtainEnd(), reduce ? 80 : OPEN_MS);
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
      <CurtainGraphics />
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
        <span className="curtain-lettering curtain-lettering--left" aria-hidden="true">
          <span className="curtain-line curtain-line--tamil" lang="ta">
            {invite.occasionTamil}
          </span>
          <span className="curtain-line curtain-line--kicker">{invite.eventTitle}</span>
          <span className="curtain-line curtain-line--name">{invite.groom}</span>
        </span>
        <span className="curtain-fold curtain-fold--1" aria-hidden="true" />
        <span className="curtain-fold curtain-fold--2" aria-hidden="true" />
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
        <span className="curtain-lettering curtain-lettering--right" aria-hidden="true">
          <span className="curtain-line curtain-line--name">{invite.bride}</span>
          <span className="curtain-line curtain-line--when">
            {invite.weekday} · {invite.dateDay} {invite.dateMonthYear}
          </span>
          <span className="curtain-line curtain-line--time">{invite.timeLine}</span>
        </span>
        <span className="curtain-fold curtain-fold--1" aria-hidden="true" />
        <span className="curtain-fold curtain-fold--3" aria-hidden="true" />
      </motion.button>

      <div className="curtain-preview">
        <motion.button
          type="button"
          className="curtain-card curtain-card--minimal"
          onClick={open}
          disabled={opening}
          aria-label="Open the curtains"
          animate={opening ? { opacity: 0, scale: 0.96, y: -8 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reduce ? 0.1 : 0.35, ease }}
          whileTap={reduce || opening ? undefined : { scale: 0.98 }}
        >
          <Kolam when="load" />
          <span className="curtain-card-monogram" aria-hidden="true">
            H · S
          </span>
          <span className="curtain-cta">Tap to open</span>
        </motion.button>
      </div>
    </div>
  );
}
