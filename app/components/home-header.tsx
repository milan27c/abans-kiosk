"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import ThemeToggle from "./theme-toggle";

export default function HomeHeader() {
  const router = useRouter();

  return (
    <>
      {/* Nav bar: Abans logo (left) + search button & theme toggle (right) */}
      <div className="sticky top-0 z-40 flex items-center justify-between gap-6 border-b border-line bg-canvas/90 px-10 py-6 backdrop-blur-md">
        <Image
          src="/images/logo.png"
          alt="Abans"
          width={800}
          height={230}
          priority
          className="h-auto w-[190px] dark:brightness-[1.7]"
        />
        <div className="flex items-center gap-4">
          <NavSearchButton onOpen={() => router.push("/catalog")} />
          <ThemeToggle />
        </div>
      </div>
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
      className="relative isolate flex items-center gap-3 overflow-hidden rounded-full border-2 border-line bg-surface pl-6 pr-7 py-4 text-left"
    >
      {/* Sheen that sweeps across the button on a loop */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 z-0 w-1/3 -skew-x-12"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(120,30,125,0.12), transparent)",
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
        className="relative z-10 flex shrink-0 text-brand-500"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Search size={30} strokeWidth={2.25} />
      </motion.span>

      <span className="relative z-10 text-body font-medium text-fg-muted">
        Search Products
      </span>
    </motion.button>
  );
}
