"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type SliceConfig = {
  id: string;
  left: string;
  width: string;
  imgShift: string;
  origin: string;
  duration: number;
  delay: number;
  rotate: number[];
  y: number[];
  x: number[];
};

const SLICES: SliceConfig[] = [
  {
    id: "left",
    left: "0%",
    width: "42%",
    imgShift: "0%",
    origin: "22% 100%",
    duration: 7.5,
    delay: 0,
    rotate: [0, 3.2, -2.4, 2, 0],
    y: [0, -8, 3, -5, 0],
    x: [0, 5, -4, 2, 0],
  },
  {
    id: "center",
    left: "28%",
    width: "44%",
    imgShift: "-63.6%",
    origin: "50% 100%",
    duration: 6.2,
    delay: 0.4,
    rotate: [0, -2.8, 2.2, -1.5, 0],
    y: [0, -10, 4, -6, 0],
    x: [0, -3, 4, -2, 0],
  },
  {
    id: "right",
    left: "58%",
    width: "42%",
    imgShift: "-138%",
    origin: "78% 100%",
    duration: 8,
    delay: 0.85,
    rotate: [0, -2.5, 3.5, -2, 0],
    y: [0, -7, 5, -4, 0],
    x: [0, -5, 3, -3, 0],
  },
];

export function AnimatedFloralStrip({
  src,
  width,
  height,
  imageClassName = "",
  washClassName = "floral-strip-wash",
}: {
  src: string;
  width: number;
  height: number;
  imageClassName?: string;
  washClassName?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className={imageClassName}
        priority
      />
    );
  }

  return (
    <div className="floral-strip" aria-hidden="true">
      <div className={washClassName} />
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        className={`floral-strip-ghost ${imageClassName}`}
        priority
      />
      {SLICES.map((slice) => (
        <div
          key={slice.id}
          className="floral-strip-slice"
          style={{ left: slice.left, width: slice.width }}
        >
          <motion.div
            className="floral-strip-slice-motion"
            style={{ transformOrigin: slice.origin }}
            animate={{
              rotate: slice.rotate,
              y: slice.y,
              x: slice.x,
            }}
            transition={{
              duration: slice.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: slice.delay,
            }}
          >
            <div className="floral-strip-panorama" style={{ left: slice.imgShift }}>
              <Image
                src={src}
                alt=""
                width={width}
                height={height}
                className={imageClassName}
                priority
              />
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
