"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Search, Menu } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import MainMenuDrawer from "./main-menu-drawer";

export default function HomeHeader() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Nav bar: Abans logo (left); search, theme & menu (right) */}
      <div className="sticky top-0 z-40 flex items-center justify-between gap-6 border-b border-line bg-canvas/90 px-10 py-6 backdrop-blur-md">
        <Image
          src="/images/logo.png"
          alt="Abans"
          width={800}
          height={230}
          priority
          className="h-auto w-[152px] dark:brightness-[1.7]"
        />
        <div className="flex items-center gap-4">
          <NavSearchButton onOpen={() => router.push("/catalog")} />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-line bg-surface text-fg"
          >
            <Menu size={30} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <MainMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function NavSearchButton({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="gradient-bg-brand-pink relative isolate flex h-16 items-center gap-3 overflow-hidden rounded-full pl-6 pr-7 text-left"
    >
      {/* Sheen that sweeps across the button on a loop */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-0 w-1/3 -skew-x-12"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
        }}
        initial={{ left: "-40%" }}
        animate={{ left: ["-40%", "150%"] }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.8,
        }}
      />

      <motion.span
        className="relative z-10 flex shrink-0 text-white"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Search size={30} strokeWidth={2.25} />
      </motion.span>

      <span className="relative z-10 text-body font-semibold text-white">
        Search Products
      </span>
    </motion.button>
  );
}
