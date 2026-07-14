"use client";

import { motion, AnimatePresence, type Variants } from "motion/react";
import { useViewportPin } from "./kiosk-scroll-context";

/**
 * Bottom-sheet host for the kiosk canvas.
 *
 * The preview frame scales the 1080×1920 canvas with a CSS transform and
 * scrolls inside its own container, which makes `position: fixed` resolve
 * against the transformed box and drift with scroll. To stay pinned to the
 * visible viewport regardless of scroll position, we position the overlay
 * absolutely at the container's current `scrollTop` and lock scrolling while
 * it's open. On real hardware (no scaling container) it falls back to `fixed`.
 */
const backdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
const sheet: Variants = {
  hidden: { y: "100%" },
  show: { y: 0 },
};

export default function KioskOverlay({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const rect = useViewportPin(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial="hidden"
          animate="show"
          exit="hidden"
          className={
            rect.fixed
              ? "fixed inset-0 z-[300]"
              : "absolute left-0 z-[300] w-full"
          }
          style={rect.fixed ? undefined : { top: rect.top, height: rect.height }}
        >
          <motion.div
            variants={backdrop}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
          />
          <motion.div
            variants={sheet}
            transition={{ type: "spring", damping: 34, stiffness: 340 }}
            className="absolute inset-x-0 bottom-0"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
