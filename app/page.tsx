import HomeHeader from "./components/home-header";
import OfferCard from "./components/offer-card";
import ViewAllButton from "./components/view-all-button";
import SplashScreen from "./components/splash-screen";
import { offers } from "./data/catalog";

const FEATURED_COUNT = 3;

export default function Home() {
  const featured = offers.slice(0, FEATURED_COUNT);

  return (
    <div className="relative min-h-full bg-canvas">
      <SplashScreen />
      <HomeHeader />

      <section className="px-10 pb-40 pt-10">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-h3 font-bold text-fg">On offer now</h2>
          <ViewAllButton />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {featured.map((offer, i) => (
            <OfferCard key={offer.id} offer={offer} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
