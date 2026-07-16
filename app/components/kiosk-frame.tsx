"use client";

import { useEffect, useState } from "react";
import { KioskScrollContext } from "./kiosk-scroll-context";

const KIOSK_W = 1080;
const KIOSK_H = 1920;

/**
 * Prototype-only viewer chrome: scales the 1080×1920 kiosk canvas to fit
 * whatever browser window it's opened in, preserving the real 9:16 aspect
 * ratio (letterboxed), instead of letting the canvas stretch to fill a wide
 * desktop viewport. The real kiosk hardware runs at native 1080×1920 with no
 * scaling — this is purely so the design reads correctly in a browser.
 */
export default function KioskFrame({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  const [scrollEl, setScrollEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    function fit() {
      // visualViewport tracks the actual visible area on mobile (excludes
      // the on-screen keyboard and adjusts as Safari's toolbar collapses),
      // which window.innerWidth/innerHeight don't reliably reflect.
      const vv = window.visualViewport;
      const viewportW = vv?.width ?? window.innerWidth;
      const viewportH = vv?.height ?? window.innerHeight;
      // Tighter breathing room on compact/mobile viewports so more of the
      // screen is used for the preview; roomier margin on desktop.
      const margin = viewportW < 640 ? 12 : 32;
      const availW = viewportW - margin * 2;
      const availH = viewportH - margin * 2;
      setScale(Math.min(availW / KIOSK_W, availH / KIOSK_H, 1));
    }
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    window.visualViewport?.addEventListener("resize", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
      window.visualViewport?.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#4b4b52] p-3 sm:p-8">
      <div
        style={{ width: KIOSK_W * scale, height: KIOSK_H * scale }}
        className="relative overflow-hidden rounded-[36px] shadow-[0_40px_120px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
      >
        <div
          ref={setScrollEl}
          style={{
            width: KIOSK_W,
            height: KIOSK_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className="overflow-y-auto overflow-x-hidden"
        >
          <KioskScrollContext.Provider value={scrollEl}>
            {children}
          </KioskScrollContext.Provider>
        </div>
      </div>
    </div>
  );
}
