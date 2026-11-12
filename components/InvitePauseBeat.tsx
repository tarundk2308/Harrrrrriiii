"use client";

import { Kolam } from "@/components/Kolam";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";

export function InvitePauseBeat({ active }: { active: boolean }) {
  const reduce = useReducedMotion();
  if (!active) return null;

  return (
    <motion.div
      className="invite-pause"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-live="polite"
    >
      <motion.div
        animate={reduce ? undefined : { scale: [1, 1.06, 1], rotate: [0, 4, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <Kolam when="load" />
      </motion.div>
      <p className="invite-pause-line">{invite.pauseLine}</p>
    </motion.div>
  );
}
