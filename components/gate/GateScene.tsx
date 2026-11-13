"use client";

import { BackdropOrnaments } from "@/components/ambient/BackdropOrnaments";
import { GateStaticFlorals } from "@/components/gate/GateStaticFlorals";
import { invite } from "@/lib/invite";
import { A, T } from "@/lib/motionSpeed";
import { motion, useTime, useTransform } from "framer-motion";

const LOTUS_SRC = "/images/lotus-reference.png";

export function GateScene({
  onOpen,
  disabled,
}: {
  onOpen: () => void;
  disabled?: boolean;
}) {
  const time = useTime();
  const lotusY = useTransform(time, (t) => Math.sin(t / T(5000)) * A(10));
  const lotusScale = useTransform(time, (t) => 1 + Math.sin(t / T(5600)) * A(0.018));
  const cardY = useTransform(time, (t) => Math.cos(t / T(4800)) * A(5));
  const ctaGlow = useTransform(time, (t) => 0.92 + Math.sin(t / T(2200)) * A(0.08));

  return (
    <div className="gate-scene">
      <div className="gate-scene__bg" aria-hidden="true" />
      <BackdropOrnaments variant="gate" />
      <GateStaticFlorals />
      <div className="gate-scene__bloom">
        <motion.img
          src={LOTUS_SRC}
          alt=""
          className="gate-scene__lotus"
          width={800}
          height={800}
          decoding="async"
          style={{ y: lotusY, scale: lotusScale }}
        />
      </div>
      <div className="gate-scene__ui">
        <motion.div className="lotus-gate__card" style={{ y: cardY }}>
          <p className="lotus-gate__monogram">{invite.monogram}</p>
          <p className="lotus-gate__sub">{invite.eventTitle}</p>
          <motion.button
            type="button"
            className="lotus-gate__cta"
            onClick={onOpen}
            disabled={disabled}
            style={{ scale: disabled ? 1 : ctaGlow }}
          >
            {invite.gateCta}
          </motion.button>
        </motion.div>
      </div>
      {!disabled ? (
        <button type="button" className="lotus-gate__hit" aria-label={invite.gateCta} onClick={onOpen} />
      ) : null}
    </div>
  );
}
