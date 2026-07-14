"use client";

import { motion, type Variants } from "motion/react";
import { ChevronDown, Delete } from "lucide-react";
import { useViewportPin } from "./kiosk-scroll-context";

const ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["z", "x", "c", "v", "b", "n", "m"],
];

// Slide the panel up from the bottom of the *visible* viewport. The preview
// frame scales + scrolls its own container, so a plain `fixed` panel drifts
// with scroll; instead we pin an absolute host to the current scroll offset.
const panelVariants: Variants = {
  hidden: { y: "100%" },
  show: { y: 0 },
};

export default function OnScreenKeyboard({
  onChar,
  onBackspace,
  onSpace,
  onEnter,
  onClose,
}: {
  onChar: (c: string) => void;
  onBackspace: () => void;
  onSpace: () => void;
  onEnter: () => void;
  onClose: () => void;
}) {
  const rect = useViewportPin(true);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="hidden"
      className={
        rect.fixed
          ? "pointer-events-none fixed inset-0 z-50"
          : "pointer-events-none absolute left-0 z-50 w-full"
      }
      style={rect.fixed ? undefined : { top: rect.top, height: rect.height }}
    >
      <motion.div
        role="group"
        aria-label="On-screen keyboard"
        variants={panelVariants}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        className="pointer-events-auto absolute bottom-0 left-1/2 w-[1080px] -translate-x-1/2 rounded-t-[40px] border-t border-line bg-keyboard px-8 pb-10 pt-6 shadow-[0_-16px_48px_rgba(0,0,0,0.18)]"
      >
      {/* Grab handle + hide button */}
      <div className="mb-5 flex items-center justify-between">
        <span className="h-2 w-24 rounded-full bg-fg-muted/40" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Hide keyboard"
          className="flex h-14 items-center gap-2 rounded-full bg-key px-7 text-body-sm font-medium text-fg-muted"
        >
          Hide
          <ChevronDown size={20} strokeWidth={2.25} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {ROWS.map((row, i) => (
          <div key={i} className="flex justify-center gap-3">
            {i === 3 && <Backspace onBackspace={onBackspace} />}
            {row.map((c) => (
              <Key key={c} label={c} onPress={() => onChar(c)} />
            ))}
            {i === 3 && <div className="w-[124px]" aria-hidden />}
          </div>
        ))}

        {/* Bottom row: space + Enter (Enter highlighted in brand purple) */}
        <div className="mt-1 flex gap-3">
          <Key label="@" onPress={() => onChar("@")} className="w-24" />
          <Key label="." onPress={() => onChar(".")} className="w-24" />
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={onSpace}
            className="h-24 flex-1 rounded-3xl bg-key text-body font-medium text-fg"
          >
            space
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 1.05 }}
            transition={{ ease: [0.34, 1.56, 0.64, 1], duration: 0.15 }}
            onClick={onEnter}
            className="h-24 w-72 rounded-3xl bg-brand-500 text-body-lg font-semibold text-white"
          >
            Enter
          </motion.button>
        </div>
      </div>
      </motion.div>
    </motion.div>
  );
}

function Key({
  label,
  onPress,
  className = "",
}: {
  label: string;
  onPress: () => void;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1 }}
      onClick={onPress}
      className={`h-24 flex-1 rounded-3xl bg-key text-h4 font-medium uppercase text-fg ${className}`}
    >
      {label}
    </motion.button>
  );
}

function Backspace({ onBackspace }: { onBackspace: () => void }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.1 }}
      onClick={onBackspace}
      aria-label="Backspace"
      className="flex h-24 w-[124px] items-center justify-center rounded-3xl bg-key text-fg"
    >
      <Delete size={30} strokeWidth={2} />
    </motion.button>
  );
}
