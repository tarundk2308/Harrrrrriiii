"use client";

import { PinterestPinArt } from "@/components/PinterestPinArt";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function EngagementInvite() {
  const reduce = useReducedMotion();

  return (
    <main className="pinterest-feed">
      <motion.article
        className="pinterest-pin"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        <PinterestPinArt />

        <div className="pinterest-pin__copy">
          <p className="pinterest-pin__eyebrow">{invite.eventTitle}</p>

          <h1 className="pinterest-pin__title">
            {invite.groomFull}
            <span className="pinterest-pin__amp"> & </span>
            {invite.brideFull}
          </h1>

          <p className="pinterest-pin__meta">
            <span>{invite.dateWeekday}</span>
            <span className="pinterest-pin__meta-day">{invite.dateDay}</span>
            <span>{invite.dateMonthYear}</span>
            <span className="pinterest-pin__meta-dot" aria-hidden="true">
              ·
            </span>
            <span>{invite.timeLine}</span>
          </p>

          <div className="pinterest-pin__venue">
            <p className="pinterest-pin__venue-label">Venue</p>
            <address>
              <span>{invite.venueName}</span>
              <span>{invite.venueRoom}</span>
              <span>{invite.venueAddress}</span>
            </address>
          </div>

          <a
            className="pinterest-pin__cta"
            href={invite.venueUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get directions
          </a>
        </div>
      </motion.article>
    </main>
  );
}
