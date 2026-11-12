"use client";

import { InvitationCard } from "@/components/InvitationCard";
import type { StoryChapter } from "@/lib/invite";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export function StoryChapterSection({
  chapter,
  index,
}: {
  chapter: StoryChapter;
  index: number;
}) {
  const reduce = useReducedMotion();
  const headRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: headRef,
    offset: ["start 0.9", "start 0.45"],
  });

  const partScale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);
  const partOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0.3, 1, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <section
      className={`story-chapter story-chapter--${chapter.id}`}
      aria-labelledby={`chapter-${chapter.id}`}
      data-chapter-index={index}
    >
      <header ref={headRef} className="story-chapter-head">
        <motion.p
          className="story-part"
          aria-hidden="true"
          style={reduce ? undefined : { scale: partScale, opacity: partOpacity }}
        >
          {chapter.part}
        </motion.p>
        <motion.h2
          id={`chapter-${chapter.id}`}
          className="story-when"
          style={reduce ? undefined : { y: titleY }}
        >
          {chapter.when}
        </motion.h2>
        <motion.p
          className="story-beat"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08, ease }}
        >
          {chapter.subtitle}
        </motion.p>
      </header>

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
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.15, ease }}
        >
          <a href={chapter.venueUrl} target="_blank" rel="noopener noreferrer">
            Open in Maps
          </a>
        </motion.p>
      ) : null}

      {index < 2 ? <p className="story-continued" aria-hidden="true" /> : null}
    </section>
  );
}
