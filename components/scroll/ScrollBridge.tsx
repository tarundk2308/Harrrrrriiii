"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

export function ScrollBridge({ container }: { container: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container, offset: ["0.42", "0.58"] as const });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.08, 0.85]);
  const panelOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.55, 1, 1, 0.55]);
  const y = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  return (
    <motion.div className="scroll-bridge" style={{ y }}>
      <motion.div className="scroll-bridge__panel" style={{ scale, opacity: panelOpacity }}>
        <span className="scroll-bridge__label">Save the date</span>
        <svg className="scroll-bridge__lotus" viewBox="0 0 120 48" aria-hidden="true">
          <motion.path
            d="M60 44 C40 30 24 18 60 6 C96 18 80 30 60 44 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            style={{ pathLength }}
          />
        </svg>
        <motion.div className="scroll-bridge__chevrons" aria-hidden="true">
          <span />
          <span />
          <span />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
