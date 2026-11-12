"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

const PETALS = [0, 45, 90, 135, 180, 225, 270, 315];

export function Kolam({
  className = "",
  when = "load",
}: {
  className?: string;
  when?: "load" | "view";
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const on = when === "load" || inView;

  return (
    <svg
      ref={ref}
      className={`kolam ${on ? "is-on" : ""} ${className}`}
      viewBox="0 0 160 160"
      fill="none"
      aria-hidden="true"
    >
      <circle className="kolam-ring" cx="80" cy="80" r="72" pathLength="1" style={{ animationDelay: "0.15s" }} />
      {PETALS.map((deg, i) => (
        <ellipse
          key={deg}
          className="kolam-stroke"
          cx="80"
          cy="46"
          rx="7.2"
          ry="23"
          transform={`rotate(${deg} 80 80)`}
          pathLength="1"
          style={{ animationDelay: `${0.08 + i * 0.07}s` }}
        />
      ))}
      <circle className="kolam-dot" cx="80" cy="80" r="3" />
    </svg>
  );
}
