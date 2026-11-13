"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const LotusGate = dynamic(() => import("@/components/gate/LotusGate").then((m) => m.LotusGate), {
  ssr: false,
  loading: () => <div className="experience-loading" aria-busy="true" />,
});

const EngagementScroll = dynamic(
  () => import("@/components/scroll/EngagementScroll").then((m) => m.EngagementScroll),
  { ssr: false },
);

export function InviteExperience() {
  const [mainReady, setMainReady] = useState(false);
  const [gateVisible, setGateVisible] = useState(true);

  return (
    <div className={`experience ${mainReady ? "experience--open" : "experience--gate"}`}>
      {mainReady ? <EngagementScroll /> : null}
      {gateVisible ? (
        <LotusGate
          onReveal={() => setMainReady(true)}
          onExit={() => setGateVisible(false)}
        />
      ) : null}
    </div>
  );
}
