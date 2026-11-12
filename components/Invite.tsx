"use client";

import { ContentPlate } from "@/components/ContentPlate";
import { Countdown } from "@/components/Countdown";
import { GroomName } from "@/components/GroomName";
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
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.15, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

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
      initial={reduce ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -8% 0px" }}
      transition={{ duration: reduce ? 0 : 0.95, delay, ease }}
    >
      {children}
    </motion.div>
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
      <li className="city-line">
        <span>{invite.city}</span>
        <span lang="ta" className="tamil-inline">
          {invite.cityTamil}
        </span>
      </li>
    </ul>
  );
}

export function Invite({ revealed }: { revealed: boolean }) {
  const reduce = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 90], [1, 0]);

  return (
    <motion.div
      className="invite-surface"
      initial={{ opacity: 0 }}
      animate={revealed ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.45, ease }}
    >
      {revealed ? (
        <>
          <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
          <p className="sr-only">
            Betrothal of {invite.groom} and {invite.bride} on {invite.weekday}, {invite.dateLine}, at{" "}
            {invite.timeLine}, in {invite.city}.
          </p>

          <main>
            <section className="hero" aria-labelledby="names">
              <ContentPlate className="plate-hero">
                <div className="hero-glow" aria-hidden="true" />
                <Jasmine />
                <Kolam />

                <motion.p
                  className="eyebrow"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.35, ease }}
                >
                  <span lang="ta" className="tamil">
                    {invite.occasionTamil}
                  </span>
                  <span className="eyebrow-en">{invite.eventTitle}</span>
                </motion.p>

                <h1 id="names" className="names">
                  <Rise delay={0.45}>
                    <GroomName />
                  </Rise>
                  <Rise delay={0.62} className="amp">
                    &
                  </Rise>
                  <Rise delay={0.78}>{invite.bride}</Rise>
                </h1>

                <motion.span
                  className="rule"
                  aria-hidden="true"
                  initial={reduce ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 1.05, ease }}
                />

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.15, ease }}
                >
                  <Facts />
                </motion.div>
              </ContentPlate>

              <motion.div className="scroll-cue" style={{ opacity: cueOpacity }} aria-hidden="true">
                <span>Scroll</span>
                <i />
              </motion.div>
            </section>

            <section className="evening-light" aria-label="When">
              <ContentPlate className="plate-evening evening-light-inner">
                <Reveal>
                  <p className="kicker-light">When</p>
                </Reveal>
                <motion.p
                  className="time-light"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ duration: reduce ? 0 : 1.05, ease }}
                >
                  <time dateTime={invite.iso}>{invite.timeDisplay}</time>
                </motion.p>
                <Reveal delay={0.08}>
                  <p className="time-sub-light">
                    {invite.timeLine} · {invite.city}
                  </p>
                  <p className="mood-light">
                    {invite.weekday}, {invite.dateLine}.
                    <br />
                    We hope to see you there.
                  </p>
                </Reveal>
                <Countdown />
              </ContentPlate>
            </section>

            <section className="keepsake" aria-label="Invitation card">
              <Reveal>
                <article className="card">
                  <div className="monogram" aria-hidden="true">
                    <span>H</span>
                    <span className="mono-dot">·</span>
                    <span>S</span>
                  </div>
                  <p lang="ta" className="tamil">
                    {invite.occasionTamil}
                  </p>
                  <p className="card-invite">You are invited</p>
                  <p className="card-names">
                    <GroomName variant="card" />
                    <span className="amp">&</span>
                    {invite.bride}
                  </p>
                  <div className="card-rule" aria-hidden="true" />
                  <Facts />
                </article>
              </Reveal>
            </section>

            <footer className="end">
              <ContentPlate className="plate-end">
                <Kolam className="kolam-small" when="view" />
                <p>
                  <GroomName variant="inline" /> & {invite.bride}
                </p>
                <p className="end-meta">
                  {invite.city} · {invite.dateLine}
                </p>
              </ContentPlate>
            </footer>
          </main>
        </>
      ) : null}
    </motion.div>
  );
}
