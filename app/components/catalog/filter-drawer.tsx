"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { X, Check } from "lucide-react";
import KioskOverlay from "../kiosk-overlay";
import {
  filterCategories,
  catalogBrands,
  categoryGradient,
  categoryBrandIds,
  OPT_SEP,
} from "../../data/catalog";

export default function FilterDrawer({
  open,
  brands,
  options,
  onApply,
  onClose,
}: {
  open: boolean;
  brands: string[];
  options: string[];
  onApply: (brands: string[], options: string[]) => void;
  onClose: () => void;
}) {
  return (
    <KioskOverlay open={open} onClose={onClose}>
      <FilterSheet
        initialBrands={brands}
        initialOptions={options}
        onApply={onApply}
        onClose={onClose}
      />
    </KioskOverlay>
  );
}

function FilterSheet({
  initialBrands,
  initialOptions,
  onApply,
  onClose,
}: {
  initialBrands: string[];
  initialOptions: string[];
  onApply: (brands: string[], options: string[]) => void;
  onClose: () => void;
}) {
  const [tempBrands, setTempBrands] = useState<string[]>(initialBrands);
  const [tempOptions, setTempOptions] = useState<string[]>(initialOptions);
  const [activeId, setActiveId] = useState<string | null>(null);

  const active = activeId
    ? filterCategories.find((c) => c.id === activeId) ?? null
    : null;

  // Brands are all brands until a category is chosen, then narrowed to the
  // ones that stock that category.
  const availableBrands = active
    ? catalogBrands.filter((b) =>
        (categoryBrandIds[active.id] ?? []).includes(b.id)
      )
    : catalogBrands;

  const total = tempBrands.length + tempOptions.length;

  function toggleBrand(id: string) {
    setTempBrands((b) =>
      b.includes(id) ? b.filter((x) => x !== id) : [...b, id]
    );
  }
  function toggleOption(id: string) {
    setTempOptions((o) =>
      o.includes(id) ? o.filter((x) => x !== id) : [...o, id]
    );
  }
  function countFor(catId: string) {
    return tempOptions.filter((id) => id.startsWith(catId + OPT_SEP)).length;
  }

  return (
    <div className="flex flex-col rounded-t-[36px] bg-canvas pb-10 shadow-[0_-20px_60px_rgba(0,0,0,0.35)]">
      {/* Header */}
      <div className="flex items-center justify-between px-10 pb-6 pt-8">
        <div className="flex items-baseline gap-3">
          <h2 className="text-h3 font-bold text-fg">Filters</h2>
          {total > 0 && (
            <span className="text-body-sm font-semibold text-brand-500">
              {total} selected
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

      <div className="flex h-[1120px] border-y border-line">
        {/* Left: gradient category tiles */}
        <div className="w-[380px] shrink-0 space-y-2.5 overflow-y-auto border-r border-line p-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filterCategories.map((cat) => {
            const on = cat.id === activeId;
            const n = countFor(cat.id);
            return (
              <motion.button
                key={cat.id}
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveId(on ? null : cat.id)}
                style={{ backgroundImage: categoryGradient[cat.id] }}
                className={`relative flex w-full items-center rounded-2xl px-5 py-5 text-left transition-shadow ${
                  on ? "ring-4 ring-brand-500" : ""
                }`}
              >
                <span className="flex-1 text-body font-semibold text-white drop-shadow-sm">
                  {cat.label}
                </span>
                {n > 0 && (
                  <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 text-caption font-bold text-fg">
                    {n}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right: brands (top) + sub-categories (below) */}
        <div className="flex-1 overflow-y-auto px-8 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Brands */}
          <h3 className="mb-4 text-body-sm font-semibold uppercase tracking-wide text-fg-muted">
            {active ? `${active.label} Brands` : "Brands"}
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {availableBrands.map((brand) => {
              const on = tempBrands.includes(brand.id);
              return (
                <motion.button
                  key={brand.id}
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleBrand(brand.id)}
                  className={`relative flex aspect-[5/3] items-center justify-center rounded-2xl border-2 bg-white p-4 ${
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

          {/* Sub-categories of the active category */}
          {active ? (
            <div className="mt-9">
              {active.groups.map((group) => (
                <div key={group.label} className="mb-8 last:mb-0">
                  <h3 className="mb-4 text-body-sm font-semibold uppercase tracking-wide text-fg-muted">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {group.options.map((opt) => {
                      const id = active.id + OPT_SEP + opt;
                      const on = tempOptions.includes(id);
                      return (
                        <motion.button
                          key={opt}
                          type="button"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => toggleOption(id)}
                          className={`rounded-full border-2 px-6 py-3 text-body-sm font-medium transition-colors ${
                            on
                              ? "border-brand-500 bg-brand-500 text-white"
                              : "border-line bg-surface text-fg"
                          }`}
                        >
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-body-sm text-fg-muted">
              Pick a category on the left to see its sub-categories.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center gap-4 px-10">
        {total > 0 && (
          <button
            type="button"
            onClick={() => {
              setTempBrands([]);
              setTempOptions([]);
            }}
            className="px-4 text-body-sm font-semibold text-fg-muted underline underline-offset-4"
          >
            Clear all
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="ml-auto h-20 flex-1 rounded-full border-2 border-line bg-surface text-body-lg font-semibold text-fg"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onApply(tempBrands, tempOptions);
            onClose();
          }}
          className="h-20 flex-[2] rounded-full bg-brand-500 text-body-lg font-semibold text-white"
        >
          Apply{total > 0 ? ` (${total})` : ""}
        </button>
      </div>
    </div>
  );
}
