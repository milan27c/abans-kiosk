"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import OnlineOfferCard from "./online-offer-card";
import ProductDetailDrawer from "./product-detail-drawer";
import type { LimitedOffer } from "../data/catalog";

// Standalone "View Offer" landing page reached from the splash CTAs: a
// back-to-home nav, a full-width promo banner, then a grid of tappable
// product cards (same style as the catalog) that open the QR detail drawer.
export default function OfferPage({
  banner,
  bannerAlt,
  products,
}: {
  banner: string;
  bannerAlt: string;
  products: LimitedOffer[];
}) {
  const router = useRouter();
  const [detail, setDetail] = useState<LimitedOffer | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-full bg-canvas">
      {/* Nav bar: back to home */}
      <div className="sticky top-0 z-40 border-b border-line bg-canvas/90 px-10 py-6 backdrop-blur-md">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex h-16 items-center gap-2 rounded-full border-2 border-line bg-surface pl-4 pr-6 text-fg"
        >
          <ArrowLeft size={28} strokeWidth={2.25} />
          <span className="text-body font-semibold">Back to Home</span>
        </button>
      </div>

      {/* Offer banner */}
      <div className="relative w-full">
        <Image
          src={banner}
          alt={bannerAlt}
          width={1774}
          height={887}
          priority
          className="h-auto w-full"
        />
      </div>

      {/* Product cards — same style/grid as the catalog page; tap to open the QR drawer */}
      <div className="grid grid-cols-3 gap-5 px-10 py-10 pb-24">
        {products.map((offer, i) => (
          <OnlineOfferCard
            key={offer.id}
            offer={offer}
            index={i}
            className="w-full"
            onSelect={() => {
              setDetail(offer);
              setOpen(true);
            }}
          />
        ))}
      </div>

      <ProductDetailDrawer
        open={open}
        product={detail}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}
