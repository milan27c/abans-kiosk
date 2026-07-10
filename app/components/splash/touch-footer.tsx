"use client";

import { motion } from "motion/react";
import { Pointer } from "lucide-react";

/**
 * Persistent "touch anywhere to begin" affordance shown across every splash
 * slide — a pulsing ripple ring behind a hand/pointer icon, plus tracked
 * caption text underneath.
 */
export default function TouchFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      className="flex flex-col items-center gap-6"
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
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
        <span className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 border-white bg-white/10 backdrop-blur-sm">
          <motion.span
            animate={{ y: [0, -6, 0], x: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Pointer size={40} strokeWidth={1.75} className="text-white" />
          </motion.span>
        </span>
      </div>

      <span className="text-body-sm font-semibold uppercase tracking-[0.4em] text-white">
        Touch anywhere to begin
      </span>
    </motion.div>
  );
}
