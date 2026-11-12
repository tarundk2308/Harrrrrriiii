"use client";

import { InvitationCard } from "@/components/InvitationCard";
import type { StoryChapter } from "@/lib/invite";
import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function StoryChapterSection({
  chapter,
  index,
}: {
  chapter: StoryChapter;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <section
      className={`story-chapter story-chapter--${chapter.id}`}
      aria-labelledby={`chapter-${chapter.id}`}
    >
      <motion.header
        className="story-chapter-head"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.65, delay: index * 0.06, ease }}
      >
        <motion.p
          className="story-part"
          aria-hidden="true"
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.05 }}
        >
          {chapter.part}
        </motion.p>
        <h2 id={`chapter-${chapter.id}`} className="story-when">
          {chapter.when}
        </h2>
        <motion.p
          className="story-beat"
          initial={reduce ? false : { opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.06em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.12, ease }}
        >
          {chapter.subtitle}
        </motion.p>
        <span className="story-chapter-sparkle" aria-hidden="true" />
      </motion.header>

      <ol className="story-cards" start={1}>
        {chapter.cards.map((card) => (
          <li key={`${chapter.id}-${card.variant}`} className="story-cards-item">
            <InvitationCard card={card} chapterId={chapter.id} />
          </li>
        ))}
      </ol>

      {chapter.venueUrl ? (
        <motion.p
          className="event-maps story-maps"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <a href={chapter.venueUrl} target="_blank" rel="noopener noreferrer">
            Open in Maps
          </a>
        </motion.p>
      ) : null}

      {index < 2 ? (
        <motion.p
          className="story-continued"
          aria-hidden="true"
          animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          ···
        </motion.p>
      ) : null}
    </section>
  );
}
