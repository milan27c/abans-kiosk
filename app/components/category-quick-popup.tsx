"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import KioskOverlay from "./kiosk-overlay";
import { categoryGradient, type FilterCategory } from "../data/catalog";

export default function CategoryQuickPopup({
  category,
  onSelectOption,
  onClose,
}: {
  category: FilterCategory | null;
  onSelectOption: (option: string) => void;
  onClose: () => void;
}) {
  return (
    <KioskOverlay open={!!category} onClose={onClose} variant="center">
      {category && (
        <div className="flex max-h-full w-full max-w-[860px] flex-col overflow-hidden rounded-[32px] bg-canvas shadow-[0_30px_80px_rgba(0,0,0,0.4)]">
          {/* Header carries the category's own gradient */}
          <div
            className="flex items-center justify-between px-8 py-6"
            style={{ backgroundImage: categoryGradient[category.id] }}
          >
            <h2 className="text-h4 font-bold text-white drop-shadow-sm">
              {category.label}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white"
            >
              <X size={24} strokeWidth={2.25} />
            </button>
          </div>

          {/* Sub-categories */}
          <div className="overflow-y-auto px-8 py-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {category.groups.map((group) => (
              <div key={group.label} className="mb-7 last:mb-0">
                <h3 className="mb-3.5 text-body-sm font-semibold uppercase tracking-wide text-fg-muted">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {group.options.map((opt) => (
                    <motion.button
                      key={opt}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onSelectOption(opt)}
                      className="rounded-full border-2 border-line bg-surface px-6 py-3 text-body-sm font-medium text-fg"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </KioskOverlay>
  );
}
