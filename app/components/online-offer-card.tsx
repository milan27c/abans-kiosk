"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { formatLKR, type OnlineOffer } from "../data/catalog";

export default function OnlineOfferCard({
  offer,
  index,
  className = "w-[300px] shrink-0",
  onSelect,
}: {
  offer: OnlineOffer;
  index: number;
  className?: string;
  onSelect?: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: "easeOut" }}
      onClick={onSelect}
      whileTap={onSelect ? { scale: 0.98 } : undefined}
      className={`flex flex-col overflow-hidden rounded-3xl border border-line bg-surface ${
        onSelect ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Product image */}
      <div className="relative aspect-[5/3] w-full bg-ash-100 dark:bg-elevated">
        <Image
          src={offer.image}
          alt={offer.name}
          fill
          sizes="300px"
          className="object-cover"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 min-h-[2.8em] text-body-sm font-medium text-fg">
          {offer.name}
        </h3>

        <div className="mt-auto flex flex-col gap-1">
          <span className="text-caption text-fg-muted line-through">
            {formatLKR(offer.originalPrice)}
          </span>
          <span className="text-body-lg font-bold text-fg">
            {formatLKR(offer.salePrice)}
          </span>
        </div>
      </div>
    </motion.article>
  );
}
