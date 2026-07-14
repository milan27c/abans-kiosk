"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { QrCode } from "lucide-react";
import CtaButton from "./cta-button";
import { formatLKR, type LimitedOffer } from "../data/catalog";

export default function LtoCard({
  offer,
  index,
  onViewSpec,
}: {
  offer: LimitedOffer;
  index: number;
  onViewSpec?: () => void;
}) {
  const saved = offer.originalPrice - offer.salePrice;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: "easeOut" }}
      className="flex flex-col overflow-hidden rounded-3xl border border-line bg-surface"
    >
      {/* Product thumbnail */}
      <div className="relative aspect-[3/2] w-full bg-ash-100 dark:bg-elevated">
        <Image
          src={offer.image}
          alt={offer.name}
          fill
          sizes="360px"
          className="object-cover"
          priority={index === 0}
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="line-clamp-2 min-h-[2.6em] text-body-sm font-medium text-fg">
          {offer.name}
        </h3>

        <div className="flex flex-col gap-1">
          <span className="text-caption text-fg-muted line-through">
            {formatLKR(offer.originalPrice)}
          </span>
          <span className="text-body-lg font-bold text-fg">
            {formatLKR(offer.salePrice)}
          </span>
          <span className="mt-1 w-fit rounded-full bg-support-green/15 px-4 py-1.5 text-body-sm font-bold text-support-green-600">
            Save {formatLKR(saved)}
          </span>
        </div>

        <div className="mt-auto pt-1">
          <CtaButton size="compact" onClick={onViewSpec}>
            <QrCode size={22} strokeWidth={2} /> View Spec
          </CtaButton>
        </div>
      </div>
    </motion.article>
  );
}
