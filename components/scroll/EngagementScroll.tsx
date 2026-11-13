"use client";

import { PressedFlowerField } from "@/components/floral/PressedFlowerField";
import { MainFloralBackdrop } from "@/components/scroll/MainFloralBackdrop";
import { MAIN_FLOWERS } from "@/lib/pressedFlowers";
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
      <MainFloralBackdrop container={scrollRef} />
      <PressedFlowerField
        flowers={MAIN_FLOWERS}
        container={scrollRef}
        ambient
        preload
        className="pressed-flower-layer--main"
      />
      <ScrollMotionDecor container={scrollRef} />
      <ScrollProgressBar container={scrollRef} />
      <div className="scroll-doc scroll-doc--plain" ref={scrollRef}>
        <ScrollChapters scrollRef={scrollRef} />
      </div>
    </motion.div>
  );
}
