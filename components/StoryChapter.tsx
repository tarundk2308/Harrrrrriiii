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
      data-chapter-index={index}
    >
      <motion.header
        className="story-chapter-head"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.5, ease }}
      >
        <p className="story-part" aria-hidden="true">
          {chapter.part}
        </p>
        <h2 id={`chapter-${chapter.id}`} className="story-when">
          {chapter.when}
        </h2>
        <p className="story-beat">{chapter.subtitle}</p>
      </motion.header>

      <ol className="story-cards" start={1}>
        {chapter.cards.map((card) => (
          <li key={`${chapter.id}-${card.variant}`} className="story-cards-item">
            <InvitationCard card={card} chapterId={chapter.id} />
          </li>
        ))}
      </ol>

      {chapter.venueUrl ? (
        <p className="event-maps story-maps">
          <a href={chapter.venueUrl} target="_blank" rel="noopener noreferrer">
            Open in Maps
          </a>
        </p>
      ) : null}

      {index < 2 ? <p className="story-continued" aria-hidden="true" /> : null}
    </section>
  );
}
