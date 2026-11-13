"use client";

import { GATE_FLOWERS } from "@/lib/pressedFlowers";

/** Stable pressed flowers on the gate — no motion, no rotation. */
export function GateStaticFlorals() {
  return (
    <div className="gate-static-florals" aria-hidden="true">
      {GATE_FLOWERS.map((f) => (
        <img
          key={f.slotId}
          src={f.src}
          alt=""
          className="gate-static-florals__img"
          width={f.naturalW}
          height={f.naturalH}
          loading="eager"
          decoding="async"
          draggable={false}
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: f.size,
            opacity: f.opacity,
            zIndex: f.layer,
            transform: `scale(1.12)`,
          }}
        />
      ))}
    </div>
  );
}
