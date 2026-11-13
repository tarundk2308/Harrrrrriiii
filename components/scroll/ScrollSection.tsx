"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import type { ReactNode, RefObject } from "react";

export function ScrollSection({
  children,
  container,
  className = "",
}: {
  children: ReactNode;
  container: RefObject<HTMLElement | null>;
  className?: string;
}) {
  const { scrollYProgress } = useScroll({
    container,
    offset: ["start end", "end start"] as const,
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [48, 0, -42]);
  const scale = useTransform(scrollYProgress, [0, 0.45, 1], [0.94, 1, 0.97]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0.55, 1, 1, 0.65]);

  return (
    <motion.section className={`chapter ${className}`.trim()} style={{ y, scale, opacity }}>
      {children}
    </motion.section>
  );
}
