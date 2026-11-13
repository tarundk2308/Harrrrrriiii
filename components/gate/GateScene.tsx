"use client";

import { GateStaticFlorals } from "@/components/gate/GateStaticFlorals";
import { invite } from "@/lib/invite";

const LOTUS_SRC = "/images/lotus-reference.png";

export function GateScene({
  onOpen,
  disabled,
}: {
  onOpen: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="gate-scene">
      <div className="gate-scene__bg" aria-hidden="true" />
      <GateStaticFlorals />
      <div className="gate-scene__bloom">
        <img src={LOTUS_SRC} alt="" className="gate-scene__lotus" width={800} height={800} decoding="async" />
      </div>
      <div className="gate-scene__ui">
        <div className="lotus-gate__card">
          <p className="lotus-gate__monogram">{invite.monogram}</p>
          <p className="lotus-gate__sub">{invite.eventTitle}</p>
          <button type="button" className="lotus-gate__cta" onClick={onOpen} disabled={disabled}>
            {invite.gateCta}
          </button>
        </div>
      </div>
      {!disabled ? (
        <button type="button" className="lotus-gate__hit" aria-label={invite.gateCta} onClick={onOpen} />
      ) : null}
    </div>
  );
}
