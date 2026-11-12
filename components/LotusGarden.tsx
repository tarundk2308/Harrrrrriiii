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
      <motion.div
        className="lotus-garden-inner"
        animate={
          reduce
            ? undefined
            : {
                x: [0, 10, -8, 6, 0],
                y: [0, -4, 2, -3, 0],
                rotate: [0, 0.4, -0.35, 0.25, 0],
              }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
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
    </motion.div>
  );
}
