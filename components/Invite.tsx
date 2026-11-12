"use client";

import { ContentPlate } from "@/components/ContentPlate";
import { Countdown } from "@/components/Countdown";
import { GroomName } from "@/components/GroomName";
import { HeroSparkles } from "@/components/HeroSparkles";
import { Jasmine } from "@/components/Jasmine";
import { Kolam } from "@/components/Kolam";
import { invite } from "@/lib/invite";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

function Rise({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span className={`mask ${className ?? ""}`}>
      <motion.span
        className="mask-inner"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.85, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Facts() {
  return (
    <ul className="facts">
      <li>
        {invite.weekday}, {invite.dateLine}
      </li>
      <li>{invite.timeLine}</li>
      {invite.venueLines.map((line) => (
        <li key={line}>
          {line === invite.venueLines[0] && invite.venueUrl ? (
            <a className="venue-link" href={invite.venueUrl}>
              {line}
            </a>
          ) : (
            line
          )}
        </li>
      ))}
    </ul>
  );
}

export function Invite({ revealed }: { revealed: boolean }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="invite-surface"
      initial={{ opacity: 0 }}
      animate={revealed ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.65, ease }}
    >
      {revealed ? (
        <>
          <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
          <main>
            <section className="hero hero--solo" aria-labelledby="names">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.85, ease, type: "spring", stiffness: 90, damping: 18 }}
              >
                <ContentPlate className="plate-hero plate-hero--animated">
                  <div className="hero-glow" aria-hidden="true" />
                  <HeroSparkles />
                  <motion.div
                    animate={reduce ? undefined : { y: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Jasmine />
                  </motion.div>
                  <motion.div
                    animate={reduce ? undefined : { rotate: [0, 3, -2, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Kolam />
                  </motion.div>

                  <motion.p
                    className="eyebrow"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15, ease }}
                  >
                    <span lang="ta" className="tamil">
                      {invite.occasionTamil}
                    </span>
                    <span className="eyebrow-en">{invite.eventTitle}</span>
                  </motion.p>

                  <h1 id="names" className="names names--cute">
                    <Rise delay={0.22}>
                      <GroomName />
                    </Rise>
                    <Rise delay={0.35} className="amp">
                      &
                    </Rise>
                    <Rise delay={0.48}>{invite.bride}</Rise>
                  </h1>

                  <motion.span
                    className="rule"
                    aria-hidden="true"
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.65, delay: 0.55, ease }}
                  />

                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.62, ease }}
                  >
                    <Facts />
                  </motion.div>

                  <motion.div
                    className="hero-countdown"
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.85, ease }}
                  >
                    <Countdown />
                  </motion.div>

                  <motion.p
                    className="hero-maps"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.05, ease }}
                  >
                    <a href={invite.venueUrl} target="_blank" rel="noopener noreferrer">
                      Open in Maps
                    </a>
                  </motion.p>
                </ContentPlate>
              </motion.div>
            </section>
          </main>
        </>
      ) : null}
    </motion.div>
  );
}
