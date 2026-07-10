"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Check, Mail } from "lucide-react";
import CtaButton from "./cta-button";
import CountdownTimer from "./countdown-timer";
import { formatLKR, type Offer } from "../data/catalog";

type Status = "idle" | "sending" | "sent";

export default function OfferCard({ offer, index }: { offer: Offer; index: number }) {
  const [status, setStatus] = useState<Status>("idle");

  function requestSpec() {
    if (status !== "idle") return;
    setStatus("sending");
    // Email delivery is still TBD (CLAUDE.md §5) — simulate for the prototype.
    setTimeout(() => setStatus("sent"), 1600);
  }

  const saved = offer.originalPrice - offer.salePrice;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.06, ease: "easeOut" }}
      className="flex flex-col overflow-hidden rounded-3xl border border-line bg-surface"
    >
      {/* Product image */}
      <div className="relative aspect-square w-full bg-ash-100 dark:bg-elevated">
        <Image
          src={offer.image}
          alt={offer.name}
          fill
          sizes="360px"
          className="object-cover object-top"
          priority={index === 0}
        />
        <span className="absolute right-3 top-3 flex h-12 w-12 flex-col items-center justify-center rounded-full bg-support-red text-white">
          <span className="text-caption font-bold leading-none">{offer.discountPct}%</span>
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <CountdownTimer endsInHours={offer.endsInHours} compact />

        <h3 className="line-clamp-2 text-caption font-semibold text-fg">{offer.name}</h3>

        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="text-body-sm font-bold text-fg">
              {formatLKR(offer.salePrice)}
            </span>
            <span className="text-caption text-fg-muted line-through">
              {formatLKR(offer.originalPrice)}
            </span>
          </div>
          <span className="text-caption font-semibold text-support-green-600">
            Save {formatLKR(saved)}
          </span>
        </div>

        <div className="mt-1">
          <AnimatePresence mode="wait" initial={false}>
            {status === "idle" && (
              <motion.div
                key="cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CtaButton size="compact" onClick={requestSpec}>
                  <Mail size={22} strokeWidth={2} /> Send me the spec
                </CtaButton>
              </motion.div>
            )}

            {status === "sending" && (
              <motion.div
                key="sending"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex h-16 items-center justify-center gap-3 rounded-full bg-brand-100 text-body-sm font-semibold text-brand-700 dark:bg-brand-900 dark:text-brand-200"
              >
                <motion.span
                  className="h-6 w-6 rounded-full border-[3px] border-brand-300 border-t-brand-600"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                Preparing…
              </motion.div>
            )}

            {status === "sent" && (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="flex h-16 flex-col items-center justify-center rounded-full bg-support-green/15 text-support-green-600"
              >
                <span className="flex items-center gap-2 text-body-sm font-semibold">
                  <Check size={22} strokeWidth={2.5} /> Sent to your email
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}
