"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import SlideWelcome from "./splash/slide-welcome";
import SlideBrands from "./splash/slide-brands";
import SlideCategories from "./splash/slide-categories";

type Phase = "loading" | "ready" | "dismissed";

const LOADING_MS = 1400;

// Carousel slides: background art + how long each stays on screen before
// auto-advancing, looping back to 0.
const DEFAULT_OVERLAY = "bg-gradient-to-b from-black/75 via-black/15 to-black/85";

// Headline text is dark on slides 2 & 3 (light-sky photos), so the
// top-darkening gradient is dropped there — keep only a bottom fade for the
// touch-footer's legibility.
const LIGHT_TOP_OVERLAY = "bg-gradient-to-b from-transparent via-transparent to-black/60";

const SLIDES = [
  { bg: "/images/newsplash1.png", duration: 7000, Content: SlideWelcome, overlay: LIGHT_TOP_OVERLAY },
  { bg: "/images/newsplash2.png", duration: 9000, Content: SlideBrands, overlay: LIGHT_TOP_OVERLAY },
  { bg: "/images/newsplash3.png", duration: 8000, Content: SlideCategories, overlay: LIGHT_TOP_OVERLAY },
];

/**
 * Kiosk attract / boot screen — shown once before the home page. Briefly
 * shows a loading state (simulating catalogue/asset warm-up), then cycles
 * through a looping 3-slide carousel (welcome → brands → lifestyle
 * categories), crossfading background and content on each transition.
 * Tapping anywhere at any point dismisses it, revealing the home page
 * mounted underneath.
 */
export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setPhase("ready"), LOADING_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "ready") return;
    const t = setTimeout(
      () => setSlide((s) => (s + 1) % SLIDES.length),
      SLIDES[slide].duration
    );
    return () => clearTimeout(t);
  }, [phase, slide]);

  const Active = SLIDES[slide].Content;

  return (
    <AnimatePresence>
      {phase !== "dismissed" && (
        <motion.div
          role="button"
          aria-label="Touch anywhere to begin"
          onClick={() => phase === "ready" && setPhase("dismissed")}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 z-[200] overflow-hidden bg-black"
        >
          {/* Background crossfade */}
          <AnimatePresence>
            <motion.div
              key={phase === "ready" ? SLIDES[slide].bg : "loading-bg"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={phase === "ready" ? SLIDES[slide].bg : SLIDES[0].bg}
                alt=""
                fill
                priority
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div
            className={`absolute inset-0 ${
              phase === "ready" ? SLIDES[slide].overlay : DEFAULT_OVERLAY
            }`}
          />

          {/* Foreground content crossfade */}
          <AnimatePresence mode="wait">
            {phase === "loading" ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative z-10 flex h-full flex-col items-center justify-center gap-5"
              >
                <Loader2 size={56} strokeWidth={2} className="animate-spin text-white/80" />
                <span className="text-body-sm font-medium uppercase tracking-[0.3em] text-white/60">
                  Loading catalogue…
                </span>
              </motion.div>
            ) : (
              <motion.div
                key={slide}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Active />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Slide progress dots */}
          {phase === "ready" && (
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {SLIDES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === slide ? "w-6 bg-white" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
