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
  Menu,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import ThemeToggle from "../components/theme-toggle";
import MainMenuDrawer from "../components/main-menu-drawer";
import OnScreenKeyboard from "../components/onscreen-keyboard";
import OnlineOfferCard from "../components/online-offer-card";
import ProductDetailDrawer from "../components/product-detail-drawer";
import KioskOverlay from "../components/kiosk-overlay";
import FilterDrawer from "../components/catalog/filter-drawer";
import {
  catalogBrands,
  filterCategories,
  categoryBrandIds,
  buildDemoProducts,
  sortOptions,
  optionLabel,
  OPT_SEP,
  PRODUCTS_PER_PAGE,
  type Product,
} from "../data/catalog";

const DEMO_COUNT = 120;
const brandLabel = (id: string) =>
  catalogBrands.find((b) => b.id === id)?.label ?? id;
const categoryLabel = (id: string) =>
  filterCategories.find((c) => c.id === id)?.label ?? id;

export default function CatalogView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Committed filter state — seeded from ?cat=&opt= when arriving from the
  // home page's "Shop by Category" popup.
  const [selectedCats, setSelectedCats] = useState<string[]>(() => {
    const opt = searchParams.get("opt");
    return opt ? [opt] : [];
  });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);

  // Search query (typed via on-screen keyboard)
  const [query, setQuery] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  // Drawer visibility
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Product QR detail drawer (detail retained during close animation)
  const [detail, setDetail] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Demo products (placeholder — real catalogue TBD). Sorted per selection.
  const products = useMemo(() => buildDemoProducts(DEMO_COUNT), []);
  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "price-asc") list.sort((a, b) => a.salePrice - b.salePrice);
    else if (sort === "price-desc")
      list.sort((a, b) => b.salePrice - a.salePrice);
    else if (sort === "name-asc")
      list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PRODUCTS_PER_PAGE));
  const pageItems = sorted.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  const activeSort =
    sortOptions.find((s) => s.id === sort)?.label ?? "Featured";
  const hasFilters = selectedCats.length + selectedBrands.length > 0;

  // Main categories implied by the selected sub-category options — used to
  // show a category chip and to narrow the "available brands" row.
  const selectedCategoryIds = useMemo(
    () => Array.from(new Set(selectedCats.map((id) => id.split(OPT_SEP)[0]))),
    [selectedCats]
  );
  const availableBrands = useMemo(() => {
    if (selectedCategoryIds.length === 0) return [];
    const ids = new Set(
      selectedCategoryIds.flatMap((catId) => categoryBrandIds[catId] ?? [])
    );
    return catalogBrands.filter((b) => ids.has(b.id));
  }, [selectedCategoryIds]);

  function toggleBrand(id: string) {
    setSelectedBrands((b) =>
      b.includes(id) ? b.filter((x) => x !== id) : [...b, id]
    );
    setPage(1);
  }

  function removeCategory(catId: string) {
    setSelectedCats((c) => c.filter((id) => !id.startsWith(catId + OPT_SEP)));
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
      {/* Secondary nav bar */}
      <div className="sticky top-0 z-40 border-b border-line bg-canvas/92 backdrop-blur-md">
        {/* Row 1: back (icon + text), theme toggle, menu */}
        <div className="flex items-center justify-between gap-4 px-8 pb-4 pt-6">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex h-16 items-center gap-2 rounded-full border-2 border-line bg-surface pl-4 pr-6 text-fg"
          >
            <ArrowLeft size={28} strokeWidth={2.25} />
            <span className="text-body font-semibold">Back</span>
          </button>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-line bg-surface text-fg"
            >
              <Menu size={30} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Row 2: search bar + single filter button */}
        <div className="flex items-center gap-3 px-8 pb-5">
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

      {/* Results toolbar: count + applied tags + sort */}
      <div className="px-8 pt-7">
        <div className="flex items-center justify-between gap-4">
          <span className="text-body font-semibold text-fg">
            {sorted.length}{" "}
            <span className="font-normal text-fg-muted">results</span>
          </span>
          <button
            type="button"
            onClick={() => setSortOpen(true)}
            className="flex items-center gap-2.5 rounded-full border-2 border-line bg-surface px-6 py-3 text-body-sm font-semibold text-fg"
          >
            <ArrowUpDown size={22} strokeWidth={2.25} className="text-brand-500" />
            {activeSort}
          </button>
        </div>

        {hasFilters && (
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {selectedCategoryIds.map((catId) => (
              <FilterTag
                key={catId}
                label={categoryLabel(catId)}
                emphasized
                onRemove={() => removeCategory(catId)}
              />
            ))}
            {selectedCats.map((id) => (
              <FilterTag
                key={id}
                label={optionLabel(id)}
                onRemove={() =>
                  setSelectedCats((c) => c.filter((x) => x !== id))
                }
              />
            ))}
            {selectedBrands.map((id) => (
              <FilterTag
                key={id}
                label={brandLabel(id)}
                onRemove={() =>
                  setSelectedBrands((b) => b.filter((x) => x !== id))
                }
              />
            ))}
            <button
              type="button"
              onClick={() => {
                setSelectedCats([]);
                setSelectedBrands([]);
              }}
              className="px-2 text-body-sm font-semibold text-fg-muted underline underline-offset-4"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Available brands for the selected category */}
        {availableBrands.length > 0 && (
          <div className="mt-6">
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
        brands={selectedBrands}
        options={selectedCats}
        onApply={(nextBrands, nextOptions) => {
          setSelectedBrands(nextBrands);
          setSelectedCats(nextOptions);
          setPage(1);
        }}
        onClose={() => setFilterOpen(false)}
      />

      {/* Main menu */}
      <MainMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Sort sheet */}
      <KioskOverlay open={sortOpen} onClose={() => setSortOpen(false)}>
        <div className="rounded-t-[36px] bg-canvas pb-10 shadow-[0_-20px_60px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between px-10 pb-4 pt-8">
            <h2 className="text-h3 font-bold text-fg">Sort by</h2>
            <button
              type="button"
              onClick={() => setSortOpen(false)}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-ash-100 text-fg-muted dark:bg-elevated"
            >
              <X size={28} strokeWidth={2.25} />
            </button>
          </div>
          <div className="px-6 pt-2">
            {sortOptions.map((opt) => {
              const on = opt.id === sort;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSort(opt.id);
                    setPage(1);
                    setSortOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-2xl px-6 py-6 text-left text-body-lg font-medium ${
                    on ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200" : "text-fg"
                  }`}
                >
                  {opt.label}
                  {on && <Check size={28} strokeWidth={2.5} className="text-brand-500" />}
                </button>
              );
            })}
          </div>
        </div>
      </KioskOverlay>

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
    </div>
  );
}

function FilterTag({
  label,
  onRemove,
  emphasized = false,
}: {
  label: string;
  onRemove: () => void;
  emphasized?: boolean;
}) {
  return (
    <span
      className={`flex items-center gap-2 rounded-full py-2 pl-5 pr-2 text-body-sm font-medium ${
        emphasized
          ? "bg-brand-500 text-white"
          : "bg-brand-100 text-brand-700 dark:bg-brand-900/50 dark:text-brand-200"
      }`}
    >
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          emphasized
            ? "bg-white/20 text-white"
            : "bg-brand-500/15 text-brand-600 dark:text-brand-200"
        }`}
      >
        <X size={18} strokeWidth={2.75} />
      </button>
    </span>
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
