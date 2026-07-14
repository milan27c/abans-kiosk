"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import CategoryQuickPopup from "./category-quick-popup";
import {
  filterCategories,
  categoryGradient,
  OPT_SEP,
  type FilterCategory,
} from "../data/catalog";

export default function HomeCategoryTabs() {
  const router = useRouter();
  const [active, setActive] = useState<FilterCategory | null>(null);

  function goToCatalog(category: FilterCategory, option: string) {
    const params = new URLSearchParams();
    params.set("cat", category.id);
    params.set("opt", category.id + OPT_SEP + option);
    setActive(null);
    router.push(`/catalog?${params.toString()}`);
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {filterCategories.map((cat) => (
          <motion.button
            key={cat.id}
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => setActive(cat)}
            style={{ backgroundImage: categoryGradient[cat.id] }}
            className="rounded-2xl px-6 py-4 text-body-sm font-semibold text-white shadow-sm"
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      <CategoryQuickPopup
        category={active}
        onSelectOption={(option) => active && goToCatalog(active, option)}
        onClose={() => setActive(null)}
      />
    </>
  );
}
