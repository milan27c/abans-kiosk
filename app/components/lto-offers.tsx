"use client";

import { useState } from "react";
import LtoCard from "./lto-card";
import ProductDetailDrawer from "./product-detail-drawer";
import type { LimitedOffer } from "../data/catalog";

export default function LtoOffers({ offers }: { offers: LimitedOffer[] }) {
  const [detail, setDetail] = useState<LimitedOffer | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-3 gap-5">
        {offers.map((offer, i) => (
          <LtoCard
            key={offer.id}
            offer={offer}
            index={i}
            onViewSpec={() => {
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
    </>
  );
}
