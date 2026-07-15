"use client";

import { useState } from "react";
import Image from "next/image";
import OnlineOfferCard from "./online-offer-card";
import ProductDetailDrawer from "./product-detail-drawer";
import FloatingBackButton from "./floating-back-button";
import type { LimitedOffer } from "../data/catalog";

// Standalone "View Offer" landing page reached from the splash CTAs: a
// full-width promo banner, then a grid of tappable product cards (same style
// as the catalog) that open the QR detail drawer. Return via the floating
// "Back to Home" button.
export default function OfferPage({
  banner,
  bannerAlt,
  products,
}: {
  banner: string;
  bannerAlt: string;
  products: LimitedOffer[];
}) {
  const [detail, setDetail] = useState<LimitedOffer | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-full bg-canvas">
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

      <FloatingBackButton />
    </div>
  );
}
