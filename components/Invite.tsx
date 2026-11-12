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
  const venue = invite.venue ? (
    <li>
      {invite.venueUrl ? (
        <a className="venue-link" href={invite.venueUrl}>
          {invite.venue}
        </a>
      ) : (
        invite.venue
      )}
    </li>
  ) : null;

  return (
    <ul className="facts">
      <li>
        {invite.weekday}, {invite.dateLine}
      </li>
      <li>{invite.timeLine}</li>
      {venue}
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
    initial={{ opacity: 0 }}
    animate={revealed ? { opacity: 1 } : { opacity: 0 }}
    transition={{ duration: reduce ? 0 : 0.85, ease }}
  >
    {revealed ? (
      <>
        <motion.div className="progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
        <p className="sr-only">
          Engagement of {invite.groom} aka {invite.groomAlias} and {invite.bride} on {invite.weekday},{" "}
          {invite.dateLine}, at{" "}
          {invite.timeLine}, in {invite.city}. Everything this evening happens under the blessing of
          godfather {invite.godfather}.
        </p>

        <main>
          <section className="blessing-crown" aria-label="Blessing">
            <ContentPlate className="plate-blessing">
              <Jasmine />
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduce ? 0 : 1.05, delay: 0.12, ease }}
              >
                <p className="crown-lead">Everything this evening happens under the blessing of</p>
                <p className="crown-role">{invite.godfatherRole}</p>
                <p className="crown-name">{invite.godfather}</p>
                <p lang="ta" className="crown-tamil">
                  {invite.blessingTamil}
                </p>
              </motion.div>
            </ContentPlate>
          </section>

          <section className="hero" aria-labelledby="names">
            <ContentPlate className="plate-hero">
              <div className="hero-glow" aria-hidden="true" />
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
                <span className="eyebrow-en">Engagement</span>
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

          <section className="evening-light" aria-label="The evening">
            <ContentPlate className="plate-evening evening-light-inner">
              <Reveal>
                <p className="kicker-light">The evening</p>
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
                <p className="time-sub-light">in the evening · Chennai</p>
                <p className="mood-light">
                  A December evening.
                  <br />
                  Jasmine, and the sea.
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
                <div className="card-rule" aria-hidden="true" />
                <p className="card-blessing">
                  Under the blessing of godfather
                  <strong>{invite.godfather}</strong>
                </p>
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
