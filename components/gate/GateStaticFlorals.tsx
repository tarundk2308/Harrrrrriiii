"use client";

import { A, T } from "@/lib/motionSpeed";
import { GATE_FLOWERS } from "@/lib/pressedFlowers";
import type { FlowerPlace } from "@/lib/pressedFlowers";
import { motion, useTime, useTransform } from "framer-motion";

function GateFlower({ place }: { place: FlowerPlace }) {
  const time = useTime();
  const driftX = useTransform(time, (t) => Math.sin(t / T(3400) + place.delay * 2) * A(5 + place.float * 0.55));
  const driftY = useTransform(time, (t) => Math.cos(t / T(3800) + place.delay) * A(4 + place.float * 0.45));
  const sway = useTransform(time, (t) => place.rot + Math.sin(t / T(4200) + place.delay) * A(3));
  const breathe = useTransform(time, (t) => 1.12 + Math.sin(t / T(4800) + place.delay) * A(0.025));

  return (
    <motion.div
      className="gate-static-florals__wrap"
      style={{
        left: `${place.x}%`,
        top: `${place.y}%`,
        width: place.size,
        opacity: place.opacity,
        zIndex: place.layer,
        x: driftX,
        y: driftY,
        rotate: sway,
        scale: breathe,
      }}
    >
      <img
        src={place.src}
        alt=""
        className="gate-static-florals__img"
        width={place.naturalW}
        height={place.naturalH}
        loading="eager"
        decoding="async"
        draggable={false}
      />
    </motion.div>
  );
}

/** Pressed flowers on the gate — gentle ambient drift. */
export function GateStaticFlorals() {
  return (
    <div className="gate-static-florals" aria-hidden="true">
      {GATE_FLOWERS.map((f) => (
        <GateFlower key={f.slotId} place={f} />
      ))}
    </div>
  );
}
