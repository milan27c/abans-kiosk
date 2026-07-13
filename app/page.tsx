import Image from "next/image";
import HomeHeader from "./components/home-header";
import HeroSlider from "./components/hero-slider";
import LtoCard from "./components/lto-card";
import OnlineOfferCard from "./components/online-offer-card";
import CountdownTimer from "./components/countdown-timer";
import ViewAllButton from "./components/view-all-button";
import SplashScreen from "./components/splash-screen";
import {
  limitedOffers,
  onlineOffers,
  LTO_ENDS_IN_HOURS,
} from "./data/catalog";

const FEATURED_COUNT = 3;

const QUICK_FILTERS = [
  "/images/quick-filters/filter1.avif",
  "/images/quick-filters/filter2.avif",
  "/images/quick-filters/filter3.avif",
  "/images/quick-filters/filter4.avif",
  "/images/quick-filters/filter5.avif",
  "/images/quick-filters/filter6.avif",
];

const TV_BANNERS = ["/images/tv-banners/tv1.avif", "/images/tv-banners/tv2.avif"];

export default function Home() {
  const featured = limitedOffers.slice(0, FEATURED_COUNT);

  return (
    <div className="relative min-h-full bg-canvas">
      <SplashScreen />
      <HomeHeader />
      <HeroSlider />

      <section className="px-10 pb-20 pt-[50px]">
        {/* Heading + countdown timer */}
        <div className="mb-8 flex items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full bg-support-red/15 px-5 py-2 text-body-sm font-bold uppercase tracking-wider text-support-red">
              Limited Time
            </span>
            <h2 className="text-h3 font-bold text-fg">Limited Time Offer</h2>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-caption font-medium uppercase tracking-[0.2em] text-fg-muted">
              Ends in
            </span>
            <CountdownTimer endsInHours={LTO_ENDS_IN_HOURS} compact />
          </div>
        </div>

        {/* Three product cards */}
        <div className="grid grid-cols-3 gap-5">
          {featured.map((offer, i) => (
            <LtoCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>

        {/* Quick filters row */}
        <div className="mt-[50px] flex gap-3">
          {QUICK_FILTERS.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[280/370] flex-1 overflow-hidden rounded-2xl bg-ash-100 dark:bg-elevated"
            >
              <Image
                src={src}
                alt={`Quick filter ${i + 1}`}
                fill
                sizes="170px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Promotional banner */}
      <div className="relative w-full">
        <Image
          src="/images/banner.avif"
          alt="Abans promotional banner"
          width={1920}
          height={334}
          className="h-auto w-full"
        />
      </div>

      {/* Online Exclusive Offers — horizontally scrollable rail */}
      <section className="pt-[60px]">
        <div className="mb-9 flex items-center justify-between gap-6 px-10">
          <h2 className="text-h3 font-bold text-fg">Online Exclusive Offers</h2>
          <ViewAllButton label="View more" />
        </div>

        <div className="flex gap-5 overflow-x-auto px-10 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {onlineOffers.map((offer, i) => (
            <OnlineOfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>
      </section>

      {/* TV banners row */}
      <div className="flex gap-5 px-10 pb-[200px] pt-[60px]">
        {TV_BANNERS.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[722/378] flex-1 overflow-hidden rounded-3xl bg-ash-100 dark:bg-elevated"
          >
            <Image
              src={src}
              alt={`TV offer banner ${i + 1}`}
              fill
              sizes="480px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
