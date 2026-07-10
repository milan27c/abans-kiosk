"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

/**
 * "View all" pill: plain label on a flat neutral background, paired with a
 * solid brand-color circle holding a white arrow icon. The arrow drifts
 * left-right on a loop to draw the eye, per the reference style.
 */
export default function ViewAllButton({
  label = "View all",
  onClick,
}: {
  label?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15 }}
      className="flex items-center gap-4 rounded-full bg-ash-100 py-2 pl-8 pr-2 dark:bg-elevated"
    >
      <span className="text-body font-semibold text-fg">{label}</span>
      <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-500">
        <motion.span
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="flex text-white"
        >
          <ArrowRight size={26} strokeWidth={2.4} />
        </motion.span>
      </span>
    </motion.button>
  );
}
