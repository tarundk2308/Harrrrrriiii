"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-12-04T18:30:00+05:30").getTime();

function parts(diff: number) {
  const total = Math.max(0, diff);
  const days = Math.floor(total / 86_400_000);
  const hours = Math.floor((total % 86_400_000) / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function word(n: number, singular: string) {
  return n === 1 ? singular : `${singular}s`;
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) {
    return <div className="countdown countdown-placeholder" aria-hidden="true" />;
  }

  const diff = TARGET - now;
  if (diff <= 0) {
    return <p className="countdown-done">The celebrations begin.</p>;
  }

  const { days, hours, minutes, seconds } = parts(diff);
  const units = [
    { value: pad(days), label: word(days, "day") },
    { value: pad(hours), label: word(hours, "hour") },
    { value: pad(minutes), label: word(minutes, "minute") },
    { value: pad(seconds), label: word(seconds, "second"), quiet: true },
  ];

  return (
    <div className="countdown" aria-hidden="true">
      {units.map((unit) => (
        <div key={unit.label} className={unit.quiet ? "unit unit-quiet" : "unit"}>
          <strong>{unit.value}</strong>
          <span>{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
