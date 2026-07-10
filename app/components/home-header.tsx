"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { LayoutGrid, Search, Tag, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import OnScreenKeyboard from "./onscreen-keyboard";
import BottomDrawer from "./bottom-drawer";
import { useKioskScrollElement } from "./kiosk-scroll-context";
import { categories, brands } from "../data/catalog";

const APP_BAR_H = 132; // px — search rail pins directly beneath the app bar
const REVEAL_AT = 150; // scroll offset past which the compact logo slides in

type Drawer = "categories" | "brands" | null;

export default function HomeHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [drawer, setDrawer] = useState<Drawer>(null);

  // On real kiosk hardware this is `window`; inside the browser-preview
  // frame (KioskFrame) the scaled canvas scrolls inside its own container.
  const scrollTarget = useKioskScrollElement();

  useEffect(() => {
    const target: Window | HTMLElement = scrollTarget ?? window;
    const getOffset = () =>
      scrollTarget ? scrollTarget.scrollTop : window.scrollY;
    const onScroll = () => setScrolled(getOffset() > REVEAL_AT);
    onScroll();
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, [scrollTarget]);

  return (
    <>
      {/* App bar */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between bg-canvas/90 px-10 backdrop-blur-md"
        style={{ height: APP_BAR_H }}
      >
        <span className="text-caption font-medium uppercase tracking-[0.35em] text-fg-muted">
          E-Catalogue
        </span>
        <ThemeToggle />
      </div>

      {/* Hero — big centred logo, scrolls away */}
      <div className="flex flex-col items-center px-10 pb-6 pt-10">
        <Image
          src="/images/logo.png"
          alt="Abans"
          width={800}
          height={230}
          priority
          className="h-auto w-[440px] dark:brightness-[1.7]"
        />
        <p className="mt-6 text-center text-body text-fg-muted">
          Browse the range and we&apos;ll email you the spec sheet.
        </p>
      </div>

      {/* Sticky search + filters rail */}
      <div
        className="sticky z-30 bg-canvas/95 px-10 pb-6 pt-4 backdrop-blur-md"
        style={{ top: APP_BAR_H }}
      >
        <div className="flex items-center gap-4">
          <AnimatePresence initial={false}>
            {scrolled && (
              <motion.div
                key="compact-logo"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 168, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 320, damping: 34 }}
                className="flex shrink-0 items-center overflow-hidden"
              >
                <Image
                  src="/images/logo.png"
                  alt="Abans"
                  width={800}
                  height={230}
                  className="h-auto w-[168px] dark:brightness-[1.7]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setKeyboardOpen(true)}
            className={`flex h-24 flex-1 items-center gap-5 rounded-full border-2 bg-surface px-8 text-left transition-colors ${
              keyboardOpen ? "border-brand-500" : "border-line"
            }`}
          >
            <Search size={30} strokeWidth={2} className="shrink-0 text-fg-muted" />
            <span
              className={`flex-1 truncate text-body ${
                query ? "text-fg" : "text-fg-muted"
              }`}
            >
              {query || "Search products, brands…"}
            </span>
            {keyboardOpen && (
              <motion.span
                aria-hidden
                className="h-9 w-[3px] rounded bg-brand-500"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}
            {query && (
              <span
                role="button"
                aria-label="Clear search"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuery("");
                }}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-ash-100 text-fg-muted dark:bg-elevated"
              >
                <X size={22} strokeWidth={2.25} />
              </span>
            )}
          </button>

          <RoundIconButton
            label="Browse categories"
            active={drawer === "categories"}
            onClick={() => setDrawer("categories")}
          >
            <LayoutGrid size={28} strokeWidth={2} />
          </RoundIconButton>

          <RoundIconButton
            label="Filter by brand"
            active={drawer === "brands" || !!activeBrand}
            onClick={() => setDrawer("brands")}
          >
            <Tag size={28} strokeWidth={2} />
          </RoundIconButton>
        </div>
      </div>

      {/* On-screen keyboard */}
      <AnimatePresence>
        {keyboardOpen && (
          <OnScreenKeyboard
            onChar={(c) => setQuery((q) => q + c)}
            onBackspace={() => setQuery((q) => q.slice(0, -1))}
            onSpace={() => setQuery((q) => q + " ")}
            onEnter={() => setKeyboardOpen(false)}
            onClose={() => setKeyboardOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Categories drawer */}
      <AnimatePresence>
        {drawer === "categories" && (
          <BottomDrawer title="Browse categories" onClose={() => setDrawer(null)}>
            <div className="grid grid-cols-3 gap-4 pb-2">
              {categories.map((c) => {
                const active = activeCategory === c.id;
                return (
                  <motion.button
                    key={c.id}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveCategory(active ? null : c.id);
                      setDrawer(null);
                    }}
                    className={`flex flex-col items-center gap-2 rounded-3xl border py-6 text-body-sm font-medium transition-colors ${
                      active
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-line bg-canvas text-fg"
                    }`}
                  >
                    <span className="text-h3 leading-none">{c.icon}</span>
                    {c.label}
                  </motion.button>
                );
              })}
            </div>
          </BottomDrawer>
        )}
      </AnimatePresence>

      {/* Brands drawer */}
      <AnimatePresence>
        {drawer === "brands" && (
          <BottomDrawer title="Filter by brand" onClose={() => setDrawer(null)}>
            <div className="grid grid-cols-2 gap-4 pb-2">
              {brands.map((b) => {
                const active = activeBrand === b.id;
                return (
                  <motion.button
                    key={b.id}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setActiveBrand(active ? null : b.id);
                      setDrawer(null);
                    }}
                    className={`h-20 rounded-3xl border text-body-lg font-semibold transition-colors ${
                      active
                        ? "border-brand-500 bg-brand-500 text-white"
                        : "border-line bg-canvas text-fg"
                    }`}
                  >
                    {b.label}
                  </motion.button>
                );
              })}
            </div>
          </BottomDrawer>
        )}
      </AnimatePresence>
    </>
  );
}

function RoundIconButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.15 }}
      className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
        active
          ? "border-brand-500 bg-brand-500 text-white"
          : "border-line bg-surface text-fg-muted"
      }`}
    >
      {children}
    </motion.button>
  );
}
