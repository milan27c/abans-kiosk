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

// ---------------------------------------------------------------------------
// Product catalogue page — brands, category filters, demo products, sorting.
// ---------------------------------------------------------------------------

export type CatalogBrand = { id: string; label: string; logo: string };

// The 12 brand logos we ship (public/images/brandlogos) — laid out 6×2 in the
// brands filter drawer.
export const catalogBrands: CatalogBrand[] = [
  { id: "abans", label: "Abans", logo: "/images/brandlogos/abans.png" },
  { id: "lg", label: "LG", logo: "/images/brandlogos/lg.png" },
  { id: "apple", label: "Apple", logo: "/images/brandlogos/apple.png" },
  { id: "xiaomi", label: "Xiaomi", logo: "/images/brandlogos/xiaomi.png" },
  { id: "hp", label: "HP", logo: "/images/brandlogos/hp.png" },
  { id: "acer", label: "Acer", logo: "/images/brandlogos/acer.png" },
  { id: "lenovo", label: "Lenovo", logo: "/images/brandlogos/lenovo.png" },
  { id: "jbl", label: "JBL", logo: "/images/brandlogos/JBL.png" },
  { id: "jvc", label: "JVC", logo: "/images/brandlogos/jvc.png" },
  { id: "haier", label: "Haier", logo: "/images/brandlogos/haier.png" },
  { id: "mibro", label: "Mibro", logo: "/images/brandlogos/mibro.png" },
  { id: "miniso", label: "Miniso", logo: "/images/brandlogos/miniso.png" },
];

// Category filter tree: each main category holds one or more sub-groups, each
// with selectable leaf options. TV / Audio & Entertainment / Home Appliances
// are the specified sets; the rest are plausible placeholder sub-categories
// for the prototype (real taxonomy still TBD — CLAUDE.md §5).
export type SubGroup = { label: string; options: string[] };
export type FilterCategory = { id: string; label: string; groups: SubGroup[] };

export const filterCategories: FilterCategory[] = [
  {
    id: "tv",
    label: "TV",
    groups: [
      {
        label: "TV Sizes",
        options: [
          "24 Inch – 32 Inch TVs",
          "40 Inch – 43 Inch TVs",
          "50 Inch – 55 Inch TVs",
          "60 Inch – 65 Inch TVs",
          "75 Inch & Above TVs",
        ],
      },
      {
        label: "TV Types",
        options: [
          "LED TV",
          "Smart LED TV",
          "UHD TV",
          "OLED TV",
          "QLED TV",
          "TV Accessories",
        ],
      },
    ],
  },
  {
    id: "audio",
    label: "Audio & Entertainment",
    groups: [
      {
        label: "Audio",
        options: [
          "Speakers",
          "Earphones",
          "Headphones",
          "Home Theaters",
          "Sound Bars",
        ],
      },
    ],
  },
  {
    id: "home-appliances",
    label: "Home Appliances",
    groups: [
      {
        label: "Refrigerators",
        options: [
          "Single Door",
          "Double Door",
          "Side by Side",
          "Bottom Freezer",
          "Mini Bars",
        ],
      },
      {
        label: "Air Conditioners",
        options: [
          "Inverter AC",
          "Non-Inverter AC",
          "Air Curtain",
          "Commercial Air Conditioners",
        ],
      },
      {
        label: "Washing Machines",
        options: [
          "Top Loading",
          "Front Loading",
          "Washers & Dryers",
          "Semi Auto",
        ],
      },
      { label: "Heaters & Geysers", options: ["Heaters", "Geysers"] },
      {
        label: "Fans",
        options: [
          "Ceiling Fans",
          "Pedestal Fans",
          "Wall Fans & Table Fans",
          "Industrial Fans",
          "Air Coolers",
          "Fan New Arrivals",
        ],
      },
      {
        label: "Home Improvement",
        options: [
          "Clothes Dryer",
          "Generators",
          "Water Pumps",
          "Gardening Tools",
          "Power Tools",
          "Cleaning Durables",
          "DSI Plastic",
          "General Merchandise",
        ],
      },
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen Appliances",
    groups: [
      {
        label: "Cooking",
        options: [
          "Cookers",
          "Microwave Ovens",
          "Gas Cookers",
          "Electric Ovens",
        ],
      },
      {
        label: "Food Preparation",
        options: ["Blenders", "Mixer Grinders", "Food Processors"],
      },
      {
        label: "Small Kitchen",
        options: [
          "Rice Cookers",
          "Air Fryers",
          "Kettles",
          "Toasters",
          "Sandwich Makers",
        ],
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Phones & Devices",
    groups: [
      { label: "Mobiles", options: ["Smartphones", "Feature Phones"] },
      { label: "Wearables", options: ["Smart Watches", "Fitness Bands"] },
      {
        label: "Accessories",
        options: ["Power Banks", "Chargers", "Cases & Covers"],
      },
    ],
  },
  {
    id: "apple",
    label: "Apple",
    groups: [
      {
        label: "Apple Products",
        options: ["iPhone", "iPad", "MacBook", "Apple Watch", "AirPods"],
      },
    ],
  },
  {
    id: "computers",
    label: "Computers",
    groups: [
      { label: "Computing", options: ["Laptops", "Desktops", "Monitors"] },
      { label: "Printing", options: ["Printers", "Ink & Toner"] },
      {
        label: "PC Accessories",
        options: ["Keyboards & Mice", "Storage", "Networking"],
      },
    ],
  },
  {
    id: "fashion",
    label: "Fashion & Lifestyle",
    groups: [
      {
        label: "Bags & Luggage",
        options: ["Backpacks", "Travel Luggage", "Handbags"],
      },
      { label: "Watches", options: ["Analog Watches", "Digital Watches"] },
    ],
  },
  {
    id: "miniso",
    label: "MINISO",
    groups: [
      {
        label: "MINISO",
        options: ["Toys & Plush", "Beauty Tools", "Stationery", "Home Decor"],
      },
    ],
  },
  {
    id: "personal-care",
    label: "Personal Care",
    groups: [
      {
        label: "Grooming",
        options: ["Trimmers", "Shavers", "Hair Dryers", "Straighteners"],
      },
      { label: "Wellness", options: ["Massagers", "Weighing Scales"] },
    ],
  },
  {
    id: "commercial",
    label: "Commercial Appliances",
    groups: [
      {
        label: "Commercial Refrigeration",
        options: ["Chest Freezers", "Display Coolers", "Bottle Coolers"],
      },
      {
        label: "Commercial Kitchen",
        options: ["Commercial Cookers", "Deep Fryers"],
      },
    ],
  },
  {
    id: "toys",
    label: "Kids Toys",
    groups: [
      {
        label: "Toys",
        options: [
          "Educational Toys",
          "Remote Control Toys",
          "Ride-Ons",
          "Board Games",
          "Soft Toys",
        ],
      },
    ],
  },
  {
    id: "furniture",
    label: "Furniture & Home Style",
    groups: [
      {
        label: "Furniture",
        options: ["Sofas", "Beds & Mattresses", "Dining Sets", "Office Chairs"],
      },
      {
        label: "Home Decor",
        options: ["Lighting", "Rugs & Carpets", "Wall Art"],
      },
    ],
  },
];

// A selected sub-category option is encoded as `${categoryId}::${option}`.
export const OPT_SEP = "::";
export function optionLabel(id: string): string {
  const i = id.indexOf(OPT_SEP);
  return i === -1 ? id : id.slice(i + OPT_SEP.length);
}

// Static 2–3 colour gradient per main category, used to give each category
// tile its own look in the filter drawer (applied via inline background-image).
export const categoryGradient: Record<string, string> = {
  tv: "linear-gradient(135deg,#6366f1,#8b5cf6,#a855f7)",
  audio: "linear-gradient(135deg,#ec4899,#d946ef,#a855f7)",
  "home-appliances": "linear-gradient(135deg,#14b8a6,#06b6d4,#0ea5e9)",
  kitchen: "linear-gradient(135deg,#fb923c,#f97316,#ef4444)",
  mobile: "linear-gradient(135deg,#3b82f6,#6366f1,#4f46e5)",
  apple: "linear-gradient(135deg,#64748b,#475569,#334155)",
  computers: "linear-gradient(135deg,#22d3ee,#0ea5e9,#2563eb)",
  fashion: "linear-gradient(135deg,#fb7185,#f43f5e,#ec4899)",
  miniso: "linear-gradient(135deg,#f87171,#ef4444,#fb923c)",
  "personal-care": "linear-gradient(135deg,#34d399,#10b981,#14b8a6)",
  commercial: "linear-gradient(135deg,#94a3b8,#64748b,#3b82f6)",
  toys: "linear-gradient(135deg,#facc15,#fb923c,#f472b6)",
  furniture: "linear-gradient(135deg,#d6a760,#b45309,#78350f)",
};

// Which brands stock each main category (dummy — real availability TBD). Used
// to narrow the brand grid once a category is picked in the filter drawer.
export const categoryBrandIds: Record<string, string[]> = {
  tv: ["abans", "lg", "jvc", "haier", "xiaomi"],
  audio: ["jbl", "jvc", "abans", "xiaomi", "apple"],
  "home-appliances": ["abans", "lg", "haier"],
  kitchen: ["abans", "haier", "lg"],
  mobile: ["apple", "xiaomi", "mibro"],
  apple: ["apple"],
  computers: ["hp", "acer", "lenovo", "apple"],
  fashion: ["miniso", "mibro"],
  miniso: ["miniso"],
  "personal-care": ["abans", "xiaomi"],
  commercial: ["abans", "haier"],
  toys: ["miniso"],
  furniture: ["abans"],
};

export type SortOption = { id: string; label: string };
export const sortOptions: SortOption[] = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "name-asc", label: "Name: A – Z" },
];

// Demo catalogue products: the 4 online-exclusive offers repeated to fill the
// grid so pagination is demonstrable. Real products come later (CLAUDE.md §5).
export type Product = OnlineOffer;

export function buildDemoProducts(count: number): Product[] {
  const base = onlineOffers;
  return Array.from({ length: count }, (_, i) => {
    const src = base[i % base.length];
    return { ...src, id: `${src.id}-${i}` };
  });
}

export const PRODUCTS_PER_PAGE = 30;
