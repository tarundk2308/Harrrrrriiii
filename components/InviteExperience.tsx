"use client";

import dynamic from "next/dynamic";
import { EngagementScroll } from "@/components/scroll/EngagementScroll";
import { MAIN_FLOWERS } from "@/lib/pressedFlowers";
import { useEffect, useState } from "react";

const LotusGate = dynamic(() => import("@/components/gate/LotusGate").then((m) => m.LotusGate), {
  ssr: false,
  loading: () => <div className="experience-loading" aria-busy="true" />,
});

export function InviteExperience() {
  const [mainReady, setMainReady] = useState(false);
  const [gateVisible, setGateVisible] = useState(true);

  useEffect(() => {
    MAIN_FLOWERS.forEach((f) => {
      const img = new Image();
      img.src = f.src;
    });
  }, []);

  return (
    <div className={`experience ${mainReady ? "experience--open" : "experience--gate"}`}>
      <div className={`experience__main ${mainReady ? "experience__main--live" : "experience__main--hidden"}`} aria-hidden={!mainReady}>
        {mainReady ? <EngagementScroll /> : null}
      </div>
      {gateVisible ? (
        <LotusGate
          onPreload={() => setMainReady(true)}
          onExit={() => setGateVisible(false)}
        />
      ) : null}
    </div>
  );
}
