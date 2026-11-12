"use client";

import { FreshFloralIllustration } from "@/components/FreshFloralIllustration";
import { PinterestPinArt } from "@/components/PinterestPinArt";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function EngagementInvite() {
  const reduce = useReducedMotion();

  return (
    <main className="pinterest-feed">
      <div className="pinterest-grid">
        <motion.article
          className="pinterest-pin pinterest-pin--hero"
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
          </div>
        </motion.article>

        <motion.article
          className="pinterest-pin pinterest-pin--details"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease }}
        >
          <div className="pinterest-pin__media pinterest-pin__media--compact" aria-hidden="true">
            <div className="pinterest-pin__sky pinterest-pin__sky--compact" />
            <FreshFloralIllustration variant="compact" />
            <div className="pinterest-pin__date-card">
              <span className="pinterest-pin__date-weekday">{invite.dateWeekday}</span>
              <span className="pinterest-pin__date-num">{invite.dateDay}</span>
              <span className="pinterest-pin__date-month">{invite.dateMonthYear}</span>
            </div>
          </div>

          <div className="pinterest-pin__copy">
            <p className="pinterest-pin__eyebrow">When</p>
            <p className="pinterest-pin__time-line">{invite.timeLine}</p>

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
      </div>
    </main>
  );
}
