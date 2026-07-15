"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useKioskScrollElement } from "./kiosk-scroll-context";
import { returnToSplash } from "./splash-screen";

/**
 * Floating "Back to Home" pill for inner pages — a white button with an
 * animated purple→pink gradient border, pinned to the bottom-left. Tapping it
 * returns to the attract screen and resumes the splash carousel from slide 3.
 *
 * The preview frame scales + scrolls its own container, so `fixed` drifts with
 * scroll; instead we track the container's scroll offset and keep the button
 * pinned to the bottom-left of the visible viewport (falling back to `fixed`
 * on real hardware, where there is no scaling container).
 */
export default function FloatingBackButton() {
  const router = useRouter();
  const scrollEl = useKioskScrollElement();
  const [viewportBottom, setViewportBottom] = useState<number | null>(null);

  useEffect(() => {
    const el = scrollEl ?? (document.scrollingElement as HTMLElement | null);
    if (!el) return; // real hardware → fixed fallback
    let raf = 0;
    const measure = () => {
      raf = 0;
      setViewportBottom(el.scrollTop + el.clientHeight);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    onScroll(); // initial (async, avoids sync setState in effect)
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrollEl]);

  return (
    <div
      className={
        viewportBottom === null
          ? "fixed bottom-10 left-10 z-[150]"
          : "absolute left-10 z-[150] -translate-y-full"
      }
      style={viewportBottom === null ? undefined : { top: viewportBottom - 40 }}
    >
      <motion.button
        type="button"
        onClick={() => {
          returnToSplash();
          router.push("/");
        }}
        whileTap={{ scale: 0.96 }}
        className="gradient-bg-brand-pink rounded-full p-[3px] shadow-[0_12px_34px_rgba(0,0,0,0.2)]"
      >
        <span className="flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-body font-semibold text-brand-700">
          <ArrowLeft size={26} strokeWidth={2.5} />
          Back to Home
        </span>
      </motion.button>
    </div>
  );
}
