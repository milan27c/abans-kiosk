"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "motion/react";
import TouchFooter from "./touch-footer";

// Only three products for now — shown one at a time, each in a fresh spot.
const PRODUCTS = ["smart-tv.png", "wall-fan.png", "air-conditioner.png"];

// Spots spread across the middle of the frame; each appearance lands on a
// different one than the last.
const POSITIONS: { left: string; top: string; size: number }[] = [
  { left: "30%", top: "40%", size: 340 },
  { left: "70%", top: "36%", size: 320 },
  { left: "48%", top: "58%", size: 350 },
  { left: "24%", top: "62%", size: 320 },
  { left: "74%", top: "60%", size: 320 },
  { left: "52%", top: "38%", size: 330 },
];

const ROTATE_MS = 2600;
// Exported so the carousel can advance to the next slide exactly once every
// product has had its turn, instead of guessing a fixed duration.
export const DURATION_MS = PRODUCTS.length * ROTATE_MS + 400;

function randomOtherIndex(length: number, exclude: number) {
  if (length <= 1) return 0;
  let next = exclude;
  while (next === exclude) next = Math.floor(Math.random() * length);
  return next;
}

const headerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

type ShowState = { product: number; posIndex: number; rotate: number; cycle: number };

export default function SlideLivingRoom() {
  const [state, setState] = useState<ShowState>(() => ({
    product: 0,
    posIndex: Math.floor(Math.random() * POSITIONS.length),
    rotate: Math.random() * 12 - 6,
    cycle: 0,
  }));

  useEffect(() => {
    const id = setInterval(() => {
      setState((s) => ({
        product: (s.product + 1) % PRODUCTS.length,
        posIndex: randomOtherIndex(POSITIONS.length, s.posIndex),
        rotate: Math.random() * 12 - 6,
        cycle: s.cycle + 1,
      }));
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const pos = POSITIONS[state.posIndex];

  return (
    <div className="relative z-10 flex h-full flex-col px-10 pb-20 pt-24 text-center">
      <motion.div variants={headerStagger} initial="hidden" animate="show">
        <motion.h2 variants={rise} className="text-h1 font-extrabold leading-[1.05] text-ash-950">
          Upgrade Your
          <br />
          <span className="gradient-text-brand">Living Room</span>
        </motion.h2>
      </motion.div>

      {/* One product at a time — it fades out at its old spot as the next
          fades in at a new one. */}
      <div className="relative flex-1">
        <AnimatePresence>
          <motion.div
            key={state.cycle}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, rotate: state.rotate }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/50 bg-white/20 p-5 shadow-[0_12px_32px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            style={{ left: pos.left, top: pos.top, width: pos.size, height: pos.size }}
          >
            <div className="relative h-full w-full">
              <Image
                src={`/images/splash5/${PRODUCTS[state.product]}`}
                alt=""
                fill
                sizes="350px"
                className="object-contain p-2"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <TouchFooter />
    </div>
  );
}
