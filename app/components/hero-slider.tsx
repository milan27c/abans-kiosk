"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const SLIDES = [
  "/images/sliders/slider1.png",
  "/images/sliders/slider2.png",
  "/images/sliders/slider3.png",
];

const ADVANCE_MS = 5000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      ADVANCE_MS
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden bg-ash-100 dark:bg-elevated">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src={SLIDES[index]}
            alt=""
            fill
            sizes="1080px"
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className="flex h-4 items-center"
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 ${
                i === index ? "w-10 bg-white" : "w-2.5 bg-white/50"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
