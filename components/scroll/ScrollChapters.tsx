"use client";

import { Countdown } from "@/components/Countdown";
import { ChapterGrandFrame } from "@/components/scroll/ChapterGrandFrame";
import { ScrollBridge } from "@/components/scroll/ScrollBridge";
import { ScrollSection } from "@/components/scroll/ScrollSection";
import { invite } from "@/lib/invite";
import { motion, useScroll, useTransform } from "framer-motion";
import type { RefObject } from "react";

function PersonBlock({
  kicker,
  name,
  parentTitle,
  father,
  mother,
  fromLeft,
}: {
  kicker: string;
  name: string;
  parentTitle: string;
  father: string;
  mother: string;
  fromLeft: boolean;
}) {
  return (
    <motion.div
      className="person-block"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.55 }}
      transition={{ duration: 0.65, delay: 0.12 }}
    >
      <p className="chapter__kicker">{kicker}</p>
      <h2 className="chapter__name">{name}</h2>
      <p className="parents__lead">{parentTitle}</p>
      <ul className="parents__list">
        <li>{father}</li>
        <li>{mother}</li>
      </ul>
    </motion.div>
  );
}

function BridgeExtras({ container }: { container: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({ container, offset: ["0.38", "0.62"] as const });
  const spread = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.15, 0.85]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);

  return (
    <motion.div className="scroll-bridge-extras" style={{ scale: spread, rotate }}>
      <span />
      <span />
      <span />
    </motion.div>
  );
}

export function ScrollChapters({
  scrollRef,
  staticLayout,
}: {
  scrollRef?: RefObject<HTMLElement | null>;
  staticLayout?: boolean;
}) {
  const wrapClass = staticLayout ? "chapters chapters--static" : "chapters";

  const coupleSection =
    scrollRef ? (
      <ScrollSection container={scrollRef} className="chapter--couple">
        <ChapterGrandFrame decorSeed="couple" className="chapter__frame--blush">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
          >
            <span lang="ta">{invite.occasionTamil}</span>
            <span>{invite.eventTitle}</span>
          </motion.p>
          <PersonBlock
            fromLeft
            kicker="Groom"
            name={invite.groom}
            parentTitle="Son of"
            father={invite.groomParents.father}
            mother={invite.groomParents.mother}
          />
          <div className="chapter__rule chapter__rule--gold" aria-hidden="true" />
          <PersonBlock
            fromLeft={false}
            kicker="Bride"
            name={invite.bride}
            parentTitle="Daughter of"
            father={invite.brideParents.father}
            mother={invite.brideParents.mother}
          />
        </ChapterGrandFrame>
      </ScrollSection>
    ) : (
      <section className="chapter chapter--couple">
        <ChapterGrandFrame decorSeed="couple" className="chapter__frame--blush">
          <p className="eyebrow">
            <span lang="ta">{invite.occasionTamil}</span>
            <span>{invite.eventTitle}</span>
          </p>
          <PersonBlock
            fromLeft
            kicker="Groom"
            name={invite.groom}
            parentTitle="Son of"
            father={invite.groomParents.father}
            mother={invite.groomParents.mother}
          />
          <div className="chapter__rule chapter__rule--gold" aria-hidden="true" />
          <PersonBlock
            fromLeft={false}
            kicker="Bride"
            name={invite.bride}
            parentTitle="Daughter of"
            father={invite.brideParents.father}
            mother={invite.brideParents.mother}
          />
        </ChapterGrandFrame>
      </section>
    );

  const venueSection =
    scrollRef ? (
      <ScrollSection container={scrollRef} className="chapter--venue chapter--venue-stack">
        <ChapterGrandFrame decorSeed="venue" className="chapter__frame--mint">
          <p className="chapter__kicker">When &amp; where</p>
          <motion.p
            className="when__day"
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.55 }}
            transition={{ duration: 0.55, type: "spring", stiffness: 120 }}
          >
            {invite.weekday}, {invite.dateLine}
          </motion.p>
          <motion.p
            className="when__time"
            initial={{ opacity: 0, letterSpacing: "0.04em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.14em" }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {invite.timeLine}
          </motion.p>
          <div className="chapter__rule chapter__rule--gold" aria-hidden="true" />
          <motion.ul
            className="venue"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            {invite.venueLines.map((line, i) => (
              <motion.li
                key={line}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.45, delay: 0.08 * i }}
              >
                {line}
              </motion.li>
            ))}
          </motion.ul>
          <motion.a
            className="maps-btn"
            href={invite.venueUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            Open in Maps
          </motion.a>
        </ChapterGrandFrame>
        <motion.div
          className="countdown-strip countdown-strip--below"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <Countdown />
        </motion.div>
      </ScrollSection>
    ) : (
      <section className="chapter chapter--venue chapter--venue-stack">
        <ChapterGrandFrame decorSeed="venue" className="chapter__frame--mint">
          <p className="chapter__kicker">When &amp; where</p>
        </ChapterGrandFrame>
        <div className="countdown-strip countdown-strip--below">
          <Countdown />
        </div>
      </section>
    );

  return (
    <div className={wrapClass}>
      {coupleSection}
      {scrollRef ? (
        <>
          <BridgeExtras container={scrollRef} />
          <ScrollBridge container={scrollRef} />
        </>
      ) : (
        <div className="scroll-bridge scroll-bridge--static" />
      )}
      {venueSection}
    </div>
  );
}
