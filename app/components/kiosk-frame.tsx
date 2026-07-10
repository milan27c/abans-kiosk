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
      const margin = 32; // breathing room so the frame edge is visible
      const availW = window.innerWidth - margin * 2;
      const availH = window.innerHeight - margin * 2;
      setScale(Math.min(availW / KIOSK_W, availH / KIOSK_H, 1));
    }
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#4b4b52] p-8">
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
