"use client";

import type { InvitationCard as CardCopy } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

function unionOrder(card: CardCopy): { first: string; second: string } {
  if (card.variant === "christian") {
    return { first: card.bride, second: card.groom };
  }
  return { first: card.groom, second: card.bride };
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
  const { first, second } = unionOrder(card);

  return (
    <motion.article
      className={`invitation-card invitation-card--${card.variant}`}
      data-chapter={chapterId}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.55, ease }}
    >
      <p className="card-headline">{card.headline}</p>

      <div className="card-sections">
        {card.blessings?.map((blessing) => (
          <section key={blessing} className="card-section">
            <p className="card-blessing" lang="ta">
              {blessing}
            </p>
          </section>
        ))}

        {card.hosts.length > 0 ? (
          <section className="card-section">
            <div className="card-hosts-stack">
              {card.hosts.map((host) => (
                <div key={host.family} className="card-host-block">
                  <p className="card-host-family">{host.family} family</p>
                  <p className="card-hosts">{host.line}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {!isReception ? (
          <section className="card-section">
            <div className="card-union">
              <p className="card-union-name">{first}</p>
              <p className="card-union-with">with</p>
              <p className="card-union-name">{second}</p>
            </div>
          </section>
        ) : null}

        {card.eventTitle ? (
          <section className="card-section">
            <p className="card-reception-title">{card.eventTitle}</p>
          </section>
        ) : null}

        {isReception && card.profiles ? (
          <section className="card-section">
            <div className="card-profiles">
              {card.profiles.map((p, idx) => (
                <div key={p.name + idx} className="card-person">
                  <p className="card-person-name">{p.name}</p>
                  {p.detail.map((d) => (
                    <p key={d} className="card-person-detail">
                      {d}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="card-section">
          <div className="card-schedule">
            <p className="card-schedule-line">{card.dateLine}</p>
            <p className="card-schedule-line card-schedule-line--time">{card.timeLine}</p>
          </div>
        </section>

        <section className="card-section">
          <address className="card-address">
            {card.venue.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
        </section>

        {card.compliments ? (
          <section className="card-section">
            <footer className="card-compliments">
              <p className="card-compliments-kicker">Best Compliments From</p>
              <p className="card-compliments-names">{card.compliments}</p>
            </footer>
          </section>
        ) : null}
      </div>
    </motion.article>
  );
}
