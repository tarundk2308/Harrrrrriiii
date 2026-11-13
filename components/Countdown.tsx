"use client";

import { invite } from "@/lib/invite";
import { useEffect, useState } from "react";

function getRemaining(iso: string) {
  const end = new Date(iso).getTime();
  const diff = Math.max(0, end - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

export function Countdown() {
  const [left, setLeft] = useState(() => getRemaining(invite.countdownIso));

  useEffect(() => {
    const tick = () => setLeft(getRemaining(invite.countdownIso));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: left.days },
    { label: "Hrs", value: left.hours },
    { label: "Min", value: left.minutes },
    { label: "Sec", value: left.seconds },
  ] as const;

  return (
    <div className="countdown" aria-live="polite">
      <p className="countdown__lead">Countdown</p>
      <ul className="countdown__grid">
        {units.map(({ label, value }) => (
          <li key={label} className="countdown__unit">
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
