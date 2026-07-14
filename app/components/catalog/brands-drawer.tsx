"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import KioskOverlay from "../kiosk-overlay";
import { catalogBrands } from "../../data/catalog";

export default function BrandsDrawer({
  open,
  selected,
  onApply,
  onClose,
}: {
  open: boolean;
  selected: string[];
  onApply: (next: string[]) => void;
  onClose: () => void;
}) {
  return (
    <KioskOverlay open={open} onClose={onClose}>
      {/* Fresh instance each open → temp selection seeds from committed state */}
      <BrandsSheet
        initial={selected}
        onApply={onApply}
        onClose={onClose}
      />
    </KioskOverlay>
  );
}

function BrandsSheet({
  initial,
  onApply,
  onClose,
}: {
  initial: string[];
  onApply: (next: string[]) => void;
  onClose: () => void;
}) {
  const [temp, setTemp] = useState<string[]>(initial);

  function toggle(id: string) {
    setTemp((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));
  }

  return (
    <div className="flex flex-col rounded-t-[36px] bg-canvas pb-10 shadow-[0_-20px_60px_rgba(0,0,0,0.35)]">
      {/* Header */}
      <div className="flex items-center justify-between px-10 pb-6 pt-8">
        <div className="flex items-baseline gap-3">
          <h2 className="text-h3 font-bold text-fg">Brands</h2>
          {temp.length > 0 && (
            <span className="text-body-sm font-semibold text-brand-500">
              {temp.length} selected
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-ash-100 text-fg-muted dark:bg-elevated"
        >
          <X size={28} strokeWidth={2.25} />
        </button>
      </div>

      {/* 6 × 2 logo grid */}
      <div className="grid grid-cols-6 gap-3 px-10">
        {catalogBrands.map((brand) => {
          const on = temp.includes(brand.id);
          return (
            <motion.button
              key={brand.id}
              type="button"
              onClick={() => toggle(brand.id)}
              whileTap={{ scale: 0.95 }}
              className={`relative flex aspect-[4/3] items-center justify-center rounded-2xl border-2 bg-white p-4 transition-colors ${
                on ? "border-brand-500 ring-2 ring-brand-500" : "border-line"
              }`}
            >
              <span className="relative h-full w-full">
                <Image
                  src={brand.logo}
                  alt={brand.label}
                  fill
                  sizes="150px"
                  className="object-contain"
                />
              </span>
              {on && (
                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white">
                  <Check size={18} strokeWidth={3} />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 flex gap-4 px-10">
        <button
          type="button"
          onClick={onClose}
          className="h-20 flex-1 rounded-full border-2 border-line bg-surface text-body-lg font-semibold text-fg"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onApply(temp);
            onClose();
          }}
          className="h-20 flex-[2] rounded-full bg-brand-500 text-body-lg font-semibold text-white"
        >
          Apply{temp.length > 0 ? ` (${temp.length})` : ""}
        </button>
      </div>
    </div>
  );
}
