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

// Limited-time offers surfaced on the home page. Timer is shared for the whole
// section (see the heading), so cards carry no per-item countdown.
export type LimitedOffer = {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
};

export const limitedOffers: LimitedOffer[] = [
  {
    id: "lto1",
    name: "Haier 18000BTU Inverter Air Conditioner - R32",
    image: "/images/lto/lto1.png",
    originalPrice: 289990,
    salePrice: 214990,
  },
  {
    id: "lto2",
    name: "Toshiba 32 Inch LED TV",
    image: "/images/lto/lto2.png",
    originalPrice: 85990,
    salePrice: 52999,
  },
  {
    id: "lto3",
    name: "Abans Spot Carpet Cleaner - 600W",
    image: "/images/lto/lto3.png",
    originalPrice: 44900,
    salePrice: 29990,
  },
];

// Hours the limited-time offer countdown starts from.
export const LTO_ENDS_IN_HOURS = 14.5;

// Online-exclusive offers — a horizontally scrollable rail on the home page.
// Minimal card: image, name, price, original price only.
export type OnlineOffer = {
  id: string;
  name: string;
  image: string;
  originalPrice: number;
  salePrice: number;
};

export const onlineOffers: OnlineOffer[] = [
  {
    id: "offer1",
    name: "JVC Party Speaker 2000W PMPO with 2 Wireless Mics & Tripod + Remote - Black",
    image: "/images/online-offers/offer1.png",
    originalPrice: 99999,
    salePrice: 69999,
  },
  {
    id: "offer2",
    name: "JVC Party Speaker 1600W PMPO Wireless Mic & Remote Control - Black",
    image: "/images/online-offers/offer2.png",
    originalPrice: 69999,
    salePrice: 44999,
  },
  {
    id: "offer3",
    name: "JVC Portable Party Speaker 1600W PMPO Wireless Mic & Remote Control - Black",
    image: "/images/online-offers/offer3.png",
    originalPrice: 79999,
    salePrice: 49999,
  },
  {
    id: "offer4",
    name: "JVC Portable Party Speaker 1800W PMPO Wireless Mic & Remote Control - Black",
    image: "/images/online-offers/offer4.png",
    originalPrice: 89999,
    salePrice: 54999,
  },
];

export function formatLKR(value: number): string {
  return "Rs. " + value.toLocaleString("en-LK");
}
