"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import TouchFooter from "./touch-footer";

const BRAND_LOGOS = [
  { file: "abans.png", label: "Abans" },
  { file: "lg.png", label: "LG" },
  { file: "apple.png", label: "Apple" },
  { file: "xiaomi.png", label: "Xiaomi" },
  { file: "hp.png", label: "HP" },
  { file: "acer.png", label: "Acer" },
  { file: "lenovo.png", label: "Lenovo" },
  { file: "JBL.png", label: "JBL" },
  { file: "jvc.png", label: "JVC" },
  { file: "haier.png", label: "Haier" },
  { file: "mibro.png", label: "Mibro" },
  { file: "miniso.png", label: "Miniso" },
];

// Roughly how long the entrance stagger takes to finish (delayChildren +
// staggerChildren * count + one tile's own transition) before the highlight
// sweep starts.
const HIGHLIGHT_START_MS = 1700;
// How long each logo spends "popped" before the sweep moves to the next one.
const HIGHLIGHT_STEP_MS = 260;
// Exported so the carousel can advance to the next slide exactly once every
// logo has had its turn, instead of guessing a fixed duration.
export const DURATION_MS =
  HIGHLIGHT_START_MS + BRAND_LOGOS.length * HIGHLIGHT_STEP_MS + 600;

const headerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.45 } },
};

const tile: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 14 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export default function SlideBrands() {
  // Once the grid has finished appearing, sweep through the logos one at a
  // time, briefly popping each one up so every brand gets its moment.
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function step(i: number) {
      if (cancelled) return;
      if (i >= BRAND_LOGOS.length) {
        setActiveIndex(-1);
        return;
      }
      setActiveIndex(i);
      timeoutId = setTimeout(() => step(i + 1), HIGHLIGHT_STEP_MS);
    }

    timeoutId = setTimeout(() => step(0), HIGHLIGHT_START_MS);
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative z-10 flex h-full flex-col px-10 pb-20 pt-24 text-center">
      <motion.div variants={headerStagger} initial="hidden" animate="show">
        <motion.h2 variants={rise} className="text-h1 font-extrabold leading-[1.05] text-ash-950">
          Discover the World&apos;s
          <br />
          <span className="gradient-text-brand">Best Brands</span>
        </motion.h2>
      </motion.div>

      <motion.div
        variants={grid}
        initial="hidden"
        animate="show"
        className="mt-8 grid grid-cols-6 gap-3"
      >
        {BRAND_LOGOS.map((brand, i) => (
          <motion.div
            key={brand.file}
            variants={tile}
            className="flex h-28 items-center justify-center rounded-2xl border border-white/50 bg-white/20 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          >
            <motion.div
              className="relative h-full w-full"
              animate={{ scale: activeIndex === i ? 1.24 : 1 }}
              transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Image
                src={`/images/brandlogos/${brand.file}`}
                alt={brand.label}
                width={800}
                height={400}
                className="h-full w-full rounded-lg object-contain"
              />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <div className="flex-1" />

      <TouchFooter />
    </div>
  );
}
