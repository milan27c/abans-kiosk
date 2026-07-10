// Sample catalogue data for the kiosk prototype.
// NOTE: product fields below are DUMMY placeholder data — they don't match the
// promo artwork (which is its own dummy banner). Real per-product data + spec
// files come from the catalogue data source, still TBD (CLAUDE.md §5).

export type Category = {
  id: string;
  label: string;
  icon: string; // emoji stand-in until an icon set is chosen
};

export type Brand = {
  id: string;
  label: string;
};

export type Offer = {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  blurb: string;
  originalPrice: number;
  salePrice: number;
  discountPct: number;
  /** Offset in hours from now, used to build a live countdown in the prototype. */
  endsInHours: number;
};

export const categories: Category[] = [
  { id: "tv", label: "Television", icon: "📺" },
  { id: "fridge", label: "Refrigerators", icon: "🧊" },
  { id: "washing", label: "Washing Machines", icon: "🌀" },
  { id: "ac", label: "Air Conditioners", icon: "❄️" },
  { id: "kitchen", label: "Kitchen", icon: "🍳" },
  { id: "audio", label: "Audio", icon: "🎧" },
  { id: "mobile", label: "Mobiles", icon: "📱" },
  { id: "small", label: "Small Appliances", icon: "🔌" },
];

export const brands: Brand[] = [
  { id: "abans", label: "Abans" },
  { id: "samsung", label: "Samsung" },
  { id: "lg", label: "LG" },
  { id: "sony", label: "Sony" },
  { id: "toshiba", label: "Toshiba" },
  { id: "philips", label: "Philips" },
  { id: "panasonic", label: "Panasonic" },
  { id: "haier", label: "Haier" },
];

export const offers: Offer[] = [
  {
    id: "offer-1",
    name: "Abans Nom Bagless Vacuum Cleaner 1200W",
    brand: "Abans",
    category: "Small Appliances",
    image: "/images/offers/1.avif",
    blurb: "Powerful 1200W cyclonic suction with a washable HEPA filter.",
    originalPrice: 29990,
    salePrice: 17990,
    discountPct: 40,
    endsInHours: 9.4,
  },
  {
    id: "offer-2",
    name: "Abans 250L Inverter Refrigerator",
    brand: "Abans",
    category: "Refrigerators",
    image: "/images/offers/2.avif",
    blurb: "Frost-free cooling with a 10-year inverter compressor warranty.",
    originalPrice: 134990,
    salePrice: 109990,
    discountPct: 18,
    endsInHours: 33.5,
  },
  {
    id: "offer-3",
    name: "Abans 8kg Front Load Washing Machine",
    brand: "Abans",
    category: "Washing Machines",
    image: "/images/offers/3.avif",
    blurb: "15 wash programs with a quiet inverter motor and steam refresh.",
    originalPrice: 179990,
    salePrice: 149990,
    discountPct: 17,
    endsInHours: 52,
  },
  {
    id: "offer-4",
    name: 'Abans 55" 4K UHD Smart TV',
    brand: "Abans",
    category: "Television",
    image: "/images/offers/4.avif",
    blurb: "4K HDR display with built-in streaming and hands-free voice search.",
    originalPrice: 199990,
    salePrice: 154990,
    discountPct: 22,
    endsInHours: 71.75,
  },
];

export function formatLKR(value: number): string {
  return "Rs. " + value.toLocaleString("en-LK");
}
