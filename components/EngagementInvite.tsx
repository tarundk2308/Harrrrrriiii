"use client";

import { ContentPlate } from "@/components/ContentPlate";
import { Countdown } from "@/components/Countdown";
import { LotusGarden } from "@/components/LotusGarden";
import { RingsMotif } from "@/components/RingsMotif";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

function Line({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.p
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.p>
  );
}

export function EngagementInvite() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const cardLift = useTransform(scrollYProgress, [0, 0.35], [0, -8]);

  return (
    <main className="engagement-main">
      <LotusGarden />

      <motion.div className="engagement-scroll" style={reduce ? undefined : { y: cardLift }}>
        <motion.div
          className="engagement-monogram"
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.1 }}
        >
          <span className="engagement-monogram-h">H</span>
          <span className="engagement-monogram-s">S</span>
        </motion.div>

        <ContentPlate className="engagement-plate">
          <RingsMotif />

          <motion.p
            className="engagement-kicker"
            initial={reduce ? false : { opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.28em" }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
          >
            {invite.eventTitle}
          </motion.p>

          <Line className="engagement-hosts" delay={0.35}>
            {invite.hostsGroom}
          </Line>
          <Line className="engagement-hosts-and" delay={0.42}>
            &
          </Line>
          <Line className="engagement-hosts" delay={0.48}>
            {invite.hostsBride}
          </Line>

          <Line className="engagement-lead" delay={0.58}>
            {invite.inviteLine}
          </Line>

          <motion.div
            className="engagement-couple"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.72, ease }}
          >
            <motion.p
              className="engagement-name engagement-name--groom"
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease }}
            >
              {invite.groomFull}
            </motion.p>
            <motion.p
              className="engagement-amp"
              animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              &
            </motion.p>
            <motion.p
              className="engagement-name engagement-name--bride"
              initial={reduce ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.92, ease }}
            >
              {invite.brideFull}
            </motion.p>
          </motion.div>

          <motion.div
            className="engagement-date-block"
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 1.05, ease }}
          >
            <span className="engagement-date-side">{invite.dateWeekday}</span>
            <span className="engagement-date-day">{invite.dateDay}</span>
            <span className="engagement-date-side">{invite.dateMonthYear}</span>
          </motion.div>

          <Line className="engagement-time" delay={1.18}>
            {invite.timeLine}
          </Line>

          <motion.div
            className="engagement-venue"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.28, ease }}
          >
            <p className="engagement-venue-label">Venue</p>
            <address className="engagement-venue-lines">
              {invite.venue.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </motion.div>

          <motion.p
            className="engagement-countdown-wrap"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <Countdown />
          </motion.p>

          <motion.p
            className="event-maps engagement-maps"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.52, duration: 0.5 }}
          >
            <a href={invite.venueUrl} target="_blank" rel="noopener noreferrer">
              Open in Maps
            </a>
          </motion.p>
        </ContentPlate>
      </motion.div>
    </main>
  );
}
