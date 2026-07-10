"use client";

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
  return (
    <div className="relative z-10 flex h-full flex-col px-10 pb-20 pt-24 text-center">
      <motion.div variants={headerStagger} initial="hidden" animate="show">
        <motion.h2 variants={rise} className="text-h1 font-extrabold leading-[1.05] text-ash-950">
          Discover the World&apos;s
          <br />
          <span className="gradient-text-brand">Best Brands</span>
        </motion.h2>
        <motion.p variants={rise} className="mt-5 text-body text-ash-950/75">
          Trusted technology from leading global names.
        </motion.p>
      </motion.div>

      <motion.div
        variants={grid}
        initial="hidden"
        animate="show"
        className="mt-8 grid grid-cols-6 gap-3"
      >
        {BRAND_LOGOS.map((brand) => (
          <motion.div
            key={brand.file}
            variants={tile}
            className="flex h-28 items-center justify-center rounded-2xl border border-white/50 bg-white/20 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-xl"
          >
            <Image
              src={`/images/brandlogos/${brand.file}`}
              alt={brand.label}
              width={800}
              height={400}
              className="h-full w-full rounded-lg object-contain"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex-1" />

      <TouchFooter />
    </div>
  );
}
