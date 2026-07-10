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

  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex items-center gap-2 rounded-full border border-line bg-surface p-2"
    >
      <ToggleOption active={!isDark} label="Light mode" onPress={() => apply("light")}>
        <Sun size={26} strokeWidth={2} />
      </ToggleOption>
      <ToggleOption active={isDark} label="Dark mode" onPress={() => apply("dark")}>
        <Moon size={26} strokeWidth={2} />
      </ToggleOption>
    </div>
  );
}

function ToggleOption({
  active,
  label,
  onPress,
  children,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onPress}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.15 }}
      className={`relative flex h-16 w-16 items-center justify-center rounded-full transition-colors ${
        active ? "text-white" : "text-fg-muted"
      }`}
    >
      {active && (
        <motion.span
          layoutId="theme-pill"
          className="absolute inset-0 rounded-full bg-brand-500"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
