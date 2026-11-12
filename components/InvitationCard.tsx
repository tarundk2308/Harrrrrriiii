"use client";

import type { InvitationCard as CardCopy } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

function CardBlock({
  delay,
  children,
  className,
}: {
  delay: number;
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      className={className ?? "card-section"}
      initial={reduce ? false : { opacity: 0, y: 28, x: -8 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.6, delay, ease, type: "spring", stiffness: 130, damping: 22 }}
    >
      {children}
    </motion.section>
  );
}

export function InvitationCard({
  card,
  chapterId,
}: {
  card: CardCopy;
  chapterId: string;
}) {
  const reduce = useReducedMotion();
  const isReception = card.variant === "reception";
  let block = 0;

  return (
    <motion.article
      className={`invitation-card invitation-card--${card.variant}`}
      data-chapter={chapterId}
      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.65, ease, type: "spring", stiffness: 140, damping: 20 }}
    >
      <motion.p
        className="card-headline"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      >
        {card.headline}
      </motion.p>

      <div className="card-sections">
        {card.hosts.length > 0 ? (
          <CardBlock delay={block++ * 0.06}>
            <div className="card-hosts-stack">
              {card.hosts.map((host) => (
                <div key={host.family} className="card-host-block">
                  <p className="card-host-family">{host.family} family</p>
                  <p className="card-hosts">{host.line}</p>
                </div>
              ))}
            </div>
          </CardBlock>
        ) : null}

        {isReception && card.profiles ? (
          <CardBlock delay={block++ * 0.06}>
            <div className="card-profiles">
              {card.profiles.map((p, idx) => (
                <motion.div
                  key={p.role}
                  className="card-person"
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.08 + idx * 0.1, ease }}
                >
                  <p className="card-person-name">{p.role}</p>
                  {p.detail.map((line) => (
                    <p key={line} className="card-person-detail">
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </CardBlock>
        ) : null}

        <CardBlock delay={block++ * 0.06}>
          <p className="card-schedule-line card-schedule-line--time">{card.timeLine}</p>
        </CardBlock>

        <CardBlock delay={block++ * 0.06}>
          <address className="card-address">
            {card.venue.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
        </CardBlock>

        {card.compliments ? (
          <CardBlock delay={block++ * 0.06}>
            <footer className="card-compliments">
              <p className="card-compliments-kicker">Best Compliments From</p>
              <p className="card-compliments-names">{card.compliments}</p>
            </footer>
          </CardBlock>
        ) : null}
      </div>
    </motion.article>
  );
}
