"use client";

import Image from "next/image";
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
      <Image
        src="/images/engagement-card-reference.jpg"
        alt=""
        width={900}
        height={500}
        className="lotus-garden-img"
        priority
      />
    </motion.div>
  );
}
