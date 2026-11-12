"use client";

import { ContentPlate } from "@/components/ContentPlate";
import { Countdown } from "@/components/Countdown";
import { Kolam } from "@/components/Kolam";
import { StoryChapterSection } from "@/components/StoryChapter";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

function ChapterScrollReveal({
  index,
  children,
}: {
  index: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.92", "start 0.35"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0.4, 0.92, 1]);

  if (reduce) {
    return <div className="story-chapter-reveal">{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className="story-chapter-reveal"
      style={{ y, opacity }}
    >
      {children}
    </motion.div>
  );
}

export function Invite({ revealed, rising }: { revealed: boolean; rising?: boolean }) {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 90], [1, 0]);

  return (
    <motion.div
      className="invite-surface"
      initial={false}
      animate={
        revealed
          ? {
              opacity: 1,
              scale: 1,
              y: 0,
            }
          : { opacity: 0, y: 24, pointerEvents: "none" }
      }
      transition={{
        duration: reduce ? 0 : rising ? 0.95 : 0.4,
        delay: reduce ? 0 : rising ? 0.32 : 0,
        ease,
        type: "spring",
        stiffness: 120,
        damping: 22,
      }}
    >
      {revealed ? (
        <>
          <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
          <p className="sr-only">
            Wedding of {invite.groomFull} and {invite.brideFull}, {invite.weddingDateLine}, {invite.city}.
          </p>

          <main className="wedding-main">
            <section className="hero hero-wedding" aria-labelledby="names">
              <ContentPlate className="plate-hero plate-hero--compact">
                <Kolam className="kolam-small" />

                <motion.h1
                  id="names"
                  className="names names-wedding"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, delay: 0.12, ease }}
                >
                  <span className="names-wedding-line">{invite.groomFull}</span>
                  <span className="amp" aria-hidden="true">
                    &
                  </span>
                  <span className="names-wedding-line">{invite.brideFull}</span>
                </motion.h1>

                <motion.p
                  className="hero-date"
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease }}
                >
                  {invite.weddingDateLine}
                  <span className="hero-city">
                    <span aria-hidden="true"> · </span>
                    {invite.city}
                  </span>
                </motion.p>

                <motion.p
                  className="story-lead"
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.55, ease }}
                >
                  {invite.storyLead}
                </motion.p>

                <Countdown />
              </ContentPlate>

              <motion.div className="scroll-cue" style={{ opacity: cueOpacity }} aria-hidden="true">
                <span>Scroll</span>
                <i />
              </motion.div>
            </section>

            <div className="story-timeline" aria-label="Wedding day">
              <span className="story-timeline-rail" aria-hidden="true" />
              {invite.chapters.map((chapter, i) => (
                <ChapterScrollReveal key={chapter.id} index={i}>
                  <StoryChapterSection chapter={chapter} index={i} />
                </ChapterScrollReveal>
              ))}
            </div>

            <footer className="end">
              <ContentPlate className="plate-end plate-end--minimal">
                <p className="end-names">
                  {invite.groomFull} & {invite.brideFull}
                </p>
                <p className="end-meta">
                  {invite.city} · {invite.weddingDateLine}
                </p>
              </ContentPlate>
            </footer>
          </main>
        </>
      ) : null}
    </motion.div>
  );
}
