import HomeHeader from "./components/home-header";
import LtoOffers from "./components/lto-offers";
import CountdownTimer from "./components/countdown-timer";
import SplashScreen from "./components/splash-screen";
import HomeCategoryTabs from "./components/home-category-tabs";
import FloatingBackButton from "./components/floating-back-button";
import { limitedOffers, LTO_ENDS_IN_HOURS } from "./data/catalog";

const FEATURED_COUNT = 3;

export default function Home() {
  const featured = limitedOffers.slice(0, FEATURED_COUNT);

  return (
    <div className="relative min-h-full bg-canvas">
      <SplashScreen />
      <HomeHeader />

      <section className="px-10 pb-20 pt-[50px]">
        {/* Shop by category */}
        <h2 className="mb-5 text-h4 font-bold text-fg">Shop by Category</h2>
        <HomeCategoryTabs />

        {/* Heading + countdown timer */}
        <div className="mb-8 mt-14 flex items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full bg-support-red/15 px-5 py-2 text-caption font-bold uppercase tracking-wider text-support-red">
              Limited Time
            </span>
            <h2 className="text-h4 font-bold text-fg">Limited Time Offer</h2>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-caption font-medium uppercase tracking-[0.2em] text-fg-muted">
              Ends in
            </span>
            <CountdownTimer endsInHours={LTO_ENDS_IN_HOURS} compact />
          </div>
        </div>

        {/* Three product cards */}
        <LtoOffers offers={featured} />
      </section>

      <FloatingBackButton />
    </div>
  );
}
