"use client";

import { createContext, useContext } from "react";

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
