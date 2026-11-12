"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";

const PETALS = [0, 72, 144, 216, 288];

export function Jasmine() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <div className="jasmine-wrap" aria-hidden="true">
      <svg
        ref={ref}
        className={`jasmine ${inView ? "is-on" : ""}`}
        viewBox="0 0 80 80"
        fill="none"
      >
        {PETALS.map((deg, i) => (
          <ellipse
            key={deg}
            className="j-petal"
            cx="40"
            cy="22"
            rx="6.5"
            ry="13"
            transform={`rotate(${deg} 40 40)`}
            pathLength="1"
            style={{ animationDelay: `${i * 0.07}s` }}
          />
        ))}
        <circle className="j-center" cx="40" cy="40" r="3.1" />
      </svg>
    </div>
  );
}
