"use client";

import { useEffect, useState, type ComponentType } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";
import SlideWelcome from "./splash/slide-welcome";
import SlideBrands, { DURATION_MS as BRANDS_MS } from "./splash/slide-brands";
import SlideCta from "./splash/slide-cta";
import { useViewportPin } from "./kiosk-scroll-context";

type Phase = "loading" | "ready" | "dismissed";

const LOADING_MS = 1400;

// Carousel slides: background art + how long each stays on screen before
// auto-advancing, looping back to 0.
const DEFAULT_OVERLAY = "bg-gradient-to-b from-black/75 via-black/15 to-black/85";

// Headline text is dark on slides 2 & 3 (light-sky photos), so the
// top-darkening gradient is dropped there — keep only a bottom fade for the
// touch-footer's legibility.
const LIGHT_TOP_OVERLAY = "bg-gradient-to-b from-transparent via-transparent to-black/60";

// Plain promo-art slides — no text overlay of our own, just the two bottom
// CTAs (SlideCta), reused across all four "New Splash" images.
const CTA_MS = 6500;

type Slide = {
  bg: string;
  duration: number;
  Content: ComponentType<{ offerHref?: string }>;
  overlay: string;
  // Offer page the slide's "View Offer" CTA links to (SlideCta only).
  offerHref?: string;
};

const SLIDES: Slide[] = [
  { bg: "/images/newsplash1.png", duration: 7000, Content: SlideWelcome, overlay: LIGHT_TOP_OVERLAY },
  { bg: "/images/newsplash2.png", duration: BRANDS_MS, Content: SlideBrands, overlay: LIGHT_TOP_OVERLAY },
  { bg: "/images/new-splash/slide3.png", duration: CTA_MS, Content: SlideCta, overlay: LIGHT_TOP_OVERLAY, offerHref: "/offer/ac" },
  { bg: "/images/new-splash/slide4.png", duration: CTA_MS, Content: SlideCta, overlay: LIGHT_TOP_OVERLAY, offerHref: "/offer/jvc" },
  { bg: "/images/new-splash/slide5.png", duration: CTA_MS, Content: SlideCta, overlay: LIGHT_TOP_OVERLAY, offerHref: "/offer/ac" },
  { bg: "/images/new-splash/slide6.png", duration: CTA_MS, Content: SlideCta, overlay: LIGHT_TOP_OVERLAY, offerHref: "/offer/ac" },
];

// Once the visitor has dismissed the attract screen, returning to the home
// page (e.g. the catalog's back button) should land on the home content, not
// replay the splash. This module-scoped flag survives in-app client
// navigations but resets on a real page load / kiosk reboot, so the attract
// screen still shows on a fresh start.
let splashDismissedThisSession = false;

// Slides that navigate away via their own CTA (e.g. "View Offer") stop the
// tap from bubbling to the overlay's own dismiss handler, so they need to
// mark the splash dismissed themselves before routing away — otherwise a
// later return to "/" would replay the attract screen from slide one.
export function markSplashDismissed() {
  splashDismissedThisSession = true;
}

// Slide the attract carousel should resume from on the next mount. Set by the
// inner-page "Back to Home" button; consumed once when the splash mounts.
const RESUME_SLIDE_INDEX = 2; // "splash screen 3" — the first promo/CTA slide
let restartFromSlide: number | null = null;

// Return to the attract screen and resume the carousel from slide 3.
export function returnToSplash() {
  restartFromSlide = RESUME_SLIDE_INDEX;
  splashDismissedThisSession = false;
}

/**
 * Kiosk attract / boot screen — shown once before the home page. Briefly
 * shows a loading state (simulating catalogue/asset warm-up), then cycles
 * through a looping 3-slide carousel (welcome → brands → lifestyle
 * categories), crossfading background and content on each transition.
 * Tapping anywhere at any point dismisses it, revealing the home page
 * mounted underneath. Once dismissed, later mounts skip straight to the page.
 */
export default function SplashScreen() {
  // Read (once) whether this mount was requested to resume mid-carousel.
  const [resumeAt] = useState<number | null>(() => restartFromSlide);
  const [phase, setPhase] = useState<Phase>(
    resumeAt !== null
      ? "ready"
      : splashDismissedThisSession
        ? "dismissed"
        : "loading"
  );
  const [slide, setSlide] = useState(resumeAt ?? 0);

  // While the splash is up, pin the page to the top and lock background scroll
  // so the fixed overlay can't be dragged out of view.
  useViewportPin(phase !== "dismissed", true);

  useEffect(() => {
    // Clear the one-shot resume flag so a later normal navigation to "/"
    // doesn't replay the splash.
    restartFromSlide = null;
  }, []);

  useEffect(() => {
    // Guard the functional update so a mount that started already-dismissed
    // (returning from an inner page) never re-shows the splash.
    const t = setTimeout(
      () => setPhase((p) => (p === "loading" ? "ready" : p)),
      LOADING_MS
    );
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
          onClick={() => {
            if (phase !== "ready") return;
            splashDismissedThisSession = true;
            setPhase("dismissed");
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] overflow-hidden bg-black"
        >
          {/* Background crossfade */}
          <AnimatePresence>
            <motion.div
              key={phase === "ready" ? SLIDES[slide].bg : "loading-bg"}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
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
                <Active offerHref={SLIDES[slide].offerHref} />
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
