"use client";

import { EngagementInvite } from "@/components/EngagementInvite";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function Invite({ revealed, rising }: { revealed: boolean; rising?: boolean }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="invite-surface invite-surface--engagement"
      initial={false}
      animate={
        revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 32, pointerEvents: "none" }
      }
      transition={{
        duration: reduce ? 0 : rising ? 1 : 0.45,
        delay: reduce ? 0 : rising ? 0.35 : 0,
        ease,
        type: "spring",
        stiffness: 110,
        damping: 22,
      }}
    >
      {revealed ? (
        <>
          <motion.div className="progress" style={{ scaleX: progress }} aria-hidden="true" />
          <EngagementInvite />
        </>
      ) : null}
    </motion.div>
  );
}
