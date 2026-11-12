"use client";

import { AnimatedFloralStrip } from "@/components/AnimatedFloralStrip";
import { LotusGarden } from "@/components/LotusGarden";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const stagger = 0.1;

function PinSection({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function EngagementInvite() {
  const reduce = useReducedMotion();

  return (
    <main className="pin-board">
      <LotusGarden />

      <div className="pin-masonry">
        <motion.article
          className="pin pin--hero"
          initial={reduce ? false : { opacity: 0, y: 28, rotate: -1.2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="pin-cover" aria-hidden="true">
            <AnimatedFloralStrip
              src="/images/engagement-florals.jpg"
              width={1024}
              height={144}
              imageClassName="pin-cover-florals"
              washClassName="pin-cover-wash"
            />
            <span className="pin-chip">{invite.eventTitle}</span>
          </div>

          <div className="pin-body">
            <h1 className="pin-couple">
              <span className="pin-name">{invite.groomFull}</span>
              <span className="pin-amp" aria-hidden="true">
                &
              </span>
              <span className="pin-name">{invite.brideFull}</span>
            </h1>
          </div>
        </motion.article>

        <motion.div
          className="pin-row"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: stagger, ease }}
        >
          <PinSection className="pin pin--tile pin--date" delay={stagger}>
            <p className="pin-tile-label">When</p>
            <motion.div className="pin-date-line" aria-label={invite.dateLine}>
              <span>{invite.dateWeekday}</span>
              <strong>{invite.dateDay}</strong>
              <span>{invite.dateMonthYear}</span>
            </motion.div>
            <p className="pin-time">{invite.timeLine}</p>
          </PinSection>

          <PinSection className="pin pin--tile pin--venue" delay={stagger * 2}>
            <p className="pin-tile-label pin-tile-label--script">Venue</p>
            <address className="pin-venue">
              <span>{invite.venueName}</span>
              <span>{invite.venueRoom}</span>
              <span>{invite.venueAddress}</span>
            </address>
            <a
              className="pin-save"
              href={invite.venueUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </PinSection>
        </motion.div>
      </div>
    </main>
  );
}
