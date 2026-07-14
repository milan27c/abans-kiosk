"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { X, ChevronRight } from "lucide-react";
import KioskOverlay from "../kiosk-overlay";
import { filterCategories } from "../../data/catalog";

// A selected category filter is encoded as `${categoryId}::${option}`.
export const OPT_SEP = "::";
export function optionLabel(id: string): string {
  const i = id.indexOf(OPT_SEP);
  return i === -1 ? id : id.slice(i + OPT_SEP.length);
}

export default function CategoriesDrawer({
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
      <CategoriesSheet initial={selected} onApply={onApply} onClose={onClose} />
    </KioskOverlay>
  );
}

function CategoriesSheet({
  initial,
  onApply,
  onClose,
}: {
  initial: string[];
  onApply: (next: string[]) => void;
  onClose: () => void;
}) {
  const [temp, setTemp] = useState<string[]>(initial);
  const [activeId, setActiveId] = useState(filterCategories[0].id);
  const active = filterCategories.find((c) => c.id === activeId)!;

  function toggle(id: string) {
    setTemp((t) => (t.includes(id) ? t.filter((x) => x !== id) : [...t, id]));
  }
  function countFor(catId: string) {
    return temp.filter((id) => id.startsWith(catId + OPT_SEP)).length;
  }

  return (
    <div className="flex flex-col rounded-t-[36px] bg-canvas pb-10 shadow-[0_-20px_60px_rgba(0,0,0,0.35)]">
      {/* Header */}
      <div className="flex items-center justify-between px-10 pb-6 pt-8">
        <div className="flex items-baseline gap-3">
          <h2 className="text-h3 font-bold text-fg">Categories</h2>
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

      {/* Master (categories) / detail (sub-groups) */}
      <div className="flex h-[1120px] border-y border-line">
        {/* Left: main categories */}
        <div className="w-[380px] shrink-0 overflow-y-auto border-r border-line bg-surface [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {filterCategories.map((cat) => {
            const on = cat.id === activeId;
            const n = countFor(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveId(cat.id)}
                className={`flex w-full items-center gap-3 border-l-4 px-6 py-6 text-left transition-colors ${
                  on
                    ? "border-brand-500 bg-canvas"
                    : "border-transparent bg-transparent"
                }`}
              >
                <span
                  className={`flex-1 text-body font-medium ${
                    on ? "text-brand-700 dark:text-brand-200" : "text-fg"
                  }`}
                >
                  {cat.label}
                </span>
                {n > 0 && (
                  <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-brand-500 px-2 text-caption font-bold text-white">
                    {n}
                  </span>
                )}
                <ChevronRight
                  size={22}
                  className={on ? "text-brand-500" : "text-ash-300"}
                />
              </button>
            );
          })}
        </div>

        {/* Right: sub-groups + option chips for the active category */}
        <div className="flex-1 overflow-y-auto px-8 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {active.groups.map((group) => (
            <div key={group.label} className="mb-8 last:mb-0">
              <h3 className="mb-4 text-body-sm font-semibold uppercase tracking-wide text-fg-muted">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.options.map((opt) => {
                  const id = active.id + OPT_SEP + opt;
                  const on = temp.includes(id);
                  return (
                    <motion.button
                      key={opt}
                      type="button"
                      onClick={() => toggle(id)}
                      whileTap={{ scale: 0.95 }}
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
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center gap-4 px-10">
        {temp.length > 0 && (
          <button
            type="button"
            onClick={() => setTemp([])}
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
