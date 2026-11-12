"use client";

import { GroomName } from "@/components/GroomName";
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
            {invite.weekday} {invite.dateDay} {invite.dateMonthYear}
          </span>
          <span className="curtain-line curtain-line--time">{invite.timeLine}</span>
          <span className="curtain-line curtain-line--city">{invite.city}</span>
        </span>
      </motion.button>

      <div className="curtain-preview">
        <motion.button
          type="button"
          className="curtain-card"
          onClick={open}
          disabled={opening}
          aria-label="Open the curtains"
          animate={opening ? { opacity: 0, scale: 0.96, y: -8 } : { opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: reduce ? 0.1 : 0.35, ease }}
          whileTap={reduce || opening ? undefined : { scale: 0.98 }}
        >
          <Kolam when="load" />
          <p lang="ta" className="curtain-tamil">
            {invite.occasionTamil}
          </p>
          <p className="curtain-eyebrow">{invite.eventTitle}</p>
          <p className="curtain-names">
            <GroomName variant="compact" />
            <span className="curtain-amp">&</span>
            {invite.bride}
          </p>
          <p className="curtain-when">
            {invite.city} · {invite.dateLine}
          </p>
          <span className="curtain-cta">Open curtains</span>
        </motion.button>
      </div>
    </div>
  );
}
