"use client";

import { ContentPlate } from "@/components/ContentPlate";
import { Countdown } from "@/components/Countdown";
import { Jasmine } from "@/components/Jasmine";
import { Kolam } from "@/components/Kolam";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, type: "spring" as const, stiffness: 130, damping: 20 },
  },
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

export function Invite({ revealed }: { revealed: boolean }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const floatY = useTransform(scrollYProgress, [0, 0.3], [0, -12]);

  return (
    <motion.div
      className="invite-surface"
      initial={{ opacity: 0 }}
      animate={revealed ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.55, ease }}
    >
      {revealed ? (
        <>
          <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
          <p className="sr-only">
            Betrothal of {invite.groom} and {invite.bride} on {invite.weekday}, {invite.dateLine},{" "}
            {invite.timeLine}, {invite.city}.
          </p>

          <motion.main
            className="invite-main"
            style={reduce ? undefined : { y: floatY }}
          >
            <motion.div
              className="invite-floaters"
              aria-hidden="true"
              animate={reduce ? undefined : { rotate: [0, 6, -4, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <Jasmine />
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease, type: "spring", stiffness: 110, damping: 22 }}
            >
            <ContentPlate className="plate-hero plate-hero--solo">
              <motion.div
                variants={reduce ? undefined : list}
                initial="hidden"
                animate="show"
              >
                <motion.p className="invite-kicker" variants={reduce ? undefined : item}>
                  {invite.mainKicker}
                </motion.p>
                <motion.p className="invite-when-mix" variants={reduce ? undefined : item}>
                  {invite.mainWhen}
                </motion.p>

                <motion.div className="invite-venue-block" variants={reduce ? undefined : item}>
                  <p className="invite-venue-lead">{invite.mainVenueLead}</p>
                  <ul className="facts facts--compact">
                    {invite.venueLines.map((line, i) => (
                      <motion.li
                        key={line}
                        initial={reduce ? false : { opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.45 + i * 0.1, duration: 0.5, ease }}
                      >
                        {i === 0 && invite.venueUrl ? (
                          <a className="venue-link" href={invite.venueUrl}>
                            {line}
                          </a>
                        ) : (
                          line
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div variants={reduce ? undefined : item} className="invite-countdown-wrap">
                  <Countdown />
                </motion.div>

                <motion.p variants={reduce ? undefined : item} className="invite-maps">
                  <a href={invite.venueUrl} target="_blank" rel="noopener noreferrer">
                    வழி · Directions
                  </a>
                </motion.p>
              </motion.div>
            </ContentPlate>
            </motion.div>

            <motion.footer
              className="end end--minimal"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease }}
            >
              <Kolam className="kolam-small" when="view" />
              <p className="end-meta">{invite.cityTamil} · {invite.city}</p>
            </motion.footer>
          </motion.main>
        </>
      ) : null}
    </motion.div>
  );
}
