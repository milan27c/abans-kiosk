"use client";

import { motion, type Variants } from "motion/react";
import { Laptop, PartyPopper, Refrigerator, Sofa } from "lucide-react";
import TouchFooter from "./touch-footer";

type CategoryTag = {
  icon: typeof Sofa;
  title: string;
  subtitle: string;
  left: string;
  top: string;
  maxWidth?: number;
};

// Positioned to sit over the four quadrants of the lifestyle collage:
// kitchen (top-left), living room (top-right), workspace (bottom-left),
// entertainment (bottom-right).
const CATEGORIES: CategoryTag[] = [
  {
    icon: Refrigerator,
    title: "Kitchen",
    subtitle: "Refrigerators, Microwaves & More",
    left: "6%",
    top: "38%",
    maxWidth: 300,
  },
  {
    icon: Sofa,
    title: "Living Room",
    subtitle: "TVs, Soundbars & Home Comfort",
    left: "56%",
    top: "38%",
    maxWidth: 300,
  },
  {
    icon: Laptop,
    title: "Workspace",
    subtitle: "Laptops, Desks & Accessories",
    left: "6%",
    top: "89%",
    maxWidth: 300,
  },
  {
    icon: PartyPopper,
    title: "Entertainment",
    subtitle: "Speakers, Lighting & More",
    left: "56%",
    top: "89%",
    maxWidth: 300,
  },
];

const headerStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const tagsStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.55 } },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.4, ease: "easeOut", delay: 0.15 } },
};

export default function SlideCategories() {
  return (
    <div className="relative z-10 flex h-full flex-col items-center pb-20 pt-24 text-center">
      <motion.div variants={headerStagger} initial="hidden" animate="show" className="px-10">
        <motion.h2 variants={rise} className="text-h1 font-extrabold leading-[1.05] text-ash-950">
          Designed for
          <br />
          <span className="gradient-text-brand">Every Lifestyle</span>
        </motion.h2>
        <motion.p variants={rise} className="mt-5 text-body text-ash-950/75">
          Home appliances, personal tech, entertainment, and more.
        </motion.p>
      </motion.div>

      {/* Tags positioned over the lifestyle collage below */}
      <motion.div
        variants={tagsStagger}
        initial="hidden"
        animate="show"
        className="relative mt-6 w-full flex-1"
      >
        {CATEGORIES.map(({ icon: Icon, title, subtitle, left, top, maxWidth }) => (
          <motion.div
            key={title}
            variants={tagVariants}
            className="absolute flex flex-col items-start gap-2"
            style={{ left, top }}
          >
            <motion.span
              variants={lineVariants}
              style={{ transformOrigin: "left" }}
              className="h-[3px] w-10 rounded-full bg-gradient-to-r from-brand-300 to-transparent"
            />
            <div
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-black/55 px-4 py-3 text-left shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur-md"
              style={maxWidth ? { maxWidth } : undefined}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand-300/40 bg-brand-500/25 text-brand-200">
                <Icon size={22} strokeWidth={2} />
              </span>
              <span className="flex flex-col">
                <span className="text-body-sm font-bold leading-tight text-white">
                  {title}
                </span>
                <span className="text-caption leading-snug text-white/70">
                  {subtitle}
                </span>
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <TouchFooter />
    </div>
  );
}
