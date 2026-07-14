"use client";

import { useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";

type Mode = "light" | "dark";

const THEME_EVENT = "abans-theme-change";

// Subscribe to theme changes (fired by apply() below) so the toggle re-renders.
function subscribe(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
}
function getSnapshot(): Mode {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function getServerSnapshot(): Mode {
  return "light";
}

function apply(next: Mode) {
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem("abans-theme", next);
  } catch {}
  window.dispatchEvent(new Event(THEME_EVENT));
}

export default function ThemeToggle() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const isDark = mode === "dark";

  // Single icon that previews the mode you'll switch *to*: a moon while in
  // light mode, a sun while in dark mode.
  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => apply(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.15 }}
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-line bg-surface text-fg"
    >
      {isDark ? (
        <Sun size={28} strokeWidth={2} />
      ) : (
        <Moon size={28} strokeWidth={2} />
      )}
    </motion.button>
  );
}
