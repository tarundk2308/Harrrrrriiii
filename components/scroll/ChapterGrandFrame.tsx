"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function ChapterGrandFrame({
  index,
  children,
  className = "",
}: {
  index: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={`chapter__frame chapter__frame--grand ${className}`.trim()}
      initial={{ opacity: 0, y: 36, scale: 0.94, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: false, amount: 0.48, margin: "-5% 0px -5% 0px" }}
      transition={{ duration: 0.8, ease, type: "spring", stiffness: 90, damping: 18 }}
    >
      <span className="chapter__index" aria-hidden="true">
        {index}
      </span>
      <svg className="chapter__arch" viewBox="0 0 280 40" aria-hidden="true">
        <path d="M8 32 Q140 4 272 32" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <span className="chapter__petal chapter__petal--tl" aria-hidden="true" />
      <span className="chapter__petal chapter__petal--tr" aria-hidden="true" />
      <span className="chapter__petal chapter__petal--bl" aria-hidden="true" />
      <span className="chapter__petal chapter__petal--br" aria-hidden="true" />
      {children}
    </motion.div>
  );
}
