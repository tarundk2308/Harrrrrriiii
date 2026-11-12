"use client";

import { ContentPlate } from "@/components/ContentPlate";
import { Countdown } from "@/components/Countdown";
import { Kolam } from "@/components/Kolam";
import { StoryChapterSection } from "@/components/StoryChapter";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { y: 28, opacity: 0.85 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-4% 0px" }}
      transition={{ duration: reduce ? 0 : 0.65, delay, ease, type: "spring", stiffness: 110, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

export function Invite({ revealed }: { revealed: boolean }) {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 90], [1, 0]);

  return (
    <motion.div
      className="invite-surface"
      initial={false}
      animate={
        revealed
          ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.94, y: 18, filter: "blur(6px)", pointerEvents: "none" }
      }
      transition={{
        duration: reduce ? 0 : 0.85,
        ease,
        type: "spring",
        stiffness: 140,
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
                  <motion.span
                    className="amp"
                    aria-hidden="true"
                    animate={reduce ? undefined : { scale: [1, 1.12, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  >
                    &
                  </motion.span>
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
              {invite.chapters.map((chapter, i) => (
                <Reveal key={chapter.id} delay={i * 0.08}>
                  <StoryChapterSection chapter={chapter} index={i} />
                </Reveal>
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
