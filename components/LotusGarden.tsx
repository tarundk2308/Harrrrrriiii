"use client";

import { AnimatedFloralStrip } from "@/components/AnimatedFloralStrip";
import { motion, useReducedMotion } from "framer-motion";

export function LotusGarden() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="lotus-garden"
      aria-hidden="true"
      initial={reduce ? false : { y: "30%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="lotus-garden-inner"
        animate={reduce ? undefined : { y: [0, -3, 2, -2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <AnimatedFloralStrip
          src="/images/engagement-florals.jpg"
          width={1024}
          height={144}
          imageClassName="lotus-garden-img"
          washClassName="floral-strip-wash floral-strip-wash--main"
        />
      </motion.div>
    </motion.div>
  );
}
