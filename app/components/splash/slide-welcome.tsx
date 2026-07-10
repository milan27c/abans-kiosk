"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import TouchFooter from "./touch-footer";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SlideWelcome() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="relative z-10 flex h-full flex-col items-center justify-between px-10 pb-20 pt-28 text-center"
    >
      <div className="flex flex-col items-center">
        <motion.div variants={rise} className="mb-5 flex items-center gap-4">
          <span className="h-px w-14 bg-ash-950/30" />
          <span className="text-body-sm font-semibold uppercase tracking-[0.5em] text-ash-950/70">
            Welcome to
          </span>
          <span className="h-px w-14 bg-ash-950/30" />
        </motion.div>

        <motion.div variants={rise}>
          <Image
            src="/images/logo.png"
            alt="Abans"
            width={800}
            height={230}
            priority
            className="h-auto w-[560px]"
            style={{
              filter: "drop-shadow(0 4px 24px rgba(120,30,125,0.35))",
            }}
          />
        </motion.div>

        <motion.p variants={rise} className="mt-8 text-h4 font-medium text-ash-950/85">
          Everything you need for
          <br />a <span className="gradient-text-brand font-semibold">smarter</span> home.
        </motion.p>

        <motion.span variants={rise} className="mt-8 flex items-center gap-4" aria-hidden>
          <span className="h-px w-24 bg-gradient-to-r from-transparent to-brand-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-500 shadow-[0_0_16px_6px_rgba(120,30,125,0.4)]" />
          <span className="h-px w-24 bg-gradient-to-l from-transparent to-brand-500" />
        </motion.span>
      </div>

      <motion.div variants={rise}>
        <TouchFooter />
      </motion.div>
    </motion.div>
  );
}
