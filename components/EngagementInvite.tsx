"use client";

import { ContentPlate } from "@/components/ContentPlate";
import { Countdown } from "@/components/Countdown";
import { EngagementDecor } from "@/components/EngagementDecor";
import { LotusGarden } from "@/components/LotusGarden";
import { RingsMotif } from "@/components/RingsMotif";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

function Section({
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
    <motion.section
      className={className ?? "engagement-block"}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, delay, ease, type: "spring", stiffness: 110, damping: 20 }}
    >
      {children}
    </motion.section>
  );
}

function Ornament() {
  return <span className="engagement-ornament" aria-hidden="true" />;
}

export function EngagementInvite() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const cardY = useTransform(scrollYProgress, [0, 0.4], [0, -12]);
  const cardScale = useTransform(scrollYProgress, [0, 0.35], [1, 1.01]);

  return (
    <main className="engagement-main">
      <EngagementDecor />
      <LotusGarden />

      <motion.div
        className="engagement-scroll"
        style={reduce ? undefined : { y: cardY, scale: cardScale }}
      >
        <motion.div
          className="engagement-watermark"
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
        >
          H · S
        </motion.div>

        <ContentPlate className="engagement-plate">
          <motion.div
            className="engagement-plate-shimmer"
            aria-hidden="true"
            animate={reduce ? undefined : { x: ["-120%", "140%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
          />

          <Section className="engagement-block engagement-block--hero" delay={0.05}>
            <RingsMotif />
            <motion.p
              className="engagement-kicker"
              animate={reduce ? undefined : { scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {invite.eventTitle}
            </motion.p>
          </Section>

          <Ornament />

          <Section delay={0.12}>
            <p className="engagement-block-label">With the families of</p>
            <p className="engagement-hosts">{invite.hostsGroom}</p>
            <p className="engagement-hosts-and">&</p>
            <p className="engagement-hosts">{invite.hostsBride}</p>
            <p className="engagement-lead">{invite.inviteLine}</p>
          </Section>

          <Ornament />

          <Section delay={0.08}>
            <motion.div
              className="engagement-couple"
              initial={reduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
            >
              <motion.p
                className="engagement-name"
                initial={reduce ? false : { opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.1, ease }}
              >
                {invite.groomFull}
              </motion.p>
              <motion.p
                className="engagement-amp"
                animate={reduce ? undefined : { scale: [1, 1.15, 1], rotate: [0, 4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                &
              </motion.p>
              <motion.p
                className="engagement-name"
                initial={reduce ? false : { opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: 0.22, ease }}
              >
                {invite.brideFull}
              </motion.p>
            </motion.div>
          </Section>

          <Ornament />

          <Section delay={0.1}>
            <motion.div
              className="engagement-date-block"
              whileInView={reduce ? undefined : { scale: [0.94, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
            >
              <span className="engagement-date-side">{invite.dateWeekday}</span>
              <motion.span
                className="engagement-date-day"
                animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {invite.dateDay}
              </motion.span>
              <span className="engagement-date-side">{invite.dateMonthYear}</span>
            </motion.div>
            <p className="engagement-time">{invite.timeLine}</p>
          </Section>

          <Ornament />

          <Section delay={0.08}>
            <p className="engagement-venue-label">Venue</p>
            <address className="engagement-venue-lines">
              {invite.venue.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
          </Section>

          <Ornament />

          <Section className="engagement-block engagement-block--footer" delay={0.05}>
            <p className="engagement-countdown-wrap">
              <Countdown />
            </p>
            <p className="event-maps engagement-maps">
              <a href={invite.venueUrl} target="_blank" rel="noopener noreferrer">
                Open in Maps
              </a>
            </p>
          </Section>
        </ContentPlate>
      </motion.div>
    </main>
  );
}
