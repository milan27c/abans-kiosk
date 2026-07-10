"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Primary call-to-action button — implements the approved "attract & tap"
 * behaviour from CLAUDE.md §4.8:
 *  - flat solid brand fill (no gradient/glow/shadow)
 *  - looping sharp-edged white "flash sweep" while idle
 *  - tap scales UP to 1.08 with springy easing, fill brightens to purple/400,
 *    and a brief full-button white flash reinforces the press.
 */
export default function CtaButton({
  children,
  onClick,
  className = "",
  size = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "default" | "compact";
}) {
  const [flashKey, setFlashKey] = useState(0);
  const [pressed, setPressed] = useState(false);
  const compact = size === "compact";

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onTapStart={() => {
        setPressed(true);
        setFlashKey((k) => k + 1);
      }}
      onTap={() => setPressed(false)}
      onTapCancel={() => setPressed(false)}
      whileTap={{ scale: 1.08 }}
      transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.15 }}
      animate={{ backgroundColor: pressed ? "#a062a4" : "#781e7d" }}
      className={`relative isolate flex w-full items-center justify-center overflow-hidden rounded-full font-semibold text-white ${
        compact ? "h-16 text-body-sm" : "h-28 text-body-lg"
      } ${className}`}
    >
      {/* Idle flash sweep: sharp skewed light bar looping left → right */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-0"
        style={{
          width: "14%",
          background: "rgba(255,255,255,0.55)",
          transform: "skewX(-18deg)",
        }}
        initial={{ left: "-20%" }}
        animate={{ left: ["-20%", "120%", "120%"] }}
        transition={{
          duration: 3,
          times: [0, 0.17, 1], // fast sweep in first ~0.5s, then pause
          ease: "easeIn",
          repeat: Infinity,
        }}
      />

      {/* Tap flash: brief full-button white wash that fades out */}
      <AnimatePresence>
        {pressed && (
          <motion.span
            key={flashKey}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-white"
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </motion.button>
  );
}
