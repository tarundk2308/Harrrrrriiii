"use client";

import { EngagementInvite } from "@/components/EngagementInvite";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function Invite({ revealed, rising }: { revealed: boolean; rising?: boolean }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [touchPhone, setTouchPhone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px), (hover: none) and (pointer: coarse)");
    const apply = () => setTouchPhone(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const riseTransition =
    reduce || !rising
      ? { duration: reduce ? 0 : 0.45, delay: 0, ease }
      : touchPhone
        ? { duration: 0.95, delay: 0.42, ease }
        : { duration: 1, delay: 0.35, ease, type: "spring" as const, stiffness: 110, damping: 22 };

  return (
    <motion.div
      className="invite-surface invite-surface--engagement"
      initial={false}
      animate={
        revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: touchPhone ? 20 : 32, pointerEvents: "none" }
      }
      transition={riseTransition}
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
