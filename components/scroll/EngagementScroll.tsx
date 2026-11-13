"use client";

import { FallingFlowers } from "@/components/FallingFlowers";
import { MainFloralBackdrop } from "@/components/scroll/MainFloralBackdrop";
import { ScrollChapters } from "@/components/scroll/ScrollChapters";
import { ScrollMotionDecor } from "@/components/scroll/ScrollMotionDecor";
import { ScrollProgressBar } from "@/components/scroll/ScrollProgressBar";
import { motion } from "framer-motion";
import { useRef } from "react";

export function EngagementScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className="scroll-root scroll-root--plain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      <MainFloralBackdrop />
      <ScrollMotionDecor container={scrollRef} />
      <FallingFlowers />
      <ScrollProgressBar container={scrollRef} />
      <div className="scroll-doc scroll-doc--plain" ref={scrollRef}>
        <ScrollChapters scrollRef={scrollRef} />
      </div>
    </motion.div>
  );
}
