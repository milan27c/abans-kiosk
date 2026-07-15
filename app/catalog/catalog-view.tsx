"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Search,
  X,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import OnScreenKeyboard from "../components/onscreen-keyboard";
import OnlineOfferCard from "../components/online-offer-card";
import ProductDetailDrawer from "../components/product-detail-drawer";
import FloatingBackButton from "../components/floating-back-button";
import FilterDrawer from "../components/catalog/filter-drawer";
import {
  catalogBrands,
  filterCategories,
  categoryBrandIds,
  buildDemoProducts,
  OPT_SEP,
  PRODUCTS_PER_PAGE,
  type Product,
} from "../data/catalog";

const DEMO_COUNT = 120;

export default function CatalogView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // The main category the visitor arrived with (?cat=). Drives the inline
  // sub-category + brand filters shown on the page.
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(
    () => searchParams.get("cat")
  );
  // Selected sub-category options (`${catId}::${option}`) and brand ids.
  const [selectedCats, setSelectedCats] = useState<string[]>(() => {
    const opt = searchParams.get("opt");
    return opt ? [opt] : [];
  });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  // Search query (typed via on-screen keyboard)
  const [query, setQuery] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Drawer visibility
  const [filterOpen, setFilterOpen] = useState(false);

  // Product QR detail drawer (detail retained during close animation)
  const [detail, setDetail] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Demo products (placeholder — real catalogue TBD).
  const products = useMemo(() => buildDemoProducts(DEMO_COUNT), []);
  const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PER_PAGE));
  const pageItems = products.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const activeCategory = activeCategoryId
    ? filterCategories.find((c) => c.id === activeCategoryId) ?? null
    : null;

  // Brands that stock the active category.
  const availableBrands = useMemo(() => {
    if (!activeCategoryId) return [];
    const ids = categoryBrandIds[activeCategoryId] ?? [];
    return catalogBrands.filter((b) => ids.includes(b.id));
  }, [activeCategoryId]);

  // Applied filters = selected sub-categories + brands (the main category is
  // browsing context, shown as a heading — not counted).
  const filterCount = selectedCats.length + selectedBrands.length;
  const hasFilters = filterCount > 0;

  function toggleOption(id: string) {
    setSelectedCats((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : [...c, id]
    );
    setPage(1);
  }

  function toggleBrand(id: string) {
    setSelectedBrands((b) =>
      b.includes(id) ? b.filter((x) => x !== id) : [...b, id]
    );
    setPage(1);
  }

  function clearFilters() {
    setSelectedCats([]);
    setSelectedBrands([]);
    setPage(1);
  }

  function goToPage(p: number) {
    setPage(p);
    // Jump back to the top of the results on page change.
    document.querySelector("[data-catalog-top]")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div className="relative min-h-full bg-canvas" data-catalog-top>
      {/* Secondary nav bar: back, search bar, filters — all in one row */}
      <div className="sticky top-0 z-40 border-b border-line bg-canvas/92 backdrop-blur-md">
        <div className="flex items-center gap-3 px-8 py-6">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex h-20 shrink-0 items-center gap-2 rounded-full border-2 border-line bg-surface pl-4 pr-6 text-fg"
          >
            <ArrowLeft size={28} strokeWidth={2.25} />
            <span className="text-body font-semibold">Back</span>
          </button>

          <button
            type="button"
            onClick={() => setKeyboardOpen(true)}
            className={`relative flex h-20 flex-1 items-center gap-3 overflow-hidden rounded-full border-2 bg-surface px-7 text-left ${
              keyboardOpen ? "border-brand-500" : "border-line"
            }`}
          >
            <Search size={28} strokeWidth={2.25} className="shrink-0 text-brand-500" />
            <span
              className={`flex-1 truncate text-body ${
                query ? "text-fg" : "text-fg-muted"
              }`}
            >
              {query || "Search products, brands…"}
            </span>
            {keyboardOpen && (
              <motion.span
                aria-hidden
                className="h-8 w-[3px] rounded bg-brand-500"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            )}
            {query && (
              <span
                role="button"
                aria-label="Clear search"
                onClick={(e) => {
                  e.stopPropagation();
                  setQuery("");
                }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ash-100 text-fg-muted dark:bg-elevated"
              >
                <X size={22} strokeWidth={2.25} />
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setFilterOpen(true)}
            className={`flex h-20 shrink-0 items-center gap-3 rounded-full border-2 px-8 text-body font-semibold transition-colors ${
              hasFilters
                ? "border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200"
                : "border-line bg-surface text-fg"
            }`}
          >
            <SlidersHorizontal
              size={26}
              strokeWidth={2.25}
              className={hasFilters ? "text-brand-500" : "text-fg-muted"}
            />
            Filters
            {hasFilters && (
              <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-brand-500 px-2 text-caption font-bold text-white">
                {selectedCats.length + selectedBrands.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filters: heading + count + sub-categories + available brands */}
      {(hasFilters || activeCategory) && (
        <div className="border-b border-line px-8 py-7">
          {/* Section heading + applied-filter count + clear all */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-h4 font-bold text-fg">
              {activeCategory ? activeCategory.label : "All Products"}
            </h2>
            {hasFilters && (
              <div className="flex shrink-0 items-center gap-4">
                <span className="text-body-sm font-semibold text-brand-500">
                  {filterCount} filter{filterCount > 1 ? "s" : ""} applied
                </span>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-full border-2 border-line bg-surface px-6 py-2.5 text-body-sm font-semibold text-fg"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Sub-categories of the active category */}
          {activeCategory && (
            <div>
              {activeCategory.groups.map((group) => (
                <div key={group.label} className="mb-6 last:mb-0">
                  <h3 className="mb-3 text-body-sm font-semibold uppercase tracking-wide text-fg-muted">
                    {group.label}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {group.options.map((opt) => {
                      const id = activeCategory.id + OPT_SEP + opt;
                      const on = selectedCats.includes(id);
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
          )}

          {/* Available brands for the active category */}
          {availableBrands.length > 0 && (
            <div className="mt-2">
              <h3 className="mb-3.5 text-body-sm font-semibold uppercase tracking-wide text-fg-muted">
                Available Brands
              </h3>
              <div className="flex flex-wrap gap-3">
                {availableBrands.map((brand) => {
                  const on = selectedBrands.includes(brand.id);
                  return (
                    <motion.button
                      key={brand.id}
                      type="button"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleBrand(brand.id)}
                      className={`relative flex h-16 w-24 items-center justify-center rounded-2xl border-2 bg-white p-3 ${
                        on ? "border-brand-500 ring-2 ring-brand-500" : "border-line"
                      }`}
                    >
                      <span className="relative h-full w-full">
                        <Image
                          src={brand.logo}
                          alt={brand.label}
                          fill
                          sizes="100px"
                          className="object-contain"
                        />
                      </span>
                      {on && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white">
                          <Check size={14} strokeWidth={3} />
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Product grid — 3 per row */}
      <div className="grid grid-cols-3 gap-5 px-8 pb-12 pt-7">
        {pageItems.map((p, i) => (
          <OnlineOfferCard
            key={p.id}
            offer={p}
            index={i}
            className="w-full"
            onSelect={() => {
              setDetail(p);
              setDetailOpen(true);
            }}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 px-8 pb-40">
          <PageArrow
            dir="prev"
            disabled={page === 1}
            onClick={() => goToPage(page - 1)}
          />
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => goToPage(p)}
              className={`h-16 w-16 rounded-2xl text-body font-bold tabular-nums transition-colors ${
                p === page
                  ? "bg-brand-500 text-white"
                  : "border-2 border-line bg-surface text-fg"
              }`}
            >
              {p}
            </button>
          ))}
          <PageArrow
            dir="next"
            disabled={page === totalPages}
            onClick={() => goToPage(page + 1)}
          />
        </div>
      )}

      {/* Combined filter drawer */}
      <FilterDrawer
        open={filterOpen}
        activeCategoryId={activeCategoryId}
        brands={selectedBrands}
        options={selectedCats}
        onApply={(nextBrands, nextOptions) => {
          setSelectedBrands(nextBrands);
          setSelectedCats(nextOptions);
          if (nextOptions.length > 0) {
            setActiveCategoryId(nextOptions[0].split(OPT_SEP)[0]);
          }
          setPage(1);
        }}
        onClose={() => setFilterOpen(false)}
      />

      {/* Product QR detail drawer */}
      <ProductDetailDrawer
        open={detailOpen}
        product={detail}
        onClose={() => setDetailOpen(false)}
      />

      {/* On-screen keyboard for search */}
      <AnimatePresence>
        {keyboardOpen && (
          <OnScreenKeyboard
            onChar={(c) => setQuery((q) => q + c)}
            onBackspace={() => setQuery((q) => q.slice(0, -1))}
            onSpace={() => setQuery((q) => q + " ")}
            onEnter={() => setKeyboardOpen(false)}
            onClose={() => setKeyboardOpen(false)}
          />
        )}
      </AnimatePresence>

      <FloatingBackButton />
    </div>
  );
}

function PageArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-line bg-surface text-fg disabled:opacity-30"
    >
      {dir === "prev" ? (
        <ChevronLeft size={28} strokeWidth={2.5} />
      ) : (
        <ChevronRight size={28} strokeWidth={2.5} />
      )}
    </button>
  );
}
