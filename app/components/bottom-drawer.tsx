"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";

/**
 * Generic bottom sheet — slides up from the base of the kiosk canvas.
 * Shared by the categories and brand filter triggers beside the search bar.
 */
export default function BottomDrawer({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      role="dialog"
      aria-label={title}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", stiffness: 320, damping: 34 }}
      className="fixed inset-x-0 bottom-0 z-50 max-h-[75%] w-full rounded-t-[40px] border-t border-line bg-surface px-8 pb-10 pt-6 shadow-[0_-16px_48px_rgba(0,0,0,0.18)]"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="h-2 w-24 rounded-full bg-fg-muted/40" />
        <button
          type="button"
          onClick={onClose}
          aria-label={`Close ${title}`}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-ash-100 text-fg-muted dark:bg-elevated"
        >
          <X size={26} strokeWidth={2.25} />
        </button>
      </div>

      <h3 className="mb-5 text-h4 font-semibold text-fg">{title}</h3>

      <div className="max-h-[calc(75vh-160px)] overflow-y-auto">{children}</div>
    </motion.div>
  );
}
