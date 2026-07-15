"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { filterCategories, categoryGradient } from "../data/catalog";

export default function HomeCategoryTabs() {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-3">
      {filterCategories.map((cat) => (
        <motion.button
          key={cat.id}
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => router.push(`/catalog?cat=${cat.id}`)}
          style={{ backgroundImage: categoryGradient[cat.id] }}
          className="rounded-2xl px-6 py-4 text-body-sm font-semibold text-white shadow-sm"
        >
          {cat.label}
        </motion.button>
      ))}
    </div>
  );
}
