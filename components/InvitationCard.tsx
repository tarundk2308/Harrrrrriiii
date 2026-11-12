"use client";

import type { InvitationCard as CardCopy, CardVariant } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const section = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, delay: 0.08 + i * 0.07, ease },
  }),
};

function unionOrder(card: CardCopy): { first: string; second: string } {
  if (card.variant === "christian") {
    return { first: card.bride, second: card.groom };
  }
  return { first: card.groom, second: card.bride };
}

const variantLabel: Record<CardVariant, string> = {
  hindu: "✿",
  christian: "✝",
  reception: "♥",
};

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
      initial={reduce ? false : { opacity: 0, scale: 0.94, rotateX: 8 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.7, ease, type: "spring", stiffness: 120, damping: 18 }}
    >
      <span className="card-ornament card-ornament--tl" aria-hidden="true" />
      <span className="card-ornament card-ornament--br" aria-hidden="true" />
      <motion.span
        className="card-variant-badge"
        aria-hidden="true"
        animate={reduce ? undefined : { scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {variantLabel[card.variant]}
      </motion.span>

      <motion.p
        className="card-headline"
        custom={0}
        variants={section}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true }}
      >
        {card.headline}
      </motion.p>

      <div className="card-sections">
        {card.blessings?.map((blessing, bi) => (
          <motion.section
            key={blessing}
            className="card-section"
            custom={bi + 1}
            variants={section}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="card-blessing" lang="ta">
              {blessing}
            </p>
          </motion.section>
        ))}

        {card.hosts.length > 0 ? (
          <motion.section
            className="card-section"
            custom={2}
            variants={section}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="card-hosts-stack">
              {card.hosts.map((host) => (
                <p key={host} className="card-hosts">
                  {host}
                </p>
              ))}
            </div>
          </motion.section>
        ) : null}

        {!isReception ? (
          <motion.section
            className="card-section"
            custom={3}
            variants={section}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="card-union">
              <motion.p
                className="card-union-name"
                initial={reduce ? false : { opacity: 0, x: card.variant === "christian" ? -12 : 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15, ease }}
              >
                {first}
              </motion.p>
              <motion.p
                className="card-union-with"
                animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                with
              </motion.p>
              <motion.p
                className="card-union-name"
                initial={reduce ? false : { opacity: 0, x: card.variant === "christian" ? 12 : -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.28, ease }}
              >
                {second}
              </motion.p>
              {card.groomRelation ? <p className="card-union-parents">{card.groomRelation}</p> : null}
              {card.brideRelation ? <p className="card-union-parents">{card.brideRelation}</p> : null}
            </div>
          </motion.section>
        ) : null}

        {card.sacrament ? (
          <motion.section
            className="card-section"
            custom={4}
            variants={section}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="card-sacrament">{card.sacrament}</p>
          </motion.section>
        ) : null}

        {card.eventTitle ? (
          <motion.section
            className="card-section"
            custom={4}
            variants={section}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="card-reception-title">{card.eventTitle}</p>
          </motion.section>
        ) : null}

        {isReception && card.profiles ? (
          <motion.section
            className="card-section"
            custom={5}
            variants={section}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="card-profiles">
              {card.profiles.map((p, idx) => (
                <motion.div
                  key={p.name + idx}
                  className="card-person"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease }}
                >
                  <p className="card-person-name">{p.name}</p>
                  {p.detail.map((d) => (
                    <p key={d} className="card-person-detail">
                      {d}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : null}

        <motion.section
          className="card-section"
          custom={6}
          variants={section}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="card-schedule">
            <p className="card-schedule-line">{card.dateLine}</p>
            <p className="card-schedule-line card-schedule-line--time">{card.timeLine}</p>
          </div>
        </motion.section>

        <motion.section
          className="card-section"
          custom={7}
          variants={section}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
        >
          <address className="card-address">
            {card.venue.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
        </motion.section>

        {card.compliments ? (
          <motion.section
            className="card-section"
            custom={8}
            variants={section}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true }}
          >
            <footer className="card-compliments">
              <p className="card-compliments-kicker">Best Compliments From</p>
              <p className="card-compliments-names">{card.compliments}</p>
            </footer>
          </motion.section>
        ) : null}
      </div>
    </motion.article>
  );
}
