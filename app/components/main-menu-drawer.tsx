"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  X,
  Home,
  LayoutGrid,
  Shapes,
  Tags,
  BadgePercent,
  ChevronRight,
} from "lucide-react";
import KioskOverlay from "./kiosk-overlay";

type MenuItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

const ITEMS: MenuItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Products", href: "/catalog", icon: LayoutGrid },
  { label: "Categories", href: "/catalog", icon: Shapes },
  { label: "Brands", href: "/catalog", icon: Tags },
  { label: "Special Offers", href: "/", icon: BadgePercent },
];

export default function MainMenuDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  function go(href: string) {
    router.push(href);
    onClose();
  }

  return (
    <KioskOverlay open={open} onClose={onClose}>
      <div className="rounded-t-[36px] bg-canvas pb-10 shadow-[0_-20px_60px_rgba(0,0,0,0.35)]">
        {/* Header */}
        <div className="flex items-center justify-between px-10 pb-4 pt-8">
          <h2 className="text-h3 font-bold text-fg">Menu</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-ash-100 text-fg-muted dark:bg-elevated"
          >
            <X size={28} strokeWidth={2.25} />
          </button>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-2 px-6 pt-2">
          {ITEMS.map((item) => (
            <motion.button
              key={item.label}
              type="button"
              onClick={() => go(item.href)}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-5 rounded-2xl px-4 py-5 text-left"
            >
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-900/40 dark:text-brand-200">
                <item.icon size={30} strokeWidth={2.25} />
              </span>
              <span className="flex-1 text-body-lg font-semibold text-fg">
                {item.label}
              </span>
              <ChevronRight size={26} className="text-ash-300" />
            </motion.button>
          ))}
        </div>
      </div>
    </KioskOverlay>
  );
}
