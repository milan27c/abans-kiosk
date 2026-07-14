"use client";

import { motion } from "motion/react";
import { Pointer } from "lucide-react";

/**
 * Persistent "touch anywhere to begin" affordance shown across every splash
 * slide — a pulsing ripple ring behind a hand/pointer icon, plus tracked
 * caption text underneath. `compact` shrinks it for slides that already have
 * bottom-anchored CTA buttons, so it can sit below them without crowding.
 */
export default function TouchFooter({
  compact = false,
}: {
  compact?: boolean;
}) {
  const ringBox = compact ? "h-16 w-16" : "h-32 w-32";
  const iconBox = compact ? "h-12 w-12" : "h-24 w-24";
  const iconSize = compact ? 22 : 40;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className={`flex flex-col items-center ${compact ? "gap-3" : "gap-6"}`}
    >
      <div className={`relative flex items-center justify-center ${ringBox}`}>
        {[0, 0.7].map((delay) => (
          <motion.span
            key={delay}
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-white/70"
            initial={{ scale: 0.6, opacity: 0.8 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
              delay,
            }}
          />
        ))}
        <span
          className={`relative z-10 flex items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm ${iconBox}`}
        >
          <motion.span
            animate={{ y: [0, -6, 0], x: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Pointer size={iconSize} strokeWidth={1.75} className="text-white" />
          </motion.span>
        </span>
      </div>

      <span
        className={`font-semibold uppercase text-white ${
          compact
            ? "text-caption tracking-[0.3em]"
            : "text-body-sm tracking-[0.4em]"
        }`}
      >
        Touch anywhere to begin
      </span>
    </motion.div>
  );
}
