"use client";

import { useState } from "react";
import OnlineOfferCard from "./online-offer-card";
import ProductDetailDrawer from "./product-detail-drawer";
import type { OnlineOffer } from "../data/catalog";

export default function OnlineOffersRail({
  offers,
}: {
  offers: OnlineOffer[];
}) {
  const [detail, setDetail] = useState<OnlineOffer | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex gap-5 overflow-x-auto px-10 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {offers.map((offer, i) => (
          <OnlineOfferCard
            key={offer.id}
            offer={offer}
            index={i}
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
    </>
  );
}
