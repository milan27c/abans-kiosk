"use client";

import Image from "next/image";
import { X, ScanLine } from "lucide-react";
import KioskOverlay from "./kiosk-overlay";
import { formatLKR, type OnlineOffer } from "../data/catalog";

export default function ProductDetailDrawer({
  open,
  product,
  onClose,
}: {
  open: boolean;
  product: OnlineOffer | null;
  onClose: () => void;
}) {
  return (
    <KioskOverlay open={open} onClose={onClose}>
      {product && (
        <div className="rounded-t-[36px] bg-canvas pb-12 shadow-[0_-20px_60px_rgba(0,0,0,0.35)]">
          {/* Close */}
          <div className="flex justify-end px-8 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-ash-100 text-fg-muted dark:bg-elevated"
            >
              <X size={28} strokeWidth={2.25} />
            </button>
          </div>

          <div className="flex flex-col items-center px-10 -mt-1">
            {/* Animated gradient heading (matches splash wordings) */}
            <h2 className="gradient-text-brand text-h2 font-bold leading-tight">
              Scan to Explore More
            </h2>
            <p className="mt-3 max-w-[780px] text-center text-body text-fg-muted">
              Point your phone camera at the code to unlock full specifications,
              more photos and pricing — and take the details home with you.
            </p>

            {/* Horizontal product card */}
            <div className="mt-9 flex w-full items-center gap-6 rounded-3xl border border-line bg-surface p-5">
              <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl bg-ash-100 dark:bg-elevated">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <h3 className="line-clamp-2 text-h4 font-semibold text-fg">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-4">
                  <span className="text-h3 font-bold text-fg">
                    {formatLKR(product.salePrice)}
                  </span>
                  <span className="text-body text-fg-muted line-through">
                    {formatLKR(product.originalPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Bigger QR */}
            <div className="mt-10 flex flex-col items-center">
              <div className="rounded-[32px] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
                <DummyQr className="h-[440px] w-[440px]" />
              </div>
              <span className="mt-6 flex items-center gap-2.5 text-body-sm font-medium text-fg-muted">
                <ScanLine size={24} strokeWidth={2.25} className="text-brand-500" />
                Scan with your phone camera
              </span>
            </div>
          </div>
        </div>
      )}
    </KioskOverlay>
  );
}

/**
 * A convincing but non-functional QR placeholder rendered as inline SVG:
 * three corner finder patterns plus a deterministic module fill. Swap for a
 * real per-product QR once the product data / detail URLs exist.
 */
function DummyQr({ className = "" }: { className?: string }) {
  const N = 25;
  const inFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= N - 7) || (r >= N - 7 && c < 7);
  const finderOn = (r: number, c: number) => {
    const or = r < 7 ? 0 : N - 7;
    const oc = c < 7 ? 0 : N - 7;
    const rr = r - or;
    const cc = c - oc;
    if (rr === 0 || rr === 6 || cc === 0 || cc === 6) return true;
    return rr >= 2 && rr <= 4 && cc >= 2 && cc <= 4;
  };

  const modules: React.ReactNode[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      const on = inFinder(r, c)
        ? finderOn(r, c)
        : (r * 13 + c * 7 + r * c * 5 + 11) % 3 === 0;
      if (on) {
        modules.push(
          <rect
            key={`${r}-${c}`}
            x={c}
            y={r}
            width={1.04}
            height={1.04}
            rx={0.18}
          />
        );
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${N} ${N}`}
      className={className}
      role="img"
      aria-label="Product QR code (demo)"
    >
      <rect x={0} y={0} width={N} height={N} fill="#ffffff" />
      <g fill="#141118">{modules}</g>
    </svg>
  );
}
