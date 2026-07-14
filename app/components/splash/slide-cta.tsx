"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { LayoutGrid, Tag } from "lucide-react";
import TouchFooter from "./touch-footer";

// Shared image-only slide: no headline/tag overlays, just the full-bleed
// background (rendered by the carousel) plus two bottom CTAs and a compact
// "touch anywhere" hint. Reused across all four "New Splash" images.
export default function SlideCta() {
  const router = useRouter();

  return (
    <div className="relative z-10 flex h-full flex-col justify-end gap-10 px-10 pb-16">
      <div className="flex gap-5">
        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            // Destination TBD — wired up later.
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="gradient-bg-brand-pink relative isolate flex h-24 flex-1 items-center justify-center gap-3 overflow-hidden rounded-full text-white"
        >
          <Sheen tint="rgba(255,255,255,0.28)" />
          <Tag size={28} strokeWidth={2.25} className="relative z-10" />
          <span className="relative z-10 text-body-lg font-semibold">
            View Offer
          </span>
        </motion.button>

        <motion.button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            router.push("/catalog");
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          className="gradient-bg-white-gray relative isolate flex h-24 flex-1 items-center justify-center gap-3 overflow-hidden rounded-full text-brand-700"
        >
          <Sheen tint="rgba(120,30,125,0.16)" />
          <LayoutGrid size={28} strokeWidth={2.25} className="relative z-10" />
          <span className="relative z-10 text-body-lg font-semibold">
            View Product Catalog
          </span>
        </motion.button>
      </div>

      <div className="flex justify-center">
        <TouchFooter compact />
      </div>
    </div>
  );
}

function Sheen({ tint }: { tint: string }) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 z-0 w-1/3 -skew-x-12"
      style={{ background: `linear-gradient(90deg, transparent, ${tint}, transparent)` }}
      initial={{ left: "-40%" }}
      animate={{ left: ["-40%", "150%"] }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
        repeatDelay: 0.8,
      }}
    />
  );
}
