"use client";

import { createContext, useContext, useLayoutEffect, useState } from "react";

/**
 * On real kiosk hardware the page scrolls the browser window itself, so
 * consumers can just listen on `window`. In the browser-preview frame
 * (KioskFrame) the canvas is scaled and scrolls inside its own container
 * instead, so scroll-driven UI (e.g. the header's scroll-to-inline-logo)
 * needs to listen on that container. This context supplies whichever
 * element is actually scrolling, defaulting to `null` (= window).
 */
export const KioskScrollContext = createContext<HTMLElement | null>(null);

export function useKioskScrollElement() {
  return useContext(KioskScrollContext);
}

export type ViewportRect = { top: number; height: number; fixed: boolean };

/**
 * Pin an overlay to the *visible* kiosk viewport while `active`.
 *
 * The preview frame scales + scrolls its own container, so `position: fixed`
 * drifts with scroll. This reports the container's current scroll offset and
 * viewport height (so callers can absolutely position over what's on screen),
 * and locks background scrolling while active. `resetTop` pins to the very top
 * (used by the full-screen splash). On real hardware it reports `fixed: true`.
 *
 * Measuring the DOM and setting state in a layout effect is the intended use
 * here (see React's "measuring layout" guidance); the react-hooks heuristics
 * are suppressed for exactly those lines.
 */
export function useViewportPin(active: boolean, resetTop = false): ViewportRect {
  const scrollEl = useKioskScrollElement();
  const [rect, setRect] = useState<ViewportRect>({
    top: 0,
    height: 0,
    fixed: true,
  });

  useLayoutEffect(() => {
    if (!active) return;
    const el = scrollEl ?? (document.scrollingElement as HTMLElement | null);
    // No scaling container (real hardware) → keep the default `fixed` rect.
    if (!el) return;
    /* eslint-disable react-hooks/set-state-in-effect, react-hooks/immutability -- measuring layout into state and locking background scroll are the intended side effects here */
    if (resetTop) el.scrollTop = 0;
    setRect({
      top: resetTop ? 0 : el.scrollTop,
      height: el.clientHeight,
      fixed: false,
    });
    const prev = el.style.overflow;
    el.style.overflow = "hidden";
    return () => {
      el.style.overflow = prev;
    };
    /* eslint-enable react-hooks/set-state-in-effect, react-hooks/immutability */
  }, [active, scrollEl, resetTop]);

  return rect;
}
